
let character;
let obstacles;
let floor;

let theGameOver = false;
let haveGameBegun = false;
let score = 0;
let codaFontRegular;

let minDistanceBetweenObstacles = 100;
let nextReappearDistance;
let isUnstoppable = false;

function load() {
    codaFontRegular = loadFont("./Coda-Regular.ttf");
}
// The setup function is called once when the program starts. It initializes the canvas size, sets up the debug console, and loads the font.
function setup() {
    createCanvas(1350, 700);
    setupDebugConsole();
    console.log("Debug console setup complete");
    load();
    // Create a new character object at the floor level
    floor = new Floor();
    textFont(codaFontRegular);
    resetGame();
} 
// To reset the game, we set the score to 0, set the game over flag to false, and call the loop function to start the game again.
// The loop function is called repeatedly to update the game state and render the graphics.
function resetGame() {
    score = 0;
    theGameOver = false;
    character = new Character(floor.y);
    obstacles = [new Obstacle(width, floor.y)];
    loop();
}

function draw(){
    background(255);
    text("Press 4 to play!", 650, 300);
    textSize(32);
    textAlign("center");
    // loop through all the obstacles in the array and call the update function and draw function for each obstacle
    for (let i = obstacles.length-1; i>= 0; i++) {
        obstacles[i].update();
        obstacles[i].draw();
    }
    //if we hit the obstacle, end the game
    if (isUnstoppable != true && obstacles[i].checkCollision(character)) {
        theGameOver = true;
        noLoop(); // stop the game loop since the game is over
    }
    //remove obstacles that are moving out of the screen
    if (obstacles[i].getRight() < 0) {
        obstacles.splice(i, 1);
    }
    // Increment the score if the character has passed an obstacle
    // The condition checks if the obstacle has not scored yet and if the right edge of the obstacle is less than the x-coordinate of the character
    // If both conditions are true, it means the character has passed the obstacle, so we increment the score and set hasScoredYet to true
    // The hasScoredYet property is used to ensure that the score is only incremented once for each obstacle
    if (obstacles[i].hasScoredYet == false && obstacles[i].getRight() < character.x) {
        obstacles[i].hasScoredYet = true;
        score++;
        console.log("Score: " + score);
    }
    // Updates the state of the character object
    character.update(floor.y);
    // The floor.y is the y-coordinate of the floor, which is used to update the character's position and makes sure the character interacts correctly with the floor
    character.draw();
    obstacles.draw();
    drawScore();
}

function drawScore() {
    fill(0);
    textSize(32);
    textAlign(LEFT);
    text("Score: " + score, 10, 30);

    if (theGameOver) {
        //dark overlay
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);
        //game over text
        textSize(34);
        textAlign(CENTER);
        fill(255, 0, 0);
        text("GAME OVER", width / 2, height / 2);
        //Play again text
        textSize(32);
        text("Press p to play again!", width / 2, height / 2 + 50);
    }
    // If we are here, the game has not started yet for the first time
    else if (haveGameBegun == false) {
        //dark overlay
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);
        //draw game over text
        textSize(34);
        textAlign(CENTER);
        fill(255, 0, 0);
        text("Press p to play!", width / 2, height / 2);
    }
}