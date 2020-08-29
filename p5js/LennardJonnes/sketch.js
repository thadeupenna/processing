let dt = 1e-3;
let p;

class Particle {

  constructor(x,d,m,E) {
    this.x = x;
    this.d = d;
    this.E = E;
    this.v = sqrt(2*E/m); 
  }

  update() {
    let f = LJf(this.x);
    this.v += f*dt;
    this.x += this.v*dt;
  }

  show() {
    fill(255,0,255);
    noStroke;
    circle(this.x*80,this.E,this.d);
  } 
}

function LJphi(x) {
  let sigma = 2;
  let e0 = 1;
  return 4*e0*pow(sigma/x,6)*(2*pow(sigma/x,6)-1.); 
}


function LJf(x) {
  sigma = 2;
  let e0 = 100;
  return 24*e0*pow(sigma/x,6)*(2*pow(sigma/x,6)-1.)/x; 
}


function setup() {
  createCanvas(400, 400);
  p = new Particle(3,10,1,0.00002);
}

function draw() {
  background(220);
  p.update();
  p.show();
  let rant=0;
  let fant=400; 
  stroke(255,0,0);
  for (let r=0.1; r<10; r+=0.1) {
    let newr = r*80;
    let newf = 400+200*LJf(r);
    line(rant,fant,newr,newf);  
    rant = newr;
    fant = newf;
    console.log(rant,fant);
  }
  text(p.v,10,10);
  text(LJf(p.x),10,30);
}
