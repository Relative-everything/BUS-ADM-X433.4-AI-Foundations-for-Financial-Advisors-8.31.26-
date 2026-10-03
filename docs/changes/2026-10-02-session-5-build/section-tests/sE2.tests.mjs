#!/usr/bin/env node
/* sE2.tests.mjs <assembled page>: jsdom assertions for Session 5 Appendix E2, in the shape of
   Session 4's docs/changes/2026-09-28-session-4-notes/checks.mjs. Exit 1 on any fail.
   Run: NODE_PATH=$(npm root -g) node sE2.tests.mjs /tmp/sE2-test.html */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM, VirtualConsole } = require('jsdom');
const file = process.argv[2] || 'session-5/index.html';
const html = readFileSync(file, 'utf8');
/* the shared inputs, read out of the page's own script block (it sits inside the page's IIFE, so it is not on window) */
const SHARED_INPUTS = (() => {
  const start = html.indexOf('var S5PKG='), fx = html.indexOf('var S5FIXES=', start), end = html.indexOf('];', fx) + 2;
  if (start < 0 || fx < 0 || end < 2) return [];
  try { return new Function(html.slice(start, end) + '\nreturn S5INPUTS;')(); } catch (e) { return []; }
})();
const ALLOWED = ['src-anthropic-deprecations', 'src-case'];
let fails = 0, n = 0;
const say = (ok, id, s) => { n++; if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function load(opts = {}) {
  const errs = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errs.push('jsdomError: ' + (e && e.message || e)));
  vc.on('warn', (...a) => { const s = a.join(' '); if (/section sE2 failed|widget error contained/.test(s)) errs.push('warn: ' + s); });
  vc.on('error', (...a) => errs.push('console.error: ' + a.join(' ')));
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(win) { if (opts.reduced) win.matchMedia = () => ({ matches: true, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }); } });
  const w = dom.window, d = w.document;
  w.addEventListener('error', (e) => errs.push('window error: ' + (e.message || e)));
  let copied = '';
  Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: (t) => { copied = t; return Promise.resolve(); } }, configurable: true });
  return { w, d, errs, copied: () => copied,
    $: (s) => d.querySelector(s),
    $$: (s) => [...d.querySelectorAll(s)],
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ') : ''),
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })),
    vis: (el) => !!el && !el.hidden && el.style.display !== 'none',
    cls: (el) => (el ? el.getAttribute('class') || '' : '') };
}
const card = ($$, k) => $$('#e2Models button').find((b) => b.getAttribute('data-k') === k);
const shipBtn = ($$, k) => $$('#e2Ship button').find((b) => b.getAttribute('data-k') === k);
const slotState = ($$, cls) => ({
  rects: $$('#e2Fig svg .sE2-slot').map((r) => cls(r)),
  glyphs: $$('#e2Fig svg .sE2-glyph').map((t) => t.textContent),
  words: $$('#e2Fig svg .sE2-sword').map((t) => t.textContent) });

/* ================= run 1: the happy path, with reduced motion so every run lands at once ================= */
{
  const { d, errs, $, $$, txt, click, vis, cls, copied } = load({ reduced: true });
  say(errs.length === 0, 'E2-001', 'the page loads with zero window errors' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
  const sec = $('#sE2');
  say(!!sec && sec.classList.contains('slide') && sec.classList.contains('apx') && sec.getAttribute('data-nav') === 'E2 · The test set' && sec.getAttribute('data-insert-after') === 's1' && sec.getAttribute('data-tier') === 'standard',
    'E2-002', 'section #sE2 is an appendix slide, data-nav "E2 · The test set", after s1, tier standard');
  say(/E2 · Swap the Model, Keep the Test Set/.test(txt('#sE2 .apxstub b')) && /14 min · standard/.test(txt('#sE2 .apxstub span')), 'E2-003', 'the APXSTUB line carries the title, 14 min and standard');
  say(/Appendix E2 · Maintenance/.test(txt('#sE2 .eyebrow')) && /14 min/.test(txt('#sE2 .eyebrow .mins')) && txt('#sE2 h2') === 'Swap the Model, Keep the Test Set', 'E2-004', 'eyebrow, minutes and title as the spec says');
  const big = txt('#sE2 p.big').trim();
  say(/^When the model changes, the only thing that tells you whether the answers changed is a set of inputs you already know the right answers to\.$/.test(big) && big.split(/\s+/).length < 30, 'E2-005', 'the thesis line is the spec\'s and under 30 words (' + big.split(/\s+/).length + ')');
  const roots = $$('#sE2 [data-task]');
  say(roots.length === 1 && roots[0].getAttribute('data-task') === 't-sE2' && roots[0].getAttribute('data-comp') === 'pipeline-lab', 'E2-006', 'exactly one data-task root, t-sE2, family pipeline-lab');
  say(/Do this now: 6 minutes/.test(txt('#sE2 .panel[data-task] .do')) && txt('#sE2 .panel[data-task] h4') === 'Five Inputs, Three Models' && /Pick the model, run the set\. A tick means the brief matched what the set says it should\./.test(txt('#sE2 .panel[data-task] .hint')),
    'E2-007', 'the lab carries its Do-this-now line, heading and hint');
  const sims = $$('#sE2 .sim');
  say(sims.length === 1 && /Simulated for this lesson/.test(sims[0].textContent) && sims[0].querySelector('.conf.l[data-src="src-case"]'), 'E2-008', 'the .sim label is present exactly once, with its L chip');

  /* the cards and the figure at load */
  const cards = $$('#e2Models button');
  say(cards.length === 3 && cards.every((b) => b.type === 'button' && b.classList.contains('sel')) && cards.map((b) => b.querySelector('.sE2-mname').textContent).join('|') === 'The model it was built on|Its replacement|The next one',
    'E2-010', 'three model cards, btn sel, labelled as the spec says');
  say(card($$, 'base').classList.contains('act') && card($$, 'base').getAttribute('aria-pressed') === 'true' && card($$, 'next').getAttribute('aria-pressed') === 'false' && cards.every((b) => /not run yet/.test(b.querySelector('.sE2-mscore').textContent)),
    'E2-011', 'the built-on model starts selected (aria-pressed); every card reads "not run yet"');
  const svg = $('#e2Fig svg');
  say(!!svg && svg.getAttribute('viewBox') === '0 0 560 300' && svg.getAttribute('role') === 'img' && /Test set/.test(svg.getAttribute('aria-label')) && /Not run/.test(svg.getAttribute('aria-label')),
    'E2-012', 'the figure is one 560 by 300 viewBox SVG, role img, with an aria-label that says it has not run');
  say($$('#e2Fig svg .sE2-tile').length === 5 && $$('#e2Fig svg .sE2-slot').length === 5 && $$('#e2Fig svg .sE2-tok').length === 5 && $$('#e2Fig svg .sE2-box').length === 1,
    'E2-013', 'five input tiles, one model box, five result slots and five tokens');
  const svgTxt = svg.textContent;
  const inputs = (SHARED_INPUTS || []).filter((r) => ['in1', 'in2', 'in4', 'in5', 'in6'].includes(r.id));
  const nameWords = inputs.map((r) => r.n.split(/\s+/).slice(0, 3).join(' '));
  say(inputs.length === 5 && nameWords.every((wd) => svgTxt.indexOf(wd) >= 0) && !/1,900 words/.test(svgTxt), 'E2-014', 'the five tile names come from S5INPUTS (in1, in2, in4, in5, in6; in3 absent)');
  say(/three-heading brief under/.test(svgTxt) && /NOT IN NOTE where the value/.test(svgTxt) && /CONFLICT heading quoting/.test(svgTxt) && /no eight-digit/.test(svgTxt) && /bullets, not a table/.test(svgTxt),
    'E2-015', 'the five expected lines sit under the slots');
  say(/The model it was/.test(svgTxt) && /built on/.test(svgTxt) && txt('#e2Fig .sE2-bscore') === '? of 5' && /pre/.test(cls($('#e2Fig .sE2-bscore'))), 'E2-016', 'the box names the selected model and the scoreboard reads "? of 5"');
  const s0 = slotState($$, cls);
  say(s0.glyphs.every((g) => g === '?') && s0.words.every((wd) => wd === 'SHOULD RETURN') && s0.rects.every((c) => c === 'sE2-slot'), 'E2-017', 'every slot starts pending: "?" and SHOULD RETURN');
  const fix = $('#e2Fix'), ship = $('#e2Ship'), run = $('#e2Run'), out = $('#e2Out'), gate = $('#sE2 .check[data-gate="ga2"]');
  say(!vis(fix) && !vis(ship) && !!gate && !gate.classList.contains('done') && !run.disabled, 'E2-018', 'the fix and the decision row are hidden; the gate ga2 is open; Run is live');
  say(/The model it was built on is selected/.test(txt('#e2Out')) && !out.classList.contains('has'), 'E2-019', 'the readout waits for the first run');
  say($('#e2Fig .sE2-pill') && /gone/.test(cls($('#e2Fig .sE2-pill'))) && /gone/.test(cls($('#e2Fig .sE2-stamp'))), 'E2-020', 'the format-line pill and the decision stamp are hidden at load');

  /* clicks before any run must do nothing */
  click(shipBtn($$, 'ship')); click(fix);
  say(txt('#e2Verdict') === '' && !vis(ship) && !vis(fix) && !fix.classList.contains('done'), 'E2-021', 'Ship it and the fix do nothing before a run');

  /* run 1: the built-on model */
  click(run);
  say(txt('#e2Fig .sE2-bscore') === '5 of 5' && /ok/.test(cls($('#e2Fig .sE2-bscore'))) && /ok/.test(cls($('#e2Fig .sE2-box'))) && txt('#e2Fig .sE2-blab') !== '', 'E2-030', 'built-on model: the scoreboard reads "5 of 5" in the pass state');
  const s1 = slotState($$, cls);
  say(s1.glyphs.every((g) => g === '✓') && s1.words.every((wd) => wd === 'PASS') && s1.rects.every((c) => c === 'sE2-slot ok'), 'E2-031', 'all five slots stamp a tick and PASS');
  say($$('#e2Fig svg .sE2-tok').every((t) => /gone/.test(cls(t))), 'E2-032', 'every token has landed and is hidden');
  say(gate.classList.contains('done') && gate.querySelector('.mk').textContent === '✓', 'E2-033', 'the gate ga2 ticks on the first completed run');
  say(out.classList.contains('has') && /Run 1 · The model it was built on · 5 of 5 passed/.test(txt('#e2Out')) && $$('#e2Out .sE2-lines li').length === 5 && $$('#e2Out .sE2-lines li').every((li) => /Should return:/.test(li.textContent) && /It did\./.test(li.textContent)),
    'E2-034', 'the readout lists five per-case result lines, each passed');
  say(vis(ship) && !vis(fix) && /✓ 5 of 5/.test(card($$, 'base').querySelector('.sE2-mscore').textContent) && run.textContent === 'Run the set again', 'E2-035', 'after a clean run: the decision row shows, no fix, the card keeps "5 of 5"');
  say(/passed 5 of 5/.test(svg.getAttribute('aria-label')), 'E2-036', 'the aria-label follows the run');

  /* ship on 5 of 5 */
  click(shipBtn($$, 'ship'));
  say(txt('#e2Verdict') === '✓ Right. Write the model and the date in the record.' && $('#e2Verdict').classList.contains('ok'), 'E2-040', 'Ship it on 5 of 5: "Right. Write the model and the date in the record."');
  say(shipBtn($$, 'ship').getAttribute('aria-pressed') === 'true' && shipBtn($$, 'ship').disabled && shipBtn($$, 'hold').disabled && shipBtn($$, 'hold').getAttribute('aria-disabled') === 'true', 'E2-041', 'the call locks: aria-pressed on the pick, both buttons disabled');
  say(txt('#e2Fig .sE2-stamp') === 'SHIPPED' && cls($('#e2Fig .sE2-stamp')) === 'sE2-stamp ok' && cls($('#e2Fig .sE2-stampbox')) === 'sE2-stampbox ok', 'E2-042', 'the figure stamps SHIPPED in the pass state');
  click(shipBtn($$, 'hold'));
  say(txt('#e2Verdict') === '✓ Right. Write the model and the date in the record.', 'E2-043', 'a second call on the same run is ignored');

  /* pick the replacement */
  click(card($$, 'next'));
  say(card($$, 'next').classList.contains('act') && card($$, 'next').getAttribute('aria-pressed') === 'true' && card($$, 'base').getAttribute('aria-pressed') === 'false', 'E2-050', 'Its replacement selects; the built-on card releases');
  say(/Its replacement/.test(svg.textContent) && !/built on/.test(svg.textContent) && txt('#e2Fig .sE2-bscore') === '? of 5' && cls($('#e2Fig .sE2-box')) === 'sE2-box', 'E2-051', 'the box renames to Its replacement and the scoreboard resets');
  const s2 = slotState($$, cls);
  say(s2.glyphs.every((g) => g === '?') && s2.words.every((wd) => wd === 'SHOULD RETURN') && !vis(ship) && txt('#e2Verdict') === '' && /gone/.test(cls($('#e2Fig .sE2-stamp'))), 'E2-052', 'the slots clear, the decision row hides, the stamp lifts');
  say(/Its replacement is selected\. Press Run the set\. Each card keeps its last score\./.test(txt('#e2Out')) && /✓ 5 of 5/.test(card($$, 'base').querySelector('.sE2-mscore').textContent), 'E2-053', 'the readout says what to do and the built-on card still shows its score');

  /* run 2: the replacement fails input 5 */
  click(run);
  say(txt('#e2Fig .sE2-bscore') === '4 of 5' && /bad/.test(cls($('#e2Fig .sE2-bscore'))) && /bad/.test(cls($('#e2Fig .sE2-box'))), 'E2-060', 'replacement: the scoreboard reads "4 of 5" in the fail state');
  const s3 = slotState($$, cls);
  say(s3.glyphs.join('') === '✓✓✓✓✗' && s3.words.join(',') === 'PASS,PASS,PASS,PASS,FAIL' && s3.rects[4] === 'sE2-slot bad' && s3.rects.slice(0, 4).every((c) => c === 'sE2-slot ok'), 'E2-061', 'in6 (slot 5) is marked ✗ FAIL; the other four pass');
  say(/Run 2 · Its replacement · 4 of 5 passed/.test(txt('#e2Out')) && /5\. The same facts as a two-column table instead of prose/.test(txt('#e2Out')) && /It came back as a table\./.test(txt('#e2Out')) && /One answer changed\./.test(txt('#e2Out')) && /only the test set saw it/.test(txt('#e2Out')),
    'E2-062', 'the readout names input 5, "came back as a table", and that only the test set saw it');
  say(vis(fix) && !fix.disabled && fix.textContent === 'Add to the format line: bullets, never a table' && vis(ship), 'E2-063', 'the one-line fix button appears after the failed run; the decision row shows');
  say(/✗ 4 of 5/.test(card($$, 'next').querySelector('.sE2-mscore').textContent) && /Failed: input 5 \(came back as a table\)/.test(svg.getAttribute('aria-label')), 'E2-064', 'the replacement card reads "✗ 4 of 5"; the aria-label names the failure');

  /* ship on 4 of 5 */
  click(shipBtn($$, 'ship'));
  say(txt('#e2Verdict') === '✗ Held would have been right: one answer changed and only the test set saw it.' && $('#e2Verdict').classList.contains('bad'), 'E2-070', 'Ship it on 4 of 5: "Held would have been right: one answer changed and only the test set saw it."');
  say(txt('#e2Fig .sE2-stamp') === 'SHIPPED' && cls($('#e2Fig .sE2-stamp')) === 'sE2-stamp bad' && /SHIPPED · Held would have been right/.test(txt('#e2Out')), 'E2-071', 'the figure stamps SHIPPED in the fail state and the readout records the call');

  /* the fix */
  click(fix);
  say(fix.disabled && fix.classList.contains('done') && fix.getAttribute('aria-disabled') === 'true' && /Added to the format line: bullets, never a table/.test(fix.textContent), 'E2-080', 'the fix locks and says it was added');
  say(cls($('#e2Fig .sE2-pill')) === 'sE2-pill' && /FORMAT LINE \+/.test(svg.textContent) && /bullets, never a table/.test(svg.textContent), 'E2-081', 'the format-line pill appears on the figure');
  const s4 = slotState($$, cls);
  say(s4.glyphs.every((g) => g === '?') && s4.words.every((wd) => wd === 'RE-RUN') && txt('#e2Fig .sE2-bscore') === '? of 5' && /RE-RUN THE SET/.test(svg.textContent), 'E2-082', 'every slot flips to RE-RUN and the scoreboard resets: the prompt changed');
  say(!vis(ship) && txt('#e2Verdict') === '' && /The format line now ends: bullets, never a table/.test(txt('#e2Out')) && /whole set runs again/.test(txt('#e2Out')), 'E2-083', 'the decision row hides and the readout explains the re-run');
  say(/✗ 4 of 5 before the fix/.test(card($$, 'next').querySelector('.sE2-mscore').textContent) && /✓ 5 of 5/.test(card($$, 'base').querySelector('.sE2-mscore').textContent), 'E2-084', 'the replacement card marks its score as before the fix; the built-on card keeps its 5 of 5');
  click(fix);
  say(/Added to the format line/.test(fix.textContent) && fix.disabled, 'E2-085', 'a second click on the fix changes nothing');

  /* run 3: the replacement after the fix */
  click(run);
  say(txt('#e2Fig .sE2-bscore') === '5 of 5' && /ok/.test(cls($('#e2Fig .sE2-bscore'))), 'E2-090', 'after the fix, the replacement passes 5 of 5');
  const s5 = slotState($$, cls);
  say(s5.glyphs.every((g) => g === '✓') && s5.words.every((wd) => wd === 'PASS'), 'E2-091', 'all five slots pass');
  say(/Run 3 · Its replacement · 5 of 5 passed/.test(txt('#e2Out')) && /All five matched after the fix\./.test(txt('#e2Out')) && /✓ 5 of 5/.test(card($$, 'next').querySelector('.sE2-mscore').textContent), 'E2-092', 'the readout says all five matched after the fix; the card updates');

  /* hold on 5 of 5 */
  click(shipBtn($$, 'hold'));
  say(txt('#e2Verdict') === '✓ You may: a second run on a new input is never wasted.' && $('#e2Verdict').classList.contains('mid') && txt('#e2Fig .sE2-stamp') === 'HELD' && cls($('#e2Fig .sE2-stamp')) === 'sE2-stamp mid',
    'E2-100', 'Hold it on 5 of 5: "You may: a second run on a new input is never wasted." with a HELD stamp');

  /* the next one, after the fix, also passes */
  click(card($$, 'next2'));
  say(/The next one/.test(svg.textContent) && txt('#e2Fig .sE2-bscore') === '? of 5', 'E2-110', 'The next one selects and the box renames');
  click(run);
  say(txt('#e2Fig .sE2-bscore') === '5 of 5' && /Run 4 · The next one · 5 of 5 passed/.test(txt('#e2Out')), 'E2-111', 'the next one passes 5 of 5 after the fix');

  /* beat 2: copy the template */
  const tpl = txt('#e2Tpl');
  say($('#e2Tpl') && $('#e2Tpl').textContent.split('\n').length === 5 && (tpl.match(/Input: ____ \| Should return: ____ \| Model and date: ____ \| Result: ____/g) || []).length === 5, 'E2-120', 'the template shows five rows on the page');
  click($('#e2Copy'));
  const rows = copied().split('\n');
  say(rows.length === 5 && rows.every((r) => r === 'Input: ____ | Should return: ____ | Model and date: ____ | Result: ____'), 'E2-121', 'Copy produces exactly five template rows');

  /* chips, dashes, forbidden words, bullets, source, gate */
  const secTxt = txt('#sE2');
  const outer = sec.outerHTML;
  say(!/—|&mdash;|–|&ndash;/.test(outer), 'E2-130', 'no em dash or en dash in the section');
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric|canvas|the instructor|before Session 5)\b/i.test(secTxt), 'E2-131', 'no forbidden course-policy words in the learner-facing text');
  const chips = $$('#sE2 .conf[data-src]');
  say(chips.length === 4 && chips.every((c) => ALLOWED.includes(c.getAttribute('data-src'))) && chips.filter((c) => c.getAttribute('data-src') === 'src-anthropic-deprecations').length === 2 && chips.filter((c) => c.getAttribute('data-src') === 'src-case').length === 2,
    'E2-132', 'four confidence chips, all on allowed keys: two deprecations H, two case L');
  const pts = $$('#sE2 ul.pts li');
  say(pts.length === 3 && /Anthropic’s own advice\./.test(pts[0].textContent) && /consider thorough testing of your applications with the new models well before the retirement date/.test(pts[0].textContent) && /A test set is five inputs you already know the answer to\./.test(pts[1].textContent) && /Same prompt, new model, different answer/.test(pts[2].textContent),
    'E2-133', 'three bullets with the spec\'s leads and the quoted advice');
  say(/Anthropic, Model deprecations, platform\.claude\.com, opened 2 October 2026: the testing advice/.test(txt('#sE2 p.src')) && /simulated for this lesson: no model runs here/.test(txt('#sE2 p.src')), 'E2-134', 'the source line names the deprecations page and says the runs are simulated');
  say(/Run the set on at least one model and decide: ship or hold\./.test(txt('#sE2 .check .ct')), 'E2-135', 'the gate text is the spec\'s');
  const staticTxt = ['#sE2 .eyebrow', '#sE2 h2', '#sE2 p.big', '#sE2 .panel[data-task] h4', '#sE2 .panel[data-task] .hint', '#sE2 .sim', '#sE2 .panel:not([data-task]) h4', '#sE2 .panel:not([data-task]) .hint', '#sE2 ul.pts', '#sE2 p.src', '#sE2 .check'].map(txt).join(' ');
  const staticWords = (staticTxt.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length;
  say(staticWords < 180, 'E2-136', 'static prose outside the interactions is under 180 words (' + staticWords + ')');
  say(!/\b(undefined|NaN)\b/.test(secTxt) && !/\b(undefined|NaN)\b/.test(svg.getAttribute('aria-label')) && !/\b(undefined|NaN)\b/.test(outer), 'E2-137', 'no "undefined" or "NaN" anywhere in the section after every control was used');
  const clickables = $$('#sE2 [onclick], #sE2 .btn, #sE2 button');
  say(clickables.every((b) => b.tagName === 'BUTTON' && b.getAttribute('type') === 'button'), 'E2-138', 'every clickable thing is a <button type="button"> (' + clickables.length + ')');
  say($('#e2Out').getAttribute('aria-live') === 'polite' && $('#e2Verdict').getAttribute('aria-live') === 'polite' && $('#e2CopyMsg').getAttribute('aria-live') === 'polite', 'E2-139', 'the readout, the verdict and the copy message are aria-live');
  say(errs.length === 0, 'E2-140', 'zero window errors after the full happy path' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

/* ================= run 2: real motion, the hold-on-4-of-5 branch, the next one before the fix ================= */
await (async () => {
  const { d, errs, $, $$, txt, click, vis, cls } = load();
  const run = $('#e2Run'), svg = $('#e2Fig svg'), gate = $('#sE2 .check[data-gate="ga2"]');
  click(card($$, 'next2'));
  click(run);
  say(run.disabled && card($$, 'next').disabled && /live/.test(cls($('#e2Fig .sE2-box'))) && /RUNNING/.test(svg.textContent) && /Running/.test(txt('#e2Out')) && !gate.classList.contains('done'),
    'E2-200', 'with motion on, Run locks the controls, lights the box and says RUNNING; the gate waits');
  click(run); click(card($$, 'base'));
  say(run.disabled && card($$, 'next2').classList.contains('act'), 'E2-201', 'clicks during the run are ignored');
  await wait(2200);
  say(!run.disabled && txt('#e2Fig .sE2-bscore') === '4 of 5' && slotState($$, cls).glyphs.join('') === '✓✓✓✓✗' && gate.classList.contains('done'), 'E2-202', 'the animated run lands: the next one, before the fix, fails input 5 the same way; the gate ticks');
  say($$('#e2Fig svg .sE2-tok').every((t) => /gone/.test(cls(t))) && $$('#e2Fig svg .sE2-tile').every((t) => cls(t) === 'sE2-tile') && !/live/.test(cls($('#e2Fig .sE2-box'))), 'E2-203', 'tokens, tiles and the box settle after the animation');
  click(shipBtn($$, 'hold'));
  say(txt('#e2Verdict') === '✓ Right. Fix the format line, re-run, then ship.' && $('#e2Verdict').classList.contains('ok') && txt('#e2Fig .sE2-stamp') === 'HELD' && cls($('#e2Fig .sE2-stamp')) === 'sE2-stamp ok',
    'E2-204', 'Hold it on 4 of 5: "Right. Fix the format line, re-run, then ship." with a HELD stamp');
  click($('#e2Fix'));
  click(run);
  const mid = $$('#e2Fig svg .sE2-tok').some((t) => !/gone/.test(cls(t)));
  await wait(2200);
  say(txt('#e2Fig .sE2-bscore') === '5 of 5' && /Run 2 · The next one · 5 of 5 passed/.test(txt('#e2Out')), 'E2-205', 'after the fix, the animated re-run of the next one passes 5 of 5' + (mid ? '' : ' (tokens were not seen mid-flight)'));
  say(errs.length === 0, 'E2-206', 'zero window errors with motion on' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
})();

/* ================= run 3: Shift+U reaches the final state through REVEALS ================= */
{
  const { w, d, errs, $, $$, txt, cls } = load({ reduced: true });
  d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  const svg = $('#e2Fig svg');
  say($('#sE2 .check[data-gate="ga2"]').classList.contains('done'), 'E2-300', 'Shift+U ticks the gate');
  say(card($$, 'next').classList.contains('act') && /Its replacement/.test(svg.textContent) && txt('#e2Fig .sE2-bscore') === '5 of 5' && cls($('#e2Fig .sE2-pill')) === 'sE2-pill' && $('#e2Fix').classList.contains('done'),
    'E2-301', 'the override selects the replacement, applies the fix and lands on 5 of 5 with the pill shown');
  say(txt('#e2Verdict') === '✓ Right. Write the model and the date in the record.' && txt('#e2Fig .sE2-stamp') === 'SHIPPED' && /Run 2 · Its replacement · 5 of 5 passed/.test(txt('#e2Out')) && /✗ 4 of 5 before the fix|✓ 5 of 5/.test(card($$, 'next').querySelector('.sE2-mscore').textContent),
    'E2-302', 'the override chooses Ship and the verdict, the stamp and the readout show the final state');
  say(!/\b(undefined|NaN)\b/.test(txt('#sE2')) && errs.length === 0, 'E2-303', 'no undefined/NaN and zero window errors after the override' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
}

console.log(`\n${n} assertions, ${fails} failure(s)`);
process.exit(fails ? 1 : 0);
