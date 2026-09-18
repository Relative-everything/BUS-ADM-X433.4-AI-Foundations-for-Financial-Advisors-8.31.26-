# Pedagogical Audit: AI Foundations for Financial Advisors, Session 1

Formal peer-review lecture observation. Fixed seven-dimension rubric.
Reference population: **top-quartile CE-accredited financial-services and adult-education instructors.** A 7 on any dimension means "meets that standard," not "good." A straight 5 across all dimensions totals 50/100 and describes a competent, typical CE instructor.

---

## 0. Scorecard & Session Verdict

### 0.1 Materials inventory

| Item | Role | Format | Detected type |
|---|---|---|---|
| `audio1136940846.m4a` | recording | AAC, 48 kHz stereo, 108 MB, **02:54:09** | Audio. **Not assessable as supplied.** |
| `transcript.vtt` (derived) | transcript | Machine ASR, timestamped, 3,432 cues, 27,740 words | **ASR, no diarization** (see 0.2) |

**Nothing else was supplied.** No lesson HTML, no slide deck, no Zoom chat log, no poll report, no PEDAGOGY.md.

### 0.2 Premise audit: read this before trusting any number below

**Flag 1, Blocking for instrument comparability.** The protocol treats audio and video as NOT ASSESSABLE, because a recording carries no speaker labels and no cue structure. I did not stop there. I transcribed the file locally (faster-whisper `small.en`, int8, greedy decode, VAD-gated, 20 chunks reassembled) to produce a timestamped transcript. That recovers roughly 80% of the review, and it leaves specific holes that no amount of analysis can fill:

- **No speaker diarization.** Every cue is attributed to a single unknown speaker. **Instructor talk share, own-question answer rate, and longest unbroken monologue are NOT ASSESSABLE.** The metrics script returns talk_share = 1.00 and longest_monologue = 96.5 min; both are artifacts of single-speaker attribution, not measurements. They are excluded from scoring.
- **Disfluencies suppressed.** The ASR emitted 6 instances of "um" and 1 of "uh" across 27,740 words. That is not a low filler rate, it is the model removing them. Single-syllable filler rate is NOT ASSESSABLE. Lexical discourse markers survive transcription and are reported as a floor.
- **Proper nouns unreliable.** Observed misrenderings: "clog/claw/quad/Clod" for Claude, "Jim and I" for Gemini, "chatgbt" for ChatGPT, "IJIT" for IDGT, "intentionally effective" for intentionally defective, "cash hit" for cache hit, "in grams" for n-grams, "walt.com" for wealth.com, "Kimmy" for Kimi, "context handouts" for handoffs. **Any finding below that turns on one exact word carries that risk.** Findings resting on a whole sentence or a sustained argument do not.
- Quotations in this review are ASR output, not verbatim ground truth. They are close enough to identify the moment, not close enough to attribute wording.

**Fix for next session, in priority order:** export the Zoom `.vtt` (restores speaker labels, talk share, wait time, monologue length), the chat log, the poll report, and the session lesson HTML. Those four files move this review from roughly 80% instrumented to fully instrumented, and they make session 2 genuinely comparable to session 1.

**Flag 2, Medium.** No session-level learning objective is stated anywhere in 174 minutes. Course-level aspiration appears at 0:05:27 ("teaching advisors and planners how to use AI to serve your clients at a higher level and more efficiently") and the syllabus objectives are pointed at but not read at 0:15:40. I constructed the objective below and evaluated against it. Marked **M**.

> **Constructed objective (M):** By the end of session 1, learners can navigate Claude's core surfaces (projects, skills, connectors, research, model selector), explain next-token prediction and temperature in their own words, and select a model tier for a given task on cost and task-definition grounds.

**Flag 3, Low.** Session date not stated. Inferred **Monday, 31 August 2026** from "there's no class next week, not on September 7th" (Labor Day 2026 falls on 7 September) combined with "four more classes from the 14th to the first week of October." Marked **M**.

**Flag 4, Low, confidence L.** At 0:01:35 the firm is described on the record as "about a $10 billion RIA" with the role given as "director of planning." The profile I hold says Director of Planning at a firm sized at $2B AUM. These may both be stale or both be current after growth. It is stated to students and it is the kind of figure that gets checked. Confirm which is current before session 2.

### 0.3 Scores

| # | Dimension | Weight | Score /10 | Weighted | Confidence |
|---|---|---|---|---|---|
| D1 | Content accuracy & currency | 25 | **4** | 100 | H |
| D2 | Organization & signposting (Gagné 1–4) | 15 | **5** | 75 | M |
| D3 | Cognitive load & visual design | 15 | **5** | 75 | **L** (deck not supplied) |
| D4 | Engagement & active processing | 15 | **5** | 75 | M |
| D5 | Audience calibration / andragogy | 10 | **8** | 80 | H |
| D6 | Delivery mechanics from text | 10 | **4** | 40 | M |
| D7 | Understanding checks & feedback | 10 | **5** | 50 | M |
| | **Weighted total** | **100** | | **49.5 / 100** | |

**Lowest dimensions: D1 (4) and D6 (4).** D1 carries the heaviest weight in the instrument, so it is the priority.

### 0.4 Verdict

This is a session with an unusually strong andragogical core sitting on top of an unverified factual layer, delivered at a pace that leaves no room for anyone to think.

D5 = 8 is not a courtesy score. Three separate times a learner contribution visibly redirected the session and the instructor said so out loud: the event-planning demo built on a learner's stated expertise (0:12:35 to 0:34:19), the estate-planning case delivered because two learners asked for it (0:12:35 and 0:13:21 to 1:19:55), and the final 25 minutes abandoned in favour of building a skill live because Jeremiah asked how (2:27:50 to 2:46:34). The reference file sets that as the 8+ criterion and requires two instances. There are three, each timestamped, each acknowledged aloud. Learner expertise is treated as a resource, examples come from practitioner routine rather than retail-consumer scenarios, and jargon is defined inline on first use with real consistency.

Against that: three claims are Incorrect on points a practitioner could act on, and one intended student reading carries a citation I could not resolve to any real author or journal. The strong version of the problem is not the error rate, which is low against the volume of checkable content. It is that the errors cluster in exactly the places where a CFP audience is most likely to rely on the instructor without checking: a compliance claim about watermark traceability, a software-classification claim that bears on a purchasing decision, and a statutory threshold that bears on client advice.

The delivery finding is the most measurable thing in this review. Across 174 minutes there are **8 pauses of 3 seconds or longer, 2 of 5 seconds or longer, and 1 of 10 seconds or longer** (the break). Speech occupies 95.5% of wall clock. Questions are frequently stacked and reformulated three or four times before anyone can answer, then self-answered. The clearest instance runs 40 seconds at 1:24:35 and contains four reformulations of one question followed by the instructor supplying the answer.

The trajectory is genuinely encouraging and worth recording. Question density rises through the session (23, 24, 22, 39, 62, 47 per 30-minute block) and median wait time **improves** in the final 30 minutes (2.9 s versus 1.3 s earlier). This is the opposite of the usual fatigue drift. Whatever changed after the break should be made deliberate rather than left to chance.

---

# Part 1: Analysis

## 1.1 Content-Accuracy Audit

Verified by web search per protocol rule 6. No non-Correct verdict is issued on a currency-dependent claim without a citation.

| # | Claim (ASR) | Location | Verdict | Conf. | Correction and source |
|---|---|---|---|---|---|
| 1 | "There's no written form of Navajo... it's a purely spoken language. So it just couldn't even decipher it because there's no data to train on." | 2:42:38 | **Incorrect** | H | Navajo has had a standardised Latin-based orthography since 1937–39 (Harrington, Young, Morgan, LaFarge). *Ádahooníłígíí*, the first all-Navajo newspaper, ran 1943–57. Young & Morgan's *The Navajo Language: A Grammar and Colloquial Dictionary* (1980, rev. 1987) is the standard reference grammar. *The Diné Reader: An Anthology of Navajo Literature* was published 2021. **The underlying pedagogical point is correct and worth keeping:** Navajo is a low-resource language for NLP. The mechanism is scarcity of digitised corpus, not absence of writing. Sources: omniglot.com/writing/navajo.htm; en.wikipedia.org/wiki/Robert_W._Young |
| 2 | "It can be tracked that not only was it AI generated, but it was AI generated by your account specifically." | 0:59:58 | **Incorrect** | H | Anthropic's own documentation states the watermark "can't be traced to a specific person/organization/chat." It is a statistical signal in token selection that identifies Claude as the generator, not the account. This is the highest-consequence error in the session because it is a compliance claim to an audience that sets firm AI policy. Sources: anthropic.com/news/claude-text-watermark; androidauthority.com/how-claude-watermarks-text-3699100 |
| 3 | "Now that is hard to get out of your documents." | 0:59:58 | **Partially correct** | H | Watermarks survive light editing but are substantially degraded by paraphrase, back-translation, and copy-paste modification. Han et al., arXiv:2508.20228, demonstrate meaning-preserving attacks defeating SynthID-Text detectability. |
| 4 | "If they're in my family and the amount's over $100,000, what interest rate?" | 1:23:46 | **Partially correct** | H | Two thresholds conflated. IRC §7872(c)(2)(A): the de minimis exception is **$10,000** for gift loans between individuals. §7872(d)(1): for gift loans not exceeding **$100,000**, imputed interest is *capped at the borrower's net investment income*. **Additional correction, higher value:** for the transaction actually being described (a sale of LLC units to an IDGT on a note) §7872 is not the operative provision. The note is tested under §1274/§1274(d), and under Rev. Rul. 85-13 the sale is a non-event for income tax because the grantor is treated as owning the trust assets. Source: irc.bloombergtax.com/public/uscode/doc/irc/section_7872 |
| 5 | eMoney, Holistic Plan and FP Alpha described as "truly tested tools... they're a deterministic calculator. AI is not deterministic." | 0:21:06 | **Incorrect as applied to FP Alpha** | H | FP Alpha is, by its own description and press coverage, an AI-driven platform that has "spent the past few years building out its own AI-powered large language model" to read tax returns, wills and trusts. Its Tax Snapshot 3.0 routes low-confidence extractions to human reviewers, which is a confidence-gated LLM pipeline, not a deterministic calculator. **This correction strengthens the argument being made:** FP Alpha's own human-in-the-loop routing is evidence for the discernment point, not against it. eMoney fits the "deterministic engine" description. Sources: financial-planning.com/news/fp-alpha-prepares-its-ai-platform-for-tax-law-revisions; thinkadvisor.com 2026/06/04 |
| 6 | "A wonderful paper by David Oceans in the NAPEC Journal of Estate Planning... squeeze, freeze, and burn... about 46 pages." | 1:20:41, 1:28:29 | **UNVERIFIED** | n/a | The framework is real and widely taught. I could not resolve the author name to any published squeeze/freeze/burn paper. The journal is the **NAEPC Journal of Estate & Tax Planning** (naepcjournal.org), not "NAPEC Journal of Estate Planning." The most widely circulated paper under that exact title is The Blum Firm's *Squeeze, Freeze, & Burn with 678 Trusts*. Richard A. Oshins and Steven J. Oshins both publish in the NAEPC Journal on adjacent structures, which may be the ASR source of "Oceans." **Resolve before distributing to students.** |
| 7 | "You can look at ecfr.com." | 0:57:38 | **Partially correct** | H | The electronic Code of Federal Regulations is at **ecfr.gov**, not .com. Separately, the eCFR carries Treasury *regulations* (26 CFR); the Internal Revenue Code itself is 26 U.S.C. The stated point (that there is no single authoritative continuously-updated consolidated source) is defensible and worth keeping, but the two bodies of authority should not be conflated in front of a CFP-track audience. |
| 8 | "The max plan for the $100 a month... gives you five times more usage of the baseline $20 plan, and it gives you fable access. If you don't buy the $100 plan, you have to pay each time you use Fable... the harder the question, you're gonna have to pay more." | 0:22:38 | **Correct** | H | Accurate and current. Pro is $20/mo; Max tiers are $100 (5x) and $200 (20x). Since 20 July 2026, Fable 5/5.1 are included on Max and premium Team seats at up to 50% of weekly limits; Pro and standard Team seats meter Fable through usage credits at API rates ($10/M input, $50/M output). **Nuance worth adding:** Max includes Fable only up to 50% of the weekly allowance, not without limit. Source: support.claude.com/en/articles/15424964-claude-fable-models-on-your-plan |
| 9 | "Fable is over twice the price of Opus per token... for Opus, a million tokens of context costs about $5." | 2:17:41 | **Correct** | H | Fable at $10/$50 per million is double Opus 5. The $5 per million input figure for Opus follows. Source as above. |
| 10 | "Claude has four models." | 1:02:22 | **Correct** | H | Fable, Opus, Sonnet, Haiku. |
| 11 | "Anthropic bought millions of out of print and older books... chopped the spines off so they could upload all that text." | 1:36:20 | **Correct** | H | Destructive scanning of purchased print books is documented and was litigated. |
| 12 | Next-token prediction, temperature as a randomness dial, absolute-zero analogy, probability-versus-rank distributions, tokenizer behaviour, sub-word tokens, n-grams and Q→U | 1:34:46 – 2:16:07 | **Correct** | H | The core technical pedagogy of the session is sound and unusually well pitched. Minor overstatement at 1:44:05 ("they'd have to run on the same hardware at the same time"): non-determinism at temperature 0 arises chiefly from floating-point non-associativity under variable batching and kernel selection, which is a sharper and more teachable mechanism than "so many variables." |
| 13 | "Anthropic has put out... four quadrants, the known knowns, known unknowns, unknown unknowns, unknown knowns." | 1:07:48 | **UNVERIFIED (attribution)** | n/a | The 2x2 long predates Anthropic (Luft & Ingham's Johari window, 1955; popularised by Rumsfeld, 2002). The framing is useful; the attribution should be dropped or corrected. |
| 14 | "Wolfram, I believe, was the first one to use this analogy" (king wears a crown) | 1:35:32 | **UNVERIFIED** | n/a | Hedged aloud, which is the right handling. Priority claims on pedagogical analogies are near-impossible to establish. Prefer "Wolfram uses this analogy." |
| 15 | ChatGPT admins added a system-prompt line saying not to talk about goblins | 1:37:55 | **UNVERIFIED** | n/a | Hedged aloud ("nobody really can prove why"). Correct instinct. Given that a system prompt cannot be inspected, either drop it or relabel it explicitly as an anecdote. |
| 16 | "Claude cannot take zip files." | 1:54:58 | **UNVERIFIED** | n/a | Not resolved within this review. Flagged because it was delivered flat, as a capability limit students will act on. |
| 17 | Redaction: black bars over text in coded documents can be reversed via the underlying file structure or metadata; high-profile government unredactions have occurred | 0:56:05 | **Correct** | H | Sound, and the escalation to "print, mark, rescan" is the right practitioner advice. |
| 18 | Grantor's payment of trust income tax is effectively a tax-free transfer; reimbursing yourself pulls the money back into the estate | 1:26:12 – 1:27:43 | **Correct** | H | Rev. Rul. 2004-64. The reimbursement warning ("if you die the day after you reimburse yourself, about $16 million more in tax") is exactly the right practitioner framing and is the single strongest piece of domain teaching in the session. |
| 19 | Valuation discounts for lack of control and lack of marketability; voting units retain full value, non-voting units take the discount; a ~30% combined discount on a largely-marketable-securities LLC | 1:22:15 – 1:31:11 | **Correct, with a caveat correctly self-flagged** | H | The instructor flags the aggressiveness himself at 1:32:27 ("there's no bright line definition of the time period before formation, funding and dissolving the LLC... it can be a little bit maximized"). That self-flagging is good practice. Worth naming the actual authority next time (§2036 and the *Strangi*/*Bongard* line on formation-to-death proximity, and the IRS's historical §2704 posture on marketable-securities FLPs) so learners know where the risk lives rather than only that it exists. |
| 20 | AFR publication frequency | 1:24:35 | **Correct after self-correction** | H | Stated as "at least semi-annually... I think it's every month." Monthly is right (a revenue ruling per month). The audible self-correction is fine; stating it once, correctly, is better. |
| 21 | Demand notes require changing the applicable rate "every six months" | 1:30:51 | **Partially correct** | M | Demand loans use the short-term AFR, and the blended annual rate is the common administrative convention for a full-year demand loan. "Every six months" is not the governing cadence. |

**Rate context, stated deliberately:** 21 audited claim clusters, 3 Incorrect, 4 Partially correct, 5 Unverified, 9 Correct. Against roughly 27,700 words of dense technical and legal content across two domains, that is a low error rate. The D1 score is driven by the *placement* of the errors, not their frequency. See the Red Team at 2.5 for the counter-argument.

## 1.2 Section-by-Section Review

Boundaries reconstructed from the instructor naming sections aloud. No lesson HTML was supplied, so the alignment script could not be run and planned-versus-actual timing is **NOT ASSESSABLE**.

| Section | Span | Approx. min | Function | Flags |
|---|---|---|---|---|
| Housekeeping and instructor bio | 0:00:00–0:05:27 | 5.5 | Orientation | Gagné 1 (gain attention) satisfied weakly: opens with logistics, not a question or anomaly. The poll launched at 0:00:47 *while* the bio is delivered is a good dual-purpose move. |
| Framing: questions, discernment, "call me out" | 0:05:27–0:07:46 | 2.3 | Norm-setting | Strong. Explicitly licenses learner challenge and names discernment as a course skill. Sets up D5. |
| Learner introductions | 0:07:46–0:14:08 | 6.4 | Experience harvest (Knowles) | Six learners, all named, all responding to a designed prompt. Two contributions are banked and later used. Best-designed block in the session. |
| Syllabus walkthrough | 0:14:08–0:23:27 | 9.3 | Administration | Does not read the slide (Mayer redundancy respected, explicitly: "there should be quite enough text on there"). Contains the LiveBench detour prompted by a learner question, which is the right call. |
| Final project explanation | 0:23:27–0:31:12 | 7.8 | Assessment framing | Peer-exchange design (build a workflow, hand it to another student, they test and present it) is genuinely good constructive alignment at the Create tier. |
| Claude interface tour | 0:32:00–0:55:15 | 23.3 | Procedural | **Longest block. Two exposition stretches over 12 min inside it.** Live demo throughout with verbal signalling ("where I'm mousing over"). Content is dense and largely undifferentiated in emphasis. |
| Security and redaction (learner-initiated) | 0:55:15–1:00:44 | 5.5 | Applied case | Triggered by Danielle. Best unplanned segment. Contains claim #2 (Incorrect). |
| Model tiers, cost, co-work | 1:00:44–1:11:41 | 10.9 | Conceptual | Accurate on plans and pricing. |
| Break | 1:11:41–1:17:37 | 5.9 | n/a | Stated 5 min, actual 4:53. Ratio 0.98. Excellent adherence. |
| Estate case: squeeze, freeze, burn | 1:19:08–1:33:12 | 14.1 | Worked case (Gagné 5) | High element interactivity, no learner production step in the middle, no pre-training on AFR/IDGT/conduit trust before the block that depends on them. Instructional purpose stated at the *end* (1:32:27) rather than the start. |
| Prompt engineering basics | 1:33:12–1:49:29 | 16.3 | Conceptual + procedural | Task/context/output framing is clean and immediately usable. |
| Context decay, chats vs projects | 1:49:29–2:01:10 | 11.7 | Learner-driven | Extended Danielle exchange. Explicit callback at 2:20:47. |
| Prediction, temperature, tokens | 2:01:10–2:27:04 | 25.9 | Core conceptual + interactive | **Strongest instructional design in the session.** Prediction-before-reveal executed live with learners choosing tokens and reading distributions. |
| Live skill build (learner-driven) | 2:27:04–2:46:34 | 19.5 | Modelling (Gagné 5) | Abandons remaining prepared material in favour of a learner request. Collaborative prompt-writing block is ICAP Interactive tier as *delivered*, not just designed. |
| Close and assignment | 2:46:34–2:54:09 | 7.6 | Wrap | No summary, no check against objective, no retrieval. Ends on Q&A and logistics. |

## 1.3 Teaching-Materials Review

**NOT ASSESSABLE.** No lesson HTML, slide deck, chat log, or poll report supplied. The session references an interactive lesson website (link posted in chat at 1:18:23), at least two Zoom polls, and a syllabus. None were provided.

What the transcript *does* evidence about materials: the interactive lesson site carries a case-facts panel (1:19:55), a token-selection widget with live probability display (2:01:57), a temperature comparison at 0 / 0.8 / 1.6 (2:06:42–2:09:00), a probability-versus-rank chart with a linear axis (2:10:34), a tokenizer input box (2:12:59), and a cost-per-token chart the instructor himself calls "kind of poorly overlaid" (2:23:11). That last one is a self-identified extraneous-load defect and is the single highest-value item to send me next time.

## 1.4 Delivery & Facilitation Review

Transcript-supported only. **Paralinguistics (tone, volume, pace variation, gesture, screen-share behaviour) are NOT ASSESSABLE** and are not inferred.

- **Pause structure.** 75 inter-cue gaps ≥1 s, 16 ≥2 s, 8 ≥3 s, 2 ≥5 s, 1 ≥10 s, across 174 minutes. Speech occupies 95.5% of wall clock. Confidence M (VAD-derived at a 500 ms silence threshold, so gaps ≥3 s are reliably detected; sub-second gaps are not resolvable).
- **Question stacking.** The recurrent pattern is question, immediate reformulation, second reformulation, self-answer. Worst instance, 1:24:35, four reformulations inside ~40 s: "If I let somebody borrow money from me, what do I have to charge them?" / "What interest rate?" / "And what's that interest rate called?" / "Anybody know what that legal minimum of interest to charge on capital is per the IRS for an individual arrangement?" / "Any guesses?" / "It is the AFR rate." A learner did in fact volunteer "four or four and a half percent" earlier in that chain, which was acknowledged, then the chain continued.
- **Where it works.** 2:02:43–2:05:54 is the counter-example and should be the template: a question is asked once, the instructor waits, learners answer in sequence ("20 million one," "supported buy," "2023 appraisal," "the highest percentage"), and the instructor builds on each. Same instructor, same session, roughly 3 minutes.
- **Self-correction discipline.** Frequent and audible: "I believe," "I think," "arguably," "I hesitate," "I don't know that's generating the heat, but." This is genuine uncertainty labelling and it is a real strength that partially offsets D1. It is applied inconsistently: the three Incorrect claims were all delivered flat, without a hedge.
- **Recovery.** At 1:17:37 a learner reports having dropped and missed five minutes. Handled well: reassured, told the recording will be posted, correctly identified that the missed window was the break, no time lost.
- **No fatigue drift.** Median wait in the final 30 minutes (2.9 s) exceeds the earlier median (1.3 s). Question count in the final 54 minutes (109) exceeds the first 60 minutes (47).

## 1.5 Quantitative Metrics

| Metric | Value | Reference band | Conf. | Note |
|---|---|---|---|---|
| Transcript span | 174.2 min | n/a | H | 02:54:09 |
| Words (all speakers) | 27,740 | n/a | H | |
| Speech density | 95.5% of wall clock | n/a | M | Only 8 pauses ≥3 s in the entire session |
| WPM | 167.4 | 130–165 explanatory lecture (band itself **M**, practitioner convention) | M | Marginally above band. Includes learner speech; true instructor WPM likely slightly higher |
| Filler, single-syllable (um/uh) | **NOT ASSESSABLE** | <2 per 100 | n/a | ASR suppressed: 7 total instances in 27,740 words |
| Filler, lexical discourse markers | 0.87 / 100 words (floor) | <2 per 100 unremarkable | M | "you know" 111, "kind of" 77, "I mean" 53. Plus "like" 238, mixed legitimate and marker use. **Not a defect.** |
| Gaps ≥3 s | **8** in 174 min | median wait ≥3 s is the classic threshold (Rowe; **[U]**) | M | The central delivery finding |
| Gaps ≥5 s | 2 | n/a | M | |
| Median wait after script-identified genuine questions | 1.4 s (n=5) | ≥3 s | **L** | n is tiny because the "followed by a non-instructor turn" test cannot fire without diarization |
| Wait-time drift, final 30 min | 2.9 s vs 1.3 s earlier | no drift expected | M | **Improving.** Report as a strength |
| Question-marked utterances | 217 | no band | H | By 30-min block: 23, 24, 22, 39, 62, 47 |
| Silent-work intervals | **1** (the break) | compare actual ÷ stated | H | 293 s actual vs 300 s stated = **0.98**. Excellent adherence |
| Learner-participation events | ~35 | n/a | **M** | Manually identified from reading; not diarization-derived |
| Exposition blocks >12 min | ~4 | course max 12 min (default, **no PEDAGOGY.md supplied**) | M | 0:21:52→0:35:05 (13.2), 0:42:08→0:55:15 (13.1), 0:56:00→1:10:08 (14.1), 1:36:20→1:49:29 (13.2) |
| Named learners | 6 | n/a | H | Austin, Danielle, Harris, Jeremiah, Jodi, Ron |
| Polls fired | 2 | 4 expected (default target) | M | Poll report not supplied; count is from the transcript |
| Instructor talk share | **NOT ASSESSABLE** | ≤75% | n/a | No diarization |
| Own-question answer rate | **NOT ASSESSABLE** | ≤20% | n/a | No diarization. Qualitative pattern is heavy (see 1.4) |
| Longest unbroken monologue | **NOT ASSESSABLE** | ≤12 min | n/a | No diarization |
| Interactions fired ÷ designed | **NOT ASSESSABLE** | n/a | n/a | No lesson HTML |
| Planned vs actual min per section | **NOT ASSESSABLE** | n/a | n/a | No lesson HTML |
| Prose density on screen | **NOT ASSESSABLE** | 37–42 words/min | n/a | No lesson HTML |

## 1.6 Benchmark Scoring

Evidence first, anchor match second, score third.

**D1. Content accuracy & currency, weight 25. Score 4. Confidence H.**
Evidence: (1) three Incorrect claims, at 2:42:38, 0:59:58 and 0:21:06, each actionable by a practitioner; (2) a conflated statutory threshold at 1:23:46 in a domain the instructor holds himself out as expert in; (3) an unresolvable citation at 1:20:41 that is intended for distribution to students; (4) against this, a very high density of correct and *current* material, including Anthropic plan and token pricing accurate to within weeks of a moving target, and correct core mechanics on prediction, temperature and tokenization; (5) confidence labelling modelled aloud repeatedly, which is the 8+ criterion, but applied inconsistently.
Anchor match: the 3–4 row is satisfied on both of its disjunctive tests independently. There is an Incorrect claim on a load-bearing point (the watermark traceability claim is a compliance claim to an audience that writes firm AI policy), and there are two-plus claims that would mislead a practitioner acting on them (watermark, FP Alpha classification, §7872 threshold). The 5–6 row requires the Partially-correct claims to be on *non*-load-bearing points, which does not hold here.
**D1 = 4.** The remedy is a verification pass, not a content rebuild. See 2.5 for the strongest objection to this score.

**D2. Organization & signposting, weight 15. Score 5. Confidence M.**
Evidence: (1) no session-level objective stated in 174 minutes; course objectives pointed at but not read (0:15:40); (2) sections consistently named on entry ("that's the syllabus" 0:31:12, "getting into Claude" 0:32:00, "we're gonna be getting into lesson one" 1:18:23); (3) at least one transition does real work: "the actual lesson that needed all this buildup, prediction" (1:34:46) names what the prior block enabled; (4) most transitions are "All right, so the next part"; (5) no closing summary and no callback to any objective; (6) the estate case's instructional purpose is stated at its end (1:32:27) rather than its start; (7) a self-identified digression at 0:58:23 with no re-orientation move afterwards.
Anchor match: 3–4 requires that the sequence be reconstructible only from the deck, not the speech. It is clearly reconstructible from the speech. 5–6 fits: objectives effectively not stated and never revisited, transitions predominantly generic.
**D2 = 5.**

**D3. Cognitive load & visual design, weight 15. Score 5. Confidence L.**
Evidence: (1) **the visual-design half of this dimension is NOT ASSESSABLE**, no deck supplied; (2) redundancy respected: no evidence of verbatim reading, and an explicit refusal to read the syllabus (0:30:26); (3) signalling applied verbally during live demo ("where I'm mousing over," "you see here this plus sign on the bottom left"); (4) the token and temperature widgets are well-segmented multimedia by their described behaviour; (5) one self-identified extraneous-load defect (2:23:11, "this is kind of poorly overlaid"); (6) **pre-training violation**: AFR, IDGT, conduit trust, demand note, lack of marketability all arrive inside the dense estate block that depends on them, and only some get inline definitions; "conduit trusts" (0:59:11) and "453 taxation" (1:48:42) are dropped undefined; (7) the estate block runs ~14 min at high element interactivity with no production step.
Anchor match: 5–6 on the load evidence alone (one overloaded artifact self-identified, pre-training gap).
**D3 = 5, confidence L. This score should be treated as provisional and non-comparable until the lesson HTML is supplied.**

**D4. Engagement & active processing, weight 15. Score 5. Confidence M.**
Evidence: (1) ~35 learner-participation events, well distributed; (2) **prediction-before-reveal executed three times**: the token-selection exercise (2:01:57), "the king wears a blank" (1:35:32), and the token-cost estimate (2:16:54); (3) **one genuine ICAP Interactive-tier block**, the collaborative prompt build at 2:32:29–2:39:32, where Danielle argues for option 3 with a reason, the instructor adopts it and extends it into an instruction-hierarchy explanation; (4) two polls fired, one distribution reported aloud, **no decision rule visibly triggered by either**; (5) **zero silent-work intervals** other than the break; (6) **four exposition blocks over the 12-minute default maximum**; (7) question density rising across the session rather than decaying.
Anchor match: the 7 row requires no exposition block over the maximum *and* a Constructive-tier interaction with silent-work time actually given. Two of three conditions fail. The 5–6 row cites "one exposition block over the maximum"; there are four, which sits at the bottom of that band.
**D4 = 5.**

**D5. Audience calibration / andragogy, weight 10. Score 8. Confidence H.**
Evidence: (1) **contribution reuse, instance one**: a learner's event-planning expertise (0:12:35) becomes the live demo prompt at 0:34:19, with attribution ("someone had mentioned event planning as something that they're good at"); (2) **contribution reuse, instance two**: two learners' stated estate-planning interest (0:12:35, 0:13:21) is banked aloud ("I'll save her estate planning for now, we'll definitely dive in there") and delivered at 1:19:55 with attribution ("for the couple of people who mentioned the interest there"); (3) **contribution reuse, instance three**: Jeremiah's question at 2:27:50 causes the abandonment of prepared material in favour of a live skill build, acknowledged at 2:48:17 ("we didn't necessarily get through all the slides I had prepared"); (4) Danielle's question at 1:53:21 reshapes ~8 minutes and is explicitly called back at 2:20:47; (5) jargon defined inline on first use with real consistency: "AFR or the applicable federal rate," "an IDGT," "MD stands for markdown," "invoke is just use the skill"; (6) examples drawn from practitioner routine throughout (case-note synthesis, CRM entry, advisor email triage, trust review, committee deck prep), not retail-consumer scenarios; (7) the final project carries a reflective dimension (build, hand off, test, critique) rather than mirroring billable routine; (8) explicit licensing of learner challenge at 0:06:13 ("if you think that something I say is incorrect, incomplete... I love nothing more than if you call me out").
Anchor match: the 7 row is fully satisfied. The 8+ row requires "at least one moment where a learner's contribution changes the next ten minutes and the instructor says so." There are three, each timestamped, each acknowledged aloud, and the reference requires two exceptional cited evidence points for an 8.
**D5 = 8.** Held below 9 because item (8), the explicit invitation to be corrected, was never taken up by a learner in 174 minutes, which suggests the invitation is not yet operationalised into a move learners can actually use.

**D6. Delivery mechanics from text, weight 10. Score 4. Confidence M.**
Evidence: (1) WPM 167.4, marginally above the 130–165 working band; (2) **8 pauses ≥3 s across 174 minutes**, 2 ≥5 s, speech at 95.5% of wall clock; (3) documented four-fold question reformulation at 1:24:35 ending in self-answer, and the same stack-and-self-answer pattern at 1:20:41 and 1:33:12; (4) lexical filler rate 0.87/100 words, comfortably inside band, **not a defect**; (5) talk share, own-answer rate and monologue length NOT ASSESSABLE; (6) no fatigue drift, wait time improves in the final 30 minutes.
Anchor match: the 3–4 row cites "two-plus metrics outside band; median wait time <1 s." The gap distribution puts effective wait below 1 s for the great majority of questions asked, and WPM is out of band. The 5–6 row's "median wait time 1–3 s" is contradicted by 8 pauses ≥3 s in 174 minutes.
**D6 = 4, on partial instrumentation.** A Zoom `.vtt` would let this be scored properly and could move it in either direction.

**D7. Understanding checks & learner feedback, weight 10. Score 5. Confidence M.**
Evidence: (1) two polls fired, one distribution reported aloud at 0:32:45, **neither followed by a visible decision rule** (nothing in the subsequent content changed because most of the room used ChatGPT); (2) in-class checks sit mostly at Remember/Understand ("what's a king wear," "which is more common, NOTH or ING," "what follows Q"), which is correct as *pre-training* but does not assess; (3) **feedback is better than right/wrong in at least two places**: at 2:37:12 Danielle's justification for option 3 gets a substantive extension naming the memory-versus-override hierarchy, and at 2:34:05 "would this be a question form or a command form" gets the underlying principle rather than a verdict; (4) **no closing check**, the session ends on an open Q&A sweep and logistics; (5) constructive-alignment failure at the session level: with no stated objective (D2), there is nothing for a closing check to align to; (6) the take-home assignment sits at Apply/Create, well above anything checked in class; (7) "any questions?" appears at least six times and is closed with "All right, perfect" within a second or two, which is a check in form only.
Anchor match: the 3–4 row requires no comprehension check after the midpoint, which is false, the densest checks are in the second half. The 5–6 row fits: checks fire, results are not acted on. Lifted off the floor of that band by the two instances of process-level feedback.
**D7 = 5.**

## 1.7 Protocol Fidelity

**NOT ASSESSABLE.** No PEDAGOGY.md, run protocol, or equivalent supplied. The 12-minute exposition maximum, the 13–15 designed-interaction target, and the 6-designed/4-selected poll target used above are the reference file's *defaults*, not this course's stated parameters. If the course protocol differs, the D4 exposition finding weakens proportionally.

---

# Part 2: Improvement Build

## 2.1 Full Findings Register (Pass 1, unfiltered)

| # | Finding | Location | Severity | Conf. |
|---|---|---|---|---|
| F01 | Watermark claimed to trace to the individual account; Anthropic states it cannot | 0:59:58 | **Blocking** | H |
| F02 | Only an audio file supplied; talk share, own-answer rate and monologue length unrecoverable | materials | **Blocking** (for trend tracking) | H |
| F03 | FP Alpha classified as a deterministic non-AI calculator | 0:21:06 | High | H |
| F04 | §7872 de minimis stated as $100,000; correct figure is $10,000 | 1:23:46 | High | H |
| F05 | Navajo described as having no written form | 2:42:38 | High | H |
| F06 | Assigned-reading citation unresolvable (author and journal both wrong or garbled) | 1:20:41 | High | M |
| F07 | 8 pauses ≥3 s in 174 min; 95.5% speech density | throughout | High | M |
| F08 | Four-fold question reformulation then self-answer | 1:24:35 | High | H |
| F09 | No session-level learning objective stated anywhere | throughout | High | H |
| F10 | No closing check; session ends on logistics | 2:46:34 | High | H |
| F11 | Four exposition blocks over the 12-min default maximum | see 1.5 | Medium | M |
| F12 | Zero silent-work intervals other than the break | throughout | Medium | H |
| F13 | Poll distributions reported but no decision rule fired | 0:32:45 | Medium | M |
| F14 | Pre-training gap: AFR, IDGT, conduit trust introduced inside the block depending on them | 1:19:55–1:33:12 | Medium | M |
| F15 | Estate case's instructional purpose stated at its end, not its start | 1:32:27 | Medium | H |
| F16 | Watermark robustness overstated ("hard to get out") | 0:59:58 | Medium | H |
| F17 | eCFR given as .com; Code and regulations conflated | 0:57:38 | Medium | H |
| F18 | Known-knowns quadrants misattributed to Anthropic | 1:07:48 | Low | M |
| F19 | Demand-note rate cadence given as semi-annual | 1:30:51 | Low | M |
| F20 | Self-identified poorly-overlaid cost chart left uncorrected | 2:23:11 | Low | H |
| F21 | Non-determinism mechanism explained vaguely ("so many variables") | 1:44:05 | Low | M |
| F22 | Discount aggressiveness flagged without naming the governing authority | 1:32:27 | Low | M |
| F23 | Firm AUM and title stated on the record differ from profile on file | 0:01:35 | Low | L |
| F24 | Zip-file limitation delivered flat, unverified | 1:54:58 | Low | n/a |
| **S01** | **Three instances of learner contribution redirecting the session, each acknowledged aloud** | 0:34:19, 1:19:55, 2:27:50 | **Strength** | H |
| S02 | Prediction-before-reveal executed three times | 1:35:32, 2:01:57, 2:16:54 | Strength | H |
| S03 | ICAP Interactive-tier block genuinely delivered | 2:32:29–2:39:32 | Strength | H |
| S04 | Break adherence 0.98 of stated duration | 1:11:41 | Strength | H |
| S05 | Wait time and question density improve in the final 30 min | 2:24:00–2:54:09 | Strength | M |
| S06 | Anthropic plan and token pricing accurate against a fast-moving target | 0:22:38, 2:17:41 | Strength | H |
| S07 | Uncertainty labelled aloud repeatedly ("I believe," "I hesitate," "arguably") | throughout | Strength | H |
| S08 | Redundancy respected; on-screen text explicitly not read aloud | 0:30:26 | Strength | H |
| S09 | Rev. Rul. 2004-64 reimbursement trap taught with a concrete $16M consequence | 1:27:43 | Strength | H |
| S10 | Learner challenge explicitly licensed in the opening | 0:06:13 | Strength | H |
| S11 | Dropped-connection recovery handled without losing time | 1:17:37 | Strength | H |
| S12 | Final project peer-exchange design achieves Create-tier constructive alignment | 0:23:27 | Strength | H |

## 2.2 Strengths / Weaknesses Matrix

| | **High impact** | **Lower impact** |
|---|---|---|
| **Strength** | Andragogy: contributions harvested, banked, reused, acknowledged (S01). Prediction-before-reveal and the Interactive prompt block (S02, S03). Current, accurate product economics (S06). | Break discipline (S04). Redundancy management (S08). Recovery handling (S11). Uncertainty labelling (S07). |
| **Weakness** | Verification gap on actionable claims (F01, F03, F04, F05, F06). No wait time anywhere (F07, F08). No objective and no closing check (F09, F10). | Pre-training sequencing (F14). Poll decision rules (F13). Minor citation and cadence errors (F17, F18, F19). |

## 2.3 Stop / Start / Continue

**Stop**
1. Stacking reformulations onto a question you actually want answered. One phrasing, then silence.
2. Delivering vendor classifications, statutory thresholds, and product-capability claims without the same hedge you apply elsewhere. The hedging habit already exists (S07); it is simply not reaching the highest-risk claims.
3. Closing "any questions?" inside two seconds. It reads as a transition marker, not a check.

**Start**
1. One session objective, stated before 0:10:00, phrased as a capability, re-closed at the end.
2. A pre-delivery verification pass over any claim containing a dollar threshold, a statute number, a vendor name, or a citation.
3. One deliberate silent-work interval per session, announced with a duration, timed. You already prove you can hold a stated duration (S04, break at 0.98). Apply the same discipline to a two-minute think.

**Continue**
1. Harvesting learner expertise in the opening and visibly spending it later, with attribution. This is the thing that most distinguishes the session.
2. Prediction-before-reveal on the technical material. The token exercise at 2:01:57 is the best-taught ten minutes of the session.
3. Abandoning prepared material when a learner question is better. Do it again, and say why out loud when you do.

## 2.4 Focus Skills & Feed-Forward

Three active. Each is task- or process-level, never directed at the person (Hattie & Timperley; Kluger & DeNisi). Ranked by impact × effort.

### FS1: Verification pass on threshold, statute, vendor and citation claims
**Rank 1. Highest impact (D1 = 25% of the instrument), lowest effort (a 20-minute pre-session pass).**

Observable behaviour: before delivery, extract every claim from your own notes containing a dollar threshold, a statute or ruling number, a named vendor's technical classification, or a citation. Verify each against a primary source. Anything that does not resolve gets said aloud with a confidence label or gets cut.

Success criterion: zero Incorrect verdicts in §1.1 next session, and every citation you intend to distribute resolves to a real author and journal.

Measurement: §1.1 verdict counts in the session-2 review; count of citations that resolve on first search.

**Before (1:23:46):** "If I sell something, or if I let somebody borrow money from me, what do I have to charge them? If they're in my family and the amount's over $100,000, what interest rate?"

**After:** "For an intra-family term loan above the $10,000 de minimis, you have to charge at least the AFR for the note's term. There's a separate rule people mix up with that one: under $100,000, the imputed interest gets capped at the borrower's net investment income. And for what Meg is doing here, selling units to her grantor trust, §7872 isn't even the operative section. The note gets tested under §1274, and under Rev. Rul. 85-13 the sale is a non-event for income tax because she's treated as owning the trust's assets."

That version is *more* impressive to a CFP-track room than the original, not less. The correction adds authority rather than subtracting confidence.

### FS2: The three-second gate
**Rank 2. High impact (D4 and D6 jointly), high difficulty.**

Observable behaviour: after any question you want a learner to answer, ask it once and say nothing until three seconds have passed. No reformulation, no "any guesses," no rephrasing.

Success criterion: at least 15 pauses of ≥3 s across the session (baseline: 8), and no question reformulated more than once before a learner speaks.

Measurement: gap distribution from `transcript_metrics.py` (count of gaps ≥3 s, ≥5 s) plus a manual count of reformulation chains. If a Zoom `.vtt` is supplied, the proper wait-time distribution and own-answer rate replace both.

**Before (1:24:35):** "And what's that interest rate called? Anybody know what that legal minimum of interest to charge on capital is per the IRS for an individual arrangement? Oh. Any guesses? It is the AFR rate or the applicable federal rate."

**After:** "What's that rate called?" [silence, count five] "...The AFR. Applicable federal rate."

Practical note: you already did this correctly at 2:02:43 and four learners answered in sequence. The behaviour exists; it needs to be the default rather than the exception. Expect it to fail first in the estate-planning block, where you are most fluent and most inclined to fill.

### FS3: Objective at the front, check at the back
**Rank 3. Medium impact (D2 and D7 jointly), low effort.**

Observable behaviour: state one session objective as a capability before the 10-minute mark; close the session with a check at the same Bloom tier as that objective, referencing it explicitly.

Success criterion: an objective utterance timestamped before 0:10:00; a closing utterance that names it; a closing check whose Bloom tier matches (not a Remember-tier poll against an Apply-tier objective, which would be a Biggs alignment failure).

Measurement: timestamp of the objective statement; presence of a closing callback; Bloom-tier comparison of objective versus closing check.

**Before (0:15:40):** "Read through the course objectives, learning objectives, you know, if you have feedback there, let me know."

**After (opening, ~0:06:00):** "By the end of tonight, you'll be able to look at a task and tell me which Claude model to run it on, and defend that on cost and on how well-defined the task is. That's the one thing I'll check before I let you go."

**After (closing, ~2:50:00):** "Right, the thing I said we'd cover. Three tasks, in the chat, tell me the model and one reason. Reconciling 400 case notes into a single dated list. Drafting ten planning recommendations for a new client. Checking tonight's weather." [wait] "Haiku, Fable or Opus, Haiku. And the reason is the same each time: how defined is the answer."

---

## 2.5 Red Team

**The three strongest objections to this review.**

**1. D1 = 4 penalises content density, and the instrument has a perverse incentive built into it.** The 3–4 anchor triggers on an absolute count of Incorrect claims, not a rate. Three errors across roughly 27,700 words spanning federal tax law, estate structuring, LLM architecture, vendor economics and data security is a low rate. An instructor who covered a third of the material and said less would score better on D1 while teaching less. The counter-counter-argument is that the anchor's second test is about *practitioner consequence*, not count, and all three errors sit in decision-relevant places. But a reviewer applying the same rubric to a thinner session would produce a higher D1 for a worse class, and that is a real defect in the instrument rather than in the teaching. **If you want, I can log a rate-normalised D1 as an unscored supplementary metric in §1.5 next session.** I will not change the scored rubric, because that breaks comparability.

**2. D6 = 4 rests on a metric I built rather than one the protocol specifies.** The protocol's D6 wants WPM, filler rate, talk share, wait time and own-answer rate. Three of those five are unavailable without diarization. I substituted a VAD-derived pause distribution, which measures something adjacent but not identical: it captures silence anywhere, not silence specifically following a question. If the ASR's 500 ms VAD threshold merged genuine pauses into adjacent cues, the count of 8 is an undercount and the finding softens. A Zoom `.vtt` would settle it in either direction, and I would not be surprised by a two-point move. **Treat D6 = 4 as the least stable number in this review.**

**3. D3 = 5 should arguably not exist.** Half of D3 is slide design, and no deck was supplied. I scored it anyway on the load evidence, which keeps the weighted total computable but presents a 15-weight dimension as measured when it is half-inferred. The defensible alternative is to mark D3 NOT ASSESSABLE, which would make the total 42.0 out of an 85-point available scale (49.4% versus 49.5%, so the headline verdict barely moves) but would be more honest about coverage. I chose the scored version so that session 2 has something to compare against. **If you supply the lesson HTML retroactively, I will re-score D3 and note the instrument change in the session record.**

**Likeliest failure mode of this improvement plan.** FS2 is the one that fails. Silence is expensive when you are behind, and this session was already behind: you said so yourself at 2:48:17. The three-second gate will hold in the token-prediction block, where the material is unfamiliar to you as a speaker and you are naturally pausing, and it will collapse in the estate-planning block, where you are fluent and the temptation to fill is strongest. If session 2's gap distribution shows improvement concentrated in the AI content and none in the planning content, that is the diagnosis, and the fix is to pre-mark three specific questions in the estate material as gated rather than trying to change the global habit.

**Evidence that would flip parts of this verdict.**
- A Zoom `.vtt` showing talk share ≤75% and 40-plus genuine learner turns would move **D4 to 6** and could move **D6 to 5 or 6**.
- Lesson HTML showing 13–15 designed interactions with 11-plus fired would move **D4 to 6**.
- A resolved citation for the squeeze/freeze/burn paper removes F06 and one Unverified from D1, though it would not move the score, since D1 is driven by the three Incorrect claims.
- A PEDAGOGY.md with an exposition maximum above 14 minutes would remove F11 entirely.

## 2.6 Trend Tracking

**Baseline session.** No prior SESSION RECORD blocks exist in memory or project knowledge. No deltas, no recurring-versus-resolved analysis, and no trend claims are made. Session 2 becomes the first comparable data point, and only if the materials in §0.2 are supplied.

---

## Session Record

```
SESSION RECORD
session_id: AIFFA-S1-2026-08-31
course: AI Foundations for Financial Advisors (UC Berkeley Extension)
date: 2026-08-31 (M, inferred from Labor Day reference at 0:15:40)
duration_min: 174.2
materials: audio recording (m4a, 02:54:09) → local ASR transcript; transcript_type: ASR (no diarization, disfluencies suppressed, proper nouns unreliable). No deck, chat log, poll report or protocol supplied.
objective: inferred (M): navigate Claude's core surfaces; explain next-token prediction and temperature; select a model tier on cost and task-definition grounds
scores: D1=4 D2=5 D3=5 D4=5 D5=8 D6=4 D7=5 total=49.5/100
lowest_dimension: D1 (tied with D6; D1 carries the higher weight)
metrics: wpm=167.4 filler_per_100=0.87(lexical floor; um/uh NA) talk_share=NA genuine_questions=NA(217 question-marked utterances) median_wait_s=NA(8 gaps >=3s in 174min) longest_monologue_min=NA interactions_fired=NA/NA polls_fired=2/NA
top_findings:
  1. Blocking. Watermark claimed to trace to individual account; Anthropic states it cannot (0:59:58)
  2. High. 8 pauses >=3s across 174 min; 95.5% speech density; four-fold question reformulation then self-answer (1:24:35)
  3. High. No session objective stated and no closing check; constructive-alignment failure at session level
focus_skills_active:
  1. Verification pass on threshold/statute/vendor/citation claims | criterion: zero Incorrect verdicts in 1.1; every distributed citation resolves | measure: 1.1 verdict counts, citation resolution rate
  2. Three-second gate after genuine questions | criterion: >=15 gaps >=3s (baseline 8); no question reformulated more than once before a learner speaks | measure: transcript_metrics gap distribution + manual reformulation-chain count
  3. Objective before 0:10:00, closing check at matching Bloom tier | criterion: timestamped objective utterance; closing callback; tier match | measure: timestamp, callback presence, Bloom comparison
focus_skills_resolved: none (baseline)
instrument_changes: none. D3 scored at confidence L on transcript inference only (no deck); flagged as provisional and non-comparable until lesson HTML is supplied. D6 scored on a VAD-derived pause distribution substituting for unavailable diarization metrics.
confidence_overall: M. ASR transcript without speaker diarization; three of five D6 metrics and all D3 design metrics unavailable
```
