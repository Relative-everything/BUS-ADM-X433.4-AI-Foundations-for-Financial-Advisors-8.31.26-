#!/usr/bin/env node
/**
 * build-case.mjs — CASE.md (v5.0, the Cole household) -> the generated artifacts.
 *
 *   scripts/case-facts.json      every keyed figure, captured from CASE.md by
 *                                table row and label, never typed here
 *   scripts/case-corpus.json     Part O: the ten retrieval chunks and the
 *                                meeting excerpt session-3 reads
 *   scripts/case-extract.html    the one-screen Facts tab the lessons inject
 *   scripts/case-flowchart.html  Part L: the household map and the timeline,
 *                                scoped under .cole-flow
 *
 * Every figure is CAPTURED TEXT. A row or label this script looks for that has
 * moved makes it die() loudly, so a CASE.md edit cannot silently orphan a
 * lesson. Part M's identities are recomputed from the captured figures and
 * asserted against the figures CASE.md states.
 *
 * v5.0 (next-term-2027, Phase 3) replaced the v4 regex-per-figure capture with
 * a table-row capture: `cell(section, rowLabel, column)` reads the Nth cell of
 * the row whose first cell starts with the label. The v4 script and its v4
 * figure set are at tag fall-2026-final.
 *
 *   node scripts/build-case.mjs
 *   CASE_PATH=docs/next-term/CASE-v5-draft.md node scripts/build-case.mjs   # a draft
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const CASE_PATH = process.env.CASE_PATH ? join(REPO, process.env.CASE_PATH) : join(REPO, 'CASE.md');
const CASE = readFileSync(CASE_PATH, 'utf8');

/* ---------- header ------------------------------------------------------ */
const yaml = CASE.match(/```yaml\n([\s\S]*?)\n```/);
if (!yaml) die('CASE.md has no yaml header block');
const meta = {};
for (const line of yaml[1].split('\n')) {
  const m = line.match(/^(\w+):\s*(.*)$/);
  if (m) meta[m[1]] = m[2].replace(/^"|"$/g, '');
}
for (const k of ['case_id', 'case_version', 'sentinel_open', 'sentinel_close', 'as_of_date']) {
  if (!meta[k]) die(`CASE.md header lacks ${k}`);
}

/* ---------- section index ----------------------------------------------- */
const sections = {};
{
  let key = null;
  for (const line of CASE.split('\n')) {
    const part = line.match(/^# PART ([A-O]) —/);
    const sec  = line.match(/^#{2,4} ([A-O]\.\d+(?:\.\d+)?)\b/);
    if (part) key = 'PART ' + part[1];
    else if (sec) key = sec[1];
    if (key) sections[key] = (sections[key] || '') + line + '\n';
  }
}
const problems = [];
function die(msg) {
  if (process.env.CASE_DEBUG) { problems.push(msg); return '0'; }
  console.error('FAIL  ' + msg); process.exit(1);
}
const sec = (k) => { if (sections[k] === undefined) die(`CASE.md has no section ${k}`); return sections[k]; };

/* ---------- capture helpers -------------------------------------------- */
const num   = (s) => (s === null || s === undefined ? null : Number(String(s).replace(/[$,%\s*]/g, '')));
const strip = (s) => s.replace(/\*\*/g, '').trim();
/** The cells of the first table row in `section` whose first cell starts with `label`. */
function row(section, label) {
  const body = sec(section);
  const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rx = new RegExp(`^\\|\\s*\\**${esc}[^|]*\\|(.*)$`, 'm');
  const m = body.match(rx);
  if (!m) die(`${section}: no table row labelled "${label}"`);
  return m[1].split('|').map(strip);
}
/** The Nth cell (1-based, after the label) of that row. */
const cell = (section, label, n = 1) => row(section, label)[n - 1];
/** The first $amount in a string, as a number. */
function moneyIn(s, name) {
  const m = String(s).match(/\$\s*([0-9][0-9,]*(?:\.\d+)?)/);
  if (!m) return num(die(`${name}: no dollar figure in "${String(s).slice(0, 80)}"`));
  return num(m[1]);
}
function pctIn(s, name) {
  const m = String(s).match(/([0-9]+(?:\.[0-9]+)?)\s*%/);
  if (!m) return Number(die(`${name}: no percentage in "${String(s).slice(0, 80)}"`));
  return Number(m[1]);
}
function intIn(s, name) {
  const m = String(s).match(/(?<![\d.])(\d[\d,]*)(?![\d%])/);
  if (!m) return num(die(`${name}: no integer in "${String(s).slice(0, 80)}"`));
  return num(m[1]);
}
/** A regex capture against a string that must match. */
function mm(s, re, name) { const m = String(s).match(re); if (!m) return die(`${name}: pattern not found in "${String(s).slice(0, 90)}"`); return m[1]; }
/** A regex capture against a section, for the few facts that live in prose. */
function grab(section, re, name) {
  const m = sec(section).match(re);
  if (!m) return die(`${section}: pattern for ${name} not found`);
  return m[1];
}

const F = {};

/* A — family */
F.megName       = 'Margaret "Meg" Cole';
F.megShort      = 'Meg Cole';
F.davidName     = 'David Cole';
F.megDob        = cell('A.1', 'Date of birth', 1);
F.davidDob      = cell('A.1', 'Date of birth', 2);
F.megAge        = intIn(cell('A.1', 'Age at', 1), 'megAge');
F.davidAge      = intIn(cell('A.1', 'Age at', 2), 'davidAge');
F.megRole       = cell('A.1', 'Occupation', 1).split(',')[0];
F.davidRole     = cell('A.1', 'Occupation', 2).split(',')[0];
F.megEmployer   = grab('A.1', /Nurse manager, [^,]+, ([A-Z][A-Za-z ]+?) \(a synthetic hospital system\)/, 'megEmployer');
F.davidEmployer = grab('A.1', /Senior mechanical engineer, ([A-Z][A-Za-z ]+, Inc\.) \(a synthetic/, 'davidEmployer');
F.megRetireAge  = intIn(cell('A.1', 'Planned retirement', 1), 'megRetireAge');
F.davidRetireAge= intIn(cell('A.1', 'Planned retirement', 2), 'davidRetireAge');
F.megRetireYear = intIn(cell('A.1', 'Planned retirement', 1).replace(/Age \d+, /, ''), 'megRetireYear');
F.davidRetireYear = intIn(cell('A.1', 'Planned retirement', 2).replace(/Age \d+, /, ''), 'davidRetireYear');
F.marriedDate   = grab('A.1', /Married \*\*(\d+ \w+ \d{4})\*\*/, 'marriedDate');
F.marriedYears  = num(grab('A.1', /\*\*, (\d+) years as of the as-of date/, 'marriedYears'));
F.emmaDob       = cell('A.2', 'Date of birth', 1);
F.ryanDob       = cell('A.2', 'Date of birth', 2);
F.emmaAge       = intIn(cell('A.2', 'Age', 1), 'emmaAge');
F.ryanAge       = intIn(cell('A.2', 'Age', 2), 'ryanAge');
F.emmaSupport   = moneyIn(cell('A.2', 'Support', 1), 'emmaSupport');
F.ruthName      = grab('A.3', /\*\*(Ruth Alder)\*\*, Meg's mother/, 'ruthName');
F.ruthDob       = grab('A.3', /Born \*\*(\d+ \w+ \d{4})\*\*/, 'ruthDob');
F.ruthAge       = num(grab('A.3', /\*\*, age (\d+)\. Widow/, 'ruthAge'));
F.frankName     = grab('A.3', /Widow of \*\*(Frank Alder)\*\*/, 'frankName');
F.frankDied     = grab('A.3', /who died \*\*(\d+ \w+ \d{4})\*\*/, 'frankDied');
F.ruthCommunity = grab('A.3', /apartment at \*\*(Maple Court Senior Living), Wheaton/, 'ruthCommunity');
F.ruthTown      = 'Wheaton';
F.ruthMovedIn   = grab('A.3', /since \*\*(\w+ \d{4})\*\*/, 'ruthMovedIn');
F.ruthMonthlyFee= moneyIn(grab('A.3', /Monthly fee \*\*(\$[0-9,]+)\*\*/, 'ruthMonthlyFee'), 'ruthMonthlyFee');
F.ruthAssistedBase = moneyIn(grab('A.3', /base rate of \*\*(\$[0-9,]+) a month\*\*/, 'ruthAssistedBase'), 'ruthAssistedBase');
F.ruthIra       = moneyIn(grab('A.3', /traditional IRA of about \*\*(\$[0-9,]+)\*\*/, 'ruthIra'), 'ruthIra');
F.ruthSavings   = moneyIn(grab('A.3', /about \*\*(\$[0-9,]+)\*\* in savings and certificates/, 'ruthSavings'), 'ruthSavings');
F.ruthTotal     = moneyIn(grab('A.3', /Total about \*\*(\$[0-9,]+)\*\*/, 'ruthTotal'), 'ruthTotal');
F.ruthSsMonthly = moneyIn(grab('A.3', /survivor benefit \*\*(\$[0-9,]+) a month\*\*/, 'ruthSsMonthly'), 'ruthSsMonthly');
F.ruthPensionMonthly = moneyIn(grab('A.3', /municipal pension \*\*(\$[0-9,]+) a month\*\*/, 'ruthPensionMonthly'), 'ruthPensionMonthly');
F.ruthRmd2026   = moneyIn(grab('A.3', /required minimum distribution, \*\*(\$[0-9,]+)\*\*/, 'ruthRmd2026'), 'ruthRmd2026');
F.ruthLoanToTom = moneyIn(grab('A.3', /Ruth lent Tom \*\*(\$[0-9,]+)\*\*/, 'ruthLoanToTom'), 'ruthLoanToTom');
F.ruthPoaDate   = grab('A.3', /property\*\* \(executed (\d+ \w+ \d{4})\)/, 'ruthPoaDate');
F.ruthIraFormDate = grab('A.3', /designation dated (\d+ \w+ \d{4}); Tom/, 'ruthIraFormDate');
F.tomName       = grab('A.3', /brother \*\*(Tom Alder)\*\*, (\d+)/, 'tomName');
F.tomAge        = num(grab('A.3', /brother \*\*Tom Alder\*\*, (\d+), lives in/, 'tomAge'));
F.residenceTown = 'Naperville';
F.county        = 'DuPage';
F.domicile      = grab('A.4', /\*\*(Illinois), lifelong/, 'domicile');
F.ilExclusion   = moneyIn(grab('A.4', /above a \*\*(\$[0-9,]+)\*\* exclusion/, 'ilExclusion'), 'ilExclusion');
F.plannerEngaged= grab('A.5', /\| (January 2026) intake;/, 'plannerEngaged');
F.priorAdviser  = grab('A.5', /\| Prior adviser \| (Harlan Beck),/, 'priorAdviser');
F.estateCounsel = grab('A.5', /\| Estate counsel \| (Whitfield Law Group), Naperville/, 'estateCounsel');
F.taxPreparer   = grab('A.5', /\| Tax preparer \| (Lindqvist Tax Associates), Naperville/, 'taxPreparer');
F.travelBudget  = moneyIn(grab('A.6', /about \*\*(\$[0-9,]+) a year\*\* for travel/, 'travelBudget'), 'travelBudget');

/* B — employment */
F.megW2         = moneyIn(cell('B.1', 'W-2 wages, 2026'), 'megW2');
F.davidW2       = moneyIn(cell('B.2', 'W-2 wages, 2026'), 'davidW2');
F.deferralLimit = moneyIn(cell('B.1', '2026 elective deferral'), 'deferralLimit');
F.catchUp       = moneyIn(cell('B.1', '2026 elective deferral').split('catch-up of')[1], 'catchUp');
F.megDeferral   = moneyIn(cell('B.1', '2026 elective deferral').split('total')[1], 'megDeferral');
F.davidDeferral = moneyIn(cell('B.2', '2026 elective deferral').split('total')[1], 'davidDeferral');
F.megMatch      = moneyIn(cell('B.1', 'Employer contribution'), 'megMatch');
F.davidMatch    = moneyIn(cell('B.2', 'Employer contribution'), 'davidMatch');
F.megGroupLife  = moneyIn(cell('B.1', 'Group benefits'), 'megGroupLife');
F.davidGroupLife= moneyIn(cell('B.2', 'Group benefits'), 'davidGroupLife');
F.megFica2025   = moneyIn(cell('B.1', '2025 FICA wages'), 'megFica2025');
F.davidFica2025 = moneyIn(cell('B.2', '2025 FICA wages'), 'davidFica2025');
F.spdAmended    = grab('B.2', /amended \*\*(\d+ \w+ \d{4})\*\*/, 'spdAmended');
F.davidEmployees= intIn(mm(cell('B.2', 'Employer'), /about ([\d,]+) employees/, 'cell'), 'davidEmployees');
F.wages         = moneyIn(cell('B.3', 'Total wages'), 'wages');
F.employerContribs = moneyIn(cell('D.2', 'Employer retirement contributions'), 'employerContribs');

/* C — balance sheet */
F.meg403b       = moneyIn(cell('C.1', '403(b)', 3), 'meg403b');
F.megRoth       = moneyIn(row('C.1', 'Roth IRA')[2], 'megRoth');
F.david401k     = moneyIn(cell('C.1', '401(k)', 3), 'david401k');
F.david401kPre  = moneyIn(cell('C.1', '401(k)', 2), 'david401kPre');
F.david401kRoth = moneyIn(cell('C.1', '401(k)', 2).split('Roth')[1], 'david401kRoth');
{ /* the second Roth IRA row is David's */
  const rows = sec('C.1').split('\n').filter((l) => /^\|\s*Roth IRA/.test(l));
  if (rows.length !== 2) die('C.1: expected two Roth IRA rows');
  F.davidRoth = moneyIn(rows[1].split('|')[4], 'davidRoth');
}
F.davidRollover = moneyIn(cell('C.1', 'Rollover traditional IRA', 3), 'davidRollover');
F.brokerage     = moneyIn(cell('C.1', 'Taxable brokerage account', 3), 'brokerage');
F.hsa           = moneyIn(cell('C.1', 'Health savings account', 3), 'hsa');
F.cash          = moneyIn(cell('C.1', 'Cash reserve', 3), 'cash');
F.plan529       = moneyIn(cell('C.1', '529 plan', 3), 'plan529');
F.investable    = moneyIn(cell('C.1', 'Investable total', 3), 'investable');
F.residence     = moneyIn(cell('C.1', 'Residence, Naperville', 3), 'residence');
F.totalAssets   = moneyIn(cell('C.1', 'Total assets', 3), 'totalAssets');
F.mortgage      = moneyIn(cell('C.1', 'Mortgage', 3), 'mortgage');
F.netWorth      = moneyIn(cell('C.1', 'Net worth', 3), 'netWorth');
{
  const bt = grab('C.1', /\*\*By tax character \(investable assets\)\.\*\* ([^\n]+)/, 'byTaxCharacter');
  F.preTaxTotal  = moneyIn(mm(bt, /Pre-tax \(tax-deferred\) \*\*(\$[0-9,]+)\*\*/, 'byTaxCharacter'), 'preTaxTotal');
  F.preTaxPct    = pctIn(mm(bt, /Pre-tax \(tax-deferred\) \*\*\$[0-9,]+\*\*, ([0-9.]+%)/, 'byTaxCharacter'), 'preTaxPct');
  F.rothTotal    = moneyIn(mm(bt, /Roth \*\*(\$[0-9,]+)\*\*/, 'byTaxCharacter'), 'rothTotal');
  F.rothPct      = pctIn(mm(bt, /Roth \*\*\$[0-9,]+\*\*, ([0-9.]+%)/, 'byTaxCharacter'), 'rothPct');
  F.taxableTotal = moneyIn(mm(bt, /Taxable \*\*(\$[0-9,]+)\*\*/, 'byTaxCharacter'), 'taxableTotal');
  F.taxablePct   = pctIn(mm(bt, /Taxable \*\*\$[0-9,]+\*\*, ([0-9.]+%)/, 'byTaxCharacter'), 'taxablePct');
}
F.brokerageFunds      = moneyIn(cell('C.2', 'Brokerage, diversified index funds', 1), 'brokerageFunds');
F.brokerageFundsBasis = moneyIn(cell('C.2', 'Brokerage, diversified index funds', 2), 'brokerageFundsBasis');
F.esppValue     = moneyIn(cell('C.2', 'Brokerage, Dunmore', 1), 'esppValue');
F.esppBasis     = moneyIn(cell('C.2', 'Brokerage, Dunmore', 2), 'esppBasis');
F.esppShares    = intIn(grab('C.2', /common stock, ([0-9,]+) shares/, 'esppShares'), 'esppShares');
F.esppPrice     = Number(grab('C.2', /\$([0-9.]+) a share at the as-of date/, 'esppPrice'));
F.esppCost      = Number(grab('C.2', /average of \$([0-9.]+) a share/, 'esppCost'));
F.esppPct       = pctIn(grab('C.2', /\*\*([0-9.]+% of the account)\*\*/, 'esppPct'), 'esppPct');
F.esppGain      = moneyIn(grab('C.2', /embedded gain (\$[0-9,]+)/, 'esppGain'), 'esppGain');
F.brokerageBasis= moneyIn(cell('C.2', 'Brokerage, total', 2), 'brokerageBasis');
F.brokerageGain = moneyIn(grab('C.2', /Unrealized gain (\$[0-9,]+)/, 'brokerageGain'), 'brokerageGain');
F.brokerageIncome = moneyIn(grab('C.2', /2026 income (\$[0-9,]+)/, 'brokerageIncome'), 'brokerageIncome');
F.qualDividends = moneyIn(grab('C.2', /qualified dividends (\$[0-9,]+)/, 'qualDividends'), 'qualDividends');
F.fundInterest  = moneyIn(grab('C.2', /interest (\$[0-9,]+)\)/, 'fundInterest'), 'fundInterest');
F.cashRate      = pctIn(grab('C.2', /at about ([0-9.]+%)/, 'cashRate'), 'cashRate');
F.cashInterest  = moneyIn(grab('C.2', /2026 interest (\$[0-9,]+)/, 'cashInterest'), 'cashInterest');
F.hsaContrib    = moneyIn(grab('C.2', /2026 contributions (\$[0-9,]+)/, 'hsaContrib'), 'hsaContrib');
F.contrib529Monthly = moneyIn(grab('C.2', /Contributions (\$[0-9,]+) a month/, 'contrib529Monthly'), 'contrib529Monthly');
F.homeBasis     = moneyIn(cell('C.2', 'Residence', 2), 'homeBasis');
F.homePurchase  = moneyIn(grab('C.2', /Purchased 2009 for (\$[0-9,]+)/, 'homePurchase'), 'homePurchase');
F.homeImprovements = moneyIn(grab('C.2', /(\$[0-9,]+) of capital improvements/, 'homeImprovements'), 'homeImprovements');
F.homeGain      = moneyIn(grab('C.2', /gain if sold (\$[0-9,]+)/, 'homeGain'), 'homeGain');
F.megApplicableAge = num(grab('C.3.1', /applicable age is \*\*(\d+)\*\*/, 'megApplicableAge'));
F.megFirstDistYear = num(grab('C.3.1', /first distribution year \*\*(\d{4})\*\*/, 'megFirstDistYear'));
F.megRbd        = grab('C.3.1', /required beginning date \*\*(\d+ \w+ \d{4})\*\*/, 'megRbd');
F.davidApplicableAge = num(grab('C.3.3', /applicable age is \*\*(\d+)\*\*/, 'davidApplicableAge'));
F.davidFirstDistYear = num(grab('C.3.3', /first distribution year \*\*(\d{4})\*\*/, 'davidFirstDistYear'));
F.davidRbd      = grab('C.3.3', /required beginning date \*\*(\d+ \w+ \d{4})\*\*/, 'davidRbd');
F.roth401kStart = grab('C.3.3', /clock runs from (\d+ \w+ \d{4})/, 'roth401kStart');
F.dorothyName   = grab('C.3.5', /names (Dorothy Cole), David's mother/, 'dorothyName');
F.dorothyDied   = grab('C.3.5', /Dorothy Cole died \*\*(\d+ \w+ \d{4})\*\*/, 'dorothyDied');
F.rolloverFormDate = grab('C.3.5', /designation on file, dated (\d+ \w+ \d{4})/, 'rolloverFormDate');
F.priorEmployer = grab('C.3.5', /prior employer, (Halberd Controls) \(synthetic\)/, 'priorEmployer');
F.mortgageOriginal = moneyIn(grab('C.4', /Refinanced \*\*\w+ \d{4}\*\*: (\$[0-9,]+), 15-year/, 'mortgageOriginal'), 'mortgageOriginal');
F.mortgageRefi  = grab('C.4', /Refinanced \*\*(\w+ \d{4})\*\*/, 'mortgageRefi');
F.mortgageRate  = Number(grab('C.4', /fixed at \*\*([0-9.]+)%\*\*/, 'mortgageRate'));
F.mortgagePayment = moneyIn(grab('C.4', /principal and interest \*\*(\$[0-9,]+) a month\*\*/, 'mortgagePayment'), 'mortgagePayment');
F.mortgageMaturity = grab('C.4', /matures \*\*(\w+ \d{4})\*\*/, 'mortgageMaturity');
F.mortgageTermMonths = 180;
F.mortgagePaymentsMade = 49;

/* D — cash flow */
F.householdIncome = moneyIn(cell('D.1', 'Household total'), 'householdIncome');
F.payrollSavings  = moneyIn(cell('D.2', 'Household retirement and HSA savings'), 'payrollSavings');
F.hsaEmployee     = moneyIn(cell('D.2', 'David HSA, employee share'), 'hsaEmployee');
F.mortgageAnnual  = moneyIn(cell('D.3', 'Mortgage principal and interest'), 'mortgageAnnual');
F.propertyTax     = moneyIn(cell('D.3', 'Property tax'), 'propertyTax');
F.pcPremiums      = moneyIn(cell('D.3', 'Homeowners, auto'), 'pcPremiums');
F.megTermPremium  = moneyIn(cell('D.3', "Meg's term life premium"), 'megTermPremium');
F.contrib529      = moneyIn(cell('D.3', 'Ryan: 529 contributions'), 'contrib529');
F.travel          = moneyIn(cell('D.3', 'Travel'), 'travel');
F.otherLiving     = moneyIn(cell('D.3', 'Everything else'), 'otherLiving');
F.totalOutflow    = moneyIn(cell('D.3', 'Total non-tax outflow'), 'totalOutflow');
F.afterTaxCash    = moneyIn(grab('D.4', /leaves \*\*(\$[0-9,]+)\*\*, against/, 'afterTaxCash'), 'afterTaxCash');

/* E — tax */
{
  const br = cell('E.1', 'Ordinary income brackets');
  const m = br.match(/10% to \$([0-9,]+); 12% to \$([0-9,]+); 22% to \$([0-9,]+); 24% to \$([0-9,]+); 32% to \$([0-9,]+); 35% to \$([0-9,]+)/);
  if (!m) die('E.1: bracket row does not parse');
  [F.bracket10, F.bracket12, F.bracket22, F.bracket24, F.bracket32, F.bracket35] = m.slice(1).map(num);
}
F.stdDeduction  = moneyIn(cell('E.1', 'Standard deduction, MFJ'), 'stdDeduction');
F.seniorDeduction = moneyIn(cell('E.1', 'Enhanced deduction for seniors'), 'seniorDeduction');
F.ltcg0         = moneyIn(cell('E.1', 'Long-term capital gain'), 'ltcg0');
F.ltcg15        = moneyIn(cell('E.1', 'Long-term capital gain').split('15% to')[1], 'ltcg15');
F.niitThreshold = moneyIn(cell('E.1', 'Net investment income tax'), 'niitThreshold');
F.saltCap       = moneyIn(cell('E.1', 'State and local tax deduction cap'), 'saltCap');
F.superCatchUp  = moneyIn(cell('E.1', '401(k) and 403(b) elective deferral limit').split('ages 60 to 63 catch-up')[1], 'superCatchUp');
F.rothCatchupThreshold = moneyIn(cell('E.1', 'Roth-only catch-up'), 'rothCatchupThreshold');
F.sec415c       = moneyIn(cell('E.1', 'Defined-contribution annual additions limit'), 'sec415c');
F.iraLimit      = moneyIn(cell('E.1', 'IRA contribution limit'), 'iraLimit');
F.iraCatchUp    = moneyIn(cell('E.1', 'IRA contribution limit').split('catch-up')[1], 'iraCatchUp');
F.rothPhaseoutLo= moneyIn(cell('E.1', 'Roth IRA contribution phase-out'), 'rothPhaseoutLo');
F.rothPhaseoutHi= moneyIn(cell('E.1', 'Roth IRA contribution phase-out').split(' to ')[1], 'rothPhaseoutHi');
F.hsaFamilyLimit= moneyIn(cell('E.1', 'Health savings account'), 'hsaFamilyLimit');
F.hsaCatchUp    = moneyIn(cell('E.1', 'HSA age-55 catch-up'), 'hsaCatchUp');
F.aotcLo        = moneyIn(cell('E.1', 'American opportunity tax credit').split('between MAGI')[1], 'aotcLo');
F.aotcHi        = moneyIn(cell('E.1', 'American opportunity tax credit').split(' and ')[1], 'aotcHi');
F.section121    = moneyIn(cell('E.1', 'Exclusion of gain on a principal residence'), 'section121');
F.annualExclusion = moneyIn(cell('E.1', 'Annual gift tax exclusion'), 'annualExclusion');
F.fedExclusion  = moneyIn(cell('E.1', 'Federal estate and gift basic exclusion amount'), 'fedExclusion');
F.ssTaxBase1    = moneyIn(cell('E.1', 'Social Security benefit taxation'), 'ssTaxBase1');
F.ssTaxBase2    = moneyIn(cell('E.1', 'Social Security benefit taxation').split('85% above')[1], 'ssTaxBase2');
F.ltcLimit5060  = moneyIn(cell('E.1', 'Eligible long-term care premium limits'), 'ltcLimit5060');
F.ltcLimit6070  = moneyIn(cell('E.1', 'Eligible long-term care premium limits').split('over 60 through 70:')[1], 'ltcLimit6070');
F.ssWageBase    = moneyIn(cell('E.1', 'Payroll taxes'), 'ssWageBase');
F.addlMedicareThreshold = moneyIn(cell('E.1', 'Payroll taxes').split('above')[1], 'addlMedicareThreshold');
F.ilRate        = pctIn(cell('E.2', 'Individual income tax rate'), 'ilRate');
F.ilExemption   = moneyIn(cell('E.2', 'Exemption allowance'), 'ilExemption');
F.il529Cap      = moneyIn(cell('E.2', '529 subtraction'), 'il529Cap');
F.propertyTaxRateLo = pctIn(cell('E.2', 'Property tax, DuPage County'), 'propertyTaxRateLo');
F.propertyTaxRateHi = pctIn(cell('E.2', 'Property tax, DuPage County').split(' to ')[1], 'propertyTaxRateHi');
F.propertyTaxEffective = pctIn(cell('E.2', 'Property tax, DuPage County').split(' is ').pop(), 'propertyTaxEffective');
F.preTaxDeductions = moneyIn(cell('E.3', 'Less pre-tax deferrals and HSA'), 'preTaxDeductions');
F.investmentIncome = moneyIn(cell('E.3', 'Plus investment income'), 'investmentIncome');
F.agi           = moneyIn(cell('E.3', 'Adjusted gross income'), 'agi');
F.itemizedEstimate = moneyIn(mm(cell('E.3', 'Standard deduction', 2), /about (\$[0-9,]+) \(property/, 'cell'), 'itemizedEstimate');
F.mortgageInterest = moneyIn(mm(cell('E.3', 'Standard deduction', 2), /mortgage interest about (\$[0-9,]+)/, 'cell'), 'mortgageInterest');
F.taxableIncome = moneyIn(cell('E.3', 'Taxable income'), 'taxableIncome');
F.fedTax        = moneyIn(cell('E.3', 'Federal income tax'), 'fedTax');
F.marginalRate  = pctIn(mm(cell('E.3', 'Federal income tax', 2), /Marginal rate (\d+%)/, 'cell'), 'marginalRate');
F.bracketRoom   = moneyIn(mm(cell('E.3', 'Federal income tax', 2), /has (\$[0-9,]+) of room/, 'cell'), 'bracketRoom');
F.ilTax         = moneyIn(cell('E.3', 'Illinois income tax'), 'ilTax');
F.payrollTaxes  = moneyIn(cell('E.3', 'Payroll taxes'), 'payrollTaxes');
F.niit          = moneyIn(cell('E.3', 'Net investment income tax', 1), 'niit');

/* F — clocks and Social Security */
F.megAge59h     = cell('F.1', 'Age 59½', 1);
F.davidAge59h   = cell('F.1', 'Age 59½', 2);
F.megSsEarliest = cell('F.1', 'Social Security, earliest', 1);
F.davidSsEarliest = cell('F.1', 'Social Security, earliest', 2);
F.megFra        = cell('F.1', 'Full retirement age', 1);
F.davidFra      = cell('F.1', 'Full retirement age', 2);
F.megSs70       = cell('F.1', 'Delayed credits end', 1);
F.davidSs70     = cell('F.1', 'Delayed credits end', 2);
F.megMedicare   = cell('F.1', 'Medicare eligibility', 1);
F.davidMedicare = cell('F.1', 'Medicare eligibility', 2);
F.megIrmaaLookback = intIn(cell('F.1', 'First IRMAA year looks back to', 1), 'megIrmaaLookback');
F.davidIrmaaLookback = intIn(cell('F.1', 'First IRMAA year looks back to', 2), 'davidIrmaaLookback');
F.fra           = 67;
F.earlyReduction= 30;
F.delayedCredit = 24;
{
  const w = row('F.1', 'Roth conversion window');
  const m1 = w[0].match(/(\d{4}) to (\d{4}), (\d+) years/), m2 = w[1].match(/(\d{4}) to (\d{4}), (\d+) years/);
  if (!m1 || !m2) die('F.1: conversion window row does not parse');
  F.megWindowStart = num(m1[1]); F.megWindowEnd = num(m1[2]); F.megWindowYears = num(m1[3]);
  F.davidWindowStart = num(m2[1]); F.davidWindowEnd = num(m2[2]); F.davidWindowYears = num(m2[3]);
}
F.megSs62       = moneyIn(cell('F.2', 'Benefit at 62', 1), 'megSs62');
F.davidSs62     = moneyIn(cell('F.2', 'Benefit at 62', 2), 'davidSs62');
F.megSsFra      = moneyIn(cell('F.2', 'Benefit at full retirement age', 1), 'megSsFra');
F.davidSsFra    = moneyIn(cell('F.2', 'Benefit at full retirement age', 2), 'davidSsFra');
F.megSsAt70     = moneyIn(cell('F.2', 'Benefit at 70', 1), 'megSsAt70');
F.davidSsAt70   = moneyIn(cell('F.2', 'Benefit at 70', 2), 'davidSsAt70');
F.cola2026      = pctIn(cell('F.2', '2026 cost-of-living adjustment'), 'cola2026');
F.earningsTestUnder = moneyIn(cell('F.2', '2026 retirement earnings test'), 'earningsTestUnder');
F.earningsTestFraYear = moneyIn(cell('F.2', '2026 retirement earnings test').split(';')[1], 'earningsTestFraYear');
F.partBPremium  = Number(grab('F.3', /\*\*\$([0-9.]+)\*\* a month; \$/, 'partBPremium'));
F.partBDeductible = moneyIn(cell('F.3', 'Part B standard premium').split('; ')[1], 'partBDeductible');
F.partDBase     = Number(grab('F.3', /\| \$([0-9.]+); \$[0-9,]+; \*\*\$[0-9,]+\*\* \|/, 'partDBase'));
F.partDDeductible = moneyIn(cell('F.3', 'Part D base beneficiary premium').split('; ')[1], 'partDDeductible');
F.partDCap      = moneyIn(cell('F.3', 'Part D base beneficiary premium').split('; ')[2], 'partDCap');
{
  const t = cell('F.3', 'IRMAA tiers');
  const th = [...t.matchAll(/\$([0-9,]+)/g)].map((m) => num(m[1]));
  /* the first dollar figure is the first threshold, then premium / add-on pairs */
  F.irmaaTier1 = th[0];
  const m = t.match(/to \$([0-9,]+): \$[0-9.]+ \/ \$[0-9.]+ · to \$([0-9,]+): .*? · to \$([0-9,]+): .*? · to under \$([0-9,]+): .*? · \$([0-9,]+) and over/);
  if (!m) die('F.3: IRMAA tier row does not parse');
  [F.irmaaTier2, F.irmaaTier3, F.irmaaTier4, F.irmaaTier5, F.irmaaTier6] = m.slice(1).map(num);
  F.irmaaTier2PartB = Number(mm(t, /to \$[0-9,]+: \$([0-9.]+) \//, 'irmaaTier2PartB'));
}
F.rmdExciseTax  = pctIn(grab('F.4', /shortfall is (\d+%)/, 'rmdExciseTax'), 'rmdExciseTax');
F.rmdExciseCorrected = pctIn(grab('F.4', /reduced to (\d+%) if corrected/, 'rmdExciseCorrected'), 'rmdExciseCorrected');
F.ruthIraPriorYear = moneyIn(grab('F.6', /\((\$[0-9,]+) at 31 December 2025/, 'ruthIraPriorYear'), 'ruthIraPriorYear');
F.ruthRmdFactor = Number(grab('F.6', /factor ([0-9.]+) at age/, 'ruthRmdFactor'));

/* G — risk */
F.megRiskScore  = intIn(cell('G.1', 'Score', 1), 'megRiskScore');
F.davidRiskScore= intIn(cell('G.1', 'Score', 2), 'davidRiskScore');
F.megRiskBand   = cell('G.1', 'Band', 1).split(' (')[0];
F.davidRiskBand = cell('G.1', 'Band', 2).split(' (')[0];
F.megLossTolerance = pctIn(cell('G.1', 'Largest one-year loss', 1), 'megLossTolerance');
F.davidLossTolerance = pctIn(cell('G.1', 'Largest one-year loss', 2), 'davidLossTolerance');
F.riskGap       = num(grab('G.1', /sit \*\*(\d+) points apart\*\*/, 'riskGap'));
F.allocEquityFunds = pctIn(cell('G.2', 'Equities, diversified funds'), 'allocEquityFunds');
F.allocEspp     = pctIn(cell('G.2', 'Equities, Dunmore'), 'allocEspp');
F.allocFixed    = pctIn(cell('G.2', 'Fixed income'), 'allocFixed');
F.allocCash     = pctIn(cell('G.2', 'Cash and money market'), 'allocCash');
F.ipsEquity     = pctIn(grab('G.3', /Target \*\*(\d+%) equities/, 'ipsEquity'), 'ipsEquity');
F.ipsFixed      = pctIn(grab('G.3', /\/ (\d+%) fixed income/, 'ipsFixed'), 'ipsFixed');
F.ipsMaxPosition= pctIn(grab('G.3', /no single position above (\d+%)/, 'ipsMaxPosition'), 'ipsMaxPosition');
F.ipsDate       = grab('G.3', /Investment policy statement \((\w+ \d{4}), prior adviser\)/, 'ipsDate');

/* H — estate and insurance */
F.willsDate     = cell('H.1', 'H.1.1', 2);
F.guardian      = grab('H.1', /\*\*Guardian of minor children: (Tom Alder)\*\*/, 'guardian');
F.memoDate      = cell('H.1', 'H.1.8', 2);
F.memoConversion= moneyIn(cell('H.1', 'H.1.8', 4), 'memoConversion');
F.megTermLife   = moneyIn(cell('H.3', 'Individual 20-year level term', 2), 'megTermLife');
F.megTermEnds   = intIn(mm(cell('H.3', 'Individual 20-year level term', 3), /level term ends (\d{4})/, 'cell'), 'megTermEnds');
F.megTermIssued = intIn(mm(cell('H.3', 'Individual 20-year level term', 3), /Issued (\d{4})/, 'cell'), 'megTermIssued');
F.umbrella      = moneyIn(cell('H.3', 'Property and casualty', 3), 'umbrella');
F.deathBenefits = moneyIn(grab('H.4', /death benefits of (\$[0-9,]+)/, 'deathBenefits'), 'deathBenefits');
F.estatePlusInsurance = moneyIn(grab('H.4', /today is \*\*(\$[0-9,]+)\*\*/, 'estatePlusInsurance'), 'estatePlusInsurance');

/* J — landmines */
F.emmaDebt      = moneyIn(grab('PART J', /carries about \*\*(\$[0-9,]+)\*\* of credit-card debt/, 'emmaDebt'), 'emmaDebt');
F.davidNewsMonth= grab('PART J', /In (\w+ \d{4}) David was told/, 'davidNewsMonth');

/* derived, then asserted against Part M */
const pay = F.mortgageOriginal * (F.mortgageRate / 1200) / (1 - Math.pow(1 + F.mortgageRate / 1200, -F.mortgageTermMonths));
const r = F.mortgageRate / 1200, k = F.mortgagePaymentsMade;
const bal = F.mortgageOriginal * Math.pow(1 + r, k) - pay * (Math.pow(1 + r, k) - 1) / r;
F.mortgagePaymentExact = Math.round(pay * 100) / 100;
F.mortgageBalanceExact = Math.round(bal);
F.ordinaryTaxable = F.taxableIncome - F.qualDividends;
F.annualHsaBoth = F.hsaFamilyLimit + F.hsaCatchUp;

/* ---------- self-check against Part M --------------------------------- */
const M = sec('PART M');
const ordinaryTax = (ti) => {
  const b = [[F.bracket10, 0.10], [F.bracket12, 0.12], [F.bracket22, 0.22], [F.bracket24, 0.24], [F.bracket32, 0.32], [F.bracket35, 0.35], [Infinity, 0.37]];
  let tax = 0, lo = 0;
  for (const [hi, rate] of b) { if (ti <= lo) break; tax += (Math.min(ti, hi) - lo) * rate; lo = hi; }
  return tax;
};
const checks = [
  ['investable sum',      F.meg403b + F.megRoth + F.david401k + F.davidRoth + F.davidRollover + F.brokerage + F.hsa + F.cash + F.plan529, F.investable],
  ['total assets',        F.investable + F.residence, F.totalAssets],
  ['net worth',           F.investable + F.residence - F.mortgage, F.netWorth],
  ['pre-tax total',       F.meg403b + F.david401kPre + F.davidRollover, F.preTaxTotal],
  ['Roth total',          F.megRoth + F.david401kRoth + F.davidRoth, F.rothTotal],
  ['taxable total',       F.brokerage + F.cash, F.taxableTotal],
  ['character sum',       F.preTaxTotal + F.rothTotal + F.taxableTotal + F.hsa + F.plan529, F.investable],
  ['pre-tax share',       Math.round(F.preTaxTotal / F.investable * 1000) / 10, F.preTaxPct],
  ['Roth share',          Math.round(F.rothTotal / F.investable * 1000) / 10, F.rothPct],
  ['taxable share',       Math.round(F.taxableTotal / F.investable * 1000) / 10, F.taxablePct],
  ['401(k) parts',        F.david401kPre + F.david401kRoth, F.david401k],
  ['wages',               F.megW2 + F.davidW2, F.wages],
  ['deferral each',       F.deferralLimit + F.catchUp, F.megDeferral],
  ['deferral each (David)', F.deferralLimit + F.catchUp, F.davidDeferral],
  ['employer contributions', F.megMatch + F.davidMatch, F.employerContribs],
  ['payroll savings',     F.megDeferral + F.davidDeferral + F.hsaContrib + F.employerContribs, F.payrollSavings],
  ['brokerage basis',     F.brokerageFundsBasis + F.esppBasis, F.brokerageBasis],
  ['brokerage value',     F.brokerageFunds + F.esppValue, F.brokerage],
  ['brokerage gain',      F.brokerage - F.brokerageBasis, F.brokerageGain],
  ['brokerage income',    F.qualDividends + F.fundInterest, F.brokerageIncome],
  ['ESPP value',          Math.round(F.esppShares * F.esppPrice), F.esppValue],
  ['ESPP basis',          Math.round(F.esppShares * F.esppCost), F.esppBasis],
  ['ESPP gain',           F.esppValue - F.esppBasis, F.esppGain],
  ['ESPP concentration',  Math.round(F.esppValue / F.brokerage * 1000) / 10, F.esppPct],
  ['cash interest',       Math.round(F.cash * F.cashRate / 100), F.cashInterest],
  ['home basis',          F.homePurchase + F.homeImprovements, F.homeBasis],
  ['home gain',           F.residence - F.homeBasis, F.homeGain],
  ['household income',    F.wages + F.qualDividends + F.fundInterest + F.cashInterest, F.householdIncome],
  ['investment income',   F.qualDividends + F.fundInterest + F.cashInterest, F.investmentIncome],
  ['pre-tax deductions',  F.megDeferral + F.deferralLimit + F.hsaEmployee, F.preTaxDeductions],
  ['AGI',                 F.wages - F.preTaxDeductions + F.investmentIncome, F.agi],
  ['taxable income',      F.agi - F.stdDeduction, F.taxableIncome],
  ['federal tax',         Math.round(ordinaryTax(F.taxableIncome - F.qualDividends) + 0.15 * F.qualDividends), F.fedTax],
  ['24% room',            F.bracket24 - F.taxableIncome, F.bracketRoom],
  ['NIIT',                Math.round(0.038 * Math.min(F.investmentIncome, F.agi - F.niitThreshold)), F.niit],
  ['Illinois tax',        Math.round(F.ilRate / 100 * (F.agi - 4 * F.ilExemption - F.contrib529)), F.ilTax],
  ['payroll taxes',       Math.round(0.062 * F.megW2 + 0.062 * Math.min(F.davidW2 - F.hsaEmployee, F.ssWageBase) + 0.0145 * (F.wages - F.hsaEmployee) + 0.009 * (F.wages - F.hsaEmployee - F.addlMedicareThreshold)), F.payrollTaxes],
  ['after-tax cash',      F.wages - F.megDeferral - F.davidDeferral - F.hsaEmployee - F.fedTax - F.niit - F.ilTax - F.payrollTaxes, F.afterTaxCash],
  ['mortgage annual',     F.mortgagePayment * 12, F.mortgageAnnual],
  ['total outflow',       F.mortgageAnnual + F.propertyTax + F.pcPremiums + F.megTermPremium + F.emmaSupport + F.contrib529 + F.travel + F.otherLiving, F.totalOutflow],
  ['529 contributions',   F.contrib529Monthly * 12, F.contrib529],
  ['mortgage payment',    Math.round(pay), F.mortgagePayment],
  ['mortgage balance (within $100)', Math.abs(Math.round(bal) - F.mortgage) < 100, true],
  ['Ruth assets',         F.ruthIra + F.ruthSavings, F.ruthTotal],
  ['Ruth RMD',            Math.round(F.ruthIraPriorYear / F.ruthRmdFactor), F.ruthRmd2026],
  ['David first RMD year', 1967 + F.davidApplicableAge, F.davidFirstDistYear],
  ['Meg first RMD year',  1968 + F.megApplicableAge, F.megFirstDistYear],
  ['Meg window',          F.megWindowEnd - F.megWindowStart + 1, F.megWindowYears],
  ['David window',        F.davidWindowEnd - F.davidWindowStart + 1, F.davidWindowYears],
  ['Meg window ends before RMD', F.megWindowEnd + 1, F.megFirstDistYear],
  ['David window ends before RMD', F.davidWindowEnd + 1, F.davidFirstDistYear],
  ['David group life',    2 * F.davidW2, F.davidGroupLife],
  ['Meg group life',      F.megW2, F.megGroupLife],
  ['Meg SS at 62',        Math.round(F.megSsFra * 0.70), F.megSs62],
  ['Meg SS at 70',        Math.round(F.megSsFra * 1.24), F.megSsAt70],
  ['David SS at 62',      Math.round(F.davidSsFra * 0.70), F.davidSs62],
  ['David SS at 70',      Math.round(F.davidSsFra * 1.24), F.davidSsAt70],
  ['death benefits',      F.davidGroupLife + F.megGroupLife + F.megTermLife, F.deathBenefits],
  ['estate plus insurance', F.netWorth + F.deathBenefits, F.estatePlusInsurance],
  ['under the Illinois exclusion', F.estatePlusInsurance < F.ilExclusion, true],
  ['risk gap',            F.davidRiskScore - F.megRiskScore, F.riskGap],
  ['allocation sums to 100', F.allocEquityFunds + F.allocEspp + F.allocFixed + F.allocCash, 100],
  ['AGI above the Roth phase-out', F.agi > F.rothPhaseoutHi, true],
  ['AGI above the AOTC phase-out', F.agi > F.aotcHi, true],
  ['home gain under the exclusion', F.homeGain < F.section121, true],
  ['Roth catch-up: David over the threshold', F.davidFica2025 > F.rothCatchupThreshold, true],
  ['Roth catch-up: Meg under the threshold', F.megFica2025 < F.rothCatchupThreshold, true],
];
for (const [name, computed, stated] of checks) {
  if (computed !== stated) problems.push(`Part M check "${name}": computed ${computed}, CASE.md states ${stated}`);
}
for (const must of ['$2,446,000', '$2,920,800', '$273,070', '$240,870', '$42,636', '$335', '$12,641', '$25,217', '$175,421', '$1,488.16', '$165,209', '$193,000', '16.8%', '$10,847', '2042', '2043', '$1,015,000', '$3,935,800']) {
  if (!M.includes(must)) problems.push(`Part M no longer states the ${must} identity`);
}

/* ---------- Part O capture --------------------------------------------- */
const O = sec('PART O');
const corpus = [];
for (const m of O.matchAll(/```corpus id=(D\d+)\n([\s\S]*?)\n```/g)) corpus.push({ id: m[1], t: m[2].replace(/\s*\n\s*/g, ' ').trim() });
const speakers = [];
for (const m of O.matchAll(/```speaker who=([A-Za-z]+)\n([\s\S]*?)\n```/g)) speakers.push({ who: m[1], said: m[2].replace(/\s*\n\s*/g, ' ').trim() });
if (corpus.length !== 10) problems.push(`Part O: expected 10 corpus fences, found ${corpus.length}`);
if (speakers.length !== 6) problems.push(`Part O: expected 6 speaker fences, found ${speakers.length}`);
const want = ['D1','D2','D3','D4','D5','D6','D7','D8','D9','D10'];
if (corpus.map((c) => c.id).join(',') !== want.join(',')) problems.push(`Part O: chunk ids are ${corpus.map((c) => c.id).join(',')}`);
for (const c of corpus) {
  if (c.t.length < 40) problems.push(`Part O: chunk ${c.id} is shorter than 40 characters`);
  if (/['’—–<>]/.test(c.t)) problems.push(`Part O: chunk ${c.id} carries an apostrophe, a dash or markup, which the ranker would score`);
}
/* THE CONFLICT THE CORPUS EXISTS FOR. D3 (the 2026 summary plan description)
   states in-plan Roth conversion is permitted; D7 (the 2024 memo) states the
   plan does not permit it. Both must hold, and §B.2 must agree with D3. */
const d3 = corpus.find((c) => c.id === 'D3'), d7 = corpus.find((c) => c.id === 'D7'), d4 = corpus.find((c) => c.id === 'D4');
if (d3 && !/in plan Roth conversion/i.test(d3.t)) problems.push('Part O: D3 no longer states in plan Roth conversion');
if (d7 && !/does not permit in plan Roth conversion/i.test(d7.t)) problems.push('Part O: D7 no longer states the contrary (the conflict D3 and D7 exist to carry)');
if (!/In-plan Roth conversion of pre-tax balances permitted since/.test(sec('B.2'))) problems.push('§B.2 no longer states in-plan Roth conversion is permitted, and D3 still does');
if (d4 && !/Dorothy Cole/.test(d4.t)) problems.push('Part O: D4 no longer names Dorothy Cole');
if (d4 && !/Contingent beneficiary none/i.test(d4.t)) problems.push('Part O: D4 no longer states no contingent beneficiary');
if (!/Dorothy Cole/.test(sec('C.3.5'))) problems.push('§C.3.5 no longer names Dorothy Cole, and D4 still does');

if (problems.length) {
  console.error('FAIL  build-case.mjs found ' + problems.length + ' drift problem(s):');
  for (const p of problems) console.error('   - ' + p);
  process.exit(1);
}

/* ---------- emit ------------------------------------------------------- */
const facts = { case_id: meta.case_id, case_version: meta.case_version, as_of: meta.as_of_date,
                generated_by: 'scripts/build-case.mjs', figures: F };
writeFileSync(join(HERE, 'case-facts.json'), JSON.stringify(facts, null, 2) + '\n');
writeFileSync(join(HERE, 'case-corpus.json'),
  JSON.stringify({ case_id: meta.case_id, case_version: meta.case_version, generated_by: 'scripts/build-case.mjs',
                   source: 'CASE.md PART O', corpus, transcript: speakers }, null, 2) + '\n');
console.log(`OK    case-corpus.json     ${corpus.length} chunks, ${speakers.length} transcript turns  (Part O)`);

const fcRaw = CASE.match(/<!-- CASE:FLOWCHART[^>]*-->([\s\S]*?)<!-- CASE:FLOWCHART END -->/);
if (!fcRaw) die('CASE.md Part L flowchart markers not found');
if ((fcRaw[0].match(/<!-- SHEET-BREAK -->/g) || []).length !== 1) die('Part L must carry exactly one SHEET-BREAK marker');
if ((fcRaw[0].match(/<svg\b/g) || []).length !== 2) die('Part L must carry exactly two <svg> sheets');
writeFileSync(join(HERE, 'case-flowchart.html'), scopeFlowchart(fcRaw[0]));

const extract = buildExtract();
writeFileSync(join(HERE, 'case-extract.html'), extract);
const stamp = createHash('sha256').update(extract, 'utf8').digest('hex').slice(0, 7);
console.log(`OK    case-facts.json      ${Object.keys(F).length} keyed figures`);
console.log(`OK    case-extract.html ${extract.length} bytes  stamp ${stamp}`);
console.log(`OK    case-flowchart.html  Part L, two sheets, scoped under .cole-flow`);
console.log(`OK    Part M self-check    ${checks.length} identities recomputed, all agree`);

/* ====================================================================== */
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function usd(n) { return '$' + Number(n).toLocaleString('en-US'); }

/**
 * scopeFlowchart — Part L ships wrapped in .cole-flow. Every rule in its
 * <style> block is prefixed with .cole-flow so the fragment cannot reach
 * outside itself, and rules whose classes appear nowhere in the markup are
 * dropped. Rules are one per line in CASE.md Part L by convention.
 */
function scopeFlowchart(block) {
  const styleM = block.match(/<style>([\s\S]*?)<\/style>/);
  if (!styleM) die('Part L has no <style> block');
  const markup = block.replace(/<style>[\s\S]*?<\/style>/, '');
  const scoped = styleM[1].split('\n').map((l) => {
    const t = l.trim();
    if (!t || t.startsWith('/*') || !t.includes('{')) return l;
    const i = l.indexOf('{');
    const sel = l.slice(0, i).trim(), rest = l.slice(i);
    if (!sel || sel.startsWith('@')) return l;
    return sel.split(',').map((s) => '.cole-flow ' + s.trim()).join(', ') + ' ' + rest;
  }).filter((l) => {
    const cls = l.match(/^\.cole-flow ([^{]+)\{/);
    if (!cls) return true;
    return cls[1].split(',').some((sel) => {
      const names = sel.match(/\.([A-Za-z0-9_-]+)/g) || [];
      return names.every((n) => markup.includes('class="' + n.slice(1) + '"') || markup.includes(' ' + n.slice(1) + '"') || markup.includes('"' + n.slice(1) + ' '));
    });
  }).join('\n');
  return block.replace(/<style>[\s\S]*?<\/style>/, '<style>\n' + scoped.trim() + '\n</style>') + '\n';
}

/**
 * buildExtract — a FRACTION of the master, the one-screen Facts tab. The two
 * principals, the children and Ruth, the balance sheet in one line, the clocks,
 * the gaps the file records, and the questions no session answers. Parts E, F
 * (parameters), I and M are deliberately absent.
 */
function buildExtract() {
  const L = [];
  L.push(`<div class="case-extract" data-case-version="${esc(meta.case_version)}">`);
  L.push(`  <p class="case-lede"><b>Synthetic case.</b> No real person, employer, institution or document. One household runs through all five sessions. It is never the material for your own work: you build that on your own recurring tasks with your own synthetic data.</p>`);
  L.push(`  <table class="dt tight case-t"><tbody>`);
  L.push(`    <tr><td class="case-k"><b>${esc(F.megName)}, ${F.megAge}</b></td><td>${esc(F.megRole)} at a regional hospital system, W-2 ${usd(F.megW2)}. Plans to stop at ${F.megRetireAge} in ${F.megRetireYear}. Risk questionnaire ${F.megRiskScore} of 100: <b>${esc(F.megRiskBand.toLowerCase())}</b>.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>${esc(F.davidName)}, ${F.davidAge}</b></td><td>${esc(F.davidRole)} at a mid-size manufacturer, W-2 ${usd(F.davidW2)}. Plans to stop at ${F.davidRetireAge} in ${F.davidRetireYear}. Risk questionnaire ${F.davidRiskScore} of 100: <b>${esc(F.davidRiskBand.toLowerCase())}</b>. Married ${F.marriedYears} years; both lifelong <b>${esc(F.domicile)}</b> residents, in ${esc(F.residenceTown)}.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>Family</b></td><td>Emma, ${F.emmaAge}, finishes a public university in 2027 (about ${usd(F.emmaSupport)} a year of support until then). Ryan, ${F.ryanAge}, starts college in 2029 (a 529 of ${usd(F.plan529)}). Meg's mother <b>${esc(F.ruthName)}, ${F.ruthAge}</b>, widowed, lives in independent living in ${esc(F.ruthTown)} at ${usd(F.ruthMonthlyFee)} a month and may need assisted living at ${usd(F.ruthAssistedBase)}; Meg holds her power of attorney; Ruth's ${usd(F.ruthIra)} IRA names Meg.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>Balance sheet</b></td><td>Meg 403(b) ${usd(F.meg403b)} &middot; Meg Roth IRA ${usd(F.megRoth)} &middot; David 401(k) ${usd(F.david401k)} (${usd(F.david401kRoth)} of it Roth) &middot; David Roth IRA ${usd(F.davidRoth)} &middot; <b>David rollover IRA ${usd(F.davidRollover)}</b> &middot; joint brokerage ${usd(F.brokerage)}, ${F.esppPct}% of it in David's employer's stock &middot; HSA ${usd(F.hsa)} &middot; cash ${usd(F.cash)} &middot; 529 ${usd(F.plan529)}. <b>Investable ${usd(F.investable)}</b>, <b>${F.preTaxPct}% of it pre-tax</b>. House ${usd(F.residence)} with a ${usd(F.mortgage)} mortgage at ${F.mortgageRate.toFixed(2)}% to ${esc(F.mortgageMaturity)}. Net worth ${usd(F.netWorth)}.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>Cash flow, 2026</b></td><td>Wages ${usd(F.wages)}. Payroll savings ${usd(F.megDeferral + F.davidDeferral)} to the plans and ${usd(F.hsaEmployee)} to the HSA. Federal income tax ${usd(F.fedTax)} (marginal rate ${F.marginalRate}%), Illinois ${usd(F.ilTax)}. The household lives on its paychecks; when they stop, this line becomes the retirement-income question.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>Clocks</b></td><td>Both reach 59&frac12; in 2027. Social Security from 62 (David ${esc(F.davidSsEarliest)}; Meg ${esc(F.megSsEarliest)}), full at 67, maximum at 70. Medicare at 65 (David ${esc(F.davidMedicare)}; Meg ${esc(F.megMedicare)}), with premiums set on income two years earlier. First required minimum distributions at <b>75</b>: David ${F.davidFirstDistYear}, Meg ${F.megFirstDistYear}. The <b>Roth conversion window</b>, no wages and no RMDs yet: Meg ${F.megWindowStart} to ${F.megWindowEnd}, David ${F.davidWindowStart} to ${F.davidWindowEnd}.</td></tr>`);
  L.push(`  </tbody></table>`);
  L.push(`  <p class="case-h">What the file records and no session resolves.</p>`);
  L.push(`  <ul class="case-open">`);
  L.push(`    <li><b>The stale designation.</b> David's ${usd(F.davidRollover)} rollover IRA still names his mother, <b>${esc(F.dorothyName)}</b>, who died in ${F.dorothyDied.slice(-4)}, with no contingent beneficiary (form dated ${esc(F.rolloverFormDate)}). By the custodian's default it would pay to his estate. It also blocks a clean backdoor Roth contribution for David (the aggregation rule); Meg, who holds no pre-tax IRA, is not blocked.</li>`);
  L.push(`    <li><b>The 2011 documents.</b> Two wills with no trust, a guardian clause for children of whom one is now an adult, and a successor agent who has died. The residence passes by joint tenancy; Illinois offers a transfer-on-death instrument the Coles have not used.</li>`);
  L.push(`    <li><b>The 2024 memo and the 2026 plan.</b> The prior adviser's Roth conversion memo (${esc(F.memoDate)}) says the 401(k) does not permit in-plan Roth conversion; the plan description amended ${esc(F.spdAmended)} says it does. Session 3's retrieval exercise grounds on both.</li>`);
  L.push(`    <li><b>No long-term care coverage</b> for either spouse, and Ruth's situation is the live example of the cost. David's group life (${usd(F.davidGroupLife)}) ends at separation; Meg's ${usd(F.megTermLife)} term policy ends in ${F.megTermEnds}.</li>`);
  L.push(`    <li><b>The question that runs through every session.</b> How much of the ${usd(F.preTaxTotal)} of pre-tax money to convert to Roth, and in which years of the window, with the federal bracket in the year of conversion and the Medicare premium two years later as the two prices, and Illinois charging nothing. No session answers it; each works on a part of it.</li>`);
  L.push(`  </ul>`);
  L.push(`  <p class="case-src">Every figure above belongs to the synthetic case and is the same in every session of the course. The 2026 tax and benefit parameters the case uses are in the master file with their sources; Social Security estimates are synthetic.</p>`);
  L.push(`</div>`);
  return L.join('\n') + '\n';
}
