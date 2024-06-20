
function Cell({ type, onClick }) {
  return (
    <div className="cell" id={type} onClick={onClick}></div>
  )
}

export default Cell;