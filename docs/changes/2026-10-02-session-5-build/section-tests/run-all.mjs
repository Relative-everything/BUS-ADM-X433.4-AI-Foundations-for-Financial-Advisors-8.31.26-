#!/usr/bin/env node
/* Run every section test in this folder against one page. Needs jsdom on NODE_PATH.
   Usage, from the repo root:  NODE_PATH=$(npm root -g) node docs/changes/2026-10-02-session-5-build/section-tests/run-all.mjs [session-5/index.html] */
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const page = process.argv[2] || 'session-5/index.html';
let total = 0, failed = 0, files = 0;
for (const f of readdirSync(here).filter((n) => n.endsWith('.tests.mjs')).sort()) {
  const r = spawnSync(process.execPath, [join(here, f), page], { encoding: 'utf8', env: process.env });
  const out = (r.stdout || '') + (r.stderr || '');
  const m = /(\d+) assertions?, (\d+) fail/.exec(out);
  const n = m ? +m[1] : 0, k = m ? +m[2] : 1;
  total += n; failed += k; files++;
  console.log(`${k ? 'FAIL' : 'PASS'}  ${f.padEnd(18)} ${n} assertions, ${k} failed`);
  if (k) console.log(out.split('\n').filter((l) => /^FAIL|Error/.test(l)).slice(0, 8).map((l) => '        ' + l).join('\n'));
}
console.log(`\n${files} files, ${total} assertions, ${failed} failed`);
process.exit(failed ? 1 : 0);
