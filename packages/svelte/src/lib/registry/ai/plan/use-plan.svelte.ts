// Derived from Svelte AI Elements (MIT), modified for Edmi UI.
import { getContext, setContext } from "svelte";

/** Getter object so consumers stay reactive. */
export interface PlanContextValue {
	readonly isStreaming: boolean;
}

const KEY = Symbol("ai-plan");

export function setPlanContext(value: PlanContextValue) {
	return setContext(KEY, value);
}

export function usePlan(): PlanContextValue {
	const ctx = getContext<PlanContextValue | undefined>(KEY);
	if (!ctx) throw new Error("Plan components must be used within <Plan>");
	return ctx;
}
