<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-slot="ai-queue" class={cn("not-prose flex flex-col rounded-xl border border-border bg-card p-2", className)} {...restProps}>
	{@render children?.()}
</div>
