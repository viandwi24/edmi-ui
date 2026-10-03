<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import CheckIcon from 'phosphor-svelte/lib/Check';
	import { cn, type WithoutChild } from "#lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children: childrenProp,
		...restProps
	}: WithoutChild<ComboboxPrimitive.ItemProps> = $props();
</script>

<ComboboxPrimitive.Item
	bind:ref
	{value}
	{label}
	data-slot="combobox-item"
	class={cn(
		"relative flex h-8 w-full cursor-default items-center gap-2.5 rounded-[7px] pr-8 pl-2 text-[13.5px] outline-hidden select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		{#if childrenProp}
			{@render childrenProp({ selected, highlighted })}
		{:else}
			{label || value}
		{/if}
		{#if selected}
			<span class="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
				<CheckIcon class="pointer-events-none" />
			</span>
		{/if}
	{/snippet}
</ComboboxPrimitive.Item>
