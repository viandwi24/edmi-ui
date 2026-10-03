// Derived from AI Elements Vue (Apache-2.0), modified for Edmi UI.
import type { ComputedRef, InjectionKey, Ref } from "vue";
import { inject } from "vue";

export interface EnvironmentVariablesContext {
	showValues: Ref<boolean>;
	setShowValues: (show: boolean) => void;
}

export const EnvironmentVariablesKey: InjectionKey<EnvironmentVariablesContext> =
	Symbol("EnvironmentVariables");

export function useEnvironmentVariablesContext() {
	const ctx = inject(EnvironmentVariablesKey);
	if (!ctx)
		throw new Error(
			"Environment variable parts must be used within <EnvironmentVariables />",
		);
	return ctx;
}

export interface EnvironmentVariableContext {
	name: ComputedRef<string>;
	value: ComputedRef<string>;
}

export const EnvironmentVariableKey: InjectionKey<EnvironmentVariableContext> =
	Symbol("EnvironmentVariable");

export function useEnvironmentVariableContext() {
	const ctx = inject(EnvironmentVariableKey);
	if (!ctx)
		throw new Error(
			"EnvironmentVariable parts must be used within <EnvironmentVariable />",
		);
	return ctx;
}
