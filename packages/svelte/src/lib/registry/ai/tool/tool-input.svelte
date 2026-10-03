<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		input,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { input: unknown } = $props();

	const formatted = $derived(JSON.stringify(input, null, 2));
</script>

<div data-slot="ai-tool-input" class={cn("overflow-hidden", className)} {...restProps}>
	<div class="mb-1.5 font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase">
		Parameters
	</div>
	<pre
		class="m-0 overflow-x-auto rounded-lg bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6] whitespace-pre text-foreground">{formatted}</pre>
</div>
