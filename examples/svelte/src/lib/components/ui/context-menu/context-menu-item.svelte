<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
	import { cn } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		inset,
		variant = "default",
		...restProps
	}: ContextMenuPrimitive.ItemProps & {
		inset?: boolean;
		variant?: "default" | "destructive";
	} = $props();
</script>

<ContextMenuPrimitive.Item
	bind:ref
	data-slot="context-menu-item"
	data-inset={inset}
	data-variant={variant}
	class={cn(
		"group/menu-item relative flex h-8 cursor-default items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset]:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[15px] [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:text-destructive-text data-[variant=destructive]:data-[highlighted]:bg-destructive-soft data-[variant=destructive]:data-[highlighted]:text-destructive-text data-[variant=destructive]:*:[svg]:text-destructive-text",
		className
	)}
	{...restProps}
/>
