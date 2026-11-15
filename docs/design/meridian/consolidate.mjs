#!/usr/bin/env node
/**
 * consolidate.mjs: the step 1 editor. Moves page-local CSS towards one shared source without
 * changing what any page computes to. It only ever touches page-local CSS (css-rules.mjs says what
 * that is) and the shared sheets in assets/; the STYLE fence changes only through the sweep.
 *
 *   node consolidate.mjs identical [--root dir] [--write] [--report file.json]
 *        delete each page-local rule identical to a fence rule, where that is safe
 *   node consolidate.mjs variations [--root dir] --out file.json
 *        list the distinct page-local rules that share context and selector with a fence rule
 *   node consolidate.mjs apply-variations --answers file.json [--root dir] [--write]
 *        answers: [{skey, decl, action:"drop"|"keep"|"trim"}]. drop deletes the page rule (the page
 *        takes the fence's look); trim rewrites it to only the declarations that differ from the fence
 *   node consolidate.mjs promote --assets dir [--root dir] [--write] [--report file.json] [--skip file.json]
 *        move each rule that is identical on two or more pages into assets/components.css, where safe
 *
 * SAFE. Deleting a duplicate, or moving a rule into the fence, moves that rule EARLIER in the
 * cascade. That changes nothing unless a rule in between has the same specificity, sets one of the
 * same properties to something else, and can match the same element. This script finds every such
 * pair in a real browser (specificity per selector, longhands expanded by the engine, co-matching
 * tested against the page's own DOM with dynamic pseudo-classes removed, plus a static test for
 * state classes no element carries yet: same subject, a shared class, id or tag) and leaves the
 * rule where it is, reporting it as "order". A promoted rule must also be unable to match anything
 * on a page that did not carry it: every such page must lack one of the selector's class or id
 * names outright, or the rule stays local, reported as "reach".
 * style-snapshot.mjs is the proof afterwards; this is the guard beforehand.
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { REPO, BEGIN, END, pages, parse, localRegions, localRules, fenceRules, splitDecls } from './css-rules.mjs';

const argv = process.argv.slice(2), cmd = argv[0];
const opt = n => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : null; };
const ROOT = opt('--root') ? resolve(opt('--root')) : REPO;
const WRITE = argv.includes('--write');
const isRule = r => r.kind === 'rule' || r.kind === 'at';

/* every rule of every <style> element of a page, in cascade order, with offsets; local ones flagged */
function allRules(html) {
  const out = [], regs = localRegions(html);
  const caseA = html.indexOf('<!-- CASE:BEGIN');
  const re = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  for (let m; (m = re.exec(html));) {
    const before = html.slice(0, m.index).replace(/<!--[\s\S]*?-->/g, '');
    if ((before.match(/<script\b/gi) || []).length > (before.match(/<\/script>/gi) || []).length) continue;
    const bodyStart = m.index + m[0].indexOf('>') + 1;
    for (const r of parse(m[1], bodyStart)) if (isRule(r)) { r.local = regs.some(g => r.start >= g.start && r.end <= g.end); out.push(r); }
  }
  return out.sort((a, b) => a.start - b.start);
}

/* remove rules (by start offset) from the file text; an at-rule group left empty goes too */
function removeRules(html, starts) {
  const S = new Set(starts);
  const spans = [];
  for (const reg of localRegions(html)) {
    const nodes = parse(html.slice(reg.start, reg.end), reg.start);
    for (const r of nodes) if (isRule(r) && S.has(r.start)) spans.push([r.start, r.end]);
    for (const g of nodes.filter(n => n.kind === 'group')) {
      const kids = nodes.filter(n => isRule(n) && n.start >= g.bodyStart && n.end <= g.bodyEnd);
      const inner = nodes.filter(n => n.kind === 'group' && n !== g && n.start >= g.bodyStart && n.end <= g.bodyEnd);
      if (kids.length && !inner.length && kids.every(k => S.has(k.start)) && !/\/\*/.test(html.slice(g.bodyStart, g.bodyEnd))) spans.push([g.start, g.end]);
    }
  }
  spans.sort((a, b) => b[0] - a[0]);
  let last = Infinity;
  for (const [a, b] of spans) {
    if (b > last) continue;                    /* inside a group already removed */
    let s = a, e = b;
    /* take the whole line when the rule was alone on it */
    const ls = html.lastIndexOf('\n', s - 1) + 1; let le = html.indexOf('\n', e); if (le < 0) le = html.length;
    if (!html.slice(ls, s).trim() && !html.slice(e, le).trim()) { s = ls; e = Math.min(html.length, le + 1); }
    html = html.slice(0, s) + html.slice(e); last = a;
  }
  return html;
}

/* ---- the browser side: which relocations could be reversed by a rule in between ---- */
let _browser = null;
async function browser() {
  if (_browser) return _browser;
  const require = createRequire(import.meta.url);
  let chromium;
  try { ({ chromium } = require('playwright')); }
  catch { ({ chromium } = createRequire(join(process.env.NODE_PATH || '/usr/lib/node_modules', 'x.js'))('playwright')); }
  _browser = await chromium.launch(); return _browser;
}
/* cands, others: [{key, sel, decl, ctx}]  ->  [[candKey, otherKey, 'props']] for every pair that can clash:
   same specificity, same pseudo-element, a longhand in common with a different value, and able to
   match one element (tested on the DOM, then statically for states no element is in yet) */
async function clashes(pagePath, cands, others) {
  if (!cands.length) return [];
  const b = await browser();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.route(/^https?:/, r => r.abort());
  const page = await ctx.newPage();
  await page.goto('file://' + pagePath, { waitUntil: 'load' });
  await page.keyboard.press('Shift+U').catch(() => {});
  await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; }));
  const res = await page.evaluate(({ cands, others }) => {
    const probe = document.createElement('div');
    const longCache = new Map();
    function longs(decl) {
      if (longCache.has(decl)) return longCache.get(decl);
      const m = new Map();
      for (const d of decl.split(/;(?![^(]*\))/)) {
        const i = d.indexOf(':'); if (i < 0) continue;
        const prop = d.slice(0, i).trim(), raw = d.slice(i + 1).trim(), imp = /!important/.test(raw);
        if (prop.startsWith('--')) { m.set(prop, raw); continue; }
        probe.style.cssText = ''; probe.style.setProperty(prop, raw.replace(/\s*!important/, ''));
        if (!probe.style.length) { m.set(prop, raw); continue; }
        for (let k = 0; k < probe.style.length; k++) { const n = probe.style[k]; m.set(n, (probe.style.getPropertyValue(n) || '@' + raw) + (imp ? '!' : '')); }
      }
      longCache.set(decl, m); return m;
    }
    function splitList(sel) { const out = []; let depth = 0, cur = ''; for (const c of sel) { if (c === '(' || c === '[') depth++; if (c === ')' || c === ']') depth--; if (c === ',' && depth === 0) { out.push(cur); cur = ''; } else cur += c; } out.push(cur); return out.map(s => s.trim()).filter(Boolean); }
    function spec(sel) {
      let a = 0, b = 0, c = 0, s = sel;
      s = s.replace(/:where\((?:[^()]|\([^()]*\))*\)/g, ' ');
      s = s.replace(/:(is|not|has|matches)\(((?:[^()]|\([^()]*\))*)\)/g, (_, f, inner) => { let best = [0, 0, 0]; for (const p of splitList(inner)) { const q = spec(p); if (q[0] > best[0] || (q[0] === best[0] && (q[1] > best[1] || (q[1] === best[1] && q[2] > best[2])))) best = q; } a += best[0]; b += best[1]; c += best[2]; return ' '; });
      s = s.replace(/\[[^\]]*\]/g, () => { b++; return ' '; });
      s = s.replace(/::[\w-]+(\([^)]*\))?/g, () => { c++; return ' '; });
      s = s.replace(/:(before|after|first-line|first-letter)\b/g, () => { c++; return ' '; });
      s = s.replace(/:[\w-]+(\([^)]*\))?/g, () => { b++; return ' '; });
      s = s.replace(/#[\w-]+/g, () => { a++; return ' '; });
      s = s.replace(/\.[\w-]+/g, () => { b++; return ' '; });
      s = s.replace(/[>+~*]/g, ' ');
      c += s.split(/\s+/).filter(Boolean).length;
      return [a, b, c];
    }
    const pseudoEl = sel => (sel.match(/::?(before|after|first-line|first-letter|placeholder|selection|marker|backdrop|[\w-]*thumb|[\w-]*track[\w-]*|file-selector-button)\b/) || [''])[0].replace(/^:+/, '');
    const strip = sel => sel.replace(/::[\w-]+(\([^)]*\))?/g, '').replace(/:(before|after|first-line|first-letter)\b/g, '')
      .replace(/:(hover|focus-visible|focus-within|focus|active|visited|link|checked|disabled|enabled|target|placeholder-shown|indeterminate|invalid|valid|required|open)\b/g, '').replace(/(^|[\s>+~])(?=$|[\s>+~])/g, '$1*').trim() || '*';
    function subject(sel) { const s = strip(sel); let depth = 0, cut = 0; for (let i = 0; i < s.length; i++) { const c = s[i]; if (c === '(' || c === '[') depth++; if (c === ')' || c === ']') depth--; if (depth === 0 && /[\s>+~]/.test(c)) cut = i + 1; } const comp = s.slice(cut).replace(/:(not|is|where|has)\((?:[^()]|\([^()]*\))*\)/g, '');
      return { tag: (comp.match(/^[a-zA-Z][\w-]*/) || [''])[0].toLowerCase(), ids: comp.match(/#[\w-]+/g) || [], cls: comp.match(/\.[\w-]+/g) || [] }; }
    function could(x, y) {            /* the static test for states no element is in yet */
      const a = subject(x), b = subject(y);
      if (a.tag && b.tag && a.tag !== b.tag) return false;
      if (a.ids.length && b.ids.length && a.ids[0] !== b.ids[0]) return false;
      const bare = s => !s.ids.length && !s.cls.length;
      if (bare(a) || bare(b)) return true;
      return a.ids.some(i => b.ids.includes(i)) || a.cls.some(c => b.cls.includes(c));
    }
    function co(x, y) { try { const sx = strip(x), sy = strip(y); for (const el of document.querySelectorAll(sx)) if (el.matches(sy)) return true; } catch (e) { return true; } return false; }
    const out = [], pre = r => ({ r, L: longs(r.decl), S: splitList(r.sel).map(t => ({ t, sp: spec(t).join(), pe: pseudoEl(t) })) });
    const O = others.map(pre), coCache = new Map();
    for (const c of cands.map(pre)) for (const x of O) {
      if (x.r.key === c.r.key) continue;
      const clash = [];
      for (const [p, v] of c.L) if (x.L.has(p) && x.L.get(p) !== v && x.L.get(p).endsWith('!') === v.endsWith('!')) clash.push(p);
      if (!clash.length) continue;
      let hit = false;
      for (const s of c.S) { for (const t of x.S) { if (t.sp !== s.sp || t.pe !== s.pe) continue;
          const k = s.t + '\u0000' + t.t; let v = coCache.get(k); if (v === undefined) { v = could(s.t, t.t) || co(s.t, t.t); coCache.set(k, v); }
          if (v) { hit = true; break; } } if (hit) break; }
      if (hit) out.push([c.r.key, x.r.key, clash.slice(0, 4).join(', ')]);
    }
    return out;
  }, { cands, others });
  await ctx.close();
  return res;
}

/* The order model. Rules with the same key are the same rule, so only the LAST copy of each key
   matters to the cascade. A set of moves is safe when, for every pair that can clash, the two last
   copies stand in the same order after the moves as before. settle() drops moves until that holds. */
function settle(move, pairs, lastBefore, lastAfterOf) {
  const why = new Map();
  for (;;) {
    let dropped = false;
    for (const [k1, k2, props] of pairs) {
      if (!move.has(k1)) continue;
      const b = Math.sign(lastBefore.get(k1) - lastBefore.get(k2)), a = Math.sign(lastAfterOf(k1, move) - lastAfterOf(k2, move));
      if (a !== b) { move.delete(k1); why.set(k1, k2.replace(/^ \| /, '').replace(/ \{.*$/s, '') + ' also sets ' + props); dropped = true; }
    }
    if (!dropped) return why;
  }
}
const slim = r => ({ key: r.key, sel: r.sel, decl: r.decl, ctx: r.ctx.join(' ') });
/* an opaque at-rule clashes with another of the same name and a different body */
const atPairs = (cands, all) => cands.filter(c => c.kind === 'at').flatMap(c => [...new Map(all.filter(x => x.kind === 'at' && x.sel === c.sel && x.key !== c.key).map(x => [x.key, [c.key, x.key, 'the same name']])).values()]);
const uniq = rs => [...new Map(rs.map(r => [r.key, r])).values()];

/* ------------------------------------------------------------------ identical */
async function identical() {
  const report = {}; let del = 0, kept = 0;
  for (const p of pages(ROOT)) {
    const file = join(ROOT, p); const html = readFileSync(file, 'utf8'), fenceEnd = html.indexOf(END);
    const R = allRules(html);
    const inFence = new Map(); for (const r of R) if (!r.local && r.start < fenceEnd) inFence.set(r.key, r.start);
    const lastBefore = new Map(); for (const r of R) lastBefore.set(r.key, r.start);
    const cands = uniq(R.filter(r => r.local && inFence.has(r.key)));
    const pairs = [...await clashes(file, cands.filter(r => r.kind === 'rule').map(slim), uniq(R.filter(r => r.kind === 'rule')).map(slim)), ...atPairs(cands, R)];
    const move = new Set(cands.map(r => r.key));
    /* after: a moved key's last copy is its last copy outside page-local CSS */
    const lastElse = new Map(); for (const r of R) if (!r.local) lastElse.set(r.key, r.start);
    const why = settle(move, pairs, lastBefore, (k, mv) => mv.has(k) ? lastElse.get(k) : lastBefore.get(k));
    const go = R.filter(r => r.local && move.has(r.key));
    report[p] = { deleted: uniq(go).map(r => ({ ctx: r.ctx.join(' '), sel: r.sel, decl: r.decl })), order: cands.filter(r => !move.has(r.key)).map(r => ({ ctx: r.ctx.join(' '), sel: r.sel, decl: r.decl, why: why.get(r.key) })) };
    del += go.length; kept += R.filter(r => r.local && inFence.has(r.key)).length - go.length;
    console.log((WRITE ? 'wrote ' : 'would ') + p + '  delete ' + go.length + ', keep for order ' + (cands.length - move.size));
    if (WRITE && go.length) writeFileSync(file, removeRules(html, go.map(r => r.start)));
  }
  console.log('\nsummary: ' + del + ' identical rule(s) ' + (WRITE ? 'deleted' : 'deletable') + ', ' + kept + ' left in place because order matters');
  if (opt('--report')) writeFileSync(opt('--report'), JSON.stringify(report, null, 1));
}

/* ------------------------------------------------------------------ variations */
function variations() {
  const map = new Map();
  for (const p of pages(ROOT)) {
    const html = readFileSync(join(ROOT, p), 'utf8');
    const F = fenceRules(html).filter(isRule), L = localRules(html).filter(isRule);
    const fk = new Set(F.map(r => r.key)); const fs = new Map(); for (const f of F) { if (!fs.has(f.skey)) fs.set(f.skey, []); fs.get(f.skey).push(f.decl); }
    for (const r of L) { if (fk.has(r.key) || !fs.has(r.skey)) continue;
      if (!map.has(r.key)) map.set(r.key, { skey: r.skey, ctx: r.ctx.join(' '), sel: r.sel, kind: r.kind, fence: fs.get(r.skey), page: r.decl, pages: [] });
      const e = map.get(r.key); if (!e.pages.includes(p)) e.pages.push(p); }
  }
  const out = [...map.values()].map(e => {
    if (e.kind !== 'rule') return e;
    const f = new Map(e.fence.flatMap(d => splitDecls(d))), g = new Map(splitDecls(e.page));
    e.added = [...g].filter(([k]) => !f.has(k)).map(([k, v]) => k + ':' + v);
    e.changed = [...g].filter(([k, v]) => f.has(k) && f.get(k) !== v).map(([k, v]) => k + ': ' + f.get(k) + ' -> ' + v);
    e.missing = [...f].filter(([k]) => !g.has(k)).map(([k, v]) => k + ':' + v);
    return e;
  });
  writeFileSync(opt('--out'), JSON.stringify(out, null, 1));
  console.log(out.length + ' distinct variation(s) written to ' + opt('--out'));
}

async function applyVariations() {
  const answers = JSON.parse(readFileSync(opt('--answers'), 'utf8'));
  const act = new Map(answers.map(a => [a.skey + ' {' + a.decl + '}', a]));
  let n = { drop: 0, keep: 0, trim: 0 };
  for (const p of pages(ROOT)) {
    const file = join(ROOT, p); let html = readFileSync(file, 'utf8');
    const F = fenceRules(html).filter(isRule); const fs = new Map(); for (const f of F) { if (!fs.has(f.skey)) fs.set(f.skey, []); fs.get(f.skey).push(f.decl); }
    const fk = new Set(F.map(r => r.key));
    const L = localRules(html).filter(r => isRule(r) && !fk.has(r.key) && fs.has(r.skey));
    const drops = [], trims = [];
    for (const r of L) { const a = act.get(r.key); if (!a) { console.log('NOTE  ' + p + '  no answer for ' + r.skey); continue; } n[a.action]++;
      if (a.action === 'drop') drops.push(r.start);
      if (a.action === 'trim') { const f = new Map(fs.get(r.skey).flatMap(d => splitDecls(d))); const keep = splitDecls(r.decl).filter(([k, v]) => f.get(k) !== v);
        trims.push([r, keep.map(([k, v]) => k + ':' + v).join(';')]); } }
    /* trims first, back to front, then drops by re-parsing (offsets move) */
    for (const [r, d] of trims.sort((x, y) => y[0].start - x[0].start)) { const t = html.slice(r.start, r.end); const i = t.indexOf('{'); html = html.slice(0, r.start) + t.slice(0, i + 1) + d + '}' + html.slice(r.end); }
    if (trims.length) { const keys = new Set(L.filter(r => drops.includes(r.start)).map(r => r.key)); const again = localRules(html).filter(r => isRule(r) && keys.has(r.key)).map(r => r.start); html = removeRules(html, again); }
    else html = removeRules(html, drops);
    if (WRITE) writeFileSync(file, html);
    console.log((WRITE ? 'wrote ' : 'would ') + p + '  drop ' + drops.length + ', trim ' + trims.length);
  }
  console.log('\nsummary: ' + JSON.stringify(n));
}

/* ------------------------------------------------------------------ promote */
async function promote() {
  const ASSETS = resolve(opt('--assets'));
  const skip = opt('--skip') && existsSync(opt('--skip')) ? new Set(JSON.parse(readFileSync(opt('--skip'), 'utf8'))) : new Set();
  const P = pages(ROOT), H = {}, A = {};
  for (const p of P) { H[p] = readFileSync(join(ROOT, p), 'utf8'); A[p] = allRules(H[p]); }
  const extra = ['changelog/index.html'].filter(f => existsSync(join(ROOT, f)));   /* swept too, never a carrier */
  /* what a selector's names are looked for in: the page with its fence and its page-local CSS blanked */
  const hay = {}; for (const p of [...P, ...extra]) { let h = p in H ? H[p] : readFileSync(join(ROOT, p), 'utf8');
    const regs = [...localRegions(h), { start: h.indexOf(BEGIN), end: h.indexOf(END) }].sort((x, y) => y.start - x.start);
    for (const g of regs) h = h.slice(0, g.start) + h.slice(g.end); hay[p] = h; }
  const fenceSkeys = new Set(); for (const r of A[P[0]]) if (!r.local && r.start < H[P[0]].indexOf(END)) fenceSkeys.add(r.skey);
  const where = new Map();
  for (const p of P) for (const r of A[p]) if (r.local) { if (!where.has(r.key)) where.set(r.key, new Map()); if (!where.get(r.key).has(p)) where.get(r.key).set(p, []); where.get(r.key).get(p).push(r); }
  const cands = [...where].filter(([k, m]) => m.size >= 2);
  const info = new Map(), move = new Set();
  const has = (q, nm) => new RegExp('(^|[^\\w-])' + nm.slice(1) + '($|[^\\w-])').test(hay[q]);
  for (const [key, m] of cands) {
    const r0 = [...m.values()][0][0], why = [];
    if (skip.has(key)) why.push(['other', 'moved back after the snapshot']);
    if (/(^|[\s,>+~(])\.case-|#caseBtn|#caseModal|\.casefab/.test(r0.sel)) why.push(['other', 'a case-viewer rule: verify-case.mjs requires it in the page']);
    if (fenceSkeys.has(r0.skey)) why.push(['other', 'a variation of a fence rule that was kept']);
    if (r0.kind === 'at' && !/^@(-webkit-)?keyframes/.test(r0.sel)) why.push(['other', 'a face or page rule']);
    if (r0.kind === 'rule' && r0.sel === ':root') why.push(['other', 'page tokens']);
    for (const q of [...P, ...extra]) { if (m.has(q) || why.length) continue;
      if (r0.kind === 'at') { const name = r0.sel.replace(/^@(-webkit-)?keyframes\s+/, ''); if (A[q] ? A[q].some(x => x.decl.includes(name) || (x.kind === 'at' && x.sel === r0.sel)) : false) why.push(['reach', q + ' uses the name ' + name]); continue; }
      const can = r0.sel.split(',').some(s => { const ns = s.match(/[.#][A-Za-z_][\w-]*/g) || []; return !ns.length || ns.every(nm => has(q, nm)); });
      if (can) why.push(['reach', 'could match on ' + q]); }
    info.set(key, { r0, m, why }); if (!why.length) move.add(key);
  }
  /* one order for the promoted block: first seen, walking the pages from the largest down */
  const rank = new Map(); for (const p of P.slice().sort((a, b) => A[b].length - A[a].length)) for (const r of A[p]) if (r.local && info.has(r.key) && !rank.has(r.key)) rank.set(r.key, rank.size);
  for (const p of P) {
    const R = A[p], fenceEnd = H[p].indexOf(END);
    const here = uniq(R.filter(r => r.local && move.has(r.key)));
    const pairs = [...await clashes(join(ROOT, p), here.filter(r => r.kind === 'rule').map(slim), uniq(R.filter(r => r.kind === 'rule')).map(slim)), ...atPairs(here, R)];
    const lastBefore = new Map(); for (const r of R) lastBefore.set(r.key, r.start);
    /* after: a promoted key sits at the end of the fence, in rank order, before every page-local rule */
    const why = settle(move, pairs, lastBefore, (k, mv) => mv.has(k) && where.get(k) && where.get(k).has(p) ? fenceEnd - 1 + rank.get(k) / (rank.size + 1) : lastBefore.get(k));
    for (const [k, w] of why) info.get(k).why.push(['order', p + ': ' + w]);
  }
  const report = { promoted: [], order: [], reach: [], other: [] };
  for (const [key, { r0, m, why }] of info) { const row = { key, ctx: r0.ctx.join(' '), sel: r0.sel, decl: r0.decl, pages: [...m.keys()] };
    if (move.has(key)) report.promoted.push(row); else report[why[0][0]].push({ ...row, why: why.map(w => w[1]) }); }
  console.log('candidates ' + cands.length + ': promote ' + report.promoted.length + ', order ' + report.order.length + ', reach ' + report.reach.length + ', other ' + report.other.length);
  if (opt('--report')) writeFileSync(opt('--report'), JSON.stringify(report, null, 1));
  if (!WRITE) return;
  const seq = [...move].sort((a, b) => rank.get(a) - rank.get(b));
  let css = '\n/* ---- promoted from the pages ---- rules that two or more pages carried word for word (step 1 of the\n   Meridian restyle). Page order is kept; an @media rule keeps its condition. */\n', open = '';
  for (const key of seq) { const { r0, m } = info.get(key); const p = [...m.keys()][0], r = m.get(p)[0]; const c = r0.ctx.join('{');
    if (c !== open) { if (open) css += '}'.repeat(open.split('{').length) + '\n'; if (c) css += c + '{\n'; open = c; }
    css += H[p].slice(r.start, r.end) + '\n'; }
  if (open) css += '}'.repeat(open.split('{').length) + '\n';
  const cf = join(ASSETS, 'components.css'); writeFileSync(cf, readFileSync(cf, 'utf8').replace(/\s*$/, '\n') + css);
  for (const p of P) { const starts = A[p].filter(r => r.local && move.has(r.key)).map(r => r.start); writeFileSync(join(ROOT, p), removeRules(H[p], starts)); console.log('wrote ' + p + '  ' + starts.length + ' rule(s) moved out'); }
  console.log('appended ' + seq.length + ' rule(s) to ' + cf + '; now run the sweep');
}

if (cmd === 'identical') await identical();
else if (cmd === 'variations') variations();
else if (cmd === 'apply-variations') await applyVariations();
else if (cmd === 'promote') await promote();
else { console.error('usage: consolidate.mjs identical|variations|apply-variations|promote ...'); process.exit(2); }
if (_browser) await _browser.close();
