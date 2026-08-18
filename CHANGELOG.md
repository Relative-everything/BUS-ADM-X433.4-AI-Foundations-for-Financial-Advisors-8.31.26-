# Changelog

Every substantive revision to the course materials, newest first.

Each entry corresponds to one or more commits. For the exact character-level
diff of any change, see the
[commit history](../../commits/main) on GitHub.

Format: `## YYYY-MM-DD` with changes grouped by session.

---

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
