<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComboboxPrimitive.ViewportProps = $props();
</script>

<ComboboxPrimitive.Viewport
	bind:ref
	data-slot="combobox-list"
	class={cn(
		"no-scrollbar max-h-72 scroll-py-1 overflow-y-auto overscroll-contain p-1.5",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</ComboboxPrimitive.Viewport>
