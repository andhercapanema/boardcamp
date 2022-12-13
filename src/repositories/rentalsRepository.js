import connectionDB from "../database/db.js";
import GamesRepository from "./gamesRepository.js";
import { format, differenceInDays, startOfToday } from "date-fns";

const RentalsRepository = {
    postNewRental: async ({ customerId, gameId, daysRented }) => {
        const rentDate = format(new Date(), "yyyy-MM-dd");

        const rentedGame = await GamesRepository.getGameById(gameId);
        const originalPrice = daysRented * rentedGame.pricePerDay;

        await connectionDB.query(
            `INSERT INTO
                rentals
                ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
            VALUES
                ($1, $2, $3, $4, $5, $6, $7);`,
            [
                customerId,
                gameId,
                rentDate,
                daysRented,
                null,
                originalPrice,
                null,
            ]
        );
    },
    getAllRentalsByFilters: async (
        customerId,
        gameId,
        offset,
        limit,
        order,
        desc
    ) => {
        let whereFilter = ``;
        let whereArr = [];

        if (customerId && gameId) {
            whereFilter = ` WHERE "customerId" = $3 AND "gameId" = $4 `;
            whereArr = [customerId, gameId];
        } else if (customerId) {
            whereFilter = ` WHERE "customerId" = $3 `;
            whereArr = [customerId];
        } else if (gameId) {
            whereFilter = ` WHERE "gameId" = $3 `;
            whereArr = [gameId];
        }

        const formattedOrder = `"${order}"`;

        const rentals = await connectionDB.query(
            `SELECT
                *
            FROM
                rentals
            ${whereFilter}
            ORDER BY
                ${formattedOrder}
            ${desc ? "DESC" : ""}
            LIMIT
                $1
            OFFSET
                $2;`,
            [limit, offset, ...whereArr]
        );
        return rentals.rows;
    },
    getRentalById: async (id) => {
        const rental = await connectionDB.query(
            `SELECT
                *
            FROM
                rentals
            WHERE
                id = $1;`,
            [id]
        );
        return rental.rows[0];
    },
    updateRentalReturnDate: async (id) => {
        await connectionDB.query(
            `UPDATE
                rentals
            SET
                "returnDate" = $1
            WHERE
                id=$2;`,
            [format(new Date(), "yyyy-MM-dd"), id]
        );
    },
    updateRentalDelayFee: async (id) => {
        const game = await RentalsRepository.getRentalById(id);

        const daysActuallyRented = differenceInDays(
            startOfToday(),
            game.rentDate
        );
        const daysOfDelay = daysActuallyRented - game.daysRented;
        const pricePerDay = game.originalPrice / game.daysRented;
        const delayFee = daysOfDelay > 0 ? daysOfDelay * pricePerDay : 0;

        await connectionDB.query(
            `UPDATE
                rentals
            SET
                "delayFee" = $1
            WHERE
                id=$2;`,
            [delayFee, id]
        );
    },
    deleteSpecificRental: async (id) => {
        await connectionDB.query(
            `DELETE FROM
                rentals
            WHERE
                id=$1;`,
            [id]
        );
    },
};

export default RentalsRepository;
