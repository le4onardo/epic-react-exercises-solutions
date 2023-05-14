import Link from 'next/link';
import React from 'react';

export default function Page() {
    return <div>
            <h2>Welcome to my solutions to <a target="_blank" href='https://epic-react-exercises.vercel.app/'>epic react exercises</a></h2>
            <h3>Motivation</h3>
            <p>
                Web development evolves fast, so its important to keep you up to date with latests trends and technologies that one might heard or read about,
                but had no opporntunity to formally work with. In my case some of advanced hook patterns and this promising framework called NEXT.js
            </p>
            <Link href="/exercises/tictactoe">Start!</Link>
        </div>

}