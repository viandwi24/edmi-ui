<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		raised = false,
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> & {
		size?: "sm" | "default";
		/** ✦ opt-in one-step 3D look (popup stays flat). */
		raised?: boolean;
	} = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	data-slot="select-trigger"
	data-size={size}
	class={cn(
		"flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-card pr-2.5 pl-3 text-sm whitespace-nowrap text-foreground outline-none select-none focus-visible:border-ring focus-visible:shadow-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-ring-error data-[state=open]:border-ring data-[state=open]:shadow-ring data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 data-[size=sm]:rounded-[7px] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		raised && "border-b-lip shadow-[0_2px_0_var(--lip)] data-[state=open]:border-b-ring",
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
		class="pointer-events-none size-4 text-muted-foreground"
	/>
</SelectPrimitive.Trigger>
