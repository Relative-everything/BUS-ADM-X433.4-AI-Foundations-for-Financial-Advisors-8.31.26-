POLISH `session-2/index.html` on this session's branch, under the sdlc-loop and interactive-lesson-builder skills, working from the file on disk. The instructor's granular notes are finished and merged; this pass raises the craft of what survived them. Read everything below before the first tool call.

First read `docs/changes/2026-09-13-session-2-manual-pass/kickoff-prompt.md` in full. It is the governing process for work on this page and it holds in every part this prompt leaves alone: the role, the tooling block, the ripple list, the generated-region rule, the verification gate, the records, the halt list and the report discipline. Then read that folder's `handback.md` for the twelve open flags and `ledger.md` for what the three note batches changed. This prompt supplies the scope, the two work classes, the register and the report additions that make this a polish pass rather than a notes pass.

<decisions>
Four toggles, each with a default already chosen. A default changes when Jared edits this block before pasting; every other signal leaves the defaults standing.

P1 · The work split.
DEFAULT = LAND THE SMALL, PROPOSE THE LARGE. A finding that passes every line of the FIX test in `<classes>` is implemented, committed and verified in this pass. Every other finding is written up, ranked and reported, and the page keeps its current form.
ALTERNATIVE = AUDIT ONLY. Every finding is written up and reported; the page keeps its current form throughout; `session-2/index.html` stays byte-identical and the pass commits records alone.

P2 · The em-dash ratchet (`EDITORIAL.md` A8, A9, D1).
DEFAULT = AUTHORISED, FALLING ONLY, inheriting K1 of the governing prompt. `scripts/editorial-baseline.json` records `session-2` at 2 literal, 38 entity, 40 total. A polish edit that removes a sentence carrying `&mdash;` re-records the figure downward in the same commit, with the `docs/deferred-work.md` row line `MAINTAINING.md` requires. Every dash you author is a colon, a comma or a full stop, so the figure has one direction available to it.
ALTERNATIVE = FROZEN. A finding whose fix would move the baseline becomes a PROPOSE row with the movement named.

P3 · Acceptance.
DEFAULT = PRE-ACCEPTED FOR FIX, RESERVED FOR PROPOSE. Jared's instruction of 2026-09-14 accepts the FIX class in advance: survey, register, commit, verify, report. The PROPOSE class waits for him in every case, and the page keeps its current form until he answers.
ALTERNATIVE = STOP AFTER THE REGISTER. Commit the register and the harness, push, print the summary, end the turn with the single word AWAITING, and edit the page after a reply containing PROCEED.

P4 · Threads.
DEFAULT = SINGLE-THREADED, inheriting K4: every read, edit, test and commit on the main thread, whatever Ultracode setting the session carries.
ALTERNATIVE = read-only Explore agents for the survey step of `<scope>` alone, with the register, every edit and every commit staying on the main thread.
</decisions>

<role>
You are the build engineer for this course repository and its curriculum editor, in the sense the governing prompt sets out, wearing a third hat here: the copy editor who reads a page that three rounds of deletion have passed through and finds the seams. The instructor cut roughly a third of this page across thirty-five items in three merged batches. Deletion at that scale leaves connectives pointing at paragraphs that are gone, card sets whose members no longer share a grammatical shape, headings that name content that moved, and interactions whose instructions describe a step that was removed. Those seams are your highest-yield finding class, and they are invisible to every validator in the repository because each one is locally well-formed. Your reading eye is the instrument.
</role>

<context>
Session 2 is taught 2026-09-14, 6:00 to 9:00 PM Pacific, from this page at core-only depth, run from `instructor-notes/session-2.md`. Treat the page as shippable at every commit: each edit stands alone, each is revertible with one `git revert`, and the file renders and runs after every one of them. Confirm the teaching date from the run sheet's first lines before you plan the order of work, since a page taught in hours takes its P1 findings first and leaves everything else for the register.

What reached this page before you:
- Three batches of instructor notes, thirty-five items, merged at 88d89c9 through pull requests #25, #26 and #27. `docs/changes/2026-09-13-session-2-manual-pass/ledger.md` holds every one with its anchor, its edit and its commit.
- The shape of those notes was overwhelmingly subtractive: filler prose cut, explanation compressed by half to three quarters, on-page instructor checks removed to the run sheet, two discussion blocks and one assignment tail deleted. Four interactions were rebuilt and two added.
- Twelve non-blocking flags stand open in the handback, F-1 to F-12. Each is already known to Jared; a finding that restates one of them belongs in the register as a cross-reference, and the pass spends its effort elsewhere.

Where the page stands now, measured this way:
```
node scripts/audit/section_profile.mjs session-2/index.html
```
17 sections, 16 of them lesson sections, 11 in the core; timing 150 of 150 minutes; 19 interaction roots across 10 component families; interactions per section median 1, range 1 to 2; prose words per minute of allotted time, median 27.3; chips per 100 words median 0.42; ICAP spread P 0, A 6, C 12, I 1; consecutive same-family pairs at `s1` to `s2`, `s6` to `s6b` and `s9` to `s10`. The committed profile is `docs/audits/profiles/session-2.json`, and it is the before figure for everything in `<verification>`.

Two of those numbers shape what polish means here, so hold them from the start. The interaction count of 19 sits above the lesson-builder's band of 13 to 15, by instruction, recorded on DW-094 and DW-101, which means quality and uniqueness improve by differentiating and consolidating what exists and the count holds at 19 or falls. And 9 of the 19 roots sit in two families, `work-along-gate` five times and `builder-assembler` four times, which is where a uniqueness finding has the most purchase and where you look first.
</context>

<scope>
Seven dimensions. Survey all seven across the whole page before you write the register, so the ranking reflects the page rather than the order you happened to read in. Each dimension carries the test that settles a finding in it.

D1 · Seams from the deletion passes. A connective pointing at text that is gone ("as we saw above", "the third card", "the panel below", "in the exercise you just ran"); a section opening mid-thought because its lede was cut; a transition to a block that no longer exists; a sentence whose antecedent left with a deleted paragraph; the same sentence surviving twice after a block moved. Test: quote the sentence, name what it points at, show that the target is absent with a `grep -c` of the target's own words.

D2 · Sentence craft. One idea per sentence; a verb doing the work rather than a nominalisation; a card set whose members share one grammatical shape; a list whose items are parallel; a long sentence that reads better as two. Test: quote the before and the after, and show the section's word count holding or falling.

D3 · Terminology. One name per concept, page-wide. This page carries several concepts under more than one name by construction, so check each deliberately rather than normalising on sight: task, tier, model, prompt, template, context window, chat. Test: `grep -c` each competing form, name which one the page should keep and why, and show the count after.

D4 · Headings, labels and controls. A heading that names its content; a button whose words say what the click does; a label bound to the control it names; an eyebrow, a minute figure and a section's actual content agreeing. Test: the rendered text of the control, and for a minute figure, agreement with the run sheet and with `build-appendix --check`.

D5 · Interaction quality. Each of the 19 roots states what it asks, what the click does and what the learner should see afterwards; every control is reachable by keyboard and carries a label; every readout is visible without scrolling past the control that drives it; each interaction's instruction still matches the steps the interaction actually has after the rebuilds. Test: a named check in `checks.mjs` exercising the click path, plus a screenshot at 1280 and 400 px.

D6 · Interaction uniqueness. Take the five `work-along-gate` roots and the four `builder-assembler` roots as two sets. For each set, say what each member asks of the learner and whether two members ask the same thing in the same way. Where two do, the finding is either a differentiation the learner would feel or a consolidation that lowers the count toward the band. Both are PROPOSE class unless the differentiation is a wording change alone. Test: the per-member comparison table in `<report>`, and the ICAP spread and consecutive-pair list from the profiler, before and after.

D7 · Mechanical correctness. An id referenced in script and absent from the markup, or the reverse; an HTML entity rendering literally; a CSS rule whose selector no longer matches anything; a chip whose `data-src` resolves to no footer key; a figure stated differently in two sections; a run-sheet line naming an element id, a poll or an opener the page no longer carries. Test: the validator line or the `grep -c` that proves it, and the same command clean afterwards.
</scope>

<classes>
Every finding is FIX or PROPOSE, settled by a mechanical test rather than by judgement. Run the test in order and take the first answer it gives.

A finding is FIX when all six of these hold:
1. It lands inside one section.
2. It changes at most three sentences of prose, or one function, or one control's text.
3. Every figure, name, date, citation, chip and legal characterisation on the page reads afterwards exactly as it reads now.
4. Its section's word count holds or falls, and the page's interaction count holds at 19 or falls.
5. A `grep`, a `checks.mjs` check or a named gate line proves it landed.
6. One `git revert` restores the page, because it is one commit on its own.

A finding is PROPOSE when any one of these holds:
1. It moves a section's structure, its order, its minute figure or the interaction count upward.
2. It rewrites more than three sentences in one place, or replaces a component, or merges two.
3. It changes a figure, a source, a chip, a name or a legal characterisation.
4. It sets a new baseline, snapshot or threshold, or moves one under P2 in the rising direction.
5. It reaches another lesson, a shared block or a generated region.
6. Landing it and verifying it would take more than about fifteen minutes.

One carve-out sits inside the PROPOSE class and travels faster than the rest of it. A figure, date, name or citation that contradicts its own `SOURCES.md` record, contradicts another section of this page, or contradicts `CASE.md` is an accuracy finding: it stays PROPOSE, since the correction needs a source behind it, and it also opens the turn it is found in rather than waiting for the report. Name the two readings, the record each rests on, and the correction you would make. A page taught tonight earns that speed.

A third status carries the restraint this pass needs: LEFT-AS-IS. A passage you examined and deliberately kept earns a register row with the reason, and that row is worth as much as a fix. Jared has just spent three batches shaping this prose. A page where you changed forty things is a worse outcome than a page where you changed eight and can say precisely why the other thirty-two were already right.
</classes>

<intake>
Four files in `docs/changes/2026-09-14-session-2-polish/`, committed together as the first commit on the branch, before the first page edit.

1. `register.md`. One row per finding, ids `PL-001` upward in page order, so the ids and the reading order agree. Columns:

| PL | Dimension | Section · anchor at <SHA> | What reads now (quoted) | What it becomes, or why it stays | Class | Conf | Pri | Cross-ref | Test | Commit | Result | Status |

Dimension is one of D1 to D7. Class is FIX, PROPOSE or LEFT-AS-IS. Conf is H when you have quoted the exact text and run the test that proves the finding, M when the reading is sound and one step rests on inference, L when it rests on taste alone; an L finding is PROPOSE whatever else is true of it, because taste is Jared's call. Pri is P1 for anything a learner sees at core-only depth, anything inaccurate and anything broken, P2 for appendix tier and instructor-only, P3 for everything else. Cross-ref names the DW row, the F flag or the JN id the finding touches, or reads "none" after you looked. Status is LANDED, PROPOSED, LEFT-AS-IS or HALTED.

2. `recommendations.md`. The PROPOSE rows written up for a reader who was not in this session, ranked by payoff against effort, each one self-contained: what it is, where, what the learner gains, what it costs in minutes, what it ripples into, and what it would take to undo. This file is the durable form of the "large recommended updates" and it survives the session; the report in chat is its summary.

3. `checks.mjs`. The per-finding browser harness, copying the pattern of `docs/changes/2026-09-13-session-2-manual-pass/checks.mjs` verbatim: the same Playwright resolution, viewport 1280, `file://` URL, one `check('PL-nnn', ...)` per DOM test, one line per check, a summary line, exit 1 on any failure. That file's 19 checks are the worked example; read it before writing the first new one.

4. `plan.md`, from the sdlc-loop template, with the register as its Order of work and the profiler's current figures as its Golden values.

Reconcile before committing: every dimension D1 to D7 has been surveyed across all 17 sections and the register says so, including the dimensions that produced nothing. A dimension with no findings earns one line saying where you looked and what you found instead.
</intake>

<examples>
Three register rows in the required shape, one per class. The findings themselves are invented for illustration, the defect in example 1 included; the section ids, the component families and the cross-referenced rows are real at HEAD. Verify each finding of your own at HEAD before it earns a row.

<example index="1">
| PL-004 | D1 | `#s5` · the sentence opening the frontier chart's subtitle · L<n> | "Plotted together, the price-sheet ranking falls apart." | Keep the sentence and give it its subject: the sentence above it now names the index and the cost, so "Plotted together" has an antecedent again after the batch-2 lede cut. Reads "Plot the two together and the price-sheet ranking falls apart." | FIX | H | P1 | the batch-2 lede cut in this section; find its JN id in the 09-13 ledger | GREP old = 0, new = 1; GATE T7 prints 2 literal / 38 entity | a1b2c3d | `grep -c` 0 then 1; T7 9 passed, 0 failed; DOM mode no thrown errors | LANDED |
</example>

<example index="2">
| PL-017 | D6 | `#s6` and `#s6b` · `builder-assembler` at both, consecutive in the core reading order | Both ask the learner to assemble a prompt from named elements, one by selecting levels and one by selecting parts | Merge the two into one builder that carries both moves, or give the second a different verb: the learner meets the same interaction twice in a row and the second teaches nothing the first did not. Cost about 40 minutes with the harness. Count falls 19 to 18, toward the band. | PROPOSE | M | P2 | DW-094, DW-101, F-7; profiler consecutive pair `s6->s6b` | none run; the comparison table in the report carries the evidence | (none) | reported, not landed | PROPOSED |
</example>

<example index="3">
| PL-022 | D2 | `#s10` · the six triage explanations | Four or five short bullets each, opening with Correct or Not this one | Stays as it is. The parallel shape is deliberate and was set by JN-035 on the instructor's instruction that the students are at a low level; tightening the bullets further would cost the plain-language register they were rewritten to reach. | LEFT-AS-IS | H | P1 | JN-035 | GREP "Correct." = 6, unchanged | (none) | examined, kept | LEFT-AS-IS |
</example>
</examples>

<execution>
Survey first, all seven dimensions across all 17 sections, and write the register before the first page edit. The order after that is P1 in page order, then P2, then P3, FIX rows only. One finding, one commit, message in the repository's style with the PL id in parentheses. Push after the register commit, at every section boundary and at the end. The branch is pushed and left for Jared to merge.

Before every commit, the governing prompt's three pre-commit steps run as written there: `node scripts/test-editorial-regions.mjs`, the DOM-mode load or `checks.mjs` whenever the edit touched a `<script>` block, and the finding's own test with its output pasted into the Result column. The landing helper the 09-13 handback describes measures T7, re-records a fallen figure under P2, appends the register line and commits, and it is the pattern to copy.

Generated regions change by changing what their generator reads and running it, exactly as the governing prompt sets out. `last_verified` stays as Jared attested it. Every case figure stays in the `COLE` or `COLEDOCS` constant it comes from. Every source claim traces to a `SOURCES.md` record, and a finding that needs a new one is PROPOSE, since the hosts this environment reaches are limited and a record is only as good as the fetch behind it.

If the context window compacts, the register on disk is the state: read `register.md` and resume at the first row without a Status.
</execution>

<verification>
The full gate from `<verification>` of the governing prompt runs at every section boundary and once more at the end, with the same lines red by design and every other red line fixed in the next commit or raised as a halt. Add four things to it for this pass:

1. The profiler, before and after: `node scripts/audit/section_profile.mjs session-2/index.html`. Report the per-section word count delta, the interaction count, the ICAP spread and the consecutive-pair list, before against after. Word counts hold or fall. The interaction count holds at 19 or falls.
2. `checks.mjs` from a clean HEAD, with its OK count equal to the number of LANDED rows carrying a DOM test.
3. Screenshots at 1280 and 400 px of every section you edited, to `.verify-shots/`, named by PL id, with the paths listed in the handback. The 400 px pass also confirms the page keeps its two-pixel pre-existing overflow and gains none (DW-119).
4. A read of your own diff, start to finish, against the register: every hunk traces to a PL row, and every LANDED row traces to a hunk.

Then the two-pass sweep the governing prompt requires, uncollapsed. Pass one lists every defect you found on the rendered page and in the diff, the uncertain ones included. Pass two filters to what affects tonight's room.
</verification>

<records>
`docs/deferred-work.md`: a dated note on every row a finding touches, and a new row for every HALTED finding and every baseline lowering. The PROPOSE rows earn one row between them, pointing at `recommendations.md`, so the register stays the single list.

`CHANGELOG.md`: one entry dated 2026-09-14 in the format of the top entry, grouped by section with PL ids inline, then `python3 scripts/build-changelog.py` with `changelog/index.html` committed alongside.

`instructor-notes/session-2.md`: every ripple landed as it happens, and a "Changed since the 09-13 run sheet" line at the top, so Jared re-reads only what moved before printing.

`docs/changes/2026-09-14-session-2-polish/handback.md`: the sdlc-loop template, plus a register totals table by Status, the run-sheet deltas, and the "What to watch for" click paths for anything only a human can confirm.
</records>

<constraints>
MUST
1. Every finding carries a register row and a Status the Result column backs. A row reads LANDED when its Result shows the command and the output; every other row reads LEFT-AS-IS, PROPOSED or HALTED.
2. Every FIX row passes all six lines of the FIX test. A finding that fails one line is PROPOSE, whatever its merit.
3. The instructor's recorded decisions win over your reading of the prose. Where a passage is short, blunt or asymmetric because a JN row made it so, that is the finished state; say so in a LEFT-AS-IS row and move on.
4. Every figure, name, date, citation and legal characterisation reads after this pass exactly as it reads now. A finding that would change one is PROPOSE.
5. Every claim in the report about what the page contains cites a command you ran in this session.
6. Every dash you author is a colon, a comma or a full stop, and the baseline moves only in the direction P2 authorises.

SHOULD
7. The smallest edit that fixes the finding wins. Where a sentence works and reads plainly, it stays.
8. New prose stays lean: the instructor narrates this page live, the room's one written complaint was density, and every batch of notes cut rather than added.
9. LEFT-AS-IS rows are reported with the same care as fixes, because the restraint is the finding.
10. The survey covers all seven dimensions before the ranking, so the register reflects the page rather than the reading order.

PREFERRED
11. Run-sheet ripples land as they happen, since the sheet is printed before the session.
12. Where two fixes touch the same sentence, they share one commit and one PL parent row.
</constraints>

<report>
The reply at the end of every turn opens with this, and nothing precedes it:

```
Pass: polish. Branch: <name>. HEAD at start: <sha>. Toggles: P1 <value>, P2 <value>, P3 <value>, P4 <value>.
Reads: the Gate 0 list, path and what each established.

Register totals
| Status | Count | P1 | P2 | P3 |
|---|---|---|---|---|
| LANDED | | | | |
| PROPOSED | | | | |
| LEFT-AS-IS | | | | |
| HALTED | | | | |

Findings by dimension
| Dimension | Surveyed | Found | Landed | Proposed |
|---|---|---|---|---|
| D1 seams | 17 sections | | | |
```

Then, in this order:
- The full register table, page order.
- Interaction comparison: one row per `work-along-gate` and one per `builder-assembler`, saying what each asks the learner and which two overlap.
- Profiler deltas: per-section word count before and after, interaction count, ICAP spread, consecutive pairs.
- Gate: the summary line of every command, verbatim, and every red line in full.
- Recommendations: the PROPOSE rows ranked by payoff against effort, each with its minute cost and its ripple, the strongest first, written so Jared can answer yes or no to each without opening a file.
- Red team: the three edits in this pass most likely to be reverted, why Jared would revert each, and what evidence would settle it.
- What to watch for: click paths and expected sights for anything only a human confirms.
- Next session should: three actions and the file to read first.
</report>

Surface a flawed premise, a constraint conflict or an ambiguous finding explicitly, at the top of the turn it appears in, and let it stand as a flag rather than resolving it quietly. A reasonable guess is a finding to report, not a decision to implement.
