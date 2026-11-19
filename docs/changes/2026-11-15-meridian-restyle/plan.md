# Meridian restyle: plan

Started 2026-11-15 on branch `claude/meridian-design-unification-6v4p7m`, from `origin/main` at `c058b50`. The kickoff prompt is `docs/design/meridian/KICKOFF-PROMPT.md`; it wins over every other file where they differ. This file is the plan; `ledger.md` beside it is the record of progress and the resume point.

## Goal

Every served page (the hub, Session 0.1, Sessions 1 to 5, the five case pages) under one visual system, Meridian, with content frozen: no word, figure, source, chip, case fact, script or generated region changes. `docs/design/meridian/content-freeze.mjs` proves it after every unit of work.

## Method

By class of CSS rule across all twelve pages at once, never page by page. Single-threaded, no subagents (PEDAGOGY 12.6).

## Tools (built first, in `docs/design/meridian/`)

| Tool | Job | Tested by |
|---|---|---|
| `css-rules.mjs` | The shared parser: page-local regions (every `<style>` outside the STYLE fence, the LMSTYLE fence and the CASE span), rules with their at-rule context and source offsets | used by both tools below |
| `ui-audit.mjs` | Classifies every page-local rule (identical to a fence rule, variation of one, shared by 2+ pages, unique) and counts off-token values per page | a scratch copy with planted rules and values |
| `style-snapshot.mjs` | Records the computed style of every element and its `::before`/`::after` on every page at 1440, 1024 and 320 px, in two states (as loaded; everything revealed), and compares two snapshots | a scratch copy with one colour and one padding changed |
| `consolidate.mjs` | The step 1 editor: deletes identical rules, applies variation answers, promotes shared rules; refuses any move that an equal-specificity rule in between could reverse | the snapshot comparison |
| `restyle-local.py` | The step 2 editor: `build-drafts.py`'s mechanical rules over page-local CSS | ui-audit counts, screenshots |

## Steps and checkpoints

**Step 1, consolidate (no page looks different).**
1. Baseline: clean tree at `origin/main`, `FREEZE_REF`, freeze check, full gate, snapshot, screenshots at 1440 and 390 px in `shots/before/`.
2. Delete page-local rules identical to a fence rule, by script.
3. The variation table, `variations.md`. PLANNED PAUSE: the instructor answers keep or drop; answers are applied.
4. Sweep, `verify-style` and `build-changelog` read `docs/design/meridian/assets` (seeded with the skill's current three files, so the fence payload is unchanged at this point); MAINTAINING says so. Rules identical on 2+ pages move into the shared sheets through the sweep; a move that loses a cascade fight goes back, noted in the ledger.

Checkpoint 1: snapshot equals baseline except dropped variations; freeze passes; gate green or each red line explained. One commit series tagged in the ledger as step 1.

**Step 2, restyle.**
1. The Meridian drafts replace the shared sheets, with the step 1 promotions carried over and converted to tokens. Sweep.
2. Remaining page-local CSS converted with the mechanical rules.

Checkpoint 2: freeze passes; ui-audit off-token counts zero or each listed with a reason; no horizontal scroll at 320 px; every text colour 4.5:1 or better; after-screenshots in `shots/after/`.

**Step 3, outline.** `outline.js` in each lesson as one identical generated region (`OUTLINE:BEGIN`/`END`, written by a generator); `data-commit` on each control that records a learner's own answer. Script blocks that must change go in `freeze-allow.json`, each with a reason and a DECISIONS row.

Checkpoint 3: freeze passes with only allowed entries; the outline lists every core section on every lesson; a commit fills a check and a reveal alone does not (shown on Sessions 2 and 4); no browser storage; free scrolling; gate green or explained.

**Records and finish.** CHANGELOG and its page, DECISIONS rows, register rows, handback, footer stamps, one pull request, not merged.

## Standing rules

- Never edit inside a generated or versioned region except through its generator. LM, LMBOX and LMSTYLE in Sessions 1 and 4 are not edited.
- No browser storage, no section gating, no new external request, no grading or LMS language, no new em dashes.
- Out of scope: rewriting figure titles, moving source lines into margin notes, adding section findings.
- Delete `.verify-shots/` before a second gate run on one tree (DW-211).
- A collision between two instructions is flagged with evidence and a recommendation, not resolved.
- A checkpoint that cannot be reached stops the work; the blocker goes in the ledger.

## Environment for the gate

```bash
export NODE_PATH=$(npm root -g)          # jsdom installed globally with: npm i -g jsdom
export LESSON_BUILDER_SKILL=<the interactive-lesson-builder skill root>
export RESTYLE_SWEEP=$LESSON_BUILDER_SKILL/scripts/restyle_sweep.py
```
In this session the skill root is `/root/.claude/plugins/synced/<uuid>/jared-skills/skills/interactive-lesson-builder` (find it with `find / -name restyle_sweep.py`).
