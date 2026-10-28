# Ledger: bibliography audit applied, 2026-10-27

One line per step, with the commit that landed it. The audit itself (142 records, six
domain batches) is in `audit/out_*.json`; the method and its limits are in the handback.

| Step | Commit | What landed | Gate |
|---|---|---|---|
| 1 | `b5b2df5` | `plan.md` accepted; the six audit files as evidence | not run (docs only) |
| 2 | `34733ff` | 135 records corrected or annotated; `last_retrieved` advanced on 44 fetched Anthropic pages (42 remain after step 3's deletions); three inline chips raised to H (`src-sec-ai`, `src-sec-withdraw`, `src-anthropic-browser-access`); footers and the three generated registers rebuilt; `docs/case-fact-inventory.md` regenerated | green (one purge-list hit, "8 October 2025", reworded before commit) |
| 3 | `22d76e3` | the four replacements; `src-api-migration-2026-10-21` added; `src-api-messages`, `src-anthropic-sampling` deleted; `src-anthropic-context` merged into `src-context-windows`; FACTS `adoption-iss-policy` repointed; lock synced | green (one stray chip in the flip deck repointed before commit) |
| 4 | `72bab4e` | FACTS `claude-api-retention`; six Session 4 strings and one Session 1 sentence reworded; `src-anthropic-retention` rescoped | green |
| 5 | `b2111f7` | voice-clone label, Copilot setting name, memory flip card chip; `src-memory` gains its Session 4 clause | green (check 18 caught the missing footer entry before commit) |
| 6 | this commit | register rows DW-198 to DW-203, decisions D-093 to D-099, CHANGELOG entry and page, ledger, handback | green |

## Counts

| Measure | Before | After |
|---|---|---|
| Records in SOURCES.md | 146 | 144 |
| References across 11 lessons | 702 | 705 |
| Records with an `Audit 2026-10-27` line | 0 | 138 |
| `last_retrieved` = 2026-10-27 | 0 | 42 |
| Records with an unverified field (BIBLIOGRAPHY) | 83 | 72 |
| `last_verified` populated | 1 | 1 (unchanged by design) |

## Audit verdicts (142 records)

| Verdict | Count |
|---|---|
| VERIFIED | 71 |
| VERIFIED_WITH_CORRECTIONS | 67 |
| UNREACHABLE (confirmed by search) | 4 |
| NOT_FOUND | 0 |
| KEEP | 47 |
| UPDATE_METADATA | 70 |
| ADD_SUPPLEMENT | 21 |
| REPLACE_WITH_ALT1 | 4 |
