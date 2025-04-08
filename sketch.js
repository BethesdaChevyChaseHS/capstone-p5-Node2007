
function setup() {
    createCanvas(600, 800);
    textFont("Courier New");
    setupDebugConsole();
}

let character;
let obstacles;
let floor;

let theGameOver = false;
let haveGameBegun = false;
let score = 0;

let minDistanceBetweenObstacles = 100;
let nextReappearDistance;
let isUnstoppable = false;


function draw(){
    background("green");
    text("Hello World!", 400, 200);
    textSize(35);
    textAlign("center");
}