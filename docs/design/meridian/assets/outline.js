/* outline.js
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
