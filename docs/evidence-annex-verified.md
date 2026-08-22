Session 0.1 evidence annex, verified 2026-08-20
Companion to session-0-1-BUILD-SPEC.md. This file closes both blocking evidence gaps named in spec s10, corrects three items in the spec, and adds four findings that materially improve sections 6, 7, and 10.
Read this after the build spec and before writing any HTML. Where the two disagree, this file wins, because it is later and sourced.

A. Blocking gap 1: CLOSED. src-memory fetched in full
Source: "Use Claude's chat search and memory to build on previous context", support.claude.com article 11817273. Fetched in full 2026-08-20. Page states "Updated today". Confidence upgraded from M to H.

A1. The finding that changes the lesson: two memory experiences are live right now
Anthropic is mid-migration between a new memory experience and a legacy one.
New experience: the toggles live at Settings > Memory. Default for new users. Free, Pro, and Max are being migrated.
Legacy experience: the toggles live at Settings > Capabilities. Team and Enterprise plans stay on legacy for now; admins get rollout information later.
The article's own instruction is to look at which one you see and read the matching section.
Why this matters more than any other item in the annex. Spec s10 open item 3 flagged the conflicting navigation paths as a possible documentation error requiring a live UI walk. It is not an error. It is a live A/B migration, and the room will be looking at two different UIs on their own screens while you teach. Teach it as a feature of the surface rather than being caught by it. The s0 cold open is the natural place to have people report which one they see, which also gives you a live count of who is on Team versus personal accounts.
Behavioural difference worth naming: the new experience writes and updates memory entries in real time as you chat, organised into categories. The legacy experience builds a synthesis updated every 24 hours. Same feature name, materially different latency.

A2. Incognito on Team and Enterprise. CONFIRMED, and stronger than the spec assumed
Verbatim substance, appearing in both the new and legacy sections of the article: on an Enterprise or Team plan, incognito chats are included in standard data exports and follow the organisation's data retention policies.
Enterprise-owner section adds: incognito chats do not contribute to memory and are not visible in users' chat histories, but they remain available to Owners through data export and are retained for at least 30 days for safety purposes.
The s6 landmine chip and the s10 discussion complication both hold. Chip them H.

A3. New finding: Team plans have no organisation-level memory controls
Verbatim substance: Team plans do not have organisation-level controls for memory features; individual Team members manage their own memory settings directly. Enterprise Owners do have an org-wide toggle, enabled by default, and disabling it permanently deletes all memory data for every user in the organisation.
This reshapes the s10 discussion block. Position A ("turn memory off firm wide") is not administratively enforceable on a Team plan at all. It is a training-and-supervision policy wearing an IT-control costume. Either:
Use it as the complication in place of the incognito one if RWP is on Team, or
Keep incognito as the complication and add this as a second prepared case line for position B, which is the stronger design because it gives position B a fact position A cannot answer.
Do not resolve this in the build. It depends on RWP's plan tier, which is Jared's to state.

A4. Other H facts now available for sections 5, 6, and the inspector
Fact | Where it lands
Searching past chats is paid plans only (Pro, Max, Team, Enterprise), web, Desktop, Mobile | s6 chip
Past-chat search uses RAG and appears as tool calls in the conversation | s5 ladder, s9 forensics signal
Search scope: all chats outside projects; inside a project, that project only | s6 chip, inspector project axis
Search past chats is enabled by default once rolled out | s6, and the inspector's default state
Memory is not available in Cowork | s6.3 surface enumeration
Enterprise CMEK blocks past-chat search entirely (content is encrypted) | s6 chip, strong RIA relevance
Pause keeps memory but stops use and creation; chats during a pause are never retro-summarised | s6 landmine 2, confirmed
Reset permanently deletes all memories including project memories, not undoable | s6
Deleting a conversation does not remove memory entries generated from it (new experience) | New s6 landmine candidate. This is counterintuitive and consequential
All memory data is included in data exports | s10
Individual user memory edits are not audit-logged; org toggle changes are | s10, compliance-relevant
Recommended s6 change: promote "deleting a chat does not delete the memory made from it" to the third designed landmine, and demote the project-knowledge-file chip to an ordinary item. It is a sharper trap and it is newly verified.

B. Blocking gap 2: CLOSED. src-plugins verified
Source: "Use plugins in Claude", support.claude.com article 13837440, retrieved 2026-08-20. Confidence upgraded from UNVERIFIED to H. Note: retrieved via search result content rather than a full page fetch, so re-confirm the two starred items below at the page before they go on screen.
Fact | Confidence
Plugins are available on all paid plans (Pro, Max, Team, Enterprise) | H
A plugin bundles skills, connectors, and sub-agents into one installable package | H
Usable in chat on the web, the Chat tab in Claude Desktop, and Claude Cowork | H
Bundled skills work in all three surfaces. Hooks and sub-agents run only in Cowork and appear greyed out in chat. | H
Anthropic ships built-in marketplaces. Knowledge Work is added by default; Financial Services and Legal can be added. Marketplaces can also be added from a GitHub repository | H*
"Customize" on an installed plugin opens a Cowork task to adjust its skills and connectors | H*
A "Plugin Create" plugin walks through building one from a template | H*

B1. The finding that generalises section 4
Hooks and sub-agents are greyed out in chat because they only run in Cowork.
This is the same mechanic as the s4 illegal-state matrix, one level up: a capability exists, is installed, is visible, and is unavailable because of the surface you are on. Section 7 should say so explicitly and point back at s4. It converts "illegal states" from a model-menu quirk into a general property of the product, which is the transferable claim.
Add a surface chip to the s7 sorter (chat / Cowork / both) rather than adding surface as an inspector axis. Spec s6.3 rejected surface as an axis on state-space grounds and that decision stands.

B2. Direct relevance to this audience
There is a Financial Services marketplace. Put it on screen. It is the shortest path from "here is a product concept" to "here is the thing you would install on Monday," and it makes the plugin section concrete for an RIA room in a way a generic example cannot.

B3. Supply chain, flagged not asserted
Plugin marketplaces can be added from arbitrary GitHub repositories, and third-party security research exists on malicious marketplace plugins in Claude Code. Anthropic ships skill and plugin scanning for Enterprise (support article 15927065, title and URL confirmed, body not read).
Do not build a security claim into the lesson from this annex. One line is defensible: installing a plugin from an arbitrary marketplace is installing third-party code, and Enterprise has a scanning control for exactly that. Anything beyond that sentence needs the scanning article fetched and a .verify gate, because it becomes a compliance characterisation.

C. Corrections to session-0-1-BUILD-SPEC.md
C1. Directory name. The spec's recommendation was wrong. Corrected here
Spec PA-1 recommended directory session-0-1/ on the assumption that new_session.py types --n as an integer. It does not. Read at source:
ap.add_argument("--n", required=True)          # no type=, so it is a string
out_dir = a.repo / f"session-{a.n}"
html = (html.replace("Session N | Working Skeleton", f"Session {a.n} | {a.title}")
            .replace("Session N", f"Session {a.n}") ...)
--n 0.1 therefore produces session-0.1/index.html and substitutes "Session 0.1" into the title, the topbar, the eyebrow, and the footer, with zero hand-fixing. It also emits a hub card pointing at session-0.1/ and a matching CHANGELOG stub.
Use --n 0.1. V10 still passes: it captures 0 from the title and finds Session 0 in the footer at a word boundary.
One unverified item. A path segment containing a dot on GitHub Pages. .nojekyll is present so no Jekyll filtering applies, and /session-0.1/ should resolve to its index.html. Confidence M. Smoke-test it on the first push before building twelve sections into it. If it fails, fall back to --n 0-1 and hand-fix the four "Session 0-1" strings to "Session 0.1".

C2. Spec s10 open item 3 is resolved, not outstanding
The conflicting settings paths were a live migration (A1), not a documentation defect. The live UI walk is still worth doing, but its purpose changes: you are recording which experience your own account is on, so the lesson can name both.

C3. Spec s8 s6 landmine set
Replace landmine 3 (project knowledge file) with "deleting a conversation does not delete the memory generated from it" per A4. Keep the project-knowledge chip as an ordinary sorter item; the stored-versus-in-context distinction is still worth teaching, it just is not a trap.

D. Source ledger delta
Key | Before | After
src-memory | M, snippets only | H, article 11817273 fetched in full 2026-08-20
src-plugins | UNVERIFIED | H, article 13837440 retrieved 2026-08-20, three items starred for re-confirmation
src-scanning | not in ledger | NEW, UNVERIFIED. Article 15927065, title and URL confirmed only. Needed only if B3's one line ships
src-routing | UNVERIFIED | Unchanged. Optional, only if s2 covers safeguards routing

Blocking items remaining before EXECUTE: zero on evidence. The remaining prerequisites are the three probe captures (a human task) and the seven decisions in spec s16.
