# BIBLIOGRAPHY.md

**Generated from `SOURCES.md` by `scripts/build-bibliography.mjs`. Do not edit:
the next run overwrites it.** To change an entry, change `SOURCES.md`. To change
a reference count, change where the corpus cites the source — the counts here are
read off the chips, never typed.

**134 works, 461 references across 6 lessons.** 111 are
cited by at least one claim; 23 are listed by a lesson without carrying a
chip, and the reason each is exempt — or is not — is in the second table.

**105 records carry at least one field this repository could not verify, and
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
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **4** |
| Cited in | S2 `#s3` ×2 · S4 `#sWS` · S4 `#s9` |

The Messages API reference as read on 2026-09-27: temperature is marked deprecated ("Models released after Claude Opus 4.6 do not support setting temperature. A value of 1.0 will be accepted for backwards compatibility, all other values will be rejected with a 400 error"); the effort parameter ("How much effort the model should put into its response") takes low, medium, high, xhigh or max; thinking can be enabled with a token budget, disabled, or adaptive, where the model decides.

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
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **18** |
| Cited in | S4 `#s1` · S4 `#sW1` ×6 · S4 `#sW2` ×6 · S4 `#s9` ×5 |

Claude models launched in the EU on or after 2 August 2026 mark generated text with an imperceptible watermark at launch, earlier models are being added with all covered by 2 December 2026, and marking applies "to output from supported models wherever Claude is offered, worldwide". Files Claude makes (PNG, JPG, SVG, MP4, audio) carry signed Content Credentials following the C2PA standard. Text watermark detection is in private preview, "available to eligible organizations as required under EU law (such as regulators, law enforcement, media, fact-checkers, independent researchers, educational organizations, and EU civil society groups)" and to enterprises with their own Article 50 obligations, through a registration form. A detected mark "tells you that the content may have been processed by Claude" and does not confirm full provenance; "Lack of a detected mark doesn't mean the content wasn't AI-generated or processed": heavy editing, paraphrase, translation, very short passages, or metadata stripped "through format conversion, re-saving, screenshots, or other means". The free Claude Content Checker checks a file, in the browser, for a Claude-issued credential; "The tool does not check text." Anthropic signed the EU AI Act Article 50(2) Code of Practice on Transparency of AI-Generated Content. The page describes no account or user identifier in the mark; that is a reading of an absence and is chipped M wherever it is used.

### Anthropic

**Consumer Terms of Service, Commercial Terms of Service and Privacy Policy**  
`src-anthropic-terms` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Anthropic, anthropic.com/legal |
| Link | <https://www.anthropic.com/legal/commercial-terms> |
| Published | *not applicable* |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **15** |
| Cited in | S4 `#s3` ×6 · S4 `#s4` ×2 · S4 `#s9` ×6 · S5 `#s6` |

Consumer plans: Anthropic may use chats "including training our models, unless you opt out of training through your account settings"; retention five years if training is allowed, 30 days if not; the Consumer Terms are a contract between the individual and Anthropic. Commercial plans (Team, Enterprise, the API): "Anthropic may not train models on Customer Content from Services" (Section B); the Customer "retains all rights to its Inputs, and owns its Outputs" (Section B); Confidential Information may be used only to exercise rights and perform obligations under the Terms and is destroyed promptly on request (Sections E.2, E.4); the Terms are an agreement between Anthropic and the organisation the signer represents, and nobody may accept for an organisation without legal authority to bind it.

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
| **Total references** | **10** |
| Cited in | S0.1 `#s1` · S0.1 `#s2` · S0.1 `#s3` ×5 · S0.1 `#s9` · S4 `#sWS` · S4 `#s9` |

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

### Anthropic

**Detecting and countering misuse of AI: September 2026**  
`src-anthropic-threat` · evidence

| | |
|---|---|
| Author | Anthropic |
| Publisher | Anthropic |
| Link | <https://www.anthropic.com/threat-intelligence-report-september-2026> |
| Published | 2026-09 |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **3** |
| Cited in | S4 `#s5` · S4 `#s9` ×2 |

Anthropic's fourth threat-intelligence report, covering misuse disrupted between December 2025 and August 2026 across seven harm areas. The case the lesson uses (GTG-20006, assessed as a Russian espionage actor) had AI agents watch security products for detections of its deployed malware and rebuild the malware until it evaded them. The lesson names no group and quotes no tradecraft beyond that sentence.

### Anthropic

**Plans and pricing**  
`src-claude-pricing` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | claude.com |
| Link | <https://claude.com/pricing> |
| Published | *not applicable* |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **5** |
| Cited in | S4 `#(footer)` · S4 `#s3` ×3 · S4 `#s9` |

Free $0. Pro $20 a month billed monthly, $17 a month on annual billing. Max from $100 a month for five times Pro usage, $200 for twenty times. Team: standard seat $25 a month or $20 annual, premium seat $125 or $100, teams of 2 to 150, with SSO, admin controls, enterprise search and no model training on content by default. Enterprise: $20 a seat a month billed annually plus usage at API rates, minimum 20 seats, adding SSO/SAML and domain capture, role-based access, SCIM, audit logs, a compliance API, custom data retention and a HIPAA-ready offering. API per million tokens, September 2026: from $1 in and $5 out for the smallest model to $10 in and $50 out for the largest.

### Anthropic

**API and data retention**  
`src-anthropic-retention` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Claude Platform Docs |
| Link | <https://platform.claude.com/docs/en/manage-claude/api-and-data-retention> |
| Published | *not applicable* |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **5** |
| Cited in | S4 `#s3` ×2 · S4 `#s4` · S4 `#s9` ×2 |

Standard retention on the API is 30 days; Enterprise organisations can set a custom retention period, 30 days at minimum; under a Zero Data Retention arrangement, obtained through sales and applied per organisation, "Anthropic does not store customer prompts or responses at rest after the API response is returned"; the Team and Enterprise chat interfaces are not ZDR-eligible; retained data is never used for training without express permission; a flagged chat may be kept up to two years.

### Anthropic

**Data Processing Addendum**  
`src-anthropic-dpa` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Anthropic, anthropic.com/legal |
| Link | <https://www.anthropic.com/legal/data-processing-addendum> |
| Published | 2025-02-24 |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **10** |
| Cited in | S4 `#s3` ×2 · S4 `#s4` ×2 · S4 `#s9` ×6 |

Section G.1: "Anthropic will notify Customer in writing without undue delay, but in any event within 48 hours, after becoming aware of any Security Breach." Section H.1: within thirty days of termination or expiration, on request, return a copy of all Customer Data or provide self-service functionality to do the same, and delete all copies. Section F.1: "Upon Customer's written request, and subject to the confidentiality obligations set forth in the Agreement, Anthropic will provide Customer with such audit reports or certificates applicable to the Services (e.g., SOC 2 report), to the extent available". Section C.3: reasonable prior notice of a new subprocessor and fifteen days to object. Section B.2: processing only to provide or maintain the Services and on the Customer's documented instructions.

### Anthropic

**What certifications has Anthropic obtained?**  
`src-anthropic-certs` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Claude Help Center, support.claude.com article 10015870 |
| Link | <https://support.claude.com/en/articles/10015870-what-certifications-has-anthropic-obtained> |
| Published | *not applicable* |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#s3` · S4 `#s9` |

SOC 2 Type I and Type II; ISO 27001:2022; ISO/IEC 42001:2023; a HIPAA-ready configuration with a Business Associate Agreement, available on Enterprise plans and accepted by the organisation's primary owner; compliance documents requested through the Trust Portal.

### Anthropic

**Detecting and countering misuse of AI: August 2025**  
`src-anthropic-threat-aug25` · evidence

| | |
|---|---|
| Author | Anthropic |
| Publisher | Anthropic |
| Link | <https://www.anthropic.com/news/detecting-countering-misuse-aug-2025> |
| Published | 2025-08-27 |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

One actor used Claude Code to automate reconnaissance, credential harvesting, intrusion and extortion against at least 17 organisations, including healthcare, emergency services, government and religious institutions; "Ransom demands sometimes exceeded $500,000." Demands, not measured losses.

### Anthropic

**Mitigating the risk of prompt injections in browser use**  
`src-anthropic-injection` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Anthropic |
| Link | <https://www.anthropic.com/news/prompt-injection-defenses> |
| Published | 2025-11-24 |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

"A 1% attack success rate, while a significant improvement, still represents meaningful risk"; the platform docs warn that "Claude will follow commands found in content even when they conflict with your instructions"; Claude for Chrome "asks users before taking high-risk actions like publishing, purchasing, or sharing personal data".

### Anthropic

**Agent Skills overview**  
`src-agent-skills` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Claude Platform Docs |
| Link | <https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview> |
| Published | *not applicable* |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **3** |
| Cited in | S4 `#sWS` · S4 `#s7` · S4 `#s9` |

A skill is a folder with a SKILL.md file: YAML front matter with a required name (at most 64 characters, lowercase letters, numbers and hyphens) and a required description (non-empty, at most 1,024 characters, saying what the skill does and when to use it), then the instructions in markdown. Custom skills upload in the Claude app's settings on Pro, Max, Team and Enterprise plans.

### Anthropic

**Bringing memory to teams at work**  
`src-claude-memory` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | claude.com blog |
| Link | <https://claude.com/blog/memory> |
| Published | 2025-09-11 |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#sWS` · S4 `#s9` |

Memory came to Team and Enterprise plans on 11 September 2025 and to Pro and Max on 23 October 2025; Claude saves memory as a set of individual topics as you chat rather than summarising afterwards.

### Anthropic

**Claude 3.7 Sonnet and Claude Code**  
`src-anthropic-thinking` · evidence

| | |
|---|---|
| Author | Anthropic |
| Publisher | Anthropic |
| Link | <https://www.anthropic.com/news/claude-3-7-sonnet> |
| Published | 2025-02-24 |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#sWS` · S4 `#s9` |

Visible, extended step-by-step thinking arrived on 24 February 2025; by 2026 thinking is built in and adaptive, and "think step by step" is a fallback when it is off.

### Anthropic

**Introducing the Model Context Protocol**  
`src-anthropic-mcp` · evidence

| | |
|---|---|
| Author | Anthropic |
| Publisher | Anthropic |
| Link | <https://www.anthropic.com/news/model-context-protocol> |
| Published | 2024-11-25 |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#sWS` · S4 `#s9` |

A standard for connecting assistants to the systems where data lives (November 2024); web search with direct citations in Claude (March 2025); integrations and advanced research across internal and external sources (May 2025): grounding built in rather than a retrieval pipeline you build.

### Anthropic

**Context windows**  
`src-anthropic-context` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Claude Platform Docs |
| Link | <https://platform.claude.com/docs/en/build-with-claude/context-windows> |
| Published | *not applicable* |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#sWS` · S4 `#s9` |

9,000 tokens in March 2023, 100,000 in May 2023, 200,000 in November 2023, one million by default on current models, about 555,000 words; and "As token count grows, accuracy and recall degrade, a phenomenon known as context rot."

### Anthropic

**Model deprecations**  
`src-anthropic-deprecations` · evidence · **moving target**

| | |
|---|---|
| Author | Anthropic |
| Publisher | Claude Platform Docs |
| Link | <https://platform.claude.com/docs/en/about-claude/model-deprecations> |
| Published | 2026-09-30 |
| Last retrieved | 2026-10-02 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **5** |
| Cited in | S5 `#s1` ×3 · S5 `#sE2` ×2 |

Anthropic's lifecycle terms (active, legacy, deprecated, retired); that deprecated models get a recommended replacement and a retirement date; that requests to retired models fail; at least 60 days' notice before a publicly released model is retired; the advice to test applications against the replacement well before the retirement date; and the dated table of retirements the §01 calendar draws: Claude 2, 2.1 and Sonnet 3 retired 21 July 2025; Sonnet 3.5 models 28 October 2025; Opus 3 5 January 2026; Sonnet 3.7 and Haiku 3.5 19 February 2026; Haiku 3 20 April 2026; Sonnet 4 and Opus 4 15 June 2026; Opus 4.1 5 August 2026; Sonnet 4.5 deprecated 30 September 2026 with retirement on 30 November 2026 and Sonnet 5.5 as the replacement; current models carry a not-sooner-than date. Dates are for Anthropic-operated platforms; partner platforms set their own.

### Anthropic

**Commitments on model deprecation and preservation**  
`src-anthropic-deprecation-commitments` · evidence

| | |
|---|---|
| Author | Anthropic |
| Publisher | Anthropic, research and alignment pages |
| Link | <https://www.anthropic.com/research/deprecation-commitments> |
| Published | 2025-11-04 |
| Last retrieved | 2026-10-02 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S5 `#s1` ×2 |

Anthropic commits to preserving the weights of all publicly released models, and of models deployed for significant internal use, for at least the lifetime of the company; states that retiring past models is currently necessary to make new models available because serving cost scales roughly linearly with the number of models served; and describes a post-deployment report and interview for each deprecated model. No claim about any adviser's workflow rests on it.

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

### Brewster, T.

**Fraudsters cloned company director's voice in $35 million heist, police find**  
`src-uae-voice` · evidence

| | |
|---|---|
| Author | Brewster, T. |
| Publisher | Forbes |
| Link | <https://www.forbes.com/sites/thomasbrewster/2021/10/14/huge-bank-fraud-uses-deep-fake-voice-tech-to-steal-millions/> |
| Published | 2021-10-14 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

In early 2020 a bank branch manager in the UAE authorised transfers of $35 million after a phone call from a cloned voice of a company director he knew, backed by forged emails about an acquisition; the case surfaced in a 2021 court document.

### Brynjolfsson, E., Li, D., & Raymond, L.

**Generative AI at work**  
`src-brynjolfsson` · evidence

| | |
|---|---|
| Author | Brynjolfsson, E., Li, D., & Raymond, L. |
| Publisher | The Quarterly Journal of Economics 140(2), 889 to 942, 2025; doi 10.1093/qje/qjae044. First circulated as NBER Working Paper 31161, April 2023 |
| Link | <https://www.nber.org/papers/w31161> |
| Published | 2025 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S5 `#s5` |

5,179 customer-support agents at a software firm, with a generative-AI assistant rolled out in stages. Issues resolved per hour rose 14% on average, 34% for the least experienced and least skilled agents, with little measurable effect on the most experienced; the authors read the tool as spreading the practices of the best workers. A support-centre trial, stated as such on the page.

### Capital One

**2019 Capital One cyber incident: what happened**  
`src-capitalone` · evidence

| | |
|---|---|
| Author | Capital One |
| Publisher | Capital One |
| Link | <https://www.capitalone.com/digital/facts2019/> |
| Published | 2019-07-29 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#sRSP` · S4 `#s9` |

Tipped on 17 July 2019, Capital One determined on 19 July 2019 that an intrusion had occurred, contacted the FBI, and announced it publicly on 29 July 2019; about 100 million US and 6 million Canadian applicants affected; an $80 million OCC penalty in August 2020 and a $190 million class settlement.

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
| **Total references** | **4** |
| Cited in | S4 `#s2` ×2 · S4 `#sAnon` ×2 |

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

### CFP Board

**CFP Board adds Psychology of Financial Planning to exam requirements**  
`src-cfp-psychology` · evidence

| | |
|---|---|
| Author | CFP Board |
| Publisher | CFP Board, news release, March 2021 |
| Link | <https://www.cfp.net/news/2021/03/cfp-board-adds-psychology-of-financial-planning-to-exam-requirements> |
| Published | 2021-03 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **3** |
| Cited in | S5 `#s7` ×2 · S5 `#s8` |

The 2021 practice analysis added Psychology of Financial Planning as the eighth principal knowledge domain, weighted at 7% of the CFP exam from the March 2022 administration; the domain covers client and planner attitudes, values and biases, behavioural finance, sources of money conflict, and principles of counselling.

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
| Link | <https://www.sec.gov/newsroom/speeches-statements/daly-020326-artificial-intelligence-future-investment-management-remarks-investment-company-institute-ici-winter> |
| Published | 2026-02-03 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **3** |
| Cited in | S4 `#s1` ×2 · S4 `#s9` |

NARROW, AND IT WAS READ TOO WIDELY. The speech states that the core questions remain open — whether an AI tool is marketing, advice or something requiring registration; who is responsible when output is wrong; how it is supervised — and asks for comment rather than announcing an answer. It says NOTHING about watermarking, SynthID, benchmark scores or model token counts, and it was chipped to four such claims before Phase 3 Part 1.

### Dell'Acqua, F., McFowland III, E., Mollick, E., Lifshitz-Assaf, H., Kellogg, K., Rajendran, S., Krayer, L., Candelon, F., & Lakhani, K.

**Navigating the jagged technological frontier: Field experimental evidence of the effects of AI on knowledge worker productivity and quality**  
`src-dellacqua` · evidence

| | |
|---|---|
| Author | Dell'Acqua, F., McFowland III, E., Mollick, E., Lifshitz-Assaf, H., Kellogg, K., Rajendran, S., Krayer, L., Candelon, F., & Lakhani, K. |
| Publisher | Harvard Business School working paper, September 2023; also on SSRN |
| Link | <https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321> |
| Published | 2023-09 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **3** |
| Cited in | S5 `#s5` ×2 · S5 `#sE5` |

758 Boston Consulting Group consultants, about 7% of the firm's individual contributors, randomised to no AI, GPT-4, or GPT-4 with a prompting overview, on 18 realistic consulting tasks. Inside the model's capability frontier the AI group completed 12.2% more tasks, 25.1% faster, at more than 40% higher rated quality. On a task chosen to sit outside the frontier, consultants using AI were 19 percentage points less likely to produce a correct answer than the control group. The jagged-frontier framing: tasks that look alike to a person can sit on opposite sides of what the model can do.

### Deloitte Center for Financial Services

**Generative-AI fraud projection**  
`src-deloitte` · evidence

| | |
|---|---|
| Author | Deloitte Center for Financial Services |
| Publisher | Deloitte |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

US GenAI-enabled fraud losses projected from $12.3bn (2023) to $40bn (2027). A PROJECTION, NOT A MEASUREMENT, and the page says so.

### European Parliament and Council

**Regulation (EU) 2024/1689 (the Artificial Intelligence Act), Article 50, transparency obligations**  
`src-eu-ai-act` · authority

| | |
|---|---|
| Author | European Parliament and Council |
| Publisher | Official Journal of the European Union, EUR-Lex |
| Link | <https://eur-lex.europa.eu/eli/reg/2024/1689/oj> |
| Published | 2024-07-12 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#sW1` ×2 |

Providers of AI systems that generate synthetic audio, image, video or text must ensure the output is marked in a machine-readable format and detectable as artificially generated; deployers of deepfakes must disclose them; the obligations apply from 2 August 2026 and bind providers placing systems on the EU market and deployers in the EU.

### Federal Bureau of Investigation

**Cryptocurrency and AI scams bilk Americans of billions: 2025 Internet Crime Report**  
`src-fbi-ic3-2025` · evidence

| | |
|---|---|
| Author | Federal Bureau of Investigation |
| Publisher | FBI, Internet Crime Complaint Center |
| Link | <https://www.fbi.gov/news/press-releases/cryptocurrency-and-ai-scams-bilk-americans-of-billions> |
| Published | 2026-04-07 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#s5` · S4 `#s9` |

For 2025: 1,008,597 complaints and $20.877 billion in reported losses, up 26% on 2024; business email compromise $3.05 billion from 24,768 complaints; the report's first AI section counts 22,364 complaints that named AI, about $893 million, which the FBI calls an undercount because victims must recognise AI to report it.

### Figueroa, M.

**Phishing for Gemini**  
`src-0din-gemini` · evidence

| | |
|---|---|
| Author | Figueroa, M. |
| Publisher | Mozilla 0Din |
| Link | <https://0din.ai/blog/phishing-for-gemini> |
| Published | 2025-07 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

An email styled with HTML and CSS to set the font size to zero and the colour to white carried an instruction that Gemini for Workspace followed when the recipient asked it to summarise the email.

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
| **Total references** | **7** |
| Cited in | S1 `#s14` ×2 · S4 `#s1` ×2 · S4 `#s7` · S4 `#s9` ×2 |

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
| **Total references** | **6** |
| Cited in | S4 `#s1` ×2 · S4 `#s7` ×3 · S4 `#s9` |

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
| **Total references** | **4** |
| Cited in | S4 `#s5` ×2 · S4 `#s9` ×2 |

A self-regulatory organisation publishing a standalone primer on an attack technique, which is the evidence for the claim that prompt injection has left the research literature.

### Financial Industry Regulatory Authority

**Cybersecurity alert: Salesloft Drift AI supply chain attack**  
`src-drift` · evidence

| | |
|---|---|
| Author | Financial Industry Regulatory Authority |
| Publisher | FINRA |
| Link | <https://www.finra.org/rules-guidance/guidance/salesloft-drift-AI-supply-chain-attack> |
| Published | 2025-09 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

In August 2025 stolen OAuth tokens from the Drift AI chatbot's Salesforce integration let an attacker export data from more than 700 organisations; the standing connector token bypassed multi-factor authentication; tokens were revoked on 20 August 2025. FINRA issued a cybersecurity alert to member firms.

### Financial Industry Regulatory Authority

**FINRA Rule 4511, General Requirements, and Exchange Act Rule 17a-4**  
`src-finra-4511` · authority

| | |
|---|---|
| Author | Financial Industry Regulatory Authority |
| Publisher | FINRA Rulebook |
| Link | <https://www.finra.org/rules-guidance/rulebooks/finra-rules/4511> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s7` · S4 `#s9` |

Members must make and preserve books and records under FINRA rules, the Exchange Act and its rules, in a format consistent with Exchange Act Rule 17a-4; records with no stated period are kept at least six years; correspondence under Rule 17a-4(b)(4) for three years, the first two in an easily accessible place.

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
| **Total references** | **5** |
| Cited in | S4 `#s5` ×2 · S4 `#s9` ×3 |

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
| **Total references** | **3** |
| Cited in | S2 `#s6` · S5 `#s2` ×2 |

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
| **Total references** | **5** |
| Cited in | S4 `#sW1` ×2 · S4 `#sW2` ×3 |

TEXT WATERMARKING ONLY. The boundary is load-bearing, because the sibling record `src-synthid` is cited for image, video and audio claims that this page does not reach. What it substantiates, and nothing outside this list: detection is probabilistic and returns watermarked, not watermarked, or uncertain, against two tunable thresholds; the signal survives cropping, changing a few words, and mild paraphrase; detector confidence is greatly reduced by thorough rewriting or by translation; watermarking is less effective on factual responses, because there is less opportunity to augment generation without decreasing accuracy; detector exposure is a three-way deployer choice between fully-private, semi-private and public; the scheme is not designed to stop motivated adversaries; and the underlying technical description is Dathathri et al., Scalable watermarking for identifying large language model outputs, Nature 634:818-823 (2024), https://www.nature.com/articles/s41586-024-08025-4. IT SUBSTANTIATES NO ADOPTION FIGURE AND NO MARKET-SHARE CLAIM, which is the fact that keeps session-4's scale paragraph open rather than closing it.

### Google

**Gemini Apps Privacy Hub**  
`src-gemini-privacy` · evidence · **moving target**

| | |
|---|---|
| Author | Google |
| Publisher | Gemini Apps Help, answer 13594961 |
| Link | <https://support.google.com/gemini/answer/13594961> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **3** |
| Cited in | S4 `#s3` ×2 · S4 `#s9` |

With a personal Google account, Gemini Apps Activity ("Keep Activity") is on by default; activity is used to improve Google's models and may be read by trained reviewers. Activity auto-deletes after 18 months by default, with 3 or 36 months selectable. A conversation a reviewer has read is kept for up to three years even if the person deletes their activity. With the setting off, chats are kept up to 72 hours and not used to train models unless the person sends feedback. Google's own page warns against entering confidential information.

### Google

**Generative AI in Google Workspace Privacy Hub**  
`src-gemini-workspace` · evidence · **moving target**

| | |
|---|---|
| Author | Google |
| Publisher | Google Workspace Help, answer 15706919 |
| Link | <https://support.google.com/a/answer/15706919> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s3` ×2 |

For Workspace accounts with Gemini, prompts, generated content and Workspace data are not used to train models outside the customer's domain without permission, are not reviewed by humans, and are not used for advertising; the Cloud Data Processing Addendum governs.

### Google

**Gemini API Additional Terms of Service**  
`src-gemini-api-terms` · evidence · **moving target**

| | |
|---|---|
| Author | Google |
| Publisher | Google AI for Developers, ai.google.dev |
| Link | <https://ai.google.dev/gemini-api/terms> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S4 `#(footer)` |

On the unpaid services (Google AI Studio and the free API quota), Google uses submitted content and generated responses "to provide, improve, and develop Google products and services and machine learning technologies", and "human reviewers may read, annotate, and process your API input and output"; on the paid services, prompts and responses are not used to improve products.

### Google

**Rate limits**  
`src-gemini-ratelimits` · evidence · **moving target**

| | |
|---|---|
| Author | Google |
| Publisher | Google AI for Developers, ai.google.dev |
| Link | <https://ai.google.dev/gemini-api/docs/rate-limits> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | L |
| **Total references** | **1** |
| Cited in | S4 `#(footer)` |

The free tier's request limits are small, were cut in December 2025, and are now set per project; the only reliable figure is the one in your own AI Studio console.

### Google DeepMind

**SynthID**  
`src-synthid` · evidence · **moving target**

| | |
|---|---|
| Author | Google DeepMind |
| Publisher | Google DeepMind |
| Link | **[UNVERIFIED, needs source]** |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **4** |
| Cited in | S4 `#sW1` · S4 `#s9` ×3 |

Tournament sampling in text, perturbation in image and video, and the frequency-domain approach in audio. Adoption is a vendor decision and changes; the mechanism does not.

### Google Threat Intelligence Group

**GTIG AI Threat Tracker: Advances in threat actor usage of AI tools**  
`src-gtig-ai` · evidence

| | |
|---|---|
| Author | Google Threat Intelligence Group |
| Publisher | Google |
| Link | <https://services.google.com/fh/files/misc/advances-in-threat-actor-usage-of-ai-tools-en.pdf> |
| Published | 2025-11-05 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s5` · S4 `#s9` |

PROMPTFLUX, a VBScript dropper that called the Gemini API to request obfuscated rewrites of its own source code, described as experimental and not yet able to do real damage; PROMPTSTEAL, which generated commands through a hosted model; and the report's statement that, for the first time, malware families used large language models during execution. Google disabled the associated API access.

### IBM

**IBM study: one in four malicious breaches are AI-enabled, costing companies $6 million on average**  
`src-ibm-breach-2026` · evidence · **moving target**

| | |
|---|---|
| Author | IBM |
| Publisher | IBM Newsroom |
| Link | <https://newsroom.ibm.com/2026-07-29-ibm-study-one-in-four-malicious-breaches-are-ai-enabled,-costing-companies-6-million-on-average> |
| Published | 2026-07-29 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

Cost of a Data Breach Report 2026, 602 organisations, breaches March 2025 to February 2026: global average $4.99 million, US average $11.5 million; one in four malicious breaches AI-enabled, at $6 million on average; shadow AI in 43% of AI-related breaches.

### Illinois General Assembly

**Personal Information Protection Act, 815 ILCS 530/10**  
`src-il-pipa` · authority

| | |
|---|---|
| Author | Illinois General Assembly |
| Publisher | Illinois Compiled Statutes |
| Link | <https://ilga.gov/documents/legislation/ilcs/documents/081505300K10.htm> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **4** |
| Cited in | S4 `#sRSP` ×2 · S4 `#s9` ×2 |

Notice to affected Illinois residents "in the most expedient time possible and without unreasonable delay"; notice to the Attorney General when more than 500 Illinois residents are affected by a single breach.

### InvestmentNews

**AI moves from novelty to backbone as advisors reshape their fintech stacks**  
`src-investmentnews-t3-2026` · evidence

| | |
|---|---|
| Author | InvestmentNews |
| Publisher | InvestmentNews, reporting the 2026 T3 / Inside Information Software Survey |
| Link | <https://investmentnews.com/fintech/ai-moves-from-novelty-to-backbone-as-advisors-reshape-fintech-stacks/265643> |
| Published | 2026-03 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S5 `#s6` |

In the 2026 survey, AI note-taking appeared as a tracked category for the first time, with 14 solutions, and the survey's co-producer called its adoption curve one of the fastest tracked; the survey also found that AI tools had not displaced the established providers in CRM, planning and portfolio software, so advisers were using AI as a supplement to their stack.

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
| **Total references** | **5** |
| Cited in | S1 `#s9` · S5 `#s3` ×2 · S5 `#sE3` ×2 |

Why a model guesses rather than abstains, and the two scoring rules. The model tested was DeepSeek-V3 on 11 May 2025 — a historical fixture; the finding is about that model on that date.

### Kinniry, F. M., Jaconetti, C. M., DiJoseph, M. A., Walker, D. J., & Quinn, M. C.

**Putting a value on your value: Quantifying Vanguard Advisor's Alpha**  
`src-vanguard-alpha` · evidence

| | |
|---|---|
| Author | Kinniry, F. M., Jaconetti, C. M., DiJoseph, M. A., Walker, D. J., & Quinn, M. C. |
| Publisher | The Vanguard Group, research paper (2022 update) |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2022 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **3** |
| Cited in | S5 `#s7` · S5 `#sE5` · S5 `#s8` |

Vanguard's framework attributes about 3 percentage points a year of potential net value to an adviser following its best practices, of which behavioural coaching, keeping clients to their plan in fearful or greedy markets, is the largest single module at about 150 basis points, roughly half.

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

### Lamas, S., & Labotka, D.

**Why do investors fire their financial advisor?**  
`src-morningstar-fired` · evidence

| | |
|---|---|
| Author | Lamas, S., & Labotka, D. |
| Publisher | Morningstar, behavioural research |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2023 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **5** |
| Cited in | S5 `#s7` ×2 · S5 `#sE5` ×2 · S5 `#s8` |

Three Morningstar surveys in 2021 and 2022, about 3,000 responses, of which 184 to 185 investors had fired an advisor. Reasons, as shares of responses: quality of advice and services 32%, quality of the relationship 21%, cost 17%, returns 11%, comfort handling finances alone 10%, communication 9%. The authors' reading: the top two reasons are the advice and the relationship, not performance or fees.

### Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N.

**The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers**  
`src-lee-cognitive` · evidence

| | |
|---|---|
| Author | Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N. |
| Publisher | Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI '25), ACM, Yokohama, 26 April to 1 May 2025, 23 pages; doi 10.1145/3706598.3713778. Author's version hosted by Microsoft Research |
| Link | <https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf> |
| Published | 2025-04 |
| Last retrieved | 2026-10-02 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **7** |
| Cited in | S3 `#s15` · S5 `#sE5` ×2 · S5 `#s8` ×4 |

A survey of 319 knowledge workers who shared 936 first-hand examples of using a generative AI tool at work (374 creation, 303 information, 259 advice; 309 of 319 used ChatGPT). Critical thinking was self-reported as enacted in 555 of the 936 examples (59.29%). In the mixed-effects models, confidence in the tool predicted less enacted critical thinking (coefficient -0.69, p < 0.001) and less perceived effort in five of six Bloom activities; confidence in oneself predicted more (0.26, p = 0.026) and more effort in applying and evaluating. Examples reporting less effort with the tool: 72% knowledge, 79% comprehension, 69% application, 72% analysis, 76% synthesis, 55% evaluation. Three qualitative shifts: from information gathering to information verification, from problem-solving to response integration, from task execution to task stewardship. Self-reported, cross-sectional, not a measure of accuracy.

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
| **Total references** | **13** |
| Cited in | S2 `#s10` ×3 · S3 `#s6` ×2 · S3 `#s15` · S3 `#s16` ×2 · S4 `#s6` ×3 · S4 `#s9` · S5 `#sE3` |

Over 200 preregistered legal queries, expert hand-scored, against Lexis+ AI, Westlaw AI-Assisted Research and GPT-4. Tools tested May 2024 — a historical fixture. The measured rates belong to the tools as they were on that date and must never be "updated".

### METR (Model Evaluation and Threat Research)

**Measuring the impact of early-2025 AI on experienced open-source developer productivity**  
`src-metr-2025` · evidence

| | |
|---|---|
| Author | METR (Model Evaluation and Threat Research) |
| Publisher | METR, blog |
| Link | <https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/> |
| Published | 2025-07-10 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S5 `#s5` ×2 |

A randomised trial with 16 experienced open-source developers on 246 real tasks from their own repositories, each task randomly assigned to AI allowed or not (mainly Cursor with Claude 3.5 and 3.7 Sonnet). With AI the tasks took 19% longer. Before the study the developers expected to be 24% faster; afterwards they believed they had been about 20% faster. The perception gap, not the coding, is what the page teaches.

### Microsoft

**Privacy FAQ for Microsoft Copilot**  
`src-ms-copilot` · evidence · **moving target**

| | |
|---|---|
| Author | Microsoft |
| Publisher | Microsoft Support |
| Link | <https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **3** |
| Cited in | S4 `#s3` ×2 · S4 `#s9` |

With a personal Microsoft account, conversations may be used to train Microsoft's generative AI models unless the person opts out under "Model training on text"; the opt-out is not the default, and takes effect across systems within 30 days. Conversation history is kept 18 months by default unless deleted sooner. Some users and regions are excluded from training by the vendor's own rules.

### Microsoft

**Enterprise data protection in Microsoft Copilot and Microsoft Copilot Chat**  
`src-ms-copilot-edp` · evidence · **moving target**

| | |
|---|---|
| Author | Microsoft |
| Publisher | Microsoft Learn |
| Link | <https://learn.microsoft.com/en-us/copilot/microsoft-365/enterprise-data-protection> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s3` ×2 |

Signed in with a work or school account, prompts and responses fall under enterprise data protection: the same contractual terms as Exchange mail and SharePoint files, encrypted at rest and in transit, and not used to train the underlying foundation models.

### MITRE / NVD

**CVE-2025-32711 (EchoLeak, CVSS 9.3)**  
`src-cve` · evidence

| | |
|---|---|
| Author | MITRE / NVD |
| Publisher | Public CVE record |
| Link | **[UNVERIFIED, needs source]** |
| Published | 2025 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **7** |
| Cited in | S4 `#s3` · S4 `#s5` ×2 · S4 `#s9` ×3 · S5 `#sE3` |

Identifier, score and mechanism of EchoLeak, verified against the public record: one crafted email could make Microsoft 365 Copilot send internal data out with no click. Kind was background until 2026-09-25, when the §05 bullet stating that mechanism was found resting on it unchipped (A20); it is now the chip on that claim. CurXecute (CVE-2025-54135) left the title with the rebuild that took it off the page.

### Mothership

**Fake Zoom call with PM Wong: police release deepfake footage of scam that caused victim to hand over S$4.9 million**  
`src-sg-deepfake-2026` · evidence

| | |
|---|---|
| Author | Mothership |
| Publisher | Mothership.sg |
| Link | <https://mothership.sg/2026/05/pm-wong-zoom-deepfake-scam/> |
| Published | 2026-05-16 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

In May 2026 a Singapore businessman transferred S$4.9 million, about US$3.8 million, to a scammer-controlled corporate account after a Zoom call with deepfakes of the Prime Minister, the President and a minister; he realised on 14 May 2026. Nothing stopped it.

### Noy, S., & Zhang, W.

**Experimental evidence on the productivity effects of generative artificial intelligence**  
`src-noy-zhang` · evidence

| | |
|---|---|
| Author | Noy, S., & Zhang, W. |
| Publisher | Science, July 2023 (MIT Department of Economics) |
| Link | <https://www.science.org/doi/10.1126/science.adh2586> |
| Published | 2023-07 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S5 `#s5` |

453 college-educated professionals given occupation-specific, incentivised writing tasks, half randomly given access to ChatGPT. Average time fell about 40% and graded output quality rose about 18%; the gap between weaker and stronger writers narrowed. A writing-task trial, not a planning one; stated as such on the page.

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

### OpenAI

**How your data is used to improve model performance**  
`src-openai-data` · evidence · **moving target**

| | |
|---|---|
| Author | OpenAI |
| Publisher | OpenAI Help Center, article 5722486 |
| Link | <https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **4** |
| Cited in | S4 `#s3` ×3 · S4 `#s9` |

On the Free, Plus and Pro plans the "Improve the model for everyone" setting is on by default and can be switched off under Data controls. ChatGPT Business (formerly Team), Enterprise, Edu and the API are not used for training by default. Chats stay in the account until deleted; a deleted chat is removed from OpenAI's systems within 30 days; temporary chats are kept up to 30 days and not used for training. Every one of these is a term the vendor can change without notice.

### OpenAI

**Retiring GPT-4o and other ChatGPT models**  
`src-openai-retire-4o` · evidence · **moving target**

| | |
|---|---|
| Author | OpenAI |
| Publisher | OpenAI Help Center, article 20001051 |
| Link | <https://help.openai.com/en/articles/20001051-retiring-gpt-4o-and-other-chatgpt-models> |
| Published | 2026-01 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S5 `#s1` ×2 |

GPT-4 was removed from ChatGPT on 30 April 2025, replaced as the default by GPT-4o. GPT-4o, GPT-4.1, GPT-4.1 mini and o4-mini were retired from ChatGPT on 13 February 2026, with conversations moved to newer defaults; the models remained available in the API. One line on the page, to show the retirement cycle is vendor-wide.

### OWASP

**Top 10 for LLM Applications and Top 10 for Agentic Applications**  
`src-owasp` · evidence · **moving target**

| | |
|---|---|
| Author | OWASP |
| Publisher | OWASP |
| Link | <https://owasp.org/www-project-top-10-for-large-language-model-applications/> |
| Published | **[UNVERIFIED, needs source]** |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#s9` ×2 |

The LLM01 ranking for prompt injection and the mapping into six of ten agentic categories. The ranking is revised between editions, so the position is a moving target even though the finding is not.

### Palo Alto Networks Unit 42

**Fooling AI agents: web-based indirect prompt injection observed in the wild**  
`src-unit42-ipi` · evidence

| | |
|---|---|
| Author | Palo Alto Networks Unit 42 |
| Publisher | Palo Alto Networks |
| Link | <https://unit42.paloaltonetworks.com/ai-agent-prompt-injection/> |
| Published | 2026-03-03 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

Twenty-two payload techniques observed in real web content, from zero-size fonts and off-screen text to encoded payloads that assemble themselves at runtime; most framed as an authority override of the assistant's instructions.

### Pew Research Center

**Google users are less likely to click on links when an AI summary appears in the results**  
`src-pew-ai-summaries` · evidence

| | |
|---|---|
| Author | Pew Research Center |
| Publisher | Pew Research Center, short read, 22 July 2025 |
| Link | <https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/> |
| Published | 2025-07-22 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S5 `#s6` |

68,879 Google searches by 900 US adults in March 2025, from a panel that shared its browsing data. Users clicked a traditional result on 8% of visits when an AI summary appeared and 15% when it did not; a link inside the summary itself was clicked on 1% of such visits; users ended their session on 26% of pages with a summary against 16% without.

### Privacy Rights Clearinghouse

**Data breach notification laws: a 50-state survey, 2026 edition**  
`src-state-breach` · evidence · **moving target**

| | |
|---|---|
| Author | Privacy Rights Clearinghouse |
| Publisher | Privacy Rights Clearinghouse |
| Link | <https://privacyrights.org/resources-tools/reports/data-breach-notification-laws-50-state-survey-2026-edition> |
| Published | 2026 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **3** |
| Cited in | S4 `#sRSP` ×2 · S4 `#s9` |

Hard consumer-notice deadlines in some states: Colorado, Florida and Washington 30 days from discovery; Maryland 45; Texas 60. Most states add a regulator filing above a headcount threshold.

### Rajasekaran, P., Dixon, E., Ryan, C., & Hadfield, J.

**Effective context engineering for AI agents**  
`src-anthropic-ctx-eng` · evidence

| | |
|---|---|
| Author | Rajasekaran, P., Dixon, E., Ryan, C., & Hadfield, J. |
| Publisher | Anthropic Engineering |
| Link | <https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents> |
| Published | 2025-09-29 |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#sWS` · S4 `#s9` |

"Context engineering refers to the set of strategies for curating and maintaining the optimal set of tokens (information) during LLM inference": what the model sees, its tools, its notes and what it retrieves, rather than the wording of one prompt.

### Rehberger, J.

**Microsoft Copilot: from prompt injection to data exfiltration of your emails**  
`src-ascii-smuggling` · evidence

| | |
|---|---|
| Author | Rehberger, J. |
| Publisher | Embrace The Red |
| Link | <https://embracethered.com/blog/posts/2024/m365-copilot-prompt-injection-tool-invocation-and-data-exfil-using-ascii-smuggling/> |
| Published | 2024-08-26 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

Unicode tag characters carry letters the screen never draws, so an instruction can sit inside ordinary-looking text invisibly; used to make Microsoft 365 Copilot exfiltrate email content until Microsoft fixed it.

### RightCapital

**RightCapital launches Iris, the first planning-focused AI agent designed to transform the financial planning process**  
`src-rightcapital-iris` · evidence · **moving target**

| | |
|---|---|
| Author | RightCapital |
| Publisher | ACCESS Newswire, press release, 23 June 2026 |
| Link | <https://www.accessnewswire.com/newsroom/en/business-and-professional-services/rightcapital-launches-iristm-the-first-planning-focused-ai-agent-designed-to-transform-the-fin-1180326> |
| Published | 2026-06-23 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **1** |
| Cited in | S5 `#s6` |

A planning-software agent that reads the client's plan data inside the software, flags anomalies, runs retirement simulations and explains results, offered on the Premium and Platinum plans at no added cost; preceded by a document-import feature the vendor says cuts manual data entry by 70% or more.

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

### Schluntz, E., & Zhang, B.

**Building effective agents**  
`src-anthropic-agents` · evidence

| | |
|---|---|
| Author | Schluntz, E., & Zhang, B. |
| Publisher | Anthropic Engineering |
| Link | <https://www.anthropic.com/engineering/building-effective-agents> |
| Published | 2024-12-19 |
| Last retrieved | 2026-09-27 |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **3** |
| Cited in | S4 `#sWS` · S4 `#s9` ×2 |

Agents "are typically just LLMs using tools based on environmental feedback in a loop"; the feedback loop is gather context, take action, verify work, repeat; the API documentation names the pattern the agentic loop.

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
| **Total references** | **4** |
| Cited in | S2 `#s9` · S2 `#s12d` · S5 `#s6` ×2 |

n = 2,906 advisors, 95% at fee-only RIA or dually registered firms. 52.2% using AI search and generative language, 42.9% using AI notetaking.

### TechCrunch

**Your public ChatGPT queries are getting indexed by Google and other search engines**  
`src-chatgpt-index` · evidence

| | |
|---|---|
| Author | TechCrunch |
| Publisher | TechCrunch |
| Link | <https://techcrunch.com/2025/07/31/your-public-chatgpt-queries-are-getting-indexed-by-google-and-other-search-engines> |
| Published | 2025-07-31 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s3` · S4 `#s9` |

Conversations shared from ChatGPT with the "make this chat discoverable" box ticked appeared in Google search results in late July 2025; OpenAI removed the option within days. The lesson uses it as the "caches" leak: a copy a search engine has made is the search engine's, whatever the vendor does next. The count of indexed chats (reported as about 4,500) is not stated on the page.

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
| **Total references** | **56** |
| Cited in | S1 `#s1` · S2 `#s6b` · S3 `#s2` · S3 `#s4` · S3 `#sRag` · S3 `#s6` · S3 `#s7` · S3 `#s9` · S3 `#sPrep` · S3 `#s10` · S3 `#sChk` · S3 `#sOff` ×2 · S3 `#s12` · S3 `#sVend` · S3 `#s13` · S3 `#s16` · S4 `#s0` · S4 `#sCold` · S4 `#s2` ×2 · S4 `#sRSP` · S4 `#sAnon` · S4 `#s3` · S4 `#s4` · S4 `#s5` · S4 `#sW1` · S4 `#sW2` · S4 `#s6` · S4 `#sWS` · S4 `#s7` · S4 `#sCR` ×2 · S4 `#sD` · S4 `#s9` ×2 · S5 `#s0` · S5 `#sCold` · S5 `#s1` ×2 · S5 `#sE2` ×2 · S5 `#s2` ×2 · S5 `#s3` ×2 · S5 `#sE3` · S5 `#s4` · S5 `#sE4` ×2 · S5 `#sE1` · S5 `#s5` · S5 `#s6` · S5 `#s7` · S5 `#sE5` · S5 `#s8` |

Entirely synthetic. Every figure, document and family fact is invented, including the 2014 buy-sell, the 2023 appraisal and the meeting transcript. Not based on any client, living or dead.

### Tom's Guide

**Meta AI's discover feed is full of revealing personal info: here's how to protect your privacy**  
`src-meta-feed` · evidence

| | |
|---|---|
| Author | Tom's Guide |
| Publisher | Tom's Guide |
| Link | <https://www.tomsguide.com/computing/online-security/meta-ais-discover-feed-is-full-of-revealing-personal-info-heres-how-to-protect-your-privacy> |
| Published | 2025-06 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s3` · S4 `#s9` |

The Meta AI app's Discover feed showed conversations people had shared with a Share button, many of them plainly private (medical, legal, financial, tied to real names), with little warning that sharing meant publishing. The lesson uses it as the "uncovered features" leak: a feature nobody's policy covered.

### Trail of Bits

**Weaponizing image scaling against production AI systems**  
`src-trailofbits-image` · evidence

| | |
|---|---|
| Author | Trail of Bits |
| Publisher | Trail of Bits blog |
| Link | <https://blog.trailofbits.com/2025/08/21/weaponizing-image-scaling-against-production-ai-systems/> |
| Published | 2025-08-21 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **1** |
| Cited in | S4 `#s9` |

Images that look benign at full size reveal an instruction once the AI platform downscales them, so a multimodal model reads text the human never saw; the authors recommend explicit confirmation for sensitive tool actions when embedded text is detected.

### U.S. Department of Justice, Northern District of California

**Former chief security officer of Uber sentenced to three years' probation for covering up data breach**  
`src-uber-doj` · evidence

| | |
|---|---|
| Author | U.S. Department of Justice, Northern District of California |
| Publisher | Department of Justice |
| Link | <https://www.justice.gov/usao-ndca/pr/former-chief-security-officer-uber-sentenced-three-years-probation-covering-data> |
| Published | 2023-05-04 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#sRSP` · S4 `#s9` |

A November 2016 breach of about 57 million records was concealed for a year; the chief security officer arranged a $100,000 payment to the hackers under a bug-bounty nondisclosure agreement; he was convicted in October 2022 of obstruction of justice and misprision of a felony and sentenced in May 2023 to three years' probation and a $50,000 fine.

### U.S. Government Accountability Office

**Data protection: actions taken by Equifax and federal agencies in response to the 2017 breach (GAO-18-559)**  
`src-equifax` · evidence

| | |
|---|---|
| Author | U.S. Government Accountability Office |
| Publisher | GAO |
| Link | <https://www.gao.gov/products/gao-18-559> |
| Published | 2018-08-30 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | H |
| **Total references** | **2** |
| Cited in | S4 `#sRSP` · S4 `#s9` |

Equifax discovered the breach on 29 July 2017 and announced it on 7 September 2017, about 147 million US consumers affected; the July 2019 settlement with the FTC, the CFPB and the states was at least $575 million and up to $700 million.

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
| **Total references** | **24** |
| Cited in | S3 `#sPol` ×2 · S4 `#s2` ×3 · S4 `#sRSP` ×7 · S4 `#s4` ×3 · S4 `#s9` ×8 · S5 `#s6` |

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

### U.S. Securities and Exchange Commission

**Books and records to be maintained by investment advisers, 17 CFR 275.204-2**  
`src-advisers-204-2` · authority

| | |
|---|---|
| Author | U.S. Securities and Exchange Commission |
| Publisher | Code of Federal Regulations |
| Link | <https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.204-2> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s7` · S4 `#s9` |

Paragraph (a)(7): originals of written communications received and copies of those sent relating to any recommendation made or proposed or any advice given or proposed; paragraph (e)(1): kept for not less than five years from the end of the fiscal year of the last entry, the first two years in an appropriate office of the adviser.

### U.S. Securities and Exchange Commission

**Commission Interpretation Regarding Standard of Conduct for Investment Advisers, Release IA-5248**  
`src-advisers-fiduciary` · authority

| | |
|---|---|
| Author | U.S. Securities and Exchange Commission |
| Publisher | SEC |
| Link | <https://www.sec.gov/rules-regulations/2019/06/commission-interpretation-regarding-standard-conduct-investment-advisers> |
| Published | 2019-06-05 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s7` · S4 `#s9` |

The fiduciary duty of care under the Advisers Act includes a duty to provide advice that is in the client's best interest, with a reasonable basis for it, which is why the source behind an AI-assisted answer belongs in the file.

### U.S. Securities and Exchange Commission

**Compliance procedures and practices, 17 CFR 275.206(4)-7**  
`src-advisers-206-4-7` · authority

| | |
|---|---|
| Author | U.S. Securities and Exchange Commission |
| Publisher | Code of Federal Regulations |
| Link | <https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.206(4)-7> |
| Published | *not applicable* |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s7` · S4 `#s9` |

A registered adviser must adopt and implement written policies and procedures reasonably designed to prevent violations, review them no less than annually, and designate a chief compliance officer; the AI-use policy and the record of its annual review are themselves required records.

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
| **Total references** | **5** |
| Cited in | S4 `#s1` ×2 · S4 `#s5` · S4 `#s9` ×2 |

§VII, Risk Areas Impacting Various Market Participants. Information security and operational resiliency, including ransomware, data loss prevention, incident response and the 2024 amendments to Regulation S-P; emerging financial technology and AI, including the accuracy of AI representations and a review of training and security controls for risks from AI and polymorphic malware attacks.

### Ways advisors can optimize for AI search (AI SEO)

**Ways advisors can optimize for AI search (AI SEO)**  
`src-kitces-aisearch` · assigned_reading

| | |
|---|---|
| Author | **[UNVERIFIED, needs source]** |
| Publisher | Kitces.com, Nerd's Eye View |
| Link | <https://www.kitces.com/blog/artificial-intelligence-ai-search-engine-optimization-seo-financial-advisor-marketing-content-strategy/> |
| Published | 2025-11-17 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S5 `#s6` ×2 |

The assigned reading for Session 5 on how prospects now find advisers through AI answers rather than search listings. The page carries one recommendation from it: establish a who-what-where (name and firm, niche, place) and repeat it consistently across platforms, because models and search engines rely on recognisable, repeated patterns.

### Wiz Research

**Wiz Research uncovers exposed DeepSeek database leaking sensitive information, including chat history**  
`src-deepseek` · evidence

| | |
|---|---|
| Author | Wiz Research |
| Publisher | Wiz blog |
| Link | <https://www.wiz.io/blog/wiz-research-uncovers-exposed-deepseek-database-leak> |
| Published | 2025-01-29 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s3` · S4 `#s9` |

A publicly reachable ClickHouse database belonging to DeepSeek held over a million lines of log streams, including chat history, API keys and back-end details, with no authentication. Wiz disclosed it and DeepSeek secured it promptly. The lesson uses it as the "logs" leak: the vendor's own record of what was typed.

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
| **Total references** | **20** |
| Cited in | S1 `#s2` · S1 `#s3` ×2 · S1 `#s4` · S1 `#s5` ×2 · S2 `#s1` ×2 · S2 `#s2` ×2 · S2 `#s3` ×2 · S2 `#s4` · S3 `#s2` ×2 · S3 `#s7` · S4 `#sWS` · S4 `#s9` · S5 `#sE3` ×2 |

The mechanism of next-token prediction, the temperature passage, tokenisation and the GPT-2 token values, embeddings and vector lengths, the parenthesis-counting limit, and the brain-scale comparison. A February 2023 essay describing a 2020-era model; three of its structural claims are stale and session-4 Appendix D3 is about exactly that.

### Writing an effective AI prompt for an audit

**Writing an effective AI prompt for an audit**  
`src-joa-prompt` · assigned_reading

| | |
|---|---|
| Author | **[UNVERIFIED, needs source]** |
| Publisher | Journal of Accountancy, A&A Focus newsletter (AICPA) |
| Link | <https://www.journalofaccountancy.com/newsletters/a-a-focus/writing-an-effective-ai-prompt-for-an-audit/> |
| Published | 2025-11 |
| Last retrieved | **[UNVERIFIED, needs source]** |
| Last verified by the instructor | **EMPTY** — no evidence in the repo that a human read it |
| Confidence | M |
| **Total references** | **2** |
| Cited in | S4 `#s7` ×2 |

The assigned reading for §07, from the Journal of Accountancy's A&A Focus series on AI in audit work. Its content is not characterised anywhere in the lesson.

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
| `src-anthropic-aup` | evidence |  | **NO — finding** |
| `src-uk-voice` | evidence |  | **NO — finding** |
| `src-fbi-ic3-2024` | evidence |  | **NO — finding** |
| `src-ferrari` | evidence |  | **NO — finding** |
| `src-gartner` | evidence |  | **NO — finding** |
| `src-hallowell` | fabricated | S4 | yes, by kind |
| `src-rr8513` | authority | S2 | yes, by kind |
| `src-rr200464` | authority | S2 | yes, by kind |
| `src-kessler` | fabricated | S2 | yes, by kind |
| `src-kitces-advisortech` | background |  | yes, by kind |
| `src-laplace` | background | S2 | yes, by kind |
| `src-morningstar` | background | S2 | yes, by kind |
| `src-sg-deepfake-2025` | evidence |  | **NO — finding** |
| `src-nikkei-papers` | evidence |  | **NO — finding** |
| `src-forcedleak` | evidence |  | **NO — finding** |
| `src-safebreach-gemini` | evidence |  | **NO — finding** |
| `src-surfshark` | evidence |  | **NO — finding** |
| `src-irc` | authority | S2 | yes, by kind |
| `src-woelbing` | authority | S2 | yes, by kind |
| `src-davidson` | authority | S2 | yes, by kind |
| `src-vectara` | evidence |  | **NO — finding** |
| `src-zhao` | evidence |  | **NO — finding** |
