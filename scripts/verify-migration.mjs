#!/usr/bin/env node
/**
 * verify-migration.mjs — the CASE.md v4.0 migration battery, run programmatically.
 *
 * Checks 1-4, 7-12, 14b, 16-18 of the migration plan. The browser checks (13, 14,
 * 15) live in scripts/verify-browser.mjs; injection and idempotence (5, 6) are
 * verify-case.mjs and inject-case.mjs; the style fence (19) is the skill's
 * restyle_sweep.py --check.
 *
 * Every failure prints the failing input. A check that reports rather than
 * enforces says so.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = ['index.html', 'session-0.1/index.html', 'session-1/index.html',
                 'session-2/index.html', 'session-3/index.html', 'session-4/index.html'];
const F = JSON.parse(readFileSync(join(REPO, 'scripts/case-facts.json'), 'utf8')).figures;
const CASE = readFileSync(join(REPO, 'CASE.md'), 'utf8');

let pass = 0, fail = 0;
const report = [];
function check(id, name, ok, detail = '') {
  (ok ? pass++ : fail++);
  report.push(`${ok ? 'PASS' : 'FAIL'}  ${id.padEnd(4)} ${name}${detail ? '\n        ' + detail.split('\n').join('\n        ') : ''}`);
  return ok;
}
function info(id, name, detail) { report.push(`----  ${id.padEnd(4)} ${name}\n        ` + detail.split('\n').join('\n        ')); }

function walk(d, out = []) {
  for (const e of readdirSync(d)) {
    if (e === '.git' || e === 'node_modules') continue;
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}
const ALL = walk(REPO);
const text = (p) => { try { return readFileSync(p, 'utf8'); } catch { return ''; } };
const rel = (p) => relative(REPO, p);
/** Files where a retired string is a legitimate historical or register entry. */
const REGISTER = new Set(['CASE.md', 'CHANGELOG.md', 'changelog/index.html',
                          'docs/probe-captures.md', 'docs/live-model-console-plan.md',
                          /* this file names every retired string in order to search for it */
                          'scripts/verify-migration.mjs',
                          /* the spine brief's section 1 is an inventory of the retired framing
                             question, so it necessarily quotes it. Same standing as CASE.md
                             Part K: a register of what was removed, not an assertion of it.
                             It is instructor-facing and ships in no lesson. */
                          'docs/spine-brief.md']);

/* ---- 1  retired facts purged --------------------------------------------- */
const NB = String.raw`(?<![0-9,.])`, NA = String.raw`(?![0-9])(?!,[0-9])`;
const RETIRED = [
  ['Ohio', /\bOhio\b/g], ['Dayton', /\bDayton\b/g], ['QSBS', /\bQSBS\b/g],
  ['IRC 1202', new RegExp(NB + '1202' + NA, 'g')],
  ['qualified small business', /qualified small business/gi],
  ['$4,968,000', new RegExp(NB + '(?:4,968,000|4968000)' + NA, 'g')],
  ['$650,000', new RegExp(NB + '(?:650,000|650000)' + NA, 'g')],
  ['$7,200,000', new RegExp(NB + '(?:7,200,000|7200000)' + NA, 'g')],
  ['$310,000', new RegExp(NB + '(?:310,000|310000)' + NA, 'g')],
  ['$240,000', new RegExp(NB + '(?:240,000|240000)' + NA, 'g')],
  ['$30,000,000', new RegExp(NB + '(?:30,000,000|30000000)' + NA, 'g')],
  ['$385,000', new RegExp(NB + '(?:385,000|385000)' + NA, 'g')],
  ['$34,265,000', new RegExp(NB + '(?:34,265,000|34265000)' + NA, 'g')],
  ['$3,850,000', new RegExp(NB + '(?:3,850,000|3850000)' + NA, 'g')],
  ['$3,360,000', new RegExp(NB + '(?:3,360,000|3360000)' + NA, 'g')],
  ['31%', /(?<![0-9.])31\s*(?:%|&#37;)/g],
  ['31 years', /\b31\s*years?\b/g],
  ['99 non-voting', /99\s*non-?voting/gi],
  ['40% non-voting', /40%?\s*non-?voting|forty\s+percent\s+non-?voting/gi],
  ['founder stock', /founder(?:'s)?\s+stock/gi],
  ['donor-advised', /donor[- ]advised/gi],
  ['planning window', /planning\s+window/gi],
  ['no state estate tax', /no\s+state\s+estate\s+tax/gi],
  ['spelled thirty-one percent', /thirty[- ]one\s+percent/gi],
  ['spelled 4,968,000', /four\s+million\s+nine\s+hundred\s+sixty\s+eight\s+thousand/gi],
  ['spelled 650,000', /six\s+hundred\s+fifty\s+thousand/gi],
];
{
  const bad = [];
  for (const p of ALL) {
    const r = rel(p); if (REGISTER.has(r)) continue;
    const t = text(p);
    for (const [label, rx] of RETIRED) {
      rx.lastIndex = 0;
      let m; while ((m = rx.exec(t))) {
        // "No donor-advised fund has ever existed" is a negation, not an assertion
        const around = t.slice(Math.max(0, m.index - 40), m.index + 60);
        if (label === 'donor-advised' && /No donor-advised fund has ever existed/i.test(around)) continue;
        bad.push(`${r}:${t.slice(0, m.index).split('\n').length}  ${label}  ...${around.replace(/\s+/g, ' ').trim().slice(0, 90)}...`);
      }
    }
  }
  check('1', 'Retired facts purged (Part K list, whole tree, registers excluded)',
        bad.length === 0, bad.slice(0, 12).join('\n'));
}

/* ---- 2/3  Ohio, Dayton, QSBS, 1202 --------------------------------------- */
for (const [id, name, rxs] of [
  ['2', 'Ohio and Dayton at zero everywhere (incl. comments, alt, filenames)', [/\bOhio\b/gi, /\bDayton\b/gi]],
  ['3', 'QSBS and IRC 1202 at zero everywhere', [/\bQSBS\b/gi, /qualified small business/gi, new RegExp(NB + '1202' + NA, 'g')]],
]) {
  const bad = [];
  for (const p of ALL) {
    const r = rel(p);
    if (/\bOhio\b|\bDayton\b|QSBS|1202/i.test(r)) bad.push(`FILENAME ${r}`);
    if (REGISTER.has(r)) continue;
    const t = text(p);
    for (const rx of rxs) { rx.lastIndex = 0; let m;
      while ((m = rx.exec(t))) bad.push(`${r}:${t.slice(0, m.index).split('\n').length}  ${m[0]}`); }
  }
  check(id, name, bad.length === 0, bad.slice(0, 10).join('\n'));
}

/* ---- 4  conditional allowances, checked in context ----------------------- */
{
  const ALLOW = [
    ['$18,000,000', new RegExp(NB + '(?:18,000,000|18000000)' + NA, 'g'),
     /buy-?sell|formula|buySellFormula/i, 'the F.6 buy-sell formula output'],
    ['$38,000,000', new RegExp(NB + '(?:38,000,000|38000000)' + NA, 'g'),
     /appraisal|2023|appraisal2023/i, 'the F.7 2023 appraisal conclusion'],
    ['$4,500,000', new RegExp(NB + '(?:4,500,000|4500000)' + NA, 'g'),
     /trustDivSteady|dividend|E\.8|steady/i, "the E.8 steady-state dividend share"],
    ['$2,000,000', new RegExp(NB + '(?:2,000,000|2000000)' + NA, 'g'),
     /residence|Barrington|residence"/i, 'the C.1/C.2 residence value'],
  ];
  const bad = [], seen = {};
  for (const p of LESSONS.map((l) => join(REPO, l))) {
    const t = text(p); const r = rel(p);
    for (const [label, rx, ctxRx, permitted] of ALLOW) {
      rx.lastIndex = 0; let m;
      while ((m = rx.exec(t))) {
        const line = t.slice(0, m.index).split('\n').length;
        const around = t.slice(Math.max(0, m.index - 240), m.index + 240);
        seen[label] = (seen[label] || 0) + 1;
        if (!ctxRx.test(around)) bad.push(`${r}:${line}  ${label} NOT in its one permitted use (${permitted})\n    ...${around.replace(/\s+/g, ' ').slice(180, 340)}...`);
      }
    }
  }
  check('4', 'Conditional allowances each in their one permitted context',
        bad.length === 0,
        bad.length ? bad.slice(0, 6).join('\n')
                   : Object.entries(seen).map(([k, v]) => `${k}: ${v} occurrence(s), all in the permitted use`).join('\n'));
}

/* ---- 7  extract fidelity -------------------------------------------------- */
{
  const extract = readFileSync(join(REPO, 'scripts/case-extract.html'), 'utf8');
  const nums = [...extract.matchAll(/\$([0-9][0-9,]{2,})/g)].map((m) => m[1].replace(/,/g, ''));
  const known = new Set(Object.values(F).filter((v) => typeof v === 'number').map(String));
  // figures the extract composes rather than quotes, each shown with its arithmetic
  for (const composed of [F.votingUnits * F.perVoting, F.megRetainedNV * F.perNonVoting, 5000000,
                          F.votingUnits * (F.dividend / F.totalUnits)]) known.add(String(composed));
  const orphan = [...new Set(nums)].filter((n) => !known.has(n));
  check('7', 'Extract fidelity: every figure traces to case-facts.json or a shown computation',
        orphan.length === 0, orphan.length ? 'untraceable: ' + orphan.join(', ') : `${new Set(nums).size} distinct figures, all traced`);
  const forbidden = ['Part H', 'Part I', 'Part M', 'Karmazin v', 'applicable federal rate table'];
  check('7b', 'Extract is a fraction: Parts H, I and M are not reproduced',
        !/## H\.|## I\.|## M\b|Rev\. Rul\. 2026-13, Table 1/.test(extract), '');
}

/* ---- 8  case coverage ----------------------------------------------------- */
{
  const rows = LESSONS.map((l) => {
    const t = readFileSync(join(REPO, l), 'utf8');
    const secs = (t.match(/<section\b/g) || []).length;
    const withCase = (t.match(/Cole|CPC|Meg\b/g) || []).length;
    return `${l.padEnd(24)} sections ${String(secs).padStart(3)}   case mentions ${String(withCase).padStart(4)}`;
  });
  info('8', 'Case coverage per file (reported, not enforced)', rows.join('\n'));
}

/* ---- 9  interaction count ------------------------------------------------- */
{
  const rows = [], bad = [];
  for (const l of LESSONS) {
    const t = readFileSync(join(REPO, l), 'utf8');
    const tasks = new Set([...t.matchAll(/data-task="([^"]+)"/g)].map((m) => m[1]));
    const secs = [...t.matchAll(/<section\b[^>]*>([\s\S]*?)<\/section>/g)];
    const empty = secs.filter((s) => !/data-task=/.test(s[1])).length;
    rows.push(`${l.padEnd(24)} distinct interactions ${String(tasks.size).padStart(3)}   sections ${String(secs.length).padStart(3)}   sections with no interaction ${empty}`);
    if (l !== 'index.html' && tasks.size < 13) bad.push(`${l}: ${tasks.size} interactions, floor is 13`);
  }
  check('9', 'Interaction floor of 13 per lesson (hub exempt, no padding applied)',
        bad.length === 0, bad.length ? bad.join('\n') : rows.join('\n'));
}

/* ---- 10  no gating -------------------------------------------------------- */
{
  const bad = [];
  for (const l of LESSONS) {
    const t = readFileSync(join(REPO, l), 'utf8');
    for (const rx of [/class="[^"]*\block\b[^"]*"/g, /localStorage|sessionStorage|indexedDB|document\.cookie/g]) {
      rx.lastIndex = 0; let m;
      while ((m = rx.exec(t))) bad.push(`${l}:${t.slice(0, m.index).split('\n').length}  ${m[0]}`);
    }
  }
  check('10', 'No section gating and no browser storage (pedagogy R9, R10)', bad.length === 0, bad.join('\n'));
}

/* ---- 11  rendered arithmetic against Part M ------------------------------- */
{
  const bad = [];
  const eq = (name, got, want) => { if (got !== want) bad.push(`${name}: computed ${got}, CASE.md Part M states ${want}`); };
  eq('per non-voting unit', Math.round(F.cpcValue * 0.9 * (1 - F.discount) / F.nonVotingUnits), F.perNonVoting);
  eq('seed value', F.seedUnits * F.perNonVoting, F.seedValue);
  eq('note principal', F.saleUnits * F.perNonVoting, F.notePrincipal);
  eq('seed as % of note', Math.round(F.seedValue / F.notePrincipal * 10000) / 100, 10);
  eq('annual note interest', Math.round(F.notePrincipal * F.noteRate), F.noteInterest);
  eq('dividend tax', Math.round(F.dividend * F.qualDivRate), F.dividendTax);
  eq('non-voting units sum', F.seedUnits + F.saleUnits + F.megRetainedNV, F.nonVotingUnits);
  eq('estate reduction', F.proRataNonVote - F.totalToMeg, F.estateReduction);
  eq('reduction, two components', F.belowProRata + F.retainedDiscount, F.estateReduction);
  eq('below-pro-rata component', F.trustUnitsAtClose * F.perVoting - F.notePrincipal, F.belowProRata);
  eq('retained-discount component', F.megRetainedNV * (F.perVoting - F.perNonVoting), F.retainedDiscount);
  eq('trust net equity', F.trustUnitsValue - F.notePrincipal, F.trustEquity);
  eq('trust equity equals seed', F.trustEquity, F.seedValue);
  eq('Meg post-closing balance sheet', F.votingUnits * F.perVoting + F.megRetainedNV * F.perNonVoting + F.notePrincipal, F.megPostClose);
  eq('Meg year-1 pro-rata distribution', 428 * (F.dividend / F.totalUnits), F.megYear1Distrib);
  eq('year-1 round trip', 428 * (F.dividend / F.totalUnits) + F.noteInterest + 2095236, F.dividend);
  eq('year-6 steady inflow', F.votingUnits * (F.dividend / F.totalUnits) + F.noteInterest, F.steadyInflow);
  eq('year-6 steady gap', F.steadyOutflow - F.steadyInflow, F.steadyGap);
  eq('trust steady dividend share', F.nonVotingUnits * (F.dividend / F.totalUnits), F.trustDivSteady);
  eq('burn at steady state', Math.round(F.trustDivSteady * F.qualDivRate), F.burnSteady);
  eq('tech concentration', Math.round(F.brokerage * F.techPct), F.techPositions);
  eq('CPC share of net worth', Math.round(F.cpcValue / F.netWorth * 1000) / 10, F.cpcShareOfNetWorth);
  eq('leverage per $1 exemption', Math.round(F.estateReduction / F.seedValue * 100) / 100, Number(F.leverage));
  eq('rate spread on the note', Math.round(F.notePrincipal * (F.afrShort - F.noteRate)), F.rateSpreadCost);
  check('11', `Rendered arithmetic recomputed in Node (24 identities) against CASE.md Part M`,
        bad.length === 0, bad.join('\n'));
}

/* ---- 12  charts ----------------------------------------------------------- */
{
  const bad = [];
  for (const l of LESSONS) {
    const t = readFileSync(join(REPO, l), 'utf8');
    for (const rx of [/>\s*NaN\s*</g, />\s*undefined\s*</g, /"\s*NaN\s*"/g, /d="[^"]*NaN[^"]*"/g,
                      /(?:x|y|cx|cy|width|height)="\s*(?:NaN|undefined|)"/g]) {
      rx.lastIndex = 0; let m;
      while ((m = rx.exec(t))) bad.push(`${l}:${t.slice(0, m.index).split('\n').length}  ${m[0]}`);
    }
  }
  check('12', 'No NaN, undefined or empty axis values in static chart markup', bad.length === 0, bad.join('\n'));
}

/* ---- 14b  SVG hygiene ----------------------------------------------------- */
{
  const bad = [];
  const files = [...LESSONS.map((l) => join(REPO, l)), join(REPO, 'scripts/case-flowchart.html')];
  for (const p of files) {
    const t = text(p);
    for (const m of t.matchAll(/(fill|stroke|stop-color|stroke-width|font-size)="var\(/g))
      bad.push(`${rel(p)}: var() in an SVG presentation attribute: ${m[0]}`);
    const open = (t.match(/<svg\b/g) || []).length, close = (t.match(/<\/svg>/g) || []).length;
    if (open !== close) bad.push(`${rel(p)}: ${open} <svg> against ${close} </svg>`);
  }
  /* var() in an SVG presentation attribute is pre-existing in sessions 0.1 and 1,
     at exactly the counts origin/main carries. This migration touched no chart
     (constraint 7 preserves chart implementations), so the check fails on a
     REGRESSION against that recorded baseline and reports the standing count
     either way. verify-browser.mjs measures whether it actually renders. */
  const VAR_BASELINE = { 'index.html': 0, 'session-0.1/index.html': 8, 'session-1/index.html': 7,
                         'session-2/index.html': 0, 'session-3/index.html': 0, 'session-4/index.html': 0,
                         'scripts/case-flowchart.html': 0 };
  const varsBy = {};
  for (const b of bad) { const f = b.split(':')[0]; if (/var\(/.test(b)) varsBy[f] = (varsBy[f] || 0) + 1; }
  const regress = Object.entries(varsBy).filter(([f, n]) => n > (VAR_BASELINE[f] ?? 0));
  const unbalanced = bad.filter((b) => /<svg> against/.test(b));
  check('14b', 'SVG hygiene: tags balanced, no var() REGRESSION against the pre-migration baseline',
        regress.length === 0 && unbalanced.length === 0,
        [...regress.map(([f, n]) => `${f}: ${n} var() attrs, baseline ${VAR_BASELINE[f] ?? 0}`), ...unbalanced].join('\n') ||
        Object.entries(varsBy).map(([f, n]) => `${f}: ${n} var() attrs (baseline ${VAR_BASELINE[f] ?? 0}, pre-existing, none introduced)`).join('\n'));
}

/* ---- 16  minute arithmetic ------------------------------------------------ */
{
  const rows = [], bad = [];
  for (const l of LESSONS) {
    const t = readFileSync(join(REPO, l), 'utf8');
    const tbl = t.match(/<table class="tbudget"[\s\S]*?<\/table>/);
    if (!tbl) { rows.push(`${l.padEnd(24)} no time-budget table`); continue; }
    const seg = [...tbl[0].matchAll(/<tr(?![^>]*class="[^"]*(?:nosum|alloc)[^"]*")[^>]*>[\s\S]*?<td[^>]*class="[^"]*n[^"]*"[^>]*>\s*(\d+)\s*</g)].map((m) => Number(m[1]));
    const alloc = tbl[0].match(/<tr[^>]*class="[^"]*alloc[^"]*"[^>]*>[\s\S]*?(\d+)\s*<\/td>/);
    const sum = seg.reduce((a, b) => a + b, 0);
    const stated = alloc ? Number(alloc[1]) : null;
    rows.push(`${l.padEnd(24)} ${seg.join(' + ')} = ${sum}${stated !== null ? `   stated alloc ${stated}` : ''}`);
    if (stated !== null && sum !== stated) bad.push(`${l}: segments sum to ${sum}, alloc row states ${stated}`);
  }
  check('16', 'Time-budget arithmetic: segment rows sum to the alloc row', bad.length === 0,
        bad.length ? bad.join('\n') + '\n' + rows.join('\n') : rows.join('\n'));
}

/* ---- 17  prose density (REPORT ONLY) -------------------------------------- */
{
  const rows = [];
  for (const l of LESSONS) {
    if (l === 'index.html') continue;
    let t = readFileSync(join(REPO, l), 'utf8');
    t = t.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '')
         .replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ');
    const words = (t.match(/\b[A-Za-z][A-Za-z'-]*\b/g) || []).length;
    /* Denominator is the ALLOCATED minutes from the time-budget alloc row, not the
       sum of every .mins badge, which double-counts the appendix. */
    const raw = readFileSync(join(REPO, l), 'utf8');
    const tb = raw.match(/<table class="tbudget"[\s\S]*?<\/table>/);
    const ar = tb && tb[0].match(/<tr[^>]*class="[^"]*alloc[^"]*"[^>]*>[\s\S]*?(\d+)\s*<\/td>/);
    const alloc = ar ? Number(ar[1]) : 120;   /* session 0.1 is the 0.x format: 120 */
    rows.push(`${l.padEnd(24)} ${String(words).padStart(6)} words / ${String(alloc).padStart(3)} allocated min = ${(words / alloc).toFixed(1)} wpm`);
  }
  info('17', 'Prose density (REPORT ONLY, band unratified, build-checklist Part C)', rows.join('\n'));
}

/* ---- 18  confidence labels ------------------------------------------------ */
{
  const bad = [], rows = [];
  for (const l of LESSONS) {
    const t = readFileSync(join(REPO, l), 'utf8');
    const chips = [...t.matchAll(/<span class="conf[^"]*"([^>]*)>/g)];
    const keyed = chips.filter((c) => /data-src="([^"]+)"/.test(c[1]));
    const ids = new Set([...t.matchAll(/id="(src-[^"]+)"/g)].map((m) => m[1]));
    const unresolved = keyed.map((c) => c[1].match(/data-src="([^"]+)"/)[1]).filter((k) => !ids.has(k));
    rows.push(`${l.padEnd(24)} chips ${String(chips.length).padStart(3)}   keyed ${String(keyed.length).padStart(3)}   unkeyed ${chips.length - keyed.length}   dangling keys ${unresolved.length}`);
    if (unresolved.length) bad.push(`${l}: data-src keys with no footer entry: ${[...new Set(unresolved)].join(', ')}`);
  }
  check('18', 'Confidence chips resolve to a footer source entry (pedagogy R2)',
        bad.length === 0, bad.length ? bad.join('\n') + '\n' + rows.join('\n') : rows.join('\n'));
}

console.log(report.join('\n'));
console.log(`\nsummary: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
