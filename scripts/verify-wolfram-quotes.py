#!/usr/bin/env python3
"""DW-067: byte-verify every quoted span in session-1's six div.wolf reading
boxes against the instructor-supplied copy of the assigned article.

Normalises whitespace, curly quotes and HTML entities on BOTH sides, then
asserts each quoted span is a CONTIGUOUS substring of the article. Spans are
split on ellipsis first, so each elided fragment is verified independently.
Reports the article section every span lands in, so a credit line can name it.

Usage:
  python3 scripts/verify-wolfram-quotes.py <article.txt> [session-1/index.html]

Exit 0 only when every span verifies.
"""
import html
import re
import sys

SECTIONS = [
    "It's Just Adding One Word at a Time",
    "Where Do the Probabilities Come From?",
    "What Is a Model?",
    "Models for Human-Like Tasks",
    "Neural Nets",
    "Machine Learning, and the Training of Neural Nets",
    "The Practice and Lore of Neural Net Training",
    '"Surely a Network That\'s Big Enough Can Do Anything!"',
    "The Concept of Embeddings",
    "Inside ChatGPT",
    "The Training of ChatGPT",
    "Beyond Basic Training",
    "What Really Lets ChatGPT Work?",
    "Meaning Space and Semantic Laws of Motion",
    "Semantic Grammar and the Power of Computational Language",
    "So ... What Is ChatGPT Doing, and Why Does It Work?",
    "Thanks",
]

# Characters that carry no lexical content and differ by typesetting only.
INVISIBLE = dict.fromkeys(map(ord, "  ​  ﻿"), None)


def normalise(s):
    """Fold entities, quote forms, dashes-as-typed and whitespace.

    Quote UNIFICATION is deliberate: the lesson renders a quotation nested
    inside another with single marks where the article uses double ones, so
    every quote character folds to one canonical mark on both sides.
    """
    s = html.unescape(s)
    s = s.translate(INVISIBLE)
    s = (s.replace("“", '"').replace("”", '"')
          .replace("‘", '"').replace("’", '"')
          .replace("'", '"').replace("«", '"').replace("»", '"'))
    s = s.replace("…", "...")
    s = s.replace(" ", " ")
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def strip_tags(s):
    return re.sub(r"<[^>]+>", "", s)


def load_article(path):
    raw = open(path, encoding="utf-8").read()
    norm = normalise(raw)
    # Locate each section header inside the normalised stream.
    marks = []
    for name in SECTIONS:
        n = normalise(name)
        i = norm.find(n)
        if i < 0:
            print("  !! section header not found: %s" % name)
            continue
        marks.append((i, name))
    marks.sort()
    return raw, norm, marks


def section_of(marks, idx):
    cur = "(before first section)"
    for i, name in marks:
        if i <= idx:
            cur = name
        else:
            break
    return cur


def boxes(html_path):
    src = open(html_path, encoding="utf-8").read()
    out = []
    for m in re.finditer(r'<div class="wolf">(.*?)</div>', src, re.S):
        line = src.count("\n", 0, m.start()) + 1
        body = m.group(1)
        cm = re.search(r'<span class="wh">(.*?)</span>', body, re.S)
        credit = strip_tags(cm.group(1)) if cm else ""
        out.append((line, credit, body))
    return out


def spans_in(body):
    """Every double-quoted span in the box, tags removed, split on ellipsis."""
    text = strip_tags(re.sub(r'<span class="wh">.*?</span>', "", body, flags=re.S))
    text = html.unescape(text).translate(INVISIBLE)
    found = []
    # Match on the ORIGINAL curly/straight double quotes only - single marks
    # inside a span are nested quotes, not span delimiters.
    for q in re.finditer(r'[“"]([^“”"]*)[”"]', text):
        raw = q.group(1)
        for frag in re.split(r"\s*(?:…|\.\.\.)\s*", raw):
            frag = frag.strip()
            if len(frag) > 3:
                found.append(frag)
    return found


def main():
    art_path = sys.argv[1]
    html_path = sys.argv[2] if len(sys.argv) > 2 else "session-1/index.html"
    _, norm, marks = load_article(art_path)

    print("=" * 78)
    print("DW-067 quote verification")
    print("  article : %s" % art_path)
    print("  lesson  : %s" % html_path)
    print("  sections located: %d/%d" % (len(marks), len(SECTIONS)))
    print("=" * 78)

    total = ok = soft = bad = 0
    for line, credit, body in boxes(html_path):
        print("\n--- div.wolf at line %d" % line)
        print("    credit: %s" % credit)
        for frag in spans_in(body):
            total += 1
            n = normalise(frag)
            idx = norm.find(n)
            if idx >= 0:
                ok += 1
                print("    [EXACT] %-6s %s" % ("@%d" % idx, section_of(marks, idx)))
                print("            \"%s\"" % (n if len(n) <= 110 else n[:107] + "..."))
                continue
            # Tolerated editorial convention: a span truncated before the end of
            # its sentence carries a closing period the source does not have.
            if n.endswith(".") and norm.find(n[:-1]) >= 0:
                idx = norm.find(n[:-1])
                soft += 1
                print("    [EXACT-1] terminal period added by the lesson  @%d  %s"
                      % (idx, section_of(marks, idx)))
                print("            \"%s\"" % (n if len(n) <= 110 else n[:107] + "..."))
                continue
            bad += 1
            print("    [FAIL]  NOT a contiguous substring of the article")
            print("            \"%s\"" % n)
            # Longest verifying prefix, to show where it diverges.
            lo, hi = 0, len(n)
            while lo < hi:
                mid = (lo + hi + 1) // 2
                if norm.find(n[:mid]) >= 0:
                    lo = mid
                else:
                    hi = mid - 1
            if lo:
                j = norm.find(n[:lo])
                print("            longest verifying prefix (%d chars): \"%s\"" % (lo, n[:lo]))
                print("            article continues            : \"%s\"" % norm[j:j + lo + 40][lo:])

    print("\n" + "=" * 78)
    print("spans checked %d | exact %d | exact+terminal-period %d | FAILED %d"
          % (total, ok, soft, bad))
    print("=" * 78)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
