#!/usr/bin/env node
/**
 * inject-sources.mjs — write each lesson's footer source list from SOURCES.md.
 *
 * Touches nothing outside the sentinels. Idempotent by construction: the block
 * is a pure function of SOURCES.md and the derived usage, so a second run
 * produces a byte-identical file.
 *
 *   node scripts/inject-sources.mjs           write
 *   node scripts/inject-sources.mjs --check   report drift, write nothing, exit 1
 *
 * The opening sentinel carries the SHA-256 of the block it introduces.
 * verify-sources.mjs recomputes it and reports the same three failures
 * verify-case.mjs reports, in the same words.
 *
 * WHAT IS NOT INJECTED. Each lesson wraps its list differently — `ol.srcs`,
 * a bare `ol`, a `ul`, an `ol` with inline style — and the wrapper, the heading
 * above it and the prose around it are the lesson's own. Only the run of
 * `<li id="src-…">` items belongs to this script.
 *
 * WHERE A FIELD IS UNKNOWN, THE ENTRY OMITS IT. SOURCES.md records the gap as
 * [UNVERIFIED, needs source] so the register is honest; the rendered entry
 * prints nothing rather than a marker, because the alternative is a footer in
 * which thirty entries shout about a missing publisher. BIBLIOGRAPHY.md, which
 * is where a reader goes for completeness, prints every gap.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { model, LESSONS, isAbsent } from './build-sources.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
export const OPEN = '<!-- SOURCES:BEGIN v1 -->';
export const CLOSE = '<!-- SOURCES:END -->';
export const sha256 = (s) => createHash('sha256').update(s, 'utf8').digest('hex');

const esc = (s) => String(s).replace(/&(?![a-z]+;|#\d+;)/g, '&amp;');
const CONF = { H: 'h', M: 'm', L: 'l' };

/* A footer entry's terminal confidence chip labels THAT ENTRY's confidence; it
   does not cite it. session-0.1 already carried data-src pointing at the entry's
   own id, with a comment in the file explaining exactly that, and the convention
   is now uniform: without a key the chip is "bare" to validate_lesson V4, and
   adding one to session-3's twelve previously chip-less entries pushed that
   lesson past V4's tolerance of six.

   THE CONVENTION USED TO DEFEAT A15, AND THAT IS FIXED ALONGSIDE. A15 built its
   set of chipped keys over the whole file, so an entry pointing at itself made
   an orphan in that lesson undetectable. It now excludes the footer list, which
   is the only reading under which "this key is never cited" means anything. */
const SELF_LABELLING = true;

/** The domain of a link, which is what the corpus prints as the anchor text. */
function domain(link) {
  const m = String(link).match(/^https?:\/\/(?:www\.)?([^/]+)(\/[^\s]*)?/);
  if (!m) return null;
  const path = (m[2] || '').replace(/\/$/, '');
  return m[1] + (path.length > 1 && path.length < 42 ? path : '');
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
/** ISO dates read badly in a citation. 2024-06-27 -> "2024, June 27". */
function humanDate(v) {
  let m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return `${m[1]}, ${MONTHS[+m[2] - 1]} ${+m[3]}`;
  m = String(v).match(/^(\d{4})-(\d{2})$/);
  if (m) return `${m[1]}, ${MONTHS[+m[2] - 1]}`;
  return String(v);
}
/** One trailing full stop, never two. Tested against the last VISIBLE character,
    so a title ending in a question mark inside <em> does not gain one. */
const dot = (s) => (/[.?!]\s*$/.test(String(s).replace(/<[^>]+>\s*$/, '')) ? s : s + '.');

/** One <li>, rendered from the record plus this lesson's used_for clause. */
export function renderEntry(rec, lesson) {
  const bits = [];
  /* A fabricated citation leads with the fact that it is one. The reader meets
     the label before the citation, not after it. */
  if (rec.kind === 'fabricated') bits.push('<b>Does not exist.</b>');
  if (!isAbsent(rec.author)) bits.push(dot(esc(rec.author)));
  const title = `<em>${esc(rec.title)}</em>`;
  bits.push(isAbsent(rec.published) ? dot(title) : `(${humanDate(rec.published)}). ${dot(title)}`);
  if (!isAbsent(rec.publisher)) bits.push(dot(esc(rec.publisher)));
  const d = isAbsent(rec.link) ? null : domain(rec.link);
  if (d) bits.push(`<a href="${rec.link}">${esc(d)}</a>`);
  /* THE RETRIEVAL DATE, AND ONLY THE RETRIEVAL DATE. `last_retrieved` says a
     machine fetched the source and when. `last_verified` says the INSTRUCTOR
     read it, and it does not belong on a student-facing page: it is an
     instructor attestation and it is reported in docs/source-verification-queue.md.
     A retrieval date that is not a date is a divergence the register is
     carrying, and it is printed as one rather than as a date. */
  /* WHERE A WORK WAS PULLED MORE THAN ONCE, THIS LESSON'S FOOTER NAMES THIS
     LESSON'S PULL. The record's own `last_retrieved` is the most recent
     retrieval of the work; it is not what this lesson's figures came from.
     Before Phase 3.5 src-aa printed "Retrieval date divergent across lessons"
     in all three footers, which told a reader the register was confused but
     never told them which pull they were looking at. Now each footer says its
     own date AND says the pulls disagree, which is both facts instead of one. */
  const pull = rec.pulls && rec.pulls[lesson];
  const dates = rec.pulls ? [...new Set(Object.values(rec.pulls).map((p) => p.retrieved))] : [];
  const shown = pull ? pull.retrieved : rec.last_retrieved;
  if (!isAbsent(shown)) {
    bits.push(/^\d{4}-\d{2}/.test(shown)
      ? `Retrieved ${humanDate(shown)}.`
      : dot(`Retrieval date ${esc(shown)}`));
    if (dates.length > 1) bits.push(dot('Retrieval dates differ across lessons; see DATA-PULL.md'));
  }
  const used = rec.used_for[lesson];
  if (used) bits.push(`Used for: ${dot(esc(used))}`);

  const attrs = [`id="${rec.key}"`];
  if (rec.chip_exempt) attrs.push(`data-nochip="${rec.kind}"`);
  let tail = '';
  if (!rec.chip_exempt && CONF[rec.confidence]) {
    const ds = SELF_LABELLING ? ` data-src="${rec.key}"` : '';
    tail = ` <span class="conf ${CONF[rec.confidence]}"${ds}>${rec.confidence}</span>`;
  }
  return `      <li ${attrs.join(' ')}>${bits.join(' ')}${tail}</li>`;
}

/** The whole injected block for one lesson: every source that lesson declares. */
export function buildBlock(sources, lesson) {
  const mine = [...sources.values()]
    .filter((r) => r.used_for[lesson])
    .sort((a, b) => (a.author || a.title).localeCompare(b.author || b.title));
  if (!mine.length) throw new Error(`SOURCES.md declares no source for ${lesson}`);
  return mine.map((r) => renderEntry(r, lesson)).join('\n');
}

/* ---------------------------------------------------------------------- main */

const CHECK = process.argv.includes('--check');
const sources = model();
let drift = 0;

for (const lesson of LESSONS) {
  const path = join(REPO, lesson, 'index.html');
  const before = readFileSync(path, 'utf8');
  const body = buildBlock(sources, lesson);
  const stamp = `\n<!-- generated by scripts/inject-sources.mjs from SOURCES.md — sha256 ${sha256(body)} -->\n`;
  const block = `${OPEN}${stamp}${body}\n${CLOSE}`;

  let after;
  const a = before.indexOf(OPEN), b = before.indexOf(CLOSE);
  if (a >= 0 && b > a) {
    after = before.slice(0, a) + block + before.slice(b + CLOSE.length);
  } else {
    /* first run: wrap the existing run of <li id="src-…"> items, wherever the
       lesson happens to keep them, without touching the list wrapper. */
    const first = before.search(/^\s*<li id="src-/m);
    if (first < 0) throw new Error(`${lesson}: no <li id="src-…"> run to replace`);
    /* The run ends at the last </li> BEFORE the list closes. Searching the whole
       file for the last </li> walks straight past the footer into a script that
       builds list markup in a string literal, which is exactly what happened on
       the first run of this script. */
    const closeAt = before.slice(first).search(/<\/(?:ol|ul)>/);
    if (closeAt < 0) throw new Error(`${lesson}: the source list is never closed`);
    const lastEnd = before.lastIndexOf('</li>', first + closeAt) + '</li>'.length;
    if (lastEnd <= first) throw new Error(`${lesson}: cannot find the end of the source list`);
    const lineStart = before.lastIndexOf('\n', first) + 1;
    after = before.slice(0, lineStart) + block + before.slice(lastEnd);
  }
  if (after === before) { console.log(`current       ${lesson}  ${sha256(body).slice(0, 16)}`); continue; }
  drift++;
  console.log(`${CHECK ? 'WOULD CHANGE' : 'written     '}  ${lesson}  ${sha256(body).slice(0, 16)}`);
  if (!CHECK) writeFileSync(path, after);
}

if (CHECK && drift) {
  console.error(`\n${drift} lesson(s) differ from SOURCES.md. Run without --check to inject.`);
  process.exit(1);
}
console.log(CHECK ? '\nevery lesson carries the current SOURCES.md block' : `\n${drift} file(s) rewritten`);
