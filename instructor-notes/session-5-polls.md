# Session 5 Zoom polls

Four polls, one in each middle core section, each launched before the on-page step it mirrors. Build and test them ahead; students are not co-hosts (co-host status broke the Fall 2026 short-answer poll). Questions under 255 characters, answers under 100. N is about 8, so half is 4. If a poll fails, take the answer in chat on a count of three and apply the same rule. The case commit's second question is the page's own, and the discussion's two votes are chat waterfalls, not polls.

## Poll 1
- **Section:** `sCase` (section 01), opens it. **Format:** single choice with a surprising, checkable answer. **Zoom:** Single choice, five answers, anonymous.
- **Question:** A firm's five-step workflow names one model in step 2, and Anthropic retires that model. Which step breaks first?
- **Options:** 1 Paste the household's figures into the prompt / 2 Run the prompt on the model the skill file names / 3 Draft the one-pager: three headings, bullets under each / 4 Check it: read the draft and make sure it looks right / 5 Save the draft to the client file.
- **Expected:** 2. The skill names claude-sonnet-4-5-20250929, deprecated 2026-09-30 and retiring 2026-11-30, and Anthropic says requests to retired models fail (FACTS:claude-model-ids-and-retirements, H). Steps 3 and 4 break second and quietly (the page's reveal table; the Case 5 log, L).
- **Rule:** Key the five counts into the Room tally. If more than half pick 3 or 4, ask one of them what they would see on the day before revealing: the loud break comes first. If more than half pick 2, reveal at once and dwell on the step 4 row ("cannot tell"). Otherwise reveal and move on.

## Poll 2
- **Section:** `s1` (section 02), opens its second panel, The Gate and the Scorecard. **Format:** multi-select. **Zoom:** Multiple choice, select all, five answers, anonymous.
- **Question:** A skill was tested on one model. Select every line that lets it outlive that model.
- **Options:** A Run only on the model it was tested on / B Run only on the two newest generations on the vendor's list; otherwise stop and say which / C Run on whatever model the app has today / D Read the result; if it looks right, ship it / E Score against five named checks; ship at 5 of 5, otherwise hold and name the failed check.
- **Expected:** B and E. A fails once its model retires and says nothing (FACTS:claude-model-ids-and-retirements, H); C runs on a model nothing recorded; D compares the result with memory of the last one. The page's key: only B with 2 has no silent failure (the skill and later generations are constructed, L).
- **Rule:** If three or more tick A, C or D, run their pick first (A with 1: RUNS, then FAILS three times), then B with 2. If B and E lead, drag them without comment and dwell on the last stamp (STOPPED, HELD 4 OF 5).

## Poll 3
- **Section:** `s5` (section 03), opens it, before the slider. **Format:** numeric-range prediction. **Zoom:** Single choice, five ranges, anonymous.
- **Question:** Four published trials timed people with and without AI: writing, consulting, customer support and coding. On average, how much faster were people with AI?
- **Options:** Slower, on average / 0 to 10% faster / 10 to 20% faster / 20 to 30% faster / 30% faster or more.
- **Expected:** 10 to 20% faster: the mean of the page's four bars (40, 25.1, 14, minus 19) is 15.0. This file computes it; it is not a published figure and the bars measure unlike things. Say the spread: 40% faster to 19% slower, with METR's developers believing they were about 20% faster (src-noy-zhang, src-dellacqua, src-brynjolfsson, src-metr-2025, all M).
- **Rule:** Lock the modal band on the slider, then reveal. If more than half pick 20% or more, read METR's belief (about plus 20) before its result (minus 19). If more than half pick under 20%, say the room is right on the mean and read the spread. If anyone picks Slower, ask whom they have in mind: that is METR.

## Poll 4
- **Section:** `s7` (section 04), opens its second panel, Rank the Reasons. **Format:** short answer. **Zoom:** Short answer, anonymous.
- **Question:** In a word or a short phrase: what is the most common reason investors give for firing their adviser?
- **Expected:** Quality of the advice and services 32%; then the relationship 21%, cost 17%, returns 11%, handling it alone 10%, communication 9% (Lamas and Labotka, Morningstar, about 185 investors, as reported; src-morningstar-fired, M).
- **Rule:** Read three answers aloud and sort the rest: advice or service, relationship or trust, cost or returns. If more than half are cost or returns, give the rank its two minutes and let the order do the work ("returns is fourth, at 11%"). If more than half are advice or relationship, lock the rank in one minute and give the saved minute to the discussion.
