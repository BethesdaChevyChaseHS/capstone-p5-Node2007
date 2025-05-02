
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
    //floor = new Floor();
    console.log("Debug console setup complete");
    load();
    // Create a new character object at the floor level
    //floor = new Floor();
    textFont(codaFontRegular);
    resetGame();
} 
// To reset the game, we set the score to 0, set the game over flag to false, and call the loop function to start the game again.
// The loop function is called repeatedly to update the game state and render the graphics.
function resetGame() {
    score = 0;
    theGameOver = false;
    //character = new Character(floor.y);
    //obstacles = [new Obstacle(width, floor.y)];
    loop();
}

function draw(){
    console.log("drawing");
    background(255,0,0);
    text("Press p to play!", 650, 300);
    textSize(35);
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
    // The condition checks if the right edge of the obstacle is less than 0, which means it has moved out of the screen
    // If this condition is true, we remove the obstacle from the array using splice
    // The splice method removes the element at index i from the obstacles array
    // The loop iterates from the end of the array to the beginning to avoid skipping elements when removing them
    if (obstacles[i].getRight() < 0) {
        obstacles.splice(i, 1);
    }
    // Increment the score if the character has passed an obstacle
    // The condition checks if the obstacle has not scored yet and if the right edge of the obstacle is less than the x-coordinate of the character
    // If both conditions are true, it means the character has passed the obstacle, so we increment the score and set hasScoredYet to true
    // The hasScoredYet property is used to ensure that the score is only incremented once for each obstacle
    // The score is incremented by 1, and a message is logged to the console
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
// The drawScore function is responsible for displaying the score on the screen
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
// The keyPressed function is called whenever a key is pressed
// It checks for specific key presses and performs actions based on them
function keyPressed() { 
    if (key == 'p' && character.isOnFloor()) { // p key to play
        character.jump();
    }

    //check for special states like when the game is over or when the game has not started yet
    if (theGameOver == true && key == 'p') {
        resetGame();
    }
    //
    else if(haveGameBegun == false && key == 'p') {
        haveGameBegun = true;
        loop();
    }
}
// The floor class is a subclass of the Shape class
// It represents the ground in the game and is responsible for drawing the floor on the screen
// The constructor initializes the floor's position and dimensions
// The y-coordinate of the floor is set to 80% of the canvas height, and the height of the floor is calculated accordingly
// The fill color of the floor is set to a specific color
class Floor extends Shape {
    constructor() {
        let yFloor = height * 0.8;
        let floorHeight = ceil(height - yFloor);
        super(0, yFloor, width, floorHeight);
        this.fillColor = color(130);
    }
    draw() {
        push();
        noStroke();
        fill(this.fillColor);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }
}
