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

  /* COLE INTERPOLATION, and this is the check that makes preference 3 safe.
     An answer key that reads COLE.notePrincipal instead of typing 20020000
     cannot drift from CASE.md — but a MISSPELLED key gives `undefined`, which
     is not a JS error and renders as a word in a sentence a student is being
     marked against. Reveal everything first (Shift+U is bound later, so the
     reveal-all handlers are invoked directly), then read the rendered text. */
  const interp = await page.evaluate(() => {
    const bad = [];
    const seen = new Set();
    document.querySelectorAll('button,[data-gate]').forEach((b) => { try { b.click(); } catch { /* inert */ } });
    /* script and style bodies are text nodes inside <body>; they are source,
       not rendered text, and a checker that reads them is reading the code it
       is meant to be testing the output of. */
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement && /^(SCRIPT|STYLE|TEMPLATE)$/.test(n.parentElement.tagName)
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      const t = n.nodeValue;
      if (!t || !/\b(undefined|NaN)\b/.test(t)) continue;
      const s = t.replace(/\s+/g, ' ').trim().slice(0, 110);
      if (seen.has(s)) continue;
      seen.add(s); bad.push(s);
    }
    return bad;
  });
  say(interp.length === 0, `13  no "undefined" or "NaN" in rendered text after every control is exercised`
      + (interp.length ? `\n        ${interp.slice(0, 4).join('\n        ')}` : `  [COLE interpolation resolves]`));

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

  /* session-1 widget drives. The blanket click pass above has already mangled
     widget state, so these re-load the page and work it through the page's own
     controls, the way a student would. */
  if (rel === 'session-1/index.html') {
    await page.goto(pathToFileURL(join(REPO, rel)).href, { waitUntil: 'load' });
    await page.waitForTimeout(400);

    /* s08: the card sort withholds its key. The check opens only once all
       eight are placed, may write the aggregate count and nothing else, and
       the reveal (panel unhidden AND its rows rendered) is reachable only at
       8 of 8. */
    const cs = await page.evaluate(() => {
      const $ = (id) => document.getElementById(id);
      const res = {};
      const key = CARDSORT.cards.map((d) => d.b);
      res.deck = document.querySelectorAll('.cscard').length;
      res.hiddenAtLoad = $('csKey').classList.contains('hidden');
      res.checkClosedAtLoad = $('csCheck').disabled === true;
      $('csCheck').click();                                  /* must be inert */
      res.noResultBeforeComplete = $('csOut').textContent === '';
      const placeVia = (i, b) => {
        document.querySelector('.cscard[data-c="' + i + '"]').click();
        $(b === 0 ? 'csTo0' : 'csTo1').click();
      };
      const snapshot = () => [...document.querySelectorAll('.cscard')].map((c) =>
        c.className + '|' + c.getAttribute('aria-pressed') + '|' +
        (c.closest('.lbox') ? c.closest('.lbox').getAttribute('data-b') : 'deck')).join(';');
      key.forEach((b, i) => placeVia(i, 1 - b));            /* all eight wrong */
      res.checkOpenWhenComplete = $('csCheck').disabled === false;
      const before = snapshot();
      $('csCheck').click();
      res.wrong = $('csOut').textContent;
      res.hiddenAfterWrong = $('csKey').classList.contains('hidden');
      res.keyRowsAfterWrong = $('csKeyBody').querySelectorAll('.cskrow').length;
      res.noPerCardMutation = snapshot() === before;
      key.forEach((b, i) => { if (i > 0) placeVia(i, b); }); /* seven right */
      $('csCheck').click();
      res.seven = $('csOut').textContent;
      res.hiddenAtSeven = $('csKey').classList.contains('hidden');
      res.keyRowsAtSeven = $('csKeyBody').querySelectorAll('.cskrow').length;
      placeVia(0, key[0]);                                   /* all eight right */
      $('csCheck').click();
      res.eight = $('csOut').textContent;
      res.revealed = !$('csKey').classList.contains('hidden');
      res.keyRowsRevealed = $('csKeyBody').querySelectorAll('.cskrow').length;
      res.gateDone = document.querySelector('[data-gate="g13"]').classList.contains('done');
      return res;
    });
    say(cs.deck === 8 && cs.hiddenAtLoad, `s08 card sort renders 8 cards with the key sealed`);
    say(cs.checkClosedAtLoad && cs.noResultBeforeComplete && cs.checkOpenWhenComplete,
        `s08 the check is closed until all 8 are placed, then opens`);
    say(cs.wrong === '0 / 8 correct' && cs.hiddenAfterWrong && cs.keyRowsAfterWrong === 0,
        `s08 all-wrong check reports "0 / 8 correct", key sealed and its rows unrendered (got "${cs.wrong}")`);
    say(cs.noPerCardMutation, `s08 a check changes no per-card class, attribute or position`);
    say(cs.seven === '7 / 8 correct' && cs.hiddenAtSeven && cs.keyRowsAtSeven === 0,
        `s08 seven right reports "7 / 8 correct", key still sealed and unrendered (got "${cs.seven}")`);
    say(cs.eight === '8 / 8 correct' && cs.revealed && cs.keyRowsRevealed === 8 && cs.gateDone,
        `s08 the key unlocks, and renders, only at "8 / 8 correct" (got "${cs.eight}")`);

    /* s02: the sampler's weights render as percentages only at runtime, so a
       source grep can never see a retired Part K figure enter the DOM (the
       DW-063 defect class). Step the widget through every distribution, plus
       a reset, and assert (a) the retired render forms never appear, (b) each
       rendered distribution sums to 100 and is ranked non-increasing, which is
       what catches a future COLE.discount move that outruns the hand-typed
       tail of S2[1]. The banned strings are composed, never spelled, so this
       file stays clean under verify-migration check 1. */
    const samp = await page.evaluate(() => {
      const banned = [(30 + 1) + '%', (30 + 1) + ' years'];
      const bad = [];
      const scan = (step) => {
        const text = document.body.innerText;
        for (const b of banned) if (text.indexOf(b) !== -1) bad.push('step ' + step + ': renders ' + b);
        const pv = [...document.querySelectorAll('#s2dist .pv')].map((e) => parseInt(e.textContent, 10));
        if (pv.length) {
          const sum = pv.reduce((a, v) => a + v, 0);
          if (sum < 99 || sum > 101) bad.push('step ' + step + ': weights sum to ' + sum);
          for (let i = 1; i < pv.length; i++) if (pv[i] > pv[i - 1]) bad.push('step ' + step + ': rank order broken at ' + i);
        }
      };
      const one = () => { const r = document.querySelector('#s2dist .drow'); if (r) r.click(); };
      document.getElementById('s2reset').click();
      scan('0');
      for (let i = 1; i <= 6; i++) { one(); scan(String(i)); }
      document.getElementById('s2reset').click();
      scan('0 after reset');
      return { bad, placed: document.getElementById('s2count').textContent };
    });
    say(samp.bad.length === 0 && samp.placed === '0',
        `s02 no retired Part K figure renders, and every distribution sums to 100 ranked (8 states)` +
        (samp.bad.length ? `\n        ${samp.bad.slice(0, 4).join('\n        ')}` : ''));
  }
  await ctx.close();
}

/* the flowchart fragment on its own, with no lesson around it */
{
  const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 1000 } });
  const page = await ctx.newPage();
  const errors = [], external = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('request', (r) => { const u = r.url(); if (!u.startsWith('file://') && !u.startsWith('data:')) external.push(u); });
  const frag = readFileSync(join(REPO, 'scripts/case-flowchart.html'), 'utf8');
  await page.setContent(`<!doctype html><meta charset="utf-8"><body>${frag}`, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  console.log(`\n--- scripts/case-flowchart.html (standalone) ---`);
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
