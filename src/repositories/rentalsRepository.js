import connectionDB from "../database/db.js";
import GamesRepository from "./gamesRepository.js";
import { format } from "date-fns";

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
                ($1, $2, $3, $4, $5, $6, $7);
            `,
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
};

export default RentalsRepository;
