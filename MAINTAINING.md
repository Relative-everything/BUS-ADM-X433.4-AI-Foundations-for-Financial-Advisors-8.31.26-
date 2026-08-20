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
inline. The only permitted external request is Google Fonts. No lesson may use
localStorage, sessionStorage, indexedDB, or cookies: state lives in JavaScript
variables and dies on reload.

## Publishing

Publishing and versioning are the same act. GitHub Pages serves whatever is on
`main`, and a push goes live in about a minute.

```bash
git pull origin main
# make the edit
git add -A
git commit -m "Session 1: correct the Section 1202 gross-asset ceiling"
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
python3 scripts/restyle_sweep.py <repo> --check
```

Without the skill, these fallback checks cover the same ground:

```bash
grep -rin "okonkwo" index.html session-*/index.html          # must be empty
grep -rnE 'localStorage|sessionStorage|indexedDB|document\.cookie' \
  index.html session-*/index.html                            # must be empty
for f in index.html session-*/index.html; do                 # externals: fonts only
  grep -Eo '<(link|script|img|iframe)[^>]*(href|src)="https?://[^"]+"' "$f" \
    | grep -Ev 'fonts.googleapis|fonts.gstatic'
done
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

- Self-host the three font families to retire the one permitted external
  request, so a lesson works with no network at all.
- Prose density runs 73 to 89 words per allocated minute against a proposed
  band of 37 to 42. The band is unratified and reported only, but the direction
  is consistent: the sessions carry more words than their minutes support.
- Footer sources not yet referenced by any confidence chip, reported as
  warnings by `validate_lesson` V4. Each is a claim on the page that should
  carry a chip, or a source that should be retired.
- Em-dash policy for student-facing lesson copy is open (pedagogy decision
  D-2026-08-18-2). Existing copy keeps its dashes; files authored since
  2026-08-20 avoid them. Never run a repo-wide substitution.
