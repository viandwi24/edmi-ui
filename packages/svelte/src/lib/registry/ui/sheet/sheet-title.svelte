<script lang="ts">
	import { Dialog as Primitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Primitive.TitleProps = $props();
</script>

<Primitive.Title
	bind:ref
	data-slot="sheet-title"
	class={cn("text-base leading-snug font-semibold tracking-[-0.2px] text-foreground", className)}
	{...restProps}
/>
