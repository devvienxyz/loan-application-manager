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
}
