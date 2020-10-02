let width = 400
let height = 400
let N 

function setup() {
  let canvas = createCanvas(width, height);
  createP('');
  Nsl = createSlider(2,35,2).parent("sliderN");
}

function fact(num) {
  let prod = 1;

  for (let k=1; k<=num; k++) prod *=  k;
  return prod;
}

function omega(n) {
  return fact(N)/(fact(n)*fact(N-n));
}

function draw(){
  background(220);
  stroke('blue');
  N = Nsl.value();
  strokeWeight(4);
  let ymax = omega(parseInt(N/2));
  for (let n=0; n<=N/2; n++ ) {
    let dx = width/(N+2);
    let alt = omega(n)/ymax*0.8*height;
    line(dx*(1+n),height,dx*(1+n),height-alt)
    line(dx*(1+(N-n)),height,dx*(1+(N-n)),height-alt)
  }
  textFont('Sniglet');
  textSize(20);
  strokeWeight(1);
  text('N = '+N, 20, 30 );
  text('Max = '+nfc(ymax,0), 20, 50 );
}
