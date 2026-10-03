// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { ComputedRef, InjectionKey } from "vue";
import { inject } from "vue";

export interface SnippetContextValue {
	code: ComputedRef<string>;
}

export const SnippetKey: InjectionKey<SnippetContextValue> =
	Symbol("SnippetContext");

export function useSnippetContext(componentName: string): SnippetContextValue {
	const context = inject(SnippetKey);
	if (!context) {
		throw new Error(`${componentName} must be used within Snippet`);
	}
	return context;
}
