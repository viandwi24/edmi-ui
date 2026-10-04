<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import { Collapsible } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";
	import { setPlanContext } from "./use-plan.svelte.js";

	let {
		class: className,
		isStreaming = false,
		raised = false,
		open = $bindable(false),
		children,
		...restProps
	}: Omit<ComponentProps<typeof Collapsible>, "child"> & {
		isStreaming?: boolean;
		/** ✦ one-step 3D look on the card. */
		raised?: boolean;
	} = $props();

	setPlanContext({
		get isStreaming() {
			return isStreaming;
		},
	});
</script>

<Collapsible bind:open data-slot="ai-plan" {...restProps}>
	{#snippet child({ props })}
		<Card {...props} {raised} class={cn("gap-0 py-0 [--card-spacing:16px]", className)}>
			{@render children?.()}
		</Card>
	{/snippet}
</Collapsible>
