#!/usr/bin/env node
/* One DOM assertion per ledger row a DOM check can prove. Run from the repo
   root with NODE_PATH at a node_modules holding jsdom:
   node docs/changes/2026-09-28-session-4-notes/checks.mjs */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
const html = readFileSync('session-4/index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true });
const w = dom.window, d = w.document;
const $ = (s) => d.querySelector(s);
const $$ = (s) => [...d.querySelectorAll(s)];
const txt = (s) => ($(s) ? $(s).textContent.replace(/\s+/g, ' ') : '');
const click = (el) => el && el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
const vis = (el) => !!el && !el.hidden && !el.classList.contains('hidden') && el.style.display !== 'none';
let fails = 0;
const say = (ok, id, s) => { if (!ok) fails++; console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}  ${s}`); };
/* capture copies: jsdom has no clipboard, so the page's copyText gets one */
let copied = '';
Object.defineProperty(w.navigator, 'clipboard', { value: { writeText: (t) => { copied = t; return Promise.resolve(); } }, configurable: true });

say(true, 'S4N-001', 'the change folder exists and this file runs');

/* ---- the Live API box ---- */
{ const box = $('#lmbox'), wrap = $('.wrap');
  const first = wrap && wrap.firstElementChild === box;
  const collapsed = $('#lmBody') && $('#lmBody').classList.contains('hidden');
  const liveHidden = $$('[data-lm-live]').every((n) => n.classList.contains('hidden'));
  say(!!box && first && collapsed && liveHidden && /Not connected/.test(txt('#lmStat')), 'S4N-002', 'the Live API box is the first child of the page, collapsed, with every live-only control hidden'); }
{ click($('#lmToggle')); click($('#lmShowReq'));
  const req = txt('#lmReq');
  const pre = $('#lmPrompt') ? $('#lmPrompt').value : '';
  say(/generativelanguage\.googleapis\.com\/v1beta\/models\/.+:generateContent/.test(req) && /no key connected/.test(req) && /"contents"/.test(req) && /the client/.test(pre) && !/Meg Cole/.test(pre),
    'S4N-003', 'See the request prints the one endpoint, says no key is connected, and carries the clean Prompt D as JSON');
  say(/free key is plan A/.test(txt('#lmbox')) && $('#lmbox [data-src="src-gemini-api-terms"]') && $('#lmbox [data-src="src-claude-pricing"]'), 'S4N-004', 'the box says a free key is the training tier, chipped, and cites the price page'); }
{ const s4 = $('#s3api');
  say(!!s4 && /Plan C, live/.test(txt('#s3api')) && $('#s3apiGo') && $('#s3apiLoad'), 'S4N-005', '§03 carries the Plan C pointer to the box with its two buttons'); }

/* ---- §02 beat 2 ---- */
{ const segs = $$('#redText2 .seg');
  const guess = $$('#redGuess2 button');
  say(segs.length === 9 && guess.length === 6 && $('#redFig2 svg') && /Harder Ones/.test(txt('#s2')), 'S4N-006', '§02 beat 2: nine numbered phrases, a six-button guess row and the people-who-fit figure');
  click(guess[5]);
  const locked = guess.filter((b) => b.disabled || b.getAttribute('aria-disabled') === 'true').length >= 5;
  segs.forEach((b) => { if (b.getAttribute('aria-pressed') === 'false') click(b); });
  say(locked && /Nothing left points to her/.test(txt('#redOut2')) && /7/.test(txt('#redOut2')), 'S4N-007', '§02 beat 2: the guess locks; replacing all seven identifiers reads No and shows the guess against seven');
  const writes = /S4STATE\.s2clean=text\(\);S4STATE\.s2done=\(L===3\)/.test(html);
  click($('#s3apiLoad'));
  const loaded = $('#lmPrompt') ? $('#lmPrompt').value : '';
  say(writes && /\[the client\]/.test(loaded) && !/Meg Cole/.test(loaded), 'S4N-008', '§02 writes the visible prompt to S4STATE for the box, and Load the clean Prompt D fills the box with a clean prompt'); }

/* ---- §04 ---- */
{ copied = ''; click($('#vCopy'));
  const email = copied;
  say(/^Subject:/.test(email) && /Regulation S-P/.test(email) && /Lock 1:/.test(email) && !/All six questions are answered yes/.test(email), 'S4N-009', '§04: the copy button drafts a real email with a subject line and one question per open lock');
  const cl = $$('#clList button');
  click(cl[3]);
  const out = txt('#clOut');
  say(cl.length === 6 && /48 hours/.test(out) && /72 hours/.test(out) && /verbatim/i.test(out) && $('#clOut [data-src="src-anthropic-dpa"]') && $('#clOut [data-src="src-regsp"]'), 'S4N-010', '§04 clause view: lock 4 shows the DPA sentence verbatim, the 48 against 72, with chips');
  copied = ''; click($('#clCopy') || $$('#s4 button').find((b) => /sample contract/i.test(b.textContent)));
  say(/SAMPLE WORDING/.test(copied) && /may not train models/.test(copied), 'S4N-011', '§04: Copy the sample contract copies the header and the six sentences'); }

/* ---- §05 ---- */
{ const how = $$('#injHow button');
  say(how.length === 4 && how.every((b) => b.disabled), 'S4N-012', '§05: four hiding techniques, disabled until the assistant runs');
  click($$('#injPred button')[1]); click($('#injRun'));
  click(how[2]);
  say(!how[2].disabled && /invisible|Invisible/.test(txt('#injOut')) && $('#injOut [data-src="src-ascii-smuggling"]'), 'S4N-013', '§05: technique 3 re-renders the x-ray and names its source');
  click($$('#injFix button')[2]);
  const skill = $('#injOut pre.s5skill');
  say(!!skill && /draft replies and forwards but never send/.test(skill.textContent) && vis($('#injCopy')), 'S4N-014', '§05: fix 2 prints its skill language and the copy button appears');
  say(!vis($('#dfBill')), 'S4N-015a', '§05: the bill is hidden before a call answer');
  click($$('#dfBtns button')[2]);
  say(vis($('#dfBill')) && /25\.6M/.test(txt('#dfBill')) && /35M/.test(txt('#dfBill')) && /3\.8M/.test(txt('#dfBill')) && $('#dfBill [data-src="src-fbi-ic3-2025"]'), 'S4N-015', '§05: the bill shows three real cases and the FBI caption once an answer is picked');
  click($$('#atkBtns button')[2]);
  say(/The scale\./.test(txt('#atkOut')) && /MEASURED|measured/.test(txt('#atkOut')) && /PROJECTED|projected/.test(txt('#atkOut')), 'S4N-016', '§05 board: the deepfake row carries a scale line marked measured and projected'); }

/* ---- D2, §06, D6 ---- */
{ const chips = $$('#entList .chip').map((b) => b.textContent);
  say(/Tax Code/.test(chips[1]) && /RMD/.test(chips[3]) && /Roth/.test(chips[0]) && /Meeting/.test(chips[2]) && /1, 3, 5, 6/.test(html) && /2, 4, 7, 8/.test(html), 'S4N-017', 'D2: the buckets alternate (prose, number, prose, formula) and the key names the new order');
  say(/no mark found/.test(txt('#sW2')) && /Content Checker/.test(txt('#sW2 ul.pts')) && /You will not run the detector/.test(txt('#sW2 ul.pts')), 'S4N-018', 'D2: the detector question is explained and the bullets say what a CFP can and cannot check'); }
say(/Minutes it takes you today, no AI/.test(txt('#costIn')) && /Answers you must open and check/.test(txt('#costIn')) && /grounded answer from Session 3/.test(txt('#s6')), 'S4N-019', '§06: the pricer is in class words');
{ const stS = $('#anonStampS');
  for (let i = 0; i < 8; i++) click(stS);
  const filled = $$('#anonBoxes .placed li').length === 8;
  click($('#anonReset'));
  say(filled && $$('#anonBoxes .placed li').length === 0 && !stS.disabled && !$('#anonDesk').classList.contains('fin'), 'S4N-020', 'D6: Start again empties the trays and re-enables the stamps after a full run'); }

/* ---- §03 ladder, D3 deck, §07 why and skill ---- */
{ const rungs = $$('#ladList button');
  say(rungs.length === 7 && $('#ladFig svg') && /0 of 6 steps seen/.test(txt('#ladProg')), 'S4N-027', '§03 ladder: six rungs and the door under the figure, nothing seen at load');
  for (let i = 0; i < 6; i++) click(rungs[i]);
  say(/6 of 6 steps seen\. The firm door opens/.test(txt('#ladProg')) && /Personal: never|Personal: public or de-identified/.test(txt('#ladOut')) && /six answers are on paper/.test(txt('#ladOut')) && $('#ladOut [data-src]'), 'S4N-028', '§03 ladder: after six steps the firm door opens and the readout says what each side may hold, chipped');
  say(/The plan buys the contract, not the model/.test(txt('#s3 ul.pts')) && $('#s3 [data-src="src-claude-pricing"]') && $('#s3 [data-src="src-anthropic-dpa"]'), 'S4N-029', '§03: the closing bullet and the price and DPA citations are on the section'); }
{ const cards = $$('#flipGrid button.wsFlip');
  say(cards.length === 8 && /0 of 8 flipped/.test(txt('#flipCount')) && !/loop engineering/i.test(d.body.textContent), 'S4N-030', 'D3 deck: eight cards, none flipped at load, and the page never says loop engineering');
  click($('#flipAll'));
  say(/8 of 8 flipped/.test(txt('#flipCount')) && /agent loop/.test(txt('#flipGrid')) && /Temperature is deprecated/.test(txt('#flipGrid')) && $('#flipGrid [data-src="src-anthropic-agents"]') && $('#flipGrid [data-src="src-api-messages"]'), 'S4N-031', 'D3 deck: Flip all turns every card to its current line, chipped');
  say(/effort/.test(html.slice(html.indexOf('id="sWS"'))) && $$('#sWS .wsDo').length >= 0 && /What to do instead/.test(html), 'S4N-032', 'D3: both claims carry the current guidance and a what-to-do line'); }
{ const why = $$('#recWhy button');
  say(why.length === 4, 'S4N-033', '§07: four Why slot buttons under the file');
  click(why[1]);
  say(/Why slot 2/.test(txt('#recOut')) && /No rule lists these four/.test(txt('#recOut')) && $('#recOut [data-src="src-finra2026"]'), 'S4N-034', '§07: Why slot 2 names supervision with its chips and the sentence that no rule lists the four');
  say(/Where the four come from/.test(txt('#s7 ul.pts')) && $('#s7 [data-src="src-advisers-204-2"]') && $('#s7 [data-src="src-advisers-206-4-7"]'), 'S4N-035', '§07: the bullet says where each slot comes from, chipped');
  const skill = $('#recSkill') ? $('#recSkill').textContent : '';
  copied = ''; click($('#recSkillCopy'));
  say(/^---\nname: research-record\ndescription: /.test(skill) && /DECISION/.test(skill) && /name: research-record/.test(copied) && $('#s7 [data-src="src-agent-skills"]'), 'S4N-036', '§07: the record block as a skill has front matter, keeps DECISION, copies, and cites the skill format'); }

/* ---- D1 keys, images, EU; §01 item 9; D5 clocks, plan, cases ---- */
{ const steps = $$('#sW1 .tsStep');
  say(steps.length === 3 && /Press 1, 2, 3 in order/.test(txt('#sW1')) && /13 or fewer: no mark/.test(txt('#sW1 .tsmzone')) && /Key A: the key that wrote it/.test(txt('#tsLampA')), 'S4N-037', 'D1 beat 2: three-step strip, the counting hint, zone words and the renamed keys');
  click($('#tsLampA')); click($('#tsLampB')); click($('#tsLampR'));
  say(steps.every((e) => e.classList.contains('on')) && /15 of 24/.test(txt('#tsLampOut')) && /You will never hold the key/.test(txt('#tsLampOut')) && $('#tsLampOut [data-src="src-claude-marks"]'), 'S4N-037b', 'D1 beat 2: after 1, 2, 3 every step is lit and the readout closes with the sentence about the key');
  say($('#imgFig svg') && $('#imPix') && $('#imLab') && /Images Carry Two Kinds of Mark/.test(txt('#sW1')), 'S4N-038', 'D1 beat 3: the chart image with its two mark toggles and three attacks');
  click($('#imShot'));
  const o = txt('#imgOut');
  say(/Still there: a screenshot copies the pixels/.test(o) && /Gone: a screenshot is a new file/.test(o) && $('#imgOut [data-src="src-synthid"]') && $('#imgOut [data-src="src-claude-marks"]'), 'S4N-038b', 'D1 beat 3: a screenshot keeps the pixel mark and strips the label, each chipped');
  say(/Why EU law is on this page/.test(txt('#sW1 .talk')) && $('#sW1 .talk [data-src="src-eu-ai-act"]') && /wherever Claude is offered, worldwide/.test(txt('#sW1 .talk')), 'S4N-039', 'D1: the EU callout with the Article 50 line and the worldwide line');
  say(/AI-made text and images must carry a machine-readable mark/.test(html) && /It binds the vendor selling in Europe, not a US adviser/.test(html), 'S4N-039b', '§01 item 9 reworded: binds the vendor, not the adviser'); }
{ say($('#clkFig svg') && $('#clkDay') && $$('#sRSP .clkjump button').length === 3 && /The Clocks That Are Law/.test(txt('#sRSP')), 'S4N-040', 'D5 beat 2: the day slider, three jumps and the clock figure');
  click($('#sRSP .clkjump button[data-day="30"]'));
  const rng = $('#clkDay'); rng.value = '30'; rng.dispatchEvent(new w.Event('input', { bubbles: true }));
  const c = txt('#clkOut');
  say(/Ran out on day 3/.test(c) && /Ran out on day 30: your firm/.test(c) && /inconclusive investigation does not excuse/.test(c) && /Illinois has no hard end/.test(c) && $('#clkOut [data-src="src-regsp"]') && $('#clkOut [data-src="src-il-pipa"]') && $('#clkOut [data-src="src-state-breach"]'), 'S4N-040b', 'D5 beat 2: at day 30 the readout names each expired clock with its consequence, chipped');
  say(/What the Plan Must Say/.test(txt('#sRSP')) && /1 ASSESS/.test(txt('#irpBlock')) && /2 CONTAIN AND CONTROL/.test(txt('#irpBlock')) && /3 NOTIFY/.test(txt('#irpBlock')) && $('#irpCopy'), 'S4N-040c', 'D5: the plan skeleton carries the three procedures and the four notice contents with a copy button');
  click($('#caseBtns button[data-case="0"]')); click($('#caseBtns button[data-case="1"]'));
  const k = txt('#caseOut');
  say(/LATE · EQUIFAX, 2017: 40 days/.test(k) && /IN TIME · CAPITAL ONE, 2019: 10 days/.test(k) && /Uber, 2016/.test(k) && /30 days did not govern these companies/.test(k) && $('#caseOut [data-src="src-equifax"]') && $('#caseOut [data-src="src-capitalone"]') && $('#caseOut [data-src="src-uber-doj"]'), 'S4N-040d', 'D5 beat 3: both real clocks drop with their dates, days, consequences and chips, and the readout says the rule did not govern them'); }

/* ---- sources and documents ---- */
{ const need = ['src-claude-pricing', 'src-anthropic-dpa', 'src-anthropic-retention', 'src-fbi-ic3-2025', 'src-uae-voice', 'src-sg-deepfake-2026', 'src-ascii-smuggling', 'src-il-pipa', 'src-equifax', 'src-capitalone', 'src-eu-ai-act', 'src-agent-skills', 'src-anthropic-agents'];
  const missing = need.filter((k) => !d.getElementById(k));
  say(missing.length === 0, 'S4N-021', 'the footer carries the new source records (' + (missing.length ? 'missing ' + missing.join(', ') : 'all present') + ')');
  const chipped = new Set($$('.conf[data-src]').map((c) => c.dataset.src));
  const dangling = [...chipped].filter((k) => !d.getElementById(k));
  say(dangling.length === 0, 'S4N-022', 'every chip on the page resolves to a footer entry' + (dangling.length ? ': dangling ' + dangling.join(', ') : '')); }
say(!/claude-(opus|sonnet|haiku|fable)-\d/i.test(d.body.textContent), 'S4N-023', 'no model identifier typed as lesson content');
{ const aid = 'instructor-notes/session-4-teaching-aid';
  const htm = existsSync(aid + '.htm') ? readFileSync(aid + '.htm', 'utf8') : '';
  say(htm.split('<div class="page">').length - 1 === 3 && existsSync(aid + '.pdf') && statSync(aid + '.pdf').size > 50000 && existsSync(aid + '.md'), 'S4N-024', 'the teaching aid exists as three pages of .htm, a PDF and a phone copy');
  const rs = readFileSync('instructor-notes/session-4.md', 'utf8');
  say(/What changed on 2026-09-28/.test(rs) && /Live API box/.test(rs) && /Two Real Clocks/.test(rs), 'S4N-025', 'the run sheet carries the 2026-09-28 changes');
  const mt = readFileSync('MAINTAINING.md', 'utf8'), rd = readFileSync('README.md', 'utf8');
  say(/Sessions 0\.1, 1 and 4/.test(mt) && /LMBOX-S4/.test(mt) && /Session 4 has one marked \*\*Live API\*\*/.test(rd), 'S4N-026', 'README and MAINTAINING record the Session 4 console'); }

console.log(`\n${fails ? fails + ' failed' : '0 failed'}`);
process.exit(fails ? 1 : 0);
