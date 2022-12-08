import { Router } from "express";
import categoriesRouter from "./categoriesRoutes.js";
import gamesRouter from "./gamesRoutes.js";

const router = Router();
router.use("/categories", categoriesRouter);
router.use("/games", gamesRouter);

export default router;
