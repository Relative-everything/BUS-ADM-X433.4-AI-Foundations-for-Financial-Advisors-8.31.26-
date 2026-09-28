# Handback: Session 4 against the instructor's update notes, 2026-09-28

Branch `claude/gracious-cray-2k4fkc`, from `c328c8c` (`main` after PR #40). Class is 2026-09-28,
6:00 PM Pacific. The ask is in `notes-verbatim.md`; the plan and its premise challenges in
`plan.md`; one row per change in `ledger.md`; 47 DOM assertions in `checks.mjs`.

## Summary, quantified

| Measure (at load, every appendix shown, 1280 px) | Before | After |
|---|---|---|
| Visible controls | 214 | **275** (+29%) |
| Visible words | 6,702 | 8,815 (+32%) |
| Chips | 130 | 229 |
| Footer sources | 33 | 70 |
| Sections whose main click moves a figure (of 17) | 16 | 16, and eight sections gain a second or third figure |
| Minutes, sections, tiers, gates | 67 + 83, 17, 3, 17 | unchanged |
| Console acceptance suite | 2 lessons | 3 lessons, 86 of 86 |
| Change-folder checks (four folders) | 66 assertions, 0 failed | 113 assertions, 0 failed |

Per section, words and controls before to after: §02 397/17 to 622/34; §03 488/15 to 889/25;
§04 287/14 to 461/21; §05 629/15 to 629/15 (the new material is inside readouts that open on a
click); D1 376/7 to 632/12; D2 424/15 to 552/15; D3 286/12 to 719/21; D5 343/5 to 622/11; D6
321/16 to 323/17; §06 369/8 to 409/8; §07 460/10 to 634/16; the page top gains the Live API box.

**The word count is the one number that moved against the note's first rule**, so it is worth
saying where it went. Bullets under each section grew by at most one line. The growth is inside
the new interactives: six rung buttons and their glyph strip, eight card fronts, the plan skeleton,
the contract page's six lines, the clock keys, the Why slot readouts. Every new figure is read by
clicking, and no section gained a paragraph.

**Recommendation: merge.** The rejected alternatives were a fifth section for the contract (§04
already is that section and gains the clause view), a separate cybersecurity section (the four
attacks, the hiding techniques, the bill and the two image marks all sit inside the sections that
already teach them), and the API inside §06 (the box at the top, with §03's pointer, is where the
request is taught once).

## 1. The [DECIDE] items

| Item | Decision | The one line |
|---|---|---|
| EU AI Act in §01, and the D1 callout | **Keep, reworded** | It is the one rule written for AI that reaches a US adviser, indirectly: Claude marks output worldwide because of it, so a CFP's Claude text carries a mark they cannot check. §01 item 9 now says it binds the vendor, not the adviser; D1's callout says why it is on the page. |
| A new contract section, or §04 | **No new section** | §04 is the contract section. It gains What the Clause Looks Like: Anthropic's own sentences for each of the six locks, who signs, who it binds, and the 48 hours against the rule's 72. §03's ladder points at it. |
| "Four attacks, one wall": is the evidence enough | **Enough, with two additions** | The board gains a scale line per attack, each figure tagged measured, demanded or projected; the video-call beat gains the bill with three real losses. A third beat would have moved minutes. |
| D2's detector question | **Relevant, reframed** | An adviser will never hold the key, so the page says so and turns the question into the two things a CFP can do: check a file with the Claude Content Checker, and keep their own record. The page never tells them to check text for a mark. |
| §06: show the API partially | **No** | The API is taught once, in the box at the top, with See the request before Send. §03 carries the Plan C pointer; §06 keeps its arithmetic and gets plainer words instead. |

## 2. The live work-along (C.7): legality

**Screensharing a real, uncleaned transcript or case note to the class: NOT ALLOWED.** The class
is a nonaffiliated third party under Regulation S-P (17 CFR 248.10, the notice and opt-out
requirement for disclosures to nonaffiliated third parties). None of the exceptions fits: 248.13
needs a service contract, 248.14 a client transaction, 248.15(a)(1) the client's specific consent
to that disclosure. CFP Board Code and Standards A.9 (Confidentiality and Privacy) lists no
teaching exception. A Zoom recording turns a transient share into a stored disclosure. The only
lawful route is specific written client consent naming the audience and purpose plus the CCO's
approval, and even then small-cell facts re-identify.

**Pasting genuinely de-identified text into a personal consumer AI account: ALLOWED WITH
CONDITIONS.** (1) De-identify off-screen first, names and quasi-identifiers alike, and apply the
banker test ("could a Rockford banker name this family?"); (2) the account's training switch is
off, shown to the class; (3) the firm's written procedures permit personal-account use at all,
which many do not; (4) identifiable NPI would also breach the consumer terms' rights warranty and
the usage policy's line on sharing personal information without consent (both Anthropic pages
opened). "De-identified information is outside Regulation S-P" is an inference from the
definition of nonpublic personal information in 248.3, not a published SEC position, and is
taught with the small-cell caveat.

The aid runs the segment with the synthetic Cole transcript (already on the page as D6's material),
cleaned live in a Google Doc under a Workspace account, then pasted into an account whose switch
the class has just watched being turned off. Confidence: H on the rule text (three publishers of
17 CFR 248), H on the Anthropic pages, L on the inference.

## 3. Every real-world case on the page, with its sources

Each case rests on three or more independent publishers; primary documents are listed first.
Retrieved 2026-09-27 through the search lanes; the publishers' pages themselves are egress-blocked
from this build, so each record in `SOURCES.md` carries a retrieval note.

| Case | On the page | Sources |
|---|---|---|
| Arup, Hong Kong, January 2024: HK$200 million, about US$25.6 million, 15 transfers after a video call where every face was a deepfake | §05 the bill; the board | CNN (February and May 2024), South China Morning Post, Fortune, CFO Dive, Dezeen quoting the Financial Times |
| A UAE bank, January 2020: US$35 million after a phone call with a cloned director's voice, revealed by a 2021 court filing | §05 the bill | Forbes, Dark Reading, Unite.AI, SingularityHub, Interesting Engineering |
| Singapore, May 2026: S$4.9 million, about US$3.8 million, after a Zoom call with deepfakes of the Prime Minister and ministers | §05 the bill | South China Morning Post, The Star, Malay Mail, VnExpress, Mothership, the Singapore Police Force release |
| FBI IC3 2025 report (7 April 2026): $20.9 billion reported; 22,364 complaints named AI | §05 caption and board | FBI IC3 and its press release, Forbes, CBC, Alston & Bird, Abnormal, Avast |
| Deloitte, May 2024: $40 billion by 2027, a projection | §05 board | Deloitte Insights, Biometric Update, ID Tech Wire, Fortune |
| IBM Cost of a Data Breach 2026: US average $11.5 million | §05 board | IBM Newsroom, IBM X-Force, Cybersecurity Dive, Infosecurity Magazine, ASIS |
| Salesloft Drift, August 2025: stolen connector tokens, 700+ organisations | §05 board | FINRA's alert, AppOmni, TechRadar, WTW, Paubox |
| EchoLeak, CVE-2025-32711 | §05 (already on the page) | unchanged record |
| Mozilla 0Din "Phishing for Gemini", July 2025: white, zero-size text in an email | §05 How it hid, technique 1 | Mozilla 0Din, Microsoft Learn, Darktrace, HiddenLayer, SC Media |
| Palo Alto Unit 42, March 2026: 22 payload techniques in the wild | technique 2 | Unit 42, Microsoft Learn, Cloud Security Alliance, Anthropic |
| ASCII smuggling against Microsoft 365 Copilot, 2024 | technique 3 | Johann Rehberger (Embrace The Red), The Hacker News, SC Media, Cisco Robust Intelligence |
| Trail of Bits (August 2025) and Brave (October 2025): text in images | technique 4 | Trail of Bits, Brave, BleepingComputer, SecurityWeek, Simon Willison |
| Anthropic threat reports, August 2025 and September 2026 | §05 board | anthropic.com pages, opened directly |
| Equifax, 2017: knew 29 July, told the public 7 September, 40 days; settlement of at least $575 million | D5 Two Real Clocks | GAO, FTC, CFPB, House Oversight report, Senate PSI report |
| Capital One, 2019: knew 19 July, told the public 29 July, 10 days; $80 million OCC penalty, $190 million settlement | D5 Two Real Clocks | Capital One's own page, CBS News, SiliconANGLE, Seattle Times, Huntress |
| Uber, 2016: told the public a year later; the security chief convicted, October 2022 | D5 readout | US Department of Justice, BakerHostetler, Norton Rose Fulbright, Arnold and Porter |

Held in `SOURCES.md` at H but not cited on the page, for use aloud: the UK energy firm 2019 voice
call (€220,000; WSJ, Forbes, Gizmodo, CBC, Avast), Singapore March 2025 (US$499,000, recovered;
police release, Mothership, HRD Asia, Fortune, Straits Times), Ferrari July 2024 (an attempt,
stopped by one question; Bloomberg, Fortune, MIT Sloan, Jalopnik), WPP May 2024 (an attempt;
Guardian, TechRadar, MediaPost, OECD.AI). No named RIA or broker-dealer deepfake loss met the
three-publisher bar, so the page names none.

## 4. The three readings (Part D)

The lane that was to verify these ran after the session's search budget was gone and every
regulator domain is egress-blocked here, so nothing below was re-opened today. Each is a record
the repository already holds at H from an earlier round; read the caveat as "confirm the link
before you cite it aloud".

1. **FINRA Regulatory Notice 24-09** (27 June 2024): the position that existing rules are
   technology-neutral and reach generative AI, with no new obligation. About twenty minutes.
   finra.org/rules-guidance/notices/24-09.
2. **FINRA 2026 Annual Regulatory Oversight Report** (9 December 2025), the generative-AI section
   only: supervision at the enterprise level, controls for hallucination, bias and threat-actor use,
   ongoing human monitoring, and oversight for agents that act or transact. About fifteen minutes.
3. **SEC Division of Examinations, Fiscal Year 2026 Examination Priorities** (17 November 2025),
   §VII: information security and operational resiliency including the 2024 Regulation S-P
   amendments; emerging financial technology and AI, including the accuracy of AI representations
   and controls against AI and polymorphic malware. About ten minutes.

Alternates: Brian Daly's remarks to the ICI Winter Board Meeting (3 February 2026), useful only for
the open-questions framing; CFP Board's Generative AI Ethics Guide (February 2025) with Standards
A.9 and A.14, the CFP-specific duty layer.

## 5. The teaching aid, against Part C

`instructor-notes/session-4-teaching-aid.htm`, the same as `.pdf` (three landscape pages, no page
overflows) and `.md` (the phone copy). Colour lanes: blue is work the page, red is you lecture for
two minutes, green is a live demo off the page, teal is the API box, purple is a poll or a chat
harvest; a black number is a row never to skip; red text is a time to stop by.

| Part C | Where it is |
|---|---|
| C.1 Follow the repo, section, interactive, lecture | Page 1: one numbered row per slot in page order, each with its time, its lane colour, what to click, the poll if there is one, and the "Land:" sentence; four red LECTURE rows sit between the page rows and point at the cards on page 3 |
| C.2 Fill three hours | The clock runs 6:00 to 9:00 with the break, five checkpoints (6:46, 7:02, 7:33, 8:25, 8:41), NEVER SKIP rows, and a drop order that names the minutes each cut saves |
| C.3 A couple of bullets per section | Page 3, E1 to E4: two to four lines each, nothing longer |
| C.4 Tie to CFP planning | The cards are the ties: the four stops as the CCO's, the examiner's and the plaintiff's lawyer's questions about any plan or letter (E1); why the 2000 rule, the 1940 Act, FINRA 3110 and CFP A.9 and A.14 each reach the adviser (E2); approved means on paper, as it already does for custodians and software (E3); the record is the plan file under Rule 204-2 (E4) |
| C.5 §03 run flow | Page 3, F: click every vendor, every plan, the switch and the six leaks in the order given, then the ladder rung by rung, the door, and Climb all once; ends on the landing line |
| C.6 D5 cue | Page 1 row 19 and page 3, G: "STORY: the advisor you know who had a breach", placed after the two real clocks and before the clause, no name, no firm |
| C.7 Live work-along | Page 2, A (6:36, 10 minutes): the legality verdict, the synthetic Cole transcript in a Google Doc, the banker test, the training switch shown off, then three questions in a personal account |
| C.8 Two or three outside-repo demos | A (6:36, the transcript), B (7:52, hidden text in a document pasted into Claude), C (8:15, a Claude-made PNG through the Content Checker, then its screenshot), with the Live API box at 6:55 (D) and the SynthID beat inside D1; spaced so no hour is page-only |

## 6. What was not done, or done differently

1. **The Gemini app's SynthID check for images (D2 [VERIFY]).** Google's pages are egress-blocked
   and the search budget was gone before the lane ran, so the page says nothing about it. The aid
   says only: "Google has described a SynthID check inside the Gemini app for images made by its
   own models; open Google's page before saying more."
2. **"Loop engineering" (D3).** No source opened uses the term. The page uses Anthropic's own words,
   "the agent loop" and "the agentic loop", and the aid says "some people call this loop
   engineering".
3. **Exact free-tier request limits for the Gemini API.** Sources conflict and Google now sets them
   per project; the box says the quota is small, shrank in December 2025, and must be checked in
   your own console.
4. **OpenAI dates in D3's deck** (memory, reasoning models): not verifiable from here, so the deck
   is Anthropic-only, each card from a page opened on 27 September 2026.
5. **A public-company row on D5's clock figure** (Form 8-K, four business days): not in the
   verified facts, so not drawn. The Texas 30-day-to-the-Attorney-General detail: not verified, not
   printed.
6. **Legal citations beyond Regulation S-P on D5.** The page cites the rule (H) for the 72 hours,
   the 30 days, the three procedures and the four notice contents; Illinois's Act (H); the
   30-day states from aggregator sources (M). The rule text itself could not be opened, so the two
   real clocks say plainly that Regulation S-P did not govern those companies.
7. **§07's four rules** are chipped M: the rule text (204-2, 4511, the 2019 fiduciary
   interpretation, 206(4)-7) could not be opened; the page keeps every claim at the strength
   shown and says that no rule lists the four.
8. **The console rule in `MAINTAINING.md`** said the box must never reach Sessions 2 to 4. The box is
   added on its own terms (synthetic clean prompt, a free key called plan A on the box's face, the
   request shown before anything is sent) and the rule text now records the exception. If you would
   rather keep the rule, deleting the three fenced blocks and the hooks restores the page.
9. **Eight verified records are not cited on the page** (the four cases above, the FBI 2024
   report, ForcedLeak, the SafeBreach calendar attack, the arXiv hidden-review papers). They stay
   in `SOURCES.md` without a Session 4 use, because chipping each would have meant another sentence.
10. **The readings (Part D)** were not re-verified today; see section 4.

## 7. What you still need to do before class

1. **Build the five polls in Zoom** (the aid names each; poll 2 asks the vendor as well as the plan).
2. **Make the three demo files**: demo A's Google Doc with the synthetic Cole transcript (copy it
   from D6 on the page), demo B's document with a white-text line, demo C's Claude-made PNG and a
   screenshot of it.
3. **Create a throwaway free Gemini key** on a Google account you do not use for anything else, for
   the Live API box. It is plan A: send only what is on the page.
4. **Check your firm's manual** on two points: personal-account AI use with de-identified text, and
   showing client material to a class. The aid's verdict assumes the first is forbidden unless the
   manual says otherwise.
5. **Confirm the Zoom session is recorded** and by whom; the work-along verdict depends on it.
6. **Open the three readings** and confirm the links before you cite them.
7. **Open claude.com/pricing and Anthropic's terms, retention, DPA and certifications pages** once
   before class; §03's ladder rests on them as read on 27 September 2026, and prices move.
8. **Screen the packages for the relay** and draw the pairing list (carried over from the run
   sheet).

## 8. Verification

Every repo gate green except two that cannot run here: `verify-style` (the sweep script is not
installed) and `verify-browser`, red only on the sandbox's font certificate on every lesson.
`build-appendix --check`, `inject-sources --check`, `verify-sources`, `verify-case`,
`inject-case --check`, `build-cardsort --check`, `case-inventory --report-check`,
`verify-migration` (15 of 15), `verify-editorial` (17 rules clean, 2 pre-existing Session 1
advisories), `build-unsourced --check`, `build-bibliography --check`, `build-sources --check`,
`attest-verified` (lock in step). All four change folders' `checks.mjs` at 0 failed (18, 29, 19
and 47 assertions). The console suite 86 of 86 on Sessions 0.1, 1 and 4. Every section run through
the click-everything harness at 1280 and 380 px with zero errors, zero dangling chips, zero new
dashes and no overflow. The teaching aid rendered to PDF with no page overflowing.
