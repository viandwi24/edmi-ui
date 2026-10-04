<script lang="ts">
	import { Controls as ControlsPrimitive, type ControlsProps } from "@xyflow/svelte";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: ControlsProps = $props();
</script>

<!-- Zoom in, zoom out, fit view and lock, stacked in one bordered card group. -->
<ControlsPrimitive
	data-slot="ai-controls"
	class={cn(
		"overflow-hidden rounded-[calc(var(--radius)*0.9)] border border-border bg-card shadow-none!",
		"[&>button]:box-border! [&>button]:size-[30px]! [&>button]:rounded-none! [&>button]:border-0! [&>button]:border-b! [&>button]:border-border! [&>button]:bg-transparent! [&>button]:p-0! [&>button]:text-foreground-2! [&>button]:last:border-b-0! [&>button]:hover:bg-accent!",
		"[&>button>svg]:size-[15px]! [&>button>svg]:max-h-none! [&>button>svg]:max-w-none!",
		className
	)}
	{...restProps}
/>
