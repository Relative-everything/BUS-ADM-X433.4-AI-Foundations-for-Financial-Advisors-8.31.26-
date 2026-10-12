# PROGRESS.md: the next-term-2027 run

Resume rule (RUNBOOK A.1.6): read `RUNBOOK.md` (A.0 first), this file, `DECISIONS.md` and `git log next-term-2027`, then continue from the first phase not marked **done**. Never redo a done phase unless its validators now fail.

| Phase | Status | Started | Finished | Commit | Validators |
|---|---|---|---|---|---|
| init (A.1) | done | 2026-10-11 | 2026-10-11 | `f0bf929` | n/a |
| 0 | done | 2026-10-11 | 2026-10-11 | (P0 commit) | all exit 0 except `verify-style` (skill absent) and `verify-wolfram-quotes` (no article copy); P0 report §1 |
| 1 | done | 2026-10-11 | 2026-10-11 | (P1 commit) | verify-facts --report 0; verify-facts (gate) 0; P0 validators unchanged |
| 2 | done | 2026-10-11 | 2026-10-12 | (P2 commit) | none required; `build-case.mjs` (v5 rewrite, run with `CASE_PATH`) recomputes 67 identities against the draft, all agree |
| 3 | pending | | | | |
| 4a | pending | | | | |
| 4b | pending | | | | |
| 5 | pending | | | | |
| 6a | pending | | | | |
| 6b | pending | | | | |
| 7 | pending | | | | |
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
