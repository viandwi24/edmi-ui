<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ComponentProps } from "svelte";
	import ArtifactViewerAction from "./artifact-viewer-action.svelte";

	let {
		label = "Expand",
		...restProps
	}: Omit<ComponentProps<typeof ArtifactViewerAction>, "label" | "children"> & {
		label?: string;
	} = $props();
</script>

<ArtifactViewerAction {label} {...restProps}>
	<IconPlaceholder
		lucide="MaximizeIcon"
		tabler="IconMaximize"
		hugeicons="MaximizeScreenIcon"
		phosphor="ArrowsOutSimpleIcon"
		remixicon="RiFullscreenLine"
		class="size-4"
	/>
</ArtifactViewerAction>
