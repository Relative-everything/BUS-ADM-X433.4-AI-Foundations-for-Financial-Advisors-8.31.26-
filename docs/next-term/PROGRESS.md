# PROGRESS.md: the next-term-2027 run

Resume rule (RUNBOOK A.1.6): read `RUNBOOK.md` (A.0 first), this file, `DECISIONS.md` and `git log next-term-2027`, then continue from the first phase not marked **done**. Never redo a done phase unless its validators now fail.

| Phase | Status | Started | Finished | Commit | Validators |
|---|---|---|---|---|---|
| init (A.1) | done | 2026-10-11 | 2026-10-11 | `f0bf929` | n/a |
| 0 | done | 2026-10-11 | 2026-10-11 | (P0 commit) | all exit 0 except `verify-style` (skill absent) and `verify-wolfram-quotes` (no article copy); P0 report §1 |
| 1 | pending | | | | |
| 2 | pending | | | | |
| 3 | pending | | | | |
| 4a | pending | | | | |
| 4b | pending | | | | |
| 5 | pending | | | | |
| 6a | pending | | | | |
| 6b | pending | | | | |
| 7 | pending | | | | |
| 8 | pending | | | | |
| 9 | pending | | | | |
| 10 | pending | | | | |
| 11 | pending | | | | |

## init (A.1): run files

Branch `next-term-2027` created from `main` at `da7b003` (PR #45 merged 2026-10-11, the deferred-work catch-up). `docs/next-term/RUNBOOK.md` holds the attachment verbatim under an A.0 amendments block (ten reductions from the logic check, the catch-up deltas, the environment). `PEDAGOGY.md` in the repo root is byte-identical to the attachment, so nothing was committed for it (D-003). Local annotated tag `fall-2026-final` on `main` (not pushed, D-016). Skill gate: the interactive-lesson-builder skill is not installed; A.1.7 fallback applies for the whole run.

## Phase 0: freeze Fall 2026, read and report repo state

**Report:** `docs/next-term/P0-baseline-report.md`. Tag `fall-2026-final` on `da7b003` (local; `git push origin fall-2026-final` is Jared's).

**Validator exit codes (da7b003):** build-case 0 · inject-case --check 0 · build-cardsort --check 0 · verify-case 0 (7 of 7 blocks, 20 layout rules agree) · verify-migration 0 (15 passed) · test-case-viewer 0 · verify-style **1** (skill absent, environment) · case-inventory --report-check 0 · build-appendix --check 0 · verify-sources 0 · inject-sources --check 0 · build-bibliography --check 0 · build-unsourced --check 0 · test-editorial-regions 0 (9 passed) · verify-editorial 0 (0 hard, 2 A12 advisories) · test_live_console 0 (86 passed) · attest-verified 0 · verify-wolfram-quotes **1** (needs an article copy, none in tree) · verify-browser 0 (107 PASS) · change-folder sets: all pass except the known `2026-09-19-session-3-simplify` V6 line (history) · catch-up `checks.mjs` 0 · session-5 section tests 962/0 · drags.mjs 36/36.

**Core/appendix minutes:** S1 69/81 (150) · S2 69/81 (150) · S3 67/83 (150) · S4 67/83 (150) · S5 59/66 (125) · S0.1 120 core, no appendix. Every structured discussion (A7, B5, C4, D4, E5) is in the appendix; every session but S3 has an 8-minute `sCold` cold open in core.

**Case dependency map:** report §3 (18 consumers; `build-case.mjs` grabs about 100 figures by v4-specific regex, `inject-case.mjs` writes v4 prose in both viewer tabs, `verify-migration` checks 1, 1b, 4, 7, 11 and 20 are v4-keyed, `build-cardsort` pins v4 Part J, Part L is the IDGT flowchart; `session-1` reads 12 `COLE` keys at runtime).

**Volatile-fact hits per file:** hub 0 · S0.1 143 · S1 62 · S2 50 · S3 7 · S4 93 · S5 88 · instructor notes 92 across 13 files (full table in the report's §A).

**Deferred-work rows on lessons, CASE.md or case scripts:** 71 open rows listed in report §5; the register was not edited.

**Contradictions with the plan:** report §7 (ten items). The important ones: the local `main` ref lagged `origin/main` and the branch was re-based (D-017); `verify-case` has a layout check the runbook does not know; the runbook's marker form is undeclared under A16; the LMS name already appears in instructor-authored files outside served pages; the `claude` CLI is available for recaptures; primary government hosts are unreachable (R7 governs).
