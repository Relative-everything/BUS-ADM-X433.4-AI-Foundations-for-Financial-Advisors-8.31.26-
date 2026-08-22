# Implementation plan: a bring-your-own-key live model console in Sessions 0.1 and 1

Planning date: 2026-08-22. Companion to
[`gemini-live-api-feasibility.md`](gemini-live-api-feasibility.md), which
established that the wire protocol works from GitHub Pages with no backend and
that a **shared** course key fails on data terms, key exposure and quota. This
document plans the bring-your-own-key variant recommended there.

**Verdict: reasonable, and better than reasonable for these two specific
sessions.** Build it. The pedagogical case is stronger than a general "add AI to
the page" case, because in Sessions 0.1 and 1 the live model does something the
existing simulations structurally cannot: it supplies *evidence* for claims the
pages currently *assert*. Three conditions make it work — every live element
degrades to its captured version, the prompts on these pages carry no
confidential data, and the readouts are rewritten so any outcome teaches.

---

## 1. Why these two sessions, and not the others

Your instinct to start at 0.1 and 1 is correct, and the reason is worth making
explicit because it also defines where to stop.

**Sessions 0.1 and 1 use fixed, public prompts.** The Kalai birthday question is
about a published academic. The §7520 rate question is about public tax data.
The Cole household is synthetic, constructed for this course, and **already
published on this website**. Sending any of it to Gemini leaks nothing that is
not already on the open web.

That single fact retires the strongest objection from the feasibility analysis.
Blocker 1 — free-tier terms permit training on submissions and human review —
only bites when a student sends something confidential. On these two pages there
is nothing confidential to send.

**Session 2 is the opposite case and must not get this treatment.** Its §06
exercise instructs students to paste a prompt built on *a real recurring task
from their own practice*, and Part 1 of the final project is built on the
student's own client work. A live box there invites exactly the data into
exactly the endpoint that Session 4 teaches advisers to keep it out of. Keep the
copy-to-your-own-tool path in Session 2.

**One carve-out inside 0.1.** §11's baseline capture asks for the student's own
unassisted task. That field is local and must stay local. Hard rule: **no live
console input may ever be pre-populated from a field where a student describes
their own practice.** Anything typed into §11 stays in §11.

So the scope is: **Sessions 0.1 and 1 only**, on the fixed public probes, plus a
free-form box carrying a standing warning.

---

## 2. Pedagogical analysis

### What the live model buys that the simulations cannot

**A. It converts the weakest exhibit in Session 1 into the strongest.**

`session-1/index.html:2156` currently reads:

```js
var KAL=['03-07','15-06','01-01'],ki=0;
```

Three hardcoded strings, and a readout that tells the student "three attempts,
three different dates, all wrong." That is an empirical claim about model
behaviour, delivered as a hardcoded array, in a course whose entire evidentiary
apparatus is built on H/M/L chips and whose thesis is that **fluent and correct
look identical**. The array is fluent. The student has no way to check it.

Wired live, the student presses "Ask again" three times against a real model
with their own key and watches the answers diverge on their own screen. The
claim stops being asserted and starts being observed. Nothing else in the file
gets that upgrade for so little code.

**B. It gives Session 0.1 the negative control its whole thesis needs.**

Session 0.1 is *The Control Surface*. §01 teaches that every answer is produced
from a context assembled out of five layers, and §09 insists the durable skill
is reading an output and inferring the configuration behind it.

The raw API has **none of the five layers**. No system prompt, no personalisation
or profile instructions, no project or retrieval context, no tools, no memory.
It is the model with the product stripped off.

That is extremely hard to demonstrate any other way, and it targets the precise
confusion this audience has — an adviser says "ChatGPT told me" when the product
told them, and cannot separate model behaviour from product scaffolding. Run the
same Cole probe through the product and through the bare API side by side and
the five layers stop being a diagram and become a measured difference. This is
the single best argument for putting the console in 0.1 specifically.

**C. It makes the sampler manipulable instead of illustrative.**

Appendix A5 reimplements nine sampler controls against, in the page's own words,
"an illustrative distribution." Gemini's API exposes `temperature`, `topP` and
`topK` in `generationConfig`. A student can move temperature from 0 to 2 on a
real model and watch the same prompt change character. The simulation teaches
the mechanism; the live call proves the mechanism is real and not a teaching
fiction. Keep both — they do different jobs.

**D. It proves the course's own generalisation claim.**

Session 0.1 §09 says the skill "outlives the product... menus move, models get
renamed." The course teaches Claude throughout. A second vendor exhibiting the
same nondeterminism, the same confident-and-wrong failure, and the same
sensitivity to sampler settings is the evidence for that claim. One live Gemini
box does more for it than a paragraph.

**E. The key-paste moment is a Session 4 lesson delivered nine weeks early.**

You are asking practising advisers to paste a credential into a web page. They
*should* hesitate. Make the hesitation the point: the page is static, the source
is readable, the only outbound destination is `generativelanguage.googleapis.com`,
and a student can confirm all three in DevTools in under a minute. Teaching them
to check before pasting is worth more than the exercise it gates. Put that
instruction next to the box, not in a footer.

### What it risks, and what each risk actually costs

**Risk 1 — variance breaks the script. The real one.**

The current Kalai readout hardcodes its own conclusion: three different dates,
all wrong. A live model might return the same date three times, or refuse, or
be right. The scripted narrative then collapses in front of the room.

This is the risk that decides whether the feature is good or bad, and it has a
clean fix: **the readout must report what happened rather than what was supposed
to happen.** Both outcomes are the lesson.

- Divergent answers → sampling is visible. The distribution was flat enough that
  the draw decided the answer.
- Identical answers → the distribution was sharp enough that the top token won
  every draw. Sampling did not switch off. And if that stable answer is *wrong*,
  the student has just met the harder failure: confident, reproducible, and
  false. Reproducibility is not correctness.
- A refusal → the model abstained, which is exactly the behaviour §04's scoring
  table says binary grading trains out. Getting one live is a gift.

Written this way the section is more robust than the canned version, not less,
because it cannot be contradicted by the thing it is describing.

**Risk 2 — live demos fail.** Already solved in this repository. §08 of Session
0.1 carries embedded captures and an instructor note calling the fallback
mandatory, and `docs/probe-captures.md` holds dated verbatim outputs. Every live
element here inherits that discipline: **captured output ships in the page and
renders when the live path fails, without the student doing anything.**

**Risk 3 — attention split.** Twenty-five advisers debugging API keys is twenty-five
advisers not listening. Mitigations: console collapsed by default; a two-minute
instructor-led connect at a scheduled point rather than whenever; the page fully
usable with no key; and for the first session, consider instructor-only (§7).

**Risk 4 — vendor mismatch in 0.1 §08.** The run table is Sonnet 5 and Opus 5
with effort and search toggles. Gemini Flash via API has no equivalent controls.
A live Gemini run is **not** a substitute for runs 1–3 and must never overwrite
that table. It is a fourth, differently-labelled exhibit: *the same prompt with
no product layers at all*. Label it that way or it teaches the wrong thing.

**Risk 5 — the deterministic simulations get devalued.** §04's context inspector
computes 38,016 legal configurations from 26 authored strings, and the page
argues at length why composition beats a lookup table. Nothing live replaces it,
and the plan does not touch it. State the division out loud in the instructor
notes: **simulations teach mechanism reliably; live calls teach variance
honestly.** Neither substitutes for the other.

### Net assessment

For Sessions 0.1 and 1 the technique is sound because the prompts are public,
the fallbacks already exist as a house convention, and the live model supplies
evidence for claims the pages currently assert on their own authority. The one
genuine design requirement is the readout reframe in Risk 1. Do not ship the
Kalai wiring without it.

---

## 3. Architecture

One shared component, byte-identical in both files, fenced with a marker comment
so it can be swept later the way CSS already is.

```
LM:BEGIN v1 … LM:END      JS block, placed after the helper functions
LMSTYLE:BEGIN … LMSTYLE:END   CSS block, placed AFTER /* STYLE:END */
#lmbox                    The console markup, first child of .wrap
```

Placement constraints from the repository:

- CSS goes **after** the `STYLE:END` fence (`session-0.1/index.html:541`,
  `session-1/index.html:536`) so `restyle_sweep.py` never touches it.
- The JS uses the existing `$`, `el`, `all` helpers, and reuses `.panel`,
  `.plab`, `.btn`, `.runs`, `.readout`, `.readout.bad`, `.sampler`, `.hidden`.
  Almost no new styling is needed.
- House JS is **strict ES5** — zero arrow functions, zero `const`/`let`, zero
  template literals, zero `async`/`await` across both files. The one unavoidable
  deviation is `fetch`, which returns a promise; use `.then()` chains, not
  `async`. Do not introduce any other modern syntax.
- `#lmbox` must be hidden in print, alongside `#rail` and `#topbar`.

### State model

The key lives in one JavaScript variable and nowhere else. No `localStorage`, no
`sessionStorage`, no cookie, no URL fragment, no DOM node. This is not a
concession to the repository rule — it is the correct design, and it happens to
satisfy the rule exactly. The key dies on reload like every other piece of state
in these lessons, which is the same contract the README already makes about
student work.

---

## 4. The console

### Markup — first child of `.wrap`, before section 1

```html
<div id="lmbox" class="lm">
  <div class="lmhead">
    <span class="plab" style="margin:0">Live model &mdash; optional</span>
    <span class="lmstat" id="lmStat">Not connected</span>
    <button class="btn ghost mini" id="lmToggle" aria-expanded="false"
            aria-controls="lmBody">Set up</button>
  </div>

  <div class="hidden" id="lmBody">
    <p class="lmnote">Every exercise on this page works without a key. Connecting
    one replaces the captured outputs with live ones from Google's Gemini API, so
    you see a real model rather than a recording.</p>

    <p class="lmnote"><b>Before you paste anything, check the page.</b> This file
    is static and its source is readable &mdash; View Source, or the Network tab
    in DevTools. The only address it ever sends to is
    <span class="mono">generativelanguage.googleapis.com</span>. Your key is held
    in one JavaScript variable, is never stored, and is gone when you reload.
    Verifying that yourself before you trust it is the habit Session 4 is about.</p>

    <p class="lmnote"><b>Do not send client information.</b> Google's terms for
    the free tier permit it to use submissions to improve its products, and
    permit human review. The prompts on this page are public facts and synthetic
    case data, which is why the console lives here and not in Session 2.</p>

    <label class="plab" for="lmKey">Gemini API key
      (free, from <span class="mono">aistudio.google.com/apikey</span>)</label>
    <input type="password" id="lmKey" class="lmkey" autocomplete="off"
           spellcheck="false" autocapitalize="off"
           placeholder="Paste the key here. It is not saved.">

    <div class="row" style="margin-top:12px">
      <button class="btn mini" id="lmConnect">Connect</button>
      <button class="btn sel mini" id="lmForget">Forget the key</button>
      <select id="lmModel" class="lmsel" aria-label="Model"></select>
      <span class="mono dim" style="font-size:12px" id="lmCount"></span>
    </div>
    <div class="readout" id="lmMsg" style="margin-top:12px" aria-live="polite">
      <span class="nil">No key connected. Captured outputs are in use.</span>
    </div>
  </div>
</div>
```

Collapsed by default. Nothing about it competes with the lesson until someone
opens it.

### CSS — after `/* STYLE:END */`

```css
/* LMSTYLE:BEGIN keep byte-identical across lessons */
.lm{background:var(--card);border:1px solid var(--line);border-radius:10px;
  padding:14px 16px;margin:0 0 26px}
.lmhead{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.lmstat{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.08em;
  text-transform:uppercase;color:var(--muted);margin-right:auto}
.lmstat.ok{color:var(--on)} .lmstat.bad{color:var(--warn)} .lmstat.wait{color:var(--gold)}
.lmnote{font-size:13.5px;line-height:1.65;color:var(--muted);margin:12px 0 0}
.lmkey{width:100%;margin-top:6px;padding:9px 11px;border:1px solid var(--line);
  border-radius:7px;background:var(--off-bg);color:var(--ink);
  font-family:"JetBrains Mono",monospace;font-size:13px}
.lmsel{padding:6px 9px;border:1px solid var(--line);border-radius:7px;
  background:var(--card);color:var(--ink);
  font-family:"JetBrains Mono",monospace;font-size:12px}
.lmlive{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.09em;
  text-transform:uppercase;color:var(--on);margin-left:8px}
.lmcap{color:var(--muted)}
@media print{#lmbox{display:none}}
/* LMSTYLE:END */
```

### The call layer

```js
/* LM:BEGIN v1 keep byte-identical across lessons */
var LMBASE='https://generativelanguage.googleapis.com/v1beta';
var LM={key:'',model:'gemini-2.5-flash',on:false,calls:0,cap:40};

function lmStat(t,c){var n=$('lmStat');if(n){n.textContent=t;n.className='lmstat '+(c||'')}}
function lmMsg(t,bad){var n=$('lmMsg');if(!n)return;
  n.className='readout'+(bad?' bad':' on');n.innerHTML=t}

function lmErr(code,body){
  if(code===400&&/API_KEY_INVALID/.test(body))
    return'That key was rejected. Check you copied the whole string, with no trailing space.';
  if(code===403)
    return'Key refused. Either the Generative Language API is not enabled on it, or it is restricted to a different site.';
  if(code===429)
    return'Rate limit or daily quota reached. The captured output is in use and the lesson continues at full pace.';
  if(code>=500)
    return'Google returned a server error. Try once more, then fall back to the capture.';
  return'Request failed ('+code+'). The captured output is in use.';
}

function lmCall(prompt,opts,cb){
  if(!LM.on){cb('nokey',null);return}
  if(LM.calls>=LM.cap){cb('You have used this page’s '+LM.cap+'-call ceiling. Reload to reset it.',null);return}
  LM.calls++;lmCount();
  opts=opts||{};
  var body={contents:[{parts:[{text:prompt}]}]},gc={};
  if(opts.temperature!=null)gc.temperature=opts.temperature;
  if(opts.topP!=null)gc.topP=opts.topP;
  if(opts.topK!=null)gc.topK=opts.topK;
  gc.maxOutputTokens=opts.maxTokens||512;
  body.generationConfig=gc;
  if(opts.system)body.systemInstruction={parts:[{text:opts.system}]};
  var ctl=('AbortController' in window)?new AbortController():null;
  var timer=setTimeout(function(){if(ctl)ctl.abort()},opts.timeout||30000);
  fetch(LMBASE+'/models/'+encodeURIComponent(opts.model||LM.model)+':generateContent',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-goog-api-key':LM.key},
      body:JSON.stringify(body),
      signal:ctl?ctl.signal:undefined})
    .then(function(r){return r.text().then(function(tx){return{code:r.status,tx:tx}})})
    .then(function(o){clearTimeout(timer);
      if(o.code!==200){cb(lmErr(o.code,o.tx),null);return}
      var j;try{j=JSON.parse(o.tx)}catch(e){cb('Unreadable response from Google.',null);return}
      var c=j.candidates&&j.candidates[0];
      var parts=c&&c.content&&c.content.parts||[];
      var txt=parts.map(function(p){return p.text||''}).join('').trim();
      if(!txt){cb('The model returned no text (finish reason: '+((c&&c.finishReason)||'unknown')+').',null);return}
      cb(null,{text:txt,usage:j.usageMetadata||null,finish:(c&&c.finishReason)||''})})
    .catch(function(e){clearTimeout(timer);
      cb(e&&e.name==='AbortError'
        ? 'Timed out after 30 seconds. The captured output is in use.'
        : 'Could not reach Google — offline, or the network blocks the endpoint.',null)});
}

function lmCount(){var n=$('lmCount');if(n)n.textContent=LM.calls+' / '+LM.cap+' calls this page'}

function lmConnect(){
  var k=$('lmKey').value.trim();
  if(!k){lmStat('No key entered','bad');lmMsg('Paste a key first.',true);return}
  lmStat('Checking…','wait');
  fetch(LMBASE+'/models',{headers:{'x-goog-api-key':k}})
    .then(function(r){return r.text().then(function(tx){return{code:r.status,tx:tx}})})
    .then(function(o){
      if(o.code!==200){LM.on=false;lmStat('Not connected','bad');lmMsg(lmErr(o.code,o.tx),true);return}
      var j={},names=[];try{j=JSON.parse(o.tx)}catch(e){}
      (j.models||[]).forEach(function(m){
        var n=String(m.name||'').replace(/^models\//,'');
        if((m.supportedGenerationMethods||[]).indexOf('generateContent')<0)return;
        if(!/flash/.test(n))return;
        if(/vision|embedding|tts|image|audio|live|thinking/.test(n))return;
        names.push(n)});
      if(!names.length)names=['gemini-2.5-flash'];
      names.sort();
      var sel=$('lmModel');sel.innerHTML='';
      names.forEach(function(n){var op=el('option',null,n);op.value=n;sel.appendChild(op)});
      if(names.indexOf('gemini-2.5-flash')>=0)sel.value='gemini-2.5-flash';
      LM.model=sel.value;LM.key=k;LM.on=true;
      $('lmKey').value='';                       /* clear the visible field */
      lmStat('Connected · '+LM.model,'ok');
      lmMsg('Live. The key is held in memory only and is gone when you reload. '+
            'Captured outputs stay on the page for comparison.');
      lmCount();
      all('[data-lm-live]').forEach(function(n){n.classList.remove('hidden')});
    })
    .catch(function(){LM.on=false;lmStat('Not connected','bad');
      lmMsg('Could not reach Google. Captured outputs remain in use.',true)});
}

function lmForget(){
  LM.key='';LM.on=false;$('lmKey').value='';
  lmStat('Not connected');
  lmMsg('<span class="nil">Key discarded. Captured outputs are in use.</span>');
  all('[data-lm-live]').forEach(function(n){n.classList.add('hidden')});
}

(function(){
  var t=$('lmToggle');if(!t)return;
  t.onclick=function(){var b=$('lmBody'),open=b.classList.toggle('hidden')===false;
    t.textContent=open?'Hide':'Set up';t.setAttribute('aria-expanded',open?'true':'false')};
  $('lmConnect').onclick=lmConnect;
  $('lmForget').onclick=lmForget;
  $('lmModel').onchange=function(){LM.model=this.value;
    if(LM.on)lmStat('Connected · '+LM.model,'ok')};
  $('lmKey').addEventListener('keydown',function(e){if(e.key==='Enter')lmConnect()});
})();
/* LM:END */
```

Four design decisions in that code worth defending:

1. **Connect validates against `GET /v1beta/models`, not a generation call.** It
   costs no generation quota, and it returns what the key can *actually* reach,
   which populates the dropdown. Google renames and retires models often — the
   December 2025 precedent in the feasibility analysis is the same behaviour in
   a different register. A page that discovers models at runtime does not break
   the week Google renames Flash. A hardcoded model string does.
2. **The visible field is cleared on success.** The key survives only in `LM.key`.
   This matters most on a projector (§6).
3. **A 40-call per-page ceiling.** Protects a student's daily free quota from a
   stuck loop or an impatient clicker. Reload resets it.
4. **`data-lm-live` elements are hidden until connected.** Live controls do not
   appear at all for students without a key, so nothing looks broken.

---

## 5. Integration points, ranked

### Priority 1 — Session 1 §04, the Kalai probe. Highest value, smallest diff.

Replace the hardcoded array at `session-1/index.html:2156`. Keep `KAL` as the
capture, add a live path, and rewrite the verdict so it reports the observed
outcome.

```js
/* ===== 08 HALLUCINATION ===== */
var G9={k:0,sc:{}};
function checkG9(){if(G9.k&&Object.keys(G9.sc).length>=2)mark('g9')}
var KAL=['03-07','15-06','01-01'],ki=0,KLIVE=[];
var KQ="What is Adam Tauman Kalai's birthday? If you know, just respond with DD-MM.";

function kRow(ans,tag){
  $('kalaiRuns').appendChild(el('div','r','Attempt '+(ki+1)+
    ' &middot; <b style="color:var(--warn)">'+ans+'</b>'+
    ' <span class="lmcap">&middot; '+tag+'</span>'));
  ki++;if(ki>=3){$('kalaiBtn').disabled=true;kVerdict()}}

function kVerdict(){
  var o=$('kalaiOut');o.className='readout on';
  if(KLIVE.length<3){
    o.innerHTML='<span class="cz">Result &middot; captured</span>Three attempts, three different dates, all wrong — from a prompt that said to answer only if it knew. You now know why: the sampler drew from a distribution over plausible dates and no step checked anything.';
    G9.k=1;checkG9();return}
  var seen={},n=0;
  KLIVE.forEach(function(a){var k=a.toLowerCase();if(!seen[k]){seen[k]=1;n++}});
  if(n>1){
    o.innerHTML='<span class="cz">Result &middot; live</span>'+n+
      ' different answers from three identical prompts. Nothing changed between the runs — not the model, not the wording, not a setting. The sampler drew from a distribution over plausible dates and no step checked anything. That is the mechanism, observed rather than described.';
  }else{
    o.innerHTML='<span class="cz">Result &middot; live</span>Three identical answers. Sampling did not switch off — the distribution was sharp enough that the same token won every draw. Now check the date. If it is wrong, you have just met the harder failure: confident, reproducible and false. <b>Reproducibility is not correctness</b>, and a stable wrong answer is the one that survives a second opinion.';
  }
  G9.k=1;checkG9()}

$('kalaiBtn').onclick=function(){
  if(ki>=3)return;
  if(!LM.on){kRow(KAL[ki],'captured');return}
  $('kalaiBtn').disabled=true;
  lmCall(KQ,{temperature:1,maxTokens:64},function(err,res){
    $('kalaiBtn').disabled=false;
    if(err){kRow(KAL[ki],'capture — live call failed');return}
    KLIVE.push(res.text);
    kRow(res.text.replace(/\s+/g,' ').slice(0,48),'live');
  })};
```

Behaviour: no key → byte-identical to today. Key → three real calls, ~130 tokens
total, and a verdict that cannot be contradicted by the model.

Add one line to the section's source note recording that the live path exists,
that the model is whatever the student connected, and that the captured dates
were recorded against DeepSeek-V3 per the Kalai paper. **Confidence stays H for
the paper's finding and the live run carries no chip** — it is the student's own
observation, which is stronger than a chip and should be labelled as such.

### Priority 2 — Session 0.1 §08, the bare-API contrast run.

Do **not** touch the three-run table. Add a fourth panel after the two capture
panels:

```html
<div class="panel hidden" data-lm-live>
  <span class="plab">Run 4 &middot; live &middot; the same prompt with no product layers at all</span>
  <p class="lmnote">Runs 1 to 3 are the product: a system prompt you cannot see,
  your profile instructions, retrieval, tools, and a conversation history. This
  run is the raw API. None of those five layers exist here. Same question, same
  case, nothing wrapped around it.</p>
  <div class="row"><button class="btn mini" id="lmRun4">Run it live</button></div>
  <div class="sampler" id="lmOut4" style="font-size:13.5px;line-height:1.75">
    <span class="dim">Not run yet.</span></div>
</div>
```

Wire it to the same §7520 probe used in `docs/probe-captures.md` P1, so the
comparison against runs 1 and 2 is exact. Expect the bare API to hedge, refuse,
or produce a stale figure with no citation and no as-of date — which is the
point, and which is what run 2 with search had and this will not.

This is the exhibit that makes §01's five-layer diagram concrete, and it is the
strongest reason to put the console in 0.1 at all.

### Priority 3 — Session 1 Appendix A5, live temperature.

Below the existing nine-control simulator, one live control:

```html
<div class="panel hidden" data-lm-live>
  <span class="plab">The same control, on a real model</span>
  <div class="row">
    <input type="range" id="lmTemp" min="0" max="2" step="0.1" value="1">
    <span class="mono" id="lmTempV">1.0</span>
    <button class="btn mini" id="lmTempRun">Generate</button>
  </div>
  <div class="sampler" id="lmTempOut"><span class="dim">Nothing generated yet.</span></div>
</div>
```

Fixed prompt, one sentence of output, run at 0.0 and again at 1.8. Keep the
simulator directly above it — the simulator shows *why*, the live run shows
*that*. Note in the copy that Gemini's `temperature` and the simulator's are the
same idea under different implementations, not the same number.

### Priority 4 — the free-form box.

A general prompt box inside the console, since you asked for "any prompts you
write on that page." Ship it, with the standing warning from §4 immediately
adjacent, and with no auto-population from anywhere. This is the lowest-value
and highest-drift element — it is also the one students will use most, so the
warning must be visible without scrolling.

### Explicitly out of scope

- Session 0.1 §04 context inspector. 38,016 composed states; a live call teaches
  none of what it teaches. Leave it alone.
- Session 0.1 §11 baseline capture. Student's own practice. Stays local.
- Sessions 2, 3, 4. See §1.
- The hub `index.html`.

---

## 6. Key hygiene, including the projector problem

Your two use cases have different threat models and the plan must serve both.

**Your key, on a projector, in front of a room with phones.** This is the case
people forget. Concretely:

- The input is `type="password"` and is **blanked on successful connect**, so
  the key is on screen for seconds at most and never in a readable DOM node.
- Connect before you share the screen, not after.
- Restrict the key by HTTP referrer to `relative-everything.github.io/*` in the
  Cloud console. It is a speed bump rather than a control — the `Referer` header
  is client-set and one `curl` flag defeats it — but against a photograph of a
  projector it is proportionate. Note that a referrer-restricted key then fails
  from any server-side context, which is fine here.
- **Rotate after each delivery.** Cheap, and it bounds any capture to one session.
- Never paste the key into a file in this repository, at any point, for any
  reason. Google keys are a GitHub secret-scanning partner pattern and are
  push-protected by default; the push gets blocked or the key gets auto-revoked,
  and you find out mid-class.

**Students' keys, on their own machines.** Lower stakes — their key, their
quota, their account, their agreement with Google. What the page owes them is
honesty about where it goes, which §4's markup provides, and a `Forget the key`
button that actually clears the variable.

**Invariants for both.** No storage of any kind. Never in a URL or fragment.
Never echoed into the DOM. Never sent anywhere except
`generativelanguage.googleapis.com`. One outbound origin, verifiable in DevTools
in thirty seconds — and worth saying on the page, because a student who checks
has learned the thing Session 4 is trying to teach.

---

## 7. Failure handling and the rollout ladder

The fallback ladder, in order, all automatic:

1. No key connected → captured output, exactly as the page behaves today.
2. Key connected, call fails (429, 403, timeout, offline) → captured output,
   plus a one-line note in `#lmMsg` saying which failure it was.
3. Call succeeds but returns empty or is blocked by a safety filter → captured
   output, note names the finish reason.
4. Live output arrives → renders, tagged `live`, capture stays reachable for
   comparison.

**Every live element must be reachable in its captured form with no key.** That
is the existing house rule in Session 0.1 §08's mandatory-fallback note, and it
is the condition on which this whole plan is reasonable. A student who never
connects a key sees the lesson exactly as it runs today.

**Rollout.** Run the first delivery **instructor-only** — your key, on the
projector, students watching. It gets the pedagogical value at a fraction of the
coordination cost and tells you what actually breaks in a room. Open it to
student keys in a later session, with a scheduled two-minute connect step,
once you have seen it survive one live class.

---

## 8. Repository changes required

Two of these are enforced by the pre-push gate and will block the commit.

1. **`MAINTAINING.md`, Layout.** *"The only permitted external request is Google
   Fonts"* becomes false. Amend to name `generativelanguage.googleapis.com`, note
   it is runtime-only and only on a key the reader supplies, and record that it
   applies to Sessions 0.1 and 1 alone.
2. **The externals check.** Fallback check #3 filters all but
   `fonts.googleapis|fonts.gstatic`. Add the Gemini origin. Same in
   `validate_lesson.py` and `validate_dom.js` in the interactive-lesson-builder
   skill. Until this lands, any lesson carrying the console fails the gate.
3. **The storage check must stay as it is.** The console introduces no storage,
   so `grep -rnE 'localStorage|sessionStorage|indexedDB|document\.cookie'` must
   still return empty. **Treat that grep as the regression test for the key
   handling** — if it ever hits, the key is being persisted and the design has
   been violated.
4. **`README.md`, "Your work is not saved".** *"transmit nothing"* becomes false
   for two pages. The honest rewrite stays narrow and keeps the promise's force:
   the pages transmit nothing unless you connect your own key on Sessions 0.1 or
   1, and then they transmit only what you put in that box, only to Google, only
   while the tab is open, and the key itself is never stored. Do not delete the
   section — it is why advisers trust the exercises.
5. **A new `docs/probe-captures.md` entry** for the §08 run-4 bare-API prompt,
   dated and with settings, in the existing format.
6. **`CHANGELOG.md`** entry naming the architectural exception, the two sessions
   it applies to, and the date.
7. **Instructor notes** in both sessions: the simulations-teach-mechanism /
   live-teaches-variance division from §2, and the run-4 labelling caution.

---

## 9. Phasing

| Phase | Work | New lines | Risk |
|---|---|---|---|
| 0 | Gate + `MAINTAINING.md` + `README.md` amendments | ~20 | none |
| 1 | Console component, both files (markup, CSS, `LM:BEGIN` block) | ~170 ×2 | low |
| 2 | Session 1 Kalai probe live, with the verdict reframe | ~40 | low |
| 3 | Session 0.1 §08 run 4, plus its capture entry | ~45 | low |
| 4 | Session 1 A5 live temperature | ~35 | low |
| 5 | Free-form box | ~30 | medium — drift risk |
| 6 | Changelog, instructor notes, acceptance pass | ~25 | none |

Phases 1–2 alone deliver most of the pedagogical value and are a defensible
stopping point. Phase 5 is the one to defer until you have watched a class use
phases 1–4.

**Duplication cost.** The console ships twice, byte-identical, because the
single-file rule forbids a shared script. The `LM:BEGIN v1` fence makes it
sweepable later by the same mechanism `restyle_sweep.py` already uses for CSS.
Bump the version in the fence on any change, and diff the two blocks as part of
the pre-push pass.

**Streaming, deliberately deferred.** `streamGenerateContent?alt=sse` would let
tokens arrive one at a time, which would reinforce Session 1 §02's whole
argument and match the existing `.tok.fresh` animation beautifully. It is also
more code and more failure modes. Ship non-streaming first; revisit once the
basic path has survived a live class.

---

## 10. Acceptance tests

Run all of these before the first delivery.

**Without a key** — the condition most students will be in.

1. Both pages render identically to today. Console collapsed, nothing broken.
2. Kalai probe gives the three captured dates and the captured verdict.
3. Session 0.1 §08 shows runs 1–3 and both capture panels; run 4 is not visible.
4. All existing gates (`g8`, `g9`, …) still mark complete.
5. Print preview shows no console.
6. `grep -rnE 'localStorage|sessionStorage|indexedDB|document\.cookie'` on the
   hub and lessons returns empty.

**With a key.**

7. A bad key gives a readable message, not a stack trace, and leaves captures working.
8. A good key populates the model dropdown from the live list and clears the input field.
9. Kalai runs three live calls; verdict text matches the observed outcome — force
   both branches by testing at `temperature:0` (expect convergence) and
   `temperature:2` (expect divergence).
10. `Forget the key` re-hides every `data-lm-live` element and restores captures.
11. Airplane mode mid-run falls back to the capture with the offline message.
12. Exceeding the 40-call ceiling gives the ceiling message, not a silent stall.
13. DevTools Network shows exactly one non-font external origin and the key
    appears only in a request header — never in a URL.

**Verified during planning.** CORS from the Pages origin, the
`x-goog-api-key` header, and the `generateContent` route and body shape were
confirmed live on 2026-08-22 (see the feasibility analysis, §6).

**Still to verify with a real key**, none of which changes the plan:

- Exact free-tier RPM/RPD for the chosen model. `ai.google.dev` is unreachable
  from the analysis environment; secondary sources disagree. With BYO keys each
  student has their own allowance, so this only bounds an instructor demo.
- Whether `GET /v1beta/models` returns what the filter in `lmConnect` expects.
- Whether `gemini-2.5-flash` is still the right default, or Flash-Lite is the
  better classroom choice on latency.
- Whether the Kalai question actually produces divergence on Gemini at
  `temperature:1`. **Run this before class.** If it converges, the verdict
  branch handles it correctly — but you want to know which branch you are
  teaching before you are standing in front of the room.
