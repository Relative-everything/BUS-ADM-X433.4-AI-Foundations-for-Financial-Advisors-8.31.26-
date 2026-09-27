# Plan: Session 4 against the syllabus, 2026-09-27

Branch `claude/vigilant-noether-7ep3ev`, from `58b3510` (`main` after PR #39). Ask in
`notes-verbatim.md`. Ledger rows `S4S-001` upward; `checks.mjs` in this folder carries one DOM
assertion per row a DOM check can prove.

## 0. The premise, challenged first

1. **The syllabus names four platforms and the page teaches one.** §03's contract map is
   Claude-only, with "Other vendors: same split, their own numbers" as its third bullet. A learner
   on ChatGPT, Copilot or Gemini, which the room's Poll 2 shows most of them are, leaves §03 with a
   number that is not theirs. This is the largest gap and the largest change.
2. **Three syllabus lines have no evidence on the page.** "AI-written malware" appears nowhere;
   "data exfiltration" happens in the inbox test but is never named; "where the leaks actually
   happen" is a settings checklist with no leak on it. The Journal of Accountancy reading is not
   on the page at all.
3. **The primary sources for the new claims could not be opened from this build.** sec.gov,
   help.openai.com, support.microsoft.com, learn.microsoft.com, support.google.com,
   journalofaccountancy.com, wiz.io and techcrunch.com are all egress-blocked. Every new vendor
   figure and every new incident is therefore chipped **M** and recorded in `SOURCES.md` with a
   `retrieval_note` saying so, on the pattern `src-cfp-genai` already uses. The one page that
   opened is Anthropic's September 2026 threat report, which is the H source for AI-rewritten
   malware. The Verify-before-teaching list in the run sheet grows by the same set.
4. **Minutes do not move.** Every addition sits inside an existing activity or is an untimed recap
   figure, so the generated regions (core 67, appendix 83), the run sheet's clock and the earlier
   `checks.mjs` assertions on them all hold.

## 1. The syllabus, line by line, against the page as found

| Syllabus line | Where the page has it | Verdict before this change |
|---|---|---|
| No AI rulebook; existing duties; you are responsible | §01 sorter and trapdoor; §09 clause 6 | covered |
| What counts as PII: NPI | §02 crowd; D6 | covered |
| What you cannot put into public AI tools | §02; §03 contract card ("Client information: not here"); §04 payloads | covered |
| Approved vs non-approved vendors: what can your practice use today | §04 verdict ("a candidate, not yet approved"); §09 clause 2 | covered in substance; the word "approved" is never the thesis |
| Enterprise-grade platforms: Claude, ChatGPT, Copilot, Gemini, and how consumer tiers differ | §03, Claude only | **gap** |
| AI attacks: prompt injection, data exfiltration, deepfakes, AI-written malware | §05: injection (inbox), deepfake (call); exfiltration shown, not named | **half**: malware absent |
| Where the leaks happen: logs, caches, connectors, uncovered features | §03 six places, as settings to tick | **half**: no leak on the page |
| Hallucination risk and audit trails: prompts, outputs, decisions | §06 memos; §07 four slots, record block | covered; the block has no decision line |
| Daly (2026) | §01 bullet, §09 source line | covered; the register had no link |
| SEC FY2026 priorities §VII | §01 item 7, §09 source line | covered |
| Journal of Accountancy (2025) | nowhere | **gap** |

## 2. The screenshot survey: what each section's click does

Taken at 1280 px before any edit, every appendix shown, at load and after Shift+U.

| Section | The click | Reads as |
|---|---|---|
| §00 bridge | three lettered options lock, feedback text | click-to-text (a shared retrieval family; left as is, flagged for review) |
| §00 zoom-out | the model shrinks into a building with four stops | figure |
| Cold open | a token lands on a track; the track splits | figure |
| §01 | items stack in lanes; a trapdoor drops the four that name AI | figure |
| §02 | phrases replace; a dot vanishes into a crowd | figure |
| D5 | a 30-day bar drops from the event picked | figure |
| D6 | a marker moves on a map; a stamp desk | figure |
| §03 | the calendar floods or drains; the contract page slides; **the six places tick and count** | figure, then click-to-count |
| §04 | locks shut in a safe; the file drops or bounces | figure |
| §05 | files cross the wall; the x-ray wipes; a token runs a switchboard | figure |
| D1, D2 | a knockout bracket; reels; a stamp that never changes | figure |
| §06 | a skyline climbs; a tower of minutes | figure |
| D3 | a dial locks; a route grows a thinking loop | figure |
| §07 | a record's four slots sweep; a stamp | figure |
| §08 | two runners on a route; barriers drop | figure |
| D4 | a scale tips; setup spreads across sheets | figure |
| §09 | clauses type onto a page; a highlighter sweeps | figure |

Two places are click-to-text: the §00 bridge and §03's six places. The bridge is the course's
shared retrieval construct and is left alone (review list, item 6). The six places are rebuilt.

## 3. What changes, by section

| Section | Change | Syllabus line |
|---|---|---|
| §03 | A vendor row above the plans: Claude, ChatGPT, Copilot, Gemini. The plan tiles, the switch's name, the calendar and the contract card all read the vendor. Personal plans: the switch on by default at all four; what is kept differs (five years, until you delete, 18 months, 18 months with reviewed chats to three years, 72 hours off). Business plans: no training at all four; how long is Claude's 30 days or, elsewhere, the contract's number, which §04 asks for | platforms and tiers |
| §03 | The six places become six leaks: each card names its syllabus word (logs, caches, connectors, features) and, once opened, the incident that happened there, dated and chipped. The copy button becomes the six-line checklist | where the leaks happen |
| §04 | The thesis line names the approved list: a tool is approved when its six answers are on paper | approved vs non-approved |
| §05 | An untimed recap figure after the two beats: four attacks against one wall. Clicking an attack lights its path to what it reaches and the gate that stops it; the fourth, AI-written malware, is the one the page does not simulate, so it carries the evidence instead: Anthropic's September 2026 report, Google's November 2025 tracker, and the SEC's FY2026 §VII line on polymorphic malware. Exfiltration is named for the first time | four attacks |
| §07 | The record block gains a DECISION line; the reading is named and sourced | prompts, outputs, decisions; the reading |
| Sources | `src-daly` gains its link; `src-secpri`'s scope carries what §VII holds; eleven new records, all M except Anthropic's report | the three readings |
| Run sheet | §03, §05 and §07 slot notes; Poll 2 gains the vendor; Verify before teaching grows | |

## 4. Verification

Every repo gate in `MAINTAINING.md` that runs without the skill (the style check needs
`restyle_sweep.py`, which is not installed here, so the managed fence is not touched); the rebuild
and polish `checks.mjs`; this change's `checks.mjs`; a Playwright click-through at 1280 and 380 px
with Shift+U on and off; screenshots of the three changed sections read back.
