#!/usr/bin/env node
/**
 * checks.mjs, the per-finding browser harness for the Session 2 polish pass
 * of 2026-09-14. One check per register row that carries a DOM test. Copies
 * the pattern of docs/changes/2026-09-13-session-2-manual-pass/checks.mjs:
 * Chromium through the same global Playwright resolution
 * scripts/verify-browser.mjs uses; the page opened from a file:// URL at
 * 1280 px; every check gets a fresh page.
 *
 *   NODE_PATH=$(npm root -g) node docs/changes/2026-09-14-session-2-polish/checks.mjs
 *
 * Output: one line per check, "PL-nnn OK" or "PL-nnn FAIL <reason>", then a
 * summary; exit 1 on any FAIL. Committed with the register before the first
 * page edit, so every check fails until its row lands. Not part of the
 * pre-push gate.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const PW = process.env.PLAYWRIGHT_PATH ||
  join(execSync('npm root -g', { encoding: 'utf8' }).trim(), 'playwright');
const pw = await import(pathToFileURL(join(PW, 'index.js')).href);
const chromium = (pw.chromium || pw.default.chromium);

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const FILE = join(REPO, 'session-2/index.html');
const URL = pathToFileURL(FILE).href;
const SRC = readFileSync(FILE, 'utf8');

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
const out = [];
function must(cond, msg) { if (!cond) throw new Error(msg); }

async function check(id, fn) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  try {
    await page.goto(URL, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    must(errors.length === 0, 'page error on load: ' + errors.join(' | '));
    await fn(page);
    out.push([id, 'OK', '']);
  } catch (e) {
    out.push([id, 'FAIL', String(e.message || e)]);
  } finally { await page.close(); }
}

/* PL-002: B1's live-run doit no longer points at the deleted §01 comparison. */
await check('PL-002', async (page) => {
  const t = await page.evaluate(() => [...document.querySelectorAll('#s1 .doit p')].map((p) => p.textContent).join(' '));
  must(!/runs the same comparison/.test(t), 'the doit still points at the deleted §01 comparison');
  must(/§01 explains the difference and how to narrow it\./.test(t), 'replacement sentence missing');
});

/* PL-005: the §01 explanation's comma splice is a colon. */
await check('PL-005', async (page) => {
  const t = await page.evaluate(() => document.querySelector('#s3 p.big').textContent);
  must(!/that number, it is/.test(t), 'comma splice still rendered');
  must(/no theory behind that number: it is simply what works for essays/.test(t), 'colon form missing');
});

/* PL-009: the §02 lede states its unit. */
await check('PL-009', async (page) => {
  const t = await page.evaluate(() => document.querySelector('#s5 p.big').textContent);
  must(!/per token can differ/.test(t), '"per token" still rendered');
  must(/Two models two dollars apart per million tokens can differ fourfold/.test(t), 'replacement missing');
});

/* PL-010: the participle has a subject. */
await check('PL-010', async (page) => {
  const t = await page.evaluate(() => document.getElementById('s5').textContent);
  must(!/Plotted together, the price-sheet ranking falls apart/.test(t), 'dangling form still rendered');
  must(/Plotted together, they scramble the price-sheet ranking\./.test(t), 'replacement missing');
});

/* PL-016: the §03 panel label no longer promises a result. */
await check('PL-016', async (page) => {
  const labels = await page.evaluate(() => [...document.querySelectorAll('#s6 .panel.tightpad .plab')].map((x) => x.textContent.trim()));
  must(labels.includes('A related point on prompt length'), 'label not renamed: ' + labels.join(' | '));
  must(!labels.some((l) => /related result/.test(l)), '"result" label survives');
});

/* PL-018: every level scale in the §04 builder is a named group, before and after switching prompts. */
await check('PL-018', async (page) => {
  const NAMES = { P: 'Persona', T: 'Task', C: 'Context', F: 'Format' };
  const read = () => page.evaluate(() => [...document.querySelectorAll('#hwScore .scale')].map((s) => ({ role: s.getAttribute('role'), label: s.getAttribute('aria-label') || '', e: s.getAttribute('data-e') })));
  let a = await read();
  must(a.length === 4, `${a.length} scales`);
  must(a.every((x) => x.role === 'group' && x.label.indexOf(NAMES[x.e]) >= 0), 'a scale lacks role=group or a label naming its element: ' + JSON.stringify(a));
  await page.click('#fixtures button[data-fx="1"]');
  a = await read();
  must(a.every((x) => x.role === 'group' && x.label.indexOf(NAMES[x.e]) >= 0), 'group names lost after switching to F2');
});

/* PL-019: the selected starter prompt carries aria-pressed. */
await check('PL-019', async (page) => {
  const read = () => page.evaluate(() => [...document.querySelectorAll('[data-fx]')].map((b) => b.getAttribute('aria-pressed')));
  must(JSON.stringify(await read()) === '["true","false","false"]', 'aria-pressed at load: ' + JSON.stringify(await read()));
  await page.click('#fixtures button[data-fx="2"]');
  must(JSON.stringify(await read()) === '["false","false","true"]', 'aria-pressed after F3: ' + JSON.stringify(await read()));
});

/* PL-020: the §05 feedback renders the section sign, not its entity. */
await check('PL-020', async (page) => {
  await page.click('#quiz .qitem:nth-child(2) button[data-o="C"]');
  const f2 = await page.evaluate(() => document.querySelector('#quiz .qitem:nth-child(2) .qfb').textContent);
  must(f2.indexOf('§03') >= 0 && f2.indexOf('&sect;') < 0, 'item 2 feedback: ' + f2);
  await page.click('#quiz .qitem:nth-child(6) button[data-o="C"]');
  const f6 = await page.evaluate(() => document.querySelector('#quiz .qitem:nth-child(6) .qfb').textContent);
  must(f6.indexOf('§07') >= 0 && f6.indexOf('&sect;') < 0, 'item 6 feedback: ' + f6);
  must(!/&sect;0[37]/.test(SRC.slice(SRC.indexOf('var QZ='), SRC.indexOf('var DIMS='))), 'an &sect; entity survives in the QZ block');
});

/* PL-021: §06's two h3 are sentence case; the document name keeps its case. */
await check('PL-021', async (page) => {
  const h = await page.evaluate(() => [...document.querySelectorAll('#s8 h3')].map((x) => x.textContent.trim()));
  must(h.includes('Start a reverse-prompting interview'), 'starter heading not sentence case: ' + h.join(' | '));
  must(h.includes('Specification diagnosis on your own prompt'), 'diagnosis heading not sentence case: ' + h.join(' | '));
  must(h.includes('The Cole Buy-Sell Agreement'), 'the document name changed');
});

/* PL-022: the garden-path sentence is gone and the frame sentence stands. */
await check('PL-022', async (page) => {
  const t = await page.evaluate(() => document.getElementById('s8').textContent);
  must(!/asked you to reveal it/.test(t), '"asked you to reveal it" still rendered');
  must(/The questions it asked back are below\. The ones you would not have thought to answer are the point\./.test(t), 'frame sentence missing');
});

/* PL-023: the buy-sell panel states its instruction once; the click path still works. */
await check('PL-023', async (page) => {
  const before = await page.evaluate(() => ({ hint: document.querySelectorAll('#bsell p.dim').length, lab: (document.querySelector('#bsell .plab') || {}).textContent || '' }));
  must(before.hint === 0, `${before.hint} hint paragraph(s) still in #bsell`);
  must(/Click each question/.test(before.lab), 'panel label missing');
  await page.click('#bsell .bq[data-i="0"]');
  const mid = await page.evaluate(() => [...document.querySelectorAll('#bsell .bq span:last-child')].map((x) => x.textContent));
  must(!/Click to reveal/.test(mid[0]) && /Click to reveal/.test(mid[1]), 'one click did not open exactly one question');
  must(/1 of 10 asked/.test(await page.evaluate(() => document.getElementById('bsellCount').textContent)), 'count did not move');
  await page.click('#bsellReveal');
  const after = await page.evaluate(() => [...document.querySelectorAll('#bsell .bq span:last-child')].map((x) => x.textContent));
  must(after.every((t) => !/Click to reveal/.test(t)), 'reveal the rest left a question closed');
});

/* PL-025: the B4 chart lays out for its three rows. */
await check('PL-025', async (page) => {
  await page.click('#tierbar button[data-level="1"]'); /* B4 is standard tier */
  const r = await page.evaluate(() => {
    const g = document.getElementById('adoptChart'), svg = g.closest('svg');
    const [, , vw, vh] = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);
    const rects = [...g.querySelectorAll('rect')];
    const lastBottom = Math.max(...rects.map((x) => +x.getAttribute('y') + +x.getAttribute('height')));
    const axis = g.querySelector('line');
    const texts = [...g.querySelectorAll('text')];
    const cap = texts.map((t) => t.textContent).find((t) => /ROWS/.test(t)) || '';
    const outside = texts.filter((t) => { const b = t.getBBox(); return b.width && (b.x + b.width > vw + 2 || b.y + b.height > vh + 2); }).map((t) => t.textContent.slice(0, 30));
    return { bars: rects.length / 2, lastBottom, axisY2: +axis.getAttribute('y2'), cap, vh, outside };
  });
  must(r.bars === 3, `${r.bars} bars`);
  must(/ROWS 1 AND 3/.test(r.cap), 'caption: ' + r.cap);
  must(r.axisY2 <= r.lastBottom + 8, `axis runs to ${r.axisY2}, last row ends at ${r.lastBottom}`);
  must(r.outside.length === 0, 'text outside the frame: ' + r.outside.join(' | '));
});

/* PL-027: the cutoff aphorism appears once in §07, in the failure-type card. */
await check('PL-027', async (page) => {
  const r = await page.evaluate(() => {
    const t = document.getElementById('s10').textContent;
    const cards = [...document.querySelectorAll('#s10 .cards .card')];
    const find = (s) => cards.find((c) => (c.querySelector('.num') || {}).textContent.indexOf(s) >= 0);
    return { n: (t.match(/Training data has a cutoff/g) || []).length, type3: /Training data has a cutoff/.test(find('Type 03').textContent), check3: /Training data has a cutoff/.test(find('Check 03').textContent) };
  });
  must(r.n === 1 && r.type3 && !r.check3, JSON.stringify(r));
});

/* PL-028: §08 opens with the section sign form. */
await check('PL-028', async (page) => {
  const t = await page.evaluate(() => document.querySelector('#s11 p.big').textContent.trim());
  must(/^§04 rebuilt one of your prompts\./.test(t), 'opening sentence: ' + t.slice(0, 60));
  must(!/the workshop/.test(t), '"the workshop" still in the sentence');
});

/* PL-029: the first live-audit criterion no longer addresses the peer reviewer. */
await check('PL-029', async (page) => {
  const t = await page.evaluate(() => document.querySelector('#peer p').textContent.trim());
  must(t === 'Pasted in as written, it produced something, with no change to the template itself.', 'criterion reads: ' + t);
});

/* PL-030: the selected template carries aria-pressed. */
await check('PL-030', async (page) => {
  const read = () => page.evaluate(() => [...document.querySelectorAll('[data-tpl]')].map((b) => b.getAttribute('aria-pressed')));
  must(JSON.stringify(await read()) === '["true","false","false"]', 'at load: ' + JSON.stringify(await read()));
  await page.click('[data-tpl="note"]');
  must(JSON.stringify(await read()) === '["false","true","false"]', 'after the note template: ' + JSON.stringify(await read()));
  must(/Input is defined/.test(await page.evaluate(() => document.getElementById('rubric').textContent)), 'the note rubric did not render');
});

/* PL-032: B5's question has one subject. */
await check('PL-032', async (page) => {
  const t = await page.evaluate(() => document.querySelector('#s12d p.big').textContent);
  must(!/section 04, the workshop/.test(t), 'old clause still rendered');
  must(/if a reliable prompt has to be specified as carefully as §04 required, has the tool saved time/.test(t), 'replacement missing');
});

/* PL-033: the two room-percentage inputs carry names. */
await check('PL-033', async (page) => {
  const r = await page.evaluate(() => ['rm1', 'rm2'].map((id) => document.getElementById(id).getAttribute('aria-label') || ''));
  must(/vote 1/i.test(r[0]) && /vote 2/i.test(r[1]), 'aria-labels: ' + JSON.stringify(r));
});

await browser.close();
for (const [id, st, why] of out) console.log(`${id} ${st}${why ? ' ' + why : ''}`);
const fails = out.filter((r) => r[1] === 'FAIL').length;
console.log(`summary: ${out.length - fails} OK, ${fails} FAIL`);
process.exit(fails ? 1 : 0);
