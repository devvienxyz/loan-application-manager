import type { User } from "@loan-app-mgr/shared/types/auth";
import type { Request, RequestHandler, Response } from "express";
import { createUser, validateUser } from "./service";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "./tokens";
import type { AuthenticatedRequest, LoginRequestBody, SignupRequestBody } from "./types";
import { formatUserResponse, setAuthCookies } from "./utils";

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
		const user: User | null = await createUser(fullName, email, password);

		setAuthCookies(res, signAccessToken(user), signRefreshToken(user));
		res.status(201).json({ user: formatUserResponse(user) });
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
	const user: User | null = await validateUser(email, password);

	if (!user) {
		res.status(401).json({ message: "Invalid credentials" });
		return;
	}

	setAuthCookies(res, signAccessToken(user), signRefreshToken(user));
	res.json({ user: formatUserResponse(user) });
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

export const getMe = (req: AuthenticatedRequest, res: Response) => {
  const { fullName, role } = req?.user || {};

  res.json({ user: { fullName, role } });
};
