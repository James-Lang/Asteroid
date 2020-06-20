function normalizeFitness(s) {
  // Make score exponentially better?
  for (let i = 0; i < s.length; i++) {
    s[i].score = pow(s[i].score, 3);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    sum += s[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < s.length; i++) {
    s[i].fitness = s[i].score / sum;
  }
}


function nextGeneration() {
  // resetGame();
  // Normalize the fitness values 0-1
  normalizeFitness(allShips);
  // Generate a new set of birds
  activeShips = generate(allShips);
  // Copy those birds to another array
  allShips = activeShips.slice();

  // console.log(allSnakes);
}

function generate(oldShips) {
  let newShips = [];
  for (let i = 0; i < oldShips.length; i++) {
    // Select a bird based on fitness
    let ship = poolSelection(oldShips);

    newShips[i] = ship;
  }
  return newShips;
}


function poolSelection(ships) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= ships[index].fitness;
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;
//
  // Make sure it's a copy!
  // (this includes mutation)
    // console.log (snakes.length);
  // noLoop();
  if (getShip == true){
  saveJSON(ships[index].brain, 'myShip')


  // console.log (snakes);
  getShip = false;}

  // console.log(snakes[index].len)
  return ships[index].copy();
  // console.log(snakes[index])
}
