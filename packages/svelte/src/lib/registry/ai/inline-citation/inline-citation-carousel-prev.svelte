<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { getEmblaContext } from "$lib/registry/ui/carousel/context.js";

	let { children, ...restProps }: Omit<ButtonProps, "href" | "onclick"> = $props();

	const embla = getEmblaContext("<InlineCitationCarouselPrev/>");
</script>

<Button
	type="button"
	variant="ghost"
	size="icon-xs"
	aria-label="Previous"
	onclick={() => embla.scrollPrev()}
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
