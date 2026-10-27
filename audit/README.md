# audit/

The evidence folder: what happened in a taught session, as recorded, so that
pedagogy decisions rest on transcripts and exports rather than recall
(PEDAGOGY.md §15.6 to §15.8, decided 2026-10-27, DW-193).

## Convention from the 2027 cohort on

One sub-folder per taught session, created within 24 hours of teaching:

```
audit/2027-session-N/
  transcript.vtt        Zoom transcript with speaker labels switched on before the session
  chat.txt              the Zoom chat export
  polls.csv             the Zoom poll report (four polls per session)
  evaluations.*         the course evaluation export when it arrives (Session 5 folder)
  notes.md              the instructor's same-day notes: which poll decision rules fired,
                        whether the confidence-label read-aloud happened, what ran long
```

Then the `pedagogical-audit` skill runs on the folder and writes its scorecard
beside it as `PEDAGOGICAL-AUDIT-SESSION-N-<date>.md`, the form the two Fall 2026
audits in this folder already take.

Everything else here is the Fall 2026 record: the dated `AUDIT-*.md` repository
audits, the two pedagogical audits, the content audits and the two feedback
exports. Read them as history.
