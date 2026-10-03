<script lang="ts">
	// Edmi ✦ port: AI Elements has no Svelte JSX Preview. Markup is parsed by ./parser (no eval),
	// rendered with the `components` map.
	import { cn } from "$lib/utils.js";
	import type { Component, Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { findUnknownComponent, type JsxNode, parseJsx } from "./parser.js";
	import { setJSXPreviewContext } from "./use-jsx-preview.svelte.js";

	let {
		jsx,
		isStreaming = false,
		components,
		bindings,
		onError,
		class: className,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "onerror"> & {
		/** Markup to render: JSX-like tags, quoted or `{braced}` attributes, `{binding}` text. */
		jsx: string;
		isStreaming?: boolean;
		// biome-ignore lint/suspicious/noExplicitAny: user-supplied components of any prop shape
		components?: Record<string, Component<any> | string>;
		bindings?: Record<string, unknown>;
		onError?: (error: Error) => void;
		children?: Snippet;
	} = $props();

	const parsed = $derived.by(() => {
		try {
			const nodes = parseJsx(jsx, { streaming: isStreaming });
			const unknown = findUnknownComponent(nodes, components);
			if (unknown) throw unknown;
			return { nodes, error: null as Error | null };
		} catch (e) {
			return { nodes: null, error: e instanceof Error ? e : new Error(String(e)) };
		}
	});

	let lastGood = $state.raw<JsxNode[]>([]);
	let error = $state<Error | null>(null);

	$effect(() => {
		const result = parsed;
		if (result.nodes) {
			lastGood = result.nodes;
			error = null;
			return;
		}
		// While streaming, a chunk that does not parse yet keeps the last good render and stays silent.
		if (isStreaming) return;
		error = result.error;
		if (result.error) onError?.(result.error);
	});

	setJSXPreviewContext({
		get nodes() {
			return parsed.nodes ?? lastGood;
		},
		get error() {
			return error ?? (!isStreaming ? parsed.error : null);
		},
		get isStreaming() {
			return isStreaming;
		},
		get components() {
			return components;
		},
		get bindings() {
			return bindings;
		},
	});
</script>

<div data-slot="ai-jsx-preview" class={cn("relative", className)} {...restProps}>
	{@render children?.()}
</div>
