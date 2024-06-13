import { useEffect, useState } from "react";
import { useBoard } from "../hooks/useBoard";
import Board from "./Board";
import "../styles/game.css";
import { usePlayer } from "../hooks/usePlayer";
import { checkCollision } from "../utils/heplers";

function Game() {
  const [player, updatePosition, resetPlayer, rotate] = usePlayer();
  const [gameSpeed, setGameSpeed] = useState(1000);
  const [board, setBoard, rowsCleared] = useBoard(player, resetPlayer);

  const drop = () => {
    if (checkCollision(board, player, 0, 1)) return;
    updatePosition(0, 1);
  };

  const dropMax = () => {
    let maxSquaresToDrop = board.length;
    for (let y = 0; y < player.tetromino.length; y++) {
      for (let x = 0; x < player.tetromino[y].length; x++) {
        if (player.tetromino[y][x] !== 0) {
          let squaresToDrop = 0;
          while (
            player.yPos + y + squaresToDrop + 1 < board.length &&
            board[player.yPos + y + squaresToDrop + 1][player.xPos + x][1] === "clear"
          ) {
            squaresToDrop++;
          }
          if (squaresToDrop < maxSquaresToDrop) {
            maxSquaresToDrop = squaresToDrop;
          }
        }
      }
    }
    updatePosition(0, maxSquaresToDrop);
  };
  
  const move = ({ key }) => {
    if (key === "a") {
      if (!checkCollision(board, player, -1, 0)) updatePosition(-1, 0);
    } else if (key === "d") {
      if (!checkCollision(board, player, 1, 0)) updatePosition(1, 0);
    } else if (key === "s") {
      drop();
    } else if (key === ' ') {
      dropMax();
    } else if (key === 'w') {
      rotate(board);
    }
  };


  useEffect(() => {
    document.addEventListener("keydown", move);
    return () => document.removeEventListener("keydown", move);
  }, [move]);

  useEffect(() => {
    const dropInterval = setInterval(() => {
      drop();
    }, gameSpeed);

    return () => clearInterval(dropInterval);
  }, [drop, gameSpeed]);

  return <Board board={board} />;
}

export default Game;
