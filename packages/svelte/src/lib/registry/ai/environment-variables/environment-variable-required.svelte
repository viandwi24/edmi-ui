<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, children, ...restProps }: ComponentProps<typeof Badge> = $props();
</script>

<Badge variant="warning" class={cn("h-[18px] text-[10.5px]", className)} {...restProps}>
	{#if children}{@render children()}{:else}Required{/if}
</Badge>
