<script lang="ts">
	import { Slider as SliderPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "#lib/utils.js";
	import { type Elevation, useElevation } from "#lib/components/ui/elevation/index.js";

	// Array value: 1 = single, 2 = range, 3+ = multiple thumbs.
	let {
		ref = $bindable(null),
		value = $bindable(),
		orientation = "horizontal",
		class: className,
		elevation = "auto",
		...restProps
	}: WithoutChildrenOrChild<SliderPrimitive.RootProps> & {
		/** ✦ depth: raised +1 / floating +2 make the thumbs rise (never the track). */
		elevation?: Elevation;
	} = $props();

	const level = useElevation(() => elevation, "handle");
	const raised = $derived(level.current === "raised" || level.current === "floating");
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<SliderPrimitive.Root
	bind:ref
	bind:value={value as never}
	data-slot="slider"
	{orientation}
	class={cn(
		"relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
		className
	)}
	{...restProps}
>
	{#snippet children({ thumbItems })}
		<span
			data-slot="slider-track"
			data-orientation={orientation}
			class="relative grow overflow-hidden rounded-full border border-border bg-muted select-none data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
		>
			<SliderPrimitive.Range
				data-slot="slider-range"
				class="absolute rounded-full bg-brand select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
			/>
		</span>
		{#each thumbItems as thumb (thumb.index)}
			<SliderPrimitive.Thumb
				data-slot="slider-thumb"
				index={thumb.index}
				class={cn(
					"relative block size-[18px] shrink-0 rounded-full border border-brand-edge bg-white transition-shadow outline-none select-none after:absolute after:-inset-2 focus-visible:shadow-[0_0_0_4px_var(--ring-soft)] data-[active]:shadow-[0_0_0_4px_var(--ring-soft)] disabled:pointer-events-none",
					raised &&
						"border-transparent bg-linear-to-b from-white to-[#eeede9] shadow-thumb focus-visible:shadow-[0_0_0_4px_var(--ring-soft),0_0_1.5px_rgb(0_0_0/0.45)] data-[active]:shadow-[0_0_0_4px_var(--ring-soft),0_0_1.5px_rgb(0_0_0/0.45)]"
				)}
			/>
		{/each}
	{/snippet}
</SliderPrimitive.Root>
