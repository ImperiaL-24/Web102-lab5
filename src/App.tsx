import { useEffect, useState } from 'react'
import Leaderboard from './components/Leaderboard';
import Table from './components/Table';
import './App.css'
import { generateTable, isWon } from './lib';

function App() {
    const [table, setTable] = useState(generateTable());
    const [start, setStart] = useState(0);
    const [time, setTime] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);

    const getLeaderboard = async () => {
        /* TODO: fetch data from the server to get leaderboard data */
        // const resp = await fetch("http://localhost:3000/leaderboard");
        // const players = await resp.json();
        // setLeaderboard(players);
    }

    const handleWin = () => {
        const finishTime = Date.now();
        setTime(finishTime - start);
    }

    const revealTile = (x: number, y: number) => {
        let copy = [...table];
        copy[y][x].revealed = true;
        setTable(copy);
        if(isWon(table)) handleWin();
        console.log("revealed:", x, y);
    }

    const flagTile = (x: number, y: number) => {
        let copy = [...table];
        copy[y][x].flagged = !copy[y][x].flagged;
        setTable(copy);
        if(isWon(table)) handleWin();
        console.log("revealed:", x, y);
    }

    const restartGame = () => {
        setTable(generateTable());
        setStart(Date.now());
    }

    /* Use effect called on mount */
    useEffect(() => {
        /*TODO: call the async method `getLeaderboard` */
        // getLeaderboard();
        // setTable(generateTable());
        setStart(Date.now());
    }, [])

    return (
        <main>
            <Leaderboard />
            <div>
                <button onClick={() => restartGame()}>Restart</button>
                <div>Last time: {time}ms</div>
                <Table table={table} onReveal={revealTile} onFlag={flagTile} />
            </div>
        </main>
    )
}

export default App
