# Ledger: worker "sources" (DW-173, DW-175, DW-176, DW-178, DW-181)

Files edited: `SOURCES.md`, `facts/FACTS.json`. No HTML, no instructor note, no script, no lock file, no `last_verified`, no `last_retrieved` moved (this container has no egress; the one `last_retrieved` written is the 2026-10-11 value copied from FACTS `gemini-plans`). No writer script was run; the lock-free parse below stands in for `build-sources` until the orchestrator syncs the lock.

## Edits

| File | What | Row |
|---|---|---|
| `SOURCES.md` | Deleted ten records with zero references anywhere (served pages, `instructor-notes/*.md` and `*.htm`, `CASE.md`, `facts/FACTS.json`, searched by key and by distinctive title or figure): `src-anthropic-aup`, `src-uk-voice`, `src-sg-deepfake-2025`, `src-ferrari`, `src-fbi-ic3-2024`, `src-forcedleak`, `src-safebreach-gemini`, `src-nikkei-papers`, `src-state-breach`, `src-uber-doj`. None had a `used_for` line, so no footer changes. Recoverable from git (HEAD before this pass). D-034. | DW-173 |
| `SOURCES.md` | KEPT `src-equifax` and `src-capitalone`: their dates and figures are in `instructor-notes/session-4-teaching-aid.md:98` and `.htm:177` ("Off the page, optional ... the page no longer carries them"). Notes carry no `data-src` chips, so there is no chip to place; the instructor decides delete (D-034) or convert to `kind: background` with a note. | DW-173 |
| `SOURCES.md` | KEPT `src-il-retirement-subtraction` (authority). Zero chips is by design for the kind (A15 `data-nochip`); `deriveUsage` counts only `data-src` and misses nothing. The statute is cited in text at `session-2/index.html:1335` and `:3299` and `cases/case-2.html:1126`, `:1166`, `:1184`, `:1269`, `:1343`, `:1495`. The chip is missing at `cases/case-2.html:1184`, where the sibling authority rows (B, D) carry one; see Chip placements. | DW-173 |
| `SOURCES.md` | Added `src-gemini-plans` after `src-claude-pricing`, same field order (title, author, publisher, link, published, last_retrieved, last_verified, retrieval_note, confidence, kind, moving_target, figure_class, recheck_before, scope, used_for.X, last_retrieved.X, figures.X). kind evidence, confidence M (D-015), moving_target true, figure_class vendor_pricing, last_retrieved 2026-10-11 copied from FACTS `gemini-plans` with the retrieval note saying it was a real retrieval that day through primary-domain listings (host unreachable), `used_for.session-1` (Appendix A7) and `used_for.case-4` (vendor table). Rendered footer entry checked: no em or en dash. | DW-181 |
| `SOURCES.md` | Relabelled 46 `recheck_before:` / `content_changed:` section references for sessions 1 to 5 from the pre-2026-10-12 numbering to the current labels (mapping taken from `git show f13d57f` and `c94d0c3` section ids and eyebrows against the current pages, not from memory). Mechanical: session-1 §03 to Appendix A2, §05 to Appendix A7, §06 to Appendix A8; session-2 §01 to Appendix B4, §02 to Appendix B8, §05 (Phase 5 era) to Appendix B9, §07 and `§s10` to §05; session-3 Appendix C3 to Appendix C7, §09b to Appendix C9; session-4 §01 to §02, §03 to Appendix D2, §04 to Appendix D3, §05 to Appendix D4, §07 to §05, §09 to §07, Appendix D1/D2 to D8/D9, Appendix D3 to D6; session-5 §01 to §02. Judgment calls listed below. | DW-178 |
| `facts/FACTS.json` | Added `aa-frontier-scatter-2026-07` (session-1 Appendix A7 `MODELS`, 8 models, index and $/task; retrieved 2026-07-28 per `src-aa` `last_retrieved.session-1`; M; high; each-session). | DW-175 |
| `facts/FACTS.json` | Added `aa-cost-frontier-2026-08` (session-2 Appendix B8 `MODELS` at :2384, 7 models, Index v4.1.1 and $/task; M; high; each-session). `retrieved` is 2026-08-01: `src-aa` holds the PARTIAL date 2026-08 and the schema needs a full date, so the record stands at the earliest possible day, MAINTAINING's declared reading convention; the notes field says so and asks for the real day at the next re-pull. | DW-175 |
| `facts/FACTS.json` | Added `openai-api-rates-gpt-5-6` (Sol $5/$30, Terra $2.50/$15, Luna $1/$6 per MTok, from the `MODELS` i/o fields and the B8 source lines; M; high; each-session). `retrieved` 2026-08-01 by the same partial-date convention: the page says "retrieved August 2026" and `src-openai-pricing` records no retrieval. | DW-176 |
| `facts/FACTS.json` | Added `eu-ai-act-article-50` (in force August 2024; Article 50 applies from 2 August 2026; binds EU-market providers and EU deployers, not a US adviser; retrieved 2026-09-27, the date `src-eu-ai-act` records its corroboration; M; medium; term-start). The rule key's "tools already on the market by 2 Dec 2026" is NOT carried: no source record states it and `src-claude-marks` records the Claude help page withdrawing that date. | DW-176 |
| `facts/FACTS.json` | NOT added, (5) state-law breach day counts: no served page or instructor note carries them any more (grep for Colorado, Florida, Washington, Maryland, Texas, 45 days, 60 days, 50-state across `session-4/index.html`, `cases/case-4.html`, `instructor-notes/session-4*`); `cases/case-4.html:1468` only says "whether state law adds a clock". A record nothing cites would be noise; `src-state-breach` went with DW-173. | DW-176 |
| `facts/FACTS.json` | NOT added, (6) retention-toggle default: FACTS `claude-consumer-retention` already covers the retention values and records the default as not stated (GAP). Finding for the instructor: `session-4/index.html:3881` ("Personal plans start with the switch on at all four: Claude's training switch", chip `src-anthropic-terms` H) and `:7585` ("The default is on unless you opted out at signup", the Claude lock card) do state a default, while `src-anthropic-terms` `figures.session-0.1` says "no default stated" and `instructor-notes/session-4.md:52` says to state none. Verify or soften the week before Session 4 (Wave 5). | DW-176 |

Every record notes field says it was created 2026-10-27 from the page and SOURCES.md without a fresh fetch. Each has `applies_to` and `retired_values: []`.

## DW-178 judgment calls (relabelled, with the reason)

- `src-pricing` content_changed "session-1 §10's second Sonnet 5 table row": "§10" was the section id `s10`, not a number. At `c94d0c3` (2026-08-25) that table sat at line 1480 inside `<section id="s10">`, then labelled §05 Capability against price; now Appendix A7. Relabelled to Appendix A7.
- `src-owasp` content_changed "session-4 §05's claim that prompt injection is LLM01": 2026-08-25 §05 was `s5` Threat model, now Appendix D4. Relabelled; the LLM01 sentence itself left the page in the 2026-09-25 rebuild.
- `src-vectara` recheck "session-3 §05" to "§03": the HALL chart (`figHall`, session-3:1376) sits in `s6`, now §03. The mechanical map of the 2026-09-18 §05 (`s7`) would give Appendix C4, which does not hold the chart.
- `src-regsp-guide` recheck "session-4 §04" to "§04 and Appendix D3": the Phase 5 era §04 was `s4` (now Appendix D3, 3 chips); the main citing section is `sRSP`, now §04 (6 chips). Both named.
- `src-context-windows` recheck "session-2 §00" to "s0, the retrieval bridge (unnumbered)": the bridge carries no § or Appendix label.
- `src-kitces-advisortech` is `kind: background`; only its recheck label changed (Appendix C3 to C7).

## Left as written (not mappable with confidence, or not a section label)

- `src-owasp` recheck_before "no lesson cites this record since the 2026-09-25 session-4 rebuild": not a section label, but factually stale; session-4 cites it twice (:8296, :8297, in the JS template the static scan attributes to `sCR`).
- `src-vectara` content_changed cites session-3 line numbers (":2010", ":2139") that have moved; lines, not sections.
- Session-0.1 recheck lines and the "Session 5" / "the start of each term" / "the week before the session that assigns it" lines carry no section.

## Chip placements for the orchestrator (no HTML edited here)

1. `session-1/index.html:1875` Gemini row: `<span class="conf m" data-fact="gemini-plans">M</span>` becomes `<span class="conf m" data-src="src-gemini-plans" data-fact="gemini-plans">M</span>`. (DW-181)
2. `cases/case-4.html:1582` `gem:'<span class="conf m" data-fact="gemini-plans">M</span>',` gains `data-src="src-gemini-plans"`. It is a JS template after the footer; the DW-179 change to `deriveUsage` now bounds the footer by the SOURCES sentinels, so the chip should count. (DW-181)
3. `session-1/index.html:1886` the `<span class="conf m" data-src="src-aa">M</span>` after "scatter data pulled 17 and 24 July 2026." gains `data-fact="aa-frontier-scatter-2026-07"`. (DW-175)
4. `session-2/index.html:1701` the first `<span class="conf h" data-src="src-aa">H</span>` (after "Index scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5") gains `data-fact="aa-cost-frontier-2026-08"`. Note that chip reads H against `src-aa` confidence M; pre-existing, not touched. (DW-175)
5. `session-2/index.html:1715` `<span class="conf m" data-src="src-openai-pricing">M</span>` gains `data-fact="openai-api-rates-gpt-5-6"`. (DW-176)
6. `session-4/index.html:4409` `<span class="conf m" data-src="src-eu-ai-act">M</span>` gains `data-fact="eu-ai-act-article-50"`; `instructor-notes/session-4-rule-key.md:94-95` item 9 gains `(M, FACTS:eu-ai-act-article-50)` in the form the other items use (line 78), with the `.htm` mirror at :216 and the PDF re-render; the item's "by 2 Dec 2026" has no source and should go. (DW-176)
7. `cases/case-2.html:1184` the `<td class="lnk">None yet: the source list holds no record for the Illinois subtraction</td>` cell is stale since D-052: give it row B's shape, `<a class="inl" href="https://www.ilga.gov/legislation/ilcs/fulltext.asp?DocName=003500050K203" ...>` plus `<span class="conf m" data-src="src-il-retirement-subtraction">M</span>`, and reword the Basis cell's "With no primary-source link on file ..." sentence and the "to the case file only" sub-note (and the matching JS text at :1495). The authority kind needs no chip elsewhere. (DW-173)

Until 1 and 2 land, `verify-sources` will print two ADVISE lines (`src-gemini-plans` declared by session-1 and case-4, not cited) and `build-sources` lists it among the no-chip records; until 3 to 6 land, `verify-facts --report` lists the four new ids as "never cited" (info, not a failure; rule (c) stays clean).

## What the orchestrator must run, in order

1. `node scripts/attest-verified.mjs --sync` (no TTY needed; adopts `src-gemini-plans`, drops the ten deleted keys; every affected `last_verified` is empty so it refuses nothing). Until then `build-sources`, `inject-sources`, `build-bibliography` and `verify-sources` all stop at "The lock does not know about every record yet" (0 moved, 11 unsynced, confirmed with `assertVerifiedLock(..., {explain:true})`).
2. `node scripts/inject-sources.mjs` (session-1 and case-4 footers gain the Gemini entry; the other nine pages are unchanged by these edits).
3. `node scripts/build-bibliography.mjs` (BIBLIOGRAPHY.md, DATA-PULL.md, docs/source-verification-queue.md: 156 records; moving targets 75 minus 2 deleted plus `src-gemini-plans`, 74).
4. `node facts/build-facts-md.mjs` (48 records).
5. `node scripts/verify-sources.mjs` and `node scripts/verify-facts.mjs`, then `verify-browser` after the chips.

## Register notes (docs/deferred-work.md is not mine to edit)

- DW-173's 2026-10-27 audit says the six Fall Session 0.1 records are "already gone"; `src-beta`, `src-ctxwindow`, `src-features`, `src-plugins`, `src-routing`, `src-skills` are present as `evidence` with zero references, as are `src-vectara`, `src-zhao`, `src-gartner`, `src-surfshark`. Not in this brief; left.
- Lock-free parse after the edits: 156 records (165 minus 10 plus 1), 0 dangling chips, 19 no-chip records (was 28).

## Check output (last lines)

- `node scripts/build-sources.mjs --check`: exit 1, "The lock does not know about every record yet" (expected until `--sync`; see above).
- `node scripts/verify-sources.mjs --check`: exit 1, the same lock message (expected until `--sync`).
- `node scripts/verify-facts.mjs --report`: `summary: clean (--report: exit 0); 13 high-volatility record(s) past their window, advisory until --as-of or --session names the ritual` (10 before; the 3 new high-volatility records are dated July and August 2026 by design). `OK (c) every cited FACTS id exists`; 4 records never cited (the new ones, until the chips land).
- `node facts/build-facts-md.mjs --check`: `STALE facts/FACTS.md (run node facts/build-facts-md.mjs)`, exit 1, as expected after adding records.
- `node scripts/verify-editorial.mjs`: `summary: 17 rule(s) clean, 0 hard failure(s), 1 advisory`
- `node scripts/test-editorial-regions.mjs`: `summary: 9 passed, 0 failed`
- `node scripts/verify-migration.mjs`: `summary: 16 passed, 0 failed`
- `node scripts/verify-case.mjs`: exit 0 (layout and artwork lines clean)
- `node docs/next-term/checks.mjs`: `summary: 0 failure(s)`
- Not run (no HTML touched): `test-case-viewer`, `test_live_console`, `verify-browser`.
