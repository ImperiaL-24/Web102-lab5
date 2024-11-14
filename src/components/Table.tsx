import { TileData } from "../lib"
import Tile from "./Tile"

interface Props {
    table: TileData[][]
    onReveal: (x: number, y: number) => void;
    onFlag: (x: number, y: number) => void;
}

export default function Table({table, onReveal, onFlag}: Props) {
    /* TODO: Display a grid of tiles. HINT: table.map() */
    return (<div className="table">
        {table.map((row, row_idx) => (
            <div className="row" key={row_idx}>
                {row.map((tile, col_idx) => 
                    <Tile tile={tile} x={col_idx} y={row_idx} onReveal={onReveal} onFlag={onFlag} key={col_idx}/>
                )}
            </div>
        ))}
    </div>)
}