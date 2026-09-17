# Handback: Session 3 update, the Opus pass

Branch: `claude/session-3-update-plan-k1xbqs`. Change folder:
`docs/changes/2026-09-17-session-3-update-plan/`. Status: complete and merge-ready. One item is
deliberately left for a later pass on a different model; see §5.

## 1. Why the work was split

The instructor's Fable 5.1 allowance is exhausted and resets on 2026-09-19. Session 3 is taught
2026-09-21. The split was made on one criterion: **where does the capability difference between the
models change the output?**

| Item | Capability delta | Where it ran |
|---|---|---|
| Whole-page coherence and prose polish across 2,700 lines | High | **Fable**, §5 |
| §01 and §02 merged from 10 planned minutes into 7 without conceptual loss | High | **Fable**, §5 |
| §11 rebuild: a compliance rule and a Part 1 brief, wording already in the repository to copy | Medium | Opus, done |
| §09 trim: a deletion with a specified boundary | Low | Opus, done |
| Run sheet: transcription from a costed clock | Low | Opus, done |
| Register reconciliation: bookkeeping against greps | Very low | Opus, done |
| Gate runs | None | Opus, done |

Compression without loss and whole-artifact coherence are the two tasks where a stronger model
earns its scarcity. Everything else is specification-following, and the specification already
existed in `plan.md`.

## 2. What changed

Five commits, one per item, each individually revertible.

| Commit | What |
|---|---|
| `5ce0691` | §08's source line stops citing register row DW-121 to a student |
| `5e60dd5` | §09 falls from 6 planned minutes to 4 |
| `3962e20` | §11 gains the course data rule and a real Part 1 brief |
| `f60428e` | The run sheet is rewritten around a costed clock |
| `f15d508` | Eight stale register rows closed; DW-121 annotated |

**§08.** The source line ended "(register row DW-121)". A page a learner reads must not point at an
internal deferred-work row. The reference is gone; the hedge is unchanged. No chip was added,
because an unresolved `data-src` fails validator V4 and the chip waits on the instructor's browser
check.

**§09.** Six planned minutes to four. The "Ask the vendor / Five questions" card is gone: its five
questions are the first five of appendix A5's eight, in the same order and nearly the same words,
and Session 4 §04 scores the same ground with weights against the same Cole document set. The
"Security of the recording" bullet folds into the confidentiality bullet. The do-this-now timer
falls from 4 minutes to 3. Kept: the verify block and both its items, the consent bullet and the
one-party floor, the Iskowitz reading card, and all four quiz items.

**§11.** The no-client-data rule now appears on the page that assigns Final Project Part 1. It was
on the hub, on Session 1, in Session 4's footer, and in the run sheet as a spoken instruction tied
to §07, but not here. The Session 2 audit rated the identical omission High. The markup copies
Session 1's Course rule panel; the wording is Session 1's with the em dash replaced by a comma,
because the ratchet stands at 6 literal and 3 entity and a rise in either is a halt. The Part 1 card
now points at the seven-element checklist in Session 2 §09, names the two elements most often
missing, and previews the Session 4 cold run.

**The run sheet.** Rewritten around the clock in `plan.md` §5.1: the objective printed as the first
line of the 6:11 slot, a 6:00-to-9:00 clock summing to 157 minutes with 23 of buffer, three
checkpoints, a corrections slot, four Zoom polls with written decision rules, three gated questions
and only three, a written closing check, the rewritten drop order, and per-slot notes carried
forward from the previous sheet where they are still true.

**The register.** Eight rows were marked open while the defect each describes had already been
removed. Each now carries a closing note naming the pass, the ledger item, the commit and the grep.
DW-013 needed more than a flip: its own earlier note falsely claimed no per-model grounded rate is
stated on session-3, and the correction is recorded rather than written over.

## 3. One reversal against the plan, recorded

`plan.md` §4.4 and §4.6 O1 said to cut §09's quiz item 1, the re-identification item, because
`session-4:2516` teaches the same punchline on the same Cole facts.

**The item stays.** The duplication finding is correct; the conclusion about which session should
yield is not. Session 3 runs first, so it gets the discovery. Session 4 runs a week later and can
reframe its row as a callback with Regulation S-P §248.3 supplying the authority for something the
room already found. That is the model `session-4:1647` already uses for the Magesh figures: "Session
1: why it happens. Session 3: how often. Tonight: what it costs you." Cutting item 1 would have
removed the best interaction in the section, four days out, to protect a reveal that has not
happened yet.

The minute recovery that the cut was meant to pay for came instead from the duplicated vendor card,
which costs nothing because two other surfaces carry it better.

## 4. Verification

All from the repository root with `NODE_PATH` at the global npm root.

```
verify-case              6 of 6 lessons carry the current CASE.md v4.0 block
verify-migration         15 passed, 0 failed
verify-sources           5 of 5 lessons carry the current SOURCES.md block
verify-editorial         16 rule(s) clean, 0 hard failure(s), 5 advisory
test-editorial-regions   9 passed, 0 failed
build-appendix --check   all generated regions agree with their sections
inject-sources --check   every lesson carries the current SOURCES.md block
inject-case --check      6 current, 0 stale, 0 without sentinels
build-unsourced --check  current, 9 marked claim(s)
build-bibliography --ck  all three generated files are current
case-inventory --report-check   current
section_profile          19 sections (18 lesson, 12 core); timing 148/148
```

**T7, the em-dash ratchet: `session-3  6 literal / 3 entity`, before and after every commit.**
Unchanged. Nothing this pass authored contains an em dash in either form.

**Minutes.** Core 67 to 65, appendix 83 unchanged, total 150 to 148. `build-appendix` regenerated
the three minute regions and they agree.

Not run here: `validate_lesson.py`, `validate_dom.js`, `restyle_sweep.py` and `verify-browser.mjs`.
The first three ship with the interactive-lesson-builder skill and run from the skill root; the
fourth needs Chromium. Their expected state is in `plan.md` Appendix A.1, and the by-design red
lines are unchanged by this pass: no interaction was added or removed, so V6 stays at 18 against the
13-to-15 band, and the Shift+U override is untouched, so V8 still passes.

## 5. What is deliberately not done

**The §01 and §02 merge.** Ten planned minutes of embeddings and distributional similarity into
seven, keeping Wolfram's definition, the nearest-neighbour map and the alligator-and-crocodile pair.
This is compression without conceptual loss on the most abstract block in the session, for a room
that self-reports two to three out of ten. It is the single task on this list where model capability
most changes the result, and it is the reason the Fable allowance is being held.

The run sheet is already correct either way: it delivers §01 and §02 as one seven-minute narrated
movement whether or not the page merges them, so the branch is self-consistent now and stays
self-consistent after the merge.

The prompt to run it is `fable-prompt.md` in this folder.

## 6. What no model can do

| Item | Why | Deadline |
|---|---|---|
| Read the vendor help pages for the Word, Excel and PowerPoint add-ins (DW-121) | The hosts are egress-blocked from every build environment. §08 is one of the three interactions the room runs. | before 09-21 |
| Read Anthropic's own watermark page (DW-005) | Same block. Three sources currently disagree about whether Claude output is watermarked at all. | before 09-21 |
| Sign or strike §09's two verify-block items (DW-056) | Closing a gate needs a human reading primary authority. Recording law is taught on the night. | before 09-21 |
| Build the four Zoom polls | Account access. A poll configured live already failed once. | before 09-21 |
| Turn on speaker-labelled transcripts | One checkbox, and every future review depends on it. | before 09-21 |
| Confirm the seven-step objective's wording against the syllabus | The string the audit quotes appears nowhere in the repository. | before 09-21 |

## 7. Merge readiness

The branch is safe to merge now.

- Every gate that can run here is green, and the by-design red lines are unchanged.
- The page is self-consistent: no section references content that was removed, the minute regions
  agree with the sections, and the run sheet describes the page as it now stands.
- No commit depends on the Fable pass. The merge lands a page that is better than `main`'s in five
  independent ways, and the outstanding item improves it further rather than completing it.
- Nothing was pushed to `main`. Each of the five commits reverts cleanly on its own.
