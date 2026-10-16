# Plan: Claude API keys in the live model console, 2026-10-16

Branch `claude/peaceful-edison-n73y17`, from `main` at the 2026-10-13 next-term merge.
Request, verbatim in intent: *update every lesson that accepts a Google Gemini API key
and now also allow Anthropic Claude API keys, so students can use the instructor's
Max-plan API credit.* Tree facts below were measured on the branch before any edit.

## 0. Bottom line

Two lessons accept a key, Session 1 (`LMBOX v1`, `LM v1`) and Session 4 (`LMBOX-S4 v1`,
the same `LM v1`); Sessions 2, 3, 5, the setup page, the hub and the case pages carry no
console and cite Gemini only as a source. The change is one call layer that reads the
vendor off the key's prefix, one request builder shared by the send and Session 4's
request preview, box copy that names both vendors and the terms behind each, and a test
suite that mocks both endpoints. Scope is the two lessons, the suite, the maintenance
record and three source records. The alternative, a second console box per vendor, was
rejected: it doubles the fenced markup the pairing check protects and teaches nothing the
one box does not.

## 1. What is true on the tree (H)

| Fact | Where |
|---|---|
| Session 1 and Session 4 are the only pages that take a key | `grep -l generativelanguage` over every served page |
| `LM v1` is byte-identical in both (md5 `b1139a6e`); `LMBOX v1` is Session 1's only; Session 4 has `LMBOX-S4 v1` | the pre-push pairing loop |
| The call layer is plain ES5 with `fetch`; the key lives in `LM.key` only | `MAINTAINING.md`, "The live model console" |
| Four call sites: the free-form box (700 tokens, temperature 1), the Kalai probe (64, temperature 1), Appendix A6's temperature panel (160, temperature 0 to 2), Session 4's send (700, temperature 1) | `grep -n 'lmCall('` |
| Session 4's "See the request" rebuilds the Gemini body by hand, separately from the send | `session-4/index.html`, `build()` in the live hooks |
| `scripts/test_live_console.js` passes 75 of 75 against a mocked Google endpoint | run 2026-10-16 before any edit |
| R11 (byte-shared boilerplate) is ratcheted at 23 `&mdash;` corpus-wide; `LMBOX` holds 4 | `scripts/editorial-baseline.json`, measured |

## 2. What is true of the Claude API (sources on each line)

| Fact | Tag | Source |
|---|---|---|
| Max 5x plans carry $100 a month of API credit; every key and workspace in the linked Console organisation draws on one balance; a workspace spend limit caps a project; when the balance is gone requests stop and nothing is charged to the plan | H | platform.claude.com/docs/en/about-claude/api-credits-for-subscribers, read 2026-10-16 |
| Keys begin `sk-ant-` and are created at platform.claude.com/settings/keys | H | platform.claude.com/docs/en/get-api-key |
| A browser call needs the header `anthropic-dangerous-direct-browser-access: true`; the SDK sends it only under `dangerouslyAllowBrowser` | M | TypeScript SDK docs page plus `src/client.ts` in anthropic-sdk-typescript |
| `GET /v1/models` returns `data[]` with `id`, `lifecycle`, `capabilities.thinking.types.disabled.supported`, `capabilities.effort.low.supported` | H | platform.claude.com/docs/en/api/models/list |
| `temperature`, `top_p`, `top_k` at any non-default value return 400 on Opus 4.7 and later; 4.6 and earlier accept them; on Haiku 5.5 `temperature` must be 1 if sent | M | Opus 5.5 and Haiku 5.5 migration guides |
| Thinking tokens count toward `max_tokens`; a small ceiling can stop on `max_tokens` before any text | H | Haiku 5.5 migration guide, "Configure thinking" |
| Error types: 401 authentication, 402 billing, 403 permission, 404 not found, 429 rate limit, 529 overloaded | H | the bundled Claude API skill's error table, matching the API error docs |

## 3. Design

1. **Vendor from the key.** `lmIsClaudeKey()` tests `^sk-ant-`. Nothing is sent before
   Connect; Connect sends to one vendor's `/models`. `lmForget()` resets to Google.
2. **One builder.** `lmBuild(prompt, opts)` returns `{url, headers, body, model}` for
   either vendor. `lmCall()` sends it; Session 4's preview prints it with the key masked.
   The preview and the send cannot drift, which the suite asserts byte for byte.
3. **Claude thinking.** Off where `capabilities.thinking.types.disabled.supported` is
   true; otherwise `output_config.effort: low` where `effort.low` is supported, and
   `max_tokens` raised to at least 2048. The connect message says so.
4. **Claude temperature.** Never sent at 1 (the default). At any other value, sent only
   to a model whose id is 4.6 or earlier (`lmSamplingOK`); the A6 panel routes to the
   newest such model the key reaches (`lmSamplingModel`) and names it on the row.
5. **Replies.** Text blocks joined; usage normalised to `promptTokenCount` and
   `candidatesTokenCount` so no page hook changes shape; `refusal` and an all-thinking
   `max_tokens` stop are errors with their own sentences.
6. **Copy.** Both boxes name the two addresses, the prefix rule, the Commercial Terms
   (no training, 30 days) and the class-balance behaviour, each with a chip. Session 4
   fixes DW-177 and explains the browser-access header. R11's `&mdash;` count is held at 4.
7. **Default model.** `claude-opus-5-5`, the current Opus; the selector lists every
   active model so the instructor can pick Haiku 5.5 for a cheaper class run. Ratification
   and the headroom figure are DW-186.

## 4. Out of scope, on purpose

- Sessions 2, 3 and 5 and the setup page: no console, by the standing rule.
- Per-model pricing in Session 4's cost line (DW-185).
- Streaming, system prompts, multi-turn: the console is one prompt, one reply.
- Any change to the Gemini path's behaviour or wording beyond the shared sentences.

## 5. Verification planned

The console suite with Claude sections; `verify-sources`, `inject-sources --check`,
`verify-facts`, `verify-editorial`, `test-editorial-regions`, `verify-migration`; the
storage grep; the two-origin grep; the md5 pairing on `LMSTYLE v1` and `LM v2`;
`validate_lesson.py` on both lessons against the pre-change failure counts (25 and 66,
all pre-existing `V2` href and `V6` band findings).
