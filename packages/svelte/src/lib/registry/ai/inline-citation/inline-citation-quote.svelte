<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLQuoteElement> = $props();
</script>

<blockquote
	data-slot="ai-inline-citation-quote"
	class={cn("mt-2.5 border-l-2 border-border pl-2.5 text-[12.5px] text-foreground-2", className)}
	{...restProps}
>
	{@render children?.()}
</blockquote>
