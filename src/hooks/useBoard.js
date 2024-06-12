import { useEffect, useState } from "react";
import { checkCollision, checkLoss, createBoard } from "../utils/heplers";

export const useBoard = (player, resetPlayer) => {
  const [board, setBoard] = useState(createBoard());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newBoard) =>
      newBoard.reduce((acc, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          acc.unshift(new Array(newBoard[0].length).fill([0, "clear"]));
          return acc;
        }
        acc.push(row);
        return acc;
      }, []);

    const updateBoard = (prevBoard) => {
      let newBoard = prevBoard.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if(value !== 0) {
            newBoard[y + player.yPos][x + player.xPos] = [
              value,
              checkCollision(newBoard, player, 0, 0) ? 'merged' : 'clear'
            ]
          }
        })
      })      

      if (checkCollision(newBoard, player, 0, 0)) {
        newBoard = sweepRows(newBoard);
        if (checkLoss(newBoard)) {
          return newBoard;
        }
        resetPlayer();
      }
      return newBoard;
    };

    setBoard((prev) => updateBoard(prev));
  }, [player]);

  return [board, setBoard, rowsCleared];
};
