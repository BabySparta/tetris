import Game from "../components/Game";
import InfoModal from "../components/InfoModal";
import "../styles/Body.css"

function Body() {
  return (
    <div className="body">
      <Game />
      <InfoModal />
    </div>
  )
}

export default Body;