import Cell from "./Cell";
import EndGameModal from "./EndGameModal";

function Board({ board, gameOver, resetGame, handleTileClick, isClubSmashActive }) {
  const handleClick = (rowIndex, colIndex) => {
    handleTileClick(colIndex, rowIndex);
  };

  return (
    <div className="boardWrap">
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              type={cell[0]}
              onClick={() => handleClick(rowIndex, colIndex)}
              rowIndex={rowIndex}
              colIndex={colIndex}
              isClubSmashActive={isClubSmashActive}
            />
          ))
        )}
      </div>
      <EndGameModal gameOver={gameOver} resetGame={resetGame} />
    </div>
  );
}

export default Board;
