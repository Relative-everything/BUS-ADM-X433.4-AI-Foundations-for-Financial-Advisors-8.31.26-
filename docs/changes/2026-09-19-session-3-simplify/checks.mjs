#!/usr/bin/env node
/* One DOM assertion per ledger item. Run from the repo root with NODE_PATH at
   the global npm root: node docs/changes/2026-09-19-session-3-simplify/checks.mjs */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
const html = readFileSync('session-3/index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true });
const d = dom.window.document;
const $ = (s) => d.querySelector(s);
const txt = (s) => ($(s) ? $(s).textContent : '');
let fails = 0;
const say = (ok, id, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };

say(true, 'SM-001', 'the change folder exists and this file runs');
say(d.querySelectorAll('.verify').length === 0 && !/Requires instructor verification/.test(html), 'SM-002/003', 'no verification gate is left on the page');
say(!/pedagogy\.md|build-case\.mjs|verify-case\.mjs|CASE\.md/.test(txt('#caseInner p.dim')), 'SM-004', 'the case dialog lede names no file or script');
say(!/CASE\.md|settled here/.test(txt('#s10 .src')), 'SM-006', '§07 source line carries no file name or maintainer aside');
say(!/CASE\.md|lines 3 and 5/.test(txt('#sChk .src')) && /wrong on purpose/.test(txt('#sChk .src')), 'SM-007', 'A3 source line names no file and does not print the answer');
{ const b = $('#voteBtns button'); if (b) b.click(); say(!/minority|room distribution|7 to 9 minutes|yourselves/.test(txt('#s15')), 'SM-008', 'C4 carries no facilitation stage directions'); }
say(!/three decisions|No claim is made|Adviser|then a column/.test(txt('#sOff')) && d.querySelectorAll('#sOff ol li').length === 4 && /Example output under prompt 1/.test(txt('#sOff ol')), 'SM-009', '§08 agrees with its own summary and the silent run has a fallback');
say(d.querySelectorAll('#ppMeet button').length === 3 && !/\[Not included/.test(txt('#sPrep')) && !/your own tool|your next meeting/.test(txt('#sPrep')), 'SM-010', 'A2 offers a non-client meeting and presupposes no tool or meeting');
say(/The Cole file, in four lines/.test(txt('#s1')) && /Nathan/.test(txt('#s1')) && /seed gift/.test(txt('#s1')) && /Grounding:/.test(txt('#s1')), 'SM-011', '§00 carries the four-line Cole panel and names grounding');
say(/also called grounding/.test(txt('#s4')) && /Ten passages/.test(txt('#s4')) && /Preset 1 · What value should we use/.test(txt('#qPresets')) && /selling shares to a trust/.test(txt('#s4 .hint')), 'SM-012', '§03 defines grounding, reconciles nine documents with ten passages, and prints each preset question on its button');
say(!/IDGT|nearly the same person|reaches Meg’s return/.test(html) && /gift tax return/.test(html), 'SM-013', 'the map notes and pair explanations stand on their own');
say(/first seen at an examination/.test(txt('#s9 .hint')) && !/already said/.test(html), 'SM-014', '§06 asks a question with one answer and Prep does not presuppose the §07 excerpt');
{ const b = d.querySelectorAll('#ntStages button'); if (b[0]) b[0].click(); if (b[3]) b[3].click(); say(/Meg and David Cole/.test(txt('#s10')) && /\[01:00\]/.test(txt('#ntStages')) && !/Owner: you/.test(txt('#ntStages')) && /Not in the meeting/.test(txt('#ntStages')) && !/your own tool/.test(txt('[data-gate="g8"]')), 'SM-015', '§07 names the speakers, stamps its transcript, and its follow-up obeys the not-given rule'); }
say(/Suppose your firm/.test(txt('#s12 .hint')) && /son who works/.test(txt('#s12')) && !/split the room|own state's rule/.test(html), 'SM-016', '§09 says who Nathan is and asks nothing the learner cannot answer');
say(!/Meg agreed|counsel gave|your own tool/.test(txt('#s13')) && /Copy the prompt/.test(txt('#copyBtn')) && /Cole review/.test(txt('[data-gate="g10"]')), 'SM-017', '§10 agrees with the meeting record and gives a reader without a meeting something to run the prompt on');
{ const c = $('#ckCopy'); if (c) c.click(); say(!/standing instruction/.test(txt('#ckList')) && $('[data-gate="g12"]').classList.contains('done'), 'SM-018', '§11 checklist speaks plainly and the work-along completes on copy'); }
/* SM-ITEMS */

/* ---- standing invariants carried from the 09-18 checks ---- */
say(d.querySelectorAll('[data-comp]').length === 18, 'V6', `18 interaction roots (found ${d.querySelectorAll('[data-comp]').length})`);
say((html.match(/in chat/g) || []).length === 2, 'FF-032', 'exactly two written moments on the page');
say(/Meg Cole owns/.test(txt('#s1')), 'FF-028', '§00 says who the Coles are');
say(/No client meetings\?/.test(txt('#s9')), 'FF-010', '§06 carries the parallel track');
say(/swap "client"/.test(txt('#s10')), 'FF-011', '§07 says how to adapt the instruction');
say(/meeting you chose/.test(txt('#s16 .hint')), 'FF-012', '§11 hint covers the chosen meeting');
say(/wrote up/.test(txt('[data-gate="g10"]')), 'FF-013', '§10 work-along does not presuppose a client meeting');
say([...d.querySelectorAll('#s1 .plab')].some(e => /Tonight/.test(e.textContent)), 'FF-006', 'the objective is printed in §00');
say(/Closing check/.test(txt('#s16 .talk .th')) && /in chat/.test(txt('#s16 .talk .th')), 'FF-007', '§11 closing block is the written check');
say(!/Word|Excel|PowerPoint|Office|add-in/.test(txt('#sOff')), 'FF-005', 'no vendor application named in §08');
say(/Start it four minutes late/.test(html), 'FF-003', '§06 capture check is conditional');
{
  const bl = [...d.querySelectorAll('#bridgeList button')];
  [2, 0, 3, 1].forEach(i => bl[i] && bl[i].click());
  say(/Correct order, 4 of 4/.test(txt('#bridgeOut')), 'FF-019', 'C A D B is the correct order');
}
say(/D10/.test(txt('#qIndexList')) && /D1 Buy-Sell/.test(txt('#qIndexList')), 'FF-023', '§03 lists the ten passages by number');
{
  const x = $('#offX0'); if (x) x.click();
  say(/Example output, illustrative/.test(txt('#offE0')) && /we will confirm both with you/.test(txt('#offE0')), 'FF-035', '§08 example output opens');
}
console.log(`\nsummary: ${fails} failed`);
process.exit(fails ? 1 : 0);
