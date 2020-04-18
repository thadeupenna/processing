let t=0;

//  Máximo valor de temperatura 
let th_max=100;

// Temperatura do corpo mais quente
let th = 100;

// temperatura do corpo mais frio 
let tc = 0;

// veriação máxima
let dt = th - tc;

// Capacidades de cada corpo
var c1=1.0;
var c2=1.0;

// Que fração deve ser transferida sem alterar 
// muito a temperatura
let f = 0.01;


let de;
let x=0,xa=0,xb=0;
let yp = [th], xp = [0];

function setup() {
  createCanvas(600, 400);
  rectMode(CENTER);
  textAlign(CENTER);
}

function draw() {
let quente = color ('red');
let frio = color ('skyblue');  
let cinza = color ('silver');
   background(255);
   colorMode(RGB);
   var corq = lerpColor(cinza,quente,(th-tc)/dt);
   fill(corq);
   rect(150,150,300,300,15);
   textSize(50);
   fill(0,0,0);
   text(nf(th,2,2)+" ℃",150,150);
   
   var corf = lerpColor(frio,cinza,1-(th-tc)/dt);
   fill(corf);
   rect(450,150,300,300,15);
   textSize(50);
   fill(0,0,0);
   text(nf(tc,2,2)+" ℃",450,150);
   xa = th;
   xb = tc;
   de = (th - tc)*f;
   th = th - de*c1;
   tc = tc + de*c2;
   t = t + 1;
   frameRate(30);
}
