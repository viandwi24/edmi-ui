<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ComponentProps, Snippet } from "svelte";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import { getKanbanColumnCtx } from "./kanban-column.svelte";

	let {
		class: className,
		title,
		description,
		icon,
		action,
		disabled,
		elevation = "auto",
		...restProps
	}: Omit<ComponentProps<typeof Card>, "title" | "children"> & {
		title: string;
		description?: string;
		/** Leading icon (an `IconPlaceholder`). */
		icon?: Snippet;
		/** Trailing element; defaults to an arrow up-right. */
		action?: Snippet;
		/** Dims the card (not yet reachable). */
		disabled?: boolean;
		/** ✦ depth of this card; defaults to the column's `elevation`. */
		elevation?: Elevation;
	} = $props();

	const ctx = getKanbanColumnCtx();
</script>

<Card
	data-slot="kanban-item"
	elevation={elevation !== "auto" ? elevation : ctx?.elevation}
	data-disabled={disabled ? "" : undefined}
	class={cn("flex-row items-center gap-2.5 px-3 py-2.5 data-[disabled]:opacity-60", className)}
	{...restProps}
>
	{#if icon}
		<span class="grid size-7 shrink-0 place-items-center rounded-lg border border-border bg-muted [&_svg]:size-3.5">
			{@render icon()}
		</span>
	{/if}
	<div class="min-w-0 flex-1">
		<div class="text-[13px] font-medium">{title}</div>
		{#if description}
			<div class="text-[11px] text-muted-foreground">{description}</div>
		{/if}
	</div>
	<span class="text-muted-foreground">
		{#if action}
			{@render action()}
		{:else}
			<IconPlaceholder
				lucide="ArrowUpRightIcon"
				tabler="IconArrowUpRight"
				hugeicons="ArrowUpRightIcon"
				phosphor="ArrowUpRightIcon"
				remixicon="RiArrowRightUpLine"
				class="size-[13px]"
			/>
		{/if}
	</span>
</Card>
