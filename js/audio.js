// Melodía instrumental ORIGINAL sintetizada en navegador.
// Se puede sustituir por una grabación autorizada (ver README.md).
let context=null,timer=null,playing=false,step=0,master=null;
const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46,659.25,523.25,587.33,659.25,523.25,392,440,523.25];
function pluck(freq,at,volume=.07){
 const osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.setValueAtTime(freq,at);
 gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(volume,at+.019);gain.gain.exponentialRampToValueAtTime(.0001,at+.48);
 osc.connect(gain);gain.connect(master);osc.start(at);osc.stop(at+.5);
}
function tick(){if(!playing||!context)return;const now=context.currentTime;for(let i=0;i<4;i++){const n=notes[(step+i)%notes.length];pluck(n,now+i*.26,.055);if((step+i)%4===0)pluck(n/2,now+i*.26,.027)}step=(step+4)%notes.length}
export async function toggleMusic(){
 if(playing){playing=false;clearInterval(timer);timer=null;return false}
 try{
  if(!context){context=new (window.AudioContext||window.webkitAudioContext)();master=context.createGain();master.gain.value=.52;master.connect(context.destination)}
  await context.resume();playing=true;tick();timer=setInterval(tick,1040);return true;
 }catch(error){playing=false;console.warn('Audio no disponible',error);return false}
}
document.addEventListener('visibilitychange',()=>{if(context){if(document.hidden)context.suspend();else if(playing)context.resume()}});
