import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "./types";

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
	if (!req.user) {
		res.sendStatus(401);
		return;
	}
	next();
};
