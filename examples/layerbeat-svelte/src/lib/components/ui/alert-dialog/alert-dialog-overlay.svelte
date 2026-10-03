<script lang="ts">
	import { AlertDialog as Primitive } from "bits-ui";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Primitive.OverlayProps = $props();
</script>

<Primitive.Overlay
	bind:ref
	data-slot="alert-dialog-overlay"
	class={cn("fixed inset-0 isolate z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
	{...restProps}
/>
