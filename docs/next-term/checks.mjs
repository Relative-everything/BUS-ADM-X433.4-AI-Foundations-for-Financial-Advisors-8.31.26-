#!/usr/bin/env node
/**
 * docs/next-term/checks.mjs — the next-term build's own regression set (RUNBOOK A.0.2:
 * Phase 11 writes it). Pins the facts that the 2027-term phases established and that no
 * other validator guards: the case pages exist and carry the two generated spans, every
 * lesson links its case page and holds a READINGS region, the hub lists the case strip
 * and the setup page first, readings.json and the reading cards agree, the FACTS registry
 * is cited by every lesson, the instructor polls files hold exactly four polls, and the
 * case-page section shape is the six-section one. Run with NODE_PATH=$(npm root -g).
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
console.log(`\nsummary: ${fails} failure(s)`);
process.exit(fails ? 1 : 0);
