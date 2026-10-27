#!/usr/bin/env node
/**
 * docs/next-term/checks.mjs — the next-term build's own regression set (RUNBOOK A.0.2:
 * Phase 11 writes it). Pins the facts that the 2027-term phases established and that no
 * other validator guards: the case pages exist and carry the two generated spans, every
 * lesson links its case page and holds a READINGS region, the hub lists the case strip
 * and the setup page first, readings.json and the reading cards agree, the FACTS registry
 * is cited by every lesson, the instructor polls files hold exactly four polls, and the
 * case-page section shape is the six-section one, and (DW-171) each lesson's #sCase opener
 * carries the same commit data as its case page. Run with NODE_PATH=$(npm root -g).
 *
 *   node docs/next-term/checks.mjs        # exit 1 on any failure
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (p) => readFileSync(join(REPO, p), 'utf8');
let fails = 0;
const check = (ok, label, detail = '') => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail && !ok ? '\n        ' + detail : ''}`); if (!ok) fails++; };

/* 1. case pages: present, six sections, both generated spans filled, the lesson link */
for (let n = 1; n <= 5; n++) {
  const p = `cases/case-${n}.html`;
  if (!existsSync(join(REPO, p))) { check(false, `${p} exists`); continue; }
  const t = read(p);
  const ids = [...t.matchAll(/<section[^>]*\sid="([^"]+)"/g)].map((m) => m[1]);
  check(JSON.stringify(ids) === JSON.stringify(['brief', 'commit', 'deliverable', 'built', 'check', 'next']), `${p} has the six case sections in order`, ids.join(', '));
  const a = t.indexOf('<!-- CASE:BEGIN'), b = t.indexOf('<!-- CASE:END');
  check(a >= 0 && b > a + 200, `${p} carries a filled CASE span`);
  const sa = t.indexOf('<!-- SOURCES:BEGIN'), sb = t.indexOf('<!-- SOURCES:END');
  check(sa >= 0 && sb > sa + 50, `${p} carries a filled SOURCES span`);
  check(t.includes(`../session-${n}/index.html#sCase`), `${p} continues to the lesson opener`);
  check(/data-task=/.test(t), `${p} holds a learner-production task`);
  check(!/localStorage|sessionStorage|indexedDB/.test(t), `${p} uses no browser storage`);
}
/* 2. lessons: the Case link, the sCase opener, a READINGS region, FACTS chips */
for (let n = 1; n <= 5; n++) {
  const p = `session-${n}/index.html`, t = read(p);
  check(t.includes(`href="../cases/case-${n}.html"`), `${p} links its case page`);
  check(/<section[^>]*\sid="sCase"/.test(t), `${p} opens on the case (sCase)`);
  check((t.match(/<!-- READINGS:BEGIN s[0-9]+ -->/g) || []).length === 1, `${p} holds one READINGS region`);
  check(/data-fact="/.test(t), `${p} cites FACTS`);
}
/* 3. hub: setup first, five case cards */
{
  const t = read('index.html');
  const first = t.indexOf('href="session-0.1/"'), s1 = t.indexOf('href="session-1/"');
  check(first >= 0 && first < s1, 'hub lists the setup page before Session 1');
  check([1, 2, 3, 4, 5].every((n) => t.includes(`href="cases/case-${n}.html"`)), 'hub lists all five case pages');
}
/* 4. readings: json rows agree with the cards */
{
  const j = JSON.parse(read('docs/next-term/readings.json'));
  for (let n = 2; n <= 5; n++) {
    const rows = j.readings.filter((r) => String(r.session) === String(n));
    const prev = read(`session-${n - 1}/index.html`);
    const m = prev.match(new RegExp(`<!-- READINGS:BEGIN s${n} -->([\\s\\S]*?)<!-- READINGS:END -->`));
    const card = m ? m[1] : '';
    check(rows.every((r) => card.includes(r.url)), `session-${n - 1} reading card lists every readings.json row for session ${n}`);
  }
  { const rows = j.readings.filter((r) => String(r.session) === '1');
    const m = read('session-0.1/index.html').match(/<!-- READINGS:BEGIN s1 -->([\s\S]*?)<!-- READINGS:END -->/);
    check(!!m && rows.every((r) => m[1].includes(r.url)), 'the setup page lists every readings.json row for session 1'); }
  check(j.readings.every((r) => /^https?:\/\//.test(r.url)), 'every reading has a URL');
}
/* 5. polls: exactly four per session file */
for (let n = 1; n <= 5; n++) {
  const p = `instructor-notes/session-${n}-polls.md`;
  if (!existsSync(join(REPO, p))) { check(false, `${p} exists`); continue; }
  const t = read(p);
  const polls = (t.match(/^## +Poll +[1-4]\b/gm) || []).length;
  check(polls === 4, `${p} holds exactly four polls`, `found ${polls} "## Poll N" headings`);
}
/* 6. the setup page is the setup page */
{
  const t = read('session-0.1/index.html');
  check(/Start here/i.test(t), 'session-0.1 is titled as the setup page');
  check(!/LMBOX:BEGIN|LM:BEGIN/.test(t), 'session-0.1 carries no live console');
}
/* 7. the lesson's #sCase opener and its case page tell the same story (DW-171, D-051).
   The commit data is duplicated by hand on both pages, so the shared arrays are compared
   after normalising whitespace and entities. What is pinned HARD is what agrees today;
   the wording that differs by design (prose columns re-authored per page) prints as NOTE
   so a capture re-run that moves it is seen without failing the build. */
const note = (label, detail = '') => console.log(`NOTE  ${label}${detail ? '\n        ' + detail : ''}`);
const ENT = { '&rsquo;': "'", '&lsquo;': "'", '&ldquo;': '"', '&rdquo;': '"', '&middot;': '·', '&amp;': '&', '&nbsp;': ' ', '&#10003;': '', '&#9635;': '', '&#9873;': '', '’': "'", '‘': "'", '“': '"', '”': '"' };
const norm = (x) => x.replace(/&#?\w+;|[‘’“”]/g, (e) => (e in ENT ? ENT[e] : e)).replace(/\s+/g, ' ').trim();
const text = (html) => norm(html.replace(/<[^>]+>/g, ' '));
/* the source text of `var NAME=[ ... ];` as written on the page */
const arr = (t, name) => { const m = new RegExp(`var ${name}=\\[[\\s\\S]*?\\}\\s*\\];`).exec(t); return m ? norm(m[0].replace(/^\s+/gm, '')) : null; };
const strs = (src, key) => [...src.matchAll(new RegExp(`\\b${key}:'((?:[^'\\\\]|\\\\.)*)'`, 'g'))].map((m) => m[1]);
const firstDiff = (a, b) => { let i = 0; while (i < a.length && a[i] === b[i]) i++; return `...${a.slice(Math.max(0, i - 40), i + 80)}\n        vs ...${b.slice(Math.max(0, i - 40), i + 80)}`; };
{ /* Case 1: the eight facts to rank and the three-way prediction */
  const L = read('session-1/index.html'), C = read('cases/case-1.html');
  for (const name of ['CASEF', 'CASEV']) {
    const a = arr(L, name), b = arr(C, name);
    check(!!a && !!b && a === b, `session-1 ${name} (${name === 'CASEF' ? 'eight facts' : 'three predictions'}) matches cases/case-1.html`, a && b ? firstDiff(a, b) : `lesson ${a ? 'has' : 'lacks'} it, case page ${b ? 'has' : 'lacks'} it`);
  }
}
{ /* Case 3: the six comparison rows. Same six items, same verdicts; the prose columns are written per page. */
  const rows = (t) => [...t.matchAll(/<tr>\s*<td[^>]*><input type="checkbox" class="c3chk"[\s\S]*?<\/tr>/g)].map((m) => {
    const cells = [...m[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => text(c[1]));
    const label = /aria-label="([^"]*)"/.exec(m[0])[1];
    const verdict = (/\b(Matches|Kept out|Differs)\b/.exec(cells[3] || '') || [])[1] || '?';
    const turns = (cells[1] || '').replace(/turn\s*/g, '').replace(/\s*,\s*/g, ',');
    return { label: norm(label), cells, verdict, turns };
  });
  const a = rows(read('session-3/index.html')), b = rows(read('cases/case-3.html'));
  check(a.length === 6 && b.length === 6, `session-3 opener and cases/case-3.html each carry six comparison rows`, `${a.length} and ${b.length}`);
  const n = Math.min(a.length, b.length);
  const verd = [];
  for (let i = 0; i < n; i++) if (a[i].verdict !== b[i].verdict) verd.push(`row ${i + 1}: ${a[i].verdict} vs ${b[i].verdict}`);
  check(n === 6 && verd.length === 0, `session-3 six verdicts agree with cases/case-3.html (${a.map((r) => r.verdict).join(', ')})`, verd.join('; '));
  const soft = [];
  for (let i = 0; i < n; i++) {
    if (a[i].label !== b[i].label) soft.push(`row ${i + 1} label: "${a[i].label}" vs "${b[i].label}"`);
    if (a[i].turns !== b[i].turns) soft.push(`row ${i + 1} turns: ${a[i].turns} vs ${b[i].turns}`);
    if (a[i].cells[2] !== b[i].cells[2]) soft.push(`row ${i + 1} quoted turn text differs`);
  }
  if (soft.length) note(`session-3 rows and cases/case-3.html differ in wording on ${soft.length} point(s); the prose columns are authored per page (D-051)`, soft.join('\n        '));
}
{ /* Case 5: the five steps, the four reasons, the key */
  const L = read('session-5/index.html'), C = read('cases/case-5.html');
  const sa = arr(L, 'STEPS'), sb = arr(C, 'STEPS');
  const ta = strs(sa || '', 't'), tb = strs(sb || '', 't');
  check(ta.length === 5 && JSON.stringify(ta) === JSON.stringify(tb), `session-5 five workflow steps match cases/case-5.html`, `${ta.length} vs ${tb.length} steps; ${ta.map((x, i) => (x === tb[i] ? '' : `step ${i + 1} differs`)).filter(Boolean).join(', ')}`);
  const wa = arr(L, 'WHY'), wb = arr(C, 'WHY');
  check(!!wa && wa === wb, `session-5 four reasons (WHY) match cases/case-5.html`, wa && wb ? firstDiff(wa, wb) : 'missing');
  const key = (t) => (/var TRUTH=(\d+),WHYOK='(\w)'/.exec(t) || []).slice(1).join('/');
  check(key(L) !== '' && key(L) === key(C), `session-5 key (TRUTH/WHYOK) matches cases/case-5.html (${key(L)})`, `${key(L)} vs ${key(C)}`);
  const soft = [];
  for (const k of ['res', 'see']) { const x = strs(sa || '', k), y = strs(sb || '', k); x.forEach((v, i) => { if (v !== y[i]) soft.push(`step ${i + 1} ${k}: "${v.slice(0, 90)}" vs "${(y[i] || '').slice(0, 90)}"`); }); }
  if (soft.length) note(`session-5 STEPS res/see columns differ from cases/case-5.html on ${soft.length} point(s); the case page carries the counted test, the lesson a summary`, soft.join('\n        '));
}
console.log(`\nsummary: ${fails} failure(s)`);
process.exit(fails ? 1 : 0);
