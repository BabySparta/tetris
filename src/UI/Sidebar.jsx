import NextPiece from "../components/NextPiece";
import "../styles/Sidebar.css"
import meatIcon from "../assets/meat.png"
import ClubSmash from "../components/ClubSmash";
import DinoRoar from "../components/DinoRoar";

function Sidebar({ nextPiece, money, totalRowsCleared, clubSmash, dinoRoar }) {
  
  return (
    <div className="sidebar">
      <NextPiece nextPiece={nextPiece}/>
      <div className="level">Level {Math.floor(totalRowsCleared/10) + 1}</div>
      <div className="moneyWrap">
        <img src={meatIcon} alt="meat" className="meatIcon"/>
        <div className="moneyVal">{money}</div>
      </div>
      <div className="powerWrap">
        <ClubSmash clubSmash={clubSmash}/>
        <DinoRoar dinoRoar={dinoRoar}/>
      </div>
    </div>
  )
}

export default Sidebar;