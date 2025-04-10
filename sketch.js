
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

function setup() {
    createCanvas(1350, 700);
    setupDebugConsole();
    console.log("Debug console setup complete");
    load();
    textFont(codaFontRegular);
    resetGame();
} 

function resetGame() {
    score = 0;
    theGameOver = false;
    loop();
}

function draw(){
    background("limegreen");
    text("Hello World", 650, 300);
    textSize(32);
    textAlign("center");
}