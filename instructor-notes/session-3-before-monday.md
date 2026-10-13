# Session 3: what is left before the session

Rewritten on 2026-10-13 for the 2027 term against `session-3/index.html`. Everything the page can carry is on it, and nothing on the page speaks to you instead of to the room. What is left needs your terminal, your Zoom, the course site or your printer. Minutes are estimates. No dates or clock times are fixed here.

## Must, before the session: six things, about 45 minutes

| # | Do | Min | Where |
|---|---|---|---|
| 1 | Run the week-before check: `node scripts/verify-facts.mjs --as-of <session date> --session 3`. Then re-open the sources of the high-volatility records on the session's Verified facts list (FACTS:claude-context-window, FACTS:claude-model-ids-and-retirements, FACTS:sec-exam-priorities-status) and update any value that moved | 15 | terminal; the record sources |
| 2 | Print the teaching aid, landscape, one page: 20 steps, a colour box per step saying what is on screen, five checkpoints, a five-item drop order | 1 | `instructor-notes/session-3-teaching-aid.pdf` |
| 3 | Build the four Zoom polls and test each: a short answer, two single-choice (Poll 3 anonymous) and a select-all. Do not create them live; do not make students co-hosts | 15 | `instructor-notes/session-3-polls.md` |
| 4 | Zoom settings: speaker-labelled transcripts on; the poll report available after class | 1 | Zoom web portal |
| 5 | If you will teach C8 (recording consent), read 18 U.S.C. section 2511(2)(d) and the CFP Board's confidentiality standard. Until you have, say so once when you open it | 10 | `instructor-notes/session-3-verify-brief.md` |
| 6 | Check the captures: the `sOff` example outputs and the Case 3 drafts are labelled claude-sonnet-5-5, captured 2026-10-12; its earliest retirement date is 2027-09-28 (FACTS:claude-model-ids-and-retirements). Past that date, re-run them with `scripts/recapture.mjs` | 3 | `scripts/recapture.mjs` |

## Worth it, if there is time: three things, about an hour

| # | Do | Min | Where |
|---|---|---|---|
| 7 | One read-through of the page at Core only, the aid beside you, clicking each answer the aid names | 45 | the live page |
| 8 | Post the first two posts for the week (the pre-class window and the current values to check notes against). Hold the third until after the session | 10 | the posts file in this folder |
| 9 | Make the syllabus and the course site agree on one Part 1 date. One date, on no lesson page | 10 | syllabus, course site |

## At setup, before the room fills

- Tab 1: Session 3, depth at **Core only**. Tab 2: `cases/case-3.html`.
- Claude: a new chat open and signed in, on the model the page labels (claude-sonnet-5-5), synthetic material only. Anyone without Claude uses the Example output on the page.
- Polls loaded. Aid printed and in reach. The three chat lines below ready to paste.
- In the room from fifteen minutes before class for setup questions.

## Three lines to paste into Zoom chat, so you never type them live

```
Back at [CLOCK TIME].
```
```
One line each: was what came back usable, and one sentence it added or stated as settled?
```
```
The thing I said we would cover. One line each: one step of your meeting workflow you would hand to a tool, one you would not, and the reason for the second one.
```

## After class, within 24 hours

- Export the Zoom transcript (speaker-labelled), the chat log and the poll report.
- Post the third post with its date filled.
- Tell the next pass four things, one line each: the recurring meetings the learners who do not run client meetings named, whether the two law items are checked, what the room said in the silent-run harvest, and the Poll 3 distribution. Each one removes a hedge.
