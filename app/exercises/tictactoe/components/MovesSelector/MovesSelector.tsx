import React from 'react';

export default function MovesSelector ({
    movesCount,
    onMoveSelected,
    currentMove
}:{
    movesCount: number,
    onMoveSelected: (index: number)=>void,
    currentMove: number
}) {
    const moves=[];
    for (let i = 0; i<=movesCount; i++) {
        moves.push(
        <button
            key={i}
            onClick={() => {
                onMoveSelected(i)
            }}
            disabled={i === currentMove}
        >
            {i}
        </button>)
    }
    return <> {moves} </>;
}