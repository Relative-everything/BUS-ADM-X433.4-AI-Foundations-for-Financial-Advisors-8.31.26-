# Kickoff prompt for the Meridian restyle

Paste everything in the block below into a new Claude Code session on this repository.

```text
Restyle this whole course site to the Meridian design system. This is a presentation-only change: every word, figure, source, chip, case fact, script and generated region is frozen. If a step would change content, stop and ask me.

<read_first>
Read these in full before any edit, in this order:
1. CLAUDE.md, then PEDAGOGY.md, MAINTAINING.md and EDITORIAL.md as it directs.
2. docs/design/meridian/MIGRATION.md. It is the plan. Follow its order of work.
3. docs/design/meridian/DESIGN.md and tokens.json. They are the design rules.
4. docs/design/meridian/assets/ (the three style sheets and outline.js) and build-drafts.py.
5. Register rows DW-204, DW-205 and DW-206 in docs/deferred-work.md, and decisions D-100 to D-104 in docs/next-term/DECISIONS.md.
</read_first>

<freeze>
Before the first edit:
- Confirm the working tree is clean and matches origin/main.
- Run: git rev-parse origin/main > docs/design/meridian/FREEZE_REF
- Run: node docs/design/meridian/content-freeze.mjs   (it must pass on the untouched tree)
- Run MAINTAINING's full gate and record the result as the baseline.
- Save screenshots of all twelve served pages at 1440, 1024, 390 and 320 px wide.

After every step, on every page you touched, run the freeze check again. A failure means content changed. Restore it. The only permitted exception is a script block that must emit data-commit: add it to docs/design/meridian/freeze-allow.json with a reason and log a decision.
</freeze>

<scope>
In scope: colours, type, spacing, radii, borders, the app bar, the outline sidebar with earned checks (commits only), evidence-chip styling, callout styling, and the CSS of every existing component.

Out of scope, and each stays exactly as it is: all text, figure titles and captions, source lines, chips and their keys, the Cole case, FACTS and SOURCES, the order and number of sections, timings, and every generated or versioned region except the STYLE fence. Do not rewrite figure titles, move source lines into margin notes, or add section findings. MIGRATION.md lists these as later work.
</scope>

<known_obstacles>
- The skill is not updated yet, by my decision. The sweep must read docs/design/meridian/assets through its --assets option, and scripts/verify-style.mjs and scripts/build-changelog.py must be pointed at the same place. Update MAINTAINING to say so.
- Page-local CSS repeats fence selectors and wins the cascade. Delete identical copies; keep deliberate variations with a comment and list each one for me.
- Sessions 4 and 5 carry 141 to 186 KB of page-local component CSS. Convert it with the mechanical rules in build-drafts.py, then check by screenshot.
- The console regions in Sessions 1 and 4 are byte-paired. Do not edit them.
- If you run the gate twice on one tree, delete .verify-shots/ first (DW-206).
</known_obstacles>

<how_to_work>
Work page by page in the order MIGRATION.md gives, Session 2 first as the pilot. Finish and verify one page before starting the next. After Session 2, stop and show me before-and-after screenshots at 1440 and 390 px and the list of local rules you kept as deliberate variations. Continue to the remaining pages after I answer.

For each page, done means: the freeze check passes; the gate is green or each red line is explained; no horizontal scroll at 320 px; every text colour is 4.5:1 or better on its ground; the page matches DESIGN.md.

Flag, do not resolve: if two instructions collide, or a placement is ambiguous, show me what collides, the evidence each way and your recommendation.
</how_to_work>

<records>
Record the work the way this repository does: a CHANGELOG entry and a rebuilt changelog page, a DECISIONS row for every judgment call, register rows for anything left open, a change folder under docs/changes/ with a plan, a ledger and a handback, and current footer stamps. No new em dashes anywhere.

Commit as you complete each page. Open one pull request when I ask for it. Do not merge.
</records>

<report>
When you stop, tell me: which pages are done, the freeze-check and gate results with their output, every deliberate variation you kept, every freeze-allow entry, what you could not verify, and what is left.
</report>
```

## Why the prompt is built this way

- The freeze comes before the plan because it is the one constraint that must hold on every step.
- The pilot stop after Session 2 is the only planned pause. It is where the open design calls (which local rules are deliberate) show up, and answering them once sets the rule for the other eleven pages.
- Scope names what stays as well as what changes, because the three out-of-scope items were in the design review and would otherwise look like part of the job.
