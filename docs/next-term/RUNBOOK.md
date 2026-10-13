# Next-Term Runbook: BUS ADM X433.4 Repo Update (single autonomous run)

> **A.0 Kickoff amendments (added 2026-10-11 by the run, before Phase 0).** The runbook below is the attachment Jared sent, saved byte-for-byte after this block. This block records (1) what Jared's kickoff message changed, (2) what the 2026-10-11 deferred-work catch-up merge (PR #45, `da7b003`) changed under the runbook's assumptions, (3) the logic check against the repo's governing files (`MAINTAINING.md`, `EDITORIAL.md`, `PEDAGOGY.md` v2.0) and the reductions it produced, and (4) the environment facts the run was measured in. Where this block and the body disagree, this block wins, then section A, then the phase text. Every item here is also a dated entry in `DECISIONS.md`.
>
> **A.0.1 Kickoff overrides (Jared, 2026-10-11).**
> - A.1.5 and §2 "single-threaded" are suspended for this run: subagents and parallel workers are allowed where a phase needs them, used economically (one worker per session file, never one per edit). `PEDAGOGY.md` §12.6 and R15 record the spend-limit reason; this run's spend is Jared's call.
> - The run is one autonomous job; the only reply is the A.4 final report. Approval gates are replaced by R0 to R7 as written.
> - The run branch is `next-term-2027` from `main` at `da7b003`, as the kickoff instructs (the session's default branch name is not used).
>
> **A.0.2 What the catch-up merge changed under this runbook.** The runbook was written against the 2026-10-04 snapshot. `main` moved on 2026-10-11 (PR #45). None of the five session files was rebuilt (7 to 43 changed lines each), so A.3(1) is not triggered. Deltas the phases must respect:
> - `scripts/verify-case.mjs` now also asserts the lesson-local `.case-*` layout rules agree across the hub and six lessons (20 rules). Phase 7's case pages either carry the same 20 rules or are excluded from that check by name, documented in `MAINTAINING.md`.
> - `scripts/build-unsourced.mjs` now reads every `EDITORIAL.md` A16 marker form over the hub and lessons and hard-fails an undeclared form. The runbook's marker `[UNVERIFIED: needs source]` (colon) is **not a declared form**. See A.0.3 item 2.
> - `CASE.md` §A.5 now records the student's firm as the engaged planner (DW-041). CASE v5 carries that forward.
> - `scripts/verify-style.mjs` and `scripts/build-changelog.py` resolve the lesson-builder skill the same way; the skill is not installed here, so `verify-style` exits 1 by environment (DW-080, DW-112) and `build-changelog.py` writes an empty style fence that must be refilled from the committed page. Both are recorded as environment reds, not regressions.
> - `docs/deferred-work.md` was re-cut (170 rows: 86 open). `session-2` has no Shift+U by instruction (DW-116). Session 3's `2026-09-19-session-3-simplify` V6 line is history, not a regression.
> - Every pass since 2026-09-12 leaves a `docs/changes/<date>-<pass>/` folder with a `checks.mjs`; this run's folder is `docs/next-term/` and Phase 11 writes `docs/next-term/checks.mjs` pinning what the run produced.
>
> **A.0.3 Logic check: reductions against the repo's core rules.** The plan is consistent with `PEDAGOGY.md` v2.0 (case pages §5.6, Cole v5 §5.7, FACTS registry §1.11, setup page §13.1, core/appendix §3.13). Ten points were reduced or made explicit:
> 1. **Minutes.** D27's "the appendix may run several hours" collides with the ratified 150-allocated-minutes identity (`references/pedagogy.md` s4, `EDITORIAL.md` D18, `verify-migration` check 16, `build-appendix`) and with `PEDAGOGY.md` §15.2, which lists the core/appendix validator semantics as unresolved and says ask before acting. R0 applies: **core and appendix keep summing to the allocated total (150; Session 5 125)**. Core moves toward 60 (Session 5 toward 45) by demotion; every core addition is paid for by a demotion or a reduction; appendix additions fit inside the remainder. No validator semantics change.
> 2. **Marker forms.** Lessons and case pages use the declared A16 forms with a CLAIM annotation (`[UNCONFIRMED]` by default, `[NEEDS SOURCE]` only when the claim was checked); `CASE.md` uses `[UNVERIFIED — needs source]`; the runbook's `[UNVERIFIED: needs source]`, `[RECAPTURE NEEDED: id]` and `[NEEDS INSTRUCTOR REDESIGN: reason]` appear only in `docs/next-term/` files, `instructor-notes/` and HTML comments, never in served prose. The final report lists them all the same.
> 3. **Cold open and the ratified-parameter list.** `PEDAGOGY.md` §13.1 (2026-10-11) supersedes the cold-open ritual with the case opener; `EDITORIAL.md` D18 still lists the cold open as a parameter that cannot be moved. The newer instructor file governs the learning-design layer (`PEDAGOGY.md` §0). Phase 6 may retire or re-purpose `sCold` sections; `build-appendix.mjs` will print its cold-open conflict line on every run, which is reported, not silenced; Phase 6b appends a dated flag to `EDITORIAL.md`'s follow-ups rather than editing D18.
> 4. **Session 0.1's freeze.** `MAINTAINING.md` calls `session-0.1` frozen (DW-057) and its console fences byte-paired with `session-1`. `PEDAGOGY.md` §13.1 makes it a self-paced setup page. The newer decision governs the content; the mechanical pairing rule is kept or retired explicitly in Phase 8 with `MAINTAINING.md` updated in the same commit.
> 5. **Captured model outputs.** The `claude` CLI is available here and its result JSON names the model that answered. A RECAPTURE is run through it and labelled with the model id the CLI reported and the date; the run never asserts its own model identity in a served file. Where the CLI cannot be used, the placeholder of R6 goes in an HTML comment plus a visible "capture pending" label, and the id is listed in the final report.
> 6. **Validator populations for `cases/`.** Case pages join the mechanical checks by name (`inject-case` LESSONS if injected, `verify-case`, `verify-browser`, `verify-facts`, `verify-migration` retired-string scan, purge greps, `verify-style`'s fence rule). They are excluded from `EDITORIAL.md` A1 to A7 (appendix-index rules: a case page has no appendix) and from `build-appendix.mjs`, with the exclusion written into `MAINTAINING.md`. No validator baseline moves.
> 7. **Readings' `kind`.** `SOURCES.md` already enumerates `assigned_reading`; Phase 10 uses it and adds no new `kind`.
> 8. **Em-dash ratchets.** Rewriting v4 prose to v5 (Phases 4b, 6b) removes em dashes from existing copy, so `A9` falls and `test-editorial-regions` T7 (which pins the recorded total) goes red. `MAINTAINING.md` says a fall is a halt-and-report, and R0 says leave it failing and documented. The run reports the per-file before/after and does not touch `scripts/editorial-baseline.json`.
> 9. **The deferred-work register.** `docs/deferred-work.md` is the single register of open work; the runbook never mentions it. Phase 11 adds a row for every `[UNVERIFIED]`, RECAPTURE, NEEDS INSTRUCTOR REDESIGN and tentative-reading item the run leaves open, and moves to Closed any row the run demonstrably closes, with the commit named.
> 10. **No ZIP in the tree.** Phase 8's sample skill ZIP is described in numbered text, not served as a binary.
>
> **A.0.4 Environment, measured 2026-10-11.** Node 22.22, Python 3.13, Playwright Chromium present; jsdom installed globally for this run (`NODE_PATH=$(npm root -g)`); the interactive-lesson-builder skill is **not installed** (A.1.7 applies: repo checks plus the fallback greps, skill gate recorded as skipped). Outbound HTTPS is proxied and `sec.gov`, `irs.gov`, `finra.org`, `ssa.gov`, `cms.gov`, `congress.gov`, `tax.illinois.gov`, `ilga.gov`, `federalregister.gov`, `ecfr.gov`, `writings.stephenwolfram.com`, `arena.ai`, `artificialanalysis.ai`, `livebench.ai` are refused at the proxy (DNS/403); `platform.claude.com`, `claude.com`, `support.claude.com`, `anthropic.com` and most commercial hosts are reachable. Web search works. R7 therefore applies to every blocked primary source: a primary-domain search snippet is recorded at M with the access method noted; nothing is filled from memory.

---

**What this is:** the complete instruction set for one Claude Code session that updates the course repo for the early-2027 cohort, start to finish, without returning to Jared until the end. It was produced from the Fall 2026 debrief (transcripts of Sessions 1, 2, 4 and 5; the Canvas export; the 2026-10-04 repo snapshot; research dated 2026-10-11).
**Kickoff:** Jared starts the run with a short kickoff prompt and attaches this file (and PEDAGOGY.md). Everything else is here.

---

## A. Autonomous execution protocol (this section overrides any phase text below)

### A.1 Run shape

1. Save this runbook to `docs/next-term/RUNBOOK.md`. If `PEDAGOGY.md` was attached or is in the repo root, commit it to the repo root unchanged. If neither exists, note "PEDAGOGY.md absent" in PROGRESS.md and treat MAINTAINING.md and EDITORIAL.md as the governing rules.
2. Create the branch `next-term-2027` from current `main`. Every phase commits to this branch. Push the branch after each phase. **Never commit or push to `main`, never merge, never force-push, never open a PR.** Jared reviews and merges when the run is done.
3. Create `docs/next-term/PROGRESS.md` (phase checklist with status, timestamps, validator exit codes, one-paragraph summary per phase) and `docs/next-term/DECISIONS.md` (every judgment call: id, phase, options considered, choice, reason, reversibility). Update both and commit at the end of every phase.
4. Run Phases 0 through 11 in order. Inside a phase, the "Task", "Constraints", "Must pass before commit" and "Out of scope" lines are binding. Every "Record in PROGRESS.md" line means: write it, commit, and continue to the next phase. Do not stop to ask.
5. Single-threaded. Do not spawn subagents or parallel workers (an earlier multi-agent run exhausted the monthly spend limit).
6. **Resume rule:** if the session restarts or the context is compacted, read `docs/next-term/RUNBOOK.md`, `PROGRESS.md`, `DECISIONS.md` and `git log` on `next-term-2027`, then continue from the first phase not marked done. Never redo a phase marked done unless its validators now fail.
7. If the interactive-lesson-builder skill is installed, use its validators and component bank as MAINTAINING.md describes. If it is not, run the repo's own checks and the fallback greps in MAINTAINING.md, and record that the skill gate was skipped.

### A.2 Autonomous decision rules (these replace every approval gate)

- **R0 (general):** when two options are acceptable, choose the more reversible one (demote to appendix rather than delete; add a placeholder rather than invent content; leave a validator failing and documented rather than re-baseline it). Log the choice in DECISIONS.md.
- **R1 (Phase 2 case draft):** accept the CASE v5 draft yourself once it (a) follows the household brief, (b) has every tax and benefit parameter either primary-sourced and chipped or marked `[UNVERIFIED: needs source]`, (c) lists the Part K retired strings, and (d) its Part M identities recompute. Run a fresh-eyes self-review pass on the draft against those four checks before accepting; fix what it finds. Then proceed to Phase 3.
- **R2 (Phase 4a register):** accept every disposition. For each REPLACE-EXERCISE row, choose the replacement that keeps the same component family, section position and minutes; if none fits, demote the section to the appendix with a `[NEEDS INSTRUCTOR REDESIGN: reason]` note instead of inventing a new exercise type.
- **R3 (Phase 6a proposals):** mark a row ACCEPT only if it satisfies every hard rule in Phase 6a (session > section format kept, core about 60 minutes, S5 core about 45, one core structured discussion, at least one commit-before-reveal activity, a case link, at most 3 new core sections) and is tied to a named evidence row. Prefer demotion over deletion. Never delete a section that holds a stated learning objective. Mark everything else REJECT with the reason.
- **R4 (purge-rule conflict before Phase 9):** keep the standing purge rule (no grading, submission or due-date words, no LMS name on lesson pages). Use the Phase 9 wording as written.
- **R5 (readings, Phase 10):** the reading list is tentative and not yet approved by Jared. Load it from Appendix R into `docs/next-term/readings.json` with status "tentative", inject it with the generator, and list it in the final report as pending instructor approval.
- **R6 (captures):** when a captured model output must be re-run (RECAPTURE) and you can run it, capture verbatim with model name and date. If you cannot, insert `[RECAPTURE NEEDED: prompt id]` and continue.
- **R7 (sources):** if a source cannot be fetched, downgrade the claim to L or write `[UNVERIFIED: needs source]`. Never fill a number from memory.

### A.3 When to stop early (the only reasons)

Stop, commit, push, and write the final report early only if: (1) the repo state contradicts this runbook so badly that continuing would overwrite work you cannot identify (for example, the session files were rebuilt after 2026-10-04); (2) a step would require pushing to `main`, deleting history, or force-pushing; (3) you cannot write to the branch at all. Everything else is logged in DECISIONS.md and the run continues.

### A.4 Final report (the only message returned to Jared)

When Phase 11 is done (or after an early stop), reply with:

1. Run status: phases completed, branch name, last commit SHA, early-stop reason if any.
2. The Phase 11 validator pass/fail table, quoted verbatim.
3. Per-session timing table (core and appendix minutes, before vs. after).
4. Files added (case pages, setup page, FACTS registry, scripts) and the files most changed.
5. DECISIONS.md summary: every R1, R2 and R3 choice that changed or removed teaching content, every REJECT, and every `[UNVERIFIED]`, `[RECAPTURE NEEDED]` and `[NEEDS INSTRUCTOR REDESIGN]` marker with its file and section.
6. Items waiting on Jared: approve the reading list (edit readings.json, re-run the script), the CASE v5 `[UNVERIFIED]` items, and anything else that needs a human decision.
7. The commands Jared runs to review and merge (diff against main, tag `next-term-2027-ready`).

---

### Decisions this plan implements (from the debrief interview)

| ID | Decision |
|---|---|
| D01 | Lesson files stay standalone `session > section` scroll pages, one topic per section, slide-like. **No session is rebuilt from scratch.** |
| D06 | Case studies are a separate component: one interactive page per session at `cases/case-N.html`, visually distinct from lessons, linked from the hub and from the top of each session, with a "Continue to the lesson" button into section 1. |
| D03, D26 | The case spine keeps the **Cole** name but becomes a mainstream **pre-retiree couple, about $2.5M investable**. Every existing Cole reference is flagged and updated so that **no old case fact remains** anywhere served. |
| D23 | Case mapping: S1 onboarding intake summary + risk-profile explainer; S2 Roth conversion client email with IRS-cited facts verified; S3 annual-review notes to CRM tasks + follow-up email; S4 de-identify a file + vendor check + breach tabletop; S5 retirement-income one-pager + workflow maintenance log. |
| D27 | Claude Code proposes section drops **and** additions per session from the findings. Core stays about 60 minutes; the appendix may run several hours. |
| D25 | One central FACTS registry plus a validator for volatile facts (models, prices, plans, leaderboards, regulation dates), re-verified the week before each session. |
| D11 | Session 1 becomes hands-on in each student's own paid Claude account; model tiers and leaderboards become one section; other vendors become one comparison section, not a whole class. |
| D15 | Session 0.1 becomes a short self-paced pre-course setup page. |
| D21 | 4 Zoom polls per session in instructor notes, formats varied (not all four formats every time), with Zoom setup steps. |
| D04, D29 | Final project Part 1 handoff = one `.zip` with a `readme.txt` and student-run self-checks. The build transcript moves to the Part 2 Canvas upload. (Canvas text itself is in the analysis doc; the repo only describes the package.) |
| D17 | Keep the session order; modernize content for AI developments since early 2026. |

### Flagged conflict you need to know about before Phase 9

The repo has a standing purge rule (MAINTAINING.md, "Standing purge list", Tier A and Tier B, plus the LMS-name rule): lesson pages may not contain grading, submission, due-date language, or the LMS name. Your debrief goal ("clarify what is uploaded vs presented") pulls toward putting the spec on the lesson pages. **Recommendation: keep the purge rule.** Canvas and the syllabus carry the submission spec (drafted in the analysis doc). Lesson pages describe what a good handoff package contains, using the phrase "the course site" and no grading words. Phase 9 is written that way. In the autonomous run, rule R4 applies: keep the purge rule.

---

## 1. Phase overview

| Phase | Name | Type | Original model note | Depends on |
|---|---|---|---|---|
| 0 | Freeze Fall 2026, read and report repo state | REPORT-ONLY | Opus 5.5 | none |
| 1 | FACTS registry and `verify-facts.mjs` validator | Build | Opus 5.5 | 0 |
| 2 | CASE.md v5.0 draft (pre-retiree Cole household) | Draft, self-approved (R1) | Fable 5.1 | 0 |
| 3 | Adopt CASE v5.0 through the case pipeline | Build | Fable 5.1 | 2 (R1) |
| 4a | Old-case reference register | Register, self-approved (R2) | Opus 5.5 | 3 |
| 4b | Migrate references, one session at a time | Build | Fable 5.1 | 4a |
| 5 | Facts and accuracy correction sweep | Build | Opus 5.5 | 1, 4b |
| 6a | Section drop/add proposals, all sessions | Proposal, self-approved (R3) | Fable 5.1 | 5 |
| 6b | Apply approved section changes, one session at a time | Build | Fable 5.1 | 6a (R3) |
| 7 | Build case pages `cases/case-1..5.html`, one per turn | Build | Fable 5.1 | 3, 6b |
| 8 | Session 0.1 to pre-course setup page | Build | Fable 5.1 | 1, 3 |
| 9 | Final-project package text on lesson pages | Build | Opus 5.5 | 6b, 7 |
| 10 | Instructor notes: polls, fact cards, reading cards | Build | Opus 5.5 | 1, 6b |
| 11 | Full verification, changelog, README, tag | Verify | Opus 5.5 | all |

The model column records which phases are judgment-heavy (Fable) vs. mechanical (Opus); in a single run, apply extra care and self-review on the Fable phases.

Estimated effort: one long autonomous run, roughly the work of 28 separate turns; expect several hours of wall time.

---

## 2. Standing rules (embedded in every prompt below)

Every prompt repeats these so each block runs standalone:

- Single-threaded. No subagents, no parallel fan-out.
- Read before claiming: never assert file contents without a named read in this chat.
- Governance outranks this prompt: MAINTAINING.md, EDITORIAL.md, PEDAGOGY.md (committed in Phase 0), CASE.md rules and the purge list are standing constraints. If this prompt conflicts with them, stop and report the conflict; do not resolve it silently.
- Validator baselines move only on explicit instruction. An unrequested baseline change in either direction is a halt-and-report condition.
- Every factual claim on a page carries an H/M/L chip and a source in the page footer; unverifiable figures are written `[UNVERIFIED: needs source]`, never a plausible number.
- No real client data or PII anywhere. Cole is synthetic and labeled synthetic.
- No browser storage, no new external origins, pages work offline.
- Commit small with messages naming session and substance; do not push to `main`; Jared merges.

---

## 3. Phase prompts

### Phase 0: Freeze Fall 2026, read and report repo state


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: README.md, MAINTAINING.md (Layout, Pre-push gate, CASE.md v4.0 migration checks, The case spine, Standing purge list, Adding a session, Known follow-ups), CASE.md (header + Part headings), scripts/inject-case.mjs, scripts/build-case.mjs, scripts/verify-case.mjs, scripts/verify-migration.mjs, scripts/case-inventory.mjs, docs/deferred-work.md (status column only), index.html, session-0.1..5/index.html (section list only), instructor-notes/ (file list)

Task: Produce a written baseline report of the repo as it stands, and tag the Fall 2026 state. Make NO content edits.

Steps:
1. Create annotated tag `fall-2026-final` on current main (do not push the tag; print the command for Jared).
2. Run every validator and test listed in MAINTAINING.md "CASE.md v4.0 migration checks" plus verify-sources.mjs, verify-editorial.mjs, verify-wolfram-quotes.py and the fallback grep checks. Record exit code and the last 5 lines of output for each.
3. For each of index.html, session-0.1 .. session-5: list sections in order (id, data-nav title, core vs appendix, data-tier, stated minutes), count data-comp interactions, list every structured discussion (vote/revote) with its section id and whether it is core or appendix, and sum core minutes and appendix minutes.
4. Case dependency map: every file and script that consumes CASE.md or its generated artifacts (case-facts.json, case-corpus.json, case-extract.html, case-flowchart.html, CARDSORT deck, case viewer, Part O retrieval corpus, Part M identities, check 20 spine drift guard). For each: what it reads, what breaks if the case facts change.
5. Volatile-fact census: grep hub, lessons, instructor-notes for model names (Haiku, Sonnet, Opus, Fable, Mythos, GPT-, Gemini, Grok, Kimi, DeepSeek, Llama, Qwen), version numbers next to them, dollar prices per token or per month, plan names (Free, Pro, Max, Team, Enterprise), leaderboard names (LiveBench, LMArena, Arena, Artificial Analysis, AI Arena), "watermark", "SynthID", "MCP", "Reg S-P", "exam priorities", "24-09". Output a table: file, section id, line, matched string, 80 chars of context.
6. Report every deferred-work row (id + one-line title) whose target file is any lesson, CASE.md, or the case scripts. Do not edit the register.
7. Note whether Session 5 shows any edits after 2026-10-04 (git log since that date, all files).

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST change no tracked file except a new report file at docs/next-term/P0-baseline-report.md, the run files from section A.1 (RUNBOOK.md, PROGRESS.md, DECISIONS.md), and committing PEDAGOGY.md exactly as Jared placed it in the repo root (if it is absent, say so in the report; later phases treat it as required).
2. MUST run single-threaded; no subagents.
3. MUST quote validator output verbatim; never summarize a failure as a pass.
4. SHOULD flag any finding that contradicts the plan header assumptions (e.g., a session file that has been rebuilt since 2026-10-04).

Must pass before commit: none (report only); commit only the report file.
Out of scope: any lesson, CASE.md, script, or governance edit; deferred-work status changes.
Record in PROGRESS.md (then continue): the path of the report, the validator exit-code table, per-session core/appendix minute sums, the case dependency map, the count of volatile-fact hits per file, and any contradictions with the plan.
```


---

### Phase 1: FACTS registry and validator


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: docs/next-term/P0-baseline-report.md (volatile-fact census), MAINTAINING.md (Sources/bibliography/live-data register, The two dating fields, editorial checks, Pre-push gate), SOURCES.md header + one record, scripts/verify-sources.mjs, scripts/verify-migration.mjs (structure only)

Task: Create a single source of truth for volatile facts and a validator that fails when served pages state a volatile fact that disagrees with it or use a retired value.

Build:
1. facts/FACTS.json: array of records {id, statement, value, unit, applies_to (sessions/pages), source_url, source_title, retrieved (YYYY-MM-DD), confidence (H|M|L), volatility (high|medium|low), reverify_before ("each-session"|"term-start"), retired_values (array of strings that must not appear on served pages), notes}.
2. facts/FACTS.md: generated human-readable table from FACTS.json (generator script facts/build-facts-md.mjs). Never hand-edit FACTS.md.
3. scripts/verify-facts.mjs: scans index.html, session-*/index.html, cases/*.html (if present), instructor-notes/*.md. Fails (non-zero) on: (a) any retired_values hit outside CHANGELOG.md, changelog/, audit/, docs/; (b) any record past its reverify window relative to a --as-of date argument (default today) when volatility=high; (c) a page chip that cites a FACTS id that does not exist. Prints file:line:context for every hit. Supports --report (exit 0, list only).
4. Seed FACTS.json with the records in the "FACTS seed" block below. Treat each as a claim to verify: fetch each source_url; if the page confirms it, keep confidence as given and set retrieved to today; if not, set confidence L, add a note, and list it in the report. Do not invent values.
5. Add verify-facts.mjs to MAINTAINING.md "Pre-push gate" (repo checks) with a one-paragraph entry: what it checks, the week-before-session re-verify ritual (run `node scripts/verify-facts.mjs --as-of <session date>` and update retrieved dates after re-checking sources).

FACTS seed (from research dated 2026-10-11; verify each):
- claude-api-price-fable-5-1: Fable 5.1 $10 input / $50 output per million tokens. https://platform.claude.com/docs/en/about-claude/pricing (H)
- claude-api-price-opus-5-5: Opus 5.5 $4 / $20. same URL (H)
- claude-api-price-sonnet-5-5: Sonnet 5.5 $2 / $10. same URL (H)
- claude-api-price-haiku-5-5: Haiku 5.5 $0.10 / $0.50 up to 100K tokens; $0.50 / $2.50 above. same URL (H)
- claude-output-input-ratio: output costs 5x input on every listed Claude model. retired_values: ["about double", "twice the input", "2x input"]. same URL (H)
- claude-context-window: 1M tokens for the four current models; 128K max output. https://platform.claude.com/docs/en/models/overview (H)
- claude-plans: Free $0; Pro $20/mo or $17/mo annual (Opus, Sonnet, Haiku; Fable via usage credits); Max 5x $100; Max 20x $200; Team Standard $25 ($20 annual); Team Premium $125 ($100 annual); Enterprise $20/seat + usage. retired_values: ["$500 Max", "Max plan is $500"]. https://claude.com/pricing and https://support.claude.com/en/articles/11049744-how-much-does-the-max-plan-cost (H)
- claude-skills-format: custom skills upload as a ZIP; available on all plans; requires code execution setting. https://support.claude.com/en/articles/12512180-use-skills-in-claude (H)
- claude-consumer-retention: with "help improve Claude" (model training) on, de-identified data may be retained up to 5 years in training pipelines; with it off, chats are deleted from backend within 30 days of deletion; default state of the toggle not documented by Anthropic. https://privacy.claude.com (Is my data used for model training?) (H for the two periods; GAP for default)
- claude-text-watermark: Claude watermarks text output (announced 2026-08-14); the watermark does not identify individual users; files carry C2PA metadata. retired_values: ["traces to your account", "traced to your account", "identifies your account"]. https://www.anthropic.com/news/claude-text-watermark and https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content (H)
- openai-consumer-training-default: ChatGPT consumer plans use content for training by default with an opt-out; Business/Enterprise/Edu/API do not by default. retired_values: ["ChatGPT defaults to no training"]. https://chatgpt.com/pricing/ (H)
- google-synthid: Google SynthID watermarks images, video, audio and Gemini text. https://deepmind.google/models/synthid/ (H)
- mcp-name: MCP = Model Context Protocol; donated to the Linux Foundation Agentic AI Foundation 2025-12-09. retired_values: ["master control protocol"]. https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation (H)
- arena-rename: LMArena now Arena at arena.ai. https://arena.ai/leaderboard/chat/text (H; snapshot values are volatility high)
- leaderboard-snapshot-arena-2026-10-08: Gemini 4 Argon 1525 (preliminary), Claude Opus 5.5 1507. (H, volatility high)
- leaderboard-snapshot-aa: Artificial Analysis Intelligence Index (record the effort tier shown): Opus 5.5 (max) 58, Sonnet 5.5 56, GPT-6 Astra 53, Gemini 4 Argon 53. https://artificialanalysis.ai/leaderboards/models (H, volatility high)
- livebench-last-release: LiveBench latest release 2026-06-25. https://livebench.ai (M; JS-rendered)
- openai-models: GPT-6 family (Astra, Sol, Luna) and GPT-6.1 Sol. https://chatgpt.com/pricing/ (H for names; prices M)
- gemini-plans: Google AI Plus $4.99, AI Pro $19.99, AI Ultra $99.99/$199.99. https://gemini.google/subscriptions/ (H)
- reg-sp-compliance: Reg S-P 2024 amendments (Release 34-100155 / IA-6604): compliance Dec 3, 2025 (larger entities) and June 3, 2026 (smaller); written incident response program; customer notice within 30 days; service-provider notice to firm within 72 hours; no SEC notice and no CCO clock in the rule. retired_values: ["report to the CCO within 24 hours", "CCO within 24 hours"]. https://www.sec.gov/files/rules/final/2024/34-100155.pdf (H)
- sec-exam-priorities-status: FY2026 Examination Priorities released 2025-11-17; states it has "no legal force or effect"; FY2027 not released as of 2026-10-11. retired_values: ["exam priorities bind you"]. https://www.sec.gov/files/2026-exam-priorities.pdf (H; reverify term-start)
- finra-24-09-status: FINRA Regulatory Notice 24-09 (2024-06-27) remains active; FINRA 2026 Annual Regulatory Oversight Report has a GenAI section (2025-12-09). retired_values: ["rescinded"]. https://www.finra.org/rules-guidance/notices/24-09 and https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report/gen-ai (H)
- sec-pda-withdrawal: SEC withdrew the predictive data analytics conflicts proposal 2025-06-12 (Release IA-6885). (H)
- ai-policy-requirement: no rule names an "AI use policy"; Rule 206(4)-7 policies, Reg S-P and Rule 204-2 apply; examiners review AI policies and procedures. retired_values: ["AI use policy is required", "legally required to have an AI policy"]. (M)
- cfp-genai-guide: CFP Board Generative AI Ethics Guide, 2025-02-25, a resource, not a binding standard. https://www.cfp.net/ethics/compliance-resources/2025/02/generative-ai-ethics-guide (H)
- colorado-sb26-189: Colorado SB 26-189 signed 2026-05-14, effective 2027-01-01. (M)
- utah-ai-disclosure: Utah AI disclosure for high-risk interactions in regulated occupations incl. financial advice; sunsets 2027-07-01. (H)
- adoption-t3-2026: 2026 T3/Inside Information survey: 52.2% of advisors use AI search/generative tools (from 41.8%); 42.9% use AI notetakers. via https://www.kitces.com/blog/weekend-reading-for-financial-planners-march-14-15-2026/ (M)
- adoption-iss-policy: 48% of advisors use AI; 78% of RIAs have no written AI policy (ISS Market Intelligence). https://www.planadviser.com/exclusives/advisers-using-ai-by-the-numbers/ (M)
- context-window-definition: the context window is the total tokens the model can attend to (input + conversation + output), not the input box. retired_values: ["the box you type in is the context window", "input box is called the context window"]. https://platform.claude.com/docs/en/build-with-claude/context-windows (H)
- tcja-enactment: TCJA enacted December 22, 2017. retired_values: ["TCJA in 2016"]. (H; verify at congress.gov)

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST NOT edit any lesson, case or instructor-notes content in this phase; verify-facts runs in --report mode against them and its hit list goes in the report.
2. MUST fetch every seed source before marking H; for seed records without a URL (sec-pda-withdrawal, ai-policy-requirement, colorado-sb26-189, utah-ai-disclosure, tcja-enactment), locate and record a primary source (sec.gov, federalregister.gov, leg.colorado.gov, le.utah.gov, congress.gov) or downgrade; note every downgrade.
3. MUST keep FACTS.json the only hand-edited facts file; FACTS.md is generated.
4. SHOULD keep verify-facts.mjs dependency-free (Node built-ins only).
5. PREFERRED: add a --session N filter.

Must pass before commit: node scripts/verify-facts.mjs --report (exit 0); all P0 validators still at their P0 exit codes.
Out of scope: correcting the hits (Phase 5); FACTS for case figures (CASE.md owns those).
Record in PROGRESS.md (then continue): count of records seeded, list of records downgraded with reason, full --report hit list grouped by file, and the MAINTAINING.md diff.
```


---

### Phase 2: CASE.md v5.0 draft


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: CASE.md (all of it), MAINTAINING.md (The case spine, The retrieval corpus lives in CASE.md, The case-fact drift surface), docs/next-term/P0-baseline-report.md (case dependency map), PEDAGOGY.md (§5.5 and any case rules), scripts/build-case.mjs (which figures and Part M identities it expects)

Task: Draft CASE.md v5.0 as a NEW file docs/next-term/CASE-v5-draft.md. The Cole household keeps its name but becomes a mainstream pre-retiree couple. Do not touch CASE.md itself.

Why: Fall 2026 evidence showed the v4 case (a ~$30M IDGT business sale) sat far above the room (several students had sent fewer than 20 prompts ever; estate jargon met silence in S1 at 1:21 and 1:24; one learner wrote the case was "far beyond anything she had met"). Every student final project this term was a mainstream planning task: risk-profile questionnaire, new-client packet, CFP study prompt, Roth conversion analysis, retirement plan, annual-review notes to CRM. The new case must serve the five case pages:
  S1 onboarding intake summary + risk-profile explainer
  S2 Roth conversion client email with IRS-cited facts verified
  S3 annual-review meeting notes -> CRM tasks + follow-up email (also the S3 retrieval corpus)
  S4 de-identify a client file + AI vendor check + breach tabletop (Reg S-P)
  S5 retirement-income one-pager + workflow maintenance log

Household brief (instructor-approved direction; refine, verify, and fill gaps; every tax/benefit parameter must be verified against a primary source and chipped, or written [UNVERIFIED: needs source]):
- Meg Cole, 58 (born 1968), nurse manager at a regional hospital system, W-2 about $145K; 403(b) about $420K; Roth IRA about $65K.
- David Cole, 59 (born 1967), senior mechanical engineer at a mid-size manufacturer, W-2 about $185K; 401(k) about $1.15M (check whether the plan offers in-plan Roth conversion; make it a documented plan feature either way); Roth IRA about $70K; rollover traditional IRA about $210K from a prior employer whose beneficiary designation is out of date (names his late mother: an annual-review landmine).
- Joint taxable brokerage about $360K with embedded gains (include about $60K of employer stock from an old ESPP).
- HSA about $48K; cash reserve about $85K; 529 for son about $38K.
- Home in Naperville, Illinois, value about $640K; mortgage about $165K at 3.1%, about 11 years left.
- Children: Emma, 21, senior at a public university; Ryan, 16.
- Meg's mother Ruth, 83, widowed, independent living, may need assisted living; Meg holds her financial POA; Ruth has about $300K of savings and names Meg beneficiary of a traditional IRA (inherited-IRA rules become relevant on her death).
- Total investable about $2.45M. Filing MFJ. Illinois residents.
- Goals: Meg retires at 60, David at 62; travel; help both kids launch; be ready to support Ruth; keep the house.
- Divergent risk tolerance: David moderately aggressive, Meg conservative (drives the S1 risk-profile explainer).
- Roth conversion window between retirement and RMD start (verify RMD age for 1967/1968 births under SECURE 2.0), Social Security claiming, IRMAA two-year lookback, Illinois treatment of retirement distributions and conversions (verify).
- Estate documents: wills and POAs from 2011, no trust, guardian clause now partly moot; beneficiary designations need review.
- Insurance: David group term 2x salary; Meg $500K 20-year term expiring 2030; no long-term-care coverage (ties to Ruth).
- Social Security estimates: synthetic PIA figures, labeled synthetic.

Required structure (keep the v4 Part letters where a part still applies so scripts can be adapted; mark parts removed):
- Header: synthetic disclaimer, v5.0, as_of_date, case_id cole-household, sentinels <!-- CASE:BEGIN cole-household v5.0 --> / <!-- CASE:END cole-household -->, retired_versions now include "4.0".
- Parts: family profile; employment and income; balance sheet with account detail; cash flow; tax profile (2026 parameters verified); retirement and Social Security; insurance; estate documents and beneficiary designations; Ruth (aging parent) facts; documents on file (with dates) for the S3 retrieval corpus; confidentiality landmines (Part J equivalent: every NPI field, for S4 de-identification); retired facts (Part K): every v4 fact, name and string that must never appear again (Barrington Hills, Rockford, the operating company and its name, the LLC, the irrevocable trust, IDGT, installment sale, seed gift, demand note, grantor burn, unit valuation, voting/non-voting split, inherited IRA of $1,000,000, any v4 dollar figure that will not recur, any v4 authority used only by the IDGT structure); authorities (Part I) limited to those the new facts need; a new retrieval corpus (Part O): ten short synthetic document chunks the S3 assistant can ground on (e.g., 2025 annual-review notes, IPS excerpt, 401(k) plan feature excerpt, beneficiary designation forms, Social Security statements, Ruth's facility agreement excerpt, a 2024 Roth conversion memo, 529 statement, mortgage statement, a meeting transcript excerpt for S3 note extraction).
- Every external fact chipped [H]/[M]/[L] with source; no analysis or recommendations (same rule as v4).
- Part M equivalent: list the arithmetic identities the new facts must satisfy (totals, cash flow, net worth) so build-case.mjs can recompute them.

Also produce docs/next-term/CASE-v5-impact.md: for every consumer in the P0 case dependency map, what must change (script, generated artifact, lesson region, card-sort deck, case viewer, retrieval corpus, check 20) and an effort estimate.

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST NOT edit CASE.md, any script, or any lesson.
2. MUST verify every tax or benefit parameter against a primary source (irs.gov, ssa.gov, ilga.gov, tax.illinois.gov, cms.gov) or mark it [UNVERIFIED: needs source].
3. MUST keep the household mainstream: no entity structuring, no trusts beyond what the brief states, no UHNW techniques in core facts.
4. MUST keep the case synthetic and labeled; no real names of employers or institutions.
5. SHOULD keep the fact set to what the five case pages and Sessions 1 to 5 actually need; list anything you added beyond the brief and why.

Must pass before commit: none (draft only); commit the two docs files.
Out of scope: adopting the case (Phase 3); lesson edits.
Record in PROGRESS.md (then continue): paths of both files, a one-screen household summary, the list of [UNVERIFIED] items, the Part K retired-string list, and the impact table.
```


---

### Phase 3: Adopt CASE v5.0 through the case pipeline


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: docs/next-term/CASE-v5-draft.md (self-approved per Autonomous Decision Rule R1), docs/next-term/CASE-v5-impact.md, CASE.md, MAINTAINING.md (CASE.md v4.0 migration checks; case spine; standing purge list; case-fact drift surface), scripts/build-case.mjs, scripts/inject-case.mjs, scripts/verify-case.mjs, scripts/verify-migration.mjs, scripts/build-cardsort.mjs, scripts/case-inventory.mjs, scripts/case-facts.json, scripts/case-corpus.json, scripts/test-case-viewer.mjs

Task: Replace CASE.md v4.0 with v5.0 and bring every case-pipeline script and generated artifact into agreement, so the injected case block in every lesson is the v5 block and all case checks pass.

Steps:
1. Replace CASE.md with the v5.0 draft content (copy, do not paraphrase).
2. Update build-case.mjs to the v5 figures and Part M identities; update case-facts.json and case-corpus.json generation; update build-cardsort.mjs to derive the session-1 card-sort deck from the v5 confidentiality landmines and rate inputs (or report if the deck no longer fits v5 and propose a replacement deck in the report without building it).
3. Run build-case.mjs then inject-case.mjs across LESSONS.
4. Add every Part K retired string to the standing purge list in MAINTAINING.md and to the retired-facts check in verify-migration.mjs, scoped as the existing list is (hub + lessons + cases + instructor-notes; historical record files excluded).
5. Update test-case-viewer.mjs expectations if tab labels or sections changed.
6. Expect verify-migration and the editorial/drift checks to now FAIL on lesson prose outside the injected block that still states v4 facts. Do not fix lesson prose in this phase. Record each failure count per file; Phase 4 owns those edits.

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST NOT edit lesson prose outside the CASE sentinels.
2. MUST NOT re-baseline any validator to make it pass; failures caused by v4 prose are expected and reported.
3. MUST keep the case-facts viewer's accessibility behaviors (focus trap, Escape, non-colour tab state).
4. SHOULD keep script changes minimal and documented in MAINTAINING.md (rename the section heading to "CASE.md v5.0 migration checks").

Must pass before commit: build-case.mjs, inject-case.mjs --check, verify-case.mjs, test-case-viewer.mjs, verify-style.mjs exit 0. verify-migration.mjs and case-inventory --report-check may fail only on v4 lesson prose; list every failure.
Out of scope: lesson prose, case pages, instructor notes.
Record in PROGRESS.md (then continue): exit codes, the list of remaining v4-prose failures by file and section, the card-sort decision, the MAINTAINING.md diff.
```


---

### Phase 4a: Old-case reference register


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: CASE.md (v5.0, including Part K retired facts), MAINTAINING.md purge list, docs/next-term/P0-baseline-report.md, output of verify-migration.mjs and case-inventory.mjs --report

Task: Build docs/next-term/P4-cole-reference-register.md: every reference to the Cole household or to any v4 case fact outside the injected CASE block, across index.html, session-1..5/index.html, instructor-notes/* (including .htm teaching aids), README.md, docs/probe-captures.md, and any JS data arrays inside lessons (e.g., card decks, captured model outputs, probe captures, corpora). Exclude session-0.1 (Phase 8 rebuilds it) and historical record files (CHANGELOG.md, changelog/, audit/, docs/changes/, docs/audits/), which keep v4 mentions as the record.

For each reference record: file, section id, core/appendix, line, the exact string (up to 160 chars), the fact it depends on (v4 Part and item), and a disposition:
  KEEP-NAME (mentions Meg/David/Cole only, still true under v5),
  REWRITE-V5 (teaching point survives; facts must change to v5; name the v5 fact to use),
  REPLACE-EXERCISE (the exercise only worked with the v4 structure, e.g., IDGT burn, unit valuation; propose the v5 replacement exercise in one line),
  DELETE (no v5 equivalent and no teaching loss),
  RECAPTURE (a captured model output that embeds v4 facts; must be re-run against v5 and re-captured with date).
Also total counts per file and per disposition, and an ordered work list per session for Phase 4b.

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST change no file except the register.
2. MUST include references inside JS strings, alt text, aria labels, titles, and data attributes, not just visible prose.
3. MUST flag every captured model output (Session 0.1 probe captures, live-console fallbacks, S3 assistant outputs) as RECAPTURE when it embeds case facts.
4. SHOULD propose v5 replacements that keep the same component type and section position (D01: no session rebuilds).

Must pass before commit: none; commit the register.
Out of scope: making the edits.
Record in PROGRESS.md (then continue): per-file and per-disposition counts, the RECAPTURE list, and every REPLACE-EXERCISE proposal.
```


---

### Phase 4b: Migrate references (loop: sessions 1, 2, 3, 4, 5, then hub + notes; session 0.1 is handled by Phase 8)


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: docs/next-term/P4-cole-reference-register.md (rows for session <N> only, with the R2 decisions logged in DECISIONS.md), CASE.md v5.0, MAINTAINING.md purge list and case spine, EDITORIAL.md (rules that govern prose edits), PEDAGOGY.md, session-<N>/index.html (only the sections listed in the register)

Task: Apply every register disposition for session <N> so that, after this turn, the session file contains no v4 case fact and every Cole example uses v5 facts.

Rules:
- REWRITE-V5: change facts and numbers to v5; keep the teaching point, component type and section position; recompute any on-page arithmetic and state it in the report.
- REPLACE-EXERCISE: build the replacement chosen under R2 in the same section with the same component family from the interactive-lesson-builder bank; keep commit-then-reveal; no gating.
- DELETE: remove cleanly, fix any cross-links and the appendix gold links.
- RECAPTURE: run the prompt against a current Claude model with v5 inputs, capture the output verbatim with model name and date, replace the old capture; if you cannot run it, insert a labeled placeholder "[RECAPTURE NEEDED: prompt id]" and list it.
- Any figure taken from CASE.md must match it exactly; any external figure gets an H/M/L chip and source.

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST edit only session-<N>/index.html (and its generated regions via the repo's own build scripts).
2. MUST leave the session > section structure, ids, data-nav titles and timing table intact unless the register row says otherwise.
3. MUST NOT re-baseline any validator.
4. SHOULD keep prose density at live-taught levels (screen text supports the instructor).

Must pass before commit: verify-case.mjs, verify-migration.mjs (it scans all lessons; filter its output by path and require zero v4 hits attributed to session-<N>/index.html; other sessions may still fail until their turn), verify-style.mjs, verify-browser.mjs (session <N>), verify-editorial.mjs (no new failures vs. P0), skill pre-push gate for session-<N> (validate_lesson.py with --case Cole and the updated purge list, validate_dom.js).
Out of scope: section drops/adds (Phase 6), facts sweep (Phase 5), other sessions.
Record in PROGRESS.md (then continue): rows applied by disposition, arithmetic recomputed, RECAPTURE outcomes, validator exit codes, remaining issues.
```

Final 4b run uses `<N>` = `hub-and-notes` and targets `index.html`, `README.md` ("The Cole household" section rewritten to v5), `instructor-notes/*` and `docs/probe-captures.md`. This run must end with every case validator exiting 0 across all files except session-0.1 (if Phase 8 has not run yet, list its v4 hits as expected and owned by Phase 8).

---

### Phase 5: Facts and accuracy correction sweep


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: facts/FACTS.json, facts/FACTS.md, output of `node scripts/verify-facts.mjs --report`, docs/next-term/P0-baseline-report.md (volatile-fact census), SOURCES.md conventions, MAINTAINING.md (sources and the two dating fields)

Task: Bring every served page and instructor note into agreement with FACTS.json, and correct the content errors recorded in the Fall 2026 transcripts wherever they appear in repo text.

1. For each verify-facts hit: correct the statement to the FACTS value, add or update the chip so it cites the FACTS id and source, and update SOURCES.md/BIBLIOGRAPHY via the repo's generators.
2. Corrections register (Fall 2026 class errors; fix wherever repo text states or implies them, and add the correct version to the session's instructor notes "Verified facts" list in Phase 10):
   - output tokens about 2x input -> 5x (S1, S2)
   - "the input box is the context window" -> definition per FACTS context-window-definition (S1, S2)
   - Claude watermark traces to an account -> Claude now watermarks text; does not identify users; Google SynthID; OpenAI images + EU text (S1, S4)
   - ChatGPT defaults to no training -> consumer default is training with opt-out (S4)
   - Max plan $500 -> $100/$200 (S5)
   - Claude personal plan retains 5 years by default -> 5 years if training toggle on, 30 days if off (S4)
   - MCP "master control protocol" -> Model Context Protocol (S5)
   - FINRA guidance rescinded 2025 -> RN 24-09 active; SEC withdrew PDA proposal (S4)
   - SEC exam priorities bind you -> no legal force; underlying rules bind (S4)
   - Reg S-P CCO within 24 hours -> 30-day customer notice; 72-hour service-provider notice; incident response program; in force for all RIAs since 2026-06-03 (S4)
   - AI use policy legally required -> exam expectation under 206(4)-7, not named in any rule (S4)
   - personal Claude plan illegal for client work -> no tool-specific rule; Reg S-P safeguards, recordkeeping and firm policy make it untenable (S1)
   - Navajo has no written form -> it does (S1, wherever used)
   - TCJA 2016 -> enacted December 2017 (S5)
   - portability "permanently lost" if not elected -> Rev. Proc. 2022-32 simplified late election to the 5th anniversary of death for estates without a filing requirement (S2)
   - IRC 7872 threshold conflation -> state the $10,000 and $100,000 thresholds correctly or remove (S1)
   - "one-shot" for a bare prompt -> zero-shot (S2)
   - LMArena -> Arena (arena.ai) everywhere
3. Session 1 model-selection content: update the model lineup, tier table and price chart to FACTS values; add LiveBench and Arena alongside Artificial Analysis as the leaderboards, each with what it measures (FACTS ids), keeping the existing component.
4. Session 4: update the Reg S-P content to "in force" with the 30-day and 72-hour clocks; replace any watermark claim with the FACTS records; add the ISS "78% of RIAs have no written AI policy" figure (M) where the AI policy is introduced.
5. Run verify-facts.mjs (non-report) until it exits 0.

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST change facts only; no section adds, drops or reorders (Phase 6).
2. MUST cite a FACTS id for every volatile fact touched; never type a price or model name that is not in FACTS.json.
3. MUST use the repo's generators for SOURCES/BIBLIOGRAPHY; never hand-edit generated files.
4. SHOULD prefer tier-generic phrasing ("frontier tier", "fast tier") in prose that does not need the exact model name, so the next model release breaks fewer lines.

Must pass before commit: verify-facts.mjs (exit 0), verify-sources.mjs, verify-case.mjs, verify-migration.mjs, verify-style.mjs, verify-browser.mjs, verify-editorial.mjs (no new failures), skill pre-push gate on every edited lesson.
Out of scope: restructuring, case pages, polls.
Record in PROGRESS.md (then continue): corrections applied per file, corrections register rows not found in repo text (spoken-only errors), new FACTS ids added, validator exit codes.
```

---

### Phase 6a: Section drop/add proposals


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: PEDAGOGY.md, docs/next-term/P0-baseline-report.md (section tables and minute sums), session-0.1..5/index.html (section list, minutes, core/appendix, components), instructor-notes/session-N.md, CASE.md v5.0, the "Evidence brief" in this prompt

Task: For each session 1 to 5, write a proposal of section DROPS (demote core -> appendix, or delete) and ADDITIONS (new core or appendix sections) so that core is about 60 minutes (S5 core about 45 minutes because presentations take about 105) and the content reflects the Fall 2026 evidence. Write docs/next-term/P6-section-proposals.md. Edit nothing else.

Hard rules for every proposal:
- D01: keep the session > section scroll format; one topic per section; no rebuild from scratch. Additions are new sections in the existing format.
- Core about 60 min; appendix may grow to several hours with depth tiers (foundational, standard, advanced).
- Each session's core must include: one structured discussion (vote, defend, re-vote) promoted from the appendix or added (today all six sit in the appendix), at least one learner-production activity where the class commits before a reveal, and one link out to the session's case page (cases/case-N.html, built in Phase 7).
- Every addition names its component family from the interactive-lesson-builder bank, its ICAP tier (Constructive or above), minutes, and the evidence row it answers.
- Show a timing table per session: before vs. after, core and appendix, with the delta.

Evidence brief (Fall 2026, from transcripts; use it, do not re-derive it):
- Engagement came from learner production and commitment, not from instructor-narrated cases. Peaks: S1 2:28 live co-built skill (about 14 learner turns per 10 min); S2 0:34 class co-writes a prompt (about 15); S4 0:43 Reg S-P breach-deadline poll (only learner-to-learner argument of the term); S2 0:12 advisor-fee poll then discussion (about 8); S5 productivity-study prediction. Dead zones: S1 Cole IDGT walkthrough (13.5 min); S2 portability citation chase followed by 37 min with no learner speech (final-project explanation, cost per task, benchmarks); S4 Cole anonymization walkthrough (10.8 min); S4 watermarking (24 min); S5 post-break demos (GitHub, MCP, routines) about 73% lecture.
- S1: no student had a Claude account at 0:17; about 35 new terms; estate jargon met silence; interface tour about 27 of 169 min. Jeremiah: "show us briefly on building the skill and the plugin". Overflow pushed the S2 lesson start to minute 112.
- S2: the seven-step planning process and delegation (a stated learning objective), interview rewrite and templates got 0 minutes; nobody had read Laplace.
- S3: no transcript; treat proposals as lower confidence.
- S4: AI use policy homework never debriefed; hallucination risk and audit trails got little time; image real-vs-AI game drew participation; the Will Smith video drew none.
- Students' own workflows: risk profile, new-client packet, CFP study prompt, Roth conversion, retirement plan, annual-review notes to CRM.
- Instructor decisions: S1 hands-on in each student's own paid account; tiers + leaderboards (LiveBench, Arena, Artificial Analysis) as one section; other vendors (ChatGPT, Gemini, Copilot, Perplexity, Grok) as one comparison section; session 0.1 becomes pre-course setup; baseline timing moves to homework 1; Laplace dropped from readings.

Starting hypotheses to evaluate (accept, modify or reject each with reasons):
- S1 ADD core: guided click-along in own account (model picker, projects, custom instructions, one skill) on a case-1 task; one leaderboard + tier choice section; vendor comparison section; glossary card capped at about 12 new terms. PROMOTE: live co-built skill. DEMOTE: estate techniques, token-price arithmetic beyond one example, n-gram/model-fitting depth, baseline capture section.
- S2 PROMOTE to core: seven-step process and delegation line (stated LO), interview rewrite, co-written prompt, citation verification on the case-2 Roth email. DEMOTE: Laplace material, temperature depth, cost-per-task benchmarking.
- S3 KEEP core: note-taker pipeline and grounding on the v5 annual-review corpus; ADD: source-line citation check on extracted action items.
- S4 ADD core: Reg S-P in force (30/72 clocks) with the breach-deadline poll as the discussion seed; AI policy debrief using the ISS 78% figure; watermark status (short). DEMOTE: watermark deep dive. CUT: low-yield videos.
- S5 core about 45 min: productivity prediction and reveal, workflow maintenance as models change, human judgment and trust; DEMOTE: GitHub/MCP/routines demo to advanced appendix.

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST edit nothing except the proposal file.
2. MUST give per-session before/after timing tables that sum correctly.
3. MUST mark every proposal row ACCEPT-HYPOTHESIS, MODIFIED, REJECTED or NEW with a one-line reason tied to evidence.
4. SHOULD keep total new core sections to at most 3 per session.

Must pass before commit: none; commit the proposal.
Out of scope: building anything.
Record in PROGRESS.md (then continue): per-session timing tables; then apply R3 to mark each row ACCEPT or REJECT in DECISIONS.md.
```


---

### Phase 6b: Apply accepted section changes (loop over sessions 1..5)


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: docs/next-term/P6-section-proposals.md (session <N> rows marked ACCEPT under R3 in DECISIONS.md), PEDAGOGY.md, MAINTAINING.md (appendix reflow and generated regions), the interactive-lesson-builder skill component bank, session-<N>/index.html, CASE.md v5.0, facts/FACTS.json

Task: Apply only the ACCEPT rows for session <N>: demotions to appendix (with depth tier and gold back-links), deletions, promotions, and new sections built in the existing section format.

Rules:
- New sections use bank components with commit-then-reveal, no gating, keyboard reachable, H/M/L chips with sources, figures from CASE.md or FACTS.json only.
- Regenerate appendix regions and timing tables with scripts/build-appendix.mjs; never hand-edit generated counts.
- Add a "Case" link button at the top of the session pointing to ../cases/case-<N>.html (the page may not exist yet; leave the link and list it for Phase 7) .
- Promote or build exactly one core structured discussion as accepted under R3.
- Add an empty "Reading for Session <N+1>" card region (allowed purge phrasing) bounded by `<!-- READINGS:BEGIN s<N+1> -->` / `<!-- READINGS:END -->`; Phase 10 fills it from docs/next-term/readings.json.

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST keep core at the accepted minutes (state the computed figure).
2. MUST NOT touch other sessions.
3. MUST NOT re-baseline validators.
4. SHOULD reuse existing components before adding new families.

Must pass before commit: build-appendix.mjs (clean), verify-style, verify-browser (session <N>), verify-case, verify-migration, verify-facts, verify-editorial (no new failures), skill pre-push gate (validate_lesson.py --require-timing --require-tagging, validate_dom.js).
Out of scope: case pages, polls, instructor notes.
Record in PROGRESS.md (then continue): rows applied, before/after timing table as computed by build-appendix, new components with ICAP tier, validator exit codes.
```

---

### Phase 7: Build case pages (loop over cases 1..5)


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: CASE.md v5.0, facts/FACTS.json, PEDAGOGY.md, MAINTAINING.md (Layout, shared styling, external-origin allowlist, storage rule, Adding a session), the interactive-lesson-builder skill (design system, component bank, validators), session-<N>/index.html (section ids and the Case button added in 6b), index.html (hub card markup)

Task: Build cases/case-<N>.html: a standalone, single-file interactive case study page that a student opens before the session lesson. It must look clearly different from lesson pages (a distinct "CASE FILE" identity: its own accent color band, case-file header with case number, household name and date, document-style panels) while reusing the shared style fence, typography and accessibility patterns.

Page structure (one scroll, sections like the lessons):
1. Case brief: the client situation in plain language (about 150 words), the deliverable the advisor needs, and a "Case facts" panel drawn from the injected CASE block (reuse the case-facts viewer rather than duplicating facts).
2. Your call first (commit): a learner-production component (from the bank) where the student commits before seeing the answer. Use the case spec below.
3. The finished deliverable: the completed advisor artifact, shown as a document panel, labeled synthetic and AI-assisted, with its verification marks.
4. How it was built: the prompt(s) used (copyable), model tier chosen and why (FACTS ids), the verification steps actually run, one failure that occurred and how it was caught, and the human-judgment points.
5. Check yourself: one short Constructive item tied to the deliverable.
6. Continue to the lesson: a prominent button to ../session-<N>/index.html#s1 and back-link to the hub.

Case specs:
- case-1 (Session 1): Onboarding intake summary + risk-profile explainer. Commit: from the intake facts, rank the 3 facts that most change the plan, and predict whether Meg's and David's risk scores diverge and in which direction. Deliverable: one-page intake summary + plain-language letter explaining the couple's two risk profiles and how the advisor will reconcile them. "How it was built" must include the workflow's own readme.txt written to the 12-heading package spec (TASK; WHO RUNS IT; TOOL, PLAN, MODEL, EFFORT SETTING; SETUP STEPS; INPUTS; HOW TO RUN; EXPECTED OUTPUT; VERIFICATION STEPS; WHERE A HUMAN MUST DECIDE; TWO FAILURE MODES YOU HIT; BASELINE VS AI TIME; DATA-HANDLING NOTE): Phase 9 uses it as the model readme.
- case-2 (Session 2): Roth conversion client email with IRS-cited facts verified. Commit: four cited statements in a draft email; one citation is planted wrong; student flags which and why before reveal. Deliverable: the corrected email + a citation verification log (claim, cited authority, primary-source URL, verified Y/N).
- case-3 (Session 3): Annual-review meeting notes to CRM tasks + follow-up email. Commit: from a meeting transcript excerpt (v5 Part O), student lists the action items they would log; then compare with the AI extraction and the human-corrected version, each item linked to its source line. Deliverable: CRM task list + client follow-up email.
- case-4 (Session 4): De-identify a client file + vendor check + breach tabletop. Commit: hotspot every NPI field in a synthetic Cole document (v5 Part J landmines); then choose which vendor/plan tier is acceptable for which data; then the breach clock question (30-day customer notice, 72-hour service-provider notice; FACTS reg-sp-compliance). Deliverable: the de-identified file with a key-retained pseudonymization note (pseudonymize, not anonymize), a one-paragraph vendor decision, and a breach-response timeline.
- case-5 (Session 5): Retirement-income one-pager + workflow maintenance log. Commit: predict which step of a documented workflow breaks when the model changes (e.g., a model retirement listed in FACTS) and why. Deliverable: client-facing retirement-income one-pager + a maintenance log (date, model, change observed, fix, re-test result).

Also: add the case page to the hub (a "Case" link on each session card or a case strip, matching hub markup) and to LESSONS lists or validator globs as needed so verify-style/verify-browser/verify-facts/purge checks cover cases/*.html. If injecting the CASE block into case pages, add them to LESSONS in inject-case.mjs.

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST be one self-contained HTML file; no storage APIs; no external origins beyond the fonts allowlist; works offline.
2. MUST use CASE.md v5 and FACTS.json for every figure; chip every external fact.
3. MUST commit-then-reveal with no gating; keyboard reachable; non-color success indicators; visible focus.
4. MUST label every deliverable and model output as synthetic and AI-assisted with model name and date of capture.
5. SHOULD target 20 to 30 minutes of student work.
6. PREFERRED: print stylesheet that prints the deliverable cleanly.

Must pass before commit: verify-style, verify-browser (extended to cases/), verify-case (if injected), verify-facts, purge greps over cases/, skill validate_dom.js on the case page, a headless screenshot reviewed for visual distinctness from a lesson page.
Out of scope: lesson edits beyond the hub link; other cases.
Record in PROGRESS.md (then continue): file path, section list with minutes, components and ICAP tiers, screenshots paths, validator exit codes.
```

---

### Phase 8: Session 0.1 to pre-course setup page


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: session-0.1/index.html, docs/session-0-1-BUILD-SPEC.md, docs/session-0-1-progress.md, MAINTAINING.md (live model console rules), facts/FACTS.json, index.html

Task: Convert session-0.1 into a short self-paced "Start here: setup and click-along" page (about 45 to 60 minutes of student work), keeping its URL. The result must contain no v4 case fact (Phase 4b skipped this file). Check the title against the Tier B purge stems ("before Session N" phrasing is retired); use "Start here" wording unless the existing hub phrasing "runs before Session 1" is confirmed allowed.

Content:
1. What you need: a paid Claude plan (Pro minimum; FACTS claude-plans), how to confirm the model picker shows the Pro models, and the consumer data settings (FACTS claude-consumer-retention): where the training toggle is and what each setting means.
2. Click-along tour, one menu item per section, each with one tiny task done in the student's own account: new chat and model picker; projects (create one); custom instructions (paste a starter set); search and research; connectors (what they are; do not connect work systems); skills (enable code execution; upload a sample skill ZIP provided on the page as a download link only if it can be served from the repo; otherwise describe); incognito; memory.
3. Baseline timing worksheet for Homework 1: pick one recurring task, time it by hand, record minutes (the page stores nothing; tell the student to copy it out).
4. Vocabulary card: the 12 terms Session 1 will use, plain-language.
5. Remove every reference to sessions 0.2 and 0.3; remove the 120-minute live-session framing, the debate, and any content now owned by Session 1; delete rather than move (list anything you think Session 1's appendix should absorb, for Jared to decide).
6. Hub: relabel the card "Start here: setup" and place it first.

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST keep the page self-contained, offline-capable, no storage.
2. MUST keep or remove the live-model console consistently with MAINTAINING.md rules (state which and why); if removed, update the allowlist docs and fallback checks.
3. MUST use FACTS ids for plan names, prices and settings.
4. SHOULD include screenshots only if they can be generated from synthetic accounts; otherwise describe steps in numbered text.

Must pass before commit: verify-style, verify-browser (0.1), verify-facts, verify-case (if the case block remains), skill validate_dom.js, purge greps.
Out of scope: Session 1 edits.
Record in PROGRESS.md (then continue): new section list with minutes, what was removed, console decision, validator exit codes.
```

---

### Phase 9: Final-project package text on lesson pages


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: MAINTAINING.md standing purge list (Tier A grading words, Tier B obligation words, LMS-name rule), session-2/index.html (section id="s12", on-page label "09 · Assignment", holding the handoff cards and the CHK array near "var CHK=["; not id="s9"), cases/case-1.html (its model readme.txt), session-3/index.html (the Part 1 reminder card), session-4/index.html (§08 The Handoff Test), session-5/index.html (presentation logistics in E1/E4 and core), the "Package description" block in this prompt

Task: Replace every on-page description of the handoff package and the Part 2 presentation with the new package design, phrased within the purge rules (no grading, submission, due-date words, no LMS name; use "the course site").

Package description (instructor-approved):
- Part 1 handoff package = ONE .zip file containing:
  readme.txt (plain text, sections in this order: TASK; WHO RUNS IT; TOOL, PLAN, MODEL, EFFORT SETTING; SETUP STEPS (numbered); INPUTS (format, and where the sample inputs are); HOW TO RUN (the exact starter prompt); EXPECTED OUTPUT; VERIFICATION STEPS; WHERE A HUMAN MUST DECIDE; TWO FAILURE MODES YOU HIT; BASELINE VS AI TIME (baseline from Homework 1); DATA-HANDLING NOTE (fields to remove or pseudonymize before real use))
  workflow/ (the skill ZIP or the prompt files and project instructions as .txt, plus supporting files)
  samples/ (synthetic inputs for at least two different clients, and the output each produced)
  selfcheck.txt (the builder's own cold run: fresh chat or project with memory off, followed only readme.txt, both samples run, every link opened, result of each check)
- The build transcript is not in the handoff package (it goes with Part 2 to the instructor).
- Part 2: the presenter runs the classmate's package, improves it, and prepares an 8-minute talk answering: what it does and the problem it solves; the design choices (tool, model tier, prompt structure, verification); where it worked and where it broke, naming the input that broke it; what you changed and the re-run result; one thing you are taking into your own practice. No live demo. Slides optional. The builder then has 2 minutes; then 3 minutes of questions.
- The presenter's Part 2 package (also one .zip): improved/ (revised workflow), outputs/ (outputs from the original and from the improved version), changes.txt (what broke, the breaking input, the change, the re-run result), transcripts/ (the chats used to learn and improve it, plus the presenter's own Part 1 build transcript).

Edits:
1. Session 2 #s12 ("09 · Assignment"): rewrite the handoff cards and the CHK checklist array to the package above (the checklist becomes the readme.txt + folder list + selfcheck items). Keep the component.
2. Session 3 reminder card and Session 4 §08: align to the package; remove "one email, See attached" everywhere.
3. Session 5: align presentation logistics to 8 + 2 + 3 minutes and the five questions; keep logistics that the purge rules allow; move anything else to instructor-notes/session-5.md.
4. Add one short core item in Session 2 #s12 where the student drafts their own readme.txt TASK and HOW TO RUN lines (commit, then compare to a model readme from case-1's workflow).

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST pass the purge greps (Tier A, Tier B, LMS name) with zero new hits.
2. MUST keep "the course site" as the only reference to where files go.
3. MUST NOT add grading weights or rubrics to any page.
4. SHOULD keep wording identical across the four sessions (one shared phrasing).

Must pass before commit: purge greps, verify-style, verify-browser (2, 3, 4, 5), verify-editorial (no new failures), verify-facts, skill pre-push gate on the four files.
Out of scope: Canvas text, syllabus.
Record in PROGRESS.md (then continue): the final shared package wording, files and sections changed, validator exit codes.
```

---

### Phase 10: Instructor notes: polls, verified-fact cards, reading cards


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: instructor-notes/ (all), facts/FACTS.json, docs/next-term/P6-section-proposals.md (ACCEPT rows), session-1..5/index.html (section lists after 6b), Appendix R of this runbook (tentative readings)

Task: Update instructor notes for next term and fill the reading cards on the lesson pages.

1. Polls: for each session 1 to 5, write instructor-notes/session-N-polls.md with exactly 4 polls tied to that session's core sections. Vary formats across the term (single choice with a surprising checkable answer, multi-select, numeric-range prediction, ranking or short answer) without forcing all four formats into every session. Each poll: question, options, correct or expected answer with source, the decision rule ("if more than half pick B, run the discussion; else reveal and move on"), and which section it opens or closes. Reuse the two polls that drove the best discussions this term: the advisor-fee poll (S2) and the Reg S-P breach-deadline poll (S4), updated to current facts.
2. Zoom setup card (instructor-notes/zoom-poll-setup.md): how to build multi-select and short-answer polls ahead of class; do not make students co-hosts during polls (co-host status broke the S5 short-answer poll); how to launch and share results; a 30-second fallback (chat waterfall) when a poll fails.
3. Verified-facts card per session (append to instructor-notes/session-N.md under "Verified facts for this session"): generated from FACTS.json records whose applies_to includes the session, plus the CORRECT versions of the Phase 5 corrections register rows for that session (state only the correct fact; never restate the wrong claim, so the retired-value checks stay green), each with source URL and retrieved date. Add a "Re-verify the week before" checklist line.
4. Reading cards: create docs/next-term/readings.json from Appendix R (every row status "tentative"), and a script scripts/build-readings.mjs that fills each READINGS region from readings.json (title, author, date, URL, minutes, "watch before class" for videos) using the allowed phrasing "Reading for Session N". Run it. Jared will edit readings.json after his manual review and re-run the script; make that a two-line entry in MAINTAINING.md. Add each reading to SOURCES.md via the generator with type assigned_reading.
5. Update instructor-notes/session-0.1.md and session-1.md stubs into short run sheets matching the new pages (objective, section run order with minutes, the 4 polls, the case-1 link moment).

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST use only readings from Appendix R; never add one. The approved policy (D12): Wolfram plus at least one added reading per session; about one video per two sessions, marked "watch before class", never scheduled for class time.
2. MUST cite FACTS ids for any volatile fact in polls or cards.
3. MUST keep lesson-page reading cards within purge rules.
4. SHOULD keep each polls file under one printed page.

Must pass before commit: verify-facts, verify-sources, verify-style, verify-browser (pages with reading cards), purge greps.
Out of scope: lesson content beyond the reading cards.
Record in PROGRESS.md (then continue): the 20 polls in a table (session, question, format, decision rule), files changed, validator exit codes.
```

---

### Phase 11: Full verification, changelog, README, tag


```
Repo: relative-everything/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- · Branch: next-term-2027 (the single run branch) · Base: the branch state after the previous phase
Read first: MAINTAINING.md (pre-push gate, all checks), README.md, CHANGELOG.md (format), docs/next-term/ (all phase reports)

Task: Prove the next-term build is complete and consistent, update the public docs, and prepare the release tag.

1. Run every validator, test and grep in MAINTAINING.md plus verify-facts.mjs; all must exit 0. Quote outputs.
2. Purge proof: zero hits for every v4 Part K retired string and every FACTS retired_value across index.html, session-*/index.html, cases/*.html, instructor-notes/, README.md.
3. Timing proof: a table of core and appendix minutes per session from build-appendix.mjs; core at about 60 (S5 about 45).
4. Link proof: every internal link (hub -> sessions -> cases -> lessons and back, appendix gold links) resolves; every reading URL returns HTTP 200 or is listed.
5. Visual proof: headless screenshots of the hub, each session's first screen and each case page's first screen; list paths.
6. README: update the session table (add "Before Session 1" and case links), "The Cole household" section (v5 summary, synthetic), and the "How to use a lesson" note about case pages.
7. CHANGELOG.md: one dated entry "Next-term update (2027 cohort)" summarizing each phase; run build-changelog.py.
8. Print the tag command for Jared: next-term-2027-ready.

Constraints (ranked, MUST > SHOULD > PREFERRED):
1. MUST NOT fix content in this phase; any failure is reported with file, line and the owning phase.
2. MUST quote validator output verbatim.

Must pass before commit: everything above.
Out of scope: new content.
Record in PROGRESS.md (then continue): the full pass/fail table, timing table, link and URL results, screenshot paths, and the tag command.
```

---

## 4. Week-before-each-session ritual (next term)

1. `node scripts/verify-facts.mjs --as-of <session date> --session <N>`; re-open each high-volatility source, update `retrieved` dates and values in FACTS.json, regenerate FACTS.md, re-run Phase 5's sweep only for changed records.
2. Re-check SEC examination priorities (FY2027 expected Nov to Dec 2026) before Session 4, and swap the reading if released.
3. Re-run any captured model outputs on the session's pages if the model they name has been retired (Sonnet 4.5 retires 2026-11-30 per Anthropic's deprecations page).

## 5. Red team on this plan

- **Strongest case against:** the plan spends the largest block of turns on the case rewrite (Phases 2 to 4b, about 10 of about 28) because the v4 case is woven into scripts, generated artifacts and six lesson files. A cheaper path is to leave lessons on Cole v4 in the appendix and use v5 only on the case pages. You chose full migration (D26).
- **Assumption most likely wrong:** that the 2026-10-04 snapshot matches `main`. Session 5 was taught on 2026-10-05 and you may have edited files after. Phase 0 exists to catch that before anything is built.
- **Second risk:** core at 60 minutes still overflows live if delivery does not change. The S2 audit found the lesson file opened at minute 112. The content plan cannot fix delivery; it can only make the case page and core the first thing on screen.


---

## Appendix R: Tentative readings (load into docs/next-term/readings.json, status "tentative")

| Session | Type | Item | URL | Minutes |
| --- | --- | --- | --- | --- |
| 1 | reading | Wolfram (2023): "It's Just Adding One Word at a Time"; "Where Do the Probabilities Come From?"; "What Is a Model?" | https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/ | 30 |
| 1 | reading | OpenAI (2025-09-05), "Why language models hallucinate" | https://openai.com/index/why-language-models-hallucinate/ | 10 |
| 1 | reading | Anthropic Privacy Center, "Is my data used for model training?" | https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training | 3 |
| 1 | video | 3Blue1Brown, "Large Language Models explained briefly" (2024-11-20), watch before class | https://www.youtube.com/watch?v=LPZh9BOjkQs | 8 |
| 2 | reading | Wolfram: "The Training of ChatGPT"; "Beyond Basic Training" | https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/ | 15 |
| 2 | reading | IRS, "Understanding IRS guidance: a brief primer" | https://www.irs.gov/newsroom/understanding-irs-guidance-a-brief-primer | 5 |
| 2 | reading | Anthropic AI Fluency: Framework and Foundations, Delegation and Description modules (free registration) | https://anthropic.skilljar.com/ai-fluency-framework-foundations | 20 |
| 2 | video (optional) | Anthropic, "Prompting 101, Code w/ Claude" (2025-07-31) | https://www.youtube.com/watch?v=ysPbXH0LpIE | 25 |
| 3 | reading | Wolfram: "The Concept of Embeddings"; "Inside ChatGPT" | https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/ | 20 |
| 3 | reading | Claude Help Center, "RAG for projects" and "What are projects?" | https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects ; https://support.claude.com/en/articles/9517075-what-are-projects | 6 |
| 3 | reading | Kitces (2025-03-17), AI notetakers research, executive summary and findings | https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/ | 10 |
| 4 | reading | Wolfram: "Surely a Network That's Big Enough Can Do Anything!" | https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/ | 10 |
| 4 | reading | FINRA 2026 Annual Regulatory Oversight Report, GenAI section | https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report/gen-ai | 6 |
| 4 | reading | CFP Board, Generative AI Ethics Guide (2025-02-25) | https://www.cfp.net/ethics/compliance-resources/2025/02/generative-ai-ethics-guide | 10 |
| 4 | video | Andrej Karpathy, "[1hr Talk] Intro to Large Language Models", segment 45:43 to 58:37 only, watch before class | https://www.youtube.com/watch?v=zjkBMFhNj_g | 13 |
| 5 | reading | Wolfram: "What Really Lets ChatGPT Work?"; "Semantic Grammar and the Power of Computational Language"; "So ... What Is ChatGPT Doing, and Why Does It Work?" | https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/ | 25 |
| 5 | reading | Lee et al. (2025), "The impact of generative AI on critical thinking", CHI 2025, DOI 10.1145/3706598.3713778 | https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf | 30 |
