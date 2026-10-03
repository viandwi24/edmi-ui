<script lang="ts">
	import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";
	import { segmentedRaised, type ToggleVariants, toggleVariants } from "#lib/components/ui/toggle/index.js";
	import { cn } from "#lib/utils.js";
	import { getToggleGroupCtx } from "./toggle-group.svelte";

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		size,
		variant,
		raised,
		...restProps
	}: ToggleGroupPrimitive.ItemProps & ToggleVariants & { raised?: boolean } = $props();

	const ctx = getToggleGroupCtx();
	const isRaised = $derived(raised ?? ctx.raised ?? false);
	const itemVariant = $derived(ctx.variant || variant);
</script>

<ToggleGroupPrimitive.Item
	bind:ref
	data-slot="toggle-group-item"
	data-variant={ctx.variant || variant}
	data-size={ctx.size || size}
	data-spacing={ctx.spacing}
	class={cn(
		"shrink-0 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
		toggleVariants({
			variant: itemVariant,
			size: ctx.size || size,
			// outline → toggle raised compound; other variants → segmented.itemRaised below
			raised: isRaised && itemVariant === "outline",
		}),
		isRaised && itemVariant !== "outline" && `${segmentedRaised} data-[state=on]:translate-y-0 data-[state=on]:shadow-btn-secondary`,
		className
	)}
	{value}
	{...restProps}
/>
