// @ts-check
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { edmiResolve } from "./plugins/edmi-resolve.mjs";
import { genIslands } from "./plugins/gen-islands.mjs";
import { vueNoReactRefresh } from "./plugins/vue-no-react-refresh.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "../..");

// Light-scope copy of tokens.css (`:root` -> `.edmi-light`) so a preview card can be forced to light
// while the site is dark.
{
	const css = readFileSync(
		resolve(repoRoot, "packages/tokens/src/tokens.css"),
		"utf8",
	);
	const lightBlock = css.slice(
		css.indexOf("\n:root {") + 1,
		css.indexOf("\n.dark {"),
	);
	const out = resolve(here, "src/styles/tokens-light.generated.css");
	mkdirSync(dirname(out), { recursive: true });
	writeFileSync(
		out,
		`/* generated */\n${lightBlock.replace(":root", ".edmi-light")}`,
	);
}

genIslands(here);

const groups = [
	["actions", "Actions"],
	["forms-text", "Forms · Text"],
	["forms-choice", "Forms · Choice"],
	["display", "Display"],
	["overlays", "Overlays"],
	["navigation", "Navigation"],
	["layout", "Layout"],
	["data", "Data"],
	["conversation", "Conversation"],
	["patterns", "Patterns"],
	["meta", "Meta"],
]; // keep in sync with src/config.ts COMPONENT_GROUPS

const darkSync = `(function(){var d=document.documentElement;function s(){d.classList.toggle('dark',d.dataset.theme==='dark')}s();new MutationObserver(s).observe(d,{attributes:true,attributeFilter:['data-theme']})})();`;

// Global framework choice: set <html data-fw> before paint, keep it in sync with the header select / demos.
const fwSync = `(function(){var d=document.documentElement,K='edmi-framework',v='react';try{v=localStorage.getItem(K)||v}catch(e){}if(['react','vue','svelte'].indexOf(v)<0)v='react';d.dataset.fw=v;window.addEventListener(K,function(e){d.dataset.fw=e.detail});document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-fw-set]');if(b){var f=b.getAttribute('data-fw-set');try{localStorage.setItem(K,f)}catch(x){}window.dispatchEvent(new CustomEvent(K,{detail:f}))}})})();`;

// https://astro.build/config
export default defineConfig({
	site: "https://viandwi24.github.io",
	base: "/edmi-ui",
	output: "static",
	integrations: [
		starlight({
			title: "Edmi UI",
			description:
				"Editorial-minimalist shadcn-compatible registry for React, Vue and Svelte.",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/viandwi24/edmi-ui",
				},
			],
			components: {
				Header: "./src/components/overrides/Header.astro",
				ThemeSelect: "./src/components/overrides/ThemeSelect.astro",
				SocialIcons: "./src/components/overrides/SocialIcons.astro",
				PageTitle: "./src/components/overrides/PageTitle.astro",
			},
			customCss: ["./src/styles/global.css"],
			head: [
				{
					tag: "link",
					attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
				},
				{
					tag: "link",
					attrs: {
						rel: "stylesheet",
						href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Sora:wght@600&display=swap",
					},
				},
				{ tag: "script", content: darkSync },
				{ tag: "script", content: fwSync },
			],
			sidebar: [
				{
					label: "Getting started",
					items: [
						{ label: "React", slug: "getting-started/react" },
						{ label: "Vue", slug: "getting-started/vue" },
						{ label: "Svelte", slug: "getting-started/svelte" },
					],
				},
				{
					label: "Components",
					items: [
						{ label: "Overview", link: "/components/" },
						...groups.map(([dir, label]) => ({
							label,
							collapsed: true,
							items: [{ autogenerate: { directory: `components/${dir}` } }],
						})),
					],
				},
				{ label: "Theming", slug: "theming" },
				{ label: "Rules", slug: "rules" },
				{ label: "Changelog", slug: "changelog" },
			],
		}),
		// Scope React (and its Fast Refresh) to React files; the default filter matches every .ts/.tsx.
		// Vue SFCs still receive `$RefreshSig$` through plugin-vue, see vueNoReactRefresh below.
		react({
			include: [
				"**/packages/react/**",
				"**/src/demos/react/**",
				"**/src/components/landing/**",
				"**/src/components/thumbs/**",
				"**/src/components/islands/react/**",
			],
		}),
		vue(),
		svelte(),
	],
	vite: {
		plugins: [edmiResolve(repoRoot), tailwindcss(), vueNoReactRefresh()],
		resolve: {
			dedupe: [
				"react",
				"react-dom",
				"vue",
				"svelte",
				"sonner",
				"vue-sonner",
				"svelte-sonner",
				"@base-ui/react",
				"reka-ui",
				"bits-ui",
				"react-day-picker",
				"recharts",
				"@internationalized/date",
			],
		},
		server: { fs: { allow: [repoRoot] } },
		ssr: {
			noExternal: [
				"@base-ui/react",
				"reka-ui",
				"bits-ui",
				"cmdk",
				"sonner",
				"vue-sonner",
				"svelte-sonner",
			],
		},
	},
});
