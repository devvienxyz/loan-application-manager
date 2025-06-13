import type { Response } from "express";

export const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
	const isProd = process.env.NODE_ENV === "production";

	res
		.cookie("access_token", accessToken, {
			httpOnly: true,
			signed: true,
			sameSite: "strict",
			secure: isProd,
			maxAge: 15 * 60 * 1000,
		})
		.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			signed: true,
			sameSite: "strict",
			secure: isProd,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
};
