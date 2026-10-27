# Rules for every worker on the 2026-10-27 register close-out

Repo: /home/user/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26- (branch ccr-3f106263-7kokop). Read MAINTAINING.md and EDITORIAL.md sections you touch before editing. The register is docs/deferred-work.md; your rows are named in your brief.

Environment: `export NODE_PATH=$(npm root -g)`; the lesson-builder skill is at
/root/.claude/plugins/synced/3052a266-d087-4a2d-9133-92fa2ac32cb3_96c3c210-5783-44cd-9841-2e1b98ca3ab1/jared-skills/skills/interactive-lesson-builder
(`export LESSON_BUILDER_SKILL=<that> RESTYLE_SWEEP=<that>/scripts/restyle_sweep.py`). Playwright + Chromium work (`require('playwright')`). No egress to most hosts.

Hard rules for served pages (index.html, session-*/index.html, cases/*.html):
1. Never add an em dash (— or &mdash;) or an en dash; EDITORIAL D1. A9 counts may fall, never rise.
2. No text addressing the instructor on a learner page; no grading, due-date, submission or LMS words (rubric, graded, due, submit, Canvas); no localStorage/sessionStorage/indexedDB; no new external request; no model identity of your own in a served file.
3. Do not edit anything between these sentinels: STYLE:BEGIN/END, CASE:BEGIN/END, SOURCES:BEGIN/END, READINGS:BEGIN/END, APX*/appendix generated regions, LMSTYLE/LM/LMBOX/LMBOX-S4 fences (versioned, byte-paired between session-1 and session-4; MAINTAINING "The live model console" has the md5 loop). Code OUTSIDE a fence may change.
4. Do not run writer scripts (inject-case.mjs, inject-sources.mjs, build-appendix.mjs, build-readings.mjs, build-sources.mjs, build-cardsort.mjs, attest-verified.mjs --sync, build-changelog.py, restyle_sweep.py without --check). Run them only with --check. The orchestrator regenerates at the end.
5. Only edit the files your brief names. Do not commit. Do not touch docs/deferred-work.md.
6. Before you finish, run and paste the last line of: `node scripts/verify-editorial.mjs`, `node scripts/test-editorial-regions.mjs`, `node scripts/verify-migration.mjs`, `node scripts/verify-case.mjs`, `node scripts/test-case-viewer.mjs` (if you touched a lesson), `node docs/next-term/checks.mjs`, `node scripts/test_live_console.js` (if you touched session-1 or session-4), and `node scripts/verify-browser.mjs` (slow; if you touched any HTML).
7. Write docs/changes/2026-10-27-register-closeout/ledger-<yourname>.md: one row per edit (file, what, which DW row), plus the check output lines. Report the same in your final message, with anything you could not do and why.
