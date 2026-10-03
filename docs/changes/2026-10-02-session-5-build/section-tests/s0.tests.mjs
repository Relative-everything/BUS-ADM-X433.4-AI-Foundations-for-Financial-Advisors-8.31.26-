#!/usr/bin/env node
/* s0.tests.mjs <assembled page>: jsdom assertions for Session 5 s0 (the opener), in the shape of
   Session 4's docs/changes/2026-09-28-session-4-notes/checks.mjs. Exit 1 on any fail.
   Run: NODE_PATH=$(npm root -g) node s0.tests.mjs /tmp/s0-test.html */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM, VirtualConsole } = require('jsdom');
const file = process.argv[2] || 'session-5/index.html';
const html = readFileSync(file, 'utf8');
const ALLOWED = ['src-case'];
let fails = 0, n = 0;
const say = (ok, id, s) => { n++; if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function load() {
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errs.push('jsdomError: ' + (e && e.message || e)));
  vc.on('warn', (...a) => { const s = a.join(' '); if (/section s0 failed|widget error contained/.test(s)) errs.push('warn: ' + s); });
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window, d = w.document;
  w.addEventListener('error', (e) => errs.push('window error: ' + (e.message || e)));
  return { w, d, errs,
    $: (s) => d.querySelector(s),
    $$: (s) => [...d.querySelectorAll(s)],
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ').trim() : ''),
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })),
    vis: (el) => !!el && !el.hidden && el.style.display !== 'none' };
}

const STOPS = [
  { lab: 'Predicts', ses: 'Session 1', p: 'It predicts the next word; it does not know.', q: 'what would make this answer wrong?', use: ['§03', 'Appendix E3'], hrefs: ['#s3', '#sE3'] },
  { lab: 'Shape it', ses: 'Session 2', p: 'You shape the output with the ask: persona, task, context, format.', q: 'what did I leave out of the ask?', use: ['§02', '§04'], hrefs: ['#s2', '#s4'] },
  { lab: 'Reads your file', ses: 'Session 3', p: 'Grounded, it cites your file, and the nearest passage is not always the right one.', q: 'did I open the source?', use: ['§06', 'Appendix E3'], hrefs: ['#s6', '#sE3'] },
  { lab: 'Answer for it', ses: 'Session 4', p: 'No AI rulebook: what goes in, where it goes, how you check, what you keep.', q: 'could an examiner re-check this?', use: ['§03', '§06'], hrefs: ['#s3', '#s6'] },
  { lab: 'Hand it over', ses: 'Session 5', p: 'A workflow is finished when a stranger can run it and you can measure the result.', q: 'where does a stranger stop first?', use: null },
];
const ONE = 'Session 5’s one thing: take any AI workflow, yours or a stranger’s, and do four things with it: explain it, break it, improve it, and say what stays yours.';
const FIRST = 'The box changed. The ring did not: those five are yours whichever model is in the middle.';
const GENS = ['a 2023 model', 'a 2025 model', 'a 2026 model', 'the next one'];

/* ================= run 1: the happy path ================= */
{
  const { d, errs, $, $$, txt, click } = load();
  say(errs.length === 0, 'S0-001', 'the page loads with zero window errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  const sec = $('#s0');
  say(!!sec && sec.getAttribute('data-nav') === 'Bridge + frame' && sec.classList.contains('slide') && !sec.classList.contains('apx'), 'S0-002', 'section #s0 is a core slide with data-nav "Bridge + frame"');
  say(txt('#s0 .eyebrow span:first-child') === 'BUS ADM X433.4 · Session 5' && txt('#s0 .eyebrow .mins') === '5 min', 'S0-003', 'eyebrow and minutes as the spec says');
  say(txt('#s0 h1') === 'Final Project and Advisor Use Case Deep Dive' && !$('#s0 h2'), 'S0-004', 'the title is an h1 with the spec\'s words');
  say(txt('#s0 p.lede') === 'The tools change. The judgment does not. This session hands a workflow to a stranger and watches what survives.', 'S0-005', 'the lede is the spec\'s');

  /* the pacing panel and the tier bar, first */
  const panels = $$('#s0 .panel');
  say(panels.length === 4 && panels[0].classList.contains('pace') && panels[1].getAttribute('data-task') === 't-s0' && panels[2].classList.contains('s0-frame') && /The Coles, in two lines/.test(panels[3].textContent),
    'S0-006', 'four panels in order: pace, bridge (the data-task root), frame, the Coles');
  const pace = txt('#paceOut');
  say(/54 min\s*10 core sections/.test(pace) && /66 min\s*5 appendix sections/.test(pace) && /120 min\s*everything/.test(pace), 'S0-007', '#paceOut renders 54 min / 10 core sections, 66 min / 5 appendix sections, 120 min / everything');
  say($$('#paceOut .pgrid .pcell').length === 3 && $$('#paceOut .pcell b').map((b) => b.textContent).join('|') === '54 min|66 min|120 min', 'S0-008', 'the pacing readout uses the house pgrid/pcell markup with the three totals');
  const tb = $$('#tierbar button');
  say(tb.length === 4 && tb.map((b) => b.textContent).join('|') === 'Foundational|+ Standard|+ Advanced|Core only', 'S0-009', '#tierbar has the four buttons with the exact Session 4 labels');
  say(tb[0].getAttribute('data-level') === '0' && tb[1].getAttribute('data-level') === '1' && tb[2].getAttribute('data-level') === '2' && tb[3].hasAttribute('data-core') && tb[3].classList.contains('core') && !tb[3].hasAttribute('data-level'),
    'S0-010', 'data-level 0, 1, 2 and data-core on the fourth');
  say(tb[1].classList.contains('on') && tb[3].classList.contains('on') && txt('#tierbar .tl') === 'Appendix depth', 'S0-011', '+ Standard and Core only start on, under the Appendix depth label, as Session 4');
  say(d.body.classList.contains('core-only'), 'S0-012', 'the scaffold\'s depth control bound to the bar: core-only at load');
  click(tb[2]);
  say(tb[2].classList.contains('on') && !tb[1].classList.contains('on') && !tb[3].classList.contains('on') && !d.body.classList.contains('core-only'), 'S0-013', 'clicking + Advanced moves the on state and leaves core-only');
  click(tb[3]);
  say(tb[3].classList.contains('on') && d.body.classList.contains('core-only'), 'S0-014', 'Core only toggles back');

  /* beat 1: the bridge quiz */
  const root = $('#s0 [data-task]');
  say($$('#s0 [data-task]').length === 1 && root.getAttribute('data-comp') === 'retrieval-bridge', 'S0-020', 'exactly one data-task root, t-s0, family retrieval-bridge');
  say(txt('#s0 [data-task] .do') === 'Retrieval bridge: 3 minutes' && txt('#s0 [data-task] h4') === 'Session 4 Recall: Three Questions' && /No notes\. Say a letter for each, then click it\. The answer locks\./.test(txt('#s0 [data-task] .hint')),
    'S0-021', 'the bridge panel carries its Do line, heading and hint in Session 4\'s shape');
  const items = $$('#bridgeQuiz .qitem');
  say(items.length === 3 && items.every((q) => q.querySelectorAll('.qbtns button').length === 3) && $('#bridgeQuiz').classList.contains('quiz'), 'S0-022', 'three questions, three options each, in a .quiz host');
  const stems = items.map((q) => q.querySelector('.qtext').textContent);
  say(stems[0] === '1. Your firm signed nothing: you clicked Accept on a personal plan. By default, what happens to what you type?' &&
      stems[1] === '2. Her name and her company’s name are gone from the prompt. What can still point to her?' &&
      stems[2] === '3. An examiner asks to re-check a memo a year on. Which record lets them?', 'S0-023', 'the three stems are the spec\'s');
  const opt = (i, j) => items[i].querySelectorAll('.qbtns button')[j].textContent;
  say(opt(0, 0) === '(a) It is deleted when the chat ends.' && opt(0, 1) === '(b) Your click is the contract: it may be used for training and kept, at some vendors for years, unless you switch training off.' && opt(0, 2) === '(c) Nothing is kept on a personal plan.',
    'S0-024', 'Q1 options (a), (b), (c) as the spec');
  say(opt(1, 0) === '(a) Nothing: without a name she is anonymous.' && opt(1, 1) === '(b) Her trade and her town together.' && opt(1, 2) === '(c) Only her account number.',
    'S0-025', 'Q2 options as the spec');
  say(opt(2, 0) === '(a) A CRM note: used AI to draft; reviewed and sent.' && opt(2, 1) === '(b) The answer itself, with the model and setting, the date, who prepared it, and what you decided.' && opt(2, 2) === '(c) A summary of the answer in your own words.',
    'S0-026', 'Q3 options as the spec');
  say(txt('#bridgeScore') === '0 of 3 answered' && $('#bridgeScore').getAttribute('aria-live') === 'polite', 'S0-027', 'the score line starts at 0 of 3 and is live');
  const gate = $('#s0 .check[data-gate="g1"]');
  say(!!gate && !gate.classList.contains('done') && $$('#s0 [data-gate]').length === 1 && txt('#s0 .check .ct b') === 'Work along' && gate.querySelector('.ct').lastChild.textContent.trim() === 'Answer all three recall questions.', 'S0-028', 'one gate g1, open at load, with the spec\'s text');

  const q1 = items[0].querySelectorAll('.qbtns button'), q2 = items[1].querySelectorAll('.qbtns button'), q3 = items[2].querySelectorAll('.qbtns button');
  click(q1[0]); /* wrong: (a) */
  const fb1 = items[0].querySelector('.qfb');
  say(items[0].classList.contains('done') && q1[0].getAttribute('aria-pressed') === 'true' && q1[1].getAttribute('aria-disabled') === 'true' && q1[2].getAttribute('aria-disabled') === 'true',
    'S0-030', 'Q1 locks on the first pick: aria-pressed on the pick, the others aria-disabled');
  say(fb1.classList.contains('wrong') && fb1.textContent === 'Not quite: (b). Session 4, §03: the plan changes the contract, not the model; on a personal plan the training switch starts on, and the calendar of how long each vendor keeps it runs to five years.', 'S0-031', 'Q1 (a) gets its written feedback');
  say(q1[0].classList.contains('s0bad') && !q1[0].classList.contains('s0ok') && q1[1].classList.contains('s0key') && !q1[2].classList.contains('s0key'), 'S0-032', 'a wrong pick gets s0bad (rust, cross) and the right option gets s0key (dashed ring, tick)');
  click(q1[1]);
  say(q1[1].getAttribute('aria-pressed') === 'false' && !q1[1].classList.contains('picked') && fb1.classList.contains('wrong') && txt('#bridgeScore') === '1 of 3 answered · 0 right', 'S0-033', 'a second click on Q1 is ignored; the score reads 1 of 3 answered, 0 right');
  say(!gate.classList.contains('done'), 'S0-034', 'after one answer the gate is still open');
  click(q2[1]); /* right: (b) */
  const fb2 = items[1].querySelector('.qfb');
  say(fb2.classList.contains('right') && fb2.textContent === 'Right: an aerospace-fastener maker in one town is one company. Facts that are not names add up.', 'S0-035', 'Q2 (b) gets its Right feedback');
  say(q2[1].classList.contains('s0ok') && !q2[1].classList.contains('s0bad') && !items[1].querySelector('.s0key'), 'S0-036', 'a right pick gets s0ok and no key ring is drawn');
  say(!gate.classList.contains('done') && txt('#bridgeScore') === '2 of 3 answered · 1 right', 'S0-037', 'after two answers the gate is still open; 2 of 3, 1 right');
  click(q3[2]); /* wrong: (c) */
  const fb3 = items[2].querySelector('.qfb');
  say(fb3.classList.contains('wrong') && fb3.textContent === 'Not quite: (b). If the model misread the clause, your summary repeats its error.' && q3[2].classList.contains('s0bad') && q3[1].classList.contains('s0key'), 'S0-038', 'Q3 (c) gets its feedback, s0bad on the pick and s0key on (b)');
  say(gate.classList.contains('done') && gate.querySelector('.mk').textContent === '✓', 'S0-039', 'all three answered: the gate g1 ticks');
  say(txt('#bridgeScore') === '3 of 3 answered · 1 right', 'S0-040', 'score reads 3 of 3 answered, 1 right');
  const css = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
  say(/#s0 #bridgeQuiz \.qbtns button\.s0bad\{background:var\(--warn\)/.test(css) && /#s0 #bridgeQuiz \.qbtns button\.s0bad::after\{content:" \\2717"\}/.test(css) && /#s0 #bridgeQuiz \.qbtns button\.s0key\{outline:2px dashed var\(--on\)/.test(css) && /button\.s0key::after,#s0 #bridgeQuiz \.qbtns button\.s0ok::after\{content:" \\2713"\}/.test(css),
    'S0-041', 'the s0bad rust-and-cross, s0key dashed-ring and tick rules are in the page CSS');

  /* beat 2: the frame figure */
  say(txt('#s0 .s0-frame .plab') === 'Session 5’s one thing' && txt('#s0 .s0-frame .do') === 'Do this now: 2 minutes' && txt('#s0 .s0-frame h4') === 'Five Sessions, One Judgment', 'S0-050', 'the frame panel carries its label, Do line and heading');
  const svg = $('#s0Fig svg');
  say(!!svg && svg.getAttribute('viewBox') === '0 0 620 330' && svg.getAttribute('role') === 'img' && /five stops: 1 Predicts, 2 Shape it, 3 Reads your file, 4 Answer for it, 5 Hand it over/.test(svg.getAttribute('aria-label')) && $$('#s0Fig svg').length === 1,
    'S0-051', 'one viewBox SVG, role img, with an aria-label naming the five stops');
  const labs = () => $$('#s0Fig .s0-lab').map((t) => t.textContent);
  say(labs().join('|') === 'Predicts|Shape it|Reads your file|Answer for it|Hand it over' && $$('#s0Fig .s0-num').map((t) => t.textContent).join('') === '12345', 'S0-052', 'five stops around the ring, numbered 1 to 5 with the short labels');
  const ring = $('#s0Fig .s0-ring');
  const ringAttrs = () => ['cx', 'cy', 'rx', 'ry'].map((a) => ring.getAttribute(a)).join(',');
  const dotPos = () => $$('#s0Fig .s0-dot').map((c) => c.getAttribute('cx') + ',' + c.getAttribute('cy')).join('|');
  const ring0 = ringAttrs(), dots0 = dotPos();
  say(!!ring && ring0 === '310,165,232,108' && $$('#s0Fig .s0-dot').length === 5 && $$('#s0Fig .s0-spoke').length === 5, 'S0-053', 'the ring is an ellipse with five dots on it and five spokes to the middle');
  const genT = $('#s0Fig .s0-gen'), box = $('#s0Fig .s0-box'), stampT = $('#s0Fig .s0-stamp text'), stampG = $('#s0Fig .s0-stamp'), ghost = $('#s0Fig .s0-ghost');
  say(genT.textContent === GENS[0] && box.getAttribute('class') === 's0-box g0' && stampT.textContent === 'GEN 1' && box.getAttribute('width') === '170.00', 'S0-054', 'at load the middle reads a 2023 model, box g0 (dashed), stamp GEN 1, width 170');
  const out = $('#s0Out');
  say(out.getAttribute('aria-live') === 'polite' && !out.classList.contains('has') && txt('#s0Out .hd') === 'Around the model' && txt('#s0Out .nil') === 'Press Advance the model, then click a stop.', 'S0-055', 'the readout waits with its hint and is live');
  const advBtn = $('#s0Adv'), stopBtns = $$('#s0Stops button[data-k]');
  say(advBtn && advBtn.textContent === 'Advance the model' && stopBtns.length === 5 && stopBtns.map((b) => b.textContent).join('|') === '1 Predicts|2 Shape it|3 Reads your file|4 Answer for it|5 Hand it over' && $('#s0Stops').getAttribute('role') === 'group',
    'S0-056', 'the Advance button and a role=group of five stop buttons with the spec\'s labels');
  say(stopBtns.every((b, k) => b.getAttribute('data-k') === String(k) && b.getAttribute('aria-pressed') === 'false' && b.classList.contains('sel') && b.classList.contains('mini')), 'S0-057', 'stop buttons are btn sel mini, data-k 0 to 4, none pressed at load');

  click(advBtn);
  say(genT.textContent === GENS[1] && box.getAttribute('class') === 's0-box g1' && stampG.getAttribute('class') === 's0-stamp g1' && stampT.textContent === 'GEN 2', 'S0-060', 'Advance 1: the middle reads a 2025 model, box g1 (solid), stamp GEN 2');
  say(out.classList.contains('has') && $('#s0Out .s0adv').textContent === FIRST && /Advance 1 · in the middle: a 2025 model/.test(txt('#s0Out')) && /Click a stop to read what it keeps for you\./.test(txt('#s0Out')),
    'S0-061', 'the first advance writes the spec\'s sentence: the box changed, the ring did not');
  say(ghost.getAttribute('class') === 's0-ghost on' && ghost.getAttribute('width') === '170.00', 'S0-062', 'the old outline stays as a ghost at the previous size');
  say(/In the middle now: a 2025 model\./.test(svg.getAttribute('aria-label')), 'S0-063', 'the aria-label follows the model');
  await sleep(900);
  say(box.getAttribute('width') === '184.00' && box.getAttribute('height') === '80.00' && box.getAttribute('x') === '218.00' && +genT.style.opacity === 1 && +stampG.style.opacity === 1, 'S0-064', 'the size tween lands: 184 by 80, centred, label and stamp faded back in');
  click(advBtn); click(advBtn);
  say(genT.textContent === GENS[3] && box.getAttribute('class') === 's0-box g3' && stampT.textContent === 'GEN ?' && /Now in the middle: the next one\. The ring did not change: the same five stops\./.test(txt('#s0Out')) && /Advance 3/.test(txt('#s0Out')),
    'S0-065', 'after three advances the middle reads the next one and the readout says the five stops are the same');
  say(labs().join('|') === 'Predicts|Shape it|Reads your file|Answer for it|Hand it over' && ringAttrs() === ring0 && dotPos() === dots0 && $$('#s0Fig .s0-stop.seen').length === 0,
    'S0-066', 'the five stop labels, the ring and the dot positions are unchanged after three advances');
  click(advBtn);
  say(genT.textContent === GENS[0] && box.getAttribute('class') === 's0-box g0' && ghost.getAttribute('class') === 's0-ghost', 'S0-067', 'a fourth advance wraps to the 2023 model and clears the ghost');

  /* the stops */
  const stopG = $$('#s0Fig .s0-stop'), spokes = $$('#s0Fig .s0-spoke'), ticks = $$('#s0Fig .s0-tick');
  click(stopBtns[0]);
  say(stopBtns[0].getAttribute('aria-pressed') === 'true' && stopBtns[0].classList.contains('act') && stopBtns[0].classList.contains('s0-seen') && stopBtns.slice(1).every((b) => b.getAttribute('aria-pressed') === 'false'),
    'S0-070', 'stop 1 lights: aria-pressed, act and seen on its button only');
  say(stopG[0].getAttribute('class') === 's0-stop seen cur' && spokes[0].getAttribute('class') === 's0-spoke seen cur' && ticks[0].textContent === '✓' && ticks[1].textContent === '' && stopG[1].getAttribute('class') === 's0-stop',
    'S0-071', 'in the figure, stop 1 is seen and current with a tick; its spoke lights; stop 2 is untouched');
  say(txt('#s0Out .hd') === 'Stop 1 · Predicts · Session 1' && $('#s0Out .s0q').textContent === STOPS[0].p && $('#s0Out .kw').textContent === 'Question: ' + STOPS[0].q, 'S0-072', 'the readout gives stop 1\'s principle and question');
  const links = $$('#s0Out .s0map a');
  say(txt('#s0Out .s0map') === 'Used here: §03, Appendix E3.' && links.map((a) => a.getAttribute('href')).join('|') === '#s3|#sE3', 'S0-073', 'Used here links §03 and Appendix E3 to their sections');
  say(/1 of 5 stops seen\./.test(txt('#s0Out')) && !/Session 5’s one thing/.test(txt('#s0Out')) && /Stops seen: 1 of 5\./.test(svg.getAttribute('aria-label')), 'S0-074', 'one of five seen; the one-thing sentence is not out yet');
  for (let k = 1; k < 4; k++) {
    click(stopBtns[k]);
    const S = STOPS[k];
    say(txt('#s0Out .hd') === `Stop ${k + 1} · ${S.lab} · ${S.ses}` && $('#s0Out .s0q').textContent === S.p && $('#s0Out .kw').textContent === 'Question: ' + S.q && txt('#s0Out .s0map') === 'Used here: ' + S.use.join(', ') + '.' && $$('#s0Out .s0map a').map((a) => a.getAttribute('href')).join('|') === S.hrefs.join('|'),
      `S0-07${4 + k}`, `stop ${k + 1} writes its principle, question and Used here links`);
  }
  say(stopG[0].getAttribute('class') === 's0-stop seen' && stopG[3].getAttribute('class') === 's0-stop seen cur' && stopBtns[0].classList.contains('s0-seen') && !stopBtns[0].classList.contains('act') && stopBtns[3].getAttribute('aria-pressed') === 'true',
    'S0-078', 'earlier stops stay seen (solid) but only the latest is current');
  say(/4 of 5 stops seen\./.test(txt('#s0Out')) && ring.getAttribute('class') === 's0-ring' && txt('#s0Fig .s0-foot') === '', 'S0-079', 'four of five: the ring is not finished and the foot is empty');
  click(stopBtns[4]);
  say(txt('#s0Out .hd') === 'Stop 5 · Hand it over · Session 5' && $('#s0Out .s0q').textContent === STOPS[4].p && $('#s0Out .kw').textContent === 'Question: ' + STOPS[4].q && txt('#s0Out .s0map') === 'Used here: every section.' && $$('#s0Out .s0map a').length === 0,
    'S0-080', 'stop 5: a workflow is finished when a stranger can run it; used in every section');
  say($('#s0Out .good') && $('#s0Out .good').textContent === ONE, 'S0-081', 'all five seen: the readout adds the one-thing sentence verbatim');
  say(ring.getAttribute('class') === 's0-ring fin' && txt('#s0Fig .s0-foot') === 'Five stops, one judgment.' && $('#s0Fig .s0-foot').getAttribute('class') === 's0-foot fin' && ticks.every((t) => t.textContent === '✓') && stopG.every((g) => /seen/.test(g.getAttribute('class'))),
    'S0-082', 'the ring turns solid, the foot reads Five stops, one judgment, every stop is ticked');
  say(stopBtns.every((b) => b.classList.contains('s0-seen')) && stopBtns.filter((b) => b.getAttribute('aria-pressed') === 'true').length === 1 && /Stops seen: 5 of 5\./.test(svg.getAttribute('aria-label')), 'S0-083', 'all five buttons are seen, exactly one pressed');
  click(advBtn);
  say(genT.textContent === GENS[1] && $('#s0Out .good') && $('#s0Out .good').textContent === ONE && /5 of 5 stops seen\./.test(txt('#s0Out')) && ring.getAttribute('class') === 's0-ring fin', 'S0-084', 'advancing after the five keeps the one-thing sentence and the finished ring');
  click(stopG[2]);
  say(stopBtns[2].getAttribute('aria-pressed') === 'true' && txt('#s0Out .hd') === 'Stop 3 · Reads your file · Session 3', 'S0-085', 'clicking a stop in the figure itself also selects it (mouse convenience mirrored by the buttons)');
  say(!gate.classList.contains('x') && $$('#s0 .check.done').length === 1, 'S0-086', 'the figure never adds a gate: g1 is the only tick');

  /* the Coles, the bullets, the source line */
  const coles = panels[3];
  const cl = [...coles.querySelectorAll('ul.pts li')].map((l) => l.textContent.replace(/\s+/g, ' ').trim());
  say(coles.querySelector('.plab').textContent === 'The Coles, in two lines' && cl.length === 2 && cl[0] === 'The client. Meg Cole owns all of Cole Precision Components, CPC, a Rockford aerospace-fastener maker. Her son Nathan works there.' && cl[1] === 'What is new. A competitor wrote asking to buy the company. Meg said it is not for sale, and Nathan has not been told the letter came.',
    'S0-090', 'the Coles panel: two lines verbatim');
  say(coles.querySelector('.hint').textContent === 'The Coles are synthetic: invented for this course, and not the data for your final project. The full file is behind Case facts, top right.', 'S0-091', 'the synthetic-case hint verbatim');
  const pts = $$('#s0 > ul.pts > li').map((l) => l.textContent.replace(/\s+/g, ' ').trim());
  say(pts.length === 2 && pts[0] === 'This session’s four verbs. Explain a workflow you did not build, break it on purpose, improve it in a way you can defend, and say what no tool can do.' && pts[1] === 'Why a stranger. The builder’s memory fills every gap in the builder’s own package. Only a cold run finds them (Session 4’s handoff test).',
    'S0-092', 'two bullets with the spec\'s words');
  say(txt('#s0 p.src') === 'The five-session frame and the Coles are constructed for this course L.' && $('#s0 p.src .conf.l[data-src="src-case"]'), 'S0-093', 'the source line says the frame and the Coles are constructed, chipped src-case L');
  const chips = $$('#s0 .conf[data-src]');
  say(chips.length === 1 && chips.every((c) => ALLOWED.includes(c.getAttribute('data-src'))), 'S0-094', 'every confidence chip (' + chips.length + ') is an allowed key');

  /* hygiene */
  const secTxt = txt('#s0');
  const outer = sec.outerHTML;
  say(!/\u2014|&mdash;|\u2013|&ndash;/.test(outer), 'S0-100', 'no em dash or en dash in the section');
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric|canvas|the instructor|before Session 5|points|weight)\b/i.test(secTxt), 'S0-101', 'no forbidden course-policy words in the learner-facing text');
  say(!/\b(undefined|NaN)\b/.test(secTxt) && !/\b(undefined|NaN)\b/.test(svg.getAttribute('aria-label')) && !/\b(undefined|NaN)\b/.test(outer), 'S0-102', 'no "undefined" or "NaN" anywhere in the section after every control was used');
  say($$('#s0 button').every((b) => b.getAttribute('type') === 'button') && $$('#s0 [onclick], #s0 div[tabindex], #s0 span[tabindex]').length === 0, 'S0-103', 'every button is type=button and nothing else pretends to be clickable');
  say($$('#s0 .qfb').every((f) => f.getAttribute('aria-live') === 'polite' && f.getAttribute('role') === 'status'), 'S0-104', 'quiz feedback boxes are live status regions');
  const hints = $$('#s0 .hint').map((h) => h.textContent.trim());
  say(hints.length === 3 && hints.every((h) => h.length < 150 && !/\n/.test(h)), 'S0-105', 'each of the three hints is one line');
  const staticWords = (() => {
    const c = sec.cloneNode(true);
    [...c.querySelectorAll('.panel.pace, .panel[data-task], .panel.s0-frame, .eyebrow, .conf')].forEach((e) => e.remove());
    return (c.textContent.match(/[A-Za-z][A-Za-z’'-]*/g) || []).length;
  })();
  say(staticWords <= 180, 'S0-106', 'static prose outside the interactions is under 180 words (' + staticWords + ')');
  say(errs.length === 0, 'S0-107', 'zero window errors after the full happy path' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 2: the instructor override on a fresh page ================= */
{
  const { w, d, errs, $, $$, txt } = load();
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(d.body.classList.contains('reveal'), 'S0-110', 'Shift+U turns the override on');
  say($('#s0 .check[data-gate="g1"]').classList.contains('done'), 'S0-111', 'Shift+U ticks the gate');
  say($('#s0Fig .s0-gen').textContent === GENS[3] && $('#s0Fig .s0-box').getAttribute('class') === 's0-box g3' && $('#s0Fig .s0-box').getAttribute('width') === '212.00', 'S0-112', 'Shift+U advances the middle to the last generation, at its full size, with no tween pending');
  say($$('#s0Stops button[data-k]').every((b) => b.classList.contains('s0-seen')) && $('#s0Stops button[data-k="4"]').getAttribute('aria-pressed') === 'true' && $$('#s0Fig .s0-stop').every((g) => /seen/.test(g.getAttribute('class'))),
    'S0-113', 'Shift+U marks all five stops seen with the fifth current');
  say($('#s0Out .good') && $('#s0Out .good').textContent === ONE && $('#s0Fig .s0-ring').getAttribute('class') === 's0-ring fin', 'S0-114', 'Shift+U writes the one-thing sentence and finishes the ring');
  const items = $$('#bridgeQuiz .qitem');
  say(items.every((q) => !q.classList.contains('done') && q.querySelectorAll('.qbtns button')[1].classList.contains('s0key') && !q.querySelector('.s0bad')), 'S0-115', 'Shift+U rings the right option (b) on every unanswered question without answering it');
  say(!/\b(undefined|NaN)\b/.test(txt('#s0')), 'S0-116', 'no undefined or NaN under the override');
  say(errs.length === 0, 'S0-117', 'zero window errors under the override' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 3: an untouched page stays clean, and a stop before any advance works ================= */
{
  const { d, errs, $, $$, txt, click } = load();
  say(!/\b(undefined|NaN)\b/.test(txt('#s0')), 'S0-120', 'the untouched section prints no undefined or NaN');
  say($$('#s0Stops button[aria-pressed="true"]').length === 0 && $$('#s0Fig .s0-stop.seen').length === 0 && !$('#s0 .check[data-gate="g1"]').classList.contains('done'), 'S0-121', 'nothing is seen, pressed or ticked at load');
  click($('#s0Stops button[data-k="2"]'));
  say($('#s0Fig .s0-gen').textContent === GENS[0] && txt('#s0Out .hd') === 'Stop 3 · Reads your file · Session 3' && $('#s0Out').classList.contains('has') && /1 of 5 stops seen\./.test(txt('#s0Out')),
    'S0-122', 'a stop clicked before any advance still reads, with the 2023 model in the middle');
  click($('#s0Adv'));
  say($('#s0Out .s0adv').textContent === FIRST && /1 of 5 stops seen\./.test(txt('#s0Out')) && $$('#s0Fig .s0-stop')[2].getAttribute('class') === 's0-stop seen cur' && $('#s0Stops button[data-k="2"]').getAttribute('aria-pressed') === 'true',
    'S0-123', 'the first advance after a stop keeps that stop seen and current in the figure and on its button');
  say(errs.length === 0, 'S0-124', 'zero errors on the untouched page');
}

console.log(`\n${n} assertions, ${fails} failed`);
process.exit(fails ? 1 : 0);
