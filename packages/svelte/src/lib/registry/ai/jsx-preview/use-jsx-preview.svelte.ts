// Edmi ✦ port: no upstream Svelte JSX Preview.
import type { Component } from "svelte";
import { getContext, setContext } from "svelte";
import type { JsxNode } from "./parser.js";

/** Getter object keeps the context reactive. */
export interface JSXPreviewContextValue {
	/** Nodes to render (the last good tree while streaming a chunk that does not parse yet). */
	readonly nodes: JsxNode[];
	readonly error: Error | null;
	readonly isStreaming: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: user-supplied components of any prop shape
	readonly components: Record<string, Component<any> | string> | undefined;
	readonly bindings: Record<string, unknown> | undefined;
}

const KEY = Symbol("ai-jsx-preview");

export function setJSXPreviewContext(value: JSXPreviewContextValue) {
	return setContext(KEY, value);
}

export function useJSXPreview(): JSXPreviewContextValue {
	const ctx = getContext<JSXPreviewContextValue | undefined>(KEY);
	if (!ctx) {
		throw new Error("JSXPreview components must be used within <JSXPreview>");
	}
	return ctx;
}
