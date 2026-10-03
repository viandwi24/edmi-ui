<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-slot="ai-queue-item-attachment" class={cn("mt-1 ml-[22px] flex flex-wrap gap-2", className)} {...restProps}>
	{@render children?.()}
</div>
