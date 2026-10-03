<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof DropdownMenu.Trigger> = $props();
</script>

<DropdownMenu.Trigger
	data-slot="ai-open-in-trigger"
	class={cn(buttonVariants({ variant: "outline", size: "sm" }), className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		Open in
		<IconPlaceholder
			lucide="ChevronDownIcon"
			tabler="IconChevronDown"
			hugeicons="ArrowDown01Icon"
			phosphor="CaretDownIcon"
			remixicon="RiArrowDownSLine"
			class="size-3.5"
		/>
	{/if}
</DropdownMenu.Trigger>
