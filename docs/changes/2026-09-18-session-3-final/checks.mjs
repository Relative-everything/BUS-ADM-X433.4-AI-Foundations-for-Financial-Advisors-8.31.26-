#!/usr/bin/env node
/* One DOM assertion per ledger item. Run from the repo root with NODE_PATH at
   the global npm root: node docs/changes/2026-09-18-session-3-final/checks.mjs */
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

say(true, 'FF-001', 'the change folder exists and this file runs');
say(/cut into ten passages/.test(txt('#s4')), 'FF-002', '§03 names the ten passages');
say(/Start it four minutes late/.test(html), 'FF-003', '§06 capture check is conditional');
{
  const b = d.querySelectorAll('#ntStages button');
  if (b[2]) b[2].click();
  if (b[1]) b[1].click();
  const outs = d.querySelectorAll('#ntStages .ntout');
  const heads = outs[2] ? [...outs[2].querySelectorAll('.hd')].map(e => e.textContent) : [];
  const stage3 = heads.filter(h => !/What this stage|What it produces/.test(h));
  say(stage3.length === 5 && !stage3.includes('Third-party position'), 'FF-004', `stage 3 renders five headings: ${stage3.join(' | ')}`);
  say(/no standing instruction/.test(outs[1] ? outs[1].textContent : ''), 'FF-004', 'stage 2 ties the dropped clause to a tool with no standing instruction');
}
{
  const sec = txt('#sOff');
  say(d.querySelectorAll('#sumBlock .hd').length === 5, 'FF-005', '§08 renders the summary with five headings');
  say(!!($('#offP0') && $('#offP1') && $('#offP2') && $('#offC0') && $('#offC1') && $('#offC2')), 'FF-005', 'three prompts and three copy buttons');
  say(!/Word|Excel|PowerPoint|Office|add-in/.test(sec), 'FF-005', 'no vendor application named in §08');
  say(!/in the app/.test(html.slice(html.indexOf('var OFFI'), html.indexOf('var OFFB'))), 'FF-005', 'sorter feedback no longer says "in the app"');
}
say([...d.querySelectorAll('#s1 .plab')].some(e => /Tonight/.test(e.textContent)), 'FF-006', 'the objective is printed in §00');
say(/Closing check/.test(txt('#s16 .talk .th')) && /in chat/.test(txt('#s16 .talk .th')), 'FF-007', '§11 closing block is the written check');
say(!/baseline you recorded/.test(txt('#s16')), 'FF-008', 'no presupposed baseline capture');
say(/reverse prompting/.test(txt('#s13')), 'FF-009', '§10 names reverse prompting');
say(/If you do not run client meetings/.test(txt('#s9')), 'FF-010', '§06 carries the parallel track');
say(/swap "client"/.test(txt('#s10')), 'FF-011', '§07 says how to adapt the instruction');
say(/meeting you chose/.test(txt('#s16 .hint')), 'FF-012', '§11 hint covers the chosen meeting');
say(/wrote up/.test(txt('[data-gate="g10"]')), 'FF-013', '§10 work-along does not presuppose a client meeting');
say(!/Office/.test(txt('#src-case')), 'FF-015', 'footer src-case does not name Office');
say(d.querySelectorAll('[data-comp]').length === 18, 'V6', `18 interaction roots (found ${d.querySelectorAll('[data-comp]').length})`);
console.log(`\nsummary: ${fails} failed`);
process.exit(fails ? 1 : 0);
