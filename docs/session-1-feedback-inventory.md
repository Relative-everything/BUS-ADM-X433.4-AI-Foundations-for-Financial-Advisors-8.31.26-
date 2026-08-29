# Session-1 feedback inventory

**PROVENANCE WARNING — READ BEFORE USING ANY NUMBER IN THIS FILE.**

This file is NOT the measured inventory. The measured inventory was produced by
Claude Code against the working tree and was never committed; it exists only as
chat text in a session that will close.

This file is a transcription of what that session REPORTED into the deliberation
chat, with four later corrections applied. It carries headline counts only. It
does not carry the underlying file:line data for any PART, and three PARTs were
never reported at all.

Rules for use:
- Any figure here is [M] confidence at best — reported, not re-measured.
- Any PART marked NOT RECOVERABLE must be re-measured before it drives an edit.
- Do not cite this file as a source in any lesson.
- Claude Code: MERGE your measured data into this file. Do not overwrite it —
  the corrections in §C and §D exist only here.

Transcribed: 2026-08-28. Measurement session base: f975742a64f926f2d73f7a6f8ae42dae49443943.

Note: this file sits in `audit/`, which MAINTAINING.md designates as a
deliberately kept historical record outside the purge check's scope. Retired
strings quoted here are expected and are not defects.

---

## §A — status of each PART

| PART | Subject | Status |
|---|---|---|
| 1 | String presence | PARTIAL — absent list only, no file:line for present strings |
| 2 | Date/time buckets | PARTIAL — bucket totals only; see §D-1, arithmetic does not close |
| 3 | Canvas / LMS | SUPERSEDED by Pass 2 BLOCK A, `acd691f` |
| 4 | Instructor-addressed constructs | **NOT RECOVERABLE — re-measure before use** |
| 5 | Grading / final-project residue | PARTIAL — two survivors named |
| 6 | Title inventory | PARTIAL — counts only, no flat list; corrected, see §C-2 |
| 7 | Interaction implementation | (d) full; (a)(b)(c) headline only |
| 8 | Number provenance §02/§03/§08 | **NOT RECOVERABLE — re-measure before use** |
| 9 | A9 em-dash counts | Superseded by Pass 2 measurement, see §C-3 |
| 10 | Validator baseline | Full |

---

## §B — what was reported

### PART 1 — string presence

Nine fragments returned ABSENT:

```
graded component of Final Project Part 1
That is a graded component
Week 1 Canvas discussion
Reading due before Session 2
The question that stays open all four sessions
Instructor note
holds 23.4% of the mass
Setup for Thursday
Also due
```

Seven were purge-confirmed with commit evidence: `95910ec` x4, `5326e5f` x2,
`a8eca07`. One survives only in `docs/spine-brief.md`.

`holds 23.4% of the mass` is a different case and not staleness. `git log -S`
returns zero commits repo-wide across all history. `session-1:2486` builds the
figure at runtime from the harmonic distribution at `:2461`; H(40)=4.278543
makes `PLP[0]` render as 23.4%. No grep can find it. It is read off the
rendered page.

**Open question, now partially resolved — see §D-3.** The distribution is
confirmed constructed. What remains unmeasured is whether the page says so.

File:line for the fragments that were PRESENT was never reported.

### PART 2 — date and time inventory

| bucket | idx | 0.1 | s1 | s2 | s3 | s4 | total |
|---|---|---|---|---|---|---|---|
| (a) purge target | 2 | 7 | 9 | 6 | 19 | 17 | 60 |
| (b) citation year | 0 | 0 | 18 | 32 | 69 | 46 | 165 |
| (c) source metadata | 1 | 92 | 17 | 22 | 12 | 17 | 161 |
| (d) legal identifier | 0 | 0 | 3 | 27 | 17 | 57 | 104 |
| (e) case fact | 0 | 1 | 20 | 13 | 21 | 13 | 68 |

Reported total 845, R6 injected span counted only (228), never quoted.
**Arithmetic does not close — see §D-1.**

Also reported: only 3 of bucket (a) are `Fall 2026`; `session-1:2178` is a
second copy of DW-009 that no register row names.

### PART 3 — Canvas / LMS — SUPERSEDED

Pass 2 BLOCK A (`acd691f`) found **zero purgeable hits repo-wide**. The
retirement landed 2026-08-25 and DW-047 finished it. Every survivor is a
documented exclusion:

```
session-4:1575   <div id="pfCanvases">          R3 attribute
session-4:2885   <canvas> element                R2
session-4:2891   getContext('2d') fallback       R2
session-4:2921   "Canvas unavailable" card       R2
```

`grep "\bLMS\b"` over served pages returns nothing. `index.html:1037` —
"This is the live course site" — is the ratified replacement, working.

### PART 4 — instructor-addressed constructs

**NOT RECOVERABLE.** Never reported. Required input for Pass 3 TASK 3.
Re-measure: constructs a student reading alone cannot act on, beyond the three
DW-054 names. Give the sentence and the line.

### PART 5 — grading / final-project residue

Not zero. Two survivors:

```
session-3:2697   final-project weightings stated as fact
                 survived Tier A because it is a JS string literal
session-4:1264   asserts a deliverable was submitted, read and screened
```

Root cause, filed separately: the purge checks cannot see inside JS string
literals or runtime-generated strings. Two independent proofs — the above, and
the `23.4%` figure invisible to `git log -S`.

### PART 6 — title inventory

- 250 titles across hub + sessions 1-4: **197 DESCRIPTIVE / 53 ACTION-ASSERTION**
- 70 are section titles
- +26 in `session-0.1` (22/4), excluded
- **session-1 is the outlier: 18 of the 53 ACTION titles — 42%, against session-3's 7%**
- 102 titles read elsewhere: 71 in generated regions, caught by `build-appendix --check`

Coupled-title figure corrected — see §C-2. Flat list never reported.

### PART 7 — interaction implementation

(a) §00 cold-open capture — headline only, detail not reported
(b) §01 work-along gate — passes on any non-empty input
(c) §07 answer key location and keyed answers — not reported

(d) **§08 — full finding.** Never bound. It is a click-to-classify mislabelled
a sorter. Pass 5 is a rebuild, not a fix.

```
grep -c "draggable|dragstart|dragover|dragend|dataTransfer|ondrop"
  = 0 across all 3,273 lines
chips render as <button>        session-1:2988
only handler is c.onclick       session-1:2990
```

The handler lights the item's own keyed bucket and re-parents nothing. The
learner never chooses a bucket. `npiScore` counts clicks, not correct
placements — **the exercise cannot be failed** — while the prose reads "Sort
all eight and find them." Rebuilding drag alone ships a different defect; the
key must be withheld until commitment, as the neighbouring commit-first MCQ
already does.

### PART 8 — number provenance, §02 / §03 / §08

**NOT RECOVERABLE.** Never reported. Required before any §02/§03/§08 content
edit. Re-measure: for every rendered number, case-derived via `inject-case` or
hand-authored; and for each hand-authored one, whether CASE.md carries a
contradicting value.

### PART 9 — A9 em-dash counts

Reported as zero headroom, HEAD reproducing the baseline exactly on all five.
Superseded by Pass 2's execution measurement — see §C-3.

### PART 10 — validator baseline

All 16 exit 0 at the measurement HEAD. `verify-style.mjs` requires
`RESTYLE_SWEEP` set; the skill re-synced to a new UUID path between sessions.
`validate_lesson.py` exits 1 with 7 fail / 2 warn — documented upstream V2
`<a href>` false positives and the V6 interaction band, pre-existing.

---

## §C — corrections applied

**C-1 · main SHA.** The measurement session reported `main` as `db3a0dce` and
five merges behind. Wrong. `db3a0dce` was a stale `origin/main` from a
`--depth 50` shallow clone dated 2026-08-23T14:40:45Z; the session never
fetched. `f975742` is the merge commit of PR #10 into `main`, parents
`4674620` (PR #9) and `41e4b845` (Phase 4 tip), merged 2026-08-27T17:29:26Z.
**The divergence was never on the remote. Every PART was measured against the
correct tree.**

**C-2 · coupled titles.** "16 read by data-nav or JS with nothing checking
them" was wrong. Corrected by DW-063 to **9 unguarded + 3 non-titles + 4
generator-protected**. The real exposure is different and larger: **66 section
titles whose `data-nav` differs from the `<h2>`**. This roughly triples the
cost of the repo-wide title sweep.

**C-3 · A9 for session-1.** Reported as 76 in the phase handoff. Pass 2
measured **77** by executing `classify()` / `authoredProse()` from
`scripts/editorial-regions.mjs`, then lowered it to **69** (entity 76 to 68).
Rows `DW-058` (4 dashes deleted with prose) and `DW-059` (4 dashes converted,
sentences retained — the repo's first lowering by conversion). Use 77 as the
pre-Pass-2 figure, not 76.

**C-4 · the `.verify` family.** DW-054(b) reported 13 sites. Corrected by
DW-061 to **10 carrying `class="verify"`**; the other three are a source note,
a script literal, and a srcnote — one of them inside a scored answer panel.

---

## §D — unresolved defects in the inventory itself

**D-1 · PART 2 does not sum.** 60 + 165 + 161 + 104 + 68 = 558. Plus the 228
R6 injected span = 786. Reported total: 845. **Gap of 59, unexplained.**

Row and column sums both verified as internally consistent: every bucket row
sums to its stated total, and the per-file columns sum to
idx 3 / 0.1 100 / s1 67 / s2 100 / s3 138 / s4 150 = 558 across both axes.
The 59-hit gap is therefore in the 845 figure itself or in a population
counted in the total but absent from the table — **NOT in any bucket row.**

Nothing has been edited on the strength of these totals, so no edit is
invalidated. Do not cite 845 until this closes.

**D-2 · the "57" corroboration is unsound.** The measurement session reported
"57 of the 60 [bucket (a)] are in-class deixis." Bucket (a) for session-1 is 9,
and Pass 2 purged 8 calendar words from session-1 as bucket (a). Meanwhile Pass
2's 57 printed deixis hits are all in session-1, lines 1400-3139. These cannot
both be true: bucket (a) is calendar-locked hits, and the 57 are a separate,
larger population found by a different classifier after this file proved
missing. Pass 2 cited the numerical match as evidence its re-derivation was
faithful. **It is not evidence.** The two 57s count different things and the
match is coincidence until shown otherwise.

Consequence: **the in-class deixis population across sessions 2, 3 and 4 has
never been measured.** Only session-1's is known, from Pass 2.

**D-3 · the 23.4% distribution is CONFIRMED constructed, not measured.**
Recomputed independently: H(40) = 4.278543038936376, matching the reported
figure exactly. Rank 1 = 23.3724% and rank 10 = 2.3372%, rendering as the
page's 23.4% and 2.3%. This is a pure harmonic distribution — Zipf with
exponent 1 over exactly 40 tokens — and therefore a constructed illustration,
not model output.

What remains unmeasured is only whether the PAGE SAYS SO. If it does not,
non-negotiable #1 is in play. Measure the caption, chip, confidence label and
source note before the next §02 content pass.

Design consequence for the requested tail-probability hover: a harmonic
distribution over 40 tokens has no vanishing tail. Rank 15 = 1.5582% and
rank 40 = 0.5843% — the smallest value is roughly one fortieth of the largest,
not one ten-thousandth. The prose "everything past rank 15 looks like zero and
is not zero" overstates what this distribution shows, and a hover revealing
0.58% will read as unremarkable rather than as the intended reveal. Showing
genuinely near-zero tail mass requires either a real softmax distribution or a
far larger vocabulary. Decide which before building the hover.

---

## §E — re-measure before use

1. PART 4 in full — gates Pass 3 TASK 3
2. PART 8 in full — gates any §02 / §03 / §08 content edit
3. PART 6's flat title list — gates the repo-wide title sweep
4. PART 7(a)(b)(c) — gates the §00 / §01 / §07 rebuilds
5. D-1's 59-hit gap
6. D-2's deixis population for sessions 2-4
7. D-3's disclosure text — the caption, chip, label and source note at `session-1:2486`
