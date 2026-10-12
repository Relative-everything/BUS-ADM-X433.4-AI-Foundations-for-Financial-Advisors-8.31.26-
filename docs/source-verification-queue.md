# Source verification queue

**Generated from `SOURCES.md` by `scripts/build-bibliography.mjs`. Do not edit:
the next run overwrites it.**

This is the instructor's work list, in the order the work is worth doing. A
source **70 claims rest on** is worth verifying before one that carries
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
| Source records | **150** |
| `last_verified` **EMPTY** | **146** |
| `last_verified` populated | 1 |
| `last_verified` *not applicable* (synthetic or fabricated) | 3 |
| References standing behind an EMPTY `last_verified` | **452** of 542 |
| Moving targets | 61 |
| Lock | notarised, digest `03ef33e5c2a6f078` |


## Already attested

Each one cites the evidence in the repository that records the confirmation.

- **`src-wolfram`** — 2026-08-23. EDITORIAL.md, "Seventeen names. Instructor-verified." — the locked 17 section names of this essay, entered 2026-08-23 in commit bd8f458 and enforced by A11. Enumerating the seventeen section names requires having opened the essay.


---

## The queue

| # | Key | Title | `last_verified` | `last_retrieved` | Refs | Moving | Depends on it |
|---|---|---|---|---|---|---|---|
| 1 | `src-case` | The Cole household | *n/a* | *n/a* | 70 | no | S1 `#s1` · S1 `#sCase` · S2 `#sCase` · S2 `#s6b` · S2 `#sZ` · S2 `#sDel` · S3 `#sCase` · S3 `#s2` · S3 `#s4` · S3 `#sRag` · S3 `#s6`×2 · S3 `#sPrep` · S3 `#s7` · S3 `#s9` · S3 `#s10` · S3 `#sChk` · S3 `#sOff`×2 · S3 `#s12` · S3 `#s13` · S3 `#s16` · S4 `#s0` · S4 `#sCase`×2 · S4 `#s2`×3 · S4 `#sAnon` · S4 `#s3` · S4 `#s4` · S4 `#sRSP` · S4 `#s7` · S4 `#s5` · S4 `#s6` · S4 `#sWS` · S4 `#sAud` · S4 `#sW1` · S4 `#sW2` · S4 `#sD` · S4 `#s9` · S4 `#sCR`×4 · S5 `#s0` · S5 `#sCase` · S5 `#s1`×3 · S5 `#sE3` · S5 `#sE4`×2 · S5 `#sE2`×2 · S5 `#sE6`×2 · S5 `#s2`×3 · S5 `#s3`×2 · S5 `#s4` · S5 `#sE1` · S5 `#s5` · S5 `#s7` · S5 `#s6` · S5 `#sLib`×2 · S5 `#sE5` |
| 2 | `src-wolfram` | What is ChatGPT doing … and why does it work? | **2026-08-23** | **none** | 20 | no | S1 `#s2` · S1 `#s3`×2 · S1 `#s5` · S1 `#s4` · S2 `#s0` · S2 `#s1`×2 · S2 `#s2`×2 · S2 `#s3`×2 · S2 `#s4` · S3 `#s2`×2 · S3 `#s7` · S4 `#sWS` · S4 `#sCR` · S5 `#sE3`×2 |
| 3 | `src-claude-marks` | How Claude marks AI-generated content | **EMPTY** | 2026-10-11 | 18 | yes | S4 `#s1` · S4 `#sW1`×5 · S4 `#sW2`×6 · S4 `#sCR`×6 |
| 4 | `src-regsp-guide` | Regulation S-P: small entity compliance guide | **EMPTY** | 2026-10-11 | 18 | no | S3 `#sPol`×2 · S4 `#s4`×3 · S4 `#sRSP`×6 · S4 `#s9` · S4 `#sCR`×6 |
| 5 | `src-anthropic-terms` | Consumer Terms of Service, Commercial Terms of Service and Privacy Policy | **EMPTY** | 2026-09-27 | 16 | yes | S4 `#s3`×6 · S4 `#s4`×2 · S4 `#sCR`×7 · S5 `#s6` |
| 6 | `src-anthropic-deprecations` | Model deprecations | **EMPTY** | 2026-10-12 | 15 | yes | S1 `#s10` · S2 `#s5` · S2 `#s8` · S3 `#sOff` · S5 `#sCase`×2 · S5 `#s1`×3 · S5 `#sE2`×2 · S5 `#sE6`×4 |
| 7 | `src-secpri` | Examination priorities: Fiscal year 2026, §VII | **EMPTY** | **none** | 14 | no | S3 `#sPol` · S3 `#s16` · S4 `#s1`×3 · S4 `#s7` · S4 `#s5` · S4 `#sAud`×2 · S4 `#s9`×2 · S4 `#sCR`×3 |
| 8 | `src-magesh` | Hallucination-free? Assessing the reliability of leading AI legal research tools | **EMPTY** | **none** | 13 | no | S2 `#s10`×3 · S3 `#s6`×2 · S3 `#s15` · S3 `#s16`×2 · S4 `#s6`×3 · S4 `#sCR` · S5 `#sE3` |
| 9 | `src-pricing` | Pricing | **EMPTY** | 2026-10-11 | 13 | yes | S1 `#s5`×2 · S1 `#s10`×2 · S1 `#s11`×3 · S2 `#s0` · S2 `#s5`×3 · S4 `#s3` · S4 `#sCR` |
| 10 | `src-anthropic-dpa` | Data Processing Addendum | **EMPTY** | 2026-09-27 | 10 | yes | S4 `#s3`×2 · S4 `#s4`×2 · S4 `#sCR`×6 |
| 11 | `src-effort` | Change the model, effort, and thinking settings | **EMPTY** | 2026-08-20 | 10 | yes | S0.1 `#s1` · S0.1 `#s2` · S0.1 `#s3`×5 · S0.1 `#s9` · S4 `#sWS` · S4 `#sCR` |
| 12 | `src-memory` | Use Claude's chat search and memory to build on previous context | **EMPTY** | 2026-08-20 | 10 | yes | S0.1 `#s0` · S0.1 `#s5`×2 · S0.1 `#s6`×2 · S0.1 `#s7` · S0.1 `#s9` · S0.1 `#s10`×2 · S2 `#s3` |
| 13 | `src-models` | Models overview | **EMPTY** | 2026-09-13 | 10 | yes | S0.1 `#s2` · S0.1 `#s3`×2 · S0.1 `#s4` · S1 `#s5` · S2 `#s0` · S2 `#s3` · S3 `#sRag`×2 · S4 `#sCR` |
| 14 | `src-tools3` | When should I use web search, extended thinking, and research? | **EMPTY** | 2026-08-20 | 9 | yes | S0.1 `#s1` · S0.1 `#s4` · S0.1 `#s5`×3 · S0.1 `#s8`×3 · S0.1 `#s9` |
| 15 | `src-claude-pricing` | Plans and pricing | **EMPTY** | 2026-09-27 | 8 | yes | S1 `#s10` · S1 `#s11` · S1 `#s14b` · S4 `#(footer)` · S4 `#s3`×3 · S4 `#sCR` |
| 16 | `src-finra2026` | 2026 Annual Regulatory Oversight Report | **EMPTY** | **none** | 8 | no | S4 `#s1`×2 · S4 `#s7`×3 · S4 `#sAud`×2 · S4 `#sCR` |
| 17 | `src-finra2409` | Regulatory Notice 24-09 | **EMPTY** | **none** | 8 | no | S1 `#s14`×2 · S4 `#s1`×3 · S4 `#s7` · S4 `#s9` · S4 `#sCR` |
| 18 | `src-regsp` | Regulation S-P: Privacy of consumer financial information and safeguarding customer information, 2024 amendments | **EMPTY** | **none** | 8 | no | S3 `#sPol` · S4 `#s2`×3 · S4 `#s9` · S4 `#sCR`×2 · S5 `#s6` |
| 19 | `src-context-windows` | Context windows | **EMPTY** | 2026-09-13 | 7 | yes | S1 `#s1` · S1 `#s5`×2 · S2 `#s0` · S2 `#s3` · S3 `#sRag`×2 |
| 20 | `src-cve` | CVE-2025-32711 (EchoLeak, CVSS 9.3) | **EMPTY** | **none** | 7 | no | S4 `#s3` · S4 `#s5`×2 · S4 `#sCR`×3 · S5 `#sE3` |
| 21 | `src-kitces-notetakers` | Best AI notetakers for financial advisor meetings: Adoption, satisfaction, and trends | **EMPTY** | **none** | 7 | no | S3 `#s9` · S3 `#s10`×2 · S3 `#s11`×2 · S3 `#s16`×2 |
| 22 | `src-anthropic-ctx` | Contextual retrieval in AI systems | **EMPTY** | **none** | 6 | no | S3 `#sRag` · S3 `#s6`×3 · S3 `#s7` · S3 `#s16` |
| 23 | `src-ctxwindow` | How large is the context window on paid Claude plans? | **EMPTY** | 2026-08-20 | 6 | yes | S0.1 `#s1` · S0.1 `#s4`×4 · S0.1 `#s6` |
| 24 | `src-lee-cognitive` | The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers | **EMPTY** | 2026-10-02 | 6 | no | S3 `#s15` · S5 `#s5`×3 · S5 `#sE5`×2 |
| 25 | `src-synthid` | SynthID | **EMPTY** | 2026-10-11 | 6 | yes | S4 `#s7` · S4 `#sW1`×2 · S4 `#sCR`×3 |
| 26 | `src-aa` | Artificial Analysis Intelligence Index and cost-per-task figures | **EMPTY** | 2026-08-13 | 5 | yes | S1 `#s10` · S2 `#s5`×3 · S4 `#sWS` |
| 27 | `src-anthropic-retention` | API and data retention | **EMPTY** | 2026-09-27 | 5 | yes | S4 `#s3`×2 · S4 `#s4` · S4 `#sCR`×2 |
| 28 | `src-arup` | Reporting on the Arup deepfake incident | **EMPTY** | **none** | 5 | no | S4 `#s5`×2 · S4 `#sCR`×3 |
| 29 | `src-claude-privacy-training` | Is my data used for model training? | **EMPTY** | 2026-10-11 | 5 | yes | S4 `#s3`×2 · S4 `#sCR`×2 · S5 `#s0` |
| 30 | `src-kalai` | Why language models hallucinate | **EMPTY** | 2025-05-11 | 5 | no | S1 `#s9` · S5 `#sE3`×2 · S5 `#s3`×2 |
| 31 | `src-morningstar-fired` | Why do investors fire their financial advisor? | **EMPTY** | **none** | 5 | no | S5 `#s7`×2 · S5 `#sE5`×3 |
| 32 | `src-sec-ai` | Enforcement actions against Delphia (USA) Inc. and Global Predictions, Inc. | **EMPTY** | **none** | 5 | no | S1 `#s1`×2 · S1 `#s14` · S4 `#s1`×2 |
| 33 | `src-synthid-text` | SynthID: Tools for watermarking and detecting LLM-generated Text | **EMPTY** | 2026-08-25 | 5 | yes | S4 `#sW1`×2 · S4 `#sW2`×3 |
| 34 | `src-api-messages` | Messages API reference | **EMPTY** | 2026-09-27 | 4 | yes | S2 `#s3`×2 · S4 `#sWS` · S4 `#sCR` |
| 35 | `src-cfp-genai` | Generative AI Ethics Guide: A Checklist for Upholding the Code and Standards | **EMPTY** | **none** | 4 | no | S4 `#s2`×2 · S4 `#sAnon`×2 |
| 36 | `src-claude-code-settings` | Settings files and precedence | **EMPTY** | 2026-10-04 | 4 | yes | S5 `#s1`×2 · S5 `#sLib`×2 |
| 37 | `src-claude-code-skills` | Skills | **EMPTY** | 2026-10-04 | 4 | yes | S5 `#s1`×2 · S5 `#sLib`×2 |
| 38 | `src-claude-watermark` | How Claude's text watermark works | **EMPTY** | 2026-10-11 | 4 | yes | S4 `#s7` · S4 `#sW1`×3 |
| 39 | `src-finra-inj` | Understanding Generative AI and Prompt Injection Fundamentals | **EMPTY** | **none** | 4 | no | S4 `#s5`×2 · S4 `#sCR`×2 |
| 40 | `src-openai-data` | How your data is used to improve model performance | **EMPTY** | **none** | 4 | yes | S4 `#s3`×3 · S4 `#sCR` |
| 41 | `src-t3-survey` | Software Survey 2026 | **EMPTY** | **none** | 4 | no | S2 `#s9` · S2 `#s12d` · S5 `#s6`×2 |
| 42 | `src-agent-skills` | Agent Skills overview | **EMPTY** | 2026-09-27 | 3 | yes | S4 `#s7` · S4 `#sWS` · S4 `#sCR` |
| 43 | `src-anthropic-agents` | Building effective agents | **EMPTY** | 2026-09-27 | 3 | no | S4 `#sWS` · S4 `#sCR`×2 |
| 44 | `src-anthropic-models-overview` | Models overview | **EMPTY** | 2026-10-12 | 3 | yes | S5 `#s1`×3 |
| 45 | `src-anthropic-threat` | Detecting and countering misuse of AI: September 2026 | **EMPTY** | 2026-09-27 | 3 | no | S4 `#s5` · S4 `#sCR`×2 |
| 46 | `src-cfp-psychology` | CFP Board adds Psychology of Financial Planning to exam requirements | **EMPTY** | **none** | 3 | no | S5 `#s7`×2 · S5 `#sE5` |
| 47 | `src-claude-code-org` | Manage Claude Code plugins for your organization | **EMPTY** | 2026-10-04 | 3 | yes | S5 `#sLib`×3 |
| 48 | `src-daly` | Artificial Intelligence and the Future of Investment Management | **EMPTY** | **none** | 3 | no | S4 `#s1`×2 · S4 `#s9` |
| 49 | `src-dellacqua` | Navigating the jagged technological frontier: Field experimental evidence of the effects of AI on knowledge worker productivity and quality | **EMPTY** | **none** | 3 | no | S5 `#s5`×2 · S5 `#sE5` |
| 50 | `src-gemini-privacy` | Gemini Apps Privacy Hub | **EMPTY** | **none** | 3 | yes | S4 `#s3`×2 · S4 `#sCR` |
| 51 | `src-google-ptcf` | Gemini for Workspace: Prompting guide 101 | **EMPTY** | **none** | 3 | no | S2 `#s6` · S5 `#s2`×2 |
| 52 | `src-ms-copilot` | Privacy FAQ for Microsoft Copilot | **EMPTY** | **none** | 3 | yes | S4 `#s3`×2 · S4 `#sCR` |
| 53 | `src-openai-provenance` | Provenance signals in OpenAI-generated content | **EMPTY** | 2026-10-11 | 3 | yes | S4 `#s7` · S4 `#sW1`×2 |
| 54 | `src-personalization` | Understanding Claude's personalization features | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s1` · S0.1 `#s6` · S2 `#s3` |
| 55 | `src-plugins` | Use plugins in Claude | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s7`×3 |
| 56 | `src-skills` | What are skills? | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s6` · S0.1 `#s7` · S0.1 `#s9` |
| 57 | `src-vanguard-alpha` | Putting a value on your value: Quantifying Vanguard Advisor's Alpha | **EMPTY** | **none** | 3 | no | S5 `#s7` · S5 `#sE5`×2 |
| 58 | `src-aa-leaderboard` | Language model leaderboard, Intelligence Index | **EMPTY** | 2026-10-11 | 2 | yes | S1 `#s10`×2 |
| 59 | `src-advisers-204-2` | Books and records to be maintained by investment advisers, 17 CFR 275.204-2 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#sCR` |
| 60 | `src-advisers-206-4-7` | Compliance procedures and practices, 17 CFR 275.206(4)-7 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#sCR` |
| 61 | `src-advisers-fiduciary` | Commission Interpretation Regarding Standard of Conduct for Investment Advisers, Release IA-5248 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#sCR` |
| 62 | `src-anthropic-certs` | What certifications has Anthropic obtained? | **EMPTY** | 2026-09-27 | 2 | yes | S4 `#s3` · S4 `#sCR` |
| 63 | `src-anthropic-context` | Context windows | **EMPTY** | 2026-09-27 | 2 | yes | S4 `#sWS` · S4 `#sCR` |
| 64 | `src-anthropic-ctx-eng` | Effective context engineering for AI agents | **EMPTY** | 2026-09-27 | 2 | no | S4 `#sWS` · S4 `#sCR` |
| 65 | `src-anthropic-mcp` | Introducing the Model Context Protocol | **EMPTY** | 2026-09-27 | 2 | no | S4 `#sWS` · S4 `#sCR` |
| 66 | `src-anthropic-thinking` | Claude 3.7 Sonnet and Claude Code | **EMPTY** | 2026-09-27 | 2 | no | S4 `#sWS` · S4 `#sCR` |
| 67 | `src-arena-board` | Text leaderboard | **EMPTY** | 2026-10-11 | 2 | yes | S1 `#s10`×2 |
| 68 | `src-cfp-code` | Code of Ethics and Standards of Conduct | **EMPTY** | **none** | 2 | no | S4 `#s4`×2 |
| 69 | `src-chatgpt-index` | Your public ChatGPT queries are getting indexed by Google and other search engines | **EMPTY** | **none** | 2 | no | S4 `#s3` · S4 `#sCR` |
| 70 | `src-claude-code-marketplace` | Create a marketplace | **EMPTY** | 2026-10-04 | 2 | yes | S5 `#sLib`×2 |
| 71 | `src-claude-memory` | Bringing memory to teams at work | **EMPTY** | 2026-09-27 | 2 | yes | S4 `#sWS` · S4 `#sCR` |
| 72 | `src-dahl-fictions` | Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models | **EMPTY** | **none** | 2 | no | S2 `#s10`×2 |
| 73 | `src-deepseek` | Wiz Research uncovers exposed DeepSeek database leaking sensitive information, including chat history | **EMPTY** | **none** | 2 | no | S4 `#s3` · S4 `#sCR` |
| 74 | `src-eu-ai-act` | Regulation (EU) 2024/1689 (the Artificial Intelligence Act), Article 50, transparency obligations | **EMPTY** | **none** | 2 | no | S4 `#sW1`×2 |
| 75 | `src-fbi-ic3-2025` | Cryptocurrency and AI scams bilk Americans of billions: 2025 Internet Crime Report | **EMPTY** | **none** | 2 | no | S4 `#s5` · S4 `#sCR` |
| 76 | `src-finra-4511` | FINRA Rule 4511, General Requirements, and Exchange Act Rule 17a-4 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#sCR` |
| 77 | `src-gemini-workspace` | Generative AI in Google Workspace Privacy Hub | **EMPTY** | **none** | 2 | yes | S4 `#s3`×2 |
| 78 | `src-gtig-ai` | GTIG AI Threat Tracker: Advances in threat actor usage of AI tools | **EMPTY** | **none** | 2 | no | S4 `#s5` · S4 `#sCR` |
| 79 | `src-iskowitz` | AI notetakers and compliance in wealth management: What firms need to know | **EMPTY** | **none** | 2 | no | S3 `#sPol` · S3 `#s16` |
| 80 | `src-iss-ai-policy` | Advisers Using AI by the Numbers | **EMPTY** | 2026-10-11 | 2 | no | S4 `#s9`×2 |
| 81 | `src-joa-prompt` | Writing an effective AI prompt for an audit | **EMPTY** | **none** | 2 | no | S4 `#s7`×2 |
| 82 | `src-kitces-aisearch` | Ways advisors can optimize for AI search (AI SEO) | **EMPTY** | **none** | 2 | no | S5 `#s6`×2 |
| 83 | `src-kitces-productivity` | Kitces Research on Advisor Productivity | **EMPTY** | **none** | 2 | no | S2 `#s9` · S2 `#s12d` |
| 84 | `src-livebench` | LiveBench leaderboard and question releases | **EMPTY** | 2026-10-11 | 2 | yes | S1 `#s10`×2 |
| 85 | `src-meta-feed` | Meta AI's discover feed is full of revealing personal info: here's how to protect your privacy | **EMPTY** | **none** | 2 | no | S4 `#s3` · S4 `#sCR` |
| 86 | `src-metr-2025` | Measuring the impact of early-2025 AI on experienced open-source developer productivity | **EMPTY** | **none** | 2 | no | S5 `#s5`×2 |
| 87 | `src-ms-copilot-edp` | Enterprise data protection in Microsoft Copilot and Microsoft Copilot Chat | **EMPTY** | **none** | 2 | yes | S4 `#s3`×2 |
| 88 | `src-owasp` | Top 10 for LLM Applications and Top 10 for Agentic Applications | **EMPTY** | **none** | 2 | yes | S4 `#sCR`×2 |
| 89 | `src-sec-withdraw` | Withdrawal of proposed regulatory actions, including Conflicts of Interest Associated with the Use of Predictive Data Analytics (S7-12-23) | **EMPTY** | **none** | 2 | no | S4 `#s1`×2 |
| 90 | `src-wiretap` | Cal. Penal Code § 637.2(a)(1), (c); 18 U.S.C. § 2511 | **EMPTY** | **none** | 2 | no | S3 `#s12`×2 |
| 91 | `src-0din-gemini` | Phishing for Gemini | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 92 | `src-aa-index` | Intelligence Index methodology | **EMPTY** | 2026-10-11 | 1 | yes | S1 `#s10` |
| 93 | `src-anthropic-deprecation-commitments` | Commitments on model deprecation and preservation | **EMPTY** | 2026-10-02 | 1 | no | S5 `#s1` |
| 94 | `src-anthropic-injection` | Mitigating the risk of prompt injections in browser use | **EMPTY** | 2026-09-27 | 1 | yes | S4 `#sCR` |
| 95 | `src-anthropic-threat-aug25` | Detecting and countering misuse of AI: August 2025 | **EMPTY** | 2026-09-27 | 1 | no | S4 `#sCR` |
| 96 | `src-arena-rename` | LMArena is now Arena | **EMPTY** | 2026-10-11 | 1 | no | S1 `#s10` |
| 97 | `src-ascii-smuggling` | Microsoft Copilot: from prompt injection to data exfiltration of your emails | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 98 | `src-beta` | Available beta and research preview features | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 99 | `src-brynjolfsson` | Generative AI at work | **EMPTY** | **none** | 1 | no | S5 `#s5` |
| 100 | `src-charlotin` | AI Hallucination Cases database | **EMPTY** | 2026-06 *(month only)* | 1 | yes | S2 `#s10` |
| 101 | `src-claude-code-host` | Host and maintain a marketplace | **EMPTY** | 2026-10-04 | 1 | yes | S5 `#sLib` |
| 102 | `src-deloitte` | Generative-AI fraud projection | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 103 | `src-directory` | Browse skills, connectors, and plugins in one directory | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 104 | `src-drift` | Cybersecurity alert: Salesloft Drift AI supply chain attack | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 105 | `src-features` | Features and capabilities collection index | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 106 | `src-gemini-api-terms` | Gemini API Additional Terms of Service | **EMPTY** | **none** | 1 | yes | S4 `#(footer)` |
| 107 | `src-gemini-ratelimits` | Rate limits | **EMPTY** | **none** | 1 | yes | S4 `#(footer)` |
| 108 | `src-ibm-breach-2026` | IBM study: one in four malicious breaches are AI-enabled, costing companies $6 million on average | **EMPTY** | **none** | 1 | yes | S4 `#sCR` |
| 109 | `src-investmentnews-t3-2026` | AI moves from novelty to backbone as advisors reshape their fintech stacks | **EMPTY** | **none** | 1 | no | S5 `#s6` |
| 110 | `src-noy-zhang` | Experimental evidence on the productivity effects of generative artificial intelligence | **EMPTY** | **none** | 1 | no | S5 `#s5` |
| 111 | `src-openai-pricing` | API pricing | **EMPTY** | **none** | 1 | yes | S2 `#s5` |
| 112 | `src-openai-retire-4o` | Retiring GPT-4o and other ChatGPT models | **EMPTY** | **none** | 1 | yes | S5 `#s1` |
| 113 | `src-pew-ai-summaries` | Google users are less likely to click on links when an AI summary appears in the results | **EMPTY** | **none** | 1 | no | S5 `#s6` |
| 114 | `src-rightcapital-iris` | RightCapital launches Iris, the first planning-focused AI agent designed to transform the financial planning process | **EMPTY** | **none** | 1 | yes | S5 `#s6` |
| 115 | `src-rohrer` | Interleaved practice improves mathematics learning | **EMPTY** | 2026-08-29 | 1 | no | S1 `#s13` |
| 116 | `src-routing` | Why Claude switched models in your conversation with Fable 5 | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s2` |
| 117 | `src-rp-2022-32` | Late portability elections under Rev. Proc. 2022-32 (IRB 2022-30) | **EMPTY** | 2026-10-11 | 1 | no | S2 `#s7` |
| 118 | `src-sampling` | LLM sampling visualiser | **EMPTY** | **none** | 1 | no | S1 `#s8` |
| 119 | `src-sg-deepfake-2026` | Fake Zoom call with PM Wong: police release deepfake footage of scam that caused victim to hand over S$4.9 million | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 120 | `src-trailofbits-image` | Weaponizing image scaling against production AI systems | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 121 | `src-uae-voice` | Fraudsters cloned company director's voice in $35 million heist, police find | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 122 | `src-unit42-ipi` | Fooling AI agents: web-based indirect prompt injection observed in the wild | **EMPTY** | **none** | 1 | no | S4 `#sCR` |
| 123 | `src-zheng-persona` | When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models | **EMPTY** | **none** | 1 | no | S2 `#s6` |
| 124 | `src-anthropic-aup` | Usage Policy | **EMPTY** | 2026-09-27 | 0 | yes | *listed by no lesson, cited by none* |
| 125 | `src-anthropic-fluency` | AI fluency: Frameworks and foundations | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 126 | `src-capitalone` | 2019 Capital One cyber incident: what happened | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 127 | `src-equifax` | Data protection: actions taken by Equifax and federal agencies in response to the 2017 breach (GAO-18-559) | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 128 | `src-fbi-ic3-2024` | FBI releases annual Internet Crime Report: 2024 | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 129 | `src-ferrari` | Ferrari deepfake attempt: scammer foiled by security question about CEO Benedetto Vigna | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 130 | `src-forcedleak` | ForcedLeak: AI agent risks exposed in Salesforce Agentforce | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 131 | `src-gartner` | Survey of 302 security leaders | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 132 | `src-hallowell` | Hallowell v. Commissioner, T.C. Memo. 2023-217 | *n/a* | *n/a* | 0 | no | *listed by S4, cited by none* |
| 133 | `src-il-pipa` | Personal Information Protection Act, 815 ILCS 530/10 | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 134 | `src-irs-590b` | Publication 590-B, Distributions from Individual Retirement Arrangements (IRAs) | **EMPTY** | 2026-10-12 | 0 | yes | *listed by S2, cited by none* |
| 135 | `src-irs-8606` | Form 8606, Nondeductible IRAs, and its instructions | **EMPTY** | 2026-10-12 | 0 | yes | *listed by S2, cited by none* |
| 136 | `src-kessler` | Kessler v. Commissioner, 152 T.C. 88 (2019) | *n/a* | *n/a* | 0 | no | *listed by S2, cited by none* |
| 137 | `src-kitces-advisortech` | The Latest in Financial AdvisorTech — AdvisorTech columns, October 2025, November 2025 and August 2026 | **EMPTY** | **none** | 0 | yes | *listed by no lesson, cited by none* |
| 138 | `src-laplace` | A philosophical essay on probabilities | **EMPTY** | *n/a* | 0 | no | *listed by S2, cited by none* |
| 139 | `src-morningstar` | AI for advisors: Enhancing client conversations | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 140 | `src-nikkei-papers` | 'Positive review only': researchers hide AI prompts in papers | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 141 | `src-safebreach-gemini` | Invitation is all you need: hacking Gemini | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 142 | `src-secure2-107` | SECURE 2.0 Act of 2022, section 107 (increase in age for required beginning date) | **EMPTY** | 2026-10-12 | 0 | no | *listed by S2, cited by none* |
| 143 | `src-sg-deepfake-2025` | Finance director in Singapore transfers S$670,000 to scammers who used deepfake to impersonate company's executives | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 144 | `src-state-breach` | Data breach notification laws: a 50-state survey, 2026 edition | **EMPTY** | **none** | 0 | yes | *listed by no lesson, cited by none* |
| 145 | `src-surfshark` | 2026 deepfake-loss analysis | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 146 | `src-td10001` | Required Minimum Distributions, T.D. 10001, 89 FR 58886 (final regulations under IRC § 401(a)(9)) | **EMPTY** | 2026-10-12 | 0 | no | *listed by S2, cited by none* |
| 147 | `src-uber-doj` | Former chief security officer of Uber sentenced to three years' probation for covering up data breach | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 148 | `src-uk-voice` | A voice deepfake was used to scam a CEO out of $243,000 | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 149 | `src-vectara` | Introducing the next generation of Vectara's hallucination leaderboard | **EMPTY** | **none** | 0 | yes | *listed by no lesson, cited by none* |
| 150 | `src-zhao` | Invisible image watermarks are provably removable using generative AI | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |


---

## Links, for the reading

| Key | Link |
|---|---|
| `src-case` | *not applicable* |
| `src-wolfram` | https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/ |
| `src-claude-marks` | https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content |
| `src-regsp-guide` | https://www.sec.gov/files/rules/final/2024/regulation-s-p-small-entity-compliance-guide.pdf |
| `src-anthropic-terms` | https://www.anthropic.com/legal/commercial-terms |
| `src-anthropic-deprecations` | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| `src-secpri` | https://www.sec.gov/files/2026-exam-priorities.pdf |
| `src-magesh` | https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/ |
| `src-pricing` | https://platform.claude.com/docs/en/about-claude/pricing |
| `src-anthropic-dpa` | https://www.anthropic.com/legal/data-processing-addendum |
| `src-effort` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-memory` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-models` | https://platform.claude.com/docs/en/models/overview |
| `src-tools3` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-claude-pricing` | https://claude.com/pricing |
| `src-finra2026` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-finra2409` | https://www.finra.org/rules-guidance/notices/24-09 |
| `src-regsp` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-context-windows` | https://platform.claude.com/docs/en/build-with-claude/context-windows |
| `src-cve` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-kitces-notetakers` | https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/ |
| `src-anthropic-ctx` | https://www.anthropic.com/engineering/contextual-retrieval |
| `src-ctxwindow` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-lee-cognitive` | https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf |
| `src-synthid` | https://deepmind.google/models/synthid/ |
| `src-aa` | https://artificialanalysis.ai/models |
| `src-anthropic-retention` | https://platform.claude.com/docs/en/manage-claude/api-and-data-retention |
| `src-arup` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-claude-privacy-training` | https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training |
| `src-kalai` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-morningstar-fired` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-sec-ai` | https://www.sec.gov/newsroom/press-releases/2024-36 |
| `src-synthid-text` | https://ai.google.dev/responsible/docs/safeguards/synthid |
| `src-api-messages` | https://platform.claude.com/docs/en/api/messages |
| `src-cfp-genai` | https://www.cfp.net/ethics/compliance-resources/2025/02/generative-ai-ethics-guide |
| `src-claude-code-settings` | https://code.claude.com/docs/en/settings |
| `src-claude-code-skills` | https://code.claude.com/docs/en/skills |
| `src-claude-watermark` | https://www.anthropic.com/news/claude-text-watermark |
| `src-finra-inj` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-openai-data` | https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance |
| `src-t3-survey` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-agent-skills` | https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview |
| `src-anthropic-agents` | https://www.anthropic.com/engineering/building-effective-agents |
| `src-anthropic-models-overview` | https://platform.claude.com/docs/en/about-claude/models/overview |
| `src-anthropic-threat` | https://www.anthropic.com/threat-intelligence-report-september-2026 |
| `src-cfp-psychology` | https://www.cfp.net/news/2021/03/cfp-board-adds-psychology-of-financial-planning-to-exam-requirements |
| `src-claude-code-org` | https://code.claude.com/docs/en/plugins/org |
| `src-daly` | https://www.sec.gov/newsroom/speeches-statements/daly-020326-artificial-intelligence-future-investment-management-remarks-investment-company-institute-ici-winter |
| `src-dellacqua` | https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321 |
| `src-gemini-privacy` | https://support.google.com/gemini/answer/13594961 |
| `src-google-ptcf` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-ms-copilot` | https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot |
| `src-openai-provenance` | https://help.openai.com/en/articles/8912793-provenance-signals-in-openai-generated-content |
| `src-personalization` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-plugins` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-skills` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-vanguard-alpha` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-aa-leaderboard` | https://artificialanalysis.ai/leaderboards/models |
| `src-advisers-204-2` | https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.204-2 |
| `src-advisers-206-4-7` | https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.206(4)-7 |
| `src-advisers-fiduciary` | https://www.sec.gov/rules-regulations/2019/06/commission-interpretation-regarding-standard-conduct-investment-advisers |
| `src-anthropic-certs` | https://support.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained |
| `src-anthropic-context` | https://platform.claude.com/docs/en/build-with-claude/context-windows |
| `src-anthropic-ctx-eng` | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| `src-anthropic-mcp` | https://www.anthropic.com/news/model-context-protocol |
| `src-anthropic-thinking` | https://www.anthropic.com/news/claude-3-7-sonnet |
| `src-arena-board` | https://arena.ai/leaderboard/chat/text |
| `src-cfp-code` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-chatgpt-index` | https://techcrunch.com/2025/07/31/your-public-chatgpt-queries-are-getting-indexed-by-google-and-other-search-engines |
| `src-claude-code-marketplace` | https://code.claude.com/docs/en/plugin-marketplaces |
| `src-claude-memory` | https://claude.com/blog/memory |
| `src-dahl-fictions` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-deepseek` | https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak |
| `src-eu-ai-act` | https://eur-lex.europa.eu/eli/reg/2024/1689/oj |
| `src-fbi-ic3-2025` | https://www.fbi.gov/news/press-releases/cryptocurrency-and-ai-scams-bilk-americans-of-billions |
| `src-finra-4511` | https://www.finra.org/rules-guidance/rulebooks/finra-rules/4511 |
| `src-gemini-workspace` | https://support.google.com/a/answer/15706919 |
| `src-gtig-ai` | https://services.google.com/fh/files/misc/advances-in-threat-actor-usage-of-ai-tools-en.pdf |
| `src-iskowitz` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-iss-ai-policy` | https://www.planadviser.com/exclusives/advisers-using-ai-by-the-numbers/ |
| `src-joa-prompt` | https://www.journalofaccountancy.com/newsletters/a-a-focus/writing-an-effective-ai-prompt-for-an-audit/ |
| `src-kitces-aisearch` | https://www.kitces.com/blog/artificial-intelligence-ai-search-engine-optimization-seo-financial-advisor-marketing-content-strategy/ |
| `src-kitces-productivity` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-livebench` | https://livebench.ai/ |
| `src-meta-feed` | https://www.tomsguide.com/computing/online-security/meta-ais-discover-feed-is-full-of-revealing-personal-info-heres-how-to-protect-your-privacy |
| `src-metr-2025` | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ |
| `src-ms-copilot-edp` | https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection |
| `src-owasp` | https://owasp.org/www-project-top-10-for-large-language-model-applications/ |
| `src-sec-withdraw` | https://www.sec.gov/rules-regulations/2025/06/s7-12-23 |
| `src-wiretap` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-0din-gemini` | https://0din.ai/blog/phishing-for-gemini |
| `src-aa-index` | https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index |
| `src-anthropic-deprecation-commitments` | https://www.anthropic.com/research/deprecation-commitments |
| `src-anthropic-injection` | https://www.anthropic.com/news/prompt-injection-defenses |
| `src-anthropic-threat-aug25` | https://www.anthropic.com/news/detecting-countering-misuse-aug-2025 |
| `src-arena-rename` | https://arena.ai/blog/lmarena-is-now-arena |
| `src-ascii-smuggling` | https://embracethered.com/blog/posts/2024/m365-copilot-prompt-injection-tool-invocation-and-data-exfil-using-ascii-smuggling/ |
| `src-beta` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-brynjolfsson` | https://www.nber.org/papers/w31161 |
| `src-charlotin` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-claude-code-host` | https://code.claude.com/docs/en/plugins/host-marketplace |
| `src-deloitte` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-directory` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-drift` | https://www.finra.org/rules-guidance/guidance/salesloft-drift-AI-supply-chain-attack |
| `src-features` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-gemini-api-terms` | https://ai.google.dev/gemini-api/terms |
| `src-gemini-ratelimits` | https://ai.google.dev/gemini-api/docs/rate-limits |
| `src-ibm-breach-2026` | https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled,-costing-companies-6-million-on-average |
| `src-investmentnews-t3-2026` | https://investmentnews.com/fintech/ai-moves-from-novelty-to-backbone-as-advisors-reshape-fintech-stacks/265643 |
| `src-noy-zhang` | https://www.science.org/doi/10.1126/science.adh2586 |
| `src-openai-pricing` | https://openai.com/api/pricing/ |
| `src-openai-retire-4o` | https://help.openai.com/en/articles/20001051-retiring-gpt-4o-and-other-chatgpt-models |
| `src-pew-ai-summaries` | https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/ |
| `src-rightcapital-iris` | https://www.accessnewswire.com/newsroom/en/business-and-professional-services/rightcapital-launches-iristm-the-first-planning-focused-ai-agent-designed-to-transform-the-fin-1180326 |
| `src-rohrer` | https://doi.org/10.1037/edu0000001 |
| `src-routing` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-rp-2022-32` | https://www.irs.gov/pub/irs-drop/rp-22-32.pdf |
| `src-sampling` | https://artefact2.github.io/llm-sampling/ |
| `src-sg-deepfake-2026` | https://mothership.sg/2026/05/pm-wong-zoom-deepfake-scam/ |
| `src-trailofbits-image` | https://blog.trailofbits.com/2025/08/21/weaponizing-image-scaling-against-production-ai-systems/ |
| `src-uae-voice` | https://www.forbes.com/sites/thomasbrewster/2021/10/14/huge-bank-fraud-uses-deep-fake-voice-tech-to-steal-millions/ |
| `src-unit42-ipi` | https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/ |
| `src-zheng-persona` | https://aclanthology.org/2024.findings-emnlp.888/ |
| `src-anthropic-aup` | https://www.anthropic.com/legal/aup |
| `src-anthropic-fluency` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-capitalone` | https://www.capitalone.com/digital/facts2019/ |
| `src-equifax` | https://www.gao.gov/products/gao-18-559 |
| `src-fbi-ic3-2024` | https://www.fbi.gov/news/press-releases/fbi-releases-annual-internet-crime-report |
| `src-ferrari` | https://fortune.com/2024/07/27/ferrari-deepfake-attempt-scammer-security-question-ceo-benedetto-vigna-cybersecurity-ai |
| `src-forcedleak` | https://noma.security/blog/forcedleak-agent-risks-exposed-in-salesforce-agentforce |
| `src-gartner` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-hallowell` | *not applicable* |
| `src-il-pipa` | https://ilga.gov/documents/legislation/ilcs/documents/081505300K10.htm |
| `src-irs-590b` | https://www.irs.gov/publications/p590b |
| `src-irs-8606` | https://www.irs.gov/forms-pubs/about-form-8606 |
| `src-kessler` | *not applicable* |
| `src-kitces-advisortech` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-laplace` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-morningstar` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-nikkei-papers` | https://asia.nikkei.com/business/technology/artificial-intelligence/positive-review-only-researchers-hide-ai-prompts-in-papers |
| `src-safebreach-gemini` | https://www.safebreach.com/blog/invitation-is-all-you-need-hacking-gemini/ |
| `src-secure2-107` | https://www.congress.gov/bill/117th-congress/house-bill/2617 |
| `src-sg-deepfake-2025` | https://mothership.sg/2025/04/finance-director-scammed-deepfake/ |
| `src-state-breach` | https://privacyrights.org/resources-tools/reports/data-breach-notification-laws-50-state-survey-2026-edition |
| `src-surfshark` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-td10001` | https://www.govinfo.gov/content/pkg/FR-2024-07-19/html/2024-14542.htm |
| `src-uber-doj` | https://www.justice.gov/usao-ndca/pr/former-chief-security-officer-uber-sentenced-three-years-probation-covering-data |
| `src-uk-voice` | https://www.forbes.com/sites/jessedamiani/2019/09/03/a-voice-deepfake-was-used-to-scam-a-ceo-out-of-243000/ |
| `src-vectara` | https://www.vectara.com/blog/introducing-the-next-generation-of-vectaras-hallucination-leaderboard |
| `src-zhao` | https://arxiv.org/abs/2306.01953 |


---

## Retrieval notes

What happened the last time somebody tried, and what it does and does not say
about the source.

### `src-claude-marks`

Opened directly on 2026-09-25 and again, in full, on 2026-09-27, together with the Claude Content Checker page at claude.com/check-content. Quotations below are the pages' own words. Read again in full on 2026-10-12 and found to match the 2026-10-11 reading (FACTS claude-text-watermark).

### `src-regsp-guide`

sec.gov is unreachable from the build container (FACTS reg-sp-compliance, 2026-10-11). Every figure comes from sec.gov snippets of the compliance guide, fact sheet 34-100155 and the press release, corroborated by law-firm summaries. The two negatives, no SEC notification and no 24-hour clock to the chief compliance officer, rest on their absence from the primary text plus secondary statements. Both compliance dates have passed, so the rule is in force for every covered firm.

### `src-anthropic-terms`

Opened directly on 2026-09-27: the Commercial Terms (effective 17 June 2025), the Consumer Terms (effective 8 October 2025), the Privacy Policy (effective 10 September 2026) and the 28 August 2025 news post on the consumer training change. The consumer-side retention figures (five years if training is allowed, 30 days if not) are stated in the news post and on the Claude Code data-usage page; privacy.claude.com itself could not be opened. Earlier retrieval 2026-08-14.

### `src-anthropic-deprecations`

OPENED on 2026-10-02 and RE-OPENED on 2026-10-04 (platform.claude.com is reachable from this build). On 2026-10-04 every date the page carried on 2026-10-02 was unchanged; the not-sooner-than dates of the current and legacy models were added to the scope for the §02 calendar's new rows. The published date is the page's most recent deprecation announcement (Claude Sonnet 4.5, 30 September 2026); the page is updated in place with every announcement. RE-OPENED in full on 2026-10-12, after FACTS claude-model-ids-and-retirements read it in full on 2026-10-11: every date in the §02 calendar is unchanged, and the table now also lists claude-haiku-5-5 (Active, not sooner than 7 October 2027), with claude-haiku-4-5-20251001 still Active and not sooner than 15 October 2026.

### `src-secpri`

sec.gov is egress-blocked from the build (2026-09-27). §VII's contents in scope are as reported by several consistent law-firm and compliance-firm summaries of the 17 November 2025 release; the record's H stands on the earlier verification of the AI and Regulation S-P focus, and the Appendix D4 use of the polymorphic-malware line is chipped M on the page for that reason.

### `src-pricing`

Fetched in full 2026-08-25 for Phase 3.5, and again in full 2026-09-13 for the session-2 retrieval bridge; the table is unchanged for Sonnet 5, Opus 5 and Fable 5, and the FAQ gives the rule of thumb of one token to about 0.75 words. PULL-002 (session-2) carried a PARTIAL DATE, "2026-08", until the 2026-09-13 pull replaced it.

### `src-anthropic-dpa`

Opened directly on 2026-09-27, three reads, consistent. Incorporated by reference into the Commercial Terms (Section C, Data Privacy). Quotations in scope are the document's own words.

### `src-models`

Re-fetched 2026-09-13 at the page's current address for session-2 §01. Every Claude model ID is a pinned snapshot, including the dateless IDs from the 4.6 generation on; Fable 5.1 is the current flagship at $10 / $50 per MTok and Fable 5 is listed as a legacy model, still available.

### `src-claude-pricing`

Opened directly on 2026-09-27, with the Help Center articles on the Max plan (11049741) and on Enterprise seats (13393991) and the Claude Enterprise solutions page. The Max 20x figure is on the Help Center article, not the pricing page. Prices move without notice.

### `src-context-windows`

Fetched in full 2026-09-13 for the session-2 retrieval bridge. Three sentences carry the lesson's claims. On contents, everything in the request counts toward the context window, the system prompt, every message including tool results, images and documents, and the tool definitions. On accumulation, each turn's input phase contains all previous conversation history plus the current user message, and previous turns are preserved completely. On degradation, as token count grows, accuracy and recall degrade, a phenomenon the page names context rot. The page adds that chat interfaces such as claude.ai can manage the window on a rolling first-in, first-out basis.

### `src-lee-cognitive`

OPENED IN FULL on 2026-10-02 (the Microsoft Research PDF, 23 pages, text extracted and read). Until that date this record carried the link as unverified and the confidence at M, because the 2026-08 build characterised the paper by its title alone. Session 3's §06 still uses only the title claim; Session 5 uses the measured findings below. The regression coefficients are the non-standardised figures in the paper's Table 4.

### `src-synthid`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: the Google DeepMind host is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work. STILL OPEN AFTER 2026-08-25, and this record now says which references are open rather than leaving them to be counted by hand. `src-synthid-text` was added that day for a page that WAS retrieved, and it closed exactly one of the eleven references — session-4:1476, the factual-responses claim. The other ten remain on this key and this page has still never been loaded: :1412 and :1416 are C2PA metadata and soft-binding claims that belong to the C2PA specification rather than to Google; :1425 and :1440 are the tournament-sampling mechanism, whose real authority is the Nature paper the retrieved page names and which no build has read either; :1443 and :1457 are image, video and audio robustness, which the retrieved page does not cover at all; :1460 is the adoption-figure paragraph, whose second sentence asserts what a page nobody has loaded currently says and now carries [UNCONFIRMED]; :1493 is the formatter-erases-the-slack claim; :1500 chips a sentence whose sources are Zhao, two arXiv preprints and Christ. Registered in docs/deferred-work.md as session-4 work. 2026-10-11, next-term Phase 5: FACTS google-synthid records the page, https://deepmind.google/models/synthid/, as still unreachable from the build container and reads it from primary-domain search snippets, so this record now carries that link and the FACTS retrieval date at M; a snippet is not a reading, and last_verified stays empty.

### `src-aa`

PULL-002 (session-2) carries a PARTIAL DATE, "2026-08". A month cannot be ordered against a day, which is where this record's version incoherence hid. The ordering rule now reports every partial date as a precondition failure AND orders it at its earliest possible day, so the v4.1.1 -> v4.1 regression against PULL-003 still fires.

### `src-anthropic-retention`

Opened directly on 2026-09-27, with the Help Center articles on custom retention for Enterprise plans (10440198) and on retention for covered models (15425996, effective 9 June 2026) and the Claude Code data-usage page. Two Anthropic pages differ on the Enterprise chat default (30 days standard against "indefinitely unless a custom period is set"); the lesson states only what both agree on.

### `src-claude-privacy-training`

privacy.claude.com is unreachable from the build container (FACTS claude-consumer-retention, 2026-10-11). The values come from primary-domain search snippets plus the fully fetched anthropic.com post "Updates to Consumer Terms and Privacy Policy", read again in full on 2026-10-12: up to five years if you allow model training, the existing 30-day period if you do not. The page does not say whether the toggle starts on or off, so the lesson takes the training default from the Consumer Terms, src-anthropic-terms, and states none from this page.

### `src-morningstar-fired`

NOT RETRIEVED. morningstar.com is egress-blocked from this build environment (2026-10-02). The figures in scope are consistent across four reports found (Financial Advisor magazine, InsuranceNewsNet, Institutional Investor's RIA Intel, the IFA Magazine podcast with both authors); the reports give the sample as 184 investors in one and 185 in another, and the page says "about 185". Re-checked 2026-10-04: morningstar.com and the secondary hosts were still blocked; a fresh search returned the same six shares and 184 investors. The exact title and publication date were not read off the report, so both are recorded as the reports give them, which is why the confidence is M.

### `src-synthid-text`

The 2025-04-09 in `published` is the page's OWN last-updated stamp, in UTC, not a publication date; it is a living documentation page and the stamp is the only date it carries. RETRIEVED OUTSIDE THIS BUILD ENVIRONMENT: the instructor's analyst surface loaded the page on 2026-08-25 and supplied the substantiations recorded in `scope`. This environment answers 403 on CONNECT for the host, so no generator here has read the page and none can re-check it. A retrieval is not a reading, so `last_verified` is EMPTY and stays that way until a human attests at a terminal.

### `src-api-messages`

Fetched 2026-09-13 for session-2 §01. The temperature parameter is marked deprecated for models released after Claude Opus 4.6, with 1.0 accepted for backwards compatibility and other values rejected with a 400 error; it defaults to 1.0 and ranges 0.0 to 1.0; the page states that even with temperature of 0.0 the results will not be fully deterministic.

### `src-cfp-genai`

NOT RETRIEVED. cfp.net and the press-release hosts are egress-blocked from this build environment (2026-09-25). The title, the February 2025 date and the substance in scope come from search-engine summaries of the guide and of CFP Board's press release of 25 February 2025, which is why the confidence is M. The instructor holds the PDF (instructor-notes/session-3.md, the 09-21 night) and can raise it by reading the page.

### `src-claude-code-settings`

OPENED on 2026-10-04 (code.claude.com is reachable from this build). Updated in place; the retrieval date is the one to read.

### `src-claude-code-skills`

OPENED on 2026-10-04 (code.claude.com is reachable from this build). The documentation is updated in place; the retrieval date is the one to read.

### `src-claude-watermark`

Fetched in full 2026-10-11 (FACTS claude-text-watermark) and read again in full on 2026-10-12 with the same content; the post carries an update note of 1 September 2026 on the detection API. The announcement says future Claude models; the help article, src-claude-marks, keeps the per-model list, so the lesson does not say every Claude text output is marked today.

### `src-openai-data`

NOT RETRIEVED. help.openai.com and openai.com are egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this article and of "Chat and file retention in ChatGPT" (article 8983778), which is why the confidence is M. Read both pages before teaching the numbers.

### `src-t3-survey`

As summarised by Kitces.com Weekend Reading, March 2026. Re-checked 2026-10-04: kitces.com, investmentnews.com and dwealth.news were egress-blocked from this build; a fresh search returned 2,906 responses, 52.2%, 42.9% and 14 note-taking tools, unchanged.

### `src-agent-skills`

Opened directly on 2026-09-27.

### `src-anthropic-agents`

Opened directly on 2026-09-27, with the Agent SDK post of 29 September 2025 on claude.com and the tool-use documentation, whose section on the agentic loop was also opened. No source opened uses the phrase "loop engineering"; Anthropic's words are "in a loop", "the agent loop" and "the agentic loop".

### `src-anthropic-models-overview`

OPENED on 2026-10-04 (platform.claude.com is reachable from this build). The page carries no publication date of its own; it is updated in place with each model release, so the year is recorded and the retrieval date is the one to read. RE-OPENED on 2026-10-12 (the old address redirects to platform.claude.com/docs/en/models/overview), after FACTS claude-model-ids-and-retirements read the same page on 2026-10-11.

### `src-anthropic-threat`

Retrieved 2026-09-27 through a summarising fetch, not read whole. The passage the lesson rests on was returned verbatim: "If their monitoring AI agents identified that any of their deployed malware was detected by a security product, agents would then set about the process of autonomously modifying and rebuilding the malware to evade the existing detections." Read the report before teaching the case.

### `src-cfp-psychology`

NOT RETRIEVED. cfp.net is egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04, as was institutionalinvestor.com). The facts in scope come from the search engine's summary of the release and from Institutional Investor's RIA Intel report, which agree, which is why the confidence is M.

### `src-claude-code-org`

OPENED on 2026-10-04 (code.claude.com is reachable from this build). Updated in place; the retrieval date is the one to read.

### `src-daly`

The link is the sec.gov address the search engine returned on 2026-09-27 for this title, date and venue (Manalapan, Florida, delivered virtually). sec.gov is egress-blocked from the build, so the page itself was not re-read; the scope below stands on the earlier verification.

### `src-dellacqua`

NOT RETRIEVED. hbs.edu and ssrn.com are egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04). The figures in scope are consistent across the reports found (Computing, beSpacific, Silicon Canals, the TFT summary, the Brainscape card set), which is why the confidence is M. The task descriptions and the below- and above-average split added on 2026-10-04 come from the same consistent reports. The working-paper number is not recorded because it was not read off the paper.

### `src-gemini-privacy`

NOT RETRIEVED. support.google.com is egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this hub and of "Manage and delete your activity in Gemini Apps" (answer 13278892), which is why the confidence is M. Read both pages before teaching the numbers.

### `src-ms-copilot`

NOT RETRIEVED. support.microsoft.com is egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this FAQ and of "Conversation history in Microsoft Copilot", which is why the confidence is M. Read both pages before teaching the numbers.

### `src-openai-provenance`

help.openai.com is unreachable from the build container (FACTS openai-provenance, 2026-10-11). The values come from primary-domain search snippets. The help article was retitled from "C2PA in ChatGPT images", and the date the EU text watermark began (about 5 October 2026) is inferred from search listings and not read on the page, so the lesson states no date for it.

### `src-vanguard-alpha`

NOT RETRIEVED. vanguard.com and its regional PDF hosts are egress-blocked from this build environment (2026-10-02). The figures in scope are consistent across the reports found (PLANADVISER, Index Fund Advisors, InvestmentNews, Investment Executive, Vanguard Canada's own summary as the search engine returns it), which is why the confidence is M. Vanguard frames the figure as potential value added over time, not an annual guarantee. Re-checked 2026-10-04: vanguard.ca, Vanguard's own host for the infographic, was blocked; a fresh search returned about 3% and 150 basis points unchanged.

### `src-aa-leaderboard`

artificialanalysis.ai is unreachable from the build container (FACTS leaderboard-snapshot-aa, 2026-10-11); the snapshot is read from primary-domain search snippets and carried at M. Effort tiers matter: Opus 5.5 at High scores 54 against 58 at Max, and GPT-6 Astra at High scores 51. The scores are not comparable with the index figures in the July 2026 scatter, which src-aa carries.

### `src-advisers-204-2`

NOT RETRIEVED. ecfr.gov, law.cornell.edu and govinfo.gov are egress-blocked from this build environment (2026-09-27). The rule's citation is certain; its wording as stated in scope is from the maintainer's knowledge of the rule and is why the confidence is M. Read paragraph (a)(7) and paragraph (e)(1) before teaching them as settled.

### `src-advisers-206-4-7`

NOT RETRIEVED. ecfr.gov and law.cornell.edu are egress-blocked from this build environment (2026-09-27). The rule's citation is certain; the wording in scope is from the maintainer's knowledge and is why the confidence is M.

### `src-advisers-fiduciary`

NOT RETRIEVED. sec.gov is egress-blocked from this build environment (2026-09-27). The release's existence, date and number are certain; the characterisation in scope is from the maintainer's knowledge and is why the confidence is M.

### `src-anthropic-certs`

Opened directly on 2026-09-27 (the article says it was last updated 16 March 2026), with the HIPAA-ready Enterprise plans article (13296973) and the January 2025 news post on ISO 42001. The Trust Portal itself is egress-blocked from this build.

### `src-anthropic-context`

Opened directly on 2026-09-27, with the models overview and the 2023 announcements of 100K (11 May 2023) and 200K (21 November 2023) context windows and the 1M announcement of 12 August 2025, all on anthropic.com or claude.com.

### `src-anthropic-ctx-eng`

Opened directly on 2026-09-27, with the current prompting best-practices page, which still says a role in the system prompt focuses behaviour and tone.

### `src-anthropic-mcp`

Opened directly on 2026-09-27, with the web search post of 20 March 2025 and the integrations post of 1 May 2025 on claude.com, both opened.

### `src-anthropic-thinking`

Opened directly on 2026-09-27, with the current prompting best-practices page, which describes manual step-by-step prompting as a fallback for when thinking is off.

### `src-arena-board`

The live board could not be read (arena.ai unreachable from the build container, FACTS leaderboard-snapshot-arena, 2026-10-11). The pair of scores comes from one secondary roundup dated 2026-10-08, with Gemini 4 Argon's 1,525 corroborated by two others. Scores move weekly, so this is a placeholder until the live board is re-read the week before Session 1.

### `src-cfp-code`

NOT RETRIEVED. cfp.net is egress-blocked from this build environment (2026-09-25). Standard A.14's name and its reasonable-care duty are carried from the instructor's own run sheet for the 2026-09-21 session, which names Standards A.9 and A.14 at high confidence from the Code itself; the wording on the session-4 page is a paraphrase, not a quotation, and the chip is M until the page is read.

### `src-chatgpt-index`

NOT RETRIEVED. techcrunch.com is egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of this article and of Search Engine Land's and Search Engine Journal's reporting of the same days, which is why the confidence is M.

### `src-claude-code-marketplace`

OPENED on 2026-10-04 (code.claude.com is reachable from this build). Updated in place; the retrieval date is the one to read.

### `src-claude-memory`

Opened directly on 2026-09-27, with the Help Center article on chat search and memory (11817273), which states that memory is saved as a set of topics as you chat.

### `src-deepseek`

NOT RETRIEVED. wiz.io is egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of the post and of the reporting that cited it (TechCrunch, The Register, SecurityWeek, 30 January 2025), which is why the confidence is M.

### `src-eu-ai-act`

NOT RETRIEVED. eur-lex.europa.eu is egress-blocked from this build environment (2026-09-27). The application date of 2 August 2026, the machine-readable marking duty and the Article 50(2) code of practice are corroborated by Anthropic's own page on how Claude marks content, which was opened; the Regulation's text was not, which is why the confidence is M.

### `src-fbi-ic3-2025`

NOT RETRIEVED. fbi.gov and ic3.gov are egress-blocked from this build environment (2026-09-27). Figures are consistent across search snippets of the FBI press release and of SpyCloud, SecureWorld, Paubox, Abnormal, McDonald Hopkins and Alston & Bird. The report is at ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf.

### `src-finra-4511`

NOT RETRIEVED. finra.org is egress-blocked from this build environment (2026-09-27). The rules' citations are certain; the periods in scope are from the maintainer's knowledge and are why the confidence is M. A broker-dealer's correspondence period differs from an adviser's, so the page never states one number for both.

### `src-gemini-workspace`

NOT RETRIEVED. support.google.com is egress-blocked from this build environment (2026-09-27). The substance in scope comes from search-engine summaries of the page, which is why the confidence is M.

### `src-gtig-ai`

NOT RETRIEVED. services.google.com and cloud.google.com are egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of the report and of the reporting on its release (The Hacker News, BleepingComputer, Infosecurity Magazine, 5 November 2025), which is why the confidence is M.

### `src-iss-ai-policy`

planadviser.com is unreachable from the build container (FACTS adoption-iss-policy, 2026-10-11). The figures come from primary-domain search snippets; the ISS release itself is at insights.issgovernance.com, dated 2025-07-22. The survey is a self-report by advisers, fielded in June 2025.

### `src-joa-prompt`

NOT RETRIEVED. journalofaccountancy.com is egress-blocked from this build environment (2026-09-27). The syllabus lists this reading as "Writing an Effective AI Prompt for an Audit Trail"; the page's own title, as the search engine returns it, is the one recorded here, and the November 2025 date is from the same summary. The article was not read, so the lesson claims nothing about what it says: it names it as the assigned reading behind the record block and no more.

### `src-kitces-aisearch`

NOT RETRIEVED. kitces.com is egress-blocked from this build environment (2026-10-02, and again on 2026-10-04), both for the container's proxy and for the fetch tool. The syllabus lists the reading as "Ways Advisors Can Optimize for AI Search with a Marketing Strategy Refresh"; the title recorded here is the one the search engine returns for the URL. The one recommendation on the page is the one the search engine's summary of the article repeats; nothing else from the article is characterised.

### `src-livebench`

The site is unreachable from the build container (FACTS livebench-last-release, 2026-10-11). The release date is read from the homepage snippet and GitHub issue titles that reference the 2026-06-25 release; the GitHub README is stale and still says 2025-04-25. The description (23 objective tasks in 7 categories, refreshed about every six months) comes from the README, fetched in full.

### `src-meta-feed`

NOT RETRIEVED. The article's own headline uses a dash where this record uses a colon, so that the injected footer adds no em dash to the lesson. The facts in scope come from search-engine summaries of this article and of the Mozilla Foundation's campaign page on the same feed (June 2025), which is why the confidence is M. A stronger citation (the original reporting) is a review-list item.

### `src-metr-2025`

NOT RETRIEVED. metr.org is egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04, as were the secondary hosts tried). The figures in scope are consistent across five reports found (The Decoder, eWeek, diginomica, letsdatascience, the Harvard tagteam feed of the post), which is why the confidence is M. The task line added on 2026-10-04 comes from the same reports.

### `src-ms-copilot-edp`

NOT RETRIEVED. learn.microsoft.com is egress-blocked from this build environment (2026-09-27). The substance in scope comes from search-engine summaries of the page, which is why the confidence is M.

### `src-owasp`

Fetch of the cited link ATTEMPTED 2026-08-25 and REFUSED before it reached the source: owasp.org and genai.owasp.org are both blocked by the build environment's egress policy (403 on CONNECT), so last_retrieved stays unresolved — the cited page itself was never loaded. A SURROGATE was reachable and was read: the GitHub repository backing that exact project page, fetched 2026-08-25. Reading a surrogate is not retrieving the source and no date is written for one.

### `src-sec-withdraw`

NOT READ FROM THE SEC. The withdrawal on 12 June 2025 of fourteen proposals, the predictive data analytics proposal of August 2023 among them, is reported consistently by several law-firm client alerts reached through search on 2026-09-25; the SEC page itself was not loaded from this build. M until it is.

### `src-0din-gemini`

NOT RETRIEVED. 0din.ai is egress-blocked from this build environment (2026-09-27). The mechanism is described consistently in search snippets of the disclosure's coverage and in Microsoft's Defender documentation on prompt-injection protection, which names white-on-white text and zero-size fonts among the techniques it scans for.

### `src-aa-index`

Host unreachable from the build container (FACTS aa-index-definition, 2026-10-11); the description is read from primary-domain snippets. The evaluations-page FAQ still says 25% per category; the v4.3 announcement and the methodology page say 30/20/20/30, which is what the lesson states.

### `src-anthropic-deprecation-commitments`

OPENED on 2026-10-02 (anthropic.com is reachable from this build).

### `src-anthropic-injection`

Opened directly on 2026-09-27, with the Claude for Chrome pilot post on claude.com and the computer-use tool's security section in the platform docs.

### `src-anthropic-threat-aug25`

Opened directly on 2026-09-27. Cross-checked against Malwarebytes, Forrester and Halcyon, which report the demand range as $75,000 to $500,000. No payment figure is public.

### `src-arena-rename`

arena.ai is unreachable from the build container (FACTS arena-rename, 2026-10-11); the date comes from the blog post's search metadata. A historical "formerly LMArena" is fine; a present-tense LMArena is not.

### `src-ascii-smuggling`

NOT RETRIEVED. embracethered.com is egress-blocked from this build environment (2026-09-27). The technique was first shown by Riley Goodside on 11 January 2024; cross-checked against The Hacker News, SC Media, Cisco and Keysight, and Microsoft's fix in August 2024.

### `src-brynjolfsson`

NOT RETRIEVED. nber.org, arxiv.org and academic.oup.com are egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04). The figures in scope are consistent across the reports found (the NBER abstract as the search engine returns it, IDEAS/RePEc, the SSRN listing, the arXiv listing), which is why the confidence is M. The setting and tool lines added on 2026-10-04 come from the same reports.

### `src-charlotin`

PARTIAL DATE. The day was never recorded. The pull captured a count the source itself dates "as of 9 June 2026" (session-2:1669) and the text entered the repo on 2026-08-15, so the retrieval falls in 2026-06-09..2026-06-30. Not narrowed further, and no day is invented.

### `src-claude-code-host`

OPENED on 2026-10-04 (code.claude.com is reachable from this build). Updated in place; the retrieval date is the one to read.

### `src-drift`

NOT RETRIEVED. finra.org is egress-blocked from this build environment (2026-09-27). The incident is described consistently by AppOmni, WTW, TechRadar and Paubox (August and September 2025), citing Google Threat Intelligence's count of more than 700 affected organisations.

### `src-gemini-api-terms`

NOT RETRIEVED. ai.google.dev is egress-blocked from this build environment (2026-09-27). The wording in scope appears verbatim in search snippets of the page itself and in two independent mirrors of the terms (Simon Willison, October 2024; ScanCode LicenseDB, 2025). Read the page before class; Google changes it.

### `src-gemini-ratelimits`

NOT RETRIEVED. ai.google.dev is egress-blocked from this build environment (2026-09-27), and the secondary sources disagree (250 requests a day for an older flash model against about 20 for the newer ones, after Google cut free quotas in December 2025 and moved to per-project limits). No number is printed on the page.

### `src-ibm-breach-2026`

NOT RETRIEVED. newsroom.ibm.com is egress-blocked from this build environment (2026-09-27). Figures consistent across search snippets of the IBM release, Infosecurity Magazine, Security Boulevard, ASIS Security Management and Cybersecurity Dive. Supersedes the 2025 edition's $4.44 million and $10.22 million.

### `src-investmentnews-t3-2026`

NOT RETRIEVED. investmentnews.com is egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04, as was dwealth.news). The facts in scope are consistent across three reports found (InvestmentNews, a vendor's release about the same survey, the dwealth Advisor Tech Talk column of 17 March 2026), which is why the confidence is M. The survey's headline shares are held separately at H in src-t3-survey.

### `src-noy-zhang`

NOT RETRIEVED. science.org and the NBER conference copy are egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04, as was economics.mit.edu). The figures in scope are the ones every summary found repeats (Stanford SCALE's publication listing, Marginal Revolution, Gulf News, the IT-Daily report), which is why the confidence is M. The task and occupation lines added on 2026-10-04 come from the same consistent summaries. Volume and page numbers are not recorded because they were not read off the article.

### `src-openai-pricing`

The GPT-5.6 Sol, Terra and Luna rates in session-2 Appendix B8 entered the repository with the 2026-08 pull and no retrieval was recorded for them. openai.com was egress-blocked on 2026-09-12 when this record was written, so the rates are carried at M until the DW-081 re-pull records a retrieval.

### `src-openai-retire-4o`

NOT RETRIEVED. help.openai.com and openai.com are egress-blocked from this build environment (2026-10-02). The facts in scope come from the search engine's summary of the article and from three consistent reports (YourStory; Gigazine, 30 January 2026; letsdatascience), plus TechCrunch and Tom's Guide (April 2025) for the GPT-4 retirement, which is why the confidence is M. Still blocked on 2026-10-04. Open the article before saying a date aloud.

### `src-pew-ai-summaries`

NOT RETRIEVED. pewresearch.org is egress-blocked from this build environment (2026-10-02; still blocked on 2026-10-04, as was theregister.com). The figures in scope are consistent across five reports found (The Register, TheWrap, PPC Land, AI Weekly, Gigazine), which is why the confidence is M.

### `src-rightcapital-iris`

NOT RETRIEVED. accessnewswire.com and rightcapital.com are egress-blocked from this build environment (2026-10-02; unchanged on 2026-10-04). The facts in scope are consistent across four reports found (InvestmentNews, WealthManagement.com, Pulse 2.0, the Eagle-Tribune syndication of the release), which is why the confidence is M. A vendor's description of its own product; the page uses it as one example of a planning-software agent, not as an endorsement.

### `src-rp-2022-32`

irs.gov is unreachable from the build container (FACTS portability-late-election, 2026-10-11). The terms come from irs.gov search snippets, and the Form 706 instructions (Rev. July 2026) still cite the revenue procedure as current. The relief is unavailable to an estate that must file under IRC 6018(a).

### `src-sg-deepfake-2026`

NOT RETRIEVED. mothership.sg is egress-blocked from this build environment (2026-09-27). Cross-checked against search snippets from the South China Morning Post, The Star (Malaysia), Malay Mail, VnExpress International and Fintech News Singapore, all consistent on the amount and the dates; the Singapore Police Force released the deepfake footage on 16 May 2026.

### `src-trailofbits-image`

NOT RETRIEVED. blog.trailofbits.com is egress-blocked from this build environment (2026-09-27). Cross-checked against BleepingComputer and SecurityWeek (August 2025) and Brave's October 2025 disclosure of faint text in screenshots read by AI browsers.

### `src-uae-voice`

NOT RETRIEVED. forbes.com is egress-blocked from this build environment (2026-09-27). Cross-checked against search snippets from Dark Reading, Unite.AI, SingularityHub and Interesting Engineering (October 2021), all consistent on the amount, the year and the court filing Forbes reported.

### `src-unit42-ipi`

NOT RETRIEVED. unit42.paloaltonetworks.com is egress-blocked from this build environment (2026-09-27). The counts in scope come from the Cloud Security Alliance's research note on the report and from search snippets of the report itself.

### `src-anthropic-aup`

Opened directly on 2026-09-27.

### `src-capitalone`

NOT RETRIEVED. capitalone.com is egress-blocked from this build environment (2026-09-27). Dates and figures consistent across search snippets of Capital One's page, CBS News and SiliconANGLE (August 2020, the $80 million OCC penalty), Banking Dive and the Department of Justice's case page.

### `src-equifax`

NOT RETRIEVED. gao.gov is egress-blocked from this build environment (2026-09-27). The dates and figures in scope are consistent across search snippets of the GAO report, the FTC's July 2019 settlement release, the CFPB's release, the House Oversight Committee's December 2018 report and EPIC.

### `src-fbi-ic3-2024`

NOT RETRIEVED. fbi.gov is egress-blocked from this build environment (2026-09-27). Figures consistent across search snippets of the FBI press release, CyberScoop, Cybersecurity Dive, SecureWorld and Nacha.

### `src-ferrari`

NOT RETRIEVED. fortune.com is egress-blocked from this build environment (2026-09-27). First reported by Bloomberg on 26 July 2024; cross-checked against MIT Sloan Management Review, Jalopnik and the AI Incident Database.

### `src-forcedleak`

NOT RETRIEVED. noma.security is egress-blocked from this build environment (2026-09-27). Cross-checked against The Hacker News, Dark Reading and Security Affairs (September 2025), consistent on the CVSS score, the mechanism and the $5 domain.

### `src-il-pipa`

NOT RETRIEVED. ilga.gov is egress-blocked from this build environment (2026-09-27). The statutory wording in scope appears in search snippets of the statute and of Justia, the Illinois Attorney General's guidance page and a Hogan Lovells summary, all consistent.

### `src-irs-590b`

Title verified 2026-10-12 from the IRS Form 8606 instructions (which cite it) found by web search; irs.gov is not reachable from the build container, so the current edition was not fetched.

### `src-irs-8606`

Scope verified 2026-10-12 from the 2022 to 2025 instruction texts found by web search (nondeductible contributions, distributions with basis, conversions to Roth IRAs, Roth distributions); irs.gov is not reachable from the build container, so the current form was not fetched.

### `src-kitces-advisortech`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: www.kitces.com is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work.

### `src-nikkei-papers`

NOT RETRIEVED. asia.nikkei.com is egress-blocked from this build environment (2026-09-27). Cross-checked against the arXiv follow-up study (2507.06185, which found 18 papers), Smithsonian Magazine and Duke University's analysis of about 200,000 CVs.

### `src-safebreach-gemini`

NOT RETRIEVED. safebreach.com is egress-blocked from this build environment (2026-09-27). Presented at Black Hat USA in August 2025 after disclosure to Google on 22 February 2025; cross-checked against The Register, TechRepublic and Bitdefender.

### `src-secure2-107`

Citation and effect verified 2026-10-12 from three secondary summaries (Milliman, Foley, Kilpatrick Townsend) found by web search; congress.gov is not reachable from the build container, so the statutory text itself was not fetched. Applicable age 73 for those born 1951 to 1959 and 75 for 1960 and later; the 1959 cohort was clarified by the May 2023 chairs' letter and the July 2024 proposed regulations.

### `src-sg-deepfake-2025`

NOT RETRIEVED. mothership.sg and police.gov.sg are egress-blocked from this build environment (2026-09-27). The primary source is the Singapore Police Force news release of 7 April 2025 on the joint recovery with the Hong Kong Police Force; cross-checked against HRD Asia, Fortune (25 April 2025) and The Straits Times.

### `src-state-breach`

NOT RETRIEVED. privacyrights.org is egress-blocked from this build environment (2026-09-27), and the day counts in scope come from aggregated search snippets of several survey sites rather than from each statute, which is why the confidence is M.

### `src-td10001`

Verified 2026-10-12 from the GovInfo Federal Register listing, the IRS newsroom release (IR-2024-190) and the Journal of Accountancy report found by web search: issued 18 July 2024, published 19 July 2024, effective 17 September 2024, applying to calendar years beginning on or after 1 January 2025; companion proposed regulations REG-103529-23 issued the same day. The GovInfo page itself was not fetched from the build container.

### `src-uber-doj`

NOT RETRIEVED. justice.gov is egress-blocked from this build environment (2026-09-27). Consistent across search snippets of the DOJ release and of BakerHostetler, Norton Rose Fulbright, Arnold & Porter and SC Media.

### `src-uk-voice`

NOT RETRIEVED. forbes.com is egress-blocked from this build environment (2026-09-27). The case was first reported by the Wall Street Journal on 30 August 2019 citing the insurer Euler Hermes; cross-checked against Gizmodo, CBC and Avast. The call was not recorded, so the AI attribution rests on the insurer's assessment.

### `src-vectara`

Fetch of the cited link ATTEMPTED 2026-08-25 and REFUSED before it reached the source: www.vectara.com is blocked by the build environment's egress policy (403 on CONNECT), so last_retrieved stays unresolved — the cited blog post itself was never loaded. A SURROGATE was reachable and was read: Vectara's own hallucination-leaderboard repository, fetched 2026-08-25, last updated 2026-05-11, HHEM-2.3, 123 models. Reading a surrogate is not retrieving the source.

### `src-zhao`

THE PAPER ITSELF WAS NEVER LOADED, so last_retrieved is unresolved. arxiv.org, proceedings.neurips.cc, openreview.net, dl.acm.org and semanticscholar.org are all blocked by the build environment's egress policy (403 on CONNECT). Identity was established on 2026-08-25 from the AUTHORS' OWN REPOSITORY, github.com/XuandongZhao/WatermarkAttacker, which was reachable and returned the official BibTeX and a NeurIPS 2024 badge verbatim, corroborated by six independent search-index entries (arXiv 2306.01953, OpenReview 7hy5fy2OC6, NeurIPS 2024 poster 96428, an ACM DL DOI, a Semantic Scholar record, and the proceedings PDF path). A repository is not the paper and a search index is not a retrieval, so no date is written for either. [UNVERIFIED, needs source] for the proceedings volume and page range.



---

## Sources whose content CHANGED on the last fetch

**A fetch that found the source saying something different is a finding, not
an update.** Nothing below has been silently rewritten in the lessons. Each
entry names the delta and every lesson element that depends on it.

### `src-claude-marks` — 18 reference(s)

2026-10-12. The help page no longer gives 2 December 2026 as the date by which earlier models are all covered; it keeps a per-model list and says the law gives models launched before 2 August 2026 a transition period while marking is added. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-10-12 in next-term Phase 5: session-4 Appendix D1, the Which models bullet, now cites the 14 August 2026 announcement, the 2 August 2026 launch rule and the per-model list, and no longer states a completion date; the §01 sorter line and the D1 talk box say supported Claude models.

### `src-anthropic-deprecations` — 15 reference(s)

2026-10-12. The page lists Claude Haiku 5.5 (claude-haiku-5-5, not sooner than 7 October 2027), which the 2026-10-04 pull did not record; Claude Haiku 4.5 keeps its 15 October 2026 date but is no longer one of the four current models. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-10-12: the session-5 §01 calendar gained a Haiku 5.5 row and moved Haiku 4.5 to the legacy rows, and the lineup bullet no longer counts the legacy models.

### `src-pricing` — 13 reference(s)

2026-08-25. The page now states that Sonnet 5's $2 / $10 introductory pricing "is now the standard price" and that "the previously scheduled increase to $3/$15 per million input/output tokens on September 1, 2026 will not occur". The 2026-07-28 pull recorded the increase as scheduled. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-08-25 in Phase 3.6: session-1 §10's second Sonnet 5 table row and its "rises 50% tomorrow" note both carried the cancelled rise and are gone; the surviving row states $2 / $10 / $0.20 with no date on it. Three script arrays carried the same cancelled figure and were corrected with it — TIERS (§03 cost boxes), PATHS (§06 practice cost) and DPT (§06 document pass), the last two of which also printed the label "Sonnet 5 (from 1 Sep)" on screen. session-2 §02's "Sonnet 5 lists at $2 in / $10 out per million tokens" was UNAFFECTED and is the standing price. Phase 3.5 flagged rather than resolved; Phase 3.6 resolved on instruction.

### `src-anthropic-models-overview` — 3 reference(s)

2026-10-12. The four current models are now Claude Fable 5.1, Claude Opus 5.5, Claude Sonnet 5.5 and Claude Haiku 5.5 (retirement not sooner than 7 October 2027); the 2026-10-04 pull recorded Claude Haiku 4.5 as the fourth. Haiku 4.5 now sits among the legacy models. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-10-12: the session-5 §01 calendar rows for Haiku 4.5 and Haiku 5.5, and the lineup bullet.

### `src-owasp` — 2 reference(s)

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
| `src-synthid` | 6 | deepmind.google |
| `src-owasp` | 2 | owasp.org |
| `src-kitces-advisortech` | 0 | *link unknown* |
| `src-vectara` | 0 | www.vectara.com |
