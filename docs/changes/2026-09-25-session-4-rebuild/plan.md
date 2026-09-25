# Plan: Session 4 rebuild, 2026-09-25

Branch `claude/amazing-curie-xz0s73`, from `9f81086` (`main` after PR #36). Session 4 is taught
2026-09-28. Kickoff in `notes-verbatim.md`. One commit per section, `ledger.md` rows `S4R-001`
upward, `checks.mjs` with one jsdom assertion per row.

## 0. The premise, challenged first

Three things in the request collide with something already on disk. None of them blocks the
rebuild; each changes what "better than Sessions 1 to 3" can mean.

1. **"Standalone outside the class" and the Part 1 relay cannot both live on the page as written.**
   §09 and §10 today are class logistics: an email to the instructor, a pairing draw, a builder
   sitting in the room. A learner alone can do none of it. Resolution: the page teaches the
   *handoff test* with a supplied sample package anyone can run; the in-class relay and the draw
   move to the run sheet. The learner loses nothing; the instructor loses one on-page widget (the
   derangement draw), replaced by a method in the run sheet.
2. **The page has a factual error that is now provable.** Appendix D1 says "Anthropic has not
   announced SynthID adoption for Claude, so nothing you generate in this course is watermarked."
   Anthropic's own help centre (retrieved 2026-09-25) says marks apply to supported Claude models
   launched from 2 August 2026, with all covered by 2 December 2026, and that detection is limited
   to eligible organisations. The sentence is false for any learner using a current model. It is
   corrected, and the correction closes two `[UNCONFIRMED]` markers with a source that was read.
3. **"At least as good as Sessions 1 to 3" is measured against the instructor's own record, and
   that record says the page is a visual aid**, taught from other surfaces as much as from itself
   (Session 3 was entered at §03 at 7:48 on the night). So the target is not more material. It is
   the same material at Session 3's density, every interaction runnable without the case, and a
   run sheet that says which three the room runs.

## 1. What the history says, reduced to rules

From the 2026-09-13 and 2026-09-19 verbatim notes, the kickoffs, and the ledgers (evidence with
file:line in the analysis the handback summarises).

| # | Rule | Times asked | Session 4 today |
|---|---|---|---|
| 1 | Cut prose: the page is a visual aid, not a book (25 to 75% per section) | 13+ | the largest core in the course, 72 min, ~10,000 words |
| 2 | Thesis line plus 3 to 6 bullets; no paragraph walls | 3 | paragraph-first in every section |
| 3 | Nothing addressed to the instructor: no `.verify`, no `[UNCONFIRMED]`, no disclaimers | 5 | 2 `.verify` blocks, 5 markers, "Instructor verification required" srcnote |
| 4 | No case restatement; every interaction works without the case | 4 | two case panels in §00; §04 and §08 need the Cole corpus |
| 5 | Beginner level (2 to 3 out of 10); no formulas | 6 | tournament hashes, 1 &minus; (1 &minus; p)^N, entropy |
| 6 | No dates, "tonight", grades, weights, platform, in-class peer review | 3+ | 16 "tonight", "worth 30% of Part 1", "Peer review, not tonight" |
| 7 | Pacing panel: buttons and timing only | 2 | full prose paragraph still rendered |
| 8 | Sorters: the item lands under its bucket at once with a tick or cross and a why | 1 (and S3 JN-027) | §01 sorter greys the chip and answers only after all nine |
| 9 | Reveal one at a time; predictions lock, then show the gap | 5 | mostly single reveal-all panels |
| 10 | Interactions that change with the input, not a number over a static chart | 3 | §06 exposure estimator multiplies inputs |
| 11 | Concrete definitions with wealth-management examples | 5 | abstract definitions |
| 12 | Source it or cut it; keep the data | 5 | 4 claims chipped to the synthetic household |

## 2. Section map

Minutes sum to 150 exactly: core 67 (Session 3's figure) plus appendix 83.

| # | Id | Title | Min | Tier | `data-comp` | What the learner does | Source, confidence |
|---|---|---|---|---|---|---|---|
| 00 | s0 | Compliance, Security and Responsible Use | 6 | core | retrieval-bridge | three one-click Session 3 recall items | S3 page, L |
| CO | sCold | Which of These Four Would You Have Sent? | 8 | core | timed-ritual | click one of four beginner prompts; the eight checks render; a compliance line follows | COLD_CHECKS, L |
| 01 | s1 | No AI Rulebook: The Rules You Already Follow | 5 | core | multi-column-sorter | place eight items into three buckets, answered at once | FINRA 24-09, FINRA 2026, SEC FY2026, SEC 2024-36, H |
| 02 | s2 | What Counts as Client Data | 6 | core | builder-assembler | click every risky phrase in a draft prompt; the cleaned prompt assembles; copy it | Reg S-P &sect;248.3, H; CFP Board guide, M |
| D5 | sRSP | The Thirty-Day Clock | 14 | foundational | commit-first-mcq | pick the event that started the clock | Reg S-P, H; incident L |
| D6 | sAnon | Replace, Don't Just Delete | 12 | foundational | two-bucket-sorter | sort replacement options into "safe" and "still points to her" | CFP Board guide, M; items L |
| 03 | s3 | Where Your Prompt Goes | 6 | core | parameter-sandbox | pick a plan and the training switch; the retention bar redraws; tick the settings you have checked | Anthropic terms, H |
| 04 | s4 | Vetting a Tool in Six Questions | 5 | core | builder-assembler | say what goes in, answer six questions; the verdict moves with each answer | Reg S-P service providers, H; CFP A.14, H |
| 05 | s5 | Attacks: Hidden Instructions and Fake Clients | 6 | core | prediction-commit | predict, run a simulated assistant on an inbox, reveal the hidden line; then a deepfake call decision | EchoLeak CVE, H; FINRA primer, H; Arup, H |
| D1 | sW1 | How a Text Watermark Works | 14 | advanced | parameter-sandbox | run a one-token tournament under two keys | Claude help centre, H; Dathathri 2024, M |
| D2 | sW2 | What a Watermark Can and Cannot Prove | 12 | advanced | two-bucket-sorter | sort outputs by how well they can carry a mark; combine a detector result with the source | SynthID-Text page, H |
| 06 | s6 | What Checking Costs | 5 | core | estimate-then-reveal | guess, then run 100 simulated memos; then price your own deliverable (90-minute default) | Magesh, H; arithmetic M |
| D3 | sWS | When a Source Goes Stale | 13 | standard | commit-first-mcq | commit on three claims from the 2023 reading | Wolfram, H; AA, H |
| 07 | s7 | The Record an Examiner Can Re-Check | 5 | core | two-bucket-sorter | sort six records; copy the record block | Wolfram quote, H; FINRA 2026, H |
| 08 | sCR | The Handoff Test | 10 | core | symptom-diagnoser | tick your own package; run a sample package cold; log the first thing that stopped you | Part 1 criterion, L |
| D4 | sD | Discussion: Does the Record Cost More Than the Tool Saves? | 18 | standard | sealed-vote-debate | locked vote, both cases, one complication, re-vote | L |
| 09 | s9 | Your Firm's AI Use Policy | 5 | core | builder-assembler | pick one clause per rubric question; the outline assembles; copy it | L; each clause traced to its section |

Arithmetic: core 6 + 8 + 5 + 6 + 6 + 5 + 6 + 5 + 5 + 10 + 5 = **67**; appendix 14 + 12 + 14 + 12 +
13 + 18 = **83**; 67 + 83 = **150**. Break 15 and reserve 15 as `nosum` rows; 180 in the block.

Diversity: 11 distinct families. File order, with every appendix section shown: bridge, ritual,
multi-column, builder, mcq, two-bucket, sandbox, builder, prediction, sandbox, two-bucket,
estimate, mcq, two-bucket, diagnoser, debate, builder. No family repeats in adjacent sections at
any depth (§04 moved from commit-first-mcq to builder-assembler during the build, because its
artifact is the list of questions still owed by the vendor; the adjacency still holds).

Interactions: 17 `data-task` roots (one per section). Above the 13 to 15 band, as Session 3 is at
18 (DW-094, red by instruction); the alternative, merging appendix sections, loses the standalone
depth the kickoff asks for.

Retrieval before exposition: §00's bridge precedes any new content; §05 and §06 capture a
commitment before their reveal; the cold open's pick precedes §02, which reopens the same prompt.

## 3. What moves where

| Leaves the core | Goes to |
|---|---|
| §03 frontier chart and sticker-versus-task chart | cut: Session 2 §02 owns model economics, and the model data is dated 2026-08-13 |
| §06 exposure-event estimator | replaced by the settings checklist inside §03 |
| §09 relay table, "forwarded intact", derangement draw | run sheet (the draw becomes a method) |
| §11 peer-review instrument | becomes the four self-test questions under the policy outline |
| both `.verify` blocks and the "Instructor verification required" srcnote | run sheet, Verify before teaching |
| D1 perturbation amplifier and its 1% figure (`[UNCONFIRMED]`) | cut: advanced, unsourced, and not needed for the point |
| D2 regeneration paragraph (two arXiv preprints, one `[UNCONFIRMED]` figure) and the SB 942 note | cut: removal technique is out of scope and the dates were unverified |
| §00 case panel, recurring-question panel, outcome cards, Part 1 status | cut; the four-line Cole panel from Session 3 replaces the case panel |

## 4. Judgement calls

- The cold open keeps an optional paste box under the four prompts, so the Session 1 to 3 ritual
  still works for anyone who wants it; the floor is one click and nothing in the path types.
- Prompt D in the cold open is the best-scoring of the four and the one that could never be sent:
  it names the client, her age, her company, its value and her undisclosed sale. §02 reopens it.
  Quality and permissibility are different tests, and that is the session's first lesson.
- Shift+U stays, as on Session 3, because the rebuilt page still hides keys behind commits
  (DW-117 resolved that way; Session 2's removal was because nothing was hidden).
- The bridge carries three items, not four: Session 2's instructor note set three, and Session 3's
  night ran on other surfaces, so each item is one the room met on 09-21 whichever surface carried it.
- The 90-minute fallback is kept and the ask becomes "your best estimate of how long it takes you
  without AI" everywhere; no sentence asserts a baseline was recorded.

## 5. Claims that carry M or L, and why

- CFP Board Generative AI Ethics Guide (2025): **M**. cfp.net is egress-blocked; the content is from
  search-reported summaries, not the page.
- Every Cole prompt, record, incident and package: **L**, constructed for the lesson.
- The "run 100 memos" arithmetic: **M**, derived; assumes independent errors, which is stated.
- Dathathri et al. mechanism in the tournament widget: **M**, simplified reconstruction.
