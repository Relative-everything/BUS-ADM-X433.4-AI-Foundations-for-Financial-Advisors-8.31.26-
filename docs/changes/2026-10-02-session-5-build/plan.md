# Plan: Session 5 build, 2026-10-02

Branch `claude/practical-fermi-5g0sm0`, from `c8b87b7` (`main` after PR #42). Session 5 is the final
class, shortened by student presentations. Kickoff in `notes-verbatim.md`. Ledger rows `S5B-001`
upward in `ledger.md`; `checks.mjs` carries one jsdom assertion per row a DOM check can prove.

## 0. The premise, challenged first

1. **`MAINTAINING.md` says no Session 5 page is owed.** The 2026-08-27 instructor decision reads
   "Session 5 is a student presentation meeting and no `session-5/index.html` is owed, now or
   later." The 2026-10-02 kickoff asks for exactly that page, in the instructor's own words, so the
   later decision supersedes the earlier one. The note in `MAINTAINING.md` is rewritten to record
   both decisions and the date the second one was taken; nothing else about the decision is hidden.
2. **"Same exact formatting" and "20% less content" are both measurable, and they pull against
   one architectural constant.** The appendix architecture, the tier bar, the cold-open ritual at
   8 minutes and the 18-minute discussion block are ratified parameters that `build-appendix.mjs`
   checks. So the 20% comes out of everything else: 10 core sections at 54 minutes instead of 11 at
   67, and 5 appendix sections at 66 minutes instead of 6 at 83. 54 + 66 = 120, which is 80% of
   150 exactly.
3. **The presentations are class logistics a learner alone cannot run, so they are not on the
   page as logistics.** The 2026-09-25 rule (the page must stand alone; the Part 1 relay moved to
   the run sheet) applies again. What the page teaches is the method the presentation is made
   of, with a supplied sample workflow anyone can run: explain it, break it, improve it, measure
   it, rehearse it. The pairing, the order of speakers, the builder's two minutes and the
   instructor's questions are in `instructor-notes/session-5.md`.
4. **Nothing on the page may be addressed to the instructor, state a grade, a weight, a due date,
   or name the submission platform** (the Tier A and Tier B purge, `MAINTAINING.md`). The
   syllabus's Part 2 rubric words (comprehension, diagnosis, improvement, transfer) are therefore
   not printed as a rubric. The four verbs the page uses are its own: explain it, break it, improve
   it, say what stays yours.
5. **Two of the session's sources could not be opened from this environment and the page says
   nothing on their strength beyond what search summaries agree on.** kitces.com is egress-blocked
   (both the container proxy and the fetch tool refuse it), so the Kitces reading on AI search is
   named as the assigned reading at M, with the one recommendation that every summary repeats.
   The four productivity trials (Noy and Zhang; Dell'Acqua and colleagues; Brynjolfsson, Li and
   Raymond; METR) sit on publishers that are also blocked, so each is M, from two or more
   consistent reports, and the page labels them as such. Lee et al. (2025) was opened in full
   (the Microsoft Research PDF) and is H; its record, which Session 3 carried at M with the link
   unverified, is corrected.
6. **"Measuring the result: AI-assisted time vs the Session 1 baseline" presupposes a baseline the
   room may not have.** The 2026-09-07 audit found Session 1 §10 did not run, and Session 4 was
   rebuilt so that no sentence asserts a baseline was recorded. Session 5 follows Session 4: "your
   best estimate of how long it takes you without AI", with a default, never "your Session 1
   figure".
7. **No Live API box.** `MAINTAINING.md` keeps the console off pages whose exercises run on the
   students' own work; Session 5's do (a stranger's workflow, your own times, your own stack).
   Session 4 carried it to show the request itself; that lesson is taught.

## 1. What the history says, reduced to rules (and how each is applied here)

Measured from the verbatim notes of 2026-09-13, 2026-09-19, 2026-09-25 (twice), 2026-09-27 and
2026-09-28, the Session 4 plan's own preference table, and the ledgers.

| # | Rule the instructor repeated | Applied in Session 5 |
|---|---|---|
| 1 | A visual aid, not a book: cut prose, a thesis line and 3 to 6 bullets per section | every section is one `.big` line, one figure, bullets of at most four lines |
| 2 | Interactivity over text; "more interactive sections beats exhaustive text"; "not just click to display text" | every section's main click moves a figure; new facts sit inside readouts the learner opens |
| 3 | Nothing addressed to the instructor; no `.verify`, no markers, no "tonight", no dates, grades, weights or platform | none on the page; the verify list is in the run sheet |
| 4 | Every interaction works without the case study; the Coles in two lines | the sample workflow carries its own facts; the Coles appear in the §07 moments, built from the injected transcript, qualitatively |
| 5 | Beginner level (2 to 3 of 10), no formulas | no formula on the page; the one regression result (Lee) is shown as two bars with plain words |
| 6 | Sorters answer at once, item under its bucket with a tick or cross and a why | the shared `mkSorter` from Session 4, verbatim |
| 7 | Reveal one at a time; predictions lock, then show the gap | the cold open, §03, §05 and §08 lock a commitment before the reveal |
| 8 | Interactions that change with the input, not a number over a static chart | §01 slider, §03 inputs, §04 fixes re-run the inputs, §05 your own minutes, E1 your own clock |
| 9 | Concrete wealth-management examples | a meeting-prep brief for a business-owner client; the Cole meeting's eight moments; the advisor's own stack |
| 10 | Source it or cut it; never make up a source; real-world figures cross-checked | 17 new `SOURCES.md` records, each with a retrieval note saying what was and was not opened |
| 11 | Keep the Meg Cole through-line | §00's two lines, the cold open's Then prompt, the §02 note (de-identified), the §07 moments |
| 12 | Claude is priority; keep the others | §01's timeline is Anthropic's own page (H); OpenAI's ChatGPT retirements are one bullet (M) |

## 2. Section map

Minutes: core 54, appendix 66, total 120. Gates: one per section, 15. Interactions: 15 `data-task`
roots, 13 distinct families, no family repeated in adjacent sections in file order, core order or
reading order.

| # | Id | Title | Min | Tier, after | `data-comp` | What the learner does | Sources, confidence |
|---|---|---|---|---|---|---|---|
| 00 | s0 | Final Project and Advisor Use Case Deep Dive | 5 | core | retrieval-bridge | three Session 4 recall items; then Five Sessions, One Judgment: advance the model three times, the ring of five principles stays; click a stop | S4 page; L |
| CO | sCold | Then and Now: Two Prompts | 8 | core | timed-ritual | pick Then or Now, run the eight checks on both, then Test 2 (may you send it?); then paste your own oldest and latest | COLD_CHECKS, L |
| 01 | s1 | The Model Your Workflow Runs On Will Retire | 5 | core | parameter-sandbox | pin the workflow to a dated model, the current one, or "whatever the app picks"; drag the day across Anthropic's own retirement calendar; copy the maintenance card | Anthropic deprecations page H; deprecation commitments H; OpenAI retirements M |
| E2 | sE2 | Swap the Model, Keep the Test Set | 14 | standard, after s1 | pipeline-lab | run five test inputs through the model it was built on, its replacement, and the next; ship or hold; copy the test-set template | Anthropic deprecations H (the testing sentence); L |
| 02 | s2 | Read a Stranger's Package Like an Examiner | 6 | core | click-map-explorer | tag the five design choices in a sample package; two slots stay empty; copy the explanation | Google PTCF H; L |
| 03 | s3 | Six Inputs: Which Ones Break It? | 5 | core | prediction-commit | predict up to three of six inputs, lock, run; three break in three ways | Kalai H; L |
| E3 | sE3 | Five Ways It Broke, Sessions 1 to 4 | 12 | foundational, after s3 | multi-column-sorter | sort ten course failures into five types | Kalai H, Wolfram H, Magesh H, EchoLeak CVE H, L |
| 04 | s4 | A Change You Can Defend | 5 | core | builder-assembler | pick one of two fixes per break; the six inputs re-run; copy the change note | L |
| E4 | sE4 | The Builder's Two Minutes | 10 | foundational, after s4 | commit-first-mcq | five things a presenter says: understood, missed, or the package failed them | L |
| E1 | sE1 | Six Minutes, Five Beats | 12 | standard, after s4 | timed-ritual | start a real clock, log each beat, read planned against actual | L |
| 05 | s5 | Felt Faster Is Not Faster | 5 | core | estimate-then-reveal | guess the saving in four trials, lock, reveal; then your own minutes with and without | Noy and Zhang M; Dell'Acqua M; Brynjolfsson M; METR M |
| 06 | s6 | New Tools, the Same Four Questions | 5 | core | symptom-diagnoser | pick a tool in the stack; its data path lights; In, Where, Check, Keep answered for it | T3 2026 H; RightCapital M; Pew M; Kitces AI search M (assigned reading) |
| 07 | s7 | The Cole Meeting: Eight Moments | 5 | core | two-bucket-sorter | sort eight moments: a tool can draft it, or only you; the trust line | Morningstar M; Vanguard M; CFP Board M; transcript L |
| E5 | sE5 | Discussion: As the Tool Does the Analysis, Does Your Value Move to the Relationship? | 18 | standard, after s7 | sealed-vote-debate | locked vote, both cases, one complication, re-vote | Morningstar M; Vanguard M; Lee H; Dell'Acqua M |
| 08 | s8 | Trust the Tool, Think Less? | 5 | core | commit-first-mcq | two commits on the reading, then set your two confidences and see where the survey puts you; write the one thing you carry; the five principles open | Lee H |

Arithmetic: core 5 + 8 + 5 + 6 + 5 + 5 + 5 + 5 + 5 + 5 = **54**; appendix 14 + 12 + 10 + 12 + 18 =
**66**; 54 + 66 = **120**. Break 15 and reserve 15 as `nosum` rows.

Families in reading order (appendix inserted, foundational before standard at a shared anchor):
bridge, ritual, sandbox, pipeline, click-map, prediction, multi-column, builder, mcq, ritual,
estimate, diagnoser, two-bucket, debate, mcq. No adjacent repeat.

Retrieval before exposition: §00's bridge precedes any new content; the cold open, §03, §05 and
§08 lock a commitment before their reveal; E5's vote is sealed before either case opens.

## 3. The sample workflow, shared by §02, §03, §04, E1, E2 and E4

One package, "Meeting-prep brief", constructed for this lesson and labelled L everywhere it
appears. README (three steps), prompt.txt (a persona, a task, a context slot, a format, and a
"verification" line that only says the output should look right), sample-input.txt (a
de-identified case note: a business-owner client in her sixties, a manufacturer in the Midwest, a
competitor's unsolicited letter, a son who works in the business and has not been told). No case
figure is typed into it; where a figure is needed in script it comes from the injected `COLE`
constant. The package's gaps are the lesson's material: no tier stated, no real check, no
data-handling note, nothing about a missing field.

## 4. Facts the page carries, with the record behind each

| Fact, as the page states it | Record | Conf. | How it was reached |
|---|---|---|---|
| Lee et al.: 319 knowledge workers, 936 examples; critical thinking enacted in 59% of them; higher confidence in the tool predicts less critical thinking (−0.69), higher self-confidence more (+0.26); effort shifts to verification, integration and stewardship; 55% to 79% of examples reported less effort by activity | `src-lee-cognitive` | H | Microsoft Research PDF opened 2026-10-02 |
| Anthropic's lifecycle terms; at least 60 days' notice; requests to retired models fail; the retirement dates named in §01 and E2; "consider thorough testing … well before the retirement date" | `src-anthropic-deprecations` | H | platform.claude.com opened 2026-10-02 |
| Anthropic preserves the weights of all publicly released models; retiring models is currently necessary to serve new ones | `src-anthropic-deprecation-commitments` | H | anthropic.com opened 2026-10-02 |
| GPT-4 left ChatGPT 30 April 2025; GPT-4o, GPT-4.1, GPT-4.1 mini and o4-mini left ChatGPT 13 February 2026; the models stay in the API | `src-openai-retire-4o` | M | help.openai.com blocked; three consistent reports |
| Noy and Zhang: 453 professionals, writing tasks; 40% less time, 18% higher quality | `src-noy-zhang` | M | science.org and NBER blocked; four consistent reports |
| Dell'Acqua et al.: 758 BCG consultants; inside the frontier 12.2% more tasks, 25.1% faster, 40% higher quality; outside it 19 points less likely to be correct | `src-dellacqua` | M | hbs.edu and SSRN blocked; three consistent reports |
| Brynjolfsson, Li and Raymond: 5,179 support agents; 14% more issues per hour, 34% for the least experienced, little for the most | `src-brynjolfsson` | M | NBER and arXiv blocked; four consistent reports |
| METR: 16 experienced developers, 246 tasks; 19% slower with AI; expected 24% faster; believed 20% faster afterwards | `src-metr-2025` | M | metr.org blocked; five consistent reports |
| Morningstar: 184 investors who fired an advisor; advice quality 32%, relationship 21%, cost 17%, returns 11%, going it alone 10%, communication 9% | `src-morningstar-fired` | M | morningstar.com blocked; four consistent reports |
| Vanguard Advisor's Alpha: about 3% a year, about half of it behavioural coaching (150 basis points) | `src-vanguard-alpha` | M | vanguard.com blocked; three consistent reports |
| CFP Board: Psychology of Financial Planning, 7% of the exam, from the March 2022 exam | `src-cfp-psychology` | M | cfp.net blocked; two consistent reports |
| T3 / Inside Information 2026: 2,906 advisors; 42.9% using AI note-taking, 14 solutions tracked for the first time; 52.2% using AI search or generative tools | `src-t3-survey` (existing, extended) | H | as summarised by Kitces, consistent with InvestmentNews and dwealth |
| RightCapital's Iris, 23 June 2026: an agent that reads the client's plan data, flags anomalies and runs simulations, Premium and Platinum plans | `src-rightcapital-iris` | M | press wire blocked; four consistent reports |
| Pew (July 2025): a link was clicked on 8% of visits with an AI summary, 15% without; 68,879 searches by 900 adults | `src-pew-ai-summaries` | M | pewresearch.org blocked; five consistent reports |
| Kitces (17 November 2025), Ways Advisors Can Optimize for AI Search: the one recommendation every summary repeats, a consistent who-what-where across platforms | `src-kitces-aisearch` | M | kitces.com blocked; the search engine's summary of the article |
| Session 4 recall items, the eight checks, the Cole transcript | `src-case`; Session 4 records | L / as held | the repository |

## 5. What is deliberately not on the page

- The grading rubric, its weights, the submission instructions, the pairing, the speaking order,
  and the words "due", "submit", "grade", "tonight". The run sheet carries the logistics.
- A Live API box. Reason in §0.7.
- The seven-step delegation framework: Session 2's Appendix B4 owns it and nothing here restates it.
- Vendor rankings or satisfaction scores for note-takers and CRMs beyond the one survey share the
  repository already holds; naming a market leader from a vendor's own press release is not a
  fact the page can stand behind.
- Any figure from the Kitces AI-search article beyond the one recommendation the search summary
  repeats, because the article could not be opened.

## 6. Verification plan

Every repository gate in `MAINTAINING.md` that runs without the skill, with `session-5` added to
every lesson list; `checks.mjs` in this folder; a Playwright click-through of every section at
1280 and 380 px with Shift+U on and off, zero page errors, no "undefined" or "NaN", no horizontal
overflow; `section_profile.mjs` run on all five lessons for the comparison table in the handback;
three independent reviews (accuracy of every chipped sentence against its record, a beginner working
every section alone, robustness and accessibility), each finding fixed and re-checked.
