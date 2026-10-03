import { fileURLToPath } from "node:url";
import adapter from "@sveltejs/adapter-auto";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const pkg = fileURLToPath(new URL(".", import.meta.url)).replace(/\/$/, "");
const lib = `${pkg}/src/lib`;

export default defineConfig({
	resolve: {
		alias: [
			// Registry sources import `$lib/...` (shadcn-svelte defaults); SvelteKit 3 no longer defines it.
			{ find: /^\$lib(?=\/|$)/, replacement: lib },
			// Demos in apps/docs import `@edmi-svelte/ui/<x>`.
			{ find: /^@edmi-svelte(?=\/)/, replacement: `${lib}/registry` },
			// Demos live outside this package: resolve their bare deps from here.
			{
				find: /^(layerchart|@tanstack\/(?:svelte-table|table-core))(?=\/|$)/,
				replacement: `${pkg}/node_modules/$1`,
			},
		],
		dedupe: ["svelte"],
	},
	// The preview route renders demos that live in apps/docs (outside this package).
	server: { fs: { allow: ["../.."] } },
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
		}),
	],
});
