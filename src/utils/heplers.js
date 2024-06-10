export const createBoard = () =>
  Array.from(Array(20), () => new Array(10).fill([0, "clear"]));

export const checkCollision = (board, player, dir) => {
  if (player.yPos === 19) return true;
  if (player.xPos + dir < 0 || player.xPos + dir > 9) return true;
  if (dir && board[player.yPos][player.xPos + dir][1] === "merged") return true;
  if (board[player.yPos + 1][player.xPos][1] === "merged") return true;
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