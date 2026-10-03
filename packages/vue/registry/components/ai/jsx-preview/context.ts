// Edmi ✦ port: no upstream Vue JSX Preview.
import type { Component, ComputedRef, InjectionKey, Ref } from "vue";
import { inject } from "vue";
import type { JsxNode } from "./parser";

export interface JSXPreviewContext {
	/** Nodes to render (the last good tree while streaming a chunk that does not parse yet). */
	nodes: ComputedRef<JsxNode[]>;
	error: Ref<Error | null>;
	isStreaming: ComputedRef<boolean>;
	components: ComputedRef<Record<string, Component | string> | undefined>;
	bindings: ComputedRef<Record<string, unknown> | undefined>;
}

export const JSXPreviewKey: InjectionKey<JSXPreviewContext> =
	Symbol("JSXPreview");

export function useJSXPreview() {
	const ctx = inject(JSXPreviewKey);
	if (!ctx) {
		throw new Error("JSXPreview components must be used within JSXPreview");
	}
	return ctx;
}
