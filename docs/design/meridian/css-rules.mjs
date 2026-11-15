/**
 * css-rules.mjs: the shared reader for the Meridian tools (ui-audit, consolidate).
 *
 * pages()            the twelve served pages, repo-relative
 * fenceCss(html)     the text between STYLE:BEGIN and STYLE:END
 * localRegions(html) every stretch of page-local CSS as {start,end} offsets into the file:
 *                    each <style> body that is not inside the CASE span, minus the STYLE
 *                    fence and the LMSTYLE fence (both are generated or versioned regions)
 * parse(css, base)   flat list of rules, each {kind, ctx, sel, decl, key, start, end}
 *                      kind 'rule'  a style rule; sel and decl normalised
 *                      kind 'at'    an opaque at-rule with a block (@keyframes, @font-face, @page)
 *                    ctx is the chain of enclosing conditional at-rules (@media ...), normalised.
 *                    start/end are offsets (base + position) of the whole rule text.
 *                    Conditional at-rules also come back as {kind:'group', start, end, bodyStart, bodyEnd}.
 * No dependency: a small tokenizer that respects comments, strings and parentheses.
 */
import { readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO = resolve(HERE, '..', '..', '..');
export const BEGIN = '/* STYLE:BEGIN managed-by=restyle_sweep.py */';
export const END = '/* STYLE:END */';

export function pages(root = REPO) {
  return ['index.html',
    ...readdirSync(root).filter(d => /^session-/.test(d)).sort().map(d => d + '/index.html'),
    ...readdirSync(join(root, 'cases')).filter(f => f.endsWith('.html')).sort().map(f => 'cases/' + f)];
}

export function fenceCss(html) {
  const a = html.indexOf(BEGIN), b = html.indexOf(END);
  if (a < 0 || b < 0) throw new Error('no STYLE fence');
  return html.slice(a + BEGIN.length, b);
}

export function localRegions(html) {
  const out = [];
  const caseA = html.indexOf('<!-- CASE:BEGIN'), caseB = html.indexOf('<!-- CASE:END');
  const re = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  for (let m; (m = re.exec(html));) {
    const bodyStart = m.index + m[0].indexOf('>') + 1, bodyEnd = bodyStart + m[1].length;
    if (caseA >= 0 && bodyStart > caseA && bodyStart < caseB) continue;
    /* a "<style>" spelled inside a script string is not a style element; comments are blanked first
       because one page names "<script src>" in a comment */
    const before = html.slice(0, m.index).replace(/<!--[\s\S]*?-->/g, '');
    if ((before.match(/<script\b/gi) || []).length > (before.match(/<\/script>/gi) || []).length) continue;
    let holes = [];
    const body = html.slice(bodyStart, bodyEnd);
    const sA = body.indexOf(BEGIN), sB = body.indexOf(END);
    if (sA >= 0 && sB >= 0) holes.push([bodyStart + sA, bodyStart + sB + END.length]);
    const lm = /\/\* LMSTYLE:BEGIN[\s\S]*?\/\* LMSTYLE:END[^*]*\*\//.exec(body);
    if (lm) holes.push([bodyStart + lm.index, bodyStart + lm.index + lm[0].length]);
    holes.sort((x, y) => x[0] - y[0]);
    let p = bodyStart;
    for (const [a, b] of holes) { if (a > p) out.push({ start: p, end: a }); p = b; }
    if (bodyEnd > p) out.push({ start: p, end: bodyEnd });
  }
  return out;
}

const ws = s => s.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\s+/g, ' ').trim();
export const normSel = s => ws(s).replace(/\s*([,>+~])\s*/g, '$1').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
export function splitDecls(body) {
  const out = []; let depth = 0, q = null, cur = '';
  const s = body.replace(/\/\*[\s\S]*?\*\//g, ' ');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { cur += c; if (c === '\\') { cur += s[++i] || ''; } else if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; cur += c; continue; }
    if (c === '(') depth++; else if (c === ')') depth--;
    if (c === ';' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += c;
  }
  out.push(cur);
  return out.map(d => d.trim()).filter(Boolean).map(d => {
    const i = d.indexOf(':'); if (i < 0) return [d, ''];
    const prop = d.slice(0, i).trim(); const val = d.slice(i + 1).trim().replace(/\s+/g, ' ').replace(/\s*,\s*/g, ',').replace(/\s*!important/, '!important');
    return [prop.startsWith('--') ? prop : prop.toLowerCase(), val];
  });
}
export const normDecl = body => splitDecls(body).map(([p, v]) => p + ':' + v).join(';');

/* find the matching close brace from the position just after an open brace */
function closeOf(css, i) {
  let depth = 1, q = null;
  for (; i < css.length; i++) {
    const c = css[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '/' && css[i + 1] === '*') { const e = css.indexOf('*/', i + 2); i = e < 0 ? css.length : e + 1; continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}

export function parse(css, base = 0, ctx = []) {
  const out = []; let i = 0;
  while (i < css.length) {
    /* skip whitespace and comments between rules */
    const lead = /^(?:\s+|\/\*[\s\S]*?\*\/)+/.exec(css.slice(i));
    if (lead) { i += lead[0].length; continue; }
    /* read a prelude up to { or ; */
    let j = i, q = null, depth = 0;
    for (; j < css.length; j++) {
      const c = css[j];
      if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
      if (c === '/' && css[j + 1] === '*') { const e = css.indexOf('*/', j + 2); j = e < 0 ? css.length : e + 1; continue; }
      if (c === '"' || c === "'") { q = c; continue; }
      if (c === '(') depth++; else if (c === ')') depth--;
      if ((c === '{' || c === ';') && depth === 0) break;
    }
    if (j >= css.length) { if (css.slice(i).trim()) out.push({ kind: 'junk', start: base + i, end: base + css.length, text: css.slice(i) }); break; }
    const prelude = css.slice(i, j);
    if (css[j] === ';') { out.push({ kind: 'stmt', ctx, sel: ws(prelude), decl: '', start: base + i, end: base + j + 1 }); i = j + 1; continue; }
    const k = closeOf(css, j + 1);
    if (k < 0) throw new Error('unbalanced braces after: ' + prelude.slice(0, 80));
    const body = css.slice(j + 1, k), p = ws(prelude);
    if (/^@(media|supports|container|layer|scope)\b/i.test(p)) {
      const c2 = [...ctx, p.replace(/\s*([:(),])\s*/g, '$1')];
      out.push({ kind: 'group', ctx, sel: c2[c2.length - 1], start: base + i, end: base + k + 1, bodyStart: base + j + 1, bodyEnd: base + k });
      out.push(...parse(body, base + j + 1, c2));
    } else if (p.startsWith('@')) {
      out.push({ kind: 'at', ctx, sel: p, decl: ws(body).replace(/\s*([{};:,])\s*/g, '$1'), start: base + i, end: base + k + 1 });
    } else {
      if (body.replace(/\/\*[\s\S]*?\*\//g, '').includes('{')) throw new Error('nested rule not supported: ' + p.slice(0, 80));
      out.push({ kind: 'rule', ctx, sel: normSel(prelude), decl: normDecl(body), start: base + i, end: base + k + 1 });
    }
    i = k + 1;
  }
  for (const r of out) if (r.kind === 'rule' || r.kind === 'at') { r.skey = r.ctx.join(' ') + ' | ' + r.sel; r.key = r.skey + ' {' + r.decl + '}'; }
  return out;
}

/* every page-local rule of a page, in source order, offsets into the file */
export function localRules(html) {
  const out = [];
  for (const reg of localRegions(html)) out.push(...parse(html.slice(reg.start, reg.end), reg.start));
  return out;
}
export const fenceRules = html => { const a = html.indexOf(BEGIN) + BEGIN.length; return parse(fenceCss(html), a); };
