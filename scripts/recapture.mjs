#!/usr/bin/env node
/**
 * recapture.mjs — re-run a captured model output and record what answered.
 *
 * A lesson that shows a model's output must say which model produced it and
 * when (PEDAGOGY §7), and must re-run it when that model retires (RUNBOOK §4,
 * step 3; facts/FACTS.json claude-model-ids-and-retirements). This script runs
 * a prompt through the Claude Code CLI and prints the answer with the model id
 * THE CLI REPORTED, not the one that was asked for, so the label on the page is
 * a recorded fact rather than an assumption.
 *
 *   node scripts/recapture.mjs --prompt prompt.txt [--model claude-sonnet-5-5] [--system system.txt] [--json]
 *
 * Output (text mode): a header block with model, date and the prompt's sha256,
 * then the answer verbatim. --json prints {model, date, prompt_sha256, text}.
 * The script holds no key: it uses whatever credential the CLI is running under,
 * and it never writes into a lesson; the caller pastes the capture and the label.
 */
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const argv = process.argv.slice(2);
const opt = (k, d = null) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const promptPath = opt('--prompt');
if (!promptPath) { console.error('usage: node scripts/recapture.mjs --prompt <file> [--model <id>] [--system <file>] [--json]'); process.exit(2); }
const prompt = readFileSync(promptPath, 'utf8');
const model = opt('--model', 'claude-sonnet-5-5');
const system = opt('--system') ? readFileSync(opt('--system'), 'utf8') : null;
const args = ['-p', '--model', model, '--output-format', 'json'];
if (system) args.push('--append-system-prompt', system);
const out = execFileSync('claude', args, { input: prompt, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, env: { ...process.env } });
const j = JSON.parse(out);
const reported = Object.keys(j.modelUsage || {});
const canonical = reported.length ? (j.modelUsage[reported[0]].canonicalModel || reported[0]) : '(not reported)';
const date = new Date().toISOString().slice(0, 10);
const sha = createHash('sha256').update(prompt, 'utf8').digest('hex').slice(0, 12);
const text = (j.result || '').trim();
if (argv.includes('--json')) {
  console.log(JSON.stringify({ model: canonical, date, prompt_sha256: sha, text }, null, 2));
} else {
  console.log(`# model ${canonical} · captured ${date} · prompt sha256 ${sha}`);
  console.log(text);
}
