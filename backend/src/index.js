const cors = require('cors');
const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    res.send("Halo");
});

const gameController = require("./game/game.controller");

app.use("/game", gameController);

app.listen(PORT, () => {
    console.log("Express API berjalan di port: " + PORT);
});