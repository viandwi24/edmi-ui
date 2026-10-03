<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: ComboboxPrimitive.InputProps = $props();
</script>

<ComboboxPrimitive.Input
	bind:ref
	data-slot="combobox-chip-input"
	class={cn(
		"min-w-16 flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
		className
	)}
	{...restProps}
/>
