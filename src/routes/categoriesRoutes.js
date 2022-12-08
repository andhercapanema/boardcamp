import { Router } from "express";
import {
    getCategories,
    postCategory,
} from "../controllers/categoriesControllers.js";
import categoriesBodyValidation from "../middlewares/categoriesBodyValidationMiddleware.js";
import categoriesExistsValidation from "../middlewares/categoriesExistsValidationMiddleware.js";

const router = Router();

router.get("/", getCategories);
router.post(
    "/",
    categoriesBodyValidation,
    categoriesExistsValidation,
    postCategory
);

export default router;
