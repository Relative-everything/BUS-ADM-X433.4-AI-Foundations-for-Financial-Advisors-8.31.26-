# Handback: Session 3 simplify pass, 2026-09-19 to 09-20

Branch `claude/adoring-mendel-2luer4`, from `7d9e2fe` (`main` after PR #32). Twenty-six commits,
none to `main`. Change folder `docs/changes/2026-09-19-session-3-simplify/` with `notes-verbatim.md`
(the kickoff), `ledger.md` (SM-001 to SM-025), `checks.mjs` (one jsdom assertion per item plus the
09-18 invariants, 33 assertions, 0 failed), `findings-disposition.md` (all 157 finder results and
what was done with each) and this file.

The page taught on 2026-09-21 is `session-3/index.html` at the branch head: 18 sections, 11 core,
62 planned core minutes, 83 appendix, 18 interaction roots, T7 at 4 literal / 3 entity / 7 total,
the four §03 presets identical to the decimal, no `class="verify"` element.

---

## 1. The three instructions, and how each was read

1. **Remove all text addressing the instructor.** Read as: nothing on the learner page may address
   the instructor, a maintainer, a builder or a validator. The two "Requires instructor
   verification" blocks were the named case; the sweep found seven more places (§2).
2. **Make every interactive activity achievable without having read the case study, or any part of
   it.** Read as: for each of the 18 interaction roots, everything a learner needs to make the
   commit, complete the interaction and understand the feedback must be on the page above it. The
   Case facts dialog does not count, because nobody opens it; the one-sentence "The file" bullet did
   count and was not enough (§3).
3. **Polish and simplify against the goals and plans so far.** Read against the 09-17 plan, the 09-18
   handback's decisions and flags, and the 09-19 worksheet. Nothing decided on 09-18 was reversed.
   The wording of §09, §11, the merged §01/02, the objective, the course rule, the closing check, the
   three §08 prompts, the §07 instruction and the §10 basis prompt is unchanged except where a
   sentence was false or undefined (§2).

The kickoff's "with needing" was read as "without needing".

## 2. What changed and why

Every edit is on `session-3/index.html` unless the row says otherwise. Nothing on `session-1`,
`session-2`, `session-4`, `session-0.1` or the hub changed; the one generator that ran,
`build-appendix.mjs`, was run with `--file session-3/index.html`.

| Id | Commit | What changed | Why |
|---|---|---|---|
| SM-002, SM-003 | `21b9188` | Both verification blocks off the page: the §09 block and the shared case gate inside the Case facts dialog | The instruction. Session 2 took the same route on 2026-09-13 (DW-056 batch 3) |
| SM-004 | `21b9188` | The Case facts lede no longer names CASE.md, two scripts and pedagogy.md; it says what the dialog is and that no exercise needs it | Maintainer text in the first paragraph a learner reads when they open the case |
| SM-005 | `21b9188` | `instructor-notes/session-3.md` gains a Verify before teaching section holding every item both blocks held, plus the §07 excerpt disclosure; DW-056 and DW-041 carry a dated line | The items are still the instructor's to check; they needed a home |
| SM-006 | `7ba3054` | §07's source line loses "The excerpt is CASE.md Part O; it presupposes an advisory engagement that CASE.md §A.5 denies, recorded there rather than settled here" | Two file paths and a maintainer aside on a student page; the disclosure is now in the run sheet |
| SM-007 | `e7c0a15` | A3's source line stops naming CASE.md and stops printing "lines 3 and 5 are deliberately wrong" under the sorter whose task is to find them | A file path, and the answer printed beneath a commit-first exercise. The planted-error label stays on the page and in the footer |
| SM-008 | `c168820` | Appendix C4: the facilitation protocol ("two speakers per side, minority first", "Defence phase: 7 to 9 minutes", "the room distribution stays hidden") becomes a method a reader alone can follow; "you found the Article VII failure yourselves" becomes what §03 showed; "epistemic move" goes; the appraisal is "the document that prices the company", not "the one that held the right answer" | Stage directions shown to every learner; the page never draws a distribution; the appraisal has no discount study, so "right answer" overclaimed |
| SM-009 | `b1ae2e4` | §08: sorter item 1 stops naming "the three decisions from the meeting" against a summary that reads "Decisions: none"; item 4 stops presupposing "the units"; the slide feedback counts summary lines; the reviewer-facing "No claim is made about any vendor's in-application assistant" leaves the source line; step 3 of the silent run sends a learner with no Claude, or a stalled run, to the example output; the idle text says bucket; the example letter signs off Advisor | Contradictions with the source the section runs on; a builder disclaimer; the one learner-run exercise had no fallback on the page although the fallback existed |
| SM-010 | `63e1667` | A2: a third meeting type, "Recurring meeting you write up afterwards"; the bracketed builder note is deleted (the third bullet and the prompt already say it); "your own tool" becomes Claude; "your next meeting" becomes the next meeting you will prepare for; the first bullet takes the label form | The three who do not run client meetings could not build the prompt honestly |
| SM-011 | `f68adcb` | §00: a figure-free panel, "The Cole file, in four lines" (household with David, Nathan and Claire; the plan with the seed gift, the sale for a demand note and the asserted discount; the documents; what is new); "The file" bullet points at it; the Tonight bullet names grounding; the bridge hint says the four checks are from Session 2; the h4 takes title case | Fourteen later interactions or their feedback leaned on a Cole fact the page never stated |
| SM-012 | `af9eab8` | §03: each preset button carries its question; the hint asks for the passage number before the click and names the one fact the judgement needs (Meg is selling shares to a trust); the lede says RAG and grounding are one thing; the Index and Rank bullets keep the word embedding; nine documents and ten passages are reconciled; "two of the four presets are built to fail" no longer precedes the commit | The commit the hint asked for could not be made: the question appeared only when the click that ranked it fired. The queries and the corpus are untouched; the four rankings are identical |
| SM-013 | `b0c295b` | The map's three confusable-pair notes and four of the six pair explanations say what they mean without the case: no IDGT, which trust is which, where the discount is asserted, which return the wrong figure reaches, why the will and the trust both receive the residue; the unsupported "nearly the same person" clause goes; the embeddings bullet parses on first read; the work-along says read the key | Undefined abbreviation, undefined discount, unexplained return, a claim the draft trust does not support |
| SM-014 | `35cb90e` | §06: the question becomes the stage whose skipped check is first seen at an examination (answer still 5); the Prep panel stops presupposing David's remark from the §07 excerpt; the run sheet asks the same question | "Found last" had two defensible answers on the data (two stages are never seen by anyone) |
| SM-015 | `e121a64` | §07: the excerpt heading names Meg and David Cole; the transcription stamps read [00:00], [01:00]; the extraction stage says Nathan is their son; the follow-up stage obeys the not-given rule §08 teaches ("Owner: not given, raised by David") and flags "we will arrange that" as a commitment the tool added; "Why the category exists" becomes "Why it sells"; the hint stops repeating the sim label; the work-along stops presupposing a note-taker | The illustrative recap assigned an owner the summary does not give and added a commitment without saying so, on the stage that teaches reading a recap as the client will |
| SM-016 | `84ceb31` | §09: the Confidentiality bullet says who Nathan is; the hint says "Suppose your firm has a contracted documentation vendor. For each item"; the work-along asks the state question in an answerable form; "built to split the room" becomes "the hardest of the four"; the section sign is an entity | The quiz's first item turns on Nathan; two items are not Cole items; three learners may have no vendor; nobody can name a rule the page says nobody agrees on |
| SM-017 | `b37dadb` | §10: the basis example no longer records Meg agreeing to a sale in a review whose summary records no decision, nor "the reason counsel gave"; the prompt is copied into Claude after the next meeting you write up; a learner with no meeting runs it on the Cole review; the button reads "Copy the prompt" | Contradiction with the meeting record; two presuppositions |
| SM-018 | `dbb7bda` | §11: the work-along completes when the list is copied out, not only when all ten are ticked | An honest beginner rarely ticks ten of ten |
| SM-019 | `45ca9ba` | §04 states Article VII's trigger as the passage does (death, disability or withdrawal); the chart row reads Westlaw AI-Assisted; §05's feedback says retrieval tool | Accuracy; an abbreviation defined nowhere; a term the page does not use |
| SM-020 | `747c4da` | A1's bullets take the label form and its hint stops repeating the 500-page rule; A1, A3, C3 and A5 work-alongs presuppose no practice, tool or vendor; C3's lede and first bullet stop answering the prediction before it is asked; A5 is titled by its eight questions; two rail labels and the opening eyebrow write the middle dot as an entity; card, stub and budget row regenerated | Appendix sections are for the reader alone |
| SM-021 | `ba4cb99` | The four work-along gates that never flipped (g2, g4, ga3, ga4) now flip on completion; the sorter progress line breaks before "Now click" | 09-18 flag 5; a run-on in every sorter |
| SM-022 | `9f15fb5` | `session-3-teaching-aid.htm`, `.md`, `.pdf`; `session-3-verify-brief.md`; the run sheet's Flow note; `session-3-before-monday.md` item 7; the 09-19 worksheet | The instructor materials must be true against the page |
| SM-023 | `ac8feb4` | `docs/audits/profiles/session-3.json`, `docs/case-fact-inventory.md` regenerated | Read-only derivations |
| SM-024 | `1abf0f1` | "Standing instruction" is kept in §07's extraction stage and §11's checklist and defined once where the instruction is introduced ("where it stands for every meeting") | Replacing the term broke the 09-18 check FF-004 and lost a useful word |
| SM-025 | `4f8e35a` | `session-3-before-monday.md` rewritten as the simplified list; `findings-disposition.md`; the ledger's commit column | The deliverables |

**Deliberately left alone.** The objective panel, the Course rule, the closing check, the three §08
prompts and their copy payload, the §07 instruction, the §10 basis prompt, every citation and chip,
every em dash in authored prose (4 literal, 3 entity, unchanged), the PRESET queries, CASE.md Part
O, the Shift+U override, the 18 roots, the minutes of every section, the "Tonight" wording asserted
by the 09-18 checks, the room-first "in chat" phrasing in the silent-run panel (09-18 flag 14), the
three §08 rule labels the run sheet names, "written on the day" (the worksheet names it as the bullet
to land), "the interview rewrite" (FF-009), "third at 3.3" (a spoken cue), "Retrieval bridge" (the
run sheet's word), the §08 eyebrow at 5 minutes, and the `.verify` CSS rules, which are now unused.

## 3. The three goals, measured

### 3.1 Text addressing the instructor, a maintainer or a builder

Before: two `class="verify"` blocks (the §09 block and the shared case gate), the sentence "The
instructor signs the slide, not the model (pedagogy.md s1 R3)", a Case facts lede naming CASE.md,
two scripts and pedagogy.md, two source lines naming CASE.md Part O and one CASE.md section, a
reviewer-facing vendor disclaimer in §08, and in Appendix C4 a facilitation protocol, a defence
phase timed at "7 to 9 minutes, minority called first" and two promises of a room distribution the
page never draws. After: none. `grep` for `class="verify"`, `pedagogy.md`, `CASE.md`, `scripts/`,
`minority`, `room distribution` and `instructor` in rendered text returns nothing on the page (the
two remaining hits are CSS comments and the `#ovr` override label, which the README documents and
HALT 9 keeps).

### 3.2 Case dependence, root by root

The case finder rated each of the 18 roots before the pass on what a learner must know and whether
it was on the page above the interaction. The right-hand column is the state now.

| Root | Before | What was missing | Now |
|---|---|---|---|
| s1 retrieval-bridge | yes | nothing | unchanged |
| s2 click-map-explorer | partly | IDGT, which trust is which, where the discount is asserted | notes rewritten (SM-013); the §00 panel names the two trusts, the units and the discount |
| s2 two-bucket-sorter (pairs) | partly | the discount, "Meg's return", the draft IDGT, the residue | four explanations rewritten (SM-013) |
| s4 estimate-then-reveal (retriever) | partly | the question was invisible until the click that ranked it; the transaction on the table | question on each button; hint names the transaction (SM-012); §00 panel |
| sRag two-bucket-sorter | yes | nine documents against ten passages | reconciled in §03 (SM-012) |
| s6 prediction-commit | yes | nothing | unchanged |
| s7 commit-first-mcq (Tuesday) | yes | the appraisal and the discount, in feedback only | §00 panel |
| s9 symptom-diagnoser (chain) | partly | the competitor's approach, David's request, the memo's discount, who David is | §00 panel "What is new"; Prep panel reworded (SM-014) |
| sPrep builder-assembler | yes | nothing case-specific; no non-client meeting type | third meeting type (SM-010) |
| s10 spoiler-reveal (note stages) | partly | who David and Nathan are | heading names Meg and David Cole; extraction says "their son" (SM-015); §00 panel |
| sChk two-bucket-sorter | yes | nothing (the excerpt is on the page) | unchanged; source line no longer prints the answer (SM-007) |
| s11 estimate-then-reveal (C3) | yes | nothing | the lede and first bullet no longer answer the prediction (SM-020) |
| sOff multi-column-sorter | yes | "the three decisions", "the units" | items rewritten (SM-009) |
| s12 commit-first-mcq (consent) | partly | who Nathan is; the seed gift | bullet names Nathan (SM-016); §00 panel defines the seed gift |
| sVend builder-assembler | yes | nothing | work-along presupposes no vendor (SM-020) |
| s13 two-bucket-sorter (basis) | yes | "the reason counsel gave", "a gift" | line 3 rewritten (SM-017) |
| s15 sealed-vote-debate | yes | nothing | reads for a reader alone (SM-008) |
| s16 builder-assembler (checklist) | yes | nothing | completes on copy (SM-018) |

Every "partly" is now "yes" on the finder's own criteria. The one fact every later section leans
on, who Nathan is, appears three times on purpose: §00, §07's extraction stage, §09's bullet.

### 3.3 Simplification, honestly

Core static text measured in jsdom over `section.slide` elements: **3,378 words before, 3,552
after, up 174 (5.2%)**. The whole increase and more is the §00 panel (about 140 words) and the
clauses that put a fact where an interaction needed it; the removals (both verification blocks,
about 170 words; the Case facts lede, the maintainer asides, the C4 protocol) sat inside the case
dialog or in source lines, which the section count does not reach. So the page a learner scrolls is
slightly longer, and shorter in the places that were not for them. The page byte count moved
223,025 to 223,588. `validate_lesson` C1 density 85.1 to 84.8 words per allocated minute.

The alternative, a one-line pointer to the Case facts dialog instead of the panel, was rejected:
one learner said the case was beyond her after Session 1, nobody opens the dialog, and the
instruction was that no interaction may need it.

## 4. How the findings were produced

Six finders ran in parallel over the page (lenses: instructor-addressed text, case dependence with a
verdict per root, contradictions, simplification, presuppositions, mechanics) and returned 157
findings. Three adversarial verifiers per finding, each with a different lens (is it real, does the
fix pass every constraint, does it work for the three readers), completed for 24 findings before the
run's spend limit stopped it: 72 verdicts, every one a keep except three on finding 11 ("Tonight
everyone's source", refuted) and two on finding 21 (the Log stage's "gift that was rejected",
refuted). At two concurrent agents in this container, the remaining 321 verifiers would have taken
most of a day, so the rest were curated by hand against the same ten constraints and the same Cole
facts, and the finished diff was then put to six independent reviewers with one adversarial refuter per
finding; §9 is their record. The disposition of all 157 is in `findings-disposition.md`: 134 accepted,
2 partly, 21 rejected with the reason.

## 5. Verification

All from the repository root with `NODE_PATH=$(npm root -g)` (jsdom installed globally in this
container), Chromium via the global Playwright 1.56.1, the three skill validators from the
interactive-lesson-builder skill root.

### 5.1 Repo-root gates, after the last page commit

```
verify-case              6 of 6 lessons carry the current CASE.md v4.0 block
verify-migration         15 passed, 0 failed
verify-sources           5 of 5 lessons carry the current SOURCES.md block
verify-editorial         16 rule(s) clean, 0 hard failure(s), 5 advisory (none on session-3)
verify-style             style fence clean (RESTYLE_SWEEP pointed at the skill's sweep)
test-editorial-regions   9 passed, 0 failed; T7 session-3 4 literal / 3 entity
build-appendix --check   all generated regions agree with their sections
inject-sources --check   every lesson carries the current SOURCES.md block
inject-case --check      6 current, 0 stale, 0 without sentinels, stamp cba5438
build-unsourced --check  current, 9 marked claim(s)
build-bibliography --ck  all three generated files are current
case-inventory --report-check   current
section_profile          ICAP P0 A3 C14 I1, unchanged
checks.mjs (09-18)       19 assertions, 0 failed
checks.mjs (09-19)       33 assertions, 0 failed
```

### 5.2 Skill validators, from the skill root

```
validate_lesson.py  RESULT: FAIL (7 fail, 3 warn)   the same seven by-design lines as 09-18
  FAIL V2 x5   one per footer citation hyperlink            DW-029
  FAIL V5      segments 145, allocated 145, target 150      DW-123, red since 09-17
  FAIL V6      18 distinct interactions (band 13-15)        DW-094; type-count and adjacency PASS
  WARN V4 x3   the footer legend chips; src-iskowitz never chipped (assigned reading, by design)
  PASS V1 V3 V4 V7 V8 V9 V10
  INFO C1      prose density 84.8 wpm (was 85.1)
validate_dom.js     scripts executed with no thrown errors; Shift+U marked all 17 gate(s);
                    FAIL #pnum did not flip                 DW-112, upstream
restyle_sweep.py --check   7 current, 0 stale, 2 without fence (the two generated fragments)
```

Nothing new is red. V6 did not move: 18 before, 18 after.

### 5.3 The four §03 presets, Chromium, before and after: identical

```
D1 11.1 / D6 5.1 / D3 3.3 / D2 0.0   margin 53.8%
D5 18.2 / D4 17.9                    margin  1.7%, flagged
D8 29.2 / D3 8.0 / D7 3.8 / D1 3.7   margin 72.8%
D7 26.5 then zeros                   margin 100.0%
```

The PRESET query strings and COLEDOCS are byte-identical to `7d9e2fe`; only the button label changed.

### 5.4 T7, before and after: identical

`session-3 4 literal / 3 entity / 7 total` at `7d9e2fe` and at the head, after every commit. The
one em dash this pass removed was a `—` escape inside a JavaScript string literal (the
grantor/trustee explanation), which `authoredProse` masks out; `scripts/editorial-baseline.json` is
untouched and no DW-122 line is owed.

### 5.5 Every interaction, Chromium at 1280px

All 18 respond: the bridge scores C A D B 4 of 4; the map lights three neighbours; the five sorters
open their keys after the last placement; the §04 commit opens the measured key; the Tuesday test
gives per-option feedback; the five chain stages render; the four note stages open; the prep prompt
builds (three meeting types); the §08 example output opens; C3 reveals the slopegraph; the consent
quiz reports 4 of 4; the vendor email builds; C4 votes and re-votes; the checklist reports every
step in place. No `undefined` or `NaN` in rendered text after every control is exercised. Zero page
errors. In jsdom the four gates that never flipped now flip: g2 after four terms, g4 after four
presets, ga3 on the prediction, ga4 on the re-vote.

### 5.6 380px

No horizontal overflow at Core only or at +Advanced: `scrollWidth 380 = clientWidth 380`. The four
preset buttons, now carrying their questions, wrap inside the gutter.

### 5.7 The instructor materials

The run sheet, the aid (`.htm`, `.md`, `.pdf` rebuilt as one page by Chromium, 96,391 bytes), the
verify brief, the worksheet and the before-Monday list were read against the page after the last
page commit. Every quoted control text matches; every cue's answer is unchanged (C A D B; pair 3 to
2; §04 c; §05 a; §06 stage 5; §07 turn 2; §09 item 1 c; §10 line 4 to 3); the one cue whose
wording changed (§06) is changed in all four files.

## 6. Rejected options

| Option | Why rejected |
|---|---|
| Resume the interrupted verify phase for all 131 unverified findings | 321 agents at two concurrent, most of a day; the deadline is Monday. Hand curation against the same constraints, then a six-lens review of the finished diff with a refuter per finding, is the cheaper form of the same check |
| A one-line pointer to the Case facts dialog instead of the §00 panel | Nobody opens the dialog; the instruction was that no interaction may need it |
| Put the Cole facts into each section that needs them | Fourteen sections; the same fact repeated; the panel is read once at 6:19 |
| Render the four preset questions as a list above the buttons | Two places to look; the question on the button is where the click is |
| Change §06's question to "which stages does nobody ever catch" (two answers) | The aid prints one answer, 5; a question whose answer is still 5 costs nothing on the night |
| Cut A5's eight questions to the five its title promised | The 09-17 pass kept eight on purpose; retitling is honest and loses nothing |
| Replace "standing instruction" with plainer words | Broke the 09-18 check on the extraction stage; the term is useful once defined, so it is defined |
| Shorten "Do this now — 6 minutes" in §03 to 4 minutes | The label carries a counted em dash; the timer is the planned figure the run sheet's clock is built on |
| Rename "Retrieval bridge" to "Recall bridge" | The run sheet and the component name say retrieval bridge; a vocabulary change four days out |
| Raise §08's eyebrow from 5 to 8 minutes | Moves three generated regions, the run sheet's clock and V5 |
| Update the README sentence that says legal characterisations sit behind a verification block | Repo-wide; four lessons still carry the shared gate. Flag 1 |

## 7. Self-review, adversarial

- **The page is longer, not shorter.** 174 core words up. Every added word is a fact an interaction
  needed or a fallback the silent run lacked; nothing decorative was added. If a shorter page is
  wanted, the §00 panel's "What is new" line is the first cut (§06's panels explain their own
  facts), then "The documents".
- **The §00 panel says Nathan has not been told.** §07's commit asks which turn holds the thing a
  tool drops; the answer is the Nathan clause. The panel makes the fact known, not the turn; the
  room still has to find turn 2. Mild, and the §09 bullet already said it before this pass.
- **The preset buttons are long.** "Preset 1 · What value should we use for Meg CPC shares" wraps to
  two lines at 1280px in a four-button row. Checked at 380px: no overflow. The alternative (a list
  above the buttons) was rejected in §6.
- **"Owner: not given" in §07's follow-up stage** now agrees with §08's example table and the
  summary; the recap sentence "we will arrange that" is kept and flagged rather than removed, so the
  stage still shows what a tool does before it shows what to catch.
- **§10 line 3** now reads "for the reason noted in the file", which is deliberately vague: the page
  has no counsel's reason and should not invent one. The line still carries the four elements the
  bucket asks for.
- **The A1 sorter still says "The Cole file: nine documents"**; §03 now says nine documents and ten
  passages in one breath, so the two agree.
- **The `.verify` and `.vh` CSS rules are orphaned** on session-3. Left, per the no-CSS constraint
  and because the restyle sweep owns the fence.
- **The C4 slot in the run sheet still says to run the votes as Zoom polls** and to show both
  distributions. That is the instructor's side and stays true; the page just no longer promises it
  to the learner.

## 8. Flags, numbered

1. **README.md** still says "Legal and regulatory characterisations in the lessons sit behind a
   verification block". True for the hub, session-0.1, session-1 and session-4; no longer for
   sessions 2 and 3. Repo-wide sentence, not touched; one line when the other lessons follow.
2. **The other four copies of the shared case gate** (hub, session-0.1, session-1, session-4) and
   the three section gates on session-0.1 and session-4 stand. DW-056 records the count.
3. **The two law items are still unchecked.** They moved from the page to the run sheet; the duty
   did not move. Before-Monday item 5.
4. **validate_lesson V5 stays red** (DW-123), unchanged by this pass.
5. **The aid prints answers**; if any data array is reordered the aid is wrong. `checks.mjs` asserts
   the bridge order and the option letters; the rest is the 09-18 flag 13.
6. **The em-dash count in rendered text** (validate_lesson C2) still reads 12, because the `#ovr`
   label, the two timer labels and the JS strings carry them; policy unratified, as before.
7. **The workflow's spend limit** stopped the finder pass's verify phase at 78 of 400 agents. §4
   says what was done instead, and §9 is the six-lens review that replaced it.
9. **The other five lessons still render file and script names** in their own hand-authored regions
   (the hub, session-0.1, session-1, session-2 and session-4), and four of them still carry the
   shared verification gate. SM-026 cleared the generated block for all six; the rest is each
   lesson's own pass.
10. **The aid and the run sheet disagree on the first three clock times**, aid 6:03 / 6:06 / 6:08
    against run sheet 6:08 / 6:11. Pre-existing, and the difference is how long housekeeping gets,
    which is the instructor's call.
11. **The §09 source line's section sign** was changed from a literal to an entity (SM-016), a
    rendered no-op inside a citation line, recorded here because constraint 6 asks that citations be
    touched only for a defect.
8. **The 09-19 worksheet** (`docs/changes/2026-09-19-session-3-manual-pass/worksheet.md`) was
   updated in place at the five lines the page changed; its `notes-verbatim.md` is still empty,
   which means the manual pass it was written for has not happened.

## 9. The review of the finished diff

Six reviewers read the diff at `4f8e35a` through distinct lenses (constraints checked mechanically,
factual accuracy against the case block and the transcript, the three readers, the instructor
materials' truth against the page, regression against the 09-18 decisions, and does everything still
work), returning 73 findings, 53 unique. Each must or should finding went to one adversarial refuter:
**17 confirmed, 8 refuted, 28 left as optional.** All 31 agents completed.

**What the six said in one line each.** Constraints: sound, the baseline and every frozen region
verified, one breach left that only the generator could fix. Facts: the §00 panel matches the case
block line by line, with four smaller inaccuracies. Readers: all 18 interactions are committable
from the page alone. Truth: every cue and answer checks out, one false line in the drop order.
Regression: nothing decided on 09-18 is undone. Mechanics: every control responds.

**The 17 confirmed, and what was done.** Twelve items, `SM-026` to `SM-030`.

| Confirmed | Fixed in |
|---|---|
| The generated case block still printed CASE.md, its version, `scripts/build-case.mjs` and "the assignment substrate" to a learner (the only **must** on the page) | SM-026, through the generators |
| The preset buttons printed the raw ranker queries, ungrammatical and uppercased | SM-027, a display field beside the frozen query |
| "Split the company into voting and non-voting units" misdescribed the plan | SM-027 |
| The §03 hint said shares where the case says units | SM-027 |
| The §03 work-along still announced that two presets fail | SM-027 |
| The will "receives the residue" it sends | SM-028 |
| Both valuation standards credited with triggering events | SM-028 |
| §06's Prep check credited §03 with an assistant that reports | SM-028 |
| §06's Log check named a rejected gift the plan contains | SM-028 |
| The §10 basis example pointed at a reason instead of stating one | SM-028 |
| §07 stage 2 referred to an instruction the learner had not met | SM-028 |
| The sentence meant to define "standing instruction" never used the term | SM-028 |
| A2's third meeting type read as "prepare for a recurring meeting you write up afterwards", where "you" is Claude | SM-029 |
| C3's second bullet named the four steps its own prediction asks for | SM-029 |
| C4 credited the reader with finding Article VII by opening the passage, which its complication denies | SM-029 |
| The run sheet's first drop named a two-column comparison §05 does not have | SM-030 |
| The verify brief's title and one sentence still described a block that is gone | SM-030 |

Five optional findings were taken with them because they were a line each: the C3 and C4
work-alongs, the A5 hint, the A3 synthetic label, the §08 sorter hint, one American spelling and the
silent-run fragment. The run sheet also gained a **Changed 2026-09-19** block, the thing the
instructor reads first, and its §07, §08 and §09 slots now match the page.

**The eight refuted**, each for a stated reason: the "also called grounding" gloss (a ledgered
decision); the defence panel's "opening the top passage" (the advocate's voice, which the
complication rebuts two panels later); the claim that C4 no longer names a defence (the work-along
did); the reverse-prompting reference in the run sheet (its antecedent is named twice); removing the
shared case gate's disclosure (recorded, and the disclosure moved rather than vanished); two bullet
forms the 09-19 pass had already knowingly retained; and the Shift+U badge, which HALT 9 and the
README both keep.

**Left as optional, and why.** The aid and the run sheet still give different clock times for the
first three slots (aid 6:03 / 6:06 / 6:08, run sheet 6:08 / 6:11), which is the instructor's call
about how long housekeeping gets, not a defect to resolve silently. C3's source line still states
the adoption result, but it sits below the reveal in reading order. The §06 lede says "the log is
what an examiner reads", which narrows the new question without answering it. The remaining
optional findings are in the workflow record.

**Re-verified after the review fixes.** Every gate green, the same seven by-design red lines, T7 at
4 literal / 3 entity, the four presets identical to the decimal, 18 of 18 interactions responding in
Chromium with zero page errors, no overflow at 380px, both `checks.mjs` at 0 failed, and no file or
script name rendered anywhere on the page.

## 10. What worries me about Monday, in one paragraph

Not the page. The risks are the 09-18 handback's: 6:00 to 6:19, where both prior sessions were
lost, and 8:00, by which the seven-step sorter on the Session 2 page must have run. One thing this
pass adds to watch: the §00 panel is new, and if it is read aloud in full at 6:19 it costs about a
minute; if it is skipped, §03's commit at 6:26 still works, because the hint now names the one fact
the judgement needs. The two law items are the only thing on the night that depends on something
nobody has done yet.
