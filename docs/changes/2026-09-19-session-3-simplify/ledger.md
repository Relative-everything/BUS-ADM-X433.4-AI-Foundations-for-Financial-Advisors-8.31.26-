# Ledger: Session 3 simplify pass, 2026-09-19

Branch `claude/adoring-mendel-2luer4`, from `7d9e2fe` (`main` after PR #32). One row per atomic
item; ids run `SM-001` upward. Anchor is section id plus `data-task` where one exists, plus a quoted
string. `checks.mjs` in this folder carries one DOM assertion per item where a DOM check can prove it.

Baseline measured before any edit: T7 `session-3 4 literal / 3 entity`; 18 interaction roots;
17 gates; 2 `.verify` blocks; the four §03 presets in Chromium at D1 11.1 / D6 5.1 / D3 3.3 / D2 0.0
(53.8%), D5 18.2 / D4 17.9 (1.7%, flagged), D8 29.2 / D3 8.0 / D7 3.8 / D1 3.7 (72.8%), D7 26.5
then zeros (100%); no horizontal overflow at 380px at either depth; zero page errors; every repo
gate green and the skill validators at the seven by-design red lines.

| Id | Anchor | Planned edit | Test | Commit | Result | Status |
|---|---|---|---|---|---|---|
| SM-001 | `docs/changes/2026-09-19-session-3-simplify/` | Open the change folder: the kickoff verbatim, this ledger, `checks.mjs` with the standing invariants | `node checks.mjs` runs, 0 failed | | | open |
| SM-002 | `s12`, "This section characterises recording law and a professional duty. Verify before teaching either as settled" | The §09 verification block leaves the page; its two items go to the run sheet under Verify before teaching | `.verify` count 0 | | | done |
| SM-003 | `#caseInner`, after `CASE:END`, "Every tax and legal characterisation attached to this case is posed as a question" | The shared case gate leaves the page (Session 2 precedent, DW-056 batch 3); its four items and the Karmazin, Woelbing and Davidson line go to the run sheet | no "Requires instructor verification" on the page | | | done |
| SM-004 | `#caseInner p.dim`, "Generated from CASE.md, the canonical fact set" | The case dialog's lede stops naming files and scripts and says what the dialog is for | the lede names no file or script | | | done |
| SM-005 | `instructor-notes/session-3.md`; `docs/deferred-work.md` DW-056, DW-041 | A Verify before teaching section carries every item the two gates held plus the §07 excerpt disclosure; the §09 slot and the not-yet-done list point at it; both register rows carry a dated line | reads true against the page | | | done |
| SM-006 | `s10` `.src`, "The excerpt is CASE.md Part O; it presupposes an advisory engagement" | The maintainer aside and two file references leave the §07 source line; the DW-041 disclosure moves to the run sheet | source line names no file | | | done |
| SM-007 | `sChk` `.src`, "written for this lesson from CASE.md Part O; lines 3 and 5 are deliberately wrong" | The A3 source line stops naming the file and stops printing the two planted lines under the sorter built to find them; the planted-error label stays | no file name, no line numbers, label kept | | | done |
