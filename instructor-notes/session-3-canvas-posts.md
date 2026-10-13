# Three course-site posts, ready to paste, for the week of Session 3

Rewritten on 2026-10-13 for the 2027 term. These are your own posts to the course site, written for you to paste. Fill the bracketed items from the syllabus before posting, once, so there is one date and not two. The (FACTS:...) tags in Post 2 point you to the record; delete them before pasting. Post 3's reading list is the tentative list in `docs/next-term/readings.json`: paste it from the card at the foot of Session 3, section 07 Close, after you have approved the list.

---

## Post 1 · Pre-class window (post before the session, repeat weekly)

Subject: Setup and course-site questions: [START TIME MINUS 15 MINUTES] to [START TIME], every week

I will be in the Zoom room from [START TIME MINUS 15 MINUTES] each class night for setup, course-site, file-format and access questions. From [START TIME] the class starts on content; anything of that kind raised after the start goes to the break or to this window the following week. Join early if you have one.

---

## Post 2 · Values to check your Session 1 and 2 notes against (post before the session)

Subject: Current values from Sessions 1 and 2

Part of this course is checking claims against a primary source. If your notes from Sessions 1 and 2 hold a different figure for any of these, the values below replace it. Each carries the confidence I have. Post only the items you actually said differently in the room and delete the rest.

1. **Output tokens cost five times input** on every listed Claude model. Per million tokens, input / output: Haiku 5.5 $0.10 / $0.50 for prompts up to 100K tokens ($0.50 / $2.50 above that), Sonnet 5.5 $2 / $10, Opus 5.5 $4 / $20, Fable 5.1 $10 / $50 (FACTS:claude-output-input-ratio, FACTS:claude-api-price-haiku-5-5, FACTS:claude-api-price-sonnet-5-5, FACTS:claude-api-price-opus-5-5, FACTS:claude-api-price-fable-5-1). Fable 5.1 costs two and a half times Opus 5.5 per token, a multiple that moves whenever either price does, so quote the prices. Cost per task is not cost per token. High confidence.
2. **A cache read** is billed at a tenth of base input by default, a twentieth on Opus 5.5 and Sonnet 5.5, and a fortieth on Fable 5.1 (FACTS:claude-cache-and-batch-pricing). High.
3. **The context window** is all the text the model can reference when generating a response, including the response itself: the system prompt, every message and document in the request, tool definitions, and the output including extended thinking, up to 1M tokens on current models. The box you type in is the smallest part of it (FACTS:context-window-definition, FACTS:claude-context-window). High.
4. **Portability.** For an estate not required to file under section 6018(a), Rev. Proc. 2022-32 allows a simplified election on a complete Form 706 filed on or before the fifth anniversary of death; it superseded Rev. Proc. 2017-34's two-year window. After the fifth anniversary the only relief is a private letter ruling under Treas. Reg. 301.9100-3, and none of it is open to an estate that had to file under 6018(a). Whether a given estate can still elect turns on the date of death, the estate's size and whether a return was filed. Nothing in the Cole file applies it (FACTS:portability-late-election). Medium.
5. **Zero-shot, one-shot, few-shot.** A prompt with an instruction and no example is zero-shot; one-shot is exactly one example inside the prompt; few-shot is several (FACTS:zero-shot-definition). Medium.
6. **The three leaderboards measure different things.** The Intelligence Index is Artificial Analysis's, a weighted average of 10 evaluations scaled 0 to 100. LiveBench is a separate contamination-limited benchmark of 23 objective tasks in 7 categories. Arena (formerly LMArena, at arena.ai since 2026-01-28) ranks models from human pairwise preference votes (FACTS:aa-index-definition, FACTS:arena-rename). Medium.

If you spot anything else, say so. Being called out is the point.

---

## Post 3 · Reading for Session 4 and the Part 1 reminder (post after the session)

Subject: Reading for Session 4, and Part 1

Reading for Session 4, from the card at the foot of Session 3 (about 39 minutes in all; tentative until you approve the list):
- Wolfram, S. (2023), "What Is ChatGPT Doing ... and Why Does It Work?", the section "Surely a Network That's Big Enough Can Do Anything!", about 10 minutes.
- FINRA (9 December 2025), 2026 Annual Regulatory Oversight Report, Generative AI section, about 6 minutes.
- CFP Board (25 February 2025), Generative AI Ethics Guide: A Checklist for Upholding the Code and Standards, about 10 minutes.
- Video, watch before class: Karpathy, "Intro to Large Language Models", the segment 45:43 to 58:37 only, about 13 minutes.

Final Project Part 1, the handoff package, is due [DATE FROM THE SYLLABUS, STATED ONCE]. Upload to the course site one .zip file with four parts: readme.txt (plain text, twelve headings in the order on the Part 1 card), the workflow/ folder, the samples/ folder (synthetic inputs for at least two different clients, and the output each produced) and selfcheck.txt. Two headings need care: BASELINE VS AI TIME (the baseline is the one you timed in Homework 1) and DATA-HANDLING NOTE (the fields to remove or pseudonymize before real use). selfcheck.txt is your own cold run: a fresh chat or project with memory off, following only readme.txt, both samples run, every link opened, and the result of each check. The build transcript is not in this package; it goes with Part 2. The Part 1 card is at the foot of Session 3 and in Session 2's assignment section. No real client data or identifying information enters any AI tool at any point in this course: synthetic or fully de-identified facts only.
