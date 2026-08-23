# BUS ADM X433.4, AI Foundations for Financial Advisors

UC Berkeley Extension, Fall 2026. Instructor: Jared Winkers.

**Open the course here:** https://relative-everything.github.io/BUS-ADM-X433.4-AI-Foundations-for-Financial-Advisors-8.31.26-/

That link is the page to bookmark. Everything else in this repository is the
source the site is built from.

## What these lessons are

Each session is one interactive HTML page. There is nothing to install, no
account to create, and no login. Open a session in any current desktop browser
and work down the page.

The lessons are not slides. Roughly every section asks you to do something:
sort a list, run a sampler, score your own prompt, commit to a prediction
before the answer opens. Reading a session without working it will take a
third of the time and teach a fraction of the material.

## Your work is not saved

These pages store nothing and save nothing. There is no database behind them,
no analytics in them, and no login. Everything you type lives in the browser tab
and disappears when you reload or close it.

That is deliberate: no client information you paste into an exercise can leak
from a page that is not sending it anywhere. It also means **anything you want
to keep, you copy into your own notes before you leave the page.** The baseline
measurement in Session 1 and the prompts you rewrite in Session 2 are graded
components of the final project, and the page will not remember them for you.

### The one exception, and it is off unless you switch it on

Sessions 0.1 and 1 have an optional box at the top marked **Live model**. Leave
it alone and those pages behave like every other: they transmit nothing, and the
model outputs you see are real runs that were captured and dated in advance.

Paste your own free Gemini API key into it and the exercises call a live model
instead, so you watch it happen rather than read a recording. Then, and only
then, those two pages send something: whatever is in the box you pressed the
button on, to Google, over the connection your key authorises. Your key is held
in one JavaScript variable, is never stored, never appears in a link, and is
gone the moment you reload.

Three things worth knowing before you use it:

- **Nothing depends on it.** Every exercise works, and every gate completes,
  with no key. Nothing is graded on it.
- **Do not send client information through it.** Google's terms for the free
  tier let it use what you submit to improve its products, and let human
  reviewers read it. Every prompt on those two pages is a public fact or
  synthetic Cole household data that is already published on this site. That is
  why the box is on those pages and not on the ones built around your own
  practice.
- **Check before you trust it.** The pages are static and their source is
  readable. View Source, or open the Network tab in your browser's developer
  tools, and confirm for yourself that the only address they send to is
  `generativelanguage.googleapis.com`. Doing that, rather than taking this
  paragraph's word for it, is the habit Session 4 is about.

## How to use a lesson

- Work top to bottom. Later sections assume the earlier ones.
- Answer panels stay shut until you open them. Commit to an answer first; the
  sequencing is the point, and a wrong answer you committed to beats a right
  one you read.
- Each session splits into a **core** of about an hour that always runs, and an
  **appendix** of optional depth. Gold links in the core point down to the
  appendix material that belongs at that moment, and every appendix section
  links back to where it came from.
- A control at the top of each lesson filters the appendix by depth
  (foundational, standard, advanced) or hides it entirely for the short
  version.
- The **Shift+U** label in the top bar is the instructor's reveal-all override.
  Using it yourself skips the part that does the teaching.
- Printing works. Print preview gives you a clean copy without the navigation.

## The sessions

| # | Title | Link | Date |
|---|---|---|---|
| 1 | How the Machine Works, and What It Costs | [session-1](session-1/) | 31 August 2026 |
| 2 | Practical AI Usage in Daily Advisory Workflows | [session-2](session-2/) | 14 September 2026 |
| 3 | Gathering and Documenting Client Information | [session-3](session-3/) | [UNVERIFIED: session 3 date] |
| 4 | Compliance, Security and Responsible Use | [session-4](session-4/) | [UNVERIFIED: session 4 date] |
| 5 | Final project | not yet published | [UNVERIFIED: session 5 date] |

## The Cole household

Every worked example, exercise input and discussion prompt in the course draws
on one client household: Meg and David Cole of Barrington Hills, Illinois,
whose company is in Rockford. The Cole household
is **entirely synthetic**. It was constructed for this course, it is labelled as
synthetic in every lesson that presents it, and it is not derived from, based
on, or de-identified from any real household.

It is also **not your final-project dataset**. Part 1 is built on a real
recurring task from your own practice, using your own synthetic or
de-identified data. A workflow built around the Coles fails the handoff test,
because your reviewer already knows every input.

## How claims are evidenced

The course argues that fluent and correct look identical, so the lessons hold
themselves to the standard they teach.

- Every substantive factual claim carries a confidence chip: **H** verified
  directly against a named primary source, **M** derived or reported by a
  single secondary source, **L** illustrative or contested. Each chip resolves
  to a numbered entry in that lesson's footer.
- Where published sources disagree, both figures are shown rather than averaged
  or quietly resolved.
- **Some exhibits are deliberately wrong.** Fabricated citations are planted as
  exercise material, and every one is labelled as such on the page where it
  appears and again in the footer. If you find something that looks fabricated,
  check whether it is labelled before you report it.
- Model prices and capability benchmarks carry an as-of date and move fast.
  Verify any figure before relying on it outside the classroom.

## Disclaimer

This is course material for a continuing-education class. Nothing in this
repository or on the live site is legal, tax, investment, or compliance advice.
Legal and regulatory characterisations in the lessons sit behind a verification
block precisely because they require checking against primary authority before
anyone teaches or acts on them.

## Revision history

Every substantive change is recorded in [the changelog](changelog/), newest
first. Lessons are updated in place, so the page you open is always current and
there are no version numbers to track.

Maintainers and contributors: see [MAINTAINING.md](MAINTAINING.md).

Questions about the course: [UNVERIFIED: preferred instructor contact]
