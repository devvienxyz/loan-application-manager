import { Router } from "express";
import { getMe, login, logout, refresh, signup } from "./controller";
import { authenticate } from "./middleware";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);
router.post("/signup", signup);

export default router;
