#!/usr/bin/env node
/* s8.tests.mjs <assembled page>: jsdom assertions for Session 5 §08, in the shape of
   Session 4's docs/changes/2026-09-28-session-4-notes/checks.mjs. Exit 1 on any fail.
   Run: NODE_PATH=$(npm root -g) node s8.tests.mjs /tmp/s8-test.html */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM, VirtualConsole } = require('jsdom');
const file = process.argv[2] || 'session-5/index.html';
const html = readFileSync(file, 'utf8');
const ALLOWED = ['src-lee-cognitive', 'src-case'];
const UNIT = 22; /* one slider step on the marker line, in viewBox units */
let fails = 0, n = 0;
const say = (ok, id, s) => { n++; if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };

function load() {
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errs.push('jsdomError: ' + (e && e.message || e)));
  vc.on('warn', (...a) => { const s = a.join(' '); if (/section s8 failed|widget error contained|^s8:/.test(s)) errs.push('warn: ' + s); });
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window, d = w.document;
  w.addEventListener('error', (e) => errs.push('window error: ' + (e.message || e)));
  return { w, d, errs,
    $: (s) => d.querySelector(s),
    $$: (s) => [...d.querySelectorAll(s)],
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ') : ''),
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })),
    slide: (el, v) => { el.value = String(v); el.dispatchEvent(new w.Event('input', { bubbles: true })); el.dispatchEvent(new w.Event('change', { bubbles: true })); },
    vis: (el) => !!el && !el.hidden && el.style.display !== 'none',
    /* flush the one requestAnimationFrame the section uses for its stamps and its fade-in */
    frame: () => new Promise((r) => w.requestAnimationFrame(() => r())) };
}

/* ================= run 1: the happy path ================= */
{
  const { d, errs, $, $$, txt, click, slide, vis, frame } = load();
  say(errs.length === 0, 'S8-001', 'the page loads with zero window errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  const sec = $('#s8');
  say(!!sec && sec.getAttribute('data-nav') === 'The reading' && sec.classList.contains('slide') && !sec.classList.contains('apx'), 'S8-002', 'section #s8 is a core slide with data-nav "The reading"');
  say(/08 · The reading/.test(txt('#s8 .eyebrow')) && /5 min/.test(txt('#s8 .eyebrow .mins')) && txt('#s8 h2') === 'Trust the Tool, Think Less?', 'S8-003', 'eyebrow, minutes and title as the spec says');
  const big = txt('#s8 p.big').trim();
  say(/^The assigned paper asked 319 knowledge workers/.test(big) && big.split(/\s+/).length < 30, 'S8-004', 'the thesis line is the spec\'s and under 30 words (' + big.split(/\s+/).length + ')');
  const roots = $$('#s8 [data-task]');
  say(roots.length === 1 && roots[0].getAttribute('data-task') === 't-s8' && roots[0].getAttribute('data-comp') === 'commit-first-mcq', 'S8-005', 'exactly one data-task root, t-s8, family commit-first-mcq');
  say(/Do this now: 2 minutes/.test(txt('#s8 .panel[data-task] .do')) && /Commit Before You Look/.test(txt('#s8 .panel[data-task] h4')), 'S8-006', 'beat 1 carries its Do-this-now line and heading');
  say($$('#s8 .hint').every((h) => h.textContent.trim().split(/\s+/).length <= 16), 'S8-007', 'every hint is one line');
  say($$('#s8 ul.pts li').every((li) => li.textContent.split(/[.;:?!](\s|$)/).filter((s) => s.trim().length > 3).length <= 4), 'S8-008', 'no bullet runs past two sentences');

  /* beat 1: the quiz */
  const items = $$('#s8Quiz .qitem');
  say(items.length === 2 && items.every((q) => q.querySelectorAll('.qbtns button').length === 3), 'S8-010', 'two questions, three options each');
  say(/In the survey, which predicted more critical thinking with AI\?/.test(txt('#s8Quiz')) && /where did the workers say their effort went\?/.test(txt('#s8Quiz')), 'S8-011', 'both question stems are the spec\'s');
  say(/0 of 2 answered/.test(txt('#s8Score')), 'S8-012', 'the score line starts at 0 of 2');
  const beat2 = $('#s8Beat2');
  say(!!beat2 && !vis(beat2), 'S8-013', 'beat 2 (the sliders) is hidden before any answer');
  const gate = $('#s8 .check[data-gate="g9"]');
  say(!!gate && !gate.classList.contains('done'), 'S8-014', 'the gate g9 exists and is not ticked at load');
  say($$('#s8Quiz .s8-stamp').length === 0 && items.every((q) => !q.classList.contains('s8-ok') && !q.classList.contains('s8-bad')), 'S8-009', 'no card is stamped or judged before a pick');

  const q1 = items[0].querySelectorAll('.qbtns button'), q2 = items[1].querySelectorAll('.qbtns button');
  click(q1[0]); /* the wrong answer, (a) */
  await frame();
  const fb1 = items[0].querySelector('.qfb');
  say(items[0].classList.contains('done') && q1[0].getAttribute('aria-pressed') === 'true' && q1[1].getAttribute('aria-disabled') === 'true' && q1[2].getAttribute('aria-disabled') === 'true',
    'S8-015', 'Q1 locks on the first pick: aria-pressed on the pick, the others aria-disabled');
  say(fb1.classList.contains('wrong') && /Not quite: \(b\)\. The more people trusted the tool, the less critical thinking they reported \(minus 0\.69\)\./.test(fb1.textContent), 'S8-016', 'Q1 (a) gets its written feedback with minus 0.69');
  const st1 = items[0].querySelector('.s8-stamp');
  say(!!st1 && st1.classList.contains('bad') && st1.classList.contains('on') && /✗ Not quite/.test(st1.textContent) && st1.getAttribute('aria-hidden') === 'true' && items[0].classList.contains('s8-bad'),
    'S8-017', 'a rust stamp lands on the card the moment Q1 locks, and the card turns dashed');
  click(q1[1]); /* a second pick must not change anything */
  await frame();
  say(q1[1].getAttribute('aria-pressed') === 'false' && fb1.classList.contains('wrong') && /1 of 2 answered · 0 right/.test(txt('#s8Score')) && items[0].querySelectorAll('.s8-stamp').length === 1,
    'S8-018', 'a second click on Q1 is ignored; score reads 1 of 2 answered, 0 right; one stamp only');
  say(!gate.classList.contains('done') && !vis(beat2), 'S8-019', 'after one answer the gate is still open and beat 2 still hidden');
  click(q2[1]); /* the right answer, (b) */
  await frame();
  const fb2 = items[1].querySelector('.qfb');
  say(fb2.classList.contains('right') && /Right: from gathering to verification, from problem-solving to integrating the response, from doing the task to stewarding it\./.test(fb2.textContent), 'S8-020', 'Q2 (b) gets its written feedback');
  const st2 = items[1].querySelector('.s8-stamp');
  say(!!st2 && st2.classList.contains('ok') && /✓ Right/.test(st2.textContent) && items[1].classList.contains('s8-ok'), 'S8-021', 'a teal stamp lands on Q2 and the card turns solid teal');
  say(gate.classList.contains('done') && gate.querySelector('.mk').textContent === '✓', 'S8-022', 'both answered: the gate g9 ticks');
  say(/2 of 2 answered · 1 right/.test(txt('#s8Score')), 'S8-023', 'score reads 2 of 2 answered, 1 right');
  say(vis(beat2) && beat2.classList.contains('on'), 'S8-024', 'beat 2 appears after both answers and fades in');

  /* beat 2: the sliders and the figure */
  const tool = $('#s8Tool'), me = $('#s8Self'), out = $('#s8Out'), svg = $('#s8Fig svg');
  say(!!tool && !!me && tool.min === '0' && tool.max === '10' && tool.value === '5' && me.value === '5', 'S8-030', 'two sliders 0 to 10, default 5 each');
  say($('#s8 label[for="s8Tool"]') && /How much do you trust the tool for this task\?/.test(txt('#s8 label[for="s8Tool"]')) && /How confident are you doing it yourself\?/.test(txt('#s8 label[for="s8Self"]')), 'S8-029', 'both sliders are labelled with the spec\'s questions');
  say(!!svg && /^0 0 560 300$/.test(svg.getAttribute('viewBox')) && svg.getAttribute('role') === 'img' && /minus 0\.69/.test(svg.getAttribute('aria-label')) && /plus 0\.26/.test(svg.getAttribute('aria-label')),
    'S8-031', 'the figure is one viewBox SVG, role img, with an aria-label naming both coefficients');
  say($$('#s8Fig svg').length === 1, 'S8-028', 'the figure is built once (one SVG in the host)');
  const svgText = svg.textContent;
  say(/minus 0\.69/.test(svgText) && /plus 0\.26/.test(svgText) && /confidence in the tool/.test(svgText) && /confidence in yourself/.test(svgText) && /Effect on critical thinking, from the survey/.test(svgText),
    'S8-032', 'band A: the two labelled coefficient bars');
  const rTool = $('#s8Fig .s8-rust .s8-rect'), rMe = $('#s8Fig .s8-teal .s8-rect');
  say(+rTool.getAttribute('width') === Math.round(0.69 * 170) && +rMe.getAttribute('width') === Math.round(0.26 * 170) && +rTool.getAttribute('x') + +rTool.getAttribute('width') === 330 && +rMe.getAttribute('x') === 330,
    'S8-026', 'band A bars share one zero line: the rust bar points left from it, the teal bar right, in the paper\'s proportion');
  say(rTool.style.transform === 'scaleX(1)' && rMe.style.transform === 'scaleX(1)', 'S8-027', 'both bars have grown in (scaleX 1) once beat 2 opened');
  const pv = $$('#s8Fig .s8-act .s8-pv').map((t) => t.textContent);
  const pn = $$('#s8Fig .s8-act .s8-pn').map((t) => t.textContent);
  say(pv.join(',') === '72%,79%,69%,72%,76%,55%' && pn.join(',') === 'knowledge,comprehension,application,analysis,synthesis,evaluation', 'S8-033', 'band B: six activity bars with the paper\'s shares in order');
  const rects = $$('#s8Fig .s8-act rect').map((r) => +r.getAttribute('height'));
  say(rects.length === 6 && rects[1] > rects[0] && rects[5] < rects[2] && rects.every((h) => h > 0) && rects[1] - rects[5] >= 12, 'S8-034', 'band B bar heights follow the shares (79 tallest, 55 shortest, a visible spread)');
  say(/likely to skip the check/.test(svgText) && /likely to check/.test(svgText) && /you · even/.test(svgText), 'S8-035', 'band C: the line is labelled at both ends and the marker reads "you · even" at 5 and 5');
  const you = $('#s8Fig .s8-you'), fill = $('#s8Fig .s8-fill');
  const pos0 = you.style.transform;
  say(/translate\(0px/.test(pos0) && fill.style.transform === 'scaleX(0)' && /s8-mid/.test(svg.getAttribute('class')), 'S8-036', 'at 5 and 5 the marker sits on the centre, the fill is scaleX(0), the zone class is mid');
  say(/Move either slider/.test(txt('#s8Out')) && !out.classList.contains('has'), 'S8-037', 'the readout waits for a slider before it reads');

  slide(tool, 9); slide(me, 2);
  say(txt('#s8ToolVal') === '9' && txt('#s8SelfVal') === '2' && tool.getAttribute('aria-valuetext') === '9 of 10', 'S8-040', 'slider values and aria-valuetext follow the input');
  say(new RegExp(`^translate\\(${-7 * UNIT}px,\\s?0px\\)$`).test(you.style.transform) && fill.style.transform === 'scaleX(-7)' && /s8-skip/.test(svg.getAttribute('class')) && /you · skip/.test(svg.textContent),
    'S8-041', 'tool 9, self 2: the marker moves left by 7 units, the fill mirrors left, the zone is skip and the marker says so');
  say(out.classList.contains('has') && /Trust in the tool high, confidence in yourself low: the survey’s pattern for the least checking\./.test(txt('#s8Out')) && /Session 4’s record and Session 3’s opened source/.test(txt('#s8Out')) && /Tool 9 of 10 · Yourself 2 of 10/.test(txt('#s8Out')),
    'S8-042', 'the readout gives the least-checking reading with both values');
  say(/at the least checking: tool 9 of 10, yourself 2 of 10/.test(svg.getAttribute('aria-label')), 'S8-043', 'the aria-label follows the sliders');
  say(gTool(d).style.opacity === '0.94' && gMe(d).style.opacity === '0.52' && $('#s8Fig .s8-strip').style.opacity === '0.94', 'S8-044', 'the tool bar and the activity strip come forward with trust in the tool; the self bar steps back');
  slide(tool, 1); slide(me, 10);
  say(new RegExp(`^translate\\(${9 * UNIT}px,\\s?0px\\)$`).test(you.style.transform) && fill.style.transform === 'scaleX(9)' && /s8-check/.test(svg.getAttribute('class')) && /you · check/.test(svg.textContent),
    'S8-045', 'tool 1, self 10: the marker moves right by 9 units, the zone is check');
  say(/Confidence in yourself high, trust in the tool low: the survey’s pattern for the most checking\./.test(txt('#s8Out')) && /Tool 1 of 10 · Yourself 10 of 10/.test(txt('#s8Out')), 'S8-046', 'the opposite reading');
  slide(tool, 6); slide(me, 4);
  say(new RegExp(`^translate\\(${-2 * UNIT}px,\\s?0px\\)$`).test(you.style.transform) && /s8-mid/.test(svg.getAttribute('class')) && /Both about even: the survey’s middle\./.test(txt('#s8Out')) && /you · even/.test(svg.textContent), 'S8-047', 'tool 6, self 4: the middle reading, still "even" on the marker');
  tool.value = 'abc'; tool.dispatchEvent(new (load().w.Event)('input', { bubbles: true }));
  say(!/NaN|undefined/.test(txt('#s8')) && !/NaN|undefined/.test(svg.getAttribute('aria-label')) && /translate\(-?\d+px/.test(you.style.transform), 'S8-048', 'a bad slider value never prints NaN or undefined');
  slide(tool, 10); slide(me, 0);
  const lx = +$('#s8Fig .s8-track').getAttribute('x1'), rx = +$('#s8Fig .s8-track').getAttribute('x2');
  say(new RegExp(`^translate\\(${-10 * UNIT}px,\\s?0px\\)$`).test(you.style.transform) && 280 - 10 * UNIT === lx && 280 + 10 * UNIT === rx && rx + 50 <= 560 && lx - 50 >= 0, 'S8-049', 'the extremes land exactly on the line ends, and the marker label has room inside the viewBox at both ends');
  const marks = [];
  for (const [t, s] of [[0, 0], [10, 10], [3, 7], [7, 3], [2, 5]]) { slide(tool, t); slide(me, s); marks.push(you.style.transform); }
  say(new Set(marks).size === 4 && marks[0] === marks[1], 'S8-038', 'equal pairs share one position; different gaps give different positions');

  /* beat 3: seal, then the five */
  const ta = $('#s8Carry'), seal = $('#s8Seal'), five = $('#s8Five'), stamp = $('#s8Stamp');
  say(/Then this: 1 minute/.test(txt('#s8 .panel:not([data-task]) .do')) && /One Thing You Carry/.test(txt('#s8 .panel:not([data-task]) h4')), 'S8-039', 'beat 3 carries its Then-this line and heading');
  say(!!ta && !!seal && seal.textContent === 'Seal it' && !vis(five) && five.classList.contains('keyhide') && !vis(stamp), 'S8-050', 'the textarea, the Seal button and the hidden keyhide five are in place');
  say(/It stays on this page\./.test(txt('#s8 .rlab')) && $('#s8 label.rlab').getAttribute('for') === 's8Carry', 'S8-051', 'the label says the line stays on the page and points at the textarea');
  click(seal);
  say(!vis(five) && /Write your one line first/.test(txt('#s8SealMsg')) && !seal.disabled, 'S8-052', 'Seal with an empty line does not reveal; it asks for the line');
  ta.value = '  Open the source behind   the first number before I send anything. ';
  click(seal);
  say(vis(five) && five.classList.contains('has') && seal.disabled && seal.getAttribute('aria-disabled') === 'true' && seal.textContent === 'Sealed' && ta.readOnly && vis(stamp), 'S8-053', 'Seal with a line: the five open, the button and textarea lock, the stamp shows');
  say(txt('#s8Mine') === 'Open the source behind the first number before I send anything.' && vis($('#s8Mine')), 'S8-054', 'the learner\'s line is echoed as text, whitespace folded');
  const li = $$('#s8Five ol.s8-five li');
  say(li.length === 5 && /It predicts; it does not know\./.test(li[0].textContent) && /It samples a plausible answer rather than computing the true one/.test(li[1].textContent) && /Grounded means it cites your file, and the nearest passage is not always the right one\./.test(li[2].textContent) && /Four stops around the model: what goes in, where it goes, how you check, what you keep\./.test(li[3].textContent) && /A workflow is finished when a stranger can run it and you can measure the result\./.test(li[4].textContent),
    'S8-055', 'the five principles, numbered and in order');
  say(li.every((l, i) => l.querySelector('.nb') && l.querySelector('.nb').textContent === String(i + 1) && new RegExp('Session ' + (i + 1)).test(l.textContent)), 'S8-056', 'each principle carries its number badge and its session tag');
  ta.value = 'another'; click(seal);
  say(txt('#s8Mine') === 'Open the source behind the first number before I send anything.', 'S8-057', 'a second Seal changes nothing');

  /* the closing box */
  const stops = $$('#s8 .talk .s8gates .s8gate');
  say(stops.length === 4 && /^1 Explain/.test(stops[0].textContent) && /^2 Break/.test(stops[1].textContent) && /^3 Improve/.test(stops[2].textContent) && /^4 Keep/.test(stops[3].textContent), 'S8-060', 'the closing check has four stops: Explain, Break, Improve, Keep');
  say(/Closing check/.test(txt('#s8 .talk .th')) && /Answer all four for the workflow you presented, or for one of your own\./.test(txt('#s8 .talk')), 'S8-061', 'the closing line is the spec\'s');

  /* numbers, chips, dashes, forbidden words */
  const secTxt = txt('#s8');
  say(/\b319\b/.test(secTxt) && /\b936\b/.test(secTxt) && /59%/.test(secTxt) && /0\.69/.test(secTxt) && /0\.26/.test(secTxt), 'S8-070', 'the numbers 319, 936, 59%, 0.69 and 0.26 appear in the section');
  say(/55% to 79%/.test(secTxt) && /minus 0\.69/.test(secTxt) && /plus 0\.26/.test(secTxt), 'S8-071', 'the effort range and the two coefficients are written as words, minus and plus');
  const outer = sec.outerHTML;
  say(!/—|&mdash;|–|&ndash;/.test(outer), 'S8-072', 'no em dash or en dash in the section');
  say(!/−/.test(outer) && !/&minus;/.test(outer), 'S8-073', 'no minus-sign glyph (U+2212)');
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric|canvas|the instructor|before Session 5)\b/i.test(secTxt), 'S8-074', 'no forbidden course-policy words in the learner-facing text');
  const chips = $$('#s8 .conf[data-src]');
  say(chips.length >= 5 && chips.every((c) => ALLOWED.includes(c.getAttribute('data-src'))), 'S8-075', 'every confidence chip (' + chips.length + ') resolves to an allowed key');
  say(chips.filter((c) => c.getAttribute('data-src') === 'src-lee-cognitive').length === 4 && chips.filter((c) => c.getAttribute('data-src') === 'src-case').length === 1, 'S8-076', 'four Lee chips (three bullets plus the source line) and one src-case chip');
  say($$('#s8 ul.pts li').length === 3 && /What the paper measured\./.test(txt('#s8 ul.pts')) && /Trust cuts checking\./.test(txt('#s8 ul.pts')) && /The work moved; it did not vanish\./.test(txt('#s8 ul.pts')), 'S8-077', 'three bullets with the spec\'s leads');
  say(/Lee, Sarkar, Tankelevitch, Drosos, Rintel, Banks and Wilson \(2025\), CHI/.test(txt('#s8 p.src')) && /Self-reported and cross-sectional/.test(txt('#s8 p.src')) && /The five principles restate this course/.test(txt('#s8 p.src')), 'S8-078', 'the source line names the paper and its limits');
  say(/Answer both questions, then set your two confidences\./.test(txt('#s8 .check .ct')), 'S8-079', 'the gate text is the spec\'s');
  say(!/\b(undefined|NaN)\b/.test(secTxt) && !/\b(undefined|NaN)\b/.test($('#s8Fig svg').getAttribute('aria-label')), 'S8-080', 'no "undefined" or "NaN" anywhere in the section after every control was used');
  say(errs.length === 0, 'S8-081', 'zero window errors after the full happy path' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  /* every clickable thing is a real button, every readout is live */
  const clickables = $$('#s8 [onclick], #s8 a[href^="#"], #s8 div[tabindex], #s8 span[tabindex]');
  say(clickables.length === 0 && $$('#s8 button').every((b) => b.getAttribute('type') === 'button'), 'S8-082', 'every button is type=button and nothing else pretends to be clickable');
  say($('#s8Out').getAttribute('aria-live') === 'polite' && $('#s8Score').getAttribute('aria-live') === 'polite' && $('#s8SealMsg').getAttribute('aria-live') === 'polite', 'S8-083', 'the readouts carry aria-live=polite');
  say($$('#s8 .keyhide').length === 1 && $('#s8 .keyhide').id === 's8Five', 'S8-084', 'the one keyhide panel is the five principles');
  function gTool(doc) { return doc.querySelector('#s8Fig .s8-rust'); }
  function gMe(doc) { return doc.querySelector('#s8Fig .s8-teal'); }
}

/* ================= run 2: the instructor override on a fresh page ================= */
{
  const { w, d, errs, $, txt, vis } = load();
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(d.body.classList.contains('reveal'), 'S8-090', 'Shift+U turns the override on');
  say(vis($('#s8Beat2')), 'S8-091', 'Shift+U opens beat 2 without the quiz');
  say($('#s8Five').style.display === 'block' && $('#s8Five').classList.contains('has'), 'S8-092', 'Shift+U opens the five principles');
  say($('#s8 .check[data-gate="g9"]').classList.contains('done'), 'S8-093', 'Shift+U ticks the gate');
  say(/Both about even/.test(txt('#s8Out')), 'S8-094', 'under the override the readout reads at once (both at 5)');
  say($('#s8Fig .s8-rust .s8-rect').style.transform === 'scaleX(1)', 'S8-089', 'under the override the coefficient bars are grown');
  say(errs.length === 0, 'S8-095', 'zero window errors under the override' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  /* typing in the textarea must not trigger the override */
  const { w: w2, d: d2, $: $2 } = load();
  const ta = $2('#s8Carry'); ta.focus();
  ta.dispatchEvent(new w2.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(!d2.body.classList.contains('reveal'), 'S8-096', 'a capital U typed in the textarea does not fire the override');
  ta.value = '<b>one line</b>';
  ta.dispatchEvent(new w2.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
  say($2('#s8Five').style.display === 'block' && $2('#s8Seal').disabled, 'S8-097', 'Enter in the textarea seals the line');
  say($2('#s8Mine').textContent === '<b>one line</b>' && !$2('#s8Mine b'), 'S8-058', 'the echoed line is text, never markup');
}

/* ================= run 3: a static page (no sliders moved) stays clean ================= */
{
  const { d, errs, $$, txt } = load();
  say(!/\b(undefined|NaN)\b/.test(txt('#s8')), 'S8-098', 'the untouched section prints no undefined or NaN');
  const grid = $$('#s8 .s8gates .s8gate');
  say(grid.length === 4, 'S8-099', 'four closing stops on the untouched page');
  say(errs.length === 0, 'S8-100', 'zero errors on the untouched page');
}

/* ================= run 4: the section's own markup, CSS block and script block, read out of the page ================= */
{
  const cut = (startMark, endRe) => { const i = html.indexOf(startMark); if (i < 0) return ''; const rest = html.slice(i + startMark.length); const m = endRe.exec(rest); return m ? rest.slice(0, m.index) : rest; };
  const js = cut('/* ----- section s8 ----- */', /\/\* ----- section |\/\* ===== |<\/script>/);
  const css = cut('/* ===== s8 ===== */\n/* ===== s8 ===== */', /\/\* ===== |<\/style>/);
  const frag = cut('<section class="slide" id="s8"', /<\/section>/);
  say(js.length > 1000 && css.length > 200 && frag.length > 1000, 'S8-100', 'the three blocks are found in the page (' + js.length + ', ' + css.length + ', ' + frag.length + ' chars)');
  say(!/—|–|−/.test(js + css + frag), 'S8-101', 'no em dash, en dash or minus sign in the section\'s markup, CSS block or script block');
  say(!/\b(const|let)\b|=>|`/.test(js.replace(/\/\*[\s\S]*?\*\//g, '')), 'S8-102', 'the script is ES5: no const, let, arrows or template literals');
  say(!/localStorage|sessionStorage|indexedDB|cookie|fetch\(|XMLHttpRequest|innerHTML\s*=\s*[^;]*ta\.value/.test(js), 'S8-103', 'no storage, no network, and the learner\'s line never enters innerHTML');
  say(css.split('\n').filter((l) => /^[^@\s\/].*\{/.test(l)).every((l) => /^#s8\b/.test(l.trim())), 'S8-104', 'every CSS rule is scoped to #s8');
}

console.log(`\n${n} assertions, ${fails} failed`);
process.exit(fails ? 1 : 0);
