# The single Fable prompt

Supersedes `fable-prompt.md`, `fable-prompt-2-session-4.md` and `fable-prompt-3-cleanup.md`, which
were written when the §01/§02 merge was still outstanding. That merge is done. This is one prompt
that runs to completion on its own.

**Before you paste it:** merge this branch to `main`, then cut a new branch from `main`.

```bash
# merge, then:
git checkout main && git pull
git checkout -b claude/session-3-final
```

Then paste everything inside the fence into a fresh Claude Code session on Fable 5.1.

---

```
You are finishing Session 3 of BUS ADM X433.4, "AI Foundations for Financial Advisors", a
CE course taught to eight financial advisors. Session 3 is taught Monday 2026-09-21, 6:00 to
9:00 PM Pacific. The page is already teach-ready. Your job is to make it good, and to keep working
until it is, without coming back to ask what to do next.

Work on the current branch. Do not push to main.

## HOW TO RUN THIS

This is a single prompt for a long session. Work the phases below in order. Do not stop after one
phase to ask whether to continue: finish a phase, commit it, push, and start the next. Stop only
when Phase 5's acceptance list is fully satisfied, or when you hit something in the HALT list.

Work single-threaded. Do not fan out subagents across edits to the lesson file; the repository's own
kickoff rejected that explicitly, and forty edits to one file collide.

## PHASE 0: READ. No edits until this is done.

In this order:

1. `docs/changes/2026-09-17-session-3-update-plan/plan.md` — the governing plan. Its Appendix is the
   builder's operating manual: every gate with its exact invocation, the six lines that are red by
   design, the em-dash ratchet and its landing procedure, the generated regions and their sentinels,
   every place a section's minutes appear, the CASE.md Part O prohibition, the standing prohibitions.
2. `docs/changes/2026-09-17-session-3-update-plan/handback.md` — what the previous pass did, and the
   two places it reversed the plan on purpose. Do not undo either reversal.
3. `audit/SESSION-3-MEASURED-FACTS-2026-09-17.md` — twelve facts established by direct measurement.
   Treat as ground truth. Do not re-derive them.
4. `audit/PEDAGOGICAL-AUDIT-SESSION-1-2026-08-31.md` and
   `audit/PEDAGOGICAL-AUDIT-SESSION-2-2026-09-14.md` — the two formal audits of the sessions as
   actually taught. These are the feedback this polish pass exists to answer. Read both in full.
   The findings registers (S1 F01-F24, S2 F01-F30) are the checklist Phase 3 works from.
5. `instructor-notes/session-3.md` — the run sheet he reads on the night. Every edit you make must
   leave it true, and you update it when it stops being true.
6. `session-3/index.html` — the target. 18 sections, 11 core, 62 planned core minutes, 83 appendix.

## WHAT THIS ROOM IS. Every judgement call resolves against this.

Eight learners. Six speak. Three are not practising advisors and have no client meeting to apply
this to. The cohort self-reports fewer than twenty prompts ever written and two to three out of ten
on competence, in the instructor's own words. One learner wrote after Session 1 that her head was
spinning, the pace was very swift, and the case was far beyond anything she had met.

Session 1 measured 2 of 17 interactions demonstrated by the instructor and ZERO executed by a
learner. That is the number that matters. The page is not failing because it is too complex; it is
failing because it gets narrated rather than worked.

On the night, three interactions are run by the room: §03's retriever preset 1, §08's copy-a-prompt
silent run, and a seven-step sorter opened off the Session 2 page. Everything else is narrated.
Do not add a fourth.

## PHASE 1: the polish pass

Read the whole page as one artifact. That is the thing this phase exists for.

Fix, in place:
- Any section whose prose says something a neighbouring section already said better.
- Any transition that does no work. A transition should name what the next block does that this one
  could not.
- Any sentence that addresses a learner as though they had done homework they have not done, or
  built something they have not built. Grep for "you wrote", "your three", "you recorded", "you
  pasted", "last time you".
- Any interaction whose floor is above this room: one that presupposes AI experience, a template
  library, or a client file. Say what the cheaper version is and make it.
- Any place the reading level jumps without warning. This room is credentialed and expert in
  planning, and beginner in AI. Precise planning jargon is welcome; unexplained AI jargon is not.

Special attention, because it is the only place in the course where a beginner runs AI on their own
machine with the instructor watching: §08's three app prompts for Word, Excel and PowerPoint. They
must work first time on a file an advisor already has open, with no setup. Shorter and more concrete
beats clever. If a prompt would fail on a real file, rewrite it.

Do NOT rewrite §09, §11, the merged §01/§02, or the run sheet wholesale. Each was rebuilt against a
specific audit finding within the last week and the wording is load-bearing. Fix a real defect if
you find one; do not restyle.

## PHASE 2: the three-non-advisors problem

Three of eight cannot apply an advisor meeting workflow to their own practice because they do not
have one. Session 3 is entirely about the advisor meeting workflow. No audit has addressed this and
no plan has fixed it.

Give them a parallel track for §06, §07, §08 and §11: the same exercise run against a recurring task
they DO have. It belongs in the run sheet as instructor guidance, and where a single sentence on the
page would carry it without cluttering the section, put it there too.

This is a judgement call about inclusion, not a mechanical edit. Take it seriously.

## PHASE 3: work the audit findings

The two audits carry 54 numbered findings between them. Most are about delivery and are the
instructor's to fix, not yours. Some are page defects that are still open.

Go through both findings registers one id at a time. For each, decide: already fixed, fixable on the
page now, instructor-only, or not applicable to Session 3. Fix the ones on the page. Produce the
full table in your handback so the next reader does not have to redo the pass.

Pay particular attention to the recurring structural findings, which are now two-for-two and will be
three-for-three if Session 3 does not break them: no stated objective, no closing check, zero
silent-work intervals, no poll decision rule ever fired. The run sheet already addresses all four.
Your job is to check that the PAGE supports what the run sheet promises, and to fix it where it does
not.

## PHASE 4: the final verification

- Run every gate. Full list in plan.md Appendix A.1.
- Run the four §03 preset queries in a browser and confirm the rankings and the margin flag are
  unchanged from the values in the HALT list below.
- Exercise every interaction in a browser: the bridge, the map, the pair sort, the retriever, the
  prediction, the Tuesday test, the workflow chain, the note-taker stages, the Office sorter, the
  consent quiz, the said/recommended/neither sort, the checklist. Report any that do not respond.
- Check the page at 380px width for horizontal overflow.
- Confirm the run sheet is still true after everything you changed.

## HALT CONDITIONS. Stop and report rather than working around any of these.

1. **The em-dash ratchet.** session-3's baseline is now **4 literal / 3 entity / 7 total**. Run
   `node scripts/test-editorial-regions.mjs` after every commit and read the session-3 line. A FALL
   is permitted: re-record it in `scripts/editorial-baseline.json` with a ONE-LINE surgical edit,
   never a rewrite of the file, and append a dated line to DW-122 in `docs/deferred-work.md`.
   **A RISE IN EITHER FORM IS A HALT.** Nothing you author may contain a literal em dash or an
   `&mdash;`. Use a comma, a colon, or a full stop.
2. **CASE.md Part O.** It holds the ten chunks §03 ranks. The page builds an IDF index over them at
   load, so a one-word edit moves every score. It is out of scope. Before and after your work these
   four preset results must be identical:
       D1 11.1 / D6 5.1 / D3 3.3 / D2 0.0   margin 53.8%
       D5 18.2 / D4 17.9                    margin  1.7%, flagged
       D8 29.2 / D3 8.0 / D7 3.8 / D1 3.7   margin 72.8%
       D7 26.5 then zeros                   margin  100%
3. **Generated regions.** Never hand-edit inside APXPANEL, APXBUDGET, APXSTUB, SOURCES or the CASE
   sentinels. Re-run the generator.
4. **No date, deadline, grade, weight or submission language on any page.** MAINTAINING.md Tier A
   and Tier B. This is why the syllabus due-date contradiction is NOT fixed on a page.
5. **No student-facing text may cite a DW register row by number.**
6. **No confidence chip whose `data-src` does not resolve in the footer.** That fails V4. In
   particular do NOT chip §08's add-in description: that chip waits on a browser check the
   instructor owes, and the honest unchipped hedge is already on the line.
7. **Never write `last_verified` from a build.** Only a human at a terminal may write it.
8. **Do not touch session-1, session-2 or session-4.** Two are taught and are now records; Session 4
   has its own pass.
9. **Do not remove the Shift+U override** to match session-2. session-3 keeps it, V8 passes because
   of it, and the instructor uses the one-key reveal on a 17-gate page.
10. **Do not add or remove an interaction root without saying so.** The count is 18 against a 13-to-15
    band, red by design. Movement in either direction must be reported, not silent.
11. **Egress-blocked hosts**: anthropic.com, artificialanalysis.ai, livebench.ai, openai.com,
    arxiv.org, reglab.stanford.edu, irs.gov. platform.claude.com is reachable. A figure from a
    blocked host is carried at its recorded date, never re-verified by you.

## PROCESS

- One commit per atomic item, with a message saying what changed and why.
- Open `docs/changes/<today>-session-3-final/` with `ledger.md` (ids FF-001 upward: anchor, planned
  edit, test, commit, result, status) and `checks.mjs` (one DOM assertion per item).
- After every structural commit: regenerate, run the gates, re-record T7 if it fell.
- Push after each group of about five items.

## PHASE 5: ACCEPTANCE. You are done when every one of these is true.

1. Every gate green except the documented by-design red lines, and any V6 movement reported.
2. The four §03 preset rankings and the margin flag are identical to the values above.
3. T7 has not risen. Any fall is re-recorded surgically with a dated DW-122 line.
4. Every interaction on the page responds in a browser, and you have said so one by one.
5. No horizontal overflow at 380px.
6. `instructor-notes/session-3.md` is true against the page as it now stands.
7. The three non-advisors have a parallel track.
8. Both audit findings registers are walked, with the full disposition table in the handback.
9. A handback at `docs/changes/<today>-session-3-final/handback.md` carrying: what changed and why,
   the findings-register table, the full gate output, before-and-after preset rankings, before-and-
   after T7, a self-review, the options you rejected, and numbered flags for anything unsettled.

## AT THE END, tell the instructor in plain words

- What you changed in the polish pass and what you deliberately left alone.
- What the three non-advisors now do during the workflow sections.
- Which audit findings are still open and which of those are his rather than a model's.
- Anything you found that worries you about Monday.

He is a CFP, MSFP, ChFC and CAP, and a curriculum designer. Quantify. Benchmark against the
alternative you rejected. No flattery, no padding. Say "not recommended" where it is earned, and
lead with the challenge if you think a premise here is wrong.
```
