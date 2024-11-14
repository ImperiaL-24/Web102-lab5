import { TileData } from "../lib"
import Tile from "./Tile"

interface Props {
    table: TileData[][]
    onReveal: (x: number, y: number) => void;
    onFlag: (x: number, y: number) => void;
}

export default function Table({table, onReveal, onFlag}: Props) {
    /* TODO: Display a grid of tiles. HINT: table.map() */
    return (<div className="table"></div>)
}