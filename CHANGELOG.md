# Changelog

Every substantive revision to the course materials, newest first.

Each entry corresponds to one or more commits. For the exact character-level
diff of any change, see the
[commit history](../../commits/main) on GitHub.

Format: `## YYYY-MM-DD` with changes grouped by session.

---

## 2026-09-03 · The register re-measured, and the queue re-ranked for Session 2

Branch `claude/deferred-work-audit-reprioritize-kh0djg`, two commits. No served
page, script, baseline, source record or `CASE.md` line changed.

### Repository · Every open row measured against the tree

`docs/deferred-work.md`'s header was written on 2026-08-27, eight merged PRs
ago, and its queue still pointed at a course that had not started. Session 1
was taught on 2026-08-31; Session 2 is taught on 2026-09-14. The register's own
tie-break is proximity to teaching, so the audit re-measured all 55 open rows
(DW-001 to DW-070) against `main` at `8442160` and re-ranked what remains, with
the command or the file:line behind every verdict recorded in
`audit/AUDIT-2026-09-03.md`.

Forty-five rows are still true as written. Seven keep their substance with
corrected figures, locators or severity: DW-005 (thirteen SynthID chips now, not
eleven), DW-022 (the `src-aa` divergence is now documented in the record itself),
DW-024 (56 of 60 empty, not 55 of 59), DW-043 (the six CSS copies agree today;
the gap is the missing check), DW-055 (its bold sentence was deleted by Pass 2,
so the four-lesson contradiction is gone and the row drops to MINOR), DW-056
(ten `.verify` gates by class, not thirteen), and DW-064, which is raised to
MAJOR after a Chromium reproduction: with focus in any lesson's first text box,
Shift+U reveals every withheld panel, and `session-2`'s first exercise is that
box. One row had closed on the tree without being amended: DW-009, the hub
footer's term label, gone since `a5ede33`. Nineteen rows carried drifted line
numbers; the quoted string is the locator. DW-007 is re-owned to Claude Code.

### Repository · Sixteen rows the register did not carry

DW-071 to DW-086 open. The ones a student meets: a hub sentence its own
annotation calls wrong (DW-071); the `session-1` §02 rank-probability chart, a
constructed harmonic series with no illustrative label (DW-072); eleven marked
claims with no row, `session-2:1576` among them (DW-073); the instructor-
addressed pacing block and the in-class deixis that the session-1 passes removed
and sessions 2 to 4 still carry (DW-074, DW-075); a `session-3` panel label of
the shape DW-046 removed, holding DW-002's false sentence (DW-076); and the Case
facts control 92px and 76px off-screen at 380px on the two console-carrying
pages (DW-077). The repository ones: README's grading sentence and four
unverified fields (DW-078, DW-079); a verification surface that cannot run from
a clean clone (DW-080); moving-target sources ageing into September with no
re-pull owner (DW-081); the plan's unexecuted Phases 5 to 7 (DW-082); two
changelog defects, this file's newest entry included (DW-083); the 08-29 audit's
two contested rulings (DW-084); a five-way override label (DW-085); and three
lists of open work still living outside the register (DW-086).

### Repository · The queue

The header now states the calendar, what is broken on a served page, and a
ranked sequence in two halves: mechanical fixes that need no decision (DW-064
with DW-085 first, then DW-071, DW-066 with DW-074, seven minutes-each edits,
README and the verification paths), and decisions ordered by how many rows each
unblocks (DW-041, DW-003, DW-050, DW-056, DW-072, DW-021 with DW-073, DW-082,
the six ratchet records on one ratification, DW-084). The rubric behind the
order, and where judgement overrode the score, are the audit's §5 to §7.

An adversarial pass over the audit was attempted three times and never returned,
twice to a usage limit and once to a container restart. The audit says so in
its §9, and no verdict in it is independently refuted.

### The commits

- **`5b42575`** The audit register and the amended deferred-work register: the
  new header and queue, dated notes on 41 rows, DW-009 closed, DW-064 raised,
  DW-007 re-owned, DW-070's phase column filled, sixteen rows opened.
  `audit/AUDIT-2026-09-03.md` (new), `docs/deferred-work.md`.
  **Closes DW-009. Opens DW-071 to DW-086.**
- The second commit is this entry and the regenerated `changelog/index.html`.

---

## 2026-08-30 · The case sheets go sparse, and the ribbon scale becomes true

Branch `claude/case-sheet-redesign`, unmerged on purpose: parked for Jared to
merge after his first class session, not before.

### Case · Part L redesigned as sparse sheets plus a generated detail layer

The two Structure-tab sheets were dense: every balance-sheet row, ledger line
and percentage was drawn into the SVG artwork as a hand-typed literal, the
smallest labels rendered near 5.3 px effective in the modal, and no validator
tied any drawn figure to CASE.md data. Both sheets are redrawn as sparse
relational views, at most six dollar figures each, on a 720-unit viewBox whose
smallest authored text is 12.5 units: the effective minimum in the modal is now
12.5 px against the roughly 5.3 px the old 1240-unit sheets produced.

Everything the sheets no longer draw moved down, not out. Both balance sheets,
the year-1 cash ledgers, the unit-price arithmetic and the years-1-through-4
round-trip note render as HTML tables below each sheet, behind one **Show
detail** toggle, and `scripts/inject-case.mjs` generates every row from
`case-facts.json`: the moved figures are derived from CASE.md rather than
typed into artwork, which the old sheets never had. The toggle is a real
button with `aria-expanded`, and its hiding class is case-scoped
(`.case-dhide`, the `.case-off` precedent), so the Shift+U override cannot
reveal it. The standalone new-tab view removes the control and force-opens
the detail, the same treatment the tablist already receives, because a toggle
whose script did not come with it is a dead control.

### Case · The ribbon disproportion is fixed, and the scale is now stated

Sheet 2 claimed three times that ribbon width is proportional to dollars, and
five of its six flows sat near 5.6 px per million; the *"428 units pro rata ·
$2,140,000"* ribbon was drawn at `stroke-width="3.5"` where that scale demands
about 12, and the key paired 3.5 with $2,140,000 directly beside 11.7 for the
smaller $2,095,236, under the caption *"ribbon width ∝ annual dollars"*. It
had shipped through every check in the repo, because every check pins the
sheets as bytes rather than as facts. Every ribbon on the new sheet is drawn
at exactly 6 px per $1,000,000, tax arrow included, and the sheet caption
states the scale instead of asserting proportionality in the abstract. The
class of defect, drawn literals no validator reads, is opened as
`docs/deferred-work.md` **DW-070**; CASE.md Part N records the correction as
v4.4.

### Repository · What moved with it

The flowchart fragment's self-version is aligned to v4.0, matching the case
sentinels and the visible stamp. Both `<desc>` elements are rewritten for the
new content. `docs/case-fact-inventory.md` was regenerated with
`case-inventory.mjs --report` on Jared's explicit instruction, since the
injected block's counts and line offsets moved with the redesign. No case fact
changed and no figure moved; `editorial-baseline.json` and every recorded
verifier baseline are untouched, and the full migration-check chain, both
Chromium suites included, exits clean.

---

## 2026-08-29 · Verbatim quotations, and a rule for the baselines

Branch `claude/dw-067-wolfram-quotes-5zzqxl`, four commits, merged at `e1eab38`.

### Session 1 · Two paraphrases become quotations, and a script says so

Section 03 summarised the assigned article instead of quoting it, and the A1
n-gram box did the same with its five figures. Both are verbatim spans now. The
work landed against an instructor-supplied copy of the article: the egress block
that opened DW-067 in Pass 4 is still in force, so the article arrived as a file
attached to the task rather than from the web, and it is the sole source for
every span that landed.

`scripts/verify-wolfram-quotes.py` is what makes that a testable claim rather
than an assurance. It normalises whitespace, quote forms and HTML entities on
both sides, splits each quotation at its ellipses, and asserts that every
fragment is a contiguous substring of the article. The branch ends at **17 spans
checked, 15 exact, 2 terminal-period, 0 failed.**

The A1 box is two contiguous spans joined by one ellipsis, and the elision falls
exactly where the article carries an em dash. Splitting the quotation there is
what keeps all five figures verbatim and keeps a dash out of an attributed
quotation at the same time, which is the collision A10 exists to catch.

### Session 1 · A misquote found by the script, raised, then repaired

The verifier found one span in the six reading boxes that is not a contiguous
substring of the article: §02's second box had lost an indefinite article from
the sentence about what a token can be. The pass that found it had no authority
to repair a quotation, so it raised **DW-068** and left the box byte-unchanged.
The next commit restored the missing word and moved the sentence-closing period
outside the quotation marks, because the article carries a comma at that point
and leaving the period inside would have traded a dropped word for an added one.

Five of the six credit lines gained the article section their quotation comes
from in the first commit; the sixth was the flagged box, and it was left alone
twice on purpose before the last commit of the branch gave it its section name.
All six carry one now.

A third quotation, in the A2 paragraph, flattens the article's own quotation
marks around two of its words, so it is not a contiguous substring either. The
verifier **whitelists** it rather than reporting it clean, which means the run's
zero failures does not assert that this span was read. That is **DW-069**, and
it is open.

### Repository · A recorded baseline is re-recorded only on instruction

`MAINTAINING.md`'s re-baselining procedure now opens with a standing rule. Every
figure in `scripts/editorial-baseline.json` is a *recorded* value, the A9 total
that `test-editorial-regions.mjs` T7 pins the classifier to included, and those
figures are re-recorded only when Jared has asked for it, in words, for that
figure. Any unrequested movement of a measured figure away from its baseline is
a halt-and-report condition in **both** directions: a rise was already
impossible by rule, and a fall is not self-service. A red T7 is the report owed,
not a licence to green it.

The rule exists because this branch had already crossed it. A9 for session-1
fell **69 to 67** inside the first commit, the two dashes having sat in the §03
gloss the quotations replaced, and the baseline was lowered by hand in the same
commit because T7 pins the classifier to the recorded figure and goes red until
it moves. Nobody asked for that. It was put to Jared after the fact and
ratified retroactively, so the lowering stands and no revert is owed.
**67 is the standing pinned figure for session-1** and does not move again
without his instruction for that figure, in either direction.

### The commits

- **`52b0bc4`** §03's paraphrase becomes two labelled quotations and the A1 box
  becomes two spans joined at the article's own em dash; five credit lines gain
  their section; `scripts/verify-wolfram-quotes.py` is added, 177 lines, and
  every new span verifies exact. A9 session-1 lowered by hand 69 to 67; A12
  falls from 8 advisories to 7.
  `session-1/index.html`, `scripts/verify-wolfram-quotes.py` (new),
  `scripts/editorial-baseline.json`, `docs/deferred-work.md`.
  **Closes DW-067. Opens DW-068.**
- **`9bdbd08`** Restores the word dropped from §02's second box and moves that
  sentence's closing period outside the quotation marks; gives the A2 neuron
  comparison a credit line naming both of the article sections its two figures
  come from; adds the standing baseline rule to `MAINTAINING.md` and records the
  69-to-67 lowering as ratified after the fact.
  `MAINTAINING.md`, `session-1/index.html`, `scripts/verify-wolfram-quotes.py`,
  `scripts/editorial-baseline.json`, `docs/deferred-work.md`.
  **Closes DW-068.**
- **`8679a7c`** The A2 credit line changes class from `wh` to `src` so it renders
  through the styled rule and registers as a source note rather than body prose:
  three A12 advisories clear and the corpus figure falls from 7 to 4, and A11
  falls from 5 to 3. The verifier's credit-line matcher had located that
  paragraph by its old class and had silently dropped both of its figures from
  the run, so the matcher was extended to accept either class and the tally came
  back to 17 checked.
  `session-1/index.html`, `scripts/verify-wolfram-quotes.py`,
  `docs/deferred-work.md`. **Opens DW-069.**
- **`befe0f3`** The last bare reading-box credit line names its section, copied
  byte-for-byte out of the box two lines away rather than retyped, so all six
  reading boxes carry a section name and DW-067's six-label intent is met. A11
  holds at 3 and A12 at 4, neither forced. `session-1/index.html`,
  `docs/deferred-work.md`.

Both period-outside-quotes edits and the verifier's matcher extension were made
against their commits' stated scope and reported for ratification rather than
assumed. Jared ratified all three on 2026-08-29.

---

## 2026-08-29 · Session 1 Pass 4 · The cold open gets a fixed checklist

Branch `claude/session-1-pass-4-items-8wyomf`, three commits, merged at
`550945b`.

### Session 1 · A walkthrough anchor and a pointer at the case facts

Two anchor callouts now sit between the live-console fence and the start card,
in the lesson's teal callout style. The first says the session opens with a
guided on-screen walkthrough of the model interface and that no prior AI
experience is assumed. The second is one sentence sending the reader to Case
facts in the top bar to review the Cole household before the first exercise.

Two paragraphs stopped gesturing and started saying their point. §02's sampler
paragraph now says the reader has just done what the model does, one word at a
time with no revision, and that some paths produce a false sentence that sounds
exactly as confident as a true one. §04's opener drops its rhetorical bridge for
the fact it was pointing at: a system that predicts likely next words has no
lookup step for facts, which is why exact recall fails.

### Session 1 · The cold open stops improvising and renders eight fixed checks

Pressing **Analyse what I typed** used to produce a free-form response. It now
renders a fixed eight-point prompt checklist: an explicit ask, at least 15
words, a named output format, context beyond the ask, a named audience or role,
a constraint on length, tone or scope, an example or reference point, and what
to do when unsure. Every check is deterministic, offline and readable in source,
a visible word list or a plain measurement, never a relevance score. Each row
renders a mark **and** the word "present" or "missing", never colour alone, with
one plain line on why the item matters, and the response closes with *n* of 8
present. It gates nothing and nothing else on the page reads it.

The eight live in one `COLD_CHECKS` constant, commented as the course-wide
checklist for the other lessons to copy verbatim. **DW-066** opens the September
propagation, because until it lands the flagship diverges from the four lessons
that still run the free-form analyser.

An adversarial read of the diff caught a detection defect before the push: one
token sat inside a word-boundary group where its trailing full stop could never
match, so the alternation was rewritten to match it in normal use.

### Session 1 · The start card verifies a choice instead of a keystroke

The work-along drops the any-text-turns-green input. A picker now offers eight
case figures, every one derived at render time from the injected `COLE`
constants and never typed, plus an unscored free-text "why" field. Any selection
is valid, the exercise has no single right answer, and the gate marks on a real
selection: driven in Chromium, no selection stays incomplete even with why-text
present, and a selection completes it.

### Session 1 · Two tier-quiz items

The §07 concentration item loses its formatting clause, so the task is the
computation alone and both feedback strings speak to it. The email item's
correct answer moves from Haiku-class to Sonnet-class, and both feedback strings
now teach the judgment behind the move: templated is not the same as low-stakes,
the draft goes out under your name, and the error a cheaper tier misses costs
more than the tier saves. The quiz engine and its scoring logic are untouched.

### The commits

- **`af86dcd`** The two anchor callouts and the two prose replacements. New copy
  carries no dates, no instructor-addressed prose and no em dashes.
  `session-1/index.html` (+7/-2).
- **`4a11230`** The eight-check cold open behind `COLD_CHECKS`, and the start
  card's picker over eight injected case figures.
  `session-1/index.html` (+54/-15), `docs/deferred-work.md`,
  `docs/case-fact-inventory.md`. **Opens DW-066 and DW-067.**
- **`8f7687e`** The two §07 `TQ` key edits. `session-1/index.html` (+4/-4).

DW-067 is the row this pass could not close: egress to the assigned article's
host is denied by the network policy, and a quotation mark must never wrap text
that was not read from the source, so nothing was changed and the row records
what the work would be. `A9` for session-1 holds at 69 across all three commits.

---

## 2026-08-29 · A source verified, and two September rows

Branch `claude/session-1-pages-diagnosis-qifct5`, two commits, merged at
`67dddda`.

### Sources · The interleaving citation stops being an unverified record

`src-rohrer`'s identity was confirmed against three independent listings: the
ERIC record, the publisher's abstract page for the DOI, and the author's own
publication list, which hosts the full text. The record now carries the
journal's volume, issue and pages, the DOI link, the retrieval date and
confidence H, and the session-1 footer gains its seventh link.

The full text itself was not pulled and the record's `scope` still says so, so
no figure and no effect size from the paper enters the corpus. `last_verified`
stays empty: it is the instructor's attestation, not this tool's, and the lock
digest proves it did not move.

One consequence is worth naming because it looks like a defect and is not. The
case-fact inventory's *declined* count rises by one: the page range's first
figure collides with a case constant, the context test declined it, and the
undercount is doing its job.

### The register · Two rows dated to the September window

- **DW-064** measures the reveal-override surface. Eight `keydown` handlers
  across the five session files act on the override with no look at the active
  element, so a capital U typed into any text input reveals every withheld
  panel, the §08 card-sort key among them. Two share a guard that arrives too
  late, six have none, and the hub has none to fix. The fix has to move as one
  commit across the carrier files, under the shared-construct discipline the
  register already applies to fences and rituals.
- **DW-065** sends the newly verified `src-rohrer` upstream. The lesson-builder
  skill states the interleaving design claim with no citation and the citation
  now exists at verified/H. The skill is not edited from this repository, so the
  row records where the fix lands instead of landing it.

### The commits

- **`f6699b0`** `src-rohrer` raised to verified/H with volume, issue, pages,
  DOI and retrieval date; footer, bibliography and verification queue
  regenerated behind it. `SOURCES.md`, `BIBLIOGRAPHY.md`,
  `docs/source-verification-queue.md`, `docs/case-fact-inventory.md`,
  `session-1/index.html`.
- **`fee7dee`** Two rows and nothing else. `docs/deferred-work.md` (+2/-0).
  **Opens DW-064 and DW-065.**

---

## 2026-08-29 · Session 1 §08 becomes a withheld-key card sort

Branch `claude/session-1-card-sort-rebuild-nuzjoz`, two commits, merged at
`134ccaa`.

### Session 1 · The old sorter told you the answer as you clicked

Chips were plain buttons, each click lit the correct bucket immediately, and the
score counted clicks. It is replaced rather than patched. Eight cards, each a
Cole fact, place by drag **or** by a keyboard path: every card is a real button;
select it, then place it with an explicit per-bucket control, and focus follows
the placed card so a keyboard reader is never dropped. A placed card stays
placed and can be moved between buckets, and a foreign drag payload cannot
re-file a card.

**Check my work** opens only once all eight are placed, then reports an
aggregate *n* of 8 and nothing else: no per-card class, attribute, ordering or
ARIA change, so nothing a reader can observe says which cards are wrong. The key
panel, one line of why per card, is not rendered into the DOM while the sort is
live. Its rows build only at 8 of 8, or through the labelled override, which
reaches it through the page's own reveal registry. Free scroll is untouched.

### Session 1 · The key is derived from `CASE.md`, not typed into the lesson

The deck and key live between new `CARDSORT` sentinels written by
`scripts/build-cardsort.mjs`. The script derives both from `CASE.md` Part J and
Part H plus `case-facts.json`, and `--check` fails when a fact the deck rests on
moves, so a `CASE.md` edit breaks a check instead of silently orphaning the
answer key. Card text reads the injected `COLE` constants at parse time, so no
case figure is typed into the lesson: the drift surface fell from **107 unguarded
to 105**, quantitative unchanged at 5.

`verify-browser.mjs` gains a six-assertion drive that reloads the lesson and
works the sort through its own controls: the check is inert before completeness;
all-wrong reports 0 of 8 with the key sealed, its rows unrendered and a
byte-identical per-card snapshot; seven right reports 7 of 8 still sealed; and
the reveal renders only at 8 of 8.

The section's source note gains the interleaved-classification citation at
confidence M. The paper was not retrievable from this build environment, so the
record carries the unverified-retrieval markers rather than an invented link.

### Session 1 · A retired figure that no grep in the repository could see

§02's sampler held a hand-typed weight that render-time arithmetic turned into a
retired `CASE.md` Part K percentage on the reader's first click, next to the
retired phrasing's own connector. The source held a decimal; only the widget's
own arithmetic made the string, so no purge check in the tree could find it.

The weight now reads the injected `COLE.discount`, the live combined discount
from `CASE.md`, and the row's remaining four weights renormalise to sum 1. The
value was moved off the source rather than suppressed at display time, so a
`CASE.md` figure move flows into the widget instead of drifting past it.
`verify-browser.mjs` drives the widget through all six distributions plus a
reset and asserts that no Part K render form appears anywhere in the rendered
text at any step, and that every distribution sums to 100 ranked non-increasing.
The banned strings are composed at runtime and never spelled in source, so the
check itself stays clean. Negative-tested against the pre-fix tree, where the
drive reports the step-1 hit.

### The commits

- **`78053ae`** The withheld-key card sort, `scripts/build-cardsort.mjs` (new,
  183 lines), the `CARDSORT` sentinels, the six-assertion browser drive, and the
  interleaving citation. `session-1/index.html` (+118/-29),
  `scripts/build-cardsort.mjs`, `scripts/verify-browser.mjs`, `SOURCES.md`,
  `BIBLIOGRAPHY.md`, `MAINTAINING.md`, `docs/source-verification-queue.md`,
  `docs/case-fact-inventory.md`.
- **`f26395d`** The sampler weight rides the live discount, and the browser
  drive that can see a render-time figure. `session-1/index.html` (+10/-1),
  `scripts/verify-browser.mjs` (+33/-0), `docs/deferred-work.md`.
  **Closes DW-063.**

A9 for session-1 holds at 69 across both commits and the section keeps its seven
minutes.

---

## 2026-08-29 · Session 1 Pass 3 · Titles and voice

Branch `claude/session-1-pass-3-titles-voice-6iknz9`, four commits, merged at
`a3a1551`. This branch ran in parallel with Pass 2 and merged main into itself
part-way through, so the last commit on it is a reconciliation rather than an
edit.

### Session 1 · Thirteen titles stop making claims

The page title and twelve measured ACTION or ASSERTION titles are rewritten as
descriptive noun phrases. Where a widget already named its own content the title
borrows that name rather than inventing one: the wall chart's `aria-label`, the
diagnoser's own readout, §10's table.

Every reader of the one title with readers outside its own section moved in the
same commit. Three of the four generated regions were regenerated with
`scripts/build-appendix.mjs` rather than hand-edited and `--check` agrees;
sessions 2, 3 and 4 were not rewritten. The `<title>` keeps its "Session 1"
prefix and its em dash for two mechanical reasons: the lesson validator reads
the session number out of it, and that dash is the whole of session-1's A9
literal population, so retyping it would move a ratchet for nothing.

**`CHANGELOG.md` and `changelog/` were deliberately not updated**, because they
record what the title was on the day, which is the one thing an updated copy
would destroy.

### Session 1 · The pacing block starts talking to whoever is reading it

Ten instructor-addressed constructs were rewritten and two deleted. The pacing
block now describes two paths to a reader instead of telling a teacher what
always gets taught, and every minute in it is read from the same loop the footer
table sums: **11 sections and 69 minutes core, 7 and 81 appendix, 150 for
everything**, none of them restated from prose.

Thirteen more constructs were found and left, each for a stated reason: a
six-file gate that cannot be fixed in one file, a placeholder byte-paired with
session-0.1, four generated lines from one template shared by all four lessons,
and a tally label that cannot be deleted without orphaning the control it names.

### Session 1 · The inventory measures, and finds a defect doing it

The inventory's parts 4, 6 and 8 are measured rather than transcribed, and three
of the file's own premises turned out to be false. They are corrected in place,
beside the originals, rather than quietly worked around.

The correction that mattered was the least interesting one: the file is in
`docs/`, not `audit/`, and `verify-migration.mjs` excludes `audit/` from the
retired-fact check and does not exclude that path. Writing a Part K retired
figure into it turned check 1 red on a clean tree, and chasing why is what
surfaced the §02 sampler defect above: the widget prints every weight as a
percentage and one of them was the banned value. **The exclusion list was
deliberately not widened to cover the file.** Opened as **DW-058**, later
renumbered DW-063 by the merge, and left unfixed because §02 was record-only
that pass.

One marker stays up honestly. The 59 unexplained hits are not 59 unexplained
hits: the case span is byte-identical across all six served pages, so any
population resident in it is a multiple of six, and 59 is prime, which retires a
whole class of explanations without settling the question.

### The commits

- **`33f771b`** Task 0, committed before any edit: the inventory's measured
  parts, its three self-corrections, and the render-time retired figure it
  found. `docs/session-1-feedback-inventory.md` (+934/-10),
  `docs/deferred-work.md`. **Opens the row later renumbered DW-063.**
- **`a5ede33`** Thirteen titles, ten voice rewrites and two deletions, with
  every reader moved in the same commit and the generated regions regenerated.
  A9 is 77 before and 77 after on all five files, so no ratchet moved and no
  lowering row is owed. `session-1/index.html` (+43/-38), `MAINTAINING.md`,
  `index.html`, `README.md`, the per-lesson notes file outside the served pages.
- **`d023fdb`** Merge of `origin/main` into the branch: Pass 2's deletions meet
  Pass 3's titles, and the deletions win where they met. It is the one merge in
  this window that changes the register, and it changes it by one row: Task 0's
  row is renumbered to **DW-063**, because Pass 2's lowering row had taken
  DW-058 first.
- **`77f4cb3`** Reconciliation. No lesson file is touched. Every edit is a dated
  amendment to a claim the merge made stale, kept beside the original rather
  than written over it, per the register's own supersession rule. The
  inventory's two false premises were true of the tree they were measured
  against and stopped being true the same day, when Pass 2 landed from its
  parallel session; each gets a merge note saying so. `MAINTAINING.md`,
  `docs/session-1-feedback-inventory.md`, `docs/deferred-work.md`.
  **Closes DW-061.**

---

## 2026-08-28 · Session 1 Pass 2 · Deletions and purges only

Branch `claude/session-1-pass-2-deletions-snfy37`, two commits, merged at
`afaa23a`. No title rewrites, no voice rewrites, no new components, no
discretionary trimming.

### Session 1 · Nine calendar words and eight em dashes

Block A found nothing to do: the retired platform name had already gone from the
served pages, and the only remaining hits are the HTML element of the same name
behind session-4's bitmap widget, which is the exclusion `MAINTAINING.md`
documents. Zero edits, zero ambiguous hits held back.

Block B purges the eight calendar-locked references it owns, and Block C's
fourth edit takes a ninth with the sentence carrying it, so none is left in the
file. Where deleting the word left a grammatical sentence it was deleted; where
it was load-bearing it became "this session", the calendar-free equivalent the
repository already uses. Buckets (b), (c) and (d) survive untouched: no citation
year, retrieval date, data vintage, legal identifier or case fact was edited,
and neither was the modal "May" in the §08 title nor the physics "Fall time" in
A2.

Block C applies eleven named edits, none of whose fragments was absent. The §08
deletion is extended by one line to the panel's closing tag, without which the
markup would not balance. Block D rewrites five em dashes as punctuation with
the wording untouched: three colons, one semicolon, and one paired parenthetical
that becomes round brackets.

### Repository · One lowering, two rows, because they are two kinds of event

A9 falls **77 to 69** on session-1 and the baseline moves with it. The lowering
is registered as two rows rather than one: **DW-058** for the four dashes
deleted with the prose that carried them, and **DW-059** for the four punctuated
away while their sentences stayed. Every prior lowering in this file states that
none was converted. This is the first that was, and it must not be read as
another of those.

### The register · Three consequences that no validator sees

A repository-wide check for references to the text the deletion pass removed
found three, none of them a failure and all three decisions, so they became rows
rather than edits.

- **DW-060.** `EDITORIAL.md` B3's worked example quotes a §02 label verbatim and
  argues that four of its terms are undefined at that point. One of the four was
  removed, so the quotation no longer matches the file and the edit partly
  answered B3's own complaint. The line reference was already wrong before this
  pass, so B3's other citations want a re-check too. Rewriting a specification's
  worked example is not a deletions pass's business.
- **DW-061.** `MAINTAINING.md`'s keep-list justifies its data-handling row with
  a sentence Block C's eighth edit deleted. The rule survives, because the panel
  above it carries the same prohibition in a stronger form and was untouched, so
  this is a citation defect rather than a safety regression. A keep-list is a
  ratification, though, and this pass overrode one on an explicit instruction.
- **DW-062.** The cold-open ritual's opening line still stands in the other four
  lessons; Block C's third edit took it out of session-1 only. Nothing catches
  it: the five copies are R1 prose, so no fence pairing, no digest loop, and
  A8/A9 count dashes rather than compare files. The five were never
  byte-identical anyway.

### The commits

- **`acd691f`** Blocks A to D. Widget figures re-derived by loading the page in
  Chromium and reading what it computes, not by reimplementing it; identical on
  every figure. `session-1/index.html` (+16/-28),
  `scripts/editorial-baseline.json`, `docs/deferred-work.md`.
  **Opens DW-058 and DW-059.**
- **`4bb2f99`** Three rows and nothing else. `docs/deferred-work.md` (+3/-0).
  **Opens DW-060, DW-061 and DW-062.**

---

## 2026-08-28 · Two direct commits · Notes and the feedback inventory

Two commits by the repository owner, straight onto main rather than through a
branch.

- **`10fece6`** One line appended to the rebuild-notes file in `audit/`, the
  same file `182239f` had marked DO NOT USE three days earlier (+1/-0). The
  commit message describes the notes; the diff is the one line.
- **`9924f11`** The session-1 feedback inventory arrives, 270 lines, as
  `docs/session-1-feedback-inventory.md`. It is the input Passes 2, 3 and 4 were
  worked from, and Pass 3's first commit is the one that re-measured it.

Both are additive; no served page, script or governance document moved.

---

## 2026-08-27 · Phase 4 · The addressed blocks come off the pages

Merged at `f975742`, ten commits. **The branch name is not reproduced here: it
carries a string the standing purge list retired on 2026-08-26.** `git show
f975742` names it.

### Sessions 0.1-4 · Fifteen blocks, and what had to be true to count

Fourteen were counted against the post-Phase-3.6 files rather than carried from
an earlier count, because the sections they key to had moved in Phase 2. A
fifteenth was found by two independent sweeps, one by string and one by
structure, neither shown the other's answer, and both returned the same
objection to an exclusion the first commit had made.

The test was the **addressee**, not the CSS class. Session-0.1 uses the same
class for ten ordinary reader-facing callouts, and those are lesson prose and
stay. Eleven blocks were labelled and in R1; three more were marked but not
labelled, and two of those sit inside JavaScript string literals, which is
exactly why the brief put script literals in scope.

Four Complication blocks were excluded together, and one of the four was
mis-sorted on the exclusion's own stated grounds: the other three state a
substantive fact to the room, this one is nothing but delivery direction, it is
the only one of the four carrying an explicit addressee marking, and it costs no
curriculum to remove, because the phase is already defined for readers in the
table directly above it and the re-vote flow references that table and never the
panel.

The blocks now live in a new per-lesson directory outside the served pages, one
file per lesson, fifteen blocks compressed to fourteen bullets with one dropped.
Bullets never exceed blocks in any file and no block expands into two; the
longest bullet is 137 characters against a 140 cap; every bullet traces to a
substring of the block it compresses, and nothing is authored. Section ids live
in the new files and nowhere else: no anchor, no id and no comment was left
behind in any lesson.

Two rewrites were changed by adversarial audit. One would have contradicted its
own lesson's stated requirement if read aloud verbatim, and the disagreement
between the source block and the lesson is flagged for the instructor rather
than resolved. The other would have needed data off the page, which the brief
forbids, so the bullet carries the pre-reveal action in a form usable before you
know which item it applies to.

### Sessions 1-4 · The repository stops asserting what it cannot assert

The repository is a live visual aid a room follows during a lecture. The course
platform is the sole authority for scheduling and assessment and is already
built, so a sentence here asserting either is not stale: it has no standing to
make the claim. Session-0.1 received zero edits.

| file | Tier A | Tier B | rewrites |
|---|---|---|---|
| `index.html` | 1 | 0 | 1 |
| `session-1` | 6 | 7 | 13 |
| `session-2` | 17 | 4 | 21 |
| `session-3` | 3 | 7 | 10 |
| `session-4` | 8 | 7 | 15 |

Tier A took the weightings wherever they appeared, **including three that
existed only inside JavaScript output strings** in sessions 2, 3 and 4. A reader
sees those; a search over prose does not. Tier B took every relative sequence
reference installed six commits earlier by the calendar conversion, and
**supersedes that decision**: converting absolute dates into relative sequence
was right while the repository owned the schedule and is wrong now that it does
not. DW-047 records the supersession.

Tier C is why the file exists and none of it moved: the in-room instruction, the
work-along gates, every widget. Tier D was read, enumerated and left alone, and
**DW-050** holds the open question of whether the sessions must be standalone,
because that is one decision and not thirty edits.

**One string could not be purged and it is flagged.** It sits inside the console
fence that must stay byte-identical with session-0.1, which was out of scope.
The edit was made, measured (it raised A9b from 6 shared blocks to 7) and
reverted. **DW-048**, later accepted as-is: the sentence *disclaims* rather than
asserts, so it is not the defect Tier A exists to catch.

Every threshold printed by a widget whose surrounding text changed was
re-derived by driving the widget in Chromium and reading what the page's own
code prints. None moved.

### Sources · A flag with no consumer gets one, and a gate fires both ways

`disclose_on_page` had been arbitrated in Phase 3 and never rendered anything.
`renderEntry()` now emits a record's `scope`, and only when the flag is true, so
the synthetic-case disclosure Phase 3 canonicalised reaches all four lesson
footers in one canonical form. Session-2 is the footer this most matters to: its
prose said only that the case is synthetic and never denied a real-world
referent.

`verify-sources.mjs` used to *measure* the gap and print an advisory. It now
tests the gate, and **both directions are hard failures**: every record with the
flag renders its scope in every citing lesson, and every record without the flag
renders no scope anywhere. Direction 1 catches a footer that stopped carrying a
disclosure it is owed; direction 2 catches a maintainer-facing note leaking onto
a reader-facing page. A gate that only ever fires open is not a gate. Both were
negative-tested rather than assumed: forcing it shut fails three records,
forcing it open fails 67.

Direction 2 immediately caught its first case, and it was a merge blocker. The
flag was also set on the two fabricated records, whose `scope` is written to the
maintainer and ends in an instruction in capitals, so two lesson footers were
printing that instruction to readers. The flag is cleared on both. No disclosure
is lost, because the flag was never what disclosed them.

### Repository · One register, because three lists is how work hides

Three phase sections each recorded what a phase left open and nothing reconciled
them. `docs/deferred-work.md` consolidates all three into one table, 40 rows at
its opening: id, phase, description, `file:line`, severity, owner, status.

The design decisions are stated in the file, because a register nobody trusts is
worse than none. Ids never move and are never reused, so a row can be cited
across phases. The phase column records who *raised* it, so the file reads as
history. A row is superseded, never deleted, which is exactly what had happened
to four bullets that got re-raised by the next person to notice the same thing.
The description quotes the string and not only the line, because line numbers
drift on every reflow.

**Consolidating them was the only way to find that four entries had stopped
being true and were still being read as work.** Every `file:line` in the
register was checked against the tree rather than copied from the section it
came from, and five were wrong.

The register later gained a resume-from-cold header (branch, tip SHA, what
merged and when, what the branch carries, and the next five items in order), an
honest BLOCKING definition, and its rows back in id order. The BLOCKING
definition lost a clause it could never reach; the clause is kept struck through
with the date and the reason rather than deleted, because a severity definition
that quietly changes shape is worse than one that shows its history.

### Repository · A lowered ratchet is a row, in the same commit

The second standing rule of the phase: any figure in
`scripts/editorial-baseline.json` that goes **down** opens a row in
`docs/deferred-work.md` in the same commit, carrying the delta and the reason.
Raising a figure is already impossible by rule. It is the *lowering* that has no
natural alarm, because it is legitimate, it is invisible, and the check goes on
passing afterwards against a slacker bar. The procedure's steps make a lowering
correct; the row is what makes it reviewable, and a row nobody can defend is a
lowering that should not have happened.

Step 6's preference that a baseline change be committed on its own now stops
promising something T7 can take away: T7 requires the baseline to reproduce the
classifier exactly, so a cleanup that moves a counted figure fails T7 until the
baseline moves with it. **DW-045** records the three lowerings made before the
rule existed.

### Repository · A check that asks whether the forbidden subject is nearby

Two words cannot go in the blanket retired list, because the words themselves
are correct of one subject and wrong of another. They had been put in check 4
instead, and check 4 is the wrong instrument for them: it passes a match as soon
as **any** permitting word appears within 240 characters either side, so a
paragraph that discusses the legitimate subject and also mis-attributes the word
contains the permitting terms and passes.

New **check 1b** inverts the question. Not "is a permitting subject nearby" but
"is the forbidden subject nearby", within 160 characters. Both checks are
needed: 4 catches the use with no legitimate subject anywhere near it, 1b
catches the use sitting right beside the subject it is wrong about. R6 and R10
are excluded **by offset, not by filename** (`verify-migration.mjs` imports the
region classifier for this one purpose), because a captured transcript is
verbatim third-party output that may not be edited to satisfy a content rule.

Negative-tested in both directions, and there were **no hits on existing
content**, so no content row was opened and nothing was fixed under cover of a
checker change.

### The commits

- **`a8eca07`** Fourteen addressed blocks come off five lessons and the label
  joins the standing purge list; the six style-fence hits are routed upstream
  rather than hand-edited. A9 lowered in all five files. `MAINTAINING.md`, all
  five session files, `scripts/editorial-baseline.json`,
  `docs/unsourced-claims.md`, `docs/case-fact-inventory.md`,
  `docs/deferred-work.md`. **Opens DW-044.**
- **`ca829f0`** `disclose_on_page` gets its consumer and `verify-sources.mjs`
  tests the gate in both directions. `scripts/verify-sources.mjs` (+63/-43),
  `scripts/inject-sources.mjs`, sessions 1 to 4. **Closes DW-011.**
- **`93470bb`** The lowered-count rule, and step 6 stops over-promising.
  `MAINTAINING.md` (+28/-2), `docs/deferred-work.md`. **Opens DW-045.**
- **`2c71767`** The five per-lesson files outside the served pages, fourteen
  bullets, one drop, and the fifteenth block found by disagreeing with the
  previous commit. A9 session-4 entity 83 to 82. Five new files,
  `session-4/index.html`, `scripts/editorial-baseline.json`,
  `docs/deferred-work.md`. **Opens DW-046.**
- **`fc9e9e9`** The two fabricated records stop printing a maintainer directive
  in a reader-facing footer. `SOURCES.md`, `session-2/index.html`,
  `session-4/index.html`, `docs/case-fact-inventory.md`.
- **`95910ec`** The Tier A and Tier B sweep across `index.html` and sessions 1
  to 4, 60 edits, with every re-derived widget threshold unmoved. A9 session-2
  entity 65 to 64 and session-3 literal 91 to 86. `index.html`, sessions 1 to 4,
  `scripts/editorial-baseline.json`, `docs/deferred-work.md`,
  `docs/case-fact-inventory.md`. **Opens DW-047 to DW-050.**
- **`ac2e8b6`** The purge list gains the two tiers as string sets, the five
  classes the rule does *not* reach with an example and a reason for each, and
  the style-fence exclusion the previous entry left loose. `MAINTAINING.md`
  (+38/-0), `docs/deferred-work.md`. **Opens DW-051.**
- **`54a49c7`** Check 1b, and check 4's abbreviated-figure pattern verified by
  negative test rather than by reading. `scripts/verify-migration.mjs` (+50/-0),
  `docs/deferred-work.md`, `docs/case-fact-inventory.md`.
  **Closes DW-015 and DW-016.**
- **`93cadb4`** The register's front door, the honest BLOCKING definition, five
  new rows, and all 46 open rows back in id order with nothing renumbered,
  reworded or dropped. `docs/deferred-work.md` (+41/-3).
  **Opens DW-052 to DW-056.**
- **`41e4b84`** Three decisions close: session-0.1 stays, stays linked and is
  permanently excluded from the two tiers, with two independent reasons and the
  disposition held for whoever schedules that course; DW-048 accepted as-is; and
  no session-5 lesson file is owed, now or later, recorded above the "Adding a
  session" list because that is the one place a later phase would read it as a
  to-do. DW-056 recounted and found wrong by one in each direction.
  `MAINTAINING.md` (+28/-4), `docs/deferred-work.md` (+22/-30).
  **Closes DW-048. Opens DW-057.**

---

## 2026-08-25 · Phase 3.6 · The corrections Phase 3.5 could not make

Branch `claude/phase-3-6-corrections-5jubi0`, eight commits, merged at
`4674620`.

### Session 1 · A price rise the vendor has cancelled

The source page now states that the introductory pricing is the standard price
and that the September increase will not occur. Six carriers were inspected and
edited individually, none by substitution: the two price rows collapse into one;
the note stops saying the price ends tonight and rises tomorrow and says instead
that published rates move and a workload is priced against the pricing page
rather than a remembered number; and three constants were still computing every
reader's paste, the §06 cost bars and the §06 document-pass readout at the
cancelled rate.

Nothing downstream needed re-deriving and each was checked rather than assumed:
the §03 table is at one rate throughout, the ladder is still ten times end to
end, the document-pass spread is still under $1.50, and every tier is still
under two dollars a pass.

The retrieval date on the pricing record moves to the pull that establishes the
standing price, and the three source notes and the vintage line that cite it
move with it, so the page and the record name the same pull. `last_verified` is
untouched and the lock is unmoved. The vintage line **splits**: the capability
figures are still the earlier pull and only pricing moved.

### Sessions 0.1-4 · Every absolute date becomes relative sequence

Every absolute date and term-specific reference across the six lesson files
becomes relative, so the material survives being taught again without a single
edit. Each occurrence was read and converted individually and nothing that
carried sequencing was deleted.

The ratified decision underneath one of them is preserved and is **now stated
rather than implied by a calendar**: the handoff moves 48 hours earlier than the
session that distributes the packages, so they are screened before that session
and handed out inside it. That rule had been carried only by a date plus a
gloss.

Sessions 3's two occurrences are a **correction, not a conversion**. Both said
the handoff package was owed at the end of Session 4, six days out. Session 2
§09 had revised that and says so in the same words, and session 4 §00 and §09
both record the packages as arriving before that session and being screened
before it. Session 3 was never updated.

Each idiom was inspected rather than skipped by pattern: three references to a
weekday are idioms for being back at work and already relative, one is a
hypothetical rather than a schedule, and session-4's Day 33 / Day 39 is a
regulatory breach-notification clock. The hub's term label is a label on the
offering, and removing it would leave the site's vintage unstated while its 2026
tax parameters stay, so it went to the register instead.

*This decision was superseded two days later.* Phase 4's Tier B sweep removed
the relative references outright, on the grounds that the repository is not the
authority for scheduling; DW-047 records the supersession.

### Session 1 · The course platform is named nowhere

The platform appeared by name in exactly two places in the corpus, both in
session-1 §09 and §10 and both the same discussion assignment. The name is the
institution's choice and can change between cohorts while the lessons do not, so
it comes out and the destination stays.

**Removing a platform must not leave an action with nowhere to go**, and the
audit of the surrounding block found one already in that state before this
commit: a three-item list of prompt templates, owed, with no destination named
anywhere in the lesson, while session-2 §00 opens by telling readers to open the
work they had sent. The instruction was the only silent part, and it now names
the destination.

Every other hit in the tree was read and none is the platform: five are the HTML
element of the same name behind a bitmap widget, and the rest name a design
tool. The standing purge list gains the row **with its exclusion written next to
it**, because a bare search returns five legitimate hits and the entry says
explicitly not to automate this one.

### Session 3 · The buy-sell chunk gets the instrument the case has

`CASE.md` §F.6 records the 2014 agreement as requiring corporate consent for any
transfer. The retrieval corpus carried a right of first refusal with a
descendants-trust carve-out instead, which is not a paraphrase of the same
clause but a different instrument: under the corpus version the transfer Part E
proposes sails through, and under §F.6 it does not move at all without the
corporation saying yes. The carve-out is not deleted but **inverted**, so the
descendants trust is now named as a transfer that still needs consent.

The retriever is a live IDF index over the ten chunks, so editing one chunk can
move every score in the exercise. Every figure was recomputed by **executing the
page's own functions out of the file**, not by re-implementing them or reasoning
about them, and every one of the four presets is unchanged to four decimals.
That is a measured result rather than a lucky one: a first draft moved preset 3
because one of its words also appears in another chunk and lowered its IDF, and
a second draft using a different noun put the chunk itself third. Both
alternatives were measured and rejected.

**Two pre-existing findings were surfaced by the re-derivation and flagged, not
fixed.** Two places tell readers the 2023 appraisal scored zero and never
appeared. Both are false and were false before this commit: it ranks third of
ten and appears in the display. The third copy is inside a scored answer key
that was out of scope, and fixing the two reachable copies while the key kept
the wrong figure would put a contradiction inside one lesson where there is
currently a consistent error.

### Sources · A watermarking page that was actually retrieved

The largest single unverified dependency in the corpus had eleven references, no
link, no publication date, no retrieval date and no reachable page. A page has
now been retrieved outside this build environment and supplied with its
substantiations, and it is recorded as a **new key rather than used to backfill
the old one**. Its `scope` is an allow-list rather than a description, and the
record says the boundary is load-bearing: text only, seven substantiations
enumerated, and no adoption figure or market-share claim among them.

**Exactly one reference was rewired, because exactly one is inside the list.**
Ten stay open and each was checked against the list rather than assumed: two are
specification claims the page does not reach; two rest on a paper the page names
and never restates, and that paper has never been loaded either, so its URL is
now carried in the record; two are robustness claims about other media where the
page's robustness claims are about text; one is an adoption paragraph the page
explicitly substantiates nothing of; and two rest on works that are not this
page.

One sentence asserts what the vendor's own current page states, and no build has
ever loaded that page. It now carries the marker in the declared form with an
annotation naming what would resolve it, and the register picks it up. The claim
is not deleted: the paragraph around it exists to teach that a tenfold spread
reported the same month by the same company is a figure worth not repeating.

### Sessions 0.1-4 · The case viewer is one implementation instead of six

A dialog already existed and `verify-browser.mjs` already asserted that it
opens. What nothing asserted is everything a keyboard reader depends on, and
that is what was missing: of the six hand-written controllers, four returned
focus and two did not, and **none of the six trapped it**. Tab walked straight
out of the dialog into a page the reader could not see.

All six are gone. `scripts/inject-case.mjs` generates one controller into the
case span, so every lesson gets the identical implementation. Escape, backdrop
click and the Close button all close it; focus enters on open and cannot leave
until it closes; focus returns to the control that opened it; the page behind is
`aria-hidden` while it is open and only the nodes the controller hid are
unhidden afterwards, so an `aria-hidden` the page set for its own reasons
survives.

A **new-tab view** that did not exist before is a Blob URL built in the browser
from the injected span. No new HTML file, no fetch, no CDN, no storage; the
page's own stylesheet text is copied in as text rather than linked, because a
link to a font host would be the one request this control exists to avoid.

**Accessibility is asserted, not claimed.** `scripts/test-case-viewer.mjs`
drives Chromium: 29 assertions per lesson, 174 in all, every one read off the
rendered page. It tabs past the last stop and past the first and checks where
focus landed; it presses Escape and reads which element has focus after; it
opens the Blob document for real with its requests recorded and asserts the
count is zero. The non-colour requirement is measured as three independent
channels rather than asserted. One gap is registered rather than hidden: the
layout CSS is still six hand-written copies with nothing asserting they agree.

### Sessions 0.1-4 · The retrieval corpus becomes a case fact

`CASE.md` gains **Part O**. The ten chunks session-3 ranks and the five turns of
its §07 meeting excerpt live there, and the lesson reads them from the injected
span. The brief named three artifacts; all ten chunks moved, because every one
of them restates a Part F document the same way the buy-sell chunk did, and a
corpus half-generated and half-hand-written is a worse invariant than either
end.

`scripts/build-case.mjs` now fails hard if the chunk count or the ids change, if
a chunk falls under 40 characters, if the consent gate leaves the corpus, or if
§F.6 stops requiring one. **That last pair is the structural half of the
promise: the corpus and §F.6 cannot disagree without the build stopping.**

Every preset was re-run through the shipped route rather than the old array and
every figure is unchanged to four decimals. The drift surface moved in the right
direction and is generated rather than asserted: unguarded 110 to 107, injected
1794 to 1812.

One finding was imported rather than resolved. The excerpt is an advisory
meeting with an Advisor speaking, and §A.5 records no investment adviser of
record. Moving it into `CASE.md` does not settle that; it makes it unavoidable.
The conflict is written next to the excerpt in Part O and carried as **DW-041,
BLOCKING**.

### The commits

- **`cce76a6`** The cancelled price rise, across six carriers, with the vintage
  line split. A9 session-1 entity 83 to 81. `session-1/index.html`,
  `SOURCES.md`, `DATA-PULL.md`, `docs/source-verification-queue.md`,
  `scripts/editorial-baseline.json`.
- **`5326e5f`** Every absolute date across the six lesson files and the hub
  becomes relative sequence. A9 session-3 literal 94 to 93. `index.html`, all
  five session files, `scripts/editorial-baseline.json`.
- **`92ff1e3`** The platform name comes out of session-1 §09 and §10, the silent
  instruction gains its destination, and the purge list gains the row with its
  exclusion. `session-1/index.html`, `MAINTAINING.md` (+13/-0).
- **`6041e6b`** The §16.3 buy-sell chunk rewritten to §F.6's consent gate, with
  all four presets re-derived by executing the page. `session-3/index.html`
  (+1/-1).
- **`7c3296b`** The retrieved watermarking page recorded as a new key, one
  reference rewired, ten left open and enumerated by line, and one claim marked.
  `SOURCES.md`, `BIBLIOGRAPHY.md`, `DATA-PULL.md`, `session-4/index.html`,
  `scripts/sources-verified.lock.json`, `docs/unsourced-claims.md`,
  `docs/source-verification-queue.md`.
- **`53d9a1b`** `docs/deferred-work.md` opens at 40 rows, three parallel lists
  are superseded as queues and kept as history, and four stale entries are found
  by the consolidation. `docs/deferred-work.md` (+96/-0), `MAINTAINING.md`,
  `docs/repo-updates-plan.md`. **Opens DW-001 to DW-040**, the register's whole
  opening population.
- **`32f2649`** The one generated case-viewer controller and its Blob new-tab
  view, `scripts/test-case-viewer.mjs` (new, 231 lines, 174 assertions), and
  `CASE.md` Part O with the corpus generated into the span. A9 session-3 literal
  93 to 92, by region change rather than deletion. `CASE.md` (+154/-0),
  `MAINTAINING.md`, all five session files, `index.html`,
  `scripts/inject-case.mjs`, `scripts/build-case.mjs`,
  `scripts/case-corpus.json`, `scripts/test-case-viewer.mjs`,
  `scripts/editorial-baseline.json`, `docs/case-fact-inventory.md`,
  `docs/deferred-work.md`, `docs/unsourced-claims.md`.
  **Opens DW-041, DW-042 and DW-043**, and moves the locators of fourteen
  existing rows that the rewrite displaced.
- **`182239f`** Owner commit on the branch: the rebuild-notes file in `audit/`
  is marked DO NOT USE at its head. No lesson, script or record changed.

---

## 2026-08-25 · Phase 3.5, after the entry that recorded it

Branch `claude/case-unification-7mhzr6`, merged at `7efd595`. The entry below
this one was written at `ae0cc67`; these two commits landed on the same branch
afterwards and were merged with it.

### Session 4 · A marker weakened, and the reason written on the annotation

The luminance-discrimination figure was marked as needing a source, on the
reasoning that the physics is standard. It is. But the marker does not assert
that the physics is standard, it asserts that **somebody checked this figure**,
and nobody had: no primary text stating it in the form the widget uses was
retrieved, the reported spread is wide, and the candidate is a low-confidence
secondary. It moves to the weaker marker, which is the rule the same
phase had just written for itself: default to the weaker marker when unsure,
because a wrong weak marker gets read and discounted while a wrong strong marker
gets read and believed.

The annotation records the change and the reason, so the next reader knows it
was reconsidered rather than never considered. The register moves to 12 marked
claims, 8 weak and 4 strong.

### Repository · A baseline diff that shows which figure moved

The commit that lowered session-2's A9 entity count had reformatted the whole
file doing it, which is the one thing the re-baselining procedure asks a
baseline commit not to do. A 207-line diff shows nothing. Same value, same note,
original layout: against main the file now differs on **two lines**, the figure
and the note recording why.

### The commits

- **`7bc8e6f`** The marker weakening and its annotation. `session-4/index.html`
  (+1/-1), `docs/unsourced-claims.md` (+6/-6).
- **`6eb83a7`** The baseline file's hand formatting restored, reducing the
  ratchet edit to two lines. `scripts/editorial-baseline.json` (+74/-133).

---

## 2026-08-25 · Case unification, source dating, unsourced claims

### All six files · Every quantitative case fact now appears once

The Cole household's figures were written out by hand in 182 places across the
six files, in prose, in answer keys, in chart data and in the feedback strings a
student reads after answering. Every one of those was a copy that could drift
away from `CASE.md` without anything noticing, and several already had.

**Five remain, and all five are inside a captured transcript**, which is left
verbatim because editing a transcript would make it a fabrication.

Everywhere else the figure either comes from the one generated block the case
modal already carries, is read from it by the exercise code, or is pinned so that
changing `CASE.md` without changing it fails the build. A lesson may now say
"Meg's largest asset is her CPC interest"; it may not restate the valuation.

### The same sentence was wrong in four lessons

Sessions 0.1, 1, 3 and 4 all said the structure "moves 900 non-voting LLC units
to a grantor trust by a $2,002,000 seed gift and a $20,020,000 demand note."
The gift and the note move **572**. The remaining 328 are bought over five
years out of the dividend, which is the mechanism the whole five-year schedule
exists to describe.

### Facts that had drifted, and are now what the case says

- **The 2014 buy-sell is executed, not unsigned.** Session 0.1 called it
  unsigned twice. It was signed, never amended, and its transfer restrictions
  are live against the very transfer the proposed structure makes.
- **Meg did not found the company.** Her father founded it in 1987 and sold it
  to her in 2016; what she paid is her basis. Three places called her the
  founder, one of them a revealed answer key.
- **The note is payable on demand.** Two lessons still described it as a
  nine-year interest-only note, and one scored a student for writing so. A third
  called it a balloon.
- **Nobody is buying the company.** A competitor wrote once in October 2025 and
  Meg replied that it was not for sale. Four lessons had a strategic buyer
  expressing informal interest.
- **The three confidentiality landmines are the three the case file names.**
  Three lessons carried a different third.
- **Nothing in the file supports the discount.** Session 4 called the 2023
  appraisal the evidentiary support for it, 25 lines below its own label saying
  the appraisal contains no discount study.
- **There are no seed-gift funds to wire.** The seed gift is 52 units of an LLC.

### Sources · Two dates, and only one of them is yours

Every source record now carries **`last_verified`** and **`last_retrieved`**.
The first says the instructor read the source and confirmed what this repository
says about it. The second says a machine fetched it, and when, and nothing about
whether it is right.

**54 of 58 sources have an empty `last_verified`, and 143 of the 176 citations
in the course stand behind them.** That is the honest state of the evidence, not
a backlog. Nothing in this repository can fill that field in: the tool that
writes it refuses unless a person is at a terminal, and every generator refuses
to run if the date moves without one.

`docs/source-verification-queue.md` is the work list, sorted so that the source
eleven claims rest on comes before the one that carries none.

### Sources · What changed underneath the lessons

- **The Sonnet 5 price rise was cancelled.** Session 1 teaches that it "ends
  tonight and rises 50% tomorrow", on a course dated 31 August. Anthropic's page
  now says the introductory price is the standard price and the increase will
  not occur.
- **The OWASP page cited for prompt injection is now an archive.** The teaching
  claim survives — prompt injection is still number one — and the citation does
  not.
- **Session 3 teaches 3.3% as the best grounded hallucination rate.** It now
  ranks third; the best is 1.8%.

None of these was silently updated. Each is recorded with what depends on it.

### Zhao et al. (2024) is a real paper

Session 4 names it for the regeneration attack on watermarked images and no
source entry existed for it. It is real — NeurIPS 2024, and the authors'
repository carries the citation verbatim — so the source was added and the
confidence chip, which had been pointing at an SEC speech that says nothing
about watermarking, now points at the paper.

### Twelve claims are marked, and the marker says which kind of gap it is

`[NEEDS SOURCE]` means the claim is right and a citation has not been attached.
`[UNCONFIRMED]` means no source corroborates it and the claim itself is in
question. Seven are `[UNCONFIRMED]`.

The heaviest is in Session 4: the page tells students that nothing they generate
in the course is watermarked, and Anthropic appears to have begun marking all
Claude output on 2 August 2026. `docs/unsourced-claims.md` lists all twelve,
sorted by how much depends on each.

---

## 2026-08-25 · Sources

### Sessions 0.1-4 · Twenty confidence chips pointed at the wrong source

A confidence chip tells you where a claim came from. Twenty of them named the
wrong work, and the errors were not random: they came in runs, where a sentence
naming three sources in order carried the three keys shifted by one.

- **Session 4 credited a securities-privacy rule with Anthropic's terms of
  service**, credited an SEC official's speech with two watermarking findings and
  two benchmark scores he never mentioned, and credited FINRA with OWASP's
  ranking of prompt injection. Its Deloitte and Surfshark fraud figures were
  swapped onto each other's neighbours.
- **Session 3's hallucination-rate chart** credited Vectara with Magesh et al.'s
  legal-research study, and Anthropic with Vectara's leaderboard.
- **Session 2 credited Google's prompting guide** with a University of Michigan
  paper on whether personas help.
- **Ten claims were credited to the Cole household**, which is a synthetic
  teaching case that has never said anything about Regulation S-P, FINRA's
  oversight report, or model benchmark scores.

Every rewire is recorded with the evidence for it in `docs/chip-rewiring.md`.

**Nineteen were found by hand and the twentieth by a rule built to find them.**
The rule reads a source's own "Used for" description and asks whether some other
claim on the page matches it better than anything currently pointing at it.

### The whole corpus · One source list, and it is now generated

Four lessons cited Wolfram's essay four different ways: two date formats, two
capitalisations of the title, the publisher named in two of them, and a
confidence label in two. Seven other sources diverged the same way.

**There is now one record per work**, in `SOURCES.md`, and each lesson's footer
is written from it. A source cannot be described two ways any more, because
there is only one description.

- **`BIBLIOGRAPHY.md`** lists every work with its link, author, publication date,
  date last accessed, how many times the course cites it, and every lesson and
  section that does. Wolfram appears in eleven sections; a compliance source
  appears in one.
- **Where a detail could not be verified, the bibliography says so** rather than
  leaving a tidy gap. Fifty-three of fifty-seven records have at least one.
- **`DATA-PULL.md`** lists every figure that moves — prices, benchmark scores,
  vendor policies, leaderboard positions — with when it was retrieved and which
  sections would change if it were retrieved again. Twenty-two of the
  fifty-seven works are moving targets.

### One figure disagrees with itself, and the register now says so out loud

The Artificial Analysis benchmark data appears in three lessons under three
different version labels. **The later label carries figures identical to the
unlabelled one, and the earlier label carries figures that differ from both on
every model they share.** The version is not tracking the data.

Rather than pick one and tidy the appearance, all three retrievals are recorded
and the register runs a check that fails on exactly this: a later retrieval may
not carry an earlier version. It fails today.

**Also recorded and deliberately unresolved:** Session 1's §05 price data is
attributed to Artificial Analysis in five places on the page, and was described
in planning as coming from a different benchmark entirely. The page cannot say
which is right, and it is not guessed at.

### What is flagged rather than fixed

- **Ten claims have no source anywhere in their lesson** and are still credited
  to the teaching case. Among them a named 2024 paper the footer never lists, two
  statutes, and two model specification sheets.
- **Five sources are listed by a lesson that never cites them.** The sharpest:
  Session 2 teaches Google's Persona-Task-Context-Format framework and cites its
  source nowhere.
- **Five moving figures have no retrieval date at all**, one of them behind
  eleven references.

---

## 2026-08-25

### Sessions 1-4 · The appendix reads in place, and the core is what loads

**The single biggest change to how these lessons read since the core/appendix
split was introduced.** The appendix used to be a block at the end of the file.
Each of its sections carried a gold bar saying which two core sections it
belonged between, and each core section carried gold teasers offering the
sections that followed it. A reader had to jump forward, read, and jump back.

Now every appendix section sits where it belongs, in reading order, immediately
after the core section it extends. The forty-two pieces of jump-and-return
furniture are gone: **22 return bars and 20 teasers**, all of which described a
navigation the reader no longer performs.

- **The page loads on the core.** Previously it loaded with everything visible
  and the reader could narrow it. The core is what always gets taught, so it is
  what you get; the depth control adds the appendix back in place, at whichever
  of the three depths you choose.
- **The appendix index moved to the front and became a contents panel**, beside
  the depth control, so what you are skipping and what it would cost are on the
  page from the first screen rather than two thirds of the way down. It stays
  visible in core-only mode, and stays out of a core-only printed handout.
- **Setting a shallower depth now removes a section rather than fading it.**
  A faded section is one people read anyway. In its place is a one-line card
  naming the section, its minutes and its depth, so nothing disappears silently
  and every link into it still lands.
- **Session 3's Hybrid Search and Session 4's The Thirty-Day Clock now have a
  way in.** Sixteen minutes of authored material each, with no index card and no
  link from anywhere on the page since they were added.
- **A closing question in every lesson**, in the last core section, answerable
  from that night's core alone.

### Sessions 1-4 · Nine places stated the running time and they disagreed

The core minute figure was hand-typed in up to nine places per lesson. All nine
are now generated from the sections by `scripts/build-appendix.mjs`, so they
cannot drift apart again, and two of them had never been checked by anything:

- **Session 2's on-page time budget** credited the appendix's next-token section
  with 9 minutes against its actual 16, the final-project section with 10 against
  5, and **had no row at all for the eight-minute cold open** — it predated the
  ritual.
- **Session 3's footer** said twelve core sections running 64 minutes with four
  appendix sections adding 48. The real figures are thirteen, 70, five and 80.
- **Every lesson's time budget claimed "the core alone is the one-hour
  version."** Sessions 3 and 4 run 70 minutes. The page now says what the lesson
  runs, and says it is ten minutes over the hour where it is.
- The Sampler Lab's index card said 18 minutes; the section says **16**.

### Session 4 · A recall question tested something Session 3 never showed

The Session 3 recall bridge asked students to distinguish grounding from
fine-tuning. Session 3 teaches that distinction in exactly one place, an
appendix section — so with the appendix now genuinely optional, the ordinary
student was about to be asked to recall something they had never been shown.

The item now tests the architecture decision Session 3's **core** does teach:
for a corpus of nine documents, well under the published threshold, put the whole
thing in the prompt rather than building retrieval over it. Same slot, same
depth, same point about being sold the wrong thing.

**Three other places assumed appendix material and were rewritten.** Session 1's
close listed five things students "built by hand" and all five happened only in
the appendix; its tier exercise told readers to recall an appendix section by
name; Session 2's temperature section told readers to pull up responses they had
generated in an appendix. **Ratified as a standing rule:** a recall bridge tests
the prior session's core, never its appendix.

### Repository

- **`scripts/build-appendix.mjs`** generates the reflow and every minute copy.
  Idempotent; `--check` detects a hand-edit inside a generated region.
- **The editorial checker's hard findings fell from 28 to 5.** The five that
  remain are the mis-wired confidence chips, which are the next piece of work.
- **`A4` could have been disarmed by a rewording.** Its check matched one exact
  sentence and passed silently when that sentence changed. It now accepts both
  forms and fails when a lesson states no figure at all.
- Two upstream defects are recorded in `MAINTAINING.md` rather than worked
  around: the lesson validator reports every footer citation hyperlink as an
  external network request, which is why the documented pre-push gate has never
  run clean; and Session 1's discussion block is 17 minutes where the ratified
  build parameter says 15.

---

## 2026-08-23

### Repository · Editorial rules and their checker

**No lesson file changed.** This entry adds a rules document, a checker and its
baselines. Every violation the checker finds is reported and left standing.

- **`EDITORIAL.md` ratifies the house rules for student-facing prose.** Nineteen
  Part A rules a validator decides, nine Part B rules needing a human read, and
  the split is the point: a rule a script decides 80% of goes in Part A with its
  residue named as a Part B rule rather than averaged. The open em-dash decision
  is ratified as D1 — existing copy keeps its dashes, newly authored text uses
  none, and there is never a repo-wide substitution.
- **`scripts/verify-editorial.mjs` and `scripts/editorial-regions.mjs`.** The
  classifier assigns every character to one of eleven regions, because every
  alarming raw count in this corpus turned out to be something else once
  classified: the 1,239 hits for `color` are CSS properties, and session 3's 110
  literal em dashes are the original author's convention, present in the first
  upload before any automated pass.
- **The checker is advisory and outside the pre-push gate**, by decision D16.
  It reports 28 hard findings and 31 advisory. The largest are mechanical and
  nothing previously owned them: appendix index cards disagree with their own
  sections in all four lessons, and two appendix sections — session 3's C5 and
  session 4's D5, 16 minutes each — have no index card and no inbound link from
  anywhere on the page.

**Two rules were wrong until seeded violations found them, and that is the
substance of this entry.**

- **A10 could not see `&mdash;`.** The rule guarding dashes inside quoted matter
  matched only the literal character, and this corpus writes its quotations with
  entities. It had been passing clean against every lesson while structurally
  blind to the one case it exists for — a check that cannot fail is not a check,
  and reading it did not reveal that. Fixed to normalise both dash forms
  alongside the quote marks. The corpus is still clean under the corrected rule,
  so the finding that no dash sits inside an attributed quotation survives a rule
  that can now actually see one.
- **A13's first formulation could not catch either cascade.** It fired when a
  chip's source surname was absent from the sentence. But in both real
  off-by-one cascades — session 4's Gartner/Deloitte/Surfshark sentence and
  session 3's Magesh/Vectara/Anthropic caption — every named source *is* present
  and only the attachment is shifted, so no surname is ever absent. It found
  neither and produced four false positives. Replaced by an ordered shift test,
  which catches both and nothing else.

Both were found by seeding a known violation into a scratch copy and requiring
the rule to report it, not by review. A rule that has never been observed failing
is not yet a rule.

- **Three "Known follow-ups" close**, each pointing at what owns it now: the
  em-dash policy (D1, enforced by A8 and A9), the prose-density band (D15, and
  the previously published 73–89 range is not reproducible — whole-file is 43–63,
  the core 52–84), and orphan footer sources (A15, which asserts a chip *or* a
  declared reason, because the blanket rule would have demanded a confidence chip
  on the two deliberately fabricated citations).
- **`docs/editorial-gap-report.md` joins the purge check's register list**,
  alongside the spine brief. Its verification-surface section quotes
  `verify-migration.mjs`'s own check descriptions, which necessarily name every
  retired string they search for — a record of the retirement, not an assertion
  of it.

### All sessions · CASE.md v4.0 migration

- **CASE.md v4.0 replaces the whole fact set** and every lesson is rebuilt
  against it. The Coles are lifelong Illinois residents, the company is in
  Rockford, and the balance sheet is $67,000,000 against $30,000,000. The
  recapitalization is 1,000 LLC units, 100 voting and 900 non-voting, at a 30%
  discount; the seed is 52 units at $2,002,000 and the sale 520 units at
  $20,020,000 on a demand note at 3.82%. Meg bought the company from her father
  in 2016 for $14,000,000 and did not found it. A $1,000,000 inherited IRA is
  new, running a ten-year clock to 31 December 2031 with annual RMDs.
- **Ohio and Dayton are gone, and the replacement is not a name swap.** Ohio
  imposed no estate tax; Illinois taxes estates above $4,000,000, does not index
  it, and does not allow portability, and adjusted taxable gifts are added back
  in testing the threshold. That exposure is now taught rather than absent.
- **QSBS and IRC §1202 are removed entirely** as out of scope for this course,
  and not replaced.
- **The grantor tax is presented as the burn**, a transfer of value to the trust
  that consumes no exemption and is not a gift, per Rev. Rul. 2004-64.
- **The recurring four-session framing question is retired** by CASE.md Part K,
  which forbids reintroducing it and supplies no replacement. Its sockets are
  marked `VOID: needs replacement` in the lesson source and are deliberately
  empty. `docs/spine-brief.md` collects the material for a new one; choosing it
  is the instructor's decision.
- **The case block is now generated, not maintained by hand.**
  `scripts/build-case.mjs` reads CASE.md and emits `case-facts.json`,
  `case-extract.html` and `case-flowchart.html`; `scripts/inject-case.mjs`
  replaces the span between the CASE sentinels in each of the six files;
  `scripts/verify-case.mjs` hashes each injected block and exits non-zero on
  drift. Sessions 0.1 and 1 each carried two copies of the block and now carry
  one. Sessions 2, 3, 4 and the hub had no case modal and now have one, with a
  Structure tab carrying the Part L flowchart.
- **`scripts/diff_case_block.py` retired.** Against CASE.md v4.0 it extracted
  the Part L flowchart as "the canonical block" and could only fail.
- Entries below this one describe the repository as it stood before v4.0 and are
  left unedited. A changelog that is rewritten to match the present is not a
  changelog.

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
   basis and a $1.2M seed gift against CASE.md v4.0's $55,000,000 company,
   $38,500 non-voting unit, $14,000,000 basis and $2,002,000 seed. Both ship
   verbatim, because editing
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

### Live model console · Sessions 0.1 and 1 (new)

Sessions 0.1 and 1 gain an optional live model console. A reader pastes their
own free Gemini API key into a box at the top of the page and the probes on that
page run against a live model instead of the captured outputs. It is off by
default and nothing depends on it.

This is the first time any page in the course makes a network request beyond
Google Fonts, so it is an architectural exception and is recorded as one. The
reasoning, the alternatives rejected, and the pedagogical case are in
`docs/gemini-live-api-feasibility.md` and `docs/live-model-console-plan.md`.

### Live model console · why bring-your-own-key, and why only these two sessions
- **A single shared course key was analysed and rejected.** Google's free tier
  terms permit training on submissions and human review; a key in a static page
  is public the moment it ships and is a GitHub secret-scanning partner pattern;
  and the free quota was cut 92% without notice in December 2025. Each student
  using their own key removes all three problems at once.
- **Scoped to Sessions 0.1 and 1 deliberately.** Every prompt on those pages is
  a public fact or synthetic Cole household data already published on this site,
  so there is nothing confidential to send. Sessions 2 to 4 build on students'
  own client work and must not get this treatment.

### Live model console · Session 1
- **The Kalai probe in section 04 now runs live when a key is connected.** It
  previously rendered three hardcoded dates and asserted its own conclusion,
  which made an empirical claim about model behaviour unverifiable by the reader
  in a course built on the opposite standard. The three captured dates remain
  and render whenever no key is connected or a call fails.
- **The verdict was rewritten to report what happened rather than what was
  supposed to happen.** Divergent answers, identical answers and a refusal are
  now all handled, and each teaches: convergence gets the harder lesson, that a
  stable wrong answer is the one that survives being asked twice. The old text
  could be contradicted by the model it was describing.
- **Appendix A5 gains a live temperature control** below the existing nine-control
  simulator, which is untouched. The simulator teaches why temperature changes
  the output; the live control shows that it does, on a real distribution.
- Source line for the Kalai section now records that the captured dates are the
  paper's DeepSeek-V3 runs and that a live run is the reader's own observation,
  carrying no confidence chip.

### Live model console · Session 0.1
- **Section 08 gains run 4: the same probe with none of the five layers.** Runs
  1 to 3 and the runbook table are unchanged. Run 4 sends the section 01 probe
  through the bare API with no system prompt, personalisation, retrieval, tools
  or history, which makes the five-layer frame a measured difference rather than
  a diagram. Hidden entirely unless a key is connected.
- Prompt is byte-identical to P1 in `docs/probe-captures.md` so the comparison
  against runs 1 and 2 is exact.

### Live model console · both sessions
- Console is collapsed by default, carries the free-tier data warning and an
  instruction to verify the page's only outbound origin before pasting anything,
  and includes a free-form prompt box.
- **No storage of any kind.** The key lives in one JavaScript variable, never
  reaches localStorage, sessionStorage, a cookie or a URL, is never written into
  the DOM, and is cleared from the visible field on connect so it does not sit
  on a projector. The repository's existing storage grep is now the regression
  test for this.
- Every live element degrades to its captured form automatically on no key,
  rate limit, timeout, offline, safety block or empty response. A reader who
  never connects a key sees both lessons exactly as they ran before this change.
- Model list is discovered at runtime rather than hardcoded, so an upstream
  model rename does not break a lesson mid-class. Forty-call per-page ceiling
  protects a student's daily free quota.
- Instructor notes added to both sections: connect before sharing the screen,
  and say aloud that the simulations teach the mechanism while the live call
  shows the mechanism is not a teaching fiction.

### Live model console · repository
- `MAINTAINING.md`: the externals rule now allows a second origin, with the
  conditions on it; a new section documents the three shared fences, the ES5
  constraint, the two-`<script>`-block trap in Session 1, and the rule that
  model output is written with `textContent`; the pre-push gate gains checks
  that the new origin appears only in Sessions 0.1 and 1 and that the shared
  blocks stay byte-identical.
- `README.md`: the "transmits nothing" promise was true and is now qualified
  rather than deleted, with a subsection explaining exactly what the console
  sends, when, and why it is on these two pages and not the others.
- `scripts/test_live_console.js` added: 64 browser assertions against a mocked
  endpoint, covering the no-key path for both lessons, bad keys, rate limits,
  divergent and convergent verdicts, key hygiene, output escaping and print.
- `docs/probe-captures.md`: P4 entry added for run 4, marked UNVERIFIED until
  captured against a real key.

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
