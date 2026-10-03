<script lang="ts">
	import { AlertDialog as Primitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Primitive.TitleProps = $props();
</script>

<Primitive.Title
	bind:ref
	data-slot="alert-dialog-title"
	class={cn("text-base leading-snug font-semibold tracking-[-0.2px] sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2", className)}
	{...restProps}
/>
