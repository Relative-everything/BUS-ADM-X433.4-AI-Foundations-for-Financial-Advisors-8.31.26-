# Session 2 · Practical AI Usage in Daily Advisory Workflows

Run sheet for 2026-09-14, from `audit/AUDIT-2026-09-07.md` §5.3 and §5.4 with the D5 and D7 decisions applied. Clock times are Pacific (the block is 6:00 to 9:00 PM); the Central time is in brackets, confirm it is the right second zone before printing. The page is worked in the room at core-only depth (D1). Nothing in this file addresses a learner.

## Changed since the 09-12 run sheet (manual pass, 2026-09-13)

- §00 is the title, the lede, the depth control and the bridge. The case cards, the outcome cards, the glossary and the before-we-start block are gone; nothing on the page introduces the household before the Case facts button and §03.
- The bridge is three items, all on content delivered 08-31: tokens (which side of the price is dearer), the context window (what travels with a message), the new-chat rule with the two documented reasons in the key. "Reveal all three".
- The cold open is the heading, the box and the button. No opening line, no first-run sentence, no work-along.
- The pacing panel is the four depth buttons and three timing cells; no readout line under the buttons.
- There is no Shift+U override on this page. Every key is behind its own reveal control.

## Standing

### Flow
- The page is open at core-only depth. Do not raise the appendix depth in the room; B1 to B5 are for the async reader.
- Every slot names the element by id and `data-comp`. If a slot runs long, the drop order is §06 first (as a three-minute demonstration of the wrapper, ten-question reveal skipped), then the §02 estimator, never §05 and never the baseline capture.
- Six Zoom polls are prepared (P1 to P6 below). Launch each before the on-page vote or reveal it mirrors, so the room commits before it reads.

## Corrections slot (6:03 PM, 3 min) [8:03 CT]

### Flow
- Opener: "Three things I said last time that I have since checked. Here is what I found and how confident I am."
- Aloud, no chart needed (D7): input tokens are one fifth of output on every current tier, not half (DW-092 item 2, H, platform.claude.com fetched); a cache read is 10% of base input, not 5% or 50% (item 3, H); §7872 reaches gift loans between individuals above $10,000, and $100,000 is the net-investment-income ceiling, not the threshold (item 5, H); the C-corporation item from the 66-claim register held outside this repository.
- Moved to §01's opener at 6:26: temperature zero is an accepted API value and is still not fully deterministic (item 4, H). The page now says the same at the slider.
- Moved to §02's opener at 6:35, where the chart is on screen: Fable is exactly twice Opus per token, not "six times" (item 9, H); the Intelligence Index is Artificial Analysis's, and the "83 to 81" figures were LiveBench's (item 11, M).
- In writing to the class after the session: items 1, 6, 7, 8, 10 and 12 of DW-092.

## sCold (Cold open, 6:06 PM, 8 min) [8:06 CT]

### Flow
- 8 min, identical every session. Do not vary it, survey the room, or collect anything else - the five-week comparison needs it unmoved.
- Element: `#sCold`, `.ritual` (`t-cold-open`, `timed-ritual`). Opener: "Same question every session. Five minutes, nobody talks, then we look."
- Five minutes silent, then "Analyse what I typed". The page renders the eight checks the room heard on 08-31; it scores nothing.

## s0 (Retrieval bridge, 6:14 PM, 7 min) [8:14 CT]

### Flow
- Element: `#bridge` (`t-s0`, `retrieval-bridge`). Opener: "Three questions, no notes. Wrong and committed beats right and read."
- Item 1, tokens: which side of the price is dearer. The room heard "half" on 08-31 (DW-092 item 2); the key says output is five times input on every current tier, so the 6:03 correction lands again here as retrieval. Item 2, context: what travels with a message; the key says all previous history plus the new message, all billed as input (DW-092 item 10, the box is not the window). Item 3, the new-chat rule: your ten-to-fifteen-turn working rule, and the key names it as a heuristic, then gives the two documented reasons, the re-sent history and the vendor's context-rot statement. All three were taught 08-31 (tokens and price 02:12 to 02:22; memory and chat length 01:49 to 02:01; the restart rule 01:50 to 01:57).
- Reveal all three only after the room has typed; the reveal is all-or-nothing on this page.

## s12 (Baseline capture, moved up, 6:21 PM, 5 min) [8:21 CT]

### Flow
- Element: `#s12` capture panel (`t-s12`, `timed-ritual`), "Copy baseline record". Opener: "This is the one thing tonight you cannot do later. Task, unassisted minutes, output. Copy the record to your notes."
- The record's 40% line is labelled an assumption on the page; say it aloud once.

## s3 (§01 Temperature, 6:26 PM, 9 min) [8:26 CT]

### Flow
- Poll P1 before the on-page vote: "Same prompt to the same model twice, an hour apart. Substantially the same / may differ materially."
- Element: `#stanceVote` (`t-s3`, `prediction-commit`), then the slider `#temp`. Opener: "You watched me set this to 0, 0.8 and 1.6 two weeks ago. Now you set it."
- Deliver DW-092 item 4 here. The slider's zero setting now says "greedy: top bar every time; real APIs still vary".

## s5 (§02 Cost per finished task, 6:35 PM, 10 min) [8:35 CT]

### Flow
- Deliver DW-092 items 9 and 11 with the chart up.
- Element: `#frontierChart`, then the estimator (`t-s5`, `parameter-sandbox`). Poll P2 at the tier decision: "Which tier will your final-project workflow use? Sonnet 5 / Opus 5 / Fable 5 / another vendor / undecided."
- The 300M/71M token counts are marked unverified on the page; do not quote them as measured.

## s6 (§03 P.T.C.F, 6:45 PM, 10 min) [8:45 CT]

### Flow
- Element: the assembler (`t-s6`, `builder-assembler`). Opener: "The eight checks you heard last time collapse into four letters."
- Poll P3 before the persona evidence: "Which P.T.C.F element do you leave out most often? P / T / C / F."

### Facts
- Zheng and colleagues: 162 roles, four model families, 2,410 factual questions, no gain from personas on objective accuracy (H, ACL abstract).

## s6b (§04 Score your three templates, 6:55 PM, 15 min) [8:55 CT]

### Flow
- Element: `#fixtures`, then the scorer (`t-s6b`, `builder-assembler`) and the editor. Opener: "If you did not write three, or have nothing to run them on, use the three on the page."
- Fixture fallback: F1 client email, F2 meeting notes, F3 plan summary; each starter prompt is deliberately weak and labelled so. "Load it as the prompt to score" fills the box.
- 7:10 group report, 2 min. Poll P4 instead of a spoken round if the room is large: "Your weakest element across the three prompts: P / T / C / F."

## Break (7:12 PM, 15 min, posted as "back at 7:27") [9:12 CT]

## s8 (§06 The interview rewrite, 7:27 PM, 10 min) [9:27 CT]

### Flow
- Element: `#cbWrap` copy box, `#bsell` (`t-s8`, `builder-assembler`), the diagnostic `#promptIn`. Opener: "Ask it to ask you questions. You saw me do it building a skill; now it rebuilds your prompt."
- First to drop if behind: show the wrapper, skip the ten-question reveal (three minutes).

## s10 (§07 Citation failure types, 7:37 PM, 12 min) [9:37 CT]

### Flow
- Instructor-led; one learner runs one check aloud. Element: `#triage` (`t-s10c`, `multi-column-sorter`). Poll P5 before the reveal: "How many of the six citations would you have accepted as authority? 0 to 6."
- The live-run prompt names non-voting LLC units. Before this slot, work through the verification list below; the page no longer carries it.

### Verify before teaching (moved from the page 2026-09-13; the on-page gate is gone by instruction)
- The §07 triage key states four authorities as holdings so that citation failure can be taught; nothing else in this session is stated as a holding. Check each against primary authority before answering it in class.
- IRC § 671 and the grantor-trust rules as the authority behind the IDGT client explanation built in §03: sound as stated, and stated without its limits.
- Rev. Rul. 85-13 and Rev. Rul. 2004-64, Situations 1 to 3, as the §07 key characterises them, including the conditions the key attaches to Situation 3 (no understanding with the trustee; inclusion still possible from a retained power over the trustee or from creditor-access state law). Confirm against 1985-1 C.B. 184 and 2004-27 I.R.B. before teaching either as settled.
- Estate of Woelbing and Estate of Davidson: the §07 key describes each as a stipulated decision with no holding and states the docket dates, the instrument (self-cancelling installment notes in Davidson) and the settlement figures. Confirm the docket facts before repeating them.
- IRC §§ 2036(a)(1), 2036(b), 2038, 2702 and 7520 as the §07 key and the case structure invoke them, including the distinction between corporate stock and LLC units that the §07 live run turns on. Confirm current text against the Code.
- Portability: the §05 triage item on electing portability names no authority. Confirm current relief before answering it in class.
- The combined discount the memorandum asserts for lack of control and lack of marketability: nothing in this session or the case file establishes that it is defensible; no appraiser has been engaged, no restricted-stock or pre-IPO study is on file, and the memorandum allocates nothing between the two components.

### Facts
- Kessler v. Commissioner does not exist; labelled on the page and in the footer as a deliberately fabricated citation used as exercise material.
- Davidson's consideration was self-cancelling installment notes (M, Stout and Crain's via search 2026-09-11); Woelbing's two stipulated decisions were 25 and 28 March 2016 in dockets 30261-13 and 30260-13 (M, McGuireWoods and The Tax Adviser).

## s7 (§05 Triage, 7:49 PM, 8 min) [9:49 CT]

### Flow
- Element: `#quiz` (`t-s7`, `commit-first-mcq`). Poll P6 on item 7 before anyone clicks: "Underspecified / Specified, unverifiable / Specified and verifiable."
- §08 does not run in the room (D5). Announce the pairing for the between-session peer review here, in one sentence.

## Reserve (7:57 PM, 25 min) [9:57 CT]

### Flow
- Q&A and demonstration. The room's best 20 minutes in Session 1 were here; protect them.

## s12 (§09 Part 1 and the reading, 8:22 PM, 5 min) [10:22 CT]

### Flow
- Element: `#checklist` (`t-s12b`, `work-along-gate`). Announce the Session 3 reading aloud; Session 2's was not announced.
- Closing question at 8:27, aloud, one to three answers (`.talk` at the end of `#s12`). Stop by 8:50.
