# Maintaining this repository

**This file is publicly served, like everything else in the repository.** Do not
put credentials, private student information, or draft material anywhere in
here.

Audience: the maintainer and future contributors. Students and instructors
browsing the course want [README.md](README.md).

## Layout

```
index.html            Course hub, the URL students bookmark
session-N/index.html  One self-contained lesson per session
cases/case-N.html     One case-file page per session (2027 term), opened before
                      class: the lessons' chrome and style fence, its own
                      case-file identity, generated CASE and SOURCES spans
CASE.md               Canonical Cole household case block (v5.0, the pre-retiree
                      household), the source of truth. Part O holds session-3's
                      retrieval corpus and meeting excerpt; Part L the two sheets
CHANGELOG.md          Human-readable record of every revision
MAINTAINING.md        This file
docs/deferred-work.md The single register of open work. Nothing else tracks it
facts/FACTS.json      The volatile-fact registry: model names, prices, plans,
                      leaderboards, regulation dates. FACTS.md is generated from it
audit/                Dated audit reports against the lesson-builder protocol
.nojekyll             Tells GitHub Pages to serve files as-is
```

Each lesson is a single self-contained HTML file with all styles and scripts
inline. No lesson may use localStorage, sessionStorage, indexedDB, or cookies:
state lives in JavaScript variables and dies on reload.

Two external origins are permitted, and no others:

| Origin | When | Where |
|---|---|---|
| `fonts.googleapis.com`, `fonts.gstatic.com` | Page load | Every page |
| `generativelanguage.googleapis.com` | Runtime only, and only after a reader pastes their own Gemini API key | Sessions 1 and 4 |
| `api.anthropic.com` | Runtime only, and only after a reader pastes their own Claude API key (one beginning `sk-ant-`) | Sessions 1 and 4 |

The second and third are the live model console (`LM:BEGIN` / `LMBOX:BEGIN` /
`LMSTYLE:BEGIN` fences), which takes either vendor's key and calls only the
vendor the key belongs to. It is off by default, every exercise it touches keeps a
captured fallback that renders when no key is connected or a call fails, and the
key is held in one JavaScript variable and never stored. **The storage grep in
the pre-push gate is the regression test for that key handling** — if it ever
hits, the key is being persisted and the design has been violated. Do not add the
console to Sessions 2 or 3: their exercises run on students' own client work,
and the free tier's terms permit Google to train on what is submitted. Session 4
carries it since 2026-09-27 for one reason, to show the request itself: its box
(`LMBOX-S4:BEGIN v1`, a page-specific variant of the shared box markup) sends
only what the reader types, starts from the synthetic clean Prompt D, and says on
its face that a free key is the training tier. Session 0.1 carried it until
2026-10-12 and dropped it with the probes it ran (see "The live model console").

## Publishing

Publishing and versioning are the same act. GitHub Pages serves whatever is on
`main`, and a push goes live in about a minute.

```bash
git pull origin main
# make the edit
git add -A
git commit -m "Session 1: correct the combined valuation discount"
git push origin main
```

Commit small and often, and write messages that name the session and the
substance. Git records a version when you commit, not when you edit, so the
granularity of the history equals the granularity of the commits. Fifteen
changes in one commit is one version showing all fifteen, and git cannot
separate them afterwards.

For anything larger than a small fix, work on a branch and merge when it is
verified. That keeps the live site stable while work is in progress.

## Marking what was actually taught

`main` keeps moving. A tag freezes a moment permanently, which is what you want
when you need to show exactly what was on screen during a class.

```bash
git tag -a session-1-delivered-2026-08-31 -m "Session 1 as delivered"
git push origin session-1-delivered-2026-08-31
```

## Recovering an earlier version

```bash
git log --follow --oneline session-1/index.html
git show <commit>:session-1/index.html
git diff <commit> HEAD -- session-1/index.html
git restore --source=<commit> session-1/index.html
```

`--follow` traces each lesson back through the directory restructure to its
original filename.

## Pre-push gate

With the interactive-lesson-builder skill installed, run all three from the
skill root. All must exit 0.

```bash
python3 scripts/validate_lesson.py <repo>/session-N/index.html \
  --case Cole --purge "Okonkwo,Reyes,Adaeze,Ilesanmi" \
  --require-timing --require-tagging
node scripts/validate_dom.js <repo>/session-N/index.html      # needs jsdom
python3 scripts/restyle_sweep.py <repo>                       # WRITE the fence
```

**Where this repo looks for the skill.** Two scripts here call the skill's
`restyle_sweep.py`, `scripts/verify-style.mjs` and `scripts/build-changelog.py`.
Both try the same candidates in the same order, and the first that is a file wins
(the same order in both since 2026-10-11):

| Order | Set by | Resolves to |
|---|---|---|
| 1 | `RESTYLE_SWEEP` | the path of `restyle_sweep.py` itself |
| 2 | `LESSON_BUILDER_SKILL` | the skill root, with `scripts/restyle_sweep.py` under it |
| 3 | the home directory | `~/.claude/skills/synced/interactive-lesson-builder/scripts/restyle_sweep.py` |
| 4 | the home directory | `~/.claude/skills/interactive-lesson-builder/scripts/restyle_sweep.py` |

`scripts/verify-style.mjs` prints a `WARN` line whenever `RESTYLE_SWEEP` is set
to something that is not a file, or `LESSON_BUILDER_SKILL` is set to a root with
no `scripts/restyle_sweep.py` under it, whether or not a later candidate stands
in; when nothing resolves it exits 1, naming every path it tried and both
variables. `scripts/build-changelog.py` prints no warning for a variable; when
nothing resolves it still writes its page and warns that the page's style fence
is empty. Synced skills have lived under a uuid-prefixed directory
on some hosts, which is what the variables are for:

```bash
LESSON_BUILDER_SKILL=/path/to/interactive-lesson-builder node scripts/verify-style.mjs
RESTYLE_SWEEP=/path/to/restyle_sweep.py node scripts/verify-style.mjs
RESTYLE_SWEEP=/path/to/restyle_sweep.py python3 scripts/build-changelog.py
```

`validate_dom.js` needs jsdom, which is not a repository dependency: see
"Change-folder checks, and jsdom" below.

**The volatile-fact check runs with the gate, with or without the skill.**
`facts/FACTS.json` is the single source of truth for every volatile fact a page
or an instructor note states: model names and ids, API and plan prices, plan
features, leaderboard figures, regulation and guidance dates. Each record carries
the value, its source, the date it was last read, an H/M/L/GAP confidence, a
volatility, a re-verify window and the retired strings that must not appear on a
served page. `scripts/verify-facts.mjs` fails on (a) any retired string in the
hub, a lesson, a case page or an instructor note, (b) a high-volatility record
whose `retrieved` date is older than its window relative to `--as-of` (14 days
for `each-session`, 180 for `term-start`), and (c) a `data-fact="<id>"` chip or a
`FACTS:<id>` note citing an id the registry does not hold. `--report` lists
everything and exits 0; `--session N` narrows the scope to one session's files.

```bash
node scripts/verify-facts.mjs                       # the gate: exit 1 on a, b or c
node scripts/verify-facts.mjs --report              # every hit, exit 0
node facts/build-facts-md.mjs                       # FACTS.json -> FACTS.md (generated; never hand-edit FACTS.md)
node facts/build-facts-md.mjs --check               # exit 1 if FACTS.md is stale
```

**The week-before-each-session ritual.** Run
`node scripts/verify-facts.mjs --as-of <session date> --session <N>`. For every
record it lists as stale, re-open the source, correct `value` and `statement`
if they moved (moving the old value into `retired_values`), set `retrieved` to
the day you read it, regenerate `FACTS.md`, and re-run the Phase 5 sweep on the
pages the record's `applies_to` names. Commit `FACTS.json` and `FACTS.md`
together. A record whose source is unreachable keeps its confidence at M or L
and says so in `notes`; nothing is filled from memory (PEDAGOGY §1.11).

**Red by design for `session-2`.** The Shift+U override was removed from
`session-2` by instruction (DW-116), so the page has no `#ovr`, the override's
label; its chrome carries `id="prog"`, the progress bar, and no label at all.
`validate_dom.js` asserted `#pnum` when it was last run here, the label's name
before the corpus renamed it `#ovr` (DW-112). An upstream fix that asserts
`#ovr` instead will still be red for `session-2`, by design, as are
`validate_lesson.py` V8 and the DOM-mode Shift+U line (DW-116). Read those
lines as known, not as regressions.

## The CASE.md v5.0 migration checks

These live in this repo, not the skill, and all exit 0. Run them from the repo
root after any edit to `CASE.md` or to a lesson.

```bash
node scripts/build-case.mjs        # CASE.md -> the generated artifacts. Fails
                                   # loudly if a table row or label it looks for
                                   # has moved, and recomputes the Part M
                                   # identities (67 at v5.0). CASE_PATH=<file>
                                   # runs it against a draft without touching
                                   # CASE.md's artifacts' meaning: it still writes
                                   # scripts/case-*.json, so run it on CASE.md after.
node scripts/inject-case.mjs       # rewrite the span between the CASE sentinels
node scripts/inject-case.mjs --check   # report drift, write nothing
node scripts/build-cardsort.mjs --check   # the session-1 card-sort deck and key
                                   # between the CARDSORT sentinels, derived from
                                   # CASE.md Part J (the three landmines and the
                                   # identifying combination) and Parts E and I
                                   # (four published parameters). Fails when a fact
                                   # the deck rests on moves, so a CASE.md edit
                                   # cannot silently orphan the answer key.
node scripts/verify-case.mjs       # hash every injected block, and assert the
                                   # lesson-local .case-* layout rules agree in
                                   # all twelve pages; non-zero on drift
node scripts/verify-migration.mjs  # retired facts, allowances, arithmetic, timing,
                                   # and the spine drift guard (check 20)
node scripts/verify-browser.mjs    # DOM, handlers, flowchart, screenshots (Chromium)
node scripts/test-case-viewer.mjs  # the case-facts viewer, in Chromium: focus trap,
                                   # focus return, Escape, click-out, the veil, the
                                   # non-colour tab state, and the new-tab Blob view
                                   # opened for real with its requests recorded
node scripts/verify-style.mjs      # CHECK the managed style fence, see below
node scripts/case-inventory.mjs --report-check   # the drift surface, and it must
                                   # not have grown. See "The case-fact drift
                                   # surface" below.
```

**Why `verify-style.mjs` instead of `restyle_sweep.py --check`.** The sweep globs
every `*.html` in the tree and wants a fence in each. Two files here are HTML
*fragments*, not documents: `scripts/case-extract.html` and
`scripts/case-flowchart.html` are generated and injected *into* the lessons, so
giving them a fence would embed the whole stylesheet in every lesson six times.
The wrapper asserts something stricter than the raw sweep: every lesson document
must be current, **and** the only fenceless files in the tree must be exactly
those two fragments. A third fenceless file fails it. Use the raw sweep to
*write* the fence; use the wrapper to *check* it. The wrapper finds the sweep
through `RESTYLE_SWEEP`, `LESSON_BUILDER_SKILL` or the home-relative candidates,
in the order the pre-push gate above sets out.

**Two more scripts in `scripts/`, and why neither is in the list above.**

- **`scripts/verify-wolfram-quotes.py` checks quotations.** It byte-verifies
  every quoted span in `session-1`'s `div.wolf` reading boxes against the
  assigned article, Wolfram (2023): each span, split at its ellipses, must be a
  contiguous substring of the article once whitespace, quote forms and HTML
  entities are normalised on both sides, and it reports the article section each
  span lands in. **Its input is a plain-text copy of the article, passed as
  `argv[1]`, and no copy is in the tree**, so it cannot run from a clean clone.
  Run it with a copy whenever a `div.wolf` quotation changes; it exits 0 only
  when every span verifies. It is the check behind DW-067 and DW-069.

  ```bash
  python3 scripts/verify-wolfram-quotes.py <article.txt> [session-1/index.html]
  ```

- **`scripts/state_space.py` is not a check, and nothing runs it now.** It
  enumerated the legal configuration space of the context inspector that Session
  0.1 carried until 2026-10-12, under six sourced constraints, and printed its
  size against the naive grid. The page that used it is gone; the script is kept
  as a record. It asserts nothing and exits 0.

Without the skill, these fallback checks cover the same ground:

```bash
grep -rin "okonkwo" index.html session-*/index.html          # must be empty
grep -rnE 'localStorage|sessionStorage|indexedDB|document\.cookie' \
  index.html session-*/index.html                            # must be empty
for f in index.html session-*/index.html; do                 # externals: allowlist
  grep -Eo '<(link|script|img|iframe)[^>]*(href|src)="https?://[^"]+"' "$f" \
    | grep -Ev 'fonts.googleapis|fonts.gstatic'
done
# the console's two runtime origins, allowed only in 1 and 4, and only in JS
grep -l 'generativelanguage.googleapis.com\|api.anthropic.com' \
  index.html session-*/index.html cases/*.html \
  | grep -Ev 'session-(1|4)/index.html'                        # must be empty
# session-4 shares the style and the call layer with session-1, not the box
# (each fence is opened and closed by its own versioned marker, and the two
# fences are on different versions: LMSTYLE v1, LM v2 since 2026-10-16)
for m in 'LMSTYLE:BEGIN v1,LMSTYLE:END v1' 'LM:BEGIN v2,LM:END v2'; do
  sed -n "/${m%,*}/,/${m#*,}/p" session-1/index.html | md5sum
  sed -n "/${m%,*}/,/${m#*,}/p" session-4/index.html | md5sum
done                                                          # each pair must match
grep -H '<title>' index.html session-*/index.html            # hub and lessons agree
```

### Re-capturing a model output (`scripts/recapture.mjs`)

A lesson that shows a captured model output (session-2 `#bsell`, session-3
`OFFEX`) labels it with the model that produced it and the date. The Session 0.1
probe captures retired with the Fall 2026 page; `docs/probe-captures.md` keeps
them as a record and owes no re-run. When the case or the prompt changes, the capture is re-run,
never edited by hand, through the helper added for the 2027 term:

```bash
node scripts/recapture.mjs --prompt <file> --model claude-sonnet-5-5   # prints a label line, then the answer verbatim
node scripts/recapture.mjs --prompt <file> --model <id> --json          # the raw CLI JSON instead
```

It runs the `claude` CLI non-interactively (`-p`, JSON output) and prints
`# model <id> · captured <date> · prompt sha256 <12 hex>` from what the CLI
reported, then the answer. **The label on the page is the model id the helper
printed**, never a name typed from memory and never the identity of whatever
session is doing the editing: the CLI's reported model is the only fact the page
can stand behind. Run it from a directory outside the repository so no project
file is read as context. If the CLI is unavailable, the page keeps the old
capture's structure with the labelled text "Capture pending re-run against the
v5 case" and the deferred-work register gets a row (D-033 in
`docs/next-term/DECISIONS.md` records the five probe captures deferred this way).

## The case pages (`cases/case-N.html`)

Added for the 2027 term (Phase 7 of `docs/next-term/RUNBOOK.md`). Each is one
self-contained file a student opens before Session N: case brief, the commit
("your call first"), the finished deliverable captured from a model and labelled
with the model id and date the `claude` CLI reported, how it was built (prompts,
tier, checks, one failure caught, the human-judgment points; case-1 carries the
model `readme.txt`), a check, and the link into the lesson's opener `#sCase`.

What the pipeline does with them:

- `scripts/inject-case.mjs` LESSONS lists them, so they carry the injected case
  block and the viewer; `verify-case.mjs` and `test-case-viewer.mjs` check them
  with the lessons (12 files).
- `scripts/build-sources.mjs` knows the keys `case-1` to `case-5` and maps every
  key to its page through `pagePath()`; a record cites a case page with
  `used_for.case-N`, and `inject-sources.mjs` writes the footer. Every reader of
  `LESSONS` that opens a page goes through `pagePath()`.
- `verify-browser.mjs`, `verify-migration.mjs` (with a zero baseline for the
  `var()` count) and `verify-facts.mjs` scan them. Two lesson parameters do not
  apply and say so in their output: the 13-interaction floor (check 9: a case page
  is built around one commit and one check) and the time-budget table (check 16:
  minutes sit on the eyebrows, no allocation row). They are outside `build-appendix.mjs`
  and outside EDITORIAL A1 to A7 (no core/appendix split), like `session-0.1`.
- The hub lists them in the "Case files" strip; each lesson's top bar links its case.

The lesson's `#sCase` opener and the case page must tell the same story: the same
facts to rank, the same key, the same verdict rows. When a case page's captured
output changes, re-read the lesson's opener; nothing checks the two mechanically
yet (deferred-work row).

### Reading cards (`docs/next-term/readings.json`, `scripts/build-readings.mjs`)

The "Reading for Session N" card on each page is generated from `docs/next-term/readings.json` into the `READINGS:BEGIN sN` region of the page that precedes Session N (the setup page carries Session 1's). Edit the JSON (drop a row, change its status from "tentative", fix a title), run `node scripts/build-readings.mjs`, then `node scripts/inject-sources.mjs` (each row's `source_key` is a SOURCES.md record of kind `assigned_reading`, cited by the card's chip), and commit all three; `--check` says whether a card is stale.

### Re-rendering the instructor-note PDFs

The `.pdf` beside each `.htm` teaching aid and rule key is a print of the `.htm`
(Letter, landscape, the file's own `@page`, backgrounds on). Never edit it; re-render
after the `.htm` changes, with the Playwright Chromium the browser checks use:

```bash
NODE_PATH=$(npm root -g) node -e '
const { chromium } = require("playwright");
(async () => { const b = await chromium.launch();
  for (const f of ["instructor-notes/session-3-teaching-aid","instructor-notes/session-4-rule-key","instructor-notes/session-4-teaching-aid","instructor-notes/session-5-teaching-aid"]) {
    const p = await b.newPage(); await p.goto("file://" + process.cwd() + "/" + f + ".htm", { waitUntil: "load" }); await p.emulateMedia({ media: "print" });
    await p.pdf({ path: f + ".pdf", format: "Letter", landscape: true, printBackground: true, preferCSSPageSize: true }); await p.close(); }
  await b.close(); })();'
```

Expected page counts: session-3 teaching aid 1, session-4 rule key 2, session-4 teaching aid 3, session-5 teaching aid 2 (`pdfinfo` prints them).

## Change-folder checks, and jsdom

Nearly every pass on a lesson since 2026-09-12 left a folder,
`docs/changes/<date>-<pass>/`, and most carry a `checks.mjs` asserting the page
state that pass produced. The 2026-09-21 Session 3 visual pass left none; its
ledger was reconstructed on 2026-10-11 (DW-137). None is in the pre-push gate.

**jsdom is not a repository dependency, and most of this verification needs
it:** every `checks.mjs` from `2026-09-18-session-3-final` on, the Session 5
section tests (`docs/changes/2026-10-02-session-5-build/section-tests/run-all.mjs`,
962 assertions on 2026-10-11), the skill's `validate_dom.js`, and the `dom`
block of `scripts/audit/section_profile.mjs`. Without it the checks stop with
`Cannot find module 'jsdom'`; the profiler runs on, but records
`dom.mode: static-only` and computes no rendered counts. Install it once,
globally, and point Node at it:

```bash
npm i -g jsdom
NODE_PATH=$(npm root -g) node docs/changes/2026-10-04-session-5-interactivity/checks.mjs
NODE_PATH=$(npm root -g) node docs/changes/2026-10-02-session-5-build/section-tests/run-all.mjs
NODE_PATH=$(npm root -g) node scripts/audit/section_profile.mjs session-5/index.html   # writes docs/audits/profiles/
```

The three oldest harnesses (`2026-09-13-session-2-manual-pass`,
`2026-09-13-session-3-manual-pass` and `2026-09-14-session-2-polish`) drive
Chromium through Playwright instead, resolved the way `scripts/verify-browser.mjs`
resolves it.

**A `checks.mjs` pins the page its own pass produced, so a later sanctioned
pass can turn an older folder red.** That red is history, not a regression.
**A lesson's regression set is every folder whose `checks.mjs` still passes in
full on the page (Session 3 is the exception below); a folder turned red by a
later sanctioned pass is the record of what its own pass left.** Measured
2026-10-11 with `NODE_PATH=$(npm root -g)`:

| Lesson | Regression set | 2026-10-11 |
|---|---|---|
| `session-0.1`, `session-1` | `2026-10-11-deferred-work-catchup` | all passed |
| `session-2` | `2026-09-13-session-2-manual-pass`, `2026-09-14-session-2-polish`, `2026-10-11-deferred-work-catchup` | 19 OK; 18 OK; all passed |
| `session-3` | `2026-09-19-session-3-simplify` except its V6 line, `2026-10-11-deferred-work-catchup` | **1 failed**: *"V6 18 interaction roots (found 22)"*; all passed |
| `session-4` | `2026-09-25-session-4-rebuild`, `2026-09-25-session-4-polish`, `2026-09-27-session-4-syllabus`, `2026-09-28-session-4-notes`, `2026-10-11-deferred-work-catchup` | 0 failed in each; all passed |
| `session-5` | `2026-10-02-session-5-build` with its section tests, `2026-10-04-session-5-interactivity` (`checks.mjs` and `drags.mjs`), `2026-10-11-deferred-work-catchup` | all passed; 962 assertions, 0 failed; 36 of 36 |

Red against later Session 3 passes, and therefore history:

| Folder | 2026-10-11 | Failing ids | Turned red by |
|---|---|---|---|
| `2026-09-13-session-3-manual-pass` | 13 OK, 7 FAIL | JN-005, JN-007, JN-009, JN-010, JN-014b, JN-014f, JN-020 | the 2026-09-17 to 09-20 passes (14 OK, 6 FAIL at `08684f9`), then the 2026-09-21 visual pass, which turned JN-007 red at `285adf0` |
| `2026-09-18-session-3-final` | 2 failed | FF-024, V6 | the 2026-09-21 visual pass: FF-024 at `285adf0`, V6 from `c06592a` |
| `2026-09-19-session-3-simplify` | 1 failed | V6 | the 2026-09-21 visual pass |

**Session 3 is the exception today.** Its newest folder with checks is
`2026-09-19-session-3-simplify`, and its one failure is the 2026-09-21 visual
pass (DW-137), which left no `checks.mjs` of its own. The folder passes in full
against `08684f9`, the last Session 3 commit before that pass; `c06592a`,
`9f1518a` and `3711104` take V6 from 18 roots to 22. Until a later Session 3
pass writes checks or re-pins V6, read that V6 line as history and every other
assertion in the folder as the regression set. A pass that changes a lesson
should write a `checks.mjs` for what it changed, which joins that lesson's
regression set; the 2026-10-11 catch-up's pins its Wave 2 edits and DW-041.

**The 2027-term rebuild (2026-10-13) turned every folder above red, by design.**
The `next-term-2027` pass (`docs/next-term/`) re-authored the hub, the five
lessons and Session 0.1 and added the case pages, so each `checks.mjs` from
`2026-09-13-session-2-manual-pass` to `2026-10-11-deferred-work-catchup`, and
the Session 5 section tests, now pin Fall 2026 content the rebuild replaced on
purpose: the cold open, the 67- and 83-minute cores, the v4 case panel and its
names, the eleven-section Session 5, the Fall 2026 footer records and
deferred-work counts. Read all of them as history under the rule above; the
pages they pin are at `da7b003` (the `fall-2026-final` tag, once pushed). The regression set for every
served page is now `docs/next-term/checks.mjs`
(`NODE_PATH=$(npm root -g) node docs/next-term/checks.mjs`): the case pages'
six sections and spans, the lessons' case links and reading cards, the hub
order, the setup page and the poll files. A later pass that changes a page adds
its pins there or in a `docs/changes/` folder of its own.

## Shared styling

Style is edited once and swept into every lesson. Each page carries a managed
fence:

```html
/* STYLE:BEGIN managed-by=restyle_sweep.py */
/* STYLE:END */
```

Edit `assets/tokens.css`, `assets/typography.css`, or `assets/components.css` in
the skill, then run `restyle_sweep.py <repo>`. Lesson-specific CSS lives after
the fence and is never touched. A lesson without the fence is outside the sweep
and will be reported by `--check`.

## The live model console

Sessions 1 and 4 carry an optional console that lets a reader paste their own
API key, Gemini or Claude, and run the page's probes against a live model instead
of the captured outputs (Session 4's shows the request itself, then sends it).
Rationale, alternatives considered and the pedagogical case are
in [`docs/live-model-console-plan.md`](docs/live-model-console-plan.md); the
terms and quota analysis behind the bring-your-own-key choice are in
[`docs/gemini-live-api-feasibility.md`](docs/gemini-live-api-feasibility.md).
The Claude key was added on 2026-10-16
(`docs/changes/2026-10-16-claude-api-keys/`), so that the instructor's Max-plan
API credit can carry a class through a workspace key.

**Two vendors, one box, since 2026-10-16 (fences `LMBOX v2`, `LM v2`,
`LMBOX-S4 v2`; `LMSTYLE` stays at v1).** The call layer reads the vendor off the
key before anything is sent: a key beginning `sk-ant-` goes to
`api.anthropic.com`, anything else to `generativelanguage.googleapis.com`, and
nothing ever goes to both. Connect validates against each vendor's model list
(`GET /v1/models`, no generation quota or credit spent) and fills the selector
from it: the Gemini list filtered to `flash` text models as before, the Claude
list every `active` model the key reaches in the API's newest-first order, with
`claude-opus-5-5` as the default when present. `lmBuild()` is the one place a
request is assembled; `lmCall()` sends exactly what it returns and Session 4's
"See the request" prints the same object, which is what makes the shown request
the sent request. Four Claude-specific rules live in `lmBuild()`, each with a
test in the suite below:

- **Thinking.** The `/v1/models` record's `capabilities.thinking.types.disabled`
  flag decides it. Where the model can switch thinking off, the request does, so
  a 64-token ceiling is a 64-token answer. Where it cannot (Opus 5.5, Sonnet 5.5,
  Fable), the request asks for `output_config.effort: low` and raises
  `max_tokens` to at least 2048, because thinking tokens count against the
  ceiling and are billed as output. The connect message says so.
- **Temperature.** Claude models from Opus 4.7 on reject `temperature`, `top_p`
  and `top_k`; 4.6 and earlier accept them (`src-anthropic-sampling`). A
  temperature of 1 is the default and is never sent. The one exercise that
  varies it, Session 1's Appendix A6 panel, routes to the newest 4.6-or-earlier
  model the key reaches and names that model on each row; the selector is left
  as the reader set it.
- **Headers.** Every Claude request carries `anthropic-version: 2023-06-01` and
  `anthropic-dangerous-direct-browser-access: true`, the flag Anthropic requires
  before it answers a browser (`src-anthropic-browser-access`). Session 4's box
  shows both and says why the second one's name is the warning.
- **Replies and errors.** Text blocks only are read, usage is normalised to the
  Gemini field names so the page hooks need not know the vendor, and
  `stop_reason: refusal` and an all-thinking `max_tokens` stop are reported as
  errors rather than as an empty reply. 401, 402 (an empty balance), 403, 404,
  429 and 529 each have their own sentence; the Gemini sentences are unchanged.

A Gemini key must still send nothing to Anthropic and a Claude key nothing to
Google; the suite asserts both. Session 4's cost line still prices the tokens at
the smallest Claude model (`LM_PRICE`); under a Claude key it says the model's own
rate is that figure or higher and that thinking tokens sit in the out count. It
does not price per model (DW-185).

**Session 0.1 dropped the console on 2026-10-12, with the probes it ran
(decision D-054).** The page became a self-paced setup page for students working
in their own paid Claude accounts. It has no use for a bring-your-own-Gemini-key
console and carries no probe for one to run. The probe exercise retired with the
Fall 2026 page, and `docs/probe-captures.md` keeps its captures as a record. The
byte pairing between Sessions 0.1 and 1 ended with the fences.

Three fenced blocks. Session 1 carries all three. Session 4 carries the first and
the third byte-identical to Session 1's, and its own box under
`LMBOX-S4:BEGIN v1`, because its copy teaches the request rather than a probe;
the element ids the call layer binds are the same in both:

| Fence | Where in the file | What |
|---|---|---|
| `LMSTYLE:BEGIN v1` | After `/* STYLE:END */`, so the sweep never touches it | Console CSS |
| `LMBOX:BEGIN v1` | First child of `.wrap` | Console markup |
| `LM:BEGIN v1` | Inside the main IIFE, after the `all()` helper (Session 4 defines `all()` and `el()` just above the block) | Call layer |

Page-specific wiring lives under a `LIVE HOOKS, page-specific` comment near the
end of the same IIFE. **Session 1 has two `<script>` blocks** — the hooks must go
in the first one, where `$`, `el` and the console are in scope. Putting them in
the second gives a silent `$ is not defined` at load.

Rules for changing it:

- Edit Session 1's copy, then paste the first and third fences into Session 4 and
  confirm the two md5 pairs in the pre-push gate match. Bump the version in every
  fence on any change.
- Plain ES5, matching the rest of the corpus. The only exception is `fetch`,
  which returns a promise, so `.then()` chains are used. No arrow functions, no
  `const`/`let`, no template literals, no `async`/`await`.
- Every live element needs a captured fallback that renders when there is no key
  and when a call fails. A reader who never connects a key must see the lesson
  exactly as it ran before the console existed.
- Model output is written with `textContent`, never `innerHTML`. Anything that
  must be interpolated goes through `lmEsc`.
- Never commit a key. Google keys are a GitHub secret-scanning partner pattern
  and are push-protected by default: the push gets blocked or the key is
  auto-revoked, and you find out mid-class. Treat an `sk-ant-` key the same way.
- A class key is a workspace key, never the organisation's. The Max-plan credit
  is one balance per linked Console organisation and every key in it draws on
  that balance (`src-anthropic-api-credits`), so issue the class its own
  workspace with a spend limit, and a key with an expiry on the term's last day.
  When the balance is gone, requests stop; nothing is charged to a student.

The browser test suite in `scripts/test_live_console.js` covers all of this
against mocked endpoints for both vendors. Run it before pushing a console
change (about five minutes; sections P to W are the Claude key):

```bash
NODE_PATH=$(npm root -g) node scripts/test_live_console.js
```

## The case-facts viewer

One control per lesson opens the whole Cole case over the page, and a second
control inside it opens the same content in its own tab so a student can keep it
beside the lesson. **Both read the already-injected `CASE:BEGIN` / `CASE:END`
span.** Neither fetches anything, neither writes a file, and there is no second
copy of the case anywhere: the new tab is a Blob URL built in the browser from
the span, with the page's own `<style>` text copied in as text so it renders
without linking a font host. With the network off, both still work.

**All of it is generated by `scripts/inject-case.mjs` and none of it is written
in a lesson.** Until 2026-08-25 the open/close handlers were six hand-written
copies in two states of repair: four returned focus and two did not, and none of
the six trapped it. Editing the viewer means editing `inject-case.mjs` and
re-running it; editing a lesson's copy is not possible any more, because there
is no copy.

What the dialog owes a keyboard reader, and each is asserted by
`scripts/test-case-viewer.mjs` against the rendered page rather than assumed:
the entry point is a real button in the tab order inside persistent chrome;
focus moves in on open and **cannot leave until the dialog closes**; Escape,
the backdrop and the Close button all close it; focus goes back to the control
that opened it; the page behind is `aria-hidden` while it is open and only the
nodes the controller hid are unhidden after; and the selected tab is marked
three ways that are not colour, plus `aria-selected`.

**The pages still carry the `.case-*` layout CSS in twelve copies** (the hub,
`session-0.1`, sessions 1 to 5 and `cases/case-1` to `case-5`), because it
predates this and the viewer's own rules are emitted into the span instead. A
new rule goes in `inject-case.mjs`; do not add one to the twelve.

**`scripts/verify-case.mjs` asserts the twelve copies agree** (DW-043). It reads
every `<style>` body between `/* STYLE:END */` and the `CASE:BEGIN` sentinel,
drops comments, normalises whitespace, keeps each rule any of whose selectors
names a `.case-*` class, and compares the ordered list across the twelve files,
counting copies. Re-indenting is not drift; a changed value, selector, rule
order or `@media` block is, and so is a rule pasted in twice. A file that differs
from the largest group fails, by name, with the rules only it has, the rules it
lacks, and any rule it carries more or fewer times than the reference
(`duplicated here:`, `fewer copies here:`); the same rules in another order fail
as `same rules, different order`. If the largest group has no `.case-*` rule at
all the check fails, because an empty set agrees with every other empty set and
proves nothing. It does not see a `<style media=...>` attribute, CSS nesting,
`@scope`, or a `.case-*` rule placed after `CASE:END`. The script's main guard
compares real paths, so it also runs when invoked through a symlinked checkout
or home (the guard as first written on 2026-10-11 compared the typed path and
did nothing through a symlink):

```
FAIL  layout  session-3/index.html  its 20 lesson-local .case-* rule(s) differ from the 20 in index.html, ...
        only here:     .case-src{font-size:14px;color:var(--muted);margin:16px 0 0}
        missing here:  .case-src{font-size:13px;color:var(--muted);margin:16px 0 0}
```

On 2026-10-13 the twelve agree on 20 rules. `#caseBtn.casefab` is outside the
set, being no `.case-*` rule: today the button sits bottom right in the hub,
`session-0.1`, 1 and 2 and the case files, and top right in 3 to 5, and the
narrow-screen rules that move it are page-local. A layout change to the viewer is made in all
twelve pages in one commit, or moved into `inject-case.mjs`.

## The retrieval corpus lives in CASE.md

`CASE.md` **Part O** holds the ten chunks `session-3` ranks and the five turns of
its §07 meeting excerpt. `build-case.mjs` captures them into
`scripts/case-corpus.json`, `inject-case.mjs` puts them in the span as
`COLEDOCS`, and `session-3` reads `COLEDOCS.corpus` rather than a literal.

They were string literals in `session-3/index.html` until 2026-08-25, restating
instruments `CASE.md` also describes with nothing comparing the two. The buy-sell
chunk had been giving a right of first refusal with a descendants' trust carved
out, where §F.6 gives a corporate consent gate over every transfer, through two
audits. `build-case.mjs` now fails if the chunk count or the ids change, if a
chunk is under 40 characters, if D2 stops stating a consent gate, or if §F.6
stops requiring one.

> **THE RANKING IS A PROPERTY OF THAT TEXT.** `session-3` builds a live IDF index
> over those ten chunks. Changing one word moves the document frequencies and can
> move every score the exercise displays, including the margin flag. After any
> Part O edit, run the four preset queries and check the rankings, the scores and
> the flag against what the lesson's own prose says about them.

## The case spine

The Cole household is the canonical case, ratified 2026-08-18 and replaced
whole on 2026-10-11 as **v5.0**: the name stayed and every fact changed
(PEDAGOGY §5.7, §13.2 R9). v5 is a mainstream pre-retiree household in
Naperville, Illinois: Meg Cole, 58, a nurse manager, and David Cole, 59, a
mechanical engineer, about $2,446,000 of investable assets (70% pre-tax), a
mortgage, two children, Meg's mother Ruth, two 2011 wills and one stale
beneficiary designation. Its unresolved question is the Roth conversion window.
`CASE.md` holds the authoritative block and its figures; the injected span
carries the Facts tab, the Map tab (Part L's two sheets) and the `COLE`
constant, and every lesson reads figures from `COLE` rather than typing them.
Changing a figure means changing `CASE.md`, running `build-case.mjs` and
`inject-case.mjs`, and re-deriving any lesson threshold that depends on it
(PEDAGOGY §8, derived thresholds), in the same commit. The v4 household (the
founder-owner and the trust sale) is retired; its every fact is a Part K row.

### Standing purge list

Retired strings. Any hit in the hub or a lesson is a defect. Most are retired
names; the last row is not a name at all, and the list holds strings rather than
names because the test is the same either way. Historical mentions inside
`CHANGELOG.md`, its rendered page at `changelog/`, and `audit/` are the record of
the retirement and are deliberately kept, so scope the purge check to the hub and
the lessons rather than running it across the whole tree.

| String | Retired | Replaced by |
|---|---|---|
| Okonkwo (also Okonkwo-Reyes, any dash) | 2026-08-18 | Cole |
| Adaeze | 2026-08-18 | Meg Cole |
| Ilesanmi | 2026-08-18 | (no equivalent, character removed) |
| Reyes | 2026-08-18 | Cole |
| **The v4 Cole facts** (CASE.md v5.0 Part K): Cole Precision Components, CPC, Hensley, Walter, Claire, Nathan, Whitaker, Barrington Hills, Rockford, Winnebago, Lakeshore, Merrit, Ostrander, Corbin, Halvorsen, Cole Family Holdings, the Irrevocable Trust, IDGT, SLAT, grantor trust, installment sale, seed gift, demand note, the burn, non-voting, voting unit, aerospace, fastener, buy-sell, appraisal, endowment, and every v4 dollar figure and authority Part K lists (`verify-migration.mjs` check 1 carries the regexes) | 2026-10-11 | the v5 household: Naperville, Northlake Regional Health System, Dunmore Industrial Equipment, Ruth Alder, Emma and Ryan |
| the LMS by name, the platform assignments are submitted through | 2026-08-25 | "the course site" |
| instructor note | 2026-08-26 | `instructor-notes/session-N.md`, outside the served pages |
| **Tier A — grading.** graded · grading · a grade · rubric *(as a course instrument)* · graded component · loses marks · full credit · submit · submitted · submission · turn in · points *(as course credit)* · pass/fail · any weight or percentage of a grade | 2026-08-27 | nothing — deleted. Grading is set by the instructor outside this site |
| **Tier B — between-session obligation.** due · due before Session N · deadline · 48 hours before Session N · before the week is out · ahead of Session N · bring X to Session N · read before Session N · was due today | 2026-08-27 | nothing — deleted, or "Reading for Session N" where the row is a reading list |

Match case-insensitively on the stem so punctuation variants cannot hide:
`grep -rin okonkwo`.

**The LMS check needs one exclusion and is worthless without it.** `session-4`
renders a bitmap through an HTML `<canvas>` element, so a case-insensitive grep
on the platform's name returns legitimate hits there and one in
`scripts/build-case.mjs`, where "canvas export" names a design tool. The LMS is
the capitalised word standing alone in prose. Since 2026-09-08 the name appears
nowhere in the repository, this file included, by instructor decision: the
repository stands alone from any submission platform. Run the check as
`grep -rniE 'c[a]nvas' --include='*.md' --include='*.html' .` (the bracket keeps
the pattern out of its own results); every hit must be the element, an element
id, or the design-tool export. Read every hit; do not automate this one.

**Why the name is gone at all.** No lesson may bind the course to one
submission platform, because the platform is the institution's choice and can
change between cohorts while the lessons do not. Name the destination in
platform-neutral words - never an action with no destination at all, which is
the defect that a careless removal creates.

**`instructor note` needs one exclusion, and it is not in this repository's
gift.** Every lesson and the hub carry the line

```
     --warn rust   = caution, failure states, instructor notes
```

inside the `STYLE:BEGIN`/`STYLE:END` fence. That fence is a byte-exact copy of
the skill's `assets/tokens.css`, written by `restyle_sweep.py`, and the string
lives at `tokens.css:6` and again at `references/design-system.md:26`. The repo's
own classifier calls those six hits **R4**, the region `EDITORIAL.md` marks
*never in scope, owned by `verify-style.mjs`*. Hand-editing them makes all six
files STALE against the skill's assets and `verify-style.mjs` exits 1; the next
sweep puts the string back. So the purge check is scoped to everything outside
the fence, and the six hits are routed upstream:

```bash
for f in index.html session-*/index.html; do
  awk '/\/\* STYLE:BEGIN/{s=1} /\/\* STYLE:END/{s=0;next} !s' "$f" \
    | grep -in "instructor note" | sed "s|^|$f:|"
done                                   # must print nothing
```

**Why the string is gone at all.** A note addressed to the person teaching is
not lesson copy, and a reader who views source is a reader. The notes live in
`instructor-notes/`, one file per lesson, and nothing links them from a served
page. `index.html` carries no notes file because it never carried a note.

**The six surviving `instructor note` hits do not violate the rule, and here is
the test that says so.** `index.html:19` and `session-*/index.html:19` (`:24` in
`session-0.1`) each carry the palette legend line inside the
`STYLE:BEGIN`/`STYLE:END` fence. The repo's own classifier calls all six **R4**,
which `EDITORIAL.md` marks *never in scope, owned by `verify-style.mjs`*, and
which the purge list has never governed. They are byte-identical to the skill's
`assets/tokens.css:6`, they are restored by `restyle_sweep.py` on every run, and
hand-editing them makes all six files STALE so `verify-style.mjs` exits 1. The
fix is upstream and is tracked as **DW-051**. The scoped check above is the one
that must print nothing; a raw `grep -ri "instructor note"` returning exactly
those six lines is the expected state, not a defect.

**Tier A and Tier B are why the course-policy strings are gone.** Nothing in this
repository is graded and it never will be. The repository is a live visual aid a
room follows during a lecture; **dates, deadlines, submission and grading are
set by the instructor outside this site**, which stands alone from whatever
platform carries them (decision of 2026-09-08). A sentence here
asserting a grade, a due date or an obligation is not merely stale — it has no
standing to make the claim, and two sources of truth for a deadline is worse than
one wrong one.

**What Tier A and Tier B do NOT reach, because deleting these would break the
lesson rather than fix it:**

| Kept | Example | Why |
|---|---|---|
| In-class instruction | *"Next 10 minutes / You / Open it cold"*, *"Do this now — 6 minutes, in pairs"*, every work-along gate | This is the visual aid working. It is the reason the file exists |
| A widget's own score | *"SCORE 8 / 8"*, *"TOTAL 12 / 12"*, *"Rubric coverage"* | Feedback computed in the room, not a course grade. A course grade is the instructor's; a diagnostic is the page's |
| Cross-session pedagogy | retrieval bridges, the case spine's artifact chain, spiral declarations | Ratified constructs. Held open as **DW-050**, not edited piecemeal |
| Regulatory deadlines | Regulation S-P's 30-day notification clock in `session-4` | A deadline **in the case**, which is the thing being taught |
| Data-handling rules | *"No real client data or personally identifying information enters any AI tool at any point in this course"* | A safety rule, not a grading rule. Kept in force. Repointed 2026-08-29 — see the note below |

**The Data-handling row was repointed on 2026-08-29, and the supersession is not the
one it was requested as.** The row previously cited *"No client nonpublic personal
information may appear in any work you produce in this course"*. It now cites the
**Course rule panel** string, which is the canonical statement of the same rule and
appears twice: `index.html:1103` and `session-1:1952`.

The repoint was asked for on the grounds that the previously cited sentence had been
deleted by commit `acd691f`. **Neither half of that is true in this repository.** There
is no `acd691f` — `git cat-file -e` fails on it and no branch contains it — and the
sentence is **live at `session-1:1961`**, region R1, inside the §08 panel headed *"What
you are looking at, and what you owe"*. Nothing was restored, because nothing was
removed.

**Merge note, 2026-08-29, same day.** `acd691f` then landed on `main` (PR #11): Pass 2 had
been running in a parallel session and merged after the repoint was written. It **did**
delete the `session-1:1961` sentence, with the whole §08 panel carrying it — so the
grounds the repoint was requested on became true after the fact. The paragraph above is
kept as the record of the tree it was written against. The repoint itself is unaffected:
its cited example is the Course rule panel string, which Pass 2 left untouched, and
Pass 2's register row **DW-061**, which recorded the same orphaned example independently
and asked for exactly this repoint or a restore, is closed by it.

The repoint is still right, and stands on its own reasons rather than on the deletion
that did not happen. The Course rule panel string is the stronger citation: it is the
rule as the course states it to students, it is duplicated on the hub so the row's
example survives any single lesson edit, and it names the actual boundary — what enters
an AI tool — rather than what appears in produced work. The `session-1:1961` sentence
remains in force and remains covered by this row; it is simply no longer the example.

**`session-0.1` was excluded from Tier A and Tier B, by instructor decision,
until the rebuild of 2026-10-12, and the exclusion ended with it.** The exclusion
covered the Fall 2026 page, which was a primer for a course that had not been
scheduled, so the ungraded-repo argument above did not reach it. The page is now
the self-paced setup page, part of the course, and it is written clean: it passes
the same Tier A, Tier B, LMS-name and `instructor note` greps as the lessons and
the hub, with nothing excluded but the STYLE fence for the last. It stays in the
repository, stays linked from the hub (first card), and stays in every validator
population. Nothing below is a rule for the rebuilt page; it is the record of why
the Fall 2026 page was left alone.

**Historical, and no longer a constraint: the Fall 2026 page MUST NOT be
purged**, and the reason was mechanical rather than editorial. Its
`LMBOX` and `LMSTYLE` fences were byte-paired with `session-1`'s, asserted by the
md5 loop in the pre-push gate above and counted by `A9b` as shared boilerplate.
Editing either copy alone breaks the pairing — measured, not assumed: removing
one clause from `session-1`'s copy raised `A9b` from 6 distinct shared blocks to
7. So a Tier A or Tier B string inside a fence could not be purged from one lesson,
and purging it from both meant editing `session-0.1`, which this decision
forbade. The disposition was held open as **DW-057**; the rebuild closed it, and
the pairing it protected is gone.

**One Tier A string survives in `session-1` and it is ACCEPTED, not outstanding.**
`session-1:1349` — *"Nothing is graded on it and nothing breaks without it"* —
sits inside that `LMBOX` fence. The instructor accepted it as-is on 2026-08-27:
it **disclaims** grading rather than asserting it, so it is not the defect Tier A
exists to catch, and editing it would have cost the `session-0.1` byte-pairing for
no gain. **DW-048, closed. Do not re-open it.** (The pairing cost lapsed on
2026-10-12 with `session-0.1`'s copy of the fence; the acceptance stands as the
instructor's decision until the instructor revisits it.)

## Adding a session

> **The complete set is `index.html` + `session-0.1` + sessions 1-5.** On
> 2026-08-27 the instructor decided that Session 5 was a student presentation
> meeting and no `session-5/index.html` was owed. **On 2026-10-02 the instructor
> asked for the page** (kickoff in `docs/changes/2026-10-02-session-5-build/`),
> and the later decision supersedes the earlier one: Session 5 is built at about
> 83% of the other sessions' allocated minutes (59 core + 66 appendix = 125,
> after the 2026-10-04 interactivity pass added §07, the firm's skill library)
> because student presentations shorten the class, and its logistics live in
> `instructor-notes/session-5.md`, not on the page. No further session is owed;
> the steps below are the record of how a session is added.

1. Create `session-N/index.html`.
2. Add a card in `index.html`, copying an existing one and removing the `soon`
   class from the anchor.
3. Add the row to the session table in `README.md`.
4. Note it in `CHANGELOG.md`, then run `python3 scripts/build-changelog.py` and
   commit both files. The generator regenerates the served page **and** runs
   the sweep on it, because it writes an empty style fence that only the sweep
   can fill. Without the sweep the fence is stale and `verify-style.mjs` fails
   on a page whose source is correct. If the skill is not installed the
   generator says so and names the command to run by hand.
5. Run the pre-push gate, then commit and push.

## The appendix reflow and its generated regions

`scripts/build-appendix.mjs` owns every place a lesson states a section count or
a minute figure that a table also computes. Before Phase 2 that figure was
hand-typed in up to **nine** places per lesson and had drifted apart in every
one of them: A1 through A5 stood at 23 violations, `session-2` carried a
student-facing time budget that agreed with none of the other copies, and
`session-3`'s footer was wrong on all four numbers it gave.

```bash
node scripts/build-appendix.mjs           # rewrite all five lessons
node scripts/build-appendix.mjs --check   # exit 1 if a lesson disagrees with its sections
node scripts/build-appendix.mjs --file session-2/index.html
```

It is **idempotent**, so `--check` is "run it and diff", which is how a hand-edit
inside a generated region is detected. Same contract as `verify-case.mjs`: the
span between the sentinels belongs to the script.

| Region | What it holds | Checked by |
|---|---|---|
| `APXPANEL` | `section.apxdiv#apx`, the leading contents panel and its cards | A2, A3, A4, A5 |
| `APXSTUB` | one per appendix section: what is hidden at the current depth and what it costs | the tier state |
| `APXBUDGET` | `table.tbudget > tbody`, the instructor minute budget | `validate_lesson` V5, migration 16 |
| `APXCORE` | `window.__coreMins` | nothing else; this is why it drifted |
| `APXMAP` | optional. A student-facing time budget. `session-2` carried the only one until 2026-09-12, when the §00 trim retired it; the template stays in the script, so restoring the sentinel restores the table | nothing else |
| `APXNOTE` | optional. `session-3`'s footer paragraph on the shape of the file | nothing else |

**Editing a generated region by hand is a finding, not a merge.** Change the
section, then re-run. `fill()` throws rather than emitting a template with a
hole in it, so a missing value is a crash and never a published `{{PLACEHOLDER}}`.

**It never resolves a ratified-parameter conflict.** Where a section's minutes
disagree with `references/pedagogy.md` s4, it prints the conflict on every run
and writes the section figure, because that is the only self-consistent thing it
can do. The open one is in "Known follow-ups" below.

## Sources, the bibliography and the live-data register

`SOURCES.md` is hand-edited at the repo root and is the source of truth for every
citation in the corpus. Everything else about a source is generated from it.

```bash
node scripts/build-sources.mjs            # the model, as a report
node scripts/build-sources.mjs --json     # the model, as JSON
node scripts/inject-sources.mjs           # write every lesson's footer from it
node scripts/inject-sources.mjs --check   # report drift, write nothing
node scripts/verify-sources.mjs           # the hash guard, plus what only it can see
node scripts/build-bibliography.mjs       # write BIBLIOGRAPHY.md, DATA-PULL.md and
                                          # docs/source-verification-queue.md
node scripts/build-bibliography.mjs --check
node scripts/attest-verified.mjs          # the two dating fields, and the lock
node scripts/build-unsourced.mjs          # write docs/unsourced-claims.md
```

**One record per work, not per citation.** Before `SOURCES.md` existed,
`src-wolfram` carried four incompatible citations of one essay across four
lessons. Eight keys diverged that way; seven are arbitrated in `SOURCES.md`'s
own header and one, `src-aa`, is deliberately **not**, because its three records
disagree about what the data is rather than how to format it.

**What is hand-edited and what is derived.** A human knows the publisher; only
the corpus knows the chip count. `total_references` and `cited_by[]` are computed
on every run and **do not exist as fields**, which is the same discipline that
put the minute figures behind `build-appendix.mjs`.

**`kind` wires to A15 by construction.** Three of its six values — `authority`,
`background`, `fabricated` — are exactly A15's `data-nochip` enumeration.
`build-sources.mjs` reads that list out of `verify-editorial.mjs` and throws if
they disagree, so the two cannot drift apart by maintenance.

## The two dating fields, and the one you may not write

`SOURCES.md` carries **two** dates on every record. They are not interchangeable
and neither substitutes for the other.

| Field | What it asserts | Who may move it |
|---|---|---|
| `last_verified` | **The instructor read the source** and confirmed this repository's claims about it are still accurate. A human attestation. | **The instructor, and nothing else.** |
| `last_retrieved` | A machine fetched the source. Records **when**, and never that anything is accurate. | Any re-pull. This is what *"update all live data points"* advances. |

**`last_verified` is EMPTY almost everywhere and that is the honest state.** It
is not a backlog of missing data; it is the measurement. A populated
`last_verified` asserts that a human read the source, and asserting that without
evidence is the failure the never-fabricate rule exists to prevent. **Empty is
the honest value. Do not backfill it with today's date, the commit date, the
publication date, or the date the source entered the repo.**

The rule is wired, not written down and hoped for. Two mechanisms, and both have
to be defeated at once for a date to move without a human:

```bash
node scripts/attest-verified.mjs                 # the state, and the lock
node scripts/attest-verified.mjs --key src-x \
     --date 2026-08-25 --evidence "..."          # INTERACTIVE TERMINAL ONLY
node scripts/attest-verified.mjs --clear --key src-x
```

1. **The lock.** `scripts/sources-verified.lock.json` notarises every
   `(key, last_verified)` pair. `build-sources.mjs` recomputes the digest on
   every parse and **throws** on any difference, naming the keys that moved.
   Every generator goes through `model()`, so a `last_verified` that moved takes
   down `build-sources`, `inject-sources`, `build-bibliography` and
   `verify-sources` together.
2. **The writer.** `attest-verified.mjs` is the only thing that updates the lock
   and it **refuses unless stdin is a TTY**. A generator, a CI job, a re-pull
   and an agent shell all have no TTY and all are refused. `--init` seeds the
   lock once and refuses to re-seed, so re-seeding is not a way round the gate.

Observed refusing, which is the only reason to believe it: advancing a date
through the writer exits 2; hand-editing the date into `SOURCES.md` takes all
four generators to exit 1; re-seeding the lock exits 2.

**A generated verification date is the tool vouching for itself**, which is the
same defect class as a chip pointing at the wrong source.

### Partial retrieval dates

`last_retrieved` accepts a full `YYYY-MM-DD` or a partial `YYYY-MM`. A partial is
the honest record of a pull whose day nobody wrote down, and `DATA-PULL.md`
**reports every one as a precondition failure of the ordering rule** — a month
cannot be ordered against a day, and that is exactly where `src-aa`'s version
incoherence hid. For the ordering rule a partial stands at its **earliest
possible day**, which is a declared reading convention and never a date. No day
is ever invented.

## The unsourced-claim register

Two markers, and the distinction between them is load-bearing:

| Marker | What it asserts |
|---|---|
| `[UNCONFIRMED]` | **No source corroborates it. The claim itself is in question.** |
| `[NEEDS SOURCE]` | **The claim is right; a citation has not been attached.** |

`[NEEDS SOURCE]` is the **stronger** claim, because it asserts that somebody
checked. A wrong `[UNCONFIRMED]` gets read and downgraded; a wrong
`[NEEDS SOURCE]` gets read and believed. **Default to `[UNCONFIRMED]`.**

Both are declared forms under `EDITORIAL.md` A16 and a marker in any other form
is a hard failure. Each marker carries an adjacent annotation comment, which is
never rendered:

```html
<!-- CLAIM weight=exercise resolve="…" candidate="…" confidence=low -->
… the claim <b>[UNCONFIRMED]</b>
```

`weight` is the only field typed by hand, because it is the only one the corpus
cannot see: it says **how much depends on the claim** — `answer`, `exercise`,
`section`, `claim`, `aside` — and it is the sort order of the register.

```bash
node scripts/build-unsourced.mjs          # write docs/unsourced-claims.md
node scripts/build-unsourced.mjs --check  # exit 1 if it would change
```

A marker with no annotation, an unknown `weight`, or no `resolve="…"` is a
**hard failure**: a claim in the register that does not say what would resolve it
is a claim nobody can act on.

**The register also reads the pre-existing form, `[UNVERIFIED, needs source]`**
(DW-135). `EDITORIAL.md` A16 declares it for lessons, and until 2026-10-11 the
generator matched only the two markers above, so A16 reported six markers in
`session-0.1` that the register never listed. It now reads exactly the forms A16
declares, in A16's regions (R1, R2, R7 and R8), over A16's six lessons
(`session-0.1` and sessions 1 to 5), and also the hub, which A16 does not read
(whether it should is DW-014). The Totals table counts the two apart: *A16's
population* reconciles with the count A16 prints, *the hub* is extra. No other
check reads the hub's markers, so the generator itself hard-fails a bracket
marker in an undeclared form there, using A16's own pattern. Two kinds of marker
are listed but are not claims: a marker named inside a CLAIM annotation, and a
marker on one of the two script-comment lines in `session-0.1` that A16 names as
declaring the convention, pinned by their exact text in `CONVENTION_COMMENTS`.
A marker in any other script comment is never exempt: outside `session-0.1` it
needs a CLAIM annotation like any claim and fails without one; in `session-0.1`
an unannotated `[UNVERIFIED, needs source]` is listed as a legacy, no-weight
claim and any other form fails. So a new comment, or a lexer that mistakes a
string for a comment, lists a claim or fails; it never exempts one. `session-0.1` was frozen (DW-057) and its markers predated the CLAIM
convention, so it is the one file in `LEGACY_UNANNOTATED` allowed to carry the
old form without an annotation; those rows have no weight and sit in their own
section. The rebuilt page of 2026-10-12 carries no marker of any form, so that
allowance and the two pinned `CONVENTION_COMMENTS` lines for `session-0.1` match
nothing and are inert; they are left in `scripts/build-unsourced.mjs`, and
`docs/unsourced-claims.md` is regenerated to drop the six rows. Anywhere else an unannotated marker of any form is the usual hard
failure. **Regenerate the register after any edit to a lesson that moves a
marker's line.**

## The case-fact drift surface

`scripts/case-inventory.mjs` answers one question repeatably: **how many
references to a Cole household fact can drift?**

```bash
node scripts/case-inventory.mjs               # the summary
node scripts/case-inventory.mjs --full        # every occurrence
node scripts/case-inventory.mjs --misses      # every occurrence it declined to count
node scripts/case-inventory.mjs --orphans     # money figures CASE.md does not carry
node scripts/case-inventory.mjs --report      # write docs/case-fact-inventory.md
```

| Guard state | Meaning |
|---|---|
| `INJECTED` | Inside the `CASE:BEGIN` / `CASE:END` span. Overwritten on the next inject, hash-guarded by `verify-case.mjs`. **Cannot drift.** |
| `PINNED` | Matched by a `verify-migration.mjs` check-20 regex pin, which asserts it against `case-facts.json`. |
| `UNGUARDED` | Everything else. **This is the number that has to fall.** |

**The rule the corpus is held to:** *every quantitative case fact appears once,
injected from `CASE.md`; every other reference to it is qualitative.* A lesson
may say "Meg's largest asset is her CPC interest". It may not restate the
valuation. Reconciling twelve copies of a number leaves twelve copies to drift
again; removing eleven of them removes the drift surface.

Where a figure genuinely has to be a literal — an answer key, a chart data array
— the injected span defines a JS constant `COLE` holding every keyed figure, so
`COLE.notePrincipal` beats typing `20020000`. Where even that is impossible, add
a check-20 pin and register it.

**`verify-sources.mjs` reports the same three failures `verify-case.mjs` reports,
in the same words** — no sentinels, block was hand-edited, stale against the
current build — so a maintainer reading a failure does not have to learn a second
vocabulary. It also reports two things only it can see: a chip pointing at a key
`SOURCES.md` does not define, and a source a lesson lists but never cites, split
by whether its kind exempts it.

**`BIBLIOGRAPHY.md` and `DATA-PULL.md` are generated and must never be
hand-edited.** The next run overwrites them. `DATA-PULL.md` runs one assertion
that currently fails on purpose: **`pulled_on` ascending implies `index_version`
non-descending**, which report §3.7's G3 recorded as a note and which `src-aa`
violates.

**Where a field is unknown, the register says so and the footer omits it.**
`SOURCES.md` carries `[UNVERIFIED, needs source]`; the rendered lesson footer
prints nothing rather than a marker; `BIBLIOGRAPHY.md` prints every gap, because
completeness is what a reader goes there for.

## The editorial checks

`EDITORIAL.md` is the rules. `scripts/verify-editorial.mjs` is the checker.

**These are ADVISORY and are NOT in the pre-push gate above.** That is decision
D16: the gate currently runs clean, and adding a checker whose exemption list has
not yet been tested against a running implementation is how a green gate stops
meaning anything.

```bash
node scripts/test-editorial-regions.mjs        # 9 tests. Run before trusting a rule
node scripts/verify-editorial.mjs              # HARD rules exit 1
node scripts/verify-editorial.mjs --advisory-only   # burn-in: everything prints, exits 0
node scripts/verify-editorial.mjs --rules A1,A5     # a subset, while working
```

### Read this before anything else in this entry: the baseline file

`scripts/editorial-baseline.json` is hand-edited and the checker never rewrites
it. Four rules are **ratchets** — they do not assert a correct value, they assert
that a recorded one has not got worse. So the baseline is state, not
configuration, and it is only meaningful if you know what each figure counts.

| Figure | Counts |
|---|---|
| `A8.files` | per lesson, the majority dash form and the minority count over `authoredProse` |
| `A9.files` | per lesson, total em dashes over `authoredProse` |
| `R11` | the whole corpus's byte-shared boilerplate, **deduplicated by content hash** so a block shared across four lessons counts once |
| `populations` | what `authoredProse` and `quotationScope` include, and why they differ |

`authoredProse` is `mask(R1, R8, R9)`. Source notes and reading blocks are in;
footer entries, attributes, script, CSS, comments, the injected span, captured
transcripts and byte-shared boilerplate are out. `EDITORIAL.md`'s phrase "R1 with
R2–R11 removed" read literally would also drop R8 and R9 and does not reproduce
the recorded numbers — this definition does, and `test-editorial-regions.mjs` T7
is the proof.

**Re-baselining after a sanctioned cleanup.** A ratchet must be lowered by hand,
deliberately, or it silently stops catching anything.

**STANDING RULE — a recorded baseline is re-recorded only on Jared's explicit
instruction.** Every figure in `scripts/editorial-baseline.json` is a *recorded*
value, the `A9` total that `test-editorial-regions.mjs` T7 pins the classifier to
included. Those figures are re-recorded **only when Jared has asked for it, in
words, for that figure**. Any movement of a measured figure away from its
recorded baseline that he did not ask for is a **halt-and-report** condition, and
it is a halt in BOTH directions:

- A **rise** is impossible by rule already, and stays impossible.
- A **fall** is not self-service. "The ratchet allows a fall" is a statement
  about the check, not a licence to re-record the figure; nor does an honest
  side effect of otherwise sanctioned work make the re-record his decision to
  skip. A fall he did not ask for halts exactly as a rise would.

Stop before committing. Report the delta — which rule, which file, the before and
after numbers, and the edit that moved them — and wait for the instruction. The
steps below are how to re-record a figure **once that instruction exists**; they
are not authority to decide that it should be re-recorded. If the instruction
does not come, the resolution is the edit reverted or the work re-scoped, not the
bar moved. T7 failing is not an exception to this: a red T7 is the report you owe
Jared, not a licence to green it yourself.

With that instruction in hand:

1. Make the cleanup. Confirm the change was intended to move a counted figure.
2. `node scripts/verify-editorial.mjs --rules A8,A9` and read the new numbers off
   the failure text, or run the classifier directly.
3. Edit `scripts/editorial-baseline.json` to the **new, lower** figures. Never
   raise one to make a failure go away — that is the one edit the file exists to
   prevent.
4. `node scripts/test-editorial-regions.mjs` must pass; T7 reads the baseline.
5. **Open a row in `docs/deferred-work.md` in the same commit** (see the rule
   below).
6. Commit the baseline change on its own where you can, so the diff shows exactly
   which figure moved and by how much. **T7 can take that choice away**: it
   requires the baseline to reproduce the classifier exactly, so a cleanup that
   moves a counted figure fails T7 until the baseline moves with it. Where that
   happens the lowering rides in the cleanup's own commit, and step 5 is what
   keeps it visible.

**STANDING RULE — a lowered count is a row in `docs/deferred-work.md`, in the
same commit.** Any figure in `scripts/editorial-baseline.json` that goes DOWN
must be recorded there as a new row, carrying **the delta and the reason**: which
rule and file, the before and after numbers, and what edit moved them. Not the
next commit, not the phase write-up. The same commit.

**The reason is that lowering a ratchet spends coverage, and spending it quietly
is how the ratchet stops meaning anything.** A raised figure is impossible by
rule; a lowered one is legitimate and therefore invisible, because the check goes
on passing. The register is the only place a reader can see that the corpus is
now measured against a slacker bar than it was, and why. Steps 1-4 make the
lowering correct. This step makes it *reviewable*: a row nobody can defend is a
lowering that should not have happened.

Three lowerings were made before this rule existed and are recorded
retroactively as **DW-045**. `scripts/editorial-baseline.json`'s own `A9` note is
the narrative; the register is the index into it. The narrative is not a
substitute for the row — it lives in the file being weakened, which is the one
place a reader checking whether the bar moved would not think to look.

### The region classifier

`scripts/editorial-regions.mjs` assigns every character offset to one of R1–R11.
R1 is a residual: what survives after every other region is claimed. Every rule
names the regions it inspects, because every alarming raw measurement in this
corpus turned out to be something else once classified — the 1,239 hits for
`color` are CSS properties, and session 3's 110 literal em dashes are the
original author's convention.

One recorded limitation: R2 is defined as a script literal "that reaches the
DOM", which needs data-flow analysis the classifier does not do, so every quoted
literal inside `<script>` is treated as visible. The over-inclusion is
one-directional and never misses a string that does render.

### Severity is a config field, not an inference

In `scripts/editorial-baseline.json` under `severity`, one entry per rule,
visible and diffable. A human edits it; nothing infers it at runtime.

| Rule | Severity | Why |
|---|---|---|
| A1–A11, A13, A14, A16 | HARD | mechanical, unambiguous |
| **A12** | **ADVISE** | until the D7 mapping is signed off. It cannot be hard while the fix needs a mapping nobody has approved |
| **A15** | **ADVISE** | until `data-nochip` lands. Hard today would fire on 23 keys with no way to declare their reason |
| **A17–A19** | **DISABLED** | the vocabulary feature is not built. A disabled rule prints nothing at all |

`--advisory-only` overrides every rule to ADVISE and exits 0.

### Promoting it into the pre-push gate

1. Run it advisory-only, outside the gate, and read the output.
2. Every false positive is an exemption class `EDITORIAL.md` has not yet named.
   **Add it to `EDITORIAL.md`, not to the code.**
3. When the exemption list stops changing, move the HARD tier into the gate above.
4. Rename that block — "The CASE.md v4.0 migration checks" will no longer
   describe what it contains.

## Known follow-ups

> **`docs/deferred-work.md` IS THE SINGLE DEFERRAL REGISTER. Every open item
> in this repository is a row in it, and open work is tracked nowhere else.**
>
> **The per-phase `§N.8 What Phase N leaves open` sections in
> `docs/repo-updates-plan.md` point here and do not accumulate their own.**
> §13.8, §15.4 and §16.8 were folded into the register on 2026-08-25 and are now
> the history of what each phase found, not a queue. A phase that finds
> something adds a row; it does not start a fourth list. Three parallel lists is
> how an item stays open in one of them and closed in another with nothing
> saying which is true.
>
> The bullets below are the pre-register backlog, folded in as DW-029 through
> DW-032 and DW-037 through DW-040. **Four of them are stale and one (D17) is
> fixed, and the register says so** (all five struck through below on
> 2026-10-11) rather than deleting them, so
> they are not raised again as new: D14
> is answered as D20, the 48 Part A violations now measure 0 hard and 13
> advisory (0 hard and 2 advisory on 2026-10-11), the mis-wired chips were re-derived in Phase 3 as 39 and the 20
> mis-wired onto an existing footer key rewired, and `session-1`'s
> 17-minute discussion block was closed by DEC-2 / DEC-3. Read the register
> first; read these for the reasoning behind them.

- Self-host the three font families to retire the page-load external request,
  so a lesson renders with no network at all. The console's runtime request is
  separate and stays: it only fires on a key the reader supplies.
- **`validate_lesson.py` V2 matches any `href`, so the documented pre-push gate
  above has never run clean as written.** Its regex is
  `(?:href|src)\s*=\s*["'](https?://[^"']+)["']` plus the two `url(...)` forms,
  which fires on a plain `<a href>`. **An `<a href>` makes no request.** So every
  footer citation hyperlink is reported as an external request: 6 in
  `session-1`, 6 in `session-2`, 5 in `session-3`, 5 in `session-4`. The exact
  failing input, from a clean run on 2026-08-25:

  ```
  <li id="src-wolfram"><b>Wolfram, S. (2023, 14 February).
    <a href="https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/">
    What Is ChatGPT Doing ...</a></b> ...
  FAIL  V2   external request outside the fonts exception:
             https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/
  ```

  A lesson therefore cannot both cite its sources with a link and pass V2, and
  `CHANGELOG.md` records adding those links as an improvement. This document's
  own fallback grep gets it right by matching `<(link|script|img|iframe)` only.
  **The fix belongs in the skill, not this repo**, alongside C2 below, which is
  why it is written down here. An earlier handoff listed V2 as fixed; it is not.
  Do not route around the check and do not edit the skill from this repo.
- **`validate_lesson.py` C2 must be corrected or retired upstream when A8 and A9
  go hard.** It emits an INFO em-dash count over the raw file, so it includes
  CSS, comments, attribute values and the injected span and misses `\u2014` and
  `&#8212;` entirely, and its "policy unratified" parenthetical is now wrong
  because D1 ratifies it. **The fix belongs in the skill, not this repo**, which
  is exactly why it is written down here.
- ~~**`docs/spine-brief.md`'s opening paragraph is stale (D17).** It reads
  "Nothing here is implemented"; the spine has been implemented since `93904d7`
  and lives in a string literal in `scripts/inject-case.mjs`.~~
  Fixed 2026-10-11: DW-032 (the brief's opening now says the spine is implemented).
- ~~**27 of 193 confidence chips resolve to the wrong source**, two of them
  off-by-one cascades. Fixing the wiring is a **precondition** for generating any
  bibliography, not a follow-up: a generator run today publishes all 27 as fact.~~
  Superseded: DW-039 (Phase 3 re-derived the count as 39 and rewired the 20 mis-wired onto an
  existing footer key; 11 lacked a footer source and 8 were not source claims; A13 and A15
  measure the chips on every run).
- ~~**`session-1`'s named discussion block is 17 minutes and
  `references/pedagogy.md` s4 says 15.** Until Phase 2 the only copy carrying 15
  was the appendix index card, and the card was wrong about four other sections,
  so regenerating the index from the sections overwrote the one figure in that
  lesson that matched the parameter. `scripts/build-appendix.mjs` now prints the
  conflict on every run rather than letting the generator settle it by writing
  last. Two readings and the instructor picks: either the block really is 17 and
  the parameter is stale, or it is 15 and two minutes go back to `#s8`, which is
  where the card said they were. `docs/repo-updates-plan.md` s4.7 carries both.~~
  Superseded: DW-040 (closed by DEC-2 / DEC-3: restored to 15; DEC-3 moved the two minutes to the
  closing question, `#s15`, 5 to 7, and `#s8` stays at 16).
- **Five sources are listed by a lesson that never cites them**, and none is
  exempt by kind: `src-google-ptcf` and `src-pricing` in `session-2`,
  `src-finra2409` and `src-secpri` in `session-3`, `src-finra2409` in
  `session-4`. Each is either a missing chip or a source that does not belong in
  that footer. `src-google-ptcf` is the sharpest: `session-2` §03 teaches the
  Persona-Task-Context-Format framework and cites its source nowhere.
- **Five moving targets carry no retrieval date at all**, and one of them,
  `src-synthid`, feeds **eleven** references across two appendices. The others
  are `src-vectara` (4), `src-owasp` (1), `src-kitces-advisortech` (0) and
  `src-aa`, whose three retrievals are registered individually because they
  disagree. Three more are dated to a month with no day. A moving target with no
  date cannot be re-checked, which is the whole purpose of registering it.
- ~~**D14 is unanswered.** Is session 0.1 in this term's teaching set? A1–A7 have
  no population in that file and A6 carries a dated skip until it is answered.~~
  Superseded: DW-037 (`EDITORIAL.md` answers it as D20, 2026-08-25).
- ~~**48 Part A violations stand, pending the D16 burn-in.** Reported, not fixed;
  fixing them is a separate task with its own approval.~~
  Superseded: DW-038 (re-measure with `node scripts/verify-editorial.mjs` before re-raising).

### Closed, and what owns them now

- ~~Prose density runs 73 to 89 words per allocated minute against a proposed
  band of 37 to 42.~~ **Superseded.** That range is not reproducible by any
  method; whole-file is 43–63 and the core is 52–84. The band stays unratified
  by decision D15, and core and appendix are reported separately. See
  `EDITORIAL.md`'s known-stale note.
- ~~Footer sources not yet referenced by any confidence chip.~~ **Owned by A15**,
  which asserts a chip **or** a declared `data-nochip` reason. The blanket
  version was never actionable: it would demand a confidence chip on the two
  deliberately fabricated citations, which is backwards.
- ~~Em-dash policy for student-facing lesson copy is open (pedagogy decision
  D-2026-08-18-2).~~ **Ratified as D1** in `EDITORIAL.md`: existing copy keeps
  its dashes, newly authored text uses none, no retrospective sweep. **Owned by
  A9** (a count ratchet, which is how "no new dashes" is enforced without needing
  history) and **A8** (form drift). Note that the skill's
  `references/pedagogy.md` still records the decision as open; the course-level
  ratification lives here, and the skill is shared across repos.
