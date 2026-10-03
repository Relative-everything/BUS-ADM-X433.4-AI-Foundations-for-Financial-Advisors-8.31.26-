#!/usr/bin/env node
/* sE4.tests.mjs <assembled page>: jsdom assertions for Session 5 Appendix E4, in the shape
   of Session 4's docs/changes/2026-09-28-session-4-notes/checks.mjs. Exit 1 on any fail.
   Run: NODE_PATH=$(npm root -g) node sE4.tests.mjs /tmp/sE4-test.html */
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

function load(opts) {
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errs.push('jsdomError: ' + (e && e.message || e)));
  vc.on('warn', (...a) => { const s = a.join(' '); if (/section sE4 failed|widget error contained|^sE4:/.test(s)) errs.push('warn: ' + s); });
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse: (win) => { if (opts && opts.reduced) win.matchMedia = () => ({ matches: true, addListener() {}, removeListener() {} }); } });
  const w = dom.window, d = w.document;
  w.addEventListener('error', (e) => errs.push('window error: ' + (e.message || e)));
  return { w, d, errs,
    $: (s) => d.querySelector(s),
    $$: (s) => [...d.querySelectorAll(s)],
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ') : ''),
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })),
    vis: (el) => !!el && !el.hidden && el.style.display !== 'none',
    btn: (k) => [...d.querySelectorAll('#e4Calls button')].find((b) => b.getAttribute('data-k') === k) };
}
const S = [
  'It runs on the firm’s AI tool at the standard tier.',
  'It broke when the appraisal line was missing: it invented a value.',
  'The verification step is a comparison against the CRM record.',
  'It is meant for any client meeting, including prospects.',
  'I changed the README so the client’s name is replaced before the paste, and I rejected any brief with an eight-digit number.'];
const A = ['c', 'a', 'b', 'c', 'a'];
const CLOSE = 'Two of five were your package’s fault, not the presenter’s. A runner who cannot run it from the documents has found a gap in the package, and that is the result.';

/* ================= run 1: the happy path (animations on; the hand is awaited) ================= */
{
  const { d, errs, $, $$, txt, click, vis, btn } = load();
  say(errs.length === 0, 'E4-001', 'the page loads with zero window errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  const sec = $('#sE4');
  say(!!sec && sec.classList.contains('slide') && sec.classList.contains('apx') && sec.getAttribute('data-nav') === 'E4 · The builder\'s two minutes' && sec.getAttribute('data-insert-after') === 's4' && sec.getAttribute('data-tier') === 'foundational',
    'E4-002', 'section #sE4 is an appendix slide, inserted after s4, foundational, with the spec\'s data-nav');
  const stub = sec && sec.firstElementChild;
  say(!!stub && stub.classList.contains('apxstub') && /E4 · The Builder's Two Minutes/.test(stub.textContent) && /10 min · foundational/.test(stub.textContent) && /APXSTUB:BEGIN/.test(sec.innerHTML) && /APXSTUB:END/.test(sec.innerHTML),
    'E4-003', 'the APXSTUB line is the first child with the spec\'s title, minutes and tier');
  say(/Appendix E4 · The builder's turn/.test(txt('#sE4 .eyebrow')) && txt('#sE4 .eyebrow .mins').trim() === '10 min' && txt('#sE4 h2').trim() === 'The Builder\'s Two Minutes', 'E4-004', 'eyebrow, minutes and title as the spec says');
  const big = txt('#sE4 p.big').trim();
  say(big === 'When a stranger presents your workflow, you get two minutes. Three things can be true of each sentence they say, and only one of them is about them.' && big.split(/\s+/).length < 30, 'E4-005', 'the thesis line is the spec\'s and under 30 words (' + big.split(/\s+/).length + ')');
  const roots = $$('#sE4 [data-task]');
  say(roots.length === 1 && roots[0].getAttribute('data-task') === 't-sE4' && roots[0].getAttribute('data-comp') === 'commit-first-mcq', 'E4-006', 'exactly one data-task root, t-sE4, family commit-first-mcq');
  say(txt('#sE4 .panel[data-task] .do').trim() === 'Do this now: 5 minutes' && txt('#sE4 .panel[data-task] h4').trim() === 'What the Presenter Said' && txt('#sE4 .panel[data-task] .hint').trim() === 'One sentence at a time. Say your call aloud, then click it.',
    'E4-007', 'the Do-this-now line, heading and hint are the spec\'s');

  /* the package strip: rendered from the shared data, never retyped */
  const pkg = txt('#e4Pkg');
  say(/Meeting-prep brief · README/.test(pkg) && /1\. Open prompt\.txt and paste it into the firm’s AI tool\./.test(pkg) && /2\. Where it says \[NOTE\]/.test(pkg) && /3\. Read the brief it returns/.test(pkg) && /Verification: read the brief and make sure it looks right\./.test(pkg),
    'E4-010', 'the package strip shows the shared README\'s three steps and its verification line (from S5PKG)');
  const scriptStart = html.indexOf('/* ----- section sE4 ----- */');
  const scriptEnd = html.indexOf('/* ----- section ', scriptStart + 10);
  const script = scriptStart >= 0 ? html.slice(scriptStart, scriptEnd > scriptStart ? scriptEnd : undefined) : '';
  say(script.length > 1000 && !/Open prompt\.txt/.test(script) && !/make sure it looks right\.'/.test(script) && !/roughly \$12 million/.test(script) && /S5PKG/.test(script) && /S5INPUTS/.test(script) && /S5FIXES/.test(script),
    'E4-011', 'the section script reads S5PKG, S5INPUTS and S5FIXES and does not retype their text');

  /* the table at load */
  const calls = $$('#e4Calls button');
  say(calls.length === 3 && calls.every((b) => b.getAttribute('type') === 'button' && b.classList.contains('sel') && b.classList.contains('mini') && b.getAttribute('aria-pressed') === 'false' && !b.disabled),
    'E4-012', 'three call buttons, btn sel mini, type=button, aria-pressed false and open at load');
  say(/\(a\) Understood: that is how I built it/.test(calls[0].textContent) && /\(b\) Missed: the package says otherwise/.test(calls[1].textContent) && /\(c\) My package failed them: it never said/.test(calls[2].textContent),
    'E4-013', 'the three calls carry the spec\'s wording');
  say(txt('#e4N').trim() === '1' && txt('#e4Said').trim() === S[0] && /Sentence 1 of 5/.test(txt('#e4Quote')), 'E4-014', 'sentence 1 is on the table');
  const NX = $('#e4Next');
  say(!!NX && !vis(NX) && NX.textContent.trim() === 'Next sentence ▸' && NX.getAttribute('type') === 'button', 'E4-015', '#e4Next reads "Next sentence ▸" and is hidden before a call');
  const svg = $('#e4Fig svg');
  say(!!svg && svg.getAttribute('viewBox') === '0 0 360 300' && svg.getAttribute('role') === 'img' && /0 of 5 called/.test(svg.getAttribute('aria-label')) && /Elapsed 0:00 of 2:00/.test(svg.getAttribute('aria-label')),
    'E4-016', 'the figure is one viewBox SVG, role img, with an aria-label at 0 of 5');
  const segs = $$('#e4Fig .sE4-seg');
  const ticks = $$('#e4Fig .sE4-tick'), tl = $$('#e4Fig .sE4-tl').map((t) => t.textContent);
  say(segs.length === 5 && ticks.length === 5 && tl.join(',') === '0:00,0:24,0:48,1:12,1:36', 'E4-017', 'a two-minute clock: five segments, five ticks labelled 0:00 to 1:36');
  say(/sE4-seg next/.test(segs[0].getAttribute('class')) && segs.slice(1).every((s) => s.getAttribute('class') === 'sE4-seg'), 'E4-018', 'segment 1 is outlined as next; the rest are unlit');
  const binNames = $$('#e4Fig .sE4-bn').map((t) => t.textContent), binCounts = $$('#e4Fig .sE4-bc');
  say(binNames.join(',') === 'Understood,Missed,Package gap' && binCounts.length === 3 && binCounts.every((c) => c.textContent === '0') && $$('#e4Fig .sE4-pip').length === 15,
    'E4-019', 'three tally bins named Understood, Missed, Package gap, each at 0 with five pip slots');
  say(txt('#e4Fig .sE4-el').trim() === '0:00' && /rotate\(0 180 106\)/.test($('#e4Fig .sE4-handg').getAttribute('transform')), 'E4-020', 'the hand sits at 0:00');
  say(txt('#sE4 .sE4-cap').trim() === 'In two minutes, name what they got right first.', 'E4-021', 'the caption is the spec\'s');
  const gate = $('#sE4 .check[data-gate="ga4"]');
  say(!!gate && !gate.classList.contains('done') && /Call all five sentences\./.test(txt('#sE4 .check .ct')), 'E4-022', 'the gate ga4 exists, unticked, with the spec\'s text');
  say($('#e4Out').getAttribute('aria-live') === 'polite' && $('#e4Tally').getAttribute('aria-live') === 'polite' && /Read sentence 1 against the package above/.test(txt('#e4Out')) && txt('#e4Tally').trim() === '0 of 5 called',
    'E4-023', 'the readout and the tally are live regions and say what to do first');
  const key = $('#e4Key');
  say(!!key && key.classList.contains('keyhide') && !vis(key), 'E4-024', 'the answer key is a hidden keyhide at load');

  /* call 1: (a), wrong; the truth is (c) */
  click(btn('a'));
  say(calls.every((b) => b.disabled && b.getAttribute('aria-disabled') === 'true'), 'E4-030', 'the first pick locks all three calls (disabled and aria-disabled)');
  say(btn('a').getAttribute('aria-pressed') === 'true' && btn('a').classList.contains('picked') && btn('a').classList.contains('bad') && btn('a').querySelector('.sE4-g').textContent === '✗',
    'E4-031', 'the picked wrong call shows aria-pressed, a dashed bad state and a cross glyph');
  say(btn('c').classList.contains('sE4-ans') && btn('c').querySelector('.sE4-g').textContent === '✓' && btn('c').getAttribute('aria-pressed') === 'false', 'E4-032', 'the right call (c) is marked with a tick, not pressed');
  say(segs[0].getAttribute('class') === 'sE4-seg on c' && $$('#e4Fig .sE4-sn')[0].getAttribute('class') === 'sE4-sn on', 'E4-033', 'segment 1 lights in the colour of its truth (c, package gap)');
  const marks = $$('#e4Fig .sE4-mk');
  say(marks[0].textContent === '✗' && /sE4-mk show bad/.test(marks[0].getAttribute('class')), 'E4-034', 'the cross mark appears beside segment 1');
  const pipsC = $$('#e4Fig .sE4-pip').slice(10, 15), ptsC = $$('#e4Fig .sE4-pt').slice(10, 15);
  say(binCounts[2].textContent === '1' && /sE4-bc c/.test(binCounts[2].getAttribute('class')) && /sE4-pip sE4-pop bad c/.test(pipsC[0].getAttribute('class')) && ptsC[0].textContent === '1' && /lit c/.test($$('#e4Fig .sE4-bin')[2].getAttribute('class')),
    'E4-035', 'the Package gap bin counts 1 and drops a numbered pip marked as a miss');
  say($('#e4Quote').className === 'sE4-quote sE4-c', 'E4-036', 'the sentence card takes the truth\'s colour');
  const o1 = txt('#e4Out');
  say($('#e4Out').classList.contains('has') && /Sentence 1 of 5 · package gap · 0:24 on the clock/.test(o1) && o1.indexOf(S[0]) >= 0 && /✗ You said \(a\) Understood: that is how I built it\. It is \(c\) My package failed them: it never said\./.test(o1) && /The package names the tool and never the tier\. The presenter guessed, and the guess is your gap to fix, not their error\./.test(o1),
    'E4-037', 'the readout holds the sentence, the call against the answer, and the why');
  say(/In the package: 1\. Open prompt\.txt and paste it into the firm’s AI tool\. No model or tier is named anywhere\./.test(o1), 'E4-038', 'the readout quotes the package line that settles it (README step 1 and the tier choice, from S5PKG)');
  say(/Next sentence ▸ brings up sentence 2\./.test(o1) && vis(NX) && txt('#e4Tally').trim() === '1 of 5 called · 0 right' && !gate.classList.contains('done'), 'E4-039', 'Next appears, the tally reads 1 of 5 and 0 right, the gate is still open');
  click(btn('c'));
  say(btn('c').getAttribute('aria-pressed') === 'false' && txt('#e4Tally').trim() === '1 of 5 called · 0 right' && binCounts[2].textContent === '1', 'E4-040', 'a second click on a locked row changes nothing');
  say(/1 of 5 called\. Understood 0, missed 0, package gap 1\. Elapsed 0:24 of 2:00\./.test(svg.getAttribute('aria-label')), 'E4-041', 'the aria-label follows the call and the clock');
  await wait(900);
  say(/rotate\(72 180 106\)/.test($('#e4Fig .sE4-handg').getAttribute('transform')) && txt('#e4Fig .sE4-el').trim() === '0:24', 'E4-042', 'the hand sweeps to 0:24 and the elapsed readout follows');

  /* next */
  click(NX);
  say(txt('#e4N').trim() === '2' && txt('#e4Said').trim() === S[1] && !vis(NX), 'E4-043', 'Next brings up sentence 2 and hides itself');
  say(calls.every((b) => !b.disabled && !b.hasAttribute('aria-disabled') && b.getAttribute('aria-pressed') === 'false' && b.className === 'btn sel mini' && b.querySelector('.sE4-g').textContent === ''),
    'E4-044', 'the three calls reopen clean');
  say(/sE4-seg next/.test(segs[1].getAttribute('class')) && segs[0].getAttribute('class') === 'sE4-seg on c' && $('#e4Quote').className === 'sE4-quote', 'E4-045', 'segment 2 is outlined as next; segment 1 stays lit');
  say(/Sentence 2 is on the table/.test(txt('#e4Out')) && !$('#e4Out').classList.contains('has'), 'E4-046', 'the readout asks for the next call');

  /* call 2: (a), right */
  click(btn('a'));
  const o2 = txt('#e4Out');
  say(btn('a').classList.contains('act') && btn('a').querySelector('.sE4-g').textContent === '✓' && /✓ \(a\) Understood: that is how I built it\. Right\./.test(o2) && /That is the diagnosis you want handed back: an input, a behaviour, reproducible\./.test(o2),
    'E4-050', 'a right call shows as pressed with a tick and the readout says Right');
  say(segs[1].getAttribute('class') === 'sE4-seg on a' && marks[1].textContent === '✓' && binCounts[0].textContent === '1' && /sE4-pip sE4-pop ok a/.test($$('#e4Fig .sE4-pip')[0].getAttribute('class')) && $$('#e4Fig .sE4-pt')[0].textContent === '2',
    'E4-051', 'segment 2 lights teal, the Understood bin counts 1 with a filled pip numbered 2');
  say(/In the package: The same note with the appraisal sentence removed gave: “Risk to watch: the company’s roughly \$12 million valuation may be stale\.”/.test(o2), 'E4-052', 'the readout quotes input 2\'s simulated brief from S5INPUTS');
  say(txt('#e4Tally').trim() === '2 of 5 called · 1 right', 'E4-053', 'the tally reads 2 of 5, 1 right');

  /* call 3: (b), right */
  click(NX); click(btn('b'));
  const o3 = txt('#e4Out');
  say(segs[2].getAttribute('class') === 'sE4-seg on b' && binCounts[1].textContent === '1' && /sE4-bc b/.test(binCounts[1].getAttribute('class')) && /Sentence 3 of 5 · missed/.test(o3) && /The package says “make sure it looks right”\./.test(o3) && /In the package: Verification: read the brief and make sure it looks right\./.test(o3),
    'E4-054', 'sentence 3: rust segment, Missed bin counts 1, the why and the package\'s verification line');

  /* call 4: (a), wrong; the truth is (c) */
  click(NX); click(btn('a'));
  const o4 = txt('#e4Out');
  say(segs[3].getAttribute('class') === 'sE4-seg on c' && marks[3].textContent === '✗' && binCounts[2].textContent === '2' && /The README never says whom it is for\./.test(o4) && /In the package: 1\. Open prompt\.txt[^]*2\. Where it says \[NOTE\][^]*3\. Read the brief it returns/.test(o4),
    'E4-055', 'sentence 4: gold segment, Package gap bin counts 2, the readout shows the whole README');
  say(!gate.classList.contains('done') && !vis(key), 'E4-056', 'after four calls the gate is still open and the key still hidden');

  /* call 5: (a), right: the end */
  click(NX);
  say(txt('#e4N').trim() === '5' && txt('#e4Said').trim() === S[4], 'E4-057', 'sentence 5 is on the table');
  click(btn('a'));
  const o5 = txt('#e4Out');
  say(gate.classList.contains('done') && gate.querySelector('.mk').textContent === '✓', 'E4-060', 'the fifth call ticks the gate ga4');
  say(!vis(NX) && calls.every((b) => b.disabled), 'E4-061', 'Next stays hidden and the calls stay locked after the fifth');
  say(o5.indexOf(CLOSE) >= 0 && /You called 5 yourself · 3 right\./.test(o5) && /A change you can defend: a step and a test\. The right response is to adopt it\./.test(o5) && /In the package: README step 2: before pasting, replace the client’s name with \[the client\]/.test(o5),
    'E4-062', 'the readout closes with the spec\'s sentence, the score, and the npi fix from S5FIXES');
  say(vis(key) && key.classList.contains('has') && /Answer key/.test(txt('#e4Key')) && /1\. \(c\) My package failed them/.test(txt('#e4Key')) && /2\. \(a\) Understood/.test(txt('#e4Key')) && /3\. \(b\) Missed/.test(txt('#e4Key')) && /4\. \(c\) My package failed them/.test(txt('#e4Key')) && /5\. \(a\) Understood/.test(txt('#e4Key')) && /Two understood, one missed, two the package never said\./.test(txt('#e4Key')),
    'E4-063', 'the key opens with all five answers in order and the tally line');
  say((txt('#e4Key').match(/✓/g) || []).length === 3 && (txt('#e4Key').match(/✗/g) || []).length === 2, 'E4-064', 'the key marks the learner\'s three right and two wrong calls');
  say(binCounts.map((c) => c.textContent).join('/') === '2/1/2' && segs.every((s) => /sE4-seg on [abc]/.test(s.getAttribute('class'))) && $$('#e4Fig .sE4-pip').filter((p) => /ok|bad/.test(p.getAttribute('class'))).length === 5,
    'E4-065', 'all five segments lit, bins 2/1/2, five pips placed');
  say(/5 of 5 called\. Understood 2, missed 1, package gap 2\. Elapsed 2:00 of 2:00\./.test(svg.getAttribute('aria-label')) && txt('#e4Tally').trim() === '5 of 5 called · 3 right', 'E4-066', 'the aria-label and the tally read the final state');
  await wait(900);
  say(/rotate\(360 180 106\)/.test($('#e4Fig .sE4-handg').getAttribute('transform')) && txt('#e4Fig .sE4-el').trim() === '2:00', 'E4-067', 'the hand completes the two minutes');
  click(NX); click(btn('b'));
  say(txt('#e4N').trim() === '5' && binCounts.map((c) => c.textContent).join('/') === '2/1/2' && txt('#e4Tally').trim() === '5 of 5 called · 3 right', 'E4-068', 'clicks after the end change nothing');

  /* statics, chips, dashes, forbidden words */
  const secTxt = txt('#sE4');
  say($$('#sE4 ul.pts li').length === 3 && /Three truths, one order\./.test(txt('#sE4 ul.pts')) && /The gap belongs to the package\./.test(txt('#sE4 ul.pts')) && /Adopt the good change\./.test(txt('#sE4 ul.pts')), 'E4-070', 'three bullets with the spec\'s leads');
  say(/The five sentences and the calls are constructed for this lesson/.test(txt('#sE4 p.src')) && $('#sE4 p.src .conf.l[data-src="src-case"]'), 'E4-071', 'the source line says the material is constructed, chipped L');
  const chips = $$('#sE4 .conf[data-src]');
  say(chips.length >= 1 && chips.every((c) => ALLOWED.includes(c.getAttribute('data-src'))), 'E4-072', 'every confidence chip (' + chips.length + ') resolves to an allowed key');
  say($$('#sE4 .sim').length === 1 && /Simulated for this lesson/.test(txt('#sE4 .sim')), 'E4-073', 'one Simulated label, no more');
  const outer = sec.outerHTML;
  say(!/—|&mdash;|–|&ndash;/.test(outer), 'E4-074', 'no em dash or en dash in the section');
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric|canvas|the instructor|before Session 5)\b/i.test(secTxt) && !/today's class|percent of the grade/i.test(secTxt), 'E4-075', 'no forbidden course-policy words in the learner-facing text');
  say(!/\b(undefined|NaN)\b/.test(secTxt) && !/\b(undefined|NaN)\b/.test(svg.getAttribute('aria-label')) && !/\b(undefined|NaN)\b/.test(outer), 'E4-076', 'no "undefined" or "NaN" anywhere in the section after every control was used');
  say($$('#sE4 button').every((b) => b.getAttribute('type') === 'button') && $$('#sE4 [onclick], #sE4 a[href^="#"], #sE4 div[tabindex], #sE4 span[tabindex]').length === 0, 'E4-077', 'every button is type=button and nothing else pretends to be clickable');
  say($$('#sE4 [data-gate]').length === 1 && $$('#sE4 .mpanel').length === 2, 'E4-078', 'one gate, two mpanels (the readout and the key)');
  say(errs.length === 0, 'E4-079', 'zero window errors after the full happy path' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 2: the instructor override on a fresh page ================= */
{
  const { w, d, errs, $, $$, txt, vis } = load();
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(d.body.classList.contains('reveal'), 'E4-080', 'Shift+U turns the override on');
  say($('#sE4 .check[data-gate="ga4"]').classList.contains('done'), 'E4-081', 'Shift+U ticks the gate');
  say(vis($('#e4Key')) && /5\. \(a\) Understood/.test(txt('#e4Key')) && /The key called all five\./.test(txt('#e4Key')) && !/✓|✗/.test(txt('#e4Key')), 'E4-082', 'Shift+U opens the key with all five answers and no learner marks');
  const cl = $$('#e4Fig .sE4-seg').map((s) => s.getAttribute('class'));
  say(cl.join('|') === 'sE4-seg on c|sE4-seg on a|sE4-seg on b|sE4-seg on c|sE4-seg on a', 'E4-083', 'Shift+U lights all five segments in the colour of their truths');
  say($$('#e4Fig .sE4-bc').map((c) => c.textContent).join('/') === '2/1/2' && /rotate\(360 180 106\)/.test($('#e4Fig .sE4-handg').getAttribute('transform')) && txt('#e4Fig .sE4-el').trim() === '2:00',
    'E4-084', 'under the override the bins read 2/1/2 and the hand lands at 2:00 at once');
  say(txt('#e4Out').indexOf(CLOSE) >= 0 && /The key called all five\./.test(txt('#e4Out')) && txt('#e4N').trim() === '5', 'E4-085', 'the readout reaches the closing sentence');
  say($$('#e4Calls button').every((b) => b.disabled) && !vis($('#e4Next')), 'E4-086', 'the calls are locked and Next is hidden');
  say($$('#e4Fig .sE4-mk').map((m) => m.textContent).join('') === '·····' && $$('#e4Fig .sE4-mk').every((m) => /sE4-mk show key/.test(m.getAttribute('class'))), 'E4-086b', 'the override marks every segment with a neutral dot, never a tick');
  say(!/\b(undefined|NaN)\b/.test(txt('#sE4')), 'E4-087', 'no undefined or NaN under the override');
  say(errs.length === 0, 'E4-088', 'zero window errors under the override' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 3: reduced motion, then the override mid-way ================= */
{
  const { w, d, errs, $, $$, txt, click, btn } = load({ reduced: true });
  click(btn('c'));
  say(/rotate\(72 180 106\)/.test($('#e4Fig .sE4-handg').getAttribute('transform')) && txt('#e4Fig .sE4-el').trim() === '0:24', 'E4-090', 'with reduced motion the hand jumps to 0:24 at once');
  say(/sE4-pip sE4-pop ok c/.test($$('#e4Fig .sE4-pip')[10].getAttribute('class')), 'E4-091', 'a right first call drops a filled pip in the Package gap bin');
  click($('#e4Next')); click(btn('b'));
  say(txt('#e4Tally').trim() === '2 of 5 called · 1 right', 'E4-092', 'two called, one right, before the override');
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  const k = txt('#e4Key');
  say($('#sE4 .check[data-gate="ga4"]').classList.contains('done') && /You called 2 yourself · 1 right\./.test(k) && (k.match(/✓/g) || []).length === 1 && (k.match(/✗/g) || []).length === 1,
    'E4-093', 'the override finishes the rest and the key keeps the learner\'s two calls');
  say($$('#e4Fig .sE4-bc').map((c) => c.textContent).join('/') === '2/1/2' && $$('#e4Fig .sE4-mk').map((m) => m.textContent).join('') === '✓✗···', 'E4-094', 'the bins still total 2/1/2; the learner\'s two calls carry tick and cross, the key\'s three a dot');
  say($$('#e4Fig .sE4-pip').filter((p) => /sE4-pip key [abc]/.test(p.getAttribute('class'))).length === 3 && $$('#e4Fig .sE4-pip').filter((p) => / ok /.test(p.getAttribute('class') + ' ')).length === 1 && $$('#e4Fig .sE4-pip').filter((p) => / bad /.test(p.getAttribute('class') + ' ')).length === 1,
    'E4-094b', 'pips: one filled right, one dashed wrong, three outlined key');
  say(errs.length === 0, 'E4-095', 'zero window errors under reduced motion' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 4: the untouched page stays clean ================= */
{
  const { errs, txt } = load();
  say(!/\b(undefined|NaN)\b/.test(txt('#sE4')), 'E4-096', 'the untouched section prints no undefined or NaN');
  say(errs.length === 0, 'E4-097', 'zero errors on the untouched page');
}

console.log(`\n${n} assertions, ${fails} failed`);
process.exit(fails ? 1 : 0);
