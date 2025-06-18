import "dotenv/config"
import prisma from "../src/lib/prisma.ts";
import bcrypt from "bcryptjs";
import promptSync from "prompt-sync";

const prompt = promptSync();

async function main() {
  const email = prompt("Email: ");
  const fullName = prompt("Full Name: ");
  // hidden input
  const password = prompt("Password: ", { echo: "" });
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("User already exists.");
    return;
  }

  const admin = await prisma.user.create({
    data: {
      email,
      fullName,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("Admin created with ID:", admin.id);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

