# DATA-PULL.md — the live-data register

**Generated from `SOURCES.md` by `scripts/build-bibliography.mjs`. Do not edit.**

**This is fields on the source record, not a parallel list**, and that is the
whole design: *"update all live data points"* has to resolve to a concrete edit
set rather than a reconciliation between two files that will drift the way the
appendix index drifted. Every row below is derived from a `moving_target` record
in `SOURCES.md` and from the chips the corpus actually carries.

**67 of 146 works are moving targets, feeding 346 of
702 references.**


---

## The ordering rule

> **`last_retrieved` ascending implies `index_version` non-descending.**

It runs on `last_retrieved` and never on `last_verified`. One records when a
machine fetched the source; the other records that the instructor read it.
Only the first can order two pulls of the same work.

**Precondition — every registered retrieval carries a full date.** A month
cannot be ordered against a day, which is where the `src-aa` incoherence hid.

**PRECONDITION FAILS, 2 times.** Each partial date below is ordered at its
**earliest possible day** so the rule underneath it still runs. That is a
reading convention, not a date, and no day is invented.

- src-aa: session-2 retrieved "2026-08" — a month, not a day; ordered at 2026-08-01 for the rule below
- src-charlotin: last_retrieved "2026-06" — a month, not a day


**VIOLATED.** This is report §3.7's G3, stated
as an assertion instead of a note. A later retrieval carrying an earlier
version string means the version is not tracking the data.

- src-aa: session-2 pulled 2026-08 (partial; earliest 2026-08-01) at v4.1.1, session-4 pulled later on 2026-08-13 at v4.1 — version went DOWN


---

## Moving targets

### `src-anthropic-deprecations` — Model deprecations

| | |
|---|---|
| Figure class | `vendor lifecycle schedule` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-12 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | each teaching of Session 5 |
| References | 56 |
| Feeds | case-1 `#deliverable` ×3 · case-1 `#built` ×2 · case-2 `#deliverable` ×2 · case-2 `#built` ×2 · case-3 `#deliverable` ×5 · case-3 `#built` ×2 · case-4 `#deliverable` ×4 · case-4 `#built` ×3 · case-5 `#brief` · case-5 `#commit` · case-5 `#deliverable` ×4 · case-5 `#built` ×5 · case-5 `#next` ×2 · S0.1 `#s0` · S1 `#s10` · S2 `#s5` · S2 `#s8` · S3 `#sOff` · S5 `#sCase` ×2 · S5 `#s1` ×3 · S5 `#sE2` ×2 · S5 `#sE6` ×4 · S5 `#sE5` ×4 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| ANTHROPIC-DEPRECATIONS-001 | S3 | 2026-10-11 | **[UNVERIFIED, needs source]** | the id claude-sonnet-5-5 (FACTS claude-model-ids-and-retirements, read in full 2026-10-11) |
| ANTHROPIC-DEPRECATIONS-002 | S2 | 2026-10-11 | **[UNVERIFIED, needs source]** | model names Fable 5.1, Opus 5.5, Sonnet 5.5 and Haiku 5.5, and the id claude-sonnet-5-5 (FACTS claude-model-ids-and-retirements, read in full 2026-10-11) |
| ANTHROPIC-DEPRECATIONS-003 | S1 | 2026-10-11 | **[UNVERIFIED, needs source]** | model names Fable 5.1, Opus 5.5, Sonnet 5.5 and Haiku 5.5 (FACTS claude-model-ids-and-retirements, read in full 2026-10-11) |
| ANTHROPIC-DEPRECATIONS-004 | S0.1 | 2026-10-11 | **[UNVERIFIED, needs source]** | model names Fable 5.1, Opus 5.5, Sonnet 5.5 and Haiku 5.5 (FACTS claude-model-ids-and-retirements, read in full 2026-10-11) |
| ANTHROPIC-DEPRECATIONS-005 | S5 | 2026-10-12 | **[UNVERIFIED, needs source]** | the retirement and not-sooner-than date of every row on the §02 calendar, Haiku 5.5 (7 October 2027) added and Haiku 4.5 (15 October 2026) moved to the legacy rows; Sonnet 4.5 deprecated 30 September 2026 and retiring 30 November 2026 with Sonnet 5.5 as the replacement; at least 60 days of notice (FACTS claude-model-ids-and-retirements, read in full 2026-10-11 and again 2026-10-12) |

### `src-pricing` — Pricing

| | |
|---|---|
| Figure class | `price` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-1 Appendix A2, Appendix A7 and Appendix A8 |
| References | 41 |
| Feeds | case-1 `#built` ×5 · case-2 `#built` ×4 · case-3 `#built` ×4 · case-4 `#built` ×4 · case-5 `#built` ×4 · S1 `#s5` ×2 · S1 `#s10` ×2 · S1 `#s11` ×3 · S1 `#s15` ×4 · S2 `#s0` · S2 `#s5` ×3 · S4 `#s3` · S4 `#sCR` ×4 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| PRICING-001 | S1 | 2026-10-11 | **[UNVERIFIED, needs source]** | per-token input and output rates for Haiku 5.5 (tiered at 100K tokens), Sonnet 5.5, Opus 5.5 and Fable 5.1; output at five times input on every listed model; cache-read multipliers (0.1x default, 0.05x Opus 5.5 and Sonnet 5.5, 0.025x Fable 5.1), cache-write multipliers and the 50% Batch API discount; all from FACTS claude-api-price-* , claude-output-input-ratio and claude-cache-and-batch-pricing, read in full 2026-10-11 |
| PRICING-002 | S2 | 2026-10-11 | **[UNVERIFIED, needs source]** | the published rates behind the blended token price at a 3:1 input-to-output ratio; the Sonnet 5.5, Opus 5.5 and Fable 5.1 input and output rates in the cost estimator and the retrieval bridge, and output at five times input (FACTS claude-api-price-sonnet-5-5, claude-api-price-opus-5-5, claude-api-price-fable-5-1 and claude-output-input-ratio, read in full 2026-10-11) |
| PRICING-003 | S4 | 2026-10-11 | **[UNVERIFIED, needs source]** | input $0.10 and output $0.50 per million tokens for prompts up to 100K tokens, output at five times input (FACTS claude-api-price-haiku-5-5 and claude-output-input-ratio, read in full 2026-10-11) |

### `src-anthropic-terms` — Consumer Terms of Service, Commercial Terms of Service and Privacy Policy

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D2 |
| References | 20 |
| Feeds | case-4 `#next` · S0.1 `#s0` · S1 `#(footer)` · S4 `#(footer)` · S4 `#s3` ×6 · S4 `#s4` ×2 · S4 `#sCR` ×7 · S5 `#s6` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| ANTHROPIC-TERMS-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | the setting is changed in Privacy Settings; the update applies to Free, Pro and Max and not to services under the Commercial Terms (the 28 August 2025 news post, read in full 2026-10-13); no default stated |

### `src-claude-marks` — How Claude marks AI-generated content

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendices D8 and D9 |
| References | 18 |
| Feeds | S4 `#s1` · S4 `#sW1` ×5 · S4 `#sW2` ×6 · S4 `#sCR` ×6 |

### `src-claude-pricing` — Plans and pricing

| | |
|---|---|
| Figure class | `vendor_pricing` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D2 |
| References | 13 |
| Feeds | case-1 `#built` · case-4 `#built` · case-4 `#next` · S0.1 `#s0` ×2 · S1 `#s10` · S1 `#s11` · S1 `#s14b` · S4 `#(footer)` · S4 `#s3` ×3 · S4 `#sCR` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| CLAUDE-PRICING-001 | S1 | 2026-10-11 | **[UNVERIFIED, needs source]** | Pro $20 per month billed monthly; Max 5x $100 and Max 20x $200 (FACTS claude-plans, read in full 2026-10-11) |
| CLAUDE-PRICING-002 | S4 | 2026-10-11 | **[UNVERIFIED, needs source]** | Pro $20 a month or $17 a month on annual billing; Team and Enterprise from $20 a seat a month billed annually (FACTS claude-plans, read in full 2026-10-11) |
| CLAUDE-PRICING-003 | S0.1 | 2026-10-11 | **[UNVERIFIED, needs source]** | Free $0; Pro $20 a month or $17 a month billed annually; Max 5x $100 and 20x $200; Team Standard $25 ($20 annual) and Premium $125 ($100 annual); Enterprise $20 per seat billed annually plus usage; Free includes Sonnet and Haiku, Pro adds Opus with Fable through usage credits, Max and Team Premium include Fable (FACTS claude-plans, read in full 2026-10-11) |

### `src-models` — Models overview

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-0.1 |
| References | 12 |
| Feeds | case-1 `#built` · case-2 `#built` · case-3 `#built` · case-4 `#built` · case-5 `#built` · S0.1 `#s1` · S1 `#s5` · S2 `#s0` · S2 `#s3` · S3 `#sRag` ×2 · S4 `#sCR` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| MODELS-001 | S0.1 | 2026-10-11 | **[UNVERIFIED, needs source]** | 1M tokens of context on the current Claude models (FACTS claude-context-window, read in full 2026-10-11) |
| MODELS-002 | S2 | 2026-10-11 | **[UNVERIFIED, needs source]** | 1M tokens of context on the current Claude models, and 1M tokens as roughly 555,000 English words on the current tokenizer (FACTS claude-context-window, read in full 2026-10-11) |
| MODELS-003 | S3 | 2026-10-11 | **[UNVERIFIED, needs source]** | 1M tokens of context on the current Claude models (FACTS claude-context-window, read in full 2026-10-11) |
| MODELS-004 | S1 | 2026-10-11 | **[UNVERIFIED, needs source]** | context window of 1M tokens on Fable 5.1, Opus 5.5, Sonnet 5.5 and Haiku 5.5 (FACTS claude-context-window, read in full 2026-10-11) |
| MODELS-005 | S4 | 2026-10-11 | **[UNVERIFIED, needs source]** | 1M tokens of context on the current Claude models, about 555,000 words (FACTS claude-context-window, read in full 2026-10-11) |

### `src-anthropic-dpa` — Data Processing Addendum

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D3 |
| References | 12 |
| Feeds | case-4 `#built` · case-4 `#next` · S4 `#s3` ×2 · S4 `#s4` ×2 · S4 `#sCR` ×6 |

### `src-claude-privacy-training` — Is my data used for model training?

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D2 |
| References | 11 |
| Feeds | case-1 `#built` · case-4 `#next` · S0.1 `#s0` ×3 · S0.1 `#s11` · S4 `#s3` ×2 · S4 `#sCR` ×2 · S5 `#s0` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| CLAUDE-PRIVACY-TRAINING-001 | S4 | 2026-10-11 | **[UNVERIFIED, needs source]** | the five-year and 30-day retention (FACTS claude-consumer-retention, from primary-domain snippets read 2026-10-11) |
| CLAUDE-PRIVACY-TRAINING-002 | S5 | 2026-10-11 | **[UNVERIFIED, needs source]** | up to five years with the training setting on, 30 days with it off (FACTS claude-consumer-retention, from primary-domain snippets read 2026-10-11); no default stated |
| CLAUDE-PRIVACY-TRAINING-003 | S0.1 | 2026-10-11 | **[UNVERIFIED, needs source]** | up to five years with the setting on, within 30 days with it off, exceptions of two, seven and five years (FACTS claude-consumer-retention, from primary-domain snippets read 2026-10-11); no default stated |

### `src-context-windows` — Context windows

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-2 s0, the retrieval bridge (unnumbered) |
| References | 9 |
| Feeds | S0.1 `#s1` · S0.1 `#s10` · S1 `#s1` · S1 `#s5` ×2 · S2 `#s0` · S2 `#s3` · S3 `#sRag` ×2 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| CONTEXT-WINDOWS-001 | S3 | 2026-10-11 | **[UNVERIFIED, needs source]** | none typed; the bullet paraphrases the page's first sentence (FACTS context-window-definition, read in full 2026-10-11) |
| CONTEXT-WINDOWS-002 | S2 | 2026-10-11 | **[UNVERIFIED, needs source]** | the 1M-token ceiling; the keys paraphrase the page's first sentence and its sentences on contents, accumulation and degradation (FACTS context-window-definition, read in full 2026-10-11) |
| CONTEXT-WINDOWS-003 | S1 | 2026-10-11 | **[UNVERIFIED, needs source]** | none typed; the definition paraphrases the page's first sentence (FACTS context-window-definition, read in full 2026-10-11) |
| CONTEXT-WINDOWS-004 | S0.1 | 2026-10-11 | **[UNVERIFIED, needs source]** | none typed; the definition paraphrases the page's first sentence (FACTS context-window-definition, read in full 2026-10-11) |

### `src-memory` — Use Claude's chat search and memory to build on previous context

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-0.1 |
| References | 9 |
| Feeds | S0.1 `#s1` · S0.1 `#s7` · S0.1 `#s8` ×6 · S2 `#s3` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| MEMORY-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | memory on by default for Free, Pro and Max and off for each member on Team and Enterprise until they turn it on; never saved: government ID numbers, criminal history, financial account numbers, immigration status; deleting a chat does not delete the memory made from it (read in full 2026-10-13) |

### `src-personalization` — Understanding Claude's personalization features

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-0.1 |
| References | 8 |
| Feeds | S0.1 `#s2` ×3 · S0.1 `#s3` ×4 · S2 `#s3` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| PERSONALIZATION-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | Instructions for Claude apply to all of a user's conversations; project instructions apply only to chats in that project; Free accounts can create five projects (read in full 2026-10-13) |

### `src-anthropic-retention` — API and data retention

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D2 |
| References | 7 |
| Feeds | S1 `#(footer)` · S4 `#(footer)` · S4 `#s3` ×2 · S4 `#s4` · S4 `#sCR` ×2 |

### `src-synthid` — SynthID

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendices D8 and D9 |
| References | 6 |
| Feeds | S4 `#s7` · S4 `#sW1` ×2 · S4 `#sCR` ×3 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| SYNTHID-001 | S4 | 2026-10-11 | **[UNVERIFIED, needs source]** | what SynthID embeds in images, video, audio and Gemini text (FACTS google-synthid, from primary-domain snippets read 2026-10-11) |

### `src-claude-connectors` — Use connectors to extend Claude's capabilities

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the start of each term |
| References | 6 |
| Feeds | S0.1 `#s5` ×6 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| CLAUDE-CONNECTORS-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | none typed |

### `src-aa` — Artificial Analysis Intelligence Index and cost-per-task figures

| | |
|---|---|
| Figure class | `benchmark_index` |
| Index version | divergent, see the three pulls below |
| Last retrieved | 2026-08-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-1 Appendix A7, session-2 Appendix B8 and session-4 Appendix D6 |
| References | 5 |
| Feeds | S1 `#s10` · S2 `#s5` ×3 · S4 `#sWS` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| AA-001 | S1 | 2026-07-28 | **[UNVERIFIED, needs source]** | index scores and cost per index task for the frontier chart; the body dates the pull 17 and 24 July and the footer dates it 28 July |
| AA-002 | S2 | 2026-08 | v4.1.1 | index scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5; IDENTICAL to the session-1 pull under a later version string |
| AA-003 | S4 | 2026-08-13 | v4.1 | none typed since 2026-09-25; the frontier and divergence charts left the page with the rebuild |

### `src-synthid-text` — SynthID: Tools for watermarking and detecting LLM-generated Text

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-25 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendices D8 and D9 |
| References | 5 |
| Feeds | S4 `#sW1` ×2 · S4 `#sW2` ×3 |

### `src-openai-data` — How your data is used to improve model performance

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D2 |
| References | 5 |
| Feeds | case-4 `#next` · S4 `#s3` ×3 · S4 `#sCR` |

### `src-agent-skills` — Agent Skills overview

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 §05 |
| References | 5 |
| Feeds | S0.1 `#s6` ×2 · S4 `#s7` · S4 `#sWS` · S4 `#sCR` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| AGENT-SKILLS-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | name: lowercase letters, numbers and hyphens, 64 characters at most; description: what the skill does and when to use it (read in full 2026-10-13) |

### `src-api-messages` — Messages API reference

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-2 Appendix B4 |
| References | 4 |
| Feeds | S2 `#s3` ×2 · S4 `#sWS` · S4 `#sCR` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| API-MESSAGES-001 | S2 | 2026-09-13 | **[UNVERIFIED, needs source]** | none typed |

### `src-gemini-privacy` — Gemini Apps Privacy Hub

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D2 |
| References | 4 |
| Feeds | case-4 `#next` · S4 `#s3` ×2 · S4 `#sCR` |

### `src-anthropic-models-overview` — Models overview

| | |
|---|---|
| Figure class | `vendor model lineup` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-12 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | each teaching of Session 5 |
| References | 4 |
| Feeds | S5 `#s1` ×3 · S5 `#sE5` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| ANTHROPIC-MODELS-OVERVIEW-001 | S5 | 2026-10-12 | **[UNVERIFIED, needs source]** | the four current models Fable 5.1, Opus 5.5, Sonnet 5.5 and Haiku 5.5 and their not-sooner-than dates (1 September, 22 September, 28 September and 7 October 2027), with Haiku 4.5 among the legacy models (FACTS claude-model-ids-and-retirements, read in full 2026-10-11 and again 2026-10-12) |

### `src-claude-code-skills` — Skills

| | |
|---|---|
| Figure class | `vendor product documentation` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-04 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | each teaching of Session 5 |
| References | 4 |
| Feeds | S5 `#s1` ×2 · S5 `#sLib` ×2 |

### `src-claude-code-settings` — Settings files and precedence

| | |
|---|---|
| Figure class | `vendor product documentation` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-04 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | each teaching of Session 5 |
| References | 4 |
| Feeds | S5 `#s1` ×2 · S5 `#sLib` ×2 |

### `src-claude-watermark` — How Claude's text watermark works

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendices D8 and D9 |
| References | 4 |
| Feeds | S4 `#s7` · S4 `#sW1` ×3 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| CLAUDE-WATERMARK-001 | S4 | 2026-10-11 | **[UNVERIFIED, needs source]** | the 14 August 2026 announcement date and the statement that the mark identifies no user (FACTS claude-text-watermark, read in full 2026-10-11) |

### `src-claude-skills-use` — Use skills in Claude

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the start of each term |
| References | 4 |
| Feeds | S0.1 `#s6` ×4 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| CLAUDE-SKILLS-USE-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | none typed; the upload steps and the plan list restate the page (FACTS claude-skills-format, read in full 2026-10-11 and again 2026-10-13) |

### `src-claude-incognito` — Use incognito chats

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the start of each term |
| References | 4 |
| Feeds | S0.1 `#s7` ×4 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| CLAUDE-INCOGNITO-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | 30 days default retention (read in full 2026-10-13) |

### `src-tools3` — When should I use web search, extended thinking, and research?

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-0.1 |
| References | 3 |
| Feeds | S0.1 `#s4` ×3 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| TOOLS3-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | web search for plain factual queries that take one or two tool calls; research for five or more tool calls over one to three minutes (the page is dated 2 June 2026, read in full 2026-10-13) |

### `src-ms-copilot` — Privacy FAQ for Microsoft Copilot

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D2 |
| References | 3 |
| Feeds | S4 `#s3` ×2 · S4 `#sCR` |

### `src-gemini-workspace` — Generative AI in Google Workspace Privacy Hub

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D2 |
| References | 3 |
| Feeds | case-4 `#next` · S4 `#s3` ×2 |

### `src-claude-code-org` — Manage Claude Code plugins for your organization

| | |
|---|---|
| Figure class | `vendor product documentation` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-04 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | each teaching of Session 5 |
| References | 3 |
| Feeds | S5 `#sLib` ×3 |

### `src-openai-provenance` — Provenance signals in OpenAI-generated content

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendices D8 and D9 |
| References | 3 |
| Feeds | S4 `#s7` · S4 `#sW1` ×2 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| OPENAI-PROVENANCE-001 | S4 | 2026-10-11 | **[UNVERIFIED, needs source]** | the image marks and the EU-only text watermark (FACTS openai-provenance, from primary-domain snippets read 2026-10-11) |

### `src-claude-research` — Use research on Claude

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the start of each term |
| References | 3 |
| Feeds | S0.1 `#s4` ×3 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| CLAUDE-RESEARCH-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | none typed |

### `src-claude-projects` — How can I create and manage projects?

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the start of each term |
| References | 3 |
| Feeds | S0.1 `#s2` ×3 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| CLAUDE-PROJECTS-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | five projects on Free (read in full 2026-10-13) |

### `src-owasp` — Top 10 for LLM Applications and Top 10 for Agentic Applications

| | |
|---|---|
| Figure class | `leaderboard_position` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | session-4 Appendix D4 cites this record (three chips); the link points at the 2025 archive and the 2026 edition's URL is confirmed from a browser (term-start checklist item 11) |
| References | 2 |
| Feeds | S4 `#sCR` ×2 |

### `src-effort` — Change the model, effort, and thinking settings

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-0.1 |
| References | 2 |
| Feeds | S4 `#sWS` · S4 `#sCR` |

### `src-ms-copilot-edp` — Enterprise data protection in Microsoft Copilot and Microsoft Copilot Chat

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D2 |
| References | 2 |
| Feeds | S4 `#s3` ×2 |

### `src-gemini-plans` — Gemini subscriptions

| | |
|---|---|
| Figure class | `vendor_pricing` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-1 Appendix A7 and case-4 |
| References | 2 |
| Feeds | case-4 `#next` · S1 `#s10` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| GEMINI-PLANS-001 | S1 | 2026-10-11 | **[UNVERIFIED, needs source]** | Google AI Plus $4.99; Google AI Pro $19.99; Google AI Ultra $99.99 (5x) or $199.99 (20x) a month (FACTS gemini-plans, primary-domain snippets read 2026-10-11) |
| GEMINI-PLANS-002 | case-4 | 2026-10-11 | **[UNVERIFIED, needs source]** | Google AI Plus $4.99; Google AI Pro $19.99; Google AI Ultra $99.99 (5x) or $199.99 (20x) a month (FACTS gemini-plans, primary-domain snippets read 2026-10-11) |

### `src-anthropic-api-credits` — API credits for Max and Team plans

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-16 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-1 and session-4 |
| References | 2 |
| Feeds | S1 `#(footer)` · S4 `#(footer)` |

### `src-anthropic-certs` — What certifications has Anthropic obtained?

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendices D2 and D3 |
| References | 2 |
| Feeds | S4 `#s3` · S4 `#sCR` |

### `src-claude-memory` — Bringing memory to teams at work

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D6 |
| References | 2 |
| Feeds | S4 `#sWS` · S4 `#sCR` |

### `src-anthropic-context` — Context windows

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D6 |
| References | 2 |
| Feeds | S4 `#sWS` · S4 `#sCR` |

### `src-claude-code-marketplace` — Create a marketplace

| | |
|---|---|
| Figure class | `vendor product documentation` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-04 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | each teaching of Session 5 |
| References | 2 |
| Feeds | S5 `#sLib` ×2 |

### `src-aa-leaderboard` — Language model leaderboard, Intelligence Index

| | |
|---|---|
| Figure class | `benchmark_index` |
| Index version | v4.3.2 |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-1 Appendix A7 |
| References | 2 |
| Feeds | S1 `#s10` ×2 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| AA-LEADERBOARD-001 | S1 | 2026-10-11 | v4.3.2 | four index scores with their effort settings, about 2026-10-07 (FACTS leaderboard-snapshot-aa) |

### `src-livebench` — LiveBench leaderboard and question releases

| | |
|---|---|
| Figure class | `benchmark_index` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-1 Appendix A7 |
| References | 2 |
| Feeds | S1 `#s10` ×2 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| LIVEBENCH-001 | S1 | 2026-10-11 | **[UNVERIFIED, needs source]** | 23 objective tasks in 7 categories, refreshed about every six months; latest release LiveBench-2026-06-25 (FACTS aa-index-definition and livebench-last-release) |

### `src-arena-board` — Text leaderboard

| | |
|---|---|
| Figure class | `leaderboard_position` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-1 Appendix A7 |
| References | 2 |
| Feeds | S1 `#s10` ×2 |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| ARENA-BOARD-001 | S1 | 2026-10-11 | **[UNVERIFIED, needs source]** | two scores and the snapshot date (FACTS leaderboard-snapshot-arena); the measure description is FACTS aa-index-definition |

### `src-openai-pricing` — API pricing

| | |
|---|---|
| Figure class | `price` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-2 Appendix B8 |
| References | 1 |
| Feeds | S2 `#s5` |

### `src-charlotin` — AI Hallucination Cases database

| | |
|---|---|
| Figure class | `cumulative_counter` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-06 **· PARTIAL, month only** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-2 §05 |
| References | 1 |
| Feeds | S2 `#s10` |

### `src-directory` — Browse skills, connectors, and plugins in one directory

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-0.1 |
| References | 1 |
| Feeds | S0.1 `#s5` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| DIRECTORY-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | Customize in the left sidebar with Skills, Connectors and Plugins tabs; Connect on a service starts the authentication flow (read in full 2026-10-13) |

### `src-anthropic-browser-access` — TypeScript SDK

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-16 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 |
| References | 1 |
| Feeds | S4 `#(footer)` |

### `src-anthropic-sampling` — Claude Opus 5.5 migration guide

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-16 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-1 |
| References | 1 |
| Feeds | S1 `#s8` |

### `src-gemini-api-terms` — Gemini API Additional Terms of Service

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 |
| References | 1 |
| Feeds | S4 `#(footer)` |

### `src-gemini-ratelimits` — Rate limits

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 |
| References | 1 |
| Feeds | S4 `#(footer)` |

### `src-ibm-breach-2026` — IBM study: one in four malicious breaches are AI-enabled, costing companies $6 million on average

| | |
|---|---|
| Figure class | `survey` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D4 |
| References | 1 |
| Feeds | S4 `#sCR` |

### `src-anthropic-injection` — Mitigating the risk of prompt injections in browser use

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-4 Appendix D4 |
| References | 1 |
| Feeds | S4 `#sCR` |

### `src-openai-retire-4o` — Retiring GPT-4o and other ChatGPT models

| | |
|---|---|
| Figure class | `vendor lifecycle schedule` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | each teaching of Session 5 |
| References | 1 |
| Feeds | S5 `#s1` |

### `src-rightcapital-iris` — RightCapital launches Iris, the first planning-focused AI agent designed to transform the financial planning process

| | |
|---|---|
| Figure class | `vendor product claim` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | each teaching of Session 5 |
| References | 1 |
| Feeds | S5 `#s6` |

### `src-claude-code-host` — Host and maintain a marketplace

| | |
|---|---|
| Figure class | `vendor product documentation` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-04 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | each teaching of Session 5 |
| References | 1 |
| Feeds | S5 `#sLib` |

### `src-irs-590b` — Publication 590-B, Distributions from Individual Retirement Arrangements (IRAs)

| | |
|---|---|
| Figure class | `none` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-12 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | any teaching of session-2 §05 |
| References | 1 |
| Feeds | case-2 `#deliverable` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| IRS-590B-001 | S2 | 2026-10-12 | **[UNVERIFIED, needs source]** | none |

### `src-irs-8606` — Form 8606, Nondeductible IRAs, and its instructions

| | |
|---|---|
| Figure class | `none` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-12 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | any teaching of session-2 §05 |
| References | 1 |
| Feeds | case-2 `#deliverable` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| IRS-8606-001 | S2 | 2026-10-12 | **[UNVERIFIED, needs source]** | none |

### `src-aa-index` — Intelligence Index methodology

| | |
|---|---|
| Figure class | `benchmark_index` |
| Index version | v4.3.2 |
| Last retrieved | 2026-10-11 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-1 Appendix A7 |
| References | 1 |
| Feeds | S1 `#s10` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| AA-INDEX-001 | S1 | 2026-10-11 | v4.3.2 | 10 evaluations; Agents 30%, Coding 20%, Scientific Reasoning 20%, General 30%; scale 0 to 100 (FACTS aa-index-definition) |

### `src-claude-web-search` — Enable and use web search

| | |
|---|---|
| Figure class | `vendor_policy` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the start of each term |
| References | 1 |
| Feeds | S0.1 `#s4` |

**Registered retrievals**

| Pull | Lesson | Retrieved | Index version | Figures it landed in |
|---|---|---|---|---|
| CLAUDE-WEB-SEARCH-001 | S0.1 | 2026-10-13 | **[UNVERIFIED, needs source]** | none typed |

### `src-3b1b-llm` — Large Language Models explained briefly (video, about 8 minutes)

| | |
|---|---|
| Figure class | `none` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the week before the session that assigns it |
| References | 1 |
| Feeds | S0.1 `#s11` |

### `src-irs-guidance-primer` — Understanding IRS guidance: a brief primer

| | |
|---|---|
| Figure class | `none` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the week before the session that assigns it |
| References | 1 |
| Feeds | S1 `#s15` |

### `src-anthropic-prompting-101` — Prompting 101 (Code w/ Claude) (video, about 25 minutes)

| | |
|---|---|
| Figure class | `none` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the week before the session that assigns it |
| References | 1 |
| Feeds | S1 `#s15` |

### `src-claude-projects-rag` — Retrieval augmented generation (RAG) for projects; What are projects?

| | |
|---|---|
| Figure class | `none` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the week before the session that assigns it |
| References | 1 |
| Feeds | S2 `#s12` |

### `src-karpathy-intro` — [1hr Talk] Intro to Large Language Models, the segment 45:43 to 58:37 (video)

| | |
|---|---|
| Figure class | `none` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-10-13 |
| Last verified by the instructor | **EMPTY** |
| Re-check before | the week before the session that assigns it |
| References | 1 |
| Feeds | S3 `#s16` |

### `src-kitces-advisortech` — The Latest in Financial AdvisorTech — AdvisorTech columns, October 2025, November 2025 and August 2026

| | |
|---|---|
| Figure class | `cumulative_counter` |
| Index version | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** |
| Re-check before | every teaching of session-3 Appendix C7 |
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
| S0.1 | `Fable 5`, `Opus 5`, `Sonnet 5` | 8 |
| S1 | `Fable 5`, `GPT-5.6`, `Kimi K3`, `Luna`, `Opus 4.7`, `Opus 4.8`, `Opus 5`, `Sol`, `Sonnet 5`, `Terra` | 59 |
| S2 | `Fable 5`, `GPT-5.6`, `Luna`, `Opus 4.8`, `Opus 5`, `Sol`, `Sonnet 5`, `Terra` | 52 |
| S3 | — | 0 |
| S4 | `Fable 5`, `Opus 4.7`, `Opus 5`, `Sonnet 5` | 7 |
| S5 | `Fable 5`, `Haiku 4.5`, `Opus 4.7`, `Opus 4.8`, `Opus 5`, `Sonnet 5` | 32 |
| case-1 | `Opus 5`, `Sonnet 5` | 10 |
| case-2 | `Opus 5`, `Sonnet 5` | 7 |
| case-3 | `Opus 5`, `Sonnet 5` | 7 |
| case-4 | `Opus 5`, `Sonnet 5` | 7 |
| case-5 | `Opus 5`, `Sonnet 5` | 7 |

**196 occurrences across 11 lessons.** This count is read off
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
