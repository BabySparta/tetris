import { useState } from "react";
import { useBoard } from "../hooks/useBoard";
import Board from "./Board";
import "../styles/game.css"

function Game() {
  const [board, setBoard] = useBoard();
  const [gameSpeed, setGameSpeed] = useState(1000);

  //setTimeout(gameSpeed, )
  return (
    <Board board={board} />
  )
}

export default Game;