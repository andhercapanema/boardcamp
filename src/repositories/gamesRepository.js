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
    getGameById: async (id) => {
        const game = await connectionDB.query(
            `SELECT
                *
            FROM
                games
            WHERE
                id = $1;
            `,
            [id]
        );
        return game.rows[0];
    },
    getGamesByRentals: async (gameId) => {
        const games = await connectionDB.query(
            `SELECT
                games.id, games."stockTotal"
            FROM
                games
            JOIN
                rentals
            ON
                games.id = rentals."gameId"
            WHERE
                games.id = $1;
            `,
            [gameId]
        );
        return games;
    },
    getGameByIdNameIdCategoryIdCategoryName: async (id) => {
        const game = await connectionDB.query(
            `SELECT
                g.id, g.name, g."categoryId", c."name" AS "categoryName"
            FROM 
                games AS g
            JOIN
                categories AS c
            ON
                g."categoryId" = c.id
            WHERE
                g.id = $1;
            `,
            [id]
        );
        return game.rows[0];
    },
};

export default GamesRepository;
