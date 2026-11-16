#!/usr/bin/env python3
"""restyle-local.py: step 2 of the Meridian restyle, for CSS the sweep does not own.

  python3 restyle-local.py pages [--root DIR] [--write]     convert page-local CSS and inline style attributes
  python3 restyle-local.py css FILE [--write]               convert one style sheet (the promoted block)

The mechanical rules are build-drafts.py's own: this script executes that file's "shared mechanical
pass" (snap, rule, mech) so there is one copy of them. They do: monospace label rules to the interface
face in sentence case, literal font stacks to the --font-* tokens, sizes up to 19px onto --fs-label /
--fs-small / --fs-control / --fs-body, single-value radii onto --radius-sm / --radius-md, white and
the old palette's literals onto tokens, 1.5px lines to 1px.

build-drafts.py was written for the three shared sheets, which its author then finished by hand. Page
CSS has shapes it does not reach, so this script adds five rules of the same kind (D-126):
  X1  a pill radius (99px and up, or 50%) is --radius-pill, not --radius-md; a radius of several
      values is snapped value by value; 0 stays 0
  X2  a size above 19px goes to the nearest of the eight steps (21, 26, 34, 46), also inside clamp()
      and the font shorthand; em and % sizes are relative and stay
  X3  a literal that equals an old palette value becomes that token (#16211F is --ink, and so on)
  X4  the same rules applied to inline style="" attributes, outside generated regions and scripts
  X5  line-height given in px is left alone (it is not a type size)
What it leaves is listed by `ui-audit.mjs --list`, and each kind is given its reason in the handback.

Never touched: the STYLE fence, the LMSTYLE fence, the CASE span, any other NAME:BEGIN..NAME:END
region, and every <script>. Page-local means what css-rules.mjs says it means; the regions are found
here with the same rules.
"""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
src = open(os.path.join(HERE, 'build-drafts.py'), encoding='utf-8').read()
a = src.index('# ------------------------------------------------------------------ shared mechanical pass')
b = src.index('def swap(')
exec(src[a:b])          # defines KEEP_CAPS, snap, rule, mech

STEPS = [(12.5, 'label'), (14, 'small'), (16, 'control'), (18, 'body'), (21, 'finding'), (26, 'subhead'), (34, 'section'), (46, 'title')]
OLD = {'#F4F4F1': 'page', '#16211F': 'ink', '#6F7B78': 'muted', '#D8DAD4': 'line', '#0E5A55': 'primary', '#E2EDEB': 'primary-bg',
       '#8A6A12': 'attention', '#F3EEDF': 'attention-bg', '#9A4B22': 'caution', '#F6EAE2': 'caution-bg', '#B9BDB9': 'neutral',
       '#E7E8E4': 'neutral-bg', '#FFFFFF': 'surface', '#FFF': 'surface',
       '#F6F6F3': 'page', '#13203A': 'ink', '#535F73': 'muted', '#D9DCE2': 'line', '#0B6B66': 'primary', '#E0EFED': 'primary-bg'}

def step(px):
    px = float(px)
    if px <= 12.5: return 'label'
    best = min(STEPS, key=lambda s: (abs(s[0] - px), -s[0]))
    return best[1]

def px_of(num, unit):
    return float(num) * (16 if unit == 'rem' else 1)

def size_value(v):
    """a font-size value: every px or rem length in it onto the scale"""
    def one(m):
        return 'var(--fs-%s)' % step(px_of(m.group(1), m.group(2)))
    return re.sub(r'(?<![\w.-])([0-9]*\.?[0-9]+)(px|rem)\b', one, v)

def radius_value(v):
    def one(m):
        n = float(m.group(1))
        if n == 0: return '0'
        return 'var(--radius-pill)' if n >= 99 else 'var(--radius-sm)' if n <= 6 else 'var(--radius-md)'
    return re.sub(r'(?<![\w.-])([0-9]*\.?[0-9]+)px\b', one, v)

def extra(body):
    def decl(m):
        prop, val = m.group(1), m.group(2)
        p = prop.strip().lower()
        if p == 'font-size' and not val.strip().startswith('var('):
            val = size_value(val)
        elif p == 'font' and re.search(r'[0-9.]+(px|rem)', val):
            head, sep, tail = val.partition('/')
            val = size_value(head) + sep + tail
        elif re.match(r'border(-(top|bottom)-(left|right))?-radius$', p):
            val = radius_value(val).replace('50%', 'var(--radius-pill)') if p == 'border-radius' and val.strip() == '50%' else radius_value(val)
        if not p.startswith('--'):
            val = re.sub(r'#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b', lambda h: 'var(--%s)' % OLD[h.group(0).upper()] if h.group(0).upper() in OLD else h.group(0), val)
            val = val.replace('rgba(244,244,241', 'rgba(246,246,243')
        return prop + ':' + val
    return re.sub(r'([\w-]+)\s*:\s*((?:[^;{}"\']|"[^"]*"|\'[^\']*\')*)', decl, body)

def pre(body):
    """X1 before the base rule sees it: the base rule would turn a pill into --radius-md"""
    body = re.sub(r'border-radius:\s*(?:(?:9[0-9]|[1-9][0-9]{2,})px|50%)\s*(?=[;}]|$)', 'border-radius:var(--radius-pill)', body)
    return body

def convert_rule(m):
    sel, body = m.group(1), m.group(2)
    if sel.strip().startswith('@font-face'): return m.group(0)
    out = rule(re.match(r'([^{}]*)\{([^{}]*)\}', sel + '{' + pre(body) + '}'))
    i = out.index('{')
    return out[:i + 1] + extra(out[i + 1:-1]) + '}'

def convert_css(css):
    return re.sub(r'([^{}]*)\{([^{}]*)\}', convert_rule, css)

def convert_inline(v):
    out = convert_rule(re.match(r'([^{}]*)\{([^{}]*)\}', '[style]{' + v + '}'))
    return out[len('[style]{'):-1]

BEGIN, END = '/* STYLE:BEGIN managed-by=restyle_sweep.py */', '/* STYLE:END */'

def local_regions(html):
    out = []
    ca, cb = html.find('<!-- CASE:BEGIN'), html.find('<!-- CASE:END')
    for m in re.finditer(r'<style\b[^>]*>([\s\S]*?)</style>', html, re.I):
        bs, be = m.start(1), m.end(1)
        if ca >= 0 and ca < bs < cb: continue
        before = re.sub(r'<!--[\s\S]*?-->', '', html[:m.start()])
        if len(re.findall(r'<script\b', before, re.I)) > len(re.findall(r'</script>', before, re.I)): continue
        body, holes = html[bs:be], []
        if BEGIN in body and END in body: holes.append((bs + body.index(BEGIN), bs + body.index(END) + len(END)))
        lm = re.search(r'/\* LMSTYLE:BEGIN[\s\S]*?/\* LMSTYLE:END[^*]*\*/', body)
        if lm: holes.append((bs + lm.start(), bs + lm.end()))
        p = bs
        for x, y in sorted(holes):
            if x > p: out.append((p, x))
            p = y
        if be > p: out.append((p, be))
    return out

def frozen_spans(html):
    """generated or versioned regions and scripts: inline styles inside them are not ours to change"""
    spans = [(m.start(), m.end()) for m in re.finditer(r'<script\b[\s\S]*?</script>', html, re.I)]
    for m in re.finditer(r'<!--\s*([A-Z][A-Z0-9-]*):BEGIN[\s\S]*?\1:END[^>]*-->', html):
        spans.append((m.start(), m.end()))
    spans += [(m.start(), m.end()) for m in re.finditer(r'<style\b[\s\S]*?</style>', html, re.I)]
    return spans

def convert_page(html):
    # 1. inline styles first (offsets in the body do not disturb the head regions computed next)
    spans = frozen_spans(html)
    def inl(m):
        if any(a <= m.start() < b for a, b in spans): return m.group(0)
        return m.group(1) + convert_inline(m.group(2)) + '"'
    html = re.sub(r'(\sstyle=")([^"]*)"', inl, html)
    # 2. page-local CSS, back to front
    for a, b in sorted(local_regions(html), reverse=True):
        html = html[:a] + convert_css(html[a:b]) + html[b:]
    return html

def pages(root):
    out = ['index.html'] + sorted(d + '/index.html' for d in os.listdir(root) if d.startswith('session-'))
    return out + sorted('cases/' + f for f in os.listdir(os.path.join(root, 'cases')) if f.endswith('.html'))

if __name__ == '__main__':
    args = sys.argv[1:]
    write = '--write' in args
    if args and args[0] == 'css':
        f = args[1]; s = open(f, encoding='utf-8').read(); t = convert_css(s)
        print(('wrote ' if write else 'would change ') + f + '  ' + str(sum(1 for x, y in zip(s.split('}'), t.split('}')) if x != y)) + ' rule(s)')
        if write: open(f, 'w', encoding='utf-8').write(t)
    elif args and args[0] == 'pages':
        root = os.path.abspath(args[args.index('--root') + 1]) if '--root' in args else REPO
        for p in pages(root):
            f = os.path.join(root, p); s = open(f, encoding='utf-8').read(); t = convert_page(s)
            print(('wrote ' if write else 'would change ') + p + '  ' + str(abs(len(t) - len(s))) + ' bytes net, ' + ('changed' if s != t else 'unchanged'))
            if write and s != t: open(f, 'w', encoding='utf-8').write(t)
    else:
        sys.exit(__doc__)
