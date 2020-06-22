function mutater(x) {
          // console.log('yes');
  if (random(1) < mutationRate) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
        // console.log('yess');
  }
  else {
    return x;
    // console.log('sss');
  }
}

class Ship {
constructor(brain) {
this.pos = createVector(width/2, height/2);
this.r = 20;
this.heading = 0;
this.rotation = 0;
this.vel = createVector(0, 0);
this.isBoosting = false;
this.reloadTime = 20;
this.reloadTimer = 0;
this.id = random(10);
this.score = 0;
this.shots = 0;
if (brain instanceof NeuralNetwork) {
  // console.log('copied');
  this.brain = brain.copy();
  this.brain.mutate(mutater);
  // this.brain.mutate(mutater);
  // this.brain.mutate(mutater);
  // console.log('copied brain');

} else {

  this.brain = new NeuralNetwork(14, 28, 5);
}
}

hits(asteroid) {
let dis = []
dis[0] = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
dis[1] = dist(this.pos.x + this.r, this.pos.y + this.r, asteroid.pos.x, asteroid.pos.y);
dis[0] = dist(this.pos.x - this.r, this.pos.y, asteroid.pos.x, asteroid.pos.y);
dis[0] = dist(this.pos.x, this.pos.y - this.r, asteroid.pos.x, asteroid.pos.y);
if (min(dis) < this.r + asteroid.r) {
  return true;
}


}

think(asteroid) {
  let diff = [];
  let closest = null;
  let record = Infinity;
  for (let i = asteroid.length - 1; i >= 0; i--){
diff[0] = dist(-this.r + this.pos.x, this.r + this.pos.y, asteroid[i].pos.x, asteroid[i].pos.y);
diff[1] = dist(this.pos.x,this.pos.y - this.r, asteroid[i].pos.x, asteroid[i].pos.y);
diff[2] = dist(this.r + this.pos.x, this.r + this.pos.y, asteroid[i].pos.x, asteroid[i].pos.y);
diff[3] = dist(this.r, this.r, asteroid[i].pos.x, asteroid[i].pos.y);
if (max(diff) < record) {
  record = max(diff);
  closest = asteroid[i]
}
  }
  if (closest != null){
  let x = this.pos.x;
  let y = this.pos.y;
  let xr = this.pos.x + this.r;
  let lxr = this.pos.x -this.r;
  let yr = this.pos.y - this.r;
  let inputs = [];
  let head = this.heading;
  let rote = this.rotation;
  let velX = this.vel.x;
  let velY = this.vel.y;
  let moving = this.isBoosting;
  let asteroidX = closest.pos.x;
  let asteroidY = closest.pos.y;
  let asteroidXvel = closest.vel.x
  let asteroidYvel = closest.vel.y


  inputs[0] = x;
  inputs[1] = y;
  inputs[2] = asteroidX;
  inputs[3] = asteroidY;
  inputs[4] = xr;
  inputs[5] = yr;
  inputs[6] = lxr;
  inputs[7] = this.heading;
  inputs[8] = velX;
  inputs[9] = velY;
  inputs[10] = asteroidXvel
  inputs[11] = asteroidYvel
  inputs[12] = rote;
  inputs[13] = this.shots
  let action = this.brain.predict(inputs);
  // console.log(action);
  if (action[0] > 0.8) {
    this.shoot();
  }
  if (action[1] > action[2] + action[3]){
    this.setRotation(0.10)

  }
  else if (action[2] > action[1] + action[3]) {
    this.setRotation(-0.10);

  }
  else  {
    this.setRotation(0);
    // this.score++

  }
  if (action[4] > 0.8) {
    this.isBoosting = true;
    // this.score += 0.1;
  }
  else {
    this.isBoosting = false;
  }

}
}


copy() {
return new Ship(this.brain);
}




update(reward) {
  //this.score += reward;
  if (this.reloadTimer > 0) {
    this.reloadTimer--;
  }
  if (this.isBoosting){
    // this.score += 2;
    this.boost();
  }
  this.pos.add(this.vel);
  this.vel.mult(0.3);
}

boosting(b) {
this.isBoosting = b;
}

boost() {
  let force = p5.Vector.fromAngle(this.heading);
  force.mult(0.95);
  this.vel.add(force);
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

shoot(){
  if (this.reloadTimer == 0){
  lazers.push(new Lazer(this.pos, this.heading, this.id));
  this.reloadTimer = this.reloadTime;
}
}



show() {
  push();
  translate(this.pos.x, this.pos.y);
  rotate(this.heading + PI / 2);
  fill('green');
  // stroke(255);
  triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  pop();
  // push();
  // translate(this.pos.x, this.pos.y);
  //   rotate(this.heading + PI / 2);
  // fill(255);
  // stroke(255);
  // strokeWeight(10);
  // point(- this.r, this.r)
  // point(this.r, this.r)
  // pop();
}


turn(angle) {
this.heading += this.rotation;
}


setRotation(a) {
this.rotation = a;
}


}
