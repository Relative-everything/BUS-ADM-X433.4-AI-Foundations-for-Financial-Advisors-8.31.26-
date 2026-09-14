# Plan: Session 2 polish pass (the seams after three deletion batches)
From: direct request in chat, 2026-09-14 ("Execute attached on session 2", the kickoff in this folder). Date: 2026-09-14. Tier: Lite (every change is inside `session-2/index.html` or a record of one).
Status: implemented, 2026-09-14: the 18 page FIX rows landed one commit each (c5e782d to e9bebee), PL-015 in the records commit; 9 PROPOSE rows reported in `recommendations.md`; 9 LEFT-AS-IS rows examined and kept. Accepted by kickoff P3 (pre-accepted for the FIX class, reserved for PROPOSE), 2026-09-14. Toggles at their defaults: P1 land the small, propose the large; P2 ratchet authorised, falling only; P3 pre-accepted for FIX; P4 single-threaded.

## Reads
- `docs/changes/2026-09-13-session-2-manual-pass/kickoff-prompt.md`: the governing process; the tooling block, the ripple list, the generated-region rule, the verification gate, the records, the halt list, the report shape.
- `docs/changes/2026-09-13-session-2-manual-pass/handback.md`: the twelve open flags F-1 to F-12, the gate lines that count as green, the two nits this pass re-examines (the §01 lock message, the dead exports).
- `docs/changes/2026-09-13-session-2-manual-pass/ledger.md`: JN-001 to JN-037, what each batch cut, rebuilt or added, with the commit of each.
- `docs/changes/2026-09-13-session-2-manual-pass/plan.md`, `checks.mjs`, `notes-verbatim.md` (L52-58, 65, 78-80, 88-89): the plan shape, the harness pattern copied verbatim, the instructor's words behind JN-009, JN-016, JN-024, JN-025, JN-031.
- `docs/changes/2026-09-12-session-2-preflight/handback.md`: the 09-12 state, the retagging ("every interaction is tagged as its real family"), the axis-line nit, the stamp.
- `MAINTAINING.md`: pre-push gate, migration checks, generated regions, sources and the two dating fields, the editorial checks and the standing baseline rule.
- `EDITORIAL.md`: the region classifier, `authoredProse`, A8, A9, A16, B7 (heading case), B8, D1.
- `docs/deferred-work.md`: the header decisions through batch 3; rows DW-087 to DW-119, DW-050, DW-066, DW-092, DW-093, DW-094, DW-101, DW-105, DW-115 to DW-119.
- `instructor-notes/session-2.md`: every slot's element id, `data-comp`, opener and poll, checked against the page by grep.
- `docs/audits/session-2-review-2026-09-11.md` §10 (F-087 to F-091) and `audit/SESSION-2-CONTENT-AUDIT-2026-09-09.md` headings: the finding-id vocabularies.
- `CHANGELOG.md` top entry: the format.
- `docs/audits/profiles/session-2.json` and `scripts/audit/section_profile.mjs`: the committed profile and how it counts; the profile is stale for `s5` (PL-015).
- `scripts/editorial-baseline.json`, `scripts/test-editorial-regions.mjs` (T7), `scripts/verify-browser.mjs` (the Playwright resolution).
- `SOURCES.md`: the records the page cites (wolfram, case, aa, magesh, openai-pricing, pricing, context-windows, api-messages, laplace through kessler, memory, models, personalization).
- The lesson-builder references `pedagogy.md`, `component-bank.md`, `evidence-standards.md`, `build-checklist.md`, `repo-workflow.md`; the sdlc-loop's four reference files.
- `session-2/index.html` at 88d89c9, all 3,302 lines, from disk.
- Chromium probe of the page (scratch `probe.mjs`): the `&sect;` rendering, the B4 caption and axis, the toggle focus box, the unlabelled controls, the 400 px width.

## Files that change
- `session-2/index.html` modified (the FIX rows: PL-002, 005, 009, 010, 016, 018, 019, 020, 021, 022, 023, 025, 027, 028, 029, 030, 032, 033).
- `docs/audits/profiles/session-2.json` regenerated (PL-015 and the after figures).
- `instructor-notes/session-2.md` modified: a "Changed since the 09-13 run sheet" line at the top; no slot changes, because no id, `data-comp`, opener, poll or minute moves.
- `docs/deferred-work.md` modified: dated notes on DW-093, DW-094, DW-101, DW-118, DW-119; one new row for the PROPOSE set pointing at `recommendations.md`; a row per HALTED finding or baseline lowering if either occurs (none expected).
- `CHANGELOG.md` modified and `changelog/index.html` regenerated.
- This folder: `kickoff-polish.md`, `register.md`, `recommendations.md`, `checks.mjs`, `plan.md`, `handback.md`.
- Not touched: `CASE.md`, `SOURCES.md`, anything between the CASE, SOURCES or APX* sentinels, `scripts/editorial-baseline.json` unless a fall is measured (none expected), sessions 0.1, 1, 3, 4, the managed style fence.

## Order of work
The register is the order: P1 FIX rows in page order (PL-005, 009, 010, 016, 018, 019, 020, 021, 022, 023, 027, 028, 029, 030), then P2 (PL-002, 025, 032, 033), then P3 (PL-015 with the records). One finding, one commit, the PL id in parentheses. Push after the register commit, after §02, after §04, after §06, after §08, after the P2 group, and at the end. Before every commit: `node scripts/test-editorial-regions.mjs`; the DOM-mode validator or `checks.mjs` whenever the edit touches a `<script>` block; the row's own test with its output in the Result column.

## Golden values (the before figures; every one measured this session, none predicted)
| Value | Where | Derivation | Conf. |
|---|---|---|---|
| T7 session-2 2 literal / 38 entity / 40 total, 9 passed | `test-editorial-regions.mjs` | run at 88d89c9 | H |
| 17 sections (16 lesson, 11 core); timing 150 of 150; 19 roots in 10 families; ICAP P 0 A 6 C 12 I 1; pairs `s1->s2`, `s6->s6b`, `s9->s10`; prose words per minute median 27.3 | profiler at HEAD, scratch copy | run at 88d89c9 | H |
| `s5` 1,077 words / 966 prose at HEAD against 610 / 499 in the committed profile; every other section identical | profiler diff | run at 88d89c9 | H |
| `checks.mjs` (09-13) 19 OK, 0 FAIL; this pass's `checks.mjs` 0 OK, 18 FAIL at HEAD | both harnesses | run at 88d89c9 | H |
| 400 px `scrollWidth` 400 at core-only and at +Standard | probe | run at 88d89c9 | H |
| Sonnet 5 blended $4.00, Terra $5.63 at 3:1; per-task $2.29 and $0.52, ratio 4.4 (PL-009's "fourfold") | `MODELS` array | arithmetic on the page's own figures | M, derived |
| Triage key: 2 sound, 1 mis, 2 nd, 1 fab (PL-026) | `CITES` at HEAD and at 7cf88db | `grep -o "a:'[a-z]*'"` | H |
| B4 adoption chart: 3 bars, last row bottom 144, axis y2 222, caption y 240 (PL-025) | probe | Chromium read | H |

## Risks
- Riskiest step: PL-020, PL-023, PL-025, PL-018, PL-019, PL-029, PL-030 touch `<script>` blocks; each is checked in Chromium by its own `checks.mjs` row and by the DOM-mode validator before commit (DW-103 discipline).
- The em-dash ratchet should not move: no FIX row deletes a sentence carrying `&mdash;` (checked by reading each anchor); T7 runs before every commit and a fall would be recorded under P2 with its DW row, a rise is impossible by rule.
- PL-025 changes one chart's `viewBox`; the harness asserts every label inside the frame at 1280 and the screenshots show it at 400.
- Interpretation: PL-016, PL-022 and PL-032 are craft judgments on pass-authored or 09-12 text, not on the instructor's words; each is one revert.
- Nothing is irreversible: one branch, one commit per row, no merge.

## Rejected options
- A Workflow fan-out under Ultracode: P4 and sdlc-loop rule 2 keep the pass single-threaded; the survey was one read of the page and one probe.
- Landing the accuracy corrections PL-026 and PL-034 tonight: each changes a figure or a date, which `<classes>` reserves for the instructor; both are opened at the top of the report so a yes lands them in minutes.
- Landing the toggle focus ring (PL-004) and the dead CSS (PL-035): page-level rules fail FIX line 1; each is a two-minute edit on a yes.
- Retagging the four mis-tagged roots (PL-003): reverses part of the 09-12 decision and moves what V6 prints; the instructor's call.
- Adding "in this simulation" to §01's explanation (PL-008): raises the count in a paragraph JN-007 cut by two thirds; the caveat is already at the slider.
- Moving §02's intro paragraph next to its chart (PL-010): the order of the two inserted blocks is instructed; the dangling participle is fixed in place instead.

## Proof
- `checks.mjs` in this folder: 18 OK, 0 FAIL from a clean HEAD at the end, one per LANDED row with a DOM test.
- `test-editorial-regions.mjs`: 9 passed; T7 prints session-2 at 2 literal / 38 entity unchanged.
- The full gate of the governing prompt's `<verification>` block with only the known-red lines red (V2, V6, V8, `#pnum`, the two fragments).
- Profiler after: 19 roots, every section's word count equal or lower, ICAP and pairs unchanged.
- Screenshots at 1280 and 400 px of every edited section in `.verify-shots/`, named by PL id.

## Departures from plan
- `checks.mjs` (a named file) aborts every http(s) request in its browser context. Each page load waited about 13 s for the egress-blocked Google Fonts request to fail (measured 12,864 ms against 188 ms with the abort), which put one landing past the four-minute mark; nothing under test needs the request. The 09-13 harness is untouched. Recorded in the commit that carries it (58d9aaa).
- PL-025 (a named step, `session-2/index.html`): the harness's inside-the-frame assertion failed on the first draft because the caption started at the bar axis (x 250) and ran to about 741 in a 700-unit frame at HEAD as well, an overflow the four-row layout had hidden. The caption now starts at x 14 like the §07 captions; recorded in the row and the commit (f6f0632).
- No other file changed outside the list above; no baseline moved (T7 at 2 literal / 38 entity after every commit).
