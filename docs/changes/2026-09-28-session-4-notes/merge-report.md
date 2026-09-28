# Merge report: origin/main into `claude/gracious-cray-2k4fkc`, 2026-09-28

Merge commit `0244094`, made on top of `be54621` (the three small edits that had not reached the
remote) with `origin/main` at `6f4f5e9` (PR #41, the two-page teaching aid and rule key). The
branch was pushed and `origin/main` is an ancestor of its head.

## Log after the merge

```
4f82443 Session 4: the case-fact inventory report regenerated after the merge
0244094 Merge origin/main into claude/gracious-cray-2k4fkc: keep the three-page aid, carry the 27 September rule key beside it, both changelog entries, the run sheet's four Verify items
be54621 Session 4: the §04 clause reads organisation; the changelog and ledger name §02's seven identifiers as the page carries them
735a5b9 Session 4 teaching aid: renumbered to the nine polls, with a polls box on page 3
609f6b5 Session 4: nine Zoom polls to choose from
1a4e230 Session 4: sources pruned to what the page cites, two earlier-folder phrases restored, the changelog entry, the hand-back
207f322 Session 4: D1 keys made obvious, image marks and the EU callout; D5 clocks, plan skeleton and two real clocks; ledger and checks
8256d34 Session 4: §03 ladder, D3 flip deck, §07 why-slots and skill view; checks and run sheet
```

## The six conflicts and how each was resolved

- `instructor-notes/session-4-teaching-aid.htm` (add/add): ours kept, the three-page aid. Main's
  two-page aid saved beside it as `session-4-rule-key.htm`, with only its title and page 1 heading
  changed to say it is the rule key and companion reference from the 27 September round. Our page 3,
  segment H, gained one list item pointing at the rule key.
- `instructor-notes/session-4-teaching-aid.md` (add/add): ours kept. Main's copy saved as
  `session-4-rule-key.md` with only its first heading changed. Our H paragraph gained the same
  rule-key sentence.
- `instructor-notes/session-4-teaching-aid.pdf` (add/add): ours kept, then re-rendered from the
  .htm with Playwright so it carries the nine-poll numbering. Main's PDF saved unchanged as
  `session-4-rule-key.pdf`.
- `instructor-notes/session-4.md` (both modified): ours as the base. Main's 22 added lines ported:
  the print note now says the aid is three pages with the rule key beside it; the Verify block
  headed "New on 2026-09-27" went to the end of our Verify list in main's wording. That block holds
  five sub-items, not four: the four the brief named plus main's line that no SEC or FINRA rule says
  prompts and outputs are records. All five were carried because the brief asked for every added
  line.
- `CHANGELOG.md` (both added a top entry): both entries kept intact, ours (2026-09-28) above
  main's (2026-09-27, the teaching aid), one `---` rule between them.
- `changelog/index.html`: not hand-merged. Rebuilt with `scripts/build-changelog.py` from the
  resolved CHANGELOG.md (the generator reported the sweep skill missing, as expected), then the
  managed style fence restored from `session-4/index.html` because the generator empties it.

## The aid PDF's page measurements

Three pages, each `h: 766, ch: 766, over: false`. No page overflows. The PDF holds three pages.

## Gates, last output line of each

| Gate | Exit | Last line |
|---|---|---|
| `build-appendix.mjs --check` | 0 | all generated regions agree with their sections |
| `inject-sources.mjs --check` | 0 | every lesson carries the current SOURCES.md block |
| `verify-sources.mjs` | 0 | summary: 5 of 5 lessons carry the current SOURCES.md block |
| `verify-case.mjs` | 0 | summary: 6 of 6 lessons carry the current CASE.md v4.0 block |
| `inject-case.mjs --check` | 0 | summary: 6 current, 0 stale, 0 without sentinels · stamp f53ae08 |
| `build-cardsort.mjs --check` | 0 | OK current session-1/index.html |
| `case-inventory.mjs --report-check` | 1 then 0 | WOULD CHANGE docs/case-fact-inventory.md; after `--report`: current docs/case-fact-inventory.md (committed as `4f82443`; only the declined-occurrence counts moved, 567 to 569) |
| `verify-migration.mjs` | 0 | summary: 15 passed, 0 failed |
| `verify-editorial.mjs` | 0 | summary: 17 rule(s) clean, 0 hard failure(s), 2 advisory |
| `build-unsourced.mjs --check` | 0 | current docs/unsourced-claims.md (0 marked claim(s)) |
| `build-bibliography.mjs --check` | 0 | all three generated files are current |
| `build-sources.mjs --check` | 0 | 23 record(s) with no chip: src-vectara (evidence), ... src-nikkei-papers (evidence) |
| `attest-verified.mjs` | 0 | lock digest cb5f277761afb142 MATCHES SOURCES.md; last line is the src-wolfram attestation text |
| `test_live_console.js` | 0 | 86 passed, 0 failed |
| `docs/changes/2026-09-25-session-4-polish/checks.mjs` | 0 | 0 failed |
| `docs/changes/2026-09-25-session-4-rebuild/checks.mjs` | 0 | 0 failed |
| `docs/changes/2026-09-27-session-4-syllabus/checks.mjs` | 0 | 0 failed |
| `docs/changes/2026-09-28-session-4-notes/checks.mjs` | 0 | 0 failed |
| `verify-style.mjs` | 1 | FAIL restyle_sweep.py not found (known: the sweep skill is not installed here) |
| `verify-browser.mjs` | 1 | summary: 6 failure(s), all six `net::ERR_CERT_AUTHORITY_INVALID` on the font request (known) |

## Not done, and why

- The style fence was not swept because the sweep skill is not installed in this image; the fence
  in `changelog/index.html` was copied from a lesson instead, as the brief directed.
- The loop over `docs/changes/*/checks.mjs` also runs the five older folders. The three Session 3
  folders fail (manual-pass 7 FAIL, final 2 failed, simplify 1 failed) and fail identically on
  `origin/main` in a clean worktree, so they predate this branch and touch no file this merge
  changed. Nothing was done about them. The two Session 2 folders pass.
- The brief's rule-key heading edit named the .htm's page 1 `<h1>`; the page 2 heading ("THE RULE
  KEY · §01'S NINE, IN SORTER ORDER") was left as it was, since the brief said to change only the
  title and the page 1 heading.
