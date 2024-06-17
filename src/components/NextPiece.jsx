import { useEffect, useState } from "react";
import "../styles/NextPiece.css";

function NextPiece( nextPiece ) {
  const [displayPiece, setDisplayPiece] = useState(new Array(4).fill(new Array(4).fill(0)))

  useEffect(() => {
    console.log(displayPiece)
  })

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