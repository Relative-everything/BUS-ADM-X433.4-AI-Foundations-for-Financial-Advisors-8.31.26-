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
 *   - the no-name identifying combination (A/B)    -> bucket 0 (nonpublic)
 *   - a published rate or statutory amount (Part H)-> bucket 1 (not identifying)
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

/* ---- the facts each card presupposes ---- */
need(/Nathan/.test(J1) && /does not know|has not been told|has not seen/.test(J1), 'landmine 1 no longer turns on what Nathan has not been told');
need(/competitor|approached/.test(J1), 'landmine 1 no longer involves the competitor approach');
need(/unsolicited written inquiry/.test(sec('B.6')) && /Nathan has not been told/.test(sec('B.6')), 'B.6 no longer records the untold inquiry');
need(/privileged|attorney memorandum/.test(J2) && /discount/.test(J2), 'landmine 2 is no longer the privileged discount position');
need(/Attorney-client privileged/.test(sec('PART F')), 'F.8 is no longer marked privileged');
need(/endow/.test(J3) && /board has not been told/i.test(J3), 'landmine 3 is no longer the untold endowment intent');
need(/\*\*Chair\*\*/.test(sec('PART G')), 'Part G no longer records the chair role');
need(sec('PART G').includes(usd(F.endowmentIntent)), 'the endowment figure has left Part G');
need(F.megAge >= 60 && F.megAge <= 69, `the "in her sixties" card is stale: megAge is ${F.megAge}`);
need(/Precision aerospace fasteners/.test(sec('B.1')), 'B.1 no longer states the aerospace-fastener business line');
need(sec('B.1').includes(F.plantTown), 'B.1 no longer places the business in the plant town');
need(/Meg purchases all 1,000 shares from Walter/.test(sec('B.2')), 'B.2 no longer records the purchase from Walter');
need(/Meg's father/.test(sec('A.3')), 'A.3 no longer records Walter as her father');
need(sec('H.3').includes(pc(F.blendedAnnual)), 'H.3 no longer carries the blended annual rate the card renders');
need(sec('H.2').includes(pc(F.rate7520)), 'H.2 no longer carries the 7520 rate the card renders');
need(sec('H.6.1').includes(usd(F.fedExclusion)), 'H.6.1 no longer carries the federal exclusion the card renders');
need(sec('H.6.2').includes(usd(F.ilExclusion)), 'H.6.2 no longer carries the Illinois exclusion the card renders');

/* Part K guard: the deck renders percentages; none may equal a retired one.
 * The retired form is composed, never spelled, so this file stays clean under
 * verify-migration check 1, which greps every non-register file in the tree. */
const RETIRED_PCT = (30 + 1) + '%';
for (const [k, v] of [['discount', F.discount], ['blendedAnnual', F.blendedAnnual], ['rate7520', F.rate7520]]) {
  need(pc(v) !== RETIRED_PCT, `${k} renders as the retired Part K percentage; the deck may not carry it`);
}

/* every COLE key the emitted block reads must exist in case-facts.json */
const KEYS = ['blendedAnnual', 'companyAbbr', 'fedExclusion', 'discount', 'endowmentIntent', 'rate7520', 'plantTown', 'ilExclusion'];
for (const k of KEYS) need(F[k] !== undefined && F[k] !== null && F[k] !== '', `case-facts.json no longer carries ${k}`);

/* ---- the deck: id, bucket class, card expression, one-line why ----
 * Order interleaves the two buckets (no run longer than 2), which is the
 * property the Rohrer, Dedrick & Stershic (2015) citation on the section
 * rests on: interleaved classification practice, not blocked practice. */
const BUCKET = { landmine: 0, combination: 0, published: 1 };
const DECK = [
  { id: 'blended-rate', cls: 'published',
    t: "'The 2026 blended annual rate on a demand loan: '+pc(COLE.blendedAnnual)",
    w: 'A published rate from a revenue ruling. It attaches to every demand loan in the country, not to this household.' },
  { id: 'landmine-nathan', cls: 'landmine',
    t: "'A competitor has approached '+COLE.companyAbbr+' about an acquisition, and Nathan has not been told'",
    w: 'The first landmine in the case file. An unannounced approach to a private company, and the person most affected does not know it happened.' },
  { id: 'fed-exclusion', cls: 'published',
    t: "'The federal basic exclusion amount: '+usd(COLE.fedExclusion)",
    w: 'A statutory figure anyone can look up. It says nothing about who is asking.' },
  { id: 'landmine-privilege', cls: 'landmine',
    t: "'The '+pc(COLE.discount)+' combined discount asserted in the draft memorandum from estate counsel'",
    w: 'The second landmine. A privileged, unfiled valuation position with no appraisal behind it, and adverse to the client if it surfaces.' },
  { id: 'landmine-endowment', cls: 'landmine',
    t: "'Meg intends a '+usd(COLE.endowmentIntent)+' endowment to the charity she chairs, and its board has not been told'",
    w: 'The third landmine. The intent carries disclosure and conflict questions she has not raised with the board she leads.' },
  { id: 'rate-7520', cls: 'published',
    t: "'The section 7520 rate used to value split interests: '+pc(COLE.rate7520)",
    w: 'A published rate from the same monthly ruling series. Verify the figure against the source, not against a model.' },
  { id: 'combination', cls: 'combination',
    t: "'An owner in her sixties with a precision aerospace-fastener maker in '+COLE.plantTown+', bought from her father'",
    w: 'No name appears, and in a market this narrow the combination identifies one person. De-identification removes the combination, not the name.' },
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

const OPEN = '<!-- CARDSORT:BEGIN cole-household v4.0 -->';
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
const a = text.indexOf(OPEN), b = text.indexOf(CLOSE);
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
