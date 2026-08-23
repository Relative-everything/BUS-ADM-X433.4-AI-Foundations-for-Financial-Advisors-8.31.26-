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

/* Lessons with the core/appendix/tier architecture. session-0.1 is outside it —
   EDITORIAL.md D14 is OPEN, and A1-A7 have no population in that file. The skip
   is declared and dated here rather than left silent. */
const TIERED = ['session-1', 'session-2', 'session-3', 'session-4'];
const ALL_LESSONS = ['session-0.1', ...TIERED];
const D14_SKIP = 'session-0.1';
const D14_REASON = 'D14 OPEN, deferred 2026-08-23 per commit f5bf47b: no appendix, no data-tier, no tier bar';

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
const src = (l) => readFileSync(join(REPO, l, 'index.html'), 'utf8');

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
/* The lede's "The N sections above ... about M minutes" matches the core. */
if (enabled('A4')) {
  let n = 0;
  for (const l of lessonFiles()) {
    if (l === D14_SKIP) { skipped.push(`SKIP  A4   ${l}  ${D14_REASON}`); continue; }
    const s = sections(src(l));
    const div = s.find((x) => x.apxdiv);
    if (!div) continue;
    const core = s.filter((x) => !x.apx && !x.apxdiv);
    const sum = core.reduce((a, b) => a + (b.mins || 0), 0);
    const m = div.body.match(/The\s+(\d+)\s+sections above are the core session and run in about\s+(\d+)\s+minutes/);
    if (!m) continue;
    const [, nSec, nMin] = [m[0], Number(m[1]), Number(m[2])];
    if (nSec !== core.length || nMin !== sum) {
      n++;
      violation('A4', `${l}/index.html`, `lede claims ${nSec} core sections in ${nMin} min; page has ${core.length} in ${sum}`);
    }
  }
  if (!n) ran('A4', 'core ledes match their page');
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
