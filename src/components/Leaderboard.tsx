import { Entry } from "../../scheme/entry"

interface Props {
    entries: Entry[]
}

export default function Leaderboard({entries}: Props) {
    /* TODO: display the leaderboard entries.*/
    return (
    <div>
        <p style={{fontSize: "1.2rem", marginBottom: 5, fontWeight: 600}}>Leaderboard</p>
        <div className="box">
            {/*  TIP: use the class box for the board and leaderboard-entry for the div of the entry */}
        </div>
    </div>
    )
}