<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		title,
		class: className,
		children,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLElement>, "title">> & { title: string | Snippet } = $props();
</script>

<section bind:this={ref} data-slot="ai-session-section" class={cn("flex flex-col", className)} {...restProps}>
	<h3 class="mb-2.5 text-sm font-normal">{#if typeof title === "string"}{title}{:else}{@render title()}{/if}</h3>
	{@render children?.()}
</section>
