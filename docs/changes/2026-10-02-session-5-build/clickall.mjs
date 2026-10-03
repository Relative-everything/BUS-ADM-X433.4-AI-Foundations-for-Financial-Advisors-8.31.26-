#!/usr/bin/env node
/* clickall.mjs <page.html> [--shots DIR]: the click-everything harness, in Chromium at 1280 and 380.
   Loads the page, records page errors, clicks every button in document order (twice, in two
   orders), drives range inputs, checks for "undefined"/"NaN" in rendered text, horizontal
   overflow, Shift+U on and off, and screenshots each section at both widths. Exit 1 on any fail. */
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || join(execSync('npm root -g').toString().trim(), 'playwright'));
import { pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
const file = process.argv[2];
const shots = (() => { const i = process.argv.indexOf('--shots'); return i >= 0 ? process.argv[i + 1] : null; })();
if (shots) mkdirSync(shots, { recursive: true });
let fails = 0;
const say = (ok, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${s}`); };
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
for (const width of [1280, 380]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error' && !/ERR_(CONNECTION|NAME|INTERNET|NETWORK|BLOCKED|CERT)|net::/.test(m.text())) errors.push('console: ' + m.text()); });
  await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  console.log(`\n--- ${width}px ---`);
  say(errors.length === 0, `zero JS errors on load${errors.length ? '\n        ' + errors.slice(0, 5).join('\n        ') : ''}`);
  /* show every appendix section, then click everything */
  await page.evaluate(() => { const b = document.querySelector('#tierbar button[data-level="2"]'); if (b) b.click(); });
  const clickPass = async (reverse) => page.evaluate(async (rev) => {
    const out = { clicked: 0, errs: [] };
    const sel = 'section.slide button, section.slide [role="button"], section.slide input[type=range], section.slide input[type=checkbox], section.slide label.on, section.slide .seg';
    let els = [...document.querySelectorAll(sel)].filter((e) => !e.closest('#caseModal'));
    if (rev) els.reverse();
    for (const e of els) {
      try {
        if (e.tagName === 'INPUT' && e.type === 'range') {
          for (const v of [e.min, e.max, Math.round((+e.min + +e.max) / 2)]) { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); }
        } else if (e.tagName === 'INPUT') { e.click(); }
        else { if (typeof e.click === 'function') e.click(); else e.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); if (e.getAttribute('role') === 'button') { e.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); } }
        out.clicked++;
      } catch (err) { out.errs.push(String(err)); }
    }
    await new Promise((r) => setTimeout(r, 50));
    return out;
  }, reverse);
  const a = await clickPass(false);
  const b = await clickPass(true);
  say(a.errs.length === 0 && b.errs.length === 0, `clicked ${a.clicked} + ${b.clicked} controls with no handler exception${a.errs.concat(b.errs).length ? '\n        ' + a.errs.concat(b.errs).slice(0, 4).join('\n        ') : ''}`);
  say(errors.length === 0, `zero JS errors after clicking everything${errors.length ? '\n        ' + errors.slice(0, 5).join('\n        ') : ''}`);
  const bad = await page.evaluate(() => {
    const bad = []; const seen = new Set();
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement && /^(SCRIPT|STYLE|TEMPLATE)$/.test(n.parentElement.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT) });
    for (let n = walk.nextNode(); n; n = walk.nextNode()) { const t = n.nodeValue; if (t && /\b(undefined|NaN)\b/.test(t)) { const s = t.replace(/\s+/g, ' ').trim().slice(0, 100); if (!seen.has(s)) { seen.add(s); bad.push(s); } } }
    return bad;
  });
  say(bad.length === 0, `no "undefined" or "NaN" in rendered text${bad.length ? '\n        ' + bad.slice(0, 4).join('\n        ') : ''}`);
  const over = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth,
    wide: [...document.querySelectorAll('section.slide *')].filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1 && getComputedStyle(e).position !== 'fixed').slice(0, 5).map((e) => e.tagName + (e.id ? '#' + e.id : '') + (e.className && typeof e.className === 'string' ? '.' + e.className.split(' ')[0] : '')) }));
  say(over.sw <= over.iw + 1, `no horizontal overflow (scrollWidth ${over.sw} vs ${over.iw})${over.wide.length ? '\n        ' + over.wide.join(', ') : ''}`);
  const gates = await page.evaluate(() => ({ total: document.querySelectorAll('[data-gate]').length, done: document.querySelectorAll('.check.done').length }));
  console.log(`      gates ticked by clicking: ${gates.done} of ${gates.total}`);
  /* Shift+U off/on on a fresh load */
  await page.goto(pathToFileURL(file).href, { waitUntil: 'load' });
  await page.evaluate(() => { const b = document.querySelector('#tierbar button[data-level="2"]'); if (b) b.click(); });
  const before = await page.evaluate(() => document.querySelectorAll('.check.done').length);
  await page.keyboard.down('Shift'); await page.keyboard.press('KeyU'); await page.keyboard.up('Shift');
  await page.waitForTimeout(200);
  const after = await page.evaluate(() => ({ done: document.querySelectorAll('.check.done').length, total: document.querySelectorAll('[data-gate]').length, reveal: document.body.classList.contains('reveal'), keys: [...document.querySelectorAll('.keyhide')].filter((k) => getComputedStyle(k).display !== 'none').length, keysAll: document.querySelectorAll('.keyhide').length }));
  say(before === 0 && after.reveal && after.done === after.total, `Shift+U ticks every gate (${after.done} of ${after.total}) and opens the keys (${after.keys} of ${after.keysAll} .keyhide visible)`);
  say(errors.length === 0, `zero JS errors after Shift+U${errors.length ? '\n        ' + errors.slice(0, 5).join('\n        ') : ''}`);
  if (shots) {
    const ids = await page.evaluate(() => [...document.querySelectorAll('section.slide')].map((s) => s.id));
    for (const id of ids) { const el = await page.$('#' + id); if (el) await el.screenshot({ path: `${shots}/${width}-${id}.png` }).catch(() => {}); }
    console.log(`      screenshots: ${ids.length} sections at ${width}px -> ${shots}`);
  }
  await ctx.close();
}
await browser.close();
console.log(`\nsummary: ${fails ? fails + ' failure(s)' : 'click-through clean'}`);
process.exit(fails ? 1 : 0);
