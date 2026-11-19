#!/usr/bin/env node
/**
 * render-audit.mjs <ref-tree>: the rendered half of the content audit. source-audit.py proves the markup
 * and scripts are the same; this asks what CSS did to what a reader sees.
 *
 *   git worktree add <dir> $(cat docs/design/meridian/FREEZE_REF)
 *   node docs/design/meridian/render-audit.mjs <dir>
 *
 * Each served page is opened from both trees in headless Chromium (network refused, Math.random seeded),
 * at 1440 and 390 px, as loaded and with everything revealed. The outline, its button, the bar the
 * generator added and the retired dot rail are set aside (they are the intended chrome changes) and then:
 *   R1 DOM text      every text node, in order, exact                        must be identical
 *   R2 visible text  what is displayed (display, visibility, [hidden]), in order, compared without case
 *                    and line breaks (text-transform and wrapping are style)    must be identical
 *   R3 generated     every ::before / ::after content string, counted         differences are listed
 *   R4 controls      visible buttons, links, fields; and how many are enabled   must be identical
 *   R5 media         visible img, svg, canvas elements                         must be identical
 *   R6 clipping      elements whose own text is cut off by overflow:hidden     may not rise
 * Exit 1 if R1, R2, R4, R5 or R6 fails. R3 is reported for a human read, because a chip's dot is new by design.
 */
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { REPO, pages } from './css-rules.mjs';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = createRequire(join(process.env.NODE_PATH || '/usr/lib/node_modules', 'x.js'))('playwright')); }
const REF = resolve(process.argv[2] || ''); if (!process.argv[2]) { console.error('usage: render-audit.mjs <ref-tree>'); process.exit(2); }
const browser = await chromium.launch(); let fail = 0;
async function read(root, p, w, state) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  await ctx.route(/^https?:/, r => r.abort());
  await ctx.addInitScript(() => { let x = 20261115; Math.random = () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296; }; });
  const page = await ctx.newPage(); await page.goto('file://' + join(root, p), { waitUntil: 'load' });
  if (state === 'open') { await page.keyboard.press('Shift+U').catch(() => {}); await page.evaluate(() => { document.querySelectorAll('details').forEach(d => { d.open = true; });
    const t = [...document.querySelectorAll('#tierbar [data-level]')].sort((x, y) => +x.dataset.level - +y.dataset.level); if (t.length) t[t.length - 1].click();
    const c = document.querySelector('#tierbar [data-core]'); if (c && [...document.querySelectorAll('section.slide.apx')].some(s => s.offsetParent === null)) c.click(); }); }
  await page.waitForTimeout(300);
  const r = await page.evaluate(() => {
    const skip = el => !!el.closest('#outline,#outlineToggle,#rail,#topbar[data-outline-bar],script,style,noscript,template');
    const shown = el => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.visibility === 'collapse') return false; } return true; };
    const dom = [], vis = [], gen = {}, w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = w.nextNode());) { const el = n.parentElement; if (!el || skip(el)) continue; const t = n.textContent.replace(/\s+/g, ' ').trim().replace(/Last updated \d{4}-\d{2}-\d{2}/, 'Last updated DATE'); if (!t) continue; dom.push(t); if (shown(el)) vis.push(t.toLowerCase()); }
    let ctl = 0, on = 0, media = 0, clip = 0; const clipped = [];
    for (const el of document.body.querySelectorAll('*')) { if (skip(el)) continue;
      for (const ps of ['::before', '::after']) { const c = getComputedStyle(el, ps).content; if (c && c !== 'none' && c !== 'normal' && c !== '""') gen[c] = (gen[c] || 0) + 1; }
      const tag = el.tagName.toLowerCase(); const v = shown(el) && el.getBoundingClientRect().width > 0;
      if (/^(button|a|input|select|textarea)$/.test(tag) && v) { ctl++; if (!el.disabled) on++; }
      if (/^(img|svg|canvas)$/.test(tag) && v) media++;
      if (v && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) { const cs = getComputedStyle(el); if (/hidden|clip/.test(cs.overflowX + cs.overflowY) && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) && cs.textOverflow !== 'ellipsis') { clip++; if (clipped.length < 6) clipped.push(tag + '.' + (el.getAttribute('class') || '').split(/\s+/).slice(0, 2).join('.') + ' "' + el.textContent.trim().slice(0, 30) + '"'); } }
    }
    return { dom, vis, gen, ctl, on, media, clip, clipped };
  });
  await ctx.close(); return r;
}
const firstDiff = (a, b) => { let i = 0; while (i < a.length && a[i] === b[i]) i++; return i >= a.length && a.length === b.length ? null : 'at item ' + i + ' of ' + a.length + '/' + b.length + '\n          was: ' + a.slice(Math.max(0, i - 1), i + 3).join(' | ').slice(0, 220) + '\n          now: ' + b.slice(Math.max(0, i - 1), i + 3).join(' | ').slice(0, 220); };
const genAll = { was: {}, now: {} };
for (const p of pages(REPO)) {
  const lines = []; let nText = 0;
  for (const w of [1440, 390]) for (const state of ['load', 'open']) {
    const A = await read(REF, p, w, state), B = await read(REPO, p, w, state), v = w + '/' + state; nText = Math.max(nText, B.dom.length);
    const d1 = firstDiff(A.dom, B.dom); if (d1) lines.push('R1 DOM text ' + v + ' ' + d1);
    /* visible text: wrapping changes can split or join nothing (nodes are per text node), so compare as joined strings */
    const d2 = firstDiff(A.vis, B.vis); if (d2) lines.push('R2 visible text ' + v + ' ' + d2);
    if (A.ctl !== B.ctl || A.on !== B.on) lines.push('R4 controls ' + v + ' visible ' + A.ctl + ' -> ' + B.ctl + ', enabled ' + A.on + ' -> ' + B.on);
    if (A.media !== B.media) lines.push('R5 media ' + v + ' ' + A.media + ' -> ' + B.media);
    if (B.clip > A.clip) lines.push('R6 clipped text ' + v + ' ' + A.clip + ' -> ' + B.clip + ': ' + B.clipped.join('; '));
    for (const [k, n] of Object.entries(A.gen)) genAll.was[k] = (genAll.was[k] || 0) + n; for (const [k, n] of Object.entries(B.gen)) genAll.now[k] = (genAll.now[k] || 0) + n;
  }
  if (lines.length) fail++; console.log((lines.length ? 'DIFF  ' : 'same  ') + p + '  ' + nText + ' text nodes, 4 views' + (lines.length ? '\n        ' + lines.join('\n        ') : ''));
}
const gk = [...new Set([...Object.keys(genAll.was), ...Object.keys(genAll.now)])].filter(k => (genAll.was[k] || 0) !== (genAll.now[k] || 0));
console.log('\nR3 generated content that differs in count (string: before -> after), all pages and views:'); for (const k of gk.sort()) console.log('        ' + k.slice(0, 60) + ': ' + (genAll.was[k] || 0) + ' -> ' + (genAll.now[k] || 0)); if (!gk.length) console.log('        none');
await browser.close();
console.log('\nsummary: ' + (fail ? fail + ' page(s) differ in what a reader sees' : 'what a reader sees is the same on all ' + pages(REPO).length + ' pages (text, visibility, controls, media, clipping)'));
process.exit(fail ? 1 : 0);
