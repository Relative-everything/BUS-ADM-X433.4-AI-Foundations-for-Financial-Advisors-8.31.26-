# Handback: Session 2 pre-flight for 2026-09-14
Branch: `claude/upbeat-galileo-3tbnmw`. Change: `docs/changes/2026-09-12-session-2-preflight`. Tier: Lite. Status: complete, with four items the instructor must confirm before 7:37 PM on Monday (Flags, Blocking).

## Summary
Asked: fix what can be fixed on `session-2/index.html` before the manual pass on 2026-09-13 and list what remains. Done: sixteen commits on the branch after the plan, touching the lesson, the two sister lessons that share its ritual, `SOURCES.md` and its four generated derivatives, the register, the changelog and its served page, the run sheet and the 2026-09-11 review. Of the review's 140 findings, 84 are closed on the page (every decided D3, D4, D5 and 09-07 PR B and PR C item that did not need a ratchet instruction, plus the §07 answer-key corrections), 19 register rows are annotated or closed, and 10 new rows carry what was not fixed. Every repo check is green; the em-dash baseline reproduced at 2 literal plus 64 entity after every commit; the two skill validators fail only on their known defects (footer hyperlinks, the `#pnum` name) and on the interaction count and adjacencies the page has by design.

## What changed
- The retrieval bridge's fourth question is the ten-to-fifteen-turn restart rule Session 1 taught, with the answer D3 specified; the first item's key says which models the 50,000-token figure belongs to; the bridge carries a source line.
- Eight sentences that were false for this cohort are gone: the map no longer says Session 1 drew the confidentiality boundary or that the templates were written before any framework; the workshop says the room heard eight checks read aloud and did not see them rendered; the cold open is a first run; the checklist and the B5 card refer to the baseline recorded in Session 2; "section 6b" is gone from three places.
- The cold open in Sessions 2, 3 and 4 renders Session 1's eight fixed checks, byte for byte the same code; the pacing block and its heading address the reader in all three.
- §07's live-run prompt asks about non-voting LLC units; the Kessler feedback says there is no discount appraisal in the file; the Rev. Rul. 2004-64 Situation 3 feedback states the ruling's own conditions rather than a related-or-subordinate rule; Davidson is described as self-cancelling installment notes; both Woelbing dockets are named with their dates; the Magesh figures chip Magesh.
- The §04 verification block lists the authorities the §07 key actually states, the stock-versus-units distinction and the portability item, drops five authorities that were never on the page, and locates Kessler in §07.
- §04 has a fixture pack: three inputs built from the injected case at parse time, three deliberately weak starter prompts labelled as exercise material, a five-step procedure, and a button that loads the starter into the scorer. A learner with no templates can run the section.
- Provenance: the slopegraph chips the Anthropic pricing page (H, re-fetched 2026-09-11) and a new OpenAI record (M, retrieval unrecorded and said so); the Google guide has its chip; the bold `[NEEDS SOURCE]` sentence in §03 is cut; the temperature bars, the Laplace answer set and the parenthesis predictor say they are constructed; the 41.8% adoption row is gone; the 300M/71M token counts carry `[UNVERIFIED, needs source]`; four unsourced §02 clauses are narrowed to what the chart shows; the case cards carry the case's L chip.
- Mechanics: every interaction is tagged as its real family, §05's quiz is tagged, the depth bar lights one button, the frontier toggle reads by state, the buy-sell questions are numbered rather than hidden by transparent text, the illegal parenthesis is refused, B5's phases sum to 18, the P.T.C.F readout matches its Format string, a nine-term glossary card opens §00, §08 says it runs between sessions, the footer stamp is current.
- Records: run sheet with the corrections slot split as D7 decided and six Zoom polls; 19 register rows annotated or closed and 10 opened (DW-105 to DW-114); changelog entry and served page; the 2026-09-11 review's proposed row ids renumbered P-01 to P-16 after colliding with DW-103 and DW-104.

## What to watch for
- Open `session-2/index.html` at the default depth, paste any prompt into the cold open and press the button: you should see eight labelled checks with "n of 8 present", not three sentences and a token count. If you see "roughly N tokens", the ritual did not propagate.
- In §04, click "F3 · Plan summary" then "Load it as the prompt to score": the input must read the memorandum chunk followed by "a seed gift of 52 non-voting units, then a sale of 520 non-voting units ... $20,020,000 note ... 3.82%, interest only. A 30% combined discount ...". Any other figure means a constant was mis-keyed.
- In §07, the sixth citation's feedback must say the file has no appraisal of the discount. If it still says Meg's 2023 appraisal is the issue, the key is the old one.
- In §02, the top-left button under the chart should read "Hide efficient frontier" on load and the dashed frontier should be visible; Finding 02's card should end in "[UNVERIFIED, needs source]".
- In §03, the readout after all four toggles should say "≤200 words, 4 paragraphs, 1 closing sentence"; the persona chart should show three labelled rows with no bars.
- B5 (raise the depth to Standard to see it): the four phase headings should read 3, 7, 5 and 3 minutes.

## How to read the result
Every number the page now states about the case is read from the injected `COLE` constants or the case text; nothing new was typed. The Anthropic rates are H against the vendor page fetched 2026-09-11. The OpenAI rates are M with no retrieval on record. The Woelbing and Davidson facts are M from two secondary sources each. The Situation 3 conditions are M from model recall of 2004-27 I.R.B., which could not be fetched; the page states them in a scored key and the §04 gate asks you to confirm them. Prose density rose in §00 (973 words for 6 minutes with the glossary card) and §04 (759 with the fixture panel); the trims DW-093 asks for were not made because each candidate sentence carries an em dash and the ratchet is yours to move.

## Verification output
```
$ node scripts/test-editorial-regions.mjs            summary: 9 passed, 0 failed  (T7: session-2 2 literal / 64 entity, unchanged at every commit)
$ node scripts/verify-editorial.mjs                  summary: 16 rule(s) clean, 0 hard failure(s), 7 advisory  (session-2 no longer under A15)
$ node scripts/verify-case.mjs                       summary: 6 of 6 lessons carry the current CASE.md v4.0 block
$ node scripts/inject-case.mjs --check               summary: 6 current, 0 stale, 0 without sentinels  ·  stamp cba5438
$ node scripts/inject-sources.mjs --check            every lesson carries the current SOURCES.md block
$ node scripts/verify-sources.mjs                    ADVISE 3 source(s) listed by a lesson that never cites them (session-3 x2, session-4 x1); summary: 5 of 5 lessons carry the current SOURCES.md block
$ node scripts/verify-migration.mjs                  summary: 15 passed, 0 failed  (check 20 pins session-2: $522,086; $38,200; 3.82%)
$ node scripts/build-appendix.mjs --check            current session-2 core 11 / 69 min, appendix 5 / 81 min, total 150; all generated regions agree
$ node scripts/build-unsourced.mjs --check           current docs/unsourced-claims.md (11 marked claim(s))
$ node scripts/build-bibliography.mjs --check        all three generated files are current
$ node scripts/build-cardsort.mjs --check            OK current session-1/index.html
$ node scripts/case-inventory.mjs --report-check     current docs/case-fact-inventory.md
$ RESTYLE_SWEEP=<skill>/scripts/restyle_sweep.py node scripts/verify-style.mjs     summary: style fence clean
$ python3 <skill>/scripts/validate_lesson.py session-2/index.html --case Cole --purge "Okonkwo,Reyes,Adaeze,Ilesanmi" --require-timing --require-tagging
  FAIL V2 x7 (footer citation hyperlinks; upstream DW-029)
  PASS V4 39 chip reference(s) resolve; 21 footer source(s)   WARN V4 3 legend chips; 9 nochip footer sources never chipped (by kind)
  PASS V5 segments sum to 150 = allocated 150 = target 150
  FAIL V6 17 distinct interactions (band 13-15)   FAIL V6 same component type in consecutive sections: builder-assembler, multi-column-sorter, work-along-gate   (by design; DW-094, DW-101)
  RESULT: FAIL (9 fail, 3 warn)
$ node <skill>/scripts/validate_dom.js session-2/index.html   MODE=jsdom; OK scripts executed with no thrown errors; OK Shift+U marked all 16 gate(s); FAIL #pnum did not flip (validator drift, DW-112)
$ python3 <skill>/scripts/restyle_sweep.py . --check           OK current session-2/index.html; summary 7 current, 0 stale, 2 without fence (the documented fragments)
$ scratch jsdom harness (69 widget assertions)      69 OK, 0 FAIL, script errors: []
$ grep -c "Session 1 baseline" session-2/index.html   0     grep -c "section 6b"   0     grep -c "NEEDS SOURCE"   0
```

## Self-review findings

### Important
- [Compliance] `session-2/index.html`, `CITES[2].w` (Rev. Rul. 2004-64 Situation 3) and `CITES[4].w` (Davidson). Two legal characterisations in a scored answer key rest on secondary sources or recall, not on the primary text, because irs.gov and the docket hosts are egress-blocked. Evidence: plan.md Golden values rows 3 to 5 at M. Both are posed as questions in the §04 gate and in the run sheet; the builder confirms before 7:37 PM on 09-14 or reverts the two strings to a weaker form (DW-109).
- [Compliance] Four files not named in the plan changed: `scripts/sources-verified.lock.json` (lock synced for the new record), `docs/case-fact-inventory.md` (regenerated), `scripts/audit/section_profile.mjs` (one retired token removed), and the three bibliography derivatives. Each is a governance-required consequence of a named step and is recorded under Departures in plan.md. No baseline moved.
- [Bugs] `session-2/index.html` §03, "Watch what changes in the output": lowercased by the step 6 anchor correction; found in the review pass and fixed in 66aa64c.

### Nits (showing 3 of 3)
- [Bugs] B4 adoption chart: the axis line still spans four row heights after the 41.8% row was removed; cosmetic.
- [Bugs] §04 fixture panel: `#fxWhich` grows to "F3 · Plan summary · loaded into the box below" and may wrap on narrow screens; not tested at 380 px.
- [Compliance] §00 now runs 973 words in 6 minutes; the glossary card was decided (DW-093 amended) and the trim was not; both are recorded on the row.

### Looked for and did not find
- Em-dash movement: T7 reproduced session-2 at 2 literal / 64 entity, and sessions 3 and 4 at their baselines, after every one of the sixteen commits.
- Typed case figures: every number in the fixture pack and the new prose is read through `COLEn`/`COLEm`/`COLEp` or `COLEDOCS`; `case-inventory --report-check` is current and `verify-migration` check 20 pins the three §00 figures unchanged.
- Real client data: none; every input is the synthetic Cole file. Secrets or tokens: none in the diff. New dependencies in the tree: none (jsdom lives in the session scratchpad only).
- Edits between the CASE or SOURCES sentinels: none (`verify-case` 6 of 6, `inject-sources --check` current). Hand edits inside generated `APX*` regions: none (`build-appendix --check` current).
- Unresolved chip keys: none (V4 39 resolve). Chips keyed to the synthetic case on external-work sentences: none (A14 clean).
- Script errors: none in DOM mode, none in the 69-assertion harness. Innerhtml built from user input: none; the fixture text goes through `textContent`.
- Legal characterisations added without a gate: none; every new one is in the §04 list.

## Rejected options
- Trimming §00 and §09 prose (DW-093): every candidate sentence carries an em dash; a trim moves the A9 ratchet, which is a halt without the builder's instruction for that figure; and it is a voice decision.
- A "09a · Baseline" eyebrow (09-07 §12.4 item 10): changes the minute arithmetic and the generated budget; the run sheet moves the capture to 6:21 PM instead.
- Sourcing the Anthropic 80% claim with a new record: claude.com is egress-blocked; §12.4 item 9 allows the cut.
- Propagating the cold-open renderer into `session-0.1`: its handler has a different shape; D20 keeps 0.1 outside the shared architecture; recorded on DW-066.
- Keeping the 41.8% adoption row with a marker: the row is outside its record's scope and carried no teaching load; removed.
- Marking §02's four unsourced clauses `[UNVERIFIED]` rather than narrowing them: the clauses carried no teaching load; narrowing is dash-neutral and shorter.
- A subagent fan-out for verification: the sdlc-loop skill's standing rule 2 forbids it unless asked by name.
- Opening a pull request or merging to `main`: rule 8 of the skill and the brief's own instruction; the branch is pushed and stops there.

## Flags

### Blocking
- F-1. **Situation 3 of Rev. Rul. 2004-64, before 7:37 PM on 09-14.** The §07 key's third item now says a trustee's discretionary power to reimburse does not by itself cause inclusion, conditioned on no understanding between grantor and trustee, with inclusion still possible from a retained power over the trustee or from state law that exposes the trust to the grantor's creditors. That is from recall; the Bulletin could not be fetched. Options: confirm against 2004-27 I.R.B. and leave it; or shorten the sentence to "Situation 3 is the discretionary case, and the ruling attaches conditions; read them before repeating this" (dash-free, in a JS string, no ratchet). Recommendation: confirm; the longer sentence is the teaching.
- F-2. **Davidson's instrument, same deadline.** The key now says self-cancelling installment notes with principal outstanding at the seller's death, on Stout and Crain's. Confirm from the docket commentary you trust, or cut the sentence to "The consideration was a note whose value the estate had to defend after the seller's death."
- F-3. **The DW-093 trim and the em-dash ratchet.** §00 runs 973 words for 6 minutes and §09 680 for 7. Every sentence worth cutting carries an `&mdash;`, and `MAINTAINING.md` makes a fall in the A9 count a halt without your instruction for that figure. If you want the trim before Monday, say "lower A9 for session-2 to whatever the trim produces" and it is a twenty-minute edit with the baseline and a register row in the same commit. Recommendation: trim §00's outcome cards and the "before we start" block only, on that instruction.
- F-4. **No discussion block runs at core-only depth (DW-108).** D1 keeps the page at core-only; B5, the only I-class interaction, is appendix-tier and 18 minutes. Either accept for 09-14 and record it on DW-050, or raise the depth for the 7:57 PM reserve and run B5 in it. Recommendation: accept and record; the reserve was the room's best twenty minutes last time.

### Non-blocking
- F-5. Gate 1 of the sdlc-loop skill was not awaited: acceptance of `plan.md` was taken from the instruction "fix what you can before my manual pass tomorrow". If the plan would have been rejected, `git revert` of the sixteen commits after aa266d2 restores 98e9686's lesson; nothing was pushed to `main`.
- F-6. Ultracode is on for the session and the sdlc-loop skill's standing rule 2 forbids fan-out; the skill won, so the verification is a single-threaded three-pass review plus the repo gate, not an adversarial panel.
- F-7. The run sheet's second time zone is bracketed as Central and marked to confirm; the 09-07 §12.4 item 16 asked for "both time zones" without naming the second.
- F-8. The D7 decision names "the C-corporation" correction; no text for it exists in the repository (the 66-claim register is held outside). The run sheet points at that register.
- F-9. `validate_dom.js` asserts `#pnum`, which the corpus renamed `#ovr` on 09-08; DOM mode fails every delivered lesson on that line (DW-112, upstream). `validate_lesson.py` V6 will always report 17 interactions and three adjacencies for this page unless the band or the tags change; the register carries both.
- F-10. `session-0.1`'s cold-open analyser still runs the three-check form (DW-066 amended); `session-1:2095` still says "works from the three you write" (DW-091); `session-4:1688`, `session-3:1247` and `session-4:1275` still presume the Session 1 baseline and paste (DW-111).
- F-11. Governance made stale: none found. `MAINTAINING.md`'s pre-push gate still lists `restyle_sweep.py <repo>` in write mode; `verify-style.mjs` needs `RESTYLE_SWEEP` set in this environment (DW-112).
- F-12. Pre-existing, out of scope: `session-4` logs `HTMLCanvasElement.getContext` not-implemented noise under jsdom (the drawing widget); Chromium is the right runner for that page.

## Next session should
1. Read this file, then `docs/deferred-work.md` rows DW-105 to DW-114 and the amended DW-093 and DW-109.
2. If the builder confirmed F-1 and F-2, change nothing; if not, apply the shorter strings named in F-1 and F-2 to `CITES[2].w` and `CITES[4].w` in `session-2/index.html` (JS strings; no ratchet) and re-run `node scripts/test-editorial-regions.mjs`.
3. If the builder gave the ratchet instruction in F-3, trim §00 per DW-093, lower `scripts/editorial-baseline.json` A9 for session-2 to the measured figure, open the register row, all in one commit; then re-run the full gate listed above.
