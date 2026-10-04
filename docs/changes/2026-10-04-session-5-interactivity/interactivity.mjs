#!/usr/bin/env node
/* interactivity.mjs <page.html> [...]: the 2026-10-03 measure.mjs method (Chromium, 1280 px, every appendix
   shown, at load and after Shift+U) with the counts this pass is about: pointer-drag items ([data-drag]),
   drop targets ([data-drop]), range inputs, text inputs, and per section whether its interaction is
   manipulative (T3: a drag item or drop target inside its data-task root), parametric (T2: a range input),
   generative (T4: a textarea or text input), or click-only (T1). A click that only shows text (T0) is a
   judgement the handback makes by reading the page; this script counts the mechanics.
   Usage: node docs/changes/2026-10-04-session-5-interactivity/interactivity.mjs session-4/index.html session-5/index.html */
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { join, resolve } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || join(execSync('npm root -g').toString().trim(), 'playwright'));
const pages = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.route('**/*', (r) => (/fonts\.googleapis|fonts\.gstatic/.test(r.request().url()) ? r.abort() : r.continue()));
const probe = () => page.evaluate(() => {
  const vis = (e) => { const r = e.getClientRects(); if (!r.length) return false; const cs = getComputedStyle(e); return cs.visibility !== 'hidden' && cs.display !== 'none'; };
  const secs = [...document.querySelectorAll('section.slide')].filter((s) => !/apxdiv/.test(s.className));
  const per = secs.map((s) => {
    const root = s.querySelector('[data-task]') || s;
    const drag = s.querySelectorAll('[data-drag]').length, drop = s.querySelectorAll('[data-drop]').length;
    const range = s.querySelectorAll('input[type="range"]').length, text = s.querySelectorAll('textarea, input[type="text"]').length;
    const svgs = [...s.querySelectorAll('svg')].filter((g) => g.getBoundingClientRect().width > 80).length;
    const tiers = [];
    if (drag || drop) tiers.push('T3'); if (range) tiers.push('T2'); if (text) tiers.push('T4'); if (!tiers.length) tiers.push('T1');
    return { id: s.id, comp: root.getAttribute('data-comp') || '', mins: parseInt((s.querySelector('.mins') || {}).textContent || '0', 10) || 0,
      controls: [...s.querySelectorAll('button, input, select, textarea, [role="button"], [role="slider"], [tabindex="0"]:not(button)')].filter(vis).length,
      words: (s.innerText || '').split(/\s+/).filter(Boolean).length, chips: s.querySelectorAll('.conf').length, svgs, drag, drop, range, text, tiers: tiers.join('+') };
  });
  const words = (document.body.innerText || '').split(/\s+/).filter(Boolean).length;
  return { perSection: per, sections: secs.length, mins: per.reduce((a, s) => a + s.mins, 0),
    controls: [...document.querySelectorAll('button, input, select, textarea, [role="button"], [role="slider"], [tabindex="0"]:not(button), a.btn')].filter(vis).length,
    words, chips: [...document.querySelectorAll('.conf')].filter(vis).length, srcs: document.querySelectorAll('ol.srcs > li').length,
    roots: document.querySelectorAll('[data-task]').length, families: new Set([...document.querySelectorAll('[data-task]')].map((r) => r.getAttribute('data-comp'))).size,
    gates: document.querySelectorAll('.check[data-gate]').length, gatesDone: document.querySelectorAll('.check[data-gate].done').length,
    svgs: [...document.querySelectorAll('section svg')].filter((s) => s.getBoundingClientRect().width > 80).length,
    drag: document.querySelectorAll('[data-drag]').length, drop: document.querySelectorAll('[data-drop]').length,
    t3: per.filter((s) => /T3/.test(s.tiers)).length, t4: per.filter((s) => /T4/.test(s.tiers)).length, t2: per.filter((s) => /T2/.test(s.tiers)).length,
    ranges: document.querySelectorAll('input[type="range"]').length, texts: document.querySelectorAll('textarea, input[type="text"]').length,
    live: document.querySelectorAll('[aria-live]').length, copies: [...document.querySelectorAll('button')].filter((b) => /copy/i.test(b.textContent) && vis(b)).length };
});
for (const p of pages) {
  await page.goto('file://' + resolve(p), { waitUntil: 'load' });
  await page.evaluate(() => { const b = document.querySelector('#tierbar button[data-level="2"]'); if (b) b.click(); });
  await page.waitForTimeout(300);
  const atLoad = await probe();
  await page.keyboard.down('Shift'); await page.keyboard.press('U'); await page.keyboard.up('Shift');
  await page.waitForTimeout(1500);
  const after = await probe();
  const bytes = require('node:fs').statSync(p).size;
  console.log(JSON.stringify({ page: p, bytes, atLoad, afterShiftU: { words: after.words, gatesDone: after.gatesDone, controls: after.controls } }));
}
await browser.close();
