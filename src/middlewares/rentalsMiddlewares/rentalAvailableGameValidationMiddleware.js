import GamesRepository from "../../repositories/gamesRepository.js";

export default async function rentalAvailableGameValidation(req, res, next) {
    const { gameId } = req.body;

    try {
        const rentals = await GamesRepository.getGamesByRentals(gameId);

        const currentRentals = rentals.rows.filter(
            (rental) => rental?.returnDate === null
        ).length;

        const game = await GamesRepository.getGameById(gameId);

        const availableGames = game.stockTotal - currentRentals;

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
