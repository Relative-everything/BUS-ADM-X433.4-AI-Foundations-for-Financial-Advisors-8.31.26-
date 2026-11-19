#!/usr/bin/env node
/**
 * commit-map-audit.mjs: does each commit marker match the controls it should, and only those?
 * For every marked task in the six lessons, in Chromium with everything revealed, it lists what the
 * marker matches and fails when a marker matches nothing, or matches a control whose label says it is not
 * an answer (reset, clear, start again, play again, copy, reveal, show, run, next, why, try, draw, sweep).
 * The full table (task, section, component, what counts) is printed with --table for the instructor.
 */
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { REPO } from './css-rules.mjs';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = createRequire(join(process.env.NODE_PATH || '/usr/lib/node_modules', 'x.js'))('playwright')); }
const TABLE = process.argv.includes('--table'); const NOT = /^(reset|clear|start (over|again)|play again|again|copy|reveal|show|run|next|why|try|draw|sweep|not sure|last step|◂|▸)/i;
const browser = await chromium.launch(); let fail = 0, tasks = 0, marked = 0;
for (const l of ['session-0.1', 'session-1', 'session-2', 'session-3', 'session-4', 'session-5']) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } }); await page.route(/^https?:/, r => r.abort()); await page.goto('file://' + join(REPO, l, 'index.html'), { waitUntil: 'load' });
  await page.keyboard.press('Shift+U').catch(() => {}); await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; })); await page.waitForTimeout(250);
  const rows = await page.evaluate(() => [...document.querySelectorAll('[data-task]')].map(t => { const sec = t.closest('section'); const sel = t.getAttribute('data-commit-in'); let els = [];
    if (sel) { try { els = [...t.querySelectorAll(sel)]; } catch (e) { els = null; } } const own = [...t.querySelectorAll('[data-commit]')]; if (t.hasAttribute('data-commit')) own.push(t);
    const lab = e => (e.textContent || e.getAttribute('aria-label') || e.placeholder || e.type || e.tagName).replace(/\s+/g, ' ').trim().slice(0, 28);
    return { task: t.getAttribute('data-task'), sec: sec ? sec.id : '', nav: sec ? sec.getAttribute('data-nav') : '', comp: t.getAttribute('data-comp'), sel, bad: els === null, n: (els || []).length + own.length, labels: [...new Set([...(els || []), ...own].map(lab))], needs: t.getAttribute('data-commit-needs') || (own[0] && own[0].getAttribute('data-commit-needs')) || '', marked: !!sel || own.length > 0 }; }));
  for (const r of rows) { tasks++; if (!r.marked) { if (TABLE) console.log([l, r.sec, r.nav, r.task, r.comp, '(no check: nothing to commit)', ''].join(' | ')); continue; } marked++;
    const wrong = r.labels.filter(x => NOT.test(x));
    if (r.bad || r.n === 0 || wrong.length) { fail++; console.log('FAIL  ' + l + ' ' + r.task + ' (' + r.comp + ')  ' + (r.bad ? 'selector is invalid' : r.n === 0 ? 'marker matches no control: ' + r.sel : 'marker matches a non-answer control: ' + wrong.join(', '))); }
    if (TABLE) console.log([l, r.sec, r.nav, r.task, r.comp, r.n + ' control(s): ' + r.labels.slice(0, 5).join(" / "), r.needs ? 'needs text in ' + r.needs : ''].join(' | ')); }
  await page.close();
}
await browser.close();
console.log('\nsummary: ' + (fail ? fail + ' marker(s) wrong' : marked + ' of ' + tasks + ' tasks are marked; every marker matches at least one control and no reset, reveal, copy, run or navigation control'));
process.exit(fail ? 1 : 0);
