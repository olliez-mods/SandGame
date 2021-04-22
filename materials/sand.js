const blockMaterials = require('../blockMaterials.json');

function getUpdatedBlockPosition(board, block, x, y){

    let Blck = blockMaterials.sand;

    let sandBlock = {
        "isBlock": Blck.isBlock,
        "color": Blck.color,
        "hasMoved": true,
        "hasGravity": Blck.hasGravity,
        "blockType": Blck.blockType
    };

    let airBlock = blockMaterials.air;

    if (block.hasMoved) return board;
    if (!block.hasGravity) return board;

    if(board[y + 1][x].blockType == "water"){
        board[y][x] = board[y + 1][x];
        board[y + 1][x] = sandBlock;
        return board;
    }

    if (!board[y + 1][x].isBlock) {
        board[y + 1][x] = sandBlock;
        board[y][x] = airBlock;
        return board;
    }

    if (!board[y + 1][x + 1].isBlock) {
        board[y + 1][x + 1] = sandBlock;
        board[y][x] = airBlock;
        return board;
    }
    if (!board[y + 1][x - 1].isBlock) {
        board[y + 1][x - 1] = sandBlock;
        board[y][x] = airBlock;
        return board;
    }

    if (board[y + 1][x + 1].blockType == "water") {
        board[y][x] = board[y + 1][x + 1];
        board[y + 1][x + 1] = sandBlock;
        return board;
    }
    if (board[y + 1][x - 1].blockType == "water") {
        board[y][x] = board[y + 1][x - 1];
        board[y + 1][x - 1] = sandBlock;
        return board;
    }
    return board;
}

module.exports = {getUpdatedBlockPosition}