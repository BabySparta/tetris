import { useEffect, useState } from "react";

function NextPiece({ nextPiece }) {
  const [displayPiece, setDisplayPiece] = useState(new Array(4).fill(new Array(4).fill(0)))

  useEffect(() => {
    if(!nextPiece) return;

    const changePiece = () => {
      let baseArray = Array.from({ length: 4 }, () => Array(4).fill(0));
      if (nextPiece.length === 4) {
        return nextPiece;
      }
      for (let row = 0; row < nextPiece.length; row++) {
        for (let col = 0; col < nextPiece[row].length; col++) {
          baseArray[col + 1][row + 1] = nextPiece[row][col]
        }
      }
      return baseArray;
    }

    setDisplayPiece(changePiece());
  }, [nextPiece])

  return (
    <div className="nextPiece">
      <div className="nextPTitle">Next Piece:</div>
      <div className="display">
        {displayPiece.map((row, rowIndex) => (
          <div key={rowIndex} className="displayRow">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="displayCell" id={cell}></div>
            ))}
          </div>
        ))}
      </div>
    </div>

  )
}

export default NextPiece;