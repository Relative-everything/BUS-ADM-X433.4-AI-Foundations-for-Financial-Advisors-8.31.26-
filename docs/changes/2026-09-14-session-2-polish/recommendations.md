# Recommendations: the PROPOSE rows of the 2026-09-14 polish pass
Written for a reader who was not in the session. Each item is self-contained; the register row it summarises is in `register.md` and the class test that made it PROPOSE rather than FIX is in `kickoff-polish.md` `<classes>`. Ranked by payoff against effort, strongest first. Every one can be answered yes or no without opening a file; a yes on the first two is a two-minute edit each.

## 1. PL-026 · §07 says "three of the six items would survive the check most people actually perform"; the page's own key says five
- **Where.** `session-2/index.html` §07, the synthetic-case paragraph under the base rates, and the triage's closing tally, which reads "Five of the six exist. Only one fails an existence check."
- **What it is.** The six citations are keyed two sound, one misgrounded, two never decided, one fabricated, at HEAD and in the 22 August original. Five survive an existence search; four survive existence plus a text check; no reading of the key gives three. The sentence has been wrong since it was written and two audits did not catch it, because each read the paragraph and the key separately.
- **What the learner gains.** The section stops contradicting itself in the two minutes between the paragraph and the tally, tonight, at core-only depth.
- **Correction.** "and five of the six would survive the check most people actually perform." If you read "the check most people perform" as existence plus opening the text, "four".
- **Cost.** Two minutes, one commit; a `grep -c` proves it.
- **Ripples.** None: no chip, no source, no run-sheet line.
- **Undo.** `git revert` of the one commit.

## 2. PL-034 · The footer stamp reads "Last updated 2026-09-12"
- **Where.** The `.stamp` paragraph in the footer.
- **What it is.** The page changed on 09-13 and 09-14 across three merged batches (35 items) and changes again in this pass. The stamp is hand-edited and the 09-12 pre-flight was the last to touch it.
- **What the learner gains.** The reload instruction beside it ("If you have had this tab open a while, reload") stops pointing at a date two days old.
- **Correction.** The date of the last commit that changes the page, written in that commit.
- **Cost.** One minute.
- **Ripples.** None.
- **Undo.** Revert.

## 3. PL-011 · The frontier chart chips the Artificial Analysis figures H against a record at M
- **Where.** §02, the chart's source line: "Index scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5" carries an H chip to `src-aa`. The paragraph above it, written on 09-14 (JN-037), chips the same record M; the footer entry and `SOURCES.md` carry M; the retrieval is the partial "2026-08" and DW-118 lists every figure for a browser re-check.
- **What the learner gains.** One confidence level per source on one page. A learner who reads the legend ("H directly verified against the cited source") is told something about the index scores that the record does not support.
- **Correction.** The chart's chip reads M. The "Terra and Luna" derivation beside it already reads M.
- **Cost.** Two minutes, then `node scripts/build-bibliography.mjs` in case the derived chip counts move, and `--check`.
- **Ripples.** V4 count unchanged; the bibliography derivatives may re-count one chip by level.
- **Undo.** Revert.

## 4. PL-004 · A keyboard user cannot see which toggle is focused in B2 and §03
- **Where.** The `.tg` toggles (two in B2's two-objects panel, four in §03's assembler). The checkbox inside each is 0 by 0 at opacity 0, so `:focus-visible` draws nothing; the label draws nothing either. Measured in Chromium this session.
- **What the learner gains.** A visible focus ring on the toggle a keyboard reaches; the toggle already works by keyboard, it just cannot be seen.
- **Correction.** One rule in the lesson's own style block, after the managed fence: `.tg input:focus-visible+.track{outline:2.5px solid var(--on);outline-offset:3px}`.
- **Cost.** Two minutes; `verify-style.mjs` stays clean because the fence is untouched.
- **Ripples.** None on this page. Sessions 3 and 4 do not carry `.tg`.
- **Undo.** Revert.

## 5. PL-017 · §03 and §04 ask the same act twice in a row
- **Where.** `t-s6` (§03, four toggles assemble a prompt, show a simulated reply and a verifiability score) and `t-s6b` (§04, four levels per element on three premade prompts assemble a prompt and load it into the editor). The comparison table is below.
- **What the learner gains.** §03 becomes the section that shows what an absent element does to the reply; §04 becomes the section that builds the prompt. Today the learner assembles a P.T.C.F prompt in §03 and then assembles a P.T.C.F prompt in §04, and the second teaches the same move with better tooling.
- **Option A, recommended.** `t-s6` keeps its toggles, the "What comes back" panel and the score, and drops its "Assembled prompt" panel. Count holds at 19; the `s6->s6b` adjacency stands but the two interactions no longer overlap.
- **Option B.** The "What comes back" panel joins the §04 builder and `t-s6` goes; count 19 to 18 toward the band, but §03 then has no interaction and pedagogy s3.4 wants one.
- **Cost.** A about 30 minutes with the harness; B about 60.
- **Ripples.** The run sheet's §03 opener ("The eight checks you heard last time collapse into four letters") holds under A; under B the s6 slot loses its element. Profile regenerated either way.
- **Undo.** Revert of one commit.

## 6. PL-003 · Four roots are tagged as a family whose contract they do not meet
- **Where.** `t-s1` and `t-s4` (`work-along-gate`; both are ranked-bar pickers, family 7), `t-s8` (`builder-assembler`; it reveals ten fixed questions, family 2) and `t-s8b` (`builder-assembler`; it swaps a prewritten kickoff per starter, family 14 or 2).
- **What the learner gains.** Nothing visible. What the instructor gains is an honest profile: the ICAP spread and V6's adjacency list describe the page as built. After retagging, the `s1->s2` pair disappears (B1 becomes a picker beside B2's toggles), `s8` stops carrying two builders, and the `work-along-gate` set falls from five to three.
- **Cost.** Fifteen minutes: four attribute edits, the run sheet's four `data-comp` labels, `build-appendix --check` (unaffected), the profile, and notes on DW-094 and DW-101.
- **Ripples.** V6's printed adjacency list changes; the 09-12 "honest retagging" (S2-28) is partly reversed; the register's by-instruction note on DW-094 needs a line.
- **Undo.** Revert.

## 7. PL-013 · §02 is 1,077 words for six minutes
- **Where.** §02 after JN-012 (five task cards) and JN-037 (six benchmark-kind cards). The profiler at HEAD gives 179 words per allocated minute against a page median of 27.3; the committed profile still shows 610 because it predates JN-037.
- **What the learner gains.** Tonight, nothing: the run sheet reads the benchmark block rather than running it. For the async reader, a six-minute section that is the longest on the page.
- **Options.** Fold the six kind cards behind a "Show the six kinds" control (about 20 minutes; count holds, nothing moves); cut each card to its prompt and one scoring clause (about 30 minutes, prose only); or move the block to a new appendix section after §02 (about 45 minutes; changes the count, the budget and the generated regions).
- **Ripples.** The first two none beyond the profile; the third the 150 arithmetic and the run sheet.
- **Undo.** Revert.

## 8. PL-024 · §06 attributes an observation to Wolfram with no chip
- **Where.** §06's opening sentence: "Wolfram makes an observation that most prompting advice skips: you can tell the model something once, as part of the prompt, and it will use it." F-088 in the 09-11 review, Low, not fixed.
- **What the learner gains.** The one Wolfram attribution on the page without a chip gets one, and the section stops being the only core section with zero chips apart from the cold open.
- **Correction.** Name the essay section the observation comes from (the locked list of seventeen), chip H to `src-wolfram`, add a `.csrc` line; the essay is not reachable from the build environment, so the section name is yours.
- **Cost.** Ten minutes plus the essay; `SOURCES.md` `used_for.session-2` clause, `inject-sources`, `build-bibliography`.
- **Ripples.** Six footers regenerate (the record is shared); A12 stays clean because the section is named.
- **Undo.** Revert plus regenerate.

## 9. PL-035 · Five lesson-CSS rules match nothing
- **Where.** After the managed fence: `.verify` (three lines), `#topbar .tb-r`, `#topbar kbd`, `.rnote` (two lines), `.pace p`. Every selector greps to zero in the markup after JN-001, JN-004, JN-018 and JN-036.
- **What the learner gains.** Nothing visible; the file loses about ten dead lines.
- **Cost.** Five minutes.
- **Ripples.** None; the fence's own copies belong to the sweep.
- **Undo.** Revert.

## The D6 comparison tables

### The five `work-along-gate` roots
| Root | Section | What it asks the learner | What the click does | Bank family it matches | Verdict |
|---|---|---|---|---|---|
| `t-s1` | B1 | Pick the next word from ten ranked bars, eight times | Appends the word, recomputes the next ten | 7 distribution-picker | mis-tagged (PL-003) |
| `t-s2` | B2 | Turn on two panels and compare them | Reveals a fixed text per toggle | 2 spoiler-reveal, nearest | mis-tagged, mild; left in PL-003's note |
| `t-s4` | B3 | Extend a parenthesis sequence from three hand-set bars | Appends or refuses; the count is kept outside | 7 distribution-picker (its named anchor) | mis-tagged (PL-003) |
| `t-s11` | §08 | Tick the criteria one template meets | Toggles a tick; score and band update | none exact; a scored checklist | kept (PL-031) |
| `t-s12b` | §09 | Tick the deliverable elements planned | Toggles a tick; count updates | none exact; a checklist | kept (PL-031): same mechanism as `t-s11`, different act |

Two members ask the same thing the same way: `t-s11` and `t-s12b`, in consecutive core sections. Kept, because the content of both is a list and the acts differ (audit against a rubric; plan a deliverable).

### The four `builder-assembler` roots
| Root | Section | What it asks the learner | What the click does | Bank family it matches | Verdict |
|---|---|---|---|---|---|
| `t-s6` | §03 | Toggle P, T, C, F on or off | The prompt assembles; a simulated reply and a score redraw | 15 builder-assembler | overlaps `t-s6b` (PL-017) |
| `t-s6b` | §04 | Set a level 0 to 3 on P, T, C, F for one of three premade prompts | The prompt assembles with each element labelled; a verdict redraws; a button loads it into the editor | 15 builder-assembler | overlaps `t-s6` (PL-017) |
| `t-s8` | §06 | Click each question the model asked | Reveals that question and counts it | 2 spoiler-reveal | mis-tagged (PL-003) |
| `t-s8b` | §06 | Pick one of five starters | Shows its kickoff to copy and six illustrative questions | 14 symptom-diagnoser or 2 spoiler-reveal | mis-tagged (PL-003) |

Two members ask the same thing in the same way: `t-s6` and `t-s6b`, consecutive in the core order, the pair the profiler names. The recommendation is option A of item 5 above.
