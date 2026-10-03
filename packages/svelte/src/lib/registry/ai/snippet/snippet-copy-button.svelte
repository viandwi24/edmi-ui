<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { cn } from "$lib/utils.js";
	import { onDestroy, type ComponentProps } from "svelte";
	import { useSnippetContext } from "./use-snippet.svelte.js";

	let {
		onCopy,
		onError,
		timeout = 2000,
		class: className,
		children,
		...restProps
	}: Omit<ComponentProps<typeof InputGroup.Button>, "onclick"> & {
		onCopy?: () => void;
		onError?: (error: Error) => void;
		timeout?: number;
	} = $props();

	const snippet = useSnippetContext();
	let isCopied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
			onError?.(new Error("Clipboard API not available"));
			return;
		}
		if (isCopied) return;
		try {
			await navigator.clipboard.writeText(snippet.code);
			isCopied = true;
			onCopy?.();
			timer = setTimeout(() => (isCopied = false), timeout);
		} catch (error) {
			onError?.(error as Error);
		}
	}

	onDestroy(() => clearTimeout(timer));
</script>

<InputGroup.Button
	aria-label="Copy"
	title="Copy"
	size="icon-xs"
	class={cn("mr-1", className)}
	onclick={copy}
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
</InputGroup.Button>
