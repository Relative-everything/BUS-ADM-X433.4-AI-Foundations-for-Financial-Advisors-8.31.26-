# Handback: Session 2 manual pass, batch 1 (the filler cut and the bridge rebuild)
Branch: `claude/beautiful-maxwell-1bqad4`. Change: `docs/changes/2026-09-13-session-2-manual-pass`. Tier: Lite. Status: complete for batch 1; the pass stays open for the instructor's next batch of notes.

## Summary
Asked: implement the first batch of manual-pass notes on `session-2/index.html` the day before the class, mostly deletions of filler plus a rebuild of the retrieval bridge. Done: five ledger items, five commits after the plan, all five DONE with a passing browser check each. §00 falls from 727 words to 149 and keeps the title, the lede, the depth control and the bridge; the bridge asks three things Session 1 taught and its keys cite two vendor pages fetched today; the cold open is heading, box and button; the pacing panel is buttons and timing cells; the Shift+U override is gone. Every repository check is green; the A9 ratchet was re-recorded three times on the K1 instruction (66 to 61 total) with a register row per lowering; the skill's validators fail only on their known defects and, newly and by design, on the override they still expect (DW-116). Nothing was merged.

## What changed
- §00 no longer introduces the household, lists outcomes, defines nine terms or tells the room what to open; it opens with the lede and the depth control and goes straight to the bridge.
- The bridge has three items: which side of the token price is dearer (output, five times input on every current tier, with the three tiers' rates and the vendor's 0.75-words-per-token rule of thumb); what travels with a message (all previous conversation history plus the new message, the system prompt, every message including tool results, images and documents, and the tool definitions, all billed as input); and the new-chat rule, stated as your ten-to-fifteen-turn working rule with the two reasons the vendor documents, the re-sent history and the degradation the page calls context rot. The key says which part is a heuristic.
- The bridge's button reads "Reveal all three", the counter counts to three, and the source line under it names both vendor pages with today's retrieval date.
- The cold open is the heading, the box with its label, the button and the result panel. The opening line, the first-run sentence and the work-along are gone.
- The pacing panel is the four depth buttons and the three timing cells. The heading, the two paragraphs and the state line under the buttons are gone; Core only and the tier buttons behave as before.
- There is no Shift+U badge and no handler on the page. Every key the override used to open has its own reveal control.
- The footer gains a Context windows entry; the Pricing entry's session-2 retrieval is today. §04's fixture sentence carries the case's L chip, because the deleted cards had the only one.
- Records: the run sheet opens with what changed and its §00 slot describes the three items; the register carries the 2026-09-13 decisions, rows DW-115 to DW-117 and dated notes on twelve rows; the changelog entry and its served page; the case-fact inventory and the section profile regenerated.

## What to watch for
- Open `session-2/index.html` at the default depth. Under the title you should see the lede sentence, then a panel with three timing cells (69 min · 11 core sections; 81 min · 5 appendix sections; 150 min · everything) and four buttons, then "Retrieval bridge" with three questions. If you see case cards or an "Outcome 01" card, the wrong file is open.
- Type anything over eight characters into the second bridge box: the counter should read "1 of 3 answered". Press "Reveal all three": three green keys appear; the first says output is five times input; the second says all previous conversation history plus the current message; the third says ten to fifteen turns is a working rule and names context rot.
- The cold open should be the heading "The Last Prompt You Sent", one label line, the box, the button and "Paste something and press the button." Paste a prompt and press: eight labelled checks with "n of 8 present".
- Press Shift and U anywhere on the page: nothing should happen and no badge should appear in the top bar.
- Click "+ Standard" in the pacing panel: the five appendix sections appear in place. Click "Core only": they disappear again. No sentence appears under the buttons.
- Print the run sheet again; its first section lists what changed since the 09-12 version.

## How to read the result
Every figure in the three bridge keys is the vendor's, fetched today from platform.claude.com: the pricing table (H) and the context-windows page (H). The one number that is not the vendor's is the ten-to-fifteen-turn rule, which the key labels as your working rule from Session 1; no first-party source gives a turn threshold, and the page says only that accuracy and recall degrade as the token count grows. No case figure is typed anywhere in the new text; the bridge's old item 2, which read two case figures through `COLEm`, is gone, and the case-fact drift surface fell. The prose density of §00 is now 24.8 words per allocated minute against the 37 to 42 band the skill reports but does not enforce; the room's complaint after Session 1 was pace, so low is the right side to be on.

## Verification output
```
$ node scripts/test-editorial-regions.mjs            session-2 2 literal / 59 entity; summary: 9 passed, 0 failed
$ node scripts/verify-editorial.mjs                  summary: 16 rule(s) clean, 0 hard failure(s), 7 advisory
$ node scripts/verify-case.mjs                       summary: 6 of 6 lessons carry the current CASE.md v4.0 block
$ node scripts/inject-case.mjs --check               summary: 6 current, 0 stale, 0 without sentinels · stamp cba5438
$ node scripts/inject-sources.mjs --check            every lesson carries the current SOURCES.md block
$ node scripts/verify-sources.mjs                    ADVISE 3 source(s) listed by a lesson that never cites them (the pre-existing session-3 and session-4 items); summary: 5 of 5 lessons carry the current SOURCES.md block
$ node scripts/verify-migration.mjs                  summary: 15 passed, 0 failed (check 20: the session-2 pins now match nothing and pass on zero matches)
$ node scripts/build-appendix.mjs --check            all generated regions agree with their sections
$ node scripts/build-unsourced.mjs --check           current docs/unsourced-claims.md (11 marked claim(s))
$ node scripts/build-bibliography.mjs --check        all three generated files are current
$ node scripts/build-cardsort.mjs --check            OK current session-1/index.html
$ node scripts/case-inventory.mjs --report-check     current docs/case-fact-inventory.md
$ RESTYLE_SWEEP=<skill>/scripts/restyle_sweep.py node scripts/verify-style.mjs   summary: style fence clean
$ python3 <skill>/scripts/validate_lesson.py session-2/index.html --case Cole --purge "Okonkwo,Reyes,Adaeze,Ilesanmi" --require-timing --require-tagging
  FAIL V2 x8 (footer citation hyperlinks, one more than 09-12 because the Context windows entry carries a link; upstream DW-029)
  PASS V4 40 chip reference(s) resolve; 22 footer source(s)   WARN V4 3 legend chips; 9 nochip footer sources never chipped (by kind)
  PASS V5 segments sum to 150 = allocated 150 = target 150
  PASS V7 case 'Cole' present (41x) and labelled synthetic at introduction
  FAIL V6 17 distinct interactions (band 13-15); adjacencies builder-assembler, multi-column-sorter, work-along-gate (by design; DW-094, DW-101)
  FAIL V8 Shift+U override missing or unlabelled (by design; DW-116)
  RESULT: FAIL (11 fail, 3 warn)
$ node <skill>/scripts/validate_dom.js session-2/index.html   MODE=jsdom; OK scripts executed with no thrown errors; FAIL Shift+U left 14/14 gate(s) unmarked (by design, DW-116); FAIL #pnum did not flip (validator drift, DW-112)
$ python3 <skill>/scripts/restyle_sweep.py . --check           summary: 7 current, 0 stale, 2 without fence (the documented fragments)
$ node scripts/verify-browser.mjs                    summary: 0 failure(s); session-2 prints "carries no Shift+U override (removed 2026-09-13, DW-116); the two override assertions do not apply"
$ node scripts/test-case-viewer.mjs                  summary: 0 failure(s)
$ node docs/changes/2026-09-13-session-2-manual-pass/checks.mjs   JN-001 OK, JN-002 OK, JN-003 OK, JN-004 OK, JN-005 OK; summary: 5 OK, 0 FAIL
$ grep -c: "Nine terms" 0 · 'data-gate="g1"' 0 · "First run." 0 · "Two ways through" 0 · "Reveal all three" 1 · "of 4 answered" 0 · shiftKey&&(e.key==='U' 0
```

## Self-review findings

### Important
- None found. What follows is what was looked for.

### Nits (showing 4 of 4)
- [Bugs] `session-2/index.html`, the bridge and buy-sell scripts still export `window.__revealBridge` and `window.__revealBsell`; their only caller was the removed override. Harmless; two lines.
- [Bugs] `session-2/index.html`, the depth control's `apply()` still computes `shown` and `mins`, which fed the removed readout. Harmless; dead arithmetic.
- [Compliance] `session-2/index.html` lines 742 and 1052, inside the generated case span, two comments still say "the page-wide Shift+U override strips .hidden". They are `inject-case.mjs`'s text, true of four lessons, and not editable on the page.
- [Compliance] The bridge's item 1 key types the three tiers' rates as literals in a script string although the page's `MODELS` array carries the same figures. `src-pricing`'s recheck_before covers the drift; interpolating would have made a read-aloud sentence harder to edit.

### Looked for and did not find
- Em-dash additions: T7 reproduced the recorded baseline after every commit; the three falls are instructed (K1) and recorded (DW-115) with before and after. A8's minority count (2 literal) is unchanged.
- Typed case figures: none in the new text; the bridge's `COLEm` reads are gone with item 2; `case-inventory --report-check` is current after two regenerations; check 20 still pins session-4's exhibits.
- Edits inside a generated region: none; `verify-case` 6 of 6, `inject-sources --check` current, `build-appendix --check` current, `build-cardsort --check` current. The footer changed through `inject-sources.mjs` only.
- `last_verified` written: none; the lock diff in e97d1ad adds the new key's empty entry and touches no populated date.
- Unresolved chip keys: none (V4 40 resolve). Footer entries without a chip that A15 does not exempt: none for session-2 (A15 clean).
- Script errors: none in DOM mode, none in Chromium across six pages, none in the five-check harness.
- Real client data or a learner's name in the notes or the diff: none; every figure in the notes is the synthetic Cole file's.
- New dependencies in the tree: none (jsdom lives in the session scratchpad; Playwright is the environment's global).
- Legal or tax characterisations added: none.

## Rejected options
- Removing the bridge (the note's first option): pedagogy s3.2 makes retrieval the opening move of Sessions 2 and up, and all three topics were delivered on 08-31; rebuilt instead.
- Keeping the override handler and dropping only the label: V8 fails either way, and a hidden keyboard reveal is worse than none.
- A record for the anthropic.com engineering post on context rot: egress-blocked; the platform docs page states the same claim first-party and was fetched.
- Re-allocating §00's six minutes to the bridge's ratified seven: moves the 150 arithmetic and the generated budget; DW-105 stands.
- Propagating the four cuts to sessions 3 and 4: the notes name Session 2; recorded as DW-117 for the instructor.
- Deleting the cold open's label along with its lede: a text box owes a screen reader a label and the note did not name it; flagged (F-2).
- Adding a `data-nochip` kind for `src-case` instead of a chip: changes the A15 enumeration in `verify-editorial.mjs` and `EDITORIAL.md`; one L chip on the sentence that rests on the case is the smaller edit.

## Flags

### Blocking
- None for 2026-09-14.

### Non-blocking
- F-1. **The bridge is three items in six minutes.** Pedagogy s4 ratifies four items and seven minutes; the notes set three, and §00's eyebrow still says six (DW-105). The run sheet gives the slot seven minutes at 6:14 PM. Say "seven" if you want the eyebrow to move; it costs a minute somewhere else in the 150.
- F-2. **The cold open keeps one label line above the box** ("Paste your last prompt, verbatim, from any tool and any context"). Your note said the box should "JUST say" heading, box, button; the label was not in the list and a labelled text box is the accessibility floor. Say "drop the label" and it goes, with a visually hidden label left for screen readers.
- F-3. **The pacing panel's heading "How this session is paced" was removed** on the reading that "remove all the text except the buttons and the timing" includes it. Say "keep the heading" and it comes back.
- F-4. **Sessions 3 and 4 still carry what Session 2 dropped** (DW-117): the override, the pacing prose, the cold open's opening line. Decide before their pre-flights whether the cuts propagate.
- F-5. **The new-chat rule's turn count has no published source.** The key says so, and the two reasons are the vendor's. If you want a threshold with a citation, none exists on the platform page; the arxiv and anthropic.com hosts are egress-blocked from here.
- F-6. **V2 now reports eight footer links, not seven**, because the Context windows entry carries one. Same upstream false positive (DW-029).
- F-7. **`docs/spine-brief.md` still describes §00's recurring-question card.** A documentation staleness, not a page defect (noted on DW-050).
- F-8. **Gate 1 was not awaited.** Acceptance of `plan.md` was taken from "first implement these changes" (K2 pre-accepted for this batch), as recorded in the plan. Every item is one commit; `git revert` of any of them restores that item's text.
- F-9. **The run sheet changed and must be reprinted.** Its first section lists what moved.

## Next session should
1. Read this file, then `ledger.md` in this folder; the next batch of notes appends to `notes-verbatim.md` and continues the ledger at JN-006.
2. Take F-2 and F-3 as yes-or-no answers before touching §00 or the cold open again; each is a one-line edit.
3. Before the Session 3 pre-flight, decide DW-117 (propagate the four cuts or record the divergence).
