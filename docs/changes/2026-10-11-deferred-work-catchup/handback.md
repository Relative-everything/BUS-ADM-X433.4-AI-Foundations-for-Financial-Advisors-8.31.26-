# Handback: deferred-work catch-up, Waves 1 to 3, 2026-10-11

Branch `claude/magical-thompson-yhaivm`. `plan.md` is what was approved; `ledger.md` lists every change
(DWC-001 to DWC-039); `checks.mjs` pins the ones a static or DOM check can cover. This file says what landed, what the review found, and
what is left for you.

## 1. What landed

| Wave | Commit | What |
|---|---|---|
| plan | `5d755f4` | The triage of 85 open rows, 26 unrowed items, the re-cut priority, the decision message, the Cowork prompt. |
| 1 | `cd5d93e` | The register re-cut for a taught course: a 2026-10-11 header, a Closed table, closures, supersessions and 28 new rows. |
| 3 | `f89a2ce` | DW-041: `CASE.md` §A.5 records the student's firm as the engaged planner (4.5). |
| 2 | `1248efc` | Seven live-page defects, the six stamps, the case-layout check, the unsourced register, the profiles, the changelog entry. |
| record | `83f6ba5` | Wave 2's closures in the register; DW-159 to DW-161. |
| review | this commit and the two before it | The review's corrections and fixes (section 2). |

Register after the pass: 170 rows, 86 open, 66 closed, 18 superseded. Every id appears once
(`checks.mjs` DWC-001).

## 2. The review

Two of Wave 2's five independent verifiers and one repair pass died to a usage limit, so the whole of
Waves 1 to 3 then went through a five-lens adversarial review (Session 5, the pages, the scripts,
the documents, the register). Every blocking or should-fix finding was handed to a second reviewer
told to refute it before anything was changed. Of 49 findings, 31 were blocking or should-fix, and
30 of those survived the refutation; the other 18 were nits, read and mostly acted on.

**What it caught that matters.**

- **DW-092 had been closed wrongly.** Wave 1 closed the Session 1 corrections as delivered on
  2026-09-14 because the run sheet had a slot for them. The Session 2 audit says the opening block
  ran as open Q&A and the input/output price error was repeated in class; three later records say
  the backlog was never delivered. It is open again, owned by you (section 3).
- **Two script defects that failed open.** `verify-case.mjs`'s new main guard did nothing through a
  symlinked path, silently skipping the pre-existing hash checks too; `build-unsourced.mjs` could
  exempt a real string as a convention comment if its lexer lost its place. Both now fail closed,
  proved by planted mutations on scratch copies.
- **Statements on the served changelog that were false**: *five of six* stamps (it was six), *§10*
  for a chip in on-screen §05, and that `verify-style.mjs` resolved the sweep the way
  `build-changelog.py` did (it did not read `RESTYLE_SWEEP`; now both do).
- **Register text the tree contradicts**: two builder calls listed as instructor decisions, a Poll 2
  mismatch that had been fixed on 2026-09-18 (and a D-16 default that would have re-created it), a
  wrong DEC-3 destination, wrong counts in about a dozen notes, and three code spans that broke the
  table on GitHub. The notes are corrected by dated notes, not by rewriting the row; the header's decisions table was
edited in place, and the three code spans were fixed by escaping their pipes inside DW-004, DW-068
and DW-121.

**What it found and this pass did not fix** (rows opened): DW-162 (`drags.mjs` cannot report which
fonts it measured), DW-163 (Session 5 §07's route list drops steps past nine, so a typed question can
hide the record-writer), DW-164 (§07 wires cross desk 3's labels), DW-165 (`inject-case.mjs` has the
same symlink guard defect), and, before the merge, DW-166 to DW-170 for the findings left unfixed. Nits left as they are, now each a row: the case-layout check does not see a `<style
media>` attribute, CSS nesting or a rule after `CASE:END` (documented); the classifier's R2 bug in
session-0.1's head comment (DW-104).

**Three commits on this branch are red on `verify-migration` checks 1 and 3**: `5d755f4` and `cd5d93e`
quote a session-3 line number the retired-fact check reads as an IRC section, and `f89a2ce` repaired
both; `6ff8d41`'s plan §10 quoted the same kind of string, and `70ab02e` repaired it. Merge the
branch whole or squash it.

## 3. What is yours

In the order the plan's §5 would put them:

1. **DW-092: was the corrections post made?** `instructor-notes/session-3-canvas-posts.md` Post 2
   carries the Session 1 and 2 corrections. If it was never posted, the cohort is still owed them.
2. **Wave 4, the tags.** No session has a delivered tag on origin. The commits are in DW-149 and
   the register header; five `git tag -a` lines and one `git push origin --tags`, on a machine whose
   credential can push tags (this environment gets HTTP 403).
3. **The decision message**, the plan's §6 as corrected in §10: D-01 now asks only whether the
   planner's engagement dates from the January 2026 intake; D-16's Poll 2 default is withdrawn and
   its four open Decide blocks are named; D-21 is new.
4. **Wave 5, the readings**, at a browser and a terminal: the plan's §7. arxiv.org, irs.gov,
   artificialanalysis.ai, openai.com, writings.stephenwolfram.com and ecfr.gov were all blocked from
   this environment.

## 4. Verification on the final tree

Run 2026-10-11 with jsdom installed globally and Playwright Chromium, web fonts loading:
`verify-editorial` 0 hard (2 A12 advisories, DW-067); `test-editorial-regions` 9 passed; `verify-case`
7 of 7 plus the layout check (20 rules); `verify-sources --check` 6 of 6; `verify-migration` 15
passed; every generator's `--check` current; `verify-browser` 0 failures; `test-case-viewer` 0;
`test_live_console` 86 passed; Session 2's two change-folder checks 19/0 and 18/0; Session 4's four
0 failed; Session 5's two all passed, its section tests 962/0, its `drags.mjs` 36/36 with the web
fonts and with them blocked; this folder's `checks.mjs` all passed. `verify-style.mjs` exits 1 because
the lesson-builder skill is not installed here, so `validate_lesson.py`, `validate_dom.js` and
`restyle_sweep.py` did not run; `changelog/index.html` was regenerated and its style fence refilled
from the committed copy, which a no-op regeneration showed to be byte-identical.
