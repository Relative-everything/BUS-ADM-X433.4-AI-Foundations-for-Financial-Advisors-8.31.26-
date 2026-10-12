#!/usr/bin/env node
/**
 * verify-migration.mjs — the CASE.md migration battery (v5.0 since 2026-10-11), run programmatically.
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
/* DW-015: check 1b needs region offsets, so R6 and R10 are excluded by what they
   ARE rather than by which file they sit in. */
import { classify } from './editorial-regions.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = ['index.html', 'session-0.1/index.html', 'session-1/index.html',
                 'session-2/index.html', 'session-3/index.html', 'session-4/index.html',
                 'session-5/index.html'];
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
/**
 * Files where naming a retired string is a RECORD OF ITS REMOVAL rather than an
 * assertion of it. Same standing as CASE.md Part K's conditional-allowances
 * table. Anything under audit/ qualifies by definition: an audit that cannot
 * name what it retired is not an audit.
 */
const isRegister = (rel) => rel.startsWith('audit/') || rel.startsWith('docs/next-term/') || REGISTER.has(rel);
const REGISTER = new Set(['CASE.md', 'CHANGELOG.md', 'changelog/index.html',
                          'docs/probe-captures.md', 'docs/live-model-console-plan.md',
                          /* this file names every retired string in order to search for it */
                          'scripts/verify-migration.mjs',
                          /* the spine brief's section 1 is an inventory of the retired framing
                             question, so it necessarily quotes it. Same standing as CASE.md
                             Part K: a register of what was removed, not an assertion of it.
                             It is instructor-facing and ships in no lesson. */
                          'docs/spine-brief.md',
                          /* the editorial gap report's verification-surface section quotes this
                             file's own check descriptions, which necessarily name every retired
                             string they search for. Same standing as the spine brief: a record
                             of the retirement, not an assertion of it. Instructor-facing, ships
                             in no lesson. */
                          'docs/editorial-gap-report.md',
                          /* the plan file's phase records name every retired string they record
                             the retirement OF — §16's conflict table quotes "nine-year interest-only
                             balloon" and the rubric that matched on it. Same standing as the spine
                             brief and the gap report: instructor-facing, ships in no lesson, and a
                             record that cannot name what it retired is not a record. */
                          'docs/repo-updates-plan.md']);

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
  /* ADDED 2026-08-25 (Phase 3.5). Part K retires "nine-year interest-only
     balloon" as one composite row and the target list carried none of its
     words, so session-2 still described the proposed note as "an interest-only
     note with a balloon" two migrations later. The note is payable on demand. */
  ['balloon', /\bballoon\b/gi],
];
/* ---- 1c  the v4 layer, over the SERVED surface ------------------------------
   ADDED 2026-10-11 (CASE.md v5.0, next-term-2027 Phase 3). Every v4 name, place,
   firm, instrument, figure and authority that CASE.md Part K retires. Unlike
   check 1 (the v3 strings, whole tree), this layer is scoped the way the
   standing purge list is scoped (MAINTAINING.md): the hub, the lessons, the
   case pages, the instructor notes, README.md and SOURCES.md. Every other file
   that names a v4 fact is a record of the household that was taught in Fall
   2026 (docs/changes/, docs/audits/, the audit reports, the governance files,
   this script) and keeps it. Dollar figures match with or without the
   separator. */
const RETIRED_V4 = [
  ['Cole Precision', /Cole Precision/gi], ['CPC', /\bCPC\b/g], ['Hensley', /Hensley/g],
  ['Walter', /\bWalter\b/g], ['Claire', /\bClaire\b/g], ['Nathan', /\bNathan\b/g], ['Whitaker', /Whitaker/g],
  ['Barrington', /Barrington/g], ['Rockford', /Rockford/g], ['Winnebago', /Winnebago/g],
  ['Lakeshore Industrial', /Lakeshore Industrial/g], ['Merrit', /\bMerrit\b/g], ['Ostrander', /Ostrander/g],
  ['Corbin', /\bCorbin\b/g], ['Halvorsen', /Halvorsen/g], ['Cole Family Holdings', /Cole Family Holdings/g],
  ['Irrevocable Trust', /Irrevocable Trust/g], ['IDGT', /\bIDGT\b/g], ['SLAT', /\bSLAT\b/g],
  ['grantor trust', /grantor[- ]trust/gi], ['installment sale', /installment sale/gi], ['seed gift', /seed gift/gi],
  ['demand note', /demand note/gi], ['the burn', /\bthe burn\b/gi], ['non-voting', /non-?voting/gi],
  ['voting unit', /voting unit/gi], ['aerospace', /aerospace/gi], ['fastener', /fastener/gi],
  ['buy-sell', /buy-?sell/gi], ['appraisal', /\bappraisal/gi], ['endowment', /\bendowment/gi],
  ['$55,000,000', new RegExp(NB + '(?:55,000,000|55000000)' + NA, 'g')],
  ['$67,000,000', new RegExp(NB + '(?:67,000,000|67000000)' + NA, 'g')],
  ['$20,020,000', new RegExp(NB + '(?:20,020,000|20020000)' + NA, 'g')],
  ['$2,002,000', new RegExp(NB + '(?:2,002,000|2002000)' + NA, 'g')],
  ['$38,500', new RegExp(NB + '(?:38,500|38500)' + NA, 'g')],
  ['$764,764', new RegExp(NB + '(?:764,764|764764)' + NA, 'g')],
  ['$16,852,000', new RegExp(NB + '(?:16,852,000|16852000)' + NA, 'g')],
  ['$38,148,000', new RegExp(NB + '(?:38,148,000|38148000)' + NA, 'g')],
  ['$12,628,000', new RegExp(NB + '(?:12,628,000|12628000)' + NA, 'g')],
  ['$1,437,500', new RegExp(NB + '(?:1,437,500|1437500)' + NA, 'g')],
  ['$522,086', new RegExp(NB + '(?:522,086|522086)' + NA, 'g')],
  ['$349,350', new RegExp(NB + '(?:349,350|349350)' + NA, 'g')],
  ['$5,644,790', new RegExp(NB + '(?:5,644,790|5644790)' + NA, 'g')],
  ['$43,290', new RegExp(NB + '(?:43,290|43290)' + NA, 'g')],
  ['$14,000,000', new RegExp(NB + '(?:14,000,000|14000000)' + NA, 'g')],
  ['$42,400,000', new RegExp(NB + '(?:42,400,000|42400000)' + NA, 'g')],
  ['$9,170,000', new RegExp(NB + '(?:9,170,000|9170000)' + NA, 'g')],
  ['$2,500,000', new RegExp(NB + '(?:2,500,000|2500000)' + NA, 'g')],
  ['$1,550,000', new RegExp(NB + '(?:1,550,000|1550000)' + NA, 'g')],
  ['$38,000,000', new RegExp(NB + '(?:38,000,000|38000000)' + NA, 'g')],
  ['$18,000,000', new RegExp(NB + '(?:18,000,000|18000000)' + NA, 'g')],
  ['$5,180,000', new RegExp(NB + '(?:5,180,000|5180000)' + NA, 'g')],
  ['$1,850,000', new RegExp(NB + '(?:1,850,000|1850000)' + NA, 'g')],
  ['$1,340,000', new RegExp(NB + '(?:1,340,000|1340000)' + NA, 'g')],
  ['$118,000', new RegExp(NB + '(?:118,000|118000)' + NA, 'g')],
  ['$950,000', new RegExp(NB + '(?:950,000|950000)' + NA, 'g')],
  ['$930,000', new RegExp(NB + '(?:930,000|930000)' + NA, 'g')],
  ['$780,000', new RegExp(NB + '(?:780,000|780000)' + NA, 'g')],
  ['$450,000', new RegExp(NB + '(?:450,000|450000)' + NA, 'g')],
  ['$600,000', new RegExp(NB + '(?:600,000|600000)' + NA, 'g')],
  ['$250,650', new RegExp(NB + '(?:250,650|250650)' + NA, 'g')],
  ['$1,250,000', new RegExp(NB + '(?:1,250,000|1250000)' + NA, 'g')],
  ['$52,000', new RegExp(NB + '(?:52,000|52000)' + NA, 'g')],
  ['$41,000', new RegExp(NB + '(?:41,000|41000)' + NA, 'g')],
  ['$58,500', new RegExp(NB + '(?:58,500|58500)' + NA, 'g')],
  ['$45,249', new RegExp(NB + '(?:45,249|45249)' + NA, 'g')],
  ['$47,393', new RegExp(NB + '(?:47,393|47393)' + NA, 'g')],
  ['$49,751', new RegExp(NB + '(?:49,751|49751)' + NA, 'g')],
  ['$52,356', new RegExp(NB + '(?:52,356|52356)' + NA, 'g')],
  ['$49,500,000', new RegExp(NB + '(?:49,500,000|49500000)' + NA, 'g')],
  ['$34,650,000', new RegExp(NB + '(?:34,650,000|34650000)' + NA, 'g')],
  ['$14,850,000', new RegExp(NB + '(?:14,850,000|14850000)' + NA, 'g')],
  ['$5,500,000', new RegExp(NB + '(?:5,500,000|5500000)' + NA, 'g')],
  ['$22,022,000', new RegExp(NB + '(?:22,022,000|22022000)' + NA, 'g')],
  ['$11,440,000', new RegExp(NB + '(?:11,440,000|11440000)' + NA, 'g')],
  ['$5,412,000', new RegExp(NB + '(?:5,412,000|5412000)' + NA, 'g')],
  ['$32,648,000', new RegExp(NB + '(?:32,648,000|32648000)' + NA, 'g')],
  ['$946,197', new RegExp(NB + '(?:946,197|946197)' + NA, 'g')],
  ['$1,264,764', new RegExp(NB + '(?:1,264,764|1264764)' + NA, 'g')],
  ['$1,786,850', new RegExp(NB + '(?:1,786,850|1786850)' + NA, 'g')],
  ['$2,140,000', new RegExp(NB + '(?:2,140,000|2140000)' + NA, 'g')],
  ['$2,860,000', new RegExp(NB + '(?:2,860,000|2860000)' + NA, 'g')],
  ['$3,213,150', new RegExp(NB + '(?:3,213,150|3213150)' + NA, 'g')],
  ['$2,266,953', new RegExp(NB + '(?:2,266,953|2266953)' + NA, 'g')],
  ['$4,053,803', new RegExp(NB + '(?:4,053,803|4053803)' + NA, 'g')],
  ['$2,095,236', new RegExp(NB + '(?:2,095,236|2095236)' + NA, 'g')],
  ['$2,367,345', new RegExp(NB + '(?:2,367,345|2367345)' + NA, 'g')],
  ['$2,674,792', new RegExp(NB + '(?:2,674,792|2674792)' + NA, 'g')],
  ['$3,022,167', new RegExp(NB + '(?:3,022,167|3022167)' + NA, 'g')],
  ['$3,414,657', new RegExp(NB + '(?:3,414,657|3414657)' + NA, 'g')],
  ['$2,468,460', new RegExp(NB + '(?:2,468,460|2468460)' + NA, 'g')],
  ['$820,579', new RegExp(NB + '(?:820,579|820579)' + NA, 'g')],
  ['$1,213,069', new RegExp(NB + '(?:1,213,069|1213069)' + NA, 'g')],
  ['$1,560,444', new RegExp(NB + '(?:1,560,444|1560444)' + NA, 'g')],
  ['$1,867,891', new RegExp(NB + '(?:1,867,891|1867891)' + NA, 'g')],
  ['$3,132,109', new RegExp(NB + '(?:3,132,109|3132109)' + NA, 'g')],
  ['$3,439,556', new RegExp(NB + '(?:3,439,556|3439556)' + NA, 'g')],
  ['$3,786,931', new RegExp(NB + '(?:3,786,931|3786931)' + NA, 'g')],
  ['$4,179,421', new RegExp(NB + '(?:4,179,421|4179421)' + NA, 'g')],
  ['$900,481', new RegExp(NB + '(?:900,481|900481)' + NA, 'g')],
  ['$988,872', new RegExp(NB + '(?:988,872|988872)' + NA, 'g')],
  ['$1,088,743', new RegExp(NB + '(?:1,088,743|1088743)' + NA, 'g')],
  ['$1,201,583', new RegExp(NB + '(?:1,201,583|1201583)' + NA, 'g')],
  ['$1,293,750', new RegExp(NB + '(?:1,293,750|1293750)' + NA, 'g')],
  ['$822,250', new RegExp(NB + '(?:822,250|822250)' + NA, 'g')],
  ['$5,001,930', new RegExp(NB + '(?:5,001,930|5001930)' + NA, 'g')],
  ['$11,470,680', new RegExp(NB + '(?:11,470,680|11470680)' + NA, 'g')],
  ['$24,408,180', new RegExp(NB + '(?:24,408,180|24408180)' + NA, 'g')],
  ['$30,876,930', new RegExp(NB + '(?:30,876,930|30876930)' + NA, 'g')],
  ['$12,998,000', new RegExp(NB + '(?:12,998,000|12998000)' + NA, 'g')],
  ['$820,820', new RegExp(NB + '(?:820,820|820820)' + NA, 'g')],
  ['$56,056', new RegExp(NB + '(?:56,056|56056)' + NA, 'g')],
  ['$16,700', new RegExp(NB + '(?:16,700|16700)' + NA, 'g')],
  ['$38,200', new RegExp(NB + '(?:38,200|38200)' + NA, 'g')],
  ['$19,250', new RegExp(NB + '(?:19,250|19250)' + NA, 'g')],
  ['$8,000,000', new RegExp(NB + '(?:8,000,000|8000000)' + NA, 'g')],
  ['$690,000', new RegExp(NB + '(?:690,000|690000)' + NA, 'g')],
  ['$3,000,000 IRA', /\$3,000,000 (?:traditional )?IRA/g],
  ['$1,000,000 inherited IRA', /\$1,000,000 inherited IRA|inherited IRA of \$1,000,000/g],
  ['3.82%', /(?<![0-9.])3\.82\s*(?:%|&#37;)/g], ['4.35%', /(?<![0-9.])4\.35\s*(?:%|&#37;)/g],
  ['4.92%', /(?<![0-9.])4\.92\s*(?:%|&#37;)/g], ['5.20%', /(?<![0-9.])5\.20\s*(?:%|&#37;)/g],
  ['28.75%', /(?<![0-9.])28\.75\s*(?:%|&#37;)/g], ['41.95%', /(?<![0-9.])41\.95\s*(?:%|&#37;)/g],
  ['24.06%', /(?<![0-9.])24\.06\s*(?:%|&#37;)/g], ['63.56%', /(?<![0-9.])63\.56\s*(?:%|&#37;)/g],
  ['57.2%', /(?<![0-9.])57\.2\s*(?:%|&#37;)/g], ['32.8%', /(?<![0-9.])32\.8\s*(?:%|&#37;)/g],
  ['6.45%', /(?<![0-9.])6\.45\s*(?:%|&#37;)/g], ['9.09%', /(?<![0-9.])9\.09\s*(?:%|&#37;)/g],
  ['82.1%', /(?<![0-9.])82\.1\s*(?:%|&#37;)/g],
  ['Rev. Rul. 2004-64', /2004-64/g], ['Rev. Rul. 85-13', /\b85-13\b/g], ['Rev. Rul. 86-17', /\b86-17\b/g],
  ['Rev. Rul. 2026-13', /Rev\.? ?Rul\.? 2026-13|2026-13, Table/g], ['Rev. Rul. 2026-12', /Rev\.? ?Rul\.? 2026-12|2026-12, Table/g],
  ['Rev. Rul. 2004-77', /2004-77/g], ['Rev. Rul. 93-12', /\b93-12\b/g], ['Rev. Rul. 59-60', /\b59-60\b/g], ['Rev. Rul. 77-287', /77-287/g],
  ['T.D. 9884', /9884/g], ['25.2704', /25\.2704/g], ['2701', new RegExp(NB + '2701' + NA, 'g')], ['675(4)', /675\(4\)/g], ['2036(a)', /2036\(a\)/g],
  ['Byrum', /\bByrum\b/g], ['Strangi', /Strangi/g], ['Bongard', /Bongard/g], ['Holman', /\bHolman\b/g], ['Senda', /\bSenda\b/g],
  ['Cahill', /\bCahill\b/g], ['Connelly', /Connelly/g], ['Powell', /\bPowell\b/g],
  ['805 ILCS 180', /805 ILCS 180/g], ['760 ILCS 3', /760 ILCS 3\b/g], ['HB 2601', /HB ?2601/g],
  ['Cole Joint Revocable Trust', /Cole Joint Revocable Trust/g], ['Rockford Workforce', /Rockford Workforce/g], ['FBO Margaret Cole', /FBO Margaret Cole/g],
  ['AS9100D', /AS9100D/g], ['ITAR', /\bITAR\b/g], ['DDTC', /\bDDTC\b/g], ['NAICS 332722', /332722/g],
  ['credit-shelter', /credit[- ]shelter/gi], ['QTIP', /\bQTIP\b/g], ['Article VII', /Article VII\b/g], ['Article IX', /Article IX\b/g],
  ['1 July 2016', /1 July 2016/g], ['4 November 2021', /4 November 2021/g], ['30 May 2014', /30 May 2014/g], ['22 March 2011', /22 March 2011/g],
  ['12 September 2023', /12 September 2023/g], ['19 February 2026', /19 February 2026/g], ['12 March 2026', /12 March 2026/g],
  ['8 October 2025', /8 October 2025/g], ['6 April 2026', /6 April 2026/g], ['30 June 2026', /30 June 2026/g], ['31 July 2026', /31 July 2026/g],
  ['21 September 1991', /21 September 1991/g], ['3 February 1987', /3 February 1987/g],
  ['Mirowski', /Mirowski/g], ['Karmazin', /Karmazin/g], ['Woelbing', /Woelbing/g], ['Davidson', /\bDavidson\b/g],
  ['IRC 1274', /(?:§\s*|IRC\s*§?\s*|[Ss]ection\s+)1274\b/g], ['IRC 7520', /(?:§\s*|IRC\s*§?\s*|[Ss]ection\s+)7520\b/g],
  ['2036(a)(2)', /2036\(a\)\(2\)/g],
];
function servedFiles() {
  const out = [...LESSONS, 'README.md', 'SOURCES.md'];
  for (const p of ALL) {
    const r = rel(p);
    if (/^cases\/[^/]+\.html$/.test(r) || /^instructor-notes\/[^/]+\.(md|htm|html)$/.test(r)) out.push(r);
  }
  return [...new Set(out)];
}
{
  const bad = [];
  for (const r of servedFiles()) {
    const t = text(join(REPO, r));
    for (const [label, rx] of RETIRED_V4) {
      rx.lastIndex = 0;
      let m; while ((m = rx.exec(t))) {
        const around = t.slice(Math.max(0, m.index - 40), m.index + 60);
        bad.push(`${r}:${t.slice(0, m.index).split('\n').length}  ${label}  ...${around.replace(/\s+/g, ' ').trim().slice(0, 90)}...`);
      }
    }
  }
  const byFile = {};
  for (const b of bad) { const f = b.split(':')[0]; byFile[f] = (byFile[f] || 0) + 1; }
  check('1c', 'v4 Cole facts purged from the served surface (Part K v5 layer: hub, lessons, cases, instructor notes, README, SOURCES)',
        bad.length === 0, bad.length ? Object.entries(byFile).map(([f, n]) => `${f}: ${n} hit(s)`).join('\n') + '\n' + bad.slice(0, 12).join('\n') + (bad.length > 12 ? `\n... ${bad.length - 12} more` : '') : '');
}

{
  const bad = [];
  for (const p of ALL) {
    const r = rel(p); if (isRegister(r)) continue;
    /* Binary files are not prose: a compressed byte run can spell a retired
       figure by chance (the session-5 teaching-aid PDF did, 2026-10-02). The
       PDFs' text is the .htm beside each one, which this scan does read. */
    if (/\.(pdf|png|jpe?g|gif|webp|woff2?|ttf|ico)$/i.test(r)) continue;
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

/* ---- 1b  retired framings that are only wrong ABOUT A PARTICULAR SUBJECT --- */
/* DW-015. Check 1 is a blanket ban and check 4 is a permission test, and two
   framings fall between them. `founder` is correct of Walter Hensley and wrong
   of Meg; `nine-year` is correct of the 2016 installment note and wrong of the
   proposed demand note. Neither can go in the RETIRED list, because the word
   itself is legitimate. Neither is reliably caught by check 4 either: that test
   passes a match as soon as ANY permitting word appears within 240 characters
   either side, and a paragraph that discusses Walter's 2016 purchase AND calls
   Meg the founder contains "Walter" and "2016" and passes.

   This check inverts the question. Instead of asking whether a permitting
   subject is nearby, it asks whether the FORBIDDEN subject is. Both tests are
   needed: check 4 catches the use with no legitimate subject anywhere near it,
   this catches the use sitting right beside the subject it is wrong about.

   R6 and R10 are excluded by offset, not by filename. The injected CASE span is
   owned by verify-case.mjs, and a captured transcript is verbatim third-party
   output that may not be edited to satisfy a content rule — session-0.1's AFR
   captures carry "9-year" inside `base:` strings for exactly that reason. */
{
  const MISAPPLIED = [
    /* v5.0: no Cole founded anything, inherited a company or sold one. The word
       "founder" is legitimate of a vendor ("the founder of OpenAI"); next to a
       Cole it is a v4 survival. */
    ['founder applied to a Cole', /\bfound(?:er|ed|ing)\b/gi, /\bCole\b|\bMeg\b|\bDavid\b/i,
     'no Cole founded, bought or sold a company in v5.0 (CASE.md Part K)'],
    ['inherited IRA applied to Meg today', /inherited IRA/gi, /\bMeg\b.{0,80}(?:holds|has|her)\b|her inherited IRA/i,
     'Meg holds no inherited IRA in v5.0; Ruth\'s IRA names her and Ruth is alive (§A.3, §F.6)'],
  ];

  const bad = [];
  for (const l of LESSONS) {
    const t = text(join(REPO, l));
    const c = classify(t);
    for (const [label, rx, subjRx, why] of MISAPPLIED) {
      rx.lastIndex = 0;
      let m;
      while ((m = rx.exec(t))) {
        const region = c.regionOf(m.index);
        if (region === 'R6' || region === 'R10') continue;
        const around = t.slice(Math.max(0, m.index - 160), m.index + 160);
        if (!subjRx.test(around)) continue;
        bad.push(`${l}:${t.slice(0, m.index).split('\n').length}  ${label}  (${why})\n    ...${around.replace(/\s+/g, ' ').slice(90, 250)}...`);
      }
    }
  }
  check('1b', 'Retired framings not applied to the subject they are wrong about',
        bad.length === 0, bad.slice(0, 10).join('\n'));
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
    if (isRegister(r)) continue;
    const t = text(p);
    for (const rx of rxs) { rx.lastIndex = 0; let m;
      while ((m = rx.exec(t))) bad.push(`${r}:${t.slice(0, m.index).split('\n').length}  ${m[0]}`); }
  }
  check(id, name, bad.length === 0, bad.slice(0, 10).join('\n'));
}

/* ---- 4  conditional allowances, checked in context ----------------------- */
{
  const ALLOW = [
    /* v5.0 (CASE.md Part K, conditional allowances) */
    ['$1,000,000', new RegExp(NB + '(?:1,000,000|1000000)' + NA, 'g'),
     /umbrella|liability|1M|context window|million tokens|tokens|million-token|a million/i, 'the umbrella liability limit (§H.3) or a token count; never an account balance'],
    ['$4,000,000', new RegExp(NB + '(?:4,000,000|4000000)' + NA, 'g'),
     /Illinois|estate|exclusion/i, 'the Illinois estate tax exclusion'],
    ['$15,000,000', new RegExp(NB + '(?:15,000,000|15000000)' + NA, 'g'),
     /exclusion|basic exclusion|federal estate|gift/i, 'the federal basic exclusion amount'],
    ['7872', new RegExp(NB + '7872' + NA, 'g'),
     /10,000|100,000|gift loan|loan to Tom|Ruth|threshold|below-market/i, 'the two gift-loan thresholds, for the Session 1 correction and Ruth\'s loan (§J)'],
    ['Rev. Proc. 2022-32', /2022-32/g,
     /portability|late election|fifth anniversary|Form 706/i, 'the late portability election, for the Session 2 correction'],
    ['$25,000', new RegExp(NB + '(?:25,000|25000)' + NA, 'g'), /Ruth|Tom|loan|lent|landmine/i, 'Ruth\'s loan to Tom (§A.3, §J)'],
    ['$35,000', new RegExp(NB + '(?:35,000|35000)' + NA, 'g'), /529|Roth|lifetime|rollover/i, 'the 529-to-Roth lifetime limit (§E.1)'],
    ['$410,000', new RegExp(NB + '(?:410,000|410000)' + NA, 'g'), /IRMAA|MAGI|Medicare|tier|premium/i, 'the fourth IRMAA tier bound (§F.3)'],
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
  for (const composed of [F.megDeferral + F.davidDeferral]) known.add(String(composed));
  const orphan = [...new Set(nums)].filter((n) => !known.has(n));
  check('7', 'Extract fidelity: every figure traces to case-facts.json or a shown computation',
        orphan.length === 0, orphan.length ? 'untraceable: ' + orphan.join(', ') : `${new Set(nums).size} distinct figures, all traced`);
  const forbidden = ['Part H', 'Part I', 'Part M', 'Karmazin v', 'applicable federal rate table'];
  check('7b', 'Extract is a fraction: Parts E, F (parameters), I and M are not reproduced',
        !/## E\.|## F\.|## I\.|## M\b|Rev\. Proc\. 2025-32|Notice 2025-67/.test(extract), '');
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
  const r1 = (x) => Math.round(x * 10) / 10;
  eq('investable', F.meg403b + F.megRoth + F.david401k + F.davidRoth + F.davidRollover + F.brokerage + F.hsa + F.cash + F.plan529, F.investable);
  eq('net worth', F.investable + F.residence - F.mortgage, F.netWorth);
  eq('pre-tax total', F.meg403b + F.david401kPre + F.davidRollover, F.preTaxTotal);
  eq('Roth total', F.megRoth + F.david401kRoth + F.davidRoth, F.rothTotal);
  eq('taxable total', F.brokerage + F.cash, F.taxableTotal);
  eq('character sum', F.preTaxTotal + F.rothTotal + F.taxableTotal + F.hsa + F.plan529, F.investable);
  eq('pre-tax share', r1(F.preTaxTotal / F.investable * 100), F.preTaxPct);
  eq('wages', F.megW2 + F.davidW2, F.wages);
  eq('deferral', F.deferralLimit + F.catchUp, F.megDeferral);
  eq('AGI', F.wages - F.preTaxDeductions + F.investmentIncome, F.agi);
  eq('taxable income', F.agi - F.stdDeduction, F.taxableIncome);
  eq('24% room', F.bracket24 - F.taxableIncome, F.bracketRoom);
  eq('Illinois tax', Math.round(F.ilRate / 100 * (F.agi - 4 * F.ilExemption - F.contrib529)), F.ilTax);
  eq('after-tax cash', F.wages - F.megDeferral - F.davidDeferral - F.hsaEmployee - F.fedTax - F.niit - F.ilTax - F.payrollTaxes, F.afterTaxCash);
  eq('mortgage annual', F.mortgagePayment * 12, F.mortgageAnnual);
  eq('total outflow', F.mortgageAnnual + F.propertyTax + F.pcPremiums + F.megTermPremium + F.emmaSupport + F.contrib529 + F.travel + F.otherLiving, F.totalOutflow);
  eq('ESPP concentration', r1(F.esppValue / F.brokerage * 100), F.esppPct);
  eq('home gain', F.residence - F.homeBasis, F.homeGain);
  eq('Ruth assets', F.ruthIra + F.ruthSavings, F.ruthTotal);
  eq('Ruth RMD', Math.round(F.ruthIraPriorYear / F.ruthRmdFactor), F.ruthRmd2026);
  eq('David first RMD year', 1967 + F.davidApplicableAge, F.davidFirstDistYear);
  eq('Meg first RMD year', 1968 + F.megApplicableAge, F.megFirstDistYear);
  eq('Meg window', F.megWindowEnd - F.megWindowStart + 1, F.megWindowYears);
  eq('David window', F.davidWindowEnd - F.davidWindowStart + 1, F.davidWindowYears);
  eq('David group life', 2 * F.davidW2, F.davidGroupLife);
  eq('death benefits', F.davidGroupLife + F.megGroupLife + F.megTermLife, F.deathBenefits);
  eq('estate plus insurance', F.netWorth + F.deathBenefits, F.estatePlusInsurance);
  eq('risk gap', F.davidRiskScore - F.megRiskScore, F.riskGap);
  check('11', `Rendered arithmetic recomputed in Node (28 identities) against CASE.md Part M`,
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


/* ---- 20  case figures written as literals in hand-edited prose ------------ */
/* The generated block reads every figure from case-facts.json. The recurring
   question also appears in hand-written prose in three lessons, where the
   figures are literals. Those are the ones that can drift silently when CASE.md
   changes, so each is pinned to its fact here. Add a row whenever a case figure
   is typed into prose rather than generated. */
/* A pin is [regex, key, label, transform?]. `transform` maps the case-facts
   value into the form the prose prints, so a PERCENTAGE can be pinned as
   readily as a dollar amount. Without it, the 3.82% in the recurring question
   was the only figure on that line with no guard while the three dollar
   amounts beside it all had one. Added 2026-08-25, Phase 3.5. */
{
  const PINS = [
    /* the recurring question (inject-case.mjs .case-spine), v5.0 */
    [/The Coles hold (?:<(?:b|strong)>)?\$([0-9,]+)(?:<\/(?:b|strong)>)? in pre-tax accounts/g, 'preTaxTotal', 'the pre-tax total in the recurring question'],
    [/in pre-tax accounts, (?:<(?:b|strong)>)?([0-9.]+)%(?:<\/(?:b|strong)>)? of what they have/g, 'preTaxPct', 'the pre-tax share in the recurring question', (v) => v],
    [/Meg (\d{4}) to \d{4}, David \d{4} to \d{4}\./g, 'megWindowStart', 'the first year of Meg\'s window in the recurring question', null, ''],
    [/the 24% bracket has \$([0-9,]+) of room in 2026/g, 'bracketRoom', 'the 24% bracket room in the recurring question'],
    /* Phase 4b adds a pin here for every v5 figure a lesson types into prose
       rather than reading from COLE; the v4 session-4 §08 exhibit pins were
       retired with the exhibits they pinned. */
  ];

  const bad = [], seen = [];
  for (const l of LESSONS) {
    const raw = readFileSync(join(REPO, l), 'utf8');
    const a = raw.indexOf('<!-- CASE:BEGIN'), b = raw.indexOf('<!-- CASE:END');
    /* prose only: everything outside the generated region */
    const prose = a >= 0 && b > a ? raw.slice(0, a) + raw.slice(b) : raw;
    for (const [rx, key, label, xform, unit] of PINS) {
      rx.lastIndex = 0; let m;
      while ((m = rx.exec(prose))) {
        const got = Number(m[1].replace(/,/g, ''));
        const want = xform ? xform(F[key]) : F[key];
        /* `unit` overrides: a unit count is neither dollars nor per cent. */
        const show = (n) => (unit !== undefined && unit !== null
          ? `${n.toLocaleString('en-US')}${unit}`
          : xform ? `${n}%` : `$${n.toLocaleString('en-US')}`);
        seen.push(`${l}: ${label} = ${show(got)}`);
        if (got !== want) bad.push(`${l}: ${label} reads ${show(got)}, case-facts.json says ${show(want)}`);
      }
    }
  }
  check('20', 'Case figures typed into prose match case-facts.json (spine drift guard)',
        bad.length === 0, bad.length ? bad.join('\n') : `${seen.length} pinned figure(s) checked, all agree:\n` + seen.join('\n'));
}

console.log(report.join('\n'));
console.log(`\nsummary: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
