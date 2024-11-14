import { useEffect, useState } from 'react'
import Leaderboard from './components/Leaderboard';
import EndScreen from './components/EndScreen';
import Table from './components/Table';
import './App.css'
import { generateTable, isWon } from './lib';

function App() {
    /* Our minesweeper table */
    const [table, setTable] = useState(generateTable());
    /* The time we started this minesweeper game. (Date.now() to get the current time) */
    const [start, setStart] = useState(0);
    /* The time we took to complete the game. */
    const [time, setTime] = useState(0);
    /* The leaderboard. */
    const [leaderboard, setLeaderboard] = useState([]);

    /* BONUS: make a display for how many flags the user has left. The game starts with `BOMB_COUNT` flags. */

    const getLeaderboard = async () => {
        /* TODO: fetch data from the server to get leaderboard data */
        const resp = await fetch("http://localhost:3000/leaderboard");
        const players = await resp.json();
        setLeaderboard(players);
    }

    const submitLeaderboard = async (name: string) => {
        /* TODO: POST data to the server to add a new entry */
        await fetch("http://localhost:3000/leaderboard", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({ name: name, time: time })
        });
        window.location.reload();
    }

    const handleWin = () => {
        /* TODO: update the time we took to win the game */
        const finishTime = Date.now();
        setTime(finishTime - start);
    }

    const revealTile = (x: number, y: number) => {
        /* TODO: reveal a tile in the table. I cannot reveal a tile if it is flagged! */
        let copy = [...table];
        if(copy[y][x].flagged) return;
        copy[y][x].revealed = true;
        setTable(copy);
        if(isWon(table)) handleWin();
        console.log("revealed:", x, y);
    }

    const flagTile = (x: number, y: number) => {
        /* TODO: flag a tile in the table. I cannot flag a tile if it is revealed! */
        let copy = [...table];
        if(copy[y][x].revealed) return;
        copy[y][x].flagged = !copy[y][x].flagged;
        setTable(copy);
        if(isWon(table)) handleWin();
        console.log("revealed:", x, y);
    }

    const restartGame = () => {
        /* TODO: generate a new table and reset the starting time, as well as my score. */
        setTable(generateTable());
        setStart(Date.now());
        setTime(0);
    }

    /* Use effect called on mount */
    useEffect(() => {
        /*TODO: get leaderboard from the server and start the timer */
        getLeaderboard();
        setStart(Date.now());
    }, [])

    return (
        <main>
            <Leaderboard entries={leaderboard}/>
            <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                <button onClick={() => restartGame()}>Restart</button>
                <Table table={table} onReveal={revealTile} onFlag={flagTile} />
            </div>
            <EndScreen score={time} onTimeSubmit={submitLeaderboard}/>
        </main>
    )
}

export default App
