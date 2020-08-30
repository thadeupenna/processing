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

let de;
let x=0,xa=0,xb=0;
let slt1,slt2;

function initialCond() {
  th = slt1.value();
  tc = slt2.value();
  thermo(th,tc);
  noLoop();
}

function thermo() {
  fill(151);
  rect(150,150,300,300,15);
  // fill(corf);
  rect(450,150,300,300,15);
  textSize(50);
  fill(0);
  text(nf(round(th,2),2,2)+" ℃",150,150);
  text(nf(round(tc,2),2,2)+" ℃",450,150);
  textSize(25);
  c2 = sc2.value();
  text('C1 = 1',200,40);
  text('C2 = '+c2,500,40);
}



function setup() {

  createCanvas(600, 400);
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
