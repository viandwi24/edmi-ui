import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [vue(), tailwindcss()],
	resolve: {
		alias: [
			{
				find: "@edmi-vue/ui",
				replacement: resolve(import.meta.dirname, "./registry/ui"),
			},
			{
				find: "@edmi-vue/components",
				replacement: resolve(import.meta.dirname, "./registry/components"),
			},
			{
				find: "@/registry/edmi",
				replacement: resolve(import.meta.dirname, "./registry"),
			},
			{ find: "@", replacement: resolve(import.meta.dirname, "./src") },
		],
	},
});
