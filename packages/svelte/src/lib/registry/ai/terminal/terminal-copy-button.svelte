<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { onDestroy } from "svelte";
	import { TERM_ACTION, useTerminalContext } from "./use-terminal.svelte.js";

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

	const terminal = useTerminalContext();
	let isCopied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
			onError?.(new Error("Clipboard API not available"));
			return;
		}
		try {
			await navigator.clipboard.writeText(terminal.output);
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
	aria-label="Copy output"
	class={cn(TERM_ACTION, className)}
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
			class="size-3.5"
		/>
	{:else}
		<IconPlaceholder
			lucide="CopyIcon"
			tabler="IconCopy"
			hugeicons="Copy01Icon"
			phosphor="CopyIcon"
			remixicon="RiFileCopyLine"
			class="size-3.5"
		/>
	{/if}
</Button>
