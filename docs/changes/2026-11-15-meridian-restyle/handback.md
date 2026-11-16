# Meridian restyle: handback

2026-11-16. Branch `claude/meridian-design-unification-6v4p7m`, from `origin/main` at `c058b50`. One pull request, not merged. The ledger beside this file is the step-by-step record; this is what you need to decide whether to merge.

## What changed, in plain terms

Every served page now looks like one system. The pages kept every word, figure, source, chip, case fact and generated region. Two page scripts changed by six colour values each, on your instruction.

| Step | What it did | Commits |
|---|---|---|
| 1. Consolidate | 342 page rules that repeated the shared sheet deleted; your 74 variation answers applied; the sweep pointed at this repository's style sheets; 202 rules shared between pages moved into the shared sheet. Nothing computed differently except the variations you dropped. | `733834e`, `7fd17d8`, `0ead3c0`, `fb29ea6` |
| 2. Restyle | The Meridian sheets replaced the shared sheets; page CSS and inline styles converted to tokens; four contrast fixes in the shared sheet; one narrow-screen fix on case 3. | `2e6fb66` |
| 3. Outline | Outline sidebar and earned checks in the six lessons; app bar element on Sessions 3 to 5; the two script colour fixes; records. | `46522d4` and the commit that carries this file |

To revert one step alone, revert its commits in the table. `e0da259` is the first commit (MIGRATION and KICKOFF-PROMPT brought into line with the prompt).

## The four results

| Check | Result | Where |
|---|---|---|
| `content-freeze.mjs` | Frozen on 12 pages against `c058b50`, with two allowed script blocks | `freeze-allow.json` |
| `style-snapshot.mjs` | Step 1: the same on Session 0.1, Session 1 and the five case pages; the hub and Sessions 2 to 5 differ only in the properties your dropped variations set. Step 1.4 (promotion) against the post-drop record: the same on all 12 and on the changelog page. Step 2 is a restyle, so the proof there is the freeze, the audit and the screenshots. | ledger L-03, L-05 |
| `ui-audit.mjs` | Page-local rules 5,698 to 4,364. Off-token values in page CSS 2,238 to 137 (colours 381 to 111, sizes 1,143 to 26, radii 350 to 0, monospace labels 364 to 0), each remaining one with its reason | `ui-audit-after.txt`, `off-token-remaining.md` |
| Gate | All 24 in-repo checks pass, `build-outline --check` among them. The 12 skill-validator lines are red on exactly the lines red at the baseline (V2 on footer links, V4 `data-fact` chips, V6 band and consecutive types, V8 and Shift+U on Session 2, `#pnum`), all listed in MAINTAINING as red by design; the condensed logs are identical | `gate/baseline.txt`, `gate/checkpoint-1.txt`, `-2.txt`, `-3.txt` |

Also: `contrast-check.mjs`, selectors below 4.5:1 from 1,808 to 55, no page scrolling sideways at 320 px (`contrast-remaining.txt`); `test-outline.mjs`, 58 assertions pass (`test-outline.txt`).

## Variations kept (16 rows of `variations.md`, plus one kept in part)

Rows 3, 4, 7 (hub layout: wrapper padding, smaller h2, ruled footer); 12 and 72 (page tokens: Session 2's chart colours, the case-file colours); 27 (Session 2's two-column vote); 33, 34 (24 px slider thumb); 38 (Session 2's taller text area); 49 and 71 (the "simulated" label's gap, and its quiet dashed form on Sessions 4 and 5); 54 (ruled source line, Sessions 3 to 5); 60 (button reset on `.lbox`); 65 (quiz text in the code face); 73, 74 (case-accent eyebrow, 11 pt print). Row 57 kept only `width:100%`.

Seven rows (6, 9, 21, 39, 40, 51, 53) were kept through step 1 and retired in step 2 as the table said. Four more that you answered "drop" (16, 24, 25, 26, all Session 2) I also kept through step 1 and retired in step 2, because dropping them in step 1 broke two things the table had not predicted (D-125). The end state is the one you chose.

## Freeze-allow entries (two)

| Page | Block | What changed | Why |
|---|---|---|---|
| `session-2/index.html` | 2 of 3, baseline hash `52a3f46811ef` | six `var(--off)` became `var(--muted)`, in the colour of the unchosen mark only | 2.18:1 to 6.46:1 |
| `session-3/index.html` | 2 of 3, baseline hash `0d2d649dbecc` | six `style="color:#6F7B78"` became `style="color:var(--muted)"` | 3.71:1 to 5.45:1 on the key's tint |

Each changed block, with its six substitutions undone, hashes to the baseline block. D-133.

## Judgment calls you did not make (read these)

1. **I changed the freeze check mid-run (D-128).** It paired a one-line region with the next region's end marker and so hashed whole lesson sections; I fixed the pattern and re-tested it on altered copies. The fix makes it stricter about regions and lets inline `style` changes pass, which its header always said it would. You may want to read the six-line diff.
2. **Five mechanical rules beyond `build-drafts.py` (D-129).** Pill radii, radii of several values, sizes above 19 px snapped to the nearest step, old-palette literals to tokens, inline styles. Without the first, every pill would have become an 8 px corner.
3. **Four rules added to the Meridian shared sheets (D-131, D-135)** for contrast: the floating "Case facts" button, the Shift+U label on the bar, the pipeline arrows, the case link over the new bar.
4. **The commit map (D-132, DW-216).** 78 of 111 tasks earn a check; which control counts is my reading of each. One task is one check, so a four-question bridge is earned by its first answer.
5. **Screenshots are 64-colour PNGs (D-127)** to keep two sets at 42 MB.

## What I could not verify

- **Fonts.** Every measurement ran with the font host refused, so layout was measured in fallback faces. The screenshots were taken with the network open and show the hosted faces.
- **States nobody was in.** `style-snapshot` records two states (as loaded; everything revealed). A hover, a focus ring, or a class a script adds after a click it did not make is unseen. `consolidate.mjs` refused any move that an equal-specificity rule could reverse, which covers the moves but is a static argument, not an observation.
- **Seven SVG texts** (`svg-text-to-check.md`, with screenshots). Not counted as passing.
- **Print.** No print rendering was checked. Print rules were converted by the same mechanical rules; point sizes were left alone.
- **Real devices and a real Zoom share.** Headless Chromium only, at 1440, 1024, 390 and 320 px.
- **Sorters by drag.** The outline counts a placement by click on a bucket; if a sorter also accepts a drag, that path does not earn the check.
- **The live console** was exercised only by its mocked suite, as before.

## What is left

Register rows: DW-209 (the skill: copy `assets/` over, decide the promoted block, add `outline.js`, remove the `--assets` override), DW-212 (48 dimmed states), DW-213 (seven SVG texts), DW-214 (shadows, case-colour literals, code face on plain-case controls, script-drawn colours), DW-215 (204 shared rules still local, the `.case-*` rules among them), DW-216 (the commit map; and the three content changes the design review asked for: figure titles as findings, margin notes, section findings). DW-211 is unchanged.

## Where the screenshots are

`docs/changes/2026-11-15-meridian-restyle/shots/before/` and `shots/after/`: 24 files each, every page at 1440 and 390 px, same file names. `shots/outline/`: Sessions 2 and 4 with a check earned. `shots/svg-text/`: the seven figures to check by eye.
