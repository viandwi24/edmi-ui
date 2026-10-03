<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { TERM_ACTION, useTerminalContext } from "./use-terminal.svelte.js";

	let {
		class: className,
		children,
		...restProps
	}: Omit<ButtonProps, "onclick" | "href"> = $props();

	const terminal = useTerminalContext();
</script>

{#if terminal.onClear}
	<Button
		aria-label="Clear output"
		class={cn(TERM_ACTION, className)}
		onclick={() => terminal.onClear?.()}
		size="icon-xs"
		type="button"
		variant="ghost"
		{...restProps}
	>
		{#if children}
			{@render children()}
		{:else}
			<IconPlaceholder
				lucide="Trash2Icon"
				tabler="IconTrash"
				hugeicons="Delete02Icon"
				phosphor="TrashIcon"
				remixicon="RiDeleteBinLine"
				class="size-3.5"
			/>
		{/if}
	</Button>
{/if}
