# Handback: Session 4 against the syllabus, 2026-09-27

Branch `claude/vigilant-noether-7ep3ev`, from `58b3510` (`main` after PR #39).

## Summary, quantified

| Measure | Before | After |
|---|---|---|
| Syllabus lines with evidence on the page (of 11) | 8 | **11** |
| Sections whose main click moves a figure (of 17) | 15 | **16** (the §00 bridge is the one left) |
| Visible words at load, every appendix shown, 1280 px | 6,267 | 6,655 (+6%) |
| Visible controls | 202 | 214 (+6%) |
| Footer sources | 22 | 33 |
| Chips at H / M / L | 78 total | 98 total; every new vendor and incident figure M |
| Minutes, sections, tiers, gates | 67 + 83, 17, 3, 17 | unchanged |

**Recommendation: merge.** The rejected alternative was a fifth section for the four platforms
and a third §05 beat for malware; both would move minutes and the run sheet's clock, and the same
material fits inside §03's existing map and an untimed recap figure after §05's two beats.

## The audit: each section against the syllabus and the two qualities asked for

Simplicity is the click count and what the first screen asks; understandability is whether the
thesis line, the figure and the readout say one thing. Verdicts are before this change; the last
column is what changed.

| Section | Syllabus line | Simplicity | Understandability | Changed |
|---|---|---|---|---|
| §00 bridge and zoom-out | (frame) | three lettered picks, one button | the four stops are the session's four questions | no |
| Cold open | what you cannot paste in | one pick, two tests | the track splitting is the lesson | no |
| §01 rules | no AI rulebook; Daly; SEC §VII | a guess and nine placements | the trapdoor answers the guess | no |
| §02 client data | what counts as NPI | click phrases until No | the crowd is the definition | no |
| D5, D6 | NPI, breach clock | one pick, then a clause; a dial and stamps | clear | no |
| §03 contract | **four platforms; consumer tiers; where leaks happen** | one vendor, one plan, one switch, six places | the calendar is the number | **yes** |
| §04 vetting | approved vs non-approved | one payload, six locks | the safe is the verdict | thesis line |
| §05 attacks | **four attacks** | predict, run, x-ray; a call; now a board | the wall is the model | **yes** |
| D1, D2 | (watermark depth) | a bracket; reels and a stamp | dense but coherent; advanced tier | no |
| §06 checking | hallucination risk | guess, run, price | the skyline is the rate | no |
| D3 | (staleness) | two calls, two drags | clear | no |
| §07 record | **audit trails: prompts, outputs, decisions; the reading** | six filings, one copy | the four slots are the record | **yes** |
| §08 handoff | (final project) | one station click, seven ticks | the two runners are the test | no |
| D4 | (discussion) | vote, weigh, complicate, re-vote | the scale is the argument | no |
| §09 policy | the assignment | six picks | the stamp is the examiner | no |

## What was done

1. **§03 teaches four vendors.** A row above the plans; every number on the map, the switch's own
   name and the contract card follow the vendor. Personal plans start with the switch on at all
   four; what differs is how long: five years, until you delete, 18 months, 72 hours off.
   Business plans exclude training at all four; where the vendor's page does not give a number,
   the calendar is dashed and says "in the contract", which §04's locks ask for.
2. **§03's six places are six leaks**, each tagged with the syllabus word, each opening the
   incident that happened there with a chip: DeepSeek's logs, Google's cache of shared ChatGPT
   chats, EchoLeak's connector, the Meta AI feed's uncovered Share button.
3. **§05 ends with four attacks against one wall.** Exfiltration is named; AI-written malware is
   the row no page can simulate, with Anthropic's September 2026 case (H), Google's November 2025
   tracker (M) and the SEC's §VII polymorphic-malware line (M) in its readout.
4. **§07's record holds the decision** and names the Journal of Accountancy reading.
5. **Eleven source records**, every one with a retrieval note saying what was and was not read.

## Click paths worth seeing

1. **§03.** Click Gemini, then A: eighteen rust squares and eighteen dashed, "36 months if read".
   Flip the switch: one square, 72 hours. Click ChatGPT: sixty gold squares with the switch off,
   "until you delete".
2. **§03.** Open 2 · LOGS, then 5 · CONNECTORS: the badge on the map turns teal and the readout
   names the incident and the check.
3. **§05.** Under the video call, click 4 · AI-written malware: the only row whose gate is dashed.
   Tab to a row and press Enter: the same.
4. **§07.** The record block's last line.

## Verification

| Gate | Result |
|---|---|
| verify-case, verify-migration, verify-sources, test-case-viewer | pass (6/6, 15/15, 5/5) |
| every generator `--check` (appendix, case, cardsort, sources, bibliography, unsourced, case inventory) | current |
| verify-editorial | 17 rules clean, 0 hard, 2 advisories (Session 1, pre-existing) |
| rebuild `checks.mjs`, polish `checks.mjs` | 0 failed each (S4P-005's asserted sentence kept) |
| this change's `checks.mjs` | 19 of 19 |
| verify-browser | red only on `ERR_CERT_AUTHORITY_INVALID` for the fonts request in this sandbox, as before |
| verify-style | not run: `restyle_sweep.py` is not installed here. The managed fence was not touched in the lesson, and the changelog page's fence was restored byte-for-byte from the lesson's (md5 identical) after `build-changelog.py` emptied it |
| Playwright, 1280 and 380 px | every vendor, plan and switch state; all six places; all four attacks by mouse and by keyboard; every button once; Shift+U; 0 page errors; no "undefined", "NaN" or ".."; no horizontal overflow; all 17 gates flip |

## Flags for you

1. **Every vendor figure other than Claude's is M**, and so are the three incidents other than
   EchoLeak and the SEC §VII line. The pages are named in the run sheet's Verify list; reading
   four vendor pages before class raises the whole of §03 to H.
2. **The Journal of Accountancy article was not read.** The page names it and claims nothing. If
   you want §07 to teach what it recommends, that is a manual-notes item.
3. **The §00 bridge is still click-to-text.** It is the shared retrieval construct across
   sessions, so it was left alone rather than changed on one page.
4. **`verify-style` could not run** here. If your environment has the skill, run it once before
   merging; nothing in the fences changed.
