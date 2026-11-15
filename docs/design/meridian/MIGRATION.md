# Meridian restyle: migration plan

Status on 2026-11-15: **prepared, nothing applied.** Every served page looks exactly as it did. This folder holds what a later session needs to restyle the whole site without touching its content.

The scope is presentation only. Text, figures, sources, chips, case facts, scripts and generated regions are frozen, and `content-freeze.mjs` proves it after every step.

## What is in this folder

| File | What it is |
|---|---|
| `DESIGN.md` | The design system's rules: colour roles, type, space, layout, figures, progress. Read this first. |
| `tokens.json` | Every token with its value and usage note. |
| `assets/tokens.css`, `assets/typography.css`, `assets/components.css` | The restyled shared style sheets, drafted from the skill's current `assets/` (identical to what the pages carry, payload `e13bf73a3fd0`). These are what the sweep writes into the fence. |
| `assets/outline.js` | Builds the outline sidebar and the earned checks. Commits only. |
| `skill-assets.diff` | Unified diff of the three style sheets against the skill's current files, for updating the skill afterwards. |
| `reference-components.css` | The component styles as the design-system reference shows them (`m-` prefixed). Reference only; not swept. |
| `build-drafts.py` | The script that produced the drafts. Its mechanical rules (label rules to the interface face, size and radius snapping, literals to tokens) are the ones to reuse on page-local CSS. |
| `content-freeze.mjs` | The content-freeze check. |
| `KICKOFF-PROMPT.md` | The prompt that starts the migration in a new session. |
| `ui-audit.mjs`, `style-snapshot.mjs` | The two tools the migration builds first: the page-local rule classifier with its off-token counts, and the computed-style recorder and comparer. |

Published references (private to the instructor): the design system at `https://claude.ai/artifact/NAXpFBo35siQuMWjqnppP6`, a working preview of Session 2 at `https://claude.ai/artifact/ACheynagMCSmehLuEoB3Ak`, and the design review at `https://claude.ai/artifact/K2HSVqkiaEBhdeQbMgtciB`.

## Decisions already made by the instructor

- Palette and type: Meridian. Navy ink and app bar, teal for the teaching voice and for done, amber for work-along, brick for caution, serif reading text. One light theme; no dark or presenter mode.
- Layout: app bar plus labelled outline sidebar, replacing the dot rail.
- Checks are earned by commits only. Opening a key without committing does not count. State is in memory and clears on reload.
- Order: this repository is restyled first; the skill is brought into line afterwards (D-120).

## The content freeze

```bash
git rev-parse origin/main > docs/design/meridian/FREEZE_REF     # once, before the first edit
node docs/design/meridian/content-freeze.mjs                    # after every step
```

It compares each of the twelve served pages with the same page at the freeze ref and fails on any of: a changed or missing word of text; a changed or missing `<script>` block; a removed attribute other than `class` and `style`; a changed generated region other than the STYLE fence; a fallen element count. Changes to `<style>`, `class`, `style`, whitespace and the footer stamp's date pass. Added elements, attributes and scripts pass and are reported with `--verbose`.

A script block that must change (a component that builds its controls in script and needs to emit `data-commit`) is named in `freeze-allow.json` beside the check, as `{"session-2/index.html": [{"hash": "<baseline hash>", "reason": "..."}]}`. Each entry is a judgment call and goes in DECISIONS.

Tested 2026-11-15: a copy of Session 2 with one sentence deleted, one id renamed and one script edited fails on all three; the same copy's colour change passes.

## What stands between the drafts and the pages

**1. The sweep reads the skill, and the skill is not updated yet.** `restyle_sweep.py` takes `--assets DIR`. `scripts/verify-style.mjs` and `scripts/build-changelog.py` both call the sweep without it, so they would report the Meridian fence as stale. Both need to pass `--assets docs/design/meridian/assets` (or read a path from one place) until the skill's own `assets/` match, and MAINTAINING's *Shared styling* needs to say so.

**2. Page-local CSS repeats fence selectors, and the local copy wins (DW-210).** Counted 2026-11-15 as rules whose selector also appears in the fence:

| Page | Local rules repeating a fence selector | Page-local CSS |
|---|---|---|
| `index.html` | 14 | 8 KB |
| `session-0.1` | 2 | 13 KB |
| `session-1` | 221 | 38 KB |
| `session-2` | 57 | 28 KB |
| `session-3` | 73 | 24 KB |
| `session-4` | 76 | 186 KB |
| `session-5` | 80 | 141 KB |
| `cases/case-1` to `case-5` | 7 each | 15 to 20 KB |

An identical copy is deleted by script. The distinct variations go to the instructor in one table, each with a keep-or-drop recommendation; a variation that is kept stays in the page. Session 2 has two known ones: `#topbar{display:none}` and a second `.plab` colour rule.

**3. Component CSS that exists only in a page** carries monospace capitals, literal colours, sub-12.5px sizes and old radii. It is not in the fence, so the sweep does not touch it. The rules in `build-drafts.py` convert it mechanically; the result is reviewed by screenshot.

**4. The outline and earned checks need markup.** `outline.js` goes into each lesson as an inline script, identical on every page (a generated, versioned region is the repository's pattern for that). Each control that records a learner's own answer takes `data-commit`. Components that build their controls in script must emit it.

The duplicate colour-token blocks, which would have blocked all of this, were removed on 2026-11-15 (D-117).

## Order of work

Revised 2026-11-15 to match the kickoff prompt, which wins where the two differ. The work runs by class of CSS rule across all twelve served pages at once, not page by page, in three steps on one branch, each its own commit so it can be reverted alone. Progress is recorded in `docs/changes/<date>-meridian-restyle/ledger.md`, which is the resume point.

**Tools first**, kept in this folder and each tested on a deliberately altered scratch copy before it is trusted:

- `ui-audit` classifies every page-local rule (identical to a fence rule, a variation of one, shared by two or more pages, unique) and counts off-token values per page (literal colours, font sizes outside the eight-step scale, radii outside the three, monospace label rules).
- `style-snapshot` records the computed style of every element on every served page at 1440, 1024 and 320 px and compares two snapshots.

**Step 1, consolidate. One shared style source, and no page looks different.**

1. Freeze: a clean tree matching `origin/main`, `FREEZE_REF` written, then the freeze check, the full gate and `style-snapshot` as the baseline, and screenshots of every page at 1440 and 390 px.
2. Delete the page-local rules identical to a fence rule, by script.
3. One table of the distinct variations (selector, the fence's declarations, the page's, which pages, keep or drop with a reason). This is the one planned pause: the instructor answers, and the answers are applied.
4. Point the sweep, `scripts/verify-style.mjs` and `scripts/build-changelog.py` at `docs/design/meridian/assets` with the sweep's `--assets` option, and say so in MAINTAINING. Move page-only rules that are identical on two or more pages into the shared style sheets, through the sweep. A moved rule that loses a cascade fight it used to win goes back, with a note.

Checkpoint 1: `style-snapshot` matches the baseline everywhere except the variations the instructor chose to drop; the freeze check passes; the gate is green or each red line is explained.

**Step 2, restyle.**

1. Replace the shared style sheets with the Meridian drafts, carrying over the rules promoted in step 1, converted to tokens. Sweep.
2. Convert the remaining page-local CSS with the mechanical rules in `build-drafts.py`.

Checkpoint 2: the freeze check passes; `ui-audit`'s off-token counts are zero or each remaining value is listed with a reason; no horizontal scroll at 320 px; every text colour is 4.5:1 or better on its ground; after-screenshots at 1440 and 390 px are saved beside the before set.

**Step 3, outline.** `outline.js` goes into each lesson as one identical generated region, and `data-commit` onto each control that records a learner's own answer (commits only; opening a key does not count). A script block that must change goes in `freeze-allow.json` with a reason and a decision row.

Checkpoint 3: the freeze check passes with only the allowed entries; the outline lists every core section on every lesson; a commit fills a check and a reveal alone does not, shown on at least Session 2 and Session 4; nothing is written to browser storage; every section still scrolls freely; the gate is green or each red line is explained.

**Records.** CHANGELOG and its page, a DECISIONS row per judgment call, register rows for anything left open, the plan, ledger and a handback in the change folder, current footer stamps. Then one pull request, not merged.

A checkpoint that cannot be reached stops the work: the next step is not started, and what blocks it is recorded in the ledger.

## Rules that bind the work

- Never edit inside a generated or versioned region other than through its generator. The STYLE fence changes only through the sweep.
- The console regions in Sessions 1 and 4 (`LM`, `LMBOX`, `LMSTYLE`) are byte-paired and stay as they are. They pick up the new colours through the token aliases.
- PEDAGOGY 1.8 to 1.10 and 1.12: single self-contained file, no request beyond Google Fonts and the opt-in console, no browser storage, no section gating, no grading or LMS language.
- EDITORIAL D1: no new em dashes, in pages or in docs.
- A collision between two instructions is flagged, not resolved (PEDAGOGY 1.6).

## Out of scope, because it changes or moves content

Each is a register row for a later, separate change:

- Rewriting figure titles as findings.
- Moving source lines and first-use definitions into margin notes.
- A one-sentence finding under every section heading.
- Recolouring chart series that are drawn by page scripts.

## Afterwards: the skill

Apply `skill-assets.diff` to the skill's `assets/`, add `outline.js`, then remove the `--assets` override here so `verify-style` reads the skill again. The payload hash in every fence should not change when that happens; if it does, the two copies have drifted.
