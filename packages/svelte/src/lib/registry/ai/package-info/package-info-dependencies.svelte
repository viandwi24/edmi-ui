<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
</script>

<div class={cn("flex flex-col gap-2", className)} {...restProps}>
	<span class="font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase"
		>Dependencies</span
	>
	<div class="flex flex-col gap-1">
		{@render children?.()}
	</div>
</div>
