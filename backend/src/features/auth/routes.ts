import { Router } from "express";
import { getMe, login, logout, refresh } from "./controller";
import { requireAuth } from "./middleware";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, getMe);

export default router;
