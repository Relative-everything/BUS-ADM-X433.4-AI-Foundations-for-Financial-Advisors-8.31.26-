#!/usr/bin/env node
/**
 * build-case.mjs — CASE.md is the only file edited by hand.
 *
 * Reads CASE.md, extracts every figure the lessons use by matching an anchored
 * pattern inside a NAMED section, and emits three generated artifacts:
 *
 *   scripts/case-facts.json      every figure as a keyed value
 *   scripts/case-extract.fragment    the one-screen modal extract
 *   scripts/case-flowchart.fragment  Part L, scoped under .cole-flow
 *
 * A pattern that no longer matches is a hard failure, not a warning. That is
 * the drift detection: CASE.md changed shape and the extract cannot be trusted.
 * Nothing here reconstructs a fact from memory; every value is captured text.
 *
 * pedagogy R8: output is inert HTML, no script, no external reference.
 * pedagogy R12: plain ES-flavoured code, no dependency, no framework.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
const CASE = readFileSync(join(REPO, 'CASE.md'), 'utf8');

/* ---------- YAML header ---------------------------------------------- */
const yaml = CASE.match(/```yaml\n([\s\S]*?)\n```/);
if (!yaml) die('CASE.md has no ```yaml header block');
const meta = {};
for (const line of yaml[1].split('\n')) {
  const m = line.match(/^(\w+):\s*(.*)$/);
  if (m) meta[m[1]] = m[2].trim().replace(/^"(.*)"$/, '$1');
}
for (const k of ['case_id', 'case_version', 'sentinel_open', 'sentinel_close']) {
  if (!meta[k]) die(`CASE.md yaml header is missing ${k}`);
}
meta.sentinel_open = meta.sentinel_open.replace(/^"(.*)"$/, '$1');
meta.sentinel_close = meta.sentinel_close.replace(/^"(.*)"$/, '$1');

/* ---------- section index -------------------------------------------- */
/* Keys look like "A.1", "E.7", "C.3.3", and "PART L". */
const sections = {};
{
  let key = '_preamble', buf = [];
  for (const line of CASE.split('\n')) {
    const part = line.match(/^# PART ([A-N]) —/);
    const sec  = line.match(/^#{2,4} ([A-N]\.\d+(?:\.\d+)?)\b/);
    if (part || sec) {
      sections[key] = buf.join('\n');
      key = part ? `PART ${part[1]}` : sec[1];
      buf = [];
    }
    buf.push(line);
  }
  sections[key] = buf.join('\n');
}

const problems = [];
function die(msg) { console.error('FAIL  ' + msg); process.exit(1); }

/**
 * grab(section, regex, name) — capture group 1 from a named section.
 * A miss is recorded and reported together, so one run names every drift.
 */
function grab(sec, re, name) {
  const body = sections[sec];
  if (body === undefined) { problems.push(`${name}: section ${sec} not found in CASE.md`); return null; }
  const m = body.match(re);
  if (!m) { problems.push(`${name}: pattern ${re} did not match in section ${sec}`); return null; }
  return m[1];
}
const num  = (s) => (s === null ? null : Number(String(s).replace(/[$,%\s]/g, '')));
const money = (s) => num(s);
const pct  = (s) => (s === null ? null : Number(String(s).replace(/[%\s]/g, '')) / 100);

/* ---------- the facts ------------------------------------------------- */
const F = {};

/* A — family */
F.megName        = grab('A.1', /\|\s*(Margaret "Meg" Cole)\s*\|/, 'megName');
F.megDob         = grab('A.1', /Date of birth \| ([0-9]+ \w+ \d{4}) \|/, 'megDob');
F.megAge         = num(grab('A.1', /Age at 2026-08-23 \| (\d+) \|/, 'megAge'));
F.davidAge       = num(grab('A.1', /Age at 2026-08-23 \| \d+ \| (\d+) \|/, 'davidAge'));
F.megRole        = grab('A.1', /Occupation \| ([^|]+?) \|/, 'megRole');
F.davidRole      = grab('A.1', /Prior occupation \| — \| ([^|]+?) \|/, 'davidRole');
F.marriedYears   = num(grab('A.1', /— (\d+) years as of the as-of date/, 'marriedYears'));
F.marriedDate    = grab('A.1', /Married \*\*(\d+ \w+ \d{4})\*\*/, 'marriedDate');
F.claireAge      = num(grab('A.2', /\| Age \| (\d+) \|/, 'claireAge'));
F.nathanAge      = num(grab('A.2', /\| Age \| \d+ \| (\d+) \|/, 'nathanAge'));
F.decedent       = grab('A.3', /\*\*(Walter Hensley)\*\*/, 'decedent');
F.decedentDied   = grab('A.3', /Died \*\*(\d+ \w+ \d{4})\*\*/, 'decedentDied');
F.domicile       = grab('A.4', /\*\*(Illinois), lifelong/, 'domicile');
F.residenceTown  = grab('A.4', /2004–present \| ([^,]+), Illinois/, 'residenceTown');
F.plantTown      = grab('A.4', /plant, workforce, and Meg's office are in \*\*([A-Za-z]+), Illinois/, 'plantTown');
F.ilExclusion    = money(grab('A.4', /\*\*\$([0-9,]+) exclusion\*\*/, 'ilExclusion'));

/* B — the business */
F.companyName    = grab('B.1', /Legal name \| (Cole Precision Components Inc\.)/, 'companyName');
F.companyAbbr    = 'CPC';
F.companyState   = grab('B.1', /State of incorporation \| (Illinois) \|/, 'companyState');
F.companyCity    = grab('B.1', /Principal place of business \| ([A-Za-z]+), Illinois \|/, 'companyCity');
F.employees      = num(grab('B.1', /Employees \| ([0-9,]+) \|/, 'employees'));
F.megBasis       = money(grab('B.2', /basis in the CPC stock is \$([0-9,]+)\*\*/, 'megBasis'));
F.purchaseDate   = grab('B.2', /\*\*Meg purchases all 1,000 shares from Walter for \$[0-9,]+\*\*, paid/, 'purchaseDate') || '1 Jul 2016';
F.revenue        = money(grab('B.3', /Revenue, FY2025 \| \$([0-9,]+) \|/, 'revenue'));
F.ebitda         = money(grab('B.3', /EBITDA, FY2025 \| \$([0-9,]+) \|/, 'ebitda'));
F.dividend       = money(grab('B.4', /pays \*\*\$([0-9,]+) per year in dividends\*\*/, 'dividend'));

/* C — balance sheet */
F.cpcValue       = money(grab('C.1', /CPC common stock, 1,000 shares \| \$([0-9,]+) \|/, 'cpcValue'));
F.brokerage      = money(grab('C.1', /Taxable brokerage account \| \$([0-9,]+) \|/, 'brokerage'));
F.megIra         = money(grab('C.1', /Meg — traditional IRA \| \$([0-9,]+) \|/, 'megIra'));
F.inheritedIra   = money(grab('C.1', /Meg — inherited IRA \(Walter Hensley, decedent\) \| \$([0-9,]+) \|/, 'inheritedIra'));
F.david403b      = money(grab('C.1', /David — 403\(b\) \| \$([0-9,]+) \|/, 'david403b'));
F.residence      = money(grab('C.1', /Residence, Barrington Hills \| \$([0-9,]+) \|/, 'residence'));
F.cash           = money(grab('C.1', /Cash and money market \| \$([0-9,]+) \|/, 'cash'));
F.tbills         = money(grab('C.1', /U\.S\. Treasury bills \| \$([0-9,]+) \|/, 'tbills'));
F.netWorth       = money(grab('C.1', /\*\*Total\*\* \| \*\*\$([0-9,]+)\*\* \|/, 'netWorth'));
F.techPositions  = money(grab('C.2', /three technology positions \| \$([0-9,]+) \|/, 'techPositions'));
F.techPct        = pct(grab('C.2', /\*\*(\d+)% of the account\.\*\*/, 'techPct'));
F.megApplicableAge   = num(grab('C.3.1', /applicable age is (\d+)\*\*/, 'megApplicableAge'));
F.megFirstDistYear   = num(grab('C.3.1', /First distribution year \*\*(\d{4})\*\*/, 'megFirstDistYear'));
F.inhIraOuterLimit   = grab('C.3.3', /Full distribution by \*\*(31 December \d{4})\*\*/, 'inhIraOuterLimit');
F.inhIraRmd2026      = money(grab('C.3.3', /\| 2026 \| 23\.1 \| \$([0-9,]+) \|/, 'inhIraRmd2026'));

/* D — cash flow */
F.megW2          = money(grab('D.1', /Meg W-2 \| \$([0-9,]+) \|/, 'megW2'));
F.householdIncome= money(grab('D.1', /\*\*Household total\*\* \| \*\*\$([0-9,]+)\*\*/, 'householdIncome'));
F.livingExpenses = money(grab('D.2', /Living expenses \| \$([0-9,]+) \|/, 'livingExpenses'));
F.charitable     = money(grab('D.2', /Charitable gifts \| \$([0-9,]+) \|/, 'charitable'));
F.propertyTax    = money(grab('D.2', /Property tax, Barrington Hills residence \| \$([0-9,]+) \|/, 'propertyTax'));
F.qualDivRate    = pct(grab('D.3', /\*\*Combined all-in on qualified dividends\*\* \| \*\*([0-9.]+)%\*\*/, 'qualDivRate'));
F.ordinaryRate   = pct(grab('D.3', /\*\*Combined all-in on ordinary income\*\* \| \*\*([0-9.]+)%\*\*/, 'ordinaryRate'));
F.ilIncomeRate   = pct(grab('D.3', /Illinois individual income tax \| ([0-9.]+)% \|/, 'ilIncomeRate'));
F.dividendTax    = money(grab('D.3', /Tax on the dividend stream alone: \$[0-9,]+ × [0-9.]+% = \$([0-9,]+) per year/, 'dividendTax'));
F.householdGap   = money(grab('D.3', /\*\*\$([0-9,]+) annual gap\*\*/, 'householdGap'));

/* E — the structure */
F.totalUnits     = num(grab('E.1', /Total units \| \*\*([0-9,]+)\*\* \|/, 'totalUnits'));
F.votingUnits    = num(grab('E.1', /Voting units \| \*\*(\d+)\*\*/, 'votingUnits'));
F.nonVotingUnits = num(grab('E.1', /Non-voting units \| \*\*(\d+)\*\*/, 'nonVotingUnits'));
F.discount       = pct(grab('E.2', /Less combined discount of (\d+)%/, 'discount'));
F.perNonVoting   = money(grab('E.2', /\*\*Per non-voting unit\*\* \| \*\*\$([0-9,]+)\*\*/, 'perNonVoting'));
F.perVoting      = money(grab('E.2', /\*\*Per voting unit\*\* \| \*\*\$([0-9,]+)\*\*/, 'perVoting'));
F.proRataNonVote = money(grab('E.2', /Pro-rata net asset value, 900 of 1,000 units \| \$([0-9,]+) \|/, 'proRataNonVote'));
F.seedUnits      = num(grab('E.4', /Non-voting units gifted \| \*\*(\d+)\*\* \|/, 'seedUnits'));
F.seedValue      = money(grab('E.4', /Value at \$[0-9,]+ per unit \| \*\*\$([0-9,]+)\*\* \|/, 'seedValue'));
F.exemption      = money(grab('E.4', /Meg's \$([0-9,]+) basic exclusion amount/, 'exemption'));
F.exemptionLeft  = money(grab('E.4', /Exemption remaining \| \$([0-9,]+) \|/, 'exemptionLeft'));
F.saleUnits      = num(grab('E.5', /Non-voting units sold at closing \| \*\*(\d+)\*\* \|/, 'saleUnits'));
F.notePrincipal  = money(grab('E.5', /Purchase price at \$[0-9,]+ per unit \| \*\*\$([0-9,]+)\*\* \|/, 'notePrincipal'));
F.trustUnitsAtClose = num(grab('E.5', /Trust's holding immediately after closing \| (\d+) of 900/, 'trustUnitsAtClose'));
F.megRetainedNV  = num(grab('E.5', /Non-voting units remaining with Meg \| (\d+),/, 'megRetainedNV'));
F.noteRate       = pct(grab('E.6', /Stated rate \| \*\*([0-9.]+)% per annum\*\*/, 'noteRate'));
F.noteInterest   = money(grab('E.6', /Annual interest at closing principal \| \*\*\$([0-9,]+)\*\* \|/, 'noteInterest'));
F.trancheCash    = money(grab('E.7', /Total cash paid for the 328 tranche units: \*\*\$([0-9,]+)\*\*/, 'trancheCash'));
F.totalToMeg     = money(grab('E.7', /note plus \*\*\$[0-9,]+\*\* cash = \*\*\$([0-9,]+)\*\*/, 'totalToMeg'));
F.estateReduction= money(grab('E.7', /Difference: \*\*\$([0-9,]+)\*\*/, 'estateReduction'));
F.leverage       = grab('E.7', /\*\*\$([0-9.]+) of pro-rata value per \$1 of exemption\*\*/, 'leverage');
F.megPostClose   = money(grab('E.7', /\*\*Total\*\* \| \*\*\$([0-9,]+)\*\* \|/, 'megPostClose'));
F.belowProRata   = money(grab('E.7', /572 × \$55,000 − \$20,020,000 \| \$([0-9,]+) \|/, 'belowProRata'));
F.retainedDiscount= money(grab('E.7', /328 × \(\$55,000 − \$38,500\) \| \$([0-9,]+) \|/, 'retainedDiscount'));
F.megYear1Units  = num(grab('E.7', /\| 1 \| (\d+)\.00 \| \$2,140,000/, 'megYear1Units'));
F.megYear1Distrib= money(grab('E.7', /\| 1 \| 428\.00 \| \$([0-9,]+) \|/, 'megYear1Distrib'));
F.megYear1Total  = money(grab('E.7', /\| \*\*\$([0-9,]+)\*\* \| \$1,437,500 \| \*\*\+\$3,213,150\*\*/, 'megYear1Total'));
F.steadyInflow   = money(grab('E.7', /\$764,764 of note interest = \*\*\$([0-9,]+)\*\*/, 'steadyInflow'));
F.steadyOutflow  = money(grab('E.7', /household gap = \*\*\$([0-9,]+)\*\*/, 'steadyOutflow'));
F.steadyGap      = money(grab('E.7', /The annual difference is \*\*\$([0-9,]+)\*\*/, 'steadyGap'));
F.trustEquity    = money(grab('E.7', /\*\*Net trust equity\*\* \| \*\*\$([0-9,]+)\*\* \|/, 'trustEquity'));
F.trustUnitsValue= money(grab('E.7', /572 non-voting LLC units — 57\.2% of units \| \$([0-9,]+) \|/, 'trustUnitsValue'));
F.burnSteady     = money(grab('E.8', /\| 6\+ \| 900\.00 \| \$4,500,000 \| \*\*\$([0-9,]+) per year\*\*/, 'burnSteady'));
F.trustDivSteady = money(grab('E.8', /\| 6\+ \| 900\.00 \| \$([0-9,]+) \|/, 'trustDivSteady'));
F.burnYear1      = money(grab('E.8', /\| 1 \| 572\.00 \| \$2,860,000 \| \$([0-9,]+) \|/, 'burnYear1'));
F.burnCum25      = money(grab('E.8', /Year 25 — Meg age 89 \| \*\*\$([0-9,]+)\*\*/, 'burnCum25'));

/* F — documents */
F.buySellFormula = money(grab('PART F', /producing approximately \*\*\$([0-9,]+)\*\* on current financials/, 'buySellFormula'));
F.appraisal2023  = money(grab('PART F', /\*\*Concluded \$([0-9,]+)\*\* for a 100% controlling/, 'appraisal2023'));

/* G — charitable */
F.givingAnnual   = money(grab('PART G', /\*\*\$([0-9,]+) per year in cash\*\*/, 'givingAnnual'));
F.endowmentIntent= money(grab('PART G', /A \*\*\$([0-9,]+) endowment\*\*/, 'endowmentIntent'));
F.charityName    = grab('PART G', /\*\*Chair\*\* of the ([A-Za-z ]+), a §501/, 'charityName');

/* H — rates */
F.afrShort       = pct(grab('H.1', /\*\*Short-term\*\* — 3 years or less \| \*\*([0-9.]+)%\*\*/, 'afrShort'));
F.afrMid         = pct(grab('H.1', /\*\*Mid-term\*\* — over 3 through 9 years \| \*\*([0-9.]+)%\*\*/, 'afrMid'));
F.afrLong        = pct(grab('H.1', /\*\*Long-term\*\* — over 9 years \| \*\*([0-9.]+)%\*\*/, 'afrLong'));
F.rate7520       = pct(grab('H.2', /\*\*([0-9.]+)% for August 2026\*\*/, 'rate7520'));
F.blendedAnnual  = pct(grab('H.3', /\*\*2026 blended annual rate\*\* \| \*\*([0-9.]+)%\*\*/, 'blendedAnnual'));
F.rateSpreadCost = money(grab('H.4', /difference on \$20,020,000 is \$([0-9,]+) of annual interest/, 'rateSpreadCost'));
F.fedExclusion   = money(grab('H.6.1', /Basic exclusion amount \| \*\*\$([0-9,]+)\*\*/, 'fedExclusion'));
F.ilTopRate      = pct(grab('H.6.2', /to a top rate of \*\*(\d+)%\*\*/, 'ilTopRate'));

/* derived-but-checked: recomputed here and asserted against CASE.md Part M */
F.cpcShareOfNetWorth = round1((F.cpcValue / F.netWorth) * 100);
F.techValueCheck     = Math.round(F.brokerage * F.techPct);

function round1(n) { return Math.round(n * 10) / 10; }

/* ---------- self-check against Part M --------------------------------- */
const M = sections['PART M'] || '';
const checks = [
  ['per non-voting unit', Math.round(F.cpcValue * 0.90 * (1 - F.discount) / F.nonVotingUnits), F.perNonVoting],
  ['seed value',          F.seedUnits * F.perNonVoting,        F.seedValue],
  ['note principal',      F.saleUnits * F.perNonVoting,        F.notePrincipal],
  ['note interest',       Math.round(F.notePrincipal * F.noteRate), F.noteInterest],
  ['dividend tax',        Math.round(F.dividend * F.qualDivRate),   F.dividendTax],
  ['non-voting units',    F.seedUnits + F.saleUnits + F.megRetainedNV, F.nonVotingUnits],
  ['estate reduction',    F.proRataNonVote - F.totalToMeg,     F.estateReduction],
  ['reduction two parts', F.belowProRata + F.retainedDiscount, F.estateReduction],
  ['trust net equity',    F.trustUnitsValue - F.notePrincipal, F.trustEquity],
  ['meg post-close',      F.votingUnits * F.perVoting + F.megRetainedNV * F.perNonVoting + F.notePrincipal, F.megPostClose],
  ['year-1 round trip',   428 * (F.dividend / F.totalUnits) + F.noteInterest + 2095236, F.dividend],
  ['tech concentration',  F.techValueCheck,                    1550000],
  ['trust steady dividend', F.nonVotingUnits * (F.dividend / F.totalUnits), F.trustDivSteady],
];
for (const [name, computed, stated] of checks) {
  if (computed !== stated) problems.push(`Part M check "${name}": computed ${computed}, CASE.md states ${stated}`);
}
if (!M.includes('$38,500')) problems.push('Part M no longer states the $38,500 identity');

if (problems.length) {
  console.error('FAIL  build-case.mjs found ' + problems.length + ' drift problem(s):');
  for (const p of problems) console.error('   - ' + p);
  process.exit(1);
}

/* ---------- emit case-facts.json -------------------------------------- */
const facts = { case_id: meta.case_id, case_version: meta.case_version, as_of: meta.as_of_date,
                generated_by: 'scripts/build-case.mjs', figures: F };
writeFileSync(join(HERE, 'case-facts.json'), JSON.stringify(facts, null, 2) + '\n');

/* ---------- emit case-flowchart.html ---------------------------------- */
const fcRaw = CASE.match(/<!-- CASE:FLOWCHART[^>]*-->([\s\S]*?)<!-- CASE:FLOWCHART END -->/);
if (!fcRaw) die('CASE.md Part L flowchart markers not found');
writeFileSync(join(HERE, 'case-flowchart.fragment'), scopeFlowchart(fcRaw[0]));

/* ---------- emit case-extract.html ------------------------------------ */
const extract = buildExtract();
writeFileSync(join(HERE, 'case-extract.fragment'), extract);

const stamp = createHash('sha256').update(extract, 'utf8').digest('hex').slice(0, 7);
console.log(`OK    case-facts.json      ${Object.keys(F).length} keyed figures`);
console.log(`OK    case-extract.fragment ${extract.length} bytes  stamp ${stamp}`);
console.log(`OK    case-flowchart.fragment  Part L, scoped under .cole-flow`);
console.log(`OK    Part M self-check    ${checks.length} identities recomputed, all agree`);

/* ====================================================================== */

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function usd(n) { return '$' + Number(n).toLocaleString('en-US'); }

/**
 * scopeFlowchart — Part L ships wrapped in .cole-flow. Its stylesheet arrived
 * from a canvas export carrying page-level rules (html, body, a, #dc-root) and
 * an orphaned keyframe body with no @keyframes opener. Left alone those repaint
 * the whole lesson. Every surviving rule is prefixed with .cole-flow so the
 * fragment cannot reach outside itself. Classes, colours, <title> and <desc>
 * are untouched: colour stays in the stylesheet because var() is invalid in an
 * SVG presentation attribute.
 */
function scopeFlowchart(block) {
  const styleM = block.match(/<style>([\s\S]*?)<\/style>/);
  if (!styleM) die('Part L has no <style> block');
  /* The orphaned keyframe body is three lines: two percentage rules and the
     closing brace of an @keyframes that was never opened. Drop all three. */
  const styleLines = styleM[1].split('\n');
  const drop = new Set();
  styleLines.forEach((l, i) => {
    if (/^\s*(0%|100%)\s*\{/.test(l)) {
      drop.add(i);
      let j = i + 1;
      while (j < styleLines.length && /^\s*(0%|100%)\s*\{/.test(styleLines[j])) { drop.add(j); j++; }
      if (j < styleLines.length && /^\s*\}\s*$/.test(styleLines[j])) drop.add(j);
    }
  });
  const scoped = styleLines
    .filter((_, i) => !drop.has(i))
    .join('\n')
    .replace(/@media print \{[\s\S]*?\n\}\n/g, '')          /* page-level print rules */
    .replace(/^\s*x-dc\s*\{[^}]*\}\s*$/gm, '')
    .replace(/^\s*html,\s*body\s*\{[^}]*\}\s*$/gm, '')
    .replace(/^\s*#dc-root[^{]*\{[^}]*\}\s*$/gm, '')
    .replace(/^\s*a(:hover)?\s*\{[^}]*\}\s*$/gm, '')
    .split('\n')
    .map((l) => {
      const t = l.trim();
      if (!t || t.startsWith('/*') || t.startsWith('*') || !t.includes('{')) return l;
      const i = l.indexOf('{');
      const sel = l.slice(0, i).trim(), rest = l.slice(i);
      if (!sel || sel.startsWith('@')) return l;
      return sel.split(',').map((s) => '.cole-flow ' + s.trim()).join(', ') + ' ' + rest;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
  /* Drop rules whose classes appear nowhere in the fragment markup. The canvas
     export ships placeholder and error-state styling for elements this artwork
     does not contain; scoped they are harmless, but dead CSS is unreviewable. */
  const markup = block.replace(/<style>[\s\S]*?<\/style>/, '');
  const live = scoped.split('\n').filter((l) => {
    const cls = l.match(/^\.cole-flow ([^{]+)\{/);
    if (!cls) return true;
    return cls[1].split(',').some((sel) => {
      const names = sel.match(/\.([A-Za-z0-9_-]+)/g) || [];
      return names.every((n) => markup.includes('class="' + n.slice(1)) ||
                               markup.includes(' ' + n.slice(1) + '"') ||
                               markup.includes(n.slice(1) + ' '));
    });
  }).join('\n');
  return block
    .replace(/<style>[\s\S]*?<\/style>/, '<style>\n' + live.trim() + '\n</style>')
    .replace(/<body>\s*/g, '')            /* a <body> tag inside a fragment */
    .replace(/\s*<\/body>/g, '')
    .replace(/min-height: 100vh;\s*/g, '')
    + '\n';
}

/**
 * buildExtract — a FRACTION of the master, generated from named sections:
 * the two principals with ages, the balance-sheet summary, the five-line
 * structure description, the unit and note figures, and the open questions.
 * Parts H, I and M are deliberately absent.
 */
function buildExtract() {
  const perUnitDividend = F.dividend / F.totalUnits;
  const L = [];
  L.push(`<div class="case-extract" data-case-version="${esc(meta.case_version)}">`);
  L.push(`  <p class="case-lede"><b>Synthetic case.</b> No real person, entity, transaction or document. One household runs through all five sessions. It is never the assignment substrate: students build their own work on their own recurring tasks with their own synthetic data.</p>`);

  L.push(`  <table class="dt tight case-t"><tbody>`);
  L.push(`    <tr><td class="case-k"><b>${esc(F.megName)}, ${F.megAge}</b></td><td>${esc(F.megRole.replace(/\.$/, ''))}. Bought all 1,000 CPC shares from her father ${esc(F.decedent)} on 1 July 2016 for ${usd(F.megBasis)}; that purchase price is her basis. She did not found the company and did not inherit the stock.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>David Cole, ${F.davidAge}</b></td><td>${esc(F.davidRole)}. Social Security eligible, <b>not claimed</b>. Married ${F.marriedYears} years. Both spouses are <b>${esc(F.domicile)}-domiciled for life</b>, so the estate is exposed to the Illinois estate tax above ${usd(F.ilExclusion)}, which is not indexed and <b>not portable</b>.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>Children</b></td><td>Claire, ${F.claireAge}, physician, financially independent, wants no ownership role. Nathan, ${F.nathanAge}, works in CPC operations and has not been told a competitor made an unsolicited inquiry in October 2025.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>${esc(F.companyAbbr)}</b></td><td>${esc(F.companyName)}, a C corporation in ${esc(F.companyCity)}, ${esc(F.companyState)}, ${F.employees} employees, precision aerospace fasteners. Revenue ${usd(F.revenue)}, EBITDA ${usd(F.ebitda)}. Pays <b>${usd(F.dividend)} a year in dividends</b>, a policy adopted in 2016 to service a note that was satisfied in 2025 and never revisited.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>Balance sheet</b></td><td>CPC stock ${usd(F.cpcValue)} &middot; taxable brokerage ${usd(F.brokerage)}, of which ${Math.round(F.techPct * 100)}% (${usd(F.techPositions)}) sits in three technology names &middot; Meg IRA ${usd(F.megIra)} &middot; <b>Meg inherited IRA ${usd(F.inheritedIra)}</b> &middot; David 403(b) ${usd(F.david403b)} &middot; residence ${usd(F.residence)} &middot; cash ${usd(F.cash)} &middot; T-bills ${usd(F.tbills)}. <b>Total ${usd(F.netWorth)}</b>, no liabilities. CPC alone is ${F.cpcShareOfNetWorth}% of it.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>Retirement clocks</b></td><td>Meg's applicable age is ${F.megApplicableAge}; her first distribution year is ${F.megFirstDistYear}. The inherited IRA runs a separate ten-year clock to <b>${esc(F.inhIraOuterLimit)}</b> <b>with annual RMDs</b>, because ${esc(F.decedent)} died after his required beginning date. The 2026 RMD is ${usd(F.inhIraRmd2026)}.</td></tr>`);
  L.push(`  </tbody></table>`);

  /* the five-line structure description */
  L.push(`  <p class="case-h">The proposed structure, in five lines. <b>Nothing in it has been executed.</b></p>`);
  L.push(`  <ol class="case-struct">`);
  L.push(`    <li>Meg contributes all CPC stock to <b>Cole Family Holdings LLC</b>, recapitalized into <b>${F.votingUnits} voting</b> and <b>${F.nonVotingUnits} non-voting</b> units of ${F.totalUnits.toLocaleString('en-US')}. Economic rights per unit are identical; only the vote differs.</li>`);
  L.push(`    <li>A ${Math.round(F.discount * 100)}% combined lack-of-control and lack-of-marketability discount is asserted on the non-voting units, putting them at <b>${usd(F.perNonVoting)}</b> each against ${usd(F.perVoting)} for a voting unit. <b>No appraiser has been engaged</b> and the memorandum cites no study.</li>`);
  L.push(`    <li>She gifts <b>${F.seedUnits} non-voting units</b>, ${usd(F.seedValue)}, to the Cole 2026 Irrevocable Trust, a SLAT for David. That consumes ${usd(F.seedValue)} of her ${usd(F.exemption)} exclusion, leaving ${usd(F.exemptionLeft)}.</li>`);
  L.push(`    <li>She sells <b>${F.saleUnits} more units</b>, ${usd(F.notePrincipal)}, to the same trust for a <b>demand note</b> at ${(F.noteRate * 100).toFixed(2)}%, interest only, <b>${usd(F.noteInterest)}</b> a year. Seed is exactly 10.00% of the note. Rev. Rul. 85-13 disregards the sale for income tax.</li>`);
  L.push(`    <li>The trust applies dividends above note interest to buy Meg's remaining <b>${F.megRetainedNV} units</b> in annual tranches, reaching all ${F.nonVotingUnits} by the end of year 5 for ${usd(F.trancheCash)} of cash.</li>`);
  L.push(`  </ol>`);

  L.push(`  <table class="dt tight case-t"><tbody>`);
  L.push(`    <tr><td class="case-k"><b>Where it lands</b></td><td>Meg after closing: ${usd(F.votingUnits * F.perVoting)} of voting units + ${usd(F.megRetainedNV * F.perNonVoting)} of non-voting + ${usd(F.notePrincipal)} note = <b>${usd(F.megPostClose)}</b>, down ${usd(F.estateReduction)} from ${usd(F.cpcValue)}. That reduction has <b>two</b> components: ${usd(F.belowProRata)} of below-pro-rata transfer plus ${usd(F.retainedDiscount)} of discount on the ${F.megRetainedNV} units she kept. The trust holds ${usd(F.trustUnitsValue)} of units against the ${usd(F.notePrincipal)} note: net equity ${usd(F.trustEquity)}, equal to the seed gift exactly.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>The cash</b></td><td>The LLC distributes <b>pro rata</b>, so Meg draws on all ${F.megYear1Units} units she holds after closing: ${usd(F.megYear1Distrib)} in year 1, not ${usd(F.votingUnits * perUnitDividend)}. In years 1 through 4 the entire ${usd(F.dividend)} round-trips to her. From year 6 she holds only the voting block: ${usd(F.steadyInflow)} in against ${usd(F.steadyOutflow)} of tax and household gap, a shortfall of <b>${usd(F.steadyGap)}</b> a year.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>The burn</b></td><td>While grantor-trust status holds, Meg reports <b>100% of the LLC's income</b> whatever the trust owns. The tax she pays on the trust's share is <b>a transfer of value to the trust that consumes no exemption and is not a gift</b> (Rev. Rul. 2004-64). ${usd(F.burnYear1)} in year 1, ${usd(F.burnSteady)} a year at steady state, ${usd(F.burnCum25)} cumulative by Meg's age 89. It is the mechanism, not a cost.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>Documents</b></td><td>2011 wills and a joint revocable trust with a credit-shelter formula written for a ${usd(5000000)} exclusion and <b>no Illinois QTIP direction</b> &middot; a 2014 buy-sell, never amended, whose formula produces about <b>${usd(F.buySellFormula)}</b> against a ${usd(F.cpcValue)} indicated value &middot; a 2023 appraisal concluding <b>${usd(F.appraisal2023)}</b> with <b>no discount study</b> &middot; unexecuted 2026 drafts of the trust and note &middot; <b>no LLC agreement, no 2026 valuation, no life insurance, no Form 709 ever filed</b>.</td></tr>`);
  L.push(`    <tr><td class="case-k"><b>Charitable</b></td><td><b>No donor-advised fund has ever existed.</b> ${usd(F.givingAnnual)} a year in direct cash to four public charities. Meg chairs the ${esc(F.charityName)} and intends a <b>${usd(F.endowmentIntent)} lifetime endowment</b> to it. Undecided, unpledged, and the board has not been told.</td></tr>`);
  L.push(`  </tbody></table>`);

  /* open questions, taken from the sections CASE.md marks Open */
  L.push(`  <p class="case-h">Open in the file, and answered by no session.</p>`);
  L.push(`  <ul class="case-open">`);
  L.push(`    <li><b>Which rate governs the note.</b> &sect;7872's blended annual rate at ${(F.blendedAnnual * 100).toFixed(2)}%, which the memorandum uses, or &sect;1274's short-term AFR at ${(F.afrShort * 100).toFixed(2)}% for a note issued for property. The difference is ${usd(F.rateSpreadCost)} of interest a year. <b>No controlling authority resolves it.</b></li>`);
  L.push(`    <li><b>Whether the voting block carries a premium.</b> The memorandum values ${F.votingUnits} units holding sole voting control at pro-rata value with no adjustment.</li>`);
  L.push(`    <li><b>Whether Meg's retained non-voting units carry a discount</b> while she controls the LLC through the voting block. ${usd(F.retainedDiscount)} of the estate reduction depends on the answer.</li>`);
  L.push(`    <li><b>Whether discretionary distributions survive &sect;2036(a)(2).</b> <i>Mirowski</i> turned on mandatory distributions; the draft operating agreement makes them discretionary.</li>`);
  L.push(`    <li><b>Whether the Illinois exposure is addressed at all.</b> Neither spouse has engaged with it, and the 2011 documents contain no Illinois QTIP direction.</li>`);
  L.push(`  </ul>`);
  L.push(`  <p class="case-src">Every figure above is generated from <b>CASE.md v${esc(meta.case_version)}</b> by <code>scripts/build-case.mjs</code>. Confidence labels, authorities and the full fact set live there. Cases flagged in CASE.md Part I as settled or stipulated (<i>Karmazin</i>, <i>Woelbing</i>, <i>Davidson</i>) decided nothing and are not authority.</p>`);
  L.push(`</div>`);
  return L.join('\n') + '\n';
}
