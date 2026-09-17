# Session 3 update plan: the work, the order, and the one thing that decides both

Target: BUS ADM X433.4 Session 3, "Gathering and Documenting Client Information", taught Monday
2026-09-21, 6:00 to 9:00 PM Pacific. Written 2026-09-17. Four working days.

Inputs: the Session 1 and Session 2 pedagogical audits as taught; `audit/AUDIT-2026-09-07.md`,
which measured the Session 1 page against the room's Zoom transcript; `audit/SESSION-2-CONTENT-AUDIT-2026-09-09.md`;
`docs/audits/session-2-review-2026-09-11.md`; the Session 3 manual pass of 2026-09-13 with its
notes, ledger and handback; `docs/deferred-work.md`, 122 rows of which 38 touch Session 3;
`session-3/index.html` as it stands on disk; and the instructor's own brief.

Every figure is cited to a file and line or to one of the audits. Confidence is labelled H, M or L.
§13 says what could not be verified.

---

## 1. Lead with the premise challenge

You wrote that the cold open is too complex, that students have not used enough AI to have a prompt
to paste, and that running it would slow the class without engaging anyone.

**Half of that is right, and the half that is right you already fixed four days ago. The other half
misdiagnoses why nothing on your pages ever fires.**

### 1.1 What you are right about

You wrote the diagnosis yourself, into the manual-pass notes at
`docs/changes/2026-09-13-session-3-manual-pass/notes-verbatim.md:13`:

> "some have sent in less thant 20 prompts to ai ever"
> "the complexity in the current session is closer to a ~7-8/10 and the students understanding level
> is now only around a 2-3/10."

A cold open that asks a learner to produce a prompt from their own history has a floor above that
room. Skipping it was the correct call on the night, twice.

It is also already gone from Session 3. The 2026-09-13 pass removed it. Session 3 today carries
exactly one free-text input in 2,692 lines, and it is optional:

```
session-3/index.html:1296
<input type="text" id="qBox" placeholder="or type a question about the Cole documents">
```

Four preset query buttons sit beside it. Session 2 carries four free-text areas; Session 3 carries
one. All seventeen interaction roots are click, sort, vote or copy:

| Component family | Count |
|---|---|
| two-bucket-sorter | 4 |
| builder-assembler | 3 |
| estimate-then-reveal | 2 |
| commit-first-mcq | 2 |
| symptom-diagnoser, spoiler-reveal, sealed-vote-debate, retrieval-bridge, prediction-commit, multi-column-sorter, click-map-explorer | 1 each |

**The component you are objecting to is not on the page you are about to teach.** Confidence H.

### 1.2 What the measurement says instead

`audit/AUDIT-2026-09-07.md:745`, measuring Session 1 against its own page:

> "| Interactions | 13 to 15, at least one per section | **2 of 17 instructor-demonstrated,
> 0 learner-executed** | Absent |"

Zero of seventeen. Not zero of one. The card sorts did not fire. The commit-first items did not
fire. The sliders did not fire. A complexity theory has to explain why the *easy* interactions also
produced zero, and it cannot.

The variable that does explain it is in your own email to a learner, recorded at
`audit/AUDIT-2026-09-07.md:239`: the site is "his version of slides, a visual aid that need never be
opened and is not to be worked through independently."

That is a coherent delivery model. It is simply incompatible with a page carrying seventeen
"Work along" gates. `audit/AUDIT-2026-09-07.md:250` named the contradiction eleven days ago:

> "every 'Work along' line on Session 2's page addresses a learner who has been told she need not
> do it."

Session 3 carries seventeen of those gates.

### 1.3 The fork, stated plainly

Either the gates come off and the page becomes an honest deck, or two or three of them actually run
on 2026-09-21 and the page becomes an honest worksheet. The present state, gates on the page and
never run, is the only option that teaches the room the page can be ignored. That lesson has now
been delivered twice.

**Recommendation: the worksheet fork, at a dose of three interactions, not seventeen.** §2.4 shows
why seventeen is arithmetically impossible; §4.3 names which three.

### 1.4 The finding under the finding

Four of this course's strongest instruments are finished, validated, and have never run:

| Instrument | Where it lives | State on the night it mattered |
|---|---|---|
| The opening ritual | `session-2:1372`, `session-4:1263` | lectured in S1 for 11.3 min; absent in S2 |
| The seven-step delegation sorter | `session-2:1732`, appendix B4, standard tier, 16 min | hidden at core-only depth, never opened |
| The interview rewrite, named | `session-2:1673`, §06, **core**, 6 min | on the page as core content; never demonstrated |
| The four-phase named discussion | `session-3:1710` (C4) and `session-4:1886` (D4), 18 min each | neither taught; both hidden at default depth |

Your build is not behind your delivery. Your delivery is behind your build. Before adding anything
to Session 3, the question is not "what is missing" but "what is built and switched off."

---

## 2. The arithmetic, which decides everything else

### 2.1 The multiplier is a property of whether anyone does anything

`audit/AUDIT-2026-09-07.md:357`, measured against the Session 1 transcript:

> "Session 1's designed sections ran at 1.9x their planned minutes when an interaction fired
> (§02: 13.5 against 7), 2.1x with a learner question inside (§03: 10.3 against 5) and **1.0x when
> read without one** (§05: 5.2 against 5). A 1.7x multiplier on planned core minutes is the working
> figure (M)."

Nobody has applied that last clause to Session 3. A section that is read runs at 1.0x. A section
that is worked runs at 1.9x. The multiplier does not describe the material. It describes the
delivery.

### 2.2 The Session 3 clock, modelled

Session 3's core is 67 planned minutes across 12 sections (`docs/audits/profiles/session-3.json`;
stated on the page itself at `session-3:1793`). Fixed costs against the 180-minute block:

| Fixed cost | Disciplined | Session 2 observed |
|---|---|---|
| Administration | 8 | 22 |
| Corrections slot | 3 | 3 |
| Break | 15 | 15 |
| Q&A and demonstration reserve | 25 | 25 |
| Closing check | 3 | 3 |
| **Total fixed** | **54** | **68** |
| **Available for designed sections** | **126** | **112** |

Apply the multiplier to the 67-minute core:

| Fire rate | Actual minutes | Slack, disciplined admin | Slack, observed admin |
|---|---|---|---|
| 0 of 17 fire (Session 1's actual behaviour) | 67.0 | +59.0 | +45.0 |
| Half the core fires | 97.1 | +28.9 | +14.9 |
| The 1.7x working figure | 113.9 | +12.1 | **−1.9** |
| Every core section fires | 127.3 | **−1.3** | **−15.3** |

### 2.3 The premise error in the run sheet

`instructor-notes/session-3.md:3` says: "the core runs 67 planned minutes and the block is 180, so
the reserve is generous."

**That reserve exists only in the top row of the table above, the row where nothing fires.** It is
an artifact of the failure mode. Raise the fire rate to what the page was designed for and it is
gone; at Session 2's observed administration overhead the night runs fifteen minutes long.

This reframes your question. You have been treating "get them using AI in class" and "cover the
material" as independent goals. At a 67-minute core they are in direct arithmetic conflict: at the
margin, every minute of genuine learner work costs about 0.9 minutes of content.

Affordable planned core minutes, by scenario:

| Scenario | Affordable planned core |
|---|---|
| Disciplined admin, 1.7x working figure | 74 |
| Disciplined admin, full fire at 1.9x | 66 |
| Observed admin, 1.7x working figure | 66 |
| Observed admin, full fire at 1.9x | **59** |

**Design target: 58 to 62 planned core minutes.** Current core is 67. Confidence M, resting on the
repository's own 1.7x and 1.9x figures, which it labels M.

### 2.4 Why three interactions is the dose

Seventeen at 1.9x is the 127-minute row. It consumes the whole section budget and leaves nothing for
the objective, the closing check, the polls or the one genuine curriculum debt.

Three worked, the rest narrated: roughly 18 planned worked at 1.9x is 34 actual, plus 41 planned
narrated at about 1.15x is 47 actual, for 81 actual against a 126-minute budget. That leaves about
45 minutes for the debt and for the overrun both prior sessions produced.

Confidence L on the number three specifically. Confidence H that seventeen is impossible.

### 2.5 There is nowhere to push work

`MAINTAINING.md:437`: "**No session is owed.** The complete set is `index.html` + `session-0.1` +
sessions 1-4. **Session 5 is a student presentation meeting and no `session-5/index.html` is owed,
now or later**." Closed decision of 2026-08-27, restated at `docs/deferred-work.md:114`.

**Sessions 3 and 4 are the last two teaching surfaces in the course. Anything not placed in one of
them is struck, not deferred.**

| Session | Core planned | Core sections | Appendix | Total |
|---|---|---|---|---|
| session-1 | 69 | 11 | 81 | 150 |
| session-2 | 69 | 11 | 81 | 150 |
| session-3 | 67 | 12 | 83 | 150 |
| session-4 | **72** | **13** | 78 | 150 |

Confirmed on the pages themselves: `session-4:1984` reads "Core 72 + appendix 78; the core alone
runs 72 minutes, twelve minutes over the hour"; `session-3:1793` reads "Core 67 + appendix 83 ...
seven minutes over the hour."

**Session 4 has the largest core in the course.** The Session 2 audit's red team proposed, as its
mitigation, that "one Session 3 topic moves to Session 4 before the session is built." That does not
survive contact with Session 4's own arithmetic: it relocates the overrun into the fullest session.
Session 4 also forecloses the transfer thematically, at `session-4:1211`: "**The mechanism thread
ends here.** Three sessions took you through the architecture ... and nothing tonight follows from
the architecture. It follows from the duty."

**The only real slack in the course is Session 3's 83-minute appendix and Session 4's 78-minute
appendix, both currently switched off.**

Note for the builder: `docs/repo-updates-plan.md` §12.6 warns against demoting Session 4 core
sections because a Session 5 bridge would need them. That hazard is void under the 2026-08-27
decision. **Do not follow §12.6.** Its `:103` and `:404` figures for Session 3 (13 core, 70 min) are
also stale; the rebuild cut them to 12 and 67.

---

## 3. Coverage: the good news, and the one real hole

### 3.1 Session 3 covers its own syllabus completely

The syllabus row is in the repository verbatim, pasted by you into
`docs/changes/2026-09-13-session-3-manual-pass/notes-verbatim.md:14-25`. All eight topics and all
three readings have a home on the current page. Confidence H, by direct inspection of all 18 sections.

| # | Syllabus topic (verbatim) | Carried by |
|---|---|---|
| 1 | "grounding makes it cite your sources, but the nearest passage is not always the right one" | §00 lede verbatim; §01 to §04 |
| 2 | "How AI note-takers work: transcription → extraction → categorization → follow-up" | §07 |
| 3 | "Evaluating documentation tools against the planner's confidentiality obligation" | §09 + A5 |
| 4 | "Security considerations for meeting recordings" | §09 bullet 2 |
| 5 | "Documenting the client's personal and financial circumstances and the basis for recommendations" | §10 + A2 + §11 |
| 6 | "Building a grounded meeting-prep assistant: grounding vs. fine-tuning" | §05 |
| 7 | "The advisor meeting workflow: prep → capture → summarize → follow-up → log" | §06 (title is the row verbatim) |
| 8 | "What is RAG and use case in an advisory practice" | §03 + A1 |
| R1 | Wolfram (2023) | §01, §02, §05 |
| R2 | Kitces (15 Jan 2025) | §06, §07, C3 |
| R3 | Iskowitz (2025) | §09 reading card, A5 |

**Do not spend the four days adding syllabus content.** §08, Word/Excel/PowerPoint, is the only core
section with no syllabus warrant; it is your own addition (`handback.md:38`) and §4.5 argues it
should stay and become the most valuable five minutes on the page.

### 3.2 The Session 2 debt ledger, re-scored

The Session 2 audit listed nine debts. Checked against the repository, **eight of them are not what
they were scored as.**

| Debt | Audit verdict | What the repository shows | Correct action |
|---|---|---|---|
| **Seven-step delegation (F15)** | Blocking, "no slot in S3 to S5" | **The only genuine hole.** Instrument exists and is complete at `session-2:1732`. See §3.3. | **Teach it. §3.3.** |
| Structured peer review (F16) | Medium, absent | **Killed by your own decision.** `docs/changes/2026-09-13-session-2-manual-pass/notes-verbatim.md:89`: "Instead of peer review it will be me the instructor running a live audit". Standing rule at `instructor-notes/session-2.md:128`: "Nothing is shared between classmates and nothing runs between sessions (decision of 2026-09-13, superseding D5)." | **Not a debt. Re-score F16.** The peer instrument now lives in-room only, at `session-4:1823` and `:1941`. |
| Interview rewrite / reverse prompting (F17) | Medium, "never demonstrated" | **A delivery failure against a complete core section.** `session-2:1673`, §06, core, 6 min, titled "The Interview Rewrite (Reverse Prompting)", with five starter cards added 2026-09-13. Session 3 carries the technique **twice, unnamed**: A2 at `:1433` ("Make it ask you first") and §10 at `:1670` with an explicit `PROCEDURE / Ask me one question at a time.` | **Name it aloud in §10. Fifteen seconds.** Do not build anything. |
| Advisor templates | Medium, partial | Four copy-ready artefacts exist (`:1556-1558`, `:1690-1700`, `:1441-1446`, `:1633-1636`). What is absent is the word "template" and any link to the learner's Part 1 library. | One sentence in §08. |
| Morningstar "AI for Advisors" | Medium, unused | **Not a Session 3 reading**, and unverified: `docs/source-verification-queue.md:177` marks it "[UNVERIFIED, needs source]". | **Do not carry it into Session 3.** It would add an unverified source to a page with a clean record. |
| Anthropic "4 Ds" | Medium, unused | Not a Session 3 reading; also unverified (`source-verification-queue.md:97`, "listed by S2, cited by none"). | **Do not carry it into Session 3.** |
| Google Prompting Guide 101 (F20) | Low, unattributed | **Stale finding.** `session-2:1548` attributes it and the record is chipped H at `session-2:2002`. | **Delivery only.** Nothing to fix. |
| Client intake / onboarding / communications | Medium, minimal | Intake **covered** (A2 is a whole section). Communications **partial**: every instance is a vehicle for something else. Onboarding **absent** (0 hits). | Accept. No section designs a client communication; that is a Session 5 or next-cohort item. |
| Kalai et al. (2025) | Medium, taught unnamed | Correctly cited on `session-1:1833`, chipped H, with a footer record. Not a Session 3 reading, and §04 teaches rates, not mechanism. | **No Session 3 action.** |

**Rollup: one genuine curriculum hole, and its instrument is sixteen minutes away in Session 2's
appendix.** That is a far better position than the Session 2 audit implies, and it is why this plan
spends its four days on delivery rather than on authoring.

### 3.3 The blocking finding, corrected

F15 says the seven-step delegation Learning Objective received zero minutes and "has no remaining
slot in Sessions 3 to 5."

**The zero-minutes half is true. The no-slot half is false.**

```
session-2/index.html:1732
<section class="slide apx" id="s9" data-nav="B4 · Seven steps" data-insert-after="s8"
         data-tier="standard">
  B4 · The Seven-Step Process and the Delegation Line — 16 min · standard ·
  hidden at the current appendix depth
```

It carries a seven-item `multi-column-sorter` against a delegation line, an instructor key, a T3 /
Inside Information Software Survey 2026 adoption chart (n=2,906, chip H) with Kitces Research on
Advisor Productivity (chip H), a work-along gate, and this, at `session-2:1760`:

> "Step 2 is the elicitation of what a client actually wants, which is frequently not what they
> first say they want. Step 4 is the exercise of professional judgment that your registration, your
> credential and your liability all attach to. A model can draft language for either. It cannot
> perform either, and a workflow that quietly lets it is the failure mode this course exists to
> prevent."

It was hidden at core-only depth on 2026-09-14 and never opened. `CHANGELOG.md:2506` records it
being demoted deliberately.

**Landing the objective is a scheduling decision, not a build.**

| Option | Build cost | Class cost | Satisfies the objective's verb? | Verdict |
|---|---|---|---|---|
| **Run B4 live off the Session 2 page on 09-21** | **0** | 16 planned | **Yes, fully** | **Recommended** |
| Port B4 into `session-3/index.html` | 60 to 90 min, plus V6, T7 and V5 gate risk; would put Session 3 at 83 core, 141 actual at 1.7x | 16 planned | Yes | Not recommended |
| Assign async with a graded one-line answer | ~15 min | 0 | Weakly: instruction without in-class application | Fallback only |
| Strike it from the syllabus | 0 | 0 | No | Not recommended; the syllabus is accreditation-facing |

Running it off last week's page has a second benefit: it models that the site is a standing resource
rather than a one-night slide deck, which is the behaviour change §1.3 is really asking for.

**Two things to do first.**

1. `audit/SESSION-2-CONTENT-AUDIT-2026-09-09.md:167`, S2-37: "The seven CFP Board step names carry
   no record and no chip." Action was deferred "AFTER 09-14" and is still open. Add a CFP Board
   source record before teaching those names as authoritative. Fifteen minutes.
2. **Confirm the objective's exact wording against the syllabus.** The string F15 quotes appears
   nowhere in the repository: `grep -rniF "structured delegation framework"` and
   `grep -rniF "AI-assisted analysis"` both return zero. The course-level Learning Objectives are
   not in the tree at all. The audit had the syllabus PDF; the repository does not.

**What will not work.** A framing line inside §06 does not discharge this objective. §06's five
stages (prep, capture, summarise, follow-up, log) are a single meeting's tooling chain; the Board's
seven steps are the engagement-level process. Different objects, different Bloom verbs: click-a-stage
against evaluate-and-delegate. Saying "everything tonight lives inside steps 1, 2 and 7, and nothing
tonight touches steps 4 and 5 where your credential attaches" is worth thirty seconds and is
genuinely instructive, but it is not "applying a structured delegation framework to each step."

---

## 4. Three packages, benchmarked

### 4.1 The comparison

| | **A. Hold the line** | **B. Discharge the objective** | **C. Fix the discussion debt** |
|---|---|---|---|
| Core planned minutes | 67, unchanged | **59** | 52 |
| Interactions actually run | 3 | 3 | 2 |
| Seven-step objective | async only | **taught, in class** | async only |
| Named discussion (40-min debt) | S4's D4 on 09-28 | **S4's D4 on 09-28** | C4 run on 09-21, 18 min |
| Build work before Monday | ~90 min | **~150 min** | ~180 min |
| Only Blocking audit finding closed | No | **Yes** | No |
| Overrun risk | Low | **Low** | Medium |

### 4.2 Recommendation: Package B

It closes the only Blocking finding in either audit, costs no new build for the instrument that
closes it, and still fits the clock with 23 minutes of buffer (§5.1).

**On Package C, and the strongest argument against my own recommendation.** Session 3's C4
(`session-3:1710`) and Session 4's D4 (`session-4:1886`) are the same component, same duration, same
gate id, same four-phase protocol, one week apart. D4's proposition subsumes C4's: C4 prices
verification effort, D4 prices verification plus logging plus vendor diligence against the Session 1
baseline. The argument for running C4 anyway is that it is the narrower, cheaper first debate, and
running it gives D4 a prior data point to move against; run D4 first and you have wasted the
instrument twice.

That argument is pedagogically sound and I am rejecting it on arithmetic. C4 at 18 planned is about
34 actual, which is 11 minutes more than Package B's entire buffer. **Recommendation: leave C4
hidden, and commit now to running Session 4's D4 on 2026-09-28**, where a logging-burden argument
belongs. If the Session 3 room runs 20 minutes ahead at 8:12, C4 is the best possible use of the
Q&A reserve, and the run sheet should say so.

Package A is the fallback if the §4.4 cuts are not done by Sunday night.

### 4.3 The three interactions to actually run

Chosen on two criteria: a learner with no AI experience can complete it, and it produces something
you can spend later in the room.

1. **§03, the retriever, preset 1** (`session-3` `id="s4"`, `click-map-explorer`). The room commits
   to which document answers the question, then watches the 2023 appraisal rank third at 3.3 while
   Meg and CPC appear in no passage. The session's thesis on one screen. Your run sheet calls it
   "the failure the session turns on." Never drop it.
2. **§08, copy a prompt into your own app** (`id="sOff"`). See §4.5. The silent-work interval and
   the AI-usage answer at once.
3. **B4's seven-step sorter, off the Session 2 page** (`session-2:1732`). See §3.3.

Reserve: **§10's said / recommended / neither sorter** (`id="s13"`). Zero AI experience required; a
reading-comprehension task with a professional payload, and the error your run sheet tells you to
watch for (sorting an inference as "said") is exactly the error a note-taker makes on the learner's
behalf. Swap it in if §08's run collapses.

### 4.4 The cut list for Package B

| Section | Now | After | Recovered | Reason |
|---|---|---|---|---|
| §01 Embeddings + §02 Distributional similarity | 5 + 5 | merged, 7 | **3** | Both serve the same Wolfram readings. For a room self-rated 2 to 3 out of 10, ten core minutes of coordinate geometry is the most abstract block on the page. The readings stay assigned and get named aloud. |
| §09 Recording consent and confidentiality | 6 | 3 | **3** | Not a content cut: a de-duplication. See §4.6. |
| §09 quiz item 1, the re-identification item | inside the 6 | **cut** | (inside) | `session-3:2432` and `session-4:2516` teach the same punchline on the same Cole facts. Session 4 owns it. See §4.6 O1. |
| Appendix A5, five vendor questions | 9, hidden | stays hidden | 0 | Complementary to Session 4 §04, not duplicative (only 2 of 8 questions overlap), but there is no time. |
| §04, §05, §06, §07, §10, §11, §00, §03, §08 | unchanged | unchanged | 0 | Syllabus-mandated or load-bearing. |
| **Core total** | **67** | **59** | **8** | Inside the 58 to 62 target. |

Two items the run sheet currently names as first to drop come **off** the drop list: §08's sorter
(now interaction 2 of 3) and §02's sorter (inside the merged block, carrying the
alligator-crocodile example that does the conceptual work). The drop order is rewritten at §5.3.

### 4.5 §08 is the answer to the question you actually asked

Your question is how to get them using AI more. §08 is three copy-ready prompts for Word, Excel and
PowerPoint, the three files a practising advisor already has open. Its Work-along gate already says
"copy one of the three prompts into the app you use most" (`session-3:1578`).

That is the in-class run. It needs three things it does not have:

1. **A stated duration and enforced silence.** Zero silent-work intervals have occurred across two
   sessions, in both audits, and this is the protocol's designated load-bearing measurement.
   Announce four minutes, say what you will be doing during it, and hold it. You have already proved
   you can hold a stated duration: the Session 1 break ran 293 seconds against 300 stated, 0.98.
2. **A harvest that needs nobody to speak.** Chat, one line each: what you asked, and whether what
   came back was usable. That produces the student-visible artifact the ritual was supposed to
   produce and which nothing produced in 178 minutes of Session 2 (Session 2 audit, F14).
3. **A source, or an honest hedge.** DW-121, and it is two defects, not one. See §9 item A1 and A2.

**Ranked mechanisms for raising between-session AI usage in this cohort**, by expected lift per
minute of class time. Confidence is low throughout: this reasons from the cohort facts and the audit
record, not from a controlled study, and I am not going to manufacture a citation.

| Rank | Mechanism | Class minutes | Basis | Conf. |
|---|---|---|---|---|
| 1 | Guided run in their own tool, in class, instructor silent and waiting | 4 to 6 | Removes both beginner failure points at once: not knowing what to type, and not having started. They leave having done it once. | L |
| 2 | One copy-ready prompt per person, tied to a task they named | 0, harvested from the run | Anchors to their own work, the andragogical move this course already scores 8 on | L |
| 3 | Single-deliverable micro-assignment, one line, due Wednesday | 2 to state | Session 1's homework was a three-template assignment nobody completed; a one-line deliverable has a floor low enough to clear | L |
| 4 | Buddy pairing | 3 to organise | Session 4 already draws pairings at `s10`; duplicating it a week early creates confusion | L, **not recommended** |

### 4.6 The Session 3 / Session 4 overlaps, itemised

| # | Duplication | Verdict |
|---|---|---|
| **O1** | `session-3:2432`, §09 quiz item 1: a transcript with names and figures stripped that "still describes the sole owner of a precision aerospace fastener maker in a named Illinois metro area." `session-4:2516`, §02 classifier row `reid`: "Sole owner of a Rockford aerospace-fastener manufacturer, exploring a sale, adult son in operations", weight 96, with `session-4:1344`: "Name one metropolitan area and one narrow industry and the combination describes one person." **The same teaching item, same punchline, same Cole facts, twice.** Whichever runs second is a reveal the room has already had. | **Session 4 owns it**: it attaches the insight to §248.3, which gives the answer legal authority. **Cut or rewrite Session 3 §09 item 1.** |
| **O2** | Retention and training-exclusion taught twice: `session-3:1599` as prose bullets with no instrument; `session-4:2315` as two weighted scorecard questions. | Session 4 owns the scoring. Session 3 keeps the one-sentence statement, which is its own syllabus row. |
| **O3** | A5's eight vendor questions against Session 4 §04's six. **Only 2 overlap** (retention, training). | Complementary, not duplicative. Keep both, split by object: A5 is the note-taker vendor and outputs an email; §04 is any tool against a payload and outputs a verdict. Just do not teach them as the same list. |
| **O4** | Two "what may leave the firm" sections with different legal frames but the same move. | Session 3 owns consent and confidentiality; Session 4 owns NPI and Reg S-P. Keeping them distinct depends on O1 being cut. |
| **O5** | Magesh hallucination rates in both. | **Intentional and correct.** `session-4:1647`: "Session 1: why it happens. Session 3: how often. Tonight: what it costs you." This is the model the other overlaps should follow. No change. |
| **O6** | C4 and D4, the same discussion component one week apart. | §4.2. Leave C4 hidden; run D4 on 09-28. |
| **O7** | §11 assigns the AI usage policy; Session 4 §11 instructs it. | Correct as designed. No change. |

---

## 5. The run order for 2026-09-21

### 5.1 The clock

Block 6:00 to 9:00 PM Pacific. Worked sections at 1.9x, narrated at about 1.15x. Format follows
`audit/AUDIT-2026-09-07.md` §5.3, which did this for Session 2.

| Clock | Min | Kind | What | Page element | The sentence that opens it |
|---|---|---|---|---|---|
| 6:00 | 8 | fixed | Housekeeping; the pre-class support window closed at 5:58 | | "Canvas and file questions at the break, not now." |
| 6:08 | 3 | narrated | **Corrections slot**: the two Session 2 claims (§7.1) | none | "Two things I said last time that I have since checked. Here is what I found and how confident I am." |
| 6:11 | 8 | **worked** | **Objective stated**, then the retrieval bridge | `s1`, `retrieval-bridge` | "One thing tonight. Then four checks, no notes. Wrong and committed beats right and read." |
| 6:19 | 7 | narrated | Mechanism: embeddings and distributional similarity, merged | `s2` + `s3` | "Why the nearest passage is not the right one." |
| 6:26 | 12 | **WORKED 1** | The retriever, preset 1 | `s4`, `click-map-explorer` | "Commit first: which document answers this? Then watch what the retriever does." |
| 6:38 | 8 | narrated | What grounding fixes, and what it does not (Poll 2) | `s6`, `prediction-commit` | "Guess before the figures. You are meant to get this wrong." |
| 6:46 | 6 | narrated | Grounding against fine-tuning, the Tuesday test | `s7`, `commit-first-mcq` | "The appraisal is re-run Tuesday. Which assistant reflects it Wednesday with no engineering?" |
| 6:52 | 8 | narrated | The workflow chain; where tonight sits in the seven steps | `s9`, `symptom-diagnoser` | "Five stages. A mistake at any one is inherited by every stage after it." |
| **7:00** | **15** | fixed | **BREAK, posted as "back at 7:15" Pacific** | | Post the clock time in chat, in *their* zone, not yours. |
| 7:15 | 9 | narrated | The note-taker's four stages on the Cole excerpt | `s10` | "Stage two drops a clause about Nathan. That is the teaching point." |
| 7:24 | 12 | **WORKED 2** | **Office add-ins: silent run in your own tool** | `sOff` | "Four minutes. Nobody talks. Copy one prompt into the app you use most and run it." |
| 7:36 | 16 | **WORKED 3** | Seven-step delegation sorter, off the **Session 2** page | `session-2` `s9`, depth +Standard | "Open last week's page. Appendix depth to Standard. B4." |
| 7:52 | 5 | narrated | Consent and confidentiality, trimmed, item 1 cut | `s12` | "Two obligations: may it be recorded, and what may the vendor see." |
| 7:57 | 8 | narrated | Said, recommended, or neither (Poll 4); name reverse prompting aloud | `s13`, `two-bucket-sorter` | "Six lines from the meeting. One of them is your inference, not their words." |
| 8:05 | 7 | narrated | Checklist, **Part 1 brief**, **no-client-data rule aloud** | `s16` | "Before the assignment: no real client data enters any AI tool in this course." |
| 8:12 | 20 | fixed | **Q&A and demonstration reserve, budgeted not residual** | | "Twenty minutes. What do you want to see?" |
| 8:32 | 5 | **worked** | Closing check against the stated objective | `s16` closing question | "The thing I said we would cover. In chat, one line each." |
| 8:37 | 23 | buffer | | | |

Scheduled: 157 of 180 minutes. Buffer 23. Worked 53, narrated 69, fixed 35.

The buffer is not optional slack. Sessions 1 and 2 both ran to about 2:57 of a 3:00 block, so a plan
that ends at 8:37 on paper ends near 8:55 in the room.

**On the Q&A reserve.** `audit/AUDIT-2026-09-07.md:359`: unstructured Q&A and demonstration took 32
of the 95.5 on-page minutes in Session 1 and drew the most learner turns of the evening. The audit's
instruction, unfollowed in Session 2, was to "reserve 25 minutes for it explicitly rather than let it
take what is left." Twenty, placed, is the compromise that fits Package B.

### 5.2 Checkpoints you can read off a clock

| By | You should have finished |
|---|---|
| **7:00** | Through §06. The break starts on time or the night is already lost. |
| **8:00** | The seven-step sorter is done. This is the blocking objective; if it has not happened by 8:00 it will not happen. |
| **8:30** | Into the Q&A reserve, with the closing check still ahead of you. |

### 5.3 The drop order, rewritten

| Order | Drop | Recovers | What is lost |
|---|---|---|---|
| 1 | §05, narrate the two-column comparison only, skip the Tuesday test | 4 | A commit-first item; the concept survives in prose |
| 2 | §09 trimmed further to the one-party floor only | 3 | Vendor security detail, which Session 4 §04 covers anyway |
| 3 | Q&A reserve cut from 20 to 12 | 8 | The room's most active block; cut only to protect the closing check |
| 4 | The merged §01/§02 narrated in 4 rather than 7 | 3 | Wolfram's coordinate detail; the readings stay assigned |
| 5 | §10's sorter demonstrated rather than run | 4 | The reserve interaction |
| **Never** | §03's retriever preset 1 | | The session's thesis |
| **Never** | §08's silent run | | The only in-class AI use in the course |
| **Never** | The seven-step sorter | | The Blocking audit finding stays open |
| **Never** | The closing check | | Third consecutive session with no check; D7 cannot move |

---

## 6. The deferred-work register, reconciled

**50 of the 122 rows touch Session 3** once the scope test includes the injected retrieval corpus,
the run sheet, the nine footer source records, the validators that fire on the page, the
ritual-parity rows whose decision reaches it, and the course spine.

**The headline is good news: under a strict test, the blocking count is zero.** No row on that list
puts a false statement in front of a student on 2026-09-21. Every one of the eight false-figure rows
was fixed on disk in the 2026-09-13 and 09-14 passes. What remains is a bookkeeping lag in the
register itself, a set of disclosures that are honest but unsigned, and delivery.

**Eight rows are stale**: closed on disk, still marked open. A builder working the register as
written will chase ghosts and may reintroduce defects that are already fixed.

### 6.1 Stale rows: verified closed on disk, still marked open

| Row | Register says | Disk says | Evidence |
|---|---|---|---|
| DW-001 | §03 preset-1 verdict says the appraisal "scores 0.0" | Gone; the verdict now says it ranks third at 3.3 | `grep 'scores 0.0' session-3/index.html` returns 0 |
| DW-002 | C4's complication says "the appraisal — scored zero and never appeared" | Gone | `grep 'scored zero'` returns 0 |
| DW-003 | The false figure inside VALOPT option 2, a scored answer key | Gone; VALOPT removed entirely | `grep VALOPT` returns 0 |
| DW-008 | The margin flag prints "less than an eighth" while flagging at `marg<12` | Fixed; `session-3:2104` now reads "the top two passages are under 12% apart" | direct read |
| DW-013 | Teaches 3.3% as the grounded floor, labelled "Best model, grounded" | Gone with the Vectara material | `grep 'Best model, grounded'` returns 0 |
| DW-042 | §07's rubric element 5 matches `two years` in its regex | The keyword note scorer is gone; "two years" survives only as a deliberate inference item in §10's sorter, which is correct usage | `session-3:2491`; `grep 'var RUB'` returns 0 |
| DW-052 | `session-3:2424` carries an inert `split:true` | Gone | `grep 'split:true'` returns 0 |
| DW-076 | An instructor-directed panel label of the shape DW-046 removed from `session-4`, holding DW-002's sentence | Gone | `grep 'instructor introduces'` returns 0 |

One of these needs more than a status flip. **DW-013's own closing note is false**: it says "no
per-model grounded rate is stated on session-3 now", but `session-3:2141-2144` states Westlaw
AI-Assisted Research at 33% and Lexis+ AI at 17%. Those are the Magesh and Stanford figures,
correctly chipped H, and they are not the DW-013 superlative the row was opened against. Correct the
note when you close the row.

**Action: close all eight in one commit with dated notes naming the manual-pass commit that did the
work.** 30 minutes, BUILDABLE, not teach-blocking. The cheapest way to stop the register lying to
the next reader.

### 6.2 Live rows that bear on teaching

| Row | What is live | Blocks 09-21? | Owner | Effort |
|---|---|---|---|---|
| **DW-121** | §08 names Claude's Word, Excel and PowerPoint add-ins on your word, unchipped, no source. **And** `session-3:1576` cites "register row DW-121" to a student on a page they read. | **Yes, twice.** You are about to ask the room to run those prompts. If an add-in does not exist as described, the silent run fails live. | JARED-ONLY for the check | 10 min browser + 15 min record |
| **DW-056** | Thirteen `.verify` gates guard tax, legal and regulatory characterisations; none closed. §09's block holds two: 18 U.S.C. §2511 as a federal one-party floor, and the confidentiality duty as applied to a documentation vendor. | **Yes.** You teach recording law on Monday and the page says these need your verification first. | JARED-ONLY | 20 min |
| **DW-041** | §07's excerpt presupposes an advisory engagement `CASE.md` §A.5 denies. It is the only BLOCKING-severity row on the page, and **decision D2 of 2026-09-08 already chose the fix** ("record the engagement in §A.5") **and it was never executed.** `CASE.md:89` still reads "Investment adviser | (none)" against Part O's `who=Advisor` speaker. | No: the page discloses it at `session-3:1493`, and a disclosure is not a false statement | JARED-ONLY to authorise, BUILDABLE to run | 20 min plus the six-file regenerate chain |
| DW-055 | A one-sentence definition of "de-identified" for Part 1 is owed once. §11 assigns Part 1 with no data rule beside it. | Adjacent: see §7.3 | JARED-ONLY | 5 min |
| **DW-117** | Session 3 keeps the Shift+U override that Session 2 dropped by instruction. Badge `:696`, handlers `:1924` and `:2623`. | No. **And do not propagate it.** See below. | JARED-ONLY | 0 min, recommended |
| DW-053 | A8's `session-3` minority records 15 against a measured 3, twelve units of slack | No | BUILDABLE | 5 min |
| DW-024 / DW-025 | **Seven of Session 3's nine footer source records carry an empty `last_verified`;** six carry "[UNVERIFIED, needs source]" on `last_retrieved`. Only `src-wolfram` is populated, at 2026-08-23. Only a human at a terminal may write the field. | No | JARED-ONLY | unbounded; do not start before Monday |
| DW-107 | **10 of 12 core sections carry a "do this now" timer longer than half the section's eyebrow minutes.** §03 is 6 minutes of doit inside a 6-minute section. Core doit minutes total **43 of 67**. | No, but see §2.3 | JARED-ONLY | ratify a rule, or resize |
| DW-100 | No plain-language summary of the case exists outside the injected modal. **JN-021 deleted Session 3's household restatement block**, so the modal is now the only place this page explains the case. | No, but see below | JARED-ONLY to decide | 45 to 60 min |
| DW-111 | `session-4:1688` still presumes a Session 1 baseline and paste that never happened. Session 3's half is already closed. | No, but it breaks Session 4 on 09-28 | BUILDABLE | 15 min before 09-28 |
| DW-050 | The course spine: Session 3 has lost both remaining sockets and states the recurring question only in the injected modal | No | JARED-ONLY | decision only |

**On DW-117, a recommendation against the obvious action.** Propagating Session 2's cut would remove
Shift+U from Session 3, which costs ten minutes and buys two things you do not want: V8 and the
DOM-mode override line go red by design (DW-116, inverted on this page), and **you lose the one-key
reveal on a 17-gate page you are teaching in four days.** Record the divergence as the state and
move on. Not recommended, with evidence.

**On DW-107, which quietly confirms §2.3.** The page allocates 43 of its 67 core minutes to
learner-doing. If those timers ran as written, the core could not fit its own eyebrow minutes. The
reserve the run sheet calls generous is the gap between what the page asks for and what the room has
ever done.

**On DW-100, which connects to the only student feedback the course has.** Learner B wrote after
Session 1 that the case was "far beyond anything she had met." The 2026-09-13 pass then deleted this
page's household restatement, leaving the injected modal as the sole explanation. That is a
defensible edit made for length, and it moved in the opposite direction from the one piece of
learner evidence on file. It is not fixable by Monday. **It belongs in the run sheet instead**: open
the Case facts panel once, unprompted, at 6:19, and say in two sentences who the Coles are.

### 6.3 The handback's sixteen flags

F-3 (Office add-ins) and F-5 (A8 slack) are the two the previous pass explicitly asked the next
session to answer; both are in §6.2. F-1, F-9 and F-10 are process notes needing no action. F-4, F-7
and F-8 are offers you can accept or decline; none is blocking. F-16 is a register-numbering
correction already recorded. F-11 and F-12 are the spine, DW-050.

---

## 7. Content corrections and the final project

### 7.1 The corrections slot, 6:08: the backlog is larger than you think

**DW-092 is open and undelivered.** Twelve corrections were owed to the room from Session 1, and
decision D7 scheduled the slot for 6:03 PM on 2026-09-14. The Session 2 audit's fifteen measured
blocks contain no corrections slot; the 0:02 block is nine and a half minutes of "Canvas, recordings,
file formats" instead. Two of the twelve were folded into Session 2's retrieval bridge keys, and the
bridge was absent too.

So the real backlog is roughly **twelve from Session 1 plus two from Session 2**, and the slot has
three minutes. Follow `audit/AUDIT-2026-09-07.md` §5.4's own instruction: **say the highest-consequence
items aloud and post the rest in writing** (B4 in Group B).

The two highest-consequence items are both from Session 2, because both are things a CFP could act
on:

1. **Output tokens cost five times input, not two.** Haiku 4.5 $1/$5, Sonnet 5 $2/$10, Opus 5 $5/$25,
   Fable 5.1 $10/$50 per million. Your cost-per-task conclusion stands; the multiple was wrong by
   2.5x and was load-bearing for about 23 minutes of instruction.
2. **A missed portability election is not always permanently lost.** For an estate with no filing
   requirement under §6018(a), Rev. Proc. 2022-32 provides a simplified method to elect on or before
   the **fifth anniversary** of death, by filing a complete Form 706 marked "FILED PURSUANT TO
   REV. PROC. 2022-32 TO ELECT PORTABILITY UNDER § 2010(c)(5)(A)". It supersedes Rev. Proc. 2017-34's
   two-year window. This is the one Session 2 error a CFP could act on to a client's detriment,
   because "permanently lost" ends a conversation Rev. Proc. 2022-32 reopens.

Say both with a confidence label. Say the second slowly: it is the one the room will use. Then say
that the rest of the Session 1 backlog is posted in writing, and post it (B4).

**Note for the run sheet.** The Session 1 correction most worth saying aloud, if a fourth minute
exists, is the watermark claim: Session 1 told the room that Claude's watermark "can be tracked...
AI generated by your account specifically." Anthropic's own documentation says it cannot be traced
to a person, organisation or chat. That was a compliance claim made to people who write firm AI
policy, and Session 4 teaches watermarking twice more in its appendix.

### 7.2 Page hits: checked, and the pages are clean

I ran the greps rather than leaving them to you.

- **The 2x token-cost claim exists nowhere in the repository.** The pages already carry the correct
  multiple in four places, including a student-visible answer key at `session-2:2863`: "On every
  current Claude tier the output price is five times the input price." Session 3 carries no
  token-price content at all. **Spoken-only error. No page fix.**
- **"Permanently lost" returns four hits and all four are about the Illinois state exclusion, where
  the statement is correct** (`CASE.md:649`, `docs/spine-brief.md:178` and `:311`,
  `docs/probe-captures.md:283`). None is student-facing. **Do not "correct" these.**
- **The §7872 thresholds are already right in the repository**: `CASE.md:600` records the $10,000 de
  minimis and `:601` the separate $100,000 gift-loan net-investment-income limit, both chipped H and
  enforced by `scripts/case-inventory.mjs:202-203`. Spoken-only error.
- **FP Alpha, Navajo, eCFR and the known-knowns quadrants return zero student-facing hits.** All
  spoken-only.

**Caveat for whoever builds the corrections list.** DW-092's twelve enumerated items do not include
the eCFR address (Session 1 audit F17) or the known-knowns misattribution (F18). A list built from
DW-092 alone will miss both.

### 7.2a The live exposure nobody has flagged

`session-2/index.html:2493` is a prompt-critique item a student can reopen at any time:

> "Research whether my client can still elect portability for a spouse who died in 2021, and cite
> the governing authority."

The answer key at `:2494` names the three facts the prompt fails to supply: "estate size, whether a
return was filed, whether the estate was under the filing threshold." **Those three are exactly the
Rev. Proc. 2022-32 predicate.** A death in 2021 sits inside the five-year window as of 2026-09-21, so
a student who actually runs that prompt gets "yes, until the fifth anniversary" and lands on the
opposite of what the room was told aloud on 2026-09-14.

That makes the portability correction concrete rather than abstract, and it gives you the best
possible hook: the room can open the item and see it. Say it at 6:08 with the line number.

### 7.2b The watermark correction, and a trap inside it

The Session 1 watermark claim is the only Blocking content finding in either audit, and **the
repository does not corroborate the correction either.** Three sources, three different claims:

| Source | What it says about Claude output |
|---|---|
| The instructor, aloud, 2026-08-31 | Watermarked **and traceable to your account** |
| `session-4/index.html:1525`, the built page | **Not watermarked at all.** "Anthropic has not announced SynthID adoption for Claude, so nothing you generate in this course is watermarked. [UNCONFIRMED]", chipped M |
| The `CLAIM` note embedded on that same line, from two search passes | **Watermarked since 2 August 2026, worldwide, with no identity payload** |

The CLAIM note's own instruction is explicit: "Do NOT soften this to the weaker marker: it is here
because a source appears to CONTRADICT the claim, not because none was attached."

**Reading Session 4's D1 aloud to correct the room would replace one error with another.** D1 itself
says nothing about account traceability in either direction; its mechanism paragraph at
`session-4:1528` is a generator-identification claim, not an identity claim.

`anthropic.com` is egress-blocked from the build environment, so no amount of repository work
resolves this. **It is a browser task for you, identical in shape to DW-121**, and DW-005 has been
open on it since 2026-09-07. Whether DW-092's watermark item was ever delivered on 09-14 is
unconfirmed: the Session 2 audit records no corrections slot at all.

Until you have read Anthropic's own page, the honest correction is the narrow one: **the watermark
does not identify an account.** Say that and stop.

### 7.2c Source currency: what NOT to spend the four days on

Session 3 carries 49 confidence chips across 8 source records. Seven of the nine footer records have
an empty `last_verified` and six carry "[UNVERIFIED, needs source]" on `last_retrieved` (DW-024,
DW-025). That looks alarming and mostly is not, because of what the records are:

| Record | State | Do before Monday? |
|---|---|---|
| `src-magesh` (the Stanford 17 to 33% figures, 6 chips) | Never retrieved, host blocked. **But `moving_target: false`, and its scope says "a historical fixture. The measured rates belong to the tools as they were on that date and must never be updated."** | **No.** The block costs nothing here. |
| `src-anthropic-ctx` (the 5.7 to 1.9% finding-step rates and the 200,000-token threshold, 7 chips) | Never retrieved, host blocked, `moving_target: false` | **No.** Carry at the recorded date and say so. |
| `src-kitces-notetakers` (the hour-per-meeting-hour figure and the adoption slopegraph, 8 chips) | Never retrieved, `moving_target: false` | **No.** |
| `src-context-windows` | `last_retrieved: 2026-09-13`, the only `moving_target: true` record on the page | **No.** Four days old on the night. |

**Conclusion: zero source-verification work is owed before 2026-09-21**, other than DW-121, which is
about a claim with no record at all rather than a record that is stale. Spend the time on delivery.

### 7.3 The final project: Session 3 is the last teaching surface before Part 1 lands

This is the largest gap in the current run sheet and neither audit caught it.

- `instructor-notes/session-3.md` is 70 lines and **never mentions the final project, Part 1,
  Part 2, the handoff or the baseline.** Its §11 entry says only "The closing question, out loud,
  one to three answers, then we go."
- The page carries **one card** about Part 1 (`session-3:1755`): "Single email, body reads only
  'See attached.'" No baseline reference, no seven-element completeness checklist, no Part 2
  preview, no scalability criterion.
- Session 4 opens assuming the work is done: `session-4:1241`, "**Part 1 status.** Handoff packages
  are in", and `session-4:1829`, "Already done | You | One email to the instructor."
- **The no-client-data rule is not on `session-3/index.html`.** It is on `index.html:1080`,
  `session-1:1958` and `session-4:2019`, and in your run sheet at `instructor-notes/session-3.md:19`
  tied to §07, not to §11. The Session 2 audit rated this identical omission **High** (F08) at the
  identical moment: assigning a workflow built on the learner's own practice.

**Action: rebuild the §11 slot** to restate the seven-element checklist (or point at
`session-2:1948`), state the no-client-data rule, and preview the cold-run test the packages face on
09-28. Seven minutes on the night; 30 minutes to write.

### 7.4 Do NOT fix F29 on a page

The Session 2 audit's F29 records the syllabus contradicting itself on the Part 1 due date: the
narrative says "end of Session 4", the schedule table says "the Wednesday before this session."

**No repository surface carries either date, and that is deliberate.** `MAINTAINING.md:365`: "dates,
deadlines, submission and grading are set by the instructor outside this site ... **two sources of
truth for a deadline is worse than one wrong one.**" The narrative variant F29 calls wrong was on
`session-3/index.html` until 2026-08-25 and was purged on 2026-08-27 (DW-047,
`scripts/editorial-baseline.json:54`).

**Adding a date to any page to fix F29 would reinstate the failure the purge rule exists to prevent
and would be caught by the standing purge check.** The remedy is an edit to the syllabus PDF plus a
one-sentence spoken correction from the §11 slot.

### 7.5 One Tier A violation found in passing

`session-4/index.html:1864`: "and **it is worth 30% of Part 1**." Under `MAINTAINING.md:298`, Tier A
purges "any weight or percentage of a grade." That string should have gone on 2026-08-27 and did not.
The only surviving Tier A violation on a served page. Medium, confidence H. Fix before 09-28.

---

## 8. The objective, the closing check, and four polls

### 8.1 The objective

State it before 6:19. Third session this has been the recommendation; the first two failed because
it depended on you remembering. **Print it as the first line of the run sheet's 6:11 slot, so it is
on the page you are reading from.**

> "One thing tonight. By nine o'clock you will be able to take any step of your own client-meeting
> workflow and say whether you would hand it to a tool, and defend the answer on what the tool can
> actually verify. That is the one thing I will check before I let you go."

Bloom tier: **Evaluate**. It matches the seven-step delegation objective's verb, which is what makes
Package B coherent rather than two unrelated additions.

### 8.2 The closing check

You already have a good one on the page, `session-3:1758`:

> "The grounded answer in §03 was correctly retrieved, accurately quoted, and wrong. Name the point
> in your own meeting workflow where you would catch it, and say who is left holding it if nobody
> does."

Keep it, add the objective callback, and move it to a written channel so it produces answers rather
than the silence both prior sessions' open verbal asks produced:

> "The thing I said we would cover. In chat, one line each: one step of your meeting workflow you
> would hand to a tool tonight, and one you would not, and the reason for the second one."

### 8.3 Four polls, pre-built in Zoom before Monday

Build these Sunday. A live-configuration failure already happened once (Session 2, 0:50). Each
carries a written decision rule; no decision rule has fired in two sessions.

| # | Fires | Type | Question and options | Decision rule |
|---|---|---|---|---|
| 1 | 6:14 | **Anonymous practice-reality** | "Since Session 2, how many times have you typed a prompt into any AI tool? (a) none (b) 1 to 3 (c) 4 to 10 (d) more than 10" | **If ≥50% pick (a) or (b), cut §05 and give §08's silent run six minutes instead of four.** This is the instrument you currently lack for your own stated worry. |
| 2 | 6:38 | **Prediction before content** | "A grounded assistant that cites your own documents makes things up: (a) essentially never (b) about 1 in 20 answers (c) about 1 in 5 answers (d) as often as an ungrounded one" | If ≥60% pick (a), spend two extra minutes on the Stanford 17-to-33% figures rather than on the Anthropic finding-step rate. |
| 3 | 7:34 | **Comprehension, diagnostic distractors** | "The retriever ranked the 2023 appraisal third. The best explanation is: (a) the appraisal is out of date (b) the appraisal shares almost no words with the question (c) the retriever was set to the wrong model (d) the appraisal was not in the corpus" | (a) is the trap: plausible, professionally sensible, not the mechanism. **If ≥30% pick (a), re-run preset 1 and read the shared-term line aloud before moving on.** |
| 4 | 7:57 | **Calibration pair** | Before §10's sorter: "Of six lines from a client meeting, how many do you expect to be your inference rather than something said? (a) 0 (b) 1 (c) 2 (d) 3 or more". After: the same question about their own file notes. | Read both distributions aloud. **A zero delta is a finding, not a failure**, and say so. |

Read every distribution aloud and either take the branch or decline it out loud. Declining aloud
still counts as firing the rule, and it is what the audit measures.

### 8.4 Wait time: pre-mark the three questions that will collapse

Session 1's red team predicted, and Session 2 confirmed to the minute, that the three-second gate
holds where you are a learner and collapses to exactly zero where you are the expert: 0.57 gaps of
three seconds or more per minute in the next-token block, **0.00** in the grounding block, **0.00**
in the fee block.

Session 3's planning-side sections are §06, §07, §09, §10 and §11. A global habit target has now
failed twice. **Mark exactly three questions in the run sheet and gate only those:**

1. §06, at the Log stage: "Who reads this note, and when?" Silence. Count four.
2. §09: "Whose consent do you actually need on this call?" Silence. Count four.
3. §10, before the sorter key opens: "Which of those six is your reading rather than their words?"
   Silence. Count four.

Three, not thirty. Write the symbol at those three slots and nowhere else.

---

## 9. The categorized work plan

Effort in minutes. Owner is JARED-ONLY where it needs your judgement, your browser or your Zoom
account; BUILDABLE where anyone can do it. Verification is the command or the on-screen check that
proves it landed.

### Group A: blocking for 2026-09-21

| Id | Cat | Work | Files | Dep | Min | Owner | Verify |
|---|---|---|---|---|---|---|---|
| A1 | VERIFY | Confirm Claude's Word, Excel and PowerPoint add-ins exist and behave as §08 describes: reads the open file, takes a plain-words instruction, proposes a reviewable change. Per app. (DW-121) | browser | — | 10 | **JARED** | Three yes/no answers in the ledger |
| A2 | PAGE | Land A1: add a SOURCES.md record and chip §08's first paragraph, or delete the bullet for any app that fails. **And remove "register row DW-121" from the student-facing source line.** | `session-3:1576`, `SOURCES.md` | A1 | 15 | BUILDABLE | `node scripts/inject-sources.mjs --check`; `grep 'register row DW-' session-3/index.html` returns 0 |
| A3 | VERIFY | Sign or strike §09's two verify-block items: 18 U.S.C. §2511 as the federal one-party floor, and the confidentiality duty as applied to a documentation vendor (DW-056) | `session-3:1584` | — | 20 | **JARED** | A dated line in the ledger per item |
| A4 | PAGE | Rebuild §11: add the no-client-data rule above the assignment cards, restate the seven-element Part 1 checklist or point at `session-2:1948`, preview the 09-28 cold run | `session-3` s16 | — | 30 | BUILDABLE | `grep 'no real client data' session-3/index.html` ≥1; T7 re-measured |
| A5 | RUNSHEET | Rewrite the run sheet to §5's clock: clock times, the objective printed at 6:11, the three gated questions marked, the four poll slots, the §11 final-project brief, the new drop order | `instructor-notes/session-3.md` | A7, A8 | 45 | BUILDABLE | Reads end to end against §5 |
| A6 | ZOOM | Build the four polls of §8.3. Poll 1 anonymous. Check the select mode on each. | Zoom | — | 20 | **JARED** | Four polls saved; open each and confirm |
| A7 | PAGE | The §01/§02 merge: one section, 7 minutes, keeping alligator/crocodile and the nearest-neighbour map | `session-3` s2, s3 | — | 60 | BUILDABLE | `node scripts/build-appendix.mjs --check` current; V5 three numbers agree; T7 re-recorded |
| A8 | PAGE | Trim §09 from 6 to 3: keep consent and the one-party floor, **cut quiz item 1** (O1), hand vendor security to Session 4 | `session-3` s12, `:2432` | A3 | 30 | BUILDABLE | As A7; `grep 'aerospace fastener' session-3/index.html` returns 0 |
| A9 | ~~VERIFY~~ | ~~Grep every lesson page for the 2x token-cost ratio and for portability wording~~ **Done in §7.2. Every page is clean; all six errata are spoken-only. No work owed.** | — | — | **0** | done | — |
| A11 | VERIFY | **Read `anthropic.com/news/claude-text-watermark` in a browser and settle the three-way contradiction of §7.2b.** DW-005, open since 09-07. If Claude output does carry SynthID, `session-4:1525` is false about the students' own coursework and Session 4 teaches it on 09-28. | browser, then `session-4:1525` | — | 10 | **JARED** | The answer recorded in the ledger; the [UNCONFIRMED] marker resolved or kept with a reason |
| A10 | ZOOM | Turn on speaker-labelled transcripts. Both audits have run at partial instrumentation for two sessions; one checkbox. | Zoom settings | — | 2 | **JARED** | Setting shows enabled |

**Group A: 242 minutes as listed, less the 10 now closed by §7.2, plus 10 for A11: 242. JARED-ONLY within it: 62.**

### Group B: high value before 2026-09-21

| Id | Cat | Work | Files | Dep | Min | Owner | Verify |
|---|---|---|---|---|---|---|---|
| B1 | VERIFY | Add a CFP Board source record for the seven step names before B4 is taught as authoritative (S2-37, open since 09-09) | `SOURCES.md`, `session-2` s9 | — | 15 | BUILDABLE | `node scripts/verify-sources.mjs`; chip resolves |
| B2 | RUNSHEET | Write the B4 slot: open the Session 2 page, set depth to +Standard, run the sorter, reveal the key, two minutes on steps 2 and 4 | `instructor-notes/session-3.md` | A5, B1 | 20 | BUILDABLE | Slot present at 7:36 |
| B3 | VERIFY | Confirm the seven-step objective's exact wording against the syllabus PDF. The string F15 quotes appears nowhere in the repository. | syllabus | — | 5 | **JARED** | Wording recorded in the ledger |
| B4 | CANVAS | Post the §7.1 corrections in writing, plus the exact Session 4 reading list | Canvas | — | 15 | **JARED** | Post visible |
| B5 | CANVAS | Announce the standing pre-class support window, 5:45 to 6:00 PT, every week. Session 2 spent its whole break on one learner's screen-share. | Canvas | — | 5 | **JARED** | Post visible |
| B6 | RECORDS | Close the eight stale register rows of §6.1 in one commit with dated notes | `docs/deferred-work.md` | — | 30 | BUILDABLE | Rows read closed; notes name the manual-pass commit |
| B7 | PAGE | DW-053: re-record A8's `session-3` minority from 15 to 3 | `scripts/editorial-baseline.json` | — | 5 | BUILDABLE | `node scripts/test-editorial-regions.mjs` green |
| B8 | CANVAS | Resolve the Part 1 due-date contradiction **in the syllabus and Canvas only**. Do not add a date to any page (§7.4). | syllabus, Canvas | — | 15 | **JARED** | One date, stated once, off-site |
| B9 | RECORDS | The change folder for this pass: plan, ledger, checks, handback | `docs/changes/2026-09-17-.../` | A2, A4, A7, A8 | 40 | BUILDABLE | Folder complete |

**Group B: 150 minutes. JARED-ONLY within it: 40.**

### Group C: do if time

| Id | Cat | Work | Min | Owner |
|---|---|---|---|---|
| C1 | RUNSHEET | Name reverse prompting aloud at §10 and A2. Fifteen seconds; discharges F17, which is a delivery failure against a complete Session 2 core section, not a build gap. | 5 | BUILDABLE |
| C2 | RUNSHEET | Write the three non-advisors a parallel instruction for §06, §07 and §11: run the workflow against a recurring task they do have, not a client meeting. Three of eight cannot apply an advisor workflow and no audit has addressed it. | 25 | BUILDABLE |
| C3 | RUNSHEET | Name Wolfram at §01 and Kitces at §06 aloud. Converts an assertion into evidence for an audience trained to ask for it. **Do not** add Morningstar or the 4 Ds: neither is a Session 3 reading and both are unverified sources (§3.2). | 10 | BUILDABLE |
| C4 | RUNSHEET | Open the Case facts panel once, unprompted, at 6:19 and say in two sentences who the Coles are. DW-100: the household restatement was deleted on 09-13 and the modal is now the only explanation on the page, against the one piece of learner feedback on file. | 5 | BUILDABLE |
| C5 | RECORDS | **DW-117: record the divergence, do not propagate.** Removing Shift+U from Session 3 turns V8 and the DOM override line red and costs you the one-key reveal on a 17-gate page. Write the decision into the register. | 10 | JARED |

### Group D: after the session

| Id | Cat | Work | Min |
|---|---|---|---|
| D1 | ZOOM | Export the speaker-labelled `.vtt`, the chat log and the poll report within 24 hours | 10 |
| D2 | RECORDS | File the Session 3 SESSION RECORD block so the trend table has a third point | 15 |
| D3 | PAGE | DW-111: fix `session-4:1688`, which presumes a Session 1 baseline and paste that never happened. **Before 09-28.** | 15 |
| D4 | PAGE | §7.5: purge "it is worth 30% of Part 1" from `session-4:1864`. Tier A violation. **Before 09-28.** | 10 |
| D5 | RUNSHEET | Commit Session 4's D4 discussion block to the 09-28 core, paying the 40-minute discussion debt | 20 |
| D6 | PAGE | `session-4` declares `var NPI` twice, at `:2168` and `:2512`. The second wins, so it renders correctly today, but 44 lines are dead and the redeclaration breaks under any strict-mode migration. | 15 |
| D7 | PAGE | Decide Session 4's cold open (§10) and land it | 30 |
| D8 | RECORDS | Push a `session-3-delivered-2026-09-21` tag. DW-096 records that the Session 1 tag was never pushed; the delivered-state tags are how a future review anchors to what the room actually met. | 2 |
| D9 | VERIFY | DW-041: execute decision D2 of 2026-09-08. One line in `CASE.md` §A.5 recording the engagement, then rerun the migration chain across six files. It has been decided and unexecuted for nine days and it is the only BLOCKING-severity row on the page. | 20 |

### Group E: decisions only you can make

| Id | Decision | Options and cost | Deadline |
|---|---|---|---|
| E1 | **Deck or worksheet?** (§1.3) | Strip the 17 Work-along gates and teach it as slides, or run three of them. Running three costs about 34 actual minutes and closes the D4 engagement finding. Stripping them costs a day's edit and makes the page honest. Doing neither repeats Sessions 1 and 2. | **Fri 18**; A5 and A7 depend on it |
| E2 | **Package A, B or C?** (§4.1) | B is recommended. | **Fri 18** |
| E3 | Seven-step objective: live off Session 2, port, async, or strike? (§3.3) | Live is free to build and costs 16 planned minutes. Porting costs 60 to 90 minutes plus gate risk and puts Session 3 at 83 core. Async satisfies the verb weakly. Striking is accreditation-facing. | **Fri 18** |
| E4 | DW-041: does §07's excerpt keep an advisory engagement `CASE.md` §A.5 denies? | **You already decided this** on 2026-09-08 (D2: record the engagement in §A.5) and it was never executed. Executing costs one line plus the six-file regenerate chain, about 20 minutes, and closes the only BLOCKING-severity row on the page. Rewriting four lessons instead was rejected by D2 and costs 4+ hours. Leaving it is free and stays honest, because the page discloses it. | **authorise by Sun 20**; execute after 09-21 (D9) |
| E5 | Run C4 on 09-21 after all, if the room is 20 minutes ahead at 8:12? | 18 planned, about 34 actual. It is the best possible use of the reserve, and it gives Session 4's D4 a prior data point. | on the night |
| E6 | DW-050, the course spine | Open across three passes. Not teach-blocking. | after 09-21 |
| E7 | Does Session 4's cold open survive? (§10) | It has run zero times in two sessions and the five-week comparison it protects has no data points. | before 09-28 |

### 9.1 The four-day sequence

| Day | Items | Min | Notes |
|---|---|---|---|
| **Thu 17** | E1, E2, E3 decided; A1, A3, A10, A11, B3 | 47 | All JARED-ONLY. Nothing can be built until E1 is answered. |
| **Fri 18** | A2, B1, B7, then commit, push, validators | 35 | Group 1. Expect V2, V6, `#pnum` and restyle_sweep red by design. |
| **Sat 19** | A7, A8, then commit, push, validators | 90 | Group 2. The two structural edits; T7 must be re-recorded after each. |
| **Sun 20** | A4, A5, B2, C1, C3 | 110 | Group 3. The page and the run sheet. |
| **Sun 20 pm** | A6, B4, B5, B8 | 55 | JARED-ONLY. Zoom and Canvas. |
| **Mon 21 am** | B6, B9 | 70 | Records. Slippable to after the session. |

**Total: 407 minutes, about 6.8 hours across four days**, of which 102 minutes are JARED-ONLY and
305 are BUILDABLE.

**The dependency critical path is short: 105 minutes.** A5 waits on both A7 (60) and A8 (30, which
waits on A3), so the chain is max(A7, A3+A8) + A5 = 60 + 45. Everything else parallelises. **The
binding constraint is not the dependency graph, it is your calendar**: 6.8 hours of work in four
evenings alongside a full-time job.

**If that does not fit, cut in this order.** Drop B6 and B9 to after the session (70 min recovered,
records only). Drop A7, the §01/§02 merge (60 min), and accept a 62-minute core instead of 59. That
leaves 277 minutes, about 4.6 hours, and still lands every blocking item. **Do not cut A1, A3, A4 or
A6**: each one is something the room will be exposed to on the night.

If E1 is not answered by Friday, stop and run Package A: the core stays at 67, you run two
interactions instead of three, and the seven-step sorter goes async. That is a worse session, and it
is recoverable.

---

## 10. Sessions 2 and 4: what happens to the ritual

Session 4's run sheet says the cold open is "identical every session. Do not vary it, survey the
room, or collect anything else: the five-week comparison needs it unmoved."

**That comparison has zero data points.** `audit/AUDIT-2026-09-07.md:752` records that the series
"starts at Session 2"; Session 1's was lectured, not run, and Session 2's was absent. A protection
order over an empty dataset protects nothing.

Recommendation for 09-28: **replace the paste with a choose.** Same slot, same eight minutes, same
standing-ritual framing, no typing:

> Four prompts on screen, all four written by a beginner. "Which of these four would you have sent?
> Click one." Then the same eight checks render against the one the room picked, as a group, rather
> than against a prompt nobody has.

Keeps Gagné event 1, keeps the standing ritual, produces a room-level artifact you can spend, and
has a floor of one click. It also starts a comparison series that can accumulate, because it will run.

Do not change Session 2's page: it is taught, and the page is now a record.

---

## 11. What moves on the rubric, honestly

| Dim | Now | Plausible | What moves it |
|---|---|---|---|
| D1 Content accuracy | 5 | **6** | The corrections slot, plus A1 and A3 closing two claims you would otherwise teach flat. Confidence labelling is already 8+ behaviour; the gap is the unhedged claims. |
| D2 Organization | 4 | **6** | An objective stated before 6:19 and printed in the run sheet, the page opened at 6:11 rather than at 62.9% elapsed, and the §5 clock. Lowest dimension, cheapest to move. |
| D3 Cognitive load | 5 | 5 to 6 | The §01/§02 merge and the §09 trim reduce element interactivity. Half the dimension stays uninspected until you send the lesson file with the transcript. |
| D4 Engagement | 5 | **6** | Three interactions executed, one silent-work interval (zero in two sessions), four polls, and no gap above 20 minutes between whole-room commitments against a baseline of 70. |
| D5 Andragogy | 8 | 8 | Already the course's strength. Protect it: the §08 harvest and the Q&A reserve are where contribution reuse happens. |
| D6 Delivery | 5 | 5 to 6 | Three pre-marked gated questions in the planning content, where the measured rate is currently 0.00 gaps per minute. |
| D7 Checks and feedback | 5 | **6** | A closing check that produces written answers, and decision rules that fire. Zero have fired in two sessions; four written rules are at §8.3. |

Total plausibly moves from 51.5 to about 57. Confidence L on the point estimate, H on the direction.
D2 and D4 carry it.

---

## 12. The failure mode, and the cheapest insurance

**The failure mode** is the one that took Session 2: the night opens on administration, the first
forty minutes go to Canvas questions and a product announcement, and by 8:00 the seven-step sorter
has not happened. Session 2 spent 9.7 minutes on Canvas troubleshooting before any content and 22.1
minutes on administration in total.

**The cheapest insurance is B5**: announce a standing pre-class window at 5:45, every week, and say
at 6:00 "Canvas and file questions at the break." Five minutes of work, and it is the only item here
that protects the 6:00 to 6:19 block, which is where both prior sessions were lost.

**The second cheapest is A10**: one Zoom checkbox for speaker-labelled transcripts. Both audits have
run at partial instrumentation for two sessions; talk share, own-answer rate, monologue length and
true wait time have all been unmeasurable. The Session 2 audit called this "the single cheapest thing
you can supply to improve the accuracy of every future review."

**If only four things get done before Monday**: A1 with A2 (you are about to ask the room to run
those prompts), A4 (you are about to assign Part 1 from a page with no data rule), A6 with A5 (the
polls and the clock), and A3 (you are about to teach recording law from a page that says it needs
your sign-off). Everything else can slip a week.

---

## 13. What could not be verified

- **The syllabus PDF is not in the repository.** The Session 3 topic row survives verbatim in
  `docs/changes/2026-09-13-session-3-manual-pass/notes-verbatim.md:14-25`, but the course-level
  Learning Objectives do not exist anywhere in the tree, and the exact string F15 quotes returns zero
  hits. B3 exists to close that gap.
- **Part 2 has no definition in the repository.** It is reconstructable only from Session 4 fragments
  (`session-4:1825`, `:1856`, `:1866`, `:1876`): the receiving student's written response to another
  student's Part 1 package, presented at the Session 5 meeting. Confidence M on the reconstruction.
- **The Office add-in behaviour (A1) cannot be checked from this environment**: support.claude.com
  and claude.com are egress-blocked, as are anthropic.com, reglab.stanford.edu, irs.gov, arxiv.org,
  openai.com, artificialanalysis.ai and livebench.ai. Every figure sourced to those hosts is carried
  at its recorded date and was not re-verified here.
- **The 1.7x and 1.9x expansion multipliers are the repository's own figures, labelled M.** The whole
  arithmetic of §2 inherits that confidence. A speaker-labelled transcript from 09-21 (A10, D1) would
  let the next review measure them properly for the first time.
