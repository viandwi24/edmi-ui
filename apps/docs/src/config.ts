/** Shared site constants (keep in sync with astro.config.mjs). */
export const SITE = "https://viandwi24.github.io";
export const BASE = "/edmi-ui";
export const EDMI_URL = `${SITE}${BASE}`;
export const GITHUB = "viandwi24/edmi-ui";

export const FRAMEWORKS = ["react", "vue", "svelte"] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export const FRAMEWORK_LABEL: Record<Framework, string> = {
	react: "React",
	vue: "Vue",
	svelte: "Svelte",
};

export const DEMO_EXT: Record<Framework, string> = {
	react: "tsx",
	vue: "vue",
	svelte: "svelte",
};

export const CODE_LANG: Record<Framework, string> = {
	react: "tsx",
	vue: "vue",
	svelte: "svelte",
};

export function installCommand(fw: Framework, name: string): string {
	switch (fw) {
		case "react":
			return `bunx shadcn@latest add @edmi-ui/${name}`;
		case "vue":
			return `bunx shadcn-vue@latest add @edmi-ui/${name}`;
		case "svelte":
			return `bunx shadcn-svelte@latest add ${EDMI_URL}/r/svelte/${name}.json`;
	}
}

/** Sidebar groups: directory under src/content/docs/components -> label (registry.manifest group files). */
export const COMPONENT_GROUPS: { dir: string; label: string }[] = [
	{ dir: "actions", label: "Actions" },
	{ dir: "forms-text", label: "Forms · Text" },
	{ dir: "forms-choice", label: "Forms · Choice" },
	{ dir: "display", label: "Display" },
	{ dir: "overlays", label: "Overlays" },
	{ dir: "navigation", label: "Navigation" },
	{ dir: "layout", label: "Layout" },
	{ dir: "data", label: "Data" },
	{ dir: "conversation", label: "Conversation" },
	{ dir: "patterns", label: "Patterns" },
	{ dir: "meta", label: "Meta" },
];
