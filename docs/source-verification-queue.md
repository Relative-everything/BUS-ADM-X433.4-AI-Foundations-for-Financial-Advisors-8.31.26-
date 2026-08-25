# Source verification queue

**Generated from `SOURCES.md` by `scripts/build-bibliography.mjs`. Do not edit:
the next run overwrites it.**

This is the instructor's work list, in the order the work is worth doing. A
source **17 claims rest on** is worth verifying before one that carries
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
| Source records | **57** |
| `last_verified` **EMPTY** | **53** |
| `last_verified` populated | 1 |
| `last_verified` *not applicable* (synthetic or fabricated) | 3 |
| References standing behind an EMPTY `last_verified` | **143** of 176 |
| Moving targets | 20 |
| Lock | notarised, digest `d716c1839e256b3c` |


## Already attested

Each one cites the evidence in the repository that records the confirmation.

- **`src-wolfram`** — 2026-08-23. EDITORIAL.md, "Seventeen names. Instructor-verified." — the locked 17 section names of this essay, entered 2026-08-23 in commit bd8f458 and enforced by A11. Enumerating the seventeen section names requires having opened the essay.


---

## The queue

| # | Key | Title | `last_verified` | `last_retrieved` | Refs | Moving | Depends on it |
|---|---|---|---|---|---|---|---|
| 1 | `src-case` | The Cole household | *n/a* | *n/a* | 17 | no | S1 `#s1` · S2 `#s5`×2 · S2 `#s6` · S3 `#s7` · S3 `#s10` · S3 `#s16` · S4 `#s2`×2 · S4 `#sRSP` · S4 `#s5` · S4 `#sW1` · S4 `#sW2`×2 · S4 `#s7`×2 · S4 `#sWS` |
| 2 | `src-wolfram` | What is ChatGPT doing … and why does it work? | **2026-08-23** | **none** | 16 | no | S1 `#s2` · S1 `#s3`×2 · S1 `#s4` · S1 `#s5`×2 · S2 `#s1`×2 · S2 `#s4` · S3 `#s2`×2 · S3 `#s3` · S3 `#s8`×2 · S4 `#sWS` · S4 `#s8` |
| 3 | `src-aa` | Artificial Analysis Intelligence Index and cost-per-task figures | **EMPTY** | 2026-08-13 | 12 | yes | S1 `#s10`×2 · S2 `#s5`×2 · S4 `#s3`×5 · S4 `#s7` · S4 `#sWS`×2 |
| 4 | `src-synthid` | SynthID | **EMPTY** | **none** | 11 | yes | S4 `#sW1`×8 · S4 `#sW2`×3 |
| 5 | `src-regsp` | Regulation S-P: Privacy of consumer financial information and safeguarding customer information, 2024 amendments | **EMPTY** | **none** | 10 | no | S3 `#s14` · S4 `#s2`×7 · S4 `#sRSP` · S4 `#s7` |
| 6 | `src-anthropic-ctx` | Contextual retrieval in AI systems | **EMPTY** | **none** | 9 | no | S3 `#s5`×2 · S3 `#sHY` · S3 `#s6`×2 · S3 `#s16`×4 |
| 7 | `src-memory` | Use Claude's chat search and memory to build on previous context | **EMPTY** | 2026-08-20 | 9 | yes | S0.1 `#s0` · S0.1 `#s5`×2 · S0.1 `#s6`×2 · S0.1 `#s7` · S0.1 `#s9` · S0.1 `#s10`×2 |
| 8 | `src-tools3` | When should I use web search, extended thinking, and research? | **EMPTY** | 2026-08-20 | 9 | yes | S0.1 `#s1` · S0.1 `#s4` · S0.1 `#s5`×3 · S0.1 `#s8`×3 · S0.1 `#s9` |
| 9 | `src-effort` | Change the model, effort, and thinking settings | **EMPTY** | 2026-08-20 | 8 | yes | S0.1 `#s1` · S0.1 `#s2` · S0.1 `#s3`×5 · S0.1 `#s9` |
| 10 | `src-kitces-notetakers` | Best AI notetakers for financial advisor meetings: Adoption, satisfaction, and trends | **EMPTY** | **none** | 8 | no | S3 `#s9` · S3 `#s10` · S3 `#s11`×4 · S3 `#s16`×2 |
| 11 | `src-ctxwindow` | How large is the context window on paid Claude plans? | **EMPTY** | 2026-08-20 | 6 | yes | S0.1 `#s1` · S0.1 `#s4`×4 · S0.1 `#s6` |
| 12 | `src-magesh` | Hallucination-free? Assessing the reliability of leading AI legal research tools | **EMPTY** | **none** | 6 | no | S2 `#s10` · S3 `#s7` · S3 `#s15` · S3 `#s16` · S4 `#s7` · S4 `#s9` |
| 13 | `src-daly` | Artificial Intelligence and the Future of Investment Management | **EMPTY** | **none** | 4 | no | S4 `#s1` · S4 `#sW1`×2 · S4 `#sW2` |
| 14 | `src-models` | Models overview | **EMPTY** | 2026-08-20 | 4 | yes | S0.1 `#s2` · S0.1 `#s3`×2 · S0.1 `#s4` |
| 15 | `src-pricing` | Pricing | **EMPTY** | 2026-08-25 | 4 | yes | S1 `#s5` · S1 `#s11`×3 |
| 16 | `src-vectara` | Introducing the next generation of Vectara's hallucination leaderboard | **EMPTY** | **none** | 4 | yes | S3 `#s7` · S3 `#s16`×3 |
| 17 | `src-plugins` | Use plugins in Claude | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s7`×3 |
| 18 | `src-skills` | What are skills? | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s6` · S0.1 `#s7` · S0.1 `#s9` |
| 19 | `src-wiretap` | Cal. Penal Code § 637.2(a)(1), (c); 18 U.S.C. § 2511 | **EMPTY** | **none** | 3 | no | S3 `#s12`×3 |
| 20 | `src-anthropic-terms` | Privacy Center and Commercial Terms | **EMPTY** | 2026-08-14 | 2 | yes | S4 `#s3` · S4 `#s6` |
| 21 | `src-dahl-fictions` | Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models | **EMPTY** | **none** | 2 | no | S2 `#s10`×2 |
| 22 | `src-finra2409` | Regulatory Notice 24-09 | **EMPTY** | **none** | 2 | no | S1 `#s14`×2 |
| 23 | `src-kitces-productivity` | Kitces Research on Advisor Productivity | **EMPTY** | **none** | 2 | no | S2 `#s9`×2 |
| 24 | `src-personalization` | Understanding Claude's personalization features | **EMPTY** | 2026-08-20 | 2 | yes | S0.1 `#s1` · S0.1 `#s6` |
| 25 | `src-sec-ai` | Enforcement actions against Delphia (USA) Inc. and Global Predictions, Inc. | **EMPTY** | **none** | 2 | no | S1 `#s1`×2 |
| 26 | `src-arup` | Reporting on the Arup deepfake incident | **EMPTY** | **none** | 1 | no | S4 `#s5` |
| 27 | `src-beta` | Available beta and research preview features | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 28 | `src-charlotin` | AI Hallucination Cases database | **EMPTY** | 2026-06 *(month only)* | 1 | yes | S2 `#s10` |
| 29 | `src-deloitte` | Generative-AI fraud projection | **EMPTY** | **none** | 1 | no | S4 `#s5` |
| 30 | `src-directory` | Browse skills, connectors, and plugins in one directory | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 31 | `src-features` | Features and capabilities collection index | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 32 | `src-finra-inj` | Understanding Generative AI and Prompt Injection Fundamentals | **EMPTY** | **none** | 1 | no | S4 `#s5` |
| 33 | `src-finra2026` | 2026 Annual Regulatory Oversight Report | **EMPTY** | **none** | 1 | no | S4 `#s1` |
| 34 | `src-gartner` | Survey of 302 security leaders | **EMPTY** | **none** | 1 | no | S4 `#s5` |
| 35 | `src-kalai` | Why language models hallucinate | **EMPTY** | 2025-05-11 | 1 | no | S1 `#s9` |
| 36 | `src-lee-cognitive` | The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers | **EMPTY** | **none** | 1 | no | S3 `#s15` |
| 37 | `src-owasp` | Top 10 for LLM Applications and Top 10 for Agentic Applications | **EMPTY** | **none** | 1 | yes | S4 `#s5` |
| 38 | `src-routing` | Why Claude switched models in your conversation with Fable 5 | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s2` |
| 39 | `src-sampling` | LLM sampling visualiser | **EMPTY** | **none** | 1 | no | S1 `#s8` |
| 40 | `src-secpri` | Examination priorities: Fiscal year 2026, §VII | **EMPTY** | **none** | 1 | no | S4 `#s1` |
| 41 | `src-surfshark` | 2026 deepfake-loss analysis | **EMPTY** | **none** | 1 | no | S4 `#s5` |
| 42 | `src-t3-survey` | Software Survey 2026 | **EMPTY** | **none** | 1 | no | S2 `#s9` |
| 43 | `src-zheng-persona` | When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models | **EMPTY** | **none** | 1 | no | S2 `#s6` |
| 44 | `src-anthropic-fluency` | AI fluency: Frameworks and foundations | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 45 | `src-cve` | CVE-2025-32711 (EchoLeak, CVSS 9.3) and CVE-2025-54135 (CurXecute, CVSS 9.8) | **EMPTY** | **none** | 0 | no | *listed by S4, cited by none* |
| 46 | `src-davidson` | Estate of William M. Davidson v. Commissioner, T.C. Docket No. 13748-13 | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 47 | `src-google-ptcf` | Gemini for Workspace: Prompting guide 101 | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 48 | `src-hallowell` | Hallowell v. Commissioner, T.C. Memo. 2023-217 | *n/a* | *n/a* | 0 | no | *listed by S4, cited by none* |
| 49 | `src-irc` | Internal Revenue Code §§ 671, 675, 2036, 2702, 7520 | **EMPTY** | *n/a* | 0 | no | *listed by S2, cited by none* |
| 50 | `src-iskowitz` | AI notetakers and compliance in wealth management: What firms need to know | **EMPTY** | **none** | 0 | no | *listed by S3, cited by none* |
| 51 | `src-kessler` | Kessler v. Commissioner, 152 T.C. 88 (2019) | *n/a* | *n/a* | 0 | no | *listed by S2, cited by none* |
| 52 | `src-kitces-advisortech` | The Latest in Financial AdvisorTech — AdvisorTech columns, October 2025, November 2025 and August 2026 | **EMPTY** | **none** | 0 | yes | *listed by S3, cited by none* |
| 53 | `src-laplace` | A philosophical essay on probabilities | **EMPTY** | *n/a* | 0 | no | *listed by S2, cited by none* |
| 54 | `src-morningstar` | AI for advisors: Enhancing client conversations | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 55 | `src-rr200464` | Rev. Rul. 2004-64, 2004-2 C.B. 7 (2004-27 I.R.B. 9) | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 56 | `src-rr8513` | Rev. Rul. 85-13, 1985-1 C.B. 184 | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 57 | `src-woelbing` | Estate of Donald Woelbing v. Commissioner, T.C. Docket No. 30261-13, and Estate of Marion Woelbing v. Commissioner, T.C. Docket No. 30260-13 | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |


---

## Links, for the reading

| Key | Link |
|---|---|
| `src-case` | *not applicable* |
| `src-wolfram` | https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/ |
| `src-aa` | https://artificialanalysis.ai/models |
| `src-synthid` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-regsp` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-anthropic-ctx` | https://www.anthropic.com/engineering/contextual-retrieval |
| `src-memory` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-tools3` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-effort` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-kitces-notetakers` | https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/ |
| `src-ctxwindow` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-magesh` | https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/ |
| `src-daly` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-models` | https://platform.claude.com/docs/en/about-claude/models/overview |
| `src-pricing` | https://platform.claude.com/docs/en/about-claude/pricing |
| `src-vectara` | https://www.vectara.com/blog/introducing-the-next-generation-of-vectaras-hallucination-leaderboard |
| `src-plugins` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-skills` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-wiretap` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-anthropic-terms` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-dahl-fictions` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-finra2409` | https://www.finra.org/rules-guidance/notices/24-09 |
| `src-kitces-productivity` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-personalization` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-sec-ai` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-arup` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-beta` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-charlotin` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-deloitte` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-directory` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-features` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-finra-inj` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-finra2026` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-gartner` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-kalai` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-lee-cognitive` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-owasp` | https://owasp.org/www-project-top-10-for-large-language-model-applications/ |
| `src-routing` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-sampling` | https://artefact2.github.io/llm-sampling/ |
| `src-secpri` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-surfshark` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-t3-survey` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-zheng-persona` | https://aclanthology.org/2024.findings-emnlp.888/ |
| `src-anthropic-fluency` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-cve` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-davidson` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-google-ptcf` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-hallowell` | *not applicable* |
| `src-irc` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-iskowitz` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-kessler` | *not applicable* |
| `src-kitces-advisortech` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-laplace` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-morningstar` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-rr200464` | https://www.irs.gov/irb/2004-27_IRB |
| `src-rr8513` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-woelbing` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |


---

## Retrieval notes

What happened the last time somebody tried, and what it does and does not say
about the source.

### `src-aa`

PULL-002 (session-2) carries a PARTIAL DATE, "2026-08". A month cannot be ordered against a day, which is where this record's version incoherence hid. The ordering rule now reports every partial date as a precondition failure AND orders it at its earliest possible day, so the v4.1.1 -> v4.1 regression against PULL-003 still fires.

### `src-synthid`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: the Google DeepMind host is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work.

### `src-pricing`

Fetched in full 2026-08-25 for Phase 3.5. PULL-002 (session-2) carries a PARTIAL DATE, "2026-08"; it is kept because it is the honest record of what that lesson pulled.

### `src-vectara`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: www.vectara.com is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work.

### `src-charlotin`

PARTIAL DATE. The day was never recorded. The pull captured a count the source itself dates "as of 9 June 2026" (session-2:1669) and the text entered the repo on 2026-08-15, so the retrieval falls in 2026-06-09..2026-06-30. Not narrowed further, and no day is invented.

### `src-owasp`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: owasp.org is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work.

### `src-kitces-advisortech`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: www.kitces.com is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work.



---

## Sources whose content CHANGED on the last fetch

**A fetch that found the source saying something different is a finding, not
an update.** Nothing below has been silently rewritten in the lessons. Each
entry names the delta and every lesson element that depends on it.

### `src-pricing` — 4 reference(s)

2026-08-25. The page now states that Sonnet 5's $2 / $10 introductory pricing "is now the standard price" and that "the previously scheduled increase to $3/$15 per million input/output tokens on September 1, 2026 will not occur". The 2026-07-28 pull recorded the increase as scheduled. DEPENDENT LESSON ELEMENTS: session-1 §10 table row "Sonnet 5 — from 1 Sep · $3 · $15 · $0.30" at :1727, and the note "Sonnet 5 introductory pricing ends tonight and rises 50% tomorrow" at :1732 — both now state a price rise that the source says will not happen. session-2 §02's "Sonnet 5 lists at $2 in / $10 out per million tokens" at :1380 is UNAFFECTED and is now the standing price. NOT silently updated: Phase 3.5 flags source changes rather than resolving them.


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
| `src-synthid` | 11 | *link unknown* |
| `src-vectara` | 4 | www.vectara.com |
| `src-owasp` | 1 | owasp.org |
| `src-kitces-advisortech` | 0 | *link unknown* |
