<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { onDestroy } from "svelte";
	import { useCodeBlockContext } from "./use-code-block.svelte.js";

	let {
		onCopy,
		onError,
		timeout = 2000,
		class: className,
		children,
		...restProps
	}: Omit<ButtonProps, "onclick" | "href"> & {
		onCopy?: () => void;
		onError?: (error: Error) => void;
		timeout?: number;
	} = $props();

	const block = useCodeBlockContext();
	let isCopied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
			onError?.(new Error("Clipboard API not available"));
			return;
		}
		try {
			await navigator.clipboard.writeText(block.code);
			isCopied = true;
			onCopy?.();
			clearTimeout(timer);
			timer = setTimeout(() => (isCopied = false), timeout);
		} catch (error) {
			onError?.(error as Error);
		}
	}

	onDestroy(() => clearTimeout(timer));
</script>

<Button
	data-slot="ai-code-block-copy"
	aria-label="Copy code"
	class={cn("shrink-0", className)}
	onclick={copy}
	size="icon-xs"
	type="button"
	variant="ghost"
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else if isCopied}
		<IconPlaceholder
			lucide="CheckIcon"
			tabler="IconCheck"
			hugeicons="Tick02Icon"
			phosphor="CheckIcon"
			remixicon="RiCheckLine"
		/>
	{:else}
		<IconPlaceholder
			lucide="CopyIcon"
			tabler="IconCopy"
			hugeicons="Copy01Icon"
			phosphor="CopyIcon"
			remixicon="RiFileCopyLine"
		/>
	{/if}
</Button>
