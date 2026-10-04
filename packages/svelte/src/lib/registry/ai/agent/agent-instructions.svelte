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

<div class={cn("flex flex-col gap-1.5", className)} {...restProps}>
	<span class="font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase"
		>Instructions</span
	>
	<div class="text-[13.5px] leading-[1.6] text-foreground-2">
		{@render children?.()}
	</div>
</div>
