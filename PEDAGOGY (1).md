# PEDAGOGY.md

**Version 2.0 · 2026-10-11 · Jared Winkers**
Instructional design standard for the lesson artifacts, case pages and course materials of BUS ADM X433.4, *AI Foundations for Financial Advisors* (UC Berkeley Extension), and for any course built on the same method. Read this file in full before building, editing or auditing any lesson file.

Version 2.0 folds in everything learned building the repo (August to October 2026) and teaching the Fall 2026 cohort (five sessions, transcripts of Sessions 1, 2, 4 and 5, two formal audits, the Canvas export, and the post-term debrief). Where v1.0 was a design hypothesis, v2.0 marks which parts survived contact with a live room and which did not.

---

## 0. How to read and how to amend this file

This file has four kinds of content and they update at different rates.

| Layer | Section | Changes | Amend by |
|---|---|---|---|
| **Non-negotiables** | §1 | Almost never | Only on my explicit instruction, logged in §13 |
| **Principles** | §2, §3, §5 | Rarely; carry their reasons | Edit the principle *and* its reason together |
| **Parameters** | §4 | Often | Change the number in the §4 table only |
| **Decisions** | §13 | Append-only | Never delete; supersede with a new dated entry |

**Precedence inside this file.** §1 wins, then §4, then the rest. Where §4 gives a number and prose elsewhere gives a different one, §4 is correct and the prose is stale: flag it.

**Precedence across files.** Each governs its own layer; where two collide, flag it (§1.6) rather than choose.

| File | Governs | Owner surface |
|---|---|---|
| `PEDAGOGY.md` (this file, repo root) | Learning design: what a lesson must do and why | Instructor; edited in Claude Code, mirrored to the Project |
| `MAINTAINING.md` | Repo mechanics: layout, validators, pre-push gate, purge list, case pipeline, live-console rules | Claude Code |
| `EDITORIAL.md` | Prose and markup rules (A/B rules, D decisions): dashes, chips, Wolfram quotation, appendix counts | Claude Code |
| `CASE.md` | The canonical synthetic case facts; generated extracts are injected, never retyped | Claude Code |
| `facts/FACTS.json` | Volatile external facts: model names, prices, plans, leaderboards, regulation dates | Claude Code; re-verified before each session |
| `docs/deferred-work.md` | The single register of open work | Claude Code |
| Canvas | Dates, deadlines, submission specs, grading | Instructor only |
| interactive-lesson-builder skill (`references/pedagogy.md`, `component-bank.md`) | Subject-agnostic build method and component code | Skill repo; this file overrides it on course-specific parameters |

**Amendment protocol.** When I change a parameter: update the §4 table, append a dated entry to §13, bump the version. When I reject an approach: log it in §13.2 with the reason so it is not re-proposed. Section numbers cited elsewhere (`CASE.md` cites §1.8, §5.3.4 and §5.5) are load-bearing: do not renumber without sweeping every citation.

**Companion files.** `component-bank.md` (skill) holds the 18 component families with code, interaction contracts and citations; open it before selecting components. `CASE.md` holds the case. There is no `COURSE.md`; course-specific scheduling lives in Canvas and the syllabus, and the repo deliberately carries none of it (§1.12).

---

## 1. Non-negotiables

Violating any of these invalidates the artifact.

1. **Never fabricate a citation, author, statistic, page number, or legal authority.** If a number is needed and cannot be verified, write `[UNVERIFIED: needs source]`. A plausible figure is worse than a visible gap, because a visible gap gets fixed and a plausible figure gets taught.
2. **Every factual claim carries an H/M/L confidence chip and a footnote key** resolving to a full bibliographic entry in the file's source list (generated from `SOURCES.md`). A remembered H is an M: H requires verification against a primary source in the current build.
3. **Legal, tax, and regulatory characterizations are flagged for my verification before they appear on screen.** Never build on recall. Placeholder-and-flag beats a confident wrong holding. Fall 2026 showed why: the IRC §7872 threshold conflation, the "permanently lost" portability claim, and the "FINRA rescinded its guidance" claim all reached the room.
4. **No client data, real or plausible-looking.** Every case is synthetic and labeled synthetic on the page where it is introduced. Construction, not redaction, is the standard: a de-identified real household is still identifying in a narrow market.
5. **Deliberately defective teaching artifacts are labeled as deliberately defective** on the page and in the footer.
6. **Flag, do not resolve.** When two instructions collide, when a change undermines a prior decision, or when a placement is genuinely ambiguous: halt, present what collides, the severity, the evidence each way, and a recommendation. The decision is mine. In an autonomous run where halting is not possible, choose the more reversible option and log it (§12.8).
7. **Challenge a flawed premise before answering, not after.**
8. **Single self-contained file, no network dependency.** The artifact works from a thumb drive in a room with no wifi. Two ratified exceptions, and no others: (a) the Google Fonts request at page load, with local fallback stacks so an offline open degrades instead of breaking; (b) the optional live-model console (`generativelanguage.googleapis.com`), runtime only, only in the sessions MAINTAINING.md names, only after a reader pastes their own key, key held in one variable and never stored, every exercise keeping a captured fallback.
9. **No browser storage APIs.** State lives in JavaScript variables and dies on reload. localStorage, sessionStorage, indexedDB and cookies are validator failures.
10. **No section gating.** All sections scroll freely. Answer panels hide behind explicit reveal controls or the labeled Shift+U override. Components commit and reveal; they never block.
11. **Volatile facts come from `facts/FACTS.json`, never from memory.** A model name, price, plan feature, leaderboard rank or regulation date typed from recall is a defect even when it happens to be right. Prefer tier-generic prose ("frontier tier") where the exact name is not the point, so the next release breaks fewer lines.
12. **Lesson and case pages carry no grading, submission, due-date or LMS-name language.** Canvas is the single authority for dates, deadlines, submission specs and grades. Pages describe what good work contains and point to "the course site." The standing purge list in MAINTAINING.md enforces this.
13. **Anything touching client NPI carries the compliance frame:** firm policy governs before vendor terms, and Reg S-P service-provider oversight applies. Teach *pseudonymize, not anonymize*: a key is retained, and student-facing materials say so explicitly.

---

## 2. Audience standard

Credentialed or credential-track adult professionals. Assume competence; assume no technical background. They are practitioners with expensive time and real accountability, and they test every claim against their own practice.

**What Fall 2026 added (evidence, not assumption).**
- The room is small: 6 attended Session 1; enrollment about 8. Participation concentrated in 2 to 3 learners per session; in Session 4 four learners spoke at all (about 4% of 179 minutes) (H, transcripts).
- The AI floor is lower than v1.0 assumed. At Session 1, minute 17, no one had yet bought the required subscription ("that's everybody"). Several students had sent fewer than 20 prompts ever (instructor note). The instructor's own estimate: page complexity 7 to 8 out of 10 against a room at 2 to 3 (H).
- The finance floor is uneven. Roughly 3 of 8 were not practicing advisors. Questions included "what would be a commission?" and "what's brokerage export?" (S2) (H).
- Students' own workflows were mainstream planning tasks: risk-profile questionnaire, new-client packet, CFP study prompt, Roth conversion, retirement plan, annual-review notes to CRM (S5) (H). Nobody brought UHNW work.

**Consequences, not negotiable per lesson.**
- **Never dumb down, never assume the vocabulary.** Precise jargon stays, but every domain or technical term is defined inline on first use in each session, not only rare ones: `IDGT [intentionally defective grantor trust]`. New terms per session are capped (§4).
- **Never demo to a room without the tool.** A paid account is a pre-course requirement, verified before Session 1; Session 1 is hands-on in each student's own account.
- **Calibrate the case to the median learner's practice, not the instructor's.** A case above the room produces silence, not stretch (§5.3, §13.2 R9).
- **Never assign work that mirrors routine daily tasks** without a reflective or diagnostic dimension.
- **Expect the satisfaction dip** (Deslauriers et al. 2019). Treat "this felt harder" as expected signal, not a defect. Equally: do not use the dip to explain away "this was over my head." The first is about effort; the second is about prerequisites, and Fall 2026 had prerequisite gaps.

---

## 3. Learning design principles

Each is stated with its reason, because a principle understood can be applied to an edge case the instruction did not anticipate.

**3.1 Every element requires learner production.** No section advances on passive reading. The learner generates something: a prediction, a ranking, a classification, a written explanation, a placed point. ICAP orders gains Interactive > Constructive > Active > Passive (Chi & Wylie 2014); the target is Constructive or above. "Click Next" is Passive and does not count. *Fall 2026 confirmation:* every engagement peak was production; every instructor-narrated stretch over 10 minutes was a dead zone (§3.11).

**3.2 Retrieval before exposition wherever content permits.** Commit to an answer *before* being taught it. Wrong guesses followed by feedback outperform pre-emptive explanation (Kornell, Hays & Bjork 2009; Richland, Kornell & Kao 2009). At least once per session. Tell the learner on screen that guessing wrong is the design intent.

**3.3 Prediction beats presentation, and the gap must be visible.** A prediction component that does not render the discrepancy graphically has thrown away most of its effect (Kim, Reinecke & Hullman 2017).

**3.4 Space and call back.** Each session after the first opens with retrieval on prior material (Cepeda et al. 2006). Session 2 reaches back one session across the 14-day gap; Sessions 3 onward reach back two. *Fall 2026:* the retrieval bridge was designed but not run in Session 2 (audit F02). A designed callback that is skipped is worth nothing; it belongs in core, not appendix.

**3.5 Interleave domains; flag violations rather than reordering.** Interleaving forces strategy *selection* (Rohrer, Dedrick & Stershic 2015). In a short single-subject course it operates within sessions across the professional domains the case touches.

**3.6 Declare the spiral.** When a construct recurs at increasing depth, say the ladder out loud in one sentence. Current ladder: *why it happens (S1) → how often it happens (S3) → what it costs you (S4).*

**3.7 Manage cognitive load deliberately.** Segment to one working-memory span. Signal structure. Remove decorative material. Do not narrate on screen what is already written on screen. *Fall 2026:* about 35 new terms in Session 1 and 24 of 50 technical terms undefined at first use (audit); breadth, not depth, was the overload.

**3.8 Literal descriptive titles.** Noun phrases naming the content ("Marginal Rate vs. Effective Rate"), never action titles or jargon. The instructor reads the title aloud in three seconds and the room knows where "here" is.

**3.9 Prose density follows delivery mode.** Live files are teaching instruments; async files carry the full explanatory burden. Declare the mode. Session 0.1 is now async (pre-course setup) and needs the denser band (§15).

**3.10 Assignments are one discrete completed action** with an observable output: a file, an artifact, structured bullets. Simple to understand, demanding to execute, checkable against a list (§10).

**3.11 Engagement follows commitment and co-construction, not practicality alone.** *New in v2.0.* The Fall 2026 peaks, in learner turns per 10 minutes: class co-writes a prompt (S2, about 15); live skill build with the class choosing options (S1, about 14); a poll whose answer was surprising and checkable, then argument (S4 breach deadline, 8, the only learner-to-learner exchange of the term; S2 advisor fees, about 8); a numeric prediction then reveal (S5). The practical-but-narrated stretches drew near zero: the Cole IDGT walkthrough (S1, 13.5 min), the portability citation chase (S2, then 37 minutes without learner speech), the Cole anonymization walkthrough (S4, 10.8 min). Rule: an applied example is only as engaging as the decision it forces on the learner before the reveal.

**3.12 Case first, with a commitment.** *New in v2.0.* Each session begins on its case page: the finished advisor deliverable is set up as a problem, the learner commits (rank, predict, flag, hotspot) before seeing the finished version, and only then does the session teach how it was built. The case is the value proposition; the lesson is the method. A case shown without a commitment step reverts to the narrated walkthrough of §3.11.

**3.13 Core is what always runs; the appendix is depth.** *New in v2.0.* Each session splits into a core of about one hour that is always taught and an appendix of optional depth, filtered by an on-page control (foundational, standard, advanced). Gold links in the core point to the appendix material for that moment; every appendix section links back. Anything the session cannot afford to skip (the case opener, the retrieval bridge, the named discussion, the stated objective and closing check) is core by definition.

**3.14 Coverage is the binding constraint: cut before you add.** *New in v2.0.* Session 2 delivered 6 of 17 sections, about 49 of 150 allocated minutes and 0 of 19 designed interactions; the lesson file opened at minute 112 because Session 1 overflowed (H, audit). More material does not fix that; less material in core does. Every proposal to add content names what leaves core first.

---

## 4. Build parameters

**Single source of truth. When a number changes, it changes here.** Values marked (v2.0) changed this version; reasons are in §13.

| Parameter | Value | Rationale / trigger to revisit |
|---|---|---|
| Class block | 180 min | Fixed by institution |
| Mid-session break | 10 min, posted as a clock time | Break spent on 1:1 tech support in S2; protect it |
| Allocated instructional minutes | 150 | 15 break, 15 reserve for transition, failure, overrun |
| **Core minutes (v2.0)** | **About 60; Session 5 about 45** | S5 presentations take about 105 min. Core includes case opener, retrieval bridge, named discussion, objective and closing check |
| **Appendix minutes (v2.0)** | **Uncapped, depth-tiered** | The instructor selects live up to the 150 allocated; reported separately from core (EDITORIAL D15) |
| **Case opener (v2.0)** | **10 to 15 min, every session, from the case page** | Replaces the cold-open ritual (§13.1) |
| Retrieval bridge | 7 min, 4 ungraded items, Sessions 2+, in core | Skipped in S2 when it sat outside core |
| **Named discussion block (v2.0)** | **15 to 20 min, one per session, in core** | All six sat in the appendix in Fall 2026; zero ran in S1 or S2 |
| Distinct student-completed interactions | 13 to 15 per session file; **at least 6 in core (v2.0)** | Count includes core and appendix; core floor added so a core-only run still produces |
| Minimum per section | 1 | No section at zero |
| Per-section envelope | 3 to 16 min; named discussion exempt at 20 | From skill §4 |
| Maximum unbroken exposition | 12 min | S2 observed a 70-min gap between commitment devices |
| **New terms per session (v2.0)** | **About 12, each defined on first use, glossary card on page** | S1 introduced about 35 |
| Prose density | 37 to 42 words per allocated minute, **reported only** | Method unratified (EDITORIAL D15) |
| Distinct component types per session | ≥6, never the same type in consecutive sections | Prevents monotony |
| **Zoom polls per session (v2.0)** | **4 designed and run; formats vary across the term** | Replaces 6-designed / 4-selected. Every Fall 2026 poll was single-choice |
| Poll formats in rotation | Single choice with a surprising checkable answer; multi-select; numeric-range prediction; ranking or short answer | Not all four every session. Build ahead; students are not co-hosts during polls |
| Split-the-room trigger | Rating-scale mean < 3.5, max 2 per session | Designed for N=20; under review for N≈8 (§15) |
| Section gating | NONE, removed course-wide | §1.10, §13.2 R1 |
| Instructor override | Shift+U, one-way, labeled in the top bar | Findable by a substitute |
| **Case page (v2.0)** | **One per session, 20 to 30 min of student work, visually distinct from lessons** | §5.6 |
| **Final-project presentation slot (v2.0)** | **8 min talk + 2 min builder response + 3 min questions** | 0 of 7 met the old 5 to 6 min |
| **Fact re-verification (v2.0)** | **Week before each session, against FACTS.json sources** | Four Claude models launched in five weeks of fall 2026 |
| **Assignment rubric shape (v2.0)** | **About 80 points binary checklist + about 20 points one anchored judgment (3 written levels)** | §10 |
| Prompt-engineering level for Claude Code prompts | L2 light edits; L3 structural; L4 research-backed autonomous; L5 interactive | prompt-engineer skill rubric |

---

## 5. The case spine standard

A single synthetic case runs through every session. It is the highest-leverage cohesion device available and it is cheap: it changes example nouns, not exercise mechanics.

**5.1 Byte-identical replication.** The case block in `CASE.md` is generated into every session file by the case pipeline and hash-checked (`verify-case.mjs`). Never paraphrase it per session. Drift breaks exactly the cohesion the case exists to create.

**5.2 A cast is not a spine; an unresolved question is.** What makes a case load-bearing is one live technical question the sessions each fail at differently. *v4 thread (retired):* an IDGT sale of a business interest. *v5 thread (open, §15):* to be ratified with the v5 case; candidate below.

**5.3 Case selection criteria, in priority order.**
1. **Checkable numbers over doctrinal grey areas.** Defined mechanics give a model specific things to get wrong in verifiable ways (§13.2 R2).
2. **An internal document conflict** the retrieval corpus can surface. The best retrieval failure is a fully sourced, materially wrong answer.
3. **Three or more professional domains** touched by one household.
4. **Exactly three confidentiality landmines**, each a fact a real practitioner would never enter into a consumer tool.
5. **Simplicity.** Round totals. Fewer line items, fewer names. The case is an anchor, not the subject.
6. **Avoid health, diagnosis and recovery details** where a business or family-dynamics fact does the same work (§13.2 R8).
7. **Audience fit (v2.0).** The case sits at or below the median learner's practice: a household the least experienced student could plausibly serve within a year. A case the room cannot parse cannot teach verification, because nobody can tell what is wrong (§13.2 R9).

**5.4 Escalating artifact chain, now case pages.** Each session's case page delivers one finished artifact; later cases may consume earlier ones. Every case page ships its own facts and a fallback so a student who missed a session is not stranded.

**5.5 The case is a classroom anchor, never the assignment substrate.** State it wherever the case is introduced. Students build on their own recurring tasks with their own synthetic data; a shared case would make peer handoff artificial (§13.2 R5).

**5.6 Case pages are a separate component (v2.0).** One page per session (`cases/case-N.html`), visually distinct from lesson pages (a case-file identity), with this order: case brief and facts; the learner's commitment; the finished deliverable (labeled synthetic and AI-assisted, with model and capture date); how it was built (prompt, model tier and why, verification steps, one failure caught, human-judgment points); a short check; a "Continue to the lesson" link. Lesson pages keep their session > section scroll format and are not rebuilt to accommodate cases.

**5.7 Renaming versus replacing (v2.0).** A case may keep its family name while every fact changes. When it does, every retired fact, entity and figure joins the purge list so no old fact survives anywhere served. Current state: Cole household v5 (Meg and David Cole, pre-retiree couple, about $2.45M investable, two children, an aging parent); v4 (IDGT sale, about $30M) retired.

*v5 candidate thread (not ratified):* "How much should the Coles convert to Roth, and when, before RMDs and IRMAA bite?" S1 misses a fact at intake (the stale beneficiary designation); S2 cites a wrong RMD age or rule; S3 retrieves a 2024 memo that contradicts a current plan feature; S4 asks what was logged and what was pseudonymized.

---

## 6. Component selection

Full specs and code are in the skill's `component-bank.md`. Selection rules:

- At least six distinct component types per session; never the same type in consecutive sections.
- Every component carries the citation for its mechanism in the source list.
- Prefer the file's existing interaction styles. **Do not bolt multiple-choice questions onto prose to hit a count**; if a count target produces padding, flag it.
- Vote → discuss → revote is the only component at ICAP Interactive and is live-only.
- **Highest observed yield (v2.0):** live co-construction (the class chooses each step of a prompt or skill) and polls whose answer is surprising and checkable against a primary source. Design at least one of each per session.
- **A walkthrough is not a component (v2.0).** An instructor demonstrating a finished analysis, however applied, is exposition. If a section's main activity is the instructor driving, it needs a commitment step before the drive.
- **Live demos run in a tool the students have open**, or the demo is replaced with a captured run (§2).

---

## 7. HTML build standard

- One self-contained file per page, inline styles and scripts, plain functions, no framework, no build step: editable in a text editor.
- Core/appendix architecture (§3.13): appendix sections carry `data-tier` (foundational, standard, advanced), a depth filter at the top of the page, gold links from core and back-links from appendix. Appendix counts and minutes are generated, never hand-typed.
- No section gating; reveal controls plus Shift+U.
- Accessibility: keyboard-reachable interactions, visible focus, semantic controls, sufficient contrast, non-color success indicators.
- Inline H/M/L chips on every factual claim, keyed to the generated footer. Volatile facts cite their FACTS id.
- A per-section minute table: core sums to the core target; appendix reported separately.
- A "Reading for Session N" card on every session page, generated from the reading list, within purge-rule phrasing.
- Captured model outputs carry model name and capture date; when the model is retired, the capture is re-run.
- Preserve on every edit: CSS and typographic system, JS architecture, verified data arrays, chips, source lines, charts.

---

## 8. Verification battery

**Run programmatically before delivery. Never verify by inspection. Scripts are evidence, not verdict: report what each check proves and what remains unverified.**

| Check | Method | Pass condition |
|---|---|---|
| Gating removed | grep lock classes and unlock handlers | Zero |
| Retired case names and facts purged | purge list grep over hub, lessons, cases, instructor notes | Zero |
| Grading/submission/LMS language | Tier A/B purge greps | Zero new hits |
| Case block integrity | `verify-case.mjs` hash check; `verify-migration.mjs` | Exit 0 |
| Volatile facts | `verify-facts.mjs` (retired values, stale reverify dates, dangling FACTS ids) | Exit 0 |
| Sources and chips | `verify-sources.mjs`, editorial checks | Exit 0, no new failures |
| Interaction count | count `data-task` roots per section | 13 to 15 per file, ≥6 in core, ≥1 per section |
| Minute arithmetic | generated appendix and timing regions | Core at target; show the arithmetic |
| Rendered arithmetic | recompute every on-page number independently | Matches |
| Charts | render pass | No NaN, undefined, or empty axes |
| DOM and interaction logic | jsdom or headless Chromium | All handlers bind |
| Visual | Playwright screenshot pass | Layout intact; case pages visibly distinct from lessons |
| **Derived thresholds after any content swap** | re-derive from the new content | Never assume old thresholds carry |
| Validator baselines | compare against prior run | Moved only on explicit instruction |

The derived-threshold row is the most common silent regression: any answer that is a property of specific text is invalidated when that text changes. The v5 case swap invalidates every such answer at once.

---

## 9. Live-session run protocol

### 9.0 Before the session (v2.0)

1. **Verified-facts pass.** Re-check every threshold, statute, vendor capability, price and citation you will say aloud against the session's verified-facts card. Fall 2026 put 17 correctable claims in front of students, several repeated after the Session 1 audit flagged them.
2. **Polls built in Zoom**, formats tested, students not set as co-hosts.
3. **Case page and lesson file open in tabs** before the room fills.

### 9.1 Session frame (v2.0)

- **Open the case page at minute zero.** Not the syllabus, not admin. Admin goes in a Canvas announcement. (S2 spent 9.7 minutes on admin and opened the lesson at minute 112.)
- **State one objective before minute 10** and close with a check at the matching Bloom tier. Neither happened in S1 or S2.
- **Run core first, appendix by choice.** If behind, cut appendix, never the discussion or the closing check.

### 9.2 The section loop: same moves, every section

1. Name the section: read the literal title aloud.
2. Set the task before the content.
3. Poll if this is a poll section: predictions before content, comprehension after, never mid-exercise.
4. Silent work. State the duration and go quiet.
5. **Wait three seconds after a genuine question**, especially in your fluent domains. S2 measured 0.57 silences of 3+ seconds per minute in AI-mechanics content and 0.00 in the estate and fee blocks (H, audit): the gate fails exactly where you know the most. Ask once; do not reformulate before someone speaks.
6. Call on the distribution, not the volunteer.
7. Reveal.
8. Say the confidence label aloud once per body block (amended from once per section; §15).
9. Bridge in one sentence.

### 9.3 Poll design standard

A poll that cannot change the next ten minutes is a quiz. Every poll carries a decision rule keyed to its distribution. Four per session (§4), drawn from: prediction before reveal; comprehension check with diagnostic distractors; anonymous practice-reality poll (anonymity set at creation); calibration pair. The two best discussions of Fall 2026 both opened on a single-choice poll with a surprising, checkable answer tied to practice (advisor fees; the Reg S-P breach clock). Build every poll before class.

### 9.4 Split-the-room protocol

Trigger: rating-scale mean below 3.5, max twice per session. Own the number; harvest the low end in chat; route to the high end and wait eight seconds; correct at the margin; re-ask in ninety seconds. *Small-N note:* with 6 to 8 learners the distribution is three or four people; prefer naming the choice over the mean (§15).

### 9.5 Discussion protocol

Select topics on one criterion: the room will actually divide. Ship a predicted split.

| Phase | Min | Mechanics |
|---|---|---|
| Position | 2 to 3 | Everyone commits before anyone speaks (poll or chat waterfall). Locked. |
| Defence | 7 to 9 | Alternating, 90 seconds each, minority first. At N≈8 this is most of the room: call by name. |
| Complication | 4 to 5 | One fact neither side raised, preferably a number on screen. |
| Re-vote | 2 to 3 | Both distributions shown; say nothing about the delta. |

A zero delta is a finding. **The discussion lives in core** (§4); in Fall 2026 all six were appendix and none ran in S1 or S2.

### 9.6 Opening: case first (v2.0)

The cold-open ritual ("paste your last prompt") is superseded by the case opener (§3.12): it was missed in two of two audited sessions, and the instructor finds the case opener easier to run consistently. The structural rule stays: **everyone contributes in writing, a minority speaks.** Written commitment gets 100% participation in minutes; verbal round-robin does not scale and invites status ladders.

---

## 10. Assignment alignment

The lesson files and Canvas are one system. Check these every build.

1. **Nothing is graded that was never assigned.** Trace every rubric line to the assignment that produces it. *Fall 2026 instance:* the Part 1 baseline time was graded and never captured. Fix: the baseline is self-timed and recorded in Homework 1.
2. **Nothing is due before the session that teaches it**, unless the early attempt is deliberate and graded as such.
3. **Do not duplicate in class what an async discussion already collected;** use the submissions as in-class material.
4. **Deadlines that gate downstream work move earlier.** Part 1 is due the Wednesday before Session 4, and packages route automatically (Canvas peer review where available).
5. **Terminology collisions are teaching opportunities.**
6. **Every session that assigns homework names the citable sources** the lesson established for it.
7. **One page template for every assignment (v2.0):** task in one sentence; "Upload to Canvas" (exact file name, type, contents); "In class" if any; the checklist that is also the rubric; one due date in session language. State the spec once and reuse the wording in syllabus, Canvas and lesson (Fall 2026 stated the Part 1 deadline three ways and the presentation length three ways).
8. **Rubrics are mostly checkable (v2.0):** about 80 points of met/not-met items, about 20 points from one judgment question with three written levels. If a strict reading of the rubric would fail most of the class, the rubric is wrong, not the leniency (Fall 2026 graded Part 2 on a spoken five-item checklist, not the written 35/25/30/10).
9. **Package specs prevent content failures, not just file chaos (v2.0).** The final-project handoff is one `.zip` with a `readme.txt` in fixed headings, sample inputs for two clients, and a self-run check the builder completes alone. Most Fall 2026 handoff failures were content (dead links, model unstated, input format undefined), which a zip alone does not fix.
10. **Canvas file types are configured and tested before term (v2.0).** Canvas rejected .txt and .md in Fall 2026 while the assignment allowed them.

---

## 11. Voice and prose

- Analytical, direct. No flattery, no preamble, no restatement.
- Lead with a quantified summary and the recommendation, benchmarked against rejected alternatives.
- Weighted-criteria tables for comparisons; ranked lists for recommendations; "not recommended" verdicts where earned.
- Quantify. Show timing, counts and arithmetic.
- Never soften a negative assessment. Never repeat yourself.
- **Dashes (v2.0, resolves skill D-2026-08-18-2):** newly authored text, in lessons and everywhere else, uses no em dashes; existing student copy keeps its dashes until rewritten (EDITORIAL D1). Use commas, colons, periods or parentheses.
- Student copy keeps the same spine with a teaching cadence: short declaratives, the mechanism named, the consequence stated.

---

## 12. Working conventions

**12.1 Canonical source.** Rank sources of truth: (1) a file attached in the current conversation, as a dated snapshot; (2) a dated repo or connector sync; (3) nothing else. Conversation history, summaries and memory are recollection, not state. Never reconstruct lesson content from them. Two attachments claiming to be the same artifact and conflicting: halt and surface a per-section diff.

**12.2 Surface routing.** The Claude Project is the deliberation, verification, research and prompt-authoring surface; it also owns syllabus, Canvas and .docx/.pptx artifacts. Claude Code owns everything in the repo. A request to edit a repo artifact from the Project becomes a Claude Code prompt, not an edit.

**12.3 Session-build isolation.** Build one session per pass; audit all at once. Cohesion lives in `CASE.md` and `FACTS.json`, not in context.

**12.4 Shared components are built once** and reused byte-identically (discussion block, retrieval bridge, case viewer, live-console fences).

**12.5 Deliverable formats.** Curriculum artifacts ship as files. Analysis stays in chat unless longer than about a page. Copy-paste prompts ship as Markdown, never .docx (smart-quote corruption).

**12.6 Claude Code execution rules (v2.0).**
- Single-threaded; no subagent fan-out (a multi-agent run exhausted the monthly spend limit).
- Multi-phase work runs from **one kickoff prompt plus a runbook** saved to the repo, autonomous to completion, with `PROGRESS.md` and `DECISIONS.md` as the resume and audit trail. Never five prompts in succession.
- One branch per run; never commit to `main`; Jared merges.
- Validator baselines move only on explicit instruction.
- Model choice: Fable for diagnosis and judgment-heavy builds; Opus for mechanical extraction and sweeps. State the recommendation outside the prompt block.
- When Claude Code output comes back: summarize; list every open question self-contained, blocking first; then write the next prompt.

**12.7 Measure before advising.** Never assert repo state without a named read. Never approximate a Wolfram quotation: only byte-verified spans from an instructor-supplied source, with the section name (EDITORIAL A11, A12).

**12.8 Autonomous decision rule.** When a run cannot stop to ask: choose the more reversible option (demote rather than delete; placeholder rather than invented content; failing-and-documented rather than re-baselined), log it, continue.

**12.9 Session triggers.** `EXECUTE`, `AUDIT` (two passes, find first, filter second), `DELTA` (name every ripple), `DESIGN` (deliberation only), `VERIFY` (run §8), `SCAFFOLD` (new session stubs), `HANDOFF` (one fenced Claude Code prompt: Repo/Branch/Base, Read first, Task, ranked Constraints, Must pass, Out of scope, Report back).

**12.10 Teaching-review loop (v2.0).** Each delivered session gets a transcript and a pedagogical audit against a fixed rubric; findings become at most three focus skills carried into the next session's run sheet. Fall 2026 baselines: S1 49.5/100; S2 50.0 to 51.5/100 depending on audit revision (lowest dimensions: content accuracy and delivery mechanics). Audit S3 to S5 next term; Fall 2026 has no audit for them.

---

## 13. Decision register

Append-only. Never delete an entry; supersede it with a newer dated one.

### 13.1 Adopted

| Date | Decision | Reason |
|---|---|---|
| 2026-08 | ~~Weekly "paste your last prompt" ritual, all sessions~~ **Superseded 2026-10-11 by the case opener** | Original: artifact over opinion, status-flat. Superseded: missed in 2 of 2 audited sessions |
| 2026-08 | Written capture for niche and role information; verbal for volunteers only | Round-robin costs time for information collectable in 90 seconds |
| 2026-08 | 20-minute named discussion block every session, locked vote → defence → re-vote | Scheduled discussion had totaled 7 minutes across 15 hours. **Amended 2026-10-11:** 15 to 20 min and in core |
| 2026-08 | Interaction parity target of 13 to 15 per session | Measured spread was 3.2 / 2.0 / 0.7 / 1.1 controls per 10 min. **Amended 2026-10-11:** at least 6 in core |
| 2026-08 | Retrieval bridge opening Sessions 2 to 4 | 14-day gap; no prior-session retrieval. **Amended 2026-10-11:** core, not appendix |
| 2026-08 | Case spine across all sessions with escalating artifact chain | Case had appeared in S1 only. **Amended 2026-10-11:** the chain lives on case pages |
| 2026-08 | Mechanistic spine retired explicitly at Session 4 | Naming the terminus beats forcing a fourth scope |
| 2026-08 | ~~Efficiency baseline assigned in Session 1, on-page~~ **Superseded 2026-10-11: self-timed in Homework 1** | Never captured live in S1 |
| 2026-08 | Handoff deadlines 48 hours before the distributing session | Gives downstream work time |
| 2026-08-18 | Google Fonts exception to §1.8; live-model console exception (runtime, user key, named sessions) | Corpus practice; offline fallback stacks |
| 2026-08-18 | 180-min block, 150 allocated, break as clock time, timing table with alloc/nosum rows | Ratified from Session 2 build |
| 2026-08-23 | `CASE.md` v4.0 as the canonical case with generated, hash-checked injection | Byte identity makes drift detectable |
| 2026-08-25 | `SOURCES.md` as the single source of chips and footers, injected on the CASE pattern (EDITORIAL D8, D9) | One source for tooltip and table |
| 2026-08-25 | Report core and appendix minutes separately; density band reported, not enforced (EDITORIAL D15) | Density method unratified |
| 2026-08-27 | No grading, submission or due-date language on lesson pages; LMS not named in the repo | Canvas is the authority; the platform can change between cohorts |
| 2026-09 | Single-threaded Claude Code execution | Multi-agent fan-out exhausted the spend limit |
| 2026-10-02 | Session 5 page built at reduced minutes; presentation logistics in instructor notes | Presentations shorten the class |
| 2026-10-11 | **Engagement rule:** commitment and co-construction before any applied example (§3.11) | Fall 2026 transcript evidence: peaks 8 to 15 learner turns per 10 min vs. near zero for narrated cases |
| 2026-10-11 | **Case-first opener from a separate case page per session** (§3.12, §5.6) | Instructor decision; easier to run than the cold open; evidence above |
| 2026-10-11 | **Core about 60 min, appendix uncapped and depth-tiered** (§3.13, §4) | Coverage was the binding constraint (§3.14) |
| 2026-10-11 | **Cole v5: keep the name, replace every fact with a mainstream pre-retiree household (about $2.45M); v4 facts purged** (§5.7) | Audience fit (§5.3.7); student workflows were mainstream |
| 2026-10-11 | **Session 1 hands-on in each student's own paid account; account required before S1**; Session 0.1 becomes a self-paced setup page | Nobody had an account at S1 minute 17 |
| 2026-10-11 | **New-term cap about 12 per session, all defined on first use** | About 35 in S1; 24 of 50 undefined |
| 2026-10-11 | **4 Zoom polls per session, formats varied, built ahead, no student co-hosts** | All single-choice; two format attempts failed on setup |
| 2026-10-11 | **Central FACTS registry plus validator; re-verify the week before each session** | 17 correctable claims; four model launches in five weeks |
| 2026-10-11 | **Assignment template and 80/20 checklist rubrics; single .zip + readme.txt handoff; build transcript moves to Part 2; 8 + 2 + 3 presentation slot; 4 task-based discussions** (§10) | Canvas text caused the recorded breakdowns |
| 2026-10-11 | **Readings: Wolfram plus at least one per session; about one video per two sessions, watched outside class** | Instructor decision; Laplace unread |
| 2026-10-11 | **Autonomous runbook execution for multi-phase repo work** (§12.6, §12.8) | Instructor will not paste multiple prompts in succession |

### 13.2 Rejected and reversed: do not re-propose

| ID | Rejected | Reason |
|---|---|---|
| **R1** | Section gating / checkpoint locks | Fragile; students do not work ahead. Removed course-wide |
| **R2** | A doctrinal grey-area transaction as the case spine | No checkable numbers |
| **R3** | Self-assessment and anecdote openers | Status ladder in minute five; surfaces hype |
| **R4** | Verbal round-robin introductions | Cost scales with N; diminishing information |
| **R5** | The shared case as a final-project dataset | Flattens practice contexts; artificial handoff |
| **R6** | Building all sessions in one conversation | Output arithmetic; cohesion belongs in files |
| **R7** | .docx for copy-paste prompts | Smart-quote corruption |
| **R8** | Health or recovery details where a family-dynamics fact works | Lower risk, equally sharp |
| **R9** | A UHNW case (v4: about $30M IDGT business sale) as the spine for a mixed, early-career room | Silence where verification should happen; above the median learner's practice |
| **R10** | "One email, body See attached" as the handoff mechanism | No recipient defined; manual forwarding; one student without a package 7 days out |
| **R11** | Weighted judgment-only rubrics (15/30/25/25/5; 35/25/30/10) as the grading instrument | Not observable from a submission; abandoned in practice for a spoken checklist |
| **R12** | Named discussions placed in the optional appendix | Zero ran in S1 or S2 |
| **R13** | A full session dedicated to other AI vendors | Breadth caused the S1 overload; one comparison section instead |
| **R14** | The Claude interface feature tour as Session 1 core, demonstrated to a room without accounts | About 27 minutes of tour inside a 41-minute walkthrough (0:31 to 1:12) with no learner turns; moved to the self-paced setup page |
| **R15** | Multi-agent fan-out in Claude Code | Exhausted the spend limit |
| **R16** | 5 to 6 minute final-project presentations | 0 of 7 complied; 8 minutes adopted |
| **R17** | Pasting a sequence of phase prompts into Claude Code | Replaced by one kickoff plus runbook |

---

## 14. Changelog

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-08-16 | Initial file: principles, parameters, case standard, verification battery, live protocol, assignment alignment. |
| 2.0 | 2026-10-11 | Post-term revision from Fall 2026 evidence. Added cross-file precedence (§0); non-negotiables 1.10 to 1.13 and the §1.8 exceptions; audience evidence (§2); principles 3.11 to 3.14 (engagement, case first, core/appendix, coverage); §4 recalibrated (core 60, discussion and bridge in core, polls 4 with varied formats, term cap, presentation slot, fact re-verification, rubric shape); case audience-fit criterion, case pages, rename-versus-replace (§5.3.7, §5.6, §5.7); §9 pre-session pass, session frame, three-second gate evidence, case opener; §10 items 7 to 10; dash policy resolved; §12 surface routing, Claude Code rules, autonomous rule, review loop; register entries through 2026-10-11 and R9 to R17. Section numbers cited by CASE.md (§1.8, §5.3.4, §5.5) preserved. |

---

## 15. Under review: unresolved

Do not treat any of these as settled; ask before acting on them.

1. **Small-N calibration of §4 and §9.** Parameters were written for N≈20 (the S2 audit called the protocol possibly "the wrong instrument for an eight-person room"). Interaction counts, split-the-room means and two-per-side defence may need N≈8 variants.
2. **Validator semantics for core/appendix.** The skill validator sums 150 minutes exactly; v2.0 targets core about 60 with an uncapped appendix. The timing table and validator V5 need a core-sum rule before the next build passes cleanly.
3. **The v5 case's unresolved question** (§5.2). Candidate thread written in §5.7; not ratified.
4. **Interaction count as the parity metric.** A one-click reveal and a five-minute sandbox still count equally. No weighted measure yet.
5. **Async density band.** Session 0.1 is now self-paced. It needs its own density figure and a component-substitution rule (no vote → revote).
6. **Confidence-label read-aloud.** Amended to once per body block (§9.2); never observed live in Fall 2026. Validate next term.
7. **Poll decision rules.** Designed but rarely fired; record which fire next term and prune.
8. **Student sentiment evidence.** Fall 2026 evaluations, typed polls and chat exports were not in the evidence set; "Session 1 was too advanced" rests on instructor recall. Collect them next term.
9. **Skill alignment.** The interactive-lesson-builder skill's `pedagogy.md` (v3.1) diverges from this file on the cold open, discussion placement, poll quota and timing semantics. Either update the skill to defer to the repo's `PEDAGOGY.md` on course parameters, or keep both and let §0 precedence decide.
10. **Spoiler covers.** v1.0's open item: reveal controls plus Shift+U have served without them. Propose closing unless a case page needs one.
