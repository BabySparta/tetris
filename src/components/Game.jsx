import { useEffect, useState } from "react";
import { useBoard } from "../hooks/useBoard";
import Board from "./Board";
import "../styles/game.css";
import { usePlayer } from "../hooks/usePlayer";
import { checkCollision } from "../utils/heplers";

function Game() {
  const [player, updatePosition, resetPlayer] = usePlayer();
  const [gameSpeed, setGameSpeed] = useState(1000);
  const [board, setBoard, rowsCleared] = useBoard(player, resetPlayer);

  const drop = () => {
    if (checkCollision(board, player)) return;
    updatePosition(0, 1);
  };

  const move = ({ key }) => {
    if (key === "a") {
      if (!checkCollision(board, player, -1)) updatePosition(-1, 0);
    } else if (key === "d") {
      if (!checkCollision(board, player, 1)) updatePosition(1, 0);
    } else if (key === "s") {
      updatePosition(0, 1);
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
