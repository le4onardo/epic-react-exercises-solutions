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
    let newState;
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
            newState = { pastMoves, gameIndex, table };
            break;
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
            newState = {...state, gameIndex, table}
            break;
        case 'restart':
            newState = initialState;
            break;
        default: 
            newState = {...state}
    }
    localStorage.setItem('state', JSON.stringify(newState));
    console.log(newState)
    return newState;
}

export function useTicTacToe(): [TicTacToe, Dispatch<any>]{
    const prevState = localStorage.getItem('state');
    let state;
    if (prevState)
        state = JSON.parse(prevState) as TicTacToe;
    
    return useReducer(reducer, state || initialState);
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