import { Router } from "express";
import { login, logout, refresh, signup } from "./controller";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
// router.get("/me", authenticate, getMe);
router.post("/signup", signup);

export default router;
