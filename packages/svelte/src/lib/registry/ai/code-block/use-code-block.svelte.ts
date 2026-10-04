import { getContext, setContext } from "svelte";

/** Getter object keeps the context reactive. */
export interface CodeBlockContextValue {
	readonly code: string;
}

const KEY = Symbol("ai-code-block");

export function setCodeBlockContext(value: CodeBlockContextValue) {
	return setContext(KEY, value);
}

export function useCodeBlockContext(): CodeBlockContextValue {
	const ctx = getContext<CodeBlockContextValue | undefined>(KEY);
	if (!ctx) {
		throw new Error("CodeBlockCopyButton must be used within <CodeBlock>");
	}
	return ctx;
}
