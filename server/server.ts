import express from "express";
import cors from "cors";
import ViteExpress from "vite-express";
const app = express();

app.use(cors());

let leaderboard = [];

app.get('/leaderboard', (req, res) => {
  /* TODO: send the leaderboard array to the client. Make sure it's the 10 best scores! */
  res.send('Hello World!')
});

app.post('/leaderboard', (req, res) => {
  /* TODO: update the leaderboard with the new entry */
  res.send('Hello World!')
});

ViteExpress.listen(app, 3000, () => {
  console.log(`Backend listening on port ${3000}`)
})
