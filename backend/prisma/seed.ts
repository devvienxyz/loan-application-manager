import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";

async function main() {
	const hashedPassword = await bcrypt.hash("admin123", 12);

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

	console.log("✅ Seed complete.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
