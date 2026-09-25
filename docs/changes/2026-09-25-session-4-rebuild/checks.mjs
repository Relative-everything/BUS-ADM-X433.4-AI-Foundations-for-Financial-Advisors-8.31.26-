#!/usr/bin/env node
/* One DOM assertion per ledger item. Run from the repo root with NODE_PATH at
   the global npm root: node docs/changes/2026-09-25-session-4-rebuild/checks.mjs */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
const html = readFileSync('session-4/index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true });
const w = dom.window, d = w.document;
const $ = (s) => d.querySelector(s);
const $$ = (s) => [...d.querySelectorAll(s)];
const txt = (s) => ($(s) ? $(s).textContent : '');
const click = (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const done = (g) => $('[data-gate="' + g + '"]') && $('[data-gate="' + g + '"]').classList.contains('done');
const body = html.slice(html.indexOf('<body'))
  .replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ');
const lessonText = body.slice(body.indexOf('Compliance, Security and Responsible Use'));
let fails = 0;
const say = (ok, id, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };

say(true, 'S4R-001', 'the change folder exists and this file runs');
say(!/Two ways through/.test(txt('#paceOut')) && $$('#paceOut .pcell').length === 3 && /Session 4's one thing/.test(txt('#s0')) && /synthetic/.test(txt('#s0')) && !/question that runs through every session|Outcome 01|Part 1 status/.test(txt('#s0')),
  'S4R-002', '§00: timing cells only, the objective, the Coles in two lines labelled synthetic, no case panels or outcome cards');
{ const items = $$('#bridgeQuiz .qitem'); items.forEach((it, i) => click(it.querySelectorAll('button')[[1, 2, 0][i]]));
  say(items.length === 3 && /3 of 3 answered · 3 right/.test(txt('#bridgeScore')) && done('g1'), 'S4R-002', 'bridge: three Session 3 core items, answers b, c, a, gate flips'); }
{ const p = $$('#coldPicks button'); click(p[3]);
  say(p.length === 4 && /5 of 8 present/.test(txt('#coldOut')) && !/Not a good one|Paste your last prompt/.test(txt('#sCold')), 'S4R-003', 'cold open: four prompts, one click, D scores 5 of 8');
  click($('#coldAll')); say(/D\s*5 of 8\s*No\./.test(txt('#coldCmp')) && done('gc'), 'S4R-003', 'compare all four: D is the one you could not send'); }
{ const L = () => $$('#ruleList .chip'), B = () => $$('#ruleBoxes .lbox'); click(L()[0]); click(B()[1]);
  say($$('#ruleBoxes .placed li').length === 1 && /✓/.test(txt('#ruleBoxes .placed li')) && $$('[data-src="src-finra2409"]').length >= 1,
    'S4R-004', '§01: an item lands under its bucket at once with a tick and a why; src-finra2409 is chipped'); }
{ const segs = $$('#redText .seg'); segs.forEach(click);
  say(/No\. Nothing left points to her/.test(txt('#redOut')) && done('g3') && /You met the next one in Session 3/.test(txt('#s2')) && /248\.3/.test(txt('#s2 .src')) && !$('#npiCtrls'),
    'S4R-005', '§02: replacing every identifier takes the meter to No; the re-identification item is a Session 3 callback with its authority'); }
say(!$('#frontierHost') && !$('#divergeHost') && $$('#planBtns button').length === 3 && (click($$('#planBtns button')[0]), /five years/.test(txt('#planOut'))) && done('g4'),
  'S4R-006', '§03: the leaderboard charts are gone; the plan picker drives the retention readout');
{ click($$('#vPay button')[2]); for (let i = 0; i < 6; i++) click($('#vRows button[data-q="' + i + '"][data-v="y"]'));
  const go = /Go to your firm/.test(txt('#vOut')); click($('#vRows button[data-q="3"][data-v="n"]'));
  say(go && /Stop\./.test(txt('#vOut')) && done('g5'), 'S4R-007', '§04: the verdict moves with each answer and the payload sets the bar'); }
{ click($$('#injPred button')[0]); click($('#injRun')); click($('#injShow'));
  say(/I also forwarded 3 files/.test(txt('#injOut')) && /White text on a white background/.test(txt('#injOut')) && done('g6') && !$('#injText'),
    'S4R-008', '§05: predict, run, reveal the hidden line; the free-text scorer is gone'); }
{ const g = $('#mmGuess'); g.value = 40; g.dispatchEvent(new w.Event('input')); click($('#mmLock')); click($('#mmRun'));
  say($$('#mmGrid .mm').length === 100 && /of 100<\/b>|of 100/.test(txt('#mmOut')) && done('g7') && $('#cs_base') && $('#cs_base').value === '90' && /Still saves 51 minutes/.test(txt('#costOut')),
    'S4R-009', '§06: 100 random memos after a locked guess; the price panel defaults to 90 and saves 51'); }
{ const L = () => $$('#recList .chip'), B = () => $$('#recBoxes .lbox'); [1,1,1,1,0,0].forEach((b, i) => { click(L()[i]); click(B()[b]); });
  say(/invented for this exercise/.test(txt('#recKey')) && /you fill in/.test(txt('#recBlock')) && done('g8') && /Hallowell/.test(txt('#s7 .src')),
    'S4R-010', '§07: six records sorted, the invented case named in the key and the source line, the block leaves model and date to you'); }
/* 2026-09-25 polish (S4P): the list of seven sentences left the page; the
   seven stations in the figure are the picker now, named by the same sentences */
{ const s = $$('#crFig .cr-hit'); click(s[5]); click(s[1]);
  say(s[1].classList.contains('act') && !s[5].classList.contains('act') && /Setup gap/i.test(txt('#stuckOut')) && done('g9') && /HANDOFF PACKAGE/.test(txt('#pkgText')) && !/30%/.test(lessonText),
    'S4R-011', '§08: a sample package anyone can run; an earlier pick can replace a later one; no grade weight'); }
{ for (let i = 0; i < 6; i++) click($('#polRows button[data-q="' + i + '"]'));
  click($('#polCopy'));
  say(/FIRM AI USE POLICY/.test(txt('#polOut')) && done('g10') && !/rubric|Peer review, not tonight|Homework/i.test(lessonText),
    'S4R-012', '§09: six clauses assemble an outline; no rubric, homework or in-class peer review language'); }
say(/six days late/.test(html) && !/costs three weeks/.test(html) && !/Click the events in the order/.test(html), 'S4R-013', 'D5: the instructions match the widget and the arithmetic is six days');
{ const L = () => $$('#anonList .chip'), B = () => $$('#anonBoxes .lbox'); ['still','safe','safe','still','safe','still','safe','still'].forEach((k, i) => { click(L()[i]); click(B()[k === 'safe' ? 0 : 1]); });
  say(/8 of 8/.test(txt('#anonKey')) && done('ga6'), 'S4R-014', 'D6: eight replacements sorted, all right'); }
say(/2 August 2026/.test(txt('#sW1')) && !/Anthropic has not announced/.test(html) && $$('[data-src="src-claude-marks"]').length >= 4 && !$('#pfAmp'),
  'S4R-015', 'D1/D2: Claude output is watermarked, sourced to the page that says so; the unsourced amplifier is gone');
{ const items = $$('#staleQuiz .qitem'); const shut = $('#staleKey').style.display === 'none';
  items.forEach((it) => click(it.querySelectorAll('button')[1]));
  say(items.length === 2 && shut && $('#staleKey').style.display === 'block' && done('ga3'), 'S4R-016', 'D3: two claims, the comparison opens only after both are committed'); }
{ click($$('#voteBtns button')[0]); click($('#voteCases')); click($('#voteTwist')); click($$('#revoteBtns button')[2]);
  say(/Moved 2/.test(txt('#revoteOut')) && done('ga4') && !/Session 1 baseline|baseline calculator/.test(html), 'S4R-017', 'D4: vote, both cases, the complication, re-vote; no Session 1 baseline anywhere'); }
say($$('.verify').length === 0 && !/Requires instructor verification|UNCONFIRMED|NEEDS SOURCE/.test(html) && !/\btonight\b/i.test(lessonText) && (html.match(/var NPI\b/g) || []).length === 0 && !/CASE\.md|pedagogy\.md|\.mjs/.test(lessonText),
  'S4R-018', 'page-wide: no verification blocks, no markers, no "tonight", no NPI redeclaration, no file names rendered');
{ const s = readFileSync('SOURCES.md', 'utf8');
  say(['src-claude-marks', 'src-cfp-genai', 'src-cfp-code', 'src-sec-withdraw'].every((k) => s.includes('## ' + k) && $('#' + k)), 'S4R-019', 'four new source records, each in the footer'); }
say(/window\.__coreMins=67/.test(html) && /Core 67 \+ appendix 83/.test(html), 'S4R-020', 'generated regions: core 67, appendix 83');
{ const b = JSON.parse(readFileSync('scripts/editorial-baseline.json', 'utf8'));
  say(b.A9.files['session-4'].total === 3 && /DW-124/.test(readFileSync('docs/deferred-work.md', 'utf8')), 'S4R-021', 'A9 re-recorded 83 to 3, registered as DW-124'); }
say(/## The clock/.test(readFileSync('instructor-notes/session-4.md', 'utf8')) && /## Verify before teaching/.test(readFileSync('instructor-notes/session-4.md', 'utf8')), 'S4R-022', 'the run sheet has a clock and the verify list');
/* every gate flips on completion; nothing depends on Shift+U. Finish the four
   interactions the rows above did not complete: the rest of the §01 sorter,
   D5, D1 and D2. */
{ const L = () => $$('#ruleList .chip:not(.done)'), B = () => $$('#ruleBoxes .lbox'); while (L().length) { click(L()[0]); click(B()[1]); } }
click($$('#rspList .chip')[1]);
click($('#tsRun')); click($('#tsKeyB')); click($('#tsOff'));
{ const L = () => $$('#entList .chip:not(.done)'), B = () => $$('#entBoxes .lbox'); while (L().length) { click(L()[0]); click(B()[0]); } }
say($$('[data-gate]').filter((g) => !g.classList.contains('done')).length === 0, 'GATES', 'not flipped: ' + ($$('[data-gate]').filter((g) => !g.classList.contains('done')).map((g) => g.dataset.gate).join(' ') || 'none'));
say($$('[data-gate]').every((g) => g.classList.contains('done')), 'ALL', `all ${$$('[data-gate]').length} work-along gates flipped by their interactions`);
say($$('[data-task]').length === 17 && new Set($$('[data-comp]').map((e) => e.dataset.comp)).size === 11, 'V6', '17 interaction roots, 11 component types');
/* ---- the graphic rebuild (S4R-024 onward) ---- */
{ const secs = $$('section.slide').filter((x) => x.id && x.id !== 'apx');
  const withFig = secs.filter((x) => [...x.querySelectorAll('svg')].some((g) => g.getAttribute('aria-label') || g.getAttribute('role') === 'group'));
  say(secs.length === 17 && withFig.length >= 16, 'S4R-024', `every section is a figure: ${withFig.length} of 17 carry a labelled SVG (s9's policy page is HTML)`); }
say([...$$('#bridgeQuiz .qitem')].every((q) => q.querySelectorAll('button[aria-pressed="true"]').length === 1) && [...$$('#bridgeQuiz .qfb')].every((f) => f.getAttribute('aria-live') === 'polite'),
  'S4R-025', 'the recall quiz tells a screen reader which answer locked, and announces its feedback');
say(!/claude-(opus|sonnet|haiku|fable)-\d/i.test(lessonText) && /JetBrains\+Mono:wght@400;500;600;700/.test(html),
  'S4R-026', 'no model identifier typed as lesson content; the mono face loads the weights the stamps use');
{ click($('#s1Binds')); const key = $('#ruleKey'); const was = key && key.style.display === 'block';
  const U = () => d.body.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  U(); U();
  say(was && key.style.display === 'block', 'S4R-027', 'switching the override off keeps an answer key the learner earned'); }

console.log(`\n${fails ? fails + ' failed' : '0 failed'}`);
process.exit(fails ? 1 : 0);
