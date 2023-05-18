'use client';
import React from 'react';
import TableDisplayer from './TableDisplayer/TableDisplayer';
import MovesSelector from './MovesSelector/MovesSelector';
import { selectGameStatus, useTicTacToe } from './tictactoeState';

export default function Page() {
    const [state, dispatch] = useTicTacToe();
    const { gameIndex, table, pastMoves } = state;
    const player = gameIndex %2===0? 'x':'o';
    const gameStatus = selectGameStatus(state);
    return <div>
        { gameStatus === 'playing' && <h4>{`Player ${player} its your turn!`}</h4> }
        { gameStatus === 'draw' && <h4>{`Nobody won :(`}</h4> }
        { gameStatus === 'x' && <h4>{`Player x won!`}</h4> }
        { gameStatus === 'o' && <h4>{`Player o won!`}</h4> }
         <TableDisplayer
            table={table}
            onNewMove={(x,y) => dispatch({type: 'add_new_move', data: {x, y}})}
            disabled={gameStatus!=='playing'}
        />
        <MovesSelector
            movesCount={pastMoves.length}
            onMoveSelected={(moveIndex) => dispatch({type: 'go_game_state', data:moveIndex}) }
            currentMove={gameIndex}
        />
        <button onClick={()=>dispatch({type: 'restart' })} disabled={pastMoves.length===0}>
            Restart!
        </button>
    </div>
}