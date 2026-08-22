# Session 0.1 build progress

Live state file for the EXECUTE session. A fresh context window restarts from
this file plus `git log`. This is state, not a log; it is overwritten in place.

Last updated: 2026-08-22. Build COMPLETE, all three gates green, not pushed.

## Authority order in force
1. `references/pedagogy.md` (skill bundle) s1 R1-R12
2. Other skill bundle files
3. `docs/session-0-1-BUILD-SPEC.md`
4. `docs/evidence-annex-verified.md` (later and sourced; wins over the spec)
5. The EXECUTE instruction message

## Where the tools actually live
The repo has no validators, scaffolder, or sweep. All four ship in the skill:

    SK=/root/.claude/skills/synced/interactive-lesson-builder

Every command runs `python3 $SK/scripts/<tool> .` or `node $SK/scripts/<tool>`,
with this repo as the positional argument. jsdom is installed at `$SK/node_modules`
so `validate_dom.js` resolves it and runs in DOM mode. Browser tooling for
checklist B8 lives in the session scratchpad, never in the repo: `restyle_sweep.py`
walks `rglob("*.html")` with no ignore list, so any `node_modules` under the repo
makes the sweep gate exit 1 on files that are not lessons.

## Steps
- [x] 0  repository file structure fixed                7cf88db
- [x] 1  scaffold smoke-test session-0.1/               0da089e
- [x] 2  case block pasted twice, diffed                1cde5f9
- [x] 3  time-budget table                              c3433eb
- [x] 4  SURFACE array                                  6d26604
- [x] 5  sections 0-3                                   b0b0d49
- [x] 5  sections 5-11                                  adbdc1c
- [x] 6  section 4, ctx-inspector                       a805ef9
- [x] 7  footer, twelve source entries                  (in adbdc1c)
- [x] 8  inspector CSS into the skill, then sweep       2868224
- [x]    validator fixes                                d2fe84a
- [x]    inspector wire fix, found in the browser       eff52bd
- [x]    section 0 close fix, found against the map     9c6a389

## Gate state (all green)
    validate_lesson  PASS  0 fail, 2 warn   --minutes 120 --require-timing --require-tagging
    validate_dom     PASS  MODE=jsdom, run with --require-dom
    restyle_sweep    PASS  --check, 7 current, 0 stale, 0 without fence

## Open flags for the user
- FLAG-CASE-1 and FLAG-CASE-2, BLOCKING-SEVERITY, user decision.
  `docs/probe-captures.md` P2 was run against "David and Sarah Cole"; CASE.md
  is "Meg and David Cole". P3 models $12.0M / $1.2M basis / $1.2M seed against
  CASE.md's $7,200,000 / $240,000 / $650,000. Captures ship verbatim, labelled
  on the page and in the footer as designed defects. CASE.md is untouched.
  Reversible in one edit if you want it handled differently.
- FLAG-B8-TOPBAR, corpus-wide, user decision. At 380px the topbar "Case facts"
  button is pushed off screen: 150px past the viewport here, 135px in
  session-1. Pre-existing in the skill's `typography.css`, not introduced by
  this build. Fixing it restyles every lesson, which is beyond this build's
  scope. One media query at `#topbar` would do it.
- FLAG-B7-TIMING. Sections 1 and 7 are over budget at the podium as timed.
  Details in the delivery report.
- FLAG-SPEC-BLOCKS. Spec s7.3 lists ten CTXBLOCK records; twelve controls
  inject something. Retrieved tool results and the attachment were added.
- FLAG-CSS-1. Family 17 chrome and `.body`/`.mins` are used by the corpus but
  absent from the skill's `components.css`; kept lesson-local as the corpus does.
- FLAG-C1-METHOD. The validator's prose-density INFO counts markup as prose
  (it never strips tags). Reported figure 86.1 w/min; tag-stripped section
  prose is 44.9 w/min. Part C, never blocks.
- src-scanning (annex B3) deliberately not shipped: the footer is fixed at
  twelve keys, and B3's supply-chain line is the only thing needing a
  thirteenth.

## Not done, and deliberately left to the user
Publishing. No push, no tag, no hub card, no CHANGELOG entry. The stubs the
scaffolder printed are in the delivery report, unapplied.

## Next action
None. Awaiting the user's decisions on the flags above, then publishing.
