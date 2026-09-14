# Handback: Session 3 manual pass, batch 1
Branch: `claude/lucid-volta-bi2rfg`. Change: `docs/changes/2026-09-13-session-3-manual-pass`. Tier: Lite. Status: complete; the pass stays open for a further batch of notes.

## Summary
Asked: implement the instructor's manual-pass notes of 2026-09-13 on `session-3/index.html`: shorten §00 to §03, remove the cold open, then rebuild everything after §03 at a beginner's depth around the syllabus row for Session 3. Done: 30 ledger rows, 25 DONE with a passing browser check or grep, 2 DONE-HUMAN (the syllabus analysis and the complexity criterion), 1 NOT-DONE (the instructor's chat history, unreachable), 2 SPLIT parents, across 29 commits after the plan. The page went from 19 sections and 6,752 words to 18 sections and 4,635 (a cut of 2,117 words, just under a third of all section text; the prose-only cut is larger), from a core of 72 minutes to 67 inside the D18 band, and the em-dash ratchet fell from 98 to 9 under K1. Six sections are new (§08 and four appendix sections), seven are rebuilt, five are trimmed, five are gone. Every repository check is green except the known by-design lines; the four preset rankings are unchanged. Nothing was merged.

## What changed
- §00: the pacing box is the three timing cells and the four depth buttons; the opening sentence names Session 3; the household restatement block is gone; the Case facts button sits at the top-right.
- No cold open. The four-item bridge on the Session 2 verification order opens the session.
- §01: half the text, Wolfram's definition and figures kept; the map draws a dashed line to each nearest neighbour with the distance on it.
- §02: the text is shorter and keeps alligator and crocodile; the sorter lists each pair under the bucket you chose, with a tick or a cross and the reason, as soon as you place it; the full key still opens at the end.
- §03: four bullets (split, index, rank, answer) and one paragraph; no formula; the retriever's verdict for the first preset says the appraisal ranks third at 3.3, not zero.
- §04: one section where two were: commit to a guess, then Anthropic's finding-step figure and the Stanford grounded-tool figures with one chart. The volume calculator, the valuation prediction and the Vectara material are gone.
- §05: grounding against fine-tuning, moved from the appendix, with Wolfram's tell-it-once point and the one-item Tuesday test.
- §06: the workflow chain says what the tool does, what you check and what is inherited, per stage.
- §07: the note-taker's four stages open one at a time on the Cole excerpt; before, during and after in three lines; a copy-ready instruction for the tool. The keyword note scorer is gone.
- §08 (new): Claude in Word, Excel and PowerPoint for the client review; one prompt per app; a sorter for six tasks.
- §09: two obligations, five vendor questions, a two-item verify block, a four-item quiz. The state count, the California exposure and the fabricated case are gone.
- §10: said, recommended or neither, over six lines from the review; the interrogation prompt stays. The sale-versus-gift question is gone.
- §11: a ten-step meeting checklist with a gap readout and a copy button; the three assignment cards; the closing question. The peer-exchange scorer and the AI-usage-policy section are gone.
- Appendix: C1 and C5 gone; A1 (do you need retrieval), A2 (the intake questionnaire), A3 (check the summary against the transcript), A5 (five questions for a vendor) new; C3 and C4 trimmed.
- Records: the run sheet rewritten; register decision paragraph, DW-120 and DW-121, notes on nineteen rows; SOURCES.md clauses; one changelog entry; the Session 3 profile.

## The session against the syllabus
| Syllabus item | At 765dff3 | After the pass |
|---|---|---|
| Grounding makes it cite your sources, but the nearest passage is not always the right one | §03 (the retriever), §04 (rates), C1, C5 at a depth of 7 to 8 of 10 | §01 to §03 at half the text, §04 in plain words, A1 on when retrieval is needed at all |
| How AI note-takers work: transcription, extraction, categorisation, follow-up | §07, one paragraph and a keyword-scored note exercise | §07, the four stages opened one at a time on the excerpt, plus how to use one and how to prompt it |
| Evaluating documentation tools against the confidentiality obligation | §08 (consent), C3 | §09 (the two obligations, five vendor questions), A5 (the vendor email), C3 |
| Security considerations for meeting recordings | §08, inside the consent text | §09's second bullet; the same vendor questions |
| Documenting the client's circumstances and the basis for recommendations | §09 (a tax rationale question and a seven-item triage) | §10 (said, recommended or neither; the prompt), A2 (the intake questionnaire), §11 (the checklist) |
| Building a grounded meeting-prep assistant: grounding vs. fine-tuning | C2, appendix only | §05, core |
| The advisor meeting workflow: prep, capture, summarise, follow-up, log | §06 | §06 with what the tool does and what you check per stage; §11 as the checklist |
| What is RAG and its use case in an advisory practice | §03 with the formula, C1, C5 | §03 in four bullets, A1 |
| Wolfram, "The Concept of Embeddings" and "Meaning Space" | §01, §02, C2 | §01, §02, §05, all chipped H with the section named |
| Kitces (15 Jan 2025) | §06, §07, C3 | §06, §07, C3 (the January article's claims only) |
| Iskowitz (29 Jul 2025) | named in a source line | named in §09's reading card, §09's source line and A5 |
Not in the syllabus and removed: the measured-hallucination leaderboard, hybrid search, chunk size, the AI-usage-policy citation widget, the Part 1 peer exchange. The Office add-ins (§08) are the instructor's addition.

## What to watch for
- Top of the page: the Case facts button at the top-right at any width; it opens the case over the page.
- §00: three timing cells (67, 83, 150) and four buttons, nothing else in the gold box; no cold open below the appendix contents.
- §01: click "appraised value"; three dashed lines with numbers on them; the readout names formula value as a confusable pair.
- §02: click "alligator / crocodile" then the third bucket; it appears under that bucket with a cross and "Belongs under Interchangeable context". Place all six; the key opens.
- §03: Preset 1; the fourth line of the ranking is D2 at 0.0 and the verdict says the appraisal ranks third at 3.3.
- §04: pick "About 1 in 20"; the other two lock; the panel says 17 to 33 in 100.
- §05: pick fine-tuning; the feedback names retraining; the options lock.
- §07: open stage 2; the panel keeps Meg's and David's turns and says the Nathan clause is what many tools drop. "Copy the instruction" reports Copied.
- §08: place "Sign off the letter" under Not an AI task; a tick.
- §09: item 1, "Strip something first"; the feedback asks which field you would strip next.
- §10: place "Meg seems anxious" under Neither; a tick.
- §11: tick two steps; the readout says 2 of 10 in place and lists the gaps by stage.
- Set the depth to Foundational: A1 after §03, A2 after §06, A3 and C3 after §07 appear; +Standard adds A5 after §09 and C4 after §10.
- Reprint the run sheet; every slot changed.

## How to read the result
Every figure on the page is one the page already carried with its record, kept in substance: Anthropic's 5.7 to 1.9% and the 200,000-token guidance (H), the Stanford rates (H), Kitces' hour and rankings (H), Wolfram's definition and lengths (H), the federal one-party floor (H), the context-window contents (H). Nothing new is measured; everything new is constructed and labelled so (the stage outputs, the summary lines with two planted errors, the tasks, the checklist, the vendor questions), chipped L to the case entry. The retriever's rankings are computed in the page from the injected corpus. The one claim with no source is the Office add-ins' existence and shape, stated on the instructor's word (DW-121). Word counts are the profiler's, which counts interactive text with the prose.

| Section | Words at 765dff3 | Words after |
|---|---|---|
| s1 §00 | 478 | 124 |
| sCold | 107 | gone |
| s2 §01 | 312 | 217 |
| s3 §02 | 222 | 191 |
| s4 §03 | 316 | 253 |
| s5 C1 | 341 | gone |
| sHY C5 | 334 | gone |
| s6 §04 (old §04 and §05) | 343 + 445 | 292 |
| s8 C2 / s7 §05 | 340 | 239 |
| s9 §06 | 209 | 206 |
| s10 §07 | 363 | 434 |
| s11 C3 | 310 | 188 |
| s12 §09 | 761 | 350 |
| s13 §10 | 713 | 469 |
| s14 §10 old | 207 | gone |
| s15 C4 | 326 | 233 |
| s16 §11 | 491 | 228 |
| sRag A1, sPrep A2, sChk A3, sOff §08, sVend A5 | new | 262, 231, 171, 275, 126 |
| Total | 6,752 | 4,635 |

## Verification output
All commands run from the repository root on a worktree of be6a203 (the records commit), `NODE_PATH` at the global npm root, jsdom from the scratchpad; the two lines that were red there are fixed in the handback commit and re-run below it.

```
== HEAD be6a203
== test-editorial-regions
        session-3      6 literal /   3 entity
summary: 9 passed, 0 failed
== verify-editorial
summary: 16 rule(s) clean, 0 hard failure(s), 5 advisory
== verify-case
summary: 6 of 6 lessons carry the current CASE.md v4.0 block
== inject-case --check
summary: 6 current, 0 stale, 0 without sentinels  ·  stamp cba5438
== inject-sources --check
every lesson carries the current SOURCES.md block
== verify-sources
ADVISE 1 source(s) listed by a lesson that never cites them, and NOT exempt by kind
summary: 5 of 5 lessons carry the current SOURCES.md block
== verify-migration
FAIL  1    Retired facts purged (Part K list, whole tree, registers excluded)
summary: 14 passed, 1 failed
== build-appendix --check
current       session-3   core 12 /  67 min   appendix  6 /  83 min   total 150
all generated regions agree with their sections
== build-unsourced --check
current       docs/unsourced-claims.md  (9 marked claim(s))
== build-bibliography --check
all three generated files are current
== build-cardsort --check
OK    current  session-1/index.html
== case-inventory --report-check
WOULD CHANGE  docs/case-fact-inventory.md
== verify-style
summary: style fence clean
== validate_lesson
WARN  V4   3 .conf chip(s) without data-src (footer legend chips excepted; every claim chip needs a key)
WARN  V4   footer sources never referenced by a chip: src-iskowitz
FAIL  V6   18 distinct interactions (band 13-15)
RESULT: FAIL (6 fail, 3 warn)
== validate_dom
MODE=jsdom (executing page scripts)
OK    scripts executed with no thrown errors
OK    Shift+U marked all 17 gate(s)
FAIL  #pnum did not flip to the revealed state
== restyle_sweep --check
summary: 7 current, 0 stale, 2 without fence
== verify-browser
--- session-3/index.html ---
PASS  13b session-3/index.html Shift+U in #qBox reveals nothing (.hidden 0, gates 0 done, badge "Shift+U — reveal all answer panels")
      13b session-3/index.html has no focusable coldPrompt text box (0 candidate(s)); skipped
summary: 0 failure(s). Screenshots in /tmp/claude-0/-home-user-BUS-ADM-X433-4-AI-Foundations-for-Financial-Advisors-8-31-26-/1dcf5c16-eec6-5ebd-a330-978a6dc51c2d/scratchpad/wt-final/.verify-shots
== test-case-viewer
summary: 0 failure(s)
== checks.mjs
JN-018 OK
JN-016 OK
JN-025 OK
JN-027 OK
JN-030 OK
JN-005 OK
JN-006 OK
JN-007 OK
JN-008 OK
JN-009 OK
JN-014a OK
JN-014b OK
JN-014c OK
JN-010 OK
JN-011 OK
JN-012 OK
JN-014d OK
JN-014e OK
JN-014f OK
JN-020 OK
summary: 20 OK, 0 FAIL
== section_profile
  interactions/section median 1 range 1,1; chips/100w median 0.825; sources/section median 1; prose w/min median 30.85; run(min, tagged) max 9.1; ICAP {"P":0,"A":3,"C":14,"I":1}
  consecutive repeats: doc [] core [] reading []
== grep tonight
0


$ validate_lesson, the lines filtered above: V2 FAIL x5 (footer citation hyperlinks; DW-029, upstream); V4 PASS 49 chip reference(s) resolve, 9 footer source(s); V5 PASS 150 = 150 = 150; V6 PASS 11 types, PASS no adjacent repeat; V7 PASS Cole present and labelled synthetic, four retired names absent; V8 PASS
$ Retrieval check: the four presets rank D1 11.1 / D6 5.1 / D3 3.3 / D2 0.0 (margin 53.8%); D5 18.2 / D4 17.9 (1.7%, flagged); D8 29.2 / D3 8.0 / D7 3.8 / D1 3.7 (72.8%); D7 26.5 then zeros (100%), before and after (checks.mjs JN-030; Part O untouched)
$ T7 figures for session-3, before and after: 86 literal / 12 entity (98) at 765dff3; 6 literal / 3 entity (9) at the end; sixteen lowerings on DW-120
$ screenshots  .verify-shots/JN-*-<section>.png at 1280 px for every changed section, and JN-016-head-380.png (git-ignored); scrollWidth at 380 px = 380
```

The two red lines above, and their state after the handback commit:
- `verify-migration` check 1 named `ledger.md:26` for the string "31%", which is on the CASE.md Part K retired list (the old discount figure). The ledger and this file now say "a cut of 2,117 words, just under a third"; re-run: 15 passed, 0 failed.
- `case-inventory --report-check` would change because the drift surface fell again after b793f24; regenerated in the handback commit; re-run: current.

By-design red lines, unchanged from the pre-flight and the Session 2 pass: V2 on the footer hyperlinks (DW-029), V6 on the interaction count (18 against 13 to 15; DW-094 pattern, by instruction), `#pnum` in DOM mode (DW-112), `restyle_sweep --check` on the two documented fragments. `verify-sources`' one ADVISE is session-4's `src-finra2409` (DW-021's remaining half). V4's three bare chips are the footer legend.

## Self-review findings

### Important
- None found. What follows is what was looked for.

### Nits (showing 5 of 7)
- [Bugs] `session-3/index.html`, the §01 map's labels overlap in three places at 1280 px (grantor trust and joint trust; promissory note and seed gift; buy-sell agreement and pour-over will); pre-existing layout, untouched.
- [Bugs] `session-3/index.html`, the `n1()` helper is used for the map's distance labels and prints one decimal; a distance of exactly 10 prints "10.0".
- [Compliance] `session-3/index.html` §08's source line points a learner at a register row by number.
- [Compliance] Pedagogy s4's Shift+U parameter stays on session-3 while session-2 dropped it; the notes did not name it and the kickoff forbade propagating it unasked.
- [Bugs] `docs/changes/.../checks.mjs` dispatches one click through the DOM (JN-006) where the page's lock is pointer-events:none; documented in the check.

### Looked for and did not find
- Em-dash additions: T7 reproduced the recorded figures after every commit; the sixteen falls are instructed (K1) and recorded on DW-120 with before and after; the literal form stays the majority at 6 against 3.
- Typed case figures: none in the new text; the excerpt and the corpus read COLEDOCS at parse time; `verify-migration` 15 passed at the end; `case-inventory --report-check` current.
- Edits inside a generated region: none by hand; `build-appendix` regenerated the regions after every structural commit and reports current; `inject-sources --check` current; `verify-case` 6 of 6.
- `last_verified` written: none; no new SOURCES.md record; the lock is unchanged.
- Unresolved chip keys: none at the end (V4 resolves after the src-context-windows clause); orphaned footer keys: none the by-kind exemption does not cover.
- Script errors: none in DOM mode at the end; one was introduced at 0367298 and fixed at fb4380a (recorded in plan.md departures and the ledger).
- Real client data or a learner's name: none in the notes or the diff; the notes named the submission platform once and it was substituted (K3).
- New dependencies in the tree: none. Legal or tax characterisations asserted as settled: none; §09's two are behind the verify block; §10's sale-versus-gift rationale left the page.
- Horizontal overflow at 380 px: none (scrollWidth 380).
- Markers outside the declared forms: none; the page's one [UNCONFIRMED] left with the state-count paragraph.

## Rejected options
- A Workflow fan-out under Ultracode: K4 and sdlc-loop rule 2 keep the pass single-threaded; forty edits to one file would collide.
- Keeping C1 and C5 as advanced-tier appendix: the note names chunking and weighting as the material that is too advanced; both are restorable from 765dff3.
- Keeping the cold open's script for parity with sessions 2 and 4: dead code on a page with no cold open.
- Moving the §09 verify block to the run sheet as Session 2 did: not in these notes; pedagogy R3 keeps the gate in shipping form; it is two items now.
- Writing [UNCONFIRMED] beside the Office add-in description: the instructor removed every such marker from Session 2 by instruction and the DW-110 precedent fits; the register row carries it.
- Keeping the keyword note scorer in §07: the complexity the note asks to remove; it carried DW-042 and DW-052.
- Keeping s14's citation-set widget: assignment mechanics, not a Session 3 objective; the assignment survives as the card (F-4).
- Faking interim minute figures to keep V5 green at the Group 3 and 4 pushes: recorded as red instead.

## Flags

### Blocking
- None for the page as pushed.

### Non-blocking
- F-1. **Gate 1 was not awaited.** Acceptance was taken from "read and execute attached" and "Make the updates to each section up to 3, then after 3 totally rebuild", as the Session 3 kickoff's "implement these" clause. Every item is one commit; `git revert` restores any single item; nothing was pushed to `main`.
- F-2. **The instructor's chat history was not consulted** (JN-002): it is outside this repository and this environment. The audience level in the note (fewer than 20 prompts ever; 2 to 3 of 10) was applied instead. If a transcript or export is added to the tree, a second batch can re-check the register of every rebuilt section against it.
- F-3. **The Office add-ins are named without a source** (JN-009, DW-121). support.claude.com and claude.com were unreachable. Ten minutes in a browser: confirm that Claude offers add-ins for Word, Excel and PowerPoint, that each reads the open file and proposes edits for review, then add a SOURCES.md record and chip §08's first paragraph. If any of the three does not exist as described, say which and §08 loses that bullet.
- F-4. **The AI-usage-policy section's citation-set widget left the page** (JN-012). The assignment is still stated on the site as the gold card in §11 (three cited sources, one scholarly). Say "restore the citation widget" to bring the section back from 765dff3 as an appendix section; it costs 4 minutes the table would have to absorb.
- F-5. **A8's minority figure for session-3 has twelve units of slack.** The baseline records 15; the measured entity count over authoredProse is 3 (DW-053 noted). K1 named A9 only, so A8 was not re-recorded. Say "re-record A8 for session-3 to 3" and it is a one-line edit.
- F-6. **Pedagogy s4 is deviated from on this page in three ways by instruction:** no cold-open ritual (JN-022), no four-item retrieval bridge at 7 minutes (the bridge shares §00's 5), and 18 interaction roots against the 13-to-15 band (V6 red, DW-094 pattern). The Shift+U override stays (not in the notes; DW-117 open).
- F-7. **The verify block in §09 stays on the page** with two items (the federal floor; the confidentiality duty). Session 2 moved its block to the run sheet by instruction; these notes did not ask. Say "move the §09 verify block to the run sheet" and it lands the JN-018-of-Session-2 way.
- F-8. **The sale-versus-gift rationale left the page** with old §09's Part A (JN-011); it was the only tax characterisation §10 made and it carried an on-page instructor-verification flag. §10 now asserts no tax result. If you want the question back as a discussion item, it belongs in the run sheet, not on the page.
- F-9. **Ultracode was on and the pass ran single-threaded** under K4 and sdlc-loop rule 2, as on 09-12 and 09-13.
- F-10. **The one defect I introduced** (the override calling a removed key, 0367298 to fb4380a) was caught by the DOM-mode validator and missed by my landing helper for four commits; the helper now halts on that line and the harness presses the override. Recorded in plan.md departures.
- F-11. **DW-050 (the spine) has lost two more sockets on this page:** the rubric line (S8) and the spiral sentence. Session 3 states the recurring question only in the injected case modal. Said, not decided.
- F-12. **`docs/spine-brief.md` §1 now describes the S8 socket as re-derived** when it no longer exists; DW-032 class.
- F-13. **The run sheet has no clock times.** The block is 180 minutes and the core is 67 planned; post the break as a clock time on the day. Every slot changed; reprint it.
- F-14. **The excerpt in §07 still presupposes the advisory engagement CASE.md §A.5 denies** (DW-041, unchanged); the source line records it.
- F-15. **README needs no change for this page:** it names no cold open, and its Shift+U sentence already scopes itself to "the lesson pages that carry it" (README line 77, read this session). The hub card's blurb still describes the session correctly.

## Next session should
1. Read this file, then `ledger.md`; a further batch of notes appends to `notes-verbatim.md` and continues at JN-031.
2. Answer F-3 from a browser (the Office add-ins) and F-5 (A8); each is a one-record or one-line change plus `node scripts/inject-sources.mjs` for the first.
3. Before the Session 4 pre-flight, decide DW-117 (the Shift+U override and the pacing readout on session-4) and DW-050 (whether any page states the spine's open question outside the case modal).
