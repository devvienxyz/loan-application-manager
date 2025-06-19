import { getConfig } from "@/config.ts";
import { AuthTokenPayload, GetMeData, User } from "@loan-app-mgr/shared/types/auth";
import type { Response } from "express";

const config = getConfig();

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res
    .cookie("access_token", accessToken, {
      httpOnly: true,
      signed: true,
      sameSite: config.isProd ? "strict" : "lax",
      secure: config.isProd,
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refresh_token", refreshToken, {
      httpOnly: true,
      signed: true,
      sameSite: config.isProd ? "strict" : "lax",
      secure: config.isProd,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

export const formatUserResponse = (user: User | null | undefined): GetMeData => ({
  fullName: user?.fullName || user?.email || "Guest",
  role: user?.role || "user",
});

export const normalizeTokenPayloadToUser = (payload: AuthTokenPayload): User => ({
  id: payload.id,
  email: payload.email,
  role: payload.role ?? "user",
  fullName: payload.fullName ?? "Guest",
});
