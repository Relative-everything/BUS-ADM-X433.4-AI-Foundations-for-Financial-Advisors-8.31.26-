# Plan: deferred-work catch-up, 2026-10-11

Branch `claude/magical-thompson-yhaivm`, from `ac94b6b` (`main` after PR #44). Nothing in this
folder has been executed; this file is the plan the instructor approves before any of it runs.
Every tree fact below was measured at `ac94b6b` on 2026-10-11 by six read-only sweeps (the
register row by row in four groups, the change folders and notes for unrowed deferrals, and the
in-repo verification surface). Measured facts are H unless marked; effort figures are INF 60-80%
(estimates from the row text and the size of the edit, no timing data behind them).

## 0. Bottom line

The register carries 85 rows marked open. **18 of them are already closed or moot on the tree, 1
(DW-041, the only BLOCKING row) has had its decision on record since 2026-09-08 and was never
executed, and about 24 items of deferred work from the Session 3, 4 and 5 passes were never given
a row at all.** The course is over (Session 5 ran 2026-10-05), so the register's whole priority
axis, proximity to the next class, no longer exists. The plan below re-cuts the queue on four axes
that do still apply, in this order: what a reader of the live site sees wrong today; what the
record loses if it is not written while memory is fresh (tags, changelog, the register's own
header); decisions whose stated expiry has passed, batched into one message; and what the next
cohort inherits (source attestation, the moving-target re-pull, a gate that runs from a clean
clone). Six PR-sized waves and one decision message clear everything that can be cleared from
this repository; 6 rows are upstream in a skill that is not on this host and are recorded, not
worked.

Recommended first move, against the strongest alternative: **Wave 1 (register hygiene) before any
page edit.** The alternative, fixing the live-page defects first, is faster to show but lands on a
register whose header still ranks rows for a class on 2026-09-14 and whose status column is
wrong on 18 rows, so every later wave would re-derive what this plan already measured.

## 1. Where the course stands

| Event | Date | Source |
|---|---|---|
| Session 1 | 2026-08-31, taught | register :103 |
| Session 2 | 2026-09-14, taught | `audit/PEDAGOGICAL-AUDIT-SESSION-2-2026-09-14.md` |
| Session 3 | 2026-09-21, taught | `instructor-notes/session-3.md:11` |
| Session 4 | 2026-09-28, taught | `docs/changes/2026-09-28-session-4-notes/handback.md:3-4` |
| Session 5 | 2026-10-05, taught | `instructor-notes/session-5.md:3` |
| Final-project deadline | not in the repository, by rule (D9) | `QUEUE.md:76-78` of the 09-17 folder |

Consequences for the queue:

- No row is "on the next-taught page". The live site stays up across cohorts (README:93-95), so
  a live-page defect is now a defect for every reader until the next cohort, not for one class.
- The register's header (lines 1-170) is three header blocks deep and the one that "wins"
  (2026-09-07) ranks six pull requests for 2026-09-14. Everything it schedules landed or lapsed.
  It also still says *"no session-5 lesson file is owed, now or later"* (:112-115); the file
  exists and is 8,393 lines.
- Decisions recorded only in change folders (09-17 choose-one-of-four cold open; 09-25 rebuild;
  09-27/28 syllabus DECIDE items; 10-02 Session 5 owed; 10-04 "click-to-text is not
  interactivity", rubric to scorecard) never reached the register header.

## 2. What the environment can and cannot do (governs the waves)

| Fact | Today | Effect |
|---|---|---|
| In-repo gate | 10 verifiers green: verify-editorial 0 hard (2 ADVISE A12), test-editorial-regions 9/9, verify-sources, verify-migration 15/15, verify-case 7/7, case-inventory, every `--check` generator current, test-case-viewer, verify-browser 107 PASS, test_live_console 86/86 | the tree is clean; Wave 2 edits are measured against a green baseline |
| `interactive-lesson-builder` skill | **absent on this host** (no `validate_lesson.py`, `validate_dom.js`, `restyle_sweep.py`) | `verify-style.mjs` exits 1; MAINTAINING's three pre-push commands cannot run; `build-changelog.py` **empties the style fence** if run here (436-line diff); DW-029/030/051/065/116/112 cannot be acted on |
| jsdom | not installed | every `docs/changes/*/checks.mjs`, the Session 5 `section-tests/run-all.mjs` (962 assertions) and the profiler's `dom` block fail on import; no row records this |
| Playwright Chromium | works | verify-browser, test-case-viewer, Session 5 `drags.mjs` run |
| Network | platform.claude.com, docs/support.claude.com, fonts.googleapis.com reachable; **403**: arxiv.org, irs.gov, artificialanalysis.ai, openai.com, writings.stephenwolfram.com, ecfr.gov | every source-verification row stays the instructor's at a browser; `attest-verified.mjs` also refuses to run without a TTY, by design |
| Git | branch push works; **no tag exists locally or on origin for any session**; DW-096 records HTTP 403 on tag push from this environment | Wave 4 is five commands on the instructor's machine |

Setup items that would widen what the environment can do (optional, one line each in the
environment's setup script): `npm i -g jsdom` and `NODE_PATH`; sync the lesson-builder skill and
set `RESTYLE_SWEEP`; allow the six blocked hosts. None of this is required for Waves 1 to 3.

## 3. Triage of the 85 open rows

Verdicts: **CLOSE** (premise gone on the tree, by removal, delivery or a fix that landed without
the row being annotated); **SUPERSEDE** (a later instructor decision made it moot; keep per the
never-delete rule); **RE-OWN** (decision exists, work is mechanical); **RATIFY** (record row, one
word from the instructor closes it); **KEEP-CC** (open, Claude Code, no decision needed);
**KEEP-INST** (open, instructor decision or reading); **UPSTREAM** (skill not on host).

### 3a. CLOSE on the tree (10)

| id | Evidence |
|---|---|
| DW-004 | `grep -E "Watermark found\|Detector errored\|aOpts" session-4` = 0; D2 now teaches the three-way detector (`session-4:4379`, `:4455`) |
| DW-005 | its own 09-25 note says closed; `src-synthid` down to 4 chips at M; status word never changed |
| DW-006 | `"Google's own current page"` = 0; `[UNCONFIRMED]` = 0 across hub and six lessons |
| DW-012 | `"section 4.2"` = 0 in session-4; the D1 exhibit is `COLEDOCS` at `:3527`, no company name |
| DW-021 | `verify-editorial`: `PASS A15 157 footer key(s)`; session-5 footer 30 ids = 30 chipped |
| DW-049 | MAINTAINING:161-168 loop now ranges `/$m:BEGIN v1/,/$m:END v1/`; md5s match (fixed `2df55c4`) |
| DW-073 | `docs/unsourced-claims.md` regenerated `dac0d0b`: 0 marked claims; live grep 0 |
| DW-092 | corrections delivered 2026-09-14 (`instructor-notes/session-2.md:28-36`) |
| DW-111 | `"baseline minutes you recorded in Session 1"`, `"Fourth time"`, `"pasted in Session 1"` = 0 in sessions 3-5 |
| DW-123 | session-3 core 67 + appendix 83 = 150 again after the 09-21 pass (`build-appendix` prints 150); the session-5 successor is a new row (§4) |

### 3b. SUPERSEDE (5, plus one merge)

| id | Superseded by |
|---|---|
| DW-055 | Session 4 rebuild: Appendix D6 "De-identifying" (`session-4:4099`, `:4869`) is the definition; session-5:7181 cites it |
| DW-062 | JN-003 (s2), JN-022 (s3), the 09-25 rebuild (s4 choose-one-of-four), the 10-02 build (s5 "Then and Now"); the five-copy ritual no longer exists; only `session-0.1:1154` keeps the line, and DW-057 freezes 0.1 |
| DW-066 | same four decisions; `COLD_CHECKS` 0.1 0 / s1 3 / s2 3 / s3 0 / s4 8 / s5 6; byte parity is moot |
| DW-117 | the row's own notes record each divergence as the state; Shift+U stays on 0.1, 1, 3, 4, 5 and session-2 alone lacks it |
| DW-114 (S2-23 part) | §02 has no decision paragraph and §09 consumes nothing; S2-25 stays open under KEEP-CC |
| DW-128 | **merge into DW-126**: identical twelve records, identical work; keep DW-128 as the dated re-check note on DW-126 |

### 3c. RE-OWN to Claude Code (1)

**DW-041, BLOCKING.** D2 (2026-09-08, register header) chose "record the engagement in §A.5".
Restated in the 09-17 plan (D9, E4) and the 09-18 and 09-19 handbacks as "decided, unexecuted".
`CASE.md:89` still reads `(none — assets held direct at a custodian)`; the Advisor transcript is
injected into every page's case span. Remaining work: one §A.5 line, `node scripts/inject-case.mjs`,
the v4.0 battery. Wave 3. The only decision still owed is the wording of the line (§6, D-01).

### 3d. RATIFY, one word each (9 rows, 2 words)

DW-044, DW-045, DW-046, DW-047, DW-058, DW-059 (A9 lowerings, one ratification per the 09-03
audit); DW-122, DW-124, DW-125 (the Session 3, 4, 5 A9/A8 re-records, each already put to the
instructor in its handback). A8, A9, A9b and T6-T9 are green at HEAD. Current baseline: 0.1 `3`,
s1 `1/66/67`, s2 `2/38/40`, s3 `4/3/7`, s4 `1/2/3`, s5 `1/2/3`; A9b 6 blocks / 6 dashes.
(Session-2's fall from 66 to 40 is fully narrated in closed row DW-115; one sweep flagged it as
unrecorded and that was a false alarm.)

### 3e. KEEP-CC, mechanical, no decision (16)

| id | What remains | Effort |
|---|---|---|
| DW-007 | `session-1:1868` second chip `data-src="src-aa"` after "Prices: Anthropic Claude Platform Docs" should be `src-pricing` | 2 min |
| DW-091 | `session-1:2098` "works from the three you write" | 2 min |
| DW-106 | session-2 §00 has no `<h2>`; `data-nav="Session map"` matches nothing | 2 min |
| DW-119 | `session-2:525` `.scale{display:flex;gap:5px}` no `flex-wrap`; 382 px at 380 | 2 min + measure |
| DW-077 | no 380 px rule in 0.1 or s1; `#caseBtn` right edge 630 / 615 px at 380 today; mirror session-5's lesson-local `@media (max-width:640px)` at `session-5:811`, outside the STYLE fence, both files one commit | 20 min |
| DW-043 | seven copies of 20 lesson-local `.case-*` rules agree (*17* and md5 `6477aaf7` as first written counted single-line rules only; corrected 2026-10-11); the check does not exist; row figures stale (six files, 20 rules) | 30 min |
| DW-114 S2-25 | `session-2:2886` `reveal()` shows all three; no textarea lock | 20 min |
| DW-032 | `docs/spine-brief.md:3` "Nothing here is implemented" | 1 min |
| DW-033 | `docs/repo-updates-plan.md:2806` "Three stay open" then four | 1 min |
| DW-080 | `verify-style.mjs:33-34` hard path (keep `RESTYLE_SWEEP`, add candidates as `build-changelog.py:157-201` does); stale path in `docs/session-0-1-progress.md:18`, `docs/editorial-gap-report.md:2017`; name `verify-wolfram-quotes.py` and its input in MAINTAINING | 30 min |
| DW-112 (doc half) | document `RESTYLE_SWEEP` in MAINTAINING; note session-2's `id="prog"` means an upstream `#ovr` fix misses it | 10 min |
| DW-086 | fold `docs/session-1-feedback-inventory.md:289-291` items 4, 5 and `EDITORIAL.md:1604-1620` into rows or pointers | 30 min |
| DW-102 | plan §0 Phase 4 row; CHANGELOG:1525 "unmerged on purpose"; MAINTAINING:818-900 stale four; README:66-78 | 30 min |
| DW-083 | the forward-dated correcting entry, once D-08 (errata mechanism) is answered | 15 min |
| DW-096 | the five delivered tags; needs a credential that can push `refs/tags` (Wave 4) | 5 min on the instructor's machine |
| DW-028 | A21 (D21 check) build; the twelve-item population needs the instructor's confirmation first (D-14) | 1 h |

### 3f. KEEP-INST (39, grouped by the decision that closes them)

*Page-level decisions, session-2:* DW-094 (adjacent component repeats; PL-003, PL-017), DW-105
(bridge allocation), DW-107 (doit-to-section rule; enumeration stale, now §07 and §06), DW-108
(record the 0-discussion-minute cost), DW-110 (F-028 Laplace `:1315`, F-115 `:1831`), DW-120
(nine PL findings, 0 of 9 landed; PL-026 is a live self-contradiction at `:1771` against `:2712`,
PL-034 the stamp), DW-027 (print nondeterminism, by design), DW-093 (only §02 at 179 w/min =
PL-013).

*Corpus-level decisions:* DW-050 (standalone or spiral; expiry passed 09-21; the rebuilt pages
adopted "callbacks without obligations" de facto, ten surviving callback sites in s3/s4/s5),
DW-056 (4 `.verify` gates left: hub `:989`, 0.1 `:1019`, `:1641`, s1 `:1308`; none closed by a
human reading), DW-075 (session-3's four real "tonight" sites `:1187`, §00's *"Tonight's one thing"*, `:1605`, `:1856`;
s4/s5 hits are identifiers and prompt text, not deixis), DW-054 (narrowed to `session-0.1:1686`,
`:1728`), DW-057 (frozen 0.1, nothing owed), DW-130 (scorecard vs rubric, nothing owed).

*Validator and governance decisions:* DW-023 (A15 to HARD), DW-053 (A8 session-3 minority 15
recorded, 3 measured), DW-104 (R2 regex before R5; fix plus 0.1 re-baseline is one instructed
edit), DW-014 (hub in A16 population), DW-010 (CLAUDE.md), DW-082 (retire Phases 5-7 in §0),
DW-084 (two contested rulings), DW-060 (B3 example re-quote), DW-020 (`session-1:1422` legend
chips), DW-017 (hub `:990` sentence against the extract below it), DW-097 (point to 0.1 as the
review copy), DW-100 (200-word plain-language case summary), DW-070 (flowchart pinning validator;
`$2,860,000` still unkeyed at `case-flowchart.html:110`).

*Readings at a browser (blocked from here):* DW-024 (140 records, 136 EMPTY `last_verified`,
1 populated; 400 of 480 references behind EMPTY), DW-025 (105 records with an
`[UNVERIFIED, needs source]` field, was 53), DW-081 (52 moving targets, 16 undated; oldest
`src-charlotin` 2026-06; no cadence), DW-126 (+DW-128: twelve session-5 M records, all notarised
unverified in the lock file), DW-109 (Rev. Rul. 2004-64 Situation 3 and Davidson in the §07 key;
deadline passed with no read recorded), DW-113 (six session-2 figures), DW-118 (seven `MODELS`
entries, August pull), DW-022 (`src-aa` full-dated re-pull; caption already names v4.1.1), DW-018
(`src-zhao`), DW-019 (`src-owasp` archive link; its `recheck_before` note is also stale: session-4
carries three chips), DW-069 (Wolfram inner quotation; article not in tree).

### 3g. UPSTREAM (6)

DW-029, DW-030, DW-051, DW-065, DW-116, and the skill half of DW-112. The skill is not on this
host. Recommendation (D-20): keep `open-upstream`, move them to their own table so the queue
stops counting them, and record in MAINTAINING that they are worked from the skill's own
repository or not at all.

## 4. Missing rows to add (DW-131 to DW-156)

Each is confirmed absent from the register by locator and ledger id. Severity per the register's
definitions; owner per what the work needs.

| new id | Candidate | Where | Severity | Owner | Live? |
|---|---|---|---|---|---|
| DW-131 | **Session 5 drag-geometry checks fail 3 of 36 today**: D-04 §04 token/stamp clash; D-07b §07 seven route-label pairs overlap at 1280 and 380. The 10-04 36/36 was measured with Google Fonts failing (cert); `drags.mjs` does not abort fonts, Inter now loads and the labels collide | `docs/changes/2026-10-04-session-5-interactivity/drags.mjs` | MINOR | Claude Code | yes, session-5 |
| DW-132 | jsdom not on the host: both Session 5 `checks.mjs`, `section-tests/run-all.mjs` (962), the Session 3 final and simplify `checks.mjs` and the profiler's `dom` block all fail on import; the 10-04 handback claimed 32/32 and 962/0 | `docs/changes/*/checks.mjs` | HOUSEKEEPING | Claude Code (setup line + MAINTAINING) | no |
| DW-133 | Session 3 manual-pass `checks.mjs` reports 13 OK / 7 FAIL on `main` since the 09-21 pass; found 09-28, "nothing was done" | `2026-09-28-session-4-notes/merge-report.md:75-80` | HOUSEKEEPING | Claude Code | no |
| DW-134 | `docs/audits/profiles/*.json` stale: session-4 profile 9,836 lines vs 12,030 on the page; s1 3,393 vs 3,410; no session-0.1 profile; `section_profile.mjs` overwrites all five so Sessions 1-4 were reverted | `docs/audits/profiles/` | HOUSEKEEPING | Claude Code | no |
| DW-135 | `build-unsourced.mjs:70` matches only `[NEEDS SOURCE]`/`[UNCONFIRMED]`; session-0.1's six `[UNVERIFIED, needs source]` markers (`:1242` x2, `:1244` prose; `:2010`, `:2224`, `:2232` script) never reach `docs/unsourced-claims.md`, which reports 0 | `scripts/build-unsourced.mjs` | MINOR | Claude Code (regex) + instructor (0.1 is frozen) | 0.1 only |
| DW-136 | Session 5 is 125 allocated minutes (`__coreMins=59`); the skill's V5 assumes 150; the DW-123 situation again, `--minutes` recorded nowhere | `MAINTAINING.md:447-457` | HOUSEKEEPING | instructor (one of DW-123's three ways) | no |
| DW-137 | **The 2026-09-21 Session 3 visual pass (PRs #34/#35/#36) has no change folder and no rows**: new §09b, the §01 cube, diagrams, the hash-depth block in sessions 1-4, `src-iskowitz` promoted at M, `src-regsp` chipped; the pass itself left the ACA Group "12%" at M and two legal characterisations attributed to the reading | CHANGELOG:592-690; commits `9f1518a`..`b57ba70` | MAJOR | instructor (read Iskowitz, ACA); Claude Code (folder) | session-3 §09b, §01 |
| DW-138 | **Session 4's "Verify before teaching" list, about 20 M-chipped legal and vendor claims, has no row**: Reg S-P combination reading, the 72-hour notice, CFP Board A.14 and the Gen-AI guide, the SEC 2025-06-12 withdrawal, three vendors' terms, three of four leaks, PROMPTFLUX, SEC FY2026 §VII, the Journal of Accountancy reading "not read", state day counts, FINRA primer, Gemini free-tier limits; "the readings were not re-verified" | `instructor-notes/session-4.md:454-558`; 09-27 handback `:85-95`; 09-28 handback `:145-193` | MAJOR | instructor | session-4 |
| DW-139 | Session 3's unverified items after 09-21: the Stanford chart version behind the 33% Westlaw figure (also cited by session-2 §07), the CFP Board checklist headings (cfp.net blocked), two §09 recording-law items "both are yours", the CFP Board record for the seven step names (plan B1) | `instructor-notes/session-3.md:67-81`, `:482-496`; `session-3-verify-brief.md` | MAJOR | instructor | session-3 §04, §09; session-2 §07 |
| DW-140 | Footer "Last updated" stamps are hand-maintained and wrong on four pages: s1 `2026-08-20` (edited 09-12, 09-21, 09-25), s2 `09-12` (PL-034), s4 `09-27` (edited 09-28), s5 `10-02` (edited 10-04); README:140 promises the page is always current. Flagged 09-18 as "wants a rule or a generator" | all lesson footers | MINOR | instructor (rule) then Claude Code | yes, four pages |
| DW-141 | README:133-135 says legal characterisations "sit behind a verification block"; sessions 2-5 carry none. Flagged 09-19 as "one line when the other lessons follow" | `README.md:133-135` | MINOR | Claude Code | README |
| DW-142 | README:116-119 defines M as "a single secondary source"; Sessions 4 and 5 use M for "consistent across several reports" | `README.md`; 10-04 handback `:109-120` | MINOR | instructor (which definition) | README, s4, s5 chips |
| DW-143 | The 09-28 pass changed MAINTAINING's console rule (LMBOX-S4) with "if you would rather keep the rule, deleting the three fenced blocks restores the page" put to the instructor; the EU AI Act decision taken "against the note's first instinct"; eight verified records left uncited; Part D readings not re-verified | `2026-09-28-session-4-notes/handback.md:37-47`, `:167-175`; `plan.md:27-30` | HOUSEKEEPING | instructor (ratify) | session-4 top box |
| DW-144 | 09-27 `manual-review.md`: nine ranked "Decide:" blocks, of which the 09-28 notes answered five; §03 vendors, §04 approved-tool example, §07 JoA article, §05 board timing, D1/D2 26 minutes with no syllabus anchor, §01 quoted sentences, §02 compliance-officer confirmation, §00 bridge click-to-text, D3 fold-or-keep | `2026-09-27-session-4-syllabus/manual-review.md:7-91` | MINOR | instructor | session-4 |
| DW-145 | 09-25 rebuild flags never rowed: CFP Board A.14 and Gen-AI guide records (flag 5), V6 17 roots vs the 13-15 band (flag 6), six sources Session 4 stopped citing, now 23 records with no chip per `build-sources` (flag 7) | `2026-09-25-session-4-rebuild/handback.md:196-215` | MINOR | instructor (5, 6); Claude Code (7) | session-4 |
| DW-146 | Generator-wide strings offered "say the word", never decided: the appendix card wording, the footer minutes table, retrieval dates printed as "2026, September 13"; changing them touches frozen 0.1 | `2026-09-25-session-4-polish/handback.md:70-77` | MINOR | instructor | all footers |
| DW-147 | Session 5 proposals left with the instructor: the "one honest cut" of §01's eight legacy rows, the two density routes, phone-width legibility of five figures (and Session 4's), touch and pen never driven, the 10-02 plan's "three independent reviews" against one recorded, S5B-041's `qc/` transcripts that do not exist | 10-04 handback `:48-49`, `:163-164`; 10-02 handback `:158-160`, `:197` | MINOR / HOUSEKEEPING | mixed | session-5 |
| DW-148 | Session 3 final and simplify flags never rowed: §08's prompts run only by the authoring model; Poll 2 four options against the page's three; `.verify`/`.vh` CSS orphaned on session-3; the aid prints answers keyed to array order; aid and run sheet clocks disagree; the 09-19 manual-pass folder's `notes-verbatim.md` is still the empty template | 09-18 handback `:392-414`; 09-19 simplify handback `:264-300` | MINOR / HOUSEKEEPING | instructor (polls, clock); Claude Code (CSS, folder) | session-3 CSS |
| DW-149 | Delivered tags for Sessions 2, 3, 4 and 5 (DW-096 covers Session 1 only); none exists on origin. Candidate commits: S1 `8442160`; S2 `0955c7b` (PR #29, 09-14) or `88d89c9`; S3 `9f81086` (PR #36, 09-21) or `87a09f1`; S4 `c8b87b7` (PR #42, 09-28) or `6f4f5e9`; S5 `ac94b6b` (PR #44) if nothing merged after 10-04, else the merge before 10-05 18:00 PT. Confirm from PR merge times before cutting | MAINTAINING:70-78 | HOUSEKEEPING | Claude Code (commands), instructor (push) | no |
| DW-150 | Off-site obligations the 09-17 queue says "stay on your desk": the Part 1 due-date contradiction in the syllabus and Canvas (F29), speaker-labelled Zoom transcripts (still "not yet done" in the 09-21 and 09-28 run sheets), transcript/chat/poll exports within 24 h | 09-17 `QUEUE.md:68-81`; `instructor-notes/session-4.md:560-572` | HOUSEKEEPING | instructor | no |
| DW-151 | `docs/gemini-live-api-feasibility.md:172, 290, 352` carry two `[UNVERIFIED]` figures (free-tier RPM/RPD, flash pricing); the Session 4 Live API box shipped on them and `instructor-notes/session-4.md:535-537` prints "sources conflict" | as cited | MINOR | instructor | session-4 Live API copy |
| DW-152 | The Session 2 pedagogical audit (`audit/PEDAGOGICAL-AUDIT-SESSION-2-2026-09-14.md`) is cited nowhere in the register; of its findings the page-bearing ones have no row: F10/FS-3 (session-2 prints no objective and no closing check), F23 (per-token economics taught to a flat-rate cohort, bears on §02), C07/C08 (backdoor-Roth letter provenance; whether Haiku runs Research, the model-selection trap item), F08 (no-client-data rule not restated at the Part 1 assignment). The delivery-only findings (F01-F07, F11-F13, F24-F28, F30) are recorded as read, not rowed | the audit `:514-516`; the 09-18 handback `:300-335` | MINOR | instructor | session-2 |
| DW-153 | F02 and F01 of that audit: the retrieval bridge and cold open did not run on 09-14; DW-050 and DW-062 were waiting on exactly that second data point and neither row records the answer ("nothing ran") | the audit F01, F02 | HOUSEKEEPING | Claude Code (annotate) | no |
| DW-154 | Teaching aids built before the last page edit: session-4 aid and rule-key PDFs at `0244094`, page edited again at `be54621` the same day; session-5 aid at `59bc0cb`, page at `e8d2cee` (layout only). Low risk, unrecorded | `instructor-notes/session-{4,5}-*.pdf` | HOUSEKEEPING | Claude Code (rebuild) | no |
| DW-155 | The 10-04 folder's own inconsistencies: `plan.md:111` "The Gate and the Rubric" (first written as `:148`; corrected 2026-10-11) vs the page's Scorecard; family counts 13 / 12 / 12 across `plan.md:104`, `handback.md:29`, `ledger.md:17` | the folder | HOUSEKEEPING | Claude Code | no |
| DW-156 | The register itself: 33 `closed` and 9 `superseded` rows sit inside the `## Open` table (no `## Closed` section); DW-121, DW-127, DW-129 `closed` under Open; stale figures inside open rows (DW-043 six files / 20 rules / `563230ac`; DW-056 thirteen gates; DW-075 counts; DW-107 enumeration; DW-019 `recheck_before`) | `docs/deferred-work.md` | HOUSEKEEPING | Claude Code | no |

Two things the sweeps found that are **not** rows: verify-browser rule 13 (fonts certificate)
was red in every proxied container since 09-25 and is green today, so it is one line in the
header, not a row; and the register-header statements listed in §1 are rewritten in Wave 1, not
rowed.

## 5. The re-cut priority

**Rubric, stated once so it can be re-run.** Severity (BLOCKING 30, MAJOR 20, MINOR 8,
HOUSEKEEPING 2) + reader exposure (a student-visible defect on a live page 40; live but not wrong
15; docs and tooling 0) + record decay (10 if the information needed to do it correctly is only in
people's memory or an ephemeral container: tags, changelog, header, what was decided when) + 10 if
unblocked (Claude Code) + effort bonus (minutes 8, hour 5, hours 2, decision-first 0). Teaching
proximity is dropped: it is zero for every row. The score is a sort key; the waves below are where
judgement overrode it, and why.

| rank | item | score | why it sits here |
|---|---|---|---|
| 1 | Wave 1, register hygiene (§3a-3d closures, §4 rows, header rewrite) | 42 | HOUSEKEEPING by severity, but every later wave reads this file first and 18 of its open rows are wrong; record decay is highest here |
| 2 | DW-041 execution | 100 | the only BLOCKING row; decision exists; one line and a regen; touches every page's case span so it lands alone |
| 3 | PL-026 (DW-120) | 68 | a live page contradicts itself on the exercise's answer |
| 4 | DW-131 session-5 drag geometry | 56 | the newest page, labels overlapping on the only interaction kind the 10-04 pass was built for |
| 5 | DW-140 stamps (incl. PL-034), DW-141 README | 56 | a reader is told a page is current and that a safeguard exists; both false |
| 6 | DW-077, DW-119 | 56, 56 | phone-width overflow on three pages |
| 7 | DW-007, DW-091, DW-106 | 48 each | minutes each, live text |
| 8 | DW-149 + DW-096 tags | 22 | low score, highest decay: the live tree per session is still inferable from PR merge times today and will not be in a month |
| 9 | Decision batch (§6) | — | one message; nothing in it is urgent and everything in it has been waiting past its own expiry |
| 10 | Source attestation (DW-024/025/081/126, DW-109/113/118/022/018/019/069, DW-138/139/137) | 40-45 | the largest block of real work; all of it is a browser and a terminal the instructor holds; it is what the next cohort inherits |
| 11 | Tooling (DW-080, DW-112 doc, DW-132, DW-133, DW-134, DW-135, DW-043) | 20-30 | a clean clone cannot run the documented gate; nobody outside sees it |
| 12 | Builds (DW-031 fonts, DW-070 validator, DW-028 A21, DW-100 summary, DW-027) | 18-40 | hours each; the fonts row also removes the one external request the README has to explain |
| 13 | Upstream (§3g) | 0 | not workable here |

Where judgement overrode the score: DW-041 scores highest and still runs second, because landing
it on a register that mis-states 18 rows is how the next reader re-derives this plan; Wave 1 is
two hours and nothing in it touches a page. DW-031 scores 40 on exposure and is held to Wave 7
because nothing on the page is wrong.

## 6. The decision message (one reply answers all)

Defaults are recommended; "take the defaults" closes every item. Each names what it releases.

| # | Row(s) | Question | Recommended default |
|---|---|---|---|
| D-01 | DW-041 | the §A.5 wording | *"the student's firm, engaged as planner 2026; assets custodied elsewhere"* (the 09-07 audit's text) |
| D-02 | DW-044-047, 058, 059, 122, 124, 125 | ratify nine recorded ratchet figures as listed in §3d | ratify |
| D-03 | DW-050, DW-153 | standalone or spiral | ratify what the rebuilt pages do: callbacks without obligations; close DW-050 as decided by practice |
| D-04 | DW-056 | the four surviving gates | keep the hub and session-1 gates as the course's visible statement of the rule; strike the two on frozen 0.1 from the count; closing any gate is a `last_verified`-class human read, scheduled in Wave 5 |
| D-05 | DW-140 | the "Last updated" stamp | generate it from `git log -1 --format=%ad -- <file>` in the pre-push step; until then set each to its last edit date |
| D-06 | DW-023 | A15 to HARD | yes (precondition met; 16 `data-nochip` sites) |
| D-07 | DW-082 | Phases 5-7 of `repo-updates-plan.md` | retire in §0; this register is the only list |
| D-08 | DW-083, DW-084 | the errata mechanism | one forward-dated "Corrections" entry per catch-up; rule the two contested 08-29 rulings Cosmetic as held |
| D-09 | DW-053, DW-104 | A8 session-3 minority to 3; narrow the R2 regex (run R5 first) and re-baseline session-0.1 to what it measures | both, one instructed edit each |
| D-10 | DW-010, DW-014 | a CLAUDE.md; the hub in the A16 population | CLAUDE.md: a 30-line pointer to MAINTAINING and EDITORIAL, nothing new; hub: widen |
| D-11 | DW-120 (PL-026, 011, 004, 017, 003, 013, 024, 035), DW-094, DW-107, DW-105, DW-108, DW-110 | the session-2 proposals | land PL-026 ("five"), PL-011 (M), PL-004, PL-035, PL-024 (chip `src-wolfram`); record PL-017/PL-003/DW-094 adjacencies as the state; ratify "a doit takes at most half its section" and resize §06/§07; footer note for the bridge's minutes; record the 0-discussion cost; delete F-115, chip F-028 as background |
| D-12 | DW-017, DW-020, DW-060, DW-097, DW-100 | hub sentence, legend chips, B3 example, 0.1 pointer, plain-language summary | narrow the hub sentence to "posed as a question in the lessons"; convert the legend to plain labels; re-quote B3; add the one-line pointer; write the 200-word summary (Wave 7) |
| D-13 | DW-075 | session-3's four "tonight" sites | apply the session-1 standard corpus-wide; 0.1 stays frozen |
| D-14 | DW-028 | the twelve D21 items | confirm the §13.2 A list, then build A21 |
| D-15 | DW-136, DW-146, DW-142 | session-5 at 125 minutes; generator strings; the M definition | record `--minutes 125` in MAINTAINING and the plan's A.1; leave the strings; README adopts the wider M wording |
| D-16 | DW-143, DW-144, DW-145, DW-147, DW-148 | the Session 3, 4, 5 handback flags | ratify the console rule as changed and the EU AI Act choice; answer the four open Decide blocks as "keep as shipped"; drop the eight legacy rows in §01 to four; rebuild Poll 2 to three options |
| D-17 | DW-081 | re-pull cadence | before each cohort's first session, and once now |
| D-18 | DW-130, DW-057, DW-054, DW-027 | nothing owed | confirm, close DW-130 and DW-054 (0.1 is frozen), leave DW-057 and DW-027 as by-design |
| D-19 | DW-031 | self-host fonts | yes, Wave 7 |
| D-20 | §3g | the six upstream rows | move to an "Upstream" table, out of the queue |

## 7. Execution waves

Each wave is one branch and one PR; the in-repo gate (§2) runs before every push; the A9
ratchet rule holds, so no mechanical edit may delete an em dash from authored prose without the
instruction being in D-02's successor.

**Wave 1, register hygiene. Claude Code, about 2-3 h, no page edits.**
1. Rewrite the header: one block dated 2026-10-11 that says the course is over, states the
   calendar in §1, lists the decisions since 09-14 that live only in change folders, and points at
   this plan. Keep the three earlier blocks under a "history" heading, unedited.
2. Status edits: §3a to closed with a dated note; §3b superseded; DW-128 merged into DW-126;
   DW-041 re-owned; stale figures in DW-043, DW-056, DW-075, DW-107, DW-019 corrected by dated
   note; a `## Closed` table so Open holds only open rows (DW-156).
3. Add DW-131 to DW-156 as written in §4.
4. Create `docs/changes/2026-09-21-session-3-visual-pass/` with a one-page ledger reconstructed
   from CHANGELOG:592-690 and the eight commit bodies (DW-137's folder half).
5. Fold DW-086's three external lists into pointers.
6. CHANGELOG: one forward-dated "Corrections" entry (pending D-08; if unanswered, the entry
   still lands as a dated catch-up note, which the file's own rule allows).

**Wave 2, live-page mechanical fixes. Claude Code, about 3 h.** DW-007, DW-091, DW-106,
DW-119, DW-077, DW-131 (reflow the §04 stamp and the §07 route labels; add a font-abort to
`drags.mjs` so the check measures one geometry), DW-141, DW-140 (as D-05 defaults), DW-114
S2-25, DW-032, DW-033, DW-102, DW-080, DW-112 doc, DW-135 regex, DW-133, DW-134 (rerun the
profiler after jsdom is available, else record it), DW-154 (rebuild the two aids), DW-155, DW-043
(the seven-way check). Also PL-026, PL-011, PL-004, PL-035, PL-024 if D-11 is taken. Each lesson
edited is re-run through verify-browser and, for session-5, `drags.mjs`.

**Wave 3, DW-041. Claude Code, 1 h, lands alone.** The §A.5 line per D-01, `node
scripts/inject-case.mjs`, `build-case`, the v4.0 battery, `case-inventory --report-check`,
verify-browser; register row closed with the commit.

**Wave 4, tags. Instructor's machine, 5 min.** Confirm the five commits from PR merge times
(DW-149), then:
```bash
git tag -a session-1-delivered-2026-08-31 8442160 -m "Session 1 as delivered"
git tag -a session-2-delivered-2026-09-14 <S2> -m "Session 2 as delivered"
git tag -a session-3-delivered-2026-09-21 <S3> -m "Session 3 as delivered"
git tag -a session-4-delivered-2026-09-28 <S4> -m "Session 4 as delivered"
git tag -a session-5-delivered-2026-10-05 <S5> -m "Session 5 as delivered"
git push origin --tags
```

**Wave 5, source attestation. Instructor at a browser and a terminal; Claude Code prepares.**
Claude Code produces one checklist per lesson from `docs/source-verification-queue.md` ordered by
reference count, with the exact `node scripts/attest-verified.mjs --key K --date D --evidence
"..."` line pre-filled per record, and the §07 key, session-4 verify list (DW-138), session-3
items (DW-139), DW-109/113/118/022/018/019/069 and the Gemini figures (DW-151) folded in as
rows. The instructor works the list; the lock file and chips move with each attestation. Budget:
INF 60-70% 6-10 h across the 140 records, front-loaded on the 52 moving targets and the twelve
session-5 M records. A second Cowork session could do the browsing half of this (opening each
publisher, reading the figure, reporting) with the attestation left to the terminal.

**Wave 6, decisions applied. Claude Code, 2-4 h once §6 is answered.** D-03, D-04, D-06,
D-07, D-09, D-10, D-11 (the resize half), D-12, D-13, D-15, D-16, D-18, D-20, with the A8/A9
re-records D-09 authorises landing in their own commits with their own rows.

**Wave 7, builds. Claude Code, about a day.** DW-031 (self-host the three families; update
README's network paragraph and the verify-browser allowlist), DW-070 (the flowchart pinning check
and the `$2,860,000` key), DW-028 (A21), DW-100 (the summary through `inject-case`), DW-027
(seeded PRNG at load, if D-18 wants it).

Order of dependence: 1 before everything; 2 and 3 independent; 4 any time; 5 any time after 1;
6 needs §6; 7 last.

## 8. Cowork prompt: front-end exploration of the live site

To run in Claude Cowork with Claude in Chrome while Waves 1-3 run here. It is self-contained;
paste it as the opening message.

```text
You are testing the live GitHub Pages site of a UC Berkeley Extension course, "AI Foundations
for Financial Advisors". Use Claude in Chrome. Work in a new tab. Do not sign in to anything,
do not enter an API key anywhere (every lesson has an optional "Live model" or "Live API" box;
leave it empty and confirm it is empty), and do not paste any real client information. The
pages store nothing; nothing you type is kept.

Site: https://relative-everything.github.io/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/
Pages, in this order: the hub (that URL), then session-1/, session-2/, session-3/, session-4/,
session-5/, session-0.1/, changelog/. Each session is one long interactive page.

Goal: an evidence table of everything a learner would see wrong, broken or confusing, at two
viewports: desktop (1280 px wide) and phone (380 px wide, set with DevTools device emulation).
A repo-side session is fixing the code in parallel from a register of known defects; your job
is what only a browser shows. Do not fix anything.

For every page, at both widths:
1. Open the Console. Record any error or warning at load and after each interaction below.
2. Open the Network tab, reload, and list every host contacted. Expected: the page's own host
   plus fonts.googleapis.com and fonts.gstatic.com and nothing else. Any other host is a finding.
3. Scroll the whole page. Record any horizontal scrollbar, any element cut off at the right
   edge, any overlapping text, any figure whose labels collide, any control you cannot reach.
   At 380 px, check specifically that the "Case facts" button in the top bar is on screen.
4. Work every interaction top to bottom: buttons, sliders, sorters, drag beats (session-5 has
   seven; try each by real dragging, then by click-the-item-then-click-the-place), reveal
   panels, polls, calculators, the depth control (foundational, standard, advanced, core only).
   For each: does it respond, does the result make sense, does a withheld answer stay hidden
   until you commit, does anything say "undefined", "NaN" or show an empty result.
5. Type a capital U into any text box. Expected: nothing is revealed (a past defect revealed
   every answer panel on that keystroke). Then press Shift+U outside a text box and note what
   happens; session-2 is expected not to react.
6. Click every confidence chip (the small H, M, L badges) and confirm each lands on a numbered
   footer entry. Click every footer link and record any 404 or page that does not match its
   title. Open "Case facts" and confirm the modal opens, traps focus, closes on Escape.
7. Read the footer: note the "Last updated" date and compare it with the most recent date in
   the changelog page for that session.
8. Print preview (Ctrl+P): the page renders without the navigation and without cut-off figures.
9. Read the page once as a learner and record any sentence that contradicts another on the
   same page, any figure that contradicts the same figure elsewhere on the site, any dates that
   read as stale, and any instruction that cannot be followed.

Known defects you may re-find, so label them with the id rather than describing them anew:
DW-077 (Case facts button off-screen at 380 px on session-0.1 and session-1), DW-119 (session-2
scrolls 2 px sideways at 380 px), DW-131 (session-5 §04 stamp and §07 route labels overlap),
PL-026 (session-2 §07 says "three of the six" in the prose and "Five of the six" in the result),
DW-140 (footer "Last updated" dates behind the changelog), DW-106 (session-2 §00 has no heading
to match its nav label). Anything else is new: number it CAND-01 upward.

Output one markdown file, findings-YYYY-MM-DD.md, with: (a) an environment line (browser,
date, the two viewports); (b) one table: id | page | section or element | viewport | steps to
reproduce | expected | actual | screenshot filename | severity you judge (a learner is misled /
a learner is blocked / cosmetic); (c) the per-page host list from step 2; (d) the console log
excerpts; (e) a short list of things that worked notably well, so the fixes do not break them.
Take a screenshot for every finding. Spend no more than 25 minutes per session page and 10 on
the hub and changelog; if a page needs more, say where you stopped.
```

## 9. Red team

**Strongest case against this plan.** The course is over and the next cohort has no date.
Everything above except the live-page fixes (Wave 2, Wave 3) is record-keeping and source
hygiene that nobody reads until the next build, and the instructor's time (Wave 5, the decision
message) is the scarce input. A leaner plan does Waves 2 and 3 now, cuts the tags, and leaves the
register and the sources until the next cohort is scheduled. The answer is the decay column in
§5: the live trees per session, which commit was on screen, and why each decision was taken are
recoverable today from PR timestamps and the change folders and will not be in a few months, and
the register is the one file every pass reads first.

**Assumption most likely to be wrong.** That the live site at `ac94b6b` is what GitHub Pages
serves. Nothing in this environment reached the Pages host; the Cowork prompt's Network and
footer checks are the test. Second: that the six egress-blocked hosts stay blocked for the
instructor's own sessions; if a cloud environment can reach irs.gov and artificialanalysis.ai,
most of Wave 5's reading moves off the instructor's desk and only the attestation stays there.

## 10. Corrections after the review, 2026-10-11

Added after Waves 1 to 3 landed and a five-lens adversarial review read them (`handback.md`). The
sections above are kept as approved; where they and this section differ, this section wins.

- **§3a, DW-092.** It was not closed on the tree. The corrections slot did not run on 2026-09-14
  and no later record says the backlog was delivered; DW-092 is open again, owned by the
  instructor, and carries the three spoken mismatches that were recorded only on DW-041. So §3a
  closes 9 rows, not 10.
- **§4, DW-131.** The web fonts are Bricolage Grotesque, Source Serif 4 and JetBrains Mono, not
  Inter, and D-04's failing pairs were station lines, not the token and stamp. §7's second step for
  DW-131, a font-abort in `drags.mjs`, was not taken: it would measure fallback metrics a learner
  never sees. DW-162 asks for the check to report which fonts it measured instead.
- **§6, D-15.** Only the retrieval-date format reaches frozen session-0.1; the appendix and minutes
  strings are generated for sessions 1 to 5 only (DW-146). The case for leaving the strings is
  weaker than D-15 says.
- **§6, D-16.** *Rebuild Poll 2 to three options* is withdrawn: the page and the poll already agree
  on four options since 2026-09-18 (DW-148). The four open Decide blocks of DW-144 are §04's
  named approved-tool example, §01's quoted Daly and SEC sentences with the FY2027 swap, §02's
  compliance-officer confirmation, and §00's click-to-text bridge; *keep as shipped* no longer fits
  the FY2027 swap, because the SEC's fiscal year 2026 ended on 2026-09-30.
- **§6, D-01.** Wave 3 did not use the default text. It recorded the engagement with no start date,
  because §A.6's January 2026 intake names no party and a 2026 date would be a new case fact. The
  remaining question: date the engagement 2026 (from that intake), or leave it undated.
- **§6, D-21 (new).** DW-092, DW-150, DW-152 and DW-157 are the course's carry-overs to the next
  cohort: the corrections owed to this cohort (was Post 2 posted?), the off-site obligations, the
  Session 2 audit's page-bearing findings, and whether Session 1's §00, §01 and §07 are rebuilt.
  Recommended default: post any undelivered corrections now; carry the rest into the next cohort's
  first pre-flight.
- **§2.** Wave 1's commit and this plan's first commit were red on `verify-migration` check 1 and
  3 through a quoted session-3 line number that the check reads as the retired IRC section; `f89a2ce` repaired both. Merge
  the branch whole, or squash it, rather than cherry-picking the early commits.

