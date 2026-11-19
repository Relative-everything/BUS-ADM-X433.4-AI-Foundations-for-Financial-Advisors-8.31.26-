#!/usr/bin/env node
/**
 * interaction-audit.mjs <ref-tree> [--pages a,b] [--widths 1440,390] [--minutes 12] [--progress] [--verbose]
 * Differential test of behaviour: the restyled page must DO what the page before it did.
 *
 * Each served page is opened from the ref tree and from this tree, side by side, in headless Chromium
 * (network refused, Math.random seeded, the date fixed, and a clipboard that always succeeds, because a
 * headless page's own clipboard is refused at its own pace). Where the two pages disagree after a step
 * they are given up to 2.6 s to come to rest and read again, since a timer can fire on one a moment early. The same
 * script of real user input is then played on both, one step at a time:
 *   every visible, enabled control in document order gets a real pointer click (Playwright scrolls it
 *   into view and refuses to click what is covered; a control is found by its place in the page, so one
 *   that a component rebuilt after the last click is still found); text fields and text areas are typed into; range
 *   sliders are moved with the arrow keys; selects take their second option; then Shift+U, Tab and
 *   Escape. Controls a page builds in answer to a click are found on the next pass and used in turn,
 *   for up to ten passes. The sweep runs twice on a lesson: as loaded (core only), then with the appendix
 *   opened to its deepest tier; the depth buttons themselves are clicked last.
 * After every step both pages are read (every text node, what is visible, how many controls are visible
 * and enabled, any script error) and must agree. A step that works on the ref and cannot be performed
 * here (a control now covered or off screen) is a failure; so is any difference in what the page shows.
 * The outline, its button, the retired dot rail and the bar added to Sessions 3 to 5 are set aside, as in
 * render-audit.mjs; links that leave the page are compared by href and not followed.
 * Exit 1 on any difference.
 */
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';
import { REPO, pages } from './css-rules.mjs';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = createRequire(join(process.env.NODE_PATH || '/usr/lib/node_modules', 'x.js'))('playwright')); }
const argv = process.argv.slice(2), REF = resolve(argv[0] || ''); if (!argv[0]) { console.error('usage: interaction-audit.mjs <ref-tree>'); process.exit(2); }
const opt = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; }, VERBOSE = argv.includes('--verbose');
const WIDTHS = (opt('--widths') || '1440,390').split(',').map(Number), MAXSTEPS = +(opt('--max') || 1500);
/* Regions whose text depends on WHEN it is read, not on what the reader did: Session 3's turning cube is drawn
   frame by frame in real time and its readout reports the on-screen distance at the angle of that instant. Two
   pages cannot be read at the same instant, so these two elements are left out of the text comparison. Their
   controls are still clicked and everything outside them is still compared. */
const VOLATILE = '#cubeWrap,#cubeOut';
const browser = await chromium.launch(); let failPages = 0; const grand = { steps: 0, clicks: 0, typed: 0, keys: 0, both: 0, scripted: 0 };

async function open(root, p, w) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  await ctx.route(/^https?:/, r => r.abort());
  /* the clipboard is refused in a headless page and answers at its own pace; give both pages one that always works */
  await ctx.addInitScript(() => { try { Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.resolve(), readText: () => Promise.resolve('') }, configurable: true }); } catch (e) {} document.execCommand = () => true; });
  await ctx.addInitScript(() => { let x = 20261115; Math.random = () => { x = (x * 1664525 + 1013904223) % 4294967296; return x / 4294967296; }; });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(String(e).slice(0, 120)));
  /* the date is fixed so both pages read the same day; timers run in real time, because a stepped clock also
     stops the frames Playwright waits on before it will click */
  await page.clock.setFixedTime(new Date('2026-11-19T17:00:00Z'));
  await page.goto('file://' + join(root, p), { waitUntil: 'load' });
  /* both versions scroll smoothly (html{scroll-behavior:smooth}); a click made while the page is still gliding
     to an anchor is refused as "not stable", on whichever page has further to go. Scroll at once on both. */
  await page.addStyleTag({ content: 'html,body,*{scroll-behavior:auto!important}' }); await page.waitForTimeout(400);
  /* A control is named by where it is: the nearest ancestor with an id, then tag and position at each level
     down to it. Many components rebuild their buttons on every click, so a mark left on an element would be
     lost; a position survives. Chrome that only this tree has is left out of the count, so both trees agree. */
  await page.evaluate(() => { const SKIP = '#outline,#outlineToggle,#rail,#topbar[data-outline-bar]';
    window.__SEL = 'button,input,select,textarea,a[href],[role=button],[tabindex]:not([tabindex="-1"]),summary,svg [data-i],svg .cr-hit,svg rect[class*="port"],svg rect[class*="col"]';
    window.__path = el => { const parts = []; for (let e = el; e && e !== document.body && e.nodeType === 1; e = e.parentElement) { if (e.id) { parts.unshift('#' + e.id); return parts.join('>'); }
        let i = 1; for (let x = e.previousElementSibling; x; x = x.previousElementSibling) if (x.tagName === e.tagName && !x.matches(SKIP)) i++; parts.unshift(e.tagName.toLowerCase() + ':' + i); } parts.unshift('body'); return parts.join('>'); };
    window.__controls = () => [...document.querySelectorAll(window.__SEL)].filter(el => !el.closest(SKIP));
    window.__mark = key => { for (const o of document.querySelectorAll('[data-ia-now]')) o.removeAttribute('data-ia-now'); const el = window.__controls().find(e => window.__path(e) === key); if (el) { el.setAttribute('data-ia-now', '1'); el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' }); } return !!el; }; });
  return { ctx, page, errs };
}
const state = page => page.evaluate(VOL => { const SKIP = '#outline,#outlineToggle,#rail,#topbar[data-outline-bar],script,style,noscript,template,' + VOL;
  const shown = el => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return false; } return true; };
  let h = 0, hv = 0, n = 0, nv = 0; const add = (x, s) => { for (let i = 0; i < s.length; i++) x = (Math.imul(x, 31) + s.charCodeAt(i)) | 0; return x; };
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const sample = [];
  for (let t; (t = w.nextNode());) { const el = t.parentElement; if (!el || el.closest(SKIP)) continue; const s = t.textContent.replace(/\s+/g, ' ').trim().replace(/Last updated \d{4}-\d{2}-\d{2}/, ''); if (!s) continue; h = add(h, s); n++; if (shown(el)) { hv = add(hv, s.toLowerCase()); nv++; } }
  let ctl = 0, on = 0, vals = 0; for (const el of window.__controls()) { const b = el.getBoundingClientRect(); if (b.width > 0 && shown(el)) { ctl++; if (!el.disabled) on++; } if ('value' in el && typeof el.value === 'string') vals = add(vals, el.value); if (el.checked) vals = add(vals, 'c'); }
  const cls = add(0, [...document.querySelectorAll('[data-task] *')].filter(e => !e.closest(VOL)).slice(0, 6000).map(e => e.getAttribute('class') || '').join('|'));
  return [h, n, hv, nv, ctl, on, vals, cls, document.querySelectorAll('*').length - document.querySelectorAll(SKIP + ',' + SKIP.split(',').slice(0, 4).map(s => s + ' *').join(',')).length].join(','); }, VOLATILE);
const visibleText = page => page.evaluate(VOL => { const SKIP = '#outline,#outlineToggle,#rail,#topbar[data-outline-bar],script,style,noscript,template,' + VOL; const out = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const shown = el => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return false; } return true; };
  for (let t; (t = w.nextNode());) { const el = t.parentElement; if (!el || el.closest(SKIP)) continue; const s = t.textContent.replace(/\s+/g, ' ').trim().replace(/Last updated \d{4}-\d{2}-\d{2}/, ''); if (s && shown(el)) out.push(s.toLowerCase()); } return out; }, VOLATILE);
const todo = page => page.evaluate(() => { const out = []; for (const el of window.__controls()) { const b = el.getBoundingClientRect(); const cs = getComputedStyle(el); let vis = b.width > 0 && b.height > 0 && cs.visibility !== 'hidden';
    for (let e = el; vis && e && e.nodeType === 1; e = e.parentElement) if (getComputedStyle(e).display === 'none') vis = false;
    const tag = el.tagName.toLowerCase(); out.push({ i: window.__path(el), tag, type: el.type || '', vis, dis: !!el.disabled, href: tag === 'a' ? String(el.getAttribute('href')).replace(/^blob:.*/, 'blob:') : null, label: (el.textContent || el.getAttribute('aria-label') || el.placeholder || el.id || '').replace(/\s+/g, ' ').trim().slice(0, 28) }); } return out; });
async function act(P, c, T = 900) { if (!(await P.page.evaluate(k => window.__mark(k), c.i))) return 'GONE'; const loc = P.page.locator('[data-ia-now]');
  try {
    if (c.tag === 'textarea' || (c.tag === 'input' && /^(text|search|number|email|password|)$/.test(c.type))) { await loc.fill('Audit 42', { timeout: T }); return 'typed'; }
    if (c.tag === 'input' && c.type === 'range') { await loc.focus({ timeout: T }); await P.page.keyboard.press('ArrowRight'); await P.page.keyboard.press('ArrowRight'); return 'key'; }
    if (c.tag === 'select') { await loc.selectOption({ index: 1 }, { timeout: T }); return 'typed'; }
    /* an SVG group is a dot and its label; its middle can be empty space. A reader clicks the dot or the word: so does this */
    if (c.tag === 'g') { await P.page.locator('[data-ia-now] circle, [data-ia-now] rect, [data-ia-now] text, [data-ia-now] path').first().click({ timeout: T }); return 'click'; }
    await loc.click({ timeout: T }); return 'click';
  } catch (e) { const L = String(e).split('\n'); const why = L.find(x => /intercepts pointer|not visible|not stable|outside of the viewport|not enabled/.test(x)) || L[0]; return 'FAILED ' + why.replace(/\u001b\[\d+m/g, '').trim().slice(0, 150); } }
async function settle(P) { await P.page.waitForTimeout(90); }
/* a dialog that covers the page (the case viewer) is closed after it has been compared */
const closeDialog = async P => { const open = await P.page.evaluate(() => { const m = document.getElementById('caseModal'); return !!m && getComputedStyle(m).display !== 'none'; }); if (open) { await P.page.keyboard.press('Escape'); await settle(P); } return open; };

for (const p of (opt('--pages') ? opt('--pages').split(',') : pages(REPO))) {
  const issues = [], why = {}; const tally = { steps: 0, clicks: 0, typed: 0, keys: 0, both: 0, scripted: 0 };
  for (const w of WIDTHS) {
    const A = await open(REF, p, w), B = await open(REPO, p, w); const done = new Set(); const t0 = Date.now(), BUDGET = +(opt('--minutes') || 12) * 60000;
    const cmp = async label => { let [a, b] = await Promise.all([state(A.page), state(B.page)]);
      /* a timer may have fired on one page a moment before the other: let both come to rest and read again */
      for (const ms of [400, 2200]) { if (a === b) break; await A.page.waitForTimeout(ms); [a, b] = await Promise.all([state(A.page), state(B.page)]); }
      if (a !== b) { let detail = ''; const [ta, tb] = await Promise.all([visibleText(A.page), visibleText(B.page)]); let i = 0; while (i < ta.length && ta[i] === tb[i]) i++;
          detail = i < Math.max(ta.length, tb.length) ? ' | visible text item ' + i + ': was "' + String(ta[i]).slice(0, 50) + '" now "' + String(tb[i]).slice(0, 50) + '"' : ' | state [text hash, text nodes, visible hash, visible nodes, controls visible, enabled, field values, classes, elements] ' + a + ' vs ' + b; issues.push(w + ' px after ' + label + detail); return false; } return true; };
    await cmp('load');
    let aborted = false; const tier = c => c.i.startsWith('#tierbar');
    const sweep = async phase => { for (let pass = 0; pass < 10 && !aborted; pass++) {
      /* the two lists must name the same controls in the same order */
      let [la, lb] = await Promise.all([todo(A.page), todo(B.page)]); const keyOf = l => l.map(c => c.i + '|' + c.label).join('\n');
      /* a button showing "Copied" for a second on one page and already back to "Copy" on the other: wait for both to rest */
      if (keyOf(la) !== keyOf(lb)) { await A.page.waitForTimeout(2600); [la, lb] = await Promise.all([todo(A.page), todo(B.page)]); }
      const ka = keyOf(la), kb = keyOf(lb); if (ka !== kb) { const x = la.findIndex((c, j) => !lb[j] || lb[j].i !== c.i || lb[j].label !== c.label); issues.push(w + ' px pass ' + pass + ': control lists differ at ' + x + ': ' + (la[x] ? la[x].i + ' "' + la[x].label + '"' : 'none') + ' on the ref, ' + (lb[x] ? lb[x].i + ' "' + lb[x].label + '"' : 'none') + ' here'); break; }
      /* a control is done once it has been used; one that is hidden or disabled now is looked at again on the next pass and in the next phase */
      const fresh = la.map((c, j) => [c, lb[j]]).filter(([c]) => !done.has(c.i + '|' + c.label) && !tier(c)); let used = 0;
      for (const [c, d] of fresh) {
        if (c.href !== null) { if (!d || d.href !== c.href) issues.push(w + ' px link ' + c.i + ' href differs'); if (!/^#/.test(c.href || '')) { done.add(c.i + '|' + c.label); continue; } }
        if (c.vis !== d.vis || c.dis !== d.dis) { issues.push(w + ' px control ' + c.i + ' "' + c.label + '": visible/disabled ' + c.vis + '/' + c.dis + ' on the ref, ' + d.vis + '/' + d.dis + ' here'); continue; }
        if (!c.vis || c.dis) continue;
        done.add(c.i + '|' + c.label); used++;
        if (Date.now() - t0 > BUDGET) { aborted = true; issues.push(w + ' px: time budget reached after ' + tally.steps + ' steps; controls from ' + c.i + ' on were not used'); break; }
        let [ra, rb] = await Promise.all([act(A, c), act(B, c)]); tally.steps++;
        /* one worked and one did not: the one that did not gets a patient second try before it is called a difference */
        if (ra.startsWith('FAILED') !== rb.startsWith('FAILED')) { if (ra.startsWith('FAILED')) ra = await act(A, c, 6000); else rb = await act(B, c, 6000); }
        if (argv.includes('--progress') && tally.steps % 20 === 0) console.error('  ' + p + ' ' + w + ' px  step ' + tally.steps + '  control ' + c.i + ' "' + c.label + '"  ' + Math.round((Date.now() - t0) / 1000) + ' s  issues ' + issues.length);
        if (ra === 'GONE' && rb === 'GONE') { tally.steps--; done.delete(c.i + '|' + c.label); continue; }   /* an earlier step rebuilt or removed it on both; the next pass picks up what replaced it */
        if ((ra === 'GONE') !== (rb === 'GONE')) { issues.push(w + ' px control ' + c.i + ' "' + c.label + '": still there on one version and gone on the other'); continue; }
        if (ra.startsWith('FAILED') && rb.startsWith('FAILED')) { tally.both++; why[ra.replace(/^FAILED\s*-?\s*/, '').replace(/<[^>]*>…<\/[^>]*>/, 'an element').slice(0, 60)] = (why[ra.replace(/^FAILED\s*-?\s*/, '').replace(/<[^>]*>…<\/[^>]*>/, 'an element').slice(0, 60)] || 0) + 1; 
          /* neither version lets a pointer reach it (something sits over it in both). Its behaviour is still compared: the element's own click() on both */
          const sc = P => P.page.evaluate(() => { const e = document.querySelector('[data-ia-now]'); if (!e || e.disabled) return false; if (typeof e.click === 'function') e.click(); else e.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window })); return true; });
          const [xa, xb] = await Promise.all([sc(A), sc(B)]); if (xa !== xb) issues.push(w + ' px control ' + c.i + ' "' + c.label + '": scripted click possible on one version only'); if (xa && xb) { tally.scripted++; await Promise.all([settle(A), settle(B)]); await cmp('scripted click on ' + c.i + ' "' + c.label + '"'); const [da, db] = await Promise.all([closeDialog(A), closeDialog(B)]); if (da !== db) issues.push(w + ' px: a dialog opened on one version only'); }
          continue; }
        if (ra.startsWith('FAILED') !== rb.startsWith('FAILED')) { issues.push(w + ' px control ' + c.i + ' <' + c.tag + '> "' + c.label + '": ' + (rb.startsWith('FAILED') ? 'works on the ref, cannot be used here: ' + rb : 'could not be used on the ref and can here')); }
        else { if (ra === 'click') tally.clicks++; else if (ra === 'typed') tally.typed++; else tally.keys++; }
        await Promise.all([settle(A), settle(B)]);
        const same = await cmp('control ' + c.i + ' <' + c.tag + '> "' + c.label + '"');
        const [da, db] = await Promise.all([closeDialog(A), closeDialog(B)]); if (da !== db) issues.push(w + ' px control ' + c.i + ' "' + c.label + '": a dialog opened on one version only');
        if (!same && issues.length > 12) { aborted = true; break; }
        if (tally.steps >= MAXSTEPS * WIDTHS.length) { aborted = true; issues.push(w + ' px: step limit reached, ' + 'some' + ' control(s) of this pass not used'); break; }
      }
      if (!used) break;
    } };
    await sweep('as loaded');
    /* then every appendix section: the deepest tier, on both, and the same sweep again over what that reveals */
    const deepen = async P => P.page.evaluate(() => { const t = [...document.querySelectorAll('#tierbar [data-level]')].sort((x, y) => +x.dataset.level - +y.dataset.level); if (!t.length) return false; t[t.length - 1].click();
      const c = document.querySelector('#tierbar [data-core]'); if (c && [...document.querySelectorAll('section.slide.apx')].some(x => x.offsetParent === null)) c.click(); return true; });
    const [ha, hb] = await Promise.all([deepen(A), deepen(B)]); if (ha !== hb) issues.push(w + ' px: depth control on one version only');
    if (ha) { await Promise.all([settle(A), settle(B)]); await cmp('appendix opened to full depth'); await sweep('full depth');
      /* and last the depth control itself, each button by a real click */
      const tb = (await todo(A.page)).filter(tier); for (const c of tb) { const [ra, rb] = await Promise.all([act(A, c, 3000), act(B, c, 3000)]); tally.steps++; if (ra !== rb) issues.push(w + ' px depth button "' + c.label + '": ' + ra + ' on the ref, ' + rb + ' here'); else tally.clicks++; await Promise.all([settle(A), settle(B)]); await cmp('depth button "' + c.label + '"'); } }
    for (const key of ['Shift+U', 'Tab', 'Tab', 'Escape', 'ArrowDown', 'ArrowUp']) { await Promise.all([A.page.keyboard.press(key), B.page.keyboard.press(key)]); tally.keys++; tally.steps++; await Promise.all([settle(A), settle(B)]); await cmp('key ' + key); }
    if (A.errs.join() !== B.errs.join()) issues.push(w + ' px script errors differ: ref [' + A.errs.slice(0, 2).join('; ') + '] here [' + B.errs.slice(0, 2).join('; ') + ']');
    else if (A.errs.length && VERBOSE) console.log('      note  ' + p + ' ' + w + ' px: ' + A.errs.length + ' script error(s), the same on both: ' + A.errs[0]);
    await A.ctx.close(); await B.ctx.close();
  }
  for (const k of Object.keys(grand)) grand[k] += tally[k];
  if (issues.length) failPages++;
  console.log((issues.length ? 'DIFF  ' : 'same  ') + p + '  ' + tally.steps + ' steps (' + tally.clicks + ' clicks, ' + tally.typed + ' fields filled, ' + tally.keys + ' key actions; ' + tally.both + ' a pointer cannot reach on either version, ' + tally.scripted + ' of those clicked by script)' + (tally.both ? '\n        out of a pointer\'s reach on both: ' + Object.entries(why).map(([k, n]) => n + ' x ' + k).join('; ') : '') + (issues.length ? '\n        ' + issues.slice(0, VERBOSE ? 99 : 14).join('\n        ') : ''));
}
await browser.close();
console.log('\ntotal: ' + grand.steps + ' steps, ' + grand.clicks + ' clicks, ' + grand.typed + ' fields filled, ' + grand.keys + ' key actions, ' + grand.both + ' a pointer cannot reach on either version, ' + grand.scripted + ' of those clicked by script');
console.log('summary: ' + (failPages ? failPages + ' page(s) behave differently from the ref' : 'every page behaves as the ref does, step for step'));
process.exit(failPages ? 1 : 0);
