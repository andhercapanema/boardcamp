import GamesRepository from "../../repositories/gamesRepository.js";

export default async function gameNameExistsValidation(req, res, next) {
    const { name } = res.locals.newCategory;

    try {
        const game = await GamesRepository.getGameByName(name);
        const gameAlreadyExists = game.rowCount !== 0;

        if (gameAlreadyExists)
            return res.status(409).send({
                message:
                    "Já existe um jogo cadastrado com esse nome, por favor insira um nome novo!",
            });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    next();
}
