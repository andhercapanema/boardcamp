import { Router } from "express";
import { getGames, postGame } from "../controllers/gamesControllers.js";
import gameBodyValidation from "../middlewares/gameBodyValidationMiddleware.js";
import categoryIdExistsValidation from "../middlewares/categoryIdExistsValidationMiddleware.js";
import gameNameExistsValidation from "../middlewares/gameNameExistsValidation.js";

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
