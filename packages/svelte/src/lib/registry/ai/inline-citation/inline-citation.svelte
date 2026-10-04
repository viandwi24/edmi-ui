<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span data-slot="ai-inline-citation" class={cn("group/citation inline items-center gap-1", className)} {...restProps}>
	{@render children?.()}
</span>
