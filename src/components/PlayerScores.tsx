type PlayerScoresProps = {
    Player1Score: number,
    Player2Score: number,
    IsPlayer1Turn: boolean
}

const PlayerScores = (scores: PlayerScoresProps) => {
    const player1Class: string = scores.IsPlayer1Turn?"player1 turn":"player1"
    const player2Class: string = scores.IsPlayer1Turn?"player2":"player2 turn"
    
return <table className="players">    
    <tbody>
    <tr><td>{scores.Player1Score}</td><td>{scores.Player2Score}</td></tr>
    <tr><td className={player1Class}>Player 1</td><td className={player2Class}>Player 2</td></tr>
    </tbody>
</table>;
}
  
export default PlayerScores;