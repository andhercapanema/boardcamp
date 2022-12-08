import { Router } from "express";
import categoriesRouter from "./categoriesRoutes.js";

const router = Router();
router.use("/categories", categoriesRouter);

export default router;
