#!/usr/bin/env python3
"""Extract the canonical Cole block from CASE.md, extract every copy of it
from the lesson, and diff each copy against the source. Byte comparison and a
unified diff; no eyeballing (build-checklist.md B4)."""
import difflib, hashlib, pathlib, re, sys

repo = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".")
lesson = repo / "session-0.1/index.html"

src = ""
inblk = False
for line in (repo / "CASE.md").read_text(encoding="utf-8").splitlines(keepends=True):
    if line.rstrip("\n") == "```html":
        inblk = True; continue
    if inblk and line.rstrip("\n") == "```":
        break
    if inblk:
        src += line

html = lesson.read_text(encoding="utf-8")
start = '<div class="panel" style="border-color:var(--on)">'
end = "\n  </div>\n"
copies, i = [], 0
while True:
    a = html.find(start, i)
    if a < 0:
        break
    b = html.find(end, a)
    copies.append(html[a:b + len(end)])
    i = b + 1

print("CASE.md canonical block : %d bytes  sha256 %s"
      % (len(src.encode()), hashlib.sha256(src.encode()).hexdigest()[:16]))
print("copies found in lesson  : %d  (expected 2: section 1 panel, case modal)" % len(copies))
fails = 0
for n, c in enumerate(copies, 1):
    same = c == src
    print("\ncopy %d : %d bytes  sha256 %s  IDENTICAL=%s"
          % (n, len(c.encode()), hashlib.sha256(c.encode()).hexdigest()[:16], same))
    if not same:
        fails += 1
        for l in difflib.unified_diff(src.splitlines(True), c.splitlines(True),
                                      "CASE.md", "lesson copy %d" % n):
            print("   " + l.rstrip("\n"))
if len(copies) != 2:
    fails += 1
    print("\nFAIL expected exactly 2 copies")
print("\nRESULT: %s" % ("FAIL" if fails else "PASS, every copy byte-identical to CASE.md"))
sys.exit(1 if fails else 0)
