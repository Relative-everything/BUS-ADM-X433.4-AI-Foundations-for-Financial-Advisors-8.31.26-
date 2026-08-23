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
CASE.md               Canonical Cole household case block, the source of truth
CHANGELOG.md          Human-readable record of every revision
MAINTAINING.md        This file
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
| `generativelanguage.googleapis.com` | Runtime only, and only after a reader pastes their own API key | Sessions 0.1 and 1 |

The second is the live model console (`LM:BEGIN` / `LMBOX:BEGIN` /
`LMSTYLE:BEGIN` fences). It is off by default, every exercise it touches keeps a
captured fallback that renders when no key is connected or a call fails, and the
key is held in one JavaScript variable and never stored. **The storage grep in
the pre-push gate is the regression test for that key handling** — if it ever
hits, the key is being persisted and the design has been violated. Do not add the
console to Sessions 2, 3 or 4: their exercises run on students' own client work,
and the free tier's terms permit Google to train on what is submitted.

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

## The CASE.md v4.0 migration checks

These live in this repo, not the skill, and all exit 0. Run them from the repo
root after any edit to `CASE.md` or to a lesson.

```bash
node scripts/build-case.mjs        # CASE.md -> the generated artifacts. Fails
                                   # loudly if a figure it looks for has moved,
                                   # and recomputes 13 Part M identities.
node scripts/inject-case.mjs       # rewrite the span between the CASE sentinels
node scripts/inject-case.mjs --check   # report drift, write nothing
node scripts/verify-case.mjs       # hash every injected block; non-zero on drift
node scripts/verify-migration.mjs  # retired facts, allowances, arithmetic, timing,
                                   # and the spine drift guard (check 20)
node scripts/verify-browser.mjs    # DOM, handlers, flowchart, screenshots (Chromium)
node scripts/verify-style.mjs      # CHECK the managed style fence, see below
```

**Why `verify-style.mjs` instead of `restyle_sweep.py --check`.** The sweep globs
every `*.html` in the tree and wants a fence in each. Two files here are HTML
*fragments*, not documents: `scripts/case-extract.html` and
`scripts/case-flowchart.html` are generated and injected *into* the lessons, so
giving them a fence would embed the whole stylesheet in every lesson six times.
The wrapper asserts something stricter than the raw sweep: every lesson document
must be current, **and** the only fenceless files in the tree must be exactly
those two fragments. A third fenceless file fails it. Use the raw sweep to
*write* the fence; use the wrapper to *check* it.

Without the skill, these fallback checks cover the same ground:

```bash
grep -rin "okonkwo" index.html session-*/index.html          # must be empty
grep -rnE 'localStorage|sessionStorage|indexedDB|document\.cookie' \
  index.html session-*/index.html                            # must be empty
for f in index.html session-*/index.html; do                 # externals: allowlist
  grep -Eo '<(link|script|img|iframe)[^>]*(href|src)="https?://[^"]+"' "$f" \
    | grep -Ev 'fonts.googleapis|fonts.gstatic'
done
# the console's runtime origin, allowed only in 0.1 and 1, and only in JS
grep -l 'generativelanguage.googleapis.com' index.html session-*/index.html \
  | grep -Ev 'session-(0\.1|1)/index.html'                    # must be empty
# the three shared console blocks must stay byte-identical across lessons
for m in 'LMSTYLE:BEGIN' 'LMBOX:BEGIN' 'LM:BEGIN'; do
  sed -n "/$m/,/\/\* *LM.*:END\|LMBOX:END/p" session-0.1/index.html | md5sum
  sed -n "/$m/,/\/\* *LM.*:END\|LMBOX:END/p" session-1/index.html   | md5sum
done                                                          # pairs must match
grep -H '<title>' index.html session-*/index.html            # hub and lessons agree
```

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

Sessions 0.1 and 1 carry an optional console that lets a reader paste their own
Gemini API key and run the page's probes against a live model instead of the
captured outputs. Rationale, alternatives considered and the pedagogical case are
in [`docs/live-model-console-plan.md`](docs/live-model-console-plan.md); the
terms and quota analysis behind the bring-your-own-key choice are in
[`docs/gemini-live-api-feasibility.md`](docs/gemini-live-api-feasibility.md).

Three fenced blocks, **byte-identical across both lessons**:

| Fence | Where in the file | What |
|---|---|---|
| `LMSTYLE:BEGIN v1` | After `/* STYLE:END */`, so the sweep never touches it | Console CSS |
| `LMBOX:BEGIN v1` | First child of `.wrap` | Console markup |
| `LM:BEGIN v1` | Inside the main IIFE, after the `all()` helper | Call layer |

Page-specific wiring lives under a `LIVE HOOKS, page-specific` comment near the
end of the same IIFE. **Session 1 has two `<script>` blocks** — the hooks must go
in the first one, where `$`, `el` and the console are in scope. Putting them in
the second gives a silent `$ is not defined` at load.

Rules for changing it:

- Edit one copy, then paste it into the other and confirm the md5 pair in the
  pre-push gate matches. Bump the version in all three fences on any change.
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
  auto-revoked, and you find out mid-class.

The browser test suite in `scripts/test_live_console.js` covers all of this
against a mocked endpoint. Run it before pushing a console change:

```bash
NODE_PATH=$(npm root -g) node scripts/test_live_console.js
```

## The case spine

The Cole household is the canonical case, ratified 2026-08-18. `CASE.md` holds
the authoritative block and its figures. Session 1 introduces it in full;
Sessions 2 through 4 carry shorter recall summaries, and every figure in those
summaries must match `CASE.md`. Changing a figure means changing `CASE.md` and
every lesson in the same commit.

### Standing purge list

Retired names. Any hit in the hub or a lesson is a defect. Historical mentions
inside `CHANGELOG.md`, its rendered page at `changelog/`, and `audit/` are the
record of the retirement and are deliberately kept, so scope the purge check to
the hub and the lessons rather than running it across the whole tree.

| Name | Retired | Replaced by |
|---|---|---|
| Okonkwo (also Okonkwo-Reyes, any dash) | 2026-08-18 | Cole |
| Adaeze | 2026-08-18 | Meg Cole |
| Ilesanmi | 2026-08-18 | (no equivalent, character removed) |
| Reyes | 2026-08-18 | Cole |

Match case-insensitively on the stem so punctuation variants cannot hide:
`grep -rin okonkwo`.

## Adding a session

1. Create `session-5/index.html`.
2. Add a card in `index.html`, copying an existing one and removing the `soon`
   class from the anchor.
3. Add the row to the session table in `README.md`.
4. Note it in `CHANGELOG.md`.
5. Run the pre-push gate, then commit and push.

## Known follow-ups

- Self-host the three font families to retire the page-load external request,
  so a lesson renders with no network at all. The console's runtime request is
  separate and stays: it only fires on a key the reader supplies.
- Prose density runs 73 to 89 words per allocated minute against a proposed
  band of 37 to 42. The band is unratified and reported only, but the direction
  is consistent: the sessions carry more words than their minutes support.
- Footer sources not yet referenced by any confidence chip, reported as
  warnings by `validate_lesson` V4. Each is a claim on the page that should
  carry a chip, or a source that should be retired.
- Em-dash policy for student-facing lesson copy is open (pedagogy decision
  D-2026-08-18-2). Existing copy keeps its dashes; files authored since
  2026-08-20 avoid them. Never run a repo-wide substitution.
