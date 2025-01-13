const { findGames, findGamesById, insertGame, findGameByName, editGame } = require("./game.repository");

const getAllGames = async () => {
    return await findGames();
};

const getGameById = async (id) => {
    const game = await findGamesById(id);

    if (!game) {
    throw Error("Data Game Tidak Ada");
    }

    return game;
};

const createGame = async (newGameData) => {
    return await insertGame(newGameData);
};

const deleteGameById = async (id) => {
    await deleteGame(id);
};

const editGameById = async (id, gameData) => {
    await getGameById(id);
    return await editGameById(id, gameData);
}
module.exports = {
    getAllGames,
    getGameById,
    createGame,
    deleteGameById,
    editGameById,
}