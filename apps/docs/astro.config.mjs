// @ts-check
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { phosphorIcons } from "../../packages/svelte/phosphor-icons-plugin.mjs";
import { edmiResolve } from "./plugins/edmi-resolve.mjs";
import { genIslands } from "./plugins/gen-islands.mjs";
import { buildSidebar } from "./plugins/sidebar.mjs";
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

// Every base (src/base/*.css) and theme (src/themes/*.css) of @edmi-ui/tokens, so `data-base` / `data-theme`
// work on a scoped wrapper (Themes page). Auto-discovered: dropping a file in those folders is enough.
{
	const tok = resolve(repoRoot, "packages/tokens/src");
	const imports = ["base", "themes"].flatMap((d) =>
		readdirSync(resolve(tok, d))
			.filter((f) => f.endsWith(".css"))
			.sort()
			.map((f) => `@import "../../../../packages/tokens/src/${d}/${f}";`),
	);
	writeFileSync(
		resolve(here, "src/styles/themes.generated.css"),
		`/* generated */\n${imports.join("\n")}\n`,
	);
}

genIslands(here);

// Component/AI category labels (src/config.ts) drive the Components sidebar section.
const { COMPONENT_GROUPS, AI_GROUPS } = await import("./src/config.ts");

const darkSync = `(function(){var d=document.documentElement;function s(){d.classList.toggle('dark',d.dataset.theme==='dark')}s();new MutationObserver(s).observe(d,{attributes:true,attributeFilter:['data-theme']})})();`;

// Global framework choice: set <html data-fw> before paint, keep it in sync with the header select / demos.
const fwSync = `(function(){var d=document.documentElement,K='edmi-framework',v='react';try{v=localStorage.getItem(K)||v}catch(e){}if(['react','vue','svelte'].indexOf(v)<0)v='react';d.dataset.fw=v;window.addEventListener(K,function(e){d.dataset.fw=e.detail});document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-fw-set]');if(b){var f=b.getAttribute('data-fw-set');try{localStorage.setItem(K,f)}catch(x){}window.dispatchEvent(new CustomEvent(K,{detail:f}))}})})();`;

// Global package-manager choice (npm default): set <html data-pm> before paint; any [data-pm-set] button switches it site-wide.
// cmdk scrolls its initially selected item into view on mount, which moves the whole page when a Command
// demo sits below the fold. Ignore scrollIntoView inside [cmdk-root] (items and group headings) until the visitor has interacted.
const cmdkNoAutoScroll = `(function(){var u=false,o=Element.prototype.scrollIntoView;['keydown','pointerdown','wheel','touchstart'].forEach(function(t){window.addEventListener(t,function(){u=true},{capture:true,passive:true,once:true})});Element.prototype.scrollIntoView=function(){if(!u&&this.closest&&this.closest('[cmdk-root]'))return;return o.apply(this,arguments)}})();`;
// Demo islands hydrate after load and shift the layout, so a `#raised` anchor lands in the wrong place. Re-scroll to the hash
// target once after hydration settles, but only while the visitor has not interacted and the hash did not change.
const hashRescroll = `(function(){var h=location.hash;if(h.length<2)return;var u=false;['keydown','pointerdown','wheel','touchstart'].forEach(function(t){window.addEventListener(t,function(){u=true},{capture:true,passive:true,once:true})});function go(){if(u||location.hash!==h)return;var id=decodeURIComponent(h.slice(1)),el=document.getElementById(id)||document.querySelector('h2[id^="'+id+'-"],h3[id^="'+id+'-"]');if(el)el.scrollIntoView()}window.addEventListener('load',function(){[400,1200,2500].forEach(function(ms){setTimeout(go,ms)})})})();`;
const pmSync = `(function(){var d=document.documentElement,K='edmi-pm',v='npm';try{v=localStorage.getItem(K)||v}catch(e){}if(['npm','pnpm','yarn','bun'].indexOf(v)<0)v='npm';d.dataset.pm=v;window.addEventListener(K,function(e){d.dataset.pm=e.detail});document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-pm-set]');if(b){var f=b.getAttribute('data-pm-set');try{localStorage.setItem(K,f)}catch(x){}window.dispatchEvent(new CustomEvent(K,{detail:f}))}})})();`;

const OG_IMAGE = "https://viandwi24.github.io/edmi-ui/og.png";
const OG_ALT =
	"Edmi UI: quiet interfaces for React, Vue and Svelte, with four levels of elevation.";

// https://astro.build/config
export default defineConfig({
	site: "https://viandwi24.github.io",
	base: "/edmi-ui",
	output: "static",
	// Moved routes (docs information architecture): old URLs keep working.
	redirects: {
		"/getting-started/react": "/edmi-ui/getting-started/installation/react",
		"/getting-started/vue": "/edmi-ui/getting-started/installation/vue",
		"/getting-started/svelte": "/edmi-ui/getting-started/installation/svelte",
		"/theming": "/edmi-ui/getting-started/theming",
		"/rules": "/edmi-ui/getting-started/rules",
	},
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
				Sidebar: "./src/components/overrides/Sidebar.astro",
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
				// Social card (shared links show a large image). Absolute URL: site + base.
				...[
					["property", "og:type", "website"],
					["property", "og:site_name", "Edmi UI"],
					["property", "og:image", OG_IMAGE],
					["property", "og:image:width", "1200"],
					["property", "og:image:height", "630"],
					["property", "og:image:alt", OG_ALT],
					["name", "twitter:card", "summary_large_image"],
					["name", "twitter:image", OG_IMAGE],
					["name", "twitter:image:alt", OG_ALT],
				].map(([k, n, content]) => ({
					tag: "meta",
					attrs: { [k]: n, content },
				})),
				{ tag: "script", content: darkSync },
				{ tag: "script", content: fwSync },
				{ tag: "script", content: pmSync },
				{ tag: "script", content: cmdkNoAutoScroll },
				{ tag: "script", content: hashRescroll },
			],
			sidebar: buildSidebar(resolve(here, "src/content/docs"), {
				componentGroups: COMPONENT_GROUPS,
				aiGroups: AI_GROUPS,
			}),
		}),
		// Scope React (and its Fast Refresh) to React files; the default filter matches every .ts/.tsx.
		// Vue SFCs still receive `$RefreshSig$` through plugin-vue, see vueNoReactRefresh below.
		react({
			include: [
				"**/packages/react/**",
				"**/src/demos/react/**",
				"**/src/components/landing/**",
				"**/src/components/themes/**",
				"**/src/components/overrides/**",
				"**/src/components/thumbs/**",
				"**/src/components/islands/react/**",
				"**/src/examples/**/*.tsx",
			],
		}),
		vue(),
		svelte(),
	],
	vite: {
		plugins: [
			edmiResolve(repoRoot),
			phosphorIcons(),
			tailwindcss(),
			vueNoReactRefresh(),
		],
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
				"motion",
				"@xyflow/react",
				"@xyflow/svelte",
				"@vue-flow/core",
				"streamdown",
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
