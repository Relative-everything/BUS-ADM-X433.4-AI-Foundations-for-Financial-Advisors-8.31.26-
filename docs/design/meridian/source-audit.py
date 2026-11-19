#!/usr/bin/env python3
"""source-audit.py [--ref <commit>]: the strict half of the content audit, independent of content-freeze.mjs.

For each served page it takes the file at the freeze ref and the file in the tree, removes from BOTH
exactly the things a restyle may change, and requires what is left to be byte-identical:
  removed   every <style> element that is not inside a <script> (CSS, the STYLE fence included)
            every style="..." attribute on a tag outside scripts and comments (class attributes are KEPT:
            scripts read them, and the restyle changed none)
            the date in the footer stamp
  removed from the tree only, each counted and each required to be exactly what the generator writes
            the OUTLINE:BEGIN..END region
            the data-commit, data-commit-in and data-commit-needs attributes
            the <div id="topbar" data-outline-bar></div> line
  undone in the tree only
            the substitutions freeze-allow.json's two entries describe (12 colour values)
Anything else that differs is printed as a unified diff and the script exits 1. CSS and inline style are not content; what they do to the rendered page is the business of
render-audit.mjs.
"""
import difflib, os, re, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
ref = sys.argv[sys.argv.index('--ref') + 1] if '--ref' in sys.argv else open(os.path.join(HERE, 'FREEZE_REF')).read().strip()
pages = ['index.html'] + sorted(d + '/index.html' for d in os.listdir(REPO) if d.startswith('session-')) + sorted('cases/' + f for f in os.listdir(os.path.join(REPO, 'cases')) if f.endswith('.html'))
UNDO = {'session-2/index.html': [("var(--muted)')+';font-family:JetBrains Mono,monospace", "var(--off)')+';font-family:JetBrains Mono,monospace", 3),
                                 ('<span class="dbmk" style="flex:none;color:var(--muted);', '<span class="dbmk" style="flex:none;color:var(--off);', 1),
                                 ("mk.style.color=on?'var(--on)':'var(--muted)';", "mk.style.color=on?'var(--on)':'var(--off)';", 1),
                                 ("mk.style.color='var(--muted)';", "mk.style.color='var(--off)';", 1)],
        'session-3/index.html': [('style="color:var(--muted)"', 'style="color:#6F7B78"', 6)]}
GUARD = re.compile(r'<script\b[\s\S]*?</script>|<!--[\s\S]*?-->', re.I)

def outside(html, fn):
    """apply fn to the stretches of html that are not a script or a comment"""
    out, p = [], 0
    for m in GUARD.finditer(html):
        out.append(fn(html[p:m.start()])); out.append(m.group(0)); p = m.end()
    out.append(fn(html[p:])); return ''.join(out)

def strip_common(html):
    def f(s):
        s = re.sub(r'<style\b[^>]*>[\s\S]*?</style>', '<style></style>', s, flags=re.I)
        return re.sub(r'<[a-zA-Z][^<>]*>', lambda t: re.sub(r'\s+style="[^"]*"', '', t.group(0)), s)
    return re.sub(r'Last updated \d{4}-\d{2}-\d{2}', 'Last updated DATE', outside(html, f))

bad = 0
for p in pages:
    base = subprocess.run(['git', 'show', ref + ':' + p], cwd=REPO, capture_output=True, text=True).stdout
    now = open(os.path.join(REPO, p), encoding='utf-8').read(); notes = []
    for a, b, n in UNDO.get(p, []):
        c = now.count(a) if a != 'style="color:var(--muted)"' else None
        if a == 'style="color:var(--muted)"':
            # only inside scripts, and only as many as the entry says
            cnt = [0]
            def sub(m):
                t = m.group(0)
                if t.startswith('<script'): cnt[0] += t.count(a); return t.replace(a, b)
                return t
            now = GUARD.sub(sub, now); c = cnt[0]
        else: now = now.replace(a, b)
        if c != n: print('FAIL  %s  expected %d of the allowed substitution %r, found %s' % (p, n, a[:40], c)); bad += 1
        notes.append('%d colour value(s) undone' % n)
    m = re.search(r'\n?<!-- OUTLINE:BEGIN v1 generated-by=scripts/build-outline\.mjs -->\n<script>\n[\s\S]*?\n</script>\n<!-- OUTLINE:END v1 -->\n', now)
    if m:
        js = open(os.path.join(HERE, 'assets', 'outline.js'), encoding='utf-8').read().strip()
        if js not in m.group(0): print('FAIL  %s  the OUTLINE region is not assets/outline.js' % p); bad += 1
        now = now[:m.start()] + '\n' + now[m.end():]; notes.append('outline region removed')
    k = now.count('<div id="topbar" data-outline-bar></div>\n'); now = now.replace('<div id="topbar" data-outline-bar></div>\n', '')
    if k: notes.append('%d empty bar element removed' % k)
    cnt = [0]
    def f(s):
        def tag(t):
            x, n = re.subn(r'\s+data-commit(?:-in|-needs)?(?:="[^"]*")?', '', t.group(0)); cnt[0] += n; return x
        return re.sub(r'<[a-zA-Z][^<>]*>', tag, s)
    now = outside(now, f)
    if cnt[0]: notes.append('%d commit marker(s) removed' % cnt[0])
    A, B = strip_common(base), strip_common(now)
    # the generator normalises trailing newlines before its region; compare without trailing blank-line differences at the insertion point
    if A != B:
        A2, B2 = re.sub(r'\n+(</body>|</html>)', r'\n\1', A), re.sub(r'\n+(</body>|</html>)', r'\n\1', B)
        if A2 == B2: notes.append('blank lines before </body> differ'); A, B = A2, B2
    if A == B: print('same  %s  %d bytes of non-style source identical%s' % (p, len(A), ('  (' + '; '.join(notes) + ')') if notes else ''))
    else:
        bad += 1; d = list(difflib.unified_diff(A.splitlines(), B.splitlines(), 'ref', 'tree', lineterm='', n=0))
        print('DIFF  %s  %d differing line(s)' % (p, sum(1 for l in d if l[:1] in '+-' and l[:3] not in ('+++', '---'))))
        for l in d[:14]: print('        ' + l[:220])
print('\nsummary: ' + ('%d page(s) differ outside style' % bad if bad else 'outside CSS, inline style attributes, the stamp date and the generated outline additions, all %d pages are byte-identical to %s' % (len(pages), ref[:7])))
sys.exit(1 if bad else 0)
