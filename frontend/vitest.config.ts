import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@loan-app-mgr/shared": path.resolve(__dirname, "../shared/src"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.ts",
		css: false,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: ["node_modules/", "**/dist/**", "**/__tests__/**", "**/*.d.ts", "src/main.tsx", "src/App.tsx"],
			all: true,
			include: ["src*.{ts,tsx}"],
		},
	},
});
