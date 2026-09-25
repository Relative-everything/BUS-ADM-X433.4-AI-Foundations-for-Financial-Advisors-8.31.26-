# Handback: Session 4 polish, 2026-09-25

Branch `claude/hopeful-newton-hjt0f4`, from `7e63a9d` (`main` after PR #38). Not merged.

## Summary, quantified

| Measure (at load, every appendix shown, 1280 px) | Before | After |
|---|---|---|
| Instruction labels (timing chips, hints, provenance labels, sub-labels) | 90 | **64 (−29%)** |
| Visible controls | 223 | **202 (−9%)** |
| Words | 6,562 | **6,085 (−7%)** |
| Page height, sections | 34,661 px | **32,382 px (−7%)** |
| Empty readouts drawn as a 110 px grey box | 14 | **0** (one muted line, 47 px at most) |
| Footer lines written to a maintainer (3 entries, the legend, one paragraph) | 5 | **0** |
| Editorial advisories | 3 | **2** (both Session 1) |

Minutes, sections, tiers and all 17 gates unchanged.

**Recommendation: merge.** The rejected alternative was cutting whole activities (§05's video
call, §08's Pack yours, D5's clause). Measured, the clutter was not the activities: it was the
chrome around them, 26 labels that repeated a source line or a button and 14 empty boxes that
repeated a hint. Removing that keeps every interaction you said is now much better.

## What was done

1. **Sources.** The quoted entry was generated, so it was fixed where it is made. The invented
   case now sorts last and reads *"Not a real source. Hallowell v. Commissioner, T.C. Memo.
   2023-217 was invented for the §07 exercise, where it is the case cited in record 6 and the
   answer key names it as invented."* Every other entry says what it supports and where, in
   brackets. EchoLeak is now chipped to its CVE record; CurXecute left the citation.
2. **One provenance statement per section.** 16 dashed "constructed for this lesson" labels
   removed; the source line under each section already said it. The one kept marks §08's
   deliberately gapped package.
3. **Controls appear when they can be used**: §05's x-ray and fixes after Run, §06's rate and
   length after the first run, D5's clause after a pick, finale buttons only when pressable.
4. **Duplicate pickers removed**: §04's six lock tabs (the locks are the buttons now) and §08's
   list of seven sentences (the stations are the buttons now, named by the sentences).
5. **Wording**: repeated hints cut, one idea per bullet, D2's doubled full stop fixed.

## Click paths worth seeing

1. **Footer.** Scroll to Sources: the last entry, under a dashed rule, is the invented case.
2. **§05.** Only the prediction and Run show; after Run, the x-ray and the fixes appear.
3. **§08.** Click station 5 on the route: the readout opens with "It ran, and I cannot tell
   whether the output is right."
4. **§04.** Tab to a lock in the safe and press Enter: its question opens.

## Verification

| Gate | Result |
|---|---|
| verify-case, verify-migration, verify-sources, test-case-viewer | pass (6/6, 15/15, 5/5, 0 failures) |
| every generator `--check` (appendix, case, cardsort, sources, bibliography, unsourced, case inventory) | current |
| verify-editorial | 17 rules clean, 0 hard, 2 advisories (Session 1, pre-existing) |
| test-editorial-regions (T7) | 9 of 9; the A9 em-dash figure did not move, so no re-record is owed |
| verify-style | clean |
| rebuild `checks.mjs` | 0 failed (S4R-011 repointed from the removed list to the stations) |
| this change's `checks.mjs` | 19 of 19; the D2 assertion fails on `7e63a9d`, so it tests the fix |
| validate_lesson (skill) | known red set only: V2 ×9 footer links (DW-029), V6 17 interactions; V4 warns that the invented case carries no chip, which is correct |
| validate_dom | scripts clean, Shift+U marks all 17 gates; `#pnum` known red |
| verify-browser | red only on `ERR_CERT_AUTHORITY_INVALID` for the fonts request in this sandbox, as before |
| Playwright, 1280 and 380 px | every interaction worked; 0 page errors; no horizontal overflow; no "undefined", "NaN" or ".."; keyboard Enter on a lock and Space on a station work |

## Flags for you

1. **Two other lessons' footers changed**, because the generator is shared and the defect was the
   same: Session 2's *Kessler* entry takes the "Not a real source" form, and the Artificial
   Analysis and pricing entries in Sessions 1 and 2 no longer point students at `DATA-PULL.md`.
   Sessions 0.1 and 3 are untouched. Say if you want Sessions 1 and 2 held back.
2. **Not changed, and like the quoted entry.** Two generated strings shared by every session
   still read as maintainer text: the appendix card ("what always gets taught", "the back of
   the file") and the footer minutes table ("seven minutes over the hour"). The retrieval dates
   also print as "2026, September 13" in every footer, and changing the date format would edit
   Session 0.1, which is frozen by your decision. Each is a one-line generator change across all
   lessons; say the word.
3. **§02's "Show what is left" stays.** It was planned for removal; it is the only control that
   names the phrases still pointing to her.
4. **Further simplification, if you want it**: the next cut with a real effect is structural, one
   activity per core section (§05 loses the video call to the bullet on Arup; §08 loses Pack
   yours). Not done: it removes interaction, which the ask said to keep.
