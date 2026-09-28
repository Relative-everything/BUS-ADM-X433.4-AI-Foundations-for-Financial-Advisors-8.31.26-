# SOURCES.md — one record per work

**Hand-edited. This file is the source of truth for every citation in the
corpus, and it is not scraped** (D8). `scripts/build-sources.mjs` parses it,
`scripts/inject-sources.mjs` writes the footer of every lesson from it, and
`scripts/verify-sources.mjs` reports the same three failures `verify-case.mjs`
reports, in the same words: **no sentinels**, **block was hand-edited**,
**stale against the current build**.

**One record per work, not per citation.** A work cited by four lessons has one
record here and four `used_for` lines. Before this file existed, `src-wolfram`
carried four incompatible citations of the same essay across four lessons: two
date formats, two title capitalisations, the publication name in two of four,
`<b>` against `<em>` with the anchor nested differently, and a confidence chip in
two. That is the defect this file exists to make impossible.

## What is hand-edited here and what is derived

| Hand-edited here | Derived by the generator, never typed |
|---|---|
| identity: `title`, `author`, `publisher`, `link`, `published`, `retrieved` | `total_references` |
| `confidence`, `kind`, `scope` | `cited_by[]`: lesson, section, chip count |
| live-data fields: `moving_target`, `figure_class`, `index_version`, `recheck_before` | the rendered footer entry in each lesson |
| `used_for.<lesson>`, one clause per citing lesson | `BIBLIOGRAPHY.md`, `DATA-PULL.md` |

**A count that a table also computes is never typed here.** Phase 1 found three
hand-edited counts silently out of sync with their tables and Phase 2 found nine
copies of the minute figures. `total_references` is the same failure waiting to
happen, so it does not exist as a field.

## `kind`, and how it wires to A15 by construction

`kind` is the single classification field. **Three of its values are exactly
A15's `data-nochip` enumeration**, and the generator emits `data-nochip="<kind>"`
for those three and for no others. `build-sources.mjs` asserts that its
chip-exempt set equals the checker's, so the two cannot drift apart:

| `kind` | Meaning | Chip? |
|---|---|---|
| `evidence` | evidences a claim the page makes | **required** |
| `assigned_reading` | assigned to students; also evidences claims | **required** |
| `authority` | cited descriptively, travelling with the case, evidencing no page claim | **exempt** (`data-nochip="authority"`) |
| `background` | named for the reader; no page claim rests on it | **exempt** (`data-nochip="background"`) |
| `fabricated` | **labelled exercise material that does not exist** | **exempt, and MUST NEVER carry one** |
| `case` | the declared-synthetic course anchor | chips case content only |

> **`fabricated` is not a convenience class.** `src-kessler` and `src-hallowell`
> are citations invented on purpose so students can fail to catch them. **A
> confidence chip asserts that a claim is evidenced, and the entire point of
> these two is that it is not.** Both are disclosed on the page and neither uses
> `disclose_on_page` to do it: `renderEntry()` emits **"Not a real source."** off
> `kind: fabricated`, ahead of the citation rather than after it, followed by
> "was invented for" and the lesson's `used_for` clause, and sorts the entry after
> every real source (until 2026-09-25 it read "Does not exist. … Used for:
> exercise material in …"). So a fabricated record's `used_for` clause is a
> reader-facing phrase that completes that sentence. Both also carry a
> hand-written label at their point of use. **Both are therefore
> `disclose_on_page: false`.** The flag makes the renderer print the record's
> `scope` verbatim, and their `scope` is written to the maintainer — it ends in
> an instruction in capitals about chips. That belongs in this register and not
> in a footer a student reads. `src-case` is the one record the flag is for.

---

## The eight canonical arbitrations

**Eight keys were cited by more than one lesson with materially different text,
not the seven carried into this task.** Each is resolved to one record below;
the arbitration and what was given up are recorded here rather than in a commit
message, because a reader comparing a lesson against its old footer needs to
find the reason.

| Key | Lessons | What differed | Canonical form, and why |
|---|---|---|---|
| `src-wolfram` | 1, 2, 3, 4 | two date formats (`14 February` / `February 14`), two title capitalisations, publisher named in 2 of 4, `<b>` vs `<em>`, anchor nested differently, confidence chip in 2 | **session-2's identity, session-1's completeness.** Author-date-title-publisher, sentence case for the title as the essay itself sets it, publisher named. The four `used_for` clauses are all kept: they name genuinely different sections of one essay |
| `src-aa` | 1, 2, 4 | **three different index versions and three different dates**: unversioned "as of 28 July 2026"; `v4.1.1` "retrieved August 2026"; `v4.1` "13 August 2026" | **NOT arbitrated. Recorded as a divergence and escalated to `DATA-PULL.md`.** A later version string carrying earlier data is not a formatting difference, it is a data-integrity finding. See `DATA-PULL.md` PULL-001 to PULL-003 |
| `src-case` | 1, 2, 3, 4 | four descriptions of the same synthetic household, three with a chip and one without | **session-3's, which is the fullest** and names what the case actually supplies. The others said less about the same thing |
| `src-finra2409` | 1, 3, 4 | link present in 2 of 3; `Used for:` present in 2 of 3; session-3 gives the issue date and the others do not | **session-3's date, session-1's link and scope.** No field was dropped: the union is well defined because none of the three contradicts another |
| `src-magesh` | 2, 3, 4 | volume and page in 2 of 3; title capitalisation differs; session-4 alone gives `Used for:` | **session-3's bibliographic precision** (`22(2), 216`), session-4's `used_for`. Title in the journal's own capitalisation |
| `src-pricing` | 1, 2 | `retrieved 28 July 2026` against `retrieved August 2026` | **`2026-07-28`, the specific date.** "August 2026" is not a retrieval date, it is a month. The divergence is itself a `DATA-PULL.md` entry: two retrievals of a moving target under one key |
| `src-regsp` | 3, 4 | session-3's entry was **added in Part 1** and carries a not-verified caveat; session-4's asserts both compliance dates at H | **session-4's identity, and BOTH `used_for` clauses kept verbatim** including session-3's caveat. The caveat is a per-lesson statement about verification, not a property of the rule |
| `src-secpri` | 3, 4 | session-4 gives the release date and `Used for:`; session-3 gives neither | **session-4's, which is a superset** |

> **Only `src-aa` was refused.** The other seven differed in form, and a form
> difference has a right answer. `src-aa`'s three records differ in **what they
> say the data is** — and Phase 1 measured that session-2's `v4.1.1` figures are
> *identical* to session-1's unversioned ones while session-4's earlier `v4.1`
> differs from both on every shared model. **The version string is not tracking
> the data.** Picking one would publish that defect behind a tidier label, so it
> is carried as a divergence and `DATA-PULL.md` records all three retrievals.

---

# The records

## src-wolfram

```source
title:          What is ChatGPT doing … and why does it work?
author:         Wolfram, S.
publisher:      Stephen Wolfram Writings
link:           https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/
published:      2023-02-14
last_retrieved: [UNVERIFIED, needs source]
last_verified:  2026-08-23
verified_by:    EDITORIAL.md, "Seventeen names. Instructor-verified." — the locked 17 section names of this essay, entered 2026-08-23 in commit bd8f458 and enforced by A11. Enumerating the seventeen section names requires having opened the essay.
confidence:     H
kind:           assigned_reading
moving_target:  false
scope:          The mechanism of next-token prediction, the temperature passage, tokenisation and the GPT-2 token values, embeddings and vector lengths, the parenthesis-counting limit, and the brain-scale comparison. A February 2023 essay describing a 2020-era model; three of its structural claims are stale and session-4 Appendix D3 is about exactly that.
used_for.session-1: next-token prediction, the temperature passage, tokens and the GPT-2 token values, embeddings and vector lengths, the parenthesis-counting limit, and the brain-scale comparison
used_for.session-2: the sections "It's Just Adding One Word at a Time," "Where Do the Probabilities Come From?," "What Is a Model?," the temperature passage, and the parenthesis-language discussion
used_for.session-3: assigned reading; "The Concept of Embeddings" and "Meaning Space and Semantic Laws of Motion" in §01 and §02 (the definition, the five-billion-word construction, the 768 and 12,288 lengths, alligator and crocodile); "Beyond Basic Training" in §05 (the tell-it-once observation and its limit)
used_for.session-4: the temperature passage in "It's Just Adding One Word at a Time" and the one-pass, no-loops description of the model (Appendix D3)
```

## src-case

```source
title:          The Cole household
author:         not applicable
publisher:      Constructed for this course as a classroom anchor, BUS ADM X433.4
link:           not applicable
published:      not applicable
last_retrieved: not applicable
last_verified:  not applicable
confidence:     L
kind:           case
moving_target:  false
disclose_on_page: true
scope:          Entirely synthetic. Every figure, document and family fact is invented, including the 2014 buy-sell, the 2023 appraisal and the meeting transcript. Not based on any client, living or dead.
used_for.session-1: every worked example in this session and the next three
used_for.session-2: every client example, exercise input and discussion prompt, including the three §04 fixture inputs and their three deliberately weak starter prompts, which are exercise material
used_for.session-3: the retrieval corpus, the meeting excerpt and the note-taker stage outputs written from it, the consent items, the said-or-recommended lines, the six review-update tasks and the three prompts in §08 with the summary they run on, the checklist, the illustrative meaning-space map whose coordinates were assigned rather than learned, and the six summary lines in Appendix A3, two of which are written wrong on purpose and labelled so on the page
used_for.session-4: every client, prompt, message, record, incident and sample package in this session's exercises, all written for this lesson
```

## src-aa

```source
title:          Artificial Analysis Intelligence Index and cost-per-task figures
author:         Artificial Analysis
publisher:      Artificial Analysis
link:           https://artificialanalysis.ai/models
published:      not applicable
last_retrieved: 2026-08-13
last_verified:
retrieval_note: PULL-002 (session-2) carries a PARTIAL DATE, "2026-08". A month cannot be ordered against a day, which is where this record's version incoherence hid. The ordering rule now reports every partial date as a precondition failure AND orders it at its earliest possible day, so the v4.1.1 -> v4.1 regression against PULL-003 still fires.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   benchmark_index
index_version:  divergent, see the three pulls below
recheck_before: every teaching of session-1 §05, session-2 §02 and session-4 Appendix D3
scope:          A live leaderboard of capability index scores and cost per index task. Every figure drawn from it is a moving target and none of them is stable between terms.
used_for.session-1: the capability-against-price frontier and the tier comparison
used_for.session-2: index scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5; how the cost per index task is measured and the kinds of question the index draws on, described in general terms
used_for.session-4: benchmarks now reporting tokens and turns per task (Appendix D3)
last_retrieved.session-1: 2026-07-28
index_version.session-1: [UNVERIFIED, needs source]
figures.session-1: index scores and cost per index task for the frontier chart; the body dates the pull 17 and 24 July and the footer dates it 28 July
last_retrieved.session-2: 2026-08
index_version.session-2: v4.1.1
figures.session-2: index scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5; IDENTICAL to the session-1 pull under a later version string
last_retrieved.session-4: 2026-08-13
index_version.session-4: v4.1
figures.session-4: none typed since 2026-09-25; the frontier and divergence charts left the page with the rebuild
```

## src-magesh

```source
title:          Hallucination-free? Assessing the reliability of leading AI legal research tools
author:         Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. D., & Ho, D. E.
publisher:      Journal of Empirical Legal Studies 22(2), 216
link:           https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/
published:      2025
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          Over 200 preregistered legal queries, expert hand-scored, against Lexis+ AI, Westlaw AI-Assisted Research and GPT-4. Tools tested May 2024 — a historical fixture. The measured rates belong to the tools as they were on that date and must never be "updated".
used_for.session-2: the measured hallucination rates for legal research tools
used_for.session-3: the >17% / ~33% / 43% rates, the claim that tools made statements unsupported by the sources they cited, and the cross-study comparability caveat
used_for.session-4: the 17%, 33% and 43% per-question error rates behind the 100-memo simulation (§06)
```

## src-openai-pricing

```source
title:          API pricing
author:         OpenAI
publisher:      OpenAI Platform
link:           https://openai.com/api/pricing/
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: The GPT-5.6 Sol, Terra and Luna rates in session-2 §02 entered the repository with the 2026-08 pull and no retrieval was recorded for them. openai.com was egress-blocked on 2026-09-12 when this record was written, so the rates are carried at M until the DW-081 re-pull records a retrieval.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   price
recheck_before: every teaching of session-2 §02
scope:          Per-token input and output rates for the GPT-5.6 Sol, Terra and Luna tiers, as carried in session-2's MODELS array.
used_for.session-2: the OpenAI rates behind the blended token price and the cost estimator
```

## src-pricing

```source
title:          Pricing
author:         Anthropic
publisher:      Claude Platform Docs
link:           https://platform.claude.com/docs/en/about-claude/pricing
published:      not applicable
last_retrieved: 2026-09-13
last_verified:
retrieval_note: Fetched in full 2026-08-25 for Phase 3.5, and again in full 2026-09-13 for the session-2 retrieval bridge; the table is unchanged for Sonnet 5, Opus 5 and Fable 5, and the FAQ gives the rule of thumb of one token to about 0.75 words. PULL-002 (session-2) carried a PARTIAL DATE, "2026-08", until the 2026-09-13 pull replaced it.
content_changed: 2026-08-25. The page now states that Sonnet 5's $2 / $10 introductory pricing "is now the standard price" and that "the previously scheduled increase to $3/$15 per million input/output tokens on September 1, 2026 will not occur". The 2026-07-28 pull recorded the increase as scheduled. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-08-25 in Phase 3.6: session-1 §10's second Sonnet 5 table row and its "rises 50% tomorrow" note both carried the cancelled rise and are gone; the surviving row states $2 / $10 / $0.20 with no date on it. Three script arrays carried the same cancelled figure and were corrected with it — TIERS (§03 cost boxes), PATHS (§06 practice cost) and DPT (§06 document pass), the last two of which also printed the label "Sonnet 5 (from 1 Sep)" on screen. session-2 §02's "Sonnet 5 lists at $2 in / $10 out per million tokens" was UNAFFECTED and is the standing price. Phase 3.5 flagged rather than resolved; Phase 3.6 resolved on instruction.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   price
recheck_before: every teaching of session-1 §03, §05 and §06
scope:          Per-token input and output rates by model, cache-hit and batch discounts.
used_for.session-1: per-token rates, cache and batch discounts, and the Cole document-pass arithmetic
used_for.session-2: the published rates behind the blended token price, and the five-to-one output-to-input price ratio and the 0.75-words-per-token rule of thumb in the retrieval bridge
last_retrieved.session-1: 2026-08-25
figures.session-1: per-token input and output rates, cache-hit and batch discounts
last_retrieved.session-2: 2026-09-13
figures.session-2: the published rates behind the blended token price at a 3:1 input-to-output ratio; the per-tier input and output rates and the 0.75 rule of thumb quoted in the retrieval bridge
```

## src-context-windows

```source
title:          Context windows
author:         Anthropic
publisher:      Claude Platform Docs
link:           https://platform.claude.com/docs/en/build-with-claude/context-windows
published:      not applicable
last_retrieved: 2026-09-13
last_verified:
retrieval_note: Fetched in full 2026-09-13 for the session-2 retrieval bridge. Three sentences carry the lesson's claims. On contents, everything in the request counts toward the context window, the system prompt, every message including tool results, images and documents, and the tool definitions. On accumulation, each turn's input phase contains all previous conversation history plus the current user message, and previous turns are preserved completely. On degradation, as token count grows, accuracy and recall degrade, a phenomenon the page names context rot. The page adds that chat interfaces such as claude.ai can manage the window on a rolling first-in, first-out basis.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-2 §00
scope:          What the context window contains, how turns accumulate, that all of it is counted as input, and the vendor's statement that accuracy and recall degrade as the token count grows. The page gives the direction of the degradation and no threshold, turn count or rate.
used_for.session-2: the retrieval bridge's context item and the two reasons behind its new-chat item
used_for.session-3: what the context window contains, and that everything attached and the conversation so far counts, in Appendix A1
last_retrieved.session-2: 2026-09-13
figures.session-2: none typed; the keys paraphrase the page's sentences
```

## src-api-messages

```source
title:          Messages API reference
author:         Anthropic
publisher:      Claude Platform Docs
link:           https://platform.claude.com/docs/en/api/messages
published:      not applicable
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Fetched 2026-09-13 for session-2 §01. The temperature parameter is marked deprecated for models released after Claude Opus 4.6, with 1.0 accepted for backwards compatibility and other values rejected with a 400 error; it defaults to 1.0 and ranges 0.0 to 1.0; the page states that even with temperature of 0.0 the results will not be fully deterministic.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-2 §01
scope:          The Messages API reference as read on 2026-09-27: temperature is marked deprecated ("Models released after Claude Opus 4.6 do not support setting temperature. A value of 1.0 will be accepted for backwards compatibility, all other values will be rejected with a 400 error"); the effort parameter ("How much effort the model should put into its response") takes low, medium, high, xhigh or max; thinking can be enabled with a token budget, disabled, or adaptive, where the model decides.
used_for.session-2: §01's list of what can differ between two runs and the third consequence card
last_retrieved.session-2: 2026-09-13
figures.session-2: none typed
used_for.session-4: temperature, deprecated on current Claude models (Appendix D3)
```

## src-finra2409

```source
title:          Regulatory Notice 24-09
author:         Financial Industry Regulatory Authority
publisher:      FINRA
link:           https://www.finra.org/rules-guidance/notices/24-09
published:      2024-06-27
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          FINRA's position that existing rules reach generative AI and that supervision is not suspended by the technology. Creates no new obligations.
used_for.session-1: the position that existing rules apply to generative AI and that supervision is not suspended by the technology
used_for.session-4: FINRA's position that its rules are technology neutral and that its AI notice adds no new requirement (§01)
```

## src-regsp

```source
title:          Regulation S-P: Privacy of consumer financial information and safeguarding customer information, 2024 amendments
author:         U.S. Securities and Exchange Commission
publisher:      SEC, adopting release
link:           [UNVERIFIED, needs source]
published:      2024
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
figure_class:   regulatory_date
scope:          The four obligations of the 2024 amendments: a written incident response program; customer notification no later than 30 days after the firm becomes aware; service provider oversight, including the service provider's notice to the firm within 72 hours of becoming aware of a breach; and recordkeeping. The definition and scope limits of nonpublic personal information at 17 CFR 248.3, including the fact that an individual is a customer and information disclosed in a manner indicating the individual is a customer. The compliance dates 3 December 2025 and 3 June 2026.
used_for.session-4: what counts as nonpublic personal information (§02); vendor oversight and the vendor's 72-hour notice to the firm (§04); the 30-day client notice and the incident response programme (Appendix D5)
used_for.session-3: the privacy notice, the written incident response programme and the 30-day notification, named in §09b as obligations owed apart from any note-taker and taught in Session 4
```

## src-secpri

```source
title:          Examination priorities: Fiscal year 2026, §VII
author:         U.S. Securities and Exchange Commission, Division of Examinations
publisher:      SEC
link:           [UNVERIFIED, needs source]
published:      2025-11-17
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
retrieval_note: sec.gov is egress-blocked from the build (2026-09-27). §VII's contents in scope are as reported by several consistent law-firm and compliance-firm summaries of the 17 November 2025 release; the record's H stands on the earlier verification of the AI and Regulation S-P focus, and the §05 use of the polymorphic-malware line is chipped M on the page for that reason.
scope:          §VII, Risk Areas Impacting Various Market Participants. Information security and operational resiliency, including ransomware, data loss prevention, incident response and the 2024 amendments to Regulation S-P; emerging financial technology and AI, including the accuracy of AI representations and a review of training and security controls for risks from AI and polymorphic malware attacks.
used_for.session-4: the fiscal 2026 examination priorities naming AI and Regulation S-P (§01); its line on training and security controls for AI and polymorphic malware (§05)
```

## src-kalai

```source
title:          Why language models hallucinate
author:         Kalai, A. T., Nachum, O., Vempala, S. S., & Zhang, E.
publisher:      arXiv:2509.04664, §1 and §1.2
link:           [UNVERIFIED, needs source]
published:      2025
last_retrieved: 2025-05-11
last_verified:
confidence:     H
kind:           assigned_reading
moving_target:  false
scope:          Why a model guesses rather than abstains, and the two scoring rules. The model tested was DeepSeek-V3 on 11 May 2025 — a historical fixture; the finding is about that model on that date.
used_for.session-1: why a model guesses rather than abstains, and the two scoring rules
```

## src-rohrer

```source
title:          Interleaved practice improves mathematics learning
author:         Rohrer, D., Dedrick, R. F., & Stershic, S.
publisher:      Journal of Educational Psychology, 107(3), 900–908
link:           https://doi.org/10.1037/edu0000001
published:      2015
last_retrieved: 2026-08-29
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          Cited ONLY for the design claim that interleaving categories during classification practice beats blocking them, which is what the section 08 deck order does. Bibliographic identity confirmed 2026-08-29 against three independent listings — the ERIC index record EJ1071568, the publisher's abstract page for doi 10.1037/edu0000001, and the author's own publication list at uweb.cas.usf.edu/~drohrer, which hosts the full text. The full text was not pulled into this build environment, so no figure or effect size from it appears anywhere in the corpus.
used_for.session-1: the interleaved deck order of the section 08 card sort
```

## src-sampling

```source
title:          LLM sampling visualiser
author:         artefact2
publisher:      GitHub Pages
link:           https://artefact2.github.io/llm-sampling/
published:      [UNVERIFIED, needs source]
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          The nine sampler controls and their interaction. Behaviour reimplemented in Appendix A5, not embedded; no code or asset is loaded from it.
used_for.session-1: the nine sampler controls reimplemented in Appendix A5
```

## src-sec-ai

```source
title:          Enforcement actions against Delphia (USA) Inc. and Global Predictions, Inc.
author:         U.S. Securities and Exchange Commission
publisher:      SEC
link:           [UNVERIFIED, needs source]
published:      2024-03-18
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     M
kind:           evidence
moving_target:  false
scope:          The two AI-washing settlements and their penalty amounts. Penalty figures are reported at two values across sources; the page states the majority figure.
used_for.session-1: the AI-washing settlements and their penalty amounts
used_for.session-4: the two AI-washing penalties under the Marketing Rule (§01)
```

## src-anthropic-ctx

```source
title:          Contextual retrieval in AI systems
author:         Anthropic
publisher:      Anthropic Engineering
link:           https://www.anthropic.com/engineering/contextual-retrieval
published:      2024-09-19
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          Top-20-chunk retrieval failure rates — baseline 5.7%, contextual embeddings 3.7%, plus contextual BM25 2.9%, plus reranking 1.9% — and the stated ~200,000-token threshold below which the whole corpus beats retrieval. Vendor-reported benchmarks on codebases, fiction and research papers, not advisory documents.
used_for.session-3: the measured retrieval failure rates, the 67% reduction, and the 200,000-token boundary condition
```

## src-vectara

```source
title:          Introducing the next generation of Vectara's hallucination leaderboard
author:         Vectara
publisher:      Vectara
link:           https://www.vectara.com/blog/introducing-the-next-generation-of-vectaras-hallucination-leaderboard
published:      2025-11-19
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: Fetch of the cited link ATTEMPTED 2026-08-25 and REFUSED before it reached the source: www.vectara.com is blocked by the build environment's egress policy (403 on CONNECT), so last_retrieved stays unresolved — the cited blog post itself was never loaded. A SURROGATE was reachable and was read: Vectara's own hallucination-leaderboard repository, fetched 2026-08-25, last updated 2026-05-11, HHEM-2.3, 123 models. Reading a surrogate is not retrieving the source.
content_changed: 2026-08-25. THE MEASUREMENTS HOLD; THE SUPERLATIVE IS STALE. Every per-model rate session-3 quotes is still on the live board — Gemini-3-Pro 13.6%, Claude Sonnet 4.5 12.0%, GPT-OSS-120B 14.2%, DeepSeek-R1 11.3%, gemini-2.5-flash-lite 3.3%. But 3.3% is now RANK 3, not the floor; the floor is 1.8%. DEPENDENT LESSON ELEMENTS: session-3's HALL chart array labels 3.3% 'Best model, grounded' at :2010, and the toggle panel teaches the grounded range as '3.3% to above 13%' at :2139. Both are superlatives about a leaderboard that has moved past them; the numbers themselves are unchanged. Separately, this record's `scope` asserts a 32K-token length and a 3,792 / 3,939 complexity split that the reachable artifact does not state — it says '50 words to as long as 24K words' and gives no split. NOT silently updated.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   leaderboard_position
recheck_before: every teaching of session-3 §05
scope:          Dataset size, 32K-token length, domain mix, the low/high complexity split of 3,792 and 3,939, the leaderboard prompt, and the named per-model rates. A live leaderboard: the named model rates move.
```

## src-kitces-notetakers

```source
title:          Best AI notetakers for financial advisor meetings: Adoption, satisfaction, and trends
author:         Kitces.com
publisher:      Kitces.com
link:           https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/
published:      2025-01-15
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          Drawing on Kitces Research on Advisor Productivity, fielded autumn 2024: the greater-than-1:1 prep-and-follow-up ratio, the solo-versus-team adoption pattern, the UHNW drop-off, and the roughly fourfold rate for most-extensive against most-targeted plans.
used_for.session-3: the prep-and-follow-up ratio (§07), the whole-cycle tooling (§06), and the adoption-against-satisfaction ranking with the $60 to $80 pricing (Appendix C3)
```

## src-lee-cognitive

```source
title:          The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers
author:         Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N.
publisher:      Microsoft Research; CHI 2025
link:           [UNVERIFIED, needs source]
published:      2025
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     M
kind:           evidence
moving_target:  false
scope:          Characterised on the page ONLY by its title claim of self-reported reductions in cognitive effort. No claim is made about the size or direction of any measured effect on verification behaviour, and its full findings were not re-verified in this build.
used_for.session-3: the title claim of self-reported reductions in cognitive effort, in the Appendix C4 discussion
```

## src-wiretap

```source
title:          Cal. Penal Code § 637.2(a)(1), (c); 18 U.S.C. § 2511
author:         State of California; United States Congress
publisher:      Statutory text
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
figure_class:   regulatory_date
scope:          The two-party consent exposure behind the recording-consent section: the California private right of action and the federal wiretap statute.
used_for.session-3: the federal one-party consent floor in §09
```

## src-iskowitz

```source
title:          AI notetakers and compliance in wealth management: What firms need to know
author:         Iskowitz, C.
publisher:      WealthTech Today
link:           [UNVERIFIED, needs source]
published:      2025-07-29
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     M
kind:           assigned_reading
moving_target:  false
scope:          The compliance framing around note-takers: that an AI summary is a firm record however it is stored, the three things examiners are reported to ask for (written AI-use policies, review of output before it becomes the record, vendor risk assessment), the human-review and edit-trail practices, the retention and high-stakes-meeting rules, and the ACA Group 2024 figure of 12%. A trade publication relaying the SEC and FINRA positions rather than quoting rule text, which is why the chip is M and why session-3 quotes no rule text from it.
used_for.session-3: the six documents in §09b, the 12% figure behind its prediction commit, and the compliance framing in §09
```

## src-kitces-advisortech

```source
title:          The Latest in Financial AdvisorTech — AdvisorTech columns, October 2025, November 2025 and August 2026
author:         Kitces.com
publisher:      Kitces.com
link:           [UNVERIFIED, needs source]
published:      2026-08
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: www.kitces.com is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work.
confidence:     M
kind:           background
moving_target:  true
figure_class:   cumulative_counter
recheck_before: every teaching of session-3 Appendix C3
scope:          Note-taker adoption shares and category consolidation. Named for the reader; no page claim currently rests on it.
```

## src-laplace

```source
title:          A philosophical essay on probabilities
author:         Laplace, P. S.
publisher:      Truscott & Emory, Trans.; original work published 1814. Chapter II, "Concerning Probability," pp. 3-8
link:           [UNVERIFIED, needs source]
published:      1902
last_retrieved: not applicable
last_verified:
confidence:     H
kind:           background
moving_target:  false
scope:          The 1814 argument that probability describes what the observer does not know rather than what the world does. Assigned reading for Appendix B2; the appendix restates the argument rather than resting a measured claim on it.
used_for.session-2: assigned reading behind Appendix B2; no measured claim rests on it
```

## src-google-ptcf

```source
title:          Gemini for Workspace: Prompting guide 101
author:         Google
publisher:      Google
link:           [UNVERIFIED, needs source]
published:      2024
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          The Persona-Task-Context-Format framework that session-2 §03 teaches and §04 scores against.
used_for.session-2: the Persona-Task-Context-Format framework taught in §03 and scored in §04
```

## src-zheng-persona

```source
title:          When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models
author:         Zheng, M., Pei, J., Logeswaran, L., Lee, M., & Jurgens, D.
publisher:      Findings of the Association for Computational Linguistics: EMNLP 2024
link:           https://aclanthology.org/2024.findings-emnlp.888/
published:      2024
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          The study design and its null result: adding a persona to a system prompt did not improve measured performance.
used_for.session-2: the study design and null result behind the caution on personas
```

## src-anthropic-fluency

```source
title:          AI fluency: Frameworks and foundations
author:         Anthropic
publisher:      Anthropic
link:           [UNVERIFIED, needs source]
published:      2025
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           background
moving_target:  false
scope:          The Delegation, Description, Discernment, Diligence framing. Assigned reading; no page claim rests on it.
used_for.session-2: assigned reading; no page claim rests on it
```

## src-dahl-fictions

```source
title:          Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models
author:         Dahl, M., Magesh, V., Suzgun, M., & Ho, D. E.
publisher:      Stanford RegLab / Institute for Human-Centered AI
link:           [UNVERIFIED, needs source]
published:      2024
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          General-purpose models over more than 800,000 verifiable legal questions, 58-88% hallucination; GPT-4 58%, GPT-3.5 69%, Llama 2 88%. Those three model names are a HISTORICAL FIXTURE: the finding is about those models and updating them to current names would falsify it.
used_for.session-2: the general-purpose model hallucination rates in the citation-failure section
```

## src-charlotin

```source
title:          AI Hallucination Cases database
author:         Charlotin, D.
publisher:      HEC Paris
link:           [UNVERIFIED, needs source]
published:      not applicable
last_retrieved: 2026-06
last_verified:
retrieval_note: PARTIAL DATE. The day was never recorded. The pull captured a count the source itself dates "as of 9 June 2026" (session-2:1669) and the text entered the repo on 2026-08-15, so the retrieval falls in 2026-06-09..2026-06-30. Not narrowed further, and no day is invented.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   cumulative_counter
recheck_before: every teaching of session-2 §07
scope:          A running count of court cases in which fabricated citations were filed. Cumulative counts as reported through a secondary tracker; the number only ever rises.
used_for.session-2: the cumulative count of filed fabricated citations
```

## src-t3-survey

```source
title:          Software Survey 2026
author:         T3 / Inside Information
publisher:      as summarised in Kitces.com Weekend Reading, March 2026
link:           [UNVERIFIED, needs source]
published:      2026-03
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          n = 2,906 advisors, 95% at fee-only RIA or dually registered firms. 52.2% using AI search and generative language, 42.9% using AI notetaking.
used_for.session-2: the adoption shares in the Appendix B4 adoption-gap discussion
```

## src-kitces-productivity

```source
title:          Kitces Research on Advisor Productivity
author:         Kitces.com
publisher:      as summarised in The Latest in Financial AdvisorTech, Kitces.com
link:           [UNVERIFIED, needs source]
published:      2026-08
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     M
kind:           evidence
moving_target:  false
scope:          Approximately one hour of note, summary and follow-up work per two-hour client meeting. The reliance figure travelling with it is reported via Advisor360 and Kitces Research through a secondary aggregator and is directional only.
used_for.session-2: the prep-and-follow-up hour ratio and the directional reliance figure
```

## src-morningstar

```source
title:          AI for advisors: Enhancing client conversations
author:         Morningstar
publisher:      Morningstar
link:           [UNVERIFIED, needs source]
published:      2025-10-15
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     M
kind:           background
moving_target:  false
scope:          Assigned reading for session-2. No page claim rests on it.
used_for.session-2: assigned reading; no page claim rests on it
```

## src-irc

```source
title:          Internal Revenue Code §§ 671, 675, 2036, 2702, 7520
author:         United States Congress
publisher:      Statutory text
link:           [UNVERIFIED, needs source]
published:      not applicable
last_retrieved: not applicable
last_verified:
confidence:     H
kind:           authority
moving_target:  false
scope:          Referenced descriptively as the sections the Cole structure turns on. Verify against the current Code before relying on any characterisation in the corpus. No page claim is evidenced by it.
used_for.session-2: named descriptively alongside the case structure; evidences no page claim
```

## src-rr8513

```source
title:          Rev. Rul. 85-13, 1985-1 C.B. 184
author:         Internal Revenue Service
publisher:      Internal Revenue Bulletin
link:           [UNVERIFIED, needs source]
published:      1985
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           authority
moving_target:  false
scope:          A transfer of assets between a grantor and a grantor trust is not recognised as a sale for federal income tax purposes. Existence and holding verified against IRS materials citing the ruling and the published text. Travels with the case; evidences no page claim.
used_for.session-2: cited descriptively in the citation-verification exercise; evidences no page claim
```

## src-rr200464

```source
title:          Rev. Rul. 2004-64, 2004-2 C.B. 7 (2004-27 I.R.B. 9)
author:         Internal Revenue Service
publisher:      Internal Revenue Bulletin
link:           https://www.irs.gov/irb/2004-27_IRB
published:      2004
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           authority
moving_target:  false
scope:          The grantor's payment of income tax on grantor-trust income is not a gift (Situation 1); a governing instrument that requires reimbursement causes inclusion of the full trust value under § 2036(a)(1) (Situation 2); a trustee's discretion to reimburse does not by itself cause inclusion (Situation 3). Verified against the Internal Revenue Bulletin text.
used_for.session-2: cited descriptively in the citation-verification exercise; evidences no page claim
```

## src-woelbing

```source
title:          Estate of Donald Woelbing v. Commissioner, T.C. Docket No. 30261-13, and Estate of Marion Woelbing v. Commissioner, T.C. Docket No. 30260-13
author:         United States Tax Court
publisher:      Tax Court docket
link:           [UNVERIFIED, needs source]
published:      2013-12-26
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           authority
moving_target:  false
scope:          Petitions filed 26 December 2013; stipulated decisions entered 25 and 28 March 2016; no opinion issued; NO PRECEDENTIAL VALUE. Procedural posture verified against contemporaneous practitioner reporting. The teaching point is the posture, not a holding.
used_for.session-2: cited descriptively for its procedural posture; evidences no page claim
```

## src-davidson

```source
title:          Estate of William M. Davidson v. Commissioner, T.C. Docket No. 13748-13
author:         United States Tax Court
publisher:      Tax Court docket
link:           [UNVERIFIED, needs source]
published:      2013-06-14
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     M
kind:           authority
moving_target:  false
scope:          Petition filed 14 June 2013; stipulated decision entered 6 July 2015; no opinion issued. The IRS originally asserted deficiencies of approximately $2.8 billion; the reported settlement is approximately $388 million in estate, gift and GST tax. Posture is H; the settlement figures are reported by a single valuation-practice source and are M.
used_for.session-2: cited descriptively for its procedural posture; evidences no page claim
```

## src-kessler

```source
title:          Kessler v. Commissioner, 152 T.C. 88 (2019)
author:         not applicable
publisher:      not applicable
link:           not applicable
published:      not applicable
last_retrieved: not applicable
last_verified:  not applicable
confidence:     not applicable
kind:           fabricated
moving_target:  false
disclose_on_page: false
scope:          A deliberately fabricated citation, appearing in the session-2 §07 triage as exercise material so that students practise failing to catch it. MUST NEVER CARRY A CONFIDENCE CHIP: a chip asserts the claim is evidenced, and the whole point is that it is not.
used_for.session-2: the §07 citation triage, where it is one of the citations to check and the page labels it as fabricated
```

## src-hallowell

```source
title:          Hallowell v. Commissioner, T.C. Memo. 2023-217
author:         not applicable
publisher:      not applicable
link:           not applicable
published:      not applicable
last_retrieved: not applicable
last_verified:  not applicable
confidence:     not applicable
kind:           fabricated
moving_target:  false
disclose_on_page: false
scope:          A deliberately fabricated citation used as exercise material in the session-4 §07 record sorter (record 6), labelled in the answer key and the section's source line. MUST NEVER CARRY A CONFIDENCE CHIP.
used_for.session-4: the §07 exercise, where it is the case cited in record 6 and the answer key names it as invented
```

## src-finra2026

```source
title:          2026 Annual Regulatory Oversight Report
author:         Financial Industry Regulatory Authority
publisher:      FINRA
link:           [UNVERIFIED, needs source]
published:      2025-12-09
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          FINRA's first standalone generative-AI section: enterprise-level supervisory processes, controls for hallucinations, bias, cybersecurity and threat-actor use, ongoing human monitoring, and novel oversight for agents that can act or transact.
used_for.session-4: generative AI's section in the 2026 report (§01); supervision, with added oversight and logging for AI agents that act or transact (§07)
```

## src-finra-inj

```source
title:          Understanding Generative AI and Prompt Injection Fundamentals
author:         Financial Industry Regulatory Authority
publisher:      FINRA
link:           [UNVERIFIED, needs source]
published:      2026-03-06
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          A self-regulatory organisation publishing a standalone primer on an attack technique, which is the evidence for the claim that prompt injection has left the research literature.
used_for.session-4: FINRA's March 2026 primer on prompt injection (§05)
```

## src-daly

```source
title:          Artificial Intelligence and the Future of Investment Management
author:         Daly, B., Director, Division of Investment Management
publisher:      ICI Winter Board Meeting
link:           https://www.sec.gov/newsroom/speeches-statements/daly-020326-artificial-intelligence-future-investment-management-remarks-investment-company-institute-ici-winter
published:      2026-02-03
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: The link is the sec.gov address the search engine returned on 2026-09-27 for this title, date and venue (Manalapan, Florida, delivered virtually). sec.gov is egress-blocked from the build, so the page itself was not re-read; the scope below stands on the earlier verification.
confidence:     H
kind:           evidence
moving_target:  false
scope:          NARROW, AND IT WAS READ TOO WIDELY. The speech states that the core questions remain open — whether an AI tool is marketing, advice or something requiring registration; who is responsible when output is wrong; how it is supervised — and asks for comment rather than announcing an answer. It says NOTHING about watermarking, SynthID, benchmark scores or model token counts, and it was chipped to four such claims before Phase 3 Part 1.
used_for.session-4: the open questions on responsibility and supervision for AI output (§01)
```

## src-zhao

```source
title:          Invisible image watermarks are provably removable using generative AI
author:         Zhao, X., Zhang, K., Su, Z., Vasan, S., Grishchenko, I., Kruegel, C., Vigna, G., Wang, Y.-X., & Li, L.
publisher:      Advances in Neural Information Processing Systems (NeurIPS 2024)
link:           https://arxiv.org/abs/2306.01953
published:      2024
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: THE PAPER ITSELF WAS NEVER LOADED, so last_retrieved is unresolved. arxiv.org, proceedings.neurips.cc, openreview.net, dl.acm.org and semanticscholar.org are all blocked by the build environment's egress policy (403 on CONNECT). Identity was established on 2026-08-25 from the AUTHORS' OWN REPOSITORY, github.com/XuandongZhao/WatermarkAttacker, which was reachable and returned the official BibTeX and a NeurIPS 2024 badge verbatim, corroborated by six independent search-index entries (arXiv 2306.01953, OpenReview 7hy5fy2OC6, NeurIPS 2024 poster 96428, an ACM DL DOI, a Semantic Scholar record, and the proceedings PDF path). A repository is not the paper and a search index is not a retrieval, so no date is written for either. [UNVERIFIED, needs source] for the proceedings volume and page range.
confidence:     H
kind:           evidence
moving_target:  false
scope:          The regeneration attack only: add random noise to destroy the embedded signal, then reconstruct the image with a denoiser or a pre-trained diffusion model. Formal proofs plus evaluation against pixel-level schemes; the removal guarantee is proved for watermarks that perturb the image within a bounded distance. It does NOT reach latent- or semantic-binding schemes, and it is NOT the source of the 2026 mutual-information result cited in the same sentence — that is arXiv 2602.20680, which has no key here and was not read.
```

## src-owasp

```source
title:          Top 10 for LLM Applications and Top 10 for Agentic Applications
author:         OWASP
publisher:      OWASP
link:           https://owasp.org/www-project-top-10-for-large-language-model-applications/
published:      [UNVERIFIED, needs source]
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: Fetch of the cited link ATTEMPTED 2026-08-25 and REFUSED before it reached the source: owasp.org and genai.owasp.org are both blocked by the build environment's egress policy (403 on CONNECT), so last_retrieved stays unresolved — the cited page itself was never loaded. A SURROGATE was reachable and was read: the GitHub repository backing that exact project page, fetched 2026-08-25. Reading a surrogate is not retrieving the source and no date is written for one.
content_changed: 2026-08-25. THE SOURCE HAS MOVED. Established from the project's own GitHub repository, which the blocked page is built from. OWASP's own words describe the cited project page as maintained as a historical archive; active development moved to github.com/GenAI-Security-Project/GenAI-LLM-Top10 and a new edition, OWASP GenAI LLM Top 10 2026, was published 2026-08-04. DEPENDENT LESSON ELEMENTS: session-4 §05's claim that prompt injection is LLM01 SURVIVES the move intact — it is LLM01:2026 Prompt Injection in the new edition, and is now anchorable to a dated edition instead of an undated page. The CITATION does not survive: the `link` field points at an archive. The 'six of ten agentic categories' half of the same sentence is separately UNCONFIRMED — an Agentic Top 10 2026 v1.0 exists (published 2025-12-01) but sits on no reachable host and its category count was not read. NOT silently updated.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   leaderboard_position
recheck_before: no lesson cites this record since the 2026-09-25 session-4 rebuild
scope:          The LLM01 ranking for prompt injection and the mapping into six of ten agentic categories. The ranking is revised between editions, so the position is a moving target even though the finding is not.
used_for.session-4: least privilege and human approval for high-risk actions as the fixes that hold against prompt injection (§05)
```

## src-cve

```source
title:          CVE-2025-32711 (EchoLeak, CVSS 9.3)
author:         MITRE / NVD
publisher:      Public CVE record
link:           [UNVERIFIED, needs source]
published:      2025
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          Identifier, score and mechanism of EchoLeak, verified against the public record: one crafted email could make Microsoft 365 Copilot send internal data out with no click. Kind was background until 2026-09-25, when the §05 bullet stating that mechanism was found resting on it unchipped (A20); it is now the chip on that claim. CurXecute (CVE-2025-54135) left the title with the rebuild that took it off the page.
used_for.session-4: the public vulnerability record for EchoLeak (§05)
```

## src-gartner

```source
title:          Survey of 302 security leaders
author:         Gartner
publisher:      Gartner
link:           [UNVERIFIED, needs source]
published:      2025
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     M
kind:           evidence
moving_target:  false
scope:          62% of organisations experiencing at least one deepfake attack in twelve months, 37% on a live video call. A single vendor survey, n = 302.
```

## src-deloitte

```source
title:          Generative-AI fraud projection
author:         Deloitte Center for Financial Services
publisher:      Deloitte
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     M
kind:           evidence
moving_target:  false
scope:          US GenAI-enabled fraud losses projected from $12.3bn (2023) to $40bn (2027). A PROJECTION, NOT A MEASUREMENT, and the page says so.
used_for.session-4: the projected scale of generative-AI fraud, labelled a projection on the four-attack board (§05)
```

## src-surfshark

```source
title:          2026 deepfake-loss analysis
author:         Surfshark
publisher:      Surfshark, as reported by two outlets
link:           [UNVERIFIED, needs source]
published:      2026
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     L
kind:           evidence
moving_target:  false
scope:          Two outlets citing the same analysis report $2.19bn and $3.7bn. Carried on the page as an unresolved disagreement rather than a resolved figure, which is why its confidence is L.
```

## src-arup

```source
title:          Reporting on the Arup deepfake incident
author:         Financial Times
publisher:      Financial Times
link:           [UNVERIFIED, needs source]
published:      2024-05
last_retrieved: [UNVERIFIED, needs source]
last_verified:
confidence:     H
kind:           evidence
moving_target:  false
scope:          Approximately $25 million across 15 transfers. The one deepfake figure the course endorses putting in front of a client.
used_for.session-4: the Arup deepfake video-call loss (§05)
```

## src-synthid

```source
title:          SynthID
author:         Google DeepMind
publisher:      Google DeepMind
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: the Google DeepMind host is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work. STILL OPEN AFTER 2026-08-25, and this record now says which references are open rather than leaving them to be counted by hand. `src-synthid-text` was added that day for a page that WAS retrieved, and it closed exactly one of the eleven references — session-4:1476, the factual-responses claim. The other ten remain on this key and this page has still never been loaded: :1412 and :1416 are C2PA metadata and soft-binding claims that belong to the C2PA specification rather than to Google; :1425 and :1440 are the tournament-sampling mechanism, whose real authority is the Nature paper the retrieved page names and which no build has read either; :1443 and :1457 are image, video and audio robustness, which the retrieved page does not cover at all; :1460 is the adoption-figure paragraph, whose second sentence asserts what a page nobody has loaded currently says and now carries [UNCONFIRMED]; :1493 is the formatter-erases-the-slack claim; :1500 chips a sentence whose sources are Zhao, two arXiv preprints and Christ. Registered in docs/deferred-work.md as session-4 work.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: no lesson cites this record since the 2026-09-25 session-4 rebuild
scope:          Tournament sampling in text, perturbation in image and video, and the frequency-domain approach in audio. Adoption is a vendor decision and changes; the mechanism does not.
used_for.session-4: the pixel-level image watermark that survives a screenshot (Appendix D1)
```

## src-synthid-text

```source
title:          SynthID: Tools for watermarking and detecting LLM-generated Text
author:         Google
publisher:      Google (Responsible Generative AI Toolkit)
link:           https://ai.google.dev/responsible/docs/safeguards/synthid
published:      2025-04-09
last_retrieved: 2026-08-25
last_verified:
retrieval_note: The 2025-04-09 in `published` is the page's OWN last-updated stamp, in UTC, not a publication date; it is a living documentation page and the stamp is the only date it carries. RETRIEVED OUTSIDE THIS BUILD ENVIRONMENT: the instructor's analyst surface loaded the page on 2026-08-25 and supplied the substantiations recorded in `scope`. This environment answers 403 on CONNECT for the host, so no generator here has read the page and none can re-check it. A retrieval is not a reading, so `last_verified` is EMPTY and stays that way until a human attests at a terminal.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 Appendices D1 and D2
scope:          TEXT WATERMARKING ONLY. The boundary is load-bearing, because the sibling record `src-synthid` is cited for image, video and audio claims that this page does not reach. What it substantiates, and nothing outside this list: detection is probabilistic and returns watermarked, not watermarked, or uncertain, against two tunable thresholds; the signal survives cropping, changing a few words, and mild paraphrase; detector confidence is greatly reduced by thorough rewriting or by translation; watermarking is less effective on factual responses, because there is less opportunity to augment generation without decreasing accuracy; detector exposure is a three-way deployer choice between fully-private, semi-private and public; the scheme is not designed to stop motivated adversaries; and the underlying technical description is Dathathri et al., Scalable watermarking for identifying large language model outputs, Nature 634:818-823 (2024), https://www.nature.com/articles/s41586-024-08025-4. IT SUBSTANTIATES NO ADOPTION FIGURE AND NO MARKET-SHARE CLAIM, which is the fact that keeps session-4's scale paragraph open rather than closing it.
used_for.session-4: watermarks working less well on factual answers, and the three results a detector can return (Appendix D2); the published scheme behind the knockout figure (Appendix D1)
```

## src-claude-marks

```source
title:          How Claude marks AI-generated content
author:         Anthropic
publisher:      Claude Help Center, support.claude.com article 16266773
link:           https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content
published:      not applicable
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-25 and again, in full, on 2026-09-27, together with the Claude Content Checker page at claude.com/check-content. Quotations below are the pages' own words.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 Appendices D1 and D2
scope:          Claude models launched in the EU on or after 2 August 2026 mark generated text with an imperceptible watermark at launch, earlier models are being added with all covered by 2 December 2026, and marking applies "to output from supported models wherever Claude is offered, worldwide". Files Claude makes (PNG, JPG, SVG, MP4, audio) carry signed Content Credentials following the C2PA standard. Text watermark detection is in private preview, "available to eligible organizations as required under EU law (such as regulators, law enforcement, media, fact-checkers, independent researchers, educational organizations, and EU civil society groups)" and to enterprises with their own Article 50 obligations, through a registration form. A detected mark "tells you that the content may have been processed by Claude" and does not confirm full provenance; "Lack of a detected mark doesn't mean the content wasn't AI-generated or processed": heavy editing, paraphrase, translation, very short passages, or metadata stripped "through format conversion, re-saving, screenshots, or other means". The free Claude Content Checker checks a file, in the browser, for a Claude-issued credential; "The tool does not check text." Anthropic signed the EU AI Act Article 50(2) Code of Practice on Transparency of AI-Generated Content. The page describes no account or user identifier in the mark; that is a reading of an absence and is chipped M wherever it is used.
used_for.session-4: which Claude models mark their text, who can check a mark and what it shows (Appendices D1 and D2); the EU marking rule in the §01 sorter
```

## src-cfp-genai

```source
title:          Generative AI Ethics Guide: A Checklist for Upholding the Code and Standards
author:         CFP Board
publisher:      Certified Financial Planner Board of Standards, Inc.
link:           https://www.cfp.net/ethics/compliance-resources/2025/02/generative-ai-ethics-guide
published:      2025-02
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. cfp.net and the press-release hosts are egress-blocked from this build environment (2026-09-25). The title, the February 2025 date and the substance in scope come from search-engine summaries of the guide and of CFP Board's press release of 25 February 2025, which is why the confidence is M. The instructor holds the PDF (instructor-notes/session-3.md, the 09-21 night) and can raise it by reading the page.
confidence:     M
kind:           evidence
moving_target:  false
scope:          A checklist for CFP professionals using generative AI: safeguard confidentiality, including using pseudonyms and anonymisation to remove confidential information before uploading; verify the accuracy of output; confirm the platform stores output in compliance with recordkeeping rules; confirm the vendor commits to notice of data breaches; and keep professional judgment with the professional.
used_for.session-4: using pseudonyms and removing identifying details before upload (§02, Appendix D6)
```

## src-cfp-code

```source
title:          Code of Ethics and Standards of Conduct
author:         CFP Board
publisher:      Certified Financial Planner Board of Standards, Inc.
link:           [UNVERIFIED, needs source]
published:      2019
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. cfp.net is egress-blocked from this build environment (2026-09-25). Standard A.14's name and its reasonable-care duty are carried from the instructor's own run sheet for the 2026-09-21 session, which names Standards A.9 and A.14 at high confidence from the Code itself; the wording on the session-4 page is a paraphrase, not a quotation, and the chip is M until the page is read.
confidence:     M
kind:           evidence
moving_target:  false
scope:          Standard A.14, Duties When Selecting, Using, or Recommending Technology: a CFP professional must exercise reasonable care and judgment when selecting, using or recommending technology in providing professional services. Standard A.9, Confidentiality and Privacy.
used_for.session-4: Standard A.14, reasonable care in selecting and using technology (§04)
```

## src-sec-withdraw

```source
title:          Withdrawal of proposed regulatory actions, including Conflicts of Interest Associated with the Use of Predictive Data Analytics (S7-12-23)
author:         U.S. Securities and Exchange Commission
publisher:      SEC
link:           https://www.sec.gov/rules-regulations/2025/06/s7-12-23
published:      2025-06-12
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT READ FROM THE SEC. The withdrawal on 12 June 2025 of fourteen proposals, the predictive data analytics proposal of August 2023 among them, is reported consistently by several law-firm client alerts reached through search on 2026-09-25; the SEC page itself was not loaded from this build. M until it is.
confidence:     M
kind:           evidence
moving_target:  false
scope:          That the SEC withdrew its 2023 proposal on conflicts of interest from predictive data analytics used by broker-dealers and investment advisers, on 12 June 2025, together with thirteen other proposals; any future rule would need a new proposal.
used_for.session-4: the withdrawn 2023 predictive data analytics proposal (§01 sorter)
```

## src-anthropic-terms

```source
title:          Consumer Terms of Service, Commercial Terms of Service and Privacy Policy
author:         Anthropic
publisher:      Anthropic, anthropic.com/legal
link:           https://www.anthropic.com/legal/commercial-terms
published:      not applicable
last_retrieved: 2026-09-27
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §03
scope:          Consumer plans: Anthropic may use chats "including training our models, unless you opt out of training through your account settings"; retention five years if training is allowed, 30 days if not; the Consumer Terms are a contract between the individual and Anthropic. Commercial plans (Team, Enterprise, the API): "Anthropic may not train models on Customer Content from Services" (Section B); the Customer "retains all rights to its Inputs, and owns its Outputs" (Section B); Confidential Information may be used only to exercise rights and perform obligations under the Terms and is destroyed promptly on request (Sections E.2, E.4); the Terms are an agreement between Anthropic and the organisation the signer represents, and nobody may accept for an organisation without legal authority to bind it.
retrieval_note: Opened directly on 2026-09-27: the Commercial Terms (effective 17 June 2025), the Consumer Terms (effective 8 October 2025), the Privacy Policy (effective 10 September 2026) and the 28 August 2025 news post on the consumer training change. The consumer-side retention figures (five years if training is allowed, 30 days if not) are stated in the news post and on the Claude Code data-usage page; privacy.claude.com itself could not be opened. Earlier retrieval 2026-08-14.
used_for.session-4: the consumer training switch, five-year and 30-day retention, and the business plans' exclusion from training (§03)
```

## src-beta

```source
title:          Available beta and research preview features
author:         Anthropic
publisher:      support.claude.com article 14503520
link:           [UNVERIFIED, needs source]
published:      2026-07-07
last_retrieved: 2026-08-20
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          The label semantics and the eight-row table in section 7. H as of the article's own date and no later: this is the oldest source in the file and the one most likely to be wrong on screen.
used_for.session-0.1: the label semantics and the eight-row table in section 7
```

## src-ctxwindow

```source
title:          How large is the context window on paid Claude plans?
author:         Anthropic
publisher:      support.claude.com article 8606394
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-08-20
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          Window sizes by model, the 500K figure for the 4.x tier in chat and 200K outside those models, automatic context management and its code-execution requirement, project knowledge served by retrieval rather than loaded whole, and the statement that tools and connectors are token-intensive. That last item is a direction, not a magnitude: no first-party figure exists for what a connector costs and none is printed in the lesson.
used_for.session-0.1: window sizes by model, automatic context management, project knowledge retrieval, and the token cost of tools and connectors as a direction
```

## src-directory

```source
title:          Browse skills, connectors, and plugins in one directory
author:         Anthropic
publisher:      support.claude.com article 14328846
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-08-20
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          The Customize sidebar and its three tabs, install and enable semantics, directory-installed skills being view-only, and organisation sharing being off by default.
used_for.session-0.1: the Customize sidebar and its three tabs, install and enable semantics, and organisation sharing defaults
```

## src-effort

```source
title:          Change the model, effort, and thinking settings
author:         Anthropic
publisher:      support.claude.com article 8664678
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-08-20
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          The five effort levels, which models carry the effort selector, extended thinking not being disableable in Claude on Opus 5, xhigh requiring Opus 4.7 or newer, the rule that a change applies starting with Claude's next response, and admin role gating of models and effort levels.
used_for.session-0.1: the five effort levels, the selector availability, the next-response rule, and admin role gating
used_for.session-4: effort as the setting you change on current models (Appendix D3)
```

## src-features

```source
title:          Features and capabilities collection index
author:         Anthropic
publisher:      support.claude.com article 18031719
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-08-20
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          The enumeration of surfaces beyond the chat box, and the attachment path.
used_for.session-0.1: the enumeration of surfaces beyond the chat box in section 7, and the attachment path in section 4
```

## src-memory

```source
title:          Use Claude's chat search and memory to build on previous context
author:         Anthropic
publisher:      support.claude.com article 11817273
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-08-20
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          The two live memory experiences and where each puts its toggles, real-time entry writing against a 24-hour synthesis, incognito chats on Enterprise and Team being included in standard data exports and following organisation retention, Owners retaining access for at least 30 days, Team plans having no organisation-level memory controls, the Enterprise org toggle and what disabling it deletes, past-chat search being paid-plans-only and appearing as tool calls, project-scoped search, Enterprise CMEK blocking past-chat search, pause against reset semantics, and deletion of a conversation not deleting the memory generated from it. Upgraded from M to H by the verified evidence annex, section A.
used_for.session-0.1: the two memory experiences, their toggles and retention semantics, and past-chat search behaviour
used_for.session-2: §01, memory as a source of run-to-run difference
```

## src-models

```source
title:          Models overview
author:         Anthropic
publisher:      Claude Platform Docs
link:           https://platform.claude.com/docs/en/models/overview
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-09-13
retrieval_note: Re-fetched 2026-09-13 at the page's current address for session-2 §01. Every Claude model ID is a pinned snapshot, including the dateless IDs from the 4.6 generation on; Fable 5.1 is the current flagship at $10 / $50 per MTok and Fable 5 is listed as a legacy model, still available.
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          The four current models, context window sizes (1M for Fable 5, Opus 5 and Sonnet 5; 200K for Haiku 4.5), which models carry adaptive against extended thinking, and effort defaults. Price per MTok and knowledge cutoffs are carried by this source but are quoted nowhere in the lesson, because no figure for either was recorded at verification.
used_for.session-0.1: the four current models, context window sizes, thinking modes, and effort defaults
used_for.session-2: §01, the pinned-snapshot statement behind the version item in the run-to-run list
```

## src-personalization

```source
title:          Understanding Claude's personalization features
author:         Anthropic
publisher:      support.claude.com article 10185728
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-08-20
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          Profile instructions applying account-wide, project instructions, styles as a separate mechanism, and five projects on the free plan.
used_for.session-0.1: profile and project instructions, styles as a separate mechanism, and the free-plan project limit
used_for.session-2: §01, standing instructions as a source of run-to-run difference
```

## src-plugins

```source
title:          Use plugins in Claude
author:         Anthropic
publisher:      support.claude.com article 13837440
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-08-20
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          Plugins on all paid plans, a plugin bundling skills, connectors and sub-agents, availability in chat on the web, the Desktop Chat tab and Cowork, and hooks and sub-agents running only in Cowork and appearing greyed out in chat. Retrieved via search-result content rather than a full page fetch, then upgraded from UNVERIFIED to H by the verified evidence annex, section B. THREE ITEMS ARE STARRED THERE for re-confirmation at the page before they are taught: the built-in and GitHub-sourced marketplaces, the Customize action opening a Cowork task, and the Plugin Create plugin.
used_for.session-0.1: plugin availability by plan and surface, what a plugin bundles, and where hooks and sub-agents run
```

## src-routing

```source
title:          Why Claude switched models in your conversation with Fable 5
author:         Anthropic
publisher:      support.claude.com article 15363606
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-08-20
last_verified:
confidence:     L
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          [UNVERIFIED, needs source]: the URL and title are confirmed from two other fetched pages, but the BODY OF THIS ARTICLE HAS NOT BEEN READ. Referenced once, solely to record that model switching inside a conversation is a documented behaviour with an article behind it. No mechanism, trigger or consequence is asserted from it anywhere. Fetch it before teaching anything about routing.
used_for.session-0.1: the single record that model switching inside a conversation is documented; no mechanism is asserted
```

## src-skills

```source
title:          What are skills?
author:         Anthropic
publisher:      support.claude.com article 12512176
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-08-20
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          Progressive disclosure of skill metadata against skill body, the code-execution requirement, the four skill types, and how skills differ from projects, MCP and instructions.
used_for.session-0.1: progressive disclosure, the code-execution requirement, the four skill types, and the comparison with projects and MCP
```

## src-tools3

```source
title:          When should I use web search, extended thinking, and research?
author:         Anthropic
publisher:      support.claude.com article 11095361
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
last_retrieved: 2026-08-20
last_verified:
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          One to two tool calls for web search on a factual query, five or more tool calls over one to three minutes for research, and the combined behaviour of the two.
used_for.session-0.1: the tool-call counts and durations for web search against research
```

## src-openai-data

```source
title:          How your data is used to improve model performance
author:         OpenAI
publisher:      OpenAI Help Center, article 5722486
link:           https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. help.openai.com and openai.com are egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this article and of "Chat and file retention in ChatGPT" (article 8983778), which is why the confidence is M. Read both pages before teaching the numbers.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §03
scope:          On the Free, Plus and Pro plans the "Improve the model for everyone" setting is on by default and can be switched off under Data controls. ChatGPT Business (formerly Team), Enterprise, Edu and the API are not used for training by default. Chats stay in the account until deleted; a deleted chat is removed from OpenAI's systems within 30 days; temporary chats are kept up to 30 days and not used for training. Every one of these is a term the vendor can change without notice.
used_for.session-4: ChatGPT's consumer training switch and its default, keeping until you delete, and the business plans' exclusion from training (§03)
```

## src-ms-copilot

```source
title:          Privacy FAQ for Microsoft Copilot
author:         Microsoft
publisher:      Microsoft Support
link:           https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. support.microsoft.com is egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this FAQ and of "Conversation history in Microsoft Copilot", which is why the confidence is M. Read both pages before teaching the numbers.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §03
scope:          With a personal Microsoft account, conversations may be used to train Microsoft's generative AI models unless the person opts out under "Model training on text"; the opt-out is not the default, and takes effect across systems within 30 days. Conversation history is kept 18 months by default unless deleted sooner. Some users and regions are excluded from training by the vendor's own rules.
used_for.session-4: Copilot's personal-account training default, the opt-out setting, and the 18-month history (§03)
```

## src-ms-copilot-edp

```source
title:          Enterprise data protection in Microsoft Copilot and Microsoft Copilot Chat
author:         Microsoft
publisher:      Microsoft Learn
link:           https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. learn.microsoft.com is egress-blocked from this build environment (2026-09-27). The substance in scope comes from search-engine summaries of the page, which is why the confidence is M.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §03
scope:          Signed in with a work or school account, prompts and responses fall under enterprise data protection: the same contractual terms as Exchange mail and SharePoint files, encrypted at rest and in transit, and not used to train the underlying foundation models.
used_for.session-4: prompts and responses under a work account are not used to train the foundation models (§03)
```

## src-gemini-privacy

```source
title:          Gemini Apps Privacy Hub
author:         Google
publisher:      Gemini Apps Help, answer 13594961
link:           https://support.google.com/gemini/answer/13594961
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. support.google.com is egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this hub and of "Manage and delete your activity in Gemini Apps" (answer 13278892), which is why the confidence is M. Read both pages before teaching the numbers.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §03
scope:          With a personal Google account, Gemini Apps Activity ("Keep Activity") is on by default; activity is used to improve Google's models and may be read by trained reviewers. Activity auto-deletes after 18 months by default, with 3 or 36 months selectable. A conversation a reviewer has read is kept for up to three years even if the person deletes their activity. With the setting off, chats are kept up to 72 hours and not used to train models unless the person sends feedback. Google's own page warns against entering confidential information.
used_for.session-4: Gemini's Keep Activity default, the 18-month auto-delete, human review and the three-year keep of reviewed chats, and 72 hours with the switch off (§03)
```

## src-gemini-workspace

```source
title:          Generative AI in Google Workspace Privacy Hub
author:         Google
publisher:      Google Workspace Help, answer 15706919
link:           https://support.google.com/a/answer/15706919
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. support.google.com is egress-blocked from this build environment (2026-09-27). The substance in scope comes from search-engine summaries of the page, which is why the confidence is M.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §03
scope:          For Workspace accounts with Gemini, prompts, generated content and Workspace data are not used to train models outside the customer's domain without permission, are not reviewed by humans, and are not used for advertising; the Cloud Data Processing Addendum governs.
used_for.session-4: Workspace prompts not used to train models and not reviewed by humans (§03)
```

## src-deepseek

```source
title:          Wiz Research uncovers exposed DeepSeek database leaking sensitive information, including chat history
author:         Wiz Research
publisher:      Wiz blog
link:           https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak
published:      2025-01-29
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. wiz.io is egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of the post and of the reporting that cited it (TechCrunch, The Register, SecurityWeek, 30 January 2025), which is why the confidence is M.
confidence:     M
kind:           evidence
moving_target:  false
scope:          A publicly reachable ClickHouse database belonging to DeepSeek held over a million lines of log streams, including chat history, API keys and back-end details, with no authentication. Wiz disclosed it and DeepSeek secured it promptly. The lesson uses it as the "logs" leak: the vendor's own record of what was typed.
used_for.session-4: the DeepSeek database left open with over a million log lines, chat history included (§03)
```

## src-chatgpt-index

```source
title:          Your public ChatGPT queries are getting indexed by Google and other search engines
author:         TechCrunch
publisher:      TechCrunch
link:           https://techcrunch.com/2025/07/31/your-public-chatgpt-queries-are-getting-indexed-by-google-and-other-search-engines
published:      2025-07-31
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. techcrunch.com is egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of this article and of Search Engine Land's and Search Engine Journal's reporting of the same days, which is why the confidence is M.
confidence:     M
kind:           evidence
moving_target:  false
scope:          Conversations shared from ChatGPT with the "make this chat discoverable" box ticked appeared in Google search results in late July 2025; OpenAI removed the option within days. The lesson uses it as the "caches" leak: a copy a search engine has made is the search engine's, whatever the vendor does next. The count of indexed chats (reported as about 4,500) is not stated on the page.
used_for.session-4: shared ChatGPT chats appearing in Google search results, and the option's withdrawal (§03)
```

## src-meta-feed

```source
title:          Meta AI's discover feed is full of revealing personal info: here's how to protect your privacy
author:         Tom's Guide
publisher:      Tom's Guide
link:           https://www.tomsguide.com/computing/online-security/meta-ais-discover-feed-is-full-of-revealing-personal-info-heres-how-to-protect-your-privacy
published:      2025-06
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. The article's own headline uses a dash where this record uses a colon, so that the injected footer adds no em dash to the lesson. The facts in scope come from search-engine summaries of this article and of the Mozilla Foundation's campaign page on the same feed (June 2025), which is why the confidence is M. A stronger citation (the original reporting) is a review-list item.
confidence:     M
kind:           evidence
moving_target:  false
scope:          The Meta AI app's Discover feed showed conversations people had shared with a Share button, many of them plainly private (medical, legal, financial, tied to real names), with little warning that sharing meant publishing. The lesson uses it as the "uncovered features" leak: a feature nobody's policy covered.
used_for.session-4: the Meta AI app's Share button posting private chats to a public feed (§03)
```

## src-anthropic-threat

```source
title:          Detecting and countering misuse of AI: September 2026
author:         Anthropic
publisher:      Anthropic
link:           https://www.anthropic.com/threat-intelligence-report-september-2026
published:      2026-09
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Retrieved 2026-09-27 through a summarising fetch, not read whole. The passage the lesson rests on was returned verbatim: "If their monitoring AI agents identified that any of their deployed malware was detected by a security product, agents would then set about the process of autonomously modifying and rebuilding the malware to evade the existing detections." Read the report before teaching the case.
confidence:     H
kind:           evidence
moving_target:  false
scope:          Anthropic's fourth threat-intelligence report, covering misuse disrupted between December 2025 and August 2026 across seven harm areas. The case the lesson uses (GTG-20006, assessed as a Russian espionage actor) had AI agents watch security products for detections of its deployed malware and rebuild the malware until it evaded them. The lesson names no group and quotes no tradecraft beyond that sentence.
used_for.session-4: an espionage group's agents watching security tools for detections of their malware and rebuilding it until undetected (§05)
```

## src-gtig-ai

```source
title:          GTIG AI Threat Tracker: Advances in threat actor usage of AI tools
author:         Google Threat Intelligence Group
publisher:      Google
link:           https://services.google.com/fh/files/misc/advances-in-threat-actor-usage-of-ai-tools-en.pdf
published:      2025-11-05
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. services.google.com and cloud.google.com are egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of the report and of the reporting on its release (The Hacker News, BleepingComputer, Infosecurity Magazine, 5 November 2025), which is why the confidence is M.
confidence:     M
kind:           evidence
moving_target:  false
scope:          PROMPTFLUX, a VBScript dropper that called the Gemini API to request obfuscated rewrites of its own source code, described as experimental and not yet able to do real damage; PROMPTSTEAL, which generated commands through a hosted model; and the report's statement that, for the first time, malware families used large language models during execution. Google disabled the associated API access.
used_for.session-4: a program that asked a model to rewrite its own code every hour (§05)
```

## src-joa-prompt

```source
title:          Writing an effective AI prompt for an audit
author:         [UNVERIFIED, needs source]
publisher:      Journal of Accountancy, A&A Focus newsletter (AICPA)
link:           https://www.journalofaccountancy.com/newsletters/a-a-focus/writing-an-effective-ai-prompt-for-an-audit/
published:      2025-11
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. journalofaccountancy.com is egress-blocked from this build environment (2026-09-27). The syllabus lists this reading as "Writing an Effective AI Prompt for an Audit Trail"; the page's own title, as the search engine returns it, is the one recorded here, and the November 2025 date is from the same summary. The article was not read, so the lesson claims nothing about what it says: it names it as the assigned reading behind the record block and no more.
confidence:     M
kind:           assigned_reading
moving_target:  false
scope:          The assigned reading for §07, from the Journal of Accountancy's A&A Focus series on AI in audit work. Its content is not characterised anywhere in the lesson.
used_for.session-4: the assigned reading behind the record block (§07)
```

## src-claude-pricing

```source
title:          Plans and pricing
author:         Anthropic
publisher:      claude.com
link:           https://claude.com/pricing
published:      not applicable
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27, with the Help Center articles on the Max plan (11049741) and on Enterprise seats (13393991) and the Claude Enterprise solutions page. The Max 20x figure is on the Help Center article, not the pricing page. Prices move without notice.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_pricing
recheck_before: every teaching of session-4 §03
scope:          Free $0. Pro $20 a month billed monthly, $17 a month on annual billing. Max from $100 a month for five times Pro usage, $200 for twenty times. Team: standard seat $25 a month or $20 annual, premium seat $125 or $100, teams of 2 to 150, with SSO, admin controls, enterprise search and no model training on content by default. Enterprise: $20 a seat a month billed annually plus usage at API rates, minimum 20 seats, adding SSO/SAML and domain capture, role-based access, SCIM, audit logs, a compliance API, custom data retention and a HIPAA-ready offering. API per million tokens, September 2026: from $1 in and $5 out for the smallest model to $10 in and $50 out for the largest.
used_for.session-4: the personal and firm price tags and what Team and Enterprise add, on the ladder (§03); the per-token line in the live API box
```

## src-anthropic-retention

```source
title:          API and data retention
author:         Anthropic
publisher:      Claude Platform Docs
link:           https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
published:      not applicable
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27, with the Help Center articles on custom retention for Enterprise plans (10440198) and on retention for covered models (15425996, effective 9 June 2026) and the Claude Code data-usage page. Two Anthropic pages differ on the Enterprise chat default (30 days standard against "indefinitely unless a custom period is set"); the lesson states only what both agree on.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §03
scope:          Standard retention on the API is 30 days; Enterprise organisations can set a custom retention period, 30 days at minimum; under a Zero Data Retention arrangement, obtained through sales and applied per organisation, "Anthropic does not store customer prompts or responses at rest after the API response is returned"; the Team and Enterprise chat interfaces are not ZDR-eligible; retained data is never used for training without express permission; a flagged chat may be kept up to two years.
used_for.session-4: the retention rung of the ladder and the retention clause of the contract view (§03, §04)
```

## src-anthropic-dpa

```source
title:          Data Processing Addendum
author:         Anthropic
publisher:      Anthropic, anthropic.com/legal
link:           https://www.anthropic.com/legal/data-processing-addendum
published:      2025-02-24
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27, three reads, consistent. Incorporated by reference into the Commercial Terms (Section C, Data Privacy). Quotations in scope are the document's own words.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §04
scope:          Section G.1: "Anthropic will notify Customer in writing without undue delay, but in any event within 48 hours, after becoming aware of any Security Breach." Section H.1: within thirty days of termination or expiration, on request, return a copy of all Customer Data or provide self-service functionality to do the same, and delete all copies. Section F.1: "Upon Customer's written request, and subject to the confidentiality obligations set forth in the Agreement, Anthropic will provide Customer with such audit reports or certificates applicable to the Services (e.g., SOC 2 report), to the extent available". Section C.3: reasonable prior notice of a new subprocessor and fifteen days to object. Section B.2: processing only to provide or maintain the Services and on the Customer's documented instructions.
used_for.session-4: the breach-notice, export and audit clauses of the contract view (§04) and the matching rungs of the ladder (§03)
```

## src-anthropic-certs

```source
title:          What certifications has Anthropic obtained?
author:         Anthropic
publisher:      Claude Help Center, support.claude.com article 10015870
link:           https://support.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained
published:      not applicable
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27 (the article says it was last updated 16 March 2026), with the HIPAA-ready Enterprise plans article (13296973) and the January 2025 news post on ISO 42001. The Trust Portal itself is egress-blocked from this build.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §03 and §04
scope:          SOC 2 Type I and Type II; ISO 27001:2022; ISO/IEC 42001:2023; a HIPAA-ready configuration with a Business Associate Agreement, available on Enterprise plans and accepted by the organisation's primary owner; compliance documents requested through the Trust Portal.
used_for.session-4: the audit rung of the ladder and the audit clause of the contract view (§03, §04)
```

## src-anthropic-aup

```source
title:          Usage Policy
author:         Anthropic
publisher:      Anthropic, anthropic.com/legal
link:           https://www.anthropic.com/legal/aup
published:      2025-09-15
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4
scope:          Use cases related to financial decisions, including investment advice, are treated as high-risk: a qualified professional must review the content or decision before it goes out, and the user must disclose that AI helped produce the advice. The policy also prohibits sharing personal information without consent.
```

## src-gemini-api-terms

```source
title:          Gemini API Additional Terms of Service
author:         Google
publisher:      Google AI for Developers, ai.google.dev
link:           https://ai.google.dev/gemini-api/terms
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. ai.google.dev is egress-blocked from this build environment (2026-09-27). The wording in scope appears verbatim in search snippets of the page itself and in two independent mirrors of the terms (Simon Willison, October 2024; ScanCode LicenseDB, 2025). Read the page before class; Google changes it.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4
scope:          On the unpaid services (Google AI Studio and the free API quota), Google uses submitted content and generated responses "to provide, improve, and develop Google products and services and machine learning technologies", and "human reviewers may read, annotate, and process your API input and output"; on the paid services, prompts and responses are not used to improve products.
used_for.session-4: why a free key is the training tier and a paid key is the contract tier (§03, and the Live API box above §00)
```

## src-gemini-ratelimits

```source
title:          Rate limits
author:         Google
publisher:      Google AI for Developers, ai.google.dev
link:           https://ai.google.dev/gemini-api/docs/rate-limits
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. ai.google.dev is egress-blocked from this build environment (2026-09-27), and the secondary sources disagree (250 requests a day for an older flash model against about 20 for the newer ones, after Google cut free quotas in December 2025 and moved to per-project limits). No number is printed on the page.
confidence:     L
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4
scope:          The free tier's request limits are small, were cut in December 2025, and are now set per project; the only reliable figure is the one in your own AI Studio console.
used_for.session-4: the one line saying the free quota is small and must be checked in your own console (§00, in the Live API box above it)
```

## src-uae-voice

```source
title:          Fraudsters cloned company director's voice in $35 million heist, police find
author:         Brewster, T.
publisher:      Forbes
link:           https://www.forbes.com/sites/thomasbrewster/2021/10/14/huge-bank-fraud-uses-deep-fake-voice-tech-to-steal-millions/
published:      2021-10-14
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. forbes.com is egress-blocked from this build environment (2026-09-27). Cross-checked against search snippets from Dark Reading, Unite.AI, SingularityHub and Interesting Engineering (October 2021), all consistent on the amount, the year and the court filing Forbes reported.
confidence:     H
kind:           evidence
moving_target:  false
scope:          In early 2020 a bank branch manager in the UAE authorised transfers of $35 million after a phone call from a cloned voice of a company director he knew, backed by forged emails about an acquisition; the case surfaced in a 2021 court document.
used_for.session-4: the second bar on the bill: a voice alone, $35 million (§05)
```

## src-uk-voice

```source
title:          A voice deepfake was used to scam a CEO out of $243,000
author:         Damiani, J.
publisher:      Forbes
link:           https://www.forbes.com/sites/jessedamiani/2019/09/03/a-voice-deepfake-was-used-to-scam-a-ceo-out-of-243000/
published:      2019-09-03
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. forbes.com is egress-blocked from this build environment (2026-09-27). The case was first reported by the Wall Street Journal on 30 August 2019 citing the insurer Euler Hermes; cross-checked against Gizmodo, CBC and Avast. The call was not recorded, so the AI attribution rests on the insurer's assessment.
confidence:     H
kind:           evidence
moving_target:  false
scope:          In March 2019 the chief executive of a UK energy firm wired €220,000, about $243,000, to a Hungarian account after a phone call that mimicked his German parent company chief's voice.
```

## src-sg-deepfake-2025

```source
title:          Finance director in Singapore transfers S$670,000 to scammers who used deepfake to impersonate company's executives
author:         Mothership
publisher:      Mothership.sg
link:           https://mothership.sg/2025/04/finance-director-scammed-deepfake/
published:      2025-04
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. mothership.sg and police.gov.sg are egress-blocked from this build environment (2026-09-27). The primary source is the Singapore Police Force news release of 7 April 2025 on the joint recovery with the Hong Kong Police Force; cross-checked against HRD Asia, Fortune (25 April 2025) and The Straits Times.
confidence:     H
kind:           evidence
moving_target:  false
scope:          On 24 to 26 March 2025 a finance director joined a Zoom call with deepfakes of the chief executive and other executives and sent about US$499,000 (S$670,000) to a mule account; police in Singapore and Hong Kong traced and withheld it.
```

## src-sg-deepfake-2026

```source
title:          Fake Zoom call with PM Wong: police release deepfake footage of scam that caused victim to hand over S$4.9 million
author:         Mothership
publisher:      Mothership.sg
link:           https://mothership.sg/2026/05/pm-wong-zoom-deepfake-scam/
published:      2026-05-16
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. mothership.sg is egress-blocked from this build environment (2026-09-27). Cross-checked against search snippets from the South China Morning Post, The Star (Malaysia), Malay Mail, VnExpress International and Fintech News Singapore, all consistent on the amount and the dates; the Singapore Police Force released the deepfake footage on 16 May 2026.
confidence:     H
kind:           evidence
moving_target:  false
scope:          In May 2026 a Singapore businessman transferred S$4.9 million, about US$3.8 million, to a scammer-controlled corporate account after a Zoom call with deepfakes of the Prime Minister, the President and a minister; he realised on 14 May 2026. Nothing stopped it.
used_for.session-4: the third bar on the bill: a private individual, a video call with officials (§05)
```

## src-ferrari

```source
title:          Ferrari deepfake attempt: scammer foiled by security question about CEO Benedetto Vigna
author:         Fortune
publisher:      Fortune
link:           https://fortune.com/2024/07/27/ferrari-deepfake-attempt-scammer-security-question-ceo-benedetto-vigna-cybersecurity-ai
published:      2024-07-27
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. fortune.com is egress-blocked from this build environment (2026-09-27). First reported by Bloomberg on 26 July 2024; cross-checked against MIT Sloan Management Review, Jalopnik and the AI Incident Database.
confidence:     H
kind:           evidence
moving_target:  false
scope:          In July 2024 a Ferrari executive received messages and then a call carrying a cloned voice of the chief executive about a confidential acquisition; he asked which book the chief executive had recommended days earlier, and the caller hung up. Nothing was lost.
```

## src-fbi-ic3-2025

```source
title:          Cryptocurrency and AI scams bilk Americans of billions: 2025 Internet Crime Report
author:         Federal Bureau of Investigation
publisher:      FBI, Internet Crime Complaint Center
link:           https://www.fbi.gov/news/press-releases/cryptocurrency-and-ai-scams-bilk-americans-of-billions
published:      2026-04-07
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. fbi.gov and ic3.gov are egress-blocked from this build environment (2026-09-27). Figures are consistent across search snippets of the FBI press release and of SpyCloud, SecureWorld, Paubox, Abnormal, McDonald Hopkins and Alston & Bird. The report is at ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf.
confidence:     H
kind:           evidence
moving_target:  false
scope:          For 2025: 1,008,597 complaints and $20.877 billion in reported losses, up 26% on 2024; business email compromise $3.05 billion from 24,768 complaints; the report's first AI section counts 22,364 complaints that named AI, about $893 million, which the FBI calls an undercount because victims must recognise AI to report it.
used_for.session-4: the bill's caption and the deepfake row's scale line (§05)
```

## src-fbi-ic3-2024

```source
title:          FBI releases annual Internet Crime Report: 2024
author:         Federal Bureau of Investigation
publisher:      FBI, Internet Crime Complaint Center
link:           https://www.fbi.gov/news/press-releases/fbi-releases-annual-internet-crime-report
published:      2025-04-23
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. fbi.gov is egress-blocked from this build environment (2026-09-27). Figures consistent across search snippets of the FBI press release, CyberScoop, Cybersecurity Dive, SecureWorld and Nacha.
confidence:     H
kind:           evidence
moving_target:  false
scope:          For 2024: 859,532 complaints and $16.6 billion in reported losses, a record at the time; business email compromise $2.77 billion from 21,442 complaints.
```

## src-forcedleak

```source
title:          ForcedLeak: AI agent risks exposed in Salesforce Agentforce
author:         Noma Security
publisher:      Noma Security
link:           https://noma.security/blog/forcedleak-agent-risks-exposed-in-salesforce-agentforce
published:      2025-09
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. noma.security is egress-blocked from this build environment (2026-09-27). Cross-checked against The Hacker News, Dark Reading and Security Affairs (September 2025), consistent on the CVSS score, the mechanism and the $5 domain.
confidence:     H
kind:           evidence
moving_target:  false
scope:          A prompt injection through a web-to-lead form let Salesforce's Agentforce agent send CRM data to an expired allow-listed domain the researchers bought for $5; CVSS 9.4; fixed by Salesforce on 8 September 2025.
```

## src-drift

```source
title:          Cybersecurity alert: Salesloft Drift AI supply chain attack
author:         Financial Industry Regulatory Authority
publisher:      FINRA
link:           https://www.finra.org/rules-guidance/guidance/salesloft-drift-AI-supply-chain-attack
published:      2025-09
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. finra.org is egress-blocked from this build environment (2026-09-27). The incident is described consistently by AppOmni, WTW, TechRadar and Paubox (August and September 2025), citing Google Threat Intelligence's count of more than 700 affected organisations.
confidence:     H
kind:           evidence
moving_target:  false
scope:          In August 2025 stolen OAuth tokens from the Drift AI chatbot's Salesforce integration let an attacker export data from more than 700 organisations; the standing connector token bypassed multi-factor authentication; tokens were revoked on 20 August 2025. FINRA issued a cybersecurity alert to member firms.
used_for.session-4: the connector breach on the exfiltration row of the four-attack board (§05)
```

## src-ibm-breach-2026

```source
title:          IBM study: one in four malicious breaches are AI-enabled, costing companies $6 million on average
author:         IBM
publisher:      IBM Newsroom
link:           https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled,-costing-companies-6-million-on-average
published:      2026-07-29
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. newsroom.ibm.com is egress-blocked from this build environment (2026-09-27). Figures consistent across search snippets of the IBM release, Infosecurity Magazine, Security Boulevard, ASIS Security Management and Cybersecurity Dive. Supersedes the 2025 edition's $4.44 million and $10.22 million.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   survey
recheck_before: every teaching of session-4 §05
scope:          Cost of a Data Breach Report 2026, 602 organisations, breaches March 2025 to February 2026: global average $4.99 million, US average $11.5 million; one in four malicious breaches AI-enabled, at $6 million on average; shadow AI in 43% of AI-related breaches.
used_for.session-4: the scale line on the exfiltration row of the four-attack board (§05)
```

## src-anthropic-threat-aug25

```source
title:          Detecting and countering misuse of AI: August 2025
author:         Anthropic
publisher:      Anthropic
link:           https://www.anthropic.com/news/detecting-countering-misuse-aug-2025
published:      2025-08-27
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27. Cross-checked against Malwarebytes, Forrester and Halcyon, which report the demand range as $75,000 to $500,000. No payment figure is public.
confidence:     H
kind:           evidence
moving_target:  false
scope:          One actor used Claude Code to automate reconnaissance, credential harvesting, intrusion and extortion against at least 17 organisations, including healthcare, emergency services, government and religious institutions; "Ransom demands sometimes exceeded $500,000." Demands, not measured losses.
used_for.session-4: the scale line on the AI-written malware row of the four-attack board (§05)
```

## src-0din-gemini

```source
title:          Phishing for Gemini
author:         Figueroa, M.
publisher:      Mozilla 0Din
link:           https://0din.ai/blog/phishing-for-gemini
published:      2025-07
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. 0din.ai is egress-blocked from this build environment (2026-09-27). The mechanism is described consistently in search snippets of the disclosure's coverage and in Microsoft's Defender documentation on prompt-injection protection, which names white-on-white text and zero-size fonts among the techniques it scans for.
confidence:     H
kind:           evidence
moving_target:  false
scope:          An email styled with HTML and CSS to set the font size to zero and the colour to white carried an instruction that Gemini for Workspace followed when the recipient asked it to summarise the email.
used_for.session-4: white text and zero-size fonts as hiding techniques (§05)
```

## src-unit42-ipi

```source
title:          Fooling AI agents: web-based indirect prompt injection observed in the wild
author:         Palo Alto Networks Unit 42
publisher:      Palo Alto Networks
link:           https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/
published:      2026-03-03
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. unit42.paloaltonetworks.com is egress-blocked from this build environment (2026-09-27). The counts in scope come from the Cloud Security Alliance's research note on the report and from search snippets of the report itself.
confidence:     H
kind:           evidence
moving_target:  false
scope:          Twenty-two payload techniques observed in real web content, from zero-size fonts and off-screen text to encoded payloads that assemble themselves at runtime; most framed as an authority override of the assistant's instructions.
used_for.session-4: hidden HTML, off-screen and zero-size text seen in the wild (§05)
```

## src-ascii-smuggling

```source
title:          Microsoft Copilot: from prompt injection to data exfiltration of your emails
author:         Rehberger, J.
publisher:      Embrace The Red
link:           https://embracethered.com/blog/posts/2024/m365-copilot-prompt-injection-tool-invocation-and-data-exfil-using-ascii-smuggling/
published:      2024-08-26
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. embracethered.com is egress-blocked from this build environment (2026-09-27). The technique was first shown by Riley Goodside on 11 January 2024; cross-checked against The Hacker News, SC Media, Cisco and Keysight, and Microsoft's fix in August 2024.
confidence:     H
kind:           evidence
moving_target:  false
scope:          Unicode tag characters carry letters the screen never draws, so an instruction can sit inside ordinary-looking text invisibly; used to make Microsoft 365 Copilot exfiltrate email content until Microsoft fixed it.
used_for.session-4: invisible characters as a hiding technique (§05)
```

## src-trailofbits-image

```source
title:          Weaponizing image scaling against production AI systems
author:         Trail of Bits
publisher:      Trail of Bits blog
link:           https://blog.trailofbits.com/2025/08/21/weaponizing-image-scaling-against-production-ai-systems/
published:      2025-08-21
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. blog.trailofbits.com is egress-blocked from this build environment (2026-09-27). Cross-checked against BleepingComputer and SecurityWeek (August 2025) and Brave's October 2025 disclosure of faint text in screenshots read by AI browsers.
confidence:     H
kind:           evidence
moving_target:  false
scope:          Images that look benign at full size reveal an instruction once the AI platform downscales them, so a multimodal model reads text the human never saw; the authors recommend explicit confirmation for sensitive tool actions when embedded text is detected.
used_for.session-4: text inside an image as a hiding technique (§05)
```

## src-safebreach-gemini

```source
title:          Invitation is all you need: hacking Gemini
author:         SafeBreach Labs, with Tel Aviv University and Technion researchers
publisher:      SafeBreach
link:           https://www.safebreach.com/blog/invitation-is-all-you-need-hacking-gemini/
published:      2025-08
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. safebreach.com is egress-blocked from this build environment (2026-09-27). Presented at Black Hat USA in August 2025 after disclosure to Google on 22 February 2025; cross-checked against The Register, TechRepublic and Bitdefender.
confidence:     H
kind:           evidence
moving_target:  false
scope:          Instructions inside a Google Calendar invite hijacked Gemini for Workspace, in one case firing later on an innocent "thanks"; Google added confirmation prompts for sensitive actions.
```

## src-nikkei-papers

```source
title:          'Positive review only': researchers hide AI prompts in papers
author:         Nikkei Asia
publisher:      Nikkei Asia
link:           https://asia.nikkei.com/business/technology/artificial-intelligence/positive-review-only-researchers-hide-ai-prompts-in-papers
published:      2025-07
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. asia.nikkei.com is egress-blocked from this build environment (2026-09-27). Cross-checked against the arXiv follow-up study (2507.06185, which found 18 papers), Smithsonian Magazine and Duke University's analysis of about 200,000 CVs.
confidence:     H
kind:           evidence
moving_target:  false
scope:          Hidden prompts such as "give a positive review only", in white or microscopic text, found in 17 preprints from 14 institutions; about 1% of 200,000 real CVs analysed by Duke carried similar injections.
```

## src-anthropic-injection

```source
title:          Mitigating the risk of prompt injections in browser use
author:         Anthropic
publisher:      Anthropic
link:           https://www.anthropic.com/news/prompt-injection-defenses
published:      2025-11-24
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27, with the Claude for Chrome pilot post on claude.com and the computer-use tool's security section in the platform docs.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §05
scope:          "A 1% attack success rate, while a significant improvement, still represents meaningful risk"; the platform docs warn that "Claude will follow commands found in content even when they conflict with your instructions"; Claude for Chrome "asks users before taking high-risk actions like publishing, purchasing, or sharing personal data".
used_for.session-4: why a warning is not a lock and an approval step is (§05)
```

## src-agent-skills

```source
title:          Agent Skills overview
author:         Anthropic
publisher:      Claude Platform Docs
link:           https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
published:      not applicable
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §07
scope:          A skill is a folder with a SKILL.md file: YAML front matter with a required name (at most 64 characters, lowercase letters, numbers and hyphens) and a required description (non-empty, at most 1,024 characters, saying what the skill does and when to use it), then the instructions in markdown. Custom skills upload in the Claude app's settings on Pro, Max, Team and Enterprise plans.
used_for.session-4: the skill form of the record block (§07) and of the inbox fixes (§05)
```

## src-il-pipa

```source
title:          Personal Information Protection Act, 815 ILCS 530/10
author:         Illinois General Assembly
publisher:      Illinois Compiled Statutes
link:           https://ilga.gov/documents/legislation/ilcs/documents/081505300K10.htm
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. ilga.gov is egress-blocked from this build environment (2026-09-27). The statutory wording in scope appears in search snippets of the statute and of Justia, the Illinois Attorney General's guidance page and a Hogan Lovells summary, all consistent.
confidence:     H
kind:           authority
moving_target:  false
scope:          Notice to affected Illinois residents "in the most expedient time possible and without unreasonable delay"; notice to the Attorney General when more than 500 Illinois residents are affected by a single breach.
used_for.session-4: the state clock in the clocks-that-are-law figure (Appendix D5)
```

## src-state-breach

```source
title:          Data breach notification laws: a 50-state survey, 2026 edition
author:         Privacy Rights Clearinghouse
publisher:      Privacy Rights Clearinghouse
link:           https://privacyrights.org/resources-tools/reports/data-breach-notification-laws-50-state-survey-2026-edition
published:      2026
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. privacyrights.org is egress-blocked from this build environment (2026-09-27), and the day counts in scope come from aggregated search snippets of several survey sites rather than from each statute, which is why the confidence is M.
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   survey
recheck_before: every teaching of session-4 Appendix D5
scope:          Hard consumer-notice deadlines in some states: Colorado, Florida and Washington 30 days from discovery; Maryland 45; Texas 60. Most states add a regulator filing above a headcount threshold.
used_for.session-4: the hard-count states on the clocks figure (Appendix D5)
```

## src-equifax

```source
title:          Data protection: actions taken by Equifax and federal agencies in response to the 2017 breach (GAO-18-559)
author:         U.S. Government Accountability Office
publisher:      GAO
link:           https://www.gao.gov/products/gao-18-559
published:      2018-08-30
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. gao.gov is egress-blocked from this build environment (2026-09-27). The dates and figures in scope are consistent across search snippets of the GAO report, the FTC's July 2019 settlement release, the CFPB's release, the House Oversight Committee's December 2018 report and EPIC.
confidence:     H
kind:           evidence
moving_target:  false
scope:          Equifax discovered the breach on 29 July 2017 and announced it on 7 September 2017, about 147 million US consumers affected; the July 2019 settlement with the FTC, the CFPB and the states was at least $575 million and up to $700 million.
used_for.session-4: the late clock in the two real clocks figure (Appendix D5)
```

## src-capitalone

```source
title:          2019 Capital One cyber incident: what happened
author:         Capital One
publisher:      Capital One
link:           https://www.capitalone.com/digital/facts2019/
published:      2019-07-29
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. capitalone.com is egress-blocked from this build environment (2026-09-27). Dates and figures consistent across search snippets of Capital One's page, CBS News and SiliconANGLE (August 2020, the $80 million OCC penalty), Banking Dive and the Department of Justice's case page.
confidence:     H
kind:           evidence
moving_target:  false
scope:          Tipped on 17 July 2019, Capital One determined on 19 July 2019 that an intrusion had occurred, contacted the FBI, and announced it publicly on 29 July 2019; about 100 million US and 6 million Canadian applicants affected; an $80 million OCC penalty in August 2020 and a $190 million class settlement.
used_for.session-4: the in-time clock in the two real clocks figure (Appendix D5)
```

## src-uber-doj

```source
title:          Former chief security officer of Uber sentenced to three years' probation for covering up data breach
author:         U.S. Department of Justice, Northern District of California
publisher:      Department of Justice
link:           https://www.justice.gov/usao-ndca/pr/former-chief-security-officer-uber-sentenced-three-years-probation-covering-data
published:      2023-05-04
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. justice.gov is egress-blocked from this build environment (2026-09-27). Consistent across search snippets of the DOJ release and of BakerHostetler, Norton Rose Fulbright, Arnold & Porter and SC Media.
confidence:     H
kind:           evidence
moving_target:  false
scope:          A November 2016 breach of about 57 million records was concealed for a year; the chief security officer arranged a $100,000 payment to the hackers under a bug-bounty nondisclosure agreement; he was convicted in October 2022 of obstruction of justice and misprision of a felony and sentenced in May 2023 to three years' probation and a $50,000 fine.
used_for.session-4: the one-year clock and the conviction (Appendix D5)
```

## src-eu-ai-act

```source
title:          Regulation (EU) 2024/1689 (the Artificial Intelligence Act), Article 50, transparency obligations
author:         European Parliament and Council
publisher:      Official Journal of the European Union, EUR-Lex
link:           https://eur-lex.europa.eu/eli/reg/2024/1689/oj
published:      2024-07-12
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. eur-lex.europa.eu is egress-blocked from this build environment (2026-09-27). The application date of 2 August 2026, the machine-readable marking duty and the Article 50(2) code of practice are corroborated by Anthropic's own page on how Claude marks content, which was opened; the Regulation's text was not, which is why the confidence is M.
confidence:     M
kind:           authority
moving_target:  false
scope:          Providers of AI systems that generate synthetic audio, image, video or text must ensure the output is marked in a machine-readable format and detectable as artificially generated; deployers of deepfakes must disclose them; the obligations apply from 2 August 2026 and bind providers placing systems on the EU market and deployers in the EU.
used_for.session-4: why a US adviser's Claude text carries a mark it cannot check (§01 sorter, Appendix D1)
```

## src-claude-memory

```source
title:          Bringing memory to teams at work
author:         Anthropic
publisher:      claude.com blog
link:           https://claude.com/blog/memory
published:      2025-09-11
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27, with the Help Center article on chat search and memory (11817273), which states that memory is saved as a set of topics as you chat.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 Appendix D3
scope:          Memory came to Team and Enterprise plans on 11 September 2025 and to Pro and Max on 23 October 2025; Claude saves memory as a set of individual topics as you chat rather than summarising afterwards.
used_for.session-4: the memory card in the then-and-now deck (Appendix D3)
```

## src-anthropic-ctx-eng

```source
title:          Effective context engineering for AI agents
author:         Rajasekaran, P., Dixon, E., Ryan, C., & Hadfield, J.
publisher:      Anthropic Engineering
link:           https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
published:      2025-09-29
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27, with the current prompting best-practices page, which still says a role in the system prompt focuses behaviour and tone.
confidence:     H
kind:           evidence
moving_target:  false
scope:          "Context engineering refers to the set of strategies for curating and maintaining the optimal set of tokens (information) during LLM inference": what the model sees, its tools, its notes and what it retrieves, rather than the wording of one prompt.
used_for.session-4: the prompt-engineering card in the then-and-now deck (Appendix D3)
```

## src-anthropic-thinking

```source
title:          Claude 3.7 Sonnet and Claude Code
author:         Anthropic
publisher:      Anthropic
link:           https://www.anthropic.com/news/claude-3-7-sonnet
published:      2025-02-24
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27, with the current prompting best-practices page, which describes manual step-by-step prompting as a fallback for when thinking is off.
confidence:     H
kind:           evidence
moving_target:  false
scope:          Visible, extended step-by-step thinking arrived on 24 February 2025; by 2026 thinking is built in and adaptive, and "think step by step" is a fallback when it is off.
used_for.session-4: the chain-of-thought card in the then-and-now deck (Appendix D3)
```

## src-anthropic-mcp

```source
title:          Introducing the Model Context Protocol
author:         Anthropic
publisher:      Anthropic
link:           https://www.anthropic.com/news/model-context-protocol
published:      2024-11-25
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27, with the web search post of 20 March 2025 and the integrations post of 1 May 2025 on claude.com, both opened.
confidence:     H
kind:           evidence
moving_target:  false
scope:          A standard for connecting assistants to the systems where data lives (November 2024); web search with direct citations in Claude (March 2025); integrations and advanced research across internal and external sources (May 2025): grounding built in rather than a retrieval pipeline you build.
used_for.session-4: the grounding card in the then-and-now deck (Appendix D3)
```

## src-anthropic-context

```source
title:          Context windows
author:         Anthropic
publisher:      Claude Platform Docs
link:           https://platform.claude.com/docs/en/build-with-claude/context-windows
published:      not applicable
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27, with the models overview and the 2023 announcements of 100K (11 May 2023) and 200K (21 November 2023) context windows and the 1M announcement of 12 August 2025, all on anthropic.com or claude.com.
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 Appendix D3
scope:          9,000 tokens in March 2023, 100,000 in May 2023, 200,000 in November 2023, one million by default on current models, about 555,000 words; and "As token count grows, accuracy and recall degrade, a phenomenon known as context rot."
used_for.session-4: the context-window card and the context-rot card in the then-and-now deck (Appendix D3)
```

## src-anthropic-agents

```source
title:          Building effective agents
author:         Schluntz, E., & Zhang, B.
publisher:      Anthropic Engineering
link:           https://www.anthropic.com/engineering/building-effective-agents
published:      2024-12-19
last_retrieved: 2026-09-27
last_verified:
retrieval_note: Opened directly on 2026-09-27, with the Agent SDK post of 29 September 2025 on claude.com and the tool-use documentation, whose section on the agentic loop was also opened. No source opened uses the phrase "loop engineering"; Anthropic's words are "in a loop", "the agent loop" and "the agentic loop".
confidence:     H
kind:           evidence
moving_target:  false
scope:          Agents "are typically just LLMs using tools based on environmental feedback in a loop"; the feedback loop is gather context, take action, verify work, repeat; the API documentation names the pattern the agentic loop.
used_for.session-4: the loop cards in the then-and-now deck and the second stale claim's current guidance (Appendix D3)
```

## src-advisers-204-2

```source
title:          Books and records to be maintained by investment advisers, 17 CFR 275.204-2
author:         U.S. Securities and Exchange Commission
publisher:      Code of Federal Regulations
link:           https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.204-2
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. ecfr.gov, law.cornell.edu and govinfo.gov are egress-blocked from this build environment (2026-09-27). The rule's citation is certain; its wording as stated in scope is from the maintainer's knowledge of the rule and is why the confidence is M. Read paragraph (a)(7) and paragraph (e)(1) before teaching them as settled.
confidence:     M
kind:           authority
moving_target:  false
scope:          Paragraph (a)(7): originals of written communications received and copies of those sent relating to any recommendation made or proposed or any advice given or proposed; paragraph (e)(1): kept for not less than five years from the end of the fiscal year of the last entry, the first two years in an appropriate office of the adviser.
used_for.session-4: the rule behind the prompt-as-sent slot of the record (§07)
```

## src-finra-4511

```source
title:          FINRA Rule 4511, General Requirements, and Exchange Act Rule 17a-4
author:         Financial Industry Regulatory Authority
publisher:      FINRA Rulebook
link:           https://www.finra.org/rules-guidance/rulebooks/finra-rules/4511
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. finra.org is egress-blocked from this build environment (2026-09-27). The rules' citations are certain; the periods in scope are from the maintainer's knowledge and are why the confidence is M. A broker-dealer's correspondence period differs from an adviser's, so the page never states one number for both.
confidence:     M
kind:           authority
moving_target:  false
scope:          Members must make and preserve books and records under FINRA rules, the Exchange Act and its rules, in a format consistent with Exchange Act Rule 17a-4; records with no stated period are kept at least six years; correspondence under Rule 17a-4(b)(4) for three years, the first two in an easily accessible place.
used_for.session-4: the broker-dealer counterpart of the books-and-records rule (§07)
```

## src-advisers-fiduciary

```source
title:          Commission Interpretation Regarding Standard of Conduct for Investment Advisers, Release IA-5248
author:         U.S. Securities and Exchange Commission
publisher:      SEC
link:           https://www.sec.gov/rules-regulations/2019/06/commission-interpretation-regarding-standard-conduct-investment-advisers
published:      2019-06-05
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. sec.gov is egress-blocked from this build environment (2026-09-27). The release's existence, date and number are certain; the characterisation in scope is from the maintainer's knowledge and is why the confidence is M.
confidence:     M
kind:           authority
moving_target:  false
scope:          The fiduciary duty of care under the Advisers Act includes a duty to provide advice that is in the client's best interest, with a reasonable basis for it, which is why the source behind an AI-assisted answer belongs in the file.
used_for.session-4: the duty behind the source-quoted slot of the record (§07)
```

## src-advisers-206-4-7

```source
title:          Compliance procedures and practices, 17 CFR 275.206(4)-7
author:         U.S. Securities and Exchange Commission
publisher:      Code of Federal Regulations
link:           https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.206(4)-7
published:      not applicable
last_retrieved: [UNVERIFIED, needs source]
last_verified:
retrieval_note: NOT RETRIEVED. ecfr.gov and law.cornell.edu are egress-blocked from this build environment (2026-09-27). The rule's citation is certain; the wording in scope is from the maintainer's knowledge and is why the confidence is M.
confidence:     M
kind:           authority
moving_target:  false
scope:          A registered adviser must adopt and implement written policies and procedures reasonably designed to prevent violations, review them no less than annually, and designate a chief compliance officer; the AI-use policy and the record of its annual review are themselves required records.
used_for.session-4: the rule behind the who-decided slot of the record and the annual review of the AI-use policy (§07)
```
