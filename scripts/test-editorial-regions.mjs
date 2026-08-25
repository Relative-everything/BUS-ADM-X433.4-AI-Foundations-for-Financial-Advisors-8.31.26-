#!/usr/bin/env node
/**
 * test-editorial-regions.mjs — unit tests for the region classifier.
 *
 * Run before wiring any rule to it:  node scripts/test-editorial-regions.mjs
 *
 * The load-bearing test is T7. A8 and A9's correctness rests on the R11
 * exclusion being right, so the classifier must reproduce the recorded baseline
 * in scripts/editorial-baseline.json exactly. If T7 fails, either the classifier
 * is wrong or the baseline is, and guessing which corrupts the ratchets
 * permanently — stop and report instead.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { classify, authoredProse } from './editorial-regions.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = ['session-0.1', 'session-1', 'session-2', 'session-3', 'session-4'];
const read = (f) => readFileSync(join(REPO, f, 'index.html'), 'utf8');

let pass = 0, fail = 0;
const t = (id, name, ok, detail = '') => {
  ok ? pass++ : fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${id.padEnd(4)} ${name}${detail ? '\n        ' + String(detail).split('\n').join('\n        ') : ''}`);
};

/* ---------------------------------------------------------------- T1  R6 */
{
  const bad = [];
  for (const f of ['index.html', ...LESSONS.map((l) => `${l}/index.html`)]) {
    const src = readFileSync(join(REPO, f), 'utf8');
    const c = classify(src);
    const a = src.indexOf('<!-- CASE:BEGIN'), b = src.indexOf('CASE:END');
    if (a < 0) { bad.push(`${f}: no sentinel`); continue; }
    if (c.regionOf(a) !== 'R6') bad.push(`${f}: sentinel start is ${c.regionOf(a)}, want R6`);
    if (c.regionOf(b) !== 'R6') bad.push(`${f}: sentinel end is ${c.regionOf(b)}, want R6`);
    const spans = c.spans.R6 || [];
    if (spans.length !== 1) bad.push(`${f}: ${spans.length} R6 spans, want 1`);
  }
  t('T1', 'R6 claims exactly one CASE span per file, sentinel to sentinel', bad.length === 0, bad.join('\n'));
}

/* ---------------------------------------------------------------- T2  R10 */
{
  const src = read('session-0.1');
  const c = classify(src);
  const spans = c.spans.R10 || [];
  let em = 0, en = 0;
  for (const [s, e] of spans) {
    const body = src.slice(s, e);
    em += (body.match(/\\u2014|—/g) || []).length;
    en += (body.match(/\\u2013|–/g) || []).length;
  }
  t('T2', 'R10 claims the four captured transcripts carrying 28 dashes (Class A2)',
    spans.length === 4 && em === 22 && en === 6,
    `${spans.length} base: strings, ${em} em + ${en} en = ${em + en} dashes (want 4, 22, 6, 28)`);
}

/* ---------------------------------------------------------------- T3  R4 */
{
  const bad = [];
  for (const l of LESSONS) {
    const src = read(l);
    const c = classify(src);
    const i = src.indexOf('STYLE:BEGIN');
    if (i < 0) { bad.push(`${l}: no managed fence`); continue; }
    if (c.regionOf(i) !== 'R4') bad.push(`${l}: managed fence is ${c.regionOf(i)}, want R4`);
  }
  t('T3', 'R4 claims the managed CSS fence in every lesson', bad.length === 0, bad.join('\n'));
}

/* ---------------------------------------------------------------- T4  R2 */
{
  const src = read('session-1');
  const c = classify(src);
  const i = src.indexOf('var secs=all(');
  const lits = c.literals.filter(([s]) => s > i && s < i + 4000);
  t('T4', 'R2 claims script bodies and enumerates their quoted literals',
    i > 0 && c.regionOf(i) === 'R2' && lits.length > 0,
    `script code at ${i} is ${c.regionOf(i)}; ${c.literals.length} literals found file-wide`);
}

/* ---------------------------------------------------------------- T5  R7-R9 */
{
  const bad = [];
  for (const l of LESSONS) {
    const src = read(l);
    const c = classify(src);
    const li = src.indexOf('<li id="src-');
    if (li > 0 && c.regionOf(li + 20) !== 'R7') bad.push(`${l}: footer entry body is ${c.regionOf(li + 20)}, want R7`);
    const sn = src.search(/<span class="src"|<p class="src"/);
    if (sn > 0 && c.regionOf(sn + 25) !== 'R8') bad.push(`${l}: source note body is ${c.regionOf(sn + 25)}, want R8`);
  }
  const s1 = read('session-1'), c1 = classify(s1);
  const w = s1.indexOf('<div class="wolf">');
  if (w > 0 && c1.regionOf(w + 30) !== 'R9') bad.push(`session-1: wolf block body is ${c1.regionOf(w + 30)}, want R9`);
  if ((c1.spans.R9 || []).length !== 6) bad.push(`session-1: ${(c1.spans.R9 || []).length} wolf blocks, want 6`);
  t('T5', 'R7 / R8 / R9 claim footer entries, source notes and reading blocks', bad.length === 0, bad.join('\n'));
}

/* ---------------------------------------------------------------- T6  R3/R1 */
{
  const src = read('session-1');
  const c = classify(src);
  const nav = src.indexOf('data-nav="— APPENDIX —"');
  const prose = src.indexOf('Price is never the reason to use the cheap tier');
  t('T6', 'R3 claims attribute values; R1 is the residual that survives',
    nav > 0 && c.regionOf(nav + 12) === 'R3' && prose > 0 && c.regionOf(prose) === 'R1',
    `data-nav value -> ${c.regionOf(nav + 12)} (want R3); body sentence -> ${c.regionOf(prose)} (want R1)`);
}

/* ------------------------------------------------- T7  THE LOAD-BEARING ONE */
{
  /* The baseline file is the single source of truth; the test never hard-codes it. */
  const TARGET = JSON.parse(readFileSync(join(REPO, 'scripts/editorial-baseline.json'), 'utf8')).A9.files;
  const bad = [], seen = [];
  for (const l of LESSONS) {
    const c = classify(read(l));
    const pop = authoredProse(c);
    const literal = (pop.match(/—/g) || []).length;
    const entity = (pop.match(/&mdash;/g) || []).length;
    const want = TARGET[l];
    seen.push(`${l.padEnd(12)} ${String(literal).padStart(3)} literal / ${String(entity).padStart(3)} entity`);
    if (literal !== want.literal || entity !== want.entity) {
      bad.push(`${l}: classifier gives ${literal}/${entity}, baseline records ${want.literal}/${want.entity}`);
    }
  }
  t('T7', 'R11 exclusion reproduces the recorded A9 baseline exactly',
    bad.length === 0, bad.length ? bad.join('\n') : seen.join('\n'));
}

/* ---------------------------------------------------- T8  exempt = silent */
{
  const src = read('session-0.1');
  const c = classify(src);
  const pop = authoredProse(c);
  /* Not one of the 28 captured-transcript dashes may survive into the population. */
  const leaked = (c.spans.R10 || []).some(([s, e]) => /[—–]|\\u201[34]/.test(pop.slice(s, e)));
  t('T8', 'Class A2 transcripts and the CASE span leak nothing into the population',
    !leaked && (c.spans.R6 || []).every(([s, e]) => !/[—–]/.test(pop.slice(s, e))),
    'captured transcripts and injected span are masked out');
}

/* ---------------------------------------------------- T9  B8 false-positive */
{
  const src = read('session-4');
  const c = classify(src);
  const prose = c.mask(['R1', 'R7', 'R8', 'R9']);
  const color = (prose.match(/\bcolor\b/g) || []).length;
  const raw = (src.match(/\bcolor\b/g) || []).length;
  t('T9', 'CSS "color" hits do not survive into prose regions (EDITORIAL.md B8)',
    color === 0 && raw > 100, `${raw} raw, ${color} in prose`);
}


console.log(`\nsummary: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
