<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="ai-chain-of-thought-search-results"
	class={cn("flex flex-wrap items-center gap-1.5", className)}
	{...restProps}
>
	{@render children?.()}
</div>
