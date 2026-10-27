# Plan: bibliography audit applied
From: direct request. Date: 2026-10-27. Tier: Lite.
Status: accepted.

Instruction: a comprehensive update of the bibliography, every record except `src-wolfram`
(locked); delete hallucinated sources first; then, for each remaining source, the best two
alternatives; recommendations approved by the instructor on 2026-10-27 as "apply all
recommended changes", GAP figures left in place with a register row each, `last_retrieved`
advanced only on pages fetched in full.

## Reads
- `CLAUDE.md`, `PEDAGOGY.md` §0 to §1, `EDITORIAL.md` A13, A15, B5: chips must match the named source in order; every footer key needs a chip or a `kind` reason; D1 no new em dashes.
- `MAINTAINING.md` sources section, dating rules, change-folder convention, pre-push gate: `last_verified` is never written here; `last_retrieved` moves on a machine fetch; BIBLIOGRAPHY, DATA-PULL and the queue are generated.
- `docs/deferred-work.md` "Adding a row"; `docs/next-term/DECISIONS.md` row shape; `CHANGELOG.md` entry shape; `scripts/build-changelog.py` usage.
- `docs/changes/2026-10-27-register-closeout/handback.md`: complete, register empty, twenty zero-reference records deleted (D-084 precedent).
- SOURCES.md records for the six keys the replacements touch; the 14 chips those keys carry in sessions 1, 2 and 4; the console source (`LMVER_A='2023-06-01'`, `lmSamplingOK`), inside the `LM v2` fence, already correct.
- `facts/FACTS.json`: `claude-consumer-retention` exists; no record holds API retention; `adoption-iss-policy` points at PLANADVISER.
- Baseline gate: `build-sources`, `inject-sources`, `verify-sources`, `build-bibliography`, `build-readings`, `build-unsourced`, `verify-facts`, `verify-editorial` all exit 0 (13 advisory FACTS records, one A12 advisory, by design).
- The audit itself: `audit/out_*.json` in this folder, 142 records, six domain batches, verified 2026-10-27 by WebFetch (Anthropic hosts) and publisher-restricted WebSearch (everything else).

## Files that change
- `SOURCES.md` (modified), `scripts/sources-verified.lock.json` (modified only if a deletion requires a re-sync, as D-084 did)
- `facts/FACTS.json`, `facts/FACTS.md` (modified; the second generated)
- `session-1/index.html`, `session-2/index.html`, `session-4/index.html` (modified: prose and chips outside fences; footers regenerated)
- `BIBLIOGRAPHY.md`, `DATA-PULL.md`, `docs/source-verification-queue.md` (generated)
- `docs/deferred-work.md`, `docs/next-term/DECISIONS.md`, `CHANGELOG.md`, `changelog/index.html` (modified)
- `docs/changes/2026-10-27-bibliography-audit/` (new): `plan.md`, `audit/*.json`, `ledger.md`, `handback.md`

## Order of work
1. Commit `plan.md` and the audit JSON as the ledger's evidence.
2. Metadata pass over 91 records: title, author, publisher, link, published corrected from the audit; `last_retrieved` set to 2026-10-27 on the Anthropic records fetched in full; a dated `retrieval_note` line on every corrected record; supplements recorded as a dated line in `retrieval_note` naming the URL, not as new records (a new record with no chip is an A15 orphan, and D-084 just deleted twenty of those). Regenerate footers and the three generated files.
3. The four replacements. Temperature claims: the five chips on `src-api-messages` and `src-anthropic-sampling` move to `src-anthropic-deprecations`, whose scope gains the parameter-deprecations table; the two source notes that name "Messages API reference" are reworded to name the deprecations page (A13); a new record `src-api-migration-2026-10-21` carries the "pin 2023-06-01" statement on the console note in Session 1 Appendix A6; the two emptied records are deleted. `src-iss-ai-policy` becomes the ISS Market Intelligence page, FACTS `adoption-iss-policy` repointed, the §07 source note reworded. `src-owasp` retitled to the 2026 editions, linked to the project's dated announcement, `published` 2026-08-04.
4. Retention: new FACTS record `claude-api-retention` from the fetched page (not retained by default; Covered Models 30 days; ZDR per organisation); the three sentences that state a blanket 30 days (Session 1 console note, Session 4 Live API box, Session 4 Appendix D2 "keep chats 30 days") reworded and chipped with `data-fact`; the record's scope rewritten.
5. Claim-text corrections where a lesson states a figure the source does not: the Anthropic August 2025 ransom quotation, the Forbes victim's employer, Brynjolfsson's QJE figures, Morningstar's 184 of 3,003, Kitces productivity hours, the directory "off by default" and personalization "styles" claims. Each checked by grep first; a sentence that does not state the wrong thing is left alone.
6. Register rows for the five GAP figures and one for the search-only method limit; DECISIONS rows for the judgment calls below; CHANGELOG entry and page rebuild; handback. Full gate on the final tree. Push.

## Golden values
None encoded in tests. Figures entering page text are cited to the record that carries them: Brynjolfsson 5,172 agents and about 15 percent (QJE 140(2), H, two sources); Morningstar 184 of 3,003 (Morningstar's own page, H); API retention wording (platform page fetched 2026-10-27, H); OWASP 2026 edition published 2026-08-04 (OWASP project page and the project's announcement, H).

## Risks
Step 3 is riskiest: moving chips can trip A13 (a source note that still names the old source) and A15 (a key left with no chip), and the footers must be regenerated before the gate. Step 2 touches 91 records in one script run, so the diff is read before commit. Nothing is irreversible; every step is one commit.

## Rejected options
- Adding 21 supplement records: each would be an A15 orphan with no chip, the class D-084 deleted.
- Renaming keys for the replaced records: chips in three lessons would change for no reader benefit; the key names still describe the claim.
- Editing the console fences to pin the API version: `LMVER_A` is already `2023-06-01` and `lmSamplingOK` already routes to 4.6 or earlier.
- Writing `last_verified`: a human attestation, locked; not this session's to write.

## Proof
Every gate script MAINTAINING lists exits 0 on the final tree; `build-sources --check` reports the new record set with no undefined key; `inject-sources --check` current on 11 lessons; `verify-editorial` shows no new hard failure; grep of the three retention sentences shows no "30 days" without the covered-models qualifier.

## Flags (raised at acceptance, resolved by the instructor 2026-10-27)
- Session 4 Appendix D2 said "Claude Team, Enterprise and the API keep chats 30 days" on a Commercial Terms chip; the Terms do not say it and Enterprise chat defaults to indefinite per Help Center 10440198. Resolved: reword to the fetched wording (accepted as written).
- Supplements as notes rather than records departs from "one record per work" in spirit; recorded as a decision.
- Records that could not be fetched keep their old `last_retrieved`; the audit line in `retrieval_note` records the search confirmation.

## Departures from plan
- Step 3, 2026-10-27: `src-anthropic-context` merged into `src-context-windows` (the same page under two keys; the audit's UPDATE_METADATA for both said merge). Inside the named files (SOURCES.md, session-4): its one inline chip and its flip-card chip now point at `src-context-windows`, which gained the session-4 clause and the context-history scope; the duplicate record was deleted and the lock synced with the two emptied temperature records. The other duplicate pair (`src-models`, `src-anthropic-models-overview`) is not merged, because the second is cited only by session-5.
