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

export const PMS = ["npm", "pnpm", "yarn", "bun"] as const;
export type PackageManager = (typeof PMS)[number];
export const DEFAULT_PM: PackageManager = "npm";
export const PM_KEY = "edmi-pm";

/**
 * Run a package binary (shadcn CLI) with each package manager.
 * `pkg` is the package spec ("shadcn@latest"), `args` the rest of the command line.
 * Bun runs shadcn-svelte with `bunx --bun` (plain bunx fails to download its add-ons).
 */
export function dlx(pm: PackageManager, pkg: string, args = ""): string {
	const tail = args ? ` ${args}` : "";
	switch (pm) {
		case "npm":
			return `npx ${pkg}${tail}`;
		case "pnpm":
			return `pnpm dlx ${pkg}${tail}`;
		case "yarn":
			return `yarn dlx ${pkg}${tail}`;
		case "bun":
			return `${pkg.startsWith("shadcn-svelte") ? "bunx --bun" : "bunx"} ${pkg}${tail}`;
	}
}

/** Install npm packages (`dev` for devDependencies). */
export function pmAdd(
	pm: PackageManager,
	pkgs: string[] | string,
	dev = false,
): string {
	const list = Array.isArray(pkgs) ? pkgs.join(" ") : pkgs;
	switch (pm) {
		case "npm":
			return `npm install ${dev ? "-D " : ""}${list}`;
		case "pnpm":
			return `pnpm add ${dev ? "-D " : ""}${list}`;
		case "yarn":
			return `yarn add ${dev ? "-D " : ""}${list}`;
		case "bun":
			return `bun add ${dev ? "-d " : ""}${list}`;
	}
}

const CLI_PKG: Record<Framework, string> = {
	react: "shadcn@latest",
	vue: "shadcn-vue@latest",
	svelte: "shadcn-svelte@latest",
};

/** `shadcn@latest <args>` for the framework's CLI, run through the chosen package manager. */
export function cliCommand(
	fw: Framework,
	pm: PackageManager,
	args: string,
): string {
	return dlx(pm, CLI_PKG[fw], args);
}

/** Registry argument for `add`: namespaced for React/Vue, a URL for Svelte. */
export function registryRef(fw: Framework, name: string): string {
	return fw === "svelte"
		? `${EDMI_URL}/r/svelte/${name}.json`
		: `@edmi-ui/${name}`;
}

export function installCommand(
	fw: Framework,
	name: string,
	pm: PackageManager = DEFAULT_PM,
): string {
	return cliCommand(fw, pm, `add ${registryRef(fw, name)}`);
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
