/* Height of the grid */
const MAX_W = 5;
/* Width of the grid */
const MAX_H = 5;
/* Number of bombs to place on the grid */
const BOMB_COUNT = 3;

/**
 * The state of a single tile in the game
 */
export interface TileData {
    revealed: boolean,
    flagged: boolean,
    value: number
}

/**
 * Generates a random int between 0 and max
 */
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

/**
 * Generates a randomized Minesweeper table, based on the global constants defined in `./lib`
 * @returns The generated table
 */
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
        /* Getting a random position */
        let bh = getRandomInt(MAX_H);
        let bw = getRandomInt(MAX_W);
        /* If there's a bomb there we need a new location */
        if(table[bh][bw]?.value == -1) continue;
        table[bh][bw].value = -1;

        /* Update the surrounding values */
        for(let i = Math.max(0,bh - 1); i <= Math.min(MAX_H - 1, bh + 1); i++) {
            for(let j = Math.max(0,bw - 1); j <= Math.min(MAX_W - 1, bw + 1); j++) {
                if(table[i][j].value != -1) table[i][j].value++;
            }
        }
        placed_bombs++;
    }
    return table;
}

/**
 * Checks if a table is won. Meaning that no bombs were revealed, all bombs are flagged, and any other tile is revealed.
 * @param table The table to check.
 * @returns `true` is the game is won, `false` otherwise.
 */
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