import { useState } from "react";
import { TETROMINOS, randomTetromino } from "../utils/tetrominos";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    xPos: 5,
    yPos: 0,
    tetromino: randomTetromino().shape,
  });

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

  return [player, updatePosition, resetPlayer];
};
