import type { User } from "@loan-app-mgr/shared/types/auth";
import bcrypt from "bcryptjs";
import { UserRepository } from "./repository.ts";

export const validateUser = async (email: string, password: string): Promise<User | null> => {
  const user = await UserRepository.findByEmail(email);

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return { id: user.id, email: user.email, role: user.role as "admin" | "user", fullName: user.fullName };
};

export const createUser = async (
  fullName: string,
  email: string,
  password: string,
): Promise<Omit<User, "password">> => {
  const existing = await UserRepository.findByEmail(email);
  if (existing) throw new Error("Email already in use");

  const hashed = await bcrypt.hash(password, 12);
const newUser = await UserRepository.create({
    fullName,
    email,
    password: hashed,
    role: "user",
  });

  return { id: newUser.id, email: newUser.email, role: newUser.role, fullName: newUser.fullName };
};
