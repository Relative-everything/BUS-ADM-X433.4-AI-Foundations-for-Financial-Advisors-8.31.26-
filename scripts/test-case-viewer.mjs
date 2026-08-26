#!/usr/bin/env node
/**
 * test-case-viewer.mjs — the case-facts viewer, exercised in a real browser.
 *
 * verify-browser.mjs already asserts that the dialog opens and that the tabs
 * switch. It says nothing about the parts a keyboard reader depends on, and
 * nothing about the second affordance, so those were the parts that were
 * quietly missing: of the six hand-written controllers this replaced, four
 * returned focus and two did not, and none of the six trapped it.
 *
 * Every assertion below is measured against the rendered page. Nothing here
 * reads the source and concludes the behaviour from it.
 *
 *   NODE_PATH=$(npm root -g) node scripts/test-case-viewer.mjs
 *
 * pedagogy R8: the page under test must reach the network for nothing, and the
 * new-tab affordance is checked against that rather than exempted from it.
 */
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const PW = process.env.PLAYWRIGHT_PATH ||
  join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'playwright');
const pw = await import(pathToFileURL(join(PW, 'index.js')).href);
const chromium = (pw.chromium || pw.default.chromium);

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = ['index.html', 'session-0.1/index.html', 'session-1/index.html',
                 'session-2/index.html', 'session-3/index.html', 'session-4/index.html'];

let fails = 0;
const say = (ok, s, detail) => {
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${s}${!ok && detail ? `\n        ${detail}` : ''}`);
};

const browser = await chromium.launch();
for (const rel of LESSONS) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(pathToFileURL(join(REPO, rel)).href, { waitUntil: 'load' });
  await page.waitForTimeout(250);
  console.log(`\n--- ${rel} ---`);

  /* ---- V1 one entry point, in persistent chrome, reachable by keyboard ---- */
  const entry = await page.evaluate(() => {
    const b = document.getElementById('caseBtn');
    if (!b) return null;
    const cs = getComputedStyle(b);
    const bar = b.closest('#topbar,[class*="topbar"],[class*="tb"]');
    return { tag: b.tagName, text: b.textContent.trim(), tabIndex: b.tabIndex,
             pos: cs.position, fixedAncestor: !!bar || cs.position === 'fixed',
             haspopup: b.getAttribute('aria-haspopup'),
             count: document.querySelectorAll('#caseBtn').length };
  });
  say(!!entry && entry.count === 1 && entry.tag === 'BUTTON' && entry.tabIndex >= 0,
      `V1  exactly one entry point, a real button in the tab order: "${entry && entry.text}"`,
      JSON.stringify(entry));
  say(!!entry && entry.fixedAncestor,
      `V1  the entry point is persistent chrome, not something to scroll back to (position: ${entry && entry.pos})`);
  say(!!entry && entry.haspopup === 'dialog', `V1  entry point declares aria-haspopup="dialog"`);

  /* ---- V2 the dialog announces itself, and veils the page behind it ------ */
  await page.evaluate(() => document.getElementById('caseBtn').focus());
  await page.keyboard.press('Enter');
  await page.waitForTimeout(120);
  const opened = await page.evaluate(() => {
    const m = document.getElementById('caseModal');
    const kids = [...document.body.children].filter((e) => e !== m);
    return {
      open: m.classList.contains('open'),
      role: m.getAttribute('role'), modal: m.getAttribute('aria-modal'),
      label: m.getAttribute('aria-label'),
      veiled: kids.length > 0 && kids.every((e) => e.getAttribute('aria-hidden') === 'true'),
      focusInside: m.contains(document.activeElement),
      focusId: document.activeElement && document.activeElement.id,
    };
  });
  say(opened.open, `V2  Enter on the entry point opens the dialog`);
  say(opened.role === 'dialog' && opened.modal === 'true' && !!opened.label,
      `V2  role="dialog" aria-modal="true" and a label: "${opened.label}"`);
  say(opened.veiled, `V2  the page behind is aria-hidden while the dialog is open`);
  say(opened.focusInside, `V2  focus moves into the dialog on open (#${opened.focusId})`);

  /* ---- V3 focus is TRAPPED. Tab off the end wraps, it does not escape ---- */
  const trap = await page.evaluate(() => {
    const m = document.getElementById('caseModal');
    const box = m.querySelector('.inner') || m;
    const stops = [...box.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')]
      .filter((e) => !e.disabled && !e.hasAttribute('hidden') &&
                     e.getAttribute('tabindex') !== '-1' && (e.offsetWidth || e.offsetHeight));
    return { n: stops.length, lastId: stops.length ? (stops[stops.length - 1].id || stops[stops.length - 1].className) : null,
             firstId: stops.length ? (stops[0].id || stops[0].className) : null };
  });
  say(trap.n >= 2, `V3  ${trap.n} focus stops inside the dialog (first "${trap.firstId}", last "${trap.lastId}")`);

  /* Tab well past the end. Without a trap, focus lands on the page behind. */
  for (let i = 0; i < trap.n + 4; i++) await page.keyboard.press('Tab');
  const afterTab = await page.evaluate(() => {
    const m = document.getElementById('caseModal');
    return { inside: m.contains(document.activeElement),
             where: document.activeElement ? (document.activeElement.id || document.activeElement.tagName) : 'none' };
  });
  say(afterTab.inside, `V3  Tab past the last stop wraps instead of escaping (landed on "${afterTab.where}")`);

  await page.keyboard.down('Shift');
  for (let i = 0; i < trap.n + 4; i++) await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  const afterBack = await page.evaluate(() => {
    const m = document.getElementById('caseModal');
    return { inside: m.contains(document.activeElement),
             where: document.activeElement ? (document.activeElement.id || document.activeElement.tagName) : 'none' };
  });
  say(afterBack.inside, `V3  Shift+Tab past the first stop wraps too (landed on "${afterBack.where}")`);

  /* ---- V4 Escape closes it, and focus goes back where it came from ------- */
  await page.keyboard.press('Escape');
  await page.waitForTimeout(120);
  const closed = await page.evaluate(() => {
    const m = document.getElementById('caseModal');
    const kids = [...document.body.children].filter((e) => e !== m);
    return { open: m.classList.contains('open'),
             focusId: document.activeElement && document.activeElement.id,
             unveiled: kids.every((e) => e.getAttribute('aria-hidden') !== 'true') };
  });
  say(!closed.open, `V4  Escape closes the dialog`);
  say(closed.focusId === 'caseBtn', `V4  focus returns to the control that opened it (landed on "#${closed.focusId}")`);
  say(closed.unveiled, `V4  aria-hidden is lifted from the page on close`);

  /* ---- V5 click-out closes it too --------------------------------------- */
  const clickOut = await page.evaluate(() => {
    const m = document.getElementById('caseModal');
    document.getElementById('caseBtn').click();
    const wasOpen = m.classList.contains('open');
    m.dispatchEvent(new MouseEvent('click', { bubbles: true }));   /* the backdrop itself */
    return { wasOpen, nowOpen: m.classList.contains('open') };
  });
  say(clickOut.wasOpen && !clickOut.nowOpen, `V5  a click on the backdrop closes it`);

  /* ---- V6 the Close button still closes it ------------------------------ */
  const closeBtn = await page.evaluate(() => {
    const m = document.getElementById('caseModal');
    document.getElementById('caseBtn').click();
    const c = document.getElementById('caseClose');
    if (!c) return { ok: false, why: 'no #caseClose' };
    c.click();
    return { ok: true, open: m.classList.contains('open') };
  });
  say(closeBtn.ok && !closeBtn.open, `V6  the Close button closes it` + (closeBtn.why ? ` (${closeBtn.why})` : ''));

  /* ---- V7 non-colour state on the tabs ---------------------------------- */
  const state = await page.evaluate(() => {
    document.getElementById('caseBtn').click();
    const tf = document.getElementById('caseTabFacts'), ts = document.getElementById('caseTabStruct');
    const read = (e) => ({ weight: getComputedStyle(e).fontWeight,
                           border: getComputedStyle(e).borderBottomWidth,
                           mark: (e.querySelector('.case-mk') || {}).textContent,
                           sel: e.getAttribute('aria-selected') });
    const before = { f: read(tf), s: read(ts) };
    ts.click();
    const after = { f: read(tf), s: read(ts) };
    document.getElementById('caseTabFacts').click();
    return { before, after };
  });
  const b = state.before, a = state.after;
  say(b.f.weight !== b.s.weight, `V7  the selected tab differs in WEIGHT, not only colour (${b.f.weight} vs ${b.s.weight})`);
  say(b.f.mark !== b.s.mark, `V7  and in its MARKER glyph ("${b.f.mark}" vs "${b.s.mark}")`);
  say(b.f.sel === 'true' && b.s.sel === 'false' && a.f.sel === 'false' && a.s.sel === 'true',
      `V7  aria-selected tracks the switch in both directions`);

  /* ---- V8 the second affordance: a Blob URL, built from the same span ---- */
  const blob = await page.evaluate(() => {
    const a = document.getElementById('caseNewTab');
    if (!a) return { ok: false, why: 'no #caseNewTab' };
    return { ok: true, hidden: a.hasAttribute('hidden'), href: a.getAttribute('href') || '',
             target: a.getAttribute('target'), rel: a.getAttribute('rel'),
             text: a.textContent.trim(), tabIndex: a.tabIndex };
  });
  say(blob.ok && !blob.hidden, `V8  the new-tab control is present and shown` + (blob.why ? ` (${blob.why})` : ''));
  say(blob.ok && /^blob:/.test(blob.href), `V8  its href is a Blob URL, not a file and not a fetch: "${String(blob.href).slice(0, 24)}..."`);
  say(blob.ok && blob.target === '_blank' && blob.rel === 'noopener' && blob.tabIndex >= 0,
      `V8  it opens in a new tab, is rel="noopener", and is in the tab order`);

  /* The Blob document itself: does it carry the case, and does it reach the
     network for anything? Opened for real, with requests recorded. */
  const requests = [];
  const [popup] = await Promise.all([
    ctx.waitForEvent('page'),
    page.evaluate(() => window.open(document.getElementById('caseNewTab').href, '_blank')),
  ]);
  popup.on('request', (r) => requests.push(r.url()));
  const perrors = [];
  popup.on('pageerror', (e) => perrors.push(String(e)));
  await popup.waitForLoadState('load');
  await popup.waitForTimeout(200);
  const standalone = await popup.evaluate(() => ({
    title: document.title,
    panels: document.querySelectorAll('.case-panel').length,
    hiddenPanels: document.querySelectorAll('.case-panel.case-off').length,
    tabs: document.querySelectorAll('.case-tabs').length,
    scripts: document.querySelectorAll('script').length,
    links: document.querySelectorAll('link').length,
    svgs: document.querySelectorAll('svg').length,
    styled: getComputedStyle(document.body).backgroundColor,
    hasMeg: /Margaret/.test(document.body.textContent),
    hasSpine: /runs through every session/.test(document.body.textContent),
    chars: document.body.textContent.replace(/\s+/g, ' ').trim().length,
  }));
  const offsite = requests.filter((u) => !/^blob:|^data:|^file:|^about:/.test(u));
  say(/Cole Household/.test(standalone.title), `V8  the new tab is titled "${standalone.title}"`);
  say(standalone.panels === 2 && standalone.hiddenPanels === 0 && standalone.tabs === 0,
      `V8  both panels are open in the new tab and the dead tablist is gone (${standalone.panels} panels, ${standalone.hiddenPanels} hidden, ${standalone.tabs} tablists)`);
  say(standalone.scripts === 0 && standalone.links === 0,
      `V8  it carries no script and no <link>: ${standalone.scripts} script(s), ${standalone.links} link(s)`);
  say(offsite.length === 0, `V8  it reaches the network for NOTHING`, offsite.slice(0, 3).join(' '));
  say(standalone.hasMeg && standalone.hasSpine && standalone.chars > 1500,
      `V8  it carries the case: the household, the spine question, ${standalone.chars} characters of text`);
  say(standalone.svgs === 2, `V8  both flowchart sheets survive the copy (${standalone.svgs} SVG)`);
  say(perrors.length === 0, `V8  zero JS errors in the new tab`, perrors.slice(0, 2).join(' | '));
  await popup.close();

  say(errors.length === 0, `V9  zero JS errors in the lesson across the whole exercise`, errors.slice(0, 3).join(' | '));
  await ctx.close();
}

await browser.close();
console.log(`\nsummary: ${fails} failure(s)`);
process.exit(fails ? 1 : 0);
