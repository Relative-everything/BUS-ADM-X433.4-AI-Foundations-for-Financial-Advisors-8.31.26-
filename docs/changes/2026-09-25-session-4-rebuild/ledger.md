# Ledger: Session 4 rebuild, 2026-09-25

Branch `claude/amazing-curie-xz0s73`, from `9f81086` (`main` after PR #36). One row per item;
ids run `S4R-001` upward. `checks.mjs` in this folder carries a jsdom assertion for every row a
DOM check can prove (32 assertions, 0 failed at close).

Baseline measured before any edit (the gate battery run of 2026-09-25, 01:10): T7 `session-4
1 literal / 82 entity`; 18 interaction roots, 10 component types, one consecutive repeat
(`sWS` then `s8`, both commit-first-mcq); 18 gates, of which 2 fired on completion; 2 `.verify`
blocks; 9 unsourced-claim markers; 16 "tonight"; 11 Session 1 baseline references; core 13 sections
and 72 minutes, appendix 5 and 78; page prose 7,140 words (core 4,821). Every repo gate green
except the three generators Session 3 had left stale and the environmental certificate failure in
`verify-browser`.

The rebuild replaced the page whole, as the kickoff asked, so the page itself is one commit; the
rows below say what changed per section, and `checks.mjs` proves each one.

| Id | Anchor | What changed | Why (rule, note or finding) | Test | Status |
|---|---|---|---|---|---|
| S4R-001 | `docs/changes/2026-09-25-session-4-rebuild/` | Change folder: kickoff verbatim, plan with the preference analysis and section map, this ledger, `checks.mjs`, handback | Process (kickoff K-style, S3 folders) | `node checks.mjs` 0 failed | done |
| S4R-002 | `s0` | Pacing panel reduced to cells and buttons; four session bullets; the Coles in two lines, labelled synthetic and not project data; the objective panel; a three-item bridge (b, c, a) on Session 3's core | Notes S2N:35, S3N:29 (pacing prose); S2N:6-25, S3N:35 (case restatement); D21 (bridge on prior core); S2N:38 (three items) | pace cells 3; bridge 3 of 3; gate g1 | done |
| S4R-003 | `sCold` | Choose-one-of-four; eight checks unchanged; "Compare all four"; optional paste box; container leaves the byte-shared `.ritual` class | QUEUE.md 2026-09-17 decision; FP2 task 1 | D scores 5 of 8 and is the one not sendable; gate gc | done |
| S4R-004 | `s1` | Four bullets (FINRA 24-09, the 2026 report and SEC priorities, the AI-washing penalties, Daly); nine-item sorter that answers on placement; bucket 1 holds the EU marking rule | S3N:66 (sorter feedback at once); FP2 on `src-finra2409`; audit 4b-2 (key miscount) | item lands with tick and why; g2 | done |
| S4R-005 | `s2` | NPI in four bullets; re-identification row reframed as the Session 3 callback with Regulation S-P's test; new phrase-by-phrase clean-up of Prompt D with a four-level meter and a copyable clean prompt; the two NPI matrices and the PII/NPI table removed | FP2 tasks 4 and 5; CASE.md:183 ("not for sale"); S2N:71 (build step by step) | meter reaches No; g3; no `#npiCtrls`; `var NPI` gone | done |
| S4R-006 | `s3` | Contract bullets; plan and switch drive retention bars; six settings to tick and copy; frontier and divergence charts removed | S2 audit (stop re-teaching cost); S2N:63 (interaction that changes, not a number); PL O2 (S4 owns retention scoring) | plan readout; g4 | done |
| S4R-007 | `s4` | Regulation S-P service providers and A.14 in three bullets; payload sets which of six yes, no or don't-know questions must be yes; unanswered questions assemble into an email to the vendor | Audit 4b-4 (payload ignored); weights were invented | verdict moves Go to Stop; g5 | done |
| S4R-008 | `s5` | Inbox simulation with a prediction, a run and a hidden line; EchoLeak and FINRA's primer; the video-call decision; CVE table, free-text scorer and soft deepfake figures removed | S2N:54 (activities students can do); S2N:84 (source it or cut it); audit 4d (CurXecute score unverified) | run output, hidden line; g6 | done |
| S4R-009 | `s6` | Stanford rates per question; locked guess and 100 random memos with rate and length controls; sliders price one deliverable, default 90 | FP2 task 2; audit 4c (per-question, not per-citation); S2N:63 | 100 squares; saves 51 at defaults; g7 | done |
| S4R-010 | `s7` | Four-field bullets; two-bucket sorter of six records, the invented case labelled; record block with model and date left to the learner; fallback artifacts removed | Audit 4c (a model cannot report its model or date); R5 | invented case in key and source line; g8 | done |
| S4R-011 | `sCR` | Handoff test with the seven-part checklist and a sample package with five gaps; single-select stuck log; relay table, draw and 30% weight removed | FP2 task 3; audit 4b-3 (stuck log); standalone kickoff | earlier pick replaces later; no 30%; g9 | done |
| S4R-012 | `s9` | Six policy questions, strong and weak clauses (strong not always first), a copyable outline, four self-test questions, the course rule, the assignment card, a written closing check; rubric mapper and peer scorer removed | S2N:89 (no in-class peer review); Tier A (no rubric language); audit 4b-7 | outline assembles; g10 | done |
| S4R-013 | `sRSP` (D5) | Bullets; events as lettered chips; instructions match the single pick; "six days late" | Audit 4b-10 | strings | done |
| S4R-014 | `sAnon` (D6) | New foundational appendix: replace, don't just delete; eight replacements sorted | CFP Board guide; 150-minute arithmetic | 8 of 8; ga6 | done |
| S4R-015 | `sW1`, `sW2` (D1, D2) | Watermark facts corrected and sourced to Anthropic's page; tournament widget kept and relabelled; entropy sorter moved to the shared sorter; evidence grid kept; amplifier, scale figures, regeneration paragraph and state-law note removed | The false "nothing is watermarked" claim; DW-005; S2N:84 | `src-claude-marks` chips; no amplifier | done |
| S4R-016 | `sWS` (D3) | Two sourced claims (temperature, loops); the comparison table opens only after both commits; the parameter-count row removed (no reachable source) | Audit 4b-11 (commit defeated); S2N:84 | table shut, then open; ga3 | done |
| S4R-017 | `sD` (D4) | Proposition without the baseline; both cases and the complication on the page; re-vote with change readout; facilitation table removed | FP2 task 2; S3 SM-008 precedent | Moved 2; ga4 | done |
| S4R-018 | page-wide | No `.verify`, no markers, no "tonight", no rendered file names; one Shift+U listener that opens every key and ticks every gate; Case facts button top right; Session 3's stylesheet carried over; `aria-live` on every readout | S2N:68, SMN:10 (instructor text); S3N:32 (tonight); S3N:26 (case button) | strings absent; 17 of 17 gates fire | done |
| S4R-019 | `SOURCES.md`, lock | Four new records; Session 4 usage lines rewritten; six records no longer used by Session 4; lock synced, no `last_verified` touched | R1, R2; DW-021 | footer carries all four | done |
| S4R-020 | generated regions | APXPANEL, APXSTUB, APXBUDGET, APXCORE regenerated; footer injected | A.3 | core 67, appendix 83 | done |
| S4R-021 | `scripts/editorial-baseline.json`, DW-124 | A9 for session-4 re-recorded 1 / 82 / 83 to 1 / 2 / 3; DW-005, DW-021 and DW-117 annotated | A.2 landing procedure | T7 9 of 9 | done |
| S4R-022 | `instructor-notes/session-4.md` | Run sheet rebuilt: objective, clock, checkpoints, correction, five polls, three gates, relay, closing check, drop order, per-slot notes, verify list | FP2 task 7 | sections present | done |
| S4R-023 | `CHANGELOG.md`, `changelog/`, derived registers | Changelog entry and page; bibliography, data pull, queue, unsourced register, case inventory, profile regenerated | Process | every `--check` current | done |

## The graphic rebuild, same day (S4R-024 onward)

The instructor's second ask (typing corrected; verbatim in `notes-verbatim.md`): "analyze the most graphic and interactive, least text based
sections of the other session - try to recreate that type of sections in session 4 as much as
possible - creative interactive memorable experiences in the session vs mainly text, go on the
more interactive more creative end and end with a polished interactive webpage for education".
PR #37 had already merged the text rebuild (S4R-001 to S4R-023), so these rows ride a new pull
request from the same branch.

Baseline for these rows: Session 4 averaged 2.6 of 10 on a graphic-richness audit and carried no
SVG figure in any lesson section; visible words after working every interaction, 9,810 (Playwright
`innerText`, the regression click path, 1280 wide).

| Id | Anchor | What changed | Why (rule, note or finding) | Test | Status |
|---|---|---|---|---|---|
| S4R-024 | every section | Each section rebuilt around one graphic, interactive figure, designed from two concepts harvested from the twelve most graphic widgets of Sessions 0.1 to 3 (anchors by file and line), then critiqued, built, and reviewed on its own. 16 of 17 sections carry a labelled SVG figure; §09's figure is an HTML policy page that stamps each clause | The ask above; R11 (every implementation traces to a harvest anchor) | `checks.mjs` S4R-024; all 17 gates flip from their own figures | done |
| S4R-025 | shared script | One small figure kit (`sv`, `svt`, `svgRoot`, `reduced`, `tween`) that builds SVG nodes once and updates them in place, so transitions play; `S4STATE` carries the §06 minutes to D4's balance; the quiz exposes the locked answer (`aria-pressed`) and announces its feedback; switching the override off closes only what it opened | Session 2's innerHTML rebuilds are why its lifts never animate; review lens: accessibility | S4R-025, S4R-027 | done |
| S4R-026 | shared CSS | One constructed-material label (outlined, so it no longer looks like the rust time chip), one numbered badge, one stamp; answer keys in the reading face; the Shift+U hint shows only while the override is on; the Case facts button moves to the bottom corner on phones and is hidden in print; sorter buckets at full strength (the carried Session 3 stylesheet set them to 45% and never reset it); the mono face loads 600 and 700 | Review lens: visual coherence (17 authors' worth of badge, stamp and label variants) | fonts request and quiz checks, S4R-026 | done |
| S4R-027 | whole page | Six-lens adversarial review of the assembled page: 105 findings. Each section's fixer verified its findings before changing anything; an independent checker then confirmed each fix and hunted regressions. The three high ones: §03 opens on the consumer training default again (on, five years); the cold open's prompts are worded so every missing check is really missing (D still leads, 5 of 8); §02 and D6 agree about a value left in a prompt | Review, 2026-09-25 | `checksec`, `testsec` ok on all 17; `checks.mjs` 36 of 36 | done |
| S4R-028 | whole page | Visible words after working every interaction: 9,810 to 7,548 (−23%); the heaviest answer keys cut hardest (§07 −64%, §01 −50%, D2 −35%). At load the page carries 6,367 words against 6,440, with a figure in every section | Notes: "a visual aid, not a book" (13+ times) | Playwright count, both pages | done |
| S4R-029 | `SOURCES.md` | Wolfram's Session 4 usage line names the one-pass description D3 now paraphrases | Review lens: accuracy | `verify-sources --check` | done |
| S4R-030 | run sheet, changelog, handback, generated registers | Run sheet's click paths and numbers rewritten for the figures; changelog entry; handback addendum; bibliography, data pull, queue, case inventory and profile regenerated | Process | every `--check` current | done |

