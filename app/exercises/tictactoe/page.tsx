'use client';
import React from 'react';
import TableDisplayer from './table/table';
import { useTicTacToe } from './tictactoeState';

export default function Page() {
    const [state, dispatch] = useTicTacToe();
    const { gameIndex, table, pastMoves } = state;
    const player = gameIndex %2===0? 'x':'o';
    return <div>
        <h4>{`Player ${player} its your turn!`}</h4>
         <TableDisplayer
            table={table}
            onNewMove={(x,y)=>dispatch({type: 'new_move', data: {x, y}})}
        />
    </div>
}