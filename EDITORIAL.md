# Editorial rules

**This file is publicly served, like everything else in the repository —
as raw markdown, not as a rendered page.** `.nojekyll` tells GitHub Pages to
serve files as-is, so a reader who follows a link here gets the source text.

Audience: anyone writing or reviewing student-facing prose in this course —
`index.html`, the five lesson files, and the generators that write into them.
Students and instructors browsing the course want [README.md](README.md);
maintainers want [MAINTAINING.md](MAINTAINING.md).

**Status.** The rules below are ratified except where a decision is marked
`[OPEN]`. No checker exists yet. Nothing here has been applied to any lesson.

## Naming, and it is not negotiable

The rules are in this file, `EDITORIAL.md`. Their future checker is
`scripts/verify-editorial.mjs`.

`scripts/verify-style.mjs` already exists and checks the **managed CSS fence**.
It has nothing to do with prose. **Never use the word *style* for an editorial
rule** — not in a filename, a heading, a variable name, or a sentence. For how
prose reads, the word is **register**.

## What this document is built on

The measurement pass is [`docs/editorial-gap-report.md`](docs/editorial-gap-report.md).
Rules cite it by section. It is not restated here.

The report was assembled from parallel passes and does not fully reconcile against
itself. Four figures this document relies on normatively (RC-1 to RC-4) were re-derived before any
rule was written. Where the re-derivation and the report disagree, **the figure
below governs**.

| | Re-derived | Report says | Verdict |
|---|---|---|---|
| **RC-1** Wolfram references already carrying a valid section-level citation | **11 lines**: hub 0, S0.1 0, S1 2, S2 4, S3 5, S4 0 | §2.2 "nine" with a ten-row table; §2.3 "11" | **11.** §2.2's prose is wrong twice — against its own table and against disk |
| **RC-2** Wolfram named mentions per file | **lines 1 / 1 / 20 / 14 / 12 / 12**; occurrences 1 / 1 / 29 / 22 / 24 / 17 | §2.1 says 1/1/20/14/12/12 (lines, correct); §9.2 concern #4 says 1/1/20/16/16/13 | **§2.1 is right, §9.2 is wrong.** §9.2's figures match neither scope |
| **RC-3** Exemption-class counts | Class A **0**; Class A2 **28** (22 em + 6 en, four captured strings); Class B **9 per file × 6 = 54**; Class C `IRC §§ 671–679` **12**; Class D 22 `.apxback` + 4 nav labels + 12 placeholder cells | §1.7 Class B "9 × 6 = 54" ✓; §1.3's injected column says 8; §1.7 says `IRC §§ 671–679` ×13 | **§1.7's 54 is right** — §1.3 misses the `&#8212;` at `session-1:1118`, which is inside the sentinels, not in the swept stylesheet as §1.2 claims. **`IRC §§ 671–679` is 12, not 13** |
| **RC-4** Appendix index cards | Reproduced exactly, all four lessons | §10.1 | **§10.1 is correct in every cell.** `session-3 #sHY` and `session-4 #sRSP` confirmed at **zero** inbound `href` |

### Known-stale evidence — build no rule on these

Three report sections are defective. None feeds a rule in this document, and none
may be cited by a future one until it is re-derived.

| Section | Defect |
|---|---|
| **§5** complexity rubric | §5.5 states 62 sections / 58 content. Its own enumeration (12 + 19 + 17 + 19 + 19) gives **86 / 82**, corroborated by §10.1. The rubric is **not approved** (D13) and nothing here depends on it |
| **§6** mechanism-against-application split | §6.1’s normalised table contradicts the detail blocks it embeds — session-0.1 is given a 31 per cent mechanism share in the table and 62 per cent in its own detail; three of the four `<details>` blocks are truncated mid-table. *(Spelled out, not written as a numeral with a per-cent sign: the retired valuation discount was a percentage of exactly this value, `verify-migration.mjs` check 1 matches it lexically, and this file is deliberately NOT in that check’s register list. Do not "fix" it back to a numeral.)* |
| **§7** prose density | Words ÷ minutes fails to recompute in 7 of 13 rows of §7.4 (e.g. `session-4` `s3`: 732 / 5 = 146.4, printed 143). §7.3's core-to-appendix ratio is stated as 1.25–2.0× where §7.2's own figures give 1.55–2.59×. The band stays unratified (D15) |

Two smaller report defects worth recording so nobody propagates them: the essay's
section count is given as 20 in §2.3's prose and 17 in the locked list below — **17
is correct**; and `.apxback` is counted as 21 in §8 and 22 in §1.4 — **22 is
correct** (7 / 5 / 5 / 5).
---

# Region classification — the constraint that governs every rule

**Every rule in Part A names the regions it inspects. A rule that does not name
its regions is not a rule, it is a bug waiting to be filed.**

This is not a preference. Every raw measurement in the report that looked alarming
turned out to be something else once classified: 1,239 hits for `color` were CSS
properties; 110 literal em dashes in session 3 were the original author's
convention; the seven `[UNVERIFIED, needs source]` markers in session 0.1 were
deliberate. A rule expressed per character will be wrong. A rule expressed per
region class will be right.

The precedent is already in the repo. `verify-migration.mjs` check 20 slices out
the `CASE:BEGIN` / `CASE:END` span and asserts only on what remains. Generalise
that into one shared classifier and give every rule its population.

## The eleven regions

| # | Region | How it is identified | Default disposition |
|---|---|---|---|
| R1 | **Body prose** | what survives after every other region is removed | the population for most rules |
| R2 | **Script string literal** | inside `<script>`, within a quoted literal that reaches the DOM | student-visible; in scope for register rules, out of scope for markup rules |
| R3 | **Attribute value** | inside a tag | out of scope unless a rule names it (e.g. `data-tier`) |
| R4 | **CSS** | inside `<style>`, including the managed fence | **never** in scope. Owned by `verify-style.mjs` |
| R5 | **HTML or JS comment** | `<!-- … -->`, `/* … */`, `// …` | out of scope, except where a comment declares a convention (see A16) |
| R6 | **Injected span** | between `<!-- CASE:BEGIN … -->` and `<!-- CASE:END … -->` | **read, never assert.** Owned by `verify-case.mjs` |
| R7 | **Footer source entry** | `<li id="src-…">` | in scope for citation rules only |
| R8 | **Source note** | `<span class="src">`, `<p class="src">`, `<div class="csrc">` | in scope for citation rules |
| R9 | **Assigned-reading block** | `<div class="wolf">` | in scope for quotation and citation rules |
| R10 | **Captured transcript** | the four `base:` fields in session 0.1's `PROBE` array | **never** in scope. Verbatim third-party output |
| R11 | **Byte-shared boilerplate** | the cold-open `.ritual` block, `.apxback` furniture, the shared close block, and the `LM:` / `LMBOX:` / `LMSTYLE:` console fences | excluded from per-file consistency rules (see A8) |

**R11 exists because of a collision.** Decision D2 asks for form consistency
*within* a file. Decision D3b protects the 22 entity dashes that have crept into
session 3. Taken literally those two cancel: session 3 is 110 literal against 22
entity, which is 83% and not "consistent" under any threshold, and the rule would
demand exactly the change D3b forbids.

The resolution is to fix the population, not the threshold. Excluding R11 —
because those blocks arrived from sibling files and their form is not session 3's
authorial choice — the picture is clean:

| File | Literal `—` | `&mdash;` | Majority form | Minority share |
|---|---|---|---|---|
| `session-0.1` | 0 | 11 | entity | 0% |
| `session-1` | 1 | 87 | entity | 1% |
| `session-2` | 2 | 69 | entity | 3% |
| `session-3` | **94** | 15 | **literal** | 14% |
| `session-4` | 1 | 84 | entity | 1% |

That table is the **declared baseline**, and A8 ratchets against it rather than
against a universal threshold.

## authoredProse — the population, defined once

This population has been under-specified three separate times: R8 and R9 dropped
by a literal reading of "R2–R11 removed", R11 absent from the declared table, and
A9's region line never naming R11 at all. It is therefore named once, here, and
every rule that uses it cites the name and restates no region list.

> **`authoredProse` = `mask(R1, R8, R9)`, which by construction excludes R11 and
> every other region, and therefore excludes the exempt classes that live in
> them.**

Source notes (R8) and reading blocks (R9) are **in**; footer entries (R7),
attribute values (R3), script (R2), CSS (R4), comments (R5), the injected span
(R6), captured transcripts (R10) and byte-shared boilerplate (R11) are **out**.
Defined in code as `authoredProse()` in `scripts/editorial-regions.mjs`.

**A8 and A9 run on `authoredProse`. A10 does not, and the difference is
deliberate** — a quotation guard has to reach footer entries and script literals,
so A10 keeps its own wider population of R1, R2, R7, R8, R9.

**The R11 figures for `session-0.1` and `session-1` in the table above predate the
console fences entering R11.** The R11-complete figures are **0 / 7** and
**1 / 83**. A8 is unaffected — both files' majority form is already entity and
their minority counts are already 0 and 1 — so the table stands as A8's baseline.
A9, which ratchets the total, uses the R11-complete figures.
---

# The em-dash exemption register

Ratified as decision **D4**: all four classes adopted as written. Reproduced from
`docs/editorial-gap-report.md` §1.4 without alteration, then extended with the two
classes the report added later (A2 and C2).


**Class A — inside a direct quotation of a cited source. EXEMPT.**
Altering one misquotes the source. This collides directly with the repo's own
never-fabricate standard, and `README.md` states the standard publicly: *"Every
substantive factual claim carries a confidence chip … Where published sources
disagree, both figures are shown rather than averaged or quietly resolved."* A
silent punctuation edit inside quotation marks is the same failure in miniature.
Enumerated in §1.6.

**Class B — generated content. NOT EDITABLE IN A LESSON FILE.** See §1.5.

**Class C — proper names and published titles. EXEMPT.**
`SEC enforcement, 18 March 2024 &mdash; Delphia (USA) Inc. and Global Predictions,
Inc.` (`session-1:2053`); `Persona&ndash;Task&ndash;Context&ndash;Format`
(`session-2:1921`); `Rev. Rul. 85-13, 1985-1 C.B. 184 &mdash; a transfer of
assets…` (`session-2:1932`).

**Class D — structural furniture that is not sentence punctuation. EXEMPT, and
this is the largest exempt class.** Three sub-kinds, all mechanical:
- **Empty-cell placeholder.** `<td class="n">&mdash;</td>` — the dash *is* the
  datum ("no value"), e.g. `session-1:1797`, `session-2:1155`.
- **Navigation label.** `data-nav="— APPENDIX —"` in all four lessons — an
  attribute value, rendered in the nav rail.
- **Appendix return-link furniture.** `<div class="apxback">Insert between §02
  Prediction and §03 Tokens &mdash; <a href="#s2">back to §02</a> …</div>` —
  one per appendix section, 22 across the corpus. The dash is a separator between
  two link groups, not prose.

A policy that does not carve these out will produce 60-plus false positives on its
first run and will be switched off.


**Class A is currently EMPTY, and the rule is written anyway.**
Report §1.6 measured every dash position against quote-mark parity across all six
lesson documents and `CASE.md` and found **zero** dashes between the quote marks of
any attributed quotation. The parity test was separately proved sound: every line
in every file has balanced `"`, `“`/`”` and `&ldquo;`/`&rdquo;`, so no quotation
spans a line break and line-local parity is exact rather than heuristic.

The rule exists as a regression guard. **Do not go looking for instances to
exempt. There are none, and inventing some would be worse than having none.**

**Class A2 — captured transcripts. HARD EXEMPT.**
The four `base:` fields in session 0.1's `PROBE` array carry **28 dashes**
(22 em, 6 en). They are verbatim model output, and the block's own header states
the contract:

> EPISTEMIC CONTRACT, non-negotiable (spec s7.3). These base strings are
> CAPTURED TRANSCRIPTS, extracted programmatically from docs/probe-captures.md
> at build time so they are verbatim by construction rather than by care.

Altering a dash there falsifies a record of what a model actually produced. This
is the never-fabricate collision arriving from a direction item 1 did not
anticipate, and it is the corpus's one genuinely byte-sensitive class. Also exempt
the capturer's spaced-hyphen note at `session-0.1:1979`.

## Class B in detail — where a generated dash actually lives


**Confirmed against the generators.** The span between `<!-- CASE:BEGIN
cole-household v4.0 -->` and `<!-- CASE:END cole-household -->` in all six HTML
files is written by `scripts/inject-case.mjs` and hash-guarded by
`scripts/verify-case.mjs`, which reads the recorded `sha256` after the opening
sentinel and reports three distinct failures — no sentinels, **`block was
hand-edited`**, and *stale against the current build*. So editing a dash inside an
injected region in a lesson file produces a hard `verify-case.mjs` failure and is
overwritten by the next `inject-case.mjs` run.

There are **three** different upstream homes, and the right one depends on which
dash you are fixing:

| Where the dash renders | Real source | How to change it |
|---|---|---|
| Case block prose | `CASE.md` | edit `CASE.md`, run `build-case.mjs` then `inject-case.mjs` |
| The case spine paragraph | **`scripts/inject-case.mjs:57-60`, a JS string literal** | edit the generator |
| The flowchart SVG caption (`Synthetic case — nothing here has been executed…`) | `scripts/case-flowchart.html` | edit the generated fragment's source |

`CASE.md` itself carries **177 literal em dashes** — by a wide margin the largest
single concentration in the repo. Any em-dash policy that reaches student-facing
copy reaches `CASE.md` prose, because that prose renders inside every lesson.

**This is a decision, and it is the one with the widest blast radius in item 1.**
`CASE.md` is a *case document*, not lesson copy — its register is a legal
memorandum and em dashes belong there. My recommendation: **exempt `CASE.md`
wholesale, and exempt the injected regions as a consequence.** The alternative,
bringing 177 dashes in a legal-memorandum register into a no-em-dash policy, buys
consistency in a document nobody reads as prose and costs a rebuild-and-reinject
cycle on every edit.



**Ratified as D5: `CASE.md` is exempt wholesale, and the injected regions are
exempt as a consequence.** §1.8 makes that non-optional.

## Class C2 — CASE.md's parser anchors. EXEMPT unless build-case.mjs changes in the same commit.

**The finding that hardens §1.5: `CASE.md` has load-bearing dashes.**
`build-case.mjs` parses `CASE.md` with regexes that **anchor on em and en dashes**,
and its own header says *"A pattern that no longer matches is a hard failure, not a
warning."*

- **14 em dashes are section-index anchors.** `build-case.mjs:48` matches
  `/^# PART ([A-N]) —/` against every `# PART X — …` heading. Change one and its
  whole section silently merges into the previous key, cascading `grab()` failures.
- **10 em dashes and 1 en dash are figure-extraction anchors** — e.g.
  `/Meg — inherited IRA \(Walter Hensley, decedent\) \| \$([0-9,]+) \|/` at :115, and
  `/2004–present \| ([^,]+), Illinois/` at :95, which uses an **en dash**.
  `build-case.mjs:87` is the sharpest: `/Prior occupation \| — \| ([^|]+?) \|/` —
  that dash is **simultaneously a table empty-cell placeholder and a parser anchor**.

So of `CASE.md`'s 177 em dashes: 9 are inside Part L and injected verbatim into six
lessons, 14 are section-index anchors, 10 are figure anchors, 15 are table
placeholders (one of which is also an anchor), and 25 sit in sub-headings.

**The rule is procedural, not textual.** There is no way to look at a dash in
`CASE.md` and tell whether it is prose or a parser anchor — `build-case.mjs:87`
proves it, because there one dash is both. So:

> **Change a dash in `CASE.md`, then run `node scripts/build-case.mjs` and confirm
> it exits 0 before doing anything else.** A pattern that no longer matches is a
> hard failure, not a warning, and the failure surfaces in the generated artifacts
> rather than in the file you edited.

## Class C in detail

`IRC §§ 671–679` appears **12 times** across the hub and the five lessons (twice
per file), plus 3 more in `CASE.md`. Report §1.7 says 13; 12 is correct.
`Persona&ndash;Task&ndash;Context&ndash;Format` appears once, at `session-2:1921`.

## Class D in detail

| Sub-kind | Count | Where |
|---|---|---|
| Appendix return-link separator | **22** | `.apxback`, 7 / 5 / 5 / 5 across sessions 1–4, one per appendix section |
| Navigation label | **4** | `data-nav="— APPENDIX —"`, one per lesson with an appendix |
| Empty-cell placeholder | **12** | `<td class="n">&mdash;</td>` and `<span class="sv">&mdash;</span>`: 8 in session 1, 1 in session 2, 3 in session 4 |

---

# The Wolfram section list — LOCKED

Seventeen names. Instructor-verified. This is the **closed vocabulary** a citation
rule validates against: a citation naming anything outside this list is an error,
and that is a Part A check (**A11**).

```
It's Just Adding One Word at a Time
Where Do the Probabilities Come From?
What Is a Model?
Models for Human-Like Tasks
Neural Nets
Machine Learning, and the Training of Neural Nets
The Practice and Lore of Neural Net Training
"Surely a Network That's Big Enough Can Do Anything!"
The Concept of Embeddings
Inside ChatGPT
The Training of ChatGPT
Beyond Basic Training
What Really Lets ChatGPT Work?
Meaning Space and Semantic Laws of Motion
Semantic Grammar and the Power of Computational Language
So ... What Is ChatGPT Doing, and Why Does It Work?
Thanks
```

Two matching notes a checker needs, both learned from re-deriving RC-1:

- **Match after normalisation, not on bytes.** The corpus writes these names in at
  least four encodings — `It's`, `It&rsquo;s`, `It’s`; `…`, `&hellip;`,
  `…`; curly and straight double quotes. Normalise apostrophes, quotes and
  ellipses before comparing, or the check misses real citations.
- **`Neural Nets` and `Thanks` are too generic to match bare.** Require them to
  appear inside quotation marks or immediately adjacent to a Wolfram attribution
  before treating them as a section citation.

## Where the eleven existing citations are (RC-1)

Recorded so the checker's first run has a known-good baseline, and because the
distribution is the argument for **D6**.

| File:line | Region | Names cited | Kind |
|---|---|---|---|
| `session-1:1316` | R1 | It's Just Adding One Word at a Time | the lesson's own §02 eyebrow title |
| `session-1:2021` | R1 | It's Just Adding One Word at a Time | footer time-table row repeating that title |
| `session-2:1657` | R8 | The Concept of Embeddings | assigned-reading pointer |
| `session-2:1711` | R8 | It's Just Adding One Word at a Time | chart source note |
| `session-2:1781` | R8 | What Really Lets ChatGPT Work? | chart source note |
| `session-2:1919` | R7 | It's Just Adding One Word at a Time · Where Do the Probabilities Come From? · What Is a Model? | footer entry, "sections used" |
| `session-3:1103` | R8 | The Concept of Embeddings | assigned-reading pointer |
| `session-3:1147` | R8 | The Concept of Embeddings · Meaning Space and Semantic Laws of Motion | source note under §01 |
| `session-3:1175` | R8 | The Concept of Embeddings | source note |
| `session-3:1597` | R8 | Beyond Basic Training | source note, Appendix C2 |
| `session-3:1690` | R7 | The Concept of Embeddings · Meaning Space and Semantic Laws of Motion | footer entry |

**Seven of the eleven are citations attached to a claim** (the R8 rows). Two are
bibliographic (R7). Two are session 1's own furniture — a section title and the
time-table row that repeats it, neither of which cites anything.

**So sessions 1 and 4 carry zero section-level citations attached to any claim**,
between them holding 20 and 12 named mentions and, per report §2.3, 44 and 22
substantive references. That is what D6 is for.

**The mapping in report §2.3 is not approved (D7).** Write the rule; do not apply
the mapping. §2.3's table additionally mis-marks several rows as already-cited
(`session-1:1319`, `session-2:1708`) and mis-marks `session-2:1919` as unmapped
when it names three sections — treat the table above as the record, not §2.3's.
---

# PART A — mechanically checkable

Nineteen rules. Each states what it asserts, the exact thing it counts or matches,
the regions it inspects, its exemptions, whether it blocks a push, and the wording
of the message it emits. **Write `scripts/verify-editorial.mjs` as a transcription
of this section, not as a design exercise.**

Two rules (A12, A13) are ones a script decides most of. Their residue is named
explicitly and lives in Part B. They are not averaged.

| # | Rule | Regions | Verdict | Violated today |
|---|---|---|---|---|
| A1 | Appendix card minutes match their section | R1 | HARD FAIL | **12 cards** |
| A2 | Appendix card count matches appendix section count | R1 | HARD FAIL | **2 lessons** |
| A3 | Appendix eyebrow minute total matches the sections | R1 | HARD FAIL | **3 lessons** |
| A4 | Core lede section count and minutes match the page | R1 | HARD FAIL | **4 lessons** |
| A5 | Every appendix section has an inbound `href` | R1 | HARD FAIL | **2 sections** |
| A6 | `data-tier` present and in the enumeration | R3 | HARD FAIL | clean |
| A7 | The tier filter offers every tier value present | R2, R3 | HARD FAIL | clean |
| A8 | Em-dash form does not drift from the file's baseline | R1 less R11 | HARD FAIL | clean (baseline) |
| A9 | Em-dash count in body prose does not increase | R1 | HARD FAIL | clean (baseline) |
| A10 | No dash inside an attributed quotation | R1, R2, R7, R8, R9 | HARD FAIL | clean (0) |
| A11 | Wolfram section names come from the locked 17 | R1, R7, R8, R9 | HARD FAIL | clean |
| A12 | Every direct Wolfram quotation carries a section name | R1, looking out to R7, R8, R9 | ADVISE | **8** |
| A13 | No off-by-one chip cascade | R1, R2 | HARD FAIL | **2 cascades** |
| A14 | No declared-synthetic key on an external-work claim | R1, R2 | HARD FAIL | **≥2** |
| A15 | Every footer key has a chip or a `data-nochip` reason | R7 | HARD FAIL | **23 keys** |
| A16 | No `UNVERIFIED` / `TODO` / `FIXME` outside its declared register | R1, R2, R7 | HARD FAIL | clean |
| A17 | Every marked vocabulary term has a definition record | R1, R3 | HARD FAIL | not yet built |
| A18 | Every definition is at most two sentences | source file | HARD FAIL | not yet built |
| A19 | Every `read more` resolves to a live footer key | source file | HARD FAIL | not yet built |

---

## The appendix-index rules (A1–A5)

Report §10.1, re-derived as **RC-4**. All five are pure arithmetic against markup
that is already on the page, all five are currently wrong, and **nothing in the
existing gate touches them** — `verify-migration.mjs` check 16 and
`validate_lesson.py` V5 both verify the *footer time table*, which sums correctly
in every lesson and therefore passes.

### A1 — appendix card minutes match their section

**Asserts.** For every `a.apxcard` in `section.apxdiv`, the minute figure in its
`span.ac` equals the `span.mins` of the `section.apx` its `href` fragment names.

**Matches.** `(\d+) min` inside `span.ac`, against `(\d+)` inside the target
section's `.eyebrow span.mins`.

**Regions.** R1 only.

**Exemptions.** None.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A1  session-2/index.html  card #s1 says 10 min, section says 16 min
```

**Currently violated 12 times.** The header of this paragraph previously said 14
while its own enumeration listed 12; 12 is right. Report §10.1's "cards whose
minutes disagree" row of 2 / 4 / 3 / 3 was correct, and so was RC-4's finding
that §10.1 is correct in every cell.

| Lesson | Card | `href` | Card says | Section says |
|---|---|---|---|---|
| `session-1` | A5 | `#s8` | 18 | 16 |
| `session-1` | A7 | `#s14c` | 15 | 17 |
| `session-2` | B1 | `#s1` | 10 | 16 |
| `session-2` | B2 | `#s2` | 8 | 15 |
| `session-2` | B3 | `#s4` | 10 | 16 |
| `session-2` | B4 | `#s9` | 10 | 16 |
| `session-3` | C1 | `#s5` | 12 | 16 |
| `session-3` | C2 | `#s8` | 9 | 14 |
| `session-3` | C3 | `#s11` | 7 | 14 |
| `session-4` | D1 | `#sW1` | 9 | 16 |
| `session-4` | D2 | `#sW2` | 6 | 14 |
| `session-4` | D3 | `#sWS` | 8 | 14 |

### A2 — appendix card count matches appendix section count

**Asserts.** `count(a.apxcard)` equals `count(section.slide.apx)`, and the
eyebrow's "N optional sections" equals both.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A2  session-3/index.html  5 appendix sections, 4 index cards, eyebrow claims 4
          missing card for #sHY
```

**Currently violated in sessions 3 and 4** — `#sHY` and `#sRSP`, 16 minutes each.

### A3 — appendix eyebrow minute total matches the sections

**Asserts.** The `span.mins` on `section.apxdiv` equals the sum of `span.mins`
across every `section.slide.apx`.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A3  session-2/index.html  appendix eyebrow says 58 min, sections sum to 83
```

**Currently violated in sessions 2 (58 vs 83), 3 (48 vs 80) and 4 (43 vs 80).**
Session 1 passes.

### A4 — core lede section count and minutes match the page

**Asserts.** The `.apxdiv` lede sentence *"The N sections above are the core
session and run in about M minutes"* has N equal to the count of
`section.slide` that carry neither `apx` nor `apxdiv`, and M equal to their
`span.mins` sum.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A4  session-3/index.html  lede claims 12 core sections in 64 min; page has 13 in 70
```

**Currently violated in all four lessons**: S1 claims 63 min against 67; S2 claims
10 sections against 11; S3 claims 12 / 64 against 13 / 70; S4 claims 12 / 67
against 13 / 70.

### A5 — every appendix section has an inbound href

**Asserts.** For every `section.slide.apx`, at least one `href="#<id>"` exists
elsewhere in the file.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A5  session-4/index.html  #sRSP (D5, 16 min) has no inbound link from anywhere
```

**Currently violated twice.** `session-3 #sHY` and `session-4 #sRSP` have exactly
zero inbound `href`; every other appendix section has two. Between them that is
32 minutes of authored material a reader can only reach by scrolling past the
appendix they were sent to.

## The tier rules (A6–A7)

### A6 — data-tier present and in the enumeration

**Asserts.** Every `section.slide.apx` carries `data-tier` whose value is one of
`foundational`, `standard`, `advanced`.

**Regions.** R3.

**Exemptions.** `session-0.1` — see the D14 note under **Open decisions**. The
exemption is dated and reasoned; it is not a silent skip.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A6  session-3/index.html  #sHY has data-tier="advance" (not in the enumeration)
```

### A7 — the tier filter offers every tier value present

**Asserts.** Every distinct `data-tier` value in the file appears in the
`#tierbar` control's `data-level` options.

**Regions.** R2 and R3.

**Verdict.** HARD FAIL.

**Why it exists.** A tier value nothing can select is material no reader can reach
by any route the page offers — the same defect as A5, arriving through the filter
rather than through the index.
## The dash rules (A8–A10)

These implement **D1**, **D2 as amended**, **D3**, **D3b** and **D4**. Read the
exemption register above first; every one of these rules runs against a population
with the exempt classes already removed.

### R11 is not unchecked — it has its own corpus baseline

Excluding byte-shared boilerplate from every per-file population would leave it
checked nowhere, and it is student-facing copy: *"Live model &mdash; optional"*,
*"Gemini API key &mdash; free, from…"*. So R11 carries **one corpus-level
baseline**, ratcheted the same way, and is covered once instead of N times.

Measured from the canonical copy — R11 spans deduplicated by content hash, so a
block shared across four lessons is counted once, not four times:

| | Distinct blocks | Literal `—` | `&mdash;` | Total |
|---|---|---|---|---|
| R11, corpus-wide, deduplicated | **23** | **0** | **23** | **23** |

Eight of the 23 appear in more than one file. The `.ritual` block is in four, the
three console fences are in two each, and the `.apxback` bars are mostly unique
because each names the two sections it sits between.

This does not conflict with the md5 pairing in the pre-push gate, which asserts
that the console fences are byte-identical *across* the two lessons. This asserts
that their dash count does not drift *over time*. Different propositions, and both
are worth holding.

### A8 — em-dash form does not drift from the file's baseline

**Asserts.** Each lesson has a declared **majority form** and a declared
**minority count**. The majority form does not change, and the minority count does
not increase.

**Matches.** Literal `—` (U+2014) against `&mdash;`, counted per file.

**Regions.** R1, with R2–R11 removed. **R11 is the amendment**: without excluding
byte-shared boilerplate, D2 and D3b collide, because session 3's 22 entity dashes
are mostly furniture that arrived from sibling files and are not its authorial
choice.

**The baseline**, measured on this commit:

| File | Majority | Minority form | Minority count |
|---|---|---|---|
| `session-0.1` | entity | literal | 0 |
| `session-1` | entity | literal | 1 |
| `session-2` | entity | literal | 2 |
| `session-3` | **literal** | entity | 15 |
| `session-4` | entity | literal | 1 |

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A8  session-2/index.html  minority form (literal —) rose from 2 to 5
FAIL  A8  session-3/index.html  majority form changed from literal to entity
```

**Why a ratchet and not a threshold.** A threshold picks a winner between the two
conventions in the corpus and, whichever it picks, demands a repo-wide substitution
that `MAINTAINING.md` forbids. A ratchet asks only that a file does not get *less*
consistent than it is now, which is the whole point and costs nobody an edit.

**Session 3 is left alone (D3), and its 22 crept-in entities are left alone
(D3b).** **Both figures for session 3 are correct and count different
populations: 22 is the whole-file `&mdash;` count, 15 is the count over
`authoredProse`. Neither supersedes the other, and the baseline file records which
population each figure belongs to.** Report §10.2's git evidence is decisive: session 3 arrived at 77 literal /
0 entity in the instructor's own first upload at `7f1ece4`, before any model pass,
and an independent rebuild at `a5fafff` reproduced it at 98/0. It is the original
author's convention. `—` and `&mdash;` render the identical glyph, so normalising
buys the reader nothing and erases authored provenance.

*One correction to §10.2 for the record: it calls `a5fafff` "a commit no sibling
lesson has". Four such rebuild commits exist — `879c6a4` and `5b7e7fc` (session 1),
`181a65f` (session 2), `a5fafff` (session 3). The conclusion stands on the
`7f1ece4` evidence alone; the parenthetical does not.*

### A9 — em-dash count in body prose does not increase

**Asserts.** Total em dashes per file does not rise above its recorded baseline.

**Population.** `authoredProse`. See the definition above; no region list is
restated here.

**The baseline**, measured on this commit over `authoredProse`:

| File | Literal `—` | `&mdash;` | **Total** |
|---|---|---|---|
| `session-0.1` | 0 | 7 | **7** |
| `session-1` | 1 | 83 | **84** |
| `session-2` | 2 | 69 | **71** |
| `session-3` | 94 | 15 | **109** |
| `session-4` | 1 | 84 | **85** |

`session-0.1` and `session-1` are the two files the console-fence decision moved:
7 not 11, and 83 not 87 on the entity count.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A9  session-4/index.html  body-prose em dashes rose from 84 to 87
          D1 ratifies existing copy and forbids new dashes; the three additions are at
          lines 1402, 1455, 1610
```

**This is how D1 is enforced.** "Existing copy keeps its dashes; newly authored
text uses none" is not checkable by reading a file, because a file cannot say when
its sentences were written. A ratchet against a recorded count says exactly the
same thing and needs no history. Lowering the baseline is always allowed; the
checker records the new floor.

**Residue for Part B (B6):** the ratchet cannot tell a *removed* dash from a
*rewritten sentence that never needed one*, and it has nothing to say about
whether a dash that survives is earning its place.

### A10 — no dash inside an attributed quotation

**Asserts.** No em or en dash sits between the opening and closing quote marks of
a quotation attributed to an external source.

**Matches.** Quote-mark parity at each dash position, after normalising
`&ldquo;`/`&rdquo;`/`“`/`”`/`“`/`”` to `"`. Every line in every file has
balanced quote marks today, so line-local parity is exact.

**Regions.** R1, R2, R7, R8, R9.

**Exemptions.** R6 and R10 — the injected span is owned by `verify-case.mjs`, and
the captured transcripts are Class A2.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A10  session-1/index.html:1332  em dash inside a quotation attributed to Wolfram (2023)
           altering it misquotes the source
```

**Currently clean at zero.** This is a regression guard and is expected to stay
silent. It is in Part A rather than Part B because the whole risk it covers is an
automated "fix" sweeping through quoted matter, and an automated risk deserves an
automated guard.

**Watch `session-1:1319`.** Its dash sits immediately after a closing quote and
before the resumed quotation, reconstructing Wolfram's own sentence flow. A10 does
not fire on it, correctly. A human editing that line should still check it against
the original first.
## The citation rules (A11–A15)

### A11 — Wolfram section names come from the locked 17

**Asserts.** Any quoted string presented as a section of Wolfram (2023) matches one
of the seventeen names exactly, after normalising apostrophes, quote marks and
ellipses.

**Regions.** R1, R7, R8, R9.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A11  session-2/index.html:1781  cites "The Parenthesis-Language Section",
           which is not one of the 17 sections of Wolfram (2023)
```

**Note for the implementer.** `session-2:1781` currently reads *"What Really Lets
ChatGPT Work?" and the parenthesis-language section*. The first is a valid name;
the second is descriptive prose, not a claimed section title. A11 must fire only on
strings *presented as* section names — quoted, or introduced by "section" /
"sections used" / "the … section" in title position. Getting that discrimination
wrong is how this rule becomes noise.

### A12 — every direct Wolfram quotation carries a section name

**Asserts.** Every direct quotation of, and every quoted figure from, Wolfram
(2023) has a valid section name within its own source note or footer entry.
Bare attributions do not need one. **This is D6.**

**Matches.** A `div.wolf` block, or quoted matter within a `.src` / `.csrc` note
that names Wolfram, or a figure the report enumerates as his (the 40,000-word /
1.6 billion / 60 trillion arithmetic, the GPT-2 token ids 914 and 3542, the 50,000
token vocabulary, temperature 0.8, 175 billion weights, 100 billion neurons /
100 trillion connections, the balanced-parenthesis 15%, the 5 billion word
embedding corpus, the `n⁻¹` power law, the alligator/crocodile pair).

**Population.** Anchored in **R1**, looking outward to R7, R8 and R9 for the
section name — the enclosing section's notes, or the file's own Wolfram footer
entry, either of which satisfies D6.

**The population was corrected after measurement.** Anchoring on R7/R8/R9 blocks
finds 4, because a quotation with no source note has no such block to sit in —
so that reading skipped exactly the cases D6 exists to catch. Measured over R1:
**19 Wolfram quotations and quoted figures, of which 7 sit in a section carrying
no note at all**, 4 of those in session 4. "No note to look in" is a finding, not
a skip.

**Verdict.** **ADVISE at first, HARD FAIL once the D7 mapping is signed off.**
It cannot be hard today, because the fix requires knowing which section each
reference belongs to, and that mapping is not approved.

**Message.**
```
ADVISE  A12  session-4/index.html:1489  direct quotation of Wolfram (2023) with no
             section name in its source note
```

**Currently 8 instances**, deduplicated to one per site — `session-1` at lines
1652, 1765, 1797, 1803, 1862 and 1878, and `session-4` at 1798 and 1800. Every
one is in a lesson RC-1 records as carrying **zero** section-level citations
attached to a claim. Sessions 2 and 3 report none, because their footer entries
name the sections they draw on.

**Residue for Part B (B4):** deciding *which* of the seventeen a given quotation
came from. A script can find an uncited quotation; only a reader who knows the
essay can map it.

### A13 — no off-by-one chip cascade

**Asserts.** Where one sentence or caption names N sources in order and carries N
confidence chips, the chips' `data-src` keys are not the correct keys shifted by
one position.

**Matches.** Within a single `<p>`, `<div class="csrc">` or caption string: extract
the ordered list of source names mentioned, extract the ordered list of
`data-src` values, resolve each footer key to its own source name, and fire when
the two lists align under a shift of ±1 but not under a shift of 0.

**Regions.** R1 and R2.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A13  session-4/index.html:1345  3 sources named in order, 3 chips, keys shifted by 1
           Deloitte's claim carries src-gartner; Surfshark's carries src-deloitte
```

**Currently violated twice**, both verified verbatim in the source:

- `session-4:1345` — Gartner → `src-gartner` ✓, Deloitte → `src-gartner` ✗,
  Surfshark → `src-deloitte` ✗. All three keys exist in the footer, correctly
  worded. `src-surfshark` is not an orphan; it is the tail of the shift.
- `session-3:2044` — a caption that names Magesh, Vectara and Anthropic in order
  and chips them `src-vectara`, `src-anthropic-ctx`, `src-anthropic-ctx`.

**This is in Part A against the report's recommendation, and D7b is right to
split it.** Report §9 routes all 27 mis-wired chips to a human read on the grounds
that matching a key to a claim needs reading. True in general. False for this
subtype: a cascade has a machine signature — N names in order, N chips, aligned
under a shift — and both instances in the corpus match it exactly.

### A14 — no declared-synthetic key on an external-work claim

**Asserts.** A chip keyed to a source declared synthetic does not sit on a claim
about an external, real work.

**Matches.** Build the exclusion set from footer entries declaring themselves
synthetic — today that is `src-case`, whose own entry reads *"entirely synthetic,
not based on any client living or dead"*. Fire when such a key chips a sentence
containing an external-work signal: a year in parentheses, a journal or reporter
name, a statute or regulation citation, a DOI or arXiv id, or a `Rev. Rul.` /
`T.C.` / `CFR` / `U.S.C.` / `ILCS` reference.

**Regions.** R1 and R2.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A14  session-3/index.html:1463  src-case is declared synthetic and is chipping a claim
           about Regulation S-P compliance dates
```

**Currently violated at least twice.** `src-case` is the stated authority for a
peer-reviewed CHI 2025 paper and for the compliance dates of a federal regulation.
No reading is required to catch either: the key is on an exclusion list and the
claim carries an external-work signal.

**Residue for Part B (B5):** the rest of the 27 — a *real* key on a claim outside
its source's scope. That needs a reader.

### A15 — every footer key has a chip or a declared reason

**Asserts.** Every `<li id="src-…">` is either referenced by at least one
`data-src` chip in the same file, or carries `data-nochip` with one of
`fabricated`, `authority`, `background`. **This is D9.**

**Regions.** R7.

**Verdict.** HARD FAIL, once `data-nochip` has been added. Until then, ADVISE.

**Message.**
```
FAIL  A15  session-2/index.html  src-kessler has no chip and no data-nochip reason
```

**Currently 23 keys would fire** — 11 in session 2, 5 in session 3, 7 in session 4.
They are not one problem, which is exactly why the rule is "chip **or** declared
reason" rather than "chip":

| `data-nochip` | Meaning | Examples |
|---|---|---|
| `fabricated` | Planted as exercise material and labelled as such. **Must never carry a confidence chip** — a chip asserts the claim is evidenced, and the point is that it is not | `src-kessler`, `src-hallowell` |
| `authority` | Legal authority cited descriptively, travelling with the case rather than evidencing a page claim | `src-irc`, `src-rr8513`, `src-rr200464`, `src-woelbing`, `src-davidson` |
| `background` | Assigned or background reading with no on-page claim | `src-laplace`, `src-anthropic-fluency`, `src-morningstar`, `src-lee-cognitive` |

Anything left after those three declarations is a genuinely lost chip and must be
fixed rather than declared — session 4's `src-finra2409`, `src-owasp`, `src-cve`
and `src-anthropic-terms` all carry `Used for:` clauses naming specific on-page
claims and have no chip pointing at them.

**A blanket "every key needs a chip" rule would demand a confidence chip on the two
deliberately fabricated citations, which is exactly backwards.** That is why
`validate_lesson.py` V4's reverse-direction warning has never been actionable, and
why this rule replaces rather than duplicates it.
## A16 — no UNVERIFIED / TODO / FIXME outside its declared register

**Asserts.** The markers `UNVERIFIED`, `TODO`, `FIXME` and `XXX` appear only where
the file declares a convention permitting them.

**Regions.** R1, R2, R7.

**The rule is not "no markers".** Session 0.1 carries eight occurrences of
`[UNVERIFIED, needs source]` across seven lines, and **every one is deliberate**:
the file's declared standard is to print the marker rather than invent a figure.
`CASE.md` states the same standard in its header — *"Unverifiable figures are
marked `[UNVERIFIED — needs source]` rather than filled in."*

So the rule is **register-aware**: the marker must use the declared form
(`[UNVERIFIED, needs source]` in the lessons, `[UNVERIFIED — needs source]` in
`CASE.md`), and it must sit in a region the file's convention covers. Session 0.1's
eight occurrences sit on seven lines — line 1113 carries two — across four region
classes: body prose (1113 ×2 and 1115), footer entries (1642, 1645), a JS feedback
string (2098), and two comments declaring the convention itself (1876, 2090). All
eight pass. Report §9.2 concern #16 says seven; it counted lines, not occurrences.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A16  session-2/index.html:1204  bare "TODO" in body prose
           no marker convention is declared in this file
```

**Currently clean.** `TODO`, `FIXME` and `XXX` are at zero across the hub and all
five lessons.

## The vocabulary rules (A17–A19)

**Nothing exists yet. This is greenfield**, and these three rules take effect when
the feature ships. They are written now so the feature is built against them rather
than retrofitted to them.

The design, ratified: a small `(?)` affordance on the **first occurrence of each
term per section**, opening a definition of **at most two sentences**, working on
**both hover and tap**; plus a **full vocabulary table at the very end of each
lesson, after the last appendix section** — term, definition, and a "read more"
link. Those links join the bibliography.

**One source, generated (D10).** Tooltip text and table text come from one record,
on the `CASE.md` pattern: a hand-edited source file, a generator, sentinels, a hash
guard. Across five lessons the design puts roughly two hundred definitions in two
places each, and they would drift silently, because nothing on the page ever shows
both at once.

**Terms are marked in prose (D11).** `data-term` on the span, and the build decides
which mark is first. Free-text matching would fire inside quotations, code and
proper names, and "first occurrence per section" is a *derived* fact that has to be
recomputed every time a section is reordered, split, or moved between core and
appendix.

### A17 — every marked term has a definition record

**Asserts.** Every `data-term` value in a lesson resolves to an entry in the
vocabulary source file, and every entry is marked at least once.

**Regions.** R1 and R3 in the lessons; the source file.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A17  session-1/index.html:1353  data-term="log-log axes" has no entry in VOCABULARY.md
```

### A18 — every definition is at most two sentences

**Asserts.** Each definition in the source file contains at most two
sentence-terminating marks, counting `.`, `?` and `!` outside abbreviations,
decimals and quoted matter.

**Regions.** the source file only. The rendered text is generated and must not be
asserted on — the same discipline `verify-case.mjs` enforces for the case block.

**Verdict.** HARD FAIL at build time, in the generator, so a third sentence never
reaches a lesson.

**Message.**
```
FAIL  A18  VOCABULARY.md  "cosine similarity" runs to three sentences
```

**Why the limit is enforceable at all** is that it is a rule about the *source
record*, not about the page. That is the argument for D10 in one line.

### A19 — every read-more link resolves to a live footer key

**Asserts.** Every `read_more` value in the vocabulary source names a `src-…` key
that exists in the footer of every lesson whose table carries that term.

**Verdict.** HARD FAIL.

**Message.**
```
FAIL  A19  VOCABULARY.md  "entropy" read-more points at src-synthid, absent from session-1
```

**This is the join to the bibliography**, and it is the reason the vocabulary work
and the `SOURCES.md` work (D8) have to land in that order. Two hundred read-more
links against 71 keys cannot be maintained by hand in either direction.
---

# PART B — requires a human read

Nine rules. Each states what a reviewer looks for and gives one GOOD and one BAD
example from the corpus, quoted with a file and a line. **No rule here may be
written as though a script could decide it, and none may be smuggled into Part A.**

Where a Part A rule has a residue, it is named below rather than averaged into the
mechanical check.

| # | Rule | Residue of |
|---|---|---|
| B1 | Register and voice | — |
| B2 | A definition's register | — |
| B3 | When a term is owed a definition | — |
| B4 | Which Wolfram section a quotation came from | A12 |
| B5 | Whether a chip's key matches its claim's scope | A13, A14 |
| B6 | Whether a surviving dash earns its place | A9 |
| B7 | Heading case | — |
| B8 | Spelling register | — |
| B9 | Whether an exemption is still true | A10, A16 |

---

## B1 — register and voice

**What a reviewer looks for.** Short declaratives. Second person. A concrete number
or a named thing in place of a category. The reason stated alongside the claim, in
the same sentence where it fits. No hedging, no throat-clearing, no summary of what
the paragraph is about to say.

**GOOD** — `session-1/index.html:1529`:

> Price is never the reason to use the cheap tier. Fitness for the task is.

Eleven words for a rule and its ground. Nothing to cut.

**BAD** — the shape to watch for is a sentence that announces itself before
arriving. Where an appendix lede reads *"This section explores some of the
considerations around chunk size,"* the reviewer's note is: say what chunk size
does to a retrieved answer, then show it.

## B2 — a definition's register

**What a reviewer looks for.** Two sentences at most (A18 enforces the count; this
rule judges the writing). No jargon inside the definition. The second sentence
gives a worked instance an advisor would recognise.

**The worked example, and it is the standard:**

> A 2-gram is a letter pair, and Q is nearly always followed by U.

**GOOD** — drafted for `context window`, report §4.4:

> The context window is the total amount of text the model can hold in front of it
> while producing one answer, measured in tokens. Haiku 4.5 holds 200K tokens, so a
> 700,000-token document set does not fit and the parts that do not fit are simply
> never read.

Second sentence is an instance, in figures the lesson already carries.

**BAD** — a definition that defines with the vocabulary it is there to explain:
*"An embedding is a dense vector representation in a high-dimensional latent
space."* Every content word needs its own definition, so the tooltip has taught
nothing and owes four more.

## B3 — when a term is owed a definition

**What a reviewer looks for.** A term is owed a definition **before the first
exercise whose instructions require it** — which is a stronger and differently
ordered rule than "first occurrence in the section". A term can appear harmlessly
in a lede and become load-bearing three paragraphs later at a button.

Report §4.2 measures the cost of getting this wrong: 87 exercises across the corpus
carry instructions that cannot be followed without a term the page never defines,
36 of them severely enough that a student cannot begin.

**BAD** — `session-1/index.html:1361`, the work-along gate for §02:

> Work along — Place six tokens, generate at all three temperatures, and switch to
> log&ndash;log axes.

Three undefined terms in seventeen words, in the sentence that tells a student what
finished looks like. `token`, `temperature` and `log–log axes` are all first used
here as instructions, not as prose.

**BAD, and worse** — `session-1/index.html:1322`, the §02 distribution picker,
**the first interaction in the lesson**:

> Click a candidate to append it &mdash; the next distribution follows your choice

`candidate`, `distribution`, `token` and `append` are undefined at this point. A
student who stops here has done nothing at all.

**GOOD** — the shape to aim for is session 0.1's own convention for its captured
probes, where the settings that produced an output are printed next to it. The
reader is never asked to act on a word the page has not yet paid for.

## B4 — which Wolfram section a quotation came from

**Residue of A12.** A script can find a quotation with no section name. Only a
reader who knows the essay can say which of the seventeen it came from.

**What a reviewer looks for.** Open the essay. Find the passage. Name the section
from the locked list. Where a quotation genuinely spans two sections, name both —
`session-3:1147` already does this and is the model.

**GOOD** — `session-3/index.html:1175`:

> Wolfram (2023), "The Concept of Embeddings" — alligator / crocodile and turnip /
> eagle are Wolfram's examples, reproduced in substance

Names the section, names what was taken, and says how faithfully.

**BAD** — `session-1/index.html:1362`:

> Wolfram, S. (2023), What Is ChatGPT Doing … and Why Does It Work? &mdash;
> opening section. Assigned reading.

"Opening section" is a description, not a citation. The essay's opening section has
a name and it is *It's Just Adding One Word at a Time* — which this very lesson
prints in its own §02 eyebrow, twelve lines earlier.

**The mapping in report §2.3 is not approved and must not be applied (D7).**

## B5 — whether a chip's key matches its claim's scope

**Residue of A13 and A14.** Those two catch the cascades and the
declared-synthetic keys. The rest of report §3.5's 27 mis-wired chips are a real
key on a claim outside its source's scope, and only reading both decides it.

**What a reviewer looks for.** Read the claim. Read the footer entry's `Used for:`
clause. Ask whether this source, as described, supports this sentence.

**BAD** — report §3.5: `src-daly` is wrong on five of its six chips, and
`src-finra2026` is carrying the OWASP Top 10. Both keys are real, both resolve,
both pass `verify-migration.mjs` check 18 and `validate_lesson.py` V4.

**Fixing the wiring is a precondition for generating any bibliography, not a
follow-up.** A generator run over the corpus today would publish all 27 as fact, in
an artifact that reads as more authoritative than the page it came from. That
inverts what the chip system exists to do.

## B6 — whether a surviving dash earns its place

**Residue of A9.** The ratchet counts. It cannot tell a rewritten sentence from a
deleted one, and it has nothing to say about the dashes that remain.

**What a reviewer looks for**, when touching a sentence that already has one: would
a full stop be better? Usually yes. Would a colon be better? Often, when what
follows explains what precedes. The dash earns its place when it marks a genuine
interruption of the sentence's own voice.

**D1 ratifies the status quo.** Existing copy keeps its dashes. Newly authored text
uses none. **No retrospective sweep, ever** — `MAINTAINING.md` has forbidden a
repo-wide substitution since 2026-08-18 and this document does not reopen it.

## B7 — heading case

**What a reviewer looks for.** `<h2>` in Title Case, `<h3>` in sentence case.
Sessions 1 through 4 already follow this: 18 of 19 `h2` are Title Case in each, and
their `h3` are sentence case with a handful of genuine proper nouns.

**GOOD** — `session-2/index.html`, `<h2>Cost Per Task Versus Cost Per Token</h2>`
above `<h3>Three findings a price sheet hides</h3>`.

**BAD** — session 0.1 inverts it: 10 of its 12 `h2` and 7 of its 8 `h3` are
sentence case. That is 17 headings out of pattern in one file, and it is one of the
several ways 0.1 sits outside the conventions the other four share (see D14).

**Not in Part A** because the exceptions are real and need a reader: *The Cole
Buy-Sell Agreement* is a document's name, and *Sticker Rank Against Cost-per-Task
Rank* is genuinely Title Case. A script would flag both.

## B8 — spelling register

**What a reviewer looks for.** British spelling, which the corpus already uses
consistently.

**Measured, and this is the argument for keeping it in Part B**: over prose with
`<script>` and `<style>` stripped, there are **zero** genuine American spellings in
any lesson. Every apparent hit is exempt — `recapitalized` is inside the injected
CASE span and comes from `CASE.md`; `personalization` is the name of an Anthropic
product feature and a footer key; the 1,239 hits for `color` are CSS properties.

**A naive whole-file spelling check produces a twelve-hundred-hit false-positive
storm on its first run.** That is the whole case for region classification, and the
reason this rule stays with a reader rather than a script.

## B9 — whether an exemption is still true

**Residue of A10 and A16.** The exemption register is a set of claims about the
corpus, and claims go stale.

**What a reviewer looks for**, once per audit: is Class A still empty? Are the four
captured transcripts still the only verbatim third-party output? Has a new
generated region appeared that nobody has routed? Has `build-case.mjs` gained or
lost a dash-anchored pattern?

**The failure mode this prevents** is an exemption that outlives its reason, which
is indistinguishable from a checker that has quietly stopped looking.
---

# Explicit non-goals

**`scripts/verify-editorial.mjs` must not check any of these.** Each is already
owned. A suite that re-checks what another check owns is a suite people stop
reading.

| Do not check | Owned by |
|---|---|
| Chip resolves to a footer entry; orphan footer entries; the un-keyed chip cap | `validate_lesson.py` **V4** + `verify-migration.mjs` **18** |
| The footer time table summing to its `alloc` row | `validate_lesson.py` **V5** + `verify-migration.mjs` **16** |
| Anything inside the `CASE:BEGIN` / `CASE:END` span — read it, never assert on it | `verify-case.mjs` |
| The managed CSS fence, and the `&#8212;` inside the swept payload | `verify-style.mjs` / `restyle_sweep.py` |
| Browser storage and section gating | `validate_lesson.py` **V3** / `verify-migration.mjs` **10** |
| The retired-name purge | `validate_lesson.py` **V7** / `verify-migration.mjs` **1, 2, 3** |

Two near-misses, stated so nobody removes a legitimate rule by mistake:

- **A1–A4 are not the time table.** The `.apxdiv` index cards are an independent
  second copy of the same numbers. V5 and check 16 verify the footer
  `table.tbudget`, which sums correctly in every lesson and passes. Nothing has
  ever compared the two copies.
- **A15 is not V4's reverse direction.** V4 warns that a footer key has no chip.
  A15 asserts that a key has a chip **or a declared reason**, which is a different
  and actionable proposition — and it is why V4's warning has sat open in
  `MAINTAINING.md`'s "Known follow-ups" without anyone being able to act on it.

## `validate_lesson.py` C2 must be corrected or retired upstream

`validate_lesson.py:191` emits an INFO:

```
em dashes in rendered text: N (policy unratified for student-facing copy; see pedagogy s13)
```

Three things are now true of it. Its parenthetical is out of date, because D1
ratifies the policy. Its count is the wrong count: it is
`html.count('—') + html.count('&mdash;')` over the raw file, so it includes CSS,
comments, attribute values and the injected span, and it misses `—` and
`&#8212;` entirely. And a ratified rule enforced correctly here while reported
wrongly there is worse than either alone.

**When A8 and A9 go hard, C2 is corrected or retired in the same change.** It lives
in the skill, not this repo, so it is a separate commit in a separate place — which
is exactly why it will be forgotten if it is not written down here.

# Rollout — advisory burn-in first (D16)

The gate currently runs clean. A checker that fires false positives into a green
gate destroys the gate's meaning, and the exemption register above is a set of
claims that has not yet been tested against a running implementation.

1. **Build it with `--advisory-only`, outside the gate.** Everything prints,
   nothing exits non-zero. Reference it from `MAINTAINING.md` as a report.
2. **Run it until the exemption list stops changing.** Every false positive is an
   exemption class this document has not yet named. Add it here, not to the code.
3. **Promote Part A's hard tier into the documented pre-push gate.**
   `MAINTAINING.md`'s check block is currently headed *"The CASE.md v4.0 migration
   checks"* and will need renaming, because it will no longer describe what it
   contains.
4. **Close the three `MAINTAINING.md` "Known follow-ups" this supersedes** — the
   em-dash policy entry, the prose-density band entry, and the orphan-footer-sources
   entry.

Exit-code contract:

```
Part A rule at HARD, violated      -> exit 1, blocks the push
Part A rule at ADVISE, violated    -> printed under ADVISORY, exit unaffected
Part A rule at DISABLED            -> prints nothing at all
Part B                             -> never in the checker at all
Exempt classes                     -> silent, not warned
```

**Severity is a committed config field, never inferred at runtime.** It lives in
`scripts/editorial-baseline.json` under `severity`, one entry per rule, visible
and diffable. "Demote a rule whose exemption list is still moving" is a judgment
no process can evaluate, so the process does not try: a human edits the field.
`--advisory-only` overrides every rule to ADVISE for the burn-in and exits 0.

Advisory output prints under a clearly separated `ADVISORY` heading. Nothing that
prints there may be mistaken for a failure.
---

# Decisions

Ratified against `docs/editorial-gap-report.md` §11.

| # | Decision | Where it lands |
|---|---|---|
| D1 | **Ratify the status quo.** Existing student copy keeps its dashes; newly authored text uses none. No retrospective sweep | A9, B6 |
| D2 | **Form-agnostic checker, as amended.** Consistency is asserted over authored prose only, with byte-shared boilerplate (R11) excluded, and ratcheted against a per-file baseline rather than a threshold | A8, R11 |
| D3 | **Leave session 3 alone.** The literal-character convention is the original author's, present at 77/0 before any model pass | A8 |
| D3b | **Leave the 22 crept-in entities.** Reverting breaks byte-identity in blocks that depend on it | R11, A8 |
| D4 | **Adopt all four exemption classes as written** | exemption register |
| D5 | **Exempt `CASE.md` wholesale**, and the injected regions as a consequence | Classes B, C2 |
| D6 | **Every direct quotation and every quoted figure carries a section name.** Bare attributions do not | A12 |
| D7 | **Deferred.** The §2.3 mapping awaits sign-off. Rule only, no application | A12, B4 |
| D7b | **Split, against the report's recommendation.** Cascades and declared-synthetic keys are mechanical; the residue is a human read | A13, A14, B5 |
| D8 | **`SOURCES.md` at repo root, injected on the `CASE.md` pattern.** Not scraping | A19, B5 |
| D9 | **Chip or declared reason**, machine-readable via `data-nochip` | A15 |
| D10 | **One source for tooltip and table**, `CASE.md` pattern | A17, A18 |
| D11 | **Mark the term in prose.** No free-text matching | A17 |
| D12 | **Deferred.** The instructor prunes the term inventory | — |
| D13 | **Not approved.** The rubric's population count is wrong. This document does not record it and does not depend on it | known-stale note |
| D14 | **[OPEN]** — see below | A6 |
| D15 | **Leave the density band unratified.** Report core and appendix separately | known-stale note |
| D16 | **Advisory burn-in** before the pre-push gate | rollout |
| D17 | Correct `docs/spine-brief.md`'s opening paragraph. **Not in this task** | follow-ups |

## D14 is [OPEN] and it was not answered

The instruction carried both branches with the note *"delete the branch that does
not apply"*, and neither was deleted. Per the standing rule for an unanswered
item, the report's recommendation stands as the proposed default and the decision
is recorded as open rather than resolved silently.

**The question.** Is session 0.1 in this term's teaching set?

**Why it cannot be deferred much longer.** Session 0.1 has 12 sections, no
appendix, no `data-tier` on anything, no tier bar, and no `.apxdiv` / `.apxcard` /
`.apxback` furniture. Its core runs 120 minutes against 67–70 in the other four. So
**A1 through A7 have no population in that file at all**, and A6 currently carries
an exemption with no expiry — which is the precise shape of the undocumented skip
that makes a checker stop being trusted. It is also out of pattern on heading case
(B7, 17 headings) and is the only lesson with a third dash convention.

**The two consequences, written out so whichever is chosen is already specified:**

**(a) Session 0.1 is taught this term.** It adopts the core/appendix/tier
architecture in a **separate mechanical commit before any editorial work** — split
the 12 sections into core and appendix, add `data-insert-after` and `data-tier`,
add the tier bar, add the `.apxdiv` index grid and the `.apxback` return links. The
transform is already proven four times and depends on no editorial decision.
`EDITORIAL.md` then applies to all five lessons with **no exception**, and A6's
exemption is deleted.

Doing it in this order matters: every editorial artifact keyed to a 0.1 section id
— vocabulary first-occurrence marks, A1–A5's populations, the A8/A9 baselines — is
invalidated the moment those 12 sections are re-cut. After means measuring twice.

**(b) Session 0.1 stays deferred.** `EDITORIAL.md` applies to sessions 1–4, and
0.1 is named here as a **declared, dated exception with its reason**: deferred
2026-08-23 at the instructor's direction, per commit `f5bf47b` — *"Session 0.1's
missing appendix and the 60-minute core split are deferred at the instructor's
direction; 0.1 is a work in progress and is not needed for this class yet."*
A6 keeps its exemption and the exemption keeps its date. The checker carries one
documented skip rather than a silent inconsistency, and the skip is re-examined
whenever the deferral is.

**The report's recommendation, standing as the default:** adopt the architecture
first if 0.1 is taught; otherwise annex it, and say so in this file.

# Follow-ups

Not in scope for this document, recorded so they are not lost.

- **`docs/spine-brief.md`'s opening paragraph is stale (D17).** It reads *"Nothing
  here is implemented"*; the spine has been implemented since `93904d7`, lives in a
  string literal at `scripts/inject-case.mjs`, and appears in all six HTML files.
  It is the document a future maintainer reads first.
- **Report §5, §6 and §7 need re-deriving** before any rule cites them. See the
  known-stale note.
- **Report §2.2, §2.3, §1.2, §1.3, §8 and §9.2 carry the numeric defects** listed
  in RC-1 to RC-3 and in the two smaller corrections. This file's figures govern.
- **`validate_lesson.py` C2** is corrected or retired upstream when A8 and A9 go
  hard.
- **The 27 mis-wired chips** are fixed before any bibliography is generated.
