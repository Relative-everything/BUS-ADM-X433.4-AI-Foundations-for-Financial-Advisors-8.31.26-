#!/usr/bin/env node
/**
 * ui-audit.mjs: what the page-local CSS of the twelve served pages holds.
 *
 *   node docs/design/meridian/ui-audit.mjs                  the two tables
 *   node docs/design/meridian/ui-audit.mjs --root <dir>     audit another tree (tests)
 *   node docs/design/meridian/ui-audit.mjs --json <file>    also write every rule and every off-token value
 *   node docs/design/meridian/ui-audit.mjs --list           print each off-token value with its page and selector
 *   node docs/design/meridian/ui-audit.mjs --strict         exit 1 if any off-token count is above zero
 *
 * Table 1 classifies every page-local rule (css-rules.mjs says what page-local means):
 *   identical   same at-rule context, selector and declarations as a rule in the STYLE fence
 *   variation   same context and selector as a fence rule, different declarations
 *   shared      not in the fence; the same rule text is on two or more pages
 *   unique      on this page only
 * Table 2 counts off-token values in page-local CSS, per page:
 *   colour      a literal colour: #hex, rgb(), rgba(), hsl(), hsla(), or the keywords white and black
 *               as a whole value of a colour property (custom-property definitions are counted too:
 *               a page token built from a literal is still a literal)
 *   size        a font-size carrying a px, pt or rem length that is not one of the eight steps
 *               (12.5, 14, 16, 18, 21, 26, 34, 46 px), including inside clamp(); em and % are relative
 *               and are reported separately as rel
 *   radius      a border-radius length other than 0, 4px, 8px, 999px, 50% or a --radius-* token
 *   monolabel   a rule that sets the code face together with letter-spacing or uppercase
 *   svg         (not counted as off-token) a size on a rule that styles text inside an SVG drawing, listed
 *               in svg-text-rules.json: drawing units that scale with the figure, not screen pixels
 * The fence and inline style attributes are counted too and printed on their own lines, because the
 * fence is the shared sheet's business and inline styles are markup, not page-local CSS.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { REPO, HERE, pages, localRules, fenceRules, splitDecls } from './css-rules.mjs';

const argv = process.argv.slice(2);
const opt = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const ROOT = opt('--root') ? resolve(opt('--root')) : REPO;
const STEPS = [12.5, 14, 16, 18, 21, 26, 34, 46];
const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\([^)]*\)/g;
const COLOR_PROP = /^(color|background|background-color|border(-(top|right|bottom|left))?(-color)?|outline(-color)?|fill|stroke|box-shadow|text-shadow|caret-color|accent-color|text-decoration(-color)?|column-rule(-color)?|stop-color|flood-color|--.*)$/;

export function offToken(sel, decl) {
  const out = [];
  const ds = splitDecls(decl);
  let mono = false, lab = false;
  for (const [p, v] of ds) {
    if (COLOR_PROP.test(p) || /gradient\(/.test(v)) {
      for (const m of v.match(COLOR_RE) || []) out.push({ kind: 'colour', prop: p, value: m });
      if (!p.startsWith('--') && /^(white|black)$/i.test(v.replace(/!important/, '').trim())) out.push({ kind: 'colour', prop: p, value: v });
      else if (!p.startsWith('--')) for (const m of v.match(/(?<![-\w])(white|black)(?![-\w(])/gi) || []) out.push({ kind: 'colour', prop: p, value: m });
    }
    if (p === 'font-size' || p === 'font') {
      const val = p === 'font' ? (v.split('/')[0] || '') : v;
      for (const m of val.matchAll(/(?<![\w.-])([0-9]*\.?[0-9]+)(px|pt|rem)\b/g)) {
        const px = m[2] === 'rem' ? +m[1] * 16 : m[2] === 'pt' ? +m[1] * 4 / 3 : +m[1];
        if (p === 'font' && m[2] === 'px' && /\/\s*[0-9.]+px/.test(v) && false) continue;
        if (!STEPS.some(s => Math.abs(s - px) < 0.01)) out.push({ kind: 'size', prop: p, value: m[0] });
      }
      if (p === 'font-size' && /(?<![\w.-])[0-9.]+(em|%)/.test(v) && !/rem/.test(v.replace(/[0-9.]+rem/g, ''))) out.push({ kind: 'rel', prop: p, value: v });
    }
    if (/^border(-(top|bottom)-(left|right))?-radius$/.test(p)) {
      for (const tok of v.replace(/var\([^)]*\)/g, ' ').split(/[\s/]+/).filter(Boolean)) {
        if (/^(0|0px|4px|8px|999px|50%|inherit|!important)$/.test(tok)) continue;
        out.push({ kind: 'radius', prop: p, value: tok });
      }
    }
    if ((p === 'font-family' || p === 'font') && /JetBrains Mono|--font-code|monospace/.test(v)) mono = true;
    if (p === 'letter-spacing' && !/^(0|normal)/.test(v)) lab = true;
    if (p === 'text-transform' && /uppercase/.test(v)) lab = true;
  }
  if (mono && lab) out.push({ kind: 'monolabel', prop: 'font-family', value: sel });
  return out;
}

/* rules that size text inside an SVG drawing: drawing units, not screen pixels (restore-svg-sizes.mjs) */
const SVGF = join(HERE, 'svg-text-rules.json'), SVGR = existsSync(SVGF) ? JSON.parse(readFileSync(SVGF, 'utf8')) : {};
const data = {}, where = new Map();
for (const p of pages(ROOT)) {
  const html = readFileSync(join(ROOT, p), 'utf8');
  const L = localRules(html).filter(r => r.kind === 'rule' || r.kind === 'at');
  const F = fenceRules(html).filter(r => r.kind === 'rule' || r.kind === 'at');
  const inline = [...html.replace(/<script\b[\s\S]*?<\/script>/gi, '').matchAll(/\sstyle="([^"]*)"/g)].map(m => m[1]);
  data[p] = { html, L, F, inline };
  for (const r of L) { if (!where.has(r.key)) where.set(r.key, new Set()); where.get(r.key).add(p); }
}
const rows = [], offRows = [], all = [];
const tot = { rules: 0, bytes: 0, identical: 0, variation: 0, shared: 0, unique: 0, sharedBytes: 0, onlyBytes: 0 };
const KINDS = ['colour', 'size', 'radius', 'monolabel', 'rel', 'svg'];
const distinctVar = new Set();
for (const p of pages(ROOT)) {
  const { html, L, F, inline } = data[p];
  const fk = new Set(F.map(r => r.key)), fs = new Set(F.map(r => r.skey));
  const c = { identical: 0, variation: 0, shared: 0, unique: 0 }; let bytes = 0;
  const off = Object.fromEntries(KINDS.map(k => [k, 0])), offF = { ...off }, offI = { ...off };
  for (const r of L) {
    const cls = fk.has(r.key) ? 'identical' : fs.has(r.skey) ? 'variation' : where.get(r.key).size > 1 ? 'shared' : 'unique';
    r.cls = cls; c[cls]++; const b = r.end - r.start; bytes += b;
    if (cls === 'variation') distinctVar.add(r.key);
    if (cls === 'shared' || cls === 'unique') { tot.onlyBytes += b; if (cls === 'shared') tot.sharedBytes += b; }
    const o = r.kind === 'rule' ? offToken(r.sel, r.decl) : offToken(r.sel, r.decl.replace(/[^{}]*\{/g, ';').replace(/\}/g, ';'));
    const svgRule = (SVGR[p] || []).includes(r.skey);
    for (const x of o) { if (svgRule && (x.kind === 'size' || x.kind === 'rel')) x.kind = 'svg'; off[x.kind]++; all.push({ page: p, where: 'local', ctx: r.ctx.join(' '), sel: r.sel, ...x }); }
    r.line = html.slice(0, r.start).split('\n').length;
  }
  for (const r of F) if (r.kind === 'rule' && r.sel !== ':root') for (const x of offToken(r.sel, r.decl)) offF[x.kind]++;
  for (const s of inline) for (const x of offToken('[style]', s)) { offI[x.kind]++; all.push({ page: p, where: 'inline', sel: '[style]', ...x }); }
  rows.push([p, L.length, c.identical, c.variation, c.shared, c.unique, (bytes / 1024).toFixed(1)]);
  offRows.push([p, ...KINDS.map(k => off[k]), '|', ...KINDS.slice(0, 4).map(k => offI[k]), '|', ...KINDS.slice(0, 4).map(k => offF[k])]);
  tot.rules += L.length; tot.bytes += bytes; for (const k of Object.keys(c)) tot[k] += c[k];
}
const table = (head, rs) => { const w = head.map((h, i) => Math.max(String(h).length, ...rs.map(r => String(r[i]).length)));
  const line = r => r.map((x, i) => i ? String(x).padStart(w[i]) : String(x).padEnd(w[i])).join('  ');
  console.log(line(head)); for (const r of rs) console.log(line(r)); };
console.log('Page-local rules, by class');
table(['page', 'rules', 'identical', 'variation', 'shared', 'unique', 'KB'], [...rows, ['TOTAL', tot.rules, tot.identical, tot.variation, tot.shared, tot.unique, (tot.bytes / 1024).toFixed(1)]]);
console.log('distinct variations: ' + distinctVar.size + '   page-only bytes repeated on 2+ pages: ' + (tot.onlyBytes ? Math.round(100 * tot.sharedBytes / tot.onlyBytes) : 0) + '%');
console.log('\nOff-token values: page-local CSS | inline style attributes | the fence (after :root)');
const sum = offRows[0].map((_, i) => i === 0 ? 'TOTAL' : offRows[0][i] === '|' ? '|' : offRows.reduce((a, r) => a + r[i], 0));
table(['page', 'colour', 'size', 'radius', 'monolabel', 'rel', 'svg', '|', 'colour', 'size', 'radius', 'monolabel', '|', 'colour', 'size', 'radius', 'monolabel'], [...offRows, sum]);
if (argv.includes('--list')) for (const x of all) console.log([x.page, x.where, x.kind, x.sel.slice(0, 70), x.prop + ':' + x.value].join('\t'));
if (opt('--json')) writeFileSync(opt('--json'), JSON.stringify({ rules: Object.fromEntries(pages(ROOT).map(p => [p, data[p].L.map(r => ({ cls: r.cls, kind: r.kind, ctx: r.ctx, sel: r.sel, decl: r.decl, line: r.line }))])), off: all }, null, 1));
const localOff = sum.slice(1, 5).reduce((a, b) => a + b, 0);
console.log('\nsummary: ' + tot.rules + ' page-local rules; ' + localOff + ' off-token value(s) in page-local CSS');
process.exit(argv.includes('--strict') && localOff ? 1 : 0);
