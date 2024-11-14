import { Entry } from "../../scheme/entry"

interface Props {
    entries: Entry[]
}

export default function Leaderboard({entries}: Props) {
    /* TODO: display the eleaderboard entries.*/
    /*  TIP: use the class leaderboard for the board and leaderboard-entry for the div of the entry */
    return (
    <div>
        <p style={{fontSize: "1.2rem", marginBottom: 5, fontWeight: 600}}>Leaderboard</p>
        <div className="box">
            {entries.length == 0 ? "Nobody on the leaderboard!" : entries.map((entry) => <div className="leaderboard-entry">{entry.name}: {entry.time}</div>)}
        </div>
    </div>
    )
}