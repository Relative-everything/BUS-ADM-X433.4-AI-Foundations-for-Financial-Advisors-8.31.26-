# Three Canvas posts, ready to paste, for the week of Session 3

Written 2026-09-18. Every correction below comes from the two pedagogical audits and the
2026-09-07 claims audit in this repository. For the next term the figures were re-read against
facts/FACTS.json (retrieved 2026-10-11), and items 1 to 4, 6 and 8 to 11 now follow those records, with
their confidence labels; the other labels are the audits' own. The (FACTS:...) tags in Post 2 point you to the record; delete
them before pasting. Fill the two bracketed dates from the syllabus before posting, once, so there
is one date and not two.

---

## Post 1 · Pre-class window (post before Monday, repeat weekly)

Subject: Setup and Canvas questions: 5:45 to 6:00 PM Pacific, every week

I will be in the Zoom room from 5:45 PM Pacific each class night for setup, Canvas, file-format
and access questions. From 6:00 the class starts on content; anything of that kind raised after
6:00 goes to the break or to this window the following week. Join early if you have one.

---

## Post 2 · Corrections from Sessions 1 and 2 (post before Monday)

Subject: Corrections to things I said in Sessions 1 and 2

Part of this course is checking claims against a primary source. These are mine. Each carries the
confidence I have in the correction. Two of them I will also say aloud on Monday.

**From Session 2**

1. **Output tokens cost five times input, not about twice,** on every listed Claude model. Per
   million tokens, input / output: Haiku 5.5 $0.10 / $0.50 for prompts up to 100K tokens ($0.50 /
   $2.50 above that), Sonnet 5.5 $2 / $10, Opus 5.5 $4 / $20, Fable 5.1 $10 / $50
   (FACTS:claude-output-input-ratio, FACTS:claude-api-price-haiku-5-5, FACTS:claude-api-price-sonnet-5-5,
   FACTS:claude-api-price-opus-5-5, FACTS:claude-api-price-fable-5-1). The conclusion I drew, that cost
   per task is not cost per token, stands; the multiple was wrong. High confidence.
2. **A missed portability election is not always permanently lost.** For an estate not required to
   file under §6018(a), Rev. Proc. 2022-32 allows a simplified election on or before the fifth
   anniversary of death, by filing a complete Form 706 marked "FILED PURSUANT TO REV. PROC.
   2022-32 TO ELECT PORTABILITY UNDER § 2010(c)(5)(A)". It superseded Rev. Proc. 2017-34's two-year
   window. The route was never open to an estate that had to file under §6018(a), and after the
   fifth anniversary the only relief left is a private letter ruling under Treas. Reg. 301.9100-3.
   The limit is the fifth anniversary of death, so for a death in 2021, like the one in the Session 2
   prompt-critique item, that date falls during 2026 and, for anyone reading this after 2026, the
   simplified route has closed (FACTS:portability-late-election). Medium confidence, and this is the
   one that could matter to a client.

**From Session 1**

3. **The watermark does not identify your account.** I said Claude output could be traced to the
   account that generated it. That was wrong. Claude's text carries a statistical watermark
   (announced 2026-08-14, for future and supported models) that does not identify individual users
   and adds no hidden characters, and supported files (.png, .jpg, .svg) carry a content
   credential with no identifying information (FACTS:claude-text-watermark). Other vendors mark
   too: Google's SynthID watermarks images, video, audio and Gemini text, and OpenAI images carry
   content credentials and a SynthID watermark, with text watermarking EU-only for ChatGPT and
   opt-in for the API (FACTS:google-synthid, FACTS:openai-provenance). High confidence on the
   Claude correction, medium on the other two vendors.
4. **A cache read is billed at a tenth of base input by default, a twentieth on Opus 5.5 and
   Sonnet 5.5 and a fortieth on Fable 5.1, not "at least five, probably fifty"**
   (FACTS:claude-cache-and-batch-pricing). High.
5. **Temperature zero is an accepted setting, not "impossible".** It is still not fully
   deterministic. High.
6. **The intra-family loan thresholds.** Two figures, not one. $10,000: aggregate gift loans
   between individuals at or below it are outside §7872 on that day (IRC §7872(c)(2); not for loans
   used to buy or carry income-producing assets). $100,000: at or below it, the imputed interest is
   capped at the borrower's net investment income, treated as zero if that income is $1,000 or less
   (IRC §7872(d)(1)). I ran the two together (FACTS:irc-7872-thresholds). Medium.
7. **Input is not cheap "because they train on it".** Commercial and API data is not used for
   training. Per the 2026-09-07 claims audit.
8. **Fable 5.1 costs two and a half times Opus 5.5 per token, $10 / $50 against $4 / $20, not
   "six times".** The multiple moves whenever either price does, so quote the prices
   (FACTS:claude-api-price-fable-5-1, FACTS:claude-api-price-opus-5-5). High.
9. **The input box is not the context window.** The window is all the text the model can reference
   when generating a response, including the response itself: the system prompt, every message and
   document in the request, tool definitions, and the output including extended thinking, up to 1M
   tokens on current models (FACTS:context-window-definition). High.
10. **Two leaderboards were conflated.** The Intelligence Index is Artificial Analysis's, a weighted
    average of 10 evaluations scaled 0 to 100, not LiveBench's: LiveBench is a separate
    contamination-limited benchmark of 23 objective tasks in 7 categories, and Arena (formerly
    LMArena) ranks models from human pairwise preference votes (FACTS:aa-index-definition,
    FACTS:arena-rename). Medium.
11. **Navajo has a written form.** It has had an official orthography since 1937 (Robert W. Young
    and William Morgan, with John P. Harrington), was in teaching materials by 1940, and has Young
    and Morgan's dictionaries (1943; 1980, revised 1987) (FACTS:navajo-written-form). The point I
    was making stands: it is a low-resource language for these models because little of it is
    digitised. Medium.
12. **FP Alpha is an AI-driven platform, not a deterministic calculator.** Its own tax-return
    reading routes low-confidence extractions to human reviewers, which is the discernment point
    I was making, not a counter-example to it. High.
13. **The eCFR is at ecfr.gov, not .com**, and it carries Treasury regulations (26 CFR); the Code
    itself is 26 U.S.C. Two bodies of authority I ran together. High.
14. **The known-knowns 2x2 is not Anthropic's.** It predates them by decades. Medium on the
    attribution history, high that it is not Anthropic's.
15. **The Session 1 probability-against-rank curve was illustrative, not measured.** Per the
    claims audit.

If you spot anything else, say so. Being called out is the point.

---

## Post 3 · Reading for Session 4 and the Part 1 reminder (post after Monday's class)

Subject: Session 4 reading, and Part 1

Reading for Session 4: Daly (2026); SEC FY2026 Examination Priorities, section VII; Journal of
Accountancy (2025), the audit-trail prompt technique. All three are listed at the foot of Session
3 §11.

Final Project Part 1, the handoff package, is due [DATE FROM THE SYLLABUS, STATED ONCE]. Single
email, body reads "See attached". The seven-element checklist is in Session 2 §09; the two most
often missing are the baseline time for the task, estimated if you never timed it, against the
AI-assisted time, and the data-handling note. A classmate runs your package cold in Session 4.
No real client data or identifying information enters any AI tool at any point in this course:
synthetic or fully de-identified facts only.
