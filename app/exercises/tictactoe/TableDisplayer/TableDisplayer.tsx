import React from 'react';

export default function TableDisplayer({
    table,
    onNewMove
}:{
    table: ('x' | 'o' | '.')[][],
    onNewMove: (x, y)=>void
}) {
    return <div>
        {
            table.map((row, xIndex) =>
                <div key={xIndex}>
                    {row.map((cell, yIndex) => 
                        <button
                            disabled={cell !== '.'}
                            onClick={()=>onNewMove(xIndex, yIndex)}
                            key={yIndex}
                        >
                            {cell}
                        </button>
                    )}
                </div>
            )
        }
    </div>
}