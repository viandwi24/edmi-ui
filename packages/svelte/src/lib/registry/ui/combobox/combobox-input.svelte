<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupButton,
	} from "$lib/registry/ui/input-group/index.js";
	import { getComboboxContext } from "./context.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		disabled = false,
		showTrigger = true,
		showClear = false,
		...restProps
	}: WithoutChildrenOrChild<ComboboxPrimitive.InputProps> & {
		children?: Snippet;
		showTrigger?: boolean;
		showClear?: boolean;
	} = $props();

	const ctx = getComboboxContext();

	function clear() {
		ctx?.clear();
		const el = ref as HTMLInputElement | null;
		if (el) {
			el.value = "";
			el.dispatchEvent(new Event("input", { bubbles: true }));
			el.focus();
		}
	}
</script>

<InputGroup class={cn("w-auto", className)}>
	<ComboboxPrimitive.Input bind:ref {disabled} {...restProps}>
		{#snippet child({ props })}
			<input
				{...props}
				{disabled}
				data-slot="input-group-control"
				class="h-auto min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
			/>
		{/snippet}
	</ComboboxPrimitive.Input>
	<InputGroupAddon align="inline-end">
		{#if showTrigger}
			<ComboboxPrimitive.Trigger {disabled}>
				{#snippet child({ props })}
					<InputGroupButton
						{...props}
						size="icon-xs"
						variant="ghost"
						data-slot="combobox-trigger"
						class="group-has-data-[slot=combobox-clear]/input-group:hidden data-[state=open]:bg-transparent"
						{disabled}
					>
						<IconPlaceholder
							lucide="ChevronDownIcon"
							tabler="IconChevronDown"
							hugeicons="ArrowDown01Icon"
							phosphor="CaretDownIcon"
							remixicon="RiArrowDownSLine"
							class="pointer-events-none size-4 text-muted-foreground"
						/>
					</InputGroupButton>
				{/snippet}
			</ComboboxPrimitive.Trigger>
		{/if}
		{#if showClear}
			<InputGroupButton
				size="icon-xs"
				variant="ghost"
				data-slot="combobox-clear"
				aria-label="Clear"
				{disabled}
				onclick={clear}
			>
				<IconPlaceholder
					lucide="XIcon"
					tabler="IconX"
					hugeicons="Cancel01Icon"
					phosphor="XIcon"
					remixicon="RiCloseLine"
					class="pointer-events-none"
				/>
			</InputGroupButton>
		{/if}
	</InputGroupAddon>
	{@render children?.()}
</InputGroup>
