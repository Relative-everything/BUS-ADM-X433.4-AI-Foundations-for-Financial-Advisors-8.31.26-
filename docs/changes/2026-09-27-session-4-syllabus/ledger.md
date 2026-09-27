# Ledger: Session 4 against the syllabus, 2026-09-27

Branch `claude/vigilant-noether-7ep3ev`, from `58b3510` (`main` after PR #39). One row per item;
ids run `S4S-001` upward. `checks.mjs` in this folder carries a jsdom assertion for every row a
DOM check can prove (19 assertions, 0 failed at close).

Baseline measured before any edit (Playwright, every appendix shown, 1280 px, nothing clicked):
6,267 visible words, 202 visible controls, 78 chips, 22 footer sources, 33,200 px of sections;
§03 321 words and 11 controls, §05 480 and 7, §07 359 and 10. Every repo gate green except the
style check, whose sweep script is not installed here; `verify-browser` red only on the sandbox's
font certificate; editorial advisories 2 (both Session 1). Both earlier change folders' `checks.mjs`
at 0 failed. Egress: sec.gov, help.openai.com, openai.com, support.microsoft.com,
learn.microsoft.com, support.google.com, services.google.com, journalofaccountancy.com, wiz.io and
techcrunch.com all blocked; anthropic.com open.

| Id | Anchor | What changed | Why (syllabus line, rule or finding) | Test | Status |
|---|---|---|---|---|---|
| S4S-001 | this folder | Ask verbatim, plan with the two audits, this ledger, `checks.mjs`, handback | Process | `node checks.mjs` | done |
| S4S-002 | `#s3 #vendBtns` | A vendor row (Claude, ChatGPT, Copilot, Gemini) above the three plan tiles; Claude selected at load so every earlier assertion on §03 still holds | "Enterprise-grade platforms: Claude, ChatGPT, Copilot, Gemini" | S4S-002; rebuild S4R-006 | done |
| S4S-003 | `#s3` VEND data, `drawAll` | The calendar, the switch's name, the contract card and the map's vendor caption all read the vendor; Claude A is unchanged (sixty rust squares on, one teal off) | same | S4S-003 | done |
| S4S-004 | `#s3` | ChatGPT: switch "Improve the model for everyone"; sixty squares either way, gold when the switch is off ("until you delete"), rust when on; deleted chats leave within 30 days | "how the consumer tiers differ" | S4S-004 | done |
| S4S-005 | `#s3` | Gemini: "Keep Activity"; 18 rust squares and 18 dashed for reviewed chats, legend "36 months if read"; off is one square, 72 hours. Copilot: "Model training on text"; 18 squares either way | same | S4S-005 | done |
| S4S-006 | `#s3` | Business plans at the three other vendors draw the calendar as dashed squares, "in the contract", pointing at §04's locks; an API tile with no sourced claim cites nothing; a sourced one cites its vendor page | same; no unbacked claim | S4S-006 | done |
| S4S-007 | `#s3 .pts`, `.src` | Three bullets: the switch on by default at all four, the business exclusion at all four, and how long each personal plan keeps it; the source line names all six vendor pages and the four leak sources | same | S4S-007 | done |
| S4S-008 | `#s3 #setList` | The six places renamed as leaks and tagged with the syllabus words (the default, logs, memory, caches, connectors, features); the readout waits for a click; the copy button copies all six checks | "Where the leaks actually happen: logs, caches, connectors, uncovered features" | S4S-008 | done |
| S4S-009 | `#s3` SETS data, `openSet` | Opening a place names its incident with a chip (DeepSeek, shared ChatGPT chats, EchoLeak, the Meta AI feed), counts it, and turns its map badge teal; the click-to-count interaction becomes a leak the map shows | same; the ask's "more than click to display text" | S4S-009 | done |
| S4S-010 | `#s4 .big` | The thesis says what approved means: the six answers are on paper | "Approved vs non-approved vendors" | S4S-010 | done |
| S4S-011 | `#s5 #atkBoard` | An untimed board after the two beats: four attack rows crossing one wall, each a keyboard-operable SVG button, four tiles, nothing selected at load; no minute moves | "AI-specific attacks: prompt injection, data exfiltration, deepfakes, AI-written malware" | S4S-011 | done |
| S4S-012 | `#s5` ATK data, `pick` | Clicking an attack lights its path, the gate that stops it and what it reaches; exfiltration is named for the first time; row 4 (AI-written malware) is drawn without a lock and its readout carries three sources | same | S4S-012; Playwright mouse and Enter | done |
| S4S-013 | `#s5 .src` | Source line names Anthropic's September 2026 report and Google's November 2025 tracker; the sentence the polish check S4P-005 asserts is kept | polish S4P-005 | S4S-013; polish checks | done |
| S4S-014 | `#s7 #recBlock`, `.pts`, `.src` | DECISION line at the end of the record block; the hint says the last line is filled after reading; the reading named at M with no claim about its content | "audit trails: prompts, outputs, decisions"; "Journal of Accountancy (2025)" | S4S-014 | done |
| S4S-015 | `SOURCES.md` | Eleven new records, each with a `retrieval_note` saying the page was not opened (Anthropic's was, through a summariser); `src-daly` gains its sec.gov link; `src-secpri` gains a scope for §VII and a second use; lock synced by `attest-verified.mjs --sync`; footers, `BIBLIOGRAPHY.md`, `DATA-PULL.md`, the verification queue regenerated | the three readings; never fabricate | S4S-015; verify-sources | done |
| S4S-016 | `#s3`, `#s5` script | Every chip written as a literal string, none assembled from a variable, so migration check 18 sees every key | migration 18 was red on the first draft | S4S-016; migration 18 | done |
| S4S-017 | page-wide | No "tonight", no file names, no register vocabulary in rendered text | R5, P5 | S4S-017 | done |
| S4S-018 | `instructor-notes/session-4.md` | What-changed block, Poll 2 with the vendor, §03/§05/§07 slot notes, five Verify items, one not-yet-done item | Process | S4S-018 | done |
| S4S-019 | generated regions | Core 67, appendix 83, unchanged; the appendix panel and budget regenerate to the same bytes | minutes do not move | S4S-019; build-appendix --check | done |

## Measured at close

Same method as the baseline: visible words 6,267 to 6,655 (+6%), controls 202 to 214 (+6%),
chips 78 to 98, footer sources 22 to 33, height 33,200 to 34,115 px (+3%). By section: §03 321
words and 11 controls to 473 and 15 (the vendor row and the leak readout); §05 480 and 7 to 615
and 15 (the board's four rows and four tiles); §07 359 to 453 words, controls unchanged. The
growth is the three syllabus lines that had no evidence on the page; nothing else grew.
