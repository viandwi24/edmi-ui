<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { ArtifactKindIcon, type ArtifactKind } from "../artifact-card/index.js";

	let {
		name,
		format,
		kind = "document",
		class: className,
		...restProps
	}: Omit<HTMLButtonAttributes, "children"> & {
		name: string;
		/** Format badge on the right (`PDF`, `MD`). */
		format?: string;
		kind?: ArtifactKind;
	} = $props();
</script>

<button
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
	<span class="min-w-0 flex-1 truncate">{name}</span>
	{#if format}
		<span class="font-mono text-[11.5px] text-muted-foreground">{format}</span>
	{/if}
</button>
