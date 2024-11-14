/**
 * An entry on the leaderboard. This is separate as we can use it both on the client and server.
 */
export interface Entry {
    name: string;
    time: number;
}