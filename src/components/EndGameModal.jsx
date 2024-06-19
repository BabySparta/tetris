import "../styles/EndModal.css";

function EndGameModal({ gameOver, resetGame }) {
  const chooseEndMessage = () => {
    let randomNum = Math.floor(Math.random() * 5);

    const messages = [
      'Impaled by a wooly mammoth',
      'Crushed by rock slide',
      'Hunting trip gone wrong',
      'Experiment with fire went too well',
      'Wait the black berry is UN-safe?'
    ]

    return messages[randomNum]
  }
  
  return (
    <div className="endModal" id={gameOver ? "visible" : "hidden"}>
      <div className="youLost">{chooseEndMessage()}</div>
      <button className="newGame" onClick={resetGame}>New Game</button>
    </div>
  )
}

export default EndGameModal;