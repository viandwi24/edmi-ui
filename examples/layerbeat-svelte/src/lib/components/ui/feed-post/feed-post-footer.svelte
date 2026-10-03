<script lang="ts">
	import { cn } from "#lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="feed-post-footer"
	class={cn("mt-3 flex items-center gap-[18px] text-[13px] text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</div>
