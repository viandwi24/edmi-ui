// Derived from Svelte AI Elements (MIT), modified for Edmi UI.
import { getContext, setContext } from "svelte";

/** Getter object so consumers stay reactive. */
export interface ReasoningContextValue {
	readonly isStreaming: boolean;
	readonly isOpen: boolean;
	readonly duration: number | undefined;
	setIsOpen: (open: boolean) => void;
}

const REASONING_KEY = Symbol("ai-reasoning");

export function setReasoningContext(value: ReasoningContextValue) {
	return setContext(REASONING_KEY, value);
}

export function useReasoning(): ReasoningContextValue {
	const ctx = getContext<ReasoningContextValue | undefined>(REASONING_KEY);
	if (!ctx)
		throw new Error("Reasoning components must be used within <Reasoning>");
	return ctx;
}
