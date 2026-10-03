<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span data-slot="ai-queue-item-avatar" class={cn("flex shrink-0 items-center", className)} {...restProps}>
	{@render children?.()}
</span>
