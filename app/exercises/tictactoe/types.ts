interface PlayerMove {
    x: number,
    y: number
}

interface TicTacToe {
    gameIndex: number,
    pastMoves: PlayerMove[]
    table: ('.'|'x'|'o')[][]
}