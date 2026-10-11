#!/usr/bin/env node
/**
 * verify-facts.mjs — the volatile-fact validator (next-term-2027 run, Phase 1).
 *
 * facts/FACTS.json is the single source of truth for volatile facts: model
 * names, prices, plan features, leaderboard figures, regulation dates. This
 * script fails when a served page or an instructor note disagrees with it in
 * one of three ways:
 *
 *   (a) a RETIRED VALUE appears. Each record carries retired_values, strings
 *       that must not appear anywhere a reader sees. A hit is a defect wherever
 *       it sits in the file (prose, a JS string, an attribute, a comment): the
 *       next maintainer reads source too.
 *   (b) a HIGH-volatility record is PAST ITS RE-VERIFY WINDOW relative to the
 *       --as-of date (default: today). The window is a property of the record's
 *       reverify_before field: "each-session" is 14 days (the week-before ritual
 *       re-verifies every record before every session, and sessions are 14 days
 *       apart); "term-start" is 180 days. Medium- and low-volatility records are
 *       reported when stale and never fail the run.
 *   (c) a page cites a FACTS id that does not exist. A chip cites a record with
 *       data-fact="<id>" on any element (lessons, case pages, the hub); an
 *       instructor note cites one as FACTS:<id>. A dangling id is a chip
 *       pointing at nothing, the same defect class verify-sources.mjs catches
 *       for data-src.
 *
 * Scope: index.html, session-* /index.html, cases/*.html (when present),
 * instructor-notes/*.md and *.htm. CHANGELOG.md, changelog/, audit/ and docs/
 * are the record of what was retired and are never scanned.
 *
 *   node scripts/verify-facts.mjs                    # exit 1 on any (a), (b)-high or (c)
 *   node scripts/verify-facts.mjs --report           # list everything, exit 0
 *   node scripts/verify-facts.mjs --as-of 2027-01-25 # the week-before ritual
 *   node scripts/verify-facts.mjs --session 4        # session-4, cases/case-4, its notes
 *
 * Node built-ins only. Every hit prints file:line: context.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const REPORT = argv.includes('--report');
const asOfArg = (() => { const i = argv.indexOf('--as-of'); return i >= 0 ? argv[i + 1] : null; })();
const sessionArg = (() => { const i = argv.indexOf('--session'); return i >= 0 ? argv[i + 1] : null; })();

const WINDOW_DAYS = { 'each-session': 14, 'term-start': 180 };

const factsPath = join(REPO, 'facts', 'FACTS.json');
if (!existsSync(factsPath)) { console.error('FAIL  facts/FACTS.json is missing'); process.exit(1); }
const FACTS = JSON.parse(readFileSync(factsPath, 'utf8'));
if (!Array.isArray(FACTS)) { console.error('FAIL  facts/FACTS.json must be an array of records'); process.exit(1); }

/* ---- record shape ---------------------------------------------------------- */
const REQUIRED = ['id', 'statement', 'value', 'applies_to', 'source_url', 'source_title', 'retrieved',
                  'confidence', 'volatility', 'reverify_before', 'retired_values'];
const shapeProblems = [];
const ids = new Set();
for (const r of FACTS) {
  for (const k of REQUIRED) if (!(k in r)) shapeProblems.push(`${r.id || '(no id)'}: missing field ${k}`);
  if (ids.has(r.id)) shapeProblems.push(`${r.id}: duplicate id`);
  ids.add(r.id);
  if (!/^[a-z0-9][a-z0-9-]*$/.test(r.id || '')) shapeProblems.push(`${r.id}: id must be kebab-case`);
  if (!['H', 'M', 'L', 'GAP'].includes(r.confidence)) shapeProblems.push(`${r.id}: confidence must be H, M, L or GAP`);
  if (!['high', 'medium', 'low'].includes(r.volatility)) shapeProblems.push(`${r.id}: volatility must be high, medium or low`);
  if (!(r.reverify_before in WINDOW_DAYS)) shapeProblems.push(`${r.id}: reverify_before must be each-session or term-start`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.retrieved || '')) shapeProblems.push(`${r.id}: retrieved must be YYYY-MM-DD`);
  if (!Array.isArray(r.retired_values)) shapeProblems.push(`${r.id}: retired_values must be an array`);
  if (!Array.isArray(r.applies_to)) shapeProblems.push(`${r.id}: applies_to must be an array`);
}

/* ---- scope ------------------------------------------------------------------ */
function listFiles() {
  const out = ['index.html'];
  for (const d of readdirSync(REPO)) {
    if (/^session-[\d.]+$/.test(d) && existsSync(join(REPO, d, 'index.html'))) out.push(`${d}/index.html`);
  }
  if (existsSync(join(REPO, 'cases'))) {
    for (const f of readdirSync(join(REPO, 'cases'))) if (/\.html$/.test(f)) out.push(`cases/${f}`);
  }
  if (existsSync(join(REPO, 'instructor-notes'))) {
    for (const f of readdirSync(join(REPO, 'instructor-notes'))) if (/\.(md|htm)$/.test(f)) out.push(`instructor-notes/${f}`);
  }
  return out.filter((f) => statSync(join(REPO, f)).isFile());
}
let FILES = listFiles();
if (sessionArg) {
  const n = sessionArg.replace(/^session-/, '');
  FILES = FILES.filter((f) => f === `session-${n}/index.html` || f === `cases/case-${n}.html` ||
                              new RegExp(`^instructor-notes/session-${n.replace('.', '\\.')}(\\b|[-.])`).test(f));
}

/* ---- the three checks -------------------------------------------------------- */
const asOf = asOfArg ? new Date(asOfArg + 'T00:00:00Z') : new Date();
if (Number.isNaN(asOf.getTime())) { console.error(`FAIL  --as-of ${asOfArg} is not a date`); process.exit(1); }
const dayMs = 86400000;
const lineOf = (t, i) => t.slice(0, i).split('\n').length;
const ctx = (t, i, len) => t.slice(Math.max(0, i - 50), i + len + 50).replace(/\s+/g, ' ').trim();

const retiredHits = [];   // (a)
const danglingIds = [];   // (c)
const staleHigh = [];     // (b) fails
const staleOther = [];    // (b) reported
const citedIds = new Set();

for (const rel of FILES) {
  const t = readFileSync(join(REPO, rel), 'utf8');
  for (const r of FACTS) {
    for (const rv of r.retired_values || []) {
      if (!rv) continue;
      const rx = new RegExp(rv.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+'), 'gi');
      let m;
      while ((m = rx.exec(t))) retiredHits.push(`${rel}:${lineOf(t, m.index)}  [${r.id}] "${m[0]}"  ...${ctx(t, m.index, m[0].length)}...`);
    }
  }
  const cite = /\.html?$/.test(rel) ? /data-fact="([^"]+)"/g : /\bFACTS:([a-z0-9][a-z0-9-]*)/g;
  let m;
  while ((m = cite.exec(t))) {
    for (const id of m[1].split(/\s+/)) {
      citedIds.add(id);
      if (!ids.has(id)) danglingIds.push(`${rel}:${lineOf(t, m.index)}  cites FACTS id "${id}", which does not exist`);
    }
  }
}

for (const r of FACTS) {
  const retrieved = new Date(r.retrieved + 'T00:00:00Z');
  const age = Math.floor((asOf - retrieved) / dayMs);
  const window = WINDOW_DAYS[r.reverify_before] ?? 14;
  if (age > window) {
    const line = `${r.id}  retrieved ${r.retrieved}, ${age} days before ${asOf.toISOString().slice(0, 10)}, window ${window} (${r.reverify_before}, volatility ${r.volatility})`;
    (r.volatility === 'high' ? staleHigh : staleOther).push(line);
  }
}

/* ---- output ------------------------------------------------------------------- */
const say = (ok, label, lines) => {
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${label}${lines.length ? `  (${lines.length})` : ''}`);
  for (const l of lines.slice(0, REPORT ? lines.length : 40)) console.log('        ' + l);
  if (!REPORT && lines.length > 40) console.log(`        ... ${lines.length - 40} more (run with --report for all)`);
};
console.log(`facts/FACTS.json  ${FACTS.length} record(s)   scope ${FILES.length} file(s)${sessionArg ? ` (session ${sessionArg})` : ''}   as-of ${asOf.toISOString().slice(0, 10)}`);
say(shapeProblems.length === 0, 'record shape', shapeProblems);
say(retiredHits.length === 0, '(a) retired values absent from served pages and instructor notes', retiredHits);
say(staleHigh.length === 0, '(b) high-volatility records inside their re-verify window', staleHigh);
if (staleOther.length) { console.log(`info  (b) medium/low-volatility records past their window, reported only  (${staleOther.length})`); for (const l of staleOther) console.log('        ' + l); }
say(danglingIds.length === 0, '(c) every cited FACTS id exists', danglingIds);
const uncited = FACTS.filter((r) => !citedIds.has(r.id)).map((r) => r.id);
if (REPORT) { console.log(`info  records never cited by a scanned file  (${uncited.length})`); for (const l of uncited) console.log('        ' + l); }

const fails = shapeProblems.length + retiredHits.length + staleHigh.length + danglingIds.length;
console.log(`\nsummary: ${fails === 0 ? 'clean' : fails + ' failure line(s)'}${REPORT ? ' (--report: exit 0)' : ''}`);
process.exit(REPORT ? 0 : (fails ? 1 : 0));
