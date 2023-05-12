'use client';
import { useReducer } from "react"

const initialState: TicTacToe = {
    gameIndex: 0,
    pastMoves: [],
    table: [['.','.','.'], ['.','.','.'], ['.','.','.']],
    gameStatus: 'playing'
}

function reducer (state, action) {
    const {type, data} = action;
    let {pastMoves, gameIndex, gameStatus, table} = state;

    switch(type){
        case 'new_move':
            const player = gameIndex%2===0 ? 'x' : 'o';
            gameIndex += 1;
            pastMoves = pastMoves.slice(0, gameIndex);
            pastMoves.push({x: data.x, y: data.y});
            table = table.slice();
            table[data.x][data.y] = player;
            if (
                table[0][0]=== player && table[0][1]=== player && table[0][2]=== player || 
                table[1][0]=== player && table[1][1]=== player && table[1][2]=== player ||
                table[2][0]=== player && table[2][1]=== player && table[2][2]=== player ||
                table[0][0]=== player && table[1][0]=== player && table[2][0]=== player ||
                table[0][1]=== player && table[1][1]=== player && table[2][1]=== player ||
                table[0][2]=== player && table[1][2]=== player && table[2][2]=== player ||
                table[0][0]=== player && table[1][1]=== player && table[2][2]=== player ||
                table[0][2]=== player && table[1][1]=== player && table[2][0]=== player
            ) {
                gameStatus = player;
            } else {
                gameStatus = pastMoves.length === 9? 'draw':  'playing';
            }
            
            return { pastMoves, gameIndex, gameStatus, table };
        
        case 'new_game_index':
            gameIndex = data.gameIndex;
            return {...state, gameIndex}
        case 'restart':
            return initialState;
        default: 
            return {...state} 
    }
}

export function useTicTacToe(){
    return useReducer(reducer, initialState)
}