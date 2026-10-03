<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		inset,
		children,
		...restProps
	}: WithoutChild<ContextMenuPrimitive.SubTriggerProps> & {
		inset?: boolean;
	} = $props();
</script>

<ContextMenuPrimitive.SubTrigger
	bind:ref
	data-slot="context-menu-sub-trigger"
	data-inset={inset}
	class={cn(
		"relative flex h-8 cursor-default items-center gap-2.5 rounded-[7px] px-2 text-[13.5px] outline-none select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[inset]:pl-8 data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[15px] [&_svg:not([class*='text-'])]:text-muted-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<IconPlaceholder
		lucide="ChevronRightIcon"
		tabler="IconChevronRight"
		hugeicons="ArrowRight01Icon"
		phosphor="CaretRightIcon"
		remixicon="RiArrowRightSLine"
		class="ml-auto rtl:rotate-180"
	/>
</ContextMenuPrimitive.SubTrigger>
