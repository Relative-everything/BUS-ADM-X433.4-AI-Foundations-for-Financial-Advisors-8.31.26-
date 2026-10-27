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
                        'session-2/index.html', 'session-3/index.html', 'session-4/index.html',
                        'session-5/index.html'];
/* Generators and checkers hold case values on purpose: they are the machinery.
   Inventoried, reported separately, and never counted in the lesson total. */
const MACHINERY = ['scripts/case-facts.json', 'scripts/case-extract.html',
                   'scripts/case-flowchart.html', 'scripts/build-case.mjs',
                   'scripts/inject-case.mjs', 'scripts/verify-migration.mjs',
                   'scripts/case-inventory.mjs'];
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
/* v5.0 (next-term-2027, Phase 3): the fact list below is the v5 household's; the v4 list is at tag fall-2026-final. */
const fact = (key, klass, rx, opts = {}) =>
  facts.push({ key, klass, rx: [].concat(rx).filter(Boolean), near: opts.near || null,
               value: opts.value !== undefined ? opts.value : F_(key), where: opts.where || '' });

/* Facts whose value collides with something the corpus legitimately counts.
   Each collision was observed or anticipated from the v5 figures: $1,000,000 is
   the umbrella limit AND a 1M-token context window; $85,000 and $65,000 are
   round sums a lesson may use for an unrelated example; 75 is an age AND a
   percentage. */
const MONEY_NEAR = {
  umbrella: /umbrella|liability|insurance/i,
  cash: /cash|reserve|savings|money market|balance sheet/i,
  megRoth: /Roth|Meg|balance sheet|IRA/i,
  davidRoth: /Roth|David|balance sheet|IRA/i,
  hsa: /HSA|health savings|balance sheet/i,
  plan529: /529|Bright Start|Ryan|college/i,
  esppValue: /employer stock|ESPP|Dunmore|shares|concentrat/i,
  emmaDebt: /Emma|credit[- ]card|debt/i,
  ruthLoanToTom: /Ruth|Tom|loan|lent/i,
  travelBudget: /travel/i,
  propertyTax: /property tax|Naperville|DuPage/i,
  contrib529: /529|Ryan|contribution/i,
  travel: /travel/i,
  memoConversion: /convert|conversion|memo|Roth/i,
};

/* money — every keyed v5 figure whose separated form is distinctive on its own */
for (const [key, where] of [
  ['meg403b', 'C.1'], ['megRoth', 'C.1'], ['david401k', 'C.1'], ['david401kPre', 'C.1'],
  ['david401kRoth', 'C.1'], ['davidRoth', 'C.1'], ['davidRollover', 'C.1'], ['brokerage', 'C.1'],
  ['hsa', 'C.1'], ['cash', 'C.1'], ['plan529', 'C.1'], ['investable', 'C.1'], ['residence', 'C.1'],
  ['totalAssets', 'C.1'], ['mortgage', 'C.1'], ['netWorth', 'C.1'], ['preTaxTotal', 'C.1'],
  ['rothTotal', 'C.1'], ['taxableTotal', 'C.1'], ['brokerageFunds', 'C.2'], ['brokerageFundsBasis', 'C.2'],
  ['esppValue', 'C.2'], ['esppBasis', 'C.2'], ['esppGain', 'C.2'], ['brokerageBasis', 'C.2'],
  ['brokerageGain', 'C.2'], ['brokerageIncome', 'C.2'], ['qualDividends', 'C.2'], ['fundInterest', 'C.2'],
  ['cashInterest', 'C.2'], ['hsaContrib', 'C.2'], ['homeBasis', 'C.2'], ['homePurchase', 'C.2'],
  ['homeImprovements', 'C.2'], ['homeGain', 'C.2'], ['mortgageOriginal', 'C.4'], ['mortgagePayment', 'C.4'],
  ['megW2', 'B.1'], ['davidW2', 'B.2'], ['megDeferral', 'B.1'], ['megMatch', 'B.1'], ['davidMatch', 'B.2'],
  ['megGroupLife', 'B.1'], ['davidGroupLife', 'B.2'], ['megFica2025', 'B.1'], ['davidFica2025', 'B.2'],
  ['wages', 'B.3'], ['employerContribs', 'D.2'], ['householdIncome', 'D.1'], ['payrollSavings', 'D.2'],
  ['hsaEmployee', 'D.2'], ['mortgageAnnual', 'D.3'], ['propertyTax', 'D.3'], ['pcPremiums', 'D.3'],
  ['megTermPremium', 'D.3'], ['emmaSupport', 'A.2'], ['contrib529', 'D.3'], ['travel', 'D.3'],
  ['otherLiving', 'D.3'], ['totalOutflow', 'D.3'], ['afterTaxCash', 'D.4'], ['preTaxDeductions', 'E.3'],
  ['investmentIncome', 'E.3'], ['agi', 'E.3'], ['taxableIncome', 'E.3'], ['fedTax', 'E.3'], ['niit', 'E.3'],
  ['ilTax', 'E.3'], ['payrollTaxes', 'E.3'], ['bracketRoom', 'E.3'], ['itemizedEstimate', 'E.3'],
  ['mortgageInterest', 'E.3'], ['ruthIra', 'A.3'], ['ruthSavings', 'A.3'], ['ruthTotal', 'A.3'],
  ['ruthRmd2026', 'A.3'], ['ruthLoanToTom', 'A.3'], ['ruthIraPriorYear', 'F.6'], ['travelBudget', 'A.6'],
  ['megTermLife', 'H.3'], ['umbrella', 'H.3'], ['deathBenefits', 'H.4'], ['estatePlusInsurance', 'H.4'],
  ['emmaDebt', 'PART J'], ['memoConversion', 'H.1'],
]) {
  const v = F_(key);
  if (typeof v !== 'number') continue;
  fact(key, 'money', [moneyRx(v), v >= 1000000 ? millionsRx(v) : null], { where, near: MONEY_NEAR[key] });
}

/* monthly figures the case states as "$X a month" */
for (const [key, where, near] of [
  ['ruthMonthlyFee', 'A.3', /month|Maple|Ruth|independent living/i],
  ['ruthAssistedBase', 'A.3', /month|assisted|Ruth/i],
  ['ruthSsMonthly', 'A.3', /month|Social Security|Ruth/i],
  ['ruthPensionMonthly', 'A.3', /month|pension|Ruth/i],
  ['megSs62', 'F.2', /month|62|Social Security|Meg/i], ['megSsFra', 'F.2', /month|67|full retirement|PIA|Meg/i],
  ['megSsAt70', 'F.2', /month|70|Social Security|Meg/i], ['davidSs62', 'F.2', /month|62|Social Security|David/i],
  ['davidSsFra', 'F.2', /month|67|full retirement|PIA|David/i], ['davidSsAt70', 'F.2', /month|70|Social Security|David/i],
]) fact(key, 'money', [moneyRx(F_(key))], { where, near });

/* money the lessons may state that CASE.md derives rather than keys */
for (const [label, v, where, expr] of [
  ['bothDeferrals', F.megDeferral + F.davidDeferral, 'D.2', '$32,500 + $32,500'],
  ['brokerageAndCash', F.brokerage + F.cash, 'C.1', '$360,000 + $85,000'],
  ['rothAndTaxable', F.rothTotal + F.taxableTotal, 'C.1', '$195,000 + $445,000'],
]) fact(label, 'money', [moneyRx(v), v >= 1000000 ? millionsRx(v) : null], { value: v, where: `${where} — ${expr}` });

/* rates and percentages the case states */
for (const [key, p, where, near] of [
  ['preTaxPct', F.preTaxPct, 'C.1', /pre-tax|tax-deferred|investable|of what they have/i],
  ['rothPct', F.rothPct, 'C.1', /Roth/i],
  ['taxablePct', F.taxablePct, 'C.1', /taxable/i],
  ['esppPct', F.esppPct, 'C.2', /brokerage|employer|stock|concentrat|account/i],
  ['mortgageRate', F.mortgageRate, 'C.4', /mortgage|fixed|refinanc|rate/i],
  ['mortgageRateShort', 3.1, 'C.4', /mortgage|fixed|refinanc|rate/i],
  ['cashRate', F.cashRate, 'C.2', /cash|money market|yield|interest/i],
  ['ilRate', F.ilRate, 'E.2', /Illinois|flat|state/i],
  ['marginalRate', F.marginalRate, 'E.3', /bracket|marginal|federal/i],
  ['propertyTaxEffective', F.propertyTaxEffective, 'E.2', /property tax|effective|Naperville|DuPage/i],
  ['cola2026', F.cola2026, 'F.2', /COLA|cost-of-living|Social Security/i],
  ['allocEquityFunds', F.allocEquityFunds, 'G.2', /equit|allocation|stocks/i],
  ['allocFixed', F.allocFixed, 'G.2', /fixed income|bond|allocation/i],
  ['allocCash', F.allocCash, 'G.2', /cash|allocation/i],
  ['ipsEquity', F.ipsEquity, 'G.3', /target|IPS|policy|equit|60\/40/i],
  ['megLossTolerance', F.megLossTolerance, 'G.1', /loss|tolerat|Meg|conservative/i],
  ['davidLossTolerance', F.davidLossTolerance, 'G.1', /loss|tolerat|David|aggressive/i],
  ['earlyReduction', 30, 'F.1', /62|early|reduc|Social Security/i],
  ['delayedCredit', 24, 'F.1', /70|delay|credit|Social Security/i],
  ['rmdExciseTax', F.rmdExciseTax, 'F.4', /excise|shortfall|RMD|4974/i],
  ['rmdExciseCorrected', F.rmdExciseCorrected, 'F.4', /excise|corrected|RMD|4974/i],
]) fact(key, 'pct', pctRx(p), { value: p, where, near });

/* proper nouns and entity names */
for (const [key, s, where, near] of [
  ['megName', 'Margaret "Meg" Cole', 'A.1', null],
  ['megNameAlt', 'Margaret Cole', 'A.1', null],
  ['megShort', 'Meg Cole', 'A.1', null],
  ['davidName', 'David Cole', 'A.1', null],
  ['emmaName', 'Emma Cole', 'A.2', null],
  ['emmaShort', 'Emma', 'A.2', /Cole|Ryan|daughter|children|university|graduat|debt/i],
  ['ryanName', 'Ryan Cole', 'A.2', null],
  ['ryanShort', 'Ryan', 'A.2', /Cole|Emma|son|529|college|children/i],
  ['ruthName', 'Ruth Alder', 'A.3', null],
  ['ruthShort', 'Ruth', 'A.3', /Alder|Meg|mother|Maple|Wheaton|power of attorney|POA|assisted|IRA/i],
  ['tomName', 'Tom Alder', 'A.3', null],
  ['tomShort', 'Tom', 'A.3', /Alder|Ruth|brother|loan|guardian|Denver/i],
  ['frankName', 'Frank Alder', 'A.3', null],
  ['dorothyName', 'Dorothy Cole', 'C.3.5', null],
  ['megEmployer', 'Northlake Regional', 'B.1', null],
  ['davidEmployer', 'Dunmore Industrial', 'B.2', null],
  ['davidEmployerShort', 'Dunmore', 'B.2', null],
  ['priorEmployer', 'Halberd Controls', 'C.3.5', null],
  ['ruthCommunity', 'Maple Court', 'A.3', null],
  ['estateCounsel', 'Whitfield Law', 'A.5', null],
  ['taxPreparer', 'Lindqvist', 'A.5', null],
  ['priorAdviser', 'Harlan Beck', 'A.5', null],
  ['residenceTown', 'Naperville', 'A.4', null],
  ['county', 'DuPage', 'A.4', null],
  ['ruthTown', 'Wheaton', 'A.3', null],
  ['domicile', 'Illinois', 'A.4', null],
  ['plan529Name', 'Bright Start', 'C.2', null],
]) fact(key, 'name', wordRx(s), { value: s, where, near });

/* dated documents and events */
for (const [key, s, where, near] of [
  ['megDob', '2 May 1968', 'A.1'], ['davidDob', '9 August 1967', 'A.1'],
  ['emmaDob', '18 March 2005', 'A.2'], ['ryanDob', '27 October 2010', 'A.2'],
  ['ruthDob', '6 February 1943', 'A.3'], ['frankDied', '12 September 2019', 'A.3'],
  ['marriedDate', '14 June 1997', 'A.1'], ['ruthPoaDate', '8 June 2022', 'A.3'],
  ['ruthIraFormDate', '14 April 2020', 'A.3'], ['spdAmended', '1 January 2026', 'B.2', /plan|SPD|amend|conversion|Roth/i],
  ['dorothyDied', '9 March 2021', 'C.3.5'], ['rolloverFormDate', '11 May 2009', 'C.3.5'],
  ['willsDate', '17 May 2011', 'H.1'], ['ipsDate', 'September 2024', 'G.3', /IPS|policy|investment/i],
  ['memoDate', '3 October 2024', 'H.1'], ['mortgageRefi', 'November 2022', 'C.4', /mortgage|refinanc|loan/i],
  ['mortgageMaturity', 'November 2037', 'C.4', /mortgage|matur|loan/i],
  ['asOfDate', '31 December 2026', 'PART C', /as of|balance sheet|statement/i],
  ['davidNewsMonth', 'November 2026', 'PART J', /David|told|division|confiden/i],
]) fact(key, 'date', dateRx(s), { value: s, where, near });

/* counts that are only distinctive in context */
for (const [key, n, where, near] of [
  ['megAge', F.megAge, 'A.1', /Meg|Margaret/i],
  ['davidAge', F.davidAge, 'A.1', /David/i],
  ['emmaAge', F.emmaAge, 'A.2', /Emma/i],
  ['ryanAge', F.ryanAge, 'A.2', /Ryan/i],
  ['ruthAge', F.ruthAge, 'A.3', /Ruth|mother/i],
  ['tomAge', F.tomAge, 'A.3', /Tom/i],
  ['marriedYears', F.marriedYears, 'A.1', /married|marriage/i],
  ['megRetireAge', F.megRetireAge, 'A.1', /Meg.{0,40}retire|retire.{0,40}Meg|stops at|age 60/i],
  ['davidRetireAge', F.davidRetireAge, 'A.1', /David.{0,40}retire|retire.{0,40}David|stops at|age 62/i],
  ['megRiskScore', F.megRiskScore, 'G.1', /score|questionnaire|risk|Meg|of 100/i],
  ['davidRiskScore', F.davidRiskScore, 'G.1', /score|questionnaire|risk|David|of 100/i],
  ['riskGap', F.riskGap, 'G.1', /points apart|gap|score/i],
  ['megApplicableAge', F.megApplicableAge, 'C.3.1', /applicable age|RMD|required minimum|required beginning|age 75/i],
  ['megFirstDistYear', F.megFirstDistYear, 'C.3.1', /distribution|RMD|Meg|window/i],
  ['davidFirstDistYear', F.davidFirstDistYear, 'C.3.3', /distribution|RMD|David|window/i],
  ['megWindowStart', F.megWindowStart, 'F.1', /window|convers|Meg/i],
  ['davidWindowStart', F.davidWindowStart, 'F.1', /window|convers|David/i],
  ['esppShares', F.esppShares, 'C.2', /shares|Dunmore|ESPP/i],
  ['davidEmployees', F.davidEmployees, 'B.2', /employee|workforce|Dunmore/i],
  ['megRetireYear', F.megRetireYear, 'A.1', /Meg.{0,60}(retire|stop|paycheck)|(retire|stop|paycheck).{0,60}Meg/i],
  ['davidRetireYear', F.davidRetireYear, 'A.1', /David.{0,60}(retire|stop|paycheck)|(retire|stop|paycheck).{0,60}David/i],
]) fact(key, key.endsWith('Age') || key === 'marriedYears' ? 'age' : 'count',
        new RegExp(`(?<![0-9,.$*-])(?<![xyXY]:)(?<!="\\s*)${money(n)}(?![0-9])(?!,[0-9])(?!%)`, 'g'),
        { value: n, where, near });

export { facts };

/* ------------------------------------------------------------- guard state -- */

/** verify-migration check 20's pins, transcribed. Kept in step by assertPins(). */
export const CHECK20_PINS = [
  { rx: /The Coles hold (?:<(?:b|strong)>)?\$([0-9,]+)(?:<\/(?:b|strong)>)? in pre-tax accounts/g, key: 'preTaxTotal' },
  { rx: /in pre-tax accounts, (?:<(?:b|strong)>)?([0-9.]+)%(?:<\/(?:b|strong)>)? of what they have/g, key: 'preTaxPct' },
  { rx: /Meg (\d{4}) to \d{4}, David \d{4} to \d{4}\./g, key: 'megWindowStart' },
  { rx: /the 24% bracket has \$([0-9,]+) of room in 2026/g, key: 'bracketRoom' },
  /* Phase 4b (2026-10-12): v5 figures typed into lesson prose; keep in step with verify-migration.mjs */
  { rx: /They hold \$([0-9,]+) of investable assets/g, key: 'investable' },
  { rx: /([0-9.]+)% of it in pre-tax accounts/g, key: 'preTaxPct' },
  { rx: /concentration is computed on the taxable account \(\$([0-9,]+) of \$[0-9,]+\)/g, key: 'esppValue' },
  { rx: /concentration is computed on the taxable account \(\$[0-9,]+ of \$([0-9,]+)\)/g, key: 'brokerage' },
  { rx: /\(2% of \$([0-9,]+)\)/g, key: 'investable' },
  { rx: /Dunmore position at ([0-9.]+)% of the taxable account/g, key: 'esppPct' },
  { rx: /taxable account but ([0-9]+)% of investable assets/g, key: 'allocEspp' },
  { rx: /about \$([0-9,]+) of card debt/g, key: 'emmaDebt' },
  { rx: /credit card debt of about \$([0-9,]+)/g, key: 'emmaDebt' },
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
