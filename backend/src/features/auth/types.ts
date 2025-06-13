import type { AuthTokenPayload } from "@loan-app-mgr/shared/types/auth";
import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
	cookies: Record<string, string>;
	user?: AuthTokenPayload;
	signedCookies: {
		[key: string]: string;
	};
}

export interface AuthResponse {
	accessToken: string;
	refreshToken?: string;
	user: {
		id: string;
		email: string;
		fullName: string;
		role?: string;
	};
}

export interface LoginRequestBody {
	email: string;
	password: string;
}

export interface LoginResponseBody {
	message: string;
}

export interface SignupRequestBody {
	fullName: string;
	email: string;
	password: string;
}
