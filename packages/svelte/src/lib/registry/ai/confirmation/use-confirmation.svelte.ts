// Derived from Svelte AI Elements (MIT), modified for Edmi UI.
import type { ToolUIPart } from "ai";
import { getContext, setContext } from "svelte";

export type ToolUIPartApproval =
	| { id: string; approved?: never; reason?: never }
	| { id: string; approved: boolean; reason?: string }
	| undefined;

/** Getter object so consumers stay reactive. */
export interface ConfirmationContextValue {
	readonly approval: ToolUIPartApproval;
	readonly state: ToolUIPart["state"];
	readonly raised: boolean;
}

const KEY = Symbol("ai-confirmation");

export function setConfirmationContext(value: ConfirmationContextValue) {
	return setContext(KEY, value);
}

export function useConfirmation(): ConfirmationContextValue {
	const ctx = getContext<ConfirmationContextValue | undefined>(KEY);
	if (!ctx) throw new Error("Confirmation components must be used within <Confirmation>");
	return ctx;
}

export function useConfirmationOptional(): ConfirmationContextValue | undefined {
	return getContext<ConfirmationContextValue | undefined>(KEY);
}
