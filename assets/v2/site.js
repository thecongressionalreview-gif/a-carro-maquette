(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const y=$('#y');if(y)y.textContent=new Date().getFullYear();
const hd=$('#hd'),mb=$('.mbar');const onS=()=>{const h=innerHeight*.7;if(hd&&hd.classList.contains('over'))hd.classList.toggle('sc',scrollY>40);if(mb)mb.classList.toggle('on',scrollY>(hd&&hd.classList.contains('over')?h:200))};addEventListener('scroll',onS,{passive:true});onS();
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});$$('.rv').forEach(el=>io.observe(el))}else $$('.rv').forEach(el=>el.classList.add('in'));
const M=window.MAT;if(M){const ph=$('#ph');const tabs=$$('.tab');
const show=i=>{const m=M[i];tabs.forEach(t=>t.setAttribute('aria-selected',+t.dataset.i===i));ph.classList.add('out');$('#if').classList.add('out');$('#dl').classList.add('out');
setTimeout(()=>{ph.onload=()=>ph.classList.remove('out');ph.src=m.img;ph.alt=m.name+' : '+m.sub;if(ph.complete)ph.classList.remove('out');$('#sw').src=m.tex;$('#nm').textContent=m.name;$('#sb').textContent=m.sub;$('#tx').textContent=m.txt;
$('#dl').innerHTML=m.d.map(x=>'<div><dt>'+x[0]+'</dt><dd>'+x[1]+'</dd></div>').join('');$('#if').classList.remove('out');$('#dl').classList.remove('out')},300)};
tabs.forEach(t=>{t.addEventListener('click',()=>show(+t.dataset.i));t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const n=(+t.dataset.i+(e.key==='ArrowRight'?1:M.length-1))%M.length;tabs[n].focus();show(n)}})});
addEventListener('load',()=>M.forEach(m=>{const i=new Image();i.src=m.img}))}
const form=$('#form');if(form){form.addEventListener('submit',e=>{e.preventDefault();const v=s=>(form.querySelector(s)||{}).value||'';
const travaux=$$('input[name="travaux"]:checked').map(c=>c.value).join(', ');const ok=travaux&&v('#f-nom').trim()&&v('#f-tel').trim()&&v('#f-ville').trim();
$('#err').hidden=!!ok;if(!ok)return;
const lines=['Bonjour Adil,','','Je souhaite un devis pour : '+travaux,'','Nom : '+v('#f-nom'),'Téléphone : '+v('#f-tel'),v('#f-mail')?'E-mail : '+v('#f-mail'):null,'Commune du chantier : '+v('#f-ville'),v('#f-surf')?'Surface approx. : '+v('#f-surf')+' m²':null,'Délai : '+v('#f-delai'),'',v('#f-msg'),'','Envoyé depuis adamcarrelage.fr'].filter(l=>l!==null).filter((l,i,a)=>l!==''||a[i-1]!=='');
const body=lines.join('\n'),subject='Demande de devis · '+travaux+' · '+v('#f-ville');
$('#ok-wa').href='https://wa.me/33768205517?text='+encodeURIComponent(body);location.href='mailto:contact@adamcarrelage.fr?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
const box=$('#ok');box.hidden=false;box.focus()})}})();