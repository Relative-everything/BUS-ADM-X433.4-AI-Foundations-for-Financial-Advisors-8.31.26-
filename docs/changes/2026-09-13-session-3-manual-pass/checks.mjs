#!/usr/bin/env node
/**
 * checks.mjs, the per-item browser harness for the Session 3 manual pass.
 * One check per ledger item that has a DOM test. Chromium through the same
 * global Playwright resolution scripts/verify-browser.mjs uses; the page is
 * opened from a file:// URL at 1280 px; every check gets a fresh page.
 *
 *   NODE_PATH=$(npm root -g) node docs/changes/2026-09-13-session-3-manual-pass/checks.mjs
 *
 * Output: one line per check, "JN-nnn OK" or "JN-nnn FAIL <reason>", then a
 * summary; exit 1 on any FAIL. Not part of the pre-push gate (kickoff <intake>).
 * Checks are added as their items land; a check for an item not yet landed is
 * not written speculatively.
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
const FILE = join(REPO, 'session-3/index.html');
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
    /* the page scrolls smoothly by design; the harness scrolls instantly so a
       click far down the page does not wait on the animation */
    await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    await fn(page);
    out.push([id, 'OK', '']);
  } catch (e) {
    out.push([id, 'FAIL', String(e.message || e)]);
  } finally { await page.close(); }
}

/* Shared: the four preset rankings, read from the retriever panel. */
async function presets(page) {
  const rows = [];
  for (let i = 0; i < 4; i++) {
    await page.click(`#qPresets button:nth-child(${i + 1})`);
    const t = await page.evaluate(() => document.getElementById('qOut').innerText);
    rows.push(t.split('\n').filter((l) => /^#\d|%/.test(l)).map((l) => l.replace(/\s+/g, ' ').trim()));
  }
  return rows;
}

/* ---- checks are appended below as items land ---- */

/* JN-018: the pacing panel is the three timing cells and the four buttons. */
await check('JN-018', async (page) => {
  const r = await page.evaluate(() => ({
    cells: document.querySelectorAll('#paceOut .pcell').length,
    paras: document.querySelectorAll('#paceOut p').length,
    tierOut: !!document.getElementById('tierOut'),
    plab: [...document.querySelectorAll('.pace .plab')].map((x) => x.textContent),
    buttons: document.querySelectorAll('#tierbar button').length,
    apx: document.querySelectorAll('section.apx').length,
    coreOnly: document.body.classList.contains('core-only'),
    hidden: [...document.querySelectorAll('section.apx')].filter((s) => getComputedStyle(s).display === 'none').length,
  }));
  must(r.cells === 3, `${r.cells} timing cells, expected 3`);
  must(r.paras === 0, `${r.paras} paragraph(s) still in #paceOut`);
  must(!r.tierOut, '#tierOut readout still present');
  must(!r.plab.some((t) => /paced/i.test(t)), 'the "How this session is paced" heading still present');
  must(r.buttons === 4, `${r.buttons} tier buttons, expected 4`);
  must(r.coreOnly && r.hidden === r.apx && r.apx > 0, `at load core-only=${r.coreOnly}, ${r.hidden} of ${r.apx} appendix sections hidden`);
  const state = () => page.evaluate(() => ({
    coreOnly: document.body.classList.contains('core-only'),
    hidden: [...document.querySelectorAll('section.apx')].filter((s) => getComputedStyle(s).display === 'none').length,
    apx: document.querySelectorAll('section.apx').length,
  }));
  await page.click('#tierbar button[data-level="1"]');
  const s1 = await state();
  must(!s1.coreOnly && s1.hidden === 0, `after +Standard, core-only=${s1.coreOnly}, ${s1.hidden} appendix sections still hidden`);
  await page.click('#tierbar button.core');
  const s2 = await state();
  must(s2.coreOnly && s2.hidden === s2.apx, `after Core only, core-only=${s2.coreOnly}, ${s2.hidden} of ${s2.apx} hidden`);
});

/* JN-016: the Case facts button sits at the top of the viewport and opens the dialog, at 1280 and 380 px. */
async function caseButtonAt(page) {
  return page.evaluate(() => {
    const b = document.getElementById('caseBtn'); const r = b.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    b.click();
    const open = document.getElementById('caseModal').classList.contains('open');
    return { top: Math.round(r.top), right: Math.round(r.right), width: innerWidth, hit: hit === b, open };
  });
}
await check('JN-016', async (page) => {
  const a = await caseButtonAt(page);
  must(a.top >= 0 && a.top < 40, `button top at ${a.top}px, expected inside the first 40px`);
  must(a.hit && a.open, `button not the top element at its centre (${a.hit}) or dialog did not open (${a.open})`);
  must(a.right <= a.width, `button right edge ${a.right} beyond the ${a.width}px viewport`);
  const narrow = await browser.newContext({ viewport: { width: 380, height: 900 } });
  const p2 = await narrow.newPage();
  await p2.goto(URL, { waitUntil: 'load' }); await p2.waitForTimeout(300);
  const b = await caseButtonAt(p2);
  await narrow.close();
  must(b.top >= 0 && b.top < 40 && b.hit && b.open && b.right <= 380, `at 380px: top ${b.top}, hit ${b.hit}, open ${b.open}, right ${b.right}`);
});

/* JN-025: clicking a term draws three connector lines with their distances; the next click redraws. */
await check('JN-025', async (page) => {
  const before = await page.evaluate(() => document.querySelectorAll('#mapWrap line.mapln').length);
  must(before === 0, `${before} connector(s) drawn before any click`);
  await page.click('#mapWrap g.mp[data-i="0"]');
  const r = await page.evaluate(() => ({
    lines: document.querySelectorAll('#mapWrap line.mapln').length,
    labels: [...document.querySelectorAll('#mapWrap text.mapdist')].map((t) => t.textContent),
    out: document.getElementById('mapOut').textContent,
  }));
  must(r.lines === 3, `${r.lines} connector lines after a click, expected 3`);
  must(r.labels.length === 3 && r.labels.every((t) => /^\d+\.\d$/.test(t)), `distance labels: ${r.labels.join(', ')}`);
  for (const t of r.labels) must(r.out.includes(t), `label ${t} not in the readout`);
  await page.click('#mapWrap g.mp[data-i="8"]');
  const n = await page.evaluate(() => document.querySelectorAll('#mapWrap line.mapln').length);
  must(n === 3, `${n} connector lines after the second click, expected 3`);
});

/* JN-027: a placed pair is listed under the bucket it was placed in, answered at once; the key opens after the last. */
await check('JN-027', async (page) => {
  await page.click('#pairList button:nth-child(1)');          /* alligator / crocodile, key ctx */
  await page.click('#pairBoxes .bslot:nth-child(3) button.lbox'); /* the third bucket, ref: wrong */
  const r = await page.evaluate(() => {
    const ul = document.querySelector('#pairBoxes .bslot:nth-child(3) ul.placed');
    return { n: ul.children.length, cls: ul.children[0] && ul.children[0].className, txt: ul.textContent,
      chipDone: document.querySelector('#pairList button:nth-child(1)').classList.contains('done'),
      keyShown: getComputedStyle(document.getElementById('pairKey')).display !== 'none',
      out: document.getElementById('pairOut').textContent };
  });
  must(r.n === 1 && r.cls === 'flag', `placed list has ${r.n} item(s) with class "${r.cls}"`);
  must(/alligator/.test(r.txt) && /Belongs under/.test(r.txt) && /Wolfram/.test(r.txt), 'the placed item lacks its text, the right bucket or its why');
  must(r.chipDone, 'the placed chip is not dimmed');
  must(!r.keyShown, 'the key opened before the last item');
  must(/1 of 6 placed/.test(r.out) && /0 right/.test(r.out), `progress reads "${r.out.slice(0, 60)}"`);
  /* place the remaining five correctly by their bucket order gov, gov, ref, gov, ref */
  const order = [2, 2, 3, 2, 3];
  for (let i = 0; i < 5; i++) {
    await page.click(`#pairList button:nth-child(${i + 2})`);
    await page.click(`#pairBoxes .bslot:nth-child(${order[i]}) button.lbox`);
  }
  const k = await page.evaluate(() => ({ keyShown: getComputedStyle(document.getElementById('pairKey')).display !== 'none',
    key: document.getElementById('pairKey').textContent, out: document.getElementById('pairOut').textContent }));
  must(k.keyShown && /Score5 of 6|Score\s*5 of 6/.test(k.key.replace(/\n/g, '')), `key after six: shown ${k.keyShown}, text ${k.key.slice(-40)}`);
  must(/6 of 6 placed/.test(k.out), `progress after six reads "${k.out.slice(0, 40)}"`);
});

/* JN-030: the preset rankings are unchanged (Part O untouched) and the verdict states the appraisal's true rank. */
await check('JN-030', async (page) => {
  const rows = await presets(page);
  const want = [
    ['#1 D1 score 11.1', '#2 D6 score 5.1', '#3 D3 score 3.3', '#4 D2 score 0.0', '53.8%'],
    ['#1 D5 score 18.2', '#2 D4 score 17.9', '#3 D1 score 0.0', '#4 D2 score 0.0', '1.7%'],
    ['#1 D8 score 29.2', '#2 D3 score 8.0', '#3 D7 score 3.8', '#4 D1 score 3.7', '72.8%'],
    ['#1 D7 score 26.5', '#2 D1 score 0.0', '#3 D2 score 0.0', '#4 D3 score 0.0', '100.0%'],
  ];
  rows.forEach((r, i) => want[i].forEach((w, j) => must(r[j] && r[j].startsWith(w), `preset ${i + 1} row ${j + 1}: "${r[j]}" does not start with "${w}"`)));
  must(/under 12% apart/.test(rows[1][4]), `preset 2 margin line: "${rows[1][4]}"`);
  await page.click('#qPresets button:nth-child(1)');
  await page.click('#qVerdict');
  const v = await page.evaluate(() => document.getElementById('qVer').textContent);
  must(/ranks third at 3\.3/.test(v) && /Meg and CPC, appear in no passage/.test(v), 'preset 1 verdict does not state the appraisal\'s rank and the absent words');
  must(!/scores 0\.0|scored 0\.0|scored zero/.test(SRC), 'a "scored zero" sentence survives in the source');
});

/* JN-005: §04 commits before the figures; the key names the measured range; four bars; no NaN. */
await check('JN-005', async (page) => {
  must(!/id="s7" data-nav="Grounded error"|VALOPT|figRetr|cbG/.test(SRC), 'the old §04/§05 material survives in the source');
  const r0 = await page.evaluate(() => ({ n: document.querySelectorAll('#grBtns button').length, key: getComputedStyle(document.getElementById('grKey')).display,
    bars: document.querySelectorAll('#figHall rect').length }));
  must(r0.n === 3 && r0.key === 'none' && r0.bars === 4, `before: ${r0.n} options, key ${r0.key}, ${r0.bars} bars`);
  await page.click('#grBtns button:nth-child(2)');
  const r = await page.evaluate(() => ({ key: document.getElementById('grKey').textContent, shown: getComputedStyle(document.getElementById('grKey')).display,
    locked: [...document.querySelectorAll('#grBtns button')].filter((b) => b.disabled).length, all: document.getElementById('s6').textContent }));
  must(r.shown !== 'none' && /17 to 33/.test(r.key) && /Grounded\. Cited\./.test(r.key), 'key not shown or missing the measured range');
  must(r.locked === 2, `${r.locked} options locked, expected 2`);
  must(!/NaN|undefined/.test(r.all), 'NaN or undefined rendered in #s6');
});

/* JN-006: §05 is core, its quiz locks on the first pick and answers the option chosen. */
await check('JN-006', async (page) => {
  must(!/id="s8"|var ARCH=/.test(SRC), 'appendix C2 or its ranking survives in the source');
  const core = await page.evaluate(() => { const s = document.getElementById('s7'); return { apx: s.classList.contains('apx'), vis: getComputedStyle(s).display !== 'none', n: s.querySelectorAll('#tuneWrap .qbtns button').length }; });
  must(!core.apx && core.vis && core.n === 3, `s7 apx=${core.apx}, visible=${core.vis}, ${core.n} options`);
  await page.click('#tuneWrap .qbtns button[data-k="ft"]');
  const r = await page.evaluate(() => { const d = document.querySelector('#tuneWrap .qitem'); return { done: d.classList.contains('done'), fb: d.querySelector('.qfb').className, txt: d.querySelector('.qfb').textContent }; });
  must(r.done && /wrong/.test(r.fb) && /retrained/.test(r.txt), `after picking fine-tuning: done=${r.done}, fb=${r.fb}`);
  /* the lock is pointer-events:none on the row, so a second pointer click is intercepted by design; dispatch it through the DOM */
  await page.evaluate(() => document.querySelector('#tuneWrap .qbtns button[data-k="gr"]').click());
  const again = await page.evaluate(() => document.querySelector('#tuneWrap .qfb').className);
  must(/wrong/.test(again), 'the item did not lock on the first pick');
});

/* JN-007: each stage panel carries the three parts and no "undefined". */
await check('JN-007', async (page) => {
  const n = await page.evaluate(() => document.querySelectorAll('#chainWrap button').length);
  must(n === 5, `${n} stage buttons, expected 5`);
  for (let i = 0; i < 5; i++) {
    await page.click(`#chainWrap button[data-i="${i}"]`);
    const t = await page.evaluate(() => document.getElementById('chainOut').textContent);
    must(/what the tool does/.test(t) && /What you check before it moves on/.test(t) && /If you skip the check/.test(t) && /First seen by a person/.test(t), `stage ${i + 1} lacks a part: ${t.slice(0, 80)}`);
    must(!/undefined|NaN/.test(t), `stage ${i + 1} renders undefined`);
  }
  must(await page.evaluate(() => document.querySelector('[data-gate="g7"]').classList.contains('done')), 'g7 not marked after all five stages');
});

/* JN-008: five turns render; each stage opens on its own click; the instruction copies. */
await check('JN-008', async (page) => {
  must(!/var RUB=|noteScore|noteBox/.test(SRC), 'the note-scoring heuristic survives in the source');
  const r0 = await page.evaluate(() => ({ turns: document.querySelectorAll('#mtgExcerpt strong').length, stages: document.querySelectorAll('#ntStages .ntstage').length,
    open: [...document.querySelectorAll('#ntStages .ntout')].filter((o) => o.style.display !== 'none').length }));
  must(r0.turns === 5 && r0.stages === 4 && r0.open === 0, `turns ${r0.turns}, stages ${r0.stages}, open at load ${r0.open}`);
  await page.click('#ntStages button[data-i="1"]');
  const r1 = await page.evaluate(() => [...document.querySelectorAll('#ntStages .ntout')].map((o) => o.style.display !== 'none'));
  must(r1.join() === 'false,true,false,false', `after opening stage 2: ${r1.join()}`);
  const t = await page.evaluate(() => document.querySelectorAll('#ntStages .ntout')[1].textContent);
  must(/Kept:/.test(t) && /Nathan/.test(t) && !/undefined/.test(t), 'extraction panel lacks its content');
  for (const i of [0, 2, 3]) await page.click(`#ntStages button[data-i="${i}"]`);
  must(await page.evaluate(() => document.querySelector('[data-gate="g8"]').classList.contains('done')), 'g8 not marked after all four stages');
  await page.click('#ntCopy');
  await page.waitForTimeout(200);
  const msg = await page.evaluate(() => document.getElementById('ntCopyMsg').textContent);
  must(msg.length > 0, 'no copy message after the copy button');
});
