<script lang="ts">
	import { AlertDialog as Primitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Primitive.DescriptionProps = $props();
</script>

<Primitive.Description
	bind:ref
	data-slot="alert-dialog-description"
	class={cn("text-[13px] text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className)}
	{...restProps}
/>
