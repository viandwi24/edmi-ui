<script lang="ts">
	import { cn } from "#lib/utils.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import ArrowUpRightIcon from 'phosphor-svelte/lib/ArrowUpRight';
	import type { ComponentProps, Snippet } from "svelte";

	let {
		class: className,
		index,
		title,
		description,
		icon,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "title" | "children"> & {
		/** Mono step number, e.g. "01". */
		index: string | number;
		title: string;
		description?: string;
		/** Corner icon; defaults to an arrow up-right. */
		icon?: Snippet;
	} = $props();
</script>

<Card data-slot="step-card" class={cn("gap-0 p-[18px]", className)} {...restProps}>
	<div class="flex items-center justify-between">
		<span class="font-mono text-xs text-muted-foreground">{index}</span>
		<span class="text-muted-foreground">
			{#if icon}
				{@render icon()}
			{:else}
				<ArrowUpRightIcon class="size-3.5" />
			{/if}
		</span>
	</div>
	<div class="mt-[18px] text-base font-semibold">{title}</div>
	{#if description}
		<div class="mt-1.5 text-[13px] text-muted-foreground">{description}</div>
	{/if}
</Card>
