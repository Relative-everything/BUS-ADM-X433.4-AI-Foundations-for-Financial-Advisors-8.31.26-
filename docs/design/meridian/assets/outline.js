/* outline.js
   Builds the outline sidebar and the earned checks. Commits only: a task is earned when a control
   that records the learner's own answer is activated; opening a key without committing does not
   count. State is held in variables and clears on reload (PEDAGOGY 1.9). Nothing here gates
   scrolling (PEDAGOGY 1.10). No request, no storage.
   Markup contract:
     section.slide[data-nav="Title"]    one outline row each; .apx marks appendix
     .mins inside a section             its minutes
     [data-commit] on a control         activating it earns its task
     [data-commit-in="selector"]        on a container, for controls a page script builds later:
                                        activating a descendant that matches the selector earns the task
     data-commit-needs="selector"       beside either: the commit counts only when a field matching
                                        the selector, in the nearest enclosing block that has one, holds
                                        text (a lock-and-reveal on an empty box is a reveal)
   Only events the learner makes count: a click made by a page script is ignored.
   A task is the nearest [data-task] ancestor of the marked element, or the element itself. Buttons
   and other controls commit on click; text fields, selects and checkboxes commit on input or change.
   A section with no task to earn shows the neutral dot and its minutes.
   The outline button lives in #topbar. Where a page's bar is an empty element (build-outline.mjs adds
   one to a lesson that floats its controls instead), the page's own title is written into it. */
(function(){
"use strict";
var secs=[].slice.call(document.querySelectorAll('section.slide[data-nav]')).filter(function(s){return !s.classList.contains('apxdiv')});
if(!secs.length)return;
var bar=document.getElementById('topbar');if(!bar)return;
if(!bar.firstElementChild){var tt=document.createElement('span');tt.className='ttl';tt.textContent=document.title;bar.appendChild(tt)}
var done={},acts={},rows={},cur=null;
function mins(s){var m=s.querySelector('.mins');var v=m?parseInt(m.textContent,10):0;return isNaN(v)?0:v}
function apx(s){return s.classList.contains('apx')}
function shown(s){return s.offsetParent!==null}
function taskOf(el){return el.closest('[data-task]')||el}
var out=document.createElement('nav');out.id='outline';out.setAttribute('aria-label','Session outline');
var tog=document.createElement('button');tog.id='outlineToggle';tog.type='button';tog.textContent='Outline';
tog.setAttribute('aria-expanded','false');tog.setAttribute('aria-controls','outline');
bar.insertBefore(tog,bar.firstChild);document.body.appendChild(out);document.body.classList.add('has-outline');
function close(){out.classList.remove('open');tog.setAttribute('aria-expanded','false')}
tog.addEventListener('click',function(){var o=out.classList.toggle('open');tog.setAttribute('aria-expanded',o?'true':'false')});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
function filled(ctl,root,sel){
  for(var a=ctl.parentElement;a;a=a.parentElement){var f=a.querySelectorAll(sel);
    if(f.length){for(var i=0;i<f.length;i++)if((f[i].value||'').replace(/\s+/g,''))return true;return false}
    if(a===root)break}
  return false}
function hit(s,e){
  if(!e.isTrusted)return;   /* a click a page script makes (Shift+U opening every key) is not the learner's */
  var t=e.target;if(!t||!t.closest)return;
  var ctl=t.closest('[data-commit]'),holder=null,root,needs;
  if(ctl&&s.contains(ctl)){root=taskOf(ctl);needs=ctl.getAttribute('data-commit-needs')}
  else{holder=t.closest('[data-commit-in]');if(!holder||!s.contains(holder))return;
    try{ctl=t.closest(holder.getAttribute('data-commit-in'))}catch(x){ctl=null}
    if(!ctl||!holder.contains(ctl))return;root=taskOf(holder);needs=holder.getAttribute('data-commit-needs')}
  var field=/^(INPUT|TEXTAREA|SELECT)$/.test(ctl.tagName)&&!/^(button|submit|reset)$/.test(ctl.type||'');
  if(field?e.type==='click':e.type!=='click')return;
  if(needs&&!filled(ctl,root,needs))return;
  if(done[s.id].indexOf(root)<0){done[s.id].push(root);paint()}}
secs.forEach(function(s){
  var a=[];[].forEach.call(s.querySelectorAll('[data-commit],[data-commit-in]'),function(el){var r=taskOf(el);if(a.indexOf(r)<0)a.push(r)});
  acts[s.id]=a;done[s.id]=[];
  ['click','change','input'].forEach(function(ev){s.addEventListener(ev,function(e){hit(s,e)},true)})});
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
