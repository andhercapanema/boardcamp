import { Router } from "express";
import categoriesRouter from "./categoriesRoutes.js";
import gamesRouter from "./gamesRoutes.js";
import customersRouter from "./customersRoutes.js";
import rentalsRouter from "./rentalsRoutes.js";

const router = Router();
router.use("/categories", categoriesRouter);
router.use("/games", gamesRouter);
router.use("/customers", customersRouter);
router.use("/rentals", rentalsRouter);

export default router;
