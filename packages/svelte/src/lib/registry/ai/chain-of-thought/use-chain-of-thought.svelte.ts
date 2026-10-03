// Derived from Svelte AI Elements (MIT), modified for Edmi UI.
import { getContext, setContext } from "svelte";

/** Getter object so consumers stay reactive. */
export interface ChainOfThoughtContextValue {
	readonly isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

const KEY = Symbol("ai-chain-of-thought");

export function setChainOfThoughtContext(value: ChainOfThoughtContextValue) {
	return setContext(KEY, value);
}

export function useChainOfThought(): ChainOfThoughtContextValue {
	const ctx = getContext<ChainOfThoughtContextValue | undefined>(KEY);
	if (!ctx)
		throw new Error(
			"ChainOfThought components must be used within <ChainOfThought>",
		);
	return ctx;
}
