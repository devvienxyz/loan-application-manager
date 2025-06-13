import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/server.ts"],
	format: ["esm"],
	outDir: "dist",
	target: "node20",
	splitting: false,
	clean: true,
});
