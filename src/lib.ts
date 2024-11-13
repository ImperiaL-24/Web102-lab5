const MAX_W = 5;
const MAX_H = 5;
const BOMB_COUNT = 3;

export interface TileData {
    revealed: boolean,
    flagged: boolean,
    value: number
}

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const generateTable = () => {
    let table: TileData[][] = [];
    for(let i = 0; i < MAX_H; i++) {
        table[i] = new Array(MAX_W);
        for(let j = 0; j < MAX_W; j++) {
            table[i][j] = {revealed: false, flagged: false, value: 0};
        }
    }
    let placed_bombs = 0;
    while(placed_bombs < BOMB_COUNT) {
        let bh = getRandomInt(MAX_H);
        let bw = getRandomInt(MAX_W);
        if(table[bh][bw]?.value == -1) continue;
        table[bh][bw].value = -1;
        // console.log("BOMB AT:", bh, bw);
        for(let i = Math.max(0,bh-1);i<=Math.min(MAX_H-1, bh+1);i++) {
            for(let j = Math.max(0,bw-1);j<=Math.min(MAX_W-1, bw+1);j++) {
                // console.log("TRY INC:", i, j);
                if(table[i][j].value != -1) table[i][j].value++;
            }
        }
        placed_bombs++;
    }
    return table;
}

export const isWon = (table: TileData[][]): boolean => {
    for(let row of table) {
        for(let tile of row) {
            if(tile.revealed && tile.value == -1) return false;
            if(!tile.flagged && tile.value == -1) return false;
            if(!tile.revealed && tile.value != -1) return false;
        }
    }
    return true;
}