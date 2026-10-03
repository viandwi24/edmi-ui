<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { InputGroupButton } from "$lib/registry/ui/input-group/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import { cn } from "$lib/utils.js";
	import type { ChatStatus } from "ai";
	import type { ComponentProps } from "svelte";
	import { getPromptInput } from "./use-prompt-input.svelte.js";

	let {
		class: className,
		variant,
		size = "icon-sm",
		raised,
		status,
		onStop,
		onclick,
		children,
		...restProps
	}: Omit<ComponentProps<typeof InputGroupButton>, "href" | "onclick"> & {
		status?: ChatStatus;
		/** With `onStop` the button turns into a stop button while generating. */
		onStop?: () => void;
		onclick?: (event: MouseEvent) => void;
	} = $props();

	const controller = getPromptInput();
	const isGenerating = $derived(status === "submitted" || status === "streaming");
	const isStop = $derived(isGenerating && !!onStop);

	function handleClick(event: MouseEvent) {
		if (isStop) {
			event.preventDefault();
			onStop?.();
			return;
		}
		onclick?.(event);
	}
</script>

<InputGroupButton
	data-slot="ai-prompt-input-submit"
	data-status={status}
	aria-label={isGenerating ? "Stop" : "Submit"}
	type={isStop ? "button" : "submit"}
	{size}
	variant={variant ?? (status === "error" ? "destructive" : "default")}
	raised={raised ?? controller?.raised ?? false}
	class={cn("rounded-[9px]", className)}
	onclick={handleClick}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else if status === "submitted"}
		<Spinner />
	{:else if status === "streaming"}
		<IconPlaceholder
			lucide="SquareIcon"
			tabler="IconPlayerStopFilled"
			hugeicons="StopIcon"
			phosphor="StopIcon"
			remixicon="RiStopFill"
			class="size-3.5 fill-current"
		/>
	{:else if status === "error"}
		<IconPlaceholder
			lucide="XIcon"
			tabler="IconX"
			hugeicons="Cancel01Icon"
			phosphor="XIcon"
			remixicon="RiCloseLine"
			class="size-4"
		/>
	{:else}
		<IconPlaceholder
			lucide="ArrowUpIcon"
			tabler="IconArrowUp"
			hugeicons="ArrowUp02Icon"
			phosphor="ArrowUpIcon"
			remixicon="RiArrowUpLine"
			class="size-4"
		/>
	{/if}
</InputGroupButton>
