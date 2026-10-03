<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		title,
		class: className,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLElement>, "title"> & { title: string } = $props();
</script>

<section data-slot="ai-session-section" class={cn("flex flex-col", className)} {...restProps}>
	<h3 class="mb-2.5 text-sm font-normal">{title}</h3>
	{@render children?.()}
</section>
