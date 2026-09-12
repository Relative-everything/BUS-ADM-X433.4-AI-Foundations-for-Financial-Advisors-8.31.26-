#!/usr/bin/env node
/**
 * section_profile.mjs — read-only per-section profiler for a lesson file.
 *
 * Emits one JSON profile per lesson at docs/audits/profiles/<dir>.json where
 * <dir> is the lesson's directory name (session-1/index.html -> session-1.json).
 * Reads the file; never writes anything but the profile. Static parsing is the
 * primary method (line numbers are source lines); if jsdom resolves (globally,
 * via NODE_PATH, or via JSDOM_PATH=<node_modules dir>) the page scripts are
 * executed once and a supplementary `dom` block records rendered counts.
 *
 * Usage: node scripts/audit/section_profile.mjs session-1/index.html session-2/index.html
 *        [--out docs/audits/profiles]
 *
 * Every metric is labelled with its method in `methods` at the top of the
 * profile. Heuristics (exposition run, undefined terms) are marked M or L.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/* ---------- ICAP tiers per component family (component-bank.md v2.0) ---------- */
const ICAP = {
  'work-along-gate': 'A', 'spoiler-reveal': 'A', 'commit-first-mcq': 'C',
  'prediction-commit': 'C', 'retrieval-bridge': 'C', 'parameter-sandbox': 'A',
  'distribution-picker': 'A', 'pipeline-lab': 'C', 'hand-fit-lab': 'C',
  'estimate-then-reveal': 'C', 'click-map-explorer': 'A', 'two-bucket-sorter': 'C',
  'multi-column-sorter': 'C', 'symptom-diagnoser': 'A', 'builder-assembler': 'C',
  'sealed-vote-debate': 'I', 'timed-ritual': 'C', 'case-modal-spine': 'P',
};

/* ---------- small HTML helpers (no dependency) ---------- */
const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const ENT = { amp:'&', lt:'<', gt:'>', quot:'"', apos:"'", nbsp:' ', mdash:'—', ndash:'–',
  middot:'·', sect:'§', ldquo:'“', rdquo:'”', lsquo:'‘', rsquo:'’',
  hellip:'…', times:'×', le:'≤', ge:'≥', ne:'≠', rarr:'→', larr:'←',
  deg:'°', frac12:'½', check:'✓', para:'¶', copy:'©', dollar:'$', num:'#' };
function decode(s) {
  return s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
          .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
          .replace(/&([a-z0-9]+);/gi, (m, n) => (n in ENT ? ENT[n] : m));
}
function stripTags(s) {
  return decode(s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
                 .replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' '));
}
/* Same token rule validate_lesson.py C1 uses, so densities are comparable. */
function words(s) { return (stripTags(s).match(/[A-Za-z][A-Za-z'-]*/g) || []).length; }
function lineOf(src, idx) { let n = 1; for (let i = 0; i < idx; i++) if (src.charCodeAt(i) === 10) n++; return n; }

/* Find the extent of the element whose start tag begins at `start`, by
   counting same-name open/close tags (adequate for this corpus's markup). */
function elementExtent(src, start) {
  const m = /^<([a-zA-Z0-9]+)/.exec(src.slice(start, start + 40));
  if (!m) return null;
  const name = m[1].toLowerCase();
  if (VOID.has(name)) return { start, end: src.indexOf('>', start) + 1 };
  const re = new RegExp(`<(/?)${name}\\b[^>]*>`, 'gi');
  re.lastIndex = start;
  let depth = 0, mm;
  while ((mm = re.exec(src))) {
    if (mm[1] === '/') { depth--; if (depth === 0) return { start, end: mm.index + mm[0].length }; }
    else if (!/\/>$/.test(mm[0])) depth++;
  }
  return { start, end: src.length };
}
function attr(tag, name) { const m = new RegExp(`\\b${name}="([^"]*)"`).exec(tag); return m ? decode(m[1]) : null; }
function hasClass(tag, cls) { const c = attr(tag, 'class'); return !!c && c.split(/\s+/).includes(cls); }

/* ---------- term heuristic (M) ---------- */
const ACRO_STOP = new Set(['AI','US','U.S.','UK','OK','PM','AM','ID','UC','PDF','HTML','CSS','JS','URL','CEO','CFO',
  'MBA','TV','BUS','ADM','FAQ','GPT','IRS','LLC','IRA','CPC','FINRA','SEC','CFP','JSON','SVG','PT','ET','CT',
  'ILCS','II','III','IV','VI','VII','VIII','IX','XI','XII','QED','NB','PS','RE','CB','ROI','USD','ETF']);
const CFP_KNOWN = new Set(['IRA','LLC','CEO','CFP','IRS','SEC','FINRA','RMD','AUM','QTIP','GST','QSBS','ILIT','GRAT','ETF','IDGT']);
function termCensus(sectionsText) {
  /* sectionsText: [{id, text}] in document order. First use is file-level. */
  const seen = new Map();
  const acroRe = /\b(?:[A-Z][A-Z0-9]{1,}(?:\.[A-Z]){0,}|(?:[A-Z]\.){2,}[A-Z]?)\b/g;
  const citeRe = /(?:§\s?\d+[\w().-]*|Rev\.\s?Rul\.\s?[\d-]+|Rev\.\s?Proc\.\s?[\d-]+|Treas\.\s?Reg\.\s?[\d§.()-]+|\d+\s?T\.C\.\s?\d+|I\.R\.B\.|Notice\s\d{4}-\d+)/g;
  const out = [];
  for (const { id, text } of sectionsText) {
    const toks = text.split(/\s+/);
    const joined = text;
    const hits = [];
    for (const re of [acroRe, citeRe]) {
      re.lastIndex = 0; let m;
      while ((m = re.exec(joined))) hits.push({ term: m[0], idx: m.index, kind: re === acroRe ? 'acronym' : 'citation' });
    }
    hits.sort((a, b) => a.idx - b.idx);
    for (const h of hits) {
      const key = h.term.replace(/\s+/g, ' ');
      if (h.kind === 'acronym' && (ACRO_STOP.has(key) || key.length < 2)) continue;
      if (seen.has(key)) continue;
      seen.set(key, id);
      /* window of 40 words either side of first use */
      const before = joined.slice(0, h.idx).split(/\s+/).slice(-40).join(' ');
      const after = joined.slice(h.idx + h.term.length).split(/\s+/).slice(0, 40).join(' ');
      const win = before + ' ' + after;
      let defined = false, how = null;
      if (/\(/.test(after.slice(0, 80)) || /\)\s*$/.test(before.slice(-3))) { defined = true; how = 'parenthetical'; }
      else if (/^\s*[,:—-]\s*(the|a|an|which|meaning|that is|i\.e\.)/i.test(after)) { defined = true; how = 'appositive'; }
      else if (/^\s*(is|are|means|stands for|refers to|names|describes|calls?)\b/i.test(after)) { defined = true; how = 'copula'; }
      else if (h.kind === 'acronym') {
        const letters = key.replace(/[^A-Z]/g, '');
        if (letters.length >= 2) {
          const capsSeq = new RegExp('\\b' + letters.split('').map(l => l + '[a-z]+').join('[\\s-]+(?:of\\s+|the\\s+|for\\s+|and\\s+)?') , '');
          if (capsSeq.test(win) || new RegExp(letters.split('').map(l => l.toLowerCase() + '[a-z]+').join('[\\s-]+(?:of\\s+|the\\s+|for\\s+|and\\s+)?'), 'i').test(win)) { defined = true; how = 'expansion'; }
        }
      }
      out.push({ term: key, kind: h.kind, first_use_section: id, defined_within_40_words: defined, how,
                 cfp_baseline_vocabulary: CFP_KNOWN.has(key), context: (before.split(' ').slice(-8).join(' ') + ' [' + key + '] ' + after.split(' ').slice(0, 8).join(' ')).trim() });
    }
  }
  return out;
}

/* ---------- main profile ---------- */
function profile(file) {
  const src = readFileSync(file, 'utf8');
  const footerIdx = src.lastIndexOf('<footer');
  const footer = footerIdx >= 0 ? src.slice(footerIdx) : '';
  const footerIds = new Set([...footer.matchAll(/<li\s+id="(src-[^"]+)"/g)].map(m => m[1]));
  const markCalls = new Set([...src.matchAll(/mark\(['"]([\w-]+)['"]\)/g)].map(m => m[1]));

  /* timing table */
  const timing = {};
  const tt = /<table[^>]*data-timing[^>]*>([\s\S]*?)<\/table>/.exec(src);
  let timingSum = 0, alloc = null;
  if (tt) for (const [, attrs, body] of tt[1].matchAll(/<tr([^>]*)>([\s\S]*?)<\/tr>/g)) {
    const n = /<td[^>]*class="n"[^>]*>\s*\**([0-9]+)\**\s*</.exec(body); if (!n) continue;
    const cells = [...body.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => stripTags(m[1]).trim());
    const v = +n[1];
    if (/alloc/.test(attrs)) alloc = v; else if (!/nosum/.test(attrs)) { timingSum += v; timing[cells[0]] = { title: cells[1], min: v, apx: /apxrow/.test(attrs) }; }
  }

  const sections = [];
  const secRe = /<section\b[^>]*>/g; let sm;
  const sectionTexts = [];
  while ((sm = secRe.exec(src))) {
    const ext = elementExtent(src, sm.index);
    const tag = sm[0], body = src.slice(sm.index, ext.end);
    const id = attr(tag, 'id');
    const nav = attr(tag, 'data-nav');
    const isToc = hasClass(tag, 'apxdiv');
    const isApx = hasClass(tag, 'apx');
    const eb = /<div class="eyebrow">\s*<span>([\s\S]*?)<\/span>\s*<span class="mins">([\s\S]*?)<\/span>/.exec(body);
    const eyebrow = eb ? stripTags(eb[1]).replace(/\s+/g, ' ').trim() : null;
    const mins = eb ? parseInt(stripTags(eb[2]), 10) : null;
    const h2 = /<h2[^>]*>([\s\S]*?)<\/h2>/.exec(body);
    const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(body);
    const heading = h2 ? stripTags(h2[1]).replace(/\s+/g, ' ').trim() : (h1 ? stripTags(h1[1]).replace(/\s+/g, ' ').trim() : null);
    let num = null;
    if (eyebrow) {
      const m1 = /^(\d{2})\s/.exec(eyebrow); const m2 = /Appendix\s+([A-Z]\d+)/.exec(eyebrow);
      if (m1) num = m1[1]; else if (m2) num = m2[1]; else if (/Cold open/i.test(eyebrow)) num = 'Cold'; else if (/Session\s+\d/.test(eyebrow)) num = '00'; else if (/^Appendix/.test(eyebrow)) num = 'TOC';
    }
    const total_words = words(body);
    /* interaction roots: data-task on the section tag itself or inside */
    const roots = [];
    if (attr(tag, 'data-task')) roots.push({ tagStart: sm.index, tag });
    const rootRe = /<[a-zA-Z0-9]+\b[^>]*\bdata-task="[^"]*"[^>]*>/g; rootRe.lastIndex = 0; let rm;
    const inner = src.slice(sm.index + tag.length, ext.end);
    while ((rm = rootRe.exec(inner))) roots.push({ tagStart: sm.index + tag.length + rm.index, tag: rm[0] });
    const interactions = roots.map(r => {
      const e = r.tagStart === sm.index ? ext : elementExtent(src, r.tagStart);
      const comp = attr(r.tag, 'data-comp');
      return { data_task: attr(r.tag, 'data-task'), data_comp: comp, icap: comp ? (ICAP[comp] || 'unknown-family') : null,
               line: lineOf(src, r.tagStart), line_end: lineOf(src, e.end), words_inside: r.tagStart === sm.index ? null : words(src.slice(e.start, e.end)) };
    });
    /* chips */
    const chips = [];
    const chipRe = /<span\b[^>]*class="conf\s+([hml])"[^>]*>/g; let cm;
    while ((cm = chipRe.exec(body))) {
      const ds = attr(cm[0], 'data-src');
      chips.push({ level: cm[1].toUpperCase(), data_src: ds, resolves: ds ? footerIds.has(ds) : false, line: lineOf(src, sm.index + cm.index) });
    }
    const chipsBy = { H: 0, M: 0, L: 0 }; chips.forEach(c => chipsBy[c.level]++);
    const unresolved = chips.filter(c => !c.resolves);
    const srcKeys = [...new Set(chips.filter(c => c.data_src).map(c => c.data_src))];
    /* verify blocks, svg, src lines, sim badges, hidden panels, markers */
    const verify = [...body.matchAll(/<[a-z]+\b[^>]*class="[^"]*\bverify\b[^"]*"/g)].map(m => lineOf(src, sm.index + m.index));
    const svg = (body.match(/<svg\b/g) || []).length;
    const srcLines = (body.match(/class="(?:src|csrc)\b/g) || []).length;
    const sim = (body.match(/class="sim"/g) || []).length;
    const hidden = (body.match(/class="[^"]*\b(?:hidden|qfb|fbx)\b[^"]*"/g) || []).length;
    const gates = [...body.matchAll(/data-gate="([\w-]+)"/g)].map(m => ({ id: m[1], line: lineOf(src, sm.index + m.index), marked_by_component: markCalls.has(m[1]) }));
    const markers = [...body.matchAll(/\[(UNVERIFIED[^\]]*|NEEDS SOURCE|UNCONFIRMED)\]/g)].map(m => ({ marker: m[0], line: lineOf(src, sm.index + m.index) }));
    const emdash = (body.match(/—|&mdash;/g) || []).length;
    const controls = (body.match(/<(?:button|input|textarea|select)\b/g) || []).length;
    /* exposition runs: split the section body at interaction roots (tagged) and,
       separately, at any interactive control; longest run in words, converted to
       minutes pro rata to the section's allocated minutes (heuristic, M). */
    function runs(splitRe) {
      const parts = body.split(splitRe).map(words);
      return Math.max(0, ...parts);
    }
    const runTagged = interactions.length ? runs(/<[a-zA-Z0-9]+\b[^>]*\bdata-task="[^"]*"[^>]*>/g) : total_words;
    const runControls = runs(/<(?:button|input|textarea|select)\b[^>]*>/g);
    const toMin = w => (mins && total_words) ? +(mins * w / total_words).toFixed(1) : null;
    /* prose words: text outside interaction roots (tagged) */
    let proseSrc = body;
    for (const r of roots.filter(r => r.tagStart !== sm.index).sort((a, b) => b.tagStart - a.tagStart)) {
      const e = elementExtent(src, r.tagStart); proseSrc = proseSrc.slice(0, r.tagStart - sm.index) + ' ' + proseSrc.slice(e.end - sm.index);
    }
    const prose_words = roots.some(r => r.tagStart === sm.index) ? 0 : words(proseSrc);
    sectionTexts.push({ id, text: stripTags(body).replace(/\s+/g, ' ') });
    sections.push({
      id, num, data_nav: nav, eyebrow, heading, is_toc: isToc, is_appendix: isApx, tier: attr(tag, 'data-tier'), insert_after: attr(tag, 'data-insert-after'),
      nav_matches_heading: !!(nav && heading) && nav.trim().toLowerCase() === heading.trim().toLowerCase(),
      nav_contained_in_heading: !!(nav && heading) && heading.toLowerCase().includes(nav.replace(/^[AB]\d+\s*·\s*/, '').trim().toLowerCase()),
      timing_row_min: eyebrow && timing[eyebrow] ? timing[eyebrow].min : null,
      line_start: lineOf(src, sm.index), line_end: lineOf(src, ext.end), bytes: Buffer.byteLength(body, 'utf8'),
      allocated_min: mins, words: total_words, prose_words, words_per_min: mins ? +(total_words / mins).toFixed(1) : null,
      prose_words_per_min: mins ? +(prose_words / mins).toFixed(1) : null,
      interactions_count: interactions.length, interactions, families: [...new Set(interactions.map(i => i.data_comp).filter(Boolean))],
      icap: interactions.reduce((a, i) => { if (i.icap) a[i.icap] = (a[i.icap] || 0) + 1; return a; }, {}),
      chips_total: chips.length, chips: chipsBy, chips_per_100_words: total_words ? +(100 * chips.length / total_words).toFixed(2) : null,
      chips_unresolved: unresolved, source_keys: srcKeys, sources_count: srcKeys.length, src_lines: srcLines, sim_badges: sim,
      verify_blocks: verify.length, verify_lines: verify, svg_charts: svg, hidden_answer_panels: hidden, interactive_controls: controls,
      gates, markers, em_dashes: emdash,
      exposition: { longest_run_words_tagged_split: runTagged, longest_run_min_tagged_split: toMin(runTagged),
                    longest_run_words_control_split: runControls, longest_run_min_control_split: toMin(runControls),
                    method: 'M: words between interaction roots (tagged) / between any interactive control, pro rata to allocated minutes' },
    });
  }
  const terms = termCensus(sectionTexts);
  for (const s of sections) s.undefined_terms_first_used_here = terms.filter(t => t.first_use_section === s.id && !t.defined_within_40_words).map(t => t.term);

  /* norms over lesson sections (exclude TOC) */
  const lessonSecs = sections.filter(s => !s.is_toc && s.allocated_min);
  const med = a => { const b = [...a].sort((x, y) => x - y); const n = b.length; return n ? (n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2) : null; };
  const rng = a => a.length ? [Math.min(...a), Math.max(...a)] : null;
  const stat = a => ({ median: med(a), range: rng(a), mean: a.length ? +(a.reduce((x, y) => x + y, 0) / a.length).toFixed(2) : null });
  const icapDist = lessonSecs.reduce((a, s) => { for (const k in s.icap) a[k] = (a[k] || 0) + s.icap[k]; return a; }, { P: 0, A: 0, C: 0, I: 0 });
  const norms = {
    sections: lessonSecs.length, core_sections: lessonSecs.filter(s => !s.is_appendix).length,
    interactions_per_section: stat(lessonSecs.map(s => s.interactions_count)),
    chips_per_100_words: stat(lessonSecs.map(s => s.chips_per_100_words || 0)),
    chips_per_section: stat(lessonSecs.map(s => s.chips_total)),
    sources_per_section: stat(lessonSecs.map(s => s.sources_count)),
    words_per_min: stat(lessonSecs.map(s => s.words_per_min)),
    prose_words_per_min: stat(lessonSecs.map(s => s.prose_words_per_min)),
    exposition_run_min_tagged: stat(lessonSecs.map(s => s.exposition.longest_run_min_tagged_split || 0)),
    exposition_run_min_control: stat(lessonSecs.map(s => s.exposition.longest_run_min_control_split || 0)),
    icap_distribution: icapDist, distinct_families: [...new Set(lessonSecs.flatMap(s => s.families))].length,
    sections_with_zero_chips: lessonSecs.filter(s => s.chips_total === 0).map(s => s.id),
    sections_with_zero_interactions: lessonSecs.filter(s => s.interactions_count === 0).map(s => s.id),
  };
  /* consecutive-family repeats, in document order and in core-only order */
  const repeats = (list) => list.map((s, i) => i && s.families[0] && s.families[0] === list[i - 1].families[0] ? `${list[i - 1].id}->${s.id}:${s.families[0]}` : null).filter(Boolean);
  const coreOrder = lessonSecs.filter(s => !s.is_appendix);
  /* reading order: appendix sections are inserted after data-insert-after at runtime */
  const reading = [];
  for (const s of coreOrder) { reading.push(s); for (const a of lessonSecs.filter(x => x.is_appendix && x.insert_after === s.id)) reading.push(a); }

  const file_bytes = Buffer.byteLength(src, 'utf8');
  return {
    file, file_bytes, file_lines: src.split('\n').length, generated_by: 'scripts/audit/section_profile.mjs (read-only)',
    methods: {
      words: 'validate_lesson.py C1 token rule over section source with script/style/comments stripped (static)',
      prose_words: 'words outside tagged interaction roots (static)',
      chips: '.conf span with h/m/l class inside the section; resolves = data-src present in footer <li id>',
      icap: 'component-bank.md v2.0 family index', exposition: 'M heuristic, see each section',
      terms: 'M heuristic: capitalised acronyms and statute citations, file-level first use, defined if a parenthetical, appositive, copula, or initials expansion sits within 40 words',
    },
    timing: { rows: timing, segments_sum: timingSum, allocated_cell: alloc, eyebrow_sum_lesson_sections: lessonSecs.reduce((a, s) => a + s.allocated_min, 0) },
    consecutive_family_repeats: { document_order: repeats(lessonSecs), core_only_order: repeats(coreOrder), reading_order_all_tiers: repeats(reading) },
    reading_order_all_tiers: reading.map(s => s.id),
    norms, sections, terms,
    footer_source_ids: [...footerIds],
  };
}

/* ---------- optional DOM pass ---------- */
function domPass(file, prof) {
  let JSDOM = null;
  try { JSDOM = require('jsdom').JSDOM; } catch (_) {
    try { if (process.env.JSDOM_PATH) JSDOM = require(join(process.env.JSDOM_PATH, 'jsdom')).JSDOM; } catch (_2) { /* none */ }
  }
  if (!JSDOM) { prof.dom = { mode: 'static-only', note: 'jsdom not resolvable; rendered counts not computed' }; return; }
  const src = readFileSync(file, 'utf8');
  const errors = [];
  const dom = new JSDOM(src, { runScripts: 'dangerously', resources: undefined, pretendToBeVisual: true });
  dom.window.addEventListener('error', e => errors.push(String(e.error || e.message)));
  const doc = dom.window.document;
  const byId = {};
  for (const sec of doc.querySelectorAll('section')) {
    const t = (sec.textContent || '').replace(/\s+/g, ' ');
    byId[sec.id] = { rendered_words: (t.match(/[A-Za-z][A-Za-z'-]*/g) || []).length,
                     rendered_chips: sec.querySelectorAll('.conf').length,
                     rendered_controls: sec.querySelectorAll('button,input,textarea,select').length,
                     rendered_hidden_panels: sec.querySelectorAll('.hidden,.qfb,.fbx').length };
  }
  for (const s of prof.sections) s.dom = byId[s.id] || null;
  prof.dom = { mode: 'jsdom', script_errors: errors, body_class_at_load: doc.body.className };
}

const args = process.argv.slice(2);
let outDir = 'docs/audits/profiles';
const files = [];
for (let i = 0; i < args.length; i++) { if (args[i] === '--out') outDir = args[++i]; else files.push(args[i]); }
if (!files.length) { console.error('usage: node scripts/audit/section_profile.mjs <lesson.html> [...] [--out DIR]'); process.exit(1); }
mkdirSync(outDir, { recursive: true });
for (const f of files) {
  const prof = profile(f);
  domPass(f, prof);
  const name = basename(dirname(resolve(f))) + '.json';
  const out = join(outDir, name);
  writeFileSync(out, JSON.stringify(prof, null, 2) + '\n');
  const n = prof.norms;
  console.log(`${f}: ${prof.file_bytes} bytes, ${prof.sections.length} sections (${n.sections} lesson, ${n.core_sections} core); timing ${prof.timing.segments_sum}/${prof.timing.allocated_cell}; dom=${prof.dom.mode}; wrote ${out}`);
  console.log(`  interactions/section median ${n.interactions_per_section.median} range ${n.interactions_per_section.range}; chips/100w median ${n.chips_per_100_words.median}; sources/section median ${n.sources_per_section.median}; prose w/min median ${n.prose_words_per_min.median}; run(min, tagged) max ${n.exposition_run_min_tagged.range && n.exposition_run_min_tagged.range[1]}; ICAP ${JSON.stringify(n.icap_distribution)}`);
  console.log(`  consecutive repeats: doc ${JSON.stringify(prof.consecutive_family_repeats.document_order)} core ${JSON.stringify(prof.consecutive_family_repeats.core_only_order)} reading ${JSON.stringify(prof.consecutive_family_repeats.reading_order_all_tiers)}`);
}
