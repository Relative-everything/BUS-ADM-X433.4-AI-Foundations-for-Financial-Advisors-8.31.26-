#!/usr/bin/env node
/* drags.mjs <page.html>: one real pointer drag per T3 beat, in Chromium at 1280 and 380 px, with the
   result asserted from the DOM. The jsdom checks drive the same beats through their click path; this is
   the only place the pointer path (mkDrag: pointerdown, a 6 px threshold, a ghost, rect hit-testing) runs.
   Needs PLAYWRIGHT_PATH or a global playwright; Chromium at /opt/pw-browsers/chromium. */
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const file = process.argv[2] || 'session-5/index.html';
let fails = 0;
const say = (ok, w, id, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${w}px  ${id}  ${s}`); };
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
for (const width of [1280, 380]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto('file://' + resolve(file), { waitUntil: 'load' });
  await page.evaluate(() => { const b = document.querySelector('#tierbar button[data-level="2"]'); if (b) b.click(); });
  /* Rects are read without scrolling; the page is scrolled once, instantly, before the pointer goes down,
     and by the wheel during the drag when the target is off screen, the way a person does it. The kit
     hit-tests live rects on every move, so a mid-drag scroll is part of what is being tested. */
  const rect = (sel, n = 0) => page.evaluate(([s, i]) => { const el = document.querySelectorAll(s)[i]; if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, top: r.top, bottom: r.bottom, h: window.innerHeight }; }, [sel, n]);
  const show = (sel, n = 0) => page.evaluate(([s, i]) => { const el = document.querySelectorAll(s)[i]; const r = el.getBoundingClientRect(); window.scrollTo({ top: window.scrollY + r.top + r.height / 2 - window.innerHeight / 2, behavior: 'instant' }); }, [sel, n]);
  const drag = async (fromSel, toSel, fromN = 0, toN = 0) => {
    await show(fromSel, fromN);
    const a = await rect(fromSel, fromN); if (!a) throw new Error('no ' + fromSel);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    await page.mouse.move(a.x + 4, a.y + 4); await page.mouse.move(a.x + 12, a.y + 12);
    let b = await rect(toSel, toN); if (!b) throw new Error('no ' + toSel);
    if (b.top < 0 || b.bottom > b.h) { await page.mouse.wheel(0, b.y - b.h / 2); await page.waitForTimeout(120); b = await rect(toSel, toN); }
    const from = { x: a.x + 12, y: a.y + 12 };
    for (let i = 1; i <= 8; i++) await page.mouse.move(from.x + (b.x - from.x) * i / 8, from.y + (b.y - from.y) * i / 8);
    await page.mouse.move(b.x, b.y); await page.mouse.up(); await page.waitForTimeout(150);
  };
  const txt = (sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; }, sel);
  /* Layout assertions that only a real renderer can make: visible texts in a figure must not overlap one another,
     and a marker must not sit on a box it does not belong to. Boxes are compared in CSS pixels with a 0.5 px slack. */
  const layout = (root) => page.evaluate((r) => {
    const R = document.querySelector(r); const vis = (el) => { const cs = getComputedStyle(el); let o = 1, e = el; while (e && e !== R) { o *= parseFloat(getComputedStyle(e).opacity || '1'); e = e.parentElement; } return cs.visibility !== 'hidden' && cs.display !== 'none' && o > 0.05; };
    const box = (el) => { const b = el.getBoundingClientRect(); return { x0: b.left + 0.5, y0: b.top + 0.5, x1: b.right - 0.5, y1: b.bottom - 0.5, w: b.width, h: b.height, el }; };
    const hit = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
    const texts = [...R.querySelectorAll('text')].filter((t) => t.textContent.trim() && vis(t)).map(box).filter((b) => b.w > 1 && b.h > 1);
    const clashes = [];
    for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) if (hit(texts[i], texts[j])) clashes.push(texts[i].el.textContent.trim().slice(0, 24) + ' × ' + texts[j].el.textContent.trim().slice(0, 24));
    return { texts: texts.length, clashes };
  }, root);
  const inside = (innerSel, outerSel) => page.evaluate(([i, o]) => { const a = document.querySelector(i).getBoundingClientRect(), b = document.querySelector(o).getBoundingClientRect(); return a.left >= b.left - 0.5 && a.right <= b.right + 0.5 && a.top >= b.top - 0.5 && a.bottom <= b.bottom + 0.5; }, [innerSel, outerSel]);
  const apart = (aSel, bSel) => page.evaluate(([x, y]) => { const A = [...document.querySelectorAll(x)].map((e) => e.getBoundingClientRect()), B = [...document.querySelectorAll(y)].map((e) => e.getBoundingClientRect()); const hit = (a, b) => a.left + 0.5 < b.right && b.left + 0.5 < a.right && a.top + 0.5 < b.bottom && b.top + 0.5 < a.bottom; return !A.some((a) => B.some((b) => hit(a, b))); }, [aSel, bSel]);
  const has = (sel) => page.evaluate((s) => !!document.querySelector(s), sel);

  /* §01: a gate onto the gate slot, a rule onto the quality slot */
  await drag('#s1Gates [data-k="two"]', '#s1SlotGate');
  say(await has('#s1SlotGate.filled'), width, 'D-01a', '§01: gate B dragged onto the gate slot fills it');
  await drag('#s1Quals [data-k="score"]', '#s1SlotQual');
  say(await has('#s1SlotQual.filled') && !(await page.evaluate(() => document.getElementById('s1Adv').disabled)), width, 'D-01b', '§01: rule 2 dragged onto the quality slot arms Advance');
  await drag('#s1Gates [data-k="pin"]', '#s1SlotQual');
  say(/model gate; this slot takes a quality rule/.test(await txt('#s1GOut')), width, 'D-01c', '§01: a gate dropped on the quality slot bounces with a why');

  /* §02: a PDF into the zip, the docx onto the README */
  await drag('#s2Files .s2-file[data-drag]', '#s2ZZip', 0);
  say(/prompt\.txt/.test(await txt('#s2LZip')) && /1 of 8 placed/.test(await txt('#s2PkOut')), width, 'D-02a', '§02: Prompt 1.pdf dragged into the zip starts prompt.txt');
  await drag('#s2Files .s2-file[data-drag]:not(.gone)', '#s2ZOut', 0);
  say(/Still in hand|✗/.test(await txt('#s2PkOut')), width, 'D-02b', '§02: the next PDF dragged to Leave out bounces');

  /* E3: the first failure into its lane */
  await drag('#e3List .chip', '#e3Boxes .lbox', 0, 0);
  say(/1 of 10 placed/.test(await txt('#e3Out')), width, 'D-E3', 'E3: a failure dragged into a lane is judged');

  /* §06: a source chip onto a port, then its destination */
  await drag('#s6Src [data-k="meet"]', '#s6Fig .s6-port.src', 0, 1);
  say(await page.evaluate(() => document.querySelectorAll('#s6Fig .s6-port.src')[1].classList.contains('filled')), width, 'D-06a', '§06: The meeting dragged onto the note-taker’s left port fills it');
  await drag('#s6Dst [data-k="vendor"]', '#s6Fig .s6-port.dst', 0, 1);
  say(/Tool 2 · Note-taker · wired/.test(await txt('#s6Out')) && (await page.evaluate(() => document.querySelectorAll('#s6Fig .s6-wire.lit').length)) === 2, width, 'D-06b', '§06: A vendor’s servers dragged onto the right port lights both wires');
  const stop = await page.evaluate(() => { const g = document.querySelector('#s6Fig .s6-stopw'); const r = g.getBoundingClientRect(); const svg = document.querySelector('#s6Fig svg').getBoundingClientRect(); return { inside: r.x >= svg.x && r.y >= svg.y && r.right <= svg.right && r.bottom <= svg.bottom, shown: !!document.querySelector('#s6Fig .s6-stop.show') }; });
  say(stop.inside && stop.shown, width, 'D-06c', '§06: the first stop icon sits inside the figure, shown, after the wiring');

  await page.evaluate(() => { const c = (e) => e.dispatchEvent(new MouseEvent('click', { bubbles: true })); const L = (i) => document.querySelectorAll('#s6Fig .s6-port.src')[i], Rp = (i) => document.querySelectorAll('#s6Fig .s6-port.dst')[i];
    [[0, 'you', 'plan'], [2, 'file', 'vendor'], [3, 'file', 'vendor'], [4, 'pub', 'index']].forEach(([i, sk, dk]) => { c(document.querySelector('#s6Src [data-k="' + sk + '"]')); c(L(i)); c(document.querySelector('#s6Dst [data-k="' + dk + '"]')); c(Rp(i)); }); });
  await page.waitForTimeout(400);
  const l6 = await layout('#s6Fig');
  say(l6.clashes.length === 0 && l6.texts >= 30 && (await apart('#s6Fig .s6-stopw', '#s6Fig .s6-port, #s6Fig .s6-tool')), width, 'D-06d', `§06: with all five wired, no two labels overlap and no stop icon sits on a port or a tool (${l6.texts} texts${l6.clashes.length ? '; ' + l6.clashes.join(', ') : ''})`);

  /* §04: the improved run; the token rests off the text and the stamp holds its words */
  await page.evaluate(() => document.querySelectorAll('#s4Rows .s4-opt[data-c="1"]').forEach((b) => b.click()));
  await page.waitForTimeout(3000);
  const l4 = await layout('#s4Flow');
  say(l4.clashes.length === 0 && (await apart('#s4Flow .s4-ftok', '#s4Flow .s4-ft1, #s4Flow .s4-ft2')) && (await inside('#s4Flow .s4-fstamp text', '#s4Flow .s4-fstamp rect')), width, 'D-04', `§04: the token rests clear of the station text and the stamp text sits inside its box${l4.clashes.length ? ' (' + l4.clashes.join(', ') + ')' : ''}`);

  /* §07: the unapproved plugin onto the policy */
  await drag('#libProps .sLib-prop', '#libPPolicy', 1, 0);
  say(/blocked by enterprise policy/.test(await txt('#libGovOut')), width, 'D-07', '§07: the unapproved plugin dragged onto the policy is refused in the documentation’s words');
  await page.evaluate(() => document.querySelectorAll('#libPicks button')[1].click());
  await page.waitForTimeout(2600);
  const l7 = await layout('#libFig');
  const routeN = await page.evaluate(() => [...document.querySelectorAll('#libFig .sLib-route.on')].length);
  say(l7.clashes.length === 0 && routeN >= 5 && (await inside('#libFig .sLib-anst.on', '#libFig .sLib-ans.on')) && (await apart('#libFig .sLib-lock', '#libFig .sLib-pl')), width, 'D-07b', `§07: after the transcript question, ${routeN} route lines, no label overlaps another, the desk tag sits in its box, the lock sits clear of the policy lines${l7.clashes.length ? ' (' + l7.clashes.join(', ') + ')' : ''}`);

  /* §08: a moment into a bucket, then a reason to the top */
  await drag('#s7List .chip', '#s7Boxes .lbox', 0, 0);
  say(/1 of 8 placed/.test(await txt('#s7Out')), width, 'D-08a', '§08: a moment dragged into a bucket is judged');
  await drag('#s7Rank .s7-ri[data-k="advice"]', '#s7Rank .s7-ri[data-k="cost"]');
  const order = await page.evaluate(() => [...document.querySelectorAll('#s7Rank .s7-ri')].map((l) => l.getAttribute('data-k')));
  say(order[0] === 'advice', width, 'D-08b', `§08: the advice reason dragged onto the top row leads the order (${order.join(',')})`);

  /* the browser's own click right after a drop is swallowed once; half a second later a plain click still places */
  await page.waitForTimeout(500);
  await page.evaluate(() => document.querySelectorAll('#s7List .chip')[1].click());
  await page.evaluate(() => document.querySelectorAll('#s7Boxes .lbox')[1].click());
  say(/2 of 8 placed/.test(await txt('#s7Out')), width, 'D-08c', '§08: the click path still works after the drags');

  say(errs.length === 0, width, 'D-00', `no page error during the drags${errs.length ? ': ' + errs[0] : ''}`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  say(!overflow, width, 'D-OV', 'no horizontal overflow after the drags');
  await ctx.close();
}
await browser.close();
console.log(`\nsummary: ${fails ? fails + ' failed' : 'all passed'}`);
process.exit(fails ? 1 : 0);
