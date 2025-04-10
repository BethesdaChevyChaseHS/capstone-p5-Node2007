
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
    textFont(codaFontRegular);
    resetGame();
} 
// To reset the game, we set the score to 0, set the game over flag to false, and call the loop function to start the game again.
// The loop function is called repeatedly to update the game state and render the graphics.
function resetGame() {
    score = 0;
    theGameOver = false;
    loop();
}

function draw(){
    background("limegreen");
    

    text("Press 4 to play!", 650, 300);
    textSize(32);
    textAlign("center");
}