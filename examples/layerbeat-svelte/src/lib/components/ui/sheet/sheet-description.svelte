<script lang="ts">
	import { Dialog as Primitive } from "bits-ui";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Primitive.DescriptionProps = $props();
</script>

<Primitive.Description
	bind:ref
	data-slot="sheet-description"
	class={cn("text-[13px] text-muted-foreground", className)}
	{...restProps}
/>
