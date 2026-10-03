<script lang="ts">
	import { Drawer as Primitive } from "vaul-svelte";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Primitive.HandleProps = $props();
</script>

<Primitive.Handle
	bind:ref
	data-slot="drawer-swipe-handle"
	class={cn("mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-border-2", className)}
	{...restProps}
/>
