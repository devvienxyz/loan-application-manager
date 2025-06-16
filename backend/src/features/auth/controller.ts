import type { GetMeData, User } from "@loan-app-mgr/shared/types/auth";
import type { Request, RequestHandler, Response } from "express";
import { createUser, validateUser } from "./service";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "./tokens";
import type { LoginRequestBody, SignupRequestBody } from "./types";
import { setAuthCookies } from "./utils";

const buildPayload = (user: User) => ({
	userId: user.id,
	email: user.email,
	role: user.role,
  fullName: user.fullName,
});

//
// SIGNUP
//

type SignupHandler = RequestHandler<unknown, unknown, SignupRequestBody>;
export const signup: SignupHandler = async (req, res) => {
	const { fullName, email, password } = req.body;

  if (!email || !password || !fullName) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

	try {
		const user = await createUser(fullName, email, password);
		const payload = buildPayload(user);

		setAuthCookies(res, signAccessToken(payload), signRefreshToken(payload));
		res.status(201).json({ message: "User registered" });
    // this will auto login the user
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(400).json({ message: err.message || "Signup failed" });
		} else {
			res.status(400).json({ message: "Signup failed" });
		}
	}
};

//
// LOGIN
//

type LoginHandler = RequestHandler<unknown, unknown, LoginRequestBody>;
export const login: LoginHandler = async (req, res) => {
	const { email, password } = req.body;
	const user = await validateUser(email, password);

	if (!user) {
		res.status(401).json({ message: "Invalid credentials" });
		return;
	}

	const payload = buildPayload(user);

	setAuthCookies(res, signAccessToken(payload), signRefreshToken(payload));
	res.json({ message: "Logged in" });
};

//
// REFRESH
//

export const refresh: RequestHandler = (req, res) => {
	const token = req.signedCookies?.refresh_token;

	if (!token) {
    res.sendStatus(401);
    return;
  }

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
  const responseData: GetMeData = {
    fullName: req?.user?.fullName || req?.user?.email || "Guest",
    role: req.user?.role || "user",
  }
	res.json(responseData);
};
