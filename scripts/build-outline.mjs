#!/usr/bin/env node
/**
 * build-outline.mjs: the outline sidebar and the commit markers, in every lesson.
 *
 *   node scripts/build-outline.mjs            write
 *   node scripts/build-outline.mjs --check    exit 1 if a lesson would change, or the six regions differ
 *
 * Two things, both generated, neither edited by hand:
 *
 * 1. THE REGION. docs/design/meridian/assets/outline.js is inlined into each lesson as
 *
 *        <!-- OUTLINE:BEGIN v1 generated-by=scripts/build-outline.mjs -->
 *        <script> ... </script>
 *        <!-- OUTLINE:END v1 -->
 *
 *    just before </body>, byte-identical in all six lessons (session-0.1 and sessions 1 to 5). The hub
 *    and the case pages carry no outline. Bump the version in both markers when outline.js changes its
 *    markup contract. The script holds state in variables only: no storage, no request, no gating.
 *
 * 2. THE COMMIT MARKERS. docs/design/meridian/outline-commits.json says, task by task, which control
 *    records a learner's own answer. For each task this script stamps
 *        data-commit                      on a control named by id that exists in the page's markup
 *        data-commit-in="<selector>"      on the [data-task] root, for controls a page script builds
 *        data-commit-needs="<selector>"   beside either, when an empty answer box must not count
 *    It only ever ADDS these three attributes, and removes ones the map no longer asks for. A task the
 *    map does not name, or a control it names that the page does not have, is an error, so the map
 *    cannot drift from the pages.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const JS = readFileSync(join(REPO, 'docs/design/meridian/assets/outline.js'), 'utf8').trim();
const MAP = JSON.parse(readFileSync(join(REPO, 'docs/design/meridian/outline-commits.json'), 'utf8'));
const BEGIN = '<!-- OUTLINE:BEGIN v1 generated-by=scripts/build-outline.mjs -->', END = '<!-- OUTLINE:END v1 -->';
if (/localStorage|sessionStorage|indexedDB|document\.cookie|fetch\(|XMLHttpRequest/.test(JS)) { console.error('FAIL  outline.js names a storage or network API'); process.exit(1); }
const BAR = '<div id="topbar" data-outline-bar></div>';
const REGION = BEGIN + '\n<script>\n' + JS + '\n</script>\n' + END;
const LESSONS = Object.keys(MAP).filter(k => !k.startsWith('_'));
const ATTR = /\s+data-commit(?:-in|-needs)?(?:="[^"]*")?/g;
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

let fail = 0, stale = 0; const hashes = new Set();
for (const p of LESSONS) {
  const file = join(REPO, p), was = readFileSync(file, 'utf8'); let html = was;
  /* 1. strip every marker and the region, so the run is idempotent */
  const a0 = html.indexOf(BEGIN), b0 = html.indexOf(END);
  if (a0 >= 0 && b0 > a0) html = html.slice(0, a0).replace(/\n$/, '') + html.slice(b0 + END.length);
  html = html.replace(BAR + '\n', '');
  /* markers live only on opening tags outside scripts, styles and comments */
  const guard = []; html.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, (m, i) => { guard.push([i, i + m.length]); return m; });
  const inGuard = i => guard.some(([x, y]) => i >= x && i < y);
  html = html.replace(/<[a-zA-Z][^<>]*>/g, (tag, i) => inGuard(i) ? tag : tag.replace(ATTR, ''));
  /* 2. stamp */
  const guard2 = []; html.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, (m, i) => { guard2.push([i, i + m.length]); return m; });
  const safe = i => !guard2.some(([x, y]) => i >= x && i < y);
  const tasks = new Map(); html.replace(/<[a-zA-Z][^<>]*\bdata-task="([^"]+)"[^<>]*>/g, (tag, id, i) => { if (safe(i)) tasks.set(id, [i, tag]); return tag; });
  const edits = []; let nTask = 0, nCtl = 0, nRoot = 0;
  for (const id of tasks.keys()) if (!(id in MAP[p])) { console.log('FAIL  ' + p + '  task ' + id + ' is not in outline-commits.json'); fail++; }
  for (const [id, spec] of Object.entries(MAP[p])) {
    if (!tasks.has(id)) { console.log('FAIL  ' + p + '  outline-commits.json names task ' + id + ', which the page does not have'); fail++; continue; }
    if (!spec) continue; nTask++;
    const [ri, rtag] = tasks.get(id), needs = spec.needs ? ' data-commit-needs="' + esc(spec.needs) + '"' : '';
    /* a selector that is only ids, every one a control in the page's own markup, is stamped on the controls */
    const parts = spec.in.split(',').map(s => s.trim());
    const statics = parts.map(s => { const m = /^#([\w-]+)$/.exec(s); if (!m) return null; const re = new RegExp('<(?:button|input|select|textarea|a)\\b[^<>]*\\bid="' + m[1] + '"[^<>]*>'); const f = re.exec(html); return f && safe(f.index) ? [f.index, f[0]] : null; });
    if (statics.every(Boolean)) { for (const [i, tag] of statics) { edits.push([i, tag, tag.replace(/(\/?>)$/, ' data-commit' + needs + '$1')]); nCtl++; } }
    else { edits.push([ri, rtag, rtag.replace(/(\/?>)$/, ' data-commit-in="' + esc(spec.in) + '"' + needs + '$1')]); nRoot++; }
  }
  for (const [i, tag, neu] of edits.sort((x, y) => y[0] - x[0])) html = html.slice(0, i) + neu + html.slice(i + tag.length);
  /* 3. a bar for the outline button, on a page whose markup has none (Sessions 3 to 5 float their controls).
        An empty element: outline.js writes the page's own title into it. Placed first in <body>. */
  const g3 = []; html.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, (m, i) => { g3.push([i, i + m.length]); return m; });
  const out3 = i => !g3.some(([x, y]) => i >= x && i < y);
  const firstOutside = re => { for (let m; (m = re.exec(html));) if (out3(m.index)) return m; return null; };
  let barAdded = false;
  if (!firstOutside(/<[a-zA-Z][^<>]*\bid="topbar"/g)) { const b = firstOutside(/<body\b[^<>]*>\n?/g); if (!b) { console.log('FAIL  ' + p + '  no <body>'); fail++; continue; }
    html = html.slice(0, b.index + b[0].length) + BAR + '\n' + html.slice(b.index + b[0].length); barAdded = true; }
  /* 4. the region, just before the page's own </body>, or </html> where the page never closes its body.
        A "</body>" spelled inside a script string (the case viewer builds a document) is not the page's. */
  const g4 = []; html.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->/gi, (m, i) => { g4.push([i, i + m.length]); return m; });
  const lastOutside = lit => { for (let i = html.lastIndexOf(lit); i >= 0; i = html.lastIndexOf(lit, i - 1)) if (!g4.some(([x, y]) => i >= x && i < y)) return i; return -1; };
  let k = lastOutside('</body>'); if (k < 0) k = lastOutside('</html>'); if (k < 0) k = html.length;
  html = html.slice(0, k).replace(/\n*$/, '\n') + REGION + '\n' + html.slice(k);
  hashes.add(createHash('sha256').update(html.slice(html.indexOf(BEGIN), html.indexOf(END) + END.length)).digest('hex').slice(0, 12));
  const changed = html !== was; if (changed) stale++;
  if (changed && !CHECK) writeFileSync(file, html);
  console.log((changed ? (CHECK ? 'STALE ' : 'WROTE ') : 'OK    ') + p + '  ' + nTask + ' task(s) earn a check: ' + nCtl + ' control(s) marked, ' + nRoot + ' task root(s) marked' + (barAdded ? ', app bar element added' : ''));
}
if (hashes.size > 1) { console.log('FAIL  the OUTLINE region is not identical across the lessons'); fail++; }
console.log('\nsummary: ' + (fail ? fail + ' failure(s)' : CHECK && stale ? stale + ' lesson(s) stale; run node scripts/build-outline.mjs' : 'outline region ' + [...hashes][0] + ' in ' + LESSONS.length + ' lessons'));
process.exit(fail || (CHECK && stale) ? 1 : 0);
