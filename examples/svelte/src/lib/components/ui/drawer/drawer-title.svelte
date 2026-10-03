<script lang="ts">
	import { Drawer as Primitive } from "vaul-svelte";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: Primitive.TitleProps = $props();
</script>

<Primitive.Title
	bind:ref
	data-slot="drawer-title"
	class={cn("text-base leading-snug font-semibold tracking-[-0.2px] text-foreground", className)}
	{...restProps}
/>
