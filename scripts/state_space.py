#!/usr/bin/env python3
"""Enumerate the LEGAL configuration space of the Session 0.1 context inspector.
 
Constraints encoded here are sourced, not invented:
  C1 Haiku 4.5 has no effort selector          (support 8664678 effort list; models overview)
  C2 Opus 5 thinking cannot be disabled in Claude (support 8664678)
  C3 Fable 5 adaptive thinking is always on    (models overview: "Yes (always on)")
  C4 Research implies web search is engaged    (support 11095361)
  C5 Skills require code execution enabled     (support 12512176)
  C6 xhigh requires Opus 4.7 or newer          (support 8664678) -> all 5-series qualify
"""
from itertools import product
 
MODELS = ["Fable5", "Opus5", "Sonnet5", "Haiku45"]
 
 
def efforts(model):
    if model == "Haiku45":
        return ["n/a"]                      # C1
    return ["low", "medium", "high", "xhigh", "max"]   # C6 satisfied by all 5-series
 
 
def thinking(model):
    if model == "Opus5":
        return ["on"]                       # C2
    if model == "Fable5":
        return ["on"]                       # C3
    return ["on", "off"]
 
 
RETRIEVAL = [("off", "off"), ("on", "off"), ("on", "on")]   # C4: (websearch, research)
CODEEXEC = ["on", "off"]
MEMORY = ["off", "search", "generate", "both"]
PROJECT = ["none", "instructions", "instructions+knowledge"]
INSTRUCTIONS = ["none", "present"]
CONNECTORS = [0, 1, 5]
ATTACHMENT = ["none", "one"]
 
 
def skills_for(codeexec):
    return ["none"] if codeexec == "off" else ["none", "relevant", "irrelevant"]  # C5
 
 
legal = 0
naive = 0
for m in MODELS:
    for e, t, r, cx, mem, pr, ins, cn, att in product(
        efforts(m), thinking(m), RETRIEVAL, CODEEXEC, MEMORY,
        PROJECT, INSTRUCTIONS, CONNECTORS, ATTACHMENT
    ):
        for _sk in skills_for(cx):
            legal += 1
 
# Naive grid: every axis treated as independent, no dependency pruning.
naive = (len(MODELS) * 5 * 2 * 4 * len(CODEEXEC) * 3 * len(MEMORY)
         * len(PROJECT) * len(INSTRUCTIONS) * len(CONNECTORS) * len(ATTACHMENT))
# (4 models x 5 effort x 2 thinking x 4 retrieval-as-2x2 x 2 codeexec x 3 skills
#  x 4 memory x 3 project x 2 instructions x 3 connectors x 2 attachment)
 
authored_base = 3          # one captured base output per probe prompt
authored_deltas = 23       # one per non-null axis value that changes the output
authored_total = authored_base + authored_deltas
 
print(f"Legal configurations (dependencies enforced): {legal:,}")
print(f"Naive independent grid (no pruning):          {naive:,}")
print(f"Illegal states the naive grid would expose:   {naive - legal:,} "
      f"({(naive - legal) / naive:.1%} of the grid)")
print()
print(f"Authored strings under composition:           {authored_total}")
print(f"States per authored string:                   {legal / authored_total:,.0f}")
print(f"Coverage of a 50-cell hand-written lookup:    {50 / legal:.3%}")
print(f"Dead ends a 50-cell lookup leaves:            {legal - 50:,}")
