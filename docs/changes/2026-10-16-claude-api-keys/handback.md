# Handback: Claude API keys in the live model console, 2026-10-16

Branch `claude/peaceful-edison-n73y17`. Plan in `plan.md`, edits in `ledger.md`.

## Bottom line

Sessions 1 and 4, the only two pages that take a key, now take a Claude API key as well
as a Gemini key. The vendor is read off the key's `sk-ant-` prefix, the request is built
in one place for both vendors, and the browser suite passes 133 of 133 with both endpoints
mocked (75 before, all 75 still passing). Nothing changed for a reader with no key, and
nothing changed in the Gemini path's behaviour or wording.

What the instructor still has to do, in order, before a class uses it:

1. In the Console organisation linked to the Max plan, create a workspace for the course
   and set its spend limit (the credit is one balance per organisation; a workspace limit
   is the only cap). Create the class key in that workspace with an expiry on the term's
   last day. Source: `src-anthropic-api-credits`, H.
2. Paste that key into Session 1 once, run the Kalai probe and the free-form box on
   `claude-opus-5-5`, and read the out counts: DW-186 asks whether 2048 tokens of headroom
   is the right floor and whether Opus 5.5 or Haiku 5.5 should be the default.
3. Decide how the key reaches students. A key in a browser is visible to whoever holds the
   page open, so hand it out in class, not in the repository or the LMS, and rotate it
   after the term. The box says as much in its own copy.

## What a reader sees

- **Session 1, the box.** The key label reads *Gemini API key, free, from
  aistudio.google.com/apikey, or Claude API key from platform.claude.com/settings/keys*.
  The check-the-page paragraph names both addresses and the prefix rule. The warning
  paragraph keeps Google's free-tier sentence and adds, with H chips, that a Claude key
  runs under the Commercial Terms (no training, 30-day retention) and that a
  course-workspace key draws on a class balance that stops when spent, with nothing
  charged to the student. On connect the status line reads *Connected · claude-opus-5-5*
  and the message says *Live on Anthropic*, plus one sentence about effort and thinking
  tokens on models that cannot switch thinking off.
- **Session 1, Appendix A6.** The temperature panel's note is vendor-neutral and says why
  a Claude key runs on an older model; each run row names the model used.
- **Session 4, the box.** Same copy, in Session 4's register, plus: Plan C is now placed
  in Appendix D2 and Prompt D in §03 (DW-177), and the request paragraph explains the
  `anthropic-dangerous-direct-browser-access` header. *See the request* prints the
  Anthropic request under a Claude key, with the version and browser-access headers and
  the key masked, and the body sent is byte for byte the body shown (asserted). Without a
  key it prints the Gemini request and names the Claude alternative. The cost line, under
  a Claude key, says the model's own rate is the Haiku figure or higher and that thinking
  tokens are in the out count.

## Verification

| Check | Before | After |
|---|---|---|
| `scripts/test_live_console.js` (Chromium, both endpoints mocked) | 75 passed, 0 failed | **133 passed, 0 failed** |
| md5 pairing, `LMSTYLE v1` | `f364fc79` both | `f364fc79` both |
| md5 pairing, `LM` | v1 `b1139a6e` both | v2 `4d5da521` both |
| Storage grep (`localStorage`, `sessionStorage`, `indexedDB`, `document.cookie`) | empty | empty |
| Origin grep: `generativelanguage` or `api.anthropic.com` outside Sessions 1 and 4 | empty | empty |
| `verify-sources.mjs`, `inject-sources.mjs --check` | 11 of 11 current | 11 of 11 current |
| `verify-facts.mjs`, `build-facts-md.mjs --check` | clean | clean |
| `verify-editorial.mjs` | 17 clean, 0 hard, 1 advisory (A12, pre-existing) | same |
| `test-editorial-regions.mjs` | 9 passed | 9 passed |
| R11 `&mdash;` in `LMBOX` | 4 | 4 (ratchet held) |
| `verify-migration.mjs` | 16 passed | 16 passed |
| `verify-case.mjs`, `inject-case.mjs --check` | current | current |
| `verify-browser.mjs` (all pages, Chromium) | not run before | 0 failures |
| `verify-style.mjs` | FAIL, 13 lessons stale against the skill | PASS (see the sweep note) |
| `validate_lesson.py` session-1 | 25 fail | 29 fail: the 4 new are `V2`, one per new footer link |
| `validate_lesson.py` session-4 | 66 fail | 68 fail: the 2 new are `V2`, one per new footer link |
| `case-inventory.mjs --report-check` | WOULD CHANGE `docs/case-fact-inventory.md` | same (pre-existing; reproduced on the stashed tree) |

Every `validate_lesson.py` failure before and after is a `V2` href match (MAINTAINING: "V2
matches any `href`"), the `V6` interaction band, or the three pre-existing `V4` chips.

**The sweep note.** `scripts/build-changelog.py`, run to render the changelog entry, calls
the skill's `restyle_sweep.py` over the repository as MAINTAINING documents. The skill on
this host is newer than the fences, so the sweep rewrote the STYLE fence in all 13
documents: two lines each, the payload stamp and `.hidden{display:none!important}`. That
is the work DW-184 asks for and it turned `verify-style.mjs` green, so it is kept, in a
commit of its own after this change's commit, and `git revert` of that one commit restores
the old fences if the `!important` is not wanted. The console suite and `verify-browser`
both ran on the swept files.

## Decisions taken here, for ratification

| | Decision | Alternative | Why |
|---|---|---|---|
| 1 | Vendor from the key prefix, no selector | A Gemini/Claude dropdown | Every Claude key begins `sk-ant-` (H, `get-api-key`); one fewer control, and the box's "never both" promise is enforced by the prefix rather than by the reader. |
| 2 | Default `claude-opus-5-5` | `claude-haiku-5-5`, forty times cheaper on input | The current Opus is the model the course teaches against and the credit exists to be spent; at 40 calls a page and these prompt sizes a class of 30 across both pages is under $10 at Opus rates (INF 70-85%, from the price table and the suite's token counts, not from a measured run). DW-186 holds the measurement. |
| 3 | Thinking off where the model allows, else `effort: low` and 2048 headroom | Always 2048; or `effort` alone | Where thinking can be off, the lesson's own ceilings (64, 160, 700) stay exact. The 2048 figure is the guess DW-186 records. |
| 4 | A6 routes a Claude key to the newest 4.6-or-earlier model | Drop the panel under a Claude key; or send `temperature` and show the 400 | The panel exists to show that temperature is real; showing it on Sonnet 4.6 and naming the model keeps the lesson, and the 400 is a worse lesson than a footnote. |
| 5 | Session 4 prices every model at the Haiku floor, with one sentence | A per-model price table | Four more volatile facts on a line most readers never see; DW-185. |

## Red team

The strongest case against this change is the key itself. A workspace key with a spend
limit in a browser is still a shared secret in thirty browsers, and the Max credit is one
balance for the whole linked organisation: a leaked class key spends the instructor's own
API month, not a sandbox. The page says a key belongs on a server, and then takes one in
a box. The 2026-08-22 feasibility analysis rejected a shared Gemini key on exactly this
ground; what has changed is that the Commercial Terms remove the data objection and a
workspace limit caps the money, not that the exposure is gone. If the exposure is not
acceptable, the alternative that keeps the pedagogy is a projector-only key held by the
instructor, which the console supports unchanged.

The assumption most likely to be wrong is the 2048-token headroom at `effort: low` on
Opus 5.5. If a probe ends on `max_tokens` after thinking, the reader sees an error
sentence and the captured output, not a broken page, so the failure is soft; but it would
make the live demonstration on the default model unreliable in front of a room, which is
the one place it matters. DW-186 is the check.
