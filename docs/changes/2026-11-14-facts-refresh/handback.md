# Facts and sources refresh, 2026-11-14: handback

Branch `claude/kind-heisenberg-k8wote`. Decisions D-100 to D-106. Register rows DW-198 to DW-208.

## What was asked

Review all deferred work and every claimed fact and source; give a refresh audit
ranked by priority in two groups (quantifiably wrong, and optional or less proven);
then, by the instructor's answers the same day, apply the first group in the
repository, keep the NBER figures for Brynjolfsson, keep Opus 5.5 as the console
default, and re-read the blocked sources once their hosts were allowed.

## How each claim was checked

| Evidence | Means | Where |
|---|---|---|
| Read | the page at the record's own link was fetched and its text read today | Anthropic (platform.claude.com, claude.com, support.claude.com, anthropic.com, privacy.claude.com); arxiv.org; kitces.com; morningstar.com; nber.org; genai.owasp.org; developers.openai.com; artificialanalysis.ai; livebench.ai |
| Search result | a search returned text from the publisher's own domain; the page was not fetched | sec.gov, finra.org (24-09 itself was read), eur-lex, the state legislatures, OpenAI help, Google, Microsoft, Arena |
| Secondary | trade press or law-firm summaries only | IBM, FBI IC3, Forbes, the Arup reporting |

`retrieved` and `last_retrieved` moved only for the first row (D-105). No
`last_verified` was written: that field is the instructor's (MAINTAINING, *The two
dating fields*).

## The personal environment

`x433-ai-foundations-sources`, created 2026-11-14 with the instructor's approval,
allows: www.sec.gov, www.finra.org, www.federalregister.gov, eur-lex.europa.eu,
leg.colorado.gov, le.utah.gov, arxiv.org, www.nber.org, academic.oup.com,
www.kitces.com, corporate.vanguard.com, www.morningstar.com, t3technologyhub.com,
artificialanalysis.ai, arena.ai, livebench.ai, developers.openai.com,
genai.owasp.org, www.businesswire.com, privacy.claude.com. Six of them still refuse
a plain fetch (DW-203).

## What was changed, and what was left

Changed: see `CHANGELOG.md`, 2026-11-14. Left on purpose, each with a row: the
Session 5 calendar, the Case 4 capture, the console fence's price key and the dated
Session 2 sentence (DW-206); the leaderboards and OpenAI rates (DW-205); the FY2027
examination priorities (DW-204); the EU, Colorado and Utah records (DW-207); the
small repairs and the consumer-training wording (DW-208).

## One date

`claude-sonnet-4-5-20250929` retires on 30 November 2026. Case 5's baseline capture
and three Session 5 references run on it (term-start checklist item 13).

## Arithmetic behind the Session 1 change

At 108,000 input and 11,000 output tokens, per million-token rates:

| Tier | Input | Output | One pass |
|---|---|---|---|
| Haiku 5.5, over 100K | 108,000 x $0.50 = $0.054 | 11,000 x $2.50 = $0.0275 | $0.08 |
| Sonnet 5.5 | 108,000 x $2 = $0.216 | 11,000 x $10 = $0.11 | $0.33 |
| Opus 5.5 | 108,000 x $4 = $0.432 | 11,000 x $20 = $0.22 | $0.65 |
| Fable 5.2 | 108,000 x $8 = $0.864 | 11,000 x $40 = $0.44 | $1.30 |

Spread $1.304 less $0.0815 = $1.22.
