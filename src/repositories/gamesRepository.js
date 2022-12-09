import connectionDB from "../database/db.js";

const GamesRepository = {
    getAllGames: async () => {
        const games = await connectionDB.query(`
            SELECT
                *
            FROM
                games;
        `);
        return games.rows;
    },
    postNewCategory: async ({
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay,
    }) => {
        await connectionDB.query(
            `INSERT INTO
                games
                (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES
                ($1, $2, $3, $4, $5);
            `,
            [name, image, stockTotal, categoryId, pricePerDay]
        );
    },
    getGameByName: async (name) => {
        const game = await connectionDB.query(
            `SELECT
                *
            FROM
                games
            WHERE
                name=$1;
            `,
            [name]
        );
        return game;
    },
    getGameByNameCaseInsensitive: async (str) => {
        const foundGames = await connectionDB.query(
            `SELECT
                *
            FROM
                games
            WHERE
                name
            ILIKE
                '%' || $1 || '%';
            `,
            [str]
        );
        return foundGames.rows;
    },
};

export default GamesRepository;
