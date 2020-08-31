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
let dt = 5e-1;

class Particle {

  constructor(i,d) {
    this.i = i;
    this.x = i*2*d;
    this.v = 0;
    this.d = d;
    this.m = sq(this.d);
    this.fe = 0;
    this.fd = 0;
  }

  show() {
    let raio = this.d/2;
    fill(150);
    circle(this.x+x0, Y, 2*raio);
    fill(0);
    strokeWeight(1);
    stroke(0);
    circle(this.x+x0, Y, raio);
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
    if (this.i != 5*fixo) {
      this.v += (this.fd + this.fe)*dt;
      this.x += this.v*dt;  
    }
  }
}


function LJ(i,j) {
  let rij = p[j].x - p[i].x;
  sigma = 2*p[j].d*pow(2,-1/6);
  return 24*e0*pow(sigma/rij,6)*(2*pow(sigma/rij,6)-1.)/rij; 
}

function OscHarm(i,j) {
  sigma = p[i].d/2
  let rij =  p[j].x - p[i].x;
  return (rij-2*p[i].d);
}

function initialCond() {
  t = 0;
  lsum = 0;
  e0 = 0.7;
  N = 31;
  x0 = (width-N*20)/2;
  E = sl.value();
  fixo=floor(N/2); 

  let v0 = 0;
  for (let i=0; i<N; i++) {
    p[i] = new Particle(i,10);
  }
  // p[fixo-1].v = E/70;
  // p[fixo+1].v = -p[fixo-1].v;
  for (let i=1; i<N-1; i++) {
    let ft =5000;
    if (potential == 'LJ') ft =30000; 
    p[i].x *= 1+random(-1,1)*E/ft; 
  }
  loop();
}

function setup() {
  createCanvas(width,height);
  createP('Velocidade');
  sl = createSlider(0,100,0);
  initialCond();
  createP('');
  sl.changed(initialCond);

  kind = createRadio();
  kind.option('Lennard-Jones');
  kind.option('Oscilador Harmônico');
  kind.selected('Lennard-Jones');
  potential = 'LJ';

  let btnStart = createButton("Início");
  btnStart.mousePressed(initialCond);

  let btnReset = createButton("Parar");
  btnReset.mousePressed(noLoop);
  frameRate(60);
}

function draw() {
  background(211);
  stroke(255,0,0);

  for (let i in p) p[i].updatef();
  for (let i in p) {
    p[i].updatex();
    p[i].show(); 
  }
  lsum += p[N-1].x-p[0].x;
  t++;
  text('L='+nf(lsum/t,3,1),20,12);
  text('t='+t,20,90);
  text(kind.value(),20,30);
  stroke(255,0,0,128);
  line(x0+p[0].x,   0, x0+p[0].x  , 200);
  line(x0+p[N-1].x, 0, x0+p[N-1].x, 200);
  stroke(0,0,255,128);
  line(x0,   0, x0  , 200);
  line(x0+(N-1)*20, 0, x0+(N-1)*20, 200);
}
