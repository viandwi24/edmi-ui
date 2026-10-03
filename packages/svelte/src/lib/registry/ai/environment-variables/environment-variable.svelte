<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import EnvironmentVariableName from "./environment-variable-name.svelte";
	import EnvironmentVariableValue from "./environment-variable-value.svelte";
	import { setEnvironmentVariableContext } from "./use-environment-variables.svelte.js";

	let {
		name,
		value,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { name: string; value: string; children?: Snippet } =
		$props();

	setEnvironmentVariableContext({
		get name() {
			return name;
		},
		get value() {
			return value;
		},
	});
</script>

<div
	data-slot="ai-environment-variable"
	class={cn("flex items-center gap-2.5 border-t border-border-2 px-3.5 py-[9px]", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<EnvironmentVariableName />
		<EnvironmentVariableValue />
	{/if}
</div>
