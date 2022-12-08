import connectionDB from "../database/db.js";

const GamesRepository = {
    getAllGames: async () => {
        const games = await connectionDB.query("SELECT * FROM games;");
        return games.rows;
    },
};

export default GamesRepository;
