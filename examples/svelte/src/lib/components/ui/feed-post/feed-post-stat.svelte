<script lang="ts">
	import { cn } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
	data-slot="feed-post-stat"
	class={cn("inline-flex items-center gap-1.5 [&_svg]:size-[15px]", className)}
	{...restProps}
>
	{@render children?.()}
</span>
