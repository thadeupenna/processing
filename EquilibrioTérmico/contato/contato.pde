int t;

void setup() 
{
   size(400,400);
   background(255,255,255);
   t=0;
}

void draw() 
{
    
  noStroke();
  fill(255-t,128,128);
  rect(50,50,100,100);
  fill(128,128,255-t);
  rect(150,50,100,100);
  t++;
  if (t>128) {
    t=0;
    noLoop();
  }  
  delay(30);  
}
