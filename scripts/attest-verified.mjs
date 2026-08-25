#!/usr/bin/env node
/**
 * attest-verified.mjs — the ONLY thing in this repository that may move a
 * `last_verified` date, and it will not do it for a machine.
 *
 * `last_verified` records that THE INSTRUCTOR read the source and confirmed the
 * repo's claims about it are still accurate. It is a human attestation. No
 * generator, no re-pull, no agent and no automated process may write or advance
 * it, ever. A generated verification date is the tool vouching for itself,
 * which is the same defect class as a chip pointing at the wrong source.
 *
 *   node scripts/attest-verified.mjs                       show the state
 *   node scripts/attest-verified.mjs --init                seed the lock, once
 *   node scripts/attest-verified.mjs --key src-wolfram \
 *        --date 2026-08-23 --evidence "..."                attest, INTERACTIVE ONLY
 *   node scripts/attest-verified.mjs --clear --key src-x   withdraw, INTERACTIVE ONLY
 *
 * THE GATE. Advancing a date requires an interactive terminal on stdin. A
 * generator, a CI job, a re-pull script and an agent shell all have no TTY and
 * all are refused. This is deliberate and it is the point: the constraint is
 * meant to be observed refusing, not asserted in a comment.
 *
 * WHY A LOCK AS WELL. The gate protects the writer; the lock protects the file.
 * scripts/sources-verified.lock.json notarises every (key, last_verified) pair,
 * and build-sources.mjs recomputes it on every parse. Hand-editing a date into
 * SOURCES.md without coming through here takes down every generator that reads
 * the source model, naming the key that moved.
 *
 * pedagogy R12: plain ES, no dependency.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { parseSources, verifiedDigest, verifiedCanonical, LOCK_PATH, FULL_DATE } from './build-sources.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES = join(REPO, 'SOURCES.md');
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(`--${n}`);
const opt = (n) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : undefined; };

/**
 * THE GATE. An interactive human, or nothing.
 * `reason` names the act, so a refusal says what it refused.
 */
function requireHuman(reason) {
  const tty = Boolean(process.stdin.isTTY);
  if (tty) return;
  console.error(`REFUSED: ${reason} requires an interactive terminal.

  last_verified is the instructor's field. It records that a HUMAN read the
  source and confirmed the repo's claims about it are still accurate.

  stdin is not a TTY, so the caller is a generator, a scheduled job, a re-pull
  or an agent. None of those may write or advance a verification date, ever.
  Nothing about this refusal can be configured away, and there is no flag that
  turns it off.

  If a human did the reading, run this at a terminal.
  If you are a tool, the field you want is last_retrieved.`);
  process.exit(2);
}

function ask(q) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) => rl.question(q, (a) => { rl.close(); res(a.trim()); }));
}

function readLock() {
  if (!existsSync(LOCK_PATH)) return null;
  return JSON.parse(readFileSync(LOCK_PATH, 'utf8'));
}

function writeLock(sources, note) {
  const entries = {};
  for (const r of [...sources.values()].sort((a, b) => a.key.localeCompare(b.key))) {
    entries[r.key] = { last_verified: r.last_verified || '', verified_by: r.verified_by || '' };
  }
  const lock = {
    note: 'NOTARISED. Every last_verified date in SOURCES.md, frozen. build-sources.mjs '
        + 'recomputes this digest on every parse and refuses to build if a date moved. '
        + 'Only scripts/attest-verified.mjs writes this file, and only at an interactive '
        + 'terminal. Do not hand-edit: a hand edit here and a matching hand edit in '
        + 'SOURCES.md is the one thing this pair cannot catch, and it is a lie about a '
        + 'human having read a source.',
    updated_by: note,
    digest: verifiedDigest(sources),
    entries,
  };
  writeFileSync(LOCK_PATH, JSON.stringify(lock, null, 2) + '\n');
  return lock;
}

/** Rewrite one record's last_verified / verified_by lines in SOURCES.md. */
function setInFile(key, date, evidence) {
  const text = readFileSync(SOURCES, 'utf8');
  const head = new RegExp(`^## ${key}\\s*$`, 'm').exec(text);
  if (!head) { console.error(`FAIL  no record ${key} in SOURCES.md`); process.exit(1); }
  const after = text.slice(head.index + head[0].length);
  const nxt = /^## src-/m.exec(after);
  const end = head.index + head[0].length + (nxt ? nxt.index : after.length);
  let body = text.slice(head.index, end);
  if (!/^last_verified:/m.test(body)) { console.error(`FAIL  ${key} has no last_verified line`); process.exit(1); }
  body = body.replace(/^last_verified:.*$/m, date ? `last_verified:  ${date}` : 'last_verified:');
  body = /^verified_by:/m.test(body)
    ? body.replace(/^verified_by:.*$/m, evidence ? `verified_by:    ${evidence}` : '')
        .replace(/\n\n+/g, '\n')
    : (evidence ? body.replace(/^last_verified:.*$/m, (m) => `${m}\nverified_by:    ${evidence}`) : body);
  writeFileSync(SOURCES, text.slice(0, head.index) + body + text.slice(end));
}

/* ------------------------------------------------------------------- main -- */

const sources = parseSources();
const lock = readLock();

if (flag('init')) {
  if (lock) {
    console.error(`REFUSED: the lock already exists.

  --init seeds the lock from the hand-authored starting state, once. After that
  every change to a verification date goes through --key / --date / --evidence,
  which requires an interactive terminal. Re-seeding would be a way around that,
  so it is refused.

  To change a date:  node scripts/attest-verified.mjs --key <src-key> --date YYYY-MM-DD --evidence "..."`);
    process.exit(2);
  }
  const populated = [...sources.values()].filter((r) => r.verified);
  const l = writeLock(sources, 'seeded by --init from the hand-authored state of SOURCES.md');
  console.log(`OK    lock seeded  ${Object.keys(l.entries).length} records  digest ${l.digest.slice(0, 16)}`);
  console.log(`      ${populated.length} record(s) carry a verification date; ${sources.size - populated.length} are empty or not applicable.`);
  for (const r of populated) console.log(`      ${r.key}  ${r.last_verified}\n        evidence: ${r.verified_by}`);
  console.log('\n      From here nothing automated can move one of these dates.');
  process.exit(0);
}

if (flag('key')) {
  const key = opt('key');
  if (!sources.has(key)) { console.error(`FAIL  no record ${key} in SOURCES.md`); process.exit(1); }
  if (flag('clear')) {
    requireHuman('withdrawing a verification attestation');
    const ok = await ask(`Withdraw the verification attestation on ${key}? [type the key to confirm] `);
    if (ok !== key) { console.log('aborted'); process.exit(1); }
    setInFile(key, '', '');
    writeLock(parseSources(), `--clear ${key}`);
    console.log(`OK    ${key} last_verified cleared`);
    process.exit(0);
  }
  requireHuman('recording a verification attestation');
  const date = opt('date');
  const evidence = opt('evidence');
  if (!date || !FULL_DATE.test(date)) { console.error('FAIL  --date must be a full YYYY-MM-DD date'); process.exit(1); }
  if (!evidence || evidence.trim().length < 12) { console.error('FAIL  --evidence must say what you read and where the repo records it'); process.exit(1); }
  const r = sources.get(key);
  console.log(`\n  ${key} — ${r.title}`);
  console.log(`  ${r.link || '(no link)'}\n`);
  console.log('  You are about to assert that you, the instructor, read this source and');
  console.log("  confirmed that this repository's claims about it are still accurate.\n");
  const ok = await ask(`  Type "I read it" to record ${date}: `);
  if (ok.toLowerCase() !== 'i read it') { console.log('aborted'); process.exit(1); }
  setInFile(key, date, evidence);
  writeLock(parseSources(), `--key ${key} --date ${date}`);
  console.log(`OK    ${key} last_verified ${date}`);
  process.exit(0);
}

/* default: report */
const rows = [...sources.values()].sort((a, b) => a.key.localeCompare(b.key));
const verified = rows.filter((r) => r.verified);
const na = rows.filter((r) => r.last_verified === 'not applicable');
console.log(`SOURCES.md  ${rows.length} records`);
console.log(`  last_verified populated  ${verified.length}`);
console.log(`  not applicable           ${na.length}`);
console.log(`  EMPTY                    ${rows.length - verified.length - na.length}`);
console.log(`\nlock  ${lock ? `present, digest ${String(lock.digest).slice(0, 16)}` : 'ABSENT — run --init'}`);
if (lock) {
  const now = verifiedDigest(sources);
  console.log(`      SOURCES.md digest ${now.slice(0, 16)}  ${now === lock.digest ? 'MATCHES' : 'DOES NOT MATCH — a date moved'}`);
}
for (const r of verified) console.log(`\n${r.key}  ${r.last_verified}\n  ${r.verified_by}`);
void verifiedCanonical;
