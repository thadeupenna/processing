let dt = 1e-2;
let p;
let whiteBoard;
let xr = 100;
let yr = 200;
let r0 = 0;
let v0 = 0;
let sigma = 1;
let e0 = 1;
let rmin = 0.9,rmax = 2.5;
let ymax= 0.05, ymin = -1.1, Emin = -1;

class Particle {
  constructor(x,d,m,E) {
    this.x = x;
    this.d = d;
    this.E = E;
    this.m = m;
    this.v = sqrt(2*(this.E-Emin)/m); 
  }

  update() {
    let f = LJf(this.x);
    this.v += f*dt;
    this.x += this.v*dt;
  }

  show() {
    fill(255,0,255);
    noStroke();
    let xp = map(this.x,rmin,rmax,0,400);
    let yp = map(this.E,ymax,ymin,0,400);
    circle(xp,yp,this.d);
  } 
}

function LJphi(x) {
  return 4*e0*pow(sigma/x,6)*(pow(sigma/x,6)-1.); 
}

function LJf(x) {
  return 24*e0*pow(sigma/x,6)*(2*pow(sigma/x,6)-1.)/x; 
}

function mudaEnergia() {
  p.E = map(Esl.value(),0,10,v0,-0.1);
  p.v = sqrt(2*(p.E-Emin)/p.m);
  p.x = r0;
  p.update();
}

function setup() {
  createCanvas(400, 400);
  whiteBoard = createGraphics(400,400);
  whiteBoard.clear();
  desenhaLJp();
  createP('Energia');
  Esl = createSlider(0,10,0);
  Esl.input(mudaEnergia);
  E = map(Esl.value(),0,10,v0,-0.1);
  p = new Particle(r0, 10, 1, E);
}

function desenhaLJp() {
  let x0 =0;
  let y0 =0;
  let zero = map(0,ymax,ymin,0,400);
  whiteBoard.strokeWeight(1);
  whiteBoard.stroke(0);
  whiteBoard.line(0,zero,width,zero);
  whiteBoard.strokeWeight(4);
  whiteBoard.stroke(255,0,0);
  for (let x=rmin; x<rmax; x+=0.01) {
    let phi = LJphi(x);
    let xp=map(x,rmin,rmax,0,400);
    let yp=map(phi,ymax,ymin,0,400);
    whiteBoard.line(x0,y0,xp,yp);  
    x0 = xp;
    y0 = yp;
    if (phi < v0) {
      v0 = phi;
      r0 = x;  
    }
  }
  whiteBoard.stroke(0);
  whiteBoard.strokeWeight(1);
  let x0p = map(r0,rmin,rmax,0,400);
  whiteBoard.line(x0p,0,x0p,400);
}

function draw() {
  background(255);
  image(whiteBoard,0,0);
  p.update();
  p.show();
}