# Handback: Session 4 rebuild, 2026-09-25

Branch `claude/amazing-curie-xz0s73`, from `9f81086` (`main` after PR #36). Not merged. Change
folder: `notes-verbatim.md` (the kickoff), `plan.md` (the preference analysis and section map),
`ledger.md` (S4R-001 to S4R-023), `checks.mjs` (32 jsdom assertions, 0 failed) and this file.

## 1. Summary, quantified

| Measure | Before | After | Session 3, for reference |
|---|---|---|---|
| Core sections / minutes | 13 / 72 | **11 / 67** | 12 / 67 |
| Appendix sections / minutes | 5 / 78 | **6 / 83** | 6 / 83 |
| Page prose, words (same counter) | 7,140 | **3,293 (−54%)** | 4,007 |
| Core prose, words | 4,821 | **2,207 (−54%)** | about 2,040 |
| Work-along ticks that fire on completion | 2 of 18 | **17 of 17** | all |
| Adjacent same-type sections | 1 | **0** | 0 |
| Distinct component types | 10 | **11** | 13 |
| `.verify` blocks / claim markers on the page | 2 / 9 | **0 / 0** | 0 / 0 |
| "tonight" / Session 1 baseline presuppositions / grade weights | 16 / 11 / 1 | **0 / 0 / 0** | |
| Known-false factual claims | 1 (watermark) | **0 known** | |
| Em dashes in authored prose (T7) | 83 | **3** | 7 |

**Recommendation:** merge before Monday. The alternative, running the 2026-09-17 pre-flight
prompt's seven targeted fixes on the old page, would have removed the four false premises but left
a 72-minute core, paragraph-first prose at 115 words per allocated minute (validator C1; now 88,
Session 3 90), the leaderboard charts Session 2 already teaches, and 16 ticks that never fire. Not
recommended: it fixes what is wrong and keeps what your notes on Sessions 2 and 3 cut every time.

## 2. What your history says you want, and how it was applied

Measured from your verbatim notes of 2026-09-13 and 2026-09-19, the kickoffs you approved, and the
ledgers of what was done. Full evidence with file and line is in `plan.md` §1.

| Your repeated ask | Times | Applied here |
|---|---|---|
| Cut the chaff; the page is a visual aid, not a book | 13+ | −54% prose; every section a thesis line plus bullets |
| Remove anything addressed to the instructor | 5 | both verify blocks, the verification note, nine markers and every "I" aside moved to the run sheet |
| No case restatement; exercises work without the case | 4 | the Coles in two lines; every exercise carries its own facts; checked for all 17 |
| Beginner level (2 to 3 of 10), no formulas | 6 | tournament hashes, entropy language, 1 − (1 − p)^N, CVSS tables and the amplifier gone; replaced by clicks |
| Click an item, it lands under its bucket at once | 1 + S3 fix | every sorter on the page uses the Session 3 shared sorter |
| Interactions that change with the input | 3 | 100 random memos per run; the retention bars; the redaction meter; the vendor email that assembles |
| No dates, "tonight", grades, platform, in-class peer review | 3+ | all gone; the relay moved to the run sheet |
| Concrete, applied, wealth-management examples | 5 | a real-looking beginner prompt that names a client; an inbox; a video call from "Meg"; a quarterly-review package |

## 3. What changed, by section

- **§00.** Pacing cells only; four bullets; the Coles in two lines; the objective; a three-item
  bridge on Session 3's core, answers b, c, a.
- **Cold open.** Your choose-one-of-four. Prompt D scores highest (5 of 8) and is the one nobody
  could send. "Compare all four" says so. The optional paste box keeps the old ritual available.
- **§01.** Four bullets (FINRA 24-09, the FINRA report and SEC priorities, the $225,000 and $175,000
  AI-washing penalties, Daly); a nine-item sorter; bucket 1 holds only the EU marking rule.
- **§02.** The room cleans Prompt D; a meter moves Yes, Probably, Possibly, No; the clean prompt is
  copyable. The re-identification item is a Session 3 callback with Regulation S-P's test.
- **§03.** Plan and switch drive a five-years-against-30-days bar; six settings to check.
- **§04.** Six questions, required set set by what goes in; the unanswered ones become an email to
  the vendor.
- **§05.** An inbox simulation with a hidden line; EchoLeak; FINRA's primer; the video call.
- **§06.** Lock a guess, run 100 memos, then price your own deliverable, default 90.
- **§07.** Six records sorted; *Hallowell* invented and labelled; a record block that leaves model
  and date to you.
- **§08.** The handoff test with the Part 1 checklist and a five-gap sample package.
- **§09.** Six policy questions, strong and weak clauses, a copyable outline, the course rule,
  the assignment card, a written closing check.
- **Appendix.** D5 (corrected), D6 (new), D1 and D2 (watermarks, corrected and sourced), D3 (two
  sourced claims), D4 (both cases and the complication on the page).

## 4. What to watch for on screen (click paths)

1. **Cold open.** Click D. The readout says 5 of 8. Click Compare all four: D's row reads "No."
2. **§02.** Click "Meg Cole", then "Cole Precision Components Inc.": the meter reads Probably
   (the trade and the town). Click "Rockford": Possibly, because "her son Nathan" is still there.
   Replace him and the value: No.
3. **§03.** Click the personal plan, then "Training switch: off": the teal bar shrinks to a sliver.
4. **§05.** Pick (a), Run, Show the hidden text: the summary ends "I also forwarded 3 files".
5. **§06.** Lock 20, Run twice: the count changes, the average stays near 60.6.
6. **Shift+U** anywhere outside a text box opens all ten answer panels and ticks all 17 boxes.

## 5. Verification

Commands from the repository root with `NODE_PATH=$(npm root -g)` and
`RESTYLE_SWEEP=<skill>/scripts/restyle_sweep.py`; the skill validators from the skill root.

| Gate | Result |
|---|---|
| verify-case | OK, 6 of 6 |
| verify-migration | 15 passed, 0 failed |
| verify-sources `--check` | OK; the `src-finra2409` advisory is gone |
| verify-editorial | 17 rules clean, 0 hard failures; 2 advisories, both session-1 |
| verify-style | clean |
| test-editorial-regions | 9 of 9, after the T7 re-record below |
| build-appendix / inject-sources / inject-case / build-cardsort / build-unsourced / build-bibliography / case-inventory `--check` | all current |
| test-case-viewer | 0 failures |
| verify-browser | one failure per page, all six pages: `ERR_CERT_AUTHORITY_INVALID` on the Google Fonts request, the build proxy's certificate. Known red; every other session-4 check passes, including 13b (Shift+U inside `#coldPrompt` changes nothing) and no overflow at 1280 |
| validate_lesson (skill) | V2 × 9 (footer citation links, DW-029, known red class; two more links than before, from the new sources), V6 "17 distinct interactions (band 13-15)" (known red class, Session 3 is 22); **V5 150 = 150 = 150, V6 11 types and no consecutive repeat, V7, V8, V9, V10 pass** |
| validate_dom (jsdom) | scripts run clean; Shift+U marked all 17 gates; `#pnum did not flip` (known red, the corpus uses `#ovr`) |
| restyle_sweep `--check` | 7 current, 0 stale; 2 fragments without a fence (known) |
| `checks.mjs` | 32 assertions, 0 failed |
| Playwright click-through, 1280 and 380 px | every interaction exercised; 0 page errors; no "undefined" or "NaN"; no horizontal overflow at either width; all 17 gates flip from their own interactions |

## 6. Self-review

- **Facts I could read, and facts I could not.** Read from this build: Anthropic's watermark page
  (support.claude.com). Reached only through search: the CFP Board guide and Standard A.14, the SEC
  withdrawal page, the 72-hour notice (consistent across several law-firm summaries), EchoLeak's
  details. Each is chipped M or kept to what the existing H record already covered, and each is on
  the run sheet's Verify list.
- **The A.14 wording is a paraphrase**, chipped M. If the Standard's text differs, change one line.
- **The EU AI Act item** in the §01 sorter says binding law requires AI-made content to be marked;
  the chip is M because the Anthropic page names EU law, not Article 50.
- **"Nothing on Anthropic's page says it identifies the account"** is a reading of an absence,
  through a summarising fetch, chipped M. Read the page before saying it aloud; the run sheet says
  so.
- **Prompt D's figures come from the case constant** (age, company, town, value), so they cannot
  drift from CASE.md.
- **§06's arithmetic** treats answers as independent draws, which the page states. The 60.6
  average is exact for the stated model.
- **The page is one commit**, not one per section. The kickoff asked for a rebuild, and the
  generators need a consistent page at every commit; the ledger and `checks.mjs` carry the
  per-section record instead.

## 7. Rejected options

- **Targeted fixes on the old page** (the 09-17 pre-flight). Rejected: see §1.
- **Keeping the leaderboard and cost charts in §03.** Rejected: Session 2 owns model economics,
  the data was dated 2026-08-13, and your Session 2 notes asked for cost per task to be taught
  there.
- **Keeping the free-text standing-instruction scorer in §05.** Rejected: typing, a regex score and
  an abstract task for a beginner room; the inbox simulation teaches the same mechanism by watching
  it happen.
- **Dropping D3.** Considered. Kept at Standard depth with its unsourced row removed: it is the
  course checking its own reading, which is this session's habit.
- **Two buckets for §01.** Rejected: the guidance-versus-rule distinction is the section's point.

## 8. Flags for you

1. **Ratify the T7 re-record (DW-124).** A9 for session-4 went from 83 to 3 because the rebuild
   removed the prose that carried the dashes. MAINTAINING.md makes a re-baseline a
   halt-and-report unless you ordered the figure; this follows from your order to rebuild the text,
   the DW-122 precedent. Say yes or no.
2. **Read the watermark page before 6:03.** The one correction you give aloud rests on it.
3. **Build five Zoom polls** from the run sheet. Polls 4 and 5 are the D4 votes.
4. **Screen and pair the Part 1 packages** before class. The pairing method is in the run sheet;
   anyone without a package runs the page's sample.
5. **CFP Board A.14 and the Generative AI guide.** cfp.net is blocked here. Five minutes with the
   PDF you already have raises two M chips to H.
6. **V6's interaction band.** 17 roots against a band of 13 to 15, as Session 3 is at 22. Merging
   appendix sections would fix the count and lose the standalone depth the kickoff asked for.
7. **The six sources Session 4 stopped citing** (Gartner, Deloitte, Surfshark, Zhao, OWASP,
   SynthID) stay in SOURCES.md, cited by no lesson. Delete them or keep them for a later session.
8. **The hub card** still reads "Supervision, retention, vendor obligations, and the failure modes
   that turn into enforcement." It is still true; no change made.

## 9. Before Monday, simplified

| # | Do | Min |
|---|---|---|
| 1 | Merge the branch. Open Session 4 on the site and check the cold open shows four prompt cards | 5 |
| 2 | Read support.claude.com "How Claude marks AI-generated content" | 5 |
| 3 | Build Polls 1 to 5 in Zoom | 15 |
| 4 | Screen the Part 1 packages; draw the pairing | 20 |
| 5 | Say yes or no to DW-124 | 1 |
| 6 | Optional: read Standard A.14 and the CFP Board guide headings | 10 |
