<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<!-- Meta line: kind and format (`Document · PDF`), or a status while generating. -->
<div
	data-slot="ai-artifact-card-meta"
	class={cn("mt-[3px] font-mono text-[12.5px] text-muted-foreground", className)}
	{...restProps}
>
	{@render children?.()}
</div>
