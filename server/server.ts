import express from "express";
import cors from "cors";
import ViteExpress from "vite-express";
import {Entry} from "../scheme/entry"
const app = express();

app.use(cors());
app.use(express.json());

/* The leaderboard to send to users. Since we only send the top 10, we need to store only the top 10 */
let leaderboard: Entry[] = [];

app.get('/leaderboard', (req, res) => {
  /* TODO: send the leaderboard array to the client. Make sure it's the 10 best scores! */
  res.json(leaderboard);
});

app.post('/leaderboard', (req, res) => {
  /* TODO: update the leaderboard with the new entry */
  leaderboard.push(req.body as Entry);
  console.log(leaderboard);
  leaderboard.sort((a, b) => a.time - b.time);
  leaderboard = leaderboard.slice(0,10);
  console.log(leaderboard);

  res.status(200).send();
});

ViteExpress.listen(app, 3000, () => {
  console.log(`Backend listening on port ${3000}`)
})
