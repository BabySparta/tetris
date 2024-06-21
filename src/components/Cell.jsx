function Cell({ type, onClick, isClubSmashActive, rowIndex, colIndex }) {

  const handleMouseEnter = () => {
    if (isClubSmashActive) {
      document.querySelectorAll(`[data-row="${rowIndex}"][data-col="${colIndex}"]`).forEach(cell => {
        cell.classList.add('highlight');
      });
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          const neighbor = document.querySelector(`[data-row="${rowIndex + r}"][data-col="${colIndex + c}"]`);
          if (neighbor) {
            neighbor.classList.add('highlight');
          }
        }
      }
    }
  };

  const handleMouseLeave = () => {
    if (isClubSmashActive) {
      document.querySelectorAll(`[data-row="${rowIndex}"][data-col="${colIndex}"]`).forEach(cell => {
        cell.classList.remove('highlight');
      });
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          const neighbor = document.querySelector(`[data-row="${rowIndex + r}"][data-col="${colIndex + c}"]`);
          if (neighbor) {
            neighbor.classList.remove('highlight');
          }
        }
      }
    }
  };

  return (
    <div
      className='cell'
      id={type[0]}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-row={rowIndex}
      data-col={colIndex}
    >
    </div>
  );
};

export default Cell;
