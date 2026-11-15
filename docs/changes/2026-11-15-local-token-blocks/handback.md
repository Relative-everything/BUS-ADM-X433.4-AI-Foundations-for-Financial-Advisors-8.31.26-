# Handback: duplicate colour-token blocks removed
Branch: `claude/adoring-cannon-g71l1a`. Change: `docs/changes/2026-11-15-local-token-blocks/`. Tier: Lite. Status: complete.

## Summary
A design review of the course site ended in a restyle that is still a draft outside this repository (DW-204). Testing the draft against Session 2 showed it could not take effect: the hub, Sessions 1 to 5 and the changelog page each declared the thirteen colour tokens twice, once in the style fence and once in the page's own CSS, and the page's copy wins. This change removes the second copy. The values were identical, so no page looks different.

## What changed
- `index.html`, `session-1` to `session-5`: the `:root` block after `/* STYLE:END */` that repeated `--page`, `--card`, `--ink`, `--muted`, `--off`, `--off-bg`, `--on`, `--on-bg`, `--warn`, `--warn-bg`, `--line`, `--gold` and `--gold-bg` is gone.
- `session-2`: the block also held `--plot` to `--plot4` for the page's charts. Those stay, and the three that equalled a fence token now read it with `var()` (D-101).
- `scripts/build-changelog.py`: the same thirteen tokens are no longer written into the changelog page (D-102).
- `MAINTAINING.md`, *Shared styling*: the rule that page-local CSS does not redefine a fence token.
- Not changed: `session-0.1` (it never had a copy), the five case pages (their seven local tokens are their own), every generated or versioned fence.

## What to watch for
- Open the hub and Sessions 1 to 5. Nothing should look different from before. A page that has lost its colours (white page, black unstyled text) would mean its fence is missing the token block.
- In Session 2, the temperature and cost charts should keep their teal, rust, ochre and blue series.
- The changelog page should look as before.

## How it was checked
- Before the edit, each removed block was compared with the fence's token block on the same page: 13 of 13 values equal on every page, and the blocks sat after `/* STYLE:END */` and outside every other fence.
- After the edit, the computed value of each of the thirteen tokens (and Session 2's four) was read in Chromium on all seven pages and compared with the value before the edit.
- MAINTAINING's gate was run on the untouched tree and again on the final tree; the results are in the commit message's trailer and below.

## Verification output
MAINTAINING's in-repo battery, sequential on the final tree, `NODE_PATH=$(npm root -g)` and `LESSON_BUILDER_SKILL` pointing at the installed skill. The same 23 commands exited 0 on the untouched tree before the edit.
```
build-case, inject-case --check, build-cardsort --check, build-appendix --check,
build-readings --check, build-sources --check, build-unsourced --check,
build-bibliography --check, case-inventory --report-check, facts/build-facts-md --check,
verify-case, verify-migration (16 passed, 0 failed), verify-sources --check,
verify-facts, verify-editorial (17 rules clean, 0 hard failures, 1 advisory),
test-editorial-regions (9 passed), test-case-viewer (0 failures), verify-style
(style fence clean), verify-stamps (0 stale), test_live_console.js, verify-browser
(0 failures), docs/next-term/checks.mjs (0 failures), build-changelog.py: all exit 0
```
One command was red on the first run after the edit and is green now: `case-inventory --report-check`. The inventory records line numbers, and removing lines moved them, so `docs/case-fact-inventory.md` was regenerated. Its diff is four line numbers in Sessions 3 and 5, and the count of declined occurrences, 1173 to 1166: seven matches of Tom's age, 12, inside the removed `#8A6A12` colour values. The drift surface did not grow.

Computed values, read in Chromium from `git HEAD` and from the working tree: the thirteen tokens, Session 2's four chart tokens, and the body's background and text colour are identical on `index.html`, `changelog/index.html` and `session-1` to `session-5` (19 values each).

Not run: the skill's own `validate_lesson.py` and `validate_dom.js`, which MAINTAINING lists as red by design on several lines and which this change does not touch.

## Open
- DW-204: land the drafted style sheet in the skill, then sweep.
- DW-205: page-local rules that repeat a fence selector.
- DW-206: on a second gate run on the same tree, `verify-migration` check 2 failed on `.verify-shots/session-5_index.html.png`, a screenshot the first run wrote, whose bytes spell a retired word. The folder is ignored and generated; deleting it cleared the failure. The pages are not involved.

## Addendum, same day: the restyle prepared for a later session
A second commit on the same branch adds `docs/design/meridian/` and changes no served page.

- `DESIGN.md` and `tokens.json`: the design rules and tokens, copied from the instructor's design-system reference.
- `assets/`: the drafted `tokens.css`, `typography.css`, `components.css` and `outline.js`. They were regenerated from the installed skill's `assets/`, which differ from the fence text only by a trailing newline in two files, so `skill-assets.diff` applies to the skill as it stands.
- `MIGRATION.md`: the plan, with the per-page counts of local rules that repeat a fence selector.
- `KICKOFF-PROMPT.md`: the prompt for the session that does the work.
- `content-freeze.mjs`: the check that the restyle changes presentation only (D-104). Run against this branch's previous commit and its parent, it reports all twelve pages frozen. Run against a scratch copy of Session 2 with a sentence deleted, an id renamed and a script edited, it fails on each of the three and ignores the copy's colour change.
- `CLAUDE.md` and MAINTAINING's *Shared styling* point at the folder. Decisions D-103 and D-104; DW-204 rewritten to say where the drafts are.

The in-repo battery was run again on the final tree after this commit's files were added: 23 of 23 exit 0.
