// responsible for bootstrapping and running the exxpress app
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

try {
	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
	});
} catch (err) {
	console.error("❌ Failed to start server:", err);
}
