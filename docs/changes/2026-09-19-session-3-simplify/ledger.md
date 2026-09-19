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
