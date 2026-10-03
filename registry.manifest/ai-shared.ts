import type { FrameworkEntry, Item } from "./types.ts";

/** Category labels of the Edmi AI pack (must start with "AI · ": the generator and docs key off it). */
export const AI_CATEGORIES = {
	chat: "AI · Chat",
	agent: "AI · Agent",
	code: "AI · Code",
	runtime: "AI · Runtime",
	voice: "AI · Voice",
	workflow: "AI · Workflow",
	patterns: "AI · Patterns",
	utilities: "AI · Utilities",
} as const;

type AiDef = {
	/** Stock AI Elements name without prefix (`message`); the registry item becomes `ai-message`. */
	name: string;
	title: string;
	description: string;
	category: (typeof AI_CATEGORIES)[keyof typeof AI_CATEGORIES];
	/** Edmi names: ui items (`button`) or other AI items (`ai-shimmer`). Never stock shadcn items. */
	deps?: string[];
	/** Added only for frameworks that ship that item (e.g. the React-only controllable-state hook). */
	optionalDeps?: string[];
	/** True for the ✦ Edmi additions (not in Vercel AI Elements). */
	edmi?: boolean;
	/** React entry; omit while the React port is pending (item then ships for no framework yet). */
	react?: FrameworkEntry;
	/** Item type; AI items install under `components/ai/` so they are `registry:component`. */
	type?: Item["type"];
};

/**
 * Builds one AI item. Convention (see AGENTS.md "AI pack"): item name `ai-<name>`, React file
 * `registry/components/ai/<name>.tsx` (installs to `components/ai/<name>.tsx`), `registryDependencies`
 * are Edmi names only. Vue/Svelte entries come from the `.vue.ts` / `.svelte.ts` overlays.
 */
export function aiItem(def: AiDef): Item {
	const name = `ai-${def.name}`;
	const edmi = def.edmi ?? def.category === AI_CATEGORIES.patterns;
	return {
		name,
		title: def.title,
		description: def.description,
		type: def.type ?? "registry:component",
		categories: [def.category],
		registryDependencies: def.deps ?? [],
		...(def.optionalDeps
			? { optionalRegistryDependencies: def.optionalDeps }
			: {}),
		docs: edmi
			? `Edmi AI ✦ pattern: \`shadcn add @edmi-ui/${name}\`.`
			: `Edmi AI, restyled from Vercel AI Elements: \`shadcn add @edmi-ui/${name}\`.`,
		frameworks: def.react ? { react: def.react } : {},
	};
}

/** Standard React entry for an AI item: one file under `registry/components/ai/`. */
export function aiReact(
	name: string,
	dependencies: string[] = [],
	extraFiles: string[] = [],
): FrameworkEntry {
	return {
		files: [
			{ path: `registry/components/ai/${name}.tsx` },
			...extraFiles.map((path) => ({ path })),
		],
		dependencies,
	};
}

/**
 * Standard Vue entry: every file lives in `registry/components/ai/<name>/` (installs to
 * `components/ai/<name>/`); `parts` are file names (`Message.vue`), `index.ts` is added last.
 */
export function aiVue(
	name: string,
	parts: string[],
	dependencies: string[] = [],
): FrameworkEntry {
	return {
		files: [...parts, "index.ts"].map((f) => ({
			path: `registry/components/ai/${name}/${f}`,
		})),
		dependencies,
	};
}

/**
 * Standard Svelte entry: sources live in `src/lib/registry/ai/<name>/`. shadcn-svelte flattens the
 * build target, so each file gets an explicit `target: "ai/<name>/<file>"` (resolved against the
 * consumer's `components` alias). Sibling AI imports are RELATIVE (`../shimmer/index.js`): the
 * Svelte builder does not rewrite `$lib/registry/ai/...`.
 */
export function aiSvelte(name: string, files: string[]): FrameworkEntry {
	return {
		type: "registry:component",
		files: files.map((f) => ({
			path: `src/lib/registry/ai/${name}/${f}`,
			target: `ai/${name}/${f}`,
		})),
	};
}
