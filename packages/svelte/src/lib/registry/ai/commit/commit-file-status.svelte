<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		status,
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof Badge> & {
		status: "added" | "modified" | "deleted" | "renamed";
	} = $props();

	const variants = {
		added: "success",
		deleted: "destructive",
		modified: "warning",
		renamed: "info",
	} as const;
	const labels = { added: "A", deleted: "D", modified: "M", renamed: "R" };
</script>

<Badge
	variant={variants[status]}
	class={cn("h-[18px] w-5 justify-center p-0 font-mono text-[10.5px]", className)}
	{...restProps}
>
	{#if children}{@render children()}{:else}{labels[status]}{/if}
</Badge>
