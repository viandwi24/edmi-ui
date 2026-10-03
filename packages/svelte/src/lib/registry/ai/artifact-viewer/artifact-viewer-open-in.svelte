<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ComponentProps } from "svelte";
	import ArtifactViewerAction from "./artifact-viewer-action.svelte";

	let {
		label = "Open in",
		...restProps
	}: Omit<ComponentProps<typeof ArtifactViewerAction>, "label" | "children"> & {
		label?: string;
	} = $props();
</script>

<ArtifactViewerAction {label} {...restProps}>
	<IconPlaceholder
		lucide="ArrowUpRightIcon"
		tabler="IconArrowUpRight"
		hugeicons="ArrowUpRight01Icon"
		phosphor="ArrowUpRightIcon"
		remixicon="RiArrowRightUpLine"
		class="size-4"
	/>
</ArtifactViewerAction>
