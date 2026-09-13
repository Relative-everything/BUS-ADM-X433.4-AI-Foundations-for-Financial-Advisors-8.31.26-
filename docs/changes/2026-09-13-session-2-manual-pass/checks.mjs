#!/usr/bin/env node
/**
 * checks.mjs, the per-item browser harness for the Session 2 manual pass.
 * One check per ledger item that has a DOM test. Chromium through the same
 * global Playwright resolution scripts/verify-browser.mjs uses; the page is
 * opened from a file:// URL at 1280 px; every check gets a fresh page.
 *
 *   NODE_PATH=$(npm root -g) node docs/changes/2026-09-13-session-2-manual-pass/checks.mjs
 *
 * Output: one line per check, "JN-nnn OK" or "JN-nnn FAIL <reason>", then a
 * summary; exit 1 on any FAIL. Not part of the pre-push gate (kickoff <intake>).
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

/* JN-001: the Shift+U override is gone: no badge, no handler, no effect. */
await check('JN-001', async (page) => {
  must(!/shiftKey\s*&&\s*\(e\.key===?'U'/.test(SRC), 'source still binds the Shift+U override (the case viewer has its own shiftKey use, which is not it)');
  must(!/id="ovr"/.test(SRC), 'source still carries the #ovr badge');
  const before = await page.evaluate(() => ({
    done: document.querySelectorAll('[data-gate].done').length,
    bans: [...document.querySelectorAll('.bans')].filter((d) => d.style.display === 'block').length,
  }));
  await page.keyboard.down('Shift'); await page.keyboard.press('KeyU'); await page.keyboard.up('Shift');
  await page.waitForTimeout(150);
  const after = await page.evaluate(() => ({
    done: document.querySelectorAll('[data-gate].done').length,
    bans: [...document.querySelectorAll('.bans')].filter((d) => d.style.display === 'block').length,
    ovr: !!document.getElementById('ovr'),
  }));
  must(!after.ovr, '#ovr present in the DOM');
  must(after.done === before.done, `Shift+U marked gates (${before.done} -> ${after.done})`);
  must(after.bans === before.bans, `Shift+U revealed bridge keys (${before.bans} -> ${after.bans})`);
});

/* JN-002: the s0 block from the case cards to the bridge gate is gone. */
await check('JN-002', async (page) => {
  const r = await page.evaluate(() => {
    const s = document.getElementById('s0');
    return {
      cards: s.querySelectorAll('.cards').length,
      flag: s.querySelectorAll('.caseflag').length,
      doit: s.querySelectorAll('.doit').length,
      g1: document.querySelectorAll('[data-gate="g1"]').length,
      text: s.textContent,
      h1: !!s.querySelector('h1'),
      bridge: !!document.getElementById('bridge'),
    };
  });
  must(r.cards === 0, `${r.cards} .cards block(s) still in #s0`);
  must(r.flag === 0, `${r.flag} .caseflag still in #s0`);
  must(r.doit === 0, `${r.doit} .doit still in #s0`);
  must(r.g1 === 0, 'the g1 work-along gate is still on the page');
  for (const s of ['The Cole household', 'Nine terms', 'Before we start', 'Outcome 01', 'Every figure in these cards'])
    must(!r.text.includes(s), `"${s}" still rendered in #s0`);
  must(r.h1 && r.bridge, 'h1 or #bridge missing from #s0');
});

/* JN-003: the cold open is heading, box, button; the analyser still runs. */
await check('JN-003', async (page) => {
  const r = await page.evaluate(() => {
    const s = document.getElementById('sCold');
    return {
      big: s.querySelectorAll('p.big').length,
      gc: s.querySelectorAll('[data-gate="gc"]').length,
      text: s.textContent,
      h2: (s.querySelector('h2') || {}).textContent || '',
    };
  });
  must(r.big === 0, 'p.big lede still in #sCold');
  must(r.gc === 0, 'the gc work-along gate still in #sCold');
  must(!/First run\./.test(r.text), '"First run." still rendered');
  must(!/Not a good one/.test(r.text), 'the opening line still rendered');
  must(/The Last Prompt You Sent/.test(r.h2), 'h2 changed');
  await page.fill('#coldPrompt', 'Write me a summary of the attached trust for the Coles, two paragraphs, plain English.');
  await page.click('#coldGo');
  await page.waitForTimeout(150);
  const outText = await page.evaluate(() => document.getElementById('coldOut').textContent);
  must(/of 8 present/.test(outText), 'analyser did not render "n of 8 present": ' + outText.slice(0, 80));
});

/* JN-004: the pacing panel is the three timing cells and the four buttons. */
await check('JN-004', async (page) => {
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
  must(r.coreOnly && r.hidden === r.apx && r.apx === 5, `at load core-only=${r.coreOnly}, ${r.hidden} of ${r.apx} appendix sections hidden`);
  const state = () => page.evaluate(() => ({
    coreOnly: document.body.classList.contains('core-only'),
    hidden: [...document.querySelectorAll('section.apx')].filter((s) => getComputedStyle(s).display === 'none').length,
  }));
  await page.click('#tierbar button[data-level="1"]');
  const s1 = await state();
  must(!s1.coreOnly && s1.hidden === 0, `after +Standard, core-only=${s1.coreOnly}, ${s1.hidden} appendix sections still hidden`);
  await page.click('#tierbar button.core');
  const s2 = await state();
  must(s2.coreOnly && s2.hidden === 5, `after Core only, core-only=${s2.coreOnly}, ${s2.hidden} hidden, expected 5`);
});

/* JN-005: three bridge items, count and reveal work, keys carry the evidence. */
await check('JN-005', async (page) => {
  const r0 = await page.evaluate(() => ({
    n: document.querySelectorAll('#bridge textarea').length,
    count: document.getElementById('bridgeCount').textContent,
    btn: document.getElementById('bridgeReveal').textContent,
    vis: [...document.querySelectorAll('.bans')].filter((d) => d.style.display === 'block').length,
  }));
  must(r0.n === 3, `${r0.n} bridge items, expected 3`);
  must(/0 of 3 answered/.test(r0.count), `count reads "${r0.count}"`);
  must(/Reveal all three/.test(r0.btn), `button reads "${r0.btn}"`);
  must(r0.vis === 0, 'a key is visible before reveal');
  await page.fill('#bridge textarea[data-b="1"]', 'the system prompt and every earlier turn');
  const c1 = await page.evaluate(() => document.getElementById('bridgeCount').textContent);
  must(/1 of 3 answered/.test(c1), `after one answer the count reads "${c1}"`);
  await page.click('#bridgeReveal');
  const keys = await page.evaluate(() => [...document.querySelectorAll('.bans')]
    .filter((d) => d.style.display === 'block').map((d) => d.textContent));
  must(keys.length === 3, `${keys.length} keys visible after reveal`);
  must(/five times/i.test(keys[0]), 'item 1 key lacks the input-to-output ratio');
  must(/all previous conversation history/i.test(keys[1]), 'item 2 key lacks the context-window contents');
  must(/context rot/i.test(keys[2]) && /ten to fifteen/i.test(keys[2]), 'item 3 key lacks the rule or the degradation evidence');
  const bad = await page.evaluate(() => /\b(undefined|NaN)\b/.test(document.getElementById('s0').textContent));
  must(!bad, '"undefined" or "NaN" rendered in #s0');
});

await browser.close();
for (const [id, st, why] of out) console.log(`${id} ${st}${why ? ' ' + why : ''}`);
const fails = out.filter((r) => r[1] === 'FAIL').length;
console.log(`summary: ${out.length - fails} OK, ${fails} FAIL`);
process.exit(fails ? 1 : 0);
