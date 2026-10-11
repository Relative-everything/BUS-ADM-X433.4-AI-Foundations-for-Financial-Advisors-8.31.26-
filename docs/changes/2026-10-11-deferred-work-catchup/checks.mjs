#!/usr/bin/env node
/* One assertion per ledger row a static or DOM check can prove. Run from the repo root with NODE_PATH
   at a node_modules holding jsdom:
     NODE_PATH=$(npm root -g) node docs/changes/2026-10-11-deferred-work-catchup/checks.mjs
   Layout at 380 px (DW-077, DW-119) and the Session 5 figure geometry (DW-131) need a real browser:
   scripts/verify-browser.mjs and docs/changes/2026-10-04-session-5-interactivity/drags.mjs measure
   them. This file pins the source that produces them, so a revert is caught without a browser. */
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');

const read = (f) => readFileSync(f, 'utf8');
let fails = 0;
const say = (ok, id, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
const noMotion = () => ({ matches: true, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
function load(file) {
  const errs = [];
  const dom = new JSDOM(read(file), { runScripts: 'dangerously', pretendToBeVisual: true,
    beforeParse(win) { win.matchMedia = noMotion; win.addEventListener('error', (e) => errs.push(e.message)); } });
  const w = dom.window, d = w.document;
  return { w, d, errs, $: (s) => d.querySelector(s), $$: (s) => [...d.querySelectorAll(s)],
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })) };
}
const FOLDER = 'docs/changes/2026-10-11-deferred-work-catchup';
say(existsSync(`${FOLDER}/plan.md`) && existsSync(`${FOLDER}/ledger.md`) && existsSync(`${FOLDER}/handback.md`), 'DWC-000', 'the change folder carries its plan, ledger and handback');

/* ---- the register (Wave 1, DWC-001) ---- */
{ const t = read('docs/deferred-work.md');
  const ids = [...t.matchAll(/^\| (DW-\d{3}) \|/gm)].map((m) => m[1]);
  const max = Math.max(...ids.map((i) => +i.slice(3)));
  const want = Array.from({ length: max }, (_, i) => 'DW-' + String(i + 1).padStart(3, '0'));
  say(ids.length === max && want.every((i) => ids.includes(i)), 'DWC-001', `every id DW-001 to DW-${max} appears exactly once (${ids.length} rows)`);
  const section = (name) => { const s = t.indexOf(`\n## ${name}\n`); const e = t.indexOf('\n## ', s + 5); return t.slice(s, e); };
  const statuses = (block) => [...block.matchAll(/^\| DW-\d{3} \|.*\| ([^|]*) \|$/gm)].map((m) => m[1].trim());
  const op = statuses(section('Open')), cl = statuses(section('Closed')), su = statuses(section('Superseded'));
  say(op.length && op.every((s) => s === 'open' || s === 'open-upstream') && cl.every((s) => s === 'closed') && su.every((s) => s.startsWith('superseded')),
    'DWC-001', `Open holds only open rows (${op.length}), Closed only closed (${cl.length}), Superseded only superseded (${su.length})`);
  const cells = [...t.matchAll(/^\| DW-\d{3} \|.*$/gm)].map((m) => m[0].replace(/\\\|/g, '').split('|').length - 2);
  say(cells.every((n) => n === 7), 'DWC-001', 'every row has seven cells once escaped pipes are discounted (no code span breaks a table)');
  say(/\n## Where things stand, 2026-10-11\n/.test(t) && /\n## Where things stood, 2026-09-03 to 2026-09-14 \(history, kept as written\)\n/.test(t), 'DWC-001', 'the 2026-10-11 header wins; the earlier blocks are kept as history');
  const row = (id) => (t.match(new RegExp(`^\\| ${id} \\|.*$`, 'm')) || [''])[0];
  say(/\| open \|$/.test(row('DW-092')) && /Reopened after the catch-up's review/.test(row('DW-092')), 'DWC-002', 'DW-092 is open again: the Session 1 corrections were never delivered'); }

/* ---- DW-041, CASE.md 4.5 (Wave 3, DWC-008) ---- */
{ const c = read('CASE.md');
  say(!/\| Investment adviser \| \*\(none/.test(c) && /\| Financial planner and investment adviser \| \*The student's firm\*/.test(c), 'DWC-008', '§A.5 names the student\'s firm as the engaged planner');
  say(/\*\*Resolved 2026-10-11 \(DW-041, CASE\.md 4\.5\)\.\*\*/.test(c) && !/IMPORTED DELIBERATELY AND NOT RESOLVED/.test(c), 'DWC-008', 'the Part O conflict note is a dated resolution');
  say(/\| \*\*4\.5\*\* \| \*\*2026-10-11\*\* \|/.test(c) && /case_version: "4\.0"/.test(c), 'DWC-008', 'Part N carries 4.5; case_version stays 4.0 because no extract changed'); }

/* ---- session-1 (DWC-010, DWC-011, DWC-012) ---- */
{ const h = read('session-1/index.html');
  const line = h.split('\n').find((l) => l.includes('Prices: <b>Anthropic Claude Platform Docs</b>, 25 August 2026. First-party.')) || '';
  say(/First-party\. <span class="conf h" data-src="src-pricing">H<\/span>/.test(line), 'DWC-010', 'session-1 §05: the chip after the Anthropic prices sentence resolves to src-pricing');
  say(/Session 2 &sect;04 builds up three starter prompts, then has you rewrite the weakest of the three you write, or one of its starters if you have none\./.test(h), 'DWC-011', 'session-1: the Session 2 §04 sentence says what §04 does');
}
{ const css = (f) => { const h = read(f); const i = h.indexOf('/* DW-077.'); return i < 0 ? '' : h.slice(i, h.indexOf('}}', i) + 2); };
  const a = css('session-0.1/index.html'), b = css('session-1/index.html');
  say(a && a === b && /630px on session-0\.1, 615px on\s+session-1/.test(a) && /sessions 4 and 5 hide theirs only until it is used/.test(a) && /@media \(max-width:720px\)\{#ovr\{display:none\}#topbar \.ttl\{min-width:0;overflow:hidden;text-overflow:ellipsis\}#caseBtn\{flex:none\}\}/.test(a), 'DWC-012', 'session-0.1 and session-1 carry one byte-identical DW-077 rule and comment');
  for (const f of ['session-0.1/index.html', 'session-1/index.html']) {
    const h = read(f), s = h.indexOf('/* STYLE:END */'), i = h.indexOf('/* DW-077.');
    say(s > 0 && i > s, 'DWC-012', `${f}: the rule sits after the managed STYLE fence`); } }

/* ---- session-2 (DWC-013, DWC-014, DWC-015) ---- */
{ const h = read('session-2/index.html');
  say(/<section class="slide" id="s0" data-nav="Retrieval bridge">/.test(h) && /<h3>Retrieval bridge/.test(h), 'DWC-013', 'session-2 §00: the nav label matches the heading on screen');
  say(/\.scale\{display:flex;flex-wrap:wrap;gap:5px\}/.test(h), 'DWC-014', 'session-2: the §04 level tiles wrap');
  const { $, $$, click, errs } = load('session-2/index.html');
  const tas = $$('#bridge textarea'), btns = $$('#bridge [data-rv]');
  say(tas.length === 3 && btns.length === 3, 'DWC-015', 'the bridge renders three answer boxes, each with its own Lock and reveal');
  const qs = $$('#bridge p[id^="bq"]');
  say(qs.length === 3 && tas.every((ta, i) => ta.getAttribute('aria-labelledby') === 'bq' + i && btns[i].getAttribute('aria-describedby') === 'bq' + i && ta.closest('div') && ta.closest('div').contains($('#bq' + i))),
    'DWC-015', 'each box and its button are tied to their own question (bq0 to bq2) for assistive tech');
  tas.forEach((ta, i) => { ta.value = 'answer ' + i; });
  click(btns[0]);
  const shown = (i) => { const el = $('#bans' + i); return !!el && !el.hidden && el.style.display !== 'none'; };
  say(tas[0].readOnly && shown(0) && btns[0].getAttribute('aria-expanded') === 'true' && !tas[1].readOnly && !tas[2].readOnly && !shown(1) && !shown(2), 'DWC-015', 'Lock and reveal on item 1 locks that box and opens that key only');
  click($('#bridgeReveal'));
  say(tas.every((ta) => ta.readOnly) && [0, 1, 2].every(shown), 'DWC-015', 'Reveal all three locks every box first and opens every key');
  say(errs.length === 0, 'DWC-015', `session-2 loads and runs the bridge with no script error${errs.length ? ': ' + errs[0] : ''}`); }

/* ---- session-5 (DWC-016) ---- */
{ const h = read('session-5/index.html');
  say(/FY=26,FSH=62;/.test(h) && /var W=680,H=382;/.test(h) && /AY\+AH\+34\+i\*13/.test(h), 'DWC-016', 'session-5: the §04 station boxes and the §07 figure keep the pitches that clear the web fonts'); }

/* ---- stamps (DWC-017) ---- */
{ const want = { 'index.html': '2026-10-04', 'session-1/index.html': '2026-10-11', 'session-2/index.html': '2026-10-11', 'session-3/index.html': '2026-10-02', 'session-4/index.html': '2026-09-28', 'session-5/index.html': '2026-10-11' };
  const bad = Object.entries(want).filter(([f, d]) => !new RegExp(`<p class="stamp">(?:Session \\d\\. )?Last updated ${d}\\.`).test(read(f)));
  say(bad.length === 0, 'DWC-017', `the six stamps read as set on 2026-10-11${bad.length ? ' (differs: ' + bad.map((b) => b[0]).join(', ') + ')' : ''}; a later edit should move its page's stamp`); }

/* ---- the review's script fixes (DWC-032 to DWC-034) ---- */
{ const vc = read('scripts/verify-case.mjs'), bu = read('scripts/build-unsourced.mjs'), bc = read('scripts/build-changelog.py');
  say(/realpathSync/.test(vc) && /function invokedDirectly\(\)/.test(vc) && /duplicated here:/.test(vc), 'DWC-032', 'verify-case: real-path main guard, duplicates reported');
  say(/const CONVENTION_COMMENTS = \{\s*'session-0\.1\/index\.html': \[\s*'sections print \[UNVERIFIED, needs source\] where the teaching wants the',\s*'says \[UNVERIFIED, needs source\] rather than inventing one\. \*\/',\s*\],\s*\};/.test(bu), 'DWC-033', 'build-unsourced: the not-a-claim exemption is pinned to the two convention lines');
  say(/RESTYLE_SWEEP/.test(bc.slice(bc.indexOf('def find_sweep'), bc.indexOf('def main'))), 'DWC-034', 'build-changelog: find_sweep() reads RESTYLE_SWEEP, as verify-style does'); }

/* ---- the changelog page (DWC-028) ---- */
{ const fence = (h) => { const m = h.match(/\/\* STYLE:BEGIN[^\n]*\n[\s\S]*?\/\* STYLE:END \*\//); return m ? createHash('md5').update(m[0]).digest('hex') : ''; };
  const page = read('changelog/index.html');
  say(fence(page) && fence(page) === fence(read('index.html')), 'DWC-028', 'changelog/index.html carries the corpus style fence, not the empty one build-changelog.py writes without the skill');
  say(/<h2>2026-10-11 · The deferred-work register catches up/.test(page) && !/\*\*/.test(page.slice(page.indexOf('<h2>2026-10-11'), page.indexOf('<hr>', page.indexOf('<h2>2026-10-11')))), 'DWC-028', 'the 2026-10-11 entry is rendered with no raw markdown'); }

console.log(`\nsummary: ${fails === 0 ? 'all passed' : fails + ' failed'}`);
process.exit(fails ? 1 : 0);
