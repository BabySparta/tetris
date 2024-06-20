import club from "../assets/club.png"
import meat from "../assets/meat.png"

function ClubSmash({ clubSmash }) {
  return (
    <button className="powerUpButton" onClick={clubSmash}>
      <img src={club} alt="club smash" className="clubIcon" />
      <div className="costWrap">
        <img src={meat} alt="cost" className="meatCost" />
        <div className="costText">10</div>
      </div>
    </button>
  )
}

export default ClubSmash;