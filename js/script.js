// Particles canvas and boot typing

const canvas = document.getElementById('particles');
if(canvas){
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const pts = [];
  const N = Math.floor((W*H)/70000);
  for(let i=0;i<N;i++) pts.push({x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4});
  function resize(){ W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  addEventListener('resize', resize);
  function render(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++){
      const a = pts[i];
      ctx.fillStyle = 'rgba(34,211,238,0.06)';
      ctx.fillRect(a.x, a.y, 2, 2);
      for(let j=i+1;j<pts.length;j++){
        const b = pts[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d<140){
          ctx.strokeStyle = 'rgba(124,58,237,' + (1 - d/160)*0.15 + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }
    for(let p of pts){
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>W) p.vx *= -1;
      if(p.y<0||p.y>H) p.vy *= -1;
    }
    requestAnimationFrame(render);
  }
  render();
}

function typeText(el, text, delay=28, cb){
  let i=0; el.textContent='';
  function step(){ if(i<text.length){ el.textContent += text.charAt(i++); setTimeout(step, Math.random()*delay + delay*0.2); } else if(cb) cb(); }
  step();
}

document.addEventListener('DOMContentLoaded', ()=>{
  const bootText = document.getElementById('bootText');
  const bootCta = document.getElementById('bootCta');
  if(bootText){
    const sequence = [
      "Accessing AI World...\n",
      "Authenticating: Sahil Mirza...\n",
      "Loading modules: [UI] [AI] [APPS]...\n",
      "Boot complete. Welcome, Sahil.\n"
    ];
    let ix = 0;
    function runSeq(){
      if(ix<sequence.length){
        typeText(bootText, bootText.textContent + sequence[ix], 18, ()=>{ ix++; setTimeout(runSeq, 300); });
      } else {
        setTimeout(()=>{ bootText.style.opacity=0.08; bootCta.style.display='block'; }, 500);
      }
    }
    runSeq();
  }
});
