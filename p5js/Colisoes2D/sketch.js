let p = [],
    width = 350,
    height = 350,
    N,
    g = 0.01,
    eps, esl, Nsl,
    v0, 
    nCollisions;
  
function initCond() {
  let v = createVector(random(-v0,v0), random(-v0,v0))
  let x1 = random(5,width-5);
  let y1 = random(5,height-5);
  let r1 = createVector(x1,y1);
  N = Nsl.value();
  p[0] = new ParticleinaBox(r1, v, 6);
  let juntos = false;
  for (let b = 1; b < N; b++) {
    do {
      juntos = false;
      x1 = random(5,width-5);
      y1 = random(5,height-5);
      r1 = createVector(x1,y1);
      for (let i = 0 ; i < b ; i++) {
        if (p5.Vector.dist(r1,p[i].r) < 12)  {
          juntos = true;
          break;
        }  
      }
    } while (juntos == true );  
    v = createVector(random(-v0,v0), random(-v0,v0));
    p[b] = new ParticleinaBox(r1, v, 6);
  }
  caixa = new CubeBox(0,0,width,height)
  loop();
//  frameRate(45);
}

function setup() {
  v0 = 6;
  let canvas = createCanvas(width, height);
  Nsl = createSlider(10,100,50).parent("sliderN");
  gsl = createSlider(0,10,0).parent("sliderg");
  esl = createSlider(0,10,10).parent("slidereps");
  Nsl.input(initCond);
  initCond();
  noLoop();
  createP('');
  let btnStart = createButton("Início");
  btnStart.mousePressed(initCond);

  let btnReset = createButton("Parar");
  btnReset.mousePressed(noLoop);

}

function draw() {
  background(200);
  nCollisions = 0;
  eps = esl.value()/10.;
  g = gsl.value()/100;
  stroke('black');
  textFont('Verdana');
  textSize(18);
  text('N = '+N, 20, 30 );
  text('ϵ = '+eps, 20, 50 );
  text('g = '+nfc(g*10,2), 20, 70 );
  for (let i=0; i<N; i++) {
    for(j=0; j<N; j++) {
      if (i != j) p[i].collide(p[j]);
    }
    p[i].move();
    p[i].show();
  }
}