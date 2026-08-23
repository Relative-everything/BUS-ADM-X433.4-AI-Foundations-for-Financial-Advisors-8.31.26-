# Editorial gap report

**Date** 2026-08-23 · **Branch** `claude/editorial-gap-audit-gfyqr1` ·
**Base** `057ae77` (origin/main, the PR #6 merge) ·
**Scope** `index.html`, `session-0.1` … `session-4`, `CASE.md`, `README.md`,
`MAINTAINING.md`, `CHANGELOG.md`, `docs/`, `audit/`

**This is a measurement and proposal pass. No lesson file is changed by it.**
Item 5 stops for approval before any scoring is done, as instructed. Every other
item is inventory. Where a decision is needed it is stated as a decision, with a
recommendation, and nothing is applied.

**Naming, fixed by instruction and used throughout.** The editorial rules
document is **`EDITORIAL.md`** and its checker is **`scripts/verify-editorial.mjs`**.
The existing `scripts/verify-style.mjs` checks the managed CSS fence and has
nothing to do with prose. The word *style* is not used for editorial rules
anywhere in this report, and must not be used for them anywhere in the repo.

---

---

## Contents

| § | Item | Status |
|---|---|---|
| 0 | Context confirmed on disk | measured |
| 1 | Em dashes, every occurrence classified | measured · **exemptions proposed** |
| 2 | Wolfram references and section mapping | measured · **mapping proposed, you verify** |
| 3 | Bibliography raw material | measured · **generation verdict** |
| 4 | Vocabulary inventory | measured · **single-source recommendation** |
| 5 | Complexity percentile ranking | **RUBRIC PROPOSAL — STOPPED FOR APPROVAL** |
| 6 | AI complexity versus planning context | inventory only |
| 7 | Prose density | measured |
| 8 | Appendix reflow feasibility | verdict · no code |
| 9 | Verification surface | mapped · **placement recommendation** |
| 10 | Not on your list, found while measuring | measured |
| 11 | Every decision you owe, with a recommendation | — |
| 12 | The prompt for the fresh chat that writes `EDITORIAL.md` | copy-paste block |

**Nothing in this report has been applied to any lesson file.** The only file this
branch adds is this one.

---

## 0. Context confirmed on disk, not assumed

### 0.1 The CASE.md v4.0 migration

Confirmed. PR #6 merged at `057ae77`. All five scripts exist and run from the
repo root:

| Script | Role |
|---|---|
| `scripts/build-case.mjs` | `CASE.md` → generated artifacts; recomputes the Part M identities |
| `scripts/inject-case.mjs` | rewrites the span between the `CASE:BEGIN` / `CASE:END` sentinels; `--check` reports drift and writes nothing |
| `scripts/verify-case.mjs` | SHA-256 per injected block; separates *no sentinels* / *hand-edited* / *stale against the current build* |
| `scripts/verify-migration.mjs` | 14 numbered checks, 1 → 20 with sub-ids; includes check 20, the spine drift guard |
| `scripts/verify-browser.mjs` | headless Chromium, 75 assertions |

The `CASE:BEGIN cole-household v4.0` / `CASE:END` sentinel pair is present in all
six HTML files (`index.html:532/861`, `session-0.1:557/886`, `session-1:845/1174`,
`session-2:735/1064`, `session-3:703/1032`, `session-4:722/1051`).

### 0.2 The spine: `docs/spine-brief.md` is stale, the spine IS implemented

**The commit message is right and the brief is wrong.** This is the answer to the
question you asked.

`docs/spine-brief.md` opens with *"Collected for the instructor. Nothing here is
implemented, and nothing here is a decision."* That sentence was true when the
brief was written at `cc952fb` (*"Phase 6: spine brief. Collected and drafted;
NOT implemented."*) and stopped being true at `93904d7` (*"Apply instructor
decisions: probe captures, titles, style fence, spine"*), whose body states in
terms:

> 6. The spine is implemented: candidate A with candidate C's lever clause, at
>    roughly the 70/30 split asked for. […] It lives in inject-case.mjs rather
>    than in CASE.md, deliberately […] Every VOID marker is now closed.

On disk, right now:

- `scripts/inject-case.mjs:52-60` generates a `.case-spine` block, with a comment
  naming `docs/spine-brief.md` candidate A plus candidate C's lever clause.
- The block is present in **all six** HTML files (8 `case-spine` string hits each,
  markup plus CSS).
- The rendered question, from `session-1/index.html`: *"Meg is short **$522,086**
  a year from year 6, while the structure performs exactly as designed. **How much
  of the $20,020,000 note does she call this year, what does calling it cost her
  in every year after, and when is a different lever the better answer?**"*
- `grep -rn 'VOID' index.html session-*/index.html` returns **nothing**. Sockets
  S1–S7 are closed.
- `scripts/verify-migration.mjs` check 20 is the spine drift guard and
  `verify-migration.mjs:54-58` registers `docs/spine-brief.md` as an exempt
  register — the brief's section 1 is an inventory of the *retired* framing and is
  deliberately allowed to contain the old strings.

**Consequence for `EDITORIAL.md`.** The spine text is **generated**. It is in a
JavaScript string literal in `scripts/inject-case.mjs`, not in `CASE.md` and not
in any lesson. Any editorial rule that touches it — dash form, quote form,
sentence length — has to be satisfied *in the generator*, and a lesson-file edit
would be reverted by the next `inject-case.mjs` run and failed by
`verify-case.mjs` as `block was hand-edited`. This is the same class of problem as
item 1's injected-region question and it has the same answer.

**One action falls out of this and it is not an editorial one:** the first
paragraph of `docs/spine-brief.md` now misdescribes the repository. It should be
corrected to record that candidate A was chosen and where it lives. Not done here —
this pass changes nothing — but it is the cheapest correction on the list.

---

## 1. Em dashes — every occurrence classified

### 1.1 Method

Every dash character in the tree was located and classified by the region it sits
in, deterministically: `<style>` and `<script>` bodies, HTML comments, `<pre>` /
`<code>`, inside a tag (so, an attribute value), the `CASE:BEGIN`/`CASE:END`
injected span, footer `<li id="src-…">` entries, `<span class="src">` source notes,
`<div class="wolf">` assigned-reading blocks, `<blockquote>`, and everything left
over, which is body prose. Seven distinct **forms** are in use.

**986 occurrences in total.** The form breakdown alone is a finding: the corpus
encodes the same character four different ways depending on where in a file it is.

### 1.2 Per file, per form

| File | literal `—` | `&mdash;` | `&#8212;`/`&#x2014;` | `—` (JS) | literal `–` | `&ndash;` | `–` (JS) |
|---|---|---|---|---|---|---|---|
| `index.html` | 7 | 6 | 1 | 0 | 2 | 0 | 0 |
| `session-0.1/index.html` | 28 | 13 | 1 | 1 | 8 | 0 | 0 |
| `session-1/index.html` | 11 | 101 | 1 | 59 | 2 | 5 | 1 |
| `session-2/index.html` | 13 | 83 | 1 | 50 | 2 | 6 | 0 |
| `session-3/index.html` | **110** | 22 | 1 | 65 | 4 | 0 | 2 |
| `session-4/index.html` | 12 | 112 | 1 | 30 | 2 | 2 | 0 |
| `CASE.md` | 177 | 0 | 1 | 0 | 9 | 0 | 0 |
| `MAINTAINING.md` | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| `CHANGELOG.md` | 12 | 0 | 0 | 0 | 4 | 0 | 0 |
| `changelog/index.html` | 12 | 0 | 0 | 0 | 4 | 0 | 0 |

The single `&#8212;`/`&#x2014;` in each HTML file is the same one: a numeric entity
inside the shared stylesheet payload, swept in by `restyle_sweep.py`. It is
managed-fence content and out of editorial reach — a fix there is an edit to the
skill's `assets/`, not to a lesson.

`README.md` contains **zero** dashes of any form. It is the only student-facing
document already at a no-em-dash standard, and it reads perfectly well, which is
evidence for the policy being achievable.

### 1.3 Per file, per class

| File | body prose | script string | `case` injected | footer source entry | `.src` note | assigned reading | attribute/tag | CSS |
|---|---|---|---|---|---|---|---|---|
| `index.html` | 7 | 0 | 8 | 0 | 0 | 0 | 0 | 1 |
| `session-0.1` | 11 | 38 | 0 | 0 | 0 | 0 | 1 | 1 |
| `session-1` | 88 | 63 | 8 | 4 | 4 | 8 | 3 | 2 |
| `session-2` | 78 | 52 | 8 | 11 | 0 | 0 | 4 | 2 |
| `session-3` | 116 | 74 | 8 | 1 | 0 | 0 | 3 | 2 |
| `session-4` | 92 | 49 | 8 | 5 | 0 | 0 | 3 | 2 |
| `CASE.md` | 187 (markdown source) | | | | | | | |
| `CHANGELOG.md` | 16 (markdown doc) | | | | | | | |
| `changelog/index.html` | 16 (generated from the changelog) | | | | | | | |

**`session-0.1` has 0 in the injected class because it carries the case block but
the classifier attributes its dashes to the enclosing `<script>` that writes the
flowchart — the same eight generated dashes, reached by a different route.** They
are still generator output, not lesson prose.

### 1.4 The four classes that need an exemption, not a fix

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

### 1.5 CASE.md and the injected regions — a fix there does NOT go in a lesson file

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

---

### 1.6 The quotation class — measured, and it is EMPTY

**Across all six lesson documents and `CASE.md` there are ZERO em or en dashes
sitting between the opening and closing quotation marks of a quotation attributed
to an external source.**

This was measured, not assumed. Quote-mark parity was computed at every dash
position after stripping tags and decoding entities, and the parity test was
separately proved sound: **every line in every file has balanced `"`, `“`/`”` and
`&ldquo;`/`&rdquo;`** — no quotation in this repo spans a line break, so line-local
parity is exact rather than heuristic.

| Region | Lines carrying both a dash and a quote mark | Dashes INSIDE the quote marks |
|---|---|---|
| Lesson prose (non-script) | 33 | **0** |
| `<script>` display strings | 26 | **0** |
| `<div class="wolf">` assigned-reading blocks | 6 | **0** |
| `<blockquote>` | no `<blockquote>` exists in the repo | — |
| `<li id="src-…">` footer entries | 13 | **0** |
| `<p class="src">` / `<span class="src">` footnotes | 14 | **0** |
| `CASE.md` | 5 | **0** |

The eight dashes in session 1's assigned-reading blocks — the ones this item was
most likely to catch — are **all outside** the quote marks, in the lesson's own
framing. `session-1:1319` is the closest call: the dash sits immediately after a
closing quote and before the resumed quotation, reconstructing Wolfram's own
sentence flow. It is editable, but check it against the original before touching it.

**Where the real verbatim-quoted matter is, and it is not in lesson prose.**
The one genuine byte-sensitive class in the corpus is the **four captured-transcript
strings in `session-0.1`**, carrying **28 dashes** (22 em, 6 en). These are verbatim
model output recorded in `docs/probe-captures.md`, and the lesson's own convention
is to label them as captured. Altering a dash there falsifies a record of what a
model actually produced — the never-fabricate collision, arriving from a direction
item 1 did not anticipate.

### 1.7 The recommended exemption schedule

| Class | Count | Disposition |
|---|---|---|
| Dashes inside a quotation's quote marks, lesson prose | **0** | **Nothing to exempt — the corpus is already clean.** Write the rule anyway; it costs nothing and prevents a regression |
| `session-0.1` captured transcripts (four probe `base:` strings) | 28 (22 em + 6 en) | **HARD EXEMPT.** Verbatim third-party output; source of truth `docs/probe-captures.md`. Also exempt the capturer's spaced-hyphen note at `session-0.1:1979` |
| `session-1:1319`, wolf-block dash #1 | 1 | **SOFT EXEMPT** — outside the quote marks but reconstructive. Verify against the original before editing |
| The other seven wolf-block dashes | 7 | Editable — framing and label furniture |
| Proper names and published titles | ~50, including `IRC §§ 671–679` ×13 | **EXEMPT** |
| Structural / non-prose furniture | 60 in HTML + 15 in `CASE.md` | **EXEMPT** — empty-cell placeholders, `data-nav`, `.apxback`, CSS and JS comments |
| Injected `CASE:BEGIN…CASE:END` regions | 9 per file × 6 files = **54** | **EXEMPT from lesson-file editing.** Fix in `CASE.md` Part L and re-inject; `verify-case.mjs` blocks a hand-edit |
| `CASE.md` build-parser anchors (§1.8) | 24 em + 1 en | **EXEMPT unless `build-case.mjs` changes in the same commit** |
| `session-3`'s literal-em convention | 110 | **LEAVE ALONE** — see §10.2; it is the original author's convention |
| En dashes standing in for em dashes | **0** | No defect found |
| Spaced hyphens as sentence punctuation in prose | **0** | No defect found |

### 1.8 En dashes, hyphens-as-dashes, and a finding that hardens the CASE.md answer

**En dashes: zero defects.** Every literal `–` and `&ndash;` in the corpus is
either a numeric range (`58&ndash;88%`, `$60–$80/month`, `2023&ndash;2024`,
`IRC §§ 671–679`) or a compound name (`Persona&ndash;Task&ndash;Context&ndash;Format`,
`Log&ndash;log axes`). None stands in for an em dash.

**Spaced hyphens used as sentence punctuation: zero defects in prose.** Every
`" - "` hit is in a JS or CSS comment, a generated markdown bullet, or — the case
that matters — inside `<pre id="promptBlock">` at `session-3:1419-1425`, a
copy-paste prompt template. **Plain ASCII is correct there**: students paste it into
a chat box. A rule that "upgraded" it would corrupt the exercise.

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

**This strengthens the §1.5 recommendation to exempt `CASE.md` wholesale.** Any
policy applied to it must be regex-aware, not text-aware, and the only safe guard is
procedural: change a dash in `CASE.md`, then run `node scripts/build-case.mjs` and
confirm it exits 0 before doing anything else.

---

## 2. Wolfram references

### 2.1 The count

`grep -ci wolfram` by file, before any judgement about what counts as a reference:

| File | Named mentions |
|---|---|
| `index.html` | 1 |
| `session-0.1/index.html` | 1 |
| `session-1/index.html` | **20** |
| `session-2/index.html` | 14 |
| `session-3/index.html` | 12 |
| `session-4/index.html` | 12 |
| `CHANGELOG.md` | 4 |
| `CASE.md`, `README.md`, `MAINTAINING.md` | 0 |

Session 1's 20 named mentions sit behind **one** footer key, `src-wolfram`, which
carries **6** chips. That is the concrete shape of the imbalance you flagged in
item 3, seen from the citation side.

**Named mentions undercount by roughly half.** Lines that name him are 20/14/12/12;
*occurrences* of the string are 29/22/24/17. And beyond either count, many passages
use his figures and examples without naming him at all — the alligator/crocodile
pair, the 40,000-word / 1.6 billion / 60 trillion arithmetic, the GPT-2 token ids,
the 15% parenthesis figure, the 100-billion-neuron comparison — several of which
live in JavaScript feedback strings rather than in prose.

**The full sweep, counting every reference to the essay however it is signalled,
finds 125.** Sixteen of those are CSS comments naming the `.wolf` block and are set
aside. The substantive total is **109**:

| File | Substantive references | Already section-cited |
|---|---|---|
| `session-1/index.html` | **44** | 2 |
| `session-2/index.html` | 25 | 4 |
| `session-3/index.html` | 18 | 5 |
| `session-4/index.html` | 22 | **0** |
| `session-0.1/index.html`, `index.html` | 0 | — |

Session 1 alone carries 44 references to a single essay behind one footer key with
six chips. That is the imbalance at full size.

### 2.2 Which references already carry a section-level citation

**Nine, matching your estimate.** These are the only places in the corpus where a
valid essay section name appears:

| File:line | Section name(s) cited | What it is |
|---|---|---|
| `session-1:1316` | *It's Just Adding One Word at a Time* | the lesson's own §02 eyebrow title |
| `session-1:2021` | *It's Just Adding One Word at a Time* | the footer time-table row for §02 |
| `session-2:1657` | *The Concept of Embeddings*, *Meaning Space…* | assigned-reading pointer |
| `session-2:1711` | *It's Just Adding One Word at a Time* | `.csrc` chart source note |
| `session-2:1781` | *What Really Lets ChatGPT Work?* | `.csrc` chart source note |
| `session-2:1919` | *(sections used: …)* | footer `<li id="src-wolfram">` |
| `session-3:1147` | *The Concept of Embeddings*, *Meaning Space and Semantic Laws of Motion* | `.src` note under §01 |
| `session-3:1175` | *The Concept of Embeddings* | `.src` note under §01 |
| `session-3:1597` | *Beyond Basic Training* | `.src` note in Appendix C2 |
| `session-3:1690` | *The Concept of Embeddings*, *Meaning Space…* | footer `<li id="src-wolfram">` |

Two observations that matter more than the count:

1. **Session 3 is the only lesson doing this properly in body copy.** Three of its
   `.src` notes name the section, sit directly under the claim, and say what was
   taken. That is the pattern the other lessons should be measured against, and it
   is worth noting that session 3 is also the lesson that is idiosyncratic on
   entity forms (§10.2) — the same authoring pass appears to have been the more
   careful one on citation.
2. **Session 4 has zero.** Twelve named mentions, `src-wolfram` with 2 chips, and
   not one section name anywhere in the file — including at
   `session-4:1895`, whose footer entry says *"Used for: the reproducibility quote
   in §08 and the three stale claims in Appendix D3."* A quote is being reproduced
   with no pointer to where in a 20-section essay it comes from.
3. **Session 1's two hits are its own furniture**, not citations of a claim: a
   section title and the time-table row that repeats it. On the substance —
   20 mentions including several direct quotations — session 1 carries **no**
   section-level citation at all.

### 2.3 Full enumeration, with proposed mappings

Every reference below is reported as: file, line, the on-page text, whether it
already carries a section citation, and — where it does not — the most likely
source section chosen **only** from the 18 valid names, with a confidence mark.

**These are proposals. Nothing is applied. You verify the mapping.**
Confidence means: **HIGH** — the essay's content for that section is quoted or its
distinctive figure is used, and no other section covers it. **MEDIUM** — the claim
belongs to that section's subject but the essay states it in more than one place.
**LOW** — the claim is general to the essay and the section is a best guess.

**125 references found in total, of which 16 are CSS comments naming the `.wolf`
block and are excluded below. 11 already carry a section-level citation.**
Direct quotations are marked **quotation** — those are the ones D6 in §11 would
make mandatory.

#### `session-1/index.html` — 44 references, 2 already section-cited

| Line | § | Kind | On-page text | Already cites | **Proposed section** | Conf |
|---|---|---|---|---|---|---|
| 1316 | `s2` | title | 02 · Wolfram, "It's Just Adding One Word at a Time" | **It's Just Adding One Word at a Tim** | — |  |
| 1319 | `s2` | **quotation** | ChatGPT is "just asking over and over again 'given the text so far, what should the next word be?'"—each time adding a… | **It's Just Adding One Word at a Tim** | — |  |
| 1326 | `s2` | attribution | Illustrative distribution — the article's table is an image and is not reproduced | — | It's Just Adding One Word at a Time | M |
| 1332 | `s2` | **quotation** | Always picking the highest-ranked word gives "a very 'flat' essay, that never seems to 'show any creativity' (and even… | — | It's Just Adding One Word at a Time | H |
| 1337 | `s2` | figure | T = 0.8 | — | It's Just Adding One Word at a Time | M |
| 1349 | `s2` | figure | The probabilities fall off as a power law | — | Where Do the Probabilities Come From? | M |
| 1359 | `s2` | figure | Straightness means no natural cutoff — no rank at which the tail stops mattering. Every control in the lab later is so… | — | Where Do the Probabilities Come From? | M |
| 1362 | `s2` | attribution | Wolfram, S. (2023), What Is ChatGPT Doing … and Why Does It Work? — opening section. Assigned reading. H | — | It's Just Adding One Word at a Time | H |
| 1366 | `s2` | figure | Build the probability table by hand from a corpus, then watch the counting approach die at n=4. The concrete answer to… | — | Where Do the Probabilities Come From? | L |
| 1375 | `s5` | **quotation** | About 50,000 tokens exist and only about 3,000 are whole words. Wolfram gives the actual GPT-2 values: "the" is token … | — | The Concept of Embeddings | M |
| 1403 | `s5` | attribution | Token IDs and vocabulary figures: Wolfram (2023). H · Word-to-token rows derived at 0.75 words per token. M | — | The Concept of Embeddings | M |
| 1653 | `s15` | attribution | Wolfram (2023) / The passage on temperature — you have now used it | — | It's Just Adding One Word at a Time | H |
| 1743 | `s3` | **quotation** | About 40,000 reasonably common English words. A web crawl holds a few hundred billion words; digitised books another h… | — | Where Do the Probabilities Come From? | H |
| 1756 | `s3` | attribution | All quoted figures: Wolfram (2023). H · Chart arithmetic is 40,000^n against a 400 billion word corpus. H | — | Where Do the Probabilities Come From? | H |
| 1765 | `s4` | figure | Turn the knobs until the curve fits the fall times. You are minimising a loss function by hand — which is what trainin… | — | What Is a Model? | M |
| 1797 | `s4` | figure | Weights — / 175 billion. Embedding vector length 768 / 12,288. Attention blocks × heads 12 × 12 / 96 × 96. Token vocab… | — | Inside ChatGPT | H |
| 1803 | `s4` | **quotation** | Wolfram's comparison: brains have "about 100 billion neurons" and "maybe 100 trillion connections." He also estimates … | — | The Training of ChatGPT | M |
| 1806 | `s4` | attribution | Fall times computed from t = √(2h/g) at 5-metre spacing — idealised, as in the article. All model figures quoted from … | — | What Is a Model? | M |
| 1816 | `s6` | **quotation** | Built by looking at large amounts of text — he uses 5 billion words — and seeing how similar the environments are in w… | — | The Concept of Embeddings | H |
| 1832 | `s6` | figure | GPT-2 uses vectors of length 768; GPT-3 uses 12,288. What you clicked is two dimensions, hand-placed. No flat picture … | — | The Concept of Embeddings | M |
| 1843 | `s7` | figure | Wolfram trains a small transformer on a language with exactly one rule: parentheses must balance. It learns it well en… | — | Inside ChatGPT | M |
| 1845 | `s7` | **quotation** | With 2 attention heads the learning converges after "10 million or so examples." Yet with its "400,000 or so laborious… | — | Inside ChatGPT | M |
| 1859 | `s7` | attribution | Simulated shallow model — confidence degrades with depth, as Wolfram's trained net does | — | Inside ChatGPT | M |
| 1862 | `s7` | **quotation** | Counting is algorithmic. The network is feed-forward — "there's no looping or 'going back'" — so it approximates a cou… | — | Inside ChatGPT | L |
| 1878 | `s8` | figure | The model hands over a probability for every one of about 50,000 tokens. A stack of sampling algorithms then cuts that… | — | The Concept of Embeddings | M |
| 1880 | `s8` | figure | Below is the candidate distribution for a prompt about Meg's CPC interest, shaped as the rank^−1 power law from §02. R… | — | Where Do the Probabilities Come From? | M |
| 2047 | `FOOTER` | footer | Wolfram, S. (2023, 14 February). What Is ChatGPT Doing … and Why Does It Work? Assigned reading. Used for: next-token … | — | UNMAPPABLE | H |
| 2339 | `SCRIPT` | JS copy | Log–log axes. Now a straight line. That is the n^−1 power law Wolfram identifies as characteristic of language. Straig… | — | Where Do the Probabilities Come From? | H |
| 2404 | `SCRIPT` | figure | 40,000 possible single words. Easily counted. | — | Where Do the Probabilities Come From? | H |
| 2405 | `SCRIPT` | JS copy | 1.6 billion possible pairs. Wolfram's figure exactly. Still countable against a few hundred billion words — most pairs… | — | Where Do the Probabilities Come From? | H |
| 2406 | `SCRIPT` | JS copy | 60 trillion possible triples. Wolfram's figure. 150 times more possible sequences than words of text in existence. Mos… | — | Where Do the Probabilities Come From? | H |
| 2462 | `SCRIPT` | JS copy | Fitted. You minimised a loss function by turning N knobs. Training does the same with 175 billion, using calculus inst… | — | Inside ChatGPT | M |
| 2478 | `SCRIPT` | JS copy | Weights in the ChatGPT (GPT-3) neural net — 175 billion. Every one is used for every single token generated. | — | Inside ChatGPT | M |
| 2480 | `SCRIPT` | JS copy | 12,288 numbers per token, against 768 in GPT-2. That list is the entire representation of the token. | — | The Concept of Embeddings | M |
| 2482 | `SCRIPT` | JS copy | About 3,000. The other 47,000 are fragments — which is why the model can invent words and why your token count never m… | — | The Concept of Embeddings | M |
| 2522 | `SCRIPT` | figure | alligator, crocodile, lizard / eagle, hawk, heron / turnip, carrot, parsnip | — | The Concept of Embeddings | H |
| 2534 | `SCRIPT` | figure | two dimensions, hand-placed — GPT-3 uses 12,288 | — | The Concept of Embeddings | M |
| 2544 | `SCRIPT` | JS copy | Wolfram's own example: which word sits nearest to "alligator"? Correct — his canonical near pair, because the two are … | — | The Concept of Embeddings | H |
| 2546 | `SCRIPT` | JS copy | Which pair does he give as the example of words placed far apart? His example is turnip and eagle — words that never a… | — | The Concept of Embeddings | H |
| 2592 | `SCRIPT` | JS copy | It has lost the count. Wolfram's trained net does the same — 400,000 weights, still 15% on an invalid close. | — | Inside ChatGPT | M |
| 2595 | `SCRIPT` | JS copy | Balanced at depth 0. Note the 15% still sitting on the invalid close. That is Wolfram's measured figure from his own n… | — | Inside ChatGPT | M |
| 2714 | `SCRIPT` | JS copy | Now go and check the date. If it is wrong, you have just met the harder failure: confident, reproducible and false. Re… | — | UNMAPPABLE | H |
| 2812 | `SCRIPT` | figure | This is the parenthesis problem in a planning document: an exact reconciliation across a long sequence. This is a reco… | — | Inside ChatGPT | L |
| 2856 | `SCRIPT` | figure | The parenthesis problem. Feed-forward with no loop, so it cannot hold an exact running comparison — it approximates on… | — | Inside ChatGPT | L |

#### `session-2/index.html` — 25 references, 4 already section-cited

| Line | § | Kind | On-page text | Already cites | **Proposed section** | Conf |
|---|---|---|---|---|---|---|
| 1219 | `s3` | figure | If the model always picked the top-ranked candidate, Wolfram notes, you get flat text that sometimes repeats word for … | — | It's Just Adding One Word at a Time | H |
| 1221 | `s3` | figure | The slider below applies the actual transformation: each candidate's probability is raised to the power 1/T and the se… | — | It's Just Adding One Word at a Time | L |
| 1226 | `s3` | attribution | 0.8 — Wolfram's essay setting | — | It's Just Adding One Word at a Time | H |
| 1245 | `s3` | figure | Answer in exactly one sentence, in the form “The best thing about AI is its ability to X.” Choose X from: reason, retr… | — | It's Just Adding One Word at a Time | H |
| 1461 | `s8` | figure | Wolfram makes an observation that most prompting advice skips: you can tell the model something once, as part of the p… | — | Beyond Basic Training | M |
| 1657 | `s12` | attribution | Wolfram — “The Concept of Embeddings” and the opening of “Meaning Space.” Kitces (January 2025) on AI notetaker adopti… | **The Concept of Embeddings** | — |  |
| 1690 | `s1` | **quotation** | Wolfram's description of the mechanism is one sentence long: the model asks, over and over, “given the text so far, wh… | — | It's Just Adding One Word at a Time | H |
| 1692 | `s1` | attribution | Take his example prompt. At each position the model produces a ranked list of candidate continuations with probabiliti… | — | It's Just Adding One Word at a Time | H |
| 1708 | `s1` | figure | Wolfram reports that the fall-off across ranked candidates follows an n⁻¹ power law — the straight line on a log-log p… | **It's Just Adding One Word at a Tim** | — |  |
| 1711 | `s1` | attribution | Source: Wolfram, S. (2023), “It's Just Adding One Word at a Time.” Curve shape is as reported (n⁻¹ decay) H. Individua… | **It's Just Adding One Word at a Tim** | — |  |
| 1719 | `s1` | figure | In your AI tool, send exactly this and nothing else: The best thing about AI is its ability to | — | It's Just Adding One Word at a Time | H |
| 1762 | `s4` | figure | Wolfram trained a small transformer on a language with exactly one rule: parentheses must balance. The rule is simpler… | — | Beyond Basic Training | M |
| 1764 | `s4` | figure | After roughly 400,000 trained weights, he reports, the network assigns about a 15 percent probability to a closing par… | — | Beyond Basic Training | M |
| 1781 | `s4` | attribution | Source: Wolfram, S. (2023), “What Really Lets ChatGPT Work?” and the parenthesis-language section. Characterisation as… | **What Really Lets ChatGPT Work?** | — |  |
| 1919 | `FOOTER` | footer | Wolfram, S. (2023, February 14). What is ChatGPT doing … and why does it work? Stephen Wolfram Writings. writings.step… | — | UNMAPPABLE | H |
| 2003 | `SCRIPT` | figure | function probs(){var out=[];for(var n=1;n<=10;n++)out.push((1/n)/H10);return out} | — | Where Do the Probabilities Come From? | M |
| 2007 | `SCRIPT` | figure | var stem="The best thing about AI is its ability to" | — | It's Just Adding One Word at a Time | H |
| 2052 | `SCRIPT` | figure | CANDIDATE RANK  ·  TOP TEN OF ROUGHLY 50,000 TOKENS | — | Inside ChatGPT | M |
| 2085 | `SCRIPT` | JS copy | T = 0.80  ·  Wolfram’s reported essay setting | — | It's Just Adding One Word at a Time | H |
| 2105 | `SCRIPT` | JS copy | 1 distinct output from 5 identical prompts.  Deterministic — and, as Wolfram notes, the text goes flat and repetitive. | — | It's Just Adding One Word at a Time | H |
| 2126 | `SCRIPT` | JS copy | Unbalanced. You ended with N open parentheses. The predictor offered END at 15% anyway. | — | Beyond Basic Training | M |
| 2134 | `SCRIPT` | JS copy | A closing parenthesis here cannot be legal under any circumstance. The predictor assigns it 15% — the figure Wolfram r… | — | Beyond Basic Training | M |
| 2135 | `SCRIPT` | JS copy | END here cannot be legal. The predictor assigns it 15% regardless. | — | Beyond Basic Training | M |
| 2284 | `SCRIPT` | JS copy | Best role, chosen per question in hindsight — Improves accuracy significantly | — | UNMAPPABLE | H |
| 2690 | `SCRIPT` | JS copy | A probability distribution over the whole vocabulary — roughly 50,000 candidate tokens, each with a number attached. T… | — | Inside ChatGPT | M |

#### `session-3/index.html` — 18 references, 5 already section-cited

| Line | § | Kind | On-page text | Already cites | **Proposed section** | Conf |
|---|---|---|---|---|---|---|
| 1103 | `s1` | attribution | Assigned reading: Wolfram (2023), "The Concept of Embeddings" and the opening of "Meaning Space"; Kitces (15 Jan 2025)… | **The Concept of Embeddings** | — |  |
| 1130 | `s2` | title | Embeddings and the Coordinates of Meaning Space | — | UNMAPPABLE | H |
| 1132 | `s2` | **quotation** | Wolfram's definition is the one to hold: an embedding is a way to represent the essence of something by an array of nu… | — | The Concept of Embeddings | H |
| 1134 | `s2` | figure | Wolfram measures how similar the environments are in which different words appear, across five billion words of web te… | — | The Concept of Embeddings | H |
| 1147 | `s2` | attribution | Wolfram, S. (2023, 14 Feb). What Is ChatGPT Doing … and Why Does It Work? — "The Concept of Embeddings"; "Meaning Spac… | **The Concept of Embeddings** | — |  |
| 1157 | `s3` | **quotation** | Wolfram's own worked example contains the failure mode. He explains that "alligator" and "crocodile" will often appear… | — | The Concept of Embeddings | H |
| 1159 | `s3` | figure | Alligators and crocodiles are different animals; the embedding does not encode that they differ, only that people writ… | — | The Concept of Embeddings | H |
| 1175 | `s3` | attribution | Wolfram (2023), "The Concept of Embeddings" — alligator / crocodile and turnip / eagle are Wolfram's examples, reprodu… | **The Concept of Embeddings** | — |  |
| 1189 | `s4` | figure | Two of four preset queries are engineered to fail — not a bug, the alligator-and-crocodile property arriving in a $55,… | — | The Concept of Embeddings | M |
| 1585 | `s8` | figure | He observes that it is sufficient to tell the model something once, as part of the prompt, and it will use it — and th… | — | Beyond Basic Training | H |
| 1597 | `s8` | attribution | Wolfram (2023), "Beyond Basic Training" — the tell-it-once observation and the "riding on top of the framework it alre… | **Beyond Basic Training** | — |  |
| 1666 | `FOOTER` | title | 01 · Mechanism / Embeddings and the Coordinates of Meaning Space / 5 | — | UNMAPPABLE | H |
| 1690 | `FOOTER` | footer | Wolfram, S. (2023, February 14). What is ChatGPT doing … and why does it work? Stephen Wolfram Writings. Assigned for … | **The Concept of Embeddings** | — |  |
| 1784 | `SCRIPT` | JS copy | {n:'alligator',x:88,y:39,cs:'wolf',dy:14},{n:'crocodile',x:92,y:31,cs:'wolf',dy:-9} | — | The Concept of Embeddings | H |
| 1790 | `SCRIPT` | JS copy | Wolfram's own example. Two different animals, placed together because people write about them the same way. | — | The Concept of Embeddings | H |
| 1796 | `SCRIPT` | figure | Illustrative meaning space — Cole document vocabulary (2D projection) | — | The Concept of Embeddings | M |
| 1832 | `SCRIPT` | JS copy | {p:'alligator / crocodile',k:'ctx',w:'Wolfram's example: interchangeable contexts, different referents.'} | — | The Concept of Embeddings | H |
| 1915 | `SCRIPT` | JS copy | This is the alligator-and-crocodile property, arriving in a $55,000,000 valuation question. | — | The Concept of Embeddings | M |

#### `session-4/index.html` — 22 references, 0 already section-cited

| Line | § | Kind | On-page text | Already cites | **Proposed section** | Conf |
|---|---|---|---|---|---|---|
| 1101 | `s0` | attribution | The mechanism thread ends here. Three sessions took you through the architecture — prediction, sampling, embeddings, g… | — | UNMAPPABLE | L |
| 1440 | `s7` | attribution | If there is time · Appendix D3 · 8 min — Where the Assigned Reading Has Gone Stale. Three Wolfram claims from 2023 tha… | — | Inside ChatGPT | L |
| 1495 | `s8` | **quotation** | Reproducibility is the hard part. Wolfram: "if we use the same prompt multiple times, we're likely to get different es… | — | It's Just Adding One Word at a Time | H |
| 1636 | `apx` | title | D3 · 8 min · after §07 — Where the Assigned Reading Has Gone Stale | — | UNMAPPABLE | H |
| 1781 | `sWS` | title | Where the Assigned Reading Has Gone Stale | — | UNMAPPABLE | H |
| 1783 | `sWS` | attribution | Wolfram is a February 2023 source describing a 2020 model, and it is the reading Sessions 1 through 3 are built on. Th… | — | UNMAPPABLE | H |
| 1786 | `sWS` | figure | Trained on balanced-parenthesis sequences, a small transformer assigns roughly 15% probability to a closing parenthesi… | — | What Really Lets ChatGPT Work? | M |
| 1786 | `sWS` | **quotation** | Wolfram: this "isn't right, because that would necessarily lead to an unbalanced parenthesis." | — | What Really Lets ChatGPT Work? | M |
| 1796 | `sWS` | attribution | Wolfram, February 2023 | — | UNMAPPABLE | H |
| 1798 | `sWS` | **quotation** | 175 billion weights, and every token "has to do a calculation involving every single one of these weights." | — | Inside ChatGPT | H |
| 1799 | `sWS` | **quotation** | "ChatGPT doesn't internally have loops or recompute on data… each computational element is used only once." | — | Inside ChatGPT | M |
| 1799 | `sWS` | attribution | The outer loop Wolfram called absent is now the main cost driver and the main quality dial. It is also why the sticker… | — | Inside ChatGPT | M |
| 1800 | `sWS` | **quotation** | "A temperature of 0.8 seems best," as the primary randomness control. | — | It's Just Adding One Word at a Time | H |
| 1803 | `sWS` | attribution | Left column from Wolfram (2023), assigned for Sessions 1–3. … The point is not that Wolfram was wrong — it is that a s… | — | UNMAPPABLE | H |
| 1877 | `FOOTER` | footer | Appendix D3 · Source staleness / Where the Assigned Reading Has Gone Stale / 14 | — | UNMAPPABLE | H |
| 1895 | `FOOTER` | footer | Wolfram, S. (2023, 14 February). What Is ChatGPT Doing … and Why Does It Work? Used for: the reproducibility quote in … | — | UNMAPPABLE | H |
| 3085 | `SCRIPT` | JS copy | "175 billion weights, and every token has to do a calculation involving every single one of these weights." | — | Inside ChatGPT | H |
| 3089 | `SCRIPT` | JS copy | It was accurate for GPT-3, the model Wolfram was describing. The claim aged; it was not wrong when written. | — | Inside ChatGPT | M |
| 3090 | `SCRIPT` | JS copy | "ChatGPT doesn't internally have loops or recompute on data… each computational element is used only once." | — | Inside ChatGPT | M |
| 3093 | `SCRIPT` | JS copy | Correct. The outer loop Wolfram called absent is now the main cost driver and the main quality dial. | — | Inside ChatGPT | M |
| 3095 | `SCRIPT` | JS copy | "A temperature of 0.8 seems best" — temperature as the primary randomness control. | — | It's Just Adding One Word at a Time | H |
| 3130 | `SCRIPT` | JS copy | and the point is not that Wolfram was wrong. It is that a source can be correct, canonical, three years old and stale … | — | UNMAPPABLE | H |

**`session-0.1/index.html`** — no substantive references (only CSS comments naming the `.wolf` block).


**`index.html`** — no substantive references (only CSS comments naming the `.wolf` block).


---

## 3. Bibliography raw material

### 3.1 The spread, measured

**71 footer source keys against 193 confidence chips.** Your figure is exact.
The spread is not merely uneven; it is uneven in two independent directions at once.

| Lesson | Footer keys | Chips | Chips per key | Keys with **zero** chips |
|---|---|---|---|---|
| `index.html` (hub) | 0 | 0 | — | — |
| `session-0.1` | 12 | 61 | 5.1 | 0 |
| `session-1` | **8** | 19 | 2.4 | 0 |
| `session-2` | **20** | 16 | **0.8** | **11** |
| `session-3` | 12 | 37 | 3.1 | **5** |
| `session-4` | 19 | 60 | 3.2 | **7** |
| **total** | **71** | **193** | 2.7 | **23** |

**The two failure directions.**

- **Session 1 is under-keyed.** 8 keys for a lesson that makes 19 chipped claims,
  and — your figure again, confirmed — **20 distinct Wolfram references sitting
  behind those 8 keys**, of which `src-wolfram` carries only 6 chips. One key is
  doing the work of a whole reading list. See §2.
- **Session 2 is over-keyed and under-chipped.** 20 keys, 16 chips, and **11 keys
  that no chip on the page points at** — more than half the bibliography is
  unreferenced. `session-0.1` is the only lesson where every key is used.

Session 0.1's 61 chips against 12 keys is the healthiest ratio in the corpus and
is the pattern the others should be measured against: it was built after the chip
discipline was in place.

### 3.2 The 23 orphan keys, by lesson

Reported by `validate_lesson.py` V4 as a **WARN**, never a failure:
`r.add("WARN", "V4", f"footer sources never referenced by a chip: …")`.

- **`session-2` (11)** — `src-laplace`, `src-anthropic-fluency`, `src-zheng-persona`,
  `src-pricing`, `src-morningstar`, `src-rr8513`, `src-rr200464`, `src-woelbing`,
  `src-davidson`, `src-kessler`, `src-irc`
- **`session-3` (5)** — `src-kitces-advisortech`, `src-iskowitz`,
  `src-lee-cognitive`, `src-finra2409`, `src-secpri`
- **`session-4` (7)** — `src-finra-inj`, `src-finra2409`, `src-anthropic-terms`,
  `src-cve`, `src-owasp`, `src-surfshark`, `src-hallowell`

They are **not one problem**. At least four kinds are mixed together, and a single
"add a chip" remedy is wrong for three of them:

1. **Deliberately fabricated exercise material.** `src-kessler` (*"Kessler v.
   Commissioner, 152 T.C. 88 (2019), appearing in the §05 triage, does not exist.
   It is a deliberately fabricated citation, labelled as exercise material"*) and
   `src-hallowell` (*"Hallowell v. Commissioner, T.C. Memo. 2023-217, does not
   exist"*). These **must never carry a confidence chip** — a chip asserts the
   claim is evidenced, and the whole point is that it is not. They need an
   explicit exemption in `EDITORIAL.md`, and V4's warning on them is a false
   positive that will recur forever.
2. **Legal authority cited descriptively, not as evidence for a claim.**
   `src-irc` (*"Referenced descriptively; verify against the current Code"*),
   `src-rr8513`, `src-rr200464`, `src-woelbing`, `src-davidson`. These are the case
   apparatus travelling with `CASE.md`, not claims the lesson makes.
3. **Background reading with no on-page claim.** `src-laplace`,
   `src-anthropic-fluency`, `src-morningstar`, `src-lee-cognitive`.
4. **Genuinely lost chips.** `session-4`'s `src-finra2409`, `src-owasp`,
   `src-cve`, `src-anthropic-terms` all have `Used for:` clauses naming specific
   on-page claims, and no chip points at them. These are the real defects.

**Consequence for `EDITORIAL.md`:** the rule cannot be "every footer key must have
a chip". It has to be "every footer key must have a chip **or a declared reason
not to**", with the reason machine-readable. That is a markup decision — see §3.4.

### 3.3 Duplicates keyed differently, and cross-lesson gaps

Five source ids appear in more than one lesson, and the citation text is **not**
byte-identical for any of them:

| id | Lessons | Chips (by lesson) |
|---|---|---|
| `src-wolfram` | S1, S2, S3, S4 | 6 / 3 / 5 / 2 |
| `src-case` | S1, S2, S3, S4 | 1 / 3 / 5 / 19 |
| `src-magesh` | S2, S3, S4 | 1 / 2 / 1 |
| `src-finra2409` | S1, S3, S4 | 2 / **0** / **0** |
| `src-secpri` | S3, S4 | **0** / 1 |
| `src-aa` | S1, S2, S4 | 2 / 2 / 9 |
| `src-pricing` | S1, S2 | 4 / **0** |

`src-finra2409` is the sharpest case: the **same regulatory notice**, keyed
identically in three lessons, chipped in one and orphaned in two — and session 4,
the compliance lesson, is one of the two. Detailed comparison of the differing
citation strings is in §3.5.

### 3.4 Can `BIBLIOGRAPHY.md` be generated? — the short answer

**Not today, and the blocker is not tooling. It is that the citations are free
prose, not fields.** A generator can extract, from `<li id="src-…">`, exactly
three things reliably: the **id**, the **href** where one is present, and the
**confidence letter** from the trailing `<span class="conf …">`. Everything a
bibliography needs — author, year, title, publisher, retrieval date, pinpoint —
is inside one unstructured sentence, differently shaped in every lesson. Compare:

> `session-1` — `<b>Wolfram, S. (2023, 14 February). What Is ChatGPT Doing &hellip; and Why Does It Work?</b> <a…>writings.stephenwolfram.com</a>. Assigned reading. Used for: …`
>
> `session-2` — `Wolfram, S. (2023, February 14). <em>What is ChatGPT doing … and why does it work?</em> Stephen Wolfram Writings. <a…> — sections used: …`
>
> `session-3` — `Wolfram, S. (2023, February 14). <em>What is ChatGPT doing … and why does it work?</em> Stephen Wolfram Writings. Assigned for Session 3: "The Concept of Embeddings" …`

Same work, three different date formats, two different capitalisations of the
title, `<b>` in one and `<em>` in the others, and the "used for" clause under three
different labels. A scraper would produce three bibliography entries for one essay.

The full recommendation, including whether the source of truth should be a new
`SOURCES.md` at repo root injected the way `CASE.md` is, is in §3.6 below.

---

### 3.5 The finding that was not on the list: 27 of 193 chips point at the wrong source

**14.0% of every confidence chip in the corpus resolves to a key that is not the
source for the claim it sits on.** `verify-migration.mjs` check 18 and
`validate_lesson.py` V4(a) both pass, because both assert only that the key
*resolves* to a footer entry — neither can know whether it is the *right* entry.

Two of these are textbook off-by-one cascades, and I verified both verbatim in the
source before reporting them.

**`session-4/index.html:1345`** — one sentence, three sources, shifted by one:

> Gartner, 302 security leaders: 62% of organisations hit by at least one deepfake
> attack in twelve months, 37% on a live video call.`<span class="conf m" data-src="src-gartner">M</span>`
> Deloitte projects US GenAI-enabled fraud losses from $12.3 billion in 2023 to $40
> billion by 2027 &mdash; a projection.`<span class="conf m" data-src="src-gartner">M</span>`
> Two outlets citing the same Surfshark 2026 analysis report $2.19 billion and
> $3.7 billion.`<span class="conf l" data-src="src-deloitte">L</span>`

Gartner claim → `src-gartner` ✅ · Deloitte claim → `src-gartner` ✗ · Surfshark
claim → `src-deloitte` ✗. All three keys exist in the footer, correctly worded.
**`src-surfshark` is not an orphan — it is the tail of an off-by-one.**

**`session-3/index.html:2044`** — a chart caption that names its three sources in
order and chips them one row down: Magesh → `src-vectara` ✗, Vectara →
`src-anthropic-ctx` ✗, Anthropic → `src-anthropic-ctx` ✅.

The tally:

| Lesson | Mis-wired chips | of total | Note |
|---|---|---|---|
| `session-0.1` | **0** | 61 | clean |
| `session-1` | 4 | 19 | 3 legend glyphs wired to real sources, 1 pricing→aa |
| `session-2` | 5 | 16 | **31% of the file’s chips** |
| `session-3` | 7 | 37 | includes one 2-chip cascade |
| `session-4` | 11 | 60 | includes one 2-chip cascade; `src-daly` wrong on 5 of 6 |
| **total** | **27** | **193** | **14.0%** |

Among them: `src-case` — *"entirely synthetic, not based on any client living or
dead"* — is carrying the authority for a peer-reviewed CHI 2025 paper and for the
compliance dates of a federal regulation; `src-finra2026` is carrying the OWASP
Top 10; `src-regsp` is carrying Anthropic’s consumer retention terms.

**Session 0.1 is the only lesson whose chip layer can be trusted as written.** It
is also the only lesson whose footer states a written convention for how chips work.

**This changes the bibliography answer.** A generator run against the corpus today
would publish all 27 as fact, in an artifact that looks more authoritative than the
page it came from. Fixing the wiring is a precondition for generating anything, not
a follow-up to it.

### 3.6 Duplicates keyed differently — the same work, four incompatible citations

### 3a. `src-wolfram` — one essay, four incompatible citations

**session-1:2047**
> `<b>`Wolfram, S. (2023, 14 February). What Is ChatGPT Doing … and Why Does It Work?`</b>` `<a href="…">`writings.stephenwolfram.com`</a>`. Assigned reading. Used for: next-token prediction, the temperature passage, tokens and the GPT-2 token values, embeddings and vector lengths, the parenthesis-counting limit, and the brain-scale comparison. Quoted in substance, verified against the essay. `<span class="conf h">H</span>`

**session-2:1919**
> Wolfram, S. (2023, February 14). `<em>`What is ChatGPT doing … and why does it work?`</em>` Stephen Wolfram Writings. `<a href="…">`writings.stephenwolfram.com`</a>` — sections used: "It's Just Adding One Word at a Time," "Where Do the Probabilities Come From?," "What Is a Model?," the temperature passage, and the parenthesis-language discussion.

**session-3:1690**
> Wolfram, S. (2023, February 14). `<em>`What is ChatGPT doing … and why does it work?`</em>` Stephen Wolfram Writings. Assigned for Session 3: "The Concept of Embeddings" and the opening of "Meaning Space and Semantic Laws of Motion." `<a href="…">`writings.stephenwolfram.com`</a>`

**session-4:1895**
> `<b>`Wolfram, S. (2023, 14 February). `<a href="…">`What Is ChatGPT Doing … and Why Does It Work?`</a></b>` Used for: the reproducibility quote in §08 and the three stale claims in Appendix D3. `<span class="conf h">H</span>`

Four differences that a generator must resolve: **date format** (`2023, 14 February` in s1/s4 vs `2023, February 14` in s2/s3); **title case** (`What Is ChatGPT Doing` vs `What is ChatGPT doing`); **publication name present** (s2/s3 say "Stephen Wolfram Writings", s1/s4 omit it); **markup role** (s1/s4 wrap author+title in `<b>` and s4 nests the `<a>` *inside* the `<b>`; s2/s3 put only the title in `<em>` and the link at the end); **confidence** (s1/s4 declare H, s2/s3 declare nothing). There is no field a parser can align on.

### 3b. `src-magesh` — same paper, three different figure sets, one attributed elsewhere

**session-2:1925** (footer): "Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. D., & Ho, D. E. (2025). *Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools.* Journal of Empirical Legal Studies." — **no volume/issue/page**
**session-3:1693**: "…*Journal of Empirical Legal Studies, 22*(2), 216." — sentence-case title
**session-4:1894**: "…Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools." *Journal of Empirical Legal Studies* 22(2), 216. **Used for: 17% / 33% / 43% and the response-length correlation.**"

**Do the figures agree? Not quite.**

| | s2 (L1525) | s3 (L1274) | s4 (L1392 + footer) |
|---|---|---|---|
| query count | "**202** preregistered queries" | not stated | "**Over 200** preregistered legal queries" |
| Lexis+ AI | "**~17%**" | "**>17%**" | "17%" |
| Westlaw | "~33%" | "~33%" | "33%" |
| GPT-4 | **absent** | "GPT-4 **43%**" | "43%" |
| test date | absent | "tools tested May 2024" | "preprint May 2024, published … 2025" |
| chipped to | **`src-dahl-fictions`** ❌ | `src-magesh` ✅ | `src-magesh` ✅ |

`~17%` (approximately) and `>17%` (at least) are **different claims about the same measurement**, both labelled H. s2 gives the exact n (202) that s4 rounds ("over 200"). s2 drops the GPT-4 comparator entirely. And s2's version of the finding is chipped to the *other* Stanford paper.


### 3.7 Cross-lesson gaps


**G1 — FINRA 24-09 (s1, s3, s4).** s1 chips it twice; s3 and s4 both carry the footer entry with **zero chips**. In s3 the entry exists solely to back the `SRCS` widget array at L2412 (`{t:'FINRA Regulatory Notice 24-09 (2024)',sch:false,pil:'reg'}`) and the "three regulatory pillars" answer string at L2434. In s4 it survives only in a JS answer-key string at L2646. Neither lesson makes a chippable prose claim from it. **Verdict: s3/s4 entries are catalogue rows for interactive widgets, not page claims** — see §5, class (c).

**G2 — Magesh figures (s2, s3, s4).** See §3b. Figures *nearly* agree; the `~17%` / `>17%` split and the missing GPT-4 43% in s2 are real divergences, and s2's chip is mis-wired to `src-dahl-fictions`.

**G3 — Artificial Analysis versioning (s1, s2, s4).** See §3c. Not the same chart; three retrievals of a live index under one key, with an incoherent v4.1 / v4.1.1 ordering and s1's footer date (28 July) contradicting its own body date (17 and 24 July).

**G4 — Regulation S-P (s3, s4).** s4 has `src-regsp` with 5 chips. **s3 has no Reg S-P footer entry**, yet: L1463 asserts "The 2024 Regulation S-P amendments are named as a citable source; their compliance dates are `<span class="conf m" data-src="src-case">M — not verified in this build</span>`" — a real regulation's compliance dates chipped to the synthetic case — and L2414 lists `{t:'Regulation S-P, 2024 amendments',sch:false,pil:'reg'}` in the homework widget, and L2434 names it as one of "the three regulatory pillars." Meanwhile s4 states those dates as verified H: "**Compliance dates 3 December 2025 and 3 June 2026**" and L1190 "larger entities from 3 December 2025 and advisers under $1.5 billion from 3 June 2026. Both dates have passed.`<span class="conf h">H</span>`". **Session-3 marks unverified exactly what session-4 verifies, and neither cross-references the other.** This is the sharpest cross-lesson gap in the repo.

**G5 — SEC FY2026 Exam Priorities §VII (s3, s4).** s3 = 0 chips (widget row L2413 + the "Read before Session 4" card at L1495). s4 = 1 chip. Same document, two date forms (§3e).

**G6 — Anthropic pricing (s1, s2).** s1 chips it 4×; s2 has the entry with 0 chips and routes its pricing arithmetic to `src-case`. Additionally s1's own body (L1489) routes an Anthropic pricing claim to `src-aa`. Three different keys have carried Anthropic pricing claims across two lessons.

**G7 — Wolfram (s1, s2, s3, s4).** Four different section assignments from one essay, no shared section namespace: s1 covers six topics, s2 names five sections by title, s3 names two by title, s4 names "the reproducibility quote in §08 and the three stale claims in Appendix D3." A merged bibliography cannot state which parts of Wolfram the course actually assigns without reading all four.

**G8 — SEC AI-washing enforcement (s1 only).** `src-sec-ai` flags a live disagreement — "Penalty figures are reported at two values across sources; the majority figure is stated on the page" — and its two chips are both legend decoration (§1i). No other lesson carries it, and the "majority figure" is asserted on the page with no chip resolving to the source that hedges it.

**G9 — Anthropic first-party docs (s0.1 vs everywhere).** Session-0.1 holds 12 Anthropic support-article keys; no other lesson reuses one. s4's `src-anthropic-terms` and s3's `src-anthropic-ctx` and s1/s2's `src-pricing` are four more Anthropic-published works under four more keys. Sixteen first-party Anthropic sources, five lessons, zero shared keys, five different citation formats.

---


### 3.8 Can `BIBLIOGRAPHY.md` be generated? — the verdict

**Not from what is on disk today. The blocker is not tooling; it is that the
citations are free prose in five mutually incompatible house styles, and that 14%
of the chip layer is mis-wired.**

**What a generator could extract today, with no new markup:** the key (`id="src-*"`
— 71 of 71, and zero dangling chip references); the file and therefore the lesson;
the raw `<li>` innerHTML as one opaque blob; chip counts and grades per key per
file. Then it falls off a cliff — a URL is present in **21 of 71** entries (30%),
a footer confidence chip in **44 of 71** (62%), a "Used for:" clause in **33 of 71**
(46%), and a parenthesised year in **25 of 71**.

**What is missing, specifically:**

| Field | Why it cannot be parsed |
|---|---|
| Author | No delimiter. `session-1` wraps author, date and title in one `<b>` run; `session-0.1` uses a bare leading `Anthropic.`; `src-wiretap` has no author at all and holds two statutes in one entry |
| Year | Only 25 of 71 carry a parenthesised `(YYYY`. The rest are inline ("as of 28 July 2026", "retrieved August 2026") or absent |
| Title | 37 in `<em>`, some in `<b>`, some bare — **and the two tags carry opposite semantics between files**: in s0.1/s2/s3 `<em>` wraps the title alone; in s1/s4 `<b>` wraps author + year + title as one run, with s4 nesting the `<a>` *inside* the `<b>` |
| URL | Absent from 70%. Twelve of session-4’s nineteen sources have none |
| Container | s1/s4 use `<ol class="srcs">`; s2 a bare `<ol>`; s3 a **`<ul>`**; s0.1 an unclassed `<ol>` **with an identically-styled sibling `<ol>` eleven lines above holding the "Designed defects" list**. Only the `id="src-"` prefix is safe to select on |
| Namespace | Sixteen Anthropic-published works under sixteen unrelated keys. FINRA has three keys under three naming schemes (`src-finra2409` by notice, `src-finra2026` by year, `src-finra-inj` by topic). No rule a new author could follow |
| Canonical string | All seven shared keys carry materially different text per lesson, with no arbitration rule |

**Recommendation: a new hand-edited `SOURCES.md` at repo root, mirroring `CASE.md`
exactly, with the lesson footers generated and injected from it. Not scraping.**

Four reasons, in order of weight:

1. **Scraping makes drift undetectable in principle.** `verify-case.mjs`’s value is
   that it can say *this block does not match the source of truth*. If the footers
   **are** the truth, a scraper would emit a bibliography saying Wolfram has four
   titles and be correct to do so. `build-case.mjs`’s own stated philosophy —
   *"Nothing here reconstructs a fact from memory; every value is captured text"* —
   has no principled way to pick one of five captured texts.
2. **The 27 mis-wired chips would be published as fact** in an artifact that looks
   more authoritative than the page it came from. Only a keyed registry with a
   declared `used_for` per source makes *"this chip’s claim is outside its source’s
   scope"* a checkable proposition.
3. **The pattern is already proven here, on a harder problem** — numeric facts with
   recomputed identities, across the same six files, with idempotent injection and
   three-mode verification.
4. **`CASE.md` Part I is already half the work and is generated into nothing.**
   `build-case.mjs` contains **zero** references to Part I, whose six markdown
   tables — IRC sections, Treasury regs, revenue rulings, notices, case law, PLRs,
   with explicit `[UNVERIFIED — needs source]` rows — are the best-structured
   citation data in the repository. `SOURCES.md` should either absorb those rows or
   cross-reference them, so the repo has exactly one authorities list.

The schema must carry the special classes explicitly, or the checker inherits the
same false positives forever: `kind: fabricated` (Kessler, Hallowell — labelled,
exempt from chip requirements, **required** to be disclosed on-page),
`kind: background` (Laplace, Iskowitz, AI fluency — exempt, must state why),
`chip_exempt: case-block` (the four session-2 tax rulings that live inside the
hash-verified CASE span), and `moving_target: true` with a mandatory `retrieved`
date and `index_version` — which would have caught the Artificial Analysis
v4.1 / v4.1.1 incoherence.

**Drift detection:** `verify-bibliography.mjs` hashes each injected `SRC:BEGIN` /
`SRC:END` span exactly as `verify-case.mjs` does, and reports the same three
distinct failures — never injected, hand-edited inside, stale against the current
build. **Sequence matters: fix the 27 mis-wires first.** Generating over them
launders them.

---

## 4. Vocabulary inventory

Design as decided, restated so the report is self-contained: a small `(?)`
affordance on the **first occurrence of each term per section**, opening a
definition of **two sentences maximum**, working on **both hover and tap**; plus a
**full vocabulary table at the very end of each lesson, after the last appendix
section** — term, definition, and a "read more" link joining the bibliography.
**Nothing exists yet. This is greenfield.**

### 4.1 The size of it

Every term a CFP with no machine-learning background would not know, read out of
the actual files including the exercise copy that lives in JavaScript string
literals — a student reads that copy, so it counts.

| Lesson | Terms inventoried | Currently undefined on the page | Blocked exercises | of which HIGH |
|---|---|---|---|---|
| `session-0.1` | 73 | 50 | 15 | **7** |
| `session-1` | 98 | 58 | 21 | **14** |
| `session-2` | 70 | 56 | 16 | **6** |
| `session-3` | 73 | 37 | 16 | **4** |
| `session-4` | 99 | 66 | 19 | **5** |
| **total** | **413** | **267** | **87** | **36** |

By family, across all five lessons:

| Family | Count |
|---|---|
| ML concepts | 156 |
| Product jargon (features, modes, tiers, vendor names for things) | 76 |
| **Mathematical notation** | **56** |
| Security and compliance | 53 |
| Statistics | 41 |
| Retrieval | 25 |
| Finance terms used in an unfamiliar sense | 6 |

**97 of the 413 are mathematics and statistics** — log–log axes, power law,
n-gram, entropy, cosine similarity, percentile, probability mass, orders of
magnitude, second derivative, log-scaled sliders, `40,000ⁿ`, `n⁻¹`, `a + bx + cx²`.
You were right to insist these be counted. A vocabulary pass that inventoried only
AI words would have missed almost a quarter of the problem, and the maths terms
cluster in exactly the interactions students are asked to operate.

**366 distinct term strings across the corpus, and only 11 appear in three or more
lessons** — `token`, `weights`, `system prompt`, `temperature`, `context window`,
`MTok`, `prompt`, `Intelligence Index`, `hallucination`, `transformer`, `corpus`.
That is a design fact worth acting on: a single global glossary would be ~97%
lesson-local. The shared eleven are the ones that need one definition everywhere;
the rest belong to their lesson.

### 4.2 The priority: exercises a student cannot start

**87 interactive exercises across the corpus carry instructions that cannot be
followed without a term the page never defines. 36 of them are HIGH severity —
the student cannot begin.**

Two of those are the very first thing a student does in their lesson:

- `session-1` `s2` L1322, the §02 distribution picker — *"Click a candidate to
  append it — the next distribution follows your choice"* — **the first interaction
  in the lesson**, and `candidate`, `distribution`, `token` and `append` are all
  undefined at that point.
- `session-0.1` `s1` L1065, the prediction-commit vote — the second section of the
  lesson, and the reviewer's note is blunt: *"the question stem itself is
  missing"*, before you even reach `weights`, `trained parameters`, `layer 4`.

And the work-along gates — the sentences that tell a student what "done" means —
are themselves blocked. `session-1` `s2` gate `g2`: *"Place six tokens, generate at
all three temperatures, and switch to log–log axes."* Three undefined terms in
seventeen words, in the instruction that defines completion.

**`session-0.1` — 7 HIGH-severity blocked exercises**

| Section | Line | Exercise | Terms the instructions use and the page never defines |
|---|---|---|---|
| `s1` | 1065 | prediction-commit binary vote (pcVote / pcOut, data-task=t-frame-predict) | `the question stem itself is missing`, `weights`, `trained parameters`, `layer 4`, `invoked tools`, `context`, `research (product mode)` |
| `s2` | 1117 | commit-first model quiz, five items (tierQuiz, data-task=t-model-tier) | `token`, `700,000-token`, `1M`, `200K`, `context window`, `effort selector`, `extended thinking`, `adaptive`, `knowledge cutoff`, +1 more |
| `s4` | 1243 | ranking prequestion, largest context block (ctxRank / ctxRankOut, data-task=t-ctx-bud | `tool definitions`, `chunk`, `context window / share of a full window`, `connector`, `conversation history as a context block`, `monotonically` |
| `s4` | 1252 | context window inspector, twelve-control rail (ctxRail / ctxBlocks / ctxBar, data-tas | `context window`, `token`, `context block`, `system prompt`, `memory (search / generate / both)`, `project instructions vs project knowledge`, `skill body vs skill name+description`, `connector tool definitions`, `code execution`, +5 more |
| `s5` | 1266 | estimate-then-reveal logarithmic sliders (guessPanel / guessGo, data-task=t-retrieval | `tool call`, `research (product mode)`, `web search (product mode)`, `logarithmic` |
| `s6` | 1316 | two-bucket persistence sorter, twelve chips (sortChips / whyA / whyB, data-task=t-per | `incognito chat`, `memory (feature)`, `paused vs reset memory`, `project knowledge`, `custom style`, `skill`, `the directory`, `past-chat search`, `turn`, +5 more |
| `s7` | 1353 | three-column skill/connector/plugin sorter, fifteen statements (pkBoard / pkKey, data | `progressive disclosure`, `context (on every turn)`, `code execution`, `directory / view-only`, `organisation sharing toggle`, `authentication flow`, `tool definitions`, `token-intensive`, `sub-agents`, +5 more |

**`session-1` — 14 HIGH-severity blocked exercises**

| Section | Line | Exercise | Terms the instructions use and the page never defines |
|---|---|---|---|
| `s2` | 1322 | §02 distribution picker (data-comp=distribution-picker) — the first interaction in th | `candidate`, `distribution`, `token`, `append` |
| `s2` | 1339 | §02 temperature generator — three T buttons plus Generate | `T`, `temperature`, `token`, `Distinct tokens`, `Longest repeat` |
| `s2` | 1353 | §02 power-law chart axis toggle | `log–log axes`, `linear axes`, `power law`, `rank`, `tail`, `mass`, `n⁻¹` |
| `s2` | 1361 | §02 work-along gate covering the picker, the temperature generator and the axis toggl | `token`, `temperature`, `log–log axes` |
| `s10` | 1488 | §05 capability-against-price explorer — budget slider (data-comp=click-map-explorer,  | `Intelligence Index`, `cost per index task`, `index point`, `efficient frontier`, `log scale`, `tier` |
| `s11` | 1533 | §06 practice-cost sandbox plus the Cole document-pass tier buttons (gate g11) | `metered`, `tier`, `input tokens`, `output tokens`, `prompt caching`, `cache hit`, `API`, `MTok` |
| `s12` | 1545 | §07 tier quiz, six items, three answer buttons (data-comp=commit-first-mcq, gate g12) | `tier`, `Haiku-class`, `Sonnet-class`, `Opus / Fable-class`, `arbitrary fact`, `feed-forward network`, `the parenthesis problem`, `the objective`, `multi-step reasoning` |
| `s3` | 1723 | Appendix A1 n-gram letter generator — Order 1 to Order 4 buttons | `n-gram`, `order`, `corpus`, `letter pairs` |
| `s3` | 1755 | Appendix A1 combinatorial-wall slider and gate (gate g3) | `order`, `n`, `40,000^n`, `10^36`, `orders of magnitude`, `log scale` |
| `s4` | 1805 | Appendix A2 hand-fit lab (data-comp=hand-fit-lab, gate g4) | `loss`, `loss function`, `knobs`, `weights`, `basis`, `a + bx + cx²`, `minimising` |
| `s7` | 1869 | Appendix A4 parenthesis sequence builder (data-comp=distribution-picker, gate g7) | `depth`, `token`, `invalid token`, `<END>`, `transformer`, `feed-forward`, `simulated shallow model` |
| `s8` | 1938 | Appendix A5 sampler lab — work-along target (data-comp=pipeline-lab, gate g8) | `sampler`, `surviving mass`, `leader`, `Top share`, `entropy`, `effective choices`, `surprise`, `second derivative`, `cumulative`, +8 more |
| `s4` | 2487 | Appendix A2 scale-guess sliders — three log-scaled sliders and Submit all three | `weights`, `neural net`, `embedding vector`, `token`, `whole words`, `log-scaled slider (the slider moves in powers of ten with no notice)` |
| `s8` | 2607 | Appendix A5 sampler module descriptions rendered next to each checkbox and slider | `cumulative`, `absolute second derivative`, `sorted distribution`, `entropy`, `surprise`, `Top P`, `p^(1/T)` |

**`session-2` — 6 HIGH-severity blocked exercises**

| Section | Line | Exercise | Terms the instructions use and the page never defines |
|---|---|---|---|
| `s0` | 1116 | Retrieval bridge — four free-text recall boxes (#bridge, 'Reveal all four') | `next-token prediction`, `probability distribution`, `vocabulary`, `token`, `grounded`, `cost per finished task` |
| `s3` | 1221 | Temperature slider (#temp) plus 'Run the same prompt 5 times' (#reroll) | `raised to the power 1/T`, `renormalised`, `sharpens the distribution`, `flattens`, `samples`, `distribution`, `deterministic`, `argmax` |
| `s5` | 1290 | Monthly cost estimator (#volRuns, #volIn, #volOut → #costOut 'MONTHLY API COST') | `token`, `input tokens`, `output tokens`, `3:1 input-to-output token ratio`, `API`, `per million tokens` |
| `s1` | 1692 | Appendix B1 — next-token bar clicker (#pbars / #strm, buttons 'Always take the top ba | `candidate continuation`, `probability distribution`, `sample by probability`, `token`, `stop token`, `candidate rank`, `power law`, `log-log plot` |
| `s2` | 1736 | Appendix B2 — two-toggle Laplace comparison panel (#cbWorld / #cbModel → #lapOut) | `cardinality`, `p ≈ 0.52`, `distribution`, `continuations`, `training corpus` |
| `s4` | 1767 | Appendix B3 — parenthesis sequence extender (#parenBars / #parenStream / #parenVerdic | `token`, `transformer`, `trained weights`, `feed-forward pass`, `predictor`, `forward pass`, `attention`, `neuron` |

**`session-3` — 4 HIGH-severity blocked exercises**

| Section | Line | Exercise | Terms the instructions use and the page never defines |
|---|---|---|---|
| `s4` | 1194 | The Retriever on the Cole Document Set — preset buttons, free-text query box, Rank ch | `cosine similarity`, `IDF index`, `tf × ln(1 + N/df)`, `vector`, `score (0–100 similarity)`, `Margin`, `scored term`, `query`, `retriever` |
| `s6` | 1237 | Grounded-Answer Prediction and Your Own Failure Count — commit buttons plus the two-f | `grounded query`, `BM25`, `contextual embeddings`, `reranking`, `lexical index`, `vector index`, `relative reduction (67%)` |
| `s16` | 1483 | Peer exchange on the draft outlines — four 0-to-3 scoring rows (data-comp="work-along | `model tier` |
| `sHY` | 1535 | Stage-by-Stage Effect on the Failure Rate — three toggle buttons labelled "Contextual | `contextual embeddings`, `BM25`, `re-ranking`, `lexical index`, `vector index`, `candidate set`, `embedding-only baseline` |

**`session-4` — 5 HIGH-severity blocked exercises**

| Section | Line | Exercise | Terms the instructions use and the page never defines |
|---|---|---|---|
| `s0` | 1104 | Retrieval bridge — four-item Session 3 recall quiz (#bridgeQuiz) | `grounding`, `retrieval`, `fine-tuning`, `weights`, `corpus`, `hallucinate`, `transcription/extraction/categorization pipeline` |
| `s5` | 1332 | Free-text injection-resistance scorer — write a standing instruction and score it (#i | `system prompt`, `heuristic`, `egress/exfiltration`, `untrusted channel`, `outbound action` |
| `s8` | 1497 | Audit-record three-category classification quiz (#auditQuiz) | `model identifier`, `effort setting`, `product family vs model`, `reasoning setting`, `retrieved source text`, `reproducibility` |
| `sW1` | 1687 | Tournament sampling widget — Run tournament / Key A / Key B / Watermark off (#tsRun,  | `token`, `candidate`, `layer`, `key`, `hash`, `g-value`, `m = 3`, `pseudo-random`, `bracket` |
| `sWS` | 1789 | Appendix D3 commit-first quiz on the three stale Wolfram claims (#staleQuiz) | `weights`, `token`, `parameters`, `mixture-of-experts`, `reasoning model`, `temperature`, `effort or reasoning level`, `API`, `dense activation`, +1 more |

### 4.4 Drafted definitions — sample across the families you named

Full records for all 413 terms are in the workflow output; this is the cut that
covers the specific terms you asked about, plus the notation cluster.

| Term | Category | First seen | Currently defined? | Drafted definition (two sentences maximum) |
|---|---|---|---|---|
| **token** | ml-concept | `session-0.1` §lmbox L958 | NO — the page prints 700,000-token, 1M, 200K,  | A token is a chunk of text roughly three-quarters of a word long, and everything sent to or returned by a model is counted in tokens. A 300-word follow-up email is about 400 tokens. |
| **context window** | ml-concept | `session-0.1` §s0 L1007 | NO — section 4 is built entirely on it and nev | The context window is the total amount of text the model can hold in front of it while producing one answer, measured in tokens. Haiku 4.5 holds 200K tokens, so a 700,000-token document set does not fit and the parts that do not fit are simply never read. |
| **system prompt** | ml-concept | `session-0.1` §lmbox L951 | Partial only, at line 1428: "Runs 1 to 3 are t | A system prompt is a block of instructions the vendor puts in front of your message every time, written by them and invisible to you. It is why the same question typed into the chat box and into the raw API comes back in two different voices. |
| **chunk (retrieved chunk)** | retrieval | `session-0.1` §s4 L1246 | NO | A chunk is a small slice of a longer document, and retrieval pulls only the slices that look relevant instead of the whole file. A 60-page investment policy statement in project knowledge might enter the answer as two paragraphs. |
| **temperature** | ml-concept | `session-0.1` §lmbox L958 | NO | Temperature is a dial for how much the model varies its wording between runs, roughly 0 to 1. At temperature 1.0 the same prompt sent twice comes back differently worded, which is why a live demo never repeats exactly. |
| **token-intensive** | ml-concept | `session-0.1` §s1 L1079 | NO | Token-intensive means the thing occupies a large share of the window before you have typed a word. Connectors are the named example: each loads its tool definitions on every turn, used or not. |
| **next-token prediction** | ml-concept | `session-1` §s1 L1257 | YES, partially — line 1308 "a machine that doe | Next-token prediction is the model's only move: given the text so far, score every possible next chunk and pick one, then repeat. Type 'The applicable federal' and 'rate' scores high, 'giraffe' scores near zero — and nothing at any point checked whether the finished sentence was true. |
| **distribution** | ml-concept | `session-1` §s2 L1322 | NO — the picker shows bars and percentages but | A distribution is the full list of possible next words with a percentage on each, adding up to 100%. In the §02 picker, 'a 30% discount' holds 33% and 'a 45% discount' holds 9% — both are on the list, and the machine may take either. |
| **rank** | math-notation | `session-1` §s2 L1332 | NO — the chart axis at line 2333 reads "Rank o | Rank is a candidate's position in the scored list: rank 1 is the most likely next word, rank 40 the fortieth most likely. The §02 chart's horizontal axis is rank, and it says nothing about meaning. |
| **power law** | math-notation | `session-1` §s2 L1349 | NO — line 2339 names it ("That is the n⁻¹ powe | A power law means each rank is worth a fixed fraction of the one above it — the 2nd candidate about half the 1st, the 10th about a tenth. Word frequency behaves this way: 'the' is enormous, and there is no clean point where the rare words stop mattering. |
| **log–log axes** | math-notation | `session-1` §s2 L1353 | NO — it is a button label and a readout headin | On log–log axes both rulers count by multiplying — 1, 10, 100, 1,000 — instead of adding. A curve that plunges too steeply to read on ordinary axes becomes a straight line, which is the entire reason to press the button. |
| **probability mass ("of the mass", "** | statistics | `session-1` §s2 L2338 | NO | Mass is simply the share of the whole 100% that one word, or a group of words, holds. 'The leader holds 55% of the surviving mass' means that of what is left after the cuts, the top word has 55 cents in every dollar. |
| **illustrative / simulated distribut** | product-jargon | `session-1` §s2 L1326 | PARTIAL — line 1201 "The outputs you see are r | Illustrative or simulated means the numbers were built to show the shape of the behaviour rather than measured off a live model. The §02 percentages are invented; the three birthday answers in §04 are real recorded runs. |
| **tokenisation** | ml-concept | `session-1` §s5 L1388 | NO | Tokenisation is the fixed rule that chops your text into tokens before the model sees anything. Two vendors chop the same trust paragraph differently, so the identical document can cost different amounts on each. |
| **token id / token values** | ml-concept | `session-1` §s5 L1375 | YES — the same line, 1375, gives the worked ex | Every token carries a permanent number, and the model works with the numbers rather than the letters. In GPT-2, 'the' is token 914 and ' cat' — with its leading space — is token 3542. |
| **token vocabulary** | ml-concept | `session-1` §s5 L1375 | PARTIAL — line 1800 table row "Token vocabular | The vocabulary is the complete fixed set of tokens a model is allowed to use — about 50,000 of them. Only around 3,000 are whole words, so the other 47,000 are fragments the model can glue into words it never saw. |
| **input tokens / output tokens** | product-jargon | `session-1` §s10 L1477 | NO — the two columns are priced differently wi | Input tokens are what you send in, output tokens are what comes back, and output costs about five times as much. Reading 125,000 tokens of Cole documents costs $0.63 on Opus 5; the 8,000-token memo it writes back costs $0.20. |
| **Intelligence Index** | statistics | `session-1` §s10 L1460 | NO — it is the vertical axis label of the only | The Intelligence Index is one outside firm's single score for a model, averaged across a fixed set of test tasks. It is a benchmark like a fund's category ranking — useful for sorting, and not a measurement of how the model handles your work. |
| **hallucination** | ml-concept | `session-1` §s9 L1412 | NO — the word appears in nav labels, an instru | A hallucination is a confident, well-formed answer that is simply made up — a citation, rate or date the model produced rather than looked up. Three runs of the same birthday question returning three different dates is the plain version. |
| **reasoning tokens** | product-jargon | `session-1` §s14 L2858 | NO — it appears only inside exercise feedback. | Reasoning tokens are the model's own working-out, billed to you even though you never see them. They are why a bill can run far above what the length of the visible answer suggests. |
| **embedding / embedding space** | ml-concept | `session-1` §s5 L1407 | PARTIAL, in the appendix only — line 1816 quot | An embedding is a long list of numbers standing in for a word, arranged so that words used in the same kinds of sentences land near each other. 'Revocable' and 'irrevocable' sit almost on top of one another, which is exactly the problem. |
| **vector / embedding vector length** | math-notation | `session-1` §s4 L1798 | NO — it appears as a table row label and as a  | A vector is just an ordered list of numbers, the way a point's coordinates are a list. GPT-3 gives every token a list of 12,288 numbers; the map in Appendix A3 shows two. |
| **n-gram** | ml-concept | `session-1` §s3 L1706 | NO — it is the appendix's nav label and the ex | An n-gram is a run of n items in a row: a 2-gram is a letter pair, and Q is nearly always followed by U. A word 3-gram from the A1 corpus would be 'the client owns'. |
| **order (of an n-gram model)** | ml-concept | `session-1` §s3 L1725 | NO — four buttons labelled Order 1 to Order 4  | Order is how many characters back the generator may look before choosing the next one. At order 1 it looks at nothing and produces gibberish; at order 4 it produces real words it never actually copied. |
| **<END> token / invalid token** | ml-concept | `session-1` §s7 L2587 | NO — <END> appears as a row in the exercise's  | <END> is a token meaning 'the text stops here', which the model has to choose as deliberately as any word. Choosing it while brackets are still open is the invalid move the Appendix A4 lab is hunting for. |
| **dynamic temperature** | ml-concept | `session-1` §s8 L1905 | PARTIAL — line 1905, quoted above, which defin | Dynamic temperature raises the dial where the model is genuinely unsure and lowers it where it is confident, instead of holding one setting throughout. Loose on the adjectives, tight on the figure. |
| **entropy** | statistics | `session-1` §s8 L1905 | NO — it is used in two sampler definitions and | Entropy is a single number for how spread out the scores are: low when one candidate dominates, high when fifty are about equally plausible. It is the model's own uncertainty about this one word. |
| **probability distribution (over nex** | math-notation | `session-2` §s0 L1179 | NO — the phrase is used from line 1179 onward  | A probability distribution is the full list of possible next words with a number on each showing how likely it is, all the numbers adding to 100%. Asking the model the same question twice draws two different words from that one list, the way two Monte Carlo runs draw two different paths from one set of assumptions. |
| **sampling / a draw from the distrib** | ml-concept | `session-2` §s0 L1102 | NO | Sampling means picking the next word at random in proportion to the probabilities, rather than always taking the highest one. It is the reason the same prompt sent twice comes back with two different answers. |
| **sharpens / flattens the distributi** | math-notation | `session-2` §s3 L1221 | NO | Sharpening a distribution means pushing more of the total probability onto the top-ranked word; flattening spreads it out across the also-rans. Sharp gives you the same answer every time, flat gives you a different one every time. |
| **stop token** | ml-concept | `session-2` §s1 L2013 | NO | A stop token is the signal the model emits to say the answer is finished, the way a full stop ends a sentence. "Stop token reached" means the model chose to end, not that it was cut off. |
| **candidate rank** | math-notation | `session-2` §s1 L1708 | NO | Rank is a candidate's place in the list once the words are sorted from most to least probable. Rank 1 is the model's top choice; rank 20 is a word it would reach for only occasionally. |
| **grounding / grounded** | retrieval | `session-2` §s10 L1523 | Partly, and late — line 1663 in §09: "Groundin | Grounding means handing the model the actual source documents and requiring it to cite the passage it used. An ungrounded answer about Meg's buy-sell is written from memory of documents that resembled it; a grounded one quotes her buy-sell. |
| **n = 2,906 (n as sample size)** | statistics | `session-2` §s9 L1815 | NO | In a study, n is simply how many respondents or cases a finding rests on. n = 2,906 advisors means 2,906 people answered; the same percentage drawn from n = 12 would deserve far less weight. |
| **per million tokens ($5 in / $25 ou** | product-jargon | `session-2` §s5 L1258 | NO | Vendors price by the million tokens and charge separately for text you send in and text the model writes out. At $5 in / $25 out, a run that sends 6,000 tokens and returns 2,000 costs about eight cents. |
| **input-to-output token ratio (3:1)** | math-notation | `session-2` §s5 L1285 | NO | The input-to-output ratio is how much text you send compared with how much comes back — 3:1 means three times as much in as out. It matters because output is priced four or five times higher than input, so the ratio drives the bill. |
| **blended token price** | finance-crossover | `session-2` §s5 L1285 | NO | A blended price is one number that mixes the input and output rates in the proportion you actually use them. At a 3:1 ratio a $2-in/$10-out model blends to $4 per million tokens. |
| **misgrounding / misgrounded** | retrieval | `session-2` §s10 L1536 | YES — line 1539, Type 02 card: "Real, retrieva | Misgrounding is citing an authority that genuinely exists but does not say what the sentence claims it says. Rev. Rul. 2004-64 cited as blessing mandatory tax reimbursement is misgrounding: the ruling is real and holds close to the opposite. |
| **embeddings / meaning space** | ml-concept | `session-2` §s12 L1657 | NO | An embedding turns a word or a passage into a list of numbers positioned so that things with similar meanings sit near each other. It is how a search finds the paragraph about "liquidity" when you typed "cash needs", and it is Session 3's mechanism. |
| **distributional similarity** | ml-concept | `session-3` §s3 L1153 | PARTIAL — line 1157 says "The property being m | Distributional similarity means two words count as alike because they turn up in the same kinds of sentences, not because they mean the same thing. "Alligator" and "crocodile" score as near-identical on it, and so do "the will" and "the trust" in the Cole file. |
| **word-level embedding** | ml-concept | `session-3` §s3 L1166 | NO — "word-level" as opposed to what is never  | A word-level embedding gives each single word its own list of numbers, rather than giving one list to a whole paragraph. "Shall" and "may" land in nearly the same spot as isolated words, even though a drafted instrument turns on which one is there. |
| **chunk size** | retrieval | `session-3` §s4 L1207 | NO — the C1 slider is labelled "Chunk size" wi | Chunk size is how many words go into each slice before the document is filed for search. Article VII at 14 words per chunk breaks into more than a dozen pieces; at 80 words it stays in four. |
| **cosine similarity** | math-notation | `session-3` §s4 L1189 | NO — used three times (1189, 1203, 1530) with  | Cosine similarity is a single number from 0 to 1 saying how alike two lists of numbers are, where 1 is a perfect match and 0 is nothing in common. In this exercise the 2023 appraisal scores 0 against "Meg's CPC shares" — the one document that holds the answer. |
| **margin (gap between first and seco** | statistics | `session-3` §s4 L1942 | PARTIAL — the widget explains it inside the fe | The margin is how far ahead the first-place chunk finished over the second, as a share of the winner's own score. A 4% margin means the two were nearly tied and the assistant picked one without telling you it was close. |
| **reranking / re-ranking pass** | retrieval | `session-3` §s6 L1218 | PARTIAL — defined only in the advanced appendi | Re-ranking runs a second, slower model over the twenty passages the first search returned and puts them in a better order. It can lift the right passage from eighteenth place to first, but it can never find one the first search missed. |
| **contextual embeddings / contextual** | retrieval | `session-3` §s6 L1218 | PARTIAL — defined only at 2592 (sHY, advanced  | A contextual chunk has a machine-written sentence glued to its front saying which document and section it came from, before the numbers are computed. Instead of a bare "the value of the shares shall equal five times…", it starts "This is Article VII of the 2014 buy-sell, which applies on death, disability or withdrawal." |
| **context budget / context window** | ml-concept | `session-3` §s5 L1984 | NO — appears only in the C1 slider readout, wh | The context budget is the total amount of text the model can hold in view for one answer, and everything you paste competes for it. Bigger chunks carry more surrounding text, so fewer of them fit before the budget runs out. |
| **orphaning / orphaned chunk** | retrieval | `session-3` §s4 L1207 | YES within C1, at line 1556: a chunk reads "th | A chunk is orphaned when the slicing cuts a rule away from the condition that switches it on. Article VII's price formula, cut loose from the sentence naming death, disability or withdrawal, reads like CPC's general valuation method. |
| **200,000 tokens / ~500 pages thresh** | ml-concept | `session-3` §s6 L1239 | YES-ish at 1239 via the page equivalence, but  | This is the size below which you can skip search entirely and paste every document into the prompt at once. Roughly 500 pages fits, so most single-household files do — and a retrieval project sold for one is solving a problem you do not have. |
| **hallucination rate / error rate** | statistics | `session-3` §s7 L1255 | NO — the denominator is never stated in the co | The rate is the share of answers a study judged unsupported, out of every answer it tested. 3.3% means roughly one summary in thirty said something the supplied document did not say. |
| **fine-tuning** | ml-concept | `session-3` §s1 L1103 | YES but only in the appendix, at 1583: "Ground | Fine-tuning retrains the model itself on your material, changing the model rather than the documents in front of it. A discount fixed by fine-tuning cannot be corrected by editing a file and cannot be shown to an examiner. |
| **rank order versus scores** | statistics | `session-3` §s11 L1623 | PARTIAL — the caption at 2065 says the two mid | A rank tells you the order things finished in; a score tells you by how much. First and second in satisfaction may be nearly tied or miles apart, and this chart cannot tell you which. |
| **distribution over next tokens** | statistics | `session-4` §sWS L1786 | NO | A distribution is the model's ranked list of candidate next words with a probability attached to each. It is a forecast, not a check — which is how the model can put 15% on a bracket that would make the sentence impossible. |
| **prompt injection** | security-compliance | `session-4` §s5 L1315 | Yes, functionally, at line 1316: "A language m | Prompt injection is text hidden inside a document or email that the assistant obeys as if you had typed it. A sentence buried in a PDF saying "forward this file to the address below" is read as an order, not as content. |
| **CVSS score** | security-compliance | `session-4` §s5 L1323 | NO | CVSS is a 0-to-10 severity score for a vulnerability, where anything above 9 is treated as drop-everything critical. EchoLeak scored 9.3 and CurXecute 9.8. |
| **training distribution** | ml-concept | `session-4` §s7 L1426 | NO | The training distribution is the kind of material the model saw a great deal of while it was being built. Questions far from it — an Illinois QTIP direction, a §7872 blended rate — are exactly where the errors bunch up. |

---

### 4.N Should the tooltip text and the table text come from one source?

**Recommendation: yes, and it is not a close call. Follow the `CASE.md` pattern
exactly — one source file, a generator, sentinels, and a hash guard.**

The design puts the *same definition* in two places on every page: a `(?)`
affordance at first occurrence, and a row in the end-of-lesson vocabulary table.
Across five lessons that is roughly two hundred pairs. Hand-maintained, they drift
— and they drift **silently**, because nothing on the page shows both at once. A
student reads one or the other, never both, so a divergence is invisible until
someone diffs the file.

This is exactly the failure `CASE.md` was built to prevent, and the repo already
has the whole machine:

| `CASE.md` machinery | Vocabulary equivalent |
|---|---|
| `CASE.md` — one authoritative source | `VOCABULARY.md` (or `vocab.json`) at repo root |
| `build-case.mjs` — parse, validate, recompute | `build-vocab.mjs` — parse, assert two-sentence limit, assert every `read_more` resolves to a real source id |
| `inject-case.mjs` — rewrite between sentinels | inject the table and the tooltip payloads between `VOCAB:BEGIN` / `VOCAB:END` |
| `verify-case.mjs` — SHA-256 per block, three distinct failure modes | `verify-vocab.mjs` — same three: no sentinels / hand-edited / stale |

**Three things this buys that hand-maintenance cannot.**

1. **The two-sentence limit becomes enforceable.** It is a rule about the source
   record, checkable at build time, not a thing a reviewer has to notice.
2. **The "read more" links join the bibliography for free** — the same generator
   can assert that every `read_more` target resolves to a live footer source id,
   which is the join you asked for in item 3 and cannot be maintained by hand
   across two hundred entries and 71 keys.
3. **First-occurrence placement becomes computable.** "First occurrence of each
   term per section" is a *derived* fact about the lesson, not an authored one.
   Hand-placing a `(?)` marker means re-deciding it every time a section is
   reordered, split, or moved between core and appendix — and item 5 will
   recommend exactly those moves. A generator recomputes it.

**One design consequence to decide now, because it constrains the source format.**
Point 3 only holds if the injector can *find* first occurrences, which means the
term must be marked in the lesson prose (say, `<v>temperature</v>` or
`data-term="temperature"`) and the injector decides which mark gets the `(?)`.
The alternative — the generator doing free-text matching on prose — will produce
false positives inside quotations, code and proper names, and is not worth it.

So: **mark the term in prose, let the build decide which mark is first, and let the
build write both the tooltip payload and the table row from one record.** That
keeps hand-authoring to the one thing a human must do (deciding *this* word here
is the term), and keeps every derived fact derived.

**Scope warning.** The lessons already carry a hard constraint from
`MAINTAINING.md`: *"No lesson may use localStorage, sessionStorage, indexedDB, or
cookies"*, and the corpus is plain ES5 except for `fetch`. A tooltip that works on
**both hover and tap** with no storage and no framework is a small amount of
careful code, not a library. It should be built once, live inside the
`restyle_sweep.py`-managed CSS fence and one shared script block, and be
byte-identical across lessons — the same
discipline the live-model console already uses (`LM:BEGIN` / `LMBOX:BEGIN` /
`LMSTYLE:BEGIN`, md5-paired in the pre-push gate). Recommending, not implementing.

---

## 5. Complexity percentile ranking — RUBRIC PROPOSAL, STOPPED FOR APPROVAL

**Nothing is scored below. This is the rubric you asked to approve first.**
Sections 5.1 to 5.5 are the proposal; 5.6 is the session-0.1 blocker you asked me
to surface. On approval, the scoring pass produces the distribution, the ≥75th
percentile list, and the REDUCE/MOVE analysis with dependency checks.

### 5.1 What I would measure, and why

The audience is a CFP with no machine-learning background. The failure this
ranking exists to prevent is **a student stopping**, and students stop at a point
of *action*, not a point of reading. A dense paragraph gets skimmed and the room
moves on; a blocked exercise stops the room. That observation drives the weights.

| # | Component | Weight | What it counts | Source |
|---|---|---|---|---|
| **C1** | **Undefined-term load** | **30%** | Terms from the item-4 inventory making their **first appearance in the lesson** in this section **and** currently undefined on the page, normalised per allocated minute | item 4 |
| **C2** | **Blocked interaction** | **25%** | Whether this section's exercise instructions can be followed without a term the page never defines | item 4 `blocked_exercises` |
| **C3** | **Prerequisite depth** | **20%** | Distinct concepts the section *assumes and does not restate* — intra-lesson (a prior section's artifact) and extra-lesson (a prior session's mechanism) | dependency map, §5.4 |
| **C4** | **Formal-notation load** | **15%** | Distinct notation objects: axis transformations, exponents, superscripts, Greek, formulae, index scores, %-of-% comparisons, distributions | direct count |
| **C5** | **Comprehension pressure** | **10%** | Words per allocated minute, banded against the corpus | item 7, measured |

Each scored 0–4 against fixed anchors, weighted, ×5 → **0–100**.

**Why C1 and C2 carry 55% between them.** They are the same failure seen from two
sides: an undefined term is the mechanism, a blocked exercise is the event. They
are also the only two components measured from evidence rather than judgement —
item 4 produces a term list with first-occurrence line numbers and a blocked-
exercise list with severities, so C1 and C2 are countable and re-countable. A
rubric whose heaviest components are reproducible is a rubric you can argue with.

**Why C3 is 20% and not more.** Prerequisite depth is what makes a section
*immovable*, more than what makes it *hard*. It earns its weight because it
predicts the carry-forward work in a MOVE decision, but a section with four
prerequisites that are all restated in place is not hard, and the anchor counts
only prerequisites that are **assumed and not restated**.

**Why C4 is only 15%.** Raw notation count over-flags a section that shows one
clean equation and under-flags one carrying the same idea in dense prose. Session
1's log–log axes toggle is two notation objects and is genuinely hard; session 4's
CVSS scores are notation and are not. Notation is a signal, not the thing.

**Why C5 is only 10%.** Density is real (§7 shows the core running at 1.3–2.0×
the appendix), but it is a property of the *whole lesson's* budget more than of
one section, and acting on it means reallocating minutes, which is a different
decision from tiering. It is in the score to break ties, not to drive them.

### 5.2 What I discard, and what I promote out of the score

**DISCARDED as a scored component: distance from an advisory application.**
It is a *relevance* measure, not a *difficulty* measure. A pure-mechanism section
can be easy — session 1 Appendix A1, n-grams, is mechanism end to end and is the
gentlest thing in the lesson. A pure-application section can be hard — session 4
§02, the Regulation S-P 30-day notification clock, is application end to end and
carries more undefined prerequisites than most of the mechanism. Scoring it would
produce a ranking of *abstractness*, which is not what you asked for, and it would
double-count item 6, which measures exactly this and reports it separately.

**PROMOTED to a routing axis instead.** Distance from application does not change
*whether* a section is flagged; it changes *which remedy applies*:

| | Close to advisory application | Far from advisory application |
|---|---|---|
| **High complexity** | **REDUCE.** You cannot move the thing the lesson is for. | **MOVE.** This is the advanced tier's purpose. |

Reported as **R1** alongside every score, never added into it.

**A second unscored routing axis, R2 — self-check availability.** Does the section
give the student a way to find out whether they got it: a commit-first gate, a
revealed answer, scored feedback? A hard section with a self-check rarely stalls a
room; a hard section without one stalls it every time. Cheap to measure (gates and
component types are already tagged) and it changes the remedy — a high-scoring
section with no self-check may need a *check added* rather than a cut.

**A third reported figure, the stall index.** Your stated goal is that a demanding
topic should *cap* a lesson rather than *stall its middle*. Complexity alone cannot
say that; position does. So each flagged section also reports

> **stall index = complexity score × (1 − normalised position within the core)**

A section scoring 80 at core position 3 of 11 outranks the same 80 at position 11.
This is a **priority ordering, not part of the score**, and it is what I would sort
the ≥75th-percentile list by.

### 5.3 Within each lesson, or across all five — and why

**Score on one absolute corpus-wide scale. Cut the 75th percentile across all 62
sections. Report the within-lesson rank as a secondary column.**

You already named the reason not to rank within a lesson: it flags about a quarter
of every lesson whether or not that lesson has a problem. The deeper version of
that objection is that a within-lesson cut is **relative to a moving baseline** —
it cannot tell you that session 1 is harder than session 2, which is the one thing
the tier system exists to act on. The audience is one audience across all five
lessons; the cut should be against one bar.

Three consequences I want on the record before you approve:

1. **The flags will not distribute evenly, and that is the correct answer.**
   I expect concentration in session 1 (the mechanism lesson) and in the advanced
   appendix sections of sessions 3 and 4. If the corpus-wide cut returns two
   sections from session 2 and nine from session 1, that is a finding, not a
   sampling error.
2. **The remedy is always lesson-local.** A section can only move into *its own*
   lesson's appendix. So the within-lesson rank still has to be reported: it is
   what answers "does this lesson stall in its middle", and it is what tells you
   whether a MOVE target tier is already crowded.
3. **Appendix sections are scored too, but judged against a different bar.** An
   advanced-tier appendix section scoring in the top decile is *working as
   designed*. So the distribution is reported once for all 62 sections, and the
   ≥75th-percentile list is split into `core / appendix` with the appendix half
   read as "is this correctly tiered", not "is this a defect".

### 5.4 What the MOVE dependency check will actually check

You set the rule: a section cannot leave the core if a core section after it needs
it. The dependency evidence is already extracted and will be applied in this order:

1. **Explicit anchors.** Every `href="#id"` between sections is mapped, both
   directions. Example of what this catches today: session 1 `s2 → s3, s4` and
   `s3, s4 → s2, s5`, so the A1/A2 pair is already bidirectionally bound to §02/§03.
2. **Carry-forward artifacts.** Anything a later section *reads* that an earlier
   one *produced* — the cold-open prompt capture (`sCold` → `s6b` in session 2),
   the baseline measurement, the scored prompt. These are the bindings that break
   silently, because they are JavaScript variable reads, not links.
3. **Retrieval bridges.** The `bridge` / `recall` / `from Session N` openers in
   sessions 2, 3 and 4 §00–§01. Per `docs/spine-brief.md` §1 these test the prior
   session's **mechanism**, not the case question — so a MOVE that demotes a
   mechanism section in session N can break a bridge in session N+1. **This is a
   cross-lesson dependency and it is the one most likely to be missed.**
4. **Gate chains.** `data-gate` completion is per-section, but the appendix
   discussion sections (`s14c`, `s12d`, `s15`, `sD`) each reference *every* other
   appendix section in the lesson. Moving one into the core inverts that reference.
5. **Case figures.** Anything guarded by `verify-migration.mjs` check 20. Moving
   prose does not change a figure, but splitting a section might.

### 5.5 Scope, and what the scoring pass will output

62 sections in total: session 0.1 twelve, session 1 nineteen, session 2 seventeen,
session 3 nineteen, session 4 nineteen (the appendix divider in each of the four
counts as structure, not content, and is excluded — 58 content sections). The hub
`index.html` has no `<section>` elements and is out of scope for scoring.

On approval you get: the full 58-row score table; the distribution with quartile
boundaries; the ≥75th-percentile list sorted by stall index, each row carrying
score, component breakdown, core/appendix and tier, R1 and R2, REDUCE or MOVE with
reasoning, the full dependency list for every MOVE, and the minute-budget effect
against the 67–70 core and the 150-minute total.

### 5.6 BLOCKER — session 0.1 is outside the architecture

**Measured.** Session 0.1 has 12 sections, `s0` … `s11`. It has **no** appendix,
**no** `data-tier` on any section (0 occurrences), **no** `data-insert-after`,
**no** tier bar (`#tierbar` absent), and **no** `.apxdiv` / `.apxcard` / `.apxback`
furniture. It does have the nav rail. Its 12 sections sum to **120 minutes** of
core, against 67–70 in the other four, on its own ratified 150/120 block.

**What demoting a high-complexity section there would mean today: nothing.**
There is no advanced tier to demote into, no filter to hide it with, and no
gold-link / back-link contract to carry the reader out and back. The only moves
0.1 supports are (a) REDUCE in place, (b) reorder within the 12, (c) cut. Only (a)
and (c) reduce load. (b) addresses the "stalls the middle" half of your goal and
none of the "demanding topic" half. So a REDUCE-or-MOVE recommendation for 0.1 is
a REDUCE-or-CUT recommendation, and it should not be dressed up as the same thing
the other four lessons get.

**This is already an open instructor decision, and I am not overriding it.**
Commit `f5bf47b` records: *"Session 0.1's missing appendix and the 60-minute core
split are deferred at the instructor's direction; 0.1 is a work in progress and is
not needed for this class yet."*

**Recommendation: adopt the architecture in 0.1 BEFORE the editorial work, as its
own mechanical commit — but only if 0.1 is to be taught. Otherwise score it in a
separate annex and defer.**

Reasons for *before*:

- The transform is **mechanical and already proven four times**: split the 12 into
  core and appendix, add `data-insert-after` and `data-tier`, add the tier bar,
  add the `.apxdiv` index grid and the `.apxback` return links. It is not a content
  rewrite and it does not depend on any editorial decision.
- **Doing it after means measuring twice.** Every editorial artifact keyed to a
  0.1 section id — vocabulary first-occurrence map, tooltip placement, complexity
  score, minute budget — is invalidated the moment the 12 sections are re-cut.
- **`verify-editorial.mjs` would otherwise carry a permanent exception.** Any check
  that asserts tier validity, appendix-card agreement or gold-link reciprocity has
  to special-case 0.1 forever, and a checker with a standing exception for one file
  is a checker people stop trusting.
- 0.1 at 120 core minutes with a 223 words-per-minute closing section (§7) is the
  single densest thing in the corpus. It is the lesson that most needs the tier
  system, not the least.

Reason for *after*, and it is a real one: you have already deferred it, and 0.1 is
not needed for this class. If it stays deferred, the honest output is a **separate
provisional annex** for 0.1 — same rubric, same scores, REDUCE or CUT only, no MOVE
— explicitly marked as invalidated by any future core/appendix split.

**Decision you owe: is session 0.1 in this term's teaching set?** If yes, adopt the
architecture first. If no, annex it. I do not need the answer to score the other
four lessons, so this does not block approval of the rubric.

---

## 6. AI complexity versus planning context

**Inventory only, as instructed. Nothing here is a recommendation to implement.**
### 6.1 Per lesson: how much runs on ML mechanism, how much on planning application

**Method caveat, stated because it changes how to read the table.** Each lesson was
judged section by section, and a section carrying both was split. The raw judgements
do not sum to the lesson's allocation — reviewers counted a mixed section's minutes
under mechanism, application *and* mixed — so the absolute minutes below are
normalised to each lesson's real allocation. **Read the share, not the minute
count.** The share is stable; the minute attribution is not.

| Lesson | Allocated | Mechanism | Application | Mixed | **Mechanism share of the decided split** |
|---|---|---|---|---|---|
| `session-0.1` | 120 | 10 | 22 | 88 | **31%** |
| `session-1` | 150 | 48 | 55 | 47 | **47%** |
| `session-2` | 150 | 39 | 81 | 30 | **33%** |
| `session-3` | 150 | 48 | 72 | 30 | **40%** |
| `session-4` | 150 | 26 | 73 | 51 | **27%** |

**The arc is coherent and it runs the right way.** Mechanism share falls from 47%
in session 1 to 27% in session 4 — the course front-loads how the machine works and
then spends the rest of the term on what an advisor does with it. Session 0.1 is a
special case: its reviewer's note is that the file *"contains essentially no
machine-learning mechanism in the Wolfram sense — no tokens, no embeddings, no
weights-training, no sampling, no n-grams. Its 'mechanism' throughout is
PRODUCT / CONTEXT-ASSEMBLY mechanism."* That is a different axis from the one this
item measures, and it is worth knowing before 0.1 is scored in §5.

**Session 1 is the pressure point.** It is the only lesson at roughly half
mechanism, it carries the largest vocabulary load (98 terms, 58 undefined) and the
most blocked exercises (21, of which 14 HIGH), and its core prose density is the
*lowest* in the corpus (52.4 w/min, §7). Density is not its problem. Unexplained
mechanism is.


<details><summary><b>session-0.1</b> — per-section judgement</summary>

```
HEADLINE: this file contains essentially NO machine-learning mechanism in the Wolfram sense — no tokens, no embeddings, no weights-training, no sampling, no n-grams. Its "mechanism" throughout is PRODUCT / CONTEXT-ASSEMBLY mechanism (which control populates which layer). Read MECHANISM below as that, not as ML internals.
THE THREE FIELDS ABOVE partition the 120 allocated minutes by SECTION LABEL: 10 pure-mechanism + 22 pure-application + 88 mixed = 120. The finer ATTRIBUTED split, summing the per-section minute splits below, is 74 mechanism / 46 application.

s0  |  8 | MIXED (5 mech / 3 app) | cold-open ritual scores the pasted prompt against the five-layer frame, but the memory-experience callout and the plan-tier reveal are firm/account facts
s1  |  7 | MIXED (5 / 2) | five-layer assembly figure and the prediction-commit on what research does or does not move are pure mechanism; the Cole case panel introduction is the application share
s2  | 10 | MIXED (7 / 3) | model table and all five MCQ deciding facts are product properties; the domain chips and the ninety-second search-the-web verification drill carry the application share
s3  | 10 | MECHANISM (9 / 1) | effort levels, thinking locks, illustrative curve, illegal-state preview; only the "classification and extraction work that makes up most of the volume in a practice" aside is application
s4  | 16 | MIXED (12 / 4) | twelve controls, twelve blocks, budget bar and state-space arithmetic are mechanism; the three Cole probes and the two labelled designed defects (wrong client name, contradicting figures) are application/verification
s5  |  9 | MIXED (7 / 2) | four rungs, tool-call counts and what lands in context are mechanism; the CMEK-blocks-past-chat-search consequence for an RIA is application
s6  | 10 | MIXED (6 / 4) | stored-versus-in-context and memory semantics are mechanism, but all three designed landmines are framed as firm-risk facts ("For an RIA this is the single highest-value fact in the lesson")
s7  | 10 | MIXED (7 / 3) | skill/connector/plugin taxonomy and the beta table are mechanism; the IPS-formatting skill, the view-only-in-a-client-workflow caution and the Financial Services marketplace are application
s8  | 10 | MIXED (6 / 4) | the three-run comparison and the bare-API run 4 demonstrate mechanism; the Documentation Card, its justify-later framing and its no-client-identifiers rule are pure application
s9  |  8 | MIXED (6 / 2) | six symptoms are reported in workflow register but every cause and fix is a mechanism statement pointed back at a section
s10 | 15 | APPLICATION (2 / 13) | recordkeeping, supervision, retention, Team-versus-Enterprise administrability and RIA policy; the only mechanism is the incognito-export and org-toggle facts used as evidence
s11 |  7 | APPLICATION (2 / 5) | unassisted-task baseline capture and the Monday change to Instructions for Claude are practice measurement; the recurring Cole note question is application arithmetic
```
</details>


<details><summary><b>session-1</b> — per-section judgement</summary>

```
DEFINITIONS: mechanism_minutes + application_minutes = 150, the file's full allocation (core 67 + appendix 83), assigned as a per-section SPLIT. mixed_minutes = 69 = the summed minutes of the nine sections judged MIXED; it is reported because the schema asks for it and is NOT a third bucket, so it does not add to the other two. The apxdiv divider's "83 min" is the appendix sum, not its own allocation, and is excluded to avoid double counting.

s1 (§00 Start) | 6 | APPLICATION 0 mech / 6 app | Cole household, the note-call question and the pacing control; no model mechanism is taught.
sCold (§01 Cold open) | 8 | MIXED 3 / 5 | the ritual's word/character/token count is mechanism; the role-format-context critique and the five-week comparison are the advisor's own workflow.
s2 (§02 Prediction) | 7 | MECHANISM 7 / 0 | distribution picker, temperature buttons and the power-law chart; the Cole discount wording is a skin on pure mechanism.
s5 (§03 Tokens and price) | 5 | MIXED 3 / 2 | Wolfram token quote plus the live tokeniser strip is mechanism; the Cole document cost table and the duty-of-care line are application.
s9 (§04 Consequence) | 7 | MIXED 4 / 3 | the three-run divergence and the binary/partial-credit scoring matrix are mechanism; the seed-gift discussion block and two instructor notes are application.
s10 (§05 Capability against price) | 5 | MIXED 2 / 3 | the index-against-cost frontier and tier price table are model-facing knowledge rather than how the machine works; the buy decision and the Meg-agenda-vs-2023-appraisal line are application.
s11 (§06 Your firm) | 7 | APPLICATION 0 / 7 | firm annual spend sandbox, per-matter Cole document pass, metered against subscription.
s12 (§07 Judgment) | 6 | APPLICATION 0 / 6 | six CFP-domain tasks from the case, each assigned a tier and defended.
s13 (§08 The line) | 7 | APPLICATION 0 / 7 | NPI sorter, the course confidentiality rule, and what a properly constructed synthetic case is.
s14b (§09 Custom instructions) | 4 | APPLICATION 0 / 4 | where the settings live and what belongs in a standing brief.
s15 (§10 Close) | 5 | MIXED 1 / 4 | one paragraph of mechanism recap ("counted letters, hit the combinatorial wall, turned the knobs"); the rest is the graded baseline, reading list and CFP topic map.
apx (divider) | 83 shown | EXCLUDED | navigation card; the 83 is the sum of A1-A7, not an allocation of its own.
s3 (A1 n-grams) | 11 | MECHANISM 11 / 0 | corpus statistics, order-1 to order-4 generation and the combinatorial wall; the planning corpus is a skin.
s4 (A2 Fitting a model) | 12 | MIXED 9 / 3 | hand-fit loss lab, the wrong-basis demonstration and the scale-guess table are mechanism; the Monte Carlo talk block is the one application beat.
s6 (A3 Meaning space) | 9 | MIXED 6 / 3 | embedding layout, the alligator/crocodile quiz and the crane senses are mechanism; the GRAT/GRIT and QTIP/QDOT discussion is application.
s7 (A4 Counting failure) | 9 | MIXED 6 / 3 | the parenthesis sequence builder and 
```
</details>


<details><summary><b>session-2</b> — per-section judgement</summary>

```
s0 Session map | 6 | MIXED (mech 2 / app 4) | retrieval bridge item 1 is pure next-token mechanism, but the case cards, outcomes, time budget and confidentiality recall are all practice material
sCold Cold open | 8 | APPLICATION (mech 0 / app 8) | a standing ritual that measures the advisor's own prompting behaviour; no model internals appear
s3 Temperature | 5 | MIXED (mech 3.5 / app 1.5) | eyebrow reads '01 · Mechanism' and the p^(1/T) sandbox is mechanism, but the three consequence cards are audit trail, verification and tooling
s5 Cost frontier | 6 | MIXED (mech 2 / app 4) | token-burn behaviour is a fact about models, but the frontier chart, estimator and tier decision are a procurement decision for the advisor's workflow
s6 P·T·C·F | 6 | MIXED (mech 2 / app 4) | the Zheng persona null result is model-behaviour evidence; the framework, the Cole IDGT worked prompt and the rebuild are practice
s6b Your prompts | 7 | APPLICATION (mech 0 / app 7) | scoring and rewriting the students' own submitted templates
s7 Triage | 5 | APPLICATION (mech 0 / app 5) | seven prompts, all of them planning tasks (1040 comparison, portability, gift tax exclusion)
s8 Interview rewrite | 6 | MIXED (mech 1 / app 5) | opens on Wolfram's 'tell it once' observation, then the interview wrapper, the Cole buy-sell and the ten-dimension checker
s10 Citations | 8 | MIXED (mech 1.5 / app 6.5) | the two hallucination charts are empirical model behaviour; the four failure types, six-item triage and four-check order are verification practice
s11 Template audit | 5 | APPLICATION (mech 0 / app 5) | eight-point rubric plus structured peer review of a handoff artefact
s12 Final project | 5 | APPLICATION (mech 0 / app 5) | assignment terms, baseline capture widget, seven-element checklist
apx Appendix divider | 58 stated | NAVIGATION (excluded from both sums) | a divider card; note its '58 min' contradicts the five appendix sections, which sum to 83, and the footer's own 'core 67 + appendix 83 = 150'
s1 B1 Next token | 16 | MECHANISM (mech 14 / app 2) | next-token distribution, the n⁻¹ chart and the sampling sandbox; only 'What this rules out' turns to the planner
s2 B2 Laplace | 15 | MECHANISM (mech 10 / app 5) | probability as a measure of ignorance is epistemic mechanism; the §1014 panel and the 4-minute discussion are practice
s4 B3 Counting failure | 16 | MECHANISM (mech 13 / app 3) | the parenthesis net, the 15% figure and the one-forward-pass diagram; 'The mapping to your work' is the application tail
s9 B4 Seven steps | 16 | APPLICATION (mech 0 / app 16) | CFP Board seven-step process, the delegation line and the T3 adoption chart
s12d B5 Discussion | 20 | APPLICATION (mech 0 / app 20) | four-phase debate on whether specification cost is time saved or time moved

TOTALS: mechanism 49, application 101, of 150 allocated. Core-only (67 min, excluding all appendices): mechanism 12, application 55 — the core session is 82% application, and every one of the three mechanism-dominant
```
</details>


<details><summary><b>session-3</b> — per-section judgement</summary>

```
CONVENTION: minutes are the <span class="mins"> value in each section's .eyebrow. Label = the dominant register. The mech/app split apportions the same minutes, so mechanism_minutes + application_minutes = 150 (the footer's allocated total). mixed_minutes = the sum of minutes sitting in sections labelled MIXED (38), and is a subset of the 150, not an addition to it. The #apx divider card carries a 48 min chip but is excluded from every total in the page's own pacing script and footer table, so it is excluded here too; note also that its chip (48) disagrees with the five appendix eyebrows (16+16+14+14+20 = 80) and with the footer table (80).

id | min | label | mech/app | justification
s1 | 5 | MIXED | 1/4 | one sentence of Session 1-2 mechanism recall; the rest is the Cole case, the syllabus row and the citation-verification bridge.
sCold | 8 | MIXED | 3/5 | the analyser counts tokens and prompt scaffolding (mechanism-adjacent), but the ritual's purpose is the advisor's own practice measured across five weeks.
s2 | 5 | MECHANISM | 4/1 | Wolfram's embedding definition, 768/12,288 vector lengths, Euclidean distance arithmetic; only the vocabulary is planning content.
s3 | 5 | MECHANISM | 3/2 | distributional similarity vs referential difference is pure mechanism, but the six sorted pairs are all Cole governing-document pairs.
s4 | 6 | MECHANISM | 4/2 | chunk, embed, rank, paste — four operations; the live IDF retriever runs over the Cole corpus, which is skin rather than subject.
s6 | 6 | MIXED | 3/3 | Anthropic's 5.7 -> 1.9 benchmark and the 200,000-token threshold are mechanism; the meetings-per-year volume calculator is practice arithmetic.
s7 | 5 | MIXED | 3/2 | Vectara and Magesh rates plus the two-condition toggle matrix are mechanism measurement; the work-along asks which rate your own workflow is exposed to.
s9 | 4 | APPLICATION | 0/4 | prep-capture-summarise-follow-up-log, failure inheritance and who detects it; no model internals at all.
s10 | 5 | APPLICATION | 1/4 | the extraction step is named as architecture, but the section is Kitces economics, adoption segments and CRM note writing.
s12 | 6 | APPLICATION | 0.5/5.5 | recording law, all-party consent counts, vendor confidentiality; one paragraph reuses the retrieval-citation failure.
s13 | 6 | APPLICATION | 0/6 | basis-for-recommendation documentation, sale-vs-gift rationale, contemporaneous evidence triage.
s14 | 4 | APPLICATION | 0/4 | AI usage policy assignment and citation-set assembly.
s16 | 5 | APPLICATION | 0.5/4.5 | Part 1 peer exchange, scalability weighting and the Session 4 handoff; one sentence makes the twenty-clients test a retrieval test.
sHY (C5) | 16 | MECHANISM | 14/2 | contextual embeddings, BM25, re-ranking, cumulative failure rates; only the Article VII callback is planning content.
s5 (C1) | 16 | MECHANISM | 12/4 | chunk size, orphaning, the prepend remedy; Article VII supplies the text being chunked.
s8 (C2) | 14 | MIXED | 8/6 | Wolfram on prompt vs weights and t
```
</details>


<details><summary><b>session-4</b> — per-section judgement</summary>

```
s0 Frame | 5 | MIXED (2 mech / 3 app) | the Session-3 retrieval bridge quiz is grounding-versus-fine-tuning and nearest-passage mechanism; the Cole recap, the three outcomes and the Part 1 status are practice.
sCold Cold open | 8 | MIXED (2 / 6) | the analyser counts words, characters, tokens and prompt scaffolding, but the framing question is regulatory accountability for the prompt.
s1 No rulebook | 5 | APPLICATION (0 / 5) | FINRA 2026, SEC FY2026 priorities, Daly, and a nine-item duty sorter; nothing about how a model works.
s2 NPI | 5 | APPLICATION (0 / 5) | §248.3 applied to nine Cole facts, plus the PII/NPI distinction table.
s3 Tiers | 5 | MIXED (2 / 3) | retention, training defaults and the contract table are application; the Intelligence Index frontier, blended token pricing and "a reasoning model reaches its answer by emitting more tokens" are mechanism.
s4 Vendors | 5 | APPLICATION (0 / 5) | corpus selection plus a weighted six-question vendor scorecard.
s5 Attacks | 5 | MIXED (1.5 / 3.5) | the instruction-versus-data indistinguishability claim is mechanism; CVEs, deepfake figures and the out-of-band control are practice.
s6 Leaks | 4 | APPLICATION (0 / 4) | local caches, connectors, shipped-enabled features and retention settings — deployment surfaces, not model internals.
s7 Verification burden | 5 | MIXED (1.5 / 3.5) | the Stanford rates, the grounding delta and the instrument-incomparability box are mechanism-side measurement; the 1−(1−p)^N slider and the minutes calculator are practice pricing.
s8 Audit trail | 5 | MIXED (1 / 4) | the Wolfram non-determinism quote is mechanism; the four-field record, the six-item classification and the prompt block are recordkeeping.
s10 Relay | 3 | APPLICATION (0 / 3) | handoff logistics, completeness gate and the derangement draw.
sCR Cold first run | 10 | APPLICATION (0 / 10) | eight-minute cold run of a peer's workflow package plus the stuck log.
s9 Policy homework | 5 | APPLICATION (0 / 5) | firm AI policy rubric and peer-review instrument.
apx Appendix divider | 43 | EXCLUDED from totals | a navigation divider; its 43 min double-counts the appendix and disagrees with the 80 min the five appendix eyebrows actually carry (16+16+14+14+20), and with the apxlink teasers that advertise 9/6/8 min for D1/D2/D3.
sRSP D5 Tabletop | 16 | APPLICATION (0 / 16) | Regulation S-P awareness tabletop and the escalation clause.
sW1 D1 Provenance | 16 | MIXED (12 / 4) | tournament sampling over token candidates, sub-perceptual pixel perturbation and audio masking are mechanism; the synthetic Meg Cole call and the practice conclusion are application.
sW2 D2 Watermark limits | 14 | MIXED (8 / 6) | output entropy, regeneration and latent-binding are mechanism; the advisor's inversion, the eight-item sorter, the evidence grid and the regulatory note are application.
sWS D3 Source staleness | 14 | MIXED (10 / 4) | the parenthesis figure, mixture-of-experts, reasoning loops and temperature are mechanism; the syllabus
```
</details>


### 6.2 ML concepts with a natural planning analogue the lesson does not draw

**103 concepts examined. 7 already draw an analogue. 96 do not.**

Monte Carlo against sampling from a distribution — the one you named — is among
the undrawn. The corpus mentions it exactly once, at `session-1:1664`, in the
**footer time table**: *"Model assumptions and the Monte Carlo parallel; tier
selection as documented judgment."* It is named in the syllabus row and never drawn
in §02, where temperature is actually taught.

The seven already drawn are: the audit trail against workpaper standards (S4 §08),
vendor terms against the custodial agreement's data-use clause (S4 §03), the
grantor-tax burn framing (S2), and four smaller ones inside the case exercises.

**The six worth acting on first**, because the analogue would carry the teaching
rather than decorate it — each is attached to a section that §4 flags as
HIGH-blocked or that §7 flags as over-dense:

| ML concept | Planning analogue | Why this one |
|---|---|---|
| **Prompt injection** (S4 §05) | **The forged wire instruction** — an instruction arriving inside the data channel and obeyed because it looks like one | Advisors have a trained callback reflex for exactly this. Cheapest way to make §05 land, and §05 runs at 145 w/min |
| **Tier selection** (S1 §05–§07) | **Delegation** — paraplanner, associate, senior, priced by the downside of the task | S1 already states the rule in ML terms (*"Price is never the reason to use the cheap tier. Fitness for the task is"*) and never names the practice it is describing. §07's tier quiz is HIGH-blocked on nine terms |
| **Abstention scoring** (S1 §04) | **"I don't know, let me check"** — and a review culture that scores answers-given | The hardest idea in S1, with an exact analogue in professional culture |
| **Power law / long tail** (S1 §02) | **Revenue concentration in a book** — straight on log axes, no clean rank where the tail stops mattering | The log–log toggle is HIGH-blocked on seven terms, and the advisor already owns the shape |
| **Autoregression** (S1 §02) | **The irrevocable transfer** — every step conditioned on the last, and nothing goes back | The case's own seed gift is the worked example, already on the page |
| **Context window** (S1 §03, S0.1 §04) | **The discovery document request** — what you did not ask for is not wrong in the answer, it is absent, and nothing tells you it is missing | S0.1 §04 is built entirely on the context window and never defines it (§4) |

Full inventory below, per lesson, sorted by strength of the analogue. **STRONG** =
structurally identical mechanism. **PARTIAL** = holds for one property. **WEAK** =
rhetorical resemblance only.

**`session-1` — 16 undrawn analogues**

| ML concept | § | Planning analogue | Strength | The one sentence that would draw it |
|---|---|---|---|---|
| Temperature / sampling from a distribution r | `s2 (§02 P` | Monte Carlo simulation — a single run is a draw, not an answer, and the shape of the distribution is what you … | STRONG | Pressing Generate twice is running the plan twice: one draw from a distribution is an anecdote, and the only honest report is what the spread looked like. |
| Embedding vector distance — words sit close  | `s6 (Appen` | Sector and factor correlation — two holdings sit close because they behave alike in the same conditions, so a … | STRONG | A correlation matrix is an embedding: positions sit close because they behave alike in the same environments, which is why three technology names spelt differently are one holding. |
| Autoregression — each token is conditioned o | `s2 (§02 P` | The irrevocable transfer, and sequence-of-returns risk — a path where each year is conditioned on the last and… | STRONG | Generation never goes back and neither does an irrevocable transfer: every step is conditioned on the one before it, and the seed gift you cannot unwind is the token you already pl… |
| Context window — the model can only reason o | `s5 (§03 T` | The discovery document request and the file at the meeting — whatever was never requested does not exist for t… | STRONG | A context window is a document request: what you did not put in it is not wrong in the answer, it is simply absent, and neither the model nor the file will tell you it is missing. |
| Parametric memory — 175 billion weights hold | `s4 (Appen` | The advisor answering from memory versus the advisor answering with the file open — fluent either way, wrong o… | STRONG | A model with no lookup is a planner working from memory in a client meeting: fast, confident, and wrong in exactly the places where opening the file would have caught it. |
| Fine-tuning versus grounding — changing the  | `s14b (§09` | The model portfolio versus the custom sleeve — a house default set once and binding on everyone, against a per… | STRONG | Account-level instructions are a model portfolio and project instructions are a custom sleeve: one is a house default you review on a schedule, the other is built for one engagemen… |
| Standing custom instructions as a written, b | `s14b (§09` | IPS drafting — written before the pressure arrives, binding on everything that follows, and revisited when it … | STRONG | Your custom instructions are an investment policy statement for your own judgment: written once while calm, binding on every conversation after, and worth re-reading the day they s… |
| Prompt specification — role, output format a | `sCold (§0` | The engagement scope, or the discovery document request — the failure is always the same failure, a deliverabl… | STRONG | A prompt is a scope of engagement, and it fails the way a scope fails: a deliverable named with no audience, no form and no facts attached. |
| Benchmark index (Artificial Analysis Intelli | `s10 (§05 ` | Benchmark selection and backtest overfitting — an index measures the tasks its authors chose, and anything tun… | STRONG | An intelligence index is a benchmark like any other: it scores the tasks its authors picked, and a model trained to top it is the same animal as a strategy backtested until it beat… |
| Confidence chips (H / M / L) attached to eve | `s1 (§00, ` | Workpaper standards and tick-marks — the record of how good the evidence was, which is the only part a reviewe… | STRONG | The H, M and L chips on this page are workpaper tick-marks: they do not record what you concluded, they record how good the evidence was, which is the only thing a reviewer can tes… |
| The sampler stack — nine filters whose defau | `s8 (Appen` | Rebalancing bands, and planning-software defaults — Top P and Min P are literally tolerance bands set once, in… | STRONG | Top P and Min P are rebalancing bands: a rule fixed in advance about how far from the leader you will still tolerate, set once by someone who has left, and never revisited since. |
| Power-law tail with no natural cutoff — ever | `s2 (§02 P` | Tail risk and the VaR cut-off — every risk model contains somebody's decision about the point past which the d… | STRONG | A rank distribution with no natural cutoff is a return distribution with no natural cutoff: every model contains someone's decision about where the tail stops counting, and the dam… |
| Abstention scored the same as a wrong answer | `s9 (§04 C` | A review or compensation structure that counts recommendations made and never credits "no recommendation" — th… | STRONG | A scoring rule that gives no credit for "I don't know" produces a model that always answers, the same way a review process that only counts recommendations made produces an advisor… |
| Reproducibility of a wrong answer — a stable | `SCRIPT li` | The carried-forward error — a figure that reconciles every quarter because everyone checks it against last qua… | STRONG | A stable wrong answer is a carried-forward error: it survives because it is checked against last quarter's copy of itself rather than against the source, which is how a 2016 divide… |
| Retrieval and grounding versus generating fr | `SCRIPT li` | Custodial reconciliation and the due-diligence file — a figure is only as good as the statement you tied it ba… | PARTIAL | Retrieval is reconciliation: an unsourced figure from a model and an unreconciled figure from a custodian are the same object, and both are resolved by tying back rather than by as… |
| Tokenisation — the model bills, measures and | `s5 (§03 T` | Tax-lot selection and the custodial unit of account — the position is what you discuss, the lot is what the sy… | PARTIAL | A token is to a word what a tax lot is to a position: the unit the system actually transacts on rather than the one you talk in, and every cost and every error is computed on the s… |

**`session-2` — 18 undrawn analogues**

| ML concept | § | Planning analogue | Strength | The one sentence that would draw it |
|---|---|---|---|---|
| Cost per finished task versus cost per token | `s5` | The fee/alpha frontier — expense ratio versus net-of-fee outcome, and share-class selection where the cheapest… | STRONG | Ranking models by token price is ranking funds by expense ratio: the number on the sheet is not the number you keep, and the only frontier that matters is the one plotted against t… |
| The Artificial Analysis Intelligence Index a | `s5` | Benchmark selection and index reconstitution — choosing an index that matches the mandate, and knowing that th… | STRONG | An intelligence index is a benchmark like any other: it measures a composite somebody else chose, it is reconstituted without asking you, and a model that leads it can still be the… |
| Hallucination base rates (58–88% general-pur | `s10` | Base rates you already quote to clients — the share of active managers that trail their index over ten years —… | STRONG | You already price decisions off base rates when you tell a client what share of active managers trail the index over ten years; a 58-to-88 percent citation failure rate is that sam… |
| Retrieval grounding returning the nearest pa | `s12` | Document version control in a due diligence file — pulling the 2011 will when the later restatement governs, o… | STRONG | Retrieval hands you the nearest passage, not the governing one, which is the same failure as reading the 2011 will out of the Cole folder when the 2014 buy-sell is the document tha… |
| Fine-tuning versus grounding | `s12` | Model portfolios versus custom portfolios — changing the instrument for everyone versus changing what is known… | STRONG | Fine-tuning is amending the model portfolio; grounding is opening this client's file — one changes what the tool does for every household, the other changes only what it knows abou… |
| Prompt specification — P.T.C.F and the ten s | `s6, s6b, ` | IPS drafting — objective, constraints, permitted universe and review standard all fixed in writing before anyo… | STRONG | A specified prompt is an investment policy statement for one task: the objective, the constraints, the permitted sources and the standard the result will be judged against, all fix… |
| 'Specified is not the same as grounded' (tri | `s7` | KYC — a complete form is not a verified identity; completeness and verification are separate tests | STRONG | A fully specified prompt with no named source is a completed KYC form nobody checked against a document: complete and verified are two different findings. |
| 'The prompt is not the record' — sampling me | `s3` | Workpaper standards and trade-blotter discipline — the confirmation, not the ticket, is the record of what you… | STRONG | Storing only the prompt is storing only the ticket; the workpaper standard you already keep says the record is the confirmation that came back, because that is the thing you acted … |
| The persona study's 'best role, chosen per q | `s6` | Backtest overfitting — in-sample selection outperforms precisely because the answer was known when the choice … | STRONG | The best persona can only be picked once the answer is known, which is exactly why a strategy that selects its factors in hindsight backtests beautifully and funds nobody's retirem… |
| Laplace on probability as a property of the  | `s2` | Risk tolerance questionnaires — the score measures what the client brings to the question, not the risk that i… | STRONG | Laplace's distinction is the one you already make about a risk tolerance score: it measures what the observer brings to the question, never what the market will do. |
| The feed-forward pass cannot hold a running  | `s4` | Ledger arithmetic carried across periods — Meg's remaining $12,998,000 exclusion, the note balance after each … | STRONG | A forward pass has nowhere to keep a running total, which is why it cannot be trusted with Meg's remaining exclusion or the note balance after each call — those are ledgers, and a … |
| The H / M / L confidence chips attached to e | `s5, s10, ` | Workpaper tick marks and the tiering of verification in a due diligence file — traced to source, agreed to a s… | STRONG | The H/M/L chips are workpaper tick marks: they record how far each number was traced, so a reviewer can tell at a glance which figures were agreed to source and which were only rep… |
| Embeddings and vector distance (assigned as  | `s12` | Sector correlation and factor exposure — things sit close together because they move together, not because the… | STRONG | Two words sit close in embedding space for the same reason two holdings sit close in a correlation matrix: proximity is measured by co-movement, and co-movement is not sameness. |
| 'Re-asking is not verification' — a second d | `s3` | Independent corroboration in due diligence — a second pull of the same custodial statement is not a second con… | PARTIAL | Two runs of the same model are no more independent than two prints of the same custodial statement — corroboration requires a different source, not a second look at the same one. |
| Consumer tools do not expose temperature; yo | `s3` | Rebalancing bands — you cannot set the volatility, only the tolerance band and the rule that fires when it is … | PARTIAL | You cannot turn the sampler down, so you narrow the output space instead — the same move as accepting that markets move and controlling the consequence with a rebalancing band rath… |
| The n⁻¹ candidate distribution — rank 1 hold | `s1` | Concentration and the long tail in a portfolio — the Cole brokerage's 62% in three technology names against ev… | PARTIAL | The candidate list has the shape of the Cole brokerage account — a few names carry most of the weight and a long tail carries the rest — and in both cases it is the tail that produ… |
| Token pricing versus subscription pricing (t | `s5` | Fee-model selection — an AUM or flat retainer against hourly billing: predictable and cross-subsidising heavy … | PARTIAL | Choosing a subscription over per-token billing is the decision you make every time you set a fee schedule: a flat rate is predictable and cross-subsidises the heavy user, a metered… |
| Model tier selection with a stated reason | `s5` | The due diligence file behind a manager or product selection — the memo that says why this instrument and not … | PARTIAL | Naming the tier and the reason in one sentence is writing the selection memo: if the file does not say why this one and not the cheaper one, the decision is undocumented. |

**`session-3` — 18 undrawn analogues**

| ML concept | § | Planning analogue | Strength | The one sentence that would draw it |
|---|---|---|---|---|
| Embeddings and vector distance — cosine / Eu | `s2 (also ` | Sector correlation and correlation-based diversification | STRONG | Cosine similarity between two chunks is the correlation coefficient between two holdings: both measure co-movement in the record and neither tells you the two things are the same e… |
| Distributional similarity against referentia | `s3` | Risk tolerance questionnaires: identical scores placed in the same bucket because two clients answered alike, … | STRONG | A questionnaire places two households near each other for the same reason an embedding places alligator next to crocodile — they answered in the same frame — and the one condition … |
| Chunking and condition orphaning — a rule se | `s4, s5 (A` | Workpaper standards: a workpaper must identify its own account, period and source without the reviewer holding… | STRONG | A chunk that states a valuation rule without its trigger fails the same test a workpaper fails when a reviewer cannot tell from the page alone which transaction it belongs to, and … |
| The residual failure floor — 1.9% after ever | `s6 (also ` | Rebalancing bands: you buy error down to a band you can defend, not to zero, because closing the last of it co… | STRONG | 1.9% is a rebalancing band, not a bug: you set the width you can defend, you write down what sits inside it, and you stop paying to close a gap the corpus will not let you close. |
| Vendor-reported benchmark measured by the ve | `s6, s7, s` | A backtest run by the designer of the strategy over the period that suits it | STRONG | A vendor's own retrieval benchmark is a backtest run by the manager who designed the strategy on the period that flatters it, and you would not buy the fund on that, so do not buy … |
| Cross-study comparison — three different tas | `s7 (figHa` | Benchmark-index selection and peer-group mismatch: ranking a manager against an index that does not describe t… | STRONG | Putting Magesh, Vectara and Anthropic on one axis is benchmarking a small-cap manager against the S&P 500: the picture is legible, the ranking it invites is not, and the caveat has… |
| Grounded, sourced, quoted accurately, materi | `s6 (scrip` | Suitability review: a real, correctly-cited authority or product applied to facts it does not govern | STRONG | Article VII is a suitability failure in miniature — a real provision, correctly quoted, applied to a transaction it does not govern — which is the thing a suitability review is bui… |
| Context window as the build-or-skip threshol | `s6` | The fee/alpha frontier: a permanent complexity cost against a gain the asset base is too small to produce | STRONG | Buying retrieval for a nine-document file is the fee/alpha frontier in software form: you pay a permanent complexity fee for an improvement the corpus is too small to generate. |
| Fine-tuning against grounding — facts baked  | `s8 (Appen` | An IPS you amend against a fund mandate you can only replace | STRONG | Grounding keeps firm knowledge in a document you amend, the way an IPS holds the policy; fine-tuning bakes it into the product, the way a fund's mandate does, and you cannot amend … |
| Silent index staleness — the pipeline keeps  | `s8 (Appen` | Stale price marks on illiquid or private holdings, and the reconciliation cadence that is the only thing that … | STRONG | An index not rebuilt after the appraisal changed is a stale price mark: confidently displayed, reconciling to nothing current, and visible only to a scheduled check nobody has assi… |
| Confidence chips — H / M / L on every figure | `all secti` | The assumptions page of a financial plan: each input labelled verified, client-reported, or assumed | STRONG | The H/M/L chips do for a source what a plan's assumptions page should do for an input — say whether the number was verified, reported or assumed — so the reader prices the uncertai… |
| Prompt specification — the ROLE / TASK / PRO | `s13` | IPS drafting and the engagement letter: the constraints section is the part that has to survive contact with s… | STRONG | The CONSTRAINTS block does for a prompt what the prohibited-transactions clause does for an IPS: it is written for the moment somebody wants a different answer, and it is worthless… |
| Ranking margin — top-1 and top-2 separated b | `s4 (scrip` | Manager or fund selection where the top two candidates are separated by less than tracking error, and the scor… | PARTIAL | A 12% margin between the top two chunks is two managers inside the noise band of the same screen: the ranking has told you it could not decide, and nothing downstream will repeat t… |
| Corpus uniqueness, not model quality, is wha | `s4 (scrip` | Custodial reconciliation: you tie to the one authoritative record, and the discrepancies live wherever a figur… | PARTIAL | The discount retrieved cleanly because it exists in exactly one document, which is the same reason you reconcile to the custodian rather than to the statement the client forwarded. |
| Published hallucination rates as base rates  | `s7` | Sample-size caveats in survey research — your own file is an unmeasured sample of one | PARTIAL | 3.3% is a base rate from a corpus that is not yours, and your own hit rate is an unmeasured sample of one, which is exactly the caution you would apply to a manager with three year… |
| Hybrid search — a lexical index alongside th | `sHY (Appe` | Matching by CUSIP rather than by fund name in custodial reconciliation — an identifier match run beside a judg… | PARTIAL | BM25 beside the vector index is CUSIP matching beside name matching: one of them is allowed to be approximate and the other is not, and you run both because the defined term is whe… |
| The extraction step — a model deciding which | `s10` | KYC and discovery document requests: deciding which of what the client said becomes a documented fact in the f… | PARTIAL | Extraction is the KYC decision made by software: which of what was said becomes a fact in the file, and the constraint on Nathan is exactly the item a discovery request would have … |
| Token counting — chars/4 as the unit the col | `sCold (sc` | Basis-point fee arithmetic: the unit you are billed in is not the unit you think in | WEAK | A token is the basis point of a prompt — the unit the invoice uses and not the unit you compose in — so the count is worth reading for the same reason you convert a fee to dollars … |

**`session-4` — 21 undrawn analogues**

| ML concept | § | Planning analogue | Strength | The one sentence that would draw it |
|---|---|---|---|---|
| Non-determinism: the same prompt returns a d | `s8` | Archiving the Monte Carlo assumption set and the seed alongside the plan you delivered, because re-running the… | STRONG | You already archive the assumption set behind a Monte Carlo run because re-running it gives a different number; the prompt, the model and the effort setting are those same fields f… |
| Retrieval returns the nearest passage, which | `s0` | Comparable-company selection in a valuation — the nearest comp by revenue and SIC code is not the most compara… | STRONG | Nearest is not most comparable — the error you would catch instantly in a comp set is the one a retrieval index makes for you silently, and with a citation attached. |
| Grounding versus fine-tuning | `s0` | Model portfolios versus custom portfolios — grounding swaps the sleeve for one client, fine-tuning rebuilds th… | STRONG | Grounding is a custom portfolio assembled per client from live holdings; fine-tuning is a model portfolio you must rebuild for every account at once, which is why documents that ch… |
| Fine-tuning bakes the corpus into the weight | `s0` | Commingling — once assets go into a pooled vehicle you cannot hand one investor's specific property back, and … | STRONG | Fine-tuning commingles: once a client's file is in the weights, a deletion request is as answerable as unwinding one investor's property out of a pooled vehicle. |
| The 200,000-token pricing cliff that re-bill | `s3` | A non-marginal breakpoint — the inverse of a tax bracket, where crossing the threshold re-prices the whole bal… | STRONG | This is a breakpoint running the wrong way: unlike a marginal bracket, crossing 200,000 tokens re-prices the whole request rather than the overage. |
| Sticker token price versus measured cost per | `s3` | Expense ratio versus total cost of ownership — the published fee is the one cost that is quoted and never the … | STRONG | A per-token price is an expense ratio: the only cost that is published, and never the cost you actually incur. |
| Dominated points on the cost-versus-capabili | `s3` | Fund and share-class selection — a class that costs more and returns less is dominated, and the reasons to hol… | STRONG | A dominated model is a dominated share class — worse on both published axes and still not automatically the one you leave, because the switching cost lives off the chart. |
| Benchmark incomparability — the 50% AA hallu | `s7` | Benchmark and composite comparability in performance reporting — you do not measure a portfolio against an ind… | STRONG | Two hallucination rates from two instruments are two portfolios measured against two different indices over two different periods: each is true, and the difference between them is … |
| 1 − (1 − p)^N: the compounding probability t | `s7` | Reconciliation exception rates — a small per-line error rate becomes a near-certainty across a full statement,… | STRONG | This is the reconciliation arithmetic you already accept: a low per-line exception rate becomes a near-certainty across a statement, which is why you tick every line and not a samp… |
| The independence assumption fails — citation | `s7` | Correlation going to one in a drawdown — the diversification you priced as independent stops being independent… | STRONG | Citation errors correlate the way sector returns correlate: they arrive together, in the one query that was furthest from familiar ground. |
| The model estimates a distribution over next | `sWS` | A projection or optimiser that returns an output the arithmetic forbids — a distribution larger than the accou… | STRONG | It estimates a distribution instead of checking a constraint, which is the same defect as a projection engine that quietly returns a distribution larger than the account it draws o… |
| Presence is evidence, absence is not — the w | `sW1` | A clean disciplinary record — no disclosure event on a Form ADV or BrokerCheck report is not evidence of good … | STRONG | A missing watermark is a clean BrokerCheck record: it rules nothing in, and reading it as a clearance is the exact error the control exists to prevent. |
| Watermark capacity is bounded by output entr | `sW2` | Materiality — documentation and control concentrate precisely where the range of acceptable answers is narrow,… | STRONG | Provenance marking is materiality review run backwards: it protects the paragraph nobody would sue over and leaves the number that carries the file unmarked. |
| The standing instruction written into a syst | `s5` | An Investment Policy Statement — drafted before the pressure arrives, binding on conduct in the moment, and va… | STRONG | A standing instruction is an IPS for an assistant: written in calm, invoked under pressure, and worth exactly what its refusal clauses are worth. |
| Scoring a tool against the payload rather th | `s4` | Suitability — no product is suitable in the abstract, only against a stated fact pattern, which is why the KYC… | STRONG | A tool is no more suitable in the abstract than a product is: the payload is the client file, and a scorecard run without naming it is a recommendation made without a KYC. |
| Confidence chips H / M / L attached to every | `FOOTER` | The assumptions page of a financial plan — which figures are statutory, which are quoted from a statement, and… | STRONG | The chips are an assumptions page: every number a client sees should carry the same three-way mark — statute, statement, or your estimate. |
| Fixed workflow cost amortised across runs ve | `sD` | The build cost of a model portfolio or a template, paid once, against per-account tax-lot work that is incurre… | STRONG | Vendor diligence and the record block are template build cost, paid once; citation checking is tax-lot work, paid per account — and only the second one scales. |
| Source staleness and knowledge cutoff — a ca | `sWS` | The Cole file's own 2014 buy-sell formula, producing roughly $18,000,000 against a $55,000,000 indicated value… | STRONG | The syllabus went stale exactly the way the 2014 buy-sell did — correct when written, never re-read, and load-bearing on the day someone relies on it. |
| Retention and training defaults — a five-yea | `s3` | Default beneficiary designations and default share classes — the election nobody made governs the outcome, and… | PARTIAL | A retention toggle nobody opened governs five years of client text the way an unreviewed beneficiary designation governs an account: the default is a decision, made by someone who … |
| Mixture-of-experts — 2.8 trillion total para | `sWS` | Notional versus net exposure in a derivatives overlay, and the related point that headline AUM does not predic… | PARTIAL | Total parameters against active parameters is notional against net exposure: the big number is the one that gets quoted and the small one is what is actually working. |
| Embeddings and vector distance | `s0` | Risk-tolerance questionnaire scoring — a household is collapsed into a handful of dimensions, and whoever land… | PARTIAL | An embedding does to a document what a risk questionnaire does to a household: collapses it to coordinates, then treats whatever lands nearby as the same case. |

**`session-0.1` — 23 undrawn analogues**

| ML concept | § | Planning analogue | Strength | The one sentence that would draw it |
|---|---|---|---|---|
| Context window as a finite budget with compe | `s4` | Asset allocation normalised to 100%: every position you add dilutes every other position, and the dilution nev… | STRONG | A context window is an allocation, not a container: it always sums to 100%, so every connector you enable is a position funded by selling down everything else in the window. |
| A 50-cell lookup table covering 0.132% of 38 | `s4` | Model portfolios versus rules-based custom construction: a shelf of pre-built models covers a fraction of the … | STRONG | The same reason you do not keep a model portfolio for every client permutation is the reason this section is a composition engine and not a grid: you hold rules, not cells, because… |
| Illegal states — 100,224 of 138,240 naive co | `s4` | The IPS permitted-holdings matrix and suitability review: most of the naive product of vehicle x account type … | STRONG | An IPS is mostly a list of things that are greyed out, and it works for the same reason this rail does: naming why a choice is unavailable teaches the constraint, while hiding it t… |
| Connector tool definitions load on every tur | `s7` | Fee drag / expense ratio: a standing charge levied every period regardless of whether the capability is exerci… | STRONG | An enabled connector is an expense ratio, not a transaction fee: it is charged on every turn, it does not ask whether you used it, and nobody notices it on any single run. |
| An irrelevant installed skill — "its name an | `s4` | The legacy position nobody rebalanced out of, or the market-data subscription the firm still pays for and no l… | STRONG | An installed skill you never trigger is the legacy position in the taxable account: it is not doing anything, it is not free, and it is still there because nobody ran the review. |
| Project knowledge served as retrieved chunks | `s6` | Tax-lot selection, and the sample-versus-population problem: what gets pulled from the file is a selection mad… | STRONG | Retrieval picks lots: it hands the model a selection out of your project file the way a custodian hands you a cost basis out of your lots, and if you did not specify the selection … |
| Stored versus in context — a project file ex | `s6` | Custodial reconciliation: a position can be held at the custodian and absent from the report on the table in f… | STRONG | Stored and in context are the custodian and the statement: the holding can be real and still not be on the page you are reading from, and only a reconciliation tells you which. |
| Rung 0 is the only rung that leaves no trace | `s5` | Negative assurance versus positive assurance in a due diligence file, and the Cole file's own missing items — … | STRONG | This is the missing appraisal in the Cole file, not the wrong one: a document that was never requested leaves no mark anywhere in the record, which is exactly why you check the req… |
| Haiku 4.5's 200K window truncating a 700,000 | `s2` | Survivorship and truncation bias in a backtest: a study run over the window that fitted reads exactly like a s… | STRONG | A window overflow is a truncated backtest: the output carries no mark saying which years were dropped, and a confident summary of the surviving sample is indistinguishable from a s… |
| The illustrative effort curve — "the bend in | `s3` | Backtest overfitting and the illustrative efficient frontier: a curve whose shape is an assumption, presented … | STRONG | You already know this shape: it is the smooth frontier in a fund deck, where the direction is defensible, the curvature is fitted, and taking a number off it is taking a number som… |
| Estimates scored against a range and a floor | `s5` | A valuation expressed as a range, not a point — the Cole file's own $18,000,000 buy-sell formula against a $38… | STRONG | "Five or more tool calls" is the buy-sell formula's $18,000,000: a bound somebody published, not a number somebody measured, and scoring against it as though it were a point is how… |
| Fine-tuning versus grounding — "the weights  | `s1` | The firm's standing house view baked into the model lineup versus the monthly rate sheet you pull fresh: one i… | STRONG | Nobody in this room has memorised this month's AFR, and neither has the model: the house view is in the weights, the rate is in a layer, and layers empty out the moment the turn en… |
| The Documentation Card — configuration recor | `s8` | Workpaper standards and books-and-records: the file that lets a decision be reconstructed by someone who was n… | STRONG | This card is a workpaper, and it obeys workpaper discipline: it records how the conclusion was reached, it is legible to a reviewer who was not present, and it never becomes a seco… |
| Confidence chips H / M / L with a per-record | `s0` | Workpaper tickmarks: sourced, computed and unsupported get different marks, and an unsupported figure is left … | STRONG | H, M and L are tickmarks: one says I saw the source, one says I derived it and here is the derivation, and the blank says nobody has supported this yet — which is why the price per… |
| Memory generated from a conversation survive | `s6` | Books-and-records retention: destroying your working copy does not touch the firm's archive, and the archive i… | STRONG | You already know this from email: deleting it from your mailbox does not delete it from the archive, and the archive is the copy that gets produced. |
| A paused memory retains existing entries and | `s6` | Suspending a rebalancing rule: the stale allocation stays in force, and the drift accumulated during the suspe… | STRONG | Pausing memory works like suspending the rebalancing band: the old position stays, the drift in the gap is lost, and switching it back on does not go back and catch up. |
| Configuration is a property of the turn, not | `s3` | The rate that governs is the rate at execution, not the rate at drafting — precisely the flag the P2 capture i… | STRONG | Configuration behaves like the AFR on a note: what governs is what was in force at the moment of execution, not what was on the screen when you started drafting. |
| Model selection driven by an instrument prop | `s2` | Suitability review: the deciding fact is a documented property of the instrument tested against a stated clien… | STRONG | Every one of these five is a suitability question: the answer turns on a documented property of the instrument tested against a constraint you stated, and "which model is best" is … |
| Captured transcript versus authored fragment | `s4` | Marking client-provided figures against advisor-derived figures on a balance sheet, and the reconciliation tha… | STRONG | The tinted inset is the same rule as the balance sheet: what the client told you and what you computed never share a typeface, because once they merge nobody can unmerge them. |
| Token pricing withheld — price per MTok prin | `s2` | The fee/alpha frontier and expense-ratio due diligence: the number that should decide the recommendation, refu… | STRONG | Price per MTok is the expense ratio of this decision, and a blank is the right entry for it in the same way you would not put a guessed expense ratio in a fund comparison you inten… |
| Temperature and sampling from a distribution | `s8` | Monte Carlo simulation — the same run, resampled, produces a different path, and the distribution rather than … | STRONG | Temperature 1.0 means this run is one path, not the answer, in exactly the way one Monte Carlo trial is one path and not a plan. INSTRUCTOR NOTE: this analogue has almost no hook i… |
| Progressive disclosure — a skill's name and  | `s7` | The cover memo and the exhibits in a due diligence file: the index is always read, the exhibit only when somet… | PARTIAL | A skill is filed the way a due diligence binder is: the index page is always in front of the reviewer, and the exhibit gets pulled only when the index gives a reason to pull it. |
| Five connectors' tool definitions as the sin | `s4` | Concentration risk — the Cole file's own 82.1% in CPC and 62% of the brokerage in three technology names. | PARTIAL | Five connectors is 82.1% in one name: a single decision quietly claiming most of the capacity, with every other holding sized by what it left over. |

---

## 7. Prose density — words per allocated minute, core and appendix separately

### 7.1 Method, stated because the existing figures disagree with each other

Three different density numbers are already in circulation in this repo and they
are not measuring the same thing:

| Source | S0.1 | S1 | S2 | S3 | S4 | What it counts |
|---|---|---|---|---|---|---|
| `audit/AUDIT-2026-08-20.md` Q15 | — | 67.4 | 73.6 | 57.9 | 68.8 | whole file / 150 |
| `audit/AUDIT-2026-08-23.md` headline | 60.0 | 56.5 | 66.7 | 64.5 | 73.6 | whole file / 150 |
| `validate_lesson.py` C1 (INFO) | 86.1 reported for 0.1 | | | | | **counts markup as words** |

`CHANGELOG.md` already flags the third: *"The prose-density figure the validator
reports is not a prose measurement. It counts markup as words, because the method
never strips tags. Reported 86.1 words per allocated minute; the tag-stripped
section figure is 44.9."* Confirmed at
`validate_lesson.py:190` — it strips `<script>` and `<style>` but never strips
tags, so every `<span class="conf h" data-src="src-wolfram">` contributes words.

None of the three splits core from appendix, which is what you asked for.

**The method used here.** Per `<section>`: strip `<script>`, `<style>` and HTML
comments, then strip all tags, then resolve entities, then count tokens containing
at least one alphanumeric. Minutes come from that section's own
`<span class="mins">N min</span>`. Core = sections without `.apx`/`.apxdiv`;
appendix = sections with `.apx`. The appendix divider is counted as neither.
Script-embedded student-facing copy (exercise feedback strings that are written
into the DOM) is counted **separately**, because it cannot be attributed to a
section and because a student only reads it if they run the exercise.

### 7.2 The measurement

| Lesson | Core min | Core words | **Core w/min** | Apx min | Apx words | **Apx w/min** | All static w/min | Script copy (words) | All incl. script w/min |
|---|---|---|---|---|---|---|---|---|---|
| session-0.1 | 120 | 6,813 | **56.8** | — | — | **n/a** | 56.8 | 6,386 | 110.0 |
| session-1 | 67 | 3,513 | **52.4** | 83 | 2,798 | **33.7** | 43.2 | 1,337 | 52.1 |
| session-2 | 67 | 5,543 | **82.7** | 83 | 2,677 | **32.3** | 55.7 | 1,651 | 66.8 |
| session-3 | 70 | 5,503 | **78.6** | 80 | 2,434 | **30.4** | 53.7 | 5,309 | 89.1 |
| session-4 | 70 | 5,856 | **83.7** | 80 | 3,465 | **43.3** | 63.1 | 5,174 | 97.6 |

Against the proposed-but-unratified 37–42 band.

### 7.3 What this says

**The finding is the split, and it runs the wrong way.**

- **The appendix is inside or below the band in all four lessons** (30.4 – 43.3).
- **The core is 1.25× to 2.0× above it in all four** (52.4 – 83.7).
- The whole-file figures already in the audits (56–74) are an *average of the two*
  and hide this completely. They report a corpus that is uniformly somewhat dense.
  It is not. It is a very dense core wrapped in a comfortably paced appendix.

That is the opposite of the design intent. The appendix is where a reader goes for
depth, at their own pace, alone. The core is what runs live at the podium with 25
people in the room and no ability to reread. The core has 1.25–2.0× the words per
minute of the optional material.

**Session 1 is the exception and the control.** Its core runs at 52.4 — the only
core under 60, and the closest to the band. It is also the lesson with the largest
appendix (7 sections, 83 minutes). Whatever pass produced session 1's split did the
thing the other three did not.

### 7.4 The worst sections, by words per allocated minute

Every section at or above 100 w/min. These are the specific stalls behind the
lesson averages:

| Lesson | Section | Nav | Min | Words | **w/min** |
|---|---|---|---|---|---|
| session-0.1 | `s11` | Ritual / Baseline and close | 7 | 1,580 | **223** |
| session-4 | `s8` | The record | 5 | 906 | **181** |
| session-2 | `s0` | Session map | 6 | 886 | **146** |
| session-4 | `s5` | Threat model | 5 | 724 | **145** |
| session-2 | `s12` | Final project | 5 | 723 | **144** |
| session-4 | `s3` | What the contract changes | 5 | 732 | **143** |
| session-3 | `s12` | Consent | 6 | 776 | **126** |
| session-3 | `s13` | Basis | 6 | 770 | **126** |
| session-4 | `s10` | Relay | 3 | 336 | **112** |
| session-3 | `s16` | Part 1 + handoff | 5 | 567 | **112** |
| session-4 | `s7` | The verification burden | 5 | 560 | **111** |
| session-1 | `s15` | Close | 5 | 520 | **104** |
| session-3 | `s7` | Grounded error | 5 | 526 | **103** |

Twelve of the thirteen are **core** sections. Nine of the thirteen are in the
**back half** of their lesson. Session 0.1 `s11` at 223 w/min in seven minutes is
the densest thing in the repository by a factor of 1.2 over the next worst.

**These will correlate with, but are not the same as, the item-5 complexity
ranking.** Density is component C5 at 10% weight. A section can be dense and easy
(session 2 §09, the final-project brief, is 144 w/min of instructions a CFP
understands on first read) or sparse and hard (session 1 Appendix A2 is 27 w/min
and is a fitting exercise). The overlap between this table and the ≥75th-percentile
complexity list is itself a result worth reporting once the scoring runs.

### 7.5 A method decision you owe

The 37–42 band is unratified in every document that mentions it, and it is
currently applied to whole files. If it is ever ratified, **ratify it against the
core, not the file** — a band that a lesson passes by having a long appendix is
measuring the wrong thing. On the numbers above, no core in the corpus passes a
37–42 band, and three of four cores would need roughly a third of their words
removed or a third more minutes to reach it.

---

## 8. Appendix reflow feasibility

Question: could selecting a tier reorder the DOM so an appendix section moves up to
sit immediately after the core section named by its `data-insert-after`, so a reader
goes straight down the page instead of jumping to the appendix and back?

### 8.1 How the tier filter works today

The control is one IIFE, **byte-identical in all four files**:

| File | Block |
|---|---|
| `session-1/index.html` | 3024–3065 |
| `session-2/index.html` | 2981–3022 |
| `session-3/index.html` | 2629–2670 |
| `session-4/index.html` | 3220–3261 |

Using session-1 line numbers (add the offset for the others):

- **3026** — bails unless `#tierbar` exists.
- **3027–3029** — captures three arrays **once, at load**: `apx` (`section.apx`), `cards` (`a.apxcard`), `links` (`a.apxlink`). These are snapshots; nothing rebuilds them.
- **3030–3031** — `ORDER=['foundational','standard','advanced']`; state is two closure variables, `level=1` and `coreOnly=false`. Neither is persisted (no storage anywhere in the repo — `verify-migration.mjs:207` enforces "no browser storage").
- **3034–3055 `apply()`** — the whole mechanism:
  - **3035** toggles `core-only` on `document.body`.
  - **3037–3042** for each appendix section, reads `sec.dataset.tier`, compares `ORDER.indexOf(t) <= level`, and **toggles the class `dim`**. It does **not** hide, does **not** remove, does **not** move. Out-of-scope sections stay in the flow.
  - **3043–3047 `sync()`** dims the matching `a.apxcard` / `a.apxlink` by resolving each anchor's `href` fragment through `getElementById` — **id-based, order-independent, already reflow-safe**.
  - **3048–3054** writes the `#tierOut` readout, summing `.mins` chips from in-scope sections against the hard-coded `window.__coreMins` (s1:3022 = 67, s2:2979 = 67, s3:2627 = 70, s4:3218 = 70).
- **3056–3063** — one delegated click handler on `#tierbar` itself. `data-core` toggles core-only; `data-level` sets the level and clears core-only; then `apply()`.
- **3064** — initial `apply()`.

The visual effect is pure CSS (session-1 786–797; s2 706–713; s3 678–685; s4 696–703):

```
793: section.apx.dim{opacity:.32}
794: section.apx.dim .apxback{opacity:.5}
795: a.apxcard.dim,a.apxlink.dim{opacity:.3}
796: body.core-only section.apx,body.core-only section.apxdiv,body.core-only a.apxlink{display:none}
797: @media print{body.core-only section.apx,body.core-only section.apxdiv{display:none}#tierbar{display:none}}
```

**So: it hides only in "Core only" mode. Tier selection merely fades to 32% opacity.** Note also that `dim` is an overloaded class name — `.dim{color:var(--muted)}` at s1:63 and s1:495 — so a dimmed section also inherits muted text colour.

**Markup being filtered** (`data-insert-after` / `data-tier`):

- session-1 — 7 sections: 1706 `s3`→s2/found, 1760 `s4`→s2/adv, 1810 `s6`→s5/found, 1838 `s7`→s5/std, 1873 `s8`→s5/adv, 1943 `s14`→s13/found, 1974 `s14c`→s14b/std
- session-2 — 5: 1686 `s1`→s0/found, 1727 `s2`→s0/found, 1758 `s4`→s3/std, 1793 `s9`→s8/std, 1827 `s12d`→s11/std
- session-3 — 5: 1523 `sHY`→s4/adv, 1549 `s5`→s4/std, 1578 `s8`→s7/found, 1603 `s11`→s10/found, 1629 `s15`→s14/std
- session-4 — 5: 1641 `sRSP`→s2/found, 1665 `sW1`→s5/adv, 1729 `sW2`→s5/adv, 1778 `sWS`→s7/std, 1811 `sD`→sCR/std

All appendix sections are **direct siblings of the core sections inside `div.wrap`** (session-1: wrap opens 1189, sections 1253–2012, `<footer>` 2014–2062, wrap closes 2064). A reflow is therefore a plain sibling `insertBefore` — structurally the easiest possible case.

---

### 8.2 Every piece of JavaScript that breaks under DOM reordering

### 8.2.a Arrays built once at load and indexed later — the core hazard

| File | Lines | What |
|---|---|---|
| session-1 | **2226** | `var secs=all('section.slide')` — snapshot in source order, never rebuilt |
| session-1 | **2229** | `var pips=all('button',rail)` — parallel snapshot |
| session-2 | **1957**, **1959** | same pair |
| session-3 | **1723**, **1727** | same pair |
| session-4 | **1934**, **1938** | same pair |

`secs` and `pips` are positional twins. Because both are captured at load and neither is ever re-derived, the *identity* mapping section→pip survives a DOM move — but the **array order stops being the visual order**, and three consumers depend on that:

**(i) Rail construction and appendix tinting** — s1:2227–2228 / 2230; s2:1958 / 1960; s3:1724–1726 / 1728; s4:1935–1937 / 1939. Pips are appended in snapshot order. If the reflow happens *after* this code (it must — the tier block runs later in the same file), the rail is frozen in the old order: core sections first, then a contiguous gold `apxnav` run at the bottom, while the page interleaves them. `secs.forEach(function(s,i){...pips[i]...})` at s1:2230 is index-coupled and would need re-running.

**(ii) IntersectionObserver "current section"** — s1:**2238–2240**; s2:**1961**; s3:**1729–1731**; s4:**1940–1945**. `var i=secs.indexOf(e.target); pips.forEach(function(p,j){p.classList.toggle('on',j===i)})`. The lookup is by node identity so it highlights the *right* pip, but the rail is no longer monotonic — see Failure Mode 1. Separately, reparenting an observed element makes the observer re-evaluate and fire a burst of callbacks; because `apply()` runs on *every* tier-bar click, each click would re-fire intersection for every moved section.

**(iii) Arrow-key section navigation — genuinely broken, session-1 only** — **s1:2250–2253**:
```
var cur=0,mid=window.innerHeight/2;
secs.forEach(function(s,i){if(s.getBoundingClientRect().top<=mid)cur=i});
scroll(secs[...cur+(ArrowRight?1:-1)...]);
```
This walks `secs` in **array order**, taking the *last* index whose rect is above the viewport midpoint, and then steps ±1 **in the array**. It is only correct while array order == geometric order. After a reflow, `cur` resolves to whichever *array-latest* section happens to be above the fold — which after reflow is an appendix section now sitting near the top of the page. Sessions 2, 3 and 4 have no arrow-key section nav (their only `ArrowRight` handling is the case-modal tab roving at s2:1059, s3:1027, s4:1046, which is unaffected).

**(iv) Completion pip marking — session-1 only** — **s1:2235**: `var i=secs.indexOf(c.closest('section.slide')); if(pips[i])pips[i].classList.add('done')`. Identity-based, so the correct pip gets marked; but the "done" dots then appear scattered against a rail whose order no longer matches the page. Sessions 2–4 `mark()` (s2:2966–2972, s3:2577–2583, s4:3167–3173) does not touch pips at all.

### 8.2.b The tier block's own arrays

`apx` / `cards` / `links` at s1:3027–3029, s2:2984–2986, s3:2632–2634, s4:3223–3225 are id-resolved (`idOf` at s1:3033, `getElementById` at s1:3044) and survive reordering intact. **But `apply()` is not idempotent with respect to position**: if a move is added inside `apply()`, every one of the four tier buttons re-runs it, so the reflow must compute an absolute target position from `data-insert-after` each time rather than "move relative to where you are now". Two sections sharing one anchor (session-1 `s3`+`s4`→`s2`, `s6`+`s7`+`s8`→`s5`; session-2 `s1`+`s2`→`s0`; session-3 `sHY`+`s5`→`s4`; session-4 `sW1`+`sW2`→`s5`) have **no declared tie-break** — their relative order today is implicit in the trailing block's source order, and any naive `insertAfter(anchor)` loop will silently reverse them.

### 8.2.c Scroll handling

- **`html{scroll-behavior:smooth}`** — s1:51/485, s2:51/489, s3:51/488, s4:51/488. Combined with runtime node moves this is an active jank source: a smooth scroll in flight while its target's offset changes.
- **`section.slide{scroll-margin-top:...}`** — s1:74/497 (56px), s2:501 (12px) overridden 519 (46px), s3:500, s4:500. Fine under reordering.
- **Progress bar, session-2 only — `session-2/index.html:1962`**: `window.addEventListener('scroll',...)` computing `scrollTop/(scrollHeight-clientHeight)` into `#prog`. Reordering does not change total height, so the bar itself is safe — but it becomes semantically wrong: "50% down the page" no longer means "half the core is done", because appendix minutes are now interleaved.
- **No `offsetTop` caches anywhere.** No second IntersectionObserver (session-4's grep hit of 2 is lines 1940+1941 of the same one). No lazy chart drawing on scroll — every chart is drawn once at load (`plDraw('lin')` s1:2337; `drawFrontier()` s2:2199; etc.), so nothing repaints wrongly.
- **`scrollIntoView` call sites** — s1:2072 (`scroll()` helper), s1:2228, s1:2959; s2:1958; s3:1726; s4:1937. All take a node reference, not an index. Safe.
- **No `overflow-anchor`, `pushState`, `replaceState`, `hashchange`, or `scrollRestoration` anywhere in the four files.** There is no scroll-position compensation of any kind, which is what makes Failure Mode 2 unavoidable without new code.

### 8.2.d Hash / anchor navigation and the back-links

Navigation is entirely native `href="#id"` — there is **no hash router to break**, and every anchor still resolves after a move. The breakage is editorial, not mechanical, and it is extensive:

**`.apxback` return bars** — 21 of them, none print-hidden:
- session-1: 1709, 1763, 1813, 1841, 1876, 1946, 1977
- session-2: 1688, 1729, 1760, 1795, 1829
- session-3: 1525, 1551, 1580, 1605, 1631
- session-4: 1643, 1667, 1731, 1780, 1813

Every one reads "**Insert between §02 Prediction and §03 Tokens — back to §02 · continue to §03 →**". Once the section *is* between §02 and §03, "Insert between" is a false instruction and both links point at what the reader can already see by scrolling one screen either way.

**Worse — "continue to" links that skip a now-inline sibling.** Where two or three appendix sections share an anchor, the earlier one's forward link jumps over the later one(s):
- `session-1/index.html:1709` (`s3`, A1) → `#s5`, skipping `s4` (A2), which reflow places between them.
- `session-1/index.html:1813` (`s6`, A3) → `#s9`, **skipping `s7` and `s8`** — including A5, the 18-minute Sampler Lab.
- `session-1/index.html:1841` (`s7`, A4) → `#s9`, skipping `s8`.
- `session-2/index.html:1688` (`s1`, B1) → `#s3`, skipping `s2` (B2).
- `session-3/index.html:1525` (`sHY`, C5) → `#s6`, skipping `s5` (C1). Note this bar is **also verbatim-identical to `s5`'s bar at 1551** — both claim to sit "between §03 and §04".
- `session-4/index.html:1667` (`sW1`, D1) → `#s6`, skipping `sW2` (D2) — even though D2's own teaser at `session-4/index.html:1357` says "Takes D1 first."

**`a.apxlink` gold teasers** (20 total) — s1:1366, 1367, 1407, 1408, 1409, 1582, 1615; s2:1179, 1180, 1249, 1508, 1606; s3:1206, 1277, 1336, 1466; s4:1356, 1357, 1440, 1592. These already sit at the *end of the exact core section the appendix follows* (e.g. s1:1366–1367 are the last children of `#s2`, which spans 1314–1368). Under reflow each becomes a link to the next screenful — dead weight, and their copy ("If there is time…", "skip it here if Session 3 is close") is written for a decision the reader no longer gets to make.

**`section.apxdiv#apx` — the appendix landing page** (s1:1690, s2:1672, s3:1510, s4:1628) with its `a.apxcard` grid (s1:1696–1702; s2:1678–1682; s3:1516–1519; s4:1634–1637). Under a full reflow this section is left stranded between the last core section and the footer, still titled "— APPENDIX —", still carrying a rail pip, and its cards now all point *upward* into the middle of the page.

**Pre-existing coverage gap that reflow exposes:** `session-3` `sHY` (C5, line 1523) and `session-4` `sRSP` (D5, line 1641) have **no `apxcard` and no `apxlink`** — 5 appendix sections but only 4 cards and 4 links in each file. `CHANGELOG.md:382–384` confirms these two are the newest additions. Today they are reachable only by scrolling the appendix; under reflow they would be the only two that appear inline with no prior signposting at all.

### 8.2.e Progress / completion counters and Shift+U

- **`mark()`** — s1:2232–2235; s2:2966–2972; s3:2577–2583; s4:3167–3173. All resolve by `[data-gate="..."]` selector. Order-independent.
- **Shift+U reveal-all** — s1:**2241–2246** (marks all gates, strips every `.hidden`, runs `REVEALERS` registered at s1:2236–2237); s2:**2973–2977**; s3:**1732–1739** (toggles `body.reveal`, sets `.keyhide` display, then calls six named show-functions); s4:**1948–1954** (`.ansk`→`show`, `.lbox`→`lit`). All operate on `document.querySelectorAll` at press time. **Fully safe under reordering** — and this is the one thing the reflow cannot break.
- No section-count or completion-percentage readout exists anywhere; the only aggregate is the pacing panel below.
- **Pacing readout** — s1:3100–3120 (`section-1` script 3 at 3098), s2:3029–3049, s3:2677–2697, s4:3268–3288. It re-queries `section.slide` at load and buckets by class (`apxdiv` skipped, `apx` vs core), summing `.mins`/`.clock` chips. **Class-based, order-independent — safe.** But note it runs in a *separate later `<script>`*, so any reflow code placed in the main IIFE runs before it.

### 8.2.f Print stylesheets

Print rules per file: s1 126–130, 746, 765, 797; s2 126, 539, 654, 673, 713; s3 126, 625, 644, 685; s4 126, 639, 658, 703.

- `.slide{page-break-inside:avoid}` and `#rail`/`#topbar`/`#prog`/`#ovr`/`#caseModal`/`#lmbox`/`#tierbar` hidden — all class/id based, order-independent.
- `@media print{a.apxlink{display:none}}` (s1:765, s2:673, s3:644, s4:658) — the gold teasers are already print-suppressed, which is *correct* for a reflowed page.
- **`.apxback` is not print-hidden in any file.** A reflowed handout would carry "Insert between §02 Prediction and §03 Tokens — back to §02 · continue to §03 →" as a gold bar in the middle of the running text, 21 times across the course.
- Print output order follows DOM order, so a runtime reflow silently changes the printed handout depending on which tier button was last pressed — with no indication on the page of which arrangement was printed.

### 8.2.g Things that would lose state on a move — audited, and the news is good

- **No `<canvas>` in any of the four files.** All charts are inline declarative `<svg>` written via `innerHTML` (s1:1355 `#plCh`, 1464 `#frontCh`, 1749 `#wallCh`, 1774 `#fitCh`, 1820 `#embCh`; s2:1266, 1284, 1341, 1524, 1531, 1710, 1780, 1814; s3:1795, 2018, 2050; s4:2122, 2173, 2908). No `<script>` inside any SVG. Reparenting inline SVG in the same document preserves it completely.
- **No `<iframe>`, `<video>`, `<audio>`, `<dialog>`, `<details>`.** Nothing to reset.
- **No delegated handler is bound to an ancestor that would be removed.** The delegated handlers are on `document` (s2:1971 copy buttons; every `keydown`), on `#tierbar` (s1:3056 and siblings), or on a `host` element *inside* a section (s4:2219, 2375, 2603, 2664, 2875, 2983, 3040; s3:1826). Listeners travel with the node, so `insertBefore` preserves all of them.
- **Form values survive.** `#corpus` (session-1 appendix `s3`, wired at s1:2384/2411), `#labPrompt`, `#lmTempP`, and every `<input type=checkbox>` keep their IDL values across a move.
- **What *is* lost:** focus (a reparented focused element blurs to `<body>`), CSS transitions/animations restart, and `scrollTop` of any scrollable descendant resets.
- **The decisive caveat:** every guarantee above holds only for `insertBefore`/`appendChild` on the existing nodes. **Any implementation that rebuilds the flow by writing `innerHTML` on `div.wrap` destroys all of it** — the live-model console handlers (`lmTemp`/`lmTempRun` bound at s1:3072–3087, which live *inside* appendix A5), all the `host.addEventListener` delegates, and every entered value.

### 8.2.h Design contradiction that must be settled before any of this

`apply()` (s1:3040) sets `dim`, and `section.apx.dim` (s1:793) is `opacity:.32` — **not `display:none`**. If the sections are reflowed inline while still merely dimmed, a reader on "Foundational" walks straight through faded Advanced material rather than skipping it. Reflow only makes sense if the tier filter is first changed to genuinely remove out-of-scope sections from the flow (a one-line CSS change, plus deciding whether "removed" means `display:none` or a collapsed one-line stub).

---

### 8.3 Failure modes, ranked

**1. The nav rail stops matching the page.** *Symptom:* a student scrolls steadily down and the highlighted pip jumps around — down five, back up to the gold block near the bottom, back up to position four. The rail still lists all core sections first and the gold appendix pips as a contiguous block at the end, because it was built at load from `secs` (s1:2226–2230 and siblings) and never rebuilt. Clicking a pip still works; predicting which pip you are on does not. Session-1 additionally shows "done" ticks scattered against that stale order (s1:2235).

**2. The page jumps under the reader's cursor.** *Symptom:* a student is halfway through §07, presses "+ Advanced", and is suddenly looking at §04 — because three appendix sections were inserted above the current viewport and the scroll offset was not compensated. There is no `overflow-anchor` declaration and no scroll-compensation code anywhere in the four files, and `scroll-behavior:smooth` (s1:51) makes the resulting motion worse rather than better. Every tier click re-runs `apply()`, so this fires on all four buttons.

**3. Arrow keys stop working — session 1 only.** *Symptom:* a student near the bottom of session 1 presses Right and nothing happens; presses Left and lands in the middle of the page. `s1:2250–2253` derives the current section by scanning `secs` in array order and stepping ±1 in that array; once array order and page order diverge, the computation is meaningless.

**4. Return bars instruct the reader to do what has already been done.** *Symptom:* a student reads §02, scrolls into A1, and is told "**Insert between §02 Prediction and §03 Tokens — back to §02 · continue to §03 →**". 21 bars, listed in §2d. The instruction is now false and the two links are one screen apart.

**5. "Continue to" skips a section that reflow just placed inline.** *Symptom:* a student finishes A3 (§03 Meaning space), clicks "continue to §04 →" as instructed, and silently skips A4 *and* the entire 18-minute A5 Sampler Lab (`session-1/index.html:1813` → `#s9`). Same defect at s1:1709, s1:1841, s2:1688, s3:1525, s4:1667. In session 4 this breaks a stated prerequisite — D2's teaser says "Takes D1 first" (s4:1357) while D1's own forward link jumps past D2.

**6. Tier switching double-fires the observer and flickers the rail.** *Symptom:* pressing a tier button makes the pips strobe for a moment. Reparenting observed nodes causes the IntersectionObserver (s1:2238) to re-evaluate every moved section at once, on every one of the four buttons.

**7. Advanced material is read anyway on "Foundational".** *Symptom:* a student who chose the shortest depth reads a faded but perfectly legible Advanced section inline, because the filter only sets `opacity:.32` (s1:793) and does not remove. Today this costs a scroll past the bottom of the page; under reflow it costs them the section.

**8. The stranded "— APPENDIX —" section.** *Symptom:* after the closing section, a gold-topped page reading "— APPENDIX —" with a grid of cards that all link *backwards* into material the student has already read. `section.apxdiv#apx` (s1:1690, s2:1672, s3:1510, s4:1628) has nothing to introduce any more, and still occupies a rail pip.

**9. Print handouts change shape depending on the last button pressed.** *Symptom:* two instructors print the same file and get differently ordered PDFs, both containing "Insert between §X and §Y" bars mid-flow, because `.apxback` is not print-suppressed in any file (contrast `a.apxlink`, which is — s1:765).

**10. Two sections sharing an anchor silently swap.** *Symptom:* A2 (advanced) prints before A1 (foundational), or C1 before C5. Nothing in the markup declares a tie-break for the five shared-anchor groups listed in §2b.

**11. Focus and in-section scroll are dropped on move.** *Symptom:* a student typing into the session-1 corpus box (`#corpus`, inside appendix `s3`) loses the caret when anyone touches the tier bar. Minor, and only reachable via keyboard/second-monitor use, but real.

**12. Session-2's progress bar becomes a lie.** *Symptom:* the top bar at 50% no longer means "half the core done" — `session-2/index.html:1962` measures pixels, and the pixels now interleave optional and required material.

---

### 8.4 Feasibility verdict

#### **FEASIBLE WITH REWORK**

The DOM mechanics are unusually forgiving. Every section is a direct sibling of every other inside one `div.wrap`; there is no canvas, no iframe, no media element, no `<details>`, no delegated handler on an ancestor that would be removed, no browser storage, no hash router, no `offsetTop` cache, and every chart is inline SVG drawn once at load. An `insertBefore` reflow preserves handlers, form values and rendering completely. The JavaScript that actually breaks is small and localised: four `secs`/`pips` snapshot pairs, one arrow-key routine in session 1, and one missing scroll-compensation — call it a dozen lines of new code plus a rebuild of the rail.

**The single biggest reason it is not simply FEASIBLE: the reflow is a copy problem wearing a JavaScript costume.** Roughly sixty authored strings across the four files — 21 `.apxback` "Insert between §X and §Y · back · continue" bars, 20 `a.apxlink` "If there is time…" teasers, 20 `a.apxcard` "after §NN" labels, and four "— APPENDIX —" divider sections — are written for a jump-out-and-return model and become false, redundant or actively misleading the moment a section sits inline. Five of the forward links would route a student *past* material the reflow has just placed in front of them (§2d), one of them past the longest hands-on block in session 1. None of that is fixable in the tier-filter IIFE; it is a hand-edit across every appendix section in the course, and it has to be done before the reordering ships, not after.

---

### 8.5 Safe fallback design — most of the reading benefit, no nodes moved

**Option A (recommended): static author-time reflow.** Do the move once, in the source file, by hand. The sections physically sit in reading order; appendix identity is carried by `class="apx"` + `data-tier` exactly as now. Every runtime hazard in §3 disappears — the rail is built in the right order at load because the source *is* the right order, arrow keys work, nothing jumps, print is deterministic. The tier filter's job shrinks to what it is already good at: toggling a class. Required alongside it: change `section.apx.dim` (s1:793) from `opacity:.32` to a real removal so a tier choice actually shortens the page; retire the `.apxback` bars and the `a.apxlink` teasers; convert `section.apxdiv#apx` from a trailing divider into a *leading* contents panel next to the tier bar, with its `a.apxcard` grid intact and its existing id-based dim sync (s1:3043–3047) unchanged. `verify-migration.mjs` and `verify-style.mjs` contain nothing that enforces the trailing-block layout, so nothing in the build blocks this.

**Option B (no source edit, no DOM move): CSS `order` on a flex `div.wrap`.** Setting `.wrap{display:flex;flex-direction:column}` and an `order` integer per section reorders the *visual* flow with zero mutation — handlers, focus, form values, SVG, IntersectionObserver registrations all completely untouched, and it is reversible per tier by changing one integer. Two caveats to weigh explicitly: `order` does not change tab order or screen-reader order, so it creates a WCAG 1.3.2 / 2.4.3 mismatch between what is seen and what is traversed; and `#lmbox` and `<footer>` are also children of `.wrap` (s1:1190 and 2014) so they need explicit `order` values too. The rail would still need rebuilding to match. Use this only if the visual gain is judged to outweigh the focus-order divergence.

**Option C (zero-risk, ship today): make the existing jump *cost nothing*.** Keep the trailing block and the jump-and-return model, and fix what actually makes it feel like a detour:
1. Give `sHY` (session-3) and `sRSP` (session-4) the `a.apxcard` and `a.apxlink` they are missing, so all 22 sections are signposted from the core flow.
2. Generate the `.apxback` bars from `data-insert-after` at load instead of hand-typing them — that alone kills the five skip-a-sibling links, the two duplicated session-3 bars, and all future drift.
3. Make "continue to §X →" resolve to *the next in-scope section under the current tier*, so a reader on Foundational never lands on an Advanced page they chose to skip.
4. Change the filter from `opacity:.32` to a genuine hide, so choosing a tier removes scroll distance rather than adding faded distance.
5. Add `@media print{.apxback{display:none}}` next to the existing `a.apxlink` print rule (s1:765, s2:673, s3:644, s4:658).

Options A and C are compatible and additive; C is the sane first commit regardless of whether A ever ships.
---

## 9. Verification surface

### 9.1 Check-by-check inventory

#### 9.1.1 `scripts/verify-case.mjs` — 3 failure modes, one loop, no numbering

Imports `LESSONS`, `buildBlock`, `OPEN`, `CLOSE`, `sha256`, `facts` from `inject-case.mjs`, so it is a *recomputation*, not an independent reader.

| # | Assertion | Kind |
|---|---|---|
| C-1 | `CASE:BEGIN`/`CASE:END` sentinels both present in each of the 6 lesson files | structural |
| C-2 | A `sha256 <64 hex>` provenance string exists after the opening sentinel | structural |
| C-3 | Recomputed SHA-256 of the region body == the recorded hash → else `block was hand-edited` | structural (tamper-evidence) |
| C-4 | That hash == the hash of a freshly-built block → else `stale against the current CASE.md build` | structural (freshness) |

Exit 1 on any. **The three failure modes are deliberately distinguished because their remedies differ** (never injected / hand-edited / rebuild needed). Nothing here is factual or prose-level: it is a byte-identity guard. Its practical consequence for editorial work is decisive — **a dash, quote or word changed inside the injected span in a lesson file is a hard failure of C-3**, and is overwritten by the next `inject-case.mjs` run.

#### 9.1.2 `scripts/verify-migration.mjs` — 16 numbered checks (of a 20-check battery)

Header states the split: 13/14/15 are browser (`verify-browser.mjs`), 5/6 are injection/idempotence (`verify-case.mjs`, `inject-case.mjs --check`), 19 is the style fence (`restyle_sweep.py --check`, wrapped by `verify-style.mjs`). Numbering runs 1→20 with gaps and sub-ids.

| ID | Name as printed | What it asserts | Kind |
|---|---|---|---|
| **1** | Retired facts purged (Part K list, whole tree, registers excluded) | 26 regexes for retired names/figures/spellings (`Ohio`, `Dayton`, `QSBS`, `1202`, `$4,968,000`, `31%`, `founder stock`, `donor-advised`, spelled-out variants…) hit nowhere outside the register allowlist. One hand-coded context exception: "No donor-advised fund has ever existed". | factual (fact-purge), enforced lexically |
| **2** | Ohio and Dayton at zero everywhere (incl. comments, alt, filenames) | Same two stems, plus **filename** matching | factual |
| **3** | QSBS and IRC 1202 at zero everywhere | Three regexes, incl. numeric-boundary-guarded `1202` | factual |
| **4** | Conditional allowances each in their one permitted context | 4 figures (`$18,000,000`, `$38,000,000`, `$4,500,000`, `$2,000,000`) must each appear only within ±240 chars of a context regex naming their one permitted use | factual, context-sensitive |
| **7** | Extract fidelity: every figure traces to case-facts.json or a shown computation | Every `$N` in `case-extract.html` is a `case-facts.json` value or one of 4 whitelisted composed products | arithmetic / provenance |
| **7b** | Extract is a fraction: Parts H, I and M are not reproduced | Regex on `## H.`, `## I.`, `## M`, `Rev. Rul. 2026-13, Table 1` | structural |
| **8** | Case coverage per file | **`info()` — reported, never enforced.** Section count and Cole / CPC / Meg mention count per file | reporting |
| **9** | Interaction floor of 13 per lesson (hub exempt) | `data-task` distinct count ≥ 13 in each non-hub lesson | structural |
| **10** | No section gating and no browser storage (pedagogy R9, R10) | a `lock` class, and the four storage APIs (`localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`), all absent | structural |
| **11** | Rendered arithmetic recomputed in Node (24 identities) against CASE.md Part M | 24 `eq()` identities recomputed from `case-facts.json` (per-unit value, seed value, note principal, interest, dividend tax, estate reduction and its two components, trust equity, balance sheets, steady-state gap, leverage, rate spread…) | **arithmetic** |
| **12** | No NaN, undefined or empty axis values in static chart markup | 5 regexes over lesson HTML | structural |
| **14b** | SVG hygiene: tags balanced, no `var()` REGRESSION against the pre-migration baseline | `<svg>`/`</svg>` balance; `var(` in 5 presentation attributes counted against a **hard-coded per-file baseline** (`session-0.1`: 8, `session-1`: 7, rest 0) | structural, regression-gated |
| **16** | Time-budget arithmetic: segment rows sum to the alloc row | Sums `td.n` in `table.tbudget`, excluding `nosum`/`alloc` rows; compares to the `alloc` row | **arithmetic** |
| **17** | Prose density | **`info()` — REPORT ONLY, band unratified.** words ÷ allocated minutes, per lesson, whole-file | reporting (prose-level metric) |
| **18** | Confidence chips resolve to a footer source entry (pedagogy R2) | Every `.conf` chip's `data-src` resolves to an `id="src-…"` in the same file | structural (evidence integrity) |
| **20** | Case figures typed into prose match case-facts.json (spine drift guard) | 3 hand-written regex "pins" over **prose only** (the span outside `CASE:BEGIN`/`CASE:END`), each compared to a `case-facts.json` value | factual/arithmetic, prose-scoped |

Exit 1 if any `check()` failed; `info()` never affects the exit code.

**Notes worth carrying forward.**
- Check 20 is the only existing check that reads *hand-written prose* and asserts something about its content. It is the closest structural precedent for an editorial checker: a small explicit pin table, prose-scoped by excluding the injected span.
- Check 7b declares `const forbidden = ['Part H', 'Part I', 'Part M', 'Karmazin v', 'applicable federal rate table']` and **never uses it** — the assertion is a separate inline regex. Dead code, harmless, but it means the printed check name over-promises slightly (`Karmazin v` and the AFR table string are not actually searched for by that array).
- Checks 10 and 18 **duplicate** skill checks V3 and V4 respectively (see §3).
- Check 9's floor of 13 and `validate_lesson.py` V6's band of 13–15 are different rules over the same data; 16 passes here and would fail V6 without a band widening.

#### 9.1.3 `scripts/verify-browser.mjs` — checks 13, 14, 14b, 15 in real Chromium

Runs 6 lesson files, then the flowchart fragment standalone. Roughly 10 assertions per lesson + 5 for the fragment.

| ID | Assertion | Kind |
|---|---|---|
| **13** | Zero JS errors on load — `pageerror` plus console errors, with offline font failures excluded by an `ERR_(CONNECTION/NAME/INTERNET/NETWORK/BLOCKED)` filter | runtime/structural |
| **14** | Zero network requests beyond `fonts.googleapis.com`/`fonts.gstatic.com` (pedagogy R8) | structural/policy |
| **13** | Case modal opens from the topbar button (`#caseBtn` → `#caseModal.open`) | runtime |
| **13** | Structure tab switches panels (`casePanelStruct` visible, `casePanelFacts` hidden) | runtime |
| **14** | Flowchart preserved: exactly 2 `<svg>`, 2 `<title>`, 2 `<desc>` inside `#casePanelStruct` | structural/a11y |
| **13** | Version stamp rendered, matching `/^Case v4\.0 [0-9a-f]{7}$/` | structural/provenance |
| **13** | Structure tab keyboard reachable (`tabIndex === 0` when selected) | a11y |
| **13** | Shift+U override visibly labelled (hub exempt, printed as an explicit exemption) | structural |
| **13** | Shift+U actually reveals (`.hidden` count drops, or the badge reads "revealed") | runtime |
| **13** | Shift+U does not reveal both case tabs at once | runtime |
| — | Button count and dead-inline-handler count | **printed only**, not asserted (`addEventListener` is not introspectable) |
| **14b** | `var()` in an SVG presentation attribute: computed value **measured**, printed | **measurement only** |
| **14b** | SVG `<text>` outside its `viewBox`, via `getBBox()` + CTM, against a **hard-coded per-file baseline** (0/12/32/64/11/3) — fails on regression only | geometric |
| **15** | No horizontal page overflow at 1280px | geometric |
| — | Screenshot per lesson to `.verify-shots/` | artifact |
| **14/15** (fragment) | Zero JS errors; zero network requests; no `<script>`/unpkg/CDN in source; 2 sheets with 2 `<title>`/2 `<desc>`; fits 1280px | structural/geometric |

Exit 1 on any failure. **Nothing prose-level.** Two of its checks are explicitly *baseline-relative* rather than absolute, which is the repo's established pattern for "pre-existing, do not regress" — directly reusable for the editorial dash-form problem.

#### 9.1.4 `scripts/verify-style.mjs` — 2 assertions, wrapping `restyle_sweep.py --check`

**This script is about the managed CSS fence. It has nothing to do with prose. Its name must not be echoed by any editorial checker.**

| # | Assertion | Kind |
|---|---|---|
| S-0 | `restyle_sweep.py` exists at `/root/.claude/skills/synced/interactive-lesson-builder/scripts/restyle_sweep.py` (overridable via `RESTYLE_SWEEP`) | environment |
| S-1 | Zero lesson documents STALE against the skill's `assets/*.css` payload | stylistic (CSS) |
| S-2 | The set of fenceless files == exactly `{scripts/case-extract.html, scripts/case-flowchart.html}`. A third fenceless file fails; a *missing* expected fenceless file also fails (renamed, or a fence was added) | structural |

Exit 1 on either. It parses the sweep's stdout by line prefix (`OK`/`STALE`/`FAIL`) and deliberately swallows the sweep's own exit 1.

#### 9.1.5 `scripts/build-case.mjs` — GENERATOR, with 14 build-time assertions

Not part of the verify set, but it fails loudly and belongs on the map.

- **Structural drift:** every `grab()` is an anchored regex inside a *named* CASE.md section (`A.1`, `E.7`, `PART F`…). A miss is collected into `problems` and the run dies with a list. ~90 figures captured. Nothing is reconstructed from memory.
- **Arithmetic self-check:** 13 identities recomputed against CASE.md Part M (a subset of `verify-migration` check 11's 24), plus a 14th literal assertion that Part M still states `$38,500`.
- **Emits:** `case-facts.json`, `case-extract.html`, `case-flowchart.html` (Part L, CSS scoped under `.cole-flow`, dead rules dropped, page-level rules stripped).
- **Editorial relevance:** `buildExtract()` writes prose with `&middot;`, `&sect;`, `&ldquo;`-class entities and hand-written sentences in template literals. **This prose is generated; an editorial rule that touches it must be satisfied here, in the generator source, not in any lesson file.**

#### 9.1.6 `scripts/inject-case.mjs` — GENERATOR + `--check`

- Writes the span between the sentinels; **idempotent by construction**.
- `--check` reports `STALE`, writes nothing, exits 1 (this is migration check 6).
- Records `sha256` of the block in a provenance comment; that is what `verify-case.mjs` recomputes.
- **The case-spine paragraph is a JS string literal at `inject-case.mjs:57-60`.** It is student-facing prose, present in all six files, and it is not in `CASE.md`. Any editorial rule reaching it has exactly one edit site: this generator.

#### 9.1.7 `validate_lesson.py` — V1–V10 + INFO C1/C2 (READ, not inferred)

Static-only; never executes; never writes. Exit 1 iff any FAIL. WARN/INFO never block.

| ID | Assertion | Level | Kind |
|---|---|---|---|
| **V1** | `/* STYLE:BEGIN managed-by=restyle_sweep.py */` and `/* STYLE:END */` each exactly once | FAIL | structural |
| **V2** | No external `href`/`src`/`@import`/`url()` outside `fonts.googleapis.com`/`fonts.gstatic.com`; font hits reported as WARN | FAIL / WARN | structural/policy |
| **V3** | No `localStorage`, `sessionStorage`, `indexedDB`, `document.cookie` | FAIL | structural |
| **V4** | **(a)** every `.conf` chip's `data-src` resolves to a footer `<li id="src-…">` → FAIL. **(b)** `.conf` chips with **no** `data-src`: ≤6 WARN (footer legend chips), >6 FAIL. **(c)** footer sources **never referenced by any chip** → WARN | FAIL/WARN | structural (evidence integrity) |
| **V5** | Timing arithmetic, tolerance zero: segments sum == `alloc` cell == `--minutes` target (default 150). Absent table = WARN unless `--require-timing` | FAIL | **arithmetic** |
| **V6** | Distinct `data-task` count within band (default **13,15**); distinct `data-comp` ≥ `--types` (6); **no identical component type in consecutive sections** | FAIL | structural/pedagogical |
| **V7** | `--case Cole` appears ≥3× **and** at least one mention sits within 600 chars of the word "synthetic"; `--purge` names appear 0× | FAIL | factual/labelling |
| **V8** | Shift+U wired (`shiftKey…'U'`) **and** the literal string `Shift+U` present in the raw file | FAIL | structural |
| **V9** | `prefers-reduced-motion` present; `:focus-visible` present | WARN | a11y |
| **V10** | `<title>`'s "Session N" also appears in the footer region | WARN | **prose-level identity consistency** |
| **C1** | Prose density, words ÷ `--minutes`, "ratified band pending, 37-42 proposed" | INFO | prose metric |
| **C2** | `em dashes in rendered text: N` — computed as `html.count('\u2014') + html.count('&mdash;')` over the comment-stripped file, "policy unratified for student-facing copy" | INFO | **prose/typographic metric** |

**C2 is the single existing editorial-typography check in the entire gate, and it is INFO-only and miscounted.** It counts over the whole file including CSS, attribute values, script strings and the injected case region, and it misses `&#8212;`/`&#x2014;` and `\u2014` escapes entirely. Measured on disk, the `\u2014` JS-escape form alone runs 59/50/65/30 in sessions 1/2/3/4 — invisible to C2.

#### 9.1.8 `validate_dom.js` — runtime companion, two modes

- **jsdom mode:** executes page scripts, dispatches `Shift+U`, asserts (1) no thrown script errors, (2) every `[data-gate]` carries `.done` afterwards, (3) `#pnum` text matches `/revealed/i`. Exit 1 on failure.
- **static fallback:** every literal `$('x')`/`getElementById('x')` id resolves to an element with that `id` (FAIL); every `data-gate` value is passed to `mark('…')` somewhere (WARN if not — "Shift+U only" gates are legal). Exit 0 unless `--require-dom`, then exit 2.
- All structural/runtime. Nothing factual, arithmetic or prose-level.

#### 9.1.9 `restyle_sweep.py` — WRITER, with a `--check` mode

- Concatenates `assets/tokens.css`, `typography.css`, `components.css` **in that order**, stamps a `payload-sha256:` 12-hex digest, and rewrites the managed fence in every `*.html` under the repo (`.git` excluded).
- `--check` / `--dry-run` write nothing. Exit 1 if any file lacks the fence, or (under `--check`) if any is stale.
- Deliberately separate from the validators "which only read".
- The two generated fragments are why `verify-style.mjs` exists as a wrapper.

---

### 9.2 Coverage matrix — 16 editorial concerns against every existing check

**Column key.** Only checks that ever score above NOT COVERED are given a column. **Every concern is NOT COVERED by every check not shown**: `verify-case` C-1…C-4, `verify-migration` 1, 2, 3, 4, 7, 7b, 8, 9, 10, 11, 12, 14b, 16, 18, `verify-browser` 13/14/14b/15 (all), `verify-style` S-0/S-1/S-2, `validate_lesson` V1, V2, V3, V4, V5, V6, V7, V8, V9, `validate_dom` (all modes), `restyle_sweep` (all).

| # | Editorial concern | Nearest existing check | Cell | What is actually covered, and what is not |
|---|---|---|---|---|
| 1 | **Em-dash form consistency** (literal `—` vs `&mdash;` vs `\u2014`) | `validate_lesson` **C2** (INFO) | **PARTIAL — reporting only, and the count is wrong** | C2 sums literal + `&mdash;` over the whole comment-stripped file. It never compares forms, never classifies by region, misses `\u2014` and `&#8212;`, and is INFO so it cannot fail. Measured on disk: literal/`&mdash;`/`\u2014` = 7/6/0 (hub), 28/13/1 (0.1), 11/101/59 (S1), 13/83/50 (S2), **110/22/65 (S3)**, 12/112/30 (S4). Three forms coexist in every file; S3 inverts the majority convention. |
| 2 | **Em-dash policy in body prose** | `validate_lesson` **C2** (INFO) | **NOT COVERED** | The policy itself is *open* — pedagogy decision D-2026-08-18-2, recorded in `MAINTAINING.md` "Known follow-ups" ("Existing copy keeps its dashes; files authored since 2026-08-20 avoid them. Never run a repo-wide substitution"). No check distinguishes body prose from CSS, script strings, attributes, footer entries or the injected span. |
| 3 | **Quotation integrity** (a dash inside a quoted source must not be altered) | — | **NOT COVERED** | No check knows what a quotation is. `verify-case` C-3 protects only the injected span. Nothing protects `<blockquote>`, `<span class="src">`, `.wolf` reading blocks, or `&ldquo;…&rdquo;` runs. This is the concern most at risk from any automated fix, and the one that must be an *exemption*, not a check. |
| 4 | **Wolfram section-level citation on every Wolfram reference** | `validate_lesson` **V4(a)** / `verify-migration` **18** | **PARTIAL — key resolution only, not granularity** | Both assert `data-src` → `id="src-…"` resolution. Neither knows that `src-wolfram` is a 20-section essay. Measured: `grep -ci wolfram` = 1/1/20/16/16/13 across hub…S4; `data-src="src-wolfram"` chips = 0/0/4/2/3/2. Session 4 has 13 mentions, 2 chips, and (per gap report §2.2, which I did not fully re-derive) **zero** section names anywhere in the file. |
| 5 | **Footer source entry exists for every chip (and the reverse)** | `validate_lesson` **V4(a)** + **V4(c)**; `verify-migration` **18** | **COVERED — forward direction hard, reverse direction WARN** | Forward (chip → entry) is FAIL in V4(a) and FAIL in check 18: **duplicated**. Reverse (entry → chip) exists only as V4(c) WARN, and `MAINTAINING.md` "Known follow-ups" records it as an open item. Gap report §3.1 measures 23 orphan keys across S2/S3/S4. V4(b) additionally caps un-keyed chips at 6. **An editorial checker must not re-implement any of this.** |
| 6 | **Bibliography completeness across lessons** | — | **NOT COVERED** | V4 and check 18 are strictly *within one file*. Nothing compares source keys across lessons, detects the same work keyed differently in two files, or checks entry completeness (author/year/title/publisher/retrieval date/pinpoint). No `BIBLIOGRAPHY.md` exists. |
| 7 | **Vocabulary term defined on first occurrence** | — | **NOT COVERED — and the feature does not exist yet** | Grepped the corpus: **no `data-term`, no `<v>`, no vocab-table markup, no tooltip class**. `title="` attributes: 3 in session-0.1, 0 everywhere else. Every "vocab" hit is the ordinary English word (e.g. "token vocabulary"). This is a proposal (gap report §4.N), not a shipped feature. |
| 8 | **Tooltip text and vocabulary-table text agreeing** | — | **NOT COVERED — same reason** | Nothing to compare. Gap report §4.N recommends building it on the `CASE.md` pattern (`VOCABULARY.md` → `build-vocab.mjs` → `VOCAB:BEGIN/END` → `verify-vocab.mjs`) rather than as an editorial-checker rule. Concur: this is a *generator* problem, not a *linter* problem. |
| 9 | **Reading level / prose density per allocated minute** | `verify-migration` **17** (info) + `validate_lesson` **C1** (INFO) | **PARTIAL — measured twice, enforced never, and the two disagree** | Both are word-count ÷ allocated-minutes over the whole file. Check 17 uses the `alloc` row (fallback 120 for 0.1); C1 uses `--minutes` (default 150). Neither separates core from appendix, neither measures reading level in any linguistic sense, neither can fail. `MAINTAINING.md` cites 73–89 wpm against a proposed 37–42 band; gap report §7 says that range is not reproducible by any method it could construct (whole-file 43–63, core 52–84). |
| 10 | **Section minute totals vs appendix index cards and the core lede** | `verify-migration` **16**; `validate_lesson` **V5** | **NOT COVERED — a different table is checked** | Both check the **footer `table.tbudget`**, which sums correctly in every lesson (V5 additionally pins it to exactly 150). The `.apxdiv` index cards are an independent second copy and nothing compares them to the `.mins` badges on the sections. **Independently confirmed in session-2:** cards read B1 10 / B2 8 / B3 10 / B4 10 / B5 20 = 58 min; the sections they link to read 16 / 15 / 16 / 16 / 20 = 83 min. Four of five cards disagree with their own section. Gap report §10.1 finds the same pattern in all four lessons, plus two appendix sections with **no card and no inbound link at all** (`session-3#sHY`, `session-4#sRSP`, 16 min each). |
| 11 | **Appendix tier attribute present and valid** | — | **NOT COVERED** | Measured: `data-tier` appears 7/5/5/5 in S1–S4, 0 in hub and 0.1; values are `foundational` (8), `standard` (9), `advanced` (5). No check asserts the attribute exists on every `.slide.apx`, that its value is in the enumeration, or that the tier filter UI covers every value present. |
| 12 | **Title-case / sentence-case consistency in headings** | — | **NOT COVERED** | Nothing reads heading text. V10 is the only check that reads a `<title>`, and only to match a session number. |
| 13 | **British vs American spelling consistency** | — | **NOT COVERED** | Measured raw: `behaviour` 11 / `behavior` 12, `organisation` 18 / `organization` 2, `colour` 7 / `color` **1239**, `analyse` 5 / `analyze` 0. **Region-classified prose tells a different story**: stripping `<script>`, `<style>`, comments and tags leaves British forms only (S1 and S3 each: `behaviour` 1, `analyse` 1, zero American forms). The 1,239 `color` are CSS properties and the `behavior` hits are JS identifiers and comments. **Any naive whole-file spelling check produces a >1,200-hit false-positive storm on its first run.** |
| 14 | **Curly vs straight quotes and apostrophes** | — | **NOT COVERED** | Measured literal `’` = 5/15/5/7/7/5; literal `“` = 0 in every file by my raw grep, while the gap report's prose-classified pass finds 32/40/**239**/32 in S1–S4 — the difference is that most curly doubles arrive as `&ldquo;`/`&rdquo;` entities or `\u201c` escapes, and session 3 is the one file using literal characters. Same three-form problem as the em dash, same file as the outlier. |
| 15 | **Ellipsis form (`…` vs `...`)** | — | **NOT COVERED** | Measured: literal `…` = 0/0/0/1/4/0; `&hellip;` = 0/0/3/0/0/4; bare `...` = 0/1/0/0/0/0. Low volume, three forms, same S3 inversion. |
| 16 | **UNVERIFIED / TODO markers left in shipped prose** | — | **NOT COVERED** | Measured: **7 `[UNVERIFIED, needs source]` occurrences in `session-0.1/index.html` alone** (lines 1113, 1115, 1642, 1645, 1876, 2090, 2098), spanning body prose, footer source entries, HTML comments and a JavaScript feedback string. Every one is *deliberate* — the file's declared standard is to print the marker rather than invent a figure. So the rule is not "no markers" but "no marker outside its declared register", which nothing checks. `TODO`/`FIXME`/`XXX`: zero. |

#### 9.2.1 Summary by row

- **COVERED: 1 of 16** (#5, and only the forward direction; the reverse is a WARN).
- **PARTIAL: 4** (#1, #4, #9 — all three reporting-only; and #5's reverse half).
- **NOT COVERED: 11**, including two (#7, #8) whose underlying feature does not exist and two (#10, #11) that are purely mechanical and currently wrong on disk.
- **Every single existing check is structural, factual, arithmetic or stylistic-CSS.** The only prose-level assertions in the entire gate are `validate_lesson` **V10** (a WARN about a session number) and `verify-migration` **20** (three regex pins on dollar figures). There is no editorial layer.

---

### 9.3 Duplication already present in the gate

Named because a new checker must not add to it.

| Concern | Checked by | Note |
|---|---|---|
| Browser storage ban | `verify-migration` **10** + `validate_lesson` **V3** | Identical four tokens. MAINTAINING.md calls the storage grep "the regression test for that key handling", so the redundancy is intentional insurance. |
| Chip → footer resolution | `verify-migration` **18** + `validate_lesson` **V4(a)** | Same assertion, two implementations. |
| Time-budget arithmetic | `verify-migration` **16** + `validate_lesson` **V5** | V5 is strictly stronger (also pins the total to `--minutes`). |
| Interaction count | `verify-migration` **9** (floor 13) + `validate_lesson` **V6** (band 13–15) | **These can disagree.** A lesson with 16 interactions passes 9 and fails V6. |
| External-request policy | `verify-browser` **14** (runtime) + `validate_lesson` **V2** (static) | Complementary, not redundant. |
| Style fence | `verify-style` **S-1/S-2** + `validate_lesson` **V1** | V1 is per-file presence; S-1/S-2 are corpus currency and the fenceless-set identity. Complementary. |

---

### 9.4 Recommendation — where `scripts/verify-editorial.mjs` sits

**Naming, first, because it is load-bearing.** `scripts/verify-style.mjs` is the managed **CSS** fence checker, and `MAINTAINING.md` lines 117–125 carry a careful paragraph explaining why it exists instead of `restyle_sweep.py --check`. **The word "style" must not appear in the name, the help text, the output lines, or the docs of anything about prose.** Use *editorial*. The rules document is `EDITORIAL.md`; the checker is `scripts/verify-editorial.mjs`. This matches the naming already fixed by instruction in `docs/editorial-gap-report.md`.

#### 9.4.1 It is a seventh repo script, not an eighth check inside anything

- **Not inside `verify-migration.mjs`.** That file is named for and numbered against the CASE.md v4.0 migration audit. Editorial rules outlive it.
- **Not inside `verify-style.mjs`.** See above.
- **Not inside the skill.** `validate_lesson.py` / `validate_dom.js` / `restyle_sweep.py` encode the *lesson-builder protocol* and are shared by every repo built with the skill. Em-dash form, Wolfram citation granularity and appendix-card arithmetic are **this course's house rules**. The one exception worth arguing later: if `EDITORIAL.md` ratifies the em-dash policy, `validate_lesson.py` **C2** should be retired or corrected upstream at the same time, because a ratified rule enforced correctly here and reported wrongly there is worse than either alone.

Run position: after `verify-migration.mjs`, before or after `verify-browser.mjs` (no dependency either way). It must read only — no `--fix` mode in v1.

#### 9.4.2 What it should own

**Tier A — mechanical, unambiguous, currently violated. These are the reason to build it.**

1. **Appendix index cards vs sections** (concern #10). Card minutes == the linked section's `.mins`; card count == `.slide.apx` count; the eyebrow's appendix-minute total == the sum of the section badges; the core lede's section count and minute total == the core sections on the page. Independently confirmed wrong in session-2; gap report says all four. Nothing else owns this table — check 16 and V5 own a *different* table.
2. **Every appendix section reachable** — at least one inbound `href="#id"` from anywhere in the file. Two sections currently have none.
3. **`data-tier` present and in the enumeration** on every `.slide.apx` (concern #11), and every value present is offered by the tier filter.
4. **Dash / quote / ellipsis FORM consistency within a file** (concerns #1, #14, #15) — not policy, form. One convention per file per character class, measured **by region class**, not by raw count.
5. **`UNVERIFIED` / `TODO` / `FIXME` outside its declared register** (concern #16) — i.e. present in body prose without the file's declared marker convention. Session 0.1's seven are legitimate and must pass.

**Tier B — advisory, needs a human read.**

6. Em-dash **policy** in body prose (concern #2) — pending D-2026-08-18-2.
7. Prose density per allocated minute, **core and appendix separately** (concern #9), superseding check 17 and C1's whole-file figures.
8. Heading case consistency (concern #12).
9. Spelling-variant register (concern #13) — prose-classified, never raw.
10. Wolfram citation granularity (concern #4) — report references lacking a section name; the *rule* (D6 in the gap report: "every direct quotation and every quoted figure") needs sign-off before it can be hard.

**Tier C — exempt, never reported.** Silence, not warnings, or the first run buries the signal:
- Direct quotations of cited sources (concern #3). **This is the hard constraint of the whole exercise**: a punctuation "fix" inside `&ldquo;…&rdquo;` is a misquotation, and the repo's own public standard (README: sources are shown, not "quietly resolved") makes that a substantive failure, not a typographic one.
- The `CASE:BEGIN`/`CASE:END` span in every lesson — owned by `verify-case.mjs`.
- `CASE.md` itself (177 literal em dashes, legal-memorandum register) and the generated fragments.
- Proper names and published titles (`Persona–Task–Context–Format`, `Rev. Rul. 85-13 — …`).
- Structural furniture: `<td class="n">&mdash;</td>` empty-cell placeholders, `data-nav="— APPENDIX —"`, `.apxback` separator dashes.
- Everything inside `<style>`, `<script>`, HTML comments and attribute values, unless a rule explicitly targets that region. **The 1,239 `color` and 12 `behavior` hits are the proof that region classification is not optional.**

#### 9.4.3 What it must NOT duplicate

| Owned by | Do not re-check |
|---|---|
| `validate_lesson.py` **V4** + `verify-migration` **18** | chip → footer resolution, un-keyed chips, orphan footer entries |
| `validate_lesson.py` **V5** + `verify-migration` **16** | the footer `table.tbudget` summing to its `alloc` row |
| `verify-case.mjs` | anything inside the CASE sentinels — read it, never assert on it |
| `verify-style.mjs` / `restyle_sweep.py` | the managed CSS fence, and the swept payload's own `&#8212;` |
| `validate_lesson.py` **V3** / `verify-migration` **10** | storage and gating |
| `validate_lesson.py` **V7** / `verify-migration` **1/2/3** | the retired-name purge |

Two near-misses stated explicitly, because they look like duplication and are not: the **appendix index cards** are a different table from the footer time budget (Tier A.1 is legitimate); and **bibliography cross-lesson completeness** (concern #6) is a different question from V4's within-file resolution — but it should go to a `build-vocab`/bibliography **generator**, not to this linter.

#### 9.4.4 Exit-code contract

```
Tier A violation  -> exit 1, blocks the push
Tier B violation  -> printed, exit unaffected
Tier C            -> silent
any Tier A rule whose exemption list is still moving -> demote to Tier B until it stops
```

Concretely: `process.exit(hardFails ? 1 : 0)`, matching every other script in the repo, with advisory output printed under a clearly separated `ADVISORY` heading so nobody mistakes it for a failure. Add a `--advisory-only` flag so the first weeks can run it at exit 0 while the exemption list settles.

#### 9.4.5 Does it belong in the documented pre-push gate?

**Yes — Tier A only, and only after its exemption list has stopped changing.** The gate currently runs clean; adding a checker that fires 60+ false positives on day one is how a green gate stops meaning anything. Sequence:

1. Ship it advisory-only, outside the gate, referenced from `MAINTAINING.md` as a report.
2. Ratify `EDITORIAL.md` (D1–D7 in gap report §11 are the open decisions).
3. Promote Tier A into `MAINTAINING.md`'s check block — which should be **renamed at that point**, since "The CASE.md v4.0 migration checks" will no longer describe what it contains.
4. Close the three `MAINTAINING.md` "Known follow-ups" that this supersedes: the em-dash entry (#2), the prose-density band (#9), and the orphan-footer-sources entry (#5 reverse).

#### 9.4.6 Two implementation constraints that fall out of the reads

- **Region classification is the whole design.** Every measurement in §2 that looked alarming raw (1,239 `color`, 110 literal dashes, 7 UNVERIFIED markers) turned out to be either CSS, JS, or deliberate once classified. A rule expressed per-character will be wrong; a rule expressed per-region-class will be right. `verify-migration` check 20's technique — slice out the `CASE:BEGIN`/`CASE:END` span, then assert only on what is left — is the existing precedent and should be generalised into a shared region classifier.
- **Session 3 is one authoring convention, not three defects.** Literal em dashes (110), literal curly doubles, literal ellipses; sessions 1/2/4 are the entity-based mirror image; session 0.1 is a third pattern (entity-leaning on quotes, literal-leaning on dashes). A form rule written per-instance will fight session 3 in three places at once. Whatever is decided, it is one commit.
---

## 10. Not on your list, found while measuring

Three of these change how `EDITORIAL.md` should be scoped. They are reported here
rather than buried because two of them are cheap validator checks that nothing
currently catches.

### 10.1 The appendix index cards have drifted from the appendix in every lesson

Each lesson's `.apxdiv` carries an index: a count, a total, a "the N sections above
are the core session and run in about M minutes" lede, and one `.apxcard` per
appendix section with its own minute figure. **Every one of those four claims is
wrong in at least one lesson, and the per-card minutes are wrong in all four.**

| | S1 | S2 | S3 | S4 |
|---|---|---|---|---|
| Core sections on page | 11 | 11 | 13 | 13 |
| Core sections the lede claims | 11 ✓ | **10 ✗** | **12 ✗** | **12 ✗** |
| Core minutes on page | 67 | 67 | 70 | 70 |
| Core minutes the lede claims | **63 ✗** | 67 ✓ | **64 ✗** | **67 ✗** |
| Appendix sections on page | 7 | 5 | 5 | 5 |
| Appendix sections the eyebrow claims | 7 ✓ | 5 ✓ | **4 ✗** | **4 ✗** |
| Appendix minutes on page | 83 | 83 | 80 | 80 |
| Appendix minutes the eyebrow claims | 83 ✓ | **58 ✗** | **48 ✗** | **43 ✗** |
| Index cards present | 7 | 5 | **4 ✗** | **4 ✗** |
| Cards whose minutes disagree with their section | **2** | **4** | **3** | **3** |

Per-card disagreements, exact:

- **S1** — card `A5` says 18 min, section `s8` says 16. Card `A7` says 15,
  section `s14c` says 17.
- **S2** — `B1` 10 vs 16, `B2` 8 vs 15, `B3` 10 vs 16, `B4` 10 vs 16.
- **S3** — `C1` 12 vs 16, `C2` 9 vs 14, `C3` 7 vs 14.
- **S4** — `D1` 9 vs 16, `D2` 6 vs 14, `D3` 8 vs 14.

**Two appendix sections have no index card and no inbound link from anywhere.**

- `session-3` `#sHY` — *"C5 · Hybrid search"*, `data-tier="advanced"`,
  `data-insert-after="s4"`, 16 minutes. Zero inbound `href`. The `.apxdiv` grid
  does not list it and core §03 links only to `#s5`.
- `session-4` `#sRSP` — *"D5 · The 30-day clock"*, `data-tier="foundational"`,
  `data-insert-after="s2"`, 16 minutes. Zero inbound `href`. Same pattern.

A reader reaches either one only by scrolling past the appendix they were sent to.
Between them that is 32 minutes of authored material with no route in.

**Why nothing catches this.** `verify-migration.mjs` check 16 asserts *"Time-budget
arithmetic: segment rows sum to the alloc row"* — it checks the **footer time
table**, which sums to exactly 150 in all four lessons, so it passes. The
`.apxdiv` cards are a second, independent copy of the same numbers and nothing
compares the two. `validate_lesson.py` V5 checks the same footer table.

**This is a `verify-editorial.mjs` check and a good one:** it is purely mechanical,
it has an unambiguous right answer, and it is currently wrong in every lesson.

### 10.2 Session 3 is the outlier on *every* entity class — and it is DELIBERATE

You asked whether session 3's literal em dashes are deliberate. **They are.** The
answer is in git, and I verified it directly rather than inferring it.

First, the dash count is not the only place session 3 differs — it differs the same
way on every character that has an entity form. Measured over prose only, `<script>`
and `<style>` stripped:

| | S0.1 | S1 | S2 | S3 | S4 |
|---|---|---|---|---|---|
| literal `—` | 28 | 11 | 13 | **110** | 12 |
| `&mdash;` | 13 | 101 | 83 | 22 | 112 |
| literal `“ ”` | 0 | 32 | 40 | **239** | 32 |
| `&ldquo;` / `&rdquo;` | 12 | 4 | 28 | **0** | 10 |
| literal `…` | 0 | 0 | 1 | **4** | 0 |
| `&hellip;` | 0 | 3 | 0 | **0** | 4 |
| literal `×` | — | 0 | — | **2** | 0 |

Session 3 is the only file that is literal-dominant for em dash, en dash, ellipsis
**and** multiplication sign. That is a whole-character-class preference, not a slip
on one glyph.

**The decisive evidence is the first commit.** At `7f1ece4` (15 August 2026,
*"Add files via upload"*) — the human's own upload, before any Claude pass touched
the corpus:

| Original filename at `7f1ece4` | literal `—` | `&mdash;` |
|---|---|---|
| `session1-lesson-v2.html` | 1 | 63 |
| `session2-practical-ai-usage.html` | 0 | 52 |
| **`session3-gathering-and-documenting-client-information.html`** | **77** | **0** |
| `session4-lesson.html` | 1 | 49 |

Session 3 arrived at **77 / 0** on day one. It was then rebuilt independently at
`a5fafff` (*"Session 3 rebuild from curriculum dev project HTML"*, a commit no
sibling lesson has) and came back at **98 / 0** — the same convention, reproduced by
a second authoring pass. The trajectory to today is `77/0 → 98/0 → 101/8 → 110/22`:
**every entity in session 3 today was introduced later, by cross-session sweeps**,
and their locations confirm it — the 22 `&mdash;` are almost entirely in shared
boilerplate (the standing cold-open ritual, the `.apxback` nav furniture, the shared
footer block) that arrived from sibling files.

**So the recommendation reverses.** My first reading of this table was that session 3
was inconsistent and should be normalised. It is not inconsistent; it is *differently
consistent*, and it was that way before anyone here touched it. Three reasons not to
sweep it:

1. **`—` and `&mdash;` render the identical glyph.** A student sees no difference.
   The entire benefit is to tooling.
2. **`MAINTAINING.md` already rules on this**: *"Never run a repo-wide substitution."*
   Normalising 110 dashes plus 239 quotes plus 4 ellipses in one file is a repo-wide
   substitution in all but name.
3. **It would erase authored provenance for zero rendered difference.**

**The right move is to make the checker form-agnostic, not the corpus form-uniform.**
`verify-editorial.mjs` should count and classify *both* forms by region and assert
consistency *within a file*, which session 3 already satisfies. That gets the tooling
benefit at no editorial cost. This changes D2 and D3 in §11.

### 10.3 The two documented "known follow-ups" this pass supersedes

`MAINTAINING.md` "Known follow-ups" carries two entries that this report answers
with measurements, and they should be updated or closed rather than left standing:

- *"Prose density runs 73 to 89 words per allocated minute against a proposed band
  of 37 to 42."* — that range is not reproducible by any method I can construct.
  The whole-file figures are 43–63; the **core** figures are 52–84. §7 replaces it.
- *"Footer sources not yet referenced by any confidence chip, reported as warnings
  by `validate_lesson` V4."* — §3 enumerates them: 23 orphan entries across three
  lessons, and they are not all the same kind of problem.

---

## 11. Every decision you owe, with my recommendation

Collected here so the `EDITORIAL.md` prompt in §12 can point at one list.

| # | Decision | Options | **Recommendation** |
|---|---|---|---|
| **D1** | **Em-dash policy for student-facing copy.** Open since 2026-08-18 as pedagogy decision D-2026-08-18-2; `MAINTAINING.md` records *"Existing copy keeps its dashes; files authored since 2026-08-20 avoid them. Never run a repo-wide substitution."* | (a) ratify the status quo; (b) ban in all body prose and sweep the existing ~385; (c) allow, and rule only on form | **(a) plus a hard rule on form.** The status quo is already the practice and it is defensible: session 0.1 was built under it. A retrospective sweep of 385 dashes across five files is the single highest-risk edit in this whole programme and buys the least. Form, by contrast, is mechanical and currently wrong. |
| **D2** | **Which em-dash form is canonical in HTML.** 331 `&mdash;` against 174 literal `—` in the five lessons | entity everywhere / literal everywhere / **neither — make the checker form-agnostic** | **Neither. Do not standardise the corpus; standardise the checker.** Both forms render the identical glyph, so a sweep buys the reader nothing. Have `verify-editorial.mjs` count and classify both forms by region and assert consistency *within* a file. Session 3 already passes that. |
| **D3** | **Session 3 normalisation.** It is literal-character on dashes (110), curly quotes (239), ellipses (4) and `×` (2), where the others are entity-based | normalise / leave alone | **Leave it alone. This one changed on the evidence.** Session 3 arrived at 77 literal / 0 entity in the instructor's own first upload at `7f1ece4`, before any Claude pass, and an independent rebuild at `a5fafff` reproduced it at 98/0. It is the original author's convention, and `MAINTAINING.md` already says *"Never run a repo-wide substitution."* See §10.2. |
| **D3b** | **What to do with the 22 entity dashes that HAVE crept into session 3** | leave / revert to literal on the next touch | **Leave them.** They arrived in shared boilerplate (the cold-open ritual, `.apxback` furniture, the footer block) that is byte-shared across lessons. Reverting them would break the byte-identity those blocks depend on. |
| **D4** | **The four exemption classes** in §1.4 — quotations, generated content, proper names and titles, structural furniture | adopt / amend | **Adopt as written.** Without them the first run of `verify-editorial.mjs` produces 60-plus false positives and gets switched off. |
| **D5** | **`CASE.md` and the injected regions** — 177 literal em dashes in a legal-memorandum register | in scope / exempt wholesale | **Exempt wholesale.** It is a case document, not lesson copy, and every edit costs a rebuild-and-reinject cycle. |
| **D6** | **Wolfram citation granularity** — how much must carry a section name | every reference / every quotation and quoted figure / footer only | **Every direct quotation and every quoted figure.** Bare attributions do not. "Every reference" means 20 additions in session 1 alone and turns the prose into apparatus. |
| **D7** | **The Wolfram section mapping itself.** You said you verify it | — | Proposals with confidence marks are in §2. **Nothing is applied until you sign off.** |
| **D8** | **Bibliography source of truth** | new `SOURCES.md` at repo root, injected like `CASE.md` / scrape the lesson footers as they are | **`SOURCES.md` + `build-bibliography.mjs` + `inject` + `verify`.** The footers are free prose in three different shapes for the same work (§3.4); a scraper produces three entries for one essay. |
| **D9** | **The orphan-key rule.** 23 footer keys carry no chip, and they are four different kinds (§3.2) | require a chip on every key / require a chip *or a declared reason* | **Chip or declared reason,** with the reason machine-readable — a `data-nochip` attribute on the `<li>` taking one of `fabricated`, `authority`, `background`. A blanket rule would demand a confidence chip on the two deliberately fabricated citations, which is exactly backwards. |
| **D7b** | **The 27 mis-wired chips (§3.5).** 14% of the chip layer resolves to the wrong source. Nothing in the gate catches it | fix before generating / generate and fix later | **Fix first, and treat it as blocking.** A generated bibliography would publish all 27 as fact in an artifact that reads as more authoritative than the page. `src-case` — declared synthetic — is currently the stated authority for a peer-reviewed CHI 2025 paper and a federal regulation's compliance dates. |
| **D10** | **Vocabulary: one source for tooltip and table?** | yes, generated / no, hand-maintained | **Yes, `CASE.md` pattern.** ~200 pairs, drift is invisible on the page (§4). |
| **D11** | **How terms are marked for first-occurrence detection** | mark in prose (`data-term`) / free-text match at build time | **Mark in prose.** Free-text matching will fire inside quotations, code and proper names. |
| **D12** | **Vocabulary scope.** The inventory in §4 is deliberately over-inclusive | prune it yourself | You prune. The register test is: *would a CFP who has never read an ML paper stop here?* |
| **D13** | **The complexity rubric** in §5 — weights, the discard of application-distance as a scored axis, and the corpus-wide 75th-percentile cut | approve / amend | **Approve as proposed.** Scoring does not start until you do. |
| **D14** | **Session 0.1.** Is it in this term's teaching set? | yes → adopt the core/appendix architecture first / no → provisional annex | **Adopt first if it is taught.** Otherwise annex it and say so. See §5.6. |
| **D15** | **Prose density band.** 37–42 is unratified everywhere it appears, and is currently applied to whole files | ratify against the core / ratify against the file / leave unratified | **Leave unratified, report core and appendix separately.** A band a lesson passes by having a long appendix measures the wrong thing (§7.5). |
| **D16** | **`verify-editorial.mjs` in the pre-push gate** | in from day one / advisory burn-in, then promote the hard tier | **Advisory burn-in first.** A checker that fires false positives into a currently-green gate destroys the gate's meaning (§9). |
| **D17** | **`docs/spine-brief.md` is stale** — its opening says nothing is implemented; the spine has been implemented since `93904d7` | correct it / leave it | **Correct the opening paragraph.** Cheapest correction on the list, and the brief is the document a future maintainer will read first. |

---

## 12. The prompt for the fresh chat that writes `EDITORIAL.md`

Paste the block below into a new Claude Code chat opened on this repository.
Fill in the five bracketed decision slots first — they are the ones only you can
answer, and they are listed with recommendations in §11.

```text
Read docs/editorial-gap-report.md in full before anything else. It is the
measurement pass behind this task and it is the source of every number,
exemption and inventory you need. Do not restate it, do not re-measure it, and
do not re-derive its counts. Cite it by section (§1.4, §3.2, §5) where a rule
depends on a finding.

Then read MAINTAINING.md, README.md and CASE.md for the repo's own register,
and skim one lesson end to end (session-1/index.html) so you can hear the voice
the rules have to describe.

YOUR TASK, AND ITS ONLY DELIVERABLE: write EDITORIAL.md at the repo root.

STOP THERE.
Do not write scripts/verify-editorial.mjs. Do not write any check, test, hook or
CI job. Do not edit index.html, any session-N/index.html, CASE.md, any generator
in scripts/, or any file under docs/ or audit/. Do not run a repo-wide
substitution of anything. Write EDITORIAL.md, commit it on its own branch, and
stop for my approval. The checker comes after I have approved the rules.

── NAMING, AND THIS IS NOT NEGOTIABLE ─────────────────────────────────────────
The rules document is EDITORIAL.md. Its future checker is
scripts/verify-editorial.mjs.
scripts/verify-style.mjs ALREADY EXISTS and checks the managed CSS style fence.
It has nothing to do with prose. Never use the word "style" for an editorial
rule, in a filename, a heading, a variable name or a sentence. If you need a
word for how the prose reads, use "register".

── HOW EDITORIAL.md MUST BE ORGANISED ─────────────────────────────────────────
Two parts, and the split is the point of the document:

  PART A — MECHANICALLY CHECKABLE. Rules a validator can decide with no
  judgement. Each rule states: what it asserts, the exact thing it counts or
  matches, its exemptions, whether it should HARD FAIL or ADVISE, and the
  wording of the message it emits. Write these so that
  scripts/verify-editorial.mjs is a transcription job, not a design job.

  PART B — REQUIRES A HUMAN READ. Rules about register, sentence shape, how much
  is asked of a reader, when a definition is owed. Each rule states what a
  reviewer looks for and gives one GOOD and one BAD example taken from the
  actual corpus, quoted with a file and line. No rule in Part B may be written
  as though a script could decide it, and none may be smuggled into Part A.

  A rule that a script can decide 80% of and a human must decide the rest goes
  in Part A with its residue named explicitly as a Part B rule. Say so, do not
  average.

── WHAT YOU MUST CARRY FORWARD, VERBATIM WHERE IT IS A LIST ───────────────────

1. THE EM-DASH EXEMPTIONS. Report §1.4 defines four exempt classes. Reproduce
   all four in EDITORIAL.md as normative text, not as a reference:
     A. Inside a direct quotation of a cited source. EXEMPT. Altering the dash
        misquotes the source and collides with the repo's never-fabricate
        standard, which README.md states publicly. IMPORTANT, AND MEASURED:
        report §1.6 found this class is currently EMPTY — zero dashes sit
        between the quote marks of any attributed quotation, anywhere in the
        corpus. Write the rule anyway; it costs nothing and prevents a
        regression. But do NOT go looking for instances to exempt: there are
        none, and inventing some would be worse than having none.
     A2. The four captured-transcript strings in session-0.1 — 28 dashes,
        22 em and 6 en. HARD EXEMPT. This is the corpus's one genuine
        byte-sensitive class: verbatim model output recorded in
        docs/probe-captures.md. Altering a dash there falsifies a record of what
        a model actually produced. Also exempt the capturer's spaced-hyphen note
        at session-0.1:1979.
     B. Generated content. NOT EDITABLE IN A LESSON FILE AT ALL. Three upstream
        homes, per report §1.5: CASE.md prose (rebuild via build-case.mjs then
        inject-case.mjs); the case-spine paragraph, which is a JavaScript string
        literal at scripts/inject-case.mjs:57-60; and the flowchart caption in
        scripts/case-flowchart.html. verify-case.mjs reports a hand-edit inside
        the CASE:BEGIN/CASE:END span as a hard failure. State this plainly:
        anyone who "fixes" a dash in a lesson file inside that span has broken
        the build.
     C. Proper names and published titles. EXEMPT. ~50 instances, including
        IRC §§ 671–679 thirteen times.
     C2. CASE.md's build-parser anchors. EXEMPT unless build-case.mjs changes in
        the same commit. 24 em dashes and 1 en dash in CASE.md are REGEX
        ANCHORS in build-case.mjs — 14 in the `/^# PART ([A-N]) —/` section
        index at build-case.mjs:48, and 10 more in figure extractors. One of
        them (build-case.mjs:87) is simultaneously a table empty-cell
        placeholder and a parser anchor. build-case.mjs's own header says
        "A pattern that no longer matches is a hard failure, not a warning."
        Report §1.8 has the full list. The rule in EDITORIAL.md must be
        procedural: change a dash in CASE.md, then run node scripts/build-case.mjs
        and confirm exit 0 before doing anything else.
     D. Structural furniture that is not sentence punctuation. EXEMPT. Three
        sub-kinds, name all three: the empty-cell placeholder <td>&mdash;</td>;
        the data-nav="— APPENDIX —" nav label; the .apxback return-link
        separator, 22 across the corpus.
   Also carry the CASE.md decision from report §1.5 and the form decision.

2. THE WOLFRAM SECTION LIST. These are the ONLY valid section names of Wolfram
   (2023), "What Is ChatGPT Doing … and Why Does It Work?". Reproduce the list
   in EDITORIAL.md exactly, in this order, as the closed vocabulary a citation
   rule validates against:
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
   A citation naming anything outside that list is an error, and the closed list
   makes that a Part A check. The MAPPING of each existing reference to a
   section is in report §2 and is NOT yet approved — write the rule, do not
   apply the mapping.

3. THE VOCABULARY DESIGN, as decided and recorded in report §4:
   - A small (?) affordance on the FIRST occurrence of each term PER SECTION.
   - It opens a definition of AT MOST TWO SENTENCES.
   - It works on both hover and tap.
   - A full vocabulary table at the very end of each lesson, after the last
     appendix section: term, definition, and a "read more" link.
   - Those read-more links join the bibliography.
   - Nothing exists yet. This is greenfield.
   - The register, and EDITORIAL.md must give this as the worked example:
       "A 2-gram is a letter pair, and Q is nearly always followed by U."
     Concrete, no jargon inside the definition, second sentence gives an
     instance an advisor would recognise.
   - Hard constraints from MAINTAINING.md that the design must respect: no
     localStorage / sessionStorage / indexedDB / cookies anywhere; plain ES5
     except fetch; model-adjacent text written with textContent, not innerHTML.
   Write the rules that govern the TEXT — length, register, what may appear
   inside a definition, when a term is owed one. Do not design the component.

4. THE COMPLEXITY RUBRIC, as approved. [DECISION SLOT 1 — paste the rubric from
   report §5 here, with any amendment I made when I approved it. If I approved
   it unchanged, say so and reproduce §5.1's five weighted components, the two
   unscored routing axes R1 and R2, the stall index, and the corpus-wide
   75th-percentile cut.] EDITORIAL.md records the rubric so the tiering
   decisions it drives are auditable later. It does not score anything.

5. THE SESSION-0.1 ARCHITECTURE DECISION. [DECISION SLOT 2 — one of:
     (a) 0.1 IS taught this term, so it adopts the core/appendix/tier
         architecture in a separate mechanical commit BEFORE any editorial work.
         EDITORIAL.md then applies to all five lessons with no exception.
     (b) 0.1 stays deferred. EDITORIAL.md applies to sessions 1-4 and names 0.1
         as a declared, dated exception with the reason, so the future checker
         carries one documented skip rather than silent inconsistency.]
   Report §5.6 has the measurement and the reasoning. Whichever I chose, write
   the consequence into EDITORIAL.md explicitly — an undocumented exception is
   how a checker stops being trusted.

── THE REMAINING DECISIONS, AND MY ANSWERS ────────────────────────────────────
Report §11 lists seventeen decisions with a recommendation for each. My answers:

  [DECISION SLOT 3 — em-dash policy, D1: ratify the status quo (existing copy
   keeps its dashes, new copy avoids them), or sweep? My recommendation is
   ratify. NOTE that D2 and D3 are already answered by the evidence and you
   only need to confirm: session 3's literal-character convention is the
   ORIGINAL AUTHOR'S, present at 77 literal / 0 entity in the instructor's own
   first upload (7f1ece4) before any Claude pass, and reproduced at 98/0 by an
   independent rebuild (a5fafff). Do NOT normalise it. Make the checker
   form-agnostic instead — count and classify both forms by region, assert
   consistency WITHIN a file. Report §10.2 has the git evidence.]
  [DECISION SLOT 4 — bibliography, D8/D9: SOURCES.md as the injected source of
   truth, or scrape the footers? and the orphan-key rule — chip required, or
   chip-or-declared-reason with data-nochip?]
  [DECISION SLOT 5 — anything else from §11 I have answered.]

For every §11 decision I have NOT answered above, do not guess and do not pick
the recommendation on my behalf. Write the rule with the decision marked
[OPEN — see report §11 Dn] and carry my recommendation as the proposed default.
An EDITORIAL.md with named open questions is honest; one that quietly resolves
them is not.

── WHAT ELSE BELONGS IN PART A, FROM THE MEASUREMENTS ─────────────────────────
Report §10 found three things nothing currently checks. Each is mechanical, each
is currently violated, and each should be a Part A rule:
  - The appendix index cards disagree with the appendix sections in all four
    lessons: counts, minute totals, per-card minutes, and the core lede's
    section count and minutes (§10.1). verify-migration.mjs check 16 and
    validate_lesson.py V5 check a DIFFERENT table and both pass.
  - Two appendix sections have no index card and no inbound link from anywhere:
    session-3 #sHY (C5, 16 min) and session-4 #sRSP (D5, 16 min). 32 minutes of
    authored material with no route in.
  - Entity-form consistency WITHIN a file, across dashes, curly quotes, ellipses
    and × together (§10.2). Note the direction: the rule is per-file internal
    consistency, NOT one form across the corpus. Session 3 passes such a rule
    today; a corpus-wide form rule would fail it for no reader-visible reason.

── THE FINDING THAT WAS NOT IN THE ORIGINAL BRIEF ─────────────────────────────
Report §3.5: 27 of the corpus's 193 confidence chips (14.0%) resolve to a key
that is NOT the source for the claim they sit on. Two are verbatim off-by-one
cascades (session-4:1345 and session-3:2044, both quoted in the report). Among
them, src-case — "entirely synthetic, not based on any client living or dead" —
is carrying the authority for a peer-reviewed CHI 2025 paper and for the
compliance dates of a federal regulation.

verify-migration.mjs check 18 and validate_lesson.py V4(a) both PASS on all of
these, because both assert only that the key RESOLVES, never that it is the
right key. This is a Part B rule — deciding whether a chip's key matches its
claim requires reading the claim — but EDITORIAL.md must state it, because it
is the rule the existing gate structurally cannot express, and because it
sequences the bibliography work: fixing the wiring is a PRECONDITION for
generating BIBLIOGRAPHY.md, not a follow-up. Generating over it launders 27
errors into an artifact that looks more authoritative than the page.

── WHAT PART A MUST NOT RE-CHECK ──────────────────────────────────────────────
Report §9 maps the existing gate. Do not duplicate:
  validate_lesson.py V4   chip → footer entry resolution, orphan footer entries
  validate_lesson.py V5 / verify-migration.mjs 16   the footer time table
  verify-case.mjs         anything inside the CASE:BEGIN/CASE:END span
  verify-style.mjs / restyle_sweep.py   the managed CSS fence
State each of these in EDITORIAL.md as an explicit non-goal with the owning
check named, so the next person does not add it back.
Note also that validate_lesson.py already emits C2, an INFO counting em dashes
over the raw file, and that its count is the wrong count once a policy exists,
because it includes CSS, comments, attributes and the injected region.

── REGISTER ───────────────────────────────────────────────────────────────────
Match MAINTAINING.md: direct, specific, no hedging, tables where a table is
clearer than a paragraph, and the reason stated alongside the rule. British
spelling, as the corpus uses. Every rule earns its place by naming the thing in
the corpus it would have caught — if you cannot point at an instance, the rule
is speculative and should be marked as such or dropped.

When EDITORIAL.md is written: commit it alone, on its own branch, push, and
report back with a summary of what is in Part A, what is in Part B, and every
decision you left [OPEN]. Then stop.
```
