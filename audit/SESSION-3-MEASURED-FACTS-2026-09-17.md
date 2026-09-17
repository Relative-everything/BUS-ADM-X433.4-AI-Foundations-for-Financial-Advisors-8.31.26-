# Facts already established by direct measurement. Do not re-derive; build on these.

Every line below was verified against the repository on 2026-09-17. Cites are file:line.

## 1. The expansion factor is already measured and recorded

`audit/AUDIT-2026-09-07.md:357-359` (measuring the Session 1 Zoom transcript against the Session 1 page):

> "Session 1's designed sections ran at 1.9x their planned minutes when an interaction fired
> (§02: 13.5 against 7), 2.1x with a learner question inside (§03: 10.3 against 5) and 1.0x when
> read without one (§05: 5.2 against 5). A **1.7x multiplier on planned core minutes is the working
> figure (M)**."

Same audit, 359-361: Q&A and demonstration not tied to any section took **32 of the 95.5 on-page
minutes** in Session 1 and were where the room was most active. The audit's instruction: "Reserve 25
minutes for it explicitly rather than let it take what is left."

## 2. The interaction fire rate in Session 1 was zero learner-executed

`audit/AUDIT-2026-09-07.md:745`:

> "| Interactions | 13 to 15, at least one per section | **2 of 17 instructor-demonstrated,
> 0 learner-executed** | Absent |"

This is the single most important number in the corpus. It is not a cold-open problem. NO
interaction on the Session 1 page was executed by a learner.

## 3. The cold open has never run, in either session

`audit/AUDIT-2026-09-07.md:158`, the Session 1 row for sCold:

> "| 01 | sCold | Cold open, the ritual | 8 | **11.3** | **lectured** | timed-ritual | instructor
> only (M) | at 01:38:42 the instructor pasted his own prompt and pressed the analyser, then read the
> eight COLD_CHECKS rows in page order to 01:49:25; **no learner pasted, no silent window, no timer**
> | H on the order, M on the press |"

`audit/AUDIT-2026-09-07.md:744`: the cold-open lecture was one of two exposition blocks over the
12-minute ceiling, at **13.8 minutes** (01:36:02 to 01:49:48).

`audit/AUDIT-2026-09-07.md:273`, DW-064: "the ritual has never yet run in this course... The Session 1
ritual was lectured, not run (§2.2), so the first time a learner types a capital U into a lesson box
will be 2026-09-14." Session 2's audit (staged AUDIT-SESSION-2.md, F01 and §1.7E) records it absent
again on 2026-09-14. **Runs to date: zero of two.**

`audit/AUDIT-2026-09-07.md:752`: "series for the cold open starts at Session 2". The five-week
comparison Session 4's run sheet protects therefore has at most two possible data points, and
currently has zero.

## 4. Session 3 has already solved the typing-floor problem

`grep -nE '<textarea|contenteditable|<input' session-3/index.html` returns exactly ONE hit:

> `session-3/index.html:1296:    <input type="text" id="qBox" placeholder="or type a question about
> the Cole documents">`

and it is optional: four preset query buttons sit beside it. Session 2 carries 4 free-text areas.

Session 3's full interaction inventory by component family (17 roots):
two-bucket-sorter 4, builder-assembler 3, estimate-then-reveal 2, commit-first-mcq 2,
symptom-diagnoser 1, spoiler-reveal 1, sealed-vote-debate 1, retrieval-bridge 1, prediction-commit 1,
multi-column-sorter 1, click-map-explorer 1.

Every one is click / sort / vote / copy. **The instructor's stated complaint is about a component
Session 3 no longer has.**

## 5. Planned minutes, all four sessions, from the profilers

| Session | Core planned | Core sections | Appendix | Total |
|---|---|---|---|---|
| session-1 | 69 | 11 | 81 | 150 |
| session-2 | 69 | 11 | 81 | 150 |
| session-3 | 67 | 12 | 83 | 150 |
| session-4 | 72 | 13 | 78 | 150 |

Session 3 per-section core minutes: §00 5, §01 5, §02 5, §03 6, §04 6, §05 5, §06 6, §07 7,
§08 5, §09 6, §10 6, §11 5 = 67.

**Session 4 is the largest core in the course at 72 planned minutes.** Any plan that relieves
Session 3 by pushing content into Session 4 is moving an overrun, not solving one.

## 6. The run sheet's "reserve is generous" claim is false

`instructor-notes/session-3.md:3`: "the core runs 67 planned minutes and the block is 180, so the
reserve is generous".

At the repository's own 1.7x multiplier, 67 planned core = **114 actual minutes**. Session 2's
measured administration was 22.1 minutes (staged AUDIT-SESSION-2.md §1.2 rollup). 114 + 22 admin +
15 break + 25 Q&A reserve = **176 of 180**, before a stated objective, a silent-work interval, a
closing check, any poll, or any Session 2 debt is added. Confidence M, resting on the 1.7x figure
the repository itself labels M.

## 7. The named discussion block the protocol wants is already built and hidden

`session-3/index.html:1710-1737`, section `s15`, `data-comp="sealed-vote-debate"`, 18 min,
`data-tier="standard"` — so it is hidden at the page's default core-only depth.

It implements the four-phase protocol exactly: "Commit before anyone speaks; two speakers per side,
minority first; one complication; re-vote with both distributions on screen. A zero delta is a
finding, not a failure." (`session-3/index.html:1719`)

Scheduled discussion across Sessions 1 and 2 combined is **0 minutes against a protocol target of 40**
(staged AUDIT-SESSION-2.md §1.7D). The instrument to fix that is sitting in Session 3's appendix,
switched off.

## 8. No session objective on the page; a closing check exists but is unanchored

`session-3/index.html:1183`, the §00 lede, is a thesis not a capability statement:
> "Grounding makes the model cite your sources. The nearest passage is not always the right one."

`session-3/index.html:1758`, section s16, carries a genuine closing question:
> "Closing question · one to three answers, out loud, then we go — The grounded answer in §03 was
> correctly retrieved, accurately quoted, and wrong. Name the point in your own meeting workflow
> where you would catch it, and say who is left holding it if nobody does."

So the closing check EXISTS as an artifact. What is missing is an objective for it to close against,
and the evidence from both sessions is that the designed close is not what gets delivered (both
sessions ended on logistics).

## 9. The no-client-data rule is NOT on the Session 3 page

Grep across the tree: the rule is on `index.html:1080`, `session-1/index.html:1958`,
`session-4/index.html:2019` (footer), and in `instructor-notes/session-3.md:19` as a spoken
instruction. It is **absent from session-3/index.html**, whose §11 assigns Final Project Part 1 (the
handoff package) and the AI usage policy. Staged AUDIT-SESSION-2.md F08 rated the identical omission
High in Session 2.

## 10. The learner's own written feedback

`audit/AUDIT-2026-09-07.md:224-233`, paraphrased in the audit, learner B, after Session 1: her head
was spinning; the pace felt very swift; she is five classes into the programme and the case was far
beyond anything she had met; she asked how much of the site is covered in class versus
independently. Two days later, as a former teacher: if one learner feels it others do; what depth is
expected; and **"how she can test whether a prompt works for a workflow she does not run and has no
client notes for."**

The instructor's written reply (same section): the case is synthetic and need not be understood; the
site is "his version of slides, a visual aid that need never be opened and is not to be worked
through independently"; all graded content is submitted outside the site.

`audit/AUDIT-2026-09-07.md:250-252` names the contradiction this creates: "every 'Work along' line on
Session 2's page addresses a learner who has been told she need not do it." Session 3 carries the
same "Work along" gates (17 of them, per the DOM validator).

## 11. The Session 2 audit's blocking finding F15 rests on a false premise

F15 says the seven-step delegation Learning Objective "received zero minutes and **has no slot** in
Sessions 3, 4 or 5", and concludes "either it lands in Session 3 or it is struck from the syllabus."

The first half is true. The second half is wrong. **The instrument is already built, on Session 2's
own page**, and has been since before Session 2 was taught:

`session-2/index.html:1732`
> `<section class="slide apx" id="s9" data-nav="B4 · Seven steps" data-insert-after="s8"
> data-tier="standard">`
> "B4 · The Seven-Step Process and the Delegation Line — 16 min · standard · hidden at the current
> appendix depth"

It carries: a seven-item `multi-column-sorter` against a delegation line, an instructor key, an
adoption chart sourced to the T3 / Inside Information Software Survey 2026 (n=2,906, chip H) and
Kitces Research on Advisor Productivity (chip H), and prose explaining why steps 2 and 4 sit apart
from steps 3 and 7:

> "Step 2 is the elicitation of what a client actually wants, which is frequently not what they
> first say they want. Step 4 is the exercise of professional judgment that your registration, your
> credential and your liability all attach to. A model can draft language for either. It cannot
> perform either, and a workflow that quietly lets it is the failure mode this course exists to
> prevent." (`session-2/index.html:1760`)

It was hidden at core-only depth on 2026-09-14 and never opened.

Known defect if it is used: `audit/SESSION-2-CONTENT-AUDIT-2026-09-09.md:167` — "The seven CFP Board
step names carry no record and no chip." A CFP Board source record is owed before it is taught as
authoritative.

**Consequence for the plan.** Landing this objective is a scheduling decision, not a build. The
options are: teach B4 live off the Session 2 page on 2026-09-21 (zero build, 16 planned minutes on
the night); port it into Session 3 (60 to 90 minutes of build plus gate risk, same 16 planned
minutes); assign it async with a graded answer (zero class minutes, weak alignment); or strike it.

**It cannot be discharged by a framing line inside Session 3 §06.** §06's five stages (prep,
capture, summarise, follow-up, log) are a single meeting's tooling chain; the Board's seven steps
are the engagement-level process. They are orthogonal objects. A sentence placing tonight's work
inside steps 1, 2 and 7 is worth saying and is not "applying a structured delegation framework to
each step", which is what the objective's verb demands.

## 12. The pattern, stated once

Three of this course's strongest instruments are finished, validated, and were never run:

| Instrument | Where | State on the night it mattered |
|---|---|---|
| The opening ritual | `session-2/index.html:1372`, `session-4/index.html:1263` | lectured in S1 (11.3 min), absent in S2 |
| The seven-step delegation sorter | `session-2/index.html:1732`, appendix, standard tier | hidden at core-only depth, never opened |
| The four-phase named discussion | `session-3/index.html:1710`, appendix, standard tier | not yet taught; hidden at default depth |

Plus 17 of 17 interactions unexecuted in Session 1.

The build is not behind the delivery. The delivery is behind the build. Every plan item that adds
new material to Session 3 should be checked against this: is the thing missing, or is it built and
switched off?
