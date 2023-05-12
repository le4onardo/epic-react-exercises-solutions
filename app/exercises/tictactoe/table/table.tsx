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
            table.map((row, x) =>
                <div>
                    {row.map((cell, y) => 
                        <button 
                            disabled={cell!=='.'} 
                            onClick={()=>onNewMove(x,y)}
                        >
                            {cell}
                        </button>
                    )}
                </div>
            )
        }
    </div>
}