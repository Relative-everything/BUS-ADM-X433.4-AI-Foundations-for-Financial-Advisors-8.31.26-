# The 157 findings, and what was done with each

Six finders ran in parallel over `session-3/index.html` on 2026-09-19 (lenses: instructor-addressed
text, case dependence, contradictions, simplification, presuppositions, mechanics), returning 157
findings. Twenty-four were verified by three adversarial verifiers each before the run's spend limit
stopped it (72 verdicts; every one kept except the three on finding 11 and two on finding 21); the
rest were curated by hand against the same constraints, and the whole diff was then reviewed by six
independent reviewers with one refuter per finding (see `handback.md`). Decisions: accepted (as the
ledger item named), partly, rejected (with the reason). Raw findings and verdicts are in the
workflow journal, not in the repository.

| # | Lens | Section | Anchor | Decision | Item | Note |
|---|---|---|---|---|---|---|
| 0 | instructor | s12 | `This section characterises recording law and a professional duty. Veri` | accepted | SM-002 |  |
| 1 | instructor | caseModal | `<div class="verify"><span class="vh">Requires instructor verification ` | accepted | SM-003 |  |
| 2 | instructor | caseModal | `Generated from <b>CASE.md</b>, the canonical fact set for the course c` | accepted | SM-004 | own wording |
| 3 | instructor | caseModal | `Nothing between the sentinels below is edited by hand: the master is e` | accepted | SM-004 | own wording |
| 4 | instructor | s10 | `The excerpt is CASE.md Part O; it presupposes an advisory engagement t` | accepted | SM-006 |  |
| 5 | instructor | sChk | `The summary lines are written for this lesson from CASE.md Part O; lin` | accepted | SM-007 | amended: the label stays, the line numbers go |
| 6 | instructor | s15 | `<li><b>The protocol.</b> Commit before anyone speaks; two speakers per` | accepted | SM-008 | the verifiers' amended wording |
| 7 | instructor | s15 | `Your first vote locks. The room distribution stays hidden until after ` | accepted | SM-008 |  |
| 8 | instructor | s15 | `<span class="do">Locked vote: commit before discussion</span>` | accepted | SM-008 |  |
| 9 | instructor | script | `<span class="hd">Defence phase: 7 to 9 minutes, minority called first<` | accepted | SM-008 |  |
| 10 | instructor | script | `Locked. You cannot change this one. The room distribution stays hidden` | accepted | SM-008 |  |
| 11 | instructor | sOff | `Tonight everyone's source is the &sect;07 summary, repeated below.` | rejected |  | three verifiers refuted it: the sentence holds for a reader alone, and "Tonight" is a 09-18 decision a check asserts |
| 12 | instructor | sOff | `No claim is made about any vendor's in-application assistant; the patt` | accepted | SM-009 | two of three verifiers kept it |
| 13 | instructor | sPrep | `[Not included, on purpose: any fact about the client. The questionnair` | accepted | SM-010 | superseded by 96: the hint is deleted, not unbracketed |
| 14 | case | s1 | `Case facts, top right.</li> </ul>` | accepted | SM-011 | own four-line, figure-free wording; verified 3 of 3 as a must |
| 15 | case | s4 | `<p class="hint">Say the number of the passage you think should win. Pi` | accepted | SM-012 | amended; verified 3 of 3 as a must |
| 16 | case | script | `trust:'One word apart in text, opposite on the only property that matt` | accepted | SM-013 | the verifiers' amended wording, no IDGT |
| 17 | case | script | `vote:'The entire discount on the transferred interest rests on which o` | accepted | SM-013 |  |
| 18 | case | script | `w:'Different actors. Retrieval collapses them because they appear in i` | accepted | SM-013 | the unsupported clause is dropped rather than rewritten |
| 19 | case | script | `w:'Two valuation standards, each with its own triggering event. This i` | accepted | SM-013 |  |
| 20 | case | script | `{t:'voting interest / non-voting interest',k:'gov',w:'Same asset, diff` | accepted | SM-013 | the reader verifier's wording |
| 21 | case | script | `A note that records the decision to sell and nothing about the gift th` | rejected |  | two of three verifiers refuted it: the sentence before frames the gift as an alternative considered, and §10 line 3 says the same |
| 22 | case | s9 | `<p class="hint">Each stage: what the tool does, the check before it mo` | accepted | SM-014 | in substance: the question becomes the stage first seen at an examination, so the answer stays 5 and the aid holds |
| 23 | case | script | `v:'Visible at follow-up, to David, who already said the appraisal look` | accepted | SM-014 | the reader verifier's wording |
| 24 | case | script | `{t:'Update the review letter’s figures and the three decisions from th` | accepted | SM-009 | amended: the open points from the meeting |
| 25 | case | script | `{t:'Decide whether to recommend a sale or a gift of the units',k:'none` | accepted | SM-009 | amended: a gift to the trust |
| 26 | case | s12 | `<li><b>Confidentiality.</b> The Cole file holds something Nathan must ` | accepted | SM-016 | amended |
| 27 | case | script | `the clause about Nathan, which reads as personal colour and is the one` | accepted | SM-015 | the mechanics wording with "their son" added; the term standing instruction kept, SM-024 |
| 28 | case | s10 | `<span class="hd">Synthetic meeting excerpt, Cole annual review, no rea` | accepted | SM-015 |  |
| 29 | case | script | `val:'Two valuation standards with different triggering events. Substit` | accepted | SM-013 |  |
| 30 | case | script | `{t:'We recommended a sale to the trust rather than a gift, having cons` | accepted | SM-017 | merged: an outright gift, the reason noted in the file, Meg asked what it does to the timing |
| 31 | case | script | `Meg authorised the seed gift to the trust."',` | rejected |  | the §00 panel now defines the seed gift |
| 32 | case | caseModal | `Generated from <b>CASE.md</b>, the canonical fact set for the course c` | accepted | SM-004 | own wording |
| 33 | case | caseModal | ` fails the build if any copy has drifted. The same block appears in ev` | accepted | SM-004 | own wording |
| 34 | case | s10 | `The excerpt is CASE.md Part O; it presupposes an advisory engagement t` | accepted | SM-006 |  |
| 35 | case | sChk | `The summary lines are written for this lesson from CASE.md Part O; lin` | accepted | SM-007 | amended: the label stays, the line numbers go |
| 36 | case | script | `w:'Different instruments performing in identical sentence frames. Both` | accepted | SM-013 | shortened |
| 37 | case | script | `out:function(){var h='';T.forEach(function(t,i){h+='[0'+i+':'+(i?'4':'` | accepted | SM-015 | [0i:00] stamps |
| 38 | case | script | `{t:'The Cole file: nine documents',k:'fit',` | rejected |  | reconciled in §03 instead (SM-012) |
| 39 | contradiction | script | `Update the review letter’s figures and the three decisions from the me` | accepted | SM-009 | amended: the open points from the meeting |
| 40 | contradiction | script | `Arrange the appraisal review. Owner: you. Date: before any document is` | accepted | SM-015 |  |
| 41 | contradiction | script | `h+='[0'+i+':'+(i?'4':'0')+'] '+turn(i)+'<br>'` | accepted | SM-015 | [0i:00] stamps |
| 42 | contradiction | caseInner | `Generated from <b>CASE.md</b>, the canonical fact set for the course c` | accepted | SM-004 | own wording |
| 43 | contradiction | caseInner | ` The same block appears in every session.</p>` | accepted | SM-004 | own wording |
| 44 | contradiction | s10 | ` The excerpt is CASE.md Part O; it presupposes an advisory engagement ` | accepted | SM-006 |  |
| 45 | contradiction | sChk | `The summary lines are written for this lesson from CASE.md Part O; lin` | accepted | SM-007 | amended: the label stays, the line numbers go |
| 46 | contradiction | script | `We recommended a sale to the trust rather than a gift, having consider` | accepted | SM-017 | merged: an outright gift, the reason noted in the file, Meg asked what it does to the timing |
| 47 | contradiction | script | `A note that records the decision to sell and nothing about the gift th` | rejected |  | two of three verifiers refuted it: the sentence before frames the gift as an alternative considered, and §10 line 3 says the same |
| 48 | contradiction | script | `One decision per slide keeps it checkable.` | accepted | SM-009 |  |
| 49 | contradiction | s4 | `an unsigned memo and two unsigned drafts. Ten passages.</li>` | accepted | SM-012 | amended |
| 50 | contradiction | s6 | `That formula is for a death or a disability, not a sale to a trust.` | accepted | SM-019 |  |
| 51 | contradiction | s9 | `Say the number of the stage whose skipped check is found last.` | accepted | SM-014 | in substance: the question becomes the stage first seen at an examination, so the answer stays 5 and the aid holds |
| 52 | contradiction | s12 | `For each Cole item: send as is, strip something first, or never.` | accepted | SM-016 |  |
| 53 | contradiction | script | `Retrieval collapses them because they appear in identical sentence fra` | accepted | SM-013 | the unsupported clause is dropped rather than rewritten |
| 54 | contradiction | script | `the one document that held the right answer, the appraisal, ranked thi` | accepted | SM-008 |  |
| 55 | presuppose | script | ` b.textContent='Preset '+(i+1);` | accepted | SM-012 | amended; verified 3 of 3 as a must |
| 56 | presuppose | s4 | `Say the number of the passage you think should win. Pick a preset, rea` | accepted | SM-012 | amended; verified 3 of 3 as a must |
| 57 | presuppose | s1 | `Will, trust, buy-sell, appraisal, unsigned drafts. Case facts, top rig` | accepted | SM-011 | own four-line, figure-free wording; verified 3 of 3 as a must |
| 58 | presuppose | s11 | `Name the segment you sit in and whether its adoption rate matches your` | accepted | SM-020 |  |
| 59 | presuppose | sChk | `Find both planted errors, then say which one your own tool would have ` | accepted | SM-020 |  |
| 60 | presuppose | sRag | `Place all six sets, then say which one your own practice is.` | accepted | SM-020 |  |
| 61 | presuppose | script | ` var MEET=[{k:'first',t:'First meeting with a new client'},{k:'review'` | accepted | SM-010 |  |
| 62 | presuppose | sPrep | `Build the prompt for your next meeting and copy it out; this page keep` | accepted | SM-010 | amended: the next meeting you will prepare for |
| 63 | presuppose | sPrep | `The prompt assembles below; copy it into your own tool.` | accepted | SM-010 |  |
| 64 | presuppose | s10 | `Open all four stages, then copy the instruction into your own tool.` | accepted | SM-015 | amended |
| 65 | presuppose | s13 | `Copy it into your own tool after a meeting.` | accepted | SM-017 |  |
| 66 | presuppose | s13 | `Place the six lines. Then run the prompt on the last meeting you wrote` | accepted | SM-017 |  |
| 67 | presuppose | sOff | ` <li>Paste into Claude and send.</li>` | accepted | SM-009 | folded into step 3 so the panel keeps four steps |
| 68 | presuppose | sOff | `<li>Read it against the summary above. Then, in chat, one line: usable` | rejected |  | room-first phrasing, decided 09-18 (flag 14); the panel is read aloud as printed |
| 69 | presuppose | s15 | `&sect;04 supplied evidence for this side; you supplied evidence for th` | accepted | SM-008 |  |
| 70 | presuppose | script | `You did exactly this in §03 and found Article VII.` | accepted | SM-008 |  |
| 71 | presuppose | s15 | `Your first vote locks. The room distribution stays hidden until after ` | accepted | SM-008 |  |
| 72 | presuppose | script | ` if(n===CKL.length&&typeof mark==='function')mark('g12');` | accepted | SM-018 | on copy rather than on the first tick |
| 73 | presuppose | s12 | `Answer all four items. Name your own state's rule.` | accepted | SM-016 |  |
| 74 | presuppose | s12 | `Your firm has a contracted documentation vendor. For each Cole item: s` | accepted | SM-016 |  |
| 75 | presuppose | sVend | `Build the email for the tool you use or are considering, and send it.` | accepted | SM-020 |  |
| 76 | presuppose | script | `v:'Visible at follow-up, to David, who already said the appraisal look` | accepted | SM-014 | the reader verifier's wording |
| 77 | presuppose | s1 | `Four checks, no notes. Say the four letters in the order you would run` | accepted | SM-011 |  |
| 78 | presuppose | s11 | `<li><b>Kitces, autumn 2024.</b> The most-adopted tool, Zoom's AI Compa` | accepted | SM-020 | with the lede reworded so the prediction is live |
| 79 | simplify | s10 | `The excerpt is CASE.md Part O; it presupposes an advisory engagement t` | accepted | SM-006 |  |
| 80 | simplify | sChk | `The summary lines are written for this lesson from CASE.md Part O; lin` | accepted | SM-007 | amended: the label stays, the line numbers go |
| 81 | simplify | script | `out:function(){var h='';T.forEach(function(t,i){h+='[0'+i+':'+(i?'4':'` | accepted | SM-015 | [0i:00] stamps |
| 82 | simplify | s4 | `<li><b>Where it fails.</b> The tool reads only what the ranker hands i` | accepted | SM-012 |  |
| 83 | simplify | s4 | `<p class="big">Retrieval-augmented generation, RAG: the model answers ` | accepted | SM-012 |  |
| 84 | simplify | s1 | `Grounding makes the model cite your sources. The nearest passage is no` | rejected |  | the lede keeps the session's word; it is defined in the Tonight bullet and §03 |
| 85 | simplify | s4 | `<li><b>Index.</b> Each passage gets a numeric fingerprint, the kind §0` | accepted | SM-012 |  |
| 86 | simplify | s4 | `<li><b>Rank.</b> Your question gets the same fingerprint, and the pass` | accepted | SM-012 |  |
| 87 | simplify | s6 | `<li><b>In the Cole file.</b> Preset 1 in §03: fully cited, quotes Arti` | partly | SM-019 | the entity is fixed; the two sentences stay, they are the section's thesis |
| 88 | simplify | s15 | `<p class="hint">Your first vote locks. The room distribution stays hid` | accepted | SM-008 |  |
| 89 | simplify | script | `<span style="color:#6F7B78">Locked. You cannot change this one. The ro` | accepted | SM-008 |  |
| 90 | simplify | s15 | `<li><b>The protocol.</b> Commit before anyone speaks; two speakers per` | accepted | SM-008 | the verifiers' amended wording |
| 91 | simplify | script | `<span class="hd">Defence phase: 7 to 9 minutes, minority called first<` | accepted | SM-008 |  |
| 92 | simplify | script | `Zero delta. That is a finding, not a failure: it means a position held` | accepted | SM-008 |  |
| 93 | simplify | script | `the two Advisor questions, and, in a tool with no standing instruction` | partly | SM-015 | the sentence is split; the term is kept and defined once (SM-024) |
| 94 | simplify | script | `{g:'Before',t:'The standing instruction tells the tool what to extract` | rejected | SM-024 | reversed: the term is kept and defined at its introduction; replacing it broke the 09-18 check FF-004 |
| 95 | simplify | s10 | `Say the number of the turn that holds the one thing the file most need` | accepted | SM-015 |  |
| 96 | simplify | sPrep | ` <p class="hint" style="margin-top:10px">[Not included, on purpose: an` | accepted | SM-010 |  |
| 97 | simplify | s9 | `<p class="hint">Each stage: what the tool does, the check before it mo` | accepted | SM-014 | in substance: the question becomes the stage first seen at an examination, so the answer stays 5 and the aid holds |
| 98 | simplify | sRag | `<li><b>Paste or attach the documents</b> when the whole set fits. Ever` | accepted | SM-020 |  |
| 99 | simplify | sRag | `<li><b>Use a retrieval tool</b> when the set is far bigger than one pr` | accepted | SM-020 |  |
| 100 | simplify | sRag | `<li><b>Either way, tell it to answer only from the documents</b> and t` | accepted | SM-020 |  |
| 101 | simplify | sRag | `<li><b>The context window</b> is the model's working space for one exc` | accepted | SM-020 |  |
| 102 | simplify | sRag | `<p class="hint">Six document sets. Place each. The sizes are rough, an` | accepted | SM-020 |  |
| 103 | simplify | s11 | `<li><b>Kitces, autumn 2024.</b> The most-adopted tool, Zoom's AI Compa` | accepted | SM-020 | with the lede reworded so the prediction is live |
| 104 | simplify | s11 | `<b>Work along</b>Name the segment you sit in and whether its adoption ` | accepted | SM-020 |  |
| 105 | simplify | s4 | `<p class="hint">Say the number of the passage you think should win. Pi` | accepted | SM-012 | amended; verified 3 of 3 as a must |
| 106 | simplify | s2 | `<li><b>Company, not meaning.</b> The numbers measure how similar the s` | accepted | SM-013 |  |
| 107 | simplify | s2 | `<li><b>The Cole hazard.</b> The documents use near-identical language ` | rejected |  | §03 defines retrieval one section later |
| 108 | simplify | script | `Retrieval collapses them because they appear in identical sentence fra` | accepted | SM-013 | the unsupported clause is dropped rather than rewritten |
| 109 | simplify | script | `trust:'One word apart in text, opposite on the only property that matt` | accepted | SM-013 | the verifiers' amended wording, no IDGT |
| 110 | simplify | script | `put the whole file in the prompt rather than build a retrieval pipelin` | accepted | SM-019 |  |
| 111 | simplify | sOff | `<li><b>Ask for the change marked,</b> not silently made.</li>` | rejected |  | the three §08 rules are named by the run sheet |
| 112 | simplify | sOff | `<li><b>Check every number against the source</b> before the file goes ` | rejected |  | the three §08 rules are named by the run sheet |
| 113 | simplify | s13 | `<li><b>Written on the day,</b> the basis is worth keeping. Rebuilt aft` | rejected |  | the instructor's worksheet names "written on the day" as the bullet to land |
| 114 | simplify | s13 | `<h4 style="margin-top:26px">A prompt that builds the basis by asking y` | rejected |  | FF-009 named the technique on purpose |
| 115 | simplify | s10 | `<li><b>Why the category exists.</b> The average advisor spends more th` | accepted | SM-015 |  |
| 116 | simplify | sPrep | `<li><b>Pick the areas</b> the meeting has to cover. The assistant draf` | accepted | SM-010 |  |
| 117 | simplify | script | `The 2023 appraisal, the one document that actually prices the company,` | rejected |  | the run sheet and the aid speak "third at 3.3" as a cue |
| 118 | simplify | script | `fb:{never:'Correct, and it is the item built to split the room.` | accepted | SM-016 |  |
| 119 | simplify | s1 | `<li><b>Tonight.</b> Hand it your own documents, require it to answer f` | accepted | SM-011 |  |
| 120 | mechanics | caseModal | `<p class="dim" style="font-size:15px">Generated from <b>CASE.md</b>, t` | accepted | SM-004 | own wording |
| 121 | mechanics | s10 | `The excerpt is CASE.md Part O; it presupposes an advisory engagement t` | accepted | SM-006 |  |
| 122 | mechanics | sChk | `The summary lines are written for this lesson from CASE.md Part O; lin` | accepted | SM-007 | amended: the label stays, the line numbers go |
| 123 | mechanics | script | `var W=$('mapWrap'),O=$('mapOut');` | accepted | SM-021 |  |
| 124 | mechanics | script | ` O.className='mpanel has';O.innerHTML=h; } [].slice.call(W.querySelect` | accepted | SM-021 |  |
| 125 | mechanics | script | `var P=$('qPresets'),Q=$('qBox'),O=$('qOut'),V=$('qVer'),cur=-1;` | accepted | SM-021 |  |
| 126 | mechanics | script | `b.onclick=function(){cur=i;Q.value=p.q;[].slice.call(P.children).forEa` | accepted | SM-021 |  |
| 127 | mechanics | script | ` showSlope(); }; B.appendChild(b)});` | accepted | SM-021 |  |
| 128 | mechanics | script | ` showRevote(); }; RB.appendChild(b)});` | accepted | SM-021 |  |
| 129 | mechanics | script | `h+='[0'+i+':'+(i?'4':'0')+'] '+turn(i)+'<br>'` | accepted | SM-015 | [0i:00] stamps |
| 130 | mechanics | script | `esc(items[sel].t)+' Now click the bucket it belongs in.</span>'` | accepted | SM-021 |  |
| 131 | mechanics | script | `'<br><br><span class="flag">Dropped as conversational:</span> the two ` | accepted | SM-015 | the mechanics wording with "their son" added; the term standing instruction kept, SM-024 |
| 132 | mechanics | sOff | `<div class="eyebrow"><span>08 &middot; In the files you already use</s` | rejected |  | moves the minute regions and the planned figure the run sheet's clock is built on |
| 133 | mechanics | sVend | ` 'Can we delete a client’s recordings on request, and how is the delet` | rejected | SM-020 | retitled to the eight questions it holds rather than cut to five |
| 134 | mechanics | sVend | ` 'Which other companies process the content on your behalf?', ` | rejected | SM-020 | retitled to the eight questions it holds rather than cut to five |
| 135 | mechanics | s11 | `Name the segment you sit in and whether its adoption rate matches your` | accepted | SM-020 |  |
| 136 | mechanics | s15 | `Your first vote locks. The room distribution stays hidden until after ` | accepted | SM-008 |  |
| 137 | mechanics | script | `Locked. You cannot change this one. The room distribution stays hidden` | accepted | SM-008 |  |
| 138 | mechanics | s2 | `Sort all six pairs, then open the key and argue with it.` | accepted | SM-013 |  |
| 139 | mechanics | s4 | `Each passage gets a numeric fingerprint, the kind §01 showed.` | accepted | SM-012 |  |
| 140 | mechanics | s6 | `<li><b>In the Cole file.</b> Preset 1 in §03: fully cited` | accepted | SM-019 |  |
| 141 | mechanics | s12 | `<p class="src">18 U.S.C. § 2511, the federal one-party floor` | accepted | SM-016 |  |
| 142 | mechanics | s11 | `id="s11" data-nav="C3 · Adoption"` | accepted | SM-020 |  |
| 143 | mechanics | s15 | `id="s15" data-nav="C4 · Discussion"` | accepted | SM-020 |  |
| 144 | mechanics | s1 | `<div class="eyebrow"><span>BUS ADM X433.4 · Session 3</span>` | accepted | SM-020 |  |
| 145 | mechanics | sOff | `<span class="nil">Click a task, then a column.</span>` | accepted | SM-009 |  |
| 146 | mechanics | s1 | `<span class="do">Retrieval bridge` | rejected |  | the run sheet and the component name say retrieval bridge; a vocabulary change four days out |
| 147 | mechanics | s13 | `<button class="btn" id="copyBtn">Copy prompt</button>` | accepted | SM-017 |  |
| 148 | mechanics | s15 | `<span class="do">Locked vote: commit before discussion</span> <h4>Vote` | accepted | SM-008 |  |
| 149 | mechanics | s1 | `<h4>Session 2 recall: the citation-verification order</h4>` | accepted | SM-011 |  |
| 150 | mechanics | sPrep | `[Not included, on purpose: any fact about the client. The questionnair` | accepted | SM-010 | superseded by 96: the hint is deleted, not unbracketed |
| 151 | mechanics | script | `{l:'Westlaw AI-AR, grounded',v:33,c:'#9A4B22'}` | accepted | SM-019 |  |
| 152 | mechanics | script | `a real, current, correctly-read authority` | accepted | SM-011 |  |
| 153 | mechanics | script | `'Kind regards, [Adviser]',` | accepted | SM-009 |  |
| 154 | mechanics | s4 | `6 minutes</span> <h4>The Retriever on the Cole Document Set</h4>` | rejected |  | the label carries a counted em dash and the timer is a planned figure |
| 155 | mechanics | sVend | `<span>Appendix A5 &middot; Due diligence</span>` | rejected |  | verify-migration passes; "due diligence" is not Tier B language |
| 156 | mechanics | script | `'Subject: Due diligence questions before we pilot your note-taker\n\nB` | rejected |  | verify-migration passes; "due diligence" is not Tier B language |
