# BIBLIOGRAPHY.md

**Generated from `SOURCES.md` by `scripts/build-bibliography.mjs`. Do not edit:
the next run overwrites it.** To change an entry, change `SOURCES.md`. To change
a reference count, change where the corpus cites the source — the counts here are
read off the chips, never typed.

**67 works, 212 references across 5 lessons.** 48 are
cited by at least one claim; 19 are listed by a lesson without carrying a
chip, and the reason each is exempt — or is not — is in the second table.

**57 records carry at least one field this repository could not verify, and
every one of them is printed below as `[UNVERIFIED, needs source]` rather than omitted.** The
rendered footer in a lesson omits an unknown field, because a footer in which
thirty entries shout about a missing publisher helps nobody. This file is where a
reader comes for completeness, so here the gap is the point.


---

## Works cited

### Anthropic

**Pricing**  
`src-pricing` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Claude Platform Docs |
| Link | <https://platform.claude.com/docs/en/about-claude/pricing> |
| Published | *not applicable* |
| Last retrieved | 2026-09-13 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **8** |
| Cited in | S1 `#s5` · S1 `#s11` ×3 · S2 `#s0` · S2 `#s5` ×3 |

Per-token input and output rates by model, cache-hit and batch discounts.

### Anthropic

**Context windows**  
`src-context-windows` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Claude Platform Docs |
| Link | <https://platform.claude.com/docs/en/build-with-claude/context-windows> |
| Published | *not applicable* |
| Last retrieved | 2026-09-13 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **4** |
| Cited in | S2 `#s0` · S2 `#s3` · S3 `#sRag` ×2 |

What the context window contains, how turns accumulate, that all of it is counted as input, and the vendor's statement that accuracy and recall degrade as the token count grows. The page gives the direction of the degradation and no threshold, turn count or rate.

### Anthropic

**Messages API reference**  
`src-api-messages` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Claude Platform Docs |
| Link | <https://platform.claude.com/docs/en/api/messages> |
| Published | *not applicable* |
| Last retrieved | 2026-09-13 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **3** |
| Cited in | S2 `#s3` ×2 · S4 `#sWS` |

The temperature parameter's status on current models and the vendor's statement that a setting of zero is not fully deterministic. The page gives the fact, not the mechanism.

### Anthropic

**Contextual retrieval in AI systems**  
`src-anthropic-ctx` · evidence

| | |
|---|---|
| Author | Anthropic |
| Publisher | Anthropic Engineering |
| Link | <https://www.anthropic.com/engineering/contextual-retrieval> |
| Published | 2024-09-19 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **6** |
| Cited in | S3 `#sRag` · S3 `#s6` ×3 · S3 `#s7` · S3 `#s16` |

Top-20-chunk retrieval failure rates — baseline 5.7%, contextual embeddings 3.7%, plus contextual BM25 2.9%, plus reranking 1.9% — and the stated ~200,000-token threshold below which the whole corpus beats retrieval. Vendor-reported benchmarks on codebases, fiction and research papers, not advisory documents.

### Anthropic

**How Claude marks AI-generated content**  
`src-claude-marks` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Claude Help Center, support.claude.com article 16266773 |
| Link | <https://support.claude.com/en/articles/16266773-how-claude-marks-ai-generated-content> |
| Published | *not applicable* |
| Last retrieved | 2026-09-25 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **8** |
| Cited in | S4 `#s1` · S4 `#sW1` ×4 · S4 `#sW2` ×3 |

Supported Claude models launched on or after 2 August 2026 mark generated text with an imperceptible watermark, and earlier models are being added with all covered by 2 December 2026. Marks apply across the API, the Claude apps, Claude Code and wherever Claude is offered. Supported files Claude generates, such as PNG and JPEG images, carry signed C2PA provenance metadata. Detection is available only to organisations eligible under EU law, such as regulators, law enforcement, media, fact-checkers, researchers and educational organisations. A mark may persist through copying and some editing; heavy paraphrase or translation can make it undetectable. A detected mark signals that the content may have been processed by Claude and is not fully conclusive; the lack of a detected mark does not mean the content was not AI-generated or processed. The page, as read, describes no account or user identifier in the mark; that is a reading of an absence and is chipped M wherever it is used.

### Anthropic

**Privacy Center and Commercial Terms**  
`src-anthropic-terms` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Anthropic |
| Link | **[UNVERIFIED, needs source]** |
| Published | *not applicable* |
| Last retrieved | 2026-08-14 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **3** |
| Cited in | S4 `#s3` ×3 |

Consumer training defaults since 8 October 2025, five-year and 30-day retention, the commercial-side no-training default, Zero Data Retention eligibility, and Claude Code's local 30-day transcript retention. Every one of these is a term a vendor can change without notice.

### Anthropic

**Available beta and research preview features**  
`src-beta` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 14503520 |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2026-07-07 |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S0.1 `#s7` |

The label semantics and the eight-row table in section 7. H as of the article's own date and no later: this is the oldest source in the file and the one most likely to be wrong on screen.

### Anthropic

**How large is the context window on paid Claude plans?**  
`src-ctxwindow` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 8606394 |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **6** |
| Cited in | S0.1 `#s1` · S0.1 `#s4` ×4 · S0.1 `#s6` |

Window sizes by model, the 500K figure for the 4.x tier in chat and 200K outside those models, automatic context management and its code-execution requirement, project knowledge served by retrieval rather than loaded whole, and the statement that tools and connectors are token-intensive. That last item is a direction, not a magnitude: no first-party figure exists for what a connector costs and none is printed in the lesson.

### Anthropic

**Browse skills, connectors, and plugins in one directory**  
`src-directory` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 14328846 |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S0.1 `#s7` |

The Customize sidebar and its three tabs, install and enable semantics, directory-installed skills being view-only, and organisation sharing being off by default.

### Anthropic

**Change the model, effort, and thinking settings**  
`src-effort` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 8664678 |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **9** |
| Cited in | S0.1 `#s1` · S0.1 `#s2` · S0.1 `#s3` ×5 · S0.1 `#s9` · S4 `#sWS` |

The five effort levels, which models carry the effort selector, extended thinking not being disableable in Claude on Opus 5, xhigh requiring Opus 4.7 or newer, the rule that a change applies starting with Claude's next response, and admin role gating of models and effort levels.

### Anthropic

**Features and capabilities collection index**  
`src-features` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 18031719 |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S0.1 `#s7` |

The enumeration of surfaces beyond the chat box, and the attachment path.

### Anthropic

**Use Claude's chat search and memory to build on previous context**  
`src-memory` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 11817273 |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **10** |
| Cited in | S0.1 `#s0` · S0.1 `#s5` ×2 · S0.1 `#s6` ×2 · S0.1 `#s7` · S0.1 `#s9` · S0.1 `#s10` ×2 · S2 `#s3` |

The two live memory experiences and where each puts its toggles, real-time entry writing against a 24-hour synthesis, incognito chats on Enterprise and Team being included in standard data exports and following organisation retention, Owners retaining access for at least 30 days, Team plans having no organisation-level memory controls, the Enterprise org toggle and what disabling it deletes, past-chat search being paid-plans-only and appearing as tool calls, project-scoped search, Enterprise CMEK blocking past-chat search, pause against reset semantics, and deletion of a conversation not deleting the memory generated from it. Upgraded from M to H by the verified evidence annex, section A.

### Anthropic

**Models overview**  
`src-models` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Claude Platform Docs |
| Link | <https://platform.claude.com/docs/en/models/overview> |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-09-13 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **5** |
| Cited in | S0.1 `#s2` · S0.1 `#s3` ×2 · S0.1 `#s4` · S2 `#s3` |

The four current models, context window sizes (1M for Fable 5, Opus 5 and Sonnet 5; 200K for Haiku 4.5), which models carry adaptive against extended thinking, and effort defaults. Price per MTok and knowledge cutoffs are carried by this source but are quoted nowhere in the lesson, because no figure for either was recorded at verification.

### Anthropic

**Understanding Claude's personalization features**  
`src-personalization` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 10185728 |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **3** |
| Cited in | S0.1 `#s1` · S0.1 `#s6` · S2 `#s3` |

Profile instructions applying account-wide, project instructions, styles as a separate mechanism, and five projects on the free plan.

### Anthropic

**Use plugins in Claude**  
`src-plugins` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 13837440 |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **3** |
| Cited in | S0.1 `#s7` ×3 |

Plugins on all paid plans, a plugin bundling skills, connectors and sub-agents, availability in chat on the web, the Desktop Chat tab and Cowork, and hooks and sub-agents running only in Cowork and appearing greyed out in chat. Retrieved via search-result content rather than a full page fetch, then upgraded from UNVERIFIED to H by the verified evidence annex, section B. THREE ITEMS ARE STARRED THERE for re-confirmation at the page before they are taught: the built-in and GitHub-sourced marketplaces, the Customize action opening a Cowork task, and the Plugin Create plugin.

### Anthropic

**Why Claude switched models in your conversation with Fable 5**  
`src-routing` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 15363606 |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | L |
| **Total references** | **1** |
| Cited in | S0.1 `#s2` |

[UNVERIFIED, needs source]: the URL and title are confirmed from two other fetched pages, but the BODY OF THIS ARTICLE HAS NOT BEEN READ. Referenced once, solely to record that model switching inside a conversation is a documented behaviour with an article behind it. No mechanism, trigger or consequence is asserted from it anywhere. Fetch it before teaching anything about routing.

### Anthropic

**What are skills?**  
`src-skills` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 12512176 |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **3** |
| Cited in | S0.1 `#s6` · S0.1 `#s7` · S0.1 `#s9` |

Progressive disclosure of skill metadata against skill body, the code-execution requirement, the four skill types, and how skills differ from projects, MCP and instructions.

### Anthropic

**When should I use web search, extended thinking, and research?**  
`src-tools3` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | support.claude.com article 11095361 |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | 2026-08-20 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **9** |
| Cited in | S0.1 `#s1` · S0.1 `#s4` · S0.1 `#s5` ×3 · S0.1 `#s8` ×3 · S0.1 `#s9` |

One to two tool calls for web search on a factual query, five or more tool calls over one to three minutes for research, and the combined behaviour of the two.

### artefact2

**LLM sampling visualiser**  
`src-sampling` · evidence

| | |
|---|---|
| Author | artefact2 |
| Publisher | GitHub Pages |
| Link | <https://artefact2.github.io/llm-sampling/> |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S1 `#s8` |

The nine sampler controls and their interaction. Behaviour reimplemented in Appendix A5, not embedded; no code or asset is loaded from it.

### Artificial Analysis

**Artificial Analysis Intelligence Index and cost-per-task figures**  
`src-aa` · evidence · **moving target**

| | |
|---|---|
| Author | Artificial Analysis |
| Publisher | Artificial Analysis |
| Link | <https://artificialanalysis.ai/models> |
| Published | *not applicable* |
| Last retrieved | 2026-08-13 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **6** |
| Cited in | S1 `#s10` ×2 · S2 `#s5` ×3 · S4 `#sWS` |

A live leaderboard of capability index scores and cost per index task. Every figure drawn from it is a moving target and none of them is stable between terms.

### CFP Board

**Generative AI Ethics Guide: A Checklist for Upholding the Code and Standards**  
`src-cfp-genai` · evidence

| | |
|---|---|
| Author | CFP Board |
| Publisher | Certified Financial Planner Board of Standards, Inc. |
| Link | <https://www.cfp.net/ethics/compliance-resources/2025/02/generative-ai-ethics-guide> |
| Published | 2025-02 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **3** |
| Cited in | S4 `#s2` ×2 · S4 `#sAnon` |

A checklist for CFP professionals using generative AI: safeguard confidentiality, including using pseudonyms and anonymisation to remove confidential information before uploading; verify the accuracy of output; confirm the platform stores output in compliance with recordkeeping rules; confirm the vendor commits to notice of data breaches; and keep professional judgment with the professional.

### CFP Board

**Code of Ethics and Standards of Conduct**  
`src-cfp-code` · evidence

| | |
|---|---|
| Author | CFP Board |
| Publisher | Certified Financial Planner Board of Standards, Inc. |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2019 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s4` ×2 |

Standard A.14, Duties When Selecting, Using, or Recommending Technology: a CFP professional must exercise reasonable care and judgment when selecting, using or recommending technology in providing professional services. Standard A.9, Confidentiality and Privacy.

### Charlotin, D.

**AI Hallucination Cases database**  
`src-charlotin` · evidence · **moving target**

| | |
|---|---|
| Author | Charlotin, D. |
| Publisher | HEC Paris |
| Link | **[UNVERIFIED, needs source]** |
| Published | *not applicable* |
| Last retrieved | 2026-06 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S2 `#s10` |

A running count of court cases in which fabricated citations were filed. Cumulative counts as reported through a secondary tracker; the number only ever rises.

### Dahl, M., Magesh, V., Suzgun, M., & Ho, D. E.

**Large Legal Fictions: Profiling Legal Hallucinations in Large Language Models**  
`src-dahl-fictions` · evidence

| | |
|---|---|
| Author | Dahl, M., Magesh, V., Suzgun, M., & Ho, D. E. |
| Publisher | Stanford RegLab / Institute for Human-Centered AI |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2024 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S2 `#s10` ×2 |

General-purpose models over more than 800,000 verifiable legal questions, 58-88% hallucination; GPT-4 58%, GPT-3.5 69%, Llama 2 88%. Those three model names are a HISTORICAL FIXTURE: the finding is about those models and updating them to current names would falsify it.

### Daly, B., Director, Division of Investment Management

**Artificial Intelligence and the Future of Investment Management**  
`src-daly` · evidence

| | |
|---|---|
| Author | Daly, B., Director, Division of Investment Management |
| Publisher | ICI Winter Board Meeting |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2026-02-03 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#s1` ×2 |

NARROW, AND IT WAS READ TOO WIDELY. The speech states that the core questions remain open — whether an AI tool is marketing, advice or something requiring registration; who is responsible when output is wrong; how it is supervised — and asks for comment rather than announcing an answer. It says NOTHING about watermarking, SynthID, benchmark scores or model token counts, and it was chipped to four such claims before Phase 3 Part 1.

### Financial Industry Regulatory Authority

**Regulatory Notice 24-09**  
`src-finra2409` · evidence

| | |
|---|---|
| Author | Financial Industry Regulatory Authority |
| Publisher | FINRA |
| Link | <https://www.finra.org/rules-guidance/notices/24-09> |
| Published | 2024-06-27 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **4** |
| Cited in | S1 `#s14` ×2 · S4 `#s1` ×2 |

FINRA's position that existing rules reach generative AI and that supervision is not suspended by the technology. Creates no new obligations.

### Financial Industry Regulatory Authority

**2026 Annual Regulatory Oversight Report**  
`src-finra2026` · evidence

| | |
|---|---|
| Author | Financial Industry Regulatory Authority |
| Publisher | FINRA |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2025-12-09 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **4** |
| Cited in | S4 `#s1` ×2 · S4 `#s7` ×2 |

FINRA's first standalone generative-AI section: enterprise-level supervisory processes, controls for hallucinations, bias, cybersecurity and threat-actor use, ongoing human monitoring, and novel oversight for agents that can act or transact.

### Financial Industry Regulatory Authority

**Understanding Generative AI and Prompt Injection Fundamentals**  
`src-finra-inj` · evidence

| | |
|---|---|
| Author | Financial Industry Regulatory Authority |
| Publisher | FINRA |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2026-03-06 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#s5` ×2 |

A self-regulatory organisation publishing a standalone primer on an attack technique, which is the evidence for the claim that prompt injection has left the research literature.

### Financial Times

**Reporting on the Arup deepfake incident**  
`src-arup` · evidence

| | |
|---|---|
| Author | Financial Times |
| Publisher | Financial Times |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2024-05 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#s5` ×2 |

Approximately $25 million across 15 transfers. The one deepfake figure the course endorses putting in front of a client.

### Google

**Gemini for Workspace: Prompting guide 101**  
`src-google-ptcf` · evidence

| | |
|---|---|
| Author | Google |
| Publisher | Google |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2024 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S2 `#s6` |

The Persona-Task-Context-Format framework that session-2 §03 teaches and §04 scores against.

### Google

**SynthID: Tools for watermarking and detecting LLM-generated Text**  
`src-synthid-text` · evidence · **moving target**

| | |
|---|---|
| Author | Google |
| Publisher | Google (Responsible Generative AI Toolkit) |
| Link | <https://ai.google.dev/responsible/docs/safeguards/synthid> |
| Published | 2025-04-09 |
| Last retrieved | 2026-08-25 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **4** |
| Cited in | S4 `#sW1` ×2 · S4 `#sW2` ×2 |

TEXT WATERMARKING ONLY. The boundary is load-bearing, because the sibling record `src-synthid` is cited for image, video and audio claims that this page does not reach. What it substantiates, and nothing outside this list: detection is probabilistic and returns watermarked, not watermarked, or uncertain, against two tunable thresholds; the signal survives cropping, changing a few words, and mild paraphrase; detector confidence is greatly reduced by thorough rewriting or by translation; watermarking is less effective on factual responses, because there is less opportunity to augment generation without decreasing accuracy; detector exposure is a three-way deployer choice between fully-private, semi-private and public; the scheme is not designed to stop motivated adversaries; and the underlying technical description is Dathathri et al., Scalable watermarking for identifying large language model outputs, Nature 634:818-823 (2024), https://www.nature.com/articles/s41586-024-08025-4. IT SUBSTANTIATES NO ADOPTION FIGURE AND NO MARKET-SHARE CLAIM, which is the fact that keeps session-4's scale paragraph open rather than closing it.

### Iskowitz, C.

**AI notetakers and compliance in wealth management: What firms need to know**  
`src-iskowitz` · assigned_reading

| | |
|---|---|
| Author | Iskowitz, C. |
| Publisher | WealthTech Today |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2025-07-29 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S3 `#sPol` · S3 `#s16` |

The compliance framing around note-takers: that an AI summary is a firm record however it is stored, the three things examiners are reported to ask for (written AI-use policies, review of output before it becomes the record, vendor risk assessment), the human-review and edit-trail practices, the retention and high-stakes-meeting rules, and the ACA Group 2024 figure of 12%. A trade publication relaying the SEC and FINRA positions rather than quoting rule text, which is why the chip is M and why session-3 quotes no rule text from it.

### Kalai, A. T., Nachum, O., Vempala, S. S., & Zhang, E.

**Why language models hallucinate**  
`src-kalai` · assigned_reading

| | |
|---|---|
| Author | Kalai, A. T., Nachum, O., Vempala, S. S., & Zhang, E. |
| Publisher | arXiv:2509.04664, §1 and §1.2 |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2025 |
| Last retrieved | 2025-05-11 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S1 `#s9` |

Why a model guesses rather than abstains, and the two scoring rules. The model tested was DeepSeek-V3 on 11 May 2025 — a historical fixture; the finding is about that model on that date.

### Kitces.com

**Best AI notetakers for financial advisor meetings: Adoption, satisfaction, and trends**  
`src-kitces-notetakers` · evidence

| | |
|---|---|
| Author | Kitces.com |
| Publisher | Kitces.com |
| Link | <https://www.kitces.com/blog/ai-notetakers-client-meeting-for-financial-advisors-adoption-satisfaction-trends-research-productivity/> |
| Published | 2025-01-15 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **7** |
| Cited in | S3 `#s9` · S3 `#s10` ×2 · S3 `#s11` ×2 · S3 `#s16` ×2 |

Drawing on Kitces Research on Advisor Productivity, fielded autumn 2024: the greater-than-1:1 prep-and-follow-up ratio, the solo-versus-team adoption pattern, the UHNW drop-off, and the roughly fourfold rate for most-extensive against most-targeted plans.

### Kitces.com

**Kitces Research on Advisor Productivity**  
`src-kitces-productivity` · evidence

| | |
|---|---|
| Author | Kitces.com |
| Publisher | as summarised in The Latest in Financial AdvisorTech, Kitces.com |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2026-08 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **3** |
| Cited in | S2 `#s9` ×2 · S2 `#s12d` |

Approximately one hour of note, summary and follow-up work per two-hour client meeting. The reliance figure travelling with it is reported via Advisor360 and Kitces Research through a secondary aggregator and is directional only.

### Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N.

**The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers**  
`src-lee-cognitive` · evidence

| | |
|---|---|
| Author | Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N. |
| Publisher | Microsoft Research; CHI 2025 |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2025 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S3 `#s15` |

Characterised on the page ONLY by its title claim of self-reported reductions in cognitive effort. No claim is made about the size or direction of any measured effect on verification behaviour, and its full findings were not re-verified in this build.

### Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. D., & Ho, D. E.

**Hallucination-free? Assessing the reliability of leading AI legal research tools**  
`src-magesh` · evidence

| | |
|---|---|
| Author | Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. D., & Ho, D. E. |
| Publisher | Journal of Empirical Legal Studies 22(2), 216 |
| Link | <https://reglab.stanford.edu/publications/hallucination-free-assessing-the-reliability-of-leading-ai-legal-research-tools/> |
| Published | 2025 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **11** |
| Cited in | S2 `#s10` ×3 · S3 `#s6` ×2 · S3 `#s15` · S3 `#s16` ×2 · S4 `#s6` ×3 |

Over 200 preregistered legal queries, expert hand-scored, against Lexis+ AI, Westlaw AI-Assisted Research and GPT-4. Tools tested May 2024 — a historical fixture. The measured rates belong to the tools as they were on that date and must never be "updated".

### OpenAI

**API pricing**  
`src-openai-pricing` · evidence · **moving target**

| | |
|---|---|
| Author | OpenAI |
| Publisher | OpenAI Platform |
| Link | <https://openai.com/api/pricing/> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S2 `#s5` |

Per-token input and output rates for the GPT-5.6 Sol, Terra and Luna tiers, as carried in session-2's MODELS array.

### Rohrer, D., Dedrick, R. F., & Stershic, S.

**Interleaved practice improves mathematics learning**  
`src-rohrer` · evidence

| | |
|---|---|
| Author | Rohrer, D., Dedrick, R. F., & Stershic, S. |
| Publisher | Journal of Educational Psychology, 107(3), 900–908 |
| Link | <https://doi.org/10.1037/edu0000001> |
| Published | 2015 |
| Last retrieved | 2026-08-29 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S1 `#s13` |

Cited ONLY for the design claim that interleaving categories during classification practice beats blocking them, which is what the section 08 deck order does. Bibliographic identity confirmed 2026-08-29 against three independent listings — the ERIC index record EJ1071568, the publisher's abstract page for doi 10.1037/edu0000001, and the author's own publication list at uweb.cas.usf.edu/~drohrer, which hosts the full text. The full text was not pulled into this build environment, so no figure or effect size from it appears anywhere in the corpus.

### State of California; United States Congress

**Cal. Penal Code § 637.2(a)(1), (c); 18 U.S.C. § 2511**  
`src-wiretap` · evidence

| | |
|---|---|
| Author | State of California; United States Congress |
| Publisher | Statutory text |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S3 `#s12` ×2 |

The two-party consent exposure behind the recording-consent section: the California private right of action and the federal wiretap statute.

### T3 / Inside Information

**Software Survey 2026**  
`src-t3-survey` · evidence

| | |
|---|---|
| Author | T3 / Inside Information |
| Publisher | as summarised in Kitces.com Weekend Reading, March 2026 |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2026-03 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S2 `#s9` · S2 `#s12d` |

n = 2,906 advisors, 95% at fee-only RIA or dually registered firms. 52.2% using AI search and generative language, 42.9% using AI notetaking.

### The Cole household

**The Cole household**  
`src-case` · case

| | |
|---|---|
| Author | *not applicable* |
| Publisher | Constructed for this course as a classroom anchor, BUS ADM X433.4 |
| Link | *not applicable* |
| Published | *not applicable* |
| Last retrieved | *not applicable* |
| Last verified by the instructor | *not applicable* |
| Confidence | L |
| **Total references** | **28** |
| Cited in | S1 `#s1` · S2 `#s6b` · S3 `#s2` · S3 `#s4` · S3 `#sRag` · S3 `#s6` · S3 `#s7` · S3 `#s9` · S3 `#sPrep` · S3 `#s10` · S3 `#sChk` · S3 `#sOff` ×2 · S3 `#s12` · S3 `#sVend` · S3 `#s13` · S3 `#s16` · S4 `#s2` · S4 `#sRSP` · S4 `#sAnon` · S4 `#s3` · S4 `#s4` · S4 `#s5` · S4 `#sW2` · S4 `#s7` · S4 `#sCR` · S4 `#sD` · S4 `#s9` |

Entirely synthetic. Every figure, document and family fact is invented, including the 2014 buy-sell, the 2023 appraisal and the meeting transcript. Not based on any client, living or dead.

### U.S. Securities and Exchange Commission

**Regulation S-P: Privacy of consumer financial information and safeguarding customer information, 2024 amendments**  
`src-regsp` · evidence

| | |
|---|---|
| Author | U.S. Securities and Exchange Commission |
| Publisher | SEC, adopting release |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2024 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **10** |
| Cited in | S3 `#sPol` ×2 · S4 `#s2` ×4 · S4 `#sRSP` ×2 · S4 `#s4` ×2 |

The four obligations of the 2024 amendments: a written incident response program; customer notification no later than 30 days after the firm becomes aware; service provider oversight, including the service provider's notice to the firm within 72 hours of becoming aware of a breach; and recordkeeping. The definition and scope limits of nonpublic personal information at 17 CFR 248.3, including the fact that an individual is a customer and information disclosed in a manner indicating the individual is a customer. The compliance dates 3 December 2025 and 3 June 2026.

### U.S. Securities and Exchange Commission

**Enforcement actions against Delphia (USA) Inc. and Global Predictions, Inc.**  
`src-sec-ai` · evidence

| | |
|---|---|
| Author | U.S. Securities and Exchange Commission |
| Publisher | SEC |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2024-03-18 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **4** |
| Cited in | S1 `#s1` ×2 · S4 `#s1` ×2 |

The two AI-washing settlements and their penalty amounts. Penalty figures are reported at two values across sources; the page states the majority figure.

### U.S. Securities and Exchange Commission

**Withdrawal of proposed regulatory actions, including Conflicts of Interest Associated with the Use of Predictive Data Analytics (S7-12-23)**  
`src-sec-withdraw` · evidence

| | |
|---|---|
| Author | U.S. Securities and Exchange Commission |
| Publisher | SEC |
| Link | <https://www.sec.gov/rules-regulations/2025/06/s7-12-23> |
| Published | 2025-06-12 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S4 `#s1` |

That the SEC withdrew its 2023 proposal on conflicts of interest from predictive data analytics used by broker-dealers and investment advisers, on 12 June 2025, together with thirteen other proposals; any future rule would need a new proposal.

### U.S. Securities and Exchange Commission, Division of Examinations

**Examination priorities: Fiscal year 2026, §VII**  
`src-secpri` · evidence

| | |
|---|---|
| Author | U.S. Securities and Exchange Commission, Division of Examinations |
| Publisher | SEC |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2025-11-17 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#s1` ×2 |

Accuracy of AI representations, training and security controls, and Regulation S-P as a named examination focus.

### Wolfram, S.

**What is ChatGPT doing … and why does it work?**  
`src-wolfram` · assigned_reading

| | |
|---|---|
| Author | Wolfram, S. |
| Publisher | Stephen Wolfram Writings |
| Link | <https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/> |
| Published | 2023-02-14 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **2026-08-23** |
| Confidence | H |
| **Total references** | **17** |
| Cited in | S1 `#s2` · S1 `#s3` ×2 · S1 `#s4` · S1 `#s5` ×2 · S2 `#s1` ×2 · S2 `#s2` ×2 · S2 `#s3` ×2 · S2 `#s4` · S3 `#s2` ×2 · S3 `#s7` · S4 `#sWS` |

The mechanism of next-token prediction, the temperature passage, tokenisation and the GPT-2 token values, embeddings and vector lengths, the parenthesis-counting limit, and the brain-scale comparison. A February 2023 essay describing a 2020-era model; three of its structural claims are stale and session-4 Appendix D3 is about exactly that.

### Zheng, M., Pei, J., Logeswaran, L., Lee, M., & Jurgens, D.

**When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models**  
`src-zheng-persona` · evidence

| | |
|---|---|
| Author | Zheng, M., Pei, J., Logeswaran, L., Lee, M., & Jurgens, D. |
| Publisher | Findings of the Association for Computational Linguistics: EMNLP 2024 |
| Link | <https://aclanthology.org/2024.findings-emnlp.888/> |
| Published | 2024 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S2 `#s6` |

The study design and its null result: adding a persona to a system prompt did not improve measured performance.


---

## Listed but not cited by any claim

A source a lesson lists without chipping. Three kinds are exempt by
construction — an authority travelling with the case, background reading,
and a deliberately fabricated citation, which may never carry a chip.
**Anything else in this table is a finding**: either a missing chip, or a
source that does not belong in that lesson's footer.

| Source | Kind | Listed by | Exempt? |
|---|---|---|---|
| `src-anthropic-fluency` | background | S2 | yes, by kind |
| `src-deloitte` | evidence |  | **NO — finding** |
| `src-gartner` | evidence |  | **NO — finding** |
| `src-synthid` | evidence |  | **NO — finding** |
| `src-hallowell` | fabricated | S4 | yes, by kind |
| `src-rr8513` | authority | S2 | yes, by kind |
| `src-rr200464` | authority | S2 | yes, by kind |
| `src-kessler` | fabricated | S2 | yes, by kind |
| `src-kitces-advisortech` | background |  | yes, by kind |
| `src-laplace` | background | S2 | yes, by kind |
| `src-cve` | background | S4 | yes, by kind |
| `src-morningstar` | background | S2 | yes, by kind |
| `src-owasp` | evidence |  | **NO — finding** |
| `src-surfshark` | evidence |  | **NO — finding** |
| `src-irc` | authority | S2 | yes, by kind |
| `src-woelbing` | authority | S2 | yes, by kind |
| `src-davidson` | authority | S2 | yes, by kind |
| `src-vectara` | evidence |  | **NO — finding** |
| `src-zhao` | evidence |  | **NO — finding** |
