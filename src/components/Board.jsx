import Cell from "./Cell";
import React from "react";

function Board({ board }) {
  return (
    <div className="board">
      {board.map(row => 
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </div>
  )
}

export default Board