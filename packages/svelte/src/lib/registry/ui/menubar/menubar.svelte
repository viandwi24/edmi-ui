<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import { type Elevation, useElevation } from "$lib/registry/ui/elevation/index.js";

	let {
		ref = $bindable(null),
		class: className,
		elevation = "auto",
		...restProps
	}: MenubarPrimitive.RootProps & {
		/** ✦ depth for the bar: flat 0, raised +1 (bevel), floating +2. */
		elevation?: Elevation;
	} = $props();

	// ✦ depth (v4): the bar itself rises.
	const barElevation = {
		sunken: "",
		flat: "",
		raised: "border-transparent shadow-raised",
		floating: "border-transparent shadow-floating",
	};
	const level = useElevation(() => elevation, "control");
</script>

<MenubarPrimitive.Root
	bind:ref
	data-slot="menubar"
	class={cn(
		"flex items-center gap-0.5 rounded-[10px] border border-border bg-card p-[3px]",
		barElevation[level.current],
		className
	)}
	{...restProps}
/>
