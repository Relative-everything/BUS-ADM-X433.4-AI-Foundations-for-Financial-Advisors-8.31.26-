#!/usr/bin/env node
/**
 * verify-editorial.mjs — the checker for EDITORIAL.md Part A.
 *
 * EDITORIAL.md is the specification. This file is a transcription of its Part A,
 * not a redesign of it: every rule's assertion, population, exemptions and
 * message wording come from there. Where this file records a decision EDITORIAL.md
 * does not, it says so in a comment at the point of the decision.
 *
 *   node scripts/verify-editorial.mjs                 # HARD rules block, exit 1
 *   node scripts/verify-editorial.mjs --advisory-only # D16 burn-in, always exit 0
 *   node scripts/verify-editorial.mjs --rules A1,A5   # subset, for development
 *   node scripts/verify-editorial.mjs --file session-2/index.html
 *   node scripts/verify-editorial.mjs --root .scratch/seed   # alternate tree
 *
 * Severity is NOT inferred here. It is a committed field in
 * scripts/editorial-baseline.json, which a human edits. HARD blocks the push,
 * ADVISE prints under the ADVISORY heading and does not, DISABLED prints nothing
 * at all.
 *
 * Read-only. There is no --fix mode and one must not be added without asking.
 *
 * NOT this checker's job — each is already owned, and re-checking what another
 * check owns is how a suite stops being read (EDITORIAL.md, "Explicit non-goals"):
 *   chip -> footer resolution, orphan entries    validate_lesson V4 + migration 18
 *   the footer time table                        validate_lesson V5 + migration 16
 *   anything inside the CASE span                verify-case.mjs
 *   the managed CSS fence                        verify-style.mjs / restyle_sweep
 *   storage and gating                           validate_lesson V3 / migration 10
 *   the retired-name purge                       validate_lesson V7 / migration 1,2,3
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { classify, authoredProse, quotationScope } from './editorial-regions.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = JSON.parse(readFileSync(join(REPO, 'scripts/editorial-baseline.json'), 'utf8'));

/* Lessons with the core/appendix/tier architecture. session-0.1 is outside it, and
   as of EDITORIAL.md D20 (2026-08-25) that is settled rather than pending: it is a
   standalone async bonus lesson with no live time block, so A1-A7 have no
   population in that file. The skip is declared and reasoned here rather than left
   silent, and it is A1-A7 ONLY — session-0.1 is in scope for every other rule. */
const TIERED = ['session-1', 'session-2', 'session-3', 'session-4'];
const ALL_LESSONS = ['session-0.1', ...TIERED];
const D14_SKIP = 'session-0.1';
const D14_REASON = 'D20 2026-08-25: out of scope for the appendix/tier architecture (standalone async, different delivery mode); no appendix, no data-tier, no tier bar';

const argv = process.argv.slice(2);
const ADVISORY_ONLY = argv.includes('--advisory-only');
const only = (() => {
  const i = argv.indexOf('--rules');
  return i >= 0 && argv[i + 1] ? new Set(argv[i + 1].split(',').map((s) => s.trim())) : null;
})();
const oneFile = (() => {
  const i = argv.indexOf('--file');
  return i >= 0 ? argv[i + 1] : null;
})();
/* --root runs the whole checker against an alternate tree of the same shape.
   It exists so seeded-violation tests can prove each rule fires without writing
   into the corpus: copy a lesson, seed one defect, run against the copy. */
const ROOT = (() => {
  const i = argv.indexOf('--root');
  return i >= 0 ? join(REPO, argv[i + 1]) : REPO;
})();

const hard = [];
const advisory = [];
const clean = [];
const skipped = [];

const severityOf = (id) => (ADVISORY_ONLY ? (BASE.severity[id] === 'DISABLED' ? 'DISABLED' : 'ADVISE') : BASE.severity[id]);

/** Report one violation. Message wording is transcribed from EDITORIAL.md. */
function violation(id, where, message) {
  const sev = severityOf(id);
  if (sev === 'DISABLED') return;
  const line = `${sev === 'HARD' ? 'FAIL' : 'ADVISE'}  ${id.padEnd(4)} ${where}  ${message}`;
  (sev === 'HARD' ? hard : advisory).push(line);
}
function ran(id, note) {
  const sev = severityOf(id);
  if (sev === 'DISABLED') return;
  clean.push(`PASS  ${id.padEnd(4)} ${note}`);
}
const enabled = (id) => BASE.severity[id] !== 'DISABLED' && (!only || only.has(id));

/* ------------------------------------------------------------------ helpers */

const lessonFiles = () => (oneFile ? [oneFile.replace(/\/index\.html$/, '')] : ALL_LESSONS);
const src = (l) => readFileSync(join(ROOT, l, 'index.html'), 'utf8');

/** Every <section> with its attributes, body, minutes and 1-based start line. */
function sections(text) {
  const out = [];
  const re = /<section\b([^>]*)>/g;
  const marks = [];
  let m;
  while ((m = re.exec(text))) marks.push({ attr: m[1], start: m.index, end: re.lastIndex });
  for (let i = 0; i < marks.length; i++) {
    const body = text.slice(marks[i].end, i + 1 < marks.length ? marks[i + 1].start : text.length);
    const a = marks[i].attr;
    const attr = (k) => { const x = a.match(new RegExp(`${k}="([^"]*)"`)); return x ? x[1] : null; };
    const cls = attr('class') || '';
    const mins = body.match(/class="mins"[^>]*>\s*(\d+)/);
    out.push({
      id: attr('id'),
      cls,
      apx: /\bapx\b/.test(cls) && !/apxdiv/.test(cls),
      apxdiv: /apxdiv/.test(cls),
      tier: attr('data-tier'),
      insertAfter: attr('data-insert-after'),
      mins: mins ? Number(mins[1]) : null,
      body,
      line: text.slice(0, marks[i].start).split('\n').length,
    });
  }
  return out;
}

/** The .apxdiv index cards: href target, label, and the minute figure on the card. */
function cards(apxdivBody) {
  return [...apxdivBody.matchAll(/<a class="apxcard" href="#([^"]+)"><span class="ac">([\s\S]*?)<\/span>/g)].map((x) => {
    const ac = x[2];
    const min = ac.match(/(\d+)\s*min/);
    const lab = ac.match(/([A-Z]\d+)/);
    return { id: x[1], min: min ? Number(min[1]) : null, label: lab ? lab[1] : '?' };
  });
}

/* ====================================================================== A1 */
/* Card minutes equal the linked section's span.mins. Regions: R1. No exemptions. */
if (enabled('A1')) {
  let n = 0, seen = 0;
  for (const l of lessonFiles()) {
    if (l === D14_SKIP) { skipped.push(`SKIP  A1   ${l}  ${D14_REASON}`); continue; }
    const s = sections(src(l));
    const div = s.find((x) => x.apxdiv);
    if (!div) continue;
    const mins = Object.fromEntries(s.filter((x) => x.apx).map((x) => [x.id, x.mins]));
    for (const c of cards(div.body)) {
      if (!(c.id in mins)) continue;
      seen++;
      if (c.min !== mins[c.id]) {
        n++;
        violation('A1', `${l}/index.html`, `card #${c.id} says ${c.min} min, section says ${mins[c.id]} min`);
      }
    }
  }
  if (!n) ran('A1', `${seen} appendix index card(s) agree with their section`);
}

/* ====================================================================== A2 */
/* Card count equals appendix section count, and the eyebrow's "N optional
   sections" equals both. Regions: R1. */
if (enabled('A2')) {
  let n = 0;
  for (const l of lessonFiles()) {
    if (l === D14_SKIP) { skipped.push(`SKIP  A2   ${l}  ${D14_REASON}`); continue; }
    const s = sections(src(l));
    const div = s.find((x) => x.apxdiv);
    if (!div) continue;
    const apx = s.filter((x) => x.apx);
    const cs = cards(div.body);
    const claim = div.body.match(/Appendix\s*(?:&middot;|·)\s*(\d+)\s*optional/);
    const claimed = claim ? Number(claim[1]) : null;
    if (cs.length !== apx.length || claimed !== apx.length) {
      n++;
      const missing = apx.filter((a) => !cs.some((c) => c.id === a.id)).map((a) => `#${a.id}`);
      violation('A2', `${l}/index.html`,
        `${apx.length} appendix sections, ${cs.length} index cards, eyebrow claims ${claimed}`
        + (missing.length ? `\n          missing card for ${missing.join(', ')}` : ''));
    }
  }
  if (!n) ran('A2', 'appendix card counts match their section counts');
}

/* ====================================================================== A3 */
/* The apxdiv's span.mins equals the sum of the appendix sections' span.mins. */
if (enabled('A3')) {
  let n = 0;
  for (const l of lessonFiles()) {
    if (l === D14_SKIP) { skipped.push(`SKIP  A3   ${l}  ${D14_REASON}`); continue; }
    const s = sections(src(l));
    const div = s.find((x) => x.apxdiv);
    if (!div) continue;
    const sum = s.filter((x) => x.apx).reduce((a, b) => a + (b.mins || 0), 0);
    if (div.mins !== sum) {
      n++;
      violation('A3', `${l}/index.html`, `appendix eyebrow says ${div.mins} min, sections sum to ${sum}`);
    }
  }
  if (!n) ran('A3', 'appendix eyebrow totals match their sections');
}

/* ====================================================================== A4 */
/* The appendix panel's core-count sentence matches the core.
   TWO FORMS, and the second is the one the panel carries after Phase 2 step (f).
   The divider used to trail the sections, so the sentence read "The N sections
   ABOVE are the core session"; as a leading contents panel that is false, and
   the generator writes "The N sections OF the core session run in about M
   minutes" instead. Both are accepted so a file mid-migration still binds.
   A PRESENCE FLOOR was added with them: a lesson with an .apxdiv and NO
   matching sentence is a violation, not a skip. The old code fell through to
   `continue`, so rewording the lede would have taken A4 from checking four
   lessons to checking none while still printing PASS. That is the same shape as
   verify-migration check 20's zero-matches-is-a-PASS, which this repository has
   already recorded once as a defect. */
if (enabled('A4')) {
  let n = 0, seen = 0;
  const FORMS = [
    /The\s+(\d+)\s+sections of the core session run in about\s+(\d+)\s+minutes/,
    /The\s+(\d+)\s+sections above are the core session and run in about\s+(\d+)\s+minutes/,
  ];
  for (const l of lessonFiles()) {
    if (l === D14_SKIP) { skipped.push(`SKIP  A4   ${l}  ${D14_REASON}`); continue; }
    const s = sections(src(l));
    const div = s.find((x) => x.apxdiv);
    if (!div) continue;
    const core = s.filter((x) => !x.apx && !x.apxdiv);
    const sum = core.reduce((a, b) => a + (b.mins || 0), 0);
    const m = FORMS.map((rx) => div.body.match(rx)).find(Boolean);
    if (!m) {
      n++;
      violation('A4', `${l}/index.html`,
        'the appendix panel states no core section count or core minute total');
      continue;
    }
    seen++;
    const nSec = Number(m[1]), nMin = Number(m[2]);
    if (nSec !== core.length || nMin !== sum) {
      n++;
      violation('A4', `${l}/index.html`, `lede claims ${nSec} core sections in ${nMin} min; page has ${core.length} in ${sum}`);
    }
  }
  if (!n) ran('A4', `${seen} core lede(s) match their page`);
}

/* ====================================================================== A5 */
/* Every appendix section has at least one inbound href="#id". */
if (enabled('A5')) {
  let n = 0, seen = 0;
  for (const l of lessonFiles()) {
    if (l === D14_SKIP) { skipped.push(`SKIP  A5   ${l}  ${D14_REASON}`); continue; }
    const text = src(l);
    const s = sections(text);
    for (const a of s.filter((x) => x.apx)) {
      seen++;
      const inbound = (text.match(new RegExp(`href="#${a.id}"`, 'g')) || []).length;
      if (inbound === 0) {
        n++;
        const label = a.body.match(/data-nav="([^"]*)"/) || [];
        const nav = (s.find((x) => x.id === a.id) || {}).cls;
        void nav; void label;
        const navAttr = (text.match(new RegExp(`<section class="slide apx" id="${a.id}"[^>]*data-nav="([^"]*)"`)) || [])[1] || a.id;
        violation('A5', `${l}/index.html`,
          `#${a.id} (${navAttr.replace(/&middot;/g, '·')}, ${a.mins} min) has no inbound link from anywhere`);
      }
    }
  }
  if (!n) ran('A5', `${seen} appendix section(s) reachable by at least one inbound link`);
}

/* ====================================================================== A6 */
/* data-tier present and in the enumeration. Regions: R3. */
const TIERS = ['foundational', 'standard', 'advanced'];
if (enabled('A6')) {
  let n = 0, seen = 0;
  for (const l of lessonFiles()) {
    if (l === D14_SKIP) { skipped.push(`SKIP  A6   ${l}  ${D14_REASON}`); continue; }
    for (const a of sections(src(l)).filter((x) => x.apx)) {
      seen++;
      if (!a.tier) { n++; violation('A6', `${l}/index.html`, `#${a.id} has no data-tier`); }
      else if (!TIERS.includes(a.tier)) { n++; violation('A6', `${l}/index.html`, `#${a.id} has data-tier="${a.tier}" (not in the enumeration)`); }
    }
  }
  if (!n) ran('A6', `${seen} appendix section(s) carry a valid data-tier`);
}

/* ====================================================================== A7 */
/* Every tier value present is offered by the #tierbar control. Regions R2, R3. */
if (enabled('A7')) {
  let n = 0;
  for (const l of lessonFiles()) {
    if (l === D14_SKIP) { skipped.push(`SKIP  A7   ${l}  ${D14_REASON}`); continue; }
    const text = src(l);
    const present = new Set(sections(text).filter((x) => x.apx).map((x) => x.tier).filter(Boolean));
    /* The tier control stores its order in ORDER=['foundational','standard',
       'advanced'] and selects by data-level index, so the offered set is that
       array. Scope the match to the tier-filter IIFE: session-1 declares an
       unrelated ORDER first, for the nine sampler controls in Appendix A5, and
       taking the file's first ORDER would compare against that instead. */
    const bar = text.indexOf("getElementById('tierbar')");
    const scope = bar >= 0 ? text.slice(bar) : text;
    const order = scope.match(/ORDER\s*=\s*\[([^\]]*)\]/);
    const offered = new Set(order ? [...order[1].matchAll(/'([^']+)'/g)].map((x) => x[1]) : []);
    const missing = [...present].filter((t) => !offered.has(t));
    if (missing.length) {
      n++;
      violation('A7', `${l}/index.html`, `tier value(s) ${missing.join(', ')} present on a section but not offered by #tierbar`);
    }
  }
  if (!n) ran('A7', 'every tier value present is selectable in the tier bar');
}

/* ===================================================================== A16 */
/* UNVERIFIED / TODO / FIXME / XXX only where the file declares a convention.
   Regions: R1, R2, R7.
   TRANSCRIPTION NOTE. EDITORIAL.md says the marker "must use the declared form
   and sit in a region the file's convention covers", and records that session
   0.1's eight occurrences all pass. The declared forms are the two the corpus
   states: "[UNVERIFIED, needs source]" in the lessons and "[UNVERIFIED — needs
   source]" in CASE.md. A bare marker outside those brackets is the violation. */
if (enabled('A16')) {
  /* TRANSCRIPTION DECISION, recorded because EDITORIAL.md does not spell it out.
     A MARKER is bracket-delimited: [UNVERIFIED, needs source]. The bare word
     appearing inside a sentence is prose ABOUT verification, not a marker — e.g.
     session-0.1:1642, "Upgraded from UNVERIFIED to H by the verified evidence
     annex". EDITORIAL.md records that all eight of session 0.1's occurrences
     pass, which is only true under this reading. So UNVERIFIED is matched in
     bracket position and required to carry a declared form; TODO / FIXME / XXX
     are matched bare, because they have no bracket convention to satisfy. */
  const DECLARED = /^\[UNVERIFIED(?:,|\s*—|\s*-)\s*needs source\]$/;
  let n = 0, seen = 0;
  for (const l of lessonFiles()) {
    const text = src(l);
    const c = classify(text);
    const pop = c.mask(['R1', 'R2', 'R7']);
    let m;
    const bracket = /\[UNVERIFIED[^\]]*\]/g;
    while ((m = bracket.exec(pop))) {
      seen++;
      if (DECLARED.test(m[0])) continue;
      n++;
      violation('A16', `${l}/index.html:${c.lineAt(m.index)}`,
        `marker "${m[0]}" is not the declared form [UNVERIFIED, needs source]`);
    }
    for (const rx of [/\bTODO\b/g, /\bFIXME\b/g, /\bXXX\b/g]) {
      while ((m = rx.exec(pop))) {
        n++;
        violation('A16', `${l}/index.html:${c.lineAt(m.index)}`,
          `bare "${m[0]}" in ${c.regionOf(m.index)}\n          no marker convention is declared in this file`);
      }
    }
  }
  if (!n) ran('A16', `${seen} UNVERIFIED marker(s) use their declared form; no TODO / FIXME / XXX`);
}


/* ====================================================================== A8 */
/* Majority form may not change; minority count may not rise.
   Population: authoredProse (see EDITORIAL.md, "the population, defined once"). */
if (enabled('A8')) {
  let n = 0;
  for (const l of lessonFiles()) {
    const b = BASE.A8.files[l];
    if (!b) continue;
    const pop = authoredProse(classify(src(l)));
    const literal = (pop.match(/—/g) || []).length;
    const entity = (pop.match(/&mdash;/g) || []).length;
    const majority = literal >= entity ? 'literal' : 'entity';
    const minority = Math.min(literal, entity);
    if (majority !== b.majority) {
      n++;
      violation('A8', `${l}/index.html`, `majority form changed from ${b.majority} to ${majority}`);
    } else if (minority > b.minority) {
      n++;
      const form = b.minority_form === 'literal' ? 'literal —' : '&mdash;';
      violation('A8', `${l}/index.html`, `minority form (${form}) rose from ${b.minority} to ${minority}`);
    }
  }
  if (!n) ran('A8', 'em-dash form holds its baseline in every lesson');
}

/* ====================================================================== A9 */
/* Total em dashes over authoredProse may fall, may not rise. This is how D1 is
   enforced without needing history. */
if (enabled('A9')) {
  let n = 0;
  for (const l of lessonFiles()) {
    const b = BASE.A9.files[l];
    if (!b) continue;
    const c = classify(src(l));
    const pop = authoredProse(c);
    const total = (pop.match(/—/g) || []).length + (pop.match(/&mdash;/g) || []).length;
    if (total > b.total) {
      /* Name the additions so the fix is a diff, not a hunt. */
      const lines = [];
      const rx = /—|&mdash;/g; let m;
      while ((m = rx.exec(pop))) lines.push(c.lineAt(m.index));
      const tail = [...new Set(lines)].slice(-(total - b.total));
      n++;
      violation('A9', `${l}/index.html`,
        `body-prose em dashes rose from ${b.total} to ${total}\n          `
        + `D1 ratifies existing copy and forbids new dashes; candidate lines ${tail.join(', ')}`);
    }
  }
  if (!n) ran('A9', 'em-dash counts hold or fall against their baseline');
}

/* ===================================================================== A9b */
/* C-3: R11 is checked once at corpus level rather than nowhere. Reported under
   A9's severity because it is the same ratchet on a different population. */
if (enabled('A9')) {
  const seen = new Map();
  for (const l of ALL_LESSONS) {
    const text = src(l);
    const c = classify(text);
    for (const [s, e] of (c.spans.R11 || [])) {
      const body = text.slice(s, e);
      let h = 0;
      for (let i = 0; i < body.length; i++) { h = (h * 31 + body.charCodeAt(i)) | 0; }
      if (!seen.has(h)) seen.set(h, body);
    }
  }
  let literal = 0, entity = 0;
  for (const body of seen.values()) {
    literal += (body.match(/—/g) || []).length;
    entity += (body.match(/&mdash;/g) || []).length;
  }
  const b = BASE.R11;
  if (literal + entity > b.total || seen.size !== b.distinct_blocks) {
    violation('A9', 'R11 (corpus, deduplicated)',
      `shared boilerplate: ${seen.size} distinct blocks carrying ${literal + entity} dashes; `
      + `baseline records ${b.distinct_blocks} blocks and ${b.total}`);
  } else {
    ran('A9b', `R11 corpus baseline holds: ${seen.size} distinct blocks, ${literal + entity} dashes`);
  }
}

/* ===================================================================== A10 */
/* No em or en dash between the quote marks of an attributed quotation.
   Population: quotationScope — deliberately wider than authoredProse, because a
   quotation guard has to reach footer entries and script literals.
   Exemptions: R6 (verify-case.mjs owns it) and R10 (Class A2), both excluded by
   the mask. Quote-mark parity is line-local, which EDITORIAL.md records as exact
   because every line in every file has balanced quote marks. */
const ATTRIB = /Wolfram|Kalai|Laplace|FINRA|SEC|Anthropic|Kitces|Magesh|Vectara|Dahl|Iskowitz|Gartner|Deloitte|Surfshark|OWASP|Daly|Charlotin|Zheng|Morningstar|Lee/;
function quotationDashes(text, c) {
  const pop = quotationScope(c);
  const out = [];
  const lines = pop.split('\n');
  let off = 0;
  for (const line of lines) {
    /* Normalise BOTH the quote marks and the dash forms. Without the dash
       normalisation this rule sees only literal —, and the corpus writes its
       quotations with &mdash;, so it would never fire on the case it exists
       for. Found by the seeded-violation test, not by reading. */
    const norm = line
      .replace(/&ldquo;|&rdquo;/g, '"').replace(/[“”]/g, '"')
      .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–');
    let inside = false;
    for (let i = 0; i < norm.length; i++) {
      if (norm[i] === '"') { inside = !inside; continue; }
      if (inside && (norm[i] === '—' || norm[i] === '–')) {
        if (ATTRIB.test(line)) out.push({ off: off + i, line: c.lineAt(off + i) });
      }
    }
    off += line.length + 1;
  }
  return out;
}
if (enabled('A10')) {
  let n = 0;
  for (const l of lessonFiles()) {
    const text = src(l);
    const c = classify(text);
    for (const h of quotationDashes(text, c)) {
      n++;
      const who = (text.slice(Math.max(0, h.off - 300), h.off + 300).match(ATTRIB) || ['a cited source'])[0];
      violation('A10', `${l}/index.html:${h.line}`,
        `em dash inside a quotation attributed to ${who}\n           altering it misquotes the source`);
    }
  }
  if (!n) ran('A10', 'no dash sits inside an attributed quotation');
}

/* ===================================================================== A11 */
/* A string PRESENTED AS a Wolfram section name matches one of the locked 17.
   EDITORIAL.md: fire only on strings presented as section names — quoted, or
   introduced by "section" / "sections used". Getting that discrimination wrong
   is how this rule becomes noise, so descriptive prose like "the
   parenthesis-language section" at session-2:1781 must not fire. */
const WOLFRAM_SECTIONS = [
  "It's Just Adding One Word at a Time",
  'Where Do the Probabilities Come From?',
  'What Is a Model?',
  'Models for Human-Like Tasks',
  'Neural Nets',
  'Machine Learning, and the Training of Neural Nets',
  'The Practice and Lore of Neural Net Training',
  '"Surely a Network That\'s Big Enough Can Do Anything!"',
  'The Concept of Embeddings',
  'Inside ChatGPT',
  'The Training of ChatGPT',
  'Beyond Basic Training',
  'What Really Lets ChatGPT Work?',
  'Meaning Space and Semantic Laws of Motion',
  'Semantic Grammar and the Power of Computational Language',
  'So ... What Is ChatGPT Doing, and Why Does It Work?',
  'Thanks',
];
/* EDITORIAL.md: match after normalisation, not on bytes. The corpus writes these
   names in at least four encodings. */
const norm = (s) => s
  .replace(/&rsquo;|&#8217;|’/g, "'")
  .replace(/&ldquo;|&rdquo;|[“”]/g, '"')
  .replace(/&hellip;|…/g, '...')
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .trim();
const VALID = new Set(WOLFRAM_SECTIONS.map(norm));
if (enabled('A11')) {
  /* Two discriminations learned from the corpus, both recorded because getting
     them wrong is exactly how this rule becomes noise:
       1. A section name must be PRESENTED as one. Requiring a cue within 160
          chars before the quote keeps out Laplace's chapter title at
          session-1:1652 and the temperature quotation at session-4:1800, both
          of which merely sit near the word Wolfram.
       2. The corpus punctuates inside the quotes (American style) and shortens
          long titles — session-2:1919 writes "…at a Time," with the comma in,
          and session-3:1103 writes "Meaning Space" for the full name. So strip
          trailing punctuation and accept a valid name by prefix. */
  const CUE = /section|sections used|Assigned reading|Assigned for|opening of/i;
  let n = 0, seen = 0;
  for (const l of lessonFiles()) {
    const text = src(l);
    const c = classify(text);
    const pop = c.mask(['R1', 'R7', 'R8', 'R9']);
    const rx = /(?:&ldquo;|\u201c|")([^\u201c\u201d"&]{4,80}?)(?:&rdquo;|\u201d|")/g;
    let m;
    while ((m = rx.exec(pop))) {
      const before = pop.slice(Math.max(0, m.index - 160), m.index);
      if (!/Wolfram/.test(pop.slice(Math.max(0, m.index - 200), m.index + 200))) continue;
      if (!CUE.test(before)) continue;
      const cand = norm(m[1]).replace(/[,;.]+$/, '').trim();
      if (!/^[A-Z"]/.test(cand)) continue;
      seen++;
      const ok = [...VALID].some((v) => v === cand || v.startsWith(cand + ' ') || v.replace(/[?!]$/, '') === cand);
      if (!ok) {
        n++;
        violation('A11', `${l}/index.html:${c.lineAt(m.index)}`,
          `cites "${cand}",\n           which is not one of the 17 sections of Wolfram (2023)`);
      }
    }
  }
  if (!n) ran('A11', `${seen} Wolfram section citation(s) all drawn from the locked 17`);
}

/* ===================================================================== A12 */
/* Every direct Wolfram quotation or quoted figure carries a section name in its
   own source note or footer entry. D6. Regions R7, R8, R9.
   ADVISE until the D7 mapping is signed off — see editorial-baseline.json. */
const WOLF_FIGURES = [
  /40,?000/, /1\.6 billion/, /60 trillion/, /\b914\b/, /\b3542\b/, /50,?000 tokens/,
  /temperature of <b>0\.8|0\.8[^0-9]{0,20}seems best/, /175 billion/,
  /100 billion neurons/, /100 trillion connections/, /15% (?:still )?(?:sitting )?on|invalid close/,
  /5 billion words/, /n<sup>|n&#8315;|n⁻¹/, /alligator/,
];
if (enabled('A12')) {
  /* POPULATION CORRECTED after measurement. The first cut anchored on R7/R8/R9
     blocks and found 4. But RC-1 records that sessions 1 and 4 carry zero
     section-level citations attached to any claim — and a quotation with no
     source note has no R7/R8/R9 block to sit in, so that reading skipped exactly
     the cases D6 exists to catch. Measured: 19 Wolfram quotations and quoted
     figures in R1 body prose, of which 7 sit in a section carrying no note at
     all, 4 of those in session-4. So A12 anchors on the QUOTATION in R1 and
     looks outward for a section name — in the enclosing section's notes, or in
     the file's own Wolfram footer entry. "No note to look in" is a finding, not
     a skip. */
  let n = 0, seen = 0;
  for (const l of lessonFiles()) {
    const text = src(l);
    const c = classify(text);
    const pop = c.mask(['R1']);
    /* Section boundaries, so a note is matched to the quotation it serves. */
    const bounds = [];
    for (const m of text.matchAll(/<section\b[^>]*>/g)) bounds.push(m.index);
    bounds.push(text.length);
    const sectionOf = (off) => {
      let i = 0;
      for (let k = 0; k < bounds.length - 1; k++) if (bounds[k] <= off) i = k;
      return [bounds[i], bounds[i + 1]];
    };
    const notes = [...(c.spans.R8 || []), ...(c.spans.R9 || [])];
    /* The lesson's own Wolfram footer entry counts: EDITORIAL.md A12 says the
       section name may sit in "its own source note OR footer entry". */
    let footerNames = false;
    for (const [s, e] of (c.spans.R7 || [])) {
      const body = text.slice(s, e);
      if (/Wolfram/.test(body) && [...VALID].some((v) => norm(body).includes(v))) footerNames = true;
    }
    const cand = new Set();
    const q = /(?:&ldquo;|\u201c|")[^\u201c\u201d"&]{12,}?(?:&rdquo;|\u201d|")/g;
    let m;
    while ((m = q.exec(pop))) {
      const ctx = pop.slice(Math.max(0, m.index - 260), m.index + 260);
      if (/Wolfram/.test(ctx)) cand.add(m.index);
    }
    for (const rx of WOLF_FIGURES) {
      const g = new RegExp(rx.source, 'g');
      while ((m = g.exec(pop))) cand.add(m.index);
    }
    /* One finding per site, not per matching pattern: several WOLF_FIGURES can
       hit the same sentence, and a reader fixing it fixes one citation. */
    const byLine = new Map();
    for (const off of [...cand].sort((x, y) => x - y)) {
      const ln = c.lineAt(off);
      if (!byLine.has(ln)) byLine.set(ln, off);
    }
    for (const off of byLine.values()) {
      seen++;
      const [s, e] = sectionOf(off);
      const near = notes.filter(([ns]) => ns >= s && ns < e).map(([ns, ne]) => text.slice(ns, ne)).join(' ');
      const named = footerNames || [...VALID].some((v) => norm(near).includes(v));
      if (!named) {
        n++;
        violation('A12', `${l}/index.html:${c.lineAt(off)}`,
          `direct quotation of Wolfram (2023) with no\n             section name in its source note`
          + (near ? '' : '\n             (the section carries no source note at all)'));
      }
    }
  }
  if (!n) ran('A12', `${seen} Wolfram quotation(s) all reach a section name`);
}

/* ===================================================================== A13 */
/* SHIPPED FORMULATION: the cheap one, per the instruction, not EDITORIAL.md's
   ordered-name shift test. Within one <p> or caption, fire when a data-src key
   resolves to a footer entry whose author surname is ABSENT from the sentence,
   while a different surname PRESENT in that sentence has its own resolvable key.
   Verified to catch session-4:1345 and session-3:2044 with zero false positives
   corpus-wide; if it had not, the fallback was the ordered shift test. */
function footerSurnames(text, c) {
  const map = new Map();
  for (const [s, e] of (c.spans.R7 || [])) {
    const body = text.slice(s, e);
    const id = (body.match(/id="(src-[^"]+)"/) || [])[1];
    if (!id) continue;
    const plain = body.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/g, ' ');
    /* The surname is the distinctive token: prefer an explicit "Surname," or
       "Surname et al", else the key's own stem when it is a name. */
    const cands = new Set();
    const au = plain.match(/\b([A-Z][a-z]{3,})\s*,\s*[A-Z]\./);
    if (au) cands.add(au[1]);
    const org = plain.match(/\b(Gartner|Deloitte|Surfshark|Vectara|Anthropic|Kitces|FINRA|OWASP|Morningstar|Iskowitz|Charlotin|Magesh|Laplace|Zheng|Dahl|Daly|Arup|SynthID)\b/);
    if (org) cands.add(org[1]);
    const stem = id.replace(/^src-/, '');
    if (/^[a-z]{4,}$/.test(stem)) cands.add(stem[0].toUpperCase() + stem.slice(1));
    if (cands.size) map.set(id, [...cands]);
  }
  return map;
}
if (enabled('A13')) {
  /* SHIPPED: the ordered shift test, NOT the cheap surname-absence formulation.
     The cheap one was built first and is structurally unable to catch either
     known instance: in both cascades every named source IS present in the
     sentence, and only the attachment is shifted. It found neither and produced
     four false positives, so this is the documented fallback. */
  let n = 0;
  for (const l of lessonFiles()) {
    const text = src(l);
    const c = classify(text);
    const names = footerSurnames(text, c);
    const containers = [];
    for (const m of text.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/g)) containers.push([m.index, m.index + m[0].length]);
    for (const m of text.matchAll(/cap\s*:\s*'(?:[^'\\]|\\.)*'/g)) containers.push([m.index, m.index + m[0].length]);
    for (const [s, e] of containers) {
      const body = text.slice(s, e);
      if (c.regionOf(s) === 'R6') continue;
      const chips = [...body.matchAll(/data-src="(src-[^"]+)"/g)];
      if (chips.length < 3) continue;
      const plain = body.replace(/<[^>]*>/g, ' ');
      /* Ordered list of source names as the sentence mentions them. */
      const mentions = [];
      for (const [id, ns] of names) {
        for (const nm of ns) {
          const i = plain.search(new RegExp(`\\b${nm}\\b`));
          if (i >= 0) { mentions.push({ id, nm, i }); break; }
        }
      }
      mentions.sort((a, b) => a.i - b.i);
      if (mentions.length < 3) continue;
      const wanted = mentions.map((x) => x.id);
      const got = chips.map((x) => x[1]);
      const k = Math.min(wanted.length, got.length);
      const score = (shift) => {
        let hit = 0, tot = 0;
        for (let i = 0; i < k; i++) {
          const j = i + shift;
          if (j < 0 || j >= k) continue;
          tot++; if (got[i] === wanted[j]) hit++;
        }
        return tot ? hit / tot : 0;
      };
      const s0 = score(0), sp = score(1), sm = score(-1);
      if (s0 < 1 && Math.max(sp, sm) > s0 && Math.max(sp, sm) >= 0.99) {
        n++;
        const dir = sp >= sm ? 1 : -1;
        const wrong = [];
        for (let i = 0; i < k; i++) if (got[i] !== wanted[i]) wrong.push(`${names.get(wanted[i])[0]}'s claim carries ${got[i]}`);
        violation('A13', `${l}/index.html:${c.lineAt(s)}`,
          `${k} sources named in order, ${chips.length} chips, keys shifted by ${dir > 0 ? 1 : -1}\n           `
          + wrong.slice(0, 2).join('; '));
      }
    }
  }
  if (!n) ran('A13', 'no off-by-one chip cascade found');
}

/* ===================================================================== A14 */
/* A chip keyed to a declared-synthetic source may not sit on a claim about an
   external, real work. Regions R1, R2. */
const EXTERNAL = /\((?:19|20)\d\d\)|\bRev\. Rul\.|\bT\.C\.|\bC\.F\.R\.|\bCFR\b|\bU\.S\.C\.|\bILCS\b|arXiv|doi:|\bJournal\b|Regulation S-P|CHI 20\d\d/;
if (enabled('A14')) {
  let n = 0;
  for (const l of lessonFiles()) {
    const text = src(l);
    const c = classify(text);
    /* Build the exclusion set from footer entries that declare themselves synthetic. */
    const synthetic = new Set();
    for (const [s, e] of (c.spans.R7 || [])) {
      const body = text.slice(s, e);
      if (/\bsynthetic\b/i.test(body)) {
        const id = (body.match(/id="(src-[^"]+)"/) || [])[1];
        if (id) synthetic.add(id);
      }
    }
    if (!synthetic.size) continue;
    const containers = [];
    for (const m of text.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/g)) containers.push([m.index, m.index + m[0].length]);
    for (const m of text.matchAll(/<div class="(?:src|csrc)"[\s\S]*?<\/div>/g)) containers.push([m.index, m.index + m[0].length]);
    for (const [s, e] of containers) {
      const body = text.slice(s, e);
      if (c.regionOf(s) === 'R6') continue;          /* injected span, never assert */
      /* Scope the external-work signal to the CLAIM THE CHIP SITS ON, not the
         whole container. A <p> can carry several claims with several chips, and
         testing the container fires on a synthetic chip that sits beside an
         unrelated external claim. The claim is the run from the previous chip
         (or the container start) up to this chip. */
      const chips = [...body.matchAll(/data-src="(src-[^"]+)"/g)];
      let prev = 0;
      for (const ch of chips) {
        const clause = body.slice(prev, ch.index).replace(/<[^>]*>/g, ' ');
        prev = ch.index + ch[0].length;
        if (!synthetic.has(ch[1])) continue;
        const sig = clause.match(EXTERNAL);
        if (!sig) continue;
        n++;
        violation('A14', `${l}/index.html:${c.lineAt(s + ch.index)}`,
          `${ch[1]} is declared synthetic and is chipping a claim\n           about ${sig[0]}`);
      }
    }
  }
  if (!n) ran('A14', 'no declared-synthetic key chips an external-work claim');
}

/* ===================================================================== A15 */
/* Every footer key has a chip or a data-nochip reason. D9. Region R7.
   ADVISE until data-nochip lands — see editorial-baseline.json. */
const NOCHIP = ['fabricated', 'authority', 'background'];
if (enabled('A15')) {
  let n = 0, seen = 0;
  for (const l of lessonFiles()) {
    const text = src(l);
    const c = classify(text);
    /* A footer entry's own terminal chip labels that entry's confidence; it is
       not a citation of it. Counting it made an orphan undetectable in any
       lesson using that convention, which was all of session-0.1's twelve keys
       and, once inject-sources made the convention uniform, would have been all
       of them. R7 is the footer-entry region, so excluding it is the fix. */
    const inFooterEntry = (i) => (c.spans.R7 || []).some(([s0, e0]) => i >= s0 && i < e0);
    const chipped = new Set([...text.matchAll(/data-src="(src-[^"]+)"/g)]
      .filter((x) => !inFooterEntry(x.index)).map((x) => x[1]));
    for (const [s, e] of (c.spans.R7 || [])) {
      const body = text.slice(s, e);
      const id = (body.match(/id="(src-[^"]+)"/) || [])[1];
      if (!id) continue;
      seen++;
      if (chipped.has(id)) continue;
      const reason = (body.match(/data-nochip="([^"]*)"/) || [])[1];
      if (reason && NOCHIP.includes(reason)) continue;
      n++;
      violation('A15', `${l}/index.html`,
        reason ? `${id} has data-nochip="${reason}", not one of ${NOCHIP.join(' / ')}`
               : `${id} has no chip and no data-nochip reason`);
    }
  }
  if (!n) ran('A15', `${seen} footer key(s) each carry a chip or a declared reason`);
}

/* ===================================================================== A20 */
/* A footer key whose "Used for:" clause names an on-page claim that currently
   carries a chip pointing at a DIFFERENT key is a mis-wire, not an orphan.

   This is the actionable half of the warning validate_lesson V4 has been
   emitting with nobody able to act on it: V4 says "this key is never
   referenced" and stops. A15 says the same thing and stops. Neither can tell
   an orphan (a source genuinely cited nowhere) from a mis-wire (a source cited
   in the wrong place, which leaves its correct key looking orphaned in the same
   footer). The difference is the whole fix.

   METHOD, and it is deliberately a lead generator rather than an assertion.
   For each key with no chip anywhere, take the distinctive tokens of its
   "Used for:" clause - the words a claim about that source would have to use -
   and look for a chipped sentence carrying a different key that contains
   enough of them. Report the pair. ADVISE, because "enough of them" is a
   threshold and a threshold is not a proof; the human decides.

   Validated against the 19 rewires applied in Phase 3 Part 1 before it was
   committed: it independently proposes the ones whose evidence is a Used-for
   clause, which is what it is for, and proposes none of the ones whose evidence
   is a name in the sentence, which A13 already owns. */
const STOP = new Set(('the a an and or of for to in on at by with from as is are was were '
  + 'that this these those it its used which what when where who whom whose not no '
  + 'page claim claims lesson section sessions appendix figure figures data '
  + 'course file build here there also than then their they them he she his her '
  + 'one two three four five six seven eight nine ten first second third').split(/\s+/));
function contentTokens(text) {
  return [...new Set((text.toLowerCase().match(/[a-z][a-z0-9-]{3,}/g) || [])
    .filter((w) => !STOP.has(w)))];
}
if (enabled('A20')) {
  let n = 0, seen = 0;
  for (const l of lessonFiles()) {
    const text = src(l);
    const c = classify(text);
    const chipped = new Set([...text.matchAll(/data-src="(src-[^"]+)"/g)].map((x) => x[1]));
    /* every chipped sentence, as a container with its keys */
    const containers = [];
    for (const rx of [/<p\b[^>]*>[\s\S]*?<\/p>/g, /<li\b[^>]*>[\s\S]*?<\/li>/g,
                      /cap\s*:\s*'(?:[^'\\]|\\.)*'/g, /<span class="src"[^>]*>[\s\S]*?<\/span>/g]) {
      for (const m of text.matchAll(rx)) containers.push({ i: m.index, body: m[0] });
    }
    for (const [s0, e0] of (c.spans.R7 || [])) {
      const body = text.slice(s0, e0);
      const id = (body.match(/id="(src-[^"]+)"/) || [])[1];
      if (!id || chipped.has(id)) continue;
      seen++;
      const used = (body.match(/Used for:\s*([\s\S]*?)(?:<span class="conf|<\/li>)/) || [])[1];
      if (!used) continue;                       /* no Used-for clause: A15 owns it */
      const want = contentTokens(used.replace(/<[^>]*>/g, ' '));
      if (want.length < 3) continue;
      let best = null;
      for (const ct of containers) {
        if (c.regionOf(ct.i) === 'R6' || c.regionOf(ct.i) === 'R7') continue;
        const keys = [...new Set([...ct.body.matchAll(/data-src="(src-[^"]+)"/g)].map((x) => x[1]))];
        if (!keys.length || keys.includes(id)) continue;
        const plain = ct.body.replace(/<[^>]*>/g, ' ').toLowerCase();
        const hit = want.filter((w) => plain.includes(w));
        const ratio = hit.length / want.length;
        if (hit.length >= 3 && ratio >= 0.5 && (!best || hit.length > best.hit.length)) {
          best = { ct, keys, hit, ratio };
        }
      }
      if (best) {
        n++;
        violation('A20', `${l}/index.html:${c.lineAt(best.ct.i)}`,
          `${id} looks mis-wired rather than orphaned: its "Used for" clause matches this claim `
          + `on ${best.hit.length}/${want.length} terms (${best.hit.slice(0, 6).join(', ')}),\n`
          + `           and the claim carries ${best.keys.join(', ')}`);
      }
    }
  }
  if (!n) ran('A20', `${seen} key(s) with no chip; none matches a claim chipped to another key`);
}

/* ================================================================ A17-A19 */
/* DISABLED — the vocabulary feature is greenfield. Stubs are here so the feature
   is built against the rules rather than retrofitted to them. A disabled rule
   prints nothing at all, so these produce no output until severity is flipped.
   The sentence counter below is real and proved: see test-editorial-sentences. */

/** A18's counter. Sentence-terminating . ? ! outside abbreviations, decimals and
    quoted matter. Proved against EDITORIAL.md's ratified worked example and B2's
    GOOD definition; the initials rule must never eat a terminal full stop, which
    is what "…followed by U." would otherwise lose. */
export function countSentences(s) {
  let t = s;
  t = t.replace(/[“”"][^“”"]*[“”"]/g, ' Q ');
  t = t.replace(/\b\d+(?:\.\d+)+/g, ' NUM ');
  t = t.replace(/\b\d+\.\d/g, ' NUM ');
  t = t.replace(/\b(?:e\.g|i\.e|cf|etc|vs|Dr|Mr|Ms|Prof|Inc|Ltd|Co|St|No|Rev|Rul|approx|Fig|Sec|§§?)\./gi, ' ABBR ');
  t = t.replace(/\b[A-Z]\.(?!\s*$)/g, ' INIT ');
  const m = t.match(/[.?!]+(?=\s|$)/g);
  return m ? m.length : 0;
}

const VOCAB_SOURCE = 'VOCABULARY.md';
if (enabled('A17')) {
  /* Every data-term in a lesson resolves to an entry in VOCABULARY.md, and every
     entry is marked at least once. Regions R1, R3 in the lessons; the source file. */
  ran('A17', `not built: no data-term markup and no ${VOCAB_SOURCE}`);
}
if (enabled('A18')) {
  /* Every definition is at most two sentences, asserted on the SOURCE record, not
     on the rendered page — the same discipline verify-case.mjs enforces. */
  ran('A18', `not built: no ${VOCAB_SOURCE}`);
}
if (enabled('A19')) {
  /* Every read_more names a src- key present in the footer of every lesson whose
     table carries that term. This is the join to the bibliography. */
  ran('A19', `not built: no ${VOCAB_SOURCE}`);
}


/* ------------------------------------------------------------------ output */

if (clean.length) console.log(clean.join('\n'));
if (skipped.length) console.log('\n' + skipped.join('\n'));
if (hard.length) console.log('\n' + hard.join('\n'));
if (advisory.length) {
  console.log('\n' + '='.repeat(66));
  console.log('ADVISORY — reported, does not block the push');
  console.log('='.repeat(66));
  console.log(advisory.join('\n'));
}

console.log(`\nsummary: ${clean.length} rule(s) clean, ${hard.length} hard failure(s), `
  + `${advisory.length} advisory${ADVISORY_ONLY ? ' (--advisory-only: nothing blocks)' : ''}`);

process.exit(hard.length ? 1 : 0);
