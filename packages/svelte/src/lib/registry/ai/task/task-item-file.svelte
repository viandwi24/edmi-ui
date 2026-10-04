<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span
	data-slot="ai-task-item-file"
	class={cn(
		"inline-flex h-5 items-center gap-1 rounded-md border border-border bg-secondary px-1.5 align-middle font-mono text-[11px] text-secondary-foreground [&_svg]:size-3 [&_svg]:shrink-0",
		className
	)}
	{...restProps}
>
	<IconPlaceholder
		lucide="FileIcon"
		tabler="IconFile"
		hugeicons="File01Icon"
		phosphor="FileIcon"
		remixicon="RiFileLine"
	/>
	{@render children?.()}
</span>
