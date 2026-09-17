# Fable prompt 3: repository hygiene, optional

Run only if allowance remains after prompts 1 and 2. Nothing here affects what happens in a
classroom on 2026-09-21 or 2026-09-28. All of it makes every future session cheaper.

---

```
You are doing repository hygiene on the BUS ADM X433.4 course site. Nothing in this pass changes
what a student sees or what the instructor teaches. Branch claude/session-3-update-plan-k1xbqs.
Do not push to main.

READ FIRST: docs/changes/2026-09-17-session-3-update-plan/plan.md, especially its Appendix, which is
the builder's operating manual. Then docs/deferred-work.md.

Every constraint in that Appendix applies: the em-dash ratchets (which differ per file and run in
opposite directions on session-3 and session-4), the generated regions, CASE.md Part O, no dates or
grades or weights on any page, no register row ids in student-facing text.

Work these in order and stop whenever the allowance runs out. Each is independently committable.

## 1. Self-host the three font families (DW-031)

Every lesson makes a Google Fonts request. In any sandboxed or proxied environment that request
fails TLS verification, which makes verify-browser.mjs report "zero JS errors on load" as a failure
on all six lesson files. It is a false alarm that every future verification run has to explain away,
and it is also the only outbound network request the pages make.

Self-host the three families. Confirm afterwards that verify-browser's network check still passes
and that the JS-errors check now passes too. This single change removes the most confusing line in
every future gate run.

## 2. The verification surface cannot run from a clean clone (DW-080)

scripts/verify-style.mjs hard-codes a path into the interactive-lesson-builder skill, so a fresh
clone cannot run the full gate set without the skill installed. Make it degrade honestly: detect the
absence, say what is skipped and why, and exit in a way that does not read as a pass. Then add the
guard DW-080 asks for, a --check run after all generators, so drift cannot land silently.

## 3. Four documents describe a tree that no longer exists (DW-102)

Including README.md's "How to use a lesson", which describes a lesson to be worked through, against
a delivery model the instructor has stated in writing is a visual aid. Reconcile the four documents
with what the repository actually is now. Where the two readings genuinely conflict, say so in the
register rather than picking one silently: that conflict is the instructor's to settle, not yours.

## 4. Record the divergences that are decisions, not defects (DW-117, DW-062, DW-066)

session-3 keeps the Shift+U override that session-2 dropped, and that is deliberate: V8 passes
because of it and the instructor uses the one-key reveal on a 17-gate page. The cold-open opening
line and the COLD_CHECKS parity differ across files for reasons that are now settled.

Write these into the register as recorded divergences with their reasons, so the next pass does not
"fix" them into breakage. Do not change any page to make them uniform.

## 5. The spine (DW-050)

Open across three passes. Session 3 now states the recurring question only inside the injected case
modal; Session 2 states it nowhere. The register says "said, not decided".

Do NOT decide it. Write the decision up properly instead: what each option costs, which files each
would touch, and what the two-session evidence says about whether callbacks have ever carried
forward. Put it in front of the instructor as a one-page choice with a recommendation.

## GATES

The full set from plan.md Appendix A.1. Everything green except the documented by-design red lines.
If item 1 succeeds, the verify-browser JS-errors line should go green across all six files; report
that explicitly, because it changes the expected-state table in the Appendix and that table will
need updating.

## HANDBACK

docs/changes/<today>-repo-hygiene/handback.md: what changed, the gate output before and after, any
ratchet movement re-recorded with dated register lines, and a numbered list of anything you stopped
short of and why.
```
