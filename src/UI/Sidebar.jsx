import NextPiece from "../components/NextPiece";
import "../styles/Sidebar.css"
import meatIcon from "../assets/meat.png"
import { useEffect, useState } from "react";

function Sidebar({ nextPiece, rowsCleared, totalRowsCleared }) {
  const [money, setMoney] = useState(0);

  useEffect(() => {
    const calculateMoneyEarned = () => {
      if (rowsCleared/2 === 4) {
        return rowsCleared * 2
      } else if (rowsCleared/2 === 3) {
        return rowsCleared * 1.5
      } else if (rowsCleared/2 === 2) {
        return rowsCleared * 1.25
      } else {
        return rowsCleared
      }
    }

    setMoney((prev) => prev + calculateMoneyEarned());
  }, [rowsCleared])
  
  return (
    <div className="sidebar">
      <NextPiece nextPiece={nextPiece}/>
      <div className="level">Level {Math.floor(totalRowsCleared/10) + 1}</div>
      <div className="moneyWrap">
        <img src={meatIcon} alt="meat" className="meatIcon"/>
        <div className="moneyVal">{money}</div>
      </div>
    </div>
  )
}

export default Sidebar;