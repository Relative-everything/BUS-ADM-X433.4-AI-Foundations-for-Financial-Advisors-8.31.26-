# Ledger: worker pages-s34 (session-3 and session-4), 2026-10-27 register close-out

Files edited: `session-3/index.html`, `session-4/index.html`, `scripts/test_live_console.js` (one test block extended). Nothing inside a STYLE, CASE, SOURCES, READINGS, APX*, LM, LMBOX-S4 or LMSTYLE fence was changed; the two byte-paired fences still match session-1 (md5 pairs below). No commit.

| # | File | Where | What | DW row |
|---|------|-------|------|--------|
| 1 | `session-3/index.html` | §00 "The ladder" list, line ~1148 | `<b>Tonight.</b> Grounding:` becomes `<b>This session.</b> Grounding:` | DW-075 |
| 2 | `session-3/index.html` | same list, line ~1149 | `how often it happens (tonight)` becomes `how often it happens (this session)` | DW-075 |
| 3 | `session-3/index.html` | §00 objective panel label, line ~1154 | `Tonight's one thing` becomes `This session's one thing` | DW-075 |
| 4 | `session-3/index.html` | §04 copy-button lead, line ~1614 | `Tonight everyone's source is the §04 summary` becomes `Everyone's source is the §04 summary` | DW-075 |
| 5 | `session-3/index.html` | §07 closing check, line ~1861 | `against tonight's one thing` becomes `against this session's one thing`; `hand to a tool tonight` becomes `hand to a tool this week` | DW-075 |
| 6 | `session-3/index.html` | page CSS, after the `figcaption` rule (line ~619) | added `figcaption .conf{white-space:normal}`. The 320 px overflow was the slope chart's figcaption chip `<span class="conf m">M, rank order inferred</span>`: `.conf` is `white-space:nowrap`, so a 285 px chip pushed `scrollWidth` to 326. Re-measured in Chromium: 320 / 380 / 760 / 1280 px all equal the viewport. | DW-161 |
| 7 | `session-3/index.html` | page CSS, lines 658-660 (outside the STYLE fence, which ends at 448) | removed the orphan `.verify`, `.verify .vh`, `.verify ul/li` rules. The page has no `.verify` element and no script adds the class. The matching rules at lines 163-183 sit inside the STYLE fence and are left to the sweep. | DW-190 |
| 8 | `session-4/index.html` | page CSS, lines 691-693 (outside the STYLE fence) | same orphan `.verify` / `.vh` removal, same confirmation (no element, no script). Lines 163-183 inside the fence left alone. | DW-190 |
| 9 | `session-3`, `session-4` | focus rings | audited, no edit needed: both pages carry a page-level `:focus-visible{outline:2.5px solid var(--on)...}` rule outside the fence (S3 line 520, S4 line 553) and no control class sets `outline:none` without a `:focus-visible` complement (S4 `.cr-hit`, `.s4-pl` both have one; `.lmkey:focus` is inside LMSTYLE). A Playwright pass focused every distinct button class (14 on S3, 33 on S4) and found none that matched `:focus-visible` with `outline-style:none` or width 0. | DW-190 |
| 10 | `session-4/index.html` | live hooks, outside the LM fence (`var LM_PRICE`, line ~11595) | replaced the single Haiku-floor `LM_PRICE` with `LM_PRICES`, a four-row table keyed `haiku-5-5`, `sonnet-5-5`, `opus-5-5`, `fable-5-1`, values read from `facts/FACTS.json` (Haiku $0.10/$0.50 up to 100K prompt tokens, $0.50/$2.50 above; Sonnet $2/$10; Opus $4/$20; Fable $10/$50), each note carrying a literal `<span class="conf h" data-src="src-pricing" data-fact="claude-api-price-...">H</span>` chip (the Haiku chip keeps `claude-output-input-ratio`). `LM_PRICE` remains as the Haiku row plus a `floor` sentence. Added `lmPriceFor(model)` (regex on family-major-minor, so a dated suffix still matches) and `lmUsd(p,tin,tout)` (applies the Haiku tier). The hook comment at the top of the block was updated. | DW-185 |
| 11 | `session-4/index.html` | the `#lmFreeUse` MutationObserver (line ~11640) | the regex now also captures the model id the fence appends (`in N tokens · out N tokens · <model>`). Under a Claude key with a known model the line reads "A Claude key is billed at the rate of the model that answered. <Model>, at <rate + chip>: about $X for this reply, against the balance behind the key." followed by either "This model thinks before it answers; the thinking tokens are billed as output and the out count of N includes them." (model cannot switch thinking off, read through the fence's own `lmCap(model,'thinking.types.disabled')`) or "Thinking is off for this model, so the out count is the reply alone." An unknown Claude model falls back to the previous Haiku-floor sentence ("this figure or higher"); the Gemini sentence is unchanged. | DW-185 |
| 12 | `scripts/test_live_console.js` | section V (session-4, Claude key) | four assertions added after the existing cost-line test: Opus 5.5 default prices 13 in / 9 out at $0.00023 and names the model; the thinking sentence names the out count; switching to `claude-haiku-5-5` gives $0.00001 with "Thinking is off"; switching to `claude-sonnet-4-6` (absent from the table) falls back to the floor sentence. 133 tests became 137. | DW-185 |

## Limits

- **Thinking tokens are not shown as a separate figure.** The brief asked for them split out. The LM v2 fence normalises the Anthropic `usage` object to `{promptTokenCount, candidatesTokenCount}` from `input_tokens` / `output_tokens` and writes only "in N · out N · model" into the DOM; Anthropic's Messages `usage` object itself reports no thinking-token field (thinking is billed as output and folded into `output_tokens`), and Gemini's `thoughtsTokenCount` never leaves the fence. Without a fence edit (v3, byte-paired with session-1) there is no separate count to print, so the line says the out count includes the thinking tokens and that they are billed at the output rate. If a split is still wanted it is a fence bump: expose `usage.thoughtsTokenCount` for Gemini and, for Claude, at best the absence of a field.
- FACTS `applies_to` for the four price records lists sessions 0.1, 1, 2 and 5, not session-4; `verify-facts.mjs` does not check `applies_to` against the citing page, so this is informational. The register owner may want to add `session-4` to those four arrays (I did not edit FACTS.json; not in my brief).
- `verify-facts.mjs` reports 10 (b) staleness lines (records retrieved 2026-10-11, window 14 days); pre-existing, not from this work, FACTS.json untouched.
- `verify-browser.mjs` reports one failure: `session-5/index.html` 14b "SESSION MODEL" SVG label outside its viewBox. Session-5 is another worker's file (modified in the tree); sessions 3 and 4 pass every browser assertion including 15 (no overflow at 1280).
- `validate_lesson.py` output for both pages is identical to HEAD apart from the expected lines (S3 word count 15439 to 15443; S4 chip count 337 to 340). The V6 band failure is the known one.

## Check output (last lines)

```
grep -nwi "tonight\|today" session-3/index.html   -> remaining hits are CASE data (:948), the title WealthTech Today (:1665, :1676, :1712, :1904), a synthetic recap "thank you for today" (:2875) and "this session" (:2047); no deixis
LM fence md5 pairs (session-1 / session-4):
  f364fc79812d7918a181643a93ada852  LMSTYLE v1 (both)
  4d5da521045294e2314d79c32f3aca57  LM v2 (both)
Chromium scrollWidth session-3: 320 -> 320, 380 -> 380, 760 -> 760, 1280 -> 1280; session-4 at 320 -> 320
node scripts/verify-editorial.mjs        summary: 17 rule(s) clean, 0 hard failure(s), 1 advisory   (A12 session-1, pre-existing)
node scripts/test-editorial-regions.mjs  summary: 9 passed, 0 failed   (A9 session-3 3 literal / 3 entity, session-4 1 literal / 2 entity, unchanged)
node scripts/verify-migration.mjs        summary: 16 passed, 0 failed
node scripts/verify-case.mjs             summary: 12 of 12 lessons carry the current CASE.md v5.0 block
node scripts/test-case-viewer.mjs        summary: 0 failure(s)
node scripts/verify-facts.mjs            OK (a), FAIL (b) 10 stale high-volatility records (pre-existing), OK (c) every cited FACTS id exists; summary: 10 failure line(s)
node scripts/test_live_console.js        137 passed, 0 failed
node docs/next-term/checks.mjs           summary: 0 failure(s)
node scripts/verify-browser.mjs          summary: 1 failure(s)   (session-5 14b, not this worker's file; sessions 3 and 4 all PASS)
validate_lesson.py session-3 | grep -v "V2 "   RESULT: FAIL (17 fail, 1 warn)  identical to HEAD apart from the word count
validate_lesson.py session-4 | grep -v "V2 "   RESULT: FAIL (68 fail, 2 warn)  identical to HEAD apart from the chip count
git diff of my two pages: 0 em/en dashes added, 0 grading/LMS/storage words added
```
