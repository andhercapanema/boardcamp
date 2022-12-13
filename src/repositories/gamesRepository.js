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
                g.id, g."stockTotal", r."returnDate"
            FROM
                games AS g
            JOIN
                rentals AS r
            ON
                g.id = r."gameId"
            WHERE
                g.id = $1;
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
    getAllGamesOffset: async (offset) => {
        const games = await connectionDB.query(
            `SELECT
                *
            FROM
                games
            OFFSET
                $1;`,
            [offset]
        );
        return games.rows;
    },
    getAllGamesLimit: async (limit) => {
        const games = await connectionDB.query(
            `SELECT
                *
            FROM
                games
            LIMIT
                $1;`,
            [limit]
        );
        return games.rows;
    },
    getAllGamesOffsetAndLimit: async (offset, limit) => {
        const games = await connectionDB.query(
            `SELECT
                *
            FROM
                games
            LIMIT
                $1
            OFFSET
                $2;`,
            [limit, offset]
        );
        return games.rows;
    },
    getGameByNameCaseInsensitiveOffset: async (str, offset) => {
        const foundGames = await connectionDB.query(
            `SELECT
                *
            FROM
                games
            WHERE
                name
            ILIKE
                '%' || $1 || '%'
            OFFSET
                $2;`,
            [str, offset]
        );
        return foundGames.rows;
    },
    getGameByNameCaseInsensitiveLimit: async (str, limit) => {
        const foundGames = await connectionDB.query(
            `SELECT
                *
            FROM
                games
            WHERE
                name
            ILIKE
                '%' || $1 || '%'
            LIMIT
                $2;`,
            [str, limit]
        );
        return foundGames.rows;
    },
    getGameByNameCaseInsensitiveOffsetAndLimit: async (str, offset, limit) => {
        const foundGames = await connectionDB.query(
            `SELECT
                *
            FROM
                games
            WHERE
                name
            ILIKE
                '%' || $1 || '%'
            LIMIT
                $2
            OFFSET
                $3;`,
            [str, limit, offset]
        );
        return foundGames.rows;
    },
};

export default GamesRepository;
