export interface AuthCredentials {
	email: string;
	password: string;
}

export interface AuthTokenPayload {
	id: string;
	email: string;
	role?: string;
	iat?: number;
	exp?: number;
  fullName?: string;
}

export interface RegisterInput extends AuthCredentials {
	fullName: string;
	role?: "admin" | "user" | null;
}

export interface RegisterResponse {
	message: string;
}

export interface User {
	id: string;
	email: string;
	role: string;
  fullName: string;
}

export type RegisterFormData = {
	fullName: string;
	email: string;
	password: string;
};

export type GetMeData = {
  fullName: string;
  role: string;
}

export type LoginFormData = { email: string; password: string };
