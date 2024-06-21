import meat from "../assets/meat.png"
import dinoIcon from "../assets/dino-smash.png";

function DinoRoar({ dinoRoar }) {
  return (
    <button className="powerUpButton" onClick={dinoRoar}>
      <img src={dinoIcon} alt="dino roar" className="clubIcon" />
      <div className="costWrap">
        <img src={meat} alt="cost" className="meatCost" />
        <div className="costText">25</div>
      </div>
    </button>
  )
}

export default DinoRoar;