import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
	FRAMEWORKS,
	type Framework,
	type FrameworkEntry,
	type Item,
	type ItemType,
} from "../../registry.manifest/types.ts";

export const DEFAULT_EDMI_URL = "https://ui.edmi.dev";

export const SCHEMAS: Record<Framework, string> = {
	react: "https://ui.shadcn.com/schema/registry.json",
	vue: "https://shadcn-vue.com/schema/registry.json",
	svelte: "https://shadcn-svelte.com/schema/registry.json",
};

/** Item types the target port cannot express, and what we emit instead. */
const TYPE_MAP: Record<Framework, Partial<Record<ItemType, ItemType>>> = {
	react: {},
	vue: { "registry:base": "registry:block" },
	svelte: { "registry:base": "registry:style" },
};

/** Ports without a matching registry:font get fonts through the theme `css` instead. */
const FONT_ITEMS: Record<Framework, boolean> = {
	react: true,
	vue: false,
	svelte: false,
};

export type GenOptions = {
	/** Repo root (contains `packages/`). */
	root: string;
	/** Write `<outDir>/<fw>/registry.json` for all frameworks instead of `packages/<fw>`. */
	outDir?: string;
	strict?: boolean;
	edmiUrl?: string;
	/**
	 * URL layout of the registry JSON files the generated items point at:
	 * `framework` (default, Pages) -> `<edmiUrl>/r/<fw>/<name>.json`;
	 * `flat` (npm @edmi-ui/registry-<fw> packages, one framework per package) -> `<edmiUrl>/r/<name>.json`.
	 */
	urlLayout?: UrlLayout;
};

export type UrlLayout = "framework" | "flat";

/** Base URL of the registry JSON files for `fw` (no trailing slash). */
export function registryBaseUrl(
	fw: Framework,
	edmiUrl: string,
	layout: UrlLayout = "framework",
): string {
	const base = `${edmiUrl.replace(/\/+$/, "")}/r`;
	return layout === "flat" ? base : `${base}/${fw}`;
}

export type FrameworkResult = {
	framework: Framework;
	registry: Record<string, unknown>;
	errors: string[];
	warnings: string[];
};

export function mapType(type: ItemType, fw: Framework): ItemType {
	return TYPE_MAP[fw][type] ?? type;
}

export function rewriteDependency(
	name: string,
	fw: Framework,
	edmiUrl: string,
	layout: UrlLayout = "framework",
): string {
	return fw === "svelte"
		? `${registryBaseUrl(fw, edmiUrl, layout)}/${name}.json`
		: `@edmi-ui/${name}`;
}

const uniqSorted = (xs: string[]) => [...new Set(xs)].sort();

type Plan = { item: Item; entry: FrameworkEntry; type: ItemType };

/** Items that ship for `fw`, with their effective (mapped) type. */
function plan(manifest: Item[], fw: Framework): Map<string, Plan> {
	const out = new Map<string, Plan>();
	for (const item of manifest) {
		const entry = item.frameworks[fw];
		if (!entry || entry.skip) continue;
		const type = mapType(entry.type ?? item.type, fw);
		if (type === "registry:font" && !FONT_ITEMS[fw]) continue;
		out.set(item.name, { item, entry, type });
	}
	return out;
}

export function buildFramework(
	manifest: Item[],
	fw: Framework,
	opts: GenOptions,
): FrameworkResult {
	const errors: string[] = [];
	const warnings: string[] = [];
	const edmiUrl = opts.edmiUrl ?? DEFAULT_EDMI_URL;
	const strict = opts.strict ?? false;
	const layout = opts.urlLayout ?? "framework";
	const known = new Set(manifest.map((i) => i.name));
	const shipped = plan(manifest, fw);
	const pkgDir = join(opts.root, "packages", fw);
	const items: Record<string, unknown>[] = [];

	for (const [name, { item, entry, type }] of shipped) {
		const where = `[${fw}] ${name}`;
		const required =
			entry.registryDependencies ?? item.registryDependencies ?? [];
		const deps: string[] = [];
		for (const dep of required) {
			if (!known.has(dep))
				errors.push(`${where}: unknown registryDependency "${dep}"`);
			else if (!shipped.has(dep))
				errors.push(
					`${where}: registryDependency "${dep}" is not available for ${fw} (skipped or not ported)`,
				);
			else deps.push(dep);
		}
		for (const dep of item.optionalRegistryDependencies ?? [])
			if (shipped.has(dep)) deps.push(dep);
		if (item.aggregate === "ui")
			for (const [n, p] of shipped)
				if (n !== name && p.type === "registry:ui") deps.push(n);

		const files = (entry.files ?? []).map((f) => {
			const path = f.path.replace(/^\.\//, "");
			if (!existsSync(join(pkgDir, path)))
				(strict ? errors : warnings).push(
					`${where}: file not found: packages/${fw}/${path}`,
				);
			const file: Record<string, string> = { path, type: f.type ?? type };
			if (f.target) file.target = f.target;
			return file;
		});

		const out: Record<string, unknown> = {
			name,
			type,
			title: item.title,
			description: item.description,
		};
		if (entry.dependencies?.length)
			out.dependencies = uniqSorted(entry.dependencies);
		if (entry.devDependencies?.length)
			out.devDependencies = uniqSorted(entry.devDependencies);
		out.registryDependencies = uniqSorted(deps).map((d) =>
			rewriteDependency(d, fw, edmiUrl, layout),
		);
		out.files = files;
		if (entry.cssVars) out.cssVars = entry.cssVars;
		if (entry.css) out.css = entry.css;
		if (entry.font) out.font = entry.font;
		// `config` only exists on registry:base items (Svelte's registry.json items reject it).
		if (type === "registry:base" && fw === "react" && entry.config) {
			// The CLI merges `config` into components.json before resolving registryDependencies,
			// so `init <url>/edmi.json` can resolve `@edmi-ui/*` and leaves the namespace configured.
			out.config = {
				...entry.config,
				registries: {
					"@edmi-ui": `${registryBaseUrl(fw, edmiUrl, layout)}/{name}.json`,
					...(entry.config.registries as object | undefined),
				},
			};
		} else if (entry.config && type === "registry:base")
			out.config = entry.config;
		if (entry.extends && type === "registry:base") out.extends = entry.extends;
		if (fw === "svelte") {
			// Svelte registry.json items are strict: no docs/categories/envVars, so they ride in `meta`.
			const meta: Record<string, unknown> = { ...entry.meta };
			if (item.docs) meta.docs = item.docs;
			if (item.categories.length) meta.categories = item.categories;
			if (Object.keys(meta).length) out.meta = meta;
		} else {
			if (entry.envVars) out.envVars = entry.envVars;
			if (entry.meta) out.meta = entry.meta;
			if (item.docs) out.docs = item.docs;
			if (item.categories.length) out.categories = item.categories;
		}
		items.push(out);
	}

	items.sort((a, b) =>
		(a.name as string).localeCompare(b.name as string, "en"),
	);
	return {
		framework: fw,
		registry: {
			$schema: SCHEMAS[fw],
			name: "edmi",
			homepage: edmiUrl,
			items,
		},
		errors,
		warnings,
	};
}

/** Manifest-level checks shared by every framework. */
export function validateManifest(manifest: Item[]): string[] {
	const errors: string[] = [];
	const seen = new Set<string>();
	for (const item of manifest) {
		if (seen.has(item.name)) errors.push(`duplicate item name "${item.name}"`);
		seen.add(item.name);
	}
	return errors;
}

export const serialize = (registry: unknown) =>
	`${JSON.stringify(registry, null, 2)}\n`;

export type GenSummary = {
	written: string[];
	skipped: Framework[];
	errors: string[];
	warnings: string[];
};

export function generate(
	manifest: Item[],
	opts: GenOptions,
	log: (m: string) => void = () => {},
): GenSummary {
	const summary: GenSummary = {
		written: [],
		skipped: [],
		errors: validateManifest(manifest),
		warnings: [],
	};
	for (const fw of FRAMEWORKS) {
		const pkgDir = join(opts.root, "packages", fw);
		if (!opts.outDir && !existsSync(pkgDir)) {
			summary.skipped.push(fw);
			log(`skip ${fw}: packages/${fw} does not exist`);
			continue;
		}
		const r = buildFramework(manifest, fw, opts);
		summary.errors.push(...r.errors);
		summary.warnings.push(...r.warnings);
		if (summary.errors.length) continue;
		const file = opts.outDir
			? join(opts.outDir, fw, "registry.json")
			: join(pkgDir, "registry.json");
		mkdirSync(dirname(file), { recursive: true });
		writeFileSync(file, serialize(r.registry));
		summary.written.push(file);
		log(`wrote ${file} (${(r.registry.items as unknown[]).length} items)`);
	}
	return summary;
}
