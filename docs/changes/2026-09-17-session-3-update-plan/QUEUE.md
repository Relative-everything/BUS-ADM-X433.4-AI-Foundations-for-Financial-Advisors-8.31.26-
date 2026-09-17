# The queue: what to do before Fable returns, and what to run when it does

Written 2026-09-17. Fable resets 2026-09-19. Session 3 is taught 2026-09-21, Session 4 on 2026-09-28.

## The short answer

**The Session 3 Fable prompt has no blockers. You can paste it the minute the allowance is back.**
Nothing in it waits on a decision from you.

**Amended 2026-09-17:** the merge that prompt described was done in Opus, so the Session 3 prompt is
now `FABLE-PROMPT.md`, a single pass that runs to completion. See the run order below.

## Before Saturday: 35 minutes of your own time

None of these blocks the Fable run. All of them make it worth more, and three of them are things no
model can do at all.

| # | Do this | Minutes | Why it cannot wait |
|---|---|---|---|
| 1 | Open Word, Excel and PowerPoint and confirm Claude's add-in exists in each, reads the open file, and proposes a change you review before it lands. Write down yes or no per app. | 10 | §08 is one of the three interactions the room runs on Monday. If an add-in does not work as described, the silent run fails live and you find out in front of them. Feed the answer into Prompt 1. |
| 2 | Read anthropic.com/news/claude-text-watermark and write down one line: is Claude output watermarked, and does the watermark identify an account. | 5 | You told the room in Session 1 that it traces to their account. Session 4's page says the opposite and marks itself unconfirmed. Until you have read it, the only safe correction on Monday is the narrow one: it does not identify an account. Feeds Prompt 2. |
| 3 | Sign or strike §09's two verify items: 18 U.S.C. §2511 as a federal one-party floor, and the confidentiality duty as applied to a documentation vendor. | 20 | You teach recording law Monday from a page that says these need your sign-off first. |
| 4 | Turn on speaker-labelled Zoom transcripts. | 1 | One checkbox. Every future audit has been running half-blind for two sessions without it. |
| 5 | Build the four Zoom polls from the run sheet. | 20 | A poll configured live already failed once. These are the only decision rules the course has ever had. |

Items 1 and 2 are the only ones that change what Fable can do. **If you are short on time, do those
two and skip the rest until Sunday.**

## The run order once Fable is back

Run these in sequence, in separate sessions, on branch `claude/session-3-update-plan-k1xbqs`.
Each one ends with a handback, so you can stop after any of them and still be in a good state.

**Superseded 2026-09-17.** The §01/§02 merge was done in Opus after this was written, so prompt 1
below no longer exists. Run `FABLE-PROMPT.md` instead: one prompt, runs to completion, finishes
Session 3. Prompts 2 and 3 are unchanged and are for after Monday.

| Order | Prompt | What it does | Roughly |
|---|---|---|---|
| 1 | `FABLE-PROMPT.md` | Polishes the whole Session 3 page, gives the three non-advisors a parallel track, works both audit findings registers, verifies every interaction in a browser. | 1 evening |
| 2 | `fable-prompt-2-session-4.md` | Session 4 pre-flight: the cold open you chose, every false Session 1 baseline premise, the grade-weight violation, the duplicate code, the minute arithmetic, and a real run sheet. | 1/2 evening |
| 3 | `fable-prompt-3-cleanup.md` | Optional. Repository hygiene that helps every future session: self-hosted fonts, the spine decision, the remaining parity divergences. | whatever is left |

**If you run none of them, Monday is still fine.** The page already teaches at 62 planned core
minutes with the merge done, the run sheet is written against it, and every gate is green. The Fable
pass is polish on a page that works, not repair on a page that does not.

**If you only get through Prompts 1 and 2, you are in better shape than you have been for either
prior session**, because Session 4 currently has an 11-line run sheet and the largest core in the
course.

## Two things you have now decided

Both are baked into Prompt 2. Recorded here so the reasoning survives.

**Session 4's cold open becomes choose-one-of-four.** Four beginner-written prompts on screen, the
room clicks one, the eight checks render against the one they picked. Same 8-minute slot, same
standing-ritual framing, floor of one click. The paste version has run zero times in two sessions and
the five-week comparison it protects has no data points, so there is nothing to preserve by keeping
it. The choose version starts a series that can accumulate because it will actually run.

**The Session 1 baseline stays unreconstructed, and Session 4 leans on its 90-minute fallback.**
Session 4 refers to "the baseline minutes you recorded in Session 1" in nine places. That capture
never happened. The cost calculator already defaults to 90, so the fix is to reword the prose to ask
for an estimate and name the fallback, rather than to spend class minutes recapturing a number or to
depend on homework that has been the course's weakest signal.

## What stays on your desk regardless

These are instructor-only and no prompt covers them.

- Post the Session 1 corrections backlog in writing. Twelve items were owed and never delivered; two
  more came out of Session 2. The run sheet says which two to say aloud.
- Announce the standing pre-class window, 5:45 to 6:00 PT, every week. This is the single cheapest
  protection for the opening twenty minutes, which is where both prior sessions were lost.
- Fix the Part 1 due-date contradiction in the syllabus and in Canvas. **Not on any page.** The
  repository is deliberately silent on dates, and adding one would reinstate the two-sources-of-truth
  failure the purge rule exists to prevent.
- Confirm the seven-step objective's exact wording against the syllabus. The string the audit quotes
  appears nowhere in the repository.
- Export the Zoom transcript, chat log and poll report within 24 hours of teaching.
