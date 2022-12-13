import GamesRepository from "../repositories/gamesRepository.js";

const {
    getAllGames,
    postNewCategory,
    getGameByNameCaseInsensitive,
    getGameByNameCaseInsensitiveLimit,
    getGameByNameCaseInsensitiveOffset,
    getGameByNameCaseInsensitiveOffsetAndLimit,
    getAllGamesOffset,
    getAllGamesLimit,
    getAllGamesOffsetAndLimit,
} = GamesRepository;

export async function getGames(req, res) {
    const { name, offset, limit } = req.query;

    try {
        if (name !== undefined) {
            let filteredGames = [];

            if (offset === undefined) {
                if (limit === undefined) {
                    filteredGames = await await getGameByNameCaseInsensitive(
                        name
                    );
                } else {
                    filteredGames = await getGameByNameCaseInsensitiveLimit(
                        name,
                        limit
                    );
                }
            } else {
                if (limit === undefined) {
                    filteredGames = await getGameByNameCaseInsensitiveOffset(
                        name,
                        offset
                    );
                } else {
                    filteredGames =
                        await getGameByNameCaseInsensitiveOffsetAndLimit(
                            name,
                            offset,
                            limit
                        );
                }
            }

            return res.send(filteredGames);
        }

        let games = [];

        if (offset === undefined) {
            if (limit === undefined) {
                games = await getAllGames();
            } else {
                games = await getAllGamesLimit(limit);
            }
        } else {
            if (limit === undefined) {
                games = await getAllGamesOffset(offset);
            } else {
                games = await getAllGamesOffsetAndLimit(offset, limit);
            }
        }

        if (games.length === 0)
            return res.status(404).send({ message: "Nenhum jogo encontrado!" });

        res.send(games);
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
