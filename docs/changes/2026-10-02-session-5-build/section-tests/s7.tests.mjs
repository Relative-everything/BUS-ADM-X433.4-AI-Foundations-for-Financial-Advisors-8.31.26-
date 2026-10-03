#!/usr/bin/env node
/* s7.tests.mjs <assembled page>: jsdom assertions for Session 5 §07, in the shape of
   Session 4's docs/changes/2026-09-28-session-4-notes/checks.mjs. Exit 1 on any fail.
   Run: NODE_PATH=$(npm root -g) node s7.tests.mjs /tmp/s7-test.html */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM, VirtualConsole } = require('jsdom');
const file = process.argv[2] || 'session-5/index.html';
const html = readFileSync(file, 'utf8');
const ALLOWED = ['src-morningstar-fired', 'src-vanguard-alpha', 'src-cfp-psychology', 'src-case'];
const ITEMS = [
  ['Draft the agenda from the last meeting’s notes', 'tool'],
  ['Hear that the trust sale ‘has not landed’ and not push', 'you'],
  ['Notice that David wants the appraisal looked at again before anything is signed, and ask him why', 'you'],
  ['Explain what a demand note does, in plain words', 'tool'],
  ['Decide whether to raise the competitor’s letter while Nathan is in the room', 'you'],
  ['Draft the recap email', 'tool'],
  ['Hold the silence when Meg says she is not telling Nathan until there is something to tell', 'you'],
  ['Tally the year’s cash flow from the file', 'tool'],
];
const TT = 39, TB = 272, TH = TB - TT, NOTCH = TH / 4;
const CAP = 'Four drafts. Four judgments. The judgments are the fee.';
let fails = 0, n = 0;
const say = (ok, id, s) => { n++; if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
const near = (a, b, eps = 0.6) => Math.abs(a - b) <= eps;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* reduced = true makes the page's tween() jump to its end state, so every assertion is synchronous;
   run 4 loads with real requestAnimationFrame and waits for the animation instead */
function load(reduced = true) {
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errs.push('jsdomError: ' + (e && e.message || e)));
  vc.on('warn', (...a) => { const s = a.join(' '); if (/section s7 failed|widget error contained/.test(s)) errs.push('warn: ' + s); });
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(w) { if (reduced) w.matchMedia = () => ({ matches: true, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }); } });
  const w = dom.window, d = w.document;
  w.addEventListener('error', (e) => errs.push('window error: ' + (e.message || e)));
  const $ = (s) => d.querySelector(s), $$ = (s) => [...d.querySelectorAll(s)];
  const click = (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  return { w, d, errs, $, $$, click,
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ') : ''),
    vis: (el) => !!el && !el.hidden && el.style.display !== 'none',
    chips: () => $$('#s7List .chip'),
    boxes: () => $$('#s7Boxes .lbox'),
    disc: (i) => $$('#s7Fig .s7-disc')[i],
    tag: (i) => $$('#s7Fig .s7-tag')[i],
    ring: (i) => $$('#s7Fig .s7-ring')[i],
    lab: (i) => $$('#s7Fig .s7-lab')[i],
    gl: (i) => $$('#s7Fig .s7-gl')[i],
    links: () => $$('#s7Fig .s7-link'),
    fillH: () => +$('#s7Fig .s7-fill').getAttribute('height'),
    fillY: () => +$('#s7Fig .s7-fill').getAttribute('y'),
    trust: () => $('#s7Fig .s7-tr').textContent,
    hd: () => $('#s7Fig .s7-hd').textContent,
    cap: () => $('#s7Fig .s7-cap'),
    /* place item i (0-based) in bucket k ('tool' | 'you') the way a learner does: chip, then bucket */
    put(i, k) { click(this.chips()[i]); click(this.boxes()[k === 'tool' ? 0 : 1]); } };
}

/* ================= run 1: the happy path, with one wrong placement ================= */
{
  const P = load();
  const { d, errs, $, $$, txt, click, vis } = P;
  say(errs.length === 0, 'S7-001', 'the page loads with zero window errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  const sec = $('#s7');
  say(!!sec && sec.getAttribute('data-nav') === 'What stays human' && sec.classList.contains('slide') && !sec.classList.contains('apx'), 'S7-002', 'section #s7 is a core slide with data-nav "What stays human"');
  say(/07 · What stays human/.test(txt('#s7 .eyebrow')) && txt('#s7 .eyebrow .mins').trim() === '5 min' && txt('#s7 h2') === 'The Cole Meeting: Eight Moments', 'S7-003', 'eyebrow, minutes and title as the spec says');
  const big = txt('#s7 p.big').trim();
  say(big === 'Eight moments from one client meeting. A tool can draft some of them. The ones it cannot are where the relationship is made or lost.' && big.split(/\s+/).length < 30, 'S7-004', 'the thesis line is the spec\'s and under 30 words (' + big.split(/\s+/).length + ')');
  const roots = $$('#s7 [data-task]');
  say(roots.length === 1 && roots[0].getAttribute('data-task') === 't-s7' && roots[0].getAttribute('data-comp') === 'two-bucket-sorter', 'S7-005', 'exactly one data-task root, t-s7, family two-bucket-sorter');
  say(txt('#s7 .panel[data-task] .do').trim() === 'Do this now: 3 minutes' && txt('#s7 .panel[data-task] h4') === 'Tool, or Only You?' && /Click a moment, then the bucket\. The meeting on the right fills in as you go\./.test(txt('#s7 .panel[data-task] .hint')), 'S7-006', 'the root panel carries its Do-this-now line, heading and hint');
  say(/Then this: 2 minutes/.test(txt('#s7 .panel:not([data-task]) .do')) && /What Clients Say When They Leave/.test(txt('#s7 .panel:not([data-task]) h4')), 'S7-007', 'beat 2 carries its Then-this line and heading');

  /* the sorter */
  const chips = P.chips(), boxes = P.boxes();
  say(chips.length === 8 && chips.every((c) => c.tagName === 'BUTTON' && c.getAttribute('type') === 'button'), 'S7-010', 'eight chips, all real buttons');
  say(chips.every((c, i) => c.textContent === (i + 1) + '. ' + ITEMS[i][0]), 'S7-011', 'the eight moments read exactly as the spec, numbered, in meeting order');
  say(boxes.length === 2 && /1 · A tool can draft it/.test(boxes[0].textContent) && /Then you read it before it leaves/.test(boxes[0].textContent) && /2 · Only you can do it/.test(boxes[1].textContent) && /Counselling, values, trust/.test(boxes[1].textContent), 'S7-012', 'two buckets with the spec\'s titles and one-line descriptions');
  say($$('#s7Boxes ul.placed').length === 2 && $$('#s7Boxes ul.placed')[0].getAttribute('data-k') === 'tool' && $$('#s7Boxes ul.placed')[1].getAttribute('data-k') === 'you', 'S7-013', 'each bucket has its landing list keyed tool / you');
  say(/The meeting/.test(txt('#s7Out')) && /0 of 8 placed/.test(txt('#s7Out')) && $('#s7Out').getAttribute('aria-live') === 'polite', 'S7-014', 'the readout is labelled "The meeting", starts at 0 of 8 and is aria-live');
  const key = $('#s7Key');
  say(!!key && key.classList.contains('keyhide') && !vis(key), 'S7-015', 'the answer key is hidden at load');

  /* the figure at load */
  const svg = $('#s7Fig svg');
  say(!!svg && svg.getAttribute('viewBox') === '0 0 400 316' && svg.getAttribute('role') === 'img' && /eight moments, none placed yet/.test(svg.getAttribute('aria-label')), 'S7-020', 'one viewBox SVG, role img, with an aria-label describing the empty timeline');
  say($$('#s7Fig .s7-disc').length === 8 && $$('#s7Fig .s7-lab').length === 8 && $$('#s7Fig .s7-num').length === 8 && $$('#s7Fig .s7-gl').length === 8 && $$('#s7Fig .s7-ring').length === 8 && P.links().length === 7, 'S7-021', 'eight nodes: disc, number, glyph, ring and label each, with seven spine links between them');
  const labs = $$('#s7Fig .s7-lab').map((t) => t.textContent);
  say(labs.join('|') === 'Draft the agenda|The sale ‘has not landed’|The appraisal: ask why|Explain the demand note|The competitor’s letter|Draft the recap email|Meg’s silence|Tally the cash flow', 'S7-022', 'the timeline carries a short label per moment, in order');
  say($$('#s7Fig .s7-disc').every((c) => c.getAttribute('class') === 's7-disc') && $$('#s7Fig .s7-gl').every((g) => g.getAttribute('class') === 's7-gl') && $$('#s7Fig .s7-num').map((t) => t.textContent).join('') === '12345678', 'S7-023', 'at load every disc is empty and numbered 1 to 8, no glyph shown');
  say(!!$('#s7Fig .s7-track') && $$('#s7Fig .s7-notch').length === 3 && P.fillH() === 0 && P.trust() === '0 of 4' && $('#s7Fig .s7-tl').textContent === 'TRUST', 'S7-024', 'the trust line: a track with three notch marks (four steps), empty, reading 0 of 4');
  say(P.hd() === 'THE MEETING · 0 OF 8 PLACED' && P.cap().textContent === CAP && !/show/.test(P.cap().getAttribute('class')), 'S7-025', 'the header reads 0 of 8 and the closing caption is built but not shown');
  const gate = $('#s7 .check[data-gate="g8"]');
  say(!!gate && !gate.classList.contains('done') && /Place all eight moments\./.test(txt('#s7 .check .ct')), 'S7-026', 'the gate g8 exists with the spec\'s text and is not ticked at load');

  /* select a moment: the node lights before any bucket is clicked */
  click(chips[0]);
  say(chips[0].classList.contains('act') && /sel/.test(P.disc(0).getAttribute('class')) && /sel/.test(P.lab(0).getAttribute('class')) && /moment 1 selected/.test(svg.getAttribute('aria-label')), 'S7-030', 'clicking chip 1 selects it and lights node 1 on the timeline (disc, label, aria-label)');
  say(/Selected: 1\./.test(txt('#s7Out')) && /Now click the bucket/.test(txt('#s7Out')), 'S7-031', 'the readout names the selection and asks for a bucket');
  click(chips[1]);
  say(!/sel/.test(P.disc(0).getAttribute('class')) && /sel/.test(P.disc(1).getAttribute('class')) && /dimmed/.test(P.lab(0).getAttribute('class')), 'S7-032', 'selecting another chip moves the highlight to its node and dims the others');
  click(chips[0]);

  /* place moment 1 right (tool) */
  click(boxes[0]);
  say(P.disc(0).getAttribute('class') === 's7-disc tool' && P.gl(0).getAttribute('class') === 's7-gl show' && /off/.test($$('#s7Fig .s7-num')[0].getAttribute('class')), 'S7-040', 'moment 1 in "tool": its disc fills teal, the page glyph appears, the number fades');
  say(P.tag(0).textContent === '✓ DRAFT' && P.tag(0).getAttribute('class') === 's7-tag show tool' && P.ring(0).getAttribute('class') === 's7-ring', 'S7-041', 'a right placement is marked with a tick and the word DRAFT, no rust ring');
  say(P.hd() === 'THE MEETING · 1 OF 8 PLACED' && P.trust() === '0 of 4' && P.fillH() === 0, 'S7-042', 'the header counts 1 of 8; a tool moment does not move the trust line');
  say(chips[0].classList.contains('done') && !chips[0].classList.contains('act') && $$('#s7Boxes ul.placed')[0].children.length === 1 && /✓/.test($$('#s7Boxes ul.placed')[0].textContent) && /A template task with a known shape/.test($$('#s7Boxes ul.placed')[0].textContent), 'S7-043', 'the chip is marked done and lands under bucket 1 with a tick and its one-line why');
  say(P.gl(0).querySelector('path') && P.gl(0).querySelectorAll('line').length === 2, 'S7-044', 'the tool glyph is a page (a path and two text lines)');

  /* place moment 2 (you) wrong, in "tool" */
  P.put(1, 'tool');
  say(P.disc(1).getAttribute('class') === 's7-disc you' && P.ring(1).getAttribute('class') === 's7-ring show' && P.tag(1).textContent === '✗ ONLY YOU' && P.tag(1).getAttribute('class') === 's7-tag show bad', 'S7-050', 'a wrong placement: the disc shows its true colour (ink), a rust ring appears, the tag reads ✗ ONLY YOU');
  say(P.trust() === '0 of 4' && P.fillH() === 0, 'S7-051', 'a "you" moment placed wrong does not raise the trust line');
  say(P.links()[0].getAttribute('class') === 's7-link show you', 'S7-052', 'the spine link above node 2 lights in ink once it is placed');
  say(/✗/.test($$('#s7Boxes ul.placed')[0].textContent) && /Belongs under “2 · Only you can do it”/.test($$('#s7Boxes ul.placed')[0].textContent) && /Pace is a judgment about a person/.test($$('#s7Boxes ul.placed')[0].textContent), 'S7-053', 'the landed item says where it belongs and why');
  say(P.gl(1).querySelector('circle') && P.gl(1).querySelector('path'), 'S7-054', 'the "you" glyph is a person (head and shoulders)');
  say(/1 right/.test(txt('#s7Out')) && /2 of 8 placed/.test(txt('#s7Out')), 'S7-055', 'the readout counts 2 of 8 placed, 1 right');

  /* place moment 3 (you) right */
  P.put(2, 'you');
  say(P.trust() === '1 of 4' && near(P.fillH(), NOTCH) && near(P.fillY(), TB - NOTCH), 'S7-060', 'a "you" moment placed right raises the trust line one notch (' + P.fillH().toFixed(1) + ')');
  say(P.tag(2).textContent === '✓ ONLY YOU' && P.tag(2).getAttribute('class') === 's7-tag show you' && P.ring(2).getAttribute('class') === 's7-ring', 'S7-061', 'the right "you" placement is ticked, no ring');
  say(/Trust line: 1 of 4 notches/.test(svg.getAttribute('aria-label')) && /3 of 8 placed, 2 right/.test(svg.getAttribute('aria-label')), 'S7-062', 'the aria-label follows the state');
  const plus = $('#s7Fig .s7-plus');
  say(plus.textContent === '+1' && +plus.getAttribute('y') === Math.round(TB - NOTCH - 6), 'S7-063', 'the +1 marker is parked at the new top of the fill');

  /* a placed chip cannot be re-selected or re-placed */
  click(chips[0]);
  say(!chips[0].classList.contains('act') && !/sel/.test(P.disc(0).getAttribute('class')), 'S7-070', 'clicking a placed chip does nothing');
  click(boxes[1]);
  say(P.hd() === 'THE MEETING · 3 OF 8 PLACED' && $$('#s7Boxes ul.placed li').length === 3, 'S7-071', 'a bucket click with nothing selected does nothing');

  /* the remaining five, all right */
  say(!gate.classList.contains('done') && !vis(key) && !/show/.test(P.cap().getAttribute('class')), 'S7-072', 'before the last placement: gate open, key hidden, caption hidden');
  P.put(3, 'tool'); P.put(4, 'you'); P.put(5, 'tool'); P.put(6, 'you');
  say(P.hd() === 'THE MEETING · 7 OF 8 PLACED' && P.trust() === '3 of 4' && !gate.classList.contains('done'), 'S7-073', 'seven placed, trust at 3 of 4, gate still open');
  P.put(7, 'tool');
  say(gate.classList.contains('done') && gate.querySelector('.mk').textContent === '✓', 'S7-080', 'placing all eight marks g8');
  say(P.cap().getAttribute('class') === 's7-cap show' && P.cap().textContent === CAP && new RegExp(CAP.replace(/\./g, '\\.')).test(svg.getAttribute('aria-label')), 'S7-081', 'after all eight the caption reads the "Four drafts" line and the aria-label carries it');
  say(P.hd() === 'THE MEETING · 8 OF 8 PLACED' && /8 of 8 placed · 7 right/.test(txt('#s7Out')) && /All placed\. The key is below\./.test(txt('#s7Out')), 'S7-082', 'the header and readout read 8 of 8 placed, 7 right');
  say(P.trust() === '3 of 4' && near(P.fillH(), 3 * NOTCH) && !near(P.fillH(), TH), 'S7-083', 'with one "you" moment placed wrong the trust line stops at three notches, not four');
  say(vis(key) && key.classList.contains('has') && /Answer key/.test(key.textContent) && /Score\s*7 of 8/.test(txt('#s7Key')) && /Four of eight can be drafted\. The four that cannot are the ones the client would name if asked why they stay\./.test(txt('#s7Key')), 'S7-084', 'the answer key opens with the score and the spec\'s closing line');
  say($$('#s7Key .good').length >= 7 && $$('#s7Key .flag').length === 1, 'S7-085', 'the key shows seven ticks and one cross');
  say($$('#s7Fig .s7-disc').filter((c) => / tool$/.test(c.getAttribute('class'))).length === 4 && $$('#s7Fig .s7-disc').filter((c) => / you$/.test(c.getAttribute('class'))).length === 4 && $$('#s7Fig .s7-gl').every((g) => /show/.test(g.getAttribute('class'))), 'S7-086', 'four teal discs, four ink discs, every glyph shown');
  say(P.links().every((l) => /show/.test(l.getAttribute('class'))) && P.links().map((l) => l.getAttribute('class').split(' ').pop()).join('') === 'youyoutoolyoutoolyoutool', 'S7-087', 'every spine link is lit in the colour of the moment below it: the meeting\'s rhythm');
  say($$('#s7Fig .s7-ring').filter((r) => /show/.test(r.getAttribute('class'))).length === 1, 'S7-088', 'exactly one rust ring, on the one wrong placement');
  say($$('#s7Boxes ul.placed')[0].children.length === 5 && $$('#s7Boxes ul.placed')[1].children.length === 3, 'S7-089', 'the lists under the buckets hold 5 and 3 items');
  P.put(0, 'you');
  say(P.hd() === 'THE MEETING · 8 OF 8 PLACED' && $$('#s7Boxes ul.placed li').length === 8, 'S7-090', 'clicks after completion change nothing');

  /* beat 2: the three bars */
  const fsvg = $('#s7Facts svg'), segs = $$('#s7Facts .s7-seg');
  say(!!fsvg && fsvg.getAttribute('role') === 'img' && /^0 0 520 \d+$/.test(fsvg.getAttribute('viewBox')) && /Empty until drawn/.test(fsvg.getAttribute('aria-label')), 'S7-100', 'the facts figure is one viewBox SVG, role img, described as empty until drawn');
  say($$('#s7Facts .s7-fl').length === 3 && /MORNINGSTAR/.test($$('#s7Facts .s7-fl')[0].textContent) && /VANGUARD/.test($$('#s7Facts .s7-fl')[1].textContent) && /CFP BOARD/.test($$('#s7Facts .s7-fl')[2].textContent), 'S7-101', 'three labelled rows: Morningstar, Vanguard, CFP Board');
  say($$('#s7Facts .s7-ft').length === 3 && segs.length === 6 && segs.every((r) => +r.getAttribute('width') === 0), 'S7-102', 'three tracks and six segments, every segment at width 0 before the press');
  say($$('#s7Facts .s7-fv').every((t) => !/show/.test(t.getAttribute('class'))) && $$('#s7Facts .s7-fc').every((t) => !/show/.test(t.getAttribute('class'))), 'S7-103', 'no value or caption is shown before the press');
  const show = $('#s7Show');
  say(!!show && show.getAttribute('type') === 'button' && show.textContent === 'Show what the surveys found' && !$('#s7FactOut').classList.contains('has') && $('#s7FactOut').getAttribute('aria-live') === 'polite', 'S7-104', 'the Show button and an empty, aria-live readout');
  click(show);
  const wid = segs.map((r) => +r.getAttribute('width'));
  say(wid.every((x) => x > 0), 'S7-110', '#s7Show draws the bars: every segment has width');
  say(wid[0] > wid[1] && wid[1] > wid[2] && wid[2] > wid[3] && near(wid[0] / wid[3], 32 / 11, 0.2) && near(wid[4] / wid[5], 50 / 7, 0.6), 'S7-111', 'segment widths follow the shares (32 > 21 > 17 > 11; about half; 7%)');
  say($$('#s7Facts .s7-fv').map((t) => t.textContent).join('|') === '32%|21%|17%|11%|about half|7%' && $$('#s7Facts .s7-fv').every((t) => /show/.test(t.getAttribute('class'))), 'S7-112', 'the value labels read 32%, 21%, 17%, 11%, about half, 7% and are shown');
  say($$('#s7Facts .s7-fk').map((t) => t.textContent).join('|') === 'advice and services|relationship|cost|returns|other|behavioural coaching|everything else|Psychology of Financial Planning|the rest of the exam', 'S7-113', 'the segment keys name what each bar part is');
  say($$('#s7Facts .s7-fc').every((t) => /show/.test(t.getAttribute('class'))) && $$('#s7Facts .s7-fc').every((t) => t.textContent.length <= 70), 'S7-114', 'six captions shown, each short enough to fit the bar width');
  const fo = txt('#s7FactOut');
  say($('#s7FactOut').classList.contains('has') && /32%/.test(fo) && /21%/.test(fo) && /7%/.test(fo) && /17%/.test(fo) && /11%/.test(fo), 'S7-115', 'the readout contains 32%, 21% and 7% (and 17%, 11%)');
  say(/about 185 investors/.test(fo) && /about 3% a year/.test(fo) && /behavioural coaching/.test(fo) && /since 2022/.test(fo) && /principal knowledge domain/.test(fo), 'S7-116', 'the readout carries the three facts as the spec words them');
  say(/The top two reasons clients leave are the advice and the relationship\. A tool can draft toward the first\. Only you hold the second\./.test(fo), 'S7-117', 'the readout closes with the spec\'s line');
  say($('#s7FactOut [data-src="src-morningstar-fired"]') && $('#s7FactOut [data-src="src-vanguard-alpha"]') && $('#s7FactOut [data-src="src-cfp-psychology"]'), 'S7-118', 'each fact in the readout carries its chip');
  say(show.textContent === 'Draw them again' && /32% named the quality of advice/.test(fsvg.getAttribute('aria-label')), 'S7-119', 'the button offers to draw again and the figure\'s aria-label now reads the numbers');
  click(show);
  say(segs.every((r) => +r.getAttribute('width') > 0) && $$('#s7Facts .s7-fv').every((t) => /show/.test(t.getAttribute('class'))), 'S7-120', 'a second press redraws cleanly');

  /* text, chips, dashes, forbidden words, case figures */
  const secTxt = txt('#s7'), outer = sec.outerHTML;
  say(!/\b(undefined|NaN)\b/.test(secTxt) && !/\b(undefined|NaN)\b/.test(svg.getAttribute('aria-label')) && !/\b(undefined|NaN)\b/.test(fsvg.getAttribute('aria-label')), 'S7-130', 'no "undefined" or "NaN" anywhere in the section after every control was used');
  say(!/\u2014|&mdash;|\u2013|&ndash;/.test(outer), 'S7-131', 'no em dash or en dash in the section');
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric|canvas|the instructor|before Session 5)\b/i.test(secTxt), 'S7-132', 'no forbidden course-policy words in the learner-facing text');
  say(!/\$/.test(secTxt) && !/\bmillion\b/i.test(secTxt) && !/\b3\.82\b/.test(secTxt) && !/\b(38|52|30|20)\s*(%|percent|million)/i.test(secTxt) && !/\bthree years old\b/.test(secTxt), 'S7-133', 'no case figure: no dollar amount, no million, no Cole-file percentage');
  const chipsAll = $$('#s7 .conf[data-src]');
  say(chipsAll.length === 9 && chipsAll.every((c) => ALLOWED.includes(c.getAttribute('data-src'))), 'S7-134', 'every confidence chip (' + chipsAll.length + ') resolves to an allowed key');
  say(chipsAll.filter((c) => c.getAttribute('data-src') === 'src-morningstar-fired').length === 3 && chipsAll.filter((c) => c.getAttribute('data-src') === 'src-vanguard-alpha').length === 2 && chipsAll.filter((c) => c.getAttribute('data-src') === 'src-cfp-psychology').length === 3 && chipsAll.filter((c) => c.getAttribute('data-src') === 'src-case').length === 1, 'S7-135', 'three Morningstar, two Vanguard, three CFP Board and one src-case chip');
  say(chipsAll.every((c) => (c.getAttribute('data-src') === 'src-case') === c.classList.contains('l') && (c.getAttribute('data-src') !== 'src-case') === c.classList.contains('m')), 'S7-136', 'the facts are M chips and the constructed material is an L chip');
  const pts = $$('#s7 ul.pts li');
  say(pts.length === 3 && /^Draft is not decide\./.test(pts[0].textContent.trim()) && /^Why clients leave\./.test(pts[1].textContent.trim()) && /^The profession agrees\./.test(pts[2].textContent.trim()), 'S7-137', 'three bullets with the spec\'s leads');
  say(/32% and 21%, not returns, 11%/.test(pts[1].textContent) && /tested domain of the CFP exam/.test(pts[2].textContent), 'S7-138', 'the bullets carry the spec\'s numbers and wording');
  say(/Lamas and Labotka, Morningstar/.test(txt('#s7 p.src')) && /Kinniry and colleagues \(2022\), Putting a value on your value, Vanguard/.test(txt('#s7 p.src')) && /CFP Board \(2021\), Psychology of Financial Planning added to the exam/.test(txt('#s7 p.src')) && /written from the course’s synthetic meeting excerpt/.test(txt('#s7 p.src')), 'S7-139', 'the source line names the three sources and the constructed excerpt');
  const prose = ['#s7 p.big', '#s7 ul.pts', '#s7 p.src', '#s7 .check .ct'].map((s) => $$(s).map((e) => e.textContent).join(' ')).join(' ').replace(/\s+/g, ' ').trim().split(' ').length;
  say(prose < 180, 'S7-140', 'the static prose (thesis, bullets, source line, gate) is under 180 words (' + prose + ')');
  say($$('#s7 button').every((b) => b.getAttribute('type') === 'button') && $$('#s7 [onclick], #s7 a[href^="#"], #s7 div[tabindex], #s7 span[tabindex]').length === 0, 'S7-141', 'every button is type=button and nothing else pretends to be clickable');
  say($$('#s7 .mpanel[aria-live="polite"]').length === 2 && $('#s7List').getAttribute('role') === 'group' && $('#s7List').getAttribute('aria-label'), 'S7-142', 'both readouts are aria-live and the chip list is a labelled group');
  say($$('#s7 .panel').length === 2 && $$('#s7 .check').length === 1 && $$('#s7 .keyhide').length === 1, 'S7-143', 'two panels, one gate, one answer key');
  say(errs.length === 0, 'S7-144', 'zero window errors after the full happy path' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 2: all eight right: the trust line reaches four notches ================= */
{
  const P = load();
  const { $, $$, txt, errs } = P;
  ITEMS.forEach(([, k], i) => P.put(i, k));
  say(P.trust() === '4 of 4' && near(P.fillH(), TH) && near(P.fillY(), TT), 'S7-150', 'with the four "you" moments placed right the trust line fills all four notches (' + P.fillH().toFixed(1) + ' of ' + TH + ')');
  say($$('#s7Fig .s7-ring').every((r) => r.getAttribute('class') === 's7-ring') && $$('#s7Fig .s7-tag').every((t) => /^✓ /.test(t.textContent)), 'S7-151', 'no rust ring, every tag ticked');
  say($('#s7 .check[data-gate="g8"]').classList.contains('done') && /8 of 8 placed · 8 right/.test(txt('#s7Out')) && /Score\s*8 of 8/.test(txt('#s7Key')) && P.cap().getAttribute('class') === 's7-cap show', 'S7-152', 'gate ticked, 8 right, caption shown');
  say(/Trust line: 4 of 4 notches/.test($('#s7Fig svg').getAttribute('aria-label')), 'S7-153', 'the aria-label reports four of four');
  say(errs.length === 0, 'S7-154', 'zero window errors');
}

/* ================= run 3: every "you" moment wrong: the trust line never moves ================= */
{
  const P = load();
  const { $$, errs } = P;
  ITEMS.forEach(([, k], i) => P.put(i, k === 'you' ? 'tool' : 'you'));
  say(P.trust() === '0 of 4' && P.fillH() === 0 && $$('#s7Fig .s7-ring').filter((r) => /show/.test(r.getAttribute('class'))).length === 8 && P.cap().getAttribute('class') === 's7-cap show', 'S7-160', 'all eight wrong: eight rings, trust at 0 of 4, caption still shown (the sort is complete)');
  say($$('#s7Fig .s7-disc').filter((c) => / tool$/.test(c.getAttribute('class'))).length === 4, 'S7-161', 'discs still show the true kind, so the learner reads the right answer off the figure');
  say(errs.length === 0, 'S7-162', 'zero window errors');
}

/* ================= run 4: the Shift+U override on a fresh page ================= */
{
  const P = load();
  const { w, d, $, $$, txt, errs, vis } = P;
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(d.body.classList.contains('reveal'), 'S7-170', 'Shift+U turns the override on');
  say($('#s7 .check[data-gate="g8"]').classList.contains('done'), 'S7-171', 'Shift+U ticks the gate');
  say(P.hd() === 'THE MEETING · 8 OF 8 PLACED' && P.trust() === '4 of 4' && near(P.fillH(), TH) && P.cap().getAttribute('class') === 's7-cap show', 'S7-172', 'Shift+U places every moment where it belongs: 8 of 8, trust 4 of 4, caption shown');
  say(vis($('#s7Key')) && /Score\s*8 of 8/.test(txt('#s7Key')) && /8 of 8 placed · 8 right/.test(txt('#s7Out')), 'S7-173', 'the key and the readout show the completed state');
  say($$('#s7List .chip').every((c) => c.classList.contains('done')) && $$('#s7Boxes ul.placed li').length === 8, 'S7-174', 'every chip is done and landed');
  say(errs.length === 0, 'S7-175', 'zero window errors under the override' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 5: with real animation frames the tweens land where the reduced path does ================= */
{
  const P = load(false);
  const { $, $$, click, errs } = P;
  P.put(2, 'you');
  const mid = P.fillH();
  await sleep(750);
  say(near(P.fillH(), NOTCH) && mid <= NOTCH + 0.6, 'S7-180', 'animated: the trust fill rises to one notch (' + P.fillH().toFixed(1) + ')');
  say($('#s7Fig .s7-plus').style.opacity === '0', 'S7-181', 'animated: the +1 marker has faded out at the end');
  click($('#s7Show'));
  await sleep(950);
  const wid = $$('#s7Facts .s7-seg').map((r) => +r.getAttribute('width'));
  say(wid.every((x) => x > 0) && wid[0] > wid[1] && $$('#s7Facts .s7-fv').every((t) => /show/.test(t.getAttribute('class'))), 'S7-182', 'animated: the bars reach their widths and the labels appear when the tween ends');
  say(errs.length === 0, 'S7-183', 'zero window errors with animation');
}

/* ================= run 6: an untouched page stays clean ================= */
{
  const { errs, txt, $$ } = load();
  say(!/\b(undefined|NaN)\b/.test(txt('#s7')), 'S7-190', 'the untouched section prints no undefined or NaN');
  say($$('#s7List .chip').length === 8 && $$('#s7Boxes .lbox').length === 2 && $$('#s7Fig svg').length === 1 && $$('#s7Facts svg').length === 1, 'S7-191', 'eight chips, two buckets, two figures on the untouched page');
  say(errs.length === 0, 'S7-192', 'zero errors on the untouched page');
}

console.log(`\n${n} assertions, ${fails} failed`);
process.exit(fails ? 1 : 0);
