#!/usr/bin/env node
/**
 * style-snapshot.mjs: records what every element on every served page computes to, and compares two records.
 *
 *   node docs/design/meridian/style-snapshot.mjs take <out-dir> [--root <dir>] [--pages a,b] [--shots <dir>]
 *   node docs/design/meridian/style-snapshot.mjs diff <dir-a> <dir-b> [--max 40] [--ignore prop,prop]
 *
 * take   opens each page from disk in headless Chromium with every network request refused (so the
 *        record does not depend on whether the font host answered), at 1440, 1024 and 320 CSS px, in
 *        two states: "load" (as opened) and "open" (Shift+U pressed where the page has the override,
 *        every <details> opened, the deepest depth tier chosen), so answer panels and appendix
 *        sections are measured as well. Math.random is seeded so a page that draws at random draws
 *        the same thing in both records. For every element, and its ::before and ::after when they
 *        render, it stores every computed longhand plus the border box. One JSON file per page.
 *        --shots also saves a full-page PNG per page at 1440 and 390 px (state "load").
 * diff   exit 0 when the two records agree; otherwise prints, per page, width and state, how many
 *        elements differ and the first --max differences as  path  property: before -> after.
 *
 * What it cannot see: states no element is in when recorded (hover, focus, a class a script adds on a
 * click that was not made) and elements a script builds later. consolidate.mjs covers the first gap
 * for the moves it makes by refusing any move a rule of equal specificity could reverse.
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { REPO, pages } from './css-rules.mjs';

const argv = process.argv.slice(2);
const opt = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const WIDTHS = [1440, 1024, 320];

async function take(outDir) {
  const require = createRequire(import.meta.url);
  let chromium;
  try { ({ chromium } = require('playwright')); }
  catch { ({ chromium } = createRequire(join(process.env.NODE_PATH || '/usr/lib/node_modules', 'x.js'))('playwright')); }
  const ROOT = opt('--root') ? resolve(opt('--root')) : REPO;
  const list = opt('--pages') ? opt('--pages').split(',') : pages(ROOT);
  const shots = opt('--shots') ? resolve(opt('--shots')) : null;
  mkdirSync(outDir, { recursive: true }); if (shots) mkdirSync(shots, { recursive: true });
  const browser = await chromium.launch();
  for (const p of list) {
    const rec = { page: p, views: {} }, dict = new Map(), styles = [];
    for (const w of WIDTHS) {
      for (const state of ['load', 'open']) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
        await ctx.route(/^https?:/, r => r.abort());
        /* a page that draws with Math.random must draw the same thing in both records */
        await ctx.addInitScript(() => { let x = 20261115; Math.random = () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296; }; });
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
        await page.waitForTimeout(250);
        const els = await page.evaluate(() => {
          const out = [], seen = new Map();
          const path = el => { const parts = []; for (let e = el; e && e.nodeType === 1 && e !== document.documentElement; e = e.parentElement) {
            if (e.id) { parts.unshift(e.tagName.toLowerCase() + '#' + e.id); break; }
            let i = 1; for (let s = e.previousElementSibling; s; s = s.previousElementSibling) i++;
            parts.unshift(e.tagName.toLowerCase() + ':' + i); } return parts.join('>') || 'html'; };
          const grab = (cs) => { let s = ''; for (let i = 0; i < cs.length; i++) { const n = cs[i]; if (n.startsWith('--')) continue; s += n + ':' + cs.getPropertyValue(n) + ';'; } return s; };
          for (const el of document.querySelectorAll('*')) {
            const tag = el.tagName.toLowerCase();
            if (tag === 'script' || tag === 'style' || tag === 'head' || tag === 'meta' || tag === 'link' || tag === 'title') continue;
            let k = path(el); const n = (seen.get(k) || 0) + 1; seen.set(k, n); if (n > 1) k += '~' + n;
            const r = el.getBoundingClientRect();
            out.push([k, grab(getComputedStyle(el)), [Math.round(r.x * 2) / 2, Math.round(r.width * 2) / 2, Math.round(r.height * 2) / 2].join(',')]);
            for (const ps of ['::before', '::after']) { const cs = getComputedStyle(el, ps); const c = cs.content; if (c && c !== 'none' && c !== 'normal') out.push([k + ps, grab(cs), '']); }
          }
          return out;
        });
        const hs = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        rec.views[w + '/' + state] = { hscroll: hs, els: els.map(([k, s, box]) => { let id = dict.get(s); if (id === undefined) { id = styles.length; dict.set(s, id); styles.push(s); } return [k, id, box]; }) };
        await ctx.close();
      }
    }
    rec.styles = styles;
    writeFileSync(join(outDir, p.replace(/\//g, '_') + '.json'), JSON.stringify(rec));
    const n = Object.values(rec.views).reduce((a, v) => a + v.els.length, 0);
    console.log('took  ' + p + '  ' + n + ' element records, ' + styles.length + ' distinct styles');
    if (shots) for (const w of [1440, 390]) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
      const page = await ctx.newPage(); await page.goto('file://' + join(ROOT, p), { waitUntil: 'load' });
      await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {}); await page.waitForTimeout(400);
      await page.screenshot({ path: join(shots, p.replace(/\//g, '_').replace(/\.html$/, '') + '-' + w + '.png'), fullPage: true });
      await ctx.close();
    }
  }
  await browser.close();
}

function diff(a, b) {
  /* perspective-origin and transform-origin are half the box, so they repeat it; and the box of SVG text
     wobbles by a fraction of a pixel between two records of the same file (measured: 3 of 14,073 on
     Session 3), so boxes within 1px are the same box. Every real change also shows in a property. */
  const MAX = +(opt('--max') || 40), IGN = new Set(['perspective-origin', 'transform-origin', ...(opt('--ignore') || '').split(',').filter(Boolean)]);
  const near = (x, y) => { if (x === y) return true; const a = x.split(','), b = y.split(','); return a.length === b.length && a.every((v, i) => Math.abs(+v - +b[i]) <= 1); };
  const kv = s => { const m = new Map(); for (const d of s.split(';')) { const i = d.indexOf(':'); if (i > 0) m.set(d.slice(0, i), d.slice(i + 1)); } return m; };
  let bad = 0, pagesBad = 0;
  const files = readdirSync(a).filter(f => f.endsWith('.json')).sort();
  for (const f of files) {
    if (!existsSync(join(b, f))) { console.log('FAIL  ' + f + '  missing from ' + b); bad++; continue; }
    const A = JSON.parse(readFileSync(join(a, f), 'utf8')), B = JSON.parse(readFileSync(join(b, f), 'utf8'));
    let pageBad = 0; const lines = [], props = new Map();
    for (const view of Object.keys(A.views)) {
      const va = A.views[view], vb = B.views[view]; if (!vb) { lines.push(view + '  view missing'); pageBad++; continue; }
      const mb = new Map(vb.els.map(e => [e[0], e])); let n = 0;
      if (va.els.length !== vb.els.length) { lines.push(view + '  element count ' + va.els.length + ' -> ' + vb.els.length); pageBad++; }
      for (const [k, sid, box] of va.els) {
        const e = mb.get(k); if (!e) { n++; if (lines.length < MAX) lines.push(view + '  ' + k + '  element missing'); continue; }
        const sa = A.styles[sid], sb = B.styles[e[1]];
        if (sa === sb && (near(box, e[2]) || IGN.has('box'))) continue;
        const ma = kv(sa), mb2 = kv(sb), ch = [];
        for (const [p, v] of ma) if (mb2.get(p) !== v && !IGN.has(p)) { ch.push(p + ': ' + v + ' -> ' + mb2.get(p)); props.set(p, (props.get(p) || 0) + 1); }
        if (!near(box, e[2]) && !IGN.has('box')) { ch.push('box x,w,h: ' + box + ' -> ' + e[2]); props.set('box', (props.get('box') || 0) + 1); }
        if (!ch.length) continue;
        n++; if (lines.length < MAX) lines.push(view + '  ' + k + '\n          ' + ch.slice(0, 6).join('\n          ') + (ch.length > 6 ? '\n          and ' + (ch.length - 6) + ' more' : ''));
      }
      if (n) { pageBad += n; lines.push(view + '  ' + n + ' element(s) differ'); }
      if (va.hscroll !== vb.hscroll) lines.push(view + '  horizontal overflow ' + va.hscroll + ' -> ' + vb.hscroll + ' px');
    }
    if (pageBad) { pagesBad++; bad += pageBad; console.log('DIFF  ' + A.page + '  ' + pageBad + ' difference(s)\n        ' + lines.join('\n        '));
      console.log('        by property: ' + [...props].sort((x, y) => y[1] - x[1]).map(([p, n]) => p + " " + n).join(', ')); }
    else console.log('same  ' + A.page);
  }
  console.log('\nsummary: ' + (bad ? bad + ' difference(s) on ' + pagesBad + ' page(s)' : 'snapshots agree on ' + files.length + ' pages'));
  process.exit(bad ? 1 : 0);
}

if (argv[0] === 'take' && argv[1]) await take(resolve(argv[1]));
else if (argv[0] === 'diff' && argv[2]) diff(resolve(argv[1]), resolve(argv[2]));
else { console.error('usage: style-snapshot.mjs take <out-dir> [--root dir] [--pages a,b] [--shots dir] | diff <a> <b>'); process.exit(2); }
