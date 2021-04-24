const blockMaterials = require('../blockMaterials.json');
const config = require('../config.json');

function getUpdatedBlockPosition(board, block, x, y, boarder) {

    let Blck = blockMaterials.acid;

    let acidBlock = {
        "isBlock": Blck.isBlock,
        "color": Blck.color,
        "hasMoved": true,
        "hasGravity": Blck.hasGravity,
        "blockType": Blck.blockType
    };

    let airBlock = blockMaterials.air;

    if (block.hasMoved) return board;
    if (!block.hasGravity) return board;

    

    if(board[y - 1][x].blockType == "water"){
        board[y - 1][x] = acidBlock;
    }else if(board[y - 1][x].isBlock && board[y - 1][x].blockType != "boarder" && board[y - 1][x].blockType != "acid"){
        if(Math.floor(Math.random() * 10) < config.acidSpread){
            board[y - 1][x] = airBlock;
        }
    }

    if(board[y + 1][x].blockType == "water"){
        board[y + 1][x] = acidBlock;
    }else if(board[y + 1][x].isBlock && board[y + 1][x].blockType != "boarder" && board[y + 1][x].blockType != "acid"){
        if(Math.floor(Math.random() * 10) < config.acidSpread){
            board[y + 1][x] = airBlock;
        }
    }

    if(board[y][x - 1].blockType == "water"){
        board[y][x - 1] = acidBlock;
    }else if(board[y][x - 1].isBlock && board[y][x - 1].blockType != "boarder" && board[y][x - 1].blockType != "acid"){
        if(Math.floor(Math.random() * 10) < config.acidSpread){
            board[y][x - 1] = airBlock;
        }
    }

    if(board[y][x + 1].blockType == "water"){
        board[y][x + 1] = acidBlock;
    }else if(board[y][x + 1].isBlock && board[y][x + 1].blockType != "boarder" && board[y][x + 1].blockType != "acid"){
        if(Math.floor(Math.random() * 10) < config.acidSpread){
            board[y][x + 1] = airBlock;
        }
    }


    
    let canGoLeft = true;
    let canGoRight = true;
    for (let i = 0; i < 5; i++) {
        if (x - i <= 0) return board;
        if(canGoLeft){
            if(board[y + 1][x - i].blockType != "air" && board[y + 1][x - i].blockType != "acid")  canGoLeft = false;
            if(!board[y + 1][x - i].isBlock){
                board[y + 1][x - i] = acidBlock;
                board[y][x] = airBlock;
                return board;
            }
        }
        if(canGoRight){
            if(board[y + 1][x + i].blockType != "air" && board[y + 1][x + i].blockType != "acid")  canGoRight = false;
            if(!board[y + 1][x + i].isBlock){
                board[y + 1][x + i] = acidBlock;
                board[y][x] = airBlock;
                return board;
            }
        }
    }
    return board;
} 

module.exports = { getUpdatedBlockPosition }