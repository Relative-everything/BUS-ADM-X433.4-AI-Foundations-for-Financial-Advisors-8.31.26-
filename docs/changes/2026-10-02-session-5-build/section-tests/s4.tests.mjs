#!/usr/bin/env node
/* s4.tests.mjs <assembled page>: jsdom assertions for Session 5 §04, in the shape of
   Session 4's docs/changes/2026-09-28-session-4-notes/checks.mjs. Exit 1 on any fail.
   Run: NODE_PATH=$(npm root -g) node s4.tests.mjs /tmp/s4-test.html */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM, VirtualConsole } = require('jsdom');
const file = process.argv[2] || 'session-5/index.html';
const html = readFileSync(file, 'utf8');
const ALLOWED = ['src-case'];
let fails = 0, n = 0;
const say = (ok, id, s) => { n++; if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* the shared data, read out of the page's own script block so the tests never retype it
   (it sits inside the page's strict IIFE, so it is not on window) */
const DATA = (() => {
  const start = html.indexOf('var S5PKG=');
  const fx = html.indexOf('var S5FIXES=', start);
  const end = html.indexOf('];', fx) + 2;
  if (start < 0 || fx < 0 || end < 2) return { FIXES: undefined, INPUTS: undefined, PKG: undefined };
  return new Function(html.slice(start, end) + '\nreturn {PKG:S5PKG,INPUTS:S5INPUTS,FIXES:S5FIXES};')();
})();
const { FIXES, INPUTS } = DATA;

function load(opts = {}) {
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errs.push('jsdomError: ' + (e && e.message || e)));
  vc.on('warn', (...a) => { const s = a.join(' '); if (/section s4 failed|widget error contained|^s4 /.test(s)) errs.push('warn: ' + s); });
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  const src = opts.inject ? html.replace('/* ----- section s4 ----- */', opts.inject + '\n/* ----- section s4 ----- */') : html;
  const dom = new JSDOM(src, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(window) { if (opts.reduced) window.matchMedia = () => ({ matches: true, addListener() {}, removeListener() {} }); } });
  const w = dom.window, d = w.document;
  w.addEventListener('error', (e) => errs.push('window error: ' + (e.message || e)));
  let copied = '';
  Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: (t) => { copied = t; return Promise.resolve(); } }, configurable: true });
  return { w, d, errs, copiedText: () => copied,
    $: (s) => d.querySelector(s),
    $$: (s) => [...d.querySelectorAll(s)],
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ') : ''),
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })),
    vis: (el) => !!el && !el.hidden && el.style.display !== 'none',
    rowBtns: (i) => [...d.querySelectorAll(`#s4Rows .s4-row[data-k="${FIXES[i].k}"] button[data-k]`)],
    checkBtn: (i) => d.querySelector(`#s4Rows .s4-row[data-k="${FIXES[i].k}"] button[data-c="1"]`),
    vagueBtn: (i) => d.querySelector(`#s4Rows .s4-row[data-k="${FIXES[i].k}"] button[data-c="0"]`),
    tile: (id) => d.querySelector(`#s4Fig .s4-tile[data-id="${id}"]`),
    stampOf: (id) => { const t = d.querySelector(`#s4Fig .s4-tile[data-id="${id}"] .s4-stpt`); return t ? t.textContent : ''; } };
}
const inputOf = (k) => INPUTS.find((it) => it.fix === k);

/* ================= run 1: the happy path ================= */
{
  const { d, errs, $, $$, txt, click, vis, rowBtns, checkBtn, vagueBtn, tile, stampOf, copiedText } = load();
  say(errs.length === 0, 'S4-001', 'the page loads with zero window errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  say(Array.isArray(FIXES) && FIXES.length === 3 && Array.isArray(INPUTS) && INPUTS.length === 6, 'S4-002', 'the shared data is on the page: three fixes, six inputs');
  const sec = $('#s4');
  say(!!sec && sec.getAttribute('data-nav') === 'Improve it' && sec.classList.contains('slide') && !sec.classList.contains('apx'), 'S4-003', 'section #s4 is a core slide with data-nav "Improve it"');
  say(/04 · Improve it/.test(txt('#s4 .eyebrow')) && /5 min/.test(txt('#s4 .eyebrow .mins')) && txt('#s4 h2') === 'A Change You Can Defend', 'S4-004', 'eyebrow, minutes and title as the spec says');
  const big = txt('#s4 p.big').trim();
  say(big === 'Three inputs broke the brief. For each, two fixes sound reasonable. Only the ones a reader can check change the result.' && big.split(/\s+/).length < 30, 'S4-005', 'the thesis line is the spec\'s and under 30 words (' + big.split(/\s+/).length + ')');
  const roots = $$('#s4 [data-task]');
  say(roots.length === 1 && roots[0].getAttribute('data-task') === 't-s4' && roots[0].getAttribute('data-comp') === 'builder-assembler', 'S4-006', 'exactly one data-task root, t-s4, family builder-assembler');
  /* 2026-10-04 (docs/changes/2026-10-04-session-5-interactivity, S5I-007): the travelling note left; the improved version runs across five stations inside the board panel */
  say(/Do this now: 4 minutes/.test(txt('#s4 .panel[data-task] .do')) && txt('#s4 .panel[data-task] h4') === 'Pick One Fix Per Break' && /Both fixes sound like good advice\. Pick one per row and watch the six inputs re-run\./.test(txt('#s4 .panel[data-task] .hint')),
    'S4-007', 'beat 1 carries its Do-this-now line, heading and hint');
  say($$('#s4 .panel').length === 1 && !!$('#s4FlowWrap') && $('#s4FlowWrap').hidden && /How the improved version runs/.test(txt('#s4FlowWrap')), 'S4-008', 'one panel; the run strip waits hidden inside it');

  /* the rows, from S5FIXES in order */
  const rows = $$('#s4Rows .s4-row');
  say(rows.length === 3 && rows.every((r, i) => r.getAttribute('data-k') === FIXES[i].k && r.querySelector('.s4-rt').textContent === FIXES[i].title), 'S4-010', 'three rows in S5FIXES order (gap, conflict, npi), each titled from the data');
  say(rows.every((r, i) => { const inp = inputOf(FIXES[i].k); return new RegExp('Broke on input ' + (INPUTS.indexOf(inp) + 1) + ': ' + inp.n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(r.querySelector('.s4-rin').textContent); }),
    'S4-011', 'each row names the input it broke on, by number and name, from S5INPUTS');
  say(rows.every((r) => r.querySelectorAll('button[data-k]').length === 2) && rows.every((r) => [...r.querySelectorAll('button')].every((b) => b.getAttribute('type') === 'button' && b.classList.contains('btn') && b.classList.contains('sel') && b.getAttribute('aria-pressed') === 'false')),
    'S4-012', 'two btn sel options per row, type=button, aria-pressed false at load');
  const side = (i) => (rowBtns(i)[0].getAttribute('data-c') === '0' ? 'vague-left' : 'vague-right');
  say(side(0) === 'vague-left' && side(1) === 'vague-right' && side(2) === 'vague-left', 'S4-013', 'the checkable side follows the fixed pattern: vague left, right, left');
  say(rows.every((r, i) => { const t = r.textContent; return t.includes(FIXES[i].vague) && t.includes(FIXES[i].check); }), 'S4-014', 'both option texts come from S5FIXES (vague and check)');

  /* the board at load */
  const svg = $('#s4Fig svg');
  say(!!svg && svg.getAttribute('viewBox') === '0 0 360 414' && svg.getAttribute('role') === 'img' && /3 of 6 pass/.test(svg.getAttribute('aria-label')), 'S4-020', 'the board is one viewBox SVG, role img, aria-label carrying the pass count');
  say($$('#s4Fig svg').length === 1 && $$('#s4Fig .s4-tile').length === 6, 'S4-021', 'one SVG built once with six tiles');
  say(INPUTS.every((it) => { const t = tile(it.id); return !!t && t.querySelector('.s4-tname').textContent.replace(/\s+/g, ' ').trim() === it.n.replace(/\s+/g, ' ').trim(); }), 'S4-022', 'each tile names its input from S5INPUTS, wrapped in tspans');
  const failIds = INPUTS.filter((it) => !it.ok).map((it) => it.id), passIds = INPUTS.filter((it) => it.ok).map((it) => it.id);
  say(failIds.join() === 'in2,in4,in5' && failIds.every((id) => tile(id).classList.contains('fail') && stampOf(id) === '✗ FAIL') && passIds.every((id) => tile(id).classList.contains('pass') && stampOf(id) === '✓ PASS'),
    'S4-023', 'at load the three breaking inputs (in2, in4, in5) show ✗ FAIL and the other three ✓ PASS');
  say(/^3 of 6 pass$/.test(txt('#s4Fig .s4-cnt')), 'S4-024', 'the figure counter reads "3 of 6" at load');
  say(failIds.every((id) => { const b = tile(id).querySelector('.s4-tbad'); const it = INPUTS.find((x) => x.id === id); return b && b.textContent.replace(/\s+/g, ' ').trim() === it.bad && !b.classList.contains('gone'); }),
    'S4-025', 'each failing tile shows its broken line from S5INPUTS[].bad, not struck through');
  say(failIds.every((id) => tile(id).querySelector('.s4-tnow') && tile(id).querySelector('.s4-tnow').textContent === '') && passIds.every((id) => !tile(id).querySelector('.s4-tnow')), 'S4-026', 'the "now writes" slot is empty on failing tiles and absent on passing ones');
  const out = $('#s4Out');
  say(out.getAttribute('aria-live') === 'polite' && /3 of 6 inputs pass as the package stands/.test(txt('#s4Out')) && !out.classList.contains('has'), 'S4-027', 'the readout is live and waits for a pick');
  const gate = $('#s4 .check[data-gate="g5"]');
  say(!!gate && !gate.classList.contains('done') && !$('#s4Key').style.display.includes('block'), 'S4-028', 'the gate g5 is open and the key hidden at load');
  say(!!$('#s4Flow') && $$('#s4Flow svg').length === 0 && !!$('#s4Again') && $('#s4Again').textContent === 'Run it again', 'S4-029', 'the strip is not drawn until it is needed; the run-again button is in place');

  /* row 1: the vague pick */
  click(vagueBtn(0));
  await wait(120);
  const v0 = $('#s4V0');
  say(v0.querySelector('.s5stamp.bad') && v0.querySelector('.s5stamp.bad').textContent === '✗ TOO VAGUE' && v0.querySelector('.s4-why').textContent === FIXES[0].whyVague, 'S4-030', 'a vague pick stamps the row TOO VAGUE with whyVague');
  say(vagueBtn(0).classList.contains('act') && vagueBtn(0).classList.contains('bad') && vagueBtn(0).getAttribute('aria-pressed') === 'true' && checkBtn(0).getAttribute('aria-pressed') === 'false' && $('#s4N0').className === 'nb bad',
    'S4-031', 'the picked option carries act, bad and aria-pressed; the badge turns bad');
  say(tile('in2').classList.contains('fail') && stampOf('in2') === '✗ FAIL' && tile('in2').classList.contains('hit') && /^3 of 6 pass$/.test(txt('#s4Fig .s4-cnt')), 'S4-032', 'the input stays ✗ and shakes (hit class); the counter stays 3 of 6');
  say(/3 of 6 inputs pass\./.test(txt('#s4Out')) && /1 ✗ The missing appraisal: option a, too vague\./.test(txt('#s4Out')) && txt('#s4Out').includes(FIXES[0].whyVague) && /2 rows still to pick\./.test(txt('#s4Out')),
    'S4-033', 'the readout names the pick, its letter, the verdict and the why');
  say(!gate.classList.contains('done'), 'S4-034', 'one pick does not mark the gate');
  say($('#s4FlowWrap').hidden, 'S4-035', 'the strip stays hidden while a fix is vague');

  /* row 1: change the pick to the checkable one */
  click(checkBtn(0));
  await wait(700);
  say(v0.querySelector('.s5stamp.ok') && v0.querySelector('.s5stamp.ok').textContent === '✓ CHECKABLE' && v0.querySelector('.s4-why').textContent === FIXES[0].whyCheck, 'S4-040', 'a pick may be changed: the row restamps CHECKABLE with whyCheck');
  say(checkBtn(0).classList.contains('act') && checkBtn(0).classList.contains('ok') && vagueBtn(0).getAttribute('aria-pressed') === 'false' && !vagueBtn(0).classList.contains('act'), 'S4-041', 'the other option releases');
  say(tile('in2').classList.contains('pass') && tile('in2').classList.contains('fixed') && stampOf('in2') === '✓ PASS' && !tile('in2').querySelector('.s4-stp').hasAttribute('transform'), 'S4-042', 'after the tween the input flips to ✓ PASS and the stamp transform is cleared');
  say(tile('in2').querySelector('.s4-tbad').classList.contains('gone') && tile('in2').querySelector('.s4-tnow').textContent === 'now: NOT IN NOTE' && tile('in2').querySelector('.s4-tnow').classList.contains('on'),
    'S4-043', 'the broken line is struck through and the tile writes "now: NOT IN NOTE", read from the rule');
  say(/^4 of 6 pass$/.test(txt('#s4Fig .s4-cnt')) && /4 of 6 pass/.test(svg.getAttribute('aria-label')), 'S4-044', 'the counter and aria-label read 4 of 6');
  say($('#s4FlowWrap').hidden && /4 of 6 pass/.test(txt('#s4Fig .s4-cnt')), 'S4-045', 'one checkable fix is not yet the improved version: the strip stays hidden at 4 of 6');

  /* rows 2 and 3 */
  click(checkBtn(1));
  click(checkBtn(2));
  await wait(700);
  say(tile('in4').classList.contains('pass') && tile('in5').classList.contains('pass') && stampOf('in4') === '✓ PASS' && stampOf('in5') === '✓ PASS', 'S4-050', 'the conflict and npi inputs flip to ✓');
  say(tile('in4').querySelector('.s4-tnow').textContent === 'now: CONFLICT' && tile('in5').querySelector('.s4-tnow').textContent === 'now: [the client]', 'S4-051', 'their tiles write the heading CONFLICT and the token [the client]');
  say(/^6 of 6 pass$/.test(txt('#s4Fig .s4-cnt')) && svg.classList.contains('all'), 'S4-052', 'all three checkable: the figure reads "6 of 6" and carries the all class');
  say(out.classList.contains('has') && /6 of 6\. Each change names a word a reader can search for, or a step a runner can tick\./.test(txt('#s4Out')), 'S4-053', 'the readout gives the 6 of 6 sentence');
  say(/1 ✓ The missing appraisal: option b, checkable\./.test(txt('#s4Out')) && /2 ✓ The two stories: option a, checkable\./.test(txt('#s4Out')) && /3 ✓ The name and the account number: option b, checkable\./.test(txt('#s4Out')),
    'S4-054', 'the readout lists all three picks with the right letters');
  say(gate.classList.contains('done') && gate.querySelector('.mk').textContent === '✓', 'S4-055', 'three picks: the gate g5 ticks');
  const key = $('#s4Key');
  say(key.style.display === 'block' && key.classList.contains('has') && FIXES.every((f) => key.textContent.includes(f.check) && key.textContent.includes(f.title)), 'S4-056', 'the key opens with the three checkable fixes in full');
  say(!$('#s4FlowWrap').hidden && $$('#s4Flow .s4-fst').length === 5 && $$('#s4Flow .s4-fst.lit').length >= 1, 'S4-057', 'three checkable fixes: the improved version starts running across five stations');
  say(/README step 2/.test(txt('#s4Flow')) && /NOT IN NOTE/.test(txt('#s4Flow')) && /CONFLICT/.test(txt('#s4Flow')) && /eight-digit number/.test(txt('#s4Flow')) && /record/.test(txt('#s4Flow')) && /READY TO HAND OVER/.test(txt('#s4Flow')), 'S4-058', 'the five stations name the README step, the two rules, the brief, the test and the record, and the stamp reads ready to hand over');

  /* the strip (the copy button left with the note) */
  const fsvg = $('#s4Flow svg');
  say(!!fsvg && fsvg.getAttribute('role') === 'img' && /^0 0 600 \d+$/.test(fsvg.getAttribute('viewBox')) && $$('#s4Flow svg').length === 1, 'S4-060', 'the strip is one viewBox SVG, role img, built once');
  say(!$('#s4Copy') && !$('#s4Note'), 'S4-061', 'no copy button and no travelling note remain');
  await wait(2700);
  say($$('#s4Flow .s4-fst.lit').length === 5 && /READY TO HAND OVER/.test(txt('#s4Flow')), 'S4-059', 'after the run every station is lit and the stamp shows');
  click($('#s4Again'));
  await wait(60);
  say(!$('#s4FlowWrap').hidden && $$('#s4Flow svg').length === 1, 'S4-062', 'Run it again replays on the same SVG');
  say(!/undefined|NaN/.test(txt('#s4Flow')) && $$('#s4Flow .s4-ftok').length === 1, 'S4-063', 'one token, no undefined in the strip');
  say(!/—|&mdash;|–|&ndash;/.test(txt('#s4Flow')), 'S4-064', 'no em or en dash in the strip');

  /* change row 2 back to vague: the figure keeps showing the truth */
  click(vagueBtn(1));
  await wait(700);
  say(tile('in4').classList.contains('fail') && stampOf('in4') === '✗ FAIL' && tile('in4').querySelector('.s4-tnow').textContent === '' && !tile('in4').querySelector('.s4-tbad').classList.contains('gone'), 'S4-070', 'swapping a row back to vague returns its input to ✗ and un-strikes the line');
  say(/^5 of 6 pass$/.test(txt('#s4Fig .s4-cnt')) && !svg.classList.contains('all') && !out.classList.contains('has'), 'S4-071', 'the counter drops to 5 of 6');
  say(/Swap row 2: pick the other option\./.test(txt('#s4Out')) && /5 of 6 inputs pass\./.test(txt('#s4Out')), 'S4-072', 'the readout says which row to swap');
  say($('#s4FlowWrap').hidden, 'S4-073', 'the strip hides again when a row goes back to vague');
  say(gate.classList.contains('done'), 'S4-074', 'the gate stays ticked');

  /* chips, dashes, forbidden words, a11y */
  const secTxt = txt('#s4');
  const chips = $$('#s4 .conf[data-src]');
  say(chips.length === 1 && chips.every((c) => ALLOWED.includes(c.getAttribute('data-src'))) && chips[0].classList.contains('l'), 'S4-080', 'the one confidence chip is src-case L');
  say(!/—|&mdash;|–|&ndash;/.test(sec.outerHTML), 'S4-081', 'no em dash or en dash in the section');
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric|canvas|the instructor|before Session 5)\b/i.test(secTxt), 'S4-082', 'no forbidden course-policy words in the learner-facing text');
  say(!/\b(undefined|NaN)\b/.test(secTxt) && !/\b(undefined|NaN)\b/.test(svg.getAttribute('aria-label')) && !/\b(undefined|NaN)\b/.test(sec.innerHTML), 'S4-083', 'no "undefined" or "NaN" anywhere in the section after every control was used');
  say($$('#s4 button').every((b) => b.getAttribute('type') === 'button') && $$('#s4 [onclick], #s4 a[href^="#"], #s4 div[tabindex], #s4 span[tabindex]').length === 0, 'S4-084', 'every button is type=button and nothing else pretends to be clickable');
  say($$('#s4 ul.pts li').length === 3 && /A model cannot be careful\./.test(txt('#s4 ul.pts')) && /Some fixes are not prompt fixes\./.test(txt('#s4 ul.pts')) && /Defend the change with the input\./.test(txt('#s4 ul.pts')), 'S4-085', 'three bullets with the spec\'s leads');
  say($$('#s4 ul.pts li').every((li) => (li.textContent.match(/[.!?](\s|$)/g) || []).length <= 2), 'S4-086', 'each bullet is at most two sentences');
  say(/The fixes, the inputs and the re-runs are constructed for this lesson/.test(txt('#s4 p.src')), 'S4-087', 'the source line says the material is constructed');
  say(/Pick one fix for each of the three breaks, then watch the improved version run\./.test(txt('#s4 .check .ct')), 'S4-088', 'the gate text is the spec\'s (2026-10-04 wording)');
  const prose = ['#s4 p.big', '#s4 .hint', '#s4 ul.pts', '#s4 p.src', '#s4 .check .ct', '#s4 .s4-figlab', '#s4 .s4-figkey'].map((s) => $$(s).map((e) => e.textContent).join(' ')).join(' ').replace(/\s+/g, ' ').trim().split(' ').length;
  say(prose < 180, 'S4-089', 'static prose outside the interactions is under 180 words (' + prose + ')');
  say($$('#s4 .hint').every((h) => h.textContent.split(/\s+/).length <= 20), 'S4-090', 'each hint is one line');
  say(errs.length === 0, 'S4-091', 'zero window errors after the full happy path' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 2: three vague picks still mark the gate; the board tells the truth ================= */
{
  const { errs, $, txt, click, vagueBtn, tile, stampOf } = load();
  click(vagueBtn(0)); click(vagueBtn(1)); click(vagueBtn(2));
  await wait(150);
  const gate = $('#s4 .check[data-gate="g5"]');
  say(gate.classList.contains('done'), 'S4-100', 'three vague picks mark the gate: the gate counts picks, not quality');
  say(/^3 of 6 pass$/.test(txt('#s4Fig .s4-cnt')) && ['in2', 'in4', 'in5'].every((id) => tile(id).classList.contains('fail') && stampOf(id) === '✗ FAIL'), 'S4-101', 'the board still reads 3 of 6 with all three inputs failing');
  say(/Swap rows 1, 2 and 3: pick the other option in each\./.test(txt('#s4Out')) && !$('#s4Out').classList.contains('has'), 'S4-102', 'the readout asks for all three rows to be swapped');
  say($('#s4Key').style.display === 'block', 'S4-103', 'the key opens after three picks of any quality');
  say($('#s4FlowWrap').hidden && !$('#s4Flow svg'), 'S4-104', 'three vague picks: the strip never ran');
  say(!/Copied with/.test(txt('#s4Out')) && !$('#s4Copy'), 'S4-105', 'no copy flag can appear: there is no copy button');
  say(!/\b(undefined|NaN)\b/.test(txt('#s4')), 'S4-106', 'no undefined or NaN');
  say(errs.length === 0, 'S4-107', 'zero window errors');
}

/* ================= run 3: copy before all picks, and the §03 line ================= */
{
  const { errs, $, txt, click, checkBtn } = load({ inject: 'S5STATE.s3={broke:["in2","in4","in5"],called:2};' });
  say(!$('#s4Copy') && /3 of 6 inputs pass as the package stands/.test(txt('#s4Out')), 'S4-110', 'with nothing picked the readout waits (the copy flag went with the copy button)');
  click(checkBtn(2));
  await wait(50);
  say(/You found 2 of the three in §03\./.test(txt('#s4Out')), 'S4-111', 'when §03 was run, the readout\'s first line reports the §03 result');
  say(!/Copied with/.test(txt('#s4Out')) && $('#s4FlowWrap').hidden, 'S4-112', 'one pick: no flag, and the strip waits');
  say(!$('#s4 .check[data-gate="g5"]').classList.contains('done'), 'S4-113', 'one pick does not mark the gate');
  say(errs.length === 0, 'S4-114', 'zero window errors');
}

/* ================= run 4: the instructor override under reduced motion ================= */
{
  const { w, d, errs, $, $$, txt, tile, stampOf } = load({ reduced: true });
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(d.body.classList.contains('reveal'), 'S4-120', 'Shift+U turns the override on');
  say($$('#s4Rows button[data-c="1"]').every((b) => b.classList.contains('act') && b.classList.contains('ok') && b.getAttribute('aria-pressed') === 'true') && $$('#s4Rows button[data-c="0"]').every((b) => !b.classList.contains('act')), 'S4-121', 'the override picks the checkable option in every row');
  say(/^6 of 6 pass$/.test(txt('#s4Fig .s4-cnt')) && ['in2', 'in4', 'in5'].every((id) => tile(id).classList.contains('pass') && stampOf(id) === '✓ PASS'), 'S4-122', 'the board reads 6 of 6 under the override');
  say($('#s4 .check[data-gate="g5"]').classList.contains('done') && $('#s4Key').style.display === 'block' && $('#s4Key').classList.contains('has'), 'S4-123', 'the gate ticks and the key opens');
  say(/6 of 6\. Each change names a word a reader can search for/.test(txt('#s4Out')) && !$('#s4FlowWrap').hidden && $$('#s4Flow .s4-fst.lit').length === 5, 'S4-124', 'readout and strip read the finished state under the override');
  say($$('#s4 .s4-vd .s5stamp.ok').length === 3, 'S4-125', 'all three rows are stamped CHECKABLE');
  say(errs.length === 0, 'S4-126', 'zero window errors under the override' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  /* reduced motion: a pick lands at once, no shake class */
  const { errs: e2, txt: t2, click: c2, tile: tl2, vagueBtn: vb2, checkBtn: cb2 } = load({ reduced: true });
  c2(cb2(0));
  say(tl2('in2').classList.contains('pass') && /^4 of 6 pass$/.test(t2('#s4Fig .s4-cnt')), 'S4-127', 'under reduced motion the tween jumps to its end and the tile flips at once');
  c2(vb2(0));
  await wait(60);
  say(tl2('in2').classList.contains('fail') && tl2('in2').classList.contains('hit') && !tl2('in2').classList.contains('s4-shake'), 'S4-128', 'under reduced motion a vague pick marks the tile (hit) without the shake animation');
  say(e2.length === 0, 'S4-129', 'zero window errors');
}

/* ================= run 5: the untouched page stays clean ================= */
{
  const { errs, $$, txt } = load();
  say(!/\b(undefined|NaN)\b/.test(txt('#s4')), 'S4-130', 'the untouched section prints no undefined or NaN');
  say($$('#s4Rows .s4-row').length === 3 && $$('#s4Fig .s4-tile').length === 6 && $$('#s4 .s4-vd').every((v) => v.innerHTML === ''), 'S4-131', 'three rows, six tiles, no verdicts on the untouched page');
  say(errs.length === 0, 'S4-132', 'zero errors on the untouched page');
}

console.log(`\n${n} assertions, ${fails} failed`);
process.exit(fails ? 1 : 0);
