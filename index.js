const keypress = require('keypress');
const fs = require('fs');

const dis = require("./display.js");
const config = require("./config.json");
const materials = require('./blockMaterials.json');

let currentMaterial = "sand";

let matChooserArr = [
    "sand",
    "brick",
    "water",
    "acid",
    "boarder"
];


dis.run();

let boardHeight = config.height;
let boardWidth = config.width;

let board = [];
for (let i = 0; i < boardHeight; i++) {
    board.push([]);
    for (let a = 0; a < boardWidth; a++) {
        board[i].push({
            "isBlock": false,
            "color": "grey",
            "hasMoved": false,
            "hasGravity": true,
            "blockType": "air"
        });
    }
}

for(let i = 0; i < boardHeight; i++){
    board[i][0].isBlock = true;
    board[i][0].hasGravity = false;
    board[i][0].blockType = "boarder"

    board[i][boardWidth-1].isBlock = true;
    board[i][boardWidth-1].hasGravity = false;
    board[i][boardWidth-1].blockType = "boarder"
}

board[0][Math.floor(boardWidth / 2)].blockType = "spawner";
let spawner = {
    "x": Math.floor(boardWidth / 2),
    "y": 0
}
let tick = 0;

function update() {
    tick++;

    if (tick % 1 === 0) {

        board.forEach(i => {
            i.forEach(e => {
                e.hasMoved = false;
            });
        });

        board[spawner.y][spawner.x] = materials.spawner;

        board.forEach((e, y) => {
            e.forEach((i, x) => {
                if (y >= boardHeight - 1) return;
                try{
                    let materialFile = require(`./materials/${i.blockType}.js`);
                    board = materialFile.getUpdatedBlockPosition(board, i, x, y, {"height" : boardHeight, "width" : boardWidth});
                }catch(err){
                    throw err;
                }

                //console.log(`y: ${y}, x: ${x}, isblock: ${i.isBlock}`)
            });
        });
    }

    dis.updateBoard(board, currentMaterial);
}

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
        process.exit(1);
    }
    try{
    if (key.name == 'left') {
        if(spawner.x == 1) return;
        board[spawner.y][spawner.x-1] = materials.spawner;
        board[spawner.y][spawner.x] = materials.air;
        spawner.x -= 1;
    }
    if (key.name == 'right') {
        if(spawner.x == boardWidth-2) return;
        board[spawner.y][spawner.x+1] = materials.spawner;
        board[spawner.y][spawner.x] = materials.air;
        spawner.x += 1;
    }
    if (key.name == 'down') {
        if(spawner.y == boardHeight-1) return;
        board[spawner.y+1][spawner.x] = materials.spawner;
        board[spawner.y][spawner.x] = materials.air;
        spawner.y += 1;
    }
    if (key.name == 'up') {
        if(spawner.y == 0) return;
        board[spawner.y-1][spawner.x] = materials.spawner;
        board[spawner.y][spawner.x] = materials.air;
        spawner.y -= 1;
    }
    if(key.name == 'space'){
        board[spawner.y+1][spawner.x] = materials[currentMaterial];
    }
    if(key.name == 'b'){
        board[spawner.y+1][spawner.x] = materials[currentMaterial];
        board[spawner.y+1][spawner.x - 1] = materials[currentMaterial];
        board[spawner.y+1][spawner.x + 1] = materials[currentMaterial];
    }
    }catch(er){
        if(ch-1 < matChooserArr.length){
            currentMaterial = matChooserArr[ch-1];
        }
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();

setInterval(update, 100);