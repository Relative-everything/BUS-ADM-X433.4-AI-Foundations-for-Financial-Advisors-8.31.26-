#!/usr/bin/env node
/**
 * verify-stamps.mjs — the footer "Last updated YYYY-MM-DD" stamp check (DW-140; D-05 in
 * docs/changes/2026-10-11-deferred-work-catchup/plan.md).
 *
 * Every served page (index.html, session-* /index.html, cases/*.html) carries a
 * <p class="stamp"> whose "Last updated YYYY-MM-DD" date is hand-maintained and has been
 * behind on every page at least twice. This check derives the date the stamp SHOULD carry
 * from git and compares:
 *
 *   expected = today (UTC)                                   if `git status --porcelain -- <file>`
 *                                                            shows the file modified, staged or untracked
 *            = `git log -1 --format=%ad --date=short -- <file>`   otherwise (the last commit that
 *                                                            touched the file)
 *
 * Usage:
 *   node scripts/verify-stamps.mjs                 check only; one line per file, then "summary: N stale";
 *                                                  exit 1 when any stamp is stale or missing
 *   node scripts/verify-stamps.mjs --fix           rewrite each stale stamp's date in place (the date
 *                                                  only, nothing else in the paragraph); exit 1 only if a
 *                                                  stamp could not be rewritten (missing or malformed)
 *   node scripts/verify-stamps.mjs --today 2026-10-27
 *                                                  override the date used for a modified file (UTC today
 *                                                  by default); useful on a worktree that will be committed
 *                                                  on a different day, and in tests
 *
 * The check never reads the changelog and never touches a stamp on a page that git says is
 * clean and whose stamp already equals its last commit date. Run it after the writer
 * scripts and before the commit, so a page edited today is stamped today.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const FIX = argv.includes('--fix');
const todayArg = (() => { const i = argv.indexOf('--today'); return i >= 0 ? argv[i + 1] : null; })();
if (todayArg && !/^\d{4}-\d{2}-\d{2}$/.test(todayArg)) {
  console.error(`--today wants YYYY-MM-DD, got "${todayArg}"`);
  process.exit(2);
}
const TODAY = todayArg || new Date().toISOString().slice(0, 10);

const git = (...args) => execFileSync('git', args, { cwd: REPO, encoding: 'utf8' }).trim();

/* The served pages, in hub order. */
const FILES = ['index.html'];
for (const d of readdirSync(REPO).filter((n) => /^session-/.test(n)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
  if (existsSync(join(REPO, d, 'index.html'))) FILES.push(`${d}/index.html`);
}
if (existsSync(join(REPO, 'cases'))) {
  for (const f of readdirSync(join(REPO, 'cases')).filter((n) => /\.html$/.test(n)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) FILES.push(`cases/${f}`);
}

const STAMP = /(<p class="stamp">[\s\S]*?Last updated )(\d{4}-\d{2}-\d{2})([\s\S]*?<\/p>)/;

let stale = 0, fixed = 0, broken = 0;
for (const rel of FILES) {
  const abs = join(REPO, rel);
  const dirty = git('status', '--porcelain', '--', rel) !== '';
  const expected = dirty ? TODAY : git('log', '-1', '--format=%ad', '--date=short', '--', rel);
  const why = dirty ? 'modified in the worktree' : 'last commit';
  const src = readFileSync(abs, 'utf8');
  const m = STAMP.exec(src);
  if (!m) {
    broken++; stale++;
    console.log(`FAIL  ${rel.padEnd(24)} no <p class="stamp"> with a "Last updated YYYY-MM-DD" date`);
    continue;
  }
  const have = m[2];
  if (have === expected) {
    console.log(`ok    ${rel.padEnd(24)} ${have}  (${why} ${expected})`);
    continue;
  }
  stale++;
  if (FIX) {
    const out = src.slice(0, m.index) + m[1] + expected + m[3] + src.slice(m.index + m[0].length);
    writeFileSync(abs, out);
    fixed++;
    console.log(`FIXED ${rel.padEnd(24)} ${have} -> ${expected}  (${why})`);
  } else {
    console.log(`STALE ${rel.padEnd(24)} ${have}, want ${expected}  (${why})`);
  }
}
console.log(`\nsummary: ${stale} stale${FIX ? `, ${fixed} fixed` : ''}${broken ? `, ${broken} without a stamp` : ''} (today ${TODAY})`);
process.exit(FIX ? (broken ? 1 : 0) : (stale ? 1 : 0));
