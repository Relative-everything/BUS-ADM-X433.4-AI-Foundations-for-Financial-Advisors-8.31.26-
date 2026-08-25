# DATA-PULL.md — the live-data register

**Generated from `SOURCES.md` by `scripts/build-bibliography.mjs`. Do not edit.**

**This is fields on the source record, not a parallel list**, and that is the
whole design: *"update all live data points"* has to resolve to a concrete edit
set rather than a reconciliation between two files that will drift the way the
appendix index drifted. Every row below is derived from a `moving_target` record
in `SOURCES.md` and from the chips the corpus actually carries.

**20 of 57 works are moving targets, feeding 83 of
176 references.**


---

## The ordering rule

> **`pulled_on` ascending implies `index_version` non-descending.**

**VIOLATED.** This is report §3.7's G3, stated
as an assertion instead of a note. A later retrieval carrying an earlier
version string means the version is not tracking the data.

- src-aa: session-2 pulled 2026-08 at v4.1.1, session-4 pulled later on 2026-08-13 at v4.1 — version went DOWN


---

## Moving targets

### `src-aa` — Artificial Analysis Intelligence Index and cost-per-task figures

| | |
|---|---|
| Figure class | `benchmark_index` |
| Index version | divergent, see the three pulls below |
| Retrieved | divergent across lessons, see DATA-PULL.md PULL-001 to PULL-003 |
| Re-check before | every teaching of session-1 §05, session-2 §02 and session-4 §03 |
| References | 12 |
| Feeds | S1 `#s10` ×2 · S2 `#s5` ×2 · S4 `#s3` ×5 · S4 `#s7` · S4 `#sWS` ×2 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| AA-001 | S1 | 2026-07-28 | **[UNVERIFIED, needs source]** | index scores and cost per index task for the frontier chart; the body dates the pull 17 and 24 July and the footer dates it 28 July |
| AA-002 | S2 | 2026-08 | v4.1.1 | index scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5; IDENTICAL to the session-1 pull under a later version string |
| AA-003 | S4 | 2026-08-13 | v4.1 | Opus 5 61 against 63, Fable 5 60 against 62, Luna cost per task $0.21 against $0.07, token prices 5x apart; DIFFERS from both other pulls on every shared model |

### `src-synthid` — SynthID

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | **[UNVERIFIED, needs source]** |
| Re-check before | every teaching of session-4 Appendices D1 and D2 |
| References | 11 |
| Feeds | S4 `#sW1` ×8 · S4 `#sW2` ×3 |

### `src-memory` — Use Claude's chat search and memory to build on previous context

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 9 |
| Feeds | S0.1 `#s0` · S0.1 `#s5` ×2 · S0.1 `#s6` ×2 · S0.1 `#s7` · S0.1 `#s9` · S0.1 `#s10` ×2 |

### `src-tools3` — When should I use web search, extended thinking, and research?

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 9 |
| Feeds | S0.1 `#s1` · S0.1 `#s4` · S0.1 `#s5` ×3 · S0.1 `#s8` ×3 · S0.1 `#s9` |

### `src-effort` — Change the model, effort, and thinking settings

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 8 |
| Feeds | S0.1 `#s1` · S0.1 `#s2` · S0.1 `#s3` ×5 · S0.1 `#s9` |

### `src-ctxwindow` — How large is the context window on paid Claude plans?

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 6 |
| Feeds | S0.1 `#s1` · S0.1 `#s4` ×4 · S0.1 `#s6` |

### `src-pricing` — Pricing

| | |
|---|---|
| Figure class | `price` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-07-28 |
| Re-check before | every teaching of session-1 §03, §05 and §06 |
| References | 4 |
| Feeds | S1 `#s5` · S1 `#s11` ×3 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| PRICING-001 | S1 | 2026-07-28 | **[UNVERIFIED, needs source]** | per-token input and output rates, cache-hit and batch discounts |
| PRICING-002 | S2 | 2026-08 | **[UNVERIFIED, needs source]** | the published rates behind the blended token price at a 3:1 input-to-output ratio |

### `src-vectara` — Introducing the next generation of Vectara's hallucination leaderboard

| | |
|---|---|
| Figure class | `leaderboard_position` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | **[UNVERIFIED, needs source]** |
| Re-check before | every teaching of session-3 §05 |
| References | 4 |
| Feeds | S3 `#s7` · S3 `#s16` ×3 |

### `src-models` — Models overview

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 4 |
| Feeds | S0.1 `#s2` · S0.1 `#s3` ×2 · S0.1 `#s4` |

### `src-plugins` — Use plugins in Claude

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 3 |
| Feeds | S0.1 `#s7` ×3 |

### `src-skills` — What are skills?

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 3 |
| Feeds | S0.1 `#s6` · S0.1 `#s7` · S0.1 `#s9` |

### `src-anthropic-terms` — Privacy Center and Commercial Terms

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-14 |
| Re-check before | every teaching of session-4 §03 and §06 |
| References | 2 |
| Feeds | S4 `#s3` · S4 `#s6` |

### `src-personalization` — Understanding Claude's personalization features

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 2 |
| Feeds | S0.1 `#s1` · S0.1 `#s6` |

### `src-charlotin` — AI Hallucination Cases database

| | |
|---|---|
| Figure class | `cumulative_counter` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-06 |
| Re-check before | every teaching of session-2 §07 |
| References | 1 |
| Feeds | S2 `#s10` |

### `src-owasp` — Top 10 for LLM Applications and Top 10 for Agentic Applications

| | |
|---|---|
| Figure class | `leaderboard_position` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | **[UNVERIFIED, needs source]** |
| Re-check before | every teaching of session-4 §05 |
| References | 1 |
| Feeds | S4 `#s5` |

### `src-beta` — Available beta and research preview features

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 1 |
| Feeds | S0.1 `#s7` |

### `src-directory` — Browse skills, connectors, and plugins in one directory

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 1 |
| Feeds | S0.1 `#s7` |

### `src-features` — Features and capabilities collection index

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 1 |
| Feeds | S0.1 `#s7` |

### `src-routing` — Why Claude switched models in your conversation with Fable 5

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | 2026-08-20 |
| Re-check before | every teaching of session-0.1 |
| References | 1 |
| Feeds | S0.1 `#s2` |

### `src-kitces-advisortech` — The Latest in Financial AdvisorTech — AdvisorTech columns, October 2025, November 2025 and August 2026

| | |
|---|---|
| Figure class | `cumulative_counter` |
| Index version | **[UNVERIFIED, needs source]** |
| Retrieved | **[UNVERIFIED, needs source]** |
| Re-check before | every teaching of session-3 Appendix C3 |
| References | 0 |
| Feeds | *nothing on the page* |


---

## Historical fixtures — never update these

A model named because a cited finding was measured on it is **evidence**,
not a roster entry. Updating it to a current model name falsifies the
finding it supports. A register that treated both as `moving_target` would
silently rewrite the evidence, which is why `figure_class: model_version`
is not used for either of these.

| Source | The fixture |
|---|---|
| `src-magesh` | Over 200 preregistered legal queries, expert hand-scored, against Lexis+ AI, Westlaw AI-Assisted Research and GPT-4. Tools tested May 2024 — a historical fixture. The measured rates belong to the tools as they were on that date and must never be "updated". |
| `src-kalai` | Why a model guesses rather than abstains, and the two scoring rules. The model tested was DeepSeek-V3 on 11 May 2025 — a historical fixture; the finding is about that model on that date. |
| `src-dahl-fictions` | General-purpose models over more than 800,000 verifiable legal questions, 58-88% hallucination; GPT-4 58%, GPT-3.5 69%, Llama 2 88%. Those three model names are a HISTORICAL FIXTURE: the finding is about those models and updating them to current names would falsify it. |


---

## Model references, and the standing requirement

**No `Opus 5` reference may still be standing when this course is
retaught.** Model names in prose are a live roster: they date the material
faster than any other figure in it, and unlike a price they do not look
wrong when they go stale.

| Lesson | Distinct model names in prose | Occurrences |
|---|---|---|
| S0.1 | `Fable 5`, `Haiku 4.5`, `Opus 4.7`, `Opus 5`, `Sonnet 5` | 105 |
| S1 | `Fable 5`, `GPT-5.6`, `Haiku 4.5`, `Kimi K3`, `Luna`, `Opus 4.8`, `Opus 5`, `Sol`, `Sonnet 5`, `Terra` | 36 |
| S2 | `Fable 5`, `GPT-5.6`, `Luna`, `Opus 4.8`, `Opus 5`, `Sol`, `Sonnet 5`, `Terra` | 41 |
| S3 | — | 0 |
| S4 | `DeepSeek V4-Flash`, `Fable 5`, `GPT-5.6`, `Gemini 3.6`, `Grok 4.6`, `Kimi K3`, `Luna`, `Opus 5`, `Sonnet 5` | 33 |

**215 occurrences across 5 lessons.** This count is read off
the corpus on every run, so it cannot go stale the way a typed one would.


---

## NOT RESOLVED — the session-1 §05 price attribution

**Surfaced with the evidence both ways. This is the instructor's, and it is
the first entry this register exists for.**

| | |
|---|---|
| The instructor described the session-1 §05 price data as | **livebench.ai** |
| The corpus attributes it to | **Artificial Analysis**, in five places: the body note, the chart label, the footer entry, the `src-aa` key, and both §05 chips |
| Prices are separately attributed to | Anthropic's Claude Platform Docs |
| `grep -rniI "livebench"` repo-wide | **0 matches** |

The file is unambiguous about what it says and cannot say what was actually
pulled: a build that fetched livebench and was written up as Artificial
Analysis would look identical from here. **Logged as
`[UNVERIFIED, needs source]` and not resolved.**

**And the versioning incoherence underneath it is worse than the attribution
question**, because that part is measurable — see the ordering rule above.
Fixing the attribution without fixing the versioning leaves the same defect
behind a tidier label.
