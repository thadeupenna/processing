let N;
let L = 400;
let width = 800;
let height = 100;
let p = [];
let s = [];
let Y = height/2;
let x0;
let xe;
let sl,sigma;
let slN;
let t,l,lsum,e0;
let fixo;
let potential;
let dt = 5e-2;
let r0 = 1.122462;

class Particle {

  constructor(i,d) {
    this.i = i;
    this.x = i*r0;
    this.v = 0;
    this.d = d;
    this.m = sq(this.d);
    this.fe = 0;
    this.fd = 0;
  }

  show() {
    fill(128);
    strokeWeight(1);
    stroke(0);
    let xp = map(this.x,-1,32,100,700);
    circle(xp, Y, 10);
  }

  updatef() {
    let sl, sr;
    potential = 'OH';
    if (kind.value() == 'Lennard-Jones') potential = 'LJ';
    if (this.i > 0) {
      this.fe = -p[this.i-1].fd;  
    }
    else {
      this.fe = 0;
    }
    if (this.i == N-1) {
      this.fd = 0;
    } 
    else {
      if (potential == 'LJ') {
        this.fd = -LJ(this.i, this.i+1);
      }
      else {
        this.fd = OscHarm(this.i, this.i+1);
      }  
    }
    let fr =  this.fd + this.fe;
  }

  updatex() {
    this.v += (this.fd + this.fe)*dt;
    this.x += this.v*dt;  
  }
}


function LJ(i,j) {
  let rij = p[j].x - p[i].x;
  sigma = 1;
  return 24*e0*pow(sigma/rij,6)*(2*pow(sigma/rij,6)-1.)/rij; 
}

function OscHarm(i,j) {
  let rij =  p[j].x - p[i].x;
  return 20*(rij-r0);
}

function initialCond() {
  background(211);

  t = 0;
  lsum = 0;
  e0 = 0.7;
  N = 24;
  x0 = 0;
  E = sl.value();
  fixo=floor(N/2); 

  let v0 = 0;
  for (let i=0; i<N; i++) {
    p[i] = new Particle(i,10);
  }
  // p[fixo-1].v = E/70;
  // p[fixo+1].v = -p[fixo-1].v;
  for (let i=0; i<N; i++) {
    let ft = 5;
    if (potential == 'LJ') ft = 15; 
    let dx =  random(-1e-1,1e-1);
    p[i].x += dx/ft*E;
    p[i].show();
  }
  noLoop();
}

function comeca () {
  initialCond();
  loop();
}

function setup() {
  createCanvas(width,height);
  createP('Velocidade');
  sl = createSlider(0,10,0);
  initialCond();
  createP('');
  sl.input(initialCond);

  kind = createRadio();
  kind.option('Lennard-Jones');
  kind.option('Oscilador Harmônico');
  kind.selected('Lennard-Jones');
  kind.input(initialCond);
  potential = 'LJ';
  noLoop();
  let btnStart = createButton("Início");
  btnStart.mousePressed(comeca);

  let btnReset = createButton("Parar");
  btnReset.mousePressed(noLoop);
  frameRate(60);
}

function draw() {
  background(211);
  stroke(255,0,0);

  for (let i in p) {
    p[i].updatef();
    p[i].updatex();
    p[i].show(); 
  }
  lsum += p[N-1].x-p[0].x;
  t++;
  text('L='+nf(lsum/t,3,1),20,12);
  text('t='+t,20,90);
  text(kind.value(),20,30);
}