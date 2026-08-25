# Unsourced claims

**Generated from the markers in the corpus by `scripts/build-unsourced.mjs`.
Do not edit: the next run overwrites it.** To add an entry, mark the claim in
the lesson. To remove one, attach the source and delete the marker.

## The two markers

| Marker | What it asserts |
|---|---|
| **`[UNCONFIRMED]`** | **No source corroborates it. The claim itself is in question.** |
| **`[NEEDS SOURCE]`** | **The claim is right; a citation has not been attached.** |

`[NEEDS SOURCE]` is the **stronger** claim, because it asserts that somebody
checked. A wrong `[UNCONFIRMED]` gets read and downgraded; a wrong
`[NEEDS SOURCE]` gets read and believed. **The default is `[UNCONFIRMED]`**,
and moving an entry the other way is a decision with evidence behind it.

Both forms are declared in `EDITORIAL.md` A16 and enforced by
`scripts/verify-editorial.mjs`; a marker in any other form is a hard failure.

## Totals

| | |
|---|---|
| Marked claims | **0** |
| `[UNCONFIRMED]` | **0** |
| `[NEEDS SOURCE]` | 0 |

## The order

**Sorted by how much depends on the claim, not by file order.** A claim an
answer key rests on is worth resolving before a passing remark, and file
order tells you nothing about which is which. `weight` is the only field
typed by hand; file, line, section, region and the claim text are read out of
the corpus on every run.

---

*No marked claims. Either every claim carries a source, or nobody has looked.*
