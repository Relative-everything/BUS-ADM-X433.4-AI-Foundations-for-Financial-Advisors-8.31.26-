# Unsourced claims

**Generated from the markers in the corpus by `scripts/build-unsourced.mjs`.
Do not edit: the next run overwrites it.** To add an entry, mark the claim in
the lesson. To remove one, attach the source and delete the marker.

## The markers

| Marker | What it asserts |
|---|---|
| **`[UNCONFIRMED]`** | **No source corroborates it. The claim itself is in question.** |
| **`[NEEDS SOURCE]`** | **The claim is right; a citation has not been attached.** |
| `[UNVERIFIED, needs source]` | The pre-existing form, older than the two above: the page prints the marker rather than invent a figure. D23 introduced the two above for new marks on 2026-08-25. |

`[NEEDS SOURCE]` is the **stronger** claim, because it asserts that somebody
checked. A wrong `[UNCONFIRMED]` gets read and downgraded; a wrong
`[NEEDS SOURCE]` gets read and believed. **The default is `[UNCONFIRMED]`**,
and moving an entry the other way is a decision with evidence behind it.

All three forms are declared in `EDITORIAL.md` A16 and enforced by
`scripts/verify-editorial.mjs`; a marker in any other form is a hard failure.
This register reads the population A16 reads (body prose, script, footer
source entries and source notes: regions R1, R2, R7 and R8), so the totals
below reconcile with the marker count A16 prints.

## Totals

| | |
|---|---|
| Marked claims | **4** |
| `[UNCONFIRMED]` | **0** |
| `[NEEDS SOURCE]` | 0 |
| `[UNVERIFIED, needs source]` | 4 |
| no weight | 4: the pre-existing form with no CLAIM annotation, listed in its own section below |
| Markers that are not claims | 2 |
| **A16's population** | **6**: 4 marked claim(s) and 2 marker(s) that are not claims |

## The order

**Sorted by how much depends on the claim, not by file order.** A claim an
answer key rests on is worth resolving before a passing remark, and file
order tells you nothing about which is which. `weight` is the only field
typed by hand; file, line, section, region and the claim text are read out of
the corpus on every run.

---

## no weight: the pre-existing form, unannotated

*These use `[UNVERIFIED, needs source]` and carry no CLAIM annotation, so
they have no authored weight and say nothing about what would resolve them.
The files allowed to carry them, and why, are named in
`scripts/build-unsourced.mjs` (`LEGACY_UNANNOTATED`); an unannotated marker
anywhere else is a hard failure. Annotating one gives it a weight and moves
it into the sections above.*

### 1. `session-0.1/index.html:1249` · `#s2` · **[UNVERIFIED, needs source]**

> On screen, where a figure belongs: [UNVERIFIED, needs source] for price per MTok, and [UNVERIFIED, needs source] for knowledge cutoff, on all four models.

| | |
|---|---|
| File and line | `session-0.1/index.html:1249` |
| Section | `#s2` (`core`) |
| Region | R1: body prose |
| Marker | **[UNVERIFIED, needs source]** |
| What would resolve it | *not annotated* |
| Why it has no annotation | session-0.1 is frozen by instructor decision (DW-057), and its markers predate the CLAIM convention of 2026-08-25 |

### 2. `session-0.1/index.html:1249` · `#s2` · **[UNVERIFIED, needs source]**

> On screen, where a figure belongs: [UNVERIFIED, needs source] for price per MTok, and [UNVERIFIED, needs source] for knowledge cutoff, on all four models.

| | |
|---|---|
| File and line | `session-0.1/index.html:1249` |
| Section | `#s2` (`core`) |
| Region | R1: body prose |
| Marker | **[UNVERIFIED, needs source]** |
| What would resolve it | *not annotated* |
| Why it has no annotation | session-0.1 is frozen by instructor decision (DW-057), and its markers predate the CLAIM convention of 2026-08-25 |

### 3. `session-0.1/index.html:1251` · `#s2` · **[UNVERIFIED, needs source]**

> So the only claim made here is that the behaviour exists and is documented: [UNVERIFIED, needs source] for what triggers it, what it changes, and what you can do about it.

| | |
|---|---|
| File and line | `session-0.1/index.html:1251` |
| Section | `#s2` (`core`) |
| Region | R1: body prose |
| Marker | **[UNVERIFIED, needs source]** |
| What would resolve it | *not annotated* |
| Why it has no annotation | session-0.1 is frozen by instructor decision (DW-057), and its markers predate the CLAIM convention of 2026-08-25 |

### 4. `session-0.1/index.html:2239` · script · **[UNVERIFIED, needs source]**

> The figure that should actually decide a 4,000-item batch is price per MTok, and that is [UNVERIFIED, needs source] in this lesson.

| | |
|---|---|
| File and line | `session-0.1/index.html:2239` |
| Section | *not derivable: a script literal renders wherever the code puts it* |
| Region | R2: script string literal |
| Marker | **[UNVERIFIED, needs source]** |
| What would resolve it | *not annotated* |
| Why it has no annotation | session-0.1 is frozen by instructor decision (DW-057), and its markers predate the CLAIM convention of 2026-08-25 |

## Markers that are not claims

*A16 counts these and they pass. Each one talks about the marker convention
instead of marking a claim: a script comment declaring the convention
(`EDITORIAL.md` A16, "two comments declaring the convention itself"), or a
marker named inside a CLAIM annotation. Listed so the totals reconcile with
A16; nothing here needs a source.*

| File and line | Marker | Where it sits | The sentence |
|---|---|---|---|
| `session-0.1/index.html:2017` | [UNVERIFIED, needs source] | a script comment declaring the convention | The sections print [UNVERIFIED, needs source] where the teaching wants the number. |
| `session-0.1/index.html:2231` | [UNVERIFIED, needs source] | a script comment declaring the convention | Where the deciding number would be price or cutoff, the string says [UNVERIFIED, needs source] rather than inventing one. |

