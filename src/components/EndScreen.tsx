import { ChangeEvent, useState } from "react";

interface Props {
    score: number
    onTimeSubmit: (name: string) => void;
}

export default function Leaderboard({score, onTimeSubmit}: Props) {
    /* The name we inserted in the text input */
    let [name, setName] = useState("");

    let handleClick = () => {
        /* TODO: send information to the server */
    }

    let handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        /* TODO: update the name */
    }

    /* Some weird react stuff. This exists just to keep the elements in line */
    return (
    <div style={{width: "10em", padding: "10px"}}>
        {score != 0 &&
        <>
            <p style={{fontSize: "1.2rem", marginBottom: 5, fontWeight: 600}}>You win!</p>
            <div className="box">
                <div>Your score: {score}</div>
                <input placeholder="name" onChange={handleInput}></input>
                <button onClick={handleClick}>Submit Score</button>
            </div>
        </>}
    </div>)
}