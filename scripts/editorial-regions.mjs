#!/usr/bin/env node
/**
 * editorial-regions.mjs — the region classifier EDITORIAL.md's Part A depends on.
 *
 * EDITORIAL.md, "Region classification": every Part A rule names the regions it
 * inspects, and a rule expressed per character will be wrong. This module is the
 * one place that decides, for every character offset in a file, which of R1-R11
 * it belongs to. Nothing else in the checker is allowed to guess.
 *
 * The precedent is verify-migration.mjs check 20 — slice out the CASE span and
 * assert only on what remains. This generalises it to eleven regions.
 *
 * R1 is a RESIDUAL, not a positive match: it is what survives after every other
 * region has been claimed.
 *
 * Marking runs highest priority first and never overwrites an earlier claim, so
 * a nested span keeps the outer region. Order:
 *
 *     R6  injected CASE span        (owned by verify-case.mjs; read, never assert)
 *     R10 captured transcripts      (verbatim third-party output; Class A2)
 *     R11 byte-shared boilerplate   (excluded from per-file consistency rules)
 *     R4  CSS                       (owned by verify-style.mjs)
 *     R2  script                    (student-visible only inside quoted literals)
 *     R5  HTML comment
 *     R7  footer source entry
 *     R8  source note
 *     R9  assigned-reading block
 *     R3  attribute value / tag markup
 *     R1  everything left
 *
 * KNOWN LIMITATION, recorded rather than hidden. EDITORIAL.md defines R2 as a
 * script literal "that reaches the DOM". Deciding that reliably needs data-flow
 * analysis this module does not do, so EVERY quoted literal inside <script> is
 * treated as R2-visible. The over-inclusion is one-directional: a rule scoped to
 * R2 may inspect a string that never renders. It will never miss one that does.
 */
import { readFileSync } from 'node:fs';

export const REGIONS = {
  R1: 'body prose',
  R2: 'script string literal',
  R3: 'attribute value',
  R4: 'CSS',
  R5: 'HTML or JS comment',
  R6: 'injected span',
  R7: 'footer source entry',
  R8: 'source note',
  R9: 'assigned-reading block',
  R10: 'captured transcript',
  R11: 'byte-shared boilerplate',
};

const ID = { R1: 1, R2: 2, R3: 3, R4: 4, R5: 5, R6: 6, R7: 7, R8: 8, R9: 9, R10: 10, R11: 11 };
const NAME = Object.fromEntries(Object.entries(ID).map(([k, v]) => [v, k]));

/**
 * Find the end offset of the element opened by the tag at `openStart`.
 * Counts nested opens of the same tag so a <div> with children closes correctly.
 * Returns the offset just past the matching close tag, or -1.
 */
function matchElement(text, openStart, tag) {
  const open = new RegExp(`<${tag}\\b`, 'gi');
  const close = new RegExp(`</${tag}\\s*>`, 'gi');
  let depth = 0;
  let i = openStart;
  for (;;) {
    open.lastIndex = i;
    close.lastIndex = i;
    const o = open.exec(text);
    const c = close.exec(text);
    if (!c) return -1;
    if (o && o.index < c.index) { depth++; i = o.index + o[0].length; continue; }
    depth--;
    i = c.index + c[0].length;
    if (depth === 0) return i;
  }
}

/** Every quoted string literal inside a <script> body, as [start, end) offsets. */
function scriptLiterals(text, scriptSpans) {
  const out = [];
  for (const [s, e] of scriptSpans) {
    const body = text.slice(s, e);
    // Skip regex literals and comments crudely; a mis-skip only over-includes.
    const rx = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g;
    let m;
    while ((m = rx.exec(body))) out.push([s + m.index, s + m.index + m[0].length]);
  }
  return out;
}

/**
 * Classify a file.
 *
 * Returns:
 *   at        Uint8Array, one region id per character offset
 *   regionOf  (offset) => 'R1'.. 'R11'
 *   spans     { R6: [[s,e],...], R11: [...], ... } for the regions worth showing
 *   literals  [[s,e],...] every quoted literal inside <script> (see R2 note)
 *   mask      (regions) => a same-length string with everything outside those
 *             regions replaced by spaces, so offsets and line numbers stay exact
 *   lineAt    (offset) => 1-based line number
 */
export function classify(text) {
  const at = new Uint8Array(text.length); // 0 = unclaimed
  const spans = {};
  const claim = (s, e, r) => {
    if (s < 0 || e <= s) return;
    (spans[r] ||= []).push([s, e]);
    const id = ID[r];
    for (let i = s; i < Math.min(e, text.length); i++) if (at[i] === 0) at[i] = id;
  };

  /* R6 — the injected CASE span, sentinel to sentinel, inclusive. */
  {
    const rx = /<!--\s*CASE:BEGIN[\s\S]*?CASE:END[^>]*-->/g;
    let m; while ((m = rx.exec(text))) claim(m.index, m.index + m[0].length, 'R6');
  }

  /* R10 — captured transcripts: the base: string literals in the PROBE array.
     EDITORIAL.md Class A2. Byte-sensitive; never in scope for anything. */
  {
    const rx = /base\s*:\s*(['"])(?:[^\\]|\\.)*?\1/gs;
    let m; while ((m = rx.exec(text))) claim(m.index, m.index + m[0].length, 'R10');
  }

  /* R11 — byte-shared boilerplate. EDITORIAL.md names four sub-kinds; see the
     note in editorial-baseline.json about which two carry the population. */
  {
    for (const cls of ['ritual', 'apxback']) {
      const rx = new RegExp(`<div class="${cls}"`, 'g');
      let m;
      while ((m = rx.exec(text))) {
        const end = matchElement(text, m.index, 'div');
        if (end > 0) claim(m.index, end, 'R11');
      }
    }
    /* The live-model console fences, byte-identical across sessions 0.1 and 1. */
    for (const fence of ['LMSTYLE', 'LMBOX', 'LM']) {
      const rx = new RegExp(`${fence}:BEGIN[\\s\\S]*?${fence}:END`, 'g');
      let m; while ((m = rx.exec(text))) claim(m.index, m.index + m[0].length, 'R11');
    }
  }

  /* R4 — CSS. Owned by verify-style.mjs; never in scope. */
  {
    const rx = /<style\b[^>]*>[\s\S]*?<\/style\s*>/gi;
    let m; while ((m = rx.exec(text))) claim(m.index, m.index + m[0].length, 'R4');
  }

  /* R2 — script. The whole element is claimed so script CODE is never R1; the
     student-visible part is the literals, returned separately. */
  const scriptSpans = [];
  {
    const rx = /<script\b[^>]*>[\s\S]*?<\/script\s*>/gi;
    let m; while ((m = rx.exec(text))) { claim(m.index, m.index + m[0].length, 'R2'); scriptSpans.push([m.index, m.index + m[0].length]); }
  }

  /* R5 — HTML comments not already claimed as R6. */
  {
    const rx = /<!--[\s\S]*?-->/g;
    let m; while ((m = rx.exec(text))) claim(m.index, m.index + m[0].length, 'R5');
  }

  /* R7 — footer source entries. */
  {
    const rx = /<li\b[^>]*\bid="src-[^"]*"[^>]*>/g;
    let m;
    while ((m = rx.exec(text))) {
      const end = matchElement(text, m.index, 'li');
      if (end > 0) claim(m.index, end, 'R7');
    }
  }

  /* R8 — source notes. */
  {
    const rx = /<(span|p|div)\b[^>]*\bclass="(?:[^"]*\b)?(?:src|csrc)(?:\b[^"]*)?"[^>]*>/g;
    let m;
    while ((m = rx.exec(text))) {
      const end = matchElement(text, m.index, m[1]);
      if (end > 0) claim(m.index, end, 'R8');
    }
  }

  /* R9 — assigned-reading blocks. */
  {
    const rx = /<div\b[^>]*\bclass="(?:[^"]*\b)?wolf(?:\b[^"]*)?"[^>]*>/g;
    let m;
    while ((m = rx.exec(text))) {
      const end = matchElement(text, m.index, 'div');
      if (end > 0) claim(m.index, end, 'R9');
    }
  }

  /* R3 — tag markup, which is where attribute values live. */
  {
    const rx = /<[a-zA-Z!/][^>]*>/g;
    let m; while ((m = rx.exec(text))) claim(m.index, m.index + m[0].length, 'R3');
  }

  /* R1 — the residual. */
  for (let i = 0; i < at.length; i++) if (at[i] === 0) at[i] = ID.R1;

  const lineStarts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') lineStarts.push(i + 1);
  const lineAt = (off) => {
    let lo = 0, hi = lineStarts.length - 1;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (lineStarts[mid] <= off) lo = mid; else hi = mid - 1; }
    return lo + 1;
  };

  /* Blank everything outside the wanted regions, preserving length and newlines
     so an offset into the mask is still an offset into the file. */
  const mask = (regions) => {
    const want = new Set(regions.map((r) => ID[r]));
    const out = new Array(text.length);
    for (let i = 0; i < text.length; i++) out[i] = want.has(at[i]) ? text[i] : (text[i] === '\n' ? '\n' : ' ');
    return out.join('');
  };

  return {
    at,
    spans,
    literals: scriptLiterals(text, scriptSpans),
    regionOf: (off) => NAME[at[off]],
    lineAt,
    mask,
    text,
  };
}

/**
 * authoredProse — the population A8 and A9 count over. EDITORIAL.md defines it
 * once under "authoredProse — the population, defined once".
 *
 * Source notes (R8) and reading blocks (R9) are IN; footer entries (R7) are OUT.
 * EDITORIAL.md's literal phrase "R1 with R2-R11 removed" would also drop R8 and
 * R9, and does NOT reproduce the declared A8 baseline. This does. The population
 * had been under-specified three times before it was named; it is named here and
 * in editorial-baseline.json so it cannot drift again.
 */
export function authoredProse(c) {
  return c.mask(['R1', 'R8', 'R9']);
}

/**
 * quotationScope — A10's population, DELIBERATELY wider than authoredProse.
 * A quotation guard has to reach footer entries and script literals, so it does
 * not share A8's population. Stated here because the difference looks like a bug
 * until you know it is a decision.
 */
export function quotationScope(c) {
  return c.mask(['R1', 'R2', 'R7', 'R8', 'R9']);
}

export function classifyFile(path) {
  return classify(readFileSync(path, 'utf8'));
}

export default { classify, classifyFile, authoredProse, quotationScope, REGIONS };
