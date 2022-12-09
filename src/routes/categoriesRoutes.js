import { Router } from "express";
import {
    getCategories,
    postCategory,
} from "../controllers/categoriesControllers.js";
import categoryBodyValidation from "../middlewares/categoryBodyValidationMiddleware.js";
import categoryNameExistsValidation from "../middlewares/categoriyNameExistsValidationMiddleware.js";

const router = Router();

router.get("/", getCategories);
router.post(
    "/",
    categoryBodyValidation,
    categoryNameExistsValidation,
    postCategory
);

export default router;
