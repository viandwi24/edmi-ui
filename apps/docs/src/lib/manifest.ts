import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { Item } from "../../../../registry.manifest/types.ts";

// The manifest reads files relative to its own location (import.meta.url), which breaks when
// bundled, so load it natively at runtime instead of through Vite.
let cache: Promise<Item[]> | undefined;
export function loadManifest(): Promise<Item[]> {
	cache ??= import(
		/* @vite-ignore */ pathToFileURL(
			resolve(process.cwd(), "../../registry.manifest/index.ts"),
		).href
	).then((m) => m.manifest as Item[]);
	return cache;
}
