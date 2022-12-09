import { Router } from "express";
import {
    getCategories,
    postCategory,
} from "../controllers/categoriesControllers.js";
import categoryBodyValidation from "../middlewares/categoryMiddlewares/categoryBodyValidationMiddleware.js";
import categoryNameExistsValidation from "../middlewares/categoryMiddlewares/categoryNameExistsValidationMiddleware.js";

const router = Router();

router.get("/", getCategories);
router.post(
    "/",
    categoryBodyValidation,
    categoryNameExistsValidation,
    postCategory
);

export default router;
