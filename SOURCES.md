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
> these two is that it is not.** Both are `disclose_on_page: true`: the page must
> say so where they appear, and both do.

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
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           assigned_reading
moving_target:  false
scope:          The mechanism of next-token prediction, the temperature passage, tokenisation and the GPT-2 token values, embeddings and vector lengths, the parenthesis-counting limit, and the brain-scale comparison. A February 2023 essay describing a 2020-era model; three of its structural claims are stale and session-4 Appendix D3 is about exactly that.
used_for.session-1: next-token prediction, the temperature passage, tokens and the GPT-2 token values, embeddings and vector lengths, the parenthesis-counting limit, and the brain-scale comparison
used_for.session-2: the sections "It's Just Adding One Word at a Time," "Where Do the Probabilities Come From?," "What Is a Model?," the temperature passage, and the parenthesis-language discussion
used_for.session-3: assigned reading — "The Concept of Embeddings" and the opening of "Meaning Space and Semantic Laws of Motion"
used_for.session-4: the reproducibility quote in §08 and the three stale claims in Appendix D3
```

## src-case

```source
title:          The Cole household
author:         not applicable
publisher:      Constructed for this course as a classroom anchor, BUS ADM X433.4
link:           not applicable
published:      [UNVERIFIED, needs source]
retrieved:      not applicable
confidence:     L
kind:           case
moving_target:  false
disclose_on_page: true
scope:          Entirely synthetic. Every figure, document and family fact is invented, including the 2014 buy-sell, the 2023 appraisal and the meeting transcript. Not based on any client, living or dead.
used_for.session-1: every worked example in this session and the next three
used_for.session-2: every worked example, exercise input and discussion prompt
used_for.session-3: the retrieval corpus, the extraction exercise, the consent items and the documentation exercise, and the illustrative meaning-space map whose coordinates were assigned rather than learned
used_for.session-4: the NPI classification items, the vendor due-diligence set, and the audit-trail exercise
```

## src-aa

```source
title:          Artificial Analysis Intelligence Index and cost-per-task figures
author:         Artificial Analysis
publisher:      Artificial Analysis
link:           https://artificialanalysis.ai/models
published:      not applicable
retrieved:      divergent across lessons, see DATA-PULL.md PULL-001 to PULL-003
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   benchmark_index
index_version:  DIVERGENT — unversioned, v4.1.1 and v4.1 across three lessons
recheck_before: every teaching of session-1 §05, session-2 §02 and session-4 §03
scope:          A live leaderboard of capability index scores and cost per index task. Every figure drawn from it is a moving target and none of them is stable between terms.
used_for.session-1: the capability-against-price frontier and the tier comparison
used_for.session-2: index scores and per-task costs for Opus 5, Fable 5, Sol, Opus 4.8 and Sonnet 5
used_for.session-4: the frontier chart, the sticker-versus-measured divergence, and the token and turn counts
```

## src-magesh

```source
title:          Hallucination-free? Assessing the reliability of leading AI legal research tools
author:         Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. D., & Ho, D. E.
publisher:      Journal of Empirical Legal Studies 22(2), 216
link:           https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/
published:      2025
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  false
scope:          Over 200 preregistered legal queries, expert hand-scored, against Lexis+ AI, Westlaw AI-Assisted Research and GPT-4. Tools tested May 2024 — a historical fixture. The measured rates belong to the tools as they were on that date and must never be "updated".
used_for.session-2: the measured hallucination rates for legal research tools
used_for.session-3: the >17% / ~33% / 43% rates, the claim that tools made statements unsupported by the sources they cited, and the cross-study comparability caveat
used_for.session-4: 17% / 33% / 43% and the response-length correlation
```

## src-pricing

```source
title:          Pricing
author:         Anthropic
publisher:      Claude Platform Docs
link:           https://platform.claude.com/docs/en/about-claude/pricing
published:      not applicable
retrieved:      2026-07-28
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   price
recheck_before: every teaching of session-1 §03, §05 and §06
scope:          Per-token input and output rates by model, cache-hit and batch discounts.
used_for.session-1: per-token rates, cache and batch discounts, and the Cole document-pass arithmetic
used_for.session-2: the published rates behind the blended token price
```

## src-finra2409

```source
title:          Regulatory Notice 24-09
author:         Financial Industry Regulatory Authority
publisher:      FINRA
link:           https://www.finra.org/rules-guidance/notices/24-09
published:      2024-06-27
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  false
scope:          FINRA's position that existing rules reach generative AI and that supervision is not suspended by the technology. Creates no new obligations.
used_for.session-1: the position that existing rules apply to generative AI and that supervision is not suspended by the technology
used_for.session-3: named in the reading list for the regulatory frame
used_for.session-4: existing rules apply; technology neutrality
```

## src-regsp

```source
title:          Regulation S-P: Privacy of consumer financial information and safeguarding customer information, 2024 amendments
author:         U.S. Securities and Exchange Commission
publisher:      SEC, adopting release
link:           [UNVERIFIED, needs source]
published:      2024
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  false
figure_class:   regulatory_date
scope:          The four obligations — written incident response program, customer notification no later than 30 days after the firm becomes aware, service provider oversight, recordkeeping — the definition and scope limits of nonpublic personal information, and the compliance dates 3 December 2025 and 3 June 2026.
used_for.session-3: named in §10 as a citable source for the AI usage policy assignment; compliance dates are not re-verified in this build and should be confirmed against the adopting release before a student relies on one
used_for.session-4: the four obligations, the definition and scope limits of nonpublic personal information, the 30-day notification clock, and the Appendix D5 tabletop
```

## src-secpri

```source
title:          Examination priorities: Fiscal year 2026, §VII
author:         U.S. Securities and Exchange Commission, Division of Examinations
publisher:      SEC
link:           [UNVERIFIED, needs source]
published:      2025-11-17
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  false
scope:          Accuracy of AI representations, training and security controls, and Regulation S-P as a named examination focus.
used_for.session-3: named in the reading list for the regulatory frame
used_for.session-4: accuracy of AI representations, training and security controls, and Regulation S-P as a named focus
```

## src-kalai

```source
title:          Why language models hallucinate
author:         Kalai, A. T., Nachum, O., Vempala, S. S., & Zhang, E.
publisher:      arXiv:2509.04664, §1 and §1.2
link:           [UNVERIFIED, needs source]
published:      2025
retrieved:      2025-05-11
confidence:     H
kind:           assigned_reading
moving_target:  false
scope:          Why a model guesses rather than abstains, and the two scoring rules. The model tested was DeepSeek-V3 on 11 May 2025 — a historical fixture; the finding is about that model on that date.
used_for.session-1: why a model guesses rather than abstains, and the two scoring rules
```

## src-sampling

```source
title:          LLM sampling visualiser
author:         artefact2
publisher:      GitHub Pages
link:           https://artefact2.github.io/llm-sampling/
published:      [UNVERIFIED, needs source]
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
confidence:     M
kind:           evidence
moving_target:  false
scope:          The two AI-washing settlements and their penalty amounts. Penalty figures are reported at two values across sources; the page states the majority figure.
used_for.session-1: the AI-washing settlements and their penalty amounts
```

## src-anthropic-ctx

```source
title:          Contextual retrieval in AI systems
author:         Anthropic
publisher:      Anthropic Engineering
link:           https://www.anthropic.com/engineering/contextual-retrieval
published:      2024-09-19
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   leaderboard_position
recheck_before: every teaching of session-3 §05
scope:          Dataset size, 32K-token length, domain mix, the low/high complexity split of 3,792 and 3,939, the leaderboard prompt, and the named per-model rates. A live leaderboard: the named model rates move.
used_for.session-3: the grounded hallucination rates by model and the length-and-complexity findings
```

## src-kitces-notetakers

```source
title:          Best AI notetakers for financial advisor meetings: Adoption, satisfaction, and trends
author:         Kitces.com
publisher:      Kitces.com
link:           https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/
published:      2025-01-15
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  false
scope:          Drawing on Kitces Research on Advisor Productivity, fielded autumn 2024: the greater-than-1:1 prep-and-follow-up ratio, the solo-versus-team adoption pattern, the UHNW drop-off, and the roughly fourfold rate for most-extensive against most-targeted plans.
used_for.session-3: the prep-and-follow-up ratio, the adoption pattern by firm size, and the note-taker satisfaction figures
```

## src-lee-cognitive

```source
title:          The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers
author:         Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N.
publisher:      Microsoft Research; CHI 2025
link:           [UNVERIFIED, needs source]
published:      2025
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  false
figure_class:   regulatory_date
scope:          The two-party consent exposure behind the recording-consent section: the California private right of action and the federal wiretap statute.
used_for.session-3: the recording consent obligation and its statutory exposure
```

## src-iskowitz

```source
title:          AI notetakers and compliance in wealth management: What firms need to know
author:         Iskowitz, C.
publisher:      WealthTech Today
link:           [UNVERIFIED, needs source]
published:      2025-07-29
retrieved:      [UNVERIFIED, needs source]
confidence:     M
kind:           background
moving_target:  false
scope:          Named in session-3's reading list for the compliance framing around note-takers. No claim on the page rests on it.
used_for.session-3: assigned reading; no page claim rests on it
```

## src-kitces-advisortech

```source
title:          The Latest in Financial AdvisorTech — AdvisorTech columns, October 2025, November 2025 and August 2026
author:         Kitces.com
publisher:      Kitces.com
link:           [UNVERIFIED, needs source]
published:      2026-08
retrieved:      [UNVERIFIED, needs source]
confidence:     M
kind:           background
moving_target:  true
figure_class:   cumulative_counter
recheck_before: every teaching of session-3 Appendix C3
scope:          Note-taker adoption shares and category consolidation. Named for the reader; no page claim currently rests on it.
used_for.session-3: named for the reader alongside the adoption figures; no page claim rests on it
```

## src-laplace

```source
title:          A philosophical essay on probabilities
author:         Laplace, P. S.
publisher:      Truscott & Emory, Trans.; original work published 1814. Chapter II, "Concerning Probability," pp. 3-8
link:           [UNVERIFIED, needs source]
published:      1902
retrieved:      not applicable
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      2026-06
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      not applicable
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      [UNVERIFIED, needs source]
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
retrieved:      not applicable
confidence:     not applicable
kind:           fabricated
moving_target:  false
disclose_on_page: true
scope:          A deliberately fabricated citation, appearing in the session-2 §05 triage as exercise material so that students practise failing to catch it. MUST NEVER CARRY A CONFIDENCE CHIP: a chip asserts the claim is evidenced, and the whole point is that it is not.
used_for.session-2: exercise material in the §05 citation triage, labelled as fabricated on the page
```

## src-hallowell

```source
title:          Hallowell v. Commissioner, T.C. Memo. 2023-217
author:         not applicable
publisher:      not applicable
link:           not applicable
published:      not applicable
retrieved:      not applicable
confidence:     not applicable
kind:           fabricated
moving_target:  false
disclose_on_page: true
scope:          A deliberately fabricated citation used as exercise material in the session-4 §08 audit-trail classification, labelled on the page where it appears. MUST NEVER CARRY A CONFIDENCE CHIP.
used_for.session-4: exercise material in the §08 audit-trail classification, labelled as fabricated on the page
```

## src-finra2026

```source
title:          2026 Annual Regulatory Oversight Report
author:         Financial Industry Regulatory Authority
publisher:      FINRA
link:           [UNVERIFIED, needs source]
published:      2025-12-09
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  false
scope:          FINRA's first standalone generative-AI section: enterprise-level supervisory processes, controls for hallucinations, bias, cybersecurity and threat-actor use, ongoing human monitoring, and novel oversight for agents that can act or transact.
used_for.session-4: enterprise supervisory processes, the named control areas, and agent oversight
```

## src-finra-inj

```source
title:          Understanding Generative AI and Prompt Injection Fundamentals
author:         Financial Industry Regulatory Authority
publisher:      FINRA
link:           [UNVERIFIED, needs source]
published:      2026-03-06
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  false
scope:          A self-regulatory organisation publishing a standalone primer on an attack technique, which is the evidence for the claim that prompt injection has left the research literature.
used_for.session-4: the claim that prompt injection has left the research literature
```

## src-daly

```source
title:          Artificial Intelligence and the Future of Investment Management
author:         Daly, B., Director, Division of Investment Management
publisher:      ICI Winter Board Meeting
link:           [UNVERIFIED, needs source]
published:      2026-02-03
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  false
scope:          NARROW, AND IT WAS READ TOO WIDELY. The speech states that the core questions remain open — whether an AI tool is marketing, advice or something requiring registration; who is responsible when output is wrong; how it is supervised — and asks for comment rather than announcing an answer. It says NOTHING about watermarking, SynthID, benchmark scores or model token counts, and it was chipped to four such claims before Phase 3 Part 1.
used_for.session-4: the open regulatory questions and the request for comment
```

## src-owasp

```source
title:          Top 10 for LLM Applications and Top 10 for Agentic Applications
author:         OWASP
publisher:      OWASP
link:           https://owasp.org/www-project-top-10-for-large-language-model-applications/
published:      [UNVERIFIED, needs source]
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   leaderboard_position
recheck_before: every teaching of session-4 §05
scope:          The LLM01 ranking for prompt injection and the mapping into six of ten agentic categories. The ranking is revised between editions, so the position is a moving target even though the finding is not.
used_for.session-4: the LLM01 ranking and the six-of-ten agentic mapping
```

## src-cve

```source
title:          CVE-2025-32711 (EchoLeak, CVSS 9.3) and CVE-2025-54135 (CurXecute, CVSS 9.8)
author:         MITRE / NVD
publisher:      Public CVE record
link:           [UNVERIFIED, needs source]
published:      2025
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           background
moving_target:  false
scope:          Identifiers, scores and mechanism verified against the public record. The lesson drawn from them is the instructor's, and no page claim currently carries this key.
used_for.session-4: named for the reader as the public record behind the injection threat model; the lesson drawn is the instructor's
```

## src-gartner

```source
title:          Survey of 302 security leaders
author:         Gartner
publisher:      Gartner
link:           [UNVERIFIED, needs source]
published:      2025
retrieved:      [UNVERIFIED, needs source]
confidence:     M
kind:           evidence
moving_target:  false
scope:          62% of organisations experiencing at least one deepfake attack in twelve months, 37% on a live video call. A single vendor survey, n = 302.
used_for.session-4: 62% experiencing a deepfake attack, 37% on live video
```

## src-deloitte

```source
title:          Generative-AI fraud projection
author:         Deloitte Center for Financial Services
publisher:      Deloitte
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
retrieved:      [UNVERIFIED, needs source]
confidence:     M
kind:           evidence
moving_target:  false
scope:          US GenAI-enabled fraud losses projected from $12.3bn (2023) to $40bn (2027). A PROJECTION, NOT A MEASUREMENT, and the page says so.
used_for.session-4: the $12.3bn to $40bn projection, labelled as a projection
```

## src-surfshark

```source
title:          2026 deepfake-loss analysis
author:         Surfshark
publisher:      Surfshark, as reported by two outlets
link:           [UNVERIFIED, needs source]
published:      2026
retrieved:      [UNVERIFIED, needs source]
confidence:     L
kind:           evidence
moving_target:  false
scope:          Two outlets citing the same analysis report $2.19bn and $3.7bn. Carried on the page as an unresolved disagreement rather than a resolved figure, which is why its confidence is L.
used_for.session-4: the $2.19bn and $3.7bn figures, presented as a disagreement between outlets
```

## src-arup

```source
title:          Reporting on the Arup deepfake incident
author:         Financial Times
publisher:      Financial Times
link:           [UNVERIFIED, needs source]
published:      2024-05
retrieved:      [UNVERIFIED, needs source]
confidence:     H
kind:           evidence
moving_target:  false
scope:          Approximately $25 million across 15 transfers. The one deepfake figure the course endorses putting in front of a client.
used_for.session-4: the Arup incident figure
```

## src-synthid

```source
title:          SynthID
author:         Google DeepMind
publisher:      Google DeepMind
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
retrieved:      [UNVERIFIED, needs source]
confidence:     M
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 Appendices D1 and D2
scope:          Tournament sampling in text, perturbation in image and video, and the frequency-domain approach in audio. Adoption is a vendor decision and changes; the mechanism does not.
used_for.session-4: tournament sampling in text, perturbation in image and video, and the frequency-domain approach in audio, in Appendices D1 and D2
```

## src-anthropic-terms

```source
title:          Privacy Center and Commercial Terms
author:         Anthropic
publisher:      Anthropic
link:           [UNVERIFIED, needs source]
published:      not applicable
retrieved:      2026-08-14
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-4 §03 and §06
scope:          Consumer training defaults since 8 October 2025, five-year and 30-day retention, the commercial-side no-training default, Zero Data Retention eligibility, and Claude Code's local 30-day transcript retention. Every one of these is a term a vendor can change without notice.
used_for.session-4: consumer training defaults, five-year and 30-day retention, Zero Data Retention eligibility, and the local transcript retention in §06
```

## src-beta

```source
title:          Available beta and research preview features
author:         Anthropic
publisher:      support.claude.com article 14503520
link:           [UNVERIFIED, needs source]
published:      2026-07-07
retrieved:      2026-08-20
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
retrieved:      2026-08-20
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
retrieved:      2026-08-20
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
retrieved:      2026-08-20
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          The five effort levels, which models carry the effort selector, extended thinking not being disableable in Claude on Opus 5, xhigh requiring Opus 4.7 or newer, the rule that a change applies starting with Claude's next response, and admin role gating of models and effort levels.
used_for.session-0.1: the five effort levels, the selector availability, the next-response rule, and admin role gating
```

## src-features

```source
title:          Features and capabilities collection index
author:         Anthropic
publisher:      support.claude.com article 18031719
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
retrieved:      2026-08-20
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
retrieved:      2026-08-20
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          The two live memory experiences and where each puts its toggles, real-time entry writing against a 24-hour synthesis, incognito chats on Enterprise and Team being included in standard data exports and following organisation retention, Owners retaining access for at least 30 days, Team plans having no organisation-level memory controls, the Enterprise org toggle and what disabling it deletes, past-chat search being paid-plans-only and appearing as tool calls, project-scoped search, Enterprise CMEK blocking past-chat search, pause against reset semantics, and deletion of a conversation not deleting the memory generated from it. Upgraded from M to H by the verified evidence annex, section A.
used_for.session-0.1: the two memory experiences, their toggles and retention semantics, and past-chat search behaviour
```

## src-models

```source
title:          Models overview
author:         Anthropic
publisher:      Claude Platform Docs
link:           https://platform.claude.com/docs/en/about-claude/models/overview
published:      [UNVERIFIED, needs source]
retrieved:      2026-08-20
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          The four current models, context window sizes (1M for Fable 5, Opus 5 and Sonnet 5; 200K for Haiku 4.5), which models carry adaptive against extended thinking, and effort defaults. Price per MTok and knowledge cutoffs are carried by this source but are quoted nowhere in the lesson, because no figure for either was recorded at verification.
used_for.session-0.1: the four current models, context window sizes, thinking modes, and effort defaults
```

## src-personalization

```source
title:          Understanding Claude's personalization features
author:         Anthropic
publisher:      support.claude.com article 10185728
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
retrieved:      2026-08-20
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          Profile instructions applying account-wide, project instructions, styles as a separate mechanism, and five projects on the free plan.
used_for.session-0.1: profile and project instructions, styles as a separate mechanism, and the free-plan project limit
```

## src-plugins

```source
title:          Use plugins in Claude
author:         Anthropic
publisher:      support.claude.com article 13837440
link:           [UNVERIFIED, needs source]
published:      [UNVERIFIED, needs source]
retrieved:      2026-08-20
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
retrieved:      2026-08-20
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
retrieved:      2026-08-20
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
retrieved:      2026-08-20
confidence:     H
kind:           evidence
moving_target:  true
figure_class:   vendor_policy
recheck_before: every teaching of session-0.1
scope:          One to two tool calls for web search on a factual query, five or more tool calls over one to three minutes for research, and the combined behaviour of the two.
used_for.session-0.1: the tool-call counts and durations for web search against research
```
