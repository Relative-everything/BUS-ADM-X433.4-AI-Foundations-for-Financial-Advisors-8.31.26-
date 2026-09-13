# Session 2 manual-pass notes, verbatim (batch 1, 2026-09-13, from chat)
Transcribed as written, one bullet per line; typos kept. Redactions under kickoff K3: none needed (no learner name, no platform name, no retired string).

I am going to do this concurrently as i write the updated, so first implement these changes - it is largely removing useless filler text taht does not add to teh session: Overall updates:
* Remove the "shift + U" to reveal - there is nothing hidden anymore
* Remove ALL of this worthless/chaff text:
   * "The Cole household
   * Synthetic case — teaching anchor only
   * One fabricated household carries every client example. It is not your final-project dataset: Part 1 runs on a real recurring task from your own practice, with your own synthetic or de-identified data.
   * Household
   * Meg and David Cole, Barrington Hills, Illinois
   * Meg runs Cole Precision Components Inc.; David is a retired hospital pharmacist. US citizens, Illinois-domiciled for life, no liabilities. Balance sheet in the case panel.
   * The asset
   * CPC stock: one asset, most of the estate
   * A Rockford C-corporation paying its sole shareholder a large dividend every year. Meg bought every share from her father, Walter Hensley, so her basis is what she paid. A competitor has made an unsolicited written inquiry; no letter of intent is signed, and Nathan Cole, in CPC operations, has not been told.
   * The structure
   * Non-voting LLC units to be moved to a grantor trust
   * A seed gift of non-voting units, then a sale of a much larger block to the same trust for an interest-only demand note, at a discount with no appraisal and no appraiser engaged. Illinois imposes its own estate tax at a threshold neither indexed nor portable; neither spouse has engaged with it.
   * The question every session works on
   * How much of the note does she call this year?
   * Meg is short $522,086 a year from year 6 while the structure performs exactly as designed. Each $1,000,000 she calls permanently removes $38,200 of future interest, so the gap widens by 3.82% of every call. What does calling it cost her in every year after, and when is a different lever the better answer? No session answers it.
   * Every figure in these cards is the case file's; the household is constructed L.
   * Outcome 01 / A working model of sampling / Why the same prompt returns different text, and what that does to an audit trail.
   * Outcome 02 / A tier-selection rule / Cost per finished task, benchmarked, rather than cost per token.
   * Outcome 03 / Your own prompts, scored and rewritten / Three templates, yours or the workshop's, scored element by element; the weakest rebuilt in place.
   * Outcome 04 / A citation verification routine / Four checks, in order, applied to tax authority you did not write.
   * Nine terms this session uses before it defines them / Token: the unit a model reads and writes, roughly three quarters of a word; prices and context limits are counted in it. Temperature: the setting that decides how often the model picks a lower-ranked next word instead of the top one. Persona, Task, Context, Format: the four parts of a prompt, who the model writes as, what it does, what it may use, and what shape comes back. Template: a prompt written so that a second person can run it on a new input without asking you anything. Grounded: an answer built only from a named source the model was given to read, so each claim can be checked against that source. Tier: a model size and price class; the choice is made on cost per finished task, not cost per token. Baseline: how long the task takes you today, unassisted, recorded before any tool touches it. IDGT, intentionally defective grantor trust: a trust drafted so that the grantor stays liable for its income tax while the trust, not the grantor, is intended to own what it holds. Non-voting units and a demand note: the LLC interests being sold carry economics but no vote, and the buyer's note can be called for its principal at any time.
   * Before we start / Open the AI tool you subscribed to, in a new tab, now. Every section below has something to run.
   * Open the three prompt templates you wrote — or use the three supplied in section 04, the workshop.
   * · Work along / Answer all four bridge items and commit each before revealing anything."
* Change "the last prompt you sent" box - it should JUST say: the last prompt you sent> (box for input)>analyze what ZI typed. Remove all of this text:
   * First run. Keep the result on screen; Session 3 runs the same field and the drift between the two is the measurement.
   * · Work along / Paste your last prompt and run the analysis. Keep it on screen — the comparison across sessions is the point.
* APPENDIX BOX :
   * On the appendix box that starts with "how this session is paced" - remove all the text excet the interactive buttons of foundations/standard/advanced/core only and the estaimted timing per the 11 core/5 appendix/everything. So this how the session is paced box should cut ALL of this text:
      * "Two ways through this session. The core is 11 sections and about 69 minutes. It stands on its own: nothing in the core depends on the appendix, so reading those sections in order gives you the whole argument.The 5 appendix sections add 81 minutes of optional depth, 150 minutes for everything. Each one is placed in the core at the point it belongs rather than at the back of the file, so you can carry straight on into it and then pick up where you left off. The gold cards under Appendix contents link to each one, and the depth control above sets how many are showing; anything hidden leaves a stub naming what it was, so you can always see what you skipped. They also read on their own afterwards. Core only — appendix hidden. 69 core minutes"
* Retrieval bridge:
   * Either completely remove OR Totally redo this and replace all the questions, only have 3 questions - focus on the topics I covered specifically in lesson 1 per hte transcript
      * 1 question on tokens - either what they cost or just what are they
      * 1 question on context - what gets sent along with the text int he context window of a prompt
      * 1 question on when to start a new chat - make sure this actually has evidence to support why/when to start a new chat
