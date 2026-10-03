<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLLegendElement>> = $props();
</script>

<!-- The fieldset legend already names the item. -->
<legend
	bind:this={ref}
	data-slot="questionnaire-title"
	class={cn(
		"text-[17px] leading-snug font-semibold tracking-[-0.2px] text-pretty [&:not(:has(~[data-slot=questionnaire-description]))]:mb-4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</legend>
