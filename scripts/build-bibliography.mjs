#!/usr/bin/env node
/**
 * build-bibliography.mjs — generate BIBLIOGRAPHY.md and DATA-PULL.md.
 *
 * Both are GENERATED AND NEVER HAND-MAINTAINED. Editing either one is a wasted
 * edit: the next run overwrites it. Change SOURCES.md, or change the corpus.
 *
 *   node scripts/build-bibliography.mjs           write both
 *   node scripts/build-bibliography.mjs --check   exit 1 if either would change
 *
 * BIBLIOGRAPHY.md is the completeness artifact: per source, the link, author,
 * publication date, date last accessed, total reference count, and every lesson
 * and section that cites it. Wolfram lists nearly every section; a compliance
 * source lists one. WHERE A FIELD IS UNKNOWN IT PRINTS THE GAP, unlike the
 * rendered footer, which omits it — this is where a reader comes for
 * completeness, so a silent omission here would be the worse failure.
 *
 * DATA-PULL.md is the live-data register, and it is FIELDS ON THE SOURCE RECORD
 * rather than a parallel list. That is the point: "update all live data points"
 * resolves to a concrete edit set instead of a reconciliation between two files
 * that will drift the way the appendix index drifted.
 *
 * EVERY NUMBER GOES THROUGH fill(), WHICH THROWS ON AN UNSUBSTITUTED
 * PLACEHOLDER. The reference counts here are the same defect Phase 1 found in
 * three hand-edited counts and Phase 2 found in nine copies of the minute
 * figures, one artifact further downstream.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { model, LESSONS, isAbsent, UNVERIFIED, orderableDate, isPartialDate,
         assertVerifiedLock, FULL_DATE } from './build-sources.mjs';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');

/** Substitute {{KEY}} and refuse to return a string that still has a hole. */
function fill(tpl, vars) {
  const out = tpl.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, k) => {
    if (!(k in vars)) throw new Error(`build-bibliography: no value for {{${k}}}`);
    const v = vars[k];
    if (v === undefined || v === null || (typeof v === 'number' && !Number.isFinite(v))) {
      throw new Error(`build-bibliography: {{${k}}} resolved to ${String(v)}`);
    }
    return String(v);
  });
  const left = out.match(/\{\{[^}]*\}\}/);
  if (left) throw new Error(`build-bibliography: unsubstituted placeholder ${left[0]}`);
  return out;
}

const sources = model();
const all = [...sources.values()];
const gap = (v) => (isAbsent(v) ? (v === 'not applicable' ? '*not applicable*' : `**${UNVERIFIED}**`) : v);
const short = (l) => l.replace('session-', 'S');

/* ==================================================== BIBLIOGRAPHY.md ====== */

function bibliography() {
  const byAuthor = all.slice().sort((a, b) =>
    (isAbsent(a.author) ? a.title : a.author).localeCompare(isAbsent(b.author) ? b.title : b.author));
  const cited = byAuthor.filter((r) => r.total_references > 0);
  const uncited = byAuthor.filter((r) => r.total_references === 0);
  const withGaps = all.filter((r) => ['author', 'publisher', 'link', 'published', 'last_retrieved']
    .some((f) => isAbsent(r[f]) && r[f] !== 'not applicable'));

  const L = [];
  L.push(fill(`# BIBLIOGRAPHY.md

**Generated from \`SOURCES.md\` by \`scripts/build-bibliography.mjs\`. Do not edit:
the next run overwrites it.** To change an entry, change \`SOURCES.md\`. To change
a reference count, change where the corpus cites the source — the counts here are
read off the chips, never typed.

**{{N}} works, {{REFS}} references across {{LESSONS}} lessons.** {{CITED}} are
cited by at least one claim; {{UNCITED}} are listed by a lesson without carrying a
chip, and the reason each is exempt — or is not — is in the second table.

**{{GAPS}} records carry at least one field this repository could not verify, and
every one of them is printed below as {{MARKER}} rather than omitted.** The
rendered footer in a lesson omits an unknown field, because a footer in which
thirty entries shout about a missing publisher helps nobody. This file is where a
reader comes for completeness, so here the gap is the point.
`, {
    N: all.length,
    REFS: all.reduce((a, b) => a + b.total_references, 0),
    LESSONS: LESSONS.length,
    CITED: cited.length,
    UNCITED: uncited.length,
    GAPS: withGaps.length,
    MARKER: '`' + UNVERIFIED + '`',
  }));

  L.push('\n---\n\n## Works cited\n');
  for (const r of cited) {
    L.push(`### ${isAbsent(r.author) ? r.title : r.author}\n`);
    L.push(`**${r.title}**  `);
    L.push(`\`${r.key}\` · ${r.kind}${r.moving_target ? ' · **moving target**' : ''}\n`);
    L.push('| | |');
    L.push('|---|---|');
    L.push(`| Author | ${gap(r.author)} |`);
    L.push(`| Publisher | ${gap(r.publisher)} |`);
    L.push(`| Link | ${isAbsent(r.link) ? gap(r.link) : `<${r.link}>`} |`);
    L.push(`| Published | ${gap(r.published)} |`);
    L.push(`| Last retrieved | ${gap(r.last_retrieved)} |`);
    L.push(`| Last verified by the instructor | ${r.last_verified ? (r.last_verified === 'not applicable' ? '*not applicable*' : `**${r.last_verified}**`) : '**EMPTY** — no evidence in the repo that a human read it'} |`);
    L.push(`| Confidence | ${r.confidence} |`);
    L.push(`| **Total references** | **${r.total_references}** |`);
    const where = r.cited_by
      .sort((a, b) => a.lesson.localeCompare(b.lesson))
      .map((c) => `${short(c.lesson)} \`#${c.section}\`${c.chips > 1 ? ` ×${c.chips}` : ''}`)
      .join(' · ');
    L.push(`| Cited in | ${where} |`);
    L.push(`\n${r.scope}\n`);
  }

  L.push('\n---\n\n## Listed but not cited by any claim\n');
  L.push('A source a lesson lists without chipping. Three kinds are exempt by');
  L.push('construction — an authority travelling with the case, background reading,');
  L.push('and a deliberately fabricated citation, which may never carry a chip.');
  L.push('**Anything else in this table is a finding**: either a missing chip, or a');
  L.push('source that does not belong in that lesson\'s footer.\n');
  L.push('| Source | Kind | Listed by | Exempt? |');
  L.push('|---|---|---|---|');
  for (const r of uncited) {
    const lessons = Object.keys(r.used_for).map(short).join(', ');
    L.push(`| \`${r.key}\` | ${r.kind} | ${lessons} | ${r.chip_exempt ? 'yes, by kind' : '**NO — finding**'} |`);
  }
  /* A source cited somewhere but listed uncited in one lesson is the same finding
     at lesson granularity, and the corpus-wide count above cannot show it. */
  const perLesson = [];
  for (const r of all) {
    for (const lesson of Object.keys(r.used_for)) {
      if (r.cited_by.some((c) => c.lesson === lesson)) continue;
      if (r.total_references === 0) continue;
      perLesson.push({ r, lesson });
    }
  }
  if (perLesson.length) {
    L.push('\n**Cited elsewhere, listed without a chip here.** The corpus-wide count');
    L.push('above hides these, because the source is genuinely used — just not in the');
    L.push('lesson whose footer names it.\n');
    L.push('| Source | Listed by | Cited in |');
    L.push('|---|---|---|');
    for (const { r, lesson } of perLesson) {
      L.push(`| \`${r.key}\` | ${short(lesson)} | ${[...new Set(r.cited_by.map((c) => short(c.lesson)))].join(', ')} |`);
    }
  }
  return L.join('\n') + '\n';
}

/* ======================================================= DATA-PULL.md ====== */

function dataPull() {
  const moving = all.filter((r) => r.moving_target)
    .sort((a, b) => b.total_references - a.total_references);
  const fixtures = all.filter((r) => /historical fixture/i.test(r.scope || ''));

  /* Every registered retrieval, flattened, so the ordering rule can be run. */
  const pulls = [];
  for (const r of all) {
    if (!r.pulls) continue;
    for (const [lesson, p] of Object.entries(r.pulls)) {
      pulls.push({ key: r.key, lesson, ...p });
    }
  }
  /* THE ORDERING RULE: last_retrieved ascending implies index_version
     non-descending. It runs on last_retrieved and NEVER on last_verified: one
     records when a machine fetched the source, the other that a human read it,
     and only the first can order two pulls of the same work.

     PRECONDITION, and it is the half that was missing. A month is not a day.
     "2026-08" cannot be ordered against "2026-08-13", and that is exactly where
     src-aa's version incoherence hid. Every partial date is now reported as a
     precondition failure in its own right, AND ordered at its earliest possible
     day so the regression underneath it still fires. A partial date is never
     silently promoted to a day. */
  const partials = pulls.filter((p) => isPartialDate(p.retrieved))
    .map((p) => `${p.key}: ${p.lesson} retrieved "${p.retrieved}" — a month, not a day; ordered at ${orderableDate(p.retrieved)} for the rule below`);
  for (const r of all) {
    if (isPartialDate(r.last_retrieved)) partials.push(`${r.key}: last_retrieved "${r.last_retrieved}" — a month, not a day`);
  }
  const violations = [];
  const byKey = {};
  for (const p of pulls) (byKey[p.key] ||= []).push(p);
  for (const [key, list] of Object.entries(byKey)) {
    const dated = list.filter((p) => /^\d{4}/.test(p.retrieved))
      .sort((a, b) => orderableDate(a.retrieved).localeCompare(orderableDate(b.retrieved)));
    for (let i = 1; i < dated.length; i++) {
      const prev = dated[i - 1], cur = dated[i];
      const pv = (prev.index_version || '').replace(/^v/, '');
      const cv = (cur.index_version || '').replace(/^v/, '');
      if (!/^\d/.test(pv) || !/^\d/.test(cv)) continue;
      const cmp = pv.localeCompare(cv, undefined, { numeric: true });
      if (cmp > 0) {
        violations.push(`${key}: ${prev.lesson} pulled ${prev.retrieved}${isPartialDate(prev.retrieved) ? ` (partial; earliest ${orderableDate(prev.retrieved)})` : ''} at v${pv}, `
          + `${cur.lesson} pulled later on ${cur.retrieved}${isPartialDate(cur.retrieved) ? ` (partial; earliest ${orderableDate(cur.retrieved)})` : ''} at v${cv} — version went DOWN`);
      }
    }
  }

  const L = [];
  L.push(fill(`# DATA-PULL.md — the live-data register

**Generated from \`SOURCES.md\` by \`scripts/build-bibliography.mjs\`. Do not edit.**

**This is fields on the source record, not a parallel list**, and that is the
whole design: *"update all live data points"* has to resolve to a concrete edit
set rather than a reconciliation between two files that will drift the way the
appendix index drifted. Every row below is derived from a \`moving_target\` record
in \`SOURCES.md\` and from the chips the corpus actually carries.

**{{MOVING}} of {{N}} works are moving targets, feeding {{MREFS}} of
{{REFS}} references.**
`, {
    MOVING: moving.length,
    N: all.length,
    MREFS: moving.reduce((a, b) => a + b.total_references, 0),
    REFS: all.reduce((a, b) => a + b.total_references, 0),
  }));

  L.push('\n---\n\n## The ordering rule\n');
  L.push('> **`last_retrieved` ascending implies `index_version` non-descending.**\n');
  L.push('It runs on `last_retrieved` and never on `last_verified`. One records when a');
  L.push('machine fetched the source; the other records that the instructor read it.');
  L.push('Only the first can order two pulls of the same work.\n');
  L.push('**Precondition — every registered retrieval carries a full date.** A month');
  L.push('cannot be ordered against a day, which is where the `src-aa` incoherence hid.');
  if (partials.length) {
    L.push(`\n**PRECONDITION FAILS, ${partials.length} time${partials.length > 1 ? 's' : ''}.** Each partial date below is ordered at its`);
    L.push('**earliest possible day** so the rule underneath it still runs. That is a');
    L.push('reading convention, not a date, and no day is invented.\n');
    for (const v of partials) L.push(`- ${v}`);
    L.push('');
  } else {
    L.push('\n**Precondition holds.** Every registered retrieval carries a full date.\n');
  }
  L.push('');
  if (violations.length) {
    L.push(`**VIOLATED${violations.length > 1 ? `, ${violations.length} times` : ''}.** This is report §3.7's G3, stated`);
    L.push('as an assertion instead of a note. A later retrieval carrying an earlier');
    L.push('version string means the version is not tracking the data.\n');
    for (const v of violations) L.push(`- ${v}`);
    L.push('');
  } else {
    L.push('**Holds across every registered retrieval.**\n');
  }

  L.push('\n---\n\n## Moving targets\n');
  for (const r of moving) {
    L.push(`### \`${r.key}\` — ${r.title}\n`);
    L.push('| | |');
    L.push('|---|---|');
    L.push(`| Figure class | \`${r.figure_class}\` |`);
    L.push(`| Index version | ${gap(r.index_version)} |`);
    L.push(`| Last retrieved | ${gap(r.last_retrieved)}${isPartialDate(r.last_retrieved) ? ' **· PARTIAL, month only**' : ''} |`);
    L.push(`| Last verified by the instructor | ${r.last_verified || '**EMPTY**'} |`);
    L.push(`| Re-check before | ${r.recheck_before} |`);
    L.push(`| References | ${r.total_references} |`);
    const feeds = r.cited_by.sort((a, b) => a.lesson.localeCompare(b.lesson))
      .map((c) => `${short(c.lesson)} \`#${c.section}\`${c.chips > 1 ? ` ×${c.chips}` : ''}`).join(' · ');
    L.push(`| Feeds | ${feeds || '*nothing on the page*'} |`);
    if (r.pulls) {
      L.push('\n**Registered retrievals**\n');
      L.push('| Pull | Lesson | Retrieved | Index version | Figures it landed in |');
      L.push('|---|---|---|---|---|');
      Object.entries(r.pulls)
        .sort((a, b) => String(a[1].retrieved).localeCompare(String(b[1].retrieved)))
        .forEach(([lesson, p], i) => {
          L.push(`| ${r.key.replace('src-', '').toUpperCase()}-${String(i + 1).padStart(3, '0')} `
            + `| ${short(lesson)} | ${p.retrieved} | ${gap(p.index_version)} | ${p.figures || '—'} |`);
        });
    }
    L.push('');
  }

  L.push('\n---\n\n## Historical fixtures — never update these\n');
  L.push('A model named because a cited finding was measured on it is **evidence**,');
  L.push('not a roster entry. Updating it to a current model name falsifies the');
  L.push('finding it supports. A register that treated both as `moving_target` would');
  L.push('silently rewrite the evidence, which is why `figure_class: model_version`');
  L.push('is not used for either of these.\n');
  if (fixtures.length) {
    L.push('| Source | The fixture |');
    L.push('|---|---|');
    for (const r of fixtures) L.push(`| \`${r.key}\` | ${r.scope.replace(/\|/g, '\\|')} |`);
  } else {
    L.push('*None recorded.*');
  }

  L.push('\n\n---\n\n## Model references, and the standing requirement\n');
  L.push('**No `Opus 5` reference may still be standing when this course is');
  L.push('retaught.** Model names in prose are a live roster: they date the material');
  L.push('faster than any other figure in it, and unlike a price they do not look');
  L.push('wrong when they go stale.\n');
  const MODELS = /\b(Opus 5|Opus 4\.8|Opus 4\.7|Sonnet 5|Fable 5|Haiku 4\.5|GPT-5\.6|Gemini 3\.6|Grok 4\.6|Kimi K3|DeepSeek V4-Flash|Luna|Terra|Sol)\b/g;
  L.push('| Lesson | Distinct model names in prose | Occurrences |');
  L.push('|---|---|---|');
  let total = 0;
  for (const lesson of LESSONS) {
    const text = readFileSync(join(REPO, lesson, 'index.html'), 'utf8');
    const hits = [...text.matchAll(MODELS)].map((m) => m[1]);
    total += hits.length;
    const distinct = [...new Set(hits)].sort();
    L.push(`| ${short(lesson)} | ${distinct.length ? distinct.map((d) => `\`${d}\``).join(', ') : '—'} | ${hits.length} |`);
  }
  L.push(`\n**${total} occurrences across ${LESSONS.length} lessons.** This count is read off`);
  L.push('the corpus on every run, so it cannot go stale the way a typed one would.');

  L.push('\n\n---\n\n## NOT RESOLVED — the session-1 §05 price attribution\n');
  L.push('**Surfaced with the evidence both ways. This is the instructor\'s, and it is');
  L.push('the first entry this register exists for.**\n');
  L.push('| | |');
  L.push('|---|---|');
  L.push('| The instructor described the session-1 §05 price data as | **livebench.ai** |');
  L.push('| The corpus attributes it to | **Artificial Analysis**, in five places: the body note, the chart label, the footer entry, the `src-aa` key, and both §05 chips |');
  L.push('| Prices are separately attributed to | Anthropic\'s Claude Platform Docs |');
  L.push('| `grep -rniI "livebench"` repo-wide | **0 matches** |');
  L.push('\nThe file is unambiguous about what it says and cannot say what was actually');
  L.push('pulled: a build that fetched livebench and was written up as Artificial');
  L.push('Analysis would look identical from here. **Logged as');
  L.push('`[UNVERIFIED, needs source]` and not resolved.**\n');
  L.push('**And the versioning incoherence underneath it is worse than the attribution');
  L.push('question**, because that part is measurable — see the ordering rule above.');
  L.push('Fixing the attribution without fixing the versioning leaves the same defect');
  L.push('behind a tidier label.');
  return L.join('\n') + '\n';
}


/* ======================================== docs/source-verification-queue.md */

/**
 * The instructor's work list. GENERATED, never hand-maintained.
 *
 * Sorted by REFERENCE COUNT DESCENDING, because a source eleven claims rest on
 * is worth verifying before one that carries none. The totals sit at the top so
 * the shape of the gap is the first thing read: how many sources, how many have
 * never been read by a human, and how many references sit behind them.
 *
 * `last_verified` is EMPTY almost everywhere and that is the honest state, not
 * a backlog of missing data. Nothing in this repository may fill it in; see
 * scripts/attest-verified.mjs.
 */
function verificationQueue() {
  const rows = all.slice().sort((a, b) =>
    b.total_references - a.total_references || a.key.localeCompare(b.key));
  const empty = rows.filter((r) => !r.last_verified);
  const na = rows.filter((r) => r.last_verified === 'not applicable');
  const done = rows.filter((r) => r.verified);
  const emptyRefs = empty.reduce((a, b) => a + b.total_references, 0);
  const lockState = assertVerifiedLock(sources, { explain: true });

  const L = [];
  L.push(fill(`# Source verification queue

**Generated from \`SOURCES.md\` by \`scripts/build-bibliography.mjs\`. Do not edit:
the next run overwrites it.**

This is the instructor's work list, in the order the work is worth doing. A
source **{{TOPREFS}} claims rest on** is worth verifying before one that carries
none, so the ordering is **reference count, descending**.

## The two dates, and why only one of them is yours

| Field | What it asserts | Who may move it |
|---|---|---|
| \`last_verified\` | **You read the source** and confirmed this repository's claims about it are still accurate. A human attestation. | **You, and nothing else.** No generator, no re-pull, no agent, no automated process. \`scripts/attest-verified.mjs\` is the only writer and it refuses unless it is talking to an interactive terminal. |
| \`last_retrieved\` | A machine fetched the source. Records **when**, and never that anything is accurate. | Any re-pull. This is what *"update all live data points"* advances. |

**EMPTY is the honest value for \`last_verified\`.** It is not a backlog of
missing data; it is the measurement. A populated \`last_verified\` asserts that a
human read the source, and asserting that without evidence is the failure the
never-fabricate rule exists to prevent.

## Totals

| | |
|---|---|
| Source records | **{{N}}** |
| \`last_verified\` **EMPTY** | **{{EMPTY}}** |
| \`last_verified\` populated | {{DONE}} |
| \`last_verified\` *not applicable* (synthetic or fabricated) | {{NA}} |
| References standing behind an EMPTY \`last_verified\` | **{{EMPTYREFS}}** of {{REFS}} |
| Moving targets | {{MOVING}} |
| Lock | {{LOCK}} |
`, {
    N: rows.length,
    EMPTY: empty.length,
    DONE: done.length,
    NA: na.length,
    EMPTYREFS: emptyRefs,
    REFS: rows.reduce((a, b) => a + b.total_references, 0),
    MOVING: rows.filter((r) => r.moving_target).length,
    TOPREFS: rows[0] ? rows[0].total_references : 0,
    LOCK: lockState.ok ? `notarised, digest \`${lockState.digest.slice(0, 16)}\`` : `**BROKEN** — ${lockState.moved.join('; ')}`,
  }));

  if (done.length) {
    L.push('\n## Already attested\n');
    L.push('Each one cites the evidence in the repository that records the confirmation.\n');
    for (const r of done) {
      L.push(`- **\`${r.key}\`** — ${r.last_verified}. ${r.verified_by}`);
    }
    L.push('');
  }

  L.push('\n---\n\n## The queue\n');
  L.push('| # | Key | Title | `last_verified` | `last_retrieved` | Refs | Moving | Depends on it |');
  L.push('|---|---|---|---|---|---|---|---|');
  rows.forEach((r, i) => {
    const feeds = r.cited_by.slice().sort((a, b) => a.lesson.localeCompare(b.lesson))
      .map((c) => `${short(c.lesson)} \`#${c.section}\`${c.chips > 1 ? `×${c.chips}` : ''}`).join(' · ');
    const declared = LESSONS.filter((l) => r.used_for[l]).map(short).join(', ');
    const lv = r.last_verified === 'not applicable' ? '*n/a*' : (r.last_verified ? `**${r.last_verified}**` : '**EMPTY**');
    const lr = isAbsent(r.last_retrieved)
      ? (r.last_retrieved === 'not applicable' ? '*n/a*' : '**none**')
      : (isPartialDate(r.last_retrieved) ? `${r.last_retrieved} *(month only)*` : r.last_retrieved);
    L.push(`| ${i + 1} | \`${r.key}\` | ${r.title.replace(/\|/g, '\\|')} | ${lv} | ${lr} | ${r.total_references} | ${r.moving_target ? 'yes' : 'no'} | ${feeds || `*listed by ${declared || 'no lesson'}, cited by none*`} |`);
  });

  L.push('\n\n---\n\n## Links, for the reading\n');
  L.push('| Key | Link |');
  L.push('|---|---|');
  for (const r of rows) {
    L.push(`| \`${r.key}\` | ${isAbsent(r.link) ? (r.link === 'not applicable' ? '*not applicable*' : `**${UNVERIFIED}** — find the canonical page before verifying`) : r.link} |`);
  }

  const notes = rows.filter((r) => r.retrieval_note);
  if (notes.length) {
    L.push('\n\n---\n\n## Retrieval notes\n');
    L.push('What happened the last time somebody tried, and what it does and does not say');
    L.push('about the source.\n');
    for (const r of notes) L.push(`### \`${r.key}\`\n\n${r.retrieval_note}\n`);
  }

  const changed = rows.filter((r) => r.content_changed);
  L.push('\n\n---\n\n## Sources whose content CHANGED on the last fetch\n');
  if (changed.length) {
    L.push('**A fetch that found the source saying something different is a finding, not');
    L.push('an update.** Nothing below has been silently rewritten in the lessons. Each');
    L.push('entry names the delta and every lesson element that depends on it.\n');
    for (const r of changed) L.push(`### \`${r.key}\` — ${r.total_references} reference(s)\n\n${r.content_changed}\n`);
  } else {
    L.push('*No source was found to have changed on the last fetch. Note that a source');
    L.push('nobody could reach is not a source that did not change — see below.*');
  }

  const unreachable = rows.filter((r) => /Fetch ATTEMPTED .* REFUSED/.test(r.retrieval_note || ''));
  L.push('\n---\n\n## What this build could not reach\n');
  if (unreachable.length) {
    L.push(fill(`**{{U}} source host(s) refused the connection before the request reached them.**
This build environment enforces an egress policy; on 2026-08-25 every source host
except \`platform.claude.com\` answered **403 to CONNECT**. That is a fact about
the environment and **not** about the sources: none of them is known to have
moved or gone. No \`last_retrieved\` date was written for any of them, because no
retrieval happened.
`, { U: unreachable.length }));
    L.push('| Key | Refs | Host |');
    L.push('|---|---|---|');
    for (const r of unreachable) {
      const host = isAbsent(r.link) ? '*link unknown*' : new URL(r.link).host;
      L.push(`| \`${r.key}\` | ${r.total_references} | ${host} |`);
    }
  } else {
    L.push('*Every source with a link was reachable on the last run.*');
  }
  return L.join('\n') + '\n';
}

/* ---------------------------------------------------------------------- main */

let drift = 0;
for (const [name, body] of [['BIBLIOGRAPHY.md', bibliography()], ['DATA-PULL.md', dataPull()],
                            ['docs/source-verification-queue.md', verificationQueue()]]) {
  const path = join(REPO, name);
  let before = null;
  try { before = readFileSync(path, 'utf8'); } catch { /* first run */ }
  if (before === body) { console.log(`current       ${name}`); continue; }
  drift++;
  console.log(`${CHECK ? 'WOULD CHANGE' : 'written     '}  ${name}`);
  if (!CHECK) writeFileSync(path, body);
}
if (CHECK && drift) {
  console.error(`\n${drift} generated file(s) are stale. Run without --check.`);
  process.exit(1);
}
console.log(CHECK ? '\nall three generated files are current' : `\n${drift} file(s) written`);
