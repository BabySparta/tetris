export const createBoard = () =>
  Array.from(Array(20), () => new Array(10).fill([0, "clear"]));

export const checkCollision = (board, player) => {
  if (player.yPos === 19) return true;
  if (board[player.yPos + 1][player.xPos][1] === "merged") return true;
}
