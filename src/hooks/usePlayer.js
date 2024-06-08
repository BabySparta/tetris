import { useState } from "react";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    xPos: 5,
    yPos: 0,
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
    });
  }

  return [player, updatePosition, resetPlayer];
};
