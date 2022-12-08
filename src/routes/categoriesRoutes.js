import { Router } from "express";
import {
    getCategories,
    postCategory,
} from "../controllers/categoriesControllers.js";
import categoriesBodyValidation from "../middlewares/categoriesBodyValidationMiddleware.js";
import categoriesExistsValidation from "../middlewares/categoriesExistsValidationMiddleware.js";

const router = Router();

router.get("/categories", getCategories);
router.post(
    "/categories",
    categoriesBodyValidation,
    categoriesExistsValidation,
    postCategory
);

export default router;
