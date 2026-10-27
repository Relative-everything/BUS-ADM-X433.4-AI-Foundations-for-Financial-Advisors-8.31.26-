# CLAUDE.md

A pointer, not a rulebook. Everything binding lives in the files below; read them
before editing, in this order of precedence (PEDAGOGY.md §0 states it).

| File | Governs |
|---|---|
| `PEDAGOGY.md` | Learning design: what a lesson must do and why. §1 non-negotiables win; §4 parameters next. Instructor-owned. |
| `MAINTAINING.md` | Repo mechanics: layout, validators, the pre-push gate, the purge list, the case and sources pipelines, the live-console rules. |
| `EDITORIAL.md` | Prose and markup rules: dashes (D1: no new em dashes), chips, quotation, the editorial baseline and its ratchets. |
| `CASE.md` | The canonical synthetic Cole household (v5.0). Generated extracts are injected; never retype a figure. |
| `facts/FACTS.json` | Every volatile external fact. Cite with `data-fact`; re-verify the week before each session. |
| `SOURCES.md` | Every cited source. Footers are generated from it; `last_verified` is written only by a human at a terminal. |
| `docs/deferred-work.md` | The single register of open work. Off-site term tasks live in `instructor-notes/term-start-checklist.md`. |

Working rules that bite most often:

- Served pages (`index.html`, `session-*/index.html`, `cases/*.html`) carry no grading, due-date, submission or LMS language, no text addressing the instructor, no browser storage, and no external request beyond Google Fonts and the opt-in live console.
- Never edit inside a generated or versioned fence (`STYLE`, `CASE`, `SOURCES`, `READINGS`, appendix regions, `LM`/`LMBOX`/`LMSTYLE`). Change the source and regenerate; the console fences are byte-paired between Sessions 1 and 4.
- Run the gate before pushing: `NODE_PATH=$(npm root -g)` plus the skill path variables, then every `verify-*`, `test-*`, `build-* --check` script in `scripts/`, `docs/next-term/checks.mjs`, and `verify-browser.mjs`. MAINTAINING lists what is red by design.
- Record every substantive change in `CHANGELOG.md` and rebuild `changelog/index.html`; every judgment call in `docs/next-term/DECISIONS.md`; every open item as a register row.
- The Fall 2026 change folders under `docs/changes/` are history and read red against the 2027 pages by design.
