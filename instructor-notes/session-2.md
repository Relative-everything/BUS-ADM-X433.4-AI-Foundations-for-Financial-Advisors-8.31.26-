# Session 2 · Practical AI Usage in Daily Advisory Workflows

Run sheet for 2026-09-14, from `audit/AUDIT-2026-09-07.md` §5.3 and §5.4 with the D5 and D7 decisions applied. Clock times are Pacific (the block is 6:00 to 9:00 PM); the Central time is in brackets, confirm it is the right second zone before printing. The page is worked in the room at core-only depth (D1). Nothing in this file addresses a learner.

## Changed since the 09-14 class (deferred-work catch-up, 2026-10-11)

- s0, the retrieval bridge: each item now has its own "Lock and reveal", which locks that box and opens its key; "Reveal all three" locks every box first (DW-114). The s0 Flow line below records how the page worked when it was taught.

## Changed since the 09-13 run sheet (polish pass, 2026-09-14)

- Nothing that changes a slot: no element id, `data-comp`, opener, poll, minute or reveal moved. Print this sheet as it stands.
- What the room sees differently, by section. §01: the explanation ends "no theory behind that number: it is simply what works for essays". §02: the lede reads "Two models two dollars apart per million tokens" and the paragraph under it "Plotted together, they scramble the price-sheet ranking". §03: the prompt-length panel is labelled "A related point". §05: the feedback on items 2 and 6 prints the section sign where it printed the literal "&sect;". §06: the two subheadings are sentence case, the memo paragraph reads "The questions it asked back are below", and the panel's hint line under the eight questions is gone (the label and "Reveal the rest" carry the instruction). §07: the Check 03 card no longer repeats "Training data has a cutoff; the Code does not" from the Type 03 card. §08: the section opens "§04 rebuilt one of your prompts" and the first live-audit criterion reads "Pasted in as written, it produced something". B1: the live-run doit points at §01 as it now is. B4: the adoption chart's caption names rows 1 and 3 and sits under the three bars. B5: the question reads "if a reliable prompt has to be specified as carefully as §04 required". Screen-reader-only changes in §04 (named level groups, pressed state on F1 to F3), §08 (pressed state on the three templates) and B5 (names on the two percentage boxes).
- Two things the page still says that are yours to decide, opened in `docs/changes/2026-09-14-session-2-polish/recommendations.md`: §07's "three of the six items are wrong in a way that survives the check most people actually perform" against the triage tally's "Five of the six exist" (PL-026), and the footer's "Last updated 2026-09-12" (PL-034). Re-counted on the v5 key (six items on the age at which Meg and David must start required minimum distributions), the two sentences are both true and count different things: five items exist (1 to 5); three of those five are wrong (item 3, the right section and the wrong cohort; items 4 and 5, an instruction cited as law); items 1 and 2 are sound; item 6, Kessler, is the one that fails an existence check.

## Changed since the 09-12 run sheet (manual pass, 2026-09-13)

- §00 is the title, the lede, the depth control and the bridge. The case cards, the outcome cards, the glossary and the before-we-start block are gone; nothing on the page introduces the household before the Case facts button and §03.
- The bridge is three items, all on content delivered 08-31: tokens (which side of the price is dearer), the context window (what travels with a message; the window is not the input box, FACTS:context-window-definition), the new-chat rule with the two documented reasons in the key. "Reveal all three".
- The cold open is the heading, the box and the button. No opening line, no first-run sentence, no work-along.
- The pacing panel is the four depth buttons and three timing cells; no readout line under the buttons.
- There is no Shift+U override on this page. Every key is behind its own reveal control.
- Batch 2 (same day): §01 lists seven sources of run-to-run difference after the vote, its explanation is a third of the length, the comparison exercise is gone and the consequence cards are shorter, the first now about a compliance review. §02 defines a task with five advisory examples, the estimator is a personal task mix across two tiers, and the decision block and the verification panel are gone. §03 is shorter. §04 is a builder: three premade prompts, four elements, four levels each; the paste-and-rank scorer and the fixture pack are gone; the verification gate moved to the §07 slot below. §05 has no discussion block. §06 opens questions one at a time as clicked, adds five reverse-prompting starters, and has no standing-constraint panel (say the rule aloud). §07 chips both base rates on the sentence, its chart caption fits, and Check 03 says how to check currency. §08's peer review is now your live audit (slot below). §09 keeps the two cards, the capture and the checklist; the reading list and the closing question are in the §09 slot below, not on the page. B2 has Three Cups.
- Batch 3 (same day): §07's six triage explanations are four or five plain bullets each. The case dialog no longer carries the verification gate; its items are in the §07 slot below with the others. §02 has a second block, six example prompts in the shape of the benchmark's question kinds, between the five advisory tasks and the frontier chart.

## Standing

### Flow
- The page is open at core-only depth. Do not raise the appendix depth in the room; B1 to B5 are for the async reader.
- Every slot names the element by id and `data-comp`. If a slot runs long, the drop order is §06 first (as a three-minute demonstration of the wrapper, eight-question reveal skipped), then the §02 estimator, never §05 and never the baseline capture.
- Six Zoom polls are prepared (P1 to P6 below). Launch each before the on-page vote or reveal it mirrors, so the room commits before it reads.

## Corrections slot (6:03 PM, 3 min) [8:03 CT]

### Flow
- Opener: "Three things I said last time that I have since checked. Here is what I found and how confident I am."
- Aloud, no chart needed (D7): input tokens are one fifth of output on every listed Claude model, not half, so output costs five times input (DW-092 item 2, H, FACTS:claude-output-input-ratio); a cache read is 10% of base input by default, 5% on Opus 5.5 and Sonnet 5.5 and 2.5% on Fable 5.1, so say "about a tenth, less on the newest tiers" and never 5% or 50% as the rule (item 3, H, FACTS:claude-cache-and-batch-pricing); and §7872 has two figures, not one: aggregate gift loans between individuals at or below $10,000 are outside the section on that day (not for loans used to buy or carry income-producing assets), and $100,000 is the separate figure at or below which the imputed interest is capped at the borrower's net investment income, treated as zero if that income is $1,000 or less (item 5, M, FACTS:irc-7872-thresholds).
- Moved to §01's opener at 6:26: temperature zero is an accepted API value and is still not fully deterministic (item 4, H). The page now says the same at the slider.
- Moved to §02's opener at 6:35, where the chart is on screen: Fable 5.1 costs $10 / $50 per million tokens and Opus 5.5 $4 / $20, two and a half times, not "six times", and the multiple moves whenever either price does, so read the prices off the chart (item 9, H, FACTS:claude-api-price-fable-5-1 and FACTS:claude-api-price-opus-5-5); the Intelligence Index is Artificial Analysis's, a weighted average of 10 evaluations scaled 0 to 100, and the "83 to 81" figures were LiveBench's, a separate contamination-limited benchmark of 23 objective tasks in 7 categories; Arena (formerly LMArena) is a third board, built from human pairwise preference votes (item 11, M, FACTS:aa-index-definition and FACTS:arena-rename).
- In writing to the class after the session: items 1, 6, 7, 8, 10 and 12 of DW-092.

## sCold (Cold open, 6:06 PM, 8 min) [8:06 CT]

### Flow
- 8 min, identical every session. Do not vary it, survey the room, or collect anything else - the five-week comparison needs it unmoved.
- Element: `#sCold`, `.ritual` (`t-cold-open`, `timed-ritual`). Opener: "Same question every session. Five minutes, nobody talks, then we look."
- Five minutes silent, then "Analyse what I typed". The page renders the eight checks the room heard on 08-31; it scores nothing.

## s0 (Retrieval bridge, 6:14 PM, 7 min) [8:14 CT]

### Flow
- Element: `#bridge` (`t-s0`, `retrieval-bridge`). Opener: "Three questions, no notes. Wrong and committed beats right and read."
- Item 1, tokens: which side of the price is dearer. The room heard "half" on 08-31 (DW-092 item 2); the key says output is five times input on every current tier, so the 6:03 correction lands again here as retrieval. Item 2, context: what travels with a message; the key says all previous history plus the new message, all billed as input (DW-092 item 10); say it with the definition, which also counts the answer: the window is all the text the model can reference when generating a response, including the response itself, and it is not the input box (FACTS:context-window-definition). Item 3, the new-chat rule: your ten-to-fifteen-turn working rule, and the key names it as a heuristic, then gives the two documented reasons, the re-sent history and the vendor's context-rot statement. All three were taught 08-31 (tokens and price 02:12 to 02:22; memory and chat length 01:49 to 02:01; the restart rule 01:50 to 01:57).
- Reveal all three only after the room has typed; the reveal is all-or-nothing on this page. *(As taught on 2026-09-14; see the 2026-10-11 change above.)*

## s12 (Baseline capture, moved up, 6:21 PM, 5 min) [8:21 CT]

### Flow
- Element: `#s12` capture panel (`t-s12`, `timed-ritual`), "Copy baseline record". Opener: "This is the one thing tonight you cannot do later. Task, unassisted minutes, output. Copy the record to your notes."
- The record's 40% line is labelled an assumption on the page; say it aloud once.

## s3 (§01 Temperature, 6:26 PM, 9 min) [8:26 CT]

### Flow
- Poll P1 before the on-page vote: "Same prompt to the same model twice, an hour apart. Substantially the same / may differ materially."
- Element: `#stanceVote` (`t-s3`, `prediction-commit`), then the slider `#temp`. Opener: "You watched me set this to 0, 0.8 and 1.6 two weeks ago. Now you set it."
- Deliver DW-092 item 4 here. The slider's zero setting now says "greedy: top bar every time; real APIs still vary".
- After the vote the page lists seven sources of run-to-run difference. Read two aloud, memory and the version, and point at the third consequence card: temperature is not yours to set in the chat product or, on current models, in the API.

## s5 (§02 Cost per finished task, 6:35 PM, 10 min) [8:35 CT]

### Flow
- Deliver DW-092 items 9 and 11 with the chart up.
- Element: `#frontierChart`, then the estimator (`t-s5`, `parameter-sandbox`). Poll P2 at the tier decision: "Which tier will your final-project workflow use? Sonnet 5.5 / Opus 5.5 / Fable 5.1 / another vendor / undecided." (Names per FACTS:claude-model-ids-and-retirements.)
- The benchmark-task block (`#benchKinds`, six example prompts in the shape of the index's question kinds) is read, not run: point at Kind 06 as the nearest to their week, then go to the chart. The kinds are described in general terms at M and are on the DW-118 re-check list.
- Finding 02's token-count clause is gone; quote only the two per-task costs. The estimator is a task mix: move the judgment slider live, the point is the share, not the list price. The index scores and OpenAI rates carry an August date (DW-118).

## s6 (§03 P.T.C.F, 6:45 PM, 10 min) [8:45 CT]

### Flow
- Element: the assembler (`t-s6`, `builder-assembler`). The worked prompt explains the in-plan Roth conversion to David; the claims it states are under Verify before teaching at s10. Opener: "The eight checks you heard last time collapse into four letters."
- Poll P3 before the persona evidence: "Which P.T.C.F element do you leave out most often? P / T / C / F."

### Facts
- Zheng and colleagues: 162 roles, four model families, 2,410 factual questions, no gain from personas on objective accuracy (H, ACL abstract).

## s6b (§04 Score your three templates, 6:55 PM, 15 min) [8:55 CT]

### Flow
- Element: the builder `#fixtures` (`t-s6b`, `builder-assembler`), then the editor. Opener: "Three prompts, four dials each. Watch what specified and checkable adds." Take F2, meeting notes, from gestured at to checkable on Format, then on Context; the prompt redraws each time. "Load this version into the editor" hands it to the rewrite editor, whose scaffold is unchanged.
- 7:10 group report, 2 min. Poll P4 instead of a spoken round if the room is large: "Your weakest element across the three prompts: P / T / C / F."

## Break (7:12 PM, 15 min, posted as "back at 7:27") [9:12 CT]

## s8 (§06 The interview rewrite, 7:27 PM, 10 min) [9:27 CT]

### Flow
- Element: `#cbWrap` copy box, `#bsell` (`t-s8`, `builder-assembler`), the diagnostic `#promptIn`. Opener: "Ask it to ask you questions. You saw me do it building a skill; now it rebuilds your prompt." The worked task is the 3 October 2024 Roth conversion memorandum read against the 2026 plan description, and the eight questions the model asked back open one at a time as clicked (the page labels the capture with its model and date); "Reveal the rest" opens the remainder. The reverse-prompting starters (`#rpStart`, `t-s8b`) are for the async reader unless time allows one.
- Say the data rule aloud before anyone pastes into the diagnostic: no real client data and no identifying information enters any AI tool in this course, synthetic or de-identified facts only. The on-page panel that said so is gone by instruction (2026-09-13); the hub and Session 1 still carry the rule.
- First to drop if behind: show the wrapper, skip the eight-question reveal (three minutes).

## s10 (§07 Citation failure types, 7:37 PM, 12 min) [9:37 CT]

### Flow
- Instructor-led; one learner runs one check aloud. Element: `#triage` (`t-s10c`, `multi-column-sorter`). Poll P5 before the reveal: "How many of the six citations would you have accepted as authority? 0 to 6." The six items are what an assistant returned for the age at which Meg and David must start required minimum distributions: two sound (SECURE 2.0 §107 and T.D. 10001), one right section and wrong cohort (age 73 where the applicable age is 75), two instructions cited as law (Publication 590-B and the Form 8606 instructions) and Kessler, fabricated.
- The live-run prompt asks for the authority that sets the required minimum distribution age for a person born in 1968, Meg's cohort. Before this slot, work through the verification list below; the page no longer carries it.

### Verify before teaching (moved from the page 2026-09-13; the on-page gate is gone by instruction)
- The §07 triage key states five authorities as holdings and one case as a deliberate fabrication, so that citation failure can be taught; nothing else in this session is stated as a holding. Check each against primary authority before answering it in class.
- SECURE 2.0 §107 (IRC §401(a)(9)(C)(v)) as key items 1 and 3 state it: the applicable age is 75 for anyone born in 1960 or later, so Meg (born 1968) has a first distribution year of 2043 and a required beginning date of 1 April 2044, and David (born 1967) a first distribution year of 2042 (CASE.md §F.1, §F.4, M). Item 3 plants age 73 as the wrong cohort. Confirm the statute's text and its birth-year line.
- T.D. 10001 (July 2024), Treas. Reg. §1.401(a)(9)-2, key item 2: the final regulations confirm 75 for births on or after 1 January 1960 and leave 1959 to a proposed rule (CASE.md §F.4, M). Confirm against the Federal Register text before saying the 1959 point aloud.
- IRS Publication 590-B and the Uniform Lifetime Table, key item 4: the key says the publication is an instruction, not law, and works Ruth's 2026 distribution as $192,000 at 31 December 2025 divided by the factor 17.7 for age 83, which is $10,847 (CASE.md §F.6, M). Confirm the factor in the current table.
- IRC §408(d)(2) and the Form 8606 instructions, key item 5: the pro-rata rule is in the Code and the instructions only explain the reporting; David's base would include the $210,000 pre-tax rollover IRA, and a 401(k) balance is not aggregated (CASE.md §C.3.5, §E.1, M). Confirm the aggregation rule against the Code.
- IRC §4974(a) and SECURE 2.0 §302, closing the Kessler item (key item 6): the excise tax on a missed distribution is 25% of the shortfall, reduced to 10% if corrected within the correction window (CASE.md §F.4, M). Confirm both rates and the length of the window.
- IRC §408A(d)(3) and §402A(c)(4) as the authority behind the in-plan Roth conversion explanation built in §03: a conversion is taxable in the year it is made and an in-plan Roth rollover is irrevocable (CASE.md §E.1, M). The worked prompt also states the 24% marginal rate, that Illinois does not tax the converted amount (35 ILCS 5/203(a)(2)(F)) and that Medicare premiums two years later can rise (CASE.md §E.2, §E.3, §F.3, M). Sound as stated, and stated without its limits: 24% is the Coles' 2026 marginal rate, not the rate in a later conversion year, and the premium effect depends on the IRMAA tier.
- Portability: the §05 triage item asks whether a client can still elect portability for a spouse who died in 2021. The authority is Rev. Proc. 2022-32 (FACTS:portability-late-election, M): an estate not required to file under IRC 6018(a) may elect portability on a complete Form 706 filed on or before the fifth anniversary of death, which superseded Rev. Proc. 2017-34's second anniversary; later relief only by private letter ruling under Treas. Reg. 301.9100-3, and none of it for an estate that must file under 6018(a). The fifth anniversary of a 2021 death falls during 2026, so for any session held after 2026 the simplified route has closed for every 2021 death. Neither "permanently lost" nor "still inside the five-year window" is the right answer; the page's key says the first is not always true and that the route has closed, and it names four omitted facts: the exact date of death, the estate's size, whether a return was filed and whether the estate was under the filing threshold. The v5 Cole file dates Dorothy Cole's death 9 March 2021 (CASE.md §C.3.5), so her fifth anniversary passed on 9 March 2026; she was David's mother, not a spouse, and no Cole estate is in view, so do not apply the window to the Coles.
- From the case dialog (its gate is off the page too, batch 3, 2026-09-13; the other five lessons still carry theirs, DW-056): the Illinois estate tax exclusion is $4,000,000, a threshold not a credit, not indexed, with no portability, and the Coles' $3,935,800 including insurance sits $64,200 below it (CASE.md §E.2, §H.4, M). Every tax and legal characterisation attached to the case is a question, not a holding; you sign the slide, not the model.

### Facts
- Kessler v. Commissioner does not exist; labelled on the page and in the footer as a deliberately fabricated citation used as exercise material.

## s7 (§05 Triage, 7:49 PM, 8 min) [9:49 CT]

### Flow
- Element: `#quiz` (`t-s7`, `commit-first-mcq`). Poll P6 on item 7 before anyone clicks: "Underspecified / Specified, unverifiable / Specified and verifiable."
- §08 now runs in the room as your live audit at 7:57 PM (below). There is no pairing to announce.

## s11 (§08 Live audit, 7:57 PM, 8 min, taken from the reserve) [9:57 CT]

### Flow
- Element: `#rubric` then `#peer` (`t-s11`, `work-along-gate`). Opener: "One prompt, audited in front of you. Score along on the four criteria."
- Have one prompt prepared; ask first whether anyone will offer theirs. Run the eight-item self-audit on it aloud, then the room scores the four live-audit criteria 0 to 3 and reads the total.
- Nothing is shared between classmates and nothing runs between sessions (decision of 2026-09-13, superseding D5).

## Reserve (8:05 PM, 17 min) [10:05 CT]

### Flow
- Q&A and demonstration. The room's best 20 minutes in Session 1 were here; the live audit took eight of them.

## s12 (§09 Part 1 and the reading, 8:22 PM, 5 min) [10:22 CT]

### Flow
- Element: `#checklist` (`t-s12b`, `work-along-gate`). Announce the Session 3 reading aloud; the page no longer lists it: Wolfram, "The Concept of Embeddings" and the opening of "Meaning Space"; Kitces (January 2025) on AI notetaker adoption and satisfaction; Iskowitz (July 2025) on notetakers and compliance.
- Closing question at 8:27, aloud, one to three answers; the page no longer carries it: "Your rewritten template just produced a clean, well-sourced answer on David's in-plan Roth conversion. Name the one check you would still run before any of it reaches Meg, and say why the answer looking right is not a reason to skip it." Stop by 8:50.
