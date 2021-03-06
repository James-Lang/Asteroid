let totalShips = 10;
let asteroids = [];
let lazers = [];
let totalAsteroids = 5;
let maxAsteroids = 5;
let fleet = [];
let activeShips = [];
let allShips = [];
let ship;
let getShip = false;
let cycles = 1;
let shows = false;
let generations = 0;
let brainJSON;
let shipey;
let highestScore = 0;
let options = false;
let toggle = '+'
let cookie = 1;
let penalty = 0.95;
let spann = 10;
let mutationRate = 0.5;

function preload() {
  // brainJSON = loadJSON('myship.json');
}

function newGame() {
  allShips = []
  for (let i = 0; i < totalShips; i++){
  // let ship = new Ship(shipey);
  let ship = new Ship();
  activeShips[i] = ship;
  allShips[i] = ship;
  }
  for (let i = 0; i < totalAsteroids; i++){
    if (totalAsteroids < maxAsteroids){
  asteroids.push(new Asteroid());
  }
  }

}



function setup() {
  // shipey = NeuralNetwork.deserialize(brainJSON);
createCanvas(1200, 1200);
newGame();
speedSlider = createSlider(1, 100, 1);
speedSlider.position(45, 20);
speedSlider.style('width', '150px');

astSlider = createSlider(5, 20, 5);
astSlider.position(45, 185);
astSlider.style('width', '150px');

cookieSlider = createSlider(1, 100, 1);
cookieSlider.position(45, 250);
cookieSlider.style('width', '150px');

shipSlider = createSlider(1, 50, 15);
shipSlider.position(45, 300);
shipSlider.style('width', '150px');

penSlider = createSlider(1, 99, 95);
penSlider.position(45, 350);
penSlider.style('width', '150px');

spanSlider = createSlider(1, 100, 1);
spanSlider.position(45, 400);
spanSlider.style('width', '150px');

mutSlider = createSlider(1, 10, 5);
mutSlider.position(45, 450);
mutSlider.style('width', '150px');

optButton = createButton(toggle);
optButton.position(10, 10);
optButton.mouseClicked(toggleOpt);
}
function toggleOpt() {
  if (options == false) {
    options = true
  }
  else {
    options = false
  }
}

function resetGame() {
  generations++;
  asteroids = [];
  if (generations % 500 == 0 && totalAsteroids != maxAsteroids) {
    totalAsteroids++;
  }
  for (let i = 0; i < totalAsteroids; i++){
  asteroids.push(new Asteroid());
  }
  nextGeneration();
if (totalShips != activeShips.length) {
  newGame();
  highestScore = 0;
  generations = 0;
}
}

function draw() {
background(0);
if (options == true){
  speedSlider.show();
  astSlider.show();
  cookieSlider.show();
  shipSlider.show();
  penSlider.show();
  spanSlider.show();
  mutSlider.show();
push()
fill('white')
textSize(30)
text('Speed: ' + cycles, 200, 40)
text('Generation: ' + generations, 40, 80)
text('Alive: ' + activeShips.length, 40, 120)
text('BestScore: ' + round(highestScore,3), 40, 160)
text('Total Asteroids: ' + totalAsteroids, 200, 200)
text('Reward for shooting: ' + cookie, 200, 260)
text('Total Ships (resets game): ' + totalShips, 200, 315)
text('Penalty for Missing (lower is worse): ' + penalty, 200, 365)
text('reward for surviving: ' + spann, 200, 410)
text('mutation Rate: ' + mutationRate, 200, 465)
pop()
}
else {
  speedSlider.hide();
  astSlider.hide();
  cookieSlider.hide();
  shipSlider.hide();
  penSlider.hide();
  spanSlider.hide();
  mutSlider.hide();
}
let speed = speedSlider.value();
totalAsteroids = astSlider.value();
maxAsteroids = astSlider.value();
cookie = cookieSlider.value();
totalShips = shipSlider.value();
cycles = speed;
penalty = penSlider.value()/100;
spann = spanSlider.value()/1000
mutationRate = mutSlider.value()/10;
if (asteroids.length == 0){
  for (let i = 0; i < totalAsteroids; i++){
  asteroids.push(new Asteroid());
}
}
for (let n = 0; n < cycles; n++){
for (let i = asteroids.length - 1; i >= 0; i--){
  asteroids[i].edge();
  asteroids[i].update();
}

for (let i = lazers.length - 1; i >= 0; i--){
  lazers[i].update();
if (lazers[i].edge()){
  for (let j = activeShips.length - 1; j >= 0; j--){
    if (activeShips[j] && activeShips[j].id == lazers[i].id) {
      activeShips[j].score = activeShips[j].score * penalty;
    }
  }
  lazers.splice(i, 1);
  break;
}
else {
  for (let j = asteroids.length - 1; j >= 0; j--){
    if (lazers[i].hits(asteroids[j])){
      for (let k = activeShips.length - 1; k >= 0; k--){
        if (lazers[i].id == activeShips[k].id) {
          activeShips[k].score += cookie;
          activeShips[k].shots++;
          if (activeShips[k].score > highestScore) {
            highestScore = activeShips[k].score
          }

          activeShips[k].fuel += 50;

        }
      }
      if (asteroids[j].r > 10 ){
      let newAsteroids = asteroids[j].break();
      asteroids = asteroids.concat(newAsteroids);
    }
      asteroids.splice(j, 1);
      lazers.splice(i, 1);
      break;
    }
  }
  }
}
if (activeShips.length <= 1) {
  resetGame();
}
for (let i = activeShips.length - 1; i >= 0; i--){
activeShips[i].turn();
activeShips[i].edge();
activeShips[i].update(spann);
if (asteroids[0]){
activeShips[i].think(asteroids);
}
for (let j = asteroids.length - 1; j >= 0; j--) {
  if (activeShips[i] && activeShips[i].hits(asteroids[j])) {
    activeShips[i].score *= 0.05;
    activeShips.splice(i, 1);
  }
}
if (activeShips[i] && activeShips[i].fuel <= 0) {
  activeShips.splice(i, 1);
}
}
}
if (shows == false){
  for (let ships of activeShips) {
    ships.show();
  }
  for (let asteroid of asteroids){
    asteroid.show();
  }
  for (let lazer of lazers){
    lazer.show();
  }
}
// else if (activeShips[0]){
//   activeShips[0].show();
//   for (let asteroid of asteroids){
//     asteroid.show();
//   }
//
//   for (let i = lazers; i >= 0; i--){
//
//     if (lazers[0]){
//   if (lazers[i].id == activeShips[0].id){
//     lazers[i].show();
//   }
// }
//   }
//
// }

}


function keyPressed() {

if (keyCode === UP_ARROW) {
// resetGame();
}


else if (keyCode === DOWN_ARROW) {
//Down
}
else if (keyCode === LEFT_ARROW) {
//left
}
else if (keyCode === RIGHT_ARROW) {
//Right
}
else if (key == ' ') {
  if (shows == true){
    shows = false;
  }
    else {shows = true;}
}
}
