# Instructor notes, verbatim: Session 4 update notes, 2026-09-27

The notes file as attached to the kickoff, unedited. No learner is named and no platform or retired name appears, so no substitution was needed. The ask in chat that accompanied it: analyse and implement the attached notes, keep or improve the interactivity, defer to the builder's judgement where a change should not be made and list those, return the fully updated repo, a fully built ultra-simple glanceable colour-coded teaching aid, the changes not made with reasons, and what remains to do before class.

```markdown
# Session 4 Update Notes

These are my review notes on the Session 4 lesson and its teaching aid. Section names are as I recalled them while clicking through the lesson; match each one to the actual section in the repo. Section-level items (Part E) are listed in the order I reviewed them.

**Tags used below**
- `[VERIFY]` research and cite before building. Never make up a source.
- `[DECIDE]` make the call, then report the decision and your reasoning back to me (Part F).
- `[TEACHING AID]` goes in the Session 4 teaching aid document, not the lesson HTML.

---

## A. Global rules (apply to every change below)

1. **Interactivity over text.** In all these updates DO NOT make the session more text heavy. Keep at minimum the same level of interactivity. Think creatively about how to make the changes below without losing interactivity, and certainly do not just add more text inside clickable boxes. Creative, memorable interactive sections are the priority: I would rather have much simpler content with more interactive sections than exhaustively detailed, comprehensive content that is all text with boring interactions.
2. **Learn my taste from prior rounds.** Look at my prior rounds of updates (git history and changelog for earlier sessions) to understand what I like and dislike, and how I remove text, add bullets, and make things more concise where possible while focusing on interactive elements.
3. **Keep the Meg Cole through-line.** I like the thread of this simple sentence a lot: "Meg Cole, 64, owns a Rockford aerospace-fastener maker worth $55 million. A competitor wrote asking to buy it." Make sure this continuity continues through the Session 4 lesson in all these updates. Where I want changes, adjust the scenario to fit those requirements (add or shorten), but keep the core the same so students get familiar with it while working through the lesson.
4. **Claude is priority.** I recommended Claude to students and this class uses Claude, so focus on Claude. It is great to have the other models there: do not remove any of them, just know Claude is priority.
5. **Sourcing standard.** Never make up a source. Vital content (Section 3 especially) must be strongly cited. Any real-world incident used as evidence must be cross-checked against at least 3 independent sources.

---

## B. New session-wide additions

1. **Cybersecurity / SynthID.** Need some content on cybersecurity and SynthID. Perhaps I do a live worked example of SynthID showing how embedded weightings during generation make the watermark. (Connects to Appendix D1.)
2. **API usage: Gemini free API add-in.** I want to show API usage somehow. Ideally just add the Gemini free API to the Session 4 lesson as the add-in at the top, like the other sessions with the API add-in. I'll spend 5 to 10 minutes explaining API access so students at least know what it is. (Possible tie-in: 06 calculator, see Part E.)
3. **Personal vs enterprise, dead obvious.** Make sure a section, or the session overall, clearly displays the differences between personal Claude (i.e., $20/month) and enterprise (seat price + API pricing) `[VERIFY current pricing structure]`, and how security changes between them.
   - Really focus on exactly what security an enterprise account has. Perhaps a checklist showing how secure each thing (ZDR, SOC 2, etc.) makes it, and visualize where each step adds security vs the personal account.
   - Show how you can use client data on a fully secured enterprise plan.
   - Section 3 does this a bit, but make it dead obvious so students clearly understand enterprise vs personal.

---

## C. Teaching aid document (Session 4) `[TEACHING AID]`

Update the teaching aid document for Session 4.

1. **Follow the repo.** I will mainly teach out of the repo, so the sequence should show that and remind me of the core things I need to do in each section that are not in the repo. I don't want to read off the screen. I want to read the teaching aid and have it give me ideas to lecture on while interrupting the session work.
   - Flow: Session 4 Section 1 > do the interactive HTML > lecture on its application for a few minutes > Section 2 > lecture > Section 3 > etc.
2. **Fill 3 hours.** I need to fill 3 hours, but I want it to be good content the whole time.
3. **Format.** Ideally a couple of bullets of lecture ideas/notes for each section. Keep it super simple so I 100% understand the lecture points.
4. **Tie to CFP planning.** Use the lecture points to tie the repo back to CFP planning, since the repo is very heavy on AI itself and less on how to use AI in planning.
5. **Section 3 run flow.** Give me a simple flow for how to run Section 3. I'd think: click through each model and all options one at a time to show the differences.
6. **D5 reminder.** Remind me to tell an advisor story: I know someone who had a data breach recently. (Just a cue for me; I'll supply the story.)
7. **Page 2: live work-along (de-identifying a client transcript).**
   - I take a client transcript / case notes, clean it manually on a Google Doc I screenshare to remove any NPI, then use a personal AI account to run some simple questions on the anonymized data.
   - `[VERIFY]` Only confirm whether this is legal and allowed (include in the check: screensharing the un-cleaned transcript to the class, not just the AI step). Then add the teaching segment so I can run it live.
8. **2 to 3 outside-repo live demos.** Think of 2 to 3 other teaching segments outside the repo that I can run as live demos, just to mix it up. Think about lesson sequence and how to space these out (alongside B.1, B.2 and C.7) to avoid a boring lecture for the whole lesson.

---

## D. Reading for me (answer in chat, not in the repo)

`[VERIFY]` Recommend me 3 concise pieces of reading so I have a complete understanding of the regulatory landscape I will be teaching in this session.

---

## E. Section-by-section changes (in the order I reviewed them)

### Section 1: Which AI rules bind you
- `[DECIDE]` Why does this mention the EU AI Act? That seems not applicable to US CFPs. If it is applicable, keep it; if not, replace or remove it. (Decide together with the D1 EU callout below.)

### Section 2: NPI
- **Keep:** Really good section already. The visual in this section is amazing, almost perfect.
- Use more examples for NPI, including a few harder ones that are not quite proper nouns (e.g., the $55M number is a great example of a harder one to catch).
- Add a little more content and make this section longer, since it is so good.

### Section 3: The contract
- **Keep:** This is very good.
- `[VERIFY]` Reverify every claim in it for all models and settings, and make sure this section is very strongly cited, since it covers a lot of vital information.
- Claude is priority; keep all other models (see A.4).
- Teaching aid run flow: see C.5.
- `[DECIDE]` Since it mentions a contract, consider a new section that shows an enterprise Claude or GPT contract: what goes into the contract, who signs, what binds them, and how having a contract changes the advisor's FINRA duties. (04 Vendor oversight may already cover this; see below.)

### Appendix D5: Tabletop
- Consider showing example language of the breach plan and what needs to be included in it.
- `[VERIFY]` Give a historical example of a famous data breach and how they correctly or incorrectly applied these legal principles to alert clients.
- `[VERIFY]` If saying a specific trigger requires addressing it, give a citation on precedent, or why legally that step is the latest you could report and why the next deadline would breach legal duty.
- I want this section black/white so students actually learn something, even if simplistic, vs the grey area.
- Teaching aid reminder: see C.6.

### Appendix D6: De-identifying
- Add a "reset" button so I can reset this section and run it again easily without reloading the whole page.

### 04: Vendor oversight
- **Keep:** I like this section.
- `[DECIDE]` This might achieve the contract detail I wanted in Section 3. Consider whether that new section is still needed or if this section already covers that goal.
- **Bug:** the "Copy email to vendor" button just copies "All six questions are answered yes. Keep the documents that show it." Fix this. Either make it draft an email, or have it draft an ultra-simplified sample contract (just a few sentences) that shows, sentence by sentence, how language for each of the 6 items in this section might look in a real contract with Anthropic.

### 05: Threats / hidden instructions
- **Hidden text:** good. Perhaps list 1 to 2 ways attackers actually hide text (e.g., white text or embedded text). Think of the most creative ways, like text embedded in images, or strange ways email hackers get commands to run on AI assistants that check email.
- **Fixes:** explain how I would add them. For each fix, show example prompt language I would put in the skill or prompt I run for the email check, and how that language prevents prompt injection and other common techniques.
- **Video call scam:** `[VERIFY]` Find exact real-life examples with dollar amounts lost to scams like this with a fake video call. Students will not believe this is a real risk, so use real-life evidence to make sure it is front and center. Do not make up a source: cross-check at least 3 independent sources to confirm the example used is a real case.
- `[DECIDE]` Maybe the evidence part is covered in "Four attacks, one wall." Decide what is needed in addition and whether any changes are needed, or if this evidence is enough. Ideally list the $ cost of damages for each attack as well, to give students a sense of scale.

### Appendix D1: Watermarks
- **Keep:** Good overall. "One word, three rounds" is great, very understandable.
- Add another part that shows how they watermark both images and text, not just text.
- **Fix "Only the right key shows the mark":** this is very confusing and not simple enough for students to understand. Make it dead obvious and very clear what is going on, how each key differs, and the impact of a heavy rewrite.
- `[DECIDE]` If the watermarks are why the EU law is in Section 1, make that a clear callout of why EU law applies to students in this CFP class.

### Appendix D2: Watermark limits
- Mix up the answer order: questions 1 to 4 and 5 to 8 should vary between "many ways" and "one right answer." Right now it is 4 in a row of each, so there is not much guessing to do.
- Change the wording "A detector result reaches you. What goes in the file?" Make it clearer: what is a detector result, did you find the pattern or not, and if so what does that mean.
- `[DECIDE]` Does this make sense? Users seemingly would not be able to tell if content has a mark or not, so is this relevant? Make sure it is relevant for CFPs and understanding the mark. Don't tell them to check for watermarks, since they won't have the key to know.
  - `[VERIFY]` Review note: Google's Gemini app lets signed-in users check images, video, and audio for SynthID, but only for content made by Google's own models. Confirm current availability and factor it into this decision.

### 06: The verification burden
- `[VERIFY]` Make sure this calculator is correct.
- `[DECIDE]` Perhaps this is an area to show the API partially; maybe not.
- "Price your own deliverable" is very good. Make the language a bit simpler if possible. Keep the record vs "document audited grounded answers" framing (or something like that), using language and vocab taught in the class that students are more likely to understand.

### Appendix D3: Source staleness
- **Keep:** Good section.
- `[VERIFY]` When something is stale, give updated guidance. E.g., if temperature is no longer a good setting, explain which effort level is best for essays using Claude, so students understand old vs new guidance.
- `[VERIFY]` Even better: add another subsection in D3 listing a few items that were widely accepted guidance in 2023 vs new guidance as of around September 2026, to show broadly how the AI landscape has evolved since 2023. Perhaps explain loop engineering vs prompt engineering here as well.

### 07: The record
- `[VERIFY]` Explain where these 4 items are sourced from: what documentation says these are all needed for re-run examination checks? What is the minimum needed?
- Perhaps show how a skill can be made to contain these items, with a simple copy/paste block students could take and put into skills to make sure they keep logs of data for future examinations. This looks like it exists now, so just consider whether it needs updates, by researching any updated legal guidance and ensuring accuracy and citations in this section.

---

## F. Report back to me when done

1. Your decision on each `[DECIDE]` item, one line of reasoning each:
   - EU AI Act: keep, replace, or remove (Section 1 + D1 callout)
   - New contract section vs 04 Vendor oversight coverage
   - "Four attacks, one wall": is the evidence enough
   - D2 detector question: relevant for CFPs or not
   - 06: show the API partially or not
2. Legality result for the live work-along (C.7), with citations.
3. Every real-world case used (video call scam, D5 breach example) with its 3+ independent sources.
4. The 3 readings (Part D).
5. Confirmation the teaching aid document was updated per Part C.
```
