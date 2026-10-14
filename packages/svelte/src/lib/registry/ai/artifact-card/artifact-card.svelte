<script lang="ts">
	import { Card } from "$lib/registry/ui/card/index.js";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { type ArtifactCardState, setArtifactCardState } from "./use-artifact-card.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		state = "ready",
		elevation = "auto",
		children,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "elevation"> & {
		/** `generating`: the title shimmers and the actions are hidden. */
		state?: ArtifactCardState;
		/** ✦ depth: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();

	setArtifactCardState(() => state);
</script>

<Card
	bind:ref
	data-slot="ai-artifact-card"
	data-state={state}
	{elevation}
	class={cn("w-full flex-row items-center gap-3.5 px-3.5 py-3 text-card-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</Card>
