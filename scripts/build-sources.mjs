#!/usr/bin/env node
/**
 * build-sources.mjs — parse SOURCES.md into the source model, and derive the
 * usage half of it from the corpus.
 *
 * SOURCES.md is hand-edited and is the source of truth for what a work IS.
 * This file is the source of truth for where it is USED, and the split is
 * deliberate: a human knows the publisher, only the corpus knows the chip count.
 *
 *   node scripts/build-sources.mjs            # print the model as a report
 *   node scripts/build-sources.mjs --json     # print it as JSON
 *
 * NOTHING DERIVED IS EVER TYPED. total_references and cited_by[] are computed
 * here and do not exist as fields in SOURCES.md, because Phase 1 found three
 * hand-edited counts silently out of sync with their tables and Phase 2 found
 * nine copies of the minute figures. A reference count is the same defect
 * waiting to happen.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
export const LESSONS = ['session-0.1', 'session-1', 'session-2', 'session-3', 'session-4'];

/* The three kinds that are exempt from carrying a confidence chip, and that A15
   accepts as a data-nochip reason. THIS LIST IS ASSERTED AGAINST THE CHECKER'S
   BELOW rather than kept in step by hand: "wire them so the two agree by
   construction". */
export const CHIP_EXEMPT = ['authority', 'background', 'fabricated'];
const KINDS = ['evidence', 'assigned_reading', 'case', ...CHIP_EXEMPT];

/** A field whose value the register could not verify. Never rendered as a fact. */
export const UNVERIFIED = '[UNVERIFIED, needs source]';
export const isUnverified = (v) => typeof v === 'string' && v.startsWith('[UNVERIFIED');
/** A field that does not apply to this kind of work, as opposed to one unknown. */
const NA = new Set(['not applicable']);
export const isAbsent = (v) => v === undefined || v === null || v === '' || isUnverified(v) || NA.has(v);

/* --------------------------------------------------------------------- parse */

/**
 * SOURCES.md is markdown with one `## src-key` heading per work, each followed
 * by a fenced ```source block of `field: value` lines. The parser is strict on
 * purpose: an unknown field, a duplicate key, a missing block or an unknown
 * `kind` throws rather than being skipped. build-case.mjs's lesson is that a
 * pattern that no longer matches has to be a hard failure, because the damage
 * otherwise surfaces in the generated artifact rather than in the edited file.
 */
const FIELDS = new Set(['title', 'author', 'publisher', 'link', 'published', 'retrieved',
  'confidence', 'kind', 'moving_target', 'figure_class', 'index_version',
  'recheck_before', 'scope', 'disclose_on_page']);

export function parseSources() {
  const text = readFileSync(join(REPO, 'SOURCES.md'), 'utf8');
  const out = new Map();
  const re = /^## (src-[a-z0-9-]+)\s*$/gm;
  const heads = [...text.matchAll(re)];
  if (!heads.length) throw new Error('SOURCES.md: no `## src-…` records found');
  heads.forEach((h, i) => {
    const key = h[1];
    if (out.has(key)) throw new Error(`SOURCES.md: duplicate record ${key}`);
    const body = text.slice(h.index, i + 1 < heads.length ? heads[i + 1].index : text.length);
    const fence = body.match(/```source\n([\s\S]*?)\n```/);
    if (!fence) throw new Error(`SOURCES.md: ${key} has no \`\`\`source block`);
    const rec = { key, used_for: {} };
    for (const raw of fence[1].split('\n')) {
      const line = raw.trimEnd();
      if (!line.trim()) continue;
      const m = line.match(/^([a-z_.0-9-]+):\s*(.*)$/);
      if (!m) throw new Error(`SOURCES.md: ${key}: cannot parse line ${JSON.stringify(line)}`);
      const [, field, value] = m;
      if (field.startsWith('used_for.')) {
        const lesson = field.slice('used_for.'.length);
        if (!LESSONS.includes(lesson)) throw new Error(`SOURCES.md: ${key}: unknown lesson ${lesson}`);
        rec.used_for[lesson] = value.trim();
        continue;
      }
      if (!FIELDS.has(field)) throw new Error(`SOURCES.md: ${key}: unknown field "${field}"`);
      rec[field] = value.trim();
    }
    for (const req of ['title', 'kind', 'confidence', 'scope']) {
      if (!rec[req]) throw new Error(`SOURCES.md: ${key} has no ${req}`);
    }
    if (!KINDS.includes(rec.kind)) {
      throw new Error(`SOURCES.md: ${key} has kind "${rec.kind}", not one of ${KINDS.join(' / ')}`);
    }
    rec.moving_target = rec.moving_target === 'true';
    rec.disclose_on_page = rec.disclose_on_page === 'true';
    rec.chip_exempt = CHIP_EXEMPT.includes(rec.kind);
    if (rec.moving_target && isAbsent(rec.recheck_before)) {
      throw new Error(`SOURCES.md: ${key} is a moving target with no recheck_before`);
    }
    if (rec.moving_target && isAbsent(rec.figure_class)) {
      throw new Error(`SOURCES.md: ${key} is a moving target with no figure_class`);
    }
    out.set(key, rec);
  });
  return out;
}

/* ------------------------------------------------------- derive, never type */

/** Which section a 0-based offset falls in, for cited_by. */
function sectionIndex(text) {
  const marks = [];
  for (const m of text.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)) marks.push({ id: m[1], at: m.index });
  return (at) => {
    let cur = null;
    for (const s of marks) { if (s.at <= at) cur = s.id; else break; }
    return cur;
  };
}

/**
 * cited_by: every chip in every lesson, attributed to the section it sits in.
 * The footer's own terminal chip is EXCLUDED — an entry labelling its own
 * confidence is not a citation of itself, and counting it would inflate every
 * total by one and, in session-0.1, make an orphan impossible to see.
 */
export function deriveUsage(sources) {
  for (const rec of sources.values()) { rec.cited_by = []; rec.total_references = 0; }
  for (const lesson of LESSONS) {
    const text = readFileSync(join(REPO, lesson, 'index.html'), 'utf8');
    const whereIs = sectionIndex(text);
    /* the span of the footer source list, so its self-labelling chips are excluded */
    const listStart = text.search(/<li id="src-/);
    const listEnd = text.lastIndexOf('</li>');
    for (const m of text.matchAll(/data-src="(src-[^"]+)"/g)) {
      const key = m[1];
      const inFooterList = listStart >= 0 && m.index > listStart && m.index < listEnd;
      const rec = sources.get(key);
      if (!rec) {
        (sources.dangling ||= []).push(`${lesson}: chip points at ${key}, which SOURCES.md does not define`);
        continue;
      }
      if (inFooterList) continue;
      const sec = whereIs(m.index) || '(footer)';
      let row = rec.cited_by.find((r) => r.lesson === lesson && r.section === sec);
      if (!row) { row = { lesson, section: sec, chips: 0 }; rec.cited_by.push(row); }
      row.chips++;
      rec.total_references++;
    }
    for (const rec of sources.values()) {
      if (rec.used_for[lesson]) {
        const has = rec.cited_by.some((r) => r.lesson === lesson);
        rec.declared_in ||= [];
        if (!rec.declared_in.includes(lesson)) rec.declared_in.push(lesson);
        void has;
      }
    }
  }
  return sources;
}

/** The checker's own NOCHIP list, read out of it, so the two cannot drift. */
export function assertChipExemptMatchesChecker() {
  const checker = readFileSync(join(REPO, 'scripts/verify-editorial.mjs'), 'utf8');
  const m = checker.match(/const NOCHIP = \[([^\]]*)\]/);
  if (!m) throw new Error('verify-editorial.mjs: cannot find the A15 NOCHIP list');
  const theirs = [...m[1].matchAll(/'([a-z_]+)'/g)].map((x) => x[1]).sort();
  const mine = [...CHIP_EXEMPT].sort();
  if (theirs.join(',') !== mine.join(',')) {
    throw new Error(`chip-exempt kinds ${mine.join('/')} do not match A15's data-nochip values ${theirs.join('/')}`);
  }
  return theirs;
}

export function model() {
  const sources = deriveUsage(parseSources());
  assertChipExemptMatchesChecker();
  return sources;
}

/* ---------------------------------------------------------------------- main */

if (process.argv[1] && process.argv[1].endsWith('build-sources.mjs')) {
  const sources = model();
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify([...sources.values()], null, 2));
  } else {
    const rows = [...sources.values()].sort((a, b) => b.total_references - a.total_references);
    console.log(`${rows.length} source records, ${rows.reduce((a, b) => a + b.total_references, 0)} references\n`);
    for (const r of rows) {
      const where = r.cited_by.map((c) => `${c.lesson.replace('session-', 's')}#${c.section}×${c.chips}`).join(' ');
      console.log(`${r.key.padEnd(26)} ${r.kind.padEnd(17)} ${String(r.total_references).padStart(3)}  ${r.moving_target ? 'MOVING' : '      '}  ${where}`);
    }
    const orphans = rows.filter((r) => r.total_references === 0);
    console.log(`\n${orphans.length} record(s) with no chip: ${orphans.map((r) => `${r.key} (${r.kind})`).join(', ')}`);
    if (sources.dangling) { console.log('\nDANGLING:'); sources.dangling.forEach((d) => console.log('  ' + d)); }
  }
}
