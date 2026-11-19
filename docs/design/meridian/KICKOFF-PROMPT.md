# Kickoff prompt for the Meridian restyle

Revised 2026-11-15 to the prompt the restyle was actually started with. It replaces the page-by-page draft written earlier the same day: the work now runs by class of CSS rule across all twelve served pages at once, in three steps on one branch, with one planned pause. Where this file and `MIGRATION.md` once differed from the prompt below, the prompt won and both files were updated to match it.

Paste everything in the block below into a new Claude Code session on this repository.

```text
Unify this course site's UI under the Meridian design system, in one session, in three steps on one branch. Content is frozen throughout: every word, figure, source, chip, case fact, script and generated region stays as it is. If a step would change content, stop and ask me.

Where this prompt and docs/design/meridian/MIGRATION.md or KICKOFF-PROMPT.md differ, this prompt wins. Your first commit updates those two files to match it.

<read_first>
1. CLAUDE.md, then PEDAGOGY.md, MAINTAINING.md and EDITORIAL.md as it directs.
2. docs/design/meridian/: DESIGN.md, tokens.json, MIGRATION.md, assets/, build-drafts.py, content-freeze.mjs.
3. Register rows DW-209 to DW-211 and decisions D-117 to D-121.
</read_first>

<durable_state>
This session is long and its early context will be summarized. Before any page edit, create docs/changes/<today>-meridian-restyle/ with plan.md and ledger.md. The ledger is the source of truth for progress: after every completed unit of work, append what was done, the check results, and the exact next action, then commit and push. If you are ever unsure where you are, read the ledger, not your memory. A new session must be able to resume from the ledger alone.
</durable_state>

<method>
Work by class of CSS rule across all twelve served pages at once, not page by page. Measured on main: 6,183 page-local rules, of which 408 are identical to a rule in the STYLE fence, 267 share a selector with a fence rule but differ (113 distinct), and the rest exist only in pages, 39% of those bytes repeated on two or more pages.

Build two tools first and keep them in docs/design/meridian/:
- ui-audit: classifies every page-local rule (identical, variation, shared by 2+ pages, unique) and counts off-token values per page (literal colours, font sizes outside the eight-step scale, radii outside the three, monospace label rules).
- style-snapshot: records the computed style of every element on every served page at 1440, 1024 and 320 px, and compares two snapshots.
Test each tool on a deliberately altered scratch copy before trusting it.
</method>

<step_1_consolidate>
Goal: one shared style source, and no page looks different.
1. Confirm a clean tree matching origin/main. Write git rev-parse origin/main to docs/design/meridian/FREEZE_REF. Run content-freeze.mjs, the full gate and style-snapshot as the baseline. Save screenshots of every page at 1440 and 390 px.
2. Delete the rules identical to a fence rule, by script.
3. Write one table of the distinct variations: selector, the fence's declarations, the page's declarations, which pages, and your recommendation (keep or drop) with a reason. THIS IS THE ONE PLANNED PAUSE: give me the table and wait. Apply my answers.
4. Point the sweep, scripts/verify-style.mjs and scripts/build-changelog.py at the repository's copy of the style sheets with the sweep's --assets option, and update MAINTAINING to say so. Move page-only rules that are identical on two or more pages into the shared style sheets, through the sweep. If style-snapshot shows a moved rule losing a cascade fight it used to win, move it back and note it.
Checkpoint 1 is reached when: style-snapshot matches the baseline everywhere except the variations I chose to drop; content-freeze passes; the gate is green or each red line is explained. Commit, push, and continue to step 2 without waiting.
</step_1_consolidate>

<step_2_restyle>
1. Replace the shared style sheets with the Meridian drafts, carrying over the rules promoted in step 1, converted to tokens. Sweep.
2. Convert the remaining page-local CSS with the mechanical rules in build-drafts.py.
Checkpoint 2 is reached when: content-freeze passes; ui-audit's off-token counts are zero or each remaining value is listed with a reason; no horizontal scroll at 320 px; every text colour is 4.5:1 or better on its ground; after-screenshots of every page at 1440 and 390 px are saved beside the before set. Commit, push, and continue to step 3 without waiting.
</step_2_restyle>

<step_3_outline>
Add outline.js to each lesson as one identical generated region, and data-commit to each control that records a learner's own answer (commits only; opening a key does not count). A script block that must change goes in docs/design/meridian/freeze-allow.json with a reason and a decision row.
Checkpoint 3 is reached when: content-freeze passes with only the allowed entries; the outline lists every core section on every lesson; a commit fills a check and a reveal alone does not, shown on at least Session 2 and Session 4; nothing is written to browser storage; every section still scrolls freely; the gate is green or each red line is explained. Commit and push.
</step_3_outline>

<rules>
- Never edit inside a generated or versioned region except through its generator. The console regions in Sessions 1 and 4 are byte-paired and are not edited.
- No browser storage, no section gating, no new external request, no grading or LMS language, no new em dashes.
- Out of scope because they change or move content: rewriting figure titles, moving source lines into margin notes, adding section findings.
- If you run the gate twice on one tree, delete .verify-shots/ first.
- Keep the three steps as separate commits so each can be reverted alone.
- Flag, do not resolve: when two instructions collide, show me what collides, the evidence each way and your recommendation. That is the only other reason to stop before the end.
- If a checkpoint cannot be reached, do not start the next step. Record what blocks it in the ledger, commit, and tell me.
</rules>

<records>
A CHANGELOG entry and rebuilt changelog page, a DECISIONS row per judgment call, register rows for anything left open, the plan, ledger and a handback in the change folder, current footer stamps. Take the next free DECISIONS and register ids from main at the time you write them.
</records>

<finish>
After checkpoint 3, open one pull request and do not merge. Then tell me: what is done; the content-freeze, style-snapshot, ui-audit and gate results with their output; every variation kept; every freeze-allow entry; what you could not verify; what is left; and where the before-and-after screenshots are.
</finish>
```

## Why the prompt is built this way

- The freeze comes first because it is the one constraint that must hold on every step.
- The work runs by class of rule, not by page, because the page-local CSS is mostly repetition: of 6,183 page-local rules, 408 are identical to a fence rule and 39% of the page-only bytes repeat on two or more pages. One decision per distinct rule settles it on every page that carries it.
- Step 1 changes no pixel and step 2 changes every pixel, so the two are separate commits and separate checkpoints: `style-snapshot` can prove step 1 exactly, and nothing can prove step 2 except the freeze check, the audit counts and the screenshots.
- The one planned pause is the variation table, because which local rules are deliberate is the instructor's call and answering it once sets the rule for every page.
- The ledger in the change folder is the resume point, because the session outlives its own context.
