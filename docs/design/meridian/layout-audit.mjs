#!/usr/bin/env node
/**
 * layout-audit.mjs <ref-tree> [--pages a,b] [--verbose]: did the restyle break a layout that worked?
 *
 * Opens each served page from the ref tree and from this tree (network refused, Math.random seeded) at
 * 1440 and 390 px with everything revealed, counts four kinds of defect in each, and fails where this
 * tree has MORE than the ref (a defect the ref already had is the page's, not the restyle's):
 *   L1 svg-overlap   two text labels in one SVG whose boxes overlap by more than a quarter of the smaller
 *   L2 svg-outside   an SVG text label reaching more than 3px outside its drawing
 *   L3 spill         an element whose own text is larger than its box (scrollWidth or scrollHeight beyond
 *                    the client box by more than 2px) and that is not a scroll container
 *   L4 ctl-overlap   two visible buttons or links whose boxes overlap by more than 4px each way
 * The fonts are fallbacks (the font host is refused), which makes text slightly WIDER than the hosted
 * faces in most stacks, so this errs towards reporting.
 */
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { REPO, pages } from './css-rules.mjs';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = createRequire(join(process.env.NODE_PATH || '/usr/lib/node_modules', 'x.js'))('playwright')); }
const argv = process.argv.slice(2), REF = resolve(argv[0] || ''); if (!argv[0]) { console.error('usage: layout-audit.mjs <ref-tree>'); process.exit(2); }
const opt = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; }, VERBOSE = argv.includes('--verbose');
const browser = await chromium.launch(); let fail = 0;
async function read(root, p, w) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  await ctx.route(/^https?:/, r => r.abort());
  await ctx.addInitScript(() => { let x = 20261115; Math.random = () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296; }; });
  const page = await ctx.newPage(); await page.goto('file://' + join(root, p), { waitUntil: 'load' });
  await page.keyboard.press('Shift+U').catch(() => {}); await page.evaluate(() => { document.querySelectorAll('details').forEach(d => { d.open = true; });
    const t = [...document.querySelectorAll('#tierbar [data-level]')].sort((x, y) => +x.dataset.level - +y.dataset.level); if (t.length) t[t.length - 1].click();
    const c = document.querySelector('#tierbar [data-core]'); if (c && [...document.querySelectorAll('section.slide.apx')].some(s => s.offsetParent === null)) c.click(); });
  await page.waitForTimeout(350);
  const r = await page.evaluate(() => {
    const out = { 'svg-overlap': {}, 'svg-outside': {}, spill: {}, 'ctl-overlap': {} };
    const add = (k, key) => { out[k][key] = (out[k][key] || 0) + 1; };
    const where = el => { const s = el.closest('section'); const host = el.closest('[id]'); return (s ? '#' + s.id : '') + ' ' + (host && host !== s ? '#' + host.id : ''); };
    const skip = el => !!el.closest('#outline,#outlineToggle,#rail,#topbar');
    for (const svg of document.querySelectorAll('svg')) { if (skip(svg)) continue; const sb = svg.getBoundingClientRect(); if (!sb.width) continue;
      const ts = [...svg.querySelectorAll('text')].filter(t => { const cs = getComputedStyle(t); return cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0.05 && t.textContent.trim(); }).map(t => [t, t.getBoundingClientRect()]).filter(x => x[1].width > 0);
      for (const [t, b] of ts) if (b.left < sb.left - 3 || b.right > sb.right + 3 || b.top < sb.top - 3 || b.bottom > sb.bottom + 3) add('svg-outside', where(svg) + ' "' + t.textContent.trim().slice(0, 18) + '"');
      for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) { const a = ts[i][1], b = ts[j][1]; if (ts[i][0].contains(ts[j][0]) || ts[j][0].contains(ts[i][0])) continue;
        const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left), iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ix <= 0 || iy <= 0) continue;
        if (ix * iy > 0.25 * Math.min(a.width * a.height, b.width * b.height)) add('svg-overlap', where(svg) + ' "' + ts[i][0].textContent.trim().slice(0, 14) + '" x "' + ts[j][0].textContent.trim().slice(0, 14) + '"'); } }
    for (const el of document.body.querySelectorAll('*')) { if (skip(el) || el.namespaceURI !== 'http://www.w3.org/1999/xhtml') continue; const tag = el.tagName.toLowerCase(); if (/^(script|style|textarea|select|input|pre|code)$/.test(tag)) continue;
      if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue; const b = el.getBoundingClientRect(); if (!b.width || !b.height) continue; const cs = getComputedStyle(el);
      if (/auto|scroll/.test(cs.overflowX + cs.overflowY) || cs.display === 'inline') continue;
      if (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) add('spill', where(el) + ' ' + tag + '.' + (el.getAttribute('class') || '').split(/\s+/).slice(0, 2).join('.') + ' "' + el.textContent.trim().slice(0, 16) + '"'); }
    const cs2 = [...document.body.querySelectorAll('button,a')].filter(e => !skip(e)).map(e => [e, e.getBoundingClientRect()]).filter(x => x[1].width > 0 && x[1].height > 0 && getComputedStyle(x[0]).visibility !== 'hidden');
    const byParent = new Map(); for (const c of cs2) { const k = c[0].closest('section,[id]') || document.body; if (!byParent.has(k)) byParent.set(k, []); byParent.get(k).push(c); }
    for (const list of byParent.values()) { if (list.length > 400) continue; for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) { const [x, a] = list[i], [y, b] = list[j]; if (x.contains(y) || y.contains(x)) continue;
      if (getComputedStyle(x).position === 'fixed' || getComputedStyle(y).position === 'fixed') continue;
      const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left), iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ix > 4 && iy > 4) add('ctl-overlap', where(x) + ' "' + x.textContent.trim().slice(0, 14) + '" x "' + y.textContent.trim().slice(0, 14) + '"'); } }
    return out; });
  await ctx.close(); return r;
}
const tot = { was: {}, now: {} };
for (const p of (opt('--pages') ? opt('--pages').split(',') : pages(REPO))) {
  const lines = [];
  for (const w of [1440, 390]) { const A = await read(REF, p, w), B = await read(REPO, p, w);
    for (const k of Object.keys(A)) { const a = Object.values(A[k]).reduce((x, y) => x + y, 0), b = Object.values(B[k]).reduce((x, y) => x + y, 0); tot.was[k] = (tot.was[k] || 0) + a; tot.now[k] = (tot.now[k] || 0) + b;
      const fresh = Object.keys(B[k]).filter(key => (B[k][key] || 0) > (A[k][key] || 0));
      if (b > a || (VERBOSE && fresh.length)) lines.push(k + ' at ' + w + ' px: ' + a + ' -> ' + b + (fresh.length ? '\n          new: ' + fresh.slice(0, VERBOSE ? 40 : 8).join('\n               ') : '')); } }
  if (lines.some(l => / (\d+) -> (\d+)/.test(l) && +l.match(/ (\d+) -> (\d+)/)[2] > +l.match(/ (\d+) -> (\d+)/)[1])) fail++;
  console.log((lines.length ? 'MORE  ' : 'ok    ') + p + (lines.length ? '\n        ' + lines.join('\n        ') : ''));
}
await browser.close();
console.log('\ntotals, ref -> tree: ' + Object.keys(tot.was).map(k => k + ' ' + tot.was[k] + ' -> ' + tot.now[k]).join(', '));
console.log('summary: ' + (fail ? fail + ' page(s) have more layout defects than the ref' : 'no page has more layout defects than the ref'));
process.exit(fail ? 1 : 0);
