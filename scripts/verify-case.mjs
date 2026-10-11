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

/** Split a comment-free stylesheet into { ctx, sel, body } rules, with at-rule nesting. */
function parseRules(css) {
  const rules = [], stack = [];
  let i = 0, buf = '';
  const readBlock = (from) => {          /* from = index just past '{'; returns [body, indexPast'}'] */
    let depth = 1, j = from;
    while (j < css.length && depth) {
      const ch = css[j];
      if (ch === '"' || ch === "'") { j++; while (j < css.length && css[j] !== ch) j += css[j] === '\\' ? 2 : 1; }
      else if (ch === '{') depth++;
      else if (ch === '}') depth--;
      j++;
    }
    return [css.slice(from, j - 1), j];
  };
  while (i < css.length) {
    const ch = css[i];
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < css.length && css[j] !== ch) j += css[j] === '\\' ? 2 : 1;
      buf += css.slice(i, j + 1); i = j + 1; continue;
    }
    if (ch === ';' && buf.trim().startsWith('@')) { buf = ''; i++; continue; }   /* @import, @charset */
    if (ch === '{') {
      const prelude = buf.trim(); buf = '';
      if (/^@(media|supports|layer|container|document)\b/i.test(prelude)) { stack.push(prelude); i++; continue; }
      const [body, next] = readBlock(i + 1);
      rules.push({ ctx: [...stack], sel: prelude, body });
      i = next; continue;
    }
    if (ch === '}') { stack.pop(); buf = ''; i++; continue; }
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

/**
 * caseLayoutRules(text): the lesson-local .case-* rules of one lesson, normalised,
 * in source order. Population: every <style> body between the end of the managed
 * STYLE fence and the CASE:BEGIN sentinel. Returns { rules } or { error }.
 */
export function caseLayoutRules(text) {
  const a = text.indexOf(STYLE_END);
  const b = text.indexOf(OPEN);
  if (a < 0) return { error: `no "${STYLE_END}" marker, so the lesson-local CSS cannot be located` };
  if (b < 0) return { error: 'no CASE:BEGIN sentinel' };
  if (b < a) return { error: 'CASE:BEGIN sits before the end of the STYLE fence' };
  const region = text.slice(a + STYLE_END.length, b);
  /* the fence's own <style> runs on from the marker; later <style> elements are whole */
  const first = region.search(/<\/style\s*>/i);
  const parts = [first < 0 ? region : region.slice(0, first)];
  if (first >= 0) for (const m of region.slice(first).matchAll(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi)) parts.push(m[1]);
  const rules = [];
  for (const css of parts) {
    for (const r of parseRules(stripComments(css))) {
      if (!/\.case-[\w-]/.test(r.sel)) continue;
      const ctx = r.ctx.map(ws).join(' ');
      rules.push(`${ctx ? ctx + ' ' : ''}${normSel(r.sel)}{${normBody(r.body)}}`);
    }
  }
  return { rules };
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
  const per = {}, errors = [];
  for (const f of files) {
    const r = caseLayoutRules(texts[f]);
    if (r.error) errors.push({ file: f, error: r.error });
    else per[f] = { rules: r.rules, digest: sha256(r.rules.join('\n')) };
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
           empty: refFiles.length > 0 && ref.rules.length === 0, differ, errors };
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
  const bad = [...lay.errors.map((x) => x.file), ...(lay.empty ? lay.ref.files : []), ...lay.differ.map((x) => x.file)];
  const layoutFails = bad.length;
  if (layoutFails) {
    console.log(`layout: ${layoutFails} of ${LESSONS.length} lessons ${lay.empty ? 'carry no lesson-local .case-* rules or differ in them' : 'differ in their lesson-local .case-* rules'}: `
      + `${bad.join(', ')}`);
    console.log('        A viewer layout rule is edited in every lesson or in none; a new one goes in scripts/inject-case.mjs.');
  } else {
    console.log(`layout: the ${lay.ref.count} lesson-local .case-* rules agree in all ${LESSONS.length} lessons  sha256 ${lay.ref.digest.slice(0, 16)}`);
  }
  process.exit(fails || layoutFails ? 1 : 0);
}
