<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLLiAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLLiAttributes = $props();
</script>

<li
	data-slot="ai-queue-item"
	class={cn(
		"group/queue-item flex flex-col gap-0.5 rounded-[7px] px-2 py-[7px] text-[13.5px] transition-colors hover:bg-accent",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</li>
