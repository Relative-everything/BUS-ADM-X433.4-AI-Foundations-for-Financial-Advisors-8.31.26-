#!/usr/bin/env node
/* One DOM assertion per ledger row a DOM check can prove. Run from the repo
   root with NODE_PATH at a node_modules holding jsdom:
   node docs/changes/2026-09-25-session-4-polish/checks.mjs */
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
const key = (el, k) => el && el.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true }));
const done = (g) => $('[data-gate="' + g + '"]') && $('[data-gate="' + g + '"]').classList.contains('done');
const footer = txt('footer');
let fails = 0;
const say = (ok, id, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };

say(true, 'S4P-001', 'the change folder exists and this file runs');

{ const lis = $$('ol.srcs li'), last = lis[lis.length - 1];
  say(last && last.id === 'src-hallowell' && last.classList.contains('fab') && /^Not a real source\. Hallowell v\. Commissioner, T\.C\. Memo\. 2023-217 was invented for the §07 exercise/.test(last.textContent.trim()) && last.dataset.nochip === 'fabricated' && !last.querySelector('.conf'),
    'S4P-002', 'the invented case is set apart after every real source, says so first, and carries no chip'); }
say(!/Does not exist|Used for: exercise material|DATA-PULL|no figure typed|instructor's|this build|in this file/.test(footer) && /Other sessions cite other retrievals of this page/.test(footer),
  'S4P-002', 'no maintainer wording in the footer: no file names, no register notes, no "this build"');
say($$('ol.srcs li').filter((li) => !li.classList.contains('fab')).every((li) => /Used for: .+\((§|Appendix|Appendices)/.test(li.textContent) || li.id === 'src-case'),
  'S4P-002', 'every real source says what it supports and where, in brackets');
say(!/CurXecute/.test(html) && $$('#s5 [data-src="src-cve"]').length === 2 && !$('#src-cve').dataset.nochip && $('#src-cve .conf.h'),
  'S4P-003', 'EchoLeak is chipped to its CVE record; CurXecute is off the page');
say(!/One deliberate fabrication/.test(html) && /taken from a summary of a page that could not be opened directly/.test(footer),
  'S4P-004', 'the footer legend reads to a student; the duplicate fabrication paragraph is gone');

{ const sims = $$('.slide .sim');
  say(sims.length === 1 && sims[0].closest('#sCR') && /gaps on purpose/i.test(sims[0].textContent) && /drawings are illustrative/.test(txt('#sWS .src')) && /simulated for this lesson: no model runs/.test(txt('#s5 .src')),
    'S4P-005', 'one provenance statement per section: the only label left marks the planted gaps; D3 and §05 source lines carry what their labels said'); }
say(/\.slide \.mpanel:has\(> \.nil\)\{background:transparent;min-height:0/.test(html),
  'S4P-006', 'an empty readout drops its box (the CSS rule is present; Playwright measures it)');

{ const s5 = $('#s5'); const before = s5.classList.contains('s5ran');
  click($$('#injPred button')[1]); click($('#injRun'));
  say(!before && s5.classList.contains('s5ran'), 'S4P-007', '§05: the x-ray and the fixes are held back until the assistant has run'); }
{ const ctl = $('#mmCtl'), chk = $('#mmCheck'); const before = ctl.classList.contains('on') || chk.classList.contains('live');
  const g = $('#mmGuess'); g.value = 40; g.dispatchEvent(new w.Event('input')); click($('#mmLock')); click($('#mmRun'));
  say(!before && ctl.classList.contains('on') && chk.classList.contains('live'), 'S4P-007', '§06: rate, length and Check every answer appear after the first run'); }
{ const sec = $('#sRSP'); const before = sec.classList.contains('rspgo'); click($$('#rspList .chip')[2]);
  say(!before && sec.classList.contains('rspgo') && done('ga5'), 'S4P-007', 'D5: the clause step opens once an event is committed'); }
say(/#s1 \.s1act:has\(#s1Binds:disabled\)\{display:none\}/.test(html) && /#s7 #recCite:disabled,#s7 #recAsk:disabled\{display:none\}/.test(html),
  'S4P-007', '§01 and §07: a finale button shows only when it can be pressed');

{ const locks = $$('#vSafe .s4-pl');
  click($$('#vPay button')[2]);
  key(locks[4], 'Enter');
  say(!$('#vTabs') && locks.length === 6 && locks.every((g) => g.getAttribute('role') === 'button' && g.getAttribute('tabindex') === '0') && locks[4].getAttribute('aria-pressed') === 'true' && /^Lock 5, Export/.test(locks[4].getAttribute('aria-label')) && $('#vSafe svg').getAttribute('role') === 'group',
    'S4P-008', '§04: the tab row is gone; the six locks are keyboard buttons, and Enter on lock 5 selects it'); }

{ const st = $$('#crFig .cr-hit');
  key(st[2], 'Enter');
  say(!$('#stuckList') && st.length === 7 && st.every((r) => r.getAttribute('role') === 'button' && r.getAttribute('tabindex') === '0') && /^Station 3, Input: Could not tell what input it expects$/.test(st[2].getAttribute('aria-label')) && st[2].getAttribute('aria-pressed') === 'true' && /Could not tell what input it expects\./.test(txt('#stuckOut')) && done('g9'),
    'S4P-009', '§08: the seven stations are the picker, named by their sentences; the readout leads with the sentence'); }
{ click($$('#mfList .slot')[0]);
  say(!$('#mfLine') && !/off the route|opens/.test(txt('#mfList')) && /A stranger stops first at 2 · Tool\. Fill: setup\./.test(txt('#mfOut')),
    'S4P-009', '§08 Pack yours: no mini route, no route tags; the readout still names the first stop'); }

say(!/Zoom out, then open each stop|What changes, and what never does|or open a lane|in class, use the package|Six records sit in a stack|later picks only move the clock|Test your own draft/.test(html)
  && /Passing one tells you nothing about the other/.test(txt('#sCold')) && /Then test it: could a new hire/.test(txt('#s9 .card')) && $$('#s9 ul.pts').length === 0,
  'S4P-010', 'hints that repeated a control are gone; the cold open bullet and the §09 test are one idea each');
say($$('#costIn .hint').length === 1 && /Keep 90/.test(txt('#costIn .hint')), 'S4P-010', '§06: one slider helper line left, the baseline one');
{ /* D2: take the first sample to bucket 1; the row readouts never end in two full stops */
  click($$('#entList .chip')[0]); click($$('#entBoxes .lbox')[0]);
  say(!/\.\./.test(txt('#entStage')), 'S4P-010', 'D2: no double full stop in the row readouts'); }

{ const r = readFileSync('instructor-notes/session-4.md', 'utf8');
  say(/click it in the safe/.test(r) && /station on the route where they first stopped/.test(r) && /x-ray and the fixes appear/.test(r),
    'S4P-011', 'the run sheet matches the new click paths'); }

/* every gate still flipping from its own interaction is proved by the rebuild's
   checks.mjs, which runs against this page unchanged except S4R-011's picker */

console.log(`\n${fails ? fails + ' failed' : '0 failed'}`);
process.exit(fails ? 1 : 0);
