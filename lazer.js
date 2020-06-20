
class Lazer {

constructor(spos, angle, id) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);
  this.id = id;

}

show() {
  push();
  stroke(255);
  strokeWeight(4);
  point(this.pos.x, this.pos.y);

pop();
}
edge() {
if (this.pos.x > width ){
  // this.pos.x = 0;
    return true;
}
else if (this.pos.x < 0){
  // this.pos.x = width;
    return true;
}
if (this.pos.y > height){
  // this.pos.y = 0;
    return true;
}
else if (this.pos.y < 0){
  // this.pos.y = height
  return true;
}



}
update() {
  this.pos.add(this.vel);
}
hits(asteroid) {
let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
if (d < asteroid.r + 4) {
  return true;
}


}

}
