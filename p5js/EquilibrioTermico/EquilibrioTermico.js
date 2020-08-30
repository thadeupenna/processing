let t=0;
//  Máximo valor de temperatura 
let th_max=100;
// Temperatura do corpo mais quente
let th, tc;
// veriação máxima
let dt = th - tc;
// Capacidades de cada corpo
var c1=1.0;
var c2=1.0;
// Que fração deve ser transferida sem alterar 
// muito a temperatura
let f = 0.01;
let width=150;
let height=150;
let de;
let x=0,xa=0,xb=0;
let slt1,slt2;

function initialCond() {
  th = slt1.value();
  tc = slt2.value();
  thermo(th,tc);
  t=0;
  noLoop();
}

function thermo() {
  fill(151);
  rect(100,  100,width,height,15);
  fill(180);
  rect(100+width,100,width,height,15);
  textSize(20);
  fill(0);
  text(nf(round(th,2),2,2)+" ℃", width/2+30, 100);
  text(nf(round(tc,2),2,2)+" ℃", width +100, 100);
  textSize(12);
  c2 = sc2.value();
  text('C1 = 1',60+width/2,40);
  text('C2 = '+c2,60+width,40);
  textSize(24);
  text('t = '+t,80+width,160);
}



function setup() {

  createCanvas(600, 200);
  rectMode(CENTER);
  textAlign(CENTER);
  createP('Temperatura T1');
  slt1 = createSlider(0,100,80);
  slt1.input(initialCond);
  createP('Temperatura T2');
  slt2 = createSlider(0,100,20);
  slt2.input(initialCond);
  createP('Capacidade Térmica de 2');
  sc2 = createSlider(1,5,1);
  initialCond();
  sc2.input(thermo);
  createP('');
  noLoop();
  let btnStart = createButton("Início");
  btnStart.mousePressed(loop);

  let btnReset = createButton("Parar");
  btnReset.mousePressed(noLoop);
  frameRate(60);
}

function draw() {

  background(255);
  colorMode(RGB);
  c1 = 1; 
  thermo(th,tc);
  xa = th;
  xb = tc;
  de = (th - tc)*f;
  th = th - de*c1;
  tc = tc + de*c2;
  t = t + 1;
  frameRate(30);
}
