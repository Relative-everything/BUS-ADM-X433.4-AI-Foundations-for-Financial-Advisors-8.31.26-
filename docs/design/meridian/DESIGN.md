# Meridian: the visual system

Meridian is the visual system for the BUS ADM X433.4 course site: twelve self-contained lesson and case pages that are taught live over a Zoom screen share and then used by students as reference. Build every page from these rules.

## Principles

- **One view.** The page the instructor shares is the page students work in. There is no presenter mode and no dark theme. Dark text on a light ground is the more legible polarity, so `ink` on `page` is the only reading surface.
- **Colour is a cue, so ration it.** Each role colour has one job. Everything else is `ink`, `muted` and `chart-context`.
- **Text is dark, colour is in fills.** Shared screens compress colour detail. Set prose, labels and chart values in `ink` or `muted`. Put role colour in backgrounds, bars and glyphs. Role text colours appear only on their own tint.
- **Never hue alone.** Every state has a shape or a letter as well as a colour: the EvidenceChip dot, the EarnedCheck glyph, a bold lead-in on a callout.
- **Structure is orientation.** Every section has a title in the outline, minutes, and one stated finding.

## Colour

| Role | Tokens | Use for | Never use for |
|---|---|---|---|
| Teaching voice and action | `primary`, `primary-bg`, `on-primary` | Primary buttons, the current outline item, section badges, the emphasised marks in a figure, earned checks, H chips | Decoration, long passages of text |
| Work-along | `attention`, `attention-bg`, `attention-fill` | Timed "do this now" callouts, M chips | Emphasis, warnings, chart series |
| Caution | `caution`, `caution-bg` | Deliberately defective artifacts, failure states, compliance warnings, L chips | Timers, ordinary notes |
| Frame | `chrome`, `on-chrome`, `chrome-muted` | The app bar only | Cards, callouts, section backgrounds |
| Neutral | `page`, `surface`, `line`, `ink`, `muted` | Everything else | |
| Data | `chart-context`, `chart-1` to `chart-4` | Figures only | Interface states |

Every text token holds at least 5.3:1 on the grounds its usage note names. `chart-context` is 2.18:1 on `surface` by intent and always carries a value label in `ink`. The focus ring is a solid 2px `primary` outline with a 2px offset (5.86:1 on `page`, 6.36:1 on `surface`).

Teal means both "the teaching voice" and "done". That is deliberate: the check's shape carries completion, and one fewer hue is on screen.

## Type

Three hosted families, loaded from Google Fonts in one request, with local fallbacks so an offline page degrades instead of breaking.

- `display` and `ui` are Bricolage Grotesque. Headings use it at 26px and up; labels, buttons, chips, captions and the outline use it at 12.5 to 16px.
- `reading` is Source Serif 4. All prose is `body` (18px, 1.6) with a 64-character measure. The section finding is `finding` (21px).
- `code` is JetBrains Mono. Use it only for prompts, model output and code. It is never a label face.
- Eight sizes exist: 12.5, 14, 16, 18, 21, 26, 34, 46. Nothing is smaller than 12.5px. Write sizes in rem so browser zoom scales the whole page.
- Capitals with letter-spacing are allowed only on `label` text in table headers and margin-note headings. Buttons, tabs and chips are sentence case.

## Space, radius, borders

- Spacing steps are 4, 8, 12, 16, 24, 32, 48, 72. Sections are `space-8` apart, cards pad `space-5`, controls sit `space-2` apart.
- Radii are `radius-sm` (chips, badges, callouts, bar ends), `radius-md` (cards, figures, buttons) and `radius-pill` (round glyphs).
- Borders are 1px `line`. There are no shadows.
- Callouts are full tints. Do not add a coloured stripe down one side.

## Layout

- App bar across the top, outline sidebar at the left, a prose column capped at 64 characters, and a 200px margin column for sources and definitions.
- Below 1100 CSS px the outline becomes a drawer and the margin notes fold under their paragraph. A 1440px window zoomed to about 130% crosses that line, which is the intended behaviour when zooming in for a class.
- At 320px everything is one column with no horizontal scroll.

## Figures

Follow the Figure component: the title is the finding, grey is context, `primary` is the subject, values are labelled in `ink`, one axis, sources with chips underneath.

## Progress

Checks are earned by committing answers, shown per section in the outline, held in memory only and labelled "this sitting". They never gate scrolling.

## Content rules that the visual system depends on

- Every factual claim carries an EvidenceChip and a footer source.
- Synthetic case material and deliberately defective artifacts are labelled where they appear.
- Served pages carry no grading, due-date, submission or LMS language, and nothing addressed to the instructor.
- No new em dashes (EDITORIAL D1).

## Mapping from the current tokens

| Current token | Current value | Meridian token | Meridian value |
|---|---|---|---|
| `--page` | #F4F4F1 | `page` | #F6F6F3 |
| `--card` | #FFF | `surface` | #FFFFFF |
| `--ink` | #16211F | `ink` | #13203A |
| `--muted` | #6F7B78 | `muted` | #535F73 |
| `--line` | #D8DAD4 | `line` | #D9DCE2 |
| `--on` | #0E5A55 | `primary` | #0B6B66 |
| `--on-bg` | #E2EDEB | `primary-bg` | #E0EFED |
| `--gold` | #8A6A12 | `attention` | #7A4E00 |
| `--gold-bg` | #F3EEDF | `attention-bg` | #FBF0D2 |
| `--warn` | #9A4B22 | `caution` | #9A3A1E |
| `--warn-bg` | #F6EAE2 | `caution-bg` | #F8E9E3 |
| `--off` | #B9BDB9 | `chart-context` | #A9B0BD |
| `--off-bg` | #E7E8E4 | `line` | #D9DCE2 |

## Where the source of truth lives

This reference describes the system. The values that ship are `tokens.css`, `typography.css` and `components.css` in the interactive-lesson-builder skill, swept into each page's style fence by `restyle_sweep.py`. Change those files and regenerate; never edit inside a fence. `components/bundle.css` here is the draft of the new `components.css`.
