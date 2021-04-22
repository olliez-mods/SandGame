let blockMaterials = require('../blockMaterials.json');

function getUpdatedBlockPosition(board, block, x, y){

    let Blck = blockMaterials.brick;

    let brickBlock = {
        "isBlock": Blck.isBlock,
        "color": block.color,
        "hasMoved": true,
        "hasGravity": Blck.hasGravity,
        "blockType": Blck.blockType
    };
    
    let airBlock = blockMaterials.air;

    if (block.hasMoved) return board;
    if (!block.hasGravity) return board;

    if(board[y + 1][x].blockType == "water"){
        board[y][x] = board[y + 1][x];
        board[y + 1][x] = brickBlock;
    }

    if (!board[y + 1][x].isBlock) {
        board[y + 1][x] = brickBlock;
        board[y][x] = airBlock;
        return board;
    }
    return board;
}

module.exports = {getUpdatedBlockPosition}