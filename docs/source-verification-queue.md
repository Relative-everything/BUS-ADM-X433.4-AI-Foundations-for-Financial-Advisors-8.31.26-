# Source verification queue

**Generated from `SOURCES.md` by `scripts/build-bibliography.mjs`. Do not edit:
the next run overwrites it.**

This is the instructor's work list, in the order the work is worth doing. A
source **36 claims rest on** is worth verifying before one that carries
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
| Source records | **120** |
| `last_verified` **EMPTY** | **116** |
| `last_verified` populated | 1 |
| `last_verified` *not applicable* (synthetic or fabricated) | 3 |
| References standing behind an EMPTY `last_verified` | **335** of 389 |
| Moving targets | 43 |
| Lock | notarised, digest `cb5f277761afb142` |


## Already attested

Each one cites the evidence in the repository that records the confirmation.

- **`src-wolfram`** — 2026-08-23. EDITORIAL.md, "Seventeen names. Instructor-verified." — the locked 17 section names of this essay, entered 2026-08-23 in commit bd8f458 and enforced by A11. Enumerating the seventeen section names requires having opened the essay.


---

## The queue

| # | Key | Title | `last_verified` | `last_retrieved` | Refs | Moving | Depends on it |
|---|---|---|---|---|---|---|---|
| 1 | `src-case` | The Cole household | *n/a* | *n/a* | 36 | no | S1 `#s1` · S2 `#s6b` · S3 `#s2` · S3 `#s4` · S3 `#sRag` · S3 `#s6` · S3 `#s7` · S3 `#s9` · S3 `#sPrep` · S3 `#s10` · S3 `#sChk` · S3 `#sOff`×2 · S3 `#s12` · S3 `#sVend` · S3 `#s13` · S3 `#s16` · S4 `#s0` · S4 `#sCold` · S4 `#s2`×2 · S4 `#sRSP` · S4 `#sAnon` · S4 `#s3` · S4 `#s4` · S4 `#s5` · S4 `#sW1` · S4 `#sW2` · S4 `#s6` · S4 `#sWS` · S4 `#s7` · S4 `#sCR`×2 · S4 `#sD` · S4 `#s9`×2 |
| 2 | `src-regsp` | Regulation S-P: Privacy of consumer financial information and safeguarding customer information, 2024 amendments | **EMPTY** | **none** | 23 | no | S3 `#sPol`×2 · S4 `#s2`×3 · S4 `#sRSP`×7 · S4 `#s4`×3 · S4 `#s9`×8 |
| 3 | `src-claude-marks` | How Claude marks AI-generated content | **EMPTY** | 2026-09-27 | 18 | yes | S4 `#s1` · S4 `#sW1`×6 · S4 `#sW2`×6 · S4 `#s9`×5 |
| 4 | `src-wolfram` | What is ChatGPT doing … and why does it work? | **2026-08-23** | **none** | 18 | no | S1 `#s2` · S1 `#s3`×2 · S1 `#s4` · S1 `#s5`×2 · S2 `#s1`×2 · S2 `#s2`×2 · S2 `#s3`×2 · S2 `#s4` · S3 `#s2`×2 · S3 `#s7` · S4 `#sWS` · S4 `#s9` |
| 5 | `src-anthropic-terms` | Consumer Terms of Service, Commercial Terms of Service and Privacy Policy | **EMPTY** | 2026-09-27 | 14 | yes | S4 `#s3`×6 · S4 `#s4`×2 · S4 `#s9`×6 |
| 6 | `src-magesh` | Hallucination-free? Assessing the reliability of leading AI legal research tools | **EMPTY** | **none** | 12 | no | S2 `#s10`×3 · S3 `#s6`×2 · S3 `#s15` · S3 `#s16`×2 · S4 `#s6`×3 · S4 `#s9` |
| 7 | `src-anthropic-dpa` | Data Processing Addendum | **EMPTY** | 2026-09-27 | 10 | yes | S4 `#s3`×2 · S4 `#s4`×2 · S4 `#s9`×6 |
| 8 | `src-effort` | Change the model, effort, and thinking settings | **EMPTY** | 2026-08-20 | 10 | yes | S0.1 `#s1` · S0.1 `#s2` · S0.1 `#s3`×5 · S0.1 `#s9` · S4 `#sWS` · S4 `#s9` |
| 9 | `src-memory` | Use Claude's chat search and memory to build on previous context | **EMPTY** | 2026-08-20 | 10 | yes | S0.1 `#s0` · S0.1 `#s5`×2 · S0.1 `#s6`×2 · S0.1 `#s7` · S0.1 `#s9` · S0.1 `#s10`×2 · S2 `#s3` |
| 10 | `src-tools3` | When should I use web search, extended thinking, and research? | **EMPTY** | 2026-08-20 | 9 | yes | S0.1 `#s1` · S0.1 `#s4` · S0.1 `#s5`×3 · S0.1 `#s8`×3 · S0.1 `#s9` |
| 11 | `src-pricing` | Pricing | **EMPTY** | 2026-09-13 | 8 | yes | S1 `#s5` · S1 `#s11`×3 · S2 `#s0` · S2 `#s5`×3 |
| 12 | `src-finra2409` | Regulatory Notice 24-09 | **EMPTY** | **none** | 7 | no | S1 `#s14`×2 · S4 `#s1`×2 · S4 `#s7` · S4 `#s9`×2 |
| 13 | `src-kitces-notetakers` | Best AI notetakers for financial advisor meetings: Adoption, satisfaction, and trends | **EMPTY** | **none** | 7 | no | S3 `#s9` · S3 `#s10`×2 · S3 `#s11`×2 · S3 `#s16`×2 |
| 14 | `src-aa` | Artificial Analysis Intelligence Index and cost-per-task figures | **EMPTY** | 2026-08-13 | 6 | yes | S1 `#s10`×2 · S2 `#s5`×3 · S4 `#sWS` |
| 15 | `src-anthropic-ctx` | Contextual retrieval in AI systems | **EMPTY** | **none** | 6 | no | S3 `#sRag` · S3 `#s6`×3 · S3 `#s7` · S3 `#s16` |
| 16 | `src-ctxwindow` | How large is the context window on paid Claude plans? | **EMPTY** | 2026-08-20 | 6 | yes | S0.1 `#s1` · S0.1 `#s4`×4 · S0.1 `#s6` |
| 17 | `src-cve` | CVE-2025-32711 (EchoLeak, CVSS 9.3) | **EMPTY** | **none** | 6 | no | S4 `#s3` · S4 `#s5`×2 · S4 `#s9`×3 |
| 18 | `src-finra2026` | 2026 Annual Regulatory Oversight Report | **EMPTY** | **none** | 6 | no | S4 `#s1`×2 · S4 `#s7`×3 · S4 `#s9` |
| 19 | `src-anthropic-retention` | API and data retention | **EMPTY** | 2026-09-27 | 5 | yes | S4 `#s3`×2 · S4 `#s4` · S4 `#s9`×2 |
| 20 | `src-arup` | Reporting on the Arup deepfake incident | **EMPTY** | **none** | 5 | no | S4 `#s5`×2 · S4 `#s9`×3 |
| 21 | `src-claude-pricing` | Plans and pricing | **EMPTY** | 2026-09-27 | 5 | yes | S4 `#(footer)` · S4 `#s3`×3 · S4 `#s9` |
| 22 | `src-models` | Models overview | **EMPTY** | 2026-09-13 | 5 | yes | S0.1 `#s2` · S0.1 `#s3`×2 · S0.1 `#s4` · S2 `#s3` |
| 23 | `src-secpri` | Examination priorities: Fiscal year 2026, §VII | **EMPTY** | **none** | 5 | no | S4 `#s1`×2 · S4 `#s5` · S4 `#s9`×2 |
| 24 | `src-synthid-text` | SynthID: Tools for watermarking and detecting LLM-generated Text | **EMPTY** | 2026-08-25 | 5 | yes | S4 `#sW1`×2 · S4 `#sW2`×3 |
| 25 | `src-api-messages` | Messages API reference | **EMPTY** | 2026-09-27 | 4 | yes | S2 `#s3`×2 · S4 `#sWS` · S4 `#s9` |
| 26 | `src-cfp-genai` | Generative AI Ethics Guide: A Checklist for Upholding the Code and Standards | **EMPTY** | **none** | 4 | no | S4 `#s2`×2 · S4 `#sAnon`×2 |
| 27 | `src-context-windows` | Context windows | **EMPTY** | 2026-09-13 | 4 | yes | S2 `#s0` · S2 `#s3` · S3 `#sRag`×2 |
| 28 | `src-finra-inj` | Understanding Generative AI and Prompt Injection Fundamentals | **EMPTY** | **none** | 4 | no | S4 `#s5`×2 · S4 `#s9`×2 |
| 29 | `src-il-pipa` | Personal Information Protection Act, 815 ILCS 530/10 | **EMPTY** | **none** | 4 | no | S4 `#sRSP`×2 · S4 `#s9`×2 |
| 30 | `src-openai-data` | How your data is used to improve model performance | **EMPTY** | **none** | 4 | yes | S4 `#s3`×3 · S4 `#s9` |
| 31 | `src-sec-ai` | Enforcement actions against Delphia (USA) Inc. and Global Predictions, Inc. | **EMPTY** | **none** | 4 | no | S1 `#s1`×2 · S4 `#s1`×2 |
| 32 | `src-synthid` | SynthID | **EMPTY** | **none** | 4 | yes | S4 `#sW1` · S4 `#s9`×3 |
| 33 | `src-agent-skills` | Agent Skills overview | **EMPTY** | 2026-09-27 | 3 | yes | S4 `#sWS` · S4 `#s7` · S4 `#s9` |
| 34 | `src-anthropic-agents` | Building effective agents | **EMPTY** | 2026-09-27 | 3 | no | S4 `#sWS` · S4 `#s9`×2 |
| 35 | `src-anthropic-threat` | Detecting and countering misuse of AI: September 2026 | **EMPTY** | 2026-09-27 | 3 | no | S4 `#s5` · S4 `#s9`×2 |
| 36 | `src-daly` | Artificial Intelligence and the Future of Investment Management | **EMPTY** | **none** | 3 | no | S4 `#s1`×2 · S4 `#s9` |
| 37 | `src-gemini-privacy` | Gemini Apps Privacy Hub | **EMPTY** | **none** | 3 | yes | S4 `#s3`×2 · S4 `#s9` |
| 38 | `src-kitces-productivity` | Kitces Research on Advisor Productivity | **EMPTY** | **none** | 3 | no | S2 `#s9`×2 · S2 `#s12d` |
| 39 | `src-ms-copilot` | Privacy FAQ for Microsoft Copilot | **EMPTY** | **none** | 3 | yes | S4 `#s3`×2 · S4 `#s9` |
| 40 | `src-personalization` | Understanding Claude's personalization features | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s1` · S0.1 `#s6` · S2 `#s3` |
| 41 | `src-plugins` | Use plugins in Claude | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s7`×3 |
| 42 | `src-skills` | What are skills? | **EMPTY** | 2026-08-20 | 3 | yes | S0.1 `#s6` · S0.1 `#s7` · S0.1 `#s9` |
| 43 | `src-state-breach` | Data breach notification laws: a 50-state survey, 2026 edition | **EMPTY** | **none** | 3 | yes | S4 `#sRSP`×2 · S4 `#s9` |
| 44 | `src-advisers-204-2` | Books and records to be maintained by investment advisers, 17 CFR 275.204-2 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#s9` |
| 45 | `src-advisers-206-4-7` | Compliance procedures and practices, 17 CFR 275.206(4)-7 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#s9` |
| 46 | `src-advisers-fiduciary` | Commission Interpretation Regarding Standard of Conduct for Investment Advisers, Release IA-5248 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#s9` |
| 47 | `src-anthropic-certs` | What certifications has Anthropic obtained? | **EMPTY** | 2026-09-27 | 2 | yes | S4 `#s3` · S4 `#s9` |
| 48 | `src-anthropic-context` | Context windows | **EMPTY** | 2026-09-27 | 2 | yes | S4 `#sWS` · S4 `#s9` |
| 49 | `src-anthropic-ctx-eng` | Effective context engineering for AI agents | **EMPTY** | 2026-09-27 | 2 | no | S4 `#sWS` · S4 `#s9` |
| 50 | `src-anthropic-mcp` | Introducing the Model Context Protocol | **EMPTY** | 2026-09-27 | 2 | no | S4 `#sWS` · S4 `#s9` |
| 51 | `src-anthropic-thinking` | Claude 3.7 Sonnet and Claude Code | **EMPTY** | 2026-09-27 | 2 | no | S4 `#sWS` · S4 `#s9` |
| 52 | `src-capitalone` | 2019 Capital One cyber incident: what happened | **EMPTY** | **none** | 2 | no | S4 `#sRSP` · S4 `#s9` |
| 53 | `src-cfp-code` | Code of Ethics and Standards of Conduct | **EMPTY** | **none** | 2 | no | S4 `#s4`×2 |
| 54 | `src-chatgpt-index` | Your public ChatGPT queries are getting indexed by Google and other search engines | **EMPTY** | **none** | 2 | no | S4 `#s3` · S4 `#s9` |
| 55 | `src-claude-memory` | Bringing memory to teams at work | **EMPTY** | 2026-09-27 | 2 | yes | S4 `#sWS` · S4 `#s9` |
| 56 | `src-dahl-fictions` | Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models | **EMPTY** | **none** | 2 | no | S2 `#s10`×2 |
| 57 | `src-deepseek` | Wiz Research uncovers exposed DeepSeek database leaking sensitive information, including chat history | **EMPTY** | **none** | 2 | no | S4 `#s3` · S4 `#s9` |
| 58 | `src-equifax` | Data protection: actions taken by Equifax and federal agencies in response to the 2017 breach (GAO-18-559) | **EMPTY** | **none** | 2 | no | S4 `#sRSP` · S4 `#s9` |
| 59 | `src-eu-ai-act` | Regulation (EU) 2024/1689 (the Artificial Intelligence Act), Article 50, transparency obligations | **EMPTY** | **none** | 2 | no | S4 `#sW1`×2 |
| 60 | `src-fbi-ic3-2025` | Cryptocurrency and AI scams bilk Americans of billions: 2025 Internet Crime Report | **EMPTY** | **none** | 2 | no | S4 `#s5` · S4 `#s9` |
| 61 | `src-finra-4511` | FINRA Rule 4511, General Requirements, and Exchange Act Rule 17a-4 | **EMPTY** | **none** | 2 | no | S4 `#s7` · S4 `#s9` |
| 62 | `src-gemini-workspace` | Generative AI in Google Workspace Privacy Hub | **EMPTY** | **none** | 2 | yes | S4 `#s3`×2 |
| 63 | `src-gtig-ai` | GTIG AI Threat Tracker: Advances in threat actor usage of AI tools | **EMPTY** | **none** | 2 | no | S4 `#s5` · S4 `#s9` |
| 64 | `src-iskowitz` | AI notetakers and compliance in wealth management: What firms need to know | **EMPTY** | **none** | 2 | no | S3 `#sPol` · S3 `#s16` |
| 65 | `src-joa-prompt` | Writing an effective AI prompt for an audit | **EMPTY** | **none** | 2 | no | S4 `#s7`×2 |
| 66 | `src-meta-feed` | Meta AI's discover feed is full of revealing personal info: here's how to protect your privacy | **EMPTY** | **none** | 2 | no | S4 `#s3` · S4 `#s9` |
| 67 | `src-ms-copilot-edp` | Enterprise data protection in Microsoft Copilot and Microsoft Copilot Chat | **EMPTY** | **none** | 2 | yes | S4 `#s3`×2 |
| 68 | `src-owasp` | Top 10 for LLM Applications and Top 10 for Agentic Applications | **EMPTY** | **none** | 2 | yes | S4 `#s9`×2 |
| 69 | `src-t3-survey` | Software Survey 2026 | **EMPTY** | **none** | 2 | no | S2 `#s9` · S2 `#s12d` |
| 70 | `src-uber-doj` | Former chief security officer of Uber sentenced to three years' probation for covering up data breach | **EMPTY** | **none** | 2 | no | S4 `#sRSP` · S4 `#s9` |
| 71 | `src-wiretap` | Cal. Penal Code § 637.2(a)(1), (c); 18 U.S.C. § 2511 | **EMPTY** | **none** | 2 | no | S3 `#s12`×2 |
| 72 | `src-0din-gemini` | Phishing for Gemini | **EMPTY** | **none** | 1 | no | S4 `#s9` |
| 73 | `src-anthropic-injection` | Mitigating the risk of prompt injections in browser use | **EMPTY** | 2026-09-27 | 1 | yes | S4 `#s9` |
| 74 | `src-anthropic-threat-aug25` | Detecting and countering misuse of AI: August 2025 | **EMPTY** | 2026-09-27 | 1 | no | S4 `#s9` |
| 75 | `src-ascii-smuggling` | Microsoft Copilot: from prompt injection to data exfiltration of your emails | **EMPTY** | **none** | 1 | no | S4 `#s9` |
| 76 | `src-beta` | Available beta and research preview features | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 77 | `src-charlotin` | AI Hallucination Cases database | **EMPTY** | 2026-06 *(month only)* | 1 | yes | S2 `#s10` |
| 78 | `src-deloitte` | Generative-AI fraud projection | **EMPTY** | **none** | 1 | no | S4 `#s9` |
| 79 | `src-directory` | Browse skills, connectors, and plugins in one directory | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 80 | `src-drift` | Cybersecurity alert: Salesloft Drift AI supply chain attack | **EMPTY** | **none** | 1 | no | S4 `#s9` |
| 81 | `src-features` | Features and capabilities collection index | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s7` |
| 82 | `src-gemini-api-terms` | Gemini API Additional Terms of Service | **EMPTY** | **none** | 1 | yes | S4 `#(footer)` |
| 83 | `src-gemini-ratelimits` | Rate limits | **EMPTY** | **none** | 1 | yes | S4 `#(footer)` |
| 84 | `src-google-ptcf` | Gemini for Workspace: Prompting guide 101 | **EMPTY** | **none** | 1 | no | S2 `#s6` |
| 85 | `src-ibm-breach-2026` | IBM study: one in four malicious breaches are AI-enabled, costing companies $6 million on average | **EMPTY** | **none** | 1 | yes | S4 `#s9` |
| 86 | `src-kalai` | Why language models hallucinate | **EMPTY** | 2025-05-11 | 1 | no | S1 `#s9` |
| 87 | `src-lee-cognitive` | The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers | **EMPTY** | **none** | 1 | no | S3 `#s15` |
| 88 | `src-openai-pricing` | API pricing | **EMPTY** | **none** | 1 | yes | S2 `#s5` |
| 89 | `src-rohrer` | Interleaved practice improves mathematics learning | **EMPTY** | 2026-08-29 | 1 | no | S1 `#s13` |
| 90 | `src-routing` | Why Claude switched models in your conversation with Fable 5 | **EMPTY** | 2026-08-20 | 1 | yes | S0.1 `#s2` |
| 91 | `src-sampling` | LLM sampling visualiser | **EMPTY** | **none** | 1 | no | S1 `#s8` |
| 92 | `src-sec-withdraw` | Withdrawal of proposed regulatory actions, including Conflicts of Interest Associated with the Use of Predictive Data Analytics (S7-12-23) | **EMPTY** | **none** | 1 | no | S4 `#s1` |
| 93 | `src-sg-deepfake-2026` | Fake Zoom call with PM Wong: police release deepfake footage of scam that caused victim to hand over S$4.9 million | **EMPTY** | **none** | 1 | no | S4 `#s9` |
| 94 | `src-trailofbits-image` | Weaponizing image scaling against production AI systems | **EMPTY** | **none** | 1 | no | S4 `#s9` |
| 95 | `src-uae-voice` | Fraudsters cloned company director's voice in $35 million heist, police find | **EMPTY** | **none** | 1 | no | S4 `#s9` |
| 96 | `src-unit42-ipi` | Fooling AI agents: web-based indirect prompt injection observed in the wild | **EMPTY** | **none** | 1 | no | S4 `#s9` |
| 97 | `src-zheng-persona` | When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models | **EMPTY** | **none** | 1 | no | S2 `#s6` |
| 98 | `src-anthropic-aup` | Usage Policy | **EMPTY** | 2026-09-27 | 0 | yes | *listed by no lesson, cited by none* |
| 99 | `src-anthropic-fluency` | AI fluency: Frameworks and foundations | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 100 | `src-davidson` | Estate of William M. Davidson v. Commissioner, T.C. Docket No. 13748-13 | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 101 | `src-fbi-ic3-2024` | FBI releases annual Internet Crime Report: 2024 | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 102 | `src-ferrari` | Ferrari deepfake attempt: scammer foiled by security question about CEO Benedetto Vigna | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 103 | `src-forcedleak` | ForcedLeak: AI agent risks exposed in Salesforce Agentforce | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 104 | `src-gartner` | Survey of 302 security leaders | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 105 | `src-hallowell` | Hallowell v. Commissioner, T.C. Memo. 2023-217 | *n/a* | *n/a* | 0 | no | *listed by S4, cited by none* |
| 106 | `src-irc` | Internal Revenue Code §§ 671, 675, 2036, 2702, 7520 | **EMPTY** | *n/a* | 0 | no | *listed by S2, cited by none* |
| 107 | `src-kessler` | Kessler v. Commissioner, 152 T.C. 88 (2019) | *n/a* | *n/a* | 0 | no | *listed by S2, cited by none* |
| 108 | `src-kitces-advisortech` | The Latest in Financial AdvisorTech — AdvisorTech columns, October 2025, November 2025 and August 2026 | **EMPTY** | **none** | 0 | yes | *listed by no lesson, cited by none* |
| 109 | `src-laplace` | A philosophical essay on probabilities | **EMPTY** | *n/a* | 0 | no | *listed by S2, cited by none* |
| 110 | `src-morningstar` | AI for advisors: Enhancing client conversations | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 111 | `src-nikkei-papers` | 'Positive review only': researchers hide AI prompts in papers | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 112 | `src-rr200464` | Rev. Rul. 2004-64, 2004-2 C.B. 7 (2004-27 I.R.B. 9) | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 113 | `src-rr8513` | Rev. Rul. 85-13, 1985-1 C.B. 184 | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 114 | `src-safebreach-gemini` | Invitation is all you need: hacking Gemini | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 115 | `src-sg-deepfake-2025` | Finance director in Singapore transfers S$670,000 to scammers who used deepfake to impersonate company's executives | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 116 | `src-surfshark` | 2026 deepfake-loss analysis | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 117 | `src-uk-voice` | A voice deepfake was used to scam a CEO out of $243,000 | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |
| 118 | `src-vectara` | Introducing the next generation of Vectara's hallucination leaderboard | **EMPTY** | **none** | 0 | yes | *listed by no lesson, cited by none* |
| 119 | `src-woelbing` | Estate of Donald Woelbing v. Commissioner, T.C. Docket No. 30261-13, and Estate of Marion Woelbing v. Commissioner, T.C. Docket No. 30260-13 | **EMPTY** | **none** | 0 | no | *listed by S2, cited by none* |
| 120 | `src-zhao` | Invisible image watermarks are provably removable using generative AI | **EMPTY** | **none** | 0 | no | *listed by no lesson, cited by none* |


---

## Links, for the reading

| Key | Link |
|---|---|
| `src-case` | *not applicable* |
| `src-regsp` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-claude-marks` | https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content |
| `src-wolfram` | https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/ |
| `src-anthropic-terms` | https://www.anthropic.com/legal/commercial-terms |
| `src-magesh` | https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/ |
| `src-anthropic-dpa` | https://www.anthropic.com/legal/data-processing-addendum |
| `src-effort` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-memory` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-tools3` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-pricing` | https://platform.claude.com/docs/en/about-claude/pricing |
| `src-finra2409` | https://www.finra.org/rules-guidance/notices/24-09 |
| `src-kitces-notetakers` | https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/ |
| `src-aa` | https://artificialanalysis.ai/models |
| `src-anthropic-ctx` | https://www.anthropic.com/engineering/contextual-retrieval |
| `src-ctxwindow` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-cve` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-finra2026` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-anthropic-retention` | https://platform.claude.com/docs/en/manage-claude/api-and-data-retention |
| `src-arup` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-claude-pricing` | https://claude.com/pricing |
| `src-models` | https://platform.claude.com/docs/en/models/overview |
| `src-secpri` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-synthid-text` | https://ai.google.dev/responsible/docs/safeguards/synthid |
| `src-api-messages` | https://platform.claude.com/docs/en/api/messages |
| `src-cfp-genai` | https://www.cfp.net/ethics/compliance-resources/2025/02/generative-ai-ethics-guide |
| `src-context-windows` | https://platform.claude.com/docs/en/build-with-claude/context-windows |
| `src-finra-inj` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-il-pipa` | https://ilga.gov/documents/legislation/ilcs/documents/081505300K10.htm |
| `src-openai-data` | https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance |
| `src-sec-ai` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-synthid` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-agent-skills` | https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview |
| `src-anthropic-agents` | https://www.anthropic.com/engineering/building-effective-agents |
| `src-anthropic-threat` | https://www.anthropic.com/threat-intelligence-report-september-2026 |
| `src-daly` | https://www.sec.gov/newsroom/speeches-statements/daly-020326-artificial-intelligence-future-investment-management-remarks-investment-company-institute-ici-winter |
| `src-gemini-privacy` | https://support.google.com/gemini/answer/13594961 |
| `src-kitces-productivity` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-ms-copilot` | https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot |
| `src-personalization` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-plugins` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-skills` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-state-breach` | https://privacyrights.org/resources-tools/reports/data-breach-notification-laws-50-state-survey-2026-edition |
| `src-advisers-204-2` | https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.204-2 |
| `src-advisers-206-4-7` | https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.206(4)-7 |
| `src-advisers-fiduciary` | https://www.sec.gov/rules-regulations/2019/06/commission-interpretation-regarding-standard-conduct-investment-advisers |
| `src-anthropic-certs` | https://support.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained |
| `src-anthropic-context` | https://platform.claude.com/docs/en/build-with-claude/context-windows |
| `src-anthropic-ctx-eng` | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| `src-anthropic-mcp` | https://www.anthropic.com/news/model-context-protocol |
| `src-anthropic-thinking` | https://www.anthropic.com/news/claude-3-7-sonnet |
| `src-capitalone` | https://www.capitalone.com/digital/facts2019/ |
| `src-cfp-code` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-chatgpt-index` | https://techcrunch.com/2025/07/31/your-public-chatgpt-queries-are-getting-indexed-by-google-and-other-search-engines |
| `src-claude-memory` | https://claude.com/blog/memory |
| `src-dahl-fictions` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-deepseek` | https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak |
| `src-equifax` | https://www.gao.gov/products/gao-18-559 |
| `src-eu-ai-act` | https://eur-lex.europa.eu/eli/reg/2024/1689/oj |
| `src-fbi-ic3-2025` | https://www.fbi.gov/news/press-releases/cryptocurrency-and-ai-scams-bilk-americans-of-billions |
| `src-finra-4511` | https://www.finra.org/rules-guidance/rulebooks/finra-rules/4511 |
| `src-gemini-workspace` | https://support.google.com/a/answer/15706919 |
| `src-gtig-ai` | https://services.google.com/fh/files/misc/advances-in-threat-actor-usage-of-ai-tools-en.pdf |
| `src-iskowitz` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-joa-prompt` | https://www.journalofaccountancy.com/newsletters/a-a-focus/writing-an-effective-ai-prompt-for-an-audit/ |
| `src-meta-feed` | https://www.tomsguide.com/computing/online-security/meta-ais-discover-feed-is-full-of-revealing-personal-info-heres-how-to-protect-your-privacy |
| `src-ms-copilot-edp` | https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection |
| `src-owasp` | https://owasp.org/www-project-top-10-for-large-language-model-applications/ |
| `src-t3-survey` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-uber-doj` | https://www.justice.gov/usao-ndca/pr/former-chief-security-officer-uber-sentenced-three-years-probation-covering-data |
| `src-wiretap` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-0din-gemini` | https://0din.ai/blog/phishing-for-gemini |
| `src-anthropic-injection` | https://www.anthropic.com/news/prompt-injection-defenses |
| `src-anthropic-threat-aug25` | https://www.anthropic.com/news/detecting-countering-misuse-aug-2025 |
| `src-ascii-smuggling` | https://embracethered.com/blog/posts/2024/m365-copilot-prompt-injection-tool-invocation-and-data-exfil-using-ascii-smuggling/ |
| `src-beta` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-charlotin` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-deloitte` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-directory` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-drift` | https://www.finra.org/rules-guidance/guidance/salesloft-drift-AI-supply-chain-attack |
| `src-features` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-gemini-api-terms` | https://ai.google.dev/gemini-api/terms |
| `src-gemini-ratelimits` | https://ai.google.dev/gemini-api/docs/rate-limits |
| `src-google-ptcf` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-ibm-breach-2026` | https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled,-costing-companies-6-million-on-average |
| `src-kalai` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-lee-cognitive` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-openai-pricing` | https://openai.com/api/pricing/ |
| `src-rohrer` | https://doi.org/10.1037/edu0000001 |
| `src-routing` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-sampling` | https://artefact2.github.io/llm-sampling/ |
| `src-sec-withdraw` | https://www.sec.gov/rules-regulations/2025/06/s7-12-23 |
| `src-sg-deepfake-2026` | https://mothership.sg/2026/05/pm-wong-zoom-deepfake-scam/ |
| `src-trailofbits-image` | https://blog.trailofbits.com/2025/08/21/weaponizing-image-scaling-against-production-ai-systems/ |
| `src-uae-voice` | https://www.forbes.com/sites/thomasbrewster/2021/10/14/huge-bank-fraud-uses-deep-fake-voice-tech-to-steal-millions/ |
| `src-unit42-ipi` | https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/ |
| `src-zheng-persona` | https://aclanthology.org/2024.findings-emnlp.888/ |
| `src-anthropic-aup` | https://www.anthropic.com/legal/aup |
| `src-anthropic-fluency` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-davidson` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-fbi-ic3-2024` | https://www.fbi.gov/news/press-releases/fbi-releases-annual-internet-crime-report |
| `src-ferrari` | https://fortune.com/2024/07/27/ferrari-deepfake-attempt-scammer-security-question-ceo-benedetto-vigna-cybersecurity-ai |
| `src-forcedleak` | https://noma.security/blog/forcedleak-agent-risks-exposed-in-salesforce-agentforce |
| `src-gartner` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-hallowell` | *not applicable* |
| `src-irc` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-kessler` | *not applicable* |
| `src-kitces-advisortech` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-laplace` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-morningstar` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-nikkei-papers` | https://asia.nikkei.com/business/technology/artificial-intelligence/positive-review-only-researchers-hide-ai-prompts-in-papers |
| `src-rr200464` | https://www.irs.gov/irb/2004-27_IRB |
| `src-rr8513` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-safebreach-gemini` | https://www.safebreach.com/blog/invitation-is-all-you-need-hacking-gemini/ |
| `src-sg-deepfake-2025` | https://mothership.sg/2025/04/finance-director-scammed-deepfake/ |
| `src-surfshark` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-uk-voice` | https://www.forbes.com/sites/jessedamiani/2019/09/03/a-voice-deepfake-was-used-to-scam-a-ceo-out-of-243000/ |
| `src-vectara` | https://www.vectara.com/blog/introducing-the-next-generation-of-vectaras-hallucination-leaderboard |
| `src-woelbing` | **[UNVERIFIED, needs source]** — find the canonical page before verifying |
| `src-zhao` | https://arxiv.org/abs/2306.01953 |


---

## Retrieval notes

What happened the last time somebody tried, and what it does and does not say
about the source.

### `src-claude-marks`

Opened directly on 2026-09-25 and again, in full, on 2026-09-27, together with the Claude Content Checker page at claude.com/check-content. Quotations below are the pages' own words.

### `src-anthropic-terms`

Opened directly on 2026-09-27: the Commercial Terms (effective 17 June 2025), the Consumer Terms (effective 8 October 2025), the Privacy Policy (effective 10 September 2026) and the 28 August 2025 news post on the consumer training change. The consumer-side retention figures (five years if training is allowed, 30 days if not) are stated in the news post and on the Claude Code data-usage page; privacy.claude.com itself could not be opened. Earlier retrieval 2026-08-14.

### `src-anthropic-dpa`

Opened directly on 2026-09-27, three reads, consistent. Incorporated by reference into the Commercial Terms (Section C, Data Privacy). Quotations in scope are the document's own words.

### `src-pricing`

Fetched in full 2026-08-25 for Phase 3.5, and again in full 2026-09-13 for the session-2 retrieval bridge; the table is unchanged for Sonnet 5, Opus 5 and Fable 5, and the FAQ gives the rule of thumb of one token to about 0.75 words. PULL-002 (session-2) carried a PARTIAL DATE, "2026-08", until the 2026-09-13 pull replaced it.

### `src-aa`

PULL-002 (session-2) carries a PARTIAL DATE, "2026-08". A month cannot be ordered against a day, which is where this record's version incoherence hid. The ordering rule now reports every partial date as a precondition failure AND orders it at its earliest possible day, so the v4.1.1 -> v4.1 regression against PULL-003 still fires.

### `src-anthropic-retention`

Opened directly on 2026-09-27, with the Help Center articles on custom retention for Enterprise plans (10440198) and on retention for covered models (15425996, effective 9 June 2026) and the Claude Code data-usage page. Two Anthropic pages differ on the Enterprise chat default (30 days standard against "indefinitely unless a custom period is set"); the lesson states only what both agree on.

### `src-claude-pricing`

Opened directly on 2026-09-27, with the Help Center articles on the Max plan (11049741) and on Enterprise seats (13393991) and the Claude Enterprise solutions page. The Max 20x figure is on the Help Center article, not the pricing page. Prices move without notice.

### `src-models`

Re-fetched 2026-09-13 at the page's current address for session-2 §01. Every Claude model ID is a pinned snapshot, including the dateless IDs from the 4.6 generation on; Fable 5.1 is the current flagship at $10 / $50 per MTok and Fable 5 is listed as a legacy model, still available.

### `src-secpri`

sec.gov is egress-blocked from the build (2026-09-27). §VII's contents in scope are as reported by several consistent law-firm and compliance-firm summaries of the 17 November 2025 release; the record's H stands on the earlier verification of the AI and Regulation S-P focus, and the §05 use of the polymorphic-malware line is chipped M on the page for that reason.

### `src-synthid-text`

The 2025-04-09 in `published` is the page's OWN last-updated stamp, in UTC, not a publication date; it is a living documentation page and the stamp is the only date it carries. RETRIEVED OUTSIDE THIS BUILD ENVIRONMENT: the instructor's analyst surface loaded the page on 2026-08-25 and supplied the substantiations recorded in `scope`. This environment answers 403 on CONNECT for the host, so no generator here has read the page and none can re-check it. A retrieval is not a reading, so `last_verified` is EMPTY and stays that way until a human attests at a terminal.

### `src-api-messages`

Fetched 2026-09-13 for session-2 §01. The temperature parameter is marked deprecated for models released after Claude Opus 4.6, with 1.0 accepted for backwards compatibility and other values rejected with a 400 error; it defaults to 1.0 and ranges 0.0 to 1.0; the page states that even with temperature of 0.0 the results will not be fully deterministic.

### `src-cfp-genai`

NOT RETRIEVED. cfp.net and the press-release hosts are egress-blocked from this build environment (2026-09-25). The title, the February 2025 date and the substance in scope come from search-engine summaries of the guide and of CFP Board's press release of 25 February 2025, which is why the confidence is M. The instructor holds the PDF (instructor-notes/session-3.md, the 09-21 night) and can raise it by reading the page.

### `src-context-windows`

Fetched in full 2026-09-13 for the session-2 retrieval bridge. Three sentences carry the lesson's claims. On contents, everything in the request counts toward the context window, the system prompt, every message including tool results, images and documents, and the tool definitions. On accumulation, each turn's input phase contains all previous conversation history plus the current user message, and previous turns are preserved completely. On degradation, as token count grows, accuracy and recall degrade, a phenomenon the page names context rot. The page adds that chat interfaces such as claude.ai can manage the window on a rolling first-in, first-out basis.

### `src-il-pipa`

NOT RETRIEVED. ilga.gov is egress-blocked from this build environment (2026-09-27). The statutory wording in scope appears in search snippets of the statute and of Justia, the Illinois Attorney General's guidance page and a Hogan Lovells summary, all consistent.

### `src-openai-data`

NOT RETRIEVED. help.openai.com and openai.com are egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this article and of "Chat and file retention in ChatGPT" (article 8983778), which is why the confidence is M. Read both pages before teaching the numbers.

### `src-synthid`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: the Google DeepMind host is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work. STILL OPEN AFTER 2026-08-25, and this record now says which references are open rather than leaving them to be counted by hand. `src-synthid-text` was added that day for a page that WAS retrieved, and it closed exactly one of the eleven references — session-4:1476, the factual-responses claim. The other ten remain on this key and this page has still never been loaded: :1412 and :1416 are C2PA metadata and soft-binding claims that belong to the C2PA specification rather than to Google; :1425 and :1440 are the tournament-sampling mechanism, whose real authority is the Nature paper the retrieved page names and which no build has read either; :1443 and :1457 are image, video and audio robustness, which the retrieved page does not cover at all; :1460 is the adoption-figure paragraph, whose second sentence asserts what a page nobody has loaded currently says and now carries [UNCONFIRMED]; :1493 is the formatter-erases-the-slack claim; :1500 chips a sentence whose sources are Zhao, two arXiv preprints and Christ. Registered in docs/deferred-work.md as session-4 work.

### `src-agent-skills`

Opened directly on 2026-09-27.

### `src-anthropic-agents`

Opened directly on 2026-09-27, with the Agent SDK post of 29 September 2025 on claude.com and the tool-use documentation, whose section on the agentic loop was also opened. No source opened uses the phrase "loop engineering"; Anthropic's words are "in a loop", "the agent loop" and "the agentic loop".

### `src-anthropic-threat`

Retrieved 2026-09-27 through a summarising fetch, not read whole. The passage the lesson rests on was returned verbatim: "If their monitoring AI agents identified that any of their deployed malware was detected by a security product, agents would then set about the process of autonomously modifying and rebuilding the malware to evade the existing detections." Read the report before teaching the case.

### `src-daly`

The link is the sec.gov address the search engine returned on 2026-09-27 for this title, date and venue (Manalapan, Florida, delivered virtually). sec.gov is egress-blocked from the build, so the page itself was not re-read; the scope below stands on the earlier verification.

### `src-gemini-privacy`

NOT RETRIEVED. support.google.com is egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this hub and of "Manage and delete your activity in Gemini Apps" (answer 13278892), which is why the confidence is M. Read both pages before teaching the numbers.

### `src-ms-copilot`

NOT RETRIEVED. support.microsoft.com is egress-blocked from this build environment (2026-09-27). The figures in scope come from search-engine summaries of this FAQ and of "Conversation history in Microsoft Copilot", which is why the confidence is M. Read both pages before teaching the numbers.

### `src-state-breach`

NOT RETRIEVED. privacyrights.org is egress-blocked from this build environment (2026-09-27), and the day counts in scope come from aggregated search snippets of several survey sites rather than from each statute, which is why the confidence is M.

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

### `src-capitalone`

NOT RETRIEVED. capitalone.com is egress-blocked from this build environment (2026-09-27). Dates and figures consistent across search snippets of Capital One's page, CBS News and SiliconANGLE (August 2020, the $80 million OCC penalty), Banking Dive and the Department of Justice's case page.

### `src-cfp-code`

NOT RETRIEVED. cfp.net is egress-blocked from this build environment (2026-09-25). Standard A.14's name and its reasonable-care duty are carried from the instructor's own run sheet for the 2026-09-21 session, which names Standards A.9 and A.14 at high confidence from the Code itself; the wording on the session-4 page is a paraphrase, not a quotation, and the chip is M until the page is read.

### `src-chatgpt-index`

NOT RETRIEVED. techcrunch.com is egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of this article and of Search Engine Land's and Search Engine Journal's reporting of the same days, which is why the confidence is M.

### `src-claude-memory`

Opened directly on 2026-09-27, with the Help Center article on chat search and memory (11817273), which states that memory is saved as a set of topics as you chat.

### `src-deepseek`

NOT RETRIEVED. wiz.io is egress-blocked from this build environment (2026-09-27). The facts in scope come from search-engine summaries of the post and of the reporting that cited it (TechCrunch, The Register, SecurityWeek, 30 January 2025), which is why the confidence is M.

### `src-equifax`

NOT RETRIEVED. gao.gov is egress-blocked from this build environment (2026-09-27). The dates and figures in scope are consistent across search snippets of the GAO report, the FTC's July 2019 settlement release, the CFPB's release, the House Oversight Committee's December 2018 report and EPIC.

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

### `src-joa-prompt`

NOT RETRIEVED. journalofaccountancy.com is egress-blocked from this build environment (2026-09-27). The syllabus lists this reading as "Writing an Effective AI Prompt for an Audit Trail"; the page's own title, as the search engine returns it, is the one recorded here, and the November 2025 date is from the same summary. The article was not read, so the lesson claims nothing about what it says: it names it as the assigned reading behind the record block and no more.

### `src-meta-feed`

NOT RETRIEVED. The article's own headline uses a dash where this record uses a colon, so that the injected footer adds no em dash to the lesson. The facts in scope come from search-engine summaries of this article and of the Mozilla Foundation's campaign page on the same feed (June 2025), which is why the confidence is M. A stronger citation (the original reporting) is a review-list item.

### `src-ms-copilot-edp`

NOT RETRIEVED. learn.microsoft.com is egress-blocked from this build environment (2026-09-27). The substance in scope comes from search-engine summaries of the page, which is why the confidence is M.

### `src-owasp`

Fetch of the cited link ATTEMPTED 2026-08-25 and REFUSED before it reached the source: owasp.org and genai.owasp.org are both blocked by the build environment's egress policy (403 on CONNECT), so last_retrieved stays unresolved — the cited page itself was never loaded. A SURROGATE was reachable and was read: the GitHub repository backing that exact project page, fetched 2026-08-25. Reading a surrogate is not retrieving the source and no date is written for one.

### `src-uber-doj`

NOT RETRIEVED. justice.gov is egress-blocked from this build environment (2026-09-27). Consistent across search snippets of the DOJ release and of BakerHostetler, Norton Rose Fulbright, Arnold & Porter and SC Media.

### `src-0din-gemini`

NOT RETRIEVED. 0din.ai is egress-blocked from this build environment (2026-09-27). The mechanism is described consistently in search snippets of the disclosure's coverage and in Microsoft's Defender documentation on prompt-injection protection, which names white-on-white text and zero-size fonts among the techniques it scans for.

### `src-anthropic-injection`

Opened directly on 2026-09-27, with the Claude for Chrome pilot post on claude.com and the computer-use tool's security section in the platform docs.

### `src-anthropic-threat-aug25`

Opened directly on 2026-09-27. Cross-checked against Malwarebytes, Forrester and Halcyon, which report the demand range as $75,000 to $500,000. No payment figure is public.

### `src-ascii-smuggling`

NOT RETRIEVED. embracethered.com is egress-blocked from this build environment (2026-09-27). The technique was first shown by Riley Goodside on 11 January 2024; cross-checked against The Hacker News, SC Media, Cisco and Keysight, and Microsoft's fix in August 2024.

### `src-charlotin`

PARTIAL DATE. The day was never recorded. The pull captured a count the source itself dates "as of 9 June 2026" (session-2:1669) and the text entered the repo on 2026-08-15, so the retrieval falls in 2026-06-09..2026-06-30. Not narrowed further, and no day is invented.

### `src-drift`

NOT RETRIEVED. finra.org is egress-blocked from this build environment (2026-09-27). The incident is described consistently by AppOmni, WTW, TechRadar and Paubox (August and September 2025), citing Google Threat Intelligence's count of more than 700 affected organisations.

### `src-gemini-api-terms`

NOT RETRIEVED. ai.google.dev is egress-blocked from this build environment (2026-09-27). The wording in scope appears verbatim in search snippets of the page itself and in two independent mirrors of the terms (Simon Willison, October 2024; ScanCode LicenseDB, 2025). Read the page before class; Google changes it.

### `src-gemini-ratelimits`

NOT RETRIEVED. ai.google.dev is egress-blocked from this build environment (2026-09-27), and the secondary sources disagree (250 requests a day for an older flash model against about 20 for the newer ones, after Google cut free quotas in December 2025 and moved to per-project limits). No number is printed on the page.

### `src-ibm-breach-2026`

NOT RETRIEVED. newsroom.ibm.com is egress-blocked from this build environment (2026-09-27). Figures consistent across search snippets of the IBM release, Infosecurity Magazine, Security Boulevard, ASIS Security Management and Cybersecurity Dive. Supersedes the 2025 edition's $4.44 million and $10.22 million.

### `src-openai-pricing`

The GPT-5.6 Sol, Terra and Luna rates in session-2 §02 entered the repository with the 2026-08 pull and no retrieval was recorded for them. openai.com was egress-blocked on 2026-09-12 when this record was written, so the rates are carried at M until the DW-081 re-pull records a retrieval.

### `src-sec-withdraw`

NOT READ FROM THE SEC. The withdrawal on 12 June 2025 of fourteen proposals, the predictive data analytics proposal of August 2023 among them, is reported consistently by several law-firm client alerts reached through search on 2026-09-25; the SEC page itself was not loaded from this build. M until it is.

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

### `src-fbi-ic3-2024`

NOT RETRIEVED. fbi.gov is egress-blocked from this build environment (2026-09-27). Figures consistent across search snippets of the FBI press release, CyberScoop, Cybersecurity Dive, SecureWorld and Nacha.

### `src-ferrari`

NOT RETRIEVED. fortune.com is egress-blocked from this build environment (2026-09-27). First reported by Bloomberg on 26 July 2024; cross-checked against MIT Sloan Management Review, Jalopnik and the AI Incident Database.

### `src-forcedleak`

NOT RETRIEVED. noma.security is egress-blocked from this build environment (2026-09-27). Cross-checked against The Hacker News, Dark Reading and Security Affairs (September 2025), consistent on the CVSS score, the mechanism and the $5 domain.

### `src-kitces-advisortech`

Fetch ATTEMPTED 2026-08-25 and REFUSED before it reached the source: www.kitces.com is not permitted by the build environment's egress policy (HTTP 403 on CONNECT). This is a statement about this environment, NOT about the source — the source is not known to have moved or gone. No date is written, because no retrieval happened. Listed in docs/source-verification-queue.md as instructor work.

### `src-nikkei-papers`

NOT RETRIEVED. asia.nikkei.com is egress-blocked from this build environment (2026-09-27). Cross-checked against the arXiv follow-up study (2507.06185, which found 18 papers), Smithsonian Magazine and Duke University's analysis of about 200,000 CVs.

### `src-safebreach-gemini`

NOT RETRIEVED. safebreach.com is egress-blocked from this build environment (2026-09-27). Presented at Black Hat USA in August 2025 after disclosure to Google on 22 February 2025; cross-checked against The Register, TechRepublic and Bitdefender.

### `src-sg-deepfake-2025`

NOT RETRIEVED. mothership.sg and police.gov.sg are egress-blocked from this build environment (2026-09-27). The primary source is the Singapore Police Force news release of 7 April 2025 on the joint recovery with the Hong Kong Police Force; cross-checked against HRD Asia, Fortune (25 April 2025) and The Straits Times.

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

### `src-pricing` — 8 reference(s)

2026-08-25. The page now states that Sonnet 5's $2 / $10 introductory pricing "is now the standard price" and that "the previously scheduled increase to $3/$15 per million input/output tokens on September 1, 2026 will not occur". The 2026-07-28 pull recorded the increase as scheduled. DEPENDENT LESSON ELEMENTS, RESOLVED 2026-08-25 in Phase 3.6: session-1 §10's second Sonnet 5 table row and its "rises 50% tomorrow" note both carried the cancelled rise and are gone; the surviving row states $2 / $10 / $0.20 with no date on it. Three script arrays carried the same cancelled figure and were corrected with it — TIERS (§03 cost boxes), PATHS (§06 practice cost) and DPT (§06 document pass), the last two of which also printed the label "Sonnet 5 (from 1 Sep)" on screen. session-2 §02's "Sonnet 5 lists at $2 in / $10 out per million tokens" was UNAFFECTED and is the standing price. Phase 3.5 flagged rather than resolved; Phase 3.6 resolved on instruction.

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
| `src-synthid` | 4 | *link unknown* |
| `src-owasp` | 2 | owasp.org |
| `src-kitces-advisortech` | 0 | *link unknown* |
| `src-vectara` | 0 | www.vectara.com |
