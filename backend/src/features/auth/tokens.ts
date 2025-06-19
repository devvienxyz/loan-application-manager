import type { AuthTokenPayload } from "@loan-app-mgr/shared/types/auth";
import jwt from "jsonwebtoken";
import { getConfig } from "@/config.ts";

const config = getConfig();

export const signAccessToken = (payload: AuthTokenPayload) => {
  const { exp, iat, ...cleanPayload } = payload;
  return jwt.sign(cleanPayload, config.accessTokenSecret, { expiresIn: "1m" });
}

export const signRefreshToken = (payload: AuthTokenPayload) => {
  const { exp, iat, ...cleanPayload } = payload;
  return jwt.sign(cleanPayload, config.refreshTokenSecret, { expiresIn: "7d" });
}

export const verifyAccessToken = (token: string): AuthTokenPayload => jwt.verify(token, config.accessTokenSecret) as AuthTokenPayload;

export const verifyRefreshToken = (token: string): AuthTokenPayload => jwt.verify(token, config.refreshTokenSecret) as AuthTokenPayload;
