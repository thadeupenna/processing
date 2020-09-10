class ParticleinaBox {
  constructor(r, v, d) {
    this.r = r;
    this.v = v;
    this.d = d;
    this.m = sq(this.d);
  }

  show() {
    fill(0);
    strokeWeight(1);
    stroke(0);
    ellipse(this.r.x, this.r.y, this.d, this.d);
  }

  move() {
    strokeWeight(6)
    stroke(255,0,0)
    if (this.r.y >= caixa.bw - this.d) {
      this.v.y *= -eps;
      this.r.y = caixa.bw - this.d - 1 ;
      line(caixa.lw,caixa.bw-4,caixa.rw,caixa.bw-4)
    } else  if  (this.r.y <= caixa.tw + this.d ) {
      this.v.y *= -eps;
      this.r.y = caixa.tw + this.d + 1;
      line(caixa.lw,caixa.tw+4,caixa.rw,caixa.tw+4)
    }  
    if (this.r.x >= caixa.rw - this.d) {
      this.v.x *= -eps;
      this.r.x = caixa.rw - this.d - 1;
      line(caixa.rw-4,caixa.tw,caixa.rw-4,caixa.bw)
    } else if (this.r.x <= caixa.lw + this.d) { 
      this.v.x *= -eps;
      this.r.x = caixa.lw + this.d + 1 ;
      line(caixa.lw+4,caixa.tw,caixa.lw+4,caixa.bw)
    } 
    this.v.y += g;
    this.r.add(this.v);
  }

  collide(p2,width,height) {

    if (p5.Vector.dist(this.r, p2.r) <= (this.d + p2.d)/2 ) {

      let dm = this.m - p2.m;
      let sm = this.m + p2.m;
      let vun = p5.Vector.sub(p2.r, this.r).normalize();
      let ut = createVector(-vun.y, vun.x);

      let v1n = p5.Vector.dot(vun, this.v);
      let v2n = p5.Vector.dot(vun, p2.v);
      let v1t = p5.Vector.dot(ut, this.v);
      let v2t = p5.Vector.dot(ut, p2.v);
      let c1 = ( v1n * dm + v2n *2* p2.m) / sm;
      let c2 = (-v2n * dm + v1n *2* this.m) / sm;
      let v1na = p5.Vector.mult(vun,c1);
      let v2na = p5.Vector.mult(vun,c2);
      let v1ta = p5.Vector.mult(ut,v1t);
      let v2ta = p5.Vector.mult(ut,v2t);
      this.v = p5.Vector.add(v1na, v1ta);
      p2.v = p5.Vector.add(v2na, v2ta);
      this.move();
    }
  }
}


class CubeBox {
  constructor (lw,tw,rw,bw) {
    this.lw = lw;
    this.tw = tw;
    this.rw = rw;
    this.bw = bw;
  }
}