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


/* JN-006: the vote reveals the run-to-run difference list. */
await check('JN-006', async (page) => {
  const before = await page.evaluate(() => document.getElementById('stanceList').hidden);
  must(before === true, 'the list is visible before the vote');
  await page.click('#stanceVote button[data-v="a"]');
  const r = await page.evaluate(() => ({ hidden: document.getElementById('stanceList').hidden,
    n: document.querySelectorAll('#stanceList li').length, text: document.getElementById('stanceList').textContent }));
  must(!r.hidden, 'the list stayed hidden after the vote');
  must(r.n >= 6, `${r.n} items, expected at least 6`);
  for (const w of ['Memory', 'instructions', 'machine', 'sampler', 'version']) must(r.text.includes(w), `list lacks "${w}"`);
});

/* JN-009: three consequence cards, the first about a compliance review, the third a consequence. */
await check('JN-009', async (page) => {
  const r = await page.evaluate(() => { const c = [...document.querySelectorAll('#s3 .cards .card')]; return { n: c.length, t: c.map((x) => x.textContent).join(' | ') }; });
  must(r.n === 3, `${r.n} cards in #s3`);
  must(/compliance review/.test(r.t) && /Control variance/.test(r.t), 'card text not updated');
  must(!/do not expose T/.test(r.t), 'old card 03 heading survives');
});

/* JN-012: the task definition and five examples render before the frontier chart. */
await check('JN-012', async (page) => {
  const r = await page.evaluate(() => {
    const h = [...document.querySelectorAll('#s5 h3')].find((x) => /What a task is/.test(x.textContent));
    let grid = h; while (grid && !(grid.classList && grid.classList.contains('cards'))) grid = grid.nextElementSibling;
    return { h: !!h, n: grid ? grid.querySelectorAll('.card').length : 0, chart: !!document.getElementById('frontierChart') };
  });
  must(r.h, 'the "What a task is" heading is missing');
  must(r.n === 5, `${r.n} task cards, expected 5`);
  must(r.chart, 'frontier chart missing');
});

/* JN-015: the estimator redraws with the sliders and names two tiers. */
await check('JN-015', async (page) => {
  const t0 = await page.evaluate(() => ({ rows: document.querySelectorAll('#mixOut .mixrow').length, sent: document.querySelector('#mixOut .mixsent').textContent }));
  must(t0.rows === 4, `${t0.rows} bars, expected 4`);
  must(/Claude Opus 5/.test(t0.sent) && /Claude Sonnet 5/.test(t0.sent), 'sentence does not name both tiers');
  const set = (id, v) => page.evaluate(([id, v]) => { const e = document.getElementById(id); e.value = String(v); e.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]);
  await set('mxJudge', 90); await set('mxDoc', 8);
  const t1 = await page.evaluate(() => ({ sent: document.querySelector('#mixOut .mixsent').textContent, all: document.getElementById('mixOut').textContent }));
  must(t1.sent !== t0.sent, 'the sentence did not change after moving two sliders');
  must(/^90% of your tasks/.test(t1.sent), `sentence does not start with the judgment share: "${t1.sent.slice(0, 40)}"`);
  must(!/NaN|undefined/.test(t1.all), 'NaN or undefined rendered');
  const gone = await page.evaluate(() => !!document.getElementById('volRuns'));
  must(!gone, 'the old number boxes are still on the page');
});


/* JN-020: the builder redraws the premade prompt as levels change and loads it into the editor. */
await check('JN-020', async (page) => {
  must(!(await page.evaluate(() => !!document.getElementById('hwText'))), 'the paste box is still on the page');
  await page.click('#fixtures button[data-fx="1"]');
  await page.click('#hwScore .scale[data-e="F"] button[data-v="3"]');
  const r = await page.evaluate(() => {
    const els = [...document.querySelectorAll('#fxPrompt .pel')];
    const f = els.find((e) => e.getAttribute('data-k') === 'F');
    return { n: els.length, ftext: f ? f.textContent : '', fclass: f ? f.className : '', all: document.getElementById('s6b').textContent, which: document.getElementById('fxWhich').textContent };
  });
  must(/F2/.test(r.which), 'F2 not selected');
  must(r.n === 4, `${r.n} elements rendered, expected 4`);
  must(/Headings: Said, Decided, Open/.test(r.ftext), 'Format level 3 text not rendered');
  must(/specified and checkable/i.test(r.ftext) && /l3/.test(r.fclass), 'Format element lacks its level label or class');
  must(!/NaN|undefined/.test(r.all), 'NaN or undefined rendered in #s6b');
  await page.click('#fxUse');
  const ed = await page.evaluate(() => document.getElementById('hwRewrite').value);
  must(/Headings: Said, Decided, Open/.test(ed), 'the editor did not receive the assembled prompt');
  await page.click('#hwScore .scale[data-e="C"] button[data-v="0"]');
  const absent = await page.evaluate(() => (document.querySelector('#fxPrompt .pel[data-k="C"]') || {}).textContent || '');
  must(/no context given/i.test(absent), 'absent level does not render as an absent marker');
});


/* JN-023: a question opens on its own click; the button reveals the rest. */
await check('JN-023', async (page) => {
  const before = await page.evaluate(() => [...document.querySelectorAll('#bsell .bq span:last-child')].map((x) => x.textContent));
  must(before.length === 10 && before.every((t) => /Click to reveal/.test(t)), 'questions not hidden at load');
  await page.click('#bsell .bq[data-i="1"]');
  const mid = await page.evaluate(() => [...document.querySelectorAll('#bsell .bq span:last-child')].map((x) => x.textContent));
  must(!/Click to reveal/.test(mid[1]) && mid[1].length > 30, 'the clicked question did not open');
  must(/Click to reveal/.test(mid[0]) && /Click to reveal/.test(mid[2]), 'other questions opened too');
  must(/1 of 10 asked/.test(await page.evaluate(() => document.getElementById('bsellCount').textContent)), 'count did not move');
  await page.click('#bsellReveal');
  const after = await page.evaluate(() => [...document.querySelectorAll('#bsell .bq span:last-child')].map((x) => x.textContent));
  must(after.every((t) => !/Click to reveal/.test(t)), 'reveal the rest left a question closed');
});

/* JN-024: a starter shows its kickoff and at least four questions. */
await check('JN-024', async (page) => {
  const n = await page.evaluate(() => document.querySelectorAll('#rpChips button').length);
  must(n === 5, `${n} starters, expected 5`);
  await page.click('#rpChips button[data-rp="2"]');
  const r = await page.evaluate(() => ({ k: document.getElementById('rpKick').textContent, q: document.getElementById('rpQs').textContent }));
  must(/retirement income/.test(r.k) && /Interview me first/.test(r.k), 'kickoff not shown for the third starter');
  must(r.q.split('\n').length >= 4, 'fewer than four questions');
  must(await page.evaluate(() => !!document.querySelector('#rpStart[data-task="t-s8b"][data-comp="builder-assembler"]')), 'root tags missing');
});

/* JN-029: every label in the hallucination chart lies inside its viewBox, at 1280 and at 380 px. */
async function chartFits(page) {
  return page.evaluate(() => {
    const svg = document.getElementById('hallChart').closest('svg');
    const [vx, vy, vw, vh] = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);
    const bad = [];
    /* getBBox is in the svg's user units, the same units as the viewBox; the
       <g> carries no transform, so the box compares directly. */
    svg.querySelectorAll('text').forEach((t) => {
      const b = t.getBBox(); if (!b.width) return;
      if (b.x + b.width > vx + vw + 2 || b.y + b.height > vy + vh + 2 || b.x < vx - 2) bad.push(t.textContent.slice(0, 40) + ` [right ${Math.round(b.x + b.width)}, bottom ${Math.round(b.y + b.height)}]`);
    });
    const c = svg.parentElement.getBoundingClientRect(), s = svg.getBoundingClientRect();
    if (s.right > c.right + 1) bad.push('svg wider than its container');
    return bad;
  });
}
await check('JN-029', async (page) => {
  const bad = await chartFits(page);
  must(bad.length === 0, 'outside the frame at 1280: ' + bad.join(' | '));
  const narrow = await browser.newContext({ viewport: { width: 380, height: 900 } });
  const p2 = await narrow.newPage();
  await p2.goto(URL, { waitUntil: 'load' }); await p2.waitForTimeout(300);
  const bad2 = await chartFits(p2);
  await narrow.close();
  must(bad2.length === 0, 'outside the frame at 380: ' + bad2.join(' | '));
});


/* JN-031: the live-audit score still scores, and the peer framing is gone. */
await check('JN-031', async (page) => {
  const t = await page.evaluate(() => document.getElementById('s11').textContent);
  must(!/pairs you after this session/.test(t) && !/Partner template/.test(t) && /Live audit/.test(t), 'peer text survives or live audit missing');
  for (let i = 0; i < 4; i++) await page.click(`#peer .pv[data-i="${i}"][data-v="3"]`);
  const out = await page.evaluate(() => document.getElementById('peerOut').textContent);
  must(/TOTAL  12 \/ 12/.test(out), `scorer did not total: ${out.slice(0, 40)}`);
});

/* JN-033 and JN-032: §09 keeps the capture and the checklist and nothing below. */
await check('JN-033', async (page) => {
  const r = await page.evaluate(() => { const s = document.getElementById('s12'); return { t: s.textContent, cards: s.querySelectorAll('.cards .card').length, cap: !!document.getElementById('baseCopy'), chk: !!document.getElementById('checklist') }; });
  for (const w of ['The First Draft', 'Reading for Session 3', 'Closing question', 'Two absolute rules', 'What Session 3 does']) must(!r.t.includes(w), `"${w}" still rendered`);
  must(r.cards === 2 && r.cap && r.chk, 'capture, checklist or the two cards missing');
});

/* JN-034: Three Cups, the full sequence, readouts exactly 33, 50, 100. */
await check('JN-034', async (page) => {
  await page.click('#tierbar button[data-level="0"]'); /* B2 is appendix tier; core-only hides it at load */
  const reads = [];
  const read = async () => { reads.push(await page.evaluate(() => document.getElementById('cupRead').textContent)); };
  must(await page.evaluate(() => document.getElementById('cupStart').disabled && document.getElementById('cupPlay').hidden), 'Start enabled or cups shown before a prediction');
  await page.click('#cupOpts button[data-p="66"]');
  must(await page.evaluate(() => [...document.querySelectorAll('#cupOpts button')].every((b) => b.disabled)), 'options did not lock');
  await page.click('#cupStart'); await read();
  must(/33%$/.test(reads[0]), `first readout "${reads[0]}"`);
  const tags = await page.evaluate(() => [...document.querySelectorAll('#cups .cup, #cupOpts > *, #cupStart, #cupShow, #cupAgain')].map((e) => e.tagName));
  must(tags.every((t) => t === 'BUTTON'), 'a control is not a <button>');
  await page.click('#cupRow .cup[data-c="B"]'); await read();
  must(/50%$/.test(reads[1]), `second readout "${reads[1]}"`);
  must(await page.evaluate(() => document.querySelector('#cupRow .cup[data-c="B"]').disabled), 'lifted cup still interactive');
  await page.click('#cupRow .cup[data-c="A"]'); await read();
  must(/100%$/.test(reads[2]), `third readout "${reads[2]}"`);
  must(!reads.some((r) => /66%/.test(r)), 'a readout showed 66%');
  const r = await page.evaluate(() => ({ last: document.querySelector('#cupRow .cup[data-c="C"]').className, cap: document.getElementById('cupCap').textContent, gap: document.getElementById('cupGap').hidden, you: document.getElementById('gapYouV').textContent, note: document.getElementById('gapNote').textContent }));
  must(/last/.test(r.last) && /never lifted it/.test(r.cap), 'last cup not highlighted or captioned');
  must(!r.gap && r.you === '66%' && /what you knew moved/.test(r.note), 'gap panel wrong');
  await page.click('#cupShow');
  must(await page.evaluate(() => !!document.querySelector('#cupRow .cup[data-c="C"] .coin')), 'Show coin did not reveal a coin');
  await page.click('#cupAgain');
  must(await page.evaluate(() => document.getElementById('cupPlay').hidden && document.getElementById('cupStart').disabled && ![...document.querySelectorAll('#cupOpts button')].some((b) => b.disabled)), 'Play again did not reset');
});


/* JN-035: each triage explanation is 3 to 6 bullets and renders as a list.
   CITES is scoped inside the page's IIFE, so the counts are read from the DOM:
   one classification per item on a fresh page, then the rendered bullets. */
await check('JN-035', async (page) => {
  const items = page.locator('#triage > div:not(.mono)'); /* the seventh div is the running tally */
  const n = await items.count();
  must(n === 6, `${n} triage items`);
  const counts = [];
  for (let i = 0; i < 6; i++) {
    await items.nth(i).locator('button[data-k="' + (i === 2 ? 'mis' : 'sound') + '"]').click();
    counts.push(await items.nth(i).locator('.fbx li').count());
  }
  must(counts.every((c) => c >= 3 && c <= 6), `bullet counts ${counts.join(',')}`);
  const r = await items.nth(2).evaluate((d) => ({ txt: d.querySelector('.fbx').textContent, shown: d.querySelector('.fbx').style.display, paras: d.querySelectorAll('.fbx p').length }));
  must(r.shown === 'block' && r.paras === 0, 'feedback not shown as a list');
  must(/Correct\./.test(r.txt) && /Situation 3/.test(r.txt) && !/&sect;/.test(r.txt), 'feedback text wrong or entity shown literally');
});

/* JN-036: no verification gate is left on the page; the case dialog still opens and closes. */
await check('JN-036', async (page) => {
  const gates = await page.locator('.verify').count();
  must(gates === 0, `${gates} .verify gate(s) still on the page`);
  await page.click('#caseBtn');
  const opened = await page.evaluate(() => /(^|\s)open(\s|$)/.test(document.getElementById('caseModal').className));
  must(opened, 'case dialog did not open');
  await page.click('#caseClose');
  const closed = await page.evaluate(() => !/(^|\s)open(\s|$)/.test(document.getElementById('caseModal').className));
  must(closed, 'case dialog did not close');
});

/* JN-037: the benchmark-task block: six kinds, each with a prompt and a scoring line, between the five
   advisory tasks and the frontier chart, chipped M to src-aa and labelled illustrative. */
await check('JN-037', async (page) => {
  const r = await page.evaluate(() => {
    const h3s = [...document.querySelectorAll('#s5 h3')];
    const h = h3s.find((x) => /What a benchmark task is/.test(x.textContent));
    const tasks = h3s.find((x) => /^\s*What a task is\s*$/.test(x.textContent));
    const grid = document.getElementById('benchKinds');
    const cards = grid ? [...grid.querySelectorAll('.card')] : [];
    const chart = document.getElementById('frontierChart');
    const order = !!(h && tasks && chart && (tasks.compareDocumentPosition(h) & 4) && (h.compareDocumentPosition(chart) & 4));
    const para = h ? h.nextElementSibling : null;
    const chip = !!(para && para.querySelector('.conf[data-src="src-aa"]'));
    const sim = !!(grid && grid.nextElementSibling && grid.nextElementSibling.querySelector('.sim'));
    const prompts = cards.filter((c) => { const p = c.querySelector('.pel'); return p && p.textContent.replace(/^\s*Prompt/, '').trim().length > 40; }).length;
    const scored = cards.filter((c) => /Scored/.test(c.textContent)).length;
    return { h: !!h, n: cards.length, order, chip, sim, prompts, scored };
  });
  must(r.h, 'the "What a benchmark task is" heading is missing');
  must(r.n === 6, `${r.n} kind cards, expected 6`);
  must(r.prompts === 6 && r.scored === 6, `prompts ${r.prompts}, scoring lines ${r.scored}`);
  must(r.order, 'block is not between the task cards and the frontier chart');
  must(r.chip && r.sim, 'M chip or illustrative label missing');
});

await browser.close();
for (const [id, st, why] of out) console.log(`${id} ${st}${why ? ' ' + why : ''}`);
const fails = out.filter((r) => r[1] === 'FAIL').length;
console.log(`summary: ${out.length - fails} OK, ${fails} FAIL`);
process.exit(fails ? 1 : 0);
