<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		variant = "card",
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { variant?: "card" | "flat" } = $props();
</script>

<div
	data-slot="ai-queue"
	data-variant={variant}
	class={cn("not-prose flex flex-col", variant === "card" && "rounded-xl border border-border bg-card p-2", className)} {...restProps}>
	{@render children?.()}
</div>
