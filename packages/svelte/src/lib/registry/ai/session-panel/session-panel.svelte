<script lang="ts">
	import { Card } from "$lib/registry/ui/card/index.js";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		elevation = "auto",
		...restProps
	}: Omit<ComponentProps<typeof Card>, "elevation"> & {
		/** ✦ depth: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();
</script>

<Card
	bind:ref
	data-slot="ai-session-panel"
	{elevation}
	class={cn("w-full max-w-[380px] gap-0 px-4 py-3.5", className)}
	{...restProps}
>
	{@render children?.()}
</Card>
