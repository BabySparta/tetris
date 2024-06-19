export const createBoard = () =>
  Array.from(Array(20), () => new Array(10).fill([0, "clear"]));

export const checkCollision = (board, player, xDir, yDir) => {
  for(let y = 0; y < player.tetromino.length; y++) {
    for(let x = 0; x < player.tetromino[y].length; x++) {
      if(player.tetromino[y][x] !== 0) {
        if (!board[y + player.yPos + yDir] ||
           !board[player.yPos][x+player.xPos + xDir] ||
            board[y + player.yPos + yDir][x + player.xPos + xDir][1] === 'merged'
          ) {
            return true;
          }
      }
    }
  }
  return false
}

export const checkLoss = (board) => {
  if (!checkIfEmpty(board[0])) {
    return true;
  }
  return false;
}

const checkIfEmpty = (row) => {
  let empty = true
  row.forEach(cell => {
    if (cell[1] === 'merged') {
      empty = false;
    }
  })
  return empty;
}