<script lang="ts" module>
	export type TaskStatus = "review" | "running" | "completed";

	export type Task = {
		id?: string;
		title: string;
		/** Owner label, rendered uppercase mono (e.g. "Research agent"). */
		agent?: string;
		status: TaskStatus;
	};
</script>

<script lang="ts">
	import { cn } from "#lib/utils.js";
	import { Badge } from "#lib/components/ui/badge/index.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import { Separator } from "#lib/components/ui/separator/index.js";
	import type { ComponentProps } from "svelte";

	const STATUS: Record<TaskStatus, { label: string; variant: "warning" | "info" | "brand" }> = {
		review: { label: "Ready to review", variant: "warning" },
		running: { label: "Running", variant: "info" },
		completed: { label: "Completed", variant: "brand" },
	};

	let {
		class: className,
		tasks,
		labels,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "children"> & {
		tasks: Task[];
		/** Override the status badge labels. */
		labels?: Partial<Record<TaskStatus, string>>;
	} = $props();

	// Tasks grouped by status (first-appearance order), one badge per group.
	const groups = $derived.by(() => {
		const out: { status: TaskStatus; items: Task[] }[] = [];
		for (const t of tasks) {
			const g = out.find((x) => x.status === t.status);
			if (g) g.items.push(t);
			else out.push({ status: t.status, items: [t] });
		}
		return out;
	});
</script>

<Card data-slot="task-list" class={cn("gap-0 px-[18px] py-4", className)} {...restProps}>
	{#each groups as g, gi (g.status)}
		{#if gi > 0}<Separator class="my-3" />{/if}
		<div data-slot="task-group" data-status={g.status}>
			<Badge variant={STATUS[g.status].variant} class="font-mono text-[10.5px]">
				{labels?.[g.status] ?? STATUS[g.status].label}
			</Badge>
			{#each g.items as t, i (t.id ?? i)}
				<div data-slot="task-item" class="mt-2 flex items-center justify-between gap-2.5 text-[13px]">
					<span>{t.title}</span>
					{#if t.agent}
						<span class="text-[10px] whitespace-nowrap text-muted-foreground uppercase">{t.agent}</span>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</Card>
