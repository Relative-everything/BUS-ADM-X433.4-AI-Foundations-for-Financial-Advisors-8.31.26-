#!/usr/bin/env node
/* One DOM assertion per ledger row a DOM check can prove. Run from the repo
   root with NODE_PATH at a node_modules holding jsdom:
   node docs/changes/2026-09-27-session-4-syllabus/checks.mjs */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
const html = readFileSync('session-4/index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true });
const w = dom.window, d = w.document;
const $ = (s) => d.querySelector(s);
const $$ = (s) => [...d.querySelectorAll(s)];
const txt = (s) => ($(s) ? $(s).textContent.replace(/\s+/g, ' ') : '');
const click = (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const key = (el, k) => el && el.dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true }));
const done = (g) => $('[data-gate="' + g + '"]') && $('[data-gate="' + g + '"]').classList.contains('done');
const cells = () => { const c = {}; $$('#planFig .s3cell').forEach((x) => { const k = x.getAttribute('class').replace('s3cell', '').trim() || 'off'; c[k] = (c[k] || 0) + 1; }); return c; };
let fails = 0;
const say = (ok, id, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };

say(true, 'S4S-001', 'the change folder exists and this file runs');

/* ---- §03: four vendors ---- */
{ const v = $$('#vendBtns button').map((b) => b.textContent);
  say(v.join('|') === 'Claude|ChatGPT|Copilot|Gemini' && $$('#planBtns button').length === 3 && v.every((x, i) => $$('#vendBtns button')[i].getAttribute('aria-pressed') === (i === 0 ? 'true' : 'false')),
    'S4S-002', '§03: four vendors in the syllabus order, Claude selected at load, still three plan tiles'); }
{ click($$('#planBtns button')[0]);
  const claudeOn = /five years/.test(txt('#planOut')) && cells().k5 === 60;
  click($('#trainSw'));
  const claudeOff = /30 days/.test(txt('#planOut')) && cells().k30 === 1;
  say(claudeOn && claudeOff && done('g4'), 'S4S-003', '§03: Claude A reads as before, sixty rust squares on, one teal square off, the gate flips on the first plan pick'); }
{ click($$('#vendBtns button')[1]); /* ChatGPT, switch still off */
  const off = /Still kept until you delete it/.test(txt('#planOut')) && cells().kk === 60 && /Improve the model for everyone/.test(txt('#trainSw'));
  click($('#trainSw'));
  const on = /may train future models/.test(txt('#planOut')) && cells().k5 === 60 && /UNTIL YOU DELETE/.test(txt('#planFig'));
  say(off && on, 'S4S-004', '§03: ChatGPT names its own switch; off keeps sixty gold squares, on turns them rust'); }
{ click($$('#vendBtns button')[3]); /* Gemini, switch on */
  const on = cells().k5 === 18 && cells().kr === 18 && /36 months if read/.test(txt('#planFig')) && /people may read chats/.test(txt('#planOut'));
  click($('#trainSw'));
  const off = /72 hours/.test(txt('#planOut')) && cells().k30 === 1;
  say(on && off, 'S4S-005', '§03: Gemini fills 18 squares with 18 dashed for reviewed chats; off is one square and 72 hours'); }
{ click($$('#planBtns button')[1]);
  const b = cells().kq === 60 && /IN THE CONTRACT/.test(txt('#planFig')) && /no human review/.test(txt('#planOut')) && /NO SWITCH/.test(txt('#trainSw'));
  click($$('#vendBtns button')[2]); click($$('#planBtns button')[2]);
  const c = /Business terms your firm signs/.test(txt('#planOut')) && !/own terms/.test(txt('#planOut'));
  click($$('#planBtns button')[1]);
  const b2 = /not used to train/.test(txt('#planOut')) && /own terms/.test(txt('#planOut'));
  say(b && c && b2, 'S4S-006', '§03: a business plan draws the contract as dashed squares; an unsourced API tile cites nothing; a sourced one cites its page'); }
say($$('#s3 [data-src]').map((c) => c.dataset.src).filter((k, i, a) => a.indexOf(k) === i).filter((k) => /^src-(openai-data|ms-copilot|ms-copilot-edp|gemini-privacy|gemini-workspace)$/.test(k)).length === 5,
  'S4S-007', '§03: the three other vendors are chipped to five records, all present in the footer');

/* ---- §03: six leaks ---- */
{ const w6 = $$('#setList .s3w').map((e) => e.textContent);
  say(w6.join('|') === 'THE DEFAULT|LOGS|MEMORY|CACHES|CONNECTORS|FEATURES' && /Open a place: 1 to 6/.test(txt('#setOut')),
    'S4S-008', '§03: the six places carry the syllabus words (logs, caches, connectors, features) and the readout waits for a click'); }
{ click($$('#setList button')[1]);
  const a = /LOGS · Chat history/.test(txt('#setOut')) && /DeepSeek, January 2025/.test(txt('#setOut')) && $('#setOut [data-src="src-deepseek"]') && /1 of 6 opened/.test(txt('#setOut'));
  click($$('#setList button')[3]); click($$('#setList button')[5]); click($$('#setList button')[4]);
  const b = /CONNECTORS/.test(txt('#setOut')) && $('#setOut [data-src="src-cve"]') && /4 of 6 opened/.test(txt('#setOut'));
  const badges = $$('#planFig .s3bdg.ok').length === 4;
  say(a && b && badges && $$('#setList button')[1].getAttribute('aria-pressed') === 'true', 'S4S-009', '§03: opening a place names its leak with a chip, counts it, and turns its badge on the map teal'); }

/* ---- §04 ---- */
say(/Approved means its answers are on paper/.test(txt('#s4 .big')), 'S4S-010', '§04: the thesis names what approved means');

/* ---- §05: four attacks, one wall ---- */
{ const rows = $$('#atkFig .s5arow'), tiles = $$('#atkBtns button');
  say(rows.length === 4 && tiles.length === 4 && rows.every((g) => g.getAttribute('role') === 'button' && g.getAttribute('tabindex') === '0') && /Click 1 to 4/.test(txt('#atkOut')) && !$('#atkBoard .do'),
    'S4S-011', '§05: an untimed board with four keyboard-operable rows and four tiles, nothing selected at load'); }
{ click($$('#atkBtns button')[1]);
  const ex = /2 · Data exfiltration/.test(txt('#atkOut')) && $('#atkOut [data-src="src-cve"]') && $$('#atkFig .s5arow')[1].classList.contains('on') && $('#atkBoard').classList.contains('live');
  key($$('#atkFig .s5arow')[3], 'Enter');
  const mw = /4 · AI-written malware/.test(txt('#atkOut')) && $('#atkOut [data-src="src-anthropic-threat"]') && $('#atkOut [data-src="src-gtig-ai"]') && $('#atkOut [data-src="src-secpri"]') && $$('#atkFig .s5arow')[3].classList.contains('on') && $$('#atkFig .s5arow')[3].classList.contains('nogate') && !$$('#atkFig .s5arow')[1].classList.contains('on');
  say(ex && mw && /polymorphic malware/.test(txt('#atkOut')) && /your defence did not change/.test(txt('#atkOut')), 'S4S-012', '§05: exfiltration is named and chipped; row 4 opens by keyboard, is drawn without a lock, and carries three sources'); }
say(/Detecting and countering misuse of AI/.test(txt('#s5 .src')) && /polymorphic malware/.test(txt('#s5 .src')) && /simulated for this lesson: no model runs/.test(txt('#s5 .src')),
  'S4S-013', '§05: the source line names the two new reports and keeps the sentence the polish check asserts');

/* ---- §07 ---- */
say(/DECISION: \(you fill in, after reading/.test(txt('#recBlock')) && /what you decided/.test(txt('#s7')) && /Journal of Accountancy \(2025\)/.test(txt('#s7 ul.pts')) && $('#s7 [data-src="src-joa-prompt"]') && $('#src-joa-prompt'),
  'S4S-014', '§07: the record block ends with a decision line; the reading is named, chipped, and in the footer');

/* ---- sources and registers ---- */
{ const s = readFileSync('SOURCES.md', 'utf8');
  const keys = ['src-openai-data', 'src-ms-copilot', 'src-ms-copilot-edp', 'src-gemini-privacy', 'src-gemini-workspace', 'src-deepseek', 'src-chatgpt-index', 'src-meta-feed', 'src-anthropic-threat', 'src-gtig-ai', 'src-joa-prompt'];
  say(keys.every((k) => s.includes('## ' + k) && $('#' + k)) && /daly-020326/.test(s) && /polymorphic malware/.test(s.split('## src-secpri')[1].split('## ')[0]),
    'S4S-015', 'eleven new records, each in the footer; Daly has its link; the FY2026 §VII record says what §VII holds'); }
say(!/'\+src\+'/.test(html) && $$('[data-src]').every((c) => $('#' + c.dataset.src)), 'S4S-016', 'every chip on the page, script strings included, resolves to a footer entry');
{ /* rendered text only: script and style bodies are source, not what a reader sees */
  const walk = d.createTreeWalker(d.body, w.NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement && /^(SCRIPT|STYLE|TEMPLATE)$/.test(n.parentElement.tagName) ? w.NodeFilter.FILTER_REJECT : w.NodeFilter.FILTER_ACCEPT) });
  let shown = ''; for (let n = walk.nextNode(); n; n = walk.nextNode()) shown += n.nodeValue + ' ';
  say(!/\btonight\b/i.test(shown) && !/this build|DATA-PULL|\.mjs\b/.test(shown), 'S4S-017', 'no instructor deixis or maintainer vocabulary reaches the rendered page'); }
{ const r = readFileSync('instructor-notes/session-4.md', 'utf8');
  say(/vendor/i.test(r) && /Four attacks, one wall/.test(r) && /DECISION/.test(r) && /polymorphic/.test(r), 'S4S-018', 'the run sheet carries the vendor row, the board, the decision line and the new verify items'); }
say(/window\.__coreMins=67/.test(html) && /Core 67 \+ appendix 83/.test(html), 'S4S-019', 'minutes unchanged: core 67, appendix 83');

console.log(`\n${fails ? fails + ' failed' : '0 failed'}`);
process.exit(fails ? 1 : 0);
