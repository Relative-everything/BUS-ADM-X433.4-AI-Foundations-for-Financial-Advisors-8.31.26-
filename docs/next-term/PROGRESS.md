# PROGRESS.md: the next-term-2027 run

Resume rule (RUNBOOK A.1.6): read `RUNBOOK.md` (A.0 first), this file, `DECISIONS.md` and `git log next-term-2027`, then continue from the first phase not marked **done**. Never redo a done phase unless its validators now fail.

| Phase | Status | Started | Finished | Commit | Validators |
|---|---|---|---|---|---|
| init (A.1) | done | 2026-10-11 | 2026-10-11 | `f0bf929` | n/a |
| 0 | done | 2026-10-11 | 2026-10-11 | (P0 commit) | all exit 0 except `verify-style` (skill absent) and `verify-wolfram-quotes` (no article copy); P0 report §1 |
| 1 | done | 2026-10-11 | 2026-10-11 | (P1 commit) | verify-facts --report 0; verify-facts (gate) 0; P0 validators unchanged |
| 2 | done | 2026-10-11 | 2026-10-12 | (P2 commit) | none required; `build-case.mjs` (v5 rewrite, run with `CASE_PATH`) recomputes 67 identities against the draft, all agree |
| 3 | done | 2026-10-12 | 2026-10-12 | (P3 commit) | build-case 0 · inject-case --check 0 · build-cardsort --check 0 · verify-case 0 · verify-style 1 (env) · verify-migration 1 (1c and 4 only: v4 lesson prose) · case-inventory --report-check 0 · test-case-viewer 1 (V9 on three lessons: v4 `COLE` keys in lesson code, D-030) · verify-browser 1 (same cause) |
| 4a | done | 2026-10-12 | 2026-10-12 | (P4a commit) | none required; register built from eight scans; `verify-migration` unchanged from Phase 3 (1c and 4 red: the v4 prose the register now lists) |
| 4b | done | 2026-10-12 | 2026-10-12 | (P4b commit) | verify-case 0 · verify-migration 1 (session-0.1 only, Phase 8) · verify-sources 0 · verify-facts 0 · verify-editorial 0 · test-editorial 1 (T7 ratchet fall, documented) · test-case-viewer 0 · verify-browser 0 · live-console 0 · verify-style 1 (env) |
| 5 | done | 2026-10-12 | 2026-10-12 | (P5 commit) | verify-facts 0 · verify-sources 0 · verify-case 0 · verify-migration 1 (session-0.1 only) · verify-editorial 0 · test-editorial 1 (T7) · test-case-viewer 0 · verify-browser 0 · live-console 0 · verify-style 1 (env) |
| 6a | done | 2026-10-12 | 2026-10-12 | (P6a commit) | none required; proposal tables sum to 150 (125) per session |
| 6b | done | 2026-10-12 | 2026-10-12 | (P6b commit) | build-appendix --check 0 · verify-case 0 · verify-migration 1 (session-0.1 only) · verify-facts 0 · verify-editorial 1 (A9 R11 corpus ratchet, D-048) · test-editorial 1 (T7) · test-case-viewer 0 · verify-browser 0 · live-console 0 · verify-style 1 (env) |
| 7 | done | 2026-10-12 | 2026-10-12 | (P7 commit) | verify-case 0 (12 files) · test-case-viewer 0 · verify-browser 0 · verify-sources 0 · verify-facts 0 · verify-migration 1 (session-0.1 only) · verify-editorial 1 (A9 R11) · live-console 0 · verify-style 1 (env) |
| 8 | pending | | | | |
| 9 | pending | | | | |
| 10 | pending | | | | |
| 11 | pending | | | | |

## init (A.1): run files

Branch `next-term-2027` created from `main` at `da7b003` (PR #45 merged 2026-10-11, the deferred-work catch-up). `docs/next-term/RUNBOOK.md` holds the attachment verbatim under an A.0 amendments block (ten reductions from the logic check, the catch-up deltas, the environment). `PEDAGOGY.md` in the repo root is byte-identical to the attachment, so nothing was committed for it (D-003). Local annotated tag `fall-2026-final` on `main` (not pushed, D-016). Skill gate: the interactive-lesson-builder skill is not installed; A.1.7 fallback applies for the whole run.

## Phase 0: freeze Fall 2026, read and report repo state

**Report:** `docs/next-term/P0-baseline-report.md`. Tag `fall-2026-final` on `da7b003` (local; `git push origin fall-2026-final` is Jared's).

**Validator exit codes (da7b003):** build-case 0 · inject-case --check 0 · build-cardsort --check 0 · verify-case 0 (7 of 7 blocks, 20 layout rules agree) · verify-migration 0 (15 passed) · test-case-viewer 0 · verify-style **1** (skill absent, environment) · case-inventory --report-check 0 · build-appendix --check 0 · verify-sources 0 · inject-sources --check 0 · build-bibliography --check 0 · build-unsourced --check 0 · test-editorial-regions 0 (9 passed) · verify-editorial 0 (0 hard, 2 A12 advisories) · test_live_console 0 (86 passed) · attest-verified 0 · verify-wolfram-quotes **1** (needs an article copy, none in tree) · verify-browser 0 (107 PASS) · change-folder sets: all pass except the known `2026-09-19-session-3-simplify` V6 line (history) · catch-up `checks.mjs` 0 · session-5 section tests 962/0 · drags.mjs 36/36.

**Core/appendix minutes:** S1 69/81 (150) · S2 69/81 (150) · S3 67/83 (150) · S4 67/83 (150) · S5 59/66 (125) · S0.1 120 core, no appendix. Every structured discussion (A7, B5, C4, D4, E5) is in the appendix; every session but S3 has an 8-minute `sCold` cold open in core.

**Case dependency map:** report §3 (18 consumers; `build-case.mjs` grabs about 100 figures by v4-specific regex, `inject-case.mjs` writes v4 prose in both viewer tabs, `verify-migration` checks 1, 1b, 4, 7, 11 and 20 are v4-keyed, `build-cardsort` pins v4 Part J, Part L is the IDGT flowchart; `session-1` reads 12 `COLE` keys at runtime).

**Volatile-fact hits per file:** hub 0 · S0.1 143 · S1 62 · S2 50 · S3 7 · S4 93 · S5 88 · instructor notes 92 across 13 files (full table in the report's §A).

**Deferred-work rows on lessons, CASE.md or case scripts:** 71 open rows listed in report §5; the register was not edited.

**Contradictions with the plan:** report §7 (ten items). The important ones: the local `main` ref lagged `origin/main` and the branch was re-based (D-017); `verify-case` has a layout check the runbook does not know; the runbook's marker form is undeclared under A16; the LMS name already appears in instructor-authored files outside served pages; the `claude` CLI is available for recaptures; primary government hosts are unreachable (R7 governs).

## Phase 1: FACTS registry and validator

**Built:** `facts/FACTS.json` (43 records), `facts/build-facts-md.mjs` (generates `facts/FACTS.md`, idempotent, `--check`), `scripts/verify-facts.mjs` (checks (a) retired strings over hub, lessons, `cases/*.html` when present, instructor notes; (b) high-volatility records past their window, 14 days each-session / 180 days term-start, relative to `--as-of`; (c) dangling `data-fact="<id>"` and `FACTS:<id>` citations; `--report`, `--session N`). `MAINTAINING.md`: `facts/` in the layout; the volatile-fact check and the week-before ritual in the pre-push gate.

**Seeding:** the 34 runbook seed records plus the Phase 5 corrections were verified by ten research agents (two rounds, D-018). 43 records: 11 at H (every platform.claude.com, claude.com, support.claude.com and anthropic.com page fetched in full; the MCP blog; the Lee 2025 PDF; the context-window page), 31 at M (primary-domain search excerpts, host unreachable), 1 at L (`leaderboard-snapshot-arena`, secondary roundup only). **Downgrades from the seed's H:** `claude-consumer-retention` (M; the toggle's default is a GAP the page does not state), every regulation, state, adoption and leaderboard record (M, unreachable hosts), `leaderboard-snapshot-arena` (L). **Seed corrections found:** `sec-pda-withdrawal` release number is 34-103247 (the seed's 34-103244 is an unrelated NYSE notice); `colorado-sb26-189` took effect on signature (2027-01-01 is when the key duties begin); `cfp-genai-guide` URL and "not a binding standard" wording; the Max-plan help article id (11049741, not 11049744); OpenAI images now carry SynthID as well as C2PA and OpenAI text watermarking is EU-only / API opt-in; Arena renamed 2026-01-28; the Utah bill lineage (SB 149 2024, SB 226 2025, sunset 2027-07-01); Kitces notetakers date unconfirmed. **Added beyond the seed:** `claude-cache-and-batch-pricing`, `claude-model-ids-and-retirements`, `openai-provenance`, `aa-index-definition`, `sec-ai-washing-enforcement`, `kitces-notetakers-2025`, `openai-hallucination-paper`, `lee-2025-critical-thinking`, `irc-7872-thresholds`, `navajo-written-form`, `zero-shot-definition`, `portability-late-election`.

**`--report` hit list on the current pages:** zero retired-value hits after one false positive was withdrawn ("200K context window" describes Haiku 4.5 truthfully in session-0.1, so the string is not registered). No page cites a FACTS id yet (Phase 5 adds `data-fact` chips). The Fall 2026 spoken errors are, as the runbook anticipated, mostly not in the repo text; Phase 5 reads each page's model names, prices and plan facts against the registry rather than relying on the retired-string scan.

**Validators:** `verify-facts --report` exit 0; `verify-facts` exit 0; `verify-case`, `verify-migration` (15 passed after two register-naming slips in the draft and FACTS.md were reworded), `verify-sources`, `build-appendix --check`, `verify-editorial` unchanged from P0.

## Phase 2: CASE.md v5.0 draft

**Files:** `docs/next-term/CASE-v5-draft.md` (about 90 KB; Parts A to O in the order A..L, O, M, N) and `docs/next-term/CASE-v5-impact.md` (one row per consumer with the Phase 3 and 4 work and an effort estimate).

**One-screen household.** Meg Cole, 58, nurse manager (W-2 $145,000; 403(b) $420,000; Roth IRA $65,000), and David Cole, 59, senior mechanical engineer (W-2 $185,000; 401(k) $1,150,000 with $60,000 Roth and in-plan Roth conversion permitted since 1 January 2026; Roth IRA $70,000; rollover IRA $210,000 whose 2009 beneficiary form names his late mother with no contingent). Joint brokerage $360,000 (16.8% in his employer's stock), HSA $48,000, cash $85,000, 529 for Ryan $38,000: investable $2,446,000, 70.3% pre-tax. Naperville house $640,000, mortgage $165,200 at 3.10% to November 2037; net worth $2,920,800. Emma, 21 (graduates 2027, $14,000 of confidential debt); Ryan, 16. Meg's mother Ruth Alder, 83, in independent living at $4,650 a month with assisted living at $7,900; Meg holds her POA; Ruth's $190,000 IRA names Meg; Ruth lent Tom $25,000 undocumented. 2026 position: AGI $273,070, taxable income $240,870, federal tax $42,636 plus $335 NIIT, Illinois $12,641, payroll $25,217, after-tax cash $175,421 against $175,796 of outflow. Clocks: 59½ in 2027; Social Security from May 2030 (Meg) and September 2029 (David); Medicare 2033 and 2032; RMDs at 75 in 2043 and 2042; Roth conversion windows 2029 to 2042 and 2030 to 2041. Risk scores 38 (conservative) and 72 (moderately aggressive). Three landmines (§J): David's confidential employer news, Ruth's loan, Emma's debt. The unresolved question: how much to convert, in which years, with the bracket and the two-year Medicare look-back as the two prices and Illinois charging nothing.

**`[UNVERIFIED — needs source]` items:** none. Every 2026 parameter found at least a primary-domain excerpt and is labelled [M]; **no parameter is [H]** because no tax, benefit or Illinois page was readable in full (A.0.4, D-022). **[L] items for the week-before ritual (Part M):** the 2026 HSA age-55 catch-up, the Illinois 2026 exemption allowance, the 2026 AOTC phase-out, the DuPage effective property tax rate.

**Part K retired strings:** 23 rows mapping every v4 fact to its v5 replacement, and grep-target lists under eight headings (names and places; instruments and framings; household and company figures; structure, cash-flow and burn figures; rates; authorities; dates; the v3 layer), with seven conditional allowances ($1,000,000 as the umbrella or a token count, $4,000,000, $15,000,000, §7872, Rev. Proc. 2022-32, $25,000, $35,000, $410,000). Phase 3 carries them into `verify-migration.mjs` as check 1c.

**Added beyond the brief, and why (runbook constraint 5):** Tom Alder (Ruth's son: gives the landmine a third party and the 2011 wills a guardian), Frank Alder (so Ruth is a widow with a survivor annuity), Dorothy Cole (the deceased beneficiary the brief's stale designation needs a name for), Harlan Beck and his 2024 memo (the S3 internal document conflict, PEDAGOGY §5.3.2), Whitfield Law Group and Lindqvist Tax Associates (advisers of record, replacing the v4 firms), Halberd Controls (the prior employer behind the rollover IRA), the three landmines (PEDAGOGY §5.3.4 asks for exactly three), David's confidential employer news (moves the retirement date and the S5 workflow-maintenance case), Emma's job offer and debt (the S1 goals and the third landmine), the risk-questionnaire scores (the S1 deliverable needs numbers), the Dunmore plan amendment (the S2 and S3 cases turn on it), Ruth's residency agreement figures (the S3 corpus and the S5 one-pager).

**R1 self-review:** a separate Sonnet reviewer read the draft against the four R1 checks and returned 18 blocking and 31 minor findings (D-029). All were applied: the NIIT, payroll, Illinois and estate figures were recomputed (the HSA cafeteria-plan FICA exclusion and the 529 subtraction now applied; Meg's group life included), six Part K v4 figures corrected against the v4 file, about 90 grep targets added, labels and pointers added where an external rule stood bare, David's first Social Security month corrected to September 2029, Ryan made a sophomore, the Parts reordered, the D2 and D3 corpus tokens cleaned, the Sheet 1 and Sheet 2 label overruns fixed. The v5 `build-case.mjs` then recomputed 67 identities against the draft with every one agreeing.

**Impact table:** `CASE-v5-impact.md` (about 12 hours of Phase 3 script work, about 20 of Phase 4 prose work).

## Phase 3: adopt CASE v5.0 through the case pipeline

**Done.** `CASE.md` is the v5.0 draft, copied not paraphrased. `scripts/build-case.mjs` rewritten (table-row capture; 269 keyed figures; 67 Part M identities recomputed; Part O asserts the D3 against D7 conflict, D4's deceased beneficiary and six speaker turns; Part L asserts one SHEET-BREAK and two sheets; `CASE_PATH` runs it on a draft; `CASE_DEBUG` lists every miss at once). `scripts/inject-case.mjs`: the Facts tab, the Map tab (two sheets with the balance sheet by owner and the clock table behind Show detail), the `COLE` constant, `COLEDOCS`, and the recurring question (the pre-tax total and share, the two windows, the 24% bracket room) rewritten for v5; the opening sentinel is now found by case id at any version (D-031); the symlink main guard fixed (DW-165). `scripts/build-cardsort.mjs`: the §08 deck re-derived from the three v5 landmines, the identifying combination and four published parameters (D-024). `scripts/verify-migration.mjs`: new check 1c (the Part K v4 layer, about 190 strings, over the served surface: hub, lessons, cases, instructor notes, README, SOURCES; D-025); check 1b carries two v5 framings; check 4 carries the v5 allowances; check 7's composed figures and check 11's 28 identities are v5; check 20 pins the four figures of the recurring question. `scripts/case-inventory.mjs`: the v5 fact list (186 facts) and the pin transcription. `scripts/verify-browser.mjs`: the stamp regex reads `Case v5.0`. `MAINTAINING.md`: the migration-checks heading is v5.0, the case-spine paragraph is v5, the layout line and the purge list carry the v4 layer.

**Generated and injected:** `case-facts.json`, `case-corpus.json` (10 chunks, 6 turns), `case-extract.html` (4,456 bytes, stamp 83c3c03), `case-flowchart.html`; the v5 span written into all seven files (`inject-case --check`: 7 current, stamp 732dd65); the CARDSORT deck in session-1; `docs/case-fact-inventory.md` regenerated (UNGUARDED 55, 12 quantitative, against v5 facts; not comparable with the v4 count and re-baselined by the swap); `docs/unsourced-claims.md` regenerated (line numbers moved with the span).

**Exit codes:** build-case 0 · inject-case --check 0 · build-cardsort --check 0 · verify-case 0 (7 of 7 carry the v5.0 block; 20 layout rules agree) · verify-migration **1** · case-inventory --report-check 0 · verify-style **1** (skill absent) · test-case-viewer **1** · verify-browser **1** · test_live_console **1** · verify-sources 0 · inject-sources --check 0 · build-unsourced --check 0 (after regeneration) · build-appendix --check 0 · verify-facts 0 · test-editorial-regions 0 · verify-editorial 0 (0 hard, 2 advisory) · attest-verified 0.

**Expected failures, all owned by Phase 4 (v4 lesson prose and code outside the span):**

| Check | Where | Count or cause |
|---|---|---|
| verify-migration 1c | index.html 4 · session-0.1 76 · session-1 69 · session-2 55 · session-3 106 · session-4 27 · session-5 31 · README.md 2 · SOURCES.md 13 · instructor-notes: session-2.md 17, session-3.md 25, session-3-polls.md 7, session-3-canvas-posts.md 1, session-3-teaching-aid .md 2 and .htm 2, session-4.md 12, session-4-polls.md 1, session-4-rule-key .md 2 and .htm 2, session-4-teaching-aid .md 6 and .htm 7, session-5-polls.md 1 | 468 v4 strings on the served surface |
| verify-migration 4 | index.html 1 · session-0.1 2 · session-1 1 · session-4 2 | `$1,000,000` outside its v5 context (the v4 inherited IRA and 403(b), the v4 ribbon scale) |
| test-case-viewer V9 | session-1 (`toLocaleString` on an undefined `COLE` key), session-2 (`COLEv('saleUnits')`), session-3 (`COLEv('cpcValue')`) | lesson code reading retired keys; V1 to V8 pass in all seven files (D-030) |
| verify-browser 13 | session-1 (the same load error; the script then aborts on the page's card sort) | same cause |
| test_live_console | session-1 part A (the same load error, then a timeout) | same cause |

**Card-sort decision:** the deck still fits v5 (D-024); no replacement deck proposed.

**MAINTAINING.md diff:** heading "The CASE.md v5.0 migration checks"; the `build-case` and `build-cardsort` comments; the layout line; the case-spine paragraph; one purge-list row for the v4 layer.

## Phase 4a: old-case reference register

Eight hit-driven scans (one Sonnet agent per file group, 2.77M tokens, 573 tool uses, 58 minutes) read every check-1c hit, every Part K grep target, every `COLE` key read by lesson code and every data array, alt, aria, title and data attribute, then wrote one row per reference. `docs/next-term/P4-cole-reference-register.md` holds 774 rows with per-file ordered work lists for Phase 4b.

| File group | Rows | KEEP-NAME | REWRITE-V5 | REPLACE-EXERCISE | DELETE | RECAPTURE |
|---|---:|---:|---:|---:|---:|---:|
| session-1 | 101 | 23 | 67 | 3 | 8 | 0 |
| session-2 | 64 | 4 | 19 | 35 | 5 | 1 |
| session-3 | 152 | 27 | 105 | 8 | 1 | 11 |
| session-4 | 97 | 18 | 75 | 0 | 4 | 0 |
| session-5 | 42 | 12 | 30 | 0 | 0 | 0 |
| hub, README, SOURCES, probe-captures | 168 | 17 | 14 | 0 | 13 | 124 |
| notes s2 and s3 | 73 | 11 | 41 | 4 | 16 | 1 |
| notes s4, s5 (and s1, s0.1) | 77 | 19 | 54 | 0 | 4 | 0 |
| all | 774 | 131 | 405 | 50 | 51 | 137 |

RECAPTURE list, as units (D-033): session-2 `t-s8`; session-3 `offP0` and `offP1`; docs/probe-captures.md `P1` (three ways: `P1`, `P1b`, `P4`), `P2`, `P3`. The first three are re-run in Phase 4b with `scripts/recapture.mjs`; the probe runs are deferred to Phase 8 with Session 0.1.

REPLACE-EXERCISE proposals, all accepted under R2 (D-032):
- session-1 `s12` quiz items 5 and 6: the demand-note terms item becomes the IRMAA tier a 2030 conversion puts David in for 2032 (arbitrary fact, one right answer); the buy-sell reconciliation becomes reconciling the 2024 memo (no in-plan conversion) with the 2026 plan description (permitted).
- session-2 `s8` builder-assembler: "The Cole Buy-Sell Agreement" becomes "The Cole Roth Conversion Memo", the interview run on the 3 October 2024 memorandum; the questions the model asks back are re-captured.
- session-2 `s10` citation triage (six items, `CITES`): from the IDGT sale to the required-beginning-age question, with one planted wrong authority (src-kessler re-aimed, kind fabricated).
- session-3 `s4` retriever presets: four v5 queries (fail: the 2024 memo outranks the 2026 plan description; ambiguous: the two documents contradict each other; pass: assisted-living cost in one document; pass: the 2009 beneficiary form, which does not say the beneficiary has died), ranks computed with the page's own tokenizer.
- instructor-notes/session-2.md: the four rows that describe the session-2 exercises follow them.

Also found: five SOURCES.md records only v4 Session 2 cited (D-034); two check-1c false positives from an unanchored date regex (D-035); session-1, session-2 and session-4 each read retired `COLE` keys that throw at load (the Phase 3 reds, D-030), listed first in each work order.

Scratch: the scan workflow and its raw result are in the session scratchpad (`p4/scan-workflow.js`, `p4/scan-run.json`); the register is the committed form.

## Phase 4b: migrate the references

Eight Sonnet editors (one per file group, lessons first, then hub and notes; 2.42M tokens, 702 tool uses, 50 minutes) applied the register, then the orchestrator regenerated every generated region and ran the battery. No section was added, dropped, retimed or renamed; every lesson's section ids, data-nav titles, minutes and `tbudget` table are unchanged (build-appendix --check 0 on every file).

| File group | KEEP-NAME | REWRITE-V5 | REPLACE-EXERCISE | DELETE | RECAPTURE | Arithmetic recomputed | Thresholds re-derived | NEEDS INSTRUCTOR REDESIGN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| session-1 | 23 | 66 | 3 | 8 | 0 | 10 | 6 | 0 |
| session-2 | 4 | 17 | 35 | 0 | 1 | 10 | 8 | 0 |
| session-3 | 27 | 104 | 8 | 1 | 11 | 18 | 13 | 0 |
| session-4 | 18 | 74 | 0 | 4 | 0 | 12 | 8 | 0 |
| session-5 | 12 | 29 | 0 | 0 | 0 | 8 | 7 | 0 |
| hub-readme-sources | 17 | 14 | 0 | 13 | 0 | 6 | 5 | 0 |
| notes-s2-s3 | 11 | 41 | 4 | 16 | 1 | 10 | 11 | 0 |
| notes-s4-s5 | 19 | 54 | 0 | 4 | 0 | 11 | 7 | 0 |

RECAPTURE outcomes: session-2 `t-s8` (the questions the model asks back about the 2024 memo) re-run through `scripts/recapture.mjs`, labelled `claude-sonnet-5-5`, 2026-10-12; session-3 `offP0` (follow-up letter) and `offP1` (task list) re-run on the v5 NTSUM payload, labelled `claude-sonnet-5-5`, 2026-10-12, with the "not given" cell count and the planted-sentence check recounted from the real output; docs/probe-captures.md `P1`, `P1b`, `P2`, `P3`, `P4` deferred to Phase 8 with the banner rewritten to say so (D-033). No section needed instructor redesign.

Orchestrator steps after the editors: `attest-verified.mjs --sync` (five v4-only records dropped, four authority records adopted), inject-sources and build-bibliography (every footer regenerated), the nine check-20 pins the editors asked for (session-1 case panel, appendix bullet and CFP table; session-3 case panel and excerpt) in both `verify-migration.mjs` and `case-inventory.mjs` (13 pins, all agree), four `kind: authority` SOURCES.md records for the authorities the v5 citation triage names (D-039), EDITORIAL.md's `authority` example row, the recapture helper documented in MAINTAINING.md, and the three stale instructor-note PDFs re-rendered from their .htm with headless Chromium (D-037). The verify-migration date-regex anchors (D-035) are in this commit.

| Validator | Exit | Reading |
|---|---:|---|
| build-case, inject-case (--check), build-cardsort (--check), build-appendix (--check) | 0 | generated regions current on all seven files |
| verify-case | 0 | 7 of 7 lessons carry the current v5.0 block |
| verify-migration | 1 | 1c: session-0.1 76 hits, every other served file 0 (was 468 across 23 files); 4: session-0.1 only (two §7872 lines); every other check PASS; check 20: 13 pins agree |
| verify-sources, build-bibliography, attest-verified | 0 | 139 records, footers current |
| case-inventory, --report-check, build-unsourced --check | 0 | reports current |
| verify-facts | 0 | clean (chips arrive in Phase 5) |
| verify-editorial | 0 | 17 rules clean, 0 hard failures, 2 pre-existing advisories |
| test-editorial-regions | 1 | T7 only: the A9 em-dash baseline fell (session-1 66 to 65, session-2 38 to 37) because rewritten v4 copy carried dashes; reported, not re-baselined (A.0.3 item 8, D-038) |
| test-case-viewer | 0 | V1 to V9 pass on all seven files (the Phase 3 V9 reds are gone) |
| verify-browser | 0 | 13, 13b, 14, 14b, 15 pass on all seven files (a 14b label-outside-viewBox reading on session-5 appeared once mid-run and did not reproduce on the committed tree) |
| test_live_console | 0 | session-1 parts A and K pass (the Phase 3 red is gone) |
| verify-style | 1 | environment: the lesson-builder skill is absent (A.0.4) |

Handoffs recorded by the editors (not 4b work): Phase 5 corrections register rows the editors saw (the 2021-death-inside-the-five-year-window claim in session-2 §05 and the session-3 notes lapses in 2026); Phase 10 rewrites the instructor run sheets (dates, clock times, the session-3 presets, NTSUM and six-turn funnel are described from this report); Phase 8 owns session-0.1 and the probe re-runs; session-4-polls.md "five of eight identifiers" and session-5-polls.md option 4 wording are pre-existing and left for Phase 10.

## Phase 5: facts and accuracy correction sweep

Five Sonnet editors (lessons by group, hub, instructor notes; 1.89M tokens, 523 tool uses, 51 minutes) brought every volatile statement into agreement with facts/FACTS.json, cited each with a `data-fact` chip (lessons) or a `FACTS:<id>` note (instructor notes), and applied the Fall 2026 corrections register. The orchestrator then re-derived Session 1's words-to-tokens arithmetic on the current tokenizer rule, aligned chip letters with FACTS confidence, synced the sources lock, regenerated footers and bibliography, re-rendered the four changed instructor-note PDFs and ran the battery.

| File group | Corrections applied | Register rows not found (spoken only) | Figures changed | Chips added | FACTS ids cited | New SOURCES records |
|---|---:|---:|---:|---:|---:|---:|
| session-1 | 9 | 17 | 33 | 17 | 18 | 5 |
| session-2-3 | 12 | 17 | 31 | 10 | 13 | 2 |
| session-4 | 17 | 13 | 15 | 26 | 17 | 4 |
| session-5-hub | 7 | 17 | 16 | 1 | 4 | 0 |
| notes | 35 | 12 | 35 | 26 | 28 | 0 |

Corrections register, by row: output 2x to 5x, context-window definition, Claude watermark scope, ChatGPT training default, Max plan prices, consumer retention, exam-priorities status, Reg S-P clocks and in-force date, AI-use-policy status, personal-plan legality, portability late election (and the v5 Dorothy Cole window, which lapsed March 2026), IRC 7872 thresholds, Arena rename: each fixed wherever repo text stated or implied it (see the reports' `corrections_applied`). Rows found in no repo text, so spoken-only in Fall 2026 and owed to the Phase 10 "Verified facts" cards: MCP expansion, TCJA year, Max $500, one-shot versus zero-shot, Navajo (the notes carried the correction already), FINRA rescission, PDA proposal, the 24-hour CCO notice.

Session 1 model lineup: tier table, price chart, `TIERS`, `PATHS` and `DPT` arrays now carry Haiku 5.5 (tiered by prompt length), Sonnet 5.5, Opus 5.5 and Fable 5.1 at FACTS prices with cache-read multipliers and the Batch discount; a "Three leaderboards, and what each one measures" table names Artificial Analysis, LiveBench and Arena (formerly LMArena) with snapshots. Session 4: Reg S-P reads as in force with the 30-day and 72-hour clocks, every watermark claim follows the three FACTS records, and the AI-policy section opens on the ISS figure (78% of RIAs with no written policy, M).

New FACTS record: `claude-tokenizer-4-7` (H, primary page fetched 2026-10-12: Claude 4.7 and later produce about 30% more tokens for the same text). Its retired string (the 0.75 words-per-token rule) was still the basis of Session 1's token table and document-pass constants, so those were re-derived at about 1.8 tokens per word (555,000 words per million tokens, FACTS claude-context-window): 3,000 words about 5,400 tokens ($0.02 on Opus 5.5), 12,000 words about 21,600 ($0.09), 60,000 words about 108,000 ($0.43); the document pass is 108,000 tokens in and 11,000 out, so the ladder runs $0.02 (Haiku 5.5) to $1.63 (Fable 5.1), a $1.61 spread, and "still under two dollars" holds.

| Validator | Exit | Reading |
|---|---:|---|
| verify-facts (gate) | 0 | 44 records; 36 cited by served files; 8 never cited (claude-skills-format, openai-models-and-plans, gemini-plans, mcp-name, colorado-sb26-189, utah-ai-disclosure, tcja-enactment, zero-shot-definition: Phases 6b and 10 cite them) |
| verify-sources, build-bibliography, attest-verified | 0 | 150 records, 6 of 6 footers current |
| verify-case, inject-case --check, build-cardsort --check, build-appendix --check | 0 | no structural change (section ids, minutes, components identical) |
| verify-migration | 1 | 1c and 4 on session-0.1 only (Phase 8); check 20: 13 pins agree |
| case-inventory --report-check, build-unsourced --check | 0 | reports current |
| verify-editorial | 0 | 17 rules clean, 0 hard failures, 2 pre-existing advisories |
| test-editorial-regions | 1 | T7 only: A9 baseline session-1 66 to 64, session-2 38 to 37 (D-038) |
| test-case-viewer, verify-browser, test_live_console | 0 | all files |
| verify-style | 1 | environment |

Chips per lesson after the sweep (`data-fact` attributes): session-1 25, session-2 11, session-3 13, session-4 56, session-5 14, hub 0 (no volatile statement outside the generated span); instructor notes carry 100 `FACTS:` citations.

Left as labelled snapshots, for the deferred-work register (D-042): the Session 1 July 2026 frontier scatter and the Session 2 August 2026 cost-frontier chart (per-task costs FACTS does not hold), the OpenAI per-token rates on Session 2 (M), src-aa `index_version.session-1` still `[UNVERIFIED, needs source]`, src-kalai's `last_retrieved` (a run date, not a retrieval), the EU AI Act and state-law dates on Session 4 and in the Session 4 notes (not in FACTS, left as written), the retention-toggle default sentence on Session 4 (FACTS says the privacy page does not state the default).

## Phase 6a: section drop and add proposals

`docs/next-term/P6-section-proposals.md`: per-session tables with every row marked ACCEPT-HYPOTHESIS, MODIFIED, REJECTED or NEW and tied to an evidence row; R3 applied in DECISIONS D-043 to D-046 (the file accepted as written; Session 5's bridge at 5 minutes flagged; Laplace kept as advanced appendix; `sVend` deleted and Session 5's `s8` folded into `s5`).

| Session | Core before | Core after | Appendix before | Appendix after | Total | New core | New appendix | Deleted |
|---|---:|---:|---:|---:|---:|---|---|---|
| 1 | 69 | 60 | 81 | 90 | 150 | sCase | none | none |
| 2 | 69 | 63 | 81 | 87 | 150 | sCase | sZ, sDel | none |
| 3 | 67 | 61 | 83 | 89 | 150 | sCase | none | sVend |
| 4 | 67 | 60 | 83 | 90 | 150 | sCase | sAud | none |
| 5 | 59 | 45 | 66 | 80 | 125 | sCase | sE6 | s8 (folded into s5) |

Shared moves: the cold-open ritual becomes the case opener from `cases/case-N.html` (10 min, core), the named discussion moves into core at 15 min, the retrieval bridge takes 7 min in core (Session 5 keeps 5). Every core keeps at least six interactions, at least six component types with no two alike consecutively, one commit-before-reveal activity and one case link.

## Phase 6b: apply the accepted section changes

Five Sonnet editors (one per lesson; 2.39M tokens, 593 tool uses, 61 minutes) applied every proposal row. The orchestrator then fixed `build-appendix.mjs`'s "one minutes over the hour" grammar, regenerated every generated region, had one Sonnet agent relabel the SOURCES.md `used_for` clauses that cited the old section numbers (the footers are generated from them), flagged the EDITORIAL rows that PEDAGOGY v2.0 supersedes (D18 band, R11 boilerplate, the A9 R11 corpus baseline) under a dated heading in EDITORIAL.md, and ran the battery.

| Lesson | Core before | Core after | Appendix before | Appendix after | Total | Sections core / appendix | New sections (component, min) | Promoted | Demoted | Deleted |
|---|---:|---:|---:|---:|---:|---|---|---:|---:|---:|
| session-1 | 69 | 60 | 81 | 90 | 150 | 8 / 10 | sCase (prediction-commit, 10) | 1 | 5 | 1 |
| session-2 | 69 | 63 | 81 | 87 | 150 | 8 / 10 | sCase (prediction-commit, 10), sZ (commit-first-mcq, 5), sDel (builder-assembler, 8) | 2 | 7 | 4 |
| session-3 | 67 | 61 | 83 | 89 | 150 | 8 / 10 | sCase (prediction-commit, 10) | 1 | 6 | 1 |
| session-4 | 67 | 60 | 83 | 90 | 150 | 8 / 10 | sCase (prediction-commit, 10), sAud (builder-assembler, 7) | 2 | 5 | 1 |
| session-5 | 59 | 45 | 66 | 80 | 125 | 6 / 10 | sCase (prediction-commit, 10), sE6 (builder-assembler, 6) | 1 | 5 | 2 |

Every lesson: the cold-open ritual replaced in its slot by `sCase` (prediction-commit, Constructive, 10 min, linking to `../cases/case-N.html`), the named discussion in core at 15 min (sealed-vote-debate, Interactive), a "Case N" link beside the Case facts control, and an empty `READINGS:BEGIN sN+1` region in the closing section. Core component sequences carry no consecutive repeat; every file keeps at least 13 interactions with at least 6 in core (session-5: 7). Session-1 `s14b` is the own-account click-along with a four-step builder and work-along gate; session-2 `s9` (seven steps and the delegation line) and session-4 `sRSP` (the 30-day poll and the two clocks) are core; session-3 `sVend` and session-5 `s8` are gone as proposed.

| Validator | Exit | Reading |
|---|---:|---|
| build-appendix (write), --check | 0 | core 60 / 63 / 61 / 60 / 45; totals 150, 150, 150, 150, 125 |
| inject-case, build-cardsort, verify-case | 0 | spans current on all seven files |
| verify-migration | 1 | 1c and 4 on session-0.1 only; 9, 10, 16, 18, 20 PASS on every lesson |
| verify-facts | 0 | clean |
| verify-editorial | 1 | one hard failure, A9 R11 corpus: 5 shared blocks carrying 5 dashes against a baseline of 6 and 6, because the cold-open block left every lesson (D-048; flagged in EDITORIAL, baseline untouched); 5 advisories |
| test-editorial-regions | 1 | T7, the same ratchet (session-1 66 to 51, session-2 38 to 29, session-3 4/3 to 3/3) |
| test-case-viewer, verify-browser, test_live_console | 0 | all files (V1 on sessions 3 to 5 passes with the fixed case-button wrapper) |
| verify-sources, build-bibliography, case-inventory, build-unsourced | 0 | after the `used_for` relabel and regeneration |
| verify-style | 1 | environment |

Handoffs: Phase 7 builds each case page to match its `sCase` commit and key (session-2's four statements A to D; session-3's six comparison rows; session-5's five-step workflow and the "first break" answer); Phase 9 rewrites session-2 `s12`'s one-item checklist and the package text; Phase 10 rewrites the instructor run sheets for the new numbering, the predicted split for session-1 `s14c`, and the retired `sCold`; session-4's LMBOX-S4 console text cites old section numbers (editable only with the fence version bumped: deferred-work row).

## Phase 7: the case pages

One Sonnet builder wrote `cases/case-1.html` as the pattern (with the model `readme.txt` in the twelve-heading package spec), then four builders wrote cases 2 to 5 from it (2.28M tokens, 642 tool uses, 87 minutes). Every page: the case-file identity (oxblood header band, file-tab strip, document panels, print stylesheet), the same chrome, STYLE fence (byte-identical to the lessons), `#caseBtn` and `#caseModal` as the lessons, six sections (brief, your call first, the deliverable, how it was built, check, continue), commit-then-reveal with no gating, keyboard reachable, Google Fonts the only external origin, no storage, ES5. Every deliverable was captured through `scripts/recapture.mjs` and is labelled with the model id the CLI reported and the date; each page shows the first plain-request failure and the standing instruction that fixed it.

| Page | Minutes | Sections | Captures | FACTS ids cited | Screenshot |
|---|---:|---|---|---:|---|
| case-1 | 25 | brief 3; commit 7; deliverable 5; built 6; check 3; next 1 | 5 runs, all claude-sonnet-5-5 (case-5 also claude-sonnet-4-5-20250929 as the pre-change baseline), 2026-10-12 | 8 | scratchpad p7/shots/case-1.png |
| case-2 | 25 | brief 3; commit 7; deliverable 5; built 6; check 3; next 1 | 3 runs, all claude-sonnet-5-5 (case-5 also claude-sonnet-4-5-20250929 as the pre-change baseline), 2026-10-12 | 6 | scratchpad p7/shots/case-2.png |
| case-3 | 25 | brief 3; commit 7; deliverable 5; built 6; check 3; next 1 | 6 runs, all claude-sonnet-5-5 (case-5 also claude-sonnet-4-5-20250929 as the pre-change baseline), 2026-10-12 | 7 | scratchpad p7/shots/case-3.png |
| case-4 | 26 | brief 3; commit 8; deliverable 5; built 6; check 3; next 1 | 6 runs, all claude-sonnet-5-5 (case-5 also claude-sonnet-4-5-20250929 as the pre-change baseline), 2026-10-12 | 12 | scratchpad p7/shots/case-4.png |
| case-5 | 25 | brief 3; commit 7; deliverable 5; built 6; check 3; next 1 | 6 runs, all claude-sonnet-5-5 (case-5 also claude-sonnet-4-5-20250929 as the pre-change baseline), 2026-10-12 | 6 | scratchpad p7/shots/case-5.png |

The orchestrator then: taught the pipeline the case pages (`inject-case`, `verify-case`, `test-case-viewer`, `verify-browser` and `verify-migration` list them; `build-sources` knows the keys `case-1` to `case-5` and `pagePath()` maps every key to its page for `inject-sources`, `verify-sources` and `build-bibliography`), filled the generated CASE and SOURCES spans, exempted case pages from the lesson-only interaction floor (check 9) and labelled their missing time-budget table (check 16) with the reason printed (D-050), added the Illinois retirement-income subtraction record (D-052), inserted the "Case files" strip on the hub, documented the case pages in MAINTAINING.md, and had one Sonnet agent align two lessons with their case pages where they disagreed (D-051): session-3 `#sCase`'s six verdicts now read the Case 3 capture (rows 1, 3, 6 match; row 2 kept out of the tool by design; rows 4, 5 differ), and session-4 `#s2`'s de-identification exercise removes the two confidences as whole sentences under CASE.md Part J (beat 1: 9 keyed items, beat 2: 8; the clean Prompt D and `LM_DEFAULT_PROMPT` carry no confidence; the Appendix D1 zoom prompt likewise).

| Validator | Exit | Reading |
|---|---:|---|
| inject-case, verify-case, inject-case --check | 0 | 12 of 12 pages carry the v5.0 block; the 20 `.case-*` layout rules agree in all 12 |
| attest-verified --sync, inject-sources, build-bibliography, verify-sources | 0 | 151 records; footers current on 11 pages (six lessons, five cases) |
| test-case-viewer | 0 | V1 to V9 on all 12 pages |
| verify-browser | 0 | 13, 13b, 14, 14b, 15 on all 12 pages |
| verify-migration | 1 | 1c and 4 on session-0.1 only; 9 and 16 PASS with the case-page exemptions printed; 18 and 20 PASS |
| verify-facts | 0 | clean; the case pages cite 34 distinct FACTS ids between them |
| case-inventory --report-check, build-unsourced --check | 0 | reports current |
| verify-editorial, test-editorial-regions | 1 | the A9 R11 corpus ratchet only (D-048); case pages are outside A1 to A7 like session-0.1 |
| test_live_console | 0 | 86 passed (session-4's console reads the new clean Prompt D) |
| verify-style | 1 | environment |

Known gaps for the deferred-work register: no script checks that a lesson's `#sCase` and its case page agree (facts, key, verdict rows); case-4's `gemini-plans` chip has no SOURCES record (no record for the Gemini subscriptions page); the case-5 maintenance log's pre-change baseline ran on `claude-sonnet-4-5-20250929`, whose retirement is 2026-11-30, so the log is a dated record; every capture is dated 2026-10-12 against a case as-of date of 2026-12-31 (the pages say so).

