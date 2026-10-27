# Handback: the register close-out, 2026-10-27

**Instruction.** Continue working on the deferred work; return only once every row is done or not needed and the branch is merge-ready.

**Result.** `docs/deferred-work.md`: 0 open, 6 open-upstream (recorded, not owed), 134 closed, 57 superseded, 197 ids. Every decision the rows waited on was taken by adopting its recorded recommendation and logged as D-068 to D-092 in `docs/next-term/DECISIONS.md`. Off-site tasks moved to `instructor-notes/term-start-checklist.md`.

**How.** Six parallel workers on disjoint files (`RULES.md`; ledgers `ledger-tooling-a.md`, `ledger-tooling-b.md`, `ledger-pages-s5.md`, `ledger-pages-s12.md`, `ledger-pages-s34.md`, `ledger-sources.md`), the orchestrator on docs, decisions, chips, regeneration and the register. No fence edited; the LM fences stay byte-paired (md5 unchanged). No em dash added anywhere; A9 held on every page.

**Battery on the final tree**, sequential: every in-repo check exits 0 (`verify-facts` prints 13 advisory records, by design between terms; `verify-editorial` prints its one standing advisory, A12 on `session-1`'s Wolfram quotation, which is checklist item 11). `verify-browser` 0 failures. `test_live_console` 137. The skill's `validate_lesson.py` reads red only on the lines MAINTAINING's by-design table lists.

**Judgment calls to read first** (all reversible, all in DECISIONS.md):
1. The hub's `.verify` block is gone from the learner page (D-069). If you want the course's visible statement back, the four items are on the Session 2 run sheet.
2. Session 4 no longer states a consumer training default (two sentences, D-085 context); the FACTS record holds it as GAP. Verify against the current consumer terms and put the sentence back if a default is stated there.
3. Twenty SOURCES records deleted at zero references (D-084); `git show 07d8ff2:SOURCES.md` recovers any.
4. `aa-cost-frontier-2026-08` is dated 2026-08-01 under the partial-date convention; the real day comes with the next re-pull.
5. The EU AI Act rule-key item lost its unsourced *by 2 Dec 2026* clause.
6. The `.tg` toggles on Session 2 were not keyboard-focusable at all before this pass; they are now, with a ring.

**Red team.** The case against emptying the register this way is that eleven rows were closed by decision rather than by work, on recommendations a builder wrote; each is one line in DECISIONS.md to reverse. The assumption most likely to be wrong is that the Session 2 run sheet is the right home for the hub's four verification items: if you want students to see that legal characterisations are questions, D-069's one learner sentence in the case dialog is where that now lives.
