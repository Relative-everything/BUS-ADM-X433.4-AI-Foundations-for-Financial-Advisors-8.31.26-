Session 0.1 build specification
"The Control Surface: what every setting actually does to one inference"

Mode: DESIGN (pedagogy.md s12.6). Deliberation only. No HTML has been built. This document is the input to a later EXECUTE, run in Claude Code inside the course repo.
Drafted: 2026-08-20 Skill: interactive-lesson-builder v3.0 (pedagogy.md v3.0, component-bank.md v2.0) Product surface verified against first-party sources: 2026-08-20 (see s10 Evidence ledger) Status: blocked on seven decisions in s1 and s15. Do not run EXECUTE until they are resolved.

s0. What this document is
A granular build plan: section map, per-section contracts, the data model for the flagship interactive, the evidence ledger, the exact validation commands, and every downstream ripple. It is written so a Claude Code session can execute it without re-deriving anything.
What it deliberately does not contain: invented token counts, invented citations, invented harvest line numbers, or a resolution of any collision the user has to decide.

s1. Premise audit (pedagogy R7: challenge before answering)
Seven collisions between the request and the ratified parameters. Each is flagged, not resolved (R6). Severity is my assessment; the decision is yours.

PA-1. "Lesson .1" is not a valid session identifier. HIGH.
The repo shape is session-N/index.html and new_session.py takes --n <int> (repo-workflow.md). validate_lesson V10 matches <title> against Session\s+(\w+) and requires the same token in the footer. A literal "Session .1" captures nothing after the whitespace and V10 degrades to WARN, which is a silent identity failure across the hub, the lesson title, and the footer.
Recommended: title Session 0.1 | The Control Surface, directory session-0.1/ (corrected from an earlier draft that assumed --n was typed as an integer; see the evidence annex, section C1, for the verification against the scaffolder's actual source), topbar Session 0.1 · Cole household. V10 captures 0 and finds Session 0 in the footer by word boundary. Verified against the regex, not assumed.
Rejected: renumbering the existing course so this becomes Session 1. Cost: every hub card, every CHANGELOG heading, every delivered-session git tag, and the assignment calendar's session references. Not worth it for a primer.
Also needs deciding: does new_session.py accept a non-integer --n? It takes --n 5 in the documented recipe. If it coerces to int, the scaffold must be run manually by copying assets/template.html instead. Flagged as a build-time branch in s12.

PA-2. "Very few sections" collides with the per-section envelope. HIGH.
Ratified: sections run 3 to 16 minutes (pedagogy s4). At the ratified 150 allocated minutes, the arithmetic floor is 150 / 16 = 10 sections. "Very few sections" and "150 allocated minutes" cannot both hold. One of them has to give.
Recommended: keep the ratified per-section envelope and give the lesson 12 sections across 120 allocated minutes in a 150-minute block. The 30-minute reserve is preserved in absolute terms from the ratified structure (D-2026-08-18-3). This requires only --minutes 120 on the validator, not an amendment to the envelope.
What this costs: a pedagogy s4 register entry ratifying a second block format for the 0.x series. One entry, one version bump.
Rejected: 4 to 5 sections of 25 to 30 minutes each. It breaks the envelope, breaks the 12-minute unbroken-exposition ceiling, and produces the exact failure the envelope exists to prevent: a long interactive with no narrative checkpoints, where a student who loses the thread at minute 6 has no re-entry until minute 30.
The user's actual goal is satisfiable anyway. "Very few sections, extreme interactivity" is really a request for high interaction density. Keeping the ratified 13 to 15 interaction band at 120 minutes instead of 150 raises density from one interaction per 10.7 minutes to one per 8.6 minutes, a 24 percent increase, with no parameter amendment at all. The density comes from the interaction budget, not from section count.

PA-3. "~50 unique output examples" understates the space by three orders of magnitude, and a lookup table is the wrong architecture. CRITICAL.
Computed, not asserted (scripts/state_space.py, output quoted in s7.2):
Quantity | Value
Legal configurations, dependencies enforced | 38,016
Naive independent grid, no dependency pruning | 138,240
Illegal states a naive grid would expose | 100,224 (72.5 percent of the grid)
Coverage of a 50-cell hand-written lookup | 0.132 percent
Configurations left as dead ends by that lookup | 37,966
A 50-cell lookup table is not a simplification of the space. It is a 0.132 percent sample that will hit a dead end on the first configuration a student invents.
Recommended: a compositional delta engine. One captured base output per probe prompt (3), plus one authored delta fragment per control value that changes the output (23), for 26 authored strings covering all 38,016 legal states, roughly 1,462 states per string. The output panel renders base(prompt) + Σ active deltas, each fragment attributed on hover to the control that produced it.
Why this is also better pedagogy, not just cheaper: a lookup table teaches "this combination produces that output," which is memorisation with no transfer. Composition teaches "each control injects a specific thing into context, and the output is the sum," which is the actual mental model and transfers to controls that ship after the class.
The cost, stated plainly: composed prose is a construction, not a transcript. Everything composed is chipped L and badged .sim. See PA-5.

PA-4. The controls are not independent, and the dependencies are the most valuable content in the lesson. HIGH.
Verified dependencies (all H, sourced in s10):
Constraint | Source
Haiku 4.5 has no effort selector and no adaptive thinking | src-effort, src-models
Extended thinking cannot be turned off in Claude on Opus 5 | src-effort
Fable 5 adaptive thinking is always on | src-models
Extra high (xhigh) requires Opus 4.7 or newer | src-effort
Skills require code execution enabled | src-skills
Automatic context management requires code execution enabled | src-ctxwindow
Enterprise admins can remove models and effort levels per role | src-effort
Research engages five or more tool calls, web search one or two | src-tools3
A grid of freely combinable toggles would teach a false model of the product. The inspector must render illegal states as visibly disabled with an on-hover reason, because 72.5 percent of the naive grid does not exist. This is a [NEW] behaviour and is specified in s7.4.

PA-5. Per-toggle token costs are not published. Do not print numbers as if they were. HIGH.
First-party guidance says tools and connectors are "token-intensive" and advises limiting how many are active (src-ctxwindow). That is a direction, not a magnitude. No first-party figure exists for "a connector costs N tokens."
Every per-block token figure in the budget bar is L and carries the .sim badge.
The ordering claim (connector tool definitions and project knowledge dominate; profile instructions and skill frontmatter are small) is M, stated as an ordering, with the derivation shown.
The window sizes are H: 1M for Fable 5, Opus 5, Sonnet 5; 200K for Haiku 4.5 (src-models); 500K for the 4.x tier in chat and 200K outside those models (src-ctxwindow).
Do not let the bar render a total token count that looks authoritative. Render percentages of window with an explicit "illustrative proportions" label.

PA-6. The live-demo window is tight against Research latency. MEDIUM.
Research is described as five or more tool calls over one to three minutes (src-tools3). Three live runs including one Research run consumes three to five minutes of pure wall clock before any narration, against a 10-minute total budget.
Recommended: three live runs, none of them Research. Research ships as a pre-captured artifact shown on screen. Runbook in s9 budgets to 9 minutes with a 90-second slack.
Second failure mode nobody plans for: a live demo in front of a room depends on the network, on your usage limits, and on a model menu that may have changed that morning. s9 specifies a pre-captured fallback for every run, embedded in the page, revealed by the instructor with one click.

PA-7. This lesson has a shorter half-life than anything else in the corpus. HIGH.
Evidence of the decay rate from the sources themselves: the beta and research preview table is dated 2026-07-07; the effort article was updated roughly three weeks before 2026-08-20; the skills article roughly two weeks before. Three of the eight primary sources changed inside a month.
Architectural response, and this is the single most important build decision in the document: every enumerated product fact lives in one JavaScript data array named SURFACE, near the top of the script block, with an asOf field per record. Re-verifying the lesson next term is an edit to one array, not a sweep through twelve sections of prose. Prose refers to the surface generically; the array carries the specifics.
Plus a printed as-of block in s1 of the lesson and the standing verify-before-relying line (evidence-standards.md).

s2. Phase 1 gap report (SKILL.md Phase 1: name what is absent, do not pad)
Required input | Status | Resolution in this spec
Session title and number | PARTIAL | Number decided in PA-1, pending your confirmation. Title proposed: "The Control Surface."
Total minutes | MISSING | Proposed 120 allocated in a 150-minute block (PA-2). Needs your ratification.
Section titles with rough timings | MISSING | Constructed in s4. Every minute figure is mine, not yours.
Learning objectives | MISSING | Constructed in s3. Derived from the request, not supplied.
Source material with claims to cite | MISSING | Built from first-party docs in s10. You supplied no sources.
Delivery mode, live or async | AMBIGUOUS | "Run live each session" implies live. Assumed live, which sets lean prose (s3.9). If this is async pre-work, prose density rises and s9 changes shape.
The running case | MISSING | Proposed: Cole, used as the substrate for the probe prompts (s5). Needs confirmation.
Series arc for the 0.x lessons | MISSING | Proposed in s14. This is a COURSE.md change, not a lesson change.
Whether 0.1 precedes or follows Session 1 | MISSING | Determines whether a retrieval bridge is required (s6). Blocking.
Nine of nine required Phase 1 inputs are absent or partial. Everything in s3 through s9 is a judgment call made in their absence, and each one is labelled where it is made.

s3. Learning objectives (constructed, needs your sign-off)
By the end of Session 0.1 a participant can:
1. Name the five layers assembled into every inference (system, persistent personalisation, retrieved knowledge, invoked tools, the current turn) and say which control populates each.
2. Predict the direction of change in an output from a stated configuration change, and name the layer that carries the change.
3. Identify the illegal states: which controls are unavailable on which models, and why that is a product constraint rather than a UI quirk.
4. Read an output and infer the configuration that produced it, from four diagnostic signals (citation presence, thinking block, response length and hedging, tool-call evidence).
5. State the firm's own default configuration for three named task types, with the controls that are off by policy and the reason each is off.
Objective 4 is the one that survives the product changing. It is deliberately weighted heaviest in the section map (s9 of the lesson, plus the discussion block).

s4. Section map (SKILL.md Phase 2). Build only after this table is confirmed.
Delivery mode: live. Case: Cole. Block: 150 minutes, 120 allocated.
# | id | Title | Min | Category | Component (data-comp) | ICAP | Interaction contract | Source + confidence
0 | s0 | Cold open: paste it, then name what you assumed | 8 | Ritual | timed-ritual | C | Standing cold-open form, identical shape to S1 s1b. Paste the last prompt you ran at work; the analyser names which layers it relied on. Gate on submit. | Ritual, no external claim
1 | s1 | One inference, five layers | 7 | Frame | prediction-commit (+ case-modal-spine) | C | Binary commit before any content: "does turning Research on change what Claude knows, or only how it answers?" Reveal addresses both branches. Case block pasted byte-identically; synthetic label at introduction. | src-tools3 H, src-ctxwindow H
2 | s2 | Four models, on the numbers | 10 | Content | commit-first-mcq | C | Five items, domain-chipped by task type (research memo, bulk classification, long agentic build, client email, tax lookup). Options are the four current models. Per-option feedback corrects the chosen wrong answer using price, context window, and cutoff. | src-models H
3 | s3 | Two dials people conflate: effort and thinking | 10 | Content | parameter-sandbox | A | Effort slider low → max drives a chart of thoroughness against latency and usage burn, plus an interpretive readout. Thinking toggle sits beside it and is forced on when the model is Opus 5, with the reason printed. | src-effort H; curve shape L .sim
4 | s4 | The context window inspector | 16 | Flagship | ctx-inspector [NEW] | C | Full spec in s7. Control rail, context stack with budget bar, output panel. Flipping a control lights a wire to the block it injects and recomposes the output. Gate at 6 distinct controls exercised. | Composite; every block cites its own source
5 | s5 | The retrieval ladder: nothing, search, research | 9 | Content | estimate-then-reveal | C | Guess the tool-call count and wall-clock for each rung on a log scale, then reveal the first-party figures: one to two calls for search, five or more over one to three minutes for research. | src-tools3 H
6 | s6 | What persists, and what dies with the tab | 10 | Content | two-bucket-sorter | C | Twelve chips into "survives this chat" / "dies with this chat". Three designed landmines: incognito on a Team plan, paused memory, a project knowledge file. Per-item why. | src-memory M, src-personalization H, src-ctxwindow H
7 | s7 | Skills, connectors, plugins: three things people call the same thing | 10 | Content | multi-column-sorter | C | Fifteen capability chips across three columns. Instructor key reveals only after all fifteen are placed. Framing invites argument with the key. | src-skills H, src-directory H, src-plugins UNVERIFIED
8 | s8 | Live: one prompt, three configurations | 10 | Demo | builder-assembler | C | Students assemble the configuration card for each run as it happens; the output is the pasteable config line they will use at their desk. Pre-captured fallback behind a reveal. | Captured live, chipped H-to-capture
9 | s9 | Read the output, infer the configuration | 8 | Assessment | symptom-diagnoser | A | Six output symptoms ("no citations but current facts", "thinking block absent on Opus 5", "cites a file you never uploaded"). Each returns likely cause pointed back at its own section, plus the fix. Gate at four reviewed. | Composite, per-item chips
10 | s10 | Discussion: which controls does this firm turn off? | 15 | Discussion | sealed-vote-debate | I | Four-phase machine. Three positions, prepared cases for all three. One complication after both sides speak. Re-vote, per-student delta, room tally. | Contested judgment; .verify gated
11 | s11 | Baseline capture and what 0.2 answers | 7 | Ritual | timed-ritual | C | Baseline form with completeness enforcement and the "this page stores nothing, write it down" line. Spiral statement printed. | Ritual

Timing arithmetic, shown
8 + 7 + 10 + 10 + 16 + 9 + 10 + 10 + 10 + 8 + 15 + 7 = 120
Allocated: 120, tolerance 0.
Block: 150. Reserve: 30 (break posted as a clock time, transitions, overrun).
No shortfall. No absorption proposal needed.
Validator invocation must carry --minutes 120 or V5 fails against its 150 default.

Diversity check
Distinct data-comp values: 13 (timed-ritual, case-modal-spine, prediction-commit, commit-first-mcq, parameter-sandbox, ctx-inspector, estimate-then-reveal, distribution-picker if s5 swaps, two-bucket-sorter, multi-column-sorter, builder-assembler, symptom-diagnoser, sealed-vote-debate). Minimum is 6. Pass with large margin.
Distinct data-task roots: 14, inside the ratified 13 to 15 band.
Section | Tasks
s0 | t-coldopen
s1 | t-frame-predict, t-case
s2 | t-model-tier
s3 | t-effort-dial
s4 | t-ctx-inspector, t-ctx-budget-guess
s5 | t-retrieval-ladder
s6 | t-persistence-sort
s7 | t-pack-sort
s8 | t-config-card
s9 | t-output-forensics
s10 | t-controls-debate
s11 | t-baseline
Adjacent-repeat check (V6 reads the first data-comp per section): timed-ritual → case-modal-spine → commit-first-mcq → parameter-sandbox → ctx-inspector → estimate-then-reveal → two-bucket-sorter → multi-column-sorter → builder-assembler → symptom-diagnoser → sealed-vote-debate → timed-ritual. No adjacent repeats. Pass.
DOM-order dependency. s1 carries two roots. case-modal-spine must appear first in the section's markup or V6 reads prediction-commit and the check still passes, but the map and the file disagree. Fix the order at build time; do not leave it to chance.

Interleaving violations flagged, not fixed (pedagogy s3.5)
FLAG-1, MEDIUM. s6 (two-bucket-sorter) and s7 (multi-column-sorter) are distinct family keys, so V6 passes, but both are chip-classification mechanics in adjacent sections. A student may experience them as the same mechanism twice, which teaches the mechanism rather than the content.
Argument for keeping: the decision rules genuinely differ. s6 asks a binary question about persistence; s7 asks a three-way question about what kind of artifact a thing is. The instructor key in s7 is the point, and family 12 has no key-reveal.
Argument for swapping: swap s7 to click-map-explorer over the unified directory, harvest anchor S1 s6 EMB. Cost: loses the instructor key, which is where the argument happens.
Recommendation: keep, and flag it on the page. But this is your call, not mine.
FLAG-2, LOW. timed-ritual opens and closes the lesson. Not adjacent, so no violation, and ritual stability is the point (s3.8). Noted for completeness only.

Retrieval-before-exposition (pedagogy s3.2)
FLAG-3, BLOCKING. No retrieval bridge is in the map, because 0.1 is proposed as the first lesson of the 0.x series and has no prior session to retrieve.
If 0.1 runs before Session 1: correct as mapped. No bridge.
If 0.1 runs after Session 1 as a remedial primer: a 7-minute, four-item bridge on Session 1 is required by s4, and 7 minutes must come out of the map. Recommended donors: s2 −2, s7 −2, s8 −3, giving 8 / 8 / 7 and a bridge at 7. New sum still 120.
You have to tell me which. I will not guess this one.
Retrieval before exposition is honoured within sections regardless: s1, s3, and s5 all commit a prediction or estimate before their content (s3.1, s3.3).

s5. Case integration (pedagogy s5, R4)
The lesson is about a control surface, not about planning analysis, so the case has to be put to work or it becomes decoration and V7 passes on a technicality.
Recommended: Cole is the substrate for all three probe prompts. The same household facts run through every configuration, which is what makes the outputs comparable.
P1, factual and cutoff-sensitive: a rate lookup relevant to the Cole transaction. Web search off returns a stale or hedged answer; on returns a current, cited one. This is the cleanest possible demonstration and it is a real advisor task.
P2, generative and personalisation-sensitive: draft the client email summarising the Cole meeting. Profile instructions, style, project instructions, and a skill each visibly change it.
P3, analytical and effort-sensitive: compare the options on the Cole transaction. Simulated in-page only, never run live (latency, PA-6).
Hard constraints:
Case block pasted byte-identically from CASE.md into the s1 panel and the modal (s5.1). Diff it, do not eyeball it (checklist B4).
"Synthetic" label within 600 characters of a case mention, or V7 fails (R4).
The case's landmine facts power s6 and s10. The confidentiality thread is the natural spine of the discussion block: what must never reach a consumer AI tool is exactly a question about which controls are on.
Session 0.1 must repeat the standing line that the case is not the students' final-project dataset (s5.4).
--purge must carry Okonkwo-Reyes (repo defect 1, D-2026-08-18-4) so this new file cannot inherit the live hub's case-name drift.

s6. The control surface inventory
This is what "every single setting" resolves to. It is the content spine, and it is the thing that goes stale (PA-7), so all of it lives in the SURFACE array, not in prose.

6.1 In-chat controls, the composer row
Control | Values | Constraint | Source
Model | Fable 5, Opus 5, Sonnet 5, Haiku 4.5 | Enterprise admins can remove models per role | src-models, src-effort
Effort | low, medium, high, xhigh, max | No selector on Haiku 4.5. xhigh requires Opus 4.7+. Defaults to high on Opus 5 and Sonnet 5 on API and Claude Code | src-effort, src-models
Extended thinking | on, off | Cannot be turned off on Opus 5 in Claude. Always on for Fable 5 (adaptive) | src-effort, src-models
Web search | on, off | One to two tool calls, factual queries | src-tools3
Research | on, off | Five or more tool calls over one to three minutes; spans web and integrations; longer cited report | src-tools3
Attachments | files, images, PDFs | Upload path | src-features (article list)
Style | default, custom | Distinct from instructions and from skills | src-personalization
Incognito | on, off | Ghost icon; not saved to history; still in Team data exports and retention | src-memory (M)

Teaching note. "Changes apply starting with Claude's next response" (src-effort) is the single most useful sentence in the whole surface for practitioners, because it means the configuration is a property of the turn, not of the chat. Put it on screen.

6.2 Sidebar and account-level controls
Surface | What it holds | Source
Customize > Skills | Installed skills, enabled by default on install, toggleable, directory-installed skills are view-only | src-directory
Customize > Connectors | Service catalogue, Connect starts auth | src-directory
Customize > Plugins | Bundles; installed plugin's skills become available in chat and Cowork | src-directory, src-plugins (UNVERIFIED)
Settings > Instructions for Claude | Account-wide, applies to all conversations | src-personalization
Settings > Capabilities | Code execution and file creation; gates skills and automatic context management | src-skills, src-ctxwindow
Settings > Memory | Search and reference chats; Generate memory from chat history; pause vs reset; project memory is separate | src-memory (M, needs full verification)
Projects | Project instructions plus project knowledge; knowledge served by RAG, not full-context | src-personalization, src-ctxwindow
Organization settings > Skills | Share with organization off by default; separate skill-sharing toggle; central provisioning | src-directory, src-skills

6.3 Surfaces beyond the chat box
Enumerated, not taught in depth: Claude Code, Cowork, Desktop and desktop extensions, mobile, Chrome, Excel, PowerPoint, Word, Outlook, Design, Xcode, Microsoft 365, Claude Security, API and Console. Source: the Features and capabilities collection index, src-features.
Design decision: these are a printed enumeration with links, not inspector axes. Adding surface as a 12-value axis multiplies the state space by 12 and adds nothing to the five-layer model. Flagged so the omission is visible rather than accidental.

6.4 Beta and research preview, as of 2026-07-07
Claude Managed Agents (RP), Claude Code usage tracking (beta), Claude Code Desktop (beta), Claude Code Security Center (RP), Claude Code web (RP), Code review (RP), Claude for Word (beta), GitHub integration (beta). Source: src-beta.
Ships as a dated table with the label semantics printed (research preview is earlier and more likely to change; beta is stable enough for regular use; not every feature graduates). The label semantics are the durable content; the table is the perishable content, and the page must say so.

s7. The flagship: ctx-inspector (section 4, 16 minutes) [NEW]
This is the component the request is really about. Specified to build level.

7.1 Layout
Three panes, single row at >= 900px, stacked below it (design-system layout rules).
+-- CONTROL RAIL ------+  +-- CONTEXT STACK ---------+  +-- OUTPUT --------+
| model    [4 chips]   |  | [ system ]         2%    |  | probe: P1        |
| effort   [5 steps]   |  | [ instructions ]   1%    |  |                  |
| thinking [on/off]    |  | [ project instr ]  1%    |  | <composed body>  |
| web search  [ ]      |  | [ project RAG ]    9%    |  |                  |
| research    [ ]      |  | [ skill frontmatter] <1% |  | ---------------- |
| code exec   [ ]      |  | [ skill body ]     3%    |  | signals:         |
| memory   [4 states]  |  | [ connector defs ] 14%   |  |  citations   yes |
| project  [3 states]  |  | [ memory ]         2%    |  |  thinking    yes |
| skills   [3 states]  |  | [ history ]        11%   |  |  tool calls  2   |
| connectors [0/1/5]   |  | [ this turn ]      1%    |  |  length      med |
| attachment  [ ]      |  | [ free ]           56%   |  |                  |
| instructions[ ]      |  |  budget bar, 1M window   |  | hover a line to  |
+----------------------+  +--------------------------+  | light its cause  |
                                                        +------------------+

7.2 State space, computed
Legal configurations (dependencies enforced): 38,016
Naive independent grid (no pruning):          138,240
Illegal states the naive grid would expose:   100,224 (72.5% of the grid)
 
Authored strings under composition:           26
States per authored string:                   1,462
Coverage of a 50-cell hand-written lookup:    0.132%
Dead ends a 50-cell lookup leaves:            37,966
Ship scripts/state_space.py with the lesson so the figure is reproducible rather than asserted. Its constraint list doubles as the illegal-state matrix in 7.4.

7.3 Data model, three flat arrays, ES5, no framework (R12)
/* WHAT EACH CONTROL INJECTS. One record per control value.
   tokens is an ILLUSTRATIVE PROPORTION of window, never a token count (PA-5). */
var CTXBLOCK = [
  {id:'sys',    lane:'system',   label:'System prompt',        pct:2,  when:'always',
   src:'src-none',  conf:'L'},
  {id:'instr',  lane:'persist',  label:'Instructions for Claude', pct:1, when:'always',
   src:'src-personalization', conf:'H'},
  {id:'projin', lane:'persist',  label:'Project instructions',  pct:1, when:'in project',
   src:'src-personalization', conf:'H'},
  {id:'projkb', lane:'retrieve', label:'Project knowledge (RAG)', pct:9,
   when:'relevant chunks only', src:'src-ctxwindow', conf:'H'},
  {id:'skmeta', lane:'retrieve', label:'Skill name + description', pct:1,
   when:'always, for every installed skill', src:'src-skills', conf:'H'},
  {id:'skbody', lane:'retrieve', label:'Skill body',            pct:3,
   when:'only when judged relevant', src:'src-skills', conf:'H'},
  {id:'conn',   lane:'tools',    label:'Connector tool definitions', pct:14,
   when:'every enabled connector, every turn', src:'src-ctxwindow', conf:'M'},
  {id:'mem',    lane:'persist',  label:'Memory summary',        pct:2,
   when:'memory enabled', src:'src-memory', conf:'M'},
  {id:'hist',   lane:'turn',     label:'Conversation history',  pct:11,
   when:'always, summarised near the limit', src:'src-ctxwindow', conf:'H'},
  {id:'turn',   lane:'turn',     label:'This message',          pct:1, when:'always',
   src:'src-none', conf:'L'}
];
 
/* WHAT EACH CONTROL DOES TO THE OUTPUT. 23 records. */
var OUTDELTA = [
  {id:'d-search-on', when:function(s){return s.search==='on'&&s.research==='off'},
   wire:'conn', adds:['inline citations','an as-of date'],
   reshapes:{toolcalls:'1-2'}, src:'src-tools3', conf:'H'},
  {id:'d-research-on', when:function(s){return s.research==='on'},
   wire:'conn', adds:['a longer synthesised report','citations across multiple sources'],
   reshapes:{toolcalls:'5+', latency:'1-3 min'}, src:'src-tools3', conf:'H'}
  /* 21 more, one per non-null control value */
];
 
/* THE THREE PROBES. Base output captured verbatim, dated, settings recorded. */
var PROBE = [
  {id:'p1', prompt:'<Cole rate lookup>',   base:'<captured>',
   captured:'2026-08-DD', settings:'Sonnet 5 / medium / search off', conf:'H'},
  {id:'p2', prompt:'<Cole meeting email>', base:'<captured>', /* ... */},
  {id:'p3', prompt:'<Cole options compare>', base:'<captured>', /* ... */}
];
Epistemic contract, non-negotiable. The three base strings are captured transcripts, chipped H against the capture date and the exact settings used. Everything composed on top is a construction, chipped L, and the panel carries a permanent .sim badge reading "Composed illustration. The base output is a captured run; the deltas are constructed." If this line is not on screen, the artifact violates R1 and R5 and does not ship.

7.4 Illegal-state matrix
Selection | Forces | On-hover reason (verbatim on page) | Source
model = Haiku 4.5 | effort disabled entirely | "Haiku 4.5 does not carry an effort selector." | src-effort, src-models
model = Opus 5 | thinking locked on | "Extended thinking cannot be turned off in Claude on Opus 5." | src-effort
model = Fable 5 | thinking locked on | "Fable 5 adaptive thinking is always on." | src-models
effort = xhigh or max | thinking cannot be disabled on API | "On the API, disabling thinking at xhigh or max returns an error." | src-effort
code execution = off | skills disabled, auto context management off | "Skills require code execution. So does automatic context management." | src-skills, src-ctxwindow
research = on | web search forced on | "Research runs web search among five or more tool calls." | src-tools3
project = none | project instructions and RAG blocks greyed | "These blocks exist only inside a project." | src-personalization
Disabled controls stay visible and greyed (--off / --off-bg), never hidden. A hidden control teaches that it does not exist; a greyed control with a reason teaches the constraint. That distinction is the whole point of the section.

7.5 Interaction behaviour
Click a control. It takes .act.
The context block it populates takes .on and an SVG wire animates from control to block (300ms, killed by prefers-reduced-motion).
The budget bar recomputes; free space shrinks. Crossing 70 percent of window flips the readout to .bad with the tools-and-connectors advisory (src-ctxwindow).
The output pane recomposes as base + Σ active deltas, each added fragment marked with a data-cause attribute.
Hovering an output fragment reverse-highlights its cause in the control rail. This is the assessment mechanic in disguise and the transfer target for objective 4.
The signals block (citations, thinking, tool calls, length) recomputes and is what s9 later tests.
Probe selector switches P1 / P2 / P3 without resetting configuration, so students see the same configuration hit three different task types.
Reset returns to the firm default configuration, not to empty.
Gate: mark('g4') at six distinct controls exercised, tracked in a JS object. Not four (too easy to hit by accident), not all twelve (nobody finishes in 16 minutes).

7.6 Failure modes to design against
Failure | Why it happens | Mitigation
Students read composed prose as a real transcript | It looks like output | Permanent .sim badge, L chips, base-versus-delta typographic distinction (captured text in body serif, composed deltas in a tinted inset)
Budget percentages read as authoritative token counts | Numbers imply precision | Render percentages only, never absolute tokens; "illustrative proportions" label
The wire animation reads as decoration | It is pretty | Wire terminates in the block label, and the readout names the layer in words. The prose carries the claim, not the animation
Three panes are unusable at 380px | Fixed row layout | Stacked at < 900px; wire degrades to a 4px --on left edge on the affected block; test at 380px before delivery (checklist B8)
16 minutes is not enough | Twelve controls, three probes | Instructor script drives four named controls; the rest are for the student to explore later. The gate is six, not twelve
The array goes stale mid-term | The product ships weekly | asOf per record, printed as-of block, one-array re-verification (PA-7)

7.7 Harvest provenance (R11)
ctx-inspector is [NEW] as a family, but roughly 85 percent of its code is harvested:
Part | Harvest anchor
Control rail toggles and live assembly | S1 s14b CIOPT builder (family 15)
Budget bar, chart and interpretive readout | S1 s3 wallDraw plus the family 6 skeleton in component-library.md
Readout state grammar (on / bad) | Family 6 contract
Output composition and pasteable output area | S1 s14b .sampler output pattern
Reset and full-state redraw | S1 s8 lab reset (family 8)
Wire drawing, illegal-state disabling, reverse-highlight | [NEW], approximately 50 lines
Register it as component-bank entry 19 only after it survives one delivery. A family that has run once is a mechanism, not a family.

s8. Per-section build notes
Detail beyond the map, for the sections where the map is not self-executing.
s0 cold open. Harvest S1 s1b coldGo verbatim. Do not redesign the ritual (s3.8). Only the analyser's heuristics change: they name which of the five layers the pasted prompt leaned on.
s1 frame. Case modal first in DOM (see the DOM-order note in s4). The five-layer diagram is a hand-built inline SVG on the chart conventions in design-system.md: class="ch", viewBox 700 wide, mono 10px labels, paired .readout and .src. No chart ships without both.
s2 models. Harvest S1 TQ / TLABEL (variant B, domain-chipped, score line). TLABEL becomes the four current models. Feedback strings must cite the deciding number: price per MTok, context window, or reliable knowledge cutoff. A feedback string that says "correct" and nothing else is a family 3 failure.
s3 effort and thinking. Family 6. The chart plots a constructed curve: no first-party quality-versus-effort curve exists. Chip L, badge .sim, and say on the page that the shape is illustrative and only the direction is sourced. When the model chip is Opus 5, the thinking toggle renders locked with its reason. That is the s4 preview and it is deliberate.
s5 retrieval ladder. Harvest S1 s4 GUESS. Log scale for the tool-call estimate. Never print the answer's magnitude in the slider label. Reveal shows the first-party figures and the error as a ratio.
s6 persistence sorter. Harvest S1 s13 ITEMS. Twelve chips, three designed landmines:
An incognito chat on a Team plan. Most will sort it as "dies with this chat". It is still in standard data exports and follows the organisation's retention policy. This is the highest-value single item in the lesson for an RIA. Verify against src-memory in full before it goes on screen.
A paused memory. Paused is not deleted; existing memory is retained but unused, and conversations during the pause are not summarised later.
A project knowledge file. Persists, but is not in context unless retrieval pulls it. The distinction between "stored" and "in context" is the lesson.
s7 pack sorter. Harvest S2 s9. Three columns: skill (procedural knowledge), connector (access to a service), plugin (a bundle). Key reveals only after all fifteen are placed. Sourcing: skills and connectors are H; plugins are UNVERIFIED, see s10.
s9 output forensics. Harvest S1 s14 DG. Six symptoms, each pointing back at the section that explains it:
Symptom | Points at
Current facts, no citations | s5 (search off, model answered from training)
No thinking block on what should be Opus 5 | s3 plus s2 (the model is not what you think)
Cites a document you did not attach | s6 (project RAG or memory)
Answer ignores your standing instructions | s6 (instructions versus project versus skill precedence)
Ran three minutes and produced a report | s5 (research was on)
Refuses a capability you know exists | s6 (code execution off, so skills are unavailable)
s10 discussion. Three positions, prepared cases for all three (family 16 requires cases for every option):
A. Memory and past-chat search off firm-wide; incognito required for anything client-adjacent.
B. Memory on; client identifiers banned by policy; train and supervise to the policy.
C. Memory on with projects as the containment boundary; no firm-wide prohibition.
The single complication, introduced once, after both sides have spoken: on a Team plan, incognito chats are still included in standard data exports and follow the organisation's retention policy. Position A's containment mechanism is not a containment mechanism. Nobody re-speaks after this.
.verify gate required (R3). Every recordkeeping, supervision, and books-and-records characterisation in this block is a regulatory characterisation. The block lists them as questions and instructs verification against primary authority. I have not verified any of them and this document asserts none of them. The instructor signs the slide.
s11 baseline. Harvest S1 s15 blGo verbatim, including the "this page stores nothing, write it down" line (R9). Spiral statement, printed and said aloud:
"0.1 is what every control does to one inference. 0.2 is what a good prompt does with the controls already set. 0.3 is how you verify the answer once you have it."

s9. Live demo runbook (target 9:00, hard cap 10:00)
Same prompt, same model, one variable changed per run. Probe P1 (the Cole rate lookup).
# | Configuration | Expected wall clock | What to point at
1 | Sonnet 5, medium, search off | 10 to 20 s | Hedging, no citations, no as-of date
2 | Sonnet 5, medium, search on | 20 to 40 s | Citations appear, as-of date appears, tool-call count is 1 to 2
3 | Opus 5, high, search on | 30 to 60 s | Thinking block present and not disableable; longer reasoning, same facts
Budget: 60 to 120 s of runtime, 6 to 7 minutes of narration and student config-card assembly in s8's builder, 90 s slack.
Research is not run live. It is shown as a pre-captured artifact. Five or more tool calls over one to three minutes (src-tools3) will not survive a 10-minute window with two other runs.
Fallback, mandatory. Every run has a pre-captured output embedded in the page behind a reveal. If the network, the usage limit, or a changed model menu breaks the demo, the class continues at full pace. A live demo with no fallback in front of thirty advisors is a single point of failure, and this one depends on three systems you do not control.
Capture protocol for the base outputs (do this before building): run each probe at the stated settings, save the verbatim output, record the date and the exact configuration. Those strings become PROBE[].base and they are the only H-chipped output text in the lesson.

s10. Evidence ledger
Every claim in the lesson traces to one of these keys. Every key gets a footer <li id="src-KEY">. V4 enforces both directions.
Key | Source | Verified | Conf | Carries
src-models | Models overview, Claude Platform Docs, platform.claude.com/docs/en/about-claude/models/overview | Fetched 2026-08-20 | H | Model IDs, price per MTok, 1M / 200K context, 128K / 64K max output, knowledge cutoffs, adaptive versus extended thinking, effort defaults
src-effort | "Change the model, effort, and thinking settings", support 8664678 | Fetched 2026-08-20 | H | Five effort levels, which models carry the selector, Opus 5 thinking not disableable, xhigh on 4.7+, changes apply next response, admin role gating
src-tools3 | "When should I use web search, extended thinking, and research?", support 11095361 | Fetched 2026-08-20 | H | 1 to 2 tool calls for search, 5+ over 1 to 3 minutes for research, combined behaviour
src-ctxwindow | "How large is the context window on paid Claude plans?", support 8606394 | Fetched 2026-08-20 | H | Window sizes by model, automatic context management and its code-execution requirement, projects use RAG, tools and connectors are token-intensive
src-skills | "What are skills?", support 12512176 | Fetched 2026-08-20 | H | Progressive disclosure, code-execution requirement, four skill types, skills versus projects versus MCP versus instructions, agentskills.io
src-directory | "Browse skills, connectors, and plugins in one directory", support 14328846 | Fetched 2026-08-20 | H | Customize sidebar, three tabs, install and enable semantics, view-only directory skills, org sharing off by default
src-personalization | "Understanding Claude's personalization features", support 10185728 | Fetched 2026-08-20 | H | Profile instructions, project instructions, five projects on free
src-beta | "Available beta and research preview features", support 14503520 | Fetched 2026-08-20, article dated 2026-07-07 | H as of that date | Label semantics and the eight-row table
src-features | Features and capabilities collection index, support 18031719 | Fetched 2026-08-20 | H | The 33-article surface enumeration used in s6.3
src-memory | "Use Claude's chat search and memory...", support 11817273 | Search snippets only, not fetched in full | M | Memory toggles, pause versus reset, project memory, incognito and Team data exports
src-plugins | "Use plugins in Claude", support 13837440 | URL and title confirmed from two fetched pages; body not read | UNVERIFIED | Plugin semantics in s7 of the lesson
src-routing | "Why Claude switched models in your conversation with Fable 5", support 15363606 | URL and title confirmed; body not read | UNVERIFIED | Optional. Only if s2 covers safeguards routing

Open evidence items, blocking the build
src-memory must be fetched in full before s6 ships. The incognito-and-Team-exports claim is the highest-value item in the sorter and it is currently M from a search snippet. If it does not verify, that landmine comes out and s10's complication needs replacing.
src-plugins must be fetched in full before s7 ships. Plugins are a third of that section's content and nothing in it is currently verified.
The settings navigation paths conflict across sources. Different pages describe memory as living under Settings > Capabilities, Settings > Memory, and Settings > Features. This is a real discrepancy, not a transcription error, and it is exactly the kind of detail a room of thirty advisors will catch on their own screens. Walk the live UI on build day and record the actual paths. Do not take any of them from a document.
Third-party model pages actively contradict the first-party docs. At least one widely-ranked comparison page asserts that no model named Opus 5 exists; the first-party models overview and the effort article both name it. Consider using this as the s1 or s9 worked example: two fluent, confident, SEO-ranked pages, one of them wrong, and the help centre settles it. It is on-thesis for the course and it costs 90 seconds.

Claims that will carry M or L, and why
Claim | Label | Why
Per-block context proportions in the budget bar | L | No published figure. Illustrative, .sim badged
Relative ordering of context consumers | M | Derived from "token-intensive" plus per-block load semantics; derivation shown on page
Quality-versus-effort curve shape in s3 | L | Constructed. Only the direction is sourced
Every composed output delta | L | Construction, not transcript
Memory behaviour in s6 | M until item 1 clears | Snippet-sourced
Plugin behaviour in s7 | UNVERIFIED until item 2 clears | Prints [UNVERIFIED, needs source] on the page if it ships unresolved (R1)

s11. Compliance against pedagogy s1 (R1 to R12)
Rule | How this build satisfies it
R1 no fabrication | Two [UNVERIFIED] items named in s10 and printed on page if unresolved. No token counts invented
R2 chip + data-src | Every claim chipped; 12 source keys; V4 checks both directions
R3 legal and regulatory gates | .verify block on the s10 discussion, listing every recordkeeping characterisation as a question
R4 synthetic case | Cole, pasted byte-identically, labelled synthetic at introduction, --purge Okonkwo-Reyes
R5 labelled defects | Three designed landmines in s6 labelled on page and in footer as exercise material
R6 flag, do not resolve | Seven collisions in s1, three flags in s4, all unresolved and owned by you
R7 challenge first | s1 leads the document
R8 self-contained | Fonts-only external. Inspector data inlined, roughly 6 to 10 KB of strings
R9 no storage | All inspector state in JS variables. Baseline form prints the write-it-down line
R10 no gating | All sections scroll. Gates are completion cues. Shift+U labelled in topbar
R11 traceable | Harvest anchors named per section in s8; ctx-inspector marked [NEW] with its 50 new lines isolated
R12 plain ES5 IIFEs | Data model in s7.3 is plain arrays and functions. No framework, no build step

s12. Build sequence for Claude Code
One session per build conversation (s12.3). This is output-heavy.
# 0. Sync
git pull origin main
 
# 1. Scaffold. new_session.py takes --n as an integer; if it rejects "0.1",
#    copy assets/template.html to session-0-1/index.html manually and hand-write
#    the hub card and CHANGELOG stub. Decide this at the keyboard, not now.
python3 scripts/new_session.py <repo> --n 0.1 --title "The Control Surface" \
  --date "YYYY-MM-DD" --course "BUS ADM X433.4" --case Cole
 
# 2. Capture the three probe base outputs BEFORE writing any HTML (s9).
#    Record date and exact settings with each.
 
# 3. Fetch the two blocking sources in full (s10 items 1 and 2).
#    Walk the live settings UI and record actual navigation paths (s10 item 3).
 
# 4. Extension points, in this order:
#    title -> case block (byte-identical from CASE.md) -> time-budget table
#    -> SURFACE array -> sections 0..11 -> footer sources -> legend
 
# 5. Harvest, do not write, per s8. Prefer harvesting over new code (R11).
 
# 6. New CSS for ctx-inspector goes in assets/components.css as a NEW COMMENTED
#    BLOCK with a provenance line, never inline in the lesson (extension rule 1
#    and rule 2). Token literals only, no hex.
 
# 7. Inline the style payload
python3 scripts/restyle_sweep.py <repo>

Validation, all three must exit 0
python3 scripts/validate_lesson.py session-0.1/index.html \
  --case Cole \
  --purge "Okonkwo-Reyes" \
  --minutes 120 \
  --require-timing --require-tagging
 
node scripts/validate_dom.js session-0.1/index.html
 
python3 scripts/restyle_sweep.py <repo> --check
--minutes 120 is mandatory. The default is 150 and V5 has tolerance zero. Both --require flags apply; this is a new file, not a grandfathered Session-1-era one.

Expected validator results, predicted now so a surprise is a real finding
Check | Expected | Note
V1 fence | PASS | Template carries it
V2 externals | PASS + one WARN | Google Fonts, the permitted exception
V3 storage | PASS | No storage anywhere
V4 evidence | PASS | 12 keys, both directions
V5 timing | PASS | 120 = 120 = 120
V6 interactions | PASS | 14 tasks in band, 13 types, no adjacent repeats
V7 case | PASS | Cole >= 3 mentions, synthetic within 600 chars, purge clean
V8 Shift+U | PASS | Template wiring
V9 accessibility | PASS | reduced-motion and focus-visible in the sweep payload
V10 identity | PASS, fragile | Captures 0 from "Session 0.1"; footer must contain the literal string "Session 0.1"
C1 density | INFO | 120 min x 37-42 = 4,440 to 5,040 words. Reported only, never quoted as pass or fail (Part C)
C2 em dashes | INFO | Standing user rule bans them; corpus code carries them. D-2026-08-18-2 is still open. Harvested code keeps its dashes verbatim until you rule

Then work build-checklist Part B by hand. Part A passing is necessary, never sufficient (s12.4). Part B item 8 (open in a browser, click every interaction, reload, run Shift+U cold, test at 380px, print-preview one section) matters more than usual here, because the inspector is the first three-pane component in the corpus.

s13. Downstream ripples
Building this touches six files beyond the lesson. Every one is a real edit, not a nicety.
File | Change | Why
pedagogy.md s4 + s13 | Ratify the 150/120 block for the 0.x series; dated register entry; version bump | PA-2. Without it the file's parameters and the shipped lesson disagree
pedagogy.md s13 | Resolve D-2026-08-18-2, the em-dash policy for student-facing copy | This lesson is the first new build since it opened. It will not close itself
component-bank.md | Entry 19 ctx-inspector, after one delivery, not before | Bank entries are for recurring mechanisms
assets/components.css | New commented block with provenance for the inspector | Extension rule 1
COURSE.md | 0.x series rows, spiral statements, assignment-alignment audit rerun | Section 5 of COURSE.template.md requires the audit whenever a session is built
CASE.md | Only if the probe prompts need case facts that are not already in the spine | "Case facts introduced in a session but absent from CASE.md" is a named anti-pattern
Hub index.html + CHANGELOG.md | Card and dated entry, both hand-written | Scripts print stubs; these two files stay human-ordered
Also standing: repo defect 1 is still live. The hub names the case "Okonkwo-Reyes" while the sessions use "Cole" (D-2026-08-18-4). Building a new lesson into that repo without fixing it means three lessons and one hub disagreeing instead of two and one.

s14. Proposed 0.x series arc (COURSE.md change, needs your ratification)
# | Title | The one-line promise | Feeds
0.1 | The Control Surface | What every setting does to one inference | Everything. It is the vocabulary lesson
0.2 | The Anatomy of a Prompt | What a good prompt does once the controls are set | Session 2's template scoring
0.3 | Verification | How you check the answer, and what it costs when you do not | Session 3's document corpus
0.4 | What Never Goes In | Client data, confidentiality, and the landmine set | Session 1 s12
Spiral statement for 0.1, said aloud and printed:
"0.1 is what every control does to one inference. 0.2 is what a good prompt does with the controls already set. 0.3 is how you verify the answer once you have it."

s15. Red team
The strongest argument against this design
A control-surface tour is reference material, and reference material is the worst possible use of 120 minutes of a credentialed professional's evening. These are CFPs. They can read a help centre. The defensible version of this lesson is not "here is every setting" but "here are the four settings that change your answer and the one that gets you in trouble," in 45 minutes, with the other eight controls in a printed appendix.
The counter, and why the design stands: the inspector is not a tour, it is a model. The transferable claim is "context is assembled, additively, from named layers, and each control populates one." That claim survives the product changing, and no help-centre article teaches it because each article covers one control. If the build drifts back toward enumeration, this objection wins and the lesson should be cut to 45 minutes.

The evidence that would flip me: if the s0 cold-open analyser shows that most of the room already predicts output changes correctly, the lesson is teaching what they know and should become 0.2 instead. That is measurable in the first eight minutes of the first delivery.

Likeliest failure mode
Not the build. The staleness (PA-7). Three of eight primary sources changed within a month of each other. If the SURFACE array is not disciplined, this becomes the first lesson in the corpus that is visibly wrong on screen while it is being taught, in front of an audience holding phones that show the current UI. Every mitigation in this document points at that risk, and the array is the mitigation that matters.

Second-order effects of my own recommendation
The compositional engine is harder to author than a lookup table. Twenty-three deltas that compose without contradicting each other is a real constraint. Two deltas that both rewrite the opening sentence will collide. Mitigation: deltas append to named slots (opening, body, citations, signals), never to free text. This has to be enforced in the data model or it will fail on the tenth delta.
A [NEW] component with no precedent has no known failure modes. Everything in s7.6 is predicted, not observed. Budget a real dry run.
Three-pane layouts are the corpus's first. The 380px test is not a formality here.
Twelve sections at 120 minutes runs faster than 150. If a section over-runs there is less absorption capacity per section than the corpus is used to. The 30-minute reserve is unchanged in absolute terms, which means it is proportionally larger. That is deliberate.

s16. Decisions required before EXECUTE
# | Decision | Recommendation | Blocks
D1 | Session identifier and directory | Session 0.1, session-0.1/ (corrected per annex C1) | Scaffold, title, footer, hub
D2 | Block length and allocated minutes | 150 block, 120 allocated | Section map, V5, pedagogy s4 amendment
D3 | Does 0.1 run before or after Session 1 | Before | Retrieval bridge, 7 minutes of the map
D4 | Case | Cole, as probe substrate | s1, s5, s6, s10, V7
D5 | Output architecture | Compositional deltas, not a 50-cell lookup | The entire s4 build
D6 | FLAG-1: keep the s6 and s7 sorter pairing | Keep, flagged on page | s7 component choice
D7 | D-2026-08-18-2, em dashes in student-facing copy | Ban them in new copy; leave harvested corpus code verbatim; then close the register entry | Every string written in this build

Answer these seven and the next turn is EXECUTE session-0.1, in Claude Code, in the repo.
