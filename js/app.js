import {celebrate} from './particles.js';
import {toggleMusic} from './audio.js';
const $=s=>document.querySelector(s);
const intro=$('#intro'),experience=$('#experience'),flowerButton=$('#flower-button'),musicButton=$('#music-toggle');
const canReduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let started=false;
flowerButton.addEventListener('click',()=>{
 if(started)return;started=true;flowerButton.disabled=true;
 intro.classList.add('leaving');celebrate({count:150,x:window.innerWidth/2,y:window.innerHeight*.44});
 setTimeout(()=>{
  intro.hidden=true;experience.hidden=false;window.scrollTo(0,0);
  $('#birthday-hero').classList.add('hero-entry');
  celebrate({count:190,x:window.innerWidth/2,y:window.innerHeight*.32});
  setTimeout(()=>celebrate({count:100,x:window.innerWidth*.72,y:window.innerHeight*.26}),580);
  $('#birthday-title').focus({preventScroll:true});
 },canReduce?50:940);
});
musicButton.addEventListener('click',async()=>{
 const playing=await toggleMusic();musicButton.setAttribute('aria-pressed',String(playing));
 musicButton.querySelector('.music-caption').textContent=playing?'Pausar música':'Activar música';
 musicButton.querySelector('.music-icon').textContent=playing?'♫':'♪';
});
const cakeButton=$('#blow-candles');
cakeButton.addEventListener('click',()=>{
 if(cakeButton.disabled)return;
 cakeButton.disabled=true;$('#cake-stage').classList.add('blowed');
 cakeButton.textContent='¡Deseo pedido! ✨';
 $('#cake-result').textContent='Que este nuevo año te traiga muchas cosas buenas, Dorcas.';
 celebrate({count:145,x:window.innerWidth/2,y:Math.min(window.innerHeight*.5,320)});
});
const envelope=$('#envelope'),letter=$('#letter-paper');
envelope.addEventListener('click',()=>{
 if(envelope.getAttribute('aria-expanded')==='true')return;
 envelope.classList.add('open');envelope.setAttribute('aria-expanded','true');
 setTimeout(()=>{letter.hidden=false;letter.scrollIntoView({behavior:canReduce?'auto':'smooth',block:'center'})},canReduce?0:550);
});
const obs=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
const lightbox=$('#lightbox'),expandedImg=$('#lightbox-image'),expandedText=$('#lightbox-caption');
document.querySelectorAll('.memory-card').forEach(card=>card.addEventListener('click',()=>{
 const img=card.querySelector('img');expandedImg.src=img.src;expandedImg.alt=img.alt;expandedText.textContent=card.querySelector('b').textContent;
 if(typeof lightbox.showModal==='function')lightbox.showModal();
}));
$('#lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});
const overlay=$('#finale-overlay'),garden=$('#flower-garden'),gift=$('#last-gift'),close=$('#finale-close');
gift.addEventListener('click',()=>{
 overlay.hidden=false;garden.replaceChildren();
 for(let i=0;i<26;i++){
  const item=document.createElement('span'),img=document.createElement('img');
  item.className='floating-flower';img.src='assets/illustrations/sunflower.svg';img.alt='';img.loading='eager';
  item.style.setProperty('--x',String(Math.random()*100)+'%');
  item.style.setProperty('--size',String(55+Math.random()*125)+'px');
  item.style.setProperty('--delay',String(Math.random()*3.2)+'s');
  item.style.setProperty('--dur',String(5+Math.random()*4)+'s');
  item.style.setProperty('--drift',String((Math.random()-.5)*235)+'px');
  item.style.setProperty('--rot',String((Math.random()-.5)*100)+'deg');
  item.appendChild(img);garden.appendChild(item);
 }
 requestAnimationFrame(()=>overlay.classList.add('show'));
 close.focus({preventScroll:true});
 celebrate({count:170,x:window.innerWidth*.48,y:window.innerHeight*.34});
 setTimeout(()=>celebrate({count:130,x:window.innerWidth*.22,y:window.innerHeight*.26}),500);
});
function closeFinale(){
 overlay.classList.remove('show');
 setTimeout(()=>{overlay.hidden=true;garden.replaceChildren();gift.focus({preventScroll:true})},300);
}
close.addEventListener('click',closeFinale);
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!overlay.hidden)closeFinale()});
