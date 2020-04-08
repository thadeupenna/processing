int t;
float t1=255;
float t2=0;
float dt;
float f;

void setup() 
{
   size(400,400);
   background(255,255,255);
   t=0;
   dt=t1-t2;
}

void draw() 
{
  
  noStroke();
  fill(t1,128,128);
  rect(50,50,100,100);
  fill(128,128,255-t2);
  rect(150,50,100,100);
  t++;
  dt = t1 -t2;
  dt = dt*0.05;
  t1 -= dt ;
  t2 += dt;
  println("t:" + t + " t0 "+ t1 + " t1 " + t2 + " dt " + dt);
  if (dt < 1e-2 ) {
    noLoop();
  }
  delay(300);
}
