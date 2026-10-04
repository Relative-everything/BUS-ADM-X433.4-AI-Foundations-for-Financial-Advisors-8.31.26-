# Handback: Session 5 interactivity pass, 2026-10-04

Branch `claude/vibrant-hypatia-8iabd0`, from `9325811` (`main` after PR #43). The ask is in
`notes-verbatim.md`; the preference model read from Sessions 1 to 4's revision history, the premise
challenges and the five-tier measure are in `plan.md`; one row per change in `ledger.md` (S5I-001
to S5I-021); 32 DOM assertions in `checks.mjs`; 36 Chromium assertions in `drags.mjs` (22 real pointer
drags and the rendered layout of §04, §06 and §07); the measure in
`interactivity.mjs`. The 2026-10-02 folder's 57 checks and 962 section assertions still run against
the page and pass.

## Summary, quantified

The instruction was to make the page "much more creative and unique, more so than Session 4", to
count a click that only shows text as nothing, and to quantify the difference. The measure is in
`plan.md` §2: T0 reveal, T1 figure-click, T2 parametric, T3 manipulative (drag, drop, wire, reorder),
T4 generative. Every number below is `interactivity.mjs` in Chromium at 1280 px with every appendix
shown; the Session 4 and before columns are the same script on the same commit.

| Measure (at load, 1280 px) | Session 4 | Session 5 before | Session 5 after |
|---|---|---|---|
| Allocated minutes | 150 | 120 | 125 (core 59, appendix 66) |
| Sections, each with one gated interaction | 17 | 15 | 16 |
| Pointer-drag items (`[data-drag]`) | 0 | 0 | **47** |
| Drop targets (`[data-drop]`) | 0 | 0 | **31** |
| Sections with a T3 interaction | 0 | 0 | **6** (7 beats: §08 has two) |
| Sections with a T4 interaction | 1 | 2 | 3 |
| Sections with a T2 interaction | 4 | 3 | 3 |
| Beats that only show text (T0) | 2 | 4 | **0** |
| Interaction families, none repeated in adjacent sections | 11 | 13 | 12 |
| Visible controls, and per minute | 277 · 1.85 | 149 · 1.24 | 193 · 1.54 |
| Visible words, and per minute | 11,544 · 77.0 | 8,120 · 67.7 | 9,546 · 76.4 |
| Words after Shift+U | 14,983 | 12,295 | 14,992 |
| Chips, footer sources | 221 · 70 | 92 · 24 | 117 · 30 |
| SVG figures | 28 | 16 | 19 |
| `aria-live` readouts, copy buttons | 58 · 9 | 42 · 5 | 44 · 4 |
| File size | 789 KB | 484 KB | 585 KB |

**Against Session 4, by the instructor's own definition of interactivity:** Session 4 has no drag,
no drop and no reorder anywhere; its strongest beats are T2 sliders in four sections and one T4
paste. Session 5 now has seven manipulative beats across six sections, three generative beats and
three parametric ones, and no beat whose only effect is text. On the old measure (a figure moves on
the main click) both pages are at 100%.

**Where the page is below Session 4, said plainly:** control density per minute is 83% of Session
4's (it was 67% before this pass), and chip density per 100 words is 1.23 against Session 4's 1.91.
Visible words per minute are now level with Session 4's, which is the cost of §01 and §02 carrying
their rule cards, file names and calendar rows as text at load (§01 is 872 words at load, up from
521); nothing else moved. If that is too much on screen, the one honest cut is the §01 calendar's
eight legacy rows, which the instruction asked for and which the readout can carry instead.

**Recommendation: merge.** Every repository gate that can pass in this container passes; the one
that cannot (`verify-browser` rule 13) fails identically on all seven pages, the unchanged ones
included, because the container's TLS proxy refuses fonts.googleapis.com (§7).

## 1. What changed, instruction by instruction

| Instruction (his words, shortened) | What the page does now | Tier |
|---|---|---|
| Overall: drag shapes, drag and drop into selections, change displays; not click to display text | Seven drag beats on a shared Pointer Events kit; every drag also works as click the item, then click the place | T3 |
| Enterprise section: 10 to 15 skills, agents and workflows hosted in GitHub, updated centrally, used through the normal chat without knowing the skill's name | §07 One Repository, Every Desk: fifteen rows in one repository, six desks, four adviser questions and a typed one that route through the gatekeeper, de-identify, the matching skills and the record-writer and name none of them; Push an update takes every desk to v1.5; three proposals dragged onto the repository, the policy or a desk | T3 + T4 |
| §01: more models; a skill that checks against a rule; gates that force model selection and stop on a non-approved model; the maintenance card interactive or gone | The calendar carries the current four and eight legacy models; The Gate and the Scorecard: five rules dragged into two slots, Advance the model across four generations, the gate stamps RUNS, STOPPED or FAILS, the scorecard SHIPPED or HELD with the check named; his own two-newest-generations rule is gate B; the card is gone | T3 + T2 |
| §02: good handoff package against a bad one | Eight loose files dragged into README, zip or out; three PDFs merge into one prompt.txt; the meter reads one README, three named files, two left out | T3 |
| §03: cut 30%, mainly the result and the key | 227 to 117 and 232 to 118 words in the same state (48% and 49% shorter); the mechanic unchanged | T1 (unchanged) |
| §04: remove the travelling note; show the improved workflow running, or just remove | The note and its copy button are gone; when all three fixes are checkable, a strip runs the improved version through five stations to READY TO HAND OVER | T1 |
| §05: re-check the sources; say what tasks were measured; keep the sliders | Five lines per trial (task, people, tool, measured, who gained most) in the readout and the key; the sliders unchanged; the sources in §3 | T2 (unchanged) |
| §06: nearly all click-to-reveal; Your stack worthless | Wire the Desk: seven chips onto ten ports; a right pair lights the wires and writes the four answers; a wrong one shakes and says why; Your stack and the five tool buttons removed | T3 |
| §07 (now §08): rethink | The eight moments drag into their buckets; Rank the Reasons: six reasons dragged into order, locked, then the survey's order drawn beside the learner's; the three button-drawn bars removed | T3 |
| §08 (now §09): the sliders blur the text | The marker moves by an attribute transform; emphasis is fill-opacity on rectangles; no text-holding group carries an opacity or transform transition | T2 + T4 (unchanged) |

## 2. The page, section by section

| Section | Min | Family | Tier | Drag · drop | What the hands do |
|---|---:|---|---|---|---|
| §00 Final Project and Advisor Use Case Deep Dive | 5 | retrieval-bridge | T1 | | three recalls lock; the five-stop ring advances its model box |
| Cold open, Then and Now | 8 | timed-ritual | T4 | | the learner's own prompts scored on eight checks |
| §01 The tools change | 5 | parameter-sandbox | T3 + T2 | 5 · 2 | pin, drag the day; drag a gate and a rule onto the card, advance four generations |
| E2 The test set | 14 | pipeline-lab | T1 | | five inputs against three models |
| §02 Explain it first | 6 | click-map-explorer | T3 | 8 · 3 | tag five choices; sort eight files into a package |
| §03 Break it | 5 | prediction-commit | T1 | | predict, lock, run six |
| E3 Ten failures, five kinds | 12 | multi-column-sorter | T3 | 10 · 5 | drag ten failures into five lanes |
| §04 Improve it | 5 | builder-assembler | T1 | | pick one fix per break; the improved run |
| E4 The builder's two minutes | 10 | commit-first-mcq | T1 | | call five sentences |
| E1 Six minutes, five beats | 12 | timed-ritual | T1 | | a real clock against five beats |
| §05 Measure it | 5 | estimate-then-reveal | T2 | | guess, lock, reveal four trials; four sliders |
| §06 Wire the Desk | 5 | builder-assembler | T3 | 7 · 10 | drag sources and destinations onto five tools' ports |
| §07 One Repository, Every Desk | 5 | pipeline-lab | T3 + T4 | 3 · 3 | send four questions or type one; push an update; drag three proposals |
| §08 What stays human | 5 | two-bucket-sorter | T3 | 14 · 8 | drag eight moments into two buckets; rank six reasons |
| E5 The scale | 18 | sealed-vote-debate | T1 | | sealed vote, weigh, re-vote |
| §09 The reading | 5 | commit-first-mcq | T2 + T4 | | commit two answers; two confidence sliders; seal a line |

## 3. Sources, re-checked on 2026-10-04

Thirty records serve the page. The rule held throughout: nothing was made up, every external
figure resolves to a footer record, and confidence says what was actually opened.

**Opened on 2026-10-04 (H), eight pages, all from this container:**

| Record | What was read, and what changed |
|---|---|
| `src-anthropic-deprecations` (re-opened) | Every date carried since 2 October unchanged: Sonnet 4.5 deprecated 30 September 2026, retires 30 November 2026, replacement Sonnet 5.5; 60 days' notice; "Requests to retired models will fail". The not-sooner-than dates of the current and legacy models added to scope for the calendar's new rows |
| `src-anthropic-models-overview` (new) | The current lineup (Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 4.5) and the eight legacy models with their not-sooner-than dates |
| `src-claude-code-skills` (new) | A skill is one described file; its description is what triggers it; an organisation can distribute skills centrally; a skill can name its model |
| `src-claude-code-marketplace` (new) | One catalogue file in one git repository; the add-and-install step |
| `src-claude-code-org` (new) | Organisation policy: known marketplaces, enabled plugins, auto-update, the strict mode, "blocked by enterprise policy" |
| `src-claude-code-host` (new) | How an update travels from the repository to each desk, by version |
| `src-claude-code-settings` (new) | A firm can lock the list of models any session may use; managed settings take precedence |
| `src-lee-cognitive` | Not re-opened; opened in full on 2 October (the 23-page PDF); the coefficients and shares on §09 are unchanged |

**Still at M, twelve records, publishers egress-blocked again on 2026-10-04.** Each retrieval note
now carries the dated sentence and names the secondary hosts tried. The four §05 trials are here,
which is the instruction's specific ask:

| Record | What the page says it measured | Why M |
|---|---|---|
| `src-noy-zhang` (Science, 2023) | 453 college-educated professionals; 20 to 30 minute occupation-specific writing tasks; time 40% less, rated quality 18% higher; the lower-rated writers gained most | science.org, nber.org and economics.mit.edu blocked; figures consistent across the summaries found |
| `src-dellacqua` (Harvard Business School working paper, 2023) | 758 BCG consultants; 18 consulting tasks around a new footwear product inside the model's reach; 12.2% more tasks, 25.1% faster, 40% higher rated quality; outside the frontier 19 points less likely to be correct; below-average performers gained 43% against 17% | hbs.edu and ssrn.com blocked; figures consistent across five reports |
| `src-brynjolfsson` (NBER, 2023) | 5,179 customer-support agents at one software firm; resolutions an hour with a generative assistant; 14% on average, 34% for the newest agents | nber.org, arxiv.org and academic.oup.com blocked; abstract figures consistent across the listings |
| `src-metr-2025` (METR, July 2025) | 16 experienced open-source developers; 246 real issues in their own repositories (bug fixes, features, refactors); a coin flip per task decided whether AI was allowed; 19% slower with AI; they expected 24% faster beforehand and believed 20% faster afterwards | metr.org blocked, as were the secondary hosts tried; figures consistent across five reports |
| `src-morningstar-fired`, `src-vanguard-alpha`, `src-cfp-psychology` | The six reasons and shares ranked in §08; about 3% and the behavioural half; the 7% exam weight | morningstar.com, vanguard.com, cfp.net blocked |
| `src-rightcapital-iris`, `src-pew-ai-summaries`, `src-kitces-aisearch`, `src-investmentnews-t3-2026`, `src-openai-retire-4o` | §06's planning agent, the 8% against 15% click rates, the assigned reading's who-what-where line, the 14 note-taking tools, the GPT-4o retirement line | each publisher blocked; see the notes |

**Recorded H by earlier builds and not re-opened here (nine):** `src-anthropic-deprecation-commitments`
(opened 2 October), `src-anthropic-terms` (27 September), `src-t3-survey` (the 2,906-adviser shares,
re-searched 4 October and unchanged), `src-wolfram`, `src-magesh`, `src-regsp`, `src-kalai`,
`src-google-ptcf`, `src-cve`. **L (one):** `src-case`, the Cole household, invented.

The firm in §07, its fifteen rows, its six desks and its four prompts are constructed and carry an
L chip; the mechanics they illustrate (one repository, central update, policy block, model lock) are
each chipped to the Claude Code page that documents them.

## 4. The premise challenges, and what was decided

1. **"Click to display text is not interactivity" was never written down before 4 October.** It
   was implied by every revision since 25 September; this pass makes it a measurable tier and
   removes the four beats on this page that were only that.
2. **Accuracy does not move with interactivity.** Nothing that was H became anything else; the new
   beats cite seven pages opened this day; the invented firm is labelled.
3. **The enterprise section has no syllabus line.** It is taught as where the course's five
   principles go to live at a firm, in five core minutes, and the page is 125 minutes rather than
   120. The instructor asked for it by name.
4. **Drag alone is not accessible.** Every drag beat keeps the two-click path, keyboard focus and an
   `aria-live` readout; `checks.mjs` drives every beat through the click path and `drags.mjs`
   through the pointer.
5. **The word for the quality rule.** He said rubric; the repository's word scan bans it as a
   grading word; the page says scorecard. DW-130 asks him to decide.

## 5. What was not done, or done differently

- No HTML5 drag-and-drop API (no touch support, unstyleable ghost); Pointer Events instead.
- §00, the cold open, E1, E2, E4 and E5 are unchanged; none was named and each already holds a T2,
  T4 or a sealed commitment.
- The §07 section is one firm, not a product tour; no vendor beyond the one whose documentation was
  opened, and that one only in the source line and the key.
- The Session 4 page was not touched; its numbers above are the comparison, not a to-do.
- `verify-browser` rule 13 was not patched around; the failure is the container's, not the page's.
- After the first commit, zoomed renders of every rebuilt figure were read by eye; the nine collisions
  they showed (S5I-018, S5I-021) were fixed and are now asserted on rendered boxes in `drags.mjs`.

## 6. What you still need to do before class

1. **Open Anthropic's deprecation page once before class.** §01 is dated 4 October 2026 and the
   vendor updates it in place.
2. **Try one drag on the classroom machine.** The kit was exercised with a mouse in Chromium at
   1280 and 380 px; touch and pen go through the same Pointer Events but were not driven here.
3. **Decide DW-130** (scorecard for rubric on the page) and, as before, **DW-128** (the twelve M
   records: open them at H or teach them as M; the chips are honest either way).
4. The run sheet, polls and teaching aid are rewritten to the new clock (§07 at 8:25, the closing
   check at 8:42, Poll 4 at 8:47, close 8:52); print the two-page PDF.

## 7. Verification

| Check | Result |
|---|---|
| `node docs/changes/2026-10-04-session-5-interactivity/checks.mjs` | 32 of 32 |
| `node docs/changes/2026-10-04-session-5-interactivity/drags.mjs` (Chromium, 1280 and 380) | 36 of 36: every drag beat by real pointer, a wrong drop bounces, the stop icons sit inside the figure, no two labels overlap in §04, §06 or §07 and no marker rests on text, the click path still works, no error, no overflow |
| `node docs/changes/2026-10-02-session-5-build/checks.mjs` | 57 of 57 (edits dated, DW-129) |
| `section-tests/run-all.mjs session-5/index.html` | 962 assertions, 0 failed |
| `clickall.mjs` (Chromium, 1280 and 380, Shift+U on and off) | clean; 34 screenshots |
| `interactivity.mjs` on Session 4, the page before, the page after | the table above |
| `build-appendix --check`, `inject-sources --check`, `inject-case --check` | current |
| `verify-case`, `verify-sources`, `verify-migration` | 7 of 7, 6 of 6, 15 of 15 |
| `case-inventory --report-check`, `build-unsourced --check`, `build-bibliography --check` | current (inventory regenerated) |
| `verify-editorial`, `test-editorial-regions` | 17 rules clean, 2 pre-existing Session 1 advisories; 9 of 9 |
| `test-case-viewer` | 0 failures |
| `verify-browser` | rule 14b (SVG text outside its viewBox) 0 on all seven pages after S5I-018; rule 13 ("zero JS errors on load") red on all seven pages, the hub and the unchanged lessons included: the container's proxy answers fonts.googleapis.com with an untrusted certificate (`net::ERR_CERT_AUTHORITY_INVALID`); the page loads no other external resource |
| `verify-style` | cannot run here (the restyle skill is not installed); the fence is byte-identical to Session 4's |
| Em and en dashes, course-policy words in the authored body | 0; the S5B-033 scan and S5I-013 |
