
class Asteroid {

constructor(pos, r, vel) {
if (pos) {
  this.pos = pos.copy();
}
else {
this.pos = createVector(random(width) + 100, random(height) + 100);
}
if (r) {
  this.r = r * 0.4;
}
else {
this.r = floor(random(15, 20));
}
if (vel) {
  this.vel = vel.copy();
}
this.total = random(15, 30);
this.offset = [];
for (let i = 0; i < this.total; i++){
  this.offset[i] = random(5, 25);
}
this.vel = p5.Vector.random2D()
if (random(1) < .25) {
  this.vel.mult(random(2,3))
};
}

show() {
  push();
  noFill();
  stroke(255);
  translate(this.pos.x, this.pos.y);
  beginShape();
    for (let i = 0; i < this.total; i++){
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let r = this.r + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
pop();
}

break() {
let newA = [];
for (let i = floor(random(2, 3)); i >= 0; i--){
newA[i] = new Asteroid(this.pos, this.r);
}
return newA;

}

update() {
  this.pos.add(this.vel)
}

edge() {
if (this.pos.x > width + this.r){
  this.pos.x = -this.r;
}
else if (this.pos.x < -this.r){
  this.pos.x = width + this.r;
}
if (this.pos.y > height + this.r){
  this.pos.y = -this.r;
}
else if (this.pos.y < -this.r){
  this.pos.y = height + this.r;
}



}
}
