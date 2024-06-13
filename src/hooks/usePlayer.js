import { useState } from "react";
import { randomTetromino } from "../utils/tetrominos";
import { checkCollision } from "../utils/heplers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    xPos: 5,
    yPos: 0,
    tetromino: randomTetromino().shape,
  });

  const rotate = (board) => {
    const clonedTetromino = player.tetromino.map(row => [...row]);

    // Transpose the matrix
    for (let y = 0; y < clonedTetromino.length; y++) {
      for (let x = 0; x < y; x++) {
        [clonedTetromino[x][y], clonedTetromino[y][x]] = [clonedTetromino[y][x], clonedTetromino[x][y]];
      }
    }
  
    // Reverse the rows to get a rotated matrix
    clonedTetromino.forEach(row => row.reverse());
    if (checkCollision(board, { xPos: player.xPos, yPos: player.yPos, tetromino: clonedTetromino}, 0, 1)) return;

    setPlayer(prev => ({
      ...prev,
      tetromino: clonedTetromino
    }));
  }

  const updatePosition = (x, y) => {
    setPlayer(prev => ({
      ...prev,
      xPos: prev.xPos + x,
      yPos: prev.yPos + y,
    }));
  };

  const resetPlayer = () => {
    setPlayer({
      xPos: 5,
      yPos: 0,
      tetromino: randomTetromino().shape
    });
  }

  return [player, updatePosition, resetPlayer, rotate];
};
