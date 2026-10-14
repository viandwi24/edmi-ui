<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement> = $props();
</script>

<!-- Meta line: kind and format (`Document · PDF`), or a status while generating. -->
<div
	bind:this={ref}
	data-slot="ai-artifact-card-meta"
	class={cn("mt-[3px] font-mono text-[12.5px] text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</div>
