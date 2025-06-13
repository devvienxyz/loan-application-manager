import type { User } from "@loan-app-mgr/shared/types/auth";
import type { Request, Response } from "express";
import { createUser, validateUser } from "./service";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "./tokens";
import { setAuthCookies } from "./utils";

const buildPayload = (user: User) => ({
	userId: user.id,
	email: user.email,
	role: user.role,
});

export const signup = async (req: Request, res: Response) => {
	const { fullName, email, password } = req.body;
	if (!email || !password || !fullName) return res.status(400).json({ message: "Missing fields" });

	try {
		const user = await createUser(fullName, email, password);
		const payload = buildPayload(user);

		setAuthCookies(res, signAccessToken(payload), signRefreshToken(payload));
		res.status(201).json({ message: "User registered" });
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message || "Signup failed" });
		} else {
			res.status(400).json({ message: "Signup failed" });
		}
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await validateUser(email, password);

	if (!user) return res.status(401).json({ message: "Invalid credentials" });

	const payload = buildPayload(user);

	setAuthCookies(res, signAccessToken(payload), signRefreshToken(payload));
	res.json({ message: "Logged in" });
};

export const refresh = (req: Request, res: Response) => {
	const token = req.signedCookies?.refresh_token;

	if (!token) return res.sendStatus(401);

	try {
		const payload = verifyRefreshToken(token);

		setAuthCookies(res, signAccessToken(payload), token); // reuse refresh
		res.json({ message: "Token refreshed" });
	} catch {
		res.sendStatus(401);
	}
};

export const logout = (_req: Request, res: Response) => {
	res.clearCookie("access_token").clearCookie("refresh_token").sendStatus(204);
};

export const getMe = (req: Request, res: Response) => {
	res.json({ user: req.user });
};
