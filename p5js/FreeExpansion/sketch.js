let height = 200;
let width = 600;
let gas = [];
let cor_barreira;


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
    this.x = (this.x + this.vx);
    this.y = (this.y + this.vy);
    if ((this.x >= barrier - this.r/2) || this.x<= this.r/2)  {
      this.vx *= -1;
      this.vx += randomGaussian(0,2);
    }
    if ((this.y >= height - this.r/2) || this.y<= this.r/2) {
      this.vy *= -1;
      this.vy += randomGaussian(0,2);
    }
  }
}

function setup() {
  createCanvas(width, height);
  for(let i=0; i<300; i++) {
    gas[i] = new Particle(200,100,80);
  }
  barrier = width/2;
  cor_barreira = color(255,0,0);
  frameRate(10);
}

function mousePressed() {
  barrier = width;
  cor_barreira.setAlpha(0);
} 

function draw() {
  background(51);

  stroke(cor_barreira);
  line(width/2,0,width/2,height);
  noStroke();
  fill(255,0,0,32);
  for (let p of gas) {
    p.move();
    p.show();
  }
  
}