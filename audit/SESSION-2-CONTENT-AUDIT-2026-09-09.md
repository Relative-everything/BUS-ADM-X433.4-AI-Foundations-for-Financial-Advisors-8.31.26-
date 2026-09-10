# Audit 2026-09-09: Session 2's page against what it claims to do, five days out

Branch `claude/session-2-page-audit-vlrqj2`, from `main` at `caeeddd` (the merge
of PR #21). Written five days before Session 2 (2026-09-14) against
`session-2/index.html`, read-only. It scores each of the page's sixteen
sections on three axes, interactive, accurate and additive, and ranks what it
finds worst first rather than in page order.

The calibration is Session 1 as delivered (`audit/AUDIT-2026-09-07.md`): of
seventeen designed interactions two fired and none was learner-executed; of
eleven core rows three ran as built; the silent-work total for 174 minutes was
zero seconds. The same instructor, the same 180-minute block and the same room
meet this page, so a section that works only if everything goes right is scored
as a section that did not work last time.

This is the fourth kind of audit the repository has carried. The 08-20, 08-23
and 08-29 audits measured pages against the build protocol; the 09-03 audit
measured the register against the tree; the 09-07 audit measured a page against
the room that met it. This one measures a page against its own claims before
the room arrives.

**Verification status.** Every count here comes from a command run on the tree
at `caeeddd` on 2026-09-09 and is named where the count appears: `node` over the
file, `grep -n`, the repo's ten validators, the lesson-builder skill's
`validate_lesson.py` and `validate_dom.js`, and a headless Chromium drive at
1280 px through the same global Playwright `verify-browser.mjs` uses. Line
numbers are re-derived at `caeeddd`; the quoted string is the durable locator.
Estimates carry H, M or L.

The scoring was designed as sixteen independent section readers, two censuses
and an adversarial refutation of every new finding. Two launches died to usage
limits, the third and fourth audits in a row to record that failure (09-03 §9,
09-07 §10 and §12). What returned: independent reads of **s0, sCold, s3, s5**,
all five **appendix** sections, a **technical-terms census** and a
**legal-characterisation census**. Seven core sections (**s6, s6b, s7, s8, s10,
s11, s12**) are scored single-auditor and are marked so in §2; the refutation
pass did not run at all, so every new finding here is single-auditor in the
09-07 sense, and the lead auditor re-derived each one against the file before
accepting it. Two agent findings were rejected on that re-derivation and are
recorded in §5 rather than dropped.

External facts were checked by web search; every legal primary host was
egress-blocked (irs.gov, stout.com, actec.org, mcguirewoods.com,
naepcjournal.org), so those verdicts are M and say so.

---

## 0. Read this first

**The page makes eight claims about Session 1; seven are false for this cohort,
and PR C as specified names four of the seven.** At 6:06 PM the
cold-open analyser's own output reads "Compare this against what you pasted in
Session 1" (`:3065`); no learner pasted anything on 2026-08-31, the ritual
having been lectured from the instructor's screen (09-07 §2.2, row 01). At 6:14
PM the section map says the confidentiality boundary "is the boundary Session 1
established" (`:1246`), when §08 never ran and the three landmines were never
named, and Outcome 03 says the templates were written "before being taught a
framework" (`:1251`), when the eight-point checklist was lectured for eleven
minutes. §3.2 lists all eight sites. PR C repairs `:1382`, `:1603`, `:2765` and
`:2796` by name; `:3065` disappears only as a side effect of the renderer copy
in 12.4 item 7, so an implementer who lands item 3 without item 7 leaves it
standing; and `:1246` and `:1251` survive PR C entirely. Those three are S2-02,
S2-03 and S2-04, and they are three sentences.

**The §07 answer key teaches four things a learner could repeat and be wrong
about, and the gate meant to stop that points somewhere else.** The six-item
citation triage a learner meets at 7:37 PM is the page's most consequential
exercise and its feedback is the teaching. Four defects, each verified against
`CASE.md` or a search summary: the live-run prompt asks for authority on "an
installment sale of **non-voting stock**" (`:1812`) when the Cole transaction
sells LLC units and `CASE.md` I.1 flags exactly that difference as material to
§2036(b), so learners run the four checks against the wrong instrument (S2-01,
and by the register's own definition it is BLOCKING); the Kessler feedback says
"Meg's 2023 appraisal ... is the actual issue" (`:2621`) where `CASE.md` F.7
records that report as having **no discount study** and §09 of this same page
says eleven screens later that the honest answer is "none of them" (S2-08); the
Rev. Rul. 2004-64 feedback makes Situation 3's result conditional on a trustee
"who is not related or subordinate" (`:2615`), which is §672(c) drafting
practice rather than the ruling's holding (S2-09, M); and the Davidson feedback
calls that case's instrument "an interest-only note payable on demand" like
Meg's (`:2619`) when Davidson's were self-cancelling installment notes with a
balloon (S2-10, M). Meanwhile the `.verify` block at `:1596-1600`, which R3
exists to put in front of the instructor at the podium, names Rev. Proc.
2017-34, Rev. Proc. 2022-32, IRC §§ 2010 and 691 (each appearing nowhere else in
the file) and § 1014 (only inside a hidden appendix widget), names none of the
four rulings the key states as holdings, and places the fabricated Kessler
citation "in §05" when it renders in §07 (S2-07).

**The page defines fifteen of its seventy-four technical terms.** A census of
the eleven core sections and the script strings they render, by a criterion
stated in §3.2, counts 74 terms a CFP-level practitioner new to these tools
would need and finds 15 defined inline at first use. Session 1's comparable
figure was 26 of 50 (09-07 §12.2), and the one written signal the room produced
was that the pace was too swift. Three of the undefined terms are load-bearing
inside scored keys: *token* is defined nowhere on the page and the bridge's own
answer uses it at 6:14 PM; *grounded* carries the §05 quiz's item-7 feedback and
the bridge's item-2 answer but is first defined at `:1972`, the last core
section; *template*, the object of the §04 workshop, is first defined at
`:1823`, inside the section D5 moves async. DW-093 asks for a glossary card of
nine terms; none of the tax vocabulary and none of these three is on its list
(S2-11).

**The page's own minute figures cannot be met, and the 09-07 cut drops the
wrong section first.** Eight core sections carry an activity block with a stated
duration; those sum to 31 minutes inside sections whose eyebrows sum to 48,
leaving 17 minutes for 3,681 words of prose (22 minutes read aloud at the
instructor's measured 167 wpm) and nine widgets. A bottom-up model of all eleven
core sections gives 114 actual minutes for 69 planned, 1.66x, which corroborates
the 09-07 audit's 1.7x from the other direction and adds what the multiplier
hides: only 31 of those 114 minutes are reading, so DW-093's prose trim recovers
at most a third of the overrun. §5.2 names §05 first to drop "because no
interaction is designed", which DW-101 already shows is false; by every measure
here §05 outranks §06, and §06 is the cheaper drop (S2-31).

---

## 1. The ranked findings register

Ordered by severity, then proximity to teaching (a defect met at 6:14 PM
outranks an equal one in the appendix, which is hidden at the default depth and
kept hidden by D5), then cost to fix, then whether it rides along with work
already specified. Findings already carried by a register row or by an item of
the 09-07 audit's §12.4 edit list are not here; they are cited per section in
§2. Every fix below adds no em dash, moves no figure or `COLE` constant, and
edits nothing between the CASE sentinels (`:731-1186`) or the SOURCES sentinels
(`:2015-2037`); where a generated span carries the defect, the fix names the
`SOURCES.md` field and a regeneration.

| id | section | axis | sev | defect | anchor | fix | tag |
|---|---|---|---|---|---|---|---|
| S2-01 | s10 | accurate | **BLOCKING** | The §07 live-run prompt describes the Cole transaction as "an installment sale of non-voting **stock**"; `CASE.md` E.1 and E.5 have Meg contribute CPC stock to an LLC and sell 520 non-voting **LLC units**, and I.1 records that §2036(b) "reaches corporate stock; the transferred interests here are LLC units". Learners run the four verification checks against authority for an instrument the case does not use, and §2036(b) is the trap the distinction exists to mark. **Severity is the register's definition applied literally** ("a page states a fact the repo's own source contradicts") and is the auditor's judgement, not a score: it is a one-word defect beside two BLOCKING rows (DW-003, DW-041) that are structural, and the instructor may reasonably record it as MAJOR. It is ranked first on cost as much as on severity, being the cheapest finding in this table. | `:1812` "What authority supports an installment sale of non-voting stock to an intentionally defective grantor trust" | "an installment sale of non-voting LLC units to an intentionally defective grantor trust". One word. | NEW WORK |
| S2-02 | sCold | accurate | MAJOR | The analyser's readout, the first live output the room sees at 6:06 PM, tells every learner to compare against a Session 1 paste no learner made; the paragraph under the box presumes the same. | `:3065` "Compare this against what you pasted in Session 1"; `:1382` "Same field, one session on." | 12.4 item 3 replaces `:1382-1384`; 12.4 item 7 (DW-066) replaces the renderer with session-1's, whose closing line carries no Session 1 reference. Neither item names `:3065`; the PR C commit body should, so an implementer who lands item 3 without item 7 does not leave it standing. | RIDES-ALONG (PR C) |
| S2-03 | s0 | accurate | MAJOR | The section map says Session 1 established the confidentiality boundary; §08 never ran and the landmines were never named. DW-088 replaces the bridge item that tests the same content; this prose sentence is on no row. | `:1246` "That is the boundary Session 1 established and Session 4 will test." | "That is the boundary this course draws, and Session 4 will test it." | RIDES-ALONG (PR C) |
| S2-04 | s0 | accurate | MAJOR | DW-099's false premise at a second site the row does not enumerate: the outcomes card repeats that the three templates were written before any framework was taught. | `:1251` "The three you wrote before being taught a framework" | "The three you wrote before this session, scored element by element and one of them rebuilt in place." Land inside the DW-099 commit. | RIDES-ALONG (PR C) |
| S2-05 | s3 | accurate | MAJOR | At 6:26 PM the temperature bars render a hand-typed harmonic series, (1/n)/H10 over ten real words, as percentages with no `.sim` badge and no `.src` line anywhere in the section; this is the DW-072 shape on the page taught next. At T = 0 the same panel prints "argmax, no sampling" and "Deterministic", which is DW-092 item 4, the claim the instructor retracts aloud at 6:03 PM. 12.4 item 14 relabels only the tick above the slider. | `:1405-1414` (0 `.sim`, 0 `.src` by `grep -c`); `:2186` "argmax, no sampling"; `:2206` "Deterministic" | Add under the bars `<span class="sim">Illustrative distribution: ten hand-picked candidates weighted 1/n, not a model's output</span>` and a `.src` line carrying the Wolfram H chip. Change `:2186` to "greedy: top bar every time" and `:2206` to say the run is greedy in this simulation and real APIs still vary. No figure moves. | NEW WORK |
| S2-06 | s5 | accurate | MAJOR | Three OpenAI rate pairs (Sol $5/$30, Terra $2.5/$15, Luna $1/$6) drive the slopegraph's left column and the hover strings and have no `SOURCES.md` record at all (`grep -n -i openai SOURCES.md` returns nothing); Finding 02's token counts appear once in the repository and lie outside `src-aa`'s stated session-2 scope. | `:2260`, `:2263`, `:2264`; `:1493` "it generated 300M tokens across the index suite against a 71M median" | Add a `src-openai-pricing` record (kind evidence, moving target, dated) and regenerate; at the DW-081 re-pull extend `src-aa`'s `used_for.session-2` to the token counts and chip the card M. Until then mark the 300M/71M clause `[UNVERIFIED, needs source]` in the A16 form. | NEW WORK |
| S2-07 | s6b, s10 | accurate | MAJOR | The `.verify` gate R3 puts in front of the instructor names five authorities that are not on the page and none of the four the §07 key states as holdings, and locates the fabricated citation in the wrong section; its own framing sentence says nothing on the page is "stated as a holding" when the key states four. | `:1593` the framing sentence; `:1596-1597` the authority list; `:1600` "used as exercise material in &sect;05"; `SOURCES.md:717-718` (which generates the footer at `:2030`) | Rewrite the list to Rev. Rul. 85-13, Rev. Rul. 2004-64 (its §2036(a)(1) holding and its Situation 3 limits), §§ 2036, 2038, 2702 and 7520 as the key describes Woelbing and Davidson, the discount, and the §05 portability item; drop §§ 1014, 2010, 691 and the two Rev. Procs. or reword them to what they actually are. Change `§05` to `§07` at `:1600` and in `SOURCES.md`, then regenerate the footer. Reword `:1593` to say the characterisations are exercise material not to be taught as holdings until checked. | NEW WORK |
| S2-08 | s10 | accurate | MAJOR | The Kessler feedback diagnoses the discount problem as a stale 2023 appraisal; `CASE.md` F.7 records that report as a whole-company conclusion with "No discount study", E.2 records that no appraiser has been engaged for the discount, and §09 of this same page says the honest answer is "none of them". A learner keyed on §07 carries the wrong diagnosis into Session 3's central exercise. | `:2621` "Meg's 2023 appraisal, never re-verified and now facing a buyer's expression of interest, is the actual issue" | "There is no appraisal of the discount in this file: the memorandum asserts the figure and the 2023 report values the whole company with no discount study. That gap is the actual issue, and no citation fills it." Aligns §07 with `:1975`. | NEW WORK |
| S2-09 | s10 | accurate | MAJOR (M) | The key attaches to Rev. Rul. 2004-64 Situation 3 a condition the ruling does not state. The ruling holds that a discretionary reimbursement power does not by itself cause inclusion, and names an understanding with the trustee, a retained removal power and local creditor law as the facts that would; "not related or subordinate" is §672(c) drafting practice. A learner repeats a rule the ruling does not contain, and a second, that a discretionary clause alone is safe. | `:2615` "Only a discretionary reimbursement power, held by a trustee who is not related or subordinate, avoids that result" | Instructor verifies against 2004-27 I.R.B. (egress-blocked here), then: "A discretionary power to reimburse does not by itself cause inclusion, Situation 3, provided there is no understanding with the trustee about its exercise, no retained power to remove and replace her, and no state law letting her creditors reach the trust." | NEW WORK |
| S2-10 | s10 | accurate | MAJOR (M) | The Davidson feedback asserts a structural resemblance to Meg's note that the case does not carry: Davidson's consideration was self-cancelling installment notes with a balloon at maturity, priced off the §7520 tables, and no liquidity event is on record. The dates and dollar figures check out ($2.8 billion asserted, about $388 million settled, 6 July 2015). | `:2619` "an interest-only note payable on demand, drafted while a liquidity event was in view" | Name the real point of contact: an interest-only note with principal outstanding when the seller died. Instructor confirms the instrument before 7:37 PM. | NEW WORK |
| S2-11 | whole page | additive | MAJOR | 74 technical terms, 15 defined inline at first use (§3.2 gives the criterion and the list). Three carry scored keys before any definition: *token* is defined nowhere; *grounded* first at `:1972`; *template* first at `:1823`, inside the section D5 moves async. DW-093 asks for a nine-term glossary card and its list contains none of the three and none of the case's structure vocabulary. | `:2790` (token, in the bridge key), `:2427` (grounded, in the §05 key), `:1273` (template, first use) | Extend the DW-093 card: one sentence each for token, grounded, template, IDGT, grantor trust, non-voting units, demand note. Seven lines at s0, no figure, no em dash. | RIDES-ALONG (PR C) |
| S2-12 | s0 | accurate | MINOR | Bridge item 1's key states "roughly 50,000 candidate tokens" with no chip and no era; it is Wolfram's GPT-2 figure, chipped H to Wolfram on session-1, and wrong by two to four times for the tools the room subscribes to. Item 3's key derives a "one fifth" comparison that appears on no session-1 page and carries no chip. | `:2791`; `:2795` | Scope, do not change: "roughly 50,000 candidate tokens in the models Wolfram describes"; add a `.src` line under `#bridge` carrying the Wolfram H chip and, for item 3, an M chip to `src-aa` naming Sonnet 5 against Fable 5. | RIDES-ALONG (PR C) |
| S2-13 | s0 | accurate | MINOR | s0 restates the overclaim DW-071 closed on the hub, on a page that carries Dahl, Magesh, Charlotin and the learner's own prompts; the footer repeats it from `SOURCES.md`. | `:1235` "Every worked example, exercise input and discussion prompt in this course draws on one household."; `SOURCES.md` `src-case` `used_for.session-2` | "Every client example in this course draws on one household", and the same narrowing in `SOURCES.md`, then regenerate. | RIDES-ALONG (PR C) |
| S2-14 | s0 | accurate | MINOR | The structure card's headline reads as executed; `CASE.md` Part E opens "Nothing in this Part has been executed" and the page's only qualifier sits four lines below the card. | `:1242` "Non-voting LLC units moved to a grantor trust" | "Non-voting LLC units to be moved to a grantor trust" | RIDES-ALONG (PR C) |
| S2-15 | eight core sections | accurate | MINOR | Eight of eleven core sections carry no confidence chip: s0, sCold, s3, s6b, s7, s8, s11, s12 (`node` over each `<section>`). s0's four cards state about twenty case facts and three validator-pinned figures unchipped; s3 and s8 attribute claims to Wolfram unchipped. R2 requires a chip on every substantive claim. | `:1238-1246`; `:1401` "Wolfram is explicit that there is no theory behind the value"; `:1677` | One `.src` line per site, keyed `src-case` and `src-wolfram`. Land in the DW-021 chip commit. | RIDES-ALONG (PR C) |
| S2-16 | s0, s11, s12d | accurate | MINOR | Three visible sentences send learners to "section 6b"; the id is not a label anywhere on screen (the eyebrow reads "04 · Workshop", the nav "Your prompts"). | `:1273`, `:1823`, `:1864` | "section 04, the workshop" at all three; `:1273` is already inside the DW-089 edit. | RIDES-ALONG (PR C) |
| S2-17 | s6, s6b | additive | MINOR | D5 moves §08 async; two in-room references to it are outside 12.4 item 15, which rewords `:1272` and `:1841` only. | `:1581` "you will need the before-and-after for &sect;08"; `:1607` "into the &sect;08 audit, into the peer review" | Point both at the audit the learner runs before Session 3. | RIDES-ALONG (PR C) |
| S2-18 | s5 | accurate | MINOR | Opus 5's $2.03 and index 61 carry an H chip; session-1's own source line records Opus 5 as "cost per index task unpublished, not estimated" at the July pull, and `src-aa` describes the session-2 figures as "IDENTICAL to the session-1 pull", which cannot be true for the three models session-1 does not carry. Finding 03's 26% rests on it. Sharpens DW-022. | `:1487`; `:2258`; `SOURCES.md:160` | Correct `figures.session-2` to say what the pull shares and adds; lower the in-page chip to M to match the record until the DW-081 re-pull; say at the 6:35 PM opener that the July chart the room saw had no Opus 5 on it. | AFTER 09-14 |
| S2-19 | s5 | accurate | MINOR | The slopegraph caption chips published vendor rates to `src-case`, the synthetic household whose footer entry reads "every figure ... is invented". A14 misses it because the sentence carries no external-work signal. | `:1501` "computed at a 3:1 input-to-output ratio from published rates `H src-case`" | Rewire to `src-pricing` and the new OpenAI key in the DW-021 commit; drop the second chip per DW-020. | RIDES-ALONG (PR C) |
| S2-20 | s5 | accurate | MINOR | A chart of published data carries the `.sim` badge the page's other instance uses to mean constructed, so a learner who learned the badge from B1 discounts real figures. | `:1481` `<span class="sim">Published index and rate cards</span>` | Change the class to a plain dim span, keeping the text byte-identical so the em dash stays and A9 does not move. | NEW WORK |
| S2-21 | s5 | accurate | MINOR | Four unsourced claims a learner could repeat: "can differ threefold" (the chart's nearest same-price pair differs 1.13x, its nearest-price pair 4.4x, by `node` over MODELS); "has not been since late July" (session-1's July chart had Fable 5 on top and no Opus 5); "changed four times between June and August 2026" and "has already reversed once"; "a $20 monthly plan" with no subscription record. | `:1474`, `:1494`, `:1523`, `:1513` | Qualify the first to the pair the chart shows; date the second to the pull once DW-081 records one; mark the two counts `[UNVERIFIED, needs source]`; add a consumer-plan record for the $20. | NEW WORK |
| S2-22 | s5 | interactive | MINOR | The estimator is a family-6 parameter-sandbox (three inputs, deterministic recompute, readout; the bank's own anchor is "S2 temperature, cost estimator") tagged `click-map-explorer`; its prose says it "uses a 3:1 ratio" when the inputs are independent; it ships no `.src` line, which family 6 requires of every instance. By the bank's taxonomy s3 then s5 is family 6 twice, an adjacency the tag hides from DW-094. | `:1504`; `:1506` | Retag alongside 12.4 item 11; reword to say it prices input and output separately at published rates with a 3:1 default; add a `.csrc` with `src-pricing`. Record the s3/s5 pair on DW-094 as flagged, possibly deliberate (s3.5 says flag, do not fix). | RIDES-ALONG (PR C) |
| S2-23 | s5, s12 | interactive | MINOR | The tier decision at 6:35 PM has nowhere to be written: s12 says "§02 is where the tier reason comes from" and session-3's Part 1 rubric scores that sentence, but the doit is a paragraph with no input, and the first acceptable reason it names, measured cost per task for the learner's own workflow, is not producible from the page. | `:1516-1519`; `:1962` | Add a one-line textarea, "Your tier and the reason, one sentence", so the artefact exists when s12 asks for it; reword the first acceptable reason to the chart's own measure at the learner's volume. | NEW WORK |
| S2-24 | all sixteen | interactive | MINOR | Fifteen of sixteen work-along gates never complete on a learner action: the only `mark()` call in the file is the cold open's (`grep -c "mark('g"` returns 1 against session-1's 19; `validate_dom.js` prints fifteen WARN lines). R10 makes gates completion feedback, and here the feedback arrives only via Shift+U. Two gates also ask for something their widget cannot produce: ga3 wants a "confidently wrong count" the predictor never computes, ga2 wants a sentence the section gives no box for. | `:1278` and fourteen others; `:3066`; `:1467`; `:1366` | One `mark()` call per component at its natural completion, and reword ga2 and ga3 to what their widgets do. JavaScript only. | NEW WORK |
| S2-25 | s0 | interactive | MINOR | The bridge's reveal is all-or-nothing and nothing locks: one button opens all four keys and every textarea stays editable, so the family-5 contract holds for at most the item the learner is on. | `:1229`; `:2817-2822`; no `readOnly` in `:2789-2825` | Per-item reveal that sets its own textarea read-only; keep the all-four button for the instructor and Shift+U. | AFTER 09-14 |
| S2-26 | all core | interactive | MINOR | No core section carries a timer or states a silent window; the only clock on the page is B5's speaking timer, hidden at the default depth. Session 1 designed eight silent minutes and delivered zero seconds, and the five silent minutes for the ritual exist only in the run sheet. | `:1370-1385`; the eight `.doit` labels | Nothing on the page before 09-14: a ritual-shape change moves five files (s3.8, the DW-043/DW-062 discipline), and PR D's spoken line is the floor. After 09-14, decide under DW-050 whether the ritual and the bridge gain a visible countdown. | AFTER 09-14 |
| S2-27 | s3 | accurate | MINOR | The stance feedback promises "the next twelve minutes" inside a five-minute section and asserts that its first option "is the majority answer in most rooms" with no basis (R1). | `:2837`; `:2838` | "The rest of this section gives you the mechanism"; drop the majority clause. | NEW WORK |
| S2-28 | seven hosts | interactive | MINOR | Seven of sixteen `data-comp` declarations name a family the built mechanism is not, by the bank's own anchors: s5 (6 tagged 11), s6 (15 tagged 1), s6b (15 tagged 13), s12's checklist (a tick list tagged 3), s1 and s4 (7 tagged 1), s2 (a two-panel reveal tagged 1). By mechanism s6 then s6b is family 15 twice at 6:45 to 7:10 PM, an adjacency DW-094 cannot see because it reads tags. | `:1504`, `:1537`, `:1597`, `:1957`, `:1306`, `:1444`, `:1347` | Retag in the 12.4 item 11 commit; record the s6/s6b and s3/s5 pairs on DW-094 as flagged. | RIDES-ALONG (PR C) |
| S2-29 | s6b | interactive | MINOR | The paste box is never read: the scorer reads only the four rating tiles, so "the original is the measurement" measures nothing and a learner who pastes and waits is told "Score all four elements for this prompt" (Chromium). | `:1617`; `:2860-2875` | After PR B, either run the s8 specification regexes over the pasted text as a hint row, or reword the placeholder so it does not promise a measurement. | AFTER 09-14 |
| S2-30 | s6 | accurate | MINOR | The one worked P.T.C.F prompt contradicts its own simulated output: the Format component specifies 200 words in four paragraphs, the readout reports "≤150 words, 3 paragraphs, 1 closing question". | `:2343`; `:2356` | Make the readout match the Format string. | NEW WORK |
| S2-31 | s7, s8 | additive | MINOR | The 09-07 cut names §05 first to drop "because no interaction is designed"; DW-101 records the seven-item scored quiz the extractor cannot see. By the §2 scores §05 (3.7) outranks §06 (3.4); by the bottom-up model §06 costs 11.8 minutes to §05's 9.0; §06's technique was taught aloud three times on 08-31 and echoed back by a learner, while §05's Category B is what §08's diagnostic bands and Session 3's grounding argument lean on. | `audit/AUDIT-2026-09-07.md:383` | In PR D: keep §05 at 7:49 PM; make §06 first to drop, delivered as a three-minute demonstration of the wrapper with the ten-question reveal skipped. | NEW WORK |
| S2-32 | s11 | interactive | MINOR | §08 cannot run in the room as built: part two needs a partner and a template, part one is eight self-report ticks with no interaction (I = 1, the page's lowest). The D5 async call holds; four sentences still describe it as in-room. | `:1841`; `:1832-1839` | D5 as decided; the framing edits are 12.4 item 15 plus S2-17. | RIDES-ALONG (PR C) |
| S2-33 | s6 | accurate | MINOR | The persona chart draws three bars at 0.92, 0.14 and 0.08 that encode nothing measured and carry no values or badge, and the effort table asserts "Large" and "Largest" effects for Task, Context and Format with no source; Zheng tests personas only. | `:2385-2389`; `:1565-1568` | Replace the bars with their labels or badge them illustrative; reword the column to name it as the course's ranking. | NEW WORK |
| S2-34 | s12 | accurate | MINOR | The baseline record the learner copies and keeps prints "A 40% time reduction recovers N hours a year", an unlabelled assumption with no source, inside the artefact Session 5 compares against. | `:2751` | Mark the 40% illustrative in the same sentence. | NEW WORK |
| S2-35 | s10 | accurate | MINOR | The Magesh figures (202 preregistered queries, Lexis+ AI 17%, Westlaw 33%) are chipped to `src-dahl-fictions`; the `src-magesh` chip sits on the version-caveat clause beside them. The record says "over 200"; the caption says 202. | `:1774` | Rewire the second chip to `src-magesh`; reconcile the count at the next verification. | RIDES-ALONG (PR C) |
| S2-36 | s10 | accurate | MINOR | The Woelbing item cites one docket and then reports two stipulated decisions on two dates; 28 March 2016 belongs to Marion Woelbing's docket 30260-13, which the item never names. | `:2617` "stipulated decisions were entered on 25 and 28 March 2016" | Name the two dockets in the sentence. Dates unchanged. | NEW WORK |
| S2-37 | s9 (B4) | accurate | MINOR | The adoption chart's "Prior-year figure for generative language use 41.8%" appears once in the repository and lies outside `src-t3-survey`'s stated scope (52.2 and 42.9 only). The chart subtitle says "drafting and capture tools" are over half; only the drafting row is. The seven CFP Board step names carry no record and no chip. | `:2552`; `:1749`; `:1733` | Extend the record or drop the row; split the subtitle's two figures; add a CFP Board record and chip. | AFTER 09-14 |
| S2-38 | s9, s12d | accurate | MINOR | The 3% reliance figure is rendered three times and chipped once: the s9 caption carries an M chip to `src-kitces-productivity`, whose scope does cover it as directional, but the instructor key and the B5 complication card repeat it bare. | `:2553` (chipped); `:2500`, `:1895` (bare) | Add the M chip at both bare sites, or point them at the caption. | AFTER 09-14 |
| S2-39 | s1 (B1) | additive | MINOR | B1's live run tells learners "We will come back to what you got in §01"; §01 sends a different prompt and never refers back, so three chats are run for nothing. | `:1332` | Point the callback at what §01 actually does, or drop the sentence. | AFTER 09-14 |
| S2-40 | s2, s4 (B2, B3) | accurate | MINOR | Both appendix exhibits are constructed model outputs with no `.sim` badge and no `.src` line: B2 presents four probabilities and two Code citations as a model's answer set, B3's predictor shows three fixed probabilities that total 75% in the balanced state, the bank's named family-7 failure. | `:2163`; `:2217` | Badge both illustrative in-panel; renormalise B3's bars or say in the panel that they are not a distribution. | AFTER 09-14 |
| S2-41 | s4 (B3) | accurate | MINOR | "After roughly 400,000 trained weights" turns Wolfram's network size into a training milestone, and neither that figure nor the 15% carries a chip; the section's one chip sits on the chart caption. | `:1442` | Restate as network size and chip both figures to `src-wolfram`. | AFTER 09-14 |
| S2-42 | default depth | additive | MINOR | At the default depth, which D5 keeps, Session 2 runs no named discussion block; pedagogy s4 requires one per session and s3.7 makes it the only I-class interaction. B5 is 18 minutes and hidden. An accepted cost of D5 that no row records. | `:1860`; `pedagogy.md:123` | Record it on DW-050 or a new row so the next audit does not re-find it. | AFTER 09-14 |
| S2-43 | s12d (B5) | accurate | MINOR | The four phase headings sum to 19 minutes against an eyebrow, an apxstub and a footer row that all say 18; the pace loop reads 18 and the room would run 19. | `:1868`, `:1878`, `:1890`, `:1898` | Rebalance one phase by a minute, or the eyebrow, with the exact-150 rule in view. | AFTER 09-14 |
| S2-44 | footer | accurate | HOUSEKEEPING | The stamp reads "Last updated 2026-08-20" on a page changed on 2026-09-08, in all four lessons; it is hand-maintained and in no procedure, so a reader told to "reload before relying on a figure" cannot tell whether they have. | `:2042` | Stamp the date in the PR C commit that next touches the page, or generate it. | NEW WORK |
| S2-45 | register | accurate | HOUSEKEEPING | DW-093's "s12 1,763 words for 7" counts the 987-word footer as s12; the section's HTML prose is 699 words and its rendered text 929. The trim PR C plans is sized on the wrong number. The s0 figure (771 against 754 measured) is right. | `docs/deferred-work.md`, DW-093 | Note it on the row; trim s12 by its real density, not 252 words per minute. | RIDES-ALONG (PR C) |
| S2-46 | s0 | interactive | HOUSEKEEPING | The `retrieval-bridge` tag sits on the pace and depth-control panel, which is no bank family; the bridge panel carries no tag, so extractors credit family 5 to the wrong element. | `:1213` against `:1227` | Move the two attributes to `#bridge`. | NEW WORK |
| S2-47 | s0 | interactive | HOUSEKEEPING | Two depth buttons are lit at load and `apply()` never resyncs the level buttons, so the bar's highlight and its state can disagree. | `:1217`, `:1219`; `:3103-3123` | Toggle the level buttons inside `apply()`. | NEW WORK |
| S2-48 | s5 | interactive | HOUSEKEEPING | The frontier toggle reads "Show efficient frontier" while the frontier is shown; the first click hides it. | `:1484`; `:2300` | Label it by state. | NEW WORK |
| S2-49 | s8 | interactive | HOUSEKEEPING | The ten questions are hidden by `color:transparent` plus a text-shadow, so the text is selectable and read aloud by a screen reader; the commit-before-reveal is visual only. | `:2960` | Render the list only on reveal, as the bridge does its keys. | AFTER 09-14 |
| S2-50 | s8 | accurate | HOUSEKEEPING | "The CPC buy-sell agreement was executed in 2014" names the company by a name it took in 2016; `CASE.md` F.6 has the 2014 instrument between Hensley Precision Products and Walter Hensley. The DW-012 class, colloquial here rather than a pinpoint citation. | `:1689` | "The buy-sell agreement CPC inherited was executed in 2014". | AFTER 09-14 |
| S2-51 | s1 (B1) | accurate | HOUSEKEEPING | "Stop token reached" names a mechanism the widget does not have: the run ends at `MAXS=8` and no candidate list contains a stop token. | `:2114` | Say the run ended at the step limit. | AFTER 09-14 |
| S2-52 | hub | accurate | HOUSEKEEPING | The hub's Session 2 blurb promises "role framing", the one P.T.C.F component §03 shows does not move accuracy. | `index.html:1046` | "Prompting patterns, specification, and where these tools earn their keep". | AFTER 09-14 |
| S2-53 | register | accurate | HOUSEKEEPING | Row locators that drifted at `caeeddd`: DW-050 `:1249` is `:1226`; DW-055 `:1258` is `:1235`; DW-064 (closed) `:3036`/`:3084` are `:3035`/`:3083`; DW-066 `:3042` is `:3045`; DW-073 `:1576` is `:1577`; DW-020's `:1389` is `:1501`; 12.4 item 14's `:1416` is `:1408`; 12.4 item 15's `:1271` is `:1272`. Every quoted string still resolves. | as listed | Refresh when each row is next touched. | RIDES-ALONG (PR C) |

Three cross-file observations, outside this audit's file, surfaced by tracing
this page's dependencies and reported here so they get rows rather than being
re-found:

| id | file | defect | anchor | fix |
|---|---|---|---|---|
| X-1 | session-4 | The confidentiality sorter names LANDMINE 3 as "the relationship itself" and carries no endowment item; `CASE.md` Part J says "Exactly three": Nathan, the privileged strategy, the endowment and the board seat. s0 follows Part J and session-4 does not, so a learner who carries s0's three into Session 4 is told a different third. BLOCKING-class on the page it lives in. | `session-4:2513-2515` against `CASE.md:784-794` | Restore Part J's third as LANDMINE 3 and carry the relationship as the regulation's own item, which is how s0 already frames it. |
| X-2 | session-4 | "Enter the baseline minutes you recorded in Session 1" presumes the baseline DW-087 records no learner has. | `session-4:1688` | "the baseline minutes you recorded in Session 2". The DW-087 class. |
| X-3 | session-3, session-4 | Session 3's cold open compares against "the one you pasted in Session 1" and Session 4 opens "Fourth time."; for this cohort the series starts on 09-14 (DW-062, amended 09-08). | `session-3:1247`; `session-4:1275` | "the one you pasted in Session 2"; "Same field again." At each pre-flight. |

---

## 2. The per-section scorecard

Scored 0 to 5 per axis on the rubric this audit ran against. The weighted total
is 0.4 × interactive + 0.3 × accurate + 0.3 × additive, on the same scale;
interactive carries the most weight because the calibration event was seventeen
interactions of which none was learner-executed, and because an accuracy defect
is fixed by an edit while an interactive one is fixed by what happens in the
room. Under equal weights no section changes rank. "Actual" is planned × 1.7;
§3.3 gives the bottom-up figure. Rows marked *single* were scored by the lead
auditor alone after the agent passes died to usage limits.

| id | depth | plan | at 1.7x | I | A | D | total | the sentence that most needs to change |
|---|---|---|---|---|---|---|---|---|
| s12 Final project *(single)* | core | 7 | 11.9 | 4 | 3 | 5 | **4.0** | `:2765` "Your Session 1 baseline time against the AI-assisted time" (DW-087) |
| s7 Triage *(single)* | core | 5 | 8.5 | 4 | 3 | 4 | **3.7** | `:1596` the gate's "cited in the &sect;05 triage", naming two Rev. Procs. that are not on the page |
| s10 Citations *(single)* | core | 8 | 13.6 | 4 | 2 | 5 | **3.7** | `:1812` "an installment sale of non-voting stock" |
| sCold Cold open | core | 8 | 13.6 | 4 | 2 | 4 | **3.4** | `:3065` "Compare this against what you pasted in Session 1" |
| s8 Interview rewrite *(single)* | core | 6 | 10.2 | 4 | 3 | 3 | **3.4** | `:1689` "The CPC buy-sell agreement was executed in 2014" |
| s0 Session map | core | 6 | 10.2 | 4 | 2 | 3 | **3.1** | `:1246` "That is the boundary Session 1 established and Session 4 will test." |
| s3 Temperature | core | 5 | 8.5 | 3 | 2 | 4 | **3.0** | `:2206` "Deterministic &mdash; and, as Wolfram notes, the text goes flat and repetitive." |
| s6 P.T.C.F *(single)* | core | 6 | 10.2 | 3 | 2 | 4 | **3.0** | `:1577` "Anthropic reports removing more than 80 percent ... [NEEDS SOURCE]" (DW-073) |
| s6b Your prompts *(single)* | core | 7 | 11.9 | 3 | 2 | 4 | **3.0** | `:1603` "You had not been taught a prompting framework when you wrote them." (DW-099) |
| s5 Cost frontier | core | 6 | 10.2 | 3 | 2 | 3 | **2.7** | `:1493` "it generated 300M tokens across the index suite against a 71M median." |
| s11 Template audit *(single)* | core | 5 | 8.5 | 1 | 3 | 2 | **1.9** | `:1841` "Swap with the person you are paired with." |
| s12d B5 Discussion | apx | 18 | 30.6 | 4 | 3 | 3 | **3.4** | `:1894` "Whoever entered numbers in the baseline widget should read theirs aloud now." (DW-087) |
| s9 B4 Seven steps | apx | 16 | 27.2 | 4 | 2 | 3 | **3.1** | `:2552` the 41.8 percent prior-year bar |
| s1 B1 Next token | apx | 16 | 27.2 | 3 | 4 | 1 | **2.7** | `:1332` "We will come back to what you got in &sect;01." |
| s2 B2 Laplace | apx | 15 | 25.5 | 2 | 3 | 2 | **2.3** | `:2163` the constructed four-probability answer set, unbadged |
| s4 B3 Counting failure | apx | 16 | 27.2 | 2 | 3 | 2 | **2.3** | `:1442` "After roughly 400,000 trained weights, he reports" |

Notes, in score order rather than page order.

**s12 (4.0).** The page's one artefact the course consumes: the baseline capture
is learner-executed, produces a record the learner copies, and is read by
Session 5's comparison and by `session-4:1688`. Its checklist is a tick list
tagged `commit-first-mcq`. Additive 5 on the strength of "the one thing tonight
you cannot reconstruct later" and the Session 3 preview, whose document list
matches `COLEDOCS`. Accurate 3: no chips, DW-087's premise, the unlabelled 40%
(S2-34). At 8.2 bottom-up minutes against 7 planned it is the only core section
under the multiplier, because it is mostly a form. Rows: DW-087, DW-093, DW-075;
12.4 item 10.

**s7 (3.7).** Seven items, locked per item, per-option feedback that addresses
the chosen wrong answer, runs with nothing pasted; 694 words of feedback strings
and no chips. Category B, specified but unverifiable, appears on no Session 1
page and is what §06's diagnostic bands and Session 3's grounding argument lean
on. Untagged, so every extractor and the 09-07 cut list treat it as
interaction-free (DW-101). Its item 6 rests on portability with no authority
named, which is the one thing the `.verify` gate half-gets-right.

**s10 (3.7 with the page's only BLOCKING finding).** Interactive 4 and additive
5: six-item triage with commit per item, four failure types, the four-check
order Session 3's bridge recalls at `session-3:1196`, and the verification-time
lesson the baseline record consumes. Accurate 2 is the lowest-justified score on
the page and carries S2-01 and S2-07 through S2-10 plus the mis-keyed Magesh
chip. The Dahl figures (58/69/88) and the Magesh rates (17/33) check out against
their records, H to the record and M to the papers. Kessler is labelled
fabricated at the point of use, in the gate and in the footer, so R5 is met and
only its section number is wrong.

**sCold (3.4).** The course's only longitudinal instrument, and on 09-14 the
first learner-executed interaction of the course. Runs with nothing pasted for
anyone who has ever sent a prompt. Held at 4 because nothing on this page
consumes the artefact and both downstream consumers are mis-premised for this
cohort (X-3). Accurate 2: S2-02, the three-check analyser where the room heard
eight (DW-066), the `chars/4` token line with no source, and `:1382` rendering
the eight literal characters `§04` on screen, which 12.4 item 3 removes only if
the whole paragraph goes.

**s8 (3.4).** The wrapper is copyable, the ten-question recall is
commit-before-reveal against the learner's own run, and the ten-dimension
diagnostic is learner-executed. Additive 3 rather than 4 because the technique
was taught aloud three times on 08-31 and echoed back by a learner; what the
page adds is the checklist and the diagnostic. At 11.8 bottom-up minutes it is
the second most expensive core section, which is what makes it the cut candidate
in §4.

**s0 (3.1).** Two independent readers split on interactive, 3 and 4; the higher
is recorded because the four items are learner-executed and the retrieval effect
is unreachable by reading, the lower because nothing locks and gate g1 is dead.
Additive 3: the page's only s3.2 retrieval and its only plain-language case
summary. Worth recording against DW-100, which asks for a 200-word
plain-language summary "that does not exist anywhere on the site": the four
cards at `:1238-1243` are that summary, 420 words, and the row's premise has
stopped being true. Accurate 2 on S2-03, S2-04, S2-12, S2-13, S2-14 and zero
chips over about twenty case facts.

**s3 (3.0).** The vote is commit-first and locks (s3.1 satisfied); the slider is
instructor-demonstrable and runs itself on load; nothing is captured. A node
simulation of the section's own `chain()` shows five runs distinct in 99.9% of
20,000 trials at T = 0.8, so the vote's option-a feedback ("count the distinct
outputs before you decide whether the variation is a rounding error") can only
come out one way. Additive 4 for the three practice consequences and the
constrain-the-output-space exercise, none of which Session 1 delivered, against
roughly half the section re-running the three-temperature demo the room watched
at 02:05 to 02:12.

**s6 and s6b (3.0 each).** s6 assembles a real prompt from four toggles with
every case figure interpolated from `COLE` at parse time, and its Zheng study
description (162 roles, four families, 2,410 questions) matches the record; it
carries DW-073's `[NEEDS SOURCE]` in bold on the page, the decorative persona
bars (S2-33) and the Format contradiction (S2-30). s6b is the graded-adjacent
piece and the answer to the learner's written question; until PR B lands it can
score nothing real with nothing pasted, and its paste box is read by no code
(S2-29). By mechanism the two are family 15 twice in a row at 6:45 to 7:10 PM.

**s5 (2.7).** The lowest kept core score. Its internal arithmetic reproduces
every card percentage from the MODELS array, so the defects are all provenance:
S2-06, S2-18, S2-19, S2-20, S2-21, S2-22. It corrects the room on DW-092 items
2, 9 and 11 if read aloud. Additive 3: the only place the frontier becomes a
decision rule at the learner's own volume, but heavy overlap with session-1 §05
as delivered, and the cut list's stated reason for keeping it ("bridge item 3
depends on it") runs backwards, since the bridge is answered from Session 1
twenty minutes earlier.

**s11 (1.9).** Eight self-report ticks and four peer scores; nothing verifies a
template and part two needs a partner. Additive 2 in the room and 4 async: the
template-versus-prompt distinction and the handoff test are new and feed Part 2
and Session 5. D5 holds (§4).

**The appendix.** All five are hidden at the default depth and stay hidden under
D5, which is why none outranks a core section here. B1 scores accurate 4, the
page's highest, because it badges its constructed curve illustrative where s3
does not, and additive 1, the page's lowest, because it re-runs session-1 §02's
picker over the same series and its callback promises a return in §01 that never
comes (S2-39). B4 is the page's cleanest family-13 instance, a real key with an
invitation to argue, held to accurate 2 by three unsourced figures. B5 is the
only I-class interaction in the file and the only timer; with D5 keeping it
hidden, Session 2 runs no named discussion block (S2-42). B2 and B3 are two
toggles and a three-button predictor respectively, both scoring interactive 2,
and both present constructed exhibits with no badge (S2-40).

---

## 3. The three axes in aggregate

### 3.1 Interactive: core mean 3.36, one 5 and one 1

Core interactive scores sum to 37 over eleven sections. Two structural facts
hold the axis down everywhere. **Capture:** one core section keeps an artefact
the course consumes (s12's baseline record); s6b's rewrite is copyable and named
at `:1962` but presupposes a template to rewrite; the bridge answers, the stance
vote, the tier sentence and every triage score are kept nowhere and read by
nothing (`grep localStorage` returns nothing, which is R9 working as designed,
and no in-page consumer reads any of them either). **Feedback:** fifteen of
sixteen gates never complete on a learner action, so the completion cue R10
promises fires only for the ritual and only Shift+U turns the page green
(S2-24).

Eight of eleven core sections run with nothing pasted. The three that do not are
s6b (until PR B), s11 (a partner and a template) and, for their off-page
exercises, any section whose doit needs a chat tool. Silent work is designed
nowhere: no core section carries a clock or states a window, and the eight
stated durations are labels on prose (S2-26). Seven of sixteen family
declarations diverge from the bank, which is why the two adjacencies that matter
on the night are on no row (S2-28).

### 3.2 Accurate: core mean 2.36, the file's weakest axis

Core accurate scores sum to 26, against 37 interactive and 41 additive. Four
causes, each measured.

**Chips.** The page carries 30 chips: 16 in sections, 14 in the footer. The 16
fall in six of sixteen sections, so eight of eleven core sections carry none.
Two of the in-section chips resolve to the synthetic household on external
claims (`:1501`, `:1577`), one is mis-keyed (`:1774`), one grades H over a record
at M (`:1487`), and one badge means the opposite of what it says (`:1481`).

**Constructed exhibits.** Four on the page. One badged (B1's chart). Three not:
s3's temperature bars at 6:26 PM, B2's answer set, B3's predictor.

**Claims about Session 1.** Eight sites; four scheduled, one incidental, three
not:

| line | string | true for this cohort | covered by |
|---|---|---|---|
| `:1226` | "Fourteen days have passed since Session 1. Four questions, no notes." | the days yes; "no notes" is honest for items 1 and 3 and a prequestion for 2 and 4 | DW-050, DW-088 |
| `:1246` | "That is the boundary Session 1 established" | no | **S2-03** |
| `:1251` | "The three you wrote before being taught a framework" | no | **S2-04** |
| `:1382` | "Session 1 said nothing in this prompt read your intent." | no | 12.4 item 3 |
| `:1603` | "You had not been taught a prompting framework when you wrote them." | no | DW-099 |
| `:2765` | "Your Session 1 baseline time" | no | DW-087 |
| `:2796` | bridge item 4, the three Cole facts | no | DW-088 |
| `:3065` | "Compare this against what you pasted in Session 1" | no | **S2-02** |

**Vocabulary.** The terms census walked the eleven core sections in page order
plus the script literals each renders, counting a term once at first use and
calling it defined inline only where that sentence or the next one says what it
is. By that criterion: **74 terms, 15 defined inline, 59 not** (M on the totals,
since what counts as a term is a judgement; H on each specific item, which is
grep-checkable). The appendix adds 20 terms with 4 defined. Undefined terms
inside scored keys or workshops include token, grounded, template, tier, cost
per finished task, IDGT, grantor trust, non-voting units, demand note, seed
gift, portability, lack of control, lack of marketability, misgrounding, docket,
Rev. Rul., stipulated decision, defined value clause, nonpublic personal
information and Flesch-Kincaid.

Against the twelve corrections owed to the room (09-07 §5.4), this page corrects
items 2, 9, 11 and 13 if read aloud, is silent on 1, 3, 5, 6, 7, 10 and 12, and
repeats the pattern of item 8 and the substance of item 4 (S2-05). Nothing on
the page contradicts `CASE.md` or `SOURCES.md` except `:1812`, which is why
S2-01 is the file's one BLOCKING finding; the register's other BLOCKING-class
contradiction found on this trace lives in session-4 (X-1).

### 3.3 Additive: core mean 3.73, and the time model

Every core section but s11 has a downstream consumer traced to a line in §2; the
two 5s (s10, s12) are what Session 3's bridge and Session 5's comparison rest
on. Overlap with Session 1 as delivered is concentrated in three sections: s3
(the three-temperature demo), s5 (the frontier and tier table), s8 (the
interview technique). Overlap with `session-0.1` on the core is nil.

The time model, bottom-up. Prose read aloud at the 167 wpm measured for this
instructor on 08-31 (H on words, H on the rate as measured, M as a forecast);
the stated activity durations as written (H); a widget floor per section
estimated by the auditor (L):

| id | plan | prose words | read aloud | stated timer | widget floor | bottom-up | ratio |
|---|---|---|---|---|---|---|---|
| s0 | 6 | 754 | 4.5 | 0 | 7 | 11.5 | 1.92 |
| sCold | 8 | 113 | 0.7 | 0 | 8 | 8.7 | 1.08 |
| s3 | 5 | 421 | 2.5 | 4 | 2 | 8.5 | 1.70 |
| s5 | 6 | 597 | 3.6 | 4 | 2 | 9.6 | 1.60 |
| s6 | 6 | 521 | 3.1 | 5 | 2 | 10.1 | 1.69 |
| s6b | 7 | 504 | 3.0 | 2 | 8 | 13.0 | 1.86 |
| s7 | 5 | 166 | 1.0 | 3 | 5 | 9.0 | 1.80 |
| s8 | 6 | 465 | 2.8 | 5 | 4 | 11.8 | 1.96 |
| s10 | 8 | 773 | 4.6 | 5 | 6 | 15.6 | 1.95 |
| s11 | 5 | 234 | 1.4 | 3 | 4 | 8.4 | 1.68 |
| s12 | 7 | 699 | 4.2 | 0 | 4 | 8.2 | 1.17 |
| **total** | **69** | **5,247** | **31.4** | **31** | **52** | **114.4** | **1.66** |

The 09-07 audit derived 1.7x from three delivered sections; this derives 1.66x
from eleven undelivered ones, and the two agree closely enough that the
multiplier should be treated as settled. The disagreement is about composition:
only 31 of the 114 minutes are reading, so a prose trim recovers at most a third
of the overrun and the rest has to come out of timers, widgets or sections.
Sections carrying both a widget and a stated timer cluster at 1.7 to 2.0; the
two that are mostly a form or a ritual sit near 1.1.

Four word-counts of this page exist and count different populations: 5,247 core
HTML prose words (this audit, tags and scripts stripped); 7,283 core rendered
words (Chromium `innerText`); 8,388 over 150 minutes (the extractor DW-093
cites, which attributes the footer to s12, S2-45); 9,970 and 16,396
(`verify-migration` and `validate_lesson`, over the raw file). All four are
recorded here so the next audit does not reconcile them again.

---

## 4. The cut, re-tested

§5.2 of the 09-07 audit keeps nine core sections, moves §08 async and names §05
first to drop. Against the scores in §2 and the minutes in §3.3:

| section | §5.2 says | this audit says | on what |
|---|---|---|---|
| §08 (s11) | move async | **holds** | interactive 1 and total 1.9, the lowest on the page; part two needs a partner and a template; additive 2 in the room against 4 async |
| §05 (s7) | first to drop, "no interaction designed" | **keep; the premise is false** | DW-101's seven-item scored quiz; total 3.7; runs with nothing pasted; 9.0 bottom-up minutes; Category B is what §06's bands and Session 3 lean on |
| §06 (s8) | keep, "the page makes it a builder" | **first to drop, as a three-minute demonstration** | total 3.4; 11.8 bottom-up minutes, most of them the learner's own model run; the technique was taught aloud three times on 08-31 and echoed back by a learner; the wrapper can be shown and copied in three minutes |
| §02 (s5) | keep, "bridge item 3 depends on it" | keep, trimmed, and watch it | total 2.7, the lowest kept core score; the dependency runs backwards, the bridge being answered from Session 1 at 6:14; what s5 uniquely adds is the tier sentence s12 and session-3's rubric consume, and the chart the two corrections need on screen |
| the rest | keep | keep | |

Planned core after the cut is 64 either way; the bottom-up total is 106 against
the 111 available, and dropping §06 if the room runs behind frees 12 minutes
rather than §05's 9. The multiplier and the async call stand; only the
first-to-drop changes.

---

## 5. What this audit did not do

- **It did not complete the independent scoring it was designed to run.** Two
  launches of a sixteen-reader, two-census, adversarial-refutation design died to
  usage limits (02:10 and 02:53 UTC; 1.7 million subagent tokens across the two).
  What returned: s0, sCold, s3, s5, all five appendix sections, and both
  censuses. Seven core sections are single-auditor, marked in §2.
- **The refutation pass did not run at all.** Every new finding here was
  re-derived against the file by the lead auditor but faced no independent
  refuter, so all are single-auditor in the 09-07 sense. Two agent findings were
  rejected on re-derivation and are recorded rather than dropped: a claim that
  the 3% reliance figure has no source record (its record does cover it as
  directional, so the surviving defect is only the two unchipped repeats, S2-38),
  and a claim that B1's chart could be read as a measurement (it is badged
  illustrative at `:1321`; the unbadged surface is the in-panel percentages).
- **It did not read a primary legal source.** Every legal host tried was
  egress-blocked. S2-09 and S2-10 rest on search-result summaries and are M;
  they are the two findings that most need the instructor's own eye before 7:37
  PM on 09-14.
- **It did not time a run.** The widget floors in §3.3 are estimates (L); the
  prose and timer figures are measured. PR F's dry run is where the model is
  tested.
- **It did not audit the other five pages.** X-1 to X-3 came from tracing this
  page's dependencies and are reported for rows, not audited.
- **It did not re-verify the case arithmetic.** `verify-migration` check 20 pins
  three of s0's figures and the drift report is current; the rest of the case
  content was read against `CASE.md` but not recomputed.
- **It did not change any file.** The only file this branch adds is this one.
  `git status` was clean before and after every command below.

---

## 6. What was run

At `caeeddd` on 2026-09-09, all exit 0 unless stated: `verify-editorial.mjs` (16
rules clean, 0 hard, 9 advisory, of which two are session-2's uncited
`src-pricing` and `src-google-ptcf`); `verify-migration.mjs` (15 passed; check 20
pins s0's `$522,086`, `$38,200` and `3.82%`); `verify-case.mjs` 6 of 6;
`inject-case.mjs --check` 6 current; `verify-sources.mjs` 5 of 5;
`case-inventory.mjs --report-check` current (session-2: 20 unguarded qualitative
references, 0 quantitative); `build-appendix.mjs --check` current (core 11 / 69,
appendix 5 / 81); `build-cardsort.mjs --check` current; `build-unsourced.mjs
--check` current, 12 marked claims; `test-editorial-regions.mjs` 9 passed, A9 for
session-2 reproducing at 2 literal + 64 entity = 66.

The lesson-builder skill's own two, which the repo's gate does not run:
`validate_lesson.py` returns FAIL, on V2 for six footer citation hyperlinks (the
upstream DW-029 defect, not a page defect) and on V6 for 16 distinct interactions
against a 13 to 15 band and two tagged consecutive-component pairs (DW-094); its
INFO lines report 109.3 words per allocated minute over the raw file and 73 raw
em dashes (DW-030). `validate_dom.js` in static mode resolves 112 of 112 id
lookups and warns that fifteen of sixteen gates are never marked by a component.

Measurement scripts, all in the session scratchpad and none added to the
repository: a node counter over each `<section>` for words, chips, components,
gates, figures and em dashes with tags and scripts stripped; a node reader over
the register producing a one-line index of all 104 rows; a Playwright drive at
1280 px that loads the page with zero JavaScript errors and one blocked font
request, confirms `body.core-only` at load, and reads rendered text, the slider
bars at T = 0, 0.8 and 1.5, the assembled P.T.C.F prompt and its readout, every
widget's item count, the gates after a scripted pass, the cold-open readout on a
measured input, and the depth control at both settings; `grep -n` for every
quoted anchor in this file.
