# Session-1 feedback inventory

**PROVENANCE WARNING — READ BEFORE USING ANY NUMBER IN THIS FILE.**

This file is NOT the measured inventory. The measured inventory was produced by
Claude Code against the working tree and was never committed; it exists only as
chat text in a session that will close.

This file is a transcription of what that session REPORTED into the deliberation
chat, with four later corrections applied. It carries headline counts only. It
does not carry the underlying file:line data for any PART, and three PARTs were
never reported at all.

Rules for use:
- Any figure here is [M] confidence at best — reported, not re-measured.
- Any PART marked NOT RECOVERABLE must be re-measured before it drives an edit.
- Do not cite this file as a source in any lesson.
- Claude Code: MERGE your measured data into this file. Do not overwrite it —
  the corrections in §C and §D exist only here.

Transcribed: 2026-08-28. Measurement session base: f975742a64f926f2d73f7a6f8ae42dae49443943.

**AMENDED 2026-08-29 (Pass 3).** §F is measured against `9924f11` and supersedes the
NOT-RECOVERABLE markers on PARTs 4 and 8. **Read §F-0 first: the `acd691f` this file
cites in §A and §B PART 3 does not exist in this repository, and the Pass 2 state §C-3
describes is not in this tree — `A9` for session-1 measures 77, not 69.**

Note (corrected 2026-08-29, see §F-0.3 — this file is in `docs/`, not `audit/`):
`audit/` is what MAINTAINING.md designates as a
deliberately kept historical record outside the purge check's scope. Retired
strings quoted here are expected and are not defects.

---

## §A — status of each PART

| PART | Subject | Status |
|---|---|---|
| 1 | String presence | PARTIAL — absent list only, no file:line for present strings |
| 2 | Date/time buckets | PARTIAL — bucket totals only; see §D-1, arithmetic does not close |
| 3 | Canvas / LMS | SUPERSEDED by Pass 2 BLOCK A, `acd691f` — the SHA was absent when §F was measured and landed on `main` 2026-08-29; see §F-0.1's merge note |
| 4 | Instructor-addressed constructs | **RE-MEASURED 2026-08-29 — see §F-1.** 80 constructs, region-classified |
| 5 | Grading / final-project residue | PARTIAL — two survivors named |
| 6 | Title inventory | **FLAT LIST RECORDED 2026-08-29 — see §F-3 and §F-6.** 419 titles; headline corrected |
| 7 | Interaction implementation | (d) full; (a)(b)(c) headline only |
| 8 | Number provenance §02/§03/§08 | **RE-MEASURED 2026-08-29 — see §F-2.** 172 numbers; zero CASE.md contradictions |
| 9 | A9 em-dash counts | Superseded by Pass 2 measurement, see §C-3 |
| 10 | Validator baseline | Full |

---

## §B — what was reported

### PART 1 — string presence

Nine fragments returned ABSENT:

```
graded component of Final Project Part 1
That is a graded component
Week 1 Canvas discussion
Reading due before Session 2
The question that stays open all four sessions
Instructor note
holds 23.4% of the mass
Setup for Thursday
Also due
```

Seven were purge-confirmed with commit evidence: `95910ec` x4, `5326e5f` x2,
`a8eca07`. One survives only in `docs/spine-brief.md`.

`holds 23.4% of the mass` is a different case and not staleness. `git log -S`
returns zero commits repo-wide across all history. `session-1:2486` builds the
figure at runtime from the harmonic distribution at `:2461`; H(40)=4.278543
makes `PLP[0]` render as 23.4%. No grep can find it. It is read off the
rendered page.

**Open question, now partially resolved — see §D-3.** The distribution is
confirmed constructed. What remains unmeasured is whether the page says so.

File:line for the fragments that were PRESENT was never reported.

### PART 2 — date and time inventory

| bucket | idx | 0.1 | s1 | s2 | s3 | s4 | total |
|---|---|---|---|---|---|---|---|
| (a) purge target | 2 | 7 | 9 | 6 | 19 | 17 | 60 |
| (b) citation year | 0 | 0 | 18 | 32 | 69 | 46 | 165 |
| (c) source metadata | 1 | 92 | 17 | 22 | 12 | 17 | 161 |
| (d) legal identifier | 0 | 0 | 3 | 27 | 17 | 57 | 104 |
| (e) case fact | 0 | 1 | 20 | 13 | 21 | 13 | 68 |

Reported total 845, R6 injected span counted only (228), never quoted.
**Arithmetic does not close — see §D-1.**

Also reported: only 3 of bucket (a) are `Fall 2026`; `session-1:2178` is a
second copy of DW-009 that no register row names.

### PART 3 — Canvas / LMS — SUPERSEDED

Pass 2 BLOCK A (`acd691f`) found **zero purgeable hits repo-wide**. The
retirement landed 2026-08-25 and DW-047 finished it. Every survivor is a
documented exclusion:

```
session-4:1575   <div id="pfCanvases">          R3 attribute
session-4:2885   <canvas> element                R2
session-4:2891   getContext('2d') fallback       R2
session-4:2921   "Canvas unavailable" card       R2
```

`grep "\bLMS\b"` over served pages returns nothing. `index.html:1037` —
"This is the live course site" — is the ratified replacement, working.

### PART 4 — instructor-addressed constructs

**NOT RECOVERABLE.** Never reported. Required input for Pass 3 TASK 3.
Re-measure: constructs a student reading alone cannot act on, beyond the three
DW-054 names. Give the sentence and the line.

### PART 5 — grading / final-project residue

Not zero. Two survivors:

```
session-3:2697   final-project weightings stated as fact
                 survived Tier A because it is a JS string literal
session-4:1264   asserts a deliverable was submitted, read and screened
```

Root cause, filed separately: the purge checks cannot see inside JS string
literals or runtime-generated strings. Two independent proofs — the above, and
the `23.4%` figure invisible to `git log -S`.

### PART 6 — title inventory

- 250 titles across hub + sessions 1-4: **197 DESCRIPTIVE / 53 ACTION-ASSERTION**
- 70 are section titles
- +26 in `session-0.1` (22/4), excluded
- **session-1 is the outlier: 18 of the 53 ACTION titles — 42%, against session-3's 7%**
- 102 titles read elsewhere: 71 in generated regions, caught by `build-appendix --check`

Coupled-title figure corrected — see §C-2. Flat list never reported.

### PART 7 — interaction implementation

(a) §00 cold-open capture — headline only, detail not reported
(b) §01 work-along gate — passes on any non-empty input
(c) §07 answer key location and keyed answers — not reported

(d) **§08 — full finding.** Never bound. It is a click-to-classify mislabelled
a sorter. Pass 5 is a rebuild, not a fix.

```
grep -c "draggable|dragstart|dragover|dragend|dataTransfer|ondrop"
  = 0 across all 3,273 lines
chips render as <button>        session-1:2988
only handler is c.onclick       session-1:2990
```

The handler lights the item's own keyed bucket and re-parents nothing. The
learner never chooses a bucket. `npiScore` counts clicks, not correct
placements — **the exercise cannot be failed** — while the prose reads "Sort
all eight and find them." Rebuilding drag alone ships a different defect; the
key must be withheld until commitment, as the neighbouring commit-first MCQ
already does.

### PART 8 — number provenance, §02 / §03 / §08

**NOT RECOVERABLE.** Never reported. Required before any §02/§03/§08 content
edit. Re-measure: for every rendered number, case-derived via `inject-case` or
hand-authored; and for each hand-authored one, whether CASE.md carries a
contradicting value.

### PART 9 — A9 em-dash counts

Reported as zero headroom, HEAD reproducing the baseline exactly on all five.
Superseded by Pass 2's execution measurement — see §C-3.

### PART 10 — validator baseline

All 16 exit 0 at the measurement HEAD. `verify-style.mjs` requires
`RESTYLE_SWEEP` set; the skill re-synced to a new UUID path between sessions.
`validate_lesson.py` exits 1 with 7 fail / 2 warn — documented upstream V2
`<a href>` false positives and the V6 interaction band, pre-existing.

---

## §C — corrections applied

**C-1 · main SHA.** The measurement session reported `main` as `db3a0dce` and
five merges behind. Wrong. `db3a0dce` was a stale `origin/main` from a
`--depth 50` shallow clone dated 2026-08-23T14:40:45Z; the session never
fetched. `f975742` is the merge commit of PR #10 into `main`, parents
`4674620` (PR #9) and `41e4b845` (Phase 4 tip), merged 2026-08-27T17:29:26Z.
**The divergence was never on the remote. Every PART was measured against the
correct tree.**

**C-2 · coupled titles.** "16 read by data-nav or JS with nothing checking
them" was wrong. Corrected by DW-063 to **9 unguarded + 3 non-titles + 4
generator-protected**. The real exposure is different and larger: **66 section
titles whose `data-nav` differs from the `<h2>`**. This roughly triples the
cost of the repo-wide title sweep.

**C-3 · A9 for session-1.** Reported as 76 in the phase handoff. Pass 2
measured **77** by executing `classify()` / `authoredProse()` from
`scripts/editorial-regions.mjs`, then lowered it to **69** (entity 76 to 68).
Rows `DW-058` (4 dashes deleted with prose) and `DW-059` (4 dashes converted,
sentences retained — the repo's first lowering by conversion). Use 77 as the
pre-Pass-2 figure, not 76.

**C-4 · the `.verify` family.** DW-054(b) reported 13 sites. Corrected by
DW-061 to **10 carrying `class="verify"`**; the other three are a source note,
a script literal, and a srcnote — one of them inside a scored answer panel.

---

## §D — unresolved defects in the inventory itself

**D-1 · PART 2 does not sum.** 60 + 165 + 161 + 104 + 68 = 558. Plus the 228
R6 injected span = 786. Reported total: 845. **Gap of 59, unexplained.**

Row and column sums both verified as internally consistent: every bucket row
sums to its stated total, and the per-file columns sum to
idx 3 / 0.1 100 / s1 67 / s2 100 / s3 138 / s4 150 = 558 across both axes.
The 59-hit gap is therefore in the 845 figure itself or in a population
counted in the total but absent from the table — **NOT in any bucket row.**

Nothing has been edited on the strength of these totals, so no edit is
invalidated. Do not cite 845 until this closes.

> **AMENDED 2026-08-29 — see §F-5.** The `228` is the four-digit-year SUBSET of the R6
> population, not the population: the CASE span is byte-identical across all six served
> pages (53988 chars, md5 `66aa7266f0523b606a1bfb6e88693594`) and carries 38 years + 10
> other date/time hits each, so R6 is `48 x 6 = 288`, not 228. `558 + 288 = 846` against
> a reported 845 — **residual 1, not 59**. And because R6 is byte-identical six times
> over, any R6-resident population is a multiple of 6; **59 is prime, so no R6-only
> population can ever equal it.** The marker STAYS UP: the residual of 1 is still
> unexplained and 845 has no surviving provenance.

**D-2 · the "57" corroboration is unsound.** The measurement session reported
"57 of the 60 [bucket (a)] are in-class deixis." Bucket (a) for session-1 is 9,
and Pass 2 purged 8 calendar words from session-1 as bucket (a). Meanwhile Pass
2's 57 printed deixis hits are all in session-1, lines 1400-3139. These cannot
both be true: bucket (a) is calendar-locked hits, and the 57 are a separate,
larger population found by a different classifier after this file proved
missing. Pass 2 cited the numerical match as evidence its re-derivation was
faithful. **It is not evidence.** The two 57s count different things and the
match is coincidence until shown otherwise.

Consequence: **the in-class deixis population across sessions 2, 3 and 4 has
never been measured.** Only session-1's is known, from Pass 2.

**D-3 · the 23.4% distribution is CONFIRMED constructed, not measured.**
Recomputed independently: H(40) = 4.278543038936376, matching the reported
figure exactly. Rank 1 = 23.3724% and rank 10 = 2.3372%, rendering as the
page's 23.4% and 2.3%. This is a pure harmonic distribution — Zipf with
exponent 1 over exactly 40 tokens — and therefore a constructed illustration,
not model output.

What remains unmeasured is only whether the PAGE SAYS SO. If it does not,
non-negotiable #1 is in play. Measure the caption, chip, confidence label and
source note before the next §02 content pass.

> **MEASURED 2026-08-29 — see §F-4. The page does not say so: no disclosure found.**
> No `.sim` chip or equivalent is scoped to the chart. The nearest one (`:1485`) belongs
> to the distribution-picker panel, which closes at `:1486`, 23 lines before the chartbox
> opens at `:1509`. The only confidence label a reader can attach to the figure reads
> **H** and resolves to Wolfram, and `:2487` says *"That is the n⁻¹ power law Wolfram
> identifies"* — both read as sourced measurement. **Reported only; nothing was added.**

Design consequence for the requested tail-probability hover: a harmonic
distribution over 40 tokens has no vanishing tail. Rank 15 = 1.5582% and
rank 40 = 0.5843% — the smallest value is roughly one fortieth of the largest,
not one ten-thousandth. The prose "everything past rank 15 looks like zero and
is not zero" overstates what this distribution shows, and a hover revealing
0.58% will read as unremarkable rather than as the intended reveal. Showing
genuinely near-zero tail mass requires either a real softmax distribution or a
far larger vocabulary. Decide which before building the hover.

---

## §E — re-measure before use

1. ~~PART 4 in full — gates Pass 3 TASK 3~~ **DONE 2026-08-29, §F-1.**
2. ~~PART 8 in full~~ **DONE 2026-08-29, §F-2** — zero CASE.md contradictions found.
3. ~~PART 6's flat title list~~ **DONE 2026-08-29, §F-3 and §F-6.**
4. PART 7(a)(b)(c) — gates the §00 / §01 / §07 rebuilds
5. D-1's 59-hit gap — **re-framed 2026-08-29, §F-5. Do not hunt 59 hits.** Re-run the
   inventory with a declared match vocabulary and region list, and retire 845.
6. D-2's deixis population for sessions 2-4
7. ~~D-3's disclosure text~~ **MEASURED 2026-08-29, §F-4: no disclosure found.** Whether
   to ADD one is an open instructor decision, untouched by Pass 3.

---

## §F — Pass 3 measurement, 2026-08-29

**This section is MEASURED, not transcribed.** Every figure below was produced against
the working tree at `9924f119bb119bc0f07f277f44e16ea102190210` (`origin/main`, fetched
this session, not a shallow-clone pointer). It supersedes the "NOT RECOVERABLE" markers
on PART 4 and PART 8 and supplies PART 6's flat list. §B, §C and §D are left standing.

### F-0 · three provenance corrections to this file's own frame

**F-0.1 · `acd691f` does not exist in this repository.** `§A` PART 3 and `§B` PART 3 cite
"Pass 2 BLOCK A, `acd691f`" and the Pass 3 brief cites the same SHA as "the previous
pass". `git cat-file -e acd691f`, `git log --all --grep`, and a search of every branch
return nothing. **Pass 2's work is not in this tree.** Three independent measurements
agree:

```
scripts/editorial-baseline.json A9 session-1   literal 1 / entity 76 / total 77
executing classify() + authoredProse()          literal 1 / entity 76 / total 77
docs/deferred-work.md, highest row              DW-057   (not DW-058, not DW-059)
```

The brief's "A9 for session-1 lowered from 77 to 69" describes a state this tree has
never been in. **77 is the live figure.** DW-058 and DW-059 do not exist here.

> **MERGE NOTE, 2026-08-29, same day.** Everything above was true of the tree §F was
> measured against (`9924f11`) and is kept as the record of that measurement. Pass 2
> then landed on `main` as `acd691f` (PR #11) — it had been running in a parallel
> session and merged after Pass 3 branched. The Pass 2/Pass 3 merge re-measured A9 on
> the merged body by executing the classifier: **literal 1 / entity 68 / total 69**,
> matching the merged baseline. DW-058 and DW-059 now exist and are Pass 2's lowering
> rows; this branch's runtime retired-fact row was renumbered **DW-063** (see F-2.1).

**F-0.2 · the Tier A/B keep-row example was never deleted.** `MAINTAINING.md:368` cites
*"No client nonpublic personal information may appear in any work you produce in this
course"*. The brief says `acd691f` deleted it. It was **live at `session-1:1961`**,
region R1, when §F was measured. Nothing was restored, because nothing had been removed.
See F-4.

> **MERGE NOTE, 2026-08-29, same day.** `acd691f` then landed on `main` and **did** delete
> that sentence, with the whole §08 panel that carried it — the brief's claim was early,
> not wrong. The keep-row repoint in `MAINTAINING.md` (TASK 6) is unaffected: it already
> cites the surviving Course rule panel string, and Pass 2's **DW-061** — which recorded
> the same orphaned example independently — is closed by it.

**F-0.3 · this file is in `docs/`, not `audit/`.** The note above §A says "this file sits
in `audit/`". It does not, and never has — `git log --all -- audit/session-1-feedback-inventory.md`
is empty. The purge check is scoped to the hub and the lessons (`MAINTAINING.md`,
"Standing purge list"), so `docs/` is out of its scope either way and the note's
conclusion survives its wrong premise.

### F-1 · PART 4 re-measured in full — instructor-addressed constructs, session-1

80 candidate constructs, every line read back with `sed -n` and every region class taken
from `scripts/editorial-regions.mjs` rather than guessed.

**Excluded by ratification, not by oversight.** The 57 in-class activity deixis hits are
KEPT under `MAINTAINING.md`'s *In-class instruction* row: second-person address to the
learner, "next 10 minutes", "open it cold", "in pairs", the 19 `.mins`/`.clock` chips and
the 18 `Work along` gates. Session-1 carries 8 `tonight` hits in the same family. None is
reported below as a defect.

**12 constructs were acted on this pass** (10 rewrites, 2 deletions — see TASK 2 and
TASK 3). **13 are HELD and named**, each with the constraint that holds it.

| line | region | sentence (verbatim, truncated) | why a lone reader cannot act | student-facing purpose | disposition |
|---|---|---|---|---|---|
| `18` | R4 | --on teal = teaching voice, confirmation, primary action | UNSURE whether in scope — non-rendered CSS comment, same caveat as line 19. Recorded because it names "teaching voice" as a formal palette role, the counterpart to the in | NONE | no action — ordinary lesson content or ratified deixis |
| `19` | R4 | --warn rust = caution, failure states, instructor notes | UNSURE whether in scope. It is a non-rendered CSS comment, so no student sees it while reading the page; it becomes visible only via View Source, which the LMBOX console  | NONE | no action — ordinary lesson content or ratified deixis |
| `163` | R4 | /* ---- callouts ---- S1: .inote instructor / .talk discussion / .wolf reading / .verify gate */ | UNSURE whether in scope — non-rendered CSS comment. It documents that .inote is the "instructor" callout family, i.e. the page ships a styled component whose whole purpos | NONE | no action — ordinary lesson content or ratified deixis |
| `838` | R3 | <div class="eyebrow"><span>Synthetic case, classroom anchor only</span></div> | "classroom anchor only" scopes the case to a live classroom the lone reader is not in. It is a delivery-context label rather than a usable qualification; the student-rele | Partial: "Synthetic case" is load-bearing for the reader; "classroom anchor only" is not. | no action — ordinary lesson content or ratified deixis |
| `871` | R6 | <p class="case-lede"><b>Synthetic case.</b> No real person, entity, transaction or document. One household runs through all five sessions. It is never | UNSURE. The policy is stated in the third person about "students" rather than to the reader, which is the register of a course-design note read over the student's shoulde | Yes — it tells the reader the case is not their assignment substrate and that they supply their own tasks and  | no action — ordinary lesson content or ratified deixis |
| `1306` | R6 | '<p class="case-lede">Synthetic case, classroom anchor only. Generated from CASE.md. '+ | Same construct as line 838, replicated into the Blob-built standalone tab, so a student who clicks "Open in a new tab" gets a page whose first line scopes the case to a c | Partial: "Synthetic case" and "Generated from CASE.md" are student-facing; "classroom anchor only" is the clas | no action — ordinary lesson content or ratified deixis |
| `1321` | R1 | Requires instructor verification before it is taught as settled | It is the header of a gate that only an instructor can clear. A lone student cannot "verify" §7872 vs §1274, the discount study, or the Illinois rate table before anyone  | Partial: it does warn the reader that every tax/legal characterisation in the case is unverified. But the fram | HELD — shared six-file `.verify` gate; DW-054(b)/DW-056 open |
| `1322` | R1 | Every tax and legal characterisation attached to this case is posed as a question, not a holding. Verify before teaching any of it as settled: | "Verify before teaching any of it as settled" is a bare imperative addressed to whoever will teach the material. A student reading alone is not teaching anything, so the  | The first clause ("posed as a question, not a holding") is student-usable; the imperative that follows it is n | HELD — shared six-file `.verify` gate; DW-054(b)/DW-056 open |
| `1330` | R1 | The instructor signs the slide, not the model (pedagogy.md s1 R3). | Addresses the instructor in the third person as the accountable party, and cites an internal repo document (pedagogy.md s1 R3) the student cannot open. A lone reader has  | NONE | HELD — shared six-file `.verify` gate; DW-054(b)/DW-056 open |
| `1385` | R11 | <textarea id="lmPrompt" placeholder="Ask it anything the room can see on screen."></textarea> | The placeholder text presupposes a live cohort looking at a projected screen — "the room" is a group other than the reader. A student alone at a laptop has no room, so th | Partial: the intent (only send what is already public on this page) is real and matches the warning at 1360-13 | HELD — inside the LMBOX fence, byte-paired with session-0.1 (constraint 1) |
| `1424` | R1 | The full fact set, the structure flowchart, the open questions and the instructor verification gate are behind <b>Case facts</b> in the bar above. Ope | The contents list points the student at "the instructor verification gate" — an artefact addressed to somebody else. The student can open the modal and see it, but cannot | Partial: the sentence is a real navigation cue for three student-facing items (fact set, flowchart, open quest | no action — ordinary lesson content or ratified deixis |
| `1428` | R1 | Nobody answers it tonight. Tonight you find out why the tool you would reach for to answer it is worst at exactly this shape of problem: a long compou | UNSURE — borderline against the ratified-deixis exclusion. "Nobody answers it tonight" quantifies over a group of people present at a scheduled evening meeting, which is  | Yes — it sets the session's payoff ("you find out why the tool is worst at this shape of problem"). Only the " | no action — ordinary lesson content or ratified deixis |
| `1430` | R3 | Figure labels: <span class="conf h" data-src="src-case">H</span> primary or first-party &middot; <span class="conf m" data-src="src-sec-ai">M</span> s | The final clause is vocative — "Instructors:" explicitly names a reader other than the student and hands them a keyboard control. A lone student reading it is told the sh | The figure-label legend and "Arrow keys navigate" are student-facing; the "Instructors:" clause duplicates a c | TASK 3 rewrite |
| `1441` | R1 | The 11 sections of the core session run in about 69 minutes and are what always gets taught. Nothing in the core depends on anything in the appendix.  | "are what always gets taught" describes the delivery policy of a live class from the teacher's side — which sections a room always receives. A student reading alone is no | Partial: the 69-minute figure and the core/appendix independence are student-usable. The clause "and are what  | HELD — generated from a build-appendix.mjs template shared by all four lessons |
| `1456` | R3 | 01 &middot; Cold open &middot; standing ritual | "Cold open" and "standing ritual" are lesson-production terms describing the section's role in the teaching plan — what the person running the room opens with, and that i | Weak but non-zero: 'standing ritual' does signal to the learner that this exercise repeats across sessions, wh | no action — ordinary lesson content or ratified deixis |
| `1467` | R1 | The rest of tonight is what that sentence actually means. | "tonight" fixes the session to a scheduled live evening class period. A student opening the page alone on a Tuesday morning, or reading only §01 and stopping, cannot loca | It does carry a real student-facing function — it tells the reader the whole remaining page unpacks the senten | no action — ordinary lesson content or ratified deixis |
| `1608` | R1 | Planning parallel &mdash; discussion | The label types the block as a "discussion" — an exchange between people. A lone reader has nobody to discuss with; the two bullets at line 1609 ("Which of your planning  | PARTIAL, not NONE: the body prose after the label ('A 91% probability of success is not a measurement...') is  | no action — ordinary lesson content or ratified deixis |
| `1649` | R1 | <p style="margin-bottom:0"><span class="sim">Teaching approximation &mdash; real tokenisation is model-specific</span></p> | The word "Teaching" describes the artefact from the teacher's side of the podium — it says why the widget was built for a class rather than what the reader should conclud | Yes — it warns the reader that the tokeniser in the panel is an estimate and that real token counts vary by mo | no action — ordinary lesson content or ratified deixis |
| `1686` | R1 | <div class="talk"><span class="th">Why this matters for planning &mdash; discussion</span>The planning terms cluster together because they appear in e | The header tag "&mdash; discussion" marks the panel as a group conversation slot, presupposing a live cohort to discuss with. A lone reader has no counterparties, so the  | Yes for the prose itself — the GRAT/GRIT and revocable/irrevocable examples explain why embedding proximity do | no action — ordinary lesson content or ratified deixis |
| `1687` | R1 | <ul><li>Where else does our vocabulary pair near-identical language with opposite outcomes? Start with QTIP versus QDOT, or 1035 versus 1031.</li><li> | These are open-ended, ungraded, unanswered prompts served under a "discussion" header — they have no key, no readout, and no gate, so their payoff depends on someone else | Partial — both questions are answerable in one's head, and the QTIP/QDOT and 1035/1031 seeds are useful. But n | no action — ordinary lesson content or ratified deixis |
| `1725` | R1 | <div class="talk"><span class="th">Where this bites in the Cole file &mdash; discussion</span>Every one of these is a counting or reconciliation task  | The block's header labels the panel "&mdash; discussion", presupposing other people present to discuss with; combined with the "Ask the room" close on line 1727 the whole | Yes for the prose and the four-item list that follows (1726) — it names concrete counting/reconciliation tasks | no action — ordinary lesson content or ratified deixis |
| `1727` | R1 | Ask the room: which of these have you already delegated to a tool this year, and did you total the numbers yourself?</div> | "Ask the room" is an imperative addressed to whoever is running the session, directing them to put a question to a live audience. A student reading alone is not the "aske | Partial — the embedded question ("which of these have you already delegated to a tool this year, and did you t | TASK 3 rewrite |
| `1836` | R1 | The planning version &mdash; discussion | The literal label 'discussion' marks this block as a live group-discussion item, and the stylesheet confirms the taxonomy: line 163 reads '/* ---- callouts ---- S1: .inot | The block's prose and its three bullets are fully readable and thinkable-through alone; only the '&mdash; disc | no action — ordinary lesson content or ratified deixis |
| `1837` | R1 | Sort tonight's case that way. | "tonight's case" is deictic to a specific live evening session. A student reading the page outside that session has no 'tonight' to anchor it to, and the instruction pres | Substantial: the sorting instruction (arbitrary facts you verify line by line vs. contested judgments you neve | no action — ordinary lesson content or ratified deixis |
| `1917` | R1 | Most of this room should be on subscriptions. | "this room" presupposes a live cohort seated together in a classroom. A lone student reading the page asynchronously is not a room, is not in a room, and has no way to de | Partial: the surrounding sentences ('That is not an argument for the API. The subscription buys the interface, | HELD — §06, out of scope this pass |
| `1920` | R8 | Tokens per meeting is an instructor-set assumption, not measured data. | Names a person other than the reader (the instructor) as the origin of the model's key input, and gives the lone reader no way to find, inspect or change that assumption  | Real but partial: it honestly flags that the tokens-per-meeting figure driving the annual cost bars is assumed | HELD — §06, out of scope this pass |
| `1961` | R1 | <p style="margin-bottom:0"><b>No client nonpublic personal information may appear in any work you produce in this course</b> &mdash; not in the workfl | "read by someone other than me" is unglossed first-person instructor voice — the "me" is the person teaching, who does not exist for a lone reader, so the sentence's forc | Partial — the NPI prohibition and the point that transcripts are the forgotten surface are strong student cont | no action — ordinary lesson content or ratified deixis |
| `1971` | R1 | <!-- APXSTUB:BEGIN --><div class="apxstub"><b>A6 &middot; There Is No Separate AI Rulebook</b><span>9 min &middot; foundational &middot; hidden at the | UNSURE — I lean toward NOT a defect and am reporting it only so it is not missed. "hidden at the current appendix depth" refers to a control, and the phrasing echoes the  | Real — it tells the reader a collapsed section exists, its length and tier, and implicitly that the depth butt | no action — ordinary lesson content or ratified deixis |
| `2015` | R1 | <p class="dim" style="font-size:14.5px">Changes to account-level preferences apply to <b>new</b> conversations, not the one you are in. If you set the | "tell me" addresses a first-person instructor/author who is present to be told, and "this slide needs updating" is authoring-maintenance instruction, not learner instruct | The first two sentences (new conversations vs. current one) are student-facing. The "tell me / this slide need | TASK 3 rewrite |
| `2024` | R1 | <div class="talk"><span class="th">What actually belongs in there &mdash; discussion</span>The instinct is to write a personality description. The use | UNSURE. The CSS comment at line 163 identifies .talk as the "discussion" callout family — a segment marker for a facilitated conversation. The label "&mdash; discussion"  | Real — the body is direct, useful guidance on what belongs in a custom-instruction block. | no action — ordinary lesson content or ratified deixis |
| `2025` | R1 | <ul><li>Credential and role, because it changes the register and the assumed floor</li><li>The standing verification requirement &mdash; the single hi | "for anyone in this room" presupposes a live cohort seated somewhere. A student reading alone is not in a room; the phrase quietly tells them they are not the addressee o | The list item itself (the standing verification requirement is the highest-value line) is student-facing; only | TASK 3 rewrite |
| `2034` | R1 | <!-- APXSTUB:BEGIN --><div class="apxstub"><b>A7 &middot; Disclosure of AI Use to the Client</b><span>15 min &middot; standard &middot; hidden at the  | UNSURE — same as line 1971. "hidden at the current appendix depth" names a control the reader does in fact have (verified at lines 1406-1410), so this is probably the dep | Real — announces the collapsed section, its 15-minute length and standard tier. | no action — ordinary lesson content or ratified deixis |
| `2040` | R3 | <div class="phase" id="discPhase"></div> | UNSURE. Empty in the markup; the script fills it at line 3079 with 'Position · 3 min','Defence · 9 min','Re-vote · 3 min'. Those are a 15-minute run-of-room budget for a  | Partial — it shows the reader where they are in the exercise; the minute figures only mean something to whoeve | no action — ordinary lesson content or ratified deixis |
| `2042` | R3 | <div class="panel" data-task="t-s14c" data-comp="sealed-vote-debate"> | UNSURE. Not rendered text — an authoring attribute. Reported only because the component name declares the whole 2042-2065 block a group debate: the sealed first vote, the | NONE | no action — ordinary lesson content or ratified deixis |
| `2043` | R1 | <span class="plab" id="voteLab">First vote &mdash; commit before anyone speaks</span> | "before anyone speaks" presupposes other people in the room who are about to speak. Alone, nobody speaks at any point, so the sealing rationale (commit before you are inf | Partial — "First vote" and the commit-before-influence idea survive, but the timing condition depends on a liv | no action — ordinary lesson content or ratified deixis |
| `2046` | R3 | <div class="row" style="margin-top:12px"><button class="btn" id="toDefence" disabled>Lock it in &mdash; open defence</button></div> | UNSURE. The button is clickable alone and reveals a readable panel of pre-written cases, so it is not dead. But "open defence" names a live spoken segment governed by the | Real — it advances the sealed-vote component and unlocks readable argument content. | no action — ordinary lesson content or ratified deixis |
| `2050` | R1 | <span class="plab">Defence &mdash; two per side, alternating, ninety seconds each. Call the minority first.</span> | "Call the minority first" is a facilitation directive to whoever is running the room — a lone reader has no minority to call and nobody to alternate with. "Two per side,  | NONE | TASK 3 rewrite |
| `2052` | R1 | <div class="inote" style="margin-bottom:0"><span class="ih">Complication &mdash; introduce this once, after both sides have spoken</span>Nothing in FI | Two instructor-addressed shells wrap student-facing substance. The header "introduce this once, after both sides have spoken" tells a facilitator when to drop the complic | The middle three sentences (the FINRA 24-09 point and the counsel-asks-how-the-file-was-produced framing) are  | TASK 3 rewrite + delete |
| `2057` | R1 | <span class="plab">Second vote &mdash; same question, after the argument</span> | "after the argument" refers to the live spoken defence segment defined at 2050-2052 (two per side, ninety seconds each). A lone reader has had no argument — only a static | Partial — the second vote is castable alone, but the label's precondition names a room event. | no action — ordinary lesson content or ratified deixis |
| `2061` | R1 | <span class="plab" style="margin-top:16px">Room tally &mdash; instructor keys in the Zoom poll counts</span> | The label names the instructor as the operator of this control. A lone student has no room, no Zoom poll, and no counts to key in, so the entire deltaPanel (2060-2064: ta | NONE | HELD — deleting orphans #tallyIn; DW-054(c) open |
| `2062` | R3 | <div id="tallyIn"></div> | UNSURE as a separate entry — this is the container the instructor-only tally inputs are injected into (script 3111-3112 builds a pair of text boxes per option, 'first / s | NONE | no action — ordinary lesson content or ratified deixis |
| `2067` | R1 | <p class="dim" style="font-size:14.5px">A zero delta is a finding, not a failure. It means a defensible position held under argument, which is the sam | "A zero delta" refers to the deltaBars readout, which is computed exclusively from the instructor-keyed room tally (script lines 3111-3124: values read from [data-t1]/[da | Partial — the epistemic point (holding a position under argument is a result) is student-facing, but it is att | no action — ordinary lesson content or ratified deixis |
| `2079` | R1 | <span class="req">Capture it before you leave the room</span> | The deadline is departure from a physical classroom. A student reading alone is not in a room and will never 'leave' one, so the trigger that makes the instruction urgent | Urgency framing for capturing the unassisted baseline. The reader-independent version of the same point is alr | no action — ordinary lesson content or ratified deixis |
| `2114` | R1 | <h3>CFP Board principal knowledge topics touched tonight</h3> | 'tonight' presupposes a single live evening meeting that the reader attended. A student reading the page alone, on any day, has no 'tonight' to map the topics to. UNSURE: | Real — the table maps session content to CFP Board principal knowledge domains, which is directly useful to a  | no action — ordinary lesson content or ratified deixis |
| `2143` | R1 | <div class="talk"><span class="th">Closing question &middot; one to three answers, out loud, then we go</span>A model has just handed you a clean, con | The label 'one to three answers, out loud, then we go' is a facilitation instruction: it presupposes a room of people from whom one to three spoken answers are harvested, | The question after the label is a genuine self-check on the session's argument. The chip text 'one to three an | TASK 3 rewrite |
| `2148` | R3 | <h3 style="margin:26px 0 4px;font-size:17px">Instructor minute budget</h3> | Explicitly names its audience as the instructor. It is the heading over a room-pacing plan; a lone reader is being shown a budget written for the person running the block | NONE | TASK 3 rewrite |
| `2149` | R3 | <table class="tbudget" data-timing> | The container the instructor heading introduces: a Section/Title/Min ledger of the whole block. It exists so the person teaching can allocate and track wall-clock minutes | Marginal: the Min column doubles as a reading-time estimate. As a budget table under an instructor heading, NO | no action — ordinary lesson content or ratified deixis |
| `2151` | R5 | <!-- APXBUDGET:BEGIN generated-by=scripts/build-appendix.mjs --> | Build-pipeline provenance addressed to the repo maintainer: it names a generator script the student cannot run and marks a region they must not hand-edit. UNSURE as an in | NONE | no action — ordinary lesson content or ratified deixis |
| `2153` | R1 | <tr><td>BUS ADM X433.4 &middot; Session 1</td><td>How the Machine Works, and What It Costs</td><td class="n">6</td></tr> | Eighteen generated rows assigning minutes to every core section and appendix. These are the instructor's allocation plan, duplicating information the learner already has  | Weak duplicate of the ratified .mins chips — could read as a time estimate per section; as a budget line, NONE | no action — ordinary lesson content or ratified deixis |
| `2171` | R3 | <tr class="nosum"><td>Break</td><td>Posted as a clock time, not a duration</td><td class="n">15</td></tr> | 'Posted as a clock time, not a duration' is a directive to whoever posts the break — a podium action. A lone student never posts a break, has no break in a self-paced rea | NONE | HELD — generated APXBUDGET template, shared by all four lessons |
| `2172` | R1 | <tr class="nosum"><td>Reserve</td><td>Transitions and overrun, inside the 180-minute block</td><td class="n">15</td></tr> | A 15-minute contingency reserve for 'transitions and overrun' inside a '180-minute block'. Transitions between activities, overrun, and the fixed class block only exist f | NONE | HELD — generated APXBUDGET template, shared by all four lessons |
| `2173` | R1 | <tr class="alloc"><td>Allocated</td><td>Core 69 + appendix 81; the core alone runs 69 minutes, nine minutes over the hour</td><td class="n">150</td></ | A pacing verdict addressed to the person planning the session: the core 'runs' nine minutes over the hour, so something must be cut or the appendices dropped. Only someon | NONE | HELD — generated APXBUDGET template, shared by all four lessons |
| `2178` | R1 | <p>BUS ADM X433.4 &mdash; AI Foundations for Financial Advisors &middot; Session 1 &middot; UC Berkeley Extension, Fall 2026 &middot; Instructor: Jare | Names an instructor. UNSURE and probably NOT a defect: this is attribution ABOUT the instructor, not text addressed TO them, and a lone reader can make full sense of it.  | Yes — course identification and authorship/provenance of the page. | no action — ordinary lesson content or ratified deixis |
| `2179` | R1 | <p>The Cole household is synthetic and constructed for this course as a classroom anchor only. No real client data appears anywhere in this document.  | 'classroom anchor' presupposes a classroom, and 'Students build...' speaks about students in the third person rather than to the reader. UNSURE: a lone reader can still m | Yes — tells the reader the case is invented and that their own final project uses their own synthetic data. On | no action — ordinary lesson content or ratified deixis |
| `2183` | R5 | <!-- generated by scripts/inject-sources.mjs from SOURCES.md — sha256 8c3ba2a080f016bb817e942066fc3f6405e94af73150cf0e99cab2961f719cf8 --> | Same class as line 2151: generator script, source file and content hash, all repo-side. Addressed to the maintainer, invisible to a reader. UNSURE for the same reason — d | NONE | no action — ordinary lesson content or ratified deixis |
| `2189` | R7 | <li id="src-case"><em>The Cole household</em>. Constructed for this course as a classroom anchor, BUS ADM X433.4. Used for: every worked example in th | Same 'classroom anchor' presupposition as line 2179. UNSURE and likely not a defect: the source entry is fully legible and useful to a lone reader; only the phrase 'as a  | Yes — source provenance and the synthetic-data warranty for the case. | no action — ordinary lesson content or ratified deixis |
| `2214` | R11 | Live model console. Keep byte-identical across lessons; bump the version in this fence on any change and diff the two blocks before pushing. | Addressed to whoever maintains the repo, not to any reader of the lesson: 'bump the version', 'diff the two blocks before pushing' are git operations on a source tree the | NONE | no action — ordinary lesson content or ratified deixis |
| `2219` | R11 | written into the DOM. The storage grep in MAINTAINING.md is the | Points at MAINTAINING.md and a grep-based regression test — repo artefacts the student cannot open and a test they cannot run. Addressed to the maintainer. Same invisibil | NONE | no action — ordinary lesson content or ratified deixis |
| `2249` | R11 | return'Rate limit or daily quota reached. The captured output is in use and the lesson continues at full pace.'; | This string IS shown to the reader, and 'the lesson continues at full pace' presupposes a paced session that must not stall — a room-running concern. UNSURE: a lone reade | Yes — tells the reader the captured output has taken over and nothing is lost. Only 'at full pace' carries the | no action — ordinary lesson content or ratified deixis |
| `2291` | R11 | rename upstream does not break the lesson mid-class. */ | 'mid-class' states the failure mode being designed against as a live class in progress — a scenario only the person teaching experiences. The design rationale is addresse | NONE | no action — ordinary lesson content or ratified deixis |
| `2386` | R2 | $('ovr').textContent='All revealed';return} | UNSURE — reported only because a lone student cannot be harmed by it but the page elsewhere brands it as an instructor control. This line is the tail of the Shift+U revea | Opens every hidden answer panel and marks every work-along cue complete in one keystroke, so a reader working  | no action — ordinary lesson content or ratified deixis |
| `2845` | R2 | convergence and refusal are all the lesson; see docs/live-model-console-plan.md. */ | "are all the lesson" plus a pointer to a repository planning document. A student reading the published page alone has no access to docs/live-model-console-plan.md and can | NONE | no action — ordinary lesson content or ratified deixis |
| `3079` | R2 | $('discPhase').innerHTML=['Position · 3 min','Defence · 9 min','Re-vote · 3 min'].map(function(t,i){ | A three-phase clock for a facilitated debate: nine minutes of "Defence" corresponds to the body's staging note "two per side, alternating, ninety seconds each. Call the m | Partial — signals the intended weight of each phase; the 9-minute defence budget is unusable alone. | no action — ordinary lesson content or ratified deixis |
| `3111` | R2 | $('tallyIn').innerHTML='<div class="sgrid" style="gap:12px">'+DOPT.map(function(o){ | This injects the room-tally control whose own label (line 2061, outside this range) reads "Room tally &mdash; instructor keys in the Zoom poll counts". The widget takes a | NONE | HELD — JS for the :2061 control it labels |
| `3112` | R2 | return '<div><span class="plab">'+o.k+' — first / second</span><div class="row"><input type="text" data-t1="'+o.k+'" placeholder="0" style="width:70px | Renders the visible per-option "A — first / second" number boxes for typing in room-level vote counts. A solo reader has exactly one first vote and one second vote — alre | NONE | HELD — JS for the :2061 control it labels |
| `3120` | R2 | $('deltaBars').innerHTML='<div class="slab" style="margin:14px 0 6px"><span>Grey = first vote &nbsp;&middot;&nbsp; green = second</span><b></b></div>' | This is the legend for the room-distribution bars that only appear once someone types the cohort poll counts into the instructor tally above it. With a single reader the  | NONE | no action — ordinary lesson content or ratified deixis |
| `3123` | R2 | return '<div class="delta"><span>'+o.k+'</span><span class="tr"><i class="v1" style="width:'+p1.toFixed(1)+'%"></i><i class="v2" style="width:'+p2.toF | Draws the percentage-of-room shift bars (first-vote share vs second-vote share per option) computed from the instructor-entered tallies. This is room percentage voting ou | NONE | no action — ordinary lesson content or ratified deixis |
| `3129` | R2 | $('defencePanel').classList.remove('hidden');$('vote2Panel').classList.remove('hidden');$('deltaPanel').classList.remove('hidden'); | Registered against the reveal-all hook that the page labels as an instructor control ("Instructors: <b class="mono">Shift+U</b> unlocks everything", line 1430). Its effec | Partial — un-hiding the defence grid and second vote is useful to a solo reader; exposing the room-tally panel | no action — ordinary lesson content or ratified deixis |
| `3145` | R2 | /* ===== family 17: cold-open ritual — identical in every session ===== */ | A course-production note: it identifies the component-bank family number and asserts the ritual is repeated across every session of the course. It addresses the person bu | NONE | no action — ordinary lesson content or ratified deixis |
| `3171` | R2 | window.__coreMins=69; | The build-generated core teaching-minute constant that feeds the minute-budget readouts at 3200-3202 and mirrors the footer's "Instructor minute budget" table. It exists  | NONE | no action — ordinary lesson content or ratified deixis |
| `3174` | R2 | /* ===== appendix depth control: tier filter + core-only mode ===== */ | Names the coverage-depth control the pacing paragraph tells the instructor to "raise" in a full block. It documents a delivery-side feature. UNSURE: source comment, never | NONE | no action — ordinary lesson content or ratified deixis |
| `3180` | R2 | var level=1, coreOnly=true; /* core only at load; "+ Standard" is the depth the bar falls back to */ | Documents the default teaching depth on load and the fallback depth — a curriculum-coverage decision made by the person running the course, not by the reader. UNSURE: tra | NONE | no action — ordinary lesson content or ratified deixis |
| `3200` | R2 | ? 'Core only — appendix hidden. '+(window.__coreMins\|\|0)+' core minutes.' | The default readout for the depth bar, stated as a minute budget for the core. Paired with the pacing paragraph's instruction to "raise the appendix depth" in a full bloc | Partial — tells a solo reader that appendix material is currently hidden and roughly how long the core runs. | no action — ordinary lesson content or ratified deixis |
| `3201` | R2 | : shown+' of '+apx.length+' appendix sections in scope · '+mins+' appendix minutes · '+ | This is the delivery-time accounting the footer calls the "Instructor minute budget" (line 2148): core minutes plus appendix minutes summed into a session total. It reads | Partial — a self-study reader can read the totals as a rough duration for the material they have on screen; th | no action — ordinary lesson content or ratified deixis |
| `3202` | R2 | (window.__coreMins\|\|0)+' core minutes · '+((window.__coreMins\|\|0)+mins)+' total.'; | Completes the core-plus-appendix minute total described above. "Core minutes" is a pacing category that only means something to whoever allocates class time between core  | Partial — same as line 3201: a duration estimate for a solo reader, expressed in teaching-budget terms. | no action — ordinary lesson content or ratified deixis |
| `3219` | R2 | this shows the mechanism is not a teaching fiction. */ | Authoring rationale about what the page teaches versus simulates, written for whoever maintains or delivers the lesson ("it teaches the mechanism", 3218). It positions th | NONE | no action — ordinary lesson content or ratified deixis |
| `3248` | R2 | /* ===== pacing readout: core vs appendix, computed from the minute chips ===== */ | Authoring note labelling the block that produces the instructor pacing paragraph at 3265-3268. It documents a session-pacing feature for whoever maintains or delivers the | NONE | no action — ordinary lesson content or ratified deixis |
| `3265` | R2 | '<p>The core runs in about '+core+' minutes and is what always gets taught. In a full '+ | "is what always gets taught" describes a teaching plan across cohorts, and the sentence continuing on 3266 tells someone how to run a block. A lone reader is not teaching | Marginal — the raw core-minute number could tell a solo reader roughly how long the core runs, but the framing | TASK 2 rewrite |
| `3266` | R2 | 'block, raise the appendix depth and take the extra sections in place; in a short one, '+ | Completes "In a full block, raise the appendix depth and take the extra sections in place" — a direct imperative to whoever is pacing a live block, deciding for a room ho | NONE | TASK 2 rewrite |
| `3267` | R2 | 'leave it on core only and the session still closes properly. Appendix sections are also '+ | "in a short one, leave it on core only and the session still closes properly" is contingency advice for delivering a shortened class session — it presupposes a scheduled  | Partial — the trailing clause continuing on 3268 ("Appendix sections are also readable alone afterwards") IS s | TASK 2 rewrite |

### F-2 · PART 8 re-measured in full — number provenance, §02 / §03 / §08

172 distinct rendered numbers. CSS lengths, viewBox coordinates, SVG geometry and array
indices are excluded; every figure a reader can see is included.

| provenance | count |
|---|---|
| hand-authored | 141 |
| runtime-computed | 26 |
| case-derived (`inject-case` / `COLE.*`) | 5 |

**Zero hand-authored numbers contradict CASE.md.** One candidate contradiction was raised
and is adjudicated here, because two measurements disagreed on it:

> `session-1:2420` renders `a 45% discount` where CASE.md carries **30%**
> (`CASE.md:343`, `:351`, `:622`).

It is **not** a contradiction. Line 2420 is the §02 token-sampler's first candidate list.
Its **top candidate** is case-derived — `'a '+Math.round(COLE.discount*100)+'% discount'` —
and executing the page returns `COLE.discount = 0.3`, rendering **"a 30% discount"**. The
`45%` string is the **fifth and lowest-probability candidate (0.09)**: a deliberate
distractor, in a widget whose own prose at `session-1:1488` says *"Several paths produce a
defensible sentence about the Cole discount; at least one produces a false one, in the same
confident register."* The page discloses the falsity it plants. **RECORDED ONLY — no number
was changed in this pass.**

**F-2.1 · A RETIRED FACT IS RENDERED AT RUNTIME IN §02. New, not previously recorded.**

CASE.md Part K line 820 lists a set of **"Grep targets that must return zero."** One of them
is the superseded structure's combined discount — the figure the sampler weight `.31` becomes
when multiplied by 100 and given a percent sign. CASE.md:816 retires the framing it belongs
to with **"Deleted. Do not reintroduce in any form."**

`session-1:2437` prints every §02 sampler weight as a percentage:

```
'<span class="pv">'+(o[1]*100).toFixed(0)+'%</span>'
```

The second candidate list, `session-1:2421`, opens with the weight `.31`. **So the page
prints that retired figure into the DOM as soon as the learner places one token.** Measured
by driving the widget in Chromium and reading `document.body.innerText`:

```
step 0   a 30% discount 33% | $20,020,000 26% | $38,500 per unit 19% | ...   retired string ABSENT
step 1   , supported by <RETIRED FIGURE> | , which reflects 26% | ...        retired string PRESENT
step 2   a 2023 appraisal 34% | lack of control 25% | ...
```

**The adjacency is the defect, not the coincidence.** CASE.md:813 retires precisely the claim
*"2023 appraisal supports a [retired figure] discount"*. The sampler renders that figure
against the connector *", supported by"*, and the very next list offers *"a 2023 appraisal"*.
The retired sentence is reachable on screen in three clicks.

**Invisible to every purge check in the repo**, because the source holds `.31` and only
arithmetic at render time produces the banned string. `grep`, `git log -S` and
`verify-migration` check 1 all read source text; none of them can see it.

**This is the THIRD independent proof of PART 5's root cause** — after `session-3:2697`'s
JS-literal survivor and the `23.4%` figure — and the most serious of the three: the other two
are a disclosure gap and a stale weighting, this one is a live Part K violation.

**NOT FIXED HERE.** §02 numbers are RECORD ONLY this pass and constraint 4 forbids touching an
interactive component. Opened as **DW-058**, renumbered **DW-063** on the 2026-08-29 merge
— Pass 2 landed its A9-lowering row under DW-058 first, and lowering rows keep their
numbers under the ratchet rule. The obvious fix is to move the weight off the
banned value and renormalise the list, but that is a widget edit and needs its own pass.

**Why this file does not simply quote the string.** `verify-migration.mjs` excludes registers
from check 1 — `audit/**`, `CASE.md`, `CHANGELOG.md`, `docs/spine-brief.md` and four others.
**This file is not among them**, because the header above §A wrongly believed it lived in
`audit/` (§F-0.3). Writing the figure here turns check 1 red on an otherwise clean tree. It is
therefore described and never spelled, and **the exclusion list was deliberately NOT widened to
cover this file**: weakening a purge check to make an audit more readable is the wrong trade.

| line | value | context | provenance | CASE.md | contradicts |
|---|---|---|---|---|---|
| `1475` | 02 | <div class="eyebrow"><span>02 &middot; Wolfram, &ldquo;It&rsquo;s Just Adding One Word a | hand-authored | NONE | no |
| `1475` | 7 min | <span class="mins">7 min</span> | hand-authored | NONE | no |
| `1484` | 0 | <span class="dim mono" style="font-size:12px">placed: <b id="s2count">0</b> of 6</span> | runtime-computed | NONE | no |
| `1484` | 6 | placed: <b id="s2count">0</b> of 6 | hand-authored | NONE | no |
| `1491` | 0.8 | A temperature of <b>0.8</b> "seems best" for essays &mdash; and "there's no 'theory' bei | hand-authored | NONE | no |
| `1495` | 0 | <button class="btn sel mini act" data-tmp="0">T = 0</button> | hand-authored | NONE | no |
| `1496` | 0.8 | <button class="btn sel mini" data-tmp="0.8">T = 0.8</button> | hand-authored | NONE | no |
| `1497` | 1.6 | <button class="btn sel mini" data-tmp="1.6">T = 1.6</button> | hand-authored | NONE | no |
| `1498` | 40 | <button class="btn" id="s3gen">Generate 40 tokens</button> | hand-authored | NONE | no |
| `1504` | 0 | <div class="stat"><span class="sn">Temperature</span><span class="sv" id="s3t">0</span>< | hand-authored | NONE | no |
| `1520` | six | <b>Work along</b>Place six tokens, generate at all three temperatures, and switch to log | hand-authored | NONE | no |
| `1520` | three | Place six tokens, generate at all three temperatures, and switch to log&ndash;log axes. | hand-authored | NONE | no |
| `1521` | 2023 | <span class="src"><b>Wolfram, S. (2023), What Is ChatGPT Doing &hellip; and Why Does It  | hand-authored | NONE | no |
| `1633` | 03 | <div class="eyebrow"><span>03 &middot; Tokens and price</span><span class="mins">5 min</ | hand-authored | NONE | no |
| `1633` | 5 min | <span class="mins">5 min</span> | hand-authored | NONE | no |
| `1636` | 2 (in "GPT-2") | Wolfram gives the actual GPT-2 values: | hand-authored | N/A | no |
| `1636` | 3,000 | About 50,000 tokens exist and only about 3,000 are whole words. | hand-authored | NONE | no |
| `1636` | 3542 | <b>" cat"</b> &mdash; with the space in front &mdash; is token <b>3542</b>. The space is | hand-authored | NONE | no |
| `1636` | 50,000 | <div class="wolf"><span class="wh">From the assigned reading</span>About 50,000 tokens e | hand-authored | NONE | no |
| `1636` | 914 | <b>"the"</b> is token <b>914</b> | hand-authored | NONE | no |
| `1641` | "+N more" overflow count (and the 200-token  | <div class="tokstrip" id="tokStrip"></div> | runtime-computed | N/A | no |
| `1643` | 0 | <div class="stat"><span class="sn">Est. tokens</span><span class="sv" id="tokCount">0</s | runtime-computed | N/A | no |
| `1644` | 0 | <div class="stat"><span class="sn">Words</span><span class="sv" id="tokWords">0</span></ | runtime-computed | N/A | no |
| `1645` | &mdash; (placeholder; reader sees a 2-decima | <div class="stat"><span class="sn">Tokens / word</span><span class="sv" id="tokRatio">&m | runtime-computed | N/A | no |
| `1648` | $0.0000-style cost values in the four cost b | <div class="costgrid" id="tokCost"></div> | runtime-computed | N/A | no |
| `1653` | 5 (in "Into Opus 5") | <thead><tr><th>Document from this case</th><th>Approx. tokens</th><th>Into Opus 5</th></ | hand-authored | NONE | no |
| `1655` | $0.02 | <td class="n">~4,000</td><td class="n">$0.02</td> | hand-authored | NONE | no |
| `1655` | 3,000 | <tr><td>Discovery meeting notes (3,000 words)</td><td class="n">~4,000</td><td class="n" | hand-authored | NONE | no |
| `1655` | ~4,000 | <td>Discovery meeting notes (3,000 words)</td><td class="n">~4,000</td> | hand-authored | NONE | no |
| `1656` | $0.10 | <td class="n">~20,000</td><td class="n">$0.10</td> | hand-authored | NONE | no |
| `1656` | 2011 | <tr><td>2011 wills and joint revocable trust</td><td class="n">~20,000</td><td class="n" | hand-authored | CASE.md lines 513-517: F.1 'Last will and testament — Margaret Cole \| 22 March 2011', … | no |
| `1656` | ~20,000 | <td>2011 wills and joint revocable trust</td><td class="n">~20,000</td> | hand-authored | NONE | no |
| `1657` | $0.63 | <td class="n">~125,000</td><td class="n">$0.63</td> | hand-authored | NONE | no |
| `1657` | 2014 | <tr><td>Draft IDGT instrument, note, 2014 buy-sell and 2023 appraisal</td><td class="n"> | hand-authored | CASE.md line 518: 'F.6 \| Shareholder and buy-sell agreement — Hensley Precision Produc… | no |
| `1657` | 2023 | <td>Draft IDGT instrument, note, 2014 buy-sell and 2023 appraisal</td> | hand-authored | CASE.md line 519: 'F.7 \| Business valuation report — Merrit Valuation Advisors \| 12 S… | no |
| `1657` | ~125,000 | <td class="n">~125,000</td><td class="n">$0.63</td> | hand-authored | NONE | no |
| `1658` | $5.00 | <td class="n">1,000,000</td><td class="n">$5.00</td> | hand-authored | NONE | no |
| `1658` | 1,000,000 | <td>Entire Cole file, full 1M context window</td><td class="n">1,000,000</td> | hand-authored | NONE | no |
| `1658` | 1M | <tr><td>Entire Cole file, full 1M context window</td><td class="n">1,000,000</td><td cla | hand-authored | NONE | no |
| `1661` | 08 (in "&sect;08") | Your duty of care is &mdash; &sect;08. | hand-authored | NONE | no |
| `1661` | five dollars | <p>The whole file costs five dollars to read. Cost is not the constraint. Your duty of c | hand-authored | NONE | no |
| `1663` | 40 | <div class="check" data-gate="g5"><span class="mk">&middot;</span><div class="ct"><b>Wor | hand-authored | NONE | no |
| `1664` | 0.75 | Word-to-token rows derived at 0.75 words per token. <span class="conf m" data-src="src-w | hand-authored | NONE | no |
| `1664` | 2023 (in "Wolfram (2023)") | Token IDs and vocabulary figures: Wolfram (2023). <span class="conf h" data-src="src-wol | hand-authored | NONE | no |
| `1664` | 25 August 2026 | <span class="src">Prices and context window: <b>Anthropic, Claude Platform Docs &mdash;  | hand-authored | NONE | no |
| `1937` | 08 | <div class="eyebrow"><span>08 &middot; The line</span><span class="mins">7 min</span></d | hand-authored | NONE | no |
| `1937` | 7 | <span class="mins">7 min</span> | hand-authored | NONE | no |
| `1939` | Three | <p class="big">Every item is drawn from the Cole file. Three of these eight are the conf | hand-authored | three (CASE.md:786 'Exactly three (PEDAGOGY §5.3.4).'; enumerated CASE.md:788-790) | no |
| `1939` | eight | Three of these eight are the confidentiality landmines this case was built to carry. | hand-authored | NONE | no |
| `1948` | 0 / 8 | <div class="slab" style="margin-bottom:6px"><span>Sorted</span><b id="npiScore">0 / 8</b | runtime-computed | N/A | no |
| `1948` | 8 | denominator of <b id="npiScore">0 / 8</b> | hand-authored | NONE | no |
| `1955` | one | selling an aerospace-fastener company in a named metro is one person, and you never type | hand-authored | NONE | no |
| `1955` | sixties | <p>De-identification is not deleting the name. A woman in her sixties selling an aerospa | hand-authored | 64 (CASE.md:38, Meg's age at 2026-08-23; DOB 14 March 1962 at CASE.md:37) | no |
| `1960` | one | <p><b>The final project builds one of these for your own recurring task.</b> Not a de-id | hand-authored | NONE | no |
| `1964` | eight | <div class="check" data-gate="g13"><span class="mk">&middot;</span><div class="ct"><b>Wo | hand-authored | NONE | no |
| `1964` | three | then name which of the three landmines would be hardest to notice yourself mid-draft | hand-authored | three (CASE.md:786; enumerated CASE.md:788-790) | no |
| `2418` | 520 | var S2STEM='The '+COLE.saleUnits+' non-voting units sold to the grantor trust were value | case-derived | 520 (CASE.md line 391) | no |
| `2420` | $20,020,000 | ['$'+fmt(COLE.notePrincipal),.26] &mdash; rendered as a candidate chip inside #s2dist (l | case-derived | $20,020,000 (CASE.md line 392) | no |
| `2420` | $38,500 | ['$'+fmt(COLE.perNonVoting)+' per unit',.19] &mdash; rendered as a candidate chip inside | case-derived | $38,500 (CASE.md line 345) | no |
| `2420`-`2425` | `.33 .26 .19 .13 .09` / `.31 .26 .22 .13 .08` / `.34 .25 .20 .13 .08` / `.30 .27 .21 .14 .08` / `.35 .27 .19 .13 .06` / `.34 .27 .20 .13 .06` | the six candidate-weight lists of the §02 sampler, `S2[0..5]` | hand-authored | NONE | no |
| `2437` | each weight above, printed as a percentage | `'<span class="pv">'+(o[1]*100).toFixed(0)+'%</span>'` | runtime-computed | NONE | **see the note below F-2** |
| `2420` | 30 (rendered "a 30% discount") | [['a '+Math.round(COLE.discount*100)+'% discount',.33], &hellip;] &mdash; rendered as th | case-derived | 30% (CASE.md lines 343, 351, 622) | no |
| `2420` | 30 (rendered 'a 30% discount') | [['a '+Math.round(COLE.discount*100)+'% discount',.33], | case-derived | 30% (CASE.md:343 '\| Less combined discount of 30% \| ($14,850,000) \|'; CASE.md:351 '*… | no |
| `2420` | 45 (rendered "a 45% discount") | ['a 45% discount',.09] &mdash; the fifth/lowest-probability candidate chip rendered insi | hand-authored | 30% (CASE.md lines 343, 351, 622) | **YES** |
| `2422` | 2014 (rendered "the 2014 formula") | ['the 2014 formula',.08] &mdash; lowest-weight chip in the step-3 candidate list, render | hand-authored | 30 May 2014 buy-sell (CASE.md lines 139, 518, 693) | no |
| `2422` | 2023 (rendered "a 2023 appraisal") | [['a 2023 appraisal',.34],['lack of control',.25],['lack of marketability',.20],['the at | hand-authored | 2023 appraisal (CASE.md lines 90, 519, 625, 1178-1183) | no |
| `2425` | 2023 (rendered "since 2023.") | [['this year.',.34],['since a buyer appeared.',.27],['at all.',.20],['by counsel.',.13], | hand-authored | 2023 appraisal (CASE.md lines 519, 1178-1183) | no |
| `2431` | six | if(s2i>=S2.length)h+='<span class="dim">— six placed. Some paths produce a true sentence | hand-authored | NONE | no |
| `2433` | 0 through 6 (live counter) | var d=$('s2dist');d.innerHTML='';$('s2count').textContent=s2i; | runtime-computed | N/A | no |
| `2433` | 0 through 6 (the live placed-count) | var d=$('s2dist');d.innerHTML='';$('s2count').textContent=s2i; &mdash; writes into <b id | runtime-computed | NONE | no |
| `2437` | percentages formatted at 0 decimal places | var r=el('div','drow'+(i===0?' keep':''),'<span>'+o[0]+'</span><span class="dbar"><span  | runtime-computed | N/A | no |
| `2453` | 0 / 0.8 / 1.6 | t3T=parseFloat(b.dataset.tmp);$('s3t').textContent=t3T}}); | hand-authored | NONE (CASE.md contains no temperature or model-sampling values; grep for 'temperature' … | no |
| `2453` | 0 / 0.8 / 1.6 (live temperature readout) | all('[data-tmp]').forEach(function(x){x.classList.toggle('act',x===b)});t3T=parseFloat(b | runtime-computed | NONE | no |
| `2455` | 40 | var ps=temper(T3P,t3T),out=[];for(var i=0;i<40;i++)out.push(T3[drawFrom(ps)]); | hand-authored | NONE | no |
| `2457` | distinct-token count (live, 1-20) | $('s3uni').textContent=Object.keys(out.reduce(function(o,w){o[w]=1;return o},{})).length | runtime-computed | N/A | no |
| `2457` | live integer (distinct-token count, 1-20) | $('s3uni').textContent=Object.keys(out.reduce(function(o,w){o[w]=1;return o},{})).length | runtime-computed | NONE | no |
| `2458` | live integer (longest-repeat length) | $('s3rep').textContent=longestRepeat(out);$('s3t').textContent=t3T; &mdash; writes into  | runtime-computed | NONE | no |
| `2458` | longest-repeat count (live) | $('s3rep').textContent=longestRepeat(out);$('s3t').textContent=t3T; | runtime-computed | N/A | no |
| `2461` | 40 (PLN, rank domain) | var PLN=40,PLP=(function(){var p=[];for(var i=1;i<=PLN;i++)p.push(1/i);... | hand-authored | NONE | no |
| `2461` | 40 (rank count, PLN) | var PLN=40,PLP=(function(){var p=[];for(var i=1;i<=PLN;i++)p.push(1/i);var s=p.reduce(fu | hand-authored | NONE | no |
| `2466` | 0% / 5% / 10% / 15% / 20% / 25% | [0,.05,.1,.15,.2,.25].forEach(function(v){var y=T+ph-(v/.26)*ph; -- printed at line 2467 | hand-authored | NONE | no |
| `2466` | 0, 5, 10, 15, 20, 25 (rendered as "0%", "5%" | [0,.05,.1,.15,.2,.25].forEach(function(v){var y=T+ph-(v/.26)*ph; &mdash; y-axis tick lab | hand-authored | NONE | no |
| `2469` | 1, 10, 20, 30, 40 | [1,10,20,30,40].forEach(function(r){s+='<text x="'+(L+((r-1)/(PLN-1))*pw)+'" y="'+(T+ph+ | hand-authored | NONE | no |
| `2469` | 1, 10, 20, 30, 40 (x-axis rank labels, linea | [1,10,20,30,40].forEach(function(r){s+='<text x="'+(L+((r-1)/(PLN-1))*pw)+'" y="'+(T+ph+ | hand-authored | NONE | no |
| `2473` | 0.6% | [PLP[0],.05,.02,.01,PLP[PLN-1]] | runtime-computed | N/A | no |
| `2473` | 1.0% | [PLP[0],.05,.02,.01,PLP[PLN-1]] | hand-authored | NONE | no |
| `2473` | 2.0% | [PLP[0],.05,.02,.01,PLP[PLN-1]] | hand-authored | NONE | no |
| `2473` | 23.4% | [PLP[0],.05,.02,.01,PLP[PLN-1]].forEach(function(v){var y=ly(v); -- printed at line 2474 | runtime-computed | N/A | no |
| `2473` | 5.0% | [PLP[0],.05,.02,.01,PLP[PLN-1]] | hand-authored | NONE | no |
| `2473` | 5.0, 2.0, 1.0 hand-typed plus two computed e | [PLP[0],.05,.02,.01,PLP[PLN-1]].forEach(function(v){var y=ly(v); &mdash; log-mode y-axis | hand-authored | NONE | no |
| `2476` | 1, 2, 5, 10, 20, 40 | [1,2,5,10,20,40].forEach(function(r){s+='<text x="'+lx(r)+'" y="'+(T+ph+18)+'" text-anch | hand-authored | NONE | no |
| `2476` | 1, 2, 5, 10, 20, 40 (x-axis rank labels, log | [1,2,5,10,20,40].forEach(function(r){s+='<text x="'+lx(r)+'" y="'+(T+ph+18)+'" text-anch | hand-authored | NONE | no |
| `2486` | 10 (in "by rank 10") | by rank 10 a candidate holds '+(PLP[9]*100).toFixed(1)+'%. | hand-authored | NONE | no |
| `2486` | 10 (in 'by rank 10') | ' of the mass; by rank 10 a candidate holds '+(PLP[9]*100).toFixed(1)+'%. | hand-authored | NONE | no |
| `2486` | 15 (in "past rank 15") | Everything past rank 15 looks like zero and is not zero. That tail is where the surprisi | hand-authored | NONE | no |
| `2486` | 15 (in 'past rank 15') | Everything past rank 15 looks like zero and is not zero. That tail is where the surprisi | hand-authored | NONE | no |
| `2486` | 2.3% | by rank 10 a candidate holds '+(PLP[9]*100).toFixed(1)+'%. | runtime-computed | N/A | no |
| `2486` | 2.3% (rank-10 candidate share) | by rank 10 a candidate holds '+(PLP[9]*100).toFixed(1)+'%. Everything past rank 15 looks | runtime-computed | NONE | no |
| `2486` | 23.4% | '<span class="cz">Linear axes</span>The top candidate holds '+(PLP[0]*100).toFixed(1)+'% | runtime-computed | N/A | no |
| `2486` | 23.4% (top-candidate share of probability ma | ?'<span class="cz">Linear axes</span>The top candidate holds '+(PLP[0]*100).toFixed(1)+' | runtime-computed | NONE | no |
| `2487` | −1 (rendered as the exponent in n<sup>-1</su | That is the n<sup>−1</sup> power law Wolfram identifies as characteristic of language. | hand-authored | NONE (CASE.md has no power-law / language-model values) | no |
| `2487` | −1 (rendered as the superscript in n&minus;1 | :'<span class="cz">Log–log axes</span>Now a straight line. That is the n<sup>−1</sup> po | hand-authored | NONE | no |
| `2649` | 1 ($ per million input tokens, Haiku 4.5) | var TIERS=[['Haiku 4.5',1],... | hand-authored | NONE | no |
| `2649` | 1, 2, 5, 10 (per-million-token rates) | var TIERS=[['Haiku 4.5',1],['Sonnet 5',2],['Opus 5',5],['Fable 5',10]]; | hand-authored | NONE | no |
| `2649` | 10 ($ per million input tokens, Fable 5) | ['Fable 5',10] | hand-authored | NONE | no |
| `2649` | 2 ($ per million input tokens, Sonnet 5) | ['Sonnet 5',2] | hand-authored | NONE | no |
| `2649` | 4.5 (in 'Haiku 4.5') | var TIERS=[['Haiku 4.5',1],['Sonnet 5',2],['Opus 5',5],['Fable 5',10]]; | hand-authored | NONE (grep of CASE.md for claude/anthropic/haiku/sonnet/opus/fable/token/pricing return… | no |
| `2649` | 4.5, 5, 5, 5 (in "Haiku 4.5", "Sonnet 5", "O | var TIERS=[['Haiku 4.5',1],['Sonnet 5',2],['Opus 5',5],['Fable 5',10]]; | hand-authored | NONE | no |
| `2649` | 5 ($ per million input tokens, Opus 5) | ['Opus 5',5] | hand-authored | NONE | no |
| `2649` | 5 (in 'Fable 5') | ['Fable 5',10] | hand-authored | NONE | no |
| `2649` | 5 (in 'Opus 5') | ['Opus 5',5] | hand-authored | NONE | no |
| `2649` | 5 (in 'Sonnet 5') | ['Sonnet 5',2] | hand-authored | NONE | no |
| `2660` | 200 (cap) and the live '+N more' overflow co | (ts.length>200?'<span style="background:none;color:var(--muted)">+'+(ts.length-200)+' mo | hand-authored | NONE | no |
| `2661` | Est. tokens (live count) | $('tokCount').textContent=fmt(ts.length);$('tokWords').textContent=fmt(w); | runtime-computed | N/A | no |
| `2661` | Words (live count) | $('tokWords').textContent=fmt(w); | runtime-computed | N/A | no |
| `2662` | Tokens / word ratio (live, 2 dp) | $('tokRatio').textContent=w?(ts.length/w).toFixed(2):'—'; | runtime-computed | N/A | no |
| `2663` | 1e6 (1,000,000 -- per-million-token divisor) | $('tokCost').innerHTML=TIERS.map(function(x){var c=ts.length/1e6*x[1]; | hand-authored | NONE | no |
| `2664` | &lt;$0.0001 (threshold 0.0001) | '<span class="cv">'+(c<0.0001?'&lt;$0.0001':'$'+c.toFixed(4))+'</span>' | hand-authored | NONE | no |
| `2664` | per-tier dollar cost (live, 4 dp) | '$'+c.toFixed(4) | runtime-computed | N/A | no |
| `2665` | 40 (gate threshold) | if(ts.length>=40&&t.trim()!==tokOrig)mark('g5')} | hand-authored | NONE | no |
| `2978` | 1 | w:'Landmine 1. Nathan works in CPC operations and has not been told. Entering this into  | hand-authored | 1. **Nathan.** (CASE.md:788) | no |
| `2978` | 1 (in 'Landmine 1') | w:'Landmine 1. Nathan works in CPC operations and has not been told. Entering this into  | hand-authored | CASE.md:788 -- PART J landmine 1 is '**Nathan.** He does not know that a competitor app… | no |
| `2979` | 2 | w:'Landmine 2. An unexecuted, unfiled position on valuation. Nothing about it is public, | hand-authored | 2. **The privileged strategy.** (CASE.md:789) | no |
| `2979` | 2 (in 'Landmine 2') | w:'Landmine 2. An unexecuted, unfiled position on valuation. Nothing about it is public, | hand-authored | CASE.md:789 -- PART J landmine 2 is '**The privileged strategy.** The 30% discount, the… | no |
| `2980` | fourth | w:'...it is a fourth, and it comes from the regulation rather than from the file.' | hand-authored | NONE | no |
| `2980` | fourth (ordinal) | — it is a fourth, and it comes from the regulation rather than from the file. | hand-authored | NONE (CASE.md:786 fixes 'Exactly three' landmines in the file; it records no fourth) | no |
| `2980` | three | w:'...It is not one of the three landmines the case file carries — those are Nathan, the | hand-authored | three (CASE.md:786; enumerated CASE.md:788-790) | no |
| `2980` | three (in 'the three landmines') | It is not one of the three landmines the case file carries — those are Nathan, the privi | hand-authored | three (CASE.md:786 'Exactly three (PEDAGOGY §5.3.4).'; enumerated at CASE.md:788-790) | no |
| `2981` | one | w:'No name, and in a market this narrow it identifies one person. De-identification mean | hand-authored | NONE | no |
| `2981` | sixties | t:'"A Midwest aerospace-fastener owner in her sixties, selling the company she bought fr | hand-authored | 64 (CASE.md:38, Meg's age at 2026-08-23) | no |
| `2981` | sixties (age band) | {t:'"A Midwest aerospace-fastener owner in her sixties, selling the company she bought f | hand-authored | 64 (CASE.md-derived COLE.megAge=64, megDob '14 March 1962', in the R6 span at line 1170… | no |
| `2996` | 8 (denominator in 'n / 8') | $('npiScore').textContent=n+' / 8'; | hand-authored | NONE (CASE.md has no count of NPI sorter items; the matching visible copy 'Three of the… | no |
| `2996` | sorted count n (live, 0-8) | var n=Object.keys(solved).length;$('npiScore').textContent=n+' / 8'; | runtime-computed | N/A | no |
| `2997` | 8 (completion gate) | if(n>=8)mark('g13')}})})(); | hand-authored | NONE | no |

### F-3 · PART 6's flat title list

419 distinct titles across the hub and sessions 1-4: every `<title>`, `h1`-`h4`,
`data-nav`, appendix card, `APXSTUB` label and contents-panel entry.

| file | DESCRIPTIVE | ACTION/ASSERTION | % action |
|---|---|---|---|
| `index.html` | 16 | 0 | 0% |
| `session-1/index.html` | 77 | 19 | **20%** |
| `session-2/index.html` | 92 | 14 | 13% |
| `session-3/index.html` | 78 | 1 | 1% |
| `session-4/index.html` | 100 | 22 | 18% |

**Two corrections to the headline the brief carries.** The brief states session-1 holds
**18** ACTION/ASSERTION titles at **42%** of its titles, against session-3's **7%**.
Measured here: **19** at **20%**, against session-3's **1%**. The 42%/7% pair is not
reproducible under any population this pass could construct — it is roughly the ratio you
get counting `h2` only. The **ranking the brief relies on is confirmed and is in fact
sharper than stated**: session-1 is the outlier and session-3 is the clean file.

Of session-1's 19, only **12 are distinct source titles**; the other 7 are generated
copies (`apxcard`, `apxstub`, `contents-entry`) that `scripts/build-appendix.mjs`
rewrites from the `h2`. That distinction is what makes TASK 1(c) tractable — see F-3.1.

**F-3.1 · who reads a session-1 title.** Verified by `grep -rn -F` over `*.html`,
`*.mjs`, `*.js`, `*.md`, `*.py`, `*.json`:

```
h1 / <title>     session-1:6 <title> · session-1:2153 APXBUDGET · index.html:1059 hub card
                 README.md:83 · instructor-notes/session-1.md:1
                 (CHANGELOG.md:744,:792 and changelog/index.html:608,:621 are the
                  historical record and are deliberately NOT updated)
core h2          session-1 APXBUDGET row only            — all generated
appendix h2      APXPANEL apxcard + APXSTUB + APXBUDGET  — all generated
h3 / h4          no readers
data-nav         a separate short nav label, never equal to the h2 in session-1
```

Every generated reader is rewritten by `node scripts/build-appendix.mjs`, and
`--check` exits 1 if any drifts. No title was hand-edited inside a generated region.

**The 66 mismatched `data-nav` count is unchanged by this pass.** Each section whose `h2`
changed already had a `data-nav` differing from it, so no new mismatch was created.


### F-4 · §D-3 resolved — the runtime figure at `session-1:2486`

The distribution is `PLN=40, PLP[i]=(1/i)/H(40)` built at `session-1:2461` — a pure
harmonic (Zipf exponent 1) series over 40 tokens. Executing the page renders
**23.4%** and **2.3%**, reproducing §D-3's recomputation exactly.

Every piece of furniture attached to that figure, verbatim:

| what | line | region | verbatim |
|---|---|---|---|
| heading above the chart | `1508` | R1 | `<h3>The probabilities fall off as a power law</h3>` |
| chip | — | — | **none scoped to this chart** |
| confidence label | `1521` | R8 | `<span class="conf h" data-src="src-wolfram">H</span>` |
| source note | `1521` | R8 | `<span class="src"><b>Wolfram, S. (2023), What Is ChatGPT Doing &hellip; and Why Does It Work?</b> &mdash; opening section. Assigned reading. <span class="conf h" data-src="src-wolfram">H</span></span>` |
| SVG accessible name | `1514` | R3 | `aria-label="Rank against probability"` |
| readout placeholder | `1515` | R3 | `<span class="nil">Switch the axes.</span>` |
| following paragraph | `1518` | R1 | `<p>Straightness means no natural cutoff &mdash; no rank at which the tail stops mattering. Every control in the lab later is somebody's answer to where to cut anyway.</p>` |
| readout, linear | `2486` | R2 | `The top candidate holds '+(PLP[0]*100).toFixed(1)+'% of the mass; by rank 10 a candidate holds '+(PLP[9]*100).toFixed(1)+'%...` |
| readout, log-log | `2487` | R2 | `That is the n<sup>&minus;1</sup> power law Wolfram identifies as characteristic of language.` |

**Verdict: no disclosure found.**

The repo has a convention for exactly this and did not apply it here. `class="sim"` is used
three times in `session-1` — `:1485` *"Illustrative distribution — the article's table is an
image and is not reproduced"*, `:1649` *"Teaching approximation — real tokenisation is
model-specific"*, `:1719` *"Simulated shallow model — confidence degrades with depth"*. The
`:1485` chip is the nearest one and **does not govern this chart**: it is the last child of
the `distribution-picker` panel, which opens at `:1480` and closes at `:1486`, twenty-three
lines before `div.chartbox` opens at `:1509`.

Two features actively point the other way: the only confidence marker a reader can attach to
the chart reads **H** and resolves to the Wolfram citation, and the log-log readout at
`:2487` says *"That is the n⁻¹ power law **Wolfram identifies**"* — which reads as sourced
measurement. The footer entry's own `Used for:` list at `:2191` does not mention a
rank-probability chart.

**REPORTED, NOT FIXED.** No disclosure was added, per the brief's explicit instruction.


### F-5 · §D-1's 59-hit gap — mechanism found, marker LEFT UP

The gap is not 59 unexplained hits. **The `228` in §B PART 2 and §D-1 is the
four-digit-year subset of the R6 population, not the R6 population.**

Measured by executing `classify()` over all six served pages:

```
                       R6 spans  chars    md5                               years  months  "this year"
index.html                    1  53988  66aa7266f0523b606a1bfb6e88693594      38       9            1
session-0.1/index.html        1  53988  66aa7266f0523b606a1bfb6e88693594      38       9            1
session-1/index.html          1  53988  66aa7266f0523b606a1bfb6e88693594      38       9            1
session-2/index.html          1  53988  66aa7266f0523b606a1bfb6e88693594      38       9            1
session-3/index.html          1  53988  66aa7266f0523b606a1bfb6e88693594      38       9            1
session-4/index.html          1  53988  66aa7266f0523b606a1bfb6e88693594      38       9            1
```

`38 x 6 = 228` reproduces the quoted figure **to the digit**. The full R6 date/time
population is `48 x 6 = 288`. So `558 + 288 = 846` against a reported `845` — a residual
of **1**, not 59.

**A structural constraint worth more than the arithmetic.** The CASE span is byte-identical
across all six pages, so **any population living wholly inside R6 is necessarily a multiple
of 6**. 59 is prime. **No R6-resident population can ever equal 59**, which retires a whole
class of future explanations for this gap.

Ruled out by actual counts over the six served pages: R11 = 0, R9 = 0, R3 = 1, R5 = 24,
R4 = 25 (all false positives — CSS numbers in 1900-2099), R10 = 30. No pair or triple sums
to 59. Outside the lessons: `changelog/index.html` = 51, the two script fragments = 31
combined, `instructor-notes/` = 1.

**MARKER LEFT UP, deliberately.** The residual of 1 is unexplained, `845` has no surviving
provenance — the `audit/` directory named for that measurement is empty and `grep -rn 845`
finds nothing but this file — and closing a row on an arithmetic near-miss is the failure
mode this file exists to prevent. §E item 5 is amended, not struck: the cheap next step is
not to hunt 59 hits but to **re-run the date/time inventory with a written-down match
vocabulary and region-inclusion list, and retire 845 entirely.** Do not cite 845.

**Found in passing, and it is a trap for the next deixis pass.** `session-1:1160` (R6) and
`session-1:1428` (R1) are two copies of the same spine question, both carrying *"this
year"*. Only the R1 copy is inside the table's 558. **The R6 copy is injected — editing it
in place is overwritten by `scripts/inject-case.mjs`**, so it must be changed in `CASE.md`
or not at all.


### F-6 · the flat title list, all 419

`class` is this pass's judgment; `read by` is verified by `grep -rn -F` for session-1
and reported-not-reverified for the other four files.

| file:line | kind | title | class | read by |
|---|---|---|---|---|
| `index.html:6` | title | BUS ADM X433.4 — AI Foundations for Financial Advisors | DESCRIPTIVE | NONE for the exact string (grep -rn "BUS ADM X433.4 — AI Foundations for Financial Advisors" returned only this line). NEAR-VARIANTS that duplicate… |
| `index.html:530` | h2 | The Cole Household | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:839, /home/user/BUS-ADM-X433.4-AI-Foundations-for-Fin… |
| `index.html:605` | title | Sheet 1 — ownership and balance sheet after the transaction | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-0.1/index.html:630, /home/user/BUS-ADM-X433.4-AI-Foundations-for-F… |
| `index.html:729` | title | Sheet 2 — annual cash flow once the structure is in place | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-0.1/index.html:754, /home/user/BUS-ADM-X433.4-AI-Foundations-for-F… |
| `index.html:907` | js-string | The Cole household — case facts | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-0.1/index.html:932, /home/user/BUS-ADM-X433.4-AI-Foundations-for-F… |
| `index.html:990` | js-string | '<title>The Cole Household — case facts</title><style>'+css+ | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-0.1/index.html:1015, /home/user/BUS-ADM-X433.4-AI-Foundations-for-… |
| `index.html:996` | js-string | '<h2 style="margin-bottom:6px">The Cole Household</h2>'+ | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-0.1/index.html:1021, /home/user/BUS-ADM-X433.4-AI-Foundations-for-… |
| `index.html:1032` | h1 | AI Foundations for Financial Advisors | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/index.html:6 (same file, document <title>), /home/user/BUS-ADM-X433.4-AI-F… |
| `index.html:1042` | h2 | Sessions | DESCRIPTIVE | NONE. grep -rn ">Sessions<" across *.html/*.mjs/*.js/*.md returns only this line; grep -rn "<h2>Sessions</h2>" returns only this line. The bare wor… |
| `index.html:1050` | h3 | The Control Surface | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-0.1/index.html:6 (<title>Session 0.1 \| The Control Surface</title… |
| `index.html:1059` | h3 | How the Machine Works, and What It Costs | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:6 (<title>Session 1 — How the Machine Works, and What… |
| `index.html:1068` | h3 | Practical AI Usage in Daily Advisory Workflows | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-2/index.html:6 (<title>Session 2 · Practical AI Usage in Daily Adv… |
| `index.html:1077` | h3 | Gathering and Documenting Client Information | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:6 (<title>Session 3 — Gathering and Documenting Clien… |
| `index.html:1086` | h3 | Compliance, Security and Responsible Use | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-4/index.html:6 (<title>Session 4 — Compliance, Security and Respon… |
| `index.html:1095` | h3 | Final project | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/README.md:87, /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advis… |
| `index.html:1101` | h2 | Course rule on client data | DESCRIPTIVE | NONE. grep -rn "Course rule on client data" across *.html/*.mjs/*.js/*.md returns only this line. NEAR-VARIANT, not an exact match: /home/user/BUS-… |
| `session-1/index.html:6` | title | Session 1 — How the Machine Works, and What It Costs | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/CHANGELOG.md:744 (full string), /home/user/BUS-ADM-X433.4-AI-Foundations-f… |
| `session-1/index.html:839` | h2 | The Cole Household | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1299, /home/user/BUS-ADM-X433.4-AI-Foundations-for-Fi… |
| `session-1/index.html:1299` | js-string | '<title>The Cole Household — case facts</title><style>'+css+ | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/index.html:990, /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Adv… |
| `session-1/index.html:1305` | js-string | '<h2 style="margin-bottom:6px">The Cole Household</h2>'+ | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:839, /home/user/BUS-ADM-X433.4-AI-Foundations-for-Fin… |
| `session-1/index.html:1398` | data-nav | Start | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder reads s.dataset.nav for every sect… |
| `session-1/index.html:1401` | h1 | How the Machine Works, and What It Costs | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:6, /home/user/BUS-ADM-X433.4-AI-Foundations-for-Finan… |
| `session-1/index.html:1437` | data-nav | Appendix contents | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1439, /home/user/BUS-ADM-X433.4-AI-Foundations-for-Fi… |
| `session-1/index.html:1439` | h2 | Appendix contents | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1437, /home/user/BUS-ADM-X433.4-AI-Foundations-for-Fi… |
| `session-1/index.html:1443` | apxcard | Counting Works, Then Stops Working | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1528 (APXSTUB), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1444` | apxcard | Fitting a Model by Hand | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1582 (APXSTUB), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1445` | apxcard | Words Laid Out So That Nearby Means Similar | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1671 (APXSTUB), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1446` | apxcard | The Task a Transformer Cannot Reliably Learn | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1699 (APXSTUB), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1447` | apxcard | The Nine Controls Between the Model and Your Answer | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1734 (APXSTUB), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1448` | apxcard | There Is No Separate AI Rulebook | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1971 (APXSTUB), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1449` | apxcard | Disclosure of AI Use to the Client | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2034 (APXSTUB), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1454` | data-nav | Cold open | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder), /home/user/BUS-ADM-X433.4-AI-Fou… |
| `session-1/index.html:1457` | h2 | The Last Prompt You Sent | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2154 (budget table), /home/user/BUS-ADM-X433.4-AI-Fou… |
| `session-1/index.html:1473` | data-nav | Prediction | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep -rnF 'data-nav="Prediction"… |
| `session-1/index.html:1476` | h2 | The Model Ranks Candidates, Then Something Picks One | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2155 (budget table). No other hit in the repo. |
| `session-1/index.html:1490` | h3 | Always taking the top word produces flat, repetitive text | **ACTION/ASSERTION** | NONE — grep -rnF over *.html/*.mjs/*.js/*.md returns only this line. |
| `session-1/index.html:1508` | h3 | The probabilities fall off as a power law | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/editorial-gap-report.md:431 |
| `session-1/index.html:1527` | data-nav | A1 · n-grams | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep -rnF 'data-nav="A1 · n-gram… |
| `session-1/index.html:1528` | apxstub | A1 &middot; Counting Works, Then Stops Working | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1443 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1531` | h2 | Counting Works, Then Stops Working | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1443 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1563` | h3 | Why you cannot just use longer sequences | **ACTION/ASSERTION** | NONE — grep -rnF returns only this line. |
| `session-1/index.html:1581` | data-nav | A2 · Fitting a model | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep returns only this line. |
| `session-1/index.html:1582` | apxstub | A2 &middot; Fitting a Model by Hand | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1444 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1585` | h2 | Fitting a Model by Hand | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1444 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1611` | h3 | The size of the thing | DESCRIPTIVE | NONE — grep -rnF returns only this line. |
| `session-1/index.html:1631` | data-nav | Tokens | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep -rnF 'data-nav="Tokens"' re… |
| `session-1/index.html:1634` | h2 | A Token Is Not a Word | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2156 (budget table). No other hit in the repo. |
| `session-1/index.html:1670` | data-nav | A3 · Meaning space | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep returns only this line. |
| `session-1/index.html:1671` | apxstub | A3 &middot; Words Laid Out So That Nearby Means Similar | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1445 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1674` | h2 | Words Laid Out So That Nearby Means Similar | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1445 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1689` | h3 | One word, two meanings | DESCRIPTIVE | NONE — grep -rnF returns only this line. |
| `session-1/index.html:1698` | data-nav | A4 · Counting failure | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep returns only this line. |
| `session-1/index.html:1699` | apxstub | A4 &middot; The Task a Transformer Cannot Reliably Learn | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1446 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1702` | h2 | The Task a Transformer Cannot Reliably Learn | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1446 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1733` | data-nav | A5 · SAMPLER LAB | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep returns only this line. |
| `session-1/index.html:1734` | apxstub | A5 &middot; The Nine Controls Between the Model and Your Answer | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1447 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1737` | h2 | The Nine Controls Between the Model and Your Answer | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1447 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1803` | data-nav | Hallucination | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep -rnF 'data-nav="Hallucinati… |
| `session-1/index.html:1806` | h2 | The Same Question, Asked Three Times | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2157 (budget table), /home/user/BUS-ADM-X433.4-AI-Fou… |
| `session-1/index.html:1818` | h3 | Why it guesses instead of abstaining | **ACTION/ASSERTION** | NONE — grep -rnF returns only this line. |
| `session-1/index.html:1844` | data-nav | Frontier | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep -rnF 'data-nav="Frontier"' … |
| `session-1/index.html:1847` | h2 | Intelligence Index Plotted Against Cost per Task | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2158 (budget table). No other hit in the repo. |
| `session-1/index.html:1879` | data-nav | Practice cost | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep returns only this line. |
| `session-1/index.html:1882` | h2 | What a Practice Pays in a Year | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2159 (budget table). No other hit in the repo. |
| `session-1/index.html:1901` | h3 | What one pass over the Cole file costs | DESCRIPTIVE | NONE — grep -rnF returns only this line. |
| `session-1/index.html:1924` | data-nav | Tier choice | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep returns only this line. |
| `session-1/index.html:1927` | h2 | Assigning a Tier to Six Tasks From This Case | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2160 (budget table). No other hit in the repo. |
| `session-1/index.html:1935` | data-nav | Confidentiality | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep returns only this line. |
| `session-1/index.html:1938` | h2 | What May Never Be Entered Into a Third-Party Tool | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2161 (budget table), /home/user/BUS-ADM-X433.4-AI-Fou… |
| `session-1/index.html:1944` | h4 | Nonpublic personal information | DESCRIPTIVE | NONE — grep -rnF returns only this line. |
| `session-1/index.html:1945` | h4 | Not identifying on its own | DESCRIPTIVE | NONE — grep -rnF returns only this line. |
| `session-1/index.html:1970` | data-nav | A6 · Regulation | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep returns only this line. |
| `session-1/index.html:1971` | apxstub | A6 &middot; There Is No Separate AI Rulebook | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1448 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1974` | h2 | There Is No Separate AI Rulebook | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1448 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:1989` | h3 | When the output is wrong, what went wrong | **ACTION/ASSERTION** | NONE — grep -rnF returns only this line. |
| `session-1/index.html:2001` | data-nav | Custom instructions | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep -rnF 'data-nav="Custom inst… |
| `session-1/index.html:2004` | h2 | Where Account-Level Custom Instructions Are Configured | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2162 (budget table). No other hit in the repo. |
| `session-1/index.html:2033` | data-nav | A7 · Discussion | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep returns only this line. |
| `session-1/index.html:2034` | apxstub | A7 &middot; Disclosure of AI Use to the Client | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1449 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:2037` | h2 | Disclosure of AI Use to the Client | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1449 (apxcard), /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-1/index.html:2073` | data-nav | Close | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2365 (rail builder). grep -rnF 'data-nav="Close"' ret… |
| `session-1/index.html:2076` | h2 | The Baseline You Cannot Reconstruct Later | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2163 (budget table). No other hit in the repo. |
| `session-1/index.html:2080` | h3 | Efficiency Baseline | DESCRIPTIVE | NONE — grep -rnF returns only this line. |
| `session-1/index.html:2100` | h4 | Three prompt templates | DESCRIPTIVE | NONE — grep -rnF returns only this line. |
| `session-1/index.html:2101` | h4 | Account-level custom instructions | DESCRIPTIVE | NONE — grep -rnF returns only this line. |
| `session-1/index.html:2114` | h3 | CFP Board principal knowledge topics touched tonight | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:1718 |
| `session-1/index.html:2137` | h4 | Fluency is not evidence | **ACTION/ASSERTION** | NONE — grep -rnF returns only this line. |
| `session-1/index.html:2138` | h4 | Verification is neither optional nor automatic | **ACTION/ASSERTION** | NONE — grep -rnF returns only this line. |
| `session-1/index.html:2139` | h4 | Tier selection is judgment you defend | **ACTION/ASSERTION** | NONE — grep -rnF returns only this line. |
| `session-1/index.html:2140` | h4 | You sign the work | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:2745 |
| `session-1/index.html:2148` | h3 | Instructor minute budget | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-2/index.html:2008, /home/user/BUS-ADM-X433.4-AI-Foundations-for-Fi… |
| `session-1/index.html:2153` | contents-entry | How the Machine Works, and What It Costs | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1401 (h1, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2154` | contents-entry | The Last Prompt You Sent | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1457 (h2, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2155` | contents-entry | The Model Ranks Candidates, Then Something Picks One | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1476 (h2, source of truth). No other hit in the repo. |
| `session-1/index.html:2156` | contents-entry | A Token Is Not a Word | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1634 (h2, source of truth). No other hit in the repo. |
| `session-1/index.html:2157` | contents-entry | The Same Question, Asked Three Times | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1806 (h2, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2158` | contents-entry | Intelligence Index Plotted Against Cost per Task | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1847 (h2, source of truth). No other hit in the repo. |
| `session-1/index.html:2159` | contents-entry | What a Practice Pays in a Year | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1882 (h2, source of truth). No other hit in the repo. |
| `session-1/index.html:2160` | contents-entry | Assigning a Tier to Six Tasks From This Case | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1927 (h2, source of truth). No other hit in the repo. |
| `session-1/index.html:2161` | contents-entry | What May Never Be Entered Into a Third-Party Tool | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1938 (h2, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2162` | contents-entry | Where Account-Level Custom Instructions Are Configured | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2004 (h2, source of truth). No other hit in the repo. |
| `session-1/index.html:2163` | contents-entry | The Baseline You Cannot Reconstruct Later | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2076 (h2, source of truth). No other hit in the repo. |
| `session-1/index.html:2164` | contents-entry | Counting Works, Then Stops Working | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1531 (h2, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2165` | contents-entry | Fitting a Model by Hand | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1585 (h2, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2166` | contents-entry | Words Laid Out So That Nearby Means Similar | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1674 (h2, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2167` | contents-entry | The Task a Transformer Cannot Reliably Learn | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1702 (h2, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2168` | contents-entry | The Nine Controls Between the Model and Your Answer | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1737 (h2, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2169` | contents-entry | There Is No Separate AI Rulebook | **ACTION/ASSERTION** | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:1974 (h2, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2170` | contents-entry | Disclosure of AI Use to the Client | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2037 (h2, source of truth), /home/user/BUS-ADM-X433.4… |
| `session-1/index.html:2180` | h3 | Sources cited in this session | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1817 (same string, emitted as an h4 there) |
| `session-1/index.html:2819` | js-string | return '<div class="smod" id="mod_'+k+'"><label class="sh"><input type="checkbox" data-sm="'+k+'"><h4>'+m.name | DESCRIPTIVE | Values come from the sampler module table (e.g. /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:562 '… |
| `session-1/index.html:3105` | js-string | return '<div><h4>'+o.k+' — the case for it</h4><ul style="font-size:14.5px;line-height:1.5;padding-left:18px;m | DESCRIPTIVE | NONE — grep -rnF 'the case for it' over *.html/*.mjs/*.js/*.md returns only this line as a heading string. |
| `session-2/index.html:6` | title | Session 2 · Practical AI Usage in Daily Advisory Workflows | DESCRIPTIVE | instructor-notes/session-2.md:1 (exact, as the file's H1). Bare-title half also read at session-2/index.html:1234 (h1), session-2/index.html:2013 (… |
| `session-2/index.html:729` | h2 | The Cole Household | DESCRIPTIVE | session-2/index.html:1189, session-2/index.html:1195; index.html:530, session-1/index.html:839, session-3/index.html:697, session-4/index.html:716;… |
| `session-2/index.html:1189` | js-string | '<title>The Cole Household — case facts</title><style>'+css+ | DESCRIPTIVE | index.html:990, session-0.1/index.html:1015, session-1/index.html:1299, session-3/index.html:1157, session-4/index.html:1176, scripts/inject-case.m… |
| `session-2/index.html:1195` | js-string | '<h2 style="margin-bottom:6px">The Cole Household</h2>'+ | DESCRIPTIVE | session-2/index.html:729, index.html:996, session-0.1/index.html:1021, session-1/index.html:1305, session-3/index.html:1163, session-4/index.html:1… |
| `session-2/index.html:1232` | data-nav | Session map | DESCRIPTIVE | docs/repo-updates-plan.md:387, docs/repo-updates-plan.md:504, docs/repo-updates-plan.md:1700, docs/editorial-gap-report.md:1399, docs/editorial-gap… |
| `session-2/index.html:1234` | h1 | Practical AI Usage in Daily Advisory Workflows | DESCRIPTIVE | session-2/index.html:6, session-2/index.html:2013; index.html:1068; README.md:84; CHANGELOG.md:754, CHANGELOG.md:798; changelog/index.html:610, cha… |
| `session-2/index.html:1248` | h3 | Retrieval bridge &mdash; Session 1 mechanism | DESCRIPTIVE | NONE (grep -rnF for the exact string across *.html/*.mjs/*.js/*.md returns only this line; the near-variant 'Retrieval bridge &mdash; Session 3' li… |
| `session-2/index.html:1256` | h3 | The Cole household | DESCRIPTIVE | session-2/index.html:1106, session-2/index.html:2052; session-3/index.html:1229 (h4, exact title position), session-3/index.html:1074, session-3/in… |
| `session-2/index.html:1263` | h4 | Meg and David Cole, Barrington Hills, Illinois | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1264` | h4 | CPC stock: one asset, most of the estate | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1265` | h4 | Non-voting LLC units moved to a grantor trust | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1266` | h4 | How much of the note does she call this year? | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1272` | h4 | A working model of sampling | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1273` | h4 | A tier-selection rule | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1274` | h4 | Your own prompts, scored and rewritten | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1275` | h4 | A citation verification routine | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1278` | h3 | Time budget | DESCRIPTIVE | session-0.1/index.html:1141 (inside an HTML comment), docs/repo-updates-plan.md:2605 (prose quoting this heading). No other title-position duplicate. |
| `session-2/index.html:1306` | data-nav | Appendix contents | DESCRIPTIVE | session-2/index.html:1308; session-1/index.html:1437, session-3/index.html:1243, session-4/index.html:1271; scripts/build-appendix.mjs:243 (generat… |
| `session-2/index.html:1308` | h2 | Appendix contents | DESCRIPTIVE | session-2/index.html:1306; session-1/index.html:1439, session-3/index.html:1245, session-4/index.html:1273; scripts/build-appendix.mjs:245 (generat… |
| `session-2/index.html:1312` | apxcard | Next-Token Probabilities for a Single Prompt | DESCRIPTIVE | session-2/index.html:1322 (APXSTUB), session-2/index.html:1324 (h2), session-2/index.html:2024 (APXBUDGET row). No hits outside the file. |
| `session-2/index.html:1313` | apxcard | Laplace on Probability as a Measure of Ignorance | DESCRIPTIVE | session-2/index.html:1363 (APXSTUB), session-2/index.html:1365 (h2), session-2/index.html:2025 (APXBUDGET row). No hits outside the file. |
| `session-2/index.html:1314` | apxcard | Sampling Failure on a Task That Requires Counting | DESCRIPTIVE | session-2/index.html:1460 (APXSTUB), session-2/index.html:1462 (h2), session-2/index.html:2026 (APXBUDGET row). No hits outside the file. |
| `session-2/index.html:1315` | apxcard | The Seven-Step Process and the Delegation Line | DESCRIPTIVE | session-2/index.html:1753 (APXSTUB), session-2/index.html:1755 (h2), session-2/index.html:2027 (APXBUDGET row). No hits outside the file. |
| `session-2/index.html:1316` | apxcard | Specification Cost Against Task Cost | DESCRIPTIVE | session-2/index.html:1884 (APXSTUB), session-2/index.html:1886 (h2), session-2/index.html:2028 (APXBUDGET row). No hits outside the file. |
| `session-2/index.html:1321` | data-nav | B1 · Next token | DESCRIPTIVE | docs/repo-updates-plan.md:388 |
| `session-2/index.html:1322` | APXSTUB | B1 &middot; Next-Token Probabilities for a Single Prompt | DESCRIPTIVE | session-2/index.html:1312 (apxcard), session-2/index.html:1324 (h2), session-2/index.html:2024 (APXBUDGET row) |
| `session-2/index.html:1324` | h2 | Next-Token Probabilities for a Single Prompt | DESCRIPTIVE | session-2/index.html:1312 (apxcard), session-2/index.html:1322 (APXSTUB), session-2/index.html:2024 (APXBUDGET row) |
| `session-2/index.html:1349` | h3 | What this rules out | DESCRIPTIVE | docs/editorial-gap-report.md:1411 (quotes the heading verbatim: "only 'What this rules out' turns to the planner") |
| `session-2/index.html:1362` | data-nav | B2 · Laplace | DESCRIPTIVE | docs/repo-updates-plan.md:389 |
| `session-2/index.html:1363` | APXSTUB | B2 &middot; Laplace on Probability as a Measure of Ignorance | DESCRIPTIVE | session-2/index.html:1313 (apxcard), session-2/index.html:1365 (h2), session-2/index.html:2025 (APXBUDGET row) |
| `session-2/index.html:1365` | h2 | Laplace on Probability as a Measure of Ignorance | DESCRIPTIVE | session-2/index.html:1313 (apxcard), session-2/index.html:1363 (APXSTUB), session-2/index.html:2025 (APXBUDGET row) |
| `session-2/index.html:1381` | h3 | The practical consequence | DESCRIPTIVE | audit/AUDIT-2026-08-20.md:156 (prose sentence beginning 'The practical consequence is not the validator…', not a title). No title-position duplicate. |
| `session-2/index.html:1393` | data-nav | Cold open | DESCRIPTIVE | session-2/index.html:1394 (eyebrow 'Cold open &middot; standing ritual'), session-2/index.html:2014 (APXBUDGET row); instructor-notes/session-2.md:… |
| `session-2/index.html:1395` | h2 | The Last Prompt You Sent | DESCRIPTIVE | session-2/index.html:2014 (APXBUDGET row); session-1/index.html:1457, session-1/index.html:2154; session-3/index.html:1260, session-3/index.html:17… |
| `session-2/index.html:1410` | data-nav | Temperature | DESCRIPTIVE | session-2/index.html:1429 (plab), session-2/index.html:1430 (aria-label); docs/repo-updates-plan.md:391, :508, :934, :957, :962, :964, :966, :969, … |
| `session-2/index.html:1412` | h2 | Temperature and Output Variance | DESCRIPTIVE | session-2/index.html:2015 (APXBUDGET row); docs/repo-updates-plan.md:2218 (quotes the footer row verbatim) |
| `session-2/index.html:1440` | h3 | Three consequences for an advisory practice | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1442` | h4 | The prompt is not the record | **ACTION/ASSERTION** | docs/editorial-gap-report.md:1536 (quotes it verbatim in a bridge-mapping table) |
| `session-2/index.html:1443` | h4 | Re-asking is not verification | **ACTION/ASSERTION** | docs/editorial-gap-report.md:1542 (quotes it verbatim) |
| `session-2/index.html:1444` | h4 | Consumer chat tools do not expose T | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1459` | data-nav | B3 · Counting failure | DESCRIPTIVE | docs/repo-updates-plan.md:392 |
| `session-2/index.html:1460` | APXSTUB | B3 &middot; Sampling Failure on a Task That Requires Counting | DESCRIPTIVE | session-2/index.html:1314 (apxcard), session-2/index.html:1462 (h2), session-2/index.html:2026 (APXBUDGET row) |
| `session-2/index.html:1462` | h2 | Sampling Failure on a Task That Requires Counting | DESCRIPTIVE | session-2/index.html:1314 (apxcard), session-2/index.html:1460 (APXSTUB), session-2/index.html:2026 (APXBUDGET row) |
| `session-2/index.html:1485` | h3 | The mapping to your work | DESCRIPTIVE | docs/editorial-gap-report.md:1413 (quotes it verbatim: "'The mapping to your work' is the application tail") |
| `session-2/index.html:1494` | data-nav | Cost frontier | DESCRIPTIVE | docs/repo-updates-plan.md:393, docs/repo-updates-plan.md:509; docs/editorial-gap-report.md:1402; audit/AUDIT-2026-08-20.md:66 |
| `session-2/index.html:1496` | h2 | Cost Per Task Versus Cost Per Token | DESCRIPTIVE | session-2/index.html:2016 (APXBUDGET row); EDITORIAL.md:1208 (cited as the GOOD example of a section heading) |
| `session-2/index.html:1513` | h3 | Three findings a price sheet hides | DESCRIPTIVE | EDITORIAL.md:1209 (quotes it verbatim as the paired h3 in the GOOD example) |
| `session-2/index.html:1515` | h4 | Token price gap, Sonnet 5 against Fable 5 | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1516` | h4 | Actual gap in cost per finished task | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1517` | h4 | Opus 5's cost advantage over Fable 5 | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1553` | data-nav | P·T·C·F | DESCRIPTIVE | docs/repo-updates-plan.md:394; docs/editorial-gap-report.md:1403; docs/chip-rewiring.md:175; audit/AUDIT-2026-08-20.md:73 |
| `session-2/index.html:1555` | h2 | Persona, Task, Context, Format | DESCRIPTIVE | session-2/index.html:2017 (APXBUDGET row) |
| `session-2/index.html:1574` | h3 | What the evidence says about Persona | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1584` | h3 | Where the effort should go instead | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1611` | data-nav | Your prompts | DESCRIPTIVE | docs/repo-updates-plan.md:395; docs/editorial-gap-report.md:1404 |
| `session-2/index.html:1613` | h2 | Scoring Your Own Prompts Against P.T.C.F | DESCRIPTIVE | session-2/index.html:2018 (APXBUDGET row) |
| `session-2/index.html:1645` | h3 | Rewrite the weakest of the three | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1673` | data-nav | Triage | DESCRIPTIVE | docs/repo-updates-plan.md:396; docs/editorial-gap-report.md:1405; session-2/index.html:1693 (prose in a work-along gate, 'Triage every prompt…' — i… |
| `session-2/index.html:1675` | h2 | Prompt Specification Triage | DESCRIPTIVE | session-2/index.html:2019 (APXBUDGET row) |
| `session-2/index.html:1679` | h4 | Underspecified | DESCRIPTIVE | session-2/index.html:2457 (JS label map lbl={A:'Underspecified',…}), session-2/index.html:2503 (JS score-band copy) |
| `session-2/index.html:1680` | h4 | Specified, unverifiable | DESCRIPTIVE | session-2/index.html:2457 (JS label map, B:'Specified, unverifiable') |
| `session-2/index.html:1681` | h4 | Specified and verifiable | DESCRIPTIVE | session-2/index.html:2457 (JS label map, C:'Specified and verifiable') |
| `session-2/index.html:1697` | data-nav | Interview rewrite | DESCRIPTIVE | docs/repo-updates-plan.md:397; docs/editorial-gap-report.md:1406; audit/AUDIT-2026-08-20.md:68 |
| `session-2/index.html:1699` | h2 | The Interview Rewrite | DESCRIPTIVE | session-2/index.html:2020 (APXBUDGET row); docs/repo-updates-plan.md:2638 (quotes core #s8 "The Interview Rewrite") |
| `session-2/index.html:1711` | h3 | The Cole Buy-Sell Agreement | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1722` | h3 | Specification Diagnosis on Your Own Prompt | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1752` | data-nav | B4 · Seven steps | DESCRIPTIVE | docs/repo-updates-plan.md:398 |
| `session-2/index.html:1753` | APXSTUB | B4 &middot; The Seven-Step Process and the Delegation Line | DESCRIPTIVE | session-2/index.html:1315 (apxcard), session-2/index.html:1755 (h2), session-2/index.html:2027 (APXBUDGET row) |
| `session-2/index.html:1755` | h2 | The Seven-Step Process and the Delegation Line | DESCRIPTIVE | session-2/index.html:1315 (apxcard), session-2/index.html:1753 (APXSTUB), session-2/index.html:2027 (APXBUDGET row) |
| `session-2/index.html:1777` | h3 | Why steps 2 and 4 sit apart | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1786` | data-nav | Citations | DESCRIPTIVE | docs/repo-updates-plan.md:399, docs/repo-updates-plan.md:635, docs/repo-updates-plan.md:2240; docs/editorial-gap-report.md:1407; audit/AUDIT-2026-0… |
| `session-2/index.html:1788` | h2 | Citation Failure Types on the Cole IDGT Transaction | DESCRIPTIVE | session-2/index.html:2021 (APXBUDGET row) |
| `session-2/index.html:1807` | h3 | Four failure types, in ascending order of danger | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1810` | h4 | Fabrication | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1811` | h4 | Misgrounding | DESCRIPTIVE | docs/editorial-gap-report.md:1028 (glossary row citing session-2 §s10's Type 02 card). No title-position duplicate. |
| `session-2/index.html:1812` | h4 | Superseded | DESCRIPTIVE | MAINTAINING.md:822; CASE.md:812, CASE.md:1315, CASE.md:1316; docs/probe-captures.md:3; docs/deferred-work.md:107; docs/session-1-feedback-inventory… |
| `session-2/index.html:1813` | h4 | Cited as holding, never decided | DESCRIPTIVE | session-2/index.html:2648 (JS category array, {k:'nd',t:'Cited as holding, never decided'}) |
| `session-2/index.html:1822` | h3 | The verification order | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1825` | h4 | Does the authority exist | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1826` | h4 | Does it say what the sentence claims | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1827` | h4 | Is it still operative | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1828` | h4 | Does it reach these facts | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1843` | data-nav | Template audit | DESCRIPTIVE | docs/repo-updates-plan.md:400; docs/editorial-gap-report.md:1408; audit/AUDIT-2026-08-20.md:65 |
| `session-2/index.html:1845` | h2 | Template Audit and Structured Peer Review | DESCRIPTIVE | session-2/index.html:2022 (APXBUDGET row) |
| `session-2/index.html:1850` | h3 | Part one &mdash; self-audit | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1863` | h3 | Part two &mdash; structured peer review | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1883` | data-nav | B5 · Discussion | DESCRIPTIVE | docs/repo-updates-plan.md:401 |
| `session-2/index.html:1884` | APXSTUB | B5 &middot; Specification Cost Against Task Cost | DESCRIPTIVE | session-2/index.html:1316 (apxcard), session-2/index.html:1886 (h2), session-2/index.html:2028 (APXBUDGET row) |
| `session-2/index.html:1886` | h2 | Specification Cost Against Task Cost | DESCRIPTIVE | session-2/index.html:1316 (apxcard), session-2/index.html:1884 (APXSTUB), session-2/index.html:2028 (APXBUDGET row) |
| `session-2/index.html:1891` | h3 | Phase one &mdash; position, 3 minutes | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1901` | h3 | Phase two &mdash; defence, 8 minutes | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1913` | h3 | Phase three &mdash; complication, 5 minutes | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1916` | h4 | The verification time is not optional and it is not amortised | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1917` | h4 | &sect;09 arithmetic | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1918` | h4 | Appendix B4 adoption gap | DESCRIPTIVE | docs/repo-updates-plan.md:703 (quotes `session-2:1876`, `<h4>Appendix B4 adoption gap</h4>` — note the doc's stale line number; the heading is now … |
| `session-2/index.html:1921` | h3 | Phase four &mdash; re-vote, 3 minutes | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1945` | data-nav | Final project | DESCRIPTIVE | docs/repo-updates-plan.md:402, :517, :1337, :2555; docs/editorial-gap-report.md:1409, :1701; README.md:87; index.html:1095; audit/AUDIT-2026-08-20.… |
| `session-2/index.html:1947` | h2 | Final Project Part 1 and Baseline Capture | DESCRIPTIVE | session-2/index.html:2023 (APXBUDGET row) |
| `session-2/index.html:1951` | h4 | A scalable AI-enabled workflow for a recurring task in your own practice | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1952` | h4 | A single email, body reading only &ldquo;See attached&rdquo; | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1953` | h4 | Transcript to instructor only. No client data anywhere. | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1976` | h3 | Part 1 deliverable checklist | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1984` | h3 | The First Draft | DESCRIPTIVE | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:1992` | h3 | What Session 3 does that this session could not | **ACTION/ASSERTION** | NONE (grep -rnF across *.html/*.mjs/*.js/*.md returns only this line) |
| `session-2/index.html:2008` | h3 | Instructor minute budget | DESCRIPTIVE | session-1/index.html:2148, session-3/index.html:1787, session-4/index.html:1982 (byte-identical footer heading, same inline style). docs/repo-updat… |
| `session-2/index.html:2036` | h4 | Sources | DESCRIPTIVE | session-4/index.html:2012 (h3 'Sources'), session-0.1/index.html:1773 (p.mono 'Sources'). Near-variants, not exact: session-3/index.html:1817 'Sour… |
| `session-3/index.html:6` | title | Session 3 — Gathering and Documenting Client Information | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1201 (h1, sub-string); /home/user/BUS-ADM-X433.4-AI-F… |
| `session-3/index.html:697` | h2 | The Cole Household | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/index.html:530; /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Adv… |
| `session-3/index.html:1157` | js-string | '<title>The Cole Household — case facts</title><style>'+css+ | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/scripts/inject-case.mjs:242 (GENERATOR — the source of this line); /home/u… |
| `session-3/index.html:1163` | js-string | '<h2 style="margin-bottom:6px">The Cole Household</h2>'+ | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/scripts/inject-case.mjs:248 (GENERATOR); /home/user/BUS-ADM-X433.4-AI-Foun… |
| `session-3/index.html:1199` | data-nav | Bridge + case | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:408 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1201` | h1 | Gathering and Documenting Client Information | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:6 (<title>); /home/user/BUS-ADM-X433.4-AI-Foundations… |
| `session-3/index.html:1219` | h4 | Session 2 recall: the citation-verification order | DESCRIPTIVE | NONE (grep -rnF over *.html *.mjs *.js *.md *.py *.json *.txt *.css returned only this line) |
| `session-3/index.html:1229` | h4 | The Cole household | DESCRIPTIVE | Heading/label-position duplicates: /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-2/index.html:1256 (<h3>The Cole… |
| `session-3/index.html:1243` | data-nav | Appendix contents | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/scripts/build-appendix.mjs:243 (GENERATOR, PANEL template); /home/user/BUS… |
| `session-3/index.html:1245` | h2 | Appendix contents | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/scripts/build-appendix.mjs:245 (GENERATOR, PANEL template); /home/user/BUS… |
| `session-3/index.html:1249` | apxcard | Chunk Size and Condition Orphaning | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1361 (h2, SOURCE this card is generated from); /home/… |
| `session-3/index.html:1250` | apxcard | Hybrid Search and the Re-ranking Pass | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1390 (h2, SOURCE); /home/user/BUS-ADM-X433.4-AI-Found… |
| `session-3/index.html:1251` | apxcard | Grounding Compared With Fine-Tuning | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1486 (h2, SOURCE); /home/user/BUS-ADM-X433.4-AI-Found… |
| `session-3/index.html:1252` | apxcard | Note-Taker Adoption Against Note-Taker Satisfaction | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1567 (h2, SOURCE); /home/user/BUS-ADM-X433.4-AI-Found… |
| `session-3/index.html:1253` | apxcard | Citation-Backed Output and Verification Effort | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1721 (h2, SOURCE); /home/user/BUS-ADM-X433.4-AI-Found… |
| `session-3/index.html:1258` | data-nav | Cold open | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1259 (eyebrow 'Cold open &middot; standing ritual'); … |
| `session-3/index.html:1260` | h2 | The Last Prompt You Sent | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1793 (APXBUDGET row); /home/user/BUS-ADM-X433.4-AI-Fo… |
| `session-3/index.html:1275` | data-nav | Embeddings | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:410 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1277` | h2 | Embeddings and the Coordinates of Meaning Space | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1794 (APXBUDGET row); /home/user/BUS-ADM-X433.4-AI-Fo… |
| `session-3/index.html:1287` | h4 | The Meaning Map | DESCRIPTIVE | NONE (grep -rnF over *.html *.mjs *.js *.md *.py *.json *.txt *.css returned only this line) |
| `session-3/index.html:1300` | data-nav | Distribution | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:411 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1302` | h2 | Distributional Similarity and Referential Difference | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1795 (APXBUDGET row); GENERATOR: /home/user/BUS-ADM-X… |
| `session-3/index.html:1312` | h4 | Pair Sort: Distributional Similarity Against Reference | DESCRIPTIVE | NONE (grep -rnF returned only this line) |
| `session-3/index.html:1328` | data-nav | Retrieval | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:412 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1330` | h2 | Retrieval Mechanics: Chunking, Indexing, and Ranking | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1796 (APXBUDGET row); GENERATOR: /home/user/BUS-ADM-X… |
| `session-3/index.html:1340` | h4 | The Retriever on the Cole Document Set | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/editorial-gap-report.md:969 |
| `session-3/index.html:1358` | data-nav | C1 · Chunk size | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:413 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1359` | apxstub | C1 &middot; Chunk Size and Condition Orphaning | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1361 (h2, SOURCE); /home/user/BUS-ADM-X433.4-AI-Found… |
| `session-3/index.html:1361` | h2 | Chunk Size and Condition Orphaning | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1249 (apxcard); /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-3/index.html:1371` | h4 | Re-chunk Article VII | **ACTION/ASSERTION** | NONE (grep -rnF returned only this line) |
| `session-3/index.html:1387` | data-nav | C5 &middot; Hybrid search | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:414 (section table, rendered as 'C5 · Hybrid sea… |
| `session-3/index.html:1388` | apxstub | C5 &middot; Hybrid Search and the Re-ranking Pass | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1390 (h2, SOURCE); /home/user/BUS-ADM-X433.4-AI-Found… |
| `session-3/index.html:1390` | h2 | Hybrid Search and the Re-ranking Pass | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1250 (apxcard); /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-3/index.html:1398` | h4 | Stage-by-Stage Effect on the Failure Rate | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/editorial-gap-report.md:972 |
| `session-3/index.html:1413` | data-nav | Retrieval rates | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:415 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1415` | h2 | Measured Retrieval Failure Rates | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1797 (APXBUDGET row); GENERATOR: /home/user/BUS-ADM-X… |
| `session-3/index.html:1427` | h4 | Grounded-Answer Prediction and Your Own Failure Count | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/editorial-gap-report.md:970 |
| `session-3/index.html:1448` | data-nav | Grounded error | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:416 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1450` | h2 | Measured Hallucination Rates Under Grounding | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1798 (APXBUDGET row); GENERATOR: /home/user/BUS-ADM-X… |
| `session-3/index.html:1466` | h4 | Conditions and the Measured Hallucination Band | DESCRIPTIVE | NONE (grep -rnF returned only this line) |
| `session-3/index.html:1483` | data-nav | C2 · Grounding vs tuning | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:417 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1484` | apxstub | C2 &middot; Grounding Compared With Fine-Tuning | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1486 (h2, SOURCE); /home/user/BUS-ADM-X433.4-AI-Found… |
| `session-3/index.html:1486` | h2 | Grounding Compared With Fine-Tuning | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1251 (apxcard); /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-3/index.html:1496` | h4 | Ranking by Cost of a Change | DESCRIPTIVE | NONE (grep -rnF returned only this line) |
| `session-3/index.html:1508` | data-nav | Workflow | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:418 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1510` | h2 | The Advisor Meeting Workflow and Its Failure Propagation | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1799 (APXBUDGET row); GENERATOR: /home/user/BUS-ADM-X… |
| `session-3/index.html:1518` | h4 | Failure Injection into Meg's Annual Review | DESCRIPTIVE | NONE (grep -rnF 'Failure Injection into Meg' returned only this line) |
| `session-3/index.html:1530` | data-nav | Note-takers | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:419 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1532` | h2 | Note-Taker Architecture and the Extraction Step | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1800 (APXBUDGET row); GENERATOR: /home/user/BUS-ADM-X… |
| `session-3/index.html:1542` | h4 | Note Writing and the Extraction Score | DESCRIPTIVE | NONE (grep -rnF returned only this line) |
| `session-3/index.html:1564` | data-nav | C3 · Adoption | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:420 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1565` | apxstub | C3 &middot; Note-Taker Adoption Against Note-Taker Satisfaction | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1567 (h2, SOURCE); /home/user/BUS-ADM-X433.4-AI-Found… |
| `session-3/index.html:1567` | h2 | Note-Taker Adoption Against Note-Taker Satisfaction | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1252 (apxcard); /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-3/index.html:1575` | h4 | Prediction, Then Reveal | DESCRIPTIVE | NONE (grep -rnF returned only this line) |
| `session-3/index.html:1590` | data-nav | Consent | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:421 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1592` | h2 | Recording Consent and the Confidentiality Obligation | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1801 (APXBUDGET row); GENERATOR: /home/user/BUS-ADM-X… |
| `session-3/index.html:1618` | h4 | Three-way sort: what goes into the tool | DESCRIPTIVE | NONE (grep -rnF returned only this line) |
| `session-3/index.html:1630` | data-nav | Basis | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:422 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1632` | h2 | Documenting the Basis for a Recommendation | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1802 (APXBUDGET row); GENERATOR: /home/user/BUS-ADM-X… |
| `session-3/index.html:1642` | h4 | Part A: the decision · Part B: the evidence | DESCRIPTIVE | NONE (grep -rnF 'Part A: the decision' returned only this line) |
| `session-3/index.html:1694` | data-nav | Policy HW | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:423 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1696` | h2 | The AI Usage Policy Assignment | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1803 (APXBUDGET row); GENERATOR: /home/user/BUS-ADM-X… |
| `session-3/index.html:1704` | h4 | Your Citation Set for the Policy Assignment | DESCRIPTIVE | NONE (grep -rnF returned only this line) |
| `session-3/index.html:1718` | data-nav | C4 · Discussion | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:424 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1719` | apxstub | C4 &middot; Citation-Backed Output and Verification Effort | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1721 (h2, SOURCE); /home/user/BUS-ADM-X433.4-AI-Found… |
| `session-3/index.html:1721` | h2 | Citation-Backed Output and Verification Effort | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1253 (apxcard); /home/user/BUS-ADM-X433.4-AI-Foundati… |
| `session-3/index.html:1731` | h4 | Vote one | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1734 (mpanel hd label); /home/user/BUS-ADM-X433.4-AI-… |
| `session-3/index.html:1746` | data-nav | Part 1 + handoff | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/repo-updates-plan.md:425 (section table, exact label); /home/user/BUS… |
| `session-3/index.html:1748` | h2 | Part 1 Draft Peer Exchange | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1804 (APXBUDGET row); GENERATOR: /home/user/BUS-ADM-X… |
| `session-3/index.html:1756` | h4 | Peer exchange on the draft outlines | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/editorial-gap-report.md:971 |
| `session-3/index.html:1767` | h4 | AI usage policy for your firm | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:1698 (body prose, same wording inside an imperative s… |
| `session-3/index.html:1768` | h4 | Final Project Part 1 — handoff package | DESCRIPTIVE | NONE for the full string. Partial ('Final Project Part 1'): /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/scripts/build-… |
| `session-3/index.html:1769` | h4 | Daly (2026) · SEC FY2026 Exam Priorities §VII · Journal of Accountancy (2025) | DESCRIPTIVE | NONE (grep -rnF 'Daly (2026) · SEC FY2026 Exam Priorities' returned only this line) |
| `session-3/index.html:1787` | h3 | Instructor minute budget | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2148; /home/user/BUS-ADM-X433.4-AI-Foundations-for-Fi… |
| `session-3/index.html:1817` | h4 | Sources cited in this session | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-1/index.html:2180 (same text but as an <h3> with different inline … |
| `session-3/index.html:1933` | js-string | Illustrative meaning space — Cole document vocabulary (2D projection) | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/docs/editorial-gap-report.md:520 (recorded with a rendered em dash: 'Illus… |
| `session-3/index.html:2172` | js-string | Top-20-chunk retrieval failure rate by configuration | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:2156 (aria-label) and :2157 (chartttl) both consume i… |
| `session-3/index.html:2178` | js-string | Measured error rates across four grounding conditions | DESCRIPTIVE | /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/session-3/index.html:2156 (aria-label) and :2157 (chartttl) both consume i… |
| `session-3/index.html:2189` | js-string | Adoption rank against satisfaction rank | DESCRIPTIVE | NONE (grep -rnF returned only this line). Related: the section h2 at /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/sessi… |
| `session-4/index.html:6` | title | Session 4 — Compliance, Security and Responsible Use | DESCRIPTIVE | CHANGELOG.md:767, CHANGELOG.md:804, changelog/index.html:614, changelog/index.html:627 (all four carry the identical full string 'Session 4 — Compl… |
| `session-4/index.html:716` | h2 | The Cole Household | DESCRIPTIVE | index.html:530, session-1/index.html:839, session-2/index.html:729, session-3/index.html:697 (byte-identical injected case block); CASE.md:1 ('# CA… |
| `session-4/index.html:1176` | js-string | '<title>The Cole Household — case facts</title><style>'+css+ | DESCRIPTIVE | index.html:990, session-0.1/index.html:1015, session-1/index.html:1299, session-2/index.html:1189, session-3/index.html:1157, scripts/inject-case.m… |
| `session-4/index.html:1182` | js-string | '<h2 style="margin-bottom:6px">The Cole Household</h2>'+ | DESCRIPTIVE | index.html:996, session-0.1/index.html:1021, session-1/index.html:1305, session-2/index.html:1195, session-3/index.html:1163, scripts/inject-case.m… |
| `session-4/index.html:1218` | data-nav | Frame | DESCRIPTIVE | docs/repo-updates-plan.md:431, docs/repo-updates-plan.md:506, docs/editorial-gap-report.md:1451. (Excluded as coincidental substring, not readers o… |
| `session-4/index.html:1220` | h1 | Compliance, Security and Responsible Use | DESCRIPTIVE | session-4/index.html:6 (<title>), session-4/index.html:1987 (footer budget row), index.html:1086 (course hub card h3), README.md:86 (session table)… |
| `session-4/index.html:1236` | h3 | Retrieval bridge &mdash; Session 3 | DESCRIPTIVE | NONE |
| `session-4/index.html:1241` | h3 | The case, one more time | DESCRIPTIVE | NONE |
| `session-4/index.html:1243` | h4 | The Cole household &mdash; synthetic, Barrington Hills and Rockford, Illinois | DESCRIPTIVE | NONE |
| `session-4/index.html:1252` | h4 | The question that runs through every session | DESCRIPTIVE | session-4/index.html:1036 (same-file case-spine-h), index.html:850, session-0.1/index.html:875, session-1/index.html:1159, session-1/index.html:142… |
| `session-4/index.html:1259` | h4 | A field-level disclosure boundary | DESCRIPTIVE | NONE |
| `session-4/index.html:1260` | h4 | A defensible vendor decision | DESCRIPTIVE | NONE |
| `session-4/index.html:1261` | h4 | A priced verification burden | DESCRIPTIVE | NONE |
| `session-4/index.html:1271` | data-nav | Appendix contents | DESCRIPTIVE | session-4/index.html:1273 (same-file h2), session-1/index.html:1437, session-2/index.html:1306, session-3/index.html:1243, scripts/build-appendix.m… |
| `session-4/index.html:1273` | h2 | Appendix contents | DESCRIPTIVE | session-4/index.html:1271 (same-file data-nav), session-1/index.html:1439, session-2/index.html:1308, session-3/index.html:1245, scripts/build-appe… |
| `session-4/index.html:1277` | apxcard | The Thirty-Day Clock: A Regulation S-P Tabletop | DESCRIPTIVE | session-4/index.html:1376 (APXSTUB), session-4/index.html:1378 (h2), session-4/index.html:2000 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1278` | apxcard | Content Provenance and the SynthID Watermark | DESCRIPTIVE | session-4/index.html:1533 (APXSTUB), session-4/index.html:1535 (h2), session-4/index.html:2001 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1279` | apxcard | Entropy, Regeneration and the Limits of Watermarking | DESCRIPTIVE | session-4/index.html:1597 (APXSTUB), session-4/index.html:1599 (h2), session-4/index.html:2002 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1280` | apxcard | Where the Assigned Reading Has Gone Stale | **ACTION/ASSERTION** | session-4/index.html:1728 (APXSTUB), session-4/index.html:1730 (h2), session-4/index.html:2003 (footer budget row), audit/AUDIT-2026-08-20.md:190, … |
| `session-4/index.html:1281` | apxcard | Discussion: Whether the Logging Burden Costs More Than the Tool Saves | **ACTION/ASSERTION** | session-4/index.html:1910 (APXSTUB), session-4/index.html:1912 (h2), session-4/index.html:2004 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1286` | data-nav | Cold open | DESCRIPTIVE | session-4/index.html:1287 (eyebrow 'Cold open &middot; standing ritual'), session-4/index.html:1988 (footer budget row label), instructor-notes/ses… |
| `session-4/index.html:1288` | h2 | The Last Prompt You Sent | DESCRIPTIVE | session-4/index.html:1988 (footer budget row), session-1/index.html:1457, session-1/index.html:2154, session-2/index.html:1395, session-2/index.htm… |
| `session-4/index.html:1303` | data-nav | No rulebook | DESCRIPTIVE | docs/repo-updates-plan.md:433, docs/editorial-gap-report.md:1453. |
| `session-4/index.html:1305` | h2 | The Absence of an AI Rulebook and the Duties That Apply Instead | DESCRIPTIVE | session-4/index.html:1989 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1314` | h3 | Sorting exercise | DESCRIPTIVE | NONE |
| `session-4/index.html:1320` | h4 | Binding rule that names AI | DESCRIPTIVE | NONE |
| `session-4/index.html:1321` | h4 | Pre-existing duty applied to AI | DESCRIPTIVE | NONE |
| `session-4/index.html:1322` | h4 | Supervisory expectation, not a rule | DESCRIPTIVE | NONE |
| `session-4/index.html:1334` | data-nav | NPI | DESCRIPTIVE | docs/repo-updates-plan.md:434, docs/editorial-gap-report.md:1454. (All other repo hits for the string 'NPI' — session-4/index.html:1342, 1343, 1347… |
| `session-4/index.html:1336` | h2 | Nonpublic Personal Information Under Regulation S-P | DESCRIPTIVE | session-4/index.html:1990 (footer budget row), audit/AUDIT-2026-08-23.md:187. |
| `session-4/index.html:1342` | h4 | PII and NPI are not the same term | **ACTION/ASSERTION** | NONE |
| `session-4/index.html:1375` | data-nav | D5 &middot; The 30-day clock | DESCRIPTIVE | docs/repo-updates-plan.md:435 and docs/editorial-gap-report.md:2238 both carry the decoded form 'D5 · The 30-day clock'. Exact-entity grep returns … |
| `session-4/index.html:1376` | apxstub | D5 &middot; The Thirty-Day Clock: A Regulation S-P Tabletop | DESCRIPTIVE | session-4/index.html:1277 (apxcard, without the 'D5 &middot; ' prefix), session-4/index.html:1378 (h2), session-4/index.html:2000 (footer budget ro… |
| `session-4/index.html:1378` | h2 | The Thirty-Day Clock: A Regulation S-P Tabletop | DESCRIPTIVE | session-4/index.html:1277, session-4/index.html:1376, session-4/index.html:2000. Outside the file: NONE. |
| `session-4/index.html:1386` | h4 | The Event That Started the Clock | DESCRIPTIVE | NONE |
| `session-4/index.html:1399` | data-nav | Tiers | DESCRIPTIVE | docs/repo-updates-plan.md:436, docs/repo-updates-plan.md:512, docs/editorial-gap-report.md:1455, docs/gemini-live-api-feasibility.md:345 (refers to… |
| `session-4/index.html:1401` | h2 | Consumer, Professional and Enterprise Tiers: What Changes in the Contract | DESCRIPTIVE | session-4/index.html:1991 (footer budget row), docs/gemini-live-api-feasibility.md:114 (quotes the 'Enterprise Tiers' fragment). |
| `session-4/index.html:1421` | h3 | The leaderboard and the contract are different maps | **ACTION/ASSERTION** | NONE |
| `session-4/index.html:1437` | h3 | Sticker Rank Against Cost-per-Task Rank | DESCRIPTIVE | NONE |
| `session-4/index.html:1455` | data-nav | Vendors | DESCRIPTIVE | docs/repo-updates-plan.md:437, docs/editorial-gap-report.md:1456. (session-4/index.html:1749 and docs/editorial-gap-report.md:1025 use the word 'Ve… |
| `session-4/index.html:1457` | h2 | Vendor Due Diligence Against the Cole Document Set | DESCRIPTIVE | session-4/index.html:1992 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1463` | h4 | Step one &mdash; what goes in | DESCRIPTIVE | NONE |
| `session-4/index.html:1470` | h4 | Step two &mdash; the six questions | DESCRIPTIVE | NONE |
| `session-4/index.html:1484` | data-nav | Attacks | DESCRIPTIVE | docs/repo-updates-plan.md:438, docs/editorial-gap-report.md:1457. |
| `session-4/index.html:1486` | h2 | Prompt Injection, Data Exfiltration, Deepfakes and Model-Assisted Malware | DESCRIPTIVE | session-4/index.html:1993 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1502` | h3 | A Standing Instruction That Survives Injection | DESCRIPTIVE | NONE |
| `session-4/index.html:1513` | h3 | Deepfakes: one hard number and a pile of soft ones | DESCRIPTIVE | NONE |
| `session-4/index.html:1532` | data-nav | D1 · Provenance | DESCRIPTIVE | docs/repo-updates-plan.md:439, docs/repo-updates-plan.md:513. |
| `session-4/index.html:1533` | apxstub | D1 &middot; Content Provenance and the SynthID Watermark | DESCRIPTIVE | session-4/index.html:1278 (apxcard, no 'D1 &middot; ' prefix), session-4/index.html:1535 (h2), session-4/index.html:2001 (footer budget row). Outsi… |
| `session-4/index.html:1535` | h2 | Content Provenance and the SynthID Watermark | DESCRIPTIVE | session-4/index.html:1278, session-4/index.html:1533, session-4/index.html:2001. Outside the file: NONE. |
| `session-4/index.html:1541` | h4 | A correction to the common framing | DESCRIPTIVE | NONE |
| `session-4/index.html:1545` | h3 | The asymmetry that governs everything else | DESCRIPTIVE | NONE |
| `session-4/index.html:1550` | h3 | Text: tournament sampling | DESCRIPTIVE | NONE |
| `session-4/index.html:1554` | h4 | Tournament sampling, one token | DESCRIPTIVE | NONE |
| `session-4/index.html:1568` | h3 | Images and video: perturbation below the perceptual floor | DESCRIPTIVE | NONE |
| `session-4/index.html:1572` | h4 | Perturbation amplifier | DESCRIPTIVE | session-4/index.html:2922 (JS fallback string 'Perturbation amplifier unavailable in this view.'). Outside the file: NONE. |
| `session-4/index.html:1582` | h3 | Audio: hiding in the frequencies you cannot hear | DESCRIPTIVE | NONE |
| `session-4/index.html:1585` | h3 | Scale: a figure worth not repeating | **ACTION/ASSERTION** | NONE |
| `session-4/index.html:1596` | data-nav | D2 · Watermark limits | DESCRIPTIVE | docs/repo-updates-plan.md:440. |
| `session-4/index.html:1597` | apxstub | D2 &middot; Entropy, Regeneration and the Limits of Watermarking | DESCRIPTIVE | session-4/index.html:1279 (apxcard, no prefix), session-4/index.html:1599 (h2), session-4/index.html:2002 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1599` | h2 | Entropy, Regeneration and the Limits of Watermarking | DESCRIPTIVE | session-4/index.html:1279, session-4/index.html:1597, session-4/index.html:2002. Outside the file: NONE. |
| `session-4/index.html:1604` | h3 | The advisor's inversion | DESCRIPTIVE | NONE |
| `session-4/index.html:1608` | h4 | Entropy and watermarkability by output type | DESCRIPTIVE | NONE |
| `session-4/index.html:1612` | h4 | High entropy &mdash; watermarks well | **ACTION/ASSERTION** | NONE |
| `session-4/index.html:1613` | h4 | Low entropy &mdash; watermarks poorly | **ACTION/ASSERTION** | NONE |
| `session-4/index.html:1621` | h3 | Regeneration | DESCRIPTIVE | NONE as a standalone title. (The word also appears inside the longer appendix title at session-4/index.html:1279, 1597, 1599, 2002, but those are r… |
| `session-4/index.html:1628` | h3 | What a signal licenses you to conclude | **ACTION/ASSERTION** | NONE |
| `session-4/index.html:1645` | data-nav | Leaks | DESCRIPTIVE | docs/repo-updates-plan.md:441, docs/editorial-gap-report.md:1458. |
| `session-4/index.html:1647` | h2 | Where the Leaks Happen: Logs, Caches, Connectors and Features Nobody Turned Off | **ACTION/ASSERTION** | session-4/index.html:1994 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1653` | h4 | Annual exposure-event estimator | DESCRIPTIVE | NONE |
| `session-4/index.html:1667` | data-nav | What it costs | **ACTION/ASSERTION** | docs/repo-updates-plan.md:442, docs/repo-updates-plan.md:515. NOTE: docs/editorial-gap-report.md:1459 labels this same section 's7 Verification bur… |
| `session-4/index.html:1669` | h2 | Hallucination Rates and the Verification Burden | DESCRIPTIVE | session-4/index.html:1995 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1684` | h4 | A measurement you cannot put on the same axis | DESCRIPTIVE | NONE |
| `session-4/index.html:1688` | h3 | The arithmetic of not checking | DESCRIPTIVE | NONE |
| `session-4/index.html:1710` | h3 | Pricing it against your own baseline | **ACTION/ASSERTION** | NONE |
| `session-4/index.html:1727` | data-nav | D3 · Source staleness | DESCRIPTIVE | docs/repo-updates-plan.md:443, docs/repo-updates-plan.md:516, docs/editorial-gap-report.md:542. |
| `session-4/index.html:1728` | apxstub | D3 &middot; Where the Assigned Reading Has Gone Stale | **ACTION/ASSERTION** | session-4/index.html:1280 (apxcard, no prefix), session-4/index.html:1730 (h2), session-4/index.html:2003 (footer budget row), audit/AUDIT-2026-08-… |
| `session-4/index.html:1730` | h2 | Where the Assigned Reading Has Gone Stale | **ACTION/ASSERTION** | session-4/index.html:1280, session-4/index.html:1728, session-4/index.html:2003, audit/AUDIT-2026-08-20.md:190, docs/editorial-gap-report.md:529, d… |
| `session-4/index.html:1734` | h3 | Where the hallucination rate comes from, in one mechanism | **ACTION/ASSERTION** | NONE |
| `session-4/index.html:1737` | h3 | Commit first | **ACTION/ASSERTION** | NONE |
| `session-4/index.html:1743` | h3 | Three claims that have gone stale | DESCRIPTIVE | NONE |
| `session-4/index.html:1760` | data-nav | Audit trail | DESCRIPTIVE | docs/repo-updates-plan.md:444, docs/editorial-gap-report.md:1460. |
| `session-4/index.html:1762` | h2 | Audit Trails for the Artifacts You Already Built | DESCRIPTIVE | session-4/index.html:1996 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1781` | h4 | Fallback artifacts &mdash; if you missed Session 2 or Session 3 | DESCRIPTIVE | NONE |
| `session-4/index.html:1811` | h3 | Classification exercise | DESCRIPTIVE | NONE |
| `session-4/index.html:1818` | h3 | A prompt block that produces the record | DESCRIPTIVE | NONE |
| `session-4/index.html:1846` | data-nav | Pairings | DESCRIPTIVE | docs/repo-updates-plan.md:445. NOTE: docs/editorial-gap-report.md:1461 labels this section 's10 Relay' — a STALE label that does not match the curr… |
| `session-4/index.html:1848` | h2 | Part 1 Relay and the Part 2 Pairing Draw | DESCRIPTIVE | session-4/index.html:1997 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1863` | h3 | Package Completeness Before the Draw | DESCRIPTIVE | NONE |
| `session-4/index.html:1882` | data-nav | Cold first run | DESCRIPTIVE | docs/repo-updates-plan.md:446, docs/editorial-gap-report.md:1462. |
| `session-4/index.html:1884` | h2 | Cold First Run of the Package You Were Just Assigned | DESCRIPTIVE | session-4/index.html:1998 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1892` | h4 | Stuck log | DESCRIPTIVE | NONE |
| `session-4/index.html:1909` | data-nav | D4 · Discussion | DESCRIPTIVE | instructor-notes/session-4.md:8 ('## sD (D4 · Discussion)'), docs/repo-updates-plan.md:447. |
| `session-4/index.html:1910` | apxstub | D4 &middot; Discussion: Whether the Logging Burden Costs More Than the Tool Saves | **ACTION/ASSERTION** | session-4/index.html:1281 (apxcard, no 'D4 &middot; ' prefix), session-4/index.html:1912 (h2), session-4/index.html:2004 (footer budget row). Outsi… |
| `session-4/index.html:1912` | h2 | Discussion: Whether the Logging Burden Costs More Than the Tool Saves | **ACTION/ASSERTION** | session-4/index.html:1281, session-4/index.html:1910, session-4/index.html:2004. Outside the file: NONE. |
| `session-4/index.html:1918` | h4 | Phase 1 &mdash; commit, 3 minutes | DESCRIPTIVE | NONE |
| `session-4/index.html:1935` | h4 | Phase 4 &mdash; re-vote | DESCRIPTIVE | NONE |
| `session-4/index.html:1948` | data-nav | Policy homework | DESCRIPTIVE | docs/repo-updates-plan.md:448, docs/repo-updates-plan.md:1339, docs/editorial-gap-report.md:1463. |
| `session-4/index.html:1950` | h2 | Homework: The Firm Artificial Intelligence Use Policy | DESCRIPTIVE | session-4/index.html:1999 (footer budget row). Outside the file: NONE. |
| `session-4/index.html:1964` | h3 | Peer review, not tonight | DESCRIPTIVE | NONE |
| `session-4/index.html:1982` | h3 | Instructor minute budget | DESCRIPTIVE | session-1/index.html:2148, session-2/index.html:2008, session-3/index.html:1787 (byte-identical footer heading), docs/repo-updates-plan.md:1712 (qu… |
| `session-4/index.html:1987` | contents-entry | Compliance, Security and Responsible Use | DESCRIPTIVE | session-4/index.html:6, session-4/index.html:1220, index.html:1086, README.md:86, instructor-notes/session-4.md:1, CHANGELOG.md:767, CHANGELOG.md:8… |
| `session-4/index.html:1988` | contents-entry | The Last Prompt You Sent | DESCRIPTIVE | session-4/index.html:1288, session-1/index.html:1457, session-1/index.html:2154, session-2/index.html:1395, session-2/index.html:2014, session-3/in… |
| `session-4/index.html:1989` | contents-entry | The Absence of an AI Rulebook and the Duties That Apply Instead | DESCRIPTIVE | session-4/index.html:1305. |
| `session-4/index.html:1990` | contents-entry | Nonpublic Personal Information Under Regulation S-P | DESCRIPTIVE | session-4/index.html:1336, audit/AUDIT-2026-08-23.md:187. |
| `session-4/index.html:1991` | contents-entry | Consumer, Professional and Enterprise Tiers: What Changes in the Contract | DESCRIPTIVE | session-4/index.html:1401, docs/gemini-live-api-feasibility.md:114 (partial quote). |
| `session-4/index.html:1992` | contents-entry | Vendor Due Diligence Against the Cole Document Set | DESCRIPTIVE | session-4/index.html:1457. |
| `session-4/index.html:1993` | contents-entry | Prompt Injection, Data Exfiltration, Deepfakes and Model-Assisted Malware | DESCRIPTIVE | session-4/index.html:1486. |
| `session-4/index.html:1994` | contents-entry | Where the Leaks Happen: Logs, Caches, Connectors and Features Nobody Turned Off | **ACTION/ASSERTION** | session-4/index.html:1647. |
| `session-4/index.html:1995` | contents-entry | Hallucination Rates and the Verification Burden | DESCRIPTIVE | session-4/index.html:1669. |
| `session-4/index.html:1996` | contents-entry | Audit Trails for the Artifacts You Already Built | DESCRIPTIVE | session-4/index.html:1762. |
| `session-4/index.html:1997` | contents-entry | Part 1 Relay and the Part 2 Pairing Draw | DESCRIPTIVE | session-4/index.html:1848. |
| `session-4/index.html:1998` | contents-entry | Cold First Run of the Package You Were Just Assigned | DESCRIPTIVE | session-4/index.html:1884. |
| `session-4/index.html:1999` | contents-entry | Homework: The Firm Artificial Intelligence Use Policy | DESCRIPTIVE | session-4/index.html:1950. |
| `session-4/index.html:2000` | contents-entry | The Thirty-Day Clock: A Regulation S-P Tabletop | DESCRIPTIVE | session-4/index.html:1277, session-4/index.html:1376, session-4/index.html:1378. |
| `session-4/index.html:2001` | contents-entry | Content Provenance and the SynthID Watermark | DESCRIPTIVE | session-4/index.html:1278, session-4/index.html:1533, session-4/index.html:1535. |
| `session-4/index.html:2002` | contents-entry | Entropy, Regeneration and the Limits of Watermarking | DESCRIPTIVE | session-4/index.html:1279, session-4/index.html:1597, session-4/index.html:1599. |
| `session-4/index.html:2003` | contents-entry | Where the Assigned Reading Has Gone Stale | **ACTION/ASSERTION** | session-4/index.html:1280, session-4/index.html:1728, session-4/index.html:1730, audit/AUDIT-2026-08-20.md:190, docs/editorial-gap-report.md:529, d… |
| `session-4/index.html:2004` | contents-entry | Discussion: Whether the Logging Burden Costs More Than the Tool Saves | **ACTION/ASSERTION** | session-4/index.html:1281, session-4/index.html:1910, session-4/index.html:1912. |
| `session-4/index.html:2012` | h3 | Sources | DESCRIPTIVE | session-2/index.html:2036 (h4 'Sources'). Near-variants, not exact: session-1/index.html:2180 and session-3/index.html:1817 use 'Sources cited in t… |
| `session-4/index.html:2349` | js-string | var h='<h4 style="margin-bottom:8px">'+esc(v.q)+' <span class="dim" style="font-family:JetBrains Mono,monospac | **ACTION/ASSERTION** | NONE (the identical template shape also occurs at session-4/index.html:3170 but with no weight span; no other file matches). |
| `session-4/index.html:3170` | js-string | var h='<h4 style="margin-bottom:8px">'+esc(v.q)+'</h4><div class="row">'; | **ACTION/ASSERTION** | NONE (only session-4/index.html:2349 shares the template shape). |
