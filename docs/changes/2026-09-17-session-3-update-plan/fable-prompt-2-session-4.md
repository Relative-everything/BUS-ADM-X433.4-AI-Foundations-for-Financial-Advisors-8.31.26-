# Fable prompt 2: the Session 4 pre-flight

Run this after `fable-prompt.md` has handed back. Paste everything inside the fence into a fresh
Claude Code session on Fable 5.1, on branch `claude/session-3-update-plan-k1xbqs`.

Session 4 is taught 2026-09-28. It currently has the largest core in the course, an 11-line run
sheet, and several premises that are false because the thing they assume never happened.

---

```
You are doing the pre-flight on Session 4 of BUS ADM X433.4, "Compliance, Security and Responsible
Use", taught 2026-09-28 to eight financial advisors. Session 3 was taught 2026-09-21.

Work on branch claude/session-3-update-plan-k1xbqs. Do not push to main.

READ THESE FIRST, before any edit:
1. docs/changes/2026-09-17-session-3-update-plan/plan.md  — the governing plan. Its Appendix is the
   builder's operating manual: every gate with its exact invocation, the by-design red lines, the
   em-dash ratchet procedure, the generated regions, the minute-arithmetic rule, the CASE.md Part O
   prohibition, the standing prohibitions.
2. docs/changes/2026-09-17-session-3-update-plan/QUEUE.md — the two decisions the instructor has
   already made, which are binding on tasks 1 and 2 below.
3. instructor-notes/session-3.md — the shape a good run sheet in this repository takes. Task 7 asks
   you to build Session 4's to match.
4. session-4/index.html — the target. 13 core sections, 72 planned minutes, 5 appendix sections.

## THE RATCHET RUNS THE OPPOSITE WAY ON THIS PAGE. READ THIS TWICE.

session-3's baseline is 6 literal / 3 entity, majority literal.
**session-4's baseline is 1 literal / 82 entity / 83 total, majority ENTITY.**

So on session-4 the house form for an em dash is the `&mdash;` entity, and the literal character is
the minority at exactly 1.

- Writing a LITERAL em dash raises the literal count from 1. That is a HALT.
- Deleting prose will lower the ENTITY count. That is a fall: re-record it in
  scripts/editorial-baseline.json and append a dated line to the register saying before and after.
- If you need an em dash in new session-4 prose, write `&mdash;`, never the literal character.

Run `node scripts/test-editorial-regions.mjs` after every commit and read the session-4 line.

## TASK 1: the cold open becomes choose-one-of-four

Section sCold, session-4/index.html:1263, 8 minutes. The instructor has decided this. Do not
re-litigate it.

Replace "paste your last prompt" with "which of these four would you have sent?". Four prompts on
screen, all four written the way a beginner writes, one click to choose, then the existing eight
COLD_CHECKS render against the one the room picked rather than against a prompt nobody has.

Why: the paste version has run zero times in two sessions. In Session 1 it was lectured for 11.3
minutes with no learner pasting and no timer; in Session 2 it was absent entirely. The cohort
self-reports fewer than twenty prompts ever written. The five-week comparison the current run sheet
protects has no data points to protect.

Requirements:
- Keep the 8-minute slot, the section id, and the standing-ritual framing.
- Keep the eight COLD_CHECKS and their rendering logic. Only the input changes.
- Floor is one click. No typing anywhere in the path.
- The four candidate prompts must be plausible beginner prompts for an advisory task, and they must
  differ on the dimensions the eight checks actually measure, so the reveal teaches something
  whichever one the room picks.
- Produce a room-level artifact the instructor can refer back to later in the session.
- Do NOT touch session-2's cold open. Session 2 is taught and its page is now a record.

## TASK 2: remove every false Session 1 baseline premise

The instructor has decided: do not recapture the baseline, lean on the calculator's existing
90-minute fallback.

session-4 refers to a Session 1 baseline capture that never happened, in nine places. Find all of
them and fix each. The ones already located:

  :1238  Outcome 03 card, "the efficiency baseline you r..."
  :1688  "Enter the baseline minutes you recorded in Session 1 for a comparable deliverable"
  :1696  the srcnote on what the calculator does and does not know
  :1700  Work-along gate g8, "Enter your Session 1 baseline and price the verification burden"
  :1892  the D4 discussion proposition
  :1896  "Bring the number fr..." in the D4 commit panel
  :2079  the checklist row 'Session 1 baseline comparison'
  :2602  the calculator field {k:'base', l:'Session 1 baseline, minutes', h:'Your recorded time
         without AI. Fallback: 90', v:90}
  :2732  the locked-vote panel, "the one number from your Session 1 baseline calculator"

Grep for the rest yourself; do not trust this list to be complete.

The fix is a reword, not a removal. The calculator keeps working; it already defaults to 90. Change
the ask from "the number you recorded" to "your best estimate of how long this takes you unassisted,
and the default is 90 if you have none". The :2079 checklist row belongs to the Part 1 deliverable
list and should say baseline time against AI-assisted time without asserting when it was captured.

Nothing here may state a date, a deadline, a grade or a weight.

## TASK 3: purge the grade-weight violation

session-4/index.html:1864 ends: "...and it is worth 30% of Part 1."

MAINTAINING.md Tier A purges "any weight or percentage of a grade" and that rule was applied on
2026-08-27. This string survived. It is the only Tier A violation left on a served page in the whole
repository.

Remove the weight clause. Keep the sentence's real point, that the second half of the scalability
criterion has never actually been tested until this moment. Grading and weights are set by the
instructor outside this site, and a page has no standing to assert one.

## TASK 4: the duplicate declaration

session-4/index.html declares `var NPI` twice, at :2168 (a generic 12-field PII matrix) and :2512
(the Cole-specific 9-fact rebuild). The second wins and clears the host element first, so the page
renders correctly today. The first is 44 lines of dead code in the same scope, and the redeclaration
breaks under any future strict-mode or bundling change.

Remove the dead one. Confirm in a browser that §02's classifier still renders and scores, because
this is the section Task 5 also touches.

## TASK 5: reframe §02's re-identification row as a callback

Session 3 kept its version of this item deliberately, so Session 3 got the discovery first. The
handback at docs/changes/2026-09-17-session-3-update-plan/handback.md §3 explains why.

session-4:2516 is the `reid` row: "Sole owner of a Rockford aerospace-fastener manufacturer,
exploring a sale, adult son in operations", weight 96, with the srcnote at :1344 making the
combination point.

The room will already have met this exact insight on 09-21 as a firm-policy instinct. Reframe it so
Session 4 supplies what Session 3 could not: the legal test. Regulation S-P §248.3 is what turns
"this feels identifying" into "this is nonpublic personal information under the rule".

Follow the model session-4:1647 already uses: "Session 1: why it happens. Session 3: how often.
Tonight: what it costs you." One sentence naming that they found this last week and this is the
authority for it. Do not re-reveal it as though it were new.

## TASK 6: the minute arithmetic

session-4's core is 72 planned minutes in 13 sections, the largest in the course. Read plan.md §2 for
the method. The repository's own measured multiplier is 1.9x for a section where an interaction
fires, 1.0x when it is read without one, 1.7x as the working figure.

Do the arithmetic for a 180-minute block and report it honestly. Then propose a cut list that lands
the core in the same band Session 3 was taken to, naming which sections lose minutes and what is
lost. Look first at what Session 3 now hands over (the vendor questions, the retention and training
detail) and at anything Session 4 duplicates from earlier sessions.

Propose. Do not execute the cut list without saying clearly what you are cutting, because unlike
Sessions 1 to 3 this session has never been taught and there is no delivery data for it.

## TASK 7: write the Session 4 run sheet

instructor-notes/session-4.md is 11 lines. instructor-notes/session-3.md is the model: a clock with
times and page element ids and an opening sentence per slot, checkpoints readable off a clock, a
stated objective, polls with written decision rules, a small number of gated questions, a closing
check, a drop order, and per-slot notes.

Build Session 4's to the same shape. It must include:
- A stated objective for the session, capability-phrased, with a closing check at the same Bloom
  tier.
- The D4 discussion block (session-4:1886, 18 min, appendix, standard tier). Scheduled discussion
  across the course is 0 minutes against a protocol target of 40, and the plan committed to paying
  that debt here rather than in Session 3. Schedule it, and say in the sheet what it displaces.
- The Part 1 relay and the cold first run, which is the highest-stakes block of the night.
- Nothing addressing a learner. No dates, deadlines, grades or weights.

## HARD CONSTRAINTS

1. The ratchet, above. session-4 is entity-majority. A literal em dash is a halt.
2. CASE.md Part O is out of scope.
3. Never hand-edit a generated region: APXPANEL, APXBUDGET, APXSTUB, SOURCES, the CASE sentinels.
   Re-run the generator.
4. No date, deadline, grade, weight or submission language on any page.
5. No student-facing text may cite a DW register row by number.
6. No confidence chip whose data-src does not resolve in the footer. That fails V4.
7. No live-model console on Sessions 2 to 4.
8. Never write last_verified from a build.
9. Egress-blocked: anthropic.com, artificialanalysis.ai, livebench.ai, openai.com, arxiv.org,
   reglab.stanford.edu, irs.gov. platform.claude.com is reachable.
10. Do not touch session-3 or session-2. Session 3 was finished in the previous pass and Session 2
    is a record of a taught session.

## PROCESS

Single-threaded. Do not fan out a workflow across edits to one file.

One commit per atomic item. Open docs/changes/<today>-session-4-preflight/ with ledger.md (ids
S4-001 upward) and checks.mjs. Regenerate and run the gates after every structural commit. Push
after each group of about five items.

## GATES

From the repository root with NODE_PATH at the global npm root: verify-case, verify-migration,
verify-sources, verify-editorial, test-editorial-regions, build-appendix --check, inject-sources
--check, inject-case --check, build-unsourced --check, build-bibliography --check, case-inventory
--report-check, audit/section_profile.mjs session-4/index.html, verify-browser, test-case-viewer.

From the interactive-lesson-builder skill root with the repo as argument: validate_lesson.py with
--case Cole --purge "Okonkwo,Reyes,Adaeze,Ilesanmi" --require-timing --require-tagging,
validate_dom.js, restyle_sweep.py.

KNOWN RED, not yours to fix:
- verify-browser "zero JS errors on load" fails on every lesson with ERR_CERT_AUTHORITY_INVALID.
  That is the build environment's TLS interception on the Google Fonts request, not a page defect.
- V2 footer citation hyperlinks, upstream.
- validate_dom "#pnum did not flip", upstream.
- verify-sources ADVISE on src-finra2409: this one IS session-4's, listed by the page and cited by
  nothing. Either chip a claim to it or remove the record. Say which you did.

## ACCEPTANCE

1. The cold open takes one click and no typing, and the eight checks render against the chosen
   prompt.
2. Zero references remain to a Session 1 baseline capture that did not happen. Grep proves it.
3. The 30% weight string is gone; the sentence still makes its point.
4. `var NPI` is declared once; §02 renders and scores in a browser.
5. §02's re-identification row reads as a callback with the legal authority, not a fresh reveal.
6. The minute arithmetic is reported, with a proposed cut list, executed only as far as you say.
7. instructor-notes/session-4.md is a real run sheet with a clock, an objective and a closing check.
8. session-4's T7 has not risen in either form; any fall is re-recorded with a dated register line.
9. Every gate green except the known-red lines above, and src-finra2409 is resolved either way.
10. A handback at docs/changes/<today>-session-4-preflight/handback.md with the full gate output,
    before-and-after T7 figures, a self-review, rejected options, and numbered flags.

## AT THE END

Tell the instructor in plain words: what the cold open now asks the room to do; what the minute
arithmetic says about Session 4 and what you propose cutting; and anything that needs him rather
than a model. He is a CFP and a curriculum designer. Quantify, no padding, say "not recommended"
where earned.
```
