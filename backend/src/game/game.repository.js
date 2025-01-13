const prisma = require("../db");

const findGames = async () => {
    const games = await prisma.game.findMany();

    return games;
};

const findGamesById = async (id) => {
    if (isNaN(id)) {
        throw new Error("Game Tidak Ditemukan");
    }
        
    const game = await prisma.game.findUnique({
        where: { id: parseInt(id) }, 
    });

    return game;
};

const findGameByName = async (nama) => {
    const game = await prisma.product.findFirst({
        where: {
            nama,
        },
    });

    return game;
}

const insertGame = async (gameData) => {
    const game = await prisma.game.create({
            data: {
                nama: gameData.nama,
                developer: gameData.developer,
                deskripsi: gameData.deskripsi,
                harga: gameData.harga,
                image: gameData.image,
            },
        });
    return game;
};

const deleteGame = async (id) => {
    await prisma.game.delete({
        where: { id: parseInt(id) },
    });
};

const editGame = async (id, gameData) => {
    const game = await prisma.game.update({
        where: { id: parseInt(id) },
        data: {
            nama: gameData.nama,
            developer: gameData.developer,
            deskripsi: gameData.deskripsi,
            harga: gameData.harga,
            image: gameData.image,
            },
        });
        return game;
    };

module.exports = {
    findGames,
    findGamesById,
    insertGame,
    deleteGame,
    editGame
};