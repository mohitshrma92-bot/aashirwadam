(function(){
var bar=document.querySelector('.tools');if(!bar)return;
var q=bar.querySelector('.q'),sort=bar.querySelector('.sort'),cat=bar.querySelector('.catsel'),t3=bar.querySelector('.t3'),res=bar.querySelector('.res');
var hub=document.getElementById('all'),tiles=document.getElementById('tiles'),empty=document.getElementById('empty');
var grid=hub||document.querySelector('.grid');if(!grid)return;
var cards=[].slice.call(grid.querySelectorAll('.card'));
cards.forEach(function(c,i){c.dataset.i=i});
function norm(s){return s.toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim()}
function apply(){
 var v=norm(q.value),terms=v?v.split(' '):[],c=cat?cat.value:'',w3=t3&&t3.checked,so=sort.value;
 var active=!!(v||c||w3||so!=='default');
 var list=cards.slice().sort(function(a,b){
  if(so==='az')return a.dataset.name<b.dataset.name?-1:1;
  if(so==='za')return a.dataset.name<b.dataset.name?1:-1;
  return a.dataset.i-b.dataset.i});
 var n=0;
 list.forEach(function(el,ix){
  if(grid.children[ix]!==el)grid.insertBefore(el,grid.children[ix]||null);
  var s=norm(el.dataset.s),ok=terms.every(function(t){return s.indexOf(t)>-1})&&(!c||el.dataset.cat===c)&&(!w3||el.dataset['3d']==='1');
  el.hidden=!ok;if(ok)n++});
 if(hub){hub.hidden=!active;if(tiles)tiles.hidden=active}
 var showing=hub?active:true;
 empty.hidden=!(showing&&n===0);
 res.textContent=showing?(n+' of '+cards.length+' designs'):'';
 try{var u=new URL(location.href);if(v)u.searchParams.set('q',q.value.trim());else u.searchParams.delete('q');history.replaceState(null,'',u.pathname+u.search+u.hash)}catch(e){}
}
bar.addEventListener('input',apply);
try{var p=new URLSearchParams(location.search).get('q');if(p)q.value=p}catch(e){}
apply();
function focusSearch(){if(location.hash==='#search'){bar.scrollIntoView({block:'center'});q.focus()}}
window.addEventListener('hashchange',focusSearch);focusSearch();
})();
