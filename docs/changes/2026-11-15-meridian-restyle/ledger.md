# Meridian restyle: ledger

The source of truth for progress. Newest entry last. Each entry: what was done, the check results, the exact next action. To resume, read the last entry and do its next action. Plan: `plan.md`. Prompt: `docs/design/meridian/KICKOFF-PROMPT.md`.

## L-01, 2026-11-15: reading done, docs aligned, change folder opened

- Read CLAUDE.md, PEDAGOGY.md, MAINTAINING.md, EDITORIAL.md (regions and decisions), `docs/design/meridian/` in full, DW-209 to DW-211, D-117 to D-121.
- Tree was clean and `HEAD` equalled `origin/main` at `c058b5081a90d11394d1f3f3095f4840ce8d23d9`.
- Commit `e0da259`: MIGRATION.md and KICKOFF-PROMPT.md revised to the kickoff prompt (first commit, as instructed).
- This folder created with `plan.md` and this ledger. No page edited yet.
- Next free ids on main at this time: D-122, DW-212.
- Collision noted for the planned pause: the 20 `.case-*` layout rules are identical on all twelve pages, so the prompt's step 1.4 would move them into the shared sheets, but `scripts/verify-case.mjs` fails hard on a `.case-*` rule before `/* STYLE:END */` and MAINTAINING says a viewer layout rule belongs in `inject-case.mjs`. Recommendation to bring to the instructor: leave them in the pages in step 1.

**Next action:** write `docs/design/meridian/css-rules.mjs`, `ui-audit.mjs` and `style-snapshot.mjs`; test each on an altered scratch copy; then run the baseline (step 1.1).

## L-02, 2026-11-15: tools built and tested; baseline taken (step 1.1)

- Tools in `docs/design/meridian/`: `css-rules.mjs` (shared parser), `ui-audit.mjs`, `style-snapshot.mjs`, `consolidate.mjs`, `shots-compress.py`.
- `ui-audit` tested on a scratch copy with planted rules: one identical rule, one variation, one rule shared by two pages, a literal hex and an rgba(), two off-scale sizes, one off-scale radius and one monospace label each moved exactly the expected counter.
- `style-snapshot` tested: two records of the same files agree; a scratch copy with `h2{color}`, `.btn{padding}` and `.conf.h{letter-spacing}` changed reports each by element and property. Two fixes came out of testing: `Math.random` is seeded (Session 2's `#runs` draws at random), and boxes within 1 px count as the same box (SVG text wobbles by a fraction of a pixel between two records of one file: 3 of 14,073 on Session 3).
- My population differs from the prompt's measurement: 5,698 page-local rules, 416 identical to a fence rule, 201 variations (74 distinct), against 6,183 / 408 / 267 (113). I count a selector list as one rule and exclude the LMSTYLE fence and the CASE span's styles, which are generated or versioned and cannot be edited. Neither count is wrong; mine is the editable population.
- `FREEZE_REF` = `c058b5081a90d11394d1f3f3095f4840ce8d23d9`. `content-freeze.mjs`: frozen on 12 pages.
- Baseline gate (`gate.sh`, record in `gate/baseline.txt`): every in-repo check passes (23 of 23). The skill validators are red on the lines MAINTAINING lists as red by design and on nothing else: V2 on footer links, V4 `data-fact` chips (Sessions 1 and 2), V6 band and consecutive types, V8 and Shift+U on Session 2, `#pnum` on all six.
- Baseline snapshot: scratchpad `base/` (303 MB, not committed; re-create with `git stash; style-snapshot take`; or from the freeze ref in a worktree). Before-screenshots: `shots/before/`, 24 files, 1440 and 390 px, 64-colour PNG (21 MB).

**Next action:** step 1.2, `node docs/design/meridian/consolidate.mjs identical --write`.

## L-03, 2026-11-15: step 1.2 done, identical rules deleted

- `consolidate.mjs identical --write`: 342 page-local rules identical to a fence rule deleted (index 6, Session 1 216, Session 2 26, Session 3 31, Session 4 31, Session 5 32; Session 0.1 and the case pages carried none). 74 identical copies are left in place because deleting them would change the cascade: a rule of equal specificity between the fence rule and the page copy sets one of the same properties differently and can match the same element (for example the page copy of `h1,h2,h3,h4{margin:0}` sits after the fence's `h3{margin-top}` and overrides it). The list with the reason for each is `identical-report.json`.
- Checks: `style-snapshot diff` against the baseline: agree on 12 pages. `content-freeze`: frozen on 12 pages. `verify-case`, `verify-migration`, `verify-style`, `verify-editorial`, `verify-stamps`, `test-editorial-regions`, `docs/next-term/checks.mjs`: all exit 0.
- ui-audit now: 5,356 page-local rules, 74 identical (the order-bound ones), 201 variations (74 distinct).

**Next action:** step 1.3, write `variations.md` from `consolidate.mjs variations`, give the instructor the table and WAIT (the planned pause). Also raise the `.case-*` collision from L-01.

## L-04, 2026-11-15: step 1.3 table written; PAUSED for the instructor

- `variations.md`: 74 distinct variations (201 instances), each with what the fence sets, what the page sets, the pages, and a recommendation: 50 drop (9 of them with no visible change), 16 keep, 1 keep additions only, 7 keep and retire in step 2. `variations-answers.json` holds the same verdicts in the form `consolidate.mjs apply-variations` reads (`action`: drop, keep, additions, supersede).
- The `.case-*` collision is written up at the foot of `variations.md` with a recommendation (leave them in the pages; register row for `inject-case.mjs`).
- No page edited in this unit.

**Next action (after the instructor answers):** edit `variations-answers.json` to the answers; add the `additions` action to `consolidate.mjs apply-variations` (keep only declarations the fence does not set) and treat `supersede` as keep in step 1; run `apply-variations --write`; snapshot diff against the baseline and confirm every difference is on a dropped selector; freeze check; commit. Then step 1.4: copy the skill's three style sheets over `docs/design/meridian/assets/` as the step 1 shared source (keep the Meridian drafts aside as `assets-meridian/`), point `verify-style.mjs` and `build-changelog.py` at it with `--assets`, update MAINTAINING, run `consolidate.mjs promote`, sweep, snapshot, full gate, checkpoint 1.

## L-05, 2026-11-16: steps 1.3 and 1.4 done. CHECKPOINT 1 REACHED

**Answers (2026-11-16).** The instructor accepted every recommendation in `variations.md`, and chose to leave the `.case-*` rules in the pages. D-124.

**1.3 applied.** `consolidate.mjs apply-variations --write`: 134 instances deleted, 3 rewritten to their additions (`.chip{width:100%}` on Sessions 3 to 5), 44 kept, 20 kept to retire in step 2.
- Two side effects found by scanning the snapshot difference for large jumps, both on Session 2: `h3` top margin went 34 px to 0 (not to the shared 32), and the bar label `.tb-l` fell to unstyled serif. Rows 16, 24, 25, 26 were therefore restored and re-marked `supersede` in `variations-answers.json`: kept through step 1, retired in step 2 (D-125). The end state is the one the instructor chose.

**1.4 applied.**
- `docs/design/meridian/assets/` is now the shared style source: seeded from the skill's three sheets byte for byte (fence payload stayed `e13bf73a3fd0` before any promotion), with `outline.js`. The Meridian drafts moved to `assets-draft/` and replace `assets/` in step 2.
- `scripts/verify-style.mjs` and `scripts/build-changelog.py` pass `--assets docs/design/meridian/assets`; MAINTAINING's *Pre-push gate*, *Where this repo looks for the skill* and *Shared styling* say so.
- `consolidate.mjs promote --write`: 406 rules were identical on two or more pages; 202 moved to the end of `assets/components.css` (after one was moved back, below) and were swept into every fence (payload now differs from `e13bf73a3fd0` by design). 204 stay local: 33 order, 117 reach, 27 case-viewer rules, 25 kept variations, 1 print page rule, and `.cf-band-in`, moved back to the five case pages because `case-inventory.mjs` read its `34px` as a case figure in every fence. Detail: `promote-report.json`. D-126.
- No moved rule lost a cascade fight in the snapshot; the guard refused the 33 beforehand.

**Checkpoint 1 evidence.**
- `style-snapshot diff`, baseline against now: `same` on Session 0.1, Session 1 and the five case pages. The hub and Sessions 2 to 5 differ, and only by the dropped variations: the properties that moved are the ones those rules declared (type size, leading, margins, padding, gaps, max-width, scroll margin, and the text-area minimum height on Sessions 3 to 5) and nothing else (no colour, display or position change after the Session 2 restore). Post-drop record against post-promotion record: agree on 12 pages, and on the changelog page.
- `content-freeze`: frozen on 12 pages.
- Gate (`gate/checkpoint-1.txt`): every in-repo check passes. Skill-validator lines are identical to the baseline, all red by design. Explained lines: `case-inventory --report-check` needed `docs/case-fact-inventory.md` regenerated (line numbers moved; and the CSS count rose from 4 to 5 because dropping Session 2's `h1` rule exposed its `h3{margin-top:34px}` to the inventory's context heuristic; that rule retires in step 2). `verify-stamps` needed `--fix` because the date rolled to 2026-11-16.
- ui-audit: 4,459 page-local rules (from 5,698), 74 identical (order-bound), 73 variation instances, page-only bytes repeated on 2+ pages 20% (from 33%).

**Step 1 is commits `733834e` (tools, baseline), `7fd17d8` (1.2), `0ead3c0` (1.3 table) and the commit that carries this entry (1.3 applied, 1.4).** To revert step 1 alone, revert those four.

**Next action:** step 2. (1) `consolidate.mjs identical --write --force` to delete the 74 order-bound copies of the old sheet, and `apply-variations --retire --write` for the supersede rows. (2) Build the new `assets/`: `assets-draft/` tokens, typography, components, plus the promoted block from the current `assets/components.css` converted with `restyle-local.py css`. Sweep. (3) `restyle-local.py pages --write`. (4) Screenshots, ui-audit `--list`, contrast and 320 px overflow checks; fix page by class of problem. Checkpoint 2.

## L-06, 2026-11-16: step 2 applied; one checkpoint 2 criterion is NOT met as written (flagged)

**Applied.**
- `consolidate.mjs identical --force --write`: the 74 order-bound copies of the old sheet deleted. `apply-variations --retire --write`: the 24 keep-then-retire instances deleted (D-130).
- `assets/` now holds the Meridian `tokens.css` and `typography.css` and the Meridian `components.css` with the 202 promoted rules appended, converted by `restyle-local.py css`. `assets-draft/` removed. Swept into 13 pages.
- `restyle-local.py pages --write`: page-local CSS and inline `style` attributes converted with `build-drafts.py`'s rules plus X1 to X5 (D-129).
- Shared-sheet fixes after the contrast check: `#caseBtn.casefab`, `#topbar #ovr`, `.pipeline .ar` (D-131). `cases/case-3.html`: one narrow-screen rule so the page no longer scrolls sideways.
- `content-freeze.mjs` region pattern fixed (D-128).
- New tool: `contrast-check.mjs` (text colour against its ground at 1440 and 320 px in two states, and sideways scroll at 320 px).

**Checkpoint 2 evidence.**
- `content-freeze`: frozen on 12 pages.
- `ui-audit` (`ui-audit-after.txt`): page-local off-token values 2,238 to 137: colours 381 to 111, sizes 1,143 to 26, radii 350 to 0, monospace labels 364 to 0. Every remaining value is listed with its reason in `off-token-remaining.md`.
- No horizontal scroll at 320 px on any page (the baseline scrolled on `cases/case-3.html`, 49 px, and on Session 5 with everything revealed, 47 px).
- After-screenshots: `shots/after/`, 24 files, beside `shots/before/`.
- Gate (`gate/checkpoint-2.txt`): every in-repo check passes; skill-validator lines identical to the baseline.
- **Contrast: NOT 4.5:1 everywhere.** `contrast-check.mjs`: selectors below 4.5:1 went from 1,808 at the freeze ref to 65, on Sessions 1 to 5; the hub, Session 0.1 and the five case pages are clean. The list is `contrast-remaining.txt`. The 65 are of three kinds: (1) states the pages dim on purpose with `opacity` (a spent chip, a struck-out option, an unlit box, an appendix card hidden at the current depth); (2) colours a page script writes (Session 3's `#6F7B78` key text, Session 2's option marks), frozen with the scripts; (3) SVG text whose ground the checker cannot establish (white text on a path, a watermark numeral). None was introduced by the restyle; the three that were are fixed (D-131).

**Why this is a flag and not a pass.** The prompt says every text colour is 4.5:1 or better, and also that scripts are frozen and content does not change. Kinds (2) and (3) cannot be fixed without editing a script; kind (1) can only be fixed by redesigning what "spent" or "eliminated" looks like, component by component. Recommendation put to the instructor: accept the 65 as listed exceptions (WCAG 1.4.3 exempts inactive components and incidental text), open a register row for each kind, and continue to step 3.

**Step 2 is the commit that carries this entry.**

**Next action:** ask the instructor about the contrast exceptions (question tool). On "accept": add register rows DW-212+ for the three kinds, then step 3: write `scripts/build-outline.mjs` (generated `OUTLINE` region in the six lessons, from `docs/design/meridian/assets/outline.js`), extend `outline.js` (build a bar when the page has none: Sessions 3 to 5; `data-commit-in` delegation for controls built by script; `data-commit-needs`), write `docs/design/meridian/outline-commits.json` from the per-task control survey, run, verify on Sessions 2 and 4, gate, checkpoint 3.
