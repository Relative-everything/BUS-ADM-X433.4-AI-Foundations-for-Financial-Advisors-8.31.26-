# Unsourced claims

**Generated from the markers in the corpus by `scripts/build-unsourced.mjs`.
Do not edit: the next run overwrites it.** To add an entry, mark the claim in
the lesson. To remove one, attach the source and delete the marker.

## The two markers

| Marker | What it asserts |
|---|---|
| **`[UNCONFIRMED]`** | **No source corroborates it. The claim itself is in question.** |
| **`[NEEDS SOURCE]`** | **The claim is right; a citation has not been attached.** |

`[NEEDS SOURCE]` is the **stronger** claim, because it asserts that somebody
checked. A wrong `[UNCONFIRMED]` gets read and downgraded; a wrong
`[NEEDS SOURCE]` gets read and believed. **The default is `[UNCONFIRMED]`**,
and moving an entry the other way is a decision with evidence behind it.

Both forms are declared in `EDITORIAL.md` A16 and enforced by
`scripts/verify-editorial.mjs`; a marker in any other form is a hard failure.

## Totals

| | |
|---|---|
| Marked claims | **12** |
| `[UNCONFIRMED]` | **8** |
| `[NEEDS SOURCE]` | 4 |
| weight `answer` | 1 — An answer key or the correctness of an exercise depends on it. A student is marked right or wrong by it. |
| weight `exercise` | 2 — A work-along gate or an interaction is built on it. The room does something because of it. |
| weight `section` | 4 — A whole section's argument rests on it. Remove the claim and the section has no point. |
| weight `claim` | 3 — A standalone factual claim in prose. A reader could repeat it to a client. |
| weight `aside` | 2 — A passing remark. Nothing else on the page leans on it. |

## The order

**Sorted by how much depends on the claim, not by file order.** A claim an
answer key rests on is worth resolving before a passing remark, and file
order tells you nothing about which is which. `weight` is the only field
typed by hand; file, line, section, region and the claim text are read out of
the corpus on every run.

---

## weight `answer`

*An answer key or the correctness of an exercise depends on it. A student is marked right or wrong by it.*

### 1. `session-4/index.html:1621` — `#sWS` — **[NEEDS SOURCE]**

> [NEEDS SOURCE]

| | |
|---|---|
| File and line | `session-4/index.html:1621` |
| Section | `#sWS` (`standard`) |
| Region | R1 — body prose |
| Marker | **[NEEDS SOURCE]** |
| What would resolve it | Add vendor model-card keys and rewire off src-case. The same figures are duplicated into the Appendix D3 quiz feedback strings, so a student is marked right or wrong by them. The page's own source note two lines down already admits the provenance is Artificial Analysis plus vendor model cards, while the chip points at the Cole household. |
| Candidate source | Search corroborates every figure including the derived 3.7%: Kimi K3 at 2.8T total and 104B active per token, DeepSeek-V4-Flash at 284B and 13B. Neither vendor page was reachable from this build environment. — confidence **medium** |

## weight `exercise`

*A work-along gate or an interaction is built on it. The room does something because of it.*

### 2. `session-3/index.html:2151` — `#s16` — **[UNCONFIRMED]**

> [UNCONFIRMED]

| | |
|---|---|
| File and line | `session-3/index.html:2151` |
| Section | `#s16` (`core`) |
| Region | R2 — script string literal |
| Marker | **[UNCONFIRMED]** |
| What would resolve it | Re-read the leaderboard and restate the floor, or drop the superlative and teach the range. The measurement is unchanged; what moved is what it is the best of. The HALL chart array at :2019 labels 3.3% 'Best model, grounded' and this panel teaches the range from it. |
| Candidate source | Vectara's own hallucination-leaderboard repository, read 2026-08-25: last updated 2026-05-11, HHEM-2.3, 123 models. Every per-model rate this lesson quotes is still on the board, but 3.3% now ranks third and the floor is 1.8%. The cited blog post itself is blocked from this build environment and was not read. — confidence **medium** |

### 3. `session-4/index.html:1454` — `#sW1` — **[UNCONFIRMED]**

> [UNCONFIRMED]

| | |
|---|---|
| File and line | `session-4/index.html:1454` |
| Section | `#sW1` (`advanced`) |
| Region | R1 — body prose |
| Marker | **[UNCONFIRMED]** |
| What would resolve it | Attach a psychophysics reference and check the VALUE, not just the attribution. DOWNGRADED from the stronger marker on review: the physics is standard, but no primary text stating 1% in the form this widget uses was retrieved, and the reported spread is wide. The stronger marker asserts somebody checked, and nobody did. The hedge that follows the figure is the accurate part and is what the retrieved literature most clearly supports. |
| Candidate source | Mantiuk, Models of early perception (Cambridge advanced graphics notes) as the cleanest reachable secondary; Fechner's ~1% threshold contrast is reported in the ophthalmology literature. No primary text was retrieved. — confidence **low** |

## weight `section`

*A whole section's argument rests on it. Remove the claim and the section has no point.*

### 4. `session-4/index.html:1422` — `#sW1` — **[UNCONFIRMED]**

> [UNCONFIRMED]

| | |
|---|---|
| File and line | `session-4/index.html:1422` |
| Section | `#sW1` (`advanced`) |
| Region | R1 — body prose |
| Marker | **[UNCONFIRMED]** |
| What would resolve it | Read Anthropic's own announcement at anthropic.com/news/claude-text-watermark and, if it says what two independent search passes report it says, rewrite this sentence and its consequence for coursework. Do NOT soften this to the weaker marker: it is here because a source appears to CONTRADICT the claim, not because none was attached. |
| Candidate source | anthropic.com/news/claude-text-watermark, plus the-decoder and thenextweb reporting of 2 August 2026, all reached through search only: the host is blocked from this build environment and the page itself was never loaded — confidence **medium** |
| Note | Reported substance: Claude output carries a SynthID-Text watermark and C2PA provenance metadata for models launched from 2 August 2026, applied worldwide. If that holds, this sentence is false and so is what it tells students about their own coursework. |

### 5. `session-2/index.html:1473` — `#s6` — **[NEEDS SOURCE]**

> [NEEDS SOURCE]

| | |
|---|---|
| File and line | `session-2/index.html:1473` |
| Section | `#s6` (`core`) |
| Region | R1 — body prose |
| Marker | **[NEEDS SOURCE]** |
| What would resolve it | Add a key for Anthropic's own post and rewire off src-case. Keep the lesson qualitative about which models: the post names Opus 5 and Fable 5 as examples, and 'its two most recent models' is a stronger claim than the source makes. |
| Candidate source | Shihipar, T. (2026-07-24), The new rules of context engineering for Claude 5 generation models, claude.com blog. Reached through search only; the host was not fetched from this build environment. — confidence **medium** |

### 6. `session-4/index.html:1398` — `#s5` — **[NEEDS SOURCE]**

> [NEEDS SOURCE]

| | |
|---|---|
| File and line | `session-4/index.html:1398` |
| Section | `#s5` (`core`) |
| Region | R1 — body prose |
| Marker | **[NEEDS SOURCE]** |
| What would resolve it | Attach the two real sources and drop src-case: a synthetic household cannot evidence a meta-analysis. Check the wording against the pooled figure before chipping it H — 55.54% is near chance and above it for some stimulus types, so 'close to chance' survives and 'at chance' would not. |
| Candidate source | Diel, Lalgi, Schroter, MacDorman, Teufel and Bauerle (2024), Human performance in detecting deepfakes: a systematic review and meta-analysis of 56 papers, Computers in Human Behavior Reports 16, 100538 — 137 effects, 86,155 participants, pooled accuracy 55.54% — confidence **medium** |

### 7. `session-4/index.html:1555` — `#s7` — **[NEEDS SOURCE]**

> [NEEDS SOURCE]

| | |
|---|---|
| File and line | `session-4/index.html:1555` |
| Section | `#s7` (`core`) |
| Region | R1 — body prose |
| Marker | **[NEEDS SOURCE]** |
| What would resolve it | Rewire this chip to src-magesh, which is already in this lesson's footer, and extend its used_for clause to name the response-length correlation. The rates and the word counts are the same paper; the chip points at the synthetic household. |
| Candidate source | Magesh, Surani, Dahl, Suzgun, Manning and Ho (2025), Journal of Empirical Legal Studies 22(2), 216. Search reports the paper stating an average Westlaw response length of 350 words (SD 120) against 219, excluding refusals, and drawing the length-to-falsifiability link itself. reglab.stanford.edu is blocked here and the paper was not read. — confidence **medium** |

## weight `claim`

*A standalone factual claim in prose. A reader could repeat it to a client.*

### 8. `index.html:976` — `#(outside any section)` — **[UNCONFIRMED]**

> [UNCONFIRMED]

| | |
|---|---|
| File and line | `index.html:976` |
| Section | `#(outside any section)` |
| Region | R1 — body prose |
| Marker | **[UNCONFIRMED]** |
| What would resolve it | Narrow it to the claim that is true and equally reassuring: every CLIENT example uses one synthetic household. As written it is wrong in both directions. Sessions 1 and 2 are full of examples that are not the Cole household at all, and session-0.1 is a sixth published lesson this sentence does not count. The second sentence is the promise a student actually reads and it is the one worth keeping exact. |
| Candidate source | the scoped version already stated in session-0.1 — confidence **low** |

### 9. `session-3/index.html:1484` — `#s12` — **[UNCONFIRMED]**

> [UNCONFIRMED]

| | |
|---|---|
| File and line | `session-3/index.html:1484` |
| Section | `#s12` (`core`) |
| Region | R1 — body prose |
| Marker | **[UNCONFIRMED]** |
| What would resolve it | Name the compilations. This lesson's own teaching point three lines down is that published counts disagree, which makes an assertion about what appears on EVERY published list the one claim in the passage that cannot be checked without the list of lists. |
| Candidate source | none retrieved; the statutory citations beside it are sourced and this sentence is not — confidence **none** |

### 10. `session-4/index.html:1513` — `#sW2` — **[UNCONFIRMED]**

> [UNCONFIRMED]

| | |
|---|---|
| File and line | `session-4/index.html:1513` |
| Section | `#sW2` (`advanced`) |
| Region | R1 — body prose |
| Marker | **[UNCONFIRMED]** |
| What would resolve it | Read AB 853 and Regulation (EU) 2024/1689 Article 50 and restate both dates. Two statutes cannot be evidenced by a synthetic household in any case. |
| Candidate source | Search reports that AB 853, signed 13 October 2025, DELAYED SB 942 from 1 January 2026 to 2 August 2026, with hosting-platform duties phasing in from 2027. If so the first clause is wrong. The EU half is closer but begin enforcement should read become applicable. — confidence **medium** |

## weight `aside`

*A passing remark. Nothing else on the page leans on it.*

### 11. `session-4/index.html:1422` — `#sW1` — **[UNCONFIRMED]**

> [UNCONFIRMED]

| | |
|---|---|
| File and line | `session-4/index.html:1422` |
| Section | `#sW1` (`advanced`) |
| Region | R1 — body prose |
| Marker | **[UNCONFIRMED]** |
| What would resolve it | Either find a source that measures the false-positive rate, or remove the confidence chip: this is a base-rate deduction the page makes from a premise it has already established, and a syllogism does not need a citation. It should not stay chipped to an SEC speech that makes no such argument. |
| Candidate source | C2PA guidance says the corresponding thing qualitatively, reached through secondary blogs only — confidence **low** |

### 12. `session-4/index.html:1498` — `#sW2` — **[UNCONFIRMED]**

> [UNCONFIRMED]

| | |
|---|---|
| File and line | `session-4/index.html:1498` |
| Section | `#sW2` (`advanced`) |
| Region | R1 — body prose |
| Marker | **[UNCONFIRMED]** |
| What would resolve it | Read arXiv 2605.01479 and check whether it reports these two figures. If it does not, find the scheme that does or delete the clause: the teaching point is the sentence after it, that any single removal percentage is scheme-specific. |
| Candidate source | arXiv 2605.01479 resolves to CSGuard: Toward Forgery-Resistant Watermarking in Diffusion Models via Compressed Sensing Constraint, which the page names three lines later as the semantic-binding counterexample. Naming a plausible paper is not verifying two decimals against it, and the paper was not read. — confidence **low** |

