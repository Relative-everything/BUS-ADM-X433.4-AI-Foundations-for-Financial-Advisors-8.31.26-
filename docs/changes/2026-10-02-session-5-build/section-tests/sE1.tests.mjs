#!/usr/bin/env node
/* sE1.tests.mjs <assembled page>: jsdom assertions for Session 5 Appendix E1 (Six Minutes, Five
   Beats), in the shape of Session 4's docs/changes/2026-09-28-session-4-notes/checks.mjs.
   Exit 1 on any fail. Run: NODE_PATH=$(npm root -g) node sE1.tests.mjs /tmp/sE1-test.html
   The clock is a real stopwatch on Date.now, so run 3 and run 4 move the page's Date.now
   through w.eval to stand at chosen seconds; nothing is faked inside the page. */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM, VirtualConsole } = require('jsdom');
const file = process.argv[2] || 'session-5/index.html';
const html = readFileSync(file, 'utf8');
const ALLOWED = ['src-case'];
const MMSS = /^\d+:\d\d$/;
let fails = 0, n = 0;
const say = (ok, id, s) => { n++; if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function load() {
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errs.push('jsdomError: ' + (e && e.message || e)));
  vc.on('warn', (...a) => { const s = a.join(' '); if (/section sE1 failed|widget error contained/.test(s)) errs.push('warn: ' + s); });
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window, d = w.document;
  w.addEventListener('error', (e) => errs.push('window error: ' + (e.message || e)));
  let copied = '';
  Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: (t) => { copied = t; return Promise.resolve(); } }, configurable: true });
  return { w, d, errs,
    $: (s) => d.querySelector(s),
    $$: (s) => [...d.querySelectorAll(s)],
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ').trim() : ''),
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })),
    vis: (el) => !!el && !el.hidden && el.style.display !== 'none',
    acts: () => [...d.querySelectorAll('#e1Fig rect')].filter((r) => /^sE1-act\b/.test(r.getAttribute('class') || '')),
    dvs: () => [...d.querySelectorAll('#e1Fig text')].filter((t) => /^sE1-dv\b/.test(t.getAttribute('class') || '')),
    /* stand the page's clock at base + sec seconds (the page reads Date.now; this is the one seam) */
    at: (base, sec) => w.eval('Date.now=function(){return ' + (base + Math.round(sec * 1000)) + '}'),
    copied: () => copied };
}
const wc = (s) => s.trim().split(/\s+/).filter(Boolean).length;

/* ================= run 1: furniture, the figure at rest, the outline, then the quick-succession path ================= */
{
  const { d, errs, $, $$, txt, click, acts, dvs, copied } = load();
  say(errs.length === 0, 'E1-001', 'the page loads with zero window errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  const sec = $('#sE1');
  say(!!sec && sec.classList.contains('slide') && sec.classList.contains('apx') && sec.getAttribute('data-nav') === 'E1 · Rehearsal' && sec.getAttribute('data-insert-after') === 's4' && sec.getAttribute('data-tier') === 'standard',
    'E1-002', 'section #sE1 is an appendix slide: data-nav "E1 · Rehearsal", after s4, tier standard');
  const stub = $('#sE1 .apxstub');
  say(!!stub && stub === sec.firstElementChild && /E1 · Six Minutes, Five Beats/.test(txt('#sE1 .apxstub b')) && /12 min · standard · hidden at the current appendix depth/.test(txt('#sE1 .apxstub span')),
    'E1-003', 'the APXSTUB block is the first child and names E1, the title, 12 min, standard');
  say(/Appendix E1 · Rehearsal/.test(txt('#sE1 .eyebrow')) && txt('#sE1 .eyebrow .mins') === '12 min' && txt('#sE1 h2') === 'Six Minutes, Five Beats', 'E1-004', 'eyebrow, minutes and title as the spec says');
  const big = txt('#sE1 p.big');
  say(/^Presenting a stranger’s workflow is five beats in six minutes\. Rehearse against a real clock and see where your minutes went\.$/.test(big) && wc(big) < 30, 'E1-005', 'the thesis line is the spec\'s and under 30 words (' + wc(big) + ')');
  const roots = $$('#sE1 [data-task]');
  say(roots.length === 1 && roots[0].getAttribute('data-task') === 't-sE1' && roots[0].getAttribute('data-comp') === 'timed-ritual' && roots[0].classList.contains('panel'), 'E1-006', 'exactly one data-task root, t-sE1, family timed-ritual');
  say(txt('#sE1 .panel[data-task] .do') === 'Do this now: 6 minutes, out loud' && txt('#sE1 .panel[data-task] h4') === 'Start the Clock, Press Next at Each Beat', 'E1-007', 'the root panel carries its Do-this-now line and heading');
  say(/Talk through the meeting-prep brief from §02 to §04, or your own\. Press Next when you move on\./.test(txt('#sE1 .panel[data-task] .hint')), 'E1-008', 'the hint is the spec\'s');

  /* controls at rest */
  const START = $('#e1Start'), NEXT = $('#e1Next'), RESET = $('#e1Reset'), CLK = $('#e1Clock'), OUT = $('#e1Out');
  say(!!START && !!NEXT && !!RESET && START.textContent === 'Start the clock' && /^Next beat/.test(NEXT.textContent) && RESET.textContent === 'Start again', 'E1-010', 'the three controls exist with their labels');
  say(START.classList.contains('btn') && !START.classList.contains('ghost') && NEXT.classList.contains('ghost') && RESET.classList.contains('ghost') && RESET.classList.contains('mini'), 'E1-011', 'Start is the primary button, Next is ghost, Reset is ghost mini');
  say(!START.disabled && NEXT.disabled && NEXT.getAttribute('aria-disabled') === 'true', 'E1-012', 'Next is disabled until Start; Start is enabled');
  say(!!CLK && CLK.textContent === '0:00' && CLK.getAttribute('aria-live') === 'off' && CLK.classList.contains('mono'), 'E1-013', 'the clock reads 0:00, mono, aria-live off');
  say(!!OUT && OUT.classList.contains('mpanel') && OUT.getAttribute('aria-live') === 'polite' && /Press Start the clock/.test(txt('#e1Out')) && !!OUT.querySelector('.nil'), 'E1-014', 'the readout is an aria-live mpanel with its waiting text');
  const gate = $('#sE1 .check[data-gate="ga1"]');
  say(!!gate && !gate.classList.contains('done') && /Run the clock through all five beats once\./.test(txt('#sE1 .check .ct')), 'E1-015', 'the gate ga1 exists, is open at load, and carries the spec\'s text');

  /* the figure at rest */
  const svg = $('#e1Fig svg');
  say(!!svg && svg.getAttribute('viewBox') === '0 0 600 272' && svg.getAttribute('role') === 'img' && /0:00 to 7:00/.test(svg.getAttribute('aria-label')) && /6:00/.test(svg.getAttribute('aria-label')),
    'E1-020', 'one viewBox SVG about 600 by 260, role img, with an aria-label naming the line and the 6:00 marker');
  say($('#e1Fig svg') === $$('#e1Fig svg')[0] && $$('#e1Fig svg').length === 1, 'E1-021', 'exactly one SVG in the figure host');
  const plans = $$('#e1Fig .sE1-plan');
  const pw = plans.map((r) => +r.getAttribute('width'));
  say(plans.length === 5 && pw[0] === pw[3] && pw[3] === pw[4] && pw[1] === pw[2] && pw[1] > pw[0] && Math.abs(pw[1] / pw[0] - 1.5) < 0.02, 'E1-022', 'five planned bars in grey: 60, 90, 90, 60, 60 seconds by width');
  const px = plans.map((r) => +r.getAttribute('x'));
  say(px[1] > px[0] && px[2] > px[1] && px[3] > px[2] && px[4] > px[3] && Math.abs((px[1] - px[0]) - pw[0]) < 0.2 && Math.abs((px[2] - px[1]) - pw[1]) < 0.2, 'E1-023', 'the planned bars lie end to end along the line (a staircase)');
  say(acts().length === 5 && acts().every((r) => /\bgone\b/.test(r.getAttribute('class')) && r.getAttribute('width') === '0'), 'E1-024', 'five actual bars exist, hidden and at zero width before Start');
  const ticks = $$('#e1Fig .sE1-tick, #e1Fig .sE1-tott').map((t) => t.textContent);
  say(ticks.join(',') === '0:00,1:00,2:00,3:00,4:00,5:00,6:00,7:00' && $$('#e1Fig .sE1-tott').length === 1 && $$('#e1Fig .sE1-tott')[0].textContent === '6:00', 'E1-025', 'the time axis runs 0:00 to 7:00 with 6:00 as the gold total tick');
  const tot = $('#e1Fig .sE1-tot');
  const plan5end = px[4] + pw[4];
  say(!!tot && Math.abs(+tot.getAttribute('x1') - plan5end) < 0.2 && tot.getAttribute('x1') === tot.getAttribute('x2'), 'E1-026', 'the vertical 6:00 marker stands exactly where the fifth planned bar ends');
  const labs = $$('#e1Fig .sE1-lab').map((t) => t.textContent);
  say(labs.join('|') === 'What it does|Design choices|Where it broke|What changed|Your practice' && $$('#e1Fig .sE1-lab2').map((t) => t.textContent).join('|') === 'plan 1:00|plan 1:30|plan 1:30|plan 1:00|plan 1:00',
    'E1-027', 'each row carries a short label and its planned m:ss');
  say($$('#e1Fig .sE1-numt').map((t) => t.textContent).join('') === '12345', 'E1-028', 'the rows are numbered 1 to 5');
  say(/planned/.test(txt('#sE1 .sE1-key')) && /on plan, within 15 s/.test(txt('#sE1 .sE1-key')) && /under/.test(txt('#sE1 .sE1-key')) && /over/.test(txt('#sE1 .sE1-key')) && /6:00, the total/.test(txt('#sE1 .sE1-key')), 'E1-029', 'the legend names planned, on plan within 15 s, under, over and the 6:00 total');

  /* the outline and the copy button */
  const li = $$('#e1List li');
  say(li.length === 5 && li.every((l, i) => l.querySelector('.nb') && l.querySelector('.nb').textContent === String(i + 1)), 'E1-030', 'the outline lists five numbered beats');
  say(/What it does, and the problem it solves/.test(li[0].textContent) && /The design choices: tool, tier, prompt structure, checks/.test(li[1].textContent) && /Where it worked, and the input that broke it/.test(li[2].textContent) && /What you changed, and why/.test(li[3].textContent) && /One thing you take into your own practice/.test(li[4].textContent),
    'E1-031', 'the five beat titles are the spec\'s, in order');
  say(li.map((l) => l.querySelector('.sE1-om').textContent).join(',') === '1:00,1:30,1:30,1:00,1:00', 'E1-032', 'each outline row shows its planned minutes as m:ss');
  say(txt('#e1Line') === 'The builder then responds for up to two minutes; expect questions on the input that broke it.', 'E1-033', 'the one line about the builder\'s two minutes is on the page');
  say(/Then this: 1 minute/.test(txt('#sE1 .panel:not([data-task]) .do')), 'E1-034', 'the second beat is "Then this: 1 minute"');
  click($('#e1Copy'));
  const c = copied();
  say(/^Six minutes, five beats\n1\. What it does, and the problem it solves \(1:00\)\n2\. The design choices: tool, tier, prompt structure, checks \(1:30\)\n3\. Where it worked, and the input that broke it \(1:30\)\n4\. What you changed, and why \(1:00\)\n5\. One thing you take into your own practice \(1:00\)\nTotal 6:00\. The builder then responds for up to two minutes; expect questions on the input that broke it\.$/.test(c),
    'E1-035', 'Copy the five-beat outline copies the five titles with their minutes and the builder line');
  say($('#e1Copy').nextElementSibling && $('#e1Copy').nextElementSibling.classList.contains('cmsg') && $('#e1Copy').nextElementSibling.getAttribute('aria-live') === 'polite', 'E1-036', 'a live cmsg span sits beside the copy button');

  /* Next before Start does nothing */
  click(NEXT);
  say(acts().every((r) => /\bgone\b/.test(r.getAttribute('class'))) && !gate.classList.contains('done') && /Press Start the clock/.test(txt('#e1Out')), 'E1-040', 'Next before Start changes nothing');

  /* Start */
  click(START);
  say(START.disabled && START.getAttribute('aria-disabled') === 'true' && !NEXT.disabled && !NEXT.hasAttribute('aria-disabled'), 'E1-041', 'Start locks itself and enables Next');
  say(/Beat 1 of 5 is on the clock/.test(txt('#e1Out')) && /What it does, and the problem it solves\./.test(txt('#e1Out')) && /Plan 1:00/.test(txt('#e1Out')), 'E1-042', 'the readout announces beat 1 with its title and plan');
  const row0 = $$('#e1Fig .sE1-rowbg')[0];
  say(/\bcur\b/.test(row0.getAttribute('class')) && /\bcur\b/.test($$('#e1Fig .sE1-lab')[0].getAttribute('class')) && acts()[0].getAttribute('class') === 'sE1-act run' && dvs()[0].textContent === '0:00',
    'E1-043', 'row 1 lights as current: its bar is live and its riding label reads 0:00');
  say($('#e1Fig .sE1-you').getAttribute('class') === 'sE1-you' && $('#e1Fig .sE1-yout').textContent === 'you', 'E1-044', 'the "you" line appears at the start of the line');
  say(MMSS.test(CLK.textContent) && /Beat 1 of 5/.test(txt('#e1Stat')), 'E1-045', 'the clock is m:ss and the status names beat 1');

  /* the quick-succession path: five Nexts with no time passing */
  for (let i = 0; i < 5; i++) click(NEXT);
  const A = acts(), D = dvs();
  say(A.length === 5 && A.every((r) => /^sE1-act (ok|under|over)$/.test(r.getAttribute('class'))) && A.every((r) => +r.getAttribute('width') >= 2), 'E1-050', 'five Nexts in quick succession leave five frozen bars, each with a verdict class and a visible sliver');
  say(A.every((r) => /\bunder\b/.test(r.getAttribute('class'))) && D.every((t) => /^under \d+ s$/.test(t.textContent)), 'E1-051', 'with no time passing every beat is under, and each bar says so in words');
  say(gate.classList.contains('done') && gate.querySelector('.mk').textContent === '✓', 'E1-052', 'the fifth Next ticks the gate ga1');
  const out = txt('#e1Out');
  say(/Beat 5: 0:00 against a plan of 1:00 \(under by 60 s, 1:00\)/.test(out), 'E1-053', 'the last beat line reads "Beat 5: m:ss against a plan of m:ss (under by s)"');
  say(/Your six minutes/.test(out) && /Total 0:0\d against 6:00 \(under by 3\d\d s, [56]:\d\d\)/.test(out), 'E1-054', 'the summary gives the total against 6:00 and how far under');
  say(/Most under: beat 2, by 90 s, 1:30 \(The design choices: tool, tier, prompt structure, checks\)\./.test(out) && /No beat ran over\./.test(out), 'E1-055', 'the summary names the beat most under and says no beat ran over');
  say(/The beat most people rush is the one with the input that broke it: that is the one the room remembers\./.test(out), 'E1-056', 'the summary ends with the spec\'s closing line');
  say(/under/.test(out) && OUT.classList.contains('has') && $$('#e1Out .s5stamp').length >= 2, 'E1-057', 'the summary contains "under", the panel is lit, and verdict stamps appear');
  say(NEXT.disabled && NEXT.getAttribute('aria-disabled') === 'true' && START.disabled, 'E1-058', 'after the fifth Next both Start and Next are locked; only Start again remains');
  say(MMSS.test(CLK.textContent) && /Done · 0:0\d against a plan of 6:00/.test(txt('#e1Stat')), 'E1-059', 'the clock still reads m:ss and the status says Done');
  say($$('#e1Fig .sE1-lab2').every((t) => /^\d:\d\d · plan \d:\d\d$/.test(t.textContent)), 'E1-060', 'each row label now shows actual against plan');
  say(/Beat 1: 0:0\d against 1:00, under/.test(svg.getAttribute('aria-label')) && /Total 0:0\d\./.test(svg.getAttribute('aria-label')), 'E1-061', 'the figure\'s aria-label reads the five verdicts and the total');
  say(!/\b(undefined|NaN)\b/.test(txt('#sE1')) && !/\b(undefined|NaN)\b/.test(svg.getAttribute('aria-label')), 'E1-062', 'no "undefined" or "NaN" anywhere in the section after the run');
  click(NEXT);
  say(/Beat 5: 0:00 against a plan of 1:00/.test(txt('#e1Out')) && acts().filter((r) => /\brun\b/.test(r.getAttribute('class'))).length === 0, 'E1-063', 'a sixth Next is ignored');

  /* Reset */
  click(RESET);
  say(acts().every((r) => /\bgone\b/.test(r.getAttribute('class')) && r.getAttribute('width') === '0') && dvs().every((t) => t.textContent === '' && /\bgone\b/.test(t.getAttribute('class'))), 'E1-070', 'Start again clears the five bars and their labels');
  say(CLK.textContent === '0:00' && !CLK.classList.contains('past') && /Not started/.test(txt('#e1Stat')), 'E1-071', 'Start again resets the clock to 0:00');
  say(/Press Start the clock/.test(txt('#e1Out')) && !OUT.classList.contains('has') && !!OUT.querySelector('.nil'), 'E1-072', 'Start again clears the readout to its waiting text');
  say(!START.disabled && NEXT.disabled && NEXT.getAttribute('aria-disabled') === 'true', 'E1-073', 'Start again re-enables Start and locks Next');
  say($$('#e1Fig .sE1-lab2').map((t) => t.textContent).join('|') === 'plan 1:00|plan 1:30|plan 1:30|plan 1:00|plan 1:00' && $$('#e1Fig .sE1-rowbg').every((r) => r.getAttribute('class') === 'sE1-rowbg') && $('#e1Fig .sE1-you').getAttribute('class') === 'sE1-you gone',
    'E1-074', 'Start again restores the row labels, clears the current-row light and hides the you line');
  say(gate.classList.contains('done'), 'E1-075', 'the gate stays ticked after Start again (gates are one way)');
  say(/Not started/.test(svg.getAttribute('aria-label')), 'E1-076', 'the aria-label returns to Not started');
  /* a second real run can begin */
  click(START);
  say(START.disabled && !NEXT.disabled && acts()[0].getAttribute('class') === 'sE1-act run', 'E1-077', 'the clock can be started again after Start again');
  click(RESET);

  /* chips, dashes, forbidden words, a11y */
  const secTxt = txt('#sE1');
  const outer = sec.outerHTML;
  say(!/—|&mdash;|–|&ndash;/.test(outer), 'E1-080', 'no em dash or en dash in the section');
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric|canvas|the instructor|before Session 5|points|weight)\b/i.test(secTxt), 'E1-081', 'no forbidden course-policy words in the learner-facing text');
  const chips = $$('#sE1 .conf[data-src]');
  say(chips.length === 1 && chips.every((c) => ALLOWED.includes(c.getAttribute('data-src'))) && chips[0].classList.contains('l'), 'E1-082', 'the one confidence chip is src-case, L');
  say(/the timings are a suggestion constructed for this lesson/.test(txt('#sE1 p.src')), 'E1-083', 'the source line says the timings are constructed for this lesson');
  say($$('#sE1 ul.pts li').length === 3 && /^The clock is the format\./.test(txt('#sE1 ul.pts li:nth-child(1)')) && /^Say the break at 2:30\./.test(txt('#sE1 ul.pts li:nth-child(2)')) && /^Rehearse alone, aloud\./.test(txt('#sE1 ul.pts li:nth-child(3)')), 'E1-084', 'three bullets with the spec\'s leads');
  say($$('#sE1 ul.pts li').every((l) => l.textContent.split(/[.!?](\s|$)/).filter((x) => x.trim().length > 1).length <= 2), 'E1-085', 'each bullet is at most two sentences');
  const clickables = $$('#sE1 [onclick], #sE1 a[href^="#"], #sE1 div[tabindex], #sE1 span[tabindex]');
  say(clickables.length === 0 && $$('#sE1 button').every((b) => b.getAttribute('type') === 'button'), 'E1-086', 'every button is type=button and nothing else pretends to be clickable');
  say($$('#sE1 .sE1-ctl').length === 1 && $('#sE1 .sE1-ctl').getAttribute('role') === 'group' && $('#sE1 .sE1-ctl').getAttribute('aria-label'), 'E1-087', 'the three controls sit in a labelled group');
  const prose = ['#sE1 p.big', '#sE1 ul.pts', '#sE1 p.src', '#sE1 .check .ct', '#sE1 h2', '#sE1 .eyebrow'].map(txt).join(' ');
  say(wc(prose) < 180, 'E1-088', 'static prose outside the panels is under 180 words (' + wc(prose) + ')');
  say(errs.length === 0, 'E1-089', 'zero window errors after the full run' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 2: the clock really runs (1.3 real seconds) ================= */
{
  const { $, $$, txt, click, acts, dvs, errs } = load();
  click($('#e1Start'));
  const w0 = +acts()[0].getAttribute('width'), you0 = +$('#e1Fig .sE1-you').getAttribute('x1');
  await sleep(1300);
  const w1 = +acts()[0].getAttribute('width'), you1 = +$('#e1Fig .sE1-you').getAttribute('x1');
  say(txt('#e1Clock') === '0:01' && /0:01 of a planned 1:00/.test(txt('#e1Stat')), 'E1-090', 'after 1.3 s the clock reads 0:01 and the status follows (' + txt('#e1Clock') + ')');
  say(w1 > w0 && w1 > 0.5 && you1 > you0, 'E1-091', 'the live bar grew and the you line moved (' + w0 + ' to ' + w1 + ')');
  say(dvs()[0].textContent === '0:01' && /\brun\b/.test(dvs()[0].getAttribute('class')), 'E1-092', 'the riding label on the live bar reads the beat\'s own 0:01');
  click($('#e1Next'));
  say(/Beat 1: 0:01 against a plan of 1:00 \(under by 59 s\)/.test(txt('#e1Out')) && /Beat 2 of 5 is on the clock/.test(txt('#e1Out')) && /Plan 1:30/.test(txt('#e1Out')), 'E1-093', 'Next writes beat 1 at 0:01, under by 59 s, and announces beat 2 with its plan');
  const a0 = acts()[0], a1 = acts()[1];
  say(/\bunder\b/.test(a0.getAttribute('class')) && a1.getAttribute('class') === 'sE1-act run' && Math.abs((+a1.getAttribute('x')) - ((+a0.getAttribute('x')) + Math.max(2, w1))) < 1.5, 'E1-094', 'bar 1 froze under and bar 2 starts where bar 1 ended');
  say($$('#e1Fig .sE1-lab2')[0].textContent === '0:01 · plan 1:00' && /\bcur\b/.test($$('#e1Fig .sE1-rowbg')[1].getAttribute('class')) && !/\bcur\b/.test($$('#e1Fig .sE1-rowbg')[0].getAttribute('class')), 'E1-095', 'row 1 shows actual against plan, the light moves to row 2');
  click($('#e1Next'));
  say(/For the sample package \(the Meeting-prep brief from §02\), the inputs that broke it in §03 were: The same note with the appraisal sentence removed; The note plus a pasted email that says sale talks have started; A real note with the client’s full name and account number still in it\./.test(txt('#e1Out')),
    'E1-096', 'beat 3 names the shared sample package and its breaking inputs from S5PKG and S5INPUTS');
  click($('#e1Reset'));
  say(txt('#e1Clock') === '0:00' && acts().every((r) => r.getAttribute('width') === '0'), 'E1-097', 'Start again mid-run stops the clock and clears the bars');
  await sleep(400);
  say(txt('#e1Clock') === '0:00', 'E1-098', 'the stopped clock does not tick on after Start again');
  say(errs.length === 0, 'E1-099', 'zero window errors in the timed run' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 3: the three verdicts, standing the clock at chosen seconds ================= */
{
  const { w, $, $$, txt, click, acts, dvs, at, errs } = load();
  const base = w.Date.now();
  at(base, 0);
  click($('#e1Start'));
  at(base, 64); click($('#e1Next'));                /* 1:04 of 1:00: within 15 s, on plan */
  say(/Beat 1: 1:04 against a plan of 1:00 \(over by 4 s\)/.test(txt('#e1Out')) && /ON PLAN/.test(txt('#e1Out')), 'E1-100', 'beat 1 at 1:04: over by 4 s and stamped ON PLAN');
  say(acts()[0].getAttribute('class') === 'sE1-act ok' && dvs()[0].textContent === '✓ on plan' && $$('#e1Fig .sE1-numt')[0].getAttribute('class') === 'sE1-numt ok', 'E1-101', 'bar 1 freezes teal with a tick and the words "on plan"');
  at(base, 64 + 120); click($('#e1Next'));          /* 2:00 of 1:30: over by 30 */
  say(/Beat 2: 2:00 against a plan of 1:30 \(over by 30 s\)/.test(txt('#e1Out')) && /OVER/.test(txt('#e1Out')), 'E1-102', 'beat 2 at 2:00: over by 30 s and stamped OVER');
  say(acts()[1].getAttribute('class') === 'sE1-act over' && dvs()[1].textContent === 'over 30 s', 'E1-103', 'bar 2 freezes rust and says "over 30 s"');
  at(base, 64 + 120 + 60); click($('#e1Next'));     /* 1:00 of 1:30: under by 30 */
  say(/Beat 3: 1:00 against a plan of 1:30 \(under by 30 s\)/.test(txt('#e1Out')) && /UNDER/.test(txt('#e1Out')), 'E1-104', 'beat 3 at 1:00: under by 30 s and stamped UNDER');
  say(acts()[2].getAttribute('class') === 'sE1-act under' && dvs()[2].textContent === 'under 30 s', 'E1-105', 'bar 3 freezes gold and says "under 30 s"');
  const w1 = +acts()[0].getAttribute('width'), w2 = +acts()[1].getAttribute('width'), w3 = +acts()[2].getAttribute('width'), pw = +$$('#e1Fig .sE1-plan')[0].getAttribute('width');
  say(Math.abs(w1 / pw - 64 / 60) < 0.02 && Math.abs(w2 / pw - 2) < 0.02 && Math.abs(w3 / pw - 1) < 0.02, 'E1-106', 'frozen widths are proportional to the seconds (1:04, 2:00, 1:00 against a 1:00 plan bar)');
  const x3 = +acts()[2].getAttribute('x'), x2 = +acts()[1].getAttribute('x');
  say(Math.abs(x3 - (x2 + w2)) < 0.3, 'E1-107', 'each frozen bar starts where the one before it ended');
  at(base, 64 + 120 + 60 + 60); click($('#e1Next'));      /* 1:00 of 1:00 */
  say(/Beat 4: 1:00 against a plan of 1:00 \(on the plan\)/.test(txt('#e1Out')), 'E1-108', 'an exact beat reads "(on the plan)"');
  say(txt('#e1Clock') === '5:04' && !$('#e1Clock').classList.contains('past'), 'E1-109', 'the clock reads 5:04 and is not yet past 6:00');
  at(base, 64 + 120 + 60 + 60 + 70);                         /* 1:10 of 1:00: on plan, total 6:14 */
  await sleep(320);
  say(txt('#e1Clock') === '6:14' && $('#e1Clock').classList.contains('past') && $('#e1Stat').classList.contains('past'), 'E1-110', 'past 6:00 the clock and status take the past class (6:14)');
  const youX = +$('#e1Fig .sE1-you').getAttribute('x1'), totX = +$('#e1Fig .sE1-tot').getAttribute('x1');
  say(youX > totX, 'E1-111', 'the you line has crossed the 6:00 marker');
  click($('#e1Next'));
  const out = txt('#e1Out');
  say(/Beat 5: 1:10 against a plan of 1:00 \(over by 10 s\)/.test(out) && /Total 6:14 against 6:00 \(over by 14 s\)/.test(out) && /ON PLAN/.test(out), 'E1-112', 'the summary totals 6:14 against 6:00, over by 14 s, which is still on plan');
  say(/Most over: beat 2, by 30 s \(The design choices: tool, tier, prompt structure, checks\)\./.test(out) && /Most under: beat 3, by 30 s \(Where it worked, and the input that broke it\)\./.test(out), 'E1-113', 'the summary names beat 2 as most over and beat 3 as most under');
  say(/Beats: 1 · 1:04 ✓, 2 · 2:00 over, 3 · 1:00 under, 4 · 1:00 ✓, 5 · 1:10 ✓\./.test(out), 'E1-114', 'the recap line lists the five beats with their verdicts');
  say($('#sE1 .check[data-gate="ga1"]').classList.contains('done') && $('#e1Next').disabled, 'E1-115', 'the gate ticks and Next locks');
  say(txt('#e1Clock') === '6:14' && /Done · 6:14 against a plan of 6:00/.test(txt('#e1Stat')), 'E1-116', 'the clock holds the total 6:14');
  say(!/\b(undefined|NaN)\b/.test(txt('#sE1')), 'E1-117', 'no undefined or NaN after the verdict run');
  say(errs.length === 0, 'E1-118', 'zero window errors in the verdict run' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 4: the clock stops at 7:00 ================= */
{
  const { w, $, txt, click, acts, at, errs } = load();
  const base = w.Date.now();
  at(base, 0);
  click($('#e1Start'));
  at(base, 431);
  await sleep(320);
  say(txt('#e1Clock') === '7:00' && $('#e1Clock').classList.contains('past') && /Over time/.test(txt('#e1Stat')) && /stopped at 7:00 on beat 1/.test(txt('#e1Stat')), 'E1-120', 'the clock stops at 7:00 and the status reads Over time');
  say(/Over time/.test(txt('#e1Out')) && /The clock stopped at 7:00 on beat 1 of 5\./.test(txt('#e1Out')) && /Press Next beat to close out the beats you have left, or Start again\./.test(txt('#e1Out')), 'E1-121', 'the readout explains the stop and what to do');
  const barEnd = +acts()[0].getAttribute('x') + (+acts()[0].getAttribute('width'));
  say(Math.abs(barEnd - 520) < 0.5 && +$('#e1Fig .sE1-you').getAttribute('x1') === 520, 'E1-122', 'the live bar and the you line halt at the 7:00 end of the line');
  at(base, 500);
  await sleep(320);
  say(txt('#e1Clock') === '7:00' && Math.abs((+acts()[0].getAttribute('x') + (+acts()[0].getAttribute('width'))) - 520) < 0.5, 'E1-123', 'the stopped clock does not creep past 7:00');
  say(!$('#e1Next').disabled, 'E1-124', 'Next stays enabled so the remaining beats can be closed out');
  click($('#e1Next'));
  say(/Beat 1: 7:00 against a plan of 1:00 \(over by 360 s, 6:00\)/.test(txt('#e1Out')) && acts()[0].getAttribute('class') === 'sE1-act over', 'E1-125', 'closing beat 1 records 7:00, over by 360 s, in rust');
  for (let i = 0; i < 4; i++) click($('#e1Next'));
  const out = txt('#e1Out');
  say(/Total 7:00 against 6:00 \(over by 60 s, 1:00\)/.test(out) && /Most over: beat 1, by 360 s, 6:00/.test(out) && /Most under: beat 2, by 90 s, 1:30/.test(out), 'E1-126', 'the summary after an over-time run totals 7:00 and names beat 1 as most over');
  say($('#sE1 .check[data-gate="ga1"]').classList.contains('done'), 'E1-127', 'the gate ticks after the fifth Next even on an over-time run');
  say(acts().every((r) => +r.getAttribute('width') >= 2) && acts().slice(1).every((r) => /\bunder\b/.test(r.getAttribute('class'))), 'E1-128', 'the four unreached beats froze as slivers marked under');
  say(!/\b(undefined|NaN)\b/.test(txt('#sE1')), 'E1-129', 'no undefined or NaN after the over-time run');
  say(errs.length === 0, 'E1-130', 'zero window errors in the over-time run' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 5: the instructor override on a fresh page ================= */
{
  const { w, d, $, $$, txt, acts, dvs, click, errs } = load();
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(d.body.classList.contains('reveal'), 'E1-140', 'Shift+U turns the override on');
  say(acts().every((r) => r.getAttribute('class') === 'sE1-act ok') && dvs().every((t) => t.textContent === '✓ on plan'), 'E1-141', 'Shift+U freezes all five bars on plan at once');
  await sleep(900);
  const pw = $$('#e1Fig .sE1-plan').map((r) => +r.getAttribute('width'));
  say(acts().every((r, i) => Math.abs(+r.getAttribute('width') - pw[i]) < 0.2), 'E1-142', 'after the tween the five bars fill to exactly their planned widths');
  const out = txt('#e1Out');
  say(/Total 6:00 against 6:00 \(on the plan\)/.test(out) && /No beat ran over\./.test(out) && /No beat ran under\./.test(out) && /The beat most people rush is the one with the input that broke it/.test(out), 'E1-143', 'the override writes the summary at the plan');
  say($('#sE1 .check[data-gate="ga1"]').classList.contains('done'), 'E1-144', 'Shift+U ticks the gate');
  say(txt('#e1Clock') === '6:00' && $('#e1Start').disabled && $('#e1Next').disabled && !$('#e1Reset').disabled, 'E1-145', 'the clock shows 6:00; Start and Next lock; Start again stays open');
  say($$('#e1Fig .sE1-lab2').map((t) => t.textContent).join('|') === '1:00 · plan 1:00|1:30 · plan 1:30|1:30 · plan 1:30|1:00 · plan 1:00|1:00 · plan 1:00', 'E1-146', 'every row label reads its plan as actual');
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(acts().every((r) => r.getAttribute('class') === 'sE1-act ok') && /Total 6:00/.test(txt('#e1Out')), 'E1-147', 'toggling the override off and on again leaves the filled state alone');
  click($('#e1Reset'));
  say(acts().every((r) => r.getAttribute('width') === '0') && !$('#e1Start').disabled && txt('#e1Clock') === '0:00', 'E1-148', 'Start again after the override clears the figure for a real run');
  click($('#e1Start'));
  say(acts()[0].getAttribute('class') === 'sE1-act run' && /Beat 1 of 5 is on the clock/.test(txt('#e1Out')), 'E1-149', 'a real run can begin after the override');
  say(!/\b(undefined|NaN)\b/.test(txt('#sE1')), 'E1-150', 'no undefined or NaN under the override');
  say(errs.length === 0, 'E1-151', 'zero window errors under the override' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 6: an untouched page stays clean ================= */
{
  const { $$, txt, errs } = load();
  say(!/\b(undefined|NaN)\b/.test(txt('#sE1')), 'E1-160', 'the untouched section prints no undefined or NaN');
  say(MMSS.test(txt('#e1Clock')) && $$('#e1Fig .sE1-plan').length === 5, 'E1-161', 'the untouched clock is m:ss and the five planned bars are drawn');
  say(errs.length === 0, 'E1-162', 'zero errors on the untouched page');
}

console.log(`\n${n} assertions, ${fails} failed`);
process.exit(fails ? 1 : 0);
