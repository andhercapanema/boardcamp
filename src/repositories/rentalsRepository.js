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
    getAllRentals: async () => {
        const rentals = await connectionDB.query(
            `SELECT
                *
            FROM
                rentals;`
        );
        return rentals.rows;
    },
    getRentalsByCustomerId: async (customerId) => {
        const rentals = await connectionDB.query(
            `SELECT
                *
            FROM
                rentals
            WHERE
                "customerId" = $1;`,
            [customerId]
        );
        return rentals.rows;
    },
    getRentalsByGameId: async (gameId) => {
        const rentals = await connectionDB.query(
            `SELECT
                *
            FROM
                rentals
            WHERE
                "gameId" = $1;`,
            [gameId]
        );
        return rentals.rows;
    },
    getRentalsByCustomerAndGameId: async (customerId, gameId) => {
        const rentals = await connectionDB.query(
            `SELECT
                *
            FROM
                rentals
            WHERE
                "customerId" = $1 AND "gameId" = $2;`,
            [customerId, gameId]
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
                id=$1`,
            [id]
        );
    },
};

export default RentalsRepository;
