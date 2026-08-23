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
import { existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const SWEEP = process.env.RESTYLE_SWEEP ||
  '/root/.claude/skills/synced/interactive-lesson-builder/scripts/restyle_sweep.py';

/* Fragments that are generated and injected, and therefore must NOT carry a fence. */
const EXPECTED_FENCELESS = new Set(['scripts/case-extract.html', 'scripts/case-flowchart.html']);

if (!existsSync(SWEEP)) {
  console.error(`FAIL  restyle_sweep.py not found at ${SWEEP}`);
  console.error('      Set RESTYLE_SWEEP to its path, or install the interactive-lesson-builder skill.');
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
