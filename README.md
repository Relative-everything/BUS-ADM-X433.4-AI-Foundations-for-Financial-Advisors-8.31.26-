# BUS ADM X433.4 — AI Foundations for Financial Advisors

Live course site for UC Berkeley Extension, Fall 2026.
Instructor: Jared Winkers.

**Live site:** https://relative-everything.github.io/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/
*(update this line if the repository is renamed)*

---

## Layout

```
index.html            Course hub — the URL students bookmark
session-1/index.html  Session 1 — How the Machine Works, and What It Costs
session-2/index.html  Session 2 — Practical AI Usage in Daily Advisory Workflows
session-3/index.html  Session 3 — Gathering and Documenting Client Information
session-4/index.html  Session 4 — Compliance, Security and Responsible Use
CHANGELOG.md          Human-readable record of every revision
.nojekyll             Tells GitHub Pages to serve files as-is
```

Each lesson is a single self-contained HTML file — all styles and scripts are
inline. The only external request is Google Fonts. Nothing is uploaded from a
student's browser; progress and notes stay on their device.

---

## How updating works

**Publishing and versioning are the same act.** GitHub Pages serves whatever is
on the `main` branch. Push to `main` and the live site updates in about a
minute.

### The rule that matters

Git records a version when you **commit**, not when you edit. A commit is a
permanent, diffable snapshot. Change one word and commit it, and that one-word
change is visible forever — old text in red, new text in green, everything else
untouched.

But **the granularity of your history equals the granularity of your commits.**
Fifteen changes in one commit is one version showing all fifteen. Git cannot
separate them afterwards.

So: **commit small, commit often.** Commits cost nothing.

### Typical update

```bash
git pull origin main           # get the latest before editing
# ...make the edit...
git add -A
git commit -m "Session 1: correct the Section 1202 gross-asset ceiling"
git push origin main           # live in ~1 minute
```

Write commit messages that name the session and the substance, so the history
reads as a record rather than a list of "update file".

### Working with Claude Code

Claude Code does **not** commit automatically. It edits files when asked and
commits when the work is done or when you ask it to.

- Say **"commit this"** whenever you want a checkpoint preserved. That is the
  reliable way to guarantee a version exists.
- For anything larger than a small fix, ask it to work on a branch and merge
  when you're happy — that keeps the live site stable while work is in progress.
- Uncommitted edits are not protected. Your last commit is always safe, but
  anything changed since then only exists on disk.

---

## Marking what you actually taught

`main` keeps moving. A tag freezes a specific moment permanently — useful when
you need to show exactly what was on screen during a given class.

After delivering a session:

```bash
git tag -a session-1-delivered-2026-08-31 -m "Session 1 as delivered"
git push origin session-1-delivered-2026-08-31
```

Tags appear under **Releases → Tags** on GitHub, and each one can be browsed or
downloaded as the complete site at that moment.

---

## Recovering an earlier version

```bash
git log --follow --oneline session-1/index.html   # history, through renames
git show <commit>:session-1/index.html            # view a file as it was
git diff <commit> HEAD -- session-1/index.html    # what changed since then
git restore --source=<commit> session-1/index.html # bring an old version back
```

Nothing that has been committed is ever lost, including through the directory
restructure — `--follow` traces each lesson back to its original filename.

---

## Adding a session

1. Create `session-5/index.html`.
2. Add a card for it in `index.html` (copy an existing one, remove the `soon`
   class from the anchor).
3. Note it in `CHANGELOG.md`.
4. Commit and push.

---

## Known follow-ups

- `CHANGELOG.md` currently serves as plain text on the live site. Rendering it
  as a styled HTML page is a small addition.
- Google Fonts loads from a CDN. Self-hosting the fonts would make each lesson
  fully self-contained and resilient to classroom wifi.
- No automatic "last updated" stamp or new-version notice on the lessons yet.
  A deploy workflow can stamp the build date and commit into each page, and
  prompt a student with a stale open tab to reload.
