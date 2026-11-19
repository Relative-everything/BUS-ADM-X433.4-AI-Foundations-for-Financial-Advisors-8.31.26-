# Off-token values left after step 2, each with its reason

From `node docs/design/meridian/ui-audit.mjs --list` on 2026-11-16. Before step 2 the page-local CSS held 2,238 off-token values (381 colours, 1,143 sizes, 350 radii, 364 monospace labels); it now holds 137, and the inline style attributes hold 61. Radii and monospace labels are at zero. Every remaining value is below, grouped by the reason it stays.

## Inside a generated region (the CASE span, SOURCES, the console box) or written by a page script; neither may be edited under the freeze (61)

| Where | Kind | Selector | Value | Pages |
|---|---|---|---|---|
| inline | colour | `[style]` | `background:#E4DFD6` | 11 pages |
| inline | colour | `[style]` | `box-shadow:rgba(30,26,18,0.18)` | 11 pages |
| inline | colour | `[style]` | `background:#FFFFFF` | 11 pages |
| inline | size | `[style]` | `font-size:11.5px` | session-1, session-4 |
| inline | size | `[style]` | `font-size:13.5px` | session-1, session-4 |

## A page token: the case-file identity colours (PEDAGOGY 5.6) or Session 2's fourth chart colour (D-118). Tokens are where a literal belongs (36)

| Where | Kind | Selector | Value | Pages |
|---|---|---|---|---|
| local | colour | `:root` | `--plot4:#3D5A80` | session-2 |
| local | colour | `:root` | `--case-accent:#6B1E2E` | 5 pages |
| local | colour | `:root` | `--case-deep:#45101D` | 5 pages |
| local | colour | `:root` | `--case-tint:#F7EDEF` | 5 pages |
| local | colour | `:root` | `--case-line:#DCC3C8` | 5 pages |
| local | colour | `:root` | `--paper:#FFFDF7` | 5 pages |
| local | colour | `:root` | `--paper-line:#E4DDCB` | 5 pages |
| local | colour | `:root` | `--paper-head:#F6F0E1` | 5 pages |

## A print size in points, inside `@media print` or the printed case sheet (26)

| Where | Kind | Selector | Value | Pages |
|---|---|---|---|---|
| local | size | `body` | `font-size:11pt` | 5 pages |
| local | size | `.doc-label` | `font-size:7.5pt` | 5 pages |
| local | size | `.doc-body` | `font-size:9pt` | 5 pages |
| local | size | `.doc-body .cf-log` | `font-size:7.5pt` | cases/case-2, cases/case-4, cases/case-5 |
| local | size | `.doc-body .cf-pre-note` | `font-size:7.5pt` | cases/case-2, cases/case-5 |
| local | size | `.doc-body .cf-log td.lnk` | `font-size:7pt` | cases/case-2 |
| local | size | `table.cf-tasks,table.cf-tasks td` | `font-size:9pt` | cases/case-3 |
| local | size | `.doc-body .cf-subject` | `font-size:11pt` | cases/case-3 |
| local | size | `.dec` | `font-size:9.5pt` | cases/case-4 |
| local | size | `.doc-body table.dt.doc-table.keyt td.n` | `font-size:9pt` | cases/case-4 |
| local | size | `.doc-body p.cf-note-print` | `font-size:8pt` | cases/case-5 |

## A case-file colour written as a literal instead of a `--case-*` or `--paper*` token (register row: fold into the page tokens) (25)

| Where | Kind | Selector | Value | Pages |
|---|---|---|---|---|
| local | colour | `.sessions.cases a.sx.cx` | `border-left:#6b1f2a` | index |
| local | colour | `.sx.cx .no` | `color:#6b1f2a` | index |
| local | colour | `.cf-flag` | `background:#FBE6B6` | 5 pages |
| local | colour | `.cf-sit li` | `border-top:rgba(11,107,102,.2)` | 5 pages |
| local | colour | `.doc` | `border-left:#6B1E2E` | 5 pages |
| local | colour | `.cf-wh` | `background:#F3E6E9` | cases/case-3 |
| local | colour | `.cf-wh` | `background:#FAF1F3` | cases/case-3 |
| local | colour | `.cf-model` | `background:#FBFAF5` | cases/case-3 |
| local | colour | `ins.cf-ins` | `background:#EFF5F1` | cases/case-3 |
| local | colour | `.fld[aria-pressed="true"]` | `background:#FBE6B6` | cases/case-4 |
| local | colour | `.hs.locked .fld[aria-pressed="true"]:hover` | `background:#FBE6B6` | cases/case-4 |

## A shadow or a focus/drop ring. Meridian says no shadows; removing one is a per-component design call, not a mechanical one (register row) (22)

| Where | Kind | Selector | Value | Pages |
|---|---|---|---|---|
| local | colour | `a.sx:hover` | `box-shadow:rgba(11,107,102,.09)` | index |
| local | colour | `input[type=range]::-webkit-slider-thumb` | `box-shadow:rgba(0,0,0,.2)` | session-2, session-3, session-4, session-5 |
| local | colour | `#caseBtn.casefab` | `box-shadow:rgba(0,0,0,.12)` | session-4, session-5 |
| local | colour | `#s1 #ruleBoxes` | `box-shadow:rgba(0,0,0,.18)` | session-4 |
| local | colour | `.casebtn` | `box-shadow:rgba(0,0,0,.12)` | session-4 |
| local | colour | `.drag-ghost` | `box-shadow:rgba(0,0,0,.18)` | session-5 |
| local | colour | `[data-drop].drop-over` | `box-shadow:rgba(11,107,102,.18)` | session-5 |
| local | colour | `.topbar-case .casebtn` | `box-shadow:rgba(0,0,0,.12)` | session-5 |
| local | colour | `.doc` | `box-shadow:rgba(0,0,0,.04)` | 5 pages |
| local | colour | `.doc` | `box-shadow:rgba(70,30,40,.09)` | 5 pages |

## Black or grey on the printed case sheet (`.doc`, `.cf-*`, `.keywarn`): the sheet imitates paper and is not on the page palette (13)

| Where | Kind | Selector | Value | Pages |
|---|---|---|---|---|
| local | colour | `.doc` | `border:#999` | 5 pages |
| local | colour | `.cf-flag` | `border-bottom:#000` | 5 pages |
| local | colour | `a.cf-src` | `color:#000` | cases/case-3 |
| local | colour | `.keywarn` | `border-color:#000` | cases/case-4 |
| local | colour | `.keywarn` | `color:#000` | cases/case-4 |

## Translucent white on the case-file band or a dark copy box: an overlay on a coloured ground, with no token for it (12)

| Where | Kind | Selector | Value | Pages |
|---|---|---|---|---|
| local | colour | `.copybox button` | `background:rgba(255,255,255,.13)` | session-2 |
| local | colour | `.copybox button:hover` | `background:rgba(255,255,255,.25)` | session-2 |
| local | colour | `.cf-tabs a` | `background:rgba(255,255,255,.12)` | 5 pages |
| local | colour | `.cf-tabs a` | `border:rgba(255,255,255,.3)` | 5 pages |

## A relative size (em): it scales with its parent, which is on the scale (6)

| Where | Kind | Selector | Value | Pages |
|---|---|---|---|---|
| local | rel | `ol.steps code,p code,.copybox code` | `font-size:.86em` | session-0.1 |
| local | rel | `code` | `font-size:.88em` | session-3, session-4, session-5 |
| local | rel | `a.cf-src` | `font-size:.84em` | cases/case-3 |
| local | rel | `.fld[aria-pressed="true"]::before` | `font-size:.8em` | cases/case-4 |

## A one-off literal with no token of the same value (dark copy-box text, a key label) (3)

| Where | Kind | Selector | Value | Pages |
|---|---|---|---|---|
| local | colour | `.copybox` | `color:#E8EDEB` | session-2 |
| local | colour | `.copybox button` | `color:#E8EDEB` | session-2 |
| local | colour | `.fkey .why` | `color:#3F4C49` | cases/case-4 |

## The shared sheets

`assets/typography.css` and `assets/components.css` carry 20 literal colours, 9 sizes and 2 radii per page of fence, of the same kinds: translucent overlays and rings built from the palette's own rgb values, the case modal's shadow, print sizes in points on the case sheet, three `clamp()` sizes whose ends are on the scale but written in px, the 2px top corners of a bar in a chart, and `svg.ch text` at 12.5px (an SVG attribute context where the token is written out). None is a second palette.

## What the audit does not count

Colours and sizes that page scripts write into markup or SVG at run time (chart series, the `#6F7B78` key text in Session 3, the option marks in Session 2). Scripts are frozen, so these are unchanged; the kickoff prompt lists recolouring script-drawn charts as out of scope.

## Added 2026-11-19: sizes on SVG text

194 size values on rules that style text inside an SVG drawing (Session 2: 2, Session 4: 65, Session 5: 127) are back at the sizes they had before the restyle (D-136). They are drawing units that scale with the figure, and the labels are placed for them. `ui-audit.mjs` reports them in the `svg` column and does not count them as off-token. The rules are listed in `docs/design/meridian/svg-text-rules.json`.
