import type { AuthTokenPayload } from "@loan-app-mgr/shared/types/auth";
import type { Request, Response } from "express";
import { validateUser } from "./service";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "./tokens";

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await validateUser(email, password);

	if (!user) {
		res.status(401).json({ message: "Invalid credentials" });
		return;
	}

	const payload: AuthTokenPayload = {
		userId: user.id,
		email: user.email,
		role: user.role,
	};

	const accessToken = signAccessToken(payload);
	const refreshToken = signRefreshToken(payload);

	res
		.cookie("access_token", accessToken, {
			httpOnly: true,
			signed: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 15 * 60 * 1000,
		})
		.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			signed: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		})
		.json({ message: "Logged in" });
};

export const refresh = (req: Request, res: Response) => {
	const token = req.signedCookies?.refresh_token;

	if (!token) {
		res.sendStatus(401);
		return;
	}

	try {
		const payload = verifyRefreshToken(token);
		const newAccessToken = signAccessToken(payload);

		res.cookie("access_token", newAccessToken, {
			httpOnly: true,
			signed: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 15 * 60 * 1000,
		});

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
