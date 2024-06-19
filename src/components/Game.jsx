import { useCallback, useEffect, useRef, useState } from "react";
import { useBoard } from "../hooks/useBoard";
import Board from "./Board";
import "../styles/game.css";
import { usePlayer } from "../hooks/usePlayer";
import { checkCollision } from "../utils/heplers";
import Sidebar from "../UI/Sidebar";

function Game() {
  const [player, nextPiece, updatePosition, resetPlayer, rotate, setCollided] = usePlayer();
  const [gameSpeed, setGameSpeed] = useState(1000);
  const [board, setBoard, rowsCleared] = useBoard(player, resetPlayer);

  const playerRef = useRef(player);
  const boardRef = useRef(board);
  const isDropping = useRef(false);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  const drop = useCallback(() => {
    if (isDropping.current) {
      console.log(true);
      return;
    }
    isDropping.current = true

    const currentBoard = boardRef.current;
    const currentPlayer = playerRef.current;

    if (checkCollision(currentBoard, currentPlayer, 0, 1)) {
      setCollided();
    } else {
      updatePosition(0, 1);
    }
    isDropping.current = false
  }, []);

  const dropMax = useCallback(() => {
    const currentBoard = boardRef.current;
    const currentPlayer = playerRef.current;
    let maxSquaresToDrop = currentBoard.length;

    for (let y = 0; y < currentPlayer.tetromino.length; y++) {
      for (let x = 0; x < currentPlayer.tetromino[y].length; x++) {
        if (currentPlayer.tetromino[y][x] !== 0) {
          let squaresToDrop = 0;
          while (
            currentPlayer.yPos + y + squaresToDrop + 1 < currentBoard.length &&
            currentBoard[currentPlayer.yPos + y + squaresToDrop + 1][currentPlayer.xPos + x][1] === "clear"
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
    setCollided();
  }, [updatePosition, setCollided]);

  const move = useCallback(({ key }) => {
    if (isDropping.current) {
      return;
    }
    isDropping.current = true

    const currentBoard = boardRef.current;
    const currentPlayer = playerRef.current;

    if (key === "a") {
      if (!checkCollision(currentBoard, currentPlayer, -1, 0)) updatePosition(-1, 0);
    } else if (key === "d") {
      if (!checkCollision(currentBoard, currentPlayer, 1, 0)) updatePosition(1, 0);
    } else if (key === "s") {
      if (!checkCollision(currentBoard, currentPlayer, 0, 1)) updatePosition(0, 1);
    } else if (key === ' ') {
      dropMax();
    } else if (key === 'w') {
      rotate(currentBoard);
    }
    isDropping.current = false;
  }, [updatePosition, dropMax, rotate]);

  
  useEffect(() => {
    const calculateGameSpeed = () => {
      return 1000 * Math.pow(0.9, Math.floor(rowsCleared));
    };
    setGameSpeed(prevSpeed => calculateGameSpeed(prevSpeed));
  }, [rowsCleared]);

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

  return (
    <div className="game">
      <Board board={board} />
      <Sidebar nextPiece={nextPiece} rowsCleared={rowsCleared} />
    </div>
  );
}

export default Game;
