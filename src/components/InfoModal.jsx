import "../styles/InfoModal.css"

const InfoModal = () => {
  return (
    <div className="infoModal">
      <div className="infoBody">
        <div className="infoSection">
          <div className="infoTitle">How To Play:</div>
          <ul className="infoList">
            <li className="infoBullet">W: Rotate Clockwise</li>
            <li className="infoBullet">A: Move Left</li>
            <li className="infoBullet">S: Move Down</li>
            <li className="infoBullet">D: Move Right</li>
            <li className="infoBullet">Space: Drop to Bottom</li>
          </ul>
        </div>
        <div className="infoSection">
          <div className="infoTitle">Powerups:</div>
          <ul className="infoList">
            <li className="infoBullet">
              Club Smash: Choose a 3x3 area to clear out. Blocks above will not
              fall down.
            </li>
            <li className="infoBullet">
              Dino Roar: Causes all overhanging cells to fall down, filling in
              gaps
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
