<script lang="ts">
	import { Drawer as Primitive } from "vaul-svelte";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Primitive.OverlayProps = $props();
</script>

<Primitive.Overlay
	bind:ref
	data-slot="drawer-overlay"
	class={cn("fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
	{...restProps}
/>
