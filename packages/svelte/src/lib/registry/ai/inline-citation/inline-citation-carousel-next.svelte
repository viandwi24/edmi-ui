<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { getEmblaContext } from "$lib/registry/ui/carousel/context.js";

	let { children, ...restProps }: Omit<ButtonProps, "href" | "onclick"> = $props();

	const embla = getEmblaContext("<InlineCitationCarouselNext/>");
</script>

<Button
	type="button"
	variant="ghost"
	size="icon-xs"
	aria-label="Next"
	onclick={() => embla.scrollNext()}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<IconPlaceholder
			lucide="ChevronRightIcon"
			tabler="IconChevronRight"
			hugeicons="ArrowRight01Icon"
			phosphor="CaretRightIcon"
			remixicon="RiArrowRightSLine"
		/>
	{/if}
</Button>
