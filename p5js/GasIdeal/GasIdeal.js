var ss = 5,
vmax = 5,
NParticles = 40,
bsize = 500,
cor, 
diam,
mass;

class Particle {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.xSpeed = random(-vmax,vmax);
    this.ySpeed = random(-vmax,vmax);
  }

// cria a partícula.
  createParticle(cor, diameter, mass) {
    this.r = diameter;
    this.cor = cor;
    this.mass = mass;
    noStroke();
    fill(this.cor);
    circle(this.x,this.y,this.r);
//    stroke('black');
   // line(this.x,this.y,this.x+this.xSpeed*ss,this.y+this.ySpeed*ss);
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
  
  collideParticle(i,j) {
      let P1 = particles[i];
      let P2 = particles[j];
      let dis = dist(P1.x,P1.y,P2.x,P2.y);
 /*      if(dis <= this.r) {

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
      
   */   
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
    cor = 'black';
    diam = 6;
    mass = 1;
    if (i<10) {
      cor = 'yellow';
      diam = 12;
    }  
    particles[i].createParticle(cor,diam,mass);
    particles[i].moveParticle();
    for (let j = i+1; j < particles.length; j++) {
      particles[i].collideParticle(i,j);
    } 
  }  
  frameRate(60);
}