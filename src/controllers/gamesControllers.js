import GamesRepository from "../repos/gamesRepository.js";

const { getAllGames } = GamesRepository;

export async function getGames(req, res) {
    const { name } = req.query;

    try {
        const games = await getAllGames();

        if (games.length === 0)
            return res.status(404).send({ message: "Nenhum jogo cadastrado!" });

        res.send(games);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
