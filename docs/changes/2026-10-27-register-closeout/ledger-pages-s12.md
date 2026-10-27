# Ledger: pages-s12 (session-1 and session-2), 2026-10-27 register close-out

Files edited: `session-1/index.html`, `session-2/index.html`. Every edit is outside the STYLE, CASE, SOURCES, READINGS, APX*, LMSTYLE, LM and LMBOX fences. No writer script was run; nothing committed.

## Edits

| # | File | What | Row |
|---|---|---|---|
| 1 | session-1/index.html (footer, was :2209) | The *Confidence labels* legend's three `.conf` spans are now `.lgd h/m/l`, a legend-only class with the same look as `.conf` and no `data-src`. New rule pair `.lgd`, `.lgd.h/.m/.l` added beside the page's own `.conf` rules (outside the fence). | DW-020 |
| 2 | session-2/index.html (footer, was :2105) | Same legend conversion; `.lgd` rules added beside the page's `.conf` rules (this page's chip look: `--on-bg` tint, `vertical-align:middle`, `margin-left:6px`). | DW-020 |
| 3 | session-2/index.html :1878 area | F-115 reworded: *This course's own threshold, not a published one: a template that scores below 5 of the 8 will not survive a handoff.* The 8 is the self-audit's own denominator (`rubricOut` prints `SCORE n / 8`; bands at 7 and 5). No dash. | DW-110 |
| 4 | session-2/index.html, end of §07 (last core section, before the `.cards` block that holds the READINGS fence) | Added `<div class="talk"><span class="th">Closing check &middot; in chat, one line each, against this session's one sentence</span>...` in the session-3 form. One sentence, tied to the §00 lede (*The model samples a plausible answer. It does not compute the true one.*): name one step in the workflow built this session where a plausible answer would pass for the true one, and the check that catches it before a client sees it. No eyebrow minute or timing-table change; V5 still 150 = 150 = 150. | DW-152 |
| 5 | session-1/index.html page CSS | `@media (max-width:480px){.mtx,table.dt{display:block;overflow-x:auto;max-width:100%}}` after the page's `.mverdict` rule. Playwright at 320 px found `table.mtx` (§ "Ask the question three times" scoring matrix, right edge 344) and a `table.dt.tight` in `#s14b` (right edge 333). Both now scroll inside their own box. No content change. | DW-161 |
| 6 | session-2/index.html page CSS | `.readlist a{overflow-wrap:anywhere;word-break:break-word}`. The only overflowing element at 320 and 380 was the bare `support.claude.com/...` URL in the Session 3 reading list (inside the READINGS fence; the fix is CSS outside it). | DW-161 |
| 7 | session-2/index.html page CSS | `.tg` toggles: `.tg{position:relative}`, the hidden checkbox changed from `width:0;height:0` to the 1px visually-hidden pattern (`clip`, `clip-path`, `pointer-events:none`), and `.tg:has(input:focus-visible){outline:2.5px solid var(--on);outline-offset:3px}`. Finding on the way: a 0px checkbox is not focusable in Chromium, so the six toggles were unreachable by keyboard at all, not just unringed. Verified in Playwright: Tab lands on each `cb*` input, the label shows the teal ring (screenshot), Space toggles and fires the existing `onchange`, mouse click behaviour unchanged against the HEAD copy. | DW-190 (PL-004) |
| 8 | session-2/index.html page CSS | Removed dead rules: `#topbar .tb-r`, `#topbar kbd`, `.pace p`, `.verify` (three lines). Each selector matches nothing in the markup and no script adds the class or id (`#paceOut` is filled with `.pgrid/.pcell`, no `<p>`). `.rnote` (two lines) KEPT: `<div class="rnote">` is live at the §02 pointer to B3. The fence's own copies of `.verify` untouched. | DW-190 (PL-035) |
| 9 | session-1/index.html page CSS | Removed the orphan `.verify` / `.verify .vh` / `.verify ul, li` rules (three lines). No `class="verify"` in the markup; the only JS hit is `k:'verify'`, a `data-ci` key in the account-setup builder, not a class. | DW-190 |

## What could not be done

- DW-020's stated verification target (*the V4 "without data-src" line is gone*) is not reachable by the legend change. The skill's `validate_lesson.py` already exempts up to three bare chips in the footer paragraph that begins *Confidence labels* (see its V4 comment); the 3 (session-1) and 2 (session-2) it reports are the `data-fact`-only chips (session-1 :1874, :1875, :2047; session-2 :1587, :1593), which the brief says stay. The legend conversion is still done per D-12 and removes the legend from every `.conf` count (A15, V4, migration check 18 all unchanged, all green), but V4 still prints `3` and `2`. Closing that line needs either a `data-src` on those `data-fact` chips or a validator-side exemption for `data-fact`; both are curriculum or skill decisions, not page edits.

## Measurements (Chromium, Playwright, file://)

| page | 320 | 380 | 760 | 1280 |
|---|---|---|---|---|
| session-1 before | 344 | 380 | 760 | 1280 |
| session-1 after | 320 | 380 | 760 | 1280 |
| session-2 before | 412 | 412 | 760 | 1280 |
| session-2 after | 320 | 380 | 760 | 1280 |

Dashes: session-1 61 em/en dash occurrences at HEAD and now; session-2 34 at HEAD and now; zero in added lines.

LM fence pairing (MAINTAINING "The live model console" loop), unchanged before and after: LMSTYLE v1 `f364fc79812d7918a181643a93ada852` in session-1 and session-4; LM v2 `4d5da521045294e2314d79c32f3aca57` in both.

## Check output

- `validate_lesson.py session-1/index.html | grep -v "V2 "`: V1, V3, V5, V6 types/consecutive, V8, V9 x2, V10 PASS; FAIL V4 `3 .conf chip(s) without data-src` (data-fact chips, see above; unchanged); FAIL V6 `18 distinct interactions (band 13-15)` (known). `RESULT: FAIL (29 fail, 1 warn)`, same as before the edits.
- `validate_lesson.py session-2/index.html | grep -v "V2 "`: V1, V3, V5, V6 types, V9 x2, V10 PASS; FAIL V4 `2 .conf chip(s) without data-src` (unchanged); FAIL V6 22 interactions and consecutive builder-assembler / work-along-gate (known); FAIL V8 Shift+U (known, by design); WARN V4 seven unreferenced footer sources (pre-existing). `RESULT: FAIL (26 fail, 2 warn)`, same as before.
- `node scripts/verify-editorial.mjs`: `summary: 17 rule(s) clean, 0 hard failure(s), 1 advisory` (A12, session-1:1716 Wolfram quotation, pre-existing, not touched).
- `node scripts/test-editorial-regions.mjs`: `summary: 9 passed, 0 failed`; T7 reproduces the A9 baseline exactly (session-1 1 literal / 51 entity, session-2 2 literal / 28 entity). Counts did not rise.
- `node scripts/verify-migration.mjs`: `summary: 16 passed, 0 failed`.
- `node scripts/verify-case.mjs`: layout line `the 20 lesson-local .case-* rules agree in all 12 lessons`; artwork line all 7 figures match.
- `node scripts/test-case-viewer.mjs`: `summary: 0 failure(s)`.
- `node scripts/test_live_console.js`: `137 passed, 0 failed`.
- `node docs/next-term/checks.mjs`: `summary: 0 failure(s)`.
- `node scripts/verify-browser.mjs`: `summary: 0 failure(s). Screenshots in .verify-shots` (exit 0).
