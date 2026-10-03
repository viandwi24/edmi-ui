<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		level = 3,
		children,
		...restProps
	}: WithoutChild<AccordionPrimitive.TriggerProps> & {
		level?: AccordionPrimitive.HeaderProps["level"];
	} = $props();
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		data-slot="accordion-trigger"
		bind:ref
		class={cn(
			"group/accordion-trigger relative flex flex-1 items-center justify-between gap-4 py-3.5 text-left text-[14px] font-medium outline-none transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		<IconPlaceholder
			lucide="ChevronDownIcon"
			tabler="IconChevronDown"
			hugeicons="ArrowDown01Icon"
			phosphor="CaretDownIcon"
			remixicon="RiArrowDownSLine"
			data-slot="accordion-trigger-icon"
			class="pointer-events-none size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/accordion-trigger:rotate-180"
		/>
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
