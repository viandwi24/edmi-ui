// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { getContext, setContext } from "svelte";

const KEY = Symbol("ai-snippet");

export interface SnippetContext {
	readonly code: string;
}

export function setSnippetContext(ctx: SnippetContext) {
	setContext(KEY, ctx);
}

export function useSnippetContext(): SnippetContext {
	const ctx = getContext<SnippetContext | undefined>(KEY);
	if (!ctx) throw new Error("Snippet components must be used within Snippet");
	return ctx;
}
