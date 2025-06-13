// responsible for bootstrapping and running the exxpress app
import app from "./app";
import { config } from "./config";

try {
	app.listen(config.port, () => {
		console.log(`🚀 Server running on http://localhost:${config.port}`);
	});
} catch (err) {
	console.error("❌ Failed to start server:", err);
}
