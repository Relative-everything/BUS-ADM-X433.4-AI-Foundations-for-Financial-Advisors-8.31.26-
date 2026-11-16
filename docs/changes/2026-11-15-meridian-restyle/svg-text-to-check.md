# SVG text the contrast check could not measure

Written 2026-11-16. `contrast-check.mjs` reads the ground of SVG text from the shape painted under the text's centre. For these seven it found no shape, or one that is not the real ground (a path, a stroke, a shape drawn later), so the ratio it reports is not to be trusted either way. **None of these is counted as passing.** Each row names the page, the section, the text, what the check reported, and a screenshot of the whole figure to check by eye.

| Page | Section | Selector | Text | Reported (text rgb on ground rgb) | Seen at | Screenshot |
|---|---|---|---|---|---|---|
| `session-4/index.html` | `#s1` | `svg.s1svg > text.s1wm` | 1 | 217,220,226 on 240,242,245  1.22:1 | 1440 px, as loaded | `shots/svg-text/session-4-1.png` |
| `session-4/index.html` | `#s0` | `g.qp > text` | Sessions 1 to 3: inside the mo | 83,95,115 on 0,0,0  3.25:1 | 1440 px, as loaded | `shots/svg-text/session-4-2.png` |
| `session-4/index.html` | `#sWS` | `g.wsGauge > text.wsL.wsGold.wsB` | FEB 2023 | 122,78,0 on 0,0,0  2.92:1 | 1440 px, everything revealed | `shots/svg-text/session-4-3.png` |
| `session-5/index.html` | `#s0` | `g.s0-stop.seen > text.s0-tick` | ✓ | 255,255,255 on 211,228,227  1.31:1 | 1440 px, everything revealed | `shots/svg-text/session-5-4.png` |
| `session-5/index.html` | `#sE3` | `g.sE3-body > text.sE3-bt` | 1 | 255,255,255 on 240,242,245  1.12:1 | 1440 px, everything revealed | `shots/svg-text/session-5-5.png` |
| `session-5/index.html` | `#sE4` | `svg.sE4-svg > text.sE4-el` | 2:00 | 19,32,58 on 19,32,58  1.00:1 | 1440 px, everything revealed | `shots/svg-text/session-5-6.png` |
| `session-5/index.html` | `#s5` | `g.s8-bar.s8-rust > text.s8-v` | minus 0.69 | 255,255,255 on 184,117,98  3.64:1 | 1440 px, everything revealed | `shots/svg-text/session-5-7.png` |
