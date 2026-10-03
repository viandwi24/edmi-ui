<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import ArtifactKindIcon from "./artifact-kind-icon.svelte";
	import type { ArtifactKind } from "./use-artifact-card.svelte.js";

	let {
		kind = "document",
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { kind?: ArtifactKind } = $props();
</script>

<span
	data-slot="ai-artifact-card-icon"
	class={cn(
		"inline-flex h-14 w-[52px] shrink-0 items-center justify-center rounded-[calc(var(--radius)*0.9)] border border-border bg-muted text-muted-foreground",
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<ArtifactKindIcon {kind} />
	{/if}
</span>
