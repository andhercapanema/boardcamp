import GamesRepository from "../../repositories/gamesRepository.js";

export default async function gameIdExistsValidation(req, res, next) {
    const { gameId } = req.body;

    try {
        const game = await GamesRepository.getGameById(gameId);

        if (game === undefined)
            return res
                .status(400)
                .send({
                    message:
                        "Não existe nenhum jogo com esse ID, favor inserir outro!",
                });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    next();
}
