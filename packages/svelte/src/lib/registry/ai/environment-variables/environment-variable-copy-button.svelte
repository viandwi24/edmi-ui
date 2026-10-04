<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { onDestroy } from "svelte";
	import { useEnvironmentVariableContext } from "./use-environment-variables.svelte.js";

	let {
		onCopy,
		onError,
		timeout = 2000,
		copyFormat = "value",
		class: className,
		children,
		...restProps
	}: Omit<ButtonProps, "onclick" | "href"> & {
		onCopy?: () => void;
		onError?: (error: Error) => void;
		timeout?: number;
		copyFormat?: "name" | "value" | "export";
	} = $props();

	const item = useEnvironmentVariableContext();
	let isCopied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	function textToCopy() {
		if (copyFormat === "export") return `export ${item.name}="${item.value}"`;
		return copyFormat === "name" ? item.name : item.value;
	}

	async function copy() {
		if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
			onError?.(new Error("Clipboard API not available"));
			return;
		}
		try {
			await navigator.clipboard.writeText(textToCopy());
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
	aria-label={`Copy ${copyFormat}`}
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
