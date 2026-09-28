# Ledger: Session 4 against the instructor's update notes, 2026-09-28

Branch `claude/gracious-cray-2k4fkc`, from `c328c8c` (`main` after PR #40). One row per item; ids
run `S4N-001` upward. `checks.mjs` in this folder carries a jsdom assertion for every row a DOM
check can prove.

Baseline measured before any edit (Playwright, every appendix shown, 1280 px, nothing clicked):
6,702 visible words, 214 visible controls, 130 chips, 33 footer sources. Every repo gate green
except the style check (its sweep script is not installed here); `verify-browser` red only on the
sandbox's font certificate; the three earlier change folders' `checks.mjs` at 0 failed; the console
acceptance suite green on Sessions 0.1 and 1. Egress: sec.gov, finra.org, cfp.net, google.com,
openai.com, microsoft.com and every news site blocked; anthropic.com, claude.com,
support.claude.com and platform.claude.com open. The session's web-search budget ran out after
twelve of fifteen research lanes.

| Id | Anchor | What changed | Why (note item, rule or finding) | Test | Status |
|---|---|---|---|---|---|
| S4N-001 | this folder | Notes verbatim, plan, this ledger, `checks.mjs`, handback | Process | `node checks.mjs` | done |
| S4N-002 | `#lmbox` | The Live API box as the page's first child, collapsed at load, every live-only control hidden; the shared `LMSTYLE` and `LM` v1 fences byte-identical with Sessions 0.1 and 1; Session 4's own box under `LMBOX-S4` | B.2 "add the Gemini free API add in at the top like other sessions" | S4N-002; `test_live_console.js` M | done |
| S4N-003 | `#lmShowReq`, `#lmReq` | "1 · See the request" prints the one endpoint, the masked header, and the prompt as JSON, with or without a key; the prompt starts as the clean Prompt D (synthetic) and follows §02's own clean text once the room has cleaned it | B.2 "5 to 10 minutes explaining what an API is"; the repo rule that no client work reaches the console | S4N-003, S4N-008; `test_live_console.js` N, O | done |
| S4N-004 | `#lmbox .warn`, `#lmCost` | The box says on its face that a free key is plan A, the training tier, chipped to Google's API terms; a cost line under each reply prices the same tokens at the smallest Claude model | B.2; never make up a source | S4N-004 | done |
| S4N-005 | `#s3api` | §03's ladder panel ends with the Plan C pointer: open the box, load the clean Prompt D, mirror its status | B.2 "like other sessions" | S4N-005 | done |
| S4N-006 | `#s2` beat 2 | The Harder Ones: a case note with no name left, nine phrases of which seven are quasi-identifiers ($55 million, Rockford, aerospace fasteners, 64, a son in the business, a competitor's letter, the date), a guess row that locks, a people-who-fit figure with seven sieves, copy and start again | E.§2 "more and harder NPI examples (e.g. $55M)", "make it a bit longer" | S4N-006 | done |
| S4N-007 | `#redOut2` | Replacing all seven reads No; the readout shows the guess against seven and why each phrase narrowed the crowd | same | S4N-007 | done |
| S4N-008 | `#s2` `draw()` | Beat 1 writes its visible prompt and its done state to `S4STATE` so the box can load the room's own clean prompt | B.2; the rule that only synthetic or de-identified text reaches the box | S4N-008 | done |
| S4N-009 | `#vCopy` | Bug fixed: "Copy email to vendor" copied the verdict sentence. It now drafts a real email with a subject line and one question per open lock, citing Regulation S-P | E.04 BUG | S4N-009 | done |
| S4N-010 | `#clList`, `#clOut` | Beat 2, What the Clause Looks Like: a contract page whose six lines fill in; each lock's line shows Anthropic's own sentence where verified (verbatim labelled, paraphrase labelled), who it binds, and for lock 4 the 48-hour notice against the rule's 72 | E.04 [DECIDE] "sample contract sentence by sentence" | S4N-010 | done |
| S4N-011 | `#clCopy` | Copy the sample contract: header plus the six sentences | same | S4N-011 | done |
| S4N-012 | `#injHow` | How it hid: white text, zero-size font, invisible characters, an image; disabled until the assistant runs, then each re-renders the x-ray | E.05 "list the different creative hiding techniques" | S4N-012 | done |
| S4N-013 | `#injOut` | Each technique names its real case with a chip (Mozilla 0Din, Unit 42, ASCII smuggling, Trail of Bits) | same; three-source rule | S4N-013 | done |
| S4N-014 | `#injFix`, `.s5skill`, `#injCopy` | Each fix prints its skill or system-prompt language in a copyable block, labelled as written for this lesson; the verdict names the guidance it rests on | E.05 "show example prompt / skill language per fix" | S4N-014 | done |
| S4N-015 | `#dfBill` | The bill after the call: three real losses (Arup $25.6M, a UAE bank $35M, Singapore $3.8M) with the FBI 2025 caption, hidden until the room answers | E.05 [VERIFY] "real video call scam cases with $ amounts" | S4N-015, S4N-015a | done |
| S4N-016 | `#atkOut` | The four-attack board gains a scale line per attack, each figure tagged MEASURED, DEMANDED or PROJECTED | E.05 [DECIDE] "$ cost per attack" | S4N-016 | done |
| S4N-017 | `#entList` | D2's eight outputs alternate prose, number, prose, formula so the answer order is mixed; the key names the new order | E.D2 "mix up the answer order" | S4N-017 | done |
| S4N-018 | `#sW2` | The detector question reworded to what "no mark found" means; bullets say what a CFP can check (a file, with the Claude Content Checker) and cannot (text), and that their own record is the check that works | E.D2 [DECIDE] "don't tell them to check watermarks" | S4N-018 | done |
| S4N-019 | `#costIn`, `#s6` | The pricer's labels and readout in class words; the record-versus-audited-grounded-answer framing kept; arithmetic re-verified (61, 86, 94) | E.06 [VERIFY] calculator, simpler language | S4N-019 | done |
| S4N-020 | `#anonReset` | D6 gains Start again: trays emptied, stamps re-enabled, the desk un-finished | E.D6 "reset button" | S4N-020 | done |
| S4N-021 | `SOURCES.md`, lock | 42 new records, three updated (Anthropic's commercial terms, the Messages API reference, the Claude marks page), `used_for.session-4` on three existing records; `attest-verified.mjs --sync`; footers regenerated | A.5 never make up a source; three-source rule for incidents | S4N-021; `verify-sources` | done |
| S4N-022 | footer | Every chip resolves to a footer entry; every footer entry has a chip (editorial A15) | Repo gate | S4N-022; `verify-editorial` | done |
| S4N-023 | page-wide | No model identifier typed as lesson content; no "tonight"; no new dashes | Repo rules | S4N-023; `verify-editorial` | done |
| S4N-024 | `instructor-notes/session-4-teaching-aid.{htm,pdf,md}` | A three-page colour-coded teaching aid: the clock as a colour bar, one row per slot with STOP, ASK, CLICK and SAY cues, the Section 3 run flow, the D5 cue, the live work-along with its legality verdict, three outside-repo demos, the drop order | C | S4N-024; `aid-pdf.mjs` no overflow | done |
| S4N-025 | `instructor-notes/session-4.md` | What-changed block, clock pointing at the aid, per-slot additions, five new slots, verify list, not-yet-done | Process | S4N-025 | done |
| S4N-026 | `README.md`, `MAINTAINING.md` | The console rule records the Session 4 exception and its terms; the allowlist, the fence md5 check (rewritten with exact versioned markers) and the acceptance suite now cover three lessons | B.2 against the repo rule | S4N-026; `test_live_console.js` 86/86 | done |
| S4N-027 | `#ladList`, `#ladFig` | §03 beat 2, Personal or Firm Account: six rungs (training off, retention in writing, a contract the firm signs, audit report on request, SSO and audit logs, breach notice in hours), price tags on each column, the client-file door at the top | B.3 "personal vs enterprise dead obvious", "security checklist" | S4N-027 | done |
| S4N-028 | `#ladOut`, `#ladProg` | The firm door opens only after all six rungs; the readout says what each side may hold (personal: public or de-identified only; firm: client data once §04's six answers are on paper) | B.3 "how client data can be used on a secured enterprise plan" | S4N-028 | done |
| S4N-029 | `#s3 .pts`, `.src` | The bullet "The plan buys the contract, not the model"; the source line names the price page, both sets of terms, the retention page, the DPA and the certifications page | E.§3 "strongly cited" | S4N-029 | done |
| S4N-030 | `#flipGrid` | D3 beat 2, 2023 or Now: eight flip cards from Anthropic's own pages (temperature, memory, context engineering, built-in reasoning, grounding, the context window, agents, the agent loop); "loop engineering" is not printed because no source uses it | E.D3 "2023 vs Sept 2026 subsection", "loop engineering vs prompt engineering" | S4N-030 | done |
| S4N-031 | `#flipAll`, `#flipCount` | Flip all, the count, Shift+U flips all | Interactivity | S4N-031 | done |
| S4N-032 | `#sWS` CL data | Both claims' current lines rewritten to the guidance opened today (only 1.0 accepted; effort and adaptive thinking; the loop), each with a what-to-do line | E.D3 [VERIFY] "effort vs temperature" | S4N-032 | done |
| S4N-033 | `#recWhy` | §07: four Why slot buttons under the file, each outlining its slot | E.07 [VERIFY] "where the 4 record items are sourced" | S4N-033 | done |
| S4N-034 | `#recOut` | Each readout names the rule or expectation behind the slot with its chips, and the sentence that no rule lists the four | same; "minimum needed" | S4N-034 | done |
| S4N-035 | `#s7 .pts` | The bullet "Where the four come from": books and records, supervision, duty of care, the compliance programme | same | S4N-035 | done |
| S4N-036 | `#recView`, `#recSkill` | The record block as a skill: front matter, the same instructions, a copy button, the format cited | E.07 "skill copy paste block" | S4N-036 | done |
| S4N-037 | `#sW1` beat 2 | D1's "Only the right key shows the mark" made obvious: numbered steps, a three-step strip, zone words | E.D1 "dead obvious" | S4N-037 | done |
| S4N-038 | `#sW1` beat 3 | Two kinds of image mark: a label in the file (stripped by a screenshot) and a mark in the pixels (survives one); the Content Checker for files | E.D1 "image watermarking" | S4N-038 | done |
| S4N-039 | `#sW1`, `#s1` item 9 | The EU callout: the rule binds the vendor, and is why Claude's text carries a mark; §01 item 9 reworded the same way | E.§1 [DECIDE], E.D1 [DECIDE] | S4N-039 | done |
| S4N-040 | `#sRSP` | D5: the clocks that are law on a day slider; the written plan's three parts; two real clocks, Equifax (40 days) and Capital One (10 days); black and white wording | E.D5 "breach plan language", "famous breach example", "trigger citations" | S4N-040 | done |
| S4N-041 | `CHANGELOG.md`, `changelog/index.html` | Entry dated 2026-09-28; page rebuilt, its style fence restored from a lesson's because the sweep is not installed here | Process | `build-changelog.py` | done |
| S4N-042 | `SOURCES.md` | Eight verified records the page does not cite lose their Session 4 use (editorial A15); two Gemini records' uses name their section | `verify-editorial` A15; polish S4P-002 | `verify-editorial`; polish checks | done |
| S4N-043 | `#s2 .pts`, `#s5` HOWN | Two phrases the earlier folders assert restored inside the new text (the Session 3 callback; White text on a white background) | rebuild S4R-005, S4R-008 | rebuild checks | done |

## Measured at close

Same method as the baseline: visible words 6,702 to 8,815 (+32%, inside the new interactives; see
the handback), controls 214 to 275 (+29%), chips 130 to 229, footer sources 33 to 70, page height
37,464 to 46,001 px; at 380 px no overflow. Minutes, sections, tiers and gates unchanged. All four
change folders' `checks.mjs` at 0 failed; the console suite 86 of 86; every gate as listed in the
handback.
