# Changelog

Every substantive revision to the course materials, newest first.

Each entry corresponds to one or more commits. For the exact character-level
diff of any change, see the
[commit history](../../commits/main) on GitHub.

Format: `## YYYY-MM-DD` with changes grouped by session.

---

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
