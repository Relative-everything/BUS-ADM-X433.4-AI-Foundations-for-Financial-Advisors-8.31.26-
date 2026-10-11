# Ledger: deferred-work catch-up, 2026-10-11

Branch `claude/magical-thompson-yhaivm`, from `ac94b6b`. `plan.md` beside this file is the plan the
instructor approved on 2026-10-11 ("Approve Waves 1-3 now"); the decision message (the plan's §6,
D-01 to D-20) was not answered, so nothing here takes a decision except DW-041's execution, which
the approval named. Its wording departs from D-01's default on one point, the start date (see DWC-008). One row per change, ids `DWC-001` upward.

Measured with: Node 22, Python 3.13, Playwright Chromium at `/opt/pw-browsers`, jsdom 24.1.3
installed globally for this pass (DW-132). The interactive-lesson-builder skill was not installed,
so `validate_lesson.py`, `validate_dom.js` and `restyle_sweep.py` could not run; `changelog/index.html`
was regenerated with `build-changelog.py` and its managed style fence refilled from the committed
copy, which is byte-identical across the corpus (a no-op regeneration gave an empty diff).

## Wave 1, the register (`cd5d93e`)

| Id | Row(s) | Change | Evidence |
|---|---|---|---|
| DWC-001 | DW-156 | `docs/deferred-work.md`: a 2026-10-11 header block that wins over the three earlier ones (kept as history); a Closed table; status definitions gain `closed`. | 158 ids, each once: 94 open, 46 closed, 18 superseded after Wave 1. |
| DWC-002 | DW-004, 005, 006, 012, 021, 049, 073, 111, 123 | Closed: each was closed on the tree and only the status column said otherwise. Dated note with the evidence on each. DW-092 was closed here too, wrongly, and reopened after the review (DWC-030). | The grep or check named in each note, run at `ac94b6b`. |
| DWC-003 | DW-055, 062, 066, 117, 128 | Superseded by later instructor decisions; DW-128 merged into DW-126. | Each note names the decision. |
| DWC-004 | DW-041, DW-122 | DW-041 re-owned to Claude Code (decided 2026-09-08, unexecuted); DW-122 re-owned to the instructor (ratification only). | `CASE.md:89` at `ac94b6b`. |
| DWC-005 | DW-086, DW-157, DW-158 | DW-086's three outside lists folded: two new rows, the rest pointers. | `grep -rn "\b845\b"` finds the figure only in the inventory that retired it. |
| DWC-006 | DW-131 to DW-158 | 28 new rows, each confirmed absent from the register by locator and ledger id before it was written. | The sweep's file:line for each. |
| DWC-007 | about 70 open rows | A dated *Catch-up 2026-10-11* note with current locators, counts and the wave or decision that closes the row. | Four read-only sweeps of the tree at `ac94b6b`. |

## Wave 3, DW-041 (`f89a2ce`)

| Id | Row(s) | Change | Evidence |
|---|---|---|---|
| DWC-008 | DW-041 | `CASE.md` §A.5: the Investment adviser row becomes *Financial planner and investment adviser: the student's firm*, a planning engagement, assets still held direct at a custodian, no start date fixed by the case. Part O's conflict note becomes a dated resolution; Part N gains 4.5; `instructor-notes/session-3.md` says the excerpt and the case agree. D-01's default dated the engagement 2026; the executed line fixes no start date, because §A.6's January 2026 intake names no party. The instructor decides (plan §10, D-01). | `build-case` rewrote nothing; `inject-case --check` 7 current; `verify-case` 7 of 7; `verify-migration` 15 passed. |
| DWC-009 | none | The register and plan quoted a session-3 line number that `verify-migration` check 1 reads as a retired IRC section; both now quote the string. | `verify-migration` 13 passed / 2 failed before, 15 / 0 after. |

## Wave 2, live pages and tooling (this commit)

Five file groups, each implemented by one agent and checked by an independent skeptic; two
skeptics and one repair pass died to a usage limit, so the whole diff then went through a second,
five-lens adversarial review (see `handback.md`).

| Id | Row | Change | Evidence |
|---|---|---|---|
| DWC-010 | DW-007 | `session-1` §10: the chip after *"Prices: Anthropic Claude Platform Docs"* resolves to `src-pricing`. `BIBLIOGRAPHY.md`, `DATA-PULL.md` and `docs/source-verification-queue.md` regenerated. | `build-bibliography --check` current; `inject-sources --check` current. |
| DWC-011 | DW-091 | `session-1`: as reworded after the review, *"Session 2 &sect;04 builds up three starter prompts, then has you rewrite the weakest of the three you write, or one of its starters if you have none."* | Session 2 §04's builder and its gate. |
| DWC-012 | DW-077 | `session-0.1`, `session-1`: one identical lesson-local `@media (max-width:720px)` rule hides the Shift+U badge and truncates the title; the badge, not a console control, was what pushed the button out. | `#caseBtn` right edge at 380 px: 630 and 615 before, 364.8 after; 1280 px screenshots byte-identical; console fence md5s unchanged. |
| DWC-013 | DW-106 | `session-2` §00 `data-nav` reads *Retrieval bridge*, the heading on screen. | Sessions 3 to 5 also carry no `<h2>` in §00, so the label was matched to the heading rather than a heading added. |
| DWC-014 | DW-119 | `session-2` `.scale` wraps. | `scrollWidth` 380 at 380 px. |
| DWC-015 | DW-114 | `session-2` bridge: per-item *Lock and reveal*; *Reveal all three* locks every box first; after the review each box is labelled by its question and each button described by it; the run sheet records the change in a dated section and keeps the as-taught line. | Session 2 change-folder checks 19 / 0 and 18 / 0. |
| DWC-016 | DW-131 | `session-5` §04 and §07 figure JS: the §04 station boxes 4 units taller, line pitches that clear the web fonts' height, the §07 viewBox 10 units taller. Layout only. The plan's font-abort in `drags.mjs` was not taken: it would measure fallback metrics a learner never sees (DW-162). | `drags.mjs` 36 / 36 with the web fonts and with them blocked; Session 5 checks, 962 section assertions and `interactivity.mjs` metrics unchanged. |
| DWC-017 | DW-140 | Six footer stamps set to each page's last content change; pages edited today read 2026-10-11. | `git log -1 --no-merges` per page at `f89a2ce`. |
| DWC-018 | DW-043 | `scripts/verify-case.mjs` asserts the 20 lesson-local `.case-*` rules agree across the seven pages. The register's *17* counted single-line rules only. | Exit 0 on the tree; mutation tests fail naming the one file. |
| DWC-019 | DW-080, DW-112 | `scripts/verify-style.mjs` resolves the sweep from `RESTYLE_SWEEP`, `LESSON_BUILDER_SKILL`, then the home directory; MAINTAINING documents both; the two stale copies of the old path gain dated notes; MAINTAINING names `verify-wolfram-quotes.py` and `state_space.py`. | Exit 1 on this host, naming every path tried. |
| DWC-020 | DW-132, DW-133 | MAINTAINING: jsdom for change-folder checks; each folder's checks pin its own pass, and which folder is each lesson's regression set. | Every `docs/changes/*/checks.mjs` run with jsdom. |
| DWC-021 | DW-135 | `scripts/build-unsourced.mjs` reads A16's three declared forms over A16's population; `docs/unsourced-claims.md` lists Session 0.1's four claims and two not-claims. | `build-unsourced --check` current; A16 6 markers. |
| DWC-022 | DW-134 | `docs/audits/profiles/*.json` regenerated for all six lessons with jsdom; Session 0.1 profiled for the first time. | `file_lines` matches each page. |
| DWC-023 | DW-141 | README's legal-characterisation sentence true of every page. | No `.verify` block on sessions 2 to 5. |
| DWC-024 | DW-032, DW-033, DW-102 | Dated corrections in `docs/spine-brief.md` and `docs/repo-updates-plan.md`; MAINTAINING's superseded follow-ups struck through with pointers. | |
| DWC-025 | DW-137 | `docs/changes/2026-09-21-session-3-visual-pass/ledger.md` reconstructed from the commit bodies; a retired Part K term in two quotes is elided with a note, because `verify-migration` check 1 forbids it outside the registers. | `verify-migration` 15 / 0. |
| DWC-026 | DW-155 | Errata appended to the 2026-10-04 handback (the Rubric name at `plan.md:111`, the family count). | |
| DWC-027 | DW-154 | No rebuild: Session 4's `be54621` precedes its aid build, and Session 5's `e8d2cee` changed nothing the aid prints. | `git show` of both. |
| DWC-028 | DW-083 | `CHANGELOG.md` 2026-10-11 entry with two corrections to earlier entries; `changelog/index.html` regenerated. | No raw markdown in the rendered entry. |
| DWC-029 | DW-159 to DW-161 | Three rows for what Wave 2 found and did not fix (see the register). | |

## The review and its fixes

A five-lens adversarial review read Waves 1 to 3 (`handback.md`); every serious finding was re-run by a
second reviewer before it was acted on.

| Id | Row(s) | Change | Evidence |
|---|---|---|---|
| DWC-030 | DW-092 | Reopened: the Session 1 corrections slot never ran, and no record says the backlog was delivered. It also carries the three spoken mismatches recorded only on DW-041. | The Session 2 audit; the 09-17 plan and queue; the 09-18 handback. |
| DWC-031 | about 25 rows | Dated corrections where a Wave 1 or Wave 2 note misstated the tree; the header's counts and decisions table corrected; three table-breaking pipes escaped. | Each correction cites its source. |
| DWC-032 | DW-043 | `verify-case.mjs`: real-path main guard (it failed open through a symlink), empty-set failure, duplicates reported. | Mutation runs on scratch copies, through a symlink. |
| DWC-033 | DW-135 | `build-unsourced.mjs`: the exemption pinned to the two convention lines; lexer fixes; the hub counted apart from A16's population, with its own form check. | Planted markers in session-0.1 and session-3 hard-fail. |
| DWC-034 | DW-080 | `build-changelog.py` reads `RESTYLE_SWEEP` first, as `verify-style.mjs` does. | Both pick the same file for every combination of the variables. |
| DWC-035 | DW-077, DW-091, DW-114 | The DW-077 comment's comparison corrected; DW-091's sentence reworded; bridge boxes tied to their questions. | Session 2 checks 19/0 and 18/0. |
| DWC-036 | none | `checks.mjs` for this folder: the register's integrity, CASE 4.5, and each Wave 2 page change. | It passes. |
| DWC-037 | DW-162 to DW-165 | Four rows for what the review found and this pass did not fix. | |
