# Spine brief

**Collected for the instructor. Nothing here is implemented, and nothing here is
a decision.** CASE.md Part K retires the four-session framing question and
forbids reintroducing it in any form. It supplies no replacement. This document
assembles the material a replacement needs and proposes three candidates. The
choice is the instructor's.

Every figure below is from CASE.md v4.0 with its section reference. Nothing is
reconstructed from a session file or from memory. Arithmetic is recomputed and
shown; where CASE.md leaves a value open, it is marked open rather than filled.

---

## 1. Inventory of the old spine

The retired question was, in the corpus's own words, whether the planning window
is still open now that a buyer has expressed informal interest, and whether a
2023 appraisal still supports a 31% discount. Twenty-nine occurrences were found
in Phase 0 across nine distinct sockets. The sockets are what matter: they are
the holes a new recurring question has to fill.

| # | File | Socket | What it was doing structurally |
|---|---|---|---|
| S1 | session-0.1 | `<h3>` "The question that stays open" plus two paragraphs, inside the case modal | **Case-modal open question.** The canonical statement of the recurring question, carried identically by every session. Also the pedagogy s5.3 requirement that the case hold at least one unresolved technical question. |
| S2 | session-0.1 | Three `<li>` items in the `.verify` instructor gate | **Instructor verification gate.** Named the specific characterisations the instructor had to verify before teaching. Two of the three were the spine question restated as verification items. |
| S3 | session-0.1 | Closing paragraph of the final section | **Section closer plus cross-session pointer.** "No session answers it. Every session returns to it. Tonight it acquired a second edge." The sentence that tied the session's own subject back to the spine. |
| S4 | session-1 | `.talk` block in section 00, labelled "The question that stays open all four sessions" | **Section closer.** The first statement of the spine to students, immediately after the case block. |
| S5 | session-1 | Modal "Open planning questions" list, items 1 and 2 (Valuation, Timing) | **Case-modal open questions.** Two of seven bullets were the spine; the other five were live case facts. |
| S6 | session-2 | Cold-open card 4, "The live question / Unresolved across all four sessions" | **Cold-open card.** One of four cards introducing the case, given visual weight (`.card.warn`). |
| S7 | session-2 | Lead-in paragraph to section 08 | **Cross-session pointer.** "The question that follows you into it is the one section 07 left open." Carried the spine into the document-set exercise. |
| S8 | session-3 | Note-scoring rubric line, `{n:'The open question on timing', re:/.../}` | **Rubric line.** A regex that rewarded a student note for naming the spine question. The only socket that was machine-scored. |
| S9 | session-4 | NPI sort item, `{k:'appr', l:'2023 appraisal supporting the 31% discount', s:5}` | **Exercise data label.** The spine appearing as a sensitivity-weighted item in a classification exercise. |

**No retrieval-bridge socket existed.** The bridges in sessions 2, 3 and 4 test
the prior session's *mechanism*, not the case question. A new spine can use them,
but it would be occupying a socket the old one never held.

Sockets S1 through S7 are now marked `VOID: needs replacement` in the source.
S8 and S9 were re-derived to point at what CASE.md actually leaves open rather
than left empty, because both are machine-scored and an empty scorer breaks the
exercise; both are flagged in the source.

---

## 2. The raw material

### E.4 The seed gift

52 non-voting units at $38,500 = **$2,002,000**. A completed taxable gift,
reportable on Form 709, no annual exclusion available because a non-voting LLC
interest given to a discretionary trust with no Crummey powers is a future
interest (IRC 2503(b), **[M]**). Consumes $2,002,000 of the $15,000,000 basic
exclusion, leaving **$12,998,000**. A qualified appraisal is required for
adequate disclosure (Treas. Reg. 301.6501(c)-1(f), **[M]**), and no appraiser has
been engaged.

The 10% seed convention has **no statutory, regulatory or published-ruling
basis**. It comes from practitioner custom. The Service's contrary position
appeared in *Karmazin*, which settled and decided nothing (CASE.md I.5, **[H]**).

### E.5 The installment sale

520 non-voting units at $38,500 = **$20,020,000**, for a demand note. Seed is
exactly 10.00% of the note. The trust holds 572 of 900 non-voting units after
closing, being 57.2% of the LLC. No gain is recognised: Rev. Rul. 85-13
disregards a sale between a grantor and a trust he or she is treated as owning
**[H]**.

### E.6 The demand note

| Term | Provision |
|---|---|
| Principal | $20,020,000 |
| Maturity | **Payable in full on demand by the holder** |
| Rate | 3.82%, the 2026 blended annual rate |
| Payment | Interest only, annually in arrears on 31 December |
| Security | **None.** Unsecured, no pledge of units, no guarantee |
| Annual interest | **$764,764** |
| Interest removed per $1,000,000 of principal called | **$38,200 per year** |
| Estate treatment | Includible in Meg's gross estate at fair market value, IRC 2033 **[H]** |

### E.7 The serial acquisition

The trust applies dividends above note interest to buy Meg's remaining 328 units
in annual tranches, reaching all 900 by the end of year 5 for **$12,628,000** of
cash. Total consideration to Meg for the 900 units is $20,020,000 of note plus
$12,628,000 of cash = **$32,648,000** against $49,500,000 of pro-rata value.

**The assumptions the memorandum states:** CPC value constant at $55,000,000;
dividend constant at $5,000,000; discount constant at 30%; unit price constant at
$38,500; note principal not called; purchases made annually on 31 December.

**The assumption it does not address, and this is the one that matters for a
recurring question:** *each tranche in practice requires a contemporaneous
appraisal, and the price will differ.* CASE.md states this in terms and then
stops. Five annual purchases means five valuation events, each of which can move
the unit price, the number of units the same cash buys, and therefore the whole
schedule. Nothing in the file resolves it.

### E.8 The burn

While IRC 675(4)(C) status holds, Meg reports **100% of the LLC's income**
regardless of which units the trust holds. The tax she pays on the trust's share
is a transfer of value to the trust that **consumes no gift-tax exemption and is
not a gift** (Rev. Rul. 2004-64, **[H]**). It is the mechanism, not a cost.

| Year | Trust units | Trust's dividend share | The burn |
|---|---|---|---|
| 1 | 572.00 | $2,860,000 | $822,250 |
| 2 | 626.42 | $3,132,109 | $900,481 |
| 3 | 687.91 | $3,439,556 | $988,872 |
| 4 | 757.39 | $3,786,931 | $1,088,743 |
| 5 | 835.88 | $4,179,421 | $1,201,583 |
| 6+ | 900.00 | $4,500,000 | **$1,293,750 per year** |

Cumulative: $5,001,930 by year 5, $11,470,680 by year 10, $24,408,180 by year 20,
**$30,876,930 by year 25** when Meg is 89.

### B.4, D.1, D.2, D.3 The cash the structure runs on

CPC pays **$5,000,000 a year** in dividends, quarterly, a policy adopted in 2016
to service a purchase note satisfied on 1 July 2025 and **not revisited since**.
Yield on the $55,000,000 indicated value is 9.09%. The dividends are qualified
(IRC 1(h)(11), **[H]**) and are not deductible to CPC.

Household income totals **$5,644,790**: the dividend, Meg's $450,000 W-2,
$52,000 of brokerage income, $41,000 of T-bill interest (exempt from Illinois
income tax, 35 ILCS 5/203(a)(2)(N), **[M]**), $58,500 of cash and money market,
and the $43,290 inherited-IRA RMD.

Outgoings: living expenses $600,000, charitable $80,000, property tax $38,000,
debt service $0.

Rates: qualified dividends **28.75%** all-in, ordinary income **41.95%** all-in.
Tax on the dividend stream alone is **$1,437,500 a year**. Meg's W-2 nets about
$250,650, leaving a **$349,350 household gap** funded from the dividend stream.

### H.3 and H.4 The rate question

The memorandum uses **3.82%**, the 2026 blended annual rate under IRC
7872(e)(2)(A) (Rev. Rul. 2026-12 Table 6, **[H]**). The competing regime is IRC
1274, which governs debt issued **for property** and tests adequate stated
interest against the AFR for the note's term. A demand note has no stated term
and the statute supplies no term convention for one. Treated as short-term the
rate would be **4.10%**.

**The difference on $20,020,000 is $56,056 of annual interest**: $820,820 against
$764,764. CASE.md marks this `[UNVERIFIED, needs source]` for a controlling
authority and says in terms: **do not state a resolution in any teaching material
without one.**

### C.3 The two retirement clocks

Meg's own IRA is $3,000,000. Her applicable age is **75** under IRC
401(a)(9)(C)(v) as amended by SECURE 2.0 s107; first distribution year **2037**,
RBD 1 April 2038 **[M]**.

The inherited IRA is $1,000,000, from Walter Hensley who died 4 November 2021
**after his required beginning date**. It runs a **separate ten-year clock to 31
December 2031**, and because he died after his RBD the "at least as rapidly" rule
requires **annual RMDs in years 1 through 9** as well (Treas. Reg.
1.401(a)(9)-5(d), final regulations, **[M]**). Distributions are ordinary income
at 41.95% with no NIIT (IRC 1411(c)(5), **[H]**).

RMDs on a static balance: 2026 $43,290, 2027 $45,249, 2028 $47,393, 2029
$49,751, 2030 $52,356, and in 2031 the entire remaining balance.

**The two clocks do not overlap.** The inherited IRA empties in 2031; Meg's own
does not start until 2037. There is a six-year window between them.

### H.6.2 The Illinois exposure, now in scope

| Parameter | Value | Authority |
|---|---|---|
| Exclusion | **$4,000,000**, a threshold and not a credit | 35 ILCS 405/2 **[H]** |
| Indexed | **No** | **[H]** |
| Portable | **No.** Unused exclusion at the first death is permanently lost | **[H]** |
| State QTIP | Available, and **may be elected independently of the federal election** | 35 ILCS 405/2(b-1) **[H]** |
| Rate | Graduated from the pre-EGTRRA state death tax credit table, top **16%** | **[M]** |
| Adjusted taxable gifts | **Added back** in testing the threshold, so the $2,002,000 seed gift counts | Illinois AG fact sheet **[M, verify at the primary]** |
| Pending | HB 2601 (2025) proposed $8,000,000. **Not enacted.** $4,000,000 is operative | **[M]** |

The 2011 joint revocable trust carries a credit-shelter formula written for a
$5,000,000 federal exclusion and **contains no Illinois QTIP direction** (F.2).
CASE.md A.6 records that neither spouse has engaged with any of this.

---

## 3. The arithmetic of the annual decision

Recomputed in Node from `scripts/case-facts.json`, which is generated from
CASE.md. Every line reconciles with Part M.

### Years 1 to 6, on CASE.md's own accounting

Per-unit annual dividend is $5,000,000 / 1,000 units = **$5,000**.

| Year | Meg's units | Pro-rata distribution | Note interest | Tranche proceeds | **Total in** | Tax | Household gap | **Net** |
|---|---|---|---|---|---|---|---|---|
| 1 | 428.00 | $2,140,000 | $764,764 | $2,095,236 | **$5,000,000** | $1,437,500 | $349,350 | **+$3,213,150** |
| 2 | 373.58 | $1,867,891 | $764,764 | $2,367,345 | **$5,000,000** | $1,437,500 | $349,350 | **+$3,213,150** |
| 3 | 312.09 | $1,560,444 | $764,764 | $2,674,792 | **$5,000,000** | $1,437,500 | $349,350 | **+$3,213,150** |
| 4 | 242.61 | $1,213,069 | $764,764 | $3,022,167 | **$5,000,000** | $1,437,500 | $349,350 | **+$3,213,150** |
| 5 | 164.12 | $820,579 | $764,764 | $2,468,460 | $4,053,803 | $1,437,500 | $349,350 | **+$2,266,953** |
| **6+** | **100.00** | **$500,000** | **$764,764** | **none** | **$1,264,764** | $1,437,500 | $349,350 | **-$522,086** |

The LLC distributes **pro rata**, so in years 1 through 4 the entire $5,000,000
round-trips to Meg: her own 428 units draw $2,140,000 directly, and the trust
passes its whole $2,860,000 straight back as interest plus tranche proceeds,
retaining nothing. The trust first retains cash in year 5, when only $2,468,460
of its $3,414,657 is needed, leaving $946,197 unapplied.

### Steady state, on a full accounting of D.1 and D.2

CASE.md's $522,086 figure compares only the LLC flows against the dividend tax
and the household gap. It is correct on its own terms and it is narrower than
Meg's actual position. The fuller picture:

| | Amount |
|---|---|
| **In** | |
| LLC pro-rata on 100 voting units | $500,000 |
| Demand-note interest (cash, but not taxable income while grantor status holds) | $764,764 |
| W-2 gross | $450,000 |
| Brokerage dividends and interest | $52,000 |
| T-bill interest | $41,000 |
| Cash and money market | $58,500 |
| **Total in** | **$1,866,264** |
| **Out** | |
| Income tax on 100% of LLC income | $1,437,500 |
| Income tax on W-2, 37% + 4.95% + 2.35% Medicare | $199,350 |
| Income tax on T-bill interest, 37% federal, exempt from Illinois | $15,170 |
| Income tax on cash and money market, 41.95% | $24,541 |
| Income tax on brokerage income | $14,950 to $21,814 `[CASE.md D.1 gives no qualified/ordinary split]` |
| Living expenses | $600,000 |
| Charitable giving | $80,000 |
| Property tax | $38,000 |
| **Total out** | **$2,409,511 to $2,416,375** |
| **Net** | **-$543,247 to -$550,111** |

The inherited-IRA RMD is excluded because that account is empty after 2031, which
is before steady state begins.

### The hypothesis, tested

**Hypothesis put to this brief:** that Meg goes structurally cash-negative in
steady state while the structure performs exactly as designed.

**CONFIRMED.** On CASE.md's own accounting she is short **$522,086** a year from
year 6. On a full accounting of Part D she is short **$543,247 to $550,111**.
The crossover is exact and it is **year 6**, the first year after the tranches
complete: year 5 is the last positive year at +$2,266,953, and year 6 is the
first negative one.

The reason matters more than the number. Nothing has gone wrong. Every
assumption in the memorandum has held: the company is worth $55,000,000, the
dividend is $5,000,000, the discount is 30%, the units cost $38,500, the note has
not been called. **The shortfall is what the structure is for.** Meg has
transferred 90% of the units and kept the obligation to pay tax on 100% of the
income, and that obligation is exactly the mechanism moving value to the trust
without using exemption. A structure that left her cash-positive in steady state
would be transferring less.

### How long the note funds the gap

The demand feature is the designed answer. Calling principal converts a
$20,020,000 estate asset into spendable cash, and each $1,000,000 called
permanently removes $38,200 of future interest, so the gap widens by 3.82% of
every call. Calling exactly the gap each year:

| Structure year | Gap that year | Called | Note remaining |
|---|---|---|---|
| 6 | $522,086 | $522,086 | $19,497,914 |
| 7 | $542,030 | $542,030 | $18,955,884 |
| 8 | $562,735 | $562,735 | $18,393,149 |
| 9 | $584,232 | $584,232 | $17,808,917 |
| 10 | $606,549 | $606,549 | $17,202,368 |
| ... | | | |
| 28 | $1,191,035 | $1,191,035 | $1,317,206 |
| 29 | $1,236,533 | $1,236,533 | $80,674 |
| 30 | $1,283,768 | $80,674 (all that is left) | **$0** |

**The note funds the gap for 24 years and is exhausted in structure year 30**,
when Meg is 94 on CASE.md's own year-to-age convention at E.8 (year 25 is stated
as age 89). Total called: $20,020,000, the whole note.

That is the shape of the recurring decision. It is not "does the structure
work". It is "how much do I call this year, and what does calling it cost me
next year", asked every year for the rest of her life.

`[UNVERIFIED, needs source]` for whether a pattern of annual calls sized to the
grantor's living expenses bears on IRC 2036(a)(1). CASE.md does not raise it and
neither should any lesson without an authority.

---

## 4. The levers

Every management decision the structure exposes, from CASE.md only.

| Lever | CASE.md section | What it changes | What it costs |
|---|---|---|---|
| **Call the note, or do not** | E.6, E.7 | Converts note principal into spendable cash at par. The only designed source of liquidity once tranches end. | Permanently removes $38,200 of annual interest per $1,000,000 called, widening next year's gap by 3.82% of the call. Exhausts in structure year 30 if used to cover the gap exactly. Also removes an estate asset at par, which is the point. |
| **Turn grantor status off** | E.3, E.8 | The trust becomes a separate taxpayer. Meg stops paying tax on the trust's income, removing $1,293,750 a year of outflow at steady state and turning her cash position positive. | **Stops the burn.** The transfer engine switches off: no more exemption-free value moves to the trust. The rate cost is small, not a bracket jump: the trust pays the same 23.8% federal on qualified dividends, and Illinois 4.95% plus the 1.5% replacement tax on trusts = 6.45% against Meg's 4.95%, so **about 1.5 percentage points [M, replacement rate needs verification]**. The toggle-off mechanism is **not drafted** (E.3). |
| **Timing and pricing of each annual tranche** | E.7 | Five separate purchase events over five years, each moving how many units the trust's excess cash buys. | The memorandum assumes a constant $38,500. In practice **each tranche requires a contemporaneous appraisal and the price will differ**, and CASE.md says the memorandum does not address this. A higher price buys fewer units and lengthens the schedule; a lower one raises the transferred value and the audit exposure. |
| **The dividend rate** | B.4 | $5,000,000 a year is the input every other number depends on. The policy was adopted in 2016 to service a note satisfied in 2025 and **has not been revisited**. | Cutting it starves the tranche schedule and the note interest; raising it accelerates transfer but increases the burn and the combined 21% + 23.8% cost on distributed earnings. Nothing in the file says who decides, and Meg controls the vote. |
| **Which rate regime governs the note** | H.3, H.4 | 3.82% under 7872 or 4.10% under 1274. | **$56,056 a year** on $20,020,000, and cumulatively material to how much appreciation is shifted. **Genuinely unresolved; CASE.md forbids stating a resolution.** |
| **Whether distributions stay discretionary** | E.1, I.5 | The draft operating agreement makes distributions discretionary with the manager, who is Meg. | *Mirowski* was taxpayer-favourable on **mandatory** distributions. Discretionary distributions plus retained voting control is the 2036(a)(2) exposure CASE.md calls "the principal open exposure in this structure" (I.1). Open. |
| **Whether to add a tax-reimbursement clause** | E.3, I.3 | Would let the trustee reimburse Meg for the burn, relieving the cash gap. | Rev. Rul. 2004-64: a **discretionary** clause does not cause estate inclusion; a **mandatory** one does. State creditor law may still reach the assets. **Not drafted.** |
| **The Illinois QTIP election** | H.6.2, F.2 | Available and electable independently of the federal election. | The 2011 documents contain no Illinois direction, and the exclusion is not portable, so unused exclusion at the first death is permanently lost. |
| **Sequencing against the two IRA clocks** | C.3 | The inherited IRA must empty by 31 December 2031; Meg's own does not begin until 2037. | Six years of window between them, at 41.95% on every dollar. Interacts with any year in which a call, a sale or a large tranche lands. |

---

## 5. Three candidate spine questions

Each is one sentence, each is genuinely unresolved by CASE.md, and each recurs
rather than resolving once.

### Candidate A, ranked first

> **How much of the note should Meg call this year, and what does calling it cost
> her in every year after?**

**Why it is unresolved.** CASE.md computes the gap and states that the demand
feature is the memorandum's answer to it. It draws no conclusion about how much
to call, when, or whether calling at all is wise. The 2036(a)(1) question about a
pattern of calls sized to living expenses is not raised anywhere in the file.

**Why it recurs.** It is asked every year for the rest of Meg's life, and the
answer changes every year because each call widens the next year's gap.

**Sockets it fills:** S1, S3, S4, S6, S7 directly. S8's rubric line already
rewards naming an open question about timing. S9 needs a different item.

| Session | What it asks students to do |
|---|---|
| 0.1 | Which configuration you use to model a multi-year call schedule determines where the client's cash-flow data lands. Model choice against a recurring numeric task. |
| 1 | The call schedule is exactly the arithmetic a language model gets confidently wrong: a long compounding sequence. Ask for it, then check it. |
| 2 | Write the prompt that explains to a 64-year-old why the structure leaves her short every year and why that is the design working. |
| 3 | The decision has to be documented. What did she decide, on what evidence, and what did you tell her it would cost next year? |
| 4 | The call schedule is a live, unfiled position on a valuation. It is a landmine, and its audit trail is the artifact. |

### Candidate B, ranked second

> **Each annual tranche needs its own appraisal at its own price, so what happens
> to this schedule when the price is not $38,500?**

**Why it is unresolved.** CASE.md states in terms that each tranche requires a
contemporaneous appraisal and the price will differ, and that the memorandum does
not address this. It offers no alternative schedule.

**Why it recurs.** Five tranches, five valuation events, and the question is live
at each one.

**Sockets it fills:** S1, S2, S5, S6, S9 well. It is weaker at S3 and S7 because
it stops mattering after year 5.

**The reason it ranks second:** it expires. A recurring question that resolves
itself at the end of year 5 cannot carry a course whose case runs to Meg's age 94.

### Candidate C, ranked third

> **Meg is short every year from year 6 while everything works as designed, so
> which lever does she pull, and which does she refuse to pull?**

**Why it is unresolved.** CASE.md computes the shortfall and lists the levers
without ranking them or drawing any conclusion about the structure's wisdom.

**Why it recurs.** The levers interact, and pulling one changes what the others
cost.

**Sockets it fills:** all nine, and it is the broadest of the three.

**The reason it ranks third despite that:** it is close to asking "does the
structure work", which is precisely the conclusion CASE.md refuses to draw and
which no lesson may answer. It invites a verdict. Candidate A asks the same
underlying question in a form that has a number attached and no verdict at the
end of it.

### Ranking, and why

**A, then B, then C.** A wins on three criteria at once. It is arithmetically
concrete, so every session can put a number on it and check the number. It never
resolves, so it survives to the end of the case. And it cannot be answered by
accident, because CASE.md supplies the gap and the interest-reduction rate but no
authority on the 2036(a)(1) question and no recommendation. B is the sharpest
teaching content but expires at year 5. C is the most complete but leans toward a
verdict the master will not supply.

**A composite is available and is not recommended without a decision:** run A as
the spine and use B as session 3's local case, since session 3's subject is
documentation and each tranche appraisal is a document. That is a second decision
and is flagged rather than assumed.

---

## 6. What does not fit

**Session 0.1, The Control Surface.** Its subject is model configuration: which
model, which effort setting, which context blocks, what persists. None of the
three candidates has a natural home in it. The old spine did not fit either; S3
shows the seam, where the closer had to say the question "acquired a second edge"
to connect at all. Forcing candidate A into it produces the same seam. **The
honest options are to give 0.1 a single closing pointer that names the recurring
question without pretending the session advanced it, or to accept that the 0.x
series sits outside the spine.** Recommend the latter and say so on the page.

**Session 1, sections A1 through A5.** The appendix is n-grams, curve fitting,
embedding geometry and the sampler. It is mechanism, deliberately, and no case
question belongs in it. A1 through A5 should stay outside the spine.

**Session 4's watermarking appendix, D1 and D2.** Provenance and SynthID are
about content authenticity, not about the household. The existing link, that the
lowest-entropy outputs are the ones where fabrication does most damage and are
the least watermarkable, is already the right connection and does not need a
spine question on top of it.

Everywhere else the fit is natural: sessions 2, 3 and 4 all handle the case
directly, and the retrieval bridges in 2, 3 and 4 are available if the instructor
wants the spine restated at the top of each session, which the old one never did.

---

## What this brief does not do

It does not answer the spine question, and neither may any lesson. CASE.md draws
no conclusion about whether the structure is advisable, will succeed, or should
be changed, and Part K's deletion of the old question was not an invitation to
supply a better answer. It was an instruction to supply a better question.

The three candidates above are candidates. None is implemented. The `VOID: needs
replacement` markers stay in the source until the instructor picks one.
