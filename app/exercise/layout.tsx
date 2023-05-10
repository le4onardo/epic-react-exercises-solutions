import React from 'react';

export default function ExerciseLayout({
    children
}: {children: React.ReactNode}){

    return <div>
        <h3>Here goes tic tac toe problem description</h3>
        {children}
    </div>
}