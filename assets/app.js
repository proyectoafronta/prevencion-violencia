(function(){
var b=document.body.getAttribute('data-base')||'',K='pv-progreso';
function get(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return {}}}
function set(o){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
var h='<a class="skip" href="#main">Saltar al contenido</a><div class="bar"><a href="'+b+'index.html"><img src="'+b+'img/logos-afronta-grafo-uab.png" alt="AFRONTA, GRAFO y UAB: ir al inicio del curso"></a><button class="exit" data-exit type="button" title="Cierra el curso y abre otra página (también: pulsa Esc dos veces)">Salida rápida</button></div>';
var f='<footer class="ft"><div class="wrap"><div class="logos"><img src="'+b+'img/logos-afronta-grafo-uab.png" alt="AFRONTA, GRAFO y UAB"><img src="'+b+'img/logo-ministerio-aei.png" alt="Gobierno de España, Ministerio de Ciencia, Innovación y Universidades, cofinanciado por la Unión Europea, Agencia Estatal de Investigación"></div>'
+'<p>Recurso formativo del Proyecto AFRONTA (PID2022-139502OB-I00), grupo GRAFO, Universitat Autònoma de Barcelona. Autoría: Equipo AFRONTA. Proyecto financiado por el Ministerio de Ciencia, Innovación y Universidades / Agencia Estatal de Investigación y cofinanciado por la Unión Europea.</p>'
+'<p><a rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es"><img src="'+b+'img/cc-by-nc-nd.svg" alt="Licencia Creative Commons Reconocimiento-NoComercial-SinObraDerivada" width="120" height="42"></a><br>Esta obra se distribuye bajo licencia Creative Commons Reconocimiento-NoComercial-SinObraDerivada (CC BY-NC-ND). Este curso no recoge datos personales ni usa cookies; el progreso se guarda solo en tu navegador.</p></div></footer>';
document.body.insertAdjacentHTML('afterbegin',h);
document.body.insertAdjacentHTML('beforeend',f);
function exit(){location.replace('https://es.wikipedia.org')}
var esc=0;
document.querySelectorAll('.quiz').forEach(function(z){var o=[].slice.call(z.querySelectorAll('.opt'));if(!o.length||o[0].textContent==='Verdadero')return;var f=z.querySelector('.fb');for(var i=o.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=o[i];o[i]=o[j];o[j]=t}o.forEach(function(b){z.insertBefore(b,f)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){esc++;setTimeout(function(){esc=0},1200);if(esc>=2)exit()}});
document.addEventListener('click',function(e){
var t=e.target;
if(t.closest('[data-exit]')){exit();return}
var o=t.closest('.opt');
if(o){var q=o.closest('.quiz');if(q.getAttribute('data-done'))return;q.setAttribute('data-done','1');
var ok=o.hasAttribute('data-ok');
q.querySelectorAll('.opt').forEach(function(x){x.disabled=true;if(x.hasAttribute('data-ok'))x.classList.add('ok')});
if(!ok)o.classList.add('no');
var fb=q.querySelector('.fb');fb.hidden=false;
fb.insertAdjacentHTML('afterbegin','<b>'+(ok?'Correcto. ':'No exactamente. ')+'</b>');
if(q.hasAttribute('data-final')){var all=document.querySelectorAll('.quiz[data-final]'),dn=document.querySelectorAll('.quiz[data-final][data-done]'),good=document.querySelectorAll('.quiz[data-final][data-done] .opt.no').length;var sc=document.getElementById('sc');if(sc)sc.textContent='Respondidas: '+dn.length+' de '+all.length+'. Aciertos: '+(dn.length-good)+'.'}
return}
var g=t.closest('[data-diploma]');
if(g){var nm=document.getElementById('nm'),v=nm.value.trim(),pr=get(),miss=[],pt=[];for(var k=0;k<6;k++)if(!pr['u'+k])miss.push(k);
var fin=document.querySelectorAll('.quiz[data-final]').length,rs=document.querySelectorAll('.quiz[data-final][data-done]').length,dm=document.getElementById('dmsg');
if(miss.length)pt.push('marca como completadas las unidades '+miss.join(', '));if(rs<fin)pt.push('responde las '+fin+' preguntas de la evaluación final');if(!v)pt.push('escribe tu nombre');
if(pt.length){dm.hidden=false;dm.textContent='Para generar el diploma, '+pt.join(' y ')+'.';return}
dm.hidden=true;document.getElementById('dn').textContent=v;document.getElementById('dd').textContent=new Date().toLocaleDateString('es-ES');document.getElementById('dip').hidden=false;window.print();return}
var r=t.closest('[data-reset]');
if(r){var u=r.getAttribute('data-reset');
if(u==='all'){if(!confirm('¿Borrar el progreso de todo el curso en este navegador?'))return;try{localStorage.removeItem(K)}catch(x){}}
else{var q2=get();delete q2[u];set(q2)}
location.reload();return}
var c=t.closest('[data-complete]');
if(c){var p=get();p[c.getAttribute('data-complete')]=1;set(p);c.disabled=true;c.textContent='Unidad completada';var m=document.getElementById('saved');if(m)m.hidden=false}
});
var p=get();
document.querySelectorAll('[data-unit]').forEach(function(li){if(p[li.getAttribute('data-unit')]){li.classList.add('done');li.querySelector('small').textContent+=' ✓ completada'}});
document.querySelectorAll('[data-complete]').forEach(function(c){if(p[c.getAttribute('data-complete')]){c.disabled=true;c.textContent='Unidad completada'}});
})();
