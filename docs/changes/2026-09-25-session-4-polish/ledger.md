# Ledger: Session 4 polish, 2026-09-25

Branch `claude/hopeful-newton-hjt0f4`, from `7e63a9d` (`main` after PR #38). One row per item;
ids run `S4P-001` upward. `checks.mjs` in this folder carries a jsdom assertion for every row a
DOM check can prove (19 assertions, 0 failed at close).

Baseline measured before any edit (Playwright, every appendix shown, 1280 px, nothing clicked):
223 visible controls, 90 instruction labels (timing chips, hints, dashed provenance labels,
sub-labels), 6,562 words, 34,661 px of sections. Every repo gate green; skill validators at their
known red set (V2 ×9 footer links, V6 17 interactions, `#pnum`); `verify-browser` red only on the
sandbox's font certificate; editorial advisories 3 (two session-1 A12, one session-4 A20 on
`src-cve`).

| Id | Anchor | What changed | Why (rule, note or finding) | Test | Status |
|---|---|---|---|---|---|
| S4P-001 | this folder | Ask verbatim, plan, this ledger, `checks.mjs`, handback | Process | `node checks.mjs` | done |
| S4P-002 | `scripts/inject-sources.mjs`, `SOURCES.md` | A fabricated record sorts last and renders "Not a real source. *title* was invented for …"; the pull-divergence note names no file; all 22 `used_for.session-4` clauses rewritten as "what it supports (where)"; Kessler's `used_for.session-2` in the same form; Hallowell's maintainer `scope` corrected from §08 to §07 | The ask's exemplar; P5 | S4P-002 ×3 | done |
| S4P-003 | `src-cve`, `#s5` | `kind` background to evidence; the EchoLeak bullet and the §05 source line carry its H chip; CurXecute leaves the title | A20 advisory (the claim rested on it unchipped); CurXecute's score was unverified and off the page since the rebuild | S4P-003; editorial advisories 3 to 2 | done |
| S4P-004 | footer | Confidence legend without "this build"; the paragraph repeating the Hallowell disclosure ("the only fabricated item in this file") removed; the invented entry set apart by a dashed rule, unnumbered | P5 | S4P-004 | done |
| S4P-005 | 16 sections | Dashed provenance labels removed where the source line said the same; D3's and §05's source lines now carry what their labels added; §08's "gaps on purpose" kept (R5, a planted defect) | P1 | S4P-005 | done |
| S4P-006 | lesson CSS | An empty readout (`.mpanel` holding only `.nil`) is one muted line: no box, no 110 px minimum, no heading; the live region stays in place | P6 | CSS present; Playwright: 14 empty readouts, tallest 47 px | done |
| S4P-007 | `#s1`, `#s5`, `#s6`, `#sRSP`, `#s7` | Progressive disclosure: §05 x-ray and fixes after Run; §06 rate, length and Check every answer after the first run; D5 clause after the first pick (and on Shift+U); §01 "What binds you?" and §07's Not sure / Last step only while usable | P7 | S4P-007 ×4; Playwright hidden at load, shown after | done |
| S4P-008 | `#s4` | Lock tabs removed; the six locks are `role=button`, `tabindex=0`, Enter or Space selects, `aria-pressed` and the tab's old accessible name; the safe is `role=group` | P3 | S4P-008; Playwright focus + Enter | done |
| S4P-009 | `#sCR` | The seven-sentence list removed; the stations are keyboard buttons named "Station n, Name: sentence"; the readout leads with the sentence; wide layout puts readout then button beside the figure; Pack yours loses the mini route and the "opens / off the route" tags | P3, P4 | S4P-009 ×2; rebuild S4R-011 repointed to the stations | done |
| S4P-010 | page-wide | Hints: §00, §03 removed; §01, §07, §08, D5 shortened. Cold open bullet one idea; §09 self-test folded into the assignment card; §06 slider notes 5 to 1; D2 "tax.." fixed; D1, D4, §04, §06, §07, §08 source lines in plain words. §02's "Show what is left" kept (see plan) | P2, P5 | S4P-010 ×3 (the D2 assertion fails on `7e63a9d`) | done |
| S4P-011 | `instructor-notes/session-4.md` | Per-slot notes: lock picking in the safe, the x-ray and fixes appearing after Run, the §08 station pick | Process | S4P-011 | done |
| S4P-012 | `CHANGELOG.md`, `changelog/`, registers | Changelog entry and page (swept); `BIBLIOGRAPHY.md`, `DATA-PULL.md`, the verification queue and the case inventory regenerated. `src-case` references 49 to 34: the removed labels were its chips, and each section's source line still carries one | Process | every `--check` current | done |

## Measured at close

Same method as the baseline: controls 223 to 202 (−9%), labels 90 to 64 (−29%), words 6,562 to
6,085 (−7%), height 34,661 to 32,382 px (−7%). §04 and §08 keep their control counts by design:
the six locks and seven stations became the buttons the removed rows were.
