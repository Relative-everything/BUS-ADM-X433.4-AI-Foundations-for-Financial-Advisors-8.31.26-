#!/usr/bin/env node
/**
 * build-unsourced.mjs — generate docs/unsourced-claims.md from the markers the
 * corpus actually carries.
 *
 * GENERATED AND NEVER HAND-MAINTAINED. A register kept by hand is a register
 * that disagrees with the files it describes; this repo has found that three
 * times already (three hand-edited counts in Phase 1, nine copies of the minute
 * figures in Phase 2, `total_references` designed out of SOURCES.md in Phase 3).
 *
 *   node scripts/build-unsourced.mjs           write it
 *   node scripts/build-unsourced.mjs --check   exit 1 if it would change
 *
 * THE TWO MARKERS, and the distinction is the whole point:
 *
 *   [NEEDS SOURCE]  the claim is right; a citation has not been attached.
 *   [UNCONFIRMED]   no source corroborates it. The claim itself is in question.
 *
 * [NEEDS SOURCE] IS THE STRONGER CLAIM. A wrong [UNCONFIRMED] gets read and
 * downgraded; a wrong [NEEDS SOURCE] gets read and believed. Default to
 * [UNCONFIRMED] whenever you are unsure.
 *
 * HOW A MARKER CARRIES ITS METADATA. The student sees the short marker and
 * nothing else. Everything this register needs rides in an adjacent annotation
 * comment, which is R5 and never rendered:
 *
 *   <!-- CLAIM weight=exercise resolve="..." candidate="..." confidence=low -->
 *   /* CLAIM weight=answer resolve="..." *\/          (inside <script>)
 *
 * The annotation must sit within ANNOT_WINDOW characters BEFORE its marker. A
 * marker with no annotation is a HARD FAILURE, not a silent omission: a claim
 * that entered the register without saying what would resolve it is a claim
 * nobody can act on.
 *
 * SORTED BY HOW MUCH DEPENDS ON THE CLAIM, not by file order. `weight` is the
 * authored half of that and it is the only authored field; file, line, section,
 * region and the verbatim claim are all derived.
 *
 * pedagogy R12: plain ES, no dependency.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { classify, REGIONS } from './editorial-regions.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const OUT = join(REPO, 'docs/unsourced-claims.md');
const LESSONS = ['index.html', 'session-0.1/index.html', 'session-1/index.html',
                 'session-2/index.html', 'session-3/index.html', 'session-4/index.html'];

/** How far back from a marker its annotation may sit. */
const ANNOT_WINDOW = 900;

/**
 * WEIGHT — how much depends on the claim. This is the sort key, and it is the
 * only field a human types, because it is the only one the corpus cannot see.
 */
const WEIGHTS = [
  ['answer', 'An answer key or the correctness of an exercise depends on it. A student is marked right or wrong by it.'],
  ['exercise', 'A work-along gate or an interaction is built on it. The room does something because of it.'],
  ['section', "A whole section's argument rests on it. Remove the claim and the section has no point."],
  ['claim', 'A standalone factual claim in prose. A reader could repeat it to a client.'],
  ['aside', 'A passing remark. Nothing else on the page leans on it.'],
];
const WEIGHT_ORDER = Object.fromEntries(WEIGHTS.map(([w], i) => [w, i]));
const CONFIDENCES = ['high', 'medium', 'low', 'none'];

const MARKER = /\[(NEEDS SOURCE|UNCONFIRMED)\]/g;
const ANNOT = /(?:<!--|\/\*)\s*CLAIM\s+([\s\S]*?)(?:-->|\*\/)/g;

const problems = [];

/** Parse `weight=x resolve="..." candidate="..." confidence=low` into an object. */
function parseAnnot(body) {
  const out = {};
  const rx = /([a-z_]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+))/g;
  let m;
  while ((m = rx.exec(body))) out[m[1]] = m[2] ?? m[3] ?? m[4];
  return out;
}

/** Section id at an offset, and whether that section is core or appendix. */
function sectionIndexer(text) {
  const marks = [];
  for (const m of text.matchAll(/<section\b[^>]*\bid="([^"]+)"[^>]*>/g)) {
    marks.push({ id: m[1], at: m.index, tier: (m[0].match(/data-tier="([^"]+)"/) || [, ''])[1] });
  }
  return (at) => {
    let cur = null;
    for (const s of marks) { if (s.at <= at) cur = s; else break; }
    return cur;
  };
}

/** The sentence the marker sits in, cleaned of tags, as the claim verbatim. */
function claimText(text, at) {
  const from = Math.max(0, at - 700);
  let before = text.slice(from, at);
  let after = text.slice(at, at + 700);
  const cut = before.lastIndexOf('>');
  if (cut >= 0) before = before.slice(cut + 1);
  const end = after.indexOf('<');
  if (end >= 0) after = after.slice(0, end);
  const raw = (before + after)
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&middot;/g, '·')
    .replace(/&sect;/g, '§').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    .replace(/\\u2014/g, '—').replace(/\\'/g, "'")
    .replace(/\s+/g, ' ').trim();
  /* one sentence around the marker, not a paragraph */
  const i = raw.indexOf('[');
  const s = raw.lastIndexOf('. ', i) + 1;
  let e = raw.indexOf('. ', i);
  if (e < 0) e = raw.length; else e += 1;
  return raw.slice(Math.max(0, s), e).trim() || raw;
}

export function collect() {
  const rows = [];
  for (const rel of LESSONS) {
    const text = readFileSync(join(REPO, rel), 'utf8');
    const c = classify(text);
    const whereIs = sectionIndexer(text);
    const annots = [];
    ANNOT.lastIndex = 0;
    let a;
    while ((a = ANNOT.exec(text))) annots.push({ at: a.index, end: a.index + a[0].length, fields: parseAnnot(a[1]) });
    MARKER.lastIndex = 0;
    let m;
    while ((m = MARKER.exec(text))) {
      const at = m.index;
      const region = c.regionOf(at);
      const line = text.slice(0, at).split('\n').length;
      const where = `${rel}:${line}`;
      /* an annotation declaring the convention is not a claim */
      const near = annots.filter((x) => x.end <= at && at - x.end <= ANNOT_WINDOW).pop();
      if (!near) {
        problems.push(`${where}  [${m[1]}] has no CLAIM annotation within ${ANNOT_WINDOW} chars before it`);
        continue;
      }
      const f = near.fields;
      if (!f.weight || !(f.weight in WEIGHT_ORDER)) {
        problems.push(`${where}  CLAIM weight ${JSON.stringify(f.weight || '')} is not one of ${Object.keys(WEIGHT_ORDER).join(' / ')}`);
        continue;
      }
      if (!f.resolve) { problems.push(`${where}  CLAIM has no resolve="…" — a claim nobody can act on is not a register entry`); continue; }
      if (f.candidate && !CONFIDENCES.includes(f.confidence || '')) {
        problems.push(`${where}  CLAIM names a candidate source but confidence is ${JSON.stringify(f.confidence || '')}, not one of ${CONFIDENCES.join(' / ')}`);
        continue;
      }
      const sec = whereIs(at);
      rows.push({
        file: rel, line, region, marker: m[1],
        section: sec ? sec.id : '(outside any section)',
        tier: sec ? (sec.tier || 'core') : '',
        claim: claimText(text, at),
        weight: f.weight, resolve: f.resolve,
        candidate: f.candidate || '', confidence: f.confidence || '',
        note: f.note || '',
      });
    }
  }
  rows.sort((x, y) => WEIGHT_ORDER[x.weight] - WEIGHT_ORDER[y.weight] ||
                      (x.marker === y.marker ? 0 : x.marker === 'UNCONFIRMED' ? -1 : 1) ||
                      x.file.localeCompare(y.file) || x.line - y.line);
  return rows;
}

function render(rows) {
  const byMarker = (k) => rows.filter((r) => r.marker === k).length;
  const L = [];
  L.push('# Unsourced claims');
  L.push('');
  L.push('**Generated from the markers in the corpus by `scripts/build-unsourced.mjs`.');
  L.push('Do not edit: the next run overwrites it.** To add an entry, mark the claim in');
  L.push('the lesson. To remove one, attach the source and delete the marker.');
  L.push('');
  L.push('## The two markers');
  L.push('');
  L.push('| Marker | What it asserts |');
  L.push('|---|---|');
  L.push('| **`[UNCONFIRMED]`** | **No source corroborates it. The claim itself is in question.** |');
  L.push('| **`[NEEDS SOURCE]`** | **The claim is right; a citation has not been attached.** |');
  L.push('');
  L.push('`[NEEDS SOURCE]` is the **stronger** claim, because it asserts that somebody');
  L.push('checked. A wrong `[UNCONFIRMED]` gets read and downgraded; a wrong');
  L.push('`[NEEDS SOURCE]` gets read and believed. **The default is `[UNCONFIRMED]`**,');
  L.push('and moving an entry the other way is a decision with evidence behind it.');
  L.push('');
  L.push('Both forms are declared in `EDITORIAL.md` A16 and enforced by');
  L.push('`scripts/verify-editorial.mjs`; a marker in any other form is a hard failure.');
  L.push('');
  L.push('## Totals');
  L.push('');
  L.push('| | |');
  L.push('|---|---|');
  L.push(`| Marked claims | **${rows.length}** |`);
  L.push(`| \`[UNCONFIRMED]\` | **${byMarker('UNCONFIRMED')}** |`);
  L.push(`| \`[NEEDS SOURCE]\` | ${byMarker('NEEDS SOURCE')} |`);
  for (const [w, meaning] of WEIGHTS) {
    const n = rows.filter((r) => r.weight === w).length;
    if (n) L.push(`| weight \`${w}\` | ${n} — ${meaning} |`);
  }
  L.push('');
  L.push('## The order');
  L.push('');
  L.push('**Sorted by how much depends on the claim, not by file order.** A claim an');
  L.push('answer key rests on is worth resolving before a passing remark, and file');
  L.push('order tells you nothing about which is which. `weight` is the only field');
  L.push('typed by hand; file, line, section, region and the claim text are read out of');
  L.push('the corpus on every run.');
  L.push('');
  if (!rows.length) {
    L.push('---');
    L.push('');
    L.push('*No marked claims. Either every claim carries a source, or nobody has looked.*');
    return L.join('\n') + '\n';
  }
  L.push('---');
  L.push('');
  let lastWeight = null;
  rows.forEach((r, i) => {
    if (r.weight !== lastWeight) {
      lastWeight = r.weight;
      const meaning = WEIGHTS.find(([w]) => w === r.weight)[1];
      L.push(`## weight \`${r.weight}\``);
      L.push('');
      L.push(`*${meaning}*`);
      L.push('');
    }
    L.push(`### ${i + 1}. \`${r.file}:${r.line}\` — \`#${r.section}\` — **[${r.marker}]**`);
    L.push('');
    L.push(`> ${r.claim}`);
    L.push('');
    L.push('| | |');
    L.push('|---|---|');
    L.push(`| File and line | \`${r.file}:${r.line}\` |`);
    L.push(`| Section | \`#${r.section}\`${r.tier ? ` (\`${r.tier}\`)` : ''} |`);
    L.push(`| Region | ${r.region} — ${REGIONS[r.region] || '?'} |`);
    L.push(`| Marker | **[${r.marker}]** |`);
    L.push(`| What would resolve it | ${r.resolve} |`);
    L.push(`| Candidate source | ${r.candidate ? `${r.candidate} — confidence **${r.confidence}**` : '*none*'} |`);
    if (r.note) L.push(`| Note | ${r.note} |`);
    L.push('');
  });
  return L.join('\n') + '\n';
}

/* ---------------------------------------------------------------------- main */

if (process.argv[1] && process.argv[1].endsWith('build-unsourced.mjs')) {
  const rows = collect();
  if (problems.length) {
    console.error(`FAIL  build-unsourced.mjs found ${problems.length} marker(s) that cannot enter the register:`);
    for (const p of problems) console.error('   - ' + p);
    console.error('\n      Every marker carries an adjacent annotation:');
    console.error('        <!-- CLAIM weight=<answer|exercise|section|claim|aside> resolve="…" [candidate="…" confidence=<high|medium|low|none>] -->');
    console.error('      A claim in the register that does not say what would resolve it is a');
    console.error('      claim nobody can act on.');
    process.exit(1);
  }
  const body = render(rows);
  let before = null;
  try { before = readFileSync(OUT, 'utf8'); } catch { /* first run */ }
  if (before === body) { console.log(`current       docs/unsourced-claims.md  (${rows.length} marked claim(s))`); process.exit(0); }
  if (CHECK) { console.error('WOULD CHANGE  docs/unsourced-claims.md'); process.exit(1); }
  writeFileSync(OUT, body);
  console.log(`written       docs/unsourced-claims.md  ${rows.length} marked claim(s), `
    + `${rows.filter((r) => r.marker === 'UNCONFIRMED').length} UNCONFIRMED / ${rows.filter((r) => r.marker === 'NEEDS SOURCE').length} NEEDS SOURCE`);
}
