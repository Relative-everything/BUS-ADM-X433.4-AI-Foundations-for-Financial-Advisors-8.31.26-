#!/usr/bin/env node
/* One DOM assertion per ledger row a DOM check can prove. Run from the repo
   root with NODE_PATH at a node_modules holding jsdom:
   node docs/changes/2026-10-02-session-5-build/checks.mjs */
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
const html = readFileSync('session-5/index.html', 'utf8');
/* The page is loaded with prefers-reduced-motion so every tween lands in the same tick
   the click does; the assertions then read final states, not frames. */
const noMotion = () => ({ matches: true, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, beforeParse(win) { win.matchMedia = noMotion; } });
const w = dom.window, d = w.document;
const $ = (s) => d.querySelector(s);
const $$ = (s) => [...d.querySelectorAll(s)];
const txt = (s) => ($(s) ? $(s).textContent.replace(/\s+/g, ' ') : '');
const click = (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const input = (el, v) => { if (!el) return; el.value = String(v); el.dispatchEvent(new w.Event('input', { bubbles: true })); el.dispatchEvent(new w.Event('change', { bubbles: true })); };
const done = (g) => !!$('[data-gate="' + g + '"]') && $('[data-gate="' + g + '"]').classList.contains('done');
let fails = 0;
const say = (ok, id, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
let copied = '';
Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: (t) => { copied = t; return Promise.resolve(); } }, configurable: true });

say(true, 'S5B-001', 'the change folder exists and this file runs');

/* ---- the shell ---- */
{ const secs = $$('section.slide'), core = secs.filter((s) => !s.classList.contains('apx') && !s.classList.contains('apxdiv')), apx = secs.filter((s) => s.classList.contains('apx'));
  const mins = (list) => list.reduce((a, s) => a + parseInt((s.querySelector('.mins') || {}).textContent || '0', 10), 0);
  /* 2026-10-04 (docs/changes/2026-10-04-session-5-interactivity, S5I-002): §07 One Repository, Every Desk joined the core, 10/54 became 11/59 */
  say(core.length === 11 && mins(core) === 59 && apx.length === 5 && mins(apx) === 66 && w.__coreMins === 59 && /59 min/.test(txt('#paceOut')),
    'S5B-002', `the shell: 11 core sections / 59 min, 5 appendix / 66 min, __coreMins 59, the pacing readout (found ${core.length}/${mins(core)} and ${apx.length}/${mins(apx)})`);
  say($$('#tierbar button').length === 4 && $('#caseBtn') && /CASE:BEGIN cole-household v4\.0/.test(html) && /SOURCES:BEGIN v1/.test(html) && /APXBUDGET:BEGIN/.test(html) && /APXPANEL:BEGIN/.test(html),
    'S5B-002', 'tier bar, case button, and the four generated regions are present');
  say($$('[data-task]').length === 16 && $$('[data-gate]').length === 16, 'S5B-002', `16 interaction roots and 16 gates (found ${$$('[data-task]').length} / ${$$('[data-gate]').length})`); }

/* ---- the lists and the lock (file-level) ---- */
say(/'session-5'/.test(readFileSync('scripts/build-appendix.mjs', 'utf8')) && /'session-5'/.test(readFileSync('scripts/verify-editorial.mjs', 'utf8')) && /session-5\/index\.html/.test(readFileSync('scripts/verify-migration.mjs', 'utf8')),
  'S5B-003', 'session-5 is in the generator and checker lists');
{ const base = JSON.parse(readFileSync('scripts/editorial-baseline.json', 'utf8'));
  say(base.A8.files['session-5'] && base.A9.files['session-5'], 'S5B-004', 'the editorial baseline carries session-5 entries'); }
{ const src = readFileSync('SOURCES.md', 'utf8');
  const keys = ['src-anthropic-deprecations', 'src-anthropic-deprecation-commitments', 'src-openai-retire-4o', 'src-noy-zhang', 'src-dellacqua', 'src-brynjolfsson', 'src-metr-2025', 'src-morningstar-fired', 'src-vanguard-alpha', 'src-cfp-psychology', 'src-rightcapital-iris', 'src-pew-ai-summaries', 'src-kitces-aisearch', 'src-investmentnews-t3-2026'];
  say(keys.every((k) => src.includes('## ' + k)) && /src-lee-cognitive[\s\S]*?confidence:\s+H/.test(src), 'S5B-005', '14 new records and the Lee record at H');
  const footer = html.slice(html.indexOf('<footer'));
  say(keys.every((k) => new RegExp(`<li id="${k}"`).test(footer)) && !/Does not exist|this build|DATA-PULL/.test(footer), 'S5B-005', 'every new record renders in the footer with no maintainer wording'); }
{ const hub = readFileSync('index.html', 'utf8'), rd = readFileSync('README.md', 'utf8'), mt = readFileSync('MAINTAINING.md', 'utf8');
  say(/href="session-5\/"/.test(hub) && !/Not yet published/.test(hub) && /\[session-5\]\(session-5\/\)/.test(rd) && /2026-10-02 the instructor\s+asked for the page/.test(mt.replace(/\n>\s*/g, ' ')),
    'S5B-006', 'hub card published, README row, MAINTAINING records the superseded decision'); }
say(/\| DW-125 \|/.test(readFileSync('docs/deferred-work.md', 'utf8')) && /\| DW-127 \|/.test(readFileSync('docs/deferred-work.md', 'utf8')), 'S5B-007', 'DW-125 to DW-127 are in the register');
say(existsSync('instructor-notes/session-5.md') && existsSync('instructor-notes/session-5-polls.md') && existsSync('instructor-notes/session-5-teaching-aid.pdf'), 'S5B-008', 'run sheet, polls and the aid exist');

/* ---- §00 ---- */
{ const qs = $$('#bridgeQuiz .qitem');
  qs.forEach((q) => { const b = [...q.querySelectorAll('.qbtns button')].find((x) => x.dataset.k === 'r' || /^\(b\)/.test(x.textContent)); click(b || q.querySelector('.qbtns button')); });
  say(qs.length === 3 && done('g1'), 'S5B-010', '§00: three recall items; answering all marks g1');
  const before = $$('#s0Stops button').map((b) => b.textContent).join('|');
  click($('#s0Adv')); click($('#s0Adv')); click($('#s0Adv'));
  const after = $$('#s0Stops button').map((b) => b.textContent).join('|');
  say(before === after && /ring did not|five are yours/i.test(txt('#s0Out')), 'S5B-011', '§00: advancing the model leaves the five stops unchanged and says so');
  $$('#s0Stops button').forEach((b) => click(b));
  say(/explain it, break it, improve it/i.test(txt('#s0Out')), 'S5B-011', '§00: all five stops seen writes the one-thing sentence'); }

/* ---- cold open ---- */
{ click($$('#coldPicks button')[0]); click($('#coldRank'));
  const o = txt('#coldOut') + ' ' + txt('#coldCmp');
  say(/3 of 8/.test(o) && /8 of 8/.test(o), 'S5B-012', 'cold open: Then scores 3 of 8 and Now 8 of 8 under the eight checks');
  click($('#coldAll'));
  say(done('gc') && /names the client/i.test(txt('#coldOut')), 'S5B-012', 'cold open: Test 2 marks gc and names which prompt could not be sent');
  say($('#coldMine') && $('#coldThen') && $('#coldNow') && $('#coldGo'), 'S5B-013', 'cold open: the two paste boxes for the learner\'s own prompts exist'); }

/* ---- §01 ---- */
{ const pins = $$('#s1Pins button'); click(pins[0]);
  const day = $('#s1Day');
  const toDay = (iso) => { const t0 = Date.UTC(2025, 6, 1), t = Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)); return Math.round((t - t0) / 86400000); };
  input(day, toDay('2026-10-02'));
  say(/Deprecated/i.test(txt('#s1Out')) && /30 November 2026/.test(txt('#s1Out')), 'S5B-014', '§01: pin A at 2 October 2026 reads deprecated with the retirement date');
  input(day, toDay('2026-12-01'));
  say(/Retired/i.test(txt('#s1Out')) && /Requests to retired models will fail/.test(txt('#s1Out')) && done('g2'), 'S5B-014', '§01: past 30 November reads retired with the vendor\'s sentence; the gate marks');
  click(pins[1]); say(/Active/i.test(txt('#s1Out')) && /28 September 2027/.test(txt('#s1Out')), 'S5B-014', '§01: pin B reads active with its not-sooner-than date');
  click(pins[2]); say(/whatever is current|untested/i.test(txt('#s1Out')), 'S5B-014', '§01: pin C reads untested');
  /* 2026-10-04: the maintenance card became The Gate and the Rubric (S5I-004); the copy now carries the two lines */
  copied = ''; click($('#s1Copy')); say(/two newest generations/.test(copied) && /five checks/.test(copied), 'S5B-015', '§01: the gate and rubric lines copy'); }

/* ---- E2 ---- */
{ const models = $$('#e2Models button'); click(models[0]); click($('#e2Run'));
  say(/5 of 5/.test(txt('#sE2')), 'S5B-016', 'E2: the model it was built on passes 5 of 5');
  click(models[1]); click($('#e2Run'));
  say(/4 of 5/.test(txt('#sE2')) && done('ga2'), 'S5B-016', 'E2: the replacement passes 4 of 5; the gate marks');
  click($('#e2Fix')); click($('#e2Run'));
  say(/5 of 5/.test(txt('#e2Out') + txt('#e2Fig')), 'S5B-016', 'E2: after the format fix the replacement passes 5 of 5');
  copied = ''; click($('#e2Copy')); say((copied.match(/Should return/g) || []).length === 5, 'S5B-016', 'E2: the template copies five rows'); }

/* ---- §02 ---- */
{ say(/Open prompt\.txt and paste it/.test(txt('#s2')) && /You are a CFP professional preparing for a client review meeting\./.test(txt('#s2')), 'S5B-017', '§02: the package renders from the shared data');
  const segs = $$('#s2 .seg'), slots = $$('#s2Board button');
  const slotFor = (k) => slots.find((b) => new RegExp(k, 'i').test(b.textContent));
  segs.forEach((s) => { click(s); const k = s.dataset.k || ''; const target = /tool/.test(k) ? slotFor('Tool') : /verify|check/.test(k) ? slotFor('Verification') : slotFor('structure'); click(target); });
  click(slotFor('tier')); click(slotFor('Data'));
  say(done('g3') && /NOT STATED/.test(txt('#s2Board') + txt('#s2Fig')) && /WEAK/.test(txt('#s2Board') + txt('#s2Fig')), 'S5B-017', '§02: placing every phrase marks g3; the two empty slots read NOT STATED; verification reads WEAK');
  copied = ''; click($('#s2Copy')); say(/Model tier: not stated/i.test(copied), 'S5B-018', '§02: the explanation copies with the tier not stated'); }

/* ---- §03 ---- */
{ const tiles = $$('#s3Inputs button'); click(tiles[1]); click(tiles[3]); click(tiles[4]); click(tiles[5]);
  const picked = tiles.filter((b) => b.getAttribute('aria-pressed') === 'true').length;
  say(picked === 3, 'S5B-019', `§03: a fourth pick is refused (${picked} picked)`);
  click($('#s3Lock')); click($('#s3Run'));
  say(/3 of 6 broke/.test(txt('#s3Out')) && done('g4') && /\$12 million/.test(txt('#s3')) && /48213907/.test(txt('#s3')), 'S5B-019', '§03: three of six break, the gate marks, the broken phrases show'); }

/* ---- E3 ---- */
{ const chips = $$('#e3List .chip'), boxes = $$('#e3Boxes .lbox');
  const key = ['sample', 'guess', 'passage', 'obey', 'carry', 'passage', 'guess', 'guess', 'carry', 'sample'];
  const boxFor = (k) => boxes[['guess', 'sample', 'passage', 'carry', 'obey'].indexOf(k)];
  chips.forEach((c, i) => { click(c); click(boxFor(key[i])); });
  say(chips.length === 10 && boxes.length === 5 && done('ga3') && /10 of 10/.test(txt('#e3Out') + txt('#e3Fig')), 'S5B-020', 'E3: ten items, five lanes, all placed marks ga3'); }

/* ---- §04 ---- */
{ say(/3 of 6/.test(txt('#s4Fig') + txt('#s4Out')), 'S5B-021', '§04: at load the figure reads 3 of 6');
  $$('#s4Rows').forEach(() => {});
  const rows = $$('#s4Rows > *');
  rows.forEach((r) => { const opts = [...r.querySelectorAll('button')]; const check = opts.find((b) => /NOT IN NOTE|CONFLICT|README step 2/.test(b.textContent)); click(check || opts[0]); });
  say(done('g5') && /6 of 6/.test(txt('#s4Fig') + txt('#s4Out')), 'S5B-021', '§04: three checkable picks read 6 of 6 and mark g5');
  /* 2026-10-04 (S5I-007): the travelling note left; when all three fixes are checkable the improved version runs across five stations */
  say(!$('#s4FlowWrap').hidden && $$('#s4Flow .s4-fst').length === 5 && $$('#s4Flow .s4-fst.lit').length === 5 && /READY TO HAND OVER/.test(txt('#s4Flow')), 'S5B-022', '§04: the improved version runs across five lit stations and stamps ready to hand over'); }

/* ---- E4 ---- */
{ for (let i = 0; i < 5; i++) { const opts = $$('#sE4 .btn.sel').filter((b) => !b.disabled && b.getAttribute('aria-disabled') !== 'true' && /Understood|Missed|package failed/i.test(b.textContent)); click(opts[0]); click($('#e4Next')); }
  say(done('ga4'), 'S5B-023', 'E4: five calls mark ga4'); }

/* ---- E1 ---- */
{ click($('#e1Start')); for (let i = 0; i < 5; i++) click($('#e1Next'));
  say(done('ga1') && !/NaN/.test(txt('#sE1')), 'S5B-024', 'E1: five Nexts mark ga1 with no NaN');
  copied = ''; click($('#e1Copy')); say(/beat|What it does/i.test(copied), 'S5B-024', 'E1: the outline copies'); }

/* ---- §05 ---- */
{ say($('#s5Reveal') && ($('#s5Reveal').disabled || $('#s5Reveal').getAttribute('aria-disabled') === 'true'), 'S5B-025', '§05: Reveal is disabled until Lock');
  input($('#s5Guess'), 30); click($('#s5Lock')); click($('#s5Reveal'));
  const f = txt('#s5Fig') + txt('#s5Out') + txt('#s5Key');
  say(done('g6') && /40/.test(f) && /25\.1/.test(f) && /14/.test(f) && /19/.test(f) && /20%/.test(txt('#s5Out')), 'S5B-025', '§05: the four trials reveal with their figures and the METR sentence; the gate marks');
  say(/Saves 45 minutes/.test(txt('#s5MyOut')) && /6 hours/.test(txt('#s5MyOut')), 'S5B-026', '§05: the defaults read saves 45 minutes a time and 6 hours a month'); }

/* ---- §06 ---- */
/* 2026-10-04 (S5I-009): §06 is Wire the Desk; a tool opens when both its ports are right, by drag or by chip-then-port */
{ const L = (i) => $$('#s6Fig .s6-port.src')[i], R = (i) => $$('#s6Fig .s6-port.dst')[i];
  const wire = (i, sk, dk) => { click($('#s6Src [data-k="' + sk + '"]')); click(L(i)); click($('#s6Dst [data-k="' + dk + '"]')); click(R(i)); };
  wire(1, 'meet', 'vendor');
  say(/42\.9%/.test(txt('#s6Out')) && /14/.test(txt('#s6Out')) && /In/.test(txt('#s6Out')) && /Keep/.test(txt('#s6Out')), 'S5B-027', '§06: the wired note-taker carries the survey shares and the four questions');
  wire(0, 'you', 'plan'); wire(2, 'file', 'vendor'); wire(3, 'file', 'vendor'); wire(4, 'pub', 'index');
  say(done('g7') && /8%/.test(txt('#s6Out')) && /15%/.test(txt('#s6Out')) && $$('#s6Fig .s6-wire.lit').length === 10, 'S5B-027', '§06: all five wired marks g7; AI search, wired last, carries the Pew rates');
  say(!/Jump|Zocks|Zeplyn|Wealthbox|Redtail|RightCapital/.test(txt('#s6 .panel') + txt('#s6 ul.pts') + txt('#s6 p.big')), 'S5B-027', '§06: no vendor is named outside the source line'); }

/* ---- §07 ---- */
{ const chips = $$('#s7List .chip'), boxes = $$('#s7Boxes .lbox');
  const key = ['tool', 'you', 'you', 'tool', 'you', 'tool', 'you', 'tool'];
  chips.forEach((c, i) => { click(c); click(boxes[key[i] === 'tool' ? 0 : 1]); });
  say(chips.length === 8 && done('g8') && /Four drafts/.test(txt('#s7Fig') + txt('#s7Out') + txt('#s7Key')), 'S5B-028', '§08: eight moments placed marks g8 with the closing caption');
  /* 2026-10-04 (S5I-010): the three bars became Rank the Reasons; the facts show after a lock and a reveal */
  click($('#s7RankLock')); click($('#s7Show'));
  say(/32%/.test(txt('#s7FactOut')) && /21%/.test(txt('#s7FactOut')) && /7%/.test(txt('#s7FactOut')) && /of 6 in place/.test(txt('#s7RankFig')), 'S5B-029', '§08: the three survey facts show after the ranking is locked and revealed');
  say(!/\$\s?\d/.test(txt('#s7')), 'S5B-028', '§08: no dollar figure in the section'); }

/* ---- E5 ---- */
{ const v1 = $$('#e5Vote1 button'); say($('#e5Cases') && ($('#e5Cases').hidden || $('#e5Cases').classList.contains('hidden') || $('#e5Cases').style.display === 'none' || $('#e5Cases').disabled), 'S5B-030', 'E5: the cases button waits for the first vote');
  click(v1[1]); click($('#e5Cases'));
  say($$('#e5Out [data-src="src-lee-cognitive"]').length >= 1 && $$('#e5Out [data-src="src-morningstar-fired"]').length >= 1, 'S5B-030', 'E5: the six cards carry their chips');
  click($('#e5Twist')); click($('#e5Again')); click($$('#e5Vote2 button')[2]);
  say(done('ga5') && /vote/i.test(txt('#e5Out') + txt('#e5Out2')), 'S5B-030', 'E5: the second vote marks ga5'); }

/* ---- §08 ---- */
{ const qs = $$('#s8Quiz .qitem');
  qs.forEach((q) => { const b = [...q.querySelectorAll('.qbtns button')].find((x) => /^\(b\)/.test(x.textContent)); click(b); });
  say(qs.length === 2 && done('g9'), 'S5B-031', '§08: two commits mark g9');
  input($('#s8Tool'), 9); input($('#s8Self'), 1);
  say(/least checking|skip/i.test(txt('#s8Out')), 'S5B-031', '§08: high trust and low self-confidence reads the survey\'s pattern for the least checking');
  say(/319/.test(txt('#s8')) && /936/.test(txt('#s8')) && /0\.69/.test(txt('#s8')) && /0\.26/.test(txt('#s8')), 'S5B-031', '§08: the paper\'s figures are on the section');
  $('#s8Carry').value = 'Time the next one.'; click($('#s8Seal'));
  say(/It predicts; it does not know/.test(txt('#s8Five')) && $$('#s8 .s8gates .s8gate, #s8 .s8gate').length === 4, 'S5B-032', '§08: Seal reveals the five principles; the closing check has four stops'); }

/* ---- page-wide ---- */
{ const prose = html.slice(html.indexOf('<body>')).replace(/<!--\s*CASE:BEGIN[\s\S]*?CASE:END[^>]*-->/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const bodyProse = prose.slice(0, prose.indexOf('<footer'));
  say(!/—|&mdash;|–|&ndash;/.test(bodyProse), 'S5B-033', 'no em or en dash in the authored body');
  say(!/\b(tonight|due|deadline|submit|submitted|submission|grade|graded|grading|rubric)\b/i.test(bodyProse.replace(/<[^>]+>/g, ' ')), 'S5B-033', 'no course-policy words on the page');
  const errs = [];
  const dom2 = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true });
  dom2.window.addEventListener('error', (e) => errs.push(String(e.error || e.message)));
  dom2.window.document.dispatchEvent(new dom2.window.KeyboardEvent('keydown', { key: 'U', shiftKey: true, bubbles: true }));
  say(errs.length === 0 && dom2.window.document.querySelectorAll('.check.done').length === 16, 'S5B-034', 'a fresh page: Shift+U ticks all 16 gates with no error'); }

console.log(`\nsummary: ${fails ? fails + ' failed' : 'all passed'}`);
process.exit(fails ? 1 : 0);
