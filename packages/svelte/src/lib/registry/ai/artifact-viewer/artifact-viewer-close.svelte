<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ComponentProps } from "svelte";
	import ArtifactViewerAction from "./artifact-viewer-action.svelte";

	let {
		label = "Close",
		...restProps
	}: Omit<ComponentProps<typeof ArtifactViewerAction>, "label" | "children"> & {
		label?: string;
	} = $props();
</script>

<ArtifactViewerAction {label} {...restProps}>
	<IconPlaceholder
		lucide="XIcon"
		tabler="IconX"
		hugeicons="Cancel01Icon"
		phosphor="XIcon"
		remixicon="RiCloseLine"
		class="size-4"
	/>
</ArtifactViewerAction>
