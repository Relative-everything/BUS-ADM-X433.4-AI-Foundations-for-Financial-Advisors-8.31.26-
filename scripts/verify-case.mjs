#!/usr/bin/env node
/**
 * verify-case.mjs — recompute the SHA-256 of every injected block and fail on
 * drift. Non-zero exit is the point: this is meant to run in CI and to be the
 * check a human runs before pushing.
 *
 * Three independent failures are reported separately, because they have
 * different causes:
 *   1. a lesson has no sentinels                     -> inject-case has never run there
 *   2. the recorded hash does not match the content  -> somebody hand-edited inside
 *   3. the content does not match the current build  -> CASE.md changed, rebuild
 *
 * A FOURTH CHECK, ON THE HALF OF THE VIEWER THAT IS NOT INJECTED (DW-043). The
 * viewer's layout rules (.case-tabs, .case-tab, .case-panel, .case-spine and the
 * rest) are hand-written in every lesson, in the lesson-local CSS between
 * "/* STYLE:END *\/" and the CASE:BEGIN sentinel, while the rules the viewer
 * added later are emitted into the span. The span is hash-guarded above; the
 * hand-written half was guarded by nothing. So:
 *   4. the lesson-local .case-* rules differ between lessons -> one copy was edited
 *      alone. Edit inject-case.mjs instead, or make the same edit in every lesson.
 * A rule counts when any selector in it names a .case-* class. Comments are
 * dropped and whitespace is normalised, so re-indenting a rule is not drift;
 * changing a value, a selector or the order of the rules is. #caseBtn.casefab is
 * not a .case-* rule and is NOT in the set: its position differs between
 * lessons today. The comparison is a multiset one, so a rule pasted in twice is
 * reported as a duplicate, not as a reordering; and a reference set with no
 * rules in it fails, because seven empty sets agree with each other about
 * nothing (the window moved, or the rules were deleted everywhere at once).
 *
 * THE WINDOW IS ALSO ASSERTED CLOSED (DW-166). A .case-* rule in a <style> that
 * is outside the window and outside the CASE span (before "/* STYLE:END *\/", or
 * after CASE:END) is a hard failure in that lesson, because it changes the viewer
 * and the comparison above never reads it. The reader folds a <style media="…">
 * attribute into the rule's context, and descends into every at-rule and every
 * nested block (@scope, #caseModal{.case-src{…}}), so none of those is a place to
 * hide a rule either.
 *
 * A FIFTH CHECK, ON THE ARTWORK (DW-191). scripts/case-flowchart.html hand-types
 * dollar figures into SVG <text>; the block is hashed, not read, so a wrong figure
 * drawn into the sheet would ship. Every $-figure in a <text> must equal a value
 * in scripts/case-facts.json, and the sheet must carry at least one.
 */
import { readFileSync, realpathSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LESSONS, buildBlock, OPEN, CLOSE, sha256, facts } from './inject-case.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const STYLE_END = '/* STYLE:END */';

/** Drop CSS comments without touching quoted strings. */
function stripComments(css) {
  let out = '', i = 0;
  while (i < css.length) {
    const ch = css[i];
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < css.length && css[j] !== ch) j += css[j] === '\\' ? 2 : 1;
      out += css.slice(i, j + 1); i = j + 1;
    } else if (ch === '/' && css[i + 1] === '*') {
      const e = css.indexOf('*/', i + 2);
      i = e < 0 ? css.length : e + 2;
      out += ' ';
    } else { out += ch; i++; }
  }
  return out;
}

/**
 * Split a comment-free stylesheet into { ctx, sel, body } rules. Every block
 * opens a context: an at-rule prelude (@media, @scope, @layer, anything) or a
 * selector, so a rule nested under either carries the whole chain in ctx and a
 * nested .case-* rule is read wherever it sits. A rule's body is its own
 * declarations only, never a nested block's. Rules are emitted in source order
 * of their opening brace.
 */
function parseRules(css) {
  const rules = [], stack = [];
  let i = 0, buf = '';
  const open = () => stack[stack.length - 1];
  while (i < css.length) {
    const ch = css[i];
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < css.length && css[j] !== ch) j += css[j] === '\\' ? 2 : 1;
      buf += css.slice(i, j + 1); i = j + 1; continue;
    }
    if (ch === ';') {                                /* a declaration, or @import / @charset */
      if (open() && !buf.trim().startsWith('@')) open().decls.push(buf);
      buf = ''; i++; continue;
    }
    if (ch === '{') {
      const prelude = buf.trim(); buf = '';
      const frame = { prelude, decls: [] };
      if (!prelude.startsWith('@')) {
        frame.rule = { ctx: stack.map((f) => f.prelude), sel: prelude, body: '' };
        rules.push(frame.rule);
      }
      stack.push(frame); i++; continue;
    }
    if (ch === '}') {
      const frame = stack.pop();
      if (frame) {
        if (buf.trim()) frame.decls.push(buf);
        if (frame.rule) frame.rule.body = frame.decls.join(';');
      }
      buf = ''; i++; continue;
    }
    buf += ch; i++;
  }
  return rules;
}

const ws = (s) => s.replace(/\s+/g, ' ').trim();
function normSel(s) { return ws(s).replace(/\s*([,>+~])\s*/g, '$1'); }
function normBody(b) {
  return b.split(';').map((d) => {
    const k = d.indexOf(':');
    return k < 0 ? ws(d) : `${ws(d.slice(0, k))}:${ws(d.slice(k + 1))}`;
  }).filter(Boolean).join(';');
}

/** The media attribute of the <style> tag that opens at or before `at`, as an @media context. */
function styleMedia(text, at) {
  const tagStart = text.lastIndexOf('<style', at);
  if (tagStart < 0) return null;
  const tag = text.slice(tagStart, text.indexOf('>', tagStart) + 1);
  const m = tag.match(/\bmedia\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  const q = m ? (m[1] ?? m[2] ?? m[3]).trim() : '';
  return q && q.toLowerCase() !== 'all' ? `@media ${q}` : null;
}

/** The normalised .case-* rules in one stylesheet body, under an optional outer context. */
function caseRulesIn(css, outer) {
  const out = [];
  for (const r of parseRules(stripComments(css))) {
    if (!/\.case-[\w-]/.test(r.sel)) continue;
    const ctx = [outer, ...r.ctx].filter(Boolean).map(ws).join(' ');
    out.push(`${ctx ? ctx + ' ' : ''}${normSel(r.sel)}{${normBody(r.body)}}`);
  }
  return out;
}

/**
 * caseLayoutRules(text): the lesson-local .case-* rules of one lesson, normalised,
 * in source order. Population: every <style> body between the end of the managed
 * STYLE fence and the CASE:BEGIN sentinel, each under its tag's media attribute.
 * Also returns `outside`: every .case-* rule in a <style> that is neither in that
 * window nor in the CASE span, which the caller fails. Returns { rules, outside }
 * or { error }.
 */
export function caseLayoutRules(text) {
  const a = text.indexOf(STYLE_END);
  const b = text.indexOf(OPEN);
  if (a < 0) return { error: `no "${STYLE_END}" marker, so the lesson-local CSS cannot be located` };
  if (b < 0) return { error: 'no CASE:BEGIN sentinel' };
  if (b < a) return { error: 'CASE:BEGIN sits before the end of the STYLE fence' };
  const c = text.indexOf(CLOSE, b);
  const spanEnd = c < 0 ? b : c;
  const rules = [], outside = [];
  /* the fence's own <style> runs on from the marker; it is the window's first part */
  const tail = text.slice(a + STYLE_END.length);
  const first = tail.search(/<\/style\s*>/i);
  rules.push(...caseRulesIn(first < 0 ? tail : tail.slice(0, first), styleMedia(text, a)));
  /* every whole <style> element, placed by where it opens. The element that holds
     the marker is the managed fence: only its part before the marker is outside. */
  for (const m of text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)) {
    const at = m.index, bodyAt = at + m[0].indexOf('>') + 1;
    if (at < a) {
      const css = bodyAt + m[1].length > a ? text.slice(bodyAt, a) : m[1];
      outside.push(...caseRulesIn(css, styleMedia(text, at)).map((r) => `before ${STYLE_END}: ${r}`));
      continue;
    }
    if (at > a && at < b) { rules.push(...caseRulesIn(m[1], styleMedia(text, at))); continue; }
    if (at >= b && at < spanEnd) continue;               /* the CASE span: hash-guarded above */
    outside.push(...caseRulesIn(m[1], styleMedia(text, at)).map((r) => `after CASE:END: ${r}`));
  }
  return { rules, outside };
}

/** How many times each rule occurs, in first-seen order. */
const tally = (rules) => rules.reduce((m, r) => m.set(r, (m.get(r) || 0) + 1), new Map());

/**
 * compareCaseLayout({ file: text }): group the lessons by their rule set. The
 * largest group is the reference (ties go to the first file named); every file
 * outside it is reported with what it has that the reference does not, and
 * the reverse. The diff counts copies (a multiset diff): a rule the reference
 * has once and this file has twice is `duplicated`, not a reordering, and the
 * reverse is `fewer`. `reordered` is true only when the two lists hold exactly
 * the same rules the same number of times. `empty` is true when the reference
 * has no rules at all, which the caller fails.
 */
export function compareCaseLayout(texts) {
  const files = Object.keys(texts);
  const per = {}, errors = [], outside = [];
  for (const f of files) {
    const r = caseLayoutRules(texts[f]);
    if (r.error) errors.push({ file: f, error: r.error });
    else {
      per[f] = { rules: r.rules, digest: sha256(r.rules.join('\n')) };
      for (const rule of r.outside) outside.push({ file: f, rule });
    }
  }
  const groups = new Map();
  for (const f of files) if (per[f]) groups.set(per[f].digest, [...(groups.get(per[f].digest) || []), f]);
  const ranked = [...groups.values()].sort((x, y) => y.length - x.length);
  const refFiles = ranked[0] || [];
  const ref = refFiles.length ? per[refFiles[0]] : { rules: [], digest: '' };
  const refN = tally(ref.rules);
  const differ = [];
  for (const f of files) {
    if (!per[f] || per[f].digest === ref.digest) continue;
    const here = per[f].rules, hereN = tally(here);
    const onlyHere = [], missing = [], duplicated = [], fewer = [];
    for (const [r, n] of hereN) {
      const k = refN.get(r) || 0;
      if (!k) onlyHere.push(r);
      else if (n > k) duplicated.push({ rule: r, here: n, ref: k });
    }
    for (const [r, k] of refN) {
      const n = hereN.get(r) || 0;
      if (!n) missing.push(r);
      else if (k > n) fewer.push({ rule: r, here: n, ref: k });
    }
    differ.push({ file: f, count: here.length, onlyHere, missing, duplicated, fewer,
                  reordered: !onlyHere.length && !missing.length && !duplicated.length && !fewer.length });
  }
  return { ref: { files: refFiles, count: ref.rules.length, digest: ref.digest },
           empty: refFiles.length > 0 && ref.rules.length === 0, differ, errors, outside };
}

/**
 * flowchartFigures(html, figures): every $-figure typed into an SVG <text> of the
 * flowchart, and whether each equals a value in case-facts.json. Markup inside a
 * <text> (a <tspan>) is dropped before reading. Returns { found, unmatched }.
 */
export function flowchartFigures(html, figures) {
  const values = new Map();
  for (const [k, v] of Object.entries(figures)) if (typeof v === 'number') values.set(v, [...(values.get(v) || []), k]);
  const found = [], unmatched = [];
  for (const t of html.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text\s*>/gi)) {
    const plain = t[1].replace(/<[^>]*>/g, '');
    for (const m of plain.matchAll(/\$(\d{1,3}(?:,\d{3})+|\d+)(?![\d,])/g)) {
      const n = Number(m[1].replace(/,/g, ''));
      const keys = values.get(n);
      found.push({ text: m[0], value: n, keys: keys || [] });
      if (!keys) unmatched.push({ text: m[0], line: html.slice(0, t.index).split('\n').length, context: plain.trim() });
    }
  }
  return { found, unmatched };
}

/* ---------------------------------------------------------------- main -- */
/* Run as a script, not when imported. Both sides are compared as REAL paths:
   Node gives import.meta.url as the real path of the entry module, while
   argv[1] keeps the path as typed, so through a symlinked checkout, home or
   /tmp a plain comparison was false and the whole check printed nothing and
   exited 0. If argv[1] cannot be resolved, the file name decides, so a guard
   that cannot tell errs towards running the check rather than skipping it. */
function invokedDirectly() {
  const arg = process.argv[1];
  if (!arg) return false;                     /* node -e, a REPL: imported, not run */
  const self = fileURLToPath(import.meta.url);
  try { return realpathSync(arg) === realpathSync(self); }
  catch { return basename(arg) === basename(self); }
}

if (invokedDirectly()) {
  const { body: expected } = buildBlock();
  const expectedHash = sha256(expected);
  let fails = 0;
  const texts = {};

  for (const rel of LESSONS) {
    const text = readFileSync(join(REPO, rel), 'utf8');
    texts[rel] = text;
    const a = text.indexOf(OPEN), b = text.indexOf(CLOSE);
    if (a < 0 || b < 0) { console.log(`FAIL  ${rel}  no sentinels`); fails++; continue; }
    const region = text.slice(a + OPEN.length, b);
    const recorded = region.match(/sha256 ([0-9a-f]{64})/);
    if (!recorded) { console.log(`FAIL  ${rel}  no recorded hash after the opening sentinel`); fails++; continue; }
    const content = region.replace(/^\n<!-- generated by[^\n]*-->\n/, '').replace(/\n$/, '');
    const actual = sha256(content);
    if (actual !== recorded[1]) {
      console.log(`FAIL  ${rel}  block was hand-edited`);
      console.log(`        recorded ${recorded[1].slice(0, 16)}  actual ${actual.slice(0, 16)}`);
      fails++;
    } else if (actual !== expectedHash) {
      console.log(`FAIL  ${rel}  block is stale against the current CASE.md build`);
      console.log(`        injected ${actual.slice(0, 16)}  expected ${expectedHash.slice(0, 16)}  (run scripts/build-case.mjs then scripts/inject-case.mjs)`);
      fails++;
    } else {
      console.log(`OK    ${rel}  sha256 ${actual.slice(0, 16)}`);
    }
  }
  console.log(`summary: ${LESSONS.length - fails} of ${LESSONS.length} lessons carry the current CASE.md v${facts.case_version} block`);

  /* 4. the hand-written half of the viewer (DW-043) */
  const lay = compareCaseLayout(texts);
  for (const e of lay.errors) console.log(`FAIL  layout  ${e.file}  ${e.error}`);
  if (lay.empty) {
    console.log(`FAIL  layout  ${lay.ref.files.join(', ')}  carry no lesson-local .case-* rule at all between "${STYLE_END}" and CASE:BEGIN`);
    console.log('        an empty set agrees with every other empty set, so it proves nothing: the window moved, or the rules were deleted everywhere');
  }
  const copies = (x) => `(${x.here} cop${x.here === 1 ? 'y' : 'ies'} here, ${x.ref} in the reference)`;
  for (const d of lay.differ) {
    console.log(`FAIL  layout  ${d.file}  its ${d.count} lesson-local .case-* rule(s) differ from the ${lay.ref.count} in ${lay.ref.files.join(', ')}`);
    if (d.reordered) console.log('        same rules, different order (order decides the cascade)');
    for (const r of d.onlyHere.slice(0, 4)) console.log(`        only here:     ${r}`);
    for (const r of d.missing.slice(0, 4)) console.log(`        missing here:  ${r}`);
    for (const x of d.duplicated.slice(0, 4)) console.log(`        duplicated here: ${x.rule}  ${copies(x)}`);
    for (const x of d.fewer.slice(0, 4)) console.log(`        fewer copies here: ${x.rule}  ${copies(x)}`);
    const more = [d.onlyHere, d.missing, d.duplicated, d.fewer].reduce((n, xs) => n + Math.max(0, xs.length - 4), 0);
    if (more) console.log(`        ... and ${more} more`);
  }
  for (const o of lay.outside) {
    console.log(`FAIL  layout  ${o.file}  a .case-* rule sits outside the window the comparison reads, ${o.rule}`);
    console.log('        the viewer is changed and the cross-lesson comparison never sees it; move it between "/* STYLE:END */" and CASE:BEGIN');
  }
  const bad = [...new Set([...lay.errors.map((x) => x.file), ...(lay.empty ? lay.ref.files : []), ...lay.differ.map((x) => x.file),
                           ...lay.outside.map((x) => x.file)])];
  const layoutFails = bad.length;
  if (layoutFails) {
    console.log(`layout: ${layoutFails} of ${LESSONS.length} lessons ${lay.empty ? 'carry no lesson-local .case-* rules or differ in them' : 'differ in their lesson-local .case-* rules'}: `
      + `${bad.join(', ')}`);
    console.log('        A viewer layout rule is edited in every lesson or in none; a new one goes in scripts/inject-case.mjs.');
  } else {
    console.log(`layout: the ${lay.ref.count} lesson-local .case-* rules agree in all ${LESSONS.length} lessons  sha256 ${lay.ref.digest.slice(0, 16)}`);
  }

  /* 5. the figures drawn into the artwork (DW-191) */
  const sheet = readFileSync(join(REPO, 'scripts/case-flowchart.html'), 'utf8');
  const fig = flowchartFigures(sheet, facts.figures);
  let artFails = 0;
  if (!fig.found.length) {
    console.log('FAIL  artwork  scripts/case-flowchart.html  no $-figure found in any SVG <text>; a reader that finds nothing proves nothing');
    artFails++;
  }
  for (const u of fig.unmatched) {
    console.log(`FAIL  artwork  scripts/case-flowchart.html:${u.line}  ${u.text} is drawn into the sheet and equals no value in scripts/case-facts.json  ("${u.context}")`);
    artFails++;
  }
  if (!artFails) {
    console.log(`artwork: the ${fig.found.length} $-figure(s) drawn in scripts/case-flowchart.html each equal a case-facts.json value  `
      + fig.found.map((f) => `${f.text}=${f.keys[0]}`).join(' '));
  }
  process.exit(fails || layoutFails || artFails ? 1 : 0);
}
