# Handback: Session 5 built, 2026-10-03

Branch `claude/practical-fermi-5g0sm0`, from `c8b87b7` (`main` after PR #42). The final class is
shorter because the students present. The ask is in `notes-verbatim.md`; the premise challenges and
the section map in `plan.md`; one row per change in `ledger.md` (S5B-001 to S5B-046); 57 DOM
assertions in `checks.mjs`; 961 section assertions in `section-tests/`. Section 8 records the
quality-control pass made before the merge request.

## Summary, quantified

Session 4 is the reference. Every number below is measured in Chromium at 1280 px with every
appendix shown (`measure.mjs`), the same method as the 2026-09-28 handback, so the two columns are
comparable.

| Measure (at load, every appendix shown, 1280 px) | Session 4 | Session 5 | Per minute, 5 against 4 |
|---|---|---|---|
| Allocated minutes | 150 | 120 (80%) | |
| Sections, all with one gated interaction | 17 | 15 | roots per minute 0.113 to **0.125** |
| Interaction families (distinct `data-comp`) | 11 | **13** | no family repeated in adjacent sections |
| Gates, all ticked by Shift+U on a fresh page | 17 | 15 | |
| Visible controls | 277 | 149 | 1.85 to 1.24 (67%) |
| Visible words | 11,544 | 8,120 | 77.0 to 67.7 (88%) |
| Words after Shift+U | 14,983 | 12,295 | |
| Chips | 221 | 92 | 1.47 to 0.77; per 100 words 1.91 to 1.13 |
| Footer sources | 70 | 24 | |
| SVG figures | 28 | 16 (§08's bars are HTML) | per section 1.65 to 1.07 |
| Sections whose main click moves a figure | 16 of 17 | **15 of 15** | |
| `aria-live` readouts | 58 | 42 | |
| Copy buttons | 9 | 5 | |
| File size | 789 KB | 484 KB | |
| Change-folder DOM assertions | 47 | 57, plus 961 section assertions | |

**Where Session 5 is at least as good as Session 4:** the architecture (one gated interaction per
section, a figure that moves on the main click in every section, Shift+U reveals everything), the
spread of interaction families (13 against 11, with no family twice in a row), interactions per
minute, and prose density (fewer words per minute, which a shorter class with presentations needs).

**Where it is below Session 4, said plainly:** control density is two thirds of Session 4's per
minute, chip density about half, and most sections carry one figure where Session 4's carry one to
four. The reasons are structural and deliberate, not accidental: Session 4's count is carried by
card sorts with 20 to 34 controls (§02, §03, §WS) and by the second and third figures its 09-28
update added; Session 5 cites 24 sources against 70 because the final class has two assigned readings
and a narrower factual base, and every chip on this page rests on a record in `SOURCES.md` that was
either opened (H) or reached through consistent secondary reports (M, listed under DW-126). Adding
chips without opening sources, or controls that do not teach, would raise the numbers and lower the
page. If the instructor wants the density closer to Session 4's, the two honest routes are in §6.

**Recommendation: merge.** Every repository gate passes, the page is self-contained, and nothing on
it needs a model run or a network. The rejected alternatives: a full 150-minute page (the
presentations take about an hour of the class; a longer page would be skipped, not taught), a page
that runs the sample workflow live against a model (no network, no key, and the point of §03 is a
reproducible break, so the briefs are simulated and say so with an L chip), and naming the
note-taker and CRM vendors (the survey facts are category-level; the planning agent's vendor sits in
the source line only).

## 1. What the page teaches, section by section

| Section | Min | Family | Gate | Controls | Words | Chips | Figures | What the main click does |
|---|---:|---|---|---:|---:|---:|---:|---|
| §00 Final Project and Advisor Use Case Deep Dive | 5 | retrieval-bridge | g1 | 19 | 468 | 1 | 1 | three Session 4 recalls lock; the five-stop ring advances its model box |
| Cold open: Then and Now, Two Prompts | 8 | timed-ritual | gc | 4 | 346 | 1 | 1 | two prompts land on a 0 to 8 track; Test 2 splits the track and sinks the one that names the client |
| §01 The Model Your Workflow Runs On Will Retire | 5 | parameter-sandbox | g2 | 11 | 521 | 9 | 1 | a day slider moves a cursor across Anthropic's calendar; the pinned workflow's stamp changes |
| E2 Swap the Model, Keep the Test Set | 14 | pipeline-lab | ga2 | 5 | 438 | 4 | 1 | five inputs travel through the model box and stamp their slots |
| §02 Read a Stranger's Package Like an Examiner | 6 | click-map-explorer | g3 | 14 | 602 | 4 | 1 | tagged phrases fill a five-row design board; two rows stay empty |
| §03 Six Inputs: Which Ones Break It? | 5 | prediction-commit | g4 | 8 | 389 | 4 | 1 | six briefs draw and stamp against the locked prediction |
| E3 Five Ways It Broke, Sessions 1 to 4 | 12 | multi-column-sorter | ga3 | 20 | 482 | 7 | 1 | ten failures stack into five lanes |
| §04 A Change You Can Defend | 5 | builder-assembler | g5 | 7 | 572 | 1 | 1 | a fix re-stamps the six-input board; the change note writes itself |
| E4 The Builder's Two Minutes | 10 | commit-first-mcq | ga4 | 3 | 315 | 2 | 1 | each call fills a sector of the two-minute dial |
| E1 Six Minutes, Five Beats | 12 | timed-ritual | ga1 | 4 | 342 | 1 | 1 | a real clock fills the beats against the plan |
| §05 Felt Faster Is Not Faster | 5 | estimate-then-reveal | g6 | 11 | 483 | 7 | 2 | the guess line stands against four trial bars; four sliders move a one-task chart |
| §06 New Tools, the Same Four Questions | 5 | symptom-diagnoser | g7 | 15 | 389 | 10 | 1 | a tool's data path lights and the four stops fill along it |
| §07 The Cole Meeting: Eight Moments | 5 | two-bucket-sorter | g8 | 11 | 517 | 6 | 2 | moments sort into two buckets; the trust bar fills; three survey bars draw |
| E5 Discussion: the scale | 18 | sealed-vote-debate | ga5 | 8 | 284 | 7 | 1 | votes land on an axis; weights tilt a balance; the complication moves two to the pivot |
| §08 Trust the Tool, Think Less? | 5 | commit-first-mcq | g9 | 8 | 320 | 5 | 0 (HTML bars) | two commits unlock the paper's bars; two sliders move the marker |

Minutes: core 54, appendix 66, total 120. The timed ritual appears twice (cold open and E1) and
commit-first twice (E4 and §08); neither pair is adjacent.

One sample workflow runs through §02, §03, §04, E1, E2 and E4: the meeting-prep brief, its README,
prompt and de-identified sample note, the six inputs, the three fixes. It is one script block
(`S5PKG`, `S5INPUTS`, `S5FIXES`) and every section reads it; no figure or phrase is retyped.

## 2. Against Session 4, per section

Session 4 per section (minutes / controls / words / chips / figures): §00 6/18/367/1/1; cold open
8/6/313/1/1; §01 5/18/413/12/1; §02 6/34/584/7/2; RSP 14/11/613/15/3; Anon 12/17/317/3/1; §03
6/25/863/30/2; §04 5/21/452/11/2; §05 6/15/615/14/4; W1 14/12/620/12/2; W2 12/15/540/10/1; §06
5/8/405/4/3; WS 13/21/707/23/2; §07 5/16/620/12/1; CR 10/15/428/2/1; D 18/10/234/1/1; §09
5/13/437/5/0.

Session 5's sections sit inside Session 4's range on every measure except chips, where Session 4's
§03 (30) and WS (23) have no counterpart here. Session 5's heaviest section by controls is E3 (20,
a sorter), as Session 4's are its sorters. Session 5's lightest is E4 (3 visible controls at load:
the three calls, one sentence at a time, by design).

## 3. Sources and confidence

| Confidence | Chips in prose | What it means here |
|---|---:|---|
| H | 26 | the page was opened from this build: Anthropic's deprecation page and commitments post, the Lee and colleagues paper in full, Anthropic's terms, the T3 survey summary, Google's prompting guide, Kalai and colleagues, the CVE |
| M | 23 | reached through consistent secondary reports, not opened: the four productivity trials, Morningstar, Vanguard, the CFP Board psychology domain, the planning agent, Pew, the Kitces AI-search reading, InvestmentNews on the survey, OpenAI's retirements |
| L | 20 | constructed for the lesson and labelled so: the sample workflow, the six inputs and their briefs, the three models' results, the eight moments, the five sentences, the timings |

All twelve M records are listed in DW-126 with what reading would raise each to H. The two assigned
readings: Lee and colleagues (2025) is H; the Kitces article is M because kitces.com could not be
opened from this build. Nothing on the page states a figure its record does not carry.

## 4. The premise challenges, and what was decided

1. **"~20% less content."** Taken as minutes, not words: 120 of 150. The page carries 70% of
   Session 4's words and 88% per minute, so it is lighter than the ratio asked for, which the
   presentation block needs.
2. **"Same exact formatting."** The head, the managed style fence (byte-identical, md5
   `ec8992744022f4ca`), the generic page CSS, the body chrome, the footer regions and the script kit
   are Session 4's. Only the section CSS, scripts and content are new, and each fragment was linted
   against the house rules before assembly.
3. **E5 as the discussion block, 18 minutes, and the run sheet says it may be cut.** The page keeps
   it because the proposition (as the tool does the analysis, does the value move to the
   relationship) is the one the syllabus names, and the complication (explained advice; the two
   pans may be one pan) is the finding worth the time if there is time.
4. **The syllabus asks for "measuring the result: AI-assisted time vs the Session 1 baseline".**
   The page measures it twice: §05's one-task sliders, and the cold open's own-prompt scorer, which
   runs the Session 1 checks on the learner's oldest and latest prompt.
5. **Vendor names.** Not in the panels; the survey facts are category-level and the planning
   agent is "one vendor" in the readout, its name in the source line only. `checks.mjs` S5B-027
   holds that.

## 5. What was not done, or done differently

- **No model runs on the page.** §03's six briefs, E2's three models' results and E4's five
  sentences are simulated and each panel carries the "simulated for this lesson" tag and an L chip.
- **Two verification rules were refined, both for false positives, both documented in the code
  with the date:** A13's ordered shift test no longer treats a name shared by several footer
  entries as a mention (S5B-035); the retired-facts scan skips binary files after the teaching-aid
  PDF's compressed bytes spelled a retired percentage (S5B-036; `pdftotext` of the PDF carries no such figure).
- **`verify-browser.mjs` reports "zero JS errors on load" red on every lesson including the hub**,
  with `net::ERR_CERT_AUTHORITY_INVALID` on the Google Fonts request. That is this container's
  proxy certificate, not the pages; the other 100 browser checks pass, including 14b (SVG text
  inside the viewBox) after two fixes to §01 and §03.
- **The older profiles were not refreshed.** `section_profile.mjs` rewrites all five profiles;
  Sessions 1 to 4 were reverted to keep this change to Session 5. `session-5.json` is new.
- **The page was assembled from per-section fragments** (markup, scoped CSS, script, tests per
  section) with a scaffold that copies Session 4's shell. The assembled page is the artifact; the
  scaffold is not committed, so there is one source of truth. The section tests are, under
  `section-tests/`, and run against the committed page.
- **The qualitative `UNGUARDED` count in the case inventory rose from 75 to 81**: the six names in
  §00's two-line reminder of the Coles (Meg Cole, Cole Precision Components, CPC, Rockford, Nathan
  twice). The quantitative count, the drift surface, stays at 6. No Cole figure is typed on the page.

## 6. What you still need to do before class

1. **Ratify DW-125**: the first editorial baseline for the page (literal 1, entity 2, total 3) was
   recorded from the page as built and the committed values equal the measurement.
2. **Open Anthropic's deprecation page once before class.** §01 is dated 2 October 2026 and the
   vendor updates it in place; a new deprecation changes what the readout should say.
3. **Decide the twelve M records.** Open the ones you want at H (DW-126 says what each needs) or
   teach them as M; the chips are honest either way.
4. **If you want density nearer Session 4's**, the two routes that would not cheapen the page: a
   second figure in E2 (three scorecards side by side after the third run) and a per-beat
   second-hand in E1; and more chips only from opened sources.
5. The run sheet, polls and teaching aid were written against this section map and need no change;
   the aid's §01 line reads "Pin A, drag past 30 November, Pin C untested, tick three, copy the
   card", which is what the page does.

## 7. Verification

| Check | Result |
|---|---|
| `node docs/changes/2026-10-02-session-5-build/checks.mjs` | 57 of 57 |
| `section-tests/run-all.mjs session-5/index.html` | 961 assertions, 0 failed (s0 94, cold open, §01, §06, E5 105, E1 124, E2 78, E3 88, E4 85, §04 92, §05 99, §07 105, §08 91) |
| `clickall.mjs` (Chromium, 1280 and 380) | zero errors, no overflow, no undefined or NaN, Shift+U ticks 15 of 15 |
| `verify-case`, `verify-sources`, `verify-migration` | 7 of 7, 6 of 6, 15 of 15 |
| `build-appendix --check`, `inject-sources --check`, `inject-case --check` | current |
| `case-inventory --report-check`, `build-unsourced --check`, `build-bibliography --check` | current |
| `verify-editorial` | 17 rules clean, 2 pre-existing advisories on Session 1 |
| `test-editorial-regions` | 9 of 9; session-5 1 literal / 2 entity |
| `test-case-viewer` | 0 failures |
| `verify-browser` | 100 pass; 7 "zero JS errors on load" red on every page from the proxy certificate (§5) |
| `verify-style` | cannot run here: the restyle skill is not installed; the fence is byte-identical to Session 4's |
| Em and en dashes in the authored body | 0; the three literal dashes on the page are the `<title>` and the generated regions |

## 8. The final quality-control pass (2026-10-03)

Method: the whole page rendered with every answer revealed and read section by section (11,537
words); every number on it compared with the `scope` field of its record; the two records the page
leans on hardest re-opened from this build and compared line by line; every "Session N" callback
compared with the text of that session's page; the phone-width screenshots of every section read.

| Area | Finding | Action |
|---|---|---|
| Anthropic's deprecation page (live, 2026-10-03) | All ten retirement dates, the 60-day notice, "Requests to retired models will fail", the testing advice, Sonnet 5.5 as Sonnet 4.5's replacement and its not-sooner-than date agree with §01 and E2 | none needed |
| Lee and colleagues (2025), re-opened | 319, 936, 59.29%, minus 0.69, 0.26 and the six activity shares (72, 79, 69, 72, 76, 55%) agree with §08 | none needed |
| The 22 other records | Every figure on the page is inside its record's scope; E5's Morningstar card said "quality of the advice" where the record says "quality of advice and services" | reworded |
| Callbacks to Sessions 1 to 4 | Four of E3's ten failures paraphrased earlier exercises in words those pages do not use (one invented a quotation about the transcript); §00's recall options 1(b) and 3(b) did not match Session 4 §03 and §07; §08's Session 2 principle was a Session 1 sentence and its Session 4 principle used a phrase Session 4 does not; the cold open pointed to §02 for advice that lives in Appendix D6; §06 cited "§05, fix 2", which does not exist | all reworded to the earlier pages' own words (S5B-042, S5B-043) |
| The eight checks | Session 1's cold-open analyser carries the same eight checks as this page's cold open; Session 4 and this page shorten the labels | attribution confirmed, no change |
| §02 | The answer key stamped the verification choice HALF while the board stamps it WEAK | key now reads WEAK |
| Phone width | The calendar, the desk, the six briefs, the test set and the scale shrank below legibility at 380 px (Session 4's figures do the same) | the five figures scroll sideways inside their box; the page never overflows |
| Everything else read | No typos found; register, chips and gates as designed; the run sheet, polls and aid still match the page | none needed |

After the pass: `checks.mjs` 57 of 57, section tests 961 of 961, click-through clean at both widths,
every repository gate green, the hub, README and changelog current.
