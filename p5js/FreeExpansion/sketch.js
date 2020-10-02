let height = 200;
let width = 600;
let gas = [];
let cor_barreira;
let barrier;


class Particle {
  constructor(x,y,r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.m = r**2;
    this.vx = random(-4,4);
    this.vy = random(-4,4);
  }
  
  show() {
    circle(this.x, this.y, this.r);
  }
  
  move() {
    let x0, xm;

    this.x = (this.x + this.vx);
    this.y = (this.y + this.vy);
    
    if (this.x > barrier) {
      x0 = barrier;         
      xm = width;
    }
    else {
      x0 = 0; 
      xm = barrier;
    }

    if (this.x >= xm - this.r/2) {
      this.vx *= -1;
      this.x = xm - this.r/2
    }  
    if (this.x<= x0 + this.r/2)  {
      this.vx *= -1;
      this.x = x0 + this.r/2
    }
    if ((this.y >= height - this.r/2) || this.y<= this.r/2) {
      this.vy *= -1;
    }
  }
}

function Initia() {
  for(let i=0; i<500; i++) {
    gas[i] = new Particle(200,100,80);
  }
}

function setup() {
  createCanvas(width, height);
  
  barrier = width/2;
  cor_barreira = color(255,255,0);
  let btnClose = createButton("Fecha");
  btnClose.mousePressed(Fecha);

  let btnOpen = createButton("Abre");
  btnOpen.mousePressed(Libera);

  let btnReset = createButton("Inicia");
  btnReset.mousePressed(Initia);
  Initia();
  frameRate(40);
}

function Libera() {
  barrier = width;
  cor_barreira.setAlpha(0);
} 

function Fecha() {
  barrier = width/2;
  cor_barreira.setAlpha(255);
} 

function draw() {
  background(51);

  stroke(cor_barreira);
  strokeWeight(4)
  line(width/2,0,width/2,height);
  noStroke();
  fill(255,0,0,32);
  for (let p of gas) {
    p.move();
    p.show();
  }
}