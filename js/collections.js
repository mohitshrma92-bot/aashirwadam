(function(){
var ov=document.getElementById('ov');
var mo=document.getElementById('mo'),mc=document.getElementById('mc');
if(mo&&ov){mo.onclick=function(){ov.classList.add('open')};mc.onclick=function(){ov.classList.remove('open')};
ov.querySelectorAll('a').forEach(function(a,i){a.style.transitionDelay=(i*0.05)+'s';a.addEventListener('click',function(){ov.classList.remove('open')})})}
var cards=[].slice.call(document.querySelectorAll('[data-main]'));
var lb=document.getElementById('lb');
if(!lb||!cards.length)return;
var img=document.getElementById('lb-img'),cap=document.getElementById('lb-cap'),sub=document.getElementById('lb-sub'),
th=document.getElementById('lb-th'),wa=document.getElementById('lb-wa');
var cur=0,view='main',lastFocus=null;
function show(i,v){
 cur=(i+cards.length)%cards.length;view=v||'main';
 var c=cards[cur],d=c.dataset;
 var hasBox=!!d.box;
 img.src=(view==='box'&&hasBox)?d.box:d.main;
 img.alt=d.name+(view==='box'?' packaging':'');
 cap.textContent=d.name;sub.textContent=d.series||'';
 wa.href=d.wa;
 var os=document.getElementById('lb-os');if(os)os.href='/order-sample/?d='+d.cat+'/'+d.slug;
 th.innerHTML='';
 if(hasBox){[['main','Opened box'],['box','Packaging']].forEach(function(p){
  var b=document.createElement('button');b.type='button';b.textContent=p[1];if(view===p[0])b.className='on';
  b.onclick=function(){show(cur,p[0])};th.appendChild(b)})}
 try{history.replaceState(null,'','#'+d.slug)}catch(e){}
}
function open(i,v){lastFocus=document.activeElement;lb.classList.add('open');document.body.style.overflow='hidden';show(i,v);lb.querySelector('.lb-x').focus()}
function close(){lb.classList.remove('open');document.body.style.overflow='';try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}if(lastFocus)lastFocus.focus()}
cards.forEach(function(c,i){c.addEventListener('click',function(e){e.preventDefault();open(i)})});
lb.querySelector('.lb-x').onclick=close;
lb.querySelector('.prev').onclick=function(){show(cur-1)};
lb.querySelector('.next').onclick=function(){show(cur+1)};
lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-stage'))close()});
document.addEventListener('keydown',function(e){
 if(!lb.classList.contains('open'))return;
 if(e.key==='Escape')close();else if(e.key==='ArrowLeft')show(cur-1);else if(e.key==='ArrowRight')show(cur+1)});
var sx=null;
lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1))},{passive:true});
var h=location.hash.replace('#','');
if(h){for(var k=0;k<cards.length;k++){if(cards[k].dataset.slug===h){open(k);break}}}
})();
