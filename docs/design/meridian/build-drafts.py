"""Drafts the Meridian versions of the lesson-builder skill's tokens.css, typography.css and components.css
from the copies currently swept into the lesson pages. Reads skill-css/current, writes skill-css/meridian."""
import re, os, difflib
HERE = os.path.dirname(os.path.abspath(__file__))
CUR = os.path.join(HERE, 'skill-css', 'current')
NEW = os.path.join(HERE, 'skill-css', 'meridian')
os.makedirs(NEW, exist_ok=True)
rd = lambda n: open(os.path.join(CUR, n)).read()
def wr(n, s):
    open(os.path.join(NEW, n), 'w').write(s)

# ------------------------------------------------------------------ tokens.css
TOKENS = '''/* tokens.css
   Meridian tokens. Single source of truth for colour, type, space and radius.
   Reference: the X433.4 Meridian design system. One light theme by decision:
   dark text on a light ground is the more legible polarity and the page is
   taught over a screen share.
   Semantics:
     --primary    teal   = teaching voice, primary action, earned checks, the subject marks of a figure
     --attention  amber  = work-along cues and timers, M chips, assigned-reading blocks
     --caution    brick  = failure states, deliberately defective artifacts, L chips
     --chrome     navy   = the app bar only
   Role text colours (--primary, --attention, --caution) are used as text only on
   --page, --surface or their own -bg tint. Every such pair holds 5.3:1 or better.
   The names below the rule (--on, --gold, --warn ...) are the pre-Meridian names,
   kept as aliases so page-local CSS keeps resolving. New rules use the names above it.
   Edit here, then run scripts/restyle_sweep.py to propagate into every lesson. */
:root{
  color-scheme:light;
  /* surfaces and text */
  --page:#F6F6F3;
  --surface:#FFFFFF;
  --line:#D9DCE2;
  --ink:#13203A;
  --muted:#535F73;
  /* frame */
  --chrome:#13203A;
  --on-chrome:#FFFFFF;
  --chrome-muted:#B8C2D6;
  /* roles */
  --primary:#0B6B66;
  --primary-bg:#E0EFED;
  --on-primary:#FFFFFF;
  --attention:#7A4E00;
  --attention-bg:#FBF0D2;
  --attention-fill:#E2A416;
  --attention-line:#EBD9A4;
  --caution:#9A3A1E;
  --caution-bg:#F8E9E3;
  --caution-line:#E6C9BC;
  --neutral:#A9B0BD;
  --neutral-bg:#E4E7EC;
  /* data: context grey, then four categorical hues in fixed order, never cycled */
  --chart-context:#A9B0BD;
  --chart-1:#0A9488;
  --chart-2:#D9722E;
  --chart-3:#3567B5;
  --chart-4:#B8437F;
  /* type: families and the eight sizes */
  --font-display:"Bricolage Grotesque",system-ui,sans-serif;
  --font-ui:"Bricolage Grotesque",system-ui,sans-serif;
  --font-reading:"Source Serif 4",Georgia,serif;
  --font-code:"JetBrains Mono",ui-monospace,monospace;
  --fs-label:.78125rem;   /* 12.5px, the floor */
  --fs-small:.875rem;     /* 14 */
  --fs-control:1rem;      /* 16 */
  --fs-body:1.125rem;     /* 18 */
  --fs-finding:1.3125rem; /* 21 */
  --fs-subhead:1.625rem;  /* 26 */
  --fs-section:2.125rem;  /* 34 */
  --fs-title:2.875rem;    /* 46 */
  /* space and radius */
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;
  --space-5:24px;--space-6:32px;--space-7:48px;--space-8:72px;
  --radius-sm:4px;--radius-md:8px;--radius-pill:999px;
  /* layout */
  --bar-h:46px;
  --outline-w:260px;
  /* ---- pre-Meridian aliases ---- */
  --card:var(--surface);
  --on:var(--primary);
  --on-bg:var(--primary-bg);
  --gold:var(--attention);
  --gold-bg:var(--attention-bg);
  --warn:var(--caution);
  --warn-bg:var(--caution-bg);
  --off:var(--neutral);
  --off-bg:var(--neutral-bg);
}
'''
wr('tokens.css', TOKENS)

# ------------------------------------------------------------------ shared mechanical pass
KEEP_CAPS = ('table.dt th', '.mtx th')
def snap(px):
    v = float(px)
    if v <= 12.5: return 'var(--fs-label)'
    if v <= 14.5: return 'var(--fs-small)'
    if v <= 16.5: return 'var(--fs-control)'
    if v <= 19: return 'var(--fs-body)'
    return None
def rule(m):
    sel, b = m.group(1), m.group(2)
    label = 'JetBrains Mono' in b and ('letter-spacing' in b or 'uppercase' in b)
    if label:
        b = re.sub(r'font-family:\s*"JetBrains Mono",\s*monospace', 'font-family:var(--font-ui)', b)
        if any(k in sel for k in KEEP_CAPS):
            b = re.sub(r'letter-spacing:\s*[^;}]+', 'letter-spacing:.04em', b)
        else:
            b = re.sub(r'text-transform:\s*uppercase;?', '', b)
            b = re.sub(r'letter-spacing:\s*[^;}]+;?', '', b)
        b = re.sub(r'font-weight:\s*500', 'font-weight:600', b)
        if 'font-weight' not in b: b = b.rstrip().rstrip(';') + ';font-weight:600'
    b = re.sub(r'font-family:\s*"JetBrains Mono",\s*monospace', 'font-family:var(--font-code)', b)
    b = re.sub(r'font-family:\s*"Source Serif 4",\s*(Georgia,\s*)?serif', 'font-family:var(--font-reading)', b)
    b = re.sub(r'font-family:\s*"Bricolage Grotesque",\s*(system-ui,\s*)?sans-serif', 'font-family:var(--font-display)', b)
    def fs(mm):
        s = snap(mm.group(1)); return 'font-size:' + (s if s else mm.group(1) + 'px')
    b = re.sub(r'font-size:\s*([0-9.]+)px', fs, b)
    def rad(mm):
        v = float(mm.group(1)); return 'border-radius:' + ('var(--radius-sm)' if v <= 6 else 'var(--radius-md)') + mm.group(2)
    b = re.sub(r'border-radius:\s*([0-9.]+)px\s*([;}]|$)', rad, b)
    b = re.sub(r'(?<![-\w])color:\s*#fff\b', 'color:var(--on-primary)', b, flags=re.I)
    b = re.sub(r'background:\s*#fff\b', 'background:var(--surface)', b, flags=re.I)
    b = re.sub(r'solid #fff\b', 'solid var(--surface)', b, flags=re.I)
    b = re.sub(r'stroke:\s*#fff\b', 'stroke:var(--surface)', b, flags=re.I)
    b = b.replace('#DFD3AF', 'var(--attention-line)').replace('#E0C6B4', 'var(--caution-line)')
    b = b.replace('#0A423F', 'var(--primary)').replace('#4A5250', 'var(--muted)')
    b = b.replace('rgba(14,90,85', 'rgba(11,107,102').replace('rgba(154,75,34', 'rgba(154,58,30').replace('rgba(22,33,31', 'rgba(19,32,58')
    b = re.sub(r'1\.5px solid var\(--line\)', '1px solid var(--line)', b)
    b = re.sub(r';\s*;', ';', b)
    return sel + '{' + b + '}'
def mech(css):
    return re.sub(r'([^{}]*)\{([^{}]*)\}', rule, css)
def swap(css, old, new, label):
    assert old in css, 'anchor not found: ' + label
    return css.replace(old, new, 1)
def cut(css, start, end, new, label):
    i = css.index(start); j = css.index(end, i)
    return css[:i] + new + css[j:]

# ------------------------------------------------------------------ typography.css
ty = mech(rd('typography.css'))
ty = swap(ty, ty[:ty.index('*{box-sizing')], '''/* typography.css
   Type, base layout, page chrome (app bar and outline), focus, motion, print.
   Meridian revision. Sizes come from the eight --fs-* tokens; nothing renders
   below --fs-label (12.5px). Sizes are rem so browser zoom scales the page.
   Faces: --font-display and --font-ui for headings and interface text,
   --font-reading for prose, --font-code for prompts, model output and code only.
   FONT SOURCING is unchanged: one Google Fonts request, local fallbacks in the
   stacks so an offline open degrades instead of breaking. */
''', 'header')
ty = re.sub(r'body\{[^}]*\}', 'body{margin:0;padding-top:var(--bar-h);background:var(--page);color:var(--ink);\n  font-family:var(--font-reading);font-size:var(--fs-body);line-height:1.6}', ty, 1)
ty = re.sub(r'\nh1\{[^}]*\}', '\nh1{font-size:clamp(2rem,5.4vw,var(--fs-title));line-height:1.04;font-weight:700}', ty, 1)
ty = re.sub(r'\nh2\{[^}]*\}', '\nh2{font-size:clamp(1.5rem,3.6vw,var(--fs-section));line-height:1.1;font-weight:600}', ty, 1)
ty = re.sub(r'\nh3\{[^}]*\}', '\nh3{font-size:clamp(1.125rem,2.1vw,var(--fs-finding));line-height:1.24;font-weight:600;margin-top:var(--space-6)}', ty, 1)
ty = re.sub(r'\nh4\{[^}]*\}', '\nh4{font-size:var(--fs-control);font-weight:600;letter-spacing:-.01em}', ty, 1)
ty = re.sub(r'\.big\{[^}]*\}', '.big{font-size:clamp(1.125rem,2.1vw,var(--fs-finding));line-height:1.5}', ty, 1)
ty = re.sub(r'\.lede\{[^}]*\}', '.lede{font-size:clamp(1.125rem,2.1vw,var(--fs-finding));line-height:1.45;color:var(--muted);\n  max-width:46ch;margin:22px 0 0}', ty, 1)
ty = re.sub(r'\.eyebrow\{[^}]*\}', '''.eyebrow{font-family:var(--font-ui);font-size:var(--fs-label);color:var(--muted);font-weight:600;
  margin-bottom:14px;display:flex;flex-wrap:wrap;gap:var(--space-2);align-items:center}
.eyebrow>span:first-child{background:var(--primary-bg);color:var(--primary);padding:2px 8px;border-radius:var(--radius-sm)}
.slide.apx .eyebrow>span:first-child{background:var(--attention-bg);color:var(--attention)}''', ty, 1)
ty = cut(ty, '/* Fixed topbar */', '/* Case modal */', '''/* App bar: navy frame, course name at the left, depth and case controls at the right */
#topbar{position:fixed;top:0;left:0;right:0;height:var(--bar-h);background:var(--chrome);
  color:var(--on-chrome);z-index:60;display:flex;align-items:center;gap:10px;
  padding:0 var(--space-4);font-family:var(--font-ui)}
#topbar .ttl,#topbar .tb-l{font-size:var(--fs-small);font-weight:600;color:var(--on-chrome);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-right:auto}
#topbar .ttl i,#topbar .tb-l i{font-style:normal;font-weight:500;color:var(--chrome-muted)}
#pnum{font-size:var(--fs-label);color:var(--chrome-muted);white-space:nowrap;font-weight:600}
#ptrack{flex:1}
#topbar a.casebtn,#topbar button,#caseBtn{font-family:var(--font-ui);font-size:var(--fs-label);
  font-weight:600;background:none;border:1px solid var(--chrome-muted);color:var(--on-chrome);
  border-radius:var(--radius-md);padding:4px 10px;cursor:pointer;white-space:nowrap;text-decoration:none}
#topbar a.casebtn:hover,#topbar button:hover,#caseBtn:hover{background:var(--on-chrome);
  color:var(--chrome);border-color:var(--on-chrome)}
#topbar :focus-visible{outline:2px solid var(--on-chrome);outline-offset:2px}
#outlineToggle{display:none}
''', 'topbar')
ty = cut(ty, '/* Progress rail (wide viewports only) */', '/* Data table */', '''/* Outline sidebar: labelled sections, earned checks, core-time meter.
   Built by outline.js, which adds body.has-outline; pages without it are unaffected.
   #rail is the retired dot rail and stays hidden for pages not yet rebuilt. */
#rail{display:none}
#outline{position:fixed;top:var(--bar-h);left:0;bottom:0;width:var(--outline-w);background:var(--surface);
  border-right:1px solid var(--line);padding:var(--space-4) var(--space-2) var(--space-5);overflow:auto;
  z-index:55;font-family:var(--font-ui);font-size:var(--fs-small);line-height:1.35;
  display:flex;flex-direction:column;gap:1px}
#outline .meter{padding:0 var(--space-2) var(--space-3);display:flex;flex-direction:column;gap:6px;
  font-size:var(--fs-label);color:var(--muted);border-bottom:1px solid var(--line);margin-bottom:var(--space-2)}
#outline .meter b{color:var(--ink);font-size:var(--fs-small);font-weight:600}
#outline .meter i{height:6px;border-radius:var(--radius-sm);
  background:linear-gradient(90deg,var(--primary) var(--pct,0%),var(--line) var(--pct,0%))}
#outline a{display:grid;grid-template-columns:18px 1fr auto;gap:var(--space-2);align-items:center;
  padding:6px var(--space-2);border-radius:var(--radius-md);color:var(--ink);text-decoration:none;cursor:pointer}
#outline a:hover{background:var(--page)}
#outline a em{font-style:normal;font-size:var(--fs-label);color:var(--muted);
  font-variant-numeric:tabular-nums;white-space:nowrap}
#outline a[aria-current]{background:var(--primary-bg);color:var(--primary);font-weight:600}
#outline a.apx{color:var(--muted)}
@media(min-width:1100px){body.has-outline{padding-left:var(--outline-w)}}
@media(max-width:1099px){
  body.has-outline #outlineToggle{display:inline-block}
  #outline{transform:translateX(-100%);transition:transform .15s}
  #outline.open{transform:none;box-shadow:0 0 0 100vmax rgba(19,32,58,.35)}
}
/* Earned check: done / partial / to do / nothing to complete. Shape first, colour second. */
.mck{width:18px;height:18px;border-radius:var(--radius-pill);display:inline-grid;place-items:center;
  font:700 11px/1 var(--font-ui);color:var(--on-primary);position:relative;flex:none}
.mck.done{background:var(--primary)}
.mck.done::before{content:"\\2713"}
.mck.part{background:conic-gradient(var(--primary) 0 var(--part,50%),var(--line) var(--part,50%) 100%)}
.mck.part::after{content:"";position:absolute;inset:4px;border-radius:var(--radius-pill);background:var(--surface)}
.mck.todo{border:1.5px solid var(--muted)}
.mck.none{width:6px;height:6px;margin:6px;background:var(--neutral)}
''', 'rail')
ty = re.sub(r':focus-visible\{[^}]*\}', ':focus-visible{outline:2px solid var(--primary);outline-offset:2px;border-radius:var(--radius-sm)}', ty, 1)
ty = ty.replace('@media(prefers-reduced-motion:reduce){*{animation:none!important}}', '@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}')
ty = ty.replace('#rail,#topbar,#caseModal{display:none}', '#rail,#outline,#topbar,#caseModal{display:none}')
ty = ty.replace('body{background:var(--surface);padding-top:0}', 'body,body.has-outline{background:var(--surface);padding:0}')
wr('typography.css', ty)

# ------------------------------------------------------------------ components.css
co = mech(rd('components.css'))
co = swap(co, co[:co.index('/* ---- buttons (shared)')], '''/* components.css
   Every component style, one commented block per family. Meridian revision.
   Family keys match references/component-bank.md data-comp values.
   Rules: colour, size and radius come from tokens; interface text uses --font-ui
   in sentence case; --font-code is for prompts, model output and code; callouts
   are full tints with no side stripe; nothing is smaller than --fs-label.
   Edit here, then scripts/restyle_sweep.py propagates to every lesson. */
''', 'header')
co = re.sub(r'\.btn\{[^}]*\}', '.btn{font-family:var(--font-ui);font-size:var(--fs-small);font-weight:600;background:var(--primary);\n  color:var(--on-primary);border:1px solid var(--primary);border-radius:var(--radius-md);padding:9px 16px;cursor:pointer;transition:.15s}', co, 1)
co = co.replace('.btn.ghost{background:none;color:var(--on);border:1.5px solid var(--on)}', '.btn.ghost{background:var(--surface);color:var(--primary);border:1px solid var(--primary)}')
co = co.replace('.btn.mini{padding:7px 12px;font-size:var(--fs-label)}', '.btn.mini{padding:6px 12px;font-size:var(--fs-label)}')
co = co.replace('.btn[disabled]{opacity:.32;pointer-events:none}', '.btn[disabled]{background:var(--page);color:var(--muted);border-color:var(--line);pointer-events:none}')
# callouts: full tints, no side stripe
for cls, bg in (('inote', 'warn-bg'), ('talk', 'on-bg'), ('wolf', 'gold-bg')):
    co = re.sub(r'\.%s\{border-left:4px solid var\(--\w+\);background:var\(--%s\);\s*border-radius:0 9px 9px 0;' % (cls, bg),
                '.%s{background:var(--%s);border-radius:var(--radius-sm);' % (cls, bg), co, 1)
    assert ('.%s{background:var(--%s);border-radius:var(--radius-sm);' % (cls, bg)) in co, cls
co = re.sub(r'\.assume\{background:var\(--off-bg\);border-left:3px solid var\(--off\);\s*border-radius:0 8px 8px 0;', '.assume{background:var(--off-bg);border-radius:var(--radius-sm);', co, 1)
co = co.replace('.bigask{border:3px solid var(--on);', '.bigask{border:1px solid var(--primary);')
# evidence chips
co = cut(co, '.conf{', '/* ---- distribution-picker', '''.conf{font-family:var(--font-ui);font-size:var(--fs-label);font-weight:600;line-height:1.3;
  padding:1px 7px 1px 6px;border-radius:var(--radius-sm);display:inline-flex;align-items:center;
  gap:var(--space-1);vertical-align:.08em;white-space:nowrap}
/* the dot's fill level carries the grade: full H, half M, empty L */
.conf::before{content:"";width:7px;height:7px;border-radius:var(--radius-pill);background:currentColor;flex:none}
.conf.h{background:var(--primary-bg);color:var(--primary)}
.conf.m{background:var(--attention-bg);color:var(--attention)}
.conf.m::before{background:linear-gradient(90deg,currentColor 50%,transparent 50%);box-shadow:inset 0 0 0 1.3px currentColor}
.conf.l{background:var(--caution-bg);color:var(--caution)}
.conf.l::before{background:transparent;box-shadow:inset 0 0 0 1.3px currentColor}
''', 'conf')
co = co.replace('svg.ch text{font-family:var(--font-code);font-size:var(--fs-label);fill:var(--muted)}', 'svg.ch text{font-family:var(--font-ui);font-size:12.5px;fill:var(--muted)}')
co = co.replace('svg.ch .pt circle{fill:var(--off);', 'svg.ch .pt circle{fill:var(--chart-context);')
co = co.replace('.cbar .tr span{display:block;height:100%;background:var(--on);border-radius:var(--radius-sm);', '.cbar .tr span{display:block;height:100%;background:var(--primary);border-radius:0 var(--radius-sm) var(--radius-sm) 0;')
co = co.replace('.cbar.sub .tr span{background:var(--gold)}', '.cbar.sub .tr span{background:var(--chart-context)}')
co += '''/* ---- figure ---- Meridian (.fig): the title is the finding, grey is context, primary is the subject */
.fig{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-md);
  padding:var(--space-5);margin:22px 0;font-family:var(--font-ui);display:flex;flex-direction:column;gap:6px}
.fig-title{font-size:var(--fs-control);font-weight:600;line-height:1.35;color:var(--ink)}
.fig-sub{font-size:var(--fs-small);color:var(--muted);line-height:1.45}
.fig-src{font-size:var(--fs-label);color:var(--muted);line-height:1.55;margin-top:var(--space-2);
  border-top:1px solid var(--line);padding-top:var(--space-2)}
.fig-bars{display:grid;grid-template-columns:minmax(96px,150px) 1fr;gap:6px var(--space-3);
  align-items:center;margin-top:var(--space-1)}
.fig-bars .grp{grid-column:1/-1;font-size:var(--fs-label);font-weight:600;color:var(--muted);margin-top:var(--space-1)}
.fig-bars .lab{text-align:right;font-size:var(--fs-small)}
.fig-bars .track{position:relative;height:18px}
.fig-bars .bar{position:absolute;left:0;top:0;bottom:0;background:var(--chart-context);
  border-radius:0 var(--radius-sm) var(--radius-sm) 0}
.fig-bars .bar.subject{background:var(--primary)}
.fig-bars .val{position:absolute;top:50%;transform:translateY(-50%);padding-left:7px;
  font-size:var(--fs-small);font-weight:600;color:var(--ink);font-variant-numeric:tabular-nums}
/* categorical series, fixed order; use only when series are different kinds of thing */
.s1{fill:var(--chart-1);background:var(--chart-1)}.s2{fill:var(--chart-2);background:var(--chart-2)}
.s3{fill:var(--chart-3);background:var(--chart-3)}.s4{fill:var(--chart-4);background:var(--chart-4)}
/* ---- margin note ---- Meridian (.withmargin/.mnote): sources and first-use terms beside the paragraph */
.withmargin{display:grid;grid-template-columns:minmax(0,1fr) 200px;gap:var(--space-6);align-items:start}
.withmargin>p,.withmargin>div>p{max-width:64ch}
.mnote{font-family:var(--font-ui);font-size:var(--fs-label);color:var(--muted);line-height:1.5;
  display:flex;flex-direction:column;gap:var(--space-3);margin-top:var(--space-4)}
.mnote>div{border-top:1px solid var(--line);padding-top:var(--space-2);display:flex;flex-direction:column;gap:3px}
.mnote b{color:var(--ink);font-weight:600;letter-spacing:.04em;text-transform:uppercase}
.mnote dfn{font-style:normal;font-weight:600;color:var(--ink)}
@media(max-width:1340px){.withmargin{grid-template-columns:1fr;gap:0}}
/* ---- work-along callout ---- Meridian (.doit): amber is reserved for this */
.doit{background:var(--attention-bg);border:1px solid var(--attention-line);border-radius:var(--radius-md);
  padding:var(--space-4) var(--space-5);margin:var(--space-5) 0}
.doit .plab{color:var(--attention)}
.doit .tally{font-family:var(--font-ui);font-size:var(--fs-label);color:var(--attention);font-weight:600}
'''
wr('components.css', co)

# ------------------------------------------------------------------ outline.js
JS = r'''/* outline.js
   Builds the outline sidebar and the earned checks. Commits only: an action counts
   when a control marked data-commit is activated; opening a key without committing
   does not. State is held in a variable and clears on reload (PEDAGOGY 1.9).
   Nothing here gates scrolling (PEDAGOGY 1.10).
   Markup contract:
     section.slide[data-nav="Title"]      one outline row each; .apx marks appendix
     .mins inside a section               its minutes
     [data-commit] on a control           one earned action; add data-commit-on="input"
                                          for a field that commits on first entry
   A section with no [data-commit] shows the neutral dot and its minutes. */
(function(){
"use strict";
var secs=[].slice.call(document.querySelectorAll('section.slide[data-nav]')).filter(function(s){return !s.classList.contains('apxdiv')});
if(!secs.length)return;
var bar=document.getElementById('topbar');if(!bar)return;
var done={},acts={},rows={},cur=null;
function mins(s){var m=s.querySelector('.mins');var v=m?parseInt(m.textContent,10):0;return isNaN(v)?0:v}
function apx(s){return s.classList.contains('apx')}
function shown(s){return s.offsetParent!==null}
var out=document.createElement('nav');out.id='outline';out.setAttribute('aria-label','Session outline');
var tog=document.createElement('button');tog.id='outlineToggle';tog.type='button';tog.textContent='Outline';
tog.setAttribute('aria-expanded','false');tog.setAttribute('aria-controls','outline');
bar.insertBefore(tog,bar.firstChild);document.body.appendChild(out);document.body.classList.add('has-outline');
function close(){out.classList.remove('open');tog.setAttribute('aria-expanded','false')}
tog.addEventListener('click',function(){var o=out.classList.toggle('open');tog.setAttribute('aria-expanded',o?'true':'false')});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
secs.forEach(function(s){
  var a=[].slice.call(s.querySelectorAll('[data-commit]'));acts[s.id]=a;done[s.id]=[];
  a.forEach(function(el){el.addEventListener(el.getAttribute('data-commit-on')||'click',function(){
    if(done[s.id].indexOf(el)<0){done[s.id].push(el);paint()}})})});
function build(){
  out.textContent='';rows={};
  var m=document.createElement('div');m.className='meter';
  m.innerHTML='<b id="olMin"></b><i id="olBar"></i><span id="olAct"></span>';out.appendChild(m);
  secs.forEach(function(s){if(!shown(s))return;
    var a=document.createElement('a');a.href='#'+s.id;if(apx(s))a.className='apx';
    var ck=document.createElement('span');ck.className='mck';ck.setAttribute('role','img');
    var t=document.createElement('span');t.textContent=s.getAttribute('data-nav');
    var em=document.createElement('em');a.appendChild(ck);a.appendChild(t);a.appendChild(em);
    a.addEventListener('click',function(e){e.preventDefault();s.scrollIntoView({block:'start'});close()});
    out.appendChild(a);rows[s.id]=a});
  cur=null;paint();spy()}
function paint(){var tot=0,dn=0;
  secs.forEach(function(s){var a=rows[s.id];if(!a)return;var n=acts[s.id].length,d=done[s.id].length,ck=a.children[0],em=a.children[2];
    tot+=n;dn+=d;
    if(!n){ck.className='mck none';em.textContent=mins(s)+' min';ck.setAttribute('aria-label','Reading only')}
    else{ck.className='mck '+(d>=n?'done':d>0?'part':'todo');ck.style.setProperty('--part',Math.round(100*d/n)+'%');
      em.textContent=d+'/'+n;ck.setAttribute('aria-label',d>=n?'Done':d+' of '+n+' done')}});
  var el=document.getElementById('olAct');if(el)el.textContent='Activities done this sitting: '+dn+' of '+tot}
function spy(){var c=secs[0];secs.forEach(function(s){if(shown(s)&&s.getBoundingClientRect().top<=140)c=s});
  var total=0,elapsed=0,before=true;
  secs.forEach(function(s){if(s===c)before=false;if(apx(s))return;var m=mins(s);total+=m;if(before)elapsed+=m});
  var mn=document.getElementById('olMin'),br=document.getElementById('olBar');
  if(mn)mn.textContent=elapsed+' of '+total+' core min';if(br)br.style.setProperty('--pct',(total?Math.round(100*elapsed/total):0)+'%');
  if(c!==cur){if(cur&&rows[cur.id])rows[cur.id].removeAttribute('aria-current');cur=c;if(rows[c.id])rows[c.id].setAttribute('aria-current','true')}}
var tick=false;window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(function(){tick=false;spy()})}},{passive:true});
var tier=document.getElementById('tierbar');if(tier)tier.addEventListener('click',function(){setTimeout(build,60)});
build();
})();
'''
wr('outline.js', JS)

# ------------------------------------------------------------------ diff + stats
diff = []
for n in ('tokens.css', 'typography.css', 'components.css'):
    a = rd(n).splitlines(keepends=True); b = open(os.path.join(NEW, n)).read().splitlines(keepends=True)
    diff += list(difflib.unified_diff(a, b, 'current/' + n, 'meridian/' + n, n=1))
open(os.path.join(HERE, 'skill-css', 'meridian.diff'), 'w').write(''.join(diff))
def stats(d):
    s = ''.join(open(os.path.join(d, n)).read() for n in ('tokens.css', 'typography.css', 'components.css'))
    body = s[s.index('}', s.index(':root{')):]  # after the token block
    return dict(bytes=len(s), font_sizes=len(set(re.findall(r'font-size:\s*([^;}]+)', body))),
                literal_hex=len(set(x.lower() for x in re.findall(r'#[0-9a-fA-F]{3,8}\b', body))),
                radii=len(set(re.findall(r'border-radius:\s*([^;}]+)', body))),
                uppercase=len(re.findall(r'text-transform:\s*uppercase', body)),
                mono_rules=len(re.findall(r'JetBrains Mono|--font-code', body)))
print('current ', stats(CUR)); print('meridian', stats(NEW))
print('diff lines', len(diff))
