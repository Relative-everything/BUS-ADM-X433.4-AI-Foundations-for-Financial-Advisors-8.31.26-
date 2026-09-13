# Plan: Session 2 manual pass, batch 1 (the filler cut and the bridge rebuild)
From: direct request in chat, 2026-09-13 ("first implement these changes"). Date: 2026-09-13. Tier: Lite (every change is inside session-2/index.html or a governance ripple of one). Kickoff: kickoff-prompt.md in this folder; toggles at their defaults except K2, which the instruction "implement these" pre-accepts for this batch (recorded here, F-5 style).
Status: accepted by the builder's instruction, 2026-09-13; implemented per ledger.md.

## Reads
- MAINTAINING.md: pre-push gate; migration checks; purge list; generated regions (APX*, CASE, SOURCES sentinels are the generators' span); sources and the two dating fields (last_verified is never written here; a new record needs attest-verified --sync); the editorial checks and the standing rule on baselines (K1 authorises the fall for this pass).
- EDITORIAL.md: A8, A9 (authoredProse), A16, D1 (no new em dash); the exemption register.
- docs/changes/2026-09-12-session-2-preflight/handback.md and plan.md: the page's state at 4836a6f, the gate lines that count as green, the known-red validator lines (V2, V6, #pnum, two fragments).
- docs/deferred-work.md: D1 to D9; DW-050, DW-062, DW-064, DW-085, DW-088, DW-089, DW-091, DW-093, DW-105, DW-106, DW-114; row format; "Adding a row".
- instructor-notes/session-2.md: s0 slot ("Four questions", "Item 4 is now the ten-to-fifteen-turn restart rule (D3)", "Reveal all four"), sCold slot.
- audit/AUDIT-2026-09-07.md §2.1, §2.2, §2.4: what Session 1 delivered (tokens and price 02:12 to 02:22; memory and chat length 01:49 to 02:01; the checklist 01:38 to 01:49); DW-092 items 2 and 10 (input is one fifth of output; the input box is not the context window).
- session-2/index.html at b3658f6: s0 1209 to 1268; sCold 1358 to 1374; the pacing panel 1213 to 1222 and its scripts 3185 to 3245; the topbar #ovr 724; the override handlers 3084 and 3154; BRIDGE 2804 to 2840; MODELS 2275; style fence 11 to 448 (the comment at 461 is outside it).
- scripts/verify-browser.mjs 60 to 185: the Shift+U assertions run for every lesson but the hub. scripts/verify-migration.mjs 430 to 482: check 20 pins pass on zero matches. scripts/test-editorial-regions.mjs T7: reads A9.files from the baseline. scripts/build-changelog.py: LESSON_BUILDER_SKILL locates the sweep.
- SOURCES.md: src-case, src-pricing, src-ctxwindow, src-anthropic-ctx records; record format.
- Fetched 2026-09-13: platform.claude.com/docs/en/build-with-claude/context-windows (the window's contents, per-turn accumulation, context rot) and platform.claude.com/docs/en/about-claude/pricing (the table; output is five times input on every current tier; 0.75 words per token). anthropic.com is egress-blocked.
- The notes: notes-verbatim.md in this folder.

## Files that change
- session-2/index.html modified (JN-001 to JN-005).
- scripts/verify-browser.mjs modified: the two Shift+U assertions scoped to lessons that carry the override (JN-001 ripple).
- README.md modified: line 77 no longer says every lesson page carries the label (JN-001 ripple).
- scripts/editorial-baseline.json modified: A9.files.session-2 lowered to the measured figure, once per commit that moves it (K1).
- docs/case-fact-inventory.md regenerated (JN-002 lowers the drift surface).
- SOURCES.md modified: new record src-context-windows; src-pricing gains a session-2 bridge clause and a 2026-09-13 retrieval; then inject-sources (six footers), build-bibliography (three files), attest-verified --sync (the lock learns the new key), build-unsourced --check.
- instructor-notes/session-2.md modified: the s0 slot for three items; a "Changed since the 09-12 run sheet" list.
- docs/deferred-work.md modified: 2026-09-13 decision paragraph; new rows DW-115 (A9 lowerings), DW-116 (V8, validate_dom and verify-browser after the override's removal), DW-117 (parity: sessions 3 and 4 still carry the override, the pacing prose and the cold-open lede); dated notes on the rows named above.
- CHANGELOG.md modified and changelog/index.html regenerated.
- docs/audits/profiles/session-2.json regenerated.
- This folder: ledger.md, notes-verbatim.md, checks.mjs, plan.md, handback.md.
- Not touched: CASE.md, anything between the CASE or SOURCES sentinels (except by the generator), any APX* region, COLE constants, sessions 0.1, 1, 3, 4.

## Order of work (one item per commit)
1. This plan, the ledger, the notes, the harness.
2. JN-001 override removal, with the verifier scoping and the README sentence.
3. JN-002 the s0 block, with the baseline lowering, its register row and the regenerated inventory.
4. JN-003 the cold open, with the baseline lowering and the row's second line.
5. JN-004 the pacing panel.
6. JN-005 the bridge, with SOURCES.md and every generated derivative.
7. Records: run sheet, register, changelog and served page, profile.
8. Gate, harness, handback, push.

## Golden values
| Value | Where | Derivation | Conf. | Status |
|---|---|---|---|---|
| Output is five times input on every current tier: Sonnet 5 $2/$10, Opus 5 $5/$25, Fable 5 $10/$50 per MTok | bridge item 1 key | pricing page fetched 2026-09-13 | H | by inspection of the fetched table |
| About 0.75 words per token; a 3,000-word note is roughly 4,000 tokens | bridge item 1 key | pricing page FAQ fetched 2026-09-13; 3,000 / 0.75 | H | by inspection |
| Each turn's input is all previous conversation history plus the current message; the system prompt, every message including tool results, images and documents, and the tool definitions all count | bridge item 2 key | context-windows page fetched 2026-09-13, quoted | H | by inspection |
| As token count grows, accuracy and recall degrade ("context rot") | bridge item 3 key | context-windows page fetched 2026-09-13, quoted | H | by inspection |
| Ten to fifteen turns | bridge item 3 key | the instructor's working rule as taught 01:50 to 01:57 (D3 row); no published threshold exists and the key says so | builder's figure | as taught |
| A9 session-2 after each commit | editorial-baseline.json | measured by T7 after the edit; recorded in DW-115 with before and after | H | measured, not predicted |

## Risks
- Riskiest step: 6. A new SOURCES.md record takes every generator down until the lock is synced; six footers change; verify-sources must stay clean.
- Step 2 turns three validators red for session-2 by design (V8, validate_dom's Shift+U assertion, and verify-browser's two override lines unless scoped); the scoping edit is the one test change in this pass and is flagged.
- Step 3 removes the recurring-question card, the spine construct DW-050 holds open, and the pins check 20 carried for session-2; check 20 passes on zero matches, so nothing guards session-2 prose case figures after this (none remain in s0).
- Interpretation: JN-003 removes the cold open's opening line, which the note implies ("it should JUST say") but does not list; the label above the box is kept for accessibility. Both are flagged.
- Nothing is irreversible: one branch, one commit per item, no merge.

## Rejected options
- Removing the bridge entirely (the note's first option): pedagogy s3.2 makes retrieval-before-exposition the opening move of Sessions 2 and up, and the three topics the note names were all delivered on 08-31; a rebuild keeps the construct and fixes its content.
- Keeping the override handler and dropping only the label: V8 fails either way ("wired and visibly labelled"), and a hidden keyboard reveal is worse than none.
- Adding a record for the anthropic.com engineering post on context rot: egress-blocked; the platform docs page states the same claim first-party and was fetched.
- Re-allocating s0's six minutes to the bridge's ratified seven: moves the 150 arithmetic and the generated budget; DW-105 stands, flagged.
- Propagating the pacing cut, the cold-open cut and the override removal to sessions 3 and 4: the note is Session 2; parity is recorded as DW-117 for the instructor.

## Proof
- checks.mjs: JN-001 to JN-005 OK, "summary: 5 OK, 0 FAIL", run from a clean HEAD.
- test-editorial-regions.mjs: 9 passed; T7 prints the re-recorded session-2 figures.
- The full gate of the kickoff's <verification> block with only the known-red lines red, plus V8 and the Shift+U lines now recorded in DW-116.
- grep -c "Nine terms" session-2/index.html = 0; grep -c 'data-gate="g1"' = 0; grep -c "Reveal all three" = 1; grep -c shiftKey = 0.

## Departures from plan
None. Every file that changed is named above. Two corrections to the harness's own assertions (JN-001 matched any shiftKey, which the case viewer also uses; JN-004 looked for a dim class the core-only mode never sets) landed inside the item commits they test; neither touched the page. docs/case-fact-inventory.md was regenerated twice, after JN-002 and after JN-005, both named.

## Batch 2 (2026-09-13, notes lines 43 to 93 of notes-verbatim.md)
Status: accepted by the builder's instruction ("Here are remaining updates to implement"), K2 pre-accepted as in batch 1; implemented per ledger.md, 28 DONE and 1 DONE-HUMAN. Departures: the §04 section was retitled to match its new activity, which the note did not ask for (flagged); the bibliography derivatives were regenerated a second time at the end because later chips changed the derived citation counts. Tier: Lite; the four rebuilds (JN-015, JN-020, JN-024, JN-034) are new elements inside existing sections and are marked [NEW] under R11.

### Additional reads
- session-2/index.html at 0ceba1c: sections s3, s5, s6, s6b, s7, s8, s10, s11, s12, s2 in full; the scripts for the stance capture, the temperature slider, MODELS and the two charts, the estimator, the PTCF assembler, the fixtures and scorer, the quiz, the buy-sell interview, the hallucination chart, the rubric and peer panels, the checklist and the Laplace toggles, read at the group that edits them.
- SOURCES.md records src-magesh, src-finra2409, src-memory, src-personalization, src-dahl-fictions, src-aa, src-openai-pricing.
- Fetched 2026-09-13: platform.claude.com/docs/en/api/messages (temperature deprecated on models after Opus 4.6; "even with temperature of 0.0, the results will not be fully deterministic"). Egress-blocked: artificialanalysis.ai, livebench.ai, openai.com, www.anthropic.com.
- component-library.md entries 10 (estimate-then-reveal, INLINE), 15 (builder-assembler), 6 (parameter-sandbox).

### Files that change (in addition to batch 1)
- session-2/index.html (JN-006 to JN-034).
- SOURCES.md: new record src-api-messages; session-2 clauses on src-personalization and src-memory; then the lock sync, inject-sources, build-bibliography, build-unsourced.
- scripts/editorial-baseline.json (K1 lowerings, one line each on DW-115).
- session-2 appendix regions regenerated by build-appendix.mjs after the two title changes (JN-025, JN-031).
- docs/unsourced-claims.md regenerated (Finding 02's clause deleted).
- instructor-notes/session-2.md: the §07 verification checklist (from the removed gate), the Session 3 reading list and the closing question (from the removed §09 text), the live-audit slot, the data-rule reminder, the §00 items already there.
- docs/deferred-work.md: header decisions (R3 gates off the page; D5 superseded by the live audit; the two new interactions; the estimator rebuild); DW-115 lines; a row for the figures that could not be re-verified from here; notes on DW-050, DW-056, DW-090, DW-093, DW-094, DW-099, DW-101, DW-109, DW-110, DW-114.
- CHANGELOG.md and changelog/index.html; docs/audits/profiles/session-2.json; this folder's ledger.md, checks.mjs, handback.md.

### Order of work
Group A: JN-006 to JN-015 (§01, §02), push. Group B: JN-016 to JN-021 (§03, §04), push. Group C: JN-022 to JN-030 (§05, §06, §07), push. Group D: JN-031 to JN-034 (§08, §09, B2), push. Then records, gate, handback, push.

### Golden values
| Value | Where | Derivation | Conf. |
|---|---|---|---|
| Temperature is deprecated on models released after Claude Opus 4.6; even at 0.0 results are not fully deterministic | §01 list and Consequence 03 | API reference fetched 2026-09-13, quoted | H |
| Anthropic rates: Opus 5 $5/$25, Fable 5 $10/$50, Opus 4.8 $5/$25, Sonnet 5 $2/$10 per MTok | §02 MODELS, Finding 01 | pricing page fetched 2026-09-13 | H |
| Artificial Analysis index scores and per-task costs; OpenAI rates; LiveBench | §02 chart, slopegraph | not re-verifiable from here (egress-blocked); August as-of dates stand | as recorded |
| Lexis+ AI ~17%, Westlaw AI-Assisted Research ~33% | §07 lede chip | src-magesh record (host egress-blocked; record H as recorded) | H as recorded |
| Three Cups readouts 33%, 50%, 100% | B2 | by inspection: one coin under three cups, then two, then one | by inspection |
| Estimator token assumptions per task type | §02 estimator | constructed, labelled illustrative on the page | L, labelled |

### Risks
- JN-020 and JN-015 are the largest rewrites of script on the page; each is checked in Chromium before commit and the DOM-mode validator confirms no thrown error (DW-103 discipline).
- Every deletion of an "N minutes" block carries an em dash; the ratchet falls several times and every fall is recorded on DW-115 (K1).
- Removing the §04 gate departs from pedagogy R3's shipping form; the checklist moves to the run sheet and the departure is flagged.
- The live audit puts §08 back in the room; the run sheet takes the minutes from the reserve and says so.

### Rejected options
- A Workflow fan-out under Ultracode: K4 and sdlc-loop rule 2 keep the pass single-threaded, and forty edits to one file would collide.
- Adding Fable 5.1 to the frontier chart: its index score is unavailable here; a point without a measured cost would be invented.
- Citing FINRA 4511 or SEC 17a-4 in Consequence 01: no record exists and the hosts are unreachable; the card states the practice consequence without a rule number.
- Keeping a marker on Finding 02's token counts: the instruction removes disclaimers from §02 and the clause carries no teaching load; deleted instead.
