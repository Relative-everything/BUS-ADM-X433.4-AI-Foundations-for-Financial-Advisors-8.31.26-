# Session 0.1 build progress

Live state file for the EXECUTE session. A fresh context window restarts from
this file plus `git log`. Newest state overwrites in place; this is not a log.

Last updated: 2026-08-22

## Authority order in force
1. `references/pedagogy.md` (skill bundle) s1 R1-R12
2. Other skill bundle files (component-bank, design-system, component-library,
   evidence-standards, build-checklist, repo-workflow)
3. `docs/session-0-1-BUILD-SPEC.md`
4. `docs/evidence-annex-verified.md` (later and sourced; wins over the spec)
5. The EXECUTE instruction message

## Where the tools actually live
The repo has no `scripts/restyle_sweep.py`, `new_session.py`,
`validate_lesson.py`, or `validate_dom.js`. All four ship in the skill bundle:

    SK=/root/.claude/skills/synced/interactive-lesson-builder

Every command below runs `python3 $SK/scripts/<tool>` (or `node $SK/scripts/...`)
with this repo as the positional argument. That matches the skill's own
documented signature (`restyle_sweep.py <repo>`).

## Sections complete
- [x] step 0  repository file structure fixed          commit 7cf88db
- [x] step 1  scaffold smoke-test session-0.1/         commit 0da089e
- [ ] step 2  case block pasted + diffed
- [ ] step 3  time-budget table
- [ ] step 4  SURFACE array
- [ ] step 5  sections 0-3, 5-11
- [ ] step 6  section 4 ctx-inspector
- [ ] step 7  footer, twelve source entries
- [ ] step 8  inspector CSS into skill components.css, then sweep

## Validator state
Not yet run against session-0.1/index.html.

## Open flags
- FLAG-P1  the EXECUTE message named four nested upload paths; three were at
  different depths and one was already at its target. All four present. Moved
  to the named destinations in step 0. Non-blocking.
- FLAG-P2  script location, see "Where the tools actually live" above.
- FLAG-P3  jsdom was absent; installed `--no-save` into ./node_modules.
  The repo has no .gitignore. Never `git add -A`.
- FLAG-P4  `restyle_sweep.py . --check` at preflight: 6 stale, 0 current,
  0 without fence, exit 1. Pre-existing. Step 8 necessarily refreshes all six
  because adding inspector CSS changes the payload hash for every lesson.
- FLAG-CASE-1  BLOCKING-SEVERITY, user decision. `docs/probe-captures.md` P2
  was run against "David and Sarah Cole". `CASE.md` canonical household is
  "Meg and David Cole". There is no Sarah Cole in the case.
- FLAG-CASE-2  BLOCKING-SEVERITY, user decision. P3's capture models figures
  that contradict `CASE.md`: interest FMV $12.0M vs $7,200,000 pre-discount;
  basis $1.2M vs $240,000; seed gift $1.2M vs $650,000.
  Resolution taken for both: ship the captures verbatim (the EXECUTE message
  requires verbatim base strings, and editing a transcript would breach R1),
  label the divergence on the page and in the footer as a designed defect
  (R5), and leave `CASE.md` untouched. Reversible in one edit.
- FLAG-1 (spec s4)  s6 two-bucket-sorter / s7 multi-column-sorter adjacency
  kept per D6 and flagged on the page.
- FLAG-CSS-1  family 17 chrome (`.ritual .rlab .rout .rz .rnil .rfx .rnote`)
  and the section-layout classes `.body` / `.mins` are used by session-1 and
  session-2 but are absent from the skill's `assets/components.css`. They live
  in each lesson's own post-fence style block. Session 0.1 follows the corpus
  and keeps them lesson-local; only genuinely new ctx-inspector CSS goes into
  the skill.
- src-scanning (annex B3) deliberately NOT shipped: the footer is fixed at
  twelve keys by the EXECUTE message, and B3's supply-chain line is the only
  thing that would need a thirteenth.

## Next action
Step 2: paste the Cole block byte-identically into the s1 panel and the case
modal, then diff both against the CASE.md fenced block with a script.
