# CASE.md — The Cole Household

**Master fact set · Version 5.0 · 2026-12-31 (as-of date) · drafted 2026-10-11**

**Synthetic case.** No real person, employer, institution, account or document. Constructed for classroom use in BUS ADM X433.4, *AI Foundations for Financial Advisors*, UC Berkeley Extension. Every employer, firm, community, adviser, account and person named below is invented; any resemblance to a real one is coincidence and should be reported so the name can be changed. Public programs and statutes (the Illinois 529 program, Social Security, Medicare, the Internal Revenue Code) are real; every account in them here is synthetic.

**What this file is.** The complete, granular fact set a mainstream pre-retiree household would generate for its planner: family, goals, employment and plan features, balance sheet, cash flow, the 2026 tax parameters that bear on it, retirement and Social Security clocks, risk profile, insurance, estate documents and beneficiary designations, the aging parent, the documents on file with dates, and the retrieval corpus the Session 3 exercises rank. It is a reference to be consulted, not a lesson.

**What this file is not.** It contains **no analysis, no recommendation, and no conclusion** about how much the Coles should convert to Roth, when either should claim Social Security, or whether any document should be changed. Where a question is genuinely open, it is marked open. Nothing more.

**Relationship to the session files.** Each lesson carries a short extract, roughly one screen of facts, generated from this file by `scripts/build-case.mjs` and injected by `scripts/inject-case.mjs`. Never the reverse. The five case pages (`cases/case-1.html` to `case-5.html`) draw on the same injected block.

**Never the assignment substrate** (PEDAGOGY §5.5). Students build their own work on their own recurring tasks with their own synthetic data.

**Audience fit** (PEDAGOGY §5.3.7, §13.2 R9). Version 5.0 replaces the v4 household (a business owner selling a large company to a trust) with a household the least experienced student in the room could plausibly serve within a year: two W-2 earners in their late fifties, about $2,450,000 of investable assets, a mortgage, two children, and an aging parent. The planning questions it raises are the ones the Fall 2026 students brought to their own final projects: a risk profile, a new-client intake, a Roth conversion, a retirement income plan, annual-review notes to a CRM.

**Confidence labels.** Every external fact (a tax parameter, a benefit rule, a statutory figure) carries **[H]** verified against a fully read primary or first-party source in the build that dated this file, **[M]** confirmed from a primary-domain search excerpt or a fully read secondary source, or **[L]** weakly sourced. Unverifiable figures are marked `[UNVERIFIED — needs source]` rather than filled in. Household figures (balances, salaries, dates of birth) are synthetic by construction and carry no label.

**The unresolved question** (PEDAGOGY §5.2). One question runs through every session and no session answers it: *how much should the Coles convert to Roth, and in which years, between the day the second paycheck stops and the day required minimum distributions begin, given Medicare premiums that look back two years and a state that does not tax the conversion (§F.3, §E.2)?* Session 1 misses a fact at intake (§H.2, the stale beneficiary designation). Session 2 checks a client email whose citations include a wrong required-beginning age. Session 3 retrieves a 2024 memo (§O, D7) that contradicts a 2026 plan feature (§B.2). Session 4 asks what was logged and what was pseudonymized. Session 5 asks what breaks in the workflow when the model changes.

---

```yaml
case_id: cole-household
case_version: "5.0"
generated: 2026-10-11
as_of_date: 2026-12-31
tax_year_parameters: 2026
sentinel_open:  "<!-- CASE:BEGIN cole-household v5.0 -->"
sentinel_close: "<!-- CASE:END cole-household -->"
retired_versions: ["2.0", "2.1", "2.2", "3.0", "4.0"]
```

---

# PART A — FAMILY PROFILE

## A.1 Principals

| | Margaret "Meg" Cole | David Cole |
|---|---|---|
| Date of birth | 2 May 1968 | 9 August 1967 |
| Age at 2026-12-31 | 58 | 59 |
| Citizenship | U.S. citizen | U.S. citizen |
| Occupation | Nurse manager, medical-surgical unit, Northlake Regional Health System (a synthetic hospital system) | Senior mechanical engineer, Dunmore Industrial Equipment, Inc. (a synthetic mid-size manufacturer) |
| Years with employer | 14 (since 2012) | 17 (since 2009) |
| Planned retirement | Age 60, mid-2028 | Age 62, late 2029 |
| Social Security | Not claimed; not yet eligible (§F.1) | Not claimed; eligible for reduced benefits from September 2029 (§F.1) |
| Medicare | Eligible May 2033 (§F.1) | Eligible August 2032 (§F.1) |
| Health | No stated conditions | No stated conditions |
| Risk tolerance | Conservative (§G) | Moderately aggressive (§G) |
| Filing status | Married filing jointly, federal and Illinois (§E.3) | the same return |

Married **14 June 1997**, 29 years as of the as-of date. First marriage for both. No prenuptial or postnuptial agreement. No children from other relationships.

## A.2 Children

| | Emma Cole | Ryan Cole |
|---|---|---|
| Date of birth | 18 March 2005 | 27 October 2010 |
| Age | 21 | 16 |
| Status | Senior at a public university, graduating May 2027; has a job offer in Chicago starting August 2027 | High-school sophomore; college entry expected autumn 2029 |
| Support | About $18,000 a year from cash flow (tuition share and housing); her 529 was exhausted in 2025 | 529 plan, §C.2; no other dedicated savings |
| Dependency | Claimed as a dependent on the 2026 return (a full-time student under 24 at year-end, §E.1) | Claimed as a dependent (§E.1) |

## A.3 Aging parent: Ruth Alder

**Ruth Alder**, Meg's mother. Born **6 February 1943**, age 83. Widow of **Frank Alder**, who died **12 September 2019**. Illinois resident, lifelong.

- Lives in an independent-living apartment at **Maple Court Senior Living, Wheaton, Illinois** (a synthetic community) since **March 2023**. Monthly fee **$4,650**. Her residency agreement provides for transfer to the community's assisted-living wing at a base rate of **$7,900 a month** plus care-level charges (§O, D6).
- Meg holds Ruth's **Illinois statutory short-form power of attorney for property** (executed 8 June 2022) and her **power of attorney for health care** (same date). Meg's brother **Tom Alder**, 55, lives in Denver and is the successor agent under both.
- Ruth's assets: a traditional IRA of about **$190,000**, naming **Meg as sole primary beneficiary** (designation dated 14 April 2020; Tom is not named), and about **$110,000** in savings and certificates of deposit held payable on death to Meg and Tom equally. Her will (2019) leaves the residue equally to Meg and Tom. Total about **$300,000**.
- Ruth's income: Social Security survivor benefit **$2,180 a month**; a survivor annuity from Frank's municipal pension **$1,140 a month**; her 2026 required minimum distribution, **$10,847** (§F.6). Her living costs exceed her income by about **$1,000 a month**, drawn from savings.
- Ruth is **past her required beginning date**. If Meg inherits the IRA, Meg is a non-eligible designated beneficiary (an adult child more than ten years younger) and the ten-year rule with annual distributions applies (§F.6).
- In 2024 Ruth lent Tom **$25,000**, undocumented and unrepaid. Meg learned of it through the power of attorney in 2026; Ruth asked her not to raise it with Tom. See §J.

## A.4 Domicile and residency

**Illinois, lifelong, for both spouses.** No out-of-state real property, no second residence.

| Period | Residence |
|---|---|
| 1997 to 2009 | Rented, then a first home in Lisle, Illinois (sold 2009) |
| 2009 to present | Naperville, Illinois (DuPage County), the current residence, §C.2 |

**Consequence.** Illinois taxes income at a flat rate and does not tax most retirement income (§E.2). Illinois imposes an estate tax above a **$4,000,000** exclusion that is not indexed and not portable between spouses (§E.2, §H.4).

## A.5 Advisers of record

| Role | Firm | Engaged |
|---|---|---|
| Financial planner and investment adviser | *The student's firm*: the practice every lesson places the reader in. A planning engagement; the assets stay held direct at their custodians and plan recordkeepers, so the firm has no custody | January 2026 intake; the first annual review is the Session 3 meeting |
| Prior adviser | Harlan Beck, a sole practitioner who retired in 2025 and whose 2024 Roth conversion memo is on file (§O, D7) | 2016 to 2025 |
| Estate counsel | Whitfield Law Group, Naperville (drafted the 2011 documents) | 2011; not re-engaged |
| Tax preparer | Lindqvist Tax Associates, Naperville | 2014 |
| Insurance | *(none; group coverage through the employers and a 2010 term policy bought direct)* | none |

## A.6 Stated goals

Recorded at the January 2026 intake meeting, in the clients' own framing and stated order of priority.

1. **"Meg stops at 60, I stop at 62, and we do not run out."** David. Meg's target is mid-2028; David's is late 2029.
2. **"Travel while we are both well enough to enjoy it."** Meg. They want about **$15,000 a year** for travel in the first ten years of retirement.
3. **"Get both kids launched without debt on either side."** Emma graduates in 2027; Ryan starts college in 2029.
4. **"Be ready for Mom."** Meg. Ruth may need assisted living; Meg wants to know what it would cost the household if Ruth's savings run out.
5. **"Keep the house."** Both. The mortgage runs to 2037; they do not want to sell or downsize before then.
6. Unstated but implied by the file: neither has engaged with the stale beneficiary designation at §H.2, the 2011 estate documents at §H.1, or the tax character of their savings (70% pre-tax, §C.1).

---

# PART B — EMPLOYMENT, INCOME AND PLAN FEATURES

## B.1 Meg Cole

| Item | Fact |
|---|---|
| Employer | Northlake Regional Health System (synthetic), a not-for-profit hospital system |
| Role | Nurse manager, medical-surgical unit; 2012 to present |
| W-2 wages, 2026 | **$145,000** |
| Retirement plan | 403(b), pre-tax and Roth deferrals permitted (Roth option added 2024; Meg has not used it) |
| 2026 elective deferral | **$24,500** plus the age-50 catch-up of **$8,000**, all pre-tax, total **$32,500** (2026 limits, §E.1) |
| Employer contribution | 5% of pay, **$7,250** a year |
| Vesting | Fully vested |
| Group benefits | Family health coverage through David's plan (§B.2); group term life 1x salary, **$145,000**; long-term disability 60% of pay |
| 2025 FICA wages | $141,000 (below the §E.1 Roth catch-up wage threshold, so her 2026 catch-up may be pre-tax) |

## B.2 David Cole

| Item | Fact |
|---|---|
| Employer | Dunmore Industrial Equipment, Inc. (synthetic), a mid-size manufacturer of material-handling equipment, about 1,400 employees |
| Role | Senior mechanical engineer; 2009 to present |
| W-2 wages, 2026 | **$185,000** |
| Retirement plan | 401(k), summary plan description amended **1 January 2026** |
| Plan features (SPD) | Pre-tax and Roth deferrals permitted. **In-plan Roth conversion of pre-tax balances permitted since 1 January 2026** (the 2024 SPD did not allow it; §O, D3 and D7). After-tax (non-Roth) contributions not permitted. **Accepts rollover contributions from IRAs and other eligible plans.** Loans permitted. No in-service distribution of pre-tax money before age 59½ except hardship |
| 2026 elective deferral | **$24,500** pre-tax plus the age-50 catch-up of **$8,000**, which the plan must treat as Roth because his 2025 FICA wages exceeded the §E.1 threshold; total **$32,500** |
| Employer contribution | 4% match on deferrals, **$7,400** a year |
| Vesting | Fully vested |
| Group benefits | Family high-deductible health plan with a health savings account (§C.2); group term life **2x salary, $370,000**, ending at separation; long-term disability 60% of pay |
| Employee stock purchase plan | Participated 2010 to 2016; the shares sit in the joint brokerage account (§C.2); no longer participating |
| 2025 FICA wages | $180,000 |
| Confidential | In November 2026 David was told, in confidence, that his division is being evaluated for sale or consolidation in 2027 and that his position may be eliminated with a severance package. See §J |

## B.3 Household earned income

| Source | 2026 | Character |
|---|---|---|
| Meg W-2 | $145,000 | Wages |
| David W-2 | $185,000 | Wages |
| **Total wages** | **$330,000** | |

---

# PART C — BALANCE SHEET

**As of 31 December 2026.**

## C.1 Summary

| Asset | Owner | Tax character | Value |
|---|---|---|---|
| 403(b), Northlake Regional Health System plan | Meg | Pre-tax | $420,000 |
| Roth IRA | Meg | Roth | $65,000 |
| 401(k), Dunmore Industrial Equipment plan | David | Pre-tax $1,090,000; Roth $60,000 | $1,150,000 |
| Roth IRA | David | Roth | $70,000 |
| Rollover traditional IRA (from a prior employer's plan) | David | Pre-tax | $210,000 |
| Taxable brokerage account | Joint (JTWROS) | Taxable | $360,000 |
| Health savings account | David | HSA | $48,000 |
| Cash reserve: savings and money market | Joint | Taxable | $85,000 |
| 529 plan, Bright Start (Illinois), beneficiary Ryan | Meg (owner) | 529 | $38,000 |
| **Investable total** | | | **$2,446,000** |
| Residence, Naperville | Joint tenancy | | $640,000 |
| **Total assets** | | | **$3,086,000** |
| Mortgage, §C.4 | Joint | | ($165,200) |
| **Net worth** | | | **$2,920,800** |

**By tax character (investable assets).** Pre-tax (tax-deferred) **$1,720,000**, 70.3% · Roth **$195,000**, 8.0% · Taxable **$445,000**, 18.2% · HSA $48,000, 2.0% · 529 $38,000, 1.6%. The 70% in pre-tax accounts is the fact the unresolved question (header) turns on: every dollar of it is ordinary income to someone, in some year.

## C.2 Asset detail

| Asset | Value | Basis | Titling | Notes |
|---|---|---|---|---|
| Brokerage, diversified index funds | $299,500 | $194,200 | JTWROS | Managed by the student's firm since January 2026; target allocation §G.3 |
| Brokerage, Dunmore Industrial Equipment common stock, 1,100 shares | $60,500 | $19,800 | JTWROS | Acquired through David's employee stock purchase plan 2010 to 2016 at an average of $18.00 a share; $55.00 a share at the as-of date; **16.8% of the account**; embedded gain $40,700; long-term |
| Brokerage, total | **$360,000** | **$214,000** | | Unrealized gain $146,000; 2026 income $5,760 (qualified dividends $4,100, interest $1,660) |
| Cash reserve | $85,000 | n/a | Joint | Savings and money market at about 3.6%; 2026 interest $3,060; about six months of core expenses |
| Health savings account | $48,000 | n/a | David | Family high-deductible plan; invested; 2026 contributions $9,750 ($8,750 employee including the $1,000 age-55 catch-up, plus $1,000 employer); current medical costs paid from cash flow, receipts kept |
| 529, Bright Start | $38,000 | n/a | Meg, owner; David successor owner; Ryan beneficiary | Contributions $500 a month; Illinois deduction §E.2; Emma's 529 was exhausted in 2025 |
| Residence | $640,000 | $447,000 | Joint tenancy with right of survivorship | Purchased 2009 for $415,000; $32,000 of capital improvements; gain if sold $193,000, under the §121 exclusion (§E.1) |

## C.3 Retirement accounts

### C.3.1 Meg: 403(b), $420,000

Northlake Regional Health System 403(b). All pre-tax (the plan added a Roth option in 2024; Meg has not used it). Primary beneficiary David; contingent "my children" by class (designation dated 3 October 2012). Meg was born in 1968, so her applicable age is **75** (§F.4); first distribution year **2043**; required beginning date **1 April 2044**.

### C.3.2 Meg: Roth IRA, $65,000

Opened 2006. Last contribution 2015, when the household's income was under the phase-out. Primary beneficiary David; contingent Emma and Ryan equally (designation dated 2015). The account has been open more than five years, so the five-year rule for qualified distributions is met once Meg reaches 59½ in November 2027 (§F.5).

### C.3.3 David: 401(k), $1,150,000

Dunmore Industrial Equipment 401(k). Pre-tax **$1,090,000**; Roth 401(k) **$60,000** (Roth deferrals since January 2024, so its five-year clock runs from 1 January 2024; §F.5). Primary beneficiary Meg; contingent Emma and Ryan equally (designation dated 2 February 2024). Plan features at §B.2: **in-plan Roth conversion permitted since 1 January 2026**. David was born in 1967, so his applicable age is **75**; first distribution year **2042**; required beginning date **1 April 2043**.

### C.3.4 David: Roth IRA, $70,000

Opened 2008. Last contribution 2015. Primary beneficiary Meg (designation dated 2008); **no contingent beneficiary named**. The five-year rule is met; David reaches 59½ in February 2027 (§F.5).

### C.3.5 David: rollover traditional IRA, $210,000

Rolled over in 2009 from the 401(k) of his prior employer, Halberd Controls (synthetic), where he worked 1999 to 2009. All pre-tax; no basis; no Form 8606 on file. **The beneficiary designation on file, dated 11 May 2009, names Dorothy Cole, David's mother, as sole primary beneficiary with no contingent.** Dorothy Cole died **9 March 2021**. Under the custodian's account agreement a designation with no surviving named beneficiary pays to the account owner's estate, which would route $210,000 of pre-tax money through probate and the 2011 will (§H.1) rather than to Meg as a spousal rollover. **This is the fact Session 1's intake summary misses and the annual review (Session 3) catches.** It also blocks a backdoor Roth contribution: a non-deductible IRA contribution would be pro-rated against this $210,000 of pre-tax IRA money under the aggregation rule (§E.1).

## C.4 Liabilities

| Liability | Balance | Terms |
|---|---|---|
| Mortgage, residence | **$165,200** | Refinanced **November 2022**: $214,000, 15-year fixed at **3.10%**, principal and interest **$1,488 a month**, matures **November 2037** (about 10 years 11 months remaining at the as-of date). No HELOC, no other debt |
| Credit cards | $0 carried | Paid in full monthly |
| Student loans | None | Emma's degree is debt-free so far (§A.2); her own credit-card balance is at §J |

---

# PART D — CASH FLOW

**Annualized for calendar 2026, the last full year with two paychecks.**

## D.1 Income

| Source | Gross | Character |
|---|---|---|
| Meg W-2 | $145,000 | Wages |
| David W-2 | $185,000 | Wages |
| Brokerage qualified dividends | $4,100 | Qualified dividend income |
| Brokerage fund interest | $1,660 | Ordinary |
| Cash reserve interest | $3,060 | Ordinary |
| **Household total** | **$338,820** | |

## D.2 Payroll savings and pre-tax deductions

| Item | Annual | Treatment |
|---|---|---|
| Meg 403(b) deferral, pre-tax, including the $8,000 age-50 catch-up | $32,500 | Excluded from federal and Illinois wages (§E.1, §E.2) |
| David 401(k) deferral, pre-tax | $24,500 | Excluded from federal and Illinois wages (§E.1, §E.2) |
| David 401(k) age-50 catch-up, **Roth** (required by his 2025 wages, §E.1) | $8,000 | After-tax (§E.1) |
| David HSA, employee share, including the $1,000 age-55 catch-up | $8,750 | A cafeteria-plan contribution: excluded from income and from Social Security and Medicare wages (§E.1) |
| David HSA, employer contribution | $1,000 | Not in wages (§E.1) |
| Employer retirement contributions (Meg $7,250; David $7,400) | $14,650 | Not in wages (§E.1) |
| **Household retirement and HSA savings, including employer money** | **$89,400** | |

## D.3 Expenses

| Item | Annual |
|---|---|
| Mortgage principal and interest, $1,488 x 12 | $17,856 |
| Property tax, Naperville residence | $13,400 |
| Homeowners, auto and $1,000,000 umbrella premiums | $5,400 |
| Meg's term life premium (§H.3) | $1,140 |
| Emma: tuition share and housing (through May 2027) | $18,000 |
| Ryan: 529 contributions, $500 x 12 | $6,000 |
| Travel | $6,000 |
| Everything else: food, utilities, cars, health premiums and out-of-pocket costs, gifts, Ruth's incidentals | $108,000 |
| **Total non-tax outflow** | **$175,796** |

## D.4 The 2026 position, in one line

Wages $330,000, less payroll savings of $65,000 to the retirement plans and $8,750 to the HSA, less federal income tax of **$42,636** and net investment income tax of **$335**, Illinois income tax of **$12,641** and payroll taxes of **$25,217** (§E.3), leaves **$175,421**, against **$175,796** of outflow: the household lives on its paychecks and saves through payroll, with investment income reinvested. When the paychecks stop, the arithmetic becomes the retirement-income one-pager that Session 5's case page builds.

---

# PART E — TAX PROFILE, 2026 PARAMETERS

**Tax year 2026 parameters, confirmed from primary-domain excerpts on 2026-10-11.** Every figure below is an external fact and carries a label. Because `irs.gov`, `ssa.gov`, `cms.gov` and `tax.illinois.gov` were unreachable from the build container, no parameter in this Part is [H]: each was confirmed from the primary domain's own search excerpts, corroborated where noted, and is marked [M]. The week-before-Session-2 ritual re-reads each against the full page. The 2027 figures replace these when the 2027 revenue procedure is published; the household's planning year is 2027 and later, so the file says which year each figure belongs to.

## E.1 Federal

| Parameter | 2026 value | Authority | Label |
|---|---|---|---|
| Ordinary income brackets, married filing jointly | 10% to $24,800; 12% to $100,800; 22% to $211,400; 24% to $403,550; 32% to $512,450; 35% to $768,700; 37% above | IRC §1(j); Rev. Proc. 2025-32 §4.01 | [M] |
| Standard deduction, MFJ | **$32,200**; additional $1,650 per spouse aged 65 or older | IRC §63(c); Rev. Proc. 2025-32 §4.14 | [M] |
| Enhanced deduction for seniors (2025 to 2028) | $6,000 per individual aged 65 or older, reduced by 6% of MAGI over $150,000 (MFJ); not available to the Coles before 2032 and gone after 2028 unless extended | IRC §151(d)(5), added by Pub. L. 119-21 | [M] |
| Long-term capital gain and qualified dividend rates, MFJ | 0% to $98,900 of taxable income; 15% to $613,700; 20% above | IRC §1(h); Rev. Proc. 2025-32 | [M] |
| Net investment income tax | 3.8% on net investment income above MAGI of $250,000 (MFJ), not indexed; retirement-plan and IRA distributions, conversions included, are not net investment income | IRC §1411 | [M] |
| State and local tax deduction cap | $40,400 (MFJ), reduced by 30% of MAGI over $505,000 but not below $10,000; indexed 1% a year through 2029, reverting to $10,000 in 2030 | IRC §164(b)(7), as amended by Pub. L. 119-21 | [M] |
| 401(k) and 403(b) elective deferral limit | **$24,500**; age-50 catch-up **$8,000**; ages 60 to 63 catch-up **$11,250** in place of $8,000 | IRC §402(g), §414(v); Notice 2025-67 | [M] |
| Roth-only catch-up | A participant whose prior-year FICA wages from the sponsor exceeded **$150,000** (2026 threshold) must make catch-up contributions as Roth; effective for taxable years beginning after 2025, with final regulations (T.D. 10033) applying from 2027 and good-faith compliance before | IRC §414(v)(7), SECURE 2.0 §603 | [M] |
| Defined-contribution annual additions limit | $72,000, plus catch-up | IRC §415(c); Notice 2025-67 | [M] |
| IRA contribution limit | $7,500; age-50 catch-up $1,100 (total $8,600) | IRC §219(b)(5); Notice 2025-67 | [M] |
| Roth IRA contribution phase-out, MFJ | MAGI **$242,000 to $252,000** | IRC §408A(c)(3); Notice 2025-67 | [M] |
| Roth conversions | No income limit since 2010; the taxable amount is gross income in the year of conversion; a conversion cannot be recharacterized (since 2018); an in-plan Roth rollover is available only where the plan offers it and is irrevocable | IRC §408A(d)(3), §402A(c)(4); Form 8606 instructions | [M] |
| IRA aggregation (the pro-rata rule) | A non-deductible contribution converted to Roth is taxed in proportion to all of the owner's non-Roth IRA balances; a 401(k) or 403(b) balance is not aggregated | IRC §408(d)(2); Form 8606 | [M] |
| Health savings account | Family contribution limit **$8,750**; HDHP minimum family deductible $3,400, out-of-pocket maximum $17,000; a contribution made through a cafeteria plan is excluded from income and from Social Security and Medicare wages | IRC §223, §125; Rev. Proc. 2025-19; Pub. 969; Form W-2 instructions | [M] |
| HSA age-55 catch-up | $1,000 (stated for 2025 in Pub. 969 and the Form 8889 instructions; no 2026 restatement was found) | IRC §223(b)(3) | [L] |
| Dependency: the age test for a qualifying child | Under 19 at year-end, or under 24 if a full-time student for some part of five calendar months, and younger than the taxpayer | IRC §152(c)(3); Pub. 501 | [M] |
| Employer health plan coverage of an adult child | A plan that covers dependents must cover a child until age 26, student or not, and the coverage is excluded from the employee's income through the year the child turns 26 | Public Health Service Act §2714 (ACA); IRC §105(b); DOL and CMS guidance | [M] |
| Section 529 | Qualified expenses: tuition, fees, books, supplies, equipment, and room and board for at least half-time students; earnings on non-qualified withdrawals are taxable plus a 10% additional tax; a 529 open 15 years may roll up to $35,000 lifetime to the beneficiary's Roth IRA, within the annual IRA limit | IRC §529(c)(3), (c)(6); Pub. 970; Pub. 590-A | [M] |
| American opportunity tax credit | $2,500 per student, phased out between MAGI $160,000 and $180,000 (MFJ): **not available to the Coles at $273,070** (2025 instructions; the 2026 figures rest on a draft form) | IRC §25A; Form 8863 instructions | [L] |
| Exclusion of gain on a principal residence | $500,000 (MFJ) | IRC §121 | [M] |
| Annual gift tax exclusion | $19,000 per donee | IRC §2503(b); Rev. Proc. 2025-32 | [M] |
| Federal estate and gift basic exclusion amount | **$15,000,000** per person for 2026, indexed from 2027 | IRC §2010(c)(3), as amended by Pub. L. 119-21 | [M] |
| Social Security benefit taxation | Up to 50% taxable above $32,000 of provisional income (MFJ), up to 85% above $44,000; not indexed | IRC §86; Pub. 915 | [M] |
| Eligible long-term care premium limits | Age over 50 through 60: $1,860; over 60 through 70: $4,960; over 70: $6,200 | IRC §213(d)(10); Rev. Proc. 2025-32 §4.27 | [M] |
| Payroll taxes | Social Security 6.2% to the $184,500 wage base; Medicare 1.45%; additional Medicare 0.9% on wages above $250,000 (MFJ); pre-tax deferrals stay in these wages, cafeteria-plan HSA contributions do not | IRC §3101, §3121; SSA 2026 contribution and benefit base; Form W-2 instructions | [M] |

## E.2 Illinois

| Parameter | Value | Authority | Label |
|---|---|---|---|
| Individual income tax rate | **4.95%**, flat | 35 ILCS 5/201(b)(5.4) | [M] |
| Exemption allowance | $2,925 per exemption for 2026 (the 2026 withholding booklet; the 2025 IL-1040 figure was $2,850; the 2026 return instructions are not yet published) | 35 ILCS 5/204; IL-700-T (2026) | [L] |
| Retirement income subtraction | Federally taxed distributions from 401(k), 403(b), IRA and pension plans, **including the taxable amount of a traditional-to-Roth conversion**, are subtracted on IL-1040 line 5; Social Security benefits are subtracted under a separate clause | 35 ILCS 5/203(a)(2)(F) and (L); Pub. 120; IDOR FAQ | [M] |
| Capital gains and dividends | No preferential rate; taxed at 4.95% | 35 ILCS 5/201 | [M] |
| Itemized deductions | None; Illinois starts from federal AGI and allows statutory subtractions, exemptions and credits only | 35 ILCS 5/203 | [M] |
| 529 subtraction | Contributions to Bright Start, Bright Directions or College Illinois up to **$20,000** (MFJ) a year, recaptured on a non-qualified withdrawal or a rollover to another state's plan | 35 ILCS 5/203(a)(2)(Y); 86 Ill. Adm. Code 100.2510 | [M] |
| Estate tax | Exclusion **$4,000,000**, a threshold not a credit, not indexed, **no portability**; Form 700 due 9 months after death when gross estate plus adjusted taxable gifts exceeds $4,000,000 | 35 ILCS 405; Illinois Attorney General estate tax fact sheet | [M] |
| Powers of attorney | Statutory short forms for property (Art. III) and health care (Art. IV); no co-agents, successors permitted | 755 ILCS 45 | [M] |
| Transfer on death instrument | Real property may pass by a recorded transfer-on-death instrument, signed, witnessed by two and notarized, recorded before death | 755 ILCS 27 | [M] |
| Property tax, DuPage County | Effective rates in Naperville tax codes run about 1.8% to 2.25% of market value (Civic Federation estimates and aggregators; no government rate table was readable). The Coles' $13,400 on $640,000 is 2.09% | Civic Federation, Estimated Effective Property Tax Rates | [L] |

## E.3 The household's 2026 position

| Line | Amount | How |
|---|---|---|
| Wages | $330,000 | §B.3 |
| Less pre-tax deferrals and HSA | ($65,750) | Meg $32,500; David $24,500 pre-tax (his $8,000 catch-up is Roth and stays in wages); HSA $8,750 |
| Plus investment income | $8,820 | $4,100 qualified dividends, $1,660 fund interest, $3,060 cash interest (§D.1) |
| **Adjusted gross income** | **$273,070** | |
| Standard deduction | ($32,200) | Itemizing would give about $31,400 (property tax $13,400, Illinois income tax $12,641, mortgage interest about $5,330), so the standard deduction is taken |
| **Taxable income** | **$240,870** | of which $4,100 qualified dividends |
| Federal income tax | **$42,636** | $2,480 + $9,120 + $24,332 on the first $211,400; 24% on the next $25,370 of ordinary income ($6,089); 15% on $4,100 of qualified dividends ($615). Marginal rate **24%**; the 24% bracket has $162,680 of room above them |
| Illinois income tax | **$12,641** | 4.95% x ($273,070 less four exemptions at $2,925 and the $6,000 529 subtraction = $255,370) |
| Payroll taxes | **$25,217** | Social Security $8,990 (Meg) + $10,928 (David: $185,000 less the $8,750 cafeteria-plan HSA contribution is $176,250, under the $184,500 base); Medicare $4,658 on $321,250; additional Medicare $641 on $71,250 over $250,000 |
| Roth IRA eligibility | **None** | MAGI $273,070 exceeds $252,000. Meg can make a non-deductible IRA contribution and convert it (she holds no pre-tax IRA); David cannot do so cleanly while the $210,000 rollover IRA exists (§E.1, aggregation), unless the plan's roll-in feature (§B.2) is used first. The file records the mechanics and recommends nothing |
| Net investment income tax | **$335** | MAGI $273,070 exceeds $250,000; the base is the lesser of net investment income ($8,820) and the excess, so 3.8% x $8,820 = $335 |

---

# PART F — RETIREMENT, SOCIAL SECURITY, MEDICARE AND THE CONVERSION WINDOW

## F.1 The clocks

| Event | Meg (born 1968) | David (born 1967) | Authority | Label |
|---|---|---|---|---|
| Age 59½ (penalty-free retirement distributions) | November 2027 | February 2027 | IRC §72(t) | [M] |
| Planned last paycheck | mid-2028 (60) | late 2029 (62), or 2027 if the position is eliminated (§J) | synthetic | |
| Social Security, earliest (62), 30% reduction at FRA 67 | May 2030 | September 2029 | SSA, 20 CFR 404.410 | [M] |
| Full retirement age (67 for births 1960 and later) | May 2035 | August 2034 | SSA, 20 CFR 404.409 | [M] |
| Delayed credits end (70): 124% of the FRA benefit | May 2038 | August 2037 | SSA | [M] |
| Medicare eligibility (65); seven-month initial enrollment period | May 2033 | August 2032 | medicare.gov | [M] |
| First IRMAA year looks back to | 2031 MAGI | 2030 MAGI | SSA (two-year look-back) | [M] |
| Applicable age for required minimum distributions | **75** (born after 1959) | **75** | IRC §401(a)(9)(C)(v); T.D. 10001 | [M] |
| First distribution calendar year | **2043** | **2042** | arithmetic: birth year + 75 | |
| Required beginning date | 1 April 2044 | 1 April 2043 | IRC §401(a)(9)(C) | [M] |
| Roth conversion window (first calendar year with no wages, to the year before the first RMD) | **2029 to 2042**, 14 years | **2030 to 2041**, 12 years (2028 to 2041 if the paycheck stops in 2027) | arithmetic | |

Two notes on the table. David reaches 62 on 9 August 2029 and a month counts only when the age is held for the whole month, so his first eligible month is September 2029; Meg, born on the 2nd, is eligible for May 2030 [M, SSA]. The window rows are each spouse's own clocks; on the joint return the household's no-wage years are **2030 to 2041**, because David's wages run to late 2029.

## F.2 Social Security estimates (synthetic)

Figures are **synthetic**, labelled so on every page that shows them, and stated in 2026 dollars. They are not drawn from any real statement.

| | Meg | David |
|---|---|---|
| Benefit at 62 (70% of PIA) | $2,037 a month | $2,436 a month |
| Benefit at full retirement age 67 (PIA) | **$2,910** a month | **$3,480** a month |
| Benefit at 70 (124% of PIA) | $3,608 a month | $4,315 a month |
| Spousal benefit, at most 50% of the other's PIA at own FRA [M, SSA] | $1,740 (less than her own) | $1,455 (less than his own) |

External rules the estimates rest on:

| Rule | Value | Authority | Label |
|---|---|---|---|
| Reduction for claiming at 62 with an FRA of 67 | 30% (5/9 of 1% a month for 36 months, then 5/12 of 1%) | SSA; 20 CFR 404.410 | [M] |
| Delayed retirement credits | 8% a year from FRA to 70, so 124% at 70 | SSA Benefits Planner | [M] |
| 2026 cost-of-living adjustment | 2.8% (announced 2025-10-24) | SSA press release | [M] |
| 2026 retirement earnings test | $24,480 under FRA ($1 withheld per $2 over); $65,160 in the FRA year ($1 per $3) | SSA, oact/cola/rtea | [M] |
| 2026 taxable maximum | $184,500 | SSA, oact/cola/cbb | [M] |
| Survivor benefits | 71.5% to 100% of the deceased worker's benefit from age 60, 100% at the survivor's FRA | SSA, survivor/amount | [M] |

## F.3 Medicare and IRMAA, 2026 figures

| Parameter | 2026 value | Authority | Label |
|---|---|---|---|
| Part B standard premium; deductible | **$202.90** a month; $283 | CMS fact sheet, 14 November 2025 | [M] |
| Part B late-enrollment penalty | 10% of the standard premium for each full 12 months of delay without creditable coverage, for life | medicare.gov | [M] |
| Part D base beneficiary premium; deductible; out-of-pocket cap | $38.99; $615; **$2,100** | CMS, 28 July 2025 announcement; CY 2026 Part D redesign instructions | [M] |
| IRMAA tiers, MFJ, on 2024 MAGI (Part B total / Part D add-on) | at or under $218,000: $202.90 / none · to $274,000: $284.10 / $14.50 · to $342,000: $405.80 / $37.50 · to $410,000: $527.50 / $60.40 · to under $750,000: $649.20 / $83.30 · $750,000 and over: $689.90 / $91.00 | SSA POMS HI 01101.020; CMS | [M] |
| The look-back | A year's premium uses MAGI (AGI plus tax-exempt interest) from the return two years earlier | SSA | [M] |
| Life-changing event | Form SSA-44 asks for a more recent year after work stoppage or reduction, marriage, divorce, death of a spouse, loss of income-producing property or pension; the event must be in or before the tax year requested | SSA, Handbook §2507; POMS HI 01120.030 | [M] |

**What the clocks do to the question.** A conversion in year X raises MAGI in year X; Medicare premiums in year X+2 are set on it. David's first IRMAA year is 2032, set on 2030; Meg's is 2033, set on 2031. Every conversion from 2030 on therefore has two prices: the federal bracket in the year of conversion, and the IRMAA tier two years later for whichever spouse is then on Medicare. Illinois charges nothing on either. The file states the mechanics and recommends no amount.

## F.4 Required minimum distributions

Both spouses were born after 1959, so the applicable age is **75** under IRC §401(a)(9)(C)(v) as amended by SECURE 2.0 §107; the 2024 final regulations (T.D. 10001) confirm 75 for births on or after 1 January 1960 and leave 1959 to a proposed rule. [M] First distribution years 2042 (David) and 2043 (Meg); the first distribution may be taken as late as 1 April of the following year, in which case two distributions fall in that year [M, Pub. 590-B]. The excise tax on a shortfall is 25%, reduced to 10% if corrected within the correction window (IRC §4974(a), SECURE 2.0 §302) [M].

## F.5 Roth clocks

Meg's Roth IRA (first contribution 2006) and David's (2008) have each met the five-year rule for qualified distributions; distributions are qualified once each is 59½ (§F.1). David's Roth 401(k) clock started 1 January 2024. **Each future conversion starts its own five-year clock for the 10% additional tax on a withdrawal of converted amounts before 59½**; after 59½ that clock is moot, which is why the window in §F.1 opens when it does. [M, Pub. 590-B; IRC §408A(d)]

## F.6 Ruth's IRA, on her death

Ruth is past her required beginning date. Her 2026 RMD is **$10,847** ($192,000 at 31 December 2025, Uniform Lifetime Table factor 17.7 at age 83 [M, Pub. 590-B]). If Meg inherits the $190,000 IRA she is a designated beneficiary who is not an eligible designated beneficiary (an adult child more than ten years younger), so the account must be emptied by 31 December of the tenth year after death **and**, because Ruth died after her required beginning date, annual distributions are required in years one to nine (T.D. 10001, applicable from 2025) [M]. Those distributions are ordinary income to Meg in years that may fall inside her conversion window; Illinois does not tax them (§E.2). The file states the rule and recommends nothing.

---

# PART G — RISK PROFILE AND INVESTMENT POLICY

## G.1 Questionnaire results, January 2026 intake

The firm's twelve-question risk questionnaire (a synthetic instrument; scores run 0 to 100).

| | Meg | David |
|---|---|---|
| Score | **38** | **72** |
| Band | Conservative (30 to 44) | Moderately aggressive (65 to 79) |
| Largest one-year loss tolerated before "I would want to change the plan" | 10% | 25% |
| Stated reason, in their words | "I watched my parents' savings get cut in half in 2008 and I never want to feel that." | "We have a few years before we touch any of it and more than a decade before anyone makes us. Being too careful is its own risk." |

The two scores sit **34 points apart**, three bands. The couple had never discussed it before the intake meeting. **No recommendation is recorded here**; the Session 1 case page's deliverable is the letter that explains the two profiles and how the firm proposes to reconcile them, and the lesson teaches how it was built.

## G.2 Current allocation (investable assets, as of 31 December 2026)

| Asset class | Share |
|---|---|
| Equities, diversified funds | 64% |
| Equities, Dunmore common stock (single position) | 2% |
| Fixed income | 28% |
| Cash and money market | 6% |

## G.3 Investment policy statement (September 2024, prior adviser)

Target **60% equities / 40% fixed income and cash**, rebalanced annually, no single position above 5% of investable assets. The IPS pre-dates the firm's engagement, names only David's risk profile ("moderate growth") and has not been re-signed. The Dunmore position is within the 5% limit on investable assets (2%) but is **16.8% of the taxable account** that holds it (§C.2). §O, D2 is an excerpt.

---

# PART H — ESTATE DOCUMENTS, BENEFICIARY DESIGNATIONS AND INSURANCE

## H.1 Documents on file

| # | Document | Date executed | Drafter | Status |
|---|---|---|---|---|
| H.1.1 | Last will and testament, Margaret Cole | 17 May 2011 | Whitfield Law Group | Executed. All to David; if he does not survive, to the children in equal shares outright at 25. **Guardian of minor children: Tom Alder** (Meg's brother). Personal representative: David, then Tom |
| H.1.2 | Last will and testament, David Cole | 17 May 2011 | Whitfield Law Group | Executed. Mirror of H.1.1 |
| H.1.3 | Durable powers of attorney for property, both spouses | 17 May 2011 | Whitfield Law Group | Executed. Illinois statutory short form. Each spouse is the other's agent; **successor agent: Dorothy Cole (David's mother, died 2021) on David's; Ruth Alder on Meg's** |
| H.1.4 | Powers of attorney for health care, both spouses | 17 May 2011 | Whitfield Law Group | Executed. Same agents and successors as H.1.3 |
| H.1.5 | Revocable living trust | none | none | **Does not exist.** The residence passes by joint tenancy; everything else by beneficiary designation or the will |
| H.1.6 | Transfer on death instrument for the residence | none | none | **Does not exist** |
| H.1.7 | Investment policy statement | 12 September 2024 | Harlan Beck (prior adviser) | On file; §G.3 |
| H.1.8 | Roth conversion memorandum | 3 October 2024 | Harlan Beck | On file. Recommended converting $150,000 of David's **rollover IRA** in 2024 "because the Dunmore plan does not permit in-plan conversion"; not acted on. **Contradicted by the 2026 plan amendment** (§B.2). §O, D7 |
| H.1.9 | 401(k) summary plan description, Dunmore | 1 January 2026 | Plan sponsor | On file. §B.2; §O, D3 |
| H.1.10 | Rollover IRA beneficiary designation | 11 May 2009 | Custodian form | On file. **Names Dorothy Cole, deceased, with no contingent.** §C.3.5; §O, D4 |
| H.1.11 | Social Security statements, both spouses | 2026 (downloaded) | SSA | On file; synthetic figures at §F.2; §O, D5 |
| H.1.12 | Ruth Alder's residency agreement, Maple Court | 1 March 2023 | The community | Copy on file under Meg's power of attorney; §A.3; §O, D6 |
| H.1.13 | Ruth Alder's powers of attorney (property; health care) naming Meg | 8 June 2022 | Ruth's counsel | Copies on file |
| H.1.14 | 529 plan statement, Bright Start | 31 December 2026 | Program manager | §C.2; §O, D8 |
| H.1.15 | Mortgage statement | December 2026 | Servicer | §C.4; §O, D9 |
| H.1.16 | 2025 annual review notes (prior adviser's last) | 14 November 2025 | Harlan Beck | §O, D1 |

**Gaps a reader should see without being told the answer.** The 2011 documents name a guardian for children of whom one is now an adult, a successor agent who has died, and no trust; the rollover IRA names a deceased beneficiary; the two Roth IRAs have one contingent beneficiary between them. Illinois now offers a transfer-on-death instrument for real estate (§E.2). The file records the gaps and draws no conclusion.

## H.2 Beneficiary designations, as the custodians hold them

| Account | Primary | Contingent | Form dated | Flag |
|---|---|---|---|---|
| Meg 403(b) | David Cole | "my children" (by class) | 2012-10-03 | none |
| Meg Roth IRA | David Cole | Emma Cole 50%, Ryan Cole 50% | 2015-06-20 | none |
| David 401(k) | Margaret Cole | Emma Cole 50%, Ryan Cole 50% | 2024-02-02 | none |
| David Roth IRA | Margaret Cole | none | 2008-04-15 | No contingent |
| **David rollover IRA** | **Dorothy Cole (died 2021-03-09)** | **none** | **2009-05-11** | **Stale: pays to the estate by default** |
| HSA | Margaret Cole | none | 2019-01-08 | No contingent |
| 529 | Ryan (beneficiary); David successor owner | none | 2012 | none |
| Brokerage, cash | Joint with right of survivorship | none | none | Passes to the survivor; then by the survivor's will |
| Residence | Joint tenancy | none | 2009 | Passes to the survivor; no transfer-on-death instrument |

## H.3 Insurance

| Coverage | Insured | Amount | Terms | Flag |
|---|---|---|---|---|
| Group term life | David | **$370,000** (2x salary) | Through Dunmore; ends at separation; no portability election made | Ends at retirement in 2029, or earlier if the position is eliminated (§J) |
| Group term life | Meg | $145,000 (1x salary) | Through Northlake; ends at separation | Ends at retirement in 2028 |
| Individual 20-year level term | Meg | **$500,000** | Issued 2010, premium $1,140 a year, **level term ends 2030**; renewable at attained-age rates | Expires two years into retirement |
| Long-term disability | Both | 60% of pay | Group, through each employer | Ends at retirement |
| Long-term care | None | none | none | **No coverage for either spouse.** Ruth's situation (§A.3) is the household's live example of the cost |
| Property and casualty | Both | Home, two cars, $1,000,000 umbrella | Annual premiums $5,400 | none |
| Health | Family | Dunmore high-deductible plan with HSA | Covers Meg, Emma (to 26 under the federal dependent-coverage rule, §E.1) and Ryan | Coverage ends at David's separation; David's 2029 to 2032 and Meg's 2028 to 2033 gaps before Medicare are a retirement-income line item (Session 5) |

## H.4 Estate exposure, stated without conclusion

Net worth $2,920,800 (§C.1) plus life insurance death benefits of $1,015,000 (David's $370,000 and Meg's $145,000 group policies, and her $500,000 term policy) if both died today is **$3,935,800**, $64,200 below the Illinois **$4,000,000** exclusion (§E.2) and far below the federal exclusion (§E.1). The Illinois exclusion is not indexed and not portable: growth alone could carry the second estate past it. The file records the number and draws no conclusion.

---

# PART I — AUTHORITIES

Limited to what the v5 facts need, plus two authorities the Session 1 and Session 2 corrections register cites (marked). Precedential weight is stated so a student can tell a statute from a form instruction. Labels are the Part E and F labels for the same items.

| Authority | What it governs here | Weight | Label |
|---|---|---|---|
| IRC §1(j), §63(c), §1(h), §1411, §164(b)(7), §151(d)(5), §152(c)(3), §25A, §121, §2503(b), §2010(c) as amended by Pub. L. 119-21 (2025) | The 2026 federal parameters at §E.1 | Statute | [M] |
| Rev. Proc. 2025-32 (IRB 2025-45) | 2026 inflation adjustments: brackets, standard deduction, gain thresholds, gift exclusion, LTC premium limits | IRS guidance, binding on the Service | [M] |
| Notice 2025-67 (IRB 2025-49) | 2026 retirement plan and IRA limits | IRS guidance | [M] |
| Rev. Proc. 2025-19 | 2026 HSA and HDHP limits | IRS guidance | [M] |
| IRC §402(g), §414(v), §414(v)(7), §415(c), §219, §408A, §408(d)(2), §402A(c)(4), §72(t), §401(a)(9), §4974, §125, §3101, §3121 | Deferrals, catch-ups, Roth-only catch-up, IRA limits, Roth conversions and aggregation, early-distribution penalty, RMDs, cafeteria plans, payroll taxes | Statute | [M] |
| SECURE 2.0 Act (Division T, Pub. L. 117-328, 2022) §107, §109, §126, §302, §603 | Applicable age 75, the 60-to-63 catch-up, 529-to-Roth, the reduced excise tax, Roth-only catch-ups | Statute | [M] |
| T.D. 10001 (July 2024), Treas. Reg. §1.401(a)(9)-2 to -5; T.D. 10033 (2025) | RMD final regulations including the ten-year rule's annual-distribution requirement; the §603 final regulations | Regulation | [M] |
| Pub. 501, 590-A, 590-B, 915, 969, 970, 505; Form 8606, 8863, 8889, 706 and W-2 instructions | How the rules are applied on the return | Instruction; not law | [M] |
| Public Health Service Act §2714 (ACA §1001); IRC §105(b) | Dependent coverage to 26 and its income exclusion (§H.3) | Statute | [M] |
| 42 U.S.C. §1395r(i); 20 CFR Part 418; SSA POMS HI 01101.020, HI 01120.030 | Medicare Part B and D income-related adjustments, the look-back, life-changing events (§F.3) | Statute, regulation, agency manual | [M] |
| 42 U.S.C. §402, §416(l); 20 CFR 404.409, 404.410 | Full retirement age, early-claiming reduction, delayed credits, earnings test (§F.1, §F.2) | Statute, regulation | [M] |
| 35 ILCS 5/201, 5/203(a)(2)(F), (L), (Y), 5/204 | Illinois rate, the retirement-income and Social Security subtractions, the 529 subtraction, exemptions (§E.2) | Statute | [M] |
| 35 ILCS 405 | Illinois estate tax: the $4,000,000 exclusion, no portability (§E.2, §H.4) | Statute | [M] |
| 755 ILCS 45; 755 ILCS 27 | Illinois powers of attorney; the transfer-on-death instrument (§E.2, §H.1) | Statute | [M] |
| 86 Ill. Adm. Code 100.2510 | The 529 subtraction's cap across accounts (§E.2) | Regulation | [M] |
| IRC §7872(c)(2), (d)(1) *(corrections register, Session 1; and Ruth's loan at §J)* | The $10,000 and $100,000 gift-loan thresholds; no Cole loan at interest exists | Statute | [M] |
| Rev. Proc. 2022-32; Treas. Reg. §20.2010-2, -3 *(corrections register, Session 2)* | The late portability election to the fifth anniversary for estates with no §6018(a) filing requirement; the DSUE election; no Cole estate is in view | IRS guidance; regulation | [M] |

---

# PART J — CONFIDENTIALITY LANDMINES

Exactly three (PEDAGOGY §5.3.4). Each is a fact a practitioner would never enter into a consumer AI tool, and each is a fact the Session 4 de-identification exercise must find in the Cole file. None is a health fact (PEDAGOGY §5.3.6).

1. **David's employer.** In November 2026 David was told, in confidence, that his division is under evaluation for sale or consolidation in 2027 and that his position may be eliminated with a severance package. It is his employer's confidential information and it moves his retirement date, his group life cover and the household's health coverage. He has told Meg and the firm, and no one else.
2. **Ruth's loan to Tom.** Through the power of attorney, Meg found that Ruth lent Tom **$25,000** in 2024, undocumented and unrepaid. Ruth asked Meg not to raise it with Tom. It is a third party's financial information, it bears on Ruth's capacity to fund assisted living and on the eventual division of her estate, and the client has asked that it stay inside the engagement.
3. **Emma's debt.** Emma has told her parents, and asked them not to tell Ryan or her grandmother, that she carries about **$14,000** of credit-card debt from her junior year. Meg and David are deciding whether to pay it before she starts work in August 2027. It is an adult third party's financial information, disclosed in confidence, and it changes the "launch both kids without debt" goal (§A.6).

The **identifying combination**, which carries no name and still identifies one household in a market this narrow: a nurse manager at a Naperville-area hospital system and a senior mechanical engineer at a material-handling manufacturer, married 29 years, with a daughter graduating in 2027 and a mother in a Wheaton senior community.

---

# PART K — RETIRED FACTS

**Every item below is a v4.0 fact and is false of the v5.0 household. None may survive anywhere served.** This part exists so the migration is verifiable by search rather than by reading. The v3-and-earlier rows (the former state and city, the small-business stock exclusion, the first note's figures, and the rest; see `scripts/verify-migration.mjs` check 1, which names them so it can search for them) stay retired; this table adds the v4 layer on top.

| Retired (v4.0) | Replaced by (v5.0) |
|---|---|
| Meg, 64, president and CEO of **Cole Precision Components Inc.** (CPC), who bought the company from her father **Walter Hensley** in 2016 for **$14,000,000** | Meg, 58, nurse manager at a synthetic hospital system (§A.1, §B.1). No company, no father-founder, no purchase. |
| David, 63, retired hospital pharmacist | David, 59, senior mechanical engineer (§B.2) |
| Children **Claire Cole Whitaker** (physician) and **Nathan Cole** (operations supervisor at CPC); grandchildren Ava and Theo; **Ben Whitaker** | Children Emma, 21, and Ryan, 16 (§A.2). No grandchildren. |
| **Walter Hensley**, **Hensley Precision Products**, the 1987 founding, the 2016 purchase, the nine-year installment note to Walter | Nothing. Meg's parent in the file is her mother Ruth Alder (§A.3). |
| **Barrington Hills** residence worth **$2,000,000**; CPC's plant in **Rockford**; Winnebago County | Naperville residence worth $640,000 (§C.2); Wheaton for Ruth's community |
| CPC: **$55,000,000** indicated value, 1,000 shares, **$5,000,000** annual dividend, **$42,400,000** revenue, **$9,170,000** EBITDA, **$5,180,000** net income, **$1,850,000** capex, **180** employees, a 96,000 sq ft plant, AS9100D, ITAR and DDTC registration, NAICS 332722, precision aerospace fasteners, a 61% customer concentration, a 9.09% dividend yield, the Lakeshore Industrial Partners range of **$50,000,000 to $60,000,000**, the **6.0x** multiple, the **$4,000,000** revolving line | Nothing. There is no operating business in v5. |
| **Cole Family Holdings LLC**, **1,000 units**, **100 voting / 900 non-voting**, the **30%** combined discount, **$38,500** and **$55,000** per unit | Nothing |
| **Cole 2026 Irrevocable Trust**, the SLAT, the **52-unit $2,002,000 seed gift**, the **520-unit $20,020,000 installment sale**, the **demand note at 3.82%**, **$764,764** of interest, the serial acquisition of **328** units for **$12,628,000**, the **$16,852,000** estate reduction, the **$8.42** leverage figure, **$38,148,000** after closing | Nothing. There is no trust, no sale, no note. |
| **The burn**: Meg paying the grantor trust's tax, **$1,293,750** a year at steady state, **$822,250** in year 1, **$5,001,930** by year 5, **$11,470,680** by year 10, **$24,408,180** by year 20, **$30,876,930** by year 25; Rev. Rul. 2004-64 as the mechanism | Nothing |
| The recurring question *"Meg is short $522,086 a year from year 6 ... how much of the $20,020,000 note does she call"* | The v5 unresolved question in the header: how much to convert to Roth, and when |
| Meg's **$3,000,000** traditional IRA; David's **$1,000,000** 403(b); the **$1,000,000 inherited IRA** from Walter with its **$43,290** 2026 RMD and **31 December 2031** outer limit; applicable age **75** with first distribution year **2037** / **2038** | Meg's $420,000 403(b); David's $1,150,000 401(k), $210,000 rollover IRA; no inherited IRA yet (Ruth's $190,000 IRA names Meg, §A.3); applicable age 75 with first distribution years 2042 / 2043 (§F.4) |
| Brokerage **$2,500,000** with **62%** in three technology names (**$1,550,000**; largest $690,000); cash **$1,500,000**; T-bills **$1,000,000**; net worth **$67,000,000**; no liabilities | Brokerage $360,000 with 16.8% in one employer stock; cash $85,000; net worth $2,920,800; a $165,200 mortgage (§C) |
| Meg's W-2 **$450,000**; household income **$5,644,790**; living expenses **$600,000**; charitable gifts **$80,000**; property tax **$38,000**; the **$349,350** gap; **23.8% / 28.75% / 41.95%** combined rates; **$1,437,500** of dividend tax | §B.3 and §D |
| The **2014 buy-sell agreement** (Ostrander LLC) with its **$18,000,000** formula; the **2023 Merrit Valuation appraisal at $38,000,000**; the **19 February 2026** Corbin memorandum; the **8 October 2025** unsolicited inquiry; Form 709; the unexecuted 2026 drafts | §H.1. No business documents exist. |
| **Corbin & Reyes LLP**, **Halvorsen Group**, **Merrit Valuation Advisors**, **Lakeshore Industrial Partners**, **Ostrander LLC**, **Rockford Workforce Alliance** (or any charity Meg chairs) | Whitfield Law Group, Lindqvist Tax Associates, Harlan Beck (§A.5). No charity, no board seat, no endowment. |
| Charitable: **$80,000** a year to four charities; a **$5,000,000 lifetime endowment**; "the board has not been told" | Nothing |
| The three v4 landmines (Nathan not told of the inquiry; the privileged discount position; the endowment and the board seat) | The three v5 landmines at §J |
| The 2011 **Cole Joint Revocable Trust**, the credit-shelter formula, the Illinois QTIP direction, Claire as successor agent; the **12 March 2026** succession memorandum, the **6 April 2026** unexecuted drafts, Walter's death on **4 November 2021**, the IRA titled FBO Margaret Cole, the buy-sell's Articles VII and IX | No trust; 2011 wills and POAs with Tom Alder as guardian and Dorothy Cole as a (deceased) successor agent (§H.1) |
| The August 2026 applicable federal rates (Rev. Rul. 2026-13 Table 1: **4.10%** short, **4.35%** mid, **4.92%** long, and their adjusted and semi-annual forms), the **3.82%** blended annual rate (Rev. Rul. 2026-12 Table 6), the §7520 rate **5.20%**, the §1274 / §7872 open question, the **$820,820** and **$56,056** rate-spread figures, the 2026 **$15,000,000** exclusion as consumed by the seed gift, **$12,998,000** remaining | Nothing. No note, no gift, no §7872 question. The federal exclusion survives only as a parameter at §E.1. |
| Every v4 authority used only by the structure: Rev. Rul. 85-13, 2004-64, 2004-77, 93-12, 59-60, 77-287, 86-17, 2026-12 and 2026-13; T.D. 9884; Prop. Reg. §25.2704; Reg. §25.2701-1, -2, §301.6501(c)-1(f), §1.7872-15; IRC §675(4)(C), §671 to 679, §2036(a)(1), (a)(2), (b), §2038, §2043, §2701 to 2704, §453, §1(e), §11(b), §170(b)(1)(I), §2631, §1274, §1288(b), §7520, §721; *Mirowski*, *Karmazin*, *Woelbing*, *Davidson*, *Powell*, *Byrum*, *Strangi*, *Bongard*, *Holman*, *Senda*, *Turner*, *Cahill*, *Connelly*; 805 ILCS 180, 760 ILCS 3, 35 ILCS 5/201(c), 405/2(b-1); the Illinois HB 2601 note; Rev. Proc. 2017-34 as the lessons cited it (it is not in v4 CASE.md) | §I lists only the authorities the v5 facts need, plus the two the corrections register cites |
| Part O v4: the ten buy-sell, appraisal, trust and note chunks (D1 to D10) and the meeting excerpt about "the trust sale" and "the note callable on demand" | Part O v5 |
| The Part L two-sheet IDGT flowchart (structure and ownership; year-1 cash ribbons) | Part L v5: the household map and the timeline |

**Grep targets that must return zero on every served page and instructor note** (each is a string, matched case-insensitively unless it is an acronym; a dollar figure matches with or without the separator; `scripts/verify-migration.mjs` check 1c carries the regexes, anchored where a bare form would collide with a date or a CSS token):

- *Names and places:* `Cole Precision`, `CPC`, `Hensley`, `Walter`, `Claire`, `Nathan`, `Whitaker`, `Barrington`, `Rockford`, `Winnebago`, `Lakeshore Industrial`, `Merrit`, `Ostrander`, `Corbin`, `Halvorsen`, `Cole Family Holdings`, `Cole Joint Revocable Trust`, `Rockford Workforce Alliance`, `FBO Margaret Cole`.
- *Instruments and framings:* `Irrevocable Trust`, `IDGT`, `SLAT`, `grantor trust`, `installment sale`, `seed gift`, `demand note`, `the burn`, `non-voting`, `voting unit`, `aerospace`, `fastener`, `buy-sell`, `appraisal`, `endowment`, `credit-shelter`, `QTIP`, `AS9100D`, `ITAR`, `DDTC`, `332722`, `Article VII`, `Article IX`, `inherited IRA of $1,000,000`, `$3,000,000 traditional IRA`.
- *Household and company figures:* `$55,000,000`, `$67,000,000`, `$14,000,000`, `$42,400,000`, `$9,170,000`, `$5,180,000`, `$1,850,000`, `$2,500,000`, `$1,550,000`, `$690,000`, `$1,340,000`, `$118,000`, `$950,000`, `$930,000`, `$780,000`, `$450,000`, `$600,000`, `$5,644,790`, `$349,350`, `$250,650`, `$1,437,500`, `$1,250,000`, `$52,000`, `$41,000`, `$58,500`, `$43,290`, `$45,249`, `$47,393`, `$49,751`, `$52,356`, `$38,000,000`, `$18,000,000`.
- *Structure, cash-flow and burn figures:* `$20,020,000`, `$2,002,000`, `$38,500`, `$764,764`, `$16,852,000`, `$38,148,000`, `$12,628,000`, `$522,086`, `$49,500,000`, `$34,650,000`, `$14,850,000`, `$5,500,000`, `$22,022,000`, `$11,440,000`, `$5,412,000`, `$32,648,000`, `$946,197`, `$1,264,764`, `$1,786,850`, `$2,140,000`, `$2,860,000`, `$3,213,150`, `$2,266,953`, `$4,053,803`, `$2,095,236`, `$2,367,345`, `$2,674,792`, `$3,022,167`, `$3,414,657`, `$2,468,460`, `$820,579`, `$1,213,069`, `$1,560,444`, `$1,867,891`, `$3,132,109`, `$3,439,556`, `$3,786,931`, `$4,179,421`, `$900,481`, `$988,872`, `$1,088,743`, `$1,201,583`, `$1,293,750`, `$822,250`, `$5,001,930`, `$11,470,680`, `$24,408,180`, `$30,876,930`, `$12,998,000`, `$820,820`, `$56,056`, `$16,700`, `$38,200`, `$19,250`, `$8,000,000`.
- *Rates and percentages:* `3.82%`, `4.35%`, `4.92%`, `5.20%`, `28.75%`, `41.95%`, `24.06%`, `63.56%`, `57.2%`, `32.8%`, `6.45%`, `9.09%`, `82.1%`.
- *Authorities:* `Rev. Rul. 2004-64`, `2004-77`, `85-13`, `86-17`, `93-12`, `59-60`, `77-287`, `Rev. Rul. 2026-13`, `Rev. Rul. 2026-12`, `T.D. 9884`, `25.2704`, `2701`, `675(4)`, `2036(a)`, `Mirowski`, `Karmazin`, `Woelbing`, `Davidson`, `Powell`, `Byrum`, `Strangi`, `Bongard`, `Holman`, `Senda`, `Cahill`, `Connelly`, `§1274` (or `IRC 1274`, `section 1274`), `§7520` (or `IRC 7520`, `section 7520`), `805 ILCS 180`, `760 ILCS 3`, `HB 2601`.
- *Dates:* `1 July 2016`, `4 November 2021`, `30 May 2014`, `22 March 2011`, `12 September 2023`, `19 February 2026`, `12 March 2026`, `8 October 2025`, `6 April 2026`, `30 June 2026`, `31 July 2026`, `21 September 1991`, `3 February 1987`.
- *The v3 layer*, kept by `verify-migration.mjs` check 1 over the whole tree: the former state and city, the small-business stock exclusion and its section, `founder stock`, `$240,000`, `$4,968,000`, `$650,000`, `$310,000`, `$385,000`, `$34,265,000`, `$3,850,000`, `$7,200,000`, `$30,000,000`, `31%`, `31 years`, `donor-advised`, `DAF`, `planning window`, `99 non-voting`, `balloon`, `$3,360,000`, `$1,640,000`.

*Turner* is not a target: the surname is too common for a bare grep; a lesson that cites *Estate of Turner* is caught by the words around it in Phase 4a's register, not by this list.

**Conditional allowances.** These strings are legitimate in exactly one v5 context each; a blind purge introduces a defect.

| String | Permitted only as |
|---|---|
| `$2,000,000` | nothing in v5 states it; remove on sight |
| `$1,000,000` | the umbrella liability limit (§H.3) and the `1M`-token context window; never an inherited IRA or a 403(b) balance |
| `$4,000,000` | the Illinois estate tax exclusion (§I) |
| `$15,000,000` | the federal basic exclusion amount (§E.1) |
| `$5,000,000` | nothing in v5 states it; remove on sight (it was the dividend and the endowment) |
| `founder`, `founded` | never of any Cole; the word has no v5 subject |
| `nine-year`, `9-year` | nothing in v5; remove on sight |
| `Rev. Proc. 2022-32` | the portability late-election authority at §I, cited for the Session 2 correction, never applied to any Cole estate |
| `§7872`, `7872` | the two gift-loan thresholds (§I), for the Session 1 correction and Ruth's loan (§J); never a note between Meg and a trust |
| `$25,000` | Ruth's loan to Tom (§A.3, §J); it was also the v4 charitable floor, which no v5 text states |
| `$35,000` | the 529-to-Roth lifetime limit (§E.1); it was also the v4 largest charitable recipient |
| `$410,000` | the fourth IRMAA tier bound (§F.3); it was also the v4 technology-position basis |
| `$4,500,000` | nothing in v5 states it; remove on sight (a v3 figure and a v4 allowance) |

---

# PART L — FLOWCHART

Two sheets, rendered on a **Structure** tab inside the case-facts viewer (the tab keeps its id; its label becomes **Map**).

- **Sheet 1 · the household map.** People, the accounts each owns, the tax character of each, and who each account passes to. At most seven dollar figures. The stale designation is marked.
- **Sheet 2 · the timeline, 2026 to 2044.** One bar per spouse: the last paycheck, the Roth conversion window, Social Security claiming ages, Medicare and the two-year look-back, and the first required minimum distribution. No dollar figures; the figures are in the detail tables.

The balance sheet by owner and the clock table render as HTML tables below each sheet, behind one **Show detail** toggle, generated from `case-facts.json` by `scripts/inject-case.mjs`, so every figure there is derived from this file rather than typed into artwork.

**Self-contained.** Static HTML and inline SVG with an inline stylesheet, system font stacks, no scripts, no external assets. Satisfies PEDAGOGY §1.8. Both `<desc>` elements describe the sheet for a screen reader in full sentences. Every external rule the sheets restate (the look-back, the Illinois treatment, the ages) is labelled in §E.2, §F.1 and §F.3; the sheets carry no label of their own.

```html
<!-- CASE:FLOWCHART cole-household v5.0 -->
<div class="cole-flow" style="background:#E4DFD6;padding:16px;border-radius:8px;overflow-x:auto">
<style>
/* Cole household map and timeline v5.0, self-contained, no external assets */
.cf-box{fill:#FBF9F4;stroke:#2B2620;stroke-width:1.2}
.cf-pre{fill:#F3E2C4;stroke:#8A5A14;stroke-width:1.2}
.cf-roth{fill:#D9E8D5;stroke:#2F6B3A;stroke-width:1.2}
.cf-tax{fill:#DCE4EE;stroke:#2F4A6B;stroke-width:1.2}
.cf-flag{fill:#F6D6D0;stroke:#9B2C1F;stroke-width:1.6}
.cf-t{font-size:12px;fill:#2B2620}
.cf-s{font-size:10.5px;fill:#5B534A}
.cf-h{font-size:14px;font-weight:700;fill:#2B2620}
.cf-line{stroke:#5B534A;stroke-width:1;fill:none}
.cf-bar{fill:#D9D2C5}
.cf-win{fill:#D9E8D5;stroke:#2F6B3A;stroke-width:1}
.cf-tick{stroke:#2B2620;stroke-width:1}
</style>
<div style="width: 100%; max-width: 720px; margin: 0 auto; box-shadow: rgba(30, 26, 18, 0.18) 0px 2px 18px;"><svg viewBox="0 0 720 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="t1 d1" style="width: 100%; height: auto; display: block; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; background:#FFFFFF">
  <title id="t1">Sheet 1: the Cole household map, accounts by owner and tax character, and who each account passes to</title>
  <desc id="d1">Meg Cole, 58, and David Cole, 59, are at the top of the sheet. Below Meg sit her 403(b) of 420,000 dollars, pre-tax, passing to David, and her Roth IRA of 65,000 dollars. Below David sit his 401(k) of 1,150,000 dollars, mostly pre-tax, passing to Meg; his Roth IRA of 70,000 dollars; and his rollover IRA of 210,000 dollars, pre-tax, whose beneficiary form still names his mother Dorothy Cole, who died in 2021, with no contingent, so it would pay to his estate. Between the spouses sit the joint accounts: the brokerage account of 360,000 dollars with an employer stock position, the cash reserve, the health savings account and the 529 plan for Ryan, and the Naperville house with its mortgage. Across the bottom are the children Emma and Ryan and Meg's mother Ruth Alder, whose traditional IRA names Meg as beneficiary. Investable assets total 2,446,000 dollars, seventy percent of it pre-tax.</desc>
  <text class="cf-h" x="20" y="28">The household map, 31 December 2026</text>
  <text class="cf-s" x="20" y="44">Boxes: amber = pre-tax, green = Roth, blue = taxable or other. Arrows = who the account passes to.</text>
  <rect class="cf-box" x="40" y="62" width="190" height="44" rx="6"/>
  <text class="cf-t" x="52" y="80">Meg Cole, 58</text>
  <text class="cf-s" x="52" y="96">Nurse manager · retires 2028</text>
  <rect class="cf-box" x="490" y="62" width="190" height="44" rx="6"/>
  <text class="cf-t" x="502" y="80">David Cole, 59</text>
  <text class="cf-s" x="502" y="96">Mechanical engineer · retires 2029</text>
  <rect class="cf-pre" x="40" y="130" width="190" height="46" rx="6"/>
  <text class="cf-t" x="52" y="149">403(b) · $420,000 · pre-tax</text>
  <text class="cf-s" x="52" y="166">to David; contingent "my children"</text>
  <rect class="cf-roth" x="40" y="186" width="190" height="40" rx="6"/>
  <text class="cf-t" x="52" y="203">Roth IRA · $65,000</text>
  <text class="cf-s" x="52" y="218">to David; contingent Emma, Ryan</text>
  <rect class="cf-pre" x="490" y="130" width="190" height="46" rx="6"/>
  <text class="cf-t" x="502" y="149">401(k) · $1,150,000 · pre-tax</text>
  <text class="cf-s" x="502" y="166">to Meg; in-plan Roth allowed</text>
  <rect class="cf-roth" x="490" y="186" width="190" height="40" rx="6"/>
  <text class="cf-t" x="502" y="203">Roth IRA · $70,000</text>
  <text class="cf-s" x="502" y="218">to Meg; no contingent</text>
  <rect class="cf-flag" x="490" y="236" width="190" height="52" rx="6"/>
  <text class="cf-t" x="502" y="255">Rollover IRA · $210,000 · pre-tax</text>
  <text class="cf-s" x="502" y="270">beneficiary: Dorothy Cole (d. 2021)</text>
  <text class="cf-s" x="502" y="283">no contingent → pays to the estate</text>
  <rect class="cf-tax" x="250" y="130" width="220" height="46" rx="6"/>
  <text class="cf-t" x="262" y="149">Joint brokerage · $360,000</text>
  <text class="cf-s" x="262" y="166">16.8% in employer stock</text>
  <rect class="cf-tax" x="250" y="186" width="220" height="40" rx="6"/>
  <text class="cf-t" x="262" y="203">Cash reserve · HSA · 529 for Ryan</text>
  <text class="cf-s" x="262" y="218">joint · David · Meg (owner)</text>
  <rect class="cf-tax" x="250" y="236" width="220" height="52" rx="6"/>
  <text class="cf-t" x="262" y="255">Naperville house, joint tenancy</text>
  <text class="cf-s" x="262" y="270">mortgage to 2037 at 3.1%</text>
  <text class="cf-s" x="262" y="283">no transfer-on-death instrument</text>
  <path class="cf-line" d="M230 153 L250 153"/>
  <path class="cf-line" d="M470 153 L490 153"/>
  <path class="cf-line" d="M135 106 L135 130"/>
  <path class="cf-line" d="M585 106 L585 130"/>
  <path class="cf-line" d="M135 226 L135 330"/>
  <path class="cf-line" d="M585 288 L585 330"/>
  <path class="cf-line" d="M360 288 L360 330"/>
  <rect class="cf-box" x="40" y="330" width="150" height="44" rx="6"/>
  <text class="cf-t" x="52" y="348">Emma, 21</text>
  <text class="cf-s" x="52" y="364">graduates May 2027</text>
  <rect class="cf-box" x="210" y="330" width="150" height="44" rx="6"/>
  <text class="cf-t" x="222" y="348">Ryan, 16</text>
  <text class="cf-s" x="222" y="364">college from 2029</text>
  <rect class="cf-box" x="420" y="330" width="260" height="58" rx="6"/>
  <text class="cf-t" x="432" y="348">Ruth Alder, 83 · Meg's mother</text>
  <text class="cf-s" x="432" y="364">independent living, Wheaton · Meg holds her POA</text>
  <text class="cf-s" x="432" y="379">her IRA names Meg · ten-year rule on her death</text>
  <rect class="cf-box" x="40" y="420" width="640" height="110" rx="6"/>
  <text class="cf-h" x="52" y="444">Investable assets $2,446,000</text>
  <rect class="cf-pre" x="52" y="456" width="434" height="22"/>
  <rect class="cf-roth" x="486" y="456" width="49" height="22"/>
  <rect class="cf-tax" x="535" y="456" width="133" height="22"/>
  <text class="cf-s" x="52" y="496">pre-tax 70.3% · Roth 8.0% · taxable, HSA and 529 21.7%</text>
  <text class="cf-s" x="52" y="516">Every pre-tax dollar is ordinary income to someone, in some year. The question is whose, and when.</text>
</svg></div>
<!-- SHEET-BREAK -->
<div style="width: 100%; max-width: 720px; margin: 24px auto 0; box-shadow: rgba(30, 26, 18, 0.18) 0px 2px 18px;"><svg viewBox="0 0 720 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="t2 d2" style="width: 100%; height: auto; display: block; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; background:#FFFFFF">
  <title id="t2">Sheet 2: the timeline from 2026 to 2044, one bar per spouse, with the Roth conversion window between the last paycheck and the first required minimum distribution</title>
  <desc id="d2">Two horizontal bars run from 2026 on the left to 2044 on the right. Meg's bar: last paycheck in 2028 at age 60; Social Security earliest at 62 in 2030, full retirement age 67 in 2035, maximum at 70 in 2038; Medicare at 65 in 2033, with premiums for that year set by 2031 income; first required minimum distribution in 2043 at age 75. David's bar: last paycheck in 2029 at age 62, or earlier if his position is eliminated; Social Security earliest at 62 in 2029, full retirement age 67 in 2034, maximum at 70 in 2037; Medicare at 65 in 2032, with premiums set by 2030 income; first required minimum distribution in 2042 at age 75. The green band on each bar marks the Roth conversion window: the calendar years with no wages and no required distributions, 2029 to 2042 for Meg and 2030 to 2041 for David. A note reads: Medicare premiums look back two years, so a conversion in 2030 shows up in David's 2032 premium.</desc>
  <text class="cf-h" x="20" y="28">The timeline, 2026 to 2044</text>
  <text class="cf-s" x="20" y="44">Green = the Roth conversion window: no wages, no required distributions yet. Ticks are calendar years.</text>
  <text class="cf-t" x="20" y="96">Meg</text>
  <rect class="cf-bar" x="60" y="82" width="640" height="18"/>
  <rect class="cf-win" x="166" y="82" width="498" height="18"/>
  <text class="cf-t" x="20" y="226">David</text>
  <rect class="cf-bar" x="60" y="212" width="640" height="18"/>
  <rect class="cf-win" x="202" y="212" width="427" height="18"/>
  <path class="cf-tick" d="M60 76 L60 106 M131 76 L131 106 M202 76 L202 106 M273 76 L273 106 M344 76 L344 106 M415 76 L415 106 M486 76 L486 106 M557 76 L557 106 M628 76 L628 106 M699 76 L699 106"/>
  <path class="cf-tick" d="M60 206 L60 236 M131 206 L131 236 M202 206 L202 236 M273 206 L273 236 M344 206 L344 236 M415 206 L415 236 M486 206 L486 236 M557 206 L557 236 M628 206 L628 236 M699 206 L699 236"/>
  <text class="cf-s" x="54" y="124">2026</text><text class="cf-s" x="125" y="124">2028</text><text class="cf-s" x="196" y="124">2030</text><text class="cf-s" x="267" y="124">2032</text><text class="cf-s" x="338" y="124">2034</text><text class="cf-s" x="409" y="124">2036</text><text class="cf-s" x="480" y="124">2038</text><text class="cf-s" x="551" y="124">2040</text><text class="cf-s" x="622" y="124">2042</text><text class="cf-s" x="690" y="124">2044</text>
  <text class="cf-s" x="54" y="254">2026</text><text class="cf-s" x="125" y="254">2028</text><text class="cf-s" x="196" y="254">2030</text><text class="cf-s" x="267" y="254">2032</text><text class="cf-s" x="338" y="254">2034</text><text class="cf-s" x="409" y="254">2036</text><text class="cf-s" x="480" y="254">2038</text><text class="cf-s" x="551" y="254">2040</text><text class="cf-s" x="622" y="254">2042</text><text class="cf-s" x="690" y="254">2044</text>
  <text class="cf-s" x="120" y="72">last paycheck 2028 (60)</text>
  <text class="cf-s" x="196" y="146">SS earliest 2030 (62)</text>
  <text class="cf-s" x="300" y="160">Medicare 2033 (65) · looks back to 2031</text>
  <text class="cf-s" x="380" y="174">SS full 2035 (67) · max 2038 (70)</text>
  <text class="cf-s" x="590" y="72">first RMD 2043 (75)</text>
  <text class="cf-s" x="150" y="202">last paycheck 2029 (62), or earlier</text>
  <text class="cf-s" x="166" y="276">SS earliest 2029 (62)</text>
  <text class="cf-s" x="262" y="290">Medicare 2032 (65) · looks back to 2030</text>
  <text class="cf-s" x="350" y="304">SS full 2034 (67) · max 2037 (70)</text>
  <text class="cf-s" x="560" y="202">first RMD 2042 (75)</text>
  <rect class="cf-box" x="40" y="320" width="640" height="76" rx="6"/>
  <text class="cf-t" x="52" y="344">Two clocks that do not line up</text>
  <text class="cf-s" x="52" y="362">Medicare premiums for a year are set by income two years earlier, so a conversion in 2030 reaches David's 2032 premium.</text>
  <text class="cf-s" x="52" y="378">Illinois does not tax retirement income, conversions included. The federal bracket does. Nothing here says how much to convert.</text>
</svg></div>
</div>
<!-- CASE:FLOWCHART END -->
```

---

# PART O — RETRIEVAL CORPUS

**These are the chunks `session-3` puts through its retrieval exercise, and the excerpt its note-extraction exercise reads.** They live here, beside the sections they restate, so a chunk and a section cannot disagree without a reader seeing both at once (a v4 chunk did, through two audits). `scripts/build-case.mjs` captures them into `scripts/case-corpus.json`; `scripts/inject-case.mjs` puts them in the injected span as `COLEDOCS`; `session-3` reads `COLEDOCS.corpus` and never a literal.

**Every chunk names the section it has to agree with.** Edit the section first, then the chunk, then run `node scripts/build-case.mjs`.

**These are synthetic excerpts, not model documents.** They are written in the flattened register a retrieval system sees: no possessive apostrophes, no dashes, no markup, because the exercise tokenises them and any character that is not in the instrument is a term the ranker will score.

**The internal conflict** (PEDAGOGY §5.3.2): D7, the 2024 memo, says the Dunmore plan does not permit in-plan Roth conversion; D3, the 2026 summary plan description, says it does. A retrieval that grounds on D7 alone produces a fully sourced, materially wrong answer. That is the Session 3 failure the corpus exists to surface.

> **THE RANKING IS A PROPERTY OF THIS TEXT.** `session-3` builds a live IDF index over these chunks and ranks by cosine similarity, so changing one word here changes the document frequencies and can move every score the exercise displays, including the margin flag. After any edit, re-run the four preset queries and check the rankings, the scores and the flag against what the lesson's own prose says about them. A chunk edit is never only a chunk edit.

## The ten document chunks

### D1. 2025 annual review notes (prior adviser)

Agrees with: **§A.6, §C.1, §H.1.16.**

```corpus id=D1
Annual review notes, 14 November 2025, Harlan Beck. Clients Meg and David Cole. Retirement targets unchanged, Meg at 60 in 2028 and David at 62 in 2029. Combined retirement and brokerage balances about 2.3 million. Discussed Emma finishing school in 2027 and Ryan starting in 2029. Meg raised her mother Ruth and the cost of assisted living. Roth conversion deferred again to a year with lower income. Beneficiary forms not reviewed this year. Adviser retiring, file to transfer to new firm in January.
```

### D2. Investment policy statement excerpt (2024)

Agrees with: **§G.3.**

```corpus id=D2
Investment Policy Statement, September 2024. Objective moderate growth. Target allocation 60 percent equities and 40 percent fixed income and cash, rebalanced annually. No single security above 5 percent of total investable assets. Risk profile recorded for David Cole as moderate growth. Time horizon to first withdrawal approximately five years. Policy to be reviewed at each annual meeting and signed again on any change in circumstances.
```

### D3. 401(k) summary plan description excerpt (2026)

Agrees with: **§B.2, §C.3.3**; the tax treatment at **§E.1**.

```corpus id=D3
Dunmore Industrial Equipment 401k Plan, Summary Plan Description, amended 1 January 2026. Participants may make pre tax and Roth elective deferrals. Effective 1 January 2026 participants may convert all or part of their pre tax account to a designated Roth account within the plan, an in plan Roth conversion, which is irrevocable and taxable in the year of conversion. After tax non Roth contributions are not permitted. The plan accepts rollover contributions from individual retirement accounts and other eligible plans. Loans are permitted. Pre tax amounts are not distributable in service before age 59 and one half except for hardship.
```

### D4. Rollover IRA beneficiary designation form (2009)

Agrees with: **§C.3.5, §H.2.**

```corpus id=D4
Individual Retirement Account Beneficiary Designation. Account owner David Cole. Account type rollover traditional IRA. Primary beneficiary Dorothy Cole, relationship mother, 100 percent. Contingent beneficiary none designated. If no named beneficiary survives the account owner the account is payable to the account owner estate under the custodial agreement. Signed 11 May 2009. No later designation on file.
```

### D5. Social Security statement excerpts (synthetic figures)

Agrees with: **§F.2.** Figures are synthetic and labelled so on the page.

```corpus id=D5
Social Security Statement, David Cole, 2026. Estimated monthly retirement benefit at age 62 is 2436 dollars, at full retirement age 67 is 3480 dollars, at age 70 is 4315 dollars. Social Security Statement, Margaret Cole, 2026. Estimated monthly retirement benefit at age 62 is 2037 dollars, at full retirement age 67 is 2910 dollars, at age 70 is 3608 dollars. Estimates assume continued earnings at the current level until claiming and are stated in today dollars.
```

### D6. Ruth Alder residency agreement excerpt (2023)

Agrees with: **§A.3.**

```corpus id=D6
Maple Court Senior Living Residency Agreement, resident Ruth Alder, effective 1 March 2023. Independent living apartment, monthly fee 4650 dollars, adjusted annually. Transfer to assisted living upon the recommendation of the community care team and the resident or her agent, at the then current assisted living base rate, presently 7900 dollars per month, plus care level charges assessed after evaluation. Thirty days notice to terminate. Agent under power of attorney Margaret Cole.
```

### D7. Roth conversion memorandum (2024, prior adviser)

Agrees with: **§H.1.8**; the rates it states at **§E.1** and **§E.2**. **This is the chunk that conflicts with D3.**

```corpus id=D7
Memorandum, 3 October 2024, Harlan Beck to Meg and David Cole, Roth conversion. Recommend converting 150000 dollars of the rollover IRA to Roth before year end 2024 while both are working, because the Dunmore 401k plan does not permit in plan Roth conversion and the rollover IRA is the only pre tax balance that can be converted now. Conversion is taxable at 24 percent federal and is not taxed by Illinois. Not acted on as of the November 2025 review.
```

### D8. 529 plan statement excerpt (2026)

Agrees with: **§C.2**; the deduction at **§E.2**.

```corpus id=D8
Bright Start 529 College Savings Plan, statement period ending 31 December 2026. Account owner Margaret Cole. Successor owner David Cole. Beneficiary Ryan Cole. Balance 38000 dollars. Contributions this year 6000 dollars by automatic monthly investment of 500 dollars. Age based portfolio. Illinois taxpayers may deduct contributions up to 20000 dollars for a married couple filing jointly.
```

### D9. Mortgage statement excerpt (2026)

Agrees with: **§C.4.**

```corpus id=D9
Mortgage statement, December 2026. Borrowers David Cole and Margaret Cole. Property in Naperville Illinois. Original loan 214000 dollars dated November 2022, fixed rate 3.10 percent, term 180 months, maturity November 2037. Principal balance 165200 dollars. Monthly principal and interest payment 1488 dollars. Escrow for property tax and insurance billed separately.
```

### D10. 2011 will excerpt (Meg)

Agrees with: **§H.1.1.**

```corpus id=D10
Last Will and Testament of Margaret Cole, executed 17 May 2011. I give my entire estate to my husband David Cole if he survives me, otherwise to my children in equal shares, each share to be distributed outright at age 25. If my children are minors at my death I appoint my brother Tom Alder as guardian of their persons and estates. I appoint David Cole as personal representative and Tom Alder as successor. No trust is created under this will.
```

## The meeting excerpt

`session-3` §07 puts this through its note-extraction exercise: the annual review of **the Session 3 meeting**, the firm's first with the Coles. It is a synthetic excerpt and no line of it was spoken by anyone. The Advisor is the student's firm (§A.5).

The scoring heuristic at `session-3` §07 runs over **the student's note**, not over this text, so the rubric elements are not a property of these lines. What IS a property of these lines is which elements a student can find at all: six candidate action items, two of them confidential (§J), one a document conflict (D3 against D7).

```speaker who=Advisor
Before the numbers, anything that has changed since January?
```

```speaker who=Meg
Two things. My mother's care team says she may need the assisted living wing within a year, which is about three thousand more a month than she pays now, and she cannot carry that for long on her own. And Emma told us she has about fourteen thousand of credit card debt. She does not want Ryan or her grandmother to know. We are deciding whether to pay it off before she starts work in August.
```

```speaker who=David
And one from me that stays in this room. My division is being looked at for a sale next year. I may be offered a package. It could move my date up two years, and it takes the group life and the health plan with it.
```

```speaker who=Advisor
Understood, and those stay in the file, not in any tool. On the plan itself: your new summary plan description allows in-plan Roth conversion as of January, which the 2024 memo in your file said was not possible. I want to re-run the conversion analysis on that basis. I also need the beneficiary form on your rollover IRA, David. The copy we have is from 2009 and it names your mother.
```

```speaker who=David
I had no idea. I will pull the current form this week. And yes, re-run the Roth numbers, but with the sale scenario in it, not just the 2029 plan.
```

```speaker who=Meg
One more. Ryan's 529 is at five hundred a month. If college is 2029, is that enough, and does the Illinois deduction change if we put in more?
```

---

# PART M — VERIFICATION

**Arithmetic.** Every household figure in Parts C, D, E.3 and F was computed on 2026-10-11 and is recomputed by `scripts/build-case.mjs` on every build. No figure in this file is drawn from memory; every external parameter carries its label and authority in Parts E, F and I.

Load-bearing identities, checkable by hand and recomputed by `scripts/build-case.mjs`:

- $420,000 + $65,000 + $1,150,000 + $70,000 + $210,000 + $360,000 + $48,000 + $85,000 + $38,000 = **$2,446,000** investable
- $2,446,000 + $640,000 − $165,200 = **$2,920,800** net worth
- Pre-tax $420,000 + $1,090,000 + $210,000 = **$1,720,000** (70.3%); Roth $65,000 + $60,000 + $70,000 = **$195,000** (8.0%); taxable $360,000 + $85,000 = **$445,000** (18.2%); HSA $48,000 (2.0%); 529 $38,000 (1.6%); the five sum to $2,446,000
- $145,000 + $185,000 = **$330,000** wages; $24,500 + $8,000 = **$32,500** deferral each; $7,250 + $7,400 = $14,650 employer
- $330,000 − $32,500 − $24,500 − $8,750 + $4,100 + $1,660 + $3,060 = **$273,070** AGI; − $32,200 = **$240,870** taxable income
- $2,480 + $9,120 + $24,332 + 24% × $25,370 + 15% × $4,100 = **$42,636** federal income tax (the 24% bracket starts at $211,400 and $236,770 of ordinary income lands $25,370 inside it)
- 3.8% × $8,820 = **$335** net investment income tax (MAGI $273,070 exceeds $250,000; the base is the lesser of net investment income and the excess)
- 4.95% × ($273,070 − 4 × $2,925 − $6,000) = **$12,641** Illinois income tax (the four exemptions and the 529 subtraction)
- 6.2% × $145,000 + 6.2% × ($185,000 − $8,750) + 1.45% × ($330,000 − $8,750) + 0.9% × ($321,250 − $250,000) = $8,990 + $10,928 + $4,658 + $641 = **$25,217** payroll taxes (the cafeteria-plan HSA contribution leaves Social Security and Medicare wages; the pre-tax deferrals do not)
- $330,000 − $65,000 − $8,750 − $42,636 − $335 − $12,641 − $25,217 = **$175,421** after savings and taxes, against $175,796 of outflow (§D.3)
- Mortgage: $214,000 at 3.10% over 180 months gives a payment of **$1,488.16**; after 49 payments the balance is **$165,209**, stated as $165,200
- $640,000 − $447,000 = **$193,000** home gain, under the $500,000 exclusion
- $60,500 ÷ $360,000 = **16.8%** employer-stock concentration; 1,100 × $55.00 = $60,500; 1,100 × $18.00 = $19,800 basis; $60,500 − $19,800 = $40,700 gain
- $190,000 + $110,000 = **$300,000** Ruth's assets; $192,000 ÷ 17.7 = **$10,847** her 2026 RMD
- 1967 + 75 = **2042**; 1968 + 75 = **2043**: first distribution years; required beginning dates 1 April 2043 and 1 April 2044
- 2 × $185,000 = **$370,000** David's group life; $370,000 + $145,000 + $500,000 = **$1,015,000** death benefits in force
- $2,910 × 0.70 = $2,037; × 1.24 = $3,608; $3,480 × 0.70 = $2,436; × 1.24 = $4,315: the synthetic Social Security table
- $2,920,800 + $1,015,000 = **$3,935,800**: estate plus death benefits, $64,200 under $4,000,000

**Sources.** No tax, benefit, Social Security, Medicare or Illinois page was readable in full from the build container on 2026-10-11: every [M] in Parts E, F and I rests on a primary-domain search excerpt, corroborated by secondary sources where the Part says so, and there is therefore no [H] in this file. **The four weakest parameters are marked [L] and listed here for the week-before ritual:** the 2026 HSA age-55 catch-up ($1,000, stated for 2025 only; §E.1); the Illinois 2026 exemption allowance ($2,925, from the withholding booklet; §E.2); the 2026 American opportunity credit phase-out (a draft form; §E.1); the DuPage effective property tax rate (no government table; §E.2). Also flagged: the Chicago-area assisted living cost is secondary only; Ruth's $7,900 base rate is synthetic and above the Illinois median of about $6,054 a month [M, CareScout 2025 via its Illinois release]. No figure in the file is written `[UNVERIFIED — needs source]` because every parameter found at least a primary-domain excerpt; the marker is the rule for any future parameter that finds none.

---

# PART N — CHANGELOG

| Version | Date | Change |
|---|---|---|
| **5.0** | **2026-10-11 (draft); adopted in Phase 3 of the next-term-2027 run** | **The household replaced.** Cole v4 (a business owner selling a large company to a trust) was above the Fall 2026 room (PEDAGOGY §5.3.7, §13.2 R9). v5 keeps the family name and replaces every fact: a nurse manager and a mechanical engineer in their late fifties in Naperville, about $2,450,000 of investable assets, a mortgage, two children, an aging parent, two 2011 wills, and one stale beneficiary designation. The unresolved question becomes the Roth conversion window. **Part letters reassigned:** A family (Ruth at A.3); B employment, income and plan features (was the operating business); C balance sheet; D cash flow; E tax profile with the 2026 parameters (was the proposed structure); F retirement, Social Security, Medicare and the window (was documents on file); G risk profile and investment policy (was charitable); H estate documents, beneficiary designations and insurance (was interest rates); I authorities (kept, cut to what v5 needs); J confidentiality landmines (kept, three new ones); K retired facts (kept; the v4 layer added); L flowchart (kept: two sheets, the household map and the timeline); M verification (kept); N changelog (kept); O retrieval corpus (kept; ten new chunks and a new meeting excerpt). Every v4 figure, name, instrument and authority is listed in Part K with its grep target. Documents on file are at H.1. |
| 4.5 | 2026-10-11 | §A.5 recorded the student's firm as the engaged planner (DW-041). Carried into v5 at §A.5. |
| 4.4 to 4.0 | 2026-08-23 to 2026-08-30 | The v4 household, now retired; the record is in the v4 file's Part N at tag `fall-2026-final`. |
| 3.0, 2.x | 2026-08 | Superseded. |
