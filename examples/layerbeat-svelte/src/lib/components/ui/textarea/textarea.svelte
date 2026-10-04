<script lang="ts">
	import { cn, type WithElementRef, type WithoutChildren } from "#lib/utils.js";
	import { type Elevation, useElevation } from "#lib/components/ui/elevation/index.js";
	import type { HTMLTextareaAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		elevation = "auto",
		"data-slot": dataSlot = "textarea",
		...restProps
	}: WithoutChildren<WithElementRef<HTMLTextareaAttributes>> & {
		/** ✦ depth: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();
	// ✦ depth (v4): fields sink (-1) in layered mode; focus swaps the edge for the ring
	const fieldElevation = {
		sunken: "border-sk-bd bg-sk-bg shadow-sunken focus-visible:bg-card",
		flat: "",
		raised: "border-transparent shadow-raised",
		floating: "border-transparent shadow-floating",
	};

	const level = useElevation(() => elevation, "field");
</script>

<textarea
	bind:this={ref}
	data-slot={dataSlot}
	class={cn(
		"flex field-sizing-content min-h-24 w-full min-w-0 rounded-md border border-input bg-card px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error",
		fieldElevation[level.current],
		className
	)}
	bind:value
	{...restProps}></textarea>
