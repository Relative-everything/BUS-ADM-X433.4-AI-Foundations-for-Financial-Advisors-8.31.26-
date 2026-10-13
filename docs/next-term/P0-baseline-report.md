# P0 baseline report: the repo as it stands before the next-term-2027 run

Written 2026-10-11 on branch `next-term-2027` at base `da7b003` (`main`, PR #45 merged 2026-10-11). Local annotated tag `fall-2026-final` points at `da7b003`; it was not pushed. Jared pushes it with:

```bash
git push origin fall-2026-final
```

This report makes no content edit. Every validator line below is quoted from the run, not summarised. Measurements first taken on `ac94b6b` (the local `main` ref before it was moved to `origin/main`) were discarded and re-run on `da7b003` (DECISIONS D-017).

## 1. Validator and test results

Environment: Node 22.22.0, Python 3.13.16, jsdom installed globally for this run (`NODE_PATH=$(npm root -g)`), Playwright Chromium 1194, no interactive-lesson-builder skill (so `validate_lesson.py`, `validate_dom.js` and `restyle_sweep.py` did not run: skill gate skipped, A.1.7). Exit codes and the last five lines of each run:

| Check | Exit | Reading |
|---|---|---|

| `build-case` | 0 | pass |
| `inject-case --check` | 0 | pass |
| `build-cardsort --check` | 0 | pass |
| `verify-case` | 0 | pass |
| `verify-migration` | 0 | pass |
| `test-case-viewer` | 0 | pass |
| `verify-style` | 1 | environment red: the skill is absent (DW-080, DW-112); not a regression |
| `case-inventory --report-check` | 0 | pass |
| `build-appendix --check` | 0 | pass |
| `verify-sources` | 0 | pass |
| `inject-sources --check` | 0 | pass |
| `build-bibliography --check` | 0 | pass |
| `build-unsourced --check` | 0 | current; the register lists 4 marked claims (2 not claims) in the A16 population of 6 |
| `test-editorial-regions` | 0 | pass |
| `verify-editorial` | 0 | 0 hard failures, 2 A12 advisories (DW-067), as the catch-up handback recorded |
| `test_live_console` | 0 | pass |
| `attest-verified` | 0 | pass |
| `verify-wolfram-quotes (no article copy in tree)` | 1 | expected red: the script needs a plain-text copy of the article as argv[1] and none is in the tree (MAINTAINING) |
| `catchup checks.mjs` | 0 | pass |
| `verify-browser` (Chromium: checks 13, 13b, 14, 14b, 15) | 0 | 107 PASS, 0 FAIL across the hub, six lessons and the standalone flowchart fragment |
| change-folder regression sets | see §1.2 | see §1.2 |

### 1.1 Last five lines of each run, verbatim

**`build-case`** (exit 0)

```
OK    case-corpus.json     10 chunks, 5 transcript turns  (Part O)
OK    case-facts.json      102 keyed figures
OK    case-extract.html 7311 bytes  stamp 594b89b
OK    case-flowchart.html  Part L, scoped under .cole-flow
OK    Part M self-check    13 identities recomputed, all agree
```

**`inject-case --check`** (exit 0)

```
OK    current  session-2/index.html
OK    current  session-3/index.html
OK    current  session-4/index.html
OK    current  session-5/index.html
summary: 7 current, 0 stale, 0 without sentinels  ·  stamp f53ae08
```

**`build-cardsort --check`** (exit 0)

```
OK    current  session-1/index.html
```

**`verify-case`** (exit 0)

```
OK    session-3/index.html  sha256 751d66fc6929705f
OK    session-4/index.html  sha256 751d66fc6929705f
OK    session-5/index.html  sha256 751d66fc6929705f
summary: 7 of 7 lessons carry the current CASE.md v4.0 block
layout: the 20 lesson-local .case-* rules agree in all 7 lessons  sha256 7441ec6a74465971
```

**`verify-migration`** (exit 0)

```
        2 pinned figure(s) checked, all agree:
        session-1/index.html: the steady-state annual shortfall = $522,086
        session-1/index.html: the demand-note principal = $20,020,000

summary: 15 passed, 0 failed
```

**`test-case-viewer`** (exit 0)

```
PASS  V8  both flowchart sheets survive the copy (2 SVG)
PASS  V8  zero JS errors in the new tab
PASS  V9  zero JS errors in the lesson across the whole exercise

summary: 0 failure(s)
```

**`verify-style`** (exit 1)

```
        (RESTYLE_SWEEP is not set)
        (LESSON_BUILDER_SKILL is not set)
      Set RESTYLE_SWEEP to the path of restyle_sweep.py, or LESSON_BUILDER_SKILL
      to the interactive-lesson-builder skill root, or install the skill under
      /root/.claude/skills/.
```

**`case-inventory --report-check`** (exit 0)

```
current       docs/case-fact-inventory.md
```

**`build-appendix --check`** (exit 0)

```
current       session-3   core 12 /  67 min   appendix  6 /  83 min   total 150
current       session-4   core 11 /  67 min   appendix  6 /  83 min   total 150
current       session-5   core 11 /  59 min   appendix  5 /  66 min   total 125

all generated regions agree with their sections
```

**`verify-sources`** (exit 0)

```
----  1 record(s) set disclose_on_page: true
OK    src-case                 kind=case             scope rendered in session-1, session-2, session-3, session-4, session-5
----  0 record(s) render a scope without disclose_on_page: true

summary: 6 of 6 lessons carry the current SOURCES.md block
```

**`inject-sources --check`** (exit 0)

```
current       session-3  f296f785da1ad2fe
current       session-4  78933652f34b6347
current       session-5  55864d13af815111

every lesson carries the current SOURCES.md block
```

**`build-bibliography --check`** (exit 0)

```
current       BIBLIOGRAPHY.md
current       DATA-PULL.md
current       docs/source-verification-queue.md

all three generated files are current
```

**`build-unsourced --check`** (exit 0)

```
current       docs/unsourced-claims.md  (4 marked claim(s), 2 not a claim; A16 population 6, hub 0)
```

**`test-editorial-regions`** (exit 0)

```
        captured transcripts and injected span are masked out
PASS  T9   CSS "color" hits do not survive into prose regions (EDITORIAL.md B8)
        664 raw, 0 in prose

summary: 9 passed, 0 failed
```

**`verify-editorial`** (exit 0)

```
ADVISE  A12  session-1/index.html:2112  direct quotation of Wolfram (2023) with no
             section name in its source note
             (the section carries no source note at all)

summary: 17 rule(s) clean, 0 hard failure(s), 2 advisory
```

**`test_live_console`** (exit 0)

```
  PASS  session-4/index.html: no unrendered HTML entities in copy

=====================================
  86 passed, 0 failed
=====================================
```

**`attest-verified`** (exit 0)

```
lock  present, digest 9a264af4627fb8ad
      SOURCES.md digest 9a264af4627fb8ad  MATCHES

src-wolfram  2026-08-23
  EDITORIAL.md, "Seventeen names. Instructor-verified." — the locked 17 section names of this essay, entered 2026-08-23 in commit bd8f458 and enforced by A11. Enumerating the seventeen section names requires having opened the essay.
```

**`verify-wolfram-quotes (no article copy in tree)`** (exit 1)

```
                     ~~~~~~~~~~~~^^^^^^^^^^
  File "/home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/scripts/verify-wolfram-quotes.py", line 66, in load_article
    raw = open(path, encoding="utf-8").read()
          ~~~~^^^^^^^^^^^^^^^^^^^^^^^^
FileNotFoundError: [Errno 2] No such file or directory: '/nonexistent-article.txt'
```

**`catchup checks.mjs`** (exit 0)

```
PASS  DWC-028  changelog/index.html carries the corpus style fence, not the empty one build-changelog.py writes without the skill
PASS  DWC-028  the 2026-10-11 entry is rendered with no raw markdown (bold, code, emphasis or link syntax)
PASS  DWC-038  the served entry carries the review's corrections and section: all six stamps, §05, 40 rows

summary: all passed
```

**`verify-browser`** (exit 0)

```
PASS  14  no <script>, unpkg or CDN reference in the source
PASS  14  2 sheets, 2 <title>, 2 <desc>
PASS  15  flowchart fits 1280px without overflowing

summary: 0 failure(s). Screenshots in /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/.verify-shots
```

### 1.2 Change-folder regression sets (MAINTAINING "Change-folder checks, and jsdom"), `NODE_PATH=$(npm root -g)`

| Folder or test | Exit | Last line |
|---|---|---|
| `docs/changes/2026-10-11-deferred-work-catchup/checks.mjs` | 0 | `summary: all passed` |
| `docs/changes/2026-09-25-session-4-rebuild/checks.mjs` | 0 | `0 failed` |
| `docs/changes/2026-09-25-session-4-polish/checks.mjs` | 0 | `0 failed` |
| `docs/changes/2026-09-27-session-4-syllabus/checks.mjs` | 0 | `0 failed` |
| `docs/changes/2026-09-28-session-4-notes/checks.mjs` | 0 | `0 failed` |
| `docs/changes/2026-10-02-session-5-build/checks.mjs` | 0 | `summary: all passed` |
| `docs/changes/2026-10-04-session-5-interactivity/checks.mjs` | 0 | `summary: all passed` |
| `docs/changes/2026-09-19-session-3-simplify/checks.mjs` | 1 | `summary: 1 failed` |
| `docs/changes/2026-09-13-session-2-manual-pass/checks.mjs` | 0 | `summary: 19 OK, 0 FAIL` |
| `docs/changes/2026-09-14-session-2-polish/checks.mjs` | 0 | `summary: 18 OK, 0 FAIL` |
| `session-5 section tests` | 0 | `10 files, 962 assertions, 0 failed` |
| `drags.mjs` | 0 | `summary: all passed` |

The one red line is the known one: `2026-09-19-session-3-simplify` V6 ("18 interaction roots (found 22)") was turned red by the 2026-09-21 visual pass and is history, not a regression (MAINTAINING). Every other folder in each lesson's regression set passes in full, matching the catch-up's 2026-10-11 measurement.

### 1.3 Fallback greps (MAINTAINING "Pre-push gate", without the skill)

```
-- okonkwo count: 0
-- storage API count: 0
-- externals outside fonts allowlist:
-- generativelanguage outside 0.1/1/4:
-- console fence md5 pairs
LMSTYLE: f364fc79 f364fc79
LMBOX: f7c3b5c9 f7c3b5c9
LM: b1139a6e b1139a6e
LMSTYLE s4: f364fc79
LM s4: b1139a6e
-- instructor note outside fence (must print nothing):
-- LMS name hits outside served pages and records (read each):
./instructor-notes/session-3-before-monday.md:17:needs your GitHub, your Zoom, your Canvas or your printer. Minutes are estimates.
./instructor-notes/session-3-before-monday.md:34:| 7 | Post Canvas post 1 (the 5:45 window) and post 2 (the corrections). Hold post 3 until 
./instructor-notes/session-3-before-monday.md:35:| 8 | Fix the Part 1 due date so the syllabus and Canvas agree. One date, not on any page |
./instructor-notes/session-3-before-monday.md:65:- Post Canvas post 3 with its date filled.
./instructor-notes/session-3.md:163:| 6:00 | 3 | Housekeeping. Pre-class window closed at 5:58 | | "Canvas and file questions at the break, 
./instructor-notes/session-3-teaching-aid.md:14:1. **6:00 OPEN.** Zoom. "Canvas and file questions at the break." Tokens: output costs 5x in
./instructor-notes/session-3-teaching-aid.md:64:Advisors; the watermark beyond one sentence; Canvas help; §01/02, §04, §05, §06, §07 an
./instructor-notes/session-3-canvas-posts.md:1:# Three Canvas posts, ready to paste, for the week of Session 3
./instructor-notes/session-3-canvas-posts.md:12:Subject: Setup and Canvas questions: 5:45 to 6:00 PM Pacific, every week
./PEDAGOGY.md:33:| Canvas | Dates, deadlines, submission specs, grading | Instructor only |
./PEDAGOGY.md:38:**Companion files.** `component-bank.md` (skill) holds the 18 component families with code, interaction contracts and citat
./PEDAGOGY.md:57:12. **Lesson and case pages carry no grading, submission, due-date or LMS-name language.** Canvas is the single authority f
./PEDAGOGY.md:241:- **Open the case page at minute zero.** Not the syllabus, not admin. Admin goes in a Canvas announcement. (S2 spent 9.7 m
./PEDAGOGY.md:286:The lesson files and Canvas are one system. Check these every build.
./PEDAGOGY.md:291:4. **Deadlines that gate downstream work move earlier.** Part 1 is due the Wednesday before Session 4, and packages route 
./PEDAGOGY.md:297:10. **Canvas file types are configured and tested before term (v2.0).** Canvas rejected .txt and .md in Fall 2026 while th
./PEDAGOGY.md:317:**12.2 Surface routing.** The Claude Project is the deliberation, verification, research and prompt-authoring surface; it 
./PEDAGOGY.md:365:| 2026-08-27 | No grading, submission or due-date language on lesson pages; LMS not named in the repo | Canvas is the auth
./PEDAGOGY.md:376:| 2026-10-11 | **Assignment template and 80/20 checklist rubrics; single .zip + readme.txt handoff; build transcript moves
./docs/next-term/RUNBOOK.md:93:| D04, D29 | Final project Part 1 handoff = one `.zip` with a `readme.txt` and student-run self-checks. The b
./docs/next-term/RUNBOOK.md:98:The repo has a standing purge rule (MAINTAINING.md, "Standing purge list", Tier A and Tier B, plus the LMS-na
./docs/next-term/RUNBOOK.md:612:Out of scope: Canvas text, syllabus.
-- Tier A/B stems in served pages outside fences:
session-1/index.html:1626:   <div class="check" data-gate="g4"><span class="mk">&middot;</span><div class="ct"><b>Work along</b>Get the loss below 0.02, then submit all three scale guesses.</div></div
session-1/index.html:2693:     '<div class="readout" id="go'+i+'" style="min-height:auto;padding:10px 13px"><span class="nil">Move the slider, then submit.</span></div></div>'});
session-1/index.html:2694:   h+='<div class="row"><button class="btn" id="guessGo">Submit all three</button></div>';
session-2/index.html:1841:     <div id="rubric"></div>
session-2/index.html:1854:   <div class="check" data-gate="g9"><span class="mk">&middot;</span><div class="ct"><b>Work along</b>Self-audit one template against the rubric, then score the live audit as
session-2/index.html:2543:  {k:'Success criterion',re:/\b(must|should include|each .* must|complete when|criteria|requirement|ensure that)\b/i,fix:'Say what a finished, correct output contains. Otherw
session-2/index.html:2721: /* ================= 11 · RUBRIC + PEER ================= */
session-2/index.html:2758:     $('rubric').innerHTML=h;
session-2/index.html:2759:     $('rubric').querySelectorAll('.rb').forEach(function(b){b.onclick=function(){var i=b.getAttribute('data-i');state[cur][i]=!state[cur][i];render();score()}});
session-3/index.html:1676:   <div class="eyebrow"><span>Appendix A5 &middot; Due diligence</span><span class="mins">9 min</span></div>
session-3/index.html:1882:       <tr class="apxrow"><td>Appendix A5 &middot; Due diligence</td><td>Eight Questions for a Note-Taker Vendor</td><td class="n">9</td></tr>
session-3/index.html:3050:   var t='Subject: Due diligence questions before we pilot your note-taker\n\nBefore we begin a pilot, please answer the following in writing:\n';
session-4/index.html:3735:     for the free tier let it use what you submit to improve its products, and let human
```

Readings: `okonkwo` 0, storage APIs 0, no external origin outside the fonts allowlist, the console origin only in 0.1, 1 and 4, the three console fences byte-paired (0.1 and 1) and session-4 sharing LMSTYLE and LM, no `instructor note` outside the style fence. The LMS-name hits are all outside served pages (instructor notes, PEDAGOGY.md, this runbook); see §7 item 4. The Tier A/B stem hits are the kept classes (widget controls, the §11 rubric widget, "Due diligence", Google's terms).

## 2. Sections per file

Read off the files by `<section>` tag: id, `data-nav`, core or appendix (`class="slide apx"`), `data-tier`, `data-insert-after`, the `.mins` badge, distinct `data-task` roots in the section, `data-comp` values, and whether the section is the structured discussion (a `sealed-vote-debate` component or a "Discussion" eyebrow). The hub has no sections. Session 0.1 is the 0.x format (no appendix, 120 allocated).


## index.html
| # | id | data-nav | kind | tier | insert-after | min | tasks | comps | discussion |
|---|---|---|---|---|---|---|---|---|---|

Sums: core 0 sections = 0 min; appendix 0 sections = 0 min; total 0; alloc row none; window.__coreMins none; distinct data-task 0

## session-0.1/index.html
| # | id | data-nav | kind | tier | insert-after | min | tasks | comps | discussion |
|---|---|---|---|---|---|---|---|---|---|
| 1 | s0 | Cold open | core |  |  | 8 | 1 | timed-ritual |  |
| 2 | s1 | Five layers | core |  |  | 7 | 2 | case-modal-spine, prediction-commit |  |
| 3 | s2 | Four models | core |  |  | 10 | 1 | commit-first-mcq |  |
| 4 | s3 | Effort and thinking | core |  |  | 10 | 1 | parameter-sandbox |  |
| 5 | s4 | Context inspector | core |  |  | 16 | 2 | ctx-inspector |  |
| 6 | s5 | Retrieval ladder | core |  |  | 9 | 1 | estimate-then-reveal |  |
| 7 | s6 | What persists | core |  |  | 10 | 1 | two-bucket-sorter |  |
| 8 | s7 | Skills, connectors, plugins | core |  |  | 10 | 1 | multi-column-sorter |  |
| 9 | s8 | Live demo | core |  |  | 10 | 1 | builder-assembler |  |
| 10 | s9 | Output forensics | core |  |  | 8 | 1 | symptom-diagnoser |  |
| 11 | s10 | Discussion | core |  |  | 15 | 1 | sealed-vote-debate | YES |
| 12 | s11 | Baseline and close | core |  |  | 7 | 1 | timed-ritual |  |

Sums: core 12 sections = 120 min; appendix 0 sections = 0 min; total 120; alloc row none; window.__coreMins none; distinct data-task 14

## session-1/index.html
| # | id | data-nav | kind | tier | insert-after | min | tasks | comps | discussion |
|---|---|---|---|---|---|---|---|---|---|
| 1 | s1 | Start | core |  |  | 6 | 1 | work-along-gate |  |
| 2 | apx | Appendix contents | apxdiv |  |  | 81 | 0 |  |  |
| 3 | sCold | Cold open | core |  |  | 8 | 1 | timed-ritual |  |
| 4 | s2 | Prediction | core |  |  | 7 | 1 | distribution-picker |  |
| 5 | s3 | A1 · n-grams | appendix | foundational | s2 | 11 | 1 | parameter-sandbox |  |
| 6 | s4 | A2 · Fitting a model | appendix | advanced | s2 | 12 | 1 | hand-fit-lab |  |
| 7 | s5 | Tokens | core |  |  | 5 | 1 | work-along-gate |  |
| 8 | s6 | A3 · Meaning space | appendix | foundational | s5 | 9 | 1 | commit-first-mcq |  |
| 9 | s7 | A4 · Counting failure | appendix | standard | s5 | 9 | 1 | distribution-picker |  |
| 10 | s8 | A5 · SAMPLER LAB | appendix | advanced | s5 | 16 | 1 | pipeline-lab |  |
| 11 | s9 | Hallucination | core |  |  | 7 | 1 | work-along-gate |  |
| 12 | s10 | Frontier | core |  |  | 5 | 1 | click-map-explorer |  |
| 13 | s11 | Practice cost | core |  |  | 7 | 1 | parameter-sandbox |  |
| 14 | s12 | Tier choice | core |  |  | 6 | 1 | commit-first-mcq |  |
| 15 | s13 | Confidentiality | core |  |  | 7 | 1 | two-bucket-sorter |  |
| 16 | s14 | A6 · Regulation | appendix | foundational | s13 | 9 | 1 | symptom-diagnoser |  |
| 17 | s14b | Custom instructions | core |  |  | 4 | 1 | builder-assembler |  |
| 18 | s14c | A7 · Discussion | appendix | standard | s14b | 15 | 1 | sealed-vote-debate | YES |
| 19 | s15 | Close | core |  |  | 7 | 1 | timed-ritual |  |

Sums: core 11 sections = 69 min; appendix 7 sections = 81 min; total 150; alloc row 150; window.__coreMins 69; distinct data-task 18

## session-2/index.html
| # | id | data-nav | kind | tier | insert-after | min | tasks | comps | discussion |
|---|---|---|---|---|---|---|---|---|---|
| 1 | s0 | Retrieval bridge | core |  |  | 6 | 1 | retrieval-bridge |  |
| 2 | apx | Appendix contents | apxdiv |  |  | 81 | 0 |  |  |
| 3 | s1 | B1 · Next token | appendix | foundational | s0 | 16 | 1 | work-along-gate |  |
| 4 | s2 | B2 · Laplace | appendix | foundational | s0 | 15 | 2 | work-along-gate, estimate-then-reveal |  |
| 5 | sCold | Cold open | core |  |  | 8 | 1 | timed-ritual |  |
| 6 | s3 | Temperature | core |  |  | 5 | 1 | prediction-commit |  |
| 7 | s4 | B3 · Counting failure | appendix | standard | s3 | 16 | 1 | work-along-gate |  |
| 8 | s5 | Cost frontier | core |  |  | 6 | 1 | parameter-sandbox |  |
| 9 | s6 | P·T·C·F | core |  |  | 6 | 1 | builder-assembler |  |
| 10 | s6b | Build a prompt | core |  |  | 7 | 1 | builder-assembler |  |
| 11 | s7 | Triage | core |  |  | 5 | 1 | commit-first-mcq |  |
| 12 | s8 | Interview rewrite | core |  |  | 6 | 2 | builder-assembler |  |
| 13 | s9 | B4 · Seven steps | appendix | standard | s8 | 16 | 1 | multi-column-sorter |  |
| 14 | s10 | Citations | core |  |  | 8 | 1 | multi-column-sorter |  |
| 15 | s11 | Template audit | core |  |  | 5 | 1 | work-along-gate |  |
| 16 | s12d | B5 · Discussion | appendix | standard | s11 | 18 | 1 | sealed-vote-debate | YES |
| 17 | s12 | Final project | core |  |  | 7 | 2 | timed-ritual, work-along-gate |  |

Sums: core 11 sections = 69 min; appendix 5 sections = 81 min; total 150; alloc row 150; window.__coreMins 69; distinct data-task 19

## session-3/index.html
| # | id | data-nav | kind | tier | insert-after | min | tasks | comps | discussion |
|---|---|---|---|---|---|---|---|---|---|
| 1 | s1 | Bridge + case | core |  |  | 5 | 1 | retrieval-bridge |  |
| 2 | apx | Appendix contents | apxdiv |  |  | 83 | 0 |  |  |
| 3 | s2 | Meaning space | core |  |  | 7 | 3 | rotatable-3d-space, click-map-explorer, two-bucket-sorter |  |
| 4 | s4 | Retrieval | core |  |  | 6 | 1 | estimate-then-reveal |  |
| 5 | sRag | A1 · Do you need retrieval? | appendix | foundational | s4 | 14 | 1 | two-bucket-sorter |  |
| 6 | s6 | Grounding limits | core |  |  | 6 | 1 | prediction-commit |  |
| 7 | s7 | Grounding vs tuning | core |  |  | 5 | 2 | stepped-comparison, commit-first-mcq |  |
| 8 | s9 | Workflow | core |  |  | 6 | 1 | symptom-diagnoser |  |
| 9 | sPrep | A2 · Intake questionnaire | appendix | foundational | s9 | 14 | 1 | builder-assembler |  |
| 10 | s10 | Note-takers | core |  |  | 7 | 1 | spoiler-reveal |  |
| 11 | sChk | A3 · Check the summary | appendix | foundational | s10 | 14 | 1 | two-bucket-sorter |  |
| 12 | s11 | C3 · Adoption | appendix | foundational | s10 | 14 | 1 | estimate-then-reveal |  |
| 13 | sOff | The client review | core |  |  | 5 | 1 | multi-column-sorter |  |
| 14 | s12 | Consent | core |  |  | 4 | 1 | commit-first-mcq |  |
| 15 | sVend | A5 · Vendor questions | appendix | standard | s12 | 9 | 1 | builder-assembler |  |
| 16 | sPol | What must be written down | core |  |  | 5 | 2 | prediction-commit, click-document-set |  |
| 17 | s13 | Basis | core |  |  | 6 | 1 | two-bucket-sorter |  |
| 18 | s15 | C4 · Discussion | appendix | standard | s13 | 18 | 1 | sealed-vote-debate | YES |
| 19 | s16 | Checklist + assignments | core |  |  | 5 | 1 | builder-assembler |  |

Sums: core 12 sections = 67 min; appendix 6 sections = 83 min; total 150; alloc row 150; window.__coreMins 67; distinct data-task 22

## session-4/index.html
| # | id | data-nav | kind | tier | insert-after | min | tasks | comps | discussion |
|---|---|---|---|---|---|---|---|---|---|
| 1 | s0 | Bridge + frame | core |  |  | 6 | 1 | retrieval-bridge |  |
| 2 | apx | Appendix contents | apxdiv |  |  | 83 | 0 |  |  |
| 3 | sCold | Cold open | core |  |  | 8 | 1 | timed-ritual |  |
| 4 | s1 | The rules | core |  |  | 5 | 1 | multi-column-sorter |  |
| 5 | s2 | Client data | core |  |  | 6 | 1 | builder-assembler |  |
| 6 | sRSP | D5 · The 30-day clock | appendix | foundational | s2 | 14 | 1 | commit-first-mcq |  |
| 7 | sAnon | D6 · Replace, don't delete | appendix | foundational | s2 | 12 | 1 | two-bucket-sorter |  |
| 8 | s3 | Where it goes | core |  |  | 6 | 1 | parameter-sandbox |  |
| 9 | s4 | Vetting a tool | core |  |  | 5 | 1 | builder-assembler |  |
| 10 | s5 | Attacks | core |  |  | 6 | 1 | prediction-commit |  |
| 11 | sW1 | D1 · How a watermark works | appendix | advanced | s5 | 14 | 1 | parameter-sandbox |  |
| 12 | sW2 | D2 · What a watermark proves | appendix | advanced | s5 | 12 | 1 | two-bucket-sorter |  |
| 13 | s6 | What checking costs | core |  |  | 5 | 1 | estimate-then-reveal |  |
| 14 | sWS | D3 · Source staleness | appendix | standard | s6 | 13 | 1 | commit-first-mcq |  |
| 15 | s7 | The record | core |  |  | 5 | 1 | two-bucket-sorter |  |
| 16 | sCR | Handoff test | core |  |  | 10 | 1 | symptom-diagnoser |  |
| 17 | sD | D4 · Discussion | appendix | standard | sCR | 18 | 1 | sealed-vote-debate | YES |
| 18 | s9 | Firm policy | core |  |  | 5 | 1 | builder-assembler |  |

Sums: core 11 sections = 67 min; appendix 6 sections = 83 min; total 150; alloc row 150; window.__coreMins 67; distinct data-task 17

## session-5/index.html
| # | id | data-nav | kind | tier | insert-after | min | tasks | comps | discussion |
|---|---|---|---|---|---|---|---|---|---|
| 1 | s0 | Bridge + frame | core |  |  | 5 | 1 | retrieval-bridge |  |
| 2 | apx | Appendix contents | apxdiv |  |  | 66 | 0 |  |  |
| 3 | sCold | Cold open | core |  |  | 8 | 1 | timed-ritual |  |
| 4 | s1 | The tools change | core |  |  | 5 | 1 | parameter-sandbox |  |
| 5 | sE2 | E2 · The test set | appendix | standard | s1 | 14 | 1 | pipeline-lab |  |
| 6 | s2 | Explain it | core |  |  | 6 | 1 | click-map-explorer |  |
| 7 | s3 | Break it | core |  |  | 5 | 1 | prediction-commit |  |
| 8 | sE3 | E3 · Failure types | appendix | foundational | s3 | 12 | 1 | multi-column-sorter |  |
| 9 | s4 | Improve it | core |  |  | 5 | 1 | builder-assembler |  |
| 10 | sE4 | E4 · The builder's two minutes | appendix | foundational | s4 | 10 | 1 | commit-first-mcq |  |
| 11 | sE1 | E1 · Rehearsal | appendix | standard | s4 | 12 | 1 | timed-ritual |  |
| 12 | s5 | Measure it | core |  |  | 5 | 1 | estimate-then-reveal |  |
| 13 | s6 | New tools | core |  |  | 5 | 1 | builder-assembler |  |
| 14 | sLib | The firm's library | core |  |  | 5 | 1 | pipeline-lab |  |
| 15 | s7 | What stays human | core |  |  | 5 | 1 | two-bucket-sorter |  |
| 16 | sE5 | E5 · Discussion | appendix | standard | s7 | 18 | 1 | sealed-vote-debate | YES |
| 17 | s8 | The reading | core |  |  | 5 | 1 | commit-first-mcq |  |

Sums: core 11 sections = 59 min; appendix 5 sections = 66 min; total 125; alloc row 125; window.__coreMins 59; distinct data-task 16


### 2.1 Core and appendix minute sums

| File | Core sections | Core min | Appendix sections | Appendix min | Total | `__coreMins` | Distinct `data-task` | Structured discussion |
|---|---|---|---|---|---|---|---|---|
| session-0.1 | 12 | 120 | 0 | 0 | 120 | none | 14 | `s10` Discussion, core (0.x format) |
| session-1 | 11 | 69 | 7 | 81 | 150 | 69 | 18 | `s14c` A7, appendix (15 min) |
| session-2 | 11 | 69 | 5 | 81 | 150 | 69 | 19 | `s12d` B5, appendix (18 min) |
| session-3 | 12 | 67 | 6 | 83 | 150 | 67 | 22 | `s15` C4, appendix (18 min) |
| session-4 | 11 | 67 | 6 | 83 | 150 | 67 | 17 | `sD` D4, appendix (18 min) |
| session-5 | 11 | 59 | 5 | 66 | 125 | 59 | 16 | `sE5` E5, appendix (18 min) |

Every structured discussion in sessions 1 to 5 sits in the appendix, as the runbook's evidence brief says. Every session 1, 2, 4 and 5 carries an 8-minute `sCold` cold-open ritual in core (session 3 folds its bridge and case into `s1`); PEDAGOGY.md §13.1 superseded the ritual on 2026-10-11. The `.mins` badges, the `tbudget` alloc row and `window.__coreMins` agree in every file (`build-appendix --check` exit 0).

## 3. Case dependency map

What consumes `CASE.md` or an artifact generated from it, what each reads, and what breaks when the case facts change.

| Consumer | Reads | Breaks when the facts change |
|---|---|---|
| `scripts/build-case.mjs` | `CASE.md` YAML header (case_id, version, sentinels), Parts A to O by heading regex; `grab()` pulls about 100 figures by regex from named sections (A.1 dates and roles, B.1 to B.6 company facts, C.1 to C.3 balance sheet and retirement accounts, D.1 to D.3 cash flow and tax, E.1 to E.8 the LLC, trust, seed gift, sale, note and burn, F documents, G charitable, H rates, J landmines); recomputes 13 Part M identities; captures Part O corpus (10 chunks D1 to D10, 5 speaker turns) and the Part L flowchart | Every `grab()` regex is written for the v4 wording: any section renamed or removed (Parts B, E, G, H as written) makes it `die()`. The Part M check list, the `$38,500` sentinel, the D2 consent-gate assertion and the `§F.6` assertion are v4-specific. Must be rewritten for v5 figures and identities (Phase 3). |
| `scripts/case-facts.json` (generated) | output of build-case: `figures` with 102 keys (megName … techValueCheck) | Regenerated; consumers keyed on v4 names (`cpcValue`, `notePrincipal`, `discount`, `perNonVoting`, `steadyGap`, `techPct`, `brokerage`, `rate`, `plantTown`, `buySellFormula`, `saleUnits`, `noteRate`, `techPositions`) break: `session-1` uses 12 of them at runtime through the injected `COLE` constant (table in §3.1). |
| `scripts/case-corpus.json` (generated) | Part O chunks and the meeting excerpt | `session-3` ranks `COLEDOCS.corpus` with a live IDF index; every displayed score, the margin flag and the four preset-query rankings are properties of the chunk text (MAINTAINING "The retrieval corpus lives in CASE.md"). A v5 corpus invalidates every ranking assertion in `session-3` prose and its `checks.mjs` folders. |
| `scripts/case-extract.html` (generated) | `buildExtract()` in build-case: the one-screen Facts tab, hard-wired to the v4 narrative (CPC shares, the five-line structure, the burn, the open questions) | The template is v4 prose; must be rewritten for v5 (Phase 3). |
| `scripts/case-flowchart.html` (generated) | `CASE:FLOWCHART` block in Part L (two SVG sheets of the IDGT structure, scoped under `.cole-flow`) | Part L is the IDGT flowchart; v5 has no IDGT. Either a new Part L sheet (Roth conversion window timeline) or the Structure tab is dropped, and `verify-browser` check 14 (flowchart fragment) and `test-case-viewer` V8 (two SVG sheets survive the copy) must follow. DW-070 (hand-typed figures in the sheets) is open. |
| `scripts/inject-case.mjs` | the four generated files; `buildBlock()` writes the Facts tab, Structure tab, `COLE` constant, `COLEDOCS`, the viewer markup and controller between the sentinels in 7 files (LESSONS) | Its own arithmetic (`perUnitDiv`, `votingVal`, `trustShare`, `unitsBought`) and both tabs' prose are v4; rewrite for v5. The viewer controller and `.case-*` emitted rules are case-neutral and stay. The symlink guard defect DW-165 is open. |
| `scripts/verify-case.mjs` | the injected span's hash in 7 files against the current build; the lesson-local `.case-*` layout rules across the 7 files (20 rules) | Hash check follows any rebuild; layout check is case-neutral. |
| `scripts/verify-migration.mjs` | check 1 RETIRED list (Part K v3 strings), 1b MISAPPLIED framings, 4 ALLOW conditional allowances, 7 extract fidelity against case-facts.json, 7b Parts H/I/M not reproduced, 9 interaction floor, 10 gating/storage, 11 rendered arithmetic (24 identities) against Part M, 12 to 14b charts and SVG, 16 minute arithmetic, 18 chips, 20 PINS (2 pins: `steadyGap` $522,086 and `notePrincipal` $20,020,000 in session-1) | Checks 1, 1b, 4, 7, 11 and 20 are written to v4 facts and figure keys; every one must be re-derived for v5 (Phase 3), and the v4 Part K strings join the RETIRED list. |
| `scripts/case-inventory.mjs` | CASE.md figures and proper nouns, with `near` context patterns, over the tree; `docs/case-fact-inventory.md` is its report | Its fact list is v4; the UNGUARDED count is the number that must not grow; re-derive for v5 and regenerate the report. |
| `scripts/build-cardsort.mjs` | CASE.md Part J landmines, Part H rates, Part G chair role, and `case-facts.json`; writes the §08 card-sort deck between CARDSORT sentinels in `session-1` | Pins v4 landmines and the chair role; v5 Part J (NPI fields) and v5 rates need a new derivation, or the deck is reported as not fitting (Phase 3 step 2). |
| `scripts/test-case-viewer.mjs` | the rendered viewer in Chromium: tabs, focus trap, Escape, new-tab Blob view, "both flowchart sheets survive the copy (2 SVG)" | V8 asserts two SVG sheets; follows the Part L decision. |
| `scripts/verify-browser.mjs` | check 14 loads `scripts/case-flowchart.html` standalone; check 15 screenshots | Follows the Part L decision. |
| `scripts/editorial-regions.mjs`, `test-editorial-regions.mjs` | mask the `CASE:BEGIN`/`CASE:END` span (R6) | Case-neutral. |
| `scripts/verify-style.mjs` | `case-extract.html` and `case-flowchart.html` are the two permitted fenceless fragments | Case-neutral; a third fragment fails it. |
| `session-1/index.html` | `COLE.*` at runtime (12 keys), the CARDSORT deck, 2 check-20 pins, the §02 rendered Part K fact (DW-063), the Cole IDGT walkthrough prose | Heaviest v4 surface outside the span (Phase 4a counts it). |
| `session-2` to `session-5`, `index.html`, `session-0.1` | the injected span only (`COLE.hasOwnProperty` once each) plus prose mentions of Cole facts | Prose mentions are Phase 4a's register. |
| `README.md` "The Cole household" | prose: Barrington Hills, Rockford, the company | Phase 4b hub-and-notes rewrites it. |
| `instructor-notes/*.md`, `*.htm` teaching aids and PDFs | v4 facts in run sheets, polls, rule keys; the PDFs are rendered copies of the `.htm` files | Phase 4b hub-and-notes; PDFs are regenerated or retired (binary, not prose). |
| `docs/probe-captures.md`, the live-console fallbacks in `session-0.1`, `session-1`, `session-4` | captured model outputs that embed v4 facts | RECAPTURE rows (Phase 4a). |

### 3.1 `COLE` keys each lesson reads at runtime

| File | Keys |
|---|---|
| session-1 | techPct (4), discount (4), brokerage (3), techPositions (2), cpcValue (2), buySellFormula (2), steadyGap, saleUnits, rate, plantTown, perNonVoting, noteRate |
| session-0.1, 2, 3, 4, 5, hub | none beyond `COLE.hasOwnProperty` in the viewer controller |

## 4. Volatile-fact census

Pattern: model names (Haiku, Sonnet, Opus, Fable, Mythos, GPT-n, Gemini, Grok, Kimi, DeepSeek, Llama, Qwen), leaderboards (LiveBench, LMArena, Arena, Artificial Analysis, AI Arena), SynthID, MCP, Reg S-P, exam priorities, 24-09, watermark*, plan names, and dollar prices per token or per month. Over the hub, the six lessons and every `instructor-notes/*.md`.

| File | Hits |
|---|---|

| index.html | 0 |
| session-0.1/index.html | 143 |
| session-1/index.html | 62 |
| session-2/index.html | 50 |
| session-3/index.html | 7 |
| session-4/index.html | 93 |
| session-5/index.html | 88 |
| instructor-notes/session-0.1.md | 0 |
| instructor-notes/session-1.md | 0 |
| instructor-notes/session-2.md | 7 |
| instructor-notes/session-3-before-monday.md | 1 |
| instructor-notes/session-3-canvas-posts.md | 11 |
| instructor-notes/session-3-polls.md | 1 |
| instructor-notes/session-3-teaching-aid.md | 1 |
| instructor-notes/session-3-verify-brief.md | 0 |
| instructor-notes/session-3.md | 14 |
| instructor-notes/session-4-polls.md | 2 |
| instructor-notes/session-4-rule-key.md | 8 |
| instructor-notes/session-4-teaching-aid.md | 16 |
| instructor-notes/session-4.md | 29 |
| instructor-notes/session-5-polls.md | 0 |
| instructor-notes/session-5-teaching-aid.md | 1 |
| instructor-notes/session-5.md | 1 |

The full table (file, section id, line, matched string, context) is in §A below. Session 0.1 carries the most hits (143) and is rebuilt by Phase 8; sessions 1, 4 and 5 are Phase 5's main surface.

## 5. Open deferred-work rows whose target is a lesson, `CASE.md` or a case script

From the Open table of `docs/deferred-work.md` at `da7b003` (86 open rows), the rows whose `file:line` or description names a lesson file, `CASE.md`, the hub, or one of the case scripts. The register is not edited by this phase.

| id | description (truncated) | file:line | owner |
|---|---|---|---|

|  DW-014  | EDITORIAL.md Part A's population is ALL_LESSONS, which excludes index.html. A16 therefore polices the form of every marker in the five lesso… | EDITORIAL.md:124, the authoredProse population | instructor |
|  DW-017  | index.html:1013 says *"Every tax and legal characterisation attached to this case is posed as a question, not a holding"*, which the injecte… | index.html:1013 | instructor |
|  DW-019  | src-owasp's citation points at what OWASP itself describes as a historical archive. The teaching claim survives — prompt injection is LLM0… | SOURCES.md, src-owasp | instructor |
|  DW-020  | Eight chips should not be confidence chips at all: a figure-label legend, two of the page's own methodological caveats, a declared assumptio… | docs/chip-rewiring.md §4 | instructor |
|  DW-022  | src-aa's versioning incoherence, and the livebench-versus-Artificial-Analysis attribution. A later version string carries data identical to … | docs/repo-updates-plan.md §5.6 | instructor |
|  DW-027  | **F6** — session-2's print nondeterminism. Pre-existing and by design; fixing it changes interaction logic.  **Catch-up 2026-10-11 (docs/c… | session-2/index.html | instructor |
|  DW-044  | **Ratchet lowered, recorded under the MAINTAINING.md ratchet rule.** Phase 4 moved every instructor note out of the pages into instructor-no… | scripts/editorial-baseline.json, A9 | instructor |
|  DW-045  | **Three ratchets lowered before the rule existed, recorded retroactively.** MAINTAINING.md now requires every lowered scripts/editorial-base… | scripts/editorial-baseline.json, A9 | instructor |
|  DW-046  | **Ratchet lowered, recorded under the MAINTAINING.md ratchet rule.** A9 session-4 entity **83 -> 82**. The fifteenth instructor note was fou… | scripts/editorial-baseline.json, A9 | instructor |
|  DW-047  | **Ratchet lowered, recorded under the MAINTAINING.md ratchet rule.** The ungraded-repo purge removed every assertion of a grade, a weight, a… | scripts/editorial-baseline.json, A9 | instructor |
|  DW-050  | **Must the sessions be fully standalone? The Tier D constructs are held open on this question.** The ungraded-repo purge deleted every betwe… | five lessons, enumerated above | instructor |
|  DW-051  | **instructor note survives in six files and the fix is upstream in the skill.** index.html:19 and each lesson's :19 (:24 in session-0.1) car… | upstream skill, assets/tokens.css:6 and references/design-system.md:26 | instructor |
|  DW-053  | **A8's session-3 minority carries three units of unearned slack.** The baseline records minority: 15; the rule's declared population is auth… | scripts/editorial-baseline.json, A8.files.session-3 | instructor |
|  DW-054  | **Three instructor-addressed constructs carry no marker, so the Phase 4 definition could not see them.** That definition required one of fou… | session-0.1:1750, :1708; session-2:1930; the 13 .verify gates | instructor |
|  DW-056  | **Thirteen .verify gates guard tax, legal and regulatory characterisations, and none of them has been closed.** Inventoried this turn: index… | 13 sites, enumerated above | instructor |
|  DW-057  | **session-0.1's disposition, held open by instructor decision.** It **stays in the repository, stays linked at index.html:1045, and is PERMA… | session-0.1/index.html; MAINTAINING.md, the standing purge list | instructor |
|  DW-058  | **Ratchet lowered, recorded under the MAINTAINING.md ratchet rule.** The session-1 pass-2 deletion sweep removed six named blocks of prose f… | scripts/editorial-baseline.json, A9; session-1/index.html | instructor |
|  DW-059  | **Ratchet lowered BY CONVERSION, not by deletion &mdash; the first such lowering in this file, and the reason it is a separate row from DW-0… | scripts/editorial-baseline.json, A9; session-1/index.html | instructor |
|  DW-060  | **EDITORIAL.md B3's second worked example quotes a string that no longer exists, and the pass that changed it answered part of B3's own comp… | EDITORIAL.md:1131-1137; session-1/index.html, the §02 distribution picker | instructor |
|  DW-069  | **September window. A third quotation in the session-1 A2 paragraph drops the article's own quotation marks, and the verifier does not check… | session-1/index.html:1637, the third quotation in the A2 p.dim; scripts/verify-wolfram-quotes.py, PDIM_FIGURES | instructor |
|  DW-070  | **September window. Every figure drawn inside the Part L sheets is a hand-typed literal, and no validator ties any of them to CASE.md data.*… | CASE.md Part L; scripts/case-flowchart.html; scripts/build-case.mjs grab(); scripts/verify-case.mjs; scripts/verify-browser.mjs flowchart checks | instructor |
|  DW-075  | **Audit 2026-09-03. In-class deixis purged from session-1 survives in the other four lessons, now measured.** Pass 2 took session-1 to zero … | session-2/index.html, seven sites; session-3, session-4, session-0.1 | instructor |
|  DW-081  | **Audit 2026-09-03. The moving-target sources are ageing into September and no row owns the re-pull.** docs/source-verification-queue.md at … | SOURCES.md, the 21 moving_target records; DATA-PULL.md | instructor |
|  DW-082  | **Audit 2026-09-03. docs/repo-updates-plan.md Phases 5, 6 and 7 were never executed and are tracked nowhere.** The plan's §0 table gates th… | docs/repo-updates-plan.md §0, §6, §8, §9 | instructor |
|  DW-092  | **Audit 2026-09-07. Corrections owed to the room from Session 1.** Twelve statements the room heard that the page or a primary source contra… | audit/AUDIT-2026-09-07.md §5.4; instructor-notes/session-2.md after PR D | instructor |
|  DW-093  | **Audit 2026-09-07. session-2 prose density is 55.9 words per allocated minute against the 37 to 42 band.** lesson_plan_extract.py: 8,388 wo… | session-2/index.html, s0 and s12 | Claude Code |
|  DW-094  | **Audit 2026-09-07. session-2 runs the same component type in adjacent sections twice.** s1 then s2 are both work-along-gate (appendix B1, B… | session-2/index.html, data-comp on s1, s2, s9, s10 | instructor |
|  DW-096  | **Audit 2026-09-07. No session-1-delivered-2026-08-31 tag exists.** MAINTAINING.md (*"Marking what was actually taught"*) says to cut one. m… | git tag | Claude Code |
|  DW-097  | **Audit 2026-09-07. Forty-one minutes of Session 1 were session-0.1's control-surface content, delivered from the product.** 00:31 to 01:12 … | index.html, README.md, the session-0.1 card | instructor |
|  DW-100  | **Audit 2026-09-08. No plain-language summary of the case exists anywhere on the site.** CASE.md is 1,200 technical lines and the Case facts… | CASE.md Part A; scripts/inject-case.mjs; the case-facts viewer | instructor |
|  DW-104  | **PR A, 2026-09-08. A stray <script src> inside a comment costs session-0.1 a third of its editorial coverage.** scripts/editorial-regions.m… | scripts/editorial-regions.mjs:151-156; session-0.1/index.html:10 | instructor |
|  DW-105  | **Pre-flight 2026-09-12. The retrieval bridge has no 7-minute allocation.** Pedagogy s4 and bank family 5 give it 7 minutes as the first sec… | session-2/index.html §00 | instructor |
|  DW-107  | **Pre-flight 2026-09-12. Four core sections carry a doit whose stated minutes, plus their widgets, exceed the eyebrow.** §01 a 4-minute doi… | session-2/index.html §01, §02, §03, §07 | instructor |
|  DW-108  | **Pre-flight 2026-09-12. A core-only Session 2 runs no named discussion block.** B5 is the file's only I-class interaction, is 18 minutes wh… | session-2/index.html:1860 | instructor |
|  DW-109  | **Pre-flight 2026-09-12. Two legal characterisations in the §07 key rest on secondary sources and await the instructor's read of the primar… | session-2/index.html CITES[2], CITES[4]; the §04 .verify | instructor |
|  DW-110  | **Pre-flight 2026-09-12. Five claims left without a chip because no source was reachable or none exists.** §01 "Consumer chat tools do not … | session-2/index.html five sites | instructor |
|  DW-112  | **Pre-flight 2026-09-12. Two tool defects keep the gate from ever being green in a fresh environment.** The skill's validate_dom.js asserts … | validate_dom.js; MAINTAINING.md pre-push gate | open-upstream |
|  DW-113  | **Pre-flight 2026-09-12. Six figures on session-2 could not be checked against their primary hosts from the build environment.** Dahl et al.… | session-2/index.html:1442, :1774, :1781, B1 | instructor |
|  DW-116  | **Manual pass 2026-09-13. Three validator lines are red for session-2 by design after the override's removal.** The skill's validate_lesson.… | validate_lesson.py V8; validate_dom.js; scripts/verify-browser.mjs | open-upstream |
|  DW-118  | **Manual pass 2026-09-13. Six figure groups on session-2 §02 could not be re-verified from the build environment and carry their August ret… | session-2/index.html §02, SOURCES.md src-aa, src-openai-pricing | instructor |
|  DW-120  | **Polish pass 2026-09-14. Nine findings on session-2 are proposed, not landed, because each changes a figure, a date, a chip, a family tag, … | session-2/index.html; docs/changes/2026-09-14-session-2-polish/register.md | instructor |
|  DW-122  | **Manual pass 2026-09-13, Session 3. A9 for session-3 lowered on the instructor's instruction (kickoff K1, carried into the Session 3 kickof… | scripts/editorial-baseline.json, session-3/index.html | instructor |
|  DW-124  | **Session 4 rebuild 2026-09-25 (branch claude/amazing-curie-xz0s73, docs/changes/2026-09-25-session-4-rebuild/). A9 for session-4 lowered on… | scripts/editorial-baseline.json, session-4/index.html | instructor |
|  DW-125  | **Session 5 build 2026-10-02 (branch claude/practical-fermi-5g0sm0, docs/changes/2026-10-02-session-5-build/). The A8 and A9 entries for ses… | scripts/editorial-baseline.json, session-5/index.html | instructor |
|  DW-126  | **Session 5 build 2026-10-02. Twelve records carry M because their publishers are egress-blocked from the build**: the four productivity tri… | SOURCES.md, session-5/index.html | instructor |
|  DW-130  | **Session 5 interactivity pass 2026-10-04. The word the instructor used for the quality rule, rubric, is kept off the page** because the cou… | session-5/index.html, docs/changes/2026-10-02-session-5-build/checks.mjs | instructor |
|  DW-136  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Session 5 is 125 allocated minutes by instruction (__coreMins=59… | session-5/index.html footer timing; MAINTAINING.md:447-457 | instructor |
|  DW-137  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **The 2026-09-21 Session 3 visual pass (PRs #34, #35, #36) had no … | session-3 §01, §05 to §07, §09b; docs/changes/2026-09-21-session-3-visual-pass/ | instructor |
|  DW-138  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Session 4's Verify-before-teaching list, about twenty M-chipped … | instructor-notes/session-4.md:454-558; docs/changes/2026-09-27-session-4-syllabus/handback.md:85-95; docs/changes/2026-09-28-session-4-notes/handback.md:145-193 | instructor |
|  DW-139  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Session 3's unverified items after its last passes have no row.*… | instructor-notes/session-3.md:67-81, :482-496; instructor-notes/session-3-verify-brief.md; docs/changes/2026-09-18-session-3-final/handback.md:314, :409-410 | instructor |
|  DW-140  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **The footer *Last updated* stamps are hand-maintained and were wr… | every lesson footer, p.stamp | instructor |
|  DW-142  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **README defines M as *"derived or reported by a single secondary … | README.md:116-119; session-4 and session-5 M chips | instructor |
|  DW-143  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Four calls the 2026-09-28 pass made and put to the instructor ha… | docs/changes/2026-09-28-session-4-notes/handback.md:37-47, :167-175; plan.md:27-30; MAINTAINING.md:187-190 | instructor |
|  DW-144  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Of the nine "Decide:" blocks the 2026-09-27 manual review ranked… | docs/changes/2026-09-27-session-4-syllabus/manual-review.md:7-91; handback.md:85-95 | instructor |
|  DW-145  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Three flags of the 2026-09-25 rebuild never reached the register… | docs/changes/2026-09-25-session-4-rebuild/handback.md:196-215 | instructor |
|  DW-146  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Generator-wide strings offered "say the word" in the 2026-09-25 … | docs/changes/2026-09-25-session-4-polish/handback.md:70-77; scripts/build-appendix.mjs; scripts/inject-sources.mjs | instructor |
|  DW-147  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Session 5 proposals left with the instructor.** The *"one honest… | docs/changes/2026-10-02-session-5-build/; docs/changes/2026-10-04-session-5-interactivity/handback.md | instructor |
|  DW-148  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Session 3 final and simplify flags never rowed.** §08's three p… | docs/changes/2026-09-18-session-3-final/handback.md:392-414; docs/changes/2026-09-19-session-3-simplify/handback.md:264-300 | instructor |
|  DW-150  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Off-site obligations the 2026-09-17 queue left "on your desk reg… | docs/changes/2026-09-17-session-3-update-plan/QUEUE.md:68-81; instructor-notes/session-4.md:560-572 | instructor |
|  DW-151  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Two [UNVERIFIED] figures in the Gemini feasibility study fed Ses… | docs/gemini-live-api-feasibility.md; session-4 Live API box | instructor |
|  DW-152  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **The Session 2 delivery audit is cited nowhere in this register, … | audit/PEDAGOGICAL-AUDIT-SESSION-2-2026-09-14.md; session-2/index.html | instructor |
|  DW-157  | **Catch-up 2026-10-11 (docs/changes/2026-10-11-deferred-work-catchup/).** **Session 1's §00, §01 and §07 interaction measurements were ne… | docs/session-1-feedback-inventory.md:146-150, :289; session-1/index.html §00, §01, §07 | instructor |
|  DW-159  | **Catch-up 2026-10-11, Wave 2 (docs/changes/2026-10-11-deferred-work-catchup/).** **A plain run of verify-sources.mjs can rewrite the lesson… | scripts/verify-sources.mjs:23; scripts/inject-sources.mjs:159, :193 | Claude Code |
|  DW-160  | **Catch-up 2026-10-11, Wave 2 (docs/changes/2026-10-11-deferred-work-catchup/).** **instructor-notes/session-4-rule-key.pdf is not a renderi… | instructor-notes/session-4-rule-key.pdf, .htm:104, :173 | instructor |
|  DW-161  | **Catch-up 2026-10-11, Wave 2 (docs/changes/2026-10-11-deferred-work-catchup/).** **At 320 px Sessions 0.1 and 1 still scroll sideways, from… | session-0.1/index.html #ctxWireSvg, .buck; session-1/index.html table.mtx | Claude Code |
|  DW-162  | **Catch-up 2026-10-11, review of Wave 2 (docs/changes/2026-10-11-deferred-work-catchup/handback.md).** **docs/changes/2026-10-04-session-5-i… | docs/changes/2026-10-04-session-5-interactivity/drags.mjs | Claude Code |
|  DW-163  | **Catch-up 2026-10-11, review of Wave 2 (docs/changes/2026-10-11-deferred-work-catchup/handback.md).** **Session 5 §07's *the route, in ord… | session-5/index.html:7449, :7522 | Claude Code |
|  DW-164  | **Catch-up 2026-10-11, review of Wave 2 (docs/changes/2026-10-11-deferred-work-catchup/handback.md).** **Session 5 §07: for the second cann… | session-5/index.html:7512, :7527 | Claude Code |
|  DW-165  | **Catch-up 2026-10-11, review fixes (docs/changes/2026-10-11-deferred-work-catchup/handback.md).** **scripts/inject-case.mjs has the same ma… | scripts/inject-case.mjs:385 | Claude Code |
|  DW-166  | **Catch-up 2026-10-11, left by the reviews (docs/changes/2026-10-11-deferred-work-catchup/handback.md).** **verify-case.mjs's case-layout ch… | scripts/verify-case.mjs caseLayoutRules() | Claude Code |
|  DW-170  | **Catch-up 2026-10-11, left by the reviews (docs/changes/2026-10-11-deferred-work-catchup/handback.md).** **verify-browser.mjs check 14b (SV… | scripts/verify-browser.mjs check 14b; session-5/index.html | Claude Code |


## 6. Edits after 2026-10-04

`git log --since=2026-10-04` on all files: every commit is the 2026-10-11 deferred-work catch-up (PR #45, `5d755f4` to `da7b003`) plus the instructor's two commits adding `PEDAGOGY.md` and the semester feedback file. `session-5/index.html` changed in one commit, `1248efc` (18 lines: six "last updated" stamps and live-page defects DW-131 to DW-161's Wave 2 set); the other lessons changed by 2 to 43 lines. No session was rebuilt. A.3(1) is not triggered.

| File | Lines changed `ac94b6b..da7b003` |
|---|---|
| index.html | 2 |
| session-0.1/index.html | 7 |
| session-1/index.html | 13 |
| session-2/index.html | 43 |
| session-3/index.html | 2 |
| session-4/index.html | 2 |
| session-5/index.html | 18 |

## 7. Findings that contradict the plan header or the runbook's assumptions

1. **The local `main` ref lagged `origin/main`.** The branch was first cut at `ac94b6b` and re-based onto `da7b003` before any report was written (D-017). Nothing from the wrong tree survives in this report.
2. **`verify-case.mjs` has a layout check the runbook does not know about** (20 `.case-*` rules across 7 files). Phase 7's case pages must either carry the 20 rules or be named out of the check (A.0.3 item 6).
3. **The runbook's marker form `[UNVERIFIED: needs source]` is undeclared** under EDITORIAL A16 and `build-unsourced.mjs` now hard-fails undeclared forms in the hub and lessons (A.0.3 item 2).
4. **The LMS name is already in the repository outside served pages**: `PEDAGOGY.md` (Jared's file, 2026-10-11), `audit/GRANULAR FEEDBACK SEMESTER 1 10.11.26 all written updates`, `instructor-notes/session-3-before-monday.md`, `session-3.md`, `session-3-teaching-aid.md`, `session-3-canvas-posts.md`, and now `docs/next-term/RUNBOOK.md` (saved verbatim as A.1.1 instructs). MAINTAINING's statement that the name "appears nowhere in the repository" has been untrue since the catch-up merge. The served pages (hub and lessons) are clean. This run keeps them clean and does not rewrite the instructor's files; Phase 11 flags the stale sentence.
5. **Phase 9's anchors hold**: `session-2` `#s12` carries the eyebrow "09 · Assignment", `data-nav="Final project"` and `var CHK=[` at line 2834; the `session-3` Part 1 reminder card ("One email, body See attached") is at line 1848; `session-4` `#sCR` "The Handoff Test"; `session-5` `sE1` is "six minutes, five beats".
6. **The hub's session-0.1 card reads "Primer · runs before Session 1"**, a Tier B stem the purge list retires ("before Session N"); Phase 8 relabels it "Start here: setup".
7. **`session-2` has no Shift+U by instruction (DW-116)**; `validate_dom.js` and V8 are red there by design when the skill runs.
8. **Tier A/B stems that survive in served pages are all in the kept classes** (widget "Submit", the §11 rubric widget, "Due diligence", Google's free-tier terms "what you submit"); listed in §1.3 for Phase 9's reference.
9. **The `claude` CLI is available** in this container and reports the answering model in its result JSON, so RECAPTURE can be run here (D-009); the runbook assumed it might not be.
10. **Primary government and regulator hosts are unreachable** (A.0.4); R7 governs every seed fact and CASE v5 parameter that depends on them.

## A. Volatile-fact census, full table


| file | section | line | match | context |
|---|---|---|---|---|
| session-0.1/index.html |  | 1074 | Gemini | ab" for="lmKey" style="margin-top:16px">Gemini API key &mdash; free, from <span  |
| session-0.1/index.html | s2 | 1240 | Fable |  <tr><td><b>Fable 5</b></td><td class="n">1M</td><td |
| session-0.1/index.html | s2 | 1241 | Opus |  <tr><td><b>Opus 5</b></td><td class="n">1M</td><td> |
| session-0.1/index.html | s2 | 1242 | Sonnet |  <tr><td><b>Sonnet 5</b></td><td class="n">1M</td><t |
| session-0.1/index.html | s2 | 1243 | Haiku |  <tr><td><b>Haiku 4.5</b></td><td class="n">200K</td |
| session-0.1/index.html | s2 | 1246 | Opus | ended thinking not being disableable on Opus 5 <span class="conf h" data-src="sr |
| session-0.1/index.html | s2 | 1251 | Fable | itched models in your conversation with Fable 5</em>. Its URL and title are conf |
| session-0.1/index.html | s3 | 1282 | Haiku | igh, max. Present on every model except Haiku 4.5. xhigh requires Opus 4.7 or ne |
| session-0.1/index.html | s3 | 1282 | Opus |  model except Haiku 4.5. xhigh requires Opus 4.7 or newer. On the API and in Cla |
| session-0.1/index.html | s3 | 1282 | Opus | d in Claude Code it defaults to high on Opus 5 and Sonnet 5. Enterprise admins c |
| session-0.1/index.html | s3 | 1282 | Sonnet |  Code it defaults to high on Opus 5 and Sonnet 5. Enterprise admins can remove l |
| session-0.1/index.html | s3 | 1283 | Opus | at it cannot be turned off in Claude on Opus 5, and it is adaptive and always on |
| session-0.1/index.html | s3 | 1283 | Fable | 5, and it is adaptive and always on for Fable 5. <span class="conf h" data-src=" |
| session-0.1/index.html | s3 | 1298 | Opus | he selector, xhigh on 4.7 or newer, the Opus 5 lock, admin role gating, and next |
| session-0.1/index.html | s3 | 1298 | Fable | t">H</span>. <b>Models overview</b> for Fable 5 adaptive thinking and the window |
| session-0.1/index.html | s3 | 1304 | Opus |  along</b>Move the dial, then switch to Opus 5 and try to turn thinking off. Rea |
| session-0.1/index.html | s4 | 1374 | Fable | mbers here and they are sourced: 1M for Fable 5, Opus 5 and Sonnet 5, 200K for H |
| session-0.1/index.html | s4 | 1374 | Opus | e and they are sourced: 1M for Fable 5, Opus 5 and Sonnet 5, 200K for Haiku 4.5  |
| session-0.1/index.html | s4 | 1374 | Sonnet | are sourced: 1M for Fable 5, Opus 5 and Sonnet 5, 200K for Haiku 4.5 <span class |
| session-0.1/index.html | s4 | 1374 | Haiku |  Fable 5, Opus 5 and Sonnet 5, 200K for Haiku 4.5 <span class="conf h" data-src= |
| session-0.1/index.html | s4 | 1386 | Haiku |  and the constraint is the content. Try Haiku 4.5, then try turning thinking off |
| session-0.1/index.html | s4 | 1386 | Opus | u 4.5, then try turning thinking off on Opus 5, then turn code execution off and |
| session-0.1/index.html | s5 | 1424 | Enterprise plan |  it matters for an RIA specifically: on Enterprise plans with customer-managed k |
| session-0.1/index.html | s8 | 1539 | Sonnet |  <tr><td class="n">1</td><td>Sonnet 5, medium, search off</td><td cla |
| session-0.1/index.html | s8 | 1540 | Sonnet |  <tr><td class="n">2</td><td>Sonnet 5, medium, search on</td><td clas |
| session-0.1/index.html | s8 | 1541 | Opus |  <tr><td class="n">3</td><td>Opus 5, high, search on</td><td class="n |
| session-0.1/index.html | s8 | 1551 | Sonnet | k &middot; captured 2026-08-22 &middot; Sonnet 5 / medium / web search OFF</span |
| session-0.1/index.html | s8 | 1557 | Sonnet | k &middot; captured 2026-08-22 &middot; Sonnet 5 / medium / web search ON</span> |
| session-0.1/index.html | s10 | 1684 | Team plan |  On an Enterprise or Team plan, <b>incognito chats are includ |
| session-0.1/index.html | s10 | 1700 | Team plan | er, and this build does not know it. <b>Team plans have no organisation-level co |
| session-0.1/index.html | s11 | 1756 | Team plan | o be mis-sorted: an incognito chat on a Team plan, a paused memory, and a delete |
| session-0.1/index.html | s11 | 1779 | Fable | itched models in your conversation with Fable 5</em>. support.claude.com article |
| session-0.1/index.html | s11 | 1780 | MCP | s, and the comparison with projects and MCP. <span class="conf h" data-src="src- |
| session-0.1/index.html | s11 | 2025 | Fable | {kind:'composer',label:'Model',val:'Fable 5, Opus 5, Sonnet 5, Haiku 4.5', |
| session-0.1/index.html | s11 | 2025 | Opus | :'composer',label:'Model',val:'Fable 5, Opus 5, Sonnet 5, Haiku 4.5', |
| session-0.1/index.html | s11 | 2025 | Sonnet | er',label:'Model',val:'Fable 5, Opus 5, Sonnet 5, Haiku 4.5', |
| session-0.1/index.html | s11 | 2025 | Haiku | 'Model',val:'Fable 5, Opus 5, Sonnet 5, Haiku 4.5', |
| session-0.1/index.html | s11 | 2028 | Haiku |  con:'No effort selector on Haiku 4.5. xhigh requires Opus 4.7 or ne |
| session-0.1/index.html | s11 | 2028 | Opus | t selector on Haiku 4.5. xhigh requires Opus 4.7 or newer. Defaults to high on O |
| session-0.1/index.html | s11 | 2028 | Opus |  Opus 4.7 or newer. Defaults to high on Opus 5 and Sonnet 5 on the API and in Cl |
| session-0.1/index.html | s11 | 2028 | Sonnet | r newer. Defaults to high on Opus 5 and Sonnet 5 on the API and in Claude Code.' |
| session-0.1/index.html | s11 | 2030 | Opus |  con:'Cannot be turned off in Claude on Opus 5. Always on, adaptive, on Fable 5. |
| session-0.1/index.html | s11 | 2030 | Fable | aude on Opus 5. Always on, adaptive, on Fable 5.',src:'src-effort',conf:'H',asOf |
| session-0.1/index.html | s11 | 2061 | Team plan | have an org-wide toggle, on by default. Team plans have none.', |
| session-0.1/index.html | s11 | 2071 | Fable | {kind:'window',label:'Fable 5, Opus 5, Sonnet 5',val:'1M conte |
| session-0.1/index.html | s11 | 2071 | Opus | {kind:'window',label:'Fable 5, Opus 5, Sonnet 5',val:'1M context window |
| session-0.1/index.html | s11 | 2071 | Sonnet | {kind:'window',label:'Fable 5, Opus 5, Sonnet 5',val:'1M context window',con:'' |
| session-0.1/index.html | s11 | 2072 | Haiku | {kind:'window',label:'Haiku 4.5',val:'200K context window',con |
| session-0.1/index.html | s11 | 2116 | Sonnet |  settings:"Sonnet 5 / effort medium / web search OF |
| session-0.1/index.html | s11 | 2120 | Sonnet |  settings:"Sonnet 5 / effort medium / thinking off  |
| session-0.1/index.html | s11 | 2124 | Opus |  settings:"Opus 5 / effort high / thinking on (forc |
| session-0.1/index.html | s11 | 2132 | Sonnet | me prompt with web search ON",settings:"Sonnet 5 / effort medium / web search ON |
| session-0.1/index.html | s11 | 2232 | Fable | var TLABEL=['Fable 5','Opus 5','Sonnet 5','Haiku 4.5' |
| session-0.1/index.html | s11 | 2232 | Opus | var TLABEL=['Fable 5','Opus 5','Sonnet 5','Haiku 4.5']; |
| session-0.1/index.html | s11 | 2232 | Sonnet | var TLABEL=['Fable 5','Opus 5','Sonnet 5','Haiku 4.5']; |
| session-0.1/index.html | s11 | 2232 | Haiku |  TLABEL=['Fable 5','Opus 5','Sonnet 5','Haiku 4.5']; |
| session-0.1/index.html | s11 | 2236 | Fable |  f:['No. Fable 5 carries the effort selector, so  |
| session-0.1/index.html | s11 | 2237 | Opus |  'No. Opus 5 carries the effort selector and e |
| session-0.1/index.html | s11 | 2238 | Sonnet |  'No. Sonnet 5 carries the full five-step effo |
| session-0.1/index.html | s11 | 2239 | Haiku |  'Correct, and for the sourced reason: Haiku 4.5 is the one model with no effor |
| session-0.1/index.html | s11 | 2242 | Fable |  f:['No. Fable 5 has the 1M window you need, but  |
| session-0.1/index.html | s11 | 2243 | Opus |  'No. Opus 5 has the 1M window, but extended t |
| session-0.1/index.html | s11 | 2244 | Sonnet | . Of the three models with a 1M window, Sonnet 5 is the only one where extended  |
| session-0.1/index.html | s11 | 2244 | Fable | nking is genuinely yours to switch off. Fable 5 is adaptive and always on; Opus  |
| session-0.1/index.html | s11 | 2244 | Opus | off. Fable 5 is adaptive and always on; Opus 5 cannot be disabled in Claude.', |
| session-0.1/index.html | s11 | 2245 | Haiku |  'No, and this is the window trap. Haiku 4.5 tops out at 200K. A 700,000-to |
| session-0.1/index.html | s11 | 2248 | Fable |  f:['Correct. Fable 5 is the model whose extended thin |
| session-0.1/index.html | s11 | 2249 | Opus |  'No. Opus 5 always thinks, which is close, bu |
| session-0.1/index.html | s11 | 2250 | Sonnet |  'No. Sonnet 5 will do whatever you last set i |
| session-0.1/index.html | s11 | 2251 | Haiku |  'No. Haiku 4.5 has no effort selector, so the |
| session-0.1/index.html | s11 | 2254 | Fable |  f:['No. Fable 5 always thinks, but adaptively: t |
| session-0.1/index.html | s11 | 2255 | Opus |  'Correct. Opus 5 is the combination you specified: |
| session-0.1/index.html | s11 | 2256 | Sonnet |  'No. Sonnet 5 gives you the explicit effort s |
| session-0.1/index.html | s11 | 2257 | Haiku |  'No. Haiku 4.5 has no effort selector, so the |
| session-0.1/index.html | s11 | 2261 | Opus |  'Wrong, and this is the designed item. Opus 5 will think longer and more carefu |
| session-0.1/index.html | s11 | 2288 | Fable |  {k:'Fable5', n:'Fable 5', effort:true, thi |
| session-0.1/index.html | s11 | 2288 | Fable |  {k:'Fable5', n:'Fable 5', effort:true, think:'locked-on |
| session-0.1/index.html | s11 | 2288 | Fable | , effort:true, think:'locked-on', why:'Fable 5 adaptive thinking is always on.' |
| session-0.1/index.html | s11 | 2289 | Opus |  {k:'Opus5', n:'Opus 5', effort:true, thi |
| session-0.1/index.html | s11 | 2289 | Opus |  {k:'Opus5', n:'Opus 5', effort:true, think:'locked-on |
| session-0.1/index.html | s11 | 2289 | Opus | nking cannot be turned off in Claude on Opus 5.'}, |
| session-0.1/index.html | s11 | 2290 | Sonnet |  {k:'Sonnet5', n:'Sonnet 5',effort:true, thi |
| session-0.1/index.html | s11 | 2290 | Sonnet |  {k:'Sonnet5', n:'Sonnet 5',effort:true, think:'free',  |
| session-0.1/index.html | s11 | 2291 | Haiku |  {k:'Haiku45', n:'Haiku 4.5',effort:false,thi |
| session-0.1/index.html | s11 | 2291 | Haiku |  {k:'Haiku45', n:'Haiku 4.5',effort:false,think:'free',  |
| session-0.1/index.html | s11 | 2291 | Haiku | 5',effort:false,think:'free', why:'Haiku 4.5 does not carry an effort selec |
| session-0.1/index.html | s11 | 2351 | Haiku |  head='Haiku 4.5, no effort axis at all'; |
| session-0.1/index.html | s11 | 2355 | Opus |  is that on the API and in Claude Code, Opus 5 and Sonnet 5 default to <b>high</ |
| session-0.1/index.html | s11 | 2355 | Sonnet |  the API and in Claude Code, Opus 5 and Sonnet 5 default to <b>high</b>, not to  |
| session-0.1/index.html | s11 | 2358 | Opus | fault on the API and in Claude Code for Opus 5 and Sonnet 5. If you have never t |
| session-0.1/index.html | s11 | 2358 | Sonnet | e API and in Claude Code for Opus 5 and Sonnet 5. If you have never touched this |
| session-0.1/index.html | s11 | 2361 | Opus | inding. What is sourced: xhigh requires Opus 4.7 or newer, and an Enterprise adm |
| session-0.1/index.html | s11 | 2387 | Fable | var CTXWIN={Fable5:{n:'1M',mult:1},Opus5:{n:'1M',mul |
| session-0.1/index.html | s11 | 2387 | Opus | var CTXWIN={Fable5:{n:'1M',mult:1},Opus5:{n:'1M',mult:1},Sonnet5:{n:'1M',mu |
| session-0.1/index.html | s11 | 2387 | Sonnet | 5:{n:'1M',mult:1},Opus5:{n:'1M',mult:1},Sonnet5:{n:'1M',mult:1},Haiku45:{n:'200K |
| session-0.1/index.html | s11 | 2387 | Haiku | {n:'1M',mult:1},Sonnet5:{n:'1M',mult:1},Haiku45:{n:'200K',mult:5}}; |
| session-0.1/index.html | s11 | 2390 | Fable | 'model', name:'Model', vals:[['Fable5','Fable 5'],['Opus5','Opus 5'],[' |
| session-0.1/index.html | s11 | 2390 | Fable |  name:'Model', vals:[['Fable5','Fable 5'],['Opus5','Opus 5'],['Sonnet5', |
| session-0.1/index.html | s11 | 2390 | Opus | l', vals:[['Fable5','Fable 5'],['Opus5','Opus 5'],['Sonnet5','Sonnet 5'], |
| session-0.1/index.html | s11 | 2390 | Opus |  vals:[['Fable5','Fable 5'],['Opus5','Opus 5'],['Sonnet5','Sonnet 5'],['Haiku4 |
| session-0.1/index.html | s11 | 2390 | Sonnet | Fable5','Fable 5'],['Opus5','Opus 5'],['Sonnet5','Sonnet 5'],['Haiku45','Haiku 4 |
| session-0.1/index.html | s11 | 2390 | Sonnet | able 5'],['Opus5','Opus 5'],['Sonnet5','Sonnet 5'],['Haiku45','Haiku 4.5']]}, |
| session-0.1/index.html | s11 | 2390 | Haiku | us5','Opus 5'],['Sonnet5','Sonnet 5'],['Haiku45','Haiku 4.5']]}, |
| session-0.1/index.html | s11 | 2390 | Haiku |  5'],['Sonnet5','Sonnet 5'],['Haiku45','Haiku 4.5']]}, |
| session-0.1/index.html | s11 | 2405 | Haiku | ow, never a token count (spec PA-5). On Haiku 4.5 the same content is a |
| session-0.1/index.html | s11 | 2446 | Fable | del',when:function(s){return s.model==='Fable5'},wire:'sys',slot:'signals', |
| session-0.1/index.html | s11 | 2448 | Fable |  t:'Fable 5: thinking is adaptive and always |
| session-0.1/index.html | s11 | 2449 | Opus | del',when:function(s){return s.model==='Opus5'},wire:'sys',slot:'signals', |
| session-0.1/index.html | s11 | 2451 | Opus |  t:'Opus 5: a thinking block is present and  |
| session-0.1/index.html | s11 | 2451 | Opus | . Its absence would mean you are not on Opus 5.'}, |
| session-0.1/index.html | s11 | 2452 | Sonnet | del',when:function(s){return s.model==='Sonnet5'},wire:'sys',slot:'signals', |
| session-0.1/index.html | s11 | 2454 | Sonnet |  t:'Sonnet 5: thinking is genuinely yours to |
| session-0.1/index.html | s11 | 2455 | Haiku | del',when:function(s){return s.model==='Haiku45'},wire:'hist',slot:'body', |
| session-0.1/index.html | s11 | 2457 | Haiku |  t:'Haiku 4.5 holds 200K rather than 1M, so  |
| session-0.1/index.html | s11 | 2458 | Haiku | (s){return s.effort==='low'&&s.model!=='Haiku45'},wire:'sys',slot:'signals', |
| session-0.1/index.html | s11 | 2460 | Haiku | s){return s.effort==='high'&&s.model!=='Haiku45'},wire:'sys',slot:'signals', |
| session-0.1/index.html | s11 | 2461 | Opus | fault on the API and in Claude Code for Opus 5 and Sonnet 5.'}, |
| session-0.1/index.html | s11 | 2461 | Sonnet | e API and in Claude Code for Opus 5 and Sonnet 5.'}, |
| session-0.1/index.html | s11 | 2462 | Haiku | ){return s.effort==='xhigh'&&s.model!=='Haiku45'},wire:'sys',slot:'body', |
| session-0.1/index.html | s11 | 2464 | Opus |  t:'Effort xhigh: requires Opus 4.7 or newer, and an Enterprise adm |
| session-0.1/index.html | s11 | 2465 | Haiku | (s){return s.effort==='max'&&s.model!=='Haiku45'},wire:'sys',slot:'body', |
| session-0.1/index.html | s11 | 2505 | Sonnet | var CTXDEFAULT={model:'Sonnet5',effort:'medium',thinking:'off', |
| session-0.1/index.html | s11 | 2526 | Haiku |  if(ctl==='effort'&&S.model==='Haiku45') |
| session-0.1/index.html | s11 | 2527 | Haiku |  return 'Haiku 4.5 does not carry an effort selec |
| session-0.1/index.html | s11 | 2528 | Opus | l==='thinking'&&val==='off'&&S.model==='Opus5') |
| session-0.1/index.html | s11 | 2529 | Opus | nking cannot be turned off in Claude on Opus 5.'; |
| session-0.1/index.html | s11 | 2530 | Fable | l==='thinking'&&val==='off'&&S.model==='Fable5') |
| session-0.1/index.html | s11 | 2531 | Fable |  return 'Fable 5 adaptive thinking is always on.' |
| session-0.1/index.html | s11 | 2542 | Opus |  if(S.model==='Opus5'\|\|S.model==='Fable5')S.thinking='o |
| session-0.1/index.html | s11 | 2542 | Fable |  if(S.model==='Opus5'\|\|S.model==='Fable5')S.thinking='on'; |
| session-0.1/index.html | s11 | 2544 | Haiku |  if(S.model==='Haiku45')S.effort='n/a'; |
| session-0.1/index.html | s11 | 2561 | Haiku | ar greyAll=(c.id==='effort'&&S.model==='Haiku45'); |
| session-0.1/index.html | s11 | 2605 | Haiku |  '<div class="fx">This is the Haiku 4.5 lesson. Nothing about your con |
| session-0.1/index.html | s11 | 2768 | Team plan |  {t:'An incognito chat, on a Team plan',b:0,lm:1, |
| session-0.1/index.html | s11 | 2769 | Team plan | put this in "dies". On an Enterprise or Team plan, incognito chats are included  |
| session-0.1/index.html | s11 | 2905 | Fable | odel: ................................ (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5) |
| session-0.1/index.html | s11 | 2905 | Opus | ............................ (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5)'}, |
| session-0.1/index.html | s11 | 2905 | Sonnet | ................... (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5)'}, |
| session-0.1/index.html | s11 | 2905 | Haiku | ........ (Fable 5 / Opus 5 / Sonnet 5 / Haiku 4.5)'}, |
| session-0.1/index.html | s11 | 2972 | Opus | {s:'No thinking block on what should be Opus 5', |
| session-0.1/index.html | s11 | 2973 | Opus | nking cannot be turned off in Claude on Opus 5, so a missing thinking block mean |
| session-0.1/index.html | s11 | 2973 | Opus | ing thinking block means you are not on Opus 5. Either the selector moved, an En |
| session-0.1/index.html | s11 | 3022 | Team plan | annot enforce is not a control. On a <b>Team plan there are no organisation-leve |
| session-1/index.html |  | 1361 | Gemini | ab" for="lmKey" style="margin-top:16px">Gemini API key &mdash; free, from <span  |
| session-1/index.html | s4 | 1616 | GPT-2 |  <thead><tr><th>Quantity</th><th>GPT-2</th><th>GPT-3 / ChatGPT</th></tr>< |
| session-1/index.html | s4 | 1616 | GPT-3 | ><tr><th>Quantity</th><th>GPT-2</th><th>GPT-3 / ChatGPT</th></tr></thead> |
| session-1/index.html | s5 | 1636 | GPT-2. | nd these are the actual numbers used by GPT-2.)" &middot; Inside ChatGPT: "about |
| session-1/index.html | s5 | 1653 | Opus | ase</th><th>Approx. tokens</th><th>Into Opus 5</th></tr></thead> |
| session-1/index.html | s6 | 1692 | GPT-2 | <p class="dim" style="font-size:14.5px">GPT-2 uses vectors of length 768; GPT-3  |
| session-1/index.html | s6 | 1692 | GPT-3 | .5px">GPT-2 uses vectors of length 768; GPT-3 uses 12,288. What you clicked is t |
| session-1/index.html | s8 | 1783 | Gemini |  and again near 2. Gemini's temperature and the lab's are t |
| session-1/index.html | s9 | 1840 | DeepSeek | 04664, &sect;1 and &sect;1.2. Model was DeepSeek-V3, accessed 11 May 2025. Assig |
| session-1/index.html | s10 | 1850 | Artificial Analysis |  <span class="plab">Artificial Analysis Intelligence Index a |
| session-1/index.html | s10 | 1866 | Haiku |  <tr><td>Haiku 4.5</td><td class="n">$1</td><td c |
| session-1/index.html | s10 | 1867 | Sonnet |  <tr><td>Sonnet 5</td><td class="n">$2</td><td cl |
| session-1/index.html | s10 | 1868 | Opus |  <tr><td>Opus 5</td><td class="n">$5</td><td clas |
| session-1/index.html | s10 | 1869 | Fable |  <tr><td>Fable 5</td><td class="n">$10</td><td cl |
| session-1/index.html | s10 | 1875 | Artificial Analysis |  <span class="src"><b>Artificial Analysis</b>, 17 and 24 July  |
| session-1/index.html | s10 | 1875 | Opus |  h" data-src="src-aa">H</span> &middot; Opus 5 and GPT-5.6 Terra omitted: cost p |
| session-1/index.html | s10 | 1875 | GPT-5.6 | c="src-aa">H</span> &middot; Opus 5 and GPT-5.6 Terra omitted: cost per index ta |
| session-1/index.html | s11 | 1906 | Haiku | on class="btn sel mini act" data-dp="0">Haiku 4.5</button> |
| session-1/index.html | s11 | 1907 | Sonnet | button class="btn sel mini" data-dp="1">Sonnet 5</button> |
| session-1/index.html | s11 | 1908 | Opus | button class="btn sel mini" data-dp="2">Opus 5</button> |
| session-1/index.html | s11 | 1909 | Fable | button class="btn sel mini" data-dp="3">Fable 5</button> |
| session-1/index.html | s11 | 1917 | Opus |  <p>At the defaults, metered Opus costs less than half of five Pro su |
| session-1/index.html | s11 | 1919 | Opus | rk along</b>Find a volume where metered Opus 5 exceeds the same number of Pro su |
| session-1/index.html | s14 | 1980 | 24-09 | e technology-neutral. Regulatory Notice 24-09 creates no new obligations &mdash; |
| session-1/index.html | s14 | 2002 | 24-09 |  class="src"><b>FINRA Regulatory Notice 24-09</b>, 27 June 2024, first-party. <s |
| session-1/index.html | s14c | 2057 | 24-09 | rgued both sides</span>Nothing in FINRA 24-09 requires disclosure of AI use to a |
| session-1/index.html | s15 | 2191 | Artificial Analysis |  <li id="src-aa">Artificial Analysis. <em>Artificial Anal |
| session-1/index.html | s15 | 2191 | Artificial Analysis | li id="src-aa">Artificial Analysis. <em>Artificial Analysis Intelligence Index a |
| session-1/index.html | s15 | 2191 | Artificial Analysis | e Index and cost-per-task figures</em>. Artificial Analysis. <a href="https://ar |
| session-1/index.html | s15 | 2192 | 24-09 |  (2024, June 27). <em>Regulatory Notice 24-09</em>. FINRA. <a href="https://www. |
| session-1/index.html | s15 | 2192 | 24-09 | ://www.finra.org/rules-guidance/notices/24-09">finra.org/rules-guidance/notices/ |
| session-1/index.html | s15 | 2192 | 24-09 | 24-09">finra.org/rules-guidance/notices/24-09</a> Used for: the position that ex |
| session-1/index.html | s15 | 2197 | GPT-2 | the temperature passage, tokens and the GPT-2 token values, embeddings and vecto |
| session-1/index.html | s15 | 2683 | GPT-3 |  {q:'Weights in the ChatGPT (GPT-3) neural net',min:6,max:13,ans:175e |
| session-1/index.html | s15 | 2685 | GPT-3 |  {q:'Length of one embedding vector in GPT-3',min:2,max:5,ans:12288, |
| session-1/index.html | s15 | 2686 | GPT-2. | 2,288 numbers per token, against 768 in GPT-2. That list is the entire represent |
| session-1/index.html | s15 | 2707 | Haiku | var TIERS=[['Haiku 4.5',1],['Sonnet 5',2],['Opus 5',5 |
| session-1/index.html | s15 | 2707 | Sonnet | var TIERS=[['Haiku 4.5',1],['Sonnet 5',2],['Opus 5',5],['Fable 5',10] |
| session-1/index.html | s15 | 2707 | Opus | TIERS=[['Haiku 4.5',1],['Sonnet 5',2],['Opus 5',5],['Fable 5',10]]; |
| session-1/index.html | s15 | 2707 | Fable | u 4.5',1],['Sonnet 5',2],['Opus 5',5],['Fable 5',10]]; |
| session-1/index.html | s15 | 2740 | GPT-3 | ed)">two dimensions, hand-placed \u2014 GPT-3 uses 12,288</text>'; |
| session-1/index.html | s15 | 2900 | DeepSeek | ured dates are the paper's runs against DeepSeek-V3. With a key connected |
| session-1/index.html | s15 | 2945 | GPT-5.6 |  {n:'GPT-5.6 Luna (max)',c:.21,i:51,f:1},{n:' |
| session-1/index.html | s15 | 2946 | Grok |  {n:'Grok 4.5 (high)',c:.31,i:54,f:1},{n:'GLM |
| session-1/index.html | s15 | 2947 | Kimi |  {n:'Kimi K3',c:.94,i:57,f:1},{n:'GPT-5.6 Sol |
| session-1/index.html | s15 | 2947 | GPT-5.6 |  {n:'Kimi K3',c:.94,i:57,f:1},{n:'GPT-5.6 Sol (max)',c:1.04,i:59,f:1}, |
| session-1/index.html | s15 | 2948 | Opus |  {n:'Claude Opus 4.8 (max)',c:1.80,i:56,f:0,a:1},{n: |
| session-1/index.html | s15 | 2948 | Fable |  (max)',c:1.80,i:56,f:0,a:1},{n:'Claude Fable 5 (max)',c:2.75,i:60,f:1,a:1}]; |
| session-1/index.html | s15 | 2975 | Fable |  ' Against Fable 5: '+gap+' point'+(gap===1?'':'s') |
| session-1/index.html | s15 | 2989 | Haiku | var PATHS=[{n:'Haiku 4.5',i:1,o:5,k:'api'},{n:'Sonnet 5 |
| session-1/index.html | s15 | 2989 | Sonnet | HS=[{n:'Haiku 4.5',i:1,o:5,k:'api'},{n:'Sonnet 5',i:2,o:10,k:'api'}, |
| session-1/index.html | s15 | 2990 | Opus |  {n:'Opus 5',i:5,o:25,k:'api'},{n:'Fable 5',i |
| session-1/index.html | s15 | 2990 | Fable |  {n:'Opus 5',i:5,o:25,k:'api'},{n:'Fable 5',i:10,o:50,k:'api'}, |
| session-1/index.html | s15 | 3001 | Opus | ?' <b style="color:var(--warn)">Metered Opus 5 now exceeds the subscription \u20 |
| session-1/index.html | s15 | 3019 | Haiku | var TLABEL=['Haiku-class','Sonnet-class','Opus / Fabl |
| session-1/index.html | s15 | 3019 | Sonnet | var TLABEL=['Haiku-class','Sonnet-class','Opus / Fable-class']; |
| session-1/index.html | s15 | 3019 | Opus | r TLABEL=['Haiku-class','Sonnet-class','Opus / Fable-class']; |
| session-1/index.html | s15 | 3019 | Fable | L=['Haiku-class','Sonnet-class','Opus / Fable-class']; |
| session-1/index.html | s15 | 3119 | Haiku | var DPT=[['Haiku 4.5',1,5],['Sonnet 5',2,10],['Opus |
| session-1/index.html | s15 | 3119 | Sonnet | var DPT=[['Haiku 4.5',1,5],['Sonnet 5',2,10],['Opus 5',5,25],['Fable  |
| session-1/index.html | s15 | 3119 | Opus | =[['Haiku 4.5',1,5],['Sonnet 5',2,10],['Opus 5',5,25],['Fable 5',10,50]]; |
| session-1/index.html | s15 | 3119 | Fable | ,5],['Sonnet 5',2,10],['Opus 5',5,25],['Fable 5',10,50]]; |
| session-2/index.html | s5 | 1481 | Artificial Analysis |  <p>Artificial Analysis publishes an Intelli |
| session-2/index.html | s5 | 1514 | Artificial Analysis |  <div class="csrc">Source: Artificial Analysis Intelligence Index v |
| session-2/index.html | s5 | 1514 | Opus | es. Index scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonne |
| session-2/index.html | s5 | 1514 | Fable | x scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5 <spa |
| session-2/index.html | s5 | 1514 | Opus | er-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5 <span class="conf  |
| session-2/index.html | s5 | 1514 | Sonnet |  for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5 <span class="conf h" data-src=" |
| session-2/index.html | s5 | 1514 | Artificial Analysis | ra and Luna per-task costs derived from Artificial Analysis's stated ~50% and ~8 |
| session-2/index.html | s5 | 1519 | Sonnet | 02;/&#8202;5</span><h4>Token price gap, Sonnet 5 against Fable 5</h4><p>Sonnet 5 |
| session-2/index.html | s5 | 1519 | Fable | n><h4>Token price gap, Sonnet 5 against Fable 5</h4><p>Sonnet 5 lists at $2 in / |
| session-2/index.html | s5 | 1519 | Sonnet | ce gap, Sonnet 5 against Fable 5</h4><p>Sonnet 5 lists at $2 in / $10 out per mi |
| session-2/index.html | s5 | 1519 | Fable |  at $2 in / $10 out per million tokens. Fable 5 and Fable 5.1 list at $10 / $50. |
| session-2/index.html | s5 | 1519 | Fable | $10 out per million tokens. Fable 5 and Fable 5.1 list at $10 / $50. One fifth t |
| session-2/index.html | s5 | 1521 | Opus | </span><span class="stat">26%</span><h4>Opus 5's cost advantage over Fable 5</h4 |
| session-2/index.html | s5 | 1521 | Fable | </span><h4>Opus 5's cost advantage over Fable 5</h4><p>At a higher index score.  |
| session-2/index.html | s5 | 1526 | Sonnet |  sheet misdescribes what they cost you. Sonnet 5 moves from second-cheapest to s |
| session-2/index.html | s10 | 1779 | GPT-4 |  questions, 58&ndash;88% hallucination; GPT-4 58%, GPT-3.5 69%, Llama 2 88% <spa |
| session-2/index.html | s10 | 1779 | GPT-3.5 |  58&ndash;88% hallucination; GPT-4 58%, GPT-3.5 69%, Llama 2 88% <span class="co |
| session-2/index.html | s10 | 1779 | Llama |  hallucination; GPT-4 58%, GPT-3.5 69%, Llama 2 88% <span class="conf h" data-sr |
| session-2/index.html | s12 | 2001 | Artificial Analysis |  <li id="src-aa">Artificial Analysis. <em>Artificial Anal |
| session-2/index.html | s12 | 2001 | Artificial Analysis | li id="src-aa">Artificial Analysis. <em>Artificial Analysis Intelligence Index a |
| session-2/index.html | s12 | 2001 | Artificial Analysis | e Index and cost-per-task figures</em>. Artificial Analysis. <a href="https://ar |
| session-2/index.html | s12 | 2001 | Opus | or: index scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonne |
| session-2/index.html | s12 | 2001 | Fable | x scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5; how |
| session-2/index.html | s12 | 2001 | Opus | er-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5; how the cost per  |
| session-2/index.html | s12 | 2001 | Sonnet |  for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5; how the cost per index task is |
| session-2/index.html | s12 | 2004 | Gemini | d="src-google-ptcf">Google. (2024). <em>Gemini for Workspace: Prompting guide 10 |
| session-2/index.html | s12 | 2302 | Opus |  {n:'Claude Opus 5', idx:61, task:2.03, i:5, o: |
| session-2/index.html | s12 | 2303 | Fable |  {n:'Claude Fable 5', idx:60, task:2.75, i:10, o: |
| session-2/index.html | s12 | 2304 | GPT-5.6 |  {n:'GPT-5.6 Sol', idx:59, task:1.04, i: |
| session-2/index.html | s12 | 2305 | Opus |  {n:'Claude Opus 4.8', idx:56, task:1.80, i:5, o: |
| session-2/index.html | s12 | 2306 | Sonnet |  {n:'Claude Sonnet 5', idx:55, task:2.29, i:2, o: |
| session-2/index.html | s12 | 2307 | GPT-5.6 |  {n:'GPT-5.6 Terra', idx:55, task:0.52, i: |
| session-2/index.html | s12 | 2308 | GPT-5.6 |  {n:'GPT-5.6 Luna', idx:51, task:0.21, i: |
| session-2/index.html | s12 | 2324 | GPT-5.6 |  var front=['GPT-5.6 Luna','GPT-5.6 Terra','GPT-5.6 S |
| session-2/index.html | s12 | 2324 | GPT-5.6 |  var front=['GPT-5.6 Luna','GPT-5.6 Terra','GPT-5.6 Sol','Claude Opu |
| session-2/index.html | s12 | 2324 | GPT-5.6 |  front=['GPT-5.6 Luna','GPT-5.6 Terra','GPT-5.6 Sol','Claude Opus 5']; |
| session-2/index.html | s12 | 2324 | Opus | ','GPT-5.6 Terra','GPT-5.6 Sol','Claude Opus 5']; |
| session-2/index.html | s12 | 2337 | Sonnet |  var dx=m.n==='Claude Sonnet 5'?10:(m.n==='Claude Opus 4.8'?-1 |
| session-2/index.html | s12 | 2337 | Opus | n==='Claude Sonnet 5'?10:(m.n==='Claude Opus 4.8'?-10:0); |
| session-2/index.html | s12 | 2338 | Sonnet |  var anchor=m.n==='Claude Sonnet 5'?'start':(m.n==='Claude Opus 4. |
| session-2/index.html | s12 | 2338 | Opus | Claude Sonnet 5'?'start':(m.n==='Claude Opus 4.8'?'end':'middle'); |
| session-2/index.html | s12 | 2376 | Sonnet |  var ROUTINE=byName('Claude Sonnet 5'),FRONT=byName('Claude Opus 5') |
| session-2/index.html | s12 | 2376 | Opus | 'Claude Sonnet 5'),FRONT=byName('Claude Opus 5'); |
| session-2/index.html | s12 | 2377 | Fable |  var TOP={n:'Claude Fable 5.1',i:10,o:50}; /* pricing page,  |
| session-2/index.html | s12 | 2643 | Llama |  var a=[['Llama 2',88],['GPT-3.5',69],['GPT-4',58] |
| session-2/index.html | s12 | 2643 | GPT-3.5 |  var a=[['Llama 2',88],['GPT-3.5',69],['GPT-4',58]]; |
| session-2/index.html | s12 | 2643 | GPT-4 |  var a=[['Llama 2',88],['GPT-3.5',69],['GPT-4',58]]; |
| session-2/index.html | s12 | 2865 | Sonnet | ut price is five times the input price: Sonnet 5 is $2 in and $10 out per millio |
| session-2/index.html | s12 | 2865 | Opus | s $2 in and $10 out per million tokens, Opus 5 is $5 and $25, Fable 5 is $10 and |
| session-2/index.html | s12 | 2865 | Fable | r million tokens, Opus 5 is $5 and $25, Fable 5 is $10 and $50. A token is a pie |
| session-3/index.html | s2 | 1241 | GPT-2 | words of text: 768 numbers per word for GPT-2, 12,288 for GPT-3.</li> |
| session-3/index.html | s2 | 1241 | GPT-3. |  numbers per word for GPT-2, 12,288 for GPT-3.</li> |
| session-3/index.html | s6 | 1380 | GPT-4 | Westlaw AI-Assisted Research about 33%, GPT-4 43%, tested May 2024 <span class=" |
| session-3/index.html | sPol | 1722 | Regulation S-P | irm becomes aware of an incident, under Regulation S-P as amended in 2024 <span  |
| session-3/index.html | sPol | 1725 | Regulation S-P |  text, and no rule text is quoted here. Regulation S-P, 2024 amendments: the wri |
| session-3/index.html | s16 | 1903 | Regulation S-P | es and Exchange Commission. (2024). <em>Regulation S-P: Privacy of consumer fina |
| session-3/index.html | s16 | 2503 | GPT-4 |  {l:'GPT-4, no documents',v:43,c:'#9A4B22'}, |
| session-4/index.html |  | 3739 | Gemini | ab" for="lmKey" style="margin-top:16px">Gemini API key, free, from <span class=" |
| session-4/index.html | apx | 3843 | Regulation S-P | ect;02</span><b>The Thirty-Day Clock: A Regulation S-P Tabletop</b></a> |
| session-4/index.html | s1 | 3939 | 24-09 | s="src">FINRA (2024), Regulatory Notice 24-09 <span class="conf h" data-src="src |
| session-4/index.html | s2 | 3949 | Regulation S-P |  client is, or that she is your client? Regulation S-P calls that nonpublic pers |
| session-4/index.html | s2 | 3985 | Regulation S-P |  headcount, an age plus a family shape. Regulation S-P covers what identifies he |
| session-4/index.html | s2 | 3990 | Regulation S-P |  <p class="src">SEC, Regulation S-P, 17 CFR &sect;&nbsp;248.3 |
| session-4/index.html | sRSP | 3997 | Regulation S-P | ><b>D5 &middot; The Thirty-Day Clock: A Regulation S-P Tabletop</b><span>14 min  |
| session-4/index.html | sRSP | 3999 | Regulation S-P |  <h2>The Thirty-Day Clock: A Regulation S-P Tabletop</h2> |
| session-4/index.html | sRSP | 4001 | Regulation S-P |  <p class="big">Regulation S-P gives a firm 30 days to t |
| session-4/index.html | sRSP | 4092 | Regulation S-P |  <p class="src">SEC (2024), Regulation S-P amendments: the incident  |
| session-4/index.html | s3 | 4194 | Gemini |  m" data-src="src-ms-copilot">M</span>, Gemini&rsquo;s Keep Activity <span class |
| session-4/index.html | s3 | 4195 | Gemini | a-src="src-ms-copilot-edp">M</span> and Gemini in Google Workspace <span class=" |
| session-4/index.html | s3 | 4196 | Gemini |  delete it, 18 months, or 72 hours once Gemini&rsquo;s switch is off. The calend |
| session-4/index.html | s3 | 4200 | Gemini | ="src-ms-copilot-edp">M</span>. Google, Gemini Apps Privacy Hub <span class="con |
| session-4/index.html | s3 | 4200 | DeepSeek | pan>. The leaks: Wiz Research (2025) on DeepSeek <span class="conf m" data-src=" |
| session-4/index.html | s4 | 4247 | Regulation S-P |  <li><b>Regulation S-P, 2024 amendments.</b> You |
| session-4/index.html | s4 | 4249 | Regulation S-P | ur firm&rsquo;s service provider, which Regulation S-P makes your firm oversee a |
| session-4/index.html | s4 | 4252 | Regulation S-P |  <p class="src">SEC (2024), Regulation S-P amendments: service provi |
| session-4/index.html | s5 | 4330 | examination priorities | c-gtig-ai">M</span>. SEC (2025), FY2026 examination priorities &sect;VII, on AI  |
| session-4/index.html | sW1 | 4336 | watermark | x" id="sW1" data-nav="D1 &middot; How a watermark works" data-insert-after="s5"  |
| session-4/index.html | sW1 | 4399 | SynthID | button" aria-pressed="true">Pixel mark (SynthID)</button> |
| session-4/index.html | sW1 | 4426 | SynthID | rc="src-claude-marks">H</span>. Google, SynthID Text: a detector answers waterma |
| session-4/index.html | sW1 | 4426 | watermarked | oogle, SynthID Text: a detector answers watermarked, not watermarked or uncertai |
| session-4/index.html | sW1 | 4426 | watermarked | xt: a detector answers watermarked, not watermarked or uncertain, against two th |
| session-4/index.html | sW1 | 4426 | SynthID | ynthid-text">M</span>. Google DeepMind, SynthID: a change to the pixels of an im |
| session-4/index.html | sW1 | 4428 | watermark |  the knockout with Key A, Key B and the watermark off.</div></div> |
| session-4/index.html | sW2 | 4432 | watermark | " id="sW2" data-nav="D2 &middot; What a watermark proves" data-insert-after="s5" |
| session-4/index.html | sW2 | 4437 | watermark | s">H</span>. One published kind of text watermark hides in which words the AI pi |
| session-4/index.html | sW2 | 4471 | watermark | acts leave less room.</b> Google's text watermark works less well on factual ans |
| session-4/index.html | sW2 | 4475 | SynthID | rc="src-claude-marks">H</span>. Google, SynthID Text: weaker on factual response |
| session-4/index.html | sWS | 4550 | Artificial Analysis | conf h" data-src="src-effort">H</span>. Artificial Analysis, tokens and turns pe |
| session-4/index.html | s9 | 4842 | 24-09 | pan>. Clause 1: FINRA Regulatory Notice 24-09 <span class="conf h" data-src="src |
| session-4/index.html | s9 | 4842 | Regulation S-P | ra2409">H</span>. Clauses 2 and 4: SEC, Regulation S-P amendments (2024) <span c |
| session-4/index.html | s9 | 4868 | Regulation S-P | abletop</td><td>The Thirty-Day Clock: A Regulation S-P Tabletop</td><td class="n |
| session-4/index.html | s9 | 4900 | Sonnet | ic. (2025, February 24). <em>Claude 3.7 Sonnet and Claude Code</em>. Anthropic.  |
| session-4/index.html | s9 | 4903 | Artificial Analysis |  <li id="src-aa">Artificial Analysis. <em>Artificial Anal |
| session-4/index.html | s9 | 4903 | Artificial Analysis | li id="src-aa">Artificial Analysis. <em>Artificial Analysis Intelligence Index a |
| session-4/index.html | s9 | 4903 | Artificial Analysis | e Index and cost-per-task figures</em>. Artificial Analysis. <a href="https://ar |
| session-4/index.html | s9 | 4912 | Gemini | eroa, M. (2025, July). <em>Phishing for Gemini</em>. Mozilla 0Din. <a href="http |
| session-4/index.html | s9 | 4913 | 24-09 |  (2024, June 27). <em>Regulatory Notice 24-09</em>. FINRA. <a href="https://www. |
| session-4/index.html | s9 | 4913 | 24-09 | ://www.finra.org/rules-guidance/notices/24-09">finra.org/rules-guidance/notices/ |
| session-4/index.html | s9 | 4913 | 24-09 | 24-09">finra.org/rules-guidance/notices/24-09</a> Used for: FINRA's position tha |
| session-4/index.html | s9 | 4919 | SynthID | thid-text">Google. (2025, April 9). <em>SynthID: Tools for watermarking and dete |
| session-4/index.html | s9 | 4919 | watermarking | (2025, April 9). <em>SynthID: Tools for watermarking and detecting LLM-generated |
| session-4/index.html | s9 | 4919 | watermarks | a> Retrieved 2026, August 25. Used for: watermarks working less well on factual  |
| session-4/index.html | s9 | 4920 | Gemini | <li id="src-gemini-privacy">Google. <em>Gemini Apps Privacy Hub</em>. Gemini App |
| session-4/index.html | s9 | 4920 | Gemini | ogle. <em>Gemini Apps Privacy Hub</em>. Gemini Apps Help, answer 13594961. <a hr |
| session-4/index.html | s9 | 4920 | Gemini | om/gemini/answer/13594961</a> Used for: Gemini's Keep Activity default, the 18-m |
| session-4/index.html | s9 | 4922 | Gemini | i id="src-gemini-api-terms">Google. <em>Gemini API Additional Terms of Service</ |
| session-4/index.html | s9 | 4924 | SynthID | i id="src-synthid">Google DeepMind. <em>SynthID</em>. Google DeepMind. Used for: |
| session-4/index.html | s9 | 4924 | watermark | epMind. Used for: the pixel-level image watermark that survives a screenshot (Ap |
| session-4/index.html | s9 | 4946 | Regulation S-P | es and Exchange Commission. (2024). <em>Regulation S-P: Privacy of consumer fina |
| session-4/index.html | s9 | 4952 | examination priorities | II</em>. SEC. Used for: the fiscal 2026 examination priorities naming AI and Reg |
| session-4/index.html | s9 | 4952 | Regulation S-P | 26 examination priorities naming AI and Regulation S-P (§01); its line on traini |
| session-4/index.html | s9 | 4953 | DeepSeek |  29). <em>Wiz Research uncovers exposed DeepSeek database leaking sensitive info |
| session-4/index.html | s9 | 4953 | DeepSeek | database-leak">wiz.io</a> Used for: the DeepSeek database left open with over a  |
| session-4/index.html | s9 | 5963 | Regulation S-P |  {t:'Regulation S-P: protect client informati |
| session-4/index.html | s9 | 5965 | Reg S-P |  s:'1 Reg S-P',h:'client data',c:'Reg S-P'}, |
| session-4/index.html | s9 | 5965 | Reg S-P |  s:'1 Reg S-P',h:'client data',c:'Reg S-P'}, |
| session-4/index.html | s9 | 5978 | 24-09 |  {t:'FINRA Regulatory Notice 24-09, on generative AI',k:'guide', |
| session-4/index.html | s9 | 5980 | 24-09 |  s:'6 FINRA 24-09',h:'no new rule',c:'24-09'}, |
| session-4/index.html | s9 | 5980 | 24-09 |  s:'6 FINRA 24-09',h:'no new rule',c:'24-09'}, |
| session-4/index.html | s9 | 5981 | exam priorities |  {t:'The SEC’s fiscal 2026 exam priorities, which name AI',k:'guide |
| session-4/index.html | s9 | 6808 | Regulation S-P | /* ================= D5 · Regulation S-P tabletop: drop the clock  |
| session-4/index.html | s9 | 7373 | Regulation S-P |  h+='<span class="rfl">Regulation S-P’s 30 days did not govern  |
| session-4/index.html | s9 | 7689 | Gemini |  Copilot, Gemini) names the plans, the switch and  |
| session-4/index.html | s9 | 7725 | Gemini |  {k:'Gemini',chip:'<span class="conf m" data- |
| session-4/index.html | s9 | 7726 | Gemini |  A:['Gemini app, personal','the Gemini app wi |
| session-4/index.html | s9 | 7726 | Gemini |  A:['Gemini app, personal','the Gemini app with a personal Google accoun |
| session-4/index.html | s9 | 7726 | Gemini | pp with a personal Google account'],B:['Gemini in Workspace','Gemini in Google W |
| session-4/index.html | s9 | 7726 | Gemini | gle account'],B:['Gemini in Workspace','Gemini in Google Workspace'],C:['The Gem |
| session-4/index.html | s9 | 7726 | Gemini | ','Gemini in Google Workspace'],C:['The Gemini API','The Gemini API'], |
| session-4/index.html | s9 | 7726 | Gemini | le Workspace'],C:['The Gemini API','The Gemini API'], |
| session-4/index.html | s9 | 7738 | DeepSeek |  ev:'DeepSeek, January 2025: a database left  |
| session-4/index.html | s9 | 8052 | Regulation S-P | than your firm’s service provider under Regulation S-P.', |
| session-4/index.html | s9 | 8076 | Regulation S-P | ocessing Addendum, against the 72 hours Regulation S-P makes your firm require.' |
| session-4/index.html | s9 | 8583 | Regulation S-P | iser and must oversee its vendors under Regulation S-P. Before we use your tool  |
| session-4/index.html | s9 | 8616 | Regulation S-P | ises 48 hours, which beats the 72 hours Regulation S-P makes your firm require o |
| session-4/index.html | s9 | 8620 | Regulation S-P | he firm, never you. Your own duty under Regulation S-P is to oversee the vendor  |
| session-4/index.html | s9 | 8621 | Regulation S-P | e adviser; the adviser’s own duty under Regulation S-P is to oversee the vendor. |
| session-4/index.html | s9 | 8686 | Regulation S-P |  against the rule: 48 hours in the DPA; Regulation S-P makes the firm require 72 |
| session-4/index.html | s9 | 8742 | Gemini | white, zero-size text in one email made Gemini’s summary follow it <span class=" |
| session-4/index.html | s9 | 9268 | exam priorities |  'The SEC’s FY2026 exam priorities name AI and polymorphic  |
| session-4/index.html | s9 | 9325 | watermark | /* ================= D1 · how a text watermark works ================= |
| session-4/index.html | s9 | 9602 | SynthID |  eye cannot see, the way Google&rsquo;s SynthID marks an image <span class="conf |
| session-4/index.html | s9 | 10884 | 24-09 | -finra2026">H</span>. Regulatory Notice 24-09: the existing supervision rule, FI |
| session-4/index.html | s9 | 11704 | 24-09 | o it in full} ({FINRA Regulatory Notice 24-09}).',g:1,st:'Duty + authority',n:'' |
| session-4/index.html | s9 | 11708 | Regulation S-P | PI} is the client financial information Regulation S-P protects, including the f |
| session-4/index.html | s9 | 11710 | 24-09 |  {l:'FINRA 24-09, SEC FY2026 priorities, Regulation |
| session-4/index.html | s9 | 11710 | Regulation S-P | {l:'FINRA 24-09, SEC FY2026 priorities, Regulation S-P, one study.',t:'{FINRA Re |
| session-4/index.html | s9 | 11710 | 24-09 | one study.',t:'{FINRA Regulatory Notice 24-09}; the {SEC Division of Examination |
| session-4/index.html | s9 | 11710 | Regulation S-P |  Examinations fiscal 2026 priorities}; {Regulation S-P}; and the Stanford study  |
| session-4/index.html | s9 | 11714 | Regulation S-P | s to {[named role]} {within [N] hours}: Regulation S-P’s {30-day notice clock} r |
| session-5/index.html | s1 | 2948 | Sonnet | "A: the model the package named, Claude Sonnet 4.5"><b>A</b><span class="n">The  |
| session-5/index.html | s1 | 2948 | Sonnet | ge named</span><i class="s1-tag">Claude Sonnet 4.5</i></button> |
| session-5/index.html | s1 | 2949 | Sonnet | bel="B: the current replacement, Claude Sonnet 5.5"><b>B</b><span class="n">The  |
| session-5/index.html | s1 | 2949 | Sonnet | lacement</span><i class="s1-tag">Claude Sonnet 5.5</i></button> |
| session-5/index.html | s1 | 2985 | Sonnet | false"><b>A</b><span>Run only on Claude Sonnet 4.5, the model it was written on< |
| session-5/index.html | s1 | 3020 | GPT-4o | de-settings">H</span>. OpenAI, Retiring GPT-4o and other ChatGPT models, as repo |
| session-5/index.html | s6 | 3427 | Regulation S-P | rc="src-anthropic-terms">H</span>. SEC, Regulation S-P, applied to vendors as se |
| session-5/index.html | s8 | 3689 | Gemini | d="src-google-ptcf">Google. (2024). <em>Gemini for Workspace: Prompting guide 10 |
| session-5/index.html | s8 | 3700 | GPT-4o | ">OpenAI. (2026, January). <em>Retiring GPT-4o and other ChatGPT models</em>. Op |
| session-5/index.html | s8 | 3700 | GPT-4 | a> Used for: the ChatGPT retirements of GPT-4 and GPT-4o, one line beside Anthro |
| session-5/index.html | s8 | 3700 | GPT-4o | r: the ChatGPT retirements of GPT-4 and GPT-4o, one line beside Anthropic's cale |
| session-5/index.html | s8 | 3704 | Regulation S-P | es and Exchange Commission. (2024). <em>Regulation S-P: Privacy of consumer fina |
| session-5/index.html | s8 | 4495 | Sonnet |  to December 2027: eight retirements, Sonnet 4.5's notice period, and every cu |
| session-5/index.html | s8 | 4496 | Sonnet | hree pins: the model the package named (Sonnet 4.5), |
| session-5/index.html | s8 | 4497 | Sonnet |  its replacement (Sonnet 5.5), or whatever the app picks.  |
| session-5/index.html | s8 | 4512 | Sonnet |  {l:'Claude 2, 2.1, Sonnet 3',end:dayOf('2025-07-21')}, |
| session-5/index.html | s8 | 4513 | Sonnet |  {l:'Sonnet 3.5',end:dayOf('2025-10-28')}, |
| session-5/index.html | s8 | 4514 | Opus |  {l:'Opus 3',end:dayOf('2026-01-05')}, |
| session-5/index.html | s8 | 4515 | Sonnet |  {l:'Sonnet 3.7, Haiku 3.5',end:dayOf('2026-0 |
| session-5/index.html | s8 | 4515 | Haiku |  {l:'Sonnet 3.7, Haiku 3.5',end:dayOf('2026-02-19')}, |
| session-5/index.html | s8 | 4516 | Haiku |  {l:'Haiku 3',end:dayOf('2026-04-20')}, |
| session-5/index.html | s8 | 4517 | Sonnet |  {l:'Sonnet 4, Opus 4',end:dayOf('2026-06-15' |
| session-5/index.html | s8 | 4517 | Opus |  {l:'Sonnet 4, Opus 4',end:dayOf('2026-06-15')}, |
| session-5/index.html | s8 | 4518 | Opus |  {l:'Opus 4.1',end:dayOf('2026-08-05')}, |
| session-5/index.html | s8 | 4519 | Sonnet |  {l:'Sonnet 4.5',dep:DEP,end:RET,hot:true}, |
| session-5/index.html | s8 | 4520 | Haiku |  {l:'Haiku 4.5',open:dayOf('2026-10-15'),line |
| session-5/index.html | s8 | 4521 | Opus |  {l:'Opus 4.5',open:dayOf('2026-11-24'),legac |
| session-5/index.html | s8 | 4522 | Opus |  {l:'Opus 4.6',open:dayOf('2027-02-05'),legac |
| session-5/index.html | s8 | 4523 | Sonnet |  {l:'Sonnet 4.6',open:dayOf('2027-02-17'),leg |
| session-5/index.html | s8 | 4524 | Opus |  {l:'Opus 4.7',open:dayOf('2027-04-16'),legac |
| session-5/index.html | s8 | 4525 | Opus |  {l:'Opus 4.8',open:dayOf('2027-05-28'),legac |
| session-5/index.html | s8 | 4526 | Fable |  {l:'Fable 5',open:dayOf('2027-06-09'),legacy |
| session-5/index.html | s8 | 4527 | Sonnet |  {l:'Sonnet 5',open:dayOf('2027-06-30'),legac |
| session-5/index.html | s8 | 4528 | Opus |  {l:'Opus 5',open:dayOf('2027-07-24'),legacy: |
| session-5/index.html | s8 | 4529 | Fable |  {l:'Fable 5.1',open:dayOf('2027-09-01'),line |
| session-5/index.html | s8 | 4530 | Opus |  {l:'Opus 5.5',open:dayOf('2027-09-22'),lineu |
| session-5/index.html | s8 | 4531 | Sonnet |  {l:'Sonnet 5.5',open:NST,lineup:true}, |
| session-5/index.html | s8 | 4542 | Sonnet | each bar ending on its retirement date; Sonnet 4.5 deprecated on 30 September 20 |
| session-5/index.html | s8 | 4542 | Haiku | nning to its not-sooner-than date, from Haiku 4.5 on 15 October 2026 to Sonnet 5 |
| session-5/index.html | s8 | 4542 | Sonnet | e, from Haiku 4.5 on 15 October 2026 to Sonnet 5.5 on 28 September 2027. A dashe |
| session-5/index.html | s8 | 4589 | Sonnet | s:'RUNS',t:'<b>Running.</b> On this day Sonnet 4.5 was active. Its deprecation w |
| session-5/index.html | s8 | 4590 | Sonnet | ===1?'':'s')+' away: the replacement is Sonnet 5.5 '+CHIP+'. Test the package on |
| session-5/index.html | s8 | 4631 | Sonnet | o Anthropic pages, H), 1 December 2026 (Sonnet 4.5 retired, H), the next Sonnet |
| session-5/index.html | s8 | 4631 | Sonnet |  2026 (Sonnet 4.5 retired, H), the next Sonnet |
| session-5/index.html | s8 | 4638 | Sonnet |  pin:{kind:'gate',s:'A',t:'only Sonnet 4.5',line:'model gate: run only o |
| session-5/index.html | s8 | 4638 | Sonnet | 5',line:'model gate: run only on claude Sonnet 4.5 (pinned to one model)'}, |
| session-5/index.html | s8 | 4645 | Sonnet | ub:'4 Oct 2026',real:true, models:[{n:'Sonnet 4.5',st:'dep'},{n:'Sonnet 5.5',st |
| session-5/index.html | s8 | 4645 | Sonnet |  models:[{n:'Sonnet 4.5',st:'dep'},{n:'Sonnet 5.5',st:'act'}],newest:'Sonnet 5. |
| session-5/index.html | s8 | 4645 | Sonnet | ep'},{n:'Sonnet 5.5',st:'act'}],newest:'Sonnet 5.5 and Sonnet 5'}, |
| session-5/index.html | s8 | 4645 | Sonnet |  5.5',st:'act'}],newest:'Sonnet 5.5 and Sonnet 5'}, |
| session-5/index.html | s8 | 4646 | Sonnet | r the retirement',real:true,models:[{n:'Sonnet 4.5',st:'ret'},{n:'Sonnet 5.5',st |
| session-5/index.html | s8 | 4646 | Sonnet | e,models:[{n:'Sonnet 4.5',st:'ret'},{n:'Sonnet 5.5',st:'act'}],newest:'Sonnet 5. |
| session-5/index.html | s8 | 4646 | Sonnet | et'},{n:'Sonnet 5.5',st:'act'}],newest:'Sonnet 5.5 and Sonnet 5'}, |
| session-5/index.html | s8 | 4646 | Sonnet |  5.5',st:'act'}],newest:'Sonnet 5.5 and Sonnet 5'}, |
| session-5/index.html | s8 | 4647 | Sonnet |  {lab:'Next Sonnet',sub:'ships · constructed',real:f |
| session-5/index.html | s8 | 4647 | Sonnet | s · constructed',real:false,models:[{n:'Sonnet 4.5',st:'ret'},{n:'Sonnet 5.5',st |
| session-5/index.html | s8 | 4647 | Sonnet | e,models:[{n:'Sonnet 4.5',st:'ret'},{n:'Sonnet 5.5',st:'act'},{n:'the next Sonne |
| session-5/index.html | s8 | 4647 | Sonnet | ,{n:'Sonnet 5.5',st:'act'},{n:'the next Sonnet',st:'act'}],newest:'the next Sonn |
| session-5/index.html | s8 | 4647 | Sonnet | ext Sonnet',st:'act'}],newest:'the next Sonnet and Sonnet 5.5'}, |
| session-5/index.html | s8 | 4647 | Sonnet | ,st:'act'}],newest:'the next Sonnet and Sonnet 5.5'}, |
| session-5/index.html | s8 | 4648 | Sonnet | s · constructed',real:false,models:[{n:'Sonnet 4.5',st:'ret'},{n:'Sonnet 5.5',st |
| session-5/index.html | s8 | 4648 | Sonnet | e,models:[{n:'Sonnet 4.5',st:'ret'},{n:'Sonnet 5.5',st:'leg'},{n:'the next Sonne |
| session-5/index.html | s8 | 4648 | Sonnet | ,{n:'Sonnet 5.5',st:'leg'},{n:'the next Sonnet',st:'act'},{n:'the one after',st: |
| session-5/index.html | s8 | 4648 | Sonnet | t'}],newest:'the one after and the next Sonnet'} |
| session-5/index.html | s8 | 4658 | Sonnet |  o.model='Sonnet 4.5'; |
| session-5/index.html | s8 | 4659 | Sonnet | o.run='runs';o.gateStamp='RUNS';o.gate='Sonnet 4.5 is deprecated, with '+(RET-TO |
| session-5/index.html | s8 | 4660 | Sonnet | ail';o.gateStamp='FAILS';o.gate=(i===1?'Sonnet 4.5 retired on 30 November 2026.  |
| session-5/index.html | s8 | 4662 | Sonnet |  if(i===0){o.run='stop';o.model='Sonnet 4.5';o.gateStamp='STOPPED';o.gate |
| session-5/index.html | s8 | 4662 | Sonnet | amp='STOPPED';o.gate='The session is on Sonnet 4.5, the package’s model. The two |
| session-5/index.html | s8 | 4662 | Sonnet |  stops and says so. You move the pin to Sonnet 5.5: one change, once, before any |
| session-5/index.html | s8 | 4663 | Sonnet |  else if(i===1){o.run='runs';o.model='Sonnet 5.5';o.gateStamp='RUNS';o.gate='S |
| session-5/index.html | s8 | 4663 | Sonnet | 'Sonnet 5.5';o.gateStamp='RUNS';o.gate='Sonnet 5.5 is one of the two newest '+H1 |
| session-5/index.html | s8 | 4663 | Sonnet | ewest '+H1+'. The gate lets it through; Sonnet 4.5’s retirement passed without t |
| session-5/index.html | s8 | 4664 | Sonnet |  else if(i===2){o.run='runs';o.model='Sonnet 5.5';o.gateStamp='RUNS';o.gate='A |
| session-5/index.html | s8 | 4664 | Sonnet | .gate='A new generation is on the list. Sonnet 5.5 is still one of the two newes |
| session-5/index.html | s8 | 4665 | Sonnet |  else{o.run='stop';o.model='the next Sonnet';o.gateStamp='STOPPED';o.gate='So |
| session-5/index.html | s8 | 4665 | Sonnet | t Sonnet';o.gateStamp='STOPPED';o.gate='Sonnet 5.5 has dropped out of the two ne |
| session-5/index.html | s8 | 4665 | Sonnet |  newest. The gate stops, names the next Sonnet, and you re-approve it after a te |
| session-5/index.html | s8 | 4667 | Sonnet |  var cm=['Sonnet 5.5','Sonnet 5.5','the next Sonne |
| session-5/index.html | s8 | 4667 | Sonnet |  var cm=['Sonnet 5.5','Sonnet 5.5','the next Sonnet','the one a |
| session-5/index.html | s8 | 4667 | Sonnet | cm=['Sonnet 5.5','Sonnet 5.5','the next Sonnet','the one after'][i]; |
| session-5/index.html | s8 | 4689 | Sonnet | var LISTN=['Sonnet 4.5','Sonnet 5.5','the next Sonne |
| session-5/index.html | s8 | 4689 | Sonnet | var LISTN=['Sonnet 4.5','Sonnet 5.5','the next Sonnet','the one a |
| session-5/index.html | s8 | 4689 | Sonnet | TN=['Sonnet 4.5','Sonnet 5.5','the next Sonnet','the one after']; |
| session-5/index.html | s8 | 4761 | Sonnet |  var lab='The vendor’s list, up to four Sonnet generations with their lifecycle  |
| session-5/index.html | s8 | 6866 | GPT-4 | and colleagues (2023), 758 consultants, GPT-4: inside the model’s frontier 12.2% |
| session-5/index.html | s8 | 6867 | GPT-4 | ltants, about 7% of the firm'],['Tool','GPT-4, with or without a short prompting |
| session-5/index.html | s8 | 6873 | Sonnet | inly Cursor Pro with Claude 3.5 and 3.7 Sonnet, in early 2025; a coin flip per t |
| instructor-notes/session-2.md | Flow | 38 | Fable |  at 6:35, where the chart is on screen: Fable is exactly twice Opus per token, n |
| instructor-notes/session-2.md | Flow | 38 | Opus | rt is on screen: Fable is exactly twice Opus per token, not "six times" (item 9, |
| instructor-notes/session-2.md | Flow | 38 | Artificial Analysis |  (item 9, H); the Intelligence Index is Artificial Analysis's, and the "83 to 81 |
| instructor-notes/session-2.md | Flow | 38 | LiveBench | ysis's, and the "83 to 81" figures were LiveBench's (item 11, M). |
| instructor-notes/session-2.md | Flow | 73 | Sonnet | r will your final-project workflow use? Sonnet 5 / Opus 5 / Fable 5 / another ve |
| instructor-notes/session-2.md | Flow | 73 | Opus |  final-project workflow use? Sonnet 5 / Opus 5 / Fable 5 / another vendor / unde |
| instructor-notes/session-2.md | Flow | 73 | Fable | oject workflow use? Sonnet 5 / Opus 5 / Fable 5 / another vendor / undecided." |
| instructor-notes/session-3-before-monday.md | Monday, 5:45 PM, in this order | 46 | Sonnet | ll-build prompt typed and **not sent**. Sonnet 5 is fine for it. |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 29 | Haiku | ut five times input, not about twice.** Haiku 4.5 $1 in / $5 out, |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 30 | Sonnet |  Sonnet 5 $2 / $10, Opus 5 $5 / $25, Fabl |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 30 | Opus |  Sonnet 5 $2 / $10, Opus 5 $5 / $25, Fable 5.1 $10 / $50 per |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 30 | Fable |  Sonnet 5 $2 / $10, Opus 5 $5 / $25, Fable 5.1 $10 / $50 per million tokens.  |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 42 | watermark | 3. **The watermark does not identify your account |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 43 | watermark | t. The narrow correction is that a text watermark, where one exists, |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 45 | watermarked |  watermarked at all is something I am con |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 58 | Fable | 9. **Fable is exactly twice the per-token pri |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 58 | Opus | is exactly twice the per-token price of Opus, not "over twice" or "six times".** |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 61 | Artificial Analysis |  conflated.** The Intelligence Index is Artificial Analysis's, not |
| instructor-notes/session-3-canvas-posts.md | Post 2 · Corrections from Sessions 1 and | 62 | LiveBench |  LiveBench's. Medium. |
| instructor-notes/session-3-polls.md | Poll 2 · about 7:20, inside the skill bu | 49 | GPT-4 | and GPT-4 about 43; the 33 percent Westlaw f |
| instructor-notes/session-3-teaching-aid.md | Session 3 teaching aid, Monday 2026-09-2 | 64 | watermark | Advisors; the watermark beyond one sentence; Canvas he |
| instructor-notes/session-3.md | Changed 2026-09-21, the afternoon of the | 36 | watermark |  the token multiple and the watermark sentence. |
| instructor-notes/session-3.md | Changed 2026-09-21, the afternoon of the | 70 | GPT-4 | Thomson Reuters about 19% hallucinated, GPT-4 about 43%; and on the incomplete-a |
| instructor-notes/session-3.md | The corrections slot, 6:08 | 200 | Haiku | ens cost five times input, not twice.** Haiku 1 and 5, Sonnet 2 and 10, Opus 5 a |
| instructor-notes/session-3.md | The corrections slot, 6:08 | 200 | Sonnet | imes input, not twice.** Haiku 1 and 5, Sonnet 2 and 10, Opus 5 and |
| instructor-notes/session-3.md | The corrections slot, 6:08 | 200 | Opus | wice.** Haiku 1 and 5, Sonnet 2 and 10, Opus 5 and |
| instructor-notes/session-3.md | The corrections slot, 6:08 | 201 | Fable |  25, Fable 10 and 50, per million. The cost-p |
| instructor-notes/session-3.md | The corrections slot, 6:08 | 213 | watermark | **Do not read Session 4's watermark appendix aloud to correct the  |
| instructor-notes/session-3.md | The corrections slot, 6:08 | 213 | watermark | appendix aloud to correct the Session 1 watermark claim.** Three |
| instructor-notes/session-3.md | The corrections slot, 6:08 | 214 | watermark | sources disagree: the room was told the watermark traces to an account; Session  |
| instructor-notes/session-3.md | The corrections slot, 6:08 | 215 | watermarked | output is not watermarked at all and marks itself unco |
| instructor-notes/session-3.md | The corrections slot, 6:08 | 216 | SynthID | two search passes finding SynthID applied since August. Until you  |
| instructor-notes/session-3.md | The corrections slot, 6:08 | 217 | watermark | , say only the narrow true thing: **the watermark does not identify an account.* |
| instructor-notes/session-3.md | s12 · §09, 7:52 | 427 | Regulation S-P | Regulation S-P; say that this is the ver |
| instructor-notes/session-3.md | sPol · §09b, 7:57 | 446 | Regulation S-P | run. Do not teach Regulation S-P here. |
| instructor-notes/session-4-polls.md | Poll 3 · 6:46 · §03, two questions in on | 28 | Gemini | laude / B · ChatGPT / C · Copilot / D · Gemini / E · None yet |
| instructor-notes/session-4-polls.md | Poll 6 · 7:56 · D5, the clock (new slot) | 47 | Regulation S-P | e was reached by someone outside. Under Regulation S-P, what is the latest lawfu |
| instructor-notes/session-4-rule-key.md | Page 1 · Run of show | 17 | watermark | 2. **6:03 CORRECTION.** Zoom. "The watermark does not identify your account |
| instructor-notes/session-4-rule-key.md | Page 1 · Run of show | 27 | Reg S-P |  fastener maker in Rockford.** "Reg S-P is the rule behind it." Copy the |
| instructor-notes/session-4-rule-key.md | Page 1 · Run of show | 66 | watermark | onight:** D5, D6 (Foundational); D1, D2 watermark depth; leaks 1, 3, 4 and 6; fi |
| instructor-notes/session-4-rule-key.md | Lane 2 · A duty you already have (items  | 79 | Regulation S-P | 1. **Regulation S-P**, SEC, 17 CFR Part 248.  |
| instructor-notes/session-4-rule-key.md | Lane 2 · A duty you already have (items  | 92 | 24-09 | inding rule, not guidance, and the rule 24-09 points at. |
| instructor-notes/session-4-rule-key.md | Lane 3 · Guidance or a proposal (items 6 | 105 | 24-09 | 6. **FINRA Regulatory Notice 24-09**, 27 Jun 2024 (H). Reminds member |
| instructor-notes/session-4-rule-key.md | Lane 3 · Guidance or a proposal (items 6 | 108 | exam priorities | 7. **SEC exam priorities, FY2026, §VII**, 17 Nov  |
| instructor-notes/session-4-rule-key.md | Lane 3 · Guidance or a proposal (items 6 | 109 | Reg S-P | miners test: AI claims, AI supervision, Reg S-P readiness, polymorphic malware.  |
| instructor-notes/session-4-teaching-aid.md | Page 1: the flow | 13 | watermark |  break." Correction from Session 1: the watermark |
| instructor-notes/session-4-teaching-aid.md | Page 1: the flow | 27 | Reg S-P | LECTURE 2.** The duty you already have. Reg S-P is a privacy rule from 2000; the |
| instructor-notes/session-4-teaching-aid.md | Page 1: the flow | 57 | Reg S-P |  Reg S-P. (Page 3, E3.) |
| instructor-notes/session-4-teaching-aid.md | Page 1: the flow | 73 | watermark | 22. **8:15 DEMO C, live:** the watermark and the Content Checker (page  |
| instructor-notes/session-4-teaching-aid.md | Page 1: the flow | 89 | Gemini | y, Live API box collapsed, a fresh free Gemini key in a |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 118 | Reg S-P |  third party under Reg S-P §248.10; no exception fits (§248 |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 145 | watermark | **C · 8:15 · 6 min · Live: the watermark and the Content Checker.** D1  |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 148 | watermark | A screenshot strips the label; the text watermark is |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 162 | Reg S-P |  new binds you and everything old does. Reg S-P (2000) is why the prompt is |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 167 | Reg S-P | dor becomes your service provider under Reg S-P and owes the firm 72 |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 176 | Gemini | r way; B: work account, not trained on. Gemini |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 178 | DeepSeek | review. The six leaks: 2 LOGS (DeepSeek) and 5 CONNECTORS (EchoLeak). T |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 188 | Reg S-P |  for the security chief. None was under Reg S-P's clock; the |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 204 | 24-09 | Three readings: FINRA Regulatory Notice 24-09 (June 2024); the generative AI |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 210 | Gemini | the Gemini app's own SynthID image check; an |
| instructor-notes/session-4-teaching-aid.md | Page 2 and 3: the live segments | 210 | SynthID | the Gemini app's own SynthID image check; any OpenAI dates; " |
| instructor-notes/session-4.md | What changed on 2026-09-28: the instruct | 24 | Gemini | op is printed, key masked; paste a free Gemini key, **Connect**, then |
| instructor-notes/session-4.md | What changed on 2026-09-28: the instruct | 70 | Gemini | d and is therefore not on the page: the Gemini app's own |
| instructor-notes/session-4.md | What changed on 2026-09-28: the instruct | 71 | SynthID | SynthID image check, the Gemini free tie |
| instructor-notes/session-4.md | What changed on 2026-09-28: the instruct | 71 | Gemini | SynthID image check, the Gemini free tier's exact request limits, |
| instructor-notes/session-4.md | What changed on 2026-09-27: the page now | 80 | Gemini | ve the plans: Claude, ChatGPT, Copilot, Gemini.** Plan A at each |
| instructor-notes/session-4.md | What changed on 2026-09-27: the page now | 84 | Gemini |  (Gemini). Off: 30 days, still until you d |
| instructor-notes/session-4.md | What changed on 2026-09-27: the page now | 89 | DeepSeek | res) and opening it names the incident: DeepSeek's open |
| instructor-notes/session-4.md | What changed on the page, 2026-09-25 | 142 | watermark | - **The watermark sentence was false and is corr |
| instructor-notes/session-4.md | What changed on the page, 2026-09-25 | 143 | watermarked |  Claude is watermarked. Anthropic's own help-centre |
| instructor-notes/session-4.md | The clock | 174 | watermark | dden-text demo after §05 (7:52) and the watermark |
| instructor-notes/session-4.md | The corrections slot, 6:03 | 192 | watermark | 1. **The watermark does not identify your account |
| instructor-notes/session-4.md | The corrections slot, 6:03 | 195 | watermark |  carries an invisible watermark, all models by 2 December 2026 |
| instructor-notes/session-4.md | The five polls. Build them in Zoom befor | 207 | Gemini | se today? \| Claude, ChatGPT, Copilot or Gemini, then: a personal plan; a plan my |
| instructor-notes/session-4.md | The three gated questions | 218 | Regulation S-P | insight; say "you found this last week, Regulation S-P is the |
| instructor-notes/session-4.md | s3 · §03, 6:46 | 319 | Gemini | training, not keeping. At **Gemini**, A: 18 rust squares and 18 dash |
| instructor-notes/session-4.md | s3 · §03, 6:46 | 323 | DeepSeek | the six leaks: open **2 · LOGS** (DeepSeek) and **5 · CONNECTORS** (EchoLe |
| instructor-notes/session-4.md | s4 · §04, 7:33 | 343 | Regulation S-P | mail: a subject line, one opener naming Regulation S-P, and Lock n: the question |
| instructor-notes/session-4.md | sRSP · D5, 7:56 (depth to Foundational) | 429 | Regulation S-P | y it: none of these companies was under Regulation S-P's |
| instructor-notes/session-4.md | Verify before teaching (moved from the p | 459 | Regulation S-P | - **Regulation S-P, 17 CFR § 248.3.** §02 sa |
| instructor-notes/session-4.md | Verify before teaching (moved from the p | 482 | exam priorities | - **The FY2026 exam priorities** name AI and Regulation |
| instructor-notes/session-4.md | Verify before teaching (moved from the p | 482 | Regulation S-P | he FY2026 exam priorities** name AI and Regulation S-P. The SEC's fiscal year en |
| instructor-notes/session-4.md | Verify before teaching (moved from the p | 493 | Gemini |  account; Gemini's "Keep Activity" on by default,  |
| instructor-notes/session-4.md | Verify before teaching (moved from the p | 496 | DeepSeek |  leaks** (§03, 2026-09-27), three at M: DeepSeek's open database (Wiz Research, |
| instructor-notes/session-4.md | Verify before teaching (moved from the p | 502 | Gemini | FLUX rewriting its own code through the Gemini API, experimental) is |
| instructor-notes/session-4.md | Verify before teaching (moved from the p | 531 | Gemini | - **The Gemini app's own SynthID image check** i |
| instructor-notes/session-4.md | Verify before teaching (moved from the p | 531 | SynthID | - **The Gemini app's own SynthID image check** is not on the page |
| instructor-notes/session-4.md | Verify before teaching (moved from the p | 533 | Gemini |  described a check inside the Gemini app for images made by its own mo |
| instructor-notes/session-4.md | Verify before teaching (moved from the p | 535 | Gemini | - **The Gemini free tier's request limits** are  |
| instructor-notes/session-4.md | What is not yet done | 564 | Gemini |  screenshot are not made; a free Gemini key for the box is not created (m |
| instructor-notes/session-5-teaching-aid.md | Page 2: around the flow | 106 | Sonnet | as a date, none of the five stops does; Sonnet 4.5 was deprecated two days after |
| instructor-notes/session-5.md | s1 · §01, 6:17 | 163 | Sonnet | STOPPED (the gate catches Sonnet 4.5 today and names 5.5), RUNS, R |
