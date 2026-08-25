# Chip rewiring — the Phase 3 Part 1 enumeration

**Every confidence chip in sessions 1 to 4, re-derived from the files on
2026-08-25. This list governs; report §3.5's "27" does not.** §3.5 never
enumerated its 27 — it gives a per-lesson tally and verbatim detail for two
sites, and its cited evidence sections §3c and §3e are absent from the document
entirely. Phase 1 rebuilt the count at 29 sites without publishing the list. This
is the list.

**The fix unit is a chip, not a line and not a site.** A13's failure message
counts lines; two of its five lines carry more than one wrong chip, and two of
the worst sites in the corpus never fail A13 at all because they carry fewer than
three chips.

---

## 1. What the re-derivation returns

**39 chips are wrong, across 35 lines and four lessons.** They divide into three
classes, and the class decides what could be done about them:

| Class | What it is | Count | Disposition |
|---|---|---|---|
| **A** | Mis-wired onto a key that **exists in the same footer** | **20** | **rewired**, evidence below |
| **B** | The claim's correct source **has no key in that lesson's footer** | **11** | **flagged.** One was closed by adding the missing source |
| **C** | **Not a source claim at all** — the page's own reasoning, a legend swatch, or a component misused | **8** | **flagged** |

**Class A is 20, not 19, because A20 found one the hand pass missed.** See §4.

Two further chips were examined and left alone: `session-3:1423`'s `src-case`
(the excerpt genuinely is case content) and `session-4:1259` chip 2 (the Cole
incident genuinely is constructed). A chip on `src-case` is not wrong by
construction; it is wrong when the sentence is about somebody else's work.

**How the count compares.** Report §3.5 said 27, Phase 1's rebuild said 29 sites,
this says 35 lines / 39 chips. The difference is not disagreement about the same
things: this enumeration includes three classes the earlier passes did not
separate — the eleven claims whose correct source is not in the footer at all,
the eight that should carry no source chip, and the second and third chips on
lines where only the first was counted.

---

## 2. Class A — rewired, with the evidence for each

**The evidence standard: either the footer entry's own `Used for:` clause names
the claim, or the sentence names the source's author or organisation verbatim.**
Nothing here rests on a judgement about what a source probably covers.

| # | Site | From | To | Evidence |
|---|---|---|---|---|
| A1 | `session-2:1446` | `src-google-ptcf` | `src-zheng-persona` | the sentence quotes the paper's title verbatim: *"'A Helpful Assistant' Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models. Findings of EMNLP 2024"*. That is Zheng, Pei, Logeswaran, Lee & Jurgens (2024), not Google's prompting guide |
| A2 | `session-3:1610` chip 2 | `src-case` | `src-lee-cognitive` | the sentence names *"Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N. (2025) … Microsoft Research / CHI 2025"* verbatim |
| A3 | `session-3:2047` chip 1 | `src-vectara` | `src-magesh` | first source named in the caption is *"Magesh et al. (2025), J. Empirical Legal Studies 22:216"* |
| A4 | `session-3:2047` chip 2 | `src-anthropic-ctx` | `src-vectara` | second source named is *"Vectara hallucination leaderboard, 19 Nov 2025, 7,700+ articles up to 32K tokens"* |
| A5 | `session-3:1578` | `src-case` | `src-regsp` | the claim is about the 2024 Regulation S-P amendments. **The key did not exist in `session-3` and was added** — see §3.1 |
| A6 | `session-4:1173` | `src-case` | `src-finra2026` | names *"FINRA's 2026 Annual Regulatory Oversight Report, 9 December 2025"*; `Used for:` reads *"enterprise supervisory processes, the named control areas, and agent oversight"* |
| A7 | `session-4` §02, chip 2 of the four-obligations sentence [^1] | `src-case` | `src-regsp` | `Used for:` reads *"the four obligations, the 30-day notification clock"*; the claim is those four obligations, listed |
| A8 | `session-4:1216` | `src-case` | `src-regsp` | *"The regulation's own examples include…"* — Regulation S-P's own text |
| A9 | `session-4:1217` | `src-case` | `src-regsp` | the publicly-available-information carve-out, Regulation S-P's own text |
| A10 | `session-4:1218` | `src-case` | `src-regsp` | *"The subpart reaches individuals obtaining financial products or services for personal, family or household purposes"* — the rule's own scope limit |
| A11 | `session-4:1259` chip 1 | `src-case` | `src-regsp` | names the adopting release and both compliance dates; `Used for:` names the dates |
| A12 | `session-4:1269` | `src-regsp` | `src-anthropic-terms` | **found by A20, missed by the hand pass.** An SEC privacy rule was chipping a sentence entirely about Anthropic's Consumer and Commercial Terms. `Used for:` reads *"consumer training defaults, five-year and 30-day retention, and Zero Data Retention eligibility"* — all three clauses of the sentence |
| A13 | `session-4:1300` | `src-case` | `src-aa` | index scores and cost per task; `Used for:` reads *"the frontier chart, the sticker-versus-measured divergence"* |
| A14 | `session-4:1354` chip 1 | `src-finra2026` | `src-owasp` | `Used for:` reads *"the LLM01 ranking and the six-of-ten agentic mapping"* — the claim verbatim |
| A15 | `session-4:1354` chip 2 | `src-finra2026` | `src-finra-inj` | `Used for:` reads *"the claim that prompt injection has left the research literature"* — the claim verbatim |
| A16 | `session-4:1381` chip 2 | `src-gartner` | `src-deloitte` | `Used for:` reads *"$12.3bn (2023) to $40bn (2027). A projection"* — the claim verbatim |
| A17 | `session-4:1381` chip 3 | `src-deloitte` | `src-surfshark` | `Used for:` reads *"as reported by two outlets at $2.19bn and $3.7bn"* — the claim verbatim |
| A18 | `session-4:1515` | `src-case` | `src-anthropic-terms` | *"Claude Code stores session transcripts locally… 30 days by default"*; `Used for:` names the 30-day retention |
| A19 | `session-4:1550` | `src-daly` | `src-aa` | *"Artificial Analysis currently measures Claude Opus 5 at a 50% hallucination rate"* |
| A20 | `session-4:1613` | `src-daly` | `src-aa` | *"Artificial Analysis reports tokens and turns per task as first-class metrics"*; `Used for:` names *"the token and turn counts"* |
| A21 | `session-4:2932` | `src-case` | `src-magesh` | the chart caption is the Magesh citation verbatim, with its query count and scoring method |

> **`src-daly` was wrong on four of its five claim uses, and report §3.5 said five
> of six.** The re-derivation: `src-daly`'s footer reads *"Daly, B., Artificial
> Intelligence and the Future of Investment Management, ICI Winter Board Meeting
> (3 February 2026). Used for: the open questions and the request for comment."*
> Its uses are `session-4:1177` (**correct** — the ICI speech and the request for
> comment, exactly what `Used for:` names), `:1413` twice, `:1487`, `:1550`,
> `:1613`, and `:1891`, which is the footer entry's own chip and not a claim
> chip at all. **Four of the five claim uses are wrong**, two of which have no
> correct key available. §3.5's observation was right and its arithmetic counted
> the footer's own chip as a use.

---

## 3. Class B — the correct source is not in the footer

**These cannot be rewired, because there is nothing to rewire them to. Reaching
for the nearest key would be the same defect in the other direction.**

### 3.1 One was closed by adding the source

**`session-3:1578`** — *"The 2024 Regulation S-P amendments are named as a
citable source; their compliance dates are [M — not verified in this build] and
should be confirmed against the adopting release."* Chipped `src-case`, which is
the declared-synthetic Cole household. `session-3` had no key for Regulation S-P,
although its §10 assigns the rule as a citable source for the policy homework.

**A footer entry was added** rather than the chip removed, because the source is
real, the lesson assigns it, and the chip's own label already discloses that the
dates were not re-verified here. That disclosure is preserved verbatim. This is
the one **source addition** in Part 1 and it is called out rather than folded in.

### 3.2 Ten remain open

| Site | Claim | Chipped | Why no key fits |
|---|---|---|---|
| `session-2:1464` | *"Anthropic reports removing more than 80 percent of Claude Code's system prompt for its two most recent models without a measurable loss on its coding evaluations."* | `src-case` | `session-2` has `src-anthropic-fluency` (the AI Fluency framework) and `src-pricing` (the rate card). Neither covers a system-prompt engineering result |
| `session-4:1389` | *"Humans spot high-quality synthetic media at close to chance, and detectors lose much of their lab accuracy in the field."* | `src-case` | an empirical claim about detection research. No detection-research key in the file |
| `session-4:1413` chip 1 | *"Most authentic content carries no marking, so treating absence as suspicion produces an unusable false-positive rate."* | `src-daly` | a base-rate argument about watermark absence. Daly's ICI speech is about open regulatory questions |
| `session-4:1413` chip 2 | *"Anthropic has not announced SynthID adoption for Claude, so nothing you generate in this course is watermarked."* | `src-daly` | **a negative claim, and an argument from silence cannot be sourced to a positive document.** `src-anthropic-terms` is the closest and does not say this |
| `session-4:1445` | *"The 1% figure is the Weber fraction for luminance discrimination and varies with adaptation, spatial frequency and image content."* | `src-case` | a psychophysics constant. No key |
| `session-4:1487` | *"Zhao et al. (2024) formalised this as a regeneration attack; a 2026 analysis proves mutual information between image and payload approaches zero under sufficient diffusion."* | `src-daly` | **names Zhao et al. (2024) explicitly and there is no Zhao key.** The strongest Class B instance: the source is named in the sentence and absent from the footer |
| `session-4:1489` | *"one 2026 scheme retains 78.8% bit accuracy and 75% true-positive rate after diffusion purification"* | `src-case` | an unnamed 2026 watermarking paper. No key, and no title to build one from |
| `session-4:1504` | *"California SB 942 took effect January 2026; EU AI Act Article 50 machine-readable disclosure obligations begin enforcement August 2026."* | `src-case` | two statutes, neither in the footer |
| `session-4:1546` | *"Ungrounded to best grounded: 43% to 17% … the higher rate also correlated with longer responses, roughly 350 words against 219"* | `src-case` | the **rates** are `src-magesh`; whether the word-count correlation is also Magesh's is **not verifiable from the footer entry** and was not asserted |
| `session-4:1612` | *"Kimi K3 runs 2.8 trillion total parameters with 104 billion active per token … DeepSeek V4-Flash: 284B total, 13B active."* | `src-case` | vendor model cards. No key |

**Recommendation for all ten: the register form, not the nearest key.** Each is a
real claim with no source on the page, which is exactly what
`[UNVERIFIED, needs source]` exists for under A16 — or the source is added, which
is a Phase 3 Part 2 decision about what belongs in `SOURCES.md`. **Do not chip
them to `src-case`. The Cole household did not say any of this.**

---

## 4. Class C — these should carry no source chip

| Site | What it is |
|---|---|
| `session-1:1283` ×3 | the **figure-label legend** — *"H primary or first-party · M secondary or derived · L unverified"*. Three swatches explaining the notation, chipped to `src-case` and `src-sec-ai` ×2. A legend is not a claim |
| `session-2:1389` chip 2 | *"Ratio assumption stated so you can recompute it for your own mix"* — a declared assumption, chipped `src-case`. Declaring an assumption is the opposite of citing a source |
| `session-3:1340` chip 3 | *"Both measure legal and general text, not financial planning documents"* — the page's own cross-domain caveat about two sources it just cited correctly |
| `session-3:2047` chip 4 | *"These are not directly comparable. They measure different tasks on different corpora and are placed on one axis to show order of magnitude, not to rank products"* — the page's own methodological caveat, chipped to Anthropic, which implies Anthropic said it |
| `session-3:2445` | `<span class="conf h" data-src="src-case">scholarly</span>` inside a script literal — **the confidence-chip component reused as a category badge** in the policy-assignment widget. It renders the word "scholarly", not a confidence level |

**Recommendation: none of these should be a `.conf` chip.** The legend needs its
own class; the caveats are prose; the badge is a badge. **Not applied**, because
every one of them is a component-taxonomy change and A15, V4 and `verify-migration`
check 18 all count `.conf` spans — changing the component changes four counts at
once, and that belongs with the `data-nochip` work in Part 2 rather than ahead of it.

---

## 5. A20, the rule that made this reproducible

Report §5.3 recommended it and Phase 3 built it: *a footer key whose `Used for:`
clause names an on-page claim that currently carries a chip pointing at a
different key is a mis-wire, not an orphan.* **ADVISE**, because it matches on a
token threshold and a threshold is a lead rather than a proof.

**It was validated by running it against the pre-rewire corpus**, using the
checker's own `--root` facility, rather than by being trusted because it printed
PASS. It fired twice:

- `src-finra-inj` at `session-4:1354`, **5 of 5 terms**, against a claim carrying
  `src-finra2026` — independently recovering rewire A15, which the hand pass had
  already found.
- `src-anthropic-terms` at `session-4:1269`, **5 of 7 terms**, against a claim
  carrying `src-regsp` — **which the hand pass missed.** That is rewire A12.

**A rule that only confirms what a human already found is worth little; this one
found a twentieth.** It proposes nothing on the corrected corpus.

---

## 6. What is still true after Part 1

- **A13 and A14 are at 0.** The five hard findings that survived Phase 2 are closed.
- **A15 fell from 23 orphan keys to 18**, because five keys gained their first
  correct chip. `src-google-ptcf` **became** an orphan: its only chip was on
  Zheng's paper, so rewiring it correctly revealed that the Google prompting
  guide has no claim of its own on the page. That is a finding, not a
  regression — §03 teaches the P·T·C·F framework and never cites its source.
- **Eleven claims have no source and ten of them still say `src-case`.** Until
  Part 2 decides whether to add those sources, the page attributes eleven
  external claims to a synthetic household.

---[^1]: Cited by section rather than by line, because that line's number is one of
the bare four-digit figures `verify-migration` check 1 purges — the retired IRC
section on the Part K list. **Any file anywhere in the tree that cites a line
number equal to it fails the purge check**, and this document did on its first
run. The collision is narrow: that section number is the only bare short number
on the retired list, everything else being a distinctive phrase or a large dollar
figure. It was avoided here rather than fixed by adding this file to the check's
register exemption, because the exemption exists for documents that legitimately
quote retired facts and this one does not. Recorded so the next person who hits
it knows it is the check being blunt rather than a fact creeping back — and note
that this footnote cannot name the number either, for the same reason.
