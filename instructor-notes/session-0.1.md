# Session 0.1 · Start here: setup and click-along

Run sheet for the 2027 term. The page (`session-0.1/index.html`, "Start here: setup and click-along") is self-paced and has no polls. There is no meeting to run: students work through it alone, in their own account, before Session 1. Nothing in this file addresses a learner.

## Objective

Each student sets up their own paid Claude account and clicks through every menu used in Sessions 1 to 5, in about an hour, at their own pace, using synthetic text only. Every section asks for a prediction before it shows the answer, then one small task in the student's own account. They arrive at Session 1 with the account signed in, the course project created and a baseline timing written down.

## What students work through alone (57 minutes)

| Section | Min | The task |
|---|---|---|
| s0 What you need | 5 | Choose the plan their account shows, tick the models their picker lists, read how Help improve Claude is set in their own Privacy Settings and answer the retention question. |
| s1 New chat | 5 | Send the same line to two model tiers and compare; the context window and the model tier are defined here. |
| s2 Projects | 5 | Create the course project and its instructions; ask the same question inside and outside it. |
| s3 Instructions | 6 | Save the starter custom instructions; they apply to new conversations on the account. |
| s4 Search | 5 | Run a plain lookup with search on and open two citations. |
| s5 Connectors | 4 | Look at one connector's page and connect nothing. |
| s6 Skills | 6 | Zip a skill folder and upload it (needs the code execution and file creation setting). |
| s7 Incognito | 4 | Plant a code word in an incognito chat and ask for it in a regular one. |
| s8 Memory | 4 | Read the memory topics; delete any that describe a client. |
| s9 Baseline | 6 | Time one recurring task by hand and record the minutes outside the page. |
| s10 Vocabulary | 5 | Tick the terms they could not define, open the card of twelve. |
| s11 Close | 2 | Tick the three ready-for-Session-1 items and open Case 1. |

The last section carries the reading card for Session 1, which is generated from `docs/next-term/readings.json`; change the file and re-run `scripts/build-readings.mjs`, never the page.

## At the start of Session 1, check

Ask for a hand count on each, without a poll, in the first two minutes. The page's own close lists the same three.
- The paid Claude account is signed in on the computer they will use. The page treats Pro or higher as the minimum and Free as below it (FACTS:claude-plans). Anyone without an account: the Session 1 plan menu has "No account yet" and points back to this page; use the break for one-to-one setup.
- The course project from section 02 exists. Section 02 names it "BUS ADM X433.4 AI Foundations".
- The baseline minutes from section 09 are written down outside the page, since the page stores nothing. The number feeds Homework 1.
- Case 1 has been opened (section 11 links to it); Session 1 re-asks its two calls for anyone who has not.
- Each student has read how their own Help improve Claude setting is set. The page states no default for an account, and neither should you (FACTS:claude-consumer-retention).

## Notes for the instructor

- The live model console is not on this page; it lives in Sessions 1 and 4.
- Section 05 is look-only: a connector gives Claude your permissions in that service, so no work system is connected in this course. The protocol behind connectors is the Model Context Protocol (FACTS:mcp-name).
- Skills, memory and incognito settings differ on Team and Enterprise plans, where an administrator decides some of them; the page says where (FACTS:claude-skills-format).

Re-verify the week before: node scripts/verify-facts.mjs --as-of <session date> --session 0.1
