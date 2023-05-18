import React from 'react';

export default function TableDisplayer({
    table,
    onNewMove,
    disabled
}:{
    table: ('x' | 'o' | '.')[][],
    onNewMove: (x, y)=>void,
    disabled: boolean
}) {
    return <div>
        {
            table.map((row, xIndex) =>
                <div key={xIndex}>
                    {row.map((cell, yIndex) => 
                        <button
                            disabled={cell !== '.' || disabled}
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