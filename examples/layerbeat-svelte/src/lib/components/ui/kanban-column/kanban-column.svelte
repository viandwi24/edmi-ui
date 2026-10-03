<script lang="ts" module>
	import { getContext, setContext } from "svelte";

	export function setKanbanColumnCtx(ctx: { raised: boolean }) {
		setContext("kanbanColumn", ctx);
	}

	export function getKanbanColumnCtx() {
		return getContext<{ raised: boolean } | undefined>("kanbanColumn");
	}
</script>

<script lang="ts">
	import { cn } from "#lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		title,
		meta,
		raised = false,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> & {
		title: string;
		/** Right header meta, e.g. "1/3". */
		meta?: string;
		/** ✦ opt-in one-step 3D look, forwarded to every `KanbanItem`. */
		raised?: boolean;
		children?: Snippet;
	} = $props();

	setKanbanColumnCtx({
		get raised() {
			return raised;
		},
	});
</script>

<!-- Sunken stage column holding `KanbanItem` cards. -->
<div
	data-slot="kanban-column"
	class={cn(
		"flex w-[282px] flex-col gap-2 rounded-lg border border-border-2 bg-muted p-2.5 shadow-sunk",
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
