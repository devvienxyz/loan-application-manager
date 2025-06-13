type ValidUserMinimumInfo = {
	id: string;
	email: string;
	role: "admin" | "user";
} | null;

// TODO: Replace with real user validation logic
export const validateUser = async (email: string, password: string): Promise<ValidUserMinimumInfo> => {
	if (email === "admin@example.com" && password === "admin123") {
		return { id: "u1", email, role: "admin" };
	}
	return null;
};
