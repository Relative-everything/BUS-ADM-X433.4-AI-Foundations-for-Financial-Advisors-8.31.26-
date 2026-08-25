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
import { createHash } from 'node:crypto';
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
const FIELDS = new Set(['title', 'author', 'publisher', 'link', 'published',
  'last_retrieved', 'last_verified', 'verified_by', 'retrieval_note', 'content_changed',
  'confidence', 'kind', 'moving_target', 'figure_class', 'index_version',
  'recheck_before', 'scope', 'disclose_on_page']);

/* ------------------------------------------------- the two dating fields --
 * They are not interchangeable and neither substitutes for the other.
 *
 *   last_verified   THE INSTRUCTOR read the source and confirmed the repo's
 *                   claims about it are still accurate. A HUMAN ATTESTATION.
 *                   Nothing in this repository may write or advance it — see
 *                   assertVerifiedLock() below and scripts/attest-verified.mjs.
 *                   EMPTY is the honest value wherever the repo carries no
 *                   evidence that a human read the source. Empty is not a gap
 *                   to be filled; it is the measurement.
 *
 *   last_retrieved  A MACHINE FETCHED the source. Records WHEN, and never that
 *                   anything is accurate. This is what "update all live data
 *                   points" advances.
 *
 * A FULL date is YYYY-MM-DD. A PARTIAL date (YYYY-MM) is accepted, because it
 * is the honest record of a pull whose day nobody wrote down, and REPORTED —
 * a month cannot be ordered against a day, and that is exactly where src-aa's
 * version incoherence hid. It is never silently promoted to a day. */
export const FULL_DATE = /^\d{4}-\d{2}-\d{2}$/;
export const PARTIAL_DATE = /^\d{4}-\d{2}$/;
export const isPartialDate = (v) => typeof v === 'string' && PARTIAL_DATE.test(v);
/** For ordering only: a partial date stands at its EARLIEST possible day.
 *  Declared, so it is never mistaken for the date itself. */
export const orderableDate = (v) => (isPartialDate(v) ? v + '-01' : v);

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
    const present = new Set();
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
      /* PER-LESSON LIVE-DATA FIELDS. A moving target retrieved more than once
         has more than one retrieval to register, and the register is fields on
         the source record rather than a parallel list. `retrieved.session-2`
         and `index_version.session-2` are how one work carries three pulls. */
      const per = field.match(/^(last_retrieved|index_version|figures)\.(.+)$/);
      if (per) {
        const [, f, lesson] = per;
        if (!LESSONS.includes(lesson)) throw new Error(`SOURCES.md: ${key}: unknown lesson ${lesson}`);
        (rec.pulls ||= {});
        (rec.pulls[lesson] ||= {})[f === 'last_retrieved' ? 'retrieved' : f] = value.trim();
        continue;
      }
      if (!FIELDS.has(field)) throw new Error(`SOURCES.md: ${key}: unknown field "${field}"`);
      present.add(field);
      rec[field] = value.trim();
    }
    for (const req of ['title', 'kind', 'confidence', 'scope']) {
      if (!rec[req]) throw new Error(`SOURCES.md: ${key} has no ${req}`);
    }
    /* BOTH dating fields are required to be PRESENT on every record. Neither is
       optional and neither substitutes for the other. last_verified may be
       EMPTY — that is its honest value almost everywhere — but the line must
       exist, so that an empty attestation is a recorded fact rather than an
       omission nobody noticed. */
    for (const req of ['last_retrieved', 'last_verified']) {
      if (!present.has(req)) throw new Error(`SOURCES.md: ${key} has no ${req} field. Both dating fields are required on every record; last_verified may be empty, but the line must be there.`);
    }
    rec.last_verified = rec.last_verified || '';
    if (rec.last_verified) {
      if (rec.last_verified === 'not applicable') {
        if (!['case', 'fabricated'].includes(rec.kind)) {
          throw new Error(`SOURCES.md: ${key}: last_verified "not applicable" is permitted only for kind case or fabricated, not ${rec.kind}. Leave it EMPTY instead — empty is the honest value.`);
        }
      } else if (!FULL_DATE.test(rec.last_verified)) {
        throw new Error(`SOURCES.md: ${key}: last_verified must be a full YYYY-MM-DD date, "not applicable" for a synthetic or fabricated work, or empty. Got ${JSON.stringify(rec.last_verified)}.`);
      } else if (!rec.verified_by) {
        throw new Error(`SOURCES.md: ${key}: last_verified is populated but verified_by is empty. A verification date without its evidence is the tool vouching for itself.`);
      }
    }
    if (rec.verified_by && !rec.last_verified) {
      throw new Error(`SOURCES.md: ${key}: verified_by is set but last_verified is empty.`);
    }
    rec.verified = Boolean(rec.last_verified) && rec.last_verified !== 'not applicable';
    rec.retrieved_partial = isPartialDate(rec.last_retrieved);
    /* A fetch that found the source SAYING SOMETHING DIFFERENT is a finding, not
       an update. The field records the date, the delta, and what on the page
       depends on it; nothing is silently rewritten on the strength of it. */
    if (rec.content_changed && !/^\d{4}-\d{2}-\d{2}\b/.test(rec.content_changed)) {
      throw new Error(`SOURCES.md: ${key}: content_changed must begin with the YYYY-MM-DD of the fetch that found the change.`);
    }
    if (!KINDS.includes(rec.kind)) {
      throw new Error(`SOURCES.md: ${key} has kind "${rec.kind}", not one of ${KINDS.join(' / ')}`);
    }
    rec.moving_target = rec.moving_target === 'true';
    rec.disclose_on_page = rec.disclose_on_page === 'true';
    rec.chip_exempt = CHIP_EXEMPT.includes(rec.kind);
    if (rec.pulls) {
      for (const [lesson, p] of Object.entries(rec.pulls)) {
        if (!rec.used_for[lesson]) throw new Error(`SOURCES.md: ${key} registers a pull for ${lesson} but declares no used_for there`);
        if (!p.retrieved) throw new Error(`SOURCES.md: ${key}: pull for ${lesson} has no last_retrieved date`);
        p.partial = isPartialDate(p.retrieved);
      }
    }
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


/* ============================================================ the guard ====
 * last_verified IS THE INSTRUCTOR'S FIELD AND NOTHING HERE MAY MOVE IT.
 *
 * The rule is not a convention, because a convention is a comment an agent can
 * read and step over. It is wired two ways and both have to be defeated at once
 * for a date to move without a human:
 *
 *   1. THE LOCK. scripts/sources-verified.lock.json carries a digest of every
 *      (key, last_verified) pair. assertVerifiedLock() recomputes it on every
 *      parse and THROWS on any difference, naming the keys that moved. Every
 *      generator in this repo goes through model(), so a last_verified that
 *      moved takes down build-sources, inject-sources, build-bibliography and
 *      verify-sources together. There is no path that writes a lesson footer,
 *      the bibliography, the live-data register or the verification queue while
 *      a verification date is unaccounted for.
 *
 *   2. THE WRITER. scripts/attest-verified.mjs is the only thing that updates
 *      the lock, and it REFUSES unless it is talking to an interactive
 *      terminal. A generator, a re-pull, a CI job and an agent shell all have
 *      no TTY, and all are refused. That is the constraint being observed
 *      rather than asserted.
 *
 * A generated verification date is the tool vouching for itself, which is the
 * same defect class as a chip pointing at the wrong source.
 */
export const LOCK_PATH = join(REPO, 'scripts/sources-verified.lock.json');

/** The canonical text a digest is taken over: one `key=value` line per record, sorted. */
export function verifiedCanonical(sources) {
  return [...sources.values()]
    .map((r) => `${r.key}=${r.last_verified || ''}`)
    .sort()
    .join('\n') + '\n';
}
export function verifiedDigest(sources) {
  return createHash('sha256').update(verifiedCanonical(sources), 'utf8').digest('hex');
}

/**
 * Throws unless every last_verified in SOURCES.md is the value the lock notarised.
 * `opts.explain` returns the diff instead of throwing, for the queue generator.
 */
export function assertVerifiedLock(sources, opts = {}) {
  let lock;
  try { lock = JSON.parse(readFileSync(LOCK_PATH, 'utf8')); }
  catch { throw new Error(`sources-verified.lock.json is missing or unreadable. It notarises every last_verified date. Run: node scripts/attest-verified.mjs --init  (interactive terminal required)`); }
  const moved = [], unsynced = [];
  for (const r of sources.values()) {
    const was = Object.prototype.hasOwnProperty.call(lock.entries || {}, r.key) ? lock.entries[r.key].last_verified : null;
    const now = r.last_verified || '';
    /* A RECORD THAT ASSERTS NOTHING IS NOT AN ATTESTATION. Adding a source with
       an empty last_verified, or removing one, claims that nobody read
       anything, so it does not need a human at a terminal — it needs the lock
       to be told. That is `--sync`, which runs anywhere and refuses to touch a
       populated date. Without this the guard would forbid ADDING A SOURCE,
       which is not what it is for, and a guard that blocks ordinary work is a
       guard somebody routes around. */
    if (was === null) {
      (now === '' || now === 'not applicable' ? unsynced : moved)
        .push(`${r.key}: not in the lock (last_verified ${JSON.stringify(now)})`);
      continue;
    }
    if (was !== now) moved.push(`${r.key}: lock says ${JSON.stringify(was)}, SOURCES.md says ${JSON.stringify(now)}`);
  }
  for (const key of Object.keys(lock.entries || {})) {
    if (sources.has(key)) continue;
    (lock.entries[key].last_verified ? moved : unsynced).push(`${key}: in the lock but no longer in SOURCES.md`);
  }
  const digest = verifiedDigest(sources);
  if (!moved.length && !unsynced.length && lock.digest !== digest) moved.push(`digest mismatch: lock ${String(lock.digest).slice(0, 16)}, computed ${digest.slice(0, 16)}`);
  if (opts.explain) return { ok: !moved.length && !unsynced.length, moved, unsynced, lock, digest };
  if (!moved.length && unsynced.length) {
    throw new Error(
      'The lock does not know about every record yet.\n' +
      unsynced.map((m) => '   - ' + m).join('\n') +
      '\n\n   Every one of these has an EMPTY last_verified, so none of them asserts that a\n' +
      '   human read anything. Tell the lock:\n' +
      '       node scripts/attest-verified.mjs --sync\n' +
      '   It runs anywhere and refuses to touch a populated date.');
  }
  if (moved.length) {
    throw new Error(
      'REFUSED: last_verified moved without a human attestation.\n' +
      moved.map((m) => '   - ' + m).join('\n') +
      '\n\n   last_verified records that THE INSTRUCTOR read the source and confirmed the\n' +
      "   repo's claims about it are still accurate. No generator, no re-pull, no agent\n" +
      '   and no automated process may write or advance it.\n' +
      '   If a human did the reading, record it at an interactive terminal:\n' +
      '       node scripts/attest-verified.mjs --key <src-key> --date YYYY-MM-DD --evidence "..."\n' +
      '   If you are a tool, you are looking for last_retrieved.');
  }
  return { ok: true, moved, lock, digest };
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
  assertVerifiedLock(sources);
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
