<script lang="ts" module>
	import { getContext, setContext } from "svelte";

	/** Depth handed from a `KanbanColumn` to its `KanbanItem`s (an item's own `elevation` wins). */
	export const KANBAN_COLUMN_CONTEXT = Symbol("EDMI_KANBAN_COLUMN");
	import type { Elevation } from "#lib/components/ui/elevation/index.js";

	export function setKanbanColumnCtx(ctx: { elevation: Elevation | undefined }) {
		setContext(KANBAN_COLUMN_CONTEXT, ctx);
	}

	export function getKanbanColumnCtx() {
		return getContext<{ elevation: Elevation | undefined } | undefined>(KANBAN_COLUMN_CONTEXT);
	}
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		title,
		meta,
		elevation = "auto",
		children,
		...restProps
	}: WithElementRef<Omit<HTMLAttributes<HTMLDivElement>, "title" | "children">> & {
		title: string;
		/** Right header meta, e.g. "1/3". */
		meta?: string;
		/** ✦ depth of every `KanbanItem` (items may override). */
		elevation?: Elevation;
		children?: Snippet;
	} = $props();

	setKanbanColumnCtx({
		get elevation() {
			return elevation === "auto" ? undefined : elevation;
		},
	});
</script>

<!-- Sunken stage column holding `KanbanItem` cards. -->
<div
	bind:this={ref}
	data-slot="kanban-column"
	class={cn(
		"flex w-[282px] flex-col gap-2 rounded-lg border border-sk-bd bg-sk-bg p-2.5 shadow-sunken",
		className
	)}
	{...restProps}
>
	<div class="flex items-center justify-between px-1 pt-0.5 pb-1 font-mono text-[11px] text-muted-foreground">
		<span>{title}</span>
		{#if meta}<span>{meta}</span>{/if}
	</div>
	{@render children?.()}
</div>
