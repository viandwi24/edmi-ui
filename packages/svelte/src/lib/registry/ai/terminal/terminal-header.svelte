<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<div
	data-slot="ai-terminal-header"
	class={cn(
		"flex h-9 items-center justify-between gap-2 border-b border-[oklch(0.27_0.007_286)] pr-1.5 pl-3 text-[12.5px] text-[oklch(0.72_0.01_286)]",
		className
	)}
>
	{@render children?.()}
</div>
