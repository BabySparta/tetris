import Game from "../components/Game";
import NextPiece from "../components/NextPiece";
import "../styles/Body.css"

function Body() {
  return (
    <div className="body">
      <Game />
      <div className="sidebar">
        <NextPiece />
      </div>
    </div>
  )
}

export default Body;