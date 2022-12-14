import connectionDB from "../database/db.js";

const GamesRepository = {
    getAllGamesByFilters: async (offset, limit, order, desc, name = "") => {
        const formattedOrder = `g."${order}"`;
        const orderBy = [
            "id",
            "name",
            "image",
            "stockTotal",
            "categoryId",
            "pricePerDay",
        ].includes(order)
            ? `ORDER BY ${formattedOrder}`
            : "";

        const foundGames = await connectionDB.query(
            `SELECT
                g.*, c.name AS "categoryName"
            FROM
                games AS g
            JOIN
                categories AS c
            ON
                g."categoryId" = c.id
            WHERE
                g.name
            ILIKE
                '%' || $1 || '%'
            ${orderBy}
            ${desc ? "DESC" : ""}
            LIMIT
                $2
            OFFSET
                $3;`,
            [name, limit, offset]
        );

        return foundGames.rows;
    },
    postNewGame: async ({
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
};

export default GamesRepository;
