const config = require("./config.json");
const chalk = require("chalk");

let board = [];

const textures = {
    "sand": "[]",
    "air": "  ",
    "spawner": "()",
    "brick": "##",
    "water" : "@@",
    "acid" : "HH",
    "boarder" : "[]",
    "dirt" : "{}",
    "wood" : "||"
};

let selectedMaterial = textures.sand;

let boardHeight = config.height;
let boardWidth = config.width;
let tick = 0;


//runs on update
function update() {
    tick++;

    boardString = 'Selected Material: ' + selectedMaterial + '\n';
    board.forEach(i => {
        i.forEach(e => {
            boardString += chalk.keyword(e.color)(textures[e.blockType]);
        });
        boardString += "\n";
    });
    boardString += `1. Sand, 2. Brick, 3. Water, 4. Acid, 5. Boarder, 6. dirt, 7. wood`;
    boardString += '\n to clear hit, "0"';
    console.clear();
    console.log(boardString);
}

function updateBoard(newBoard, selMat) {
    board = newBoard;
    selectedMaterial = selMat;
}

//runs on start
function run() {
    updateTimer = setInterval(update, 100);
}


module.exports = { run, updateBoard }