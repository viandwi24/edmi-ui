<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { setFileTreeContext } from "./use-file-tree.svelte.js";

	let {
		expanded = $bindable(new Set<string>()),
		selectedPath,
		onSelect,
		class: className,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "onselect"> & {
		expanded?: Set<string>;
		selectedPath?: string;
		onSelect?: (path: string) => void;
		children?: Snippet;
	} = $props();

	setFileTreeContext({
		get expandedPaths() {
			return expanded;
		},
		get selectedPath() {
			return selectedPath;
		},
		togglePath(path: string) {
			const next = new Set(expanded);
			if (next.has(path)) next.delete(path);
			else next.add(path);
			expanded = next;
		},
		select(path: string) {
			onSelect?.(path);
		},
	});
</script>

<div
	data-slot="ai-file-tree"
	role="tree"
	class={cn("rounded-xl border border-border bg-card p-2 text-[13px] text-card-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</div>
