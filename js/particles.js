// Confeti, destellos y pétalos en canvas; sin dependencias.
const canvas=document.getElementById('celebration-canvas');
const ctx=canvas.getContext('2d',{alpha:true});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let width=0,height=0,ratio=1,items=[],raf=0;
const palette=['#e8b64a','#ffe07c','#c992d0','#f6b6cd','#fffdf0','#d48f54'];
function resize(){ratio=Math.min(window.devicePixelRatio||1,2);width=window.innerWidth;height=window.innerHeight;canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(ratio,0,0,ratio,0,0)}
resize();window.addEventListener('resize',resize,{passive:true});
function step(){
 ctx.clearRect(0,0,width,height);
 items=items.filter(p=>p.life<p.max && p.y<height+70);
 for(const p of items){
  p.life++;p.vy+=p.gravity;p.vx*=.997;p.x+=p.vx+Math.sin(p.life*.04+p.seed)*.25;p.y+=p.vy;p.angle+=p.spin;
  ctx.save();ctx.globalAlpha=Math.min(1,Math.max(0,(p.max-p.life)/55));ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.fillStyle=p.color;
  if(p.kind==='star'){ctx.beginPath();for(let k=0;k<8;k++){const a=k*Math.PI/4,r=k%2?p.radius*.25:p.radius;k?ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r):ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.closePath();ctx.fill()}
  else if(p.kind==='petal'){ctx.beginPath();ctx.ellipse(0,0,p.radius*1.35,p.radius*.52,0,0,Math.PI*2);ctx.fill()}
  else ctx.fillRect(-p.radius*.65,-p.radius*.32,p.radius*1.3,p.radius*.64);
  ctx.restore();
 }
 if(items.length)raf=requestAnimationFrame(step);else{raf=0;ctx.clearRect(0,0,width,height)}
}
export function celebrate(options={}){
 if(reduced)return;
 const count=Math.min(options.count??110,230),x=options.x??width/2,y=options.y??height*.33;
 for(let i=0;i<count;i++){
  const angle=Math.random()*Math.PI*2,speed=2+Math.random()*8;
  items.push({x:x+(Math.random()-.5)*36,y:y+(Math.random()-.5)*28,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-3.5,gravity:.09+Math.random()*.09,angle:Math.random()*6.28,spin:(Math.random()-.5)*.22,radius:3+Math.random()*6,color:palette[Math.floor(Math.random()*palette.length)],kind:i%11===0?'star':i%4===0?'petal':'confetti',life:0,max:90+Math.floor(Math.random()*105),seed:Math.random()*10});
 }
 if(!raf)raf=requestAnimationFrame(step);
}
