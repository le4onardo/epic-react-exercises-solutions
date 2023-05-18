'use client';
import { Dispatch, useReducer } from "react"

const initialState: TicTacToe = {
    gameIndex: 0,
    pastMoves: [],
    table: [['.','.','.'], ['.','.','.'], ['.','.','.']],
}

function reducer (state: TicTacToe, action) {
    const {type, data} = action;
    let {pastMoves, gameIndex, table} = state;

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
            
            
            return { pastMoves, gameIndex, table };
        
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


// SELECTORS:

export function selectGameStatus(state): 'playing' | 'draw' | 'x' | 'o' {
    const {table, gameIndex} = state;

    // check rows
    for (let i=0;i<table.length; i++) {
        if (table[i][0] !== '.' && table[i][0] === table[i][1] && table[i][1] === table[i][2]) 
            return table[i][0];
    }

    // check columns
    for (let i=0;i<table[0].length; i++) {
        if (table[0][i] !== '.' && table[0][i] === table[1][i] && table[1][i] === table[2][i]) 
            return table[0][i];
    }

    if (table[0][0] !== '.' && table[0][0] === table[1][1] && table[1][1] === table[2][2]) 
        return table[0][0];
    
    if (table[2][0] !== '.' && table[2][0] === table[1][1] && table[1][1] === table[0][2]) 
        return table[2][0];

    return gameIndex === 9 ? 'draw':  'playing';
}