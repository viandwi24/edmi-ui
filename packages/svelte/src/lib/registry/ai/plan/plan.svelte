<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import { Collapsible } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";
	import { setPlanContext } from "./use-plan.svelte.js";

	let {
		class: className,
		isStreaming = false,
		elevation = "auto",
		open = $bindable(false),
		children,
		...restProps
	}: Omit<ComponentProps<typeof Collapsible>, "child"> & {
		isStreaming?: boolean;
		/** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();

	setPlanContext({
		get isStreaming() {
			return isStreaming;
		},
	});
</script>

<Collapsible bind:open data-slot="ai-plan" {...restProps}>
	{#snippet child({ props })}
		<Card {...props} {elevation} class={cn("gap-0 py-0 [--card-spacing:16px]", className)}>
			{@render children?.()}
		</Card>
	{/snippet}
</Collapsible>
