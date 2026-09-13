# Handback: Session 2 manual pass, batches 1 and 2
Branch: `claude/beautiful-maxwell-1bqad4`. Change: `docs/changes/2026-09-13-session-2-manual-pass`. Tier: Lite. Status: complete for both batches; the pass stays open for any further notes.

## Summary
Asked: implement the instructor's manual-pass notes on `session-2/index.html` the day before the class: batch 1 (five items, merged to `main` as PR #25) and batch 2 (twenty-nine items across ten sections, this branch). Done: 34 ledger rows, 33 DONE with a passing browser check or grep, 1 DONE-HUMAN (the benchmark and OpenAI figures that only a browser outside this environment can re-verify). Four elements were rebuilt or added: the §02 estimator as a personal task mix, the §04 step-through builder, the §06 reverse-prompting starters, and Three Cups in B2. Every repository check is green; the em-dash ratchet fell from 66 to 40 total across seventeen commits, each recorded on DW-115; the skill's validators fail only on their known defects and on the override, count and adjacency lines the instructor's decisions produce. Nothing was merged in batch 2.

## What changed
- §00: title, lede, depth control and a three-item bridge (batch 1).
- §01: the vote reveals seven sources of run-to-run difference, sourced to four vendor pages; the explanation is a third of its length; the comparison exercise is gone; the consequence cards are shorter, the first about a compliance review and the third a consequence: you cannot set temperature in the chat product or, on current Claude models, in the API.
- §02: a task is defined with five advisory examples before cost is compared; the decision block, the verification panel and the unverifiable token clause are gone; Finding 01 names Fable 5.1; the estimator is a personal task mix priced across Sonnet 5 and Opus 5, with Fable 5.1 as the third comparison, redrawing on every slider.
- §03: the opening paragraphs lose a third of their words; the persona evidence stands; the rebuild exercise is gone.
- §04: the verification gate is off the page and in the run sheet; the sequencing paragraphs are gone; three premade prompts are built one element at a time across four levels, with the assembled prompt loading into the unchanged rewrite editor.
- §05: no discussion block. §06: each interview question opens on its own click; five reverse-prompting starters; the technique is named in the title; the case restatement and the standing-constraint panel are gone.
- §07: both base rates are chipped on the sentence; the chart caption fits; Check 03 says how to check whether a ruling or case is superseded.
- §08: the instructor's live audit replaces the peer review; the room scores along. §09: the two cards, the capture and the checklist remain; everything below is gone and the reading list and closing question live in the run sheet.
- B2: Three Cups, a predict-then-reveal click-through with the verbatim explanation paragraph.
- Records: run sheet (batch-2 changes at the top, the §04 verification list, the live-audit slot at 7:57 PM taking eight minutes from the reserve, the reading list and the closing question); register (two decision paragraphs, rows DW-115 to DW-119, notes on twenty-two rows); two changelog entries; SOURCES.md (src-context-windows, src-api-messages; session-2 clauses on src-pricing, src-personalization, src-memory, src-models); profile and inventory regenerated.

## What to watch for
- §01: vote either way. A seven-item list appears under the vote; the third consequence card says temperature is not yours to set and carries an H chip.
- §02: after the two charts, "What a task is" with five cards, then the estimator. Drag "Share of the work that needs judgment" to 90%: the first bar's gold segment grows, the sentence starts "90% of your tasks run on Claude Opus 5". No box for runs per month exists any more.
- §04: press F2 · Meeting notes, then under Format press "Specified and checkable": the Format block in the prompt turns to the headed-sections text with a solid border; press "Absent" under Context and the Context block reads "no context given" in a dashed box. "Load this version into the editor" fills the editor.
- §06: click question 2 in the buy-sell panel; only it opens and the count reads "1 of 10 asked". Pick a starter under "Start a Reverse-Prompting Interview": a kickoff appears with a Copy button and six questions.
- §07: the caption under the hallucination chart is two lines and ends inside the frame at 1280 and on a phone.
- §08: "Part two · live audit"; the four criteria score 0 to 3 and total to 12.
- §09 ends at the deliverable checklist. Nothing below it.
- B2 (set depth to Foundational): pick 66%, Start, lift two cups: 33%, 50%, 100%, the last cup double-bordered, the gap panel showing 66% against 100%, the disclosure sentence. Play again resets.
- Reprint the run sheet; it changed in six slots and has a new one.

## How to read the result
Every new figure on the page is either the vendor's, fetched today from platform.claude.com (pricing, context windows, the Messages API reference, the models overview; all H), or a labelled construction (the estimator's token counts per task, the reverse-prompting questions, the cups). No case figure is typed in the new text; the builder's 48 element variants name none and its three inputs are read from the injected case at parse time. The one thing asked for and not delivered is the browser re-verification of the Artificial Analysis index, the OpenAI rates and LiveBench: those hosts are egress-blocked here, so the figures keep their August dates and DW-118 lists them. Prose density fell in every section the notes touched except §01, §07 and B2, where sourced content was added: §04 from 760 words to 271, §09 from 680 to 233, §03 from 557 to 427.

## Verification output
```
$ node scripts/test-editorial-regions.mjs            session-2 2 literal / 38 entity; summary: 9 passed, 0 failed
$ node scripts/verify-editorial.mjs                  summary: 16 rule(s) clean, 0 hard failure(s), 7 advisory
$ node scripts/verify-case.mjs                       summary: 6 of 6 lessons carry the current CASE.md v4.0 block
$ node scripts/inject-case.mjs --check               summary: 6 current, 0 stale, 0 without sentinels · stamp cba5438
$ node scripts/inject-sources.mjs --check            every lesson carries the current SOURCES.md block
$ node scripts/verify-sources.mjs                    ADVISE 3 source(s) listed by a lesson that never cites them (pre-existing, sessions 3 and 4); summary: 5 of 5 lessons carry the current SOURCES.md block
$ node scripts/verify-migration.mjs                  summary: 15 passed, 0 failed
$ node scripts/build-appendix.mjs --check            all generated regions agree with their sections
$ node scripts/build-unsourced.mjs --check           current docs/unsourced-claims.md (11 marked claim(s))
$ node scripts/build-bibliography.mjs --check        all three generated files are current (regenerated at the end: later chips changed the derived counts)
$ node scripts/build-cardsort.mjs --check            OK current session-1/index.html
$ node scripts/case-inventory.mjs --report-check     current docs/case-fact-inventory.md
$ RESTYLE_SWEEP=<skill>/scripts/restyle_sweep.py node scripts/verify-style.mjs   summary: style fence clean
$ python3 <skill>/scripts/validate_lesson.py session-2/index.html --case Cole --purge "Okonkwo,Reyes,Adaeze,Ilesanmi" --require-timing --require-tagging
  FAIL V2 x10 (footer citation hyperlinks; four are the platform.claude.com pages added today; upstream DW-029)
  PASS V4 54 chip reference(s) resolve; 26 footer source(s)   WARN V4 3 legend chips; 9 nochip footer sources never chipped (by kind)
  PASS V5 segments sum to 150 = allocated 150 = target 150
  PASS V7 case 'Cole' present (35x) and labelled synthetic at introduction
  FAIL V6 19 distinct interactions (band 13-15); adjacencies builder-assembler, multi-column-sorter, work-along-gate (by instruction; DW-094, DW-101)
  FAIL V8 Shift+U override missing or unlabelled (by design; DW-116)
  RESULT: FAIL (13 fail, 3 warn)
$ node <skill>/scripts/validate_dom.js session-2/index.html   MODE=jsdom; OK scripts executed with no thrown errors; FAIL Shift+U left 10/10 gate(s) unmarked (by design, DW-116); FAIL #pnum did not flip (validator drift, DW-112)
$ python3 <skill>/scripts/restyle_sweep.py . --check           summary: 7 current, 0 stale, 2 without fence (the documented fragments)
$ node scripts/verify-browser.mjs                    summary: 0 failure(s)
$ node scripts/test-case-viewer.mjs                  summary: 0 failure(s)
$ node docs/changes/2026-09-13-session-2-manual-pass/checks.mjs   16 OK, 0 FAIL (JN-001 to JN-006, 009, 012, 015, 020, 023, 024, 029, 031, 033, 034)
$ screenshots  .verify-shots/cups-{1-predict,2-33pct,3-50pct,4-100pct-gap}-{380,1024}.png (git-ignored)
```

## Self-review findings

### Important
- None found. What follows is what was looked for.

### Nits (showing 5 of 6)
- [Bugs] `session-2/index.html`, the §01 vote's lock message for the second position still says "the third consequence card is the part most people have not thought through"; still true of the rewritten card, but written for the old one.
- [Bugs] `session-2/index.html`, `window.__revealBridge` and `window.__revealBsell` are still exported; their only caller left in batch 1.
- [Bugs] `session-2/index.html`, the depth control's `apply()` still computes `shown` and `mins` for a readout that no longer exists.
- [Compliance] `session-2/index.html` §04 was retitled "Building Prompts Against P.T.C.F" to match the builder; the note did not ask for the retitle (Flag F-3).
- [Compliance] The estimator's per-task token counts (4,000/900; 60,000/1,200; 9,000/600; 1,500/700) are constructed and labelled illustrative on the page and in the readout; no measurement backs them.

### Looked for and did not find
- Em-dash additions: T7 reproduced the recorded baseline after every one of the 34 item commits; the 17 falls are instructed (K1) and recorded on DW-115 with before and after; the literal count (2) never moved.
- Typed case figures: none in the new text; the builder's inputs read `COLEDOCS`/`COLE` at parse time; `case-inventory --report-check` current; `verify-migration` 15 passed.
- Edits inside a generated region: none by hand; `build-appendix.mjs` regenerated the regions after each retitle; `verify-case` 6 of 6; `inject-sources --check` current.
- `last_verified` written: none; the lock adopted `src-context-windows` and `src-api-messages` with empty entries only.
- Unresolved chip keys: none (V4 54 resolve); orphaned footer keys A15 does not exempt: none for session-2.
- Script errors: none in DOM mode at any of the 34 commits, none in Chromium across six pages, none in the 16-check harness.
- Real client data or a learner's name: none in the notes or the diff; every input is the synthetic Cole file or a constructed example.
- New dependencies in the tree: none. Legal or tax characterisations asserted as settled: none; Consequence 01 names no rule, Check 03 describes procedure.
- Horizontal overflow at 380 px caused by new elements: none; the two pixels that exist are the §04 level tiles on `main` before the pass (DW-119).

## Rejected options
- A Workflow fan-out under Ultracode: K4 and sdlc-loop rule 2 keep the pass single-threaded, and thirty-four edits to one file would collide.
- Removing the bridge (batch 1) or keeping the peer review async (batch 2): the notes chose the alternatives and the plan records why.
- Citing FINRA 4511, SEC 17a-4 or Advisers Act 204-2 in Consequence 01: no record exists and the hosts are unreachable; the card states the practice consequence without a rule number.
- Adding Fable 5.1 to the frontier chart: no index score is reachable; a point without a measured cost would be invented.
- Interpolating the tier rates into the bridge and consequence keys from `MODELS`: read-aloud sentences are easier to edit as literals; the vendor records' recheck fields cover drift.
- Keeping the paste box beside the builder: the scorer never read it (S2-29) and the note replaced the scoring activity.
- Propagating any batch-2 cut to sessions 3 and 4: the notes name Session 2 (DW-117).

## Flags

### Blocking
- None for 2026-09-14.

### Non-blocking
- F-1. **The benchmark and OpenAI figures on §02 were not re-verified.** artificialanalysis.ai, livebench.ai and openai.com are egress-blocked from the build environment. The seven index scores, seven per-task costs, three OpenAI rates and Findings 02 and 03 keep their August dates; DW-118 lists them with the values to compare. Ten minutes in a browser closes it. Fable 5.1 is on the pricing page at Fable 5's rates and is named in Finding 01, not plotted.
- F-2. **The live audit takes eight minutes from the reserve.** The run sheet puts §08 at 7:57 PM and the reserve at 8:05 PM for 17 minutes. Say "drop the live audit slot" to give the reserve its 25 minutes back; the page keeps the live-audit framing either way.
- F-3. **§04 is retitled "Building Prompts Against P.T.C.F".** The note replaced the scoring activity but did not name a title; the old title described scoring your own prompts. Say "old §04 title" to revert; the appendix regions regenerate with it.
- F-4. **Consequence 01 names no rule.** "In an annual compliance review that gets flagged" is the practice consequence; FINRA 4511, SEC 17a-4 and Advisers Act 204-2 are the rules you may want to say aloud. Adding one to the page needs a SOURCES.md record fetched from a reachable host.
- F-5. **The estimator's token counts per task are constructed.** They are labelled illustrative and printed in the readout so a learner can substitute measured counts. If you have real per-task token counts from your own workflows, four numbers replace them.
- F-6. **Pedagogy R3's shipping form was departed from.** The §04 gate and the §02 verification panel are off the page on instruction; the §04 checklist is in the run sheet's §07 slot. The two legal characterisations DW-109 tracks are now stated only in the §07 key and that list.
- F-7. **The interaction count is 19 against the skill's band of 13 to 15**, and V6 says so; DW-094 and DW-101 record the count and the adjacencies as by instruction.
- F-8. **Gate 1 was not awaited for either batch**; acceptance was taken from "first implement these changes" and "Here are remaining updates to implement" (K2 pre-accepted). Every item is one commit; `git revert` restores any single item.
- F-9. **Ultracode was on and the pass ran single-threaded** under K4 and sdlc-loop rule 2, as on 09-12.
- F-10. **Two pixels of horizontal scroll at 380 px are pre-existing** (§04 level tiles; DW-119).
- F-11. **The run sheet changed in six slots and gained one; reprint it.**
- F-12. **`docs/spine-brief.md` now describes two things the page no longer carries** (the §00 card and the §09 recurring-question paragraph; DW-050).

## Batch 3 (2026-09-13, after the batch-2 merge)
One item, JN-035, DONE: §07's six triage explanations are four or five plain bullets each, facts unchanged, rendered as a list. Watch for: click any category on citation 3 and a five-line list opens under Correct or Not this one; no paragraph. T7 unchanged; DOM mode clean; checks.mjs 17 OK after its JN-035 check was corrected three times (a page-scoped constant read as a global, the tally counted as an item, element handles used as locators; the page was right each time).

## Next session should
1. Read this file, then `ledger.md`; a further batch of notes appends to `notes-verbatim.md` and continues at JN-035.
2. If the instructor answers F-2 or F-3, each is a one-line edit plus `node scripts/build-appendix.mjs` for F-3.
3. Before the Session 3 pre-flight, decide DW-117 (propagate the Session 2 cuts to sessions 3 and 4) and DW-050 (whether Session 2 states the spine's open question at all).
