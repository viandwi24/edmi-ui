<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLHeadingElement> & { children?: Snippet } = $props();
</script>

<h3 class={cn("text-[13.5px] font-semibold", className)} {...restProps}>
	{#if children}{@render children()}{:else}Environment variables{/if}
</h3>
