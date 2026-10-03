import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: [
			{
				find: "@edmi-react",
				replacement: resolve(import.meta.dirname, "./registry"),
			},
			{
				find: "@/registry/edmi",
				replacement: resolve(import.meta.dirname, "./registry"),
			},
			{ find: "@", replacement: resolve(import.meta.dirname, "./src") },
		],
	},
});
