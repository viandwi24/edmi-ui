<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Collapsible } from "$lib/registry/ui/collapsible/index.js";
	import { type Elevation, setSurface, useElevation } from "$lib/registry/ui/elevation/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		elevation = "auto",
		open = $bindable(false),
		children,
		...restProps
	}: ComponentProps<typeof Collapsible> & {
		/** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();

	// surface role: same faces as the ui card
	const toolElevation = {
		sunken: "border-sk-bd bg-sk-bg shadow-sunken",
		flat: "",
		raised: "border-transparent shadow-raised",
		floating: "border-transparent shadow-floating",
	};

	const level = useElevation(() => elevation, "surface");
	setSurface(() => level.current);
</script>

<Collapsible
	bind:open
	data-slot="ai-tool"
	class={cn(
		"group/tool not-prose w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
		toolElevation[level.current],
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Collapsible>
