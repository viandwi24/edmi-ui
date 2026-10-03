<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-slot="ai-artifact-card-body" class={cn("min-w-0 flex-1", className)} {...restProps}>
	{@render children?.()}
</div>
