<script lang="ts">
	// Edmi ✦ port: renders the parsed tree recursively. Event handlers and `javascript:` URLs are dropped.
	import type { Component } from "svelte";
	import { type JsxAttr, type JsxNode, VOID_TAGS } from "./parser.js";
	import JsxPreviewNodes from "./jsx-preview-nodes.svelte";

	let {
		nodes,
		components,
		bindings,
	}: {
		nodes: JsxNode[];
		// biome-ignore lint/suspicious/noExplicitAny: user-supplied components of any prop shape
		components?: Record<string, Component<any> | string>;
		bindings?: Record<string, unknown>;
	} = $props();

	const ATTR_ALIASES: Record<string, string> = { className: "class", htmlFor: "for" };

	function resolveBinding(path: string) {
		return path
			.split(".")
			.reduce<unknown>(
				(acc, key) => (acc as Record<string, unknown> | undefined)?.[key],
				bindings
			);
	}

	function propsOf(attrs: Record<string, JsxAttr>) {
		const props: Record<string, unknown> = {};
		for (const [key, raw] of Object.entries(attrs)) {
			if (/^on[A-Z]/.test(key)) continue;
			const name = ATTR_ALIASES[key] ?? key;
			const value = typeof raw === "object" && raw !== null ? resolveBinding(raw.binding) : raw;
			if (
				typeof value === "string" &&
				/^(href|src|action)$/i.test(name) &&
				/^\s*javascript:/i.test(value)
			) {
				continue;
			}
			props[name] = value;
		}
		return props;
	}
</script>

{#each nodes as node, i (i)}
	{#if node.type === "text"}
		{node.value}
	{:else if node.type === "binding"}
		{@const value = resolveBinding(node.name)}
		{value == null ? "" : String(value)}
	{:else}
		{@const target = components?.[node.tag]}
		{@const props = propsOf(node.attrs)}
		{#if target && typeof target !== "string"}
			{@const Target = target}
			<Target {...props}>
				{#snippet children()}
					<JsxPreviewNodes nodes={node.children} {components} {bindings} />
				{/snippet}
			</Target>
		{:else}
			{@const tag = typeof target === "string" ? target : node.tag}
			{#if VOID_TAGS.has(tag)}
				<svelte:element this={tag} {...props} />
			{:else}
				<svelte:element this={tag} {...props}>
					<JsxPreviewNodes nodes={node.children} {components} {bindings} />
				</svelte:element>
			{/if}
		{/if}
	{/if}
{/each}
