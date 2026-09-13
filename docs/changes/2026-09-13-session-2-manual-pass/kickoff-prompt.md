EXECUTE the Session 2 manual-pass notes on this session's branch, under the sdlc-loop and the interactive-lesson-builder skills, against `session-2/index.html` on disk. The notes are the attachment to this message. Read everything below before the first tool call.

<decisions>
Four toggles. Each has a default already chosen. A default is changed only by Jared editing this block before pasting; never infer a different choice from anything else in this prompt or in the repository.

K1 · The em-dash ratchet (`EDITORIAL.md` A8, A9, D1; `MAINTAINING.md` "The editorial checks").
DEFAULT = AUTHORISED. This is Jared's instruction, in words, for this pass: the A9 figure for `session-2` in `scripts/editorial-baseline.json`, and for `session-3` or `session-4` only where a parity ripple reaches them, may be re-recorded DOWN to whatever these edits produce. Each lowering rides in the same commit as the edit that caused it, with the `docs/deferred-work.md` row `MAINTAINING.md` requires: rule, file, before, after, the JN id that moved it. A rise stays impossible: no text you author carries an em dash.
ALTERNATIVE = NOT AUTHORISED. An item whose edit would move any baseline is HALTED with a flag, the edit is not made, and the pass continues with the rest.

K2 · The Gate 1 stop.
DEFAULT = STOP AFTER THE LEDGER. Commit `notes-verbatim.md`, `ledger.md`, `checks.mjs` and `plan.md`, push, print the ledger summary, and end the turn with the single word AWAITING. Edit no other file until a reply containing PROCEED arrives. That reply may strike or amend rows by JN id; apply the strikes to the ledger before the first page edit.
ALTERNATIVE = PRE-ACCEPTED. Acceptance of `plan.md` is granted by this prompt (record it in the plan as "accepted by kickoff K2, 2026-09-13"); continue from the ledger commit straight into execution and halt only on the conditions in <halt>.

K3 · The notes in the repository.
DEFAULT = COMMIT, REDACTED. `notes-verbatim.md` is committed with three substitutions and nothing else altered: a learner's name becomes "a learner"; the submission platform's name, if it appears, becomes "the submission platform" (instructor decision of 2026-09-08, the name appears nowhere in the tree); a retired case fact or a retired name is described by its shape rather than quoted: `verify-migration.mjs` check 1 walks the whole tree for the former and whitelists only the register files, and the 2026-08-29 audit's discipline (`audit/AUDIT-2026-08-29.md`, "This file names no retired string") covers the latter. Record every substitution at the top of the file. The repository is publicly served.
ALTERNATIVE = SCRATCHPAD ONLY. The notes stay out of the tree; the ledger then quotes each item in full so the ids resolve without this conversation.

K4 · Threads.
DEFAULT = SINGLE-THREADED. sdlc-loop standing rule 2: no subagents, no Workflow, no worktrees, whatever Ultracode setting the session carries.
ALTERNATIVE = read-only Explore agents for the anchoring step of <intake> only; every edit, test and commit stays on the main thread.
</decisions>

<role>
You are the build engineer for this course repository: a front-end engineer who ships self-contained ES5 lesson pages with no framework and no build step, and a curriculum editor who holds every sentence to `EDITORIAL.md` and every figure to `CASE.md` and `SOURCES.md`. Jared, the instructor, is the builder in the sdlc-loop skill's sense. His notes are the specification. Your interpretation of them is the largest risk in this task, larger than any code defect, which is why every item carries an interpretation confidence and a low one is flagged rather than guessed.
</role>

<context>
Session 2 is taught tomorrow, 2026-09-14, 6:00 to 9:00 PM Pacific, from `session-2/index.html` at core-only depth (register decision D1; run sheet `instructor-notes/session-2.md`). Jared has just done the manual read-through that the 2026-09-12 pre-flight handback anticipated, and the attached document is the result: six to nine pages of granular, unformatted notes, mostly in page order, each bullet asking for a specific change. Some bullets are already true on the page (the pre-flight landed after the live page was read). Some collide with a repository rule. Some ask a question rather than instruct. Some target another lesson. Every one gets an id, a disposition and evidence.

The analog is the Session 1 rework of 2026-08-28 to 08-29 (pull requests #11 to #17: the deletions pass, the titles-and-voice pass, the card-sort rebuild) and the Session 2 pre-flight of 2026-09-12 (`docs/changes/2026-09-12-session-2-preflight/`). Follow the second one's shape: a committed plan, one edit class per commit, the repository gate green at the end, a committed handback. Carry its recorded lesson too: the measured inventory behind the Session 1 pass was never committed and was lost when that session closed (`docs/session-1-feedback-inventory.md`, provenance warning). Nothing in this pass lives only in chat.

The notes file is the attachment to this message. If it is `.docx`, load `anthropic-skills:docx` to extract the text; if `.pdf`, `anthropic-skills:pdf`; otherwise read it directly. If no attachment can be found, stop and say so. Notes are never reconstructed from memory.
</context>

<skills>
Load `anthropic-skills:sdlc-loop` and `anthropic-skills:interactive-lesson-builder` before Gate 0 and run under both. From the sdlc-loop: the gates, the halt list, the plan and handback templates, and the tier, which is Lite (every change is inside an existing surface; a NEW item that introduces a component family the page does not have is flagged, not escalated). From the lesson-builder: the non-negotiables (`references/pedagogy.md` s1, R1 to R12), the `DELTA` discipline applied to every item (apply only the described change; name every downstream ripple: sequence, timing, weighting, prerequisites), and `references/build-checklist.md` Parts A and B. Where the skills and the repository's governance touch, `MAINTAINING.md` and `EDITORIAL.md` win, then the sdlc-loop, then the lesson-builder. Say which won whenever it matters.
</skills>

<reads>
Gate 0, in this order. The first reply opens with the Reads list: path, one line on what it established.
1. `MAINTAINING.md`: "Pre-push gate", "The CASE.md v4.0 migration checks", "Standing purge list", "The appendix reflow and its generated regions", "Sources, the bibliography and the live-data register", "The two dating fields, and the one you may not write", "The editorial checks".
2. `EDITORIAL.md`: the region classifier, the em-dash exemption register, A8, A9, A14, A16, decision D1.
3. `docs/changes/2026-09-12-session-2-preflight/handback.md` and `plan.md`: the state of the page, open flags F-1 to F-4, the gate output that counted as green, the scratch-harness pattern.
4. `docs/deferred-work.md`: the header decisions D1 to D9 and rows DW-087 to DW-114. Every item that matches a row cites it.
5. `instructor-notes/session-2.md`: the run sheet. Any edit that changes an element id, a `data-comp`, a minute figure, an opener sentence or the run order ripples here.
6. `docs/audits/session-2-review-2026-09-11.md` §1 and `audit/SESSION-2-CONTENT-AUDIT-2026-09-09.md` §0: the finding ids (F-nnn, S2-nn) the notes may echo.
7. `CHANGELOG.md`, the top entry, for the format.
8. The notes, in full.
9. `session-2/index.html`, the whole file, from disk (pedagogy s12.2). Record the HEAD SHA; every anchor is stated against it. Core section ids, in page order: `s0` (map and bridge), `sCold`, `s3`, `s5`, `s6`, `s6b`, `s7`, `s8`, `s10`, `s11`, `s12`. Appendix: `s1` (B1), `s2` (B2), `s4` (B3), `s9` (B4), `s12d` (B5), with `apx` as their index. Every interaction root carries `data-task` and `data-comp`.
10. From the lesson-builder skill: `references/evidence-standards.md`; `references/component-bank.md` only if an item is class NEW.
11. `scripts/verify-browser.mjs` (how Playwright is resolved in this environment) and `scripts/test-editorial-regions.mjs` (T7, the ratchet).
</reads>

<tooling>
From the repository root:
```
SKILL=$(ls -d /root/.claude/skills/synced/*/interactive-lesson-builder | head -1)
SCRATCH=<the session scratchpad directory named in your system prompt>
npm install --prefix "$SCRATCH/jsdom-env" jsdom      # jsdom lives in the scratchpad, never in the tree
export NODE_PATH=$(npm root -g)                      # Playwright and Chromium are global here
```
`verify-style.mjs` needs `RESTYLE_SWEEP=$SKILL/scripts/restyle_sweep.py`; `validate_dom.js` in DOM mode needs `NODE_PATH=$SCRATCH/jsdom-env/node_modules`. Both are recorded in DW-112.
</tooling>

<intake>
Turn the notes into the ledger before touching the page. Four files in `docs/changes/2026-09-13-session-2-manual-pass/`, committed together as the first commit on the branch. `plan.md` follows the sdlc-loop template: the ledger is its "Order of work", and its Golden values block lists every figure the notes introduce, with derivation and confidence.

1. `notes-verbatim.md`. The notes as written, one bullet per line, numbered, order preserved, wording untouched except K3's substitutions. The file's line numbers are the locator every ledger row cites.

2. `ledger.md`. One row per atomic ask, ids `JN-001` upward in notes order. A bullet that asks for two things becomes two rows plus a parent row marked SPLIT. A bullet that asks a question becomes a row of class QUESTION, answered in the handback, no edit. Columns:

| JN | Notes line | Note (first ten words) | Anchor at <SHA> (section id · data-task · quoted string · line) | Conf | Class | Pri | Cross-ref | Planned edit (one sentence; replacement text verbatim where the note supplies it) | Test | Commit | Result | Status |

Conf, the anchor confidence: H the note's quoted text is found once, verbatim; M found once after normalising quotes, case or an ellipsis; L not found, or found more than once. L is a HALT for that row, not a guess.

Class, closed vocabulary: PROSE (copy, no figure) · FIGURE (a number, date or name) · MECHANISM (JavaScript or behaviour) · STRUCTURE (order, minutes, eyebrows, the timing table) · NEW (an element or interaction that does not exist yet) · SOURCE (a chip, a footer entry, `SOURCES.md`) · LEGAL (a legal or tax characterisation) · RIPPLE (a block shared with another lesson) · INSTRUCTOR (a podium note; belongs in the run sheet, not on the page) · OTHER-LESSON · QUESTION.

Pri: P1 anything a learner sees at core-only depth tomorrow, anything false, anything broken · P2 appendix tier, async, instructor-only · P3 the note itself says later.

Cross-ref: the DW, S2, F, P or D id the item matches, or "none" after looking.

Test, one or more, closed vocabulary: GREP (`grep -c '<string>' session-2/index.html`, the count before and the count after) · DOM (a named check in `checks.mjs`) · GATE (a named line of a repository validator, quoted) · CONTRACT (for FIGURE and SOURCE rows: the chip resolves under V4, and the figure is read from a `COLE` constant or carried by a `SOURCES.md` record, not typed) · HUMAN (nothing scriptable can assert it; the exact click path and expected sight go in the handback's "What to watch for").

Status, closed vocabulary, filled during execution: DONE (edit landed and every listed test passed; command and output in Result) · DONE-HUMAN (edit landed; the only test is HUMAN) · ALREADY-TRUE (HEAD already satisfies the note; evidence in Result) · SPLIT · HALTED (flag id; nothing changed) · NOT-DONE (reason, and where it was routed) · DEFERRED (the note said later; register row). A Status the Result column cannot back is a fabrication under pedagogy R1; use DONE-HUMAN or NOT-DONE instead.

3. `checks.mjs`. The per-item browser harness: one `check('JN-nnn', async (page) => { ... })` per DOM test. Chromium through the same Playwright resolution `scripts/verify-browser.mjs` uses, viewport 1280 px, the page opened from a `file://` URL, one output line per check reading `JN-nnn OK` or `JN-nnn FAIL <reason>`, a summary line, exit 1 on any FAIL. jsdom is the fallback if Chromium cannot launch, and the report says which ran. The file is committed in the change folder and is not added to the pre-push gate; whether it joins the gate is Jared's decision, recorded as a flag.

4. `plan.md`, as above.

Reconcile before committing: every numbered line in `notes-verbatim.md` maps to at least one JN row, and the row count minus SPLIT parents equals the count of atomic asks. Print the totals by Class and by Pri.

Rendering rules for the ledger's Planned edit column:
- Replacement text Jared typed is rendered under EDITORIAL D1: no new em dash. A dash in the notes becomes a colon, a comma or a full stop, and the row records the substitution.
- A figure in the notes is Jared's assertion, not a source. It goes on the page with the chip and the record `references/evidence-standards.md` requires, or as `[UNVERIFIED, needs source]` with a flag naming it.
- A case figure is never typed. It is read from `COLE` or `COLEDOCS` at parse time, or the row is HALTED.
- A note that reverses a recorded decision (D1 to D9, a closed register row, a header decision) is a new instructor decision: record it in the register header dated 2026-09-13 citing the JN id, then implement it. If the reversal carries a ripple the note does not address, HALT on the ripple and say what it is.
- A note whose line numbers come from a view-source of the live page are hints only; the quoted string is the locator, verified at the HEAD SHA.
</intake>

<examples>
Three ledger rows in the required shape. The note text is invented for illustration; the anchors, element ids and register rows are real at HEAD.

<example index="1">
| JN-004 | 7 | "temp slider at zero should still say not deterministic" | #s3 · t-s3 · "real APIs still vary" · L<n> | H | PROSE | P1 | DW-092 item 4 | none: the slider's zero label already says it | GREP "real APIs still vary" = 1 | (none) | grep -c returns 1 at <SHA> | ALREADY-TRUE |
</example>

<example index="2">
| JN-031 | 42 | "bridge should reveal one answer at a time not all four" | #s0 · t-s0 · the `#bridge` reveal handler · L<n> | H | MECHANISM | P1 | DW-114 (S2-25) | a reveal control per item; the existing button stays as reveal-all; no prose change | DOM checks.mjs JN-031: click reveal on item 2, expect item 2's key visible and the keys of items 1, 3 and 4 still hidden | a1b2c3d | `JN-031 OK`; T7 unchanged at 2 literal / 64 entity; DOM mode, no script errors | DONE |
</example>

<example index="3">
| JN-057 | 88 | "delete the second sentence of the before-we-start paragraph" | #s0 · (none) · "<the sentence's first six words>" · L<n> | H | PROSE | P2 | DW-093 | delete the sentence; it carries one `&mdash;`, so A9 for session-2 falls 64 to 63 | GREP sentence = 0; GATE test-editorial-regions T7 reproduces the re-recorded baseline | (none) | K1 = NOT AUTHORISED in this run | HALTED F-2 |
</example>
Under K1's default, the third row instead lands DONE, with `scripts/editorial-baseline.json` lowered in the same commit and the register row opened.
</examples>

<execution>
Order: P1 rows in page order, then P2, then P3. One item, one commit, message in the repository's style (the session, the section, the substance) with the JN id in parentheses; SPLIT children share a commit only when they touch the same sentence. Push after the ledger commit, at every section boundary and at the end. No pull request, no merge, no force-push, no rebase.

Before every `git commit`:
- `node scripts/test-editorial-regions.mjs`. T7 prints the recorded figures for every lesson, or the re-recorded ones under K1 with the baseline change and its register row in the same commit.
- If the edit touched anything inside a `<script>` block, run `checks.mjs` or the DOM-mode validator and require zero load errors. On 2026-09-08 one unescaped apostrophe in a JavaScript string silently disabled every widget in Session 4 on the live site (DW-103), and no static checker sees that class of defect.
- The item's own tests, with the command and its output pasted into the Result column.

Generated regions are never hand-edited. Anything between the CASE, SOURCES, CARDSORT or APX* sentinels is rewritten by its generator (`scripts/inject-case.mjs`, `scripts/inject-sources.mjs`, `scripts/build-cardsort.mjs`, `scripts/build-appendix.mjs`); a note that asks for a change there is implemented by changing what the generator reads, then running it. `CASE.md` is out of scope for this pass: a note that needs it is HALTED.

Ripples you name in the row and land in the same or the next commit:
- Minutes, eyebrows, section order: `node scripts/build-appendix.mjs`, then V5 (150 exact) and the footer table; the run sheet's clock times.
- An element id, a `data-comp`, an opener sentence, a poll: `instructor-notes/session-2.md`.
- The cold-open renderer (`COLD_CHECKS`), the pacing block, the footer heading: byte-identical in `session-3` and `session-4` (DW-066, DW-074). `session-0.1` and `session-1` are outside this pass; say so in the row.
- A source: the `SOURCES.md` record, then `node scripts/inject-sources.mjs` (six footers change), `node scripts/build-bibliography.mjs`, `node scripts/build-unsourced.mjs`; a new record with an empty `last_verified` needs `node scripts/attest-verified.mjs --sync`. You never write `last_verified`, whatever the notes say: list every source Jared says he has verified under Flags, for him to attest at an interactive terminal.
- The session title: the `index.html` card, the `README.md` table, V10.
- Prose that restates a case figure: qualitative wording or a `COLE` constant, so `case-inventory.mjs --report-check` stays current.

Your context window will be automatically compacted as it approaches its limit. Do not stop early for token budget reasons. The ledger on disk is the state: after a compaction, or in a fresh session, read `ledger.md` and resume at the first row without a Status.
</execution>

<verification>
At every section boundary and once more after the last item, run the full gate from the repository root:

```
node scripts/test-editorial-regions.mjs
node scripts/verify-editorial.mjs
node scripts/verify-case.mjs
node scripts/inject-case.mjs --check
node scripts/inject-sources.mjs --check
node scripts/verify-sources.mjs
node scripts/verify-migration.mjs
node scripts/build-appendix.mjs --check
node scripts/build-unsourced.mjs --check
node scripts/build-bibliography.mjs --check
node scripts/build-cardsort.mjs --check
node scripts/case-inventory.mjs --report-check
RESTYLE_SWEEP=$SKILL/scripts/restyle_sweep.py node scripts/verify-style.mjs
python3 $SKILL/scripts/validate_lesson.py session-2/index.html --case Cole --purge "Okonkwo,Reyes,Adaeze,Ilesanmi" --require-timing --require-tagging
NODE_PATH=$SCRATCH/jsdom-env/node_modules node $SKILL/scripts/validate_dom.js session-2/index.html
python3 $SKILL/scripts/restyle_sweep.py . --check
NODE_PATH=$(npm root -g) node scripts/verify-browser.mjs
NODE_PATH=$(npm root -g) node scripts/test-case-viewer.mjs
NODE_PATH=$(npm root -g) node docs/changes/2026-09-13-session-2-manual-pass/checks.mjs
node scripts/audit/section_profile.mjs session-2/index.html
```

Green means what the 2026-09-12 handback recorded. Only these lines may be red: `validate_lesson` V2 on the footer hyperlinks (DW-029); V6 on the interaction count and the adjacencies the page has by design (DW-094, DW-101; if a NEW item changes the count, say so); `validate_dom` on `#pnum` (DW-112); `restyle_sweep --check` on the two documented fragments. Any other red line is a regression you fix in the next commit or a HALT. It is never explained away, and `scripts/editorial-baseline.json` moves only under K1.

Then, from a clean HEAD (`git status` empty), run `checks.mjs` once more and reconcile: its OK count equals the number of DONE rows carrying a DOM test. Regenerate `docs/audits/profiles/session-2.json` with the profiler and report the per-section word and interaction deltas against the committed profile. Screenshots of every changed section at 1280 px go to `.verify-shots/` (git-ignored), named by JN id, with the paths listed in the handback.

Final sweep, as `AUDIT session-2/index.html` in the lesson-builder's sense: two passes, never collapsed. Pass one lists every defect you can find in the diff and on the rendered page, with severity and confidence, the uncertain ones included. Pass two filters to what blocks tomorrow. Both lists go in the handback.
</verification>

<records>
- `docs/deferred-work.md`: a dated note on every row an item closes or touches; a new row, in the table's format and with an owner, for every HALTED, NOT-DONE and DEFERRED item and for every A9 lowering.
- `CHANGELOG.md`: one entry dated 2026-09-13 in the format of the top entry, grouped by section, JN ids inline; then `python3 scripts/build-changelog.py`, and `changelog/index.html` committed with it.
- `instructor-notes/session-2.md`: every ripple landed, and a short "Changed since the 09-12 run sheet" list at the top, so Jared re-reads only what moved before printing it.
- `docs/changes/2026-09-13-session-2-manual-pass/handback.md` from the sdlc-loop template, plus a "Ledger totals" table (count per Status) and a "Run sheet deltas" list, committed with the final `ledger.md` and `plan.md`. Plan status reads implemented, or partial with the first unfinished JN id.
</records>

<halt>
Stop on the item, write the flag (severity, evidence, recommendation), leave the row HALTED, continue with the rest:
- An anchor at confidence L, or a note that matches two places on the page.
- Two notes that contradict each other, or a note that contradicts `CASE.md`.
- A baseline, snapshot or threshold that would move outside what K1 authorises.
- An edit inside a generated region, inside `CASE.md`, or between the CASE or SOURCES sentinels.
- A legal or tax characterisation the notes state as settled: implement it inside the §04 `.verify` gate and pose it as a question in the handback, never as settled prose.
- A figure with no source and no `COLE` constant behind it.
- Browser storage, an external script or stylesheet, or the live-model console on this page (`MAINTAINING.md` forbids the console on Sessions 2 to 4).
- A string on the standing purge list; a grade, a due date or a submission platform named on the page (Tier A and Tier B).
- A `verify-migration.mjs` check-20 failure after a prose edit: a pinned case figure, or its context, moved.
- A test that would have to be edited for the page to pass.
- Anything that looks like real client data, or a real learner's name, anywhere in the notes.
</halt>

<constraints>
MUST
1. Every atomic ask in the notes has a JN row and a final Status that the Result column backs. No row is dropped, merged away or left blank.
2. Interpretation below confidence H is flagged, not guessed. A wrong guess executed at scale is the failure K2's default exists to prevent.
3. No em dash in any text you author (EDITORIAL D1); no baseline moves except as K1 authorises.
4. No typed case figure; no `last_verified` written; no hand edit inside a generated region; no pull request; no merge.
5. Every claim in the handback about what the page contains cites a command you ran in this session (sdlc-loop rule 3).
SHOULD
6. The smallest edit that satisfies the note beats a rewrite; a rewrite happens only where the note says rewrite.
7. New prose stays lean: the page is worked live and the instructor carries the narration (pedagogy s3.9), and DW-093 records that density was already the room's one written complaint.
8. The final sweep reports every issue found, the uncertain ones included, before filtering to what blocks tomorrow.
PREFERRED
9. Run-sheet ripples land as you go, not at the end; the sheet is printed before the session.
</constraints>

<report>
The reply at the end of every turn, in this order, nothing before it:

Tier: Lite. Branch: <name>. HEAD at start: <sha>. Notes: <file>, <n> lines, <m> atomic asks.
Reads: the Gate 0 list.

Ledger totals
| Status | Count |
|---|---|
| DONE | |
| DONE-HUMAN | |
| ALREADY-TRUE | |
| HALTED | |
| NOT-DONE | |
| DEFERRED | |
| SPLIT | |

Per item: the full ledger table. At K2's stop, the plan-time columns only. Past about 150 rows, every row whose Status is not DONE in full, and the DONE rows as id, anchor and commit.
Gate: the summary line of every command in <verification>, verbatim, and every red line in full.
Flags: Blocking first, each self-contained (what, where with inline context, the options, your recommendation).
What to watch for: every DONE-HUMAN row as a click path and an expected sight, in page order.
Run sheet deltas.
Next session should: three actions, and the file to read first.

Under K2's default, the ledger turn ends with AWAITING and the page untouched.
</report>

Flag every constraint conflict, ambiguous note or premise error explicitly rather than resolving it silently. A reasonable guess is not a resolution.
