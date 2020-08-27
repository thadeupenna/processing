let N = 20;
let L = 250;
let p = [];
let s = [];
let Y = 100;
let x0 = 75;
let xe = L/N;


class Particle {
  constructor(i,d) {
    this.i = i;
    this.x = i*L/N;
    this.v = 0;
    this.d = d;
    this.m = sq(this.d);
  }

  show() {
    fill(0);
    strokeWeight(1);
    stroke(0);
    ellipse(this.x+x0, Y, this.d, this.d);
  }

  update() {
    let sl, sr;
    if (this.i > 0) {
      sl = s[this.i-1].f;
    }
    else {
      sl = 0;
    }
    if (this.i == N) {
      sr = 0;
    } 
    else {
      sr = s[this.i].f;
    }
    let f =  - sl + sr;
    this.v += f;  
    this.x += this.v;
  }
}

class Spring {
  constructor(i) {
    this.i = i;
    this.xi = xe*i;
    this.xf = this.xi + xe;
    this.f = 0;
  }

  show (){
    stroke(0);
    strokeWeight(4);
    if (this.f > 0) {
      strokeWeight(1);
    }
    else if (this.f < 0) {
      stroke(255,0,0);
      strokeWeight(8);
    }
    line(p[this.i].x+x0,Y,p[this.i+1].x+x0,Y);
  }

  update() {
    let l = p[this.i+1].x - p[this.i].x;
    this.f = l - xe;
  }
}

function setup() {
  createCanvas(400, 200);
  for (let i=0; i<N; i++) {
    p[i] = new Particle(i,16);
    s[i] = new Spring(i);
  }
  p[N] = new Particle(N,16);
  for (let i in p) {
    p[i].x += randomGaussian()*20;
    p[i].v = 0;
  }
  frameRate(10);
}

function draw() {
  background(211);
  stroke(255,0,0);
  line(x0,0,x0,200);
  line(L+x0,0,L+x0,200);
  for (let i in p) { 
    p[i].update();
    if (i<N) {
      s[i].update();
    }
  }
  for (let i in p) { 
    if (i<N) s[i].show();
    p[i].show();  
  }  
}
