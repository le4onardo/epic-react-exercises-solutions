'use client';
import { Dispatch, useReducer } from "react"

const initialState: TicTacToe = {
    gameIndex: 0,
    pastMoves: [],
    table: [['.','.','.'], ['.','.','.'], ['.','.','.']],
    gameStatus: 'playing'
}

function reducer (state: TicTacToe, action) {
    const {type, data} = action;
    let {pastMoves, gameIndex, gameStatus, table} = state;

    switch(type){
        case 'add_new_move':
            const player = gameIndex%2===0 ? 'x' : 'o';
            pastMoves = pastMoves.slice(0, gameIndex);
            gameIndex += 1;
            pastMoves.push({x: data.x, y: data.y});
            table = table.slice();
            table[0]=table[0].slice();
            table[1]=table[1].slice();
            table[2]=table[2].slice();
            table[data.x][data.y] = player;
            if (
                table[0][0] === player && table[0][1] === player && table[0][2] === player || 
                table[1][0] === player && table[1][1] === player && table[1][2] === player ||
                table[2][0] === player && table[2][1] === player && table[2][2] === player ||
                table[0][0] === player && table[1][0] === player && table[2][0] === player ||
                table[0][1] === player && table[1][1] === player && table[2][1] === player ||
                table[0][2] === player && table[1][2] === player && table[2][2] === player ||
                table[0][0] === player && table[1][1] === player && table[2][2] === player ||
                table[0][2] === player && table[1][1] === player && table[2][0] === player
            ) {
                gameStatus = player;
            } else {
                gameStatus = pastMoves.length === 9? 'draw':  'playing';
            }
            
            return { pastMoves, gameIndex, gameStatus, table };
        
        case 'go_game_state':
            gameIndex = data;
            table = table.slice();
            table[0]=table[0].slice();
            table[1]=table[1].slice();
            table[2]=table[2].slice();
            pastMoves.forEach(
                ({x,y}, index) => {
                    if(index<gameIndex)
                        table[x][y] = index%2===0? 'x' : 'o'
                    else 
                        table[x][y]='.'
                }
            )
            return {...state, gameIndex, table}
        case 'restart':
            return initialState;
        default: 
            return {...state} 
    }
}

export function useTicTacToe(): [TicTacToe, Dispatch<any>]{
    return useReducer(reducer, initialState);
}