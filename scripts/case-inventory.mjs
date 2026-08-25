#!/usr/bin/env node
/**
 * case-inventory.mjs — every reference to a Cole household fact in the tree,
 * with the guard that stands between it and silent drift.
 *
 * Phase 3.5 asks one question and this file answers it repeatably: HOW MANY CASE
 * FACTS CAN DRIFT? A figure inside the injected span cannot; a figure pinned by
 * verify-migration check 20 cannot; everything else can, and the count of
 * everything else is the deliverable.
 *
 *   node scripts/case-inventory.mjs             summary by guard state
 *   node scripts/case-inventory.mjs --full      every occurrence, one per line
 *   node scripts/case-inventory.mjs --json      the same as JSON
 *   node scripts/case-inventory.mjs --orphans  figures CASE.md does not carry
 *   node scripts/case-inventory.mjs --misses   every occurrence the context test declined
 *   node scripts/case-inventory.mjs --report   write docs/case-fact-inventory.md
 *   node scripts/case-inventory.mjs --docs      include docs/, audit/, CHANGELOG
 *
 * GUARD STATE
 *   INJECTED   inside CASE:BEGIN/CASE:END. Overwritten on the next inject and
 *              hash-guarded by verify-case.mjs. Cannot drift.
 *   PINNED     matched by one of verify-migration.mjs check 20's regex pins, so
 *              a change to CASE.md that this occurrence does not follow fails.
 *   UNGUARDED  everything else.
 *
 * WHAT COUNTS AS A REFERENCE. A surface form distinctive enough that a match is
 * evidence rather than coincidence: a thousands-separated money amount, a case
 * proper noun, a document date, a rate the case states. Where a form is NOT
 * distinctive on its own — an age, a unit count, a round percentage — the fact
 * carries a `near` pattern and the occurrence only counts inside that context.
 * The bias is deliberate and one-directional: this undercounts rather than
 * inventing drift surface. Everything it skips is listed by --misses.
 *
 * pedagogy R12: plain ES, no dependency.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { classify, REGIONS } from './editorial-regions.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const F = JSON.parse(readFileSync(join(REPO, 'scripts/case-facts.json'), 'utf8')).figures;

export const LESSONS = ['index.html', 'session-0.1/index.html', 'session-1/index.html',
                        'session-2/index.html', 'session-3/index.html', 'session-4/index.html'];
/* Generators and checkers hold case values on purpose: they are the machinery.
   Inventoried, reported separately, and never counted in the lesson total. */
const MACHINERY = ['scripts/case-facts.json', 'scripts/case-extract.html',
                   'scripts/case-flowchart.html', 'scripts/build-case.mjs',
                   'scripts/inject-case.mjs', 'scripts/verify-migration.mjs',
                   'scripts/case-inventory.mjs', 'scripts/state_space.py'];
const DOCS = ['CHANGELOG.md', 'README.md', 'MAINTAINING.md', 'EDITORIAL.md', 'SOURCES.md',
              'BIBLIOGRAPHY.md', 'DATA-PULL.md', 'changelog/index.html'];

/* ------------------------------------------------------------------ facts -- */

const money = (n) => Number(n).toLocaleString('en-US');
/** $1,234,567 | 1,234,567 | $1234567 — the separated form is the distinctive one. */
function moneyRx(n) {
  const s = money(n).replace(/,/g, '\\,?');
  return new RegExp(`(?<![0-9,.])\\$?${s}(?![0-9])(?!,[0-9])`, 'g');
}
/**
 * "$55 million" / "$55M" for a round millions figure.
 *
 * THE DOLLAR SIGN IS REQUIRED and the reason is measured rather than assumed:
 * without it, `1M` matched "1M context window" ten times in session-0.1, which
 * is a token budget and not the inherited IRA. A bare "fifty-five million" in
 * prose about the case is therefore missed. That is the declared direction of
 * this measurement's bias — it undercounts rather than inventing drift surface —
 * and --misses does not list it, because a form the scanner has no pattern for
 * is not a match it declined.
 */
function millionsRx(n) {
  if (n % 1000000 !== 0) return null;
  return new RegExp(`(?<![0-9,.])\\$${n / 1000000}\\s*(?:million\\b|M\\b)`, 'gi');
}
const pctRx = (p) => new RegExp(`(?<![0-9.])${String(p).replace('.', '\\.')}\\s*(?:%|&#37;|\\s*percent)`, 'g');
const wordRx = (s) => new RegExp(`\\b${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
const dateRx = (s) => new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');

/**
 * FACTS — one row per distinguishable Cole household fact.
 *   key       the case-facts.json key, or a CASE.md section for a fact that has none
 *   klass     money | pct | name | date | count | age
 *   rx        the surface forms
 *   near      required context within ±NEAR characters, for non-distinctive forms
 */
const NEAR = 260;
const F_ = (k) => F[k];
const facts = [];
const fact = (key, klass, rx, opts = {}) =>
  facts.push({ key, klass, rx: [].concat(rx).filter(Boolean), near: opts.near || null,
               value: opts.value !== undefined ? opts.value : F_(key), where: opts.where || '' });

/* money — every keyed figure whose separated form is distinctive on its own */
for (const [key, where] of [
  ['cpcValue', 'C.1'], ['megBasis', 'B.2'], ['revenue', 'B.3'], ['ebitda', 'B.3'],
  ['dividend', 'B.4'], ['brokerage', 'C.1'], ['megIra', 'C.1'], ['inheritedIra', 'C.1'],
  ['david403b', 'C.1'], ['residence', 'C.1'], ['cash', 'C.1'], ['tbills', 'C.1'],
  ['netWorth', 'C.1'], ['techPositions', 'C.2'], ['inhIraRmd2026', 'C.3.3'],
  ['megW2', 'D.1'], ['householdIncome', 'D.1'], ['livingExpenses', 'D.2'],
  ['charitable', 'D.2'], ['propertyTax', 'D.2'], ['dividendTax', 'D.3'],
  ['householdGap', 'D.3'], ['perNonVoting', 'E.2'], ['perVoting', 'E.2'],
  ['proRataNonVote', 'E.2'], ['seedValue', 'E.4'], ['exemption', 'E.4'],
  ['exemptionLeft', 'E.4'], ['notePrincipal', 'E.5'], ['noteInterest', 'E.6'],
  ['trancheCash', 'E.7'], ['totalToMeg', 'E.7'], ['estateReduction', 'E.7'],
  ['megPostClose', 'E.7'], ['belowProRata', 'E.7'], ['retainedDiscount', 'E.7'],
  ['megYear1Distrib', 'E.7'], ['steadyInflow', 'E.7'], ['steadyOutflow', 'E.7'],
  ['steadyGap', 'E.7'], ['trustEquity', 'E.7'], ['trustUnitsValue', 'E.7'],
  ['burnSteady', 'E.8'], ['trustDivSteady', 'E.8'], ['burnYear1', 'E.8'],
  ['burnCum25', 'E.8'], ['buySellFormula', 'F.6'], ['appraisal2023', 'F.7'],
  ['endowmentIntent', 'PART G'], ['ilExclusion', 'A.4'], ['fedExclusion', 'H.6.1'],
  ['rateSpreadCost', 'H.4'],
]) {
  const v = F_(key);
  if (typeof v !== 'number') continue;
  /* under $100,000 an un-separated match is coincidence-prone; keep the $ form */
  fact(key, 'money', [moneyRx(v), v >= 1000000 ? millionsRx(v) : null], { where });
}

/* money the lessons state that CASE.md derives rather than keys */
for (const [label, v, where, expr] of [
  ['votingBlockValue', F.votingUnits * F.perVoting, 'E.7', '100 × $55,000'],
  ['nonVotingAggregate', F.nonVotingUnits * F.perNonVoting, 'E.2', '900 × $38,500'],
  ['megUnitsValue', F.votingUnits * F.perVoting + F.megRetainedNV * F.perNonVoting, 'E.7 / Part L', '100 × $55,000 + 328 × $38,500'],
  ['votingBlockDividend', F.votingUnits * (F.dividend / F.totalUnits), 'E.7', '100 × $5,000'],
  ['trustYear1Dividend', F.trustUnitsAtClose * (F.dividend / F.totalUnits), 'E.7 / E.8', '572 × $5,000'],
  ['year1Excess', 2095236, 'E.7', '$2,860,000 − $764,764'],
  ['interestPerMillion', Math.round(1000000 * F.noteRate), 'E.6', '$1,000,000 × 3.82%'],
  ['perUnitDividend', F.dividend / F.totalUnits, 'E.2', '$5,000,000 ÷ 1,000'],
]) fact(label, 'money', [moneyRx(v), v >= 1000000 ? millionsRx(v) : null], { value: v, where: `${where} — ${expr}` });

/* rates and percentages the case states */
for (const [key, p, where, near] of [
  ['discount', 30, 'E.2 / H.5', /discount|DLOM|DLOC|marketab|lack of control|non-?voting|valuation|appraise/i],
  ['qualDivRate', 28.75, 'D.3', null],
  ['ordinaryRate', 41.95, 'D.3', null],
  ['ilIncomeRate', 4.95, 'D.3', null],
  ['noteRate', 3.82, 'E.6 / H.3', /note|rate|interest|blended|7872|demand/i],
  ['afrShort', 4.10, 'H.1', /AFR|applicable federal|short-term|1274|rate/i],
  ['afrMid', 4.35, 'H.1', /AFR|applicable federal|mid-term|7520|rate/i],
  ['afrLong', 4.92, 'H.1', /AFR|applicable federal|long-term|rate/i],
  ['rate7520', 5.20, 'H.2', /7520|AFR|rate|annuit|remainder/i],
  ['techPct', 62, 'C.2', /brokerage|technology|concentrat|three (?:technology|tech)/i],
  ['cpcShareOfNetWorth', 82.1, 'M', null],
  ['ilTopRate', 16, 'H.6.2', /Illinois|estate tax|top rate/i],
  ['dividendYield', 9.09, 'B.4', /yield|dividend|indicated value/i],
  ['custConcentration', 61, 'B.3', /customer|revenue|concentrat/i],
  ['corpRate', 21, 'B.3 / D.3', /corporat|§\s*11|C corporation|federal rate/i],
  ['qualDivFed', 23.8, 'D.3', null],
  ['topOrdinary', 37, 'D.3', /federal|ordinary|bracket|top rate|marginal/i],
  ['ltcgTop', 20, 'D.3', /qualified dividend|long-term|capital gain/i],
  ['niit', 3.8, 'D.3', /net investment|NIIT|1411/i],
  ['charFloor', 0.5, 'PART G', /floor|contribution base|170\(b\)/i],
  /* ADDED after the first measurement, and the reason is recorded because it
     changes the baseline. index.html:869 states the Illinois replacement income
     tax on trusts at 1.5%. It is a CASE.md figure (§D.3, §E.8) that is NOT in
     case-facts.json, NOT in COLE and NOT in the injected span — a quantitative
     case fact with no guard anywhere in the corpus — and the first pass had no
     pattern for it, so the drift surface it sits on was invisible to the
     measurement. The rest of this block is the same audit run over CASE.md
     Parts D, G and H for figures the first pass could not see. */
  ['ilTrustReplacementRate', 1.5, 'D.3 / E.8', /trust|replacement|grantor|Illinois|201\(c\)/i],
  ['ilCorpRate', 7.0, 'B.3', /Illinois|corporate|201\(b\)/i],
  ['ilCorpReplacement', 2.5, 'B.3', /Illinois|replacement|corporate/i],
  ['trustCombinedRate', 6.45, 'E.8', /trust|Illinois|replacement|toggl/i],
  ['estateTopRate', 40, 'H.6.1', /estate|gift|transfer tax|2001\(c\)/i],
  ['evEbitda', 6.0, 'C.2', /EBITDA|multiple|EV\/|mid-point/i],
  ['charSubsidy', 24.06, 'PART G', /charit|subsid|deduct/i],
  ['itemisedCap', 35, 'PART G', /itemis|itemiz|deduction|cent/i],
  ['medicareSurtax', 0.9, 'D.3', /Medicare|wages|3101/i],
]) fact(key, 'pct', pctRx(p), { value: p, where, near });

/* money CASE.md states that the first pass had no pattern for */
for (const [key, v, where, near] of [
  ['annualExclusion', 19000, 'H.6.1', /annual exclusion|donee|2503/i],
  ['charFloorAmount', 25000, 'PART G', /floor|contribution base/i],
  ['charDeductible', 55000, 'PART G', /deduct|charit/i],
  ['charFedBenefit', 19250, 'PART G', /benefit|subsid|charit/i],
  ['megW2Net', 250650, 'D.3', /W-2|net|after/i],
  ['inhIraRmd2027', 45249, 'C.3.3', /RMD|2027|distribution/i],
  ['inhIraRmd2028', 47393, 'C.3.3', /RMD|2028|distribution/i],
  ['afrShortInterest', 820820, 'H.4', /4\.10|1274|short-term|interest/i],
  ['deMinimisLoan', 10000, 'H.3', /de minimis|7872/i],
  ['giftLoanNII', 100000, 'H.3', /net investment|7872|gift.?loan/i],
  ['revolver', 4000000, 'B.1', /revolv|line of credit|undrawn|debt/i],
  ['capex', 1850000, 'B.3', /capital expenditure|capex/i],
  ['netIncome', 5180000, 'B.3', /net income|after tax/i],
  ['nathanW2', 96000, 'B.5', /Nathan|compensation|W-2/i],
  ['largestGift', 35000, 'PART G', /charit|largest|organisation|organization/i],
  ['facilitySqFt', 96000, 'B.1', /sq ft|square feet|facility/i],
]) fact(key, 'money', [moneyRx(v)], { value: v, where, near });

/* proper nouns and entity names */
for (const [key, s, where, near] of [
  ['megName', 'Margaret "Meg" Cole', 'A.1', null],
  ['megNameAlt', 'Margaret Cole', 'A.1', null],
  ['megShort', 'Meg Cole', 'A.1', null],
  ['davidName', 'David Cole', 'A.1', null],
  ['claireName', 'Claire Cole Whitaker', 'A.2', null],
  ['claireShort', 'Claire', 'A.2', /Cole|Nathan|physician|daughter|children/i],
  ['nathanName', 'Nathan Cole', 'A.2', null],
  ['nathanShort', 'Nathan', 'A.2', /Cole|Claire|son|operations|succession/i],
  ['benName', 'Ben Whitaker', 'A.2', null],
  ['decedent', 'Walter Hensley', 'A.3', null],
  ['priorCompany', 'Hensley Precision Products', 'B.1', null],
  ['companyName', 'Cole Precision Components', 'B.1', null],
  ['companyAbbr', 'CPC', 'B.1', null],
  ['llcName', 'Cole Family Holdings', 'E.1', null],
  ['trustName', 'Cole 2026 Irrevocable Trust', 'E.3', null],
  ['revTrustName', 'Cole Joint Revocable Trust', 'F.2', null],
  ['charityName', 'Rockford Workforce Alliance', 'PART G', null],
  ['residenceTown', 'Barrington Hills', 'A.4', null],
  ['plantTown', 'Rockford', 'A.4', null],
  ['domicile', 'Illinois', 'A.4', null],
  ['estateCounsel', 'Corbin & Reyes', 'A.5', null],
  ['cpaFirm', 'Halvorsen Group', 'A.5', null],
  ['appraiser', 'Merrit Valuation Advisors', 'A.5', null],
  ['banker', 'Lakeshore Industrial Partners', 'A.5', null],
  ['buySellDrafter', 'Ostrander LLC', 'F.6', null],
]) fact(key, 'name', wordRx(s), { value: s, where, near });

/* dated documents and events */
for (const [key, s, where] of [
  ['purchaseDate', '1 July 2016', 'B.2'],
  ['decedentDied', '4 November 2021', 'A.3'],
  ['marriedDate', '21 September 1991', 'A.1'],
  ['incorporated', '3 February 1987', 'B.1'],
  ['renamed', '15 August 2016', 'B.1'],
  ['noteSatisfied', '1 July 2025', 'B.2'],
  ['buySellDate', '30 May 2014', 'F.6'],
  ['willsDate', '22 March 2011', 'F.1'],
  ['appraisalDate', '12 September 2023', 'F.7'],
  ['memoDate', '19 February 2026', 'F.8'],
  ['succMemoDate', '12 March 2026', 'F.13'],
  ['inquiryDate', '8 October 2025', 'F.14'],
  ['draftDate', '6 April 2026', 'F.10'],
  ['indicativeDate', '30 June 2026', 'C.2'],
  ['asOfDate', '31 July 2026', 'PART C'],
]) fact(key, 'date', dateRx(s), { value: s, where });

/* counts that are only distinctive in context */
for (const [key, n, where, near] of [
  ['totalUnits', 1000, 'E.1', /unit|share|recapitaliz/i],
  ['votingUnits', 100, 'E.1', /voting unit|\bvoting\b.{0,40}unit|unit.{0,30}voting/i],
  ['nonVotingUnits', 900, 'E.1', /non-?voting/i],
  ['seedUnits', 52, 'E.4', /unit|gift|seed/i],
  ['saleUnits', 520, 'E.5', /unit|sold|sale|sell/i],
  ['trustUnitsAtClose', 572, 'E.5', /unit|trust/i],
  ['megRetainedNV', 328, 'E.5', /unit|retain|remaining/i],
  ['megYear1Units', 428, 'E.7', /unit/i],
  ['employees', 180, 'B.1', /employee|workforce|staff/i],
  ['megAge', 64, 'A.1', /Meg|Margaret/i],
  ['davidAge', 63, 'A.1', /David/i],
  ['claireAge', 34, 'A.2', /Claire/i],
  ['nathanAge', 31, 'A.2', /Nathan/i],
  ['marriedYears', 34, 'A.1', /married|marriage/i],
  ['megApplicableAge', 75, 'C.3.1', /applicable age|RMD|required beginning/i],
  ['megFirstDistYear', 2037, 'C.3.1', /distribution|RMD/i],
  ['inhIraOuterLimit', 2031, 'C.3.3', /ten-year|inherited|31 December/i],
]) fact(key, key.endsWith('Age') || key === 'marriedYears' ? 'age' : 'count',
        new RegExp(`(?<![0-9,.$])${money(n)}(?![0-9])(?!,[0-9])(?!%)`, 'g'),
        { value: n, where, near });

export { facts };

/* ------------------------------------------------------------- guard state -- */

/** verify-migration check 20's pins, transcribed. Kept in step by assertPins(). */
export const CHECK20_PINS = [
  { rx: /Meg is short (?:<(?:b|strong)>)?\$([0-9,]+)(?:<\/(?:b|strong)>)? a year/g, key: 'steadyGap' },
  { rx: /How much of the (?:<(?:b|strong)>)?\$([0-9,]+)(?:<\/(?:b|strong)>)? note does she call/g, key: 'notePrincipal' },
  { rx: /Each \$1,000,000 she calls permanently removes \$([0-9,]+) of future interest/g, key: 'interestPerMillion' },
];

/** The pin list here must be the pin list there. A silent divergence is the defect. */
export function assertPins() {
  const v = readFileSync(join(REPO, 'scripts/verify-migration.mjs'), 'utf8');
  const block = v.match(/const PINS = \[([\s\S]*?)\n  \];/);
  if (!block) throw new Error('verify-migration.mjs: cannot find check 20 PINS');
  const n = (block[1].match(/^\s*\[\//gm) || []).length;
  if (n !== CHECK20_PINS.length) {
    throw new Error(`check 20 has ${n} pins, case-inventory.mjs transcribes ${CHECK20_PINS.length}`);
  }
  return n;
}

/** [start,end) spans covered by a check-20 pin in this text. */
function pinSpans(text) {
  const out = [];
  for (const { rx } of CHECK20_PINS) {
    rx.lastIndex = 0;
    let m; while ((m = rx.exec(text))) out.push([m.index, m.index + m[0].length]);
  }
  return out;
}

/* ------------------------------------------------------------------- scan -- */

function walk(d, out = []) {
  for (const e of readdirSync(d)) {
    if (e === '.git' || e === 'node_modules' || e === '.verify-shots') continue;
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

const lineAt = (text, i) => text.slice(0, i).split('\n').length;

export function scanFile(rel) {
  const path = join(REPO, rel);
  let text;
  try { text = readFileSync(path, 'utf8'); } catch { return []; }
  const isHtml = rel.endsWith('.html');
  const c = isHtml ? classify(text) : null;
  const caseA = text.indexOf('<!-- CASE:BEGIN'), caseB = text.indexOf('<!-- CASE:END');
  const inCase = (i) => caseA >= 0 && caseB > caseA && i >= caseA && i <= caseB + 40;
  const pins = pinSpans(text);
  const inPin = (i) => pins.some(([a, b]) => i >= a && i < b);

  const hits = [];
  for (const f of facts) {
    for (const rx of f.rx) {
      rx.lastIndex = 0;
      let m;
      while ((m = rx.exec(text))) {
        if (f.near) {
          const around = text.slice(Math.max(0, m.index - NEAR), m.index + NEAR);
          if (!f.near.test(around)) continue;
        }
        const guard = inCase(m.index) ? 'INJECTED' : inPin(m.index) ? 'PINNED' : 'UNGUARDED';
        hits.push({
          file: rel, line: lineAt(text, m.index), offset: m.index,
          key: f.key, klass: f.klass, where: f.where, quantitative: f.klass !== 'name',
          written: m[0], expected: String(f.value), guard,
          region: c ? c.regionOf(m.index) : (rel.endsWith('.md') ? 'MD' : 'SRC'),
          context: (text.slice(Math.max(0, m.index - 55), m.index).replace(/\s+/g, ' ') + '\u3008' + m[0] + '\u3009' + text.slice(m.index + m[0].length, m.index + m[0].length + 55).replace(/\s+/g, ' ')).trim(),
        });
      }
    }
  }
  /* one occurrence, one row: the longest match wins where forms overlap */
  hits.sort((a, b) => a.offset - b.offset || b.written.length - a.written.length);
  const kept = [];
  let lastEnd = -1, lastKey = null;
  for (const h of hits) {
    if (h.offset < lastEnd && h.key !== lastKey) continue;
    if (h.offset < lastEnd && h.key === lastKey) continue;
    kept.push(h); lastEnd = h.offset + h.written.length; lastKey = h.key;
  }
  return kept;
}

export function scan({ docs = false } = {}) {
  const files = [...LESSONS, ...MACHINERY];
  if (docs) {
    files.push(...DOCS, 'CASE.md');
    for (const p of walk(join(REPO, 'docs'))) files.push(relative(REPO, p));
    for (const p of walk(join(REPO, 'audit'))) files.push(relative(REPO, p));
  }
  const rows = [];
  for (const f of new Set(files)) rows.push(...scanFile(f));
  return rows;
}



/* ----------------------------------------------------------------- misses -- */

/**
 * misses — every occurrence this measurement DECLINED to count, and why.
 *
 * A fact whose surface form is not distinctive carries a `near` context test,
 * and a match that fails it is dropped. Dropping silently would make the
 * headline number look better than the corpus is, so every drop is listed here
 * with the text around it. A reader can then judge the undercount rather than
 * take it on trust.
 */
export function misses() {
  const out = [];
  for (const rel of LESSONS) {
    const text = readFileSync(join(REPO, rel), 'utf8');
    const c = classify(text);
    for (const f of facts) {
      if (!f.near) continue;
      for (const rx of f.rx) {
        rx.lastIndex = 0;
        let m;
        while ((m = rx.exec(text))) {
          const around = text.slice(Math.max(0, m.index - NEAR), m.index + NEAR);
          if (f.near.test(around)) continue;
          out.push({ file: rel, line: lineAt(text, m.index), key: f.key, written: m[0],
                     region: c.regionOf(m.index),
                     context: (text.slice(Math.max(0, m.index - 55), m.index).replace(/\s+/g, ' ') +
                               '〈' + m[0] + '〉' +
                               text.slice(m.index + m[0].length, m.index + m[0].length + 55).replace(/\s+/g, ' ')).trim() });
        }
      }
    }
  }
  return out;
}

/* ---------------------------------------------------------------- orphans -- */

/**
 * orphans — every money figure and case-flavoured percentage in a lesson that is
 * NOT a value CASE.md carries. Two things hide here and they are the point of
 * Part 1's conflict report: a lesson stating a case fact CASE.md states
 * differently, and a lesson stating a case fact CASE.md does not carry at all.
 * Reported with context; the judgement of whether it is a case claim is not
 * mechanical and is not made here.
 */
const KNOWN_NUM = new Set();
for (const f of facts) if (f.klass === 'money' || f.klass === 'count' || f.klass === 'age') KNOWN_NUM.add(String(f.value));
for (const v of Object.values(F)) if (typeof v === 'number') KNOWN_NUM.add(String(v));
/* values the corpus legitimately carries that are not Cole facts: the retired
   register's own figures, prices, token counts. Judged, not guessed — each is
   listed so the exclusion is reviewable. */
const NOT_CASE = new Set(['5000', '10000', '1000000']);

export function orphans() {
  const CASE_CTX = /Cole|CPC|\bMeg\b|Margaret|Hensley|Nathan|Claire|trust|LLC|unit|note|estate|gift|dividend|appraisal|buy-?sell|discount|exemption|basis|IRA|brokerage/i;
  const out = [];
  for (const rel of LESSONS) {
    const text = readFileSync(join(REPO, rel), 'utf8');
    const c = classify(text);
    const caseA = text.indexOf('<!-- CASE:BEGIN'), caseB = text.indexOf('<!-- CASE:END');
    for (const m of text.matchAll(/\$([0-9]{1,3}(?:,[0-9]{3})+)(?![0-9])/g)) {
      const n = m[1].replace(/,/g, '');
      if (KNOWN_NUM.has(n) || NOT_CASE.has(n)) continue;
      const around = text.slice(Math.max(0, m.index - 300), m.index + 300);
      if (!CASE_CTX.test(around)) continue;
      const inj = caseA >= 0 && m.index >= caseA && m.index <= caseB;
      out.push({ file: rel, line: lineAt(text, m.index), written: m[0], guard: inj ? 'INJECTED' : 'UNGUARDED',
                 region: c.regionOf(m.index),
                 context: (text.slice(Math.max(0, m.index - 90), m.index).replace(/\s+/g, ' ') + '\u3008' + m[0] + '\u3009' +
                           text.slice(m.index + m[0].length, m.index + m[0].length + 90).replace(/\s+/g, ' ')).trim() });
    }
  }
  return out;
}


/* ----------------------------------------------------------------- report -- */

/**
 * report — docs/case-fact-inventory.md, generated. The measurement only; the
 * judgements about what to do with it live in docs/repo-updates-plan.md.
 */
export function report() {
  const rows = scan();
  const lessons = rows.filter((r) => LESSONS.includes(r.file));
  const machinery = rows.filter((r) => !LESSONS.includes(r.file));
  const by = (rs, f) => rs.reduce((a, r) => ((a[f(r)] = (a[f(r)] || 0) + 1), a), {});
  const tbl = (obj, label) => {
    const L = [`| ${label} | Count |`, '|---|---:|'];
    for (const [k, v] of Object.entries(obj).sort((a, b) => b[1] - a[1])) L.push(`| \`${k}\` | ${v} |`);
    return L;
  };
  const q = lessons.filter((r) => r.quantitative);
  const qu = q.filter((r) => r.guard === 'UNGUARDED');
  const un = lessons.filter((r) => r.guard === 'UNGUARDED');
  const mi = misses();
  const orph = orphans();

  const L = [];
  L.push('# Case-fact inventory — the drift surface');
  L.push('');
  L.push('**Generated by `scripts/case-inventory.mjs`. Do not edit: the next run');
  L.push('overwrites it.** Re-run it after any change to a lesson or to `CASE.md`.');
  L.push('');
  L.push('One question, answered repeatably: **how many references to a Cole household');
  L.push('fact can drift?** A figure inside the injected span cannot — it is overwritten');
  L.push('on the next inject and hash-guarded by `verify-case.mjs`. A figure matched by a');
  L.push('`verify-migration.mjs` check-20 pin cannot — a change to `CASE.md` that the');
  L.push('occurrence does not follow fails the check. Everything else can.');
  L.push('');
  L.push('## Guard states');
  L.push('');
  L.push('| State | What it means |');
  L.push('|---|---|');
  L.push('| `INJECTED` | Inside `<!-- CASE:BEGIN … -->` / `<!-- CASE:END … -->`. Cannot drift. |');
  L.push('| `PINNED` | Matched by a check-20 regex pin, which asserts it against `case-facts.json`. |');
  L.push('| `UNGUARDED` | Everything else. **This is the drift surface.** |');
  L.push('');
  L.push('## The headline');
  L.push('');
  L.push('| | Total | Quantitative | Qualitative |');
  L.push('|---|---:|---:|---:|');
  for (const g of ['INJECTED', 'PINNED', 'UNGUARDED']) {
    const a = lessons.filter((r) => r.guard === g);
    L.push(`| \`${g}\` | ${a.length} | ${a.filter((r) => r.quantitative).length} | ${a.filter((r) => !r.quantitative).length} |`);
  }
  L.push(`| **TOTAL** | **${lessons.length}** | **${q.length}** | **${lessons.length - q.length}** |`);
  L.push('');
  L.push('**The number the unification rule moves is the quantitative `UNGUARDED` count:');
  L.push(`\`${qu.length}\`.** A qualitative reference — "Meg", "CPC", "Illinois" — is already`);
  L.push('the target state under the rule *every quantitative case fact appears once,');
  L.push('injected from `CASE.md`; every other reference to it is qualitative*, so a');
  L.push('qualitative reference is not drift surface and removing one would be a loss.');
  L.push('');
  L.push('## `UNGUARDED`, by file');
  L.push('');
  L.push('| File | Total | Quantitative |');
  L.push('|---|---:|---:|');
  for (const f of LESSONS) {
    const a = un.filter((r) => r.file === f);
    if (!a.length) continue;
    L.push(`| \`${f}\` | ${a.length} | ${a.filter((r) => r.quantitative).length} |`);
  }
  L.push('');
  L.push('## `UNGUARDED`, by region');
  L.push('');
  L.push('| Region | | Total | Quantitative |');
  L.push('|---|---|---:|---:|');
  for (const [k, v] of Object.entries(by(un, (r) => r.region)).sort((a, b) => b[1] - a[1])) {
    L.push(`| \`${k}\` | ${REGIONS[k] || '?'} | ${v} | ${un.filter((r) => r.region === k && r.quantitative).length} |`);
  }
  const r2 = qu.filter((r) => r.region === 'R2').length;
  L.push('');
  L.push(`**\`R2\` carries ${r2} of the ${qu.length} quantitative unguarded references, ${(100 * r2 / (qu.length || 1)).toFixed(1)}%** — answer`);
  L.push('keys, chart data arrays and JS feedback strings. They are inside `<script>`, so');
  L.push('they are outside the injected span and outside the pins, and a student reads');
  L.push('every one of them.');
  L.push('');
  L.push('## `UNGUARDED`, by class');
  L.push('');
  L.push(...tbl(by(un, (r) => r.klass), 'Class'));
  L.push('');
  L.push('## `UNGUARDED`, by fact');
  L.push('');
  L.push(...tbl(by(un, (r) => r.key), 'Fact'));
  L.push('');
  L.push('## Machinery');
  L.push('');
  L.push('Generators and checkers hold case values on purpose: they are the machinery,');
  L.push('not the corpus. Reported, never counted in the drift surface.');
  L.push('');
  L.push(...tbl(by(machinery, (r) => r.file), 'File'));
  L.push('');
  L.push('## What this measurement declines to count');
  L.push('');
  L.push('A fact whose surface form is not distinctive on its own — an age, a unit count,');
  L.push('a round percentage — carries a context test, and a match that fails it is');
  L.push('dropped. **The bias is deliberate and one-directional: this undercounts rather');
  L.push('than inventing drift surface.**');
  L.push('');
  L.push(`**${mi.length} occurrence(s) declined.** \`node scripts/case-inventory.mjs --misses\` lists every one`);
  L.push('with the text around it, so the undercount can be judged rather than trusted.');
  L.push('');
  L.push(...tbl(by(mi, (r) => r.key), 'Declined for'));
  L.push('');
  L.push('## Money figures in case context that `CASE.md` does not carry');
  L.push('');
  if (orph.length) {
    L.push('| File:line | Guard | Figure | Context |');
    L.push('|---|---|---|---|');
    for (const o of orph) L.push(`| \`${o.file}:${o.line}\` | ${o.guard} | ${o.written} | ${o.context.replace(/\|/g, '\\|').slice(0, 150)} |`);
  } else {
    L.push('*None.*');
  }
  L.push('');
  L.push(`Checked against every keyed figure in \`case-facts.json\` and every value this`);
  L.push('inventory derives. A figure here is either a case fact `CASE.md` does not carry,');
  L.push('or a number that is not about the case at all; the tool does not decide which.');
  return L.join('\n') + '\n';
}

/* ------------------------------------------------------------------ main -- */

if (process.argv[1] && process.argv[1].endsWith('case-inventory.mjs')) {
  const argv = process.argv.slice(2);
  const nPins = assertPins();
  const rows = scan({ docs: argv.includes('--docs') });
  const lessons = rows.filter((r) => LESSONS.includes(r.file));
  const other = rows.filter((r) => !LESSONS.includes(r.file));

  if (argv.includes('--json')) {
    console.log(JSON.stringify({ pins: nPins, rows }, null, 2));
  } else if (argv.includes('--report') || argv.includes('--report-check')) {
    const body = report();
    const out = join(REPO, 'docs/case-fact-inventory.md');
    let before = null;
    try { before = readFileSync(out, 'utf8'); } catch { /* first run */ }
    if (before === body) { console.log('current       docs/case-fact-inventory.md'); }
    else if (argv.includes('--report-check')) { console.error('WOULD CHANGE  docs/case-fact-inventory.md'); process.exit(1); }
    else { writeFileSync(out, body); console.log('written       docs/case-fact-inventory.md'); }
  } else if (argv.includes('--misses')) {
    const mi = misses();
    for (const r of mi) console.log(`${r.region.padEnd(4)} ${(r.file + ':' + r.line).padEnd(30)} ${r.key.padEnd(20)} ${r.written.padEnd(12)} ${r.context}`);
    console.log(`\n${mi.length} occurrence(s) declined: the surface form matched a case fact but the context test did not.`);
  } else if (argv.includes('--orphans')) {
    const o = orphans();
    for (const r of o) console.log(`${r.guard.padEnd(9)} ${r.region.padEnd(4)} ${(r.file + ':' + r.line).padEnd(30)} ${r.written.padEnd(14)} ${r.context}`);
    console.log(`\n${o.length} money figure(s) in case context that CASE.md does not carry`);
  } else if (argv.includes('--full')) {
    for (const r of rows) {
      console.log(`${r.guard.padEnd(9)} ${r.region.padEnd(4)} ${(r.file + ':' + r.line).padEnd(30)} ` +
                  `${r.key.padEnd(22)} ${r.written.padEnd(20)} ${r.written.replace(/[$,%\s]/g, '') === r.expected.replace(/[$,%\s]/g, '') ? '   ' : 'DIFF'} ${r.context.slice(0, 130)}`);
    }
  } else {
    const by = (rs, f) => rs.reduce((a, r) => ((a[f(r)] = (a[f(r)] || 0) + 1), a), {});
    console.log(`check 20 pins: ${nPins}\n`);
    console.log('LESSON FILES — the drift surface');
    const g = by(lessons, (r) => r.guard);
    for (const k of ['INJECTED', 'PINNED', 'UNGUARDED']) console.log(`  ${k.padEnd(10)} ${String(g[k] || 0).padStart(5)}`);
    console.log(`  ${'TOTAL'.padEnd(10)} ${String(lessons.length).padStart(5)}`);
    const qn = lessons.filter((r) => r.quantitative);
    const qu = qn.filter((r) => r.guard === 'UNGUARDED');
    console.log(`\n  QUANTITATIVE only — the number the unification rule moves`);
    console.log(`    INJECTED   ${String(qn.filter((r) => r.guard === 'INJECTED').length).padStart(5)}`);
    console.log(`    PINNED     ${String(qn.filter((r) => r.guard === 'PINNED').length).padStart(5)}`);
    console.log(`    UNGUARDED  ${String(qu.length).padStart(5)}`);
    console.log(`    by file: ` + Object.entries(qu.reduce((a, r) => ((a[r.file] = (a[r.file] || 0) + 1), a), {}))
      .sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k.replace('/index.html', '')} ${v}`).join('  '));
    const un = lessons.filter((r) => r.guard === 'UNGUARDED');
    console.log('\n  UNGUARDED by file');
    for (const [k, v] of Object.entries(by(un, (r) => r.file)).sort((a, b) => b[1] - a[1])) console.log(`    ${k.padEnd(24)} ${String(v).padStart(5)}`);
    console.log('\n  UNGUARDED by region');
    for (const [k, v] of Object.entries(by(un, (r) => r.region)).sort((a, b) => b[1] - a[1])) console.log(`    ${(k + ' ' + (REGIONS[k] || '')).padEnd(30)} ${String(v).padStart(5)}`);
    console.log('\n  UNGUARDED by class');
    for (const [k, v] of Object.entries(by(un, (r) => r.klass)).sort((a, b) => b[1] - a[1])) console.log(`    ${k.padEnd(24)} ${String(v).padStart(5)}`);
    console.log('\n  UNGUARDED, top facts');
    for (const [k, v] of Object.entries(by(un, (r) => r.key)).sort((a, b) => b[1] - a[1]).slice(0, 25)) console.log(`    ${k.padEnd(24)} ${String(v).padStart(5)}`);
    if (other.length) {
      console.log('\nMACHINERY AND DOCS (reported, never counted in the drift surface)');
      for (const [k, v] of Object.entries(by(other, (r) => r.file)).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(34)} ${String(v).padStart(5)}`);
    }
  }
}
