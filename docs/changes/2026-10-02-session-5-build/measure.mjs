#!/usr/bin/env node
/* Measure a lesson page in Chromium at 1280 px: visible controls, visible words, chips, footer sources,
   interaction roots and families, gates, figures, minutes; at load with every appendix shown, and after Shift+U.
   Usage: node measure.mjs <page.html> [...] */
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { join, resolve } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require(join(execSync('npm root -g').toString().trim(), 'playwright'));
const pages = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.route('**/*', (r) => (/fonts\.googleapis|fonts\.gstatic/.test(r.request().url()) ? r.abort() : r.continue()));
const probe = () => page.evaluate(() => {
  const vis = (e) => { const r = e.getClientRects(); if (!r.length) return false; const cs = getComputedStyle(e); return cs.visibility !== 'hidden' && cs.display !== 'none'; };
  const ctl = [...document.querySelectorAll('button, input, select, textarea, [role="button"], [role="slider"], [tabindex="0"]:not(button), a.btn')].filter(vis);
  const words = (document.body.innerText || '').split(/\s+/).filter(Boolean).length;
  const chips = [...document.querySelectorAll('.conf')].filter(vis).length;
  const chipsAll = document.querySelectorAll('.conf').length;
  const srcs = document.querySelectorAll('ol.srcs > li').length;
  const roots = [...document.querySelectorAll('[data-task]')];
  const fams = new Set(roots.map((r) => r.getAttribute('data-comp')));
  const gates = document.querySelectorAll('.check[data-gate]').length;
  const gatesDone = document.querySelectorAll('.check[data-gate].done').length;
  const svgs = [...document.querySelectorAll('section svg')].filter((s) => s.getBoundingClientRect().width > 80).length;
  const secs = [...document.querySelectorAll('section.slide')].filter((s) => !/apxdiv/.test(s.className));
  const mins = secs.reduce((a, s) => a + (parseInt((s.querySelector('.mins') || {}).textContent || '0', 10) || 0), 0);
  const live = document.querySelectorAll('[aria-live]').length;
  const copies = [...document.querySelectorAll('button')].filter((b) => /copy/i.test(b.textContent) && vis(b)).length;
  const sliders = document.querySelectorAll('input[type="range"]').length;
  const textboxes = document.querySelectorAll('textarea, input[type="text"]').length;
  const perSection = secs.map((s) => ({ id: s.id, mins: parseInt((s.querySelector('.mins') || {}).textContent || '0', 10) || 0,
    controls: [...s.querySelectorAll('button, input, select, textarea, [role="button"], [role="slider"], [tabindex="0"]:not(button)')].filter(vis).length,
    words: (s.innerText || '').split(/\s+/).filter(Boolean).length, chips: s.querySelectorAll('.conf').length, svgs: [...s.querySelectorAll('svg')].filter((g) => g.getBoundingClientRect().width > 80).length }));
  return { perSection, controls: ctl.length, words, chips, chipsAll, srcs, roots: roots.length, families: fams.size, gates, gatesDone, svgs, sections: secs.length, mins, live, copies, sliders, textboxes };
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
  console.log(JSON.stringify({ page: p, bytes, atLoad, afterShiftU: after }));
}
await browser.close();
