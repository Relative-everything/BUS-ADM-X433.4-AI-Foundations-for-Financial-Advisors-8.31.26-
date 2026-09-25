# Source verification queue

**Generated from `SOURCES.md` by `scripts/build-bibliography.mjs`. Do not edit:
the next run overwrites it.**

This is the instructor's work list, in the order the work is worth doing. A
source **49 claims rest on** is worth verifying before one that carries
none, so the ordering is **reference count, descending**.

## The two dates, and why only one of them is yours

| Field | What it asserts | Who may move it |
|---|---|---|
| `last_verified` | **You read the source** and confirmed this repository's claims about it are still accurate. A human attestation. | **You, and nothing else.** No generator, no re-pull, no agent, no automated process. `scripts/attest-verified.mjs` is the only writer and it refuses unless it is talking to an interactive terminal. |
| `last_retrieved` | A machine fetched the source. Records **when**, and never that anything is accurate. | Any re-pull. This is what *"update all live data points"* advances. |

**EMPTY is the honest value for `last_verified`.** It is not a backlog of
missing data; it is the measurement. A populated `last_verified` asserts that a
human read the source, and asserting that without evidence is the failure the
never-fabricate rule exists to prevent.

## Totals

| | |
|---|---|
| Source records | **67** |
| `last_verified` **EMPTY** | **63** |
| `last_verified` populated | 1 |
| `last_verified` *not applicable* (synthetic or fabricated) | 3 |
| References standing behind an EMPTY `last_verified` | **177** of 243 |
| Moving targets | 25 |
| Lock | notarised, digest `a293f68e14a33669` |


## Already attested

Each one cites the evidence in the repository that records the confirmation.

- **`src-wolfram`** — 2026-08-23. EDITORIAL.md, "Seventeen names. Instructor-verified." — the locked 17 section names of this essay, entered 2026-08-23 in commit bd8f458 and enforced by A11. Enumerating the seventeen section names requires having opened the essay.


---

## The queue

| # | Key | Title | `last_verified` | `last_retrieved` | Refs | Moving | Depends on it |
|---|---|---|---|---|---|---|---|
| 1 | `src-case` | The Cole household | *n/a* | *n/a* | 49 | no | S1 `#s1` · S2 `#s6b` · S3 `#s2` · S3 `#s4` · S3 `#sRag` · S3 `#s6` · S3 `#s7` · S3 `#s9` · S3 `#sPrep` · S3 `#s10` · S3 `#sChk` · S3 `#sOff`×2 · S3 `#s12` · S3 `#sVend` · S3 `#s13` · S3 `#s16` · S4 `#s0` · S4 `#sCold`×2 · S4 `#s2`×2 · S4 `#sRSP`×2 · S4 `#sAnon`×2 · S4 `#s3`×2 · S4 `#s4`×2 · S4 `#s5`×3 · S4 `#sW1`×3 · S4 `#sW2`×3 · S4 `#s6`×2 · S4 `#sWS` · S4 `#s7`×2 · S4 `#sCR`×2 · S4 `#sD`×2 · S4 `#s9` |
| 2 | `src-wolfram` | What is ChatGPT doing … and why does it work? | **2026-08-23** | **none** | 17 | no | S1 `#s2` · S1 `#s3`×2 · S1 `#s4` · S1 `#s5`×2 · S2 `#s1`×2 · S2 `#s2`×2 · S2 `#s3`×2 · S2 `#s4` · S3 `#s2`×2 · S3 `#s7` · S4 `#sWS` |
| 3 | `src-magesh` | Hallucination-free? Assessing the reliability of leading AI legal research tools | **EMPTY** | **none** | 12 | no | S2 `#s10`×3 · S3 `#s6`×2 · S3 `#s15` · S3 `#s16`×2 · S4 `#s6`×3 · S4 `#s9` |
| 4 | `src-regsp` | Regulation S-P: Privacy of consumer financial information and safeguarding customer information, 2024 amendments | **EMPTY** | **none** | 12 | no | S3 `#sPol`×2 · S4 `#s2`×3 · S4 `#sRSP`×3 · S4 `#s4`×2 · S4 `#s9`×2 |
| 5 | `src-claude-marks` | How Claude marks AI-generated content | **EMPTY** | 2026-09-25 | 10 | yes | S4 `#s1` · S4 `#sW1`×5 · S4 `#sW2`×3 · S4 `#s9` |
| 6 | `src-memory` | Use Claude's chat search and memory to build on previous context | **EMPTY** | 2026-08-20 | 10 | yes | S0.1 `#s0` · S0.1 `#s5`×2 · S0.1 `#s6`×2 · S0.1 `#s7` · S0.1 `#s9` · S0.1 `#s10`×2 · S2 `#s3` |
| 7 | `src-effort` | Change the model, effort, and thinking settings | **EMPTY** | 2026-08-20 | 9 | yes | S0.1 `#s1` · S0.1 `#s2` · S0.1 `#s3`×5 · S0.1 `#s9` · S4 `#sWS` |
| 8 | `src-tools3` | When should I use web search, extended thinking, and research? | **EMPTY** | 2026-08-20 | 9 | yes | S0.1 `#s1` · S0.1 `#s4` · S0.1 `#s5`×3 · S0.1 `#s8`×3 · S0.1 `#s9` |
| 9 | `src-pricing` | Pricing | **EMPTY** | 2026-09-13 | 8 | yes | S1 `#s5` · S1 `#s11`×3 · S2 `#s0` · S2 `#s5`×3 |
| 10 | `src-kitces-notetakers` | Best AI notetakers for financial advisor meetings: Adoption, satisfaction, and trends | **EMPTY** | **none** | 7 | no | S3 `#s9` · S3 `#s10`×2 · S3 `#s11`×2 · S3 `#s16`×2 |
| 11 | `src-aa` | Artificial Analysis Intelligence Index and cost-per-task figures | **EMPTY** | 2026-08-13 | 6 | yes | S1 `#s10`×2 · S2 `#s5`×3 · S4 `#sWS` |
| 12 | `src-anthropic-ctx` | Contextual retrieval in AI systems | **EMPTY** | **none** | 6 | no | S3 `#sRag` · S3 `#s6`×3 · S3 `#s7` · S3 `#s16` |
| 13 | `src-ctxwindow` | How large is the context window on paid Claude plans? | **EMPTY** | 2026-08-20 | 6 | yes | S0.1 `#s1` · S0.1 `#s4`×4 · S0.1 `#s6` |
| 14 | `src-finra2409` | Regulatory Notice 24-09 | **EMPTY** | **none** | 5 | no | S1 `#s14`×2 · S4 `#s1`×2 · S4 `#s9` |
| 15 | `src-models` | Models overview | **EMPTY** | 2026-09-13 | 5 | yes | S0.1 `#s2` · S0.1 `#s3`×2 · S0.1 `#s4` · S2 `#s3` |
| 16 | `src-synthid-text` | SynthID: Tools for watermarking and detecting LLM-generated Text | **EMPTY** | 2026-08-25 | 5 | yes | S4 `#sW1`×2 · S4 `#sW2`×3 |
| 17 | `src-cfp-genai` | Generative AI Ethics Guide: A Checklist for Upholding the Code and Standards | **EMPTY** | **none** | 4 | no | S4 `#s2`×2 · S4 `#sAnon`×2 |
| 18 | `src-context-windows` | Context windows | **EMPTY** | 2026-09-13 | 4 | yes | S2 `#s0` · S2 `#s3` · S3 `#sRag`×2 |
| 19 | `src-finra2026` | 2026 Annual Regulatory Oversight Report | **EMPTY** | **none** | 4 | no | S4 `#s1`×2 · S4 `#s7`×2 |
| 20 | `src-sec-ai` | Enforcement actions against Delphia (USA) Inc. and Global Predictions, Inc. | **EMPTY** | **none** | 4 | no | S1 `#s1`×2 · S4 `#s1`×2 |
| 21 | `src-anthropic-terms` | Privacy Center and Commercial Terms | **EMPTY** | 2026-08-14 | 3 | yes | S4 `#s3`×3 |
| 22 | `src-api-messages` | Messages API reference | **EMPTY** | 2026-09-13 | 3 | yes | S2 `#s3`×2 · S4 `#sWS` |
| 23 | `src-daly` | Artificial Intelligence and the Future of Investment Management | **EMPTY** | **none** | 3 | no | S4 `#s1`×2 · S4 `#s9` |
| 24 | `src-kitces-productivity` | Kitces Research on Advisor Productivity | **EMPTY** | **none** | 3 | no | S2 `#s9`×2 · S2 `#s12d` |
| 25 | `src-personalization` | Understanding Claude's personalization features | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s1` · S0.1 `#s6` · S2 `#s3` |
| 26 | `src-plugins` | Use plugins in Claude | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s7`×3 |
| 27 | `src-secpri` | Examination priorities: Fiscal year 2026, §VII | **EMPTY** | **none** | 3 | no | S4 `#s1`×2 · S4 `#s9` |
| 28 | `src-skills` | What are skills? | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s6` · S0.1 `#s7` · S0.1 `#s9` |
| 29 | `src-arup` | Reporting on the Arup deepfake incident | **EMPTY** | **none** | 2 | no | S4 `#s5`×2 |
| 30 | `src-cfp-code` | Code of Ethics and Standards of Conduct | **EMPTY** | **none** | 2 | no | S4 `#s4`×2 |
| 31 | `src-dahl-fictions` | Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models | **EMPTY** | **none** | 2 | no | S2 `#s10`×2 |
| 32 | `src-finra-inj` | Understanding Generative AI and Prompt Injection Fundamentals | **EMPTY** | **none** | 2 | no | S4 `#s5`×2 |
| 33 | `src-iskowitz` | AI notetakers and compliance in wealth management: What firms need to know | **EMPTY** | **none** | 2 | no | S3 `#sPol` · S3 `#s16` |
| 34 | `src-t3-survey` | Software Survey 2026 | **EMPTY** | **none** | 2 | no | S2 `#s9` · S2 `#s12d` |
| 35 | `src-wiretap` | Cal. Penal Code § 637.2(a)(1), (c); 18 U.S.C. § 2511 | **EMPTY** | **none** | 2 | no | S3 `#s12`×2 |
| 36 | `src-beta` | Available beta and research preview features | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 37 | `src-charlotin` | AI Hallucination Cases database | **EMPTY** | 2026-06 *(month only)* | 1 | yes | S2 `#s10` |
| 38 | `src-directory` | Browse skills, connectors, and plugins in one directory | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 39 | `src-features` | Features and capabilities collection index | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 40 | `src-google-ptcf` | Gemini for Workspace: Prompting guide 101 | **EMPTY** | **none** | 1 | no | S2 `#s6` |
| 41 | `src-kalai` | Why language models hallucinate | **EMPTY** | 2025-05-11 | 1 | no | S1 `#s9` |
| 42 | `src-lee-cognitive` | The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers | **EMPTY** | **none** | 1 | no | S3 `#s15` |
| 43 | `src-openai-pricing` | API pricing | **EMPTY** | **none** | 1 | yes | S2 `#s5` |
| 44 | `src-rohrer` | Interleaved practice improves mathematics learning | **EMPTY** | 2026-08-29 | 1 | no | S1 `#s13` |
| 45 | `src-routing` | Why Claude switched models in your conversation with Fable 5 | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s2` |
| 46 | `src-sampling` | LLM sampling visualiser | **EMPTY** | **none** | 1 | no | S1 `#s8` |
| 47 | `src-sec-withdraw` | Withdrawal of proposed regulatory actions, including Conflicts of Interest Associated with the Use of Predictive Data Analytics (S7-12-23) | **EMPTY** | **none** | 1 | no | S4 `#s1` |
| 48 | `src-zheng-persona` | When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models | **EMPTY** | **none** | 1 | no | S2 `#s6` |
| 49 | `src-anthropic-fluency` | AI fluency: Frameworks and foundations | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 50 | `src-cve` | CVE-2025-32711 (EchoLeak, CVSS 9.3) and CVE-2025-54135 (CurXecute, CVSS 9.8) | **EMPTY** | **none** | 0 | no | *listed by S4, cited by none* |
| 51 | `src-davidson` | Estate of William M. Davidson v. Commissioner, T.C. Docket No. 13748-13 | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 52 | `src-deloitte` | Generative-AI fraud projection | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 53 | `src-gartner` | Survey of 302 security leaders | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 54 | `src-hallowell` | Hallowell v. Commissioner, T.C. Memo. 2023-217 | *n/a* | *n/a* | 0 | no | *listed by S4, cited by none* |
| 55 | `src-irc` | Internal Revenue Code §§ 671, 675, 2036, 2702, 7520 | **EMPTY** | *n/a* | 0 | no | *listed by S2, cited by none* |
| 56 | `src-kessler` | Kessler v. Commissioner, 152 T.C. 88 (2019) | *n/a* | *n/a* | 0 | no | *listed by S2, cited by none* |
| 57 | `src-kitces-advisortech` | The Latest in Financial AdvisorTech — AdvisorTech columns, October 2025, November 2025 and August 2026 | **EMPTY** | **none** | 0 | yes | *listed by no lesson, cited by none* |
| 58 | `src-laplace` | A philosophical essay on probabilities | **EMPTY** | *n/a* | 0 | no | *listed by S2, cited by none* |
| 59 | `src-morningstar` | AI for advisors: Enhancing client conversations | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 60 | `src-owasp` | Top 10 for LLM Applications and Top 10 for Agentic Applications | **EMPTY** | **none** | 0 | yes | *listed by no lesson, cited by none* |
| 61 | `src-rr200464` | Rev. Rul. 2004-64, 2004-2 C.B. 7 (2004-27 I.R.B. 9) | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 62 | `src-rr8513` | Rev. Rul. 85-13, 1985-1 C.B. 184 | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 63 | `src-surfshark` | 2026 deepfake-loss analysis | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 64 | `src-synthid` | SynthID | **EMPTY** | **none** | 0 | yes | *listed by no lesson, cited by none* |
| 65 | `src-vectara` | Introducing the next generation of Vectara's hallucination leaderboard | **EMPTY** | **none** | 0 | yes | *listed by no lesson, cited by none* |
| 66 | `src-woelbing` | Estate of Donald Woelbing v. Commissioner, T.C. Docket No. 30261-13, and Estate of Marion Woelbing v. Commissioner, T.C. Docket No. 30260-13 | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 67 | `src-zhao` | Invisible image watermarks are provably removable using generative AI | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |


---

## Links, for the reading

| Key | Link |
|---|---|
| `src-case` | *not applicable* |
| `src-wolfram` | https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/ |
| `src-magesh` | https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/ |
| `src-regsp` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-claude-marks` | https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content |
| `src-memory` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-effort` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-tools3` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-pricing` | https://platform.claude.com/docs/en/about-claude/pricing |
| `src-kitces-notetakers` | https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/ |
| `src-aa` | https://artificialanalysis.ai/models |
| `src-anthropic-ctx` | https://www.anthropic.com/engineering/contextual-retrieval |
| `src-ctxwindow` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-finra2409` | https://www.finra.org/rules-guidance/notices/24-09 |
| `src-models` | https://platform.claude.com/docs/en/models/overview |
| `src-synthid-text` | https://ai.google.dev/responsible/docs/safeguards/synthid |
| `src-cfp-genai` | https://www.cfp.net/ethics/compliance-resources/2025/02/generative-ai-ethics-guide |
| `src-context-windows` | https://platform.claude.com/docs/en/build-with-claude/context-windows |
| `src-finra2026` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-sec-ai` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-anthropic-terms` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-api-messages` | https://platform.claude.com/docs/en/api/messages |
| `src-daly` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-kitces-productivity` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-personalization` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-plugins` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-secpri` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-skills` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-arup` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-cfp-code` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-dahl-fictions` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-finra-inj` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-iskowitz` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-t3-survey` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-wiretap` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-beta` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-charlotin` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-directory` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-features` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-google-ptcf` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-kalai` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-lee-cognitive` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-openai-pricing` | https://openai.com/api/pricing/ |
| `src-rohrer` | https://doi.org/10.1037/edu0000001 |
| `src-routing` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-sampling` | https://artefact2.github.io/llm-sampling/ |
| `src-sec-withdraw` | https://www.sec.gov/rules-regulations/2025/06/s7-12-23 |
| `src-zheng-persona` | https://aclanthology.org/2024.findings-emnlp.888/ |
| `src-anthropic-fluency` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-cve` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-davidson` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-deloitte` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-gartner` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-hallowell` | *not applicable* |
| `src-irc` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-kessler` | *not applicable* |
| `src-kitces-advisortech` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-laplace` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-morningstar` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-owasp` | https://owasp.org/www-project-top-10-for-large-language-model-applications/ |
| `src-rr200464` | https://www.irs.gov/irb/2004-27_IRB |
| `src-rr8513` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-surfshark` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-synthid` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-vectara` | https://www.vectara.com/blog/introducing-the-next-generation-of-vectaras-hallucination-leaderboard |
| `src-woelbing` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-zhao` | https://arxiv.org/abs/2306.01953 |


---

## Retrieval notes

What happened the last time somebody tried, and what it does and does not say
about the source.

### `src-claude-marks`

Fetched 2026-09-25 from this build environment for the session-4 rebuild, through a summarising fetch rather than a raw read, so every statement below is the page's substance, not its wording. It corrects the earlier session-4 claim that nothing generated with Claude is watermarked: supported Claude models now mark their output.

### `src-pricing`

Fetched in full 2026-08-25 for Phase 3.5, and again in full 2026-09-13 for the session-2 retrieval bridge; the table is unchanged for Sonnet 5, Opus 5 and Fable 5, and the FAQ gives the rule of thumb of one token to about 0.75 words. PULL-002 (session-2) carried a PARTIAL DATE, "2026-08", until the 2026-09-13 pull replaced it.

### `src-aa`

PULL-002 (session-2) carries a PARTIAL DATE, "2026-08". A month cannot be ordered against a day, which is where this record's version incoherence hid. The ordering rule now reports every partial date as a precondition failure AND orders it at its earliest possible day, so the v4.1.1 -> v4.1 regression against PULL-003 still fires.

### `src-models`

Re-fetched 2026-09-13 at the page's current address for session-2 §01. Every Claude model ID is a pinned snapshot, including the dateless IDs from the 4.6 generation on; Fable 5.1 is the current flagship at $10 / $50 per MTok and Fable 5 is listed as a legacy model, still available.

### `src-synthid-text`

The 2025-04-09 in `published` is the page's OWN last-updated stamp, in UTC, not a publication date; it is a living documentation page and the stamp is the only date it carries. RETRIEVED OUTSIDE THIS BUILD ENVIRONMENT: the instructor's analyst surface loaded the page on 2026-08-25 and supplied the substantiations recorded in `scope`. This environment answers 403 on CONNECT for the host, so no generator here has read the page and none can re-check it. A retrieval is not a reading, so `last_verified` is EMPTY and stays that way until a human attests at a terminal.

### `src-cfp-genai`

NOT RETRIEVED. cfp.net and the press-release hosts are egress-blocked from this build environment (2026-09-25). The title, the February 2025 date and the substance in scope come from search-engine summaries of the guide and of CFP Board's press release of 25 February 2025, which is why the confidence is M. The instructor holds the PDF (instructor-notes/session-3.md, the 09-21 night) and can raise it by reading the page.

### `src-context-windows`

Fetched in full 2026-09-13 for the session-2 retrieval bridge. Three sentences carry the lesson's claims. On contents, everything in the request counts toward the context window, the system prompt, every message including tool results, images and documents, and the tool definitions. On accumulation, each turn's input phase contains all previous conversation history plus the current user message, and previous turns are preserved completely. On degradation, as token count grows, accuracy and recall degrade, a phenomenon the page names context rot. The page adds that chat interfaces such as claude.ai can manage the window on a rolling first-in, first-out basis.

### `src-api-messages`

Fetched 2026-09-13 for session-2 §01. The temperature parameter is marked deprecated for models released after Claude Opus 4.6, with 1.0 accepted for backwards compatibility and other values rejected with a 400 error; it defaults to 1.0 and ranges 0.0 to 1.0; the page states that even with temperature of 0.0 the results will not be fully deterministic.

### `src-cfp-code`

NOT RETRIEVED. cfp.net is egress-blocked from this build environment (2026-09-25). Standard A.14's name and its reasonable-care duty are carried from the instructor's own run sheet for the 2026-09-21 session, which names Standards A.9 and A.14 at high confidence from the Code itself; the wording on the session-4 page is a paraphrase, not a quotation, and the chip is M until the page is read.

### `src-charlotin`

PARTIAL DATE. The day was never recorded. The pull captured a count the source itself dates "as of 9 June 2026" (session-2:1669) and the text entered the repo on 2026-08-15, so the retrieval falls in 2026-06-09..2026-06-30. Not narrowed further, and no day is invented.

### `src-openai-pricing`

The GPT-5.6 Sol, Terra and Luna rates in session-2 §02 entered the repository with the 2026-08 pull and no retrieval was recorded for them. openai.com was egress-blocked on 2026-09-12 when this record was written, so the rates are carried at M until the DW-081 re-pull records a retrieval.

### `src-sec-withdraw`

NOT READ FROM THE SEC. The withdrawal on 12 June 2025 of fourteen proposals, the predictive data analytics proposal of August 2023 among them, is reported consistently by several law-firm client alerts reached through search on 2026-09-25; the SEC page itself was not loaded from this build. M until it is.

### `src-kitces-advisortech`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: www.kitces.com is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work.

### `src-owasp`

Fetch of the cited link ATTEMPTED 2026-08-25 and REFUSED before it reached the source: owasp.org and genai.owasp.org are both blocked by the build environment's egress policy (403 on CONNECT), so last_retrieved stays unresolved — the cited page itself was never loaded. A SURROGATE was reachable and was read: the GitHub repository backing that exact project page, fetched 2026-08-25. Reading a surrogate is not retrieving the source and no date is written for one.

### `src-synthid`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: the Google DeepMind host is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work. STILL OPEN AFTER 2026-08-25, and this record now says which references are open rather than leaving them to be counted by hand. `src-synthid-text` was added that day for a page that WAS retrieved, and it closed exactly one of the eleven references — session-4:1476, the factual-responses claim. The other ten remain on this key and this page has still never been loaded: :1412 and :1416 are C2PA metadata and soft-binding claims that belong to the C2PA specification rather than to Google; :1425 and :1440 are the tournament-sampling mechanism, whose real authority is the Nature paper the retrieved page names and which no build has read either; :1443 and :1457 are image, video and audio robustness, which the retrieved page does not cover at all; :1460 is the adoption-figure paragraph, whose second sentence asserts what a page nobody has loaded currently says and now carries [UNCONFIRMED]; :1493 is the formatter-erases-the-slack claim; :1500 chips a sentence whose sources are Zhao, two arXiv preprints and Christ. Registered in docs/deferred-work.md as session-4 work.

### `src-vectara`

Fetch of the cited link ATTEMPTED 2026-08-25 and REFUSED before it reached the source: www.vectara.com is blocked by the build environment's egress policy (403 on CONNECT), so last_retrieved stays unresolved — the cited blog post itself was never loaded. A SURROGATE was reachable and was read: Vectara's own hallucination-leaderboard repository, fetched 2026-08-25, last updated 2026-05-11, HHEM-2.3, 123 models. Reading a surrogate is not retrieving the source.

### `src-zhao`

THE PAPER ITSELF WAS NEVER LOADED, so last_retrieved is unresolved. arxiv.org, proceedings.neurips.cc, openreview.net, dl.acm.org and semanticscholar.org are all blocked by the build environment's egress policy (403 on CONNECT). Identity was established on 2026-08-25 from the AUTHORS' OWN REPOSITORY, github.com/XuandongZhao/WatermarkAttacker, which was reachable and returned the official BibTeX and a NeurIPS 2024 badge verbatim, corroborated by six independent search-index entries (arXiv 2306.01953, OpenReview 7hy5fy2OC6, NeurIPS 2024 poster 96428, an ACM DL DOI, a Semantic Scholar record, and the proceedings PDF path). A repository is not the paper and a search index is not a retrieval, so no date is written for either. [UNVERIFIED, needs source] for the proceedings volume and page range.



---

## Sources whose content CHANGED on the last fetch

**A fetch that found the source saying something different is a finding, not
an update.** Nothing below has been silently rewritten in the lessons. Each
entry names the delta and every lesson element that depends on it.

### `src-pricing` — 8 reference(s)

2026-08-25. The page now states that Sonnet 5's $2 / $10 introductory pricing "is now the standard price" and that "the previously scheduled increase to $3/$15 per million input/output tokens on September 1, 2026 will not occur". The 2026-07-28 pull recorded the increase as scheduled. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-08-25 in Phase 3.6: session-1 §10's second Sonnet 5 table row and its "rises 50% tomorrow" note both carried the cancelled rise and are gone; the surviving row states $2 / $10 / $0.20 with no date on it. Three script arrays carried the same cancelled figure and were corrected with it — TIERS (§03 cost boxes), PATHS (§06 practice cost) and DPT (§06 document pass), the last two of which also printed the label "Sonnet 5 (from 1 Sep)" on screen. session-2 §02's "Sonnet 5 lists at $2 in / $10 out per million tokens" was UNAFFECTED and is the standing price. Phase 3.5 flagged rather than resolved; Phase 3.6 resolved on instruction.

### `src-owasp` — 0 reference(s)

2026-08-25. THE SOURCE HAS MOVED. Established from the project's own GitHub repository, which the blocked page is built from. OWASP's own words describe the cited project page as maintained as a historical archive; active development moved to github.com/GenAI-Security-Project/GenAI-LLM-Top10 and a new edition, OWASP GenAI LLM Top 10 2026, was published 2026-08-04. DEPENDENT LESSON ELEMENTS: session-4 §05's claim that prompt injection is LLM01 SURVIVES the move intact — it is LLM01:2026 Prompt Injection in the new edition, and is now anchorable to a dated edition instead of an undated page. The CITATION does not survive: the `link` field points at an archive. The 'six of ten agentic categories' half of the same sentence is separately UNCONFIRMED — an Agentic Top 10 2026 v1.0 exists (published 2025-12-01) but sits on no reachable host and its category count was not read. NOT silently updated.

### `src-vectara` — 0 reference(s)

2026-08-25. THE MEASUREMENTS HOLD; THE SUPERLATIVE IS STALE. Every per-model rate session-3 quotes is still on the live board — Gemini-3-Pro 13.6%, Claude Sonnet 4.5 12.0%, GPT-OSS-120B 14.2%, DeepSeek-R1 11.3%, gemini-2.5-flash-lite 3.3%. But 3.3% is now RANK 3, not the floor; the floor is 1.8%. DEPENDENT LESSON ELEMENTS: session-3's HALL chart array labels 3.3% 'Best model, grounded' at :2010, and the toggle panel teaches the grounded range as '3.3% to above 13%' at :2139. Both are superlatives about a leaderboard that has moved past them; the numbers themselves are unchanged. Separately, this record's `scope` asserts a 32K-token length and a 3,792 / 3,939 complexity split that the reachable artifact does not state — it says '50 words to as long as 24K words' and gives no split. NOT silently updated.


---

## What this build could not reach

**4 source host(s) refused the connection before the request reached them.**
This build environment enforces an egress policy; on 2026-08-25 every source host
except `platform.claude.com` answered **403 to CONNECT**. That is a fact about
the environment and **not** about the sources: none of them is known to have
moved or gone. No `last_retrieved` date was written for any of them, because no
retrieval happened.

| Key | Refs | Host |
|---|---|---|
| `src-kitces-advisortech` | 0 | *link unknown* |
| `src-owasp` | 0 | owasp.org |
| `src-synthid` | 0 | *link unknown* |
| `src-vectara` | 0 | www.vectara.com |
