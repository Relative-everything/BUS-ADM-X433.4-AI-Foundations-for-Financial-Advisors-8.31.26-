#!/usr/bin/env bash
# gate.sh <log-file>: MAINTAINING's full pre-push gate, one line per check, full output in the log.
# Run from anywhere. Needs NODE_PATH (jsdom, playwright) and LESSON_BUILDER_SKILL.
set -u
REPO="$(cd "$(dirname "$0")/../../.." && pwd)"; cd "$REPO"
LOG="${1:-/tmp/gate.log}"; : > "$LOG"
export NODE_PATH="${NODE_PATH:-$(npm root -g)}"
SK="${LESSON_BUILDER_SKILL:?set LESSON_BUILDER_SKILL to the interactive-lesson-builder skill root}"
export RESTYLE_SWEEP="${RESTYLE_SWEEP:-$SK/scripts/restyle_sweep.py}"
rm -rf .verify-shots   # DW-211
run() { local name="$1"; shift; echo "===== $name" >> "$LOG"; if "$@" >> "$LOG" 2>&1; then echo "PASS  $name"; else echo "FAIL($?)  $name"; fi; }
P="--case Cole --purge Okonkwo,Reyes,Adaeze,Ilesanmi --require-timing --require-tagging"
for n in 1 2 3 4; do run "validate_lesson session-$n" python3 "$SK/scripts/validate_lesson.py" session-$n/index.html $P; done
run "validate_lesson session-5" python3 "$SK/scripts/validate_lesson.py" session-5/index.html --minutes 125 $P
run "validate_lesson session-0.1" python3 "$SK/scripts/validate_lesson.py" session-0.1/index.html --minutes 57 $P
for d in session-0.1 session-1 session-2 session-3 session-4 session-5; do run "validate_dom $d" node "$SK/scripts/validate_dom.js" $d/index.html; done
run build-case node scripts/build-case.mjs
run "inject-case --check" node scripts/inject-case.mjs --check
run "build-cardsort --check" node scripts/build-cardsort.mjs --check
run "build-appendix --check" node scripts/build-appendix.mjs --check
run "build-outline --check" node scripts/build-outline.mjs --check
run "build-readings --check" node scripts/build-readings.mjs --check
run "build-sources --check" node scripts/build-sources.mjs --check
run "inject-sources --check" node scripts/inject-sources.mjs --check
run "build-bibliography --check" node scripts/build-bibliography.mjs --check
run "build-unsourced --check" node scripts/build-unsourced.mjs --check
run "case-inventory --report-check" node scripts/case-inventory.mjs --report-check
run "build-facts-md --check" node facts/build-facts-md.mjs --check
run verify-case node scripts/verify-case.mjs
run verify-migration node scripts/verify-migration.mjs
run "verify-sources --check" node scripts/verify-sources.mjs --check
run verify-facts node scripts/verify-facts.mjs
run verify-editorial node scripts/verify-editorial.mjs
run test-editorial-regions node scripts/test-editorial-regions.mjs
run test-case-viewer node scripts/test-case-viewer.mjs
run verify-style node scripts/verify-style.mjs
run verify-stamps node scripts/verify-stamps.mjs
run test_live_console node scripts/test_live_console.js
run verify-browser node scripts/verify-browser.mjs
run "next-term checks" node docs/next-term/checks.mjs
git status --porcelain | grep -v '^??' | sed 's/^/DIRTY after gate: /'
