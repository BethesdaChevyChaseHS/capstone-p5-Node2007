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

function preload() {
    sgImage = loadImage("Scenery.jpeg"); // Ensure the file exists in the correct path
}

function load() {
    codaFontRegular = loadFont("./Coda-Regular.ttf");
}
// The setup function is called once when the program starts. It initializes the canvas size, sets up the debug console, and loads the font.
function setup() {
    createCanvas(1350, 700);
    floor = new Floor(); // Ensure this is initialized before referencing floor.y
    console.log("Debug console setup complete");
    load();
    // Create a new character object at the floor level
    //floor = new Floor();
    textFont(codaFontRegular);
    obstacles = [new Obstacle(width, floor.y)];
    character = new Character(floor.y);
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
    image(sgImage, 0, 0, width, height);
    text("Press p to play!", 650, 300);
    textSize(35);
    textAlign("center");

    // loop through all the obstacles in the array and call the update function and draw function for each obstacle
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].update();
        obstacles[i].draw();

        // Check for collision
        // The checkCollision function checks if the character collides with any of the obstacles
        // If the character collides with an obstacle and the game is not in unstoppable mode, set the game over flag to true
        if (isUnstoppable != true && obstacles[i].checkCollision(character)) {
            theGameOver = true;
            noLoop(); // Stop the game loop since the game is over
        }

        // Remove obstacles that are moving out of the screen
        // The getRight function returns the rightmost x-coordinate of the obstacle
        // If the rightmost x-coordinate of the obstacle is less than 0, it means the obstacle is out of the screen
        if (obstacles[i].getRight() < 0) {
            obstacles.splice(i, 1);
        }

        // Increment the score if the character has passed an obstacle
        // The hasScoredYet variable is used to check if the character has already scored for this obstacle
        // If the character's x-coordinate is greater than the rightmost x-coordinate of the obstacle, it means the character has passed the obstacle
        // If the character has not scored yet for this obstacle, set the hasScoredYet variable to true and increment the score
        if (!obstacles[i].hasScoredYet && obstacles[i].getRight() < character.x) {
            obstacles[i].hasScoredYet = true;
            score++;
            console.log("Score: " + score);
        }
    }

    // Updates the state of the character object
    character.update(floor.y);
    // The floor.y is the y-coordinate of the floor, which is used to update the character's position and makes sure the character interacts correctly with the floor
    character.draw();
    drawScore();
}
// The drawScore function is responsible for displaying the score on the screen
function drawScore() {
    fill(0);
    textSize(32);
    textAlign(LEFT);
    text("Score: " + score, 10, 30);

    // If the game is over, display the game over message and the score
    // The condition checks if the game is over and if the score is greater than 0
    // If both conditions are true, it means the game is over, and we display the game over message
    // The text is displayed in the center of the screen, and the fill color is set to red
    if (theGameOver) {
        //dark overlay
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);
        //Game Over text
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
        // Dark overlay
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);
        // Draw "Press p to play!" text
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
    // The draw function is responsible for drawing the character on the screen
    // It uses the push and pop functions to save and restore the drawing state
    draw() {
        // Draw the floor as a rectangle
        push();
        noStroke();
        fill(this.fillColor);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }
}
class Obstacle extends Shape {
    constructor(x, yGround) {
        let obstacleWidth = random(50, 100);
        let obstacleHeight = random(50, 100);
        let y = yGround - obstacleHeight;
        super(x, y, obstacleWidth, obstacleHeight);
        this.fillColor = color(130, 0, 0);
        this.speed = 10;
        this.hasScoredYet = false;
    }
    update() {
        this.x -= this.speed;
    }
    checkCollision(shape) {
        return this.overlaps(shape);
    }
    // The draw function is responsible for drawing the character on the screen
    // It uses the push and pop functions to save and restore the drawing state
    draw() {
        // Draw the obstacle as a rectangle
        push();
        noStroke();
        fill(this.fillColor);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }
}
    class Character extends Shape {
        constructor(yGround) {
            let characterWidth = 50;
            let characterHeight = 50;
            let y = yGround - characterHeight;
            super(100, y, characterWidth, characterHeight);
            this.fillColor = color(0, 0, 255);
            this.speed = 5;
            this.jumpSpeed = -15;
            this.gravity = 0.5;
            this.velocityY = 0;
            this.yGround = yGround;
            this.jumpStrength = 15; // Add this to the constructorth = 15; // Add this to the constructor
        }
        update(yGround) {
            this.velocityY += this.gravity;
            this.velocityY *= 0.9; // Apply some damping to the vertical velocity
            this.y += this.velocityY;

            if (this.y + this.height > yGround) {
                this.y = this.yGround - this.height;
                this.velocityY = 0; // Reset velocity only when hitting the ground
            }
        }
        // The jump function is called when the character jumps
        // It sets the vertical velocity of the character to a negative value, making it move upwards
        // The jumpStrength variable determines how high the character jumps
        jump() {
            this.velocityY += -this.jumpStrength;
        }
        // Removed misplaced if block
        // The isOnFloor function checks if the character is on the floor
        // It compares the y-coordinate of the character with the y-coordinate of the floor
        // If the character's y-coordinate is greater than or equal to the floor's y-coordinate minus the character's height, it means the character is on the floor
            isOnFloor() {
                return this.y >= floor.y - this.height;
            }
            // The draw function is responsible for drawing the character on the screen
            // It uses the push and pop functions to save and restore the drawing state
            draw() {
                // Draw the character as a rectangle
                push();
                noStroke();
                fill(this.fillColor);
                rect(this.x, this.y, this.width, this.height);
                pop();
            }
        }
class Shape {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    overlaps(other) {
        return !(this.x + this.width < other.x ||
                 this.x > other.x + other.width ||
                 this.y + this.height < other.y ||
                 this.y > other.y + other.height);
    }

    getRight() {
        return this.x + this.width;
    }
}

