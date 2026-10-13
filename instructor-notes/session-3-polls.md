# Session 3 Zoom polls

One poll in each of four core sections, rebuilt on 2026-10-13 against `session-3/index.html`. Build and test all four ahead; students are not co-hosts. Questions under 255 characters, answers under 100. If a poll fails, take the answer in chat on a count of three, read the tally and apply the same rule. The `sCase` commit and the two `s15` votes are not polls. At eight learners "more than half" is five; on the anonymous poll read counts, never names.

## Poll 1
- **Section:** `s4`, closes it; click Preset 1 first so 42.6 and 24.8 are on screen. **Format:** short answer. **Zoom:** Short answer, one question, not anonymous.
- **Question:** For "does the Dunmore 401(k) permit a Roth conversion", the retriever ranked the 2024 memo (42.6) above the 2026 plan description (24.8). In one sentence, why did the memo win?
- **Expected:** it counts shared words and cannot tell which document is current. The memo holds all five scored terms (dunmore, 401k, permit, roth, conversion), the plan description four, because it says "permitted"; the ranker reads no amendment date. Source: the `s4` Preset 1 verdict; scores recomputed on the page's tokenizer from CASE.md Part O, D7 and D3.
- **Rule:** Sort answers as they arrive: A names the word match, B names that it cannot tell which is current, C is anything else. If more than half are C, read the Preset 1 verdict aloud before `s6`; otherwise move on.

## Poll 2
- **Section:** `s6`, opens it, before the page's four buttons, which carry the same letters. **Format:** single choice with a surprising, checkable answer. **Zoom:** Single choice, four answers.
- **Question:** A tool answers only from your own documents and cites them. How often does an answer still contain something those documents do not support?
- **Options:** (a) Essentially never / (b) About 1 in 20 / (c) About 1 in 5 / (d) As often as a tool with no documents.
- **Expected:** (c). Stanford measured grounded legal research tools at 17% to 33% unsupported answers against 43% for GPT-4 with no documents: Magesh et al. (2025), SOURCES `src-magesh`, H. Option (b) is the finding step alone: 5.7 missed in 100 at baseline, 1.9 at Anthropic's best setting (`src-anthropic-ctx`, H; not benchmarked on advisory documents, M).
- **Rule:** If more than half pick (a) or (b), read the 17 and the 33 off the chart before the key opens. If more than half pick (d), say grounding cut 43 to between 17 and 33, not to zero. Otherwise click the majority on the page.

## Poll 3
- **Section:** `s10`, opens it. **Format:** single choice, practice reality. **Zoom:** Single choice, five answers, **Anonymous** on at creation.
- **Question:** Does an AI note-taker join your client meetings today?
- **Options:** Yes, a firm-approved tool / Yes, unofficially / No, not allowed at my firm / No, I have not considered it / I do not run client meetings.
- **Expected:** none; the answer is the room's. Market reference after the room sees its own bars: 42.9% of advisors use AI notetakers (T3 2026, n = 2,906; FACTS:adoption-t3-2026, M) and about 18% of advisory teams use an AI meeting-note tool (Kitces; FACTS:kitces-notetakers-2025, M). Different surveys and denominators: read both, rank neither.
- **Rule:** If anyone picks "unofficially", take C9 `sPol` (5 min) after `sOff` and say the Reg S-P clocks: 30 days to the customer, 72 hours from a service provider (FACTS:reg-sp-compliance, M). If more than half pick either "Yes", skip the "Why it sells" line; otherwise read it (an hour to prepare, an hour to follow up; FACTS:kitces-notetakers-2025).

## Poll 4
- **Section:** `sOff`, opens it, before the sorter. **Format:** multi-select. **Zoom:** Multiple choice, select all, six answers.
- **Question:** Six review-update tasks. Which belong to no AI tool, in any file? Select all that apply.
- **Options:** 1 Update the review letter's figures / 2 Add this year's column to the cash-flow table / 3 Rebuild the six review slides / 4 Decide how much to convert to Roth, and when / 5 Flag every cash-flow cell that moved over ten percent / 6 Sign off the letter before it goes to the client.
- **Expected:** 4 and 6 only. Source: the `sOff` sorter key, the two items in "Not an AI task": the conversion decision is a judgement (its basis is Appendix C10) and the sign-off is a check no tool does for you. Task 5 is arithmetic under a stated rule, an AI task you still read.
- **Rule:** If fewer than half select 6, read the key's line for it aloud before the sorter opens and start on that row. If more than half select 5, say a rule stated over a sheet is an AI task and the reading is still yours. Otherwise reveal and move on.
