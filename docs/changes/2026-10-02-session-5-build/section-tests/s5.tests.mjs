#!/usr/bin/env node
/* s5.tests.mjs <assembled page>: jsdom assertions for Session 5 §05, in the shape of
   Session 4's docs/changes/2026-09-28-session-4-notes/checks.mjs. Exit 1 on any fail.
   Run: NODE_PATH=$(npm root -g) node s5.tests.mjs /tmp/s5-test.html */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM, VirtualConsole } = require('jsdom');
const file = process.argv[2] || 'session-5/index.html';
const html = readFileSync(file, 'utf8');
const ALLOWED = ['src-noy-zhang', 'src-dellacqua', 'src-brynjolfsson', 'src-metr-2025', 'src-case'];
let fails = 0, n = 0;
const say = (ok, id, s) => { n++; if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
/* chart geometry, as the script defines it: X(v) = 40 + (v + 30) * 6 */
const X = (v) => 40 + (v + 30) * 6;

function load(reducedMotion) {
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errs.push('jsdomError: ' + (e && e.message || e)));
  vc.on('warn', (...a) => { const s = a.join(' '); if (/section s5 failed|widget error contained|^s5:/.test(s)) errs.push('warn: ' + s); });
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(win) { if (reducedMotion) win.matchMedia = () => ({ matches: true, addListener() {}, removeListener() {} }); } });
  const w = dom.window, d = w.document;
  w.addEventListener('error', (e) => errs.push('window error: ' + (e.message || e)));
  return { w, d, errs,
    $: (s) => d.querySelector(s),
    $$: (s) => [...d.querySelectorAll(s)],
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ') : ''),
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })),
    slide: (el, v) => { el.value = String(v); el.dispatchEvent(new w.Event('input', { bubbles: true })); el.dispatchEvent(new w.Event('change', { bubbles: true })); },
    vis: (el) => !!el && !el.hidden && el.style.display !== 'none',
    cls: (el) => (el ? (el.getAttribute('class') || '') : ''),
    num: (el, a) => (el ? +el.getAttribute(a) : NaN) };
}

/* ================= run 1: the happy path ================= */
{
  const { w, d, errs, $, $$, txt, click, slide, vis, cls, num } = load(false);
  say(errs.length === 0, 'S5-001', 'the page loads with zero window errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  const sec = $('#s5');
  say(!!sec && sec.getAttribute('data-nav') === 'Measure it' && sec.classList.contains('slide') && !sec.classList.contains('apx'), 'S5-002', 'section #s5 is a core slide with data-nav "Measure it"');
  say(/05 · Measure it/.test(txt('#s5 .eyebrow')) && /5 min/.test(txt('#s5 .eyebrow .mins')) && txt('#s5 h2') === 'Felt Faster Is Not Faster', 'S5-003', 'eyebrow, minutes and title as the spec says');
  const big = txt('#s5 p.big').trim();
  say(big === 'Four trials timed people with and without AI. Guess the saving, lock it, then see them, and then time your own task instead of feeling it.' && big.split(/\s+/).length < 30, 'S5-004', 'the thesis line is the spec\'s and under 30 words (' + big.split(/\s+/).length + ')');
  const roots = $$('#s5 [data-task]');
  say(roots.length === 1 && roots[0].getAttribute('data-task') === 't-s5' && roots[0].getAttribute('data-comp') === 'estimate-then-reveal', 'S5-005', 'exactly one data-task root, t-s5, family estimate-then-reveal');
  say(/Do this now: 2 minutes/.test(txt('#s5 .panel[data-task] .do')) && txt('#s5 .panel[data-task] h4') === 'Four Trials: Guess the Time Saving' && /How much faster were people with AI, on average across these four trials\? Drag, lock, reveal\./.test(txt('#s5 .panel[data-task] p.hint')), 'S5-006', 'beat 1 carries its Do-this-now line, heading and hint');

  /* beat 1 before any click */
  const gi = $('#s5Guess'), lock = $('#s5Lock'), rev = $('#s5Reveal'), out = $('#s5Out'), key = $('#s5Key'), svg = $('#s5Fig svg');
  say(!!gi && gi.min === '-30' && gi.max === '60' && gi.step === '5' && gi.value === '30' && txt('#s5 label[for="s5Guess"]') === 'Your guess: 30% faster' && gi.getAttribute('aria-valuetext') === '30% faster', 'S5-010', 'the guess slider runs from -30 to 60 in steps of 5, starts at 30, and its label reads "Your guess: 30% faster"');
  say(!!lock && !lock.disabled && !!rev && rev.disabled && lock.textContent === 'Lock my guess' && rev.textContent === 'Reveal the four trials', 'S5-011', 'Lock is live and Reveal is disabled before the lock');
  say(!!svg && svg.getAttribute('viewBox') === '0 0 600 330' && svg.getAttribute('role') === 'img' && /Empty chart from 30% slower to 60% faster, zero marked no change/.test(svg.getAttribute('aria-label')), 'S5-012', 'the figure is one 600 by 330 viewBox SVG, role img, labelled as an empty chart');
  const bars = $$('#s5Fig .s5-bar');
  say(bars.length === 4 && bars.every((b) => /\bgone\b/.test(cls(b)) && num(b, 'width') === 0), 'S5-013', 'four bars exist at load, hidden and at zero width');
  const svgTxt0 = svg.textContent;
  say(/−30%/.test(svgTxt0) && /0%/.test(svgTxt0) && /\+60%/.test(svgTxt0) && /no change/.test(svgTxt0) && /slower with AI/.test(svgTxt0) && /faster with AI/.test(svgTxt0), 'S5-014', 'the axis runs from −30% to +60% with zero marked "no change" and both directions named');
  const gline = $('#s5Fig .s5-guess'), gtag = $('#s5Fig .s5-gtag'), gdot = $('#s5Fig .s5-gdot');
  say(num(gline, 'x1') === X(30) && num(gdot, 'cx') === X(30) && gtag.textContent === 'guess: 30% faster' && !/locked/.test(cls(gline)), 'S5-015', 'the gold dashed guess marker sits at +30 and reads "guess: 30% faster", not locked');
  say(/Drag to your guess, lock it, then reveal\./.test(txt('#s5Out')) && !vis(key), 'S5-016', 'the readout waits and the key is hidden');
  const gate = $('#s5 .check[data-gate="g6"]');
  say(!!gate && !gate.classList.contains('done'), 'S5-017', 'the gate g6 exists and is not ticked at load');

  /* drag the guess */
  slide(gi, -20);
  say(txt('#s5 label[for="s5Guess"]') === 'Your guess: 20% slower' && gi.getAttribute('aria-valuetext') === '20% slower' && num(gline, 'x1') === X(-20) && gtag.textContent === 'guess: 20% slower', 'S5-020', 'a negative guess reads "20% slower" on the label and the marker moves left of zero');
  slide(gi, 0);
  say(txt('#s5 label[for="s5Guess"]') === 'Your guess: 0%, no change' && num(gline, 'x1') === X(0) && gtag.textContent === 'guess: no change', 'S5-021', 'zero reads "no change"');
  slide(gi, 35);
  say(num(gline, 'x1') === X(35) && num(gdot, 'cx') === X(35) && /gold dashed line is at 35% faster, not locked/.test(svg.getAttribute('aria-label')), 'S5-022', 'the marker follows the slider to +35 and the aria-label says so');

  /* Reveal before Lock must do nothing */
  click(rev);
  say(!gate.classList.contains('done') && bars.every((b) => /\bgone\b/.test(cls(b))) && !vis(key), 'S5-023', 'Reveal before Lock reveals nothing: no bars, no key, no gate');

  /* Lock */
  click(lock);
  say(gi.disabled && lock.disabled && lock.getAttribute('aria-disabled') === 'true' && !rev.disabled, 'S5-024', 'Lock disables the slider and itself and enables Reveal');
  say(/locked/.test(cls(gline)) && gtag.textContent === 'your guess: 35% faster' && /Your guess, 35% faster, is the gold dashed line/.test(svg.getAttribute('aria-label')), 'S5-025', 'the marker turns to its locked style and reads "your guess: 35% faster"');
  say(/35% faster, locked\. Now reveal the four trials\./.test(txt('#s5Out')), 'S5-026', 'the readout confirms the lock and points at Reveal');
  slide(gi, 60);
  say(gi.value === '35' && num(gline, 'x1') === X(35), 'S5-027', 'the slider is held at the locked value after the lock');
  say(!gate.classList.contains('done'), 'S5-028', 'the gate is still open after the lock alone');

  /* Reveal */
  click(rev);
  say(rev.disabled && rev.getAttribute('aria-disabled') === 'true', 'S5-030', 'Reveal locks itself after the click');
  say(gate.classList.contains('done') && gate.querySelector('.mk').textContent === '✓', 'S5-031', 'Reveal ticks the gate g6');
  await wait(1900); /* the 1.5 s tween */
  const widths = bars.map((b) => num(b, 'width'));
  say(widths[0] === 240 && widths[1] === 150.6 && widths[2] === 84 && widths[3] === 114, 'S5-032', 'the four bars grew to 40, 25.1, 14 and 19 points of the axis (' + widths.join(', ') + ')');
  say(num(bars[0], 'x') === X(0) && num(bars[2], 'x') === X(0) && num(bars[3], 'x') === X(0) - 114 && /\bneg\b/.test(cls(bars[3])) && bars.every((b) => !/\bgone\b/.test(cls(b))), 'S5-033', 'three bars start at zero and run right; METR runs left of zero in rust');
  const vals = $$('#s5Fig .s5-val').map((t) => t.textContent);
  say(vals.length === 4 && /40/.test(vals[0]) && /25\.1/.test(vals[1]) && /14/.test(vals[2]) && /19/.test(vals[3]) && /slower/.test(vals[3]), 'S5-034', 'the value labels contain 40, 25.1, 14 and 19 (' + vals.join(' | ') + ')');
  say($$('#s5Fig .s5-val').every((t) => !/\bgone\b/.test(cls(t))), 'S5-035', 'the value labels are visible after the tween');
  const rl = $$('#s5Fig .s5-rlab').map((t) => t.textContent);
  say(/Noy and Zhang.*writing/.test(rl[0]) && /Dell’Acqua.*consulting/.test(rl[1]) && /Brynjolfsson.*support/.test(rl[2]) && /METR.*coding/.test(rl[3]) && $$('#s5Fig .s5-rlab').every((t) => /\bon\b/.test(cls(t))), 'S5-036', 'each bar is labelled with its trial and its subject: writing, consulting, support, coding');
  const ghost = $('#s5Fig .s5-ghost'), tick = $('#s5Fig .s5-tick');
  say(num(ghost, 'x') === X(0) && num(ghost, 'width') === 120 && !/\bgone\b/.test(cls(ghost)) && num(tick, 'x1') === X(24) && !/\bgone\b/.test(cls(tick)), 'S5-037', 'beside METR a ghost bar runs to +20 and a tick stands at +24');
  const svgTxt = svg.textContent;
  say(/what they believed: about \+20/.test(svgTxt) && /what they expected: \+24/.test(svgTxt) && /−19 points outside the frontier/.test(svgTxt), 'S5-038', 'the ghost bar, the tick and the Dell\'Acqua footnote carry their labels');
  say($$('#s5Fig .s5-note, #s5Fig .s5-fnbox').every((e) => !/\bgone\b/.test(cls(e))), 'S5-039', 'the notes and the footnote marker are visible after the reveal');
  say(/Four trials on one axis/.test(svg.getAttribute('aria-label')) && /METR \(2025\) · coding −19% slower/.test(svg.getAttribute('aria-label')) && /tick at plus 24/.test(svg.getAttribute('aria-label')), 'S5-040', 'the aria-label names the four trials and the METR marks');
  const o = txt('#s5Out');
  say(out.classList.contains('has') && /Your guess: 35% faster, above 3 of the four trials and below the other 1\./.test(o), 'S5-041', 'the readout sets the guess against the spread');
  say(/From 40% faster to 19% slower: there is no one number, and none of these were planning tasks/.test(o), 'S5-042', 'the readout carries the spread sentence');
  say(/The developers believed they were about 20% faster\. They were 19% slower\. The gap between felt and timed is the reason to time it/.test(o), 'S5-043', 'the readout carries the METR sentence with "19% slower" and "20%"');
  say(vis(key) && $$('#s5Key .s5-kline').length === 4 && /Noy and Zhang \(2023\), 453 professionals/.test(txt('#s5Key')) && /758 consultants/.test(txt('#s5Key')) && /5,179 support agents/.test(txt('#s5Key')) && /16 experienced developers, 246 real tasks/.test(txt('#s5Key')), 'S5-044', 'the key opens with the four trials, one line each');
  const kc = $$('#s5Key .conf[data-src]').map((c) => c.getAttribute('data-src'));
  say(kc.join(',') === 'src-noy-zhang,src-dellacqua,src-brynjolfsson,src-metr-2025', 'S5-045', 'each key line carries its own chip');
  say(/rated quality/.test(txt('#s5Key')) && !/graded/i.test(txt('#s5')), 'S5-046', 'the Noy and Zhang line says "rated quality" (the spec\'s "graded" is a forbidden word)');

  /* the trial buttons */
  const tb = $$('#s5Rows button');
  say(tb.length === 4 && tb.every((b) => !b.disabled && b.getAttribute('type') === 'button' && b.getAttribute('aria-pressed') === 'false') && /Read one trial:/.test(txt('#s5Rows')), 'S5-050', 'four trial buttons go live after the reveal');
  click(tb[3]); /* METR */
  say(tb[3].getAttribute('aria-pressed') === 'true' && tb[3].classList.contains('act') && /\bcur\b/.test(cls(bars[3])) && /\bdim\b/.test(cls(bars[0])) && /\bcur\b/.test(cls($$('#s5Fig .s5-rlab')[3])), 'S5-051', 'picking METR marks its bar and its label and dims the other bars');
  say(/METR \(2025\), 16 experienced developers, 246 real tasks: 19% slower with AI/.test(txt('#s5Out')) && /Your guess sits 54 points above its bar\./.test(txt('#s5Out')) && $('#s5Out .conf[data-src="src-metr-2025"]'), 'S5-052', 'the readout adds the METR line, its chip and the 54-point gap to the locked guess');
  click(tb[1]); /* Dell'Acqua */
  say(tb[1].getAttribute('aria-pressed') === 'true' && tb[3].getAttribute('aria-pressed') === 'false' && /\bcur\b/.test(cls(bars[1])) && !/\bcur\b/.test(cls(bars[3])) && /Your guess sits 9\.9 points above its bar\./.test(txt('#s5Out')) && /19 percentage points less likely to be correct/.test(txt('#s5Out')), 'S5-053', 'picking Dell\'Acqua moves the mark and reads the 9.9-point gap');
  click(tb[1]);
  say(tb.every((b) => b.getAttribute('aria-pressed') === 'false') && bars.every((b) => !/\bcur\b|\bdim\b/.test(cls(b))) && /Click a trial under the chart/.test(txt('#s5Out')), 'S5-054', 'clicking the picked trial again clears the pick');

  /* beat 2: your own task */
  say(/Then this: 2 minutes/.test(txt('#s5 .panel:not([data-task]) .do')) && /Time One Task of Your Own/.test(txt('#s5 .panel:not([data-task]) h4')) && /Use your best estimate of how long the task takes you without AI, or keep the default\./.test(txt('#s5 .panel:not([data-task]) p.hint')), 'S5-060', 'beat 2 carries its heading and hint');
  const sl = $$('#s5Mine input[type=range]');
  const spec = [['s5m_base', '10', '240', '90'], ['s5m_ai', '5', '120', '25'], ['s5m_check', '0', '90', '20'], ['s5m_per', '1', '30', '8']];
  say(sl.length === 4 && spec.every(([id, mn, mx, v], i) => sl[i].id === id && sl[i].min === mn && sl[i].max === mx && sl[i].value === v), 'S5-061', 'four sliders with the spec\'s ranges and defaults: 90, 25, 20, 8');
  say(/Minutes it takes you today, no AI: 90/.test(txt('#s5Mine')) && /Minutes to draft it with AI: 25/.test(txt('#s5Mine')) && /Minutes to check the answers and write the record: 20/.test(txt('#s5Mine')) && /Times a month you do it: 8/.test(txt('#s5Mine')), 'S5-062', 'the slider labels read as the spec names them, with their values');
  say(sl[0].getAttribute('aria-valuetext') === '90 minutes' && sl[3].getAttribute('aria-valuetext') === '8 times a month', 'S5-063', 'the task sliders carry aria-valuetext');
  const my = $('#s5MyOut');
  say(/Saves 45 minutes a time/.test(txt('#s5MyOut')) && /6 hours a month at 8 a month/.test(txt('#s5MyOut')) && my.classList.contains('has'), 'S5-064', 'defaults read "Saves 45 minutes a time, 6 hours a month" (90 minus 25 minus 20, times 8)');
  const msvg = $('#s5MyFig svg');
  say(!!msvg && msvg.getAttribute('viewBox') === '0 0 340 240' && msvg.getAttribute('role') === 'img' && /Saves 45 minutes a time, 6 hours a month/.test(msvg.getAttribute('aria-label')), 'S5-065', 'the task figure is one viewBox SVG with a live aria-label');
  const rA = $('#s5MyFig .s5-twA'), rD = $('#s5MyFig .s5-twD'), rC = $('#s5MyFig .s5-twC'), rS = $('#s5MyFig .s5-twS'), rO = $('#s5MyFig .s5-twO');
  say(num(rA, 'width') === 300 && num(rD, 'width') === 83.3 && num(rC, 'x') === 99.3 && num(rC, 'width') === 66.7, 'S5-066', 'without-AI bar fills the span; the with-AI bar is draft plus checking');
  say(!/\bgone\b/.test(cls(rS)) && num(rS, 'x') === 166 && num(rS, 'width') === 150 && /\bgone\b/.test(cls(rO)), 'S5-067', 'the saved ghost spans the gap and the over outline is hidden');
  const blocks = $$('#s5MyFig .s5-blk');
  say(blocks.length === 30 && blocks.filter((b) => !/\bgone\b/.test(cls(b))).length === 8 && blocks.slice(0, 8).every((b) => num(b, 'height') === 20 && cls(b) === 's5-blk'), 'S5-068', 'eight teal blocks, one per time a month, stand on the base line');
  say(/= 6 hours saved a month/.test(msvg.textContent) && /× 8 times a month/.test(msvg.textContent) && /✓ 45 saved a time/.test(msvg.textContent) && /90 min/.test(msvg.textContent) && /45 min/.test(msvg.textContent), 'S5-069', 'the figure prints the two totals, the saving a time and the hours a month');

  slide(sl[0], 40); /* 40 - 45 = -5 */
  say(/Costs 5 more minutes a time/.test(txt('#s5MyOut')) && /0\.7 hours more a month/.test(txt('#s5MyOut')) && !my.classList.contains('has'), 'S5-070', 'when checking wipes the saving the readout reads "Costs 5 more minutes a time"');
  say(!/\bgone\b/.test(cls(rO)) && /\bgone\b/.test(cls(rS)) && num(rO, 'x') === 282.7 && num(rO, 'width') === 33.3 && blocks.slice(0, 8).every((b) => cls(b) === 's5-blk neg') && /= 0\.7 hours more a month/.test(msvg.textContent) && /✗ 5 over a time/.test(msvg.textContent), 'S5-071', 'the over outline appears, the ghost hides, the blocks turn rust');
  say(txt('#s5mv_base') === '40' && sl[0].getAttribute('aria-valuetext') === '40 minutes', 'S5-072', 'the slider label and aria-valuetext follow the input');
  slide(sl[0], 45);
  say(/Breaks even\./.test(txt('#s5MyOut')) && /= break-even/.test(msvg.textContent) && /nothing saved, nothing lost/.test(msvg.textContent) && blocks.slice(0, 8).every((b) => cls(b) === 's5-blk zero'), 'S5-073', 'base 45 breaks even');
  slide(sl[0], 240); slide(sl[1], 5); slide(sl[2], 0); slide(sl[3], 30);
  say(/Saves 235 minutes a time/.test(txt('#s5MyOut')) && /117\.5 hours a month at 30 a month/.test(txt('#s5MyOut')) && blocks.every((b) => !/\bgone\b/.test(cls(b))) && /× 30 times a month/.test(msvg.textContent), 'S5-074', 'the extremes: 235 a time, 117.5 hours a month, thirty blocks');
  slide(sl[3], 1); slide(sl[2], 90); slide(sl[1], 120); slide(sl[0], 10);
  say(/Costs 200 more minutes a time/.test(txt('#s5MyOut')) && /3\.3 hours more a month/.test(txt('#s5MyOut')) && /× 1 time a month/.test(msvg.textContent) && blocks.filter((b) => !/\bgone\b/.test(cls(b))).length === 1, 'S5-075', 'the other extreme: 200 over a time, one rust block, singular "time"');
  sl[0].value = 'abc'; sl[0].dispatchEvent(new w.Event('input', { bubbles: true }));
  say(!/\b(NaN|undefined)\b/.test(txt('#s5')) && !/\b(NaN|undefined)\b/.test(msvg.getAttribute('aria-label')), 'S5-076', 'a bad slider value never prints NaN or undefined');
  slide(sl[0], 90); slide(sl[1], 25); slide(sl[2], 20); slide(sl[3], 8);
  say(/Saves 45 minutes a time/.test(txt('#s5MyOut')) && /6 hours a month/.test(txt('#s5MyOut')), 'S5-077', 'back to the defaults, the readout returns to 45 and 6');
  await wait(700);
  say($('#s5MySay').getAttribute('aria-live') === 'polite' && /Saves 45 minutes a time, 6 hours a month\./.test(txt('#s5MySay')), 'S5-078', 'the screen-reader line speaks once the hand stops');
  say(/S5STATE\.s5=\{base:v\.base,ai:v\.ai,check:v\.check,per:v\.per\}/.test(html), 'S5-079', 'the script stores {base, ai, check, per} in S5STATE.s5 for E5');
  say(/Now stop estimating: time the next one with a clock\./.test(txt('#s5 .s5-after')), 'S5-080', 'the closing sentence is the spec\'s');

  /* bullets, source line, gate text, chips, dashes, forbidden words */
  const pts = $$('#s5 ul.pts li');
  say(pts.length === 3 && /^Four trials, four answers\./.test(pts[0].textContent.trim()) && /^Inside and outside the frontier\./.test(pts[1].textContent.trim()) && /^The baseline is the denominator\./.test(pts[2].textContent.trim()), 'S5-081', 'three bullets with the spec\'s leads');
  say(/Writing 40% faster, consulting 25% faster, support 14% more per hour, coding 19% slower\./.test(txt('#s5 ul.pts')) && /were 19 points worse outside it, and could not tell which side they were on/.test(txt('#s5 ul.pts')) && /every saving is a feeling\./.test(txt('#s5 ul.pts')), 'S5-082', 'the bullets carry the spec\'s sentences');
  say(pts[0].querySelector('.conf[data-src="src-metr-2025"]') && pts[1].querySelector('.conf[data-src="src-dellacqua"]') && !pts[2].querySelector('.conf'), 'S5-083', 'bullets 1 and 2 are chipped M; bullet 3 has no external fact');
  const src = txt('#s5 p.src');
  say(/Noy and Zhang \(2023\), Science/.test(src) && /Dell’Acqua and colleagues \(2023\), Harvard Business School working paper/.test(src) && /Brynjolfsson, Li and Raymond \(2025\), Quarterly Journal of Economics/.test(src) && /METR \(2025\), Measuring the impact of early-2025 AI on experienced open-source developer productivity/.test(src) && /All four reached through consistent secondary reports; none opened directly\./.test(src) && /Your task’s starting values are examples/.test(src), 'S5-084', 'the source line names the four trials, their status and the example values');
  say($$('#s5 p.src .conf.m').length === 4 && $$('#s5 p.src .conf.l[data-src="src-case"]').length === 1, 'S5-085', 'the source line carries four M chips and one L chip');
  say(/Lock a guess, reveal the four trials, then enter one task of your own\./.test(txt('#s5 .check .ct')), 'S5-086', 'the gate text is the spec\'s');
  const chips = $$('#s5 .conf[data-src]');
  say(chips.length >= 14 && chips.every((c) => ALLOWED.includes(c.getAttribute('data-src'))), 'S5-087', 'every confidence chip (' + chips.length + ', static and dynamic) resolves to an allowed key');
  say(chips.every((c) => /^conf [hml]$/.test(c.className) && /^(H|M|L)$/.test(c.textContent)), 'S5-088', 'every chip is conf h, m or l with a one-letter label');
  const outer = sec.outerHTML;
  say(!/—|&mdash;|–|&ndash;/.test(outer), 'S5-089', 'no em dash or en dash in the section');
  const secTxt = txt('#s5');
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric|canvas|the instructor|before Session 5)\b/i.test(secTxt), 'S5-090', 'no forbidden course-policy words in the learner-facing text');
  say(!/\b(undefined|NaN)\b/.test(secTxt) && !/\b(undefined|NaN)\b/.test(svg.getAttribute('aria-label')), 'S5-091', 'no "undefined" or "NaN" anywhere in the section after every control was used');
  const clickables = $$('#s5 [onclick], #s5 a[href^="#"], #s5 div[tabindex], #s5 span[tabindex]');
  say(clickables.length === 0 && $$('#s5 button').every((b) => b.getAttribute('type') === 'button'), 'S5-092', 'every button is type=button and nothing else pretends to be clickable');
  say(out.getAttribute('aria-live') === 'polite' && $('#s5Rows').getAttribute('role') === 'group' && $('#s5Rows').getAttribute('aria-label'), 'S5-093', 'the readout is aria-live polite and the trial row is a labelled group');
  say($$('#s5 label.fl').length === 5 && $$('#s5 label.fl').every((l) => d.getElementById(l.getAttribute('for')) && d.getElementById(l.getAttribute('for')).type === 'range'), 'S5-094', 'five labels each point at a range input');
  say($$('#s5 .s5-fig svg, #s5 .s5-myfig svg').length === 2, 'S5-095', 'the two figures were built once each (no rebuild on click)');
  say(errs.length === 0, 'S5-096', 'zero window errors after the full happy path' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  w.close();
}

/* ================= run 2: the instructor override on a fresh page, reduced motion ================= */
{
  const { w, d, errs, $, $$, txt, vis, cls, num } = load(true);
  const gi = $('#s5Guess');
  gi.value = '-30'; gi.dispatchEvent(new w.Event('input', { bubbles: true }));
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(d.body.classList.contains('reveal'), 'S5-100', 'Shift+U turns the override on');
  say(gi.disabled && gi.value === '-30' && $('#s5Lock').disabled && $('#s5Reveal').disabled && txt('#s5 label[for="s5Guess"]') === 'Your guess: 30% slower', 'S5-101', 'the override locks the slider at its value and reads it back');
  const bars = $$('#s5Fig .s5-bar');
  say(bars.map((b) => num(b, 'width')).join(',') === '240,150.6,84,114' && bars.every((b) => !/\bgone\b/.test(cls(b))), 'S5-102', 'under reduced motion the bars reach their ends at once');
  say(vis($('#s5Key')) && $$('#s5Key .s5-kline').length === 4, 'S5-103', 'the override opens the key');
  say($('#s5 .check[data-gate="g6"]').classList.contains('done'), 'S5-104', 'the override ticks the gate');
  say(/Your guess: 30% slower, below all four trials\./.test(txt('#s5Out')) && /19% slower/.test(txt('#s5Out')) && /about 20% faster/.test(txt('#s5Out')), 'S5-105', 'the readout reads the guess as below all four trials');
  say($$('#s5Rows button').every((b) => !b.disabled), 'S5-106', 'the trial buttons are live under the override');
  say(/Saves 45 minutes a time/.test(txt('#s5MyOut')), 'S5-107', 'beat 2 reads its defaults under the override');
  say(errs.length === 0, 'S5-108', 'zero window errors under the override' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  w.close();
}

/* ================= run 3: a guess that matches a bar, and a guess above all four ================= */
{
  const { w, d, errs, $, $$, txt, click, slide } = load(true);
  const gi = $('#s5Guess');
  slide(gi, 40); click($('#s5Lock')); click($('#s5Reveal'));
  const tb = $$('#s5Rows button');
  click(tb[0]);
  say(/Your guess: 40% faster, above 3 of the four trials and below the other 1\./.test(txt('#s5Out')) && /Your guess matched its bar\./.test(txt('#s5Out')) && $('#s5Out .good'), 'S5-110', 'a guess of 40 matches the Noy and Zhang bar');
  click(tb[2]);
  say(/Your guess sits 26 points above its bar\./.test(txt('#s5Out')) && /5,179 support agents/.test(txt('#s5Out')), 'S5-111', 'against Brynjolfsson the same guess sits 26 points above');
  say(errs.length === 0, 'S5-112', 'zero window errors in run 3' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  w.close();
  const r = load(true);
  r.slide(r.$('#s5Guess'), 60); r.click(r.$('#s5Lock')); r.click(r.$('#s5Reveal'));
  say(/Your guess: 60% faster, above all four trials\./.test(r.txt('#s5Out')) && r.num(r.$('#s5Fig .s5-guess'), 'x1') === X(60) && r.$('#s5Fig .s5-gtag').getAttribute('text-anchor') === 'end', 'S5-113', 'a guess of 60 reads "above all four trials" and its tag hugs the right edge');
  r.w.close();
}

/* ================= run 4: an untouched page stays clean ================= */
{
  const { w, errs, $$, txt } = load(false);
  say(!/\b(undefined|NaN)\b/.test(txt('#s5')), 'S5-120', 'the untouched section prints no undefined or NaN');
  say($$('#s5Fig .s5-bar').length === 4 && $$('#s5MyFig .s5-blk').length === 30 && /Saves 45 minutes a time/.test(txt('#s5MyOut')), 'S5-121', 'the untouched page has its figures built and beat 2 already reading');
  say(!$$('#s5 .check[data-gate="g6"]')[0].classList.contains('done'), 'S5-122', 'the gate is open on the untouched page');
  say(errs.length === 0, 'S5-123', 'zero errors on the untouched page');
  w.close();
}

console.log(`\n${n} assertions, ${fails} failed`);
process.exit(fails ? 1 : 0);
