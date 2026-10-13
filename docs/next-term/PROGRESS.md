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
| 8 | done | 2026-10-13 | 2026-10-13 | (P8 commit) | verify-migration 0 (first clean run) · verify-case 0 · verify-browser 0 · test-case-viewer 0 · verify-sources 0 · verify-facts 0 · live-console 0 (75) · verify-editorial 1 (A8 artifact, A9 R11) · test-editorial 1 (T2, T7) · verify-style 1 (env) |
| 9 | done | 2026-10-13 | 2026-10-13 | (P9 commit) | verify-browser 0 · verify-facts 0 · build-appendix --check 0 · verify-sources 0 · verify-editorial unchanged · verify-migration 0 |
| 10 | done | 2026-10-13 | 2026-10-13 | (P10 commit) | verify-facts 0 · verify-migration 0 · verify-sources 0 · build-readings --check 0 · verify-browser 0 · test-case-viewer 0 · live-console 0 · verify-editorial 1 (known) · test-editorial 1 (known) · verify-style 1 (env) |
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

## Phase 8: Session 0.1 becomes "Start here: setup and click-along"

One Sonnet agent (553K tokens, 179 tool uses, 31 minutes; a first launch was stopped by the account's usage limit before its first edit, D-053) rebuilt `session-0.1/index.html` at the same URL as a self-paced setup page: 12 sections, 57 minutes (What you need, 5; new chat and the model picker, 5; projects, 5; custom instructions, 6; search and research, 5; connectors, 4; skills, 6; incognito, 4; memory, 4; the baseline timing worksheet for Homework 1, 6; the vocabulary card with Session 1's twelve glossary terms, 5; what to have ready, 2), each click-along section a prediction-commit with numbered steps done in the student's own account, 14 interactions, 74 chips, every plan, price, model name and setting from FACTS (claude-plans, claude-model-ids-and-retirements, claude-consumer-retention, claude-skills-format, claude-context-window, mcp-name, context-window-definition), no storage, no live console, the STYLE fence, CASE block, `#caseBtn`, `#caseModal` and Shift+U handler kept byte for byte, a "Case 1" link in the top bar and "Open Case 1 first" in the close. Removed, not moved: the 120-minute framing, the cold open, the five-layer frame, the four-models quiz, the effort sandbox, the context inspector, the retrieval ladder, the persistence sorter, the skills and connectors sorter, the live demo, output forensics, the debate, the baseline-and-close ritual, every 0.2 and 0.3 reference, the probe exercise and its captures, the v4 verification block, the six `[UNVERIFIED, needs source]` markers. The agent re-read the vendor help pages on 2026-10-13 and added six SOURCES.md records for them (skills, web search, research, incognito, projects, connectors).

Console decision (D-054): removed from this page; Sessions 1 and 4 keep it. MAINTAINING.md (origins table, the pre-push gate's origin grep and md5 loop now session-1 against session-4 for LMSTYLE and LM, the console section, the purge-list note: the "permanent" exclusion of session-0.1 ended with the rebuild), `scripts/test_live_console.js` (sections B and J removed, the loop now sessions 1 and 4: 75 passed, 0 failed), `docs/probe-captures.md` (the probe exercise retired with the Fall 2026 page; the captures are a record, no re-run owed: D-033 closed) and README.md ("those two pages") changed in the same commit. The hub card reads "Start here: setup", first, and the hub lede names the setup page.

Content Session 1's appendix could absorb, for Jared (nothing moved): output forensics (six symptoms, the strongest candidate), the five-layer frame and effort-and-thinking depth (Session 1 A6), the context inspector (needs v5 probe captures; `scripts/state_space.py` goes with it, now orphaned), the retrieval ladder, the tier quiz, the skills-and-connectors sorter (re-verify first), the persistence sorter's stored-versus-in-context distinction; the documentation card and the "which controls a firm turns off" debate belong to Session 4, after a legal read. Orphaned SOURCES.md records whose only use was the old page (src-beta, src-ctxwindow, src-features, src-plugins, src-routing, src-skills): Jared's call to delete.

| Validator | Exit | Reading |
|---|---:|---|
| verify-migration | 0 | every check passes for the first time in the run: 1c and 4 are clean on all 12 served pages and the instructor notes; 9 (14 interactions), 16 (57 = the hand-written budget), 18, 20 pass |
| verify-case, inject-case --check, test-case-viewer, verify-browser | 0 | 12 of 12 pages |
| verify-sources, build-bibliography, build-unsourced --check, case-inventory --report-check, verify-facts | 0 | 157 records; registers current |
| test_live_console | 0 | 75 passed (sessions 1 and 4) |
| verify-editorial | 1 | A8: session-0.1's majority dash form "changed from entity to literal" because the page now has zero authored em dashes and the checker breaks a 0-0 tie to literal (an artifact; the one-line baseline fix is listed in D-055 for Jared); A9 R11 corpus 4 blocks / 4 dashes against 6 / 6 (D-048) |
| test-editorial-regions | 1 | T2 pins the four captured transcripts (28 dashes) that no longer exist; T7 the ratchet; both reported, EDITORIAL's Class A2 and A16 text on the old page is stale (D-055) |
| verify-style | 1 | environment |

## Phase 9: the final-project package text

One Sonnet agent (302K tokens, 100 tool uses, 17 minutes) replaced every on-page description of the handoff package and the Part 2 presentation with one shared phrasing, pasted byte-identically: the Part 1 paragraph on session-2 `#s12`, session-3's closing card, session-4 `sCR` and session-5 Appendix E7 (one .zip: readme.txt with its twelve headings in order, workflow/, samples/ for two clients with their outputs, selfcheck.txt from the builder's own cold run; the build transcript goes with Part 2), and the Part 2 paragraph on session-5 `s0` (run a classmate's package, improve it, an 8-minute talk answering five questions, no live demo, slides optional, 2 minutes of builder response, 3 minutes of questions; improved/, outputs/, changes.txt, transcripts/). "Upload to the course site" is the only reference to where files go.

Also: session-2 `#s12`'s checklist grew from one item to six (the package parts) and gained the commit-then-reveal readme item (`t-s12c`, prediction-commit: the student writes their own TASK and HOW TO RUN lines, locks, then sees Case 1's model readme lines, which occur verbatim in `cases/case-1.html`); session-4 `sCR`'s sample package and "Pack yours" slots now name the readme headings and the folders; session-5 E1 is "Eight Minutes, Five Beats" (1:00, 2:00, 2:00, 2:00, 1:00; the clock stops at 9:00) and E4 reads 2 + 3; instructor-notes/session-5.md gained "Presentation logistics (2027)" (the 8 + 2 + 3 clock, four presenters take 52 minutes, the order, room logistics, a question bank, proposed timing enforcement marked "confirm"). The orchestrator then aligned session-2's baseline wording with PEDAGOGY §10.1 and §13.1: the baseline is self-timed on the setup page's worksheet before Session 1 (Homework 1), and `#s12`'s ritual confirms it rather than capturing it "in this room".

Purge greps: every per-term count identical before and after on all four pages (the surviving hits are CSS, "points to a client", vendor terms and sample emails); "Canvas" 0; "See attached" 0; no em dashes, storage APIs or grading words in any added line. Validators: verify-facts 0; build-appendix --check 0 (session-5's E1 title regenerated with `--file`); verify-browser 0 (161 PASS); verify-sources 0; verify-editorial unchanged (A9 R11 only); verify-migration unchanged (session-0.1 only, Phase 8); jsdom drives of the four pages 61 of 61 assertions. Handoff to Phase 10: instructor-notes/session-2.md describes `#s12` without the readme item and still says "Announce the Session 3 reading aloud".

## Phase 10: instructor notes, polls, verified-fact cards and reading cards

Five Sonnet editors (one per session; 1.94M tokens, 462 tool uses, 47 minutes) rewrote each session's run sheet for the new pages (objective, the case-opener moment, the core run order with minutes and components, where the four polls fire, the named discussion's predicted split with its complication fact on screen, the selectable appendix sections, the close), rewrote or created the polls files (exactly four polls each under `## Poll N` headings, formats rotated across the term, every expected answer sourced to a FACTS id, a CASE.md Part or the lesson's cited source, a decision rule keyed to the distribution and a Zoom format line), appended "Verified facts for this session" to each run sheet (every FACTS record whose `applies_to` names the session plus the correct version of each Phase 5 corrections-register row, with the week-before command), rewrote the setup page's run sheet (no polls), and brought the Session 3 and 4 teaching aids and rule key up to the new section numbers (the de-identification counts 9 and 8, the sCase verdicts). The orchestrator wrote `instructor-notes/zoom-poll-setup.md` (building advanced polls ahead of class, no student co-hosts during a poll, launch and share, the chat-waterfall fallback; verified at M against four university Zoom guides), re-rendered the four instructor-note PDFs from their .htm with headless Chromium, and fixed the Session 3 bridge label (5 to 7 minutes) an editor flagged.

Verified facts per run sheet: session-1 28; session-2 14; session-3 11; session-4 19; session-5 13. The Fall 2026 advisor-fee poll and breach-deadline poll were rebuilt from the audit record (their exact Fall wording was never saved) on current FACTS.

| Session | Poll | Question | Format | Section (opens or closes) | Decision rule |
|---|---:|---|---|---|---|
| 1 | 1 | Wolfram names one temperature setting that "seems best" for essays. Temperature 0 always takes the top-ranked ... | Numeric-range prediction | s2 (opens) | If 3 or more of 8 pick A, run T = 0 first and read 'Longest repeat' aloud before T = 0.8, and plant one line for s9 (rep... |
| 1 | 2 | Meg Cole was born 2 May 1968. At what age must she take her first required minimum distribution? (A 70 and a h... | Single choice with a surprising, checkable answer | s9 (closes) | If fewer than half pick D, spend 60 seconds on the version history and ask which version a model has seen most (the room... |
| 1 | 3 | Select every line you would put in a standing instruction that attaches to every future conversation on your a... | Multi-select | s14b (opens) | Click the top three counts into Step 3; if B is not among them, add it anyway and say why; always add the no-client-deta... |
| 1 | 4 | You used a frontier model to summarise the Cole discovery meeting and checked it line by line before it went i... | Single choice, the second | s14c (opens (and repeats as the re-vote)) | If no option holds half, run the protocol as written, minority first; if one option holds 6 or more of 8, assign the two... |
| 2 | 1 | Rank the four parts of a prompt by how much each changes whether the answer is correct, most to least (Persona... | ranking | s6b Building Prompts Against P.T.C.F (opens) | If more than half rank Persona first or second, read the Zheng result in one breath and run the room call with Persona l... |
| 2 | 2 | Which steps of the seven-step planning process stay with the planner? A model may draft words for them but can... | multi-select | s9 The Seven-Step Process and the Delegation Line (opens) | If fewer than half select step 4, read the page's reason for it (credential, registration, liability) before the sorter ... |
| 2 | 3 | Six citations came back when an AI assistant was asked what authority sets the age at which Meg and David must... | numeric-range prediction | s10 Citation Failure Types on the Cole RMD Age (opens) | If more than half pick 3 or more, run the triage and call on a '5 or 6' voter for the item they trusted first. If more t... |
| 2 | 4 | A household with $2,446,000 to invest takes 30 hours of planner time a year. Which pay arrangement pays the pl... | single choice, the advisor-fee poll reused from Fall 2026 | s12d Specification Cost Against Task Cost (opens) | If more than half pick B, thirty seconds on the arithmetic then the vote. If more than a third pick A or D, divide $24,4... |
| 3 | 1 | For "does the Dunmore 401(k) permit a Roth conversion", the retriever ranked the 2024 memo (42.6) above the 20... | short answer | s4 (closes s4) | Sort answers as A (names the word match), B (names that it cannot tell which document is current), C (anything else). If... |
| 3 | 2 | A tool answers only from your own documents and cites them. How often does an answer still contain something t... | single choice with a surprising, checkable answer | s6 (opens s6) | If more than half pick (a) or (b), read the 17 and the 33 off the chart before the key opens. If more than half pick (d)... |
| 3 | 3 | Does an AI note-taker join your client meetings today? Yes, a firm-approved tool / Yes, unofficially / No, not... | single choice, practice reality | s10 (opens s10) | If anyone picks 'unofficially', take appendix C9 sPol (5 min) after sOff and say the Reg S-P clocks (30 days to the cust... |
| 3 | 4 | Six review-update tasks. Which belong to no AI tool, in any file? Select all that apply. 1 Update the review l... | multi-select | sOff (opens sOff) | If fewer than half select 6, read the key's line for it aloud before the sorter opens and start on that row. If more tha... |
| 4 | 1 | Rank these four by legal force over a US adviser's use of AI today, most force first. (Regulation S-P as amend... | ranking | s1 (opens, before the page's own guess) | If fewer than half rank Regulation S-P first, read the lane 2 header aloud and give the sorter its full three minutes; o... |
| 4 | 2 | A case note has had her name and employer removed. Select every phrase that must still change or come out befo... | multi-select | s2 (opens the section's second panel (beat 2), after beat 1's clean Prompt D is copied) | If fewer than half select 8, say a confidence is not a replacement problem and click phrase 8 first; if anyone selects 9... |
| 4 | 3 | Regulation S-P gives a firm 30 days from becoming aware to tell clients. In this one leak, which moment starte... | single choice with a surprising, checkable answer: the Reg S-P breach-deadline poll reused from Fall 2026 | sRSP (opens; its distribution seeds sD (06 Discussion)) | Key the five counts into the boxes under the timeline. If more than half pick B, go to the day slider. If D or E draws t... |
| 4 | 4 | In a 2025 survey of 466 advisers, what share of RIAs said their firm has no written AI policy? (Under 25% / 25... | numeric-range prediction | s9 (opens; launch from sD before scrolling because the section's first line states the answer) | If more than half pick under 50%, say the gap is the task on this page and give the builder its full three minutes; if m... |
| 5 | 1 | A firm's five-step workflow names one model in step 2, and Anthropic retires that model. Which step breaks fir... | single choice with a surprising, checkable answer | sCase (opens) | Key the five counts into the page's Room tally. If more than half pick 3 or 4, ask one of them what they would see on th... |
| 5 | 2 | A skill was tested on one model. Select every line that lets it outlive that model. (options A pin to the test... | multi-select | s1 (opens (the second panel)) | If three or more tick A, C or D, run the room's pick first on the page (A with 1: RUNS then FAILS three times), then B w... |
| 5 | 3 | Four published trials timed people with and without AI (writing, consulting, support, coding). On average, how... | numeric-range prediction | s5 (opens (before the slider)) | Lock the room's modal band on the slider, then reveal. If more than half pick 20% or more, read METR's belief before its... |
| 5 | 4 | In a word or a short phrase: what is the most common reason investors give for firing their adviser? | short answer | s7 (opens (the second panel)) | Sort answers aloud into advice or service, relationship or trust, cost or returns. If more than half are cost or returns... |

Readings (orchestrator): `docs/next-term/readings.json` holds Appendix R's 17 rows, every row status "tentative" (R5), each keyed to a SOURCES.md record of kind `assigned_reading` with the record's confidence as the card chip; five records were added for items the register lacked (the 3Blue1Brown video M, the IRS guidance primer M, Prompting 101 L because nothing found confirms the link, the Claude Help Center RAG-for-projects article H fetched in full, the Karpathy segment M), eight existing records took the kind and a clause. `scripts/build-readings.mjs` fills six regions (the setup page carries "Reading for Session 1"; sessions 1 to 4 carry the next session's card; session 5 carries the wrap-up card) and `--check` reports staleness; MAINTAINING.md has the two-line workflow for Jared's review. Policy check: Wolfram plus at least one added reading per session (yes, all five), three videos across five sessions, each "watch before class" (one marked optional). verify-sources: exit 0 with five advisories on case-4 records whose chips are rendered from JS templates after the footer (the static scan cannot attribute them); verify-migration 18 PASS; verify-facts clean; verify-browser 0 failures on all 12 pages.

| Validator | Exit | Reading |
|---|---:|---|
| verify-facts | 0 | clean; `--session N` clean for every session |
| verify-migration | 0 | 1c clean on the instructor notes after the rewrite; 18 PASS with the reading-card chips |
| verify-sources, build-bibliography, build-readings --check | 0 | 162 records; six reading cards current |
| verify-case, inject-case --check, test-case-viewer, verify-browser | 0 | 12 pages |
| case-inventory --report-check, build-unsourced --check, build-facts-md --check | 0 | registers current |
| test_live_console | 0 | 75 passed |
| verify-editorial, test-editorial-regions | 1 | the known reds only (A8 session-0.1 tie, A9 R11 corpus, T2, T7; D-055) |
| verify-style | 1 | environment |

Left for Jared (listed in the final report): the 2027 session dates (`<session date>` placeholders in the run sheets' week-before lines), the predicted splits (reasoned, not measured), every reading row's tentative status, the Session 5 presenter count (assumed eight), the Session 4 teaching aid's suggested run order (a proposal).

