let p = [];
let width = 400;
let height = 400;
let N = 95;

  
function setup() {  
  createCanvas(width, height);
  for (let b = 0; b < N; b++) {
    let x1 = random(20,width-30);
    let y1 = random(20,height-30);
    let r = createVector(x1,y1);
    
    // for (let i = b -1; i>=0 ; i--) {
    p[b] = new ParticleinaBox(r,5);
    // }   
  }
  frameRate(45);
}

function draw() {
  background(200);
  for (let i=0; i<N; i++) {
    for(j=i+1; j<N; j++) {
     p[i].collide(p[j],width,height);
    }
    p[i].move(width,height);
    p[i].show();
  }
}