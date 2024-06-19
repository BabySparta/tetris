import club from "../assets/club.png"
import meat from "../assets/meat.png"

function ClubSmash() {
  return (
    <button className="powerUpButton">
      <img src={club} alt="club smash" className="clubIcon" />
      <div className="costWrap">
        <img src={meat} alt="cost" className="meatCost" />
        <div className="costText">10</div>
      </div>
    </button>
  )
}

export default ClubSmash;