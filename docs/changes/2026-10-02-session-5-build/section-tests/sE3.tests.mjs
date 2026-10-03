#!/usr/bin/env node
/* sE3.tests.mjs <assembled page>: jsdom assertions for Session 5 Appendix E3, in the
   shape of Session 4's docs/changes/2026-09-28-session-4-notes/checks.mjs. Exit 1 on any fail.
   Run: NODE_PATH=$(npm root -g) node sE3.tests.mjs /tmp/sE3-test.html */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM, VirtualConsole } = require('jsdom');
const file = process.argv[2] || 'session-5/index.html';
const html = readFileSync(file, 'utf8');
const ALLOWED = ['src-kalai', 'src-wolfram', 'src-magesh', 'src-cve', 'src-case'];
const RIGHT = ['sample', 'guess', 'passage', 'obey', 'carry', 'passage', 'guess', 'guess', 'carry', 'sample'];
const LANE = { guess: 0, sample: 1, passage: 2, carry: 3, obey: 4 };
let fails = 0, n = 0;
const say = (ok, id, s) => { n++; if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };

function load() {
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errs.push('jsdomError: ' + (e && e.message || e)));
  vc.on('warn', (...a) => { const s = a.join(' '); if (/section sE3 failed|widget error contained/.test(s)) errs.push('warn: ' + s); });
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window, d = w.document;
  w.addEventListener('error', (e) => errs.push('window error: ' + (e.message || e)));
  return { w, d, errs,
    $: (s) => d.querySelector(s),
    $$: (s) => [...d.querySelectorAll(s)],
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ') : ''),
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })),
    key: (el, k) => el && el.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true })),
    vis: (el) => !!el && !el.hidden && el.style.display !== 'none' };
}
const clean = (s) => !/\b(undefined|NaN)\b/.test(s);
function allLabels($$) { return $$('#sE3 [aria-label]').map((e) => e.getAttribute('aria-label')).join(' | '); }
function placeByLane($$, click, i, lane) { click($$('#e3List .chip')[i]); click($$('#e3Boxes .lbox')[lane]); }

/* ================= run 1: the happy path, with one wrong placement ================= */
{
  const { d, errs, $, $$, txt, click, key, vis } = load();
  say(errs.length === 0, 'E3-001', 'the page loads with zero window errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  const sec = $('#sE3');
  say(!!sec && sec.classList.contains('slide') && sec.classList.contains('apx') && sec.getAttribute('data-nav') === 'E3 · Failure types' && sec.getAttribute('data-insert-after') === 's3' && sec.getAttribute('data-tier') === 'foundational',
    'E3-002', 'section #sE3 is an appendix slide: data-nav, data-insert-after s3, tier foundational');
  const stub = $('#sE3 > .apxstub');
  say(!!stub && stub === sec.firstElementChild && /E3 · Five Ways It Broke, Sessions 1 to 4/.test(txt('#sE3 .apxstub b')) && /12 min · foundational · hidden at the current appendix depth/.test(txt('#sE3 .apxstub span')) && /APXSTUB:BEGIN/.test(sec.innerHTML) && /APXSTUB:END/.test(sec.innerHTML),
    'E3-003', 'the APXSTUB line is the first child with the E3 title, 12 min, foundational');
  say(/Appendix E3 · Failure types/.test(txt('#sE3 .eyebrow')) && txt('#sE3 .eyebrow .mins').trim() === '12 min' && txt('#sE3 h2').trim() === 'Five Ways It Broke, Sessions 1 to 4', 'E3-004', 'eyebrow, minutes and title as the spec says');
  const big = txt('#sE3 p.big').trim();
  say(big === 'Every failure this course showed you is one of five kinds. Sort ten of them, and you have a diagnosis sheet for any workflow.' && big.split(/\s+/).length < 30, 'E3-005', 'the thesis line is the spec\'s and under 30 words (' + big.split(/\s+/).length + ')');
  const roots = $$('#sE3 [data-task]');
  say(roots.length === 1 && roots[0].getAttribute('data-task') === 't-sE3' && roots[0].getAttribute('data-comp') === 'multi-column-sorter' && roots[0].classList.contains('panel'), 'E3-006', 'exactly one data-task root, t-sE3, family multi-column-sorter');
  say(txt('#sE3 .panel[data-task] .do').trim() === 'Do this now: 6 minutes' && txt('#sE3 .panel[data-task] h4').trim() === 'Ten Failures, Five Kinds' && txt('#sE3 .panel[data-task] .hint').trim() === 'Click a failure, then the kind it is. Each lands with a tick or a cross and a one-line why.',
    'E3-007', 'the Do-this-now line, the heading and the one-line hint are the spec\'s');
  say(!!$('#sE3 .sorter #e3Boxes.boxes') && !!$('#sE3 .sorter #e3List.chiplist') && !!$('#sE3 #e3Out.mpanel') && !!$('#sE3 #e3Key.mpanel.keyhide'), 'E3-008', 'the four hosts exist with their house classes, boxes and list inside .sorter');

  /* the sorter at rest */
  const chips = $$('#e3List .chip');
  say(chips.length === 10 && chips.every((c) => c.tagName === 'BUTTON' && c.getAttribute('type') === 'button' && c.getAttribute('aria-pressed') === 'false' && !c.disabled), 'E3-010', 'ten chips, real buttons, none pressed, none disabled');
  say(/^1\. Session 1: one question asked three times, three different dates back$/.test(chips[0].textContent) && /^5\. Session 5: the brief carried the client’s name and account number into the output$/.test(chips[4].textContent) && /^10\. Session 2: an identical prompt sent twice, an hour apart, and two materially different answers$/.test(chips[9].textContent),
    'E3-011', 'the chips carry the ten failures in the spec\'s order, numbered');
  const lboxes = $$('#e3Boxes .lbox');
  const titles = lboxes.map((b) => b.querySelector('h4').textContent);
  say(lboxes.length === 5 && titles.join('|') === '1 · Guessed|2 · Sampled differently|3 · Wrong passage|4 · Carried the input’s error|5 · Did what the text said' && lboxes.every((b) => b.tagName === 'BUTTON' && b.getAttribute('type') === 'button'),
    'E3-012', 'five lanes, real buttons, titled in the spec\'s order');
  const descs = lboxes.map((b) => b.querySelector('p').textContent);
  say(descs.join('|') === 'Filled a gap with something plausible|Same prompt, new answer|Quoted the nearest text, not the right one|What went in came back out|Treated content as an instruction', 'E3-013', 'each lane carries its one-line description');
  const uls = $$('#e3Boxes ul.placed');
  say(uls.length === 5 && uls.map((u) => u.getAttribute('data-k')).join(',') === 'guess,sample,passage,carry,obey' && uls.every((u) => u.children.length === 0), 'E3-014', 'five empty placed lists keyed guess, sample, passage, carry, obey');
  say(/0 of 10 placed\./.test(txt('#e3Out')) && /Click an item, then the bucket it belongs in/.test(txt('#e3Out')) && !$('#e3Out').classList.contains('has'), 'E3-015', 'the Progress readout starts at 0 of 10 and says what to do first');
  const gate = $('#sE3 .check[data-gate="ga3"]');
  say(!!gate && !gate.classList.contains('done') && !vis($('#e3Key')), 'E3-016', 'the gate ga3 is open and the key hidden at load');

  /* the figure at rest */
  const svg = $('#e3Fig svg');
  const cols = $$('#e3Fig .sE3-col'), blocks = $$('#e3Fig .sE3-blk'), cap = $('#e3Fig .sE3-cap'), hd = $('#e3Fig .sE3-hd'), cns = $$('#e3Fig .sE3-cn');
  say(!!svg && svg.getAttribute('viewBox') === '0 0 360 260' && svg.getAttribute('role') === 'group' && $$('#e3Fig svg').length === 1, 'E3-020', 'one viewBox SVG, 360 by 260, role group because its columns are buttons');
  say(cols.length === 5 && cols.every((r) => r.getAttribute('role') === 'button' && r.getAttribute('tabindex') === '-1' && r.getAttribute('aria-disabled') === 'true' && /^Kind \d, .+: place the selected failure here$/.test(r.getAttribute('aria-label'))),
    'E3-021', 'five column rects, role button, unreachable and disabled until an item is selected');
  say(cols.map((r) => r.getAttribute('x')).join(',') === '4,76,148,220,292' && cols.every((r) => r.getAttribute('width') === '64'), 'E3-022', 'the columns sit at 72-unit intervals, 64 wide');
  say(blocks.length === 10 && blocks.every((g) => g.classList.contains('sE3-hide')), 'E3-023', 'ten blocks built once, all hidden at rest');
  say(cap.textContent === '0 of 10 placed · 0 right' && hd.textContent === 'ONE COLUMN PER KIND' && cns.length === 5 && cns.every((t) => t.textContent === '0'), 'E3-024', 'caption 0 of 10 placed · 0 right, header at rest, five zero counts');
  say(/^Five columns, one per kind, as a tally\./.test(svg.getAttribute('aria-label')) && /0 of 10 placed, 0 right\./.test(svg.getAttribute('aria-label')) && /Kind 1, Guessed, holds nothing/.test(svg.getAttribute('aria-label')), 'E3-025', 'the aria-label describes the empty tally');
  say($$('#e3Fig .sE3-kt').map((t) => t.textContent).join(',') === 'GUESS,SAMPLE,PASSAGE,CARRY,OBEY' && $$('#e3Fig .sE3-nt').map((t) => t.textContent).join('') === '12345', 'E3-026', 'each column carries its number and its kind tag');
  say(/right/.test(svg.textContent) && /wrong/.test(svg.textContent) && $$('#e3Fig .sE3-lgd').length === 2, 'E3-027', 'a two-swatch legend, right and wrong');

  /* click 1: select item 1 */
  click(chips[0]);
  say(chips[0].classList.contains('act') && chips[0].getAttribute('aria-pressed') === 'true' && chips[1].getAttribute('aria-pressed') === 'false', 'E3-030', 'clicking a chip selects it: act plus aria-pressed');
  say(hd.textContent === 'ITEM 1 · CLICK ITS KIND' && hd.classList.contains('sE3-sel'), 'E3-031', 'the figure header follows the selection');
  say(cols.every((r) => r.classList.contains('sE3-ready') && r.getAttribute('tabindex') === '0' && r.getAttribute('aria-disabled') === 'false') && lboxes.every((b) => b.classList.contains('sE3-ready')), 'E3-032', 'with an item selected the columns and the lanes arm: dashed, reachable, enabled');
  say(/Selected: 1\. Session 1: one question asked three times/.test(txt('#e3Out')) && /Now click the bucket it belongs in/.test(txt('#e3Out')), 'E3-033', 'the readout names the selection and asks for the lane');
  say(/Item 1 is selected: click its kind\./.test(svg.getAttribute('aria-label')), 'E3-034', 'the aria-label says which item is selected');

  /* click 2: lane 2 (sample), right */
  click(lboxes[1]);
  const li1 = uls[1].querySelector('li');
  say(!!li1 && li1.classList.contains('good') && li1.querySelector('b').textContent === '✓' && /1\. Session 1: one question asked three times/.test(li1.textContent) && /Nothing was wrong with the question\. Each run draws a new answer\./.test(li1.querySelector('span').textContent),
    'E3-040', 'item 1 lands under Sampled differently with a tick and its one-line why');
  say(blocks[0].getAttribute('class') === 'sE3-blk sE3-ok' && blocks[0].getAttribute('transform') === 'translate(79,189)' && blocks[0].querySelectorAll('.sE3-bt')[1].textContent === '✓' && blocks[0].querySelectorAll('.sE3-bt')[0].textContent === '1',
    'E3-041', 'block 1 appears teal in column 2 on the floor, numbered, with a tick');
  say(cns[1].textContent === '1' && cns[1].classList.contains('sE3-lit') && cns[0].textContent === '0' && cap.textContent === '1 of 10 placed · 1 right', 'E3-042', 'column 2 counts 1; the caption reads 1 of 10 placed · 1 right');
  say(chips[0].classList.contains('done') && chips[0].disabled && chips[0].getAttribute('aria-pressed') === 'false' && chips[0].querySelector('.sE3-tag').textContent === '✓ in 2', 'E3-043', 'chip 1 is done, disabled, tagged ✓ in 2');
  say(hd.textContent === 'ONE COLUMN PER KIND' && cols.every((r) => !r.classList.contains('sE3-ready') && r.getAttribute('tabindex') === '-1') && lboxes.every((b) => !b.classList.contains('sE3-ready')), 'E3-044', 'after the landing the columns and lanes disarm');
  say(/1 of 10 placed · 1 right\./.test(txt('#e3Out')) && $('#e3Out').classList.contains('has'), 'E3-045', 'the readout counts 1 of 10 placed · 1 right');
  say($('#e3Fig .sE3-nb.sE3-lit') === $$('#e3Fig .sE3-nb')[1] && $$('#e3Fig .sE3-nt')[1].classList.contains('sE3-lit'), 'E3-046', 'column 2\'s badge lights');

  /* click 3 and 4: item 2 (guess) into lane 2 (sample), wrong */
  click(chips[1]); click(lboxes[1]);
  const li2 = uls[1].querySelectorAll('li')[1];
  say(!!li2 && li2.classList.contains('flag') && li2.querySelector('b').textContent === '✗' && /Belongs under “1 · Guessed”\. A plausible-looking authority filled the slot where a real one should be\./.test(li2.querySelector('span').textContent),
    'E3-050', 'a wrong placement lands with a cross, the lane it belongs under, and its why');
  say(blocks[1].getAttribute('class') === 'sE3-blk sE3-bad' && blocks[1].getAttribute('transform') === 'translate(79,161)' && blocks[1].querySelectorAll('.sE3-bt')[1].textContent === '✗ →1', 'E3-051', 'block 2 stacks rust and dashed above block 1 and points at column 1');
  say(cns[1].textContent === '2' && cap.textContent === '2 of 10 placed · 1 right' && chips[1].querySelector('.sE3-tag').textContent === '✗ in 2, is 1' && chips[1].querySelector('.sE3-tag').classList.contains('sE3-bad'), 'E3-052', 'the count, the caption and the chip tag all record the miss');
  say(/2 of 10 placed · 1 right\./.test(txt('#e3Out')), 'E3-053', 'the readout reads 2 of 10 placed · 1 right');
  say(/Kind 2, Sampled differently, holds items 1 and 2, 1 right\./.test(svg.getAttribute('aria-label')), 'E3-054', 'the aria-label lists the items in column 2 and how many are right');

  /* click 5 and 6: item 3 by clicking the figure column 3 */
  click(chips[2]); click(cols[2]);
  say(uls[2].children.length === 1 && uls[2].querySelector('li').classList.contains('good') && blocks[2].getAttribute('transform') === 'translate(151,189)' && cap.textContent === '3 of 10 placed · 2 right', 'E3-060', 'clicking a figure column places the selected item through the real lane button');

  /* click 7 and a key: item 4 by Enter on figure column 5 */
  click(chips[3]); cols[4].focus(); key(cols[4], 'Enter');
  say(uls[4].children.length === 1 && blocks[3].getAttribute('class') === 'sE3-blk sE3-ok' && blocks[3].getAttribute('transform') === 'translate(295,189)' && cap.textContent === '4 of 10 placed · 3 right', 'E3-061', 'Enter on a focused column places the item');
  say(d.activeElement === chips[4], 'E3-062', 'after a keyboard placement focus moves to the next open chip');

  /* no-ops */
  click(lboxes[0]); click(cols[0]);
  say(cap.textContent === '4 of 10 placed · 3 right' && uls[0].children.length === 0, 'E3-063', 'a lane or a column clicked with nothing selected changes nothing');
  click(chips[0]);
  say(!chips[0].classList.contains('act') && hd.textContent === 'ONE COLUMN PER KIND' && !cols[0].classList.contains('sE3-ready'), 'E3-064', 'a done chip cannot be re-selected');
  say(!gate.classList.contains('done') && !vis($('#e3Key')), 'E3-065', 'four placed: the gate is still open and the key hidden');

  /* the rest, right */
  for (let i = 4; i < 10; i++) {
    if (i === 9) say(!gate.classList.contains('done') && cap.textContent === '9 of 10 placed · 8 right', 'E3-066', 'nine placed: the gate still waits for the tenth');
    placeByLane($$, click, i, LANE[RIGHT[i]]);
  }
  say(gate.classList.contains('done') && gate.querySelector('.mk').textContent === '✓', 'E3-070', 'placing all ten marks ga3');
  const keyEl = $('#e3Key');
  say(keyEl.style.display === 'block' && keyEl.classList.contains('has') && /Answer key/.test(keyEl.textContent) && /Score/.test(keyEl.textContent) && /9 of 10/.test(keyEl.textContent), 'E3-071', 'the key opens with a score of 9 of 10');
  say(/The fix differs by kind: a rule to write for a gap, a record for a draw, the source opened for a passage, the input cleaned for a carry, less access for an instruction\./.test(keyEl.textContent), 'E3-072', 'the key closes with the five fixes line');
  say(keyEl.querySelectorAll('.flag').length === 1 && keyEl.querySelectorAll('.good').length === 9 && /2\. Session 2: a confident citation to a case that does not exist: 1 · Guessed/.test(keyEl.textContent.replace(/\s+/g, ' ')), 'E3-073', 'the key marks the one miss and names its true lane');
  say(cap.textContent === '10 of 10 placed · 9 right' && hd.textContent === 'ALL TEN PLACED', 'E3-074', 'the caption reads 10 of 10 placed · 9 right and the header says all ten placed');
  say(cns.map((t) => t.textContent).join(',') === '2,3,2,2,1', 'E3-075', 'the column counts read 2, 3, 2, 2, 1');
  say(/10 of 10 placed, 9 right\./.test(svg.getAttribute('aria-label')) && /All ten placed; the key is below\./.test(svg.getAttribute('aria-label')) && /Kind 1, Guessed, holds items 7 and 8, 2 right/.test(svg.getAttribute('aria-label')), 'E3-076', 'the aria-label reads the final tally');
  say(blocks.every((g) => !g.classList.contains('sE3-hide') && /^translate\(\d+(\.\d+)?,\d+(\.\d+)?\)$/.test(g.getAttribute('transform'))), 'E3-077', 'every block is visible with a finite position');
  say(chips.every((c) => c.disabled && c.classList.contains('done') && c.querySelector('.sE3-tag')) && cols.every((r) => r.getAttribute('tabindex') === '-1'), 'E3-078', 'every chip is done and tagged; the columns are no longer reachable');
  say(/10 of 10 placed · 9 right\./.test(txt('#e3Out')) && /All placed\. The key is below\./.test(txt('#e3Out')), 'E3-079', 'the readout says all placed');
  say(blocks.filter((g) => g.classList.contains('sE3-ok')).length === 9 && blocks.filter((g) => g.classList.contains('sE3-bad')).length === 1, 'E3-080', 'nine teal blocks and one rust block');
  say($$('#e3Boxes .placed li').length === 10 && $$('#e3Boxes .placed li.good').length === 9 && $$('#e3Boxes .placed li.flag').length === 1, 'E3-081', 'ten landed items under the lanes, nine ticks and one cross');

  /* text, chips, dashes, words */
  const secTxt = txt('#sE3');
  const outer = sec.outerHTML;
  say(!/—|&mdash;|–|&ndash;/.test(outer), 'E3-090', 'no em dash or en dash in the section');
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric|canvas|the instructor|before Session 5)\b/i.test(secTxt), 'E3-091', 'no forbidden course-policy words in the learner-facing text');
  const confs = $$('#sE3 .conf[data-src]');
  say(confs.length === 7 && confs.every((c) => ALLOWED.includes(c.getAttribute('data-src'))), 'E3-092', 'every confidence chip (' + confs.length + ') resolves to an allowed key');
  say(confs.filter((c) => c.getAttribute('data-src') === 'src-case' && c.classList.contains('l')).length === 1 && confs.filter((c) => c.classList.contains('h')).length === 6, 'E3-093', 'six H chips and one src-case L chip');
  say(/It[’']s Just Adding One Word at a Time/.test(txt('#sE3 p.src')), 'E3-094', 'the Wolfram section name appears exactly, with its apostrophe');
  say(/Kalai and colleagues \(2025\) on guessing/.test(txt('#sE3 p.src')) && /Wolfram \(2023\), the temperature passage/.test(txt('#sE3 p.src')) && /Magesh and colleagues \(2025\) on unsupported citations/.test(txt('#sE3 p.src')) && /EchoLeak, CVE-2025-32711, on hidden instructions/.test(txt('#sE3 p.src')) && /which are constructed/.test(txt('#sE3 p.src')),
    'E3-095', 'the source line names its four sources and the constructed exercises');
  const pts = $$('#sE3 ul.pts li');
  say(pts.length === 3 && /^Two of the five are the model’s\./.test(pts[0].textContent.trim()) && /^Each kind has its own fix,/.test(pts[1].textContent.trim()) && /^The sheet travels\./.test(pts[2].textContent.trim()), 'E3-096', 'three bullets with the spec\'s leads');
  say(txt('#sE3 .check .ct').replace(/^Work along/, '').trim() === 'Place all ten.', 'E3-097', 'the gate text is the spec\'s');
  say(clean(secTxt) && clean(allLabels($$)) && clean(svg.textContent), 'E3-098', 'no "undefined" or "NaN" anywhere in the section after every control was used');
  say($$('#sE3 button').every((b) => b.getAttribute('type') === 'button') && $$('#sE3 [onclick], #sE3 a[href^="#"], #sE3 div[tabindex], #sE3 span[tabindex]').length === 0 && $$('#sE3 [role="button"]').every((r) => r.tagName.toLowerCase() === 'rect' && r.hasAttribute('tabindex')),
    'E3-099', 'every button is type=button and the only other buttons are the SVG columns with tabindex');
  say($('#e3Out').getAttribute('aria-live') === 'polite' && $('#e3List').getAttribute('role') === 'group' && $('#e3Boxes').getAttribute('role') === 'group', 'E3-100', 'the readout is live and the list and the lanes are labelled groups');
  const prose = ['#sE3 p.big', '#sE3 .hint', '#sE3 ul.pts', '#sE3 p.src', '#sE3 .check .ct'].map(txt).join(' ').replace(/\b[HML]\b/g, '').trim().split(/\s+/).length;
  say(prose < 190, 'E3-101', 'the static prose (big, hint, bullets, source, gate) is ' + prose + ' words');
  say(errs.length === 0, 'E3-102', 'zero window errors after the full happy path' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 2: the instructor override on a fresh page ================= */
{
  const { w, d, errs, $, $$, txt } = load();
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(d.body.classList.contains('reveal'), 'E3-110', 'Shift+U turns the override on');
  say($('#e3Key').style.display === 'block' && $('#e3Key').classList.contains('has') && /10 of 10/.test(txt('#e3Key')), 'E3-111', 'Shift+U opens the key with every item placed');
  say($('#e3Fig .sE3-cap').textContent === '10 of 10 placed · 10 right' && $('#e3Fig .sE3-hd').textContent === 'ALL TEN PLACED', 'E3-112', 'under the override the figure reaches 10 of 10 placed');
  say($$('#e3Fig .sE3-blk').every((g) => !g.classList.contains('sE3-hide') && g.classList.contains('sE3-ok')) && $$('#e3Fig .sE3-cn').map((t) => t.textContent).join(',') === '3,2,2,2,1', 'E3-113', 'every block stands in its true column: 3, 2, 2, 2, 1');
  say($('#sE3 .check[data-gate="ga3"]').classList.contains('done') && $$('#e3List .chip').every((c) => c.disabled), 'E3-114', 'Shift+U ticks the gate and closes every chip');
  say($$('#e3Boxes .placed li').length === 10 && $$('#e3Boxes .placed li.good').length === 10, 'E3-115', 'ten items landed, all ticks');
  say(errs.length === 0 && clean(txt('#sE3')) && clean(allLabels($$)), 'E3-116', 'zero window errors and no undefined or NaN under the override' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 3: a page nobody touched stays clean ================= */
{
  const { d, errs, $, $$, txt, click } = load();
  say(clean(txt('#sE3')) && clean(allLabels($$)) && clean($('#e3Fig svg').textContent), 'E3-120', 'the untouched section prints no undefined or NaN');
  click($$('#e3Boxes .lbox')[3]); click($$('#e3Fig .sE3-col')[3]);
  say($('#e3Fig .sE3-cap').textContent === '0 of 10 placed · 0 right' && $$('#e3Boxes .placed li').length === 0 && !$('#sE3 .check[data-gate="ga3"]').classList.contains('done'), 'E3-121', 'lanes and columns do nothing until an item is selected');
  say(errs.length === 0, 'E3-122', 'zero errors on the untouched page');
}

/* ================= run 4: everything into one column still lays out ================= */
{
  const { d, errs, $, $$, txt, click } = load();
  for (let i = 0; i < 10; i++) placeByLane($$, click, i, 0);
  const blocks = $$('#e3Fig .sE3-blk');
  say($('#e3Fig .sE3-cap').textContent === '10 of 10 placed · 3 right' && $$('#e3Fig .sE3-cn').map((t) => t.textContent).join(',') === '10,0,0,0,0', 'E3-130', 'ten in column 1: caption 10 of 10 placed · 3 right, count 10');
  const hs = blocks.map((g) => +g.querySelector('.sE3-face').getAttribute('height'));
  const ys = blocks.map((g) => +g.getAttribute('transform').match(/,(\d+(?:\.\d+)?)\)/)[1]);
  say(hs.every((h) => h > 5 && h < 13) && new Set(hs).size === 1 && Math.min(...ys) >= 68 && Math.max(...ys) <= 216 && new Set(ys).size === 10, 'E3-131', 'ten blocks shrink to one pitch and stay inside the column');
  say(blocks.every((g) => g.classList.contains('sE3-tiny')), 'E3-132', 'tiny blocks hide their text');
  say(blocks.filter((g) => g.classList.contains('sE3-ok')).length === 3 && blocks.filter((g) => g.classList.contains('sE3-bad')).length === 7, 'E3-133', 'three right, seven wrong');
  say($('#sE3 .check[data-gate="ga3"]').classList.contains('done') && /3 of 10/.test(txt('#e3Key')), 'E3-134', 'the gate ticks and the key scores 3 of 10');
  say(errs.length === 0 && clean(txt('#sE3')) && clean(allLabels($$)), 'E3-135', 'zero errors and no undefined or NaN');
}

console.log(`\n${n} assertions, ${fails} failed`);
process.exit(fails ? 1 : 0);
