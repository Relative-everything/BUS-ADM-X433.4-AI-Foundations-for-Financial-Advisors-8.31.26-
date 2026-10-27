# Term-start checklist

What has to happen outside this repository, or on a machine this build
environment is not, before the 2027 cohort's first session. It replaced the
deferred-work rows that no code change could close (DW-096, DW-149, DW-150,
DW-180, DW-183, DW-186, DW-187 and the source-attestation rows) on 2026-10-27.
Off-site dates and deadlines stay out of the repository by rule (PEDAGOGY §1.12,
D9); this file names the task, never the date.

## A. Canvas and syllabus (instructor)

1. State Part 1's due date once, in the syllabus and in Canvas, and nowhere else.
2. Say in the syllabus and the first announcement that a paid Claude account is
   required before Session 1 (PEDAGOGY §13.1, 2026-10-11), and point at the setup
   page (`session-0.1/`) with the Homework 1 baseline worksheet.
3. Post the readings from the cards on each lesson page; the list is
   `docs/next-term/readings.json`.

## B. Zoom (instructor)

4. Switch on speaker-labelled transcripts before every session.
5. Build the four polls per session ahead from `instructor-notes/session-N-polls.md`
   (`instructor-notes/zoom-poll-setup.md` has the formats); no student co-hosts.
6. Within 24 hours of each session, export transcript, chat and poll report into
   `audit/2027-session-N/` (`audit/README.md` has the layout).

## C. The class API key (instructor, once)

7. Issue a workspace API key from the course workspace and fund its balance; the
   lesson pages promise that it draws on a class balance that stops when spent.
8. With that key, run the Kalai probe and the free-form box on Session 1 and the
   *See the request* box on Session 4 against `claude-opus-5-5`, note the output
   token counts the console prints, and decide whether the 2048-token headroom
   and the Opus 5.5 default stand (DW-186). If a probe stops on `max_tokens` with
   no text, raise the floor in the `LM v2` fence on both pages in one commit.

## D. One sitting at a browser and a terminal (instructor, before Session 1)

9. **Tags.** From a local clone whose credential can write tags:

   ```
   git fetch origin main
   git tag -a session-1-delivered-2026-08-31 8442160 -m "Session 1 as delivered"
   git tag -a session-2-delivered-2026-09-14 0955c7b -m "Session 2 as delivered"
   git tag -a session-3-delivered-2026-09-21 9f81086 -m "Session 3 as delivered"
   git tag -a session-4-delivered-2026-09-28 c8b87b7 -m "Session 4 as delivered"
   git tag -a session-5-delivered-2026-10-05 ac94b6b -m "Session 5 as delivered"
   git tag -a fall-2026-final da7b003 -m "Fall 2026 final state of main before the next-term-2027 run"
   git tag -a next-term-2027-ready 0831bcd -m "2027 cohort build, reviewed"
   git push origin --tags
   ```

   The cloud container accepts a tag dry-run and answers HTTP 403 to the push.
10. **Readings.** Open each row of `docs/next-term/readings.json` (the three video
    links and the Kitces, Wolfram, OpenAI and IRS pages could not be opened from
    the build environment), set `status` from `tentative` to `assigned` or drop
    the row, then `node scripts/build-readings.mjs && node scripts/inject-sources.mjs`.
11. **Sources.** Work `docs/source-verification-queue.md` from the top: open the
    source, confirm the figures the record's `used_for` names, then
    `node scripts/attest-verified.mjs <key>` at the terminal. The figures the
    build could not reach and should be read first: Wolfram's *information content*
    quotation and the 400,000-weights passage (Session 1 and 2; also repair the
    flattened inner quotation marks at `session-1` A2 and take the span out of
    `scripts/verify-wolfram-quotes.py`'s `PDIM_FIGURES` whitelist), Dahl et al.'s
    *>800,000* and Charlotin's count (Session 2), the Artificial Analysis index
    behind both cost charts, the OWASP 2026 edition link for `src-owasp`, Zhao et
    al.'s arXiv page for `src-zhao`, the twelve Session 5 records at M, and the
    fifteen moving-target records with no retrieval date that `verify-sources`
    lists as ADVISE.
12. **FACTS.** The week before each session:
    `node scripts/verify-facts.mjs --as-of <session date> --session <N>`, then the
    ritual in MAINTAINING "The week-before-each-session ritual". Between terms the
    same check reports the stale records as ADVISE and exits 0.
13. **Captures.** The week before each session, re-run that case page's captures
    with `scripts/recapture.mjs` and relabel the model id and date on the page
    (MAINTAINING "Re-capturing a model output"). Case 5's pre-change baseline ran
    on `claude-sonnet-4-5-20250929`, retired 2026-11-30.

## E. For the record only

14. Whether the Fall 2026 corrections post (`instructor-notes/session-3-canvas-posts.md`
    Post 2) went up. Nothing follows from the answer; the 2027 run sheets carry
    every correction as a verified-facts card.
