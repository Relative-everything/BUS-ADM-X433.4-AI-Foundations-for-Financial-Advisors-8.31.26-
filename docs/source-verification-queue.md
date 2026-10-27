# Source verification queue

**Generated from `SOURCES.md` by `scripts/build-bibliography.mjs`. Do not edit:
the next run overwrites it.**

This is the instructor's work list, in the order the work is worth doing. A
source **95 claims rest on** is worth verifying before one that carries
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
| Source records | **144** |
| `last_verified` **EMPTY** | **140** |
| `last_verified` populated | 1 |
| `last_verified` *not applicable* (synthetic or fabricated) | 3 |
| References standing behind an EMPTY `last_verified` | **585** of 705 |
| Moving targets | 65 |
| Lock | notarised, digest `03d5867f4f6423ac` |


## Already attested

Each one cites the evidence in the repository that records the confirmation.

- **`src-wolfram`** — 2026-08-23. EDITORIAL.md, "Seventeen names. Instructor-verified." — the locked 17 section names of this essay, entered 2026-08-23 in commit bd8f458 and enforced by A11. Enumerating the seventeen section names requires having opened the essay.


---

## The queue

| # | Key | Title | `last_verified` | `last_retrieved` | Refs | Moving | Depends on it |
|---|---|---|---|---|---|---|---|
| 1 | `src-case` | The Cole household | *n/a* | *n/a* | 95 | no | case-1 `#brief` · case-1 `#commit` · case-1 `#deliverable` · case-1 `#built` · case-2 `#brief` · case-2 `#commit` · case-2 `#deliverable`×2 · case-2 `#built` · case-3 `#brief` · case-3 `#commit` · case-3 `#deliverable` · case-3 `#built` · case-4 `#brief` · case-4 `#commit` · case-4 `#deliverable` · case-4 `#built` · case-4 `#next` · case-5 `#brief` · case-5 `#commit` · case-5 `#deliverable`×2 · case-5 `#built` · case-5 `#next` · S1 `#s1` · S1 `#sCase` · S2 `#sCase` · S2 `#s6b` · S2 `#sZ` · S2 `#sDel` · S3 `#sCase` · S3 `#s2` · S3 `#s4` · S3 `#sRag` · S3 `#s6`×2 · S3 `#sPrep` · S3 `#s7` · S3 `#s9` · S3 `#s10` · S3 `#sChk` · S3 `#sOff`×2 · S3 `#s12` · S3 `#s13` · S3 `#s16` · S4 `#s0` · S4 `#sCase`×2 · S4 `#s2`×3 · S4 `#sAnon` · S4 `#s3` · S4 `#s4` · S4 `#sRSP` · S4 `#s7` · S4 `#s5` · S4 `#s6` · S4 `#sWS` · S4 `#sAud` · S4 `#sW1` · S4 `#sW2` · S4 `#sD` · S4 `#s9` · S4 `#sCR`×4 · S5 `#s0` · S5 `#sCase` · S5 `#s1`×3 · S5 `#sE3` · S5 `#sE4`×2 · S5 `#sE2`×2 · S5 `#sE6`×2 · S5 `#s2`×3 · S5 `#s3`×2 · S5 `#s4` · S5 `#sE1` · S5 `#s5` · S5 `#s7` · S5 `#s6` · S5 `#sLib`×2 · S5 `#sE5`×2 |
| 2 | `src-anthropic-deprecations` | Model deprecations | **EMPTY** | 2026-10-27 | 61 | yes | case-1 `#deliverable`×3 · case-1 `#built`×2 · case-2 `#deliverable`×2 · case-2 `#built`×2 · case-3 `#deliverable`×5 · case-3 `#built`×2 · case-4 `#deliverable`×4 · case-4 `#built`×3 · case-5 `#brief` · case-5 `#commit` · case-5 `#deliverable`×4 · case-5 `#built`×5 · case-5 `#next`×2 · S0.1 `#s0` · S1 `#s8` · S1 `#s10` · S2 `#s3`×2 · S2 `#s5` · S2 `#s8` · S3 `#sOff` · S4 `#sWS` · S4 `#sCR` · S5 `#sCase`×2 · S5 `#s1`×3 · S5 `#sE2`×2 · S5 `#sE6`×4 · S5 `#sE5`×4 |
| 3 | `src-pricing` | Pricing | **EMPTY** | 2026-10-27 | 41 | yes | case-1 `#built`×5 · case-2 `#built`×4 · case-3 `#built`×4 · case-4 `#built`×4 · case-5 `#built`×4 · S1 `#s5`×2 · S1 `#s10`×2 · S1 `#s11`×3 · S1 `#s15`×4 · S2 `#s0` · S2 `#s5`×3 · S4 `#s3` · S4 `#sCR`×4 |
| 4 | `src-wolfram` | What is ChatGPT doing … and why does it work? | **2026-08-23** | **none** | 25 | no | S0.1 `#s11` · S1 `#s2` · S1 `#s3`×2 · S1 `#s5` · S1 `#s4` · S1 `#s15` · S2 `#s0` · S2 `#s1`×2 · S2 `#s2`×2 · S2 `#s3`×2 · S2 `#s4` · S2 `#s12` · S3 `#s2`×2 · S3 `#s7` · S3 `#s16` · S4 `#sWS` · S4 `#s9` · S4 `#sCR` · S5 `#sE3`×2 |
| 5 | `src-regsp-guide` | Enhancements to Regulation S-P: A Small Entity Compliance Guide | **EMPTY** | 2026-10-11 | 23 | no | case-4 `#deliverable`×2 · case-4 `#built`×2 · case-4 `#next` · S3 `#sPol`×2 · S4 `#s4`×3 · S4 `#sRSP`×6 · S4 `#s9` · S4 `#sCR`×6 |
| 6 | `src-anthropic-terms` | Consumer Terms of Service, Commercial Terms of Service and Privacy Policy | **EMPTY** | 2026-10-27 | 20 | yes | case-4 `#next` · S0.1 `#s0` · S1 `#(footer)` · S4 `#(footer)` · S4 `#s3`×6 · S4 `#s4`×2 · S4 `#sCR`×7 · S5 `#s6` |
| 7 | `src-claude-marks` | How Claude marks AI-generated content | **EMPTY** | 2026-10-27 | 18 | yes | S4 `#s1` · S4 `#sW1`×5 · S4 `#sW2`×6 · S4 `#sCR`×6 |
| 8 | `src-secpri` | Examination priorities: Fiscal year 2026, §VII | **EMPTY** | **none** | 14 | no | S3 `#sPol` · S3 `#s16` · S4 `#s1`×3 · S4 `#s7` · S4 `#s5` · S4 `#sAud`×2 · S4 `#s9`×2 · S4 `#sCR`×3 |
| 9 | `src-claude-pricing` | Plans and pricing | **EMPTY** | 2026-10-27 | 13 | yes | case-1 `#built` · case-4 `#built` · case-4 `#next` · S0.1 `#s0`×2 · S1 `#s10` · S1 `#s11` · S1 `#s14b` · S4 `#(footer)` · S4 `#s3`×3 · S4 `#sCR` |
| 10 | `src-magesh` | Hallucination-free? Assessing the reliability of leading AI legal research tools | **EMPTY** | **none** | 13 | no | S2 `#s10`×3 · S3 `#s6`×2 · S3 `#s15` · S3 `#s16`×2 · S4 `#s6`×3 · S4 `#sCR` · S5 `#sE3` |
| 11 | `src-anthropic-dpa` | Data Processing Addendum | **EMPTY** | 2026-10-27 | 12 | yes | case-4 `#built` · case-4 `#next` · S4 `#s3`×2 · S4 `#s4`×2 · S4 `#sCR`×6 |
| 12 | `src-models` | Models overview | **EMPTY** | 2026-10-27 | 12 | yes | case-1 `#built` · case-2 `#built` · case-3 `#built` · case-4 `#built` · case-5 `#built` · S0.1 `#s1` · S1 `#s5` · S2 `#s0` · S2 `#s3` · S3 `#sRag`×2 · S4 `#sCR` |
| 13 | `src-claude-privacy-training` | Is my data used for model training? | **EMPTY** | 2026-10-11 | 11 | yes | case-1 `#built` · case-4 `#next` · S0.1 `#s0`×3 · S0.1 `#s11` · S4 `#s3`×2 · S4 `#sCR`×2 · S5 `#s0` |
| 14 | `src-context-windows` | Context windows | **EMPTY** | 2026-09-13 | 11 | yes | S0.1 `#s1` · S0.1 `#s10` · S1 `#s1` · S1 `#s5`×2 · S2 `#s0` · S2 `#s3` · S3 `#sRag`×2 · S4 `#sWS` · S4 `#sCR` |
| 15 | `src-memory` | Use Claude's chat search and memory to build on previous context | **EMPTY** | 2026-10-27 | 10 | yes | S0.1 `#s1` · S0.1 `#s7` · S0.1 `#s8`×6 · S2 `#s3` · S4 `#sCR` |
| 16 | `src-finra2026` | 2026 FINRA Annual Regulatory Oversight Report | **EMPTY** | **none** | 9 | no | S3 `#s16` · S4 `#s1`×2 · S4 `#s7`×3 · S4 `#sAud`×2 · S4 `#sCR` |
| 17 | `src-anthropic-retention` | API and data retention | **EMPTY** | 2026-10-27 | 8 | yes | S1 `#(footer)` · S4 `#(footer)` · S4 `#s3`×2 · S4 `#s4` · S4 `#sCR`×3 |
| 18 | `src-finra2409` | Regulatory Notice 24-09 | **EMPTY** | **none** | 8 | no | S1 `#s14`×2 · S4 `#s1`×3 · S4 `#s7` · S4 `#s9` · S4 `#sCR` |
| 19 | `src-kitces-notetakers` | Best AI notetakers for financial advisor meetings: Adoption, satisfaction, and trends | **EMPTY** | **none** | 8 | no | S2 `#s12` · S3 `#s9` · S3 `#s10`×2 · S3 `#s11`×2 · S3 `#s16`×2 |
| 20 | `src-personalization` | Understanding Claude's personalization features | **EMPTY** | 2026-10-27 | 8 | yes | S0.1 `#s2`×3 · S0.1 `#s3`×4 · S2 `#s3` |
| 21 | `src-regsp` | Regulation S-P: Privacy of consumer financial information and safeguarding customer information, 2024 amendments | **EMPTY** | **none** | 8 | no | S3 `#sPol` · S4 `#s2`×3 · S4 `#s9` · S4 `#sCR`×2 · S5 `#s6` |
| 22 | `src-cfp-genai` | Generative AI Ethics Guide: A Checklist for Upholding the Code and Standards | **EMPTY** | **none** | 7 | no | case-4 `#built` · case-4 `#next` · S3 `#s16` · S4 `#s2`×2 · S4 `#sAnon`×2 |
| 23 | `src-cve` | CVE-2025-32711 (EchoLeak, CVSS 9.3) | **EMPTY** | **none** | 7 | no | S4 `#s3` · S4 `#s5`×2 · S4 `#sCR`×3 · S5 `#sE3` |
| 24 | `src-lee-cognitive` | The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers | **EMPTY** | 2026-10-02 | 7 | no | S3 `#s15` · S4 `#s9` · S5 `#s5`×3 · S5 `#sE5`×2 |
| 25 | `src-anthropic-ctx` | Introducing Contextual Retrieval | **EMPTY** | 2026-10-27 | 6 | no | S3 `#sRag` · S3 `#s6`×3 · S3 `#s7` · S3 `#s16` |
| 26 | `src-claude-connectors` | Use connectors to extend Claude's capabilities | **EMPTY** | 2026-10-27 | 6 | yes | S0.1 `#s5`×6 |
| 27 | `src-kalai` | Why language models hallucinate | **EMPTY** | **none** | 6 | no | S0.1 `#s11` · S1 `#s9` · S5 `#sE3`×2 · S5 `#s3`×2 |
| 28 | `src-synthid` | SynthID | **EMPTY** | 2026-10-11 | 6 | yes | S4 `#s7` · S4 `#sW1`×2 · S4 `#sCR`×3 |
| 29 | `src-aa` | Artificial Analysis Intelligence Index and cost-per-task figures | **EMPTY** | 2026-08-13 | 5 | yes | S1 `#s10` · S2 `#s5`×3 · S4 `#sWS` |
| 30 | `src-agent-skills` | Agent Skills | **EMPTY** | 2026-10-27 | 5 | yes | S0.1 `#s6`×2 · S4 `#s7` · S4 `#sWS` · S4 `#sCR` |
| 31 | `src-arup` | Reporting on the Arup deepfake incident | **EMPTY** | **none** | 5 | no | S4 `#s5`×2 · S4 `#sCR`×3 |
| 32 | `src-morningstar-fired` | Why do investors break up with their financial advisor? | **EMPTY** | **none** | 5 | no | S5 `#s7`×2 · S5 `#sE5`×3 |
| 33 | `src-openai-data` | How your data is used to improve model performance | **EMPTY** | **none** | 5 | yes | case-4 `#next` · S4 `#s3`×3 · S4 `#sCR` |
| 34 | `src-sec-ai` | Enforcement actions against Delphia (USA) Inc. and Global Predictions, Inc. | **EMPTY** | **none** | 5 | no | S1 `#s1`×2 · S1 `#s14` · S4 `#s1`×2 |
| 35 | `src-secure2-107` | SECURE 2.0 Act of 2022, section 107 (increase in age for required beginning date) | **EMPTY** | 2026-10-12 | 5 | no | case-2 `#deliverable`×3 · case-2 `#next` · S2 `#s12` |
| 36 | `src-synthid-text` | SynthID: Tools for watermarking and detecting LLM-generated Text | **EMPTY** | 2026-08-25 | 5 | yes | S4 `#sW1`×2 · S4 `#sW2`×3 |
| 37 | `src-anthropic-models-overview` | Models overview | **EMPTY** | 2026-10-27 | 4 | yes | S5 `#s1`×3 · S5 `#sE5` |
| 38 | `src-claude-code-settings` | Settings files and precedence | **EMPTY** | 2026-10-27 | 4 | yes | S5 `#s1`×2 · S5 `#sLib`×2 |
| 39 | `src-claude-code-skills` | Extend Claude with skills | **EMPTY** | 2026-10-27 | 4 | yes | S5 `#s1`×2 · S5 `#sLib`×2 |
| 40 | `src-claude-incognito` | Use incognito chats | **EMPTY** | 2026-10-27 | 4 | yes | S0.1 `#s7`×4 |
| 41 | `src-claude-skills-use` | Use skills in Claude | **EMPTY** | 2026-10-27 | 4 | yes | S0.1 `#s6`×4 |
| 42 | `src-claude-watermark` | How Claude's text watermarking works | **EMPTY** | 2026-10-27 | 4 | yes | S4 `#s7` · S4 `#sW1`×3 |
| 43 | `src-finra-inj` | Understanding Generative AI and Prompt Injection Fundamentals | **EMPTY** | **none** | 4 | no | S4 `#s5`×2 · S4 `#sCR`×2 |
| 44 | `src-gemini-privacy` | Gemini Apps Privacy Hub | **EMPTY** | **none** | 4 | yes | case-4 `#next` · S4 `#s3`×2 · S4 `#sCR` |
| 45 | `src-t3-survey` | 2026 T3/Inside Information Software Survey | **EMPTY** | **none** | 4 | no | S2 `#s9` · S2 `#s12d` · S5 `#s6`×2 |
| 46 | `src-anthropic-agents` | Building effective agents | **EMPTY** | 2026-10-27 | 3 | no | S4 `#sWS` · S4 `#sCR`×2 |
| 47 | `src-anthropic-mcp` | Introducing the Model Context Protocol | **EMPTY** | 2026-10-27 | 3 | no | S0.1 `#s5` · S4 `#sWS` · S4 `#sCR` |
| 48 | `src-anthropic-threat` | Detecting and countering misuse of AI: September 2026 | **EMPTY** | 2026-10-27 | 3 | no | S4 `#s5` · S4 `#sCR`×2 |
| 49 | `src-cfp-psychology` | CFP Board adds Psychology of Financial Planning to exam requirements | **EMPTY** | **none** | 3 | no | S5 `#s7`×2 · S5 `#sE5` |
| 50 | `src-claude-code-org` | Manage Claude Code plugins for your organization | **EMPTY** | 2026-10-27 | 3 | yes | S5 `#sLib`×3 |
| 51 | `src-claude-projects` | How can I create and manage projects? | **EMPTY** | 2026-10-27 | 3 | yes | S0.1 `#s2`×3 |
| 52 | `src-claude-research` | Use research on Claude | **EMPTY** | 2026-10-27 | 3 | yes | S0.1 `#s4`×3 |
| 53 | `src-daly` | Artificial Intelligence and the Future of Investment Management | **EMPTY** | **none** | 3 | no | S4 `#s1`×2 · S4 `#s9` |
| 54 | `src-dellacqua` | Navigating the jagged technological frontier: Field experimental evidence of the effects of AI on knowledge worker productivity and quality | **EMPTY** | **none** | 3 | no | S5 `#s5`×2 · S5 `#sE5` |
| 55 | `src-gemini-workspace` | Generative AI in Google Workspace Privacy Hub | **EMPTY** | **none** | 3 | yes | case-4 `#next` · S4 `#s3`×2 |
| 56 | `src-google-ptcf` | Prompting guide 101: A quick-start handbook for effective prompts | **EMPTY** | **none** | 3 | no | S2 `#s6` · S5 `#s2`×2 |
| 57 | `src-kitces-productivity` | Kitces Research on Advisor Productivity (fourth edition, 2024 survey data) | **EMPTY** | **none** | 3 | no | S2 `#s9` · S2 `#s12d` · S2 `#s12` |
| 58 | `src-ms-copilot` | Privacy FAQ for Microsoft Copilot | **EMPTY** | **none** | 3 | yes | S4 `#s3`×2 · S4 `#sCR` |
| 59 | `src-openai-provenance` | Provenance signals (Content Credentials & SynthID) in OpenAI-generated content | **EMPTY** | 2026-10-11 | 3 | yes | S4 `#s7` · S4 `#sW1`×2 |
| 60 | `src-tools3` | When should I use web search, extended thinking, and research? | **EMPTY** | 2026-10-27 | 3 | yes | S0.1 `#s4`×3 |
| 61 | `src-vanguard-alpha` | Putting a value on your value: Quantifying Vanguard Advisor's Alpha | **EMPTY** | **none** | 3 | no | S5 `#s7` · S5 `#sE5`×2 |
| 62 | `src-aa-leaderboard` | Language model leaderboard, Intelligence Index | **EMPTY** | 2026-10-11 | 2 | yes | S1 `#s10`×2 |
| 63 | `src-advisers-204-2` | Books and records to be maintained by investment advisers, 17 CFR 275.204-2 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#sCR` |
| 64 | `src-advisers-206-4-7` | Compliance procedures and practices, 17 CFR 275.206(4)-7 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#sCR` |
| 65 | `src-advisers-fiduciary` | Commission Interpretation Regarding Standard of Conduct for Investment Advisers, Release IA-5248 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#sCR` |
| 66 | `src-anthropic-api-credits` | API credits for Max and Team plans | **EMPTY** | 2026-10-27 | 2 | yes | S1 `#(footer)` · S4 `#(footer)` |
| 67 | `src-anthropic-certs` | What certifications has Anthropic obtained? | **EMPTY** | 2026-10-27 | 2 | yes | S4 `#s3` · S4 `#sCR` |
| 68 | `src-anthropic-ctx-eng` | Effective context engineering for AI agents | **EMPTY** | 2026-10-27 | 2 | no | S4 `#sWS` · S4 `#sCR` |
| 69 | `src-anthropic-thinking` | Claude 3.7 Sonnet and Claude Code | **EMPTY** | 2026-10-27 | 2 | no | S4 `#sWS` · S4 `#sCR` |
| 70 | `src-arena-board` | Text leaderboard | **EMPTY** | 2026-10-11 | 2 | yes | S1 `#s10`×2 |
| 71 | `src-cfp-code` | Code of Ethics and Standards of Conduct | **EMPTY** | **none** | 2 | no | S4 `#s4`×2 |
| 72 | `src-chatgpt-index` | Your public ChatGPT queries are getting indexed by Google and other search engines | **EMPTY** | **none** | 2 | no | S4 `#s3` · S4 `#sCR` |
| 73 | `src-claude-code-marketplace` | Create a marketplace | **EMPTY** | 2026-10-27 | 2 | yes | S5 `#sLib`×2 |
| 74 | `src-claude-memory` | Bringing memory to teams | **EMPTY** | 2026-10-27 | 2 | yes | S4 `#sWS` · S4 `#sCR` |
| 75 | `src-dahl-fictions` | Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models | **EMPTY** | **none** | 2 | no | S2 `#s10`×2 |
| 76 | `src-deepseek` | Wiz Research uncovers exposed DeepSeek database leaking sensitive information, including chat history | **EMPTY** | **none** | 2 | no | S4 `#s3` · S4 `#sCR` |
| 77 | `src-effort` | Change the model, effort, and thinking settings | **EMPTY** | 2026-10-27 | 2 | yes | S4 `#sWS` · S4 `#sCR` |
| 78 | `src-eu-ai-act` | Regulation (EU) 2024/1689 (the Artificial Intelligence Act), Article 50, transparency obligations | **EMPTY** | **none** | 2 | no | S4 `#sW1`×2 |
| 79 | `src-fbi-ic3-2025` | Cryptocurrency and AI scams bilk Americans of billions: 2025 Internet Crime Report | **EMPTY** | **none** | 2 | no | S4 `#s5` · S4 `#sCR` |
| 80 | `src-finra-4511` | FINRA Rule 4511, General Requirements, and Exchange Act Rule 17a-4 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#sCR` |
| 81 | `src-gemini-plans` | Gemini subscriptions | **EMPTY** | 2026-10-11 | 2 | yes | case-4 `#next` · S1 `#s10` |
| 82 | `src-gtig-ai` | GTIG AI Threat Tracker: Advances in threat actor usage of AI tools | **EMPTY** | **none** | 2 | no | S4 `#s5` · S4 `#sCR` |
| 83 | `src-iskowitz` | AI notetakers and compliance in wealth management: What firms need to know | **EMPTY** | **none** | 2 | no | S3 `#sPol` · S3 `#s16` |
| 84 | `src-iss-ai-policy` | AI Adoption Set to Rise Amongst Advisors | **EMPTY** | 2026-10-11 | 2 | no | S4 `#s9`×2 |
| 85 | `src-joa-prompt` | Writing an effective AI prompt for an audit | **EMPTY** | **none** | 2 | no | S4 `#s7`×2 |
| 86 | `src-kitces-aisearch` | Ways advisors can optimize for AI search (AI SEO) | **EMPTY** | **none** | 2 | no | S5 `#s6`×2 |
| 87 | `src-livebench` | LiveBench leaderboard and question releases | **EMPTY** | 2026-10-11 | 2 | yes | S1 `#s10`×2 |
| 88 | `src-meta-feed` | Meta AI's discover feed is full of revealing personal info: here's how to protect your privacy | **EMPTY** | **none** | 2 | no | S4 `#s3` · S4 `#sCR` |
| 89 | `src-metr-2025` | Measuring the impact of early-2025 AI on experienced open-source developer productivity | **EMPTY** | **none** | 2 | no | S5 `#s5`×2 |
| 90 | `src-ms-copilot-edp` | Enterprise data protection in Microsoft 365 Copilot and Microsoft 365 Copilot Chat | **EMPTY** | **none** | 2 | yes | S4 `#s3`×2 |
| 91 | `src-owasp` | OWASP GenAI LLM Top 10 2026 and OWASP Top 10 for Agentic Applications 2026 | **EMPTY** | **none** | 2 | yes | S4 `#sCR`×2 |
| 92 | `src-sec-withdraw` | Withdrawal of proposed regulatory actions, including Conflicts of Interest Associated with the Use of Predictive Data Analytics (S7-12-23) | **EMPTY** | **none** | 2 | no | S4 `#s1`×2 |
| 93 | `src-wiretap` | Cal. Penal Code §§ 632 and 637.2(a)(1), (c); 18 U.S.C. § 2511(2)(d) | **EMPTY** | **none** | 2 | no | S3 `#s12`×2 |
| 94 | `src-0din-gemini` | Phishing for Gemini | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 95 | `src-3b1b-llm` | Large Language Models explained briefly (video, about 8 minutes) | **EMPTY** | 2026-10-13 | 1 | yes | S0.1 `#s11` |
| 96 | `src-aa-index` | Intelligence Index methodology | **EMPTY** | 2026-10-11 | 1 | yes | S1 `#s10` |
| 97 | `src-anthropic-browser-access` | TypeScript SDK | **EMPTY** | 2026-10-27 | 1 | yes | S4 `#(footer)` |
| 98 | `src-anthropic-deprecation-commitments` | Commitments on model deprecation and preservation | **EMPTY** | 2026-10-27 | 1 | no | S5 `#s1` |
| 99 | `src-anthropic-fluency` | AI Fluency: Framework & Foundations | **EMPTY** | **none** | 1 | no | S1 `#s15` |
| 100 | `src-anthropic-injection` | Mitigating prompt injections in browser use | **EMPTY** | 2026-10-27 | 1 | yes | S4 `#sCR` |
| 101 | `src-anthropic-prompting-101` | Prompting 101, Code w/ Claude (video, about 25 minutes) | **EMPTY** | 2026-10-13 | 1 | yes | S1 `#s15` |
| 102 | `src-anthropic-threat-aug25` | Detecting and countering misuse of AI: August 2025 | **EMPTY** | 2026-10-27 | 1 | no | S4 `#sCR` |
| 103 | `src-api-migration-2026-10-21` | Migrating to API version 2026-10-21 | **EMPTY** | 2026-10-27 | 1 | yes | S1 `#s8` |
| 104 | `src-arena-rename` | LMArena is now Arena | **EMPTY** | 2026-10-11 | 1 | no | S1 `#s10` |
| 105 | `src-ascii-smuggling` | Microsoft Copilot: From Prompt Injection to Exfiltration of Personal Information | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 106 | `src-brynjolfsson` | Generative AI at work | **EMPTY** | **none** | 1 | no | S5 `#s5` |
| 107 | `src-charlotin` | AI Hallucination Cases database | **EMPTY** | 2026-06 *(month only)* | 1 | yes | S2 `#s10` |
| 108 | `src-claude-code-host` | Host and maintain a marketplace | **EMPTY** | 2026-10-27 | 1 | yes | S5 `#sLib` |
| 109 | `src-claude-projects-rag` | Retrieval augmented generation (RAG) for projects; What are projects? | **EMPTY** | 2026-10-27 | 1 | yes | S2 `#s12` |
| 110 | `src-claude-web-search` | Enable and use web search | **EMPTY** | 2026-10-27 | 1 | yes | S0.1 `#s4` |
| 111 | `src-deloitte` | Generative AI is expected to magnify the risk of deepfakes and other fraud in banking | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 112 | `src-directory` | Browse skills, connectors, and plugins in one directory | **EMPTY** | 2026-10-27 | 1 | yes | S0.1 `#s5` |
| 113 | `src-drift` | Cybersecurity Alert: Salesloft Drift AI Supply Chain Attack | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 114 | `src-gemini-api-terms` | Gemini API Additional Terms of Service | **EMPTY** | **none** | 1 | yes | S4 `#(footer)` |
| 115 | `src-gemini-ratelimits` | Rate limits | **EMPTY** | **none** | 1 | yes | S4 `#(footer)` |
| 116 | `src-ibm-breach-2026` | IBM study: one in four malicious breaches are AI-enabled, costing companies $6 million on average | **EMPTY** | **none** | 1 | yes | S4 `#sCR` |
| 117 | `src-il-pipa` | Personal Information Protection Act, 815 ILCS 530/10 | **EMPTY** | **none** | 1 | no | case-4 `#built` |
| 118 | `src-il-retirement-subtraction` | Illinois Income Tax Act, 35 ILCS 5/203(a)(2)(F): the subtraction for federally taxed retirement income | **EMPTY** | 2026-10-12 | 1 | no | case-2 `#deliverable` |
| 119 | `src-investmentnews-t3-2026` | AI moves from novelty to backbone as advisors reshape their fintech stacks | **EMPTY** | **none** | 1 | no | S5 `#s6` |
| 120 | `src-irs-590b` | Publication 590-B, Distributions from Individual Retirement Arrangements (IRAs) | **EMPTY** | 2026-10-12 | 1 | yes | case-2 `#deliverable` |
| 121 | `src-irs-8606` | Form 8606, Nondeductible IRAs, and its instructions | **EMPTY** | 2026-10-12 | 1 | yes | case-2 `#deliverable` |
| 122 | `src-irs-guidance-primer` | Understanding IRS guidance: a brief primer | **EMPTY** | 2026-10-13 | 1 | yes | S1 `#s15` |
| 123 | `src-karpathy-intro` | [1hr Talk] Intro to Large Language Models, the segment 45:43 to 58:37 (video) | **EMPTY** | 2026-10-13 | 1 | yes | S3 `#s16` |
| 124 | `src-noy-zhang` | Experimental evidence on the productivity effects of generative artificial intelligence | **EMPTY** | **none** | 1 | no | S5 `#s5` |
| 125 | `src-openai-pricing` | API pricing | **EMPTY** | **none** | 1 | yes | S2 `#s5` |
| 126 | `src-openai-retire-4o` | Retiring GPT-4o and other ChatGPT models | **EMPTY** | **none** | 1 | yes | S5 `#s1` |
| 127 | `src-pew-ai-summaries` | Google users are less likely to click on links when an AI summary appears in the results | **EMPTY** | **none** | 1 | no | S5 `#s6` |
| 128 | `src-rightcapital-iris` | RightCapital launches Iris, the first planning-focused AI agent designed to transform the financial planning process | **EMPTY** | **none** | 1 | yes | S5 `#s6` |
| 129 | `src-rohrer` | Interleaved practice improves mathematics learning | **EMPTY** | 2026-08-29 | 1 | no | S1 `#s13` |
| 130 | `src-rp-2022-32` | Late portability elections under Rev. Proc. 2022-32 (IRB 2022-30) | **EMPTY** | 2026-10-11 | 1 | no | S2 `#s7` |
| 131 | `src-sampling` | LLM sampling visualiser | **EMPTY** | **none** | 1 | no | S1 `#s8` |
| 132 | `src-sg-deepfake-2026` | Fake Zoom call with PM Wong: police release deepfake footage of scam that caused victim to hand over S$4.9 million | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 133 | `src-td10001` | Required Minimum Distributions, T.D. 10001, 89 FR 58886 (final regulations under IRC § 401(a)(9)) | **EMPTY** | 2026-10-12 | 1 | no | case-2 `#deliverable` |
| 134 | `src-trailofbits-image` | Weaponizing image scaling against production AI systems | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 135 | `src-uae-voice` | Fraudsters cloned company director's voice in $35 million heist, police find | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 136 | `src-unit42-ipi` | Fooling AI agents: web-based indirect prompt injection observed in the wild | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 137 | `src-zheng-persona` | When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models | **EMPTY** | **none** | 1 | no | S2 `#s6` |
| 138 | `src-capitalone` | Information on the Capital One Cyber Incident | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 139 | `src-equifax` | Data protection: actions taken by Equifax and federal agencies in response to the 2017 breach (GAO-18-559) | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 140 | `src-hallowell` | Hallowell v. Commissioner, T.C. Memo. 2023-217 | *n/a* | *n/a* | 0 | no | *listed by S4, cited by none* |
| 141 | `src-kessler` | Kessler v. Commissioner, 152 T.C. 88 (2019) | *n/a* | *n/a* | 0 | no | *listed by S2, cited by none* |
| 142 | `src-kitces-advisortech` | The Latest in Financial AdvisorTech, AdvisorTech columns, August 2026 and November 2025 | **EMPTY** | **none** | 0 | yes | *listed by no lesson, cited by none* |
| 143 | `src-laplace` | A philosophical essay on probabilities | **EMPTY** | *n/a* | 0 | no | *listed by S2, cited by none* |
| 144 | `src-morningstar` | AI for advisors: Enhancing client conversations | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |


---

## Links, for the reading

| Key | Link |
|---|---|
| `src-case` | *not applicable* |
| `src-anthropic-deprecations` | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| `src-pricing` | https://platform.claude.com/docs/en/about-claude/pricing |
| `src-wolfram` | https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/ |
| `src-regsp-guide` | https://www.sec.gov/files/rules/final/2024/regulation-s-p-small-entity-compliance-guide.pdf |
| `src-anthropic-terms` | https://www.anthropic.com/legal/commercial-terms |
| `src-claude-marks` | https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content |
| `src-secpri` | https://www.sec.gov/files/2026-exam-priorities.pdf |
| `src-claude-pricing` | https://claude.com/pricing |
| `src-magesh` | https://onlinelibrary.wiley.com/doi/10.1111/jels.12413 |
| `src-anthropic-dpa` | https://www.anthropic.com/legal/data-processing-addendum |
| `src-models` | https://platform.claude.com/docs/en/models/overview |
| `src-claude-privacy-training` | https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training |
| `src-context-windows` | https://platform.claude.com/docs/en/build-with-claude/context-windows |
| `src-memory` | https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context |
| `src-finra2026` | https://www.finra.org/rules-guidance/guidance/reports/2026-finra-annual-regulatory-oversight-report |
| `src-anthropic-retention` | https://platform.claude.com/docs/en/manage-claude/api-and-data-retention |
| `src-finra2409` | https://www.finra.org/rules-guidance/notices/24-09 |
| `src-kitces-notetakers` | https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/ |
| `src-personalization` | https://support.claude.com/en/articles/10185728-understanding-claude-s-personalization-features |
| `src-regsp` | https://www.federalregister.gov/documents/2024/06/03/2024-11116/regulation-s-p-privacy-of-consumer-financial-information-and-safeguarding-customer-information |
| `src-cfp-genai` | https://www.cfp.net/ethics/compliance-resources/2025/02/generative-ai-ethics-guide |
| `src-cve` | https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-32711 |
| `src-lee-cognitive` | https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf |
| `src-anthropic-ctx` | https://www.anthropic.com/research/contextual-retrieval |
| `src-claude-connectors` | https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities |
| `src-kalai` | https://arxiv.org/abs/2509.04664 |
| `src-synthid` | https://deepmind.google/models/synthid/ |
| `src-aa` | https://artificialanalysis.ai/models |
| `src-agent-skills` | https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview |
| `src-arup` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-morningstar-fired` | https://www.morningstar.com/financial-advisors/why-do-investors-break-up-with-their-financial-advisor |
| `src-openai-data` | https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance |
| `src-sec-ai` | https://www.sec.gov/newsroom/press-releases/2024-36 |
| `src-secure2-107` | https://www.congress.gov/bill/117th-congress/house-bill/2617 |
| `src-synthid-text` | https://ai.google.dev/responsible/docs/safeguards/synthid |
| `src-anthropic-models-overview` | https://platform.claude.com/docs/en/models/overview |
| `src-claude-code-settings` | https://code.claude.com/docs/en/settings |
| `src-claude-code-skills` | https://code.claude.com/docs/en/skills |
| `src-claude-incognito` | https://support.claude.com/en/articles/12260368-use-incognito-chats |
| `src-claude-skills-use` | https://support.claude.com/en/articles/12512180-use-skills-in-claude |
| `src-claude-watermark` | https://www.anthropic.com/news/claude-text-watermark |
| `src-finra-inj` | https://www.finra.org/rules-guidance/key-topics/artificial-intelligence/understanding-generative-ai-and-prompt-injection-fundamentals |
| `src-gemini-privacy` | https://support.google.com/gemini/answer/13594961 |
| `src-t3-survey` | https://t3technologyhub.com/wp-content/uploads/2026/03/2026-T3_Inside-Information-Software-Survey.pdf |
| `src-anthropic-agents` | https://www.anthropic.com/research/building-effective-agents |
| `src-anthropic-mcp` | https://www.anthropic.com/news/model-context-protocol |
| `src-anthropic-threat` | https://www.anthropic.com/threat-intelligence-report-september-2026 |
| `src-cfp-psychology` | https://www.cfp.net/news/2021/03/cfp-board-adds-psychology-of-financial-planning-to-exam-requirements |
| `src-claude-code-org` | https://code.claude.com/docs/en/plugins/org |
| `src-claude-projects` | https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects |
| `src-claude-research` | https://support.claude.com/en/articles/11088861-use-research-on-claude |
| `src-daly` | https://www.sec.gov/newsroom/speeches-statements/daly-020326-artificial-intelligence-future-investment-management-remarks-investment-company-institute-ici-winter |
| `src-dellacqua` | https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321 |
| `src-gemini-workspace` | https://support.google.com/a/answer/15706919 |
| `src-google-ptcf` | https://services.google.com/fh/files/misc/gemini-for-google-workspace-prompting-guide-101.pdf |
| `src-kitces-productivity` | https://www.kitces.com/blog/advisor-productivity-key-drivers-practice-management-team-structure-revenue-client-pricing-success/ |
| `src-ms-copilot` | https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot |
| `src-openai-provenance` | https://help.openai.com/en/articles/8912793-provenance-signals-content-credentials-synthid-in-openai-generated-content |
| `src-tools3` | https://support.claude.com/en/articles/11095361-when-should-i-use-web-search-extended-thinking-and-research |
| `src-vanguard-alpha` | https://corporate.vanguard.com/content/dam/corp/articles/pdf/putting_value_on_your_value_quantifying_vanguard_advisors_alpha.pdf |
| `src-aa-leaderboard` | https://artificialanalysis.ai/leaderboards/models |
| `src-advisers-204-2` | https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.204-2 |
| `src-advisers-206-4-7` | https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.206(4)-7 |
| `src-advisers-fiduciary` | https://sec.gov/rules/interp/2019/ia-5248.pdf |
| `src-anthropic-api-credits` | https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers |
| `src-anthropic-certs` | https://support.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained |
| `src-anthropic-ctx-eng` | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| `src-anthropic-thinking` | https://www.anthropic.com/news/claude-3-7-sonnet |
| `src-arena-board` | https://arena.ai/leaderboard/chat/text |
| `src-cfp-code` | https://www.cfp.net/-/media/files/cfp-board/standards-and-ethics/cfp-code-and-standards.pdf |
| `src-chatgpt-index` | https://techcrunch.com/2025/07/31/your-public-chatgpt-queries-are-getting-indexed-by-google-and-other-search-engines |
| `src-claude-code-marketplace` | https://code.claude.com/docs/en/plugins/create-marketplace |
| `src-claude-memory` | https://claude.com/blog/memory |
| `src-dahl-fictions` | https://academic.oup.com/jla/article/16/1/64/7699227 |
| `src-deepseek` | https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak |
| `src-effort` | https://support.claude.com/en/articles/8664678-change-the-model-effort-and-thinking-settings |
| `src-eu-ai-act` | https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng |
| `src-fbi-ic3-2025` | https://www.fbi.gov/news/press-releases/cryptocurrency-and-ai-scams-bilk-americans-of-billions |
| `src-finra-4511` | https://www.finra.org/rules-guidance/rulebooks/finra-rules/4511 |
| `src-gemini-plans` | https://gemini.google/subscriptions/ |
| `src-gtig-ai` | https://cloud.google.com/blog/topics/threat-intelligence/threat-actor-usage-of-ai-tools |
| `src-iskowitz` | https://wealthtechtoday.com/2025/07/29/ai-notetakers-and-compliance-in-wealth-management-what-firms-need-to-know/ |
| `src-iss-ai-policy` | https://www.issmarketintelligence.com/resources/ai-adoption-set-to-rise-amongst-advisors/ |
| `src-joa-prompt` | https://www.journalofaccountancy.com/newsletters/a-a-focus/writing-an-effective-ai-prompt-for-an-audit/ |
| `src-kitces-aisearch` | https://www.kitces.com/blog/artificial-intelligence-ai-search-engine-optimization-seo-financial-advisor-marketing-content-strategy/ |
| `src-livebench` | https://livebench.ai/ |
| `src-meta-feed` | https://www.tomsguide.com/computing/online-security/meta-ais-discover-feed-is-full-of-revealing-personal-info-heres-how-to-protect-your-privacy |
| `src-metr-2025` | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ |
| `src-ms-copilot-edp` | https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection |
| `src-owasp` | https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ |
| `src-sec-withdraw` | https://www.sec.gov/rules-regulations/2025/06/s7-12-23 |
| `src-wiretap` | https://law.justia.com/codes/california/code-pen/part-1/title-15/chapter-1-5/section-632 |
| `src-0din-gemini` | https://www.0din.ai/blog/phishing-for-gemini |
| `src-3b1b-llm` | https://www.youtube.com/watch?v=LPZh9BOjkQs |
| `src-aa-index` | https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index |
| `src-anthropic-browser-access` | https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/typescript |
| `src-anthropic-deprecation-commitments` | https://www.anthropic.com/research/deprecation-commitments |
| `src-anthropic-fluency` | https://anthropic.skilljar.com/ai-fluency-framework-foundations |
| `src-anthropic-injection` | https://www.anthropic.com/news/prompt-injection-defenses |
| `src-anthropic-prompting-101` | https://www.youtube.com/watch?v=ysPbXH0LpIE |
| `src-anthropic-threat-aug25` | https://www.anthropic.com/news/detecting-countering-misuse-aug-2025 |
| `src-api-migration-2026-10-21` | https://platform.claude.com/docs/en/api/migration-2026-10-21 |
| `src-arena-rename` | https://arena.ai/blog/lmarena-is-now-arena/ |
| `src-ascii-smuggling` | https://embracethered.com/blog/posts/2024/m365-copilot-prompt-injection-tool-invocation-and-data-exfil-using-ascii-smuggling/ |
| `src-brynjolfsson` | https://www.nber.org/papers/w31161 |
| `src-charlotin` | https://www.damiencharlotin.com/hallucinations/ |
| `src-claude-code-host` | https://code.claude.com/docs/en/plugins/host-marketplace |
| `src-claude-projects-rag` | https://support.claude.com/en/articles/11473015-retrieval-augmented-generation-rag-for-projects |
| `src-claude-web-search` | https://support.claude.com/en/articles/10684626-enable-and-use-web-search |
| `src-deloitte` | https://www.deloitte.com/us/en/insights/industry/financial-services/deepfake-banking-fraud-risk-on-the-rise.html |
| `src-directory` | https://support.claude.com/en/articles/14328846-browse-skills-connectors-and-plugins-in-one-directory |
| `src-drift` | https://www.finra.org/rules-guidance/guidance/salesloft-drift-AI-supply-chain-attack |
| `src-gemini-api-terms` | https://ai.google.dev/gemini-api/terms |
| `src-gemini-ratelimits` | https://ai.google.dev/gemini-api/docs/rate-limits |
| `src-ibm-breach-2026` | https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled,-costing-companies-6-million-on-average |
| `src-il-pipa` | https://www.ilga.gov/Documents/legislation/ilcs/documents/081505300K10.htm |
| `src-il-retirement-subtraction` | https://www.ilga.gov/legislation/ilcs/fulltext.asp?DocName=003500050K203 |
| `src-investmentnews-t3-2026` | https://www.investmentnews.com/fintech/ai-moves-from-novelty-to-backbone-as-advisors-reshape-fintech-stacks/265643 |
| `src-irs-590b` | https://www.irs.gov/publications/p590b |
| `src-irs-8606` | https://www.irs.gov/forms-pubs/about-form-8606 |
| `src-irs-guidance-primer` | https://www.irs.gov/newsroom/understanding-irs-guidance-a-brief-primer |
| `src-karpathy-intro` | https://www.youtube.com/watch?v=zjkBMFhNj_g |
| `src-noy-zhang` | https://www.science.org/doi/10.1126/science.adh2586 |
| `src-openai-pricing` | https://developers.openai.com/api/docs/pricing |
| `src-openai-retire-4o` | https://help.openai.com/en/articles/20001051-retiring-gpt-4o-and-other-chatgpt-models |
| `src-pew-ai-summaries` | https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/ |
| `src-rightcapital-iris` | https://www.accessnewswire.com/newsroom/en/business-and-professional-services/rightcapital-launches-iristm-the-first-planning-focused-ai-agent-designed-to-transform-the-fin-1180326 |
| `src-rohrer` | https://doi.org/10.1037/edu0000001 |
| `src-rp-2022-32` | https://www.irs.gov/pub/irs-drop/rp-22-32.pdf |
| `src-sampling` | https://artefact2.github.io/llm-sampling/ |
| `src-sg-deepfake-2026` | https://mothership.sg/2026/05/pm-wong-zoom-deepfake-scam/ |
| `src-td10001` | https://www.govinfo.gov/content/pkg/FR-2024-07-19/html/2024-14542.htm |
| `src-trailofbits-image` | https://blog.trailofbits.com/2025/08/21/weaponizing-image-scaling-against-production-ai-systems/ |
| `src-uae-voice` | https://www.forbes.com/sites/thomasbrewster/2021/10/14/huge-bank-fraud-uses-deep-fake-voice-tech-to-steal-millions/ |
| `src-unit42-ipi` | https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/ |
| `src-zheng-persona` | https://aclanthology.org/2024.findings-emnlp.888/ |
| `src-capitalone` | https://www.capitalone.com/digital/facts2019/ |
| `src-equifax` | https://www.gao.gov/products/gao-18-559 |
| `src-hallowell` | *not applicable* |
| `src-kessler` | *not applicable* |
| `src-kitces-advisortech` | https://www.kitces.com/blog/the-latest-in-financial-advisortech-august-2026-ycharts-zephyr-hadrius-greenboard-feathery/ |
| `src-laplace` | https://www.gutenberg.org/ebooks/58881 |
| `src-morningstar` | https://www.morningstar.com/business/insights/blog/client-engagement/financial-advisor-ai-conversations |


---

## Retrieval notes

What happened the last time somebody tried, and what it does and does not say
about the source.

### `src-anthropic-deprecations`

OPENED on 2026-10-02 and RE-OPENED on 2026-10-04 (platform.claude.com is reachable from this build). On 2026-10-04 every date the page carried on 2026-10-02 was unchanged; the not-sooner-than dates of the current and legacy models were added to the scope for the §02 calendar's new rows. The published date is the page's most recent deprecation announcement (Claude Sonnet 4.5, 30 September 2026); the page is updated in place with every announcement. RE-OPENED in full on 2026-10-12, after FACTS claude-model-ids-and-retirements read it in full on 2026-10-11: every date in the §02 calendar is unchanged, and the table now also lists claude-haiku-5-5 (Active, not sooner than 7 October 2027), with claude-haiku-4-5-20251001 still Active and not sooner than 15 October 2026. Audit 2026-10-27 (fetched in full): verified. Every one of the 24 dates, the lifecycle terms, the 60 days' notice and the testing advice match the live table; the page has added Mythos rows and an API parameter deprecations section (see scope).

### `src-pricing`

Fetched in full 2026-08-25 for Phase 3.5, and again in full 2026-09-13 for the session-2 retrieval bridge; the table is unchanged for Sonnet 5, Opus 5 and Fable 5, and the FAQ gives the rule of thumb of one token to about 0.75 words. PULL-002 (session-2) carried a PARTIAL DATE, "2026-08", until the 2026-09-13 pull replaced it. Audit 2026-10-27 (fetched in full): verified.

### `src-regsp-guide`

sec.gov is unreachable from the build container (FACTS reg-sp-compliance, 2026-10-11). Every figure comes from sec.gov snippets of the compliance guide, fact sheet 34-100155 and the press release, corroborated by law-firm summaries. The two negatives, no SEC notification and no 24-hour clock to the chief compliance officer, rest on their absence from the primary text plus secondary statements. Both compliance dates have passed, so the rule is in force for every covered firm. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Undated staff guide under /rules/final/2024/; the 72-hour clock should be cited to the adopting release (src-regsp).

### `src-anthropic-terms`

Opened directly on 2026-09-27: the Commercial Terms (effective 17 June 2025), the Consumer Terms (effective 8 October 2025), the Privacy Policy (effective 10 September 2026) and the 28 August 2025 news post on the consumer training change. The consumer-side retention figures (five years if training is allowed, 30 days if not) are stated in the news post and on the Claude Code data-usage page; privacy.claude.com itself could not be opened. Earlier retrieval 2026-08-14. Audit 2026-10-27 (fetched in full): verified. Commercial Terms (17 June 2025), Consumer Terms dated 2025-10-08, Privacy Policy (10 September 2026) and the 28 August 2025 post all match. Supplement: anthropic.com/legal/consumer-terms and anthropic.com/news/updates-to-our-consumer-terms.

### `src-claude-marks`

Opened directly on 2026-09-25 and again, in full, on 2026-09-27, together with the Claude Content Checker page at claude.com/check-content. Quotations below are the pages' own words. Read again in full on 2026-10-12 and found to match the 2026-10-11 reading (FACTS claude-text-watermark). Audit 2026-10-27 (fetched in full): verified.

### `src-secpri`

sec.gov is egress-blocked from the build (2026-09-27). §VII's contents in scope are as reported by several consistent law-firm and compliance-firm summaries of the 17 November 2025 release; the record's H stands on the earlier verification of the AI and Regulation S-P focus, and the Appendix D4 use of the polymorphic-malware line is chipped M on the page for that reason. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Supplement: the FY2027 examination priorities (sec.gov/files/2027-exam-priorities.pdf, released 2026-10-23) and the 2026 priorities press release 2025-132. Section number VII and the quoted disclaimer are not confirmed from the PDF.

### `src-claude-pricing`

Opened directly on 2026-09-27, with the Help Center articles on the Max plan (11049741) and on Enterprise seats (13393991) and the Claude Enterprise solutions page. The Max 20x figure is on the Help Center article, not the pricing page. Prices move without notice. Audit 2026-10-27 (fetched in full): verified.

### `src-magesh`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Published 23 April 2025, doi 10.1111/jels.12413 (preprint arXiv:2405.20362); RegLab page reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools kept as the secondary. More than 200 queries, May 2024, and the 17 to 33 percent rates are confirmed; the 43 percent GPT-4 figure appears only in secondary posts (GAP, see register).

### `src-anthropic-dpa`

Opened directly on 2026-09-27, three reads, consistent. Incorporated by reference into the Commercial Terms (Section C, Data Privacy). Quotations in scope are the document's own words. Audit 2026-10-27 (fetched in full): verified.

### `src-models`

Re-fetched 2026-09-13 at the page's current address for session-2 §01. Every Claude model ID is a pinned snapshot, including the dateless IDs from the 4.6 generation on; Fable 5.1 is the current flagship at $10 / $50 per MTok and Fable 5 is listed as a legacy model, still available. Audit 2026-10-27 (fetched in full): verified with corrections. Until this audit the scope named Haiku 4.5 at 200K as the fourth current model; the page now lists Haiku 5.5 at 1M and Haiku 4.5 among the legacy models. Same page as src-anthropic-models-overview (that record's address redirects here); the two records are not merged because the other one is cited only by session-5, which this pass does not touch.

### `src-claude-privacy-training`

privacy.claude.com is unreachable from the build container (FACTS claude-consumer-retention, 2026-10-11). The values come from primary-domain search snippets plus the fully fetched anthropic.com post "Updates to Consumer Terms and Privacy Policy", read again in full on 2026-10-12: up to five years if you allow model training, the existing 30-day period if you do not. The page does not say whether the toggle starts on or off, so the lesson takes the training default from the Consumer Terms, src-anthropic-terms, and states none from this page. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): unreachable. privacy.claude.com is unreachable from this build; the 5-year, 30-day, 2-year, 7-year and 5-year figures and the plan scope are confirmed by domain-restricted search snippets. Supplement: How long do you store my data? (privacy.claude.com/en/articles/10023548) and the Privacy Policy (anthropic.com/legal/privacy), which states the default-on wording "unless you opt out".

### `src-context-windows`

Fetched in full 2026-09-13 for the session-2 retrieval bridge. Three sentences carry the lesson's claims. On contents, everything in the request counts toward the context window, the system prompt, every message including tool results, images and documents, and the tool definitions. On accumulation, each turn's input phase contains all previous conversation history plus the current user message, and previous turns are preserved completely. On degradation, as token count grows, accuracy and recall degrade, a phenomenon the page names context rot. The page adds that chat interfaces such as claude.ai can manage the window on a rolling first-in, first-out basis. Merged on 2026-10-27 with src-anthropic-context, a second record of this same page that session-4 cited: its 2026-09-27 read opened the 100K (11 May 2023) and 200K (21 November 2023) announcements and the 1M announcement of 12 August 2025, now at claude.com/blog/1m-context; the 100K post writes 9K, not 9,000.

### `src-memory`

Audit 2026-10-27 (fetched in full): verified with corrections. All claims live; the toggle is now named Memory from chats under Settings, Your Claude; the no-organisation-controls statement for Team now applies to legacy Team plans only.

### `src-finra2026`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections.

### `src-anthropic-retention`

Opened directly on 2026-09-27, with the Help Center articles on custom retention for Enterprise plans (10440198) and on retention for covered models (15425996, effective 9 June 2026) and the Claude Code data-usage page. Two Anthropic pages differ on the Enterprise chat default (30 days standard against "indefinitely unless a custom period is set"); the lesson states only what both agree on. Audit 2026-10-27 (fetched in full): verified with corrections. The page no longer states a blanket 30-day standard API retention; it says content "is not retained by default; the exception is Covered Models, which require 30-day retention", and defers the rest to the commercial data retention policy (privacy.claude.com article 7996866, unreachable from the build). Help Center 15425996 (Covered Models, effective 9 June 2026) states the 30 days; Help Center 10440198 states the Enterprise default as indefinite. The three lesson sentences that stated 30 days were reworded and chipped to FACTS claude-api-retention. Supplements: both Help Center articles.

### `src-finra2409`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-kitces-notetakers`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Byline Michael Kitces, dated 17 March 2025 (not 15 January). The more-than-one-to-one ratio, the solo pattern and the satisfaction ranking are confirmed; the UHNW drop-off, the fourfold plan rate and the $60 to $80 pricing were not seen in results (GAP, see register).

### `src-personalization`

Audit 2026-10-27 (fetched in full): verified with corrections. Styles are no longer on the page; it now lists instructions, project instructions and skills.

### `src-regsp`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Adopted 16 May 2024; published 3 June 2024 at 89 FR 47688. Link filled with the Federal Register document.

### `src-cfp-genai`

NOT RETRIEVED. cfp.net and the press-release hosts are egress-blocked from this build environment (2026-09-25). The title, the February 2025 date and the substance in scope come from search-engine summaries of the guide and of CFP Board's press release of 25 February 2025, which is why the confidence is M. The instructor holds the PDF (instructor-notes/session-3.md, the 09-21 night) and can raise it by reading the page. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Page and PDF exist on cfp.net with the stated date; the pseudonym wording stays M until the PDF is read.

### `src-cve`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. The MSRC advisory is the primary; the EchoLeak name is Aim Security's; the NVD record at nvd.nist.gov/vuln/detail/CVE-2025-32711 was not confirmed from a browser.

### `src-lee-cognitive`

OPENED IN FULL on 2026-10-02 (the Microsoft Research PDF, 23 pages, text extracted and read). Until that date this record carried the link as unverified and the confidence at M, because the 2026-08 build characterised the paper by its title alone. Session 3's §06 still uses only the title claim; Session 5 uses the measured findings below. The regression coefficients are the non-standardised figures in the paper's Table 4. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-anthropic-ctx`

Audit 2026-10-27 (fetched in full): verified with corrections. The engineering address redirects (308) to /research/; the page's H1 is Introducing Contextual Retrieval and it credits research and writing to Daniel Ford. The 35, 49 and 67 percent reductions, the 5.7 to 1.9 percent failure rates, the 200K threshold and the three datasets are all on the page.

### `src-claude-connectors`

Fetched in full on 2026-10-13 (the page reads "Updated over a week ago" and carries no publication date). Audit 2026-10-27 (fetched in full): verified.

### `src-kalai`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. arXiv 2509.04664, posted 4 September 2025; the earlier retrieval date of 2025-05-11 predates the paper and is withdrawn. The DeepSeek-V3 on 11 May 2025 fixture in scope is not visible in search results (GAP, see register).

### `src-synthid`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: the Google DeepMind host is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work. STILL OPEN AFTER 2026-08-25, and this record now says which references are open rather than leaving them to be counted by hand. `src-synthid-text` was added that day for a page that WAS retrieved, and it closed exactly one of the eleven references — session-4:1476, the factual-responses claim. The other ten remain on this key and this page has still never been loaded: :1412 and :1416 are C2PA metadata and soft-binding claims that belong to the C2PA specification rather than to Google; :1425 and :1440 are the tournament-sampling mechanism, whose real authority is the Nature paper the retrieved page names and which no build has read either; :1443 and :1457 are image, video and audio robustness, which the retrieved page does not cover at all; :1460 is the adoption-figure paragraph, whose second sentence asserts what a page nobody has loaded currently says and now carries [UNCONFIRMED]; :1493 is the formatter-erases-the-slack claim; :1500 chips a sentence whose sources are Zhao, two arXiv preprints and Christ. Registered in docs/deferred-work.md as session-4 work. 2026-10-11, next-term Phase 5: FACTS google-synthid records the page, https://deepmind.google/models/synthid/, as still unreachable from the build container and reads it from primary-domain search snippets, so this record now carries that link and the FACTS retrieval date at M; a snippet is not a reading, and last_verified stays empty. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Supplement: the dated SynthID Detector post and the Gemini-app image verification post on blog.google; the product page is undated and moves.

### `src-aa`

PULL-002 (session-2) carries a PARTIAL DATE, "2026-08". A month cannot be ordered against a day, which is where this record's version incoherence hid. The ordering rule now reports every partial date as a precondition failure AND orders it at its earliest possible day, so the v4.1.1 -> v4.1 regression against PULL-003 still fires. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Index versions v4.1, v4.1.1, v4.2 and v4.3 each have a dated announcement article on artificialanalysis.ai; each pull should cite the matching article so the version divergence is anchored.

### `src-agent-skills`

Opened directly on 2026-09-27. Audit 2026-10-27 (fetched in full): verified with corrections. Page title is now Agent Skills; the name and description limits and the plan list are verbatim; the page has added reserved words (anthropic, claude) and a no-XML rule for the frontmatter.

### `src-arup`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. The FT page is unreachable and ft.com is not indexed for the search tool; the FT's own post of 17 May 2024 says $25mn in 15 transfers to five Hong Kong banks; secondary coverage agrees (HK$200m). The FT headline still needs FT access (GAP).

### `src-morningstar-fired`

NOT RETRIEVED. morningstar.com is egress-blocked from this build environment (2026-10-02). The figures in scope are consistent across four reports found (Financial Advisor magazine, InsuranceNewsNet, Institutional Investor's RIA Intel, the IFA Magazine podcast with both authors); the reports give the sample as 184 investors in one and 185 in another, and the page says "about 185". Re-checked 2026-10-04: morningstar.com and the secondary hosts were still blocked; a fresh search returned the same six shares and 184 investors. The exact title and publication date were not read off the report, so both are recorded as the reports give them, which is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Canonical Morningstar article bylined Labotka, 12 April 2023; 184 of 3,003 across three 2021 to 2022 surveys; the 185 variant is unsupported and dropped.

### `src-openai-data`

NOT RETRIEVED. help.openai.com and openai.com are egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this article and of "Chat and file retention in ChatGPT" (article 8983778), which is why the confidence is M. Read both pages before teaching the numbers. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Supplement: the retention figures belong to Chat and file retention in ChatGPT (help.openai.com article 8983778).

### `src-sec-ai`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Penalty figures consistent across the SEC release and four secondary reports; raised M to H.

### `src-secure2-107`

Citation and effect verified 2026-10-12 from three secondary summaries (Milliman, Foley, Kilpatrick Townsend) found by web search; congress.gov is not reachable from the build container, so the statutory text itself was not fetched. Applicable age 73 for those born 1951 to 1959 and 75 for 1960 and later; the 1959 cohort was clarified by the May 2023 chairs' letter and the July 2024 proposed regulations. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections.

### `src-synthid-text`

The 2025-04-09 in `published` is the page's OWN last-updated stamp, in UTC, not a publication date; it is a living documentation page and the stamp is the only date it carries. RETRIEVED OUTSIDE THIS BUILD ENVIRONMENT: the instructor's analyst surface loaded the page on 2026-08-25 and supplied the substantiations recorded in `scope`. This environment answers 403 on CONNECT for the host, so no generator here has read the page and none can re-check it. A retrieval is not a reading, so `last_verified` is EMPTY and stays that way until a human attests at a terminal. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-anthropic-models-overview`

OPENED on 2026-10-04 (platform.claude.com is reachable from this build). The page carries no publication date of its own; it is updated in place with each model release, so the year is recorded and the retrieval date is the one to read. RE-OPENED on 2026-10-12 (the old address redirects to platform.claude.com/docs/en/models/overview), after FACTS claude-model-ids-and-retirements read the same page on 2026-10-11. Audit 2026-10-27 (fetched in full): verified with corrections. Link updated to the address the old one redirected to. Same page as src-models; not merged in this pass (see that record).

### `src-claude-code-settings`

OPENED on 2026-10-04 (code.claude.com is reachable from this build). Updated in place; the retrieval date is the one to read. Audit 2026-10-27 (fetched in full): verified.

### `src-claude-code-skills`

OPENED on 2026-10-04 (code.claude.com is reachable from this build). The documentation is updated in place; the retrieval date is the one to read. Audit 2026-10-27 (fetched in full): verified with corrections. Page title is now Extend Claude with skills. Every frontmatter field is now optional and only description is recommended; the folder name supplies the skill name.

### `src-claude-incognito`

Fetched in full on 2026-10-13 (the page reads "Updated over a week ago" and carries no publication date). Audit 2026-10-27 (fetched in full): verified.

### `src-claude-skills-use`

Fetched in full on 2026-10-13 (support.claude.com is reachable from this build; the page reads "Updated over 3 weeks ago" and carries no publication date). Read for the custom-skill upload steps, the plans that offer skills and the code execution setting. FACTS claude-skills-format carries the same facts, read in full 2026-10-11. Audit 2026-10-27 (fetched in full): verified.

### `src-claude-watermark`

Fetched in full 2026-10-11 (FACTS claude-text-watermark) and read again in full on 2026-10-12 with the same content; the post carries an update note of 1 September 2026 on the detection API. The announcement says future Claude models; the help article, src-claude-marks, keeps the per-model list, so the lesson does not say every Claude text output is marked today. Audit 2026-10-27 (fetched in full): verified with corrections. Title is "watermarking", with an update note of 1 September 2026; every claim in scope is verbatim; the post links the Nature SynthID paper and the EU signatory page.

### `src-finra-inj`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections.

### `src-gemini-privacy`

NOT RETRIEVED. support.google.com is egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this hub and of "Manage and delete your activity in Gemini Apps" (answer 13278892), which is why the confidence is M. Read both pages before teaching the numbers. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-t3-survey`

As summarised by Kitces.com Weekend Reading, March 2026. Re-checked 2026-10-04: kitces.com, investmentnews.com and dwealth.news were egress-blocked from this build; a fresh search returned 2,906 responses, 52.2%, 42.9% and 14 note-taking tools, unchanged. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Primary PDF found; 2,906 responses, 95 percent RIA, 52.2 percent (from 41.8) and 42.9 percent confirmed by Kitces, BusinessWire (2026-03-10) and InvestmentNews. Could be raised to H; one chip is in session-5, which this pass does not touch.

### `src-anthropic-agents`

Opened directly on 2026-09-27, with the Agent SDK post of 29 September 2025 on claude.com and the tool-use documentation, whose section on the agentic loop was also opened. No source opened uses the phrase "loop engineering"; Anthropic's words are "in a loop", "the agent loop" and "the agentic loop". Audit 2026-10-27 (fetched in full): verified with corrections. The engineering address redirects (308) to /research/; the live byline abbreviates the first author's surname (Erik S.), so Schluntz is kept from the earlier record and not re-confirmed from the page. The in-a-loop quotation is exact.

### `src-anthropic-mcp`

Opened directly on 2026-09-27, with the web search post of 20 March 2025 and the integrations post of 1 May 2025 on claude.com, both opened. Audit 2026-10-27 (fetched in full): verified.

### `src-anthropic-threat`

Retrieved 2026-09-27 through a summarising fetch, not read whole. The passage the lesson rests on was returned verbatim: "If their monitoring AI agents identified that any of their deployed malware was detected by a security product, agents would then set about the process of autonomously modifying and rebuilding the malware to evade the existing detections." Read the report before teaching the case. Audit 2026-10-27 (fetched in full): verified.

### `src-cfp-psychology`

NOT RETRIEVED. cfp.net is egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04, as was institutionalinvestor.com). The facts in scope come from the search engine's summary of the release and from Institutional Investor's RIA Intel report, which agree, which is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Dated 30 March 2021; the 7 percent exam-weight figure is in the exam blueprint. Could be raised to H; the chip is in session-5, which this pass does not touch.

### `src-claude-code-org`

OPENED on 2026-10-04 (code.claude.com is reachable from this build). Updated in place; the retrieval date is the one to read. Audit 2026-10-27 (fetched in full): verified.

### `src-claude-projects`

Fetched in full on 2026-10-13 (the page reads "Updated over a week ago" and carries no publication date). Audit 2026-10-27 (fetched in full): verified.

### `src-claude-research`

Fetched in full on 2026-10-13. The page carries the date 2 June 2026 where other articles say "Updated" with a relative time. Audit 2026-10-27 (fetched in full): verified with corrections. The page no longer shows a date; the 2 June 2026 date belongs to article 11095361 (src-tools3).

### `src-daly`

The link is the sec.gov address the search engine returned on 2026-09-27 for this title, date and venue (Manalapan, Florida, delivered virtually). sec.gov is egress-blocked from the build, so the page itself was not re-read; the scope below stands on the earlier verification. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Supplement: Daly's October 2026 remarks at Stanford, same theme.

### `src-dellacqua`

NOT RETRIEVED. hbs.edu and ssrn.com are egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04). The figures in scope are consistent across the reports found (Computing, beSpacific, Silicon Canals, the TFT summary, the Brainscape card set), which is why the confidence is M. The task descriptions and the below- and above-average split added on 2026-10-04 come from the same consistent reports. The working-paper number is not recorded because it was not read off the paper. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Published version doi 10.1287/orsc.2025.21838 (open access) lists the author as Lifshitz; all figures (758, 12.2 percent, 25.1 percent, over 40 percent, 43 against 17, 19 points) confirmed.

### `src-gemini-workspace`

NOT RETRIEVED. support.google.com is egress-blocked from this build environment (2026-09-27). The substance in scope comes from search-engine summaries of the page, which is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-google-ptcf`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. October 2024 edition; first edition April 2024.

### `src-kitces-productivity`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Kitces states about two hours of prep plus follow-up per meeting, more than an hour per meeting hour, not one hour per two-hour meeting; dated 2025 on 2024 data, not August 2026; the Advisor360 reliance figure was not found (GAP, see register).

### `src-ms-copilot`

NOT RETRIEVED. support.microsoft.com is egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this FAQ and of "Conversation history in Microsoft Copilot", which is why the confidence is M. Read both pages before teaching the numbers. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. The setting is named Training on conversation activity (and Training on voice conversations) on Microsoft's privacy-controls page; the takes-effect-within-30-days clause is on no returned page and is dropped.

### `src-openai-provenance`

help.openai.com is unreachable from the build container (FACTS openai-provenance, 2026-10-11). The values come from primary-domain search snippets. The help article was retitled from "C2PA in ChatGPT images", and the date the EU text watermark began (about 5 October 2026) is inferred from search listings and not read on the page, so the lesson states no date for it. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. The EU-only text watermark in scope was supported by no snippet; read the EU post before teaching it.

### `src-tools3`

Audit 2026-10-27 (fetched in full): verified with corrections. Dated June 2, 2026 on the page; the one-or-two against five-or-more tool-call wording is verbatim.

### `src-vanguard-alpha`

NOT RETRIEVED. vanguard.com and its regional PDF hosts are egress-blocked from this build environment (2026-10-02). The figures in scope are consistent across the reports found (PLANADVISER, Index Fund Advisors, InvestmentNews, Investment Executive, Vanguard Canada's own summary as the search engine returns it), which is why the confidence is M. Vanguard frames the figure as potential value added over time, not an annual guarantee. Re-checked 2026-10-04: vanguard.ca, Vanguard's own host for the infographic, was blocked; a fresh search returned about 3% and 150 basis points unchanged. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. The about 3 percent framing is confirmed on Vanguard's own pages; the 150 bps behavioural-coaching figure is printed in the 2016 US and 2018 Canada editions, while one summary says the 2022 edition frames coaching as 0 to over 200 bps (GAP, see register).

### `src-aa-leaderboard`

artificialanalysis.ai is unreachable from the build container (FACTS leaderboard-snapshot-aa, 2026-10-11); the snapshot is read from primary-domain search snippets and carried at M. Effort tiers matter: Opus 5.5 at High scores 54 against 58 at Max, and GPT-6 Astra at High scores 51. The scores are not comparable with the index figures in the July 2026 scatter, which src-aa carries. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Supplement: the dated launch articles (artificialanalysis.ai/articles/claude-opus-5-5 and /claude-sonnet-5-5); re-read the board the week before Session 1.

### `src-advisers-204-2`

NOT RETRIEVED. ecfr.gov, law.cornell.edu and govinfo.gov are egress-blocked from this build environment (2026-09-27). The rule's citation is certain; its wording as stated in scope is from the maintainer's knowledge of the rule and is why the confidence is M. Read paragraph (a)(7) and paragraph (e)(1) before teaching them as settled. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): unreachable.

### `src-advisers-206-4-7`

NOT RETRIEVED. ecfr.gov and law.cornell.edu are egress-blocked from this build environment (2026-09-27). The rule's citation is certain; the wording in scope is from the maintainer's knowledge and is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Supplement: the SEC examinations staff's September 2026 observations on investment adviser annual compliance reviews (sec.gov/files/examinations-observations-regarding-investment-adviser-annual-compliance-review-091426.pdf).

### `src-advisers-fiduciary`

NOT RETRIEVED. sec.gov is egress-blocked from this build environment (2026-09-27). The release's existence, date and number are certain; the characterisation in scope is from the maintainer's knowledge and is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Adopted 5 June 2019; Federal Register 12 July 2019. Scope reworded to the release's own terms.

### `src-anthropic-api-credits`

Opened directly on 2026-10-16, with the Help Center article of the same name (17154008). The programme was announced 7 October 2026. Audit 2026-10-27 (fetched in full): verified. The 7 October 2026 announcement date is carried by a third-party aggregator only; no dated first-party page was found.

### `src-anthropic-certs`

Opened directly on 2026-09-27 (the article says it was last updated 16 March 2026), with the HIPAA-ready Enterprise plans article (13296973) and the January 2025 news post on ISO 42001. The Trust Portal itself is egress-blocked from this build. Audit 2026-10-27 (fetched in full): verified. Certification list live (Updated March 16, 2026). Supplement: the BAA and primary-owner detail is on the HIPAA-ready Enterprise plans article (support.claude.com article 13296973); ISO 42001 post at anthropic.com/news/anthropic-achieves-iso-42001-certification-for-responsible-ai.

### `src-anthropic-ctx-eng`

Opened directly on 2026-09-27, with the current prompting best-practices page, which still says a role in the system prompt focuses behaviour and tone. Audit 2026-10-27 (fetched in full): verified.

### `src-anthropic-thinking`

Opened directly on 2026-09-27, with the current prompting best-practices page, which describes manual step-by-step prompting as a fallback for when thinking is off. Audit 2026-10-27 (fetched in full): verified.

### `src-arena-board`

The live board could not be read (arena.ai unreachable from the build container, FACTS leaderboard-snapshot-arena, 2026-10-11). The pair of scores comes from one secondary roundup dated 2026-10-08, with Gemini 4 Argon's 1,525 corroborated by two others. Scores move weekly, so this is a placeholder until the live board is re-read the week before Session 1. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Gemini 4 Argon at 1,525 (preliminary) in first place is corroborated; Claude Opus 5.5 at 1,507 in second is not (snapshots show 1504 fourth on 2 October, 1508 third on 13 October); replace with the live board figure the week before Session 1.

### `src-cfp-code`

NOT RETRIEVED. cfp.net is egress-blocked from this build environment (2026-09-25). Standard A.14's name and its reasonable-care duty are carried from the instructor's own run sheet for the 2026-09-21 session, which names Standards A.9 and A.14 at high confidence from the Code itself; the wording on the session-4 page is a paraphrase, not a quotation, and the chip is M until the page is read. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Effective 1 October 2019; Standard A.14's title reads "and", not "or".

### `src-chatgpt-index`

NOT RETRIEVED. techcrunch.com is egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of this article and of Search Engine Land's and Search Engine Journal's reporting of the same days, which is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. OpenAI pulled the discoverable option within hours (Stuckey quote). Supplement: TechCrunch, 27 July 2026, on Claude shared chats and artifacts indexed by Google.

### `src-claude-code-marketplace`

OPENED on 2026-10-04 (code.claude.com is reachable from this build). Updated in place; the retrieval date is the one to read. Audit 2026-10-27 (fetched in full): verified with corrections. The old /plugin-marketplaces address still serves the page; the canonical path is /docs/en/plugins/create-marketplace.

### `src-claude-memory`

Opened directly on 2026-09-27, with the Help Center article on chat search and memory (11817273), which states that memory is saved as a set of topics as you chat. Audit 2026-10-27 (fetched in full): verified with corrections. Page title carries no "at work". The topics-as-you-chat claim is on help article 11817273 (src-memory), not on this post.

### `src-dahl-fictions`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Published version, doi 10.1093/jla/laae003 (preprint arXiv:2401.01301); open-access PDF at dho.stanford.edu/wp-content/uploads/Hallucinations_JLA.pdf. The 58, 69 and 88 percent rates are confirmed; the 800,000-question count appears only in a secondary post (GAP, see register).

### `src-deepseek`

NOT RETRIEVED. wiz.io is egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of the post and of the reporting that cited it (TechCrunch, The Register, SecurityWeek, 30 January 2025), which is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-effort`

Audit 2026-10-27 (fetched in full): verified with corrections. All six claims in scope are live, including the five effort levels, xhigh on Opus 4.7 and later, and that thinking cannot be switched off on Opus 5.

### `src-eu-ai-act`

NOT RETRIEVED. eur-lex.europa.eu is egress-blocked from this build environment (2026-09-27). The application date of 2 August 2026, the machine-readable marking duty and the Article 50(2) code of practice are corroborated by Anthropic's own page on how Claude marks content, which was opened; the Regulation's text was not, which is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Link points at the consolidated text as amended 27 July 2026; the original Official Journal text is eur-lex.europa.eu/eli/reg/2024/1689/oj/eng. Secondary sources report that the 2026 Digital Omnibus amendment kept the 2 August 2026 date for Article 50 and gave systems already on the market until 2 December 2026 for machine-readable marking; not read from the text.

### `src-fbi-ic3-2025`

NOT RETRIEVED. fbi.gov and ic3.gov are egress-blocked from this build environment (2026-09-27). Figures are consistent across search snippets of the FBI press release and of SpyCloud, SecureWorld, Paubox, Abnormal, McDonald Hopkins and Alston & Bird. The report is at ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. All headline figures confirmed (1,008,597 complaints, $20.877 billion, up 26 percent, BEC $3.05 billion from 24,768, AI 22,364 complaints and about $893 million); outlets split the release date between 6 and 7 April 2026. Supplement: the IC3 2025 Annual Report PDF (ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf) as the primary.

### `src-finra-4511`

NOT RETRIEVED. finra.org is egress-blocked from this build environment (2026-09-27). The rules' citations are certain; the periods in scope are from the maintainer's knowledge and are why the confidence is M. A broker-dealer's correspondence period differs from an adviser's, so the page never states one number for both. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Supplement: FINRA's SEA Rule 17a-4 and Related Interpretations page, which carries the retention periods the scope states.

### `src-gemini-plans`

A real retrieval on 2026-10-11, recorded in FACTS gemini-plans: the figures were read through primary-domain search listings of this page, because gemini.google was unreachable from the build container, so the page itself was not opened and the confidence is M (D-015). The Google One page also lists a $9.99 AI Plus (2 TB) variant and shows Pro at $199.99 per year, so "$199.99" is ambiguous without the period. Record added 2026-10-27 (DW-181) from the FACTS record without a fresh fetch; last_retrieved is copied from it. Prices move without notice. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-gtig-ai`

NOT RETRIEVED. services.google.com and cloud.google.com are egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of the report and of the reporting on its release (The Hacker News, BleepingComputer, Infosecurity Magazine, 5 November 2025), which is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Blog post address; outlets date it 4 or 5 November 2025; the every-hour wording should be verified before teaching.

### `src-iskowitz`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Compliance framing confirmed; the 12 percent ACA figure is unclear from results (the ACA 2025 survey implies about 45 percent formal use in 2024) and needs the article read.

### `src-iss-ai-policy`

planadviser.com is unreachable from the build container (FACTS adoption-iss-policy, 2026-10-11). The figures come from primary-domain search snippets; the ISS release itself is at insights.issgovernance.com, dated 2025-07-22. The survey is a self-report by advisers, fielded in June 2025. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): record repointed from the PLANADVISER summary to the survey producer's own write-up, which states n = 466, the June 2025 fielding and the 78 percent against 35 percent policy figures verbatim; the ISS STOXX release of 22 July 2025 (insights.issgovernance.com) carries the 48 percent and 87 percent headline figures. PLANADVISER's piece (planadviser.com/exclusives/advisers-using-ai-by-the-numbers/) is kept as the secondary.

### `src-joa-prompt`

NOT RETRIEVED. journalofaccountancy.com is egress-blocked from this build environment (2026-09-27). The syllabus lists this reading as "Writing an Effective AI Prompt for an Audit Trail"; the page's own title, as the search engine returns it, is the one recorded here, and the November 2025 date is from the same summary. The article was not read, so the lesson claims nothing about what it says: it names it as the assigned reading behind the record block and no more. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. An A&A Focus webcast recap (Durak, Supkis Cheek, the STAR framework); the Journal dates it 17 November 2025; the byline is not shown in search metadata.

### `src-kitces-aisearch`

NOT RETRIEVED. kitces.com is egress-blocked from this build environment (2026-10-02, and again on 2026-10-04), both for the container's proxy and for the fetch tool. The syllabus lists the reading as "Ways Advisors Can Optimize for AI Search with a Marketing Strategy Refresh"; the title recorded here is the one the search engine returns for the URL. The one recommendation on the page is the one the search engine's summary of the article repeats; nothing else from the article is characterised. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. A guest post on Nerd's Eye View; the who-what-where recommendation is confirmed verbatim; the 17 November 2025 date is not shown in results.

### `src-livebench`

The site is unreachable from the build container (FACTS livebench-last-release, 2026-10-11). The release date is read from the homepage snippet and GitHub issue titles that reference the 2026-06-25 release; the GitHub README is stale and still says 2025-04-25. The description (23 objective tasks in 7 categories, refreshed about every six months) comes from the README, fetched in full. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): unreachable. livebench.ai was returned by search on 2026-10-27 as LiveBench 2.0 with the v1 board at livebench.ai/v1/ (latest release 2026-06-25); the task count and release name in scope are GAP until read from the site.

### `src-meta-feed`

NOT RETRIEVED. The article's own headline uses a dash where this record uses a colon, so that the injected footer adds no em dash to the lesson. The facts in scope come from search-engine summaries of this article and of the Mozilla Foundation's campaign page on the same feed (June 2025), which is why the confidence is M. A stronger citation (the original reporting) is a review-list item. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. The page headline uses an em dash; the colon in the record is an editorial substitution.

### `src-metr-2025`

NOT RETRIEVED. metr.org is egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04, as were the secondary hosts tried). The figures in scope are consistent across five reports found (The Decoder, eWeek, diginomica, letsdatascience, the Harvard tagteam feed of the post), which is why the confidence is M. The task line added on 2026-10-04 comes from the same reports. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. All figures (16 developers, 246 tasks, 19 percent slower, 24 percent forecast, 20 percent believed) confirmed by five or more reports. Supplement: arXiv:2507.09089 and METR's 2026 note that its newer data is unreliable.

### `src-ms-copilot-edp`

NOT RETRIEVED. learn.microsoft.com is egress-blocked from this build environment (2026-09-27). The substance in scope comes from search-engine summaries of the page, which is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-owasp`

Fetch of the cited link ATTEMPTED 2026-08-25 and REFUSED before it reached the source: owasp.org and genai.owasp.org are both blocked by the build environment's egress policy (403 on CONNECT), so last_retrieved stays unresolved — the cited page itself was never loaded. A SURROGATE was reachable and was read: the GitHub repository backing that exact project page, fetched 2026-08-25. Reading a surrogate is not retrieving the source and no date is written for one. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): the record is repointed from the owasp.org project page, which OWASP describes as an archive, to the project's dated announcement of the 2026 edition; the Agentic Top 10 page is genai.owasp.org/resource/2025-12-09/owasp-top-10-for-agentic-applications-for-2026; the publication date is on the owasp.org project page and in the announcement. The old link (owasp.org/www-project-top-10-for-large-language-model-applications/) is kept here as the archive.

### `src-sec-withdraw`

NOT READ FROM THE SEC. The withdrawal on 12 June 2025 of fourteen proposals, the predictive data analytics proposal of August 2023 among them, is reported consistently by several law-firm client alerts reached through search on 2026-09-25; the SEC page itself was not loaded from this build. M until it is. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Release numbers added; raised M to H on the release and the Federal Register notice.

### `src-wiretap`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. § 632 added to the citation; § 637.2 at california.public.law/codes/ca_penal_code_section_637.2; statutes verified from two independent code hosts.

### `src-0din-gemini`

NOT RETRIEVED. 0din.ai is egress-blocked from this build environment (2026-09-27). The mechanism is described consistently in search snippets of the disclosure's coverage and in Microsoft's Defender documentation on prompt-injection protection, which names white-on-white text and zero-size fonts among the techniques it scans for. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections.

### `src-3b1b-llm`

Title, date (companion post 2024-11-20, made for the Computer History Museum exhibit) and length (about 7:58) verified 2026-10-13 from the 3Blue1Brown newsletter and aggregators found by web search; the YouTube id itself was not resolved from this container, so Jared confirms the link on review. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Video id LPZh9BOjkQs confirmed via transcript and mirror pages; 20 November 2024, about 7:58; the Computer History Museum exhibit confirmed.

### `src-aa-index`

Host unreachable from the build container (FACTS aa-index-definition, 2026-10-11); the description is read from primary-domain snippets. The evaluations-page FAQ still says 25% per category; the v4.3 announcement and the methodology page say 30/20/20/30, which is what the lesson states. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Supplement: the methodology page (artificialanalysis.ai/methodology/intelligence-benchmarking) and the v4.3 announcement article.

### `src-anthropic-browser-access`

Opened directly on 2026-10-16. The docs page names the option and the risk; the header the option sends, anthropic-dangerous-direct-browser-access: true, is read from the SDK's own source (anthropic-sdk-typescript, src/client.ts, buildHeaders), which is why the chip is M rather than H: the page documents the switch, the code documents the wire. Audit 2026-10-27 (fetched in full): verified. Both page quotations exact; the header anthropic-dangerous-direct-browser-access confirmed in the SDK source (src/client.ts); the clause that the API answers a browser only when the header is present is an inference, stated as such. Raised M to H.

### `src-anthropic-deprecation-commitments`

OPENED on 2026-10-02 (anthropic.com is reachable from this build). Audit 2026-10-27 (fetched in full): verified.

### `src-anthropic-fluency`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. anthropic.com/ai-fluency redirects (307) to the Skilljar course; the Skilljar host and the Coursera mirror (coursera.org/learn/ai-fluency-framework-foundations) are confirmed by domain-restricted search, not fetched. Built with Rick Dakan and Joseph Feller; the Delegation, Description, Discernment, Diligence framing is the course's spine.

### `src-anthropic-injection`

Opened directly on 2026-09-27, with the Claude for Chrome pilot post on claude.com and the computer-use tool's security section in the platform docs. Audit 2026-10-27 (fetched in full): verified with corrections. Live title drops "the risk of". The 1 percent sentence is present; the platform docs now read "Claude follows commands found in content even when they conflict with your instructions"; the asks-before-publishing-purchasing wording is on claude.com/blog/claude-for-chrome.

### `src-anthropic-prompting-101`

Listed in the runbook's Appendix R (tentative); a web search on 2026-10-13 returned nothing that confirms the title, date or id, so the record stands at L until Jared confirms the link on review. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. YouTube search returns the exact id ysPbXH0LpIE titled Prompting 101; presented 22 May 2025 at Code w/ Claude, about 24:49; the 2025-07-31 upload date is not confirmed from YouTube. Left at L so the reading card (docs/next-term/readings.json carries the chip) and the footer agree; a raise to M once that file is revised.

### `src-anthropic-threat-aug25`

Opened directly on 2026-09-27. Cross-checked against Malwarebytes, Forrester and Halcyon, which report the demand range as $75,000 to $500,000. No payment figure is public. Audit 2026-10-27 (fetched in full): verified with corrections. The page's wording is "ransoms that sometimes exceeded $500,000"; the earlier scope quoted a sentence the page does not carry. Full PDF of the report is linked from the page.

### `src-api-migration-2026-10-21`

Fetched in full 2026-10-27 by the bibliography audit, with the API versions page. The sampling-parameters section states the removal, the 400 on every model, and the fallback of keeping a request on 2023-06-01; the TypeScript SDK page states that SDKs from major version 1.0 send 2026-10-21 by default. Added by the audit because the Messages API reference and the Opus 5.5 migration guide no longer carry the temperature rule.

### `src-arena-rename`

arena.ai is unreachable from the build container (FACTS arena-rename, 2026-10-11); the date comes from the blog post's search metadata. A historical "formerly LMArena" is fine; a present-tense LMArena is not. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-ascii-smuggling`

NOT RETRIEVED. embracethered.com is egress-blocked from this build environment (2026-09-27). The technique was first shown by Riley Goodside on 11 January 2024; cross-checked against The Hacker News, SC Media, Cisco and Keysight, and Microsoft's fix in August 2024. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Title corrected to the one the page carries.

### `src-brynjolfsson`

NOT RETRIEVED. nber.org, arxiv.org and academic.oup.com are egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04). The figures in scope are consistent across the reports found (the NBER abstract as the search engine returns it, IDEAS/RePEc, the SSRN listing, the arXiv listing), which is why the confidence is M. The setting and tool lines added on 2026-10-04 come from the same reports. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. QJE 140(2), 889-942 confirmed, but the 5,179 agents, 14 percent and 34 percent figures are the NBER working paper 31161 numbers; the QJE abstract reports 5,172 agents and about 15 percent. The chip is in session-5, which this pass does not touch; the record keeps the NBER link and figures until that lesson is revised (see register).

### `src-charlotin`

PARTIAL DATE. The day was never recorded. The pull captured a count the source itself dates "as of 9 June 2026" (session-2:1669) and the text entered the repo on 2026-08-15, so the retrieval falls in 2026-06-09..2026-06-30. Not narrowed further, and no day is invented. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Database path reported by several search summaries; the HEC Paris affiliation was not confirmed by any result. Third-party counts: about 1,600 (mid-June 2026), 2,028 (9 September 2026), 2,202 (19 October 2026).

### `src-claude-code-host`

OPENED on 2026-10-04 (code.claude.com is reachable from this build). Updated in place; the retrieval date is the one to read. Audit 2026-10-27 (fetched in full): verified.

### `src-claude-projects-rag`

Fetched in full 2026-10-13: "RAG for projects is available on paid plans (Pro, Max, Team, and Enterprise)"; "RAG automatically activates when your project approaches or exceeds the context window limits". The companion article "What are projects?" (support.claude.com/en/articles/9517075) is the second half of the reading. Audit 2026-10-27 (fetched in full): verified with corrections. RAG article shows Updated September 10, 2026; the companion What are projects? is support.claude.com/en/articles/9517075.

### `src-claude-web-search`

Fetched in full on 2026-10-13 (the page reads "Updated this week" and carries no publication date). The page lists the models that can search the web, says the new Claude experience has no web search toggle because Claude searches the web when it helps, and gives the + menu route for accounts that have the toggle. Audit 2026-10-27 (fetched in full): verified.

### `src-deloitte`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. The primary report; $12.3 billion to $40 billion by 2027, a 32 percent compound rate, stated as a forecast.

### `src-directory`

Audit 2026-10-27 (fetched in full): verified with corrections. Page shows Updated September 25, 2026. The earlier scope clause that organisation sharing is off by default is not on the page and is dropped.

### `src-drift`

NOT RETRIEVED. finra.org is egress-blocked from this build environment (2026-09-27). The incident is described consistently by AppOmni, WTW, TechRadar and Paubox (August and September 2025), citing Google Threat Intelligence's count of more than 700 affected organisations. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Dated 10 September 2025; the MFA-bypass phrase in scope should be read off the alert before it is taught.

### `src-gemini-api-terms`

NOT RETRIEVED. ai.google.dev is egress-blocked from this build environment (2026-09-27). The wording in scope appears verbatim in search snippets of the page itself and in two independent mirrors of the terms (Simon Willison, October 2024; ScanCode LicenseDB, 2025). Read the page before class; Google changes it. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Supplement: the archived text dated 20 November 2025 (ai.google.dev/gemini-api/terms-archive/terms_11_20_25) anchors the quoted sentence to a frozen version.

### `src-gemini-ratelimits`

NOT RETRIEVED. ai.google.dev is egress-blocked from this build environment (2026-09-27), and the secondary sources disagree (250 requests a day for an older flash model against about 20 for the newer ones, after Google cut free quotas in December 2025 and moved to per-project limits). No number is printed on the page. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-ibm-breach-2026`

NOT RETRIEVED. newsroom.ibm.com is egress-blocked from this build environment (2026-09-27). Figures consistent across search snippets of the IBM release, Infosecurity Magazine, Security Boulevard, ASIS Security Management and Cybersecurity Dive. Supersedes the 2025 edition's $4.44 million and $10.22 million. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. 602 organisations, $4.99 million global, $11.5 million US, one in four AI-enabled at $6 million (up 56 percent) confirmed; the shadow-AI 43 percent figure was not seen (GAP, see register).

### `src-il-pipa`

NOT RETRIEVED. ilga.gov is egress-blocked from this build environment (2026-09-27). The statutory wording in scope appears in search snippets of the statute and of Justia, the Illinois Attorney General's guidance page and a Hogan Lovells summary, all consistent. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-il-retirement-subtraction`

Verified 2026-10-12 by web search from a tax-preparation guide (TaxSlayer, Form IL-1040 line 5) and Illinois Department of Revenue general information letters as summarised by a rulings aggregator (IT 10-0025-GIL, IT 15-0008-GIL on a rollover to a Roth IRA, IT 23-0005-GIL): the subtraction reaches amounts included in federal income under IRC 402(a), 402(c), 403(a), 403(b), 406(a), 407(a) and 408, so a conversion from a qualified plan or IRA is subtractable to the extent included in federal AGI; general information letters are not binding on the Department. ilga.gov is not reachable from the build container, so the statutory text itself was not fetched. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Newest Department guidance found: IT 26-0004-GIL (2026-04-23).

### `src-investmentnews-t3-2026`

NOT RETRIEVED. investmentnews.com is egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04, as was dwealth.news). The facts in scope are consistent across three reports found (InvestmentNews, a vendor's release about the same survey, the dwealth Advisor Tech Talk column of 17 March 2026), which is why the confidence is M. The survey's headline shares are held separately at H in src-t3-survey. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. The 42.86 percent and stack-supplement claims are confirmed; the fourteen-tools, fastest-curve line is in the T3 BusinessWire release.

### `src-irs-590b`

Title verified 2026-10-12 from the IRS Form 8606 instructions (which cite it) found by web search; irs.gov is not reachable from the build container, so the current edition was not fetched. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Current edition is the 2025 publication.

### `src-irs-8606`

Scope verified 2026-10-12 from the 2022 to 2025 instruction texts found by web search (nondeductible contributions, distributions with basis, conversions to Roth IRAs, Roth distributions); irs.gov is not reachable from the build container, so the current form was not fetched. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Current instructions are the 2025 revision.

### `src-irs-guidance-primer`

Existence and content (revenue rulings, revenue procedures, notices, announcements, and their place in the Internal Revenue Bulletin) verified 2026-10-13 from the IRS newsroom listing and two law-library guides found by web search; irs.gov is not reachable from the build container. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-karpathy-intro`

Title, date (posted 2023-11-23 per the summaries; the talk is dated 2023-11-22) and the security segment (jailbreaks, prompt injection, data poisoning) verified 2026-10-13 from three independent write-ups found by web search; the YouTube id was not resolved from this container. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Video id zjkBMFhNj_g confirmed; chapter list 45:43 Security intro, 46:14 Jailbreaks, 51:30 Prompt injection, 56:23 Data poisoning, 58:37 Conclusions matches the segment; an aggregator shows the upload as 23 November 2023.

### `src-noy-zhang`

NOT RETRIEVED. science.org and the NBER conference copy are egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04, as was economics.mit.edu). The figures in scope are the ones every summary found repeats (Stanford SCALE's publication listing, Marginal Revolution, Gulf News, the IT-Daily report), which is why the confidence is M. The task and occupation lines added on 2026-10-04 come from the same consistent summaries. Volume and page numbers are not recorded because they were not read off the article. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. 14 July 2023, doi 10.1126/science.adh2586; 453 participants, 40 percent time, 18 percent quality and the narrowing of inequality confirmed by three or more sources. Could be raised to H; the chip is in session-5, which this pass does not touch.

### `src-openai-pricing`

The GPT-5.6 Sol, Terra and Luna rates in session-2 Appendix B8 entered the repository with the 2026-08 pull and no retrieval was recorded for them. openai.com was egress-blocked on 2026-09-12 when this record was written, so the rates are carried at M until the DW-081 re-pull records a retrieval. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): unreachable. The pricing page now lives on developers.openai.com (returned by search 2026-10-27); the Sol, Terra and Luna rates have changed since the August pull; re-pull from the model pages before teaching.

### `src-openai-retire-4o`

NOT RETRIEVED. help.openai.com and openai.com are egress-blocked from this build environment (2026-10-02). The facts in scope come from the search engine's summary of the article and from three consistent reports (YourStory; Gigazine, 30 January 2026; letsdatascience), plus TechCrunch and Tom's Guide (April 2025) for the GPT-4 retirement, which is why the confidence is M. Still blocked on 2026-10-04. Open the article before saying a date aloud. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. A living help page; the headline GPT-4o date is confirmed; the other dates in scope should be read off the page before Session 5.

### `src-pew-ai-summaries`

NOT RETRIEVED. pewresearch.org is egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04, as was theregister.com). The figures in scope are consistent across five reports found (The Register, TheWrap, PPC Land, AI Weekly, Gigazine), which is why the confidence is M. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Pew's own text quoted in results: 900 adults, March 2025, 68,879 searches, 8 against 15 percent, 1 percent, 26 against 16 percent. Could be raised to H; the chip is in session-5, which this pass does not touch.

### `src-rightcapital-iris`

NOT RETRIEVED. accessnewswire.com and rightcapital.com are egress-blocked from this build environment (2026-10-02; unchanged on 2026-10-04). The facts in scope are consistent across four reports found (InvestmentNews, WealthManagement.com, Pulse 2.0, the Eagle-Tribune syndication of the release), which is why the confidence is M. A vendor's description of its own product; the page uses it as one example of a planning-software agent, not as an endorsement. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. ACCESS Newswire release confirmed with the features named (Double Check, Cash Flow Reviews, Plan Builder); the 70 percent Smart Import claim is the vendor's; the Premium and Platinum no-cost detail was not seen (GAP). Supplement: InvestmentNews, RightCapital claims industry first with AI agent for financial planning (investmentnews.com, article 267144).

### `src-rohrer`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-rp-2022-32`

irs.gov is unreachable from the build container (FACTS portability-late-election, 2026-10-11). The terms come from irs.gov search snippets, and the Form 706 instructions (Rev. July 2026) still cite the revenue procedure as current. The relief is unavailable to an estate that must file under IRC 6018(a). Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Published in 2022-30 I.R.B. 101.

### `src-sampling`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Repository last updated 9 July 2024; the nine-control count should be read off the page before class.

### `src-sg-deepfake-2026`

NOT RETRIEVED. mothership.sg is egress-blocked from this build environment (2026-09-27). Cross-checked against search snippets from the South China Morning Post, The Star (Malaysia), Malay Mail, VnExpress International and Fintech News Singapore, all consistent on the amount and the dates; the Singapore Police Force released the deepfake footage on 16 May 2026. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. S$4.9 million (about US$3.8 million), deepfakes of the Prime Minister, President Tharman and Minister Indranee, realised 14 May 2026; the Singapore Police Force media release of 16 May 2026 and Malay Mail (17 May 2026) corroborate.

### `src-td10001`

Verified 2026-10-12 from the GovInfo Federal Register listing, the IRS newsroom release (IR-2024-190) and the Journal of Accountancy report found by web search: issued 18 July 2024, published 19 July 2024, effective 17 September 2024, applying to calendar years beginning on or after 1 January 2025; companion proposed regulations REG-103529-23 issued the same day. The GovInfo page itself was not fetched from the build container. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified.

### `src-trailofbits-image`

NOT RETRIEVED. blog.trailofbits.com is egress-blocked from this build environment (2026-09-27). Cross-checked against BleepingComputer and SecurityWeek (August 2025) and Brave's October 2025 disclosure of faint text in screenshots read by AI browsers. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Authors Kikimora Morozova and a co-author not confirmed from snippets.

### `src-uae-voice`

NOT RETRIEVED. forbes.com is egress-blocked from this build environment (2026-09-27). Cross-checked against search snippets from Dark Reading, Unite.AI, SingularityHub and Interesting Engineering (October 2021), all consistent on the amount, the year and the court filing Forbes reported. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Forbes' own text describes the victim as a branch manager of a Japanese company, not a UAE bank; the UAE is the investigating jurisdiction. Secondary outlets paraphrase it as a bank manager.

### `src-unit42-ipi`

NOT RETRIEVED. unit42.paloaltonetworks.com is egress-blocked from this build environment (2026-09-27). The counts in scope come from the Cloud Security Alliance's research note on the report and from search snippets of the report itself. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Supplement: the arXiv paper 2604.27202 anchors the 22-technique count.

### `src-zheng-persona`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. doi 10.18653/v1/2024.findings-emnlp.888; 162 personas, 2,410 questions, four model families, null result confirmed. Supplement: the Wharton December 2025 replication.

### `src-capitalone`

NOT RETRIEVED. capitalone.com is egress-blocked from this build environment (2026-09-27). Dates and figures consistent across search snippets of Capital One's page, CBS News and SiliconANGLE (August 2020, the $80 million OCC penalty), Banking Dive and the Department of Justice's case page. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Supplement: Capital One's Form 10-Q for the quarter ended 31 March 2020 (EDGAR) and contemporaneous wire coverage.

### `src-equifax`

NOT RETRIEVED. gao.gov is egress-blocked from this build environment (2026-09-27). The dates and figures in scope are consistent across search snippets of the GAO report, the FTC's July 2019 settlement release, the CFPB's release, the House Oversight Committee's December 2018 report and EPIC. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Supplement: the full report PDF (gao.gov/assets/700/694347.pdf) and the House Oversight minority report of December 2018.

### `src-kitces-advisortech`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: www.kitces.com is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work. Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. The August 2026 column (YCharts, Zephyr, Advyzon AI) exists; the consolidation and Jump 9.7 percent claim sits in the November 2025 column (kitces.com/blog/the-latest-in-financial-advisortech-november-2025-right-capital-data-migration-advyzon-elements-emoney/); the October 2025 column was not located.

### `src-laplace`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified. Project Gutenberg #58881; Chapter II, Concerning Probability, begins on p. 3.

### `src-morningstar`

Audit 2026-10-27 (existence and metadata confirmed by publisher-domain web search, page not fetched): verified with corrections. Listed as November 2025 (2025-11-06 in one index); the earlier 2025-10-15 date is not supported.



---

## Sources whose content CHANGED on the last fetch

**A fetch that found the source saying something different is a finding, not
an update.** Nothing below has been silently rewritten in the lessons. Each
entry names the delta and every lesson element that depends on it.

### `src-anthropic-deprecations` — 61 reference(s)

2026-10-12. The page lists Claude Haiku 5.5 (claude-haiku-5-5, not sooner than 7 October 2027), which the 2026-10-04 pull did not record; Claude Haiku 4.5 keeps its 15 October 2026 date but is no longer one of the four current models. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-10-12: the session-5 §02 calendar gained a Haiku 5.5 row and moved Haiku 4.5 to the legacy rows, and the lineup bullet no longer counts the legacy models.

### `src-pricing` — 41 reference(s)

2026-08-25. The page now states that Sonnet 5's $2 / $10 introductory pricing "is now the standard price" and that "the previously scheduled increase to $3/$15 per million input/output tokens on September 1, 2026 will not occur". The 2026-07-28 pull recorded the increase as scheduled. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-08-25 in Phase 3.6: session-1 Appendix A7's second Sonnet 5 table row and its "rises 50% tomorrow" note both carried the cancelled rise and are gone; the surviving row states $2 / $10 / $0.20 with no date on it. Three script arrays carried the same cancelled figure and were corrected with it — TIERS (Appendix A2 cost boxes), PATHS (Appendix A8 practice cost) and DPT (Appendix A8 document pass), the last two of which also printed the label "Sonnet 5 (from 1 Sep)" on screen. session-2 Appendix B8's "Sonnet 5 lists at $2 in / $10 out per million tokens" was UNAFFECTED and is the standing price. Phase 3.5 flagged rather than resolved; Phase 3.6 resolved on instruction.

### `src-claude-marks` — 18 reference(s)

2026-10-12. The help page no longer gives 2 December 2026 as the date by which earlier models are all covered; it keeps a per-model list and says the law gives models launched before 2 August 2026 a transition period while marking is added. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-10-12 in next-term Phase 5: session-4 Appendix D8, the Which models bullet, now cites the 14 August 2026 announcement, the 2 August 2026 launch rule and the per-model list, and no longer states a completion date; the §02 sorter line and the D8 talk box say supported Claude models.

### `src-anthropic-models-overview` — 4 reference(s)

2026-10-12. The four current models are now Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5.5 and Claude Haiku 5.5 (retirement not sooner than 7 October 2027); the 2026-10-04 pull recorded Claude Haiku 4.5 as the fourth. Haiku 4.5 now sits among the legacy models. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-10-12: the session-5 §02 calendar rows for Haiku 4.5 and Haiku 5.5, and the lineup bullet.

### `src-owasp` — 2 reference(s)

2026-08-25. THE SOURCE HAS MOVED. Established from the project's own GitHub repository, which the blocked page is built from. OWASP's own words describe the cited project page as maintained as a historical archive; active development moved to github.com/GenAI-Security-Project/GenAI-LLM-Top10 and a new edition, OWASP GenAI LLM Top 10 2026, was published 2026-08-04. DEPENDENT LESSON ELEMENTS: session-4 Appendix D4's claim that prompt injection is LLM01 SURVIVES the move intact — it is LLM01:2026 Prompt Injection in the new edition, and is now anchorable to a dated edition instead of an undated page. The CITATION does not survive: the `link` field points at an archive. The 'six of ten agentic categories' half of the same sentence is separately UNCONFIRMED — an Agentic Top 10 2026 v1.0 exists (published 2025-12-01) but sits on no reachable host and its category count was not read. NOT silently updated.


---

## What this build could not reach

**3 source host(s) refused the connection before the request reached them.**
This build environment enforces an egress policy; on 2026-08-25 every source host
except `platform.claude.com` answered **403 to CONNECT**. That is a fact about
the environment and **not** about the sources: none of them is known to have
moved or gone. No `last_retrieved` date was written for any of them, because no
retrieval happened.

| Key | Refs | Host |
|---|---|---|
| `src-synthid` | 6 | deepmind.google |
| `src-owasp` | 2 | genai.owasp.org |
| `src-kitces-advisortech` | 0 | www.kitces.com |
