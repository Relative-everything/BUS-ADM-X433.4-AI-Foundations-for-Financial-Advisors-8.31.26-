# Feasibility: a live Gemini API inside the lesson pages

Analysis date: 2026-08-22. Author: analysis run against the repository at
`claude/gemini-api-integration-analysis-5z6yrb`.

**Question asked.** Can a live Gemini API be wired into the course site using
Google's free tier, on a Google account created solely for the course, so that
students get Gemini Flash inside the lesson pages?

**Short answer.** The wire protocol works and needs no backend — that part is
genuinely easy, and I verified it. The shared-key-for-the-class part is the
problem. It breaks four things at once: a repository invariant, a promise made
to students in the README, the exact rule Session 4 teaches with an H chip, and
a quota Google cut by 92% overnight nine months ago. **Do not ship the shared
key.** Ship bring-your-own-key instead, which gets you the same pedagogy with
none of the four problems, or run the live model on the projector only.

Confidence chips below follow the course convention: **H** verified directly
against a named primary source or by direct test, **M** single secondary
source, **L** illustrative or contested.

---

## 1. What this build actually is

Established by reading the repository, not assumed:

| Property | Value | Where |
|---|---|---|
| Hosting | GitHub Pages, served from `main`, no build step | `MAINTAINING.md`, `.nojekyll` |
| Server-side code available | None. No `.github/workflows`, no functions | verified, `ls` |
| Lesson structure | One self-contained HTML file per session, all CSS and JS inline | `MAINTAINING.md`, `session-*/index.html` |
| Network calls in lessons today | **Zero.** `fetch(` count is 0 in all six pages | verified by grep |
| Storage in lessons today | **Zero.** No localStorage, sessionStorage, indexedDB, cookies | verified by grep; forbidden by `MAINTAINING.md` |
| Permitted external requests | Google Fonts only, and the maintainer wants to retire even that | `MAINTAINING.md`, "Known follow-ups" |
| Pre-push gate | Fails the build on any external origin that is not fonts | `MAINTAINING.md`, fallback check #3 |

Two of those are hard invariants the repository enforces mechanically, and one
of them — the externals check — would fail on the first commit that adds a
Gemini call. That is a fact about your build, not an opinion about the design.

There is also a student-facing promise, in `README.md` under **Your work is not
saved**:

> These pages store nothing, save nothing, and transmit nothing. There is no
> database behind them and no analytics in them. [...] That is deliberate: no
> client information you paste into an exercise can leak from a page that never
> sends anything anywhere.

A live API call makes the third verb false. That sentence is load-bearing for a
fiduciary audience and it would have to be rewritten, not quietly dropped.

---

## 2. Does the wire protocol work from a static GitHub Pages site?

Yes. Verified by direct test on 2026-08-22, not inferred. **H**

A CORS preflight against the Gemini endpoint, sent with the course's own
origin, returns:

```
HTTP/2 200
access-control-allow-origin: https://relative-everything.github.io
access-control-allow-methods: DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT
access-control-allow-headers: content-type,x-goog-api-key
access-control-max-age: 3600
```

Google echoes back the exact GitHub Pages origin and explicitly permits the
`x-goog-api-key` header. A `POST` to
`v1beta/models/gemini-2.5-flash:generateContent` resolves the route and reaches
key validation, confirming both the endpoint shape and the model name.

So **no proxy, no server, no build step is required** to make the call itself.
A working call is about fifteen lines of plain `fetch` with no SDK, no bundler
and no dependency:

```js
const r = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  { method:"POST",
    headers:{ "Content-Type":"application/json", "x-goog-api-key": key },
    body: JSON.stringify({ contents:[{ parts:[{ text: prompt }] }] }) });
const j = await r.json();
const out = j.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
```

That fits the single-file, no-dependency house style exactly. **The engineering
is not the obstacle.** Everything below is.

---

## 3. The four blockers on the shared-key plan

Ranked by how hard they are to work around.

### Blocker 1 — the free tier trains on what students send, and humans may read it

Google's Gemini API Additional Terms of Service distinguish Unpaid from Paid
Services. On the unpaid quota, which is what a free key gives you: **H**

- Google uses submitted content and generated responses to improve and develop
  Google products and machine-learning technologies.
- Human reviewers may read, annotate and process API input and output.
- Google's own guidance is not to submit sensitive, confidential or personal
  information to the Unpaid Services.
- On Paid Services, prompts and responses are not used to improve products.
- Users in the EEA, Switzerland and the UK get the Paid-Services data terms even
  on the free quota — irrelevant to a Berkeley Extension cohort, but note it if
  anyone takes the course from abroad.

Now put that next to `session-4/index.html` §"Consumer, Professional and
Enterprise Tiers", which teaches, with an **H** chip on a primary vendor
source, that the tier does not change the model, it changes the contract, and
that **for a fiduciary the contract is the only part that matters**. The lesson
tabulates training-on-your-content and retention across consumer versus
commercial tiers and calls a 61× retention spread the consequence of a toggle
nobody opens.

Embedding an unpaid-quota key into the course pages does, at course level,
precisely the thing Session 4 spends a section teaching advisers never to do.
The exposure is not hypothetical: the natural integration point is `#hwRewrite`
in `session-2/index.html`, where the instruction is *"Paste the prompt exactly
as you submitted it"* against **a real recurring task from the student's own
practice**. Some fraction of a room of practising advisers will paste real
client facts into that box no matter what the warning says. Today that is safe
because the page transmits nothing. With a shared free key it would go to an
endpoint whose terms say it may be trained on and read by humans.

This is the blocker that has no engineering workaround. A paid key fixes the
data terms and costs money; nothing else does.

### Blocker 2 — the key is public the moment it ships, and probably dead shortly after

A key in a static page is a published key. Not obscured, not hard to find:
DevTools Network tab, or View Source, or `curl` on the raw file. The repository
is public and the site is public.

Three consequences, all real:

1. **GitHub will likely revoke it for you.** Google API keys are a secret
   scanning partner pattern, and GitHub has had Google secrets push-protected
   by default since the March 2026 coverage update. Partner detections are
   reported straight to the provider for revocation. **M** The plausible
   outcome is that the push is blocked, or the key is auto-revoked within hours
   of going live, and your lesson breaks mid-class rather than at build time.
2. **Referrer restriction is a speed bump, not a control.** You can restrict a
   key to `relative-everything.github.io/*` in the Cloud console. **M** But the
   `Referer` header is set by the client, so `curl -H "Referer: ..."` defeats it
   in one line. It stops casual reuse and nothing else. Note also that a
   referrer-restricted key rejects server-side calls, so it is browser-only once
   set.
3. **Your class shares one quota with the whole internet.** Anyone who scrapes
   the key drains the daily allowance. The people most likely to find it are
   exactly the people who consume quota fastest.

### Blocker 3 — the free quota is too small for a live class, and Google moves it without notice

This is the one that would actually ruin a session.

The precedent: on 7 December 2025 Google cut the free tier from 250 to 20
requests per day, a 92% reduction, with no meaningful advance notice, to free
up compute for Gemini 3 Pro demand. Thousands of projects broke overnight. **M**
— reported consistently across secondary coverage and corroborated by the
volume of complaint threads on Google's own developer forum, but I could not
reach `ai.google.dev` from this environment to confirm against the primary
source.

Current free-tier limits for `gemini-2.5-flash` are reported inconsistently
across secondary sources in 2026 — 250, 500 and 1,500 RPD all appear, alongside
5–15 RPM. **L — sources disagree.** `[UNVERIFIED: current free-tier RPM/RPD for
gemini-2.5-flash; ai.google.dev is unreachable from the analysis environment.
Check https://ai.google.dev/gemini-api/docs/rate-limits before relying on any
figure here.]`

The arithmetic matters more than the exact number. A cohort of 25 students, each
running the before-and-after comparison the §06 exercise asks for, is 50
requests in one burst. Two exercises is 100. The per-minute limit bites first:
at 10 RPM a single shared key serialises 25 students into a queue two and a half
minutes long, and they will all click again when nothing happens. At the
December 2025 floor of 20 RPD the entire class is locked out before the first
exercise finishes.

Free-tier quota is shared across the project, so one key for the class means one
queue for the class. And the quota is not a contract. Google changed it by 92%
once already; there is nothing stopping a repeat the week before a session.

### Blocker 4 — "an account solely for this" is the weakest part of the plan

The instinct is right — do not put the course on your personal key. But a
dedicated throwaway account does not fix any of blockers 1 to 3, and adds:

- **Terms exposure.** The Gemini API terms prohibit sublicensing or
  distributing API access to third parties. **M** Handing a class of students
  programmatic access through your key is a defensible reading of exactly that.
  It is unlikely to be enforced against a small class; it is also not something
  a compliance course wants sitting in its own build.
- **Recovery risk.** A dedicated account with no recovery phone, no billing
  history and unusual traffic is the profile most likely to be flagged and
  hardest to get back. If it is suspended, every lesson page breaks at once and
  you have no support relationship to escalate through.
- **Nothing gained on liability.** A separate account changes whose quota is
  spent. It does not change whose course sent client data to an
  unpaid-quota endpoint.

---

## 4. What to do instead

Four routes, from least to most effort. Read them against what you are actually
trying to buy: students seeing a live model respond to *their* prompt, inside
the lesson, without leaving the page.

### Option A — bring your own key. **Recommended.**

The page has a key field. The student pastes their own free AI Studio key. The
page holds it in a JavaScript variable, uses it for calls to Google, and loses
it on reload like every other piece of state in these lessons.

Every blocker dissolves:

| Blocker | Why it goes away |
|---|---|
| Data terms | Each student agrees to Google's terms themselves, with their own account, for their own data. Same posture as "paste it into your tool" today — which is what §06 already instructs. |
| Public key | No key in the repository. Nothing for secret scanning to revoke. |
| Quota | Per-student quota. 25 students is 25 separate allowances, and no queue. |
| ToS | No sublicensing. Nobody is using your access. |

Costs, stated plainly:

- Every student needs a Google account and a two-minute key-creation detour.
  Some will not manage it before class; the page must work without a key, which
  it will, because the copy-to-your-own-tool path stays.
- The key must be re-pasted after every reload, because `MAINTAINING.md` forbids
  storage and this analysis is not a reason to relax that. Say so on the page —
  it is consistent with the "your work is not saved" contract rather than an
  exception to it.
- You are asking advisers to paste a credential into a web page, which Session 4
  should make them hesitate over. **Turn that into the lesson.** The page is
  static, the source is readable, the only outbound destination is
  `generativelanguage.googleapis.com`, and a student can verify all of that in
  DevTools in thirty seconds. Teaching them to check before pasting is worth
  more than the exercise it gates.

### Option B — instructor-only live demo. **Cheapest thing that works.**

You run Gemini on the projector with your own key, in AI Studio or a page only
you load. Students watch the live run, then work the exercise in their own tool.

Zero code, zero repository change, zero key exposure, zero quota risk across 25
people, and it preserves every invariant. It gets you most of the pedagogical
value of "the class sees a live model" and none of the failure modes. If the
live run dies, `docs/probe-captures.md` is already the fallback — that
discipline exists precisely for this.

### Option C — do nothing, and lean on what is already there.

Also legitimate, and worth naming because the delta over Option A is smaller
than it looks. §06 already says *"Paste it into your tool and run both versions
on the same input."* Google AI Studio is free with a plain Google account and
needs no key at all. What an in-page integration buys over that is one less
context switch — real, but not obviously worth an architectural exception, a
rewritten privacy promise and a new class of live-demo failure.

### Option D — a proxy you control.

A Cloudflare Worker or similar holds the key server-side, and the page calls
your worker instead of Google. This is the only route that lets you keep one key
without publishing it, and it also lets you rate-limit per student, rotate
freely and log nothing.

It fixes blocker 2 and softens 3 and 4. **It does not fix blocker 1** — the
requests still land on the unpaid quota with the same data terms — unless you
attach billing, at which point the paid data terms apply and you are on Option
E. It also introduces a server, a second deployment, a second thing to monitor,
and a dependency the course did not previously have. For a four-session
continuing-education class this is disproportionate.

### Option E — a paid key behind a proxy. The only version that satisfies Session 4.

Billing enabled means paid-tier data terms: prompts and responses not used for
training. That is the tier Session 4's own table calls the one a fiduciary can
use.

Cost is genuinely small for this workload. A prompt-rewrite comparison is on the
order of 1,000 input and 500 output tokens; 25 students × 4 exercises × 2 runs
is roughly 200 calls per session, call it 300k tokens. At Flash-class prices
that is cents per session.
`[UNVERIFIED: current gemini-2.5-flash per-token pricing — check
https://ai.google.dev/gemini-api/docs/pricing. Order of magnitude only.]`

The real cost is not money, it is that you now run a metered service with a
credit card attached, exposed through a public page, for a class you teach four
times. Combine with strict per-IP limits and a hard monthly cap if you go here.

---

## 5. If you ship a live call at all, these repository changes are mandatory

Applies to Options A, D and E. Not optional, and not cosmetic — the first two
are enforced by the pre-push gate and will block the commit.

1. **`MAINTAINING.md`, Layout section.** The line *"The only permitted external
   request is Google Fonts"* becomes false. Amend it to name the second
   permitted origin and the conditions on it.
2. **The pre-push externals check.** Fallback check #3 filters everything except
   `fonts.googleapis|fonts.gstatic`. Add the Gemini origin to the allowlist, and
   equivalently in `validate_lesson.py` / `validate_dom.js` in the
   interactive-lesson-builder skill. Until then, any lesson carrying the call
   fails the gate.
3. **`README.md`, "Your work is not saved".** *"transmit nothing"* becomes
   false. The honest rewrite is narrow and still strong: the page transmits
   nothing unless you supply your own key, and then it transmits only what you
   put in that one box, only to Google, and only while the tab is open. Do not
   delete the section — the promise is why advisers trust the exercises.
4. **A visible warning at the integration point.** Adjacent to the input, not in
   a footer: what leaves the browser, where it goes, and what the free tier's
   terms permit Google to do with it. `session-4/index.html` already contains
   the sourced language; reuse it rather than paraphrasing.
5. **Keep the no-key path working.** A student without a key, without a Google
   account, or behind a network that blocks the endpoint must still be able to
   complete the exercise by the existing copy-and-paste route. Same discipline
   as `docs/probe-captures.md`.
6. **A captured fallback.** If Google 429s the room, the section needs a
   pre-recorded before-and-after pair on the page. The probe-capture format
   already does this — extend it rather than inventing a second mechanism.
7. **Changelog entry**, per house rule, naming the architectural exception and
   the date.

---

## 6. Verification log

What I checked directly, and what I could not.

| Claim | Method | Confidence |
|---|---|---|
| Gemini endpoint sends CORS headers for the course origin | Live OPTIONS preflight, 2026-08-22 | **H** |
| `x-goog-api-key` is an allowed cross-origin header | Same preflight response | **H** |
| `gemini-2.5-flash:generateContent` route and body shape valid | Live POST, reached key validation | **H** |
| No `fetch`, storage, or non-font external requests in the repository today | grep across all six pages | **H** |
| No server-side capability in the repository | `ls .github`, no workflows | **H** |
| Free tier trains on content; human review; paid tier does not | Google's Gemini API Additional ToS, via search | **H** |
| Session 4 teaches consumer-vs-commercial contract split with an H chip | Read `session-4/index.html` §Tiers | **H** |
| Google API keys are GitHub secret-scanning partner patterns, push-protected by default | GitHub Docs and March 2026 changelog, via search | **M** |
| HTTP referrer restrictions available for Gemini keys | Secondary sources | **M** |
| Free tier cut 250→20 RPD on 7 December 2025 | Secondary coverage plus forum thread titles | **M** |
| Current free-tier RPM/RPD for `gemini-2.5-flash` | **Not verified.** `ai.google.dev` unreachable (proxy 403) | **L — sources disagree** |
| Current `gemini-2.5-flash` token pricing | **Not verified.** Same reason | **L** |

Both unverified figures need a check against `ai.google.dev` before any of this
drives a decision. They affect how bad Option A's quota headroom is and what
Option E costs; they do not change the verdict on the shared key, which fails on
the data terms alone.
