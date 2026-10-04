# Plan: Session 5 interactivity pass, 2026-10-04

Branch `claude/vibrant-hypatia-8iabd0`, from `9325811` (`main` after PR #43). The final class is
Monday 2026-10-05. Kickoff in `notes-verbatim.md`; ledger rows `S5I-001` upward in `ledger.md`;
`checks.mjs` carries one jsdom assertion per row a DOM check can prove; `interactivity.mjs`
measures what this pass is about.

## 0. The premise, challenged first

1. **"Click to display text is not interactivity" is the one rule the history never wrote down,
   and the page as built obeys the letter of every earlier rule while missing this one.** The
   2026-09-25 handback measured "sections whose main click moves a figure" and scored Session 5 at
   15 of 15. Every one of those figures moves on a click. None moves under the hand. There is not
   one pointer-drag, drop, wire or reorder on any page in the course: a search for pointerdown,
   dragstart, mousedown and touchstart finds zero in Session 4 and zero in Session 5 (Session 1's
   card sort has a native drag path and Session 3's one pointer handler spins a figure; neither is
   a section's main interaction). So "more creative than Session 4" cannot be won on the old
   measure, which Session 5 already saturates. It needs a new measure, §2 below, and the new
   measure is what this pass is judged on.
2. **Accuracy does not move with interactivity, and the user said so.** Every figure that stays
   on the page keeps its record; every new fact is chipped to a record that was either opened on
   2026-10-04 (H) or re-checked against the same consistent reports as before (M). The source
   re-check in §5 found no figure that needed changing. Nine of the fifteen external publishers
   remain egress-blocked from this build; those records stay at M and say so.
3. **The enterprise section is new content with no syllabus line.** The syllabus row for Session 5
   names "maintaining an AI-supported workflow as models evolve" and "advanced tools"; a firm's
   central skill library is the advanced form of both, and it is the instructor's own ask. It goes
   in the core (the final class should see it) at five minutes, which takes the core from 54 to 59
   minutes and the page from 120 to 125, still 83% of the other lessons' 150. The run sheet absorbs
   it in the second half, where the night has six minutes of buffer after the change.
4. **Drag is not accessible on its own.** Every drag on this page has the course's existing
   click-this-then-click-that path underneath it, with aria-pressed and focus handoff, so a
   keyboard or switch user completes every gate. The drag is the fast path, not the only path.
   Pointer Events (not HTML5 drag-and-drop) are used so the same code serves mouse, pen and touch.
5. **The §03 cut is measured, not felt.** The result readout and the answer key are counted in
   words after a full run, before and after, in `checks.mjs`; the target is at least 30% fewer.

## 1. What the history says about interactivity, reduced to rules

Read again for this pass: the verbatim notes of 2026-09-13, 2026-09-19 (twice), 2026-09-25
(twice), 2026-09-27, 2026-09-28 and 2026-10-02; the Session 4 rebuild plan's preference table; the
Session 4 syllabus pass's screenshot survey; the Session 5 build handback; and today's notes.

| # | What the instructor has asked for, in his words | Times | Where it first appears |
|---|---|---|---|
| 1 | "not just click to display text", "more unique than just click to display text", "juts clicking a button to display text is almost not even counted as interactivity" | 4 | 2026-09-25 (second ask), 09-27, 10-04 |
| 2 | "creative interactive memorable experiences", "the more interactive more creative end" | 3 | 09-25, 10-04 |
| 3 | "drag shapes / change displays with clicking / drag/drop items in a selection" named as what counts | 1 | 10-04 |
| 4 | Interactions that change with the input: sliders, the learner's own minutes, the learner's own prompt | 4 | 09-13 onward; praised again 10-04 ("the how long with and without ai on your own is good") |
| 5 | Predictions lock, then the gap shows | 5 | 09-13 onward |
| 6 | Sorters answer at once, item under its bucket with a tick or cross and a why | 2 | 09-19 (JN-027), 09-25 |
| 7 | Less text: a thesis line and bullets; "way too much text to be useful on screen during class" | 14 | 09-13 onward; 10-04 on §03 |
| 8 | Simplify what sits around an interaction: duplicate controls, hints that repeat a button, secondary widgets that do not carry the point ("Your stack is worthless") | 3 | 09-25 polish, 10-04 |
| 9 | Nothing addressed to the instructor; no dates, grades, platform | 6 | 09-13 onward |
| 10 | Source it or cut it; never make up a source; re-check the sources | 7 | 09-13 onward; 10-04 on §05 |
| 11 | Concrete wealth-management examples; the Cole through-line | 6 | 09-13 onward |
| 12 | Keep what works: "This is good" (§02), "This is fine" (§03), "Good" (§04), "Great section" (§08) | 4 | 10-04 |

**What he likes, read off the sections he kept.** The cold open (the learner's own two prompts,
scored); §02's board (a phrase in hand, a slot that bounces a wrong pairing and says where it
belongs); §03's conveyor (a locked prediction, six briefs drawing, three stamps); §04's board that
re-runs when a fix is picked; §05's own-task sliders; §08's commit-then-reveal with the two
confidence sliders. The common shape: the learner holds something, puts it somewhere, and the page
judges the placement at once with a figure, a stamp and one line of why.

**What he dislikes, read off the sections he cut.** §01's maintenance tiles (tick, a stamp changes,
a card line fills: a checklist in costume); §06's five tool buttons (each click writes four
paragraphs: the readout is the content, the figure is decoration) and its Your stack (a checklist
with no consequence); §07's "press the button to draw the three bars" (a reveal with no commitment
before it); §04's note that writes itself (text generated from picks already judged); §03's result
panel (the right mechanic, buried under its own explanation).

## 2. The measure: five tiers of interaction, and where the two pages stand

A click is counted by what it does to the page, not by whether it exists.

| Tier | What the learner does | What the page does | Counts as |
|---|---|---|---|
| T0 reveal | clicks a button | shows text | nothing |
| T1 figure-click | clicks a button or a figure part | a figure changes state and the text follows | the floor |
| T2 parametric | moves a slider, types a number | the figure recomputes continuously | yes |
| T3 manipulative | drags, drops, wires, reorders; or picks up and places by two clicks | the arrangement is the answer and the page judges it at once | yes, the target of this pass |
| T4 generative | types their own material | the page processes it (scores a prompt, routes a question) | yes |

Measured on the page as committed at `9325811` and on Session 4 at the same commit, by
`interactivity.mjs` (Chromium, 1280 px, every appendix shown; the method is the 2026-10-03
`measure.mjs` with three counts added: pointer-drag items, drop targets, drag-capable sections).

| Measure | Session 4 | Session 5 before | Session 5 target |
|---|---|---|---|
| Sections (gated) | 17 | 15 | 16 |
| Sections whose main click moves a figure (the old measure) | 16 of 17 | 15 of 15 | 16 of 16 |
| Pointer-drag items (`[data-drag]`) | 0 | 0 | 40 or more |
| Drop targets (`[data-drop]`) | 0 | 0 | 25 or more |
| Sections with a T3 interaction | 0 | 0 | 7 (§01, §02, E3, §06, §07, §08 twice) |
| Sections with a T4 interaction | 2 (cold open paste, §09 clause typing) | 2 (cold open paste, §09 one line) | 3 (plus §07's own prompt) |
| Range inputs | 20 | 18 | 18 or more |
| Beats that are T0 (a click that only shows text) | 2 (§00 bridge, §03 six places; the latter rebuilt 09-27) | 4 (§01 tiles, §04 note, §06 stack, §07 bars) | 0 |

The post-build figures go in `handback.md` beside these, with the same script.

## 3. Section map after the change

Core 59 (11 sections), appendix 66 (5), total 125. Gates 16. Interaction families: 13 distinct, no
family repeated in adjacent sections in file, core or reading order.

| # | Id | Title | Min | `data-comp` | Change | Tier |
|---|---|---|---|---|---|---|
| 00 | s0 | Final Project and Advisor Use Case Deep Dive | 5 | retrieval-bridge | none | T1 |
| CO | sCold | Then and Now: Two Prompts | 8 | timed-ritual | none | T4 |
| 01 | s1 | The Model Your Workflow Runs On Will Retire | 5 | parameter-sandbox | calendar redrawn from the live page (2026-10-04, H): the eight retirements plus every current model's not-sooner-than date in four family lanes; **the maintenance card replaced by The Gate and the Rubric**: drag one of three model gates and one of two quality rules onto a skill card, then advance the model through four generations and read what runs, stops, fails or ships; copy the two lines | T2 + T3 |
| E2 | sE2 | Swap the Model, Keep the Test Set | 14 | pipeline-lab | none | T1 |
| 02 | s2 | Read a Stranger's Package Like an Examiner | 6 | click-map-explorer | board kept; **new beat, Two Packages, One Stranger**: seven loose files dragged into README.txt, one zip, or left out; the stranger's first-minute meter falls from seven files to two | T3 |
| 03 | s3 | Six Inputs: Which Ones Break It? | 5 | prediction-commit | mechanic kept; the result and the key cut by at least 30% of their words | T1 |
| E3 | sE3 | Five Ways It Broke, Sessions 1 to 4 | 12 | multi-column-sorter | chips drag onto lanes (the shared sorter gains drag) | T3 |
| 04 | s4 | A Change You Can Defend | 5 | builder-assembler | the note panel and its copy button removed; when all three fixes are checkable the board draws the improved workflow running: README step, the two rules, the brief, the eight-digit test, the record | T1 |
| E4 | sE4 | The Builder's Two Minutes | 10 | commit-first-mcq | none | T1 |
| E1 | sE1 | Six Minutes, Five Beats | 12 | timed-ritual | none | T2 |
| 05 | s5 | Felt Faster Is Not Faster | 5 | estimate-then-reveal | every record re-checked; each trial's readout and the key say what the task was, who did it, which tool, what was measured, who gained most; the own-task sliders unchanged | T2 |
| 06 | s6 | New Tools, the Same Four Questions | 5 | builder-assembler | **rebuilt as Wire the Desk**: drag a source and a destination onto each of five tools; a right pair lights the wire and the four stops write; a wrong pair bounces with a why; Your stack removed | T3 |
| 07 | s7 | One Repository, Every Desk | 5 | pipeline-lab | **new**: the firm's skill library as one repository, a policy, six desks and a chat line; pick or type a question and watch the gatekeeper, the matching skills, the verifier and the record light without the adviser naming one; push an update and watch every desk receive it; drag three proposals onto the firm and see which the policy accepts | T1 + T3 + T4 |
| 08 | s8 | The Cole Meeting: Eight Moments | 5 | two-bucket-sorter | moments drag onto the two buckets; **Rank the Reasons** replaces the button: drag six reasons clients leave into your predicted order, lock, see Morningstar's | T3 |
| E5 | sE5 | Discussion: the scale | 18 | sealed-vote-debate | none | T1 |
| 09 | s9 | Trust the Tool, Think Less? | 5 | commit-first-mcq | the blur fixed: no opacity on groups that hold text, no CSS transition on the marker group | T2 |

Arithmetic: core 5 + 8 + 5 + 6 + 5 + 5 + 5 + 5 + 5 + 5 + 5 = **59**; appendix 14 + 12 + 10 + 12 +
18 = **66**; total **125**. Break 15 and reserve 15 stay `nosum`.

Families in reading order: bridge, ritual, sandbox, pipeline, click-map, prediction, multi-column,
builder, mcq, ritual, estimate, builder, pipeline, two-bucket, debate, mcq. Builder appears at §04
and §06 with §05 between them in core order and E4, E1 and §05 between them in reading order;
pipeline appears at E2 and §07, eleven sections apart. No adjacent repeat.

Section ids: §07 takes `s7` and the Cole meeting moves to `s8`, the reading to `s9`, with their
gates `g8` and `g9` becoming `g9` and `g10` and a new `g8` for the library. Every in-page link and
the appendix `data-insert-after` anchors are updated; nothing outside this page links to `#s7` or
`#s8` on Session 5 (checked with a repository search).

## 4. The shared drag kit

One function in the script kit, `mkDrag`, used by every T3 beat:

- Pointer Events on each item (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) with
  `setPointerCapture`; `touch-action: none` on items. A six-pixel threshold separates a click from
  a drag, so the existing click paths keep working untouched.
- A ghost (a fixed-position clone) follows the pointer; the hovered target is found by bounding
  rectangle; drop calls the beat's own `place(item, target)`, the same function the two-click path
  calls, so the judgement, the figure, the readout and the gate are one code path.
- Items carry `data-drag`, targets `data-drop`, which is how `interactivity.mjs` counts them.
- In jsdom there are no rectangles and no pointer events; the click path is what the DOM checks
  drive, and the Playwright click-through drives one real drag per beat with `page.mouse`.
- The shared sorter gains drag the same way and fires a `sorter:placed` event on its list for
  every placement, by click or by drop; §08 and E3 listen to that event instead of sniffing clicks.

## 5. The sources, re-checked on 2026-10-04

| Record | Host | Result | Confidence |
|---|---|---|---|
| `src-anthropic-deprecations` | platform.claude.com | opened; every date on the page agrees; Sonnet 4.5 deprecated 30 Sep 2026, retires 30 Nov 2026, replacement Sonnet 5.5; 60 days' notice; "Requests to retired models will fail"; the testing advice; the current lineup's not-sooner-than dates added to the scope | H |
| `src-anthropic-models-overview` (new) | platform.claude.com | opened; the current lineup (Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 4.5) and the legacy models still served | H |
| `src-claude-code-skills` (new) | code.claude.com | opened; SKILL.md, name and description, description-based triggering, the `model` field, the enterprise skills path | H |
| `src-claude-code-marketplace` (new) | code.claude.com | opened; a marketplace is a git repository with `.claude-plugin/marketplace.json`; add and install commands; private repositories; updates by version | H |
| `src-claude-code-org` (new) | code.claude.com | opened; `extraKnownMarketplaces`, `enabledPlugins`, `autoUpdate`, `strictKnownMarketplaces`, the "blocked by enterprise policy" message, install at the next session start | H |
| `src-claude-code-settings` (new) | code.claude.com | opened; managed settings outrank every other level; `availableModels` is the lock on which models a session may use | H |
| `src-lee-cognitive` | microsoft.com | opened 2026-10-02 in full; no change | H |
| `src-noy-zhang` | science.org | blocked; the four figures agree across the summaries re-read; task description added to scope from the same summaries | M |
| `src-dellacqua` | ssrn.com, hbs.edu | blocked; agrees; the inside and outside tasks and the below- and above-average split added | M |
| `src-brynjolfsson` | nber.org, oup.com | blocked; agrees; the chat-support setting added | M |
| `src-metr-2025` | metr.org | blocked; agrees; the task description added | M |
| `src-morningstar-fired` | morningstar.com; fa-mag.com, institutionalinvestor.com | all blocked; a fresh search returns 184 investors and the six shares unchanged | M |
| `src-vanguard-alpha` | vanguard.ca (Vanguard's own host) | blocked; a fresh search returns about 3% and 150 basis points | M |
| `src-cfp-psychology` | cfp.net | blocked; no new report found; unchanged | M |
| `src-t3-survey`, `src-investmentnews-t3-2026` | kitces.com, investmentnews.com, dwealth.news | all blocked; a fresh search returns 2,906, 52.2%, 42.9% and 14 tools unchanged; the T3 record's retrieval note now says this | H (as summarised) / M |
| `src-rightcapital-iris`, `src-pew-ai-summaries`, `src-openai-retire-4o`, `src-kitces-aisearch` | blocked | unchanged | M |

No `last_verified` is written by this pass; `last_retrieved` moves only on the records that were
opened. Retrieval notes on the blocked records gain one dated sentence.

## 6. What is deliberately not done

- No HTML5 drag-and-drop API: it has no touch support and its ghost cannot be styled; Pointer
  Events do both.
- No change to §00, the cold open, E1, E2, E4, E5: none was named, and each already holds a T2 or
  T4 interaction or a sealed commitment.
- No vendor names in §06 or §07 beyond the one whose documentation was opened for §07; the firm, its
  fifteen skills, the six desks and the four prompts are constructed and labelled L.
- No live model, no network, no storage: unchanged.

## 7. Verification

Every repository gate in `MAINTAINING.md` that runs here; the 2026-10-02 folder's `checks.mjs`
(with S5B-002's section and minute counts updated to the new page and the change recorded in that
file and in this ledger) and its `section-tests/`; this folder's `checks.mjs`; `clickall.mjs` at
1280 and 380 px with Shift+U on and off plus one real pointer drag per T3 beat; `interactivity.mjs`
on Session 4, the page before and the page after; the instructor materials re-read against the
page; the whole page read once with every answer revealed.
