<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ComponentProps } from "svelte";
	import ArtifactViewerAction from "./artifact-viewer-action.svelte";

	let {
		label = "Download",
		...restProps
	}: Omit<ComponentProps<typeof ArtifactViewerAction>, "label" | "children"> & {
		label?: string;
	} = $props();
</script>

<ArtifactViewerAction {label} {...restProps}>
	<IconPlaceholder
		lucide="DownloadIcon"
		tabler="IconDownload"
		hugeicons="DownloadIcon"
		phosphor="DownloadIcon"
		remixicon="RiDownloadLine"
		class="size-4"
	/>
</ArtifactViewerAction>
