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
