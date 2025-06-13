import type { AuthTokenPayload } from "@loan-app-mgr/shared/types/auth";

declare global {
	namespace Express {
		interface Request {
			user?: AuthTokenPayload;
		}
	}
}
