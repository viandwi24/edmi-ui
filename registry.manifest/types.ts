export const FRAMEWORKS = ["react", "vue", "svelte"] as const;
export type Framework = (typeof FRAMEWORKS)[number];

export type ItemType =
	| "registry:ui"
	| "registry:block"
	| "registry:lib"
	| "registry:hook"
	| "registry:page"
	| "registry:file"
	| "registry:theme"
	| "registry:style"
	| "registry:base"
	| "registry:font"
	| "registry:component";

export type FileEntry = {
	/** Relative to `packages/<fw>` (the directory holding the generated registry.json). */
	path: string;
	/** Defaults to the (mapped) item type. */
	type?: ItemType;
	target?: string;
};

/** CSS tree as accepted by the registry `css` field (strings or nested objects). */
export type CssTree = { [key: string]: string | CssTree };

export type FrameworkEntry = {
	files?: FileEntry[];
	dependencies?: string[];
	devDependencies?: string[];
	/** Passthrough fields, copied verbatim. */
	cssVars?: {
		theme?: Record<string, string>;
		light?: Record<string, string>;
		dark?: Record<string, string>;
	};
	css?: CssTree;
	config?: Record<string, unknown>;
	/** registry:base only: `"none"` stops `init` from also installing a stock shadcn style index. */
	extends?: string;
	font?: {
		family: string;
		provider: "google";
		import: string;
		variable: string;
		weight?: string[];
		subsets?: string[];
		selector?: string;
		dependency?: string;
	};
	envVars?: Record<string, string>;
	meta?: Record<string, unknown>;
	/** Per-framework overrides (Edmi names; rewritten by the generator). */
	type?: ItemType;
	registryDependencies?: string[];
	/** Omit this item for this framework (e.g. the primitive does not exist there). */
	skip?: true;
};

export type Item = {
	/** shadcn name (`button`) or a ✦ name (`inset-panel`). */
	name: string;
	title: string;
	description: string;
	type: ItemType;
	/** DESIGN.md §5 group names. */
	categories: string[];
	/** Edmi item names only; the generator rewrites them per framework. */
	registryDependencies?: string[];
	/**
	 * Edmi names added only when that item exists (and is not skipped/dropped) for the
	 * framework, e.g. `utils` or font items.
	 */
	optionalRegistryDependencies?: string[];
	/**
	 * Add every `registry:ui` item ("ui") or every item categorised "Patterns" ("patterns") available
	 * for the framework to registryDependencies.
	 */
	aggregate?: "ui" | "patterns";
	// "patterns": every item in the "Patterns" category (the ✦ blocks) instead.
	/** One-line install note. */
	docs?: string;
	/** A framework key must be present for the item to be emitted for it. */
	frameworks: Partial<Record<Framework, FrameworkEntry>>;
};
