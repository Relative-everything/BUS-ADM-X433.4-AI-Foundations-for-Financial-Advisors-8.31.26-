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
import { model, LESSONS, isAbsent, UNVERIFIED } from './build-sources.mjs';

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
  const withGaps = all.filter((r) => ['author', 'publisher', 'link', 'published', 'retrieved']
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
    L.push(`| Last accessed | ${gap(r.retrieved)} |`);
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
  /* THE ORDERING RULE: pulled_on ascending implies index_version non-descending.
     The corpus violates it, which is what turns report §3.7 G3 from a note into
     a failing assertion. */
  const violations = [];
  const byKey = {};
  for (const p of pulls) (byKey[p.key] ||= []).push(p);
  for (const [key, list] of Object.entries(byKey)) {
    const dated = list.filter((p) => /^\d{4}/.test(p.retrieved))
      .sort((a, b) => a.retrieved.localeCompare(b.retrieved));
    for (let i = 1; i < dated.length; i++) {
      const prev = dated[i - 1], cur = dated[i];
      const pv = (prev.index_version || '').replace(/^v/, '');
      const cv = (cur.index_version || '').replace(/^v/, '');
      if (!/^\d/.test(pv) || !/^\d/.test(cv)) continue;
      const cmp = pv.localeCompare(cv, undefined, { numeric: true });
      if (cmp > 0) {
        violations.push(`${key}: ${prev.lesson} pulled ${prev.retrieved} at v${pv}, `
          + `${cur.lesson} pulled later on ${cur.retrieved} at v${cv} — version went DOWN`);
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
  L.push('> **`pulled_on` ascending implies `index_version` non-descending.**\n');
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
    L.push(`| Retrieved | ${gap(r.retrieved)} |`);
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

/* ---------------------------------------------------------------------- main */

let drift = 0;
for (const [name, body] of [['BIBLIOGRAPHY.md', bibliography()], ['DATA-PULL.md', dataPull()]]) {
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
console.log(CHECK ? '\nboth generated files are current' : `\n${drift} file(s) written`);
