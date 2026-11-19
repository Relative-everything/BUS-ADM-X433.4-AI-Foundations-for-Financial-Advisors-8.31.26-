#!/usr/bin/env node
/**
 * restore-svg-sizes.mjs <ref-tree> [--write]: undo one thing step 2 should not have done.
 *
 * restyle-local.py snapped every font size onto the eight-step scale. For text inside an SVG drawing that
 * is wrong: the size is in the drawing's own units and scales with the figure, and the labels were
 * placed for the size they had. Snapped up (9.5 to 12.5, 11 to 12.5, 13 to 14 ...) they overlap and run
 * outside the drawing (layout-audit.mjs: 18 labels outside, 27 more overlaps, on Sessions 2 and 5).
 *
 * For every page-local rule that sets font-size or font, this asks the page itself, in Chromium, what the
 * selector matches (everything revealed). A rule whose matches are all SVG elements, or that matches
 * nothing and whose subject is text or tspan, is an SVG-text rule; its font-size (or font) declaration is
 * put back to the value the same selector had at the ref. The same is done for the promoted block in
 * assets/components.css, against every page. Nothing else in any rule is touched.
 * The list of rules restored is written to svg-text-rules.json, which ui-audit.mjs reads so that it
 * reports these sizes in their own column, not as off-scale type.
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { REPO, HERE, pages, parse, localRules, splitDecls } from './css-rules.mjs';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = createRequire(join(process.env.NODE_PATH || '/usr/lib/node_modules', 'x.js'))('playwright')); }
const REF = resolve(process.argv[2] || ''), WRITE = process.argv.includes('--write'); if (!process.argv[2]) { console.error('usage: restore-svg-sizes.mjs <ref-tree> [--write]'); process.exit(2); }
const sized = r => r.kind === 'rule' && splitDecls(r.decl).some(([p]) => p === 'font-size' || p === 'font');
const sizeOf = decl => { const m = new Map(splitDecls(decl)); return { 'font-size': m.get('font-size'), font: m.get('font') }; };
const browser = await chromium.launch();
async function svgOnly(p, sels) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } }); await ctx.route(/^https?:/, r => r.abort());
  const page = await ctx.newPage(); await page.goto('file://' + join(REPO, p), { waitUntil: 'load' });
  await page.keyboard.press('Shift+U').catch(() => {}); await page.evaluate(() => { document.querySelectorAll('details').forEach(d => { d.open = true; }); const t = [...document.querySelectorAll('#tierbar [data-level]')].pop(); if (t) t.click(); }); await page.waitForTimeout(300);
  const r = await page.evaluate(sels => sels.map(sel => { const s = sel.replace(/::?(before|after)\b/g, '').replace(/:(hover|focus-visible|focus|active)\b/g, ''); let els = []; try { els = [...document.querySelectorAll(s)]; } catch (e) { return 'bad'; }
    if (els.length) return els.every(e => e.namespaceURI === 'http://www.w3.org/2000/svg' && e.tagName.toLowerCase() !== 'svg') ? 'svg' : 'html';
    return s.split(',').every(x => /(^|[\s>+~])(text|tspan)([.#:\[][^\s>+~]*)?$/.test(x.trim())) ? 'svg' : 'none'; }), sels);
  await ctx.close(); return r;
}
/* the value a selector had at the ref: from any page's local CSS there (the promoted rules came from pages) */
const refVal = new Map();
for (const p of pages(REPO)) for (const r of localRules(readFileSync(join(REF, p), 'utf8'))) if (sized(r)) { const k = p + '|' + r.skey; if (!refVal.has(k)) refVal.set(k, sizeOf(r.decl)); const g = '*|' + r.skey; if (!refVal.has(g)) refVal.set(g, sizeOf(r.decl)); }
const put = (text, r, base, off = 0) => { /* rewrite the font-size / font declaration of the rule text */
  let t = text.slice(r.start - off, r.end - off); const before = t;
  for (const prop of ['font-size', 'font']) if (base[prop] !== undefined) t = t.replace(new RegExp('((?:^|[;{\\s])' + prop + '\\s*:\\s*)[^;}]+'), (m, a) => a + base[prop]);
  return [text.slice(0, r.start - off) + t + text.slice(r.end - off), before !== t]; };
const record = {}; let total = 0;
for (const p of pages(REPO)) {
  const file = join(REPO, p); let html = readFileSync(file, 'utf8'); const rules = localRules(html).filter(sized);
  const kinds = await svgOnly(p, rules.map(r => r.sel)); let n = 0; record[p] = [];
  for (let i = rules.length - 1; i >= 0; i--) { if (kinds[i] !== 'svg') continue; const r = rules[i], base = refVal.get(p + '|' + r.skey); if (!base) continue; const now = sizeOf(r.decl);
    if (now['font-size'] === base['font-size'] && now.font === base.font) { record[p].push(r.skey); continue; }
    const [h2, ch] = put(html, r, base); if (ch) { html = h2; n++; record[p].push(r.skey); } }
  if (WRITE && n) writeFileSync(file, html); total += n; console.log((WRITE ? 'wrote ' : 'would ') + p + '  ' + n + ' SVG-text rule(s) back to their drawing-unit size');
}
/* the promoted block */
const cf = join(HERE, 'assets', 'components.css'); let css = readFileSync(cf, 'utf8'); const k0 = css.indexOf('/* ---- promoted from the pages ----');
const prom = parse(css.slice(k0), k0).filter(sized); const verdict = prom.map(() => new Set());
for (const p of pages(REPO)) { const ks = await svgOnly(p, prom.map(r => r.sel)); ks.forEach((k, i) => verdict[i].add(k)); }
let np = 0; record['assets/components.css'] = [];
for (let i = prom.length - 1; i >= 0; i--) { const v = verdict[i]; if (!v.has('svg') || v.has('html')) continue; const r = prom[i], base = refVal.get('*|' + r.skey); if (!base) continue; const [c2, ch] = put(css, r, base); record['assets/components.css'].push(r.skey); if (ch) { css = c2; np++; } }
if (WRITE && np) writeFileSync(cf, css); console.log((WRITE ? 'wrote ' : 'would ') + 'assets/components.css  ' + np + ' promoted SVG-text rule(s) back');
if (WRITE) writeFileSync(join(HERE, 'svg-text-rules.json'), JSON.stringify(record, null, 1));
await browser.close(); console.log('\nsummary: ' + (total + np) + ' rule(s) ' + (WRITE ? 'restored' : 'to restore'));
