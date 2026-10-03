<script lang="ts">
	import XIcon from 'phosphor-svelte/lib/X';
	import { Button } from "#lib/components/ui/button/index.js";
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		showRemove = true,
		disabled = false,
		onremove,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		showRemove?: boolean;
		disabled?: boolean;
		onremove?: () => void;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="combobox-chip"
	class={cn(
		"flex h-[22px] w-fit items-center justify-center gap-1 rounded-md border border-border bg-secondary px-1.5 text-xs font-medium whitespace-nowrap text-secondary-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	{#if showRemove}
		<Button
			variant="ghost"
			size="icon-xs"
			class="-ml-1 size-5 opacity-50 hover:opacity-100"
			data-slot="combobox-chip-remove"
			aria-label="Remove"
			{disabled}
			onclick={onremove}
		>
			<XIcon class="pointer-events-none" />
		</Button>
	{/if}
</div>
