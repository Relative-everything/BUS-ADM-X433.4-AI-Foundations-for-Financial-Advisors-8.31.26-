# Ledger: Session 5 build, 2026-10-02

Branch `claude/practical-fermi-5g0sm0`, from `c8b87b7` (`main` after PR #42). One row per item; ids
run `S5B-001` upward. `checks.mjs` in this folder carries a jsdom assertion for every row a DOM
check can prove.

Baseline before any edit: no `session-5/` directory; the hub card read "Not yet published";
`MAINTAINING.md` recorded the 2026-08-27 decision that no Session 5 page was owed; every generator
and checker enumerated five lessons. Egress from the build: platform.claude.com, anthropic.com,
claude.com, support.claude.com and the Microsoft Research PDF host open; kitces.com, sec.gov,
finra.org, cfp.net, metr.org, science.org, nber.org, ssrn.com, hbs.edu, morningstar.com,
vanguard.com, pewresearch.org, help.openai.com, investmentnews.com and accessnewswire.com blocked.

| Id | Anchor | What changed | Why (kickoff item, rule or finding) | Test | Status |
|---|---|---|---|---|---|
| S5B-001 | this folder | Notes verbatim, plan, this ledger, `checks.mjs`, handback | Process | `node checks.mjs` | done |
| S5B-002 | `session-5/index.html` | The page shell: Session 4's head, managed style fence, generic page CSS, case modal and injected CASE span, tier bar, appendix panel, footer with the generated budget and sources regions, the shared script kit (sorter, quiz, copy, figure kit, rail, Shift+U, cold-open checks, gates, tier filter, pacing readout) carried verbatim with the state object renamed | "Same exact formatting as the other sessions" | S5B-002 | done |
| S5B-003 | `scripts/*.mjs` | `session-5` added to every lesson list: build-appendix, build-sources, build-unsourced, case-inventory, inject-case, test-case-viewer, test-editorial-regions, verify-browser (and its overflow baseline), verify-migration, verify-editorial (TIERED) | Merge-ready: the gates must see the page | each gate's output | done |
| S5B-004 | `scripts/editorial-baseline.json` | A8 and A9 entries for `session-5`, recorded for the first time from the built page | T7 pins the classifier to the baseline | `test-editorial-regions` T7 | done, DW-125 asks for ratification |
| S5B-005 | `SOURCES.md`, lock | 14 new records (two Anthropic pages opened at H; twelve at M with retrieval notes), `src-lee-cognitive` corrected to H with the PDF opened in full, nine existing records given a Session 5 use; `attest-verified --sync` | "Citations and data accuracy are paramount"; never make up a source | `build-sources`, `verify-sources`, `attest-verified` | done |
| S5B-006 | `index.html`, `README.md`, `MAINTAINING.md` | The hub card published; the README table row and the console note; the "Adding a session" note records the superseded decision | MAINTAINING "Adding a session" steps 2 and 3 | S5B-006 | done |
| S5B-007 | `docs/deferred-work.md` | DW-125 (first baseline recording), DW-126 (twelve M records to raise by reading), DW-127 (the superseded decision) | Register rule | — | done |
| S5B-008 | `instructor-notes/session-5.md`, `-polls.md`, `-teaching-aid.{htm,pdf,md}` | Run sheet with the presentation block, four polls, a two-page colour-coded aid | The presentations are class logistics off the page | aid renders to two pages, nothing clipped | done |
