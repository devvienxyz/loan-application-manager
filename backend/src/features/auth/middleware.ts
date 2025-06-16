import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "./types";
import { verifyAccessToken } from "./tokens";

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
	if (!req.user) {
		res.sendStatus(401);
		return;
	}
	next();
};

export const decodeAccessToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
): void => {
	const token = req.signedCookies?.access_token;

  if (!token) return next();
	try {
		req.user = verifyAccessToken(token);
	} catch {
	}

	next();
};