const blockMaterials = require('../blockMaterials.json');

function getUpdatedBlockPosition(board, block, x, y, boarder) {

    let Blck = blockMaterials.water;

    let waterBlock = {
        "isBlock": Blck.isBlock,
        "color": Blck.color,
        "hasMoved": true,
        "hasGravity": Blck.hasGravity,
        "blockType": Blck.blockType
    };

    let airBlock = blockMaterials.air;

    if (block.hasMoved) return board;
    if (!block.hasGravity) return board;

    
    let canGoLeft = true;
    let canGoRight = true;
    for (let i = 0; i < boarder.width - 2; i++) {
        if (x - i <= 0) return board;
        if(canGoLeft){
            if(board[y + 1][x - i].blockType != "air" && board[y + 1][x - i].blockType != "water")  canGoLeft = false;
            if(!board[y + 1][x - i].isBlock){
                board[y + 1][x - i] = waterBlock;
                board[y][x] = airBlock;
                return board;
            }
        }
        if(canGoRight){
            if(board[y + 1][x + i].blockType != "air" && board[y + 1][x + i].blockType != "water")  canGoRight = false;
            if(!board[y + 1][x + i].isBlock){
                board[y + 1][x + i] = waterBlock;
                board[y][x] = airBlock;
                return board;
            }
        }
    }
    return board;
} 

module.exports = { getUpdatedBlockPosition }