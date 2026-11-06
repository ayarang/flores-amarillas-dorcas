/**
 * Cumpleaños de Dorcas — viernes 6 de noviembre de 2026, desde las 00:00
 * en Perú (America/Lima). Lima mantiene UTC−05 todo el año.
 * Se compara con timestamps UTC para que funcione aun cuando alguien abra
 * el enlace desde otro país o tenga el huso horario del sistema distinto.
 */
import {celebrate} from './particles.js';

const BIRTHDAY_START = Date.UTC(2026,10,6,5,0,0);
const NEXT_DAY_START = Date.UTC(2026,10,7,5,0,0);
const caption = document.getElementById('birthday-date-caption');
const clock = document.getElementById('birthday-clock');
const countdown = document.querySelector('.birthday-countdown');
let previousStage = '';

function pad(number) {return String(number).padStart(2,'0');}

function updateBirthday() {
  if (!caption || !clock) return;
  const now=Date.now();

  if (now < BIRTHDAY_START) {
    const secondsLeft=Math.ceil((BIRTHDAY_START-now)/1000);
    const days=Math.floor(secondsLeft/86400);
    const hours=Math.floor(secondsLeft%86400/3600);
    const minutes=Math.floor(secondsLeft%3600/60);
    const seconds=secondsLeft%60;
    caption.textContent=days>0?'Faltan '+days+' día'+(days===1?'':'s')+' para su cumpleaños ✨':'¡Falta poquito para su cumpleaños! ✨';
    clock.textContent=pad(hours)+' : '+pad(minutes)+' : '+pad(seconds);
    clock.hidden=false;
    if (countdown) countdown.setAttribute('aria-label','Quedan '+(days?days+' días, ':'')+hours+' horas, '+minutes+' minutos y '+seconds+' segundos para el 6 de noviembre');
    previousStage='before';
    return;
  }

  document.body.classList.add('birthday-day');
  clock.hidden=true;
  if (now < NEXT_DAY_START) {
    caption.textContent='🎉 ¡Hoy es tu cumpleaños, Dorcas!';
    if(countdown) countdown.setAttribute('aria-label','Hoy viernes 6 de noviembre de 2026 es el cumpleaños de Dorcas');
  } else {
    caption.textContent='🌻 Un recuerdo del 6 de noviembre, para Dorcas';
    if(countdown) countdown.setAttribute('aria-label','Un recuerdo del cumpleaños de Dorcas del 6 de noviembre');
  }

  // Si alguien tiene la página abierta al pasar las 00:00, sorprender sin
  // disparar confeti repetidamente en cada tick.
  if(previousStage==='before' && !document.hidden){
    celebrate({count:95,x:window.innerWidth/2,y:Math.min(window.innerHeight*.33,290)});
  }
  previousStage='birthday';
}

updateBirthday();
const countdownTimer=setInterval(()=>{
  updateBirthday();
  if(Date.now()>NEXT_DAY_START)clearInterval(countdownTimer);
},1000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateBirthday()});
