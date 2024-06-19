import Cell from "./Cell";
import EndGameModal from "./EndGameModal";

function Board({ board, gameOver, resetGame }) {
  return (
    <div className="boardWrap">
      <EndGameModal gameOver={gameOver} resetGame={resetGame}/>
      <div className="board">
        {board.map(row => 
          row.map((cell, x) => <Cell key={x} type={cell[0]} />)
        )}
      </div>
    </div>
  )
}

export default Board