import { getContext, setContext } from "svelte";

/** Getter objects keep the contexts reactive. */
export interface EnvironmentVariablesContextValue {
	readonly showValues: boolean;
	setShowValues: (show: boolean) => void;
}

export interface EnvironmentVariableContextValue {
	readonly name: string;
	readonly value: string;
}

const LIST_KEY = Symbol("ai-environment-variables");
const ITEM_KEY = Symbol("ai-environment-variable");

export function setEnvironmentVariablesContext(
	value: EnvironmentVariablesContextValue,
) {
	return setContext(LIST_KEY, value);
}

export function useEnvironmentVariablesContext(): EnvironmentVariablesContextValue {
	const ctx = getContext<EnvironmentVariablesContextValue | undefined>(
		LIST_KEY,
	);
	if (!ctx) {
		throw new Error(
			"Environment variable parts must be used within <EnvironmentVariables>",
		);
	}
	return ctx;
}

export function setEnvironmentVariableContext(
	value: EnvironmentVariableContextValue,
) {
	return setContext(ITEM_KEY, value);
}

export function useEnvironmentVariableContext(): EnvironmentVariableContextValue {
	const ctx = getContext<EnvironmentVariableContextValue | undefined>(ITEM_KEY);
	if (!ctx) {
		throw new Error(
			"EnvironmentVariable parts must be used within <EnvironmentVariable>",
		);
	}
	return ctx;
}
