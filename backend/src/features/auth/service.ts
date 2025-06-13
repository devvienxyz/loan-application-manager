import bcrypt from "bcryptjs";

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

const users: any[] = []; // TODO: Replace with DB model

export const createUser = async (fullName: string, email: string, password: string) => {
	const existing = users.find((u) => u.email === email);
	if (existing) throw new Error("Email already in use");

	const hashed = await bcrypt.hash(password, 12);
	const newUser = { id: String(users.length + 1), fullName, email, password: hashed, role: "user" };

	users.push(newUser); // Replace with DB insert
	return { id: newUser.id, email: newUser.email, role: newUser.role };
};
