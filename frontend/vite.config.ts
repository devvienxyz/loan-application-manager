import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [react()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
				"@features": path.resolve(__dirname, "src/features"),
			},
		},
		server: {
			proxy: {
				"/api": {
					target: env.VITE_API_PROXY || "http://localhost:3000",
					changeOrigin: true,
					secure: false,
					rewrite: (path) => path.replace(/^\/api/, ""),
					configure: (proxy) => {
						proxy.on("proxyReq", (proxyReq, req) => {
							console.log("Proxying:", req.method, req.url);
						});
						proxy.on("proxyRes", (res, req) => {
							console.log("Back from target:", res.statusCode, req.url);
						});
					},
				},
			},
		},
	};
});
