import { TileData } from "../lib"

interface Props {
    x: number
    y: number
    tile: TileData;
    onReveal: (x: number, y: number) => void;
    onFlag: (x: number, y: number) => void;
}

export default function Tile({tile, onReveal, onFlag, x, y}: Props) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        /* TODO: on right click flag a tile, on left click reveal a tile */
    }

    const display = (tile: TileData) => {
        /* TODO: If its flagged than show a 🚩, if it isn't revealed or if the value is 0, show nothing. If it is a bomb, show a 💣. Otherwise show the value of the tile. */
        return "";
    }
    return (
    <div className={"tile " + (tile.revealed ? "revealed" : "")} onClick={handleClick} onContextMenu={(e) => {e.preventDefault(); handleClick(e)}}>
        {display(tile)}
    </div>)
}