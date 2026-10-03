<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { useMessageBranch } from "./use-message.svelte.js";

	let { children, ...restProps }: Omit<ButtonProps, "href" | "onclick"> = $props();

	const branches = useMessageBranch();
</script>

<Button
	aria-label="Previous branch"
	disabled={branches.totalBranches <= 1}
	onclick={() => branches.goToPrevious()}
	size="icon-xs"
	type="button"
	variant="ghost"
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<IconPlaceholder
			lucide="ChevronLeftIcon"
			tabler="IconChevronLeft"
			hugeicons="ArrowLeft01Icon"
			phosphor="CaretLeftIcon"
			remixicon="RiArrowLeftSLine"
		/>
	{/if}
</Button>
