# Repo updates plan — BUS ADM X433.4

**This file is the specification for Phases 2 through 7. Every later session
begins by re-reading it and executes from it.** Nothing about a later phase needs
to survive in a working context while an earlier one runs.

Written 2026-08-25 on branch `claude/repo-restructure-phase1`. Phase 0, a
narrowed Phase 1, and **Phase 2 are complete**. Sessions 1 through 4 have been
restructured; `session-0.1` is untouched, per D20.

> **READ §13 FIRST IF YOU ARE RESUMING.** Phase 2 executed with six deltas
> against this file, the largest of which is that **step (b) is deleted, not
> deferred** — the MOVE list is not a decision anybody still owes. §13 records
> what changed, what Phase 2 actually shipped, and every question left open. The
> sections above it are kept as written except where a delta contradicts them,
> and each such place says so.

Companion documents, in the order a fresh session should read them:
[`EDITORIAL.md`](../EDITORIAL.md) (the ratified rules and the decision register),
[`MAINTAINING.md`](../MAINTAINING.md) (the gate and the baseline discipline),
[`CASE.md`](../CASE.md) (the case, hash-guarded downstream),
[`docs/editorial-gap-report.md`](editorial-gap-report.md) (the measurement pass,
**partly defective — see the known-stale note in `EDITORIAL.md`**).

---

## 0. The phase-to-chat sequence

A session reading this file knows its own scope from this table and does not
re-derive it.

| Chat | Phase | Scope | Gate |
|---|---|---|---|
| **1** | **Phase 0 + narrowed Phase 1** | Premise audit; complexity measurement of sessions 1-4; this file | **done** |
| **2** | **Phase 2, structure** | sessions 1-4, one pass per file | **done.** Step (b) deleted, not deferred — §13.1 |
| **3** | **Phase 3, sources** | all six files | **done** — §15. 20 chips rewired, `SOURCES.md` at 57 records, both artifacts generated |
| 4 | Phase 4, instructor notes | all six files | after Phase 2, because notes are keyed to sections |
| 5-9 | **Phase 5, prose: REDUCE + analogues + citations + vocabulary marking** | one lesson per chat, parallelisable in worktrees | after Phase 3 (citations need the source keys) |
| 10 | Phase 6, vocabulary | all six files, **`session-0.1` first** | after Phase 3 (A19 joins the bibliography) |
| 11 | Phase 7, verify and record | repo-wide | last |

**Why the ordering is what it is.** Phase 3 precedes Phases 5 and 6 because A19
joins vocabulary read-more links to footer keys and D8 makes `SOURCES.md` the
source of those keys; generating either surface first means generating it twice.
Phase 4 follows Phase 2 because instructor notes are extracted per section, and a
section that has moved has to be found again. Phase 5 splits by lesson because
its three edits are lesson-local and nothing crosses a file boundary.

~~**Phase 2 is gated and the gate is not a formality.**~~ **SUPERSEDED 2026-08-25.
There is no gate, because there is no MOVE list.** Step (b) is deleted rather
than deferred: Phase 1 returned exactly one MOVE candidate, and the reason it
returned one was **R1** — the core of this course is overwhelmingly application,
and application does not move. The REDUCE work that step (b) would have shared a
pass with moves to **Phase 5**, because drawing a planning analogue *is* the
reduction mechanism for an application-adjacent section. §13.1 records this in
full. Nothing in Phase 2 waited on anything.

---

## 1. Phase 0 — the premise audit, and what it found

Three premises were carried into this task. All three were tested against disk.
**One was false as stated, one was true and understated, one was true.**

### 1.1 The core minute band (a) — the premise was false, and the correction is now D18

**Carried in:** *"the decision register fixes core at 67-70 minutes with the
appendix absorbing the balance to 150, called a hard constraint."*

**Found:** no such decision exists. `EDITORIAL.md`'s register runs D1 to D17 and
none of them is about minutes. `references/pedagogy.md` §s4, the ratified build
parameters, carries exactly one time constraint with the word *tolerance* on it,
and it is **150 allocated minutes, summed exactly, tolerance 0**. There is no core
band anywhere in it.

`67-70` is a **description of the measured state** that has been quoted often
enough to look like a rule. It appears in `CHANGELOG.md:423` (*"the core stays
near an hour (67/67/70/70)"*), in `EDITORIAL.md`'s D14 note, in report §5.5, and
hard-coded four times as `window.__coreMins`. The repository's own **statement of
intent**, in the 2026-08-18 entry that ratified the core/appendix architecture,
says something different: *"The core runs in roughly **60-67** minutes, so a
lesson can be taught in a one-hour slot"* (`CHANGELOG.md:464`). Commit `f5bf47b`
uses the same figure in the instructor's own words: *"the **60-minute core
split**"*.

**Resolution, ratified as D18: the band is 60-70.** The floor is 60 because the
repository chose 60 twice before this task existed. The ceiling is 70 because 70
is what sessions 3 and 4 already are. `150 / tolerance 0` is untouched and remains
the only hard time constraint.

**One thing the band decision has to say out loud.** At 70 minutes the one-hour
promise is **already exceeded by ten minutes in two of the four lessons**. 70 is
tolerated practice, not the target. A move that takes a core from 70 toward 60 is
an improvement against `CHANGELOG.md:464`, not a regression, and the SHOULD that
prefers REDUCE below 60 is a floor on cutting, not a defence of 70.

**Measured, per file, on disk:**

| | core sections | core min | appendix sections | appendix min | total |
|---|---|---|---|---|---|
| `session-1` | 11 | 67 | 7 | 83 | 150 |
| `session-2` | 11 | 67 | 5 | 83 | 150 |
| `session-3` | 13 | 70 | 5 | 80 | 150 |
| `session-4` | 13 | 70 | 5 | 80 | 150 |
| `session-0.1` | 12 | 120 | 0 | 0 | 120 |

**What a core-to-appendix move does and does not touch.** It does **not** touch
the 150 total, because core and appendix sum to it by construction, so
`validate_lesson.py` V5, `verify-migration` check 16 and the footer time table are
unaffected in kind. It **does** touch `window.__coreMins`, a hard-coded literal at
`session-1:3022`, `session-2:2979`, `session-3:2627` and `session-4:3218`, which
must be re-derived, and the `.apxdiv` lede that **A4** checks.

**Sections that cannot move or be reduced**, because their minutes are fixed by
ratified build parameters (`references/pedagogy.md` §s4): the **cold-open ritual**
at 8 minutes identical every session, the **named discussion block** at 20 minutes
(15 in Session 1), and the **retrieval bridge** at 7 minutes in Sessions 2+. The
**per-section envelope of 3-16 minutes** bounds every REDUCE.

### 1.2 D13 (b) — the premise was true and understated. Now D19

**Carried in:** *"the §5 complexity rubric is NOT APPROVED because §5.5 states 62
sections and 58 content sections while its own enumeration gives 86 and 82."*

**Confirmed, and two further defects were found in the same section.**

**Defect 1, the population.** Measured on disk by counting `<section>` elements
and classifying each by its class:

| | §5.5 says | Measured | Cross-check |
|---|---|---|---|
| Sections, all six files | 62 | **86** | §5.5's own enumeration 12+19+17+19+19 = 86. The per-file figures are right; only the sum is wrong |
| Content sections | 58 | **82** | 86 less the four `section.apxdiv` dividers |
| Sections, sessions 1-4 | not stated | **74** | 19+17+19+19 |
| Content sections, sessions 1-4 | not stated | **70** | **48 core + 22 appendix** |

Corroborated three ways: by `EDITORIAL.md`'s RC-4; by A4's recorded core counts of
11 / 11 / 13 / 13; and by `verify-editorial.mjs --rules A6`, which reports
*"22 appendix section(s) carry a valid data-tier"*.

**Defect 2, the anchors were never written down.** §5.1 states each component is
*"scored 0-4 against fixed anchors"* and then defines **no anchor for any
component**. As published the rubric is not reproducible. The anchors are declared
in §2 below.

**Defect 3, the normaliser does not normalise.** §5.1 says *"weighted, ×5 ->
0-100"*. The weights sum to 1, so a weighted sum of five components each in 0-4 is
itself in 0-4 and ×5 gives **0-20**. The multiplier that yields 0-100 is **×25**.

**One amendment beyond correcting a defect: C5 is banded within stratum.**
Measured over the 70 content sections of sessions 1-4, core runs at a mean of
**79** words per allocated minute against the appendix's **26**, a ratio of
**3.0×**, and the two distributions barely overlap (core p20 = 48, appendix
max = 45). Banded together, C5 scores essentially every core section high and
every appendix section low, which makes 10 per cent of the rubric a restatement of
the tier a section already carries. §5.3 already reached half of this conclusion.

### 1.3 D7 (c) — the premise was true. The rule is recorded, and not applied

**Carried in:** *"the Wolfram section mapping in report §2.3 is unsigned and the
instructor verifies it personally."* Confirmed: `EDITORIAL.md` D7 reads
*"Deferred. The §2.3 mapping awaits sign-off. Rule only, no application."*

**The rule, recorded here and applied in Phase 5, not before.** A proposed mapping
is applied to a lesson **only** where both hold:

> **(i)** report §2.3 marks that row **HIGH confidence**, **and**
> **(ii)** the same section name **already appears elsewhere in the corpus
> attached to the same claim.**

Everything else goes to `docs/wolfram-mapping-review.md` as a one-line-per-
reference checklist the instructor approves in a single pass. **Nothing
unverified reaches a lesson.** A11 already enforces that any name used comes from
the locked 17; this rule governs whether a name may be *attached to a claim* at
all.

---

## 2. The corrected D13 rubric, stated once so it can be re-run

**D19 approves this. Any later re-scoring uses this section, not report §5.1.**

### 2.1 The five components and their weights (unchanged from §5.1)

| # | Component | Weight | Counts |
|---|---|---|---|
| **C1** | Undefined-term load | **30%** | terms making their first appearance in the lesson in this section **and** currently undefined on the page, per allocated minute |
| **C2** | Blocked interaction | **25%** | whether this section's exercise instructions can be followed without a term the page never defines |
| **C3** | Prerequisite depth | **20%** | distinct concepts the section assumes and does **not** restate, intra-lesson and extra-lesson |
| **C4** | Formal-notation load | **15%** | distinct notation objects |
| **C5** | Comprehension pressure | **10%** | words per allocated minute, banded against the corpus |

`score = (0.30·C1 + 0.25·C2 + 0.20·C3 + 0.15·C4 + 0.10·C5) × 25`, each component
in 0-4, giving 0-100. **×25, not ×5.**

### 2.2 The 0-4 anchors, declared (defect 2 of D19)

Scoring returns **raw evidence**; the banding below is applied deterministically
downstream. This is deliberate: it removes scorer variance from the band and makes
the score re-derivable from the evidence table without re-reading a lesson.

**C1** — `d` = undefined first-appearances ÷ allocated minutes.

| band | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| `d` | 0 | 0 < d <= 0.5 | 0.5 < d <= 1.0 | 1.0 < d <= 2.0 | d > 2.0 |

*Grounded in:* report §4.1 records 267 undefined terms across the corpus against
720 allocated minutes, a mean of 0.37 per minute; sessions 1-4 alone are 217
against 600, a mean of 0.36. Band 1 straddles the corpus mean, band 3 is roughly
three times it, band 4 is more than five times it.

**C2** — categorical, from the per-interaction severities.

| band | condition |
|---|---|
| 0 | no interaction, or every interaction followable |
| 1 | one LOW: a single undefined term, not needed to start |
| 2 | any MEDIUM: the student can begin but cannot tell what a control means |
| 3 | one HIGH: the student cannot begin |
| 4 | two or more HIGH, **or** one HIGH whose blocked text is the section's work-along gate |

*Why the gate escalates a 3 to a 4:* the gate is the sentence that defines "done".
Report §4.2's example is `session-1` `g2` — *"Place six tokens, generate at all
three temperatures, and switch to log-log axes"* — three undefined terms in
seventeen words, in the instruction that defines completion.

**C3** — count of prerequisites assumed and not restated (intra + extra).

| band | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| count | 0 | 1 | 2-3 | 4-5 | >= 6 |

**C4** — count of distinct notation **objects**, not occurrences. One chart on
log-log axes is one object however many times it is referenced.

| band | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| count | 0 | 1 | 2-3 | 4-6 | >= 7 |

**C5** — words per allocated minute, **banded within stratum** by quintile of the
measured distribution over the 70 content sections of sessions 1-4. Fixed
thresholds, recorded here so a re-run reproduces the same bands:

| stratum | n | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|---|
| **core** | 48 | <= 48.0 | <= 64.8 | <= 87.6 | <= 110.6 | > 110.6 |
| **appendix** | 22 | <= 21.5 | <= 21.8 | <= 24.9 | <= 29.8 | > 29.8 |

Measured range: core 19.6 to 181.2, appendix 13.6 to 45.0.

### 2.3 The two routing axes, and the stall index (unchanged from §5.2)

**R1, distance from advisory application.** Never added into the score. It selects
the remedy:

| | CLOSE to advisory application | FAR from advisory application |
|---|---|---|
| **High complexity** | **REDUCE.** You cannot move the thing the lesson is for | **MOVE.** This is the advanced tier's purpose |

**R2, self-check availability.** Does the section give the student a way to find
out whether they got it: a commit-first gate, a revealed answer, scored feedback,
a verdict readout? A high-scoring section with **no** self-check may need a check
*added* rather than a cut.

**Stall index** = `score × (1 − normalised position within the core)`. A priority
ordering, not part of the score. For a core section at 0-based index `i` of `N`
core sections, normalised position is `i / (N − 1)`. **An appendix section takes
the normalised position of the core section its `data-insert-after` names** — that
extension is declared here because §5.2 did not define it and appendix sections
are in the scored population.

### 2.4 Three method decisions this scoring pass had to make, recorded

**(a) C1 is scored against the post-reflow reading order, not source order.**
"First appearance in the lesson" is order-dependent, and today the two orders
differ: appendix sections physically sit in a trailing block, while
`data-insert-after` says where they are meant to be read. Scoring against the
reflow order means the C1 attribution survives Phase 2 step (a) instead of being
invalidated by it. The reflow order is fully derivable today from
`data-insert-after` plus the tie-break declared in §4.1, and it is reproduced in
§3.1. **A MOVE still perturbs C1** and that is named in the red team, §5.

**(b) C1 is re-derived, not read from report item 4.** §4.4 says *"Full records
for all 413 terms are in the workflow output"* — **that output is not in this
repository.** What §4 commits is the per-lesson totals in §4.1, the HIGH-severity
blocked-exercise tables with section ids and line numbers, and a sample of roughly
sixty drafted definitions in §4.4. The per-term first-occurrence map that C1's
definition names as its source does not exist on disk, so it was rebuilt.
Reconciliation against §4.1's per-lesson "currently undefined" totals (58 / 56 /
37 / 66) is reported in §3.2 as a check on the rebuild.

**(c) The percentile cut is the 80th, and the population is sessions 1-4.**
Report §5.3 proposed the 75th across all 62 sections it believed existed; this
task specifies the 80th. Both boundaries are reported in §3.3 so either cut can be
read off. The population is the **70 content sections of sessions 1-4** —
`session-0.1` is excluded under D20, and report §5.6's reasoning for excluding it
holds unchanged: with no appendix and no tier system there is nothing to MOVE
into, so a REDUCE-or-MOVE recommendation there would be a REDUCE-or-CUT
recommendation wearing the wrong name.

---

## 3. Phase 1 — the measurement, and what Phase 2 consumes from it

**Phase 1 was narrowed on purpose, and the reason is the same one that governs
`session-0.1`: any measurement keyed to a section id is invalidated the moment
Phase 2 moves that section. Measuring now means measuring twice.**

| | |
|---|---|
| **In scope** | complexity scores for every content section in sessions 1-4 on the re-derived population; the distribution with quartile boundaries; the list at or above the 80th percentile sorted by stall index; REDUCE or MOVE per flagged section; the full §5.4 dependency check for every MOVE including the cross-lesson retrieval bridges; the minute-budget effect of every move against D18 |
| **Out of scope, deferred until the restructure settles** | vocabulary first-occurrence marks; instructor-note line inventory; Wolfram reference enumeration *as locations*; live-data point locations |

The deferred four share a property: **their term lists and source lists survive a
move; their LOCATIONS do not, and locations are what those inventories are for.**
What each later phase needs *about* them — the D7 two-condition rule and its
yield, the mis-wired chip enumeration, the `figure_class` taxonomy, the
`VOCABULARY.md` shape — is specified in §5, §6 and §8 without being keyed to a
line number.

### 3.1 How the measurement was run

Delegated: every file read and every grep that produced a number ran in a
subagent's context, not in the session's. What came back was evidence, not
prose.

**Agents returned raw evidence; the banding to 0-4 and the weighting were applied
deterministically afterwards by script.** This is the method decision that makes
the result re-derivable: the score table can be recomputed from the evidence
table without re-reading a lesson, and two scorers disagreeing about a count is
visible as a count rather than hidden inside a band.

Three things were measured mechanically and never handed to a judgement at all:
**section inventory** (86 sections, classified by class, with line ranges),
**allocated minutes** (from each section's `span.mins`), and **words per allocated
minute** (C5).

> **The word-count extractor was validated against an independent measurement
> before it was trusted.** Report §7.4 records `session-4` `s3` at 732 words in 5
> minutes. The extractor returns **732**. §7.4 prints the quotient as 143 where
> 732 ÷ 5 = 146.4, which is the arithmetic defect `EDITORIAL.md` already records —
> so the extractor reproduces §7's *words* exactly and the divergence is confined
> to §7's own division.

**Then an adversarial pass.** A second agent per lesson was told to refute rather
than confirm: is a term counted as undefined actually defined somewhere in the
file; is its first appearance really in the section credited; is "the student
cannot begin" being used where "the student can begin but is confused" is true;
is a prerequisite restated in place; is one chart being counted three times; was
R1 judged on relevance or smuggled in as difficulty. Its corrections are applied
and logged.

### 3.2 The reflowed reading order, which is also Phase 2's target

C1 is scored against this order, per §2.4(a). It is derived entirely from
`data-insert-after` plus the §4.1 tie-break, and **all 22 anchors resolve to a
core section in their own file — there are no orphans.**

**`session-1`** — 11 core / 7 appendix, 67 + 83 = 150 min

| # | id | | tier | after | min | wpm | pos | section |
|---|---|---|---|---|---|---|---|---|
| 1 | `s1` | **core** |  |  | 6 | 63 | 0.00 | Start |
| 2 | `sCold` | **core** |  |  | 8 | 21.1 | 0.10 | Cold open |
| 3 | `s2` | **core** |  |  | 7 | 52.6 | 0.20 | Prediction |
| 4 | `s3` | apx | foundational | s2 | 11 | 23.7 | 0.20 | A1 · n-grams |
| 5 | `s4` | apx | advanced | s2 | 12 | 27.9 | 0.20 | A2 · Fitting a model |
| 6 | `s5` | **core** |  |  | 5 | 70.4 | 0.30 | Tokens |
| 7 | `s6` | apx | foundational | s5 | 9 | 27.4 | 0.30 | A3 · Meaning space |
| 8 | `s7` | apx | standard | s5 | 9 | 38.9 | 0.30 | A4 · Counting failure |
| 9 | `s8` | apx | advanced | s5 | 16 | 28.3 | 0.30 | A5 · SAMPLER LAB |
| 10 | `s9` | **core** |  |  | 7 | 68.4 | 0.40 | Hallucination |
| 11 | `s10` | **core** |  |  | 5 | 48 | 0.50 | Frontier |
| 12 | `s11` | **core** |  |  | 7 | 36.9 | 0.60 | Practice cost |
| 13 | `s12` | **core** |  |  | 6 | 22 | 0.70 | Tier choice |
| 14 | `s13` | **core** |  |  | 7 | 48 | 0.80 | Confidentiality |
| 15 | `s14` | apx | foundational | s13 | 9 | 30.2 | 0.80 | A6 · Regulation |
| 16 | `s14b` | **core** |  |  | 4 | 75.3 | 0.90 | Custom instructions |
| 17 | `s14c` | apx | standard | s14b | 17 | 13.6 | 0.90 | A7 · Discussion |
| 18 | `s15` | **core** |  |  | 5 | 104 | 1.00 | Close |

**`session-2`** — 11 core / 5 appendix, 67 + 83 = 150 min

| # | id | | tier | after | min | wpm | pos | section |
|---|---|---|---|---|---|---|---|---|
| 1 | `s0` | **core** |  |  | 6 | 147.7 | 0.00 | Session map |
| 2 | `s1` | apx | foundational | s0 | 16 | 21.9 | 0.00 | B1 · Next token |
| 3 | `s2` | apx | foundational | s0 | 15 | 21.5 | 0.00 | B2 · Laplace |
| 4 | `sCold` | **core** |  |  | 8 | 20.1 | 0.10 | Cold open |
| 5 | `s3` | **core** |  |  | 5 | 91 | 0.20 | Temperature |
| 6 | `s4` | apx | standard | s3 | 16 | 21.1 | 0.20 | B3 · Counting failure |
| 7 | `s5` | **core** |  |  | 6 | 100.8 | 0.30 | Cost frontier |
| 8 | `s6` | **core** |  |  | 6 | 86.7 | 0.40 | P·T·C·F |
| 9 | `s6b` | **core** |  |  | 7 | 72.4 | 0.50 | Your prompts |
| 10 | `s7` | **core** |  |  | 5 | 33.2 | 0.60 | Triage |
| 11 | `s8` | **core** |  |  | 6 | 83.3 | 0.70 | Interview rewrite |
| 12 | `s9` | apx | standard | s8 | 16 | 21.8 | 0.70 | B4 · Seven steps |
| 13 | `s10` | **core** |  |  | 8 | 97.5 | 0.80 | Citations |
| 14 | `s11` | **core** |  |  | 5 | 53.4 | 0.90 | Template audit |
| 15 | `s12d` | apx | standard | s11 | 20 | 21.6 | 0.90 | B5 · Discussion |
| 16 | `s12` | **core** |  |  | 5 | 144.6 | 1.00 | Final project |

**`session-3`** — 13 core / 5 appendix, 70 + 80 = 150 min

| # | id | | tier | after | min | wpm | pos | section |
|---|---|---|---|---|---|---|---|---|
| 1 | `s1` | **core** |  |  | 5 | 100 | 0.00 | Bridge + case |
| 2 | `sCold` | **core** |  |  | 8 | 19.6 | 0.08 | Cold open |
| 3 | `s2` | **core** |  |  | 5 | 66 | 0.17 | Embeddings |
| 4 | `s3` | **core** |  |  | 5 | 46.4 | 0.25 | Distribution |
| 5 | `s4` | **core** |  |  | 6 | 61.2 | 0.33 | Retrieval |
| 6 | `s5` | apx | standard | s4 | 16 | 22.4 | 0.33 | C1 · Chunk size |
| 7 | `sHY` | apx | advanced | s4 | 16 | 21.6 | 0.33 | C5 · Hybrid search |
| 8 | `s6` | **core** |  |  | 6 | 62.3 | 0.42 | Retrieval rates |
| 9 | `s7` | **core** |  |  | 5 | 105.2 | 0.50 | Grounded error |
| 10 | `s8` | apx | foundational | s7 | 14 | 25.3 | 0.50 | C2 · Grounding vs tuning |
| 11 | `s9` | **core** |  |  | 4 | 54.8 | 0.58 | Workflow |
| 12 | `s10` | **core** |  |  | 5 | 98.2 | 0.67 | Note-takers |
| 13 | `s11` | apx | foundational | s10 | 14 | 24.4 | 0.67 | C3 · Adoption |
| 14 | `s12` | **core** |  |  | 6 | 129.3 | 0.75 | Consent |
| 15 | `s13` | **core** |  |  | 6 | 128.3 | 0.83 | Basis |
| 16 | `s14` | **core** |  |  | 4 | 79 | 0.92 | Policy HW |
| 17 | `s15` | apx | standard | s14 | 20 | 20 | 0.92 | C4 · Discussion |
| 18 | `s16` | **core** |  |  | 5 | 113.4 | 1.00 | Part 1 + handoff |

**`session-4`** — 13 core / 5 appendix, 70 + 80 = 150 min

| # | id | | tier | after | min | wpm | pos | section |
|---|---|---|---|---|---|---|---|---|
| 1 | `s0` | **core** |  |  | 5 | 93 | 0.00 | Frame |
| 2 | `sCold` | **core** |  |  | 8 | 20.5 | 0.08 | Cold open |
| 3 | `s1` | **core** |  |  | 5 | 67 | 0.17 | No rulebook |
| 4 | `s2` | **core** |  |  | 5 | 108.6 | 0.25 | NPI |
| 5 | `sRSP` | apx | foundational | s2 | 16 | 21.6 | 0.25 | D5 · The 30-day clock |
| 6 | `s3` | **core** |  |  | 5 | 146.4 | 0.33 | Tiers |
| 7 | `s4` | **core** |  |  | 5 | 51.6 | 0.42 | Vendors |
| 8 | `s5` | **core** |  |  | 5 | 144.8 | 0.50 | Attacks |
| 9 | `sW1` | apx | advanced | s5 | 16 | 45 | 0.50 | D1 · Provenance |
| 10 | `sW2` | apx | advanced | s5 | 14 | 33.5 | 0.50 | D2 · Watermark limits |
| 11 | `s6` | **core** |  |  | 4 | 65.3 | 0.58 | Leaks |
| 12 | `s7` | **core** |  |  | 5 | 112 | 0.67 | What it costs |
| 13 | `sWS` | apx | standard | s7 | 14 | 43.2 | 0.67 | D3 · Source staleness |
| 14 | `s8` | **core** |  |  | 5 | 181.2 | 0.75 | Audit trail |
| 15 | `s10` | **core** |  |  | 3 | 112 | 0.83 | Pairings |
| 16 | `sCR` | **core** |  |  | 10 | 35.9 | 0.92 | Cold first run |
| 17 | `sD` | apx | standard | sCR | 20 | 19.4 | 0.92 | D4 · Discussion |
| 18 | `s9` | **core** |  |  | 5 | 48.6 | 1.00 | Policy homework |


### 3.3 The distribution

> **Provenance of the numbers in §3.3, §3.4 and §3.7.** Every content section of sessions 1-4 was scored, then re-checked by a second agent told to refute rather than confirm. **Adversarial verification is complete for 4 of the four lessons — `session-1`, `session-2`, `session-3`, `session-4`.** All four are folded in. 41 machine-applicable corrections have been applied; corrections expressed as narrative rather than as a field edit are listed in §12.7 and are **not** in these numbers.
>
> The verification pass matters more than a footnote suggests: it found the scoring agents **fabricating**. See §12.9.

**70 content sections scored — 48 core and 22 appendix — on one absolute scale across sessions 1-4**, per §5.3, with the within-lesson picture reported alongside.

| | n | min | Q1 | median | Q3 (p75) | **p80** | max | mean |
|---|---|---|---|---|---|---|---|---|
| **all content sections** | 70 | 10 | 27.8 | 43.8 | 54.7 | **55.3** | 76.3 | 41.5 |
| core | 48 | 10 | 27.5 | 42.5 | 53.1 | 55 | 76.3 | 40.2 |
| appendix | 22 | 13.8 | 30.9 | 45 | 54.7 | 60 | 75 | 44.2 |

**The cut is the 80th percentile, 55.3, and it flags 14 sections.** Report §5.3 proposed the 75th, which here is **54.7** and would flag 18. Both are recorded so either can be read off.

**Core and appendix sit almost on top of each other** — medians 42.5 and 45, means 40.2 and 44.2. That is the C5 stratification (§1.2) doing its job: banded against the combined corpus, the appendix would have been pushed systematically below the core by a component measuring density rather than difficulty.

**Per lesson**, which §5.3 requires because the remedy is always lesson-local:

| lesson | sections | mean | max | at or above the cut |
|---|---|---|---|---|
| `session-1` | 18 | 42.3 | 72.5 | **4** |
| `session-2` | 16 | 41.7 | 76.3 | **4** |
| `session-3` | 18 | 37.1 | 61.3 | **1** |
| `session-4` | 18 | 44.9 | 75 | **5** |

> **The flags do not distribute evenly, and §5.3 called that in advance — but not in this direction.** It expected concentration in `session-1` and in the advanced appendices of sessions 3 and 4. Measured, **`session-4` holds 5 of the 14 and `session-3` holds none at all.** Per §5.3's own instruction that is a finding, not a sampling error.
>
> **But do not read `session-3` as easy, because the cut is knife-edge there.** Its highest-scoring section, `#sHY` (C5 · Hybrid search), scores **61.3 against a cut of 55.3** — it misses by **-6.0**. Only 9 sections in the whole corpus sit within five points below the cut, and they do at `s3 s4` and `s3 s7` and `s4 sW2` and `s4 s10` and `s1 s3` and `s1 s14` and `s3 s16` and `s2 s1` and `s4 s5`. **At report §5.3's own proposed 75th percentile (54.7) the picture changes: 18 sections flag and `session-3` gets 3.** So "`session-3` has none" is a statement about where the line was drawn, not about the lesson.
>
> One coincidence worth naming: `session-3 #sHY` is also the section with **zero inbound `href`** that A5 fails on and step (h) exists to fix. **The lesson's hardest section is also its least reachable one.**

**Reconciliation of the rebuilt undefined-term counts against report §4.1**, which is the only external check available on C1 (§12.1):

| lesson | rebuilt, in a content section | report §4.1 | delta |
|---|---|---|---|
| `session-1` | 86 | 58 | **+28** |
| `session-2` | 61 | 56 | **+5** |
| `session-3` | 34 | 37 | **-3** |
| `session-4` | 63 | 66 | **-3** |
| **total** | **244** | **217** | **+27** |

> **This is the single figure the adversarial pass improved most, and it changes what the delta means.** Before correction the rebuild ran **+62** over §4.1 with a spread from −14% to +58%. After it, **three of the four lessons reconcile within five** — `session-2` +5, `session-3` -3, `session-4` -3 — and **`session-1` alone is the outlier at +28**. A general complaint about reproducibility has become **one specific question about one lesson**, which is a far more useful thing to hand an instructor.

These are the counts **after** the adversarial pass, taken from each section's verified evidence rather than from the term-map stage. Read the deltas as a statement about the inventory's reproducibility, not as a correction to §4.1 — §4.1's per-term records do not exist on disk to arbitrate.

### 3.4 At or above the 80th percentile, sorted by stall index

**stall index = score × (1 − normalised position within the core)**, an appendix section taking its anchor's position (§2.3). A section scoring 80 at position 3 of 11 outranks the same 80 at position 11, because the goal is that a demanding topic caps a lesson rather than stalling its middle.

| stall | score | C1 | C2 | C3 | C4 | C5 | lesson | id | | tier | pos | min | R1 | R2 | hard | section |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **76.3** | 76.3 | 4 | 3 | 2 | 2 | 4 | `s2` | `s0` | **core** | — | 0.00 | 6 | CLOSE | YES | BOTH | Session map |
| **58** | 72.5 | 2 | 4 | 2 | 4 | 3 | `s1` | `s4` | apx | advanced | 0.20 | 12 | FAR | YES | IDEA | A2 · Fitting a model |
| **57.5** | 57.5 | 3 | 2 | 3 | 0 | 3 | `s4` | `s0` | **core** | — | 0.00 | 5 | CLOSE | YES | BOTH | Frame |
| **53** | 66.3 | 3 | 4 | 1 | 3 | 1 | `s1` | `s2` | **core** | — | 0.20 | 7 | FAR | NO | IDEA | Prediction |
| **52** | 65 | 3 | 2 | 3 | 2 | 3 | `s2` | `s3` | **core** | — | 0.20 | 5 | FAR | YES | BOTH | Temperature |
| **50.8** | 72.5 | 3 | 2 | 3 | 4 | 3 | `s2` | `s5` | **core** | — | 0.30 | 6 | CLOSE | NO | BOTH | Cost frontier |
| **45.5** | 65 | 2 | 2 | 3 | 4 | 3 | `s1` | `s8` | apx | advanced | 0.30 | 16 | FAR | YES | BOTH | A5 · SAMPLER LAB |
| **40.9** | 61.3 | 1 | 4 | 3 | 3 | 1 | `s3` | `sHY` | apx | advanced | 0.33 | 16 | FAR | YES | BOTH | C5 · Hybrid search |
| **40** | 60 | 1 | 2 | 3 | 4 | 4 | `s4` | `s3` | **core** | — | 0.33 | 5 | CLOSE | NO | BOTH | Tiers |
| **37.5** | 75 | 3 | 2 | 3 | 4 | 4 | `s4` | `sW1` | apx | advanced | 0.50 | 16 | FAR | YES | BOTH | D1 · Provenance |
| **28.1** | 56.3 | 3 | 2 | 2 | 3 | 0 | `s1` | `s10` | **core** | — | 0.50 | 5 | CLOSE | YES | BOTH | Frontier |
| **23.8** | 71.3 | 3 | 2 | 3 | 3 | 4 | `s4` | `s7` | **core** | — | 0.67 | 5 | CLOSE | YES | BOTH | What it costs |
| **20.4** | 61.2 | 1 | 2 | 4 | 3 | 4 | `s4` | `sWS` | apx | standard | 0.67 | 14 | FAR | YES | BOTH | D3 · Source staleness |
| **0** | 56.3 | 1 | 2 | 3 | 3 | 4 | `s2` | `s12` | **core** | — | 1.00 | 5 | CLOSE | YES | PROSE | Final project |

Raw evidence behind each band: C1 is undefined first-appearances per allocated minute, C2 the worst interaction severity in the section, C3 the count of prerequisites assumed and not restated, C4 distinct notation objects, C5 words per allocated minute within stratum.

| id | C1 count | per min | C2 HIGH | gate blocked | C3 count | C4 count | wpm |
|---|---|---|---|---|---|---|---|
| `s2 s0` | 14 | 2.33 | 1 | no | 3 | 3 | 147.7 |
| `s1 s4` | 10 | 0.83 | 1 | **yes** | 3 | 7 | 27.9 |
| `s4 s0` | 10 | 2 | 0 | no | 5 | 0 | 93 |
| `s1 s2` | 14 | 2 | 4 | no | 1 | 4 | 52.6 |
| `s2 s3` | 9 | 1.8 | 0 | **yes** | 4 | 3 | 91 |
| `s2 s5` | 9 | 1.5 | 0 | **yes** | 4 | 7 | 100.8 |
| `s1 s8` | 15 | 0.94 | 0 | **yes** | 4 | 12 | 28.3 |
| `s3 sHY` | 7 | 0.44 | 1 | **yes** | 4 | 5 | 21.6 |
| `s4 s3` | 1 | 0.2 | 0 | no | 4 | 7 | 146.4 |
| `s4 sW1` | 18 | 1.13 | 0 | no | 5 | 7 | 45 |
| `s1 s10` | 9 | 1.8 | 0 | no | 2 | 5 | 48 |
| `s4 s7` | 8 | 1.6 | 0 | no | 5 | 5 | 112 |
| `s4 sWS` | 1 | 0.07 | 0 | no | 8 | 6 | 43.2 |
| `s2 s12` | 2 | 0.4 | 0 | no | 4 | 4 | 144.6 |

### 3.5 The MOVE dependency check, as corrected

Report §5.4 defines five checks. **Two of them were tested mechanically this
session. One is confirmed and narrowed; one is refuted and should be struck.**

#### 1. Explicit anchors — CONFIRMED, and the graph is small

Every `href="#id"` between sections in sessions 1-4 was mapped in both
directions. **The entire inter-section anchor graph is the `.apxback` bars and the
`a.apxlink` teasers and nothing else.** Each appendix section has exactly two
outbound anchors (a back-link and a continue-link) and each anchored core section
points forward to its appendix group. §5.4's own example reproduces exactly:
`session-1` `s2 -> s3, s4` and `s3, s4 -> s2, s5`.

**Consequence for a MOVE:** because Phase 2 step (e) retires every `.apxback` bar
and every `a.apxlink` teaser, **the explicit-anchor dependency class is empty
after step (e)**. It binds today and it will not bind then. A MOVE evaluated
before step (e) must still honour it; a MOVE evaluated after it is unconstrained
by anchors. **Order matters, and this is the one place where doing step (b) and
step (e) in the same pass makes the check easier rather than harder.**

**Two sections have zero inbound anchors and are the exception:** `session-3 #sHY`
and `session-4 #sRSP`, which is A5, and which step (h) fixes.

#### 2. Carry-forward artifacts — CONFIRMED AS A CLASS, but a MOVE cannot break the code half

§5.4 says these are *"JavaScript variable reads, not links, so nothing in the
build sees them"*. Measured, the code half turns out to be structurally immune to
a move, and the reason is worth having in writing:

| Measured, all four lessons | |
|---|---|
| `<script>` tags **inside a section** | **0** |
| Inline `on*` handlers inside a section | **0** |
| DOM lookups (`getElementById`, `querySelector`, the `$(id)` helper) | 181 / 144 / 71 / 96 |
| …of those, **inside a section** | **0.** Every one lives in the shared script blocks that follow the last section |

**There is no script inside any section.** All behaviour lives in three or four
shared blocks after the sections and binds **by id**, after every section already
exists. So a section's handlers, its captured values and its readouts do not care
where the section sits in the document. **Moving a section cannot break a
carry-forward binding. Deleting or splitting one can, because that changes ids.**

**The named example does not bind.** §5.4 cites *"the cold-open prompt capture
(`sCold -> s6b` in `session-2`)"*. On disk `#coldPrompt` (`session-2:1195`, inside
`#sCold`) is read at exactly one place, `session-2:2943`, which writes to
`#coldOut` — **also inside `#sCold`.** And `#s6b` does not read it: its own
instruction is *"Paste the prompt exactly as you submitted it, typos included."*
The student re-pastes. There is no binding to break.

**What survives is the pedagogical half, and it is real.** A section that tells a
student to use something they made earlier depends on "earlier" still being true.
That is prose, nothing in the build watches it, and it is the half §5.4 was right
to worry about. Per-section `produces` / `consumes` lists are recorded in the
Phase 1 evidence table and every MOVE candidate is checked against them by hand.

> **Two of §5.4's five checks do not hold as written** — part 2's code half is
> immune and its named example does not bind, and part 4 is false outright. That
> is not an argument for skipping the dependency work. It is an argument for
> running it against the corpus rather than against the report.

#### 3. Retrieval bridges — CROSS-LESSON, and the shape is not what §5.4 assumes

§5.4 is right that this is the class most likely to be missed and right about why:
per `docs/spine-brief.md` §1 the bridges test the **prior session's mechanism**,
not the case question, so **a MOVE that demotes a mechanism section in session N
can break a bridge in session N+1.**

**But the bridge is never its own section.** Measured in all four lessons:

| Lesson | Bridge lives in | Section minutes | Ratified parameter |
|---|---|---|---|
| `session-2` | a sub-block of `#s0`, which also carries the session map and the time budget | 6 | 7 |
| `session-3` | a sub-block of `#s1`, which also carries the case | 5 | 7 |
| `session-4` | a sub-block of `#s0`, which also carries the case | 5 | 7 |
| `session-1` | none, correctly — there is no prior session | — | n/a |

All three carry **4 items** and are ungraded, as ratified (`session-4:2386` prints
*"ungraded, as designed"*).

**Three consequences.** The 7-minute bridge parameter is **not comparable at
section granularity** and the 6 / 5 / 5 figures are not violations of it. The
opener sections that host the bridges are effectively **immovable**, because
moving one would move the case introduction with it. And the cross-lesson check
runs **from** the bridge items **to** the mechanism sections in the prior lesson.

**All twelve items were mapped to the prior-lesson section that teaches what they
test.** Block locations: `session-2` `#s0` body 1115-1121 with `var BRIDGE` at
2688-2697; `session-3` `#s1` body 1084-1090 with `var BRIDGE` at 1742-1747;
`session-4` `#s0` body 1103-1106 with `var BRIDGE` at 2352-2365.

| item | tests | prior section |
|---|---|---|
| **s2-1** | what the model produces per step: a probability distribution over a ~50k vocabulary | `s1 #s2` **core** (primary) + `s1 #s5` **core** (the ~50,000) |
| **s2-2** | $55M against $14M: fluency about a number is not access to it | `s1 #s9` **core** |
| **s2-3** | why tiers rank by cost per finished task, not per token | `s1 #s10` **core** (primary), `#s11`, `#s15` |
| **s2-4** | the three Cole confidentiality landmines | `s1 #s13` **core**, verbatim to its `NPI` items |
| **s3-1..4** | the four citation checks: existence, text, currency, applicability | **all four resolve to `s2 #s10` "Citations" core**, one card per item |
| **s4-1** | the grounding qualifier | `s3 #s1` **core** (its lede *is* the answer) + `s3 #s4` **core** |
| **s4-2** | the note-taker pipeline in order | `s3 #s10` **core**, verbatim |
| **s4-3** | grounding against fine-tuning | **`s3 #s8` APPENDIX, `data-tier="foundational"` — the only source** |
| **s4-4** | what extraction surfaced, $18M against $55M | `s3 #s6` **core** + `s3 #s4` **core** |

**Core sections that cannot be demoted without moving a bridge item with them:**

> `session-1` **`#s2`, `#s5`, `#s9`, `#s10`, `#s13`** ·
> `session-2` **`#s10`** ·
> `session-3` **`#s1`, `#s4`, `#s6`, `#s10`**

`session-2 #s10` is the sharpest: **all four** of session-3's bridge items resolve
to it, one card per item. It is a single point of failure for an entire bridge.

##### The reverse hazard, and Phase 2 step (d) makes it the default

**One HARD instance, and it is a defect that exists today.**

`session-4`'s bridge item 3 (grounding against fine-tuning) is **unanswerable by a
student on Core only.** Its only teaching source is `session-3 #s8`, an appendix
section at line 1578 with `data-tier="foundational"`. An exhaustive search of
`session-3` for `fine-tun` returns lines 1103, 1277, 1517, 1581, 1583, 1587, 1599,
1679 and 2145. Of those, 1581/1583/1587/1599/2145 are **inside `#s8`**;
1517 and 1679 are the appendix index and the time-budget row; 1103 is a
`<p class="src">` listing *"grounding vs. fine-tuning"* as a syllabus topic and
states no distinction; and **1277 is the `apxlink` teaser inside core `#s7`, which
`body.core-only a.apxlink{display:none}` (`session-3:684`) also hides.**

> **Today the tier state initialises at `+ Standard` with everything visible, so a
> student can reach `#s8` by scrolling. Phase 2 step (d) defaults to CORE ONLY.
> That makes an existing latent defect the default experience: the ordinary
> student of session 4 will be asked to recall something session 3 never showed
> them.**
>
> **This must be fixed in the same commit as step (d), and it is not a MOVE
> decision.** Either `session-3 #s8` is promoted to the core, or the distinction it
> teaches is restated in a core section of session 3, or `session-4`'s bridge item
> 3 is rewritten to test something the core taught. The third is cheapest and the
> first costs 14 minutes the `session-3` core does not have. **Flagged for the
> instructor.**

**Two SOFT instances**, both answerable from the core with the fuller statement in
an appendix: `s2` item 1's one-sentence form is in `s1 #s8` (advanced, line 1878)
while `#s2` + `#s5` carry it between them; `s2` item 3's fullest statement is in
`s1 #s14` (foundational, line 2858) while core `#s10` line 1486 carries the causal
sentence, and session-2's own core `#s5` restates it minutes later.

**Two traps for whoever maintains this next.** `session-4`'s opener pace panel is
tagged `data-comp="commit-first-mcq"` (line 1089) where sessions 2 and 3 use
`data-comp="retrieval-bridge"` — **a tag-based bridge inventory will miss session
4 entirely.** And `session-4` item 4's stem says *"extraction"* while it tests the
**retrieval** strand (`#s4` / `#s6`), not the extraction strand (`#s10`), so a
maintainer scanning stems will mis-triage it.

#### 4. Gate chains — REFUTED. Strike this check

§5.4 says the appendix discussion sections *"each reference every other appendix
section in the lesson"*. **Both halves are false, tested three ways.**

- **Not by anchor.** `#s14c`, `#s12d`, `#s15` and `#sD` carry exactly **two**
  intra-file anchors each, and **both point at core sections** — the `.apxback`
  back-link and continue-link. Verbatim, `session-3:1631`:
  `<div class="apxback">Insert between §10 Policy HW and §11 Part 1 + handoff
  &mdash; <a href="#s14">back to §10</a> &middot; <a href="#s16">continue to §11
  &rarr;</a></div>`
- **Not textually.** `#s14c` names no other appendix section, `#s15` none, `#sD`
  none. **Exactly one** cross-reference exists in the whole class:
  `session-2:1876`, `<h4>Appendix B4 adoption gap</h4>` inside `#s12d` — one of
  session 2's four others, unanchored, invisible to any href pass.
- **Not by nav label.** The rail is one global element built once from every
  `data-nav` (`session-1:2226-2228`), not a per-section reference.

**And no gate anywhere depends on another gate.** `mark()` is identical in all
four files; `done` / `__done` is write-only apart from an `if(done[id]) return`
idempotence guard on the **same** id. All 25 call sites condition on their own
section's widget state. Sessions 2, 3 and 4 mark only one or two gates
programmatically at all; the rest are set only by Shift+U. Chaining is prohibited
by `references/pedagogy.md` R10 and enforced as `verify-migration` **check 10**
(*"No section gating and no browser storage"*), which passes today.

> **Gate state carries zero dependency weight for a MOVE. §5.4 part 4 should be
> struck and replaced.**

**What the real hazard is.** The section that references every appendix section is
the **`#apx` divider's `.apxgrid` card index** — and it is *already* incomplete
(`session-3` omits `#sHY`, `session-4` omits `#sRSP`). The genuine move-hazard is
**orphaning an appendix section's `.apxcard`, its `apxlink` teaser and its
`tbudget` row**. That is a divider-integrity problem, it is what A1-A5 check, and
Phase 2 step (g) removes it by generating the index instead of typing it.

**Replacement check 4: after any MOVE, the generated index and the `tbudget` table
must both list every section, and `verify-editorial --rules A1,A2,A3,A4,A5` must
be 0.**

#### 5. Case figures — CONFIRMED, with a sharper failure mode than §5.4 states

`verify-migration.mjs:346-375`. Three pinned regexes over all six lesson files,
prose only, everything outside `CASE:BEGIN` / `CASE:END` excluded.

| Figure | Source |
|---|---|
| **$522,086** | `steadyGap` |
| **$20,020,000** | `notePrincipal` |
| **$38,200** | `Math.round(1000000 * noteRate)` |

Six occurrences, **all in each lesson's opening core section**:
`session-1:1283` (`#s1`), `session-2:1133` (`#s0`), `session-4:1120` (`#s0`).
`session-3` phrases its spine paragraph differently and is **unguarded today**.
Live run: PASS, *"6 pinned figure(s) checked"*.

**A whole-section move cannot break it.** Check 20 reads no class, no tier, no
`data-insert-after` and no ordering — it regexes a string and compares digits, and
every section sits after `CASE:END` so relocation cannot cross the excluded region.

> **A split cannot make check 20 fail, but it can silently disarm it.**
> `check('20', …, bad.length === 0, …)` has **no presence floor: zero matches is a
> PASS.** Break a pinned sentence's contiguity — a `</section>` mid-sentence, a
> `<b>` changed to a `<span>` — and the figure goes unguarded while the check
> stays green.
>
> **So the check after any MOVE or SPLIT on those three sections is not "did check
> 20 pass". It is "does the detail line still read 6 pinned figures".** Anything
> less is the check watching itself succeed at nothing.

#### 6. Section numbering — A DEPENDENCY CLASS §5.4 DOES NOT LIST, and it is measured here

**Core sections carry a contiguous `§NN` number in their eyebrow; appendix
sections carry a letter-number instead.** So a MOVE is also a **renumber**: the
moved section loses its `§NN`, and every core section after it shifts down by one.

| lesson | numbered core sections | unnumbered core sections |
|---|---|---|
| `session-1` | §01-§10 (10) | `s1`, the title section |
| `session-2` | §01-§09 (9) | `s0`, `sCold` |
| `session-3` | §01-§11 (11) | `s1`, `sCold` |
| `session-4` | §01-§11 (11) | `s0`, `sCold` |

Note that ids do not track numbers: in `session-4`, `s10` is **§09** and `s9` is
**§11**.

This is not an anchor, a carry-forward artifact, a bridge, a gate or a case
figure, so §5.4's five checks miss it entirely — and there are **116 `§NN`
occurrences across the four lessons** (37 / 29 / 28 / 22), which looks like the
largest MOVE hazard in the corpus.

**It is not, and this was tested rather than assumed.**

Every `§NN` occurrence was classified by the region it sits in:

| lesson | total `§NN` | in `.apxback` | in `.apxcard` | surviving elsewhere |
|---|---|---|---|---|
| `session-1` | 37 | 28 | 7 | **2** |
| `session-2` | 29 | 20 | 5 | **4** |
| `session-3` | 28 | 16 | 4 | **8** |
| `session-4` | 22 | 16 | 4 | **2** |

**And every one of the 16 survivors is a legal citation, not a section
cross-reference.** Read in context, they are `IRC §§ 671-679` (eight, two per
lesson, inside the case block), `§ 2036(a)(1)` and `§§ 671, 675, 2036, 2702, 7520`
(`session-2:1933`, `:1937`), and `Cal. Penal Code § 637.2` with `18 U.S.C. § 2511`
(`session-3:1364`, `:1376`, `:1700`). The `§\s*\d\d` pattern matches the second
`§` of `§§ 671`; none of these is a section number.

> **So all 116 in-prose section cross-references live inside the `.apxback` bars
> and the `.apxcard` labels — precisely the furniture Phase 2 step (e) retires and
> step (g) regenerates. A MOVE strands no prose reference to a section number.**
> The renumbering hazard is absorbed by Phase 2 as a byproduct, and this is
> provable rather than hoped for.

**Three exceptions survive the sweep and are hand-checked per MOVE.** A separate
pass for appendix-letter references and relative-position language found exactly
these, everything else being a section's own eyebrow or its footer time-table row:

| Site | Text | Why it binds |
|---|---|---|
| `session-2:1244` | *"Pull up the three responses you generated in **Appendix B1**"* | a core section reaching into an appendix section. Both an appendix-letter reference **and** a carry-forward artifact |
| `session-2:1850` | *"Already on screen — **Appendix B4** adoption gap, 52.2% of advisors…"* | inside `#s12d`, the discussion section, naming another appendix section. The one cross-reference that survives the §5.4 part-4 refutation |
| `session-4:1535` | *"you will open yours in **the next section**"* | inside `#s10` (§09 Pairings), pointing at `#sCR`. **Pure relative position.** Anything inserted or removed between them makes it false |

**Relative-position language is otherwise absent.** Two apparent hits are false
positives — `session-3:2581`'s *"section before it is embedded"* is about document
chunking, and `session-4:1131`'s *"later tonight"* is about pairings distribution.

**Replacement check 6: after any MOVE, re-derive every core `§NN` from the new
order, regenerate the `.apxcard` labels from it, and hand-check those three
sites.** Nothing else in prose is keyed to a section's position.

### 3.6 The minute budget, and why it decides the shape of the MOVE list

**Under D18 the floor is 60. That is the binding constraint, and it is tighter
than it looks.**

| lesson | core now | headroom to 60 | appendix now | after spending all headroom |
|---|---|---|---|---|
| `session-1` | 67 | **7 min** | 83 | 60 + 90 |
| `session-2` | 67 | **7 min** | 83 | 60 + 90 |
| `session-3` | 70 | **10 min** | 80 | 60 + 90 |
| `session-4` | 70 | **10 min** | 80 | 60 + 90 |

Core sections in sessions 1-4 run 3 to 10 minutes, with a median of 5. So:

> **The floor permits at most one section to leave the core in `session-1` and
> `session-2`, and at most two in `session-3` and `session-4`.** Across the whole
> course the MOVE budget is **34 minutes**, and realistically **four to six
> sections.**

**This is the single most consequential number in Phase 1, and it inverts the
default expectation.** A brief that asks for "the top 15-20% of sections by
complexity" moved into the appendix is asking, at the 80th percentile of 70
sections, for roughly **14 sections**. The budget pays for **four to six**, and
only if every one of them is a core section that is FAR from advisory application
and carries no downstream dependency.

**So REDUCE is the majority remedy by arithmetic, not by preference**, and SHOULD
7 ("prefer REDUCE where the core would drop below 60") is not an edge case — it is
the ordinary case. The MOVE list in §3.7 is short because the budget is short.

Three further constraints narrow it again, all measured:

- **The immovable set.** The cold-open (`#sCold`, 8 min, identical every session,
  ratified). The named discussion block (`#s14c`, `#s12d`, `#s15`, `#sD`) — already
  appendix in all four lessons, so not a MOVE candidate anyway. The opener sections
  that host the retrieval bridge **and** the case introduction (`session-2 #s0`,
  `session-3 #s1`, `session-4 #s0`): moving one moves the case with it. And the
  last core section of each lesson, which Phase 2 step (j) makes the home of the
  closing question.
- **Check 20's three pinned figures** live in `session-1 #s1`, `session-2 #s0` and
  `session-4 #s0` — the opener sections again. A whole-section move cannot break
  check 20, but a **split** can silently disarm it (§3.5 part 5).
- **Cross-lesson bridge dependencies.** A core section in session N that a bridge
  item in session N+1 tests cannot be demoted without moving the bridge item too.
  Mapped in §3.5 part 3 and applied per candidate in §3.7.

### 3.7 REDUCE or MOVE, per flagged section

**The routing rules were fixed before any score was read** — R1 selects the
remedy (§2.3), the immovable set comes from the dependency work (§3.5), and the
budget comes from D18 (§3.6). What follows is those rules applied, not a fresh
judgement.

> ## The headline: the budget pays for four to six moves and the corpus offers **one**.
>
> Of the 14 flagged sections, **5 are appendix sections** and are a
> tiering question rather than a MOVE. Of the 9 flagged core sections,
> **5 are immovable** (openers hosting the bridge, the case and check 20's
> pinned figures, and bridge anchors the next lesson tests) and **3 are
> CLOSE to advisory application**, which under §5.2 means you cannot move the thing
> the lesson is for. **One section routes to MOVE.**
>
> The constraint that bites is not the minute budget. It is **R1**: the core of
> this course is overwhelmingly application, and application does not move.

**Verdicts, by lesson.** Every lesson has at least one flagged section.

#### `session-1` — core 67 min, headroom to the 60 floor **7 min**

| id | score | stall | min | R1 | verdict | reasoning |
|---|---|---|---|---|---|---|
| `s4` | 72.5 | 58 | 12 | FAR | TIER REVIEW | an advanced appendix section scoring high is **working as designed** (§5.3) <br> ▸ `hard_because=IDEA` — a REDUCE here must not simplify the idea into something false (constraint 10) |
| `s2` | 66.3 | 53 | 7 | FAR | **REDUCE** (immovable) | `session-2` bridge item 1 (primary) <br> ▸ `hard_because=IDEA` — a REDUCE here must not simplify the idea into something false (constraint 10) <br> ▸ **no self-check** — consider *adding* one rather than cutting (R2) |
| `s8` | 65 | 45.5 | 16 | FAR | TIER REVIEW | an advanced appendix section scoring high is **working as designed** (§5.3) <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) |
| `s10` | 56.3 | 28.1 | 5 | CLOSE | **REDUCE** (immovable) | `session-2` bridge item 3 (primary) <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) |

**Minutes moved: 0 of 7. Core 67 -> 67.**

#### `session-2` — core 67 min, headroom to the 60 floor **7 min**

| id | score | stall | min | R1 | verdict | reasoning |
|---|---|---|---|---|---|---|
| `s0` | 76.3 | 76.3 | 6 | CLOSE | **REDUCE** (immovable) | opener: hosts the retrieval bridge, the case introduction and two of check 20's pinned figures <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) |
| `s3` | 65 | 52 | 5 | FAR | **MOVE** | R1 FAR, movable, within budget. The section's subject is the mechanism that picks a word — an exponent applied to a probability set — even though the three consequence cards draw advisory conclusions from it. <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) |
| `s5` | 72.5 | 50.8 | 6 | CLOSE | **REDUCE** | R1 CLOSE. It is a purchasing decision — what the practice pays per month, which plan reaches which tier, and which tier decisions are material at the student's own volume. <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) <br> ▸ **no self-check** — consider *adding* one rather than cutting (R2) |
| `s12` | 56.3 | 0 | 5 | CLOSE | **REDUCE** (immovable) | last core section; closing question |

**Minutes moved: 5 of 7. Core 67 -> 62.**

#### `session-3` — core 70 min, headroom to the 60 floor **10 min**

| id | score | stall | min | R1 | verdict | reasoning |
|---|---|---|---|---|---|---|
| `sHY` | 61.3 | 40.9 | 16 | FAR | TIER REVIEW | an advanced appendix section scoring high is **working as designed** (§5.3) <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) |

**Minutes moved: 0 of 10. Core 70 -> 70.**

#### `session-4` — core 70 min, headroom to the 60 floor **10 min**

| id | score | stall | min | R1 | verdict | reasoning |
|---|---|---|---|---|---|---|
| `s0` | 57.5 | 57.5 | 5 | CLOSE | **REDUCE** (immovable) | opener: hosts the retrieval bridge, the case and two of check 20's pinned figures <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) |
| `s3` | 60 | 40 | 5 | CLOSE | **REDUCE** | R1 CLOSE. Its own thesis is contractual and procurement-facing — 'The tier you subscribe to does not change the model. It changes the contract. For a fiduciary, the contract is the only part that matters' (L1231) — and it closes by putting migration cost, data residency and procurement outside the chart's two axes (L1264). <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) <br> ▸ **no self-check** — consider *adding* one rather than cutting (R2) |
| `sW1` | 75 | 37.5 | 16 | FAR | TIER REVIEW | an advanced appendix section scoring high is **working as designed** (§5.3) <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) |
| `s7` | 71.3 | 23.8 | 5 | CLOSE | **REDUCE** | R1 CLOSE. Its stated purpose is to convert a machine property into practice minutes — 'That conversion is the only form in which this argument survives contact with a practice' (L1390) — and the deliverable is a priced verification burden against the adviser's own recorded baseline. <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) |
| `sWS` | 61.2 | 20.4 | 14 | FAR | TIER REVIEW | scores above the cut while tiered **standard** — candidate to re-tier one level deeper <br> ▸ `hard_because=BOTH` — a REDUCE here must not simplify the idea into something false (constraint 10) |

**Minutes moved: 0 of 10. Core 70 -> 70.**

---

#### The full §5.4 dependency check on the one MOVE: `session-2 #s3` "Temperature"

Run in full, all six parts, because a single candidate deserves the whole check
rather than a spot inspection.

| # | Check | Result |
|---|---|---|
| **1** | Explicit anchors | **FINDING — see below.** `#s3` has one inbound and one outbound relationship, and the inbound one breaks |
| **2** | Carry-forward | **clear.** No script lives inside `#s3`; nothing binds to it that a move disturbs (§3.5 part 2) |
| **3** | Retrieval bridges | **clear.** All four of `session-3`'s bridge items resolve to `session-2 #s10`, not to `#s3`. No cross-lesson dependency |
| **4** | Gate chains | **not applicable.** Struck (§3.5 part 4). `#s3`'s gate conditions only on its own widget state |
| **5** | Case figures | **clear.** Check 20's three pinned figures live in `#s0`, not `#s3`. A whole-section move cannot break it in any case |
| **6** | Section numbering | **mechanical.** `#s3` is `session-2` §01; §02-§09 each shift down one. All 29 of the file's `§NN` occurrences are in furniture steps (e) and (g) retire or regenerate, and its four survivors are legal citations |

> ##### FINDING 1 — the one MOVE orphans an appendix anchor
>
> **`session-2 #s4` (Appendix B3, standard, 16 min) carries
> `data-insert-after="s3"`.** Demote `#s3` to the appendix and B3's anchor names an
> appendix section, which the whole reflow model assumes never happens — every one
> of the 22 anchors resolves to a core section today (§4.1), and step (a)'s
> insertion algorithm depends on it.
>
> B3 has to be re-anchored in the same commit. The honest options are to point it
> at `#sCold` (keeping it beside Temperature) or at `#s5` (the next core section
> after it today). **Neither is free**, which leads directly to the second finding.

> ##### FINDING 2 — the MOVE collides with the tie-break declared in §4.1
>
> Anchor both `#s3` (Temperature) and `#s4` (B3) to `#sCold` and the declared
> tie-break — **foundational, then standard, then advanced** — orders them by tier,
> not by dependency. B3 is `standard`. Whatever tier Temperature is given, the
> tie-break, not the prerequisite, decides which a reader meets first, and **B3
> builds on temperature.** Give Temperature `advanced` and the reader gets B3
> first, which is backwards.
>
> Three ways out, none of them obviously right: give Temperature `standard` and
> let source order break the tie (fragile — it makes correctness depend on the
> thing §4.1 declared a tie-break to stop depending on); anchor B3 to `#s5` so the
> two never share an anchor (changes B3's reading position); or permit an appendix
> section to anchor to another appendix section (changes the model for one case).
>
> **This is the tie-break's first real test and it fails it.** A rule that orders
> by depth cannot express a prerequisite. **Flagged for the instructor.**

> ##### FINDING 3 — Phase 5's flagship injection targets the section being demoted
>
> `session-2 #s3` **is** the Temperature section — the lesson's §01, titled
> "Mechanism". The instructor's own named analogue, **Monte Carlo against
> temperature and sampling**, is the one Phase 5 is told to prioritise (§6.4).
> Demoting the temperature material to optional depth in the same restructure that
> injects the flagship analogue into it is at least worth saying out loud.
>
> It also removes the word "Mechanism" from `session-2`'s core arc, which is a
> curriculum change rather than a tiering change.

**Recommendation on the one MOVE: do not take it without a decision on all three.**
The alternative is a **REDUCE in place**, and after the adversarial pass it is the
stronger option on the evidence. `#s3` scores **C1 = 3** (9 undefined first-appearances in 5 minutes, 1.8 per minute) and **C2 = 2** — the adversarial pass struck its HIGH, finding that the L1225 range input, the L1229 button and the ten labelled bars at L2087-2089 let a student begin. Its 4 unrestated prerequisites and 3 notation objects are what remain.

Report §4.2 records its temperature slider as a blocked exercise turning on `raised to the power 1/T`, `renormalised`, `sharpens the distribution`, `flattens`, `samples`, `distribution`, `deterministic` and `argmax` — and **`argmax` occurs once in the whole file**, in the T = 0 readout, carrying the section's most important boundary case. **Defining those terms is a vocabulary fix, not a structural one, and it reaches 55 per cent of the score's weight.** It is available whichever way the MOVE goes, it costs no minutes, and Phase 6 is going to write those definitions anyway.

#### What the routing says about the brief

The brief asks for the top 15-20 per cent of sections by complexity to move into
the appendix. At the 80th percentile of 70 sections that is **14 sections**. The
answer this measurement returns is **one**, and the reason is not the minute floor:

| | count | why it cannot move |
|---|---|---|
| flagged sections | **14** | |
| already appendix | **5** | a tiering question, not a MOVE |
| immovable core | **4** | `s2 s0`, `s1 s2`, `s1 s10`, `s4 s0` — openers hosting bridge, case and check-20 figures, plus two `session-2` bridge anchors |
| core, R1 CLOSE | **4** | `s2 s5`, `s4 s3`, `s4 s5`, `s4 s7` — §5.2: you cannot move the thing the lesson is for |
| **core, R1 FAR, movable** | **1** | `s2 s3` |

**All 14 carry `hard_because = BOTH` or `IDEA`** — 12 BOTH and 2 IDEA, none PROSE alone. Under constraint
10 those are sections where the idea is genuinely hard, and the honest response is
to say so rather than to simplify them into something false. **Three carry
`R2 = NO`** — `s2 s5`, `s4 s3`, `s1 s2` — where the remedy is most likely
**adding a self-check**, not cutting: a hard section with a way to check yourself
rarely stalls a room, and a hard section without one stalls it every time.

#### Sensitivity: what the cut choice costs

Because the routing is deterministic, it can be re-run at the other cut.

| cut | flagged | appendix | core | immovable | CLOSE | **FAR and movable** | MOVE list |
|---|---|---|---|---|---|---|---|
| **p80 = 55.3** (this task) | 14 | 5 | 9 | 5 | 3 | **1** | `s2 #s3` (5 min) |
| p75 = 54.7 (report §5.3) | 18 | 6 | 12 | 6 | 4 | **2** | `s2 #s3` (5 min) + `s3 #s7` (5 min) |


**The two cuts are 0.6 points apart**, so the choice barely separates them — and it still changes the MOVE list from 1 to 2. That is a property of the distribution, not of the cut: after the adversarial corrections the scores compressed hard (max fell from 85 to 76.3, mean from 44.1 to 41.5), so a great many sections now sit within a point or two of each other and small cut movements swap several at once. **Do not read the flagged list as a ranking with clear daylight between adjacent rows.**

**Both candidate MOVEs orphan an appendix anchor, and that is not a coincidence.**
A core section dense enough to flag is a core section the appendix was built to
extend, so it tends to be one of the eleven core sections carrying an anchor.
`session-3 #s7` has `#s8` (Appendix C2, foundational, 14 min) anchored to it, and
moving it reproduces FINDING 1 exactly. **Any MOVE list of any length needs an
anchor-repair step**, and Phase 2 step (b) should be written to include one rather
than discovering it per section.

---

## 4. Phase 2 — structure. Sessions 1-4, one pass per file

**Static author-time reflow, report §8 Option A. Do NOT implement runtime DOM
reordering.** §8.4 measured the runtime version as FEASIBLE WITH REWORK and named
the blocker as copy rather than code. Option A gets the same reading experience
with none of the twelve runtime hazards in §8.3: the rail is built in the right
order because the source *is* the right order, arrow keys work, nothing jumps
under the cursor, print is deterministic.

**One restructure per file. All ten steps in the same pass.** Moving twice is
wasted work and risks a second round of dependency breakage.

### 4.1 Step (a) — move each appendix section into its reading position

Plain sibling `insertBefore` in the source, immediately after the core section its
`data-insert-after` names. Every appendix section is already a direct sibling of
every core section inside one `div.wrap` (§8.1), so this is the structurally
easiest possible case.

**All 22 anchors resolve.** Verified: every `data-insert-after` in sessions 1-4
names a core section in its own file. There are no orphans.

**The tie-break, declared, because §8.2.b records that none exists.** Where two or
more appendix sections share an anchor: **foundational, then standard, then
advanced**; ties within a tier fall through to existing source order.

**What the tie-break actually changes, measured:** exactly **one** pair. Of the
five shared-anchor groups, four are already in tier order in the source
(`session-1` s3 foundational before s4 advanced; `session-2` s1 and s2 both
foundational; `session-4` sW1 and sW2 both advanced, which also preserves D2's
stated *"Takes D1 first"* at `session-4:1357`). The exception is **`session-3`,
where `sHY` (advanced, line 1523) currently precedes `s5` (standard, line 1549)**
and the tie-break reverses them.

That reversal has a consequence worth stating, because it moves a defect rather
than fixing it. §8.2.d records *"`session-3:1525` (`sHY`, C5) -> `#s6`, skipping
`s5` (C1)"*. Under the declared tie-break `s5` comes first, so it is **`s5`'s**
forward link that skips `sHY`, not `sHY`'s that skips `s5`. Both bars are retired
in step (e) regardless, but a reviewer comparing this plan against §8.2.d will
otherwise think one of them is wrong. §8.2.d also records that these two bars are
*"verbatim-identical"*, and that is true as **rendered** and false as **bytes**:
`session-3:1525` writes the section marks as `&sect;` entities and `:1551` writes
them as literal `§`, so the two lines have different md5s and identical output.
**That is why no byte-level check ever caught the duplication**, and it is a small
worked example of the region discipline this repository was built on.

### 4.2 Step (b) — ~~apply the Phase 1 MOVE decisions in the same pass~~ DELETED

**DELETED 2026-08-25, not deferred. No section is relocated for complexity
reasons, in this phase or any later one.** The instruction is recorded here
rather than removed, because the reason matters more than the deletion.

**Why.** Phase 1 scored 70 content sections and returned **one** MOVE candidate
that survived four adversarial passes, and §3.7's own headline says what killed
the rest: *"The constraint that bites is not the minute budget. It is R1: the
core of this course is overwhelmingly application, and application does not
move."* Of 14 flagged sections, 5 are already appendix, 4 are immovable openers
or bridge anchors, and 4 are R1 CLOSE. The single survivor, `session-2 #s3`,
turns on one borderline R1 judgement (§12.7d), collides with three separate
things (§3.7 findings 1 to 3), and would demote the section Phase 5 is told to
inject its flagship analogue into. A restructure whose whole yield is one
contested section is not a restructure.

**Where the work went.** The REDUCE half moves to **Phase 5** and merges with
the analogue injection, because **drawing a planning analogue is the reduction
mechanism for an application-adjacent section**. A section that is hard because
a CFP has no hook for it is reduced by giving them the hook, not by cutting the
idea — and §10.3's `hard_because = IDEA` protection says the same thing from the
other side: all 14 flagged sections carry `IDEA` or `BOTH`, none `PROSE` alone.
Phase 5 is therefore **"prose pass: REDUCE + analogues + citations + vocabulary
marking"**, one lesson per chat, and §3.7's per-section verdicts are its input.

**The appendix reflow is unaffected and proceeded.** Step (a) is a reading-order
change, not a complexity decision, and nothing in it depended on step (b).

### 4.3 Step (c) — make the tier filter actually remove

`section.apx.dim` is `opacity:.32` (`session-1:793` and siblings). Change it to a
genuine removal from flow. **A dimmed section is one a reader on Foundational
reads anyway** — §8.3 failure mode 7 — and under reflow that costs them the
section rather than a scroll.

Decide and record which: `display:none`, or a collapsed one-line stub that names
what is hidden and its minutes. **Recommendation: the stub.** It preserves the
one thing `display:none` throws away, which is the reader knowing that something
was skipped, and it is the same information the contents panel in step (f)
carries. `.dim` is an overloaded class name (`.dim{color:var(--muted)}` at
`session-1:63` and `:495`), so the new rule must be written against
`section.apx.dim` specifically and not against `.dim`.

### 4.4 Step (d) — default the tier state to CORE ONLY

Today it initialises at `level=1` with `coreOnly=false` (`session-1:3030-3031`),
and the markup ships `<button data-level="1" class="on">+ Standard</button>`.
Both change: `coreOnly=true` at init, and the `on` class moves to the
`button.core[data-core]`.

> **COLLISION, and it must be resolved before step (f) is written.** The rule
> `body.core-only section.apx,body.core-only section.apxdiv,body.core-only
> a.apxlink{display:none}` (`session-1:796`) hides `section.apxdiv` in core-only
> mode. Step (f) turns `section.apxdiv` into the **leading contents panel beside
> the tier bar**. Default to core-only without changing that rule and the panel is
> `display:none` at load — the reader lands on a page whose only appendix
> affordance is the tier bar itself, with nothing telling them what they are
> skipping or what it costs in minutes. That is the A5 defect (material with no
> route in) generalised from two sections to all 22.
>
> **A SECOND consequence of step (d), and it is worse than the first.** Defaulting
> to core-only makes `session-4`'s retrieval-bridge item 3 unanswerable for the
> ordinary student, because the only place `session-3` teaches grounding against
> fine-tuning is `#s8`, an appendix section — and the `apxlink` teaser that points
> at it is hidden by the same rule. The defect exists today but is currently
> reachable by scrolling. **Step (d) must not ship without one of the three
> remedies in §3.5 part 3.**
>
> **Recommendation: drop `section.apxdiv` from the `body.core-only` hide rule.**
> A contents panel beside the tier bar that vanishes when you use the tier bar is
> not a panel. Its cards already dim per-tier through the existing id-based sync
> at `session-1:3043-3047`, which is order-independent and needs no change. The
> print rule at `session-1:797` is a separate decision: a core-only handout
> probably should not carry a contents list for material it does not contain, so
> **keep** `section.apxdiv` in the `@media print` hide.

### 4.5 Step (e) — retire the return bars and the gold teasers

Both are written for a jump-and-return model that no longer exists.

| | Count | Where | Under reflow |
|---|---|---|---|
| `.apxback` return bars | **22** (7/5/5/5) | listed at §8.2.d | **FALSE.** *"Insert between §02 Prediction and §03 Tokens"* is an instruction to a reader who is already there |
| `a.apxlink` gold teasers | **20** (7/5/4/4) | listed at §8.2.d | **MISLEADING.** *"If there is time…"*, *"skip it here if Session 3 is close"* describe a decision the reader no longer gets to make |
| `a.apxcard` "after §NN" labels | **20** | in the `.apxdiv` grid | **STILL TRUE, and kept.** The section *is* after §NN. These are exactly what a contents panel wants |
| `.apxdiv` lede copy | **4** | one per lesson | **REWRITTEN** in step (f), not retired |

**A divergence from §8.4 worth carrying:** §8.4 says *"roughly sixty authored
strings … become false, redundant or actively misleading."* Broken down, **42
need retiring** (22 bars + 20 teasers), **4 need rewriting** (the ledes), and
**20 are load-bearing for the new panel and must be kept**. "Roughly sixty become
false" overstates it, and a session working from that sentence would delete the
card labels it needs. §8's own `.apxback` count of 21 is also wrong against its
own list of 22; `EDITORIAL.md` RC-3 already records 22 as correct.

Two follow-ons, both from §8.2.f: `.apxback` **is not print-hidden in any file**,
so retiring the bars removes 22 gold bars from the printed handout as a byproduct;
and `a.apxlink` **is already** print-hidden (`session-1:765` and siblings), so
that rule becomes dead and should be removed with the teasers rather than left
pointing at nothing.

### 4.6 Step (f) — the appendix divider becomes a leading contents panel

`section.apxdiv#apx` (`session-1:1690`, `session-2:1672`, `session-3:1510`,
`session-4:1628`) moves from a trailing divider to a leading panel beside the tier
bar. Keep the `a.apxcard` grid and its existing id-based dim sync
(`session-1:3043-3047`), which is already order-independent and needs no change.

Three things change with it. Its `data-nav="— APPENDIX —"` label no longer
describes a place on the page, so it becomes a contents label. Its lede
(*"Seven optional sections. Take them in place if the room is fast, or skip them
and keep the core session intact"*) is written for a trailing block and is
rewritten for a panel. And its `span.mins` on the eyebrow stays the appendix sum,
which is what **A3** asserts.

**Note for the nav rail (step i):** the panel keeps a rail pip, and that pip now
sits at the top rather than two-thirds down. §8.3 failure mode 8 describes the
stranded version of this section; the panel is the fix, not a variant of it.

### 4.7 Step (g) — generate the appendix index from the sections

Hand-typed today, in two copies that have drifted apart in every lesson.
**Generating it resolves A1 through A5 as a byproduct and stops the two copies
drifting again.**

**23 violations today**, and the figure is confirmed against the checker rather
than taken on trust — `node scripts/verify-editorial.mjs` reports exactly:

| rule | violations | what |
|---|---|---|
| A1 | **12** | card minutes disagree with the section's `span.mins` |
| A2 | **2** | `session-3` and `session-4`: 5 appendix sections, 4 cards |
| A3 | **3** | `session-2` 58 vs 83, `session-3` 48 vs 80, `session-4` 43 vs 80 |
| A4 | **4** | all four lessons' core lede count or minutes |
| A5 | **2** | `#sHY` and `#sRSP` have zero inbound `href` |
| | **23** | |

Generate from: `count(section.slide.apx)`, each section's `span.mins`, each
section's `h2`, and `data-insert-after` resolved to the anchor's eyebrow number
for the "after §NN" label. The core lede's N and M that **A4** checks come from
`count(section.slide)` carrying neither `apx` nor `apxdiv`, and their `span.mins`
sum. Emit into sentinels on the `CASE.md` pattern so the next generation is
diffable and a hand-edit is detectable.

**The same number is written SEVEN times across each lesson, and the generator
must write all seven.** Five are checked by something; two are checked by nothing:

| # | Copy | Checked by |
|---|---|---|
| 1 | each section's `span.mins` | the source of truth |
| 2 | `.apxdiv` eyebrow `span.mins` | A3 |
| 3 | `.apxdiv` lede, "The N sections above … about M minutes" | A4 |
| 4 | `a.apxcard` "N min" labels | A1 |
| 5 | **`window.__coreMins`** | **nothing** |
| 6 | `table.tbudget` numeric rows | `validate_lesson.py` V5, `verify-migration` check 16 |
| 7 | **`table.tbudget`'s Allocated row label** | **nothing** |

Copy 7 reads *"Core 67 + appendix 83; the core alone is the one-hour version"* and
is present in all four lessons at 67 / 67 / 70 / 70. It is prose inside a table
whose arithmetic is checked and whose sentence is not — **and its second clause is
already false in `session-3` and `session-4`, which overrun the hour by ten
minutes.** Regenerating it is a D18 correction as much as an A-rule one.

**A MOVE also relocates a `tbudget` row across the core/appendix boundary.** V5 and
check 16 validate the total, which does not change, so **neither would notice if
the row stayed in the wrong group.** The generator must place the row from the
section's class, not carry it forward.

> **A1's repair direction is not obviously "the section wins", and in `session-1`
> it is wrong.** Measured, card against section, across all 20 cards:
>
> | | cards | their sections | all appendix sections | eyebrow | disagreeing rows |
> |---|---|---|---|---|---|
> | `session-1` | **83** | **83** | 83 | 83 | **2** |
> | `session-2` | 58 | 83 | 83 | 58 | 4 |
> | `session-3` | 48 | 64 | 80 | 48 | 3 (+1 missing card) |
> | `session-4` | 43 | 64 | 80 | 43 | 3 (+1 missing card) |
>
> **Sessions 2, 3 and 4 are one defect:** every card is stale-low and the eyebrow
> is stale with them. The sections are truth and "regenerate from the sections" is
> exactly right.
>
> **`session-1` is a different defect wearing the same shape.** Its cards sum to
> 83, which is correct, and only two rows disagree — as a **compensating pair**:
>
> | row | card | section |
> |---|---|---|
> | A5 `#s8` Sampler Lab | 18 | **16** |
> | A7 `#s14c` Discussion | 15 | **17** |
>
> +2 and −2, cancelling, which is why `session-1` is the one lesson that **passes
> A3**. And the card that A1 calls wrong is the one carrying the ratified value:
> `references/pedagogy.md` §s4 fixes the **named discussion block at 20 minutes,
> 15 in Session 1**. The card says 15. The section eyebrow and the `tbudget` row
> both say 17.
>
> So regenerating `session-1`'s index from its sections will **overwrite the only
> figure in that lesson that matches the ratified parameter**, and will surface a
> pedagogy-parameter violation that the drifted index has been masking.
>
> **Flagged, not resolved.** Two readings, and the instructor picks: either the
> discussion block really is 17 minutes and the parameter's "15 in Session 1" is
> stale, or the block is 15 and 2 minutes have to go back to `#s8` — which is
> where the card says they were. **Do not let step (g) decide this silently by
> being a generator.**

**One figure this task inherited from the drifted copy.** The A5 Sampler Lab is
described in report §8.3 and in this task's brief as *"the 18-minute A5 Sampler
Lab"*. **18 is the card. The section eyebrow and the time budget both say 16.**

### 4.8 Step (h) — `#sHY` and `#sRSP` get a card and an inbound link

`session-3 #sHY` (C5, 16 min) and `session-4 #sRSP` (D5, 16 min) have **exactly
zero** inbound `href` — confirmed by RC-4, by A5, and independently by an anchor
graph over both files. Every other appendix section has two. **32 minutes of
authored material currently has no route in.** `CHANGELOG.md:382-384` records
these two as the newest additions, which is why they were missed.

Step (g)'s generator produces the card. The inbound link is the card. The `apxlink`
teaser is **not** re-added, because step (e) retires that whole class.

### 4.9 Step (i) — rebuild the nav rail from the new source order

`secs` and `pips` are captured once at load and never rebuilt (`session-1:2226`
and `:2229`; `session-2:1957`/`:1959`; `session-3:1723`/`:1727`;
`session-4:1934`/`:1938`). Under a **static** reflow they are captured from the
new order and are correct by construction — this step is a verification that the
rail reads correctly, not a rewrite.

**One genuine change, session-1 only.** `session-1:2250-2253` derives arrow-key
navigation by walking `secs` in **array order**, taking the last index whose rect
is above the viewport midpoint and stepping ±1 in the array. That is only correct
while array order equals page order. Under a static reflow it stays correct,
**but it is now correct by accident** — it will break the first time anything
reorders at runtime. Rewrite it to derive position geometrically. Sessions 2, 3
and 4 have no arrow-key section navigation (§8.2.a(iii)).

Also confirm after the move: the appendix pips are no longer a contiguous gold
block at the bottom of the rail but interleaved, which is the intended reading.

### 4.10 Step (j) — the closing question

One per lesson, **the last section of the CORE**, so it lands whether or not the
appendix is shown. A single question anyone in the room can answer from that
night's material, phrased for a one-to-three-person call-and-discuss close.

**Confirmed: no appendix section's `data-insert-after` points at the last core
section in any of the four lessons.** Checked directly:

| lesson | last core section | appendix sections anchored to it |
|---|---|---|
| `session-1` | `s15` "Close" | none (`s14c` anchors to `s14b`) |
| `session-2` | `s12` "Final project" | none (`s12d` anchors to `s11` — note `s12d` and `s12` are different sections and the ids are one character apart) |
| `session-3` | `s16` "Part 1 + handoff" | none (`s15` anchors to `s14`) |
| `session-4` | `s9` "Policy homework" | none (`sD` anchors to `sCR`) |

So the closing question lands last in every lesson under the reflow, with no
appendix section after it, in every tier state.

> **COLLISION to flag, not resolve.** This task's scope line says *"Phase 2
> structure work: sessions 1-4 only"*, and step (j) then says *"For session-0.1,
> which has no live class, make it a self-check the reader answers alone."*
> `session-0.1` is out of Phase 2's scope by the first sentence and named in it by
> the second.
>
> **Recommendation: do `session-0.1`'s self-check in Phase 5, not Phase 2.** None
> of steps (a) through (i) applies to a file with no appendix, so step (j) would
> be Phase 2's only touch on that file; and a self-check is prose, which is what
> Phase 5 is. Phase 5 already includes `session-0.1`. **The instructor decides.**

### 4.11 Verification per file, before moving to the next
<!-- As executed: see §13.5 for the measured before-and-after. -->

`verify-browser`, `validate_dom`, no horizontal overflow at 1280px, every `href`
resolves, print output deterministic, Shift+U still reveals.

Add three that this plan's own findings make necessary: `verify-editorial --rules
A1,A2,A3,A4,A5` must go from 23 violations to **0**; `window.__coreMins` must
equal the measured core sum; and the `.apxdiv` panel must be visible in the
default tier state (step d's collision).

**If a file will not come back clean, revert that file, keep the others, and
report.** A working lesson you jump around in beats a broken reflow.

**Shift+U is the one thing the reflow cannot break** (§8.2.e) — it operates on
`document.querySelectorAll` at press time in all four files. It is in the check
list as a regression guard, not because it is at risk.

---

## 5. Phase 3 — sources. The mis-wired chips first, and the reason is D7b

**Generating a bibliography over mis-wired chips launders the errors into an
artifact that reads as more authoritative than the page.** D7b splits the problem:
cascades and declared-synthetic keys are mechanical (A13, A14); the residue is a
human read (B5). The mechanical half runs first, and **each remaining one is
flagged with evidence rather than silently rewired.**

### 5.1 What the checker actually catches — 5 failure lines, 7 chips

`node scripts/verify-editorial.mjs --rules A13,A14` emits **exactly five hard
failures**:

| Rule | Site | Message |
|---|---|---|
| A13 | `session-3/index.html:2044` | *3 sources named in order, **4 chips**, keys shifted by 1* |
| A13 | `session-4/index.html:1345` | *3 sources named in order, **3 chips**, keys shifted by -1* |
| A14 | `session-3/index.html:1463` | `src-case` is declared synthetic and is chipping a claim |
| A14 | `session-3/index.html:1653` | same |
| A14 | `session-4/index.html:1660` | same |

**"A13 and A14 catch 5 mechanically" is right as a count of failure *lines* and
wrong as a count of *chips* — and the failure message does not say how many chips
are wrong.**

The three A14 failures are one chip each. The two A13 cascades are not:

- **`session-3:2044`** names Magesh et al. (2025), Vectara and Anthropic in that
  order, and carries `src-vectara`, `src-anthropic-ctx`, `src-anthropic-ctx`,
  `src-anthropic-ctx`. Chips 1 and 2 are **demonstrably** on the wrong source;
  chip 3 may or may not be, and chip 4 sits on *"These are not directly
  comparable"*, which names no source at all. **Between 2 and 4 wrong chips on one
  line.**
- **`session-4:1345`** carries `src-gartner`, `src-gartner`, `src-deloitte` across
  a Gartner claim, a Deloitte claim and a third. **2 wrong.**

> **So the mechanical catch is between 7 and 10 chips, and A13's own message
> cannot resolve which.** Even the machine-caught half has to be enumerated by
> hand before it can be fixed, which is the argument of §5.2 arriving a second
> time from a different direction. **The fix unit is a chip; carry the list, not a
> tally.**

Two corrections to `EDITORIAL.md` fall out and are recorded here rather than
applied: `EDITORIAL.md:809` says A14 is violated *"at least twice"* and the
checker finds **three**; `EDITORIAL.md:779` predicts three chips at
`session-3:2044` and the file carries **four**.

**A13 has a structural blind spot.** Its N-names-against-N-chips matcher cannot
see `session-2:1525` (2 names, 3 chips) or `session-4:1318` (2 names, 2 chips
collapsed onto one key). Neither is a cascade in A13's sense and neither will ever
fail it. They are in the human-read residue by construction, not by oversight.

### 5.2 The count is 29, not 27, and the number is not the deliverable

> **Report §3.5 does not enumerate the 27.** It gives a per-lesson tally and
> verbatim detail for **two** sites; roughly fifteen exist only as a count.
> **§3c and §3e are cited by §3.5 and are absent from the document entirely** —
> which means **G3's supporting evidence lives nowhere.**

The enumeration was therefore rebuilt from the files: **29 sites** — 25
high-confidence plus 4 judgement calls — distributed `session-1` 4, `session-2` 5,
`session-3` 8, `session-4` 12.

**Where §3.5 does give a per-site claim it is verbatim accurate.** 21 of its lines
were checked against the HTML with zero discrepancies, including its sharpest
claim: **`src-daly` is wrong on 5 of its 6 uses**, exactly as stated. It is the
*counts* that are not reproducible, not the observations.

**Do not carry "27" forward as a fact. Carry the list.** The full 29-row
enumeration with file, line, current `data-src`, the claim text and the proposed
correct key is in the Phase 3 working notes and is regenerated by Phase 3 as its
first act.

### 5.3 A free mechanical recovery, and it is worth building

**A mis-wire onto a real key leaves the correct key orphaned in the same footer.**
Cross-referencing A15's 23 orphan keys against their `Used for:` clauses recovers
**7 further mis-wires mechanically** — including the one A13's
matcher structurally cannot see.

**Recommendation: build it as a new rule before the human pass**, so the human
pass starts from 13 rather than 20. Number it **A20** — A17 through A19 are the
vocabulary rules and are taken. Its proposition: *a footer key whose `Used for:`
clause names an on-page claim that currently carries a chip pointing at a
different key is a mis-wire, not an orphan.* That is mechanical, and it is exactly
the actionable half of the warning `validate_lesson.py` V4 has been emitting with
nobody able to act on it.

### 5.4 `SOURCES.md` — hand-edited at root, on the `CASE.md` pattern (D8)

One record per **work**, not per citation. Not scraping.

| Group | Fields |
|---|---|
| **Identity** | `key`, `title`, `author`, `publisher`, `link`, `published`, `retrieved`, `confidence` |
| **Live data** | `moving_target`, `figure_class`, `index_version`, `snapshot_id`, `pinned`, `recheck_before`, `divergence` |
| **Classification** | `kind`, `chip_exempt`, `disclose_on_page` — this is what makes A15's "chip **or** declared reason" checkable |
| **Usage** | `total_references` (**derived, never typed**) and `cited_by[]` with lesson, sections, lines, chips and `used_for` |
| **Scope** | what the source actually covers, which turns *"this chip is outside its source's scope"* from a human read into a check |

`BIBLIOGRAPHY.md` is generated from it, carrying per source: link, author, publish
date, date last accessed, total reference count, and every lesson and section that
cites it.

**`session-0.1` already carries 36 records shaped `{src, conf, asOf:'2026-08-20'}`
and is the working prototype for these fields.** Build from it rather than from
scratch.

### 5.5 `DATA-PULL.md` — the live-data register, as fields on the source record

The register is **fields on the source record, not a separate list**, so *"update
all live data points"* is one command rather than a reconciliation between two
files that will drift the way the appendix index drifted.

`DATA-PULL.md` itself registers **retrieval events**, not sources: an immutable
`pull_id` with `supersedes` / `superseded_by`, a line-anchored `landed_in` that a
`verify-sources.mjs` asserts against, and one ordering rule —

> **`pulled_on` ascending implies `index_version` non-descending.**

That rule is the point. The corpus violates it today, which turns G3 from a note
in a report into a failing assertion.

**Seven `figure_class` values are present in the corpus:** `price`,
`benchmark_index`, `leaderboard_position`, **`model_version`**, `vendor_policy`,
`regulatory_date`, `cumulative_counter`.

> **`model_version` splits in two and the split is load-bearing.** A *live roster*
> entry (which model is current) is a moving target. A *historical fixture*
> (GPT-4, Llama 2, named because a cited finding was measured on it) **must never
> be "updated"**, or the finding it supports is falsified. A register that treats
> both as `moving_target: true` will silently rewrite the evidence.

### 5.6 NOTE AND DO NOT RESOLVE — the session-1 §05 price attribution

**Surfaced with the evidence both ways. This is the instructor's.**

| | |
|---|---|
| **The instructor described** the `session-1` §05 price data as **livebench.ai** | |
| **The corpus attributes it to Artificial Analysis**, in five places | body note `session-1:1489`, chart label `:1463`, footer entry `:2050`, the `src-aa` key, and both §05 chips. Prices are separately attributed to Anthropic's Claude Platform Docs at `:1489` and `:2051` |
| **`grep -rniI "livebench"` returns 0 matches repo-wide** | |
| **Report §3.7 G3** already records a versioning incoherence in that exact figure | and §3.5's cited evidence sections **§3c and §3e do not exist in the document** |

The file is unambiguous about what it says. It cannot tell us what was actually
pulled — a build that fetched livebench and was written up as Artificial Analysis
would look identical from here. Logged as **`[UNVERIFIED, needs source]`** and
**not resolved.**

**The versioning incoherence is worse than G3 records**, and this part is
measurable:

| | Version string | Data |
|---|---|---|
| `session-1` | **none**; body says 17/24 July, footer says 28 July | |
| `session-2` | **v4.1.1**, "retrieved August 2026" | **identical numbers to `session-1`** under a different label |
| `session-4` | **v4.1**, "13 August 2026" | **differs from both on every shared model**: Opus 5 61 vs 63, Fable 5 60 vs 62, Luna cost per task $0.21 vs $0.07, token prices 5× apart |

**A later version string carrying identical data to an unversioned one, and an
earlier version string carrying different data, means the version is not tracking
the data.** Fixing the attribution without fixing that leaves the same defect
behind a tidier label.

---

## 6. Phase 5 — the prose pass. One lesson at a time, FOUR edits in a single pass

> **AMENDED 2026-08-25.** Phase 5 is now **REDUCE + analogues + citations +
> vocabulary marking**. The REDUCE work arrives from the deleted Phase 2 step (b)
> (§4.2), and it belongs here rather than there because **drawing a planning
> analogue is the reduction mechanism for an application-adjacent section**. The
> two are one edit on the same paragraph, not two passes over it. §3.7's
> per-section verdicts are Phase 5's input: 14 flagged sections, every one of
> them carrying `hard_because = IDEA` or `BOTH`, which under §10.3 means the
> honest remedy is a hook rather than a cut. Three of them carry `R2 = NO`
> (`s2 #s5`, `s4 #s3`, `s1 #s2`) where §2.3 says the remedy is more likely
> **adding a self-check** than removing anything.


**Three separate passes over the same prose is three times the risk.** Chats 5-9,
one lesson each, parallelisable in worktrees because nothing crosses a file
boundary. The Wolfram half **skips `session-0.1`**, which has no Wolfram
references (RC-2: one named mention, zero citations).

### 6.1 Edit one — Wolfram section citations under the D7 rule

Form: **`(Section Name, Wolfram 2023)`**, with the URL living **once** in the
footer entry, never inline. A11 validates the name against the locked 17.

**Condition (i) is expressible, and here is exactly how.** Report §2.3's
per-file tables carry a **seventh and last column headed `Conf`** holding a bare
`H` / `M` / `L`. The literal word `HIGH` appears **only in the prose legend** at
report `:412-415`, never in a table row. So condition (i) means **column 7 equals
`H`**, read **by column index**.

> **Do not regex the row for `H`.** §2.3 transcribes the corpus's own confidence
> chips into the "On-page text" column as bare letters, so `session-1:1362`'s row
> ends *"Assigned reading. H"* and a row-level match fires on the wrong thing.

**Measured against both conditions:**

| Lesson | §2.3 rows | already-cited | pass (i) `H` | of which `UNMAPPABLE` | pass (i) with a real name | **pass (i)+(ii)** | to checklist |
|---|---|---|---|---|---|---|---|
| `session-1` | 44 | 2 | 16 | 2 | 14 | **4** | 38 |
| `session-2` | 25 | 4 | 11 | 2 | 9 | **0** | 21 |
| `session-3` | 18 | 5 | 10 | 2 | 8 | **8** | 5 |
| `session-4` | 22 | 0 | 13 | 8 | 5 | **0** | 22 |
| **total** | **109** | **11** | **50** | **14** | **36** | **12** | **86** |

**Twelve references are auto-applicable. Eighty-six go to the instructor.**

`session-1`: lines `1816`, `2522`, `2544`, `2546`, all to *The Concept of
Embeddings*, anchored to `session-3:1147` and `:1175`.
`session-3`: lines `1132`, `1134`, `1157`, `1159`, `1784`, `1790`, `1832` to *The
Concept of Embeddings*; `1585` to *Beyond Basic Training* via `session-3:1597`.

**The yield is smaller than twelve, and this is the finding that matters.** The
eight `session-3` rows sit inside sections that **already carry a `.src` note
naming that same section**, so applying there adds a duplicate rather than
closing a gap. **The four `session-1` rows are the entire yield against the D6
gap** — and `session-1` is one of the two lessons RC-1 records as carrying **zero**
claim-attached citations. Phase 5 should apply all twelve, and should expect four
of them to change anything.

**Three traps, all measured:**

- **14 rows are `Conf=H` with a proposed section of `UNMAPPABLE`.** They pass
  condition (i) with nothing to apply. Filter them before counting.
- **`Inside ChatGPT` appears nowhere in the corpus** — five `H` rows fail (ii)
  immediately. **`Where Do the Probabilities Come From?` appears once**, in
  `session-2:1919`'s bibliographic footer entry, not attached to a claim — six
  more fail.
- **`CASE.md` contains zero occurrences of any locked name**, so it is not a
  source for condition (ii).

**The baseline comes from RC-1, never from §2.3's "already cites" column.**
§2.3's 11 already-cited marks and RC-1's 11 sites are **not the same eleven**;
that both are 11 is a coincidence. `EDITORIAL.md`'s three recorded defects were
re-checked against disk and **all three are confirmed**:

| Claim | Disk |
|---|---|
| §2.3 mis-marks `session-1:1319` as already-cited | The `.wolf` block at `:1319` carries **no** section name. §2.3 fills it with `It's Just Adding One Word at a Tim`, truncated mid-word, carried down from `:1316` three lines above |
| §2.3 mis-marks `session-2:1708` as already-cited | The chart `.csub` at `:1708` carries **no** section name. The name is at `:1711`, three lines below. Same carry-down, same truncation |
| §2.3 mis-marks `session-2:1919` as unmapped | `:1919` names **three** locked sections in its "sections used" clause |

§2.3 additionally **omits `session-1:2021` entirely** — it appears nowhere in its
table. Two further report defects found while checking: report `:409` says *"18
valid names"* against the LOCKED **17**, and §2.2 `:376` credits `session-2:1657`
with *Meaning Space and Semantic Laws of Motion* where disk reads *the opening of
"Meaning Space."* RC-1 is right in both cases.

**One row needs an instructor decision and must not be auto-applied.**
`session-2:1692` is `Conf=H` for *It's Just Adding One Word at a Time*. Its
candidate anchor at `:1711` is nineteen lines below **inside the same
`section id="s1"`**, but scoped to the chart's n⁻¹ curve-shape claim while `:1692`
describes the interactive ranked-candidate panel. Scored **FAIL** on "same claim".
Reading condition (ii) as "same lesson section" rather than "same claim" would
make the total 13. **Flagged, not decided.**

**`docs/wolfram-mapping-review.md`**, one line per reference, 86 lines plus a
header, in this form:

```
[ ] session-1:1362  §04  "three runs, three different dates"  ->  Where Do the Probabilities Come From?   conf M
```

file:line, the on-page section number, a short quotation of the claim, the
proposed section name, and the report's confidence letter. The instructor
approves in a single pass. Nothing on that list is applied before it is ticked.

### 6.2 Edit two — `data-term` marking for every vocabulary term

D11: mark the term in prose, let the build decide which mark is first. This edit
places the marks; Phase 6 builds what they resolve to. A17 fails on a
`data-term` with no record, so marking must not outrun `VOCABULARY.md` — if
Phase 6 slips, the marks land with A17 **DISABLED** and are switched to HARD
together.

### 6.3 Edit three — the planning-analogue injections from report §6.2

**The count is right and the content is not. This is the most important thing in
this section.**

**96 verified**, counted as table rows per lesson block: `session-1` 16 (report
lines 1508-1523), `session-2` 18 (1529-1546), `session-3` 18 (1552-1569),
`session-4` 21 (1575-1595), `session-0.1` 23 (1601-1623). The headline arithmetic
reconciles too (103 − 7 = 96). But 96 counts **lesson × concept attachments, not
distinct concepts** — fine-tuning/grounding occupies six rows, confidence chips
five, embeddings four.

**§6.2 is truncated, and differently from §6.1.** `EDITORIAL.md` records §6.1 as
losing whole rows. §6.2 loses **no** rows and instead **hard-caps every cell**:

| Column | Cap | Rows at cap | Truncation marker |
|---|---|---|---|
| ML concept | 44 chars | 82 / 96 | **none. Silent, mid-word** |
| § section | 11 chars (9 of content) | 31 / 96 | **none. Silent** |
| Planning analogue | 111 chars | 86 / 96 | `…` |
| **Strength** | — | **0 / 96** | **complete** |
| **Bridge sentence** | 181 chars | **57 / 96** | `…` |

So of the three things §6.2 is said to carry per entry: **strength ratings are
96/96 complete** (78 STRONG, 17 PARTIAL, 1 WEAK) and are the only intact field;
**drafted bridge sentences are 39/96 complete and 57/96 cut mid-sentence**; and
attachment is complete at lesson level but **31 of 96 section cells are cut at
nine characters**, losing section titles and, at report lines 1540, 1554 and 1556,
hiding extra section ids inside a cut mid-list. Four § cells are not section ids
at all: `SCRIPT li` (1521, 1522), `all secti` (1562), `FOOTER` (1590).

**Consequence for Phase 5: 57 of the 96 bridge sentences do not exist in a usable
form and must be drafted, not copied.** A session that treats §6.2 as a
copy-and-paste source will paste half-sentences into four lessons. Where a bridge
sentence is cut, the entry is still useful — the concept, the analogue and the
strength survive — but the sentence is written fresh, against B1's register.

**The "six worth acting on first" table at report 1491-1498 does not reconcile
with the 96.** Prompt injection (`session-4` §05) appears **nowhere** in the
inventory: zero matches for `injection` across report lines 1505-1624. "Tier
selection (S1 §05-§07)" exists only as a `session-2` `s5` PARTIAL row. Prioritise
against the Phase 1 scores in §3, not against that table.

**Coverage against the sections Phase 1 scores highest:** of sixteen candidate
section ids checked, **13 have at least one §6.2 entry, 32 entries in total, and
only 12 of the 32 carry a complete bridge sentence.** Three have none at all:
`session-1 s11` (Practice cost), `session-2 s0` (Session map), `session-3 s12`
(Consent). Best served is `session-4 s3` (4 entries, 3 complete); worst are
`session-3 s7` (3 entries, 0 complete), `session-2 s10` (2, 0), `session-1 s10`
(1, 0) and `session-4 s8` (1, 0).

### 6.4 Monte Carlo against temperature and sampling — the premise, measured

**The substance holds. The location does not.**

| Carried in | Measured |
|---|---|
| The corpus mentions Monte Carlo **exactly once** | **Twice**, both in `session-1`; zero in the other five HTML files and in `CASE.md` |
| …in **session-1's footer time table** | **Neither is in the footer.** The `<footer>` opens at `session-1:2014` and its `table.tbudget` "Instructor minute budget" contains no Monte Carlo |
| …**never in §02 where temperature is taught** | **Confirmed.** `id="s2"` spans 1314-1369 and has **zero** matches for `monte` against three for `temperature` |

Where the two actually are:

- **`session-1:1664`** — inside `id="s15"` (Close, opens 1618), in the `<h3>`
  "CFP Board principal knowledge topics touched tonight" Domain/Where table.
- **`session-1:1787`** — inside `id="s4"` (**Appendix A2, Fitting a Model**, opens
  1760), and it is **an undisclosed, fully drawn analogue**:
  `<div class="talk"><span class="th">Planning parallel — discussion</span>Every
  Monte Carlo engine you run is a model with knobs…`. It is drawn against **model
  fitting**, not against temperature or sampling.

Report §6 contradicts itself on this: §6.1 line 1389 calls the Monte Carlo talk
block *"the one application beat"* while §6.2 lists Monte Carlo as an undrawn
analogue.

**So the instructor's own example is already drawn once, in the wrong place, and
in an appendix section.** The Phase 5 injection is still owed: Monte Carlo against
**temperature and sampling** in `session-1` `s2`. When it is written, the existing
`s4` talk block should be read first so the two do not repeat each other, and the
`s4` block should say which of the two it is.

---

## 7. Phase 4 — instructor notes

Extract **every** instructor note into `instructor-notes/session-N.md`, one file
per lesson, all six lessons.

**Bullets only, never prose.** Four kinds, in this order per section:
presentation flow; facts; statistics; direct quotations with their source. Written
to be read from a second screen while teaching, which means a glance has to land
on the right line — no paragraphs, no preamble, no restating the slide.

**Remove every trace from the lesson files.** The string `instructor note` must
not appear anywhere a student can see, and "anywhere" is wider than the body:

| Region | Why it is in scope |
|---|---|
| **R1** body prose | the obvious case |
| **R2** script string literals | student-visible; the region classifier over-includes here by design, which is the safe direction |
| **R3** attribute values | `data-nav`, `title`, `aria-label` |
| **R5** comments | a reader who views source is a reader |
| Shift+U panels | the override reveals them; `verify-browser` presses it |

**Not in scope:** **R6**, the `CASE:BEGIN`/`CASE:END` span. If an instructor note
lives inside it, the fix is upstream in `CASE.md` and `build-case.mjs` must exit 0
afterwards, one edit at a time.

**Why this phase runs after Phase 2 and not before.** Notes are extracted per
section and the destination file is keyed by section. A section that has moved has
to be found again, and a note extracted against the old order lands under the
wrong heading.

**Line inventory deferred.** This session did not count instructor-note
occurrences, deliberately: the count is keyed to section ids and locations, and
locations do not survive Phase 2. Phase 4 counts them itself, against the post-
Phase-2 files.

**Verification.** After extraction, `grep -ri "instructor note"` across
`index.html` and all five lessons must be **empty**, and `verify-browser` must
still pass with Shift+U pressed. Add the string to the standing purge list in
`MAINTAINING.md` §"Standing purge list" so it cannot come back, in the same commit.

---

## 8. Phase 6 — vocabulary

**`session-0.1` is the priority, and it is first.** It carries **50 undefined
terms and 7 HIGH-severity blocked exercises** (report §4.1, §4.2) and it is the
one file with **no instructor in the room to answer a question**. D20 puts it out
of scope for the appendix/tier architecture only; for A17-A19 it is the most
in-scope file in the repository.

### 8.1 The shape

`VOCABULARY.md` at repo root as the single hand-edited source, on the `CASE.md`
pattern exactly: source file, generator (`scripts/build-vocab.mjs`), sentinels
(`VOCAB:BEGIN` / `VOCAB:END`), hash guard (`scripts/verify-vocab.mjs`).

`verify-vocab.mjs` reports **the same three failure modes `verify-case.mjs`
reports**, and reports them in the same words so a maintainer reading a failure
does not have to learn a second vocabulary: **no sentinels**; **block was
hand-edited** (recorded `sha256` mismatch); **stale against the current build**.

**Both surfaces come from one record (D10):**

1. the **`(?)` tooltip at first occurrence per section**, working on **hover and
   tap**;
2. a **per-section vocabulary box**.

**The end-of-lesson table is DROPPED by instructor decision.**

### 8.2 A19's read-more links — resolved, and the answer is the per-section box

A19 asserts that every `read_more` value names a `src-…` key live in the footer of
every lesson carrying that term. The design that produced it put read-more links
in the end-of-lesson table, and that table is gone. **Two surfaces survive and the
link goes in the box, not the tooltip.**

**Decision: read-more lives in the per-section vocabulary box. A19 survives with
its population changed from "table" to "box" and its proposition untouched.**

Three reasons, in order of weight:

1. **A link inside a hover affordance is a usability trap on touch.** The tooltip
   must work on hover *and* tap. On hover, reaching a link inside the tooltip
   means moving the pointer into a panel that dismisses on pointer-out; on tap,
   the first tap opens and the second has to hit a link inside a panel that may
   sit under the thumb. The box has none of that: it is static, it is in flow, and
   a link in it is a link.
2. **The tooltip has a budget and the link would spend it.** Two sentences
   maximum, no jargon, second sentence an instance an advisor would recognise. A
   read-more link is a third element competing with the one thing the tooltip is
   for.
3. **A19 is the join to the bibliography** and `EDITORIAL.md` calls that join the
   reason the vocabulary work and the `SOURCES.md` work have to land in that
   order. Retiring A19 instead would sever the join and waste the ordering that
   Phase 3 exists to establish.

One consequence to build for: a term appearing in three sections gets three box
rows but has **one** record, so the read-more resolves once per record and A19's
population is records, not renderings. That is already how A18 is written.

### 8.3 The register, and it is enforceable

**Two sentences maximum, enforced at build time on the source record** — A18, in
the generator, so a third sentence never reaches a lesson.

The register, with the ratified example:

> **"A 2-gram is a letter pair, and Q is nearly always followed by U."**

**No jargon inside a definition.** The second sentence gives an instance an
advisor would recognise. B2 judges the writing; A18 counts the sentences.

### 8.4 Constraints, all pre-existing and all enforced today

| Constraint | Enforced by |
|---|---|
| No `localStorage`, `sessionStorage`, `indexedDB` or cookies | `validate_lesson.py` **V3**, `verify-migration.mjs:207` |
| Plain ES5 except `fetch` | corpus convention; the live-model console is the only exception |
| Model-adjacent text via `textContent`, never `innerHTML` | corpus convention |
| Byte-identical across lessons, inside the managed CSS fence and one shared script block | `verify-style.mjs`, the md5 pairing in the gate |

The tooltip is *"a small amount of careful code, not a library"* (report §4.N's
scope warning). It lives inside the `restyle_sweep.py`-managed fence and one
shared script block, on the same discipline as the `LM:` / `LMBOX:` / `LMSTYLE:`
console fences.

### 8.5 Scope note carried from Phase 1

The **413-term inventory with per-term first-occurrence line numbers does not
exist in this repository.** Report §4.4 says *"Full records for all 413 terms are
in the workflow output"*; that output was never committed. What is on disk is
§4.1's per-lesson totals, §4.2's HIGH-severity blocked-exercise tables with
section ids and line numbers, and roughly sixty drafted definitions in §4.4.
**Phase 6 rebuilds the inventory.** It is the largest single piece of work in the
phase and it must be budgeted as such rather than discovered.

D12 is still deferred: **the instructor prunes the term inventory.** Phase 6
produces the inventory and the pruning pass is the instructor's.

---

## 9. Phase 7 — verify and record

**Re-derive every count `EDITORIAL.md` states that this work invalidated.** Not
"check them" — re-derive them from the files, the way RC-1 to RC-4 were derived,
because a count carried forward from a superseded state is the defect this
repository keeps finding in itself.

At minimum, and this list is a floor:

| What | Why it moves |
|---|---|
| RC-1, the 11 existing Wolfram citations | Phase 5 adds up to 12 more |
| RC-2, Wolfram named mentions per file | Phase 5 edits Wolfram prose |
| RC-3, the exemption-class counts | Phase 2 step (e) retires 22 `.apxback` bars, which carry 22 Class D dashes |
| RC-4, the appendix index cards | Phase 2 step (g) regenerates the index |
| A1-A5's "violated today" figures | 23 today, 0 after step (g) |
| A8 / A9 / R11 baselines in `scripts/editorial-baseline.json` | retiring `.apxback` removes R11 blocks; **ratchets are lowered by hand, never raised** |
| The `.apxback` = 22 and `a.apxlink` = 20 figures | both retired to 0 |
| `window.__coreMins` × 4 | any MOVE changes it |
| The `session-3` A8 baseline | `.apxback` bars are R11; removing them changes the R11-complete figures |

**Re-baseline by the documented procedure**, `MAINTAINING.md` §"Re-baselining
after a sanctioned cleanup": make the cleanup; confirm the change was intended to
move a counted figure; read the new numbers off the failure text; edit
`scripts/editorial-baseline.json` **downward**; `test-editorial-regions.mjs` must
pass because T7 reads the baseline; **commit the baseline change on its own** so
the diff shows exactly which figure moved and by how much.

Then update `MAINTAINING.md` and `CHANGELOG.md`, run `build-changelog.py` and the
sweep, and take the full suite green.

**Three things Phase 7 must decide rather than inherit:**

1. **Whether `verify-editorial.mjs` is promoted into the pre-push gate.** D16's
   burn-in ends when the exemption list stops changing. After Phases 2 through 6
   it will have changed a great deal, so the honest answer may be "not yet".
2. **Whether `validate_lesson.py` C2 is corrected or retired upstream.** It is
   owed when A8 and A9 go hard, it lives in the skill and not this repo, and
   `EDITORIAL.md` records that it will be forgotten if it is not written down.
3. **What to do about `validate_lesson.py` V2** — see §11.3. It is the reason the
   documented pre-push gate does not run clean today.

---

## 10. The constraints every later phase runs under

Ranked. A MUST is not a preference and does not yield to convenience.

### 10.1 MUST

1. **Never run a repo-wide character substitution.** 236 of 322 `&mdash;`
   candidates sit inside JS string literals. **This prohibition predates this task
   and is permanent.** Em-dash policy is explicitly **out of scope**; **D1
   stands** — existing student copy keeps its dashes, newly authored text uses
   none, and there is no retrospective sweep.

2. **Never edit inside `CASE:BEGIN` / `CASE:END` in a lesson file.** The span is
   hash-guarded by `verify-case.mjs` and overwritten by the next
   `inject-case.mjs`. There are exactly **three** upstream homes and the right one
   depends on which string you are fixing:

   | Where it renders | Real source |
   |---|---|
   | Case block prose | `CASE.md` |
   | The case spine paragraph | **`scripts/inject-case.mjs:57-60`**, a JS string literal |
   | The flowchart SVG caption | `scripts/case-flowchart.html` |

3. **Run `node scripts/build-case.mjs` to exit 0 after every `CASE.md` edit, one
   at a time, never batched.** 25 dashes in that file are parser anchors — 14
   section-index, 10 figure-extraction em, 1 en — and **`build-case.mjs:87` is one
   dash serving as both an empty-cell placeholder and an anchor**
   (`/Prior occupation \| — \| ([^|]+?) \|/`). There is no way to look at a dash in
   `CASE.md` and tell which it is. *"A pattern that no longer matches is a hard
   failure, not a warning"*, and the failure surfaces in the generated artifacts
   rather than in the file you edited — which is why batching hides it.

4. **Change no case figure, no arithmetic, no answer key, no interaction logic.**
   Where content moves, **re-derive every threshold that is a property of the text
   rather than carrying it forward.**

5. **Flag, do not resolve.** Where two instructions collide, where a move is
   genuinely ambiguous, or where a rewrite would change what a sentence claims:
   halt, present what collides with evidence each way, and recommend. **The
   decision is the instructor's.** This plan carries seven such flags: §1.1 the
   band, §3.6 the MOVE list, §4.4 the core-only / contents-panel collision, §4.10
   `session-0.1`'s closing question, §6.1 `session-2:1692`, §5.6 the Artificial
   Analysis / livebench attribution, and §12 the whole red-team list.

6. **Never fabricate a citation, a section name, a statistic or a date.** Where a
   figure cannot be verified, write **`[UNVERIFIED, needs source]`** in the
   declared register form (A16 is register-aware: the lessons use
   `[UNVERIFIED, needs source]`, `CASE.md` uses `[UNVERIFIED — needs source]`).
   **A visible gap beats a plausible number.**

### 10.2 SHOULD

7. **Prefer REDUCE over MOVE where the core would drop below 60 minutes** (D18).
8. **Preserve on every edit:** the CSS and typographic system, the JavaScript
   architecture, verified data arrays, confidence labels, source lines, chart
   implementations.
9. **The audience is CFPs learning to use AI in practice, not machine-learning
   students.** Where two phrasings are both correct, **the one a CFP reads faster
   wins.**

### 10.3 PREFERRED

10. **Where a section is hard because the idea is hard rather than because the
    prose is dense, say so instead of simplifying it into something false.** The
    scoring in §3 carries a `hard_because` flag per section for exactly this, and
    a section marked `IDEA` is protected from a REDUCE that would flatten it.

---

## 11. The verification surface, and its baseline

> **This section is the PRE-PHASE-2 baseline and is kept as the measurement it
> was. §13.5 carries the same table measured after Phase 2.** The headline change
> is `verify-editorial`: **28 hard failures down to 5**.


**Every later phase reports exit codes against these.** Measured on
`claude/repo-restructure-phase1` at the commit this plan lands on, with no lesson
file edited.

**Run twice, before and after this session's `EDITORIAL.md` and
`verify-editorial.mjs` edits. Every exit code is unchanged and every log is
byte-identical except seven lines** — the `SKIP A1` … `SKIP A7` messages, which
now print D20's reason instead of D14's. That is the whole diff, and it is the
intended one.

| Check | Exit | Status |
|---|---|---|
| `verify-case.mjs` | **0** | clean |
| `verify-migration.mjs` | **0** | clean |
| `verify-style.mjs` | **0** | clean |
| `verify-browser.mjs` | **0** | clean |
| `inject-case.mjs --check` | **0** | clean |
| `test-editorial-regions.mjs` | **0** | clean, 9 tests |
| `verify-editorial.mjs` | **1** | **expected.** 28 hard, 31 advisory. Advisory-only under D16; **not in the gate** |
| `validate_dom.js` × 5 | **0** | clean, all five lessons |
| `validate_lesson.py` × 5 | **1** | **pre-existing, all five.** See below |
| `restyle_sweep.py --check` | **1** | **expected and documented.** See below |

### 11.1 `verify-editorial.mjs` = 1, and it matches the register exactly

28 hard failures: **A1 × 12, A2 × 2, A3 × 3, A4 × 4, A5 × 2, A13 × 2, A14 × 3**.
Every figure reproduces `EDITORIAL.md`'s "violated today" column, and A14's
recorded `>= 2` resolves to **3**. 31 advisories, all A15, all footer keys with no
chip and no `data-nochip`. **Phase 2 step (g) takes A1-A5 from 23 to 0. Phase 3
takes A13 and A14 to 0 and gives A15 somewhere to put its reasons.**

### 11.2 `restyle_sweep.py --check` = 1 is correct and must not be "fixed"

It fails on exactly two files: `scripts/case-extract.html` and
`scripts/case-flowchart.html`. They are HTML **fragments**, not documents;
`inject-case.mjs` copies them into every lesson, so a style fence there would
embed the whole 524-line stylesheet six times over. `MAINTAINING.md` documents
this and commit `f5bf47b` records the reasoning. **`verify-style.mjs` is the
repo's check** and it asserts something stricter: every lesson current, **and**
the only fenceless files in the tree are exactly those two. Use the raw sweep to
**write** the fence; use the wrapper to **check** it.

### 11.3 `validate_lesson.py` = 1 on all five lessons, and V2 is the reason

**The documented pre-push gate has never run clean as written**, and this is a
finding, not a regression from this work.

`MAINTAINING.md` says of the three skill-side checks: *"All must exit 0."* They do
not. `validate_lesson.py` V2's regex is

```python
(?:href|src)\s*=\s*["'](https?://[^"']+)["'] | @import url(...) | url(...)
```

which matches **any `href`**, including a plain `<a href>`. Every footer citation
hyperlink is therefore reported as *"external request outside the fonts
exception"* — 6 in `session-1`, 6 in `session-2`, 5 in `session-3`, 5 in
`session-4`. **An `<a href>` makes no request.** `MAINTAINING.md`'s own fallback
grep gets this right: it matches `<(link|script|img|iframe)` only.

So a lesson cannot both cite its sources with a link and pass V2 — and
`CHANGELOG.md` records *"added citation hyperlinks to Session 4's footer"* as an
improvement. **This is the third instance of the pattern this repository keeps
finding in itself: a rule that reads plausible and fires on the exact case it
exists to protect.** The other two are the 236 `&mdash;` substitutions that would
have corrupted code, and the two rules that shipped blind to the case they were
written for.

The other `validate_lesson.py` failures, recorded so a later phase does not
mistake them for its own damage:

| Rule | Lessons | What |
|---|---|---|
| V4 | 1, 2, 4 | `.conf` chips without `data-src`: 11 / 8 / 19. **A15 and Phase 3 own this** |
| V6 | 1, 2, 3, 4 | distinct interactions 18 / 16 / 17 / 18 against the ratified band of **13-15** |
| V6 | 1, 2 | same component type in consecutive sections: `work-along-gate` |
| V5 | 0.1 | *"segments 120, allocated cell 120, target 150"*. **Correct behaviour under D20** — the 150 target is a property of the live evening block and `session-0.1` has none |

**V2 and the V6 band are not this task's to fix** — both live in the skill, not
this repo. They are recorded here so Phase 7 can decide, and so no later phase
reads a red `validate_lesson` as something it broke.

---

## 12. Red team — auditing this measurement as an adversary would

**Named, not fixed silently.** Where a finding is a weakness in the method rather
than an error in a number, it is stated as a weakness.

### 12.1 The rubric's heaviest component rests on a rebuilt inventory

**C1 is 30 per cent of the score, and its declared source does not exist on disk.**
Report §5.1 sources C1 from "item 4", and report §4.4 says *"Full records for all
413 terms are in the workflow output"* — that output was never committed. So the
per-term first-occurrence map C1 is defined against was **rebuilt for this pass**,
not read.

What that means concretely: the 30 per cent component is reproducible **from this
plan's evidence table**, and is **not** independently corroborated by the report.
The reconciliation against §4.1's per-lesson totals (§3.3) is the only external
check available, and it is a check on magnitude, not on attribution.

**What would change it:** committing the 413-term inventory, or accepting the
rebuild as the inventory. Phase 6 has to build it anyway, so the honest sequence
is that Phase 6's inventory supersedes this one and the scores are re-derived once
against it.

### 12.2 C1's ordering basis is a declared choice, and it moves a large share of the attributions

"First appearance in the lesson" is order-dependent. §5.1 never says which order.
This pass declares the **post-reflow reading order** (§2.4a) because it survives
Phase 2 step (a), where source order would not.

**The exposure, measured on the final corrected counts.** Under the reflow order,
first appearances attributed to appendix sections are `session-1` **41 of 86, which is 48 per cent** and
`session-2` **17 of 61, which is 28 per cent**. In
source order every appendix section sits after every core section, so each of
those attributions either stays put (the term appears nowhere else) or moves to a
core section (the term also appears there). **Almost half of `session-1`'s C1 evidence, and over a quarter of `session-2`'s,
sits on the ordering choice.** That is the single
largest methodological lever in the rubric and §5.1 does not mention it exists.

**What would change it:** scoring both orders and reporting the delta. Not done
this session; it doubles the measurement for a component whose evidence base is
already provisional (12.1).

### 12.3 C1 is perturbed by the very move it justifies

A MOVE changes reading order, which changes which section holds a term's first
appearance, which changes C1, which is 30 per cent of the score that recommended
the move. **The score that justifies a move does not survive it.**

This is not a reason to distrust the ranking — the ranking is a statement about
the corpus as it stands — but it is a reason to **re-derive after Phase 2 rather
than treating the flagged list as durable**, and it is why the flagged list is
presented as an input to a curriculum decision rather than as a finding about
sections.

### 12.4 The check that was run is not the check §5.4 specified

Two of §5.4's five parts changed under measurement:

- **Part 4 (gate chains) is struck.** Its factual premise is false in both halves
  (§3.5). Running it as written would have produced a dependency the corpus does
  not have, and — worse — would have *looked* like coverage.
- **Part 6 (section numbering) was added.** §5.4 has no check for it, and it is
  the largest surface by raw count (116 occurrences).

So a reader comparing this plan's dependency work against §5.4 will find it does
not correspond one-to-one, and that is deliberate. **Part 2 (carry-forward
artifacts) is the weakest of the surviving four**, because it is JavaScript
variable reads with nothing in the build watching them; it is agent-derived and
was not exhaustively proved.

### 12.5 The report's counts do not survive re-derivation, and that generalises

Every report figure this session re-derived came back different or unsupported:

| Report | Says | Measured |
|---|---|---|
| §5.5 population | 62 / 58 | **86 / 82** |
| §5.1 normaliser | ×5 -> 0-100 | **×25** |
| §5.1 anchors | "fixed anchors" | **never defined** |
| §5.4 part 4 | discussion sections reference every appendix section | **false, both by anchor and textually** |
| §3.5 mis-wired chips | 27, said to be enumerated | **not enumerated; 29 on rebuild** |
| §6.2 analogues | 96 with a drafted bridge each | **96 rows, but 57 bridge sentences truncated mid-sentence** |
| §8 `.apxback` | 21 | **22**, per §8's own list |
| §2.3 already-cited | 11, matching RC-1 | **11, but not the same 11** |
| §2 valid names | 18 (report `:409`) | **17** |
| §8.3 A5 Sampler Lab | "18-minute" | **16** on the section and in the time budget |

**The pattern is that the report's *observations* hold and its *counts* do not.**
Where §3.5 gives a per-site claim it is verbatim accurate (21 of 21 checked); it
is the tallies that fail. Later phases should treat the report as a source of
leads, verify every figure it cites, and never propagate one.

**One consequence for this plan:** its own figures are stated with the measurement
that produced them, so the next session can re-run rather than re-trust.

### 12.6 `session-4`'s MOVE freedom is borrowed from a lesson that does not exist

The cross-lesson bridge check constrains `session-1`, `session-2` and `session-3`
because each has a successor whose bridge tests it. **`session-4` has no successor
in this repository, so nothing constrains it — and that is an artifact of the
repository, not of the course.**

**"Session 5" is referenced 15 times** across the hub and sessions 2, 3 and 4
(hub 1, `session-2` 5, `session-3` 4, `session-4` 5) as the session where the final
project is submitted and graded. There is no `session-5/` directory. The hub links
five lessons: `0.1`, `1`, `2`, `3`, `4`.

**So `session-4` looks like the lesson with the most MOVE headroom and the fewest
dependencies, and it is the one whose dependencies have not been written yet.**
When session 5 is built it will carry a retrieval bridge on the Sessions 2+
pattern, testing session-4's mechanisms — and any session-4 core section demoted
now becomes a candidate reverse hazard then, of exactly the kind already found at
`session-3 #s8`.

**Recommendation: hold session-4's MOVE list to sections that are FAR from
advisory application *and* would still be an odd thing for a session-5 bridge to
test.** Or defer session-4's moves until session 5 exists. **The instructor
decides**; the point of recording it is that a later session reading only the
dependency table would see four clean slots and take them.

### 12.7 The move-specific red team

Four questions, answered per section rather than in aggregate. **There is one
MOVE**, so three of the four are short — and that is the finding, not an omission.

#### (a) Sections proposed for a move whose downstream references could not be fully verified

**One candidate, `session-2 #s3`, and its references were verified — but only
after two false alarms, both of which are worth recording because the next
session will hit the same two.**

| Suspected reference | Verdict |
|---|---|
| `session-2:1680` — `apxcard` label *"B3 · 10 min · **after §01**"* | **furniture.** Regenerated by step (g). (It also says 10 min against B3's 16 — one of A1's twelve) |
| `session-2:1688`, `:1729`, `:1760` — `.apxback` bars naming §01 | **furniture.** Retired by step (e) |
| `session-2:2737` — script string *"the majority answer … is the one **the slider below** is built to test. Run it at 0.8"* | **intra-section.** `#stanceVote` is at `session-2:1212`, **inside `#s3` itself** (1205-1253). The string and the slider move together |
| `session-2:1897` — footer `tbudget` row *"01 · Mechanism │ Temperature and Output Variance │ 5"* | **REAL.** See (c) |

**What was checked and came back clean:** the anchor graph in both directions, the
carry-forward code half (no script inside `#s3`), the cross-lesson bridges, the
case figures, and an explicit sweep of every later line in the file for
`temperature`, `the slider`, `§01` and *"you ran / set / moved"*.

> **The gap I closed while checking, stated because I had not planned to close
> it.** §3.5 part 6's relative-position sweep ran over **prose only**. Script
> string literals (region R2) are student-visible and were outside it. A separate
> sweep of every `<script>` block in all four lessons for *"the slider/panel/chart
> below"*, *"above"*, *"next section"* and *"earlier section"* returns **no
> cross-section reference** — every hit is either numeric (*"Target is below
> 0.02"*, *"Keep tokens above P times…"*) or refers to an element inside the same
> widget (*"Paste a prompt above first"*, *"Load the scaffold below"*, *"Key
> below"*). **The class exists and is intra-section throughout.**

#### (b) Retrieval bridges in session N+1 testing a mechanism a MOVE would demote in session N

**None — and the margin is one section.**

The MOVE is `session-2 #s3`. **All four** of `session-3`'s bridge items resolve to
`session-2 #s10` "Citations", one card per item. Had the routing flagged `#s10`
instead, a single demotion would have broken an entire lesson's bridge at once.
`#s10` is in the immovable set for exactly that reason, and it was put there before
any score was read.

**But one reverse hazard is live today and Phase 2 makes it worse.**
`session-4`'s bridge item 3 tests grounding against fine-tuning, which `session-3`
teaches **only** in `#s8` — an appendix section. Today a student can reach it by
scrolling. **Step (d)'s core-only default removes that route, and the `apxlink`
teaser that points at it is hidden by the same CSS rule.** This is not caused by a
MOVE, is not fixed by declining one, and must be resolved in the same commit as
step (d). Three remedies are in §3.5 part 3; **the instructor picks.**

#### (c) Thresholds whose correct answer is a property of text a move would relocate

**The core minute figure is written in the corpus SEVEN times, and two of the
seven are checked by nothing.**

| # | Copy | Checked by |
|---|---|---|
| 1 | each section's `span.mins` | the source of truth |
| 2 | `.apxdiv` eyebrow `span.mins` | **A3** |
| 3 | `.apxdiv` lede, *"The N sections above … run in about M minutes"* | **A4** |
| 4 | `a.apxcard` "N min" labels | **A1** |
| 5 | **`window.__coreMins`** | **nothing** |
| 6 | `table.tbudget` numeric rows | `validate_lesson.py` **V5**, `verify-migration` **check 16** |
| 7 | **`table.tbudget`'s Allocated row label**, *"Core 67 + appendix 83; the core alone is the one-hour version"* | **nothing** |

Copy 7 is prose inside a table whose *arithmetic* is checked and whose *sentence*
is not. It exists in all four lessons, correctly valued today at 67 / 67 / 70 / 70
… and **its second clause is already false**: at 70 minutes, *"the core alone is
the one-hour version"* overruns by ten minutes in `session-3` and `session-4`. That
is D18's finding printed on the page.

**A MOVE also relocates a `tbudget` row across the core/appendix boundary.**
`session-2:1897` is `#s3`'s row, sitting in the core group. Demote `#s3` and the
row moves to the appendix group. V5 and check 16 validate the **total**, which does
not change, so **neither would notice if the row stayed where it was.**

**Everything else came back clean**, and §3.5 part 6 has the proof: all 116 `§NN`
occurrences live in retired or regenerated furniture, every survivor is a legal
citation, and check 20's three pinned figures are in `#s0`, not `#s3`.

#### (d) Scored sections where the rubric and my own reading disagree

> **The whole MOVE list turns on one R1 judgement, and that judgement is borderline
> by the scorer's own words.**
>
> `session-2 #s3` was scored **R1 = FAR**, with the reasoning: *"The section's
> subject is the mechanism that picks a word — an exponent applied to a probability
> set — **even though the three consequence cards draw advisory conclusions from
> it**."* That concessive clause is the disagreement, written into the evidence by
> the agent that scored it.
>
> Read the other way — a CFP is being taught why the same prompt returns a
> different answer twice, which is the single most practice-relevant fact about
> using these tools — `#s3` is **CLOSE**, and **the MOVE list is empty.**
>
> **This is the most consequential single cell in the entire measurement**, and it
> is a judgement, not a count. It belongs to the instructor.

Two further disagreements with the rubric as applied:

- **`session-1 #s2` scores 73.8 and routes to REDUCE-immovable, with
  `hard_because = IDEA` and `R2 = NO`.** It is the lesson's first real
  interaction, report §4.2 calls its distribution picker *"the first interaction
  in the lesson"* with four undefined terms, and its work-along gate is itself
  blocked. The rubric says reduce it. **My reading is that its problem is
  vocabulary, not difficulty** — C1 and C2 supply 4 and 4 of its bands while C3 is
  1 — so Phase 6, not a cut, is its remedy. Recorded because a REDUCE here risks
  flattening next-token prediction into something false.
- **I twice nearly reported a finding about `session-3` that the next correction
  erased, and the sequence is worth recording as a caution about this whole
  table.** On the raw scores `session-3` flagged **zero** sections against
  `session-4`'s seven, which looked like a strong result about an easy lesson. Its
  top section, `#sHY`, was in fact **0.2 points** below the cut. After the
  adversarial corrections deflated the distribution, the cut fell from 61.5 to
  55.3 and **`#sHY` is flagged** — `session-3` has one. Nothing about `session-3`
  changed; the *cut* moved underneath it.

  What survives is narrower and I still believe it: **`session-3`'s C1 rebuild is
  the only one that came back BELOW report §4.1** (34 against 37, where sessions
  1, 2 and 4 came back +28, +5 and −3 after correction). For the lesson carrying
  `cosine similarity`, `IDF`, `tf × ln(1 + N/df)` and `BM25`, a below-anchor
  undefined-term count is the one figure here I would want a human to check. **The
  low flag count and the low C1 may be the same fact, and if they are, `session-3`
  is under-scored rather than easy.**

- **The distribution is now compressed enough that adjacency is not meaningful.**
  The 80th and 75th percentiles sit **0.6 points apart** (55.3 and 54.7) and the
  MOVE list still changes between them. Treat the flagged list as a set, not as a
  ranking with daylight between adjacent rows.

### 12.8 Confidence, and what would change it

| Finding | Confidence | What would change it |
|---|---|---|
| **Phase 0 (a), (b), (c)**; D18, D19, D20 | **HIGH** | a ratified decision fixing 67-70 that is in none of `EDITORIAL.md`, `pedagogy.md`, `MAINTAINING.md`, `CHANGELOG.md` |
| Population **86 / 82**, and **70** content sections in sessions 1-4 | **HIGH** | only a different definition of "content section" |
| The minute budget (§3.6) and the seven copies (§12.7c) | **HIGH** | arithmetic on measured `span.mins`; each copy read off disk |
| Dependency parts **1, 4, 5, 6** | **HIGH** | part 4 was refuted three ways; part 6's 116 occurrences were classified individually |
| Dependency part **3**, the bridge map | **HIGH** on the twelve items and the reverse hazard; **MEDIUM** on secondary attributions | a second independent mapping disagreeing on which prior section an item tests |
| Dependency part **2**, carry-forward | **HIGH** on the code half — 0 scripts inside any section, all 492 lookups bind by id; **MEDIUM** on the prose half | an exhaustive read of all four lessons for "use what you made earlier" phrasing. Done for `#s3` only |
| The verification baseline and its exit codes (§11) | **HIGH** | it is a recorded run, reproducible by the commands in §11 |
| Phase 3's chip enumeration | **MEDIUM** | §3.5 does not enumerate its own 27; the 29 is a rebuild, and A13's message cannot resolve its own chip count |
| Phase 5's analogue inventory | **MEDIUM** | 57 of 96 bridge sentences are truncated mid-sentence in the source |
| **The complexity scores** | **MEDIUM** | C1 is 30% and rests on a rebuilt inventory (§12.1) under a declared ordering basis (§12.2); C3 is the least reproducible band. **Phase 6's inventory would settle C1 and the scores should be re-derived against it** |
| **`session-3` being "easy"** | **do not rely on it** | it flagged zero on the raw scores and one after correction, on a cut that moved 6.2 points. The real question is its C1 rebuild, the only one *below* §4.1; one human read of §01-§05 against the C1 anchors would settle it |
| **The choice of cut** | **it is a decision, not a measurement** | this task specified the 80th percentile and report §5.3 proposed the 75th. They are 0.6 points apart here and the MOVE list still changes from one section to two. Both are computed in §3.7 |
| **The one MOVE surviving all four adversarial passes** | **MEDIUM-to-HIGH** that it is the only candidate; **LOW** that it should be taken | `session-2 #s3` was the only FAR-and-movable core section before verification and remains so after 41 corrections. Whether it *should* move is the R1 judgement above, and it collides with three separate things (§3.7) |
| **The MOVE list** | **LOW as a recommendation, HIGH as an arithmetic** | the arithmetic — 14 flagged, 5 appendix, 4 immovable, 4 CLOSE, 1 movable — is solid. Whether `#s3` is FAR or CLOSE is a curriculum judgement and it is the instructor's. **Nothing in Phase 2 step (b) should run before that answer** |

**The single thing most worth a human hour**, if only one is available: read
`session-2 #s3` (lines 1205-1253) and decide whether temperature is mechanism or
practice. That one cell decides whether this restructure moves one section or
none.

### 12.9 The measurement caught its own side fabricating

**This is the finding I would least like to report and the one that most needs
reporting.** The adversarial pass was built to refute the scoring. It did, and
three of its catches are not judgement calls:

| What | Where |
|---|---|
| **A fabricated statistic.** A scorer quoted `session-1` §02's chart readout as *"33.0% of the mass … 3.3%"*. The page computes **23.4%** and **2.3%** from the normalised 1/rank series at `session-1:2313` | `score-session-1-CORE.md` |
| **A fabricated section reference.** Both `session-1` scorers cite *"gap report §4.3"* roughly ten times. `docs/editorial-gap-report.md` has **§4.1, §4.2 and §4.4, and no §4.3** — the blocked-exercise table is **§4.2 at line 902**. The `session-2` scorer does it six times too | both `session-1` files, `score-session-2-CORE.md` |
| **Roughly sixty line citations off by 1 to 6**, including one file whose opening claim is that *"every line number below was re-read with `sed -n 'Np'` before it was written down"* | `session-1` and `session-2` files |

**And two method failures that invalidate additivity rather than a single number:**

- **The two strata used different C2 thresholds.** The appendix scorer applied the
  spec bar literally (*"HIGH = the student cannot begin"*) and downgraded five
  gap-report HIGHs. The core scorer inherited the gap report's looser bar and
  returned eight HIGH interactions and three blocked gates. **Under the spec bar
  almost none of the core HIGHs survive.**
- **The two strata used different C1 ordering bases.** One re-homed `session-1`'s
  five hidden `lmbox` terms into core sections; the other kept `lmbox` at reading
  position 0 and excluded them. **The core and appendix halves of `session-1` are
  therefore not additive as scored**, and the re-homing was applied inconsistently
  even within one file.

**What this costs and what it does not.** It costs the scores their claim to be
reproducible in the strong sense: two competent readers given §2.2's anchors
produced materially different C2 bands, which is the defect D19 was written to fix
and did not fully fix. It does **not** cost the structural findings anything — the
population, the minute budget, the dependency protocol, the bridge map and the
seven copies were all measured mechanically, by script, against the files, and
none of them passed through a scoring agent's judgement.

**Three consequences for later phases, and the first is not optional:**

1. **Never carry a line number from this plan into an edit without re-reading the
   line.** Roughly sixty are wrong by one to six. The section **ids** are reliable;
   the line numbers are a convenience.
2. **The C2 threshold has to be settled before any re-score.** §2.2's band 3 says
   *"the student cannot begin"*; it needs the operational test attached — if the
   controls plus one sentence of surrounding prose are enough to start, it is not
   HIGH. That sentence is the whole disagreement.
3. **The corrections that were expressed as narrative rather than as a field edit
   are not in the numbers.** They are in the per-lesson verification files in the
   session working directory, and they are named here rather than quietly averaged
   in, per D7b's own principle: the residue of a mechanical check is named, not
   folded.

**This is the fourth instance of the pattern this repository keeps finding in
itself** — 236 of 322 substitutions that would have corrupted code, 27 chips
pointing at the wrong source, two rules blind to the case they existed to catch,
and now a measurement whose heaviest component was scored to two different
standards by two agents reading the same spec. **The pattern is not carelessness.
It is that every check here has to be run against the corpus rather than against
the document describing the corpus.**

---

## 13. Phase 2 as executed, 2026-08-25

**Everything above this section is the specification as written before Phase 2
ran. This section is what actually happened, and where the two disagree, this
one governs.** Phase 2 executed under six deltas from the instructor. They are
recorded first because five of them change what a later phase should expect.

### 13.1 The six deltas, and what each one changed

| # | Delta | Effect |
|---|---|---|
| **1** | **No section moves. At all.** Step (b) is **deleted, not deferred** | §4.2 rewritten. The REDUCE work merges into Phase 5 with the analogue injection, because drawing a planning analogue *is* the reduction mechanism for an application-adjacent section. **R1 is why**: the core of this course is application, and application does not move. The appendix reflow proceeded unchanged, being a reading-order change rather than a complexity decision |
| **2** | **Ratified: every retrieval-bridge item tests the prior session's CORE** | Recorded as **D21** in `EDITORIAL.md`, with its reason and a candidate Part A rule (**A21**). The full audit is §13.2. One item required rewriting |
| **3** | **D18's cost is a factual error on a student-facing page** | *"The core alone is the one-hour version"* was printed in all four lessons against cores of 67, 67, 70 and 70. Fixed the sentence, not the minutes: every on-page time claim now states what the lesson runs, and where a core exceeds sixty minutes the page says so. Nine copies, §13.4 |
| **4** | **Carry the Phase 1 corrections into every figure** | Confirmed as a byproduct. The A5 Sampler Lab card now reads **16**, not 18, and `session-1`'s compensating +2/−2 index pair is gone. The ratified 15-minute discussion value was **not** preserved, which is the trade §4.7 predicted — §13.4 F1 |
| **5** | **Report V2 upstream, do not work around it** | `MAINTAINING.md` "Known follow-ups" now carries `validate_lesson.py` V2 with the specific failing input, alongside the C2 entry. The skill was not edited and the check was not routed around |
| **6** | **Branch** | All work is on `claude/repo-restructure-phase1`. The harness designation was noted and ignored |

### 13.2 The Delta 2 audit, in full

**Method.** Mechanical, per the standing lesson of §12.9: every dependency was
located by script over the corpus and classified by the class of the section that
contains it, not by an agent's reading. Three sweeps: every retrieval-bridge item
against the prior lesson; every `Appendix [A-D]N` reference outside generated
furniture; every cross-session and carry-forward phrase
(`Session N`, `you built / saw / ran / made / generated / captured / wrote`).

#### A. The twelve retrieval-bridge items

| item | tests | prior-session source | core or appendix | verdict |
|---|---|---|---|---|
| **s2-1** | what the model produces per step: a distribution over ~50k tokens | `s1 #s2` "The Model Ranks Candidates" + `s1 #s5` (*"About 50,000 tokens exist"*, line 1375) | **CORE** + **CORE** | holds |
| **s2-2** | $55M against $14M: fluency about a number is not access to it | `s1 #s9` "The Same Question, Asked Three Times" + the case block, which is outside the tier system and always visible | **CORE** | holds |
| **s2-3** | why tiers rank by cost per finished task, not per token | `s1 #s10`, whose chart axis *is* "Cost per Task" and whose closing line is *"a per-token price cut does not always cut the bill"* | **CORE** | holds |
| **s2-4** | the three Cole confidentiality landmines | `s1 #s13` "What May Never Be Entered Into a Third-Party Tool", verbatim to its NPI sorter | **CORE** | holds |
| **s3-1** | existence | `s2 #s10` "Check 01 — Existence" | **CORE** | holds |
| **s3-2** | says what it is claimed to say | `s2 #s10`, the four-check block | **CORE** | holds |
| **s3-3** | currency | `s2 #s10` "Check 03 — Currency" | **CORE** | holds |
| **s3-4** | applicability | `s2 #s10`, *"Existence is the floor of verification and never the ceiling"* | **CORE** | holds |
| **s4-1** | the grounding qualifier | `s3 #s1` lede, which is the answer verbatim, + `s3 #s4` | **CORE** | holds |
| **s4-2** | the note-taker pipeline in order | `s3 #s10`, verbatim: *"Transcription, extraction, categorisation, follow-up"* | **CORE** | holds |
| **s4-3** | **grounding against fine-tuning** | **`s3 #s8`, `data-tier="foundational"`, the only source in the file** | **APPENDIX** | **REWRITTEN** |
| **s4-4** | what extraction surfaced: $18M against $55M | `s3 #s6`'s prediction widget feedback + `s3 #s4` + the case block | **CORE** | holds |

**Eleven of twelve hold. The evidence for the twelfth**, re-measured this
session: `fine-tun` occurs in `session-3` at lines 1103, 1277, 1517, 1581, 1583,
1587, 1599, 1679 and 2145. Lines 1581/1583/1587/1599 are inside `#s8`; 2145 is
the `ARCH` array whose host `#rankList` is at 1593, **also inside `#s8`**; 1517
is the appendix card and 1679 the time-budget row; 1103 is a syllabus list that
states no distinction; and **1277 is the `apxlink` teaser inside core `#s7`,
which step (e) retires and which `body.core-only` already hid.** The core of
`session-3` teaches the distinction nowhere.

**The rewrite, and why it is the same mechanism at the same depth.**

> **Was:** *"Grounding versus fine-tuning, for a meeting-prep assistant over the
> Cole corpus."* → *"Grounding retrieves at query time; fine-tuning changes the
> weights."*
>
> **Now:** *"A meeting-prep assistant over the Cole corpus: nine documents. What
> did Session 3 say the architecture should be?"* → *"Put the whole corpus in the
> prompt — retrieval solves a problem this corpus does not have."*

The slot is the same: item 3 of four is the **architecture decision**, between
item 2's workflow and item 4's case finding. The depth is the same: a
three-option MCQ whose distractors are plausible conflations and whose feedback
names the consequence. Every claim in the new item comes from `session-3` core
`#s6`: the ~200,000-token boundary, the nine-document corpus, the 1.9% measured
retrieval floor on the vendor's own benchmark, and the closing beat *"a large
share of the advisory RAG projects sold in 2026 solve a problem the buyer does
not have"* — which is the same "you are being sold the wrong thing" move that
made the original worth asking, and which `#s8` line 1583 makes in almost the
same words. Both distractors are refutable from `#s6` alone.

**No promotion was needed and none was taken.** The alternative — promoting
`session-3 #s8` into that lesson's core at **14 minutes** against a core already
at the 70-minute ceiling — is a real trade and was not made, because it is not
required: `fine-tun` appears in `session-4` **only inside the bridge item
itself**, so nothing downstream depended on the distinction. Had it been
required, the promotion and its cost would have been surfaced rather than taken.

#### B. Carry-forward artifacts and cross-session references

**Eighteen cross-lesson references were located and every one resolves to the
prior session's core.** Listed by site, with the section each depends on:
`s2` sCold→`s1` sCold; `s2 #s12` and its baseline script ×3 →`s1 #s15`;
`s2` script→`s1` sCold; `s3 #s1`→`s1 #s2` and `s2 #s3`; `s3` sCold→`s1` sCold;
`s3 #s13`→`s2 #s8`; `s3 #s16`→`s1 #s15`; `s3 #s7`→`s1 #s9`;
`s4 #s0`→general; `s4 #s2`→`s1 #s13`; `s4 #s4`→`s3 #s4`/`#s6`;
`s4 #s6`→`s3` core; `s4 #s7`→`s2 #s8` and `s1 #s15`;
`s4 #s8`→`s2` core and `s3 #s10`, and it already carries an explicit fallback
for a student who missed either session. **Nothing in class B needed rewriting.**

#### C. Intra-lesson elements that assumed appendix teaching — four found, three rewritten

| site | what it assumed | class | action |
|---|---|---|---|
| `session-1 #s15` (**core**, last section) | *"You built it by hand: counted letters, hit the combinatorial wall, turned the knobs, cut a distribution nine ways, and watched a network fail to count."* All five clauses are appendix: A1 twice, A2, A5, A4. **Zero of five happen in the core** | core → appendix | **rewritten** to four things the core does: place six tokens one at a time, ask one question three times, price a year of it, sort the household's facts |
| `session-1 #s12` (**core**) tier-quiz feedback | *"Correct on tier — and recall Appendix A4"*, plus *"the parenthesis problem"*, a term A4 alone defines, and *"a feed-forward network"*, a mechanism A4 alone teaches | core → appendix | **rewritten** to carry the mechanism in the sentence instead of the pointer. The answer key is unchanged |
| `session-1 #s14` (**appendix, foundational**) diagnostic | *"You built this in §02 and Appendix A5"* (A5 is **advanced**, a tier deeper) and *"The parenthesis problem"* (A4 is **standard**) | appendix → deeper appendix | **rewritten**. At Foundational depth both targets are stubbed out |
| `session-2 #s3` (**core**) | *"Pull up the three responses you generated in Appendix B1."* B1 is foundational appendix; core-only never shows it | core → appendix | **rewritten** to three unconstrained runs of the same prompt the next paragraph then constrains, which makes the before-and-after pair local to the core section that needs it |

#### D. What survives, and is flagged rather than fixed

1. **`session-1 #s15`'s CFP Board coverage table, two rows.** *"Professional
   Conduct and Regulation | FINRA 24-09, SEC AI-washing proceedings, the three
   landmines, the disclosure discussion"* — FINRA 24-09 and the AI-washing
   proceedings are taught only in **A6** (`#s14`, foundational), the disclosure
   discussion only in **A7** (`#s14c`, standard); only *the three landmines* is
   core. And *"General Principles | Model assumptions and the Monte Carlo
   parallel"* — the Monte Carlo parallel is drawn only in **A2** (`#s4`,
   advanced), per §6.4. **Not rewritten, because which CFP Board domains a lesson
   claims to touch is a curriculum statement and MUST 5 applies.** Both rows are
   over-specified rather than false at the domain level: the second clause of
   each is core. **Recommendation:** Phase 5 owes `session-1 #s2` the Monte Carlo
   analogue (§6.4), which restores that vehicle to the core and makes row 2 true
   as written; row 1 needs either a core-only phrasing or a decision that the CE
   claim is made on the full 150 minutes rather than the core.
2. **`session-2 #s12d` names Appendix B4.** Both are `standard`, so any depth
   that shows one shows the other. No break. Recorded so a re-tier of either is
   known to touch it.
3. **Three footer `Used for:` clauses name appendix material** —
   `session-1` `src-sampling` (*"the nine sampler controls"*, A5),
   `session-4` `src-regsp` (*"the Appendix D5 tabletop"*) and `src-wolfram`. The
   footer is always visible, so a core-only reader meets a source entry
   describing material they did not see. **Phase 3 owns the footer** and
   `SOURCES.md`'s `cited_by[]` will carry section ids that make this checkable.
4. **One JS comment**, `session-1` *"Appendix A5: the same temperature control
   the lab simulates"*. Region R5. Accurate description of the code it sits above.
   Recorded because Phase 4's purge standard says a reader who views source is a
   reader.

#### E. The closing questions (step j), against the same test

All four are prose in a `.talk` block, carry no `data-task`, and therefore do not
move `validate_lesson` V6's interaction count.

| lesson | section | question | answerable from |
|---|---|---|---|
| `session-1` | `#s15` Close | *"A model has just handed you a clean, confident, well-written answer about the Cole discount. Name the one thing tonight said you still cannot conclude from that, and say which part of the machine is the reason."* | `#s9` **core** (the scoring rule, *"confident tone is not a claim about confidence"*), `#s2` **core** (the sampler), and `#s15`'s own card 01 |
| `session-2` | `#s12` Final project | *"Your rewritten template just produced a clean, well-sourced answer on the Cole discount. Name the one check you would still run before any of it reaches Meg, and say why the answer looking right is not a reason to skip it."* | `#s10` **core** (the four checks, *"existence is the floor and never the ceiling"*), `#s3` **core** (*"re-asking is not verification"*) |
| `session-3` | `#s16` Close | *"Tonight's grounded answer was correctly retrieved, accurately quoted, and materially wrong. Name the point in your own meeting workflow where you would have caught it, and say who is left holding it if nobody does."* | `#s7` **core** (*"Grounded. Sourced. Quoted accurately. Materially wrong."*), `#s9` **core** (the five-stage chain and where a human first sees it), `#s13` **core** (the basis you sign) |
| `session-4` | `#s9` Homework | *"Name one record you will start keeping on Monday morning, and say what it lets you answer eighteen months from now that you could not answer today."* | `#s8` **core** (audit trails and the four-field record), `#s1` **core** (the duties that already applied) |

**None of the four depends on an appendix section.** Confidence that the room can
answer each is in §13.7.

**One thing the closing questions cost that is not budgeted.** A one-to-three
person call-and-discuss close is one to two minutes, and no minute was added
anywhere: the last core sections remain 5 / 5 / 5 / 5 and the 150 total is
untouched, per the tolerance-0 constraint. **Flagged.** If the close is to be
timed rather than absorbed, one minute has to come from somewhere in each lesson,
and that is a minute-budget decision rather than an editorial one.

### 13.3 What shipped, step by step

| step | shipped | note |
|---|---|---|
| **(a)** reflow | yes, all four | Plain sibling reorder in the source. `scripts/build-appendix.mjs` does it, idempotently, and refuses to write unless its own split/assemble round-trips byte for byte |
| **(b)** MOVE | **deleted** | §4.2, §13.1 |
| **(c)** dim → removal | yes | `section.apx.dim` collapses to a generated `.apxstub` naming the section, its minutes and its tier. The stub keeps the section in flow, so an inbound card link still resolves and still lands — which `display:none` would have broken |
| **(d)** core-only default | yes | `coreOnly=true` at init, the `on` class on `button.core`, and `section.apxdiv` dropped from the `body.core-only` hide rule but **kept** in the `@media print` one |
| **(e)** retire the furniture | yes | **22** `.apxback` bars and **20** `a.apxlink` teasers, exactly the counts §4.5 predicted, plus their CSS and the now-dead `@media print{a.apxlink{display:none}}` |
| **(f)** contents panel | yes | `section.apxdiv#apx` is now the **second** section in every lesson, immediately after the opener that carries `#tierbar`. Relabelled `data-nav="Appendix contents"` |
| **(g)** generate the index | yes | Nine copies, not seven — §13.4 F2, F3 |
| **(h)** `#sHY` and `#sRSP` | yes | Fell out of (g). A5 is now 0 |
| **(i)** nav rail | yes, **plus one fix (d) forced** | Arrow-key navigation in `session-1` now derives both position and step geometrically. And the rail no longer carries a pip for a section core-only hides, which step (d) would otherwise have left pointing at `display:none` |
| **(j)** closing questions | yes, all four | §13.2 E |

**Two changes step (d) forced that the plan did not anticipate**, both shipped:
the dead rail pips above, and the tier readout, which said *"Core only — appendix
hidden. This is the one-hour version."* in all four lessons and now reads the
figure the generator wrote.

### 13.4 Findings, and the open decisions

> **F1 — the ratified discussion figure was overwritten, as §4.7 predicted, and
> the generator now refuses to do it silently.** `session-1`'s A7 card said 15,
> `references/pedagogy.md` §s4 says *"named discussion block 20 min (15 in Session
> 1)"*, and the section eyebrow and time-budget row both say **17**. Regenerating
> the index from the sections made the card say 17 and buried a parameter
> violation the drifted index had been masking. `build-appendix.mjs` carries a
> `RATIFIED` table and prints the conflict on **every** run, in both modes.
> **Two readings, and the instructor picks:** the block really is 17 and the
> parameter is stale, or it is 15 and two minutes go back to `#s8` — which is
> where the card said they were, since the card had `#s8` at 18 against its
> section's 16. **Open.** Registered in `MAINTAINING.md`.

> **F2 — there were nine copies of the minute figures, not seven, and the two
> the plan missed were the two least checked.** §4.7 and §12.7c enumerate seven.
> Measured: **`session-2` carried an eighth** — a student-facing "Time budget"
> table in `#s0` that agreed with none of the other copies (Appendix B1 at 9
> minutes against 16, Final Project Part 1 at 10 against 5) and **omitted the
> 8-minute cold-open ritual entirely**, which dates it to before that ritual
> existed. Nothing checked it: `validate_lesson` V5 and `verify-migration` 16
> both read the `data-timing` table, and this one has no `data-timing`.
> **`session-3` carried a ninth** — a footer paragraph, *"Twelve core sections
> and four appendix sections. The core runs in about 64 minutes — the one-hour
> version — and the appendix adds 48 more, taken in place at the gold links"* —
> **wrong on all four numbers** (13, 70, 5, 80) and pointing at teasers step (e)
> retires. Both are now generated regions (`APXMAP`, `APXNOTE`).

> **F3 — the generator, and what it is allowed to do.** Every number in every one
> of the nine copies is read off the sections. `fill()` throws on an
> unsubstituted `{{PLACEHOLDER}}` and on an undefined value, so a missing figure
> is a crash rather than a published hole — MUST 6, and the direct answer to the
> three hand-edited counts Phase 1 found that had silently stopped matching their
> tables. `--check` is "run it and diff", which detects a hand-edit inside a
> generated region.

> **F4 — A4 was one lede-rewording away from checking nothing at all.** Its regex
> required the literal phrase *"The N sections **above** are the core session"*,
> which step (f) makes false. On no match the old code fell through to
> `continue`: rewording would have taken A4 from checking four lessons to
> checking none **while still printing PASS**. It now accepts both phrasings and
> carries a **presence floor** — an `.apxdiv` with no core-count sentence is a
> violation. This is the same shape as `verify-migration` check 20's
> zero-matches-is-a-PASS, which §3.5 part 5 already recorded once.

> **F5 — the reflow moved `validate_lesson` V6's consecutive-component check, in
> both directions.** The check reads the first `data-comp` per section in source
> order, so it is a property of the ordering. Measured: **`session-1`'s
> pre-existing `work-along-gate` repeat is gone.** **`session-2` gained
> `multi-column-sorter`** — core `#s8` "The Interview Rewrite" and appendix B4
> "The Seven-Step Process", adjacent because B4 anchors to `#s8`. **`session-4`
> gained `commit-first-mcq`** — appendix D3 "Where the Assigned Reading Has Gone
> Stale" and core `#s8` "Audit Trails", adjacent because D3 anchors to `#s7`.
> Net across the corpus the check improved, 2 failing lessons to 1. **Open, both
> new pairs:** re-anchor the appendix section, or re-tag one of the two
> components. Both are curriculum calls. Note that neither pair is adjacent for a
> reader at the default core-only depth; the rule is about source order.

> **F6 — `session-2`'s print output is not deterministic, and was not before this
> work.** Two renders of the unmodified pre-Phase-2 file produce different PDFs.
> Cause: `runFive()` renders five `Math.random()` draws at load, by design, to
> show output variance. Sessions 1, 3 and 4 are deterministic. **Not fixed:**
> changing it is a change to interaction logic, which MUST 3 prohibits.
> **Recorded as a pre-existing condition, not a Phase 2 regression.**

> **F7 — `session-4`'s D4 card gained three words.** Its `<b>` read *"Whether the
> Logging Burden Costs More Than the Tool Saves"* while the section's `h2` is
> *"Discussion: Whether the Logging Burden…"*. The generator writes the `h2`, as
> the time-budget row already did. Cosmetic, recorded so it is not read as drift.

> **F8 — prose density fell in every lesson, and it is report-only.**
> `verify-migration` check 17, before → after: `session-1` 8468 → 8333 words
> (56.5 → 55.6 wpm), `session-2` 10008 → 9842 (66.7 → 65.6), `session-3`
> 9676 → 9608 (64.5 → 64.1), `session-4` 11034 → 10960 (73.6 → 73.1). Retiring
> 42 pieces of furniture removes more words than four closing questions add. The
> band is unratified by D15 and the check reports rather than asserts.

### 13.5 The verification surface, measured before and after

| Check | Before | After | Note |
|---|---|---|---|
| `verify-case.mjs` | 0 | **0** | |
| `verify-migration.mjs` | 0 | **0** | check 20's detail line still reads **6 pinned figure(s)**, so no pinned sentence lost contiguity |
| `verify-style.mjs` | 0 | **0** | the apx CSS is outside the managed fence and stayed byte-identical across the four lessons |
| `verify-browser.mjs` | 0 | **0** | zero JS errors, Shift+U still reveals, no horizontal overflow at 1280px, in all five lessons |
| `inject-case.mjs --check` | 0 | **0** | |
| `test-editorial-regions.mjs` | 0 | **0** | T6's `data-nav` probe follows the relabelled panel; T7 reads the lowered baseline |
| **`verify-editorial.mjs`** | **1 — 28 hard** | **1 — 5 hard** | **A1×12, A2×2, A3×3, A4×4, A5×2 all resolved.** The 5 survivors are A13×2 and A14×3, which are Phase 3's |
| `build-appendix.mjs --check` | n/a | **0** | new |
| `validate_dom.js` ×5 | 0 | **0** | |
| `validate_lesson.py` ×5 | 1 | **1** | pre-existing. Per lesson, failures before → after: 0.1 **1→1**, s1 **9→8**, s2 **9→9**, s3 **6→6**, s4 **7→8**. The only movement is F5's V6 line |
| `restyle_sweep.py --check` | 1 | **1** | *"7 current, 0 stale, 2 without fence"*, unchanged and correct per §11.2 |
| print determinism | — | **3 of 4** | `session-2` fails and failed before. F6 |

**The `verify-editorial` hard count fell from 28 to 5.** A1 through A5 were 23 of
the 28 and step (g) resolved all 23, exactly as §4.7 said it would. **The five
that survive are named:** `A13 session-3:2047`, `A13 session-4:1381`,
`A14 session-3:1578`, `A14 session-3:1610`, `A14 session-4:1259` — the mis-wired
chip cascades and the three `src-case` chips, all of which §5.1 assigns to
Phase 3. **No A-rule survived that step (g) was supposed to close.**

Four ratchets were lowered by hand in their own commit, per `MAINTAINING.md`:
R11 corpus 23 blocks / 23 dashes → **6 / 6** (the `.apxback` bars were R11);
A9 `session-2` 69 → **67** entity and `session-3` 15 → **13** (the teasers were
R1); and the S-3 reconciliation's whole-file figure, re-measured at **15**.

### 13.6 Red team

**Named, not fixed silently. Each item is the answer to one of the six questions
the brief asked before the final commit.**

**(a) Every element still depending on appendix material after Delta 2.** Four,
all in §13.2 D, none of them a bridge item or a closing question: `session-1
#s15`'s two CFP Board rows (flagged, curriculum), `session-2 #s12d`'s reference
to B4 (same tier, no break), three footer `Used for:` clauses (Phase 3 owns the
footer), and one JS comment. The sweeps that found them are reproducible:
`Appendix [A-D]N` outside generated furniture, and appendix section titles or nav
labels appearing inside a core section.

**(b) Rewritten bridge items where the mechanism drifted.** One item was
rewritten and **the mechanism did not drift**: same slot (architecture decision,
third of four), same depth (three-option MCQ, plausible conflations, consequence
named in the feedback), same rhetorical move (*"you are being sold the wrong
thing"*). What did change is the **term** the item is keyed to: it now tests
retrieval-versus-whole-corpus rather than grounding-versus-fine-tuning. Those are
adjacent architecture questions, not the same one. **The honest statement is that
the item tests the same faculty on different material**, and if the instructor
wants the fine-tuning distinction tested specifically, the only route is the
promotion in §13.2 A and its 14 minutes. **This is the single judgement in the
Delta 2 work most worth a human minute.**

**(c) Thresholds whose answer is a property of text that changed position.**
Four found, all re-derived rather than carried forward:
**V6's consecutive-component rule** — moved in both directions, F5, open;
**core `§NN` numbering** — re-derived and **identical** in all four lessons
(`01-10`, `01-09`, `01-11`, `01-11`), because no core section moved and every
in-prose `§NN` reference lived in furniture step (e) retired or step (g)
regenerates, exactly as §3.5 part 6 proved in advance;
**`session-4 #s10`'s *"you will open yours in the next section"*** — verified: the
next section is still `#sCR`, at every depth, because nothing anchors to `#s10`;
**the panel lede's *"the depth control above"*** — verified: `#tierbar` precedes
the panel by byte offset in all four files.

**(d) Regenerated numbers disagreeing with a figure elsewhere on the page.**
**None.** All nine copies were extracted and compared per lesson: section
`span.mins` sums, panel eyebrow, panel lede count and minutes, panel lede
cardinal, card count and card minute sum, `window.__coreMins`, `tbudget` core and
appendix row sums and its `alloc` row, the `alloc` label sentence, `APXMAP`,
`APXNOTE`, and the stub minute sum. Every one agrees, in all four lessons, at
67/83, 67/83, 70/80 and 70/80. The two figures that **changed value** are the
Delta 4 pair and both are intended: A5's card 18 → **16** and A7's card 15 →
**17**, the second being F1.

**(e) Closing questions I am not confident the room can answer.** One.
`session-3`'s asks *"who is left holding it if nobody does"*. The material is in
core `#s13` (*"A record of what was said is not a record of why you recommended
what you recommended"*) and in the course's standing card *"You sign the work"*,
but that card is `session-1`'s, not `session-3`'s, and `session-3`'s core states
the accountability point less directly than the other three lessons state theirs.
A room may answer the first clause crisply and stall on the second. **It is
answerable; it is the least certain of the four.** The other three are keyed to
sentences a student read that night.

**(f) One further thing worth naming, which the brief did not ask for.**
`section.apx.dim` now removes rather than dims, and the reader's only route to a
removed section is the stub and the card. That is a strict improvement over
`opacity:.32` — §8.3 failure mode 7 is that a dimmed section is one a reader on
Foundational reads anyway — but it does mean the **tier bar is now load-bearing
in a way it was not**. A reader who never touches it sees the core and a contents
panel, which is the intended design; a reader who sets Foundational sees stubs
where the advanced sections were. Both states were exercised in a real browser
and both behave. What was not tested is whether a room *notices* the tier bar,
and that is a classroom observation rather than a check.

### 13.7 Confidence, per lesson, and what would change it

| Lesson | Confidence | What would change it |
|---|---|---|
| **`session-1`** | **HIGH** | The mechanical surface is fully verified: reflow, 9 copies, A1-A5 at 0, browser clean, print deterministic, V6 improved. The one soft spot is the `#s15` rewrite, which replaced five appendix claims with four core ones — a reader who thinks *"cut a distribution nine ways"* was load-bearing for the close should say so. The two CFP Board rows are flagged and unresolved |
| **`session-2`** | **MEDIUM-HIGH** | Everything mechanical is clean, but this lesson carries both open items: the new `multi-column-sorter` adjacency (F5) and the pre-existing print nondeterminism (F6). It also lost the most content — the stale on-page time budget was 2,660 characters — and although every number in it was wrong, **a reader may want the segment-level session map back in some form**, which is a design call rather than a defect |
| **`session-3`** | **HIGH** | The cleanest of the four. Nothing was rewritten for a dependency, `#sHY` gained the route in that A5 had been failing on for two lessons' worth of work, and the tie-break reversal (C1 before C5) puts the material in the order it builds in. The footer paragraph it lost was wrong on all four numbers |
| **`session-4`** | **MEDIUM** | The bridge rewrite is here, and it is the one place in Phase 2 where a judgement rather than a measurement decided the outcome — see red team (b). Everything else is clean and verified, and the new `commit-first-mcq` adjacency (F5) is open. **What would raise it to HIGH: an instructor reading the rewritten item 3 against the original and confirming that testing the architecture decision is what that slot is for.** What would lower it: a decision that the fine-tuning distinction has to be tested, which forces the 14-minute promotion |

**Corpus-level, the thing most worth a human hour**, if only one is available:
read `session-4`'s rewritten bridge item 3 against `session-3 #s6`, and decide
whether the architecture decision is the right thing for that slot. Everything
else in Phase 2 is either mechanically verified or explicitly flagged.

### 13.8 What Phase 2 leaves open

> **SUPERSEDED AS A QUEUE, KEPT AS HISTORY.** These eight are rows in
> `docs/deferred-work.md`, which is the single register from 2026-08-25. Five
> were closed by §14; the four §14 names as staying open are DW-026 through
> DW-029. Read the register for current status; read this for what Phase 2
> found and why.

1. **F1** — `session-1`'s discussion block: 17 minutes on the section, 15 in the
   ratified parameter. Instructor picks. Printed on every generator run.
2. **F5** — two new consecutive-component adjacencies, `session-2` and
   `session-4`. Re-anchor or re-tag. Both curriculum.
3. **§13.2 D1** — `session-1 #s15`'s two CFP Board rows over-claim appendix
   material. Row 2 is closed by Phase 5's Monte Carlo injection into `#s2`; row 1
   needs a decision.
4. **§13.2 E** — the closing questions consume one to two minutes that no budget
   allocates. The 150 total is untouched and the tolerance is 0.
5. **Red team (b)** — whether the rewritten bridge item 3 tests the right thing.
6. **F6** — `session-2`'s print nondeterminism, pre-existing, by design.
7. **A21** — D21 is mechanically checkable and the check is not built. The
   population is 12 items; §13.2 A is the seed data.
8. **`validate_lesson.py` V2**, registered upstream in `MAINTAINING.md` per
   Delta 5. Not this repo's to fix, and the pre-push gate as documented still
   cannot run clean until it is.

---

## 14. The five Phase 2 decisions, closed 2026-08-25

**§13.8 left eight items open. Five are decided here and closed. Three stay
open and untouched**, with their reasons: the two consecutive-component
adjacencies (curriculum), `session-2`'s print nondeterminism (fixing it changes
interaction logic), A21 (a rule firing on the wrong twelve is worse than none),
and `validate_lesson` V2 (upstream, registered in `MAINTAINING.md`).

### DEC-1 — the rewritten bridge item stands, and the distinction is deferred, not dropped

**Decision: accept `session-4` bridge item 3 as shipped.** Red team (b) was right
that it tests an adjacent question rather than the same one, and accepting that is
the trade.

**Reason, logged.** Grounding against fine-tuning is the more practice-relevant
distinction of the two. But a retrieval bridge is a seven-minute warm-up on the
prior session's mechanism, and it is the wrong vehicle for a distinction
`session-3` never taught in its core. Testing it there asked the ordinary student
to recall something they had not been shown; testing the architecture decision
`#s6` does teach asks them to recall something they did.

**Where it goes instead. `session-4`'s body, in Phase 5, as a candidate
injection.** The distinction belongs where there is room to teach it rather than
seconds to recall it, and `session-4` §03 "What the contract changes" and §04
"Vendor due diligence" both already turn on where a corpus lives and who can
delete it. **No promotion of `session-3 #s8`**, which would have cost 14 minutes
against a core already at its ceiling.

### DEC-2 and DEC-3 — the minute budget, and the constraint that decided it

**The decision as put:** restore `session-1`'s named discussion block to the
ratified 15 minutes and return the two freed minutes to `#s8`, where the index
card had recorded them; and pay for each lesson's closing question out of its
20-minute discussion block, since `pedagogy.md` §s4's own rationale is that the
block degrades below 15 and 18 clears it.

> **THE TWO DECISIONS DRAW ON THE SAME TWO MINUTES IN `session-1`, AND THE
> ARITHMETIC SETTLES WHERE THEY GO.** Three ratified parameters bind
> `session-1`'s appendix at once:
>
> | | |
> |---|---|
> | 150 allocated, tolerance 0 | the appendix must total **83** against a 67-minute core |
> | per-section envelope **3-16 min** | `#s8` (A5, the Sampler Lab) is capped at **16** |
> | named discussion block, **15 in Session 1** | `#s14c` (A7) is capped at **15** |
>
> A1 11 + A2 12 + A3 9 + A4 9 + **A5 16** + A6 9 + **A7 15** = **81, not 83.**
> **The three constraints are jointly unsatisfiable inside that appendix.** Two
> minutes have nowhere legal to sit, which is why they had been parked on A7 at
> 17, and why the card still said A5 = 18: **the card predates the envelope cap.**
> Eight appendix sections across the corpus sit at exactly 16 and none sits above
> it, so the cap is observed practice, not a dead letter. "Which copy is right"
> was the wrong question.
>
> **DEC-3 supplies the destination DEC-2 could not.** The two minutes move into
> the core, to the closing question, which is exactly the mechanism DEC-3
> specifies. Every ratified parameter then holds, and `#s8` stays at 16.

**Applied, all four lessons:**

| lesson | discussion block | closing question | core | appendix | total |
|---|---|---|---|---|---|
| `session-1` | `#s14c` 17 → **15** | `#s15` 5 → **7** | 67 → **69** | 83 → **81** | 150 |
| `session-2` | `#s12d` 20 → **18** | `#s12` 5 → **7** | 67 → **69** | 83 → **81** | 150 |
| `session-3` | `#s15` 20 → **18** | `#s16` 5 → **7** | 70 → **72** | 80 → **78** | 150 |
| `session-4` | `#sD` 20 → **18** | `#s9` 5 → **7** | 70 → **72** | 80 → **78** | 150 |

**Two consequences, both flagged, neither resolved here.**

> **(i) `session-3` and `session-4` now sit 2 minutes above D18's ratified
> ceiling of 70.** Any transfer from an appendix block to a core section raises
> the core, and those two lessons were already at the ceiling, so no version of
> DEC-3 avoids this: at 1 minute they would be 71. The band is 60-70 and the only
> hard time constraint is 150 with tolerance 0, which holds. **The pages say so**
> — the generated allocation label reads *"Core 72 + appendix 78; the core alone
> runs 72 minutes, twelve minutes over the hour."* **Recommendation: Phase 5's
> REDUCE pass, which now owns exactly these two lessons, recovers the two minutes
> each.** Until it does, D18's ceiling is exceeded and the page is honest about it.
>
> **(ii) The named discussion block is 18 in sessions 2-4 and `pedagogy.md` §s4
> says 20.** DEC-3 authorises the divergence explicitly. `pedagogy.md` lives in
> the skill, not this repo, so it is **recorded rather than propagated** — the
> same handling as `validate_lesson`'s V2 and C2. `scripts/build-appendix.mjs`
> carries 18 as the checked value with DEC-3 named as its authority.

**`build-appendix.mjs` gained the per-section envelope**, because nothing else in
the suite reads it — not `validate_lesson`, not `verify-migration`, not
`verify-editorial` — and it is the constraint that decided DEC-2. It prints, never
blocks, like the rest of the `RATIFIED` table. The 15-vs-17 conflict it had been
printing on every run since Phase 2 is gone, and no new conflict replaced it.

### DEC-4 — `session-1`'s CFP Board coverage rows

**Row 1 rewritten.** It read *"FINRA 24-09, SEC AI-washing proceedings, the three
landmines, the disclosure discussion"*, and three of those four are taught only in
the appendix — FINRA 24-09 and the AI-washing proceedings in **A6**, the
disclosure discussion in **A7**. To a core-only reader it claimed coverage the
lesson did not deliver, which is the same defect as the `#s15` summary already
rewritten in Phase 2. It now reads *"The three confidentiality landmines;
de-identification as a standard the name alone does not meet; the course rule on
client data in a build transcript"*, all three of which are core `#s13`.

**Row 2 stands.** Its Monte Carlo clause is appendix-only (A2) and Phase 5 closes
it by injecting the analogue into core `#s2`, per §6.4.

### DEC-5 — `session-2`'s session map is not restored

**Every number in it was wrong**, it omitted the cold-open ritual entirely, and
nothing checked it. Restoring it would restore stale figures. **If a
segment-level map is wanted back, it is a Phase 5 authoring decision against
correct figures, not a Phase 3 restoration of incorrect ones.** Recorded here so
the absence is a decision rather than an oversight.

---

## 15. Phase 3 as executed, 2026-08-25

**§5 is the specification as written before Phase 3 ran. This is what happened,
and where the two disagree this one governs.**

### 15.1 Part 1 — the count is 39 chips, not 27 and not 29

**Re-derived from the files. This count governs.** §5.2 was right that report
§3.5 never enumerated its 27 and that its cited evidence sections §3c and §3e do
not exist; Phase 1 rebuilt it at 29 sites without publishing the list.

| Class | What it is | Count | Disposition |
|---|---|---|---|
| **A** | mis-wired onto a key that exists in the same footer | **20** | rewired |
| **B** | the correct source has no key in that lesson's footer | **11** | flagged; one closed by adding the source |
| **C** | not a source claim at all | **8** | flagged |

**The difference from 29 is not disagreement about the same things.** This
enumeration separates three classes the earlier passes did not: eleven claims
whose correct source is absent from the footer entirely, eight chips that should
not be confidence chips at all, and the second and third chips on lines where
only the first was counted. **The full evidence table is
[`docs/chip-rewiring.md`](chip-rewiring.md)** — every rewire with the footer
clause or the named entity that justifies it, and every flagged item with the
reason it could not be resolved.

**A13 and A14 reached 0**, which was Part 2's precondition. §5.1's prediction
that the mechanical catch was "between 7 and 10 chips" measured at **8**, and
§5.1's structural blind spot was confirmed: `session-4:1354` carried two wrong
chips and never failed A13, being below its three-chip floor.

> **A20 was built, and it found the twentieth rewire.** §5.3 recommended it and
> the recommendation was right. Validated by running it against the pre-rewire
> corpus through `--root` rather than trusted because it printed PASS: it fired
> twice, once recovering a rewire the hand pass had found, and once on
> `session-4:1269`, where an SEC privacy rule was chipping a paragraph entirely
> about Anthropic's Consumer and Commercial Terms. **The hand pass missed that
> one.** §5.3 estimated the recovery at 7 further mis-wires; measured, against a
> corpus already 19 rewires cleaner, it found 1. The estimate was against the
> uncorrected corpus and is not comparable.

### 15.2 Part 2 — eight divergent keys, not seven, and one refusal

**Eight keys were cited by more than one lesson with materially different text.**
`src-wolfram` (4 lessons), `src-case` (4), `src-aa` (3), `src-finra2409` (3),
`src-magesh` (3), `src-pricing` (2), `src-regsp` (2), `src-secpri` (2). Seven are
arbitrated to one record in `SOURCES.md`'s own header, with what each gave up.

> **`src-aa` was refused, and the refusal is the finding.** Its three records
> differ in **what they say the data is**, not in how it is formatted: an
> unversioned pull carrying figures identical to a later `v4.1.1` pull, and an
> earlier `v4.1` string on the latest date differing from both on every shared
> model. §5.6 measured this and called it worse than G3 records. Arbitrating it
> would have published the defect behind a tidier label, so the three retrievals
> are registered individually and `DATA-PULL.md` asserts against them.

**`kind` wires to A15 by construction**, per the instruction that the two agree
rather than being maintained in step: `build-sources.mjs` reads A15's own
`data-nochip` enumeration out of `verify-editorial.mjs` and throws if the
chip-exempt set differs.

**A15's population was corrected.** A footer entry's terminal chip labels that
entry's confidence and is not a citation of it, but the rule counted it, so a
self-labelling chip made an orphan in that lesson undetectable. `session-0.1`
documents the convention in the file; making it uniform — which was forced by
`validate_lesson` V4's six-bare-chip tolerance — would have blinded the rule
corpus-wide. It now excludes R7 and **found five real orphans immediately**.

### 15.3 Part 3 — G3 is an assertion now

`BIBLIOGRAPHY.md` and `DATA-PULL.md` are generated on every run and must never be
hand-edited. **22 of 57 works are moving targets, feeding 71 of 176 references.**

> **The ordering rule fails, on purpose.** *`pulled_on` ascending implies
> `index_version` non-descending* is §5.5's rule stated as an assertion. `src-aa`
> violates it: `session-2` pulled 2026-08 at v4.1.1, `session-4` pulled later on
> 2026-08-13 at v4.1. **§5.5 predicted "the corpus violates it today, which turns
> G3 from a note in a report into a failing assertion." It does.**

**§5.5's `model_version` split is implemented as a separation, not a flag.**
`src-magesh`'s May 2024 tools, `src-kalai`'s DeepSeek-V3 and `src-dahl-fictions`'
GPT-4 / GPT-3.5 / Llama 2 are historical fixtures listed under their own heading
and carry no `figure_class: model_version`, because a register that treated them
as moving targets would silently rewrite the evidence they are.

**The live model roster is counted off the corpus on every run: 215 occurrences
of fourteen names across five lessons**, per lesson, so "no `Opus 5` reference
still standing when the course is retaught" resolves to an edit set.
`session-3` has none; `session-0.1` has 105.

**§5.6 is carried into `DATA-PULL.md` unresolved**, in full, with the evidence
both ways and the note that fixing the attribution without fixing the versioning
leaves the same defect behind a tidier label.

### 15.4 What Phase 3 leaves open

> **SUPERSEDED AS A QUEUE, KEPT AS HISTORY.** These seven are rows in
> `docs/deferred-work.md`, which is the single register from 2026-08-25. Item 1
> was closed by Phase 3.5 §16.6(b) and item 4's `src-synthid` half is partly
> closed by Phase 3.6. Read the register for current status.

1. **Ten claims have no source in their footer and still say `src-case`**, so the
   page attributes ten external claims to a synthetic household. Among them a
   named `Zhao et al. (2024)` result with no Zhao key, two statutes, a
   psychophysics constant and two vendor model cards. `docs/chip-rewiring.md` §3.2.
2. **Eight chips should not be confidence chips at all** — a figure-label legend,
   two of the page's own methodological caveats, a declared assumption, and the
   chip component reused as a category badge. Changing them moves A15, V4 and
   `verify-migration` check 18 at once. `docs/chip-rewiring.md` §4.
3. **Five sources are listed by a lesson that never cites them** and are not
   exempt by kind. `src-google-ptcf` is the sharpest: `session-2` §03 teaches the
   Persona-Task-Context-Format framework and cites its source nowhere.
4. **Five moving targets carry no retrieval date**, one of them `src-synthid`
   with eleven references. Three more are dated to a month with no day.
5. **`src-aa`'s versioning incoherence** and the livebench attribution, both
   unresolved by decision.
6. **A15's severity** is still ADVISE. Its precondition — `data-nochip` — is met,
   so promoting it is now a Phase 7 decision rather than a blocked one.
7. **53 of 57 records carry at least one `[UNVERIFIED, needs source]` field.**
   Most are a missing retrieval date or publisher on a source whose identity is
   not in doubt; `BIBLIOGRAPHY.md` prints every one.

---

## 16. Phase 3.5 as executed, 2026-08-25

**Phase 3.5 was not in §0's table. It was inserted before Phase 4 because
instructor notes read case facts aloud, and extracting them from un-unified
content means unifying twice.** Where this section and anything above it
disagree, this one governs.

`main` was at **0bdf3c6**, "Merge pull request #7 from
Relative-everything/claude/repo-restructure-phase1", carrying Phase 3
(`0e995f0`), Phase 2 (`7c3f855`) and Phase 1 (`7407111`). Work branched from it
at zero ahead, zero behind.

### 16.1 The unification rule, and the number it moves

> **EVERY QUANTITATIVE CASE FACT APPEARS ONCE, INJECTED FROM `CASE.md`.
> EVERY OTHER REFERENCE TO IT IS QUALITATIVE.**

Instructor decision, ratified, and structural rather than editorial. A lesson
may say *"Meg's largest asset is her CPC interest."* It may not restate the
valuation. Reconciling twelve copies of a number leaves twelve copies to drift
again; removing eleven of them removes the drift surface.

`scripts/case-inventory.mjs` measures it, so the claim is re-derivable rather
than asserted, and `docs/case-fact-inventory.md` is generated from it.

| | Before | After |
|---|---:|---:|
| `UNGUARDED`, all classes | 283 | 109 |
| **`UNGUARDED`, quantitative** | **182** | **5** |
| `PINNED` | 7 | 15 |
| check 20 pin rows | 3 | 13 |

**All five survivors are inside one captured transcript** at
`session-0.1:2004`, which is R10 and structurally exempt: editing a transcript
would make it a fabrication (pedagogy §1 R1 and R5). There is no unguarded
quantitative case-fact reference anywhere else in the corpus.

**The before figure moved twice during the phase and both moves are recorded.**
It was first measured at 277 / 176. `index.html:869` states the Illinois
replacement income tax on trusts at 1.5%, a `CASE.md` §D.3 figure that is not in
`case-facts.json`, not in `COLE` and not in the injected span — a quantitative
case fact with no guard of any kind anywhere in the corpus — and the first pass
had no pattern for it. Twenty-five further patterns were added from the same
audit over Parts B, D, G and H, giving the 283 / 182 baseline the table uses.
A measurement that only ever falls is not a measurement.

Nine false-positive classes were also closed, **every one observed on a real
line rather than anticipated**, and each is commented at the pattern:

| Collision | Where it was seen |
|---|---|
| `1M` matching the inherited IRA | "1M context window", session-0.1, ten times |
| `1,000,000` matching the inherited IRA | a token count, session-1:1522 |
| `$5M` matching the endowment intent | a de-identification band width, session-4:2077 |
| `64` matching Meg's age | "Rev. Rul. 2004-64", session-2, twice |
| `8 October 2025` matching the competitor's letter | the date of Anthropic's Consumer Terms, session-4:1278 |
| `52` matching the seed units | `x:52`, an SVG coordinate three characters from the words "seed gift" |
| `5000` matching the per-unit dividend | `max="5000"`, and Cal. Penal Code §637.2 statutory damages |
| `100` matching the voting units | `COLE.discount*100`, arithmetic inside an interpolation |
| `30%` matching the discount | project weightings, grading bands, batch discounts |

`--misses` lists every occurrence the context tests decline, so the undercount
can be judged rather than trusted. The abbreviated millions form requires a
dollar sign for the same reason. The bias is one-directional throughout: this
undercounts rather than inventing drift surface.

### 16.2 `COLE` existed, was generated into all six files, and had never been read

The injected span defines a JS constant holding all 102 keyed figures, before
any lesson script runs, in every file. `inject-case.mjs` says in its own comment
that *"exercise code reads figures from `COLE`; a number typed into an exercise
is the defect this prevents."* At the start of this phase
`grep -o 'COLE\.[A-Za-z]*'` across the corpus returned **zero**.

The mechanism that made preference 3 free was already built, already
hash-guarded, and unused. Answer keys, chart data arrays and JS feedback strings
in four lessons read it now.

Three helpers were added to the injected block so all six files get the
identical implementation: `COLEn`, `COLEm`, `COLEp`. **They throw on an unknown
key** rather than rendering the word `undefined` into a sentence a student is
marked against — constraint 8, a generated figure going through a placeholder
that fails loudly. `verify-browser.mjs` backs them up by exercising every
control and reading the rendered text for `undefined` and `NaN`, skipping script
and style bodies so it reads output rather than source. **Observed catching:**
renaming `COLE.saleUnits` to `COLE.saleUnitz` produces
`FAIL 13 ... The undefined non-voting units sold to the grantor trust were
valued at`.

### 16.3 The conflicts, and the one sentence four lessons carried

**Every conflict below is a place a lesson stated a case fact differently from
`CASE.md`.** They were found by six per-lesson readings against Parts A–H, not
by the scanner, which matches surface forms and cannot see a wrong label on a
right number.

| Severity | Where | The conflict |
|---|---|---|
| **BLOCKING** | session-0.1:1512, :2877 | *"an unsigned buy-sell"*. §F.6 records the 2014 agreement as **executed and never amended**, and separately as unfunded. Unsigned reverses the fact that matters: its transfer restrictions are live against the very transfer Part E proposes |
| **BLOCKING** | session-1:2816 | *"the 9-year interest-only note"*. §E.6 makes the note payable in full on demand; Part K retires "nine-year interest-only balloon" **as superseded entirely** |
| **BLOCKING** | session-2:2229, :2682 | *"a client who founded and still runs a manufacturing company"* and *"a founder-owned manufacturer"*. Walter Hensley founded it in 1987 and sold it to Meg in 2016; the purchase price is her §1012 basis. The second is a revealed answer key |
| **BLOCKING** | session-3:1423, :2241 | *"Warren wants to keep the nine-year term"*, and a rubric that scored a student for writing `nine`, `9-year`, `warren` or `balloon`. There is no Warren in the case |
| **BLOCKING** | session-3:1490 | the three confidentiality landmines were not Part J's three. Part J is explicit that there are **exactly three** and names the endowment and the board seat as the third; the page invented one and the real third appeared nowhere in the lesson, while :1664 promises session 4 will name *"which of the three"* |
| **BLOCKING** | session-4:1116 | the seed gift plus the note move **900** units |
| **MAJOR** | session-0.1:1059, session-1:1274, session-3:1102, session-4:1116 | **the same sentence in four lessons**: *"moves 900 non-voting LLC units to a grantor trust by a $2,002,000 seed gift and a $20,020,000 demand note"*. They move **572**. The remaining 328 are bought over five years out of the dividend, which is the mechanism §E.7 exists to describe |
| **MAJOR** | session-1:2840 | *"A Midwest aerospace-fastener founder, 64, selling a company appraised at $18M"*. Two errors: Meg did not found it, and $18,000,000 is the buy-sell **formula** output, not an appraisal. `$18M` also slips past check 4's conditional-allowance test, which matches `18,000,000` and not the abbreviated form |
| **MAJOR** | session-1:1581 | *"the 2016 revocable trust restatement"*. Part F lists F.1 through F.16 and there is no restatement |
| **MAJOR** | session-2:1132, :2686 | *"Meg is exploring a sale"*, taught as one of three things that must never reach a consumer tool. §B.6 has her replying that the company was not for sale |
| **MAJOR** | session-2:1577 | *"The stale document is the buy-sell, not the valuation."* §H.5 deliberately refuses to nominate a reliable pole, and §09 of the same lesson says the honest answer is none of them |
| **MAJOR** | session-3:1895 | the retrieval corpus's buy-sell chunk gives a **right of first refusal with a descendants'-trust carve-out** where §F.6 gives a **corporate consent gate over every transfer**. Only one of those stops the transfer Part E proposes. **FLAGGED, NOT CHANGED** |
| **MAJOR** | session-4:1396 | *"wire seed-gift funds to a trust account"*. The seed gift is 52 LLC units; no cash moves in it at all |
| **MAJOR** | session-4:1676 | the §08 audit exhibit cites *"Buy-Sell Agreement, **Cole Precision Components Inc.**, section 4.2"*. A 2014 instrument cannot carry a name the company did not take until 15 August 2016. **FLAGGED, NOT CHANGED** |
| MINOR | several | "a strategic buyer has expressed informal interest" in four lessons (there is no buyer: one competitor, one letter, declined); "a discount nobody has re-verified" (presupposes a verification that never happened); the 2023 appraisal called two years old when the same lesson calls it three; the draft trust's substitution power placed in the settlor where §E.3 puts it in a non-adverse party |

**Facts the lessons assert that `CASE.md` does not carry**, deduplicated: document
word counts and page counts for every item in Part F (instructor estimates under
a heading reading "Document from this case"); a 90-minute meeting with a
reaction by David; an annual review, where §A.5 records no investment adviser of
record; an engagement between the Coles and the student's firm, which every
lesson assumes and §A.5 denies; and a confidentiality classification of
individual facts, which Part J supplies only as its own list of three.

### 16.4 Deviations allowed, with the reason

**Four, and all four are qualitative**, which is the point of the rule: a
qualitative deviation cannot produce a net worth a million dollars apart across
two lessons.

1. **The three hand-written spine copies stay literal** — session-1:1279,
   session-2:1138, session-4:1125. They restate the injected spine question,
   which constraint 9 says to prefer deleting. They are kept because they are
   guarded (check 20 pins every figure on all three, and the fourth pin was
   added for the one that was not), because the spine is the instructor's own
   choice from `docs/spine-brief.md`, and because "Meg is short $522,086 a year"
   lands harder than "Meg runs an annual shortfall" in the one sentence the
   course is built around.
2. **session-4 §08's two audit exhibits stay literal**, and gained nine pins.
   The exercise asks whether each is a well-formed record; a record whose
   figures are interpolated at render time is not the artifact being audited.
3. **The `[UNCONFIRMED]` marker carries a contradicted claim as well as an
   unsourced one.** The declared pair does not have a "contradicted" state, and
   inventing a third marker for one case would be worse than using the
   conservative one. The register entry says so in its note.
4. **`session-0.1`'s captured transcripts keep every case figure**, including
   the mid-term AFR advice §H.4 contradicts. Editing a transcript is the
   fabrication pedagogy §1 R1 forbids. What was added is the label the other two
   captures already had.

### 16.5 The two markers, and their register

`[NEEDS SOURCE]` — the claim is right; a citation has not been attached.
`[UNCONFIRMED]` — no source corroborates it. The claim itself is in question.

**`[NEEDS SOURCE]` is the stronger claim and it is the one that needs evidence.**
A wrong `[UNCONFIRMED]` gets read and downgraded; a wrong `[NEEDS SOURCE]` gets
read and believed. Twelve claims marked: **7 `[UNCONFIRMED]`, 5 `[NEEDS SOURCE]`**,
and every one of the five carries a retrieved candidate with a confidence label.

Both forms are declared in `EDITORIAL.md` A16, whose regions gained **R8** —
a source note is exactly where an unsourced claim sits, so it was exactly where
an undeclared marker could hide from the rule that exists to stop markers
hiding. 17 markers now use a declared form, against 6 before.
`session-0.1`'s eight are untouched.

`docs/unsourced-claims.md` is generated by `scripts/build-unsourced.mjs` and
sorted by **how much depends on the claim**, not by file order. `weight` is the
only field typed by hand, because it is the only one the corpus cannot see. A
marker with no annotation, an unknown weight, or no `resolve=` is a hard
failure — observed firing.

> **A GAP, RECORDED RATHER THAN CLOSED.** `EDITORIAL.md`'s Part A population is
> `ALL_LESSONS`, which is `session-0.1` plus the four tiered lessons.
> `index.html` is not in it. A16 therefore polices the form of every marker in
> the five lessons and none on the hub, while the generated register lists all
> twelve. Widening Part A's population is a decision about what `EDITORIAL.md`
> governs.

### 16.6 The four Phase 3 items

**(a) Zhao et al. (2024) is a real paper whose key was never added.** Not a
third planted fabrication, and no label went missing. Three lines of evidence,
none from memory: the authors' own repository was reachable and returned the
official BibTeX verbatim with a NeurIPS 2024 badge, corroborated by six
independent search indexes; `session-4:1911`'s footer states *"One deliberate
fabrication... the only fabricated item in this file"*, so labelling Zhao as one
would falsify the file's own standing claim; and `docs/chip-rewiring.md` already
classifies :1487 as Class B, a missing key rather than a missing label.
`src-zhao` added, and the chip rewired off `src-daly`, whose own record says the
speech *"says NOTHING about watermarking"*. **`last_retrieved` is unresolved**:
arxiv.org, the NeurIPS proceedings, OpenReview, the ACM DL and Semantic Scholar
are all blocked from this build environment, so the paper itself was never
loaded. A repository is not the paper and a search index is not a retrieval.

**(b) The ten claims credited to `src-case`, reclassified.** Twelve were found;
the enumeration was off by two in one direction and by three in another (three
of the "ten `src-case` chips" are `src-daly` chips, and two more claims of the
same class are not in §3.2 at all).

| Verdict | Count | Which |
|---|---:|---|
| **Real source found** | 7 | the SynthID adoption claim (and the source CONTRADICTS it); Kimi K3 and DeepSeek V4-Flash model cards; the Magesh response-length correlation, which **closes** §3.2's open question — the 350/219 word counts are Magesh's and `src-magesh` is already in that footer; SB 942 and EU AI Act Article 50 (and the reclassification **corrects** the SB 942 date); human deepfake detection at chance; Anthropic's 80% system-prompt reduction; Zhao |
| **`[NEEDS SOURCE]`** | 3 | the Weber fraction at 1%; the 60.6% / 86.5% survival arithmetic, whose inputs are Magesh's and whose arithmetic is the page's own and re-derives exactly; the blended token price, whose "published rates" are `src-pricing`, already in the same footer |
| **`[UNCONFIRMED]`** | 2 | the 78.8% / 75% scheme; the absence-as-suspicion base-rate argument, which is a syllogism and should carry no chip at all |

**(c) `src-case`'s canonicalisation — what each lesson lost, and the root cause
is not the arbitration.** No fact changed in any of the four. Every surviving
`used_for` clause is unchanged or verbatim. What was deleted, uniformly, is one
class of assertion: **the synthetic disclosure**. Each of the four lost exactly
one occurrence of the word "synthetic" from the whole file.

| Lesson | Severity | What it lost |
|---|---|---|
| session-1 | MINOR | *"Synthetic"* and *"Every figure, document and family fact is invented."* This is the lesson where the reader **meets** the case, and its entry was epistemic rather than bibliographic: it said the case has no external referent to check against, at the point the lesson is training that reflex |
| session-2 | **MAJOR** | *"Not based on any client, living or dead"* — a denial of a real-world referent, the only place that sentence appears in any lesson page — and *"Labelled as synthetic on every page where it appears"*, a claim about the corpus's own labelling discipline. session-2 is the lesson where students paste case material into live tools |
| session-3 | **MAJOR** | The finding that inverts the arbitration. session-3's description was chosen because it was **the fullest**, and what was cut is exactly what made it fullest: *"including the 2014 buy-sell, the 2023 appraisal and the meeting transcript"* — the three artifacts session-3 puts through the retrieval corpus and the extraction exercise |
| session-4 | MINOR | *"Synthetic"* and the chip qualifier. session-4's entry was deliberately minimal because it puts its caveats inline at the point of use |

> **THE ARBITRATION KEPT EVERYTHING. THE RENDERER HAS NEVER EMITTED IT.**
> `SOURCES.md`'s `src-case` record carries the union of every clause in its
> `scope`. `inject-sources.mjs`'s `renderEntry()` emits author, title,
> publisher, link, retrieval date, `used_for` and the chip, and never
> `rec.scope`. The record also sets `disclose_on_page: true`, whose declared
> meaning is *"the page must say so where they appear"* — and **nothing reads
> that field**. `build-sources.mjs` parses it into a boolean with no consumer.
>
> `verify-sources.mjs` now reports this on every run. The two fabricated
> records are still labelled, by `kind` rather than by the flag: `renderEntry`
> emits **"Does not exist."** for `kind: fabricated`, and both carry
> hand-written labels at their point of use. `src-case` is the one with nothing
> generated behind it.
>
> **DO NOT REVERT.** The instructor's choice is between rendering `scope` for
> every record with `disclose_on_page: true` (one change in `renderEntry`,
> restores the strongest sentence of all four originals to all four lessons at
> once in one canonical form, and gives the flag a consumer), rendering a short
> fixed disclosure, or leaving the pages and accepting that the disclosure now
> lives in surrounding prose — which is defensible for sessions 1, 3 and 4 and
> **not** for session-2, whose prose says only "built on a synthetic case" and
> never denies a real-world referent.

### 16.7 Source dating

`retrieved` became **two fields on all 58 records**, both required to be present:

  `last_verified` — THE INSTRUCTOR read the source and confirmed the repo's
  claims about it are still accurate. A human attestation.
  `last_retrieved` — A MACHINE FETCHED the source. Records **when**, never that
  anything is accurate.

**54 of 58 records have an EMPTY `last_verified`, and 143 of 176 references
stand behind them.** That is the measurement, not a backlog.

**One date is populated and it cites its evidence.** `src-wolfram`, 2026-08-23:
`EDITORIAL.md` says *"Seventeen names. Instructor-verified."* of the locked
section list, entered in `bd8f458`, and nobody enumerates seventeen section
names without opening the essay. **Two records that looked like candidates were
left EMPTY on purpose.** `docs/evidence-annex-verified.md` records `src-memory`
as "fetched in full 2026-08-20" — that is a retrieval, not a reading, and the
field for it is `last_retrieved`. The same annex records `src-plugins` as
"retrieved via search result content rather than a full page fetch, so
re-confirm the two starred items"; a document that flags its own thinness is not
evidence a human verified it.

**The guard is wired, not written down and hoped for**, and both halves have to
be defeated at once:

1. `scripts/sources-verified.lock.json` notarises every `(key, last_verified)`
   pair. `build-sources.mjs` recomputes the digest on every parse and throws,
   naming the keys that moved. Every generator goes through `model()`.
2. `scripts/attest-verified.mjs` is the only writer of the lock and refuses
   unless stdin is a TTY. `--init` seeds once and refuses to re-seed. `--sync`
   adopts records whose `last_verified` is empty or *not applicable* — records
   that assert nothing, so that adding a source does not require a human — and
   refuses if any record carries a date the lock does not already hold.

**Observed refusing, four ways:** advancing a date through the writer, exit 2;
hand-editing the date into `SOURCES.md` and running any of the four generators,
exit 1 naming the key; re-seeding the lock to cover the tracks, exit 2;
laundering a hand-edited date through `--sync`, exit 2 naming the key.

**The ordering rule now runs on `last_retrieved`** and never on `last_verified`,
and **it still catches `src-aa`**. It also gained the precondition it was
missing: a month is not a day, and `2026-08` could not be ordered against
`2026-08-13`, which is exactly where the version incoherence hid. All three
partial dates are now reported as a precondition failure in their own right and
ordered at their **earliest possible day**, which is a declared reading
convention and never a date. `session-2`'s v4.1.1 against `session-4`'s later
v4.1 still fires.

**What actually got fetched.** This build environment's egress policy answered
**403 to CONNECT for eleven of the twelve source hosts**. Only
`platform.claude.com` was reachable.

| Source | Finding |
|---|---|
| `src-pricing` | **Fetched in full, 2026-08-25, and the CONTENT HAS CHANGED.** The page now says Sonnet 5's $2/$10 introductory pricing *"is now the standard price"* and the 1 September rise to $3/$15 *"will not occur"*. `session-1` §10 carries the superseded reading in a table row at :1727 and a note at :1732 saying the price "rises 50% tomorrow" — on a course dated 8.31.26. **Not silently updated** |
| `src-owasp` | **THE SOURCE HAS MOVED**, established through the project's own GitHub repository. The cited page is a historical archive; development moved to `GenAI-Security-Project/GenAI-LLM-Top10` and a new edition was published 2026-08-04. The teaching claim SURVIVES — prompt injection is still LLM01, now LLM01:2026 — and the citation does not. **This corrects a note written earlier in the same phase** which said the source "is not known to have moved or gone" |
| `src-vectara` | **The measurements hold and the superlative is stale.** Every per-model rate `session-3` quotes is still on the live board, but 3.3% now ranks third and the floor is 1.8%. `session-3` labels 3.3% "Best model, grounded" |
| `src-aa`, `src-synthid`, `src-kitces-advisortech`, and eight more | **Unreachable from this build environment.** A statement about the environment, **not** about the source: none is known to have moved or gone. No date was written for any of them |

`src-aa`'s own `last_retrieved` was the prose *"divergent across lessons"*; it is
now `2026-08-13`, its latest registered pull. **The divergence did not go
anywhere**: each footer now names ITS OWN pull date and says the pulls disagree,
which is both facts where the old footer printed one.

`docs/source-verification-queue.md` is generated on every run: totals first,
then the queue sorted by reference count descending, then the links, the
retrieval notes, the content changes, and what this build could not reach.

### 16.8 What Phase 3.5 leaves open

> **SUPERSEDED AS A QUEUE, KEPT AS HISTORY.** These ten are rows in
> `docs/deferred-work.md`, which is the single register from 2026-08-25. Items
> 2 and 4 were closed by Phase 3.6 and item 6 was partly closed by it; the rest
> are open there. Read the register for current status.

1. **`disclose_on_page` has no consumer**, and the synthetic-case disclosure is
   off all four lesson footers because of it. §16.6(c) states the three options.
2. **The `session-3` retrieval corpus's buy-sell chunk** describes a different
   transfer-restriction mechanism from §F.6, and only one of them stops the
   transfer Part E proposes. Changing a retrieval corpus changes what the
   extraction exercise finds and what its rubrics score.
3. **The `session-4` §08 audit exhibit's anachronistic party name.** The section
   says two of its six items are "specific in form and defective in substance",
   so this is either a third designed defect with no label or drift with a
   pinpoint locator on it.
4. **`session-1` §10 teaches a price rise the vendor has publicly cancelled**,
   and the course date is the night before it was supposed to happen.
5. **`session-3` teaches 3.3% as the grounded floor** and the live board's floor
   is 1.8%.
6. **`src-synthid`: eleven references, no link, no publication date, no
   retrieval date, and no reachable page.** The largest single unverified
   dependency in the corpus. One `session-4` claim asserts what *"Google's own
   current page states"*, which no build has ever been in a position to say.
7. **`EDITORIAL.md` Part A does not cover `index.html`**, so A16 polices no
   marker on the hub.
8. **`verify-migration` check 1's grep targets missed two retired framings that
   survived the v4.0 migration** — the bare word "founder" applied to Meg, in
   three lessons, and "9-year" / "nine-year" applied to the proposed note, in
   two. Both are corrected; the check still cannot see either.
9. **check 4's conditional-allowance test matches `18,000,000` and not `$18M`**,
   so an abbreviated case figure with the wrong label passed it.
10. **`index.html:864` says "Every tax and legal characterisation attached to
    this case is posed as a question, not a holding"**, which the injected
    extract contradicts twelve lines below on the same screen. Instructor-facing
    and erring toward more verification, so it is flagged and not changed.
