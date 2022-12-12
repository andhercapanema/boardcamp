import { Router } from "express";
import {
    getRentals,
    postRental,
    returnGame,
} from "../controllers/rentalsControllers.js";
import customerIdExistsValidation from "../middlewares/customerMiddlewares/customerIdExistsValidationMiddleware.js";
import gameIdExistsValidation from "../middlewares/gameMiddlewares/gameIdExistsValidationMiddleware.js";
import rentalAvailableGameValidation from "../middlewares/rentalsMiddlewares/rentalAvailableGameValidationMiddleware.js";
import rentalBodyValidation from "../middlewares/rentalsMiddlewares/rentalBodyValidationMiddleware.js";
import rentalIdExistsValidation from "../middlewares/rentalsMiddlewares/rentalIdExistsValidationMiddleware.js";
import rentalWasNotReturnedValidation from "../middlewares/rentalsMiddlewares/rentalWasNotReturnedValidationMiddleware.js";

const router = Router();

router.post(
    "/",
    rentalBodyValidation,
    customerIdExistsValidation,
    gameIdExistsValidation,
    rentalAvailableGameValidation,
    postRental
);
router.get("/", getRentals);
router.post(
    "/:id/return",
    rentalIdExistsValidation,
    rentalWasNotReturnedValidation,
    returnGame
);

export default router;
