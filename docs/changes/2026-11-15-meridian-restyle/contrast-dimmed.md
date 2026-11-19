# Text below 4.5:1 because the page dims it on purpose

Written 2026-11-16 from `contrast-check.mjs`. Each selector here carries an `opacity` below 1, on itself or an ancestor, that a page rule applies to mark a state: spent, eliminated, struck out, not yet lit, hidden at the current appendix depth. By the instructor's decision of 2026-11-16 these stay as they are (one register row). WCAG 2.2 SC 1.4.3 exempts text that is part of an inactive user interface component.

| Page | Selector | Text rgb on ground rgb, ratio |
|---|---|---|
| `session-1/index.html` | `a.apxcard.dim > span.ac` | 215,202,179 on 255,255,255  1.62:1 |
| `session-1/index.html` | `a.apxcard.dim > b` | 184,188,196 on 255,255,255  1.90:1 |
| `session-1/index.html` | `div.drow.cut > span` | 161,166,176 on 255,255,255  2.45:1 |
| `session-1/index.html` | `div.drow.cut > span.pv` | 186,191,199 on 255,255,255  1.85:1 |
| `session-1/index.html` | `label.sh > h4` | 137,144,157 on 255,255,255  3.23:1 |
| `session-1/index.html` | `div#mod_top_k > p.sd` | 169,175,185 on 255,255,255  2.21:1 |
| `session-1/index.html` | `div#mod_tfs_z > p.sd` | 169,175,185 on 255,255,255  2.21:1 |
| `session-1/index.html` | `div#mod_typ_p > p.sd` | 169,175,185 on 255,255,255  2.21:1 |
| `session-1/index.html` | `div#mod_top_p > p.sd` | 169,175,185 on 255,255,255  2.21:1 |
| `session-1/index.html` | `div#mod_min_p > p.sd` | 169,175,185 on 255,255,255  2.21:1 |
| `session-1/index.html` | `div#mod_top_a > p.sd` | 169,175,185 on 255,255,255  2.21:1 |
| `session-1/index.html` | `div#mod_smooth > p.sd` | 169,175,185 on 255,255,255  2.21:1 |
| `session-1/index.html` | `div#mod_dyntemp > p.sd` | 169,175,185 on 255,255,255  2.21:1 |
| `session-1/index.html` | `div#mod_temp > p.sd` | 169,175,185 on 255,255,255  2.21:1 |
| `session-2/index.html` | `a.apxcard.dim > span.ac` | 215,202,179 on 255,255,255  1.62:1 |
| `session-2/index.html` | `a.apxcard.dim > b` | 184,188,196 on 255,255,255  1.90:1 |
| `session-3/index.html` | `button.lbox > h4` | 149,155,166 on 255,255,255  2.80:1 |
| `session-3/index.html` | `button.lbox > p` | 178,183,192 on 255,255,255  2.02:1 |
| `session-3/index.html` | `svg > text.chartlab` | 140,148,161 on 255,255,255  3.07:1 |
| `session-3/index.html` | `svg > text.chartlab` | 117,127,143 on 255,255,255  4.04:1 |
| `session-3/index.html` | `svg > text.chartlab` | 114,124,140 on 255,255,255  4.23:1 |
| `session-4/index.html` | `a.apxcard.dim > span.ac` | 215,202,179 on 255,255,255  1.62:1 |
| `session-4/index.html` | `a.apxcard.dim > b` | 184,188,196 on 255,255,255  1.90:1 |
| `session-4/index.html` | `g > text.s2fn.off` | 160,167,178 on 255,255,255  2.42:1 |
| `session-4/index.html` | `g.s4-pl.s4-u > text.s4-num` | 220,181,168 on 248,233,227  1.59:1 |
| `session-4/index.html` | `g.s4-pl.s4-u > text.s4-st` | 222,185,156 on 251,240,210  1.60:1 |
| `session-4/index.html` | `g.s4-pl.s4-u > text.s4-ll` | 181,178,164 on 251,240,210  1.88:1 |
| `session-4/index.html` | `g.s4-pl.s4-y > text.s4-num` | 84,151,148 on 11,107,102  1.89:1 |
| `session-4/index.html` | `g.s4-pl.s4-y > text.s4-st` | 160,199,196 on 224,239,237  1.54:1 |
| `session-4/index.html` | `g.s4-pl.s4-y > text.s4-ll` | 162,177,183 on 224,239,237  1.86:1 |
| `session-4/index.html` | `g.s4-pl.s4-u > text.s4-st` | 203,185,175 on 224,239,237  1.60:1 |
| `session-4/index.html` | `g.s4-pl.s4-u > text.s4-ll` | 162,177,183 on 224,239,237  1.86:1 |
| `session-4/index.html` | `g.s5arow > text.s5an` | 152,159,171 on 83,95,115  2.42:1 |
| `session-4/index.html` | `g.s5arow > text.s5bk` | 186,191,199 on 255,255,255  1.85:1 |
| `session-4/index.html` | `g.s5arow > text.s5bgl` | 186,191,199 on 255,255,255  1.85:1 |
| `session-4/index.html` | `g.s5arow > text.s5btt` | 161,166,176 on 255,255,255  2.45:1 |
| `session-4/index.html` | `g.tsleaf.out > text.tsbdt` | 137,144,157 on 255,255,255  3.23:1 |
| `session-4/index.html` | `g.tsleaf.out > text.tsword` | 169,175,185 on 255,255,255  2.21:1 |
| `session-4/index.html` | `span.strip > span.f.gh` | 156,163,173 on 246,246,243  2.35:1 |
| `session-5/index.html` | `a.apxcard.dim > span.ac` | 215,202,179 on 255,255,255  1.62:1 |
| `session-5/index.html` | `a.apxcard.dim > b` | 184,188,196 on 255,255,255  1.90:1 |
| `session-5/index.html` | `button.btn.sel > span.sE2-mscore` | 112,122,139 on 228,231,236  3.49:1 |
| `session-5/index.html` | `text.s4-tbad.gone > tspan` | 125,138,152 on 224,239,237  2.97:1 |
| `session-5/index.html` | `div#s7List > button.chip.done` | 125,132,147 on 255,255,255  3.74:1 |
| `session-5/index.html` | `div#s6Src > button.s6-chip.src.spent` | 125,132,147 on 255,255,255  3.74:1 |
| `session-5/index.html` | `div#s6Dst > button.s6-chip.dst.spent` | 125,132,147 on 255,255,255  3.74:1 |
| `session-5/index.html` | `button.sLib-prop.placed > b` | 133,181,179 on 11,107,102  2.80:1 |
| `session-5/index.html` | `button.sLib-prop.placed > span` | 137,144,157 on 255,255,255  3.23:1 |
