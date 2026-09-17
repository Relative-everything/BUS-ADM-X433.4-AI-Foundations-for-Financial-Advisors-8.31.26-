# The Fable prompt

Paste everything inside the fence into a fresh Claude Code session on Fable 5.1, on branch
`claude/session-3-update-plan-k1xbqs`, once the allowance resets. Budget: one evening. It does the
one task held back for the stronger model, then polishes, then hands back.

---

```
You are finishing the Session 3 lesson for BUS ADM X433.4, AI Foundations for Financial Advisors,
taught Monday 2026-09-21 to eight financial advisors. Today the page is teach-ready; your job is to
make it good.

Work on branch claude/session-3-update-plan-k1xbqs. Do not push to main.

READ THESE FIRST, in this order, before any edit:
1. docs/changes/2026-09-17-session-3-update-plan/plan.md  — the governing plan. Its Appendix is the
   builder's operating manual: every gate with its exact invocation, the six lines that are red by
   design, the em-dash ratchet and its landing procedure, the generated regions and their sentinels,
   the complete list of places a section's minutes appear, the CASE.md Part O prohibition, and the
   standing prohibitions.
2. docs/changes/2026-09-17-session-3-update-plan/handback.md — what the previous pass did, what it
   deliberately left, and the one place it reversed the plan and why.
3. instructor-notes/session-3.md — the run sheet the instructor reads on the night. Your edits must
   leave it true.
4. session-3/index.html — the target.

## TASK 1, the reason you are the model running this: merge §01 and §02

Sections s2 ("Embeddings and the Coordinates of Meaning Space", 5 min) and s3 ("Distributional
Similarity and Referential Difference", 5 min) become ONE core section of 7 planned minutes.

This is compression without conceptual loss, on the most abstract block in the session, for a room
that self-reports two to three out of ten on AI competence and fewer than twenty prompts ever
written. Three minutes have to come out and the teaching cannot thin.

Keep, non-negotiable:
- Wolfram's definition and his figures. They are chipped H to src-wolfram and are an assigned
  reading for this session.
- The nearest-neighbour map interaction. Clicking a term draws a dashed line to each nearest
  neighbour with the distance on it. It is the only spatial intuition the session offers.
- The alligator-and-crocodile pair. That pair does the conceptual work of the second section: two
  words that sit close together in meaning space and refer to different animals. It is the bridge
  into §03's failure.

The merged section must land the one idea the rest of the session depends on: nearness in meaning
space is not the same as being the right answer. §03 then shows a retriever ranking the 2023
appraisal third because it shares only the word "value" with the question.

Judgement calls are yours. Two sorters where one will do is a candidate. A paragraph that restates
the map in prose is a candidate. Wolfram's numbers are not.

Mechanics:
- Give the merged section s2's id so the run sheet and the nav keep working, or update every
  reference if you choose otherwise. grep for "s3" carefully before deleting it: the id appears in
  scripts and in data-insert-after attributes.
- Set the eyebrow to 7 min. Then run: node scripts/build-appendix.mjs
- Core falls from 65 to 62 planned minutes. Confirm build-appendix --check reports agreement and
  that the three generated minute regions all say 62.
- If any appendix section has data-insert-after="s3", repoint it.

## TASK 2: the polish pass

Read the whole page as one artifact, which is the thing a smaller model does worst. Then fix:

- Any section whose prose says something a neighbouring section already said better.
- Any transition that does no work. The page should say what the next block does that this one could
  not.
- Any sentence that addresses a learner as though they had done homework they have not done. The
  audits record that nothing student-produced has appeared on screen in two sessions.
- Any interaction whose floor is above this room: an item that presupposes AI experience, a prompt
  that assumes a template library, a question a beginner cannot attempt.
- §08's three app prompts. They are the only place in the course where a beginner runs AI on their
  own machine, during class, with the instructor waiting. They must work first time on a file an
  advisor already has open. Make them shorter and more concrete if they are not.

Do NOT rewrite §09, §11 or the run sheet wholesale. They were rebuilt four days ago against specific
audit findings and their wording is load-bearing. Fix a real defect if you find one; do not restyle.

## HARD CONSTRAINTS. Violating any of these is a halt, not a tradeoff.

1. THE EM-DASH RATCHET. session-3's recorded baseline is 6 literal / 3 entity. Run
   `node scripts/test-editorial-regions.mjs` after every commit and read the session-3 line. A FALL
   is fine and must be re-recorded in scripts/editorial-baseline.json with a dated line appended to
   DW-122 giving before and after. A RISE IN EITHER FORM IS A HALT. Nothing you author may contain
   an em dash or an &mdash; entity. Use a comma, a colon, or a full stop.

2. CASE.md Part O is out of scope. It holds the ten chunks §03 ranks, and the page builds an IDF
   index over them at load, so a one-word edit moves every score and the margin flag. If a change
   seems to need it, stop and say so. Before and after your work, run the four §03 presets in a
   browser and confirm these are unchanged:
       D1 11.1 / D6 5.1 / D3 3.3 / D2 0.0   margin 53.8%
       D5 18.2 / D4 17.9                    margin  1.7%, flagged
       D8 29.2 / D3 8.0 / D7 3.8 / D1 3.7   margin 72.8%
       D7 26.5 then zeros                   margin  100%

3. NEVER hand-edit inside a generated region: APXPANEL, APXBUDGET, APXSTUB, SOURCES, the CASE
   sentinels. Re-run the generator instead.

4. No date, deadline, grade, weight or submission language on any page. MAINTAINING.md Tier A and
   Tier B. This is why the syllabus due-date contradiction is NOT fixed on a page.

5. No student-facing text may cite a DW register row by number.

6. Do not add a confidence chip whose data-src does not resolve in the footer. That fails V4. In
   particular do NOT chip §08's add-in description: that chip waits on a browser check the
   instructor owes, and the honest unchipped hedge is already on the line.

7. No live-model console on Sessions 2 to 4. A request for one is a halt.

8. Never write last_verified from a build. Only a human at a terminal may write it.

9. Egress-blocked from the build environment: anthropic.com, artificialanalysis.ai, livebench.ai,
   openai.com, arxiv.org, reglab.stanford.edu, irs.gov. platform.claude.com is reachable. A figure
   from a blocked host is carried at its recorded date, never re-verified by you.

## PROCESS

Work in the repository's own rhythm, single-threaded. Do NOT fan out a workflow across edits to one
file; the 2026-09-13 pass rejected that explicitly and forty edits to one file collide.

- One commit per atomic item, with a message that says what changed and why.
- Open docs/changes/2026-09-19-session-3-fable-pass/ with ledger.md (ids FB-001 upward: anchor,
  planned edit, test, commit, result, status) and checks.mjs (one DOM assertion per item).
- After every structural commit: regenerate, run the gates, re-record T7 if it fell.
- Push after each group of about five items.

## GATES. Green before you hand back, except the by-design red lines.

From the repository root, with NODE_PATH at the global npm root:
  node scripts/verify-case.mjs
  node scripts/verify-migration.mjs
  node scripts/verify-sources.mjs
  node scripts/verify-editorial.mjs
  node scripts/test-editorial-regions.mjs
  node scripts/build-appendix.mjs --check
  node scripts/inject-sources.mjs --check
  node scripts/inject-case.mjs --check
  node scripts/build-unsourced.mjs --check
  node scripts/build-bibliography.mjs --check
  node scripts/case-inventory.mjs --report-check
  node scripts/audit/section_profile.mjs session-3/index.html
  node scripts/verify-browser.mjs
  node scripts/test-case-viewer.mjs

From the interactive-lesson-builder SKILL root, with the repo as argument:
  python3 scripts/validate_lesson.py <repo>/session-3/index.html \
    --case Cole --purge "Okonkwo,Reyes,Adaeze,Ilesanmi" --require-timing --require-tagging
  node    scripts/validate_dom.js <repo>/session-3/index.html
  python3 scripts/restyle_sweep.py <repo>

RED BY DESIGN. Do not "fix" these; a green line here is the anomaly:
  V2, five FAILs, one per footer citation hyperlink                      DW-029, upstream
  V6, "distinct interactions (band 13-15)"                               DW-094, by instruction
  validate_dom "#pnum did not flip"                                      DW-112, upstream
  restyle_sweep --check, two fragments without a fence                   documented
  verify-sources one ADVISE on src-finra2409                             session-4's, DW-021
  V4, three bare chips                                                   the footer legend

Note on V6: merging two sections MAY drop the interaction count. The page is at 18 against a 13-to-15
band. If your merge removes a root, say so explicitly and give the new count; moving toward the band
is good, but it must be reported, not silent.

Note on V8: session-3 keeps the Shift+U override, so V8 passes and DOM mode marks 17 of 17 gates.
Do not remove the override to match session-2. Doing so turns both lines red and costs the
instructor the one-key reveal on a 17-gate page he teaches in two days. DW-117 is recorded as a
deliberate divergence.

## ACCEPTANCE

You are done when all of these are true:
1. §01 and §02 are one core section of 7 planned minutes; core is 62; build-appendix --check agrees
   and all three generated minute regions say 62.
2. Wolfram's definition and figures, the nearest-neighbour map and the alligator-crocodile pair are
   all still on the page and still work in a browser.
3. The four §03 preset rankings and the margin flag are byte-identical to the values above.
4. T7 for session-3 has not risen in either form. If it fell, the new figure is recorded in
   editorial-baseline.json and a dated line is appended to DW-122.
5. Every gate above is green except the named by-design red lines, and any V6 movement is reported.
6. instructor-notes/session-3.md is still true. The §01/§02 slot already reads as one seven-minute
   narrated movement, so it should need no change; confirm rather than assume.
7. A handback at docs/changes/2026-09-19-session-3-fable-pass/handback.md carrying: what changed,
   the full gate output, the before-and-after preset rankings, the before-and-after T7 figures, a
   self-review, the options you rejected, and numbered flags for anything you could not settle.

## WHAT TO TELL THE INSTRUCTOR AT THE END

A short list, in plain words, of: what you cut from §01 and §02 and why it was safe; anything you
found in the polish pass that you did not fix and why; and anything that still needs him rather than
a model. He is a CFP and a curriculum designer. No flattery, no padding, quantify, and say "not
recommended" where it is earned.
```

---

## If the allowance is still short on Saturday

Run Task 1 only and skip Task 2. The merge is the item with the capability delta; the polish pass is
upside. A page at 65 planned core minutes teaches fine on the night, because the run sheet already
delivers §01 and §02 as one seven-minute narrated movement whether or not the page merges them.
