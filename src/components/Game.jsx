import { useCallback, useEffect, useRef, useState } from "react";
import { useBoard } from "../hooks/useBoard";
import Board from "./Board";
import "../styles/game.css";
import { usePlayer } from "../hooks/usePlayer";
import { checkCollision, checkLoss, createBoard } from "../utils/heplers";
import Sidebar from "../UI/Sidebar";
import InfoModal from "./InfoModal";

function Game() {
  const [
    player,
    nextPiece,
    updatePosition,
    resetPlayer,
    rotate,
    setCollided,
    setPlayer,
  ] = usePlayer();
  const [gameSpeed, setGameSpeed] = useState(1000);
  const [
    board,
    setBoard,
    rowsCleared,
    setRowsCleared,
    totalRowsCleared,
    setTotalRowsCleared,
  ] = useBoard(player, resetPlayer);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [money, setMoney] = useState(0);
  const [isClubSmashActive, setIsClubSmashActive] = useState(false);
  const [isDinoRoarActive, setIsDinoRoarActive] = useState(false);
  const [clubSmashPosition, setClubSmashPosition] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const playerRef = useRef(player);
  const boardRef = useRef(board);
  const isDropping = useRef(false);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    boardRef.current = board;
  }, [board]);

  useEffect(() => {
    if (checkLoss(boardRef.current)) {
      setGameOver(true);
    }
  }, [board]);

  const drop = useCallback(() => {
    if (isDropping.current) {
      return;
    }
    isDropping.current = true;

    const currentBoard = boardRef.current;
    const currentPlayer = playerRef.current;

    if (
      checkCollision(currentBoard, currentPlayer, 0, 1) &&
      !currentPlayer.collided
    ) {
      setCollided();
    } else {
      updatePosition(0, 1);
    }
    isDropping.current = false;
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
            currentBoard[currentPlayer.yPos + y + squaresToDrop + 1] &&
            currentBoard[currentPlayer.yPos + y + squaresToDrop + 1][
              currentPlayer.xPos + x
            ][1] === "clear"
          ) {
            squaresToDrop++;
          }
          if (squaresToDrop < maxSquaresToDrop) {
            maxSquaresToDrop = squaresToDrop;
          }
        }
      }
    }

    setPlayer((prev) => ({
      ...prev,
      yPos: currentPlayer.yPos + maxSquaresToDrop,
      collided: true,
    }));
  }, [updatePosition]);

  const move = useCallback(
    (event) => {
      const { key } = event;
      if (isDropping.current || gameOver || isPaused) {
        return;
      }
      isDropping.current = true;

      const currentBoard = boardRef.current;
      const currentPlayer = playerRef.current;

      if (key === "a") {
        if (!checkCollision(currentBoard, currentPlayer, -1, 0))
          updatePosition(-1, 0);
      } else if (key === "d") {
        if (!checkCollision(currentBoard, currentPlayer, 1, 0))
          updatePosition(1, 0);
      } else if (key === "s") {
        if (!checkCollision(currentBoard, currentPlayer, 0, 1)) {
          updatePosition(0, 1);
        }
      } else if (key === " ") {
        event.preventDefault();
        dropMax();
      } else if (key === "w") {
        rotate(currentBoard);
      }
      isDropping.current = false;
    },
    [updatePosition, dropMax, rotate, gameOver]
  );

  useEffect(() => {
    const calculateGameSpeed = () => {
      return 1000 * Math.pow(0.8, Math.floor(totalRowsCleared / 5));
    };
    setGameSpeed((prevSpeed) => calculateGameSpeed(prevSpeed));
  }, [totalRowsCleared]);

  useEffect(() => {
    document.addEventListener("keydown", move);
    return () => document.removeEventListener("keydown", move);
  }, [move]);

  useEffect(() => {
    if (!isPaused) {
      document.addEventListener("keydown", move);
    } else {
      document.removeEventListener("keydown", move);
    }
    return () => document.removeEventListener("keydown", move);
  }, [move, isPaused]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const dropInterval = setInterval(() => {
      drop();
    }, gameSpeed);

    return () => clearInterval(dropInterval);
  }, [drop, gameSpeed, gameOver, isPaused]);

  useEffect(() => {
    const calculateMoneyEarned = () => {
      if (rowsCleared >= 4) {
        return rowsCleared * 4;
      } else if (rowsCleared === 3) {
        return rowsCleared * 3;
      } else if (rowsCleared === 2) {
        return rowsCleared * 2.5;
      } else {
        return rowsCleared * 2;
      }
    };

    setMoney((prev) => prev + calculateMoneyEarned());
  }, [rowsCleared]);

  useEffect(() => {
    if (!isClubSmashActive) {
      document.querySelectorAll(".highlight").forEach((cell) => {
        cell.classList.remove("highlight");
      });
    }
  }, [isClubSmashActive]);

  useEffect(() => {
    if (isDinoRoarActive) {
      document.querySelector(".board").classList.add("shake");
    } else if (!isDinoRoarActive) {
      document.querySelector(".board").classList.remove("shake");
    }
  }, [isDinoRoarActive]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const activateClubSmash = () => {
    if (money >= 10) {
      setIsClubSmashActive(true);
      togglePause();
    }
  };

  const clubSmash = (x, y) => {
    const newBoard = board.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex >= y - 1 &&
        rowIndex <= y + 1 &&
        colIndex >= x - 1 &&
        colIndex <= x + 1
          ? [0, "clear"]
          : cell
      )
    );

    setBoard(newBoard);
    setMoney((prev) => prev - 10);
  };

  const handleTileClick = (x, y) => {
    if (isClubSmashActive) {
      setClubSmashPosition({ x, y })
      setTimeout(() => {
        clubSmash(x, y);
        setIsClubSmashActive(false);
        togglePause();
        setClubSmashPosition(null)
      }, 500)
    }
  };

  const dinoRoar = () => {
    togglePause();
    setIsDinoRoarActive(true);

    setTimeout(() => {
      setIsDinoRoarActive(false);
      const newBoard = board.map((row) => row.slice());

      for (let col = 0; col < newBoard[0].length; col++) {
        let nonClearCells = [];
        for (let row = 0; row < newBoard.length; row++) {
          if (newBoard[row][col][1] === 'merged') {
            nonClearCells.push(newBoard[row][col]);
          }
        }
        for (let row = newBoard.length - 1; row >= 0; row--) {
          if (nonClearCells.length > 0) {
            newBoard[row][col] = nonClearCells.pop();
          } else {
            newBoard[row][col] = [0, "clear"];
          }
        }
      }
      
      togglePause();
      setBoard(newBoard);
    }, 500);
  };

  const triggerDinoRoar = () => {
    if (money >= 20) {
      dinoRoar();
      setMoney((prev) => prev - 20);
    }
  };

  const handleInfoClick = () => {
    togglePause();
    setIsInfoOpen(prev => !prev);
  }

  const resetGame = () => {
    setBoard(createBoard());
    resetPlayer();
    setRowsCleared(0);
    setTotalRowsCleared(0);
    setGameOver(false);
    setGameSpeed(1000);
    setMoney(0);
  };

  return (
    <div className="game">
      {isInfoOpen && 
        <InfoModal handleInfoClick={handleInfoClick}/>
      }
      <Board
        board={board}
        gameOver={gameOver}
        resetGame={resetGame}
        handleTileClick={handleTileClick}
        isClubSmashActive={isClubSmashActive}
        clubSmashPosition={clubSmashPosition}
      />
      <Sidebar
        nextPiece={nextPiece}
        money={money}
        totalRowsCleared={totalRowsCleared}
        clubSmash={activateClubSmash}
        dinoRoar={triggerDinoRoar}
        handleInfoClick={handleInfoClick}
      />
    </div>
  );
}

export default Game;
