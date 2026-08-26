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
docs/deferred-work.md The single register of open work. Nothing else tracks it
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
| Canvas, the LMS | 2026-08-25 | "the course site" |

Match case-insensitively on the stem so punctuation variants cannot hide:
`grep -rin okonkwo`.

**Canvas needs one exclusion and the check is worthless without it.** `session-4`
renders a bitmap through an HTML `<canvas>` element, so `grep -rin canvas`
returns four legitimate hits there and one in `scripts/build-case.mjs`, where
"canvas export" names a design tool. The LMS is the capitalised word standing
alone in prose. Read every hit; do not automate this one.

**Why the name is gone at all.** No lesson may bind the course to one
submission platform, because the platform is the institution's choice and can
change between cohorts while the lessons do not. Name the destination in
platform-neutral words - never an action with no destination at all, which is
the defect that a careless removal creates.

## Adding a session

1. Create `session-5/index.html`.
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
node scripts/build-appendix.mjs           # rewrite all four lessons
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
| `APXMAP` | optional. `session-2`'s student-facing time budget | nothing else |
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
deliberately, or it silently stops catching anything:

1. Make the cleanup. Confirm the change was intended to move a counted figure.
2. `node scripts/verify-editorial.mjs --rules A8,A9` and read the new numbers off
   the failure text, or run the classifier directly.
3. Edit `scripts/editorial-baseline.json` to the **new, lower** figures. Never
   raise one to make a failure go away — that is the one edit the file exists to
   prevent.
4. `node scripts/test-editorial-regions.mjs` must pass; T7 reads the baseline.
5. Commit the baseline change on its own, so the diff shows exactly which figure
   moved and by how much.

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
> DW-032 and DW-037 through DW-040. **Four of them are stale and the register
> says so** rather than deleting them, so they are not raised again as new: D14
> is answered as D20, the 48 Part A violations now measure 0 hard and 13
> advisory, the 27 mis-wired chips were rewired in Phase 3, and `session-1`'s
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
- **`docs/spine-brief.md`'s opening paragraph is stale (D17).** It reads
  "Nothing here is implemented"; the spine has been implemented since `93904d7`
  and lives in a string literal in `scripts/inject-case.mjs`.
- **27 of 193 confidence chips resolve to the wrong source**, two of them
  off-by-one cascades. Fixing the wiring is a **precondition** for generating any
  bibliography, not a follow-up: a generator run today publishes all 27 as fact.
- **`session-1`'s named discussion block is 17 minutes and
  `references/pedagogy.md` s4 says 15.** Until Phase 2 the only copy carrying 15
  was the appendix index card, and the card was wrong about four other sections,
  so regenerating the index from the sections overwrote the one figure in that
  lesson that matched the parameter. `scripts/build-appendix.mjs` now prints the
  conflict on every run rather than letting the generator settle it by writing
  last. Two readings and the instructor picks: either the block really is 17 and
  the parameter is stale, or it is 15 and two minutes go back to `#s8`, which is
  where the card said they were. `docs/repo-updates-plan.md` s4.7 carries both.
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
- **D14 is unanswered.** Is session 0.1 in this term's teaching set? A1–A7 have
  no population in that file and A6 carries a dated skip until it is answered.
- **48 Part A violations stand, pending the D16 burn-in.** Reported, not fixed;
  fixing them is a separate task with its own approval.

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
