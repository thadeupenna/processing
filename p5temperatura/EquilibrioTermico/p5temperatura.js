let t=0;
let th_max=100;
let th = 100;
let tc = 0;
let de,c1=1.0,c2=1.0;
let f = 0.003;
let width=50;
let height=60;
let x=0,xa=0,xb=0;
let yp = [th], xp = [0];

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  textAlign(CENTER);

}

function draw() {
let quente = color (255,0,0);
let frio = color (127,127,255);  
   background(255);
   colorMode(RGB);
   var corq = lerpColor(frio,quente,th/th_max);
   fill(corq);
   rect(150,150,300,300,15);
   textSize(50);
   fill(0,0,0);
   text(nf(th,2,2),150,150);
   
   var corf = lerpColor(frio,quente,tc/th_max);
   fill(corf);
   rect(450,150,300,300,15);
   textSize(50);
   fill(0,0,0);
   text(nf(tc,2,2),450,150);
   xa = th;
   xb = tc;
   de = (th - tc)*f;
   th = th - de*c1;
   tc = tc + de*c2;
   t = t + 1;
   xp.push(t);
   yp.push(th);
   fill(corq);
   line(t-5,300+(100-xa),t,300+(100-th));
   fill(corf);
   line(t-5,300+(100-xb),t,300+(100-tc));
   if (t>600) {
     t=0;
   }
   frameRate(60);
}
