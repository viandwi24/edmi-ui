import type { InjectionKey, Ref } from "vue";
import { inject } from "vue";

export interface ChainOfThoughtContextValue {
	isOpen: Ref<boolean>;
	setIsOpen: (open: boolean) => void;
}

export const ChainOfThoughtKey: InjectionKey<ChainOfThoughtContextValue> =
	Symbol("ChainOfThoughtContext");

export function useChainOfThoughtContext() {
	const ctx = inject(ChainOfThoughtKey);
	if (!ctx)
		throw new Error(
			"ChainOfThought components must be used within <ChainOfThought>",
		);
	return ctx;
}
