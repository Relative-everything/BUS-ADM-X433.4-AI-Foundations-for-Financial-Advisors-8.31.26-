# Ledger: tooling-b (2026-10-27 register close-out)

Worker tooling-b. Rows: DW-104, DW-053, DW-140, DW-196, DW-162, DW-171. No HTML page was edited. Nothing committed.

## Edits

| File | What | Row |
|---|---|---|
| `scripts/editorial-regions.mjs` | **No net edit.** The fix (a single sequential scan so only a `<script` met outside an HTML comment opens an R2 span; the raw-text regex also fired on the words `<script src>` in session-0.1's head comment, line 10) was written, measured and REVERTED because it raises a figure. Before: session-0.1 R2 span lines 10 to 999, 83,798 bytes, pop 20,385 non-space chars; A9 0 literal / 0 entity; A8 majority literal, minority 0. After: largest R2 span 21,065 bytes, pop 20,798 chars; A9 0 literal / **1 entity** (the badge at session-0.1:596 `Shift+U &mdash; reveal all answer panels`, exactly the element the row named); A8 majority **flips literal -> entity**. verify-editorial went to 2 hard failures (A8 majority changed, A9 rose 0 -> 1 on session-0.1) and T7 failed. Every other lesson's A8/A9 figure was unchanged (session-1 1/51, session-2 2/28, session-3 3/3, session-4 1/2, session-5 1/2). A RISE may not be re-baselined by a worker, so the file is byte-identical to HEAD. The patch is appended below; applying it needs an instruction naming session-0.1 A9 entity 0 -> 1 and A8 majority literal -> entity / minority 0 (the dash is pre-existing prose that the classifier had been hiding, not a new dash). | DW-104 |
| `scripts/editorial-baseline.json` | `A8.files.session-3.minority` 15 -> 3 (measured over authoredProse: literal 3, entity 3, tie broken to literal so the majority stands). Dated 2026-10-27 note appended to `A8._` citing DW-053 and the D-063 precedent. `session_3_reconciliation` re-measured (whole-file `&mdash;` 3, authoredProse entity 3), the 2026-08 pair kept under `history_2026_08`. | DW-053 |
| `scripts/verify-stamps.mjs` (NEW) | Stamp check: for index.html, session-*/index.html, cases/*.html reads `Last updated YYYY-MM-DD` inside `<p class="stamp">`; expected = today UTC (`--today` override) when `git status --porcelain -- <file>` is non-empty, else `git log -1 --format=%ad --date=short -- <file>`. `--fix` rewrites the date only. One line per file, `summary: N stale`, exit 1 on stale. Usage in the header. **Not run with --fix.** | DW-140 |
| `scripts/verify-browser.mjs` | Check 13b retargeted: one target per page, the first `textarea, input[type="text"]` that focuses after scrollIntoView; if none focuses at load, the hiding ancestor is opened via its `[aria-controls]` button, else by lifting `.hidden`/display, and the PASS line says so. Pages with no text input print a skip with the count. The `coldPrompt` pass is gone. Checks 13, 14, 14b, 15 untouched. Header line for 13b updated. | DW-196 |
| `docs/changes/2026-10-04-session-5-interactivity/drags.mjs` | Prints which faces loaded (Source Serif 4, JetBrains Mono; from `document.fonts` FontFace status, with `fonts.check` shown beside it because check() is true for a family with no faces) and asserts the expected state as D-FONT per width. New `--fonts-blocked` mode routes fonts.googleapis.com / fonts.gstatic.com to abort. Summary line names the mode. Header documents both runs. | DW-162 |
| `docs/next-term/checks.mjs` | New section 7: session-1 `CASEF`/`CASEV` source text equals cases/case-1.html's (HARD, passes); session-3 six `c3chk` rows: count 6 on both and the six verdicts equal (HARD, passes), wording/label/turn differences printed as NOTE; session-5 `STEPS` `t` fields, `WHY` and `TRUTH/WHYOK` equal (HARD, passes), `res`/`see` differences as NOTE. Entities and whitespace normalised. | DW-171 |

## DW-171: what genuinely differs today (pages NOT edited)

- Case 3: row 3 turn column `4` (lesson) vs `turn 4, 5` (case page); row 5 label "The sale scenario was on my list" vs "The second scenario was on my list" and its quoted turn text (the case page avoids naming the sale, Part J); row 1 quoted text ("about three thousand a month more" vs "about three thousand more a month than she pays now"); verdict and reason columns are authored differently per page but the six verdicts agree (Matches, Kept out, Matches, Differs, Differs, Matches).
- Case 5: step 3 `res` ("...a table where the prompt asked for bullets" vs "...the layout. Here, bullets nested under bullets in 7 of 8 drafts") and `see` ("Only a test set sees it (Appendix E2)." vs "Only a counted test sees it: eight drafts, five checks."). The five steps, the four reasons and the key (TRUTH 1 / WHYOK a) agree.
- Case 1: identical.

## DW-140: current stamp state (check only)

All 12 pages stamped 2026-10-13. Expected today: 2026-10-16 for session-0.1 and cases/case-1..5 (last commit); 2026-10-27 for index.html and session-1..5 (modified in the worktree by other workers at run time, or committed today). `summary: 12 stale`.

## DW-196: 13b population

Was: 0 pages tested (every page skipped). Now: 8 PASS (session-0.1 #blTask, session-1 #closeAns after 22 unfocusable boxes, session-2 unnamed textarea, session-3 #c3List, session-4 #lmPrompt after opening #lmBody via its button, session-5 #c5Ct0 after lifting #c5Reveal, case-2 #ceWhy, case-3 #c3List); 3 skips with count 0 (case-1, case-4, case-5); hub excluded as before.

## DW-162: drags.mjs

Fonts load in this container (Google Fonts reaches through the proxy). `node drags.mjs session-5/index.html`: 38 PASS, `summary: all passed (fonts allowed)`; `--fonts-blocked`: 38 PASS, `summary: all passed (fonts blocked)` (36 drag/layout + 2 D-FONT each way). Under --fonts-blocked `fonts.check` still answers true with 0 faces, which is why the loaded state is read from FontFace status.

## Check output (last lines)

```
node scripts/verify-editorial.mjs        summary: 17 rule(s) clean, 0 hard failure(s), 1 advisory
node scripts/test-editorial-regions.mjs  summary: 9 passed, 0 failed
node scripts/verify-migration.mjs        summary: 16 passed, 0 failed
node scripts/verify-case.mjs             summary: 12 of 12 lessons carry the current CASE.md v5.0 block
node docs/next-term/checks.mjs           summary: 0 failure(s)
node scripts/verify-stamps.mjs           summary: 12 stale (today 2026-10-27)   [exit 1, expected]
node scripts/verify-browser.mjs          summary: 0 failure(s). Screenshots in <SHOT_DIR>   (162 PASS)
drags.mjs                                summary: all passed (fonts allowed) / summary: all passed (fonts blocked)
```

## Not done, and why

- DW-104's classifier fix is not applied: it raises session-0.1 A9 (0 -> 1 entity) and flips A8's majority, and the brief forbids a worker re-baselining a rise. The row itself predicted this ("the fix and its re-baseline are one instructed edit"). Patch below.
- `verify-stamps.mjs --fix` not run, per the brief.

## Appendix: the reverted DW-104 patch (`git apply` against HEAD's scripts/editorial-regions.mjs)

```diff
diff --git a/scripts/editorial-regions.mjs b/scripts/editorial-regions.mjs
index 9bdb47c..1806ab3 100644
--- a/scripts/editorial-regions.mjs
+++ b/scripts/editorial-regions.mjs
@@ -149,11 +149,37 @@ export function classify(text) {
   }
 
   /* R2 — script. The whole element is claimed so script CODE is never R1; the
-     student-visible part is the literals, returned separately. */
+     student-visible part is the literals, returned separately.
+
+     DW-104 (2026-10-27): the span must open on a REAL <script> tag. A plain
+     regex over the raw text also fired on the words "<script src>" inside the
+     head comment of session-0.1 (line 10) and ran R2 from there to the first
+     </script>, swallowing the head, the topbar and every section down to line
+     999 (83,798 bytes) into "script string literal", which authoredProse masks
+     out. The scan below walks the text once: whichever of "<!--" or "<script"
+     comes next wins, a comment is skipped to its "-->" (R5 claims it later),
+     and only a <script> met outside a comment opens a span. R5 still runs after
+     R2, so an HTML-comment-shaped sequence inside a script body stays R2 as it
+     always did. */
   const scriptSpans = [];
   {
-    const rx = /<script\b[^>]*>[\s\S]*?<\/script\s*>/gi;
-    let m; while ((m = rx.exec(text))) { claim(m.index, m.index + m[0].length, 'R2'); scriptSpans.push([m.index, m.index + m[0].length]); }
+    const next = /<!--|<script\b[^>]*>/gi;
+    const close = /<\/script\s*>/gi;
+    let i = 0, m;
+    while (i < text.length && (next.lastIndex = i, (m = next.exec(text)))) {
+      if (m[0] === '<!--') {
+        const end = text.indexOf('-->', m.index + 4);
+        i = end < 0 ? text.length : end + 3;
+        continue;
+      }
+      close.lastIndex = m.index + m[0].length;
+      const c = close.exec(text);
+      if (!c) break;
+      const e = c.index + c[0].length;
+      claim(m.index, e, 'R2');
+      scriptSpans.push([m.index, e]);
+      i = e;
+    }
   }
 
   /* R5 — HTML comments not already claimed as R6. */
```
