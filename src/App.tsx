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
        /* TODO: GET data from the server to get leaderboard data */
    }

    const submitLeaderboard = async (name: string) => {
        /* TODO: POST data to the server to add a new entry */
    }

    const handleWin = () => {
        /* TODO: update the time we took to win the game */
    }

    const revealTile = (x: number, y: number) => {
        /* TODO: reveal a tile in the table. I cannot reveal a tile if it is flagged! */
    }

    const flagTile = (x: number, y: number) => {
        /* TODO: flag a tile in the table. I cannot flag a tile if it is revealed! */
    }

    const restartGame = () => {
        /* TODO: generate a new table and reset the starting time, as well as my score. */
    }

    /* Use effect called on mount */
    useEffect(() => {
        /* TODO: get leaderboard from the server and start the timer */
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
