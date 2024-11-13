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
        if(e.button == 2) {
            onFlag(x, y);
        } else {
            onReveal(x, y);
        }
        
    }

    const display = (tile: TileData) => {
        if(tile.flagged) return "🚩";
        if(!tile.revealed) return "";
        if(tile.value == -1) return "💣";
        return tile.value
    }
    return (
    <div className="tile" onClick={handleClick} onContextMenu={(e) => {e.preventDefault(); handleClick(e)}}>
        {display(tile)}
    </div>)
}