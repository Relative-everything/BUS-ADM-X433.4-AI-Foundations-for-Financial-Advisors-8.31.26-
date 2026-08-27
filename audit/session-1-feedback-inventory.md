# Session 1 feedback — measurement inventory

**MEASURE ONLY.** Nothing in the corpus was edited to produce this file. One file
added, zero files modified. No character substitution was run, repo-wide or scoped
(§10.1 MUST‑1, permanent). No lesson figure, answer key, baseline or interaction
was touched.

| | |
|---|---|
| Measured at | `f975742a64f926f2d73f7a6f8ae42dae49443943` — tip of `claude/session-1-feedback-inventory-ykmpyh` |
| `origin/main` at measurement time | `db3a0dce320c96d5e36c72e39708149a3954c937` |
| Written | 2026-08-27 |
| Scope | `index.html`, `session-0.1/`, `session-1/`…`session-4/index.html` |
| Region classes | assigned by the repo's own `scripts/editorial-regions.mjs`, not by eye |

## READ THIS FIRST — the base is not `main`, and that is deliberate

The brief says *"branch from current main"* and asks for the SHA. **The SHA I
branched from is `f975742`, not `main`.** `main` is at `db3a0dce`, which is
**five merges behind**: it does not contain Phase 4, the instructor-note
extraction, or the ungraded-repo purge.

PART 5 of the brief asks what survived *"given the Phase 4 purge claims to have
removed all of it."* On `main` that purge has not happened at all, so a
measurement taken there would answer a different question. `f975742` is the
first commit where the question the brief asks is meaningful.

Consequence for the next turn: **the edit branch must also start from `f975742`,
not from `main`,** or the Phase 4 and ungraded-repo work is silently reverted.

---

# COUNTS FIRST

*(SHOULD‑6: counts before prose.)*

| Part | Headline number |
|---|---|
| **1** — string presence | 26 fragments sought · **17 PRESENT** · **9 ABSENT** |
| 1 — absence cause | **7** purge-confirmed deletions · **1** never in the served pages · **1** never in source *because the page computes it at runtime* |
| **2** — date/time inventory | **845** deduplicated expressions · bucket **(a) = 60** · (b) 165 · (c) 161 · (d) 104 · (e) 68 · not-a-date 7 · out-of-scope regions 274 · other 6 |
| 2 — bucket (a) in `session-1` | **9** |
| **3** — Canvas / LMS / discussion board / submit / post to | **0** real hits for four of the five terms; **11** `submit`-family hits, none a course submission |
| **4** — instructor-addressed constructs | **9 new families** beyond the three DW‑054 names; **3 of them in `session-1`** |
| **5** — grading / weighting / final-project residue | **NOT 0.** Tier A grading assertions **1** (accepted, DW‑048) · weighting assertions **1** · final-project apparatus **48** |
| **6** — titles | **250** in `index.html` + sessions 1‑4 (**197 DESCRIPTIVE / 53 ACTION‑ASSERTION**) · **26** more in `session-0.1`, excluded (22/4) |
| 6 — machine-read titles | **102 of 250** appear somewhere else in their own file; **71** of those in a generated region |
| **7(d)** — the §08 "sort" | **Never bound.** Zero drag API in the file. It is a **click-to-classify**, mislabelled a sorter. **Pass 5 is a rebuild.** |
| **8** — number provenance | §02 **4** case-derived, all others hand-authored or computed · §03 **0** case-derived · §08 **0** case-derived |
| **9** — A9 em dashes | HEAD **reproduces the baseline exactly** on all five lessons. Ratchet headroom: **0**. |
| **10** — validators | **16 of 16 exit 0.** Skill-side: `validate_dom.js` ×6 = 0; `restyle_sweep.py --check` = 1 (expected, §11.2) |

---

# PART 1 — string presence

Every fragment was searched as an **exact literal substring** against the raw
bytes of all six served files. The fragment shown in the "fragment used" column
is the byte sequence actually passed to the matcher. Region class comes from
`scripts/editorial-regions.mjs`.

**Per constraint 5, a fragment that did not match exactly is reported ABSENT.**
No near-match was substituted. Where a diagnostic explains *why* a string is
absent it appears in a separate, clearly-labelled table below and is not part
of the verdict.

## 1.1 Present — 17 fragments

| fragment used | n | file:line | region |
|---|---|---|---|
| `Scrolls freely` | 1 | `session-1:1403` | R1 |
| `Every example, exercise and quiz item` | 1 | `session-1:1416` | R1 |
| `Not a good one. Not a work one` | 5 | `session-0.1:1172`, `session-1:1458`, `session-2:1396`, `session-3:1261`, `session-4:1289` | R1 ×5 |
| `assign a probability to every possible next token` | 1 | `session-1:1467` | R1 |
| `classroom anchor only` | 16 | `index:529` R1, `index:997` R6, `session-0.1:554` R2, `session-0.1:1022` R6, `session-0.1:1763` R1, `session-1:838` R1, `session-1:1306` R6, `session-1:2179` R1, `session-2:728` R1, `session-2:1196` R6, `session-3:696` R1, `session-3:1164` R6, `session-4:715` R1, `session-4:1183` R6, `session-4:1245` R1, `session-4:2042` R1 | mixed |
| `The core runs in about` | 4 | `session-1:3265`, `session-2:3170`, `session-3:2847`, `session-4:3419` | R2 ×4 |
| `Click a candidate to append` | 1 | `session-1:1481` | R1 |
| `You are the sampler` | 1 | `session-1:1488` | R1 |
| `Every control in the lab later` | 1 | `session-1:1518` | R1 |
| `Two notches past three` | 1 | `session-1:1574` | R1 |
| `About 50,000 tokens exist` | 1 | `session-1:1636` | **R9** (assigned-reading block) |
| `Teaching approximation` | 1 | `session-1:1649` | R1 |
| `Everything so far was mechanism` | 1 | `session-1:1807` | R1 |
| `Why it guesses instead of abstaining` | 1 | `session-1:1818` | R1 |
| `De-identification is not deleting the name` | 1 | `session-1:1955` | R1 |
| `What you are looking at, and what you owe` | 1 | `session-1:1958` | R1 |
| `Three prompt templates` | 1 | `session-1:2100` | R1 |

Two of these sit outside R1 and that matters for a later edit:

* **`About 50,000 tokens exist` is R9**, an assigned-reading block. EDITORIAL.md
  puts R9 *in* scope for quotation and citation rules and *in* `authoredProse`.
  Rewriting it moves an A9 figure and is a quotation edit, not a prose edit.
* **`The core runs in about` ×4 is R2**, inside `APXCORE` — a region generated by
  `scripts/build-appendix.mjs`. Hand-editing it makes `build-appendix.mjs --check`
  exit 1. It is regenerated, never typed.

## 1.2 ABSENT — 9 fragments

**Every one of these is genuinely absent at `f975742`.** None is a near-match.

| fragment used | verdict |
|---|---|
| `graded component of Final Project Part 1` | **ABSENT** |
| `That is a graded component` | **ABSENT** |
| `Week 1 Canvas discussion` | **ABSENT** |
| `Reading due before Session 2` | **ABSENT** |
| `The question that stays open all four sessions` | **ABSENT** |
| `Instructor note` | **ABSENT** (case-sensitive, as given) |
| `holds 23.4% of the mass` | **ABSENT** |
| `Setup for Thursday` | **ABSENT** |
| `Also due` | **ABSENT** |

## 1.3 Diagnostic — why each is absent

Separate from the verdict above. This is the answer to *"absence means my source
copy is stale."* **It is stale for seven of the nine, and for one of the
remaining two the string was never in any source file at all.**

| fragment | cause | evidence |
|---|---|---|
| `graded component of Final Project Part 1` | **purged** | `95910ec` *"Nothing here is graded, so nothing here says it is"* — served-page count parent **1** → commit **0** → HEAD **0** |
| `That is a graded component` | **purged** | same commit `95910ec` — **1 → 0 → 0** |
| `Reading due before Session 2` | **purged** | same commit `95910ec` — **1 → 0 → 0** |
| `Also due` | **purged** | same commit `95910ec` — **1 → 0 → 0** |
| `Week 1 Canvas discussion` | **purged** | `5326e5f` *"Deadlines stop naming a calendar and start naming the sequence"* — **2 → 0 → 0** |
| `Setup for Thursday` | **purged** | `5326e5f` — **2 → 0 → 0** |
| `Instructor note` | **purged** | `a8eca07` *"The notes come off the pages…"* — **11 → 0 → 0**. Six lowercase `instructor notes` hits survive at `index:19`, `session-0.1:24`, `session-{1,2,3,4}:19`, all **R4** inside the `STYLE` fence — the documented, expected state (MAINTAINING.md; **DW‑051**), not a residue |
| `The question that stays open all four sessions` | **purged from the served pages** | `95f5234` *"Phase 2: propagate CASE.md v4.0"* — **1 → 0 → 0**. It survives only in `docs/spine-brief.md` |
| `holds 23.4% of the mass` | **never existed in any source file — the page COMPUTES it** | `git log -S` returns **zero** commits, repo-wide and all-history |

### The 23.4% finding, in full — this one is not staleness

`session-1:2486` builds the string at runtime:

```js
var PLN=40, PLP = normalise(1/1, 1/2, … 1/40);          // session-1:2461
'The top candidate holds '+(PLP[0]*100).toFixed(1)+'% of the mass; '+
'by rank 10 a candidate holds '+(PLP[9]*100).toFixed(1)+'%.'   // session-1:2486
```

Evaluated: `H(40) = 4.278543`, `PLP[0] = 0.233724`, so the page renders

> The top candidate holds **23.4%** of the mass; by rank 10 a candidate holds 2.3%.

**`holds 23.4% of the mass` is exactly what a reader sees and exactly what no
grep will ever find.** The source copy is not stale here — the fragment was read
off the rendered page. Any edit aimed at "23.4" must change `PLN` or the
distribution law at `session-1:2461`, and will move the rank‑10 figure with it.

There are three more computed figures in the same family (`2.3%`, and the
`Distinct tokens` / `Longest repeat` stat values). Grepping for any of them
returns nothing for the same reason.

---

# PART 2 — date and time inventory, all six files

## 2.1 Method, and what "one hit" means

Every calendar date, bare year, weekday name, month name and every occurrence of
*tonight · today · tomorrow · this evening · next week · last week · this
semester · Fall 2026* was matched, then **overlapping matches were merged** so a
full date counts once rather than three times: `3 December 2025` is one
expression, not `3 December 2025` + `December` + `2025`.

**845 merged expressions.** Every one is classified; the residual is zero.

## 2.2 Bucket counts per file — the headline table

| bucket | index | 0.1 | s1 | s2 | s3 | s4 | **TOTAL** |
|---|---|---|---|---|---|---|---|
| **(a) THIS offering's calendar — PURGE TARGET** | **2** | **7** | **9** | **6** | **19** | **17** | **60** |
| (b) citation year in an attribution or footer entry | 0 | 0 | 18 | 32 | 69 | 46 | **165** |
| (c) source metadata — `last_retrieved`, `asOf`, as-of stamps | 1 | 92 | 17 | 22 | 12 | 17 | **161** |
| (d) part of a legal or regulatory identifier | 0 | 0 | 3 | 27 | 17 | 57 | **104** |
| (e) case fact, or a figure correct for one tax year | 0 | 1 | 20 | 13 | 21 | 13 | **68** |
| — not a date at all (false positive) | 0 | 3 | 2 | 2 | 0 | 0 | 7 |
| — not this offering's calendar, not (b)–(e) | 0 | 2 | 0 | 0 | 1 | 3 | 6 |
| *out of scope: R6 injected CASE span* | 38 | 38 | 38 | 38 | 38 | 38 | *228* |
| *out of scope: R10 captured transcript* | 0 | 20 | 0 | 0 | 0 | 0 | *20* |
| *out of scope: R4 CSS* | 4 | 5 | 4 | 4 | 4 | 4 | *25* |
| *out of scope: R5 comment* | 0 | 0 | 0 | 0 | 0 | 1 | *1* |
| **file total** | 45 | 168 | 111 | 144 | 181 | 196 | **845** |

**Buckets (b), (c) and (d) — 430 expressions — must survive.** Bucket (e) — 68 —
is a `CASE.md` question and is listed, not touched.

### Constraint 3, honoured explicitly

The **228 R6 hits are the injected `CASE:BEGIN`/`CASE:END` span** — 38 per file,
byte-identical across all six because they are one generated block. They are
reported here **as a count only**. No content inside the sentinels is quoted
anywhere in this file, and none of it is a purge candidate: it is owned by
`verify-case.mjs` and overwritten by the next `inject-case.mjs`. The
`LMBOX`/`LMSTYLE` fences (R11) contribute **zero** date expressions.

## 2.3 Bucket (a) is not one thing — split it before purging

The 60 are three different objects and the brief's ranked constraints treat them
differently. **This split is the decision the next turn actually needs.**

| sub-kind | n | where | MAINTAINING.md's own position |
|---|---|---|---|
| **(a‑1) offering term label** — `Fall 2026` | **3** | `index:1031`, `index:1108`, `session-1:2178` | `index:1108` is **DW‑009**, open. `index:1031` and **`session-1:2178` appear in no register row** |
| **(a‑2) in-class deixis** — *tonight · today* naming the live session | **57** | 0.1 ×7, s1 ×8, s2 ×6, s3 ×19, s4 ×17 | Explicitly **KEPT**: *"In-class instruction … This is the visual aid working. It is the reason the file exists"* |
| | **60** | | |

**A fourth object the scanner cannot see.** `index:1075`, `:1084`, `:1093` each
render `<span class="dt">Date to be confirmed</span>` for Sessions 3, 4 and 5.
These carry **no date token**, so they are not among the 845 — but they are
calendar slots for this offering, and a purge of (a‑1) that leaves them makes
the hub claim a schedule it declines to state. Listed so the next turn decides
about them deliberately rather than by omission.

**The tension, stated and not resolved.** The brief calls bucket (a) *the purge
target*. `MAINTAINING.md`'s Kept table calls the 57 in‑class deictics the thing
the repository exists to do. **Both cannot be acted on.** 57 of the 60 are
(a‑2). Purging (a‑2) costs `session-1` eight occurrences across seven lines,
including its §01 hinge (*"The rest of tonight is what that sentence actually
means"*, `:1467`), the spine question's closer (`:1428`), its §09 work-along cue
(`:2134`) and its CFP-topics heading (`:2114`). Recommend: **purge (a‑1) only —
three strings — and route (a‑2) to a decision alongside DW‑050**, which is
already open on precisely this question for cross-session constructs.

## 2.4 Three findings inside PART 2 worth their own line

1. **`Fall 2026` is asymmetric.** `index.html` ×2 and `session-1` ×1 carry it.
   Sessions 2, 3, 4 and 0.1 **do not** — `session-2:2064`'s footer is the same
   sentence with the year removed. So the hub and `session-1` are the only two
   files that date the offering, and only one of the three sites (**DW‑009**,
   `index:1108`) is registered. **`session-1:2178` is an unregistered second
   copy of a known open question, in the file taught next.**
2. **`session-4:1264` is a live between-session logistics statement.**
   *"Part 1 status. Handoff packages are in. They have been read and screened;
   pairings are distributed later tonight."* This asserts a submission has
   already happened and that the instructor has read it — a Tier A/Tier B claim
   in substance that the purge did not reach because it names no grade and no
   date. See PART 5.
3. **`session-0.1:2158` is a false positive worth knowing about.** The `today`
   there is inside `/\b(current|today|latest|…)\b/i` — a *regex source pattern*,
   not a time word. A naive deictic purge would corrupt a matcher. This is the
   same failure class as DW‑049 (`LM:BEGIN` matching `LMSTYLE:BEGIN`) and as the
   236 `&mdash;` substitutions §10.1 MUST‑1 exists to forbid.

## 2.5 Every bucket (a) expression

| file:line | region | match | context |
|---|---|---|---|
| `index.html:1031` | R1 | `Fall 2026` | <div class="eyebrow">UC Berkeley Extension &middot; Fall 2026</div> |
| `index.html:1108` | R1 | `Fall 2026` | <p>BUS ADM X433.4 &mdash; AI Foundations for Financial Advisors &middot; UC Berkeley Extension, Fall 2026 &middot; Instr |
| `session-0.1:1129` | R1 | `Tonight` | <p class="big">Tonight is a vocabulary lesson with a working model attached. By the end you will be able to look at an o |
| `session-0.1:1199` | R1 | `tonight` | <p class="big">Everything tonight runs against one household. The same facts, through every configuration, is what makes |
| `session-0.1:1657` | R1 | `tonight` | <p class="big">The Cole file is the reason this is not abstract. A closely held business, an unfunded buy-sell nobody ha |
| `session-0.1:1729` | R1 | `today` | <p class="big">Before you leave, record one task you do unassisted today, how long it takes, and what it produces. Sessi |
| `session-0.1:1751` | R1 | `tonight` | <p>The recurring question of this course is in <b>Case facts</b>: how much of the note Meg calls each year, what that co |
| `session-0.1:1752` | R1 | `Tonight` | <p>Tonight it acquired its first edge. That arithmetic has to be worked somewhere, and whichever configuration you use t |
| `session-0.1:2172` | R2 | `tonight` | '<div class="rfx">Nothing here is a score. The question for tonight is whether the layers you assumed were actually swit |
| `session-1:1428` | R1 | `tonight` | <div class="talk"><span class="th">The question that runs through every session</span>Meg is short $522,086 a year from  |
| `session-1:1428` | R1 | `Tonight` | <div class="talk"><span class="th">The question that runs through every session</span>Meg is short $522,086 a year from  |
| `session-1:1467` | R1 | `tonight` | <p>Whatever you pasted, you wrote it for a machine that does exactly one thing: assign a probability to every possible n |
| `session-1:1837` | R1 | `tonight` | <ul><li>Which of Meg's questions are arbitrary facts &mdash; a rate, a date, a threshold with one right answer and many  |
| `session-1:1996` | R1 | `tonight` | <div class="check" data-gate="g14"><span class="mk">&middot;</span><div class="ct"><b>Work along</b>Open at least four s |
| `session-1:2114` | R1 | `tonight` | <h3>CFP Board principal knowledge topics touched tonight</h3> |
| `session-1:2134` | R1 | `tonight` | <div class="check" data-gate="g17"><span class="mk">&middot;</span><div class="ct"><b>Work along</b>Record your baseline |
| `session-1:2143` | R1 | `tonight` | <div class="talk"><span class="th">Closing question &middot; one to three answers, out loud, then we go</span>A model ha |
| `session-1:2178` | R1 | `Fall 2026` | <p>BUS ADM X433.4 &mdash; AI Foundations for Financial Advisors &middot; Session 1 &middot; UC Berkeley Extension, Fall  |
| `session-2:1405` | R1 | `Tonight` | <p>Same field, one session on. Session 1 said nothing in this prompt read your intent. Tonight you learn the framework t |
| `session-2:1604` | R1 | `today` | <p>Take the weakest of the three templates you brought today. Identify which of P, T, C, F it is missing. Add the missin |
| `session-2:1960` | R1 | `today` | <p style="margin-top:0;font-size:15.5px">Name the recurring task your workflow will address, and record how long it take |
| `session-2:1965` | R1 | `today` | <div><label class="plab" for="baseMin">Minutes per occurrence, today</label><input type="text" id="baseMin" value="45" i |
| `session-2:2000` | R1 | `tonight` | <div class="check" data-gate="g10"><span class="mk">&middot;</span><div class="ct"><b>Work along</b>Record your baseline |
| `session-2:2755` | R2 | `today` | :'It did not survive contact with a second person. Better to find that out today than in Session 5.'; |
| `session-3:1215` | R1 | `Tonight` | <p class="big">Session 1: the model predicts rather than knows. Session 2: it samples a plausible answer rather than com |
| `session-3:1270` | R1 | `Tonight` | <p>By now the prompt you paste here should look different from the one you pasted in Session 1. Tonight is about the cha |
| `session-3:1452` | R1 | `tonight` | <p class="big">The spiral, stated once: Session 1 was why hallucination happens, tonight is how often it happens under t |
| `session-3:1700` | R1 | `tonight` | <p>The reason this is assigned tonight and read in Session 4 rather than the reverse: Session 4 supplies the regulatory  |
| `session-3:1725` | R1 | `Tonight` | <p>This divides the room, which is the only reason it is on the schedule. One side holds that a citation is a handle — i |
| `session-3:1752` | R1 | `Tonight` | <p>Scalability has a two-part definition in this course: the workflow works for the next twenty clients and not only the |
| `session-3:1769` | R1 | `tonight` | <div class="card"><span class="num">Reading for Session 4</span><h4>Daly (2026) · SEC FY2026 Exam Priorities §VII · Jour |
| `session-3:1772` | R1 | `tonight` | <p>One item to carry forward. Part 1 sets your Session 1 baseline time against the AI-assisted time, including any step  |
| `session-3:1774` | R1 | `tonight` | <p class="pull">Session 4 does what tonight could not: it prices the failure.</p> |
| `session-3:1776` | R1 | `tonight` | <p>Everything tonight was a measurement of how often grounding is wrong. Nothing tonight established what happens to you |
| `session-3:1776` | R1 | `tonight` | <p>Everything tonight was a measurement of how often grounding is wrong. Nothing tonight established what happens to you |
| `session-3:1776` | R1 | `Tonight` | <p>Everything tonight was a measurement of how often grounding is wrong. Nothing tonight established what happens to you |
| `session-3:1782` | R1 | `Tonight` | <div class="talk"><span class="th">Closing question &middot; one to three answers, out loud, then we go</span>Tonight’s  |
| `session-3:1883` | R2 | `tonight` | {t:'Confirm it applies to these facts.',k:4,w:'Last because it is the most expensive and requires the other three to hav |
| `session-3:2489` | R2 | `tonight` | 'What the exercise is actually testing is not the tax answer. It is whether you can state a reason in a form that surviv |
| `session-3:2520` | R2 | `tonight` | '<br><br><span class="hd">The transferable rule</span><span class="good">Four of these seven either exist on the closing |
| `session-3:2610` | R2 | `tonight` | '<span class="good">If you voted "check more":</span> a citation converts an unfalsifiable claim into a falsifiable one. |
| `session-3:2613` | R2 | `tonight` | '<span class="hd">Complication \u2014 instructor introduces, nobody re-speaks</span><span class="flag">Every failure you |
| `session-3:2723` | R2 | `Tonight` | '<div class="rfx">No judgement is implied. Tonight adds a channel a better prompt cannot substitute for \u2014 your own  |
| `session-4:1234` | R1 | `tonight` | <p class="big"><strong>The mechanism thread ends here.</strong> Three sessions took you through the architecture &mdash; |
| `session-4:1253` | R1 | `Tonight` | <p style="margin:0;max-width:none;font-size:15.5px">Meg is short <strong>$522,086</strong> a year from year 6 while the  |
| `session-4:1256` | R1 | `Tonight` | <p>Sessions 1 through 3 asked what the tool could do with this household. Tonight asks what you are permitted to do, wha |
| `session-4:1264` | R1 | `tonight` | <p class="srcnote"><strong>Part 1 status.</strong> Handoff packages are in. They have been read and screened; pairings a |
| `session-4:1306` | R1 | `tonight` | <p class="big">Advisers keep asking which AI rule applies to them. The question has no answer. Every obligation tonight  |
| `session-4:1339` | R1 | `Tonight` | <p><strong>You have done this before.</strong> In Session 1 you redacted the Cole facts on instinct. Tonight the same fa |
| `session-4:1639` | R1 | `tonight` | <p><strong>Regulatory note.</strong> <!-- CLAIM weight=claim resolve="Read AB 853 and Regulation (EU) 2024/1689 Article  |
| `session-4:1670` | R1 | `Tonight` | <p class="pull">Session 1: why it happens. Session 3: how often. Tonight: what it costs you.</p> |
| `session-4:1752` | R1 | `tonight` | <p class="srcnote">Left column from Wolfram (2023), assigned for Sessions 1&ndash;3. Right from Artificial Analysis Inte |
| `session-4:1778` | R1 | `Tonight` | <p>Two artifacts from this course are the test material: the Session 2 prompt explaining the IDGT sale to Meg in client- |
| `session-4:1899` | R1 | `tonight` | <p class="srcnote"><strong>Builders: what to do with your hands.</strong> You will watch someone fail to run your workfl |
| `session-4:1951` | R1 | `tonight` | <p class="big">Draft an AI usage policy for your firm. This is the last instruction you receive before writing it, so ev |
| `session-4:1964` | R1 | `tonight` | <h3 style="margin-top:30px">Peer review, not tonight</h3> |
| `session-4:2117` | R2 | `tonight` | else{h+='<div class="fx">Freeze the package now. Nothing is added after tonight.</div>'} |
| `session-4:2498` | R2 | `Tonight` | f:'A document conflict neither party had reconciled. Tonight that same finding becomes the test case for whether your au |
| `session-4:2707` | R2 | `tonight` | 'Verification':'The workflow ran and you cannot tell whether it worked. That is a verification-step defect, and it maps  |
| `session-4:3294` | R2 | `Tonight` | '<div class="rfx">No judgement is implied. Tonight the question stops being whether the prompt was good and becomes whet |
---

# PART 3 — Canvas · LMS · discussion board · submit · post to

| fragment used | matcher | hits | verdict |
|---|---|---|---|
| `Canvas` | literal, case-sensitive | 3 | all `session-4`, all the **HTML `<canvas>` element** |
| `canvas` | literal, case-insensitive | 5 | same three plus two lowercase, same element |
| `LMS` | literal, case-sensitive | 4 | **all four are the substring inside `LMSTYLE:BEGIN`/`LMSTYLE:END`** |
| `\bLMS\b` | word-boundary | **0** | **the LMS is not named anywhere** |
| `discussion board` | literal, case-insensitive | **0** | absent |
| `post to` / `post(ed) (to\|in\|on)` | regex, case-insensitive | **0** | absent |
| `submi(t\|ssion\|tted\|tting)` | regex, case-insensitive | 11 | none is a course submission — see below |

## 3.1 Every `Canvas` and `LMS` hit

| file:line | region | match | what it is |
|---|---|---|---|
| `session-4:1575` | **R3** | `Canvas` | `<div id="pfCanvases">` — an element id |
| `session-4:2885` | R2 | `Canvas` | `$('pfCanvases')` |
| `session-4:2891` | R2 | `canvas` | `document.createElement('canvas')` |
| `session-4:2921` | R2 | `Canvas`, `canvas` | the no-canvas fallback card |
| `session-0.1:519`, `:543` | **R11** | `LMS` | `LMSTYLE:BEGIN v1` / `LMSTYLE:END v1` |
| `session-1:803`, `:827` | **R11** | `LMS` | same fence, byte-paired copy |

**The four `LMS` hits are a false-positive class, and it is DW‑049's exact
class.** `LMS` is a substring of `LMSTYLE`. A purge check greping `LMS` reports
four violations that are the console style fence — a region `MAINTAINING.md`
forbids editing from one lesson alone (DW‑057, DW‑048). Use `\bLMS\b`.

**`MAINTAINING.md`'s documented Canvas exclusion is confirmed and is slightly
understated.** It predicts *"four legitimate hits"* in `session-4`; the
case-sensitive count is three and the case-insensitive count is five. Either
figure is the element, none is the platform.

## 3.2 Every `submit`-family hit — 11, and none asserts a course submission

| file:line | region | match | what it is |
|---|---|---|---|
| `session-0.1:1079` | **R11** | `submit` | *"terms for the free tier let it use what you submit to improve its products"* — vendor terms, inside `LMBOX` |
| `session-1:1361` | **R11** | `submit` | byte-identical pair of the above |
| `session-0.1:1390` | R1 | `submission` | *"This locks on your first submission"* — a widget lock |
| `session-0.1:2734`, `:2750`, `:2751` | R2 | `submit`, `Submit` | slider UI: *"Move the slider, then submit"*, `Submit all three` |
| `session-1:2635`, `:2636` | R2 | `submit`, `Submit` | same widget in `session-1` |
| `session-1:1626` | **R1** | `submit` | work-along gate g4: *"Get the loss below 0.02, then submit all three scale guesses"* |
| `session-4:1927` | R1 | `submission` | *"Locked vote above. No changes after submission"* — a widget's own vote lock |
| `session-4:2112` | R2 | `SUBMIT` | `band='SUBMITTABLE WITH GAPS'` — a checklist verdict band |

Ten of the eleven are a widget describing its own control. The eleventh
(`session-1:1626`) is in-class instruction addressed to a button on the page.
**Under `MAINTAINING.md`'s Kept table — *"every work-along gate"* and *"a
widget's own score"* — all eleven are correctly kept.** The two R11 hits could
not be edited from `session-1` alone in any case.

---

# PART 4 — instructor-addressed constructs beyond the three DW‑054 names

DW‑054 names three: (a) `session-0.1:1750`, (b) *"the `.verify` gate family, 13
occurrences"*, (c) the control captions at `session-2:1930` and
`session-0.1:1708`. Below are constructs **a student reading alone cannot act
on** that are none of those three.

## 4.0 First, a correction to DW‑054(b)'s own population

DW‑054 and DW‑056 both call the family *"the 13 `.verify` gates."* Measured at
`f975742`:

* **`class="verify"` occurs exactly 10 times** — `index:1012`, `session-0.1:1037`,
  `session-0.1:1659`, `session-1:1321`, `session-2:1211`, `session-2:1614`,
  `session-3:1179`, `session-3:1594`, `session-4:1198`, `session-4:1763`.
* **Three of DW‑056's thirteen are not `.verify` gates at all** and carry no
  `verify` class:
  * `session-3:1688` — a `<p class="src">` (**R8**) opening *"**Instructor
    verification required before teaching.**"*
  * `session-3:2487` — an **R2** script literal
    `[INSTRUCTOR VERIFICATION REQUIRED — not resolved on this page]`
  * `session-4:1369` — a `<p class="srcnote">` (**R1**) with the same bolded
    sentence

The population of thirteen is right; the label is wrong, and it matters because
a fix scoped to `.verify` reaches ten of them and silently misses three — one of
which is inside a **scored answer panel** (`session-3:2487`). Three of DW‑056's
line numbers are also one low against HEAD (`session-2:1615`→`1614`,
`session-3:1595`→`1594`, `session-4:1764`→`1763`); the anchor strings are the
durable locators, as the register's own header says.

## 4.1 Nine construct families DW‑054 does not name

**Three are in `session-1`**, the file taught next.

| # | file:line | region | the sentence | why a solo reader is stuck |
|---|---|---|---|---|
| **1** | **`session-1:1727`** | R1 | *"**Ask the room:** which of these have you already delegated to a tool this year, and did you total the numbers yourself?"* | An imperative to the person running the room. A reader alone has no room to ask. **Unmarked** — no `.inote`, no `.verify`, no caption |
| **2** | **`session-1:2061`** | R1 | *"Room tally — instructor keys in the Zoom poll counts"* | **A third instructor-operated control caption.** DW‑054(c) names only `session-2:1930` and `session-0.1:1708`. This one is in `session-1` and DW‑054 does not have it. Removing the caption leaves an unlabelled input, exactly as DW‑054 says of the other two |
| **3** | **`session-1:2052`** | R3/R1 | `<div class="inote"><span class="ih">`**Complication — introduce this once, after both sides have spoken**`</span>` | Pure delivery direction, in the `.inote` class Phase 4 emptied everywhere else. **It is the last surviving `.inote` in sessions 1–4** — the other eleven are all in `session-0.1`. Same substance as the panel DW‑046 removed from `session-4` |
| 4 | `session-1:1430` | R1 | *"**Instructors:** `Shift+U` unlocks everything."* | Addressed to instructors by name, in body prose, in the lede |
| 5 | `session-1:2143`, `session-2:2002`, `session-3:1782`, `session-4:1976` | R1 ×4 | *"Closing question · one to three answers, **out loud, then we go**"* | *"then we go"* is run-of-show. A solo reader cannot give one-to-three spoken answers |
| 6 | `session-4:1855`, `:1856` | R3 | `<tr><td>Already done</td><td>`**Instructor**`</td><td>Read the handoff package as received…` and `<td>Now</td><td>`**Instructor**`</td><td>Draw the pairing…` | Two run-of-show table rows that **assign tasks to the instructor** inside student-facing markup |
| 7 | `session-4:1929` | R1 | *"Complication \| 5 \| One fact neither side raised, introduced by the instructor. **Nobody re-speaks.**"* | Staging direction rendered as a timing-table row |
| 8 | `session-3:2613` | R2 | *"Complication — **instructor introduces, nobody re-speaks**"* | Same construct, inside a script literal, so a `.inote`-scoped sweep cannot see it |
| 9 | `session-2:3046`, `session-3:2624`, `session-3:2694` | R2 ×3 | *"Say that out loud and say nothing else about it"*; *"Say out loud which sentence moved you"*; *"**Say this to them, out loud**"* | Spoken-delivery instruction generated into a readout panel |

## 4.2 A borderline family, reported rather than asserted

`session-1` carries **six `.talk` blocks whose eyebrow ends in "— discussion"**
(`:1608`, `:1686`, `:1725`, `:1836`, `:2024`, plus `:1428` and `:2132` on other
labels). A solo reader can read the prose; they cannot hold the discussion. These
are the pedagogy, not a defect, and I am not proposing they move — but they are
the largest population of "cannot act on alone" text in the file and any
definition of the marker set has to say whether it reaches them. **Count: 6.**

## 4.3 What this means for DW‑054

DW‑054 asks *"whether the marker set should widen or whether these are correctly
lesson content."* The measurement says the marker set **cannot** be the test:
of the nine families above, **one is `.inote` (already a marker), two are R2
script literals no markup-scoped sweep can see, two are `<td>` cells, and four
are unmarked body prose.** A definition built on markings will miss six of nine.
The stable test is the one the brief states: *anything a student reading alone
cannot act on.*

---

# PART 5 — grading, weighting and final-project residue in `index.html` and sessions 1–4

**The count is not 0.** The brief asks me to say so explicitly if it were.

The purge did what it says it did for *grade* words. It did **not** reach the
final-project apparatus, and it missed one weighting assertion because that
assertion lives in a script literal.

## 5.1 Tier A — assertions of a grade

| fragment used | hits | detail |
|---|---|---|
| `\bis graded\b` | **1** | `session-1:1349` **R11** — *"Nothing is graded on it and nothing breaks without it."* |
| `\bgraded\b` | 1 | the same site |
| `\ba grade\b`, `\byour grade\b`, `\bcourse grade\b` | **0** | |
| `\bfull credit\b`, `\bloses marks\b`, `\bturn in\b`, `\bpass/fail\b` | **0** | |
| `\bgrading\b` | 1 | `session-2:2492` **R2** — a variable named in a regex comment, not a claim |

**Tier A grading assertions in the hub and sessions 1–4: 1, and it is closed.**
`session-1:1349` is **DW‑048**, accepted as-is by the instructor on 2026‑08‑27:
it *disclaims* grading, it is inside the `LMBOX` fence byte-paired with
`session-0.1`, and `MAINTAINING.md` says **do not re-open it.** I have not.

Everything matching `/grade/` elsewhere is a false positive: `degrades` (×6, in
the R4 font-fallback comment and in prose about model confidence),
*"eighth-grade reading level"* and *"Flesch-Kincaid grade"* (`session-2:2364`,
`:2366`).

## 5.2 Weighting — one survivor, and the purge could not have seen it

| file:line | region | the string |
|---|---|---|
| **`session-3:2697`** | **R2** | `'…<span style="color:#6F7B78">`**Part 1 weights scalability at 30% and deliverable correctness at 25%.** `The fourth dimension and the diagnosis both map to scalability. Fix those first.</span>'` |

This is *"any weight or percentage of a grade"* — the last clause of the Tier A
row — stated as fact about the final project, rendered into a readout panel.
**It survived because it is a JavaScript string literal, and the purge worked
over prose.** It is the single clearest Tier A defect left in the corpus.

The other 16 `rubric` hits are the `Rubric coverage` widget (`session-3`),
the `RUBRIC` policy-mapper array (`session-4`) and the peer-review instrument
(`session-2`) — all of which `MAINTAINING.md` keeps explicitly as *"a widget's
own score … a diagnostic is the page's."* `session-4:2377` *"weighted points"*
and `session-4:3187` *"Peer score"* are the same class.

## 5.3 Tier B — between-session obligation

| fragment used | hits | verdict |
|---|---|---|
| `48 hours`, `before the week is out`, `ahead of Session`, `read before Session`, `bring … to Session`, `was due` | **0** each | clean |
| `\bdeadline` | 2 | both `session-4` R2, both **regulatory** — the Reg S‑P notification clock. Kept by name in `MAINTAINING.md` |
| `\bdue\b` | 6 | 5 are *"Due diligence"* (`session-4` §04 title, eyebrow, timing row, footer entry); 1 is `session-2:2640` R2, *"deficiencies"* inside a Tax Court item |

**Tier B between-session obligations: 0.** This half of the purge is clean.

## 5.4 Final-project apparatus — 48 references, and it is fully live

| fragment used | hits | files |
|---|---|---|
| `Final Project` (case-insensitive) | **15** | `index` 1, `session-1` 3, `session-2` 8, `session-3` 1, `session-4` 2 |
| `\bPart 1\b` | **28** | `session-2` 8, `session-3` 12, `session-4` 8 |
| `\bPart 2\b` | **5** | `session-2` 1, `session-4` 4 |
| `handoff package` | 3 | `session-3` 1, `session-4` 2 |
| `Assignment` | 26 | R1 11 · R2 4 · **R4 5** (CSS comment) · **R6 5** (injected span) · R7 1 |

The load-bearing sites:

| file:line | what it asserts |
|---|---|
| `index:1095` | `<h3>Final project</h3>` in a **Session 5 card** reading *"Not yet published"* / *"Date to be confirmed"* / *"Coming before the session runs"* |
| `session-2:1945–1947` | a whole section, `data-nav="Final project"`, `<h2>`**Final Project Part 1 and Baseline Capture**`</h2>` |
| `session-2:1976` | `<h3>`**Part 1 deliverable checklist**`</h3>` — *"Seven elements. Tick what you have planned for"* |
| `session-2:2023` | timing-table row `09 · Assignment \| Final Project Part 1 and Baseline Capture \| 7` |
| `session-3:1746–1768` | section `data-nav="Part 1 + handoff"`, `<h2>Part 1 Draft Peer Exchange</h2>`, card **Final Project Part 1 — handoff package** |
| `session-4:1848–1858` | `<h2>`**Part 1 Relay and the Part 2 Pairing Draw**`</h2>` and a four-row run-of-show table |
| **`session-4:1264`** | *"**Part 1 status.** Handoff packages are in. They have been read and screened; pairings are distributed later tonight"* |

**`session-4:1264` is the sharpest.** It asserts that a deliverable **has been
submitted**, that the **instructor has read and screened it**, and that a
**distribution happens later the same evening**. It states no grade and no date,
so no Tier A or Tier B string matches it — and it is a stronger claim about
course administration than most of what was purged. The purge list's own
rationale (*"two sources of truth for a deadline is worse than one wrong one"*)
applies to it exactly.

**What PART 5 does NOT say.** None of these 48 is a defect on its face. The
purge decision was about *grades, weights, submissions and dates*; a course with
a final project may legitimately describe the project. But the brief asked
whether the Phase 4 claim *"removed all of it"* holds, and it does not: one
weighting assertion (`session-3:2697`) is squarely Tier A, and one submission
assertion (`session-4:1264`) is Tier A in substance. **Everything else in the 48
is a scope question, not a defect.**

---

# PART 6 — title inventory

## 6.1 Counts

| population | headings | DESCRIPTIVE | ACTION / ASSERTION | section titles (`<h2>` first in its `<section class="slide">`) |
|---|---|---|---|---|
| `index.html` | 11 | 10 | 1 | 0 |
| `session-1` | 43 | 25 | **18** | 18 |
| `session-2` | 77 | 62 | 15 | 16 |
| `session-3` | 46 | 43 | 3 | 18 |
| `session-4` | 73 | 57 | 16 | 18 |
| **IN SCOPE — hub + sessions 1‑4** | **250** | **197** | **53** | **70** |
| `session-0.1` — **EXCLUDED** from every purge bucket (DW‑057), counted per constraint 4 | **26** | **22** | **4** | **12** |
| **grand total** | **276** | **219** | **57** | **82** |

Classifier: a title is **ACTION / ASSERTION** if it contains `?`, opens with an
interrogative (`What`/`Why`/`How`/`Which`/`When`/`Is`/`Does`…), opens with an
imperative verb, or contains a finite verb making a claim. Otherwise
**DESCRIPTIVE**. Borderline cases are visible in the full table — the string is
printed next to the verdict so the call can be checked rather than trusted.

**`session-1` is the outlier and it is the reason this part was asked for.** It
carries **18 of the 53** ACTION/ASSERTION titles — 42% of the in-scope total
from 17% of the headings — against `session-3`'s 3. Its rate is 18/43 = **42%**;
`session-3`'s is 3/46 = **7%**. If a house style for titles is being set, the
gap between those two files is the measurement to set it against.

## 6.2 What reads a title — the silent-break question

**102 of the 250 in-scope titles appear somewhere else in their own file.**
By what reads them:

| reader | occurrences | is a rewrite silently broken? |
|---|---|---|
| **footer timing table** (`APXBUDGET`) | 48 | **No — loudly.** `build-appendix.mjs --check` exits 1 |
| **appendix contents card** (`APXPANEL`) | 23 | **No — loudly.** Same check |
| **JS string literal** | 12 | **YES, silently.** Nothing asserts these agree |
| **`data-nav` nav-rail label** | 4 | **YES, silently.** Nothing asserts these agree |
| other (lede, `<title>`, cross-reference prose) | 87 | **YES, silently** |

### The mechanism, from the code rather than from the prose

`scripts/build-appendix.mjs:174-175` reads each section's eyebrow and its first
`<h1>/<h2>` as `s.eyebrow` and `s.title`, then writes `s.title` into two
generated regions — the contents card (`:254`, `<b>{{TITLE}}</b>`) and the
footer budget row (`:388-389`, `<td>{{TITLE}}</td>`). It throws outright if a
section has no `<h2>` (`:331`).

**So every one of the 70 in-scope section titles is machine-read, and the
generated copies are protected.** Rewrite an `<h2>` and `build-appendix.mjs
--check` goes red until you re-run `build-appendix.mjs`. That is the good case.

**The dangerous cases are the 16 that nothing checks:**

* **`data-nav` (4).** The nav-rail label is a *separate string* on the
  `<section>` tag, and `mark()`/the rail read it at `session-1:2366`
  (`s.dataset.nav`). Nothing compares it to the `<h2>`. `session-1` already
  shows the drift as designed — `<h2>The Model Ranks Candidates, Then Something
  Picks One</h2>` sits under `data-nav="Prediction"`. Rewriting the `<h2>` leaves
  the rail saying the old thing, and no validator notices.
* **JS string literals (12).** A title repeated inside a script literal is
  invisible to every markup-scoped check.

### The one worked example the next turn will hit first

`session-1:1938` — `<h2>What May Never Be Entered Into a Third-Party Tool</h2>`
— is the §08 title. The identical string is at **`session-1:2161`**, inside
`APXBUDGET`. It is also the reason a month-name scan reports two false hits on
`May`: it is the modal verb. Three separate facts about one title, and the third
is why PART 2 needed a hand pass.

## 6.3 The full flat list

Columns: **section title?** marks the `<h2>` that `build-appendix.mjs` reads.
**machine-read by** lists every other occurrence of the same exact inner HTML in
the same file, with its line.


#### index.html + sessions 1-4 — IN SCOPE (250 titles)

| file:line | tag | section title? | class | title | machine-read by |
|---|---|---|---|---|---|
| `index.html:530` | h2 | — | DESC | The Cole Household | other @990; other @996 |
| `index.html:996` | h2 | — | DESC | The Cole Household | other @530; other @990 |
| `index.html:1032` | h1 | — | DESC | AI Foundations for Financial Advisors | other @6; other @1108 |
| `index.html:1042` | h2 | — | DESC | Sessions | other @1104 |
| `index.html:1050` | h3 | — | DESC | The Control Surface | — |
| `index.html:1059` | h3 | — | **ACT** | How the Machine Works, and What It Costs | — |
| `index.html:1068` | h3 | — | DESC | Practical AI Usage in Daily Advisory Workflows | — |
| `index.html:1077` | h3 | — | DESC | Gathering and Documenting Client Information | — |
| `index.html:1086` | h3 | — | DESC | Compliance, Security and Responsible Use | — |
| `index.html:1095` | h3 | — | DESC | Final project | — |
| `index.html:1101` | h2 | — | DESC | Course rule on client data | — |
| `session-1:839` | h2 | — | DESC | The Cole Household | other @1299; other @1305 |
| `session-1:1305` | h2 | — | DESC | The Cole Household | other @839; other @1299 |
| `session-1:1401` | h1 | — | **ACT** | How the Machine Works, and What It Costs | other @6; footer-timing-table @2153 |
| `session-1:1439` | h2 | **SECTION** | DESC | Appendix contents | nav-label @1437 |
| `session-1:1457` | h2 | **SECTION** | DESC | The Last Prompt You Sent | footer-timing-table @2154 |
| `session-1:1476` | h2 | **SECTION** | DESC | The Model Ranks Candidates, Then Something Picks One | footer-timing-table @2155 |
| `session-1:1490` | h3 | — | DESC | Always taking the top word produces flat, repetitive text | — |
| `session-1:1508` | h3 | — | DESC | The probabilities fall off as a power law | — |
| `session-1:1531` | h2 | **SECTION** | **ACT** | Counting Works, Then Stops Working | appendix-contents-card @1443; other @1528; other @2164 |
| `session-1:1563` | h3 | — | **ACT** | Why you cannot just use longer sequences | — |
| `session-1:1585` | h2 | **SECTION** | DESC | Fitting a Model by Hand | appendix-contents-card @1444; other @1582; other @2165 |
| `session-1:1611` | h3 | — | DESC | The size of the thing | — |
| `session-1:1634` | h2 | **SECTION** | **ACT** | A Token Is Not a Word | footer-timing-table @2156 |
| `session-1:1674` | h2 | **SECTION** | **ACT** | Words Laid Out So That Nearby Means Similar | appendix-contents-card @1445; other @1671; other @2166 |
| `session-1:1689` | h3 | — | DESC | One word, two meanings | — |
| `session-1:1702` | h2 | **SECTION** | **ACT** | The Task a Transformer Cannot Reliably Learn | appendix-contents-card @1446; other @1699; other @2167 |
| `session-1:1737` | h2 | **SECTION** | DESC | The Nine Controls Between the Model and Your Answer | appendix-contents-card @1447; other @1734; other @2168 |
| `session-1:1806` | h2 | **SECTION** | DESC | The Same Question, Asked Three Times | footer-timing-table @2157 |
| `session-1:1818` | h3 | — | **ACT** | Why it guesses instead of abstaining | — |
| `session-1:1847` | h2 | **SECTION** | DESC | Intelligence Index Plotted Against Cost per Task | footer-timing-table @2158 |
| `session-1:1882` | h2 | **SECTION** | **ACT** | What a Practice Pays in a Year | footer-timing-table @2159 |
| `session-1:1901` | h3 | — | **ACT** | What one pass over the Cole file costs | — |
| `session-1:1927` | h2 | **SECTION** | DESC | Assigning a Tier to Six Tasks From This Case | footer-timing-table @2160 |
| `session-1:1938` | h2 | **SECTION** | **ACT** | What May Never Be Entered Into a Third-Party Tool | footer-timing-table @2161 |
| `session-1:1944` | h4 | — | DESC | Nonpublic personal information | — |
| `session-1:1945` | h4 | — | **ACT** | Not identifying on its own | — |
| `session-1:1974` | h2 | **SECTION** | **ACT** | There Is No Separate AI Rulebook | appendix-contents-card @1448; other @1971; other @2169 |
| `session-1:1989` | h3 | — | **ACT** | When the output is wrong, what went wrong | — |
| `session-1:2004` | h2 | **SECTION** | **ACT** | Where Account-Level Custom Instructions Are Configured | footer-timing-table @2162 |
| `session-1:2037` | h2 | **SECTION** | DESC | Disclosure of AI Use to the Client | appendix-contents-card @1449; other @2034; other @2170 |
| `session-1:2076` | h2 | **SECTION** | **ACT** | The Baseline You Cannot Reconstruct Later | footer-timing-table @2163 |
| `session-1:2080` | h3 | — | DESC | Efficiency Baseline | — |
| `session-1:2100` | h4 | — | DESC | Three prompt templates | — |
| `session-1:2101` | h4 | — | DESC | Account-level custom instructions | — |
| `session-1:2114` | h3 | — | DESC | CFP Board principal knowledge topics touched tonight | — |
| `session-1:2137` | h4 | — | **ACT** | Fluency is not evidence | — |
| `session-1:2138` | h4 | — | **ACT** | Verification is neither optional nor automatic | — |
| `session-1:2139` | h4 | — | **ACT** | Tier selection is judgment you defend | — |
| `session-1:2140` | h4 | — | DESC | You sign the work | — |
| `session-1:2148` | h3 | — | DESC | Instructor minute budget | — |
| `session-1:2180` | h3 | — | DESC | Sources cited in this session | — |
| `session-1:2819` | h4 | — | DESC | '+m.name+' | — |
| `session-1:3105` | h4 | — | DESC | '+o.k+' \u2014 the case for it | — |
| `session-2:729` | h2 | — | DESC | The Cole Household | other @1189; other @1195 |
| `session-2:1195` | h2 | — | DESC | The Cole Household | other @729; other @1189 |
| `session-2:1234` | h1 | — | DESC | Practical AI Usage in Daily Advisory Workflows | other @6; footer-timing-table @2013 |
| `session-2:1248` | h3 | — | DESC | Retrieval bridge — Session 1 mechanism | — |
| `session-2:1256` | h3 | — | DESC | The Cole household | other @1106; other @2052 |
| `session-2:1263` | h4 | — | DESC | Meg and David Cole, Barrington Hills, Illinois | — |
| `session-2:1264` | h4 | — | DESC | CPC stock: one asset, most of the estate | — |
| `session-2:1265` | h4 | — | DESC | Non-voting LLC units moved to a grantor trust | — |
| `session-2:1266` | h4 | — | **ACT** | How much of the note does she call this year? | — |
| `session-2:1272` | h4 | — | DESC | A working model of sampling | — |
| `session-2:1273` | h4 | — | DESC | A tier-selection rule | — |
| `session-2:1274` | h4 | — | DESC | Your own prompts, scored and rewritten | — |
| `session-2:1275` | h4 | — | DESC | A citation verification routine | — |
| `session-2:1278` | h3 | — | DESC | Time budget | — |
| `session-2:1308` | h2 | **SECTION** | DESC | Appendix contents | nav-label @1306 |
| `session-2:1324` | h2 | **SECTION** | DESC | Next-Token Probabilities for a Single Prompt | appendix-contents-card @1312; other @1322; other @2024 |
| `session-2:1349` | h3 | — | **ACT** | What this rules out | — |
| `session-2:1365` | h2 | **SECTION** | DESC | Laplace on Probability as a Measure of Ignorance | appendix-contents-card @1313; other @1363; other @2025 |
| `session-2:1381` | h3 | — | DESC | The practical consequence | — |
| `session-2:1395` | h2 | **SECTION** | DESC | The Last Prompt You Sent | footer-timing-table @2014 |
| `session-2:1412` | h2 | **SECTION** | DESC | Temperature and Output Variance | footer-timing-table @2015 |
| `session-2:1440` | h3 | — | DESC | Three consequences for an advisory practice | — |
| `session-2:1442` | h4 | — | **ACT** | The prompt is not the record | — |
| `session-2:1443` | h4 | — | **ACT** | Re-asking is not verification | — |
| `session-2:1444` | h4 | — | **ACT** | Consumer chat tools do not expose T | — |
| `session-2:1462` | h2 | **SECTION** | DESC | Sampling Failure on a Task That Requires Counting | appendix-contents-card @1314; other @1460; other @2026 |
| `session-2:1485` | h3 | — | DESC | The mapping to your work | — |
| `session-2:1496` | h2 | **SECTION** | DESC | Cost Per Task Versus Cost Per Token | footer-timing-table @2016 |
| `session-2:1513` | h3 | — | DESC | Three findings a price sheet hides | — |
| `session-2:1515` | h4 | — | DESC | Token price gap, Sonnet 5 against Fable 5 | — |
| `session-2:1516` | h4 | — | DESC | Actual gap in cost per finished task | — |
| `session-2:1517` | h4 | — | DESC | Opus 5's cost advantage over Fable 5 | — |
| `session-2:1555` | h2 | **SECTION** | DESC | Persona, Task, Context, Format | footer-timing-table @2017 |
| `session-2:1574` | h3 | — | **ACT** | What the evidence says about Persona | — |
| `session-2:1584` | h3 | — | **ACT** | Where the effort should go instead | — |
| `session-2:1613` | h2 | **SECTION** | DESC | Scoring Your Own Prompts Against P.T.C.F | footer-timing-table @2018 |
| `session-2:1645` | h3 | — | DESC | Rewrite the weakest of the three | — |
| `session-2:1675` | h2 | **SECTION** | DESC | Prompt Specification Triage | footer-timing-table @2019 |
| `session-2:1679` | h4 | — | DESC | Underspecified | JS-string @2457; JS-string @2503 |
| `session-2:1680` | h4 | — | DESC | Specified, unverifiable | JS-string @2457 |
| `session-2:1681` | h4 | — | DESC | Specified and verifiable | JS-string @2457 |
| `session-2:1699` | h2 | **SECTION** | DESC | The Interview Rewrite | footer-timing-table @2020 |
| `session-2:1711` | h3 | — | DESC | The Cole Buy-Sell Agreement | — |
| `session-2:1722` | h3 | — | DESC | Specification Diagnosis on Your Own Prompt | — |
| `session-2:1755` | h2 | **SECTION** | DESC | The Seven-Step Process and the Delegation Line | appendix-contents-card @1315; other @1753; other @2027 |
| `session-2:1777` | h3 | — | **ACT** | Why steps 2 and 4 sit apart | — |
| `session-2:1788` | h2 | **SECTION** | DESC | Citation Failure Types on the Cole IDGT Transaction | footer-timing-table @2021 |
| `session-2:1807` | h3 | — | DESC | Four failure types, in ascending order of danger | — |
| `session-2:1810` | h4 | — | DESC | Fabrication | — |
| `session-2:1811` | h4 | — | DESC | Misgrounding | — |
| `session-2:1812` | h4 | — | DESC | Superseded | — |
| `session-2:1813` | h4 | — | **ACT** | Cited as holding, never decided | JS-string @2648 |
| `session-2:1822` | h3 | — | DESC | The verification order | — |
| `session-2:1825` | h4 | — | **ACT** | Does the authority exist | — |
| `session-2:1826` | h4 | — | **ACT** | Does it say what the sentence claims | — |
| `session-2:1827` | h4 | — | **ACT** | Is it still operative | — |
| `session-2:1828` | h4 | — | **ACT** | Does it reach these facts | — |
| `session-2:1845` | h2 | **SECTION** | DESC | Template Audit and Structured Peer Review | footer-timing-table @2022 |
| `session-2:1850` | h3 | — | DESC | Part one — self-audit | — |
| `session-2:1863` | h3 | — | DESC | Part two — structured peer review | — |
| `session-2:1886` | h2 | **SECTION** | DESC | Specification Cost Against Task Cost | appendix-contents-card @1316; other @1884; other @2028 |
| `session-2:1891` | h3 | — | DESC | Phase one — position, 3 minutes | — |
| `session-2:1901` | h3 | — | DESC | Phase two — defence, 8 minutes | — |
| `session-2:1913` | h3 | — | DESC | Phase three — complication, 5 minutes | — |
| `session-2:1916` | h4 | — | **ACT** | The verification time is not optional and it is not amortised | — |
| `session-2:1917` | h4 | — | DESC | §09 arithmetic | — |
| `session-2:1918` | h4 | — | DESC | Appendix B4 adoption gap | — |
| `session-2:1921` | h3 | — | DESC | Phase four — re-vote, 3 minutes | — |
| `session-2:1947` | h2 | **SECTION** | DESC | Final Project Part 1 and Baseline Capture | footer-timing-table @2023 |
| `session-2:1951` | h4 | — | DESC | A scalable AI-enabled workflow for a recurring task in your own practice | — |
| `session-2:1952` | h4 | — | DESC | A single email, body reading only “See attached” | — |
| `session-2:1953` | h4 | — | DESC | Transcript to instructor only. No client data anywhere. | — |
| `session-2:1976` | h3 | — | DESC | Part 1 deliverable checklist | — |
| `session-2:1984` | h3 | — | DESC | The First Draft | — |
| `session-2:1992` | h3 | — | **ACT** | What Session 3 does that this session could not | — |
| `session-2:2008` | h3 | — | DESC | Instructor minute budget | — |
| `session-2:2036` | h4 | — | DESC | Sources | other @1774; other @1797 |
| `session-3:697` | h2 | — | DESC | The Cole Household | other @1157; other @1163 |
| `session-3:1163` | h2 | — | DESC | The Cole Household | other @697; other @1157 |
| `session-3:1201` | h1 | — | DESC | Gathering and Documenting Client Information | other @6; footer-timing-table @1792 |
| `session-3:1219` | h4 | — | DESC | Session 2 recall: the citation-verification order | — |
| `session-3:1229` | h4 | — | DESC | The Cole household | other @1074; other @1350; other @1828; other @1839 |
| `session-3:1245` | h2 | **SECTION** | DESC | Appendix contents | nav-label @1243 |
| `session-3:1260` | h2 | **SECTION** | DESC | The Last Prompt You Sent | footer-timing-table @1793 |
| `session-3:1277` | h2 | **SECTION** | DESC | Embeddings and the Coordinates of Meaning Space | footer-timing-table @1794 |
| `session-3:1287` | h4 | — | DESC | The Meaning Map | — |
| `session-3:1302` | h2 | **SECTION** | DESC | Distributional Similarity and Referential Difference | footer-timing-table @1795 |
| `session-3:1312` | h4 | — | DESC | Pair Sort: Distributional Similarity Against Reference | — |
| `session-3:1330` | h2 | **SECTION** | DESC | Retrieval Mechanics: Chunking, Indexing, and Ranking | footer-timing-table @1796 |
| `session-3:1340` | h4 | — | DESC | The Retriever on the Cole Document Set | — |
| `session-3:1361` | h2 | **SECTION** | DESC | Chunk Size and Condition Orphaning | appendix-contents-card @1249; other @1359; other @1805 |
| `session-3:1371` | h4 | — | DESC | Re-chunk Article VII | — |
| `session-3:1390` | h2 | **SECTION** | DESC | Hybrid Search and the Re-ranking Pass | appendix-contents-card @1250; other @1388; other @1806 |
| `session-3:1398` | h4 | — | DESC | Stage-by-Stage Effect on the Failure Rate | — |
| `session-3:1415` | h2 | **SECTION** | DESC | Measured Retrieval Failure Rates | footer-timing-table @1797 |
| `session-3:1427` | h4 | — | DESC | Grounded-Answer Prediction and Your Own Failure Count | — |
| `session-3:1450` | h2 | **SECTION** | DESC | Measured Hallucination Rates Under Grounding | footer-timing-table @1798 |
| `session-3:1466` | h4 | — | DESC | Conditions and the Measured Hallucination Band | — |
| `session-3:1486` | h2 | **SECTION** | DESC | Grounding Compared With Fine-Tuning | appendix-contents-card @1251; other @1484; other @1807 |
| `session-3:1496` | h4 | — | DESC | Ranking by Cost of a Change | — |
| `session-3:1510` | h2 | **SECTION** | DESC | The Advisor Meeting Workflow and Its Failure Propagation | footer-timing-table @1799 |
| `session-3:1518` | h4 | — | DESC | Failure Injection into Meg's Annual Review | — |
| `session-3:1532` | h2 | **SECTION** | **ACT** | Note-Taker Architecture and the Extraction Step | footer-timing-table @1800 |
| `session-3:1542` | h4 | — | **ACT** | Note Writing and the Extraction Score | — |
| `session-3:1567` | h2 | **SECTION** | **ACT** | Note-Taker Adoption Against Note-Taker Satisfaction | appendix-contents-card @1252; other @1565; other @1808 |
| `session-3:1575` | h4 | — | DESC | Prediction, Then Reveal | — |
| `session-3:1592` | h2 | **SECTION** | DESC | Recording Consent and the Confidentiality Obligation | footer-timing-table @1801 |
| `session-3:1618` | h4 | — | DESC | Three-way sort: what goes into the tool | — |
| `session-3:1632` | h2 | **SECTION** | DESC | Documenting the Basis for a Recommendation | footer-timing-table @1802 |
| `session-3:1642` | h4 | — | DESC | Part A: the decision · Part B: the evidence | — |
| `session-3:1696` | h2 | **SECTION** | DESC | The AI Usage Policy Assignment | footer-timing-table @1803 |
| `session-3:1704` | h4 | — | DESC | Your Citation Set for the Policy Assignment | — |
| `session-3:1721` | h2 | **SECTION** | DESC | Citation-Backed Output and Verification Effort | appendix-contents-card @1253; other @1719; other @1809 |
| `session-3:1731` | h4 | — | DESC | Vote one | other @1734; JS-string @2623; JS-string @2638; JS-string @2645 |
| `session-3:1748` | h2 | **SECTION** | DESC | Part 1 Draft Peer Exchange | footer-timing-table @1804 |
| `session-3:1756` | h4 | — | DESC | Peer exchange on the draft outlines | — |
| `session-3:1767` | h4 | — | DESC | AI usage policy for your firm | other @1698 |
| `session-3:1768` | h4 | — | DESC | Final Project Part 1 — handoff package | — |
| `session-3:1769` | h4 | — | DESC | Daly (2026) · SEC FY2026 Exam Priorities §VII · Journal of Accountancy (2025) | — |
| `session-3:1787` | h3 | — | DESC | Instructor minute budget | — |
| `session-3:1817` | h4 | — | DESC | Sources cited in this session | — |
| `session-3:2003` | h4 | — | DESC | '+esc(bk.t)+' | JS-string @2532 |
| `session-3:2532` | h4 | — | DESC | '+esc(bk.t)+' | JS-string @2003 |
| `session-4:716` | h2 | — | DESC | The Cole Household | other @1176; other @1182 |
| `session-4:1182` | h2 | — | DESC | The Cole Household | other @716; other @1176 |
| `session-4:1220` | h1 | — | DESC | Compliance, Security and Responsible Use | other @6; footer-timing-table @1987 |
| `session-4:1236` | h3 | — | DESC | Retrieval bridge — Session 3 | — |
| `session-4:1241` | h3 | — | DESC | The case, one more time | — |
| `session-4:1243` | h4 | — | DESC | The Cole household — synthetic, Barrington Hills and Rockford, Illinois | — |
| `session-4:1252` | h4 | — | **ACT** | The question that runs through every session | other @1036 |
| `session-4:1259` | h4 | — | DESC | A field-level disclosure boundary | — |
| `session-4:1260` | h4 | — | DESC | A defensible vendor decision | — |
| `session-4:1261` | h4 | — | DESC | A priced verification burden | — |
| `session-4:1273` | h2 | **SECTION** | DESC | Appendix contents | nav-label @1271 |
| `session-4:1288` | h2 | **SECTION** | DESC | The Last Prompt You Sent | footer-timing-table @1988 |
| `session-4:1305` | h2 | **SECTION** | DESC | The Absence of an AI Rulebook and the Duties That Apply Instead | footer-timing-table @1989 |
| `session-4:1314` | h3 | — | DESC | Sorting exercise | — |
| `session-4:1320` | h4 | — | DESC | Binding rule that names AI | — |
| `session-4:1321` | h4 | — | DESC | Pre-existing duty applied to AI | — |
| `session-4:1322` | h4 | — | **ACT** | Supervisory expectation, not a rule | — |
| `session-4:1336` | h2 | **SECTION** | DESC | Nonpublic Personal Information Under Regulation S-P | footer-timing-table @1990 |
| `session-4:1342` | h4 | — | **ACT** | PII and NPI are not the same term | — |
| `session-4:1378` | h2 | **SECTION** | DESC | The Thirty-Day Clock: A Regulation S-P Tabletop | appendix-contents-card @1277; other @1376; other @2000 |
| `session-4:1386` | h4 | — | DESC | The Event That Started the Clock | — |
| `session-4:1401` | h2 | **SECTION** | DESC | Consumer, Professional and Enterprise Tiers: What Changes in the Contract | footer-timing-table @1991 |
| `session-4:1421` | h3 | — | **ACT** | The leaderboard and the contract are different maps | — |
| `session-4:1437` | h3 | — | DESC | Sticker Rank Against Cost-per-Task Rank | — |
| `session-4:1457` | h2 | **SECTION** | DESC | Vendor Due Diligence Against the Cole Document Set | footer-timing-table @1992 |
| `session-4:1463` | h4 | — | DESC | Step one — what goes in | — |
| `session-4:1470` | h4 | — | DESC | Step two — the six questions | — |
| `session-4:1486` | h2 | **SECTION** | DESC | Prompt Injection, Data Exfiltration, Deepfakes and Model-Assisted Malware | footer-timing-table @1993 |
| `session-4:1502` | h3 | — | DESC | A Standing Instruction That Survives Injection | — |
| `session-4:1513` | h3 | — | DESC | Deepfakes: one hard number and a pile of soft ones | — |
| `session-4:1535` | h2 | **SECTION** | DESC | Content Provenance and the SynthID Watermark | appendix-contents-card @1278; other @1533; other @2001 |
| `session-4:1541` | h4 | — | DESC | A correction to the common framing | — |
| `session-4:1545` | h3 | — | DESC | The asymmetry that governs everything else | — |
| `session-4:1550` | h3 | — | DESC | Text: tournament sampling | — |
| `session-4:1554` | h4 | — | DESC | Tournament sampling, one token | — |
| `session-4:1568` | h3 | — | DESC | Images and video: perturbation below the perceptual floor | — |
| `session-4:1572` | h4 | — | DESC | Perturbation amplifier | JS-string @2922 |
| `session-4:1582` | h3 | — | **ACT** | Audio: hiding in the frequencies you cannot hear | — |
| `session-4:1585` | h3 | — | **ACT** | Scale: a figure worth not repeating | — |
| `session-4:1599` | h2 | **SECTION** | DESC | Entropy, Regeneration and the Limits of Watermarking | appendix-contents-card @1279; other @1597; other @2002 |
| `session-4:1604` | h3 | — | DESC | The advisor's inversion | — |
| `session-4:1608` | h4 | — | DESC | Entropy and watermarkability by output type | — |
| `session-4:1612` | h4 | — | DESC | High entropy — watermarks well | — |
| `session-4:1613` | h4 | — | DESC | Low entropy — watermarks poorly | — |
| `session-4:1621` | h3 | — | DESC | Regeneration | appendix-contents-card @1279; other @1597; other @1599; other @2002 |
| `session-4:1628` | h3 | — | **ACT** | What a signal licenses you to conclude | — |
| `session-4:1647` | h2 | **SECTION** | **ACT** | Where the Leaks Happen: Logs, Caches, Connectors and Features Nobody Turned Off | footer-timing-table @1994 |
| `session-4:1653` | h4 | — | DESC | Annual exposure-event estimator | — |
| `session-4:1669` | h2 | **SECTION** | DESC | Hallucination Rates and the Verification Burden | footer-timing-table @1995 |
| `session-4:1684` | h4 | — | **ACT** | A measurement you cannot put on the same axis | — |
| `session-4:1688` | h3 | — | **ACT** | The arithmetic of not checking | — |
| `session-4:1710` | h3 | — | DESC | Pricing it against your own baseline | — |
| `session-4:1730` | h2 | **SECTION** | **ACT** | Where the Assigned Reading Has Gone Stale | appendix-contents-card @1280; other @1728; other @2003 |
| `session-4:1734` | h3 | — | **ACT** | Where the hallucination rate comes from, in one mechanism | — |
| `session-4:1737` | h3 | — | DESC | Commit first | — |
| `session-4:1743` | h3 | — | **ACT** | Three claims that have gone stale | — |
| `session-4:1762` | h2 | **SECTION** | DESC | Audit Trails for the Artifacts You Already Built | footer-timing-table @1996 |
| `session-4:1781` | h4 | — | DESC | Fallback artifacts — if you missed Session 2 or Session 3 | — |
| `session-4:1811` | h3 | — | DESC | Classification exercise | — |
| `session-4:1818` | h3 | — | DESC | A prompt block that produces the record | — |
| `session-4:1848` | h2 | **SECTION** | DESC | Part 1 Relay and the Part 2 Pairing Draw | footer-timing-table @1997 |
| `session-4:1863` | h3 | — | DESC | Package Completeness Before the Draw | — |
| `session-4:1884` | h2 | **SECTION** | **ACT** | Cold First Run of the Package You Were Just Assigned | footer-timing-table @1998 |
| `session-4:1892` | h4 | — | DESC | Stuck log | — |
| `session-4:1912` | h2 | **SECTION** | **ACT** | Discussion: Whether the Logging Burden Costs More Than the Tool Saves | appendix-contents-card @1281; other @1910; other @2004 |
| `session-4:1918` | h4 | — | DESC | Phase 1 — commit, 3 minutes | — |
| `session-4:1935` | h4 | — | DESC | Phase 4 — re-vote | — |
| `session-4:1950` | h2 | **SECTION** | DESC | Homework: The Firm Artificial Intelligence Use Policy | footer-timing-table @1999 |
| `session-4:1964` | h3 | — | **ACT** | Peer review, not tonight | — |
| `session-4:1982` | h3 | — | DESC | Instructor minute budget | — |
| `session-4:2012` | h3 | — | DESC | Sources | other @1419; other @1626 |
| `session-4:2349` | h4 | — | DESC | '+esc(v.q)+' weight '+v.w+' | — |
| `session-4:3170` | h4 | — | DESC | '+esc(v.q)+' | JS-string @2349 |

#### session-0.1 — EXCLUDED from every purge bucket (DW-057), counted here per constraint 4 (26 titles)

| file:line | tag | section title? | class | title | machine-read by |
|---|---|---|---|---|---|
| `session-0.1:555` | h2 | — | DESC | Cole household | JS-string @548; other @581; other @627; other @640; other @932; other @1081; other @1205; other @1360; other @1763; other @2132 |
| `session-0.1:1021` | h2 | — | DESC | The Cole Household | other @1015 |
| `session-0.1:1126` | h1 | — | DESC | The Control Surface | other @6; other @1762 |
| `session-0.1:1171` | h2 | **SECTION** | DESC | The last prompt you sent | — |
| `session-0.1:1196` | h2 | **SECTION** | DESC | One inference, five layers | footer-timing-table @1153; other @1189 |
| `session-0.1:1211` | h3 | — | **ACT** | Commit before the content runs | other @1215; JS-string @2179 |
| `session-0.1:1220` | h3 | — | DESC | The five layers | — |
| `session-0.1:1244` | h2 | **SECTION** | DESC | Four models, on the numbers | footer-timing-table @1154; other @1236 |
| `session-0.1:1264` | h3 | — | DESC | Five tasks. Pick the model, commit, then read why | — |
| `session-0.1:1287` | h2 | **SECTION** | DESC | Two dials people conflate: effort and thinking | footer-timing-table @1155; other @1276 |
| `session-0.1:1345` | h2 | **SECTION** | DESC | The context window inspector | footer-timing-table @1156; other @1319 |
| `session-0.1:1411` | h2 | **SECTION** | DESC | The retrieval ladder: nothing, search, research | footer-timing-table @1157 |
| `session-0.1:1421` | h3 | — | DESC | The four rungs | — |
| `session-0.1:1456` | h2 | **SECTION** | **ACT** | What persists, and what dies with the tab | footer-timing-table @1158; other @1441 |
| `session-0.1:1468` | h4 | — | DESC | Survives this chat | — |
| `session-0.1:1469` | h4 | — | DESC | Dies with this chat | — |
| `session-0.1:1496` | h2 | **SECTION** | DESC | Skills, connectors, plugins: three things people call the same thing | — |
| `session-0.1:1518` | h3 | — | DESC | Surfaces beyond the chat box | — |
| `session-0.1:1521` | h3 | — | DESC | Beta and research preview, as of 2026-07-07 | — |
| `session-0.1:1543` | h2 | **SECTION** | DESC | Live: one prompt, three configurations | footer-timing-table @1160; other @1530 |
| `session-0.1:1596` | h3 | — | DESC | The Documentation Card | — |
| `session-0.1:1621` | h2 | **SECTION** | DESC | Inferring the Configuration From the Output | — |
| `session-0.1:1655` | h2 | **SECTION** | **ACT** | Which Controls a Firm Turns Off | — |
| `session-0.1:1727` | h2 | **SECTION** | DESC | Baseline capture, and what 0.2 answers | — |
| `session-0.1:1748` | h3 | — | **ACT** | The question that is still open | — |
| `session-0.1:3068` | h4 | — | DESC | '+o.k+', the case for it | — |
---

# PART 7 — the four interactions, read from the code

## 7.0 Section-number mapping, stated first

The brief's labels and the page's eyebrows differ by one at the top of the file.
Resolved by content, not by number:

| brief says | page eyebrow | `id` | markup | handler |
|---|---|---|---|---|
| §00 cold-open prompt capture | `01 · Cold open · standing ritual` | `sCold` | `1454–1472` | `3145–3168` |
| §01 work-along free-text gate | the lede section, `data-nav="Start"`, eyebrow `BUS ADM X433.4 · Session 1` | `s1` | `1398–1436` | `2413` |
| §07 tier-assignment items | `07 · Judgment` | `s12` | `1924–1934` | `2947–2975` |
| §08 sort | `08 · The line` | `s13` | `1935–1969` | `2976–2998` |

## 7.1 (a) §00 cold-open prompt capture — what it validates

`session-1:3145-3168`, the block commented *"family 17: cold-open ritual —
identical in every session."*

**It validates exactly one thing: that the trimmed value is not the empty
string.**

```js
var t = box.value.trim();
if (!t) { out.innerHTML = '<span class="rnil">Paste something first.</span>'; return }
```

After that gate, everything is unconditional:

| computed | from |
|---|---|
| words | `(t.match(/\S+/g)||[]).length` |
| characters | `t.length` |
| "roughly N tokens" | `Math.round(chars/4)` — a fixed 4‑chars‑per‑token constant |
| imperative / question / statement | `/^(write\|make\|give\|list\|draft\|summari[sz]e\|explain\|create\|find\|tell\|help)/i` |
| "a role or framing" | `/\b(you are\|act as\|as an?\|expert\|advisor\|planner)\b/i` |
| "an output format" | `/\b(bullet\|table\|word\|paragraph\|format\|list\|tone\|concise\|short\|long)\b/i` |
| "substantial context" | **`t.length > 180`** — length alone |

**What turns it green:** `out.className = 'rout on'` is set on the line after the
empty check, then `mark('gc')`. There is no second condition. **A single
character turns the panel green and ticks the work-along gate.** `x` produces
*"1 words · 1 characters · roughly 0 tokens. It is a statement. It carries none
of the usual scaffolding. It supplies no role or framing, no output format, no
context beyond the ask."* — and a ✓.

`mark()` is documented non-gating at `session-1:2372`: *"Marks a work-along cue
complete for feedback only; nothing is withheld."*

## 7.2 (b) §01 work-along free-text gate — and the answer to "does ANY non-empty input pass?"

`session-1:1432` is the input; `session-1:2413` is the whole handler:

```js
(function(){ var f=$('s1field');
  if(f) f.addEventListener('input', function(){ if(f.value.trim().length>8) mark('g1') }) })();
```

**No. Nine characters, not one.** The threshold is `trim().length > 8`.
That is the only condition — content is never inspected, and the prompt
(*"Name the one figure in this case you would refuse to accept without
re-verification, and say why"*) is not tested against anything. `aaaaaaaaa`
passes; `AFR` (3 chars, and a correct answer) does not.

**So the two gates disagree with each other.** §00 passes on 1 character; §01
requires 9. Neither looks at content. If the next turn touches one threshold it
should decide the other in the same pass, because they are the same construct
with two different numbers and no stated reason for either.

## 7.3 (c) §07 tier-assignment items — where the key lives and what it says

**The answer key is the `a:` field of the `TQ` array, `session-1:2948-2960`.**
The label map is `session-1:2961`:

```js
var TLABEL = ['Haiku-class', 'Sonnet-class', 'Opus / Fable-class'];   // index 0,1,2
```

Scoring is `session-1:2971`: `var ok = +b.dataset.j === q.a`. Commit-first, one
attempt — `if(it.classList.contains('done')) return`.

### The two items asked for

| item | line | domain label | `a:` | **keyed answer** |
|---|---|---|---|---|
| **concentration table** — *"From the brokerage export, compute the concentration of the three technology names that make up 62% of the $2,500,000 taxable account, and format the result as a one-page allocation table."* | `session-1:2949` | Investment Planning | **`a:0`** | **Haiku‑class** — the cheapest tier |
| **client email** — *"Draft the confirmation email and agenda for next week's meeting with Meg and David."* | `session-1:2951` | General Principles | **`a:0`** | **Haiku‑class** |

Both key to index 0. The right-answer feedback for the concentration item is
*"Correct. High volume, zero judgment, and the arithmetic is checkable at a
glance"*; the wrong-answer feedback is *"This works and you are paying five to
ten times what the task needs."* For the email item: *"Correct. Templated,
low-stakes, and you read it before it sends"* against *"Overspecified."*

The other four for completeness: meeting summary `:2953` `a:1` (Sonnet‑class),
two distribution clocks `:2955` `a:2`, note terms and rate `:2957` `a:2`,
buy‑sell reconciliation `:2959` `a:2`.

**One thing to know before editing either.** The concentration item and its two
feedback strings interpolate `COLE.techPct`, `COLE.brokerage` and
`COLE.techPositions` **three times each**. Retyping any of those numbers into
the prose removes the guard that `COLEv()` exists to provide.

## 7.4 (d) §08 sort — **never bound. It is a click-to-classify labelled a sorter.**

*This is the finding that decides whether Pass 5 is a bug fix or a rebuild.*

### The evidence, in order

**1. There is no drag API anywhere in the file.**

```
grep -c "draggable|dragstart|dragover|dragend|dataTransfer|ondrop"  session-1/index.html
→ 0
```

Zero, across all 3,273 lines. Not broken handlers — **no handlers ever written.**

**2. The chips are rendered as buttons, not as draggable nodes** (`session-1:2988`):

```js
host.innerHTML = NPI.map(function(d,i){
  return '<button class="chip" data-i="'+i+'">'+d.t+'</button>' }).join('');
```

**3. The only handler is a click** (`session-1:2990-2997`), and it moves nothing:

```js
all('.chip',host).forEach(function(c){ c.onclick = function(){
  all('.chip',host).forEach(function(x){ x.classList.toggle('act', x===c) });
  c.classList.add('solved'); solved[c.dataset.i] = 1;
  var d = NPI[+c.dataset.i];
  boxes.forEach(function(b,i){ b.classList.toggle('lit', i === d.b) });   // ← lights the ANSWER
  $('whyNpi').textContent = d.b===0 ? d.w : '';
  $('whySafe').textContent = d.b===1 ? d.w : '';
  var n = Object.keys(solved).length; $('npiScore').textContent = n+' / 8';
  if(n>=8) mark('g13') }});
```

**No DOM re-parenting occurs.** Nothing appends a chip into an `.lbox`. The boxes
only receive a `lit` class and a paragraph of text.

**4. The CSS agrees.** `session-1:380-392` gives `.chip` a `cursor:pointer` and
three states — `:hover`, `.act`, `.solved`. There is no drop-target styling and
no `.dragging` state. The component was **designed** as a click surface.

### The verdict, and the second half of it

**The items cannot be moved because moving them was never implemented.** Drag
handlers were never bound; nothing is failing. → **Pass 5 is a rebuild, not a
bug fix.**

But a rebuild that only adds drag would ship a different defect, and this is the
part worth deciding before writing code:

> **The learner never chooses a bucket.** Clicking a chip reveals `d.b`, its own
> keyed answer, and lights that box. `npiScore` counts **chips clicked**, not
> chips correctly sorted. **It is impossible to get it wrong**, and `mark('g13')`
> fires at 8 clicks regardless.

The prose above it (`session-1:1939`) says *"Three of these eight are the
confidentiality landmines this case was built to carry. **Sort all eight and find
them.**"* and the gate (`:1967`) says *"Sort all eight, then name which of the
three landmines would be hardest to notice yourself mid-draft."* **Neither task
is implemented.** The page reveals what the student was asked to determine.

So the rebuild has two halves: (i) make the items movable, and (ii) **withhold
`d.b` until commitment**, which is what the surrounding `commit-first-mcq`
components already do (`session-1:2971`). Half (ii) is the pedagogy; half (i) is
the affordance.

### Two arithmetic notes for whoever rebuilds it

* **`NPI` has 4 items keyed `b:0` and 4 keyed `b:1`**, not 3 and 5. The *"three
  landmines"* claim is reconciled inside the third item's own rationale — *"It is
  not one of the three landmines … it is a fourth, and it comes from the
  regulation rather than from the file."* Internally consistent, but a reader
  counting boxes gets 4 and the sentence says 3.
* **`0 / 8` and `n / 8` hard-code the 8.** Adding or removing an item silently
  desynchronises the denominator at `session-1:1948` and `:2996`.

---

# PART 8 — number provenance in `session-1` §02, §03, §08

Two routes exist. **Case-derived** means the figure is interpolated at render
time from the `COLE` constant, which `scripts/inject-case.mjs` generates from
`scripts/case-facts.json` from `CASE.md`. **Hand-authored** means the digits are
typed into the page and nothing checks them.

The guard the corpus provides is `COLEv()` at `session-1:1179`, which **throws**
on an unknown key rather than rendering `undefined`. A hand-typed figure gets no
guard at all.

**Across the whole of `session-1`, `COLE` is interpolated at only six sites:**
`:2418`, `:2420`, `:2752`, `:2949`, `:2950`, `:2955`, `:2959`. **Two of them are
in §02. Neither §03 nor §08 has any.**

## 8.1 §02 — `s2`, markup `1473–1526`, JS `2416–2500`

### Case-derived (4 figures, 4 render sites)

| rendered | source key | site |
|---|---|---|
| `520` non-voting units | `COLE.saleUnits` | `:2418` |
| `30%` discount | `COLE.discount` | `:2420` |
| `$20,020,000` | `COLE.notePrincipal` | `:2420` |
| `$38,500` per unit | `COLE.perNonVoting` | `:2420` |

### Hand-authored

| rendered | site | does `CASE.md` contradict it? |
|---|---|---|
| **`a 45% discount`** (weight `.09`) | `:2420` | **YES — and by design.** `COLE.discount` is `0.30`. This is the deliberate false candidate the prose at `:1488` warns about (*"at least one produces a false one, in the same confident register"*). **But it is a hard-coded case-shaped figure sitting beside three interpolated ones.** If the case discount ever changes, the true candidate moves and the distractor does not, and nothing throws |
| `a 2023 appraisal` (`.34`) | `:2422` | **No.** `COLE.appraisal2023` exists; the year agrees |
| **`the 2014 formula`** (`.08`) | `:2422` | **Cannot be checked — `CASE.md` carries no buy-sell year.** `COLE.buySellFormula` is a value with no date field. The `2014` is unguarded, and it is the subject of **DW‑012** (a 2014 instrument naming a company that took the name in 2016) |
| `since 2023.` (`.06`) | `:2425` | No |
| **30 probability weights** (6 rows × 5) | `:2420–2425` | No — `CASE.md` carries no probabilities. Labelled on the page: *"Illustrative distribution — the article's table is an image and is not reproduced"* |
| `0.8` (Wolfram's temperature) | `:1491` **R9** | No — inside an R9 assigned-reading quotation, attributed |
| `T = 0`, `T = 0.8`, `T = 1.6` | `1495–1497` | No — control values |
| `Generate 40 tokens` | `:1498` | No |
| `0 of 6` placed counter | `:1484` | No — equals `S2.length` |
| `PLN = 40` and the `1/i` law | `:2461` | No |
| axis ticks `.05`, `.02`, `.01` | `:2473` | No |

### Computed at runtime (not in the source at all)

`23.4%` and `2.3%` (`:2486`, from `PLP`), the per-candidate percentages
`(o[1]*100).toFixed(0)`, and the `Distinct tokens` / `Longest repeat` stats.
**See PART 1.3** — this is why `holds 23.4% of the mass` greps as absent.

## 8.2 §03 — `s5`, markup `1631–1669`, JS `2649–2670`

**Zero case-derived figures.** Every number is hand-authored.

| rendered | site | does `CASE.md` contradict it? |
|---|---|---|
| `About 50,000 tokens exist`, `about 3,000` whole words, token `914`, token `3542` | `:1636` **R9** | No — Wolfram-attributed, inside the assigned-reading block |
| `Discovery meeting notes (3,000 words)` → `~4,000` → `$0.02` | `:1655` | No |
| **`2011 wills and joint revocable trust`** → `~20,000` → `$0.10` | `:1656` | **No** — `COLEDOCS` D4, D5, D9, D10 all say *executed 2011* |
| **`Draft IDGT instrument, note, 2014 buy-sell and 2023 appraisal`** → `~125,000` → `$0.63` | `:1657` | **Partly.** `2023 appraisal` agrees with D3. **`2014 buy-sell` has no counterpart in `CASE.md`** — D1 and D2 state no year. Second unguarded instance of the same figure as §02, same **DW‑012** exposure |
| `Entire Cole file, full 1M context window` → `1,000,000` → `$5.00` | `:1658` | No |
| `The whole file costs five dollars to read` | `:1661` | No |
| `TIERS = [Haiku 1, Sonnet 2, Opus 5, Fable 10]` | `:2649` | No — vendor prices, agreeing with `PATHS` at `:2932` |
| `0.75 words per token` | `:1664` **R8** | No — a stated derivation |
| gate threshold `40` tokens | `:2665` | No |

**The table's arithmetic is internally correct.** At the Opus 5 input price of
$5/M: 4,000 → $0.02 ✔ · 20,000 → $0.10 ✔ · 125,000 → $0.625 ≈ $0.63 ✔ ·
1,000,000 → $5.00 ✔. Four of four re-derive.

**One soft mismatch, reported not asserted.** The sample textarea at `:1640`
says a competitor made an inquiry *"last October"*; `COLEDOCS`'s transcript has
Meg saying *"last autumn"*. Compatible, not contradictory.

## 8.3 §08 — `s13`, markup `1935–1969`, JS `2976–2998`

**Zero case-derived figures.** Every case fact in §08 is hand-authored prose
inside the `NPI` array or the surrounding paragraphs.

| rendered | site | does `CASE.md` contradict it? |
|---|---|---|
| `Three of these eight are the confidentiality landmines` | `:1939` | **No, but it does not equal the array.** `NPI` keys **4** items `b:0` and **4** `b:1`. The third item's own rationale reconciles it — *"it is a fourth, and it comes from the regulation rather than from the file."* A reader counting the boxes gets 4 |
| `0 / 8`, `n / 8` | `:1948`, `:2996` | No — matches `NPI.length`. **Both hard-code the 8** |
| *"in her sixties"* | `:1955`, `:2981` | No — `COLE.megAge` is `64` |
| *"a Midwest aerospace-fastener owner … selling the company she bought from her father"* | `:2981` | No — `companyState: Illinois`, `plantTown: Rockford`, bought from `Walter Hensley`, `purchaseDate 1 Jul 2016` |
| *"That Meg is exploring a sale of CPC"* / *"Nathan works in CPC operations and has not been told"* | `:2978` | No — the transcript in `COLEDOCS` carries both |
| *"The applicable federal rate for a mid-term note this month"* | `:2983` | No **figure** is printed. `COLE.afrMid` = `0.0435` exists and is deliberately not shown |
| *"The current federal estate and gift tax exclusion amount"* | `:2985` | No figure printed. `COLE.fedExclusion` = `15000000` exists and is deliberately not shown |

**The finding for §08 is the absence, not a contradiction.** Every case fact in
the section is retyped rather than interpolated, so the whole section sits
outside the `COLEv()` guard. That is not currently *wrong* — I checked each
against `CASE.md` and each agrees — but it is eight strings that will drift
silently, and `scripts/case-inventory.mjs` is the tool that already exists to
count exactly this. §08 is a rebuild target for PART 7(d) anyway; interpolating
the two figures the array declines to print is not proposed, since withholding
them looks deliberate.

---

# PART 9 — A9 `authoredProse` em-dash count at HEAD, against the baseline

Measured by calling the repo's own `authoredProse(classify(file))` —
`mask(R1, R8, R9)` — and counting `—` (literal) and `&mdash;`/`&#8212;`/`&#x2014;`
(entity) in the masked text. This is the same population `scripts/verify-editorial.mjs`
A9 uses and the one `test-editorial-regions.mjs` **T7** proves.

| file | literal HEAD / baseline | entity HEAD / baseline | total HEAD / baseline | delta |
|---|---|---|---|---|
| `session-0.1` | 0 / 0 | 3 / 3 | **3 / 3** | **0** |
| `session-1` | 1 / 1 | 76 / 76 | **77 / 77** | **0** |
| `session-2` | 2 / 2 | 64 / 64 | **66 / 66** | **0** |
| `session-3` | 86 / 86 | 12 / 12 | **98 / 98** | **0** |
| `session-4` | 1 / 1 | 82 / 82 | **83 / 83** | **0** |

**Files disagreeing with the baseline: 0.** `test-editorial-regions.mjs` T7
confirms it independently and prints the identical five pairs.

`session-0.1` is included per constraint 4 and is **labelled excluded** from
every purge bucket (DW‑057) — but note that it is **not** excluded from A9. It
carries a live ratchet at 3, and its `LMBOX`/`LMSTYLE` fences are byte-paired
with `session-1`'s.

## 9.1 What Pass 2's ratchet rows have to be written against

| | |
|---|---|
| `A9` corpus total at HEAD | **327** |
| Ratchet headroom | **0.** A9 is a *may fall, may not rise* rule and every file sits exactly on its bar |
| `A8` minority counts at HEAD | reproduced exactly (T7); `session-1` majority **entity**, minority literal **1** |
| `R11` corpus baseline | 6 distinct blocks / 0 literal / 6 entity / **6** total |

**Consequences for Pass 2, stated as constraints rather than advice:**

1. **Any newly authored sentence containing an em dash raises A9 and hard-fails
   the push.** D1 already says newly authored text uses none; the measurement is
   what makes that enforceable rather than aspirational.
2. **Any deletion that removes an em dash from `authoredProse` lowers a ratchet,
   and `MAINTAINING.md`'s STANDING RULE requires a `docs/deferred-work.md` row in
   the same commit** carrying the delta and the reason. `test-editorial-regions.mjs`
   T7 will fail until `scripts/editorial-baseline.json` moves with it, so this is
   not deferrable to a follow-up commit.
3. **Three of the strings PART 1 found carry this exposure directly.** `About
   50,000 tokens exist` is **R9** and `0.75 words per token` sits in an **R8**
   source note — both are inside `authoredProse`. `The core runs in about` ×4 is
   **R2** and is not, but it is inside a `build-appendix.mjs` generated region,
   which is a different check.
4. **`index.html` is not in the A9 population at all** (**DW‑014** — Part A's
   population is `ALL_LESSONS`, which excludes the hub). Measured anyway, for the
   record: **1 literal, 6 entity** in `authoredProse`. An edit to the hub moves
   no ratchet and is caught by nothing.

---

# PART 10 — validator exit codes at HEAD, the pre-work baseline

Run at `f975742` with the working tree clean. `git status --porcelain` was
**empty before and after every run**, verified at each step.

## 10.1 The 16-check gate — 16 of 16 exit 0

`docs/deferred-work.md` says *"The 16-check gate exits 0."* It does. This is the
set, and each was executed:

| # | check | exit |
|---|---|---|
| 1 | `node scripts/build-case.mjs` | **0** |
| 2 | `node scripts/inject-case.mjs --check` | **0** |
| 3 | `node scripts/inject-sources.mjs --check` | **0** |
| 4 | `node scripts/verify-case.mjs` | **0** |
| 5 | `node scripts/verify-sources.mjs` | **0** |
| 6 | `node scripts/verify-migration.mjs` | **0** |
| 7 | `node scripts/verify-browser.mjs` | **0** |
| 8 | `node scripts/test-case-viewer.mjs` | **0** |
| 9 | `node scripts/verify-style.mjs` | **0** |
| 10 | `node scripts/verify-editorial.mjs` | **0** |
| 11 | `node scripts/test-editorial-regions.mjs` | **0** |
| 12 | `node scripts/build-appendix.mjs --check` | **0** |
| 13 | `node scripts/build-bibliography.mjs --check` | **0** |
| 14 | `node scripts/build-unsourced.mjs --check` | **0** |
| 15 | `node scripts/case-inventory.mjs --report-check` | **0** |
| 16 | `node scripts/attest-verified.mjs` | **0** |

**`build-case.mjs` writes**, so it was executed in a throwaway `git archive`
copy of HEAD under the scratchpad, never against the working tree. It exits 0
and is byte-idempotent — `git status` in the copy was empty afterwards. The
working tree was never written to by anything in this turn.

## 10.2 Detail worth carrying forward

| check | what it printed |
|---|---|
| `verify-editorial.mjs` | **`16 rule(s) clean, 0 hard failure(s), 13 advisory`.** The 5 hard failures §13.5 recorded are gone. The 13 advisories are **A12 ×8** (`session-1:1586`, `:1618`, `:1624`, `:1722`, `:1738`, `:2107`; `session-4:1747`, `:1749`) and **A15 ×5** (the DW‑021 keys) |
| `test-editorial-regions.mjs` | 9 passed, 0 failed. T7 prints the five A9 pairs used in PART 9 |
| `verify-migration.mjs` | 15 passed, 0 failed; check 20 still pins 6 figures |
| `verify-case.mjs` | 6 of 6 lessons on `sha256 8ee7ec4a502104d8` |
| `verify-browser.mjs` | 0 failures. 14b SVG-outside-viewBox **3**, equal to the recorded baseline |
| `test-case-viewer.mjs` | 0 failures |
| `verify-sources.mjs` | 5 of 5; advisories reproduce DW‑021 and DW‑024 exactly (53 records with an `[UNVERIFIED, needs source]` field; 1 `disclose_on_page`) |
| `build-appendix.mjs --check` | `s1 core 11/69 apx 7/81 total 150` · `s2 11/69 5/81` · `s3 13/72 5/78` · `s4 13/72 5/78` |
| `attest-verified.mjs` | 59 records — 1 populated, 3 n/a, **55 EMPTY**; lock digest matches |

## 10.3 Skill-side checks — outside the 16, recorded so nothing is mistaken for damage

| check | exit | status |
|---|---|---|
| `validate_dom.js` × 6 (hub + all five lessons) | **0** each | clean |
| `restyle_sweep.py --check` | **1** | **expected and documented** — `7 current, 0 stale, 2 without fence`, the two generated fragments. §11.2 says this must not be "fixed"; `verify-style.mjs` is the repo's check and exits 0 |

## 10.4 The gate condition for the next commit

**All 16 must exit exactly as above.** Three specific ways the next turn can
break them, given what PARTS 1, 6 and 9 measured:

| edit | breaks | why |
|---|---|---|
| rewriting any section `<h2>` | `build-appendix.mjs --check` → 1 | the title is copied into `APXPANEL` and `APXBUDGET` |
| adding or removing an em dash in R1/R8/R9 | `verify-editorial.mjs` A9 → 1, then `test-editorial-regions.mjs` T7 → 1 | the ratchet has zero headroom |
| editing inside `LMBOX`/`LMSTYLE` in one lesson | the pre-push md5 pairing, and `A9b` 6→7 | DW‑048, DW‑057 — measured, not assumed |

---

# Method, and what could still be wrong

## A. How this was measured

Every region class in this file was assigned by **`scripts/editorial-regions.mjs`**,
the repository's own classifier, called on the file's raw bytes. No region was
assigned by eye. Line numbers come from the classifier's `lineAt(offset)`, so a
line number and a region class always describe the same character.

Searches were run three ways and the method is stated at each result:

* **literal substring**, byte-exact, for PART 1 and PART 3
* **merged regex spans** for PART 2, so `3 December 2025` counts once
* **`git log -S`** with before/after counts at the commit and its parent, for
  the PART 1.3 diagnostics

Helper scripts were written to the session scratchpad, **never into the
repository**.

## B. Instructions honoured, one line each

| constraint | how |
|---|---|
| MUST NOT edit any existing file | `git diff --stat` = 1 file added, 0 modified. `git status --porcelain` empty before and after every validator run |
| MUST NOT run character substitution (§10.1 MUST‑1) | none run, repo-wide or scoped. Em dashes were **counted**, never converted |
| MUST NOT read/write inside `CASE:BEGIN`/`CASE:END`, `LMBOX`/`LMSTYLE`, or `editorial-baseline.json` except as a source of counts | R6 reported as **228, count only, no content quoted**. R11 reported as counts and fence names. The baseline was read for its A8/A9/R11 figures and nothing else |
| `session-0.1` out of scope for purge buckets (DW‑057), in scope for PARTS 6 and 9, labelled | done — PART 6 §6.1 last two rows, PART 9 row 1, both labelled EXCLUDED |
| Report ABSENT rather than searching for something close | nine ABSENT verdicts in §1.2, unqualified. Diagnostics are in a **separate** table §1.3 and change no verdict |
| Counts before prose | the COUNTS FIRST block, and a count table opening each part |
| Report the fragment actually used | printed in every result table |

## C. Where this measurement could be wrong

Stated so the next turn does not inherit false confidence.

1. **The DESCRIPTIVE / ACTION split in PART 6 is a rule, not a judgement.** It
   classifies on interrogatives, imperative verbs and finite verbs. A noun-phrase
   title containing an incidental `is` classifies as ACTION. **The full string is
   printed next to every verdict** so any row can be overruled by reading it. The
   250-row table is the deliverable; the 197/53 split is a summary of it.
2. **PART 2's bucket (a) rests on a definition the corpus disputes.** The brief
   defines (a) as *a class night, a deadline, a gap*, which makes all 57 in-class
   deictics purge targets. `MAINTAINING.md`'s Kept table says the opposite. I
   classified to the brief and flagged the collision at §2.3 rather than choosing.
3. **R2 over-inclusion is one-directional and inherited.** The classifier treats
   every quoted literal inside `<script>` as student-visible, because deciding
   otherwise needs data-flow analysis it does not do. Some R2 rows here name a
   string that never renders. The error never runs the other way.
4. **PART 8's "does `CASE.md` contradict it" was checked against the generated
   `COLE` constant and `COLEDOCS`**, which are `CASE.md`'s output, not `CASE.md`
   itself. Constraint 3 forbids reading inside the injected span for any purpose
   but counting, and the generated constant sits outside it. A figure present in
   `CASE.md` prose but absent from `case-facts.json` would not be caught — the
   `2014 buy-sell` is exactly that shape, and I have reported it as
   *"cannot be checked"* rather than as *"contradicted"*.
5. **PART 7 is read from source, and the four behaviours were not executed in a
   browser.** The drag finding is the strongest of the four because it rests on
   an absence (`grep -c` for six drag APIs = 0) rather than on an inference.
   `verify-browser.mjs` independently reports *"150 buttons present (2 without an
   inline handler)"*, which is consistent with chips being buttons.
6. **PART 4's list is not closed.** Nine families were found by targeted sweeps
   over a phrase list I chose. A construct phrased in words I did not search for
   is not in it. The `.talk`-discussion population at §4.2 is the visible edge of
   that; there may be more.

## D. What the next turn should decide before editing anything

Ranked by how much other work each unblocks.

1. **Bucket (a‑2), the 57 in-class deictics** — purge or keep. It is the same
   question DW‑050 already holds open for cross-session constructs, and answering
   it once settles both. Everything else in PART 2 is untouchable.
2. **§08: rebuild scope** — affordance only, or affordance plus withholding the
   key. PART 7(d) says the second is where the pedagogy is.
3. **The two gate thresholds** (1 character vs 9 characters, neither reading
   content) — one decision, two edits.
4. **`session-3:2697` and `session-4:1264`** — the two Tier A survivors PART 5
   found. Both are mechanical once the call is made.
5. **`session-1:2178`'s `Fall 2026`** — either it joins DW‑009 or DW‑009 widens
   to name it. It is currently the only one of the three sites in no register row.

