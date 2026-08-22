# Changelog

Every substantive revision to the course materials, newest first.

Each entry corresponds to one or more commits. For the exact character-level
diff of any change, see the
[commit history](../../commits/main) on GitHub.

Format: `## YYYY-MM-DD` with changes grouped by session.

---

## 2026-08-22

### Session 0.1 · The Control Surface (new)

- **Session 0.1 built and published** at `session-0.1/index.html`. It runs
  *before* Session 1, so it carries no retrieval bridge; the page says so. A
  150-minute block with 120 allocated across twelve sections, which is a
  second block format for the 0.x series and is the one parameter this lesson
  does not share with Sessions 1 to 4.
- **Fourteen interactions across twelve component types**, including one new
  mechanism: `ctx-inspector`, the first three-pane component in the corpus.
  Twelve controls, twelve context blocks, three probe prompts. It renders the
  output as one captured base plus composed delta fragments rather than as a
  lookup table, because the legal configuration space is 38,016 states and a
  fifty-cell table would cover 0.132% of it. `scripts/state_space.py` ships
  with the lesson so that figure is reproducible rather than asserted.
- **Illegal states are greyed and visible, never hidden**, each with its reason
  printed next to it rather than only on hover. All seven dependency rules are
  live: no effort selector on Haiku 4.5, thinking locked on Opus 5 and Fable 5,
  thinking not disableable at xhigh or max, skills requiring code execution,
  research forcing web search, and the project blocks greying outside a project.
- **No token counts anywhere.** Window sizes are the only absolute numbers and
  they are sourced. Every per-block figure is an illustrative proportion of the
  window, badged and chipped L. Price per million tokens and knowledge cutoffs
  print `[UNVERIFIED, needs source]` rather than an invented figure.
- **Twelve footer sources**, with the memory article upgraded from M to H and
  the plugins article from UNVERIFIED to H, both per the verified evidence annex.
- New: `scripts/diff_case_block.py`, so the byte-identity check on the Cole
  block is reproducible instead of eyeballed. Current output: CASE.md block
  2,617 bytes, `sha256 5ea2282e`, both copies in the lesson identical.

### Session 0.1 · What is still open, in the order to do it

Read this first when you come back to the lesson. Everything below is known,
labelled on the page where it appears, and none of it blocks the file from
being on the site.

1. **Re-capture probe P2 and P3.** This is the one that matters. Both captures
   in `docs/probe-captures.md` contradict `CASE.md`. P2 was run against a
   prompt naming "David and Sarah Cole"; the canonical household is Meg and
   David Cole and there is no Sarah. P3 models a $12.0M interest with $1.2M of
   basis and a $1.2M seed gift against the canonical $7,200,000 pre-discount
   value, $240,000 basis and $650,000 seed. Both ship verbatim, because editing
   a transcript would make it a fabrication, and both are labelled on the page
   and in the footer as designed defects in the meantime. When you re-run them,
   the base strings are extracted from `docs/probe-captures.md` programmatically
   at build time, so a rebuild picks up new captures verbatim with no
   hand-editing of the HTML; what you retire by hand is the pair of on-page
   defect notices in section 4 and the two matching footer entries.
2. **Re-verify the twelve sources against the primary articles.** No source was
   fetched during the build. Every H chip inherits the 2026-08-20 verification
   recorded in the build spec's ledger and the annex. This is build-checklist
   item B1 and it is the largest thing the validators cannot cover.
3. **Fetch the body of `src-routing`**, support article 15363606, or cut the
   model-switching paragraph in section 2. Its URL and title are confirmed and
   its body has never been read, so the page currently claims only that the
   behaviour exists and is documented.
4. **Re-confirm the three starred plugin items** at support article 13837440:
   the built-in and GitHub-sourced marketplaces, the Customize action opening a
   Cowork task, and the Plugin Create walkthrough. They are marked with an
   asterisk in the section 7 instructor key.
5. **Walk the live settings interface on the morning you teach.** Record which
   memory experience your own account is on, because the new and legacy
   experiences are both live and put the toggles in different places. The cold
   open already asks the room to report which one they see.
6. **Decide about price per million tokens and knowledge cutoff.** Seven
   `[UNVERIFIED, needs source]` markers are on the page. The models overview
   carries both figures; nobody recorded them at verification.

### Session 0.1 · Timing and known defects

- **Sections 1 and 7 are over budget at the podium**, measured in a browser with
  every panel revealed: section 1 runs about 88 words per minute against seven
  minutes, section 7 about 124 against ten. Sections 4 and 8 read over only
  because the measurement counts material that is revealed on demand, chiefly
  the captured transcripts and the two demo fallbacks. A reallocation that
  keeps the total at exactly 120 and therefore keeps the validator green:
  section 1 from 7 to 9, section 7 from 10 to 12, section 4 from 16 to 14,
  section 8 from 10 to 8. Not applied, because the section map is the build
  spec's and changing it is a deliberate revision rather than a fix.
- **At 380px the topbar Case facts button is pushed off the screen**, by 150px
  in this lesson and 135px in Session 1. This is pre-existing chrome in the
  shared stylesheet, not something Session 0.1 introduced, and fixing it
  restyles every lesson in the repository. One media query at `#topbar` does it.
- **The prose-density figure the validator reports is not a prose measurement.**
  It counts markup as words, because the method never strips tags. Reported
  86.1 words per allocated minute; the tag-stripped section figure is 44.9.
  The metric is unratified and never blocks, but do not quote the reported one.
- **`restyle_sweep.py` has no ignore list.** It walks every `.html` under the
  repository, so any `node_modules` left in the tree fails the style gate on
  files that are not lessons. Keep build tooling outside the repository.

### Session 0.1 · Still to do outside the lesson file

- Ratify the 150/120 block for the 0.x series in the pedagogy spec, and close
  the open em-dash decision. Session 0.1 is the first new build since that
  decision opened; the file bans em dashes in new copy and keeps them verbatim
  in harvested corpus code and captured transcripts. All 32 in the file are
  accounted for that way and none are in new copy.
- Register `ctx-inspector` as component-bank entry 19, but only after it has
  survived one delivery. A mechanism that has run once is not yet a family.
- Add the 0.x series rows to the course document and rerun the
  assignment-alignment audit.
- Tag the lesson after it is delivered:
  `git tag -a session-0.1-delivered-YYYY-MM-DD -m "Session 0.1 as delivered"`.

### Site

- **The hub now carries a Session 0.1 card**, placed above Session 1 because
  0.1 runs before it. The card is marked as a primer so the numbering does not
  read as a missing session.
- Hub last-updated stamp moved to 2026-08-22.

### Repository

- **Four Session 0.1 input files moved onto their intended paths** out of an
  accidental `docs/docs/scripts/docs` nesting, and the empty tree deleted. The
  build spec, the verified evidence annex and the probe captures now sit in
  `docs/`, and the state-space script in `scripts/`. Pure renames, no content
  changed.
- `docs/session-0-1-progress.md` added: the build state, the authority order,
  and the open flags, so the work can be resumed from the file plus the commit
  history rather than from memory.
- **Style payload refreshed across all six existing pages.** Adding the
  `ctx-inspector` block to the shared component stylesheet changes the payload
  hash for every file carrying the managed fence, so the sweep necessarily
  rewrote them. Verified that in all six, every byte outside the fence is
  identical to what was on `main`: no lesson copy and no hub content changed.

### Checks that passed with no change needed

- Session 0.1 is clean against the full standing purge list, not only the name
  the build was given: no Okonkwo, Reyes, Adaeze or Ilesanmi.
- **The hub case-name drift is already fixed.** The maintainer notes still
  carry it as a known defect and the lesson-builder skill still lists it as
  repository backlog item 1, but `index.html` contains no retired name. It was
  resolved in the 2026-08-20 second pass. Both backlogs are stale on this point.

---

## 2026-08-20 (second pass)

A second audit, compiled independently against the same tree, found repository
and chrome work the first pass did not cover. Verified against the working tree
before acting: three of its twelve findings were already fixed, nine were real.
Text authored in this pass avoids em dashes; existing lesson copy is untouched,
since that policy is still open.

### Documentation
- **README.md rewritten for students and instructors.** It previously opened
  with commit discipline, tagging and maintainer workflow, which is the wrong
  front door for someone who just landed on the course. It now leads with the
  live link and covers what the lessons are, that nothing is saved so you must
  copy your own work out, how to use the core and appendix structure, the
  session index, the synthetic Cole household, how confidence chips and
  deliberate defects work, and an educational-use disclaimer.
- **MAINTAINING.md added** for the maintainer and contributors, carrying the
  repo layout, the publish model, commit and tag discipline, the pre-push gate
  with and without the lesson-builder skill, the shared-styling mechanism, the
  standing retired-names purge list, and the known follow-ups. It opens by
  noting that it is publicly served like everything else.
- **CASE.md added** as the canonical source of truth for the Cole household:
  every figure in one table, the document list, the question that stays open,
  and Session 1's block verbatim as the drift reference. Sessions 2 through 4
  carry shorter recall summaries by design; the rule is that their figures must
  match this file.

### Site
- **The changelog is now a styled page** at `/changelog/` instead of raw
  markdown. `scripts/build-changelog.py` renders it from `CHANGELOG.md` with no
  dependencies; every link in the hub and the lessons points at the page.
- **Every page carries a last-updated stamp** in its footer, so a student with
  a stale tab open can tell. Previously a months-old tab was indistinguishable
  from the current page.
- Hub Session 2 card read "Date to be confirmed" while the lesson itself states
  14 September 2026. The lesson wins; the hub now agrees.

### Lessons
- Completed the footer standard, copying wording from Session 2: the confidence
  legend was missing from Sessions 1 and 3, the verify-before-relying line from
  Sessions 3 and 4, and the synthetic-case declaration from Session 4's footer.
- Session 4 keeps its own longer confidence-legend wording rather than being
  normalised to Session 2's, logged here as a deliberate variance.

### Checks that passed with no change needed
- No retired case name appears in the hub or any lesson. Remaining mentions in
  `CHANGELOG.md` and `audit/` are the record of the retirement and are kept.
- No browser storage anywhere. No external request beyond the permitted Google
  Fonts. All internal links resolve. Hub card titles match every lesson H1.
  `.nojekyll` present. The Session 5 card links nowhere and cannot 404.

## 2026-08-20

Works the priority-ranked findings in `audit/AUDIT-2026-08-20.md`, an audit of
all four lessons run under the interactive-lesson-builder protocol. All four
sessions now pass the full scripted gate with zero failures, in DOM-execution
mode rather than the degraded static fallback.

### Critical
- **Repaired 30 broken internal cross-references.** The 18 August renumber
  invalidated every prose reference to a section number: 5 in Session 1,
  17 in Session 2, 2 in Session 3, 6 in Session 4. These sat in student
  instructions, quiz feedback and homework answer keys, so a student following
  them landed in the wrong place.
- **Restored Session 4's Part 1 completeness checklist.** The 17 August rebuild
  deleted its markup and left the JavaScript, which failed silently behind a
  guard clause. A seven-item submission gate had been invisible on the night
  the package is due.

### Evidence and legal apparatus
- **Implemented the chip-to-source contract**, which had never existed. Every
  confidence chip in the body now carries a key resolving to a numbered footer
  entry: 58 source entries across the four sessions, 133 chips wired. Session 1
  and Session 4 gained numbered footers; Session 2 and Session 3 had lists
  already and gained the keys.
- **Added the legal verify gate to Sessions 2, 3 and 4.** It previously existed
  only in Session 1, while the three sessions carrying Regulation S-P, the
  thirty-day clock, the Wiretap Act floor, the disputed all-party state count
  and the grantor-trust authority had none.
- Added illustrative-source badges to the simulated interactives in Sessions 2,
  3 and 4, and citation hyperlinks to Session 4's footer.

### Structure and pacing
- **Every session now allocates exactly 150 minutes**, against a parameter with
  zero tolerance. The core stays near an hour (67/67/70/70) and the appendix
  carries the balance, so the short version is unchanged.
- Added an instructor minute-budget table to each session, listing core and
  appendix rows separately with break and reserve excluded from the sum.
- **The cold-open ritual now runs in every session** at 8 minutes, rebuilt as
  one shared component. It previously existed only in Session 1, which defeats
  the point of a ritual.
- **Added 48 work-along cues to Sessions 2, 3 and 4**, which had none. Every
  section now names the action it expects, and Shift+U marks them all.

### Appendix architecture
- **Complexity tiers are live.** Every appendix section is tagged foundational,
  standard or advanced, and a control in each lesson filters by depth or hides
  the appendix entirely. The readout recomputes minutes for the selection, so
  the choice at 7pm is a number rather than a guess.
- **Fixed the appendix return path.** Sections linked back to where they came
  from but not forward, stranding an instructor who took one in place. Every
  appendix section now links both directions.
- Two new appendix sections: Session 3 C5 on hybrid search and re-ranking, with
  cumulative failure rates and an out-of-order guard; Session 4 D5, a
  Regulation S-P tabletop turning on when the firm became aware.
- Gave the restored Wolfram appendix a commit-first quiz; it was the only
  section in the course with nothing to do.

### Repository mechanics
- **Added the managed style fence to all five pages**, so one edit to the shared
  stylesheets now restyles the whole repository. Verified byte-identical
  rendering before and after adoption, then used the mechanism to ship a
  narrow-viewport fix for confidence chips.
- Tagged every interaction root with its task and component family, so
  diversity and density are now measurable rather than inferred.
- Normalised the Shift+U indicator across all four sessions and gave Session 2
  the visual confirmation it never had; wired Session 1's dead work-along cue;
  added reduced-motion support to Sessions 3 and 4; removed a duplicate budget
  table from Session 3.

## 2026-08-18

### Site
- **Core + appendix architecture across all four lessons.** Every lesson now splits
  into a core session that always gets taught and an appendix of optional depth.
  The core runs in roughly 60–67 minutes, so a lesson can be taught in a one-hour
  slot without deciding in advance what to drop; in a full block, appendix sections
  are taken in place. Each core section links down to the appendix material that
  belongs after it, and each appendix section names the two core sections it sits
  between and links back to that point.
- Appendix sections carry a `data-tier` attribute so per-section complexity levels
  (basic / advanced) can be added later without re-architecting.
- Added a pacing panel to every lesson: core minutes, appendix minutes and the
  total, computed live from the section minute chips.
- Nav rail now distinguishes core from appendix sections.
- Fixed the course hub, which still named the retired Okonkwo–Reyes case. All
  lessons use the Cole household; the hub now says so.

| | Core sections | Appendix | Core minutes | Appendix minutes |
|---|---|---|---|---|
| Session 1 | 11 | 7 | 63 | 83 |
| Session 2 | 10 | 5 | 67 | 58 |
| Session 3 | 12 | 4 | 64 | 48 |
| Session 4 | 12 | 4 | 67 | 43 |

### Session 1 — How the Machine Works, and What It Costs
- Added a 150-minute pacing model and per-section minute chips, matching Sessions
  2–4. Session 1 previously had no time budget of any kind.
- Moved to the appendix: n-gram counting, fitting a model by hand, meaning space,
  the counting-failure lab, the sampler lab, the regulation preview, and the
  disclosure discussion.
- Core keeps the case, the cold open, prediction, tokens, hallucination, the cost
  frontier, practice cost, tier choice, confidentiality, custom instructions and
  the baseline capture.

### Session 2 — Practical AI Usage in Daily Advisory Workflows
- Moved to the appendix: next-token probabilities, Laplace, the counting-failure
  example, the seven-step delegation process, and the specification-cost discussion.
- Fixed three copy-to-clipboard buttons that reported success and threw an
  unhandled rejection when the clipboard write was denied. They now fall back to
  "Select and copy", matching Sessions 3 and 4.

### Session 3 — Gathering and Documenting Client Information
- Moved to the appendix: chunk size and condition orphaning, grounding versus
  fine-tuning, note-taker adoption, and the verification-effort discussion.
- The instructor minute-budget table now reports core and appendix subtotals
  separately instead of one running total.

### Session 4 — Compliance, Security and Responsible Use
- **Restored the Wolfram material cut in the 17 August rebuild.** Session 4 had
  fallen from seven Wolfram references to one. New appendix section D3, "Where the
  Assigned Reading Has Gone Stale", brings back the three-row 2023-versus-2026
  comparison table and the parenthesis mechanism behind the hallucination rate.
  The reproducibility quote is restored to the audit-trail section.
- Moved to the appendix: SynthID provenance, watermark limits, source staleness
  (new), and the logging-burden discussion.

### Prose
- Tightened prose throughout. Core-session prose is down about 28% against the
  pre-restructure lessons. Total document length is up about 7%, because the
  appendix navigation and the restored Session 4 material are additions; the
  lesson that actually gets taught is materially shorter.

## 2026-08-16

### Site
- Published the course as a live site. All lessons now live at stable URLs
  (`/session-1/`, `/session-2/`, …) and are updated in place.
- Added course hub landing page listing all sessions.
- Restructured session files into per-session directories. File history is
  preserved — use `git log --follow` to trace any lesson back through the rename.
- Added this changelog.

### Session 1 — How the Machine Works, and What It Costs
- No content changes *in this commit*. File moved from `session1-lesson-v2.html`
  to `session-1/index.html`; the `-v2` suffix is retired now that git tracks
  versions. All four lessons were substantially rewritten the following day —
  see 2026-08-17 below.

### Session 2 — Practical AI Usage in Daily Advisory Workflows
- No content changes. Moved to `session-2/index.html`.

### Session 3 — Gathering and Documenting Client Information
- No content changes. Moved to `session-3/index.html`.

### Session 4 — Compliance, Security and Responsible Use
- No content changes. Moved to `session-4/index.html`.

---

## 2026-08-17

All four lessons rebuilt from the curriculum development project. These commits
were not recorded at the time; this entry is reconstructed from the diffs.

### All sessions
- **One case now runs through the whole course.** The Cole household — Meg Cole,
  Cole Precision Components, the IDGT sale at a 31% discount on a 2023 appraisal
  never re-verified — replaces the Session-1-only Okonkwo–Reyes household and now
  appears in all four lessons with consistent figures throughout.
- **Cross-session continuity.** References between sessions roughly tripled, and
  students now carry real artifacts forward: the Session 1 cold-open prompt and
  efficiency baseline, the Session 2 IDGT client-explanation prompt, the Session 3
  buy-sell extraction and Part 1 draft.

### Session 1
- Progressive section gating removed. Sections previously unlocked as work-along
  cues were completed; everything now scrolls freely and the cues mark completion
  for feedback only.
- Added the cold-open prompt field, account-level custom instructions, the
  disclosure discussion, and the efficiency baseline capture.

### Session 2
- Added the Session 1 retrieval bridge, the Cole case frame, P.T.C.F scoring of
  submitted prompts, the buy-sell exercise, and the specification-cost discussion.

### Session 3
- Added the AI usage policy assignment, the citation-backed output discussion, and
  the Part 1 peer exchange.

### Session 4
- Added the Session 3 retrieval bridge, vendor due diligence against the Cole
  document set, the Part 1 relay with a derangement pairing draw, the cold first
  run, and the logging-burden discussion.
- Removed the "Where the 2023 account has gone stale" table and most Wolfram
  references. Restored 18 August.
