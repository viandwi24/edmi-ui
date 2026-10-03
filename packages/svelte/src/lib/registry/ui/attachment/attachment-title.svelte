<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
	bind:this={ref}
	data-slot="attachment-title"
	class={cn(
		"block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:bg-linear-to-r group-data-[state=processing]/attachment:from-muted-foreground group-data-[state=processing]/attachment:via-foreground group-data-[state=processing]/attachment:to-muted-foreground group-data-[state=processing]/attachment:bg-clip-text group-data-[state=processing]/attachment:text-transparent group-data-[state=processing]/attachment:animate-pulse group-data-[state=uploading]/attachment:bg-linear-to-r group-data-[state=uploading]/attachment:from-muted-foreground group-data-[state=uploading]/attachment:via-foreground group-data-[state=uploading]/attachment:to-muted-foreground group-data-[state=uploading]/attachment:bg-clip-text group-data-[state=uploading]/attachment:text-transparent group-data-[state=uploading]/attachment:animate-pulse",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
