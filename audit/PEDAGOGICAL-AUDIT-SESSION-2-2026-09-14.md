# Session 2 Review: BUS ADM X433.4, AI Foundations for Financial Advisors

Formal peer-review lecture observation. Reviewer stance: professor of learning sciences and instructional design conducting a peer observation for a financial-services CE instructor.

**Reference population: top-quartile CE-accredited financial-services and adult-education instructors.** A 7 means "meets that standard." A 5 means "typical CE instructor." This is not an undergraduate or retail-consumer benchmark.

---

## 0. Scorecard and Session Verdict

### 0.1 Materials inventory

| File | Role | Format | Detected type |
|---|---|---|---|
| `transcript.txt` | **transcript** (audit target) | ASR export, segment-level timestamps | **ASR, no diarization.** faster-whisper small.en, int8, Silero VAD 500 ms. 3,324 segments, 26,895 words, 178.0 min span |
| `PEDAGOGY.md` (project knowledge) | supplementary | Markdown | Live-session run protocol, v1.0, 2026-08-16 |
| `BUS_ADM_X433_4...pdf` (project knowledge) | supplementary | PDF | Syllabus, Fall 2026 |
| `__INTERACTIVE_COMPONENT_BANK...` (project knowledge) | supplementary | Markdown | Component bank and citation library |
| Session 2 lesson HTML | **NOT SUPPLIED** | — | See 0.2, Flag 1 |
| Zoom chat log | **NOT SUPPLIED** | — | See 0.2, Flag 2 |
| Zoom poll report | **NOT SUPPLIED** | — | See 0.2, Flag 2 |

### 0.2 Premise audit

**Flag 1, High, confidence H. No lesson file.** The session ran against a live web lesson ("click on the link in our chat, go to the front page, session two," 1:52). Without it there is no plan to diff the delivery against. Four items in the standard battery are therefore unscored or partially scored: designed-interaction count, planned minutes per section, prose density, and on-page source-list and confidence-label coverage. **D3 is half-inferred and carries confidence M as a result.** Supplying `session-2.html` would let me re-run the alignment and re-score D3 and D4 with real denominators.

**Flag 2, High, confidence H. No chat log and no poll report.** Three polls fired by audible evidence. Their distributions, the anonymity flag on any practice-reality poll, and whether any decision rule branched are all unmeasurable. Written-capture participation cannot be counted. Section 1.7B is largely NOT ASSESSABLE.

**Flag 3, Blocking for metrics, confidence H. No speaker diarization.** The transcript itself discloses this. The bundled metrics script, run on a reconstructed VTT, returns `talk_share = 1.00`, `longest_monologue = 109.6 min`, `wpm = 180.5`, and `own_answer_rate = 0.53`. **Every one of those is an artifact of the whole room being labeled as one speaker, and none is reported as a finding in this review.** Section 1.5 states which metrics survive and which do not. This was also true in Session 1, so the limitation is at least consistent across the two data points.

**Flag 4, Medium, confidence H. ASR domain-vocabulary error, not instructor error.** small.en is a 244M-parameter general-English model and the transcript warns about financial acronyms. Confirmed mishearings: "210 C5A" for §2010(c)(5)(A); "Simone Laplace" for Pierre-Simon Laplace; "Sonic," "Sana," "Sander," "SANA" for Sonnet; "PCTF" and "PDCF" for PTCF; "Clods" for Claude's; "raw" for Roth. **Per protocol, the instructor is not scored on any of these.**

**Flag 5, Low, confidence H. Session date.** Recording tag 2026-09-15T04:27:50Z resolves to Monday 2026-09-14, 18:27 PT. Consistent with the syllabus (Mondays 31 Aug to 5 Oct, no class 7 Sep). Session 1 was 2026-08-31, so the inter-session gap was 14 days, which is the gap PEDAGOGY §3.4 documents as the reason Session 2 may reach back only one session.

**Flag 6, Medium, confidence H. Syllabus internal contradiction, surfaced in class.** The syllabus narrative says Final Project Part 1 is "due at the end of Session 4." The schedule table says it is "due the Wednesday before this session." Those are different dates for the same graded deliverable. The instructor resolved it verbally to the Wednesday (2:36). The written artifact still contradicts itself and students will read the narrative.

**Duration:** 178.0 min against a 180-min block. Instructional minutes available under PEDAGOGY §4 are 150.

### 0.3 Scores

| # | Dimension | Weight | Score /10 | Weighted | Confidence |
|---|---|---|---|---|---|
| D1 | Content accuracy and currency | 25 | **5** | 125 | H |
| D2 | Organization and signposting (Gagné 1 to 4) | 15 | **4** | 60 | H |
| D3 | Cognitive load and visual design | 15 | **5** | 75 | **M** (no lesson file) |
| D4 | Engagement and active processing | 15 | **5** | 75 | M |
| D5 | Audience calibration and andragogy | 10 | **8** | 80 | H |
| D6 | Delivery mechanics from text | 10 | **5** | 50 | M |
| D7 | Understanding checks and learner feedback | 10 | **5** | 50 | M |
| | **Weighted total** | **100** | | **51.5 / 100** | |

**Lowest dimension: D2, Organization and signposting, at 4.** Session 1 total was 49.5. Delta **+2.0**, driven entirely by D4 (5 versus 5, held) and D1 (4 to 5). See 2.6 for the trend analysis and the one dimension that regressed.

### 0.4 Verdict

This session is a good class about the wrong week. The teaching itself is often excellent: the grounding walkthrough at 2:19 to 2:32, where a live model answer is chased down through §2010(c)(5)(A) on screen with the instructor openly saying "I don't actually know the governing authority citation here," is genuinely exemplary and is the single best twelve minutes in either session so far. The room is engaged: six of roughly eight attendees speak, unprompted, with substantive content, and one learner's opening tip visibly restructured the first half hour with the instructor saying so out loud.

The problem is allocation. By measured block, **26 to 30% of the 178 minutes landed on the nine topics the syllabus assigns to Session 2.** 20% went to Session 1 carryover, 5.6% to a Session 4 topic pulled forward, 12.4% to administration, and 26% to final-project scaffolding that is valuable and is not on any session's topic list. Three designated Session 2 topics received zero minutes, including one that is a stated course Learning Objective with no remaining home in Sessions 3, 4, or 5.

The structural findings are the same three from Session 1, partially moved. Still no stated objective, still no closing check. The retrieval bridge that PEDAGOGY §4 requires at the open of Sessions 2 through 4 did not run, and neither did the weekly prompt ritual, on the one night when the homework in flight was a prompt-writing assignment whose artifacts were exactly what the ritual harvests. Seventy minutes elapsed between the second whole-room commitment device and the third.

The most useful measurement in this review is not a score. Session 1's red team predicted that the three-second wait-time gate "will hold in the token-prediction block, where the material is unfamiliar to you as a speaker, and it will collapse in the estate-planning block, where you are fluent." That prediction is confirmed to the minute. See 1.5.3.

---

## Part 1, Analysis

### 1.1 Content-Accuracy Audit

Learners are anonymized as Learner A through F. The mapping is withheld from this file on purpose; timestamps allow reconstruction.

| # | Claim | Location | Verdict | Conf. | Correction and citation |
|---|---|---|---|---|---|
| C01 | "Output costs, I believe, usually about double what input costs" | 1:53 | **Incorrect** | H | Output is **5x** input across every current Claude tier, not 2x: Haiku 4.5 $1/$5, Sonnet 5 $2/$10, Opus 5 $5/$25, Fable 5.1 $10/$50 per MTok. Source: platform.claude.com/docs/en/about-claude/pricing. **Load-bearing:** the cost-per-task segment at 2:41 to 2:56 rests on this ratio. The segment's conclusion (cost per task is not cost per token) survives, but the multiple taught is wrong by 2.5x. |
| C02 | "If you don't file the final estate tax return and elect portability, that is permanently lost" | 2:22 | **Partially correct** | H | True for estates *required* to file under §6018(a). For estates with no filing requirement, **Rev. Proc. 2022-32** provides a simplified method to elect portability on or before the **fifth anniversary** of death, by filing a complete Form 706 marked "FILED PURSUANT TO REV. PROC. 2022-32 TO ELECT PORTABILITY UNDER § 2010(c)(5)(A)." This supersedes Rev. Proc. 2017-34's two-year window. Sources: Rev. Proc. 2022-32; *The Tax Adviser*, Nov 2022. **This is the one error in the session a CFP could act on to a client's detriment**, because "permanently lost" ends a conversation that Rev. Proc. 2022-32 would reopen. |
| C03 | Portability = surviving spouse takes the deceased spouse's unused exclusion; exemption $15M; 40% top rate; must be elected on the final return | 2:21 to 2:22 | **Correct** | H | 2026 basic exclusion amount is $15,000,000 per IRS (Rev. Proc. 2025-32; OBBBA §70106 amending IRC §2010(c)(3)). Top rate 40%. DSUE mechanics per §2010(c)(5)(A). |
| C04 | "Illinois doesn't have it" (portability) | 2:20 | **Correct** | H | Illinois exclusion is $4,000,000, not indexed, **not portable** between spouses; 35 ILCS 405. A state QTIP election under 405/2(b-1) is the usual workaround. |
| C05 | The correct citation for portability is §2010(c)(5)(A); chapter heading "unified credit against estate tax" is the smell check | 2:24 to 2:26 | **Correct** | H | §2010 is "Unified credit against estate tax"; (c)(5)(A) is the portability election. The on-screen navigation to C, then C5, then C5A is correct. |
| C06 | "IRS publications are not law. You cannot turn around and argue in tax court, it said it in the publication" | 2:23 | **Correct** | H | Settled: IRS publications are non-binding guidance and are not substantial authority. |
| C07 | "There's no official IRS source detailing the steps of a backdoor Roth. There is a letter stating that they know it exists and that it is allowed" | 1:09 | **UNVERIFIED** | — | Not verified in this review. The acknowledgment usually cited is a **congressional conference report footnote** (H.R. Rep. 115-466, TCJA), which is legislative history, not an IRS letter. Verify before repeating; if the distinction holds, the correction is one sentence and it reinforces the session's own point about provenance. |
| C08 | "Haiku, I do not believe you can actually do research. Haiku is the most limited" | 1:28 | **UNVERIFIED** | — | Haiku 4.5 **does** support the server-side web search tool per Anthropic platform documentation and Microsoft Foundry's capability listing. Whether the claude.ai *Research* toggle is gated by model tier is not confirmed by any first-party source I could reach. Hedged appropriately in delivery ("I do not believe"). If the toggle is available on Haiku, the model-selection item that turns on this trap needs rewriting. |
| C09 | Sonnet is "20% of the cost when you look at the price of tokens" versus Fable | 1:39 | **Correct** | H | $2/$10 versus $10/$50 is exactly 20% on both sides. |
| C10 | "Sonnet 50 cents per successful task, Fable $1.21" | 1:38 | **UNVERIFIED** | — | Instructor flagged the source himself ("this is iffy, I would not take Google AI answers, but for the sake of this question"). Correctly labeled in delivery. Do not carry these two numbers into a slide without a named benchmark. |
| C11 | "GPT-6 Astra 92.7 in reasoning, Fable 5.1 91.7" | 1:26 to 1:27 | **UNVERIFIED** | — | Leaderboard figures read off screen. Also at ASR risk. Not checkable from the transcript. |
| C12 | Cached prior turns are resent "at about 90% off" | 1:58 | **Correct with a caveat** | H | Cache hits are 0.1x base input for most current models, so 90% off. Two caveats: Fable 5.1 and Mythos 5.1 cache hits are 0.025x, and cache *writes* cost 1.25x (5 min) or 2x (1 hr). Source: platform.claude.com pricing. |
| C13 | Extended thinking is billed as output tokens | 1:54 | **Correct** | H | |
| C14 | "Its thinking could have been millions of tokens to get to that small answer" | 1:54 | **Partially correct** | H | Rhetorical overstatement. Max output per request on the current frontier tiers is 128K tokens. Low severity, but it is a number, and this course teaches checking numbers. |
| C15 | Model training cutoff: "end of May 2026" for Opus 5 | 0:42 | **Correct** | H | Matches Anthropic's stated reliable cutoff. Read live off the model, which is the right way to teach it. |
| C16 | Persona "does not necessarily quantifiably improve your output on different models" | 0:05 | **Correct** | H | Zheng, Pei, Logeswaran, Lee and Jurgens (2024), *Findings of EMNLP 2024*, 15126 to 15154: 162 personas, 4 model families, 2,410 MMLU questions; personas produce no improvement and sometimes small negative effects. **Cite this paper by name next time.** It is a 15-second addition that converts an assertion into evidence in front of an audience trained to ask for evidence. |
| C17 | Context decay: the model "starts to forget, usually starting with the middle" | 1:13 | **Correct** | H | Consistent with the lost-in-the-middle position-bias literature. |
| C18 | Temperature at 0 makes the top token appear "100% of the time"; higher temperature flattens the distribution | 2:13 to 2:14 | **Correct** | H | Correct description of greedy versus sampled decoding. |
| C19 | Hallucination arises because the model is rewarded for a complete, plausible-sounding answer and cannot represent the extent of its own ignorance | 2:04 to 2:09 | **Correct** | H | This is the thesis of the assigned Kalai, Nachum, Vempala and Zhang (2025) reading, taught well. **The reading was never named while teaching it.** See F09. |
| C20 | Vulgarity in prompts degrades output quality | 1:04 | **Appropriately hedged** | — | "I'm not going to give this 100%. I have not seen the evals." Correct epistemic handling of a folk claim. There is a published cross-lingual politeness study reaching a compatible conclusion; worth a citation if you keep the segment. |
| C21 | "None of you should use any of the new connectors, because none of you have full enterprise Claude accounts" | 0:28 | **Partially correct, conclusion correct** | H | The conclusion is right and is the best compliance instinct in the session. The mechanism is slightly off: per Anthropic's launch materials and trade coverage (14 Sep 2026), Claude for Financial Advisors is gated by the **plugin plus Claude Cowork plus a firm license** (trade estimates ~$70 to $120 per user per month), not by "enterprise tier" as such. |
| C22 | Claude for Financial Advisors released with connectors to Wealth.com, Orion and others | 0:22 to 0:30 | **Correct** | H | Launched Monday 14 Sep 2026. Named partners include BlackRock, Schwab, Addepar, Envestnet, iCapital, Orion, SS&C Black Diamond, Vanguard, Wealthbox, Wealth.com and Zocks. Source: claude.com/blog/claude-for-financial-advisors; *WealthManagement.com*, 15 Sep 2026. |
| C23 | Anthropic advisor webinar, 18 Sep, "8 to 9 p.m. or 9 a.m. Pacific" | 0:23 | **UNVERIFIED** | — | Self-corrected mid-sentence and left ambiguous on the recording. Post the exact time in Canvas; students were told to attend. |
| C24 | Fee philosophy: AUM produces the highest advisor revenue; fees are among the strongest predictors of fund outcomes | 0:20 to 0:22 | **Directionally correct, unsourced** | M | Attributed loosely to "Kitces research on advisor revenue" and "Morningstar's active passive barometer." The fee-predictiveness finding is closer to Morningstar's *Predictive Power of Fees* work than to the Active/Passive Barometer. Ten and a half minutes of unsourced professional opinion in a course whose thesis is grounding. |

**Audit totals: 24 checkable claims. 11 Correct, 4 Partially correct, 1 Incorrect, 5 UNVERIFIED, 2 appropriately hedged or directional, 1 correct-with-caveat.** Session 1 produced three Incorrect claims. One is a material improvement.

### 1.2 Section-by-Section Review (measured blocks)

No lesson file, so sections are derived from topical transitions in the transcript. Every boundary is labeled M. Word rate is instructor plus learner words divided by block minutes and is a density proxy, not WPM.

| Start | Min | Words | Rate | Block | Syllabus mapping | Whole-room commitment | Flags |
|---|---|---|---|---|---|---|---|
| 0:00 | 2.3 | 222 | 97 | Waiting room, audio check | ADMIN | none | |
| 0:02 | 9.7 | 1,603 | 165 | Open Q&A: Canvas, recordings, file formats | ADMIN | none | F01 opening ritual absent, F02 bridge absent |
| 0:12 | 10.5 | 1,743 | 166 | Compensation poll, fee-model discussion | **OFF-SYLLABUS** | **Poll 1** | F03 |
| 0:22 | 10.0 | 1,586 | 159 | Claude for Financial Advisors, connectors, Cowork | **SESSION 4 TOPIC** | none | F04 |
| 0:32 | 50.5 | 7,347 | 145 | Live skill build, meta-prompting, PTCF, side-by-side, versioning | S2 partial (PTCF ~7 min) + project scaffold | **Poll 2** (0:50) | F05, F11 |
| 1:23 | 21.0 | 3,198 | 152 | Model-selection exercise (5 items), cost per token, system instructions | **SESSION 1 CARRYOVER** | none | F06 |
| 1:44 | 8.0 | 1,300 | 162 | Break window, spent on 1:1 tech support on shared screen | ADMIN | none | F07 |
| 1:52 | 8.0 | 1,108 | 138 | Input/output token cost, context-window composition | **S2** | none | C01 |
| 2:00 | 9.0 | 1,334 | 148 | Three-cups probability, Laplace, hallucination origin | **S2** | **Poll 3** | strength |
| 2:09 | 7.0 | 898 | 128 | Next-token probability, n-grams, temperature | **S2** | none | strength |
| 2:16 | 3.0 | 384 | 128 | Learner Q: reasoning as a truth proxy | **S2** | none | strength |
| 2:19 | 13.0 | 2,098 | 161 | Grounding demo, portability, §2010(c)(5)(A) | **S2** | none | **best block**, C02 |
| 2:32 | 9.0 | 1,442 | 160 | Final Project Part 1 brief and timeline | PROJECT | none | **F08, High** |
| 2:41 | 15.0 | 2,378 | 159 | Cost per task, efficient frontier, model and effort | **SESSION 1 CARRYOVER** | none | F06 |
| 2:56 | 2.1 | 304 | 145 | Wrap | ADMIN | none | F10 no closing check |

**Coverage rollup, which is the direct answer to the coverage question:**

| Category | Minutes | Share |
|---|---|---|
| Session 2 designated topics | 40.0 pure + ~7 (PTCF inside the build) = **47** | **26.4%** |
| Final-project scaffolding (not on any topic list) | ~46 (9 explicit + ~37 of the build) | 25.8% |
| Session 1 carryover | 36.0 | 20.2% |
| Administration | 22.1 | 12.4% |
| Off-syllabus (fee philosophy) | 10.5 | 5.9% |
| Session 4 topic pulled forward | 10.0 | 5.6% |

**Elapsed time before the Session 2 lesson file was opened: 112 minutes, 62.9% of the session.**

**Topic-by-topic against the syllabus Session 2 row:**

| # | Syllabus Session 2 topic | Status | Minutes |
|---|---|---|---|
| 1 | Principle: the model samples a plausible answer, it does not compute the true one | **Covered, strong** | ~16 |
| 2 | Laplace's demon and the origin of probability | **Partial.** The probability-is-relative-to-knowledge point landed well via the three-cups poll. "Laplace's demon" was never named. Nobody had read the five pages, which the instructor discovered aloud at 1:24 and did not act on | ~3 |
| 3 | Prompting frameworks (PTCF), advisor templates, structured peer review | **Partial.** PTCF taught. Advisor templates absent. **Structured peer review absent** | ~7 |
| 4 | Where AI-assisted analysis fits in the seven-step financial planning process | **ABSENT** | 0 |
| 5 | The interview rewrite: let the AI ask you questions first | **Named only.** One clause at 2:56 ("reverse prompting, having Claude ask you questions"). Never demonstrated | ~0.2 |
| 6 | Temperature | **Covered** | ~4 |
| 7 | Client intake, onboarding, advisor communications | **Minimal.** The backdoor-Roth email is the only communications artifact, and it is a vehicle for prompt structure, not for communications design | ~5 |
| 8 | Researching and applying current tax law; verifying every citation against primary source authority | **Covered, exemplary** | 13 |
| 9 | Assigned readings used in class: Anthropic AI Fluency 4 Ds; Google Prompting Guide 101; Morningstar AI for Advisors | **Largely absent.** "Discernment" said once at 1:50 with the framework unnamed. PTCF taught without attribution to the Google guide it comes from. Morningstar reading never mentioned | ~0.5 |

**Three of nine fully covered, three partial, three absent.**

**The consequential absence is topic 4.** "Evaluate where AI-assisted analysis is appropriate within the seven-step financial planning process by applying a structured delegation framework to each step" is a stated course Learning Objective in the syllabus. It was scheduled for Session 2, received zero minutes, and **has no slot in Sessions 3, 4 or 5.** Under constructive alignment (Biggs), an objective with no instruction and no assessment is a blocking defect: either it lands in Session 3 or it is struck from the syllabus. Given the syllabus is the accreditation-facing artifact, striking it is the worse option.

### 1.3 Teaching-Materials Review

| Material | Function | Alignment | Design and load | Usage evidence | Flags |
|---|---|---|---|---|---|
| Live Claude UI (screen share) | Primary teaching surface for 0:32 to 1:23 | High to the final project, partial to the Session 2 topic list | Model latency created at least four unmanaged waits ("that is going to take a little bit," 0:43; "it's still working," 1:00; "we'll know once that's ready," 1:20) | Continuous | F11 |
| Session 2 lesson file | The designated instrument | Not opened until 1:52 | NOT ASSESSABLE, file not supplied | 1:52 to 2:16, 2:41 to 2:56 | F12 |
| Zoom polls (3 fired) | Whole-room commitment | Poll 2 (PTCF) misconfigured single-select, caught and retracted live at 0:51 | NOT ASSESSABLE without the report | 0:13, 0:50, 2:00 | F13 |
| Cornell LII, IRC §2010 | Grounding demo target | Exemplary | Nesting-doll navigation explicitly signaled ("you gotta start all the way from the left") | 2:24 to 2:27 | strength |
| Efficient-frontier chart | Cost per task | Session 1 carryover | Axes explained before interpretation, which is correct signaling | 2:50 to 2:54 | |
| Student discussion posts and homework | Read by instructor, not used in class | The prompt-template homework was in flight | Nothing student-produced appeared on screen at any point in 178 minutes | none | **F14, High** |

### 1.4 Delivery and Facilitation Review

Transcript-supported only. Tone, volume, pacing-within-cue, gesture, and camera behavior are **NOT ASSESSABLE** from text and are not inferred anywhere in this review.

**Question architecture.** Question density is high and mostly genuine: I count **26 elicitation events that received at least one learner answer** across 178 minutes, one per 6.8 minutes. That is a real strength and it separates this session from a lecture.

The defect is the *shape* of many of them. A recurring pattern is the narrow-funnel guess sequence, where the class is asked to identify the one answer already in the instructor's head:

> 0:37 to 0:41, condensed: "What else should I consider before I hit send? ... There's only seven buttons on the screen. So you got pretty good odds if you guess of what I could possibly change. ... So it's not this orange button. What else could I change? ... There's only really one other thing I would consider changing on this one. Maybe a couple, but only one I'm looking for."

Four consecutive questions with a single predetermined answer. These produce low-information participation: the learner who guesses right reveals nothing about their model of the material, and the learners who stay quiet reveal nothing at all. The same content converts cleanly to a committed poll with diagnostic distractors, which is FS-2 below.

**Question restatement before anyone can answer** appears repeatedly (0:35: "Anyone change this prompt at all? Is there anything they can make this prompt better in any way?"; 0:36: "What are you doing? What should I change? What should I define?"; 1:26: "What are the downsides of having 62%? Have people explored that problem very much?"). This is the 5 to 6 anchor behavior for D6 and it is unchanged from Session 1.

**Learner participation.** Six distinct learner voices are identifiable (Learners A through F) against roughly eight attendees ("seven people, believe we're only waiting on a couple others," 0:01). Contributions are substantive and unprompted: Learner A surfaced the Anthropic release before class started; Learner D introduced an Anthropic prompt-engineering roundtable finding on positive-language prompting that the instructor then taught from for three minutes; Learner B pushed back correctly on the "summarize a 90-minute meeting" item by distinguishing human notes from AI-transcribed notes (1:34). **A 75% voice-participation rate in a three-hour online session is well above what this reference population typically achieves.**

**Silent work: zero intervals.** No task in 178 minutes was set with a stated duration followed by silence. The two gaps above 20 seconds are the waiting room (0:01) and the break (1:51).

**Two pace check-ins returned silence.** At 2:41: "Am I going too fast? Am I going too slow? Any questions on anything that we've covered so far?" and at 2:57: "any outstanding questions, anything else that I covered here today in session two." Both were open verbal asks and both got nothing. A one-item rating-scale poll in the same slot would have produced a distribution and, under PEDAGOGY §9.3, could have triggered the split-the-room protocol. As delivered, the instrument returned no signal.

### 1.5 Quantitative Metrics

#### 1.5.1 Suppressed metrics and why

| Metric | Script output | Status |
|---|---|---|
| Instructor talk share | 1.00 | **NOT ASSESSABLE.** No diarization; the whole room is one speaker label |
| Longest instructor monologue | 109.6 min | **NOT ASSESSABLE.** Same artifact |
| WPM | 180.5 | **NOT ASSESSABLE.** Includes learner words; speaking-time denominator is synthesized |
| Own-answer rate | 0.53 | **NOT ASSESSABLE.** A learner reply is indistinguishable from the instructor continuing |
| Median wait time | 2.9 s | **NOT ASSESSABLE as wait time.** Measures inter-segment gaps for a single undiarized speaker |
| Interactions fired ÷ designed | — | **NOT ASSESSABLE.** No lesson file |
| Polls fired ÷ designed | 3 / ? | Numerator only. Denominator requires the designed poll set |
| Prose density on screen | — | **NOT ASSESSABLE.** No lesson file |

#### 1.5.2 Metrics that survive

| Metric | Value | Benchmark | Confidence |
|---|---|---|---|
| Session span | 178.0 min | 180 scheduled, 150 allocated instructional (PEDAGOGY §4) | H |
| Total words | 26,895 | — | H |
| Gross density | 151 words per wall-clock minute | Session 1: comparable method | H |
| Lexical filler rate | 0.81 per 100 words (you know 93, I mean 68, kind of 50, um 2) | Under the 2 per 100 "unremarkable" threshold. ASR suppresses um/uh, so this is a floor | M |
| Elicitations answered by a learner | 26, or 1 per 6.8 min | No published band. Well above a lecture | M (hand-counted) |
| Distinct learner voices | 6 of ~8 attendees, 75% | Strong | M (no diarization; count is a floor) |
| Whole-room commitment devices | **3 in 178 min** | PEDAGOGY §4 target: 4 polls fired of 6 designed, plus 13 to 15 interactions | H |
| **Longest gap between commitment devices** | **70 min** (0:50 to 2:00) | PEDAGOGY §4 maximum unbroken exposition: **12 min** | H |
| Silent-work intervals | **0** | Protocol move 4 | H |
| Time before the session's own lesson file opened | 112 min, 62.9% | — | H |
| Session 2 topic coverage | 3 of 9 full, 3 partial, 3 absent | — | H |

#### 1.5.3 Wait time, the Session 1 prediction, and its confirmation

The transcript's own VAD flags every silence above 1.5 s: **56 flagged gaps, 135.9 s total.** This is the metric directly comparable to Session 1's VAD-derived pause distribution.

| Threshold | Session 1 (174 min) | Session 2 (178 min) | Per minute |
|---|---|---|---|
| Gaps ≥ 3 s | 8 | **13** | 0.046 → **0.073**, +59% |
| Gaps ≥ 4 s | not reported | 4 | |
| Gaps ≥ 5 s | 2 | **0** | regression at the long end |
| Longest gap | ≥10 s (break) | 4.7 s | |

Session 1's red team predicted: *"The three-second gate will hold in the token-prediction block, where the material is unfamiliar to you as a speaker and you are naturally pausing, and it will collapse in the estate-planning block, where you are fluent and the temptation to fill is strongest."*

**Distribution of gaps ≥ 3 s by block:**

| Block | Minutes | Gaps ≥3 s | Per minute | Longest gap |
|---|---|---|---|---|
| Next-token probability and temperature (2:09 to 2:16) | 7.0 | **4** | **0.57** | 4.3 s |
| Live skill build (0:32 to 1:23) | 50.5 | 6 | 0.12 | 4.7 s |
| Model-selection exercise and cost (1:23 to 1:44) | 21.0 | 1 | 0.05 | 3.0 s |
| **Grounding and portability (2:19 to 2:32)** | 13.0 | **0** | **0.00** | 2.5 s |
| **Fee-model discussion (0:12 to 0:22)** | 10.5 | **0** | **0.00** | 2.4 s |
| **First 35 minutes (admin, fees, release)** | 35.0 | **0** | **0.00** | 2.4 s |

**The prediction is confirmed to the minute.** Wait-time discipline is 0.57 gaps per minute in the AI-mechanics content where you are a learner yourself, and exactly zero in the two blocks where you are the domain expert. The remedy Session 1 already specified is the right one and it is narrow: **pre-mark three specific questions in the planning and fee material as gated**, rather than attempting a global habit change that the evidence now says does not transfer across domains.

### 1.6 Benchmark Scoring

Evidence first, anchor match second, score third.

**D1, Content accuracy and currency, weight 25. Score 5, confidence H.**
Evidence: (1) one Incorrect claim, C01, load-bearing for roughly 23 minutes of cost instruction. (2) One Partially correct claim, C02, that a CFP could act on to a client's detriment. (3) Against that, eleven Correct claims, six of them primary-source legal or regulatory content verified in this review, including a live citation chase that resolved correctly on screen. (4) Uncertainty modeled aloud at least four times: C07, C08, C10, C20, plus "I don't actually know the governing authority citation here" at 2:20 and "I wish that I could provide more absolute statements" at 2:50.
Anchor: the 3 to 4 row is literally matched by "an Incorrect claim on a load-bearing point," but its characterizing clause, "defects are systematic, not incidental," is not met: the defects are two isolated items inside an unusually well-sourced session. The 8+ behavior (modeling confidence labeling aloud on three or more claims) **is** met, which is exceptional and is recorded. Net: **5.** Session 1 was 4 on three Incorrect claims; this is a genuine improvement.

**D2, Organization and signposting, weight 15. Score 4, confidence H.**
Evidence: (1) no session objective stated at any point, in 178 minutes. Gagné event 2 absent, same as Session 1. (2) Gagné event 3 absent as a designed move: the retrieval bridge required by PEDAGOGY §4 for Sessions 2 through 4 did not run. Prior learning surfaced only as instructor recap ("we spent an hour in class one going through," 0:37). (3) 62.9% of the session elapsed before the designated material opened; the stated topic was announced at 0:32 and not returned to until 1:52. (4) Against that, genuine location-signposting at 1:23: "I am on session one right now, section seven, judgment. We have two more things from my session one section and then we'll get to session two." That is honest and useful and is the reason this is not a 3.
Anchor: 3 to 4, first clause matched (no objectives), second clause not matched (the sequence is reconstructable from speech). **4.**

**D3, Cognitive load and visual design, weight 15. Score 5, confidence M.**
Evidence: (1) segmenting fails: one 50.5-minute block and one 70-minute stretch without a commitment device, against a 12-minute course maximum. (2) Signaling succeeds in the highest-load block: the IRC navigation at 2:24 to 2:27 is explicitly cued ("you gotta start all the way from the left"), which is textbook Mayer signaling on a genuinely dense artifact. (3) Temporal contiguity is damaged by unmanaged model latency, at least four instances.
Unscored for lack of the lesson file: redundancy (reading on-screen text), per-section word counts, prose density, coherence, on-page confidence labels, footer source list. **5, with half the dimension explicitly uninspected.**

**D4, Engagement and active processing, weight 15. Score 5, confidence M.**
Evidence: (1) prediction-before-reveal executed twice and executed well: the three-cups poll at 2:00 and the five model-selection items at 1:26 to 1:38, where the instructor states the design intent out loud ("this is where I think it's good to get it wrong, because Claude is not some omniscient being"). That is the prequestion contract delivered correctly. (2) 26 elicitations answered by a learner, 6 of ~8 learners voicing. (3) Zero silent-work intervals. (4) 70-minute maximum gap between whole-room commitments against a 12-minute exposition ceiling. (5) Delivered ICAP mode is Constructive for the one or two answering, Passive for the remaining six.
Anchor: two of the four criteria in the 7 row are met (prediction-before-reveal, at least one production event per block), two fail hard (no silent-work time given, exposition blocks far over maximum). **5.**

**D5, Audience calibration and andragogy, weight 10. Score 8, confidence H.**
Evidence, three instances of the 8+ criterion, each acknowledged aloud: (1) Learner A's pre-class tip about the Anthropic release restructured the first half hour, and the instructor said so at 0:01 ("that was a great call out, because that's actually what we're gonna go through as one of the very first things in class"). (2) The practicing-advisor headcount at 0:12 explicitly reset the framing for the rest of the session ("I wanna make sure I'm focusing on what's gonna matter to you guys, most of what you can actually apply in your day-to-day"). (3) Learner D's contribution on positive-language prompting was amplified into a three-minute segment with attribution and connected to the instructor's own tooling (1:02 to 1:06). Additionally: jargon defined inline on first use (portability, commission, pro rata, per stirpes versus per capita) with no dumbing-down; examples are practitioner-grade throughout, notably the "I wasn't there" case-note anecdote at 1:33, which is the best teaching example in the session.
Counter-evidence: eight minutes of 1:1 tech support on shared screen serving one learner (1:44 to 1:52); ten and a half minutes of fee philosophy whose relevance to a mixed cohort was asserted rather than demonstrated. **8**, consistent with Session 1, which keeps the trend line honest.

**D6, Delivery mechanics, weight 10. Score 5, confidence M.**
Evidence: (1) gaps ≥3 s rose from 8 to 13 across comparable session lengths, a 59% improvement, but zero gaps reached 5 s and the improvement is entirely confined to the AI-mechanics content (1.5.3). (2) Question restatement before anyone can answer persists, at least four clear instances. (3) The narrow-funnel guess sequence at 0:37 to 0:41. (4) Lexical filler rate 0.81 per 100, inside band, though ASR-floored. Own-answer rate, WPM and talk share unmeasurable.
Anchor: 5 to 6, "questions frequently restated," matched; the 7 row's wait-time criterion is met in one block and failed in every other. **5.** Session 1 was 4. This is the clearest measurable improvement in the review.

**D7, Understanding checks and learner feedback, weight 10. Score 5, confidence M.**
Evidence: (1) three polls fired, zero decision rules visibly executed. The compensation poll distribution was read aloud ("a lot of fee-based planning preferences," 0:14) and the session proceeded identically regardless. (2) Poll 2 misconfigured as single-select, caught and retracted live. (3) Against that, the feedback quality where checks did fire is genuinely strong and diagnostic, not right-or-wrong: on the concentration-risk item the explanation names why Sonnet wins on the structure of the problem ("concentration is a relatively well-known issue, we're not recreating the wheel"), and the instructor tells the room that being wrong is the point. That is the 7 row's feedback criterion, met. (4) No closing check. Gagné event 8 absent. Two open verbal asks returned silence. (5) No assessment against an objective, because no objective was stated.
Anchor: 5 to 6, first clause matched (checks fire, results not acted on), second clause not matched (feedback is diagnostic, not right-or-wrong). **5.**

**Weighted total: (5×25 + 4×15 + 5×15 + 5×15 + 8×10 + 5×10 + 5×10) ÷ 10 = 515 ÷ 10 = 51.5 / 100.**

### 1.7 Protocol Fidelity (unscored; evidence feeds D2, D4, D6, D7)

PEDAGOGY.md v1.0 supplied via project knowledge. Section-level alignment is impossible without the lesson file, so the A-matrix is reported at block level and every row is labeled accordingly.

#### A. The section loop, eight moves, across the 15 measured blocks

| Move | Expected | Observed | Verdict |
|---|---|---|---|
| 1. Name the section | Literal title read aloud | Block-level naming only: "session two, the practical AI usage" (1:52), "session one, section seven, judgment" (1:23). No per-section titles read | **Partial** |
| 2. Task before content | "In N minutes you will…" before exposition | Zero instances of a task set with a stated duration | **Absent** |
| 3. Poll placement | Prediction before content, comprehension after | Poll 3 (three cups) correctly placed before the reveal. Poll 2 (PTCF) correctly placed. Poll 1 (compensation) is an opinion poll with no reveal to precede | **Partial** |
| 4. **Silent work** | Duration stated, then silence | **0 intervals in 178 min.** This is the protocol's designated load-bearing measurement and there is nothing to measure | **Absent** |
| 5. Call on the distribution | "Someone said X, say why" | **Observed, twice.** 0:15: "anyone who said assets under management, why is that one the most appropriate?" 2:01: "Why didn't you click 100%? That's not a rhetorical question." Both are correct executions | **Observed** |
| 6. Reveal after work | Reveal follows the work | Observed on the model-selection items and the cups poll | **Observed** |
| 7. Confidence label aloud | H/M/L once per section | Confidence labeling was **taught** as a technique at 2:06 to 2:07, and the H label was visible on screen. It was not **said aloud** about the instructor's own claims in any section | **Absent as a per-section move** |
| 8. Bridge | One sentence naming what the next block does that this one could not | Transitions are overwhelmingly "All right, so." One real bridge at 2:32 ("I know we have 30 minutes left, so I'm going to make sure we cover the final project part") | **Partial** |

**Moves executed or partial: 5 of 8. Fully executed: 2 of 8.**

#### B. Poll design and decision rules

| Check | Expected | Observed |
|---|---|---|
| Polls fired | 4 of 6 designed | **3 fired**, denominator unknown |
| Spread covered | ≥1 prediction, ≥1 comprehension with diagnostic distractors, 1 anonymous practice-reality, 1 calibration pair, 1 fun aside, 1 administrative | Prediction: yes (cups). Comprehension: yes (PTCF), misconfigured. Anonymous practice-reality: **none.** Calibration pair: **none.** Fun aside: partially (cups). Administrative: **none** |
| Decision rule executed | For each poll, the stated branch taken or declined aloud | **Zero observed.** NOT ASSESSABLE whether rules existed |
| Anonymity flag | Set at creation on the practice-reality poll | **NOT ASSESSABLE**, no report |
| Dead air on poll creation | Zero polls created live | **One live-configuration failure** at 0:50 to 0:51: "if I made this so that you can only select one, I apologize… Okay, looks like it's a one answer only. So apologies on that one, I'll take that back" |

Session 1 fired 2 polls. Session 2 fired 3. Movement in the right direction, still below the protocol target of 4, and no decision rule has yet been observed firing in either session. **After two deliveries, PEDAGOGY §15.5 ("poll decision rules have never been executed live") remains unvalidated, and that is now a two-session pattern rather than a one-session gap.**

#### C. Split-the-room

**No trigger. Protocol not exercised.** No rating-scale poll fired, so the mean-below-3.5 trigger had no input. The two verbal pace check-ins at 2:41 and 2:57 are exactly the slots where a rating-scale item belongs.

#### D. Named discussion block (20 min, position → defence → complication → re-vote)

**Absent.** The fee-model discussion (0:12 to 0:22, 10.5 min) is the nearest thing and has none of the four phases: no locked position, no alternating defence, no complication introduced, no re-vote. It also violates the §9.4 selection criterion in reverse: the room did **not** divide, because the question ("what is a fair way to compensate an advisor") drew a fee-based consensus within the first minute. Scheduled discussion across Sessions 1 and 2 combined remains at zero minutes against a protocol target of 40.

#### E. Opening ritual ("paste your last prompt, verbatim, including the typos")

**Absent.** The session opened with 9.7 minutes of Canvas and file-format troubleshooting. No rejected opener pattern was used, which is worth noting: the compensation poll is not a self-assessment or anecdote opener, so R3 was not violated. But the ritual itself did not run on the single night of the course when the homework in flight was a prompt-writing assignment. The ritual exists to produce exactly that corpus.

#### F. Structural parameters

| Parameter | Expected | Actual |
|---|---|---|
| Break | 10 min, posted as a clock time | **Clock time given correctly** ("regroup at 9:50," 1:44). Duration 8 min. Spent on 1:1 tech support on shared screen, so the instructor took no break |
| Allocated instructional minutes | 150 | ~148 non-admin, but only ~47 on designated content |
| Maximum unbroken exposition | 12 min | **70 min** between commitment devices |
| Interactions | 13 to 15, ≥1 per section | 26 verbal elicitations, **3 whole-room commitments**, 0 silent-work tasks |
| Retrieval bridge (Sessions 2+) | 7 min, 4 ungraded items at open | **Absent** |
| Shift+U override | Labeled in top bar | NOT ASSESSABLE, no lesson file; no transcript mention |

#### G. Summary

1. **Moves executed or partial: 5 of 8. Fully executed: 2 of 8.**
2. **Largest protocol deviation: the retrieval bridge and opening ritual were both skipped at 0:02, and the 9.7 minutes they would have occupied went to Canvas troubleshooting instead.** Cost: the only two designed mechanisms for spacing and for harvesting student prompts both went unused on the night the prompt homework was live.
3. **Decision rules fired: zero, across two sessions.**

---

## Part 2, Improvement Build

### 2.1 Full Findings Register (Pass 1, unfiltered)

| ID | Finding | Location | Severity | Conf. |
|---|---|---|---|---|
| F01 | Opening ritual ("paste your last prompt") absent; session opened on 9.7 min of Canvas and file-format admin | 0:02 to 0:12 | High | H |
| F02 | Retrieval bridge absent (PEDAGOGY §4 requires 7 min, 4 items, Sessions 2 to 4) | 0:00 to 0:12 | High | H |
| F03 | 10.5 min on advisor compensation philosophy, unsourced, off the Session 2 topic list, in a cohort where ~3 of 8 are not practicing advisors | 0:12 to 0:22 | Medium | H |
| F04 | 10 min on Claude for Financial Advisors connectors, which is Session 4 content (approved vs non-approved vendors, enterprise vs consumer tiers) | 0:22 to 0:32 | Medium | H |
| F05 | 50.5-min continuous block with one commitment device inside it | 0:32 to 1:23 | High | H |
| F06 | 36 min (20.2%) on Session 1 carryover: model tiers, cost per token, cost per task, system instructions | 1:23 to 1:44, 2:41 to 2:56 | High | H |
| F07 | Break spent on 1:1 tech support on shared screen; one learner served, seven idle, instructor unrested | 1:44 to 1:52 | Low | H |
| F08 | **Final Project Part 1 assigned with no restatement of the no-client-data rule**, at the exact moment students were told to build on their own recurring tasks. The syllabus makes submitting a transcript containing client NPI an academic-integrity violation | 2:32 to 2:41 | **High** | H |
| F09 | Kalai et al. (2025) hallucination thesis taught accurately and at length without naming the assigned reading | 2:04 to 2:09 | Medium | H |
| F10 | No closing check; two open verbal asks returned silence; no objective to check against | 2:41, 2:57 | High | H |
| F11 | At least four unmanaged model-latency waits with no filler task set for the room | 0:43, 1:00, 1:20, 2:19 | Medium | H |
| F12 | Session 2 lesson file not opened until 1:52, 62.9% of elapsed time | 1:52 | High | H |
| F13 | Poll 2 misconfigured single-select, discovered live, retracted | 0:50 to 0:51 | Low | H |
| F14 | Nothing student-produced appeared on screen in 178 min, despite discussion posts read and a prompt homework in flight (PEDAGOGY §10.3) | whole session | High | H |
| F15 | Learning Objective "evaluate where AI-assisted analysis is appropriate within the seven-step financial planning process" received zero minutes and has no remaining slot in Sessions 3 to 5. Constructive-alignment failure | absent | **Blocking** | H |
| F16 | "Structured peer review" (Session 2 topic) absent, though the final project is built on peer handoff | absent | Medium | H |
| F17 | "The interview rewrite / reverse prompting" named in one clause at 2:56, never demonstrated, despite being a Session 2 topic | 2:56 | Medium | H |
| F18 | Laplace reading: nobody had read it, discovered aloud, not acted on | 1:24 | Low | H |
| F19 | Morningstar "AI for Advisors" reading and Anthropic "4 Ds" framework assigned for this session, essentially unused | absent | Medium | H |
| F20 | PTCF taught without attribution to the Google Prompting Guide 101 it comes from, which is an assigned reading | 0:50 | Low | H |
| F21 | C01: output-to-input token cost taught as 2x; actual is 5x across all current Claude tiers | 1:53 | High | H |
| F22 | C02: portability described as permanently lost; Rev. Proc. 2022-32 provides a 5-year simplified election for non-filing estates | 2:22 | High | H |
| F23 | Token economics taught in per-token dollars to a cohort on flat-rate $20/month Pro subscriptions, with no bridge to the resource they actually spend (rate limits and usage caps) | 1:53 to 1:59, 2:41 to 2:56 | Medium | M |
| F24 | Named discussion block (20 min, locked vote → defence → re-vote) absent for the second consecutive session | absent | High | H |
| F25 | Zero decision rules observed firing across two sessions of polls | 0:13, 0:50, 2:00 | Medium | H |
| F26 | Wait-time improvement confined entirely to AI-mechanics content; zero gaps ≥3 s in both domain-expert blocks | 0:12 to 0:22, 2:19 to 2:32 | High | H |
| F27 | Narrow-funnel guess sequences: four consecutive single-answer questions | 0:37 to 0:41 | Medium | H |
| F28 | Question restatement before any learner can answer, at least four instances | 0:35, 0:36, 1:26, 2:41 | Medium | H |
| F29 | Syllabus states two different due dates for Final Project Part 1 (narrative vs schedule table) | syllabus | High | H |
| F30 | Prompt-template homework listed on the syllabus as due *before* Session 2; treated in class as due the day after, so its artifacts were unavailable as in-class material | 0:09 | Medium | H |
| **S01** | **Strength.** Grounding walkthrough: live citation chase through §2010(c)(5)(A) with the nesting-doll problem named, the publications-are-not-law distinction taught, and the instructor admitting up front he did not know the authority | 2:19 to 2:32 | — | H |
| **S02** | **Strength.** Prequestion contract executed and explained: "this is where I think it's good to get it wrong, because Claude is not some omniscient being" | 1:30 | — | H |
| **S03** | **Strength.** Three learner contributions visibly changed the session, each acknowledged aloud | 0:01, 0:12, 1:02 | — | H |
| **S04** | **Strength.** Call-on-the-distribution executed twice, correctly, including "that's not a rhetorical question" | 0:15, 2:01 | — | H |
| **S05** | **Strength.** Practitioner-grade example: the "I wasn't there" case-note anecdote, teaching what an AI notetaker cannot capture | 1:33 | — | H |
| **S06** | **Strength.** Uncertainty modeled aloud at least four times on live claims, which is 8+ behavior on D1 | 1:04, 1:28, 1:38, 2:20 | — | H |
| **S07** | **Strength.** Correct and conservative compliance guidance on the new connectors, given on the day of release | 0:28 | — | H |
| **S08** | **Strength.** Three-cups probability poll: a clean prediction-before-reveal that produced the session's best conceptual payoff | 2:00 to 2:03 | — | H |
| **S09** | **Strength.** 26 elicitations answered, 6 of ~8 learners voicing. Voluntary participation rate is well above this reference population | whole session | — | M |

### 2.2 Strengths and Weaknesses Matrix

| | **High impact** | **Lower impact** |
|---|---|---|
| **Strength** | Grounding and verification pedagogy (S01, S02, S06). Andragogy and contribution reuse (S03, S05, S09) | Call-on-the-distribution (S04). Compliance instinct on connectors (S07) |
| **Weakness** | Allocation: 26% of minutes on designated content (F06, F12, F03, F04). Absent structure: no objective, no bridge, no ritual, no closing check, no silent work (F01, F02, F10, F24). Orphaned Learning Objective (F15). No-client-data rule not restated at assignment (F08) | Two content corrections (F21, F22). Poll configuration (F13). Reading attribution (F09, F19, F20) |

### 2.3 Stop, Start, Continue

**Stop**

1. **Stop opening on administration.** 9.7 minutes of Canvas and file-format troubleshooting at 0:02 is the highest-value real estate in the session spent on the lowest-value content. Post the answers in Canvas; open with the bridge and take admin questions at the break.
2. **Stop re-teaching model tiers and cost.** Across two sessions this material has now consumed roughly 60 minutes. It appears in the Session 1 topic list only. It should not appear again in Sessions 3, 4 or 5 except as a retrieval item.
3. **Stop running a 50-minute block without a commitment device.** The rule from PEDAGOGY §4 is 12 minutes. The observed maximum is 70.
4. **Stop using 1:1 troubleshooting time during class.** Offer a standing 15-minute pre-class window (5:45 to 6:00 PT) and say so every week.

**Start**

1. **Start with the retrieval bridge and the prompt ritual, in that order, before anything else.** See FS-1.
2. **Start stating one objective before minute 10 and checking it in the last five.** Third session in a row this is the recommendation. See FS-3.
3. **Start converting one narrow-funnel question per block into a committed poll with a written decision rule.** See FS-2.
4. **Start restating the no-client-data rule every time the final project is discussed.** One sentence. It is the exposure the course exists to teach.

**Continue**

1. **Continue the grounding walkthrough format.** Do it again in Session 3 with a document-retrieval example rather than a statute, because that is where Session 3's principle lives.
2. **Continue saying uncertainty out loud.** The four hedges in this session are the behavior the course is trying to install, modeled in public.
3. **Continue calling on the distribution** and continue saying "that's not a rhetorical question."
4. **Continue treating learner contributions as content.** Three instances in one session is exceptional and is the reason D5 holds at 8.

### 2.4 Focus Skills and Feed-Forward

All three Session 1 focus skills are unmet or partially met, so all three roll forward. No new skills are added; the cap is three. Two are re-specified against what Session 2 measured.

---

**FS-1 (carried from S1-FS3, re-specified). Open the session with the bridge and the ritual, before any content or administration.**

*Why this one first:* it simultaneously fixes F01, F02, F14 and F30, and it is the only change in this list that costs zero net minutes, because it displaces the admin block rather than adding to it.

- **Observable behavior:** within the first 12 minutes, four ungraded retrieval items are posed and answered in chat, and the ritual prompt is issued.
- **Success criterion:** first retrieval item before 0:05:00; chat responses from ≥75% of attendees within 6 minutes; ritual prompt issued and at least four prompts pasted.
- **How the next review measures it:** timestamp of the first retrieval item; chat log line count divided by attendance within 6 minutes of the prompt. **Export the Zoom chat log for Session 3; this criterion cannot be checked without it.**

*Before, 0:02:20:* "Before I get into kind of my more prepared items, I know a lot of you did reach out to me with questions… any questions that anybody had they want to get addressed today or anything outstanding to cover?" (9.7 minutes of Canvas troubleshooting follows.)

*After:* "Four questions, three minutes, ungraded, no looking anything up. Type your answers in chat. One: name the four things Claude receives every time you press send, besides your prompt. Two: you have a client's brokerage export and you want a concentration analysis. Which tier, and why. Three: what does temperature change, and what does it not change. Four: what is the one thing you must do before an AI citation goes into a client email. Now, second thing: paste your last prompt into chat, verbatim, typos included. Canvas and file-format questions, hold them for the break."

---

**FS-2 (carried from S1-FS2, sharpened by the confirmed diagnosis). Gate questions in your fluent domains specifically, and convert one narrow-funnel question per block into a committed poll.**

*Why sharpened:* Session 1 predicted the gate would collapse in the planning material, and Session 2's gap distribution confirms it exactly: 0.57 gaps ≥3 s per minute in the next-token block, 0.00 in the grounding block, 0.00 in the fee block. A global habit target has now failed once. Pre-marking specific questions is the remedy Session 1 already specified.

- **Observable behavior:** before class, mark three questions in the planning or fee material as gated. Ask each once. Say nothing for four seconds. Separately, fire at least four polls, each with its decision rule written before class.
- **Success criterion:** ≥3 gaps of ≥3 s **inside domain-expert blocks** (baseline: 0); ≥15 gaps ≥3 s session-wide (baseline 13); ≥4 polls fired; for each poll, the distribution is read aloud and the branch is either taken or declined aloud; **no gap above 20 minutes between whole-room commitment devices** (baseline 70).
- **How the next review measures it:** VAD gap distribution segmented by block, same method as 1.5.3; poll report for fired-over-designed and distributions; longest-gap-between-commitments computed from the transcript.

*Before, 0:40:* "What else can I change about this prompt before I send? Max out the effort to? Yes. And I probably wouldn't max out the effort for this one."

*After (poll, with rule):* "Poll. You are writing a client email explaining a backdoor Roth. Which single change most improves the answer? (a) raise the model tier (b) raise the effort setting (c) turn on research (d) add a format specification. **Decision rule: if ≥50% pick (a), spend the next six minutes on effort and format, not on tiers, because tiers are the lever they already reach for.**"

---

**FS-3 (carried from S1-FS3's second half). State one objective before minute 10; close with a check at the matching Bloom tier.**

*Why it stays:* unmoved across two sessions. It is also the precondition for D7 ever exceeding 5, because a closing check with no objective has nothing to check against.

- **Observable behavior:** one objective sentence before 0:10:00, referenced again in the final five minutes with a check that produces answers rather than silence.
- **Success criterion:** timestamped objective utterance before 0:10:00; a closing check that produces ≥5 written responses; the check's Bloom tier matches the objective's verb (an "evaluate" objective is not checked by a "remember" question).
- **How the next review measures it:** timestamps, response count from the chat log, Bloom comparison.

*Before, 2:57:* "Any outstanding questions, anything else that I covered here today in session two that you would want to clarify or discuss." (Silence, then close.)

*After, open:* "One objective tonight: by 9 p.m. you will be able to decide which parts of a client meeting you can hand to a tool and which you cannot, and say why for each."
*After, close:* "Objective check, in chat, one line each: name one step of your own meeting workflow you would hand to a tool tonight, and one you would not, and give the reason for the second one."

---

**The largest finding not carried as a focus skill** is F15, the orphaned Learning Objective, because focus skills are behaviors and this is a curriculum defect. It is handled structurally in the Session 3 plan supplied separately in chat, and it requires a decision from you, not a habit change.

### 2.5 Red Team

**Three strongest counterarguments to this review.**

1. **The rubric cannot see the session's actual highest-value output.** Roughly 46 minutes went to final-project scaffolding, which is 50% of the course grade and is the deliverable students are most likely to fail. No dimension rewards that. Under this instrument, teaching directly to the highest-stakes assessment reads as a D2 and D4 failure. If Session 3's Part 1 drafts come in strong, on-model, and with sensible tier choices, those 46 minutes bought the grade and the allocation finding is partly wrong. *Evidence that would flip it:* the quality distribution of the Session 3 draft submissions. I would revisit F05 and F06 if drafts are materially better than Session 1's homework predicted.

2. **Participation is hand-counted, and the count could be low.** The 26-elicitation figure and the six-learner voice count are floors derived by reading an undiarized transcript. If true learner talk share is 20% rather than the 10 to 12% my block sampling suggests, D4 moves to 6 and the total moves to roughly 53. *Evidence that would flip it:* a Zoom `.vtt` with speaker labels. **This is the single cheapest thing you can supply to improve the accuracy of every future review**, and it costs one checkbox in Zoom settings.

3. **The protocol may be the wrong instrument for an eight-person room.** PEDAGOGY's parameters (13 to 15 interactions, 20-minute discussion block, split-the-room) were written against a room of roughly twenty. At N=8 with 75% voluntary voice participation, responsive Q&A may genuinely dominate structured commitment devices, and the 70-minute gap may be less costly than it looks. *Counter-evidence:* Deslauriers et al. (2019) cuts the other way. A room that participates readily and reports the session went well is not evidence that it learned more, and the six learners who did not speak during the 70-minute gap left no trace either way. **That is exactly the population a commitment device exists to measure.**

**Likeliest failure mode of this improvement plan.** FS-1 is the one that fails, and it fails by arithmetic rather than by will. Session 3 already carries eight of its own syllabus topics, plus two debts from Session 2 (the seven-step delegation framework and the interview rewrite), plus the two content corrections, plus a homework debrief. Adding 12 minutes of opening ritual to a session that is already over-subscribed reproduces Session 2's overrun one week later, and the first thing to be cut under time pressure will be the same thing that was cut this week. **The mitigation is in the Session 3 plan: one Session 3 topic moves to Session 4 before the session is built, not during it.**

**Evidence that would flip parts of this verdict.**
- A Zoom `.vtt` with diarization: D4 and D6 both become properly measurable; D4 could move to 6.
- `session-2.html`: D3 becomes fully scorable and the designed-versus-fired interaction ratio becomes real rather than a floor. If the file shows 13 to 15 designed interactions of which 10-plus fired, D4 moves to 6 and D3 likely moves.
- The Zoom poll report: if decision rules did fire and were simply inaudible, F25 dissolves and D7 moves to 6.
- Confirmation that the claude.ai Research toggle is tier-gated: C08 resolves to Correct and the model-selection item stands as written.

### 2.6 Trend Tracking

Two comparable data points. Session 1, 2026-08-31, and Session 2, 2026-09-14.

| Dimension | S1 | S2 | Delta | Note |
|---|---|---|---|---|
| D1 Content accuracy | 4 | **5** | **+1** | 3 Incorrect claims → 1. Real, and the direct result of S1-FS1 |
| D2 Organization | 5 | **4** | **−1** | See below |
| D3 Cognitive load | 5 | 5 | 0 | Both half-inferred; no lesson file either time |
| D4 Engagement | 5 | 5 | 0 | Polls 2 → 3; still zero silent work both sessions |
| D5 Andragogy | 8 | 8 | 0 | Held on three fresh instances. The course's consistent strength |
| D6 Delivery | 4 | **5** | **+1** | Gaps ≥3 s: 8 → 13, +59% |
| D7 Checks and feedback | 5 | 5 | 0 | Feedback quality is 7-level; decision rules still never fire |
| **Total** | **49.5** | **51.5** | **+2.0** | |

**The D2 regression, stated honestly.** Part of it is not a fair comparison: the retrieval bridge is a criterion that could not apply to Session 1, so Session 2 had one additional way to fail. The part that is a fair comparison is real: 62.9% of Session 2 elapsed before its own material opened, which has no Session 1 analogue. Label the delta **M**.

**Recurring findings (present in both sessions):**
- No stated objective, no closing check. Now two for two. *(S1 top finding 3, S2 F10, F15.)*
- Zero silent-work intervals.
- No decision rule has ever fired.
- Named discussion block: 0 minutes across 2 sessions, against a protocol target of 40.
- Wait-time collapse in fluent domains, now measured and localized rather than merely observed.

**Resolved or materially improved:**
- Incorrect claim rate: 3 → 1, and no Blocking content finding this session (S1 had one, the watermark-traceability claim).
- Wait time session-wide: +59% on gaps ≥3 s.
- Polls fired: 2 → 3.
- Live uncertainty modeling: now a consistent, repeated behavior rather than an occasional one.

**Focus-skill status:**
- S1-FS1 (verification pass): **partially met.** Criterion was zero Incorrect verdicts; one remains. Rolls forward, narrowed, inside FS-2's pre-class prep.
- S1-FS2 (three-second gate): **partially met.** 13 gaps ≥3 s against a criterion of 15, and none in the domains that needed it. Rolls forward, sharpened.
- S1-FS3 (objective and closing check): **not met.** Neither half occurred. Rolls forward unchanged.

---

## Session Record

```
SESSION RECORD
session_id: AIFFA-S2-2026-09-14
course: AI Foundations for Financial Advisors (UC Berkeley Extension), BUS ADM X433.4
date: 2026-09-14
duration_min: 178.0
materials: ASR transcript (faster-whisper small.en, no diarization, 3324 segments, 26895 words); transcript_type: ASR-verbatim. PEDAGOGY.md v1.0 and syllabus via project knowledge. No lesson HTML, no chat log, no poll report.
objective: NONE STATED. Inferred (M) from the syllabus Session 2 row: practical AI usage in advisory workflows, prompting frameworks, temperature, and verification of tax research against primary authority.
scores: D1=5 D2=4 D3=5 D4=5 D5=8 D6=5 D7=5 total=51.5/100
lowest_dimension: D2
metrics: wpm=NA(no diarization) filler_per_100=0.81(lexical floor) talk_share=NA genuine_questions=26 answered by a learner (hand-counted, floor) median_wait_s=NA; VAD gaps >=3s = 13 in 178 min (S1: 8 in 174), gaps >=5s = 0 longest_monologue_min=NA longest_gap_between_whole_room_commitments=70min interactions_fired=3 whole-room commitments + 26 verbal elicitations + 0 silent-work intervals / designed unknown polls_fired=3/unknown
top_findings:
  1. Blocking - Learning Objective "evaluate where AI-assisted analysis fits the seven-step planning process" received 0 minutes and has no slot in S3-S5 (F15)
  2. High - only 26-30% of 178 minutes landed on designated Session 2 topics; 62.9% elapsed before the Session 2 file opened (F06, F12)
  3. High - Final Project Part 1 assigned with no restatement of the no-client-data rule (F08)
focus_skills_active:
  1. Open with retrieval bridge + prompt ritual before any content or admin | criterion: first retrieval item before 0:05:00, >=75% chat response within 6 min, >=4 prompts pasted | measure: timestamp + chat-log count / attendance (requires chat log export)
  2. Gate questions in fluent domains; convert one funnel question per block into a committed poll with a written decision rule | criterion: >=3 gaps >=3s inside domain-expert blocks (baseline 0), >=15 session-wide (baseline 13), >=4 polls fired with branch taken or declined aloud, no gap >20 min between whole-room commitments (baseline 70) | measure: VAD gap distribution by block + poll report + longest-gap computation
  3. State one objective before 0:10:00; close with a check at the matching Bloom tier | criterion: timestamped objective utterance, closing check producing >=5 written responses, Bloom tier match | measure: timestamps, chat-log response count, Bloom comparison
focus_skills_resolved: none. S1-FS1 partially met (3 Incorrect -> 1). S1-FS2 partially met (8 -> 13 gaps >=3s, criterion 15). S1-FS3 not met.
instrument_changes: none. Rubric, weights and anchors identical to Session 1.
confidence_overall: M - ASR transcript with no diarization suppresses talk share, WPM, monologue length and own-answer rate; no lesson file suppresses half of D3 and the designed-interaction denominator; no poll report suppresses decision-rule verification.
```
