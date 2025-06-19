import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";

async function main() {
  const hashedPassword = await bcrypt.hash("securetestpassword", 12);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      fullName: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      fullName: "Regular User",
      email: "user@example.com",
      password: hashedPassword,
      role: "user",
    },
  });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
