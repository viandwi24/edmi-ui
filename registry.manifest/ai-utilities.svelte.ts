import type { FrameworkEntry } from "./types.ts";

/** Svelte uses `$bindable` props instead of a hook item. */
export const entries: Record<string, FrameworkEntry> = {
	"ai-use-controllable-state": { skip: true },
};
