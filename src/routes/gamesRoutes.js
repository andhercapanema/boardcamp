import { Router } from "express";
import { getGames } from "../controllers/gamesControllers.js";

const router = Router();

router.get("/", getGames);

export default router;
