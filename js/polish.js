/**
 * Dorcas · pulido y microinteracciones.
 * Independiente de la lógica principal; sin dependencias y apto para GitHub Pages.
 */
const $ = (selector) => document.querySelector(selector);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const toast = $('#polish-toast');
let toastTimer = 0;

function notify(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => { if (!toast.classList.contains('is-visible')) toast.hidden = true; }, 320);
  }, 3500);
}

// Partículas sutiles alrededor del girasol: solo elementos decorativos.
function createWelcomeDust() {
  if (reduceMotion) return;
  const host = $('.intro-dust');
  if (!host) return;
  const points = [
    [8,23,20,'#ddb86f',0,6.8],[22,63,17,'#c18eab',-1.2,7.6],
    [75,15,20,'#dcbf7e',-2.4,7],[87,41,13,'#ac8dba',-1.1,6.4],
    [12,83,14,'#dfb47f',-3.3,9],[79,80,21,'#c19abe',-4,7.5],
    [55,7,14,'#e5c07f',-.3,6.8],[96,67,12,'#e5c780',-5,7.8],
    [38,86,14,'#bc95b8',-2,8],[68,42,11,'#dfc18b',-3.5,7],
    [4,47,16,'#d4a8b6',-2.8,9],[48,24,12,'#e3bf78',-5.2,7.9]
  ];
  for (const [x,y,size,color,delay,duration] of points) {
    const s = document.createElement('span');
    s.textContent = Math.random()>.43?'✧':'✦';
    s.style.setProperty('--x', x+'%');
    s.style.setProperty('--y', y+'%');
    s.style.setProperty('--size', size+'px');
    s.style.setProperty('--color', color);
    s.style.setProperty('--delay', delay+'s');
    s.style.setProperty('--duration', duration+'s');
    host.appendChild(s);
  }
}
createWelcomeDust();

// Un indicador discreto de avance, visible solo después de abrir el regalo.
const sections = [
 ['#birthday-hero','Sorpresa'],
 ['#cake-section','La torta'],
 ['#letter-section','La carta'],
 ['#distancia','Desde lejos'],
 ['#recuerdos','Recuerdos'],
 ['#last-section','Último regalo']
];
const progress = $('#site-progress');
const progressFill = $('#site-progress-fill');
const chapter = $('#story-chapter');
const chapterIndex = $('#story-index');
let ticking = false;
function refreshJourney() {
  ticking = false;
  const experience = $('#experience');
  if (!experience || experience.hidden || !progress || !chapter) return;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  progressFill.style.transform = 'scaleX('+Math.max(0,Math.min(1,window.scrollY/max))+')';
  let currentLabel = sections[0][1];
  const marker = Math.max(100, window.innerHeight*.37);
  for (const [id,label] of sections) {
    const item=$(id);
    if(item && item.getBoundingClientRect().top <= marker) currentLabel = label;
  }
  chapter.textContent = currentLabel;
}
function onJourneyScroll() {
  if (ticking) return;
  ticking=true;requestAnimationFrame(refreshJourney);
}
window.addEventListener('scroll', onJourneyScroll, {passive:true});
window.addEventListener('resize', onJourneyScroll, {passive:true});
$('#flower-button')?.addEventListener('click', () => {
  setTimeout(() => {
    progress.hidden=false;
    chapterIndex.hidden=false;
    const skip=$('#skip-link');if(skip)skip.hidden=false;
    refreshJourney();
  }, reduceMotion ? 90 : 1100);
}, {once:true});

// Galería táctil + controles con contador y ampliación por teclado.
const track=$('#gallery-track');
const cards=Array.from(track?.querySelectorAll('.memory-card') || []);
const counter=$('#gallery-counter'),prev=$('#gallery-prev'),next=$('#gallery-next');
const modal=$('#lightbox'),photo=$('#lightbox-image'),caption=$('#lightbox-caption'),photoCount=$('#lightbox-count');
const lightPrev=$('#lightbox-prev'),lightNext=$('#lightbox-next');
let current=0,lastCard=null,scrollPending=false;

function countString(index){return String(index+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0')}
function renderCount(){
  if (counter) counter.innerHTML=String(current+1).padStart(2,'0')+' <span>/ '+String(cards.length).padStart(2,'0')+'</span>';
  if (prev)prev.disabled=current<=0;
  if (next)next.disabled=current>=cards.length-1;
}
function scrollToCard(index){
  if(!cards.length)return;
  current=Math.min(cards.length-1,Math.max(0,index));
  cards[current].scrollIntoView({behavior:reduceMotion?'instant':'smooth',inline:'center',block:'nearest'});
  renderCount();
}
prev?.addEventListener('click',()=>scrollToCard(current-1));
next?.addEventListener('click',()=>scrollToCard(current+1));
function updateActiveCard(){
  scrollPending=false;
  if(!track||!cards.length)return;
  const trackCenter=track.getBoundingClientRect().left+track.clientWidth/2;
  let nearest=0,dist=Infinity;
  cards.forEach((card,i)=>{
    const r=card.getBoundingClientRect(),d=Math.abs(r.left+r.width/2-trackCenter);
    if(d<dist){dist=d;nearest=i}
  });
  current=nearest;renderCount();
}
track?.addEventListener('scroll',()=>{
  if(scrollPending)return;
  scrollPending=true;
  requestAnimationFrame(updateActiveCard);
},{passive:true});
window.addEventListener('resize',updateActiveCard,{passive:true});
renderCount();

function renderModal(){
  if(!cards.length||!photo)return;
  const img=cards[current].querySelector('img');
  photo.src=img.currentSrc||img.src;photo.alt=img.alt;
  if(caption)caption.textContent=cards[current].querySelector('.memory-caption b')?.textContent||'Recuerdo';
  if(photoCount)photoCount.textContent=countString(current);
  if(lightPrev)lightPrev.disabled=current===0;
  if(lightNext)lightNext.disabled=current===cards.length-1;
}
cards.forEach((card,i)=>card.addEventListener('click',()=>{
  current=i;lastCard=card;renderModal();renderCount();
}));
function navigateModal(delta){
  if(!modal?.open)return;
  const target=Math.max(0,Math.min(cards.length-1,current+delta));
  if(target===current)return;current=target;renderModal();renderCount();
}
lightPrev?.addEventListener('click',()=>navigateModal(-1));
lightNext?.addEventListener('click',()=>navigateModal(1));
modal?.addEventListener('keydown',(event)=>{
  if(event.key==='ArrowLeft'){event.preventDefault();navigateModal(-1)}
  if(event.key==='ArrowRight'){event.preventDefault();navigateModal(1)}
});
modal?.addEventListener('close',()=>{
  if(lastCard?.isConnected)lastCard.focus({preventScroll:true});
});
let touchStartX=0;
modal?.addEventListener('touchstart',(event)=>{
  touchStartX=event.changedTouches[0]?.screenX||0;
},{passive:true});
modal?.addEventListener('touchend',(event)=>{
  const dx=(event.changedTouches[0]?.screenX||0)-touchStartX;
  if(Math.abs(dx)>65)navigateModal(dx<0?1:-1);
},{passive:true});

// Compartir desde el teléfono con Web Share y, si no existe, copiar el enlace.
async function shareSurprise(){
  const url = new URL(window.location.href);
  url.search='';url.hash='';
  const payload={
    title:'🌻 ¡Feliz cumpleaños, Dorcas!',
    text:'¡Mira esta sorpresa de cumpleaños con flores amarillas! 🌻',
    url:url.toString()
  };
  if(navigator.share){
    try{await navigator.share(payload);return}
    catch(err){if(err?.name==='AbortError')return}
  }
  try{
    if(navigator.clipboard?.writeText){
      await navigator.clipboard.writeText(payload.url);
      notify('¡Enlace copiado! 🌻');return;
    }
    const field=document.createElement('textarea');
    field.value=payload.url;
    field.style.position='fixed';field.style.opacity='0';
    document.body.appendChild(field);field.focus();field.select();
    const copied=document.execCommand('copy');field.remove();
    if(copied){notify('¡Enlace copiado! 🌻');return;}
  }catch(err){console.warn('No se pudo copiar el enlace:',err)}
  window.prompt('Copia el enlace para compartir la sorpresa:',payload.url);
}
$('#share-surprise')?.addEventListener('click',shareSurprise);
$('#finale-share')?.addEventListener('click',shareSurprise);

// El diálogo de flores tiene dos controles; el foco no debe salir de él con Tab.
const finale=$('#finale-overlay');
finale?.addEventListener('keydown',(event)=>{
  if(event.key!=='Tab'||finale.hidden)return;
  const controls=Array.from(finale.querySelectorAll('button:not([disabled])'));
  if(!controls.length)return;
  const index=controls.indexOf(document.activeElement);
  if(event.shiftKey && index<=0){event.preventDefault();controls[controls.length-1].focus()}
  else if(!event.shiftKey && index===controls.length-1){event.preventDefault();controls[0].focus()}
});


// Volver a empezar sin perder los recuerdos ni depender de otra navegación.
$('#finale-repeat')?.addEventListener('click',()=>{
  window.scrollTo({top:0,behavior:'instant'});
  window.location.reload();
});
