# Probe captures for Session 0.1

> **Superseded by CASE.md v4.0 (2026-08-23).** Every capture in this file was
> run before the v4.0 rebuild and models the pre-v4.0 fact set: an Ohio domicile
> with no state estate tax, a smaller balance sheet, and unit and seed figures
> that no longer exist. Under v4.0 the Coles are lifelong Illinois residents, the
> company is in Rockford, and Illinois taxes estates above $4,000,000 with no
> portability, which changes the direction of the state-tax rows below. The
> captures are **left verbatim on purpose**: editing a transcript would make it a
> fabrication (pedagogy.md s1 R1 and R5). Re-run them against v4.0 before any
> figure here is taught, and do not read the parameter tables as current case
> facts.
P1: factual, cutoff-sensitive (Cole rate lookup)
Settings: Sonnet 5, effort medium, web search OFF, thinking off
Date run: 2026-08-22
Prompt sent:
What is the current Section 7520 rate and Applicable Federal Rate (AFR) for midterm transactions relevant to structuring an installment sale or grantor trust transaction for a household this month?
Output received (verbatim):
No web search tool is connected in this session — I can't independently verify the current published rate.

Ran a command

The IRS AFR listing on this page loads dynamically (AJAX/views block), so I got the shell page, not the rate table. Let me pull the actual Revenue Ruling PDF directly instead.

Ran 2 commands

That endpoint returned a redirect with no body. I don't have a working live-search path in this session, and my training data cutoff (Jan 2026) is stale for an August 2026 rate that changes monthly — quoting from memory would violate the zero-unbacked-claims standard.

Bottom line: I cannot verify the August 2026 §7520 rate or the AFR mid-term rate right now — no web search tool is connected in this chat, and the IRS site requires JS-rendered content my fetch can't pull.

Two ways to close this out:

Enable web search for this conversation (toggle in the message composer / settings) — one query gets me the exact Rev. Rul. citation, the §7520 rate, and AFR short/mid/long-term (annual + semiannual + monthly compounding) for August 2026, with the IRS.gov source linked.
Direct source, no tool needed: irs.gov/applicable-federal-rates — the current month's Revenue Ruling is always posted there; search engines/Bloomberg Tax also mirror it same-day.

For context on the mechanics (not rate-specific, so this part is reliable): the §7520 rate — used for GRATs, QPRTs, CRTs, and CLATs — is 120% of the mid-term AFR (annual compounding), rounded to the nearest 0.2%, published monthly under IRC §7520(a)(2). The mid-term AFR itself (2–9 year instruments, e.g., installment sale notes or intra-family loans funding a grantor trust) is unbundled by compounding frequency — annual, semiannual, quarterly, monthly — and you'd want the compounding that matches your note terms.

Given the planning stakes (GRAT/installment sale sizing is rate-sensitive at the margin), want me to run this the moment you enable search, or do you have this month's Rev. Rul. number already and just want me to build out the structuring analysis around it?

P1b: same prompt, web search ON
Settings: Sonnet 5, effort medium, web search ON
Date run: 2026-08-22
Prompt sent:
What is the current Section 7520 rate and Applicable Federal Rate (AFR) for midterm transactions relevant to structuring an installment sale or grantor trust transaction for a household this month?
Output received (verbatim):
August 2026 rates (Rev. Rul. 2026-13, IRS):

Rate	Annual	Semiannual	Monthly
§7520 rate	5.20%	—	—
Mid-term AFR (100%)	4.35%	4.30%	4.26%
Short-term AFR (100%)	4.10%	4.06%	4.03%
Long-term AFR (100%)	4.92%	4.86%	4.81%

Source: Rev. Rul. 2026-13, mid-term AFR annual compounding 4.35%, semiannual 4.30%, monthly 4.26%; §7520 rate for August 2026 is 5.20%. This is unchanged from July — the August 2026 Section 7520 rate is 5.20%, the same as July, while the short-term AFR rose to 4.10% from 4.00%. Confidence: high, primary source (IRS Revenue Ruling). 
IRS
Mondaq

Application notes for your two structures:

GRAT (uses §7520 = 5.20%): This is a headwind relative to the 4.6%–5.0% range that prevailed for most of 2025–early 2026. Higher §7520 rate raises the hurdle the trust assets must beat to pass value to remaindermen — zeroing out requires higher assumed annuity payout %. All else equal, a rolling short-term GRAT strategy is less penalized by rate moves than a single long-term GRAT, since you re-lock the rate more frequently.
Installment sale to IDGT [Intentionally Defective Grantor Trust]: Use the mid-term AFR (4.35% annual / 4.26% monthly), not §7520, since a note with a duration of 3–9 years falls in the mid-term bucket. The 3-to-9-year mid-term rate for use with a sale to a defective grantor trust or intra-family loan is what governs minimum note interest to avoid imputed gift treatment under §7872/§1274. Compounding frequency matters — match the column to how the note actually compounds (monthly note → use 4.26%, not 4.35%). 
Mondaq

Flag: §7520 = 5.20% is a floor-rounded 120% of mid-term AFR — by statute the §7520 rate equals 120% of the mid-term AFR (annual compounding), rounded to the nearest two-tenths of one percent, so it's mechanically derived, not independently set. If you're comparing this month against a decision window, note the rate has been flat at 5.20% for two consecutive months (July, August), which reduces the "wait for a better print" argument on GRAT timing — no meaningful drift to exploit right now. 
USTaxTools

One flaw worth surfacing: I did not independently verify whether your household's note/trust document already specifies a fixed compounding convention (monthly vs. annual) — that choice changes which column applies by up to 9bps on the mid-term AFR, which compounds materially over a 9-year note on a large principal. Confirm before drafting.

P2: generative, personalization-sensitive (Cole meeting email)
Settings: Sonnet 5, effort medium, thinking off, instructions ON
Date run: 2026-08-22
Prompt sent:
Draft a concise, professional follow-up email to David and Sarah Cole summarizing our initial planning meeting regarding their business transition, estate liquidity objectives, and next steps for their advisory team.
Output received (verbatim):
(First run Claude rejected request due to client sensitive info - prompt was adapted slightly): Subject: Following Up — Business Transition & Liquidity Planning Discussion

Dear David and Sarah,

Thank you for the time you both gave this week to walk through the transition planning for the business and its implications for your broader estate. It was a productive first session, and I want to summarize where we landed and what comes next.

What we covered:

Your near-term objectives around transitioning ownership of the business, including timeline flexibility and the outcomes that matter most to you
The liquidity gap between your estate's current structure and what a transition (or an estate settlement absent one) would require
Preliminary discussion of a sale structure using an intentionally defective grantor trust (IDGT), including how a note-based sale could address both the liquidity question and the valuation discount opportunity — at a high level; we have not yet run the numbers

What I flagged as open:

We need a current business valuation before any note terms, discount rate, or gift/sale split can be modeled with confidence
The installment note rate assumption should be benchmarked against the applicable federal rate at time of execution, not today's rate
I want to loop in your estate attorney before we go further, since the trust mechanics interact directly with your existing documents

Next steps:

My team will request the valuation engagement letter this week
I'll draft a preliminary liquidity model reflecting two or three structuring scenarios
We'll schedule a follow-up once your attorney has reviewed the trust framework — target three weeks out

Please let me know if I've mischaracterized anything above, or if there's a detail from our conversation you'd like added before I circulate this internally.

Best regards,

P3: analytical, effort-sensitive (Cole options compare)
Settings: Opus 5, effort high, thinking on (forced)
Date run: 2026-08-22
Prompt sent:
Provide a structured comparative analysis of structuring the Cole family transition via an Intentionally Defective Grantor Trust (IDGT) sale versus an outright installment sale, evaluating gift tax exposure, basis adjustment at death, and income tax flow-through mechanics.
Output received, **with the Ohio-to-Illinois corrections listed below applied on
2026-08-23 and marked inline**. Everything else is byte-identical to the capture.
This block is therefore no longer wholly verbatim, and the label says so rather
than the document claiming a fidelity it no longer has (pedagogy.md s1 R1, R5).

**Corrections applied, and only these:**
1. `Ohio estate tax | None (repealed eff. 2013)` replaced with the Illinois
   position. This is an inversion, not a substitution: Ohio imposed no estate
   tax, Illinois taxes estates above $4,000,000 and the exclusion is neither
   indexed nor portable.
2. `Ohio individual income tax | [UNVERIFIED]` replaced with the Illinois flat
   rate, which is known.
3. The sensitivity row naming Ohio income tax renamed to Illinois.
4. The second-death sensitivity row, which assumed portability, corrected:
   Illinois has none.
5. `[SUPERSEDED BY ILLINOIS]` markers added to the two conclusions that the
   Ohio-to-Illinois inversion invalidates. The marker names the fact that
   replaced the old one rather than only recording that something changed. **The model was not re-run and the numbers were not
   recomputed**, because doing so would be fabricating an output no model
   produced. Re-run P3 against v4.0 before teaching any figure in sections 0, 5
   or 6.

# Cole Family Transition — IDGT Sale vs. Outright Installment Sale

**Comparative structural analysis · 2026-08-22**
**Synthetic case. The Cole household is a fabricated teaching case; no facts describe a real client.**

---

## 0. Headline finding

> `[SUPERSEDED BY ILLINOIS, 2026-08-23]` **This finding was computed with no state
> estate tax, which was true of Ohio and is false of Illinois.** Illinois taxes the estate
> above $4,000,000 with no portability, which adds a state-level benefit to
> lifetime transfer that this model excludes entirely and which moves the
> crossover toward the IDGT by an amount not computed here. The figures below
> are the capture's own and are **not** re-derived. Re-run P3 before teaching any
> of them.


Modeled on the Cole facts below, over a 15-year horizon, total federal transfer + income tax at the family level:

| Rank | Structure | Estate tax | Income tax | **Total** | vs. baseline |
|---|---|---|---|---|---|
| 1 | **Retain and step up** (no freeze) | $3.06M | $0 | **$3.06M** | — |
| 2 | **IDGT sale** | $0 | $7.59M | **$7.59M** | +$4.53M |
| 3 | **Outright installment sale** | $0 | $9.09M | **$9.09M** | +$6.03M |

Between the two structures actually asked about, the IDGT sale wins by **$1.50M**, almost entirely because the §453A(c) interest charge and the seller-side installment gain do not exist in a Rev. Rul. 85-13 transaction. But both are dominated by simply holding the asset until death.

**Crossover.** The IDGT sale only beats retention once the gross estate at death reaches approximately **$62M** (see §5). Below that, the §1014 basis forgone under Rev. Rul. 2023-2 exceeds the estate tax avoided. Confidence: **H** on the direction; **M** on the specific crossover figure, which is a function of the assumptions in §1 and moves materially with the basis fraction and the heirs' holding period.

**Recommendation.** Do not freeze the whole interest. Size any IDGT sale to the *projected excess over the indexed exclusion*, not to the business. On these facts that is a partial sale of roughly $4–6M of discounted interest, leaving the balance to receive §1014 treatment. Full-freeze structuring at this net worth is a solution to a 2017–2025 problem that OBBBA removed.

---

## 1. Case parameters and assumptions

Every figure below is an assumption of the model, not a fact about the case. Flagged where verification is required.

| Input | Value | Source / confidence |
|---|---|---|
| Combined gross estate, today | $30.0M | Case definition |
| Closely held interest, discounted FMV | $12.0M | Case definition |
| Adjusted basis in that interest | $1.2M (10% of FMV) | Case definition — founder basis |
| Other assets, net of spending | $18.0M held flat | Assumption. **Confidence: L** |
| Business growth | 7.0% nominal | Assumption. **Confidence: L** |
| Exclusion indexation | 2.5% annually | Assumption; OBBBA indexes after 2026. **Confidence: M** |
| Horizon to first death | 15 years | Assumption |
| 2026 basic exclusion amount | $15.0M / person; $30.0M couple | IRC §2010(c)(3) as amended by P.L. 119-21 §70106. **Confidence: H** |
| Top federal estate/gift/GST rate | 40% | IRC §2001(c). **Confidence: H** |
| Illinois estate tax `[ILLINOIS, replacing Ohio, 2026-08-23]` | Applies above a **$4,000,000** exclusion that is **not indexed and not portable**; adjusted taxable gifts are added back in testing the threshold; graduated to a top rate of 16% | 35 ILCS 405/2, 405/2(b-1). **Confidence: H** on the exclusion, portability and QTIP election; **M** on the rate table and the add-back |
| Long-term AFR, August 2026 | 4.92% (annual) | Rev. Rul. 2026-13, Table 1. **Confidence: H** |
| Mid-term AFR, August 2026 | 4.35% (annual) | Rev. Rul. 2026-13, Table 1. **Confidence: H** |
| §7520 rate, August 2026 | 5.20% | 120% × mid-term AFR, IRC §7520(a)(2). **Confidence: H** |
| Federal LTCG + NIIT | 23.8% | IRC §1(h), §1411. **Confidence: H** |
| Illinois individual income tax `[ILLINOIS, replacing Ohio, 2026-08-23]` | **4.95% flat**, no preferential rate for capital gains or dividends, no itemized deductions | 35 ILCS 5/201(b)(14). **Confidence: H**. Excluded from the base model; see §7 Flag 3 |
| §6621(a)(2) underpayment rate for §453A charge | **[UNVERIFIED — confirm current quarterly rate]** | Modeled at 7.0% for illustration only |

**Derived terminal values at year 15:**
- Business: $12.0M × 1.07^15 = **$33.11M**
- Indexed combined exclusion: $30.0M × 1.025^15 = **$43.45M**
- Gross estate, no planning: $33.11M + $18.0M = **$51.11M**
- Taxable excess: $51.11M − $43.45M = $7.66M → estate tax **$3.06M**

---

## 2. Axis 1 — Gift tax exposure

| Element | IDGT sale | Outright installment sale |
|---|---|---|
| **Seed gift** | Required as a practical matter. Conventionally 10% of the note face — here $1.2M — consuming exclusion and requiring a Form 709 | None |
| **Statutory basis for the 10% seed** | **None.** There is no Code section, regulation, ruling, or holding requiring a 10% equity cushion. It is a practitioner convention borrowed loosely from debt-versus-equity thin-capitalization analysis | n/a |
| **Sale portion** | Not a gift if the note bears adequate interest and the interest is valued correctly | Same |
| **Valuation shortfall** | Any excess of transferred FMV over note face is a gift; defined-value or formula clauses are the standard mitigant | Identical exposure |
| **§2702 exposure** | The note must be genuine debt, not a retained equity interest. If recharacterized, §2702 values the retained interest at zero and the entire transfer becomes a gift | Lower — the counterparty is not a trust, so the §2702 "transfer in trust" predicate is generally absent |
| **§2036 exposure** | Real, and the live litigation risk. An implied agreement of retained enjoyment, or a transfer failing the bona fide sale exception, pulls the underlying asset back at date-of-death value | Present but structurally cleaner |
| **Statute of limitations** | Adequate disclosure of the *sale* on Form 709 (Reg. §301.6501(c)-1(f)) starts the three-year clock even though the sale is not a gift. **Do this.** | Same technique available and equally underused |

**The load-bearing point.** Gift exposure on the sale leg is nearly identical between the two structures because it is a valuation question, not a structural one. The IDGT's distinct gift cost is the seed gift — $1.2M of exclusion on these facts. At a $30M combined exclusion against a $30M estate, that $1.2M is not scarce. This is the axis where the two structures differ *least*, and it is the axis practitioners spend the most time on.

**Authority hygiene — the planted-error surface.** The two cases most often cited for IDGT sale validity, *Estate of Woelbing* (T.C. Dkt. Nos. 30260-13, 30261-13) and *Estate of Davidson* (T.C. Dkt. No. 13748-13), **were both settled and neither produced a judicial holding.** They are frequently described in secondary sources — and by language models — as having "upheld" or "approved" IDGT sales. They did not. They approved nothing. A settlement is evidence about IRS litigating posture, not about law. Any output citing either as a holding is wrong on its face and is a clean, checkable failure for classroom use. Confidence: **H**.

---

## 3. Axis 2 — Basis adjustment at death

This is the decisive axis and the one the pre-2023 literature gets wrong.

| Asset | IDGT sale | Outright installment sale | Retain |
|---|---|---|---|
| **Business interest** | Carryover basis $1.2M. **No §1014 adjustment** — Rev. Rul. 2023-2 | Buyer's cost basis $12.0M, established at sale | §1014 step-up to $33.11M |
| **Note in the seller's estate** | Included at face $12.0M. No embedded gain — the sale was disregarded, so there is no deferred §453 gain sitting in the note | Included at face $12.0M and is **income in respect of a decedent** under §691(a)(4); §1014(c) denies any step-up. The $10.8M of deferred gain survives death and is taxed to the estate or heirs as collected | n/a |
| **Gain on a post-death sale of the business at $33.11M** | $31.91M × 23.8% = **$7.59M** | Buyer: $21.11M × 23.8% = $5.02M | $0 |
| **Deferred seller gain** | $0 | $10.8M × 23.8% = **$2.57M** as IRD | $0 |
| **§453A(c) interest charge** | $0 — no §453 obligation exists | Applies: face outstanding exceeds $5M under §453A(b)(2)(B). Applicable percentage = ($12.0M − $5.0M) ÷ $12.0M = **58.33%**. Deferred tax liability $10.8M × 23.8% = $2.57M; charged base $1.50M; ~$105K/yr, **nondeductible**, ≈ **$1.50M** over 15 years | $0 |
| **Total income tax** | **$7.59M** | **$9.09M** | **$0** |

**Rev. Rul. 2023-2 is the hinge.** <a id="rr2023-2"></a>The Service held that assets of an irrevocable grantor trust that are not includible in the grantor's gross estate do not fall within any of the seven categories of §1014(b), so §1014(a) does not apply — the trust retains its pre-death basis. The grantor may not have both grantor-trust income tax treatment and a fresh-start basis. Confidence: **H**.

**The unresolved question.** If the grantor dies with the note outstanding, does grantor-trust status terminating at death trigger gain recognition on the deemed part-gift/part-sale? *Madorin* (84 T.C. 667 (1985)) and Reg. §1.1001-2(c) Ex. 5 address termination **during life**. CCA 200923024 addressed lifetime termination and expressly declined to reach the death question. The ABA Tax Section's own treatment describes the deathtime outcome as unsettled and identifies part-gift/part-sale as one possible approach. **This is genuinely open law.** Confidence: **H** that it is unresolved; **L** on any predicted outcome. It should never be characterized as settled in either direction, and a model asserting a definitive answer here is producing a fabricated holding.

---

## 4. Axis 3 — Income tax flow-through mechanics

| Mechanic | IDGT sale | Outright installment sale |
|---|---|---|
| **Gain on the sale itself** | None. Rev. Rul. 85-13 treats the grantor as owner of the trust's assets, so the sale is a transaction with oneself and is disregarded | $10.8M gain, reported on the installment method under §453 as principal is received |
| **Interest on the note** | Not income to the seller and not deductible to the trust. It does not exist for income tax purposes | Interest income to seller under §1274/§483 at the AFR; ordinary rates |
| **Who pays tax on entity income** | **The grantor**, on 100% of the trust's share, regardless of distributions | **The buyer**, on their share |
| **Character of that payment** | Not a gift — Rev. Rul. 2004-64. The "tax burn" is a wealth transfer that does not consume exclusion | n/a |
| **Effect on the transferred asset** | The trust compounds pre-tax. This is the structure's single largest economic advantage in a high-exemption environment | The buyer's share is drained annually by their own tax, or the entity must distribute to cover it, which pulls value back out |
| **§453(e) related-party resale** | n/a | Buyer's disposition within 2 years accelerates the seller's remaining gain |
| **§453(g) / §1239** | n/a | If the interest is depreciable property in the transferee's hands, §453(g) denies installment treatment entirely and §1239 converts gain to ordinary. **Must be tested against the Cole entity's asset mix before the structure is priced.** Confidence: **M** on applicability; fact-dependent |
| **Hurdle rate** | Long-term AFR 4.92% (>9-year note), or mid-term 4.35% (3–9 years). Both below the §7520 rate of 5.20% that a GRAT would face | Identical AFR hurdle |

**Quantifying the burn.** Assume $900K/yr of taxable flow-through income allocable to the transferred interest, taxed to the grantor at a combined ~35%: $315K/yr, ~$4.73M nominal over 15 years, shifted out of the estate without consuming exclusion.

**And this is where the high-exemption environment bites.** That $4.73M shift is worth 40 cents on the dollar *only if the estate is above the exclusion.* On the Cole facts the IDGT estate is $30.0M against a $42.25M net indexed exclusion. **The burn's estate tax value is $0.** The single most-cited advantage of the IDGT sale contributes nothing here. Confidence: **H** on the mechanism; **M** on the $900K income figure, which is an assumption.

---

## 5. The crossover

> `[SUPERSEDED BY ILLINOIS, 2026-08-23]` The crossover arithmetic below prices the
> federal exclusion only. With Illinois taxing above $4,000,000 with no portability there
> is a second, much lower threshold the model never crosses into. The direction
> of the error is known: **it understates the case for lifetime transfer.** The
> magnitude is not computed here and must not be guessed.


Because the basis cost applies to the **entire** transferred value while the estate tax benefit applies only to the **excess over the exclusion**, the two do not scale together.

Set the IDGT indifferent to retention:

```
0.40 × (excess over exclusion)  =  0.238 × (terminal value − carryover basis)
0.40 × E                        =  0.238 × ($33.11M − $1.20M)
0.40 × E                        =  $7.59M
E                               =  $18.98M
```

Add the indexed exclusion: gross estate at death of **$43.45M + $18.98M ≈ $62.4M** before the IDGT sale breaks even against simply holding the interest. On the modeled 7% growth path the Cole estate reaches $51.11M — roughly $11M short of indifference.

**Sensitivities that move the crossover materially:**

| Variable | Direction | Magnitude |
|---|---|---|
| Heirs never sell the business | Strongly favors IDGT | The basis cost is deferred indefinitely and may never crystallize. This single assumption can invert the ranking |
| Higher basis in the interest | Favors IDGT | Crossover falls roughly linearly with the gain fraction |
| Illinois income tax included `[ILLINOIS, replacing Ohio, 2026-08-23]` | Favors retention | Raises the effective LTCG rate to 28.75%, raising the basis cost |
| Future exclusion reduction by Congress | Favors IDGT | OBBBA removed the sunset but not the possibility of amendment. **Confidence: L** on any probability estimate |
| Faster business growth | Favors IDGT | Widens the excess faster than it widens the basis gap, but only above the exclusion |
| Discount sustained on audit | Favors IDGT | A denied discount converts the shortfall into a taxable gift |
| Second death timing `[ILLINOIS has no portability, replacing the Ohio no-estate-tax assumption, 2026-08-23]` | **Strongly favors lifetime transfer** | Federal portability requires a timely Form 706. **Illinois has no portability at all**, so unused Illinois exclusion at the first death is permanently lost. That is a one-way ratchet the model does not price |

---

## 6. Verdicts

**Recommended — partial IDGT sale, sized to projected excess.** Sell only the portion of the interest projected to exceed the indexed exclusion, leaving the balance in the estate for §1014. Roughly $4–6M of discounted interest on these facts. Captures the burn and the appreciation shift on the dollars that would actually be taxed, preserves step-up on the dollars that would not. Confidence: **M** — the sizing depends on the growth and spending assumptions in §1, which are the weakest inputs in the model.

**Not recommended — full-value IDGT sale.** Costs $4.53M more than retention on the modeled path. Justifiable only if (a) the family is confident heirs will hold rather than sell, (b) meaningful non-tax objectives (creditor protection, GST leverage, governance) carry the decision independently, or (c) the projected estate substantially exceeds $62M. State which of these is doing the work; do not let the tax case carry a structure the tax case does not support.

**Not recommended — outright installment sale.** Dominated by the IDGT branch at every point on the modeled curve. It surrenders the burn, recognizes $10.8M of gain, incurs a $1.50M nondeductible §453A charge, and leaves an IRD note in the estate with no step-up. Its only structural advantages are the buyer's immediate cost basis and lower §2702/§2036 exposure — neither of which offsets a $1.50M cost differential against the IDGT and a $6.03M differential against retention. Consider it only where grantor-trust status is unavailable or unwanted.

**Not recommended — GRAT as a substitute.** The §7520 hurdle of 5.20% exceeds the 4.92% long-term AFR, mortality risk is unhedged, and GST allocation is impractical during the ETIP. Confidence: **H**.

---

## 7. Flags requiring verification before this appears on screen

| # | Flag | Severity | Action |
|---|---|---|---|
| 1 | **Woelbing and Davidson as holdings.** Both settled. Neither decided anything. Any lesson text, and any model output, describing them as approving IDGT sales is wrong | **Blocking** if it appears as instructional content; **valuable** if planted deliberately as the Session 2 citation failure | Confirm which role it plays in the session file |
| 2 | **Death with note outstanding.** Genuinely unresolved. Do not state an outcome | **Blocking** | Present as open; cite *Madorin*, Reg. §1.1001-2(c) Ex. 5, CCA 200923024 with their actual scope |
| 3 | **Ohio individual income tax rate and business income deduction, 2026.** Excluded from the base model | **High** | Verify before any Ohio-specific number is shown; it moves the crossover |
| 4 | **§6621(a)(2) underpayment rate.** Modeled at 7.0% for the §453A charge; not verified | **Medium** | Verify current quarterly rate or present §453A as a formula rather than a figure |
| 5 | **10% seed gift convention presented as a requirement.** It has no statutory or regulatory source | **Medium** | Teach it as convention; it is a second clean checkable error if a model asserts a rule |
| 6 | **§453(g)/§1239 applicability** depends on the Cole entity's asset mix, which the case does not currently specify | **Medium** | Either specify the asset mix in `CASE.md` or state the test without resolving it |
| 7 | **Rev. Rul. 2026-13 numbering.** One secondary source referenced Rev. Rul. 2026-12 for the same August 2026 rate table; the IRS document is rr-26-13 | **Low** | Cite the IRS PDF directly |

---

## 8. Sources

| Authority | Proposition | Status |
|---|---|---|
| IRC §2010(c)(3), as amended by P.L. 119-21 §70106 (OBBBA, signed 2025-07-04) | $15M basic exclusion for 2026, no sunset, indexed after 2026 | **H** — verified |
| IRC §2001(c) | 40% top transfer tax rate | **H** |
| Rev. Rul. 2026-13 (IRS, July 2026), Table 1 | August 2026 AFRs: short 4.10%, mid 4.35%, long 4.92%; §7520 5.20% | **H** — verified via IRS publication and two secondary sources |
| Rev. Rul. 85-13, 1985-1 C.B. 184 | Transactions between grantor and grantor trust disregarded for income tax | **H** |
| Rev. Rul. 2004-64, 2004-2 C.B. 7 | Grantor's payment of trust income tax is not a gift to the beneficiaries | **H** |
| Rev. Rul. 2023-2, 2023-16 I.R.B. 658 | No §1014 basis adjustment for irrevocable grantor trust assets outside the gross estate | **H** — verified |
| IRC §453A(b)(2)(B), §453A(c) | Interest charge on deferred tax where year-end installment obligations exceed $5M; nondeductible for individuals | **H** on the rule; **M** on the modeled rate |
| IRC §453(e), §453(g), §1239 | Related-party resale acceleration; installment method denied on depreciable property; ordinary character | **H** on the rules; **M** on applicability to Cole |
| IRC §691(a)(4), §1014(c) | Installment obligation is IRD; no step-up | **H** |
| IRC §2702; Reg. §25.2702-1 | Retained-interest valuation; note recharacterization risk | **H** on the rule |
| IRC §2036(a); *Estate of Powell*, 148 T.C. 392 (2017); *Estate of Cahill*, T.C. Memo 2018-84 | Retained enjoyment and bona fide sale exception in intra-family transactions | **M** — case cites not re-verified against the reporters this session |
| *Madorin v. Commissioner*, 84 T.C. 667 (1985); Reg. §1.1001-2(c) Ex. 5; CCA 200923024 | Lifetime termination of grantor trust status is a recognition event; death not addressed | **M** — CCA number not re-verified |
| *Estate of Woelbing*, T.C. Dkt. Nos. 30260-13, 30261-13; *Estate of Davidson*, T.C. Dkt. No. 13748-13 | **Settled. No holding.** | **M** on docket numbers; **H** on settlement status |
| Reg. §301.6501(c)-1(f) | Adequate disclosure starts the gift tax limitations period | **H** |
| ABA Tax Section, "Grantor Trust Gambits," *The Tax Lawyer* (Fall 2024) | Deathtime treatment of an outstanding note is unsettled; part-gift/part-sale as one approach | **M** — secondary; pagination not verified |

**Not tax or legal advice.** All figures are modeled from stated assumptions on a synthetic case.

P4: bare API, no product layers (Session 0.1 section 08, run 4)
Settings: Gemini 2.5 Flash via generativelanguage.googleapis.com, temperature 1.0, maxOutputTokens 700, no system instruction, no tools, no history
Date run: [UNVERIFIED: run this against a real key before the first delivery and paste the verbatim output here]
Prompt sent (byte-identical to P1, so the comparison against runs 1 and 2 is exact):
What is the current Section 7520 rate and Applicable Federal Rate (AFR) for midterm transactions relevant to structuring an installment sale or grantor trust transaction for a household this month?
Output received (verbatim):
[UNVERIFIED: not yet captured]

Why this run exists. P1 and P1b are the product with one control moved between
them. P4 is the same question with the product removed: no system prompt, no
profile instructions, no retrieval, no tools, no conversation. It is the
negative control for the five-layer frame in section 01. What to point at is
what is absent -- no citation, no as-of date, and no mechanism by which it could
know the rate is republished monthly. Run 2 had those because a control put them
there, not because that model is cleverer than this one.

Note on this capture. Unlike P1 through P3, run 4 renders live in the page when
a key is connected and is hidden entirely when one is not, so the lesson does
not depend on this capture the way section 08's runs 1 and 2 depend on theirs.
Capture it anyway: it is the reference the room compares their own live output
against, and it dates the behaviour.
