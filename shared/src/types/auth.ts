export interface AuthCredentials {
	email: string;
	password: string;
}

export interface AuthTokenPayload {
	userId: string;
	email: string;
	role?: string;
	iat?: number;
	exp?: number;
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
}
