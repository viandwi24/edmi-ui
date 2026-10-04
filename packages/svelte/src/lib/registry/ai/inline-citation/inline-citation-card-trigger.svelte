<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { HoverCardTrigger } from "$lib/registry/ui/hover-card/index.js";
	import { badgeVariants } from "$lib/registry/ui/badge/index.js";
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		sources,
		...restProps
	}: Omit<ComponentProps<typeof HoverCardTrigger>, "children"> & {
		/** Source URLs; shows the first host and `+N`. */
		sources: string[];
	} = $props();

	const text = $derived.by(() => {
		const first = sources[0];
		if (!first) return "unknown";
		let host = first;
		try {
			host = new URL(first).hostname.replace(/^www\./, "");
		} catch {}
		const more = sources.length - 1;
		return more > 0 ? `${host} +${more}` : host;
	});
</script>

<!-- A span trigger styled as the secondary pill badge. -->
<HoverCardTrigger
	data-slot="ai-inline-citation-trigger"
	class={cn(
		badgeVariants({ variant: "secondary", shape: "pill" }),
		"ml-1 h-5 cursor-default px-[7px] align-[1px] text-[11.5px] font-normal text-foreground-2",
		className
	)}
	{...restProps}
>
	{text}
</HoverCardTrigger>
