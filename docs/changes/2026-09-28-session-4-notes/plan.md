# Plan: Session 4 against the instructor's update notes, 2026-09-28

Branch `claude/gracious-cray-2k4fkc`, from `c328c8c` (`main` after PR #40). Ask in
`notes-verbatim.md`. Ledger rows `S4N-001` upward; `checks.mjs` in this folder carries one DOM
assertion per row a DOM check can prove. Class is 2026-09-28, 6:00 PM Pacific.

## 0. The premise, challenged first

1. **"Do not make the session more text heavy" and "add content" pull against each other in
   five sections.** Every addition is therefore built as a thing the room clicks, with the fact
   inside the click: a second redaction card (§02), a ladder with a door (§03), a contract page
   whose lines fill in (§04), a hiding-technique picker and a bill (§05), flip cards (D3), a day
   slider and two real clocks (D5), a file with four "why" buttons (§07). Bullets under each
   section grew by at most one line.
2. **The Gemini API box collides with a repository rule.** `MAINTAINING.md` said the console
   must never reach Sessions 2 to 4 because their exercises run on students' own client work.
   The instructor's ask is explicit, so the box is added, but on its own terms: its prompt starts
   as the synthetic clean Prompt D, it says on its face that a free key is the training tier, it
   shows the request before anything is sent, and the rule text now records the exception and
   its reason. The style and call-layer fences stay byte-identical with Sessions 0.1 and 1; only
   the box's copy is Session 4's.
3. **Three [VERIFY] items could not be verified from this environment**, and the page says
   nothing on their strength: the Gemini app's own SynthID image check (Google's pages are
   egress-blocked and the search budget ran out), the exact free-tier request limits (sources
   conflict), and "loop engineering" as a term (no source uses it; Anthropic's words are "the
   agent loop"). Each is reported in the handback with the wording the instructor may use aloud.
4. **Two [DECIDE] items are decided against the note's first instinct.** The EU AI Act stays in
   §01 because it is the one rule written for AI that touches a US adviser, indirectly, through
   the mark on their Claude text; and no new contract section is built, because §04 already is
   the contract section and gains the clause view the note asked for.
5. **The legality of the live work-along is a hard no as described.** A real transcript on a
   shared screen is a disclosure to nonaffiliated third parties under Regulation S-P with no
   exception that fits; the teaching aid replaces it with the synthetic Cole transcript and gives
   the conditions under which the second step, a personal account on de-identified text, is
   allowed.
6. **The session's own web-search budget ran out mid-research.** Twelve of fifteen lanes
   completed; the three that did not (the Magesh figures, quotable regulator sentences, the
   Gemini console facts) are covered by records the repository already held at H, or by
   Anthropic pages that were opened directly, or are left unclaimed on the page.

## 1. What changes, by section

| Section | Change | Note item |
|---|---|---|
| Page top | The Live API box: see the request, send it, count the tokens, price them; a free key is plan A | B.2 |
| §01 | Item 9 reworded: the EU rule binds the vendor, not the adviser, and is why Claude's text carries a mark | E.§1 [DECIDE] |
| §02 | Beat 2, The Harder Ones: seven quasi-identifiers in a case note, a locking guess, a people-who-fit figure with seven sieves, copy and reset; the first bullet | E.§2 |
| §03 | Beat 2, the personal-or-firm ladder: six rungs, price tags, the client-file door that opens only on the firm side; the Plan C pointer to the box | B.3 |
| §04 | The copy button drafts a real email; beat 2, What the Clause Looks Like, with Anthropic's own sentences where verified and the 48-hour notice against the rule's 72 | E.04 [DECIDE], bug |
| §05 | How it hid (white text, zero-size font, invisible characters, an image); skill language for the three fixes and a copy button; the bill after the call; the scale line on the board | E.05 |
| D1 | Beat 2 made obvious (numbered steps, a three-step strip, zone words); beat 3, two kinds of image mark; the EU callout | E.D1 |
| D2 | Buckets alternate; the detector question reworded; bullets on what a CFP can and cannot check, with the Claude Content Checker | E.D2 [DECIDE] |
| D3 | Current guidance on both claims; eight flip cards, 2023 against now | E.D3 |
| D5 | The clocks that are law on a day slider; the plan block; two real clocks, Equifax and Capital One | E.D5 |
| D6 | Start again | E.D6 |
| §06 | Arithmetic re-verified; pricer in class vocabulary | E.06 [DECIDE: no API here] |
| §07 | Why slot 1 to 4, with the rules behind them and the sentence that no rule lists the four; the record block as a skill | E.07 |
| Sources | 42 new records, three updated, lock synced | A.5 |
| Instructor materials | A colour-coded three-page teaching aid (.htm, .pdf, .md); the run sheet updated | C |

## 2. Verification

Every repo gate in `MAINTAINING.md` that runs without the skill; the three earlier change
folders' `checks.mjs`; this change's `checks.mjs`; the console acceptance suite on all three
lessons; a Playwright click-through of every section at 1280 and 380 px with Shift+U on and off;
the teaching aid rendered to PDF with no page overflowing.
