'use client';
import React from 'react';
import TableDisplayer from './TableDisplayer/TableDisplayer';
import MovesSelector from './MovesSelector/MovesSelector';
import { useTicTacToe } from './tictactoeState';

export default function Page() {
    const [state, dispatch] = useTicTacToe();
    const { gameIndex, table, pastMoves } = state;
    const player = gameIndex %2===0? 'x':'o';
    return <div>
        <h4>{`Player ${player} its your turn!`}</h4>
         <TableDisplayer
            table={table}
            onNewMove={(x,y) => dispatch({type: 'add_new_move', data: {x, y}})}
        />
        <MovesSelector
            movesCount={pastMoves.length}
            onMoveSelected={(moveIndex) => dispatch({type: 'go_game_state', data:moveIndex}) }
            currentMove={gameIndex}
        />
        <button onClick={()=>dispatch({type: 'restart' }) }>Restart!</button>
    </div>
}