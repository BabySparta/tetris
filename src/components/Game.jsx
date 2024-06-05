import { useState } from "react";
import { createBoard } from "../utils/heplers";
import Board from "./Board";
import "../styles/game.css"

function Game() {
  const [board, setBoard] = useState(createBoard());
  return (
    <Board board={board} />
  )
}

export default Game;