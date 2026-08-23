#!/usr/bin/env node
/**
 * verify-browser.mjs — checks 13, 14 and 15 of the migration battery, in a real
 * browser rather than jsdom (jsdom is not installed here; Chromium is, and is
 * strictly stronger: it runs layout, so it can answer the geometry questions
 * jsdom cannot).
 *
 *   13  DOM and handlers: handlers bind, Shift+U present and labelled, tabs work
 *   14  flowchart fragment: zero JS errors, zero network requests beyond fonts
 *   14b var() in an SVG presentation attribute: measured, not asserted
 *   15  visual: screenshot at the target width
 *
 * NODE_PATH must point at the global modules (playwright lives there).
 */
import { readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/* ESM does not honour NODE_PATH, so playwright is resolved explicitly. Set
   PLAYWRIGHT_PATH if it lives somewhere other than the global npm root. */
import { execSync } from 'node:child_process';
const PW = process.env.PLAYWRIGHT_PATH ||
  join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'playwright');
const pw = await import(pathToFileURL(join(PW, 'index.js')).href);
const chromium = (pw.chromium || pw.default.chromium);

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = ['index.html', 'session-0.1/index.html', 'session-1/index.html',
                 'session-2/index.html', 'session-3/index.html', 'session-4/index.html'];
const SHOT = process.env.SHOT_DIR || join(REPO, '.verify-shots');
const WIDTH = 1280;
mkdirSync(SHOT, { recursive: true });

let fails = 0;
const say = (ok, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${s}`); };

const browser = await chromium.launch();
for (const rel of LESSONS) {
  const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 1000 } });
  const page = await ctx.newPage();
  const errors = [], external = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => {
    /* Offline, the one permitted external (Google Fonts, pedagogy R8 as amended
       by D-2026-08-18-1) fails to load. That is the intended degradation, not a
       page error, so it is not counted. */
    if (m.type() === 'error' && !/ERR_(CONNECTION|NAME|INTERNET|NETWORK|BLOCKED)/.test(m.text()))
      errors.push('console: ' + m.text());
  });
  page.on('request', (r) => {
    const u = r.url();
    if (!u.startsWith('file://') && !u.startsWith('data:')) external.push(u);
  });
  await page.goto(pathToFileURL(join(REPO, rel)).href, { waitUntil: 'load' });
  await page.waitForTimeout(400);

  console.log(`\n--- ${rel} ---`);
  say(errors.length === 0, `13  zero JS errors on load` + (errors.length ? `\n        ${errors.slice(0, 4).join('\n        ')}` : ''));

  const nonFont = external.filter((u) => !/fonts\.(googleapis|gstatic)\.com/.test(u));
  say(nonFont.length === 0, `14  zero network requests beyond Google Fonts (pedagogy R8)` + (nonFont.length ? `\n        ${nonFont.slice(0, 4).join('\n        ')}` : ` [${external.length} font request(s)]`));

  /* case modal + Structure tab */
  const modal = await page.evaluate(() => {
    const btn = document.getElementById('caseBtn');
    const m = document.getElementById('caseModal');
    if (!btn || !m) return { ok: false, why: 'no caseBtn or caseModal' };
    btn.click();
    const open = m.classList.contains('open');
    const tf = document.getElementById('caseTabFacts'), ts = document.getElementById('caseTabStruct');
    if (!tf || !ts) return { ok: false, why: 'no case tabs' };
    ts.click();
    const structVisible = !document.getElementById('casePanelStruct').classList.contains('case-off');
    const factsHidden = document.getElementById('casePanelFacts').classList.contains('case-off');
    const svgs = document.querySelectorAll('#casePanelStruct svg').length;
    const titles = document.querySelectorAll('#casePanelStruct svg title').length;
    const descs = document.querySelectorAll('#casePanelStruct svg desc').length;
    const stamp = (document.querySelector('.case-stamp') || {}).textContent || '';
    const focusable = ts.tabIndex === 0;
    tf.click();
    return { ok: true, open, structVisible, factsHidden, svgs, titles, descs, stamp: stamp.trim(), focusable };
  });
  say(modal.ok && modal.open, `13  case modal opens from the topbar button` + (modal.why ? `  (${modal.why})` : ''));
  say(modal.ok && modal.structVisible && modal.factsHidden, `13  Structure tab switches panels`);
  say(modal.svgs === 2 && modal.titles === 2 && modal.descs === 2,
      `14  flowchart: ${modal.svgs} SVG, ${modal.titles} <title>, ${modal.descs} <desc> preserved`);
  say(/^Case v4\.0 [0-9a-f]{7}$/.test(modal.stamp), `13  version stamp rendered: "${modal.stamp}"`);
  say(modal.focusable === true, `13  Structure tab is keyboard reachable (tabIndex 0 when selected)`);

  /* Shift+U override */
  const ovr = await page.evaluate(() => {
    const el = [...document.querySelectorAll('span,div,kbd')]
      .find((n) => n.children.length <= 2 && /shift\s*\+?\s*u/i.test(n.textContent) && n.textContent.length < 80);
    return { label: el ? el.textContent.replace(/\s+/g, ' ').trim() : null,
             id: el ? el.id : null,
             hidden: document.querySelectorAll('.hidden').length,
             text: el ? el.textContent : '' };
  });
  await page.keyboard.down('Shift'); await page.keyboard.press('KeyU'); await page.keyboard.up('Shift');
  await page.waitForTimeout(200);
  const after = await page.evaluate(() => ({
    hidden: document.querySelectorAll('.hidden').length,
    ovrText: (document.getElementById('ovr') || document.getElementById('pnum') || {}).textContent || '',
    bothPanels: !document.getElementById('casePanelFacts').classList.contains('case-off') &&
                !document.getElementById('casePanelStruct').classList.contains('case-off'),
  }));
  if (rel === 'index.html') {
    console.log('      13  hub carries no answer panels, so no Shift+U override is expected');
  } else {
    say(!!(ovr.label && /shift\s*\+?\s*u/i.test(ovr.label)),
        `13  Shift+U override visibly labelled${ovr.id ? ` (#${ovr.id})` : ''}: "${ovr.label}"`);
    say(after.hidden < ovr.hidden || /revealed/i.test(after.ovrText),
        `13  Shift+U reveals (.hidden ${ovr.hidden} -> ${after.hidden}, badge "${after.ovrText.trim()}")`);
  }
  say(!after.bothPanels, `13  Shift+U does not reveal both case tabs at once`);

  /* handlers actually bound */
  const bound = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const dead = btns.filter((b) => !b.onclick && !b.getAttribute('onclick') && b.type !== 'submit');
    return { total: btns.length, dead: dead.length };
  });
  console.log(`      13  ${bound.total} buttons present (${bound.dead} without an inline handler; addEventListener is not introspectable)`);

  /* 14b measured: does var() in an SVG presentation attribute actually resolve? */
  const varTest = await page.evaluate(() => {
    const el = document.querySelector('svg [fill^="var("], svg [stroke^="var("]');
    if (!el) return null;
    const prop = el.getAttribute('fill') ? 'fill' : 'stroke';
    const computed = getComputedStyle(el)[prop];
    return { attr: el.getAttribute(prop), computed };
  });
  if (varTest) console.log(`      14b var() in SVG presentation attribute MEASURED: ${varTest.attr} -> computed ${varTest.computed}`);

  /* geometry: any text outside its viewBox */
  const outside = await page.evaluate(() => {
    const bad = [];
    document.querySelectorAll('svg[viewBox]').forEach((svg) => {
      if (!svg.getBoundingClientRect().width) return;      /* not laid out */
      const vb = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);
      const [vx, vy, vw, vh] = vb;
      svg.querySelectorAll('text').forEach((t) => {
        let b; try { b = t.getBBox(); } catch { return; }   /* rendered box, transforms applied */
        if (!b.width && !b.height) return;
        const m = t.getCTM ? t.getCTM() : null;             /* to the svg user space */
        const x0 = m ? b.x * m.a + b.y * m.c + m.e : b.x;
        const y0 = m ? b.x * m.b + b.y * m.d + m.f : b.y;
        const x1 = m ? (b.x + b.width) * m.a + (b.y + b.height) * m.c + m.e : b.x + b.width;
        const y1 = m ? (b.x + b.width) * m.b + (b.y + b.height) * m.d + m.f : b.y + b.height;
        const lo = (a, c) => Math.min(a, c), hi = (a, c) => Math.max(a, c);
        if (lo(x0, x1) < vx - 2 || lo(y0, y1) < vy - 2 || hi(x0, x1) > vx + vw + 2 || hi(y0, y1) > vy + vh + 2)
          bad.push(`"${t.textContent.slice(0, 28)}" box ${lo(x0,x1).toFixed(0)},${lo(y0,y1).toFixed(0)} to ${hi(x0,x1).toFixed(0)},${hi(y0,y1).toFixed(0)} outside viewBox ${vb.join(' ')}`);
      });
    });
    return bad;
  });
  /* Pre-existing baseline, measured on origin/main before this migration with the
     identical getBBox+CTM method. These are axis labels and legends in the
     lessons' own charts, drawn a few px outside the declared viewBox; the charts
     were not touched by this migration (constraint 7 preserves chart
     implementations). The check therefore fails on a REGRESSION, not on the
     standing count, and the standing count is reported either way. */
  const BASELINE = { 'index.html': 0, 'session-0.1/index.html': 12, 'session-1/index.html': 32,
                     'session-2/index.html': 64, 'session-3/index.html': 11, 'session-4/index.html': 3 };
  const base = BASELINE[rel] ?? 0;
  say(outside.length <= base,
      `14b SVG text outside viewBox: ${outside.length} (pre-migration baseline ${base}, no regression)` +
      (outside.length > base ? `\n        ${outside.slice(0, 4).join('\n        ')}` : ''));

  /* horizontal overflow of the page body */
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  say(!overflow, `15  no horizontal page overflow at ${WIDTH}px`);

  await page.screenshot({ path: join(SHOT, rel.replace(/\//g, '_') + '.png'), fullPage: false });
  await ctx.close();
}

/* the flowchart fragment on its own, with no lesson around it */
{
  const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 1000 } });
  const page = await ctx.newPage();
  const errors = [], external = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('request', (r) => { const u = r.url(); if (!u.startsWith('file://') && !u.startsWith('data:')) external.push(u); });
  const frag = readFileSync(join(REPO, 'scripts/case-flowchart.fragment'), 'utf8');
  await page.setContent(`<!doctype html><meta charset="utf-8"><body>${frag}`, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  console.log(`\n--- scripts/case-flowchart.fragment (standalone) ---`);
  say(errors.length === 0, `14  zero JS errors` + (errors.length ? `: ${errors[0]}` : ''));
  say(external.length === 0, `14  zero network requests` + (external.length ? `: ${external[0]}` : ''));
  say(!/<script|unpkg|cdn\.|https?:\/\/[^"']*\.(js|css)/i.test(frag), `14  no <script>, unpkg or CDN reference in the source`);
  const g = await page.evaluate(() => {
    const svgs = [...document.querySelectorAll('svg')];
    return { n: svgs.length, titles: document.querySelectorAll('svg title').length,
             descs: document.querySelectorAll('svg desc').length,
             wider: svgs.some((s) => s.getBoundingClientRect().width > document.documentElement.clientWidth + 2) };
  });
  say(g.n === 2 && g.titles === 2 && g.descs === 2, `14  2 sheets, ${g.titles} <title>, ${g.descs} <desc>`);
  say(!g.wider, `15  flowchart fits ${WIDTH}px without overflowing`);
  await page.screenshot({ path: join(SHOT, 'flowchart.png'), fullPage: true });
  await ctx.close();
}

await browser.close();
console.log(`\nsummary: ${fails} failure(s). Screenshots in ${SHOT}`);
process.exit(fails ? 1 : 0);
