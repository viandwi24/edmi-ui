<script lang="ts">
	import { Dialog as Primitive } from "bits-ui";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Primitive.OverlayProps = $props();
</script>

<Primitive.Overlay
	bind:ref
	data-slot="sheet-overlay"
	class={cn("fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
	{...restProps}
/>
