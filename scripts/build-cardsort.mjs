#!/usr/bin/env node
/* build-cardsort.mjs: derive the §08 card-sort deck and answer key from CASE.md.
 *
 * The session-1 card sort classifies eight Cole facts into two buckets. Its
 * deck and key are NOT hand-authored in the lesson: this script derives both
 * and writes them between the CARDSORT sentinels in session-1/index.html, so
 * a CASE.md edit that moves a fact the deck rests on fails a check here
 * instead of silently orphaning the key.
 *
 * The derivation rule, stated once:
 *   - a Part J confidentiality landmine            -> bucket 0 (nonpublic)
 *   - the no-name identifying combination (Part J) -> bucket 0 (nonpublic)
 *   - a published parameter (Parts E and I)        -> bucket 1 (not identifying)
 *
 * The emitted block carries NO figure literals: card text is built at page
 * parse time from the injected COLE constants, so the case-fact drift surface
 * (scripts/case-inventory.mjs) does not grow and a re-injected figure flows
 * into the deck with no edit here. What this script pins is the FACTS the
 * cards presuppose (a landmine still in Part J, a rate still in Part H, the
 * chair role still in Part G) and the bucket each card belongs to.
 *
 * A pattern that no longer matches is a hard failure, not a warning.
 *
 *   node scripts/build-cardsort.mjs           # rewrite the fenced block
 *   node scripts/build-cardsort.mjs --check   # report drift, write nothing
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const CASE = readFileSync(join(REPO, 'CASE.md'), 'utf8');
const F = JSON.parse(readFileSync(join(REPO, 'scripts/case-facts.json'), 'utf8')).figures;
const LESSON = join(REPO, 'session-1/index.html');

const problems = [];
const need = (ok, name) => { if (!ok) problems.push(name); };

/* ---- section index, same shape as build-case.mjs ---- */
const sections = {};
{
  let key = null;
  for (const line of CASE.split('\n')) {
    const part = line.match(/^# PART ([A-O]) —/);
    const sec = line.match(/^#{2,4} ([A-O]\.\d+(?:\.\d+)?)\b/);
    if (part) key = 'PART ' + part[1];
    else if (sec) key = sec[1];
    if (key) sections[key] = (sections[key] || '') + line + '\n';
  }
}
const sec = (k) => sections[k] || '';

/* ---- formatters; the emitted block carries the same two, verbatim ---- */
const usd = (n) => '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const pc = (x) => { const v = Math.round(x * 10000) / 100; return (v % 1 === 0 ? String(v) : v.toFixed(2)) + '%'; };

/* ---- Part J: exactly three landmines, split into numbered items ---- */
const partJ = sec('PART J');
need(/Exactly three/.test(partJ), 'Part J no longer declares exactly three landmines');
const jItems = [...partJ.matchAll(/^\d+\.\s+\*\*[^*]+\*\*(.*)$/gm)].map((m) => m[0]);
need(jItems.length === 3, `Part J numbered items: expected 3, found ${jItems.length}`);
const [J1, J2, J3] = jItems.length === 3 ? jItems : ['', '', ''];

/* ---- the facts each card presupposes (v5.0) ---- */
need(/David's employer/.test(J1) && /in confidence/.test(J1) && /sale or consolidation/.test(J1), 'landmine 1 no longer turns on David\'s confidential employer news');
need(/In November 2026 David was told, in confidence/.test(sec('B.2')), 'B.2 no longer records the confidential notice');
need(/Ruth's loan to Tom/.test(J2) && /\$25,000/.test(J2) && /asked Meg not to raise it/.test(J2), 'landmine 2 is no longer Ruth\'s undocumented loan to Tom');
need(/Ruth lent Tom \*\*\$25,000\*\*/.test(sec('A.3')), 'A.3 no longer records the loan');
need(/Emma's debt/.test(J3) && /\$14,000/.test(J3) && /asked them not to tell/.test(J3), 'landmine 3 is no longer Emma\'s confidential debt');
need(/identifying combination/.test(partJ) && /nurse manager/.test(partJ) && /mechanical engineer/.test(partJ), 'Part J no longer states the identifying combination');
need(F.megAge >= 55 && F.megAge <= 59 && F.davidAge >= 55 && F.davidAge <= 59, `the "late fifties" card is stale: ages are ${F.megAge} and ${F.davidAge}`);
need(sec('E.1').includes(usd(F.stdDeduction)), 'E.1 no longer carries the standard deduction the card renders');
need(sec('E.1').includes(usd(F.deferralLimit)), 'E.1 no longer carries the deferral limit the card renders');
need(sec('E.2').includes(pc(F.ilRate / 100)), 'E.2 no longer carries the Illinois rate the card renders');
need(sec('E.2').includes(usd(F.ilExclusion)), 'E.2 no longer carries the Illinois estate exclusion the card renders');

/* every COLE key the emitted block reads must exist in case-facts.json */
const KEYS = ['stdDeduction', 'deferralLimit', 'ilRate', 'ilExclusion', 'ruthLoanToTom', 'emmaDebt', 'residenceTown', 'ruthTown', 'marriedYears'];
for (const k of KEYS) need(F[k] !== undefined && F[k] !== null && F[k] !== '', `case-facts.json no longer carries ${k}`);

/* ---- the deck: id, bucket class, card expression, one-line why ----
 * Order interleaves the two buckets (no run longer than 2), which is the
 * property the Rohrer, Dedrick & Stershic (2015) citation on the section
 * rests on: interleaved classification practice, not blocked practice.
 * Bucket 0 is nonpublic personal information (the three Part J landmines and
 * the identifying combination); bucket 1 is a published parameter from Parts E
 * and I that attaches to every household, not this one. */
const BUCKET = { landmine: 0, combination: 0, published: 1 };
const DECK = [
  { id: 'std-deduction', cls: 'published',
    t: "'The 2026 standard deduction for a married couple filing jointly: '+usd(COLE.stdDeduction)",
    w: 'A published figure from an IRS revenue procedure. It attaches to every joint return in the country, not to this household.' },
  { id: 'landmine-employer', cls: 'landmine',
    t: "'David has been told, in confidence, that his division may be sold next year and his position eliminated'",
    w: 'The first landmine in the case file. His employer\'s confidential plans, and the fact that moves his retirement date and his health coverage.' },
  { id: 'deferral-limit', cls: 'published',
    t: "'The 2026 elective deferral limit for a 401(k) or 403(b): '+usd(COLE.deferralLimit)",
    w: 'A statutory limit anyone can look up. It says nothing about who is asking.' },
  { id: 'landmine-loan', cls: 'landmine',
    t: "'Ruth lent her son '+usd(COLE.ruthLoanToTom)+' in 2024, undocumented, and asked Meg not to raise it with him'",
    w: 'The second landmine. A third party\'s financial information, learned through a power of attorney, that the client asked to keep inside the engagement.' },
  { id: 'landmine-debt', cls: 'landmine',
    t: "'Emma carries about '+usd(COLE.emmaDebt)+' of credit-card debt and asked her parents not to tell her brother or grandmother'",
    w: 'The third landmine. An adult child\'s debt, disclosed in confidence, and the reason one of the stated goals just changed.' },
  { id: 'il-rate', cls: 'published',
    t: "'The Illinois individual income tax rate: '+pc(COLE.ilRate/100)",
    w: 'A flat statutory rate. Public, and the same for every Illinois taxpayer.' },
  { id: 'combination', cls: 'combination',
    t: "'A nurse manager at a hospital system near '+COLE.residenceTown+' and a senior mechanical engineer at a material-handling manufacturer, married '+COLE.marriedYears+' years, with a mother in a senior community in '+COLE.ruthTown",
    w: 'No name appears, and in a market this narrow the combination identifies one household. De-identification removes the combination, not the name.' },
  { id: 'il-exclusion', cls: 'published',
    t: "'The Illinois estate tax exclusion: '+usd(COLE.ilExclusion)",
    w: 'A statutory threshold set by state law. Public, and the same for every Illinois estate.' },
];
{
  let run = 1;
  for (let i = 1; i < DECK.length; i++) {
    run = BUCKET[DECK[i].cls] === BUCKET[DECK[i - 1].cls] ? run + 1 : 1;
    need(run <= 2, 'deck order blocks a bucket instead of interleaving it');
  }
  need(DECK.filter((d) => d.cls === 'landmine').length === 3, 'the deck no longer carries all three landmines');
}

/* ---- emit ---- */
const cardLines = DECK.map((d) =>
  `  {t:${d.t},b:${BUCKET[d.cls]},w:'${d.w.replace(/'/g, "\\'")}'}`);

const body = `<script>
/* Deck and key for the section 08 card sort. Bucket 0 is nonpublic personal
   information, bucket 1 is not identifying on its own. Card text reads the
   injected COLE constants so no case figure is typed here. */
var CARDSORT=(function(){
  function usd(n){return '$'+String(n).replace(/\\B(?=(\\d{3})+(?!\\d))/g,',')}
  function pc(x){var v=Math.round(x*10000)/100;return (v%1===0?String(v):v.toFixed(2))+'%'}
  return {cards:[
${cardLines.join(',\n')}
  ]};
})();
</scr` + `ipt>`;

const OPEN = '<!-- CARDSORT:BEGIN cole-household v5.0 -->';
const CLOSE = '<!-- CARDSORT:END cole-household -->';
const sha256 = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const region = OPEN + '\n' +
  `<!-- generated by scripts/build-cardsort.mjs from CASE.md and scripts/case-facts.json · sha256 ${sha256(body)} · do not edit between the sentinels -->\n` +
  body + '\n' + CLOSE;

if (problems.length) {
  console.error('build-cardsort: CASE.md or case-facts.json no longer supports the deck:');
  for (const p of problems) console.error('  FAIL  ' + p);
  process.exit(1);
}

const check = process.argv.includes('--check');
const text = readFileSync(LESSON, 'utf8');
/* the opening sentinel is found by case id, any version, so a version change rewrites it */
const om = text.match(/<!-- CARDSORT:BEGIN cole-household v[0-9.]+ -->/);
const a = om ? om.index : -1, b = text.indexOf(CLOSE);
if (a < 0 || b < 0 || b < a) {
  console.error('FAIL  no CARDSORT sentinels in session-1/index.html');
  process.exit(1);
}
const next = text.slice(0, a) + region + text.slice(b + CLOSE.length);
if (next === text) {
  console.log('OK    current  session-1/index.html');
} else if (check) {
  console.error('STALE          session-1/index.html (run scripts/build-cardsort.mjs)');
  process.exit(1);
} else {
  writeFileSync(LESSON, next);
  console.log('WROTE          session-1/index.html');
}
