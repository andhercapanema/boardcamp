import GamesRepository from "../repositories/gamesRepository.js";
import RentalsRepository from "../repositories/rentalsRepository.js";

const { getAllGamesByFilters, postNewCategory } = GamesRepository;

export async function getGames(req, res) {
    const { name, offset, limit, order, desc } = req.query;

    try {
        const games = await getAllGamesByFilters(
            name,
            offset,
            limit,
            order,
            desc
        );

        if (games.length === 0)
            return res.status(404).send({ message: "Nenhum jogo encontrado!" });

        const formattedGames = [];

        for (const game of games) {
            formattedGames.push({
                ...game,
                rentalsCount: await RentalsRepository.getRentalsAmount({
                    game: game.id,
                }),
            });
        }

        res.send(formattedGames);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function postGame(req, res) {
    const { newCategory } = res.locals;

    try {
        await postNewCategory(newCategory);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
