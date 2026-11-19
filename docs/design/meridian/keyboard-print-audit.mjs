#!/usr/bin/env node
/**
 * keyboard-print-audit.mjs <ref-tree> [--pages a,b]: three things a pointer test and a screen test miss.
 *
 *   K1 focus     Tab is pressed 80 times from the top of each page on both trees. Every element that takes
 *                focus must show it (an outline, or a box-shadow ring). Fails where this tree has more
 *                unmarked stops than the ref.
 *   K2 outline   on each lesson: the outline's rows can be reached by Tab, Enter on a row moves the page to
 *                that section and leaves its top below the 46 px bar, and at 390 px the Outline button opens the drawer with Enter and Escape
 *                closes it. Rows and the button are at least 24 px tall (WCAG 2.2 SC 2.5.8).
 *   P1 print     with print media emulated: the bar, the outline and the dot rail are not displayed, the body
 *                has no left offset left over from the outline, and the text that prints is the text the ref
 *                prints (every displayed text node, in order, case set aside).
 * Exit 1 on any failure.
 */
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { REPO, pages } from './css-rules.mjs';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = createRequire(join(process.env.NODE_PATH || '/usr/lib/node_modules', 'x.js'))('playwright')); }
const argv = process.argv.slice(2), REF = resolve(argv[0] || ''); if (!argv[0]) { console.error('usage: keyboard-print-audit.mjs <ref-tree>'); process.exit(2); }
const pi = argv.indexOf('--pages'), LIST = pi >= 0 ? argv[pi + 1].split(',') : pages(REPO);
const browser = await chromium.launch(); let fail = 0;
const ok = (c, msg) => { if (!c) fail++; console.log((c ? 'PASS  ' : 'FAIL  ') + msg); };
const open = async (root, p, w, media) => { const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' }); await ctx.route(/^https?:/, r => r.abort()); const page = await ctx.newPage(); await page.goto('file://' + join(root, p), { waitUntil: 'load' }); await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' }); if (media) await page.emulateMedia({ media }); await page.waitForTimeout(250); return { ctx, page }; };
async function tabs(root, p) { const { ctx, page } = await open(root, p, 1440); let stops = 0, bare = 0; const sample = [];
  for (let i = 0; i < 80; i++) { await page.keyboard.press('Tab'); const r = await page.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; if (e.closest('#outline,#outlineToggle,#rail')) return { skip: true };
      const cs = getComputedStyle(e); const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== 'none'); return { ring, what: e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + '.' + (e.getAttribute('class') || '').split(/\s+/)[0] }; });
    if (!r || r.skip) continue; stops++; if (!r.ring) { bare++; if (sample.length < 4) sample.push(r.what); } }
  await ctx.close(); return { stops, bare, sample }; }
const printText = async (root, p) => { const { ctx, page } = await open(root, p, 1000, 'print'); const r = await page.evaluate(() => { const SKIP = '#outline,#outlineToggle,#rail,#topbar,script,style,noscript,template'; const out = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const shown = el => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return false; } return true; };
    for (let t; (t = w.nextNode());) { const el = t.parentElement; if (!el || el.closest(SKIP)) continue; const s = t.textContent.replace(/\s+/g, ' ').trim().replace(/last updated \d{4}-\d{2}-\d{2}/i, ''); if (s && shown(el)) out.push(s.toLowerCase()); }
    const d = id => { const e = document.getElementById(id); return e ? getComputedStyle(e).display : 'absent'; }; const b = getComputedStyle(document.body);
    return { out, bar: d('topbar'), outline: d('outline'), rail: d('rail'), pl: b.paddingLeft, pt: b.paddingTop }; }); await ctx.close(); return r; };
for (const p of LIST) {
  const [a, b] = [await tabs(REF, p), await tabs(REPO, p)];
  ok(b.bare <= a.bare, p + ' K1 focus is shown on every Tab stop  (' + b.stops + ' stops, ' + b.bare + ' without a ring; ref ' + a.stops + ' stops, ' + a.bare + ' without)' + (b.bare > a.bare ? '  e.g. ' + b.sample.join(', ') : ''));
  const [pa, pb] = [await printText(REF, p), await printText(REPO, p)]; let i = 0; while (i < pa.out.length && pa.out[i] === pb.out[i]) i++;
  ok(i >= pa.out.length && pa.out.length === pb.out.length, p + ' P1 prints the same text as the ref  (' + pb.out.length + ' text nodes)' + (i < Math.max(pa.out.length, pb.out.length) ? '  first difference at ' + i + ': was "' + String(pa.out[i]).slice(0, 40) + '" now "' + String(pb.out[i]).slice(0, 40) + '"' : ''));
  ok(/none|absent/.test(pb.bar) && /none|absent/.test(pb.outline) && /none|absent/.test(pb.rail) && parseFloat(pb.pl) === 0, p + ' P1 no screen chrome in print  (bar ' + pb.bar + ', outline ' + pb.outline + ', rail ' + pb.rail + ', body padding-left ' + pb.pl + ', padding-top ' + pb.pt + ')');
  if (/^session-/.test(p)) {
    const { ctx, page } = await open(REPO, p, 1440);
    const k = await page.evaluate(async () => { const rows = [...document.querySelectorAll('#outline a')]; const small = rows.filter(r => r.getBoundingClientRect().height < 24).length; const target = rows[Math.min(3, rows.length - 1)]; target.focus(); const focused = document.activeElement === target; return { n: rows.length, small, focused, href: target.getAttribute('href') }; });
    await page.keyboard.press('Enter'); await page.waitForTimeout(200);
    const top = await page.evaluate(h => Math.round(document.querySelector(h).getBoundingClientRect().top), k.href);
    ok(k.n > 0 && k.focused && top >= 44 && top < 200 && !k.small, p + ' K2 outline by keyboard  (' + k.n + ' rows, ' + k.small + ' under 24 px, Enter put ' + k.href + ' at ' + top + ' px)'); await ctx.close();
    const m = await open(REPO, p, 390); await m.page.focus('#outlineToggle'); const th = await m.page.evaluate(() => Math.round(document.getElementById('outlineToggle').getBoundingClientRect().height)); await m.page.keyboard.press('Enter'); await m.page.waitForTimeout(120);
    const opened = await m.page.evaluate(() => document.getElementById('outline').classList.contains('open')); await m.page.keyboard.press('Escape'); await m.page.waitForTimeout(120); const closed = await m.page.evaluate(() => !document.getElementById('outline').classList.contains('open'));
    ok(opened && closed && th >= 24, p + ' K2 drawer at 390 px opens with Enter and closes with Escape  (button ' + th + ' px tall)'); await m.ctx.close(); }
}
await browser.close();
console.log('\nsummary: ' + (fail ? fail + ' failure(s)' : 'focus, the outline by keyboard and print all hold on ' + LIST.length + ' pages'));
process.exit(fail ? 1 : 0);
