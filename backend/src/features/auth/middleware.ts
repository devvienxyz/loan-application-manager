import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "./types.ts";
import { verifyAccessToken } from "./tokens.ts";
import { normalizeTokenPayloadToUser } from "./utils.ts";

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


export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies?.access_token;

  if (!token) {
    res.sendStatus(401);
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = normalizeTokenPayloadToUser(payload);
    return next();
  } catch {
    res.sendStatus(401);
    return;
  }
}

export function authorizeAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.user?.role && req.user?.role.toLowerCase() !== "admin") {
    res.status(403).json({ message: "Forbidden request." });
    return;
  }
  next();
}
