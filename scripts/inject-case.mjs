#!/usr/bin/env node
/**
 * inject-case.mjs — replace the span between the CASE sentinels in each lesson.
 *
 * Touches nothing outside the sentinels. Idempotent by construction: the block
 * written is a pure function of the generated artifacts, so a second run
 * produces a byte-identical file.
 *
 *   node scripts/inject-case.mjs           write
 *   node scripts/inject-case.mjs --check   report drift, write nothing, exit 1 on any
 *
 * The opening sentinel is followed by a provenance comment carrying the case
 * version and the SHA-256 of the injected block. verify-case.mjs recomputes it.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '..');
export const LESSONS = ['index.html', 'session-0.1/index.html', 'session-1/index.html',
                        'session-2/index.html', 'session-3/index.html', 'session-4/index.html',
                        'session-5/index.html'];

const facts  = JSON.parse(readFileSync(join(HERE, 'case-facts.json'), 'utf8'));
const corpus = JSON.parse(readFileSync(join(HERE, 'case-corpus.json'), 'utf8'));
const OPEN  = `<!-- CASE:BEGIN ${facts.case_id} v${facts.case_version} -->`;
const CLOSE = `<!-- CASE:END ${facts.case_id} -->`;

/**
 * buildBlock — the injected region. Facts tab, Map tab (Part L), COLE constant,
 * COLEDOCS, the case-facts viewer, and the visible version stamp. Every
 * interactive part is written HERE rather than in the lesson, so all six files
 * get one identical implementation and one edit reaches all of them. That was
 * already true of the tab switcher; from 2026-08-25 it is true of the dialog
 * controller and the new-tab view as well, which previously existed as six
 * hand-written copies in two different states of repair.
 */
export function buildBlock() {
  const extract   = readFileSync(join(HERE, 'case-extract.html'), 'utf8').trim();
  const flowchart = readFileSync(join(HERE, 'case-flowchart.html'), 'utf8').trim();
  const F = facts.figures;

  /* THE TWO SHEETS AND THEIR DETAIL LAYER. The fragment carries the two sparse
     SVG sheets separated by one SHEET-BREAK marker; every figure the sheets no
     longer draw renders as an HTML table below its sheet, generated HERE from
     case-facts.json, so each moved figure is derived rather than hand-typed
     into artwork. The sheets' own labels stay literals in CASE.md Part L; that
     standing exposure is docs/deferred-work.md DW-070. A vanished marker is
     drift, not a formatting choice: fail loudly. */
  const sheets = flowchart.split('<!-- SHEET-BREAK -->');
  if (sheets.length !== 2) throw new Error('case-flowchart.html: expected one SHEET-BREAK marker between the two sheets, found ' + (sheets.length - 1));
  const usdK = (n) => usd(n);
  const pct1 = (n) => Number(n).toFixed(1) + '%';

  /* D1: the balance sheet by owner and tax character, behind Sheet 1 (the map). */
  const D1 = [];
  D1.push('<div class="case-detail case-dhide" id="caseDetail1">');
  D1.push('  <p class="case-h">Sheet 1 detail. Every account on the map, by owner and tax character, as of ' + esc(facts.as_of) + '.</p>');
  D1.push('  <table class="dt tight case-t"><tbody>');
  D1.push(`    <tr><td>Meg · 403(b) · pre-tax · to David</td><td class="case-num">${usdK(F.meg403b)}</td></tr>`);
  D1.push(`    <tr><td>Meg · Roth IRA · to David, then Emma and Ryan</td><td class="case-num">${usdK(F.megRoth)}</td></tr>`);
  D1.push(`    <tr><td>David · 401(k) · pre-tax ${usdK(F.david401kPre)} and Roth ${usdK(F.david401kRoth)} · to Meg, then Emma and Ryan</td><td class="case-num">${usdK(F.david401k)}</td></tr>`);
  D1.push(`    <tr><td>David · Roth IRA · to Meg; no contingent</td><td class="case-num">${usdK(F.davidRoth)}</td></tr>`);
  D1.push(`    <tr><td><b>David · rollover IRA · pre-tax · names ${esc(F.dorothyName)} (died ${esc(F.dorothyDied)}); no contingent</b></td><td class="case-num"><b>${usdK(F.davidRollover)}</b></td></tr>`);
  D1.push(`    <tr><td>Joint · brokerage · taxable · ${F.esppPct}% in David's employer's stock</td><td class="case-num">${usdK(F.brokerage)}</td></tr>`);
  D1.push(`    <tr><td>Joint · cash reserve · taxable</td><td class="case-num">${usdK(F.cash)}</td></tr>`);
  D1.push(`    <tr><td>David · health savings account · to Meg</td><td class="case-num">${usdK(F.hsa)}</td></tr>`);
  D1.push(`    <tr><td>Meg (owner) · 529 for Ryan · David successor owner</td><td class="case-num">${usdK(F.plan529)}</td></tr>`);
  D1.push(`    <tr><td><b>Investable total</b></td><td class="case-num"><b>${usdK(F.investable)}</b></td></tr>`);
  D1.push('  </tbody></table>');
  D1.push(`  <p class="case-dnote">By tax character: pre-tax ${usdK(F.preTaxTotal)} (${pct1(F.preTaxPct)}), Roth ${usdK(F.rothTotal)} (${pct1(F.rothPct)}), taxable ${usdK(F.taxableTotal)} (${pct1(F.taxablePct)}), plus the HSA and the 529. Every pre-tax dollar is ordinary income to someone, in some year.</p>`);
  D1.push('  <table class="dt tight case-t"><tbody>');
  D1.push(`    <tr><td>Residence, ${esc(F.residenceTown)} · joint tenancy · no transfer-on-death instrument</td><td class="case-num">${usdK(F.residence)}</td></tr>`);
  D1.push(`    <tr><td>Mortgage · ${F.mortgageRate.toFixed(2)}% fixed · ${usdK(F.mortgagePayment)} a month · to ${esc(F.mortgageMaturity)}</td><td class="case-num">(${usdK(F.mortgage)})</td></tr>`);
  D1.push(`    <tr><td><b>Net worth</b></td><td class="case-num"><b>${usdK(F.netWorth)}</b></td></tr>`);
  D1.push('  </tbody></table>');
  D1.push(`  <p class="case-dnote">${esc(F.ruthName)}, ${F.ruthAge}: a traditional IRA of ${usdK(F.ruthIra)} naming Meg, and ${usdK(F.ruthSavings)} of savings payable on death to Meg and Tom. Independent living at ${usdK(F.ruthMonthlyFee)} a month; assisted living at ${usdK(F.ruthAssistedBase)} plus care charges.</p>`);
  D1.push('</div>');

  /* D2: the clocks, behind Sheet 2 (the timeline). */
  const D2 = [];
  D2.push('<div class="case-detail case-dhide" id="caseDetail2">');
  D2.push('  <p class="case-h">Sheet 2 detail. The dates behind the bars.</p>');
  D2.push('  <table class="dt tight case-t"><thead><tr><th></th><th>Meg (born 1968)</th><th>David (born 1967)</th></tr></thead><tbody>');
  D2.push(`    <tr><td>Age 59&frac12;</td><td class="case-num">${esc(F.megAge59h)}</td><td class="case-num">${esc(F.davidAge59h)}</td></tr>`);
  D2.push(`    <tr><td>Planned last paycheck</td><td class="case-num">${F.megRetireYear} (${F.megRetireAge})</td><td class="case-num">${F.davidRetireYear} (${F.davidRetireAge}), or earlier</td></tr>`);
  D2.push(`    <tr><td>Social Security, earliest (62)</td><td class="case-num">${esc(F.megSsEarliest)}</td><td class="case-num">${esc(F.davidSsEarliest)}</td></tr>`);
  D2.push(`    <tr><td>Full retirement age (67)</td><td class="case-num">${esc(F.megFra)}</td><td class="case-num">${esc(F.davidFra)}</td></tr>`);
  D2.push(`    <tr><td>Delayed credits end (70)</td><td class="case-num">${esc(F.megSs70)}</td><td class="case-num">${esc(F.davidSs70)}</td></tr>`);
  D2.push(`    <tr><td>Medicare (65)</td><td class="case-num">${esc(F.megMedicare)}</td><td class="case-num">${esc(F.davidMedicare)}</td></tr>`);
  D2.push(`    <tr><td>First Medicare premium set on</td><td class="case-num">${F.megIrmaaLookback} income</td><td class="case-num">${F.davidIrmaaLookback} income</td></tr>`);
  D2.push(`    <tr><td>First required minimum distribution (75)</td><td class="case-num">${F.megFirstDistYear}</td><td class="case-num">${F.davidFirstDistYear}</td></tr>`);
  D2.push(`    <tr><td><b>Roth conversion window</b></td><td class="case-num"><b>${F.megWindowStart} to ${F.megWindowEnd}</b></td><td class="case-num"><b>${F.davidWindowStart} to ${F.davidWindowEnd}</b></td></tr>`);
  D2.push('  </tbody></table>');
  D2.push(`  <p class="case-dnote">Synthetic Social Security estimates, monthly, in 2026 dollars: Meg ${usdK(F.megSs62)} at 62, ${usdK(F.megSsFra)} at 67, ${usdK(F.megSsAt70)} at 70; David ${usdK(F.davidSs62)}, ${usdK(F.davidSsFra)}, ${usdK(F.davidSsAt70)}. The window is the calendar years with no wages and no required distributions; a conversion in a year raises that year's federal bracket and, two years later, the Medicare premium of whichever spouse is then enrolled. Illinois does not tax the conversion.</p>`);
  D2.push('</div>');

  const L = [];
  /* THE VIEWER'S OWN CSS, emitted here rather than added to six hand-written
     copies of the case stylesheet. The .case-* layout rules predate this and
     stay in the lessons; only what the viewer adds is here, so there is exactly
     one place to change it. */
  L.push('<style>');
  L.push('.case-actions{display:flex;justify-content:flex-end;margin:0 0 10px}');
  L.push('.case-newtab{font-family:"JetBrains Mono",monospace;font-size:10px;letter-spacing:.1em;');
  L.push('  text-transform:uppercase;color:var(--on);text-decoration:none;background:none;');
  L.push('  border:1.5px solid var(--on);border-radius:6px;padding:5px 10px;cursor:pointer;');
  L.push('  display:inline-flex;align-items:center;gap:7px}');
  L.push('.case-newtab:hover{background:var(--on-bg)}');
  L.push('.case-newtab:focus-visible{outline:2px solid var(--on);outline-offset:3px}');
  L.push('.case-newtab[hidden]{display:none}');
  L.push('/* THE DETAIL TOGGLE. Its hiding class is case-scoped on the .case-off');
  L.push('   precedent: the page-wide Shift+U override strips .hidden, and the');
  L.push('   detail layer must not be revealable by it. */');
  L.push('.case-dtl{display:flex;justify-content:flex-end;margin:0 0 12px}');
  L.push('.case-dtl-btn{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.06em;');
  L.push('  color:var(--on);background:none;border:1.5px solid var(--on);border-radius:6px;');
  L.push('  padding:5px 12px;cursor:pointer}');
  L.push('.case-dtl-btn:hover{background:var(--on-bg)}');
  L.push('.case-dtl-btn:focus-visible{outline:2px solid var(--on);outline-offset:3px}');
  L.push('.case-detail{margin:16px 0 24px}');
  L.push('.case-detail.case-dhide{display:none}');
  L.push('.case-detail .case-num{text-align:right;font-family:"JetBrains Mono",monospace;white-space:nowrap}');
  L.push('.case-dnote{font-size:13px;color:var(--muted);margin:10px 2px 18px}');
  L.push('/* NON-COLOUR STATE. The selected tab must not be identifiable by colour');
  L.push('   alone. Three independent channels carry it: a filled rather than hollow');
  L.push('   marker, bold rather than regular weight, and the 2px underline the');
  L.push('   lesson stylesheet already draws. aria-selected carries it to a reader');
  L.push('   who sees none of the three. */');
  L.push('.case-tab{font-weight:400}');
  L.push('.case-tab.on{font-weight:700}');
  L.push('.case-mk{margin-right:6px;font-size:9px;vertical-align:1px}');
  L.push('</style>');
  L.push('<div class="case-gen">');
  L.push('  <div class="case-actions">');
  L.push('    <a class="case-newtab" id="caseNewTab" hidden>Open in a new tab<span aria-hidden="true">&#8599;</span></a>');
  L.push('  </div>');
  L.push('  <div class="case-tabs" role="tablist" aria-label="Cole household case">');
  L.push('    <button type="button" class="case-tab on" role="tab" id="caseTabFacts" aria-controls="casePanelFacts" aria-selected="true" tabindex="0"><span class="case-mk" aria-hidden="true">&#9679;</span>Facts</button>');
  L.push('    <button type="button" class="case-tab" role="tab" id="caseTabStruct" aria-controls="casePanelStruct" aria-selected="false" tabindex="-1"><span class="case-mk" aria-hidden="true">&#9675;</span>Map</button>');
  L.push('  </div>');
  L.push('  <div class="case-panel" role="tabpanel" id="casePanelFacts" aria-labelledby="caseTabFacts" tabindex="0">');
  L.push(indent(extract, 4));
  L.push('  </div>');
  L.push('  <div class="case-panel case-off" role="tabpanel" id="casePanelStruct" aria-labelledby="caseTabStruct" tabindex="0">');
  L.push('    <p class="case-h">The household map and the timeline. Sheet 1 is who owns what and who each account passes to; Sheet 2 is the clocks from 2026 to 2044 with the Roth conversion window marked. Show detail opens the balance sheet by owner and the table of dates behind the bars.</p>');
  L.push('    <div class="case-dtl"><button type="button" class="case-dtl-btn" id="caseDetailBtn" aria-expanded="false" aria-controls="caseDetail1 caseDetail2">Show detail</button></div>');
  L.push(indent(sheets[0].trim(), 4));
  L.push(indent(D1.join('\n'), 4));
  L.push(indent(sheets[1].trim(), 4));
  L.push(indent(D2.join('\n'), 4));
  L.push('  </div>');
  /* The recurring question. The v5 unresolved question (CASE.md header, PEDAGOGY
     §5.2): the Roth conversion window. It is NOT a CASE.md fact and is deliberately
     not generated from the master: CASE.md supplies the arithmetic and draws no
     conclusion, and this question asks for none. It lives here so one edit
     reaches every file. The three figures it carries are read from case-facts.json
     and pinned by verify-migration check 20. */
  L.push('  <div class="case-spine">');
  L.push('    <span class="case-spine-h">The question that runs through every session</span>');
  L.push('    <p class="case-spine-q">The Coles hold <b>' + usd(F.preTaxTotal) + '</b> in pre-tax accounts, <b>' + F.preTaxPct.toFixed(1) + '%</b> of what they have, and a window of years with no paycheck and no required distribution: Meg ' + F.megWindowStart + ' to ' + F.megWindowEnd + ', David ' + F.davidWindowStart + ' to ' + F.davidWindowEnd + '. <b>How much do they convert to Roth, in which years, when the federal bracket is one price and the Medicare premium two years later is the other?</b></p>');
  L.push('    <p class="case-spine-n">No session answers it. Every session works on a different part of it. The arithmetic is in the case: the 24% bracket has ' + usd(F.bracketRoom) + ' of room in 2026 and a Medicare premium is set on income from two years before; Illinois taxes none of it. Nothing in the case says how much to convert, and neither does this course.</p>');
  L.push('  </div>');
  L.push('  <p class="case-stamp"><span class="mono">Case v' + facts.case_version + ' ' + '__STAMP__' + '</span></p>');
  L.push('</div>');
  L.push('<script>');
  L.push('/* Case tabs and the generated COLE constant. Generated by');
  L.push('   scripts/inject-case.mjs from scripts/case-facts.json. Exercise code reads');
  L.push('   figures from COLE; a number typed into an exercise is the defect this');
  L.push('   prevents. Do not edit inside the sentinels: edit CASE.md and rebuild. */');
  L.push('var COLE=' + JSON.stringify(F) + ';');
  /* COLEDOCS. CASE.md PART O, through scripts/case-corpus.json. The session-3
     retrieval corpus and the §07 meeting excerpt were JavaScript string literals
     in session-3/index.html until 2026-08-25, restating instruments this file
     describes with nothing comparing the two; the buy-sell chunk had been
     stating a different transfer-restriction mechanism from §F.6 through two
     audits. They arrive by the same route as every other case fact now, so the
     corpus and §F.6 cannot disagree without build-case.mjs failing. */
  L.push('var COLEDOCS=' + JSON.stringify({ corpus: corpus.corpus, transcript: corpus.transcript }) + ';');
  L.push('function COLEDOC(id){for(var i=0;i<COLEDOCS.corpus.length;i++){if(COLEDOCS.corpus[i].id===id)return COLEDOCS.corpus[i]}');
  L.push('  throw new Error("COLEDOCS: no corpus chunk named "+id)}');
  L.push('/* THE PLACEHOLDER THAT THROWS. Exercise code interpolates a case figure');
  L.push('   with COLEn / COLEm / COLEp rather than typing it, and a key that does not');
  L.push('   exist THROWS here instead of rendering the word "undefined" inside a');
  L.push('   sentence a student is being marked against. A silent placeholder is the');
  L.push('   defect; a loud one is the guard. verify-browser.mjs catches both. */');
  L.push('function COLEv(k){if(!COLE.hasOwnProperty(k))throw new Error("COLE: no figure named "+k);return COLE[k]}');
  L.push('function COLEn(k){return String(COLEv(k))}');
  L.push('function COLEm(k){return "$"+Number(COLEv(k)).toLocaleString("en-US")}');
  L.push('function COLEp(k,d){return (COLEv(k)*100).toFixed(d==null?2:d)+"%"}');
  L.push('(function(){');
  L.push("  var tabs=[document.getElementById('caseTabFacts'),document.getElementById('caseTabStruct')];");
  L.push("  var panels=[document.getElementById('casePanelFacts'),document.getElementById('casePanelStruct')];");
  L.push('  if(!tabs[0]||!tabs[1]||!panels[0]||!panels[1])return;');
  L.push('  function show(i){');
  L.push('    for(var k=0;k<2;k++){');
  L.push("      tabs[k].className='case-tab'+(k===i?' on':'');");
  L.push("      tabs[k].setAttribute('aria-selected',k===i?'true':'false');");
  L.push("      tabs[k].tabIndex=k===i?0:-1;");
  L.push("      var mk=tabs[k].querySelector('.case-mk');");
  L.push("      if(mk)mk.textContent=k===i?'\\u25CF':'\\u25CB';");
  L.push("      panels[k].className='case-panel'+(k===i?'':' case-off');");
  L.push('    }');
  L.push('  }');
  L.push('  for(var i=0;i<2;i++)(function(i){');
  L.push("    tabs[i].addEventListener('click',function(){show(i)});");
  L.push("    tabs[i].addEventListener('keydown',function(e){");
  L.push("      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();var n=1-i;show(n);tabs[n].focus()}");
  L.push('    });');
  L.push('  })(i);');
  L.push('})();');
  L.push('/* The detail toggle: one button opens both detail layers. The hiding');
  L.push('   class is case-scoped (.case-dhide, the .case-off precedent), so the');
  L.push('   Shift+U override cannot reveal it. The standalone new-tab view');
  L.push('   removes this control and force-opens the detail instead. */');
  L.push('(function(){');
  L.push("  var b=document.getElementById('caseDetailBtn');");
  L.push("  var d=[document.getElementById('caseDetail1'),document.getElementById('caseDetail2')];");
  L.push('  if(!b||!d[0]||!d[1])return;');
  L.push("  b.addEventListener('click',function(){");
  L.push("    var open=b.getAttribute('aria-expanded')==='true';");
  L.push("    b.setAttribute('aria-expanded',open?'false':'true');");
  L.push("    b.textContent=open?'Show detail':'Hide detail';");
  L.push("    for(var i=0;i<2;i++)d[i].className='case-detail'+(open?' case-dhide':'');");
  L.push('  });');
  L.push('})();');

  /* ------------------------------------------------ the case-facts viewer --
     ONE implementation, generated into all six files. Before this it was six
     hand-written copies in two states of repair: four managed focus, two did
     not, and none trapped it. Everything below is ES5 and touches no storage.

     The content is the span this script is inside. Nothing is fetched, nothing
     is duplicated into a second file, and CASE.md stays the only thing edited. */
  L.push('(function(){');
  L.push("  var m=document.getElementById('caseModal');");
  L.push('  if(!m)return;');
  L.push("  var box=m.querySelector('.inner')||m;");
  L.push("  var gen=document.querySelector('.case-gen');");
  L.push("  var link=document.getElementById('caseNewTab');");
  L.push('  var lastFocus=null,hidden=[];');
  L.push('');
  L.push('  /* The dialog announces itself as one. The markup around the span is');
  L.push('     hand-written per lesson and these are set here so all six agree. */');
  L.push("  m.setAttribute('role','dialog');");
  L.push("  m.setAttribute('aria-modal','true');");
  L.push("  m.setAttribute('aria-label','The Cole household \\u2014 case facts');");
  L.push('');
  L.push("  function isOpen(){return m.className.indexOf('open')>=0}");
  L.push('  /* Rendered, enabled, and not deliberately removed from the order. */');
  L.push('  function stops(){');
  L.push("    var n=box.querySelectorAll('a[href],button,input,select,textarea,[tabindex]'),out=[],i,e;");
  L.push('    for(i=0;i<n.length;i++){e=n[i];');
  L.push("      if(e.disabled||e.hasAttribute('hidden'))continue;");
  L.push("      if(e.getAttribute('tabindex')==='-1')continue;");
  L.push('      if(!e.offsetWidth&&!e.offsetHeight)continue;');
  L.push('      out.push(e)}');
  L.push('    return out}');
  L.push('');
  L.push('  /* While the dialog is open the page behind it is not reachable by a');
  L.push('     screen reader either. Only nodes this function hid are unhidden, so');
  L.push("     an aria-hidden the page set for its own reasons survives. */");
  L.push('  function veil(on){');
  L.push('    var kids=document.body.children,i,e;');
  L.push('    if(on){hidden=[];');
  L.push('      for(i=0;i<kids.length;i++){e=kids[i];');
  L.push("        if(e===m||e.getAttribute('aria-hidden')==='true')continue;");
  L.push("        e.setAttribute('aria-hidden','true');hidden.push(e)}}");
  L.push("    else{for(i=0;i<hidden.length;i++)hidden[i].removeAttribute('aria-hidden');hidden=[]}}");
  L.push('');
  L.push('  function open(){');
  L.push('    if(isOpen())return;');
  L.push('    lastFocus=document.activeElement;');
  L.push("    m.className=m.className+(m.className?' ':'')+'open';");
  L.push('    veil(true);');
  L.push("    var t=document.getElementById('caseTabFacts');");
  L.push('    if(t&&t.focus)t.focus();else{var f=stops();if(f.length)f[0].focus()}}');
  L.push('  function close(){');
  L.push('    if(!isOpen())return;');
  L.push("    m.className=m.className.replace(/(^|\\s)open(?=\\s|$)/,'');");
  L.push('    veil(false);');
  L.push('    /* Focus goes back where it came from. A dialog that drops focus on');
  L.push('       the body puts a keyboard reader at the top of the document. */');
  L.push('    if(lastFocus&&lastFocus.focus&&document.contains(lastFocus))lastFocus.focus();');
  L.push("    else{var b=document.getElementById('caseBtn');if(b&&b.focus)b.focus()}");
  L.push('    lastFocus=null}');
  L.push('');
  L.push("  var btn=document.getElementById('caseBtn');");
  L.push("  if(btn){btn.setAttribute('aria-haspopup','dialog');btn.addEventListener('click',open)}");
  L.push('  /* caseClose is parsed AFTER this script, so it is bound by delegation');
  L.push('     rather than by id at parse time. */');
  L.push("  m.addEventListener('click',function(e){");
  L.push("    if(e.target===m){close();return}");
  L.push("    var t=e.target;while(t&&t!==m){if(t.id==='caseClose'){close();return}t=t.parentNode}});");
  L.push('');
  L.push("  document.addEventListener('keydown',function(e){");
  L.push('    if(!isOpen())return;');
  L.push("    if(e.key==='Escape'){e.preventDefault();close();return}");
  L.push("    if(e.key!=='Tab')return;");
  L.push('    /* THE TRAP. Tab off either end wraps to the other, so focus cannot');
  L.push('       walk out of the dialog into a page the reader cannot see. */');
  L.push('    var f=stops();if(!f.length){e.preventDefault();return}');
  L.push('    var first=f[0],last=f[f.length-1],a=document.activeElement;');
  L.push('    if(box.contains(a)===false){e.preventDefault();(e.shiftKey?last:first).focus();return}');
  L.push('    if(e.shiftKey&&a===first){e.preventDefault();last.focus()}');
  L.push('    else if(!e.shiftKey&&a===last){e.preventDefault();first.focus()}});');
  L.push('');
  L.push('  /* ---- the second affordance: the same content, in its own tab ----');
  L.push('     A Blob URL built from the injected span. No file is written, nothing');
  L.push('     is fetched and no CDN is reached, so it works with the network off.');
  L.push('     The lessons own stylesheets are copied in as text, which is why the');
  L.push('     page looks like the lesson without linking anything: a <link> to a');
  L.push('     font host would be the one request this control exists to avoid.');
  L.push('     Both panels are opened and the tablist is dropped, because a tab');
  L.push('     control whose script did not come with it is a dead control. */');
  L.push('  function standalone(){');
  L.push("    if(!gen||typeof Blob==='undefined'||!window.URL||!URL.createObjectURL)return null;");
  L.push('    var copy=gen.cloneNode(true),i,n;');
  L.push("    n=copy.querySelectorAll('.case-tabs,.case-actions,.case-dtl');");
  L.push('    for(i=0;i<n.length;i++)n[i].parentNode.removeChild(n[i]);');
  L.push("    n=copy.querySelectorAll('.case-panel');");
  L.push("    for(i=0;i<n.length;i++){n[i].className='case-panel';n[i].removeAttribute('role');");
  L.push("      n[i].removeAttribute('tabindex');n[i].removeAttribute('aria-labelledby')}");
  L.push('    /* The detail layer opens the way the panels do: its toggle is a dead');
  L.push('       control without its script, so the control goes and the content');
  L.push('       stays visible. */');
  L.push("    n=copy.querySelectorAll('.case-detail');");
  L.push("    for(i=0;i<n.length;i++)n[i].className='case-detail';");
  L.push("    n=copy.querySelectorAll('script');");
  L.push('    for(i=0;i<n.length;i++)n[i].parentNode.removeChild(n[i]);');
  L.push("    var css='',sheets=document.querySelectorAll('style');");
  L.push("    for(i=0;i<sheets.length;i++)css+=sheets[i].textContent+'\\n';");
  L.push("    var doc='<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\">'+");
  L.push("      '<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">'+");
  L.push("      '<title>The Cole Household \\u2014 case facts</title><style>'+css+");
  L.push("      'body{background:var(--page);padding:34px 20px}'+");
  L.push("      '.case-standalone{max-width:900px;margin:0 auto;background:var(--card);'+");
  L.push("      'border-radius:14px;padding:30px 34px}'+");
  L.push("      '.case-panel{display:block}'+");
  L.push("      '</style></head><body><main class=\"case-standalone\">'+");
  L.push("      '<h2 style=\"margin-bottom:6px\">The Cole Household</h2>'+");
  L.push("      '<p class=\"case-lede\">Synthetic case, classroom anchor only. '+");
  L.push("      'This tab is a copy of the case block in the lesson you opened it from, '+");
  L.push("      'and it holds nothing the lesson does not.</p>'+");
  L.push("      copy.innerHTML+'</main></body></html>';");
  L.push("    return URL.createObjectURL(new Blob([doc],{type:'text/html'}))}");
  L.push('');
  L.push('  if(link){');
  L.push('    var url=null;');
  L.push('    try{url=standalone()}catch(err){url=null}');
  L.push("    if(url){link.href=url;link.target='_blank';link.rel='noopener';");
  L.push("      link.removeAttribute('hidden')}}");
  L.push('})();');
  L.push('</script>');
  const body = L.join('\n');
  const stamp = createHash('sha256').update(body.replace('__STAMP__', ''), 'utf8').digest('hex').slice(0, 7);
  return { body: body.replace('__STAMP__', stamp), stamp };
}

const usd = (n) => '$' + Number(n).toLocaleString('en-US');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function indent(s, n) {
  const pad = ' '.repeat(n);
  return s.split('\n').map((l) => (l.trim() ? pad + l : l)).join('\n');
}

export function regionFor(block, stamp) {
  return OPEN + '\n' +
         `<!-- generated by scripts/inject-case.mjs from CASE.md v${facts.case_version} · sha256 ${sha256(block)} · do not edit between the sentinels -->\n` +
         block + '\n' + CLOSE;
}
export function sha256(s) { return createHash('sha256').update(s, 'utf8').digest('hex'); }
export { OPEN, CLOSE, facts };

/* ---------------------------------------------------------------- main -- */
/* The main guard compares real paths, so the script also runs when invoked
   through a symlinked checkout or home (DW-165: the typed-path comparison did
   nothing through a symlink). */
import { realpathSync } from 'node:fs';
const invokedAsMain = (() => {
  try { return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1]); } catch { return false; }
})();
/* A lesson carries the sentinel of the version it was last injected with. On a
   version change (v4.0 -> v5.0) the opening sentinel is found by case id, any
   version, and rewritten to the current one; the closing sentinel never
   carries a version. */
const OPEN_ANY = new RegExp(`<!-- CASE:BEGIN ${facts.case_id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} v[0-9.]+ -->`);
if (invokedAsMain) {
  const check = process.argv.includes('--check');
  const { body, stamp } = buildBlock();
  const region = regionFor(body, stamp);
  let changed = 0, missing = [];
  for (const rel of LESSONS) {
    const path = join(REPO, rel);
    const text = readFileSync(path, 'utf8');
    const om = text.match(OPEN_ANY);
    const a = om ? om.index : -1, b = text.indexOf(CLOSE);
    if (a < 0 || b < 0) { missing.push(rel); continue; }
    const next = text.slice(0, a) + region + text.slice(b + CLOSE.length);
    if (next === text) { console.log(`OK    current  ${rel}`); continue; }
    changed++;
    if (check) { console.log(`STALE          ${rel}`); }
    else { writeFileSync(path, next); console.log(`WROTE          ${rel}`); }
  }
  for (const m of missing) console.log(`FAIL  no sentinels  ${m}`);
  console.log(`summary: ${LESSONS.length - changed - missing.length} current, ${changed} ${check ? 'stale' : 'rewritten'}, ${missing.length} without sentinels  ·  stamp ${stamp}`);
  process.exit(missing.length || (check && changed) ? 1 : 0);
}
