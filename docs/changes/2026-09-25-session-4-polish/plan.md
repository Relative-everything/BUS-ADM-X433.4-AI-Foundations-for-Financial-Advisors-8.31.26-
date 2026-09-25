# Plan: Session 4 polish, 2026-09-25

Branch `claude/hopeful-newton-hjt0f4`, from `7e63a9d` (`main` after PR #38). Ask in
`notes-verbatim.md`. Ledger rows `S4P-001` upward; `checks.mjs` in this folder carries one DOM
assertion per row a DOM check can prove.

## 0. The premise, challenged first

1. **The quoted entry is generated, not typed.** The footer line comes from
   `scripts/inject-sources.mjs`, which prints **"Does not exist."** ahead of any `kind: fabricated`
   record, and from `SOURCES.md`, whose `used_for.session-4` clauses were written as register notes
   ("no figure typed", "the lesson drawn is the instructor's", "see DATA-PULL.md"). Fixing the
   Session 4 page by hand would be overwritten on the next inject, so the fix goes to the two
   sources of the text. Two generator changes reach other lessons, and both are the same defect
   the ask names:
   - the fabricated-entry format also renders Session 2's *Kessler* line;
   - the "Retrieval dates differ across lessons; see DATA-PULL.md" sentence also renders in
     Sessions 1 and 2 (it is printed for every lesson citing `src-aa`).
   No other lesson's footer changes. Session 0.1 is untouched (no fabricated source, no `src-aa`).
2. **"Simplify" must not mean less interaction.** The ask says the interactivity is now much
   better. Measured baseline (Playwright, every appendix shown, 1280 px): 223 visible controls, 90
   instruction labels, 6,562 words, 34,661 px of page. The clutter is not the figures; it is the
   chrome stacked around them. Nine of seventeen sections carry two activities, and every activity
   carries a timing chip, a heading, a hint, a dashed provenance label and a readout, followed by
   bullets, a source line that restates the provenance label, and a work-along box.
3. **Two things this must not move.** The em-dash ratchet (A9, `session-4` 1 / 2 / 3): the only
   em dashes are the generated sha stamp and the footer's "Figures that move" sentence, and
   neither is edited, so T7 stays put without a re-record. The deliberate-defect label rule (R5):
   the one on-page label for a planted defect (§08's "gaps on purpose") and the §07 answer key's
   *Hallowell* line stay.

## 1. The rules applied to every section

| # | Rule | Why |
|---|---|---|
| P1 | One provenance statement per section. The dashed "constructed for this lesson" labels go; the section's source line already says it with the L chip. Where the label said something the source line did not (D3's illustrative drawings, §05's simulation), the source line gains it | the label and the source line said the same thing twice in 14 sections |
| P2 | One hint line per activity, and none that restates a button or the heading | 6 hints repeat the control they sit above |
| P3 | One control per action. Where a row of buttons duplicates a clickable figure, the figure becomes keyboard-operable and the row goes | §04's lock tabs repeat the six locks |
| P4 | Secondary widgets that do not carry the section's point are cut, not restyled | §08's mini route and slot-to-station tags; §02's "Show what is left" |
| P5 | Reader-facing words only: no file names, no register vocabulary, no "this build", no "this file" | the ask's exemplar |
| P6 | An empty readout is one muted line, not a grey box. Every readout keeps its place in the DOM and its live region; until it has something to say it drops the box, the 110 px minimum height and the heading | 17 grey boxes on a fresh page hold only an instruction the hint already gave |
| P7 | A control that cannot be used yet is not shown yet; each appears when the step before it is done | §05, §06, D5, §01 and §07 showed disabled or not-yet-meaningful controls from load |

## 2. What changes, by section

| Section | Change |
|---|---|
| §00 | hint that repeats the Zoom out button removed |
| Cold open | dashed label removed; the bullet shortened to the one idea (well written is a different test from safe to send) |
| §01 | the "(or open a lane…)" aside removed; the figure's idle caption blank until the first placement |
| §02 | dashed label removed. "Show what is left" was planned for removal and **kept**: the meter counts what is left but only this button names it, so it is the one way out for a learner stuck at Possibly |
| D5 | hint shortened; dashed label removed |
| D6 | dashed label removed |
| §03 | vague hint removed; dashed label removed |
| §04 | the six lock tabs removed; the locks in the safe are real keyboard buttons; dashed label removed; source line in plain words |
| §05 | dashed labels removed; source line says the inbox, the run and the call are simulated |
| D1, D2 | dashed labels removed; D1's source line drops "tie rule, counts" jargon; D2's double full stop fixed |
| §06 | dashed label removed; four of five slider helper lines removed (the baseline one stays); "placeholders" sentence rewritten |
| D3 | dashed label removed; source line says the drawings are illustrative |
| §07 | dashed label removed; hint shortened |
| §08 | "(in class…)" aside removed; the mini route and the slot-to-station tags in Pack yours removed; source line simplified |
| D4 | dashed label removed; source line shortened |
| §09 | the one-bullet list folded into the assignment card |
| Footer | the confidence legend without "this build"; the duplicate fabrication paragraph removed ("this file" with it) |

## 3. Sources

- `inject-sources.mjs`: a fabricated record sorts after every real source and renders as
  **"Not a real source."**, then the citation, then its `used_for` clause as a plain sentence
  ("Invented for …"). The divergence sentence becomes "Other sessions cite other retrievals of
  this page." with no file name.
- `SOURCES.md`: every `used_for.session-4` clause rewritten as "what it supports (where)";
  `src-cve`'s title drops CurXecute (off the page since the rebuild, its score unverified);
  `src-hallowell`'s maintainer `scope` corrected from §08 to §07; Kessler's `used_for.session-2`
  rewritten in the same form as Hallowell's. No `last_verified` moves; the lock is untouched.
- Regenerate: footers, `BIBLIOGRAPHY.md`, `DATA-PULL.md`, the verification queue.

## 4. Verification

Every repo gate in `MAINTAINING.md`; the skill's `validate_lesson`, `validate_dom`,
`restyle_sweep --check`; the previous change's `checks.mjs` (assertions this change deliberately
supersedes are updated there with a note); this change's `checks.mjs`; a Playwright click-through
at 1280 and 380 px with Shift+U on and off; the clutter count re-measured against the baseline.
