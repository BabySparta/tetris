import { useEffect, useState } from "react";
import { checkCollision, createBoard } from "../utils/heplers";

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
      newBoard[player.yPos][player.xPos] = [
        1,
        checkCollision(newBoard, player) ? "merged" : "clear",
      ];

      if (checkCollision(newBoard, player)) resetPlayer();
      
      return newBoard;
    };

    setBoard((prev) => updateBoard(prev));
  }, [player]);

  return [board, setBoard, rowsCleared];
};
