
function Cell({ type }) {
  return (
    <div className="cell" id={type !== 0 ? "fill" : "empty"}></div>
  )
}

export default Cell;