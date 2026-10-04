#!/usr/bin/env node
/* One DOM assertion per ledger row a DOM check can prove. Run from the repo root with NODE_PATH at a
   node_modules holding jsdom:  node docs/changes/2026-10-04-session-5-interactivity/checks.mjs
   Every drag beat is driven here through its click path (the item, then the place), which is the same
   place() the pointer drag calls; the Chromium click-through drives the pointer drags themselves. */
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
const html = readFileSync('session-5/index.html', 'utf8');
const noMotion = () => ({ matches: true, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
function load() {
  const errs = [];
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, beforeParse(win) { win.matchMedia = noMotion; win.addEventListener('error', (e) => errs.push(e.message)); } });
  const w = dom.window, d = w.document;
  let copied = '';
  Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: (t) => { copied = t; return Promise.resolve(); } }, configurable: true });
  return { w, d, errs, copied: () => copied, $: (s) => d.querySelector(s), $$: (s) => [...d.querySelectorAll(s)],
    txt: (s) => (d.querySelector(s) ? d.querySelector(s).textContent.replace(/\s+/g, ' ').trim() : ''),
    click: (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })),
    input: (el, v) => { if (!el) return; el.value = String(v); el.dispatchEvent(new w.Event('input', { bubbles: true })); el.dispatchEvent(new w.Event('change', { bubbles: true })); },
    done: (g) => { const c = d.querySelector('[data-gate="' + g + '"]'); return !!c && c.classList.contains('done'); },
    shiftU: () => d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true })) };
}
let fails = 0;
const say = (ok, id, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
const wc = (t) => t.split(/\s+/).filter(Boolean).length;

say(existsSync('docs/changes/2026-10-04-session-5-interactivity/plan.md') && existsSync('docs/changes/2026-10-04-session-5-interactivity/ledger.md'), 'S5I-001', 'the change folder exists and this file runs');

/* ---- the shell ---- */
{ const { $, $$, txt, w } = load();
  const secs = $$('section.slide'), core = secs.filter((s) => !s.classList.contains('apx') && !s.classList.contains('apxdiv')), apx = secs.filter((s) => s.classList.contains('apx'));
  const mins = (list) => list.reduce((a, s) => a + parseInt((s.querySelector('.mins') || {}).textContent || '0', 10), 0);
  say(core.length === 11 && mins(core) === 59 && apx.length === 5 && mins(apx) === 66 && w.__coreMins === 59 && /59 min/.test(txt('#paceOut')) && /125 min/.test(txt('#paceOut')), 'S5I-002', `11 core / 59 min, 5 appendix / 66 min, 125 in all (found ${core.length}/${mins(core)}, ${apx.length}/${mins(apx)})`);
  say($$('[data-task]').length === 16 && $$('[data-gate]').length === 16 && $('#sLib [data-task="t-sLib"][data-comp="pipeline-lab"]') && $('#sLib .check[data-gate="gl"]'), 'S5I-002', '16 roots and 16 gates; §07 is sLib, pipeline-lab, gate gl');
  const eyebrows = $$('section.slide .eyebrow span:first-child').map((e) => e.textContent);
  say(eyebrows.some((e) => /^07 · The firm’s library$/.test(e)) && eyebrows.some((e) => /^08 · What stays human$/.test(e)) && eyebrows.some((e) => /^09 · The reading$/.test(e)) && !eyebrows.some((e) => /^07 · What stays human$/.test(e)), 'S5I-002', 'the eyebrows read 07 the firm’s library, 08 what stays human, 09 the reading');
  const comps = $$('section.slide [data-task]').map((r) => r.getAttribute('data-comp'));
  say(comps.every((c, i) => i === 0 || c !== comps[i - 1]) && new Set(comps).size === 12, 'S5I-002', `no family repeats in adjacent sections in file order; ${new Set(comps).size} distinct families`);
  say(/APXBUDGET:BEGIN/.test(html) && /Core 59 \+ appendix 66/.test(html) && /window\.__coreMins=59/.test(html), 'S5I-002', 'the generated regions carry 59 and 125'); }

/* ---- the drag kit and the sorter ---- */
{ const { $, $$, click, txt } = load();
  say(/function mkDrag\(cfg\)/.test(html) && /pointerdown/.test(html) && /setPointerCapture/.test(html) && !/dragstart|ondragover/.test(html.slice(html.indexOf('<script>'))), 'S5I-003', 'mkDrag exists, on Pointer Events, with no HTML5 drag-and-drop');
  say($$('#s7List .chip[data-drag]').length === 8 && $$('#s7Boxes .lbox[data-drop]').length === 2 && $$('#e3List .chip[data-drag]').length === 10 && $$('#e3Boxes .lbox[data-drop]').length === 5, 'S5I-003', 'both sorters carry drag items and drop targets');
  let ev = null; $('#s7List').addEventListener('sorter:placed', (e) => { ev = e.detail; });
  click($$('#s7List .chip')[0]); click($$('#s7Boxes .lbox')[0]);
  say(ev && ev.i === 0 && ev.k === 'tool' && ev.ok === true && /1 of 8 placed · 1 right/.test(txt('#s7Out')) && /DRAFT/.test(txt('#s7Fig')), 'S5I-003', 'a placement fires sorter:placed with its index, bucket and verdict, and the figure follows');
  say(/or drag it there/.test(txt('#s7Out')) || /drag/.test(txt('#s7 .panel[data-task] .hint')), 'S5I-003', 'the sorter says the drag is there'); }

/* ---- §01 ---- */
{ const { $, $$, click, txt, copied, input, done } = load();
  say($$('#s1Fig .s1-row').length === 21 && $$('#s1Fig .s1-lab.lineup').length === 4 && $$('#s1Fig .s1-lab.leg').length === 8 && /Fable 5\.1/.test(txt('#s1Fig')) && /Opus 5\.5/.test(txt('#s1Fig')) && /Sonnet 5\.5/.test(txt('#s1Fig')) && /Haiku 4\.5/.test(txt('#s1Fig')) && /28 Sep 2027/.test(txt('#s1Fig')), 'S5I-004', '§01 calendar: 21 rows, four lineup models, eight legacy, with the not-sooner-than dates');
  say($$('#s1Out .conf[data-src="src-anthropic-models-overview"]').length === 0, 'S5I-004', '§01: no overview chip until pin B is read');
  click($$('#s1Pins button')[1]);
  say(/current lineup/.test(txt('#s1Out')) && $$('#s1Out .conf[data-src="src-anthropic-models-overview"]').length === 1, 'S5I-004', '§01: pin B names the current lineup with its chip');
  const rules = $$('#s1 .s1-rule[data-drag]');
  say(rules.length === 5 && $('#s1SlotGate[data-drop]') && $('#s1SlotQual[data-drop]') && $('#s1Adv').disabled, 'S5I-004', '§01 gate beat: five draggable rules, two drop slots, Advance waits');
  click($('#s1Gates [data-k="two"]')); click($('#s1SlotQual'));
  say(/is a model gate; this slot takes a quality rule/.test(txt('#s1GOut')) && !$('#s1SlotQual').classList.contains('filled'), 'S5I-004', '§01: a gate on the quality slot bounces with a why');
  click($('#s1SlotGate')); click($('#s1Quals [data-k="score"]')); click($('#s1SlotQual'));
  for (let i = 0; i < 4; i++) click($('#s1Adv'));
  const stamps = $$('#s1GFig .s1-gstamp.on text').map((t) => t.textContent).join('|');
  say(stamps === 'STOPPED|RUNS|SHIPPED 5 OF 5|RUNS|SHIPPED 5 OF 5|STOPPED|HELD 4 OF 5' && /No failure, no silent change/.test(txt('#s1GOut')) && $$('#s1GKey tbody tr').length === 6 && done('g2'), 'S5I-004', '§01: B with 2 across four generations stops twice with reasons, holds once with the check named, never fails; the key opens; g2 ticks');
  click($('#s1Copy'));
  say(/two newest generations/.test(copied()) && /five checks/.test(copied()) && /opened 4 October 2026/.test(copied()) && !/rubric/i.test(txt('#s1')), 'S5I-004', '§01: the two lines copy with the dated source; the page never says the banned word');
  click($('#s1Reset')); click($('#s1Gates [data-k="pin"]')); click($('#s1SlotGate')); click($('#s1Quals [data-k="looks"]')); click($('#s1SlotQual'));
  for (let i = 0; i < 4; i++) click($('#s1Adv'));
  say($$('#s1GFig .s1-gstamp.on text').map((t) => t.textContent).join('|') === 'RUNS|SHIPPED|FAILS|FAILS|FAILS' && /3 of 4 generations failed outright/.test(txt('#s1GOut')) && /Requests to retired models will fail/.test(txt('#s1GOut')), 'S5I-004', '§01: A with 1 runs once, then fails three times with the vendor’s sentence'); }

/* ---- §02 ---- */
{ const { $, $$, click, txt } = load();
  const files = $$('#s2Files .s2-file[data-drag]');
  say(files.length === 8 && $$('#s2 .s2-zone[data-drop]').length === 3 && /8 loose files/.test(txt('#s2 .s2-loose .plab')), 'S5I-005', '§02: eight loose files and three drop zones');
  click(files[0]); click($('#s2ZReadme'));
  say(/✗ Prompt 1\.pdf/.test(txt('#s2PkOut')) && /Still in hand/.test(txt('#s2PkOut')) && files[0].getAttribute('aria-pressed') === 'true', 'S5I-005', '§02: a wrong zone bounces with a why and the file stays in hand');
  click($('#s2ZZip')); click(files[1]); click($('#s2ZZip')); click(files[2]); click($('#s2ZZip'));
  say(/from 3 PDFs, in order/.test(txt('#s2LZip')) && $$('#s2LZip li').length === 1 && /prompt\.txt/.test(txt('#s2LZip')), 'S5I-005', '§02: three PDFs merge into one prompt.txt');
  [[3, 's2ZReadme'], [4, 's2ZZip'], [5, 's2ZZip'], [6, 's2ZOut'], [7, 's2ZOut']].forEach(([i, z]) => { click(files[i]); click($('#' + z)); });
  say(/8 of 8 placed/.test(txt('#s2PkOut')) && /one README read first, 3 named files in the zip, 2 left out/.test($('#s2Meter svg').getAttribute('aria-label')) && $('#s2PkKey').style.display === 'block' && /de-identify first/.test(txt('#s2LZip')), 'S5I-005', '§02: all placed, the meter reads two things in order, the key opens, the spreadsheet carries its stamp'); }

/* ---- §03 ---- */
{ const { $, $$, click, txt } = load();
  [1, 3, 4].forEach((i) => click($$('#s3Inputs button')[i])); click($('#s3Lock')); click($('#s3Run'));
  const a = wc(txt('#s3Out')), b = wc(txt('#s3Key'));
  say(a <= 159 && b <= 162, 'S5I-006', `§03: the result (${a} words, was 227) and the key (${b} words, was 232) are at least 30% shorter after a full run`);
  say(/3 of 6 broke\. You called 3 of 3, 0 false alarms\./.test(txt('#s3Out')) && /The input that broke it is the diagnosis\./.test(txt('#s3Out')), 'S5I-006', '§03: the mechanic and the diagnosis line are kept'); }

/* ---- §04 ---- */
{ const { $, $$, click, txt } = load();
  say(!$('#s4Note') && !$('#s4Copy') && $('#s4FlowWrap').hidden && $$('#s4 .panel').length === 1, 'S5I-007', '§04: the travelling note and its copy button are gone; the strip waits hidden');
  $$('#s4Rows .s4-opt[data-c="1"]').forEach((b) => click(b));
  say(!$('#s4FlowWrap').hidden && $$('#s4Flow .s4-fst').length === 5 && $$('#s4Flow .s4-fst.lit').length === 5 && /READY TO HAND OVER/.test(txt('#s4Flow')) && /README step 2/.test(txt('#s4Flow')) && /eight-digit number/.test(txt('#s4Flow')), 'S5I-007', '§04: three checkable fixes run the improved version across five stations to a stamp'); }

/* ---- §05 ---- */
{ const { $, $$, click, txt, input } = load();
  input($('#s5Guess'), 20); click($('#s5Lock')); click($('#s5Reveal'));
  const btns = $$('#s5Rows button');
  const specs = btns.map((b) => { click(b); return $$('#s5Out .s5-spec li').length; });
  say(specs.join() === '5,5,5,5' && $$('#s5Key .s5-spec li').length === 20 && !/graded/i.test(txt('#s5')), 'S5I-008', '§05: every trial carries five lines (task, people, tool, measured, who gained most) in the readout and the key');
  click(btns[1]);
  say(/18 consulting tasks around a new footwear product/.test(txt('#s5Out')) && /43% higher quality against 17%/.test(txt('#s5Out')) && $$('#s5Out .conf[data-src="src-dellacqua"]').length >= 1, 'S5I-008', '§05: the Dell’Acqua readout names the tasks and the below- and above-average split, chipped');
  click(btns[3]);
  say(/bug fixes, features, refactors/.test(txt('#s5Out')) && /coin flip per task/.test(txt('#s5Out')) && /believed 20% faster afterwards/.test(txt('#s5Out')), 'S5I-008', '§05: the METR readout names the task, the design and the belief'); }

/* ---- §06 ---- */
{ const { $, $$, click, txt, done } = load();
  const L = (i) => $$('#s6Fig .s6-port.src')[i], R = (i) => $$('#s6Fig .s6-port.dst')[i];
  const wire = (i, sk, dk) => { click($('#s6Src [data-k="' + sk + '"]')); click(L(i)); click($('#s6Dst [data-k="' + dk + '"]')); click(R(i)); };
  say($$('#s6 .s6-chip[data-drag]').length === 7 && $$('#s6Fig .s6-port[data-drop]').length === 10 && !$('#s6Mine') && !$('#s6MineOut') && !$('#s6Tools'), 'S5I-009', '§06: seven chips, ten ports, and no Your stack and no tool buttons');
  click($('#s6Src [data-k="file"]')); click(L(1));
  say(/A note-taker|hears the whole meeting|hears a conversation/.test(txt('#s6Out')) && /Still in hand/.test(txt('#s6Out')), 'S5I-009', '§06: a wrong source bounces with a why');
  wire(1, 'meet', 'vendor');
  say(/Tool 2 · Note-taker · wired/.test(txt('#s6Out')) && $$('#s6Out .q').length === 4 && $$('#s6Fig .s6-wire.lit').length === 2 && /42\.9%/.test(txt('#s6Out')), 'S5I-009', '§06: a right pair lights both wires and writes the four answers');
  wire(0, 'you', 'plan'); wire(2, 'file', 'vendor'); wire(3, 'file', 'vendor'); wire(4, 'pub', 'index');
  say(done('g7') && /5 of 5 wired/.test(txt('#s6Fig .s6-cnt')) && $('#s6Key').style.display === 'block' && /8% of visits against 15%/.test(txt('#s6Out')), 'S5I-009', '§06: all five wired ticks g7 and opens the key'); }

/* ---- §07 ---- */
{ const { $, $$, click, txt, done, input } = load();
  say($$('#libFig .sLib-row').length === 15 && $$('#libFig .sLib-desk').length === 12 && $$('#libPicks button').length === 4 && $('#libOwn') && $$('#libProps .sLib-prop[data-drag]').length === 3 && $$('#sLib .sLib-place[data-drop]').length === 3, 'S5I-010', '§07: fifteen rows, six desks, four questions, a text box, three draggable proposals, three places');
  click($$('#libPicks button')[0]);
  const route = $$('#libFig .sLib-route').map((t) => t.textContent).filter(Boolean).join(' > ');
  say(route === '1 gatekeeper > 2 de-identify > 3 meeting-prep > 4 record-writer' && /named no skill/.test(txt('#libOut')) && $$('#libOut .conf[data-src="src-claude-code-skills"]').length === 1, 'S5I-010', '§07: the Cole question routes through four skills and agents without naming one');
  click($$('#libPicks button')[1]);
  say(/orchestrator/.test(txt('#libFig')) && /compliance-check/.test(txt('#libFig')) && /2 questions sent/.test(txt('#libOut')), 'S5I-010', '§07: the transcript question brings in the orchestrator and the compliance check');
  input($('#libOwn'), 'hello there'); click($('#libSend'));
  say(/no skill matched/.test(txt('#libOut')) && /gatekeeper/.test(txt('#libOut')) && /record-writer/.test(txt('#libOut')) && !done('gl'), 'S5I-010', '§07: a question that matches nothing still runs the gatekeeper and the record; the gate waits for a push');
  click($('#libPush'));
  say(/Repository at v1\.5 · 6 of 6 desks at v1\.5/.test(txt('#libVer')) && $$('#libOut .conf[data-src="src-claude-code-org"]').length >= 1 && $$('#libOut .conf[data-src="src-claude-code-host"]').length === 1 && done('gl'), 'S5I-010', '§07: one push takes every desk to v1.5 with the two documentation chips; gl ticks');
  const props = $$('#libProps .sLib-prop');
  click(props[1]); click($('#libPRepo'));
  say(/✗/.test(txt('#libGovOut')) && /Still in hand/.test(txt('#libGovOut')), 'S5I-010', '§07: the unapproved plugin bounces off the repository');
  click($('#libPPolicy'));
  say(/blocked by enterprise policy/.test(txt('#libGovOut')) && $$('#libGovOut .conf[data-src="src-claude-code-org"]').length === 1, 'S5I-010', '§07: on the policy it is refused with the documentation’s words');
  click(props[0]); click($('#libPRepo')); click(props[2]); click($('#libPDesk'));
  say(/estate-summariser/.test(txt('#libFig')) && /3 of 3 placed/.test(txt('#libGovOut')) && $('#libKey').style.display === 'block' && $$('#libGovOut .conf[data-src="src-claude-code-settings"]').length === 1, 'S5I-010', '§07: the new skill lands in the repository as a row in review; the older model is refused by the settings lock; the key opens'); }

/* ---- §08 ---- */
{ const { $, $$, click, txt } = load();
  const items = () => $$('#s7Rank .s7-ri'), order = () => items().map((l) => l.getAttribute('data-k'));
  say(items().length === 6 && items().every((l) => l.hasAttribute('data-drag') && l.hasAttribute('data-drop')) && order().join() === 'cost,ret,comm,rel,alone,advice' && !$('#s7Facts'), 'S5I-011', '§08: six reasons to drag into order; the button-drawn bars are gone');
  const up = (k) => click(items().find((l) => l.getAttribute('data-k') === k).querySelector('[data-mv="-1"]'));
  for (let i = 0; i < 5; i++) up('advice'); up('rel'); up('rel'); up('rel');
  click($('#s7RankLock')); click($('#s7Show'));
  const wid = $$('#s7RankFig .s7-rbar').map((r) => +r.getAttribute('width'));
  say(wid[0] > wid[1] && wid[1] > wid[2] && wid[5] > 0 && /of 6 in place/.test(txt('#s7RankFig')) && /You put the advice and the relationship in the top two/.test(txt('#s7FactOut')) && /32%/.test(txt('#s7FactOut')) && /7%/.test(txt('#s7FactOut')), 'S5I-011', '§08: lock, reveal, bars in the survey’s order, the top-two sentence and the three facts'); }

/* ---- §09 ---- */
{ const { $, $$, input } = load();
  const q = $$('#s8Quiz .qitem'); q.forEach((it) => { const b = [...it.querySelectorAll('.qbtns button')].find((x) => x.dataset.k === 'b'); if (b) b.dispatchEvent(new (b.ownerDocument.defaultView.MouseEvent)('click', { bubbles: true })); });
  input($('#s8Tool'), 9); input($('#s8Self'), 2);
  const you = $('#s8Fig .s8-you');
  say(you.getAttribute('transform') === 'translate(-154 0)' && !you.style.transform && $('#s8Fig .s8-rust').style.opacity === '' && $('#s8Fig .s8-strip').style.opacity === '' && $('#s8Fig .s8-rust .s8-rect').style.fillOpacity === '0.94', 'S5I-012', '§09: the marker moves by an attribute transform and emphasis is fill-opacity on rectangles; no group that holds text carries an opacity');
  say(!/\.s8-you\{transition:transform/.test(html) && /\.s8-bar rect\{transition:fill-opacity/.test(html), 'S5I-012', '§09: the CSS no longer transitions the marker group’s transform'); }

/* ---- sources, words, docs ---- */
{ const src = readFileSync('SOURCES.md', 'utf8'), footer = html.slice(html.indexOf('<footer'));
  const keys = ['src-anthropic-models-overview', 'src-claude-code-skills', 'src-claude-code-marketplace', 'src-claude-code-org', 'src-claude-code-host', 'src-claude-code-settings'];
  say(keys.every((k) => src.includes('## ' + k)) && keys.every((k) => new RegExp(`<li id="${k}"`).test(footer)) && keys.every((k) => new RegExp(`## ${k}[\\s\\S]*?last_retrieved: 2026-10-04`).test(src)), 'S5I-013', 'six new records, all retrieved 2026-10-04, all rendered in the footer');
  say(/src-anthropic-deprecations[\s\S]*?last_retrieved: 2026-10-04/.test(src) && /Re-checked 2026-10-04/.test(src) && /still blocked on 2026-10-04/.test(src), 'S5I-013', 'the deprecations record was re-opened and the blocked records carry a dated re-check note');
  const body = html.slice(html.indexOf('<div class="wrap">'), html.indexOf('<footer')).replace(/<script>[\s\S]*?<\/script>/g, '').replace(/<!-- CASE:BEGIN[\s\S]*?CASE:END[^>]*-->/g, '').replace(/<[^>]+>/g, ' ');
  const scriptText = html.slice(html.indexOf('<script>'), html.lastIndexOf('</script>'));
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric|canvas|the instructor)\b/i.test(body) && !/—|–/.test(body) && !/\b(submitted|deadline|rubric|graded)\b/i.test(scriptText.replace(/\/\*[\s\S]*?\*\//g, '')), 'S5I-013', 'no course-policy word and no em or en dash in the authored body, nor in a string the script writes');
  const run = readFileSync('instructor-notes/session-5.md', 'utf8'), polls = readFileSync('instructor-notes/session-5-polls.md', 'utf8'), aid = readFileSync('instructor-notes/session-5-teaching-aid.md', 'utf8'), mt = readFileSync('MAINTAINING.md', 'utf8'), hub = readFileSync('index.html', 'utf8');
  say(/\| 8:25 \| §07\./.test(run) && /\| 8:42 \| \*\*Closing check\*\*/.test(run) && /### sLib · §07, 8:25/.test(run) && /Poll 4 · 8:47/.test(polls) && /8:25 §07 ONE REPOSITORY/.test(aid) && /59 core \+ 66 appendix = 125/.test(mt) && /fifteen of them from one repository/.test(hub), 'S5I-014', 'the run sheet, the polls, the aid, MAINTAINING and the hub card carry the new section and clock');
  say(existsSync('instructor-notes/session-5-teaching-aid.pdf') && /rewritten 2026-10-04/.test(readFileSync('instructor-notes/session-5-teaching-aid.htm', 'utf8')), 'S5I-014', 'the aid source says it was rewritten and its PDF exists'); }

/* ---- the override on a fresh page ---- */
{ const { $$, errs, shiftU, d } = load();
  $$('#tierbar button[data-level="2"]')[0].click();
  shiftU();
  say(errs.length === 0 && d.querySelectorAll('.check.done').length === 16 && [...d.querySelectorAll('.keyhide')].every((k) => k.style.display === 'block'), 'S5I-015', `a fresh page: Shift+U ticks all 16 gates and opens every key with no error${errs.length ? ' (' + errs.slice(0, 2).join(' | ') + ')' : ''}`); }

console.log(`\nsummary: ${fails ? fails + ' failed' : 'all passed'}`);
process.exit(fails ? 1 : 0);
