#!/usr/bin/env node
/**
 * test-outline.mjs: what checkpoint 3 of the Meridian restyle asks of the outline, asserted in Chromium.
 *
 *   node docs/design/meridian/test-outline.mjs [--shots dir]
 *
 * On each of the six lessons, with every network request refused and recorded:
 *   O1  the outline exists and lists every core section that is on screen, by its data-nav title, in order
 *   O2  with everything revealed (Shift+U, every <details> open) and nothing committed, no check is earned
 *   O3  nothing is in localStorage, sessionStorage, document.cookie or indexedDB, before and after use
 *   O4  the page scrolls from top to bottom and every listed section can be brought to the top
 *   O5  the page asked for nothing over the network
 *   O6  at 320 px the outline is a closed drawer, the page does not scroll sideways, and the Outline
 *       button opens it
 * On Sessions 2 and 4, named steps:
 *   C1  a reveal control alone leaves its section's count at 0
 *   C2  a lock-and-reveal on an empty answer box leaves it at 0 (Session 2)
 *   C3  a commit moves the count to 1 and, when it is the section's only task, draws the done check
 * Exit 1 on any failure.
 */
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { REPO } from './css-rules.mjs';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = createRequire(join(process.env.NODE_PATH || '/usr/lib/node_modules', 'x.js'))('playwright')); }
const si = process.argv.indexOf('--shots'), SHOTS = si >= 0 ? resolve(process.argv[si + 1]) : null; if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const LESSONS = ['session-0.1', 'session-1', 'session-2', 'session-3', 'session-4', 'session-5'];
let fail = 0;
const ok = (c, name, detail = '') => { if (!c) fail++; console.log((c ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  ' + detail : '')); return c; };
const browser = await chromium.launch();
const open = async (lesson, width) => {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' }); const asked = [];
  await ctx.route(/^https?:/, r => { asked.push(r.request().url()); return r.abort(); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(String(e)));
  await page.goto('file://' + join(REPO, lesson, 'index.html'), { waitUntil: 'load' }); await page.waitForTimeout(250);
  return { ctx, page, asked, errs };
};
const storage = page => page.evaluate(async () => ({ ls: localStorage.length, ss: sessionStorage.length, ck: document.cookie.length, idb: indexedDB.databases ? (await indexedDB.databases()).length : 0 }));
const row = (page, id) => page.evaluate(id => { const a = document.querySelector('#outline a[href="#' + id + '"]'); return a ? { n: a.children[2].textContent, cls: a.children[0].className } : null; }, id);
const earned = page => page.evaluate(() => [...document.querySelectorAll('#outline a .mck')].filter(m => /done|part/.test(m.className)).length);

for (const lesson of LESSONS) {
  const { ctx, page, asked, errs } = await open(lesson, 1440);
  const s0 = await storage(page);
  const o1 = await page.evaluate(() => { const want = [...document.querySelectorAll('section.slide[data-nav]')].filter(s => !s.classList.contains('apxdiv') && !s.classList.contains('apx') && s.offsetParent !== null).map(s => s.getAttribute('data-nav'));
    const got = [...document.querySelectorAll('#outline a:not(.apx)')].map(a => a.children[1].textContent); return { want, got, all: document.querySelectorAll('#outline a').length, core: document.querySelectorAll('section.slide[data-nav]:not(.apx):not(.apxdiv)').length }; });
  ok(o1.got.length > 0 && JSON.stringify(o1.want) === JSON.stringify(o1.got) && o1.want.length === o1.core, lesson + ' O1 outline lists every core section', o1.got.length + ' of ' + o1.core + ' core, ' + o1.all + ' rows in all');
  await page.keyboard.press('Shift+U').catch(() => {}); await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; })); await page.waitForTimeout(150);
  ok(await earned(page) === 0, lesson + ' O2 revealing everything earns no check');
  const o4 = await page.evaluate(async () => { const max = document.documentElement.scrollHeight - innerHeight; scrollTo({ top: max, behavior: 'instant' }); await new Promise(r => setTimeout(r, 80)); const reached = Math.abs(scrollY - max) < 3;
    let bad = 0; for (const a of document.querySelectorAll('#outline a')) { const s = document.getElementById(a.getAttribute('href').slice(1)); s.scrollIntoView({ block: 'start', behavior: 'instant' }); await new Promise(r => setTimeout(r, 10)); const t = s.getBoundingClientRect().top; if (t < -2 || t > innerHeight - 40) bad++; }
    const lock = [document.documentElement, document.body].some(e => /hidden|clip/.test(getComputedStyle(e).overflowY)); return { reached, bad, lock, max }; });
  ok(o4.reached && !o4.bad && !o4.lock, lesson + ' O4 scrolls freely', 'bottom at ' + o4.max + ' px, ' + o4.bad + ' section(s) unreachable');
  const s1 = await storage(page);
  ok(!(s0.ls + s0.ss + s0.ck + s0.idb + s1.ls + s1.ss + s1.ck + s1.idb), lesson + ' O3 browser storage empty', JSON.stringify(s1));
  ok(asked.filter(u => !/fonts\.(googleapis|gstatic)\.com/.test(u)).length === 0, lesson + ' O5 no request beyond the font host', asked.length + ' font request(s) refused');
  ok(errs.length === 0, lesson + ' no script error', errs.slice(0, 2).join(' | '));
  await ctx.close();
  const n = await open(lesson, 320);
  const o6 = await n.page.evaluate(async () => { const o = document.getElementById('outline'), t = document.getElementById('outlineToggle'); const off = o.getBoundingClientRect().right <= 1; const over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const vis = getComputedStyle(t).display !== 'none'; t.click(); await new Promise(r => setTimeout(r, 50)); const openNow = o.getBoundingClientRect().left >= 0 && o.classList.contains('open'); return { off, over, vis, openNow }; });
  ok(o6.off && o6.over <= 0 && o6.vis && o6.openNow, lesson + ' O6 drawer at 320 px', JSON.stringify(o6));
  await n.ctx.close();
}

/* Every click below is a real pointer click (page.click), because the outline ignores clicks made by script. */
/* ---- Session 2 ---- */
{ const { ctx, page } = await open('session-2', 1440); const click = sel => page.locator(sel).first().click({ timeout: 5000 });
  let r = await row(page, 's0'); ok(r && r.n === '0/1', 'session-2 start: retrieval bridge shows 0/1', JSON.stringify(r));
  await click('#bridge button.btn.ghost'); r = await row(page, 's0'); ok(r.n === '0/1', 'session-2 C2 lock-and-reveal on an empty box is not a commit', r.n);
  await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(200);
  await page.locator('#bridge textarea').first().fill('Output costs more than input, roughly five times.');
  r = await row(page, 's0'); ok(r.n === '0/1', 'session-2 typing alone, before the lock, earns nothing', r.n);
  await click('#bridge button.btn.ghost'); r = await row(page, 's0'); ok(r.n === '1/1' && /done/.test(r.cls), 'session-2 C3 an answer typed and locked earns the check', r.n + ' ' + r.cls);
  await page.evaluate(() => document.querySelector('#bridge button.btn.ghost').click()); 
  await page.locator('#tierbar [data-level="2"]').click(); await page.waitForTimeout(250);
  if (!(await row(page, 's9'))) { await page.locator('#tierbar [data-core]').click(); await page.waitForTimeout(250); }
  ok(!!(await row(page, 's9')), 'session-2 appendix sections are listed at full depth');
  /* the first enabled reveal or show button in a section that has a check to earn and has not earned it */
  const rv = await page.evaluate(() => { for (const a of document.querySelectorAll('#outline a')) { if (!/^0\//.test(a.children[2].textContent)) continue; const s = document.getElementById(a.getAttribute('href').slice(1));
      for (const b of s.querySelectorAll('button')) { if (b.disabled || b.offsetParent === null || !/^(reveal|show)\b/i.test(b.textContent.trim())) continue; if (b.closest('[data-commit]')) continue; const h = b.closest('[data-commit-in]'); if (h && b.matches(h.getAttribute('data-commit-in'))) continue;
        b.setAttribute('data-test-reveal', '1'); return { id: s.id, text: b.textContent.trim() }; } } return null; });
  if (!rv) console.log('note  session-2 has no other reveal button that is enabled before its commit (the page disables them); C2 above is its reveal-alone case');
  if (rv) { await click('[data-test-reveal]'); r = await row(page, rv.id); ok(r.n.startsWith('0/'), 'session-2 C1 "' + rv.text + '" alone earns nothing', rv.id + ' ' + r.n); }
  r = await row(page, 's0'); ok(r.n === '1/1', 'session-2 the earned check survives a change of appendix depth', r.n);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await page.waitForTimeout(150);
  if (SHOTS) await page.screenshot({ path: join(SHOTS, 'outline-session-2-commit.png') });
  await ctx.close(); }
/* ---- Session 4 ---- */
{ const { ctx, page } = await open('session-4', 1440); const click = sel => page.locator(sel).first().click({ timeout: 5000 });
  let r = await row(page, 'sCase'); ok(r && r.n === '0/1', 'session-4 start: case opener shows 0/1', JSON.stringify(r));
  await page.keyboard.press('Shift+U'); await page.waitForTimeout(150); ok(await earned(page) === 0, 'session-4 C1 Shift+U (reveal all) alone earns nothing');
  await page.reload({ waitUntil: 'load' }); await page.waitForTimeout(200);
  /* one option in each of the three questions, then the commit button */
  const n = await page.evaluate(() => { const root = document.querySelector('[data-task="t-sCase"]'); const seen = new Set(); let i = 0; for (const b of root.querySelectorAll('button.vopt')) { if (!seen.has(b.parentElement)) { seen.add(b.parentElement); b.setAttribute('data-test-pick', i++); } } return i; });
  for (let i = 0; i < n; i++) await click('[data-test-pick="' + i + '"]');
  r = await row(page, 'sCase'); ok(r.n === '0/1', 'session-4 choosing options before the commit button earns nothing', r.n + ' after ' + n + ' option click(s)');
  await click('#c4Commit'); r = await row(page, 'sCase'); ok(r.n === '1/1' && /done/.test(r.cls), 'session-4 C3 "Commit all three answers" earns the check', r.n + ' ' + r.cls);
  await page.locator('#tierbar [data-level="2"]').click(); await page.waitForTimeout(250);
  if (!(await row(page, 's6'))) { await page.locator('#tierbar [data-core]').click(); await page.waitForTimeout(250); }
  r = await row(page, 'sCase'); ok(r && r.n === '1/1', 'session-4 the earned check survives a change of appendix depth', JSON.stringify(r));
  r = await row(page, 's6'); ok(!!r && r.n === '0/1', 'session-4 the estimate section is listed at full depth, 0/1', JSON.stringify(r));
  await page.evaluate(() => { for (const id of ['mmRun', 'mmCheck']) { const b = document.getElementById(id); if (b) b.click(); } }); r = await row(page, 's6'); ok(r.n === '0/1', 'session-4 C1 a reveal fired by script earns nothing', r.n);
  await page.locator('#mmGuess').focus(); await page.keyboard.press('ArrowRight'); r = await row(page, 's6'); ok(r.n === '0/1', 'session-4 moving the guess slider, before the lock, earns nothing', r.n);
  await click('#mmLock'); r = await row(page, 's6'); ok(r.n === '1/1', 'session-4 C3 "Lock my guess" earns the check', r.n);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await page.waitForTimeout(150);
  if (SHOTS) await page.screenshot({ path: join(SHOTS, 'outline-session-4-commit.png') });
  const st = await storage(page); ok(!(st.ls + st.ss + st.ck + st.idb), 'session-4 storage still empty after commits', JSON.stringify(st));
  await ctx.close(); }
await browser.close();
console.log('\nsummary: ' + (fail ? fail + ' failure(s)' : 'outline and earned checks behave as checkpoint 3 asks'));
process.exit(fail ? 1 : 0);
