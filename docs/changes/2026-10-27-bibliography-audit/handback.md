# Handback: bibliography audit applied
Branch: `ccr-ef57ff7a-gwm5uh`. Change: `docs/changes/2026-10-27-bibliography-audit/`. Tier: Lite. Status: complete.

## Summary
The instruction was a comprehensive update of the bibliography, every record except the locked Wolfram essay: delete anything hallucinated first, then find the best two alternatives for every remaining source and return for approval. 142 of the 146 SOURCES.md records were checked against live pages on 2026-10-27 (the synthetic case and the two deliberately fabricated citations are exempt by design); none is hallucinated and none was deleted for cause. Jared approved all recommendations the same day, with GAP figures left in place and `last_retrieved` moved only on fetched pages. Six commits landed: 135 records corrected or annotated, four records replaced, two duplicates retired, one FACTS record added, eight served-page sentences reworded, six register rows and seven decisions. Every in-repo check exits 0 on the final tree.

## What changed
- Every record except the four exempt ones carries a dated `Audit 2026-10-27` line in `retrieval_note` saying how it was checked (fetched in full, or confirmed by publisher-domain search) and what the check found; 42 Anthropic records that were fetched in full carry `last_retrieved: 2026-10-27`.
- Titles, authors, publishers, links and dates corrected on 91 records, including published journal versions for Magesh (JELS 22(2) 216-242), Dahl (JLA 16(1) 64-93) and Dell'Acqua (Organization Science, March 2026), the Federal Register document for the Regulation S-P release, the MSRC advisory for EchoLeak, the Deloitte primary report, and canonical URLs for ten records that had none.
- The temperature rule is cited to the Model deprecations page's API parameter deprecations table in Sessions 1, 2 and 4; the two records that no longer carry the rule are gone; a new record documents the 2026-10-21 API version that removed the parameter, which is why the Session 1 console pins 2023-06-01 (the console code already did; nothing inside the console fences changed).
- The ISS advisor survey is cited to ISS Market Intelligence's own page, and the FACTS record with it; OWASP is cited to the 2026 editions.
- API retention: a new FACTS record from the fetched platform page; Sessions 1 and 4 no longer say a Claude API key keeps what you send for 30 days. They say content is not retained by default, 30 days on the newest models. Appendix D2's business-plan bullet no longer attributes a 30-day retention to the Commercial Terms, and the vendor grid's Team and Enterprise cell now reads "in the contract", as the ChatGPT and Copilot cells already did.
- Session 4: the $35 million voice-clone bar names a Japanese company's branch manager (Forbes' wording) rather than a UAE bank; the Copilot training setting is named as Microsoft names it; the memory flip card also cites the help article that carries the topics claim.
- Three chips rise from M to H where two or more independent sources agree (the SEC enforcement release, the SEC withdrawal release, the SDK browser-access header).
- Supplements for 21 records are recorded as dated lines naming the better companion source, not as new records.

## What to watch for
- Open Session 1's live console note and Session 4's Live API box. Both should read that a Claude key retains nothing by default, 30 days on the newest models. If either still says "30 days" without the qualifier, the FACTS record `claude-api-retention` is not wired.
- In Session 4 Appendix D2, the vendor grid's Claude row: the Team and Enterprise cell should read IN THE CONTRACT and the API cell NONE BY DEFAULT. A 30 DAYS label in either is the old text.
- In Session 1 Appendix A6, run the temperature panel with a Claude key. It should still route to a 4.6-or-earlier model and succeed; a 400 on every model would mean the API version pin was lost (it was not touched, so this is a sanity check only).
- The Session 4 D4 bill: the second bar's label should name a Japanese company's branch, 2020. If an examiner asks, the UAE is the investigating jurisdiction, not the victim's employer.
- Figures the audit could not confirm are unchanged on the pages and listed in DW-198 to DW-203; none of them is in Sessions 1, 2 or 4's edited sentences.

## How to read the result
The audit's tags: H means the page was fetched and read, or two or more independent results agree on the specifics; M means one credible result or a search-only confirmation; GAP means no result confirmed the figure, with the closing action in the register. 96 non-Anthropic records were confirmed by search only, which proves existence and metadata but not that the page still says what the scope attributes; their `last_retrieved` did not move for that reason. `last_verified` was not written anywhere and stays the instructor's.

## Verification output
Every command from MAINTAINING's gate, sequential on the final tree, `NODE_PATH=$(npm root -g)` and `LESSON_BUILDER_SKILL` pointing at the installed skill:
```
build-case, inject-case --check, build-cardsort --check, build-appendix --check,
build-readings --check, build-sources --check, build-unsourced --check,
case-inventory --report-check, facts/build-facts-md --check, verify-case,
verify-migration, verify-sources --check, verify-facts, verify-editorial,
test-editorial-regions, test-case-viewer, verify-style, verify-stamps,
test_live_console.js (137 passed, 0 failed), verify-browser,
build-bibliography --check, docs/next-term/checks.mjs (0 failures): all exit 0
```
Standing advisories, unchanged: `verify-facts` prints 13 high-volatility records past their window (by design between terms); `verify-editorial` prints its one A12 advisory on Session 1's Wolfram quotation. Reds caught and fixed before each commit: a purge-list hit on "8 October 2025" in an audit note (step 2); one chip on the merged key in the flip deck (step 3); check 18 on a chip with no footer entry (step 5).

## Self-review findings
### Important
None.

### Nits (showing 3 of 3)
- [Compliance] `session-4/index.html` vendor grid: the Team and Enterprise cell changed from a one-month square to the contract square (`sq:-1`), which moves one square on the rendered calendar. Intended, and the same value the ChatGPT and Copilot rows use; recorded here because it is a rendering change, not only words.
- [Compliance] `SOURCES.md`: `src-kalai`'s `last_retrieved` was set back to unverified because the recorded date predated the paper; `verify-sources` accepts it (the record is not a moving target).
- [Bugs] `facts/FACTS.json`: the three `retired_values` strings for `claude-api-retention` are scanned across served pages and instructor notes; `verify-facts` (a) is clean today, and a future note quoting the old sentence would trip it, which is the intended behaviour.

### Looked for and did not find
- A new em dash in any edited prose (D1): the six dash-bearing added lines are pre-existing note text and generated footer headers; A9 is clean.
- A chip whose key no record defines, or a footer entry with no chip: `verify-sources`, A15 and check 18 are clean.
- A secret, a real client datum, or a URL not returned by a fetch or a search in the diff.
- A write to `last_verified` or to the lock other than `--sync` for records that assert nothing.
- An edit inside a generated fence other than through its generator; the two console-box sentences are hand-managed prose and the fence versions are unchanged (D-097).

## Rejected options
- 21 supplement records: A15 orphans, the class D-084 deleted the same day (D-093).
- Renaming the replaced keys: three lessons' chips would change for no reader benefit.
- Editing the console fences for the API version: already pinned to 2023-06-01 in both lessons.
- Merging `src-models` with `src-anthropic-models-overview`: the second is cited only by Session 5, outside the pass (D-095).
- Raising five more records to H: their chips are in Sessions 3 or 5 (D-096).
- Bumping the box fences to v3 for a prose edit (D-097).

## Flags
### Blocking
None.

### Non-blocking
- `MAINTAINING.md` names the Messages API reference nowhere, but EDITORIAL.md A15's prose example still lists `src-owasp` among keys with no chip; that sentence is history and unchanged. The console section's statement that `LMBOX v2` is kept byte-identical across lessons has described one lesson since Session 0.1 dropped the box; not edited here.
- `docs/next-term/readings.json` carries each reading card's confidence chip; `src-anthropic-prompting-101` could rise to M there and in SOURCES.md together (D-096).
- Session 5's Brynjolfsson and Morningstar sentences, Session 3's 43 percent figure and Session 0.1's directory wording are outside this pass and rowed (DW-198, DW-202) or noted on the records (`src-directory`, `src-personalization`).
- Generated files outside the plan's list were rewritten by their generators and committed: `docs/case-fact-inventory.md`, `facts/FACTS.md`, and the footers of `session-0.1`, `session-3`, `session-5` and `cases/*.html` (every lesson's footer is rebuilt from SOURCES.md).
- The review artifact at claude.ai/artifact/7nnFtbhPhbmVXPkRgifeBP keeps the full per-record evidence with Approve, Deny and Defer controls; the decision store was not used because the instruction was to apply everything.

## Next session should
1. Read this file, then `docs/deferred-work.md` rows DW-198 to DW-203, and close the ones a browser can close in the week-before re-pull.
2. Open Sessions 1 and 4 at the two retention sentences and the Session 4 vendor grid (What to watch for above).
3. When Session 5 is next touched, decide DW-202 (NBER or QJE figures) and apply the four confidence raises noted on `src-cfp-psychology`, `src-noy-zhang`, `src-pew-ai-summaries` and `src-t3-survey`.
