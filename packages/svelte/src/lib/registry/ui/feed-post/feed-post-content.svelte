<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<p data-slot="feed-post-content" class={cn("mt-3 text-sm leading-[1.55]", className)} {...restProps}>
	{@render children?.()}
</p>
