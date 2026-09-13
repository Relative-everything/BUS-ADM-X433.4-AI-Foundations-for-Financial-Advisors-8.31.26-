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
