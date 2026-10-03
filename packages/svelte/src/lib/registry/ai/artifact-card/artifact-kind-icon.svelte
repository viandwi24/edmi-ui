<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ArtifactKind } from "./use-artifact-card.svelte.js";

	let {
		kind = "document",
		class: className = "size-5",
	}: {
		kind?: ArtifactKind;
		class?: string;
	} = $props();
</script>

{#if kind === "archive"}
	<IconPlaceholder
		lucide="ArchiveIcon"
		tabler="IconArchive"
		hugeicons="Archive02Icon"
		phosphor="ArchiveIcon"
		remixicon="RiArchiveLine"
		class={className}
	/>
{:else if kind === "code"}
	<IconPlaceholder
		lucide="FileCodeIcon"
		tabler="IconFileCode"
		hugeicons="File01Icon"
		phosphor="FileCodeIcon"
		remixicon="RiFileCodeLine"
		class={className}
	/>
{:else if kind === "image"}
	<IconPlaceholder
		lucide="ImageIcon"
		tabler="IconPhoto"
		hugeicons="Image01Icon"
		phosphor="ImageIcon"
		remixicon="RiImageLine"
		class={className}
	/>
{:else if kind === "slides"}
	<IconPlaceholder
		lucide="AppWindowIcon"
		tabler="IconAppWindow"
		hugeicons="BrowserIcon"
		phosphor="AppWindowIcon"
		remixicon="RiWindowLine"
		class={className}
	/>
{:else if kind === "file"}
	<IconPlaceholder
		lucide="FileIcon"
		tabler="IconFile"
		hugeicons="File01Icon"
		phosphor="FileIcon"
		remixicon="RiFileLine"
		class={className}
	/>
{:else}
	<IconPlaceholder
		lucide="FileTextIcon"
		tabler="IconFileDescription"
		hugeicons="File01Icon"
		phosphor="FileTextIcon"
		remixicon="RiFileTextLine"
		class={className}
	/>
{/if}
