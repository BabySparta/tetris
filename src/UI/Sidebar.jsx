import NextPiece from "../components/NextPiece";
import "../styles/Sidebar.css"
import meatIcon from "../assets/meat.png"

function Sidebar({ nextPiece, rowsCleared }) {
  return (
    <div className="sidebar">
      <NextPiece nextPiece={nextPiece}/>
      <div className="level">Level {Math.floor(rowsCleared/10)}</div>
      <div className="moneyWrap">
        <img src={meatIcon} alt="meat" className="meatIcon"/>
        <div className="moneyVal">69</div>
      </div>
    </div>
  )
}

export default Sidebar;