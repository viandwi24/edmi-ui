<script lang="ts">
	import { Card } from "$lib/registry/ui/card/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { type ArtifactCardState, setArtifactCardState } from "./use-artifact-card.svelte.js";

	let {
		class: className,
		state = "ready",
		raised = false,
		children,
		...restProps
	}: ComponentProps<typeof Card> & {
		/** `generating`: the title shimmers and the actions are hidden. */
		state?: ArtifactCardState;
	} = $props();

	setArtifactCardState(() => state);
</script>

<Card
	data-slot="ai-artifact-card"
	data-state={state}
	{raised}
	class={cn("w-full flex-row items-center gap-3.5 px-3.5 py-3 text-card-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</Card>
