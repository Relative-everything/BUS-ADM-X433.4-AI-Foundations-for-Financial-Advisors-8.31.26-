#!/usr/bin/env python3
"""Render CHANGELOG.md into changelog/index.html so the live site serves a
styled page rather than raw markdown. No dependencies, no build step: run it
whenever CHANGELOG.md changes, then commit both files.

    python3 scripts/build-changelog.py
    python3 <skill>/scripts/restyle_sweep.py .   # refill the style fence

Handles the subset of markdown the changelog actually uses: h1/h2/h3, hr,
bullet lists, tables, bold, inline code, and links.
"""
import html
import pathlib
import re
import os
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "CHANGELOG.md"
OUT = ROOT / "changelog" / "index.html"


def inline(text):
    text = html.escape(text, quote=False)
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', text)
    return text


def render(md):
    out, i, lines = [], 0, md.split("\n")
    while i < len(lines):
        ln = lines[i]
        if ln.startswith("### "):
            out.append(f"<h3>{inline(ln[4:])}</h3>")
        elif ln.startswith("## "):
            out.append(f"<h2>{inline(ln[3:])}</h2>")
        elif ln.startswith("# "):
            out.append(f"<h1>{inline(ln[2:])}</h1>")
        elif ln.strip() == "---":
            out.append("<hr>")
        elif ln.lstrip().startswith("|"):
            rows = []
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                rows.append(lines[i].strip())
                i += 1
            cells = [[c.strip() for c in r.strip("|").split("|")] for r in rows]
            body = [r for r in cells if not all(set(c) <= set("-: ") for c in r)]
            if body:
                head, rest = body[0], body[1:]
                t = ["<table><thead><tr>"]
                t += [f"<th>{inline(c)}</th>" for c in head]
                t.append("</tr></thead><tbody>")
                for r in rest:
                    t.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>")
                t.append("</tbody></table>")
                out.append("".join(t))
            continue
        elif ln.lstrip().startswith("- "):
            items = []
            while i < len(lines) and (lines[i].lstrip().startswith("- ") or
                                      (lines[i].startswith("  ") and lines[i].strip() and items)):
                if lines[i].lstrip().startswith("- "):
                    items.append(lines[i].lstrip()[2:])
                else:
                    items[-1] += " " + lines[i].strip()
                i += 1
            out.append("<ul>" + "".join(f"<li>{inline(x)}</li>" for x in items) + "</ul>")
            continue
        elif re.match(r"\s*\d+\.\s", ln):
            # Ordered lists. Same shape as the bullet branch above: a numbered
            # line opens an item, an indented continuation line extends it.
            # Without this branch every numbered line falls through to the
            # paragraph case and a "do these in order" list renders as a wall
            # of paragraphs with the numbers stranded inside the prose.
            items = []
            while i < len(lines) and (re.match(r"\s*\d+\.\s", lines[i]) or
                                      (lines[i].startswith("  ") and lines[i].strip() and items)):
                if re.match(r"\s*\d+\.\s", lines[i]):
                    items.append(re.sub(r"^\s*\d+\.\s+", "", lines[i]))
                else:
                    items[-1] += " " + lines[i].strip()
                i += 1
            out.append("<ol>" + "".join(f"<li>{inline(x)}</li>" for x in items) + "</ol>")
            continue
        elif ln.strip():
            para = [ln]
            i += 1
            while i < len(lines) and lines[i].strip() and not re.match(r"\s*([-#|]|\d+\.)", lines[i]):
                para.append(lines[i])
                i += 1
            out.append(f"<p>{inline(' '.join(x.strip() for x in para))}</p>")
            continue
        i += 1
    return "\n".join(out)


TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Changelog · BUS ADM X433.4</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
/* STYLE:BEGIN managed-by=restyle_sweep.py */
/* STYLE:END */
</style>
<style>
:root{--page:#F4F4F1;--card:#FFF;--ink:#16211F;--muted:#6F7B78;--off:#B9BDB9;--off-bg:#E7E8E4;
--on:#0E5A55;--on-bg:#E2EDEB;--warn:#9A4B22;--warn-bg:#F6EAE2;--line:#D8DAD4;--gold:#8A6A12;--gold-bg:#F3EEDF}
*{box-sizing:border-box}
body{margin:0;background:var(--page);color:var(--ink);font-family:"Source Serif 4",Georgia,serif;font-size:17px;line-height:1.6}
.wrap{max-width:840px;margin:0 auto;padding:clamp(40px,6vw,72px) clamp(20px,5vw,48px) 72px}
h1,h2,h3{font-family:"Bricolage Grotesque",system-ui,sans-serif;letter-spacing:-.022em;margin:0}
h1{font-size:clamp(30px,5vw,46px);font-weight:700;line-height:1.05}
h2{font-size:clamp(20px,2.6vw,26px);font-weight:600;margin:46px 0 4px;padding-top:14px}
h3{font-size:17px;font-weight:600;margin:26px 0 2px;color:var(--on)}
p{margin:12px 0;max-width:68ch}
ul,ol{margin:10px 0;padding-left:22px;max-width:68ch}
ol li{padding-left:4px}
li{margin:7px 0}
hr{border:none;border-top:1px solid var(--line);margin:40px 0 0}
code{font-family:"JetBrains Mono",monospace;font-size:.87em;background:var(--off-bg);padding:2px 5px;border-radius:4px}
a{color:var(--on)}
table{border-collapse:collapse;margin:16px 0;font-size:14.5px;width:100%;display:block;overflow-x:auto}
th{text-align:left;font-family:"JetBrains Mono",monospace;font-size:10px;letter-spacing:.11em;text-transform:uppercase;color:var(--muted);border-bottom:1.5px solid var(--line);padding:7px 10px}
td{padding:7px 10px;border-bottom:1px solid var(--line);vertical-align:top}
.eyebrow{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.17em;text-transform:uppercase;color:var(--on);font-weight:500;margin-bottom:12px}
.back{display:inline-block;margin-bottom:26px;font-family:"JetBrains Mono",monospace;font-size:11.5px;letter-spacing:.05em;text-decoration:none;color:var(--on)}
.back:hover{text-decoration:underline}
footer{border-top:1px solid var(--line);margin-top:56px;padding-top:22px;font-size:13.5px;color:var(--muted)}
@media (prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;transition-duration:.001ms!important}}
:focus-visible{outline:2.5px solid var(--on);outline-offset:3px;border-radius:4px}
</style>
</head>
<body>
<div class="wrap">
<a class="back" href="../">&larr; Course hub</a>
<div class="eyebrow">BUS ADM X433.4 &middot; UC Berkeley Extension &middot; Fall 2026</div>
__BODY__
<footer>
<p>Generated from <code>CHANGELOG.md</code> by <code>scripts/build-changelog.py</code>. Regenerate and commit both files whenever the changelog changes.</p>
</footer>
</div>
</body>
</html>
"""


def find_sweep():
    """Locate the skill's restyle_sweep.py, or None if the skill is not installed."""
    P = pathlib.Path
    env = os.environ.get("LESSON_BUILDER_SKILL")
    candidates = []
    if env:
        candidates.append(P(env) / "scripts" / "restyle_sweep.py")
    candidates += [
        P.home() / ".claude/skills/synced/interactive-lesson-builder/scripts/restyle_sweep.py",
        P.home() / ".claude/skills/interactive-lesson-builder/scripts/restyle_sweep.py",
    ]
    for c in candidates:
        if c.is_file():
            return c
    return None


def main():
    if not SRC.exists():
        sys.exit(f"missing {SRC}")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(TEMPLATE.replace("__BODY__", render(SRC.read_text(encoding="utf-8"))),
                   encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)} from {SRC.name}")

    # The template writes an EMPTY managed fence, which only restyle_sweep.py can
    # fill. Regenerating without sweeping leaves the fence stale and turns
    # verify-style.mjs red on a page whose source is perfectly correct — a
    # two-step nobody was enforcing. Run it here so the second step cannot be
    # forgotten, and say so loudly when the skill is not installed to run it.
    sweep = find_sweep()
    if sweep is None:
        print("WARNING  the style fence in the page just written is EMPTY.")
        print("         restyle_sweep.py was not found, so it could not be filled.")
        print("         Install the interactive-lesson-builder skill, or set")
        print("         LESSON_BUILDER_SKILL, then run:")
        print(f"           python3 <skill>/scripts/restyle_sweep.py {ROOT}")
        print("         verify-style.mjs will fail until you do.")
        return
    r = subprocess.run([sys.executable, str(sweep), str(ROOT)],
                       capture_output=True, text=True)
    tail = [l for l in r.stdout.splitlines() if l.startswith(("WROTE", "summary"))]
    for l in tail:
        print(f"  sweep: {l}")
    if r.returncode not in (0, 1):
        print(f"WARNING  restyle_sweep.py exited {r.returncode}; check the fence by hand")
    # exit 1 from the sweep is EXPECTED here: it reports the two generated
    # fragments that must stay fenceless. verify-style.mjs is the wrapper that
    # knows that and is the check to trust.


if __name__ == "__main__":
    main()
