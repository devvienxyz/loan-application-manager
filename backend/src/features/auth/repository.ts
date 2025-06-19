import prisma from "@/lib/prisma.ts";

export const UserRepository = {
  findByEmail: async (email: string) => prisma.user.findUnique({ where: { email } }),
  create: async (data: { fullName: string; email: string; password: string; role: string }) =>
    prisma.user.create({ data }),
};
