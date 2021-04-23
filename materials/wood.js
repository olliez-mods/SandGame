const blockMaterials = require('../blockMaterials.json');

function getUpdatedBlockPosition(board, block, x, y){

    let Blck = blockMaterials.wood;

    let woodBlock = {
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
        return board;
    }

    if (!board[y + 1][x].isBlock) {
        board[y + 1][x] = woodBlock;
        board[y][x] = airBlock;
        return board;
    }

    return board;
}

module.exports = {getUpdatedBlockPosition}