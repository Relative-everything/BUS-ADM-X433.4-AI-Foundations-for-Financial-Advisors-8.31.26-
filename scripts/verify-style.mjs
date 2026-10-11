#!/usr/bin/env node
/**
 * verify-style.mjs — the repo's entry point for the managed style fence.
 *
 * WHY THIS EXISTS. The skill's restyle_sweep.py globs every *.html under the
 * repo and requires each one to carry the STYLE:BEGIN/END fence. Two files here
 * are HTML *fragments*, not documents:
 *
 *     scripts/case-extract.html      generated, injected INTO the lessons
 *     scripts/case-flowchart.html    generated, injected INTO the lessons
 *
 * Giving them a fence would embed the entire 524-line stylesheet inside every
 * lesson six times over, because inject-case.mjs copies their contents. So the
 * raw sweep reports them and exits 1, and that exit code says nothing about
 * whether the corpus is actually styled correctly.
 *
 * This wrapper asserts something STRICTER than the raw sweep, not weaker:
 *   1. every lesson document is CURRENT against the skill's assets, and
 *   2. the ONLY fenceless files in the tree are exactly those two generated
 *      fragments. A third fenceless file, or a renamed one, fails.
 *
 * Run the raw sweep to WRITE the fence:
 *     python3 <skill>/scripts/restyle_sweep.py .
 * Run this to CHECK it:
 *     node scripts/verify-style.mjs
 */
import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');

/* WHERE THE SWEEP IS. Resolved in the order scripts/build-changelog.py
 * find_sweep() uses, so the two scripts cannot disagree about which copy of the
 * skill they ran (DW-080). Keep the two lists in step. First match wins, and a
 * candidate counts only if it is a file:
 *
 *   1. RESTYLE_SWEEP                 a direct path to restyle_sweep.py
 *   2. LESSON_BUILDER_SKILL          the skill root; scripts/restyle_sweep.py under it
 *   3. ~/.claude/skills/synced/interactive-lesson-builder/scripts/restyle_sweep.py
 *   4. ~/.claude/skills/interactive-lesson-builder/scripts/restyle_sweep.py
 *
 * The home directory comes from os.homedir(), never a hard-coded /root: the
 * synced skills move between hosts, and a fixed path is how this script came to
 * exit 1 from every clean clone. */
const SKILL_REL = ['scripts', 'restyle_sweep.py'];
const CANDIDATES = [];
if (process.env.RESTYLE_SWEEP) CANDIDATES.push(['RESTYLE_SWEEP', process.env.RESTYLE_SWEEP]);
if (process.env.LESSON_BUILDER_SKILL) {
  CANDIDATES.push(['LESSON_BUILDER_SKILL', join(process.env.LESSON_BUILDER_SKILL, ...SKILL_REL)]);
}
CANDIDATES.push(['home, synced', join(homedir(), '.claude/skills/synced/interactive-lesson-builder', ...SKILL_REL)]);
CANDIDATES.push(['home', join(homedir(), '.claude/skills/interactive-lesson-builder', ...SKILL_REL)]);
const isFile = (p) => { try { return statSync(p).isFile(); } catch { return false; } };
const FOUND = CANDIDATES.find(([, p]) => isFile(p));
const SWEEP = FOUND && FOUND[1];

/* A variable that is set but names nothing is almost always a typo. Say so
   every time, whether a later candidate stands in for it, an earlier one
   already won, or nothing resolves (then the WARN comes before the FAIL list). */
for (const [from, p] of CANDIDATES) {
  if ((from === 'RESTYLE_SWEEP' || from === 'LESSON_BUILDER_SKILL') && !isFile(p)) {
    console.error(`WARN  ${from} is set but ${p} is not a file`);
  }
}
if (SWEEP) console.log(`sweep ${SWEEP}  (from ${FOUND[0]})`);

/* Fragments that are generated and injected, and therefore must NOT carry a fence. */
const EXPECTED_FENCELESS = new Set(['scripts/case-extract.html', 'scripts/case-flowchart.html']);

if (!SWEEP) {
  console.error('FAIL  restyle_sweep.py not found. Tried, in order:');
  for (const [from, p] of CANDIDATES) console.error(`        ${from.padEnd(20)} ${p}`);
  if (!process.env.RESTYLE_SWEEP) console.error('        (RESTYLE_SWEEP is not set)');
  if (!process.env.LESSON_BUILDER_SKILL) console.error('        (LESSON_BUILDER_SKILL is not set)');
  console.error('      Set RESTYLE_SWEEP to the path of restyle_sweep.py, or LESSON_BUILDER_SKILL');
  console.error('      to the interactive-lesson-builder skill root, or install the skill under');
  console.error(`      ${join(homedir(), '.claude/skills/')}.`);
  process.exit(1);
}

let out = '';
try {
  out = execFileSync('python3', [SWEEP, REPO, '--check'], { encoding: 'utf8' });
} catch (e) {
  out = (e.stdout || '') + (e.stderr || '');   /* exit 1 is expected; the output is the data */
}

const stale = [], fenceless = [], current = [];
for (const line of out.split('\n')) {
  const m = line.match(/^(OK|STALE|FAIL)\b.*?(\/\S+)/);
  if (!m) continue;
  const rel = relative(REPO, m[2]);
  if (line.startsWith('OK')) current.push(rel);
  else if (line.startsWith('STALE')) stale.push(rel);
  else fenceless.push(rel);
}

let fail = 0;
if (stale.length) {
  console.log(`FAIL  ${stale.length} lesson(s) stale against the skill's assets:`);
  for (const f of stale) console.log(`        ${f}`);
  console.log(`        fix: python3 ${SWEEP} .`);
  fail++;
} else {
  console.log(`PASS  all ${current.length} lesson documents current against the skill's assets`);
}

const unexpected = fenceless.filter((f) => !EXPECTED_FENCELESS.has(f));
const missing = [...EXPECTED_FENCELESS].filter((f) => !fenceless.includes(f));
if (unexpected.length) {
  console.log(`FAIL  ${unexpected.length} file(s) lack the style fence and are not generated fragments:`);
  for (const f of unexpected) console.log(`        ${f}`);
  fail++;
} else if (missing.length) {
  console.log(`FAIL  expected generated fragment(s) not found where the sweep looks: ${missing.join(', ')}`);
  console.log('        either they were renamed, or they now carry a fence, which would');
  console.log('        duplicate the whole stylesheet into every lesson.');
  fail++;
} else {
  console.log(`PASS  the only fenceless files are the ${EXPECTED_FENCELESS.size} generated fragments, as intended`);
}

console.log(`\nsummary: ${fail ? `${fail} failure(s)` : 'style fence clean'}`);
process.exit(fail ? 1 : 0);
