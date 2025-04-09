
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

function setup() {
    createCanvas(600, 800);
    setupDebugConsole();
    codaFontRegular = loadFont('Coda-Regular.ttf');
} 

function draw(){
    background("green");
    text("Hello World", 200, 400);
    textSize(32);
    textAlign("center");
}