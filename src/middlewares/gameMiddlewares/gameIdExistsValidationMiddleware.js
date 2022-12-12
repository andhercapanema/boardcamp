import GamesRepository from "../../repositories/gamesRepository.js";

export default async function gameIdExistsValidation(req, res, next) {
    const { gameId } = req.body;

    try {
        const game = await GamesRepository.getGameById(gameId);

        if (game === undefined) return res.sendStatus(400);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    next();
}
