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
`scripts/verify-editorial.mjs` in `session-0.1`, `session-1`, `session-2`, `session-3`, `session-4`, `session-5`; a marker
in any other form is a hard failure. This register reads the regions A16
reads (body prose, script, footer source entries and source notes: R1, R2, R7
and R8) in those six lessons, and `index.html` as well, which A16
does not read. The totals count the two apart: A16's population reconciles
with the marker count A16 prints, and the rest is extra. In `index.html` this
script fails a marker in an undeclared form itself, since A16 never sees it.

## Totals

| | |
|---|---|
| Marked claims | **0** |
| `[UNCONFIRMED]` | **0** |
| `[NEEDS SOURCE]` | 0 |
| `[UNVERIFIED, needs source]` | 0 |
| Markers that are not claims | 0 |
| **A16's population** | **0**: the markers in `session-0.1`, `session-1`, `session-2`, `session-3`, `session-4`, `session-5`, the count A16 prints |
| `index.html` | 0: read here, not by A16 |
| **All markers read** | **0**: 0 marked claim(s) and 0 marker(s) that are not claims |

## The order

**Sorted by how much depends on the claim, not by file order.** A claim an
answer key rests on is worth resolving before a passing remark, and file
order tells you nothing about which is which. `weight` is the only field
typed by hand; file, line, section, region and the claim text are read out of
the corpus on every run.

---

*No marked claims. Either every claim carries a source, or nobody has looked.*
