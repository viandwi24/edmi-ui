<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";

	let { class: className, children, ...restProps }: Omit<ButtonProps, "href"> = $props();
</script>

<Button
	data-slot="ai-artifact-stack-download-all"
	variant="secondary"
	size="sm"
	type="button"
	class={className}
	{...restProps}
>
	<IconPlaceholder
		lucide="DownloadIcon"
		tabler="IconDownload"
		hugeicons="DownloadIcon"
		phosphor="DownloadIcon"
		remixicon="RiDownloadLine"
		class="size-3.5"
	/>
	{#if children}
		{@render children()}
	{:else}
		Download all
	{/if}
</Button>
