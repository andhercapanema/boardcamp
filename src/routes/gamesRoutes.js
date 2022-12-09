import { Router } from "express";
import { getGames, postGame } from "../controllers/gamesControllers.js";
import gameBodyValidation from "../middlewares/gameMiddlewares/gameBodyValidationMiddleware.js";
import categoryIdExistsValidation from "../middlewares/categoryMiddlewares/categoryIdExistsValidationMiddleware.js";
import gameNameExistsValidation from "../middlewares/gameMiddlewares/gameNameExistsValidation.js";

const router = Router();

router.get("/", getGames);
router.post(
    "/",
    gameBodyValidation,
    categoryIdExistsValidation,
    gameNameExistsValidation,
    postGame
);

export default router;
