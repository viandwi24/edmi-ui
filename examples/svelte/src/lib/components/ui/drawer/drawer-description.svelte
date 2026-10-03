<script lang="ts">
	import { Drawer as Primitive } from "vaul-svelte";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Primitive.DescriptionProps = $props();
</script>

<Primitive.Description
	bind:ref
	data-slot="drawer-description"
	class={cn("text-[13px] text-muted-foreground", className)}
	{...restProps}
/>
