#!/usr/bin/env node
/**
 * build-appendix.mjs — the appendix reflow and the generated minute copies.
 *
 * Phase 2 of docs/repo-updates-plan.md. This script owns every place a lesson
 * states a section count or a minute figure that a table also computes. Those
 * figures were hand-typed in two to seven places per lesson and had drifted
 * apart in every one of them (EDITORIAL.md A1-A5, 23 violations before this
 * script existed). Nothing here is a judgement: every number is read off the
 * sections themselves.
 *
 *   node scripts/build-appendix.mjs                     # rewrite all four lessons
 *   node scripts/build-appendix.mjs --check             # exit 1 if a file would change
 *   node scripts/build-appendix.mjs --file session-2/index.html
 *
 * IDEMPOTENT. Running it twice is a no-op; --check is "run it and diff", which is
 * how a hand-edit inside a generated region is detected. Same contract as
 * verify-case.mjs: the generated span is the script's, and editing it by hand is
 * a finding rather than a merge.
 *
 * FOUR GENERATED REGIONS per lesson, each sentinel-delimited so the next
 * generation is diffable:
 *
 *   APXPANEL   section.apxdiv#apx        the leading contents panel (A2, A3, A4, A5)
 *   APXSTUB    div.apxstub               one per appendix section, the out-of-depth stub
 *   APXBUDGET  table.tbudget > tbody     the instructor minute budget (V5, migration 16)
 *   APXCORE    window.__coreMins         the tier readout's core figure
 *
 * plus the reflow itself: appendix sections are moved into the reading position
 * their data-insert-after names, and the panel is moved to the head of the file
 * beside the tier bar.
 *
 * WHAT THIS SCRIPT WILL NOT DO. It never writes a number it was not given, and
 * it never emits a template with a hole in it: fill() throws on an unsubstituted
 * placeholder and on an undefined value. Phase 1 found three hand-edited counts
 * that had silently stopped matching their regenerated tables; a generator that
 * can emit "{{CORE_MIN}}" is the same defect wearing a nicer hat.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const LESSONS = ['session-1', 'session-2', 'session-3', 'session-4'];

const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const ONE = (() => { const i = argv.indexOf('--file'); return i >= 0 ? argv[i + 1] : null; })();

/* The tie-break §4.1 of the plan declares, because none existed. Where two or
   more appendix sections share an anchor: foundational, then standard, then
   advanced; ties within a tier fall through to existing source order. */
const TIER_ORDER = ['foundational', 'standard', 'advanced'];

/* references/pedagogy.md §s4, the ratified build parameters. A generator that
   reads minutes off the sections will happily overwrite a hand-typed figure that
   was the only copy still matching one of these, which is exactly what happened
   to session-1's A7 card: it said 15, the parameter says 15, and the section
   eyebrow and the time budget both say 17. Regenerating made the card agree with
   the section and buried a parameter violation the drifted index had been
   masking. So the conflict is printed on every run rather than decided by the
   fact that a script wrote last. This never blocks: it is an instructor
   decision, and the two readings are in docs/repo-updates-plan.md §4.7. */
const RATIFIED = {
  'cold-open ritual': { min: 8, match: (s) => /Cold open/i.test(s.eyebrow || '') },
  'named discussion block': {
    min: (lesson) => (lesson === 'session-1' ? 15 : 20),
    match: (s) => s.apx && /Discussion/i.test(s.eyebrow || ''),
  },
};
const conflicts = [];

/* ------------------------------------------------------------------ template */

/** Substitute {{KEY}} and refuse to return a string that still has a hole in it. */
function fill(tpl, vars) {
  const out = tpl.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, k) => {
    if (!(k in vars)) throw new Error(`build-appendix: no value for {{${k}}}`);
    const v = vars[k];
    if (v === undefined || v === null || (typeof v === 'number' && !Number.isFinite(v))) {
      throw new Error(`build-appendix: {{${k}}} resolved to ${String(v)}`);
    }
    return String(v);
  });
  const left = out.match(/\{\{[^}]*\}\}/);
  if (left) throw new Error(`build-appendix: unsubstituted placeholder ${left[0]}`);
  return out;
}

/** English cardinals for the small counts the ledes carry. Numerals above ten. */
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
  'nine', 'ten'];
const card = (n) => (n <= 10 ? WORDS[n] : String(n));
const Card = (n) => card(n).charAt(0).toUpperCase() + card(n).slice(1);

/* -------------------------------------------------------------------- parse */

/**
 * Split a lesson into [head, sections, tail]. A section slice is the
 * column-0 `<section ...>` line through its column-0 `</section>` line plus the
 * blank lines that follow it, so reordering slices is byte-preserving. Verified
 * against all four lessons: nothing but blank lines sits between two sections.
 */
function split(text) {
  const lines = text.split('\n');
  /* A slice starts at a column-0 <section>, or at the APXPANEL sentinel that
     wraps one once this script has run over the file. */
  const opens = (l) => /^<section\b/.test(l) || /^<!-- APXPANEL:BEGIN/.test(l);
  const closes = (l, wrapped) => (wrapped ? /^<!-- APXPANEL:END -->/ : /^<\/section>/).test(l);
  let i = 0;
  for (; i < lines.length; i++) if (opens(lines[i])) break;
  const head = lines.slice(0, i);
  const secs = [];
  while (i < lines.length && opens(lines[i])) {
    const start = i;
    const wrapped = /^<!-- APXPANEL:BEGIN/.test(lines[i]);
    while (i < lines.length && !closes(lines[i], wrapped)) i++;
    if (i >= lines.length) throw new Error('build-appendix: unterminated <section>');
    i++;                                              /* past the closing line */
    while (i < lines.length && lines[i].trim() === '') i++; /* trailing blanks */
    secs.push(lines.slice(start, i));
  }
  return { head, secs, tail: lines.slice(i) };
}

/** The exact inverse of split(). Round-trips byte for byte. */
function assemble(head, secs, tail) {
  return [...head, ...secs.flatMap((s) => s.split('\n')), ...tail].join('\n');
}

const attr = (open, k) => { const m = open.match(new RegExp(`${k}="([^"]*)"`)); return m ? m[1] : null; };

/** Everything the generator needs about one section, read off the section. */
function model(raw) {
  const t = raw.indexOf('<section');
  if (t < 0) throw new Error('build-appendix: slice with no <section> tag');
  const open = raw.slice(t, raw.indexOf('>', t) + 1);
  const cls = attr(open, 'class') || '';
  const mins = raw.match(/<span class="mins">\s*(\d+)\s*min\s*<\/span>/);
  const eb = raw.match(/<div class="eyebrow"><span>([\s\S]*?)<\/span>/);
  const h = raw.match(/<h([12])[^>]*>([\s\S]*?)<\/h\1>/);
  return {
    raw,
    id: attr(open, 'id'),
    cls,
    nav: attr(open, 'data-nav'),
    tier: attr(open, 'data-tier'),
    after: attr(open, 'data-insert-after'),
    apx: /\bapx\b/.test(cls) && !/apxdiv/.test(cls),
    apxdiv: /apxdiv/.test(cls),
    mins: mins ? Number(mins[1]) : null,
    eyebrow: eb ? eb[1] : null,
    title: h ? h[2].replace(/\s+/g, ' ').trim() : null,
  };
}

/* ------------------------------------------------------------------- reflow */

/**
 * Reading order: the core in source order, the contents panel immediately after
 * the first core section (which is the section that carries #tierbar), and each
 * appendix section immediately after the core section its data-insert-after
 * names, tie-broken by tier then by source order.
 */
function reorder(ms, lesson) {
  const core = ms.filter((m) => !m.apx && !m.apxdiv);
  const apx = ms.filter((m) => m.apx);
  const div = ms.find((m) => m.apxdiv);
  if (!div) throw new Error(`${lesson}: no section.apxdiv`);
  if (!core.length) throw new Error(`${lesson}: no core sections`);

  const byAnchor = new Map();
  for (const a of apx) {
    if (!a.after) throw new Error(`${lesson}: #${a.id} has no data-insert-after`);
    if (!core.some((c) => c.id === a.after)) {
      throw new Error(`${lesson}: #${a.id} anchors to #${a.after}, which is not a core section`);
    }
    if (!byAnchor.has(a.after)) byAnchor.set(a.after, []);
    byAnchor.get(a.after).push(a);
  }
  for (const list of byAnchor.values()) {
    list.forEach((a, i) => { a._src = i; });
    list.sort((x, y) => {
      const t = TIER_ORDER.indexOf(x.tier) - TIER_ORDER.indexOf(y.tier);
      return t !== 0 ? t : x._src - y._src;
    });
  }

  const out = [];
  core.forEach((c, i) => {
    out.push(c);
    if (i === 0) out.push(div);           /* the panel, beside the tier bar */
    for (const a of byAnchor.get(c.id) || []) out.push(a);
  });
  if (out.length !== ms.length) throw new Error(`${lesson}: reorder lost a section`);
  return out;
}

/* ------------------------------------------------------------------ figures */

/** The core section number an "after §NN" label points at. */
function coreNumber(anchor, core, lesson) {
  const m = (anchor.eyebrow || '').match(/^\s*(\d\d)\s*(?:&middot;|·)/);
  if (m) return m[1];
  /* The opener carries the course line rather than a number. session-2's index
     already writes §00 for it; that convention is kept rather than invented. */
  if (core[0] && core[0].id === anchor.id) return '00';
  throw new Error(`${lesson}: cannot derive a section number for anchor #${anchor.id}`);
}

/** "A5" from "Appendix A5 &middot; Lab". */
function apxLabel(s, lesson) {
  const m = (s.eyebrow || '').match(/Appendix\s+([A-Z]\d+)/);
  if (!m) throw new Error(`${lesson}: #${s.id} eyebrow does not name an appendix label`);
  return m[1];
}

/* ---------------------------------------------------------------- templates */

const PANEL = `<!-- APXPANEL:BEGIN generated-by=scripts/build-appendix.mjs -->
<section class="slide apxdiv" id="apx" data-nav="Appendix contents">
  <div class="eyebrow"><span>Appendix &middot; {{APX_N}} optional sections</span><span class="mins">{{APX_MIN}} min</span></div>
  <h2>Appendix contents</h2>
  <p class="lede">{{APX_N_WORD}} optional sections, {{APX_MIN}} minutes in all. Each one is placed in the core at the point it belongs, so the depth control above adds depth in place rather than sending you to the back of the file.</p>
  <p>The {{CORE_N}} sections of the core session run in about {{CORE_MIN}} minutes and are what always gets taught. Nothing in the core depends on anything in the appendix. Each card names the core section its appendix section follows, so what you are skipping and what it would cost are both on this page.</p>
  <div class="apxgrid">
{{CARDS}}
  </div>
</section>
<!-- APXPANEL:END -->`;

const CARD = `    <a class="apxcard" href="#{{ID}}"><span class="ac">{{LABEL}} &middot; {{MIN}} min &middot; after &sect;{{AFTER}}</span><b>{{TITLE}}</b></a>`;

const STUB = `  <!-- APXSTUB:BEGIN --><div class="apxstub"><b>{{LABEL}} &middot; {{TITLE}}</b><span>{{MIN}} min &middot; {{TIER}} &middot; hidden at the current appendix depth</span></div><!-- APXSTUB:END -->`;

const BUDGET = `<!-- APXBUDGET:BEGIN generated-by=scripts/build-appendix.mjs -->
    <tbody>
{{ROWS}}
      <tr class="nosum"><td>Break</td><td>Posted as a clock time, not a duration</td><td class="n">15</td></tr>
      <tr class="nosum"><td>Reserve</td><td>Transitions and overrun, inside the 180-minute block</td><td class="n">15</td></tr>
      <tr class="alloc"><td>Allocated</td><td>Core {{CORE_MIN}} + appendix {{APX_MIN}}; the core alone runs {{CORE_MIN}} minutes, {{HOUR}}</td><td class="n">{{TOTAL}}</td></tr>
    </tbody>
<!-- APXBUDGET:END -->`;

const ROW = `      <tr{{CLS}}><td>{{LABEL}}</td><td>{{TITLE}}</td><td class="n">{{MIN}}</td></tr>`;

const COREMINS = `/* APXCORE:BEGIN generated-by=scripts/build-appendix.mjs */
window.__coreMins={{CORE_MIN}};
/* APXCORE:END */`;

/* An OPTIONAL region. Only session-2 carries a student-facing time budget in its
   opener, and it was an eighth copy of the minute figures that agreed with none
   of the other seven: it credited Appendix B1 with 9 minutes against the
   section's 16, put Final Project Part 1 at 10 against 5, and omitted the
   8-minute cold-open ritual entirely. Nothing checked it, because
   validate_lesson V5 and verify-migration 16 both read the footer's
   data-timing table and this one has no data-timing attribute. It is now the
   summary the section actually needs, generated, with the per-section detail
   left to the footer where it is checked. Emitted only where the sentinel
   already exists, so this never invents a table in a lesson that has none. */
const RIGHT = 'text-align:right;font-family:JetBrains Mono,monospace;font-size:12px;text-transform:uppercase;letter-spacing:.09em';
const MAP = `<!-- APXMAP:BEGIN generated-by=scripts/build-appendix.mjs -->
  <table>
    <thead><tr><th>Block</th><th>What it is</th><th class="n">Minutes</th></tr></thead>
    <tbody>
      <tr><td>Core</td><td>{{CORE_N}} sections, taught in every room</td><td class="n">{{CORE_MIN}}</td></tr>
      <tr><td>Appendix</td><td>{{APX_N}} optional sections, taken in place at the depth you set</td><td class="n">{{APX_MIN}}</td></tr>
      <tr><td colspan="2" style="${RIGHT}">Allocated instructional minutes</td><td class="n"><strong>{{TOTAL}}</strong></td></tr>
      <tr><td colspan="2" style="${RIGHT}">Break, plus transition and overrun reserve</td><td class="n">30</td></tr>
      <tr><td colspan="2" style="${RIGHT}">Block total, 6:00 to 9:00 PM</td><td class="n"><strong>180</strong></td></tr>
    </tbody>
  </table>
  <p class="dim" style="font-size:14px">The core alone runs {{CORE_MIN}} minutes, {{HOUR}}. Every section carries its own minute figure on its eyebrow; the full per-section budget is in the footer.</p>
<!-- APXMAP:END -->`;

/* Another OPTIONAL region, and a ninth copy of the same figures. Only session-3
   carries a footer paragraph restating the shape of the file, and it was wrong
   on all four numbers it gave (12 core against 13, 64 minutes against 70, 4
   appendix against 5, 48 minutes against 80), called 70 minutes "the one-hour
   version", and sent the reader to the gold teasers that step (e) retires. */
const NOTE = `<!-- APXNOTE:BEGIN generated-by=scripts/build-appendix.mjs -->
  <p style="margin-top:22px">The core is {{CORE_N}} sections and runs in about {{CORE_MIN}} minutes, {{HOUR}}. The {{APX_N}} appendix sections add {{APX_MIN}} more, taken in place at whatever depth the tier bar is set to, or read alone afterwards. No section gating: everything scrolls freely and answer panels stay hidden until an explicit reveal control or <strong>Shift+U</strong>.</p>
<!-- APXNOTE:END -->`;

/* --------------------------------------------------------------- generation */

function replaceRegion(text, name, block, insert) {
  const rx = new RegExp(`<!-- ${name}:BEGIN[\\s\\S]*?<!-- ${name}:END -->`);
  if (rx.test(text)) return text.replace(rx, () => block);
  return insert(text, block);
}

function build(lesson) {
  const path = join(REPO, lesson, 'index.html');
  const before = readFileSync(path, 'utf8');
  const { head, secs, tail } = split(before);
  const ms = secs.map((lines) => model(lines.join('\n')));
  if (assemble(head, ms.map((m) => m.raw), tail) !== before) {
    throw new Error(`${lesson}: split/assemble is not byte-exact; refusing to write`);
  }

  const ordered = reorder(ms, lesson);
  const core = ordered.filter((m) => !m.apx && !m.apxdiv);
  const apx = ordered.filter((m) => m.apx);
  const coreMin = core.reduce((a, b) => a + (b.mins || 0), 0);
  const apxMin = apx.reduce((a, b) => a + (b.mins || 0), 0);
  for (const s of [...core, ...apx]) {
    if (s.mins === null) throw new Error(`${lesson}: #${s.id} has no span.mins`);
    if (!s.title) throw new Error(`${lesson}: #${s.id} has no h1/h2`);
    if (!s.eyebrow) throw new Error(`${lesson}: #${s.id} has no eyebrow`);
    for (const [name, p] of Object.entries(RATIFIED)) {
      if (!p.match(s)) continue;
      const want = typeof p.min === 'function' ? p.min(lesson) : p.min;
      if (s.mins !== want) {
        conflicts.push(`${lesson} #${s.id}  ${name}: section says ${s.mins} min, `
          + `references/pedagogy.md §s4 says ${want}`);
      }
    }
  }

  /* --- APXSTUB, one per appendix section, as its first child ------------- */
  for (const s of apx) {
    const stub = fill(STUB, {
      LABEL: apxLabel(s, lesson),
      TITLE: s.title,
      MIN: s.mins,
      TIER: s.tier,
    });
    const open = s.raw.slice(0, s.raw.indexOf('\n'));
    const rest = s.raw.slice(s.raw.indexOf('\n') + 1);
    const stripped = rest.replace(/^\s*<!-- APXSTUB:BEGIN -->[\s\S]*?<!-- APXSTUB:END -->\n/, '');
    s.raw = open + '\n' + stub + '\n' + stripped;
  }

  /* --- APXPANEL --------------------------------------------------------- */
  const cards = apx.map((s) => fill(CARD, {
    ID: s.id,
    LABEL: apxLabel(s, lesson),
    MIN: s.mins,
    AFTER: coreNumber(core.find((c) => c.id === s.after), core, lesson),
    TITLE: s.title,
  })).join('\n');
  const panel = fill(PANEL, {
    APX_N: apx.length,
    APX_N_WORD: Card(apx.length),
    APX_MIN: apxMin,
    CORE_N: core.length,
    CORE_MIN: coreMin,
    CARDS: cards,
  });
  const div = ordered.find((m) => m.apxdiv);
  const trailing = (div.raw.match(/(?:\n[ \t]*)*$/) || [''])[0];
  div.raw = panel + trailing;

  /* --- reassemble the sections in reading order -------------------------- */
  let text = assemble(head, ordered.map((m) => m.raw), tail);

  /* --- APXBUDGET -------------------------------------------------------- */
  const rows = [
    ...core.map((s) => fill(ROW, { CLS: '', LABEL: s.eyebrow, TITLE: s.title, MIN: s.mins })),
    ...apx.map((s) => fill(ROW, { CLS: ' class="apxrow"', LABEL: s.eyebrow, TITLE: s.title, MIN: s.mins })),
  ].join('\n');
  /* D18: the band is 60-70 and two lessons already exceed the hour. The row said
     "the core alone is the one-hour version" in all four, which is false wherever
     the core runs over 60. It now states what the lesson runs. */
  const over = coreMin - 60;
  const hour = over <= 0
    ? 'and fits the hour'
    : `${card(over)} minutes over the hour`;
  const budget = fill(BUDGET, {
    ROWS: rows,
    CORE_MIN: coreMin,
    APX_MIN: apxMin,
    TOTAL: coreMin + apxMin,
    HOUR: hour,
  });
  text = replaceRegion(text, 'APXBUDGET', budget, (t, b) => {
    const rx = /(<table class="tbudget"[^>]*>\s*\n\s*<thead>[\s\S]*?<\/thead>\n)([\s\S]*?<\/tbody>\n)/;
    if (!rx.test(t)) throw new Error(`${lesson}: cannot find table.tbudget tbody`);
    return t.replace(rx, (_, a) => a + b + '\n');
  });

  /* --- APXMAP, where a lesson carries one ------------------------------- */
  const rxMap = /<!-- APXMAP:BEGIN[\s\S]*?<!-- APXMAP:END -->/;
  if (rxMap.test(text)) {
    text = text.replace(rxMap, () => fill(MAP, {
      CORE_N: core.length, CORE_MIN: coreMin,
      APX_N: apx.length, APX_MIN: apxMin,
      TOTAL: coreMin + apxMin, HOUR: hour,
    }));
  }

  /* --- APXNOTE, where a lesson carries one ------------------------------ */
  const rxNote = /<!-- APXNOTE:BEGIN[\s\S]*?<!-- APXNOTE:END -->/;
  if (rxNote.test(text)) {
    text = text.replace(rxNote, () => fill(NOTE, {
      CORE_N: core.length, CORE_MIN: coreMin,
      APX_N: apx.length, APX_MIN: apxMin, HOUR: hour,
    }));
  }

  /* --- APXCORE ---------------------------------------------------------- */
  const coreMinsBlock = fill(COREMINS, { CORE_MIN: coreMin });
  const rxCore = /\/\* APXCORE:BEGIN[\s\S]*?\/\* APXCORE:END \*\//;
  if (rxCore.test(text)) text = text.replace(rxCore, () => coreMinsBlock);
  else {
    const rx = /window\.__coreMins\s*=\s*\d+\s*;/;
    if (!rx.test(text)) throw new Error(`${lesson}: cannot find window.__coreMins`);
    text = text.replace(rx, () => coreMinsBlock);
  }

  return { path, before, after: text, coreMin, apxMin, core: core.length, apx: apx.length };
}

/* --------------------------------------------------------------------- main */

const targets = ONE ? [ONE.replace(/\/index\.html$/, '')] : LESSONS;
let changed = 0;
for (const l of targets) {
  const r = build(l);
  const same = r.before === r.after;
  const state = same ? 'current' : (CHECK ? 'WOULD CHANGE' : 'written');
  console.log(
    `${state.padEnd(13)} ${l.padEnd(11)} core ${String(r.core).padStart(2)} / ${String(r.coreMin).padStart(3)} min` +
    `   appendix ${String(r.apx).padStart(2)} / ${String(r.apxMin).padStart(3)} min` +
    `   total ${r.coreMin + r.apxMin}`
  );
  if (!same) {
    changed++;
    if (!CHECK) writeFileSync(r.path, r.after);
  }
}
if (conflicts.length) {
  console.log('\nRATIFIED PARAMETER CONFLICT  (printed, never resolved here)');
  conflicts.forEach((c) => console.log('  ' + c));
  console.log('  The generator wrote the section figure into every copy, which is the only');
  console.log('  self-consistent thing it can do. Whether the section or the parameter is');
  console.log('  wrong is the instructor\'s: docs/repo-updates-plan.md §4.7 carries both');
  console.log('  readings and MAINTAINING.md carries the open follow-up.');
}
if (CHECK && changed) {
  console.error(`\n${changed} lesson(s) differ from what the sections say. Run without --check to regenerate.`);
  process.exit(1);
}
console.log(CHECK ? '\nall generated regions agree with their sections' : `\n${changed} file(s) rewritten`);
