import express from "express";
import cors from "cors";
import ViteExpress from "vite-express";
const app = express();

app.use(cors());

app.get('/products', (req, res) => {
  res.send('Hello World!')
});

app.get('/offers', (req, res) => {
  res.send('Hello World!')
});

ViteExpress.listen(app, 3000, () => {
  console.log(`Example app listening on port ${3000}`)
})
