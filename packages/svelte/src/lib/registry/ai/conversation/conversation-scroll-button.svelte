<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { MessageScrollerButton } from "$lib/registry/ui/message-scroller/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	// Round "scroll to latest" button; only visible when the user scrolled up.
	let {
		class: className,
		size = "icon",
		children,
		...restProps
	}: ComponentProps<typeof MessageScrollerButton> = $props();
</script>

<MessageScrollerButton
	aria-label="Scroll to latest"
	{size}
	class={cn("rounded-full", className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<IconPlaceholder
			lucide="ArrowDownIcon"
			tabler="IconArrowDown"
			hugeicons="ArrowDownIcon"
			phosphor="ArrowDownIcon"
			remixicon="RiArrowDownLine"
			class="size-4"
		/>
	{/if}
</MessageScrollerButton>
