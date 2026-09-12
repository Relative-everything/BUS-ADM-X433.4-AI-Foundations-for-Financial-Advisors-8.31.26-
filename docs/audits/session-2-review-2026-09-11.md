# Session 2 review order, 2026-09-11, session-2/index.html @ 98e9686, 262,586 bytes

Scope: the file on disk at `98e9686` (merge of PR #22), read section by section in document order, against the Session 1 baseline (`session-1/index.html`, 274,696 bytes) with the three Session 1 errata excluded from the baseline (watermark traceability, FP Alpha classification, the §7872 threshold conflation; none of the three reappears in Session 2, checked by grep). Two passes: Pass 1 found 140 findings (§10 below), Pass 2 scored and ranked them (§3 to §5). Nothing in the repository was changed. Four untracked paths were created: `scripts/audit/section_profile.mjs`, `docs/audits/profiles/session-1.json`, `docs/audits/profiles/session-2.json`, and this file. jsdom was installed in the session scratchpad only (not in the tree) so the DOM-mode validator and the profiler could execute the page.

Known-item tags: `DW-nnn` is a row in `docs/deferred-work.md`; `S2-nn` is a finding id in `audit/SESSION-2-CONTENT-AUDIT-2026-09-09.md`; `09-07 §12.4` is the PR C edit list in `audit/AUDIT-2026-09-07.md`. A finding that matches a row is still reported here and carries the tag.

## 1. Programmatic checks

Run from the skill root (the validators live in the interactive-lesson-builder skill, not the repo), with the `--case`/`--purge` values `MAINTAINING.md` prescribes.

```
$ python3 scripts/validate_lesson.py session-2/index.html --case Cole --purge "Okonkwo,Reyes,Adaeze,Ilesanmi" --require-timing --require-tagging
PASS  V1   managed style fence present exactly once
FAIL  V2   external request outside the fonts exception: https://platform.claude.com/docs/en/about-claude/pricing
FAIL  V2   external request outside the fonts exception: https://artificialanalysis.ai/models
FAIL  V2   external request outside the fonts exception: https://www.irs.gov/irb/2004-27_IRB
FAIL  V2   external request outside the fonts exception: https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/
FAIL  V2   external request outside the fonts exception: https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/
FAIL  V2   external request outside the fonts exception: https://aclanthology.org/2024.findings-emnlp.888/
WARN  V2   3 Google Fonts request(s): permitted exception; self-hosting retires it (typography.css header)
PASS  V3   no browser storage APIs
WARN  V4   3 .conf chip(s) without data-src (footer legend chips excepted; every claim chip needs a key)
PASS  V4   27 chip reference(s) resolve; 20 footer source(s)
WARN  V4   footer sources never referenced by a chip: src-anthropic-fluency, src-davidson, src-irc, src-kessler, src-laplace, src-morningstar, src-rr200464, src-rr8513, src-woelbing
PASS  V5   segments sum to 150 = allocated 150 = target 150
FAIL  V6   16 distinct interactions (band 13-15)
PASS  V6   9 distinct component types (minimum 6)
FAIL  V6   same component type in consecutive sections: multi-column-sorter, work-along-gate
PASS  V7   case 'Cole' present (46x) and labelled synthetic at introduction
PASS  V7   retired name 'Okonkwo' absent
PASS  V7   retired name 'Reyes' absent
PASS  V7   retired name 'Adaeze' absent
PASS  V7   retired name 'Ilesanmi' absent
PASS  V8   Shift+U override wired and visibly labelled
PASS  V9   prefers-reduced-motion handling present
PASS  V9   :focus-visible outline present
PASS  V10  title and footer agree on Session 2
INFO  C1   prose density 109.3 words per allocated minute (16396 words / 150 min; ratified band pending, 37-42 proposed)
INFO  C2   em dashes in rendered text: 73 (policy unratified for student-facing copy; see pedagogy s13)

RESULT: FAIL (8 fail, 3 warn)
exit=1
```
Reading: the six V2 failures are the footer's citation hyperlinks, an upstream validator defect (V2 matches any `href`; DW-029), not a page defect. The two V6 failures are page defects (F-132, F-133). The nine unreferenced footer sources are the `data-nochip` authority/background/fabricated entries the repo's own A15 rule exempts by kind; the two that A15 does NOT exempt (`src-pricing`, `src-google-ptcf`) are DW-021.

```
$ node scripts/validate_dom.js session-2/index.html            # static mode (jsdom absent from the tree)
MODE=static (jsdom not installed; id/gate cross-reference only)
OK    112/112 literal id lookups resolve
WARN  gate g1 is never marked by a component (Shift+U only)
WARN  gate ga1 is never marked by a component (Shift+U only)
WARN  gate ga2 is never marked by a component (Shift+U only)
WARN  gate g2 is never marked by a component (Shift+U only)
WARN  gate ga3 is never marked by a component (Shift+U only)
WARN  gate g3 is never marked by a component (Shift+U only)
WARN  gate g4 is never marked by a component (Shift+U only)
WARN  gate g5 is never marked by a component (Shift+U only)
WARN  gate g6 is never marked by a component (Shift+U only)
WARN  gate g7 is never marked by a component (Shift+U only)
WARN  gate ga4 is never marked by a component (Shift+U only)
WARN  gate g8 is never marked by a component (Shift+U only)
WARN  gate g9 is never marked by a component (Shift+U only)
WARN  gate ga5 is never marked by a component (Shift+U only)
WARN  gate g10 is never marked by a component (Shift+U only)
OK    16 gates inventoried
exit=0

$ NODE_PATH=<scratchpad>/jsdom-env/node_modules node scripts/validate_dom.js session-2/index.html   # DOM mode
MODE=jsdom (executing page scripts)
OK    scripts executed with no thrown errors
OK    Shift+U marked all 16 gate(s)
FAIL  #pnum did not flip to the revealed state
exit=1
```
Reading: validate_dom ran in BOTH modes. The DOM-mode FAIL is validator drift, not a page defect: the corpus renamed the override badge to `#ovr` when DW-085 closed on 2026-09-08 and the page flips `#ovr` to "Override ON — all answer panels revealed" (confirmed in a scratch jsdom harness, §9). Session 1 fails the same assertion for the same reason. FLAG-04.

```
$ python3 scripts/restyle_sweep.py . --check
OK    current  ./changelog/index.html
OK    current  ./index.html
OK    current  ./session-0.1/index.html
OK    current  ./session-1/index.html
OK    current  ./session-2/index.html
OK    current  ./session-3/index.html
OK    current  ./session-4/index.html
FAIL  no fence ./scripts/case-extract.html  (add the STYLE:BEGIN/END markers; see template.html)
FAIL  no fence ./scripts/case-flowchart.html  (add the STYLE:BEGIN/END markers; see template.html)
summary: 7 current, 0 stale, 2 without fence
exit=1
```
Reading: session-2 is current. The two failures are the generated HTML fragments `MAINTAINING.md` documents as deliberately fenceless; the repo substitutes `verify-style.mjs`, which here exits 1 on its hard-coded skill path (DW-080), so no style check exits 0 in this environment. The sweep's own line for session-2 is the evidence that matters.

```
$ node scripts/audit/section_profile.mjs session-1/index.html session-2/index.html   # JSDOM_PATH=<scratchpad>/jsdom-env/node_modules
session-1/index.html: 274696 bytes, 19 sections (18 lesson, 11 core); timing 150/150; dom=jsdom; wrote docs/audits/profiles/session-1.json
  interactions/section median 1 range 1,1; chips/100w median 0.31; sources/section median 1; prose w/min median 27.85; run(min, tagged) max 12.8; ICAP {"P":0,"A":9,"C":8,"I":1}
  consecutive repeats: doc [] core ["s5->s9:work-along-gate"] reading []
session-2/index.html: 262586 bytes, 17 sections (16 lesson, 11 core); timing 150/150; dom=jsdom; wrote docs/audits/profiles/session-2.json
  interactions/section median 1 range 0,2; chips/100w median 0; sources/section median 0; prose w/min median 55.85; run(min, tagged) max 13.4; ICAP {"P":0,"A":7,"C":8,"I":1}
  consecutive repeats: doc ["s1->s2:work-along-gate","s9->s10:multi-column-sorter"] core [] reading ["s1->s2:work-along-gate","s9->s10:multi-column-sorter"]
exit=0
```

Repo-side read-only checks at the same commit, all exit 0 unless stated: `inject-case.mjs --check` (6 current, stamp cba5438); `verify-case.mjs` (6 of 6 carry sha256 00ca14a86905e46f); `verify-migration.mjs` (15 passed; check 20 pins session-2's $522,086, $38,200, 3.82%); `verify-sources.mjs` (5 of 5; ADVISE: session-2 `src-pricing` and `src-google-ptcf` listed and never cited); `case-inventory.mjs --report-check` (current); `build-appendix.mjs --check` (session-2 core 11/69, appendix 5/81, total 150); `build-unsourced.mjs --check` (12 marked claims); `verify-editorial.mjs --advisory-only` (16 rules clean, 0 hard, 9 advisory, two of them session-2's A15 keys); `verify-style.mjs` exit 1 (skill path, DW-080).

**Session 1 norms** (profile method: words by the validator's C1 token rule over section source; prose = words outside tagged interaction roots; run = longest word run between interaction roots pro rata to allocated minutes; chips = `.conf` spans in the section; sources = distinct `data-src` keys; 18 lesson sections): interactions/section median 1 (range 1 to 1); chips per 100 words median 0.31 (range 0 to 1.33; 7 of 18 sections at 0); sources/section median 1 (range 0 to 2); prose 27.9 words/min median (range 0 to 77.3; the validator's whole-file C1 figure is 102.2 because it counts the case modal and footer); exposition run median 5.9 min, max 12.8 (A5 sampler lab; splitting at any interactive control instead of at tagged roots gives max 10.0); ICAP 0 P / 9 A / 8 C / 1 I; 12 distinct families; no consecutive-family repeat in document or reading order. Prose density is reported, not enforced (build-checklist Part C).

**Session 2 against the same method**: interactions median 1 (range 0 to 2; §05's quiz is untagged); chips/100 words median 0 (10 of 16 sections at 0); sources median 0; prose median 55.8 words/min (core sections 32 to 119); run max 13.4 min (B5, an artefact of the tag sitting on the vote panel; control-split max 10.7, B4); ICAP 0 P / 7 A / 8 C / 1 I; 9 families; two consecutive repeats in reading order (B1→B2, B4→§07).

**Absolute Session 2 requirements** (pedagogy s4 and the brief), checked directly: retrieval bridge 4 items ✓, ungraded ✓, commit-in-box ✓, 7 minutes ✗ (it shares a 6-minute §00 with the case cards, outcomes, time budget and "before we start"; no 7-minute row exists), per-item lock ✗ (F-002, F-006); cold-open ritual 8 min ✓, identical ✗ (1,327 vs 1,358 bytes, three text differences plus a wrapper; F-031); named discussion block: present as B5 with the full locked-vote/defence/complication/re-vote machine ✓, 20 minutes ✗ (18, and its four phase headings sum to 19), and it is appendix-tier and hidden at the default depth D5 keeps, so the delivered session runs no discussion block (F-117, F-118); six designed Zoom polls ✗ (one poll mechanism on the page, the B5 room tally; `instructor-notes/session-2.md` is one line; F-137); Shift+U one-way labelled override ✓ (badge `#ovr`, one-way, guarded against text inputs; harness); case block byte-identical ✓ (§8); 150 minutes ✓ (V5, eyebrows sum 150); 13 to 15 interactions ✗ (16 tagged, 17 by mechanism; F-132), at least one per section ✗ by tag (§05 at 0; F-082) ✓ by mechanism; ≥ 6 families ✓ (9); no family repeated in consecutive sections ✗ (F-133); no exposition run above 12 minutes ✓ at the section level by control split (max 10.7), with B5 at 13.4 by tag split as an artefact; no section gating ✓ (answer panels only; the depth control is a filter, not a gate).

## 2. Review order

§00 > §04 > §09 > §03 > §08 > Cold open > §07 > §01 > §02 > B5 > §06 > §05 > B2 > B3 > B1 > B4

Tier 1 (composite ≥ 9, or Broken or Accuracy at 3): §00, §04, §09, §03, §08, Cold open, §07, §01, §02, B5, §06, §05 (twelve of sixteen).
Tier 2 (5 to 8): B2, B3, B1, B4.
Tier 3 (3 to 4): none.
Skip (≤ 2 and no validator finding): the Appendix contents panel (`#apx`, a table of contents, not a lesson section).

Estimated manual review time, L: 229 minutes in total (per-section figures in the table). Ties broke on allocated minutes then document order: §03 (6 min) ahead of §08 (5 min) at 12.0; Cold open (8 min, earlier) ahead of §07 (8 min) ahead of §01 (5 min) at 11.5.

Read this before trusting the order: the composite is the brief's formula and it ranks §07 seventh although it carries the page's only BLOCKING-class item (F-102, the live-run prompt names the wrong instrument) and the two answer-key errors a learner would carry into Session 3 (F-103 to F-105). The formula rewards breadth of defect over depth. If Jared has less than four hours, §07 and §04 first, then §00 (FLAG-05).

## 3. Scores

Classes scored 0 to 3 (3 = worst). Composite = 1.5 × (Broken + Accuracy) + Non-informative + Overloaded + Inapplicable + Baseline gap, maximum 21. Baseline gap counts how many of five Session 1 medians the section falls short of (fewer interactions than 1, chip density below 0.31 per 100 words, fewer than 1 source, prose above 27.9 words/min, exposition run above 5.9 min): 0 → 0, 1 → 1, 2 → 2, 3 or more → 3. The ICAP mix is compared at file level only (§1).

| § | Heading | Min | Broken | Accuracy | Non-inf. | Overloaded | Inapplicable | Baseline gap | Composite | Tier | Review min |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 00 | Session map (s0) | 6 | 2 | 3 | 1 | 3 | 3 | 3 | 17.5 | 1 | 25 |
| 04 | Scoring Your Own Prompts Against P.T.C.F (s6b) | 7 | 1 | 3 | 2 | 2 | 3 | 3 | 16.0 | 1 | 20 |
| 09 | Final Project Part 1 and Baseline Capture (s12) | 7 | 1 | 2 | 1 | 3 | 1 | 3 | 12.5 | 1 | 15 |
| 03 | Persona, Task, Context, Format (s6) | 6 | 1 | 3 | 0 | 3 | 2 | 1 | 12.0 | 1 | 20 |
| 08 | Template Audit and Structured Peer Review (s11) | 5 | 1 | 1 | 2 | 1 | 3 | 3 | 12.0 | 1 | 8 |
| Cold | The Last Prompt You Sent (sCold) | 8 | 3 | 2 | 1 | 0 | 1 | 2 | 11.5 | 1 | 12 |
| 07 | Citation Failure Types on the Cole IDGT Transaction (s10) | 8 | 2 | 3 | 0 | 3 | 0 | 1 | 11.5 | 1 | 30 |
| 01 | Temperature and Output Variance (s3) | 5 | 1 | 2 | 1 | 3 | 0 | 3 | 11.5 | 1 | 15 |
| 02 | Cost Per Task Versus Cost Per Token (s5) | 6 | 1 | 3 | 1 | 3 | 0 | 1 | 11.0 | 1 | 20 |
| B5 | Specification Cost Against Task Cost (s12d) | 18 | 2 | 1 | 1 | 0 | 2 | 3 | 10.5 | 1 | 10 |
| 06 | The Interview Rewrite (s8) | 6 | 1 | 1 | 1 | 3 | 0 | 3 | 10.0 | 1 | 12 |
| 05 | Prompt Specification Triage (s7) | 5 | 2 | 1 | 0 | 2 | 0 | 3 | 9.5 | 1 | 10 |
| B2 | Laplace on Probability as a Measure of Ignorance (s2) | 15 | 1 | 1 | 2 | 0 | 0 | 3 | 8.0 | 2 | 8 |
| B3 | Sampling Failure on a Task That Requires Counting (s4) | 16 | 2 | 1 | 1 | 0 | 0 | 2 | 7.5 | 2 | 8 |
| B1 | Next-Token Probabilities for a Single Prompt (s1) | 16 | 1 | 1 | 2 | 0 | 0 | 1 | 6.0 | 2 | 8 |
| B4 | The Seven-Step Process and the Delegation Line (s9) | 16 | 1 | 2 | 0 | 0 | 0 | 1 | 5.5 | 2 | 8 |
| TOC | Appendix contents (apx) | (81) | 0 | 0 | 0 | 0 | 0 | 0 | 0.0 | Skip | 0 |

Baseline-gap misses by section: §00 chips, sources, prose · Cold chips, sources · §01 chips, sources, prose · §02 prose · §03 prose · §04 chips, sources, prose · §05 interactions (tag), chips, sources, prose · §06 chips, sources, prose · §07 prose · §08 chips, sources, prose · §09 chips, sources, prose · B1 run · B2 chips, sources, run · B3 chips (0.30 against 0.31, marginal), run · B4 run · B5 chips, sources, run (tag artefact).

## 4. Section cards (Tier 1 and Tier 2; every lesson section is one or the other)

### §00 Session map (Tier 1, composite 17.5, ~25 min)
Look at: the retrieval bridge (lines 1225 to 1231; `BRIDGE` at 2789 to 2797) and its 6-minute home; the four case cards (1238 to 1243) and the paragraph at 1246; the outcomes card at 1251; the "before we start" block (1271 to 1274); the tier bar (1213 to 1221).
Findings: F-001 to F-018.
What fixed looks like: bridge item 4 replaced with D3's text and its key aligned to CASE.md Part J (endowment named, relationship separate); the bridge given its own 7-minute row or the eyebrow made honest about it; per-item reveal that locks the textarea; the four cohort-false sentences (1246, 1251, 1273, 1272) reworded per 09-07 §12.4 and D4/D5; a `.src` line keyed `src-case` under the cards and `src-wolfram`/`src-aa` under the bridge keys; the density trimmed toward the Session 1 band before the live share (DW-093); one lit depth button at load.
Confidence: H on every mechanical item; M on the density judgement (method unratified).

### §04 Scoring Your Own Prompts Against P.T.C.F (Tier 1, composite 16.0, ~20 min)
Look at: the `.verify` block (1591 to 1601) against what §07's key actually states (2607 to 2621); the two premise sentences (1603, 1605); the paste box (1617) against the scorer (2853 to 2875); the discernment-statement paragraph (1643).
Findings: F-071 to F-081.
What fixed looks like: the R3 gate lists Rev. Rul. 85-13, Rev. Rul. 2004-64 Situations 1 to 3, §§ 2036(a)(1), 2038, 2702, 7520, the discount, and the §05 portability item, names §07 not §05, and drops the five authorities that are not on the page; 1603 states what is true for this room (eight checks heard, not rendered or scored); the fixture panel of DW-090 lands above the paste boxes so a learner with no templates has three; the paste box either feeds the §06 regexes as a hint row or stops promising a measurement; 1643 dropped under D4.
Confidence: H on the gate contents and the premise; M on the ICAP judgement of the tile scorer.

### §09 Final Project Part 1 and Baseline Capture (Tier 1, composite 12.5, ~15 min)
Look at: checklist item 5 (2765); the baseline record's break-even line (2751); the checklist host tag (1957); the density of the two closing paragraphs (1968 to 1975) inside 7 minutes.
Findings: F-124 to F-131.
What fixed looks like: "the baseline you recorded in Session 2"; "A 40% reduction, illustrative, recovers …"; the checklist retagged as the tick list it is and its id no longer named after §07; the Session 3 preview trimmed for the live share, the artefact-producing capture left untouched.
Confidence: H.

### §03 Persona, Task, Context, Format (Tier 1, composite 12.0, ~20 min)
Look at: the prompt-length panel (1575 to 1578) as a learner sees it, in bold; the Google guide's missing chip (1533, footer 2020); the Format string (2343) against the readout (2356); the decorative bars (2385 to 2389) and the effort table (1565 to 1568); the doit (1581).
Findings: F-062 to F-070.
What fixed looks like: the Anthropic claim keyed to its own record and the marker gone, or the sentence cut for Monday; an H chip to `src-google-ptcf` at 1533 (the October 2024 PDF is findable, so the record's `[UNVERIFIED]` link can close); readout says 200 words / four paragraphs; bars replaced with their labels or badged illustrative; "Large/Largest" reworded as the course's ranking; the doit pointing at the fixture pack and at the between-session audit rather than §08; IDGT expanded at 1535.
Confidence: H on the marker, chip and contradiction; M on the table wording.

### §08 Template Audit and Structured Peer Review (Tier 1, composite 12.0, ~8 min)
Look at: the four in-room sentences (1823, 1832, 1841, 1846) against decision D5; the rubric as an interaction (2648 to 2690).
Findings: F-113 to F-116.
What fixed looks like: the section framed as the between-session peer review D5 made it, with "section 04, the workshop" in place of "6b"; nothing else changes for Monday. The score is high because the page still says the room will do something the run sheet says it will not; the review itself is short.
Confidence: H.

### Cold open (Tier 1, composite 11.5, ~12 min)
Look at: the byte diff against Session 1 (§8 below); the literal `§04` at 1382; the analyser (3045 to 3067) against Session 1's `COLD_CHECKS` renderer (3238 to 3290); the readout's last line (3065).
Findings: F-031 to F-036.
What fixed looks like: the eight-check renderer copied verbatim from Session 1 (DW-066), one closing paragraph shared by all five lessons (DW-062 decided), no Session 1 comparison in the readout, `§04` rendered as a character not an escape. This is the ritual pedagogy s3.8 says never changes shape; it currently has three shapes across the corpus.
Confidence: H.

### §07 Citation Failure Types on the Cole IDGT Transaction (Tier 1, composite 11.5, ~30 min)
Look at: the live-run prompt (1812); `CITES` items 2 to 6 (2607 to 2621), especially the Situation 3 sentence (2615), the Davidson resemblance (2619) and the Kessler diagnosis (2621); the Magesh chip (1774); the absence of any `.verify` gate in this section.
Findings: F-102 to F-112.
What fixed looks like: "non-voting LLC units" at 1812; the Kessler feedback saying there is no discount appraisal in the file (aligns with 1975); Situation 3 stated as the ruling states it, after Jared reads 2004-27 I.R.B. himself (the host is egress-blocked from here); Davidson described as self-cancelling installment notes with the real point of contact (principal outstanding at the seller's death); both Woelbing dockets named; the second chip at 1774 rewired to `src-magesh`; a `.verify` block in this section listing the four rulings.
Confidence: H on F-102, F-103, F-106, F-107; M on F-104 (ruling text not retrieved); H on F-105 after two secondary sources on 2026-09-11 recorded the instrument as SCINs.

### §01 Temperature and Output Variance (Tier 1, composite 11.5, ~15 min)
Look at: the bars (1405 to 1414) and the temperature JS (2172 to 2210) for a `.sim` and a `.src`; the three T = 0 strings (1405, 2186, 2206); the stance strings (2837 to 2838); the tag on the vote panel (1391); the minute arithmetic (vote + slider + cards + 4-minute doit in 5).
Findings: F-037 to F-044.
What fixed looks like: `.sim` "ten hand-picked candidates weighted 1/n" under the bars and a `.src` carrying the Wolfram H chip; T = 0 described as greedy in this simulation with real APIs still varying; "the rest of this section"; the majority clause dropped; the vote panel retagged `prediction-commit` and the slider panel given the sandbox tag; either the doit cut to one prompt or the section given the minutes it uses.
Confidence: H on the mechanical items; M on the T = 0 wording (depends on the DW-092 correction being delivered).

### §02 Cost Per Task Versus Cost Per Token (Tier 1, composite 11.0, ~20 min)
Look at: `MODELS` (2258 to 2264) against `SOURCES.md` (no OpenAI record); the slopegraph caption chips (1501); Finding cards (1489 to 1494); the four unsourced sentences (1474, 1494, 1513, 1523); the `.sim` badge (1481); the estimator tag and prose (1504 to 1506); the toggle (1484).
Findings: F-050 to F-061.
What fixed looks like: a `src-openai-pricing` record and chip; 1501 rewired to `src-pricing`; "threefold" qualified to the pair the chart shows; the 300M/71M clause marked `[UNVERIFIED, needs source]` until the DW-081 re-pull; `.sim` replaced by a plain span; the estimator retagged `parameter-sandbox` with a `.csrc`; the toggle labelled by state; a one-line box for the tier sentence. The Anthropic rates were checked against platform.claude.com on 2026-09-11 and agree (Sonnet 5's introductory $2/$10 is now standard; the scheduled 1 September rise did not happen), so the arithmetic on the page is sound; the provenance is what is broken.
Confidence: H on provenance and arithmetic; M on the density judgement.

### B5 Specification Cost Against Task Cost (Tier 1, composite 10.5, ~10 min)
Look at: the four phase headings (1868, 1878, 1890, 1898) against the eyebrow (1862); the "already on screen" card (1894); the bare figures (1895); the tier and depth (1860: `apx`, `standard`).
Findings: F-117 to F-123.
What fixed looks like: one phase shortened by a minute or the eyebrow raised to 19 with the 150 rule in view; the §09 card cut or reworded; the 3% and 52.2% chipped where they repeat; and a recorded decision (DW-050 or a new row) that a core-only Session 2 runs no discussion block, so the next audit does not re-find it. The machine itself works end to end (harness, §9).
Confidence: H.

### §06 The Interview Rewrite (Tier 1, composite 10.0, ~12 min)
Look at: the minute arithmetic (a live model run, the ten-question tick list, the diagnostic and a 5-minute doit in 6 minutes); the transparent-text hiding (2960); 1677 and 1689.
Findings: F-088 to F-094.
What fixed looks like: PR D's first-to-drop decision recorded (09-09 §4 makes the case for §06 over §05); the list rendered only on reveal; a chip on the Wolfram attribution; "the buy-sell agreement CPC inherited".
Confidence: H on the mechanical items; M on the drop recommendation.

### §05 Prompt Specification Triage (Tier 1, composite 9.5, ~10 min)
Look at: the untagged host (1662) and the tag that wandered to §07 (1796); item 6 and 7 feedback (2427 to 2431) against the §04 gate's claim that Rev. Procs are cited here; 1667.
Findings: F-082 to F-087.
What fixed looks like: `data-task="t-s7" data-comp="commit-first-mcq"` on `#quiz` and `t-s10c` on the triage (DW-101), which alone moves this section to Tier 2 (composite 8.0); the room-splitting claim dropped; either an authority named for the portability item or the gate reworded. The quiz itself is the page's cleanest family-3 instance: per-item lock, per-option feedback, runs with nothing pasted (harness).
Confidence: H.

### B2 Laplace on Probability as a Measure of Ignorance (Tier 2, composite 8.0, ~8 min)
Look at: the constructed answer set (2163 to 2166); the tag (1347); the two toggles as an interaction; gate ga2 (1366).
Findings: F-026 to F-030.
What fixed looks like: `.sim` "constructed answer set, not a model's output" in the panel; retagged `spoiler-reveal`; a one-line box for the sentence the gate asks for, or the gate reworded. Hidden at the default depth; nothing here reaches the room on Monday under D5.
Confidence: H.

### B3 Sampling Failure on a Task That Requires Counting (Tier 2, composite 7.5, ~8 min)
Look at: the predictor's three probabilities (2217 to 2221) and the illegal-token path (2225 to 2232); 1442; gate ga3 (1467).
Findings: F-045 to F-049.
What fixed looks like: bars badged as not a distribution or renormalised; the illegal option disabled (`pointer-events:none` on `.pbar.dead`) or the count floored at zero with a message; "a network of roughly 400,000 weights" chipped to `src-wolfram`; the gate asking for what the widget produces.
Confidence: H on the -1 path (reproduced); M on the Wolfram figures (essay not retrievable here).

### B1 Next-Token Probabilities for a Single Prompt (Tier 2, composite 6.0, ~8 min)
Look at: 1332; 2114; 2153; the tag (1306).
Findings: F-019 to F-025.
What fixed looks like: the callback dropped or pointed at §01's actual exercise; "the run ended at the step limit"; the axis label scoped to the models Wolfram describes; retagged `distribution-picker`. The section's additive value over Session 1 §02 is the question for Jared, not for an edit.
Confidence: H.

### B4 The Seven-Step Process and the Delegation Line (Tier 2, composite 5.5, ~8 min)
Look at: the adoption chart rows (2549 to 2553) against the `src-t3-survey` record's scope; 2500; 1733.
Findings: F-095 to F-101.
What fixed looks like: the 41.8% row dropped or the record extended; the subtitle's two figures split; the 3% chipped in the key; a CFP Board record for the seven step names. The sorter is the page's cleanest family-13 instance.
Confidence: M (record scopes are the evidence; the survey itself was not retrieved).

## 5. Tier 3 (defer): proposed deferred-work rows

No section scored Tier 3. The rows below are the findings in this report that no existing row or 09-09 finding carries; they are proposed regardless of the tier of the section they sit in, so nothing is silently dropped. (Renumbered 2026-09-12: the ids first printed here, DW-103 to DW-118, collided with DW-103 and DW-104, which PR A had already opened; the register rows opened on 2026-09-12 are DW-105 to DW-114 and cover P-01 to P-16 as the pre-flight handback maps them.)

| Proposed (P-nn) | § | Finding ids | One-line description |
|---|---|---|---|
| P-01 | §00 | F-002 | The retrieval bridge has no 7-minute allocation: it shares §00's six minutes with four case cards, four outcome cards, the time budget and the "before we start" block (pedagogy s4, bank family 5). |
| P-02 | §00 | F-003 | Bridge item 4's key omits the endowment and substitutes the relationship; CASE.md Part J and the page's own paragraph at 1246 name the endowment as the third landmine. Fold into the D3 replacement. |
| P-03 | §00 | F-016 | §00 has no `<h2>`; the `data-nav` "Session map" matches nothing on screen. |
| P-04 | §01 | F-037 | `t-s3`/`parameter-sandbox` sits on the stance-vote panel (family 4); the slider panel is untagged. |
| P-05 | §01, §03, §07, §02 | F-042, F-069, F-110, F-060 | Sections whose stated doit minutes plus widgets exceed their eyebrow (Part B item 7): §01 4-of-5, §03 5-of-6, §07 5-of-8, §02 4-of-6. Ratify a rule that a doit may not exceed half a section's minutes, or resize. |
| P-06 | §01 | F-041 | "Consumer chat tools do not expose T" is a vendor-feature claim with no chip and no as-of date. |
| P-07 | B2 | F-028 | Laplace's 1814 argument is paraphrased as fact with no chip; `src-laplace` is `nochip=background`. Decide whether a paraphrase of an assigned reading needs a chip (R2 says every factual claim does). |
| P-08 | B3 | F-048 | The illegal closing parenthesis is clickable; the external count reaches -1 and the END verdict prints "-1 open parenthesis". |
| P-09 | §03 | F-066 | "What comes back" renders bracketed simulated output with no `.sim` badge. |
| P-10 | §04 | F-072, F-074 | The R3 gate sits three sections before the content it gates; the learning-science claim at 1605 carries no chip. |
| P-11 | §05 | F-083, F-084 | "Item 7 splits the room every time" is unsourced; items 6 and 7 rest on portability and the 2026 exclusion with no authority named while the §04 gate says Rev. Procs are cited here. |
| P-12 | §08, §09 | F-115, F-131 | Unsourced course rules and readings: "below 5 will not survive a handoff"; Kitces (Jan 2025) and Iskowitz (Jul 2025) named with no footer entry. |
| P-13 | B5 | F-121 | Three cards sit under "Phase three — complication"; pedagogy s3.7 specifies one. Label the two "already on screen" cards as callbacks, not complications. |
| P-14 | file | F-137 | Six designed Zoom polls are owed for Session 2 and one poll mechanism exists (B5's room tally); the run sheet (DW-095, PR D) is where the other five would live. |
| P-15 | tooling | FLAG-04 | `validate_dom.js` asserts `#pnum`; the corpus uses `#ovr` since 2026-09-08. Upstream skill defect; both delivered lessons fail DOM mode for it. |
| P-16 | tooling | FLAG-03 | `restyle_sweep.py --check` cannot exit 0 in this tree (two documented fragments) and `verify-style.mjs` cannot exit 0 outside the skill's hard-coded path (DW-080); no style check is green in a fresh environment. |

## 6. L-chipped claims (with reason)

Three `.conf l` spans exist in the file; one is a claim chip.

| Line | Chip | Claim | Why L | Carries weight? |
|---|---|---|---|---|
| 1323 | `src-wolfram` L | "Individual token labels above are illustrative, not extracted from the published figure" (B1 power-law chart) | Illustrative construction: the ten words and the (1/n)/H10 weights are hand-picked; only the curve's shape is Wolfram's (the H chip beside it covers the shape). | No. The label is honest and the section badges the chart `.sim`. The in-panel percentages at 2118 to 2119 carry no badge (F-024). |
| 2029 | footer `src-case` L | The Cole household footer entry, "Entirely synthetic. Every figure ... is invented." | The footer's own terminal chip for a constructed case. | Not a page claim. But two chips in §02 (1501) key published vendor rates to this L-graded synthetic-case record with H and M labels (F-051). |
| 2039 | legend L | Footer legend | Sanctioned bare chip. | No. |

Claims that carry weight and should be L or `[UNVERIFIED]` but are chipped higher or not at all: the 300M/71M token counts (F-052, unchipped, weight-bearing for Finding 02); "n^-1 power law", "0.8", "400,000 weights", "15%" (F-024, F-038, F-047, attributed to Wolfram, unchipped in the panels; the essay could not be retrieved from this environment); the Rev. Rul. 2004-64 Situation 3 condition (F-104, stated as a holding in a scored key).

## 7. Open [UNVERIFIED] items

On the page: one marker, `[NEEDS SOURCE]` at line 1576 (rendered bold to learners at 1577; DW-073, F-062). `docs/unsourced-claims.md` carries it as item 5 of 12.

In `SOURCES.md` behind Session 2's chips, fields still reading `[UNVERIFIED, needs source]`: `src-t3-survey` (link, last_retrieved); `src-dahl-fictions` (link, last_retrieved); `src-magesh` (last_retrieved); `src-zheng-persona` (last_retrieved); `src-google-ptcf` (link, last_retrieved; a URL exists, see F-063); `src-charlotin` (link; partial retrieval date); `src-kitces-productivity` (link, last_retrieved); `src-aa` (session-1 index_version). `verify-sources.mjs` reports 53 records repo-wide with at least one such field.

Verified from this environment on 2026-09-11: Anthropic rates (platform.claude.com, fetched; all four Claude rows in `MODELS` agree; cache read 0.1x); Zheng et al. 162 roles / 4 families / 2,410 questions (ACL Anthology page, search snippet); Dahl et al. GPT-4 58% / GPT-3.5 69% / Llama 2 88% (Oxford JLA version, search snippet); Magesh et al. Lexis+ AI ~17% / Westlaw AI-AR ~33%, preregistered, JELS 2025 (search snippet); Woelbing dockets 30261-13 and 30260-13 with stipulated decisions 25 and 28 March 2016 (McGuireWoods, The Tax Adviser); Davidson docket 13748-13, filed 14 June 2013, stipulated 6 July 2015, ~$2.8B asserted, ~$388M settled, instrument SCINs (Stout, Crain's); Google Prompting Guide 101 with Persona/Task/Context/Format (services.google.com PDF, October 2024). Not verifiable from here (egress-blocked hosts): arxiv.org, aclanthology.org, reglab.stanford.edu, writings.stephenwolfram.com, damiencharlotin.com, irs.gov. Therefore still UNVERIFIED: Dahl's ">800,000 verifiable legal questions" (1774; the record repeats it; the JLA abstract could not be read); Magesh's "202" (record says "over 200"); Wolfram's 400,000 weights and 15% (1442); Rev. Rul. 2004-64 Situation 3 wording (2615); the current Charlotin count against 1,598 (DW-081).

## 8. Cold-open diff, case-block identity, data-nav mismatches

**Cold-open diff** (`<section id="sCold">` extracted from both files; Session 1 1,327 bytes, Session 2 1,358 bytes; `diff` exit 1):
```
2,3c2
<  <div class="body">
<   <div class="eyebrow"><span>01 &middot; Cold open &middot; standing ritual</span><span class="mins">8 min</span></div>
---
>   <div class="eyebrow"><span>Cold open &middot; standing ritual</span><span class="mins">8 min</span></div>
5c4
<   <p class="big">The last one, whatever it was, pasted exactly as you typed it: typos, missing context, all of it.</p>
---
>   <p class="big">Not a good one. Not a work one. The last one, whatever it was, pasted exactly as you typed it &mdash; typos, missing context, all of it.</p>
14,15c13
<   <p>Whatever you pasted, you wrote it for a machine that does exactly one thing: assign a probability to every possible next token and pick one. Nothing in it read your intent.</p>
<  </div>
---
>   <p>Same field, one session on. Session 1 said nothing in this prompt read your intent. Tonight you learn the framework that fixes it, and §04 scores the three templates you wrote against that framework.</p>
```
The ritual markup (`coldPrompt`, `coldGo`, `coldOut`, the label and placeholder) is identical. The JS behind the button is not: Session 1 renders eight fixed `COLD_CHECKS`; Session 2 runs the three-regex analyser (DW-066). Result: not identical (F-031, F-032, F-033).

**Case-block identity**: the span between `<!-- CASE:BEGIN cole-household v4.0 -->` and `<!-- CASE:END cole-household -->` is 44,464 bytes in both lessons and byte-identical (`diff` exit 0; sha256 prefix 3e040765df4ab08b on both). The repo's own checks agree: `verify-case.mjs` hashes all six lessons to 00ca14a86905e46f and `inject-case.mjs --check` reports six current at stamp cba5438. Method note: identity is to the block `build-case.mjs` generates from CASE.md, which is how this repository implements s5.1; it is not a byte comparison against CASE.md's markdown, which is a different artefact. Result: identical (verified).

**data-nav versus heading**: all 16 lesson sections carry a `data-nav` that differs from the `<h2>` (the nav labels are one to three words by design: "Temperature" against "Temperature and Output Variance"), and §00 has no `<h2>` at all (its nav "Session map" matches neither the `<h1>` nor the eyebrow; F-016). Only the Appendix contents panel matches. The brief cites a title sweep that found 66 mismatches across Sessions 2 to 4; no record of that sweep or that figure exists in `docs/deferred-work.md`, `CHANGELOG.md` or `audit/` (grep for "data-nav" and "title sweep" returns nothing), so Session 2's share of 66 is UNVERIFIED; by the strict test used here Session 2 contributes 16 of its 17 sections, and by the looser test (nav contained in heading) 4 of 17 mismatch (§00, §03 "P·T·C·F", §04 "Your prompts", §09 "Final project"). Whether short nav labels are a defect at all is the decision the sweep implies and this file cannot make (R6).

## 9. Verified programmatically vs. not verified

Verified (command and mode named in §1): the style fence is current; no browser storage; every chip resolves and every footer key is referenced or exempt by kind; timing sums to 150 with the eyebrows agreeing; the case block is the current generated block in all six lessons; retired names absent; Shift+U wired, labelled, one-way, and guarded against text inputs (DOM mode plus the scratch harness); all 16 gates mark under the override; zero script errors on load and through every widget path; every widget's reveal or answer panel opens on its designed action (bridge, cold open, B1, B2, stance, temperature, B3, frontier, estimator, P.T.C.F, quiz, diagnostic, buy-sell list, §04 scorer and scaffold, B4 sorter and key, triage, rubric, peer, B5 votes, timer and tally, baseline record, checklist, case modal); the frontier's four undominated points are correct from `MODELS`; every Finding-card percentage in §02 reproduces from `MODELS`; the four Claude rates match the vendor page on 2026-09-11; the appendix, cardsort, unsourced and case-inventory generated regions are current; 16 editorial rules clean.

Not verified, left for Jared (build-checklist Part B):
1. Every H chip re-checked against its primary source this build: NOT done for Wolfram (four figures), Dahl (the >800,000 count), Magesh (the 202 count), T3 (n, 95%, 42.9%), Kitces (the one-hour ratio), Charlotin (the four counts). Egress blocked the primary hosts; the vendor pricing page and secondary sources on the two Tax Court dockets were the only primaries reached.
2. Every legal characterisation behind a `.verify` block whose list names them all: NOT met (F-071, F-112); the §07 key states four rulings as holdings and no gate names them.
3. Deliberate defects labelled on page and footer: met for Kessler (page 2621 and panel intro 1793, gate 1600, footer 2030) except that the gate and footer locate it in §05 (F-071).
4. Case block byte-identical and labelled synthetic at introduction: met (§8; caseflag at 1234).
5. Section map honoured: NOT checkable; no section map or COURSE.md exists for Session 2 (FLAG-02). Interleaving exceptions are recorded (DW-094) but not marked deliberate anywhere.
6. Discussion block four phases, prepared cases, one complication, realistic minutes: phases present; prepared cases for both options exist in the vote buttons; three complication-phase cards (F-121); minutes 19 against 18 (F-117); the block is hidden under D5 (F-118).
7. Timing believed, not just summed: NOT met on the numbers here; four core sections carry a doit that consumes most of their minutes (F-042, F-060, F-069, F-110) and the 09-09 bottom-up model puts the core at 114 minutes for 69 planned.
8. Browser: clicked every interaction in jsdom, not a browser; not tested at 380 px; print preview not run; Shift+U cold after reload not run in a browser (DW-064's guard verified in jsdom only).
9. Repo hygiene: not applicable (nothing published).
10. This report is the delivery report for the audit, not for a build.

## 10. Pass 1 findings, in document order (nothing filtered)

Shape: id | § | element (line) | class | severity | confidence, then evidence and the known row. Line numbers are at `98e9686`; the quoted string is the durable locator. "dead gate" = a `[data-gate]` check no component ever calls `mark()` for (validate_dom static WARN; the cold open's `gc` is the only marked gate in the file).

### §00 Session map (s0, 6 min, lines 1209 to 1282)
F-001 | §00 | `data-task="t-s0" data-comp="retrieval-bridge"` (1213) | Broken | Low | H
  evidence: the tag sits on the pace and depth-control panel; `#bridge` (1227) carries no tag, so extractors credit family 5 to the wrong element.
  known: S2-46.
F-002 | §00 | retrieval bridge (1225 to 1231) inside a 6-minute section (eyebrow 1210) | Broken | Medium | H
  evidence: pedagogy s4 and bank family 5 specify 7 min, first section; the timing table has no bridge row; the bridge shares six minutes with four case cards, four outcome cards, the time budget and the before-we-start block.
  known: none (DW-093 records the density only).
F-003 | §00 | `BRIDGE[3].a` (2796) | Accuracy | Medium | H
  evidence: the key names the competitor approach, the plan and discount, and "separately from the file's own three" the relationship; CASE.md Part J ("Exactly three") lists the endowment and board seat as the third, and the page's own paragraph at 1246 says so.
  known: DW-088 (partial; the row replaces the item under D3 and does not record the key's contradiction).
F-004 | §00 | `BRIDGE[3].q` (2795) | Inapplicable | High | H
  evidence: asks for §08 content Session 1 never delivered (09-07 §2.4); decision D3 taken 2026-09-08; the tree at 98e9686 still carries the old item.
  known: DW-088.
F-005 | §00 | `BRIDGE[0].a` (2790), `BRIDGE[2].a` (2794) | Accuracy | Low | H
  evidence: "roughly 50,000 candidate tokens" with no chip and no era; "one fifth" derived with no chip.
  known: S2-12.
F-006 | §00 | bridge reveal (2815 to 2822) | Non-informative | Low | H
  evidence: one button opens all four keys; textareas stay editable after reveal (harness: `readOnly=false`); the family-5 commit-before-reveal contract holds for at most the item in hand.
  known: S2-25.
F-007 | §00 | 1235 | Accuracy | Low | H
  evidence: "Every worked example, exercise input and discussion prompt in this course draws on one household" restates the overclaim DW-071 narrowed on the hub.
  known: S2-13.
F-008 | §00 | 1246 | Accuracy | Medium | H
  evidence: "That is the boundary Session 1 established"; §08 never ran (09-07 §2.2).
  known: S2-03.
F-009 | §00 | 1251 | Accuracy | Medium | H
  evidence: "The three you wrote before being taught a framework"; the eight-point checklist was lectured 01:38 to 01:49.
  known: S2-04, DW-099.
F-010 | §00 | 1242 | Accuracy | Low | H
  evidence: "Non-voting LLC units moved to a grantor trust" reads as executed; CASE.md Part E opens "Nothing in this Part has been executed".
  known: S2-14.
F-011 | §00 | cards 1238 to 1246 | Accuracy | Medium | H
  evidence: about twenty case facts and three validator-pinned figures with zero chips in the section (profile: 0 chips, 0 sources); R2.
  known: S2-15.
F-012 | §00 | 1273 | Accuracy | Medium | H
  evidence: "all three templates, your cited techniques, and your discernment statement" against D4 (three templates only); "section 6b" is not a label on screen.
  known: DW-089, S2-16.
F-013 | §00 | 1272 | Inapplicable | Low | H
  evidence: "a partner's review of your work" as an in-room outcome; D5 moves §08 async.
  known: 09-07 §12.4 item 15; S2-17 class.
F-014 | §00 | tier bar (1217, 1219; `apply()` 3103 to 3123) | Broken | Low | H
  evidence: "+ Standard" and "Core only" both lit at load (harness); `apply()` never resyncs the level buttons.
  known: S2-47.
F-015 | §00 | gate g1 (1278) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.
F-016 | §00 | `<h1>` 1211; `data-nav` 1209 | Broken | Low | H
  evidence: the only lesson section without an `<h2>`; nav "Session map" matches neither the h1 nor the eyebrow.
  known: none.
F-017 | §00 | whole section | Overloaded | High | M
  evidence: 727 words / 6 min = 121 words/min (rendered 871) against the Session 1 median of 27.9; eight cards, a table and two prose blocks before the first doit.
  known: DW-093.
F-018 | §00 | 1226 | Inapplicable | Low | H
  evidence: "Fourteen days have passed since Session 1" is calendar deixis (true for this cohort, false for any other).
  known: DW-050, DW-075 class.

### B1 Next-Token Probabilities for a Single Prompt (s1, 16 min, 1298 to 1338)
F-019 | B1 | `t-s1` (1306) | Broken | Low | H
  evidence: `data-comp="work-along-gate"` on a ranked-bar distribution-picker (family 7).
  known: S2-28.
F-020 | B1 | 1332 | Non-informative | Low | H
  evidence: "We will come back to what you got in §01"; §01 sends a different prompt and never refers back.
  known: S2-39.
F-021 | B1 | JS 2114 | Accuracy | Low | H
  evidence: "Stop token reached" when `path.length>=MAXS` (8); no candidate list holds a stop token.
  known: S2-51.
F-022 | B1 | whole section | Non-informative | Medium | M
  evidence: re-runs Session 1 §02's picker over the same stem ("The best thing about AI is its ability to"); the 09-09 audit scored it additive 1.
  known: 09-09 §2.
F-023 | B1 | reading order s1 → s2 | Broken | Low | H
  evidence: both inserted after §00, both tagged work-along-gate; V6 FAIL.
  known: DW-094.
F-024 | B1 | in-panel percentages (2118 to 2119); axis label (2153) | Accuracy | Low | M
  evidence: (1/n)/H10 weights rendered as percentages with no `.sim` in the panel (the badge is on the chart only); "TOP TEN OF ROUGHLY 50,000 TOKENS" carries no era.
  known: 09-09 §5 note; S2-12 class.
F-025 | B1 | gate ga1 (1335) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.

### B2 Laplace on Probability as a Measure of Ignorance (s2, 15 min, 1339 to 1369)
F-026 | B2 | `t-s2` (1347) | Broken | Low | H
  evidence: tagged work-along-gate; the mechanism is two toggles revealing fixed text (family 2).
  known: S2-28.
F-027 | B2 | `lap()` 2163 to 2166 | Accuracy | Low | H
  evidence: a constructed answer set ("Yes, under §1014(b)(6)" p≈0.52, "see §2040" p≈0.11) presented as a model's output with no `.sim` and no `.src`.
  known: S2-40.
F-028 | B2 | 1343 to 1345 | Accuracy | Low | M
  evidence: "In 1814 Laplace proposed an intellect ..." is a claim about a text with no chip; `src-laplace` is `data-nochip="background"`; R2.
  known: none.
F-029 | B2 | gate ga2 (1366) | Broken | Low | H
  evidence: asks for a one-sentence answer the section provides no box for; dead gate.
  known: S2-24.
F-030 | B2 | toggles (1350 to 1353) | Non-informative | Medium | M
  evidence: the answer is recoverable without doing the task; ICAP A at best; the 09-09 audit scored it interactive 2.
  known: 09-09 §2.

### Cold open (sCold, 8 min, 1370 to 1386)
F-031 | Cold | section 1370 to 1386 against Session 1 1446 to 1464 | Broken | High | H
  evidence: 1,327 against 1,358 bytes; three text differences and a wrapper (§8); pedagogy s3.8 and s4 "identical every session"; `instructor-notes/session-2.md` says the same.
  known: DW-062, DW-066, DW-075.
F-032 | Cold | 1382 | Broken | Medium | H
  evidence: the HTML text contains the eight characters `§04`, a JavaScript escape in markup; it renders literally.
  known: 09-09 sCold note (no row).
F-033 | Cold | analyser 3045 to 3067 against Session 1 `COLD_CHECKS` 3238 to 3290 | Broken | Medium | H
  evidence: three regex checks and a free-form readout against Session 1's eight fixed checks, which are what the room heard on 08-31.
  known: DW-066.
F-034 | Cold | JS 3065 | Accuracy | Medium | H
  evidence: "Compare this against what you pasted in Session 1"; no learner pasted (09-07 §2.2, row 01).
  known: S2-02.
F-035 | Cold | JS 3052, 3061 | Accuracy | Low | M
  evidence: "roughly N tokens" is `chars/4` with no source.
  known: 09-09 sCold note.
F-036 | Cold | 1382 | Inapplicable | Low | H
  evidence: "Same field, one session on" and "Tonight" presume the Session 1 paste and the calendar.
  known: DW-075, S2-02.

### §01 Temperature and Output Variance (s3, 5 min, 1387 to 1435)
F-037 | §01 | `t-s3` (1391) | Broken | Low | H
  evidence: `data-comp="parameter-sandbox"` sits on the commit-first vote panel (family 4); the slider panel at 1402 is untagged.
  known: none.
F-038 | §01 | bars 1405 to 1414; JS 2172 to 2210 | Accuracy | Medium | H
  evidence: harmonic-series weights rendered as percentages with 0 `.sim` and 0 `.src` in the section; 0 chips while Wolfram is attributed three times (1401, 1403, 1405).
  known: S2-05, S2-15.
F-039 | §01 | tick 1405, JS 2186, 2206 | Accuracy | Medium | M
  evidence: "0.0 — deterministic", "argmax, no sampling", "Deterministic — and, as Wolfram notes ..." are the claim DW-092 item 4 retracts at 6:03 PM.
  known: S2-05, DW-092.
F-040 | §01 | JS 2837 to 2838 | Accuracy | Low | H
  evidence: "The next twelve minutes" inside a 5-minute section; "the majority answer in most rooms" has no basis (R1).
  known: S2-27.
F-041 | §01 | 1421 | Accuracy | Low | M
  evidence: "Consumer chat tools do not expose T" is a vendor-feature claim with no chip and no as-of date.
  known: none.
F-042 | §01 | whole section | Overloaded | High | M
  evidence: 410 words / 5 min = 82 words/min; a locked vote, a slider demo, three cards and a 4-minute doit inside 5 minutes (Part B item 7).
  known: none (DW-093 class).
F-043 | §01 | slider demo | Non-informative | Low | M
  evidence: re-runs the three-temperature demo the room watched 02:05 to 02:12 on 08-31.
  known: 09-09 §2.
F-044 | §01 | gate g2 (1432) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.

### B3 Sampling Failure on a Task That Requires Counting (s4, 16 min, 1436 to 1470)
F-045 | B3 | `t-s4` (1444) | Broken | Low | H
  evidence: tagged work-along-gate; three-button predictor (family 7).
  known: S2-28.
F-046 | B3 | JS 2217 to 2221; 2244 | Accuracy | Low | H
  evidence: 0.45 / 0.15 / 0.15 sum to 75% in the balanced state, the bank's named family-7 failure; "the figure Wolfram reports" in the verdict carries no chip.
  known: S2-40, S2-41.
F-047 | B3 | 1442 | Accuracy | Low | M
  evidence: "After roughly 400,000 trained weights, he reports" turns a network size into a training milestone; neither 400,000 nor 15% is chipped; the essay could not be retrieved to check either.
  known: S2-41.
F-048 | B3 | illegal-token click (JS 2225 to 2232; CSS 582) | Broken | Low | H
  evidence: the "✗ illegal" close is clickable (`.pbar.dead` sets only the fill colour); the external count reaches -1 and END prints "-1 open parenthesis" (harness).
  known: none.
F-049 | B3 | gate ga3 (1467) | Broken | Low | H
  evidence: "a confidently wrong count" the widget never computes; dead gate.
  known: S2-24.

### §02 Cost Per Task Versus Cost Per Token (s5, 6 min, 1471 to 1529)
F-050 | §02 | `MODELS` 2258 to 2264 | Accuracy | Medium | H
  evidence: GPT-5.6 Sol, Terra and Luna rates drive the slopegraph, hover strings and estimator; `grep -i openai SOURCES.md` returns nothing.
  known: S2-06.
F-051 | §02 | csrc 1501 | Accuracy | Medium | H
  evidence: "computed at a 3:1 input-to-output ratio from published rates" chipped H, and the ratio assumption M, both to `src-case`, the synthetic household graded L in the footer.
  known: S2-19, DW-020.
F-052 | §02 | 1493 | Accuracy | Medium | M
  evidence: "it generated 300M tokens across the index suite against a 71M median" appears once in the repository, outside `src-aa`'s stated session-2 scope.
  known: S2-06.
F-053 | §02 | 1474 | Accuracy | Low | H
  evidence: "can differ threefold" at the same token price: from `MODELS`, Opus 5 / Opus 4.8 differ 1.13×, Sol / Opus 5 1.95×; the nearest-price pair Sonnet 5 / Terra 4.4×; no pair is 3×.
  known: S2-21.
F-054 | §02 | 1494, 1513, 1523 | Accuracy | Low | M
  evidence: "has not been since late July", "a $20 monthly plan", "changed four times between June and August 2026", "has already reversed once": no record for any.
  known: S2-21.
F-055 | §02 | 1487; `src-aa` record | Accuracy | Low | M
  evidence: Opus 5's $2.03 / index 61 chipped H; the record says the session-2 figures are "IDENTICAL to the session-1 pull", which had no Opus 5.
  known: S2-18, DW-022.
F-056 | §02 | 1481 | Accuracy | Low | H
  evidence: `.sim` badge on published data; B1 uses the same badge to mean constructed.
  known: S2-20.
F-057 | §02 | `t-s5` (1504); 1506 | Broken | Low | H
  evidence: a three-input estimator (family 6) tagged `click-map-explorer`; "uses a 3:1 ratio" while the inputs are independent; no `.src` on the instance.
  known: S2-22.
F-058 | §02 | 1484; JS 2300 | Broken | Low | H
  evidence: "Show efficient frontier" while the frontier is shown; the first click hides it (harness: label flips to "Frontier hidden").
  known: S2-48.
F-059 | §02 | doit 1516 to 1519 | Non-informative | Low | H
  evidence: the tier decision §09 and Session 3's rubric consume has no box to be written in.
  known: S2-23.
F-060 | §02 | whole section | Overloaded | High | M
  evidence: 567 words / 6 min = 94.5 words/min; two charts, three cards, an estimator, a warn panel and a 4-minute doit.
  known: none (DW-093 class).
F-061 | §02 | gate g3 (1526) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.

### §03 Persona, Task, Context, Format (s6, 6 min, 1530 to 1587)
F-062 | §03 | 1576 to 1577 | Accuracy | High | H
  evidence: "Anthropic reports removing more than 80 percent ... [NEEDS SOURCE]" renders the marker in bold to learners, chipped M to `src-case`; the CLAIM comment beside it names the candidate source.
  known: DW-073.
F-063 | §03 | 1533; footer 2020 | Accuracy | Medium | H
  evidence: "Google's prompting guide" is taught with no chip to `src-google-ptcf` anywhere (A15 ADVISE); the record's link is `[UNVERIFIED]` although the October 2024 PDF is findable.
  known: DW-021.
F-064 | §03 | `t-s6` (1537) | Broken | Low | H
  evidence: tagged work-along-gate; a four-toggle builder-assembler (family 15); §03 then §04 is family 15 twice by mechanism.
  known: S2-28.
F-065 | §03 | `PTCF.F` 2343; readout 2356 | Accuracy | Low | H
  evidence: the Format string specifies "200 words or fewer, four short paragraphs"; the simulated output reports "≤150 words, 3 paragraphs, 1 closing question".
  known: S2-30.
F-066 | §03 | `ptcfOut` 2349 to 2354 | Accuracy | Low | M
  evidence: "What comes back" is bracketed simulated text with no `.sim` badge (evidence-standards: simulated interactives carry `.sim`).
  known: none.
F-067 | §03 | `personaChart` 2385 to 2389; table 1565 to 1568 | Accuracy | Low | M
  evidence: bars at 0.92 / 0.14 / 0.08 encode nothing measured; "Large" and "Largest" effects for Task, Context and Format have no source; Zheng tests personas only.
  known: S2-33.
F-068 | §03 | 1581 | Inapplicable | Medium | H
  evidence: "the weakest of the three templates you brought today" presumes templates the DW-090 fixture pack was to supply; "before-and-after for §08" points at the section D5 moved async.
  known: DW-090, S2-17.
F-069 | §03 | whole section | Overloaded | High | M
  evidence: 515 words / 6 min = 86 words/min; assembler, chart, table, two panels and a 5-minute doit; IDGT first used at 1535 without expansion.
  known: DW-093, S2-11.
F-070 | §03 | gate g4 (1584) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.

### §04 Scoring Your Own Prompts Against P.T.C.F (s6b, 7 min, 1588 to 1649)
F-071 | §04 | `.verify` 1591 to 1601 | Accuracy | High | H
  evidence: the gate names Rev. Proc. 2017-34 and 2022-32 (cited nowhere), §§ 1014, 2010, 691 (2010 and 691 nowhere; 1014 only inside B2's widget), none of the four rulings §07's key states as holdings (85-13, 2004-64 Situations 1 to 3, Woelbing, Davidson), places Kessler "in §05" (renders §07), and says nothing is "stated as a holding" while the key states four.
  known: S2-07, DW-056.
F-072 | §04 | `.verify` placement 1591 | Broken | Low | M
  evidence: the gate for §07's content sits at the top of §04, three sections earlier.
  known: none.
F-073 | §04 | 1603 | Accuracy | High | H
  evidence: "You had not been taught a prompting framework when you wrote them. That was deliberate." False for this cohort.
  known: DW-099.
F-074 | §04 | 1605 | Accuracy | Low | M
  evidence: "Wrong first attempts followed by correction outperform being told the right answer first" is a learning-science claim with no chip.
  known: none.
F-075 | §04 | 1607 | Inapplicable | Low | H
  evidence: "into the §08 audit, into the peer review" as in-room consequences.
  known: S2-17.
F-076 | §04 | `t-s6b` (1609) | Broken | Low | H
  evidence: tagged multi-column-sorter; four rating tiles and an editor.
  known: S2-28.
F-077 | §04 | `hwText` 1617; JS 2853 to 2875 | Non-informative | Medium | H
  evidence: the scorer reads only the tiles; the paste box is never parsed (harness: verdict "Score all four elements" with text pasted); "the original is the measurement" measures nothing.
  known: S2-29.
F-078 | §04 | whole section | Inapplicable | High | H
  evidence: no path for a learner without three templates or an input; PR B (DW-090) is not on the tree; one learner asked exactly this in writing.
  known: DW-090.
F-079 | §04 | 1643 | Accuracy | Low | H
  evidence: "Your discernment statement predicted ..." after D4 dropped the clause.
  known: DW-089.
F-080 | §04 | gate g5 (1646) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.
F-081 | §04 | whole section | Overloaded | Medium | M
  evidence: 490 words / 7 min = 70 words/min; two panels and a 2-minute report.
  known: none (DW-093 class).

### §05 Prompt Specification Triage (s7, 5 min, 1650 to 1673)
F-082 | §05 | `#quiz` (1662; `QZ` 2400) | Broken | Medium | H
  evidence: no `data-task` or `data-comp`; V6 and the profiler count this section at zero interactions; §07's triage carries `t-s7`.
  known: DW-101.
F-083 | §05 | 1667 | Accuracy | Low | M
  evidence: "Item 7 is the one that splits the room every time" has no basis (R1).
  known: none (S2-27 class).
F-084 | §05 | `QZ[5]`, `QZ[6]` (2427 to 2431) | Accuracy | Low | M
  evidence: portability and the 2026 exclusion items name no authority; §04's gate says Rev. Procs are "cited in the §05 triage" and none is.
  known: S2-07 (partial).
F-085 | §05 | whole section | Overloaded | Medium | M
  evidence: seven locked items with 694 words of feedback plus a 3-minute discussion in 5 minutes; 09-09 bottom-up 9.0.
  known: none.
F-086 | §05 | gate g6 (1670) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.
F-087 | §05 | whole section | Accuracy | Low | M
  evidence: zero chips; the three-category taxonomy is the course's own and says so nowhere.
  known: S2-15.

### §06 The Interview Rewrite (s8, 6 min, 1674 to 1728)
F-088 | §06 | 1677 | Accuracy | Low | H
  evidence: "Wolfram makes an observation ..." with no chip.
  known: S2-15.
F-089 | §06 | 1689 | Accuracy | Low | H
  evidence: "The CPC buy-sell agreement was executed in 2014"; CASE.md F.6 has the 2014 instrument between Hensley Precision Products and Walter Hensley.
  known: S2-50.
F-090 | §06 | JS 2960 | Broken | Low | H
  evidence: the ten questions are hidden with `color:transparent` and a text-shadow; selectable and readable by assistive technology; commit-before-reveal is visual only.
  known: S2-49.
F-091 | §06 | 1714 | Inapplicable | Low | M
  evidence: "Synthetic or fully de-identified facts only" with de-identified undefined for Part 1.
  known: DW-055.
F-092 | §06 | whole section | Overloaded | High | M
  evidence: 460 words / 6 min = 77 words/min; a live model run, a ten-item tick list, a diagnostic and a 5-minute doit; 09-09 bottom-up 11.8.
  known: S2-31.
F-093 | §06 | technique | Non-informative | Low | M
  evidence: the interview inversion was taught aloud three times on 08-31 and echoed back by a learner.
  known: 09-09 §2.
F-094 | §06 | gate g7 (1725) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.

### B4 The Seven-Step Process and the Delegation Line (s9, 16 min, 1729 to 1762)
F-095 | B4 | 1733; `STEPS` 2493 to 2506 | Accuracy | Low | M
  evidence: the seven CFP Board step names carry no record and no chip.
  known: S2-37.
F-096 | B4 | JS 2552; csub 1749 | Accuracy | Low | M
  evidence: "Prior-year figure for generative language use 41.8%" is outside `src-t3-survey`'s stated scope (52.2 and 42.9 only); "drafting and capture tools is over half" when only the drafting row is.
  known: S2-37.
F-097 | B4 | JS 2500; B5 1895 | Accuracy | Low | H
  evidence: "Roughly 3% of advisors report relying" bare in the key and in B5's card; chipped M once at the caption (1751).
  known: S2-38.
F-098 | B4 | csrc 1751 | Accuracy | Low | M
  evidence: "n=2,906 advisors, 95% at fee-only RIA or dually registered firms" chipped H to a record whose link and retrieval date are `[UNVERIFIED]`.
  known: S2-37 class.
F-099 | B4 | reading order s9 → s10 | Broken | Low | H
  evidence: consecutive multi-column-sorter (B4 inserted after §06, before §07); V6 FAIL.
  known: DW-094.
F-100 | B4 | gate ga4 (1759) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.
F-101 | B4 | 1751 | Overloaded | Low | M
  evidence: RIA and T3 undefined at first use (term heuristic, M).
  known: S2-11 class.

### §07 Citation Failure Types on the Cole IDGT Transaction (s10, 8 min, 1763 to 1819)
F-102 | §07 | 1812 | Accuracy | High | H
  evidence: the live-run prompt asks for authority on "an installment sale of non-voting stock"; CASE.md E.1 and E.5 sell 520 non-voting LLC units and I.1 flags §2036(b) as reaching corporate stock, not LLC units. BLOCKING by the register's definition (a page states a fact the repo's own source contradicts).
  known: S2-01.
F-103 | §07 | `CITES[5].w` 2621 | Accuracy | High | H
  evidence: "Meg's 2023 appraisal, never re-verified ... is the actual issue"; CASE.md F.7 records that report as whole-company with "No discount study", E.2 says no appraiser has been engaged, and 1975 on this page says the honest answer is "none of them".
  known: S2-08.
F-104 | §07 | `CITES[2].w` 2615 | Accuracy | Medium | M
  evidence: "Only a discretionary reimbursement power, held by a trustee who is not related or subordinate, avoids that result — Situation 3" attaches a §672(c) drafting condition the ruling does not state as its holding; the ruling text is on an egress-blocked host and was not read here.
  known: S2-09.
F-105 | §07 | `CITES[4].w` 2619 | Accuracy | Medium | H
  evidence: "an interest-only note payable on demand, drafted while a liquidity event was in view"; Stout and Crain's (2026-09-11 search) record Davidson's consideration as self-cancelling installment notes; dates and dollar figures ($2.8B asserted, ~$388M settled, 6 July 2015) check out.
  known: S2-10 (confidence raised from M).
F-106 | §07 | `CITES[3]` 2616 to 2617 | Accuracy | Low | H
  evidence: one docket (30261-13) cited, two stipulated decisions on two dates; 28 March 2016 belongs to Marion Woelbing's 30260-13 (McGuireWoods, The Tax Adviser); the footer names both.
  known: S2-36.
F-107 | §07 | csrc 1774 | Accuracy | Low | H
  evidence: the Magesh figures (202 queries, ~17%, ~33%) are chipped `src-dahl-fictions`; the `src-magesh` chip sits on the version caveat; the record says "over 200"; ">800,000 verifiable legal questions" is unverified against the paper.
  known: S2-35.
F-108 | §07 | 1765 to 1766 | Accuracy | Low | H
  evidence: the base-rate sentence and the vendor characterisation carry no chip in prose (chips only on the csrc).
  known: S2-15.
F-109 | §07 | `#triage` `t-s7` (1796) | Broken | Low | H
  evidence: the tag id names §05.
  known: DW-101.
F-110 | §07 | whole section | Overloaded | High | M
  evidence: 738 words / 8 min = 92 words/min (rendered 1,041); two charts, eight cards, a six-item triage and a 5-minute live run (13.6 at 1.7×).
  known: none.
F-111 | §07 | gate g8 (1816) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.
F-112 | §07 | no `.verify` in section | Broken | Medium | M
  evidence: the only R3 gate for the four rulings this key states as holdings is in §04 and names none of them.
  known: S2-07.

### §08 Template Audit and Structured Peer Review (s11, 5 min, 1820 to 1859)
F-113 | §08 | 1841; 1832 to 1839; 1846 | Inapplicable | High | H
  evidence: "Swap with the person you are paired with" and three more sentences frame an in-room partner exercise that needs a partner and a template; D5 moved §08 async; the reword (09-07 §12.4 item 15) is not on the tree.
  known: S2-32, D5.
F-114 | §08 | rubric 2648 to 2690 | Non-informative | Medium | M
  evidence: eight self-report ticks; 8/8 is reachable by ticking everything (harness); nothing verifies a template.
  known: S2-32.
F-115 | §08 | 1823; 1829 | Accuracy | Low | L
  evidence: "Section 6b" as a label; "A template that scores below 5 will not survive a handoff" is an unsourced rule.
  known: S2-16; none.
F-116 | §08 | gate g9 (1856) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.

### B5 Specification Cost Against Task Cost (s12d, 18 min, 1860 to 1921)
F-117 | B5 | headings 1868, 1878, 1890, 1898 against eyebrow 1862 | Broken | Low | H
  evidence: 3 + 8 + 5 + 3 = 19; eyebrow, apxstub and footer row say 18; the vote-1 lock text says "the next thirteen minutes" (8 + 5).
  known: S2-43.
F-118 | B5 | section attributes 1860 | Broken | Medium | H
  evidence: the named discussion block is 18 minutes (s4: 20), tier standard, hidden at the default depth; under D5 the delivered session runs no discussion block and no I-class interaction.
  known: S2-42.
F-119 | B5 | card 1894 | Broken | Medium | H
  evidence: "Whoever entered numbers in the baseline widget should read theirs aloud now" refers to §09, which follows B5 in every run order (B5 inserts after §08).
  known: DW-087 (amended 09-08).
F-120 | B5 | 1895 | Accuracy | Low | H
  evidence: "52.2% ... Roughly 3%" bare.
  known: S2-38.
F-121 | B5 | cards 1892 to 1896 | Non-informative | Low | L
  evidence: three cards under "Phase three — complication"; s3.7 specifies a single instructor-introduced complication.
  known: none.
F-122 | B5 | 1864 | Inapplicable | Low | H
  evidence: "section 6b".
  known: S2-16.
F-123 | B5 | gate ga5 (1918) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.

### §09 Final Project Part 1 and Baseline Capture (s12, 7 min, 1922 to 1980)
F-124 | §09 | `CHK[4]` 2765 | Accuracy | Medium | H
  evidence: "Your Session 1 baseline time against the AI-assisted time"; no learner has one.
  known: DW-087.
F-125 | §09 | JS 2751 | Accuracy | Low | H
  evidence: "A 40% time reduction recovers N hours a year" in the record the learner copies, unlabelled.
  known: S2-34.
F-126 | §09 | `#checklist` `t-s10` (1957) | Broken | Low | H
  evidence: a tick list tagged commit-first-mcq; the id collides with §07's section id.
  known: S2-28, DW-101.
F-127 | §09 | whole section | Overloaded | High | M
  evidence: 678 words / 7 min = 97 words/min (rendered 867); three cards, the capture, the checklist, a reading list and two closing paragraphs.
  known: DW-093, S2-45.
F-128 | §09 | 1977 | Inapplicable | Low | H
  evidence: "the one thing tonight".
  known: DW-075.
F-129 | §09 | checklist | Non-informative | Low | M
  evidence: seven self-report ticks.
  known: none.
F-130 | §09 | gate g10 (1977) | Broken | Low | H
  evidence: dead gate.
  known: S2-24.
F-131 | §09 | 1966 | Accuracy | Low | L
  evidence: "Kitces (January 2025)" and "Iskowitz (July 2025)" named with no footer entry.
  known: none.

### File level
F-132 | file | V6 | Broken | Medium | H
  evidence: 16 distinct `data-task` roots against the 13 to 15 band; 17 by mechanism once §05's quiz is tagged.
  known: DW-101.
F-133 | file | V6 | Broken | Low | H
  evidence: consecutive-family repeats B1→B2 and B4→§07 in reading order.
  known: DW-094.
F-134 | file | V2 | Broken | Low | H
  evidence: six footer citation hyperlinks fail the externals policy; upstream validator defect.
  known: DW-029.
F-135 | file | 15 of 16 gates | Broken | Low | H
  evidence: only the cold open calls `mark()`; completion feedback arrives only via Shift+U (R10 makes gates feedback, and here there is none).
  known: S2-24.
F-136 | file | stamp 2042 | Accuracy | Low | H
  evidence: "Last updated 2026-08-20" on a page changed 2026-09-08.
  known: S2-44.
F-137 | file | polls | Broken | Medium | M
  evidence: six designed Zoom polls are required; the page designs one poll mechanism (B5's room tally, 1907 to 1909) and `instructor-notes/session-2.md` is one line.
  known: DW-095 (partial).
F-138 | file | terms | Overloaded | Medium | M
  evidence: 33 file-level first-use acronyms and citations, 1 defined within 40 words by the heuristic; the 09-09 hand census found 15 of 74.
  known: S2-11, DW-093.
F-139 | file | `src-pricing` | Accuracy | Low | H
  evidence: in the footer with no chip although `MODELS` carries its content (A15 ADVISE).
  known: DW-021.
F-140 | file | student-email exercise | Inapplicable | n/a | H
  evidence: the brief anticipates a section depending on live student emails and the Berkeley Extension consent question; Session 2 has no such section and nothing on the page depends on student records. Reported as absent, not as a defect.
  known: none.

## 11. FLAGS

FLAG-01 | severity: High
  evidence: decisions D3, D4, D5 and the PR B, C, D edit lists were taken and specified on 2026-09-07/08 (`docs/deferred-work.md` header; `audit/AUDIT-2026-09-07.md` §6, §12.4) and none of their edits is on the tree at 98e9686 three days before 2026-09-14: bridge item 4 (F-004), the §04 premise (F-073), the §6b fixture pack (F-078), the §08 async reword (F-113), the "Session 1 baseline" sites (F-119, F-124), the cold-open renderer (F-033). Fourteen of this report's Tier 1 findings are already specified fixes.
  recommendation: land PR C and PR B before anything new in this report; use §2's order for what remains.
FLAG-02 | severity: Medium
  evidence: the repo has no `PEDAGOGY.md` and no `COURSE.md`. CASE.md cites "PEDAGOGY §5.5", "§5.3.4" and "§1.8"; the skill's pedagogy.md numbers those rules s5.4, s5.3 and R8. The "Non-informative" class (learning objective from COURSE.md) was scored against §00's four outcome cards and the hub blurb instead.
  recommendation: either add the two files the skill expects or record in MAINTAINING.md that the section map and objectives live in §00; retire the PEDAGOGY § citations in CASE.md or point them at the skill file.
FLAG-03 | severity: Medium
  evidence: `restyle_sweep.py --check` exits 1 on the two documented fragments and `verify-style.mjs` exits 1 on its hard-coded path; in a fresh environment no style check is green (DW-080).
  recommendation: `verify-style.mjs` reads `RESTYLE_SWEEP` from the environment already; document the variable in the pre-push gate.
FLAG-04 | severity: Medium
  evidence: `validate_dom.js` DOM mode fails both delivered lessons on `#pnum`, which the corpus renamed `#ovr` (DW-085, 2026-09-08). The two real assertions (no script errors, all gates marked) pass.
  recommendation: amend the skill's validator to accept `#ovr`; until then the pre-push gate cannot exit 0 in DOM mode and MAINTAINING.md should say so.
FLAG-05 | severity: Medium
  evidence: the composite ranks §07 seventh with the page's one BLOCKING-class item and the two key errors a learner carries into Session 3, because it has fewer defects than §00 and §04.
  recommendation: keep the formula for the queue, but read §07 and §04 first if the review is time-boxed; consider a severity floor (any High Accuracy finding lifts a section to the top of Tier 1) in the next audit brief.
FLAG-06 | severity: Medium
  evidence: Session 2's instructor note is one line and the page designs one poll; the six-poll requirement has no artefact anywhere in the tree (F-137, DW-095).
  recommendation: PR D's run sheet carries the five missing polls with their clock times.
FLAG-07 | severity: Low
  evidence: primary hosts for Wolfram, Dahl, Magesh, Zheng, Charlotin and the IRB are egress-blocked from this environment; six figures on the page (§7) could only be checked through secondary sources or not at all.
  recommendation: Part B item 1 for those six is Jared's, on a machine with egress, before 7:37 PM on Monday for the two Tax Court items.
FLAG-08 | severity: Low
  evidence: the profile's prose-density method (section source, C1 tokens, roots excluded) gives Session 1 a median of 27.9 words/min where DW-093's `lesson_plan_extract.py` gave 41.5 and the validator's whole-file C1 gives 102.2; three methods, three numbers, none ratified (build-checklist Part C).
  recommendation: none of the Overloaded scores here rests on the absolute number, only on the 2× to 4× ratio between the two sessions under one method; ratify one method before any density figure becomes a gate.

## 12. Files read, with byte sizes

Skill bundle (`~/.claude/skills/synced/.../interactive-lesson-builder/`): `SKILL.md` 12,356; `references/pedagogy.md` 12,982; `references/evidence-standards.md` 4,442; `references/component-bank.md` 10,459; `references/build-checklist.md` 3,853; `references/repo-workflow.md` 4,787; `scripts/validate_lesson.py` 11,524; `scripts/validate_dom.js` 4,545; `scripts/restyle_sweep.py` 4,167.

Repository at 98e9686: `README.md` 7,089 (whole); `MAINTAINING.md` 50,544 (pre-push gate, migration checks, case spine and purge list, sweep note); `CASE.md` 89,452 (header, Parts E.1 to E.2, F, J, M, N); `SOURCES.md` 64,709 (eight records); `CHANGELOG.md` 122,424 (headings and every Session 2 line); `docs/deferred-work.md` 119,502 (header through "How to read a row", all 43 rows naming Session 2); `docs/unsourced-claims.md` 12,846 (session-2 rows); `audit/SESSION-2-CONTENT-AUDIT-2026-09-09.md` 57,994 (§0 to §6); `instructor-notes/session-1.md` 722; `instructor-notes/session-2.md` 231; `session-1/index.html` 274,696 (structure, cold open, timing table, `COLD_CHECKS`; profiled whole); `session-2/index.html` 262,586 (every section and every script block, in document order). Absent: `PEDAGOGY.md`, `COURSE.md` (FLAG-02).

Scratchpad only, not in the tree: `jsdom-env/` (jsdom 24.1.3), `harness.cjs` (widget drive), `diff/` (cold-open and case-block extracts), `findings-notes.md`.
