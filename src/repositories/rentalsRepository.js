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
    getAllRentalsByFilters: async (customerId, gameId, offset, limit) => {
        let filter = ``;
        let queryArr = [];

        if (customerId && gameId) {
            filter = ` WHERE "customerId" = $1 AND "gameId" = $2 LIMIT $3 OFFSET $4 `;
            queryArr = [customerId, gameId, limit, offset];
        } else if (customerId) {
            filter = ` WHERE "customerId" = $1 LIMIT $2 OFFSET $3 `;
            queryArr = [customerId, limit, offset];
        } else if (gameId) {
            filter = ` WHERE "gameId" = $1 LIMIT $2 OFFSET $3 `;
            queryArr = [gameId, limit, offset];
        } else {
            filter = ` LIMIT $1 OFFSET $2 `;
            queryArr = [limit, offset];
        }

        const rentals = await connectionDB.query(
            `SELECT
                *
            FROM
                rentals
            ${filter};`,
            queryArr
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
