var ss = 5,
vmax = 4,
NParticles = 100,
bsize = 600,
cor, 
diam,
mass;

class Particle {
  constructor(){
    this.x = random(0,bsize);
    this.y = random(0,bsize);
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
    if ( this.x > bsize ) {
      this.x = bsize; 
      this.xSpeed*=-1;
    }      
  
    if(this.y < 0 ) {
      this.y = 0;
      this.ySpeed*=-1;
    }  
    if ( this.y > bsize ) {
      this.y = bsize;
      this.ySpeed*=-1;
    }  
  }
  
  collideParticle(i,j) {
    
      let un = [0,0] ;
      let P1 = particles[i];
      let P2 = particles[j];
      let dis = dist(P1.x,P1.y,P2.x,P2.y); 
      let m1 = P1.mass;
      let m2 = P2.mass;
      let M = m1 + m2; 
      if(dis <= (P1.r+P2.r)/2) {

        // vetor tangente  
        let dx = P1.x - P2.x;
        let dy = P1.y - P2.y;
         
        // vetores unitários   
        let unn = sqrt (sq(dx)+sq(dy));
        un[0] = dx/unn;
        un[1] = dy/unn;
        let ut = [-un[1],un[0]];

        // projeções das velocidades 
        let v1n = un[0]*P1.xSpeed + un[1]*P1.ySpeed;
        let v1t = ut[0]*P1.xSpeed + ut[1]*P1.ySpeed;
        let v2n = un[0]*P2.xSpeed + un[1]*P2.ySpeed;
        let v2t = ut[0]*P2.xSpeed + ut[1]*P2.ySpeed;
        // new normal velocities
        // tangential velocities are kept
        let v1nl = ( v1n*(m1 - m2) + 2*m2*v2n )/M;
        let v2nl = ( v2n*(m2 - m1) + 2*m1*v1n )/M;
        
        particles[i].xSpeed = v1nl*un[0] + v1t * ut[0];
        particles[i].ySpeed = v1nl*un[1] + v1t * ut[1];
        particles[j].xSpeed = v2nl*un[0] + v2t * ut[0];
        particles[j].ySpeed = v2nl*un[1] + v2t * ut[1];

        particles[i].x += particles[i].xSpeed ;
        particles[i].y += particles[i].ySpeed ;
        particles[j].x += particles[j].xSpeed ;
        particles[j].y += particles[j].ySpeed ;
    
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
  background( 220 );
  
  diam = 4;
  mass = 1.0;
  frio = color('cyan'); 
  quente = color('red');
  for (let i = 0; i<particles.length; i++) {
    diam = 4;
    mass = 1.0;
    let v = sqrt(sq(particles[i].xSpeed)+sq(particles[i].ySpeed)); 
    cor = lerpColor(frio,quente, v/vmax);
    if ( i < 20 ) {
      mass = 5.0;
      diam = 16;
    }  
    particles[i].createParticle(cor,diam,mass);
    particles[i].moveParticle();
    for (let j = 0; j < particles.length; j++) {
      if ( i != j) { 
        particles[i].collideParticle(i,j);
      }  
    } 
  }  
}
