import { useEffect, useState } from "react"
import { createBoard } from "../utils/heplers"

export const useBoard = () => {
  const [board, setBoard] = useState(createBoard());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = newBoard =>
      newBoard.reduce((acc, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          acc.unshift(new Array(newBoard[0].length).fill([0, 'clear']));
          return acc;
        }
        acc.push(row);
        return acc;
      }, []);

      const updateBoard = (prevBoard) => {
        let newBoard = prevBoard
        console.log(newBoard);
        newBoard[0][4] = [1, 'clear'];
        return newBoard;
      }

      setBoard(prev => updateBoard(prev));
  }, []);

  return [board, setBoard, rowsCleared];
}