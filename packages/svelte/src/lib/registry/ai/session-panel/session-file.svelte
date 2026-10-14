<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { ArtifactKindIcon, type ArtifactKind } from "../artifact-card/index.js";

	let {
		ref = $bindable(null),
		name,
		format,
		kind = "document",
		class: className,
		...restProps
	}: WithElementRef<Omit<HTMLButtonAttributes, "children" | "name">, HTMLButtonElement> & {
		name: string | Snippet;
		/** Format badge on the right (`PDF`, `MD`). */
		format?: string | Snippet;
		kind?: ArtifactKind;
	} = $props();
</script>

<button
	bind:this={ref}
	data-slot="ai-session-file"
	type="button"
	class={cn(
		"flex w-full items-center gap-2.5 rounded-md py-[7px] text-left text-sm outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
		className
	)}
	{...restProps}
>
	<span class="text-muted-foreground">
		<ArtifactKindIcon {kind} class="size-4" />
	</span>
	<span class="min-w-0 flex-1 truncate">{#if typeof name === "string"}{name}{:else}{@render name()}{/if}</span>
	{#if typeof format === "string"}
		<span class="font-mono text-[11.5px] text-muted-foreground">{format}</span>
	{:else if format}
		<span class="font-mono text-[11.5px] text-muted-foreground">{@render format()}</span>
	{/if}
</button>
