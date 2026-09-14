# Handback: Session 2 polish pass, 2026-09-14
Branch: `claude/session-2-execution-314n0n`. Change: `docs/changes/2026-09-14-session-2-polish`. Tier: Lite. Status: complete; nine proposals wait on the instructor (DW-120), two of them accuracy findings settled in a minute each.

## Summary
Asked: polish `session-2/index.html` after the three instructor-note batches (35 items, merged at 88d89c9), landing what passes the six-line FIX test and proposing the rest, under the four toggles at their defaults. Done: a seven-dimension survey of all 17 sections produced 37 findings; 19 landed one commit each (18 on the page, one regenerated record), 9 are proposed with cost, ripple and undo in `recommendations.md`, 9 were examined and deliberately kept. Every figure, name, date, chip and citation reads as it did; the em-dash baseline reproduced at 2 literal / 38 entity after every commit; every section's word count holds or falls (24 fewer in all); the interaction count holds at 19 and the ICAP spread and adjacencies are unchanged; the pass's harness reads 18 of 18 checks green from a clean HEAD and the repository gate is green with only its known-red lines. Nothing was merged.

## What changed
- §01: the temperature explanation ends "no theory behind that number: it is simply what works for essays" (a comma splice became a colon).
- §02: the lede reads "Two models two dollars apart per million tokens can differ fourfold" (it said "per token"); the paragraph under it reads "Plotted together, they scramble the price-sheet ranking" (the ranking was not what was plotted).
- §03: the prompt-length panel is labelled "A related point", not "A related result": it cites no study.
- §04: each level row in the builder is a named group for a screen reader ("Persona level" and so on) and F1 to F3 carry a pressed state. Nothing visible changes.
- §05: option C on items 2 and 6 prints "§03" and "§07" where it printed the literal "&sect;".
- §06: "Start a reverse-prompting interview" and "Specification diagnosis on your own prompt" are sentence case like every other subheading; the buy-sell paragraph reads "The questions it asked back are below" instead of a sentence that misparsed and repeated the panel label; the hint line under the ten questions is gone, because the label, the numbered rows and the button already say it.
- §07: the Check 03 card no longer repeats "Training data has a cutoff; the Code does not" from the Type 03 card.
- §08: the section opens "§04 rebuilt one of your prompts" (it said "Section 04, the workshop" inside the section whose own eyebrow reads Workshop); the first live-audit criterion reads "Pasted in as written, it produced something" rather than "You pasted it in", which was written for the retired peer review; the three template buttons carry a pressed state.
- B1: the live-run doit says "§01 explains the difference and how to narrow it"; it pointed at the comparison exercise JN-008 deleted.
- B4: the adoption chart's caption names rows 1 and 3 (it said 4 over three rows), the axis ends at the last bar, the caption starts inside the frame instead of running 41 units past it, and the frame loses its empty band.
- B5: the question reads "if a reliable prompt has to be specified as carefully as §04 required"; the two room-percentage boxes carry names.
- Records: the committed profile regenerated (it recorded §02 at 610 words from before JN-037); the run sheet's "Changed since the 09-13 run sheet" block, which says no slot moves; DW-120 and five dated register notes; the changelog entry and its page; the plan marked implemented with two departures.

## What to watch for
- §05: pick "C · Specified and verifiable" on item 2. The feedback ends "the evidence in §03 says does not move objective accuracy" with a section sign, not "&sect;03". Same on item 6 with "§07".
- §06: under the buy-sell task, the paragraph reads "The questions it asked back are below." Click question 1: it opens alone and the count reads "1 of 10 asked"; there is no grey hint paragraph between the list and "Reveal the rest".
- §08: the first line reads "§04 rebuilt one of your prompts." Under "Part two", the first criterion reads "Pasted in as written, it produced something, with no change to the template itself."
- B4 (set depth to +Standard): under the three adoption bars, the caption reads "THE GAP BETWEEN ROWS 1 AND 3" and sits inside the chart's white frame with no blank band below it, at desktop width and on a phone.
- B1 (set depth to Foundational): the live-run box ends "§01 explains the difference and how to narrow it."
- §07: the Check 03 card opens "Amended, superseded, modified by a later revenue procedure, or subject to a sunset. How to check:"; the Type 03 card still carries the training-cutoff sentence.
- Two things that are still on the page and are yours: §07's "three of the six items would survive the check most people actually perform" against the tally's "Five of the six exist" (PL-026), and the footer's "Last updated 2026-09-12" (PL-034).

## How to read the result
No number on the page moved. The one derived figure the pass leaned on is PL-009's "fourfold", which holds on the page's own `MODELS` array (Sonnet 5 and Terra blend to $4.00 and $5.63 at the slopegraph's 3:1 ratio and cost $2.29 and $0.52 per task, a ratio of 4.4; M, derived). The em-dash figure did not move because no landed row deleted a sentence carrying one. Where a finding would have changed a figure, a date, a chip, a family tag, a component or page-level CSS, it is a proposal, and the two that are accuracy findings (PL-026, PL-034) are the ones to answer first. The nine LEFT-AS-IS rows are as deliberate as the fixes: each names the instructor's recorded decision or the mechanism that makes the passage right as it stands.

## Register totals
| Status | Count | P1 | P2 | P3 |
|---|---|---|---|---|
| LANDED | 19 | 14 | 4 | 1 |
| PROPOSED | 9 | 3 | 5 | 1 |
| LEFT-AS-IS | 9 | 6 | 1 | 2 |
| HALTED | 0 | 0 | 0 | 0 |

## Run sheet deltas
- No slot changes: no element id, `data-comp`, opener, poll, minute or reveal moved.
- A "Changed since the 09-13 run sheet (polish pass, 2026-09-14)" block at the top lists what the room sees differently by section and names PL-026 and PL-034 as the two open items on the page.

## Verification output
Run from the repository root at ceea84f (the page unchanged since e9bebee), 2026-09-14. Only the lines the 09-12 and 09-13 handbacks recorded as red by design are red: V2 on the footer hyperlinks (DW-029), V6 on the count and the three adjacencies (DW-094, DW-101), V8 and the DOM-mode Shift+U line (DW-116), `#pnum` (DW-112), the two documented fragments. Every advisory line is the pre-existing set in sessions 1, 3 and 4.
```
$ node scripts/test-editorial-regions.mjs            summary: 9 passed, 0 failed  (T7: session-2 2 literal / 38 entity, unchanged at every one of the 18 page commits)
$ node scripts/verify-editorial.mjs                  summary: 16 rule(s) clean, 0 hard failure(s), 7 advisory  (A12 x4 in sessions 1 and 4, A15 x3 in sessions 3 and 4; none in session-2)
$ node scripts/verify-case.mjs                       summary: 6 of 6 lessons carry the current CASE.md v4.0 block
$ node scripts/inject-case.mjs --check               summary: 6 current, 0 stale, 0 without sentinels  ·  stamp cba5438
$ node scripts/inject-sources.mjs --check            every lesson carries the current SOURCES.md block
$ node scripts/verify-sources.mjs                    ADVISE 3 source(s) listed by a lesson that never cites them (pre-existing, sessions 3 and 4); summary: 5 of 5 lessons carry the current SOURCES.md block
$ node scripts/verify-migration.mjs                  summary: 15 passed, 0 failed
$ node scripts/build-appendix.mjs --check            current session-2 core 11 / 69 min, appendix 5 / 81 min, total 150; all four lessons current
$ node scripts/build-unsourced.mjs --check           current docs/unsourced-claims.md (11 marked claim(s))
$ node scripts/build-bibliography.mjs --check        all three generated files are current
$ node scripts/build-cardsort.mjs --check            OK current session-1/index.html
$ node scripts/case-inventory.mjs --report-check     current docs/case-fact-inventory.md
$ RESTYLE_SWEEP=<skill>/scripts/restyle_sweep.py node scripts/verify-style.mjs   summary: style fence clean (7 lesson documents current)
$ python3 <skill>/scripts/validate_lesson.py session-2/index.html --case Cole --purge "Okonkwo,Reyes,Adaeze,Ilesanmi" --require-timing --require-tagging
  FAIL V2 x10 (footer citation hyperlinks; upstream DW-029)
  PASS V4 54 chip reference(s) resolve; 26 footer source(s)   WARN V4 3 legend chips; 9 nochip footer sources never chipped (by kind)
  PASS V5 segments sum to 150 = allocated 150 = target 150
  FAIL V6 19 distinct interactions (band 13-15); adjacencies builder-assembler, multi-column-sorter, work-along-gate (by instruction; DW-094, DW-101)
  PASS V7 case 'Cole' present (35x) and labelled synthetic at introduction
  FAIL V8 Shift+U override missing or unlabelled (by design; DW-116)
  PASS V9 :focus-visible outline present    PASS V10 title and footer agree
  RESULT: FAIL (13 fail, 3 warn)
$ node <skill>/scripts/validate_dom.js session-2/index.html   MODE=jsdom; OK scripts executed with no thrown errors; FAIL Shift+U left 10/10 gate(s) unmarked (by design, DW-116); FAIL #pnum did not flip (validator drift, DW-112)
$ python3 <skill>/scripts/restyle_sweep.py . --check           summary: 7 current, 0 stale, 2 without fence (the documented fragments)
$ NODE_PATH=$(npm root -g) node scripts/verify-browser.mjs   summary: 0 failure(s) (13 zero JS errors on all six pages; 13b Shift+U guard; 14 and 14b flowchart; 15 no horizontal overflow at 1280 on any page; session-2's two override assertions scoped out, DW-116)
$ NODE_PATH=$(npm root -g) node scripts/test-case-viewer.mjs  summary: 0 failure(s)
$ NODE_PATH=$(npm root -g) node docs/changes/2026-09-13-session-2-manual-pass/checks.mjs   summary: 19 OK, 0 FAIL (JN-001 to JN-006, 009, 012, 015, 020, 023, 024, 029, 031, 033 to 037)
$ NODE_PATH=$(npm root -g) node docs/changes/2026-09-14-session-2-polish/checks.mjs         summary: 18 OK, 0 FAIL (one per LANDED row with a DOM test: PL-002, 005, 009, 010, 016, 018 to 023, 025, 027 to 030, 032, 033); 0 OK, 18 FAIL at 88d89c9 before the first edit
$ node scripts/audit/section_profile.mjs session-2/index.html   17 sections (16 lesson, 11 core); timing 150/150; 19 roots; ICAP P 0 A 6 C 12 I 1; pairs s1->s2, s6->s6b, s9->s10; prose words per minute median 27.3; per section: s1 347 to 346, s5 1,077 to 1,074, s8 408 to 405, s10 785 to 776, s11 199 to 196, s12d 423 to 418, every other section unchanged; 6,408 to 6,384 words
$ scratch shots.mjs   22 screenshots in .verify-shots/ (git-ignored), PL-<id>-1280.png and PL-<id>-400.png for every edited section: PL-002, PL-005, PL-009-010, PL-016, PL-018-019, PL-020, PL-021-022-023, PL-025, PL-027, PL-028-029-030, PL-032-033; scrollWidth 1280 at 1280 px and 400 at 400 px with no element past the edge at core-only or +Standard; 382 at 380 px (DW-119, unchanged); 0 page errors
$ git diff 88d89c9..e9bebee -U0 -- session-2/index.html   24 hunks, 26 insertions, 27 deletions; every hunk traces to one LANDED row and every LANDED row to a hunk (the trace is in the register's Result column)
```

## Self-review findings

### Important
- None found. What follows is what was looked for.

### Nits (showing 3 of 3)
- [Bugs] `session-2/index.html` §06: three blank source lines remain where the standing-constraint panel was (JN-027); not rendered, not touched.
- [Bugs] `session-2/index.html` §04: `#fxWhich` repeats the active button's label ("F2 · Meeting notes") beside the buttons; harmless, left.
- [Compliance] `docs/changes/2026-09-14-session-2-polish/checks.mjs` departs from the 09-13 pattern by one line (the external-request abort); recorded in the file header and in `plan.md` Departures.

### Looked for and did not find
- Em-dash movement: T7 reproduced session-2 at 2 literal / 38 entity after every one of the 18 page commits and at the end; no landed row authored or deleted a dash (the two literal dashes in §08's opening paragraph sit in the second sentence, which PL-028 did not touch).
- A figure, name, date, citation or chip changed: none in the diff (24 hunks read against the register, every hunk to a row and every LANDED row to a hunk); `verify-migration` 15 passed; `case-inventory --report-check` current; V4 54 chip references resolve; `inject-sources --check` and `inject-case --check` current.
- A word count that rose: none; the profiler shows seven sections lower and nine equal.
- Edits inside a generated region, the managed fence, `CASE.md` or `SOURCES.md`: none (`verify-case` 6 of 6, `build-appendix --check` current, `verify-style` clean).
- Script errors: none in DOM mode at any of the seven script-touching commits, none in Chromium across the six lessons, none in either harness.
- Horizontal overflow: `scrollWidth` 400 at 400 px and 1280 at 1280 px with no element past the edge; 382 at 380 px, the pre-existing two pixels (DW-119).
- Real client data, a learner's name, a new dependency in the tree, a `last_verified` written: none.
- Legal or tax characterisations touched: none; PL-027 removed a repeated aphorism from Check 03 and no authority.

## Rejected options
- A Workflow fan-out under Ultracode: P4 and sdlc-loop rule 2 kept the pass single-threaded; the survey was one full read and one Chromium probe.
- Landing PL-026 ("three of the six") and PL-034 (the stamp): each changes a figure or a date, which `<classes>` reserves for the instructor; both are opened at the top of the report.
- Landing the toggle focus ring (PL-004) and the dead CSS (PL-035): page-level rules fail FIX line 1; two-minute edits on a yes.
- Retagging the four mis-tagged roots (PL-003): reverses part of the 09-12 decision and moves what V6 prints.
- Adding "in this simulation" to §01's explanation (PL-008): raises the count in a paragraph JN-007 cut by two thirds.
- Moving §02's intro paragraph next to its chart (PL-010): the order of the two inserted blocks is instructed; the dangling participle is fixed in place instead.
- Trimming the §01 lock message that names "the third consequence card" (PL-006): the pointer resolves; the rewrite would be taste.

## Flags

### Blocking
- None for 2026-09-14.

### Non-blocking
- F-1. **§07 contradicts its own key.** "three of the six items would survive the check most people actually perform" against the triage tally's "Five of the six exist. Only one fails an existence check." The key is two sound, one misgrounded, two never decided, one fabricated, and has been since 22 August; no reading gives three. Say "five" (or "four", if the check you mean is existence plus reading the text) and it is one word (PL-026).
- F-2. **The footer stamp reads 2026-09-12.** The page changed on 09-13, 09-14 and again in this pass. Say "stamp it" and it takes the date of the last commit (PL-034).
- F-3. **The frontier chart chips `src-aa` H where the record, the footer and the paragraph above it carry M** (PL-011). Say "M" and the chip changes; the bibliography derivatives re-run.
- F-4. **Keyboard users cannot see which toggle is focused in B2 and §03** (PL-004). One CSS rule after the fence; say "add the focus ring".
- F-5. **§03 and §04 assemble the same P.T.C.F prompt twice in a row** (PL-017). Option A in `recommendations.md` trims §03's assembler to its output and score panels, about 30 minutes; the count holds.
- F-6. **Four roots are tagged as the wrong family** (PL-003): `t-s1`, `t-s4`, `t-s8`, `t-s8b`. Retagging makes the profile and V6 honest and partly reverses the 09-12 retagging; the run sheet's four `data-comp` labels follow.
- F-7. **§02 is 1,077 words for six minutes** (PL-013); the run sheet reads the benchmark block rather than running it, so nothing breaks tonight. Three options, from folding the six kind cards to moving them to an appendix section.
- F-8. **§06's Wolfram attribution has no chip** (F-088 of the 09-11 review; PL-024). Naming the essay section is yours; the essay is unreachable from here.
- F-9. **Five lesson-CSS rules match nothing** (PL-035): `.verify`, `#topbar .tb-r`, `#topbar kbd`, `.rnote`, `.pace p`. Ten dead lines; no rendered effect.
- F-10. **Gate 1 was not awaited**: the kickoff's P3 default pre-accepts the FIX class. Every landed row is one commit; `git revert` restores any single one.
- F-11. **Ultracode was on and the pass ran single-threaded** under P4, as on 09-12 and 09-13.
- F-12. **The 09-13 harness waits about 13 s per page load** on the egress-blocked font request (19 loads, about four minutes per run); this pass's harness aborts external requests and runs in seconds. If you want the 09-13 harness to do the same, it is one line.
- F-13. **The committed profile had gone stale** after JN-037 (§02 at 610 words); regenerated in this pass. A profile regeneration belongs in every pass's records commit.

## Next session should
1. Read this file, then `register.md`; answer F-1 and F-2 first (one word and one date), then any of F-3 to F-9 by PL id.
2. Before the Session 3 pre-flight, decide DW-117 (propagate the Session 2 cuts to sessions 3 and 4) and DW-050, and take PL-003 and PL-017 together if you take either, since both move the family counts.
3. Add the profile regeneration to the records step of the next pass's kickoff, so the committed profile is never the stale figure again.
