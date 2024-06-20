import NextPiece from "../components/NextPiece";
import "../styles/Sidebar.css"
import meatIcon from "../assets/meat.png"
import { useEffect, useState } from "react";
import ClubSmash from "../components/ClubSmash";

function Sidebar({ nextPiece, money, totalRowsCleared, clubSmash }) {
  
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
      </div>
    </div>
  )
}

export default Sidebar;