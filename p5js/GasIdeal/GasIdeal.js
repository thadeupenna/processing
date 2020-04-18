var ss = 0;
var vmax = 2;
var NParticles = 40;
var bsize =600;
var diameter = 10;

class Particle {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = diameter;
    this.xSpeed = random(-vmax,vmax);
    this.ySpeed = random(-vmax,vmax);
  }

// cria a partícula.
  createParticle() {
    noStroke();
    fill('red');
    circle(this.x,this.y,this.r);
    stroke('black');
    line(this.x,this.y,this.x+this.xSpeed*ss,this.y+this.ySpeed*ss);
  }
  
  moveParticle() {
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
    if(this.x < 0 ) {
      this.x = 0; 
      this.xSpeed*=-1;
    }  
    if ( this.x > width ) {
      this.x = width; 
      this.xSpeed*=-1;
    }      
  
    if(this.y < 0 ) {
      this.y = 0;
      this.ySpeed*=-1;
    }  
    if ( this.y > height ) {
      this.y = height;
      this.ySpeed*=-1;
    }  
  }
  
  collideParticle(otherparticle) {
      let dis = dist(this.x,this.y,otherparticle.x,otherparticle.y);
      if(dis <= this.r) {

        let dx = this.x - otherparticle.x;
        let dy = this.y - otherparticle.y;
        
        let tangent = atan2(dy, dx);
        
        let angle = 0.5 * PI + tangent
        this.x += sin(angle)
        this.y -= cos(angle)
        otherparticle.x -= sin(angle)
        otherparticle.y += cos(angle)
        
        
        let v1speed = sqrt(sq(this.xSpeed) + sq(this.ySpeed));
        let v2speed = sqrt(sq(otherparticle.xSpeed) +         sq(otherparticle.ySpeed));
        let v1angle = 2*tangent - this.ySpeed/this.xSpeed; 
        let v2angle = 2*tangent - otherparticle.ySpeed/otherparticle.xSpeed;
        let tmp = v1speed;
        v1speed = v2speed;
        v2speed = tmp;
        this.xSpeed=v1speed * cos(v1angle);
        this.ySpeed=v1speed * sin(v1angle);
        otherparticle.xSpeed=v2speed * cos(v2angle);
        otherparticle.ySpeed=v2speed * sin(v2angle);
        

        
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        otherparticle.x += otherparticle.xSpeed;
        otherparticle.y += otherparticle.ySpeed;
      } 
  } 
    
}


let particles = [];

function setup() {
  createCanvas(bsize,bsize);
  for ( let i = 0; i<NParticles; i++) {
    particles.push(new Particle());
  }  
}


function draw() {
  background( color('silver') );
  
  for (let i = 0; i<particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    for (let j = i+1; j < particles.length; j++) {
      particles[i].collideParticle(particles[j]);
    } 
  }  
}
