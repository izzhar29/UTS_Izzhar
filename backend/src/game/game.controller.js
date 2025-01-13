const express = require('express');
// const prisma = require("../db");
const { getAllGames, getGameById, createGame, deleteGameById, editGameById } = require('./game.service');

const router = express.Router();

router.get("/", async (req, res) => {
    const games = await getAllGames();

    res.send(games);
});

router.get("/:id", async (req, res) => {
    try {
        const gameID = parseInt(req.params.id);
        const game = await getGameById(gameID);

        res.send(game);
    } catch (err) {
        res.status(400).send(err.message);
    }
    
});

router.post("/", async (req, res) => {
    try {
        const newGameData = req.body;

        const game = await createGame(newGameData);

        res.send({
            data: game,
            message: "Berhasil Menambah Game",
    });
    } catch (error) {
        res.status(400).send(err.message);
    }
    
});

router.delete("/:id", async (req, res) => {
    try {
        const gameID = req.params.id;

        await deleteGameById(parseInt(gameID));
        res.send("Game Berhasil Dihapus");
    } catch (error) {
        res.status(400).send(err.message);
    }
    
});

router.put("/:id", async (req, res) => {
    const gameID = req.params.id;
    const gameData = req.body;

    if (
        !(
            gameData.image && 
            gameData.deskripsi && 
            gameData.nama && 
            gameData.developer && 
            gameData.harga)
        ) {
            return res.status(400).send("Tidak Diketahui");
        }


    const game = await editGameById(gameID, gameData);
    res.send({
        data: game,
        message: "Edit Data Game Berhasil"
    })
});

router.patch("/:id", async (req, res) => {
    try {
        const gameID = req.params.id;
    const gameData = req.body;

    const game = await editGameById(parseInt(gameID), gameData);
    
    res.send({
        data: game,
        message: "Edit Data Game Berhasil"
    });
    } catch (error) {
        res.status(400).send(err.message)
    }
});
module.exports = router;