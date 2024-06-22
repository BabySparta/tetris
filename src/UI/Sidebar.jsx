import NextPiece from "../components/NextPiece";
import "../styles/Sidebar.css"
import meatIcon from "../assets/meat.png"
import ClubSmash from "../components/ClubSmash";
import DinoRoar from "../components/DinoRoar";
import infoIcon from "../assets/infoIcon.png"

function Sidebar({ nextPiece, money, totalRowsCleared, clubSmash, dinoRoar, handleInfoClick }) {
  
  return (
    <div className="sidebar">
      <NextPiece nextPiece={nextPiece}/>
      <div className="level">Level {Math.floor(totalRowsCleared/5) + 1}</div>
      <div className="moneyWrap">
        <img src={meatIcon} alt="meat" className="meatIcon"/>
        <div className="moneyVal">{money}</div>
      </div>
      <div className="powerWrap">
        <ClubSmash clubSmash={clubSmash}/>
        <DinoRoar dinoRoar={dinoRoar}/>
      </div>
      <button onClick={handleInfoClick} className="infoButton">
        <img src={infoIcon} alt="info" className="infoIcon" />
        <p className="infoTxt">Info</p>
      </button>
    </div>
  )
}

export default Sidebar;