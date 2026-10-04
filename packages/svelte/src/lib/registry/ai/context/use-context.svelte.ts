import type { LanguageModelUsage } from "ai";
import { getContext, setContext } from "svelte";

export type ModelId = string;

/** Getter object so consumers stay reactive when the props change. */
export interface ContextValue {
	readonly usedTokens: number;
	readonly maxTokens: number;
	readonly usage: LanguageModelUsage | undefined;
	readonly modelId: ModelId | undefined;
}

const KEY = Symbol("ai-context");

export function setContextValue(value: ContextValue) {
	return setContext(KEY, value);
}

export function useContextValue(): ContextValue {
	const context = getContext<ContextValue | undefined>(KEY);
	if (!context) {
		throw new Error("Context components must be used within Context");
	}
	return context;
}

export const formatPercent = (value: number) =>
	new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 1,
		style: "percent",
	}).format(value);

export const formatCompact = (value: number) =>
	new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);

export const formatUsd = (value: number) =>
	new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }).format(
		value,
	);
