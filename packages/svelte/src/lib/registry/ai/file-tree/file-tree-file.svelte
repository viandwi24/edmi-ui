<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import FileTreeIcon from "./file-tree-icon.svelte";
	import FileTreeName from "./file-tree-name.svelte";
	import { FILE_TREE_ROW, useFileTreeContext } from "./use-file-tree.svelte.js";

	// Default content is a spacer, the `icon` snippet (or a file icon) and the name; pass `children` to replace all of it.
	let {
		path,
		name,
		icon,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		path: string;
		name: string;
		icon?: Snippet;
		children?: Snippet;
	} = $props();

	const tree = useFileTreeContext();
	const isSelected = $derived(tree.selectedPath === path);

	function onkeydown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			tree.select(path);
		}
	}
</script>

<div
	role="treeitem"
	tabindex="0"
	aria-selected={isSelected}
	data-selected={isSelected ? "" : undefined}
	class={cn(FILE_TREE_ROW, "cursor-pointer", className)}
	onclick={() => tree.select(path)}
	{onkeydown}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<!-- Spacer so files line up with folder names -->
		<span class="w-3.5 shrink-0"></span>
		<FileTreeIcon>
			{#if icon}
				{@render icon()}
			{:else}
				<IconPlaceholder
					lucide="FileCodeIcon"
					tabler="IconFileCode"
					hugeicons="File01Icon"
					phosphor="FileCodeIcon"
					remixicon="RiFileCodeLine"
					class="size-4"
				/>
			{/if}
		</FileTreeIcon>
		<FileTreeName>{name}</FileTreeName>
	{/if}
</div>
