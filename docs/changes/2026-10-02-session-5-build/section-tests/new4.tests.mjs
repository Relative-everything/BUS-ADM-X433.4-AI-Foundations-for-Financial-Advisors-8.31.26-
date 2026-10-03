#!/usr/bin/env node
/* Tests for the four sections built in the main session: the cold open, §01, §06 and E5.
   Usage: NODE_PATH=$(npm root -g) node new4.tests.mjs <page.html> */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM, VirtualConsole } = require('jsdom');
const file = process.argv[2] || 'session-5/index.html';
const html = readFileSync(file, 'utf8');
let fails = 0, total = 0;
const say = (ok, id, s) => { total++; if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function load(opts = {}) {
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errs.push('jsdomError: ' + (e && e.message || e)));
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  vc.on('warn', (...a) => { const s = a.join(' '); if (/failed|widget error/.test(s)) errs.push('warn: ' + s); });
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(win) { if (opts.reduced) win.matchMedia = () => ({ matches: true, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }); } });
  const w = dom.window, d = w.document;
  w.addEventListener('error', (e) => errs.push('window error: ' + (e.message || e)));
  let copied = '';
  Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: (t) => { copied = t; return Promise.resolve(); } }, configurable: true });
  return { w, d, errs, copied: () => copied,
    $: (s) => d.querySelector(s), $$: (s) => [...d.querySelectorAll(s)],
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ').trim() : ''),
    cls: (el) => (el ? (el.getAttribute('class') || '') : ''),
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })),
    key: (el, k) => el && el.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true })),
    input: (el, v) => { el.value = String(v); el.dispatchEvent(new w.Event('input', { bubbles: true })); el.dispatchEvent(new w.Event('change', { bubbles: true })); },
    shiftU: () => d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true })),
    done: (g) => { const c = d.querySelector('.check[data-gate="' + g + '"]'); return !!c && c.classList.contains('done'); },
    vis: (el) => !!el && !el.hidden && !el.classList.contains('hidden') && el.style.display !== 'none' };
}
const noBad = (s) => !/\b(undefined|NaN)\b/.test(s) && !/[—–]/.test(s);

/* ================= the cold open ================= */
{
  const { $, $$, txt, cls, click, done, errs } = load();
  const cards = $$('#coldPicks button');
  say(cards.length === 2 && cards.every((b) => b.getAttribute('aria-pressed') === 'false'), 'C-001', 'two prompt cards, neither pressed');
  say(!!cards[0].querySelector('.idp') && /meg cole/i.test(cards[0].querySelector('.idp').textContent) && !cards[1].querySelector('.idp'), 'C-002', 'only the Then card highlights the client name');
  say(/Pick a prompt/.test(txt('#coldOut')) && $('#coldOut').getAttribute('aria-live') === 'polite', 'C-003', 'the readout waits, live');
  say($$('#coldFig svg').length === 1 && $$('#coldFig .sCold-tok').length === 2 && $$('#coldFig .sCold-seg').length === 16 && $('#coldFig svg').getAttribute('role') === 'img', 'C-004', 'one SVG: two tokens, sixteen meter segments, role img');
  say($('#coldMine').style.display === 'none' && $('#coldMineBox').style.display === 'none', 'C-005', 'the own-prompts beat is hidden until Test 2');
  click(cards[0]);
  const t0 = txt('#coldOut');
  say(/Then · \d of 8 checks/.test(t0) && /Passed:/.test(t0) && /Missed:/.test(t0) && /Next: Test 1/.test(t0), 'C-006', 'picking Then scores it and names passed and missed checks');
  say(cards[0].getAttribute('aria-pressed') === 'true' && /\d of 8 checks/.test(cards[0].querySelector('.vtag').textContent) && /show/.test(cls($$('#coldFig .sCold-tok')[0])), 'C-007', 'the card is pressed, tagged with its score, and its token shows');
  const m = /Then · (\d) of 8/.exec(t0); const thenN = m ? +m[1] : -1;
  say(thenN >= 0 && thenN <= 4, 'C-008', `Then passes few checks (${thenN} of 8)`);
  click(cards[1]);
  const m2 = /Now · (\d) of 8/.exec(txt('#coldOut')); const nowN = m2 ? +m2[1] : -1;
  say(nowN >= 7, 'C-009', `Now passes almost every check (${nowN} of 8)`);
  say(!done('gc'), 'C-010', 'picking alone does not tick the gate');
  click($('#coldRank'));
  const t1 = txt('#coldOut');
  say(new RegExp('Then passes ' + thenN + ' of 8; Now passes ' + nowN + ' of 8').test(t1) && new RegExp('Drift: \\+' + (nowN - thenN) + ' checks in five weeks').test(t1), 'C-011', 'Test 1 writes both scores and the drift');
  say($$('#coldFig .sCold-hide.show').length >= 3 && /Drift: \+\d checks/.test(txt('#coldFig')) && $$('#coldCmp tbody tr').length === 9 && $('#coldCmp').style.display === 'block', 'C-012', 'the meters and names show, the drift is on the figure, the comparison table has eight checks and a total');
  await sleep(900);
  say($$('#coldFig .sCold-seg.hit').length === thenN + nowN, 'C-013', 'the lit segments equal the two scores');
  say(/Next: Test 2/.test(t1) && !done('gc'), 'C-014', 'Test 1 points to Test 2 and leaves the gate open');
  click($('#coldAll'));
  const t2 = txt('#coldOut');
  say(done('gc') && /Test 2/.test(t2) && /names the client/.test(t2) && /names no one/.test(t2), 'C-015', 'Test 2 ticks gc and says which prompt could be sent');
  say(/show/.test(cls($('#coldFig .sCold-trk.bad'))) && /sunk/.test(cls($$('#coldFig .sCold-tok')[0])) && !/sunk/.test(cls($$('#coldFig .sCold-tok')[1])), 'C-016', 'the second lane shows and only Then sinks to it');
  say(/names the client/.test(cards[0].querySelector('.vtag').textContent) && /names no one/.test(cards[1].querySelector('.vtag').textContent), 'C-017', 'the cards carry the Test 2 verdicts');
  say($('#coldMine').style.display === '', 'C-018', 'the own-prompts beat appears');
  click($('#coldMine'));
  say($('#coldMineBox').style.display === '' && $('#coldMine').style.display === 'none', 'C-019', 'the paste boxes open and the button goes');
  click($('#coldGo'));
  say(/Paste both prompts first/.test(txt('#coldMineOut')) && $('#coldMineQ').style.display === 'none', 'C-020', 'Go with empty boxes asks for both prompts');
  $('#coldThen').value = 'tax question'; $('#coldNow').value = 'List three questions for a review meeting with a client in her sixties. You are a CFP professional; use only the attached note. Bullets, under 100 words, for my prep. If a fact is missing, say so.';
  click($('#coldGo'));
  const mo = txt('#coldMineOut');
  say(/Yours · oldest \d of 8, latest \d of 8/.test(mo) && /Drift: [+-]?\d checks/.test(mo) && $('#coldMineQ').style.display === '', 'C-021', 'the learner\'s own two prompts are scored and the question appears');
  click($('#coldMineY'));
  say(/cannot go in as written/.test(txt('#coldMineAns')) && $('#coldMineN').getAttribute('aria-disabled') === 'true', 'C-022', 'Yes answers and locks the other button');
  click($('#coldMineN'));
  say(/cannot go in as written/.test(txt('#coldMineAns')), 'C-023', 'the locked button is ignored');
  say(noBad(txt('#sCold')) && noBad($('#coldFig svg').getAttribute('aria-label')), 'C-024', 'no undefined, NaN or dash in the section');
  say(errs.length === 0, 'C-025', 'zero window errors' + (errs.length ? ': ' + errs.slice(0, 2).join(' | ') : ''));
}
{ /* order independence and the override */
  const { $, $$, click, done, shiftU, txt, errs } = load({ reduced: true });
  click($('#coldAll'));
  say(done('gc') && /Test 1/.test(txt('#coldOut')) && /Test 2/.test(txt('#coldOut')) && $$('#coldFig .sCold-seg.hit').length > 0, 'C-026', 'Test 2 before Test 1 runs both');
  const { $: q, done: dn, shiftU: su, txt: tx, errs: e2 } = load({ reduced: true });
  su();
  say(dn('gc') && /Test 2/.test(tx('#coldOut')) && q('#coldCmp').style.display === 'block', 'C-027', 'Shift+U runs the cold open to the end');
  say(errs.length === 0 && e2.length === 0, 'C-028', 'zero errors in the reduced-motion runs');
}

/* ================= §01 ================= */
{
  const { $, $$, txt, cls, click, input, done, copied, errs } = load();
  const pins = $$('#s1Pins button');
  say(pins.length === 3 && pins.every((b) => b.getAttribute('aria-pressed') === 'false'), 'P-001', 'three pins, none pressed');
  say($('#s1Day').value === '458' && txt('#s1DayVal') === '2 October 2026' && $('#s1Day').getAttribute('aria-valuetext') === '2 October 2026', 'P-002', 'the slider starts on 2 October 2026 and says so');
  say(/Pin the workflow first/.test(txt('#s1Out')) && !$('#s1Out').classList.contains('has'), 'P-003', 'the status waits for a pin');
  const svg = $('#s1Fig svg');
  say(!!svg && $$('#s1Fig .s1-row').length === 10 && $$('#s1Fig .s1-dep').length === 1 && /61 days’ notice/.test(txt('#s1Fig')) && /not sooner than 28 September 2027/.test(txt('#s1Fig')), 'P-004', 'ten rows, one deprecation band, the notice and the not-sooner-than date');
  say(/30 November 2026/.test(txt('#s1Fig')) && /5 January 2026/.test(txt('#s1Fig')) && /21 July 2025/.test(txt('#s1Fig')), 'P-005', 'retirement dates print on the rows');
  say(!/show/.test(cls($('#s1Fig .s1-cardg'))), 'P-006', 'the workflow card is hidden before a pin');
  click(pins[0]);
  say(/show/.test(cls($('#s1Fig .s1-cardg'))) && /dep/.test(cls($('#s1Fig .s1-cardg'))) && txt('#s1Fig .s1-stamp') === 'DEPRECATED', 'P-007', 'pin A on 2 October 2026: the card rides and reads DEPRECATED');
  say(/Deprecated since 30 September 2026/.test(txt('#s1Out')) && /59 days away/.test(txt('#s1Out')) && $$('#s1Out .conf[data-src="src-anthropic-deprecations"]').length === 1 && /Status · A · 2 October 2026/.test(txt('#s1Out')), 'P-008', 'the status counts 59 days to retirement, chipped to the deprecations page');
  say(!done('g2'), 'P-009', 'a pin alone leaves g2 open');
  input($('#s1Day'), 300);
  say(txt('#s1Fig .s1-stamp') === 'RUNS' && /Running/.test(txt('#s1Out')) && txt('#s1DayVal') === '27 April 2026' && done('g2'), 'P-010', 'dragging to 27 April 2026 reads RUNS and ticks g2');
  click($('#s1Jump button[data-jump="ret"]'));
  say(txt('#s1Fig .s1-stamp') === 'FAILS' && /Retired on 30 November 2026/.test(txt('#s1Out')) && /Requests to retired models will fail/.test(txt('#s1Out')) && txt('#s1DayVal') === '30 November 2026', 'P-011', 'Retirement jump: FAILS with Anthropic\'s own sentence');
  click($('#s1Jump button[data-jump="dep"]'));
  say(txt('#s1DayVal') === '30 September 2026' && txt('#s1Fig .s1-stamp') === 'DEPRECATED' && /61 days away/.test(txt('#s1Out')), 'P-012', 'Deprecation jump: 61 days to retirement');
  click(pins[1]);
  say(txt('#s1Fig .s1-stamp') === 'ACTIVE' && /Not retired sooner than 28 September 2027/.test(txt('#s1Out')) && pins[1].getAttribute('aria-pressed') === 'true' && pins[0].getAttribute('aria-pressed') === 'false', 'P-013', 'pin B: ACTIVE, with the not-sooner-than date');
  click($('#s1Jump button[data-jump="nst"]'));
  say(txt('#s1Fig .s1-stamp') === 'CHECK' && /not-sooner-than date has passed/.test(txt('#s1Out')), 'P-014', 'pin B on its own date: CHECK');
  click(pins[2]);
  say(txt('#s1Fig .s1-stamp') === 'RUNS, UNTESTED' && /whatever is current/.test(txt('#s1Out')), 'P-015', 'pin C: RUNS, UNTESTED');
  input($('#s1Day'), 'abc');
  say(/^\d{1,2} [A-Z][a-z]+ 20\d\d$/.test(txt('#s1DayVal')) && noBad(txt('#s1')), 'P-016', 'a bad slider value still prints a real date, never NaN');
  input($('#s1Day'), 913);
  say(txt('#s1DayVal') === '31 December 2027', 'P-017', 'the last day is 31 December 2027');
  /* beat 2 */
  const tiles = $$('#s1Card .s1-tile');
  say(tiles.length === 3 && tiles.every((t) => t.getAttribute('aria-pressed') === 'false') && /Tick what your workflow already carries/.test(txt('#s1CardOut')), 'P-018', 'three card lines, none ticked');
  click(tiles[0]);
  say(tiles[0].getAttribute('aria-pressed') === 'true' && /1 of 3 on the card/.test(txt('#s1CardOut')) && $$('#s1Paper .s1-pline')[0].classList.contains('on') && $$('#s1Paper .s1-pline .s5stamp')[0].textContent === 'On the card' && $$('#s1Paper .s1-pline .s5stamp')[1].textContent === 'Missing', 'P-019', 'one tick: the paper line fills, the others read Missing');
  click(tiles[1]); click(tiles[2]);
  say(/3 of 3 on the card/.test(txt('#s1CardOut')) && /hand over after the model changes/.test(txt('#s1CardOut')), 'P-020', 'three of three closes the card');
  click(tiles[2]);
  say(/2 of 3/.test(txt('#s1CardOut')) && tiles[2].getAttribute('aria-pressed') === 'false', 'P-021', 'a tick undoes');
  click($('#s1Copy'));
  const c = copied();
  say(/^MAINTENANCE CARD: Meeting-prep brief/.test(c) && (c.match(/^\d\. /gm) || []).length === 3 && /\[on the card\]/.test(c) && /Model deprecations \(platform\.claude\.com\), opened 2 October 2026/.test(c) && $('#s1CopyMsg').getAttribute('aria-live') === 'polite', 'P-022', 'the copied card has three numbered lines, the ticks and the dated source');
  say(noBad(txt('#s1')) && noBad(svg.getAttribute('aria-label')) && !/claude-[a-z0-9-]+-\d{8}/.test(html.slice(html.indexOf('id="s1"'), html.indexOf('id="sE2"'))), 'P-023', 'no undefined, NaN, dash or API model id in the section');
  say(errs.length === 0, 'P-024', 'zero window errors' + (errs.length ? ': ' + errs.slice(0, 2).join(' | ') : ''));
}
{ const { $, txt, done, shiftU, errs } = load({ reduced: true });
  shiftU();
  say(done('g2') && txt('#s1Fig .s1-stamp') === 'FAILS' && /1 December 2026/.test(txt('#s1DayVal')), 'P-025', 'Shift+U pins A the day after retirement');
  say(errs.length === 0, 'P-026', 'zero errors under the override'); }

/* ================= §06 ================= */
{
  const { $, $$, txt, cls, click, key, done, errs } = load({ reduced: true });
  const tools = $$('#s6Tools button'), hits = $$('#s6Fig .s6-hit');
  say(tools.length === 5 && hits.length === 5 && hits.every((h) => h.getAttribute('role') === 'button' && h.getAttribute('tabindex') === '0' && h.getAttribute('aria-pressed') === 'false'), 'T-001', 'five tool buttons and five keyboard-reachable figure targets');
  say(/Click a tool|Pick a tool|tool/i.test(txt('#s6Out')) && !$('#s6Out').classList.contains('has') && $$('#s6Fig .s6-stop').length === 4 && $$('#s6Fig .s6-stop.show').length === 0, 'T-002', 'the readout waits; the four stops are drawn but hidden');
  click(tools[1]);
  const o1 = txt('#s6Out');
  say(/Tool 2 · Note-taker/.test(o1) && $$('#s6Out .q').length === 4 && /What may go in\?/.test(o1) && /Where does it go\?/.test(o1) && /How do you check it\?/.test(o1) && /What do you keep\?/.test(o1), 'T-003', 'the note-taker writes the four questions');
  say(/42\.9%/.test(o1) && /2,906 advisers/.test(o1) && /14 tools/.test(o1) && $$('#s6Out .conf[data-src="src-t3-survey"]').length === 1 && $$('#s6Out .conf[data-src="src-investmentnews-t3-2026"]').length === 1 && $$('#s6Out .conf[data-src="src-regsp"]').length === 1, 'T-004', 'the survey facts carry their chips');
  say(/lit/.test(cls($$('#s6Fig .s6-path')[1])) && $$('#s6Fig .s6-path.dim').length === 4 && /lit/.test(cls($$('#s6Fig .s6-box.tool')[1])) && hits[1].getAttribute('aria-pressed') === 'true', 'T-005', 'the note-taker path lights and the other four dim');
  say($$('#s6Fig .s6-stop.show.fill').length === 4 && $$('#s6Out .q.on').length === 4, 'T-006', 'under reduced motion the four stops fill at once');
  say(/1 of 5 tools opened/.test(o1) && !done('g7') && tools[1].classList.contains('act'), 'T-007', 'one tool opened, the gate waits');
  key(hits[4], 'Enter');
  const o2 = txt('#s6Out');
  say(/Tool 5 · AI search/.test(o2) && /8% of visits against 15%/.test(o2) && $$('#s6Out .conf[data-src="src-pew-ai-summaries"]').length === 1 && $$('#s6Out .conf[data-src="src-kitces-aisearch"]').length === 1, 'T-008', 'Enter on the figure opens AI search with the Pew rates');
  say(/show/.test(cls($('#s6Fig .s6-prospect'))) && !/lit/.test(cls($$('#s6Fig .s6-box')[4])) , 'T-009', 'AI search shows the prospect\'s question and skips the vendor box');
  say(/2 of 5 tools opened/.test(o2) && /the four questions did not change; the answers did/.test(o2) && done('g7') && tools[1].classList.contains('seen') && !tools[1].classList.contains('act'), 'T-010', 'two tools opened ticks g7 and marks the first as seen');
  click(tools[4]); click(tools[4]);
  say(/2 of 5 tools opened/.test(txt('#s6Out')), 'T-011', 'reopening a tool does not double count');
  click(tools[3]);
  say(/Tool 4 · Planning-software agent/.test(txt('#s6Out')) && /one vendor launched a planning agent in June 2026/i.test(txt('#s6Out')) && !/RightCapital|Jump|Zocks|Zeplyn|Wealthbox|Redtail/.test(txt('#s6 .panel') + txt('#s6 ul.pts')), 'T-012', 'the planning agent names no vendor in the panels');
  click(tools[0]); click(tools[2]);
  say(/5 of 5 tools opened/.test(txt('#s6Out')), 'T-013', 'all five open');
  const mine = $$('#s6Mine button');
  say(mine.length === 5 && /Tick the tools you use/.test(txt('#s6MineOut')) && $$('#s6Fig .s6-badge.show').length === 0, 'T-014', 'the stack starts empty');
  click(mine[1]); click(mine[4]);
  say(/2 of 5 in your stack/.test(txt('#s6MineOut')) && $$('#s6Fig .s6-badge.show').length === 2 && mine[1].getAttribute('aria-pressed') === 'true', 'T-015', 'two ticks badge two tools on the figure');
  click(mine[1]);
  say(/1 of 5 in your stack/.test(txt('#s6MineOut')) && $$('#s6Fig .s6-badge.show').length === 1, 'T-016', 'a tick undoes');
  say(noBad(txt('#s6')) && noBad($('#s6Fig svg').getAttribute('aria-label')), 'T-017', 'no undefined, NaN or dash');
  say(errs.length === 0, 'T-018', 'zero window errors' + (errs.length ? ': ' + errs.slice(0, 2).join(' | ') : ''));
}
{ const { $$, txt, done, shiftU, click, errs } = load();
  click($$('#s6Tools button')[0]);
  say($$('#s6Fig .s6-stop.show').length === 4 && $$('#s6Fig .s6-stop.show.fill').length === 0, 'T-019', 'with motion the stops appear first and fill later');
  await sleep(1000);
  say($$('#s6Fig .s6-stop.show.fill').length === 4 && $$('#s6Out .q.on').length === 4, 'T-020', 'after a second all four have filled');
  shiftU();
  say(done('g7') && /5 of 5 tools opened/.test(txt('#s6Out')), 'T-021', 'Shift+U opens every tool');
  say(errs.length === 0, 'T-022', 'zero errors with motion'); }

/* ================= E5 ================= */
{
  const { $, $$, txt, cls, click, done, vis, errs } = load({ reduced: true });
  const v1 = $$('#e5Vote1 button'), v2 = $$('#e5Vote2 button');
  say(v1.length === 4 && v2.length === 4 && v1.map((b) => b.textContent.trim()).join('|') === 'aAgree|bLean agree|cLean disagree|dDisagree', 'E-001', 'four options on each vote');
  say(!vis($('#e5Cases')) && !vis($('#e5Twist')) && !vis($('#e5Again')) && $('#e5Vote2').hidden && $('#e5TwistOut').hidden && $('#e5Out2').hidden, 'E-002', 'every later control is hidden before the first vote');
  say($$('#e5Fig svg').length === 1 && $$('#e5Fig .sE5-w').length === 7 && $$('#e5Fig .sE5-w.show').length === 0 && $$('#e5Fig .sE5-ptr.show').length === 0 && /Cast a vote/.test(txt('#e5Fig')), 'E-003', 'the scale is empty: seven weights hidden, no pointer');
  click($('#e5Cases'));
  say($$('#e5Out .sE5-card').length === 0, 'E-004', 'the cases button does nothing before a vote');
  click(v1[1]);
  say(v1[1].getAttribute('aria-pressed') === 'true' && v1[0].getAttribute('aria-disabled') === 'true' && /Lean agree/.test(txt('#e5Out1')) && /Locked/.test(txt('#e5Out1')), 'E-005', 'the first vote locks and is read back');
  say(/show/.test(cls($$('#e5Fig .sE5-ptr')[0])) && /translate\(240px,\s*292px\)/.test($$('#e5Fig .sE5-ptr')[0].style.transform) && vis($('#e5Cases')), 'E-006', 'a pointer lands on the axis at b and the cases button appears');
  click(v1[0]);
  say(v1[1].getAttribute('aria-pressed') === 'true' && v1[0].getAttribute('aria-pressed') === 'false', 'E-007', 'a second click on the first vote is ignored');
  click($('#e5Twist'));
  say(!vis($('#e5TwistKey')) || $('#e5TwistKey').style.display !== 'block', 'E-008', 'the complication waits for the cases');
  click($('#e5Cases'));
  say($$('#e5Out .sE5-card').length === 7 && $$('#e5Out .sE5-card.rel').length === 3 && $$('#e5Out .sE5-card.ana').length === 3, 'E-009', 'six evidence cards, three a side, and the reading card');
  say($$('#e5Out .conf[data-src="src-vanguard-alpha"]').length === 1 && $$('#e5Out .conf[data-src="src-morningstar-fired"]').length === 2 && $$('#e5Out .conf[data-src="src-dellacqua"]').length === 1 && $$('#e5Out .conf[data-src="src-lee-cognitive"]').length === 1 && $$('#e5Out .conf.h').length === 1, 'E-010', 'the five chips sit on their cards; only Lee is H');
  say($$('#e5Fig .sE5-w.show').length === 6 && $('#e5Fig .sE5-beam').style.transform === 'rotate(0deg)' && /first vote stands/.test(txt('#e5Out')), 'E-011', 'six weights drop, the beam is level, the card says the vote stands');
  say(!vis($('#e5Cases')) && vis($('#e5Twist')) && !vis($('#e5Again')), 'E-012', 'the cases button goes, the complication button comes');
  click($('#e5Twist'));
  say($('#e5TwistKey').style.display === 'block' && !$('#e5TwistOut').hidden && /explained advice/.test(txt('#e5TwistOut')) && /split the proposition assumes may not exist/.test(txt('#e5TwistOut')), 'E-013', 'the complication opens its key and names explained advice');
  say($$('#e5Fig .sE5-w.show').length === 5 && /show/.test(cls($('#e5Fig .sE5-w.tw'))) && !/show/.test(cls($$('#e5Fig .sE5-w')[1])) && !/show/.test(cls($$('#e5Fig .sE5-w')[3])) && $('#e5Fig .sE5-beam').style.transform === 'rotate(0deg)', 'E-014', 'the two Morningstar weights move to the pivot as one; the beam stays level');
  say(!vis($('#e5Twist')) && vis($('#e5Again')) && $('#e5Vote2').hidden, 'E-015', 'the re-vote button comes; the second vote is still hidden');
  click($('#e5Again'));
  say(!$('#e5Vote2').hidden && !vis($('#e5Again')) && !done('ga5'), 'E-016', 'Vote again shows the second vote; the gate waits for it');
  click(v2[2]);
  say(done('ga5') && v2[2].getAttribute('aria-pressed') === 'true' && v2[0].getAttribute('aria-disabled') === 'true', 'E-017', 'the second vote ticks ga5 and locks');
  say(/First: b\. Second: c\./.test(txt('#e5Out2')) && /A changed vote is a finding/.test(txt('#e5Out2')) && /what you do that the tool does not/.test(txt('#e5Out2')), 'E-018', 'both votes are read back with the carry sentence');
  say($$('#e5Fig .sE5-ptr.show').length === 2 && /translate\(360px,\s*292px\)/.test($$('#e5Fig .sE5-ptr')[1].style.transform) && /Two votes: b then c\. The complication moved you\./.test(txt('#e5Fig')), 'E-019', 'two pointers on the axis and the caption names the move');
  click(v2[0]);
  say(/First: b\. Second: c\./.test(txt('#e5Out2')), 'E-020', 'a second click on the re-vote is ignored');
  say(noBad(txt('#sE5')) && noBad($('#e5Fig svg').getAttribute('aria-label')), 'E-021', 'no undefined, NaN or dash');
  say(errs.length === 0, 'E-022', 'zero window errors' + (errs.length ? ': ' + errs.slice(0, 2).join(' | ') : ''));
}
{ const { $, $$, txt, click, done, errs } = load({ reduced: true });
  click($$('#e5Vote1 button')[0]); click($('#e5Cases')); click($('#e5Twist')); click($('#e5Again')); click($$('#e5Vote2 button')[0]);
  say(done('ga5') && /First: a\. Second: a\./.test(txt('#e5Out2')) && /An unchanged vote is a finding too/.test(txt('#e5Out2')) && /did not move you/.test(txt('#e5Fig')), 'E-023', 'the same vote twice is read as a finding too');
  say(errs.length === 0, 'E-024', 'zero errors on the unchanged path'); }
{ const { $$, done, shiftU, txt, errs } = load({ reduced: true });
  shiftU();
  say(done('ga5') && $$('#e5Fig .sE5-ptr.show').length === 2 && $$('#e5Fig .sE5-w.show').length === 5, 'E-025', 'Shift+U runs the whole debate');
  say(errs.length === 0, 'E-026', 'zero errors under the override'); }
{ const { $, $$, click, errs } = load();
  click($$('#e5Vote1 button')[3]); click($('#e5Cases'));
  say($$('#e5Fig .sE5-w.show').length < 6, 'E-027', 'with motion the weights drop one by one');
  await sleep(2200);
  say($$('#e5Fig .sE5-w.show').length === 6 && $('#e5Fig .sE5-beam').style.transform === 'rotate(0deg)', 'E-028', 'after two seconds all six are down and the beam is level');
  say(errs.length === 0, 'E-029', 'zero errors with motion'); }

console.log(`\n${total} assertions, ${fails} failed`);
process.exit(fails ? 1 : 0);
