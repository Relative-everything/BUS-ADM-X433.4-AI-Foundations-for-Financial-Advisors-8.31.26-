#!/usr/bin/env node
/**
 * contrast-check.mjs: every text colour against the ground it is drawn on, and horizontal overflow.
 *
 *   node docs/design/meridian/contrast-check.mjs [--root dir] [--pages a,b] [--min 4.5] [--verbose] [--json file]
 *
 * Opens each served page in headless Chromium (network refused), at 1440 and 320 px, as loaded and
 * with everything revealed (Shift+U, every <details> open, deepest appendix tier). For every element
 * that has text of its own and is rendered, it takes the computed colour, finds the ground by walking
 * up to the first ancestor with a background colour (compositing alpha on the way), and computes the
 * WCAG 2 contrast ratio. Below --min (4.5) is a failure, grouped by colour pair and reported with a
 * sample selector and a count.
 *   A ground that is an image or a gradient cannot be read this way: reported as "unread", not failed.
 *   Disabled controls and elements with visibility:hidden or opacity 0 are skipped (WCAG exempts
 *   inactive controls). SVG text is measured by its fill against the shape painted under its centre
 *   (found with elementsFromPoint), or the ground behind the <svg> when there is none.
 * Also fails when the page scrolls sideways at 320 px.
 * Exit 1 on any failure.
 */
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { REPO, pages } from './css-rules.mjs';

const argv = process.argv.slice(2);
const opt = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const ROOT = opt('--root') ? resolve(opt('--root')) : REPO, MIN = +(opt('--min') || 4.5);
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = createRequire(join(process.env.NODE_PATH || '/usr/lib/node_modules', 'x.js'))('playwright')); }
const browser = await chromium.launch();
let failed = 0;
for (const p of (opt('--pages') ? opt('--pages').split(',') : pages(ROOT))) {
  const groups = new Map(), unread = new Map(), where = new Map(); let over = 0, measured = 0;
  for (const w of [1440, 320]) for (const state of ['load', 'open']) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    await ctx.route(/^https?:/, r => r.abort());
    const page = await ctx.newPage();
    await page.goto('file://' + join(ROOT, p), { waitUntil: 'load' });
    if (state === 'open') {
      await page.keyboard.press('Shift+U').catch(() => {});
      await page.evaluate(() => {
        document.querySelectorAll('details').forEach(d => { d.open = true; });
        const t = [...document.querySelectorAll('#tierbar [data-level]')].sort((x, y) => +x.dataset.level - +y.dataset.level); if (t.length) t[t.length - 1].click();
        const hidden = () => [...document.querySelectorAll('section.slide.apx')].some(s => s.offsetParent === null);
        const core = document.querySelector('#tierbar [data-core]'); if (core && hidden()) core.click();
      });
    }
    await page.waitForTimeout(200);
    const res = await page.evaluate(() => {
      const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const v = m[1].split(/[,\s/]+/).filter(Boolean).map(Number); return [v[0], v[1], v[2], v.length > 3 ? v[3] : 1]; };
      const over = (top, under) => { const a = top[3]; return [0, 1, 2].map(i => top[i] * a + under[i] * (1 - a)).concat(1); };
      const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
      const ground = el => { const stack = []; let img = false;
        for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const cs = getComputedStyle(e);
          if (cs.backgroundImage && cs.backgroundImage !== 'none') { img = true; break; }
          const b = parse(cs.backgroundColor); if (b && b[3] > 0) { stack.push(b); if (b[3] >= 1) break; } }
        if (img) return null; let g = [255, 255, 255, 1]; for (let i = stack.length - 1; i >= 0; i--) g = over(stack[i], g); return g; };
      const sel = el => { let s = el.tagName.toLowerCase(); if (el.id) s += '#' + el.id; const c = (el.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 3); if (c.length) s += '.' + c.join('.');
        const par = el.parentElement; if (par && !el.id) { let ps = par.tagName.toLowerCase(); if (par.id) ps += '#' + par.id; else { const pc = (par.getAttribute('class') || '').trim().split(/\s+/).filter(Boolean).slice(0, 2); if (pc.length) ps += '.' + pc.join('.'); } s = ps + ' > ' + s; } return s; };
      const out = [], unread = [];
      for (const el of document.body.querySelectorAll('*')) {
        const tag = el.tagName.toLowerCase(); if (tag === 'script' || tag === 'style' || tag === 'noscript') continue;
        if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
        const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        if (el.disabled || el.closest('[disabled],[aria-disabled="true"]')) continue;
        let op = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) op *= +getComputedStyle(e).opacity; if (op === 0) continue;
        const svg = el.namespaceURI === 'http://www.w3.org/2000/svg';
        let fg = parse(svg ? cs.fill : cs.color); if (!fg) continue;
        let g = null;
        if (svg) {   /* the ground of SVG text is the shape painted under it, when there is one */
          el.scrollIntoView({ block: 'center', inline: 'center' }); const q = el.getBoundingClientRect();
          for (const under of document.elementsFromPoint(q.x + q.width / 2, q.y + q.height / 2)) {
            if (under === el || under.contains(el) && under.tagName.toLowerCase() !== 'svg' || /^(text|tspan|g|svg)$/i.test(under.tagName)) continue;
            if (under.namespaceURI !== 'http://www.w3.org/2000/svg') break;
            const us = getComputedStyle(under), f = parse(us.fill); if (f && f[3] * +us.fillOpacity * +us.opacity > 0.05) { const base = ground(el.ownerSVGElement || el) || [255, 255, 255, 1]; g = over([f[0], f[1], f[2], f[3] * +us.fillOpacity * +us.opacity], base); break; }
          }
        }
        if (!g) g = ground(svg ? (el.ownerSVGElement || el) : el); if (!g) { unread.push(sel(el)); continue; }
        fg = over([fg[0], fg[1], fg[2], fg[3] * op], g);
        const a = lum(fg), b = lum(g), ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        /* why: dim = an opacity below 1 on the element or an ancestor (a state the page dims on purpose);
           inline = the colour is in a style attribute or a fill attribute (markup or a page script wrote it);
           svg = SVG text, whose ground is read from the shape under its centre and may be wrong; css = a style rule */
        const inl = svg ? (el.hasAttribute('fill') || !!el.style.fill) : !!el.style.color;
        let inh = false; if (!svg && !inl) for (let e = el.parentElement; e && e !== document.body; e = e.parentElement) { if (e.style && e.style.color) { inh = true; break; } const own = getComputedStyle(e).color; if (own !== cs.color) break; }
        const why = op < 0.999 ? 'dim' : (inl || inh) ? 'inline' : svg ? 'svg' : 'css';
        const q2 = el.getBoundingClientRect();
        out.push([sel(el), fg.slice(0, 3).map(Math.round).join(','), g.slice(0, 3).map(Math.round).join(','), Math.round(ratio * 100) / 100, parseFloat(cs.fontSize), why, [Math.round(q2.x + scrollX), Math.round(q2.y + scrollY), Math.round(q2.width), Math.round(q2.height)]]);
      }
      return { out, unread, over: document.documentElement.scrollWidth - document.documentElement.clientWidth };
    });
    measured += res.out.length;
    for (const [s, fg, g, ratio, size, why, box] of res.out) if (ratio < MIN) { const k = fg + ' on ' + g + '  ' + ratio.toFixed(2) + ':1  [' + why + ']'; if (!groups.has(k)) groups.set(k, new Map()); const m = groups.get(k); m.set(s, (m.get(s) || 0) + 1); if (!where.has(s + k)) where.set(s + k, { sel: s, pair: k, why, w, state, box }); }
    for (const s of res.unread) unread.set(s, (unread.get(s) || 0) + 1);
    if (w === 320 && res.over > 0) over = Math.max(over, res.over);
    await ctx.close();
  }
  const bad = [...groups.values()].reduce((a, m) => a + m.size, 0);
  if (bad || over) failed++;
  console.log((bad || over ? 'FAIL  ' : 'ok    ') + p + '  ' + measured + ' text elements measured' + (bad ? ', ' + bad + ' selector(s) below ' + MIN + ':1' : '') + (over ? ', scrolls sideways by ' + over + ' px at 320' : '') + (unread.size ? ', ' + unread.size + ' on an image or gradient ground (unread)' : ''));
  for (const [k, m] of [...groups].sort()) console.log('        rgb ' + k + '   ' + [...m].slice(0, argv.includes('--verbose') ? 99 : 4).map(([s, n]) => s + ' x' + n).join(' | ') + (m.size > 4 && !argv.includes('--verbose') ? ' | and ' + (m.size - 4) + ' more' : ''));
  if (opt('--json')) { const fs = await import('node:fs'); const prev = fs.existsSync(opt('--json')) ? JSON.parse(fs.readFileSync(opt('--json'), 'utf8')) : {}; prev[p] = [...where.values()]; fs.writeFileSync(opt('--json'), JSON.stringify(prev, null, 1)); }
  if (argv.includes('--verbose')) for (const [s, n] of unread) console.log('        unread  ' + s + ' x' + n);
}
await browser.close();
console.log('\nsummary: ' + (failed ? failed + ' page(s) with a contrast or overflow failure' : 'every measured text colour is ' + MIN + ':1 or better and no page scrolls sideways at 320 px'));
process.exit(failed ? 1 : 0);
