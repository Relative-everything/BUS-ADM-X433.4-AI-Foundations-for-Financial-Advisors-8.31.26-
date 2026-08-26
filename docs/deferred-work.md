# Deferred work — the single register

**THIS FILE IS THE ONLY PLACE OPEN WORK IS TRACKED.** Before this file existed,
every phase wrote its own `§N.8 What Phase N leaves open` section into
`docs/repo-updates-plan.md`, and three of them accumulated in parallel with no
way to tell which entries were still true. §13.8, §15.4 and §16.8 are folded in
below and are now **history of what each phase found**, not a to-do list. A
later phase adds rows here; it does not start a fourth list.

Created 2026-08-25 in Phase 3.6, consolidating `docs/repo-updates-plan.md`
§13.8 (Phase 2, eight items), §15.4 (Phase 3, seven items) and §16.8
(Phase 3.5, ten items), plus `MAINTAINING.md`'s "Known follow-ups" and what
Phase 3.6 itself deferred.

## How to read a row

| Column | Means |
|---|---|
| `id` | Stable. Never renumbered, never reused. A closed row keeps its id. |
| `phase` | The phase that **raised** it, not the phase that will fix it. |
| `file:line` | Where it lives, when it lives somewhere. Line numbers drift; the quoted string in the description is the durable locator. |
| `severity` | **BLOCKING** — a student is marked against something wrong, or a page states a fact the repo's own source contradicts. **MAJOR** — a claim or figure that a reader could repeat and be wrong. **MINOR** — real, bounded, and nothing else leans on it. **HOUSEKEEPING** — no reader is affected. |
| `owner` | **instructor** — needs a decision, a reading of a source, or a curriculum call. **Claude Code** — mechanical once the decision exists. |
| `status` | **open** · **open-upstream** (the fix is not in this repository) · **superseded** (the row's premise stopped being true; kept so it is not re-raised) |

**Owner is not seniority, it is what the work needs.** A row owned by the
instructor is blocked on a judgment nobody else can make. A row owned by Claude
Code is blocked on nothing.

---

## Open

| id | phase | description | file:line | severity | owner | status |
|---|---|---|---|---|---|---|
| DW-001 | 3.6 | `session-3` §03's preset-1 verdict says the 2023 appraisal *"scores 0.0: it shares no scored term with the question it is the answer to"*. It scores **3.318005**, ranks **third of ten**, and appears in the top-4 display. It shares the term *value* with the query. Measured by executing the page's own retriever. | `session-3/index.html:2058` | MAJOR | Claude Code | open |
| DW-002 | 3.6 | The same false figure in the appendix C4 complication: *"the appraisal — scored zero and never appeared"*. | `session-3/index.html:2618` | MAJOR | Claude Code | open |
| DW-003 | 3.6 | The same false figure **inside a scored answer key**: VALOPT option 2 says *"Asked about Meg's CPC shares, it scored 0.0, because it shares no term with the question."* VALOPT is out of scope for Phase 3.6 by explicit constraint, so DW-001 and DW-002 were left alone too rather than putting a contradiction inside one lesson. **Close all three together.** The stronger true version is available and unused: of the four scored query terms, `meg` and `cpc` have df=0 and appear in NO chunk at all. | `session-3/index.html:2215` | **BLOCKING** | instructor | open |
| DW-004 | 3.6 | `session-4`'s compound evidence reasoner offers *Watermark found · No watermark found · Detector errored or unsupported*. The newly retrieved `src-synthid-text` states the detector's own output is three-way — **watermarked, not watermarked, or uncertain**, against two tunable thresholds. A tool error is not the detector's third verdict. The six-cell matrix is a scored key, so this changes what the exercise reveals. | `session-4/index.html:3012`, matrix at `:3027` | MAJOR | instructor | open |
| DW-005 | 3.6 | Ten of `src-synthid`'s eleven references remain unsourced after `src-synthid-text` closed one. C2PA claims (`:1540`, `:1544`); the tournament mechanism, whose real authority is the Nature paper nobody has loaded (`:1553`, `:1568`); image, video and audio robustness, which a text page cannot carry (`:1571`, `:1585`); the adoption paragraph, which carries two chips on one line (`:1588`); the formatter claim (`:1621`); and a sentence sourced to Zhao and three others (`:1628`). Enumerated by line in the `src-synthid` record so the generated queue carries them. | `session-4/index.html`, ten lines | MAJOR | instructor | open |
| DW-006 | 3.6 | `session-4:1588` asserts what *"Google's own current page states"* — a page no build has ever loaded. Marked `[UNCONFIRMED]` with a CLAIM annotation in Phase 3.6; the resolution is to read the page and date the reading, or narrow the sentence to the page that was read. | `session-4/index.html:1588` | MAJOR | instructor | open |
| DW-007 | 3.6 | `session-1` §05's price citation carries `data-src="src-aa"` on a sentence whose source is `src-pricing`. Noticed while re-dating that citation; the chip is a Phase 3 rewiring decision and was not touched. | `session-1/index.html:1883` | MINOR | instructor | open |
| DW-008 | 3.6 | `session-3`'s retrieval margin flags at `marg<12` while the sentence it prints says *"less than an eighth of the winning score"*. An eighth is 12.5%. A margin of 12.3% is less than an eighth and is not flagged. | `session-3/index.html:2085` | MINOR | Claude Code | open |
| DW-009 | 3.6 | `index.html`'s footer says *"UC Berkeley Extension, Fall 2026"*. It is a term label on the offering rather than a deadline, so Phase 3.6's deadline conversion left it. Removing it makes the site's vintage unstated while its 2026 tax parameters, AFRs and exclusion amounts stay 2026-specific. A decision about what the hub claims to be. | `index.html:1108` | MINOR | instructor | open |
| DW-010 | 3.6 | The repository has **no `CLAUDE.md`**. Phase 3.6's brief listed one as required reading and there is none at the root or under `.claude/`. Either the repository conventions live entirely in `MAINTAINING.md` and `EDITORIAL.md` and that is fine, or a `CLAUDE.md` is owed. | — | HOUSEKEEPING | instructor | open |
| DW-011 | 3.5 | `disclose_on_page: true` has no consumer. `inject-sources.mjs`'s `renderEntry()` never emits `rec.scope`, so the synthetic-case disclosure is off all four lesson footers. §16.6(c) states the three options and says DO NOT REVERT. `session-2` is the one the current state is indefensible for: its prose says only *"built on a synthetic case"* and never denies a real-world referent. | `scripts/inject-sources.mjs:77`, `renderEntry()` | MAJOR | instructor | open |
| DW-012 | 3.5 | `session-4` §08's audit exhibit cites *"Buy-Sell Agreement, **Cole Precision Components Inc.**, section 4.2"*. A 2014 instrument cannot carry a name the company did not take until 15 August 2016. The section says two of its six items are designed defects, so this is either a third with no label or drift with a pinpoint locator on it. | `session-4/index.html:1804` | MAJOR | instructor | open |
| DW-013 | 3.5 | `session-3` teaches 3.3% as the grounded hallucination floor and labels it *"Best model, grounded"*. Every per-model rate is still on the live board, but 3.3% now ranks third and the floor is 1.8%. The measurements hold; the superlative is stale. | `session-3/index.html:2146`, `:2277` | MAJOR | instructor | open |
| DW-014 | 3.5 | `EDITORIAL.md` Part A's population is `ALL_LESSONS`, which excludes `index.html`. A16 therefore polices the form of every marker in the five lessons and none on the hub, while the generated register lists all of them. Widening the population is a decision about what `EDITORIAL.md` governs. | `EDITORIAL.md:124`, the `authoredProse` population | MINOR | instructor | open |
| DW-015 | 3.5 | `verify-migration` check 1's grep targets missed two retired framings that survived the v4.0 migration — the bare word *founder* applied to Meg, in three lessons, and *9-year* / *nine-year* applied to the proposed note, in two. Both were corrected by hand; the check still cannot see either. | `scripts/verify-migration.mjs` | MAJOR | Claude Code | open |
| DW-016 | 3.5 | `verify-migration` check 4's conditional-allowance test matches `18,000,000` and not `$18M`, so an abbreviated case figure carrying the wrong label passed it. | `scripts/verify-migration.mjs` | MAJOR | Claude Code | open |
| DW-017 | 3.5 | `index.html:1013` says *"Every tax and legal characterisation attached to this case is posed as a question, not a holding"*, which the injected extract contradicts twelve lines below on the same screen. Instructor-facing and erring toward more verification, so it was flagged rather than changed. | `index.html:1013` | MINOR | instructor | open |
| DW-018 | 3.5 | `src-zhao`'s `last_retrieved` is unresolved. The authors' repository returned the official BibTeX and six indexes corroborate it, but arxiv.org, the NeurIPS proceedings, OpenReview, the ACM DL and Semantic Scholar are all blocked from this build environment. A repository is not the paper and a search index is not a retrieval. | `SOURCES.md`, `src-zhao` | MINOR | instructor | open |
| DW-019 | 3.5 | `src-owasp`'s citation points at what OWASP itself describes as a historical archive. The teaching claim survives — prompt injection is LLM01:2026 in the new edition, published 2026-08-04 — and the `link` field does not. | `SOURCES.md`, `src-owasp` | MAJOR | instructor | open |
| DW-020 | 3 | Eight chips should not be confidence chips at all: a figure-label legend, two of the page's own methodological caveats, a declared assumption, and the chip component reused as a category badge. Changing them moves A15, V4 and `verify-migration` check 18 at once. | `docs/chip-rewiring.md` §4 | MINOR | instructor | open |
| DW-021 | 3 | Five sources are listed by a lesson that never cites them and none is exempt by kind: `src-google-ptcf` and `src-pricing` in `session-2`, `src-finra2409` and `src-secpri` in `session-3`, `src-finra2409` in `session-4`. `src-google-ptcf` is the sharpest — `session-2` §03 teaches Persona-Task-Context-Format and cites its source nowhere. Reported by A15 on every run, at ADVISE. | four footers | MAJOR | instructor | open |
| DW-022 | 3 | `src-aa`'s versioning incoherence, and the livebench-versus-Artificial-Analysis attribution. A later version string carries data identical to an unversioned one and an earlier version string carries different data, so the version is not tracking the data. `grep -rniI livebench` returns 0 repo-wide. Surfaced with evidence both ways at §5.6 and deliberately not resolved. | `docs/repo-updates-plan.md` §5.6 | MAJOR | instructor | open |
| DW-023 | 3 | A15's severity is still ADVISE. Its precondition, `data-nochip`, is met, so promoting it to HARD is now a decision rather than a blocked one. | `scripts/editorial-baseline.json` | MINOR | instructor | open |
| DW-024 | 3 | **55 of 59 records carry an empty `last_verified`**, 3 more are *not applicable* and exactly **one** is populated. That is the measurement, not a backlog: `last_verified` may only be written by a human at a terminal, and no phase may close this row on its own. `docs/source-verification-queue.md` carries the live counts and the queue ordered by reference count. | `SOURCES.md` | MAJOR | instructor | open |
| DW-025 | 3 | Most records carry at least one `[UNVERIFIED, needs source]` field — usually a missing retrieval date or publisher on a source whose identity is not in doubt. `BIBLIOGRAPHY.md` prints every one. | `SOURCES.md` | MINOR | instructor | open |
| DW-026 | 2 | **F5** — two new consecutive-component adjacencies, `session-2` and `session-4`. Re-anchor or re-tag. Curriculum. | — | MINOR | instructor | open |
| DW-027 | 2 | **F6** — `session-2`'s print nondeterminism. Pre-existing and by design; fixing it changes interaction logic. | `session-2/index.html` | MINOR | instructor | open |
| DW-028 | 2 | **A21** — D21 is mechanically checkable and the check is not built. Population is 12 items; §13.2 A is the seed data. A rule firing on the wrong twelve is worse than no rule, which is why it is not built yet. | `scripts/verify-editorial.mjs` | MINOR | Claude Code | open |
| DW-029 | 2 | `validate_lesson.py` **V2** matches any `href`, including a plain `<a href>`, which makes no request. Every footer citation hyperlink is reported as an external request, so a lesson cannot both link its sources and pass V2. **The fix belongs in the skill, not this repository**, and the skill must not be edited from here. | upstream skill | MAJOR | instructor | open-upstream |
| DW-030 | 2 | `validate_lesson.py` **C2** emits an INFO em-dash count over the raw file, so it includes CSS, comments, attributes and the injected span, and misses `—` and `&#8212;` entirely. Its *"policy unratified"* parenthetical is wrong now that D1 ratifies it. Must be corrected or retired upstream before A8 and A9 go hard. | upstream skill | MINOR | instructor | open-upstream |
| DW-031 | — | Self-host the three font families, so a lesson renders with no network request at all. The live console's runtime request is separate and stays: it fires only on a key the reader supplies. | all lessons | MINOR | Claude Code | open |
| DW-032 | — | `docs/spine-brief.md`'s opening paragraph reads *"Nothing here is implemented"*. The spine has been implemented since `93904d7` and lives in a string literal in `scripts/inject-case.mjs`. D17. | `docs/spine-brief.md:3` | HOUSEKEEPING | Claude Code | open |
| DW-041 | 3.6 | **The §07 meeting excerpt presupposes an advisory engagement §A.5 denies.** The excerpt has an Advisor speaking; §A.5 records **no investment adviser of record**, and every lesson assumes an engagement between the Coles and the student's firm. Phase 3.6 moved the excerpt into CASE.md Part O, which does not settle the conflict but puts both statements in one file with the conflict written next to the excerpt. Resolving it means amending §A.5 to record the engagement or rewriting what four lessons assume. | `CASE.md` Part O, the meeting excerpt | **BLOCKING** | instructor | open |
| DW-042 | 3.6 | `session-3` §07's rubric element 5 matches `two years` in its regex, left from when the lesson called the 2023 appraisal two years old. The excerpt and §F.7 both say three. Harmless as an alternation, wrong as a record. | `session-3/index.html:2385` | MINOR | Claude Code | open |
| DW-043 | 3.6 | The `.case-*` layout CSS is still six hand-written copies, one per lesson, and nothing asserts they agree. The viewer's own rules are emitted into the injected span instead, so the two halves of one component are now maintained differently. Either sweep the layout rules into the span too, or add the six-way md5 pairing the console blocks already have. | six lessons, after `/* STYLE:END */` | MINOR | Claude Code | open |
| DW-033 | 3.6 | `docs/repo-updates-plan.md` §14 says *"Three stay open and untouched"* and then names four: the adjacencies, the print nondeterminism, A21 and `validate_lesson` V2. Four rows are carried here (DW-026 through DW-029) because four were named. | `docs/repo-updates-plan.md:2800` | HOUSEKEEPING | Claude Code | open |

## Superseded

Kept so they are not raised again as though new.

| id | phase | description | file:line | severity | owner | status |
|---|---|---|---|---|---|---|
| DW-034 | 3.5 | `session-1` §10 teaches a price rise the vendor has publicly cancelled, on a course dated the night before it was supposed to happen. | `session-1/index.html:1875`, the surviving row | — | — | superseded — closed in Phase 3.6 |
| DW-035 | 3.5 | The `session-3` retrieval corpus's buy-sell chunk describes a right of first refusal with a descendants'-trust carve-out where §F.6 gives a corporate consent gate over every transfer. | `CASE.md` Part O chunk D2, moved there from `session-3` in the same phase | — | — | superseded — closed in Phase 3.6 |
| DW-036 | 3.5 | `src-synthid`: eleven references, no link, no publication date, no retrieval date, no reachable page. | `SOURCES.md` | — | — | superseded — one reference closed by `src-synthid-text`; the remaining ten are DW-005 |
| DW-037 | — | `MAINTAINING.md`'s follow-up list says *"D14 is unanswered."* `EDITORIAL.md` answers it as **D20**, 2026-08-25. | `MAINTAINING.md` | — | — | superseded — the list entry is stale, not the decision |
| DW-038 | — | `MAINTAINING.md`'s follow-up list says *"48 Part A violations stand, pending the D16 burn-in."* `verify-editorial.mjs` reports **0 hard failures and 13 advisory** on the current tree. | `MAINTAINING.md` | — | — | superseded — re-measure before re-raising |
| DW-039 | — | `MAINTAINING.md`'s follow-up list says *"27 of 193 confidence chips resolve to the wrong source."* Phase 3 rewired them; the standing measurement is now A13 and A15 on every run. | `MAINTAINING.md` | — | — | superseded |
| DW-040 | — | `MAINTAINING.md`'s follow-up list says `session-1`'s named discussion block is 17 minutes against a ratified 15. Closed by **DEC-2 / DEC-3**: restored to 15, the two minutes returned to `#s8`. | `MAINTAINING.md` | — | — | superseded |

---

## Adding a row

1. Take the next id. **Never reuse one and never renumber.**
2. Record the phase that **raised** it, so the register reads as history as well
   as as a queue.
3. Quote the string, not only the line number. Line numbers drift on every
   reflow; the string is what someone greps for two phases later.
4. Owner is what the work needs, not who is senior. If it needs a judgment, it
   is the instructor's.
5. A row is **superseded**, never deleted. A deleted row gets re-raised by the
   next person who notices the same thing.
