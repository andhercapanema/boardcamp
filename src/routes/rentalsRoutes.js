import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentalsControllers.js";
import customerIdExistsValidation from "../middlewares/customerMiddlewares/customerIdExistsValidationMiddleware.js";
import gameIdExistsValidation from "../middlewares/gameMiddlewares/gameIdExistsValidationMiddleware.js";
import rentalAvailableGameValidation from "../middlewares/rentalsMiddlewares/rentalAvailableGameValidationMiddleware.js";
import rentalBodyValidation from "../middlewares/rentalsMiddlewares/rentalBodyValidationMiddleware.js";

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

export default router;
