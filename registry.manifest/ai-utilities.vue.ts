import type { FrameworkEntry } from "./types.ts";

/** Vue uses `useVModel` from @vueuse/core instead of a hook item. */
export const entries: Record<string, FrameworkEntry> = {
	"ai-use-controllable-state": { skip: true },
};
