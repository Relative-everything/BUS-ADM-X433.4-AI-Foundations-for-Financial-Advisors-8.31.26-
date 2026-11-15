#!/usr/bin/env node
/**
 * content-freeze.mjs: proves a restyle changed presentation only.
 *
 * Compares every served page in the working tree with the same page at a git
 * ref (the freeze ref) and fails if any CONTENT was removed or altered. It is a
 * tool for the Meridian restyle, not part of MAINTAINING's standing gate.
 *
 *   node docs/design/meridian/content-freeze.mjs                  ref from FREEZE_REF beside this file
 *   node docs/design/meridian/content-freeze.mjs --ref <commit>
 *   node docs/design/meridian/content-freeze.mjs --root <dir>     compare an alternate tree (tests)
 *   node docs/design/meridian/content-freeze.mjs --verbose        list additions as well
 *
 * What is frozen (hard failure, exit 1):
 *   1. TEXT      every text node outside <style> and <script>, in document order.
 *   2. SCRIPTS   every <script> block, byte for byte. A changed or missing block
 *                fails unless freeze-allow.json names its page and its baseline
 *                hash with a reason. New blocks are allowed and reported.
 *   3. ATTRS     every attribute except class and style: nothing in the baseline
 *                may be missing. Additions (data-commit, aria-*) are allowed and reported.
 *   4. FENCES    every NAME:BEGIN ... NAME:END region except STYLE, byte for byte
 *                (CASE, SOURCES, READINGS, LM, LMBOX, LMSTYLE, appendix regions).
 *   5. ELEMENTS  the count of each tag name may not fall. Additions are reported.
 *
 * What may change freely: the contents of <style>, the STYLE fence, class and
 * style attributes, whitespace between tags, the date in the footer stamp, and
 * added elements, attributes and scripts.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..', '..', '..');
const argv = process.argv.slice(2);
const opt = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const VERBOSE = argv.includes('--verbose');
const ROOT = opt('--root') ? resolve(opt('--root')) : REPO;
let REF = opt('--ref');
if (!REF) {
  const f = join(HERE, 'FREEZE_REF');
  if (!existsSync(f)) { console.error('FAIL  no --ref given and no FREEZE_REF file beside this script'); process.exit(2); }
  REF = readFileSync(f, 'utf8').trim();
}
const ALLOW = existsSync(join(HERE, 'freeze-allow.json')) ? JSON.parse(readFileSync(join(HERE, 'freeze-allow.json'), 'utf8')) : {};

const sha = s => createHash('sha256').update(s).digest('hex').slice(0, 12);
const pages = ['index.html',
  ...readdirSync(REPO).filter(d => /^session-/.test(d)).sort().map(d => d + '/index.html'),
  ...readdirSync(join(REPO, 'cases')).filter(f => f.endsWith('.html')).sort().map(f => 'cases/' + f)];

function parse(html) {
  const fences = {};
  const fr = /([A-Z][A-Z0-9-]*):BEGIN([^\n]*)\n([\s\S]*?)\1:END/g;
  for (let m; (m = fr.exec(html));) { if (m[1] !== 'STYLE') fences[m[1] + m[2].replace(/\s*(-->|\*\/)\s*$/, '')] = sha(m[3]); }
  const scripts = [];
  let rest = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  rest = rest.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (_, body) => { scripts.push(body); return ''; });
  rest = rest.replace(/<!--[\s\S]*?-->/g, c => c);            // comments are kept as text-free markup
  const tags = {}, attrs = new Map();
  const tr = /<([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s"'<>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'<>]+))?)*)\s*\/?>/g;
  for (let m; (m = tr.exec(rest));) {
    const tag = m[1].toLowerCase(); tags[tag] = (tags[tag] || 0) + 1;
    const ar = /([^\s"'<>\/=]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'<>]+))?/g;
    for (let a; (a = ar.exec(m[2]));) {
      const name = a[1].toLowerCase(); if (name === 'class' || name === 'style') continue;
      const key = tag + ' ' + name + '=' + (a[2] === undefined ? '' : a[2].replace(/^["']|["']$/g, ''));
      attrs.set(key, (attrs.get(key) || 0) + 1);
    }
  }
  /* the footer stamp's date is rewritten by verify-stamps on every edited page, so it is not content */
  const text = rest.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/Last updated \d{4}-\d{2}-\d{2}/g, 'Last updated DATE').replace(/\s+/g, ' ').trim().split(' ');
  return { fences, scripts, tags, attrs, text };
}

let failed = 0;
const fail = (p, msg) => { failed++; console.log('FAIL  ' + p + '  ' + msg); };
for (const p of pages) {
  let base;
  try { base = execFileSync('git', ['show', REF + ':' + p], { cwd: REPO, encoding: 'utf8', maxBuffer: 1 << 27 }); }
  catch { console.log('note  ' + p + '  not present at ' + REF + ', skipped'); continue; }
  if (!existsSync(join(ROOT, p))) { fail(p, 'page is missing from the tree'); continue; }
  const A = parse(base), B = parse(readFileSync(join(ROOT, p), 'utf8'));
  const before = failed, notes = [];

  if (A.text.join(' ') !== B.text.join(' ')) {
    let i = 0; while (i < A.text.length && A.text[i] === B.text[i]) i++;
    fail(p, 'TEXT differs at word ' + i + ' of ' + A.text.length + '\n        was: ' + A.text.slice(Math.max(0, i - 6), i + 10).join(' ') + '\n        now: ' + B.text.slice(Math.max(0, i - 6), i + 10).join(' '));
  }
  const nowScripts = new Set(B.scripts.map(sha)), allowed = new Set((ALLOW[p] || []).map(x => x.hash));
  A.scripts.forEach((s, i) => { const h = sha(s); if (!nowScripts.has(h) && !allowed.has(h)) fail(p, 'SCRIPT block ' + (i + 1) + ' of ' + A.scripts.length + ' (' + h + ', ' + s.length + ' chars) changed or removed; restore it or add it to freeze-allow.json with a reason'); });
  const wasScripts = new Set(A.scripts.map(sha)); const added = B.scripts.filter(s => !wasScripts.has(sha(s))).length; if (added) notes.push(added + ' new or changed script block(s)');
  let lost = 0, gained = 0;
  for (const [k, n] of A.attrs) { const m = B.attrs.get(k) || 0; if (m < n) { lost++; if (lost <= 5) fail(p, 'ATTR removed: ' + k.slice(0, 140) + '  (' + n + ' to ' + m + ')'); } }
  if (lost > 5) console.log('        and ' + (lost - 5) + ' more removed attribute value(s)');
  for (const [k, n] of B.attrs) if ((A.attrs.get(k) || 0) < n) gained++;
  if (gained) notes.push(gained + ' added attribute value(s)');
  for (const [k, h] of Object.entries(A.fences)) if (B.fences[k] !== h) fail(p, 'FENCE ' + k.trim() + (B.fences[k] ? ' changed' : ' missing'));
  for (const [t, n] of Object.entries(A.tags)) if ((B.tags[t] || 0) < n) fail(p, 'ELEMENT count fell: <' + t + '> ' + n + ' to ' + (B.tags[t] || 0));
  const more = Object.entries(B.tags).filter(([t, n]) => n > (A.tags[t] || 0)).map(([t, n]) => t + ' +' + (n - (A.tags[t] || 0))); if (more.length) notes.push('added elements: ' + more.join(', '));
  if (failed === before) console.log('ok    ' + p + '  ' + A.text.length + ' words, ' + A.scripts.length + ' scripts, ' + A.attrs.size + ' attribute values, ' + Object.keys(A.fences).length + ' fences' + (notes.length && VERBOSE ? '\n        ' + notes.join('; ') : notes.length ? '  (+additions)' : ''));
}
console.log('\nsummary: ' + (failed ? failed + ' content change(s) against ' + REF : 'content frozen against ' + REF + ' on ' + pages.length + ' pages'));
process.exit(failed ? 1 : 0);
