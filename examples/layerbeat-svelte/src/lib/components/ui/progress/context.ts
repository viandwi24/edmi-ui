import { getContext, setContext } from "svelte";

const key = Symbol("edmi-progress-percent");

/** Getter for the current percent (0-100), or null when indeterminate. */
export function setProgressPercent(get: () => number | null) {
	setContext(key, get);
}

export function getProgressPercent(): () => number | null {
	return getContext<(() => number | null) | undefined>(key) ?? (() => null);
}
