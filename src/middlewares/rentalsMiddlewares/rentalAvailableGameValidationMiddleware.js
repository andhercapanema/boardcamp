import GamesRepository from "../../repositories/gamesRepository.js";
import RentalsRepository from "../../repositories/rentalsRepository.js";

export default async function rentalAvailableGameValidation(req, res, next) {
    const { gameId } = req.body;

    try {
        const rentals = await GamesRepository.getGamesByRentals(gameId);

        const currentRentals = rentals.rowCount;
        const gameStockTotal = rentals.rows[0].stockTotal;

        const availableGames = gameStockTotal - currentRentals;

        if (availableGames < 1)
            return res.status(400).send({
                message: "Esse jogo não está disponível, favor escolher outro!",
            });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    next();
}
